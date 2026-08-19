import { NextResponse } from "next/server";
import { draftLocal, fridayPrompt } from "@/lib/drafts";
import type { DraftInput } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || "";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";

const RATE_LIMIT = new Map<string, { count: number; reset: number }>();
const MAX_PER_MIN = 10;

const INJECTION = [
  /ignore\s+(all\s+)?previous\s+instructions/gi,
  /disregard\s+(all\s+)?previous/gi,
  /you\s+are\s+now\s+/gi,
  /\[\s*SYSTEM\s*\]/gi,
];

function sanitize(text: string) {
  if (!text || typeof text !== "string") return "";
  return text.replace(/[\u0000-\u001F\u007F]/g, "").replace(/<[^>]*>/g, "").slice(0, 8000);
}

function checkRate(ip: string) {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);
  if (!entry || now > entry.reset) {
    RATE_LIMIT.set(ip, { count: 1, reset: now + 60000 });
    return true;
  }
  if (entry.count >= MAX_PER_MIN) return false;
  entry.count += 1;
  return true;
}

const headers = {
  "X-Content-Type-Options": "nosniff",
  "Cache-Control": "no-store",
};

function partyName(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return sanitize(value);
  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    return sanitize([o.name, o.age, o.address].filter(Boolean).join(", "));
  }
  return "";
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRate(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded. Max 10 drafts a minute." }, { status: 429, headers });
    }

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const input: DraftInput = {
      docType: sanitize(String(body.docType || "bail")),
      court: sanitize(String(body.court || "")),
      petitioner: partyName(body.petitioner),
      respondent: partyName(body.respondent),
      facts: sanitize(String(body.facts || "")),
      grounds: sanitize(String(body.grounds || "")),
      reliefs: sanitize(String(body.reliefs || "")),
    };

    const blob = [input.docType, input.facts, input.grounds, input.reliefs].join(" ");
    if (INJECTION.some((p) => p.test(blob))) {
      return NextResponse.json({ error: "Request rejected." }, { status: 403, headers });
    }

    const local = draftLocal(input);
    const prompt = fridayPrompt(input);

    if (NVIDIA_API_KEY) {
      try {
        const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${NVIDIA_API_KEY}`,
          },
          body: JSON.stringify({
            model: "meta/llama-3.1-70b-instruct",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
            max_tokens: 4096,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const draft = data.choices?.[0]?.message?.content;
          if (draft && typeof draft === "string" && draft.length > 80) {
            return NextResponse.json(
              { draft, title: local.title, court: local.court, source: "model" },
              { headers }
            );
          }
        }
      } catch {
        /* fall through */
      }
    }

    if (DEEPSEEK_API_KEY) {
      try {
        const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
            max_tokens: 4096,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const draft = data.choices?.[0]?.message?.content;
          if (draft && typeof draft === "string" && draft.length > 80) {
            return NextResponse.json(
              { draft, title: local.title, court: local.court, source: "model" },
              { headers }
            );
          }
        }
      } catch {
        /* fall through */
      }
    }

    return NextResponse.json(
      { draft: local.body, title: local.title, court: local.court, source: local.source },
      { headers }
    );
  } catch {
    return NextResponse.json({ error: "Drafting failed. Try again." }, { status: 500, headers });
  }
}
