/**
 * NyayaVedika — AI Service Layer v5
 * Primary: NVIDIA Llama 4 Maverick (fast, intelligent legal drafting)
 * Secondary: NVIDIA Mistral Large 3 (structured, high-precision fallback)
 * Bridge: Friday (local API bridge, zero cost)
 */

// --- Provider configurations ---
const PROVIDERS = {
  nvidia: {
    name: 'NVIDIA Llama 4 Maverick',
    url: 'https://integrate.api.nvidia.com/v1/chat/completions',
    model: 'meta/llama-4-maverick-17b-128e-instruct',
    getKey: () => import.meta.env.VITE_NVIDIA_API_KEY,
    maxTokens: 4096,
    temperature: 0.4,
  },
  mistral: {
    name: 'NVIDIA Mistral Large 3',
    url: 'https://integrate.api.nvidia.com/v1/chat/completions',
    model: 'mistralai/mistral-large-3-675b-instruct-2512',
    getKey: () => import.meta.env.VITE_MISTRAL_API_KEY,
    maxTokens: 2048,
    temperature: 0.15,
  },
  friday: {
    name: 'Friday Bridge',
    url: '/api/friday',
    getKey: () => 'friday-bridge',
    maxTokens: 2048,
    temperature: 0.4,
  },
};

// Fallback chain: NVIDIA Maverick → Mistral Large → Friday Bridge
const FALLBACK_CHAIN = ['nvidia', 'mistral', 'friday'];

// Abort controller for cancelling in-flight requests
let activeController = null;

export function abortActiveRequest() {
  if (activeController) {
    activeController.abort();
    activeController = null;
  }
}

// ─── Legal System Prompt ───
const LEGAL_SYSTEM_PROMPT = `You are NyayaVedika AI, an expert legal drafting assistant for Indian advocates. You are an indispensable AI tool for legal research, drafting, and legal practice.

CORE EXPERTISE:
- Bharatiya Nyaya Sanhita (BNS, 2023) — replaces IPC
- Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023) — replaces CrPC
- Bharatiya Sakshya Adhiniyam (BSA, 2023) — replaces Indian Evidence Act
- IPC / CrPC / IEA — cross-references for transitional cases
- Constitutional law (Articles 14, 19, 21, 32, 136, 226, 227, 300A)
- NDPS Act — Section 37 twin conditions for bail
- Revenue laws of Andhra Pradesh & Telangana
- Consumer Protection Act, 2019
- NI Act Section 138, IBC/CIRP, DV Act
- Section 528 BNSS (inherent powers, replaces 482 CrPC)

FORMATTING:
- Proper cause title format (Indian court style)
- Synopsis and List of Dates for SC/HC petitions
- Numbered grounds with statutory citations
- Verification affidavit format
- Prayer clause with specific reliefs
- Cite both BNS/BNSS and IPC/CrPC cross-references

COURTS: Supreme Court of India, all 25 High Courts, District & Sessions Courts, Magistrate Courts, NCLT/NCLAT, NCDRC, ITAT, CAT, NGT, RERA, DRT, SAT, CESTAT.

Always provide accurate, well-structured legal content. Cite relevant provisions and precedents. Never fabricate case law.`;

// ─── Core API Caller (with fallback) ───
async function askAI(userMessage, options = {}) {
  const { maxTokens = 4096, temperature = 0.4 } = options;

  abortActiveRequest();
  activeController = new AbortController();

  let lastError = null;

  for (const providerName of FALLBACK_CHAIN) {
    const provider = PROVIDERS[providerName];
    if (!provider) continue;

    const apiKey = provider.getKey();
    if (!apiKey && providerName !== 'friday') {
      lastError = new Error(`${providerName}: no API key configured`);
      continue;
    }

    try {
      const result = await callProvider(
        providerName,
        provider,
        apiKey,
        userMessage,
        maxTokens,
        temperature
      );
      return result;
    } catch (err) {
      console.warn(`[NyayaVedika] ${provider.name} failed:`, err.message);
      lastError = err;
    }
  }

  throw new Error(`All AI providers failed. Last: ${lastError?.message || 'unknown'}`);
}

async function callProvider(providerName, provider, apiKey, userMessage, maxTokens, temperature) {
  // Friday Bridge — serverless proxy
  if (providerName === 'friday') {
    const res = await fetch('/api/friday', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, maxTokens }),
      signal: activeController.signal,
    });
    if (!res.ok) throw new Error(`Friday Bridge Error: ${res.status}`);
    const data = await res.json();
    return data.result;
  }

  // OpenAI-compatible (NVIDIA, Mistral)
  const res = await fetch(provider.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: provider.model,
      messages: [
        { role: 'system', content: LEGAL_SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      max_tokens: maxTokens,
      temperature: temperature,
      stream: false,
    }),
    signal: activeController.signal,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `${provider.name} Error: ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// ─── Exported Functions ───

export async function draftDocument(params) {
  const { docType, court, petitioner, respondent, facts, reliefSought } = params;
  return askAI(
    `Draft a complete ${docType} for filing before the ${court}.

PARTIES:
- Petitioner/Applicant: ${petitioner}
- Respondent/Opposite Party: ${respondent || 'State / Authority'}

FACTS OF THE CASE:
${facts}

RELIEF SOUGHT:
${reliefSought || 'As per the nature of the petition'}

REQUIREMENTS:
1. Proper cause title with court header
2. Synopsis and List of Dates (for SC/HC petitions)
3. Numbered grounds with statutory citations (cite both BNS/BNSS and IPC/CrPC where applicable)
4. Prayer clause with specific reliefs
5. Verification / Affidavit format
6. All formatting per ${court} Rules`,
    { maxTokens: 4096 }
  );
}

export async function explainClause(clauseText) {
  return askAI(
    `Explain the following legal clause in plain English, noting its significance under Indian law:\n\n"${clauseText}"`,
    { maxTokens: 512 }
  );
}

export async function suggestGrounds(docType, facts) {
  return askAI(
    `Suggest the strongest legal grounds for a ${docType} based on the following facts. For each ground, cite specific statutory provisions (BNS/BNSS and IPC/CrPC cross-references) and relevant Supreme Court / High Court precedents:\n\n${facts}`,
    { maxTokens: 2048 }
  );
}

export async function summarizeDocument(documentText) {
  return askAI(
    `Summarize the following legal document. Identify:\n1. Parties\n2. Key dates\n3. Core legal issues\n4. Orders / Holdings\n5. Next steps\n\n${documentText}`,
    { maxTokens: 1024 }
  );
}

export async function askQuestion(question) {
  return askAI(
    `Answer the following legal question with detailed analysis under Indian law. Cite relevant statutes (BNS/BNSS/IPC/CrPC/Constitution), Supreme Court and High Court precedents:\n\n${question}`,
    { maxTokens: 2048 }
  );
}

export async function analyzeCase(caseText) {
  return askAI(
    `Perform a comprehensive analysis of the following case material:\n\n1. Parties\n2. Facts / Timeline\n3. Legal Issues\n4. Applicable Statutes\n5. Relevant Precedents\n6. Strategic Notes\n7. Next Steps\n\n${caseText}`,
    { maxTokens: 4096 }
  );
}

export async function findCaseLaws(topic, facts = '') {
  const factsSection = facts ? `\n\nSPECIFIC FACTS:\n${facts}` : '';
  return askAI(
    `Find and explain the most relevant Supreme Court and High Court precedents on: ${topic}.${factsSection}\n\nProvide 5-8 precedents with case names, citations, key principles, and how to cite them in arguments.`,
    { maxTokens: 4096 }
  );
}

export async function writeSubmission(topic, facts, courtName = '') {
  return askAI(
    `Draft comprehensive Written Submissions for ${courtName || 'the Court'}.\n\nLEGAL ISSUE: ${topic}\n\nFACTS: ${facts}\n\nSTRUCTURE:\n1. Preliminary submissions\n2. Factual matrix\n3. Questions of law\n4. Detailed arguments\n5. Statutory provisions\n6. Case law cited\n7. Distinguishing adverse precedents\n8. Prayer`,
    { maxTokens: 4096 }
  );
}

export async function generateLegalUpdate(topic) {
  return askAI(
    `Generate a comprehensive legal update on: ${topic}\n\nProvide:\n1. Overview of current law\n2. Key statutes\n3. Landmark judgments\n4. Recent developments\n5. Practice tips\n6. Common pitfalls`,
    { maxTokens: 4096 }
  );
}

export async function getLatestNews(category) {
  return askAI(
    `Generate 5 notable recent legal developments for "${category}" in Indian courts.\n\nFor each item: headline on first line, 2-3 sentence summary.\nSeparate items with "|||" (three pipe characters).`,
    { maxTokens: 2048, temperature: 0.6 }
  );
}
