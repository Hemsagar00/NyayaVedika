"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SAMPLES = [
  "Anticipatory bail in a 498A FIR. How recent must the complaint be?",
  "Adangal shows my father as owner. Can I mutate without a registered will?",
  "EC is clean but the bank says there is a loan on the plot.",
  "Is a Section 80 CPC notice required before suing on a promissory note?",
  "Partition among brothers. One refuses to sign. Can I file alone?",
];

export function QueryBox({
  initial = "",
  size = "hero",
}: {
  initial?: string;
  size?: "hero" | "page";
}) {
  const router = useRouter();
  const [q, setQ] = useState(initial);

  function go(next = q) {
    const value = next.trim();
    if (!value) return;
    router.push(`/search/?q=${encodeURIComponent(value)}`);
  }

  const hero = size === "hero";

  return (
    <div>
      <label htmlFor="matter" className={hero ? "sr-only" : "label"}>
        State the matter
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          id="matter"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") go();
          }}
          placeholder="498A, mutation, Section 80"
          className="field min-w-0 flex-1"
          style={
            hero
              ? {
                  background: "rgb(255 255 255 / 0.1)",
                  borderColor: "rgb(255 255 255 / 0.28)",
                  color: "#fff",
                }
              : undefined
          }
        />
        <button type="button" className={`btn btn-primary group ${hero ? "self-start" : ""}`} onClick={() => go()}>
          Search case law
          <span className="btn-icon">↗</span>
        </button>
      </div>
      {!hero ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {SAMPLES.slice(0, 3).map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => {
                  setQ(s);
                  go(s);
                }}
                className="border border-[var(--hair)] px-3 py-1.5 text-left text-[0.8rem] text-[var(--fg-muted)] hover:border-[var(--fg)]"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
