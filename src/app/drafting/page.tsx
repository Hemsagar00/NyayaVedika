"use client";

import { useState } from "react";
import { FileText, Loader2, Copy, Check } from "lucide-react";

const DOC_TYPES = [
  { value: "anticipatory-bail", label: "Anticipatory Bail (§438 CrPC)", court: "Sessions Court" },
  { value: "partition-suit", label: "Partition Suit (Hindu Succession)", court: "District Court" },
  { value: "consumer-complaint", label: "Consumer Complaint", court: "District Consumer Forum" },
  { value: "mutation", label: "Revenue Mutation / Legal Heir", court: "Tahsildar" },
  { value: "notice-80-cpc", label: "Notice u/s 80 CPC", court: "Pre-suit" },
  { value: "written-statement", label: "Written Statement", court: "District Court" },
];

const SAMPLE_DRAFT = `IN THE COURT OF THE SESSIONS JUDGE AT ANANTAPUR

Criminal Miscellaneous Petition No. ______ of 2026

Between:

[Petitioner Name]
S/o / D/o [Father's Name],
Aged about __ years,
R/o [Full Address]
… Petitioner

And

The State of Andhra Pradesh
Rep. by the Station House Officer,
[Police Station], Anantapur District
… Respondent

PETITION UNDER SECTION 438 OF THE CODE OF CRIMINAL PROCEDURE, 1973
FOR GRANT OF ANTICIPATORY BAIL

The Petitioner above named most respectfully submits as under:

1. That the Petitioner is a law-abiding citizen and has deep roots in society.
2. That the Petitioner apprehends arrest in Crime No. ______ of ______ registered at [Police Station] for alleged offences under Sections ______ IPC / relevant Act.
3. That the allegations in the FIR are omnibus and mechanical in nature. No specific overt act is attributed to the Petitioner.
4. That in light of the principles laid down in Arnesh Kumar v. State of Bihar, (2014) 8 SCC 273, the Investigating Officer is bound to record reasons before effecting arrest.
5. That the Petitioner undertakes to abide by all conditions that this Hon'ble Court may impose and shall cooperate with the investigation.
6. That the Petitioner has no criminal antecedents (or state any).

PRAYER

It is therefore most respectfully prayed that this Hon'ble Court may be pleased to:

(a) Grant anticipatory bail to the Petitioner in the event of arrest in the aforesaid crime;
(b) Direct the Investigating Officer to release the Petitioner on bail in the event of arrest on such terms and conditions as this Hon'ble Court deems fit;
(c) Pass any other order as this Hon'ble Court may deem fit and proper in the facts and circumstances of the case.

Place: Anantapur
Date: ______

                                                    … Petitioner
                                                    Through Counsel

[Advocate Name]
Advocate, Anantapur Bar
`;

export default function DraftingPage() {
  const [docType, setDocType] = useState(DOC_TYPES[0].value);
  const [petitioner, setPetitioner] = useState("");
  const [facts, setFacts] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    setLoading(true);
    setDraft("");
    await new Promise((r) => setTimeout(r, 900));
    let text = SAMPLE_DRAFT;
    if (petitioner.trim()) {
      text = text.replace("[Petitioner Name]", petitioner.trim());
    }
    if (facts.trim()) {
      text = text.replace(
        "That the allegations in the FIR are omnibus and mechanical in nature. No specific overt act is attributed to the Petitioner.",
        facts.trim()
      );
    }
    setDraft(text);
    setLoading(false);
  }

  async function copyDraft() {
    if (!draft) return;
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const selected = DOC_TYPES.find((d) => d.value === docType);

  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="section-label mb-2">Document drafting</p>
          <h1 className="font-display text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
            First draft, registry-ready.
          </h1>
          <p className="mt-2 max-w-xl font-serif text-[var(--color-text-muted)]">
            Select the pleading type, fill the essentials, and receive a
            structured draft in the format used by local courts.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          <div className="space-y-5">
            <div className="hud-panel p-5">
              <label className="mb-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-faint)]">
                Document type
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="input-kiwi appearance-none"
              >
                {DOC_TYPES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              {selected && (
                <p className="mt-2 font-mono text-[0.65rem] text-[var(--color-cyan)]">
                  Court: {selected.court}
                </p>
              )}
            </div>

            <div className="hud-panel p-5 space-y-4">
              <div>
                <label className="mb-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-faint)]">
                  Petitioner / Applicant
                </label>
                <input
                  value={petitioner}
                  onChange={(e) => setPetitioner(e.target.value)}
                  placeholder="Full name"
                  className="input-kiwi"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-faint)]">
                  Key facts / grounds
                </label>
                <textarea
                  value={facts}
                  onChange={(e) => setFacts(e.target.value)}
                  placeholder="Brief facts supporting the application…"
                  className="input-kiwi min-h-[140px]"
                />
              </div>
              <button
                type="button"
                onClick={generate}
                disabled={loading}
                className="btn-cyan w-full justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Drafting…
                  </>
                ) : (
                  <>
                    <FileText size={15} />
                    Generate draft
                  </>
                )}
              </button>
              <p className="text-center font-mono text-[0.6rem] text-[var(--color-text-faint)]">
                Demo mode · Always review before filing
              </p>
            </div>
          </div>

          <div className="min-h-[420px]">
            {draft ? (
              <div className="hud-panel flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
                  <span className="section-label">Draft output</span>
                  <button
                    type="button"
                    onClick={copyDraft}
                    className="btn-ghost !py-1.5 !px-3 !text-[0.65rem]"
                  >
                    {copied ? (
                      <>
                        <Check size={13} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="flex-1 overflow-auto whitespace-pre-wrap p-5 font-mono text-[0.8rem] leading-relaxed text-[var(--color-text-muted)]">
                  {draft}
                </pre>
              </div>
            ) : (
              <div className="glass flex h-full min-h-[420px] flex-col items-center justify-center rounded-lg p-8 text-center">
                <FileText
                  size={32}
                  className="mb-4 text-[var(--color-cyan)] opacity-40"
                />
                <p className="font-serif text-[var(--color-text-muted)]">
                  Fill the form and generate a structured first draft.
                </p>
                <p className="mt-2 max-w-xs font-mono text-[0.65rem] text-[var(--color-text-faint)]">
                  Output is a working template. Insert cause title, dates, and
                  verify every citation before presentation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
