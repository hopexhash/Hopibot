import { NextResponse } from "next/server";
import { AuthError, requireApiAuth } from "@/server/auth";
import { systemHealth } from "@/server/health";

export const dynamic = "force-dynamic";

/** Per-organisation system health for the dashboard (infrastructure pinged live). */
export async function GET() {
  try {
    const auth = await requireApiAuth();
    const h = await systemHealth(auth.org.id);
    return NextResponse.json({ checks: h.checks, checkedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/health/system]", err);
    return NextResponse.json({ error: "Health check failed" }, { status: 500 });
  }
}
