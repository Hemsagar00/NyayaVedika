import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t-2 border-[var(--color-ink)] bg-[var(--color-paper)] mt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 border-2 border-[var(--color-chakra-red)] flex items-center justify-center -rotate-3">
                <span className="font-display font-bold text-[var(--color-chakra-red)] text-lg leading-none">
                  न्य
                </span>
              </div>
              <span className="font-display text-[1.2rem] font-semibold text-[var(--color-ink)]">
                NyayaVedika
              </span>
            </div>
            <p className="font-serif text-[0.95rem] text-[var(--color-ink-faded)] leading-relaxed max-w-md italic">
              A working tool, not a product. Used in chamber at Naga Law Chambers,
              Anantapur, by Adv. S. Nagendra Naik.
            </p>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-pencil)] mt-3">
              #नागार्जुन_नगर, अनंतपुर — 515001
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-ink-faded)] mb-4">
              The tool
            </h4>
            <ul className="space-y-2 font-serif text-[0.9rem]">
              <li><Link href="/search" className="text-[var(--color-ink)] no-underline hover:text-[var(--color-chakra-red)]">Case law search</Link></li>
              <li><Link href="/drafting" className="text-[var(--color-ink)] no-underline hover:text-[var(--color-chakra-red)]">Document drafting</Link></li>
              <li><Link href="/practice" className="text-[var(--color-ink)] no-underline hover:text-[var(--color-chakra-red)]">Practice areas</Link></li>
              <li><a href="https://t.me/nagalawchambers_bot" className="text-[var(--color-ink)] no-underline hover:text-[var(--color-chakra-red)]">Telegram bot</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-ink-faded)] mb-4">
              The chambers
            </h4>
            <ul className="space-y-2 font-serif text-[0.9rem]">
              <li><a href="https://nagalawchambers.com" className="text-[var(--color-ink)] no-underline hover:text-[var(--color-chakra-red)]">nagalawchambers.com</a></li>
              <li className="text-[var(--color-ink-faded)]">Anantapur Bar Association</li>
              <li className="text-[var(--color-ink-faded)]">+91 8554 ———</li>
            </ul>
          </div>
        </div>

        <hr className="border-t border-[var(--color-ink)] mb-6" style={{ borderTopWidth: "1px" }} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-pencil)]">
            © 2026 Naga Law Chambers · For the Bar, by the Bar
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-pencil)]">
            <Link href="/privacy" className="text-[var(--color-ink-faded)] no-underline hover:text-[var(--color-chakra-red)]">Privacy</Link>
            <span className="mx-2">·</span>
            <Link href="/terms" className="text-[var(--color-ink-faded)] no-underline hover:text-[var(--color-chakra-red)]">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
