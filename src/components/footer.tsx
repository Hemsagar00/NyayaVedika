import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--hair)]">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="mb-3 flex items-center gap-2 text-[1.05rem] font-semibold">
            <span className="font-serif text-[var(--cta)]">न्य</span>
            NyayaVedika
          </p>
          <p className="max-w-md text-[0.95rem] leading-relaxed text-[var(--fg-muted)]">
            A chamber desk for the Anantapur Bar. Case law with the ratio already
            pulled. A first draft you still have to edit.
          </p>
          <p className="mt-4 text-[0.82rem] text-[var(--fg-muted)]">
            Naga Law Chambers, Door No. 12-3-218, Subash Road, Anantapur 515001
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-wide text-[var(--fg-muted)]">
            Desk
          </p>
          <ul className="space-y-2 text-[0.95rem]">
            <li>
              <Link href="/search/" className="no-underline hover:text-[var(--cta)]">
                Search case law
              </Link>
            </li>
            <li>
              <Link href="/drafting/" className="no-underline hover:text-[var(--cta)]">
                Draft a pleading
              </Link>
            </li>
            <li>
              <Link href="/practice/" className="no-underline hover:text-[var(--cta)]">
                Practice areas
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-wide text-[var(--fg-muted)]">
            Chambers
          </p>
          <ul className="space-y-2 text-[0.95rem]">
            <li>
              <a href="https://nagalawchambers.com" className="no-underline hover:text-[var(--cta)]">
                nagalawchambers.com
              </a>
            </li>
            <li>
              <a
                href="https://t.me/nagalawchambers_bot"
                className="no-underline hover:text-[var(--cta)]"
              >
                Telegram bot
              </a>
            </li>
            <li className="text-[var(--fg-muted)]">Mon-Sat, 10:00-18:00 IST</li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col gap-3 border-t border-[var(--hair)] py-6 text-[0.8rem] text-[var(--fg-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Naga Law Chambers. For the Bar, by the Bar.</p>
        <p className="flex gap-4">
          <Link href="/privacy/" className="no-underline hover:text-[var(--fg)]">
            Privacy
          </Link>
          <Link href="/terms/" className="no-underline hover:text-[var(--fg)]">
            Terms
          </Link>
        </p>
      </div>
    </footer>
  );
}
