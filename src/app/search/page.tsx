"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Scale } from "lucide-react";

const SAMPLE_RESULTS = [
  {
    id: 1,
    court: "SUPREME COURT OF INDIA",
    citation: "(2014) 8 SCC 273",
    parties: "Arnesh Kumar v. State of Bihar",
    ratio:
      "Where the allegation is mechanical, the omnibus allegations in the FIR do not justify automatic arrest. The investigating officer is duty-bound to satisfy herself that the allegations in the FIR make out a cognizable offence.",
    date: "2014",
    bench: "2-Judge",
  },
  {
    id: 2,
    court: "ANDHRA PRADESH HIGH COURT",
    citation: "2023 SCC OnLine AP 4891",
    parties: "K. Ramana v. The Tahsildar, Anantapur",
    ratio:
      "Where the Adangal and Pahani records disclose continuous possession for more than thirty years, the presumption of title in favour of the recorded owner is rebuttable only by documentary evidence, not by oral assertions of the rival claimant.",
    date: "2023",
    bench: "Single Judge",
  },
  {
    id: 3,
    court: "TELANGANA HIGH COURT",
    citation: "2022 SCC OnLine TS 1847",
    parties: "V. Srinivas v. State of Telangana",
    ratio:
      "The Encumbrance Certificate is a snapshot of registered transactions only; an entry in the bank records of a charge over an unpartitioned family plot does not appear on the EC until a final decree of partition.",
    date: "2022",
    bench: "Division Bench",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof SAMPLE_RESULTS | null>(null);
  const [selected, setSelected] = useState<(typeof SAMPLE_RESULTS)[number] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSelected(null);
    await new Promise((r) => setTimeout(r, 600));
    setResults(SAMPLE_RESULTS);
    setLoading(false);
  }

  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label mb-2">Case law search</p>
            <h1 className="font-display text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
              Find the judgment.
            </h1>
            <p className="mt-2 max-w-xl font-serif text-[var(--color-text-muted)]">
              Type the issue. Results return ranked, with the ratio decidendi
              already extracted.
            </p>
          </div>
          <span className="chip chip-amber">Demo corpus active</span>
        </div>

        <form onSubmit={handleSearch} className="hud-panel p-4 cyan-glow">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label
                htmlFor="search-q"
                className="mb-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-faint)]"
              >
                Issue or keywords
              </label>
              <input
                id="search-q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. mutation without registered will · Adangal possession"
                className="input-kiwi"
              />
            </div>
            <button type="submit" className="btn-cyan shrink-0" disabled={loading}>
              <Search size={15} />
              {loading ? "Searching…" : "Search"}
            </button>
          </div>
        </form>

        {results && (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              <p className="font-mono text-xs text-[var(--color-text-faint)]">
                {results.length} results · illustrative sample
              </p>
              {results.map((r) => (
                <article
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`glass cursor-pointer rounded-lg p-5 transition ${
                    selected?.id === r.id
                      ? "border-[var(--color-cyan)]/50 bg-[rgba(0,229,255,0.06)]"
                      : "hover:border-[var(--color-border-strong)]"
                  }`}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="chip chip-cyan">{r.court}</span>
                    <span className="font-mono text-xs text-[var(--color-text-faint)]">
                      {r.citation}
                    </span>
                  </div>
                  <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">
                    {r.parties}
                  </h2>
                  <p className="mt-2 line-clamp-2 font-serif text-sm italic text-[var(--color-text-muted)]">
                    {r.ratio}
                  </p>
                  <div className="mt-3 flex gap-3 font-mono text-[0.65rem] text-[var(--color-text-faint)]">
                    <span>{r.date}</span>
                    <span>·</span>
                    <span>{r.bench}</span>
                  </div>
                </article>
              ))}
            </div>

            <aside className="lg:sticky lg:top-20 lg:self-start">
              {selected ? (
                <div className="hud-panel p-5">
                  <p className="section-label mb-3">Ratio decidendi</p>
                  <h3 className="font-display text-lg font-semibold text-[var(--color-text)]">
                    {selected.parties}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[var(--color-text-faint)]">
                    {selected.citation}
                  </p>
                  <div className="ratio-box mt-4 text-sm">{selected.ratio}</div>
                  <div className="mt-5 flex flex-col gap-2">
                    <Link href="/drafting" className="btn-cyan w-full justify-center">
                      Use in draft
                      <ArrowRight size={14} />
                    </Link>
                    <p className="text-center font-mono text-[0.6rem] text-[var(--color-text-faint)]">
                      Always verify against primary source before filing.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="glass flex flex-col items-center justify-center rounded-lg p-8 text-center">
                  <Scale size={28} className="mb-3 text-[var(--color-cyan)] opacity-50" />
                  <p className="font-serif text-sm text-[var(--color-text-muted)]">
                    Select a result to view the full ratio.
                  </p>
                </div>
              )}
            </aside>
          </div>
        )}

        {!results && (
          <div className="mt-16 text-center">
            <p className="font-serif text-[var(--color-text-muted)]">
              Enter an issue above, or try a sample from the home page.
            </p>
            <Link href="/" className="mt-4 inline-block font-mono text-sm text-[var(--color-cyan)]">
              ← Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
