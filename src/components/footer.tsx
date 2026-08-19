import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[rgba(5,5,8,0.9)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-[var(--color-cyan)]">
                NYAYAVEDIKA
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)] pulse-cyan" />
            </div>
            <p className="font-serif text-sm leading-relaxed text-[var(--color-text-muted)]">
              Case law search with verbatim ratio decidendi and registry-ready
              first drafts for Indian advocates.
            </p>
            <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-text-faint)]">
              Anantapur · est. 2026
            </p>
          </div>

          <div>
            <h4 className="section-label mb-4">The tool</h4>
            <ul className="space-y-2.5 font-serif text-sm">
              <li>
                <Link href="/search" className="text-[var(--color-text-muted)] hover:text-[var(--color-cyan)]">
                  Case law search
                </Link>
              </li>
              <li>
                <Link href="/drafting" className="text-[var(--color-text-muted)] hover:text-[var(--color-cyan)]">
                  Document drafting
                </Link>
              </li>
              <li>
                <Link href="/practice" className="text-[var(--color-text-muted)] hover:text-[var(--color-cyan)]">
                  Practice areas
                </Link>
              </li>
              <li>
                <a
                  href="https://t.me/nagalawchambers_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-cyan)]"
                >
                  Telegram bot
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="section-label mb-4">Chamber</h4>
            <ul className="space-y-2.5 font-serif text-sm text-[var(--color-text-muted)]">
              <li>
                <a
                  href="https://nagalawchambers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-cyan)]"
                >
                  nagalawchambers.com
                </a>
              </li>
              <li>Anantapur Bar Association</li>
              <li className="font-mono text-xs">Door No. 12-3-218, Subash Road</li>
              <li className="font-mono text-xs">Anantapur — 515001</li>
            </ul>
          </div>

          <div>
            <h4 className="section-label mb-4">Legal</h4>
            <ul className="space-y-2.5 font-serif text-sm">
              <li>
                <Link href="/privacy" className="text-[var(--color-text-muted)] hover:text-[var(--color-cyan)]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[var(--color-text-muted)] hover:text-[var(--color-cyan)]">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
            © 2026 NyayaVedika · For the Bar, by the Bar
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
            Ratios · Verbatim · Registry-ready
          </p>
        </div>
      </div>
    </footer>
  );
}
