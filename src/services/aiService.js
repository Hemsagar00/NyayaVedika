/**
 * NyayaVedika — AI Service Layer
 * Handles all API calls to AI models (NVIDIA Llama / DeepSeek / Anthropic Claude / Google Gemini)
 * Keys are injected via GitHub Actions environment or Vercel env vars — NEVER hardcoded.
 */

const AI_CONFIG = {
  // Resolved at build time via Vite env injection (VITE_ prefix exposes to browser)
  nvidia: {
    apiKey: import.meta.env.VITE_NVIDIA_API_KEY,
    model: 'meta/llama-4-maverick-17b-128e-instruct',
    endpoint: 'https://integrate.api.nvidia.com/v1/chat/completions',
  },
  deepseek: {
    apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
    model: 'deepseek-chat',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
  },
  anthropic: {
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    model: 'claude-sonnet-4-20250514',
    endpoint: 'https://api.anthropic.com/v1/messages',
  },
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    model: 'gemini-1.5-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
  },
};

// Active provider — switch by changing this or via env var VITE_AI_PROVIDER
const ACTIVE_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'nvidia';

/**
 * Legal system prompt — sets context for all AI calls
 */
const LEGAL_SYSTEM_PROMPT = `You are NyayaVedika AI, an expert legal drafting assistant for Indian advocates. 
You are well-versed in:
- Indian Penal Code (IPC), CrPC, CPC
- Constitutional law (Articles 226, 32, etc.)
- Revenue laws of Andhra Pradesh and Telangana
- High Court and Supreme Court pleading formats
- Land records, mutations, ROR (Record of Rights)
- Bail applications, writs, SLPs, civil suits, revenue appeals

Always respond in formal, precise legal English. 
Structure outputs with proper headings. 
Include relevant section numbers, article citations, and prayer clauses where applicable.
If asked to draft a document, follow standard Indian court pleading format:
- Title (IN THE [COURT NAME])
- Cause Title (Petitioner vs Respondent)
- Grounds (numbered)
- Prayer Clause
- Verification Clause`;

/**
 * Core AI call — NVIDIA API (OpenAI-compatible, Llama 4 Maverick)
 */
async function callNvidia(userMessage, options = {}) {
  const { systemPrompt = LEGAL_SYSTEM_PROMPT, maxTokens = 2048 } = options;
  const apiKey = AI_CONFIG.nvidia.apiKey;

  if (!apiKey) throw new Error('NVIDIA_API_KEY not configured. Add VITE_NVIDIA_API_KEY to your environment variables.');

  const response = await fetch(AI_CONFIG.nvidia.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.nvidia.model,
      max_tokens: maxTokens,
      temperature: 1.00,
      top_p: 1.00,
      frequency_penalty: 0.00,
      presence_penalty: 0.00,
      stream: false,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `NVIDIA API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Core AI call — DeepSeek (OpenAI-compatible API)
 */
async function callDeepSeek(userMessage, options = {}) {
  const { systemPrompt = LEGAL_SYSTEM_PROMPT, maxTokens = 2048 } = options;
  const apiKey = AI_CONFIG.deepseek.apiKey;

  if (!apiKey) throw new Error('DEEPSEEK_API_KEY not configured. Add VITE_DEEPSEEK_API_KEY to your environment variables.');

  const response = await fetch(AI_CONFIG.deepseek.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.deepseek.model,
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `DeepSeek API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Core AI call — Anthropic Claude
 */
async function callAnthropic(userMessage, options = {}) {
  const { systemPrompt = LEGAL_SYSTEM_PROMPT, maxTokens = 2048 } = options;
  const apiKey = AI_CONFIG.anthropic.apiKey;

  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured. Check your environment variables.');

  const response = await fetch(AI_CONFIG.anthropic.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: AI_CONFIG.anthropic.model,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || '';
}

/**
 * Core AI call — Google Gemini
 */
async function callGemini(userMessage, options = {}) {
  const { systemPrompt = LEGAL_SYSTEM_PROMPT, maxTokens = 2048 } = options;
  const apiKey = AI_CONFIG.gemini.apiKey;

  if (!apiKey) throw new Error('GEMINI_API_KEY not configured. Check your environment variables.');

  const url = `${AI_CONFIG.gemini.endpoint}/${AI_CONFIG.gemini.model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ parts: [{ text: userMessage }] }],
      generationConfig: { maxOutputTokens: maxTokens },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/**
 * Unified AI call — routes to active provider
 */
export async function askAI(userMessage, options = {}) {
  if (ACTIVE_PROVIDER === 'gemini') return callGemini(userMessage, options);
  if (ACTIVE_PROVIDER === 'anthropic') return callAnthropic(userMessage, options);
  if (ACTIVE_PROVIDER === 'deepseek') return callDeepSeek(userMessage, options);
  return callNvidia(userMessage, options);
}

/**
 * Task-specific helpers
 */

export async function draftDocument(params) {
  const { docType, court, petitioner, respondent, facts, reliefSought } = params;
  const prompt = `
Draft a complete ${docType} for filing before the ${court}.

PARTIES:
- Petitioner/Applicant: ${petitioner}
- Respondent/Opposite Party: ${respondent}

FACTS OF THE CASE:
${facts}

RELIEF SOUGHT:
${reliefSought}

Generate a full, court-ready draft with proper format, numbered grounds, and prayer clause.
`;
  return askAI(prompt, { maxTokens: 3000 });
}

export async function explainClause(clauseText) {
  return askAI(
    `Explain the following legal clause in plain English, noting its significance under Indian law:\n\n"${clauseText}"`,
    { maxTokens: 512 }
  );
}

export async function suggestGrounds(docType, facts) {
  return askAI(
    `Based on these facts, suggest the strongest legal grounds for a ${docType} under Indian law:\n\n${facts}`,
    { maxTokens: 1024 }
  );
}

export async function summarizeDocument(documentText) {
  return askAI(
    `Summarize the following legal document in structured points — identify parties, subject matter, key orders/directions, and any deadlines:\n\n${documentText}`,
    { maxTokens: 1024 }
  );
}
