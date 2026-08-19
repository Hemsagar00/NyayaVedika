export default function TermsPage() {
  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <p className="section-label mb-2">Legal</p>
        <h1 className="font-display text-3xl font-semibold text-[var(--color-text)]">
          Terms of use
        </h1>
        <div className="mt-8 space-y-4 font-serif text-[var(--color-text-muted)] leading-relaxed">
          <p>
            NyayaVedika provides research assistance and first-draft templates.
            It is not a substitute for independent legal judgment or primary
            source verification.
          </p>
          <p>
            All citations and drafts must be checked against official reports
            (SCC, AIR, Indian Kanoon, e-Courts, or the court record) before any
            filing. The operator accepts no liability for reliance on demo or
            AI-generated content without verification.
          </p>
          <p>
            Use of the site constitutes acceptance of these terms. The tool is
            intended for advocates and clerks engaged in Indian legal practice.
          </p>
        </div>
      </div>
    </div>
  );
}
