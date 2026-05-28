"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ScrollText, User, LogOut, Menu, X, Scale } from "lucide-react";
import AuthModal from "./auth-modal";

const navLinks = [
  { href: "/search/", label: "Search", icon: Search },
  { href: "/drafting/", label: "Drafting", icon: ScrollText },
];

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(9,13,22,0.85)] backdrop-blur-xl border-b border-[rgba(212,175,55,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] flex items-center justify-center group-hover:border-[rgba(212,175,55,0.4)] transition-colors">
              <Scale className="w-4 h-4 text-gold" />
            </div>
            <span className="font-semibold text-[#F1F5F9] text-lg font-display-legal">
              Nyaya
              <span className="text-gold">Vedika</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-gold bg-[rgba(212,175,55,0.1)]"
                      : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[rgba(212,175,55,0.06)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <button
              onClick={() => setIsAuthOpen(true)}
              className="ml-2 px-4 py-2 text-sm font-medium border border-[rgba(212,175,55,0.25)] text-gold rounded-lg hover:border-[rgba(212,175,55,0.5)] hover:bg-[rgba(212,175,55,0.06)] transition-all"
            >
              Sign In
            </button>
          </nav>

          <button
            className="md:hidden w-9 h-9 rounded-lg bg-[rgba(212,175,55,0.06)] border border-[rgba(212,175,55,0.15)] flex items-center justify-center text-[#94A3B8] hover:text-[#F1F5F9]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-[rgba(9,13,22,0.95)] backdrop-blur-xl border-b border-[rgba(212,175,55,0.1)] mx-4 rounded-lg overflow-hidden"
            >
              <div className="p-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                      pathname === link.href
                        ? "text-gold bg-[rgba(212,175,55,0.1)]"
                        : "text-[#94A3B8] hover:text-[#F1F5F9]"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => { setMobileOpen(false); setIsAuthOpen(true); }}
                  className="mt-2 px-3 py-2.5 text-sm font-medium border border-[rgba(212,175,55,0.25)] text-gold rounded-lg"
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
