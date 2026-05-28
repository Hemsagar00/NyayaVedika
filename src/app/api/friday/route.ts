export const dynamic = "force-static";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || "";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";

const RATE_LIMIT = new Map<string, { count: number; reset: number }>();
const MAX_PER_MIN = 10;

const INJECTION = [
  /ignore\s+(all\s+)?previous\s+instructions/gi, /ignore\s+(all\s+)?above\s+instructions/gi,
  /disregard\s+(all\s+)?previous/gi, /you\s+are\s+now\s+/gi, /new\s+instructions?\s*:/gi,
  /system\s*:\s*/gi, /\[\s*SYSTEM\s*\]/gi, /\[\s*INST\s*\]/gi,
];

function sanitize(text: string) {
  if (!text || typeof text !== "string") return "";
  let c = text.replace(/[\u0000-\u001F\u007F]/g, "").replace(/<[^\u003e]*>/g, "").replace(/[`$;]/g, "");
  if (c.length > 12000) c = c.slice(0, 12000);
  return c;
}

function checkRate(ip: string) {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);
  if (!entry || now > entry.reset) { RATE_LIMIT.set(ip, { count: 1, reset: now + 60000 }); return true; }
  if (entry.count >= MAX_PER_MIN) return false;
  entry.count++; return true;
}

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Cache-Control": "no-store, no-cache, must-revalidate, private",
  "X-Request-Served-By": "NyayaVedika-Friday-Gateway",
};

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRate(ip)) return NextResponse.json({ error: "Rate limit exceeded. Max 10 req/min." }, { status: 429, headers: securityHeaders });

    const body = await req.json().catch(() => ({}));
    const { docType, court, petitioner, respondent, facts, grounds, reliefs } = body;
    const text = [docType, court, facts, grounds, reliefs].filter(Boolean).join(" ");
    if (INJECTION.some(p => p.test(text))) return NextResponse.json({ error: "Prompt injection detected. Request rejected." }, { status: 403, headers: securityHeaders });

    const prompt = `You are an expert Indian legal drafter. Draft a professional ${sanitize(docType)} for the ${sanitize(court)}.

PETITIONER:
Name: ${sanitize(petitioner?.name || "[To be filled]")}
Age: ${sanitize(petitioner?.age || "")}
Address: ${sanitize(petitioner?.address || "")}

RESPONDENT:
Name: ${sanitize(respondent?.name || "[To be filled]")}
Address: ${sanitize(respondent?.address || "")}

FACTS:
${sanitize(facts || "[Facts to be detailed]")}

GROUNDS:
${sanitize(grounds || "[Grounds to be detailed]")}

RELIEFS SOUGHT:
${sanitize(reliefs || "[Reliefs to be detailed]")}

INSTRUCTIONS:
- Use proper Indian legal format with headings, parties, and Prayer section
- Include "In the matter of" and "Most respectfully showeth"
- End with "It is therefore most humbly prayed that"
- Add typical Prayer sub-paragraphs (i), (ii), (iii)
- Use formal legal English throughout
- Include citation placeholders [CITE: Year Court CaseNo] where precedents are referenced
- Add standard signature block format`;

    // Try NVIDIA first
    if (NVIDIA_API_KEY) {
      try {
        const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
          method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${NVIDIA_API_KEY}` },
          body: JSON.stringify({ model: "meta/llama-3.1-70b-instruct", messages: [{ role: "user", content: prompt }], temperature: 0.4, max_tokens: 4096 }),
        });
        if (res.ok) {
          const data = await res.json();
          return NextResponse.json({ draft: data.choices?.[0]?.message?.content || "" }, { headers: securityHeaders });
        }
      } catch { /* fallback */ }
    }

    // DeepSeek fallback
    if (DEEPSEEK_API_KEY) {
      const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${DEEPSEEK_API_KEY}` },
        body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], temperature: 0.4, max_tokens: 4096 }),
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ draft: data.choices?.[0]?.message?.content || "" }, { headers: securityHeaders });
      }
    }

    return NextResponse.json({ draft: prompt }, { headers: securityHeaders });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: securityHeaders });
  }
}
