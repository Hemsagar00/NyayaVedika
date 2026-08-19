import Link from "next/link";
import { QueryBox } from "@/components/query-box";
import { Reveal } from "@/components/reveal";
import { PRACTICE_AREAS } from "@/lib/corpus";
import { DOC_TYPES } from "@/lib/drafts";

export default function Home() {
  return (
    <main id="main">
      <section className="relative min-h-[100dvh] overflow-hidden">
        <img
          src="/media/hero-corridor.jpg"
          alt="Empty corridor of a South Indian district court, morning light on wooden benches."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgb(16 22 32 / 0.82) 0%, rgb(16 22 32 / 0.45) 48%, rgb(16 22 32 / 0.18) 100%), linear-gradient(180deg, rgb(16 22 32 / 0.2) 0%, rgb(16 22 32 / 0.55) 100%)",
          }}
        />
        <div className="relative wrap flex min-h-[100dvh] items-end pb-16 pt-28 md:pb-20">
          <div className="max-w-xl">
            <h1 className="text-[2.05rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-[3.1rem] md:text-[3.45rem]">
              Find the ratio.
              <span className="block">File the first draft.</span>
            </h1>
            <p className="mt-4 max-w-[36ch] text-[1.05rem] leading-relaxed text-white/78">
              Case law with the ratio already pulled. A first draft in the format the registry accepts.
            </p>
            <div className="mt-8 max-w-2xl">
              <QueryBox size="hero" />
            </div>
            <Link href="/drafting/" className="btn btn-on-dark-ghost mt-5 no-underline">
              Draft a pleading
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="wrap grid items-start gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
              How the desk works
            </h2>
            <p className="mt-3 max-w-[36ch] text-[var(--fg-muted)]">
              The same three moves a junior makes on a Tuesday morning in Anantapur.
            </p>
          </Reveal>
          <div className="space-y-10 md:col-span-8">
            {[
              {
                n: "1",
                t: "State the issue",
                b: "Plain English or Telugu. The FIR number, the survey number, or the way you would tell a senior.",
              },
              {
                n: "2",
                t: "Read the ratio",
                b: "Reported holdings, with the citation and the sentence the judge actually wrote. Open the full text on Indian Kanoon.",
              },
              {
                n: "3",
                t: "File the first draft",
                b: "Bail, partition, mutation, notice, consumer, written statement. You edit. You do not start from a blank page.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="grid grid-cols-12 gap-4 border-t border-[var(--hair)] pt-8">
                <p className="col-span-2 font-serif text-5xl leading-none text-[var(--cta)] md:text-6xl">{s.n}</p>
                <div className="col-span-10">
                  <h3 className="text-[1.45rem] font-semibold tracking-tight">{s.t}</h3>
                  <p className="mt-2 max-w-[48ch] text-[1rem] leading-relaxed text-[var(--fg-muted)]">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden pb-8">
        <div className="wrap grid gap-10 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            <h2 className="text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
              Ask the matter the way you would ask a senior.
            </h2>
            <p className="mt-4 max-w-[42ch] leading-relaxed text-[var(--fg-muted)]">
              Search returns Supreme Court holdings kept on this desk, and Indian Kanoon when a key is configured. Fake local citations have been removed.
            </p>
            <Link href="/search/" className="btn btn-primary group mt-8 no-underline">
              Open search
              <span className="btn-icon">↗</span>
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7">
            <div className="border border-[var(--hair)] bg-[var(--card)] p-5 md:p-6">
              <p className="label">Closest holding</p>
              <article className="cite-rule">
                <p className="font-mono text-[0.72rem] uppercase tracking-wide text-[var(--cta)]">
                  Supreme Court of India
                </p>
                <p className="mt-1 font-serif text-[1.2rem] italic leading-snug">
                  Arnesh Kumar v. State of Bihar
                </p>
                <p className="mt-1 font-mono text-[0.8rem] text-[var(--fg-muted)]">(2014) 8 SCC 273</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed">
                  Arrest is not automatic on a cognizable complaint. For offences punishable up to seven years, the officer must record why arrest is necessary. Omnibus 498A allegations do not justify mechanical arrest.
                </p>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="wrap grid gap-10 md:grid-cols-12 md:items-start">
          <Reveal className="order-2 md:order-1 md:col-span-7">
            <img
              src="/media/cause-list.jpg"
              alt="Cause list, encumbrance certificate, and a brief tied with red thread."
              className="h-[22rem] w-full object-cover md:h-[28rem]"
            />
          </Reveal>
          <Reveal className="order-1 md:order-2 md:col-span-5 md:pt-6">
            <h2 className="text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
              A first draft the registry will recognise.
            </h2>
            <p className="mt-4 max-w-[40ch] leading-relaxed text-[var(--fg-muted)]">
              Six formats used in this district. Parties and facts go in. The structure stays fixed.
            </p>
            <ul className="mt-6 space-y-2 text-[0.95rem]">
              {DOC_TYPES.map((d) => (
                <li key={d.id} className="flex items-baseline justify-between gap-4 border-b border-[var(--hair)] py-2">
                  <Link href={`/drafting/?type=${d.id}`} className="no-underline hover:text-[var(--cta)]">
                    {d.label}
                  </Link>
                  <span className="font-mono text-[0.7rem] text-[var(--fg-muted)]">{d.court}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="pb-8">
        <div className="wrap">
          <Reveal>
            <h2 className="max-w-[16ch] text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
              The work that comes across the desk
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px bg-[var(--hair)] sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICE_AREAS.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.04} className="bg-[var(--bg)] p-6 md:p-8">
                <h3 className="text-[1.2rem] font-semibold">{a.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--fg-muted)]">{a.body}</p>
                <Link
                  href={`/search/?q=${encodeURIComponent(a.query)}`}
                  className="mt-5 inline-block text-[0.9rem] text-[var(--cta)] no-underline"
                >
                  Search this work
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="wrap grid gap-10 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-6">
            <img
              src="/media/chamber-desk.jpg"
              alt="Advocate's wooden desk with an open register, fountain pen, and stamp pad."
              className="h-[22rem] w-full object-cover md:h-[30rem]"
            />
          </Reveal>
          <Reveal className="md:col-span-6 md:pl-4">
            <h2 className="text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
              Built in chamber, not in a product studio.
            </h2>
            <p className="mt-4 max-w-[44ch] leading-relaxed text-[var(--fg-muted)]">
              Adv. S. Nagendra Naik, B.A., LL.B., has practised at the Anantapur Bar since 2011. Revenue, partition, and bail. The desk exists because the citation had to come back with the ratio in it, and the first draft had to look like the registry&apos;s form.
            </p>
            <p className="mt-4 max-w-[44ch] leading-relaxed text-[var(--fg-muted)]">
              It does not replace the advocate. It removes the two hours before the file is ready.
            </p>
            <a href="https://nagalawchambers.com" className="btn btn-ghost mt-8 no-underline">
              Naga Law Chambers
            </a>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img
          src="/media/court-exterior.jpg"
          alt="Modest district court compound in late afternoon light."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-navy)]/78" />
        <div className="relative wrap py-24 text-center md:py-32">
          <h2 className="text-[2.2rem] font-semibold tracking-tight text-white md:text-[3rem]">
            Open the chamber tool
          </h2>
          <p className="mx-auto mt-3 max-w-[36ch] text-white/75">
            Naga Law Chambers, Anantapur. The same desk is on Telegram.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/search/" className="btn btn-primary group no-underline">
              Search a matter
              <span className="btn-icon">↗</span>
            </Link>
            <a href="https://t.me/nagalawchambers_bot" className="btn btn-on-dark-ghost no-underline">
              Ask on Telegram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
