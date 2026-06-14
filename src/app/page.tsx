"use client";

import { useState } from "react";

/* ============================================================
   NYAYAVEDIKA — main page
   Voice: court order / stamp paper, not SaaS landing page
   ============================================================ */

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
    citation: "(2024) 4 SCC 312",
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

const DRAFTS = [
  { title: "Anticipatory bail — 438 CrPC", court: "Sessions Court", body: "Bail application with grounds of arrest apprehension, prior antecedents, and the Arnesh Kumar compliance certificate." },
  { title: "Partition suit — Hindu Succession", court: "District Court", body: "Plaint with family tree schedule, prayer for mesne profits, and the share-allocation computation." },
  { title: "Consumer complaint — deficiency in service", court: "District Consumer Forum", body: "Complaint with chronology of deficiency, the Opposite Party particulars, and the relief sought under Section 35." },
  { title: "Revenue mutation — legal heir record", court: "Tahsildar", body: "Application under the AP Revenue Code, with succession certificate and possession evidence schedule." },
  { title: "Notice u/s 80 CPC — money recovery", court: "Pre-suit", body: "Statutory notice with cause of action, demand particulars, and 30-day compliance window." },
  { title: "Written statement — civil suit", court: "District Court", body: "Para-wise reply, preliminary objections, and the counter-claim with the Limitation Act statement." },
];

export default function Home() {
  const [q, setQ] = useState("");

  return (
    <main className="relative">
      {/* ============================================================
          HERO — case file header, not a SaaS hero
          ============================================================ */}
      <section className="relative pt-12 pb-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Top-of-file label */}
          <div className="flex items-center justify-between mb-8">
            <p className="section-number">
              &mdash; File No. NV/2026/001 &mdash;
            </p>
            <div className="stamp">In Chamber Use</div>
          </div>

          <div className="text-center mb-10">
            <h1 className="font-display text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] leading-[1.05] font-semibold text-[var(--color-ink)] mb-3">
              <span className="red-underline-sketch">NyayaVedika</span>
            </h1>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[var(--color-ink-faded)]">
              Case law, ratio, and the first draft of the pleading
            </p>
          </div>

          {/* Court header style — the actual page starts here */}
          <div className="text-center mb-8 pt-6 border-t-2 border-b border-[var(--color-ink)] py-4">
            <p className="font-display italic text-[0.95rem] text-[var(--color-ink-faded)]">
              In the matter of
            </p>
            <p className="font-display text-[1.5rem] sm:text-[1.85rem] font-semibold text-[var(--color-ink)] mt-2 leading-tight">
              A working advocate&apos;s reference to Indian case law,
            </p>
            <p className="font-display text-[1.5rem] sm:text-[1.85rem] font-semibold text-[var(--color-ink)] leading-tight">
              and a tool to draft the first pleading from it.
            </p>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-pencil)] mt-3">
              &mdash; Anantapur Bar Association, Andhra Pradesh &mdash;
            </p>
          </div>

          {/* Parties block */}
          <div className="parties my-8 max-w-2xl mx-auto">
            <p>
              <span className="font-mono not-italic text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-pencil)] block mb-1">
                Heard before
              </span>
              Adv. S. Nagendra Naik, B.A., LL.B.
              <br />
              <span className="text-[var(--color-ink-faded)] text-[0.9rem]">
                Naga Law Chambers, Anantapur
              </span>
            </p>
            <p className="vs">— In chamber —</p>
            <p>
              <span className="font-mono not-italic text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-pencil)] block mb-1">
                For
              </span>
              The lawyers and clerks of the Anantapur and Telugu-state Bars
            </p>
          </div>

          {/* Typewriter input — the "search" */}
          <div className="my-10 max-w-2xl mx-auto">
            <label
              htmlFor="q"
              className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-ink-faded)] block mb-2"
            >
              §1. State your matter
            </label>
            <input
              id="q"
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. Anticipatory bail — 498A — limits on mechanical arrest…"
              className="typewriter-input"
            />
            <div className="flex items-center justify-between mt-3">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-pencil)]">
                In English, Telugu, or both
              </p>
              <button
                className="btn-ink"
                onClick={() => {
                  /* no-op for the static site */
                }}
              >
                File the query &nbsp;→
              </button>
            </div>
          </div>

          {/* Hand-written sample queries, like margin notes */}
          <div className="max-w-2xl mx-auto mt-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-ink-faded)] mb-3">
              For example —
            </p>
            <ul className="space-y-2">
              {SAMPLE_QUERIES.map((s, i) => (
                <li
                  key={i}
                  className="font-serif italic text-[0.95rem] text-[var(--color-ink-faded)] pl-5 relative cursor-pointer hover:text-[var(--color-chakra-red)] transition-colors"
                  onClick={() => setQ(s)}
                >
                  <span className="absolute left-0 font-mono not-italic text-[0.7rem] text-[var(--color-chakra-red)]">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 text-center">
            <div className="stamp-amber" style={{ display: "inline-block" }}>
              Filed · Awaiting Citation
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          §2. WHAT THE TOOL DOES — three procedural steps
          ============================================================ */}
      <section className="relative">
        <hr className="section-divider max-w-3xl mx-auto" />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
          <p className="section-number mb-3">§2.</p>
          <h2 className="font-display text-[1.85rem] sm:text-[2.25rem] font-semibold text-[var(--color-ink)] leading-tight mb-3">
            What NyayaVedika does,
            <br />
            <span className="italic text-[var(--color-ink-faded)] font-normal text-[0.85em]">
              in the order a lawyer does it.
            </span>
          </h2>
          <p className="font-serif text-[1.05rem] text-[var(--color-ink-faded)] leading-relaxed mb-10 max-w-2xl">
            There is no workflow chart here. The tool is built around what
            actually happens in chamber on a Tuesday morning.
          </p>

          <div className="space-y-8">
            <Step
              n="1."
              title="The issue is stated."
              body={
                <>
                  You describe the matter in plain English, Telugu, or the
                  language the FIR is in. The tool does not require
                  structured input. The way you would explain it to a senior
                  is what it takes.
                </>
              }
            />
            <Step
              n="2."
              title="Citations are returned."
              body={
                <>
                  You get a numbered list of judgments with the case name,
                  citation, court, and the ratio decidendi pulled out
                  verbatim. Not a summary. Not a paraphrase. The text the
                  judge wrote, with the case number and year.
                </>
              }
            />
            <Step
              n="3."
              title="A first draft is filed."
              body={
                <>
                  Choose the pleading type — bail, partition, consumer,
                  revenue mutation, notice. The tool produces a structured
                  first draft, with the parties, facts, grounds, and prayer
                  already laid out. You edit, you do not start from blank.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          §3. LIVE CITATION — what the search results look like
          ============================================================ */}
      <section className="relative">
        <hr className="section-divider max-w-3xl mx-auto" />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
          <p className="section-number mb-3">§3.</p>
          <h2 className="font-display text-[1.85rem] sm:text-[2.25rem] font-semibold text-[var(--color-ink)] leading-tight mb-3">
            What a citation looks like
            <br />
            <span className="italic text-[var(--color-ink-faded)] font-normal text-[0.85em]">
              when you ask about a 498A arrest.
            </span>
          </h2>
          <p className="font-serif text-[1.05rem] text-[var(--color-ink-faded)] leading-relaxed mb-10 max-w-2xl">
            Three judgments, in the order the tool ranks them by relevance
            to your question. Each is rendered as a citation, not a card.
          </p>

          <div className="space-y-6">
            {SAMPLE_RESULTS.map((c, i) => (
              <article key={i} className="relative">
                <p className="section-number mb-2">
                  Citation No. {i + 1} of {SAMPLE_RESULTS.length}
                </p>
                <div className="citation">
                  <p className="citation-source">{c.court}</p>
                  <p className="font-display italic text-[1.05rem] mb-2">
                    {c.parties}
                  </p>
                  <p className="font-serif text-[0.95rem] leading-relaxed text-[var(--color-ink)] mb-2">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-chakra-red)] mr-2">
                      Ratio:
                    </span>
                    {c.ratio}
                  </p>
                  <p className="citation-ref">
                    [{c.citation}] · {c.ref}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 font-serif italic text-[0.95rem] text-[var(--color-ink-faded)] max-w-2xl">
            &mdash; The full judgment text and any connected case law is
            available from the citation screen. Footnote markers link to
            SCC Online, Indian Kanoon, and the e-Courts portal.
          </p>
        </div>
      </section>

      {/* ============================================================
          §4. WHO BUILT IT — the advocate, not "the team"
          ============================================================ */}
      <section className="relative">
        <hr className="section-divider max-w-3xl mx-auto" />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
          <p className="section-number mb-3">§4.</p>
          <h2 className="font-display text-[1.85rem] sm:text-[2.25rem] font-semibold text-[var(--color-ink)] leading-tight mb-3">
            The advocate who built it,
            <br />
            <span className="italic text-[var(--color-ink-faded)] font-normal text-[0.85em]">
              and the work it gets used for.
            </span>
          </h2>

          <div className="proceeding ruled-paper pt-2 pb-6 px-1 max-w-2xl">
            <p>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-pencil)] block mb-1">
                I am
              </span>
              <span className="font-display text-[1.15rem] font-semibold">
                S. Nagendra Naik
              </span>
              , advocate practising at the Anantapur Bar, Andhra Pradesh,
              since 2011. I file at the District Court, the Sessions Court,
              the AP High Court, the Telangana High Court, and the
              Revenue Divisional Officer. Most of my work is in revenue
              and land, family partition, and bail.
            </p>
            <p>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-pencil)] block mb-1">
                I built
              </span>
              NyayaVedika for myself, because I needed the citation to come
              back with the ratio decidendi already in it, and I needed
              the first draft of the pleading to be in the format the
              registry accepts. The tool does not replace the advocate. It
              removes the two hours before the file is ready.
            </p>
            <p>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-pencil)] block mb-1">
                I share it
              </span>
              with other lawyers in the Anantapur and Telugu-state Bars.
              The Telegram bot at{" "}
              <a
                href="https://t.me/nagalawchambers_bot"
                className="text-[var(--color-judge-blue)]"
              >
                @nagalawchambers_bot
              </a>{" "}
              is the same tool, on the phone.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <div className="stamp-blue">In Good Standing · AP Bar Council</div>
            <a
              href="https://nagalawchambers.com"
              className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-judge-blue)] underline underline-offset-4"
            >
              Naga Law Chambers &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          §5. WHAT GETS DRAFTED — list of documents, not "templates"
          ============================================================ */}
      <section className="relative">
        <hr className="section-divider max-w-3xl mx-auto" />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
          <p className="section-number mb-3">§5.</p>
          <h2 className="font-display text-[1.85rem] sm:text-[2.25rem] font-semibold text-[var(--color-ink)] leading-tight mb-3">
            The documents it drafts,
            <br />
            <span className="italic text-[var(--color-ink-faded)] font-normal text-[0.85em]">
              for the courts we actually appear in.
            </span>
          </h2>
          <p className="font-serif text-[1.05rem] text-[var(--color-ink-faded)] leading-relaxed mb-10 max-w-2xl">
            These are not &quot;templates&quot;. Each one is built around the format
            the registry of the court accepts. You change the names, the
            facts, the dates, and the prayer. The structure is fixed.
          </p>

          <div className="border-t-2 border-[var(--color-ink)]">
            {DRAFTS.map((d, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-3 py-5 border-b border-[var(--color-ink)] items-baseline"
              >
                <div className="col-span-1">
                  <span className="font-mono text-[0.8rem] text-[var(--color-chakra-red)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-11 sm:col-span-5">
                  <h3 className="font-display text-[1.1rem] font-semibold text-[var(--color-ink)] leading-tight">
                    {d.title}
                  </h3>
                </div>
                <div className="col-span-12 sm:col-span-2">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-pencil)]">
                    For
                  </p>
                  <p className="font-serif text-[0.9rem] text-[var(--color-ink-faded)]">
                    {d.court}
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-pencil)]">
                    What it covers
                  </p>
                  <p className="font-serif text-[0.9rem] text-[var(--color-ink-faded)] leading-snug">
                    {d.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          §6. WHERE IT IS USED — practice areas, as a list, not a grid
          ============================================================ */}
      <section className="relative">
        <hr className="section-divider max-w-3xl mx-auto" />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
          <p className="section-number mb-3">§6.</p>
          <h2 className="font-display text-[1.85rem] sm:text-[2.25rem] font-semibold text-[var(--color-ink)] leading-tight mb-3">
            Where the work gets done.
          </h2>
          <p className="font-serif text-[1.05rem] text-[var(--color-ink-faded)] leading-relaxed mb-8 max-w-2xl">
            The tool is not a general-purpose legal assistant. It is tuned
            to the work that comes across the desk in Anantapur.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 max-w-2xl">
            <PracticeItem term="Revenue and land" def="Adangal, Pahani, EC, NOC, mutation, and the AP Revenue Code." />
            <PracticeItem term="Bail and criminal" def="Anticipatory bail (438 CrPC), regular bail, quashing petitions, 498A, NDPS." />
            <PracticeItem term="Family and partition" def="Hindu Succession Act 1956, partition suits, succession certificates." />
            <PracticeItem term="Civil and contract" def="Money recovery, written statements, summary suits, Section 80 CPC notices." />
            <PracticeItem term="Consumer forums" def="District, State, and NCDRC complaints; deficiency in service and product." />
            <PracticeItem term="Service matters" def="AP and TS service rules, promotion disputes, disciplinary proceedings." />
          </dl>
        </div>
      </section>

      {/* ============================================================
          §7. CONTACT — the chambers, the bot, the phone
          ============================================================ */}
      <section className="relative">
        <hr className="section-divider max-w-3xl mx-auto" />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
          <p className="section-number mb-3">§7.</p>
          <h2 className="font-display text-[1.85rem] sm:text-[2.25rem] font-semibold text-[var(--color-ink)] leading-tight mb-3">
            To consult.
          </h2>

          <div className="proceeding ruled-paper pt-2 pb-6 px-1 max-w-2xl">
            <p>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-pencil)] block mb-1">
                In person
              </span>
              Naga Law Chambers
              <br />
              <span className="italic">
                Door No. 12-3-218, Subash Road,
                <br />
                Anantapur — 515001
              </span>
            </p>
            <p>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-pencil)] block mb-1">
                On Telegram
              </span>
              <a href="https://t.me/nagalawchambers_bot" className="text-[var(--color-judge-blue)]">
                @nagalawchambers_bot
              </a>{" "}
              &mdash; the same tool, on the phone.
            </p>
            <p>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-pencil)] block mb-1">
                For chamber matters
              </span>
              Use the Telegram bot for case queries, citations, and draft
              requests. For consultation, the chambers line is open
              Mon&ndash;Sat, 10:00&thinsp;&ndash;&thinsp;18:00 IST.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4 flex-wrap">
            <a
              href="https://t.me/nagalawchambers_bot"
              className="btn-ink"
            >
              Open the bot
            </a>
            <a
              href="https://nagalawchambers.com"
              className="btn-paper"
            >
              Naga Law Chambers &rarr;
            </a>
          </div>

          <div className="mt-12 text-center">
            <div className="stamp" style={{ display: "inline-block" }}>
              sd/- Adv. S. Nagendra Naik
            </div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-pencil)] mt-3">
              Signed in chamber, Anantapur
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Step ── */

function Step({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-3 items-baseline">
      <div className="col-span-2 sm:col-span-1">
        <span className="font-mono text-[1.5rem] sm:text-[1.85rem] text-[var(--color-chakra-red)] font-semibold leading-none">
          {n}
        </span>
      </div>
      <div className="col-span-10 sm:col-span-11">
        <h3 className="font-display text-[1.25rem] sm:text-[1.45rem] font-semibold text-[var(--color-ink)] leading-tight mb-2">
          {title}
        </h3>
        <p className="font-serif text-[1rem] text-[var(--color-ink-faded)] leading-relaxed max-w-xl">
          {body}
        </p>
      </div>
    </div>
  );
}

/* ── Practice item, dictionary-style ── */

function PracticeItem({ term, def }: { term: string; def: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-pencil)] mb-1">
        &mdash;
      </dt>
      <dd>
        <p className="font-display text-[1.1rem] font-semibold text-[var(--color-ink)] mb-1">
          {term}
        </p>
        <p className="font-serif text-[0.95rem] text-[var(--color-ink-faded)] leading-snug">
          {def}
        </p>
      </dd>
    </div>
  );
}
