import Link from "next/link";
import { PRACTICE_AREAS } from "@/lib/corpus";

export const metadata = {
  title: "Practice",
};

export default function PracticePage() {
  return (
    <main id="main" className="min-h-[100dvh] pt-10 pb-24">
      <div className="wrap">
        <p className="text-[0.8rem] text-[var(--fg-muted)]">Anantapur chamber</p>
        <h1 className="mt-2 max-w-[12ch] text-[2.4rem] font-semibold tracking-tight md:text-[3.2rem]">
          Practice areas.
        </h1>
        <p className="mt-4 max-w-[46ch] text-[var(--fg-muted)]">
          The files that actually come in. Each area opens a live search on this desk.
        </p>

        <div className="mt-12 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
          {PRACTICE_AREAS.map((a) => (
            <article key={a.id} className="grid gap-4 py-8 md:grid-cols-12 md:items-start">
              <h2 className="text-[1.45rem] font-semibold md:col-span-4">{a.title}</h2>
              <div className="md:col-span-5">
                <p className="leading-relaxed text-[var(--fg-muted)]">{a.body}</p>
                <p className="mt-3 font-mono text-[0.72rem] text-[var(--fg-muted)]">{a.acts}</p>
              </div>
              <div className="flex flex-wrap gap-3 md:col-span-3 md:justify-end">
                <Link
                  href={`/search/?q=${encodeURIComponent(a.query)}`}
                  className="btn btn-primary no-underline"
                  style={{ padding: "0.55rem 0.9rem" }}
                >
                  Search
                </Link>
                <Link
                  href={`/drafting/?type=${a.draft}`}
                  className="btn btn-ghost no-underline"
                  style={{ padding: "0.55rem 0.9rem" }}
                >
                  Draft
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
