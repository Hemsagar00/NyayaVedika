"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Scale, Search, Send } from "lucide-react";

const SAMPLE_QUERIES = [
  "Anticipatory bail — 498A cruelty — how recent must the FIR be?",
  "Adangal shows my father as owner; can I get mutation without a registered will?",
  "EC says no encumbrance but bank says loan on plot — what do I do?",
  "Notice u/s 80 CPC before suit on a promissory note — required?",
  "Partition among brothers — one refuses to sign, can I file alone?",
];

const SAMPLE_RESULTS = [
  {
    court: "SUPREME COURT OF INDIA",
    citation: "(2014) 8 SCC 273",
    parties: "Arnesh Kumar v. State of Bihar",
    ratio:
      "Where the allegation is mechanical, the omnibus allegations in the FIR do not justify automatic arrest. The investigating officer is duty-bound to satisfy herself that the allegations in the FIR make out a cognizable offence.",
    ref: "AIR 2014 SC 2756",
  },
  {
    court: "ANDHRA PRADESH HIGH COURT",
    citation: "2023 SCC OnLine AP 4891",
    parties: "K. Ramana v. The Tahsildar, Anantapur",
    ratio:
      "Where the Adangal and Pahani records disclose continuous possession for more than thirty years, the presumption of title in favour of the recorded owner is rebuttable only by documentary evidence, not by oral assertions of the rival claimant.",
    ref: "MANU/AP/1289/2023",
  },
  {
    court: "TELANGANA HIGH COURT",
    citation: "2022 SCC OnLine TS 1847",
    parties: "V. Srinivas v. State of Telangana",
    ratio:
      "The Encumbrance Certificate is a snapshot of registered transactions only; an entry in the bank records of a charge over an unpartitioned family plot does not appear on the EC until a final decree of partition.",
    ref: "MANU/TS/0421/2022",
  },
];

const DRAFT_TYPES = [
  {
    title: "Anticipatory Bail",
    section: "§438 CrPC",
    court: "Sessions Court",
    desc: "Grounds of apprehension, antecedents, Arnesh Kumar compliance.",
  },
  {
    title: "Partition Suit",
    section: "Hindu Succession",
    court: "District Court",
    desc: "Family tree schedule, mesne profits, share computation.",
  },
  {
    title: "Consumer Complaint",
    section: "Deficiency in Service",
    court: "District Forum",
    desc: "Chronology, Opposite Party details, reliefs sought.",
  },
  {
    title: "Revenue Mutation",
    section: "Legal Heir / Adangal",
    court: "Tahsildar",
    desc: "Possession trail, Pahani extracts, NOC checklist.",
  },
  {
    title: "Notice u/s 80 CPC",
    section: "Money Recovery",
    court: "Pre-suit",
    desc: "Cause of action, demand particulars, statutory period.",
  },
  {
    title: "Written Statement",
    section: "Civil Suit",
    court: "District Court",
    desc: "Preliminary objections, para-wise reply, issues framed.",
  },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [showDemo, setShowDemo] = useState(false);

  function runDemo(q?: string) {
    if (q) setQuery(q);
    setShowDemo(true);
  }

  return (
    <div className="relative">
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[rgba(0,229,255,0.04)] px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)] pulse-cyan" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-cyan)]">
              In Chamber · Live Tool
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.15] tracking-tight text-[var(--color-text)] sm:text-5xl md:text-[3.25rem]">
            State the issue.
            <br />
            <span className="text-[var(--color-cyan)]">Get the ratio.</span>
            <br />
            Draft the pleading.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl font-serif text-lg leading-relaxed text-[var(--color-text-muted)]">
            Case law ranked with{" "}
            <em className="text-[var(--color-text)]">verbatim</em> ratio
            decidendi. Structured first drafts ready for the registry. Built for
            the Anantapur Bar and Telugu-state practice.
          </p>

          <div className="mx-auto mt-10 max-w-2xl">
            <div className="hud-panel p-1 cyan-glow">
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
                <div className="flex-1 text-left">
                  <label
                    htmlFor="hero-q"
                    className="mb-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-faint)]"
                  >
                    Legal issue
                  </label>
                  <input
                    id="hero-q"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && runDemo()}
                    placeholder="e.g. Anticipatory bail under 498A — FIR 3 months old"
                    className="input-kiwi"
                  />
                </div>
                <button
                  onClick={() => runDemo()}
                  className="btn-cyan shrink-0"
                  type="button"
                >
                  <Search size={15} />
                  Find ratio
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SAMPLE_QUERIES.slice(0, 3).map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => runDemo(s)}
                  className="rounded-full border border-[var(--color-border)] bg-[rgba(0,229,255,0.03)] px-3 py-1.5 font-mono text-[0.65rem] text-[var(--color-text-muted)] transition hover:border-[var(--color-cyan)]/40 hover:text-[var(--color-cyan)]"
                >
                  {s.length > 48 ? s.slice(0, 48) + "…" : s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showDemo && (
        <section className="border-t border-[var(--color-border)] bg-[rgba(0,229,255,0.02)] px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="section-label">Demo results · sample corpus</p>
              <span className="chip chip-amber">Illustrative only</span>
            </div>
            <p className="mb-6 font-serif text-sm text-[var(--color-text-muted)]">
              Query:{" "}
              <span className="text-[var(--color-text)]">
                {query || SAMPLE_QUERIES[0]}
              </span>
            </p>
            <div className="space-y-4">
              {SAMPLE_RESULTS.map((r, i) => (
                <article
                  key={i}
                  className="glass rounded-lg p-5 transition hover:border-[var(--color-border-strong)]"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="chip chip-cyan">{r.court}</span>
                    <span className="font-mono text-xs text-[var(--color-text-faint)]">
                      {r.citation}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[var(--color-text)]">
                    {r.parties}
                  </h3>
                  <div className="ratio-box mt-3 text-[0.95rem]">{r.ratio}</div>
                  <p className="mt-2 font-mono text-[0.65rem] text-[var(--color-text-faint)]">
                    Also reported: {r.ref}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/search" className="btn-cyan">
                Open full search
                <ArrowRight size={14} />
              </Link>
              <Link href="/drafting" className="btn-ghost">
                Generate draft from this
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-[var(--color-border)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="section-label mb-3">Workflow</p>
          <h2 className="font-display text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
            What happens in chamber
          </h2>
          <p className="mt-3 max-w-2xl font-serif text-[var(--color-text-muted)]">
            No workflow charts. The tool follows the actual sequence an advocate
            uses on a working day.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                icon: Search,
                title: "State the issue",
                body: "Plain English, Telugu, or FIR language. One sentence is enough.",
              },
              {
                n: "02",
                icon: Scale,
                title: "Get the ratio",
                body: "Ranked judgments with the ratio decidendi already extracted — verbatim where possible.",
              },
              {
                n: "03",
                icon: FileText,
                title: "Draft the pleading",
                body: "Select the document type. Receive a structured first draft in court-ready format.",
              },
            ].map((step) => (
              <div key={step.n} className="hud-panel p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--color-cyan)]">
                    {step.n}
                  </span>
                  <step.icon
                    size={18}
                    className="text-[var(--color-cyan)] opacity-70"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold text-[var(--color-text)]">
                  {step.title}
                </h3>
                <p className="mt-2 font-serif text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[rgba(0,0,0,0.25)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="section-label mb-3">Document types</p>
              <h2 className="font-display text-3xl font-semibold text-[var(--color-text)]">
                Registry-ready first drafts
              </h2>
            </div>
            <Link href="/drafting" className="btn-ghost">
              Open drafting desk
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DRAFT_TYPES.map((d) => (
              <Link
                key={d.title}
                href="/drafting"
                className="group glass rounded-lg p-5 transition hover:border-[var(--color-cyan)]/30 hover:bg-[rgba(0,229,255,0.04)]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-cyan)]">
                    {d.section}
                  </span>
                  <span className="font-mono text-[0.6rem] text-[var(--color-text-faint)]">
                    {d.court}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-cyan)]">
                  {d.title}
                </h3>
                <p className="mt-1.5 font-serif text-sm text-[var(--color-text-muted)]">
                  {d.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="hud-panel mx-auto max-w-xl p-8 cyan-glow">
            <p className="section-label mb-3">Start now</p>
            <h2 className="font-display text-2xl font-semibold text-[var(--color-text)] sm:text-3xl">
              Use it in chamber today
            </h2>
            <p className="mt-3 font-serif text-[var(--color-text-muted)]">
              Search and drafting are live on the web. For mobile clients, the
              Telegram bot is always available.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/search" className="btn-cyan">
                <Search size={15} />
                Case law search
              </Link>
              <a
                href="https://t.me/nagalawchambers_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Send size={15} />
                Telegram bot
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
