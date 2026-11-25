import { NextResponse } from "next/server";
import { ACTIVITY_CATEGORY_KEYS } from "@/lib/activity";
import { AGENT_KEYS } from "@/lib/constants";
import { AuthError, requireApiAuth } from "@/server/auth";
import { getActivity } from "@/server/queries/metrics";

export const dynamic = "force-dynamic";

/**
 * Live Operations feed. ?after=<id> returns only newer events (live updates, and catching
 * up after a dropped connection); ?before=<id> pages back through history. Filters:
 * ?category=, ?agent=, ?level=warn|error, ?q= (search in message, business name and URL).
 */
export async function GET(req: Request) {
  try {
    const auth = await requireApiAuth();
    const sp = new URL(req.url).searchParams;
    const after = Number(sp.get("after") ?? 0) || undefined;
    const beforeId = Number(sp.get("before") ?? 0) || undefined;
    const limit = Math.max(1, Math.min(100, Number(sp.get("limit") ?? 40) || 40));
    const agentParam = sp.get("agent") ?? "";
    const agent = agentParam === "orchestrator" || (AGENT_KEYS as readonly string[]).includes(agentParam) ? agentParam : undefined;
    const levelParam = sp.get("level") ?? "";
    const level = ["warn", "error"].includes(levelParam) ? levelParam : undefined;
    const categoryParam = sp.get("category") ?? "";
    const category = (ACTIVITY_CATEGORY_KEYS as string[]).includes(categoryParam) ? categoryParam : undefined;
    const q = sp.get("q")?.trim().slice(0, 80) || undefined;
    const items = await getActivity(auth.org.id, limit, after, { agent, level, category, q, beforeId });
    return NextResponse.json({ items, serverTime: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/activity]", err);
    return NextResponse.json({ error: "Failed to load activity" }, { status: 500 });
  }
}
