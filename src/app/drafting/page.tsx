"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { DOC_TYPES } from "@/lib/drafts";

function DraftInner() {
  const params = useSearchParams();
  const startType = params.get("type") || "bail";
  const startFacts = params.get("facts") || "";
  const startCite = params.get("cite") || "";

  const [docId, setDocId] = useState(
    DOC_TYPES.some((d) => d.id === startType) ? startType : "bail"
  );
  const [petitioner, setPetitioner] = useState("");
  const [respondent, setRespondent] = useState("");
  const [facts, setFacts] = useState(
    [startFacts, startCite ? `Authority on the desk: ${startCite}.` : ""].filter(Boolean).join(" ")
  );
  const [grounds, setGrounds] = useState("");
  const [draft, setDraft] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const meta = useMemo(() => DOC_TYPES.find((d) => d.id === docId) ?? DOC_TYPES[0], [docId]);

  async function generate() {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/friday/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          docType: docId,
          court: meta.court,
          petitioner,
          respondent,
          facts,
          grounds,
        }),
      });
      const data = (await res.json()) as { draft?: string; source?: string; error?: string };
      if (!res.ok || !data.draft) throw new Error(data.error || "Draft failed");
      setDraft(data.draft);
      setSource(data.source || "chamber-desk");
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Draft failed");
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  function download() {
    const blob = new Blob([draft], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meta.id}-draft.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main id="main" className="min-h-[100dvh] pt-8 pb-20">
      <div className="wrap">
        <p className="text-[0.8rem] text-[var(--fg-muted)]">Chamber desk</p>
        <h1 className="mt-2 text-[2.3rem] font-semibold tracking-tight md:text-[3rem]">
          File a pleading.
        </h1>
        <p className="mt-3 max-w-[48ch] text-[var(--fg-muted)]">
          Choose the document. Fill parties and facts. The first draft is produced for you to edit.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <form
            className="space-y-6 lg:col-span-5"
            onSubmit={(e) => {
              e.preventDefault();
              generate();
            }}
          >
            <fieldset>
              <legend className="label">Document</legend>
              <div className="grid grid-cols-2 gap-2">
                {DOC_TYPES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDocId(d.id)}
                    className={`border p-3 text-left text-[0.9rem] transition-colors duration-500 ${
                      docId === d.id
                        ? "border-[var(--cta)] bg-[var(--card)]"
                        : "border-[var(--hair)] hover:border-[var(--fg-muted)]"
                    }`}
                  >
                    <span className="block font-semibold">{d.label}</span>
                    <span className="mt-1 block font-mono text-[0.68rem] text-[var(--fg-muted)]">
                      {d.court}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="petitioner" className="label">
                Petitioner / applicant
              </label>
              <input
                id="petitioner"
                value={petitioner}
                onChange={(e) => setPetitioner(e.target.value)}
                className="field"
                placeholder="Name, S/o or D/o, age, address"
              />
            </div>
            <div>
              <label htmlFor="respondent" className="label">
                Respondent / opposite party
              </label>
              <input
                id="respondent"
                value={respondent}
                onChange={(e) => setRespondent(e.target.value)}
                className="field"
                placeholder="Name and address, or the State"
              />
            </div>
            <div>
              <label htmlFor="facts" className="label">
                Brief facts
              </label>
              <textarea
                id="facts"
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                className="field min-h-36"
                placeholder="Dates, FIR or survey numbers, what happened, what you want."
              />
            </div>
            <div>
              <label htmlFor="grounds" className="label">
                Extra grounds (optional)
              </label>
              <textarea
                id="grounds"
                value={grounds}
                onChange={(e) => setGrounds(e.target.value)}
                className="field min-h-24"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
              {status === "loading" ? "Preparing draft" : "Generate first draft"}
            </button>
            {status === "error" ? <p className="text-[0.9rem] text-[var(--cta)]">{error}</p> : null}
          </form>

          <div className="lg:col-span-7">
            {status === "loading" ? (
              <div className="h-[32rem] animate-pulse bg-[var(--hair)]" />
            ) : draft ? (
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[0.8rem] text-[var(--fg-muted)]">
                    {source === "model" ? "Model draft" : "Chamber desk draft"} · {meta.label}
                  </p>
                  <div className="flex gap-2">
                    <button type="button" className="btn btn-ghost" onClick={copy} style={{ padding: "0.5rem 0.85rem" }}>
                      {copied ? "Copied" : "Copy"}
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={download} style={{ padding: "0.5rem 0.85rem" }}>
                      Download
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => window.print()}
                      style={{ padding: "0.5rem 0.85rem" }}
                    >
                      Print
                    </button>
                  </div>
                </div>
                <article className="draft-sheet">{draft}</article>
                <p className="mt-4 text-[0.8rem] text-[var(--fg-muted)]">
                  Draft only. Verify every fact and citation. Do not file this text unchanged.
                </p>
              </div>
            ) : (
              <div className="flex min-h-80 items-center border border-dashed border-[var(--hair)] px-8">
                <p className="max-w-[36ch] text-[var(--fg-muted)]">
                  The draft appears here as a court paper. Fill the form and generate.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DraftingPage() {
  return (
    <Suspense fallback={<main className="wrap py-24">Loading the draft desk.</main>}>
      <DraftInner />
    </Suspense>
  );
}
