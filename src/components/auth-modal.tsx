"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Scale } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [barNumber, setBarNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // TODO: Wire to Supabase when env vars are set
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-[rgba(9,13,22,0.85)] backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative glass-card w-full max-w-md p-6 sm:p-8"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#F1F5F9]">
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 mb-6">
              <Scale className="w-5 h-5 text-gold" />
              <span className="font-semibold text-lg text-[#F1F5F9] font-display-legal">{mode === "signin" ? "Sign In" : "Create Account"}</span>
            </div>

            <div className="flex gap-1 mb-6 bg-[rgba(15,23,42,0.5)] rounded-lg p-1">
              <button
                onClick={() => setMode("signin")}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${mode === "signin" ? "bg-[rgba(212,175,55,0.15)] text-gold" : "text-[#94A3B8] hover:text-[#F1F5F9]"}`}
              >Sign In</button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${mode === "signup" ? "bg-[rgba(212,175,55,0.15)] text-gold" : "text-[#94A3B8] hover:text-[#F1F5F9]"}`}
              >Sign Up</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="auth-email" className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input id="auth-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="advocate@chamber.com" className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)] transition-colors" />
                </div>
              </div>

              <div>
                <label htmlFor="auth-password" className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input id="auth-password" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)] transition-colors" />
                </div>
              </div>

              {mode === "signup" && (
                <div>
                  <label htmlFor="auth-bar" className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-1.5">Bar Enrollment No. (optional)</label>
                  <input id="auth-bar" type="text" value={barNumber} onChange={e => setBarNumber(e.target.value)} placeholder="e.g. AP/1234/2020" className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)] transition-colors" />
                </div>
              )}

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button type="submit" disabled={loading} className="w-full py-2.5 bg-[#D4AF37] text-[#090D16] font-semibold rounded-lg hover:bg-[#E8C84A] transition-colors disabled:opacity-50 text-sm">
                {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
