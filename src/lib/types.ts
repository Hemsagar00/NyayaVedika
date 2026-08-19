export type PracticeArea =
  | "bail"
  | "revenue"
  | "family"
  | "civil"
  | "consumer"
  | "service";

export type AuthorityKind = "case" | "statute";

export type Authority = {
  id: string;
  kind: AuthorityKind;
  parties: string;
  court: string;
  citation: string;
  year: string;
  bench?: string;
  area: PracticeArea;
  keywords: string[];
  ratio: string;
  note: string;
  kanoonQuery: string;
};

export type SearchHit = {
  id: string;
  kind: AuthorityKind;
  parties: string;
  court: string;
  citation: string;
  year: string;
  bench?: string;
  area: PracticeArea | "general";
  ratio: string;
  note?: string;
  source: "chamber-desk" | "indian-kanoon";
  url: string;
  score: number;
};

export type ResearchAnswer = {
  query: string;
  summary: string;
  hits: SearchHit[];
  source: "chamber-desk" | "mixed";
};

export type DraftInput = {
  docType: string;
  court: string;
  petitioner: string;
  respondent: string;
  facts: string;
  grounds?: string;
  reliefs?: string;
};

export type DraftResult = {
  title: string;
  court: string;
  body: string;
  source: "chamber-desk" | "model";
};
