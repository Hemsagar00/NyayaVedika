"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import type { SearchHit } from "@/lib/types";

const COURTS = ["All", "Supreme Court", "Andhra Pradesh", "Telangana"];

function SearchInner() {
  const params = useSearchParams();
  const initial = params.get("q") || "";
  const [q, setQ] = useState(initial);
  const [court, setCourt] = useState("All");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [summary, setSummary] = useState("");
  const [selected, setSelected] = useState<SearchHit | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [error, setError] = useState("");

  async function run(query = q, forum = court) {
    const value = query.trim();
    if (!value) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(
        `/api/kanoon/?q=${encodeURIComponent(value)}&court=${encodeURIComponent(forum)}`
      );
      if (!res.ok) throw new Error("Search failed");
      const data = (await res.json()) as {
        results?: SearchHit[];
        summary?: string;
      };
      const list = data.results || [];
      setHits(list);
      setSummary(data.summary || "");
      setSelected(list[0] ?? null);
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Search could not run. Check the connection and try again.");
    }
  }

  useEffect(() => {
    if (initial) run(initial, "All");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const empty = status === "done" && hits.length === 0;
  const kanoonBrowse = useMemo(
    () => `https://indiankanoon.org/search/?formInput=${encodeURIComponent(q || "Indian law")}`,
    [q]
  );

  return (
    <main id="main" className="min-h-[100dvh] pt-8 pb-20">
      <div className="wrap">
        <p className="text-[0.8rem] text-[var(--fg-muted)]">Chamber desk</p>
        <h1 className="mt-2 max-w-[16ch] text-[2.3rem] font-semibold tracking-tight md:text-[3rem]">
          Find a judgment.
        </h1>
        <p className="mt-3 max-w-[48ch] text-[var(--fg-muted)]">
          Type the issue. The desk returns reported holdings first. Open the full text on Indian Kanoon before you cite.
        </p>

        <form
          className="mt-8 grid gap-3 md:grid-cols-12"
          onSubmit={(e) => {
            e.preventDefault();
            run();
          }}
        >
          <div className="md:col-span-7">
            <label htmlFor="q" className="label">
              The matter
            </label>
            <input
              id="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="field"
              placeholder="498A arrest, mutation without a will, Section 80 notice"
            />
          </div>
          <div className="md:col-span-3">
            <label htmlFor="court" className="label">
              Forum
            </label>
            <select
              id="court"
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              className="field"
            >
              {COURTS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end md:col-span-2">
            <button type="submit" className="btn btn-primary w-full justify-center" disabled={status === "loading"}>
              {status === "loading" ? "Searching" : "Search"}
            </button>
          </div>
        </form>

        {status === "loading" ? (
          <div className="mt-10 grid gap-4 md:grid-cols-12">
            <div className="h-40 animate-pulse bg-[var(--hair)] md:col-span-5" />
            <div className="h-64 animate-pulse bg-[var(--hair)] md:col-span-7" />
          </div>
        ) : null}

        {status === "error" ? (
          <p className="mt-8 border border-[var(--cta)] px-4 py-3 text-[0.95rem] text-[var(--cta)]">{error}</p>
        ) : null}

        {empty ? (
          <div className="mt-12 max-w-xl">
            <p className="text-[1.15rem] font-semibold">No close match on this desk.</p>
            <p className="mt-2 text-[var(--fg-muted)]">
              Try a shorter issue, or search the same words on Indian Kanoon.
            </p>
            <a href={kanoonBrowse} className="btn btn-ghost mt-6 no-underline">
              Open Indian Kanoon
            </a>
          </div>
        ) : null}

        {hits.length > 0 ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              {summary ? <p className="mb-5 text-[0.95rem] leading-relaxed text-[var(--fg-muted)]">{summary}</p> : null}
              <ul className="space-y-2">
                {hits.map((h) => (
                  <li key={h.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(h)}
                      className={`w-full border p-4 text-left transition-colors duration-500 ${
                        selected?.id === h.id
                          ? "border-[var(--cta)] bg-[var(--card)]"
                          : "border-[var(--hair)] hover:border-[var(--fg-muted)]"
                      }`}
                    >
                      <p className="font-mono text-[0.68rem] uppercase tracking-wide text-[var(--cta)]">
                        {h.kind === "statute" ? "Statute" : h.court}
                      </p>
                      <p className="mt-1 font-serif text-[1.08rem] italic leading-snug">{h.parties}</p>
                      <p className="mt-1 font-mono text-[0.75rem] text-[var(--fg-muted)]">{h.citation}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              {selected ? (
                <article className="border border-[var(--hair)] bg-[var(--card)] p-6 md:p-8">
                  <p className="font-mono text-[0.72rem] uppercase tracking-wide text-[var(--cta)]">
                    {selected.kind === "statute" ? "Statute note" : selected.court}
                    {selected.year ? ` · ${selected.year}` : ""}
                    {selected.bench ? ` · ${selected.bench}` : ""}
                  </p>
                  <h2 className="mt-2 font-serif text-[1.7rem] italic leading-tight">{selected.parties}</h2>
                  <p className="mt-1 font-mono text-[0.85rem] text-[var(--fg-muted)]">{selected.citation}</p>
                  <div className="cite-rule mt-6">
                    <p className="label">Ratio / holding</p>
                    <p className="text-[1.02rem] leading-relaxed">{selected.ratio}</p>
                  </div>
                  {selected.note ? (
                    <p className="mt-5 text-[0.95rem] leading-relaxed text-[var(--fg-muted)]">{selected.note}</p>
                  ) : null}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={selected.url} className="btn btn-primary no-underline" target="_blank" rel="noreferrer">
                      Full text
                    </a>
                    <Link
                      href={`/drafting/?cite=${encodeURIComponent(selected.citation)}&facts=${encodeURIComponent(q)}`}
                      className="btn btn-ghost no-underline"
                    >
                      Use in a draft
                    </Link>
                  </div>
                  <p className="mt-6 text-[0.8rem] text-[var(--fg-muted)]">
                    First-draft aid only. Counsel must read the judgment and confirm the citation before filing.
                  </p>
                </article>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="wrap py-24">Loading the desk.</main>}>
      <SearchInner />
    </Suspense>
  );
}
