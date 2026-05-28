"use client";

import { motion } from "framer-motion";
import {
  Search,
  ScrollText,
  Scale,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  BookOpen,
  FileSpreadsheet,
  ChevronDown,
  MessageCircle,
  FileText,
  Gavel,
  Landmark,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

/* ── Particles ── */
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(212, 175, 55, ${Math.random() * 0.25 + 0.08})`,
          }}
          animate={{
            y: [0, -15 - Math.random() * 30, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 5 + Math.random() * 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

/* ── Stat ── */
function StatItem({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <Icon className="w-5 h-5 text-[#D4AF37] mb-2" />
      <span className="text-3xl md:text-4xl font-bold gold-gradient-text font-display-legal">{value}</span>
      <span className="text-sm text-[#94A3B8] mt-1">{label}</span>
    </motion.div>
  );
}

/* ── Feature Card ── */
function FeatureCard({
  title,
  desc,
  icon: Icon,
  badge,
  delay = 0,
}: {
  title: string;
  desc: string;
  icon: any;
  badge?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay }}
      className="group relative rounded-xl p-6 md:p-7 bg-[rgba(15,23,42,0.5)] border border-[rgba(212,175,55,0.12)] hover:border-[rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-1"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 rounded-lg bg-[rgba(212,175,55,0.08)] flex items-center justify-center border border-[rgba(212,175,55,0.15)]">
          <Icon className="w-5 h-5 text-[#D4AF37]" />
        </div>
        {badge && (
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37]/70 bg-[rgba(212,175,55,0.06)] px-2.5 py-1 rounded-full border border-[rgba(212,175,55,0.12)]">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2 font-display-legal">{title}</h3>
      <p className="text-sm text-[#94A3B8] leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ── Problem Card ── */
function ProblemCard({
  icon: Icon,
  title,
  desc,
  delay = 0,
}: {
  icon: any;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center p-6"
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[rgba(212,175,55,0.08)] flex items-center justify-center border border-[rgba(212,175,55,0.15)]">
        <Icon className="w-6 h-6 text-[#D4AF37]" />
      </div>
      <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">{title}</h3>
      <p className="text-sm text-[#94A3B8]">{desc}</p>
    </motion.div>
  );
}

/* ── How It Works Step ── */
function Step({ n, title, desc, icon: Icon }: { n: number; title: string; desc: string; icon: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: n * 0.1 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.2)] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-[#D4AF37]" />
      </div>
      <div className="w-8 h-8 rounded-full bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-[#D4AF37] font-bold text-sm mb-3">
        {n}
      </div>
      <h4 className="text-[#F1F5F9] font-semibold mb-2">{title}</h4>
      <p className="text-sm text-[#94A3B8] max-w-xs">{desc}</p>
    </motion.div>
  );
}

/* ── Use Case Tile ── */
function UseCaseTile({ title, desc, tag, icon: Icon }: { title: string; desc: string; tag: string; icon: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="p-5 rounded-xl bg-[rgba(15,23,42,0.6)] border border-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.3)] transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-[rgba(212,175,55,0.08)] flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#D4AF37]" />
        </div>
        <div className="flex-1">
          <span className="text-[10px] uppercase font-medium text-[#D4AF37]/60 tracking-wider">{tag}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#D4AF37] transition-colors" />
      </div>
      <h4 className="text-sm font-semibold text-[#F1F5F9] mb-1">{title}</h4>
      <p className="text-xs text-[#94A3B8]">{desc}</p>
    </motion.div>
  );
}

/* ── Product Mockup SVG ── */
function ProductMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative w-full max-w-4xl mx-auto mt-12"
    >
      <div className="relative rounded-xl border border-[rgba(212,175,55,0.2)] bg-[rgba(15,23,42,0.8)] overflow-hidden shadow-2xl"
        style={{ backdropFilter: "blur(16px)" }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(212,175,55,0.1)]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
          </div>
          <div className="flex-1 mx-4">
            <div className="max-w-md mx-auto rounded-md bg-[rgba(0,0,0,0.3)] px-3 py-1.5 text-xs text-[#94A3B8] text-center">
              nyayavedika.in/search
            </div>
          </div>
        </div>

        {/* Mock content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[240px]">
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[rgba(212,175,55,0.06)] border border-[rgba(212,175,55,0.1)]">
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs text-[#94A3B8]">Anticipatory bail cruelty...</span>
            </div>
            {[1,2,3].map(i => (
              <div key={i} className="p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                <div className="h-2 w-3/4 bg-[rgba(255,255,255,0.08)] rounded mb-2" />
                <div className="h-2 w-1/2 bg-[rgba(255,255,255,0.05)] rounded" />
              </div>
            ))}
          </div>
          <div className="md:col-span-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-32 bg-[rgba(212,175,55,0.2)] rounded" />
              <span className="text-[10px] text-[#D4AF37] ml-auto">Ratio Decidendi</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-[rgba(255,255,255,0.06)] rounded" />
              <div className="h-2 w-5/6 bg-[rgba(255,255,255,0.06)] rounded" />
              <div className="h-2 w-4/6 bg-[rgba(255,255,255,0.06)] rounded" />
              <div className="h-2 w-full bg-[rgba(255,255,255,0.04)] rounded" />
              <div className="h-2 w-3/4 bg-[rgba(255,255,255,0.04)] rounded" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-7 w-24 bg-[rgba(212,175,55,0.15)] rounded" />
              <div className="h-7 w-20 bg-[rgba(255,255,255,0.05)] rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Glow behind mockup */}
      <div
        className="absolute -inset-4 rounded-2xl pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

/* ── Main Page ── */
export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
        <ParticleField />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(212,175,55,0.15)] bg-[rgba(212,175,55,0.04)] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-medium text-[#D4AF37]/80">AI-Powered Indian Legal Intelligence</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-display-legal tracking-tight leading-[1.05] text-[#F1F5F9]"
          >
            AI legal research and{" "}
            <span className="gold-gradient-text">drafting</span>
            <br className="hidden sm:block" /> for Indian law
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Find relevant authorities faster. Generate structured first drafts.
            Built for Indian legal workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-4"
          >
            <Link
              href="/search/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#090D16] font-semibold rounded-lg hover:bg-[#E8C84A] transition-colors text-base"
            >
              <Search className="w-4 h-4" />
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/drafting/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[rgba(212,175,55,0.2)] text-[#F1F5F9] font-semibold rounded-lg hover:border-[rgba(212,175,55,0.4)] hover:bg-[rgba(212,175,55,0.05)] transition-all text-base"
            >
              <ScrollText className="w-4 h-4 text-[#D4AF37]" />
              Book a Demo
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-[#94A3B8]/50"
          >
            No credit card required · Built for Indian law
          </motion.p>

          {/* Product Mockup */}
          <ProductMockup />
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#94A3B8]/30"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="relative border-t border-[rgba(212,175,55,0.06)] py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-[#94A3B8]/50 mb-2">Trusted by advocates and law firms across India</p>
          <div className="flex items-center justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#D4AF37]/50" />
              <span className="text-sm text-[#94A3B8]/70"><span className="text-[#D4AF37] font-semibold">500+</span> legal professionals</span>
            </div>
            <div className="w-px h-4 bg-[rgba(212,175,55,0.15)]" />
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D4AF37]/50" />
              <span className="text-sm text-[#94A3B8]/70"><span className="text-[#D4AF37] font-semibold">10,000+</span> drafts generated</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM ═══ */}
      <section className="relative py-16 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs uppercase tracking-widest text-[#D4AF37]/60 mb-3 block">The Problem</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display-legal text-[#F1F5F9]">
              Why Indian advocates struggle
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProblemCard
              icon={Clock}
              title="Research takes too long"
              desc="Scattered sources, irrelevant results, hours lost navigating multiple platforms."
              delay={0}
            />
            <ProblemCard
              icon={FileText}
              title="Drafting is repetitive"
              desc="Same structures, different facts — still slow every time. No templates that work."
              delay={0.1}
            />
            <ProblemCard
              icon={Scale}
              title="Generic AI can't be trusted"
              desc="Hallucinated citations, wrong jurisdiction, no legal grounding. Dangerous for practice."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT (2 Cards) ═══ */}
      <section className="relative py-16 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs uppercase tracking-widest text-[#D4AF37]/60 mb-3 block">Product</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display-legal text-[#F1F5F9]">
              Two pillars, one workflow
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-[rgba(15,23,42,0.5)] border border-[rgba(212,175,55,0.12)] hover:border-[rgba(212,175,55,0.3)] transition-all card-3d"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.08)] flex items-center justify-center mb-4 border border-[rgba(212,175,55,0.15)]">
                  <Search className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-2xl font-bold text-[#F1F5F9] mb-3 font-display-legal">Legal Search</h3>
                <p className="text-[#94A3B8] mb-6 leading-relaxed">
                  Find relevant Indian case law, statutes, and legal principles instantly. Jurisdiction-aware, citation-grounded.
                </p>
                <Link href="/search/" className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-medium hover:text-[#E8C84A] transition-colors">
                  Explore Search <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-[rgba(15,23,42,0.5)] border border-[rgba(212,175,55,0.12)] hover:border-[rgba(212,175,55,0.3)] transition-all card-3d"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.08)] flex items-center justify-center mb-4 border border-[rgba(212,175,55,0.15)]">
                  <ScrollText className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-2xl font-bold text-[#F1F5F9] mb-3 font-display-legal">Legal Drafting</h3>
                <p className="text-[#94A3B8] mb-6 leading-relaxed">
                  Generate structured, citation-aware first drafts for Indian legal documents — notices, petitions, affidavits.
                </p>
                <Link href="/drafting/" className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-medium hover:text-[#E8C84A] transition-colors">
                  Explore Drafting <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="relative py-16 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs uppercase tracking-widest text-[#D4AF37]/60 mb-3 block">Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display-legal text-[#F1F5F9]">How it works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step n={1} title="Describe your legal issue" desc="Enter case details, upload matter context, or paste your query." icon={Search} />
            <Step n={2} title="Review grounded authorities" desc="AI surfaces relevant Indian case law with summaries and citations." icon={BookOpen} />
            <Step n={3} title="Generate a professional draft" desc="Receive a structured, citation-aware first draft — ready to edit." icon={ScrollText} />
          </div>

          <div className="text-center mt-10">
            <Link href="/search/" className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-medium hover:text-[#E8C84A] transition-colors">
              Try it now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="relative py-16 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs uppercase tracking-widest text-[#D4AF37]/60 mb-3 block">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display-legal text-[#F1F5F9]">
              Built for <span className="gold-gradient-text">Advocates</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FeatureCard title="Hybrid Full-Text Research" desc="Instant search matching keywords, citations, benches, or subjects across our Indian Case Law Database." icon={Search} badge="GIN Vector Index" delay={0} />
            <FeatureCard title="5-Step Smart Drafting" desc="Select jurisdiction, map parties, detail facts and prayers — watch high-fidelity legal drafts assemble." icon={ScrollText} badge="AI-Powered" delay={0.1} />
            <FeatureCard title="Ratio Decidendi Extraction" desc="Judgment summaries with gold-framed ratio decidendi callouts. Grasp the core legal principle in seconds." icon={Scale} badge="AI Extracted" delay={0.2} />
            <FeatureCard title="Secure Advocate Vault" desc="Row Level Security by default. Every draft is encrypted at rest and visible only to you." icon={ShieldCheck} badge="End-to-End" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="relative py-16 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs uppercase tracking-widest text-[#D4AF37]/60 mb-3 block">Use Cases</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display-legal text-[#F1F5F9]">What you can build</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <UseCaseTile title="Case law research" desc="Search SCC, High Courts, Tribunals" tag="Search" icon={Landmark} />
            <UseCaseTile title="Legal notices" desc="Demand, reply, termination notices" tag="Drafting" icon={FileText} />
            <UseCaseTile title="Consumer complaints" desc="NCDRC / State / District forum" tag="Drafting" icon={Gavel} />
            <UseCaseTile title="Affidavits" desc="Court-ready sworn statements" tag="Drafting" icon={CheckCircle} />
            <UseCaseTile title="Contract drafting" desc="Agreements, MOUs, NDAs" tag="Drafting" icon={FileSpreadsheet} />
            <UseCaseTile title="Litigation prep" desc="Pleadings, written statements, replies" tag="Both" icon={Scale} />
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative py-14 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="47,283" label="Case Laws Indexed" icon={BookOpen} />
            <StatItem value="1,847" label="Templates Ready" icon={FileSpreadsheet} />
            <StatItem value="99.2%" label="Query Uptime" icon={ShieldCheck} />
            <StatItem value="3,142" label="Advocate Chambers" icon={Scale} />
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="relative py-16 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <MessageCircle className="w-8 h-8 text-[#D4AF37]/30 mx-auto" />
            </div>
            <blockquote className="text-xl md:text-2xl text-[#F1F5F9] font-display-legal italic leading-relaxed mb-6">
              "NyayaVedika reduced my research time from 6 hours to 45 minutes. The ratio extraction alone is worth the subscription."
            </blockquote>
            <div>
              <p className="text-[#F1F5F9] font-semibold">Adv. S. Nagendra Naik</p>
              <p className="text-sm text-[#94A3B8]">Anantapur Bar Association · 15+ years practice</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-20 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 60%)",
              }}
            />
            <h2 className="relative text-3xl sm:text-4xl font-bold font-display-legal mb-4 text-[#F1F5F9]">
              Start researching and drafting{" "}
              <span className="gold-gradient-text">smarter</span>
            </h2>
            <p className="relative text-[#94A3B8] mb-8 max-w-lg mx-auto">
              Join legal professionals using NyayaVedika to work faster and win more time.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search/" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#090D16] font-semibold rounded-lg hover:bg-[#E8C84A] transition-colors">
                <Search className="w-4 h-4" />
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/drafting/" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[rgba(212,175,55,0.2)] text-[#F1F5F9] font-semibold rounded-lg hover:border-[rgba(212,175,55,0.4)] hover:bg-[rgba(212,175,55,0.05)] transition-all">
                <ScrollText className="w-4 h-4 text-[#D4AF37]" />
                Book a Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
