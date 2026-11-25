import { NextResponse } from "next/server";
import { AGENT_KEYS } from "@/lib/constants";
import { AuthError, requireApiAuth } from "@/server/auth";
import { getActivity } from "@/server/queries/metrics";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const auth = await requireApiAuth();
    const url = new URL(req.url);
    const after = Number(url.searchParams.get("after") ?? 0) || undefined;
    const limit = Math.min(100, Number(url.searchParams.get("limit") ?? 40) || 40);
    const agentParam = url.searchParams.get("agent") ?? "";
    const agent = agentParam === "orchestrator" || (AGENT_KEYS as readonly string[]).includes(agentParam) ? agentParam : undefined;
    const levelParam = url.searchParams.get("level") ?? "";
    const level = ["warn", "error"].includes(levelParam) ? levelParam : undefined;
    return NextResponse.json({ items: await getActivity(auth.org.id, limit, after, { agent, level }) }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/activity]", err);
    return NextResponse.json({ error: "Failed to load activity" }, { status: 500 });
  }
}
