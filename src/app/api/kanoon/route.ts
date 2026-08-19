import { NextResponse } from "next/server";
import { researchDesk, normalizeKanoonDocs } from "@/lib/research";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const KANOON_API_KEY = process.env.INDIANKANOON_API_KEY || "";

function sanitize(text: string) {
  if (!text || typeof text !== "string") return "";
  return text.replace(/[\u0000-\u001F\u007F]/g, "").replace(/<[^>]*>/g, "").slice(0, 400);
}

const headers = {
  "X-Content-Type-Options": "nosniff",
  "Cache-Control": "no-store",
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = sanitize(searchParams.get("q") || "");
    const court = sanitize(searchParams.get("court") || "All") || "All";
    if (!query) {
      return NextResponse.json(
        { results: [], total: 0, query: "", summary: "", source: "chamber-desk" },
        { headers }
      );
    }

    const desk = researchDesk(query, court);

    if (KANOON_API_KEY) {
      try {
        const courtQ = court !== "All" ? ` court: ${court}` : "";
        const res = await fetch(
          `https://api.indiankanoon.org/search/?formInput=${encodeURIComponent(query + courtQ)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${KANOON_API_KEY}`,
              Accept: "application/json",
            },
          }
        );
        if (res.ok) {
          const data = (await res.json()) as { docs?: unknown[]; found?: number };
          const remote = normalizeKanoonDocs(data.docs || [], query);
          const merged = [...remote, ...desk.hits].slice(0, 12);
          return NextResponse.json(
            {
              results: merged,
              total: merged.length,
              query,
              summary: desk.summary,
              source: remote.length ? "mixed" : "chamber-desk",
            },
            { headers }
          );
        }
      } catch {
        /* fall through to desk */
      }
    }

    return NextResponse.json(
      {
        results: desk.hits,
        total: desk.hits.length,
        query,
        summary: desk.summary,
        source: "chamber-desk",
      },
      { headers }
    );
  } catch {
    return NextResponse.json({ error: "Search failed. Try again." }, { status: 500, headers });
  }
}
