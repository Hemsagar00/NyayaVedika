/**
 * NyayaVedika — AI Service Layer
 * Handles all API calls to AI models (NVIDIA Llama / DeepSeek / Anthropic Claude / Google Gemini)
 * Falls back to Friday Bridge if FRIDAY_GATEWAY is configured.
 * Keys are injected via Vercel environment variables (VITE_ prefix for client-side).
 */

// --- Provider configurations ---
const PROVIDERS = {
  nvidia: {
    url: 'https://integrate.api.nvidia.com/v1/chat/completions',
    model: 'meta/llama-3.1-70b-instruct',
    getKey: () => import.meta.env.VITE_NVIDIA_API_KEY,
  },
  deepseek: {
    url: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    getKey: () => import.meta.env.VITE_DEEPSEEK_API_KEY,
  },
  anthropic: {
    url: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-5-sonnet-20241022',
    getKey: () => import.meta.env.VITE_ANTHROPIC_API_KEY,
  },
  gemini: {
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    getKey: () => import.meta.env.VITE_GEMINI_API_KEY,
  },
  friday: {
    url: '/api/friday',
    getKey: () => 'friday-bridge',
  },
};

// Active provider — switch by changing this or via env var VITE_AI_PROVIDER
const ACTIVE_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'nvidia';

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
- NDPS Act — Section 37 twin conditions for bail (mandatory satisfaction: (a) reasonable grounds for believing not guilty, AND (b) not likely to commit offence while on bail). Key precedents: Narcotics Control Bureau v. Kishan Lal (2019), Tofan Singh v. State of Tamil Nadu (2020)
- Revenue laws of Andhra Pradesh & Telangana (ROR, mutations, 1-B proceedings)
- Consumer Protection Act, 2019
- NI Act Section 138 (cheque bounce), IBC/CIRP, DV Act

QUASHING PETITIONS:
- Section 528 BNSS (replaces Section 482 CrPC) — inherent powers of High Court
- Section 261 BNSS (replaces Section 239 CrPC) — discharge provisions

FORMATTING:
- Use proper cause title format (Indian court style)
- Include Synopsis and List of Dates for SC/HC petitions
- Number all grounds with statutory citations
- Include verification affidavit format
- Generate prayer clause with specific reliefs
- Cite both old (IPC/CrPC) and new (BNS/BNSS) provisions where relevant

COURTS COVERED: Supreme Court of India, all 25 High Courts, District & Sessions Courts, Magistrate Courts, Revenue authorities (Tahsildar/RDO/Joint Collector), NCLT/NCLAT, NCDRC, ITAT, CAT, NGT, RERA, DRT, SAT, CESTAT.

Always provide accurate, well-structured legal content. Cite relevant provisions and precedents. Never fabricate case law.`;

// ─── Core API Caller ───
async function askAI(userMessage, options = {}) {
  const { maxTokens = 4096, temperature = 0.4 } = options;
  const provider = PROVIDERS[ACTIVE_PROVIDER];

  if (!provider) throw new Error(`Unknown AI provider: ${ACTIVE_PROVIDER}`);

  const apiKey = provider.getKey();
  if (!apiKey && ACTIVE_PROVIDER !== 'friday') {
    throw new Error(`API key not configured. Please set VITE_${ACTIVE_PROVIDER.toUpperCase()}_API_KEY in your Vercel environment variables.`);
  }

  // Cancel any in-flight request
  abortActiveRequest();
  activeController = new AbortController();

  try {
    // Friday Bridge — serverless proxy
    if (ACTIVE_PROVIDER === 'friday') {
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

    // Anthropic has a different API shape
    if (ACTIVE_PROVIDER === 'anthropic') {
      const res = await fetch(provider.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: provider.model,
          max_tokens: maxTokens,
          system: LEGAL_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userMessage }],
        }),
        signal: activeController.signal,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `Anthropic Error: ${res.status}`);
      }
      const data = await res.json();
      return data.content?.[0]?.text || '';
    }

    // Gemini has its own shape
    if (ACTIVE_PROVIDER === 'gemini') {
      const url = `${provider.url}?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: LEGAL_SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: temperature,
          },
        }),
        signal: activeController.signal,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `Gemini Error: ${res.status}`);
      }
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }

    // OpenAI-compatible (NVIDIA, DeepSeek)
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
      throw new Error(err.error?.message || `API Error: ${res.status}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  } finally {
    activeController = null;
  }
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
    `Summarize the following legal document. Identify:\n1. Parties involved\n2. Key dates and timeline\n3. Core legal issues\n4. Orders / Holdings\n5. Important deadlines or next steps\n\n${documentText}`,
    { maxTokens: 1024 }
  );
}

export async function askQuestion(question) {
  return askAI(
    `Answer the following legal question with detailed analysis under Indian law. Cite relevant statutes (BNS/BNSS/IPC/CrPC/Constitution), Supreme Court and High Court precedents, and practical guidance:\n\n${question}`,
    { maxTokens: 2048 }
  );
}

export async function analyzeCase(caseText) {
  return askAI(
    `Perform a comprehensive analysis of the following case material (FIR/chargesheet/judgment/order). Provide:

1. **Parties** — Names, designations, roles
2. **Facts** — Timeline of events
3. **Legal Issues** — Key questions of law
4. **Applicable Statutes** — BNS/BNSS/IPC/CrPC sections and special acts
5. **Relevant Precedents** — Supreme Court and High Court cases on similar issues
6. **Strategic Notes** — Strengths, weaknesses, and recommended approach
7. **Next Steps** — Filing deadlines, limitation periods, interim reliefs available

CASE MATERIAL:
${caseText}`,
    { maxTokens: 4096 }
  );
}

export async function findCaseLaws(topic, facts = '') {
  const factsSection = facts ? `\n\nSPECIFIC CASE FACTS:\n${facts}` : '';
  return askAI(
    `Find and explain the most relevant Supreme Court and High Court precedents on the following legal topic/issue under Indian law. For each case, provide:

1. **Case Name & Citation** (with year and court)
2. **Key Legal Principle** established
3. **Relevant Facts** that make it applicable
4. **How it can be cited** in arguments

LEGAL TOPIC/ISSUE: ${topic}${factsSection}

Provide at least 5-8 relevant precedents, prioritizing Supreme Court decisions.`,
    { maxTokens: 4096 }
  );
}

export async function writeSubmission(topic, facts, courtName = '') {
  return askAI(
    `Draft comprehensive Written Submissions / Written Arguments for filing before ${courtName || 'the Court'}.

LEGAL ISSUE: ${topic}

FACTS: ${facts}

STRUCTURE:
1. Preliminary submissions
2. Factual matrix with dates
3. Questions of law
4. Detailed arguments with sub-headings
5. Statutory provisions cited (BNS/BNSS and IPC/CrPC cross-references)
6. Case law cited with holdings
7. Distinguishing adverse precedents
8. Prayer / Relief sought`,
    { maxTokens: 4096 }
  );
}

export async function generateLegalUpdate(topic) {
  return askAI(
    `Generate a comprehensive legal update / digest on the following topic under Indian law:

TOPIC: ${topic}

Provide:
1. **Overview** — Current state of the law on this topic
2. **Key Statutes** — All relevant provisions (BNS, BNSS, BSA, special acts)
3. **Landmark Judgments** — Supreme Court and High Court decisions with citations and holdings
4. **Recent Developments** — Latest amendments, circulars, notifications
5. **Practice Tips** — Practical guidance for advocates handling such cases
6. **Common Pitfalls** — Mistakes to avoid

Make it comprehensive and cite specific sections, rules, and case law.`,
    { maxTokens: 4096 }
  );
}

export async function getLatestNews(category) {
  return askAI(
    `Generate 5 notable recent legal developments and important judgments for the category: "${category}" in Indian courts.

For each item, provide:
- A headline/title (first line)
- A 2-3 sentence summary with the key legal principle, parties, and practical impact

Separate each item with "|||" (three pipe characters). Do NOT use any other separator.

Focus on real, well-known legal principles and landmark cases. Cover diverse topics within ${category}.`,
    { maxTokens: 2048, temperature: 0.6 }
  );
}
