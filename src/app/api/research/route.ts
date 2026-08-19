import { NextResponse } from "next/server";
import { researchDesk } from "@/lib/research";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { q?: string; court?: string };
  const q = String(body.q || "").slice(0, 400);
  const court = String(body.court || "All").slice(0, 80);
  const answer = researchDesk(q, court);
  return NextResponse.json(answer, {
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}
