import type { DraftInput, DraftResult } from "./types";

export const DOC_TYPES = [
  {
    id: "bail",
    label: "Anticipatory bail",
    court: "Court of Session",
    statute: "s. 482 BNSS / s. 438 CrPC",
  },
  {
    id: "partition",
    label: "Partition suit",
    court: "Principal District Judge",
    statute: "Hindu Succession Act, 1956",
  },
  {
    id: "consumer",
    label: "Consumer complaint",
    court: "District Consumer Disputes Redressal Commission",
    statute: "s. 35 CPA 2019",
  },
  {
    id: "mutation",
    label: "Revenue mutation",
    court: "Tahsildar",
    statute: "AP PPB Act, 1971",
  },
  {
    id: "notice",
    label: "Notice under Section 80 CPC",
    court: "Pre-suit",
    statute: "s. 80 CPC",
  },
  {
    id: "ws",
    label: "Written statement",
    court: "District Court",
    statute: "Order VIII CPC",
  },
] as const;

function today(): string {
  return new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function n(v: string, fallback: string) {
  const t = v.trim();
  return t || fallback;
}

function factsPara(facts: string) {
  return n(
    facts,
    "[State the facts in the order they happened. Dates, survey numbers, FIR numbers, and what the other side did.]"
  );
}

function buildBail(input: DraftInput): string {
  const p = n(input.petitioner, "[Applicant name, S/o / D/o, age, address]");
  const r = n(input.respondent, "The State of Andhra Pradesh, represented by the Public Prosecutor");
  return `IN THE COURT OF THE ${input.court.toUpperCase()} AT ANANTAPUR

Crl.M.P. No. __________ of ${new Date().getFullYear()}

In the matter of Section 482 of the Bharatiya Nagarik Suraksha Sanhita, 2023
(corresponding to Section 438 of the Code of Criminal Procedure, 1973)

Between

${p}
… Applicant

And

${r}
… Respondent

PETITION FOR ANTICIPATORY BAIL

The Applicant most respectfully submits as follows:

1. The Applicant is a resident of the address given above and is apprehending arrest in connection with the matter set out below.

2. Facts. ${factsPara(input.facts)}

3. The alleged offence, even if taken at its highest, is not one that requires custodial interrogation as a matter of course. In Arnesh Kumar v. State of Bihar (2014) 8 SCC 273 the Supreme Court held that arrest is not automatic for offences punishable up to seven years, and that the officer must record why arrest is necessary.

4. The governing discretion is in Gurbaksh Singh Sibbia v. State of Punjab (1980) 2 SCC 565. Duration, if granted, is governed by Sushila Aggarwal v. State (NCT of Delhi) (2020) 5 SCC 1.

5. The Applicant undertakes to cooperate with the investigation, not to tamper with evidence or witnesses, and to appear as and when directed.

6. ${n(input.grounds, "The Applicant has no criminal antecedents that the Applicant is aware of, and has roots in the district.")}

PRAYER

It is therefore most respectfully prayed that this Hon'ble Court may be pleased to:

(a) direct that in the event of arrest of the Applicant in connection with the above matter, the Applicant be released on bail on such terms as this Hon'ble Court deems fit;

(b) restrain mechanical arrest pending the hearing of this petition; and

(c) pass such other orders as are necessary in the interests of justice.

Place: Anantapur
Date: ${today()}

Counsel for the Applicant

[DRAFT FOR COUNSEL. Verify every citation and fact before filing.]
`;
}

function buildPartition(input: DraftInput): string {
  const p = n(input.petitioner, "[Plaintiff name, age, address]");
  const r = n(input.respondent, "[Defendants: names of other sharers]");
  return `IN THE COURT OF THE ${input.court.toUpperCase()} AT ANANTAPUR

O.S. No. __________ of ${new Date().getFullYear()}

${p}
… Plaintiff

Versus

${r}
… Defendants

SUIT FOR PARTITION AND SEPARATE POSSESSION

The Plaintiff most respectfully submits as follows:

1. The Plaintiff is a member of the family described below and is entitled to a share in the schedule properties.

2. Facts. ${factsPara(input.facts)}

3. Under Section 6 of the Hindu Succession Act, 1956, as amended in 2005, a daughter is a coparcener by birth. In Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1 the Supreme Court held that this right does not depend on the father being alive on 9 September 2005.

4. The Plaintiff has not been given a separate share. One or more of the Defendants refuse to partition by metes and bounds.

5. Cause of action arose within the jurisdiction of this Hon'ble Court, where the properties are situate.

6. Court fee is paid on the share claimed.

SCHEDULE A
[Survey number, village, extent, boundaries. To be filled by counsel.]

SCHEDULE B
[Movables / deposits, if any.]

PRAYER

The Plaintiff therefore prays that this Hon'ble Court may be pleased to:

(a) pass a preliminary decree declaring the Plaintiff's share;

(b) pass a final decree for partition by metes and bounds and for separate possession;

(c) award mesne profits from the date of suit; and

(d) grant costs and such other relief as is just.

Place: Anantapur
Date: ${today()}

Counsel for the Plaintiff

[DRAFT FOR COUNSEL. Attach a family tree and the adangal / 1-B extracts.]
`;
}

function buildConsumer(input: DraftInput): string {
  const p = n(input.petitioner, "[Complainant name and address]");
  const r = n(input.respondent, "[Opposite party: builder / insurer / dealer]");
  return `BEFORE THE ${input.court.toUpperCase()}
ANANTAPUR

C.C. No. __________ of ${new Date().getFullYear()}

${p}
… Complainant

Versus

${r}
… Opposite Party

COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019

1. The Complainant is a consumer. The Opposite Party agreed to provide the service / goods described below for consideration.

2. Facts. ${factsPara(input.facts)}

3. The above amounts to deficiency in service and/or unfair trade practice. In Lucknow Development Authority v. M.K. Gupta (1994) 1 SCC 243 a statutory housing body was held to provide a 'service'. In Pioneer Urban Land v. Govindan Raghavan (2019) 5 SCC 725 a one-sided builder agreement was held unfair.

4. The cause of action is continuing. This Commission has pecuniary and territorial jurisdiction.

5. The Complainant has not filed any other complaint on the same cause.

PRAYER

The Complainant prays for:

(a) refund / compensation of Rs. __________ with interest;

(b) compensation for harassment and litigation cost; and

(c) any other relief that this Commission finds just.

Place: Anantapur
Date: ${today()}

Complainant
Through counsel

[DRAFT FOR COUNSEL. Attach the agreement, receipts, and a computation of delay.]
`;
}

function buildMutation(input: DraftInput): string {
  const p = n(input.petitioner, "[Applicant: legal heir name, address]");
  const r = n(input.respondent, "The Tahsildar, [Mandal], Anantapur district");
  return `BEFORE THE ${input.court.toUpperCase()}
[Mandal], District Anantapur

Application for mutation of name in the Record of Rights
A.P. Rights in Land and Pattadar Pass Books Act, 1971

Applicant: ${p}

To
${r}

Sir / Madam,

1. The Applicant is the legal heir / successor of [deceased / transferor], who stood recorded in respect of the land in Survey No. __________ of village __________.

2. Facts. ${factsPara(input.facts)}

3. Mutation is sought so that the adangal / 1-B and the pattadar passbook reflect present enjoyment. Mutation does not by itself confer title. Where the Applicant claims through succession, the death certificate and the family tree are enclosed. Where the claim is through purchase, only a registered deed passes title: Suraj Lamp v. State of Haryana (2012) 1 SCC 656.

4. An encumbrance certificate is enclosed. Any difference between the EC, the 1-B, and this application is explained above.

PRAYER

The Applicant requests that:

(a) the name of the Applicant be mutated in the Record of Rights and the pattadar passbook;

(b) notices be issued to the co-heirs / adjoining owners as required; and

(c) a revised passbook be issued.

Place: __________
Date: ${today()}

Applicant

Enclosures: death certificate / registered deed, family tree, adangal, 1-B, EC, ID.

[DRAFT FOR COUNSEL. Fill survey numbers before it leaves the chamber.]
`;
}

function buildNotice(input: DraftInput): string {
  const p = n(input.petitioner, "[Claimant name and address]");
  const r = n(input.respondent, "[Government / public officer / municipality]");
  return `REGISTERED POST WITH ACKNOWLEDGEMENT DUE

NOTICE UNDER SECTION 80 OF THE CODE OF CIVIL PROCEDURE, 1908

From
${p}

To
${r}

Date: ${today()}

Sir / Madam,

1. This notice is issued under Section 80 of the Code of Civil Procedure, 1908. No suit will be filed until two months from receipt of this notice, unless the claim is settled.

2. Cause of action. ${factsPara(input.facts)}

3. The name, description, and place of residence of the intending plaintiff are as given above.

4. Relief that will be claimed: ${n(
    input.reliefs,
    "payment of the amount due, interest, and costs; and such other relief as the court may grant."
  )}

5. In Ghanshyam Dass v. Dominion of India (1984) 3 SCC 46 the Supreme Court treated substantial compliance with Section 80 as the test. You are requested to apply your mind to the claim and avoid litigation.

6. If the claim is not admitted and paid / resolved within two months of receipt, a suit will be filed, with costs.

Yours faithfully,

${p}
Through counsel
Naga Law Chambers, Anantapur

[DRAFT FOR COUNSEL. Serve by RPAD and keep the postal receipt.]
`;
}

function buildWS(input: DraftInput): string {
  const p = n(input.petitioner, "[Defendant name]");
  const r = n(input.respondent, "[Plaintiff name]");
  return `IN THE COURT OF THE ${input.court.toUpperCase()} AT ANANTAPUR

O.S. No. __________ of ${new Date().getFullYear()}

${r}
… Plaintiff

Versus

${p}
… Defendant

WRITTEN STATEMENT OF THE DEFENDANT

The Defendant most respectfully submits as follows:

PRELIMINARY OBJECTIONS

1. The suit is not maintainable. ${n(input.grounds, "[Limitation / misjoinder / want of notice under Section 80 CPC / undervaluation. Strike out what does not apply.]")}

2. In Salem Advocate Bar Association v. Union of India (2005) 6 SCC 344 the 90-day ordinary period for a written statement was upheld. This statement is filed within time / with an application for condonation.

PARA-WISE REPLY

3. The facts alleged in the plaint are not admitted except those that are specifically admitted below.

4. Facts as known to the Defendant. ${factsPara(input.facts)}

5. The Defendant denies that the Plaintiff is entitled to the reliefs claimed.

PRAYER

The Defendant prays that the suit be dismissed with costs.

Place: Anantapur
Date: ${today()}

Counsel for the Defendant

Verification
I, the Defendant, do hereby verify that the contents of paragraphs 1 to 5 are true to my knowledge and belief.

[DRAFT FOR COUNSEL. Number the para-wise reply to match the plaint.]
`;
}

const BUILDERS: Record<string, (i: DraftInput) => string> = {
  bail: buildBail,
  partition: buildPartition,
  consumer: buildConsumer,
  mutation: buildMutation,
  notice: buildNotice,
  ws: buildWS,
};

export function draftLocal(input: DraftInput): DraftResult {
  const meta = DOC_TYPES.find((d) => d.id === input.docType) ?? DOC_TYPES[0];
  const court = input.court || meta.court;
  const builder = BUILDERS[meta.id] ?? buildBail;
  return {
    title: meta.label,
    court,
    body: builder({ ...input, court }),
    source: "chamber-desk",
  };
}

export function fridayPrompt(input: DraftInput): string {
  const meta = DOC_TYPES.find((d) => d.id === input.docType) ?? DOC_TYPES[0];
  return `You are drafting for an advocate at the Anantapur Bar, Andhra Pradesh. Write a first draft only. Do not invent case citations. If you cite, use only well-known Supreme Court authorities and say so.

Document: ${meta.label}
Forum: ${input.court || meta.court}
Statute frame: ${meta.statute}

Applicant / Plaintiff: ${n(input.petitioner, "[to be filled]")}
Opposite party: ${n(input.respondent, "[to be filled]")}

Facts:
${factsPara(input.facts)}

Additional grounds:
${n(input.grounds || "", "None supplied.")}

Relief:
${n(input.reliefs || "", "Standard relief for this document type.")}

Write the full pleading in formal Indian legal English, with numbered paragraphs and a Prayer. Mark every blank as [ ]. End with a one-line reminder that counsel must verify facts and citations before filing.`;
}
