import { AUTHORITIES } from "./corpus";
import type { ResearchAnswer, SearchHit } from "./types";

const STOP = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "of",
  "in",
  "on",
  "to",
  "for",
  "is",
  "my",
  "me",
  "i",
  "we",
  "you",
  "with",
  "without",
  "from",
  "that",
  "this",
  "be",
  "can",
  "how",
  "what",
  "when",
  "where",
  "does",
  "do",
  "must",
  "after",
  "before",
  "into",
  "about",
]);

const EXPAND: Record<string, string[]> = {
  "498a": ["cruelty", "arnesh", "arrest", "dowry"],
  "498-a": ["cruelty", "arnesh", "arrest"],
  anticipatory: ["438", "482", "sibbia", "sushila", "bail"],
  bail: ["anticipatory", "arrest", "antil"],
  arrest: ["arnesh", "joginder", "41"],
  adangal: ["pahani", "mutation", "pattadar", "revenue"],
  pahani: ["adangal", "mutation", "revenue"],
  mutation: ["adangal", "pattadar", "tahsildar", "revenue"],
  encumbrance: ["ec", "registration", "charge"],
  ec: ["encumbrance", "registration"],
  partition: ["daughter", "coparcener", "vineeta", "hindu"],
  daughter: ["coparcener", "vineeta", "succession"],
  will: ["succession", "mutation", "suraj"],
  "80": ["notice", "government", "cpc"],
  notice: ["80", "government"],
  consumer: ["deficiency", "builder", "shantha"],
  builder: ["consumer", "pioneer", "delay"],
  enquiry: ["karunakar", "disciplinary", "311"],
  injunction: ["dalpat", "39"],
};

function tokens(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function expanded(q: string): Set<string> {
  const out = new Set<string>();
  for (const t of tokens(q)) {
    out.add(t);
    const extra = EXPAND[t];
    if (extra) extra.forEach((e) => out.add(e));
  }
  const lower = q.toLowerCase();
  if (lower.includes("498")) {
    ["498a", "arnesh", "cruelty", "arrest"].forEach((e) => out.add(e));
  }
  if (lower.includes("section 80") || lower.includes("u/s 80") || lower.includes("s. 80")) {
    ["80", "notice", "cpc", "government"].forEach((e) => out.add(e));
  }
  return out;
}

function kanoonUrl(query: string): string {
  return `https://indiankanoon.org/search/?formInput=${encodeURIComponent(query)}`;
}

export function searchDesk(query: string, court = "All"): SearchHit[] {
  const q = query.trim();
  if (!q) return [];
  const bag = expanded(q);

  const hits: SearchHit[] = AUTHORITIES.map((a) => {
    let score = 0;
    const hay = [
      a.parties,
      a.citation,
      a.ratio,
      a.note,
      a.court,
      a.area,
      ...a.keywords,
    ]
      .join(" ")
      .toLowerCase();

    for (const t of bag) {
      if (a.keywords.includes(t)) score += 6;
      else if (hay.includes(t)) score += 2;
    }
    if (court !== "All") {
      const c = court.toLowerCase();
      const courtName = a.court.toLowerCase();
      if (c.includes("supreme") && a.kind === "case" && !courtName.includes("supreme")) {
        score -= 12;
      }
      if ((c.includes("andhra") || c.includes("telangana")) && a.kind === "statute") {
        score += 2;
      }
    }
    return {
      id: a.id,
      kind: a.kind,
      parties: a.parties,
      court: a.court,
      citation: a.citation,
      year: a.year,
      bench: a.bench,
      area: a.area,
      ratio: a.ratio,
      note: a.note,
      source: "chamber-desk" as const,
      url: kanoonUrl(a.kanoonQuery),
      score,
    };
  })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score);

  return hits.slice(0, 8);
}

export function researchDesk(query: string, court = "All"): ResearchAnswer {
  const hits = searchDesk(query, court);
  if (!hits.length) {
    return {
      query,
      summary:
        "No close match on the chamber desk. Try a shorter issue (for example 498A arrest, mutation without a will, or Section 80 notice) or open Indian Kanoon from the search screen.",
      hits: [],
      source: "chamber-desk",
    };
  }

  const lead = hits[0];
  const others = hits.slice(1, 3).map((h) => h.parties);
  const summary =
    others.length > 0
      ? `${lead.parties} is the closest holding. Also read ${others.join(" and ")}. Verify the full text on Indian Kanoon before you cite.`
      : `${lead.parties} is the closest holding on this desk. Verify the full text on Indian Kanoon before you cite.`;

  return { query, summary, hits, source: "chamber-desk" };
}

export function normalizeKanoonDocs(docs: unknown[], query: string): SearchHit[] {
  if (!Array.isArray(docs)) return [];
  return docs.slice(0, 10).map((raw, i) => {
    const d = raw as Record<string, unknown>;
    const title = String(d.title || d.headline || d.doc || "Untitled");
    const court = String(d.docsource || d.court || "Indian Kanoon");
    const tid = d.tid ?? d.docid ?? d.id;
    const url =
      tid != null
        ? `https://indiankanoon.org/doc/${tid}/`
        : kanoonUrl(title);
    return {
      id: `ik-${String(tid ?? i)}`,
      kind: "case" as const,
      parties: title.replace(/<[^>]+>/g, ""),
      court,
      citation: String(d.citation || d.publishdate || query),
      year: String(d.publishdate || "").slice(0, 4) || "",
      area: "general" as const,
      ratio: String(d.headline || d.snippet || d.title || "")
        .replace(/<[^>]+>/g, "")
        .slice(0, 420),
      source: "indian-kanoon" as const,
      url,
      score: 50 - i,
    };
  });
}
