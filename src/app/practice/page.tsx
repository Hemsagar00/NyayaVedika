"use client";

export default function PracticePage() {
  const AREAS = [
    {
      term: "Revenue and land",
      def: "Adangal, Pahani, EC, NOC, mutation, and the AP Revenue Code. Most chamber work in Anantapur sits here.",
      acts: "AP Revenue Code · Indian Stamp Act · Registration Act",
    },
    {
      term: "Bail and criminal",
      def: "Anticipatory bail (438 CrPC), regular bail, quashing petitions under 482 CrPC, 498A, NDPS, and the regular criminal trial work.",
      acts: "CrPC 1973 · IPC 1860 · NDPS Act 1985",
    },
    {
      term: "Family and partition",
      def: "Hindu Succession Act 1956, partition suits, succession certificates, maintenance under Section 125 CrPC.",
      acts: "Hindu Succession Act · Hindu Marriage Act · Special Marriage Act",
    },
    {
      term: "Civil and contract",
      def: "Money recovery, written statements, summary suits under Order XXXVII, Section 80 CPC notices, injunctions.",
      acts: "CPC 1908 · Indian Contract Act · Specific Relief Act",
    },
    {
      term: "Consumer forums",
      def: "District, State, and NCDRC complaints; deficiency in service and product; unfair trade practice.",
      acts: "Consumer Protection Act 2019",
    },
    {
      term: "Service matters",
      def: "AP and TS service rules, promotion disputes, disciplinary proceedings, and pay-fixation revisions.",
      acts: "AP State and Subordinate Service Rules · TS Service Rules",
    },
  ];

  return (
    <main className="relative min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="section-number">&mdash; Practice Areas &mdash;</p>
          <div className="stamp">Chamber Reference</div>
        </div>

        <h1 className="font-display text-[2.5rem] sm:text-[3rem] font-semibold text-[var(--color-ink)] mb-2 leading-tight">
          <span className="red-underline-sketch">Practice areas.</span>
        </h1>
        <p className="font-serif text-[1.05rem] text-[var(--color-ink-faded)] mb-10 max-w-2xl italic">
          The work that comes across the desk. The Acts that come up.
          Nothing else.
        </p>

        <hr className="border-t-2 border-[var(--color-ink)] mb-6" />

        <div className="space-y-8">
          {AREAS.map((a, i) => (
            <article key={i} className="grid grid-cols-12 gap-4">
              <div className="col-span-1">
                <span className="font-mono text-[0.8rem] text-[var(--color-chakra-red)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="col-span-11">
                <h2 className="font-display text-[1.35rem] font-semibold text-[var(--color-ink)] mb-2">
                  {a.term}
                </h2>
                <p className="font-serif text-[1rem] text-[var(--color-ink-faded)] leading-relaxed mb-2">
                  {a.def}
                </p>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-pencil)]">
                  &mdash; {a.acts}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
