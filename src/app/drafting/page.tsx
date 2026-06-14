"use client";

import { useState } from "react";

const DOC_TYPES = [
  { id: "bail", label: "Anticipatory Bail (438 CrPC)", court: "Sessions Court" },
  { id: "partition", label: "Partition Suit", court: "District Court" },
  { id: "consumer", label: "Consumer Complaint", court: "District Forum" },
  { id: "mutation", label: "Revenue Mutation", court: "Tahsildar" },
  { id: "notice", label: "Notice u/s 80 CPC", court: "Pre-suit" },
  { id: "ws", label: "Written Statement", court: "District Court" },
];

export default function DraftingPage() {
  const [doc, setDoc] = useState(DOC_TYPES[0]);
  const [petitioner, setPetitioner] = useState("");
  const [respondent, setRespondent] = useState("");
  const [facts, setFacts] = useState("");
  const [generated, setGenerated] = useState(false);

  return (
    <main className="relative min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="section-number">&mdash; Document Drafting &mdash;</p>
          <div className="stamp">In Chamber Use</div>
        </div>

        <h1 className="font-display text-[2.5rem] sm:text-[3rem] font-semibold text-[var(--color-ink)] mb-2 leading-tight">
          <span className="red-underline-sketch">File a pleading.</span>
        </h1>
        <p className="font-serif text-[1.05rem] text-[var(--color-ink-faded)] mb-8 max-w-2xl italic">
          Choose the document. Fill in the parties and the facts. The
          first draft of the pleading is produced, in the format the
          registry accepts.
        </p>

        <hr className="border-t border-[var(--color-ink)] mb-8" />

        {!generated ? (
          <div className="space-y-8">
            <section>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-ink-faded)] mb-3">
                §1. Document type
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DOC_TYPES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDoc(d)}
                    className={`text-left p-4 border ${
                      doc.id === d.id
                        ? "border-[var(--color-chakra-red)] border-2 bg-[var(--color-paper-shade)]"
                        : "border-[var(--color-ink-faded)]"
                    } hover:border-[var(--color-chakra-red)] transition-colors`}
                  >
                    <p className="font-display text-[1.05rem] font-semibold text-[var(--color-ink)] mb-1">
                      {d.label}
                    </p>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[var(--color-pencil)]">
                      For: {d.court}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-ink-faded)] mb-3">
                §2. Parties
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-pencil)] block mb-1">
                    Petitioner / Applicant
                  </label>
                  <input
                    type="text"
                    value={petitioner}
                    onChange={(e) => setPetitioner(e.target.value)}
                    placeholder="Name, age, address"
                    className="typewriter-input"
                  />
                </div>
                <div>
                  <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-pencil)] block mb-1">
                    Respondent / Opposite Party
                  </label>
                  <input
                    type="text"
                    value={respondent}
                    onChange={(e) => setRespondent(e.target.value)}
                    placeholder="Name, address"
                    className="typewriter-input"
                  />
                </div>
              </div>
            </section>

            <section>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-ink-faded)] mb-3">
                §3. Brief facts
              </p>
              <textarea
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                placeholder="State the facts as you would explain them to a senior. Plain English, Telugu, or both."
                rows={8}
                className="typewriter-input"
                style={{ border: "1px solid var(--color-ink)", padding: "0.8rem", minHeight: "180px" }}
              />
            </section>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setGenerated(true)}
                className="btn-ink"
              >
                Generate first draft
              </button>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-pencil)]">
                You will edit the draft. The structure is fixed.
              </p>
            </div>
          </div>
        ) : (
          <article className="border-2 border-[var(--color-ink)] bg-[var(--color-paper-shade)] p-8 sm:p-12 proceeding ruled-paper">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-pencil)] text-center mb-1">
              IN THE COURT OF THE {doc.court.toUpperCase()}
            </p>
            <p className="font-mono text-[0.7rem] text-[var(--color-judge-blue)] text-center mb-6">
              [DRAFT — TO BE TYPED AND FILED]
            </p>

            <div className="parties mb-6 text-center">
              <p>
                {petitioner || "[Petitioner Name]"}
                <br />
                <span className="font-mono not-italic text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-pencil)]">
                  &hellip; Petitioner
                </span>
              </p>
              <p className="vs">— Versus —</p>
              <p>
                {respondent || "[Respondent Name]"}
                <br />
                <span className="font-mono not-italic text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-pencil)]">
                  &hellip; Respondent
                </span>
              </p>
            </div>

            <p className="font-display font-semibold text-center text-[1.15rem] mb-6 underline underline-offset-4">
              {doc.label.toUpperCase()}
            </p>

            <p>
              The Petitioner above-named most respectfully submits as
              under:
            </p>
            <p>
              1. That the Petitioner is a resident of [address], and is
              filing the present {doc.label.toLowerCase()} before this
              Hon&rsquo;ble Court for the reasons set out hereunder.
            </p>
            <p>
              2. That the facts giving rise to the present matter are
              that {facts || "[brief facts to be inserted by counsel]"}.
            </p>
            <p>
              3. That the cause of action arose on [date], and this
              Hon&rsquo;ble Court has the territorial and pecuniary
              jurisdiction to try the present matter.
            </p>
            <p>
              4. That the Petitioner has not filed any other petition
              on the same cause before any other Court, and is not
              guilty of suppression of material facts.
            </p>
            <p>
              It is, therefore, most respectfully prayed that this
              Hon&rsquo;ble Court may be pleased to:
            </p>
            <p className="pl-8">
              (a) Allow the present {doc.label.toLowerCase()};
              <br />
              (b) Grant such other and further reliefs as the nature
              and circumstances of the case may require.
            </p>
            <p className="text-right mt-6 font-display italic">
              &mdash; Petitioner
              <br />
              Through Counsel
            </p>

            <div className="mt-8 text-center">
              <div className="stamp" style={{ display: "inline-block" }}>
                Draft · Not for Filing
              </div>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
