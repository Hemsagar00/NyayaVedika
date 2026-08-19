"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AREAS = [
  {
    term: "Revenue and land",
    def: "Adangal, Pahani, EC, NOC, mutation, and the AP Revenue Code. Most chamber work in Anantapur sits here.",
    acts: "AP Revenue Code · Indian Stamp Act · Registration Act",
  },
  {
    term: "Bail and criminal",
    def: "Anticipatory bail (§438 CrPC), regular bail, quashing under §482 CrPC, 498A, and routine criminal trial work.",
    acts: "CrPC 1973 · BNS 2023 · NDPS Act 1985",
  },
  {
    term: "Family and partition",
    def: "Hindu Succession Act 1956, partition suits, succession certificates, maintenance under §125 CrPC.",
    acts: "Hindu Succession Act · Hindu Marriage Act · Special Marriage Act",
  },
  {
    term: "Civil and contract",
    def: "Money recovery, written statements, summary suits under Order XXXVII, §80 CPC notices, injunctions.",
    acts: "CPC 1908 · Indian Contract Act · Specific Relief Act",
  },
  {
    term: "Consumer forums",
    def: "District, State, and NCDRC complaints; deficiency in service and product; unfair trade practice.",
    acts: "Consumer Protection Act 2019",
  },
  {
    term: "Service matters",
    def: "Government employment, compassionate appointment, service disputes before the Tribunal and High Court.",
    acts: "AP State & Subordinate Service Rules · Administrative Tribunals Act",
  },
];

export default function PracticePage() {
  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <p className="section-label mb-2">Practice areas</p>
        <h1 className="font-display text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
          Where the tool is tuned
        </h1>
        <p className="mt-3 max-w-2xl font-serif text-[var(--color-text-muted)]">
          NyayaVedika is optimised for the work that actually reaches an
          Anantapur chamber desk — revenue, bail, partition, and routine civil.
        </p>

        <div className="mt-10 space-y-4">
          {AREAS.map((a) => (
            <article key={a.term} className="glass rounded-lg p-5 sm:p-6">
              <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
                {a.term}
              </h2>
              <p className="mt-2 font-serif text-sm leading-relaxed text-[var(--color-text-muted)]">
                {a.def}
              </p>
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-cyan)]">
                {a.acts}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/search" className="btn-cyan">
            Search case law
            <ArrowRight size={14} />
          </Link>
          <Link href="/drafting" className="btn-ghost">
            Open drafting
          </Link>
        </div>
      </div>
    </div>
  );
}
