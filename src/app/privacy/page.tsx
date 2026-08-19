export default function PrivacyPage() {
  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <p className="section-label mb-2">Legal</p>
        <h1 className="font-display text-3xl font-semibold text-[var(--color-text)]">
          Privacy
        </h1>
        <div className="mt-8 space-y-4 font-serif text-[var(--color-text-muted)] leading-relaxed">
          <p>
            NyayaVedika is a professional tool for advocates. Queries entered
            for search or drafting are processed to return results and drafts.
          </p>
          <p>
            We do not sell personal data. Session data may be used to improve
            the tool. For the Telegram bot, the privacy policy of Telegram
            applies in addition to this page.
          </p>
          <p>
            Contact the chamber via{" "}
            <a href="https://nagalawchambers.com" className="text-[var(--color-cyan)]">
              nagalawchambers.com
            </a>{" "}
            for data-related requests.
          </p>
        </div>
      </div>
    </div>
  );
}
