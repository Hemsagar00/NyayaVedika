"use client";

import Link from "next/link";
import { Scale } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(212,175,55,0.1)] bg-[#090D16]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] flex items-center justify-center">
                <Scale className="w-4 h-4 text-gold" />
              </div>
              <span className="font-semibold text-[#F1F5F9] text-lg font-display-legal">Nyaya<span className="text-gold">Vedika</span></span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs">
              AI-powered legal research and drafting suite purpose-built for Indian advocates and litigation chambers.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F1F5F9] mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              <li><Link href="/search/" className="text-sm text-[#94A3B8] hover:text-gold transition-colors">Case Law Search</Link></li>
              <li><Link href="/drafting/" className="text-sm text-[#94A3B8] hover:text-gold transition-colors">Legal Drafting</Link></li>
              <li><span className="text-sm text-[#94A3B8] cursor-not-allowed">Dashboard (coming soon)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F1F5F9] mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              <li><Link href="/privacy/" className="text-sm text-[#94A3B8] hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="text-sm text-[#94A3B8] hover:text-gold transition-colors">Terms of Service</Link></li>
              <li><span className="text-sm text-[#94A3B8]">© 2026 NyayaVedika Cognitive Systems</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(212,175,55,0.08)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748B]">© 2026 NyayaVedika Cognitive Systems. All rights reserved.</p>
          <p className="text-xs text-[#64748B]">Built for Indian advocates.</p>
        </div>
      </div>
    </footer>
  );
}
