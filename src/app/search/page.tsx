"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Scale, Landmark, Calendar, FileText, ArrowRight } from "lucide-react";

function SearchWorkspace() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [court, setCourt] = useState(searchParams.get("court") || "All");
  const [results] = useState([
    { id: 1, title: "ABC v. State of Maharashtra", court: "Supreme Court of India", date: "2024-03-15", bench: "3-Judge", excerpt: "The ratio decidendi of this case establishes that..." },
    { id: 2, title: "XYZ Ltd v. Union of India", court: "Delhi High Court", date: "2024-01-20", bench: "Division Bench", excerpt: "Writ petition under Article 32 dismissed with liberty..." },
  ]);
  const [selected, setSelected] = useState<typeof results[0] | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "doc">("list");

  const courts = ["All", "Supreme Court of India", "High Court", "Central Bare Acts"];

  const selectDoc = (doc: typeof results[0]) => { setSelected(doc); if (window.innerWidth < 768) setMobileView("doc"); };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#090D16] flex">
      {/* List panel */}
      <div className={`${selected ? "hidden md:flex w-1/3" : "w-full"} flex-col border-r border-[rgba(212,175,55,0.08)]`}>
        <div className="p-4 border-b border-[rgba(212,175,55,0.08)]">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search judgments, citations, acts..." className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)]" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {courts.map(c => (
              <button key={c} onClick={() => setCourt(c)} className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${court === c ? "bg-[rgba(212,175,55,0.15)] text-gold border border-[rgba(212,175,55,0.25)]" : "text-[#94A3B8] bg-[rgba(15,23,42,0.5)] border border-[rgba(212,175,55,0.08)] hover:border-[rgba(212,175,55,0.2)]"}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {results.map((r) => (
            <button key={r.id} onClick={() => selectDoc(r)} className={`w-full text-left p-3.5 rounded-lg transition-all border ${selected?.id === r.id ? "bg-[rgba(212,175,55,0.08)] border-[rgba(212,175,55,0.2)]" : "bg-[#0F172A] border-[rgba(212,175,55,0.06)] hover:border-[rgba(212,175,55,0.15)]"}`}>
              <div className="flex items-center gap-2 mb-1">
                <Landmark className="w-3.5 h-3.5 text-gold-dim shrink-0" />
                <span className="text-xs text-[#94A3B8]">{r.court}</span>
                <span className="text-[10px] text-[#475569] ml-auto">{r.date}</span>
              </div>
              <h3 className="text-sm font-medium text-[#F1F5F9] mb-1 font-display-legal">{r.title}</h3>
              <p className="text-xs text-[#94A3B8] line-clamp-2">{r.excerpt}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(212,175,55,0.06)] text-gold-dim border border-[rgba(212,175,55,0.1)]">{r.bench}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Document panel */}
      {selected && (
        <div className={`${mobileView === "doc" ? "flex w-full" : "hidden md:flex w-2/3"} flex-col`}>
          <div className="md:hidden p-3 border-b border-[rgba(212,175,55,0.08)]">
            <button onClick={() => { setMobileView("list"); setSelected(null); }} className="text-sm text-gold flex items-center gap-1">← Back to results</button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Scale className="w-4 h-4 text-gold" />
                  <span className="text-xs text-[#94A3B8]">{selected.court} · {selected.bench}</span>
                </div>
                <h1 className="text-xl font-bold text-[#F1F5F9] font-display-legal">{selected.title}</h1>
                <span className="text-xs text-[#64748B]">Decided: {selected.date}</span>
              </div>
              <button className="px-3 py-1.5 text-xs font-medium border border-[rgba(212,175,55,0.25)] text-gold rounded-lg hover:bg-[rgba(212,175,55,0.06)] transition-colors">
                Draft with Precedent
                <ArrowRight className="w-3 h-3 inline ml-1" />
              </button>
            </div>

            {[
              { label: "Facts", color: "text-gold", border: "border-gold" },
              { label: "Arguments", color: "text-[#60A5FA]", border: "border-[#60A5FA]" },
              { label: "Court Reasoning", color: "text-[#34D399]", border: "border-[#34D399]" },
              { label: "Conclusion", color: "text-[#F87171]", border: "border-[#F87171]" },
            ].map((s) => (
              <div key={s.label} className="mb-4">
                <h2 className={`text-sm font-semibold ${s.color} mb-2 uppercase tracking-wider font-display-legal border-b ${s.border} pb-1`}>{s.label}</h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{selected.excerpt} This section contains the detailed {s.label.toLowerCase()} as extracted from the original judgment document by our AI analysis pipeline.</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#090D16] flex items-center justify-center"><div className="text-[#94A3B8]">Loading...</div></div>}>
      <SearchWorkspace />
    </Suspense>
  );
}
