import Link from "next/link";

export function Navbar() {
  return (
    <header className="relative border-b border-[var(--color-ink)] bg-[var(--color-paper)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 border-2 border-[var(--color-chakra-red)] flex items-center justify-center -rotate-3">
            <span className="font-display font-bold text-[var(--color-chakra-red)] text-lg leading-none">
              न्य
            </span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[1.15rem] font-semibold tracking-tight text-[var(--color-ink)]">
              NyayaVedika
            </span>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[var(--color-pencil)] mt-0.5">
              Anantapur · est. 2026
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/search"
            className="font-serif text-[0.9rem] text-[var(--color-ink-faded)] no-underline hover:text-[var(--color-chakra-red)] transition-colors"
          >
            Search
          </Link>
          <Link
            href="/drafting"
            className="font-serif text-[0.9rem] text-[var(--color-ink-faded)] no-underline hover:text-[var(--color-chakra-red)] transition-colors"
          >
            Drafting
          </Link>
          <Link
            href="/practice"
            className="font-serif text-[0.9rem] text-[var(--color-ink-faded)] no-underline hover:text-[var(--color-chakra-red)] transition-colors"
          >
            Practice
          </Link>
          <a
            href="https://t.me/nagalawchambers_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-paper"
            style={{ padding: "0.5rem 0.9rem", fontSize: "0.72rem" }}
          >
            Ask on Telegram
          </a>
        </nav>

        <button
          aria-label="Menu"
          className="md:hidden font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] px-3 py-2 border border-[var(--color-ink)]"
        >
          Menu
        </button>
      </div>
      {/* hand-drawn double rule under navbar */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="border-t border-[var(--color-ink)]" style={{ borderTopWidth: "2px" }} />
      </div>
    </header>
  );
}
