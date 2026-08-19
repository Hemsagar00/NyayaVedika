import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    checks: {
      supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      nvidia: Boolean(process.env.NVIDIA_API_KEY),
      deepseek: Boolean(process.env.DEEPSEEK_API_KEY),
      kanoon: Boolean(process.env.INDIANKANOON_API_KEY),
      desk: true,
    },
    timestamp: new Date().toISOString(),
  });
}
