export const metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <main id="main" className="min-h-[100dvh] pt-10 pb-24">
      <article className="wrap max-w-2xl">
        <h1 className="text-[2.3rem] font-semibold tracking-tight">Terms of use</h1>
        <p className="mt-3 text-[var(--fg-muted)]">Last updated 19 August 2026.</p>
        <div className="mt-10 space-y-6 text-[1.02rem] leading-relaxed text-[var(--fg-muted)]">
          <p>
            NyayaVedika is a first-draft aid for advocates. It is not a law firm, not a court, and
            not legal advice to a member of the public.
          </p>
          <p>
            Every citation must be read in full before it is used in a pleading. Holdings on this
            desk are summaries of reported Supreme Court cases and named statutes. They can be
            incomplete. They can be wrongly applied to new facts.
          </p>
          <p>
            Drafts are starting text. Counsel remains responsible for parties, facts, limitation,
            court fee, territorial jurisdiction, and the form the registry accepts.
          </p>
          <p>
            Use of the Telegram bot is subject to the same limits. For a paid consultation, attend
            chambers at Naga Law Chambers, Anantapur, during working hours.
          </p>
        </div>
      </article>
    </main>
  );
}
