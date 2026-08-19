"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/search/", label: "Search" },
  { href: "/drafting/", label: "Draft" },
  { href: "/practice/", label: "Practice" },
];

export function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const onHero = path === "/";

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const norm = (p: string) => (p.replace(/\/$/, "") || "/");
  const active = (href: string) => norm(path) === norm(href);

  return (
    <header
      className={
        onHero
          ? "absolute inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 border-b border-[var(--hair)] bg-[var(--bg)]/88 backdrop-blur-xl"
      }
    >
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span
            className={`font-serif text-[1.35rem] leading-none ${
              onHero ? "text-[#d4533c]" : "text-[var(--cta)]"
            }`}
          >
            न्य
          </span>
          <span
            className={`text-[1.02rem] font-semibold tracking-tight ${
              onHero ? "text-white" : "text-[var(--fg)]"
            }`}
          >
            NyayaVedika
          </span>
        </Link>

        <nav
          className={`hidden items-center gap-1 rounded-full px-1.5 py-1 md:flex ${
            onHero
              ? "bg-white/12 text-white backdrop-blur-xl"
              : "border border-[var(--hair)] bg-[var(--card)]"
          }`}
          style={onHero ? { border: "1px solid rgb(255 255 255 / 0.18)" } : undefined}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-1.5 text-[0.86rem] no-underline transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                active(l.href)
                  ? onHero
                    ? "bg-white text-[var(--color-ink)]"
                    : "bg-[var(--color-ink)] text-white"
                  : onHero
                    ? "text-white/80 hover:text-white"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://t.me/nagalawchambers_bot"
          className={`btn hidden text-[0.82rem] md:inline-flex ${
            onHero ? "btn-on-dark" : "btn-primary"
          }`}
          style={{ padding: "0.55rem 0.95rem" }}
        >
          Telegram
        </a>

        <button
          type="button"
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold tracking-wide md:hidden ${
            onHero ? "bg-white text-[var(--color-ink)]" : "border border-[var(--hair)] text-[var(--fg)]"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-[var(--color-navy)]/92 px-6 pt-24 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            {LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="translate-y-0 text-3xl font-semibold text-white no-underline"
                style={{ animation: `nvIn 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms both` }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://t.me/nagalawchambers_bot"
              className="mt-6 text-lg text-white/80 no-underline"
            >
              Ask on Telegram
            </a>
          </nav>
        </div>
      ) : null}

      <style>{`@keyframes nvIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }`}</style>
    </header>
  );
}
