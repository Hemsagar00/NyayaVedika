// api/friday.js — Vercel Serverless Function
// Proxies requests to the Friday Gateway with input validation and security hardening

// Simple in-memory rate limiter (per Vercel function instance)
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

// Input sanitization — strip control characters and limit length
function sanitizeInput(str, maxLength = 10000) {
  if (typeof str !== 'string') return '';
  // Remove null bytes and control characters (except newline, tab)
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').slice(0, maxLength);
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(clientIP)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
  }

  // Validate request body exists
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  const { message, caseId, docType } = req.body;

  // Validate required fields
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required and must be a non-empty string.' });
  }

  // Sanitize all inputs
  const safeMessage = sanitizeInput(message, 15000);
  const safeCaseId = sanitizeInput(caseId || 'general', 100);
  const safeDocType = sanitizeInput(docType || 'query', 100);

  const GATEWAY_URL = process.env.FRIDAY_GATEWAY_URL;

  if (!GATEWAY_URL) {
    return res.status(500).json({
      error: 'Friday Gateway URL not configured in environment variables.'
    });
  }

  // Validate GATEWAY_URL is a proper URL
  try {
    new URL(GATEWAY_URL);
  } catch {
    return res.status(500).json({ error: 'Invalid gateway configuration.' });
  }

  const orchestratedPrompt = `[SYSTEM: FRIDAY_ORCHESTRATION]
CASE_ID: ${safeCaseId}
DOC_TYPE: ${safeDocType}

INSTRUCTION:
1. Retrieve all previous drafts and evidence from the Case Vault for ${safeCaseId}.
2. Maintain 100% consistency with previous facts, dates, and arguments.
3. Use the a-grade legal research from the RAG Statutes and Precedents folders.
4. Generate the response for: "${safeMessage}"`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch(`${GATEWAY_URL}/agent/turn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: orchestratedPrompt,
        model: 'gemma4:31b-cloud',
        sessionKey: `case:${safeCaseId}`
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(502).json({ error: 'Upstream service returned an error.' });
    }

    const data = await response.json();
    return res.status(200).json({ result: data.output || '' });
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'Gateway timeout — request took too long.' });
    }
    return res.status(502).json({ error: 'Friday Bridge connection failed.' });
  }
}
