export const dynamic = "force-static";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const KANOON_API_KEY = process.env.INDIANKANOON_API_KEY || "";

function sanitize(text: string) {
  if (!text || typeof text !== "string") return "";
  let c = text.replace(/[\u0000-\u001F\u007F]/g, "");
  const sqlPatterns = /\b(DROP|DELETE|INSERT|UPDATE|ALTER|EXEC|EXECUTE|UNION|SELECT\s+\*|--|;--|\bOR\b\s+1\s*=\s*1)/gi;
  c = c.replace(sqlPatterns, "").replace(/<[^\u003e]*>/g, "").replace(/[`$;]/g, "");
  return c.slice(0, 200);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = sanitize(searchParams.get("q") || "");
    const court = sanitize(searchParams.get("court") || "All");
    if (!query) return NextResponse.json({ results: [], total: 0, query: "", source: "indian-kanoon" }, { status: 200 });

    if (!KANOON_API_KEY) {
      return NextResponse.json({
        results: [
          { title: "Demo: " + query, court: court === "All" ? "Supreme Court of India" : court, date: "2024-01-01", bench: "3-Judge", excerpt: "[Demo mode — configure INDIANKANOON_API_KEY]", id: "demo-1" }
        ], total: 1, query, source: "indian-kanoon"
      }, { headers: {
        "X-Content-Type-Options": "nosniff", "Cache-Control": "no-store, no-cache, must-revalidate, private",
        "Access-Control-Allow-Origin": "*", "X-Request-Served-By": "NyayaVedika-Kanoon-Gateway",
      }});
    }

    const res = await fetch(`https://api.indiankanoon.org/search/?formInput=${encodeURIComponent(query)}${court !== "All" ? "\u0026court=" + encodeURIComponent(court) : ""}`, {
      method: "GET", headers: { "Authorization": `Token ${KANOON_API_KEY}`, "Accept": "application/json" },
    });
    const data = await res.json();
    return NextResponse.json({ results: data.docs || [], total: data.found || 0, query, source: "indian-kanoon" }, { headers: {
      "X-Content-Type-Options": "nosniff", "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*",
      "X-Request-Served-By": "NyayaVedika-Kanoon-Gateway",
    }});
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: { "X-Request-Served-By": "NyayaVedika-Kanoon-Gateway" } });
  }
}
