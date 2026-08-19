"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/search", label: "Search" },
  { href: "/drafting", label: "Drafting" },
  { href: "/practice", label: "Practice" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[rgba(5,5,8,0.85)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3 no-underline">
          <div className="relative flex h-8 w-8 items-center justify-center border border-[var(--color-cyan)]/60 bg-[rgba(0,229,255,0.06)]">
            <span className="font-mono text-sm font-semibold tracking-tight text-[var(--color-cyan)]">
              NV
            </span>
            <span className="absolute -bottom-px -right-px h-1.5 w-1.5 bg-[var(--color-cyan)] pulse-cyan" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[1.05rem] font-semibold tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-cyan)] transition-colors">
              NyayaVedika
            </span>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
              Kiwi · Case Law & Drafts
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-text-muted)] transition-colors hover:bg-[rgba(0,229,255,0.06)] hover:text-[var(--color-cyan)]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://t.me/nagalawchambers_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyan ml-3 !py-1.5 !px-3 !text-[0.7rem]"
          >
            Telegram
          </a>
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center border border-[var(--color-border)] text-[var(--color-text-muted)] md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[rgba(5,5,8,0.97)] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-2.5 font-mono text-sm uppercase tracking-[0.1em] text-[var(--color-text-muted)] hover:bg-[rgba(0,229,255,0.06)] hover:text-[var(--color-cyan)]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://t.me/nagalawchambers_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyan mt-2 justify-center"
              onClick={() => setOpen(false)}
            >
              Ask on Telegram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
