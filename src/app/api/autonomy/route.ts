import { NextResponse } from "next/server";
import { AuthError, requireApiAuth } from "@/server/auth";
import { getAutonomyStatus } from "@/server/orchestrator/autopilot";

export const dynamic = "force-dynamic";

/** Live operating status (mode, current objective with stage counts, today's numbers) for the wall display. */
export async function GET() {
  try {
    const auth = await requireApiAuth();
    return NextResponse.json(await getAutonomyStatus(auth.org.id, auth.org.settings), { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/autonomy]", err);
    return NextResponse.json({ error: "Failed to load status" }, { status: 500 });
  }
}
