"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, FileText, Users, ScrollText,
  BookOpen, CheckCircle, Gavel, Download, Trash2, RotateCcw
} from "lucide-react";

const docTypes = ["Writ Petition", "PIL", "Civil Suit", "Criminal Complaint", "Legal Notice", "RTI"];
const courts = ["Supreme Court of India", "Delhi High Court", "Bombay High Court", "Calcutta High Court", "Madras High Court", "Allahabad High Court", "Punjab & Haryana High Court", "Karnataka High Court", "Telangana High Court"];

const steps = [
  { num: 1, label: "Document", icon: FileText, desc: "Select type & court" },
  { num: 2, label: "Parties", icon: Users, desc: "Petitioner & Respondent" },
  { num: 3, label: "Facts", icon: BookOpen, desc: "Case facts & grounds" },
  { num: 4, label: "Reliefs", icon: ScrollText, desc: "Prayers & relief" },
  { num: 5, label: "Generate", icon: CheckCircle, desc: "Review & export" },
];

export default function DraftingPage() {
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState("Writ Petition");
  const [court, setCourt] = useState("Supreme Court of India");
  const [petitioner, setPetitioner] = useState({ name: "", age: "", address: "" });
  const [respondent, setRespondent] = useState({ name: "", address: "" });
  const [facts, setFacts] = useState("");
  const [grounds, setGrounds] = useState("");
  const [reliefs, setReliefs] = useState("");
  const [generating, setGenerating] = useState(false);
  const [draft, setDraft] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("nyaya_draft");
    if (saved) {
      try { const d = JSON.parse(saved); setDocType(d.docType);
        setCourt(d.court); setPetitioner(d.petitioner || petitioner);
        setRespondent(d.respondent || respondent); setFacts(d.facts || "");
        setGrounds(d.grounds || ""); setReliefs(d.reliefs || ""); setDraft(d.draft || "");
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nyaya_draft", JSON.stringify({ docType, court, petitioner, respondent, facts, grounds, reliefs, draft }));
  }, [docType, court, petitioner, respondent, facts, grounds, reliefs, draft]);

  const nextStep = () => { if (step < 5) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  const generateDraft = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/friday/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docType, court, petitioner, respondent, facts, grounds, reliefs }),
      });
      const data = await res.json();
      setDraft(data.draft || '');
      setStep(5);
    } catch (e) {
      // fallback demo draft
      setDraft(`IN THE ${court.toUpperCase()}, NEW DELHI

${docType.toUpperCase()}
(Civil Writ Jurisdiction)


PETITIONER:
${petitioner.name} (Age: ${petitioner.age}),
${petitioner.address}

                    ...Petitioner

Versus

RESPONDENT:
${respondent.name},
${respondent.address}

                    ...Respondent


RESPECTFULLY SHOWETH:

1. ${facts || "[Facts to be detailed here]"}

2. ${grounds || "[Grounds to be detailed here]"}

RELIEF SOUGHT:
${reliefs || "[Reliefs to be detailed here]"}

PRAYER:
It is therefore most humbly prayed that this Hon'ble Court may be pleased to grant the reliefs sought hereinabove.

                            COUNSEL FOR PETITIONER`);
    } finally { setGenerating(false); }
  };

  const clearStorage = () => {
    localStorage.removeItem("nyaya_draft");
    setDocType("Writ Petition"); setCourt("Supreme Court of India");
    setPetitioner({ name: "", age: "", address: "" });
    setRespondent({ name: "", address: "" });
    setFacts(""); setGrounds(""); setReliefs(""); setDraft(""); setStep(1);
  };

  const downloadTxt = () => {
    const blob = new Blob([draft], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${docType.replace(/\\s+/g, "_")}_${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#090D16]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 relative">
          {steps.map((s, i) => (
            <div key={s.num} className="flex flex-col items-center z-10">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-all ${
                  step >= s.num ? "bg-[rgba(212,175,55,0.15)] border-[rgba(212,175,55,0.4)] text-gold" : "bg-[#0F172A] border-[rgba(212,175,55,0.1)] text-[#64748B]"
                }`}
                animate={{ scale: step === s.num ? 1.05 : 1 }}
              >
                <s.icon className="w-4 h-4" />
              </motion.div>
              <span className="text-[10px] mt-1.5 text-[#94A3B8] hidden sm:block">{s.label}</span>
            </div>
          ))}
          <div className="absolute top-5 left-0 right-0 h-px bg-[rgba(212,175,55,0.08)] -z-0">
            <div className="h-full bg-[rgba(212,175,55,0.3)] transition-all duration-500" style={{ width: `${((step - 1) / 4) * 100}%` }} />
          </div>
          <button onClick={clearStorage} className="text-[#475569] hover:text-red-400 text-xs flex items-center gap-1 z-10"><Trash2 className="w-3 h-3" />Clear</button>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#F1F5F9] mb-6 font-display-legal">Select Document <span className="text-gold-dim">Type & Court</span></h2>
              <div className="space-y-5">
                <div><label className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-2">Document Type</label>
                  <select required value={docType} onChange={e => setDocType(e.target.value)} className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[rgba(212,175,55,0.35)]">{docTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                <div><label className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-2">Court / Tribunal</label>
                  <select required value={court} onChange={e => setCourt(e.target.value)} className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[rgba(212,175,55,0.35)]">{courts.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#F1F5F9] mb-6 font-display-legal">Party <span className="text-gold-dim">Details</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gold flex items-center gap-1.5"><Gavel className="w-3.5 h-3.5" />Petitioner</h3>
                  <input value={petitioner.name} onChange={e => setPetitioner({ ...petitioner, name: e.target.value })} placeholder="Full Name" className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)]" />
                  <input value={petitioner.age} onChange={e => setPetitioner({ ...petitioner, age: e.target.value })} placeholder="Age" className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)]" />
                  <textarea value={petitioner.address} onChange={e => setPetitioner({ ...petitioner, address: e.target.value })} placeholder="Address" rows={3} className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)] resize-none" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-[#F87171]">Respondent</h3>
                  <input value={respondent.name} onChange={e => setRespondent({ ...respondent, name: e.target.value })} placeholder="Full Name" className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)]" />
                  <textarea value={respondent.address} onChange={e => setRespondent({ ...respondent, address: e.target.value })} placeholder="Address" rows={3} className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)] resize-none" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#F1F5F9] mb-6 font-display-legal">Facts & <span className="text-gold-dim">Grounds</span></h2>
              <div className="space-y-5">
                <div><label className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-2">Facts of the Case</label>
                  <textarea value={facts} onChange={e => setFacts(e.target.value)} placeholder="Describe the facts chronologically..." rows={6} className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)] resize-none leading-relaxed" /></div>
                <div><label className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-2">Legal Grounds</label>
                  <textarea value={grounds} onChange={e => setGrounds(e.target.value)} placeholder="Mention the constitutional/statutory grounds (Article 21, Section 144 CrPC, etc.)..." rows={4} className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)] resize-none leading-relaxed" /></div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#F1F5F9] mb-6 font-display-legal">Reliefs & <span className="text-gold-dim">Prayers</span></h2>
              <textarea value={reliefs} onChange={e => setReliefs(e.target.value)} placeholder="(i) Pass a Writ of Mandamus directing the Respondent...
(ii) Grant compensatory damages of Rs. ...
(iii) Award costs to the Petitioner..." rows={8} className="w-full bg-[#0F172A] border border-[rgba(212,175,55,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[rgba(212,175,55,0.35)] resize-none leading-relaxed" />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#F1F5F9] mb-6 font-display-legal">Review & <span className="text-gold-dim">Generate</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[
                  { label: "Document", value: docType },
                  { label: "Court", value: court },
                  { label: "Petitioner", value: petitioner.name },
                  { label: "Respondent", value: respondent.name },
                ].map((item) => (
                  <div key={item.label} className="bg-[#0F172A] border border-[rgba(212,175,55,0.08)] rounded-lg px-4 py-2.5">
                    <span className="text-[10px] uppercase text-[#64748B]">{item.label}</span>
                    <p className="text-sm text-[#F1F5F9] font-medium">{item.value || "—"}</p>
                  </div>
                ))}
              </div>

              {!draft ? (
                <button onClick={generateDraft} disabled={generating} className="w-full py-3 bg-[#D4AF37] text-[#090D16] font-semibold rounded-lg hover:bg-[#E8C84A] transition-colors disabled:opacity-50">
                  {generating ? "Generating with AI..." : (<><Gavel className="w-4 h-4 inline mr-2" />Generate Draft</>)}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-[#0F172A] border border-[rgba(212,175,55,0.08)] rounded-lg p-4 whitespace-pre-wrap text-sm text-[#94A3B8] font-mono leading-relaxed max-h-[400px] overflow-y-auto">{draft}</div>
                  <div className="flex gap-2">
                    <button onClick={downloadTxt} className="flex-1 py-2.5 border border-[rgba(212,175,55,0.25)] text-gold rounded-lg hover:bg-[rgba(212,175,55,0.06)] transition-colors flex items-center justify-center gap-2"><Download className="w-4 h-4" />Download .txt</button>
                    <button onClick={() => { setDraft(""); setStep(1); }} className="flex-1 py-2.5 border border-[rgba(212,175,55,0.25)] text-[#94A3B8] rounded-lg hover:bg-[rgba(212,175,55,0.06)] transition-colors flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" />New Draft</button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button onClick={prevStep} disabled={step === 1} className="px-5 py-2.5 border border-[rgba(212,175,55,0.2)] text-[#94A3B8] rounded-lg hover:text-[#F1F5F9] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm">
            <ChevronLeft className="w-4 h-4 inline mr-1" />Back
          </button>
          {step < 5 ? (
            <button onClick={nextStep} className="px-5 py-2.5 bg-[rgba(212,175,55,0.15)] text-gold rounded-lg hover:bg-[rgba(212,175,55,0.25)] transition-all text-sm font-medium">
              Next<ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          ) : (
            draft && <button onClick={clearStorage} className="px-5 py-2.5 text-red-400 text-sm"><Trash2 className="w-3.5 h-3.5 inline mr-1" />Clear</button>
          )}
        </div>
      </div>
    </div>
  );
}
