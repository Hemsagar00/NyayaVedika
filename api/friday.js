// api/friday.js — Vercel Serverless Function
// Direct Ollama API bridge for NyayaVedika
// Proxies requests to the local Ollama instance via public tunnel

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20; // max requests per window per IP

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

function sanitizeInput(str, maxLength = 10000) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').slice(0, maxLength);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(clientIP)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
  }

  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  const { message, caseId, docType } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required and must be a non-empty string.' });
  }

  const safeMessage = sanitizeInput(message, 15000);
  const safeCaseId = sanitizeInput(caseId || 'general', 100);
  const safeDocType = sanitizeInput(docType || 'query', 100);

  // Ollama API URL — fallback to the permanent Cloudflare Tunnel
  const OLLAMA_URL = process.env.OLLAMA_API_URL || 'https://camp-matches-harris-ministry.trycloudflare.com';
  const MODEL = process.env.OLLAMA_MODEL || 'gemma4:e4b';

  try {
    new URL(OLLAMA_URL);
  } catch {
    return res.status(500).json({ error: 'Invalid Ollama API URL configuration.' });
  }

  // System prompt for Indian Legal AI (NyayaVedika)
  const systemPrompt = `You are NyayaVedika, an expert Indian Legal AI assistant built for Indian advocates and litigants. You specialize in:
- Indian Constitution, IPC, CrPC, CPC, Evidence Act
- Supreme Court, High Court, and District Court procedures
- Drafting legal documents: SLPs, Writ Petitions, Bail Applications, Affidavits
- Legal research and case law analysis
- Answering queries in English, Hindi, and Telugu

Respond with precise, legally accurate information. Cite relevant sections and precedents where applicable. If a document draft is requested, use proper legal formatting.`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout for LLM generation

  try {
    const response = await fetch(`${OLLAMA_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `[CASE_ID: ${safeCaseId}] [DOC_TYPE: ${safeDocType}]\n\n${safeMessage}` }
        ],
        temperature: 0.3,
        max_tokens: 4096,
        stream: false
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error(`Ollama error: ${response.status} ${errText}`);
      return res.status(502).json({ error: 'AI model service returned an error.' });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || '';

    return res.status(200).json({ result });
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'AI model timeout — request took too long. Please try again.' });
    }
    console.error('Ollama connection error:', error.message);
    return res.status(502).json({ error: 'AI model connection failed. The server may be offline.' });
  }
}
