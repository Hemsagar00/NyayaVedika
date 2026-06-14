"use client";

import { useState } from "react";

const SAMPLE_RESULTS = [
  {
    id: 1,
    court: "SUPREME COURT OF INDIA",
    citation: "(2024) 4 SCC 312",
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
      "Where the Adangal and Pahani records disclose continuous possession for more than thirty years, the presumption of title in favour of the recorded owner is rebuttable only by documentary evidence.",
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
  const [results, setResults] = useState(SAMPLE_RESULTS);
  const [selected, setSelected] = useState<typeof SAMPLE_RESULTS[number] | null>(null);

  return (
    <main className="relative min-h-[calc(100vh-4rem)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="section-number">&mdash; Case Law Search &mdash;</p>
          <div className="stamp">In Chamber Use</div>
        </div>

        <h1 className="font-display text-[2.5rem] sm:text-[3rem] font-semibold text-[var(--color-ink)] mb-2 leading-tight">
          <span className="red-underline-sketch">Find a judgment.</span>
        </h1>
        <p className="font-serif text-[1.05rem] text-[var(--color-ink-faded)] mb-8 max-w-2xl italic">
          Type the issue. The case law returns, in the order of relevance,
          with the ratio decidendi already pulled out.
        </p>

        <div className="mb-6">
          <label
            htmlFor="search"
            className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-ink-faded)] block mb-2"
          >
            §1. State the matter
          </label>
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Anticipatory bail — 498A — limits on mechanical arrest…"
            className="typewriter-input"
          />
        </div>

        <div className="flex items-center gap-3 mb-10">
          <button
            className="btn-ink"
            onClick={() => setResults(SAMPLE_RESULTS)}
          >
            Search
          </button>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-pencil)]">
            47,283 case laws indexed · AP + TS + SC
          </p>
        </div>

        <hr className="border-t border-[var(--color-ink)] mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-ink-faded)] mb-2">
              {results.length} results
            </p>
            {results.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setSelected(r)}
                className={`text-left w-full p-4 border ${
                  selected?.id === r.id
                    ? "border-[var(--color-chakra-red)] border-2 bg-[var(--color-paper-shade)]"
                    : "border-[var(--color-ink-faded)]"
                } hover:border-[var(--color-chakra-red)] transition-colors`}
              >
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[var(--color-chakra-red)] mb-1">
                  No. {i + 1} · {r.date}
                </p>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[var(--color-pencil)] mb-1">
                  {r.court}
                </p>
                <p className="font-display italic text-[1.05rem] text-[var(--color-ink)] leading-tight">
                  {r.parties}
                </p>
                <p className="font-mono text-[0.7rem] text-[var(--color-judge-blue)] mt-1">
                  [{r.citation}]
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            {selected ? (
              <article className="border-2 border-[var(--color-ink)] p-6 bg-[var(--color-paper-shade)]">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-chakra-red)] mb-2">
                  {selected.court}
                </p>
                <h2 className="font-display text-[1.5rem] italic font-semibold text-[var(--color-ink)] leading-tight mb-2">
                  {selected.parties}
                </h2>
                <p className="font-mono text-[0.8rem] text-[var(--color-judge-blue)] mb-4">
                  [{selected.citation}] · Bench: {selected.bench}
                </p>
                <div className="citation my-4">
                  <p className="citation-source">Ratio Decidendi</p>
                  <p className="font-serif text-[1rem] leading-relaxed text-[var(--color-ink)]">
                    {selected.ratio}
                  </p>
                </div>
                <div className="mt-6 flex gap-3">
                  <a href="#" className="btn-paper">View full judgment</a>
                  <a href="#" className="btn-paper">Cite</a>
                </div>
              </article>
            ) : (
              <div className="border border-dashed border-[var(--color-ink-faded)] p-8 text-center">
                <p className="font-display italic text-[1.1rem] text-[var(--color-ink-faded)]">
                  Select a citation from the list to read the full ratio.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
