import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function createStub() {
  const NOT_CONFIGURED = new Error("Supabase not configured");
  const emptyResp = { data: [], error: null };
  const chain = {
    select: () => chain, insert: () => chain, upsert: () => chain,
    delete: () => chain, update: () => chain, eq: () => chain,
    in: () => chain, or: () => chain, not: () => chain,
    is: () => chain, match: () => chain, filter: () => chain,
    contains: () => chain, containedBy: () => chain, range: () => chain,
    textSearch: () => chain, order: () => chain,
    limit: () => Promise.resolve(emptyResp),
    single: () => Promise.resolve({ data: null, error: NOT_CONFIGURED }),
  };
  return {
    from: () => chain,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: NOT_CONFIGURED }),
      signUp: () => Promise.resolve({ data: null, error: NOT_CONFIGURED }),
      signOut: () => Promise.resolve({ error: null }),
    },
    channel: () => ({ subscribe: () => ({}) }),
  };
}

type SupabaseClient = ReturnType<typeof createClient>;
type StubClient = ReturnType<typeof createStub>;

export const supabase: SupabaseClient | StubClient =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : createStub();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = () => (supabase as any).from.bind(supabase);

export async function searchJudgments(query: string, _court: string) {
  void _court;
  try {
    const { data, error } = await db()("judgments").select("*").textSearch("content", query);
    return { data: data || [], error };
  } catch {
    return { data: [], error: null };
  }
}

export async function getProfile(userId: string) {
  try {
    const { data, error } = await db()("profiles").select("*").eq("id", userId).single();
    return { data, error };
  } catch {
    return { data: null, error: null };
  }
}

export async function saveDraft(draft: Record<string, unknown>) {
  try {
    const { data, error } = await db()("drafts").insert([draft]).select();
    return { data, error };
  } catch {
    return { data: null, error: null };
  }
}

export async function getDrafts(userId: string) {
  try {
    const { data, error } = await db()("drafts").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    return { data: data || [], error };
  } catch {
    return { data: [], error: null };
  }
}

export async function deleteDraft(id: string) {
  try {
    const { error } = await db()("drafts").delete().eq("id", id);
    return { error };
  } catch {
    return { error: null };
  }
}
