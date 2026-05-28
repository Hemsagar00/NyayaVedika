export const dynamic = "force-static";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const env = {
    supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    nvidia: !!process.env.NVIDIA_API_KEY,
    deepseek: !!process.env.DEEPSEEK_API_KEY,
    kanoon: !!process.env.INDIANKANOON_API_KEY,
  };
  return NextResponse.json(
    { status: "ok", checks: env, timestamp: new Date().toISOString() },
    { headers: {
      "X-Content-Type-Options": "nosniff", "Cache-Control": "no-store",
      "X-Request-Served-By": "NyayaVedika-Health-Check",
    }}
  );
}
