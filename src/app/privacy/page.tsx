export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main id="main" className="min-h-[100dvh] pt-10 pb-24">
      <article className="wrap max-w-2xl">
        <h1 className="text-[2.3rem] font-semibold tracking-tight">Privacy</h1>
        <p className="mt-3 text-[var(--fg-muted)]">Last updated 19 August 2026.</p>
        <div className="mt-10 space-y-6 text-[1.02rem] leading-relaxed text-[var(--fg-muted)]">
          <p>
            NyayaVedika is a chamber tool of Naga Law Chambers, Anantapur. Queries you type on this
            site are used only to return case law and a first draft.
          </p>
          <p>
            If an API key is configured, a query may be sent to Indian Kanoon or to a drafting
            model. Those providers then process the text under their own terms. Do not paste
            privileged client papers, Aadhaar numbers, or medical records into the public form.
          </p>
          <p>
            We do not sell data. We do not run advertising trackers. Server logs may keep an IP
            address for a short period for rate limiting.
          </p>
          <p>
            For a deletion request write to Naga Law Chambers, Door No. 12-3-218, Subash Road,
            Anantapur 515001, or use the Telegram bot.
          </p>
        </div>
      </article>
    </main>
  );
}
