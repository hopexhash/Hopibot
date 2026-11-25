import { NextResponse } from "next/server";
import { RUNTIME_KEYS } from "@/lib/constants";
import { AuthError, hasRole, requireApiAuth } from "@/server/auth";
import { getFeed, TERMINAL_TABS, type TerminalTab } from "@/server/terminal/feed";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const auth = await requireApiAuth();
    const url = new URL(req.url);
    const tab = url.searchParams.get("tab") as TerminalTab;
    if (!TERMINAL_TABS.includes(tab)) return NextResponse.json({ error: "Unknown tab" }, { status: 400 });
    // The audit trail contains IP addresses and sign-in activity: admins only.
    if (tab === "security" && !hasRole(auth.role, "admin")) return NextResponse.json({ error: "The security log is visible to admins and owners only." }, { status: 403 });
    const agentParam = url.searchParams.get("agent") ?? "";
    const agent = (RUNTIME_KEYS as readonly string[]).includes(agentParam) ? agentParam : undefined;
    const lines = await getFeed(auth.org.id, tab, { since: url.searchParams.get("since") ?? undefined, agent, q: url.searchParams.get("q") ?? undefined, limit: Number(url.searchParams.get("limit")) || undefined });
    if (url.searchParams.get("format") === "text") {
      const body = lines.map((l) => `${l.at} ${l.tag.padEnd(18)} ${l.level.toUpperCase().padEnd(5)} ${l.text}`).join("\n");
      return new NextResponse(body + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Disposition": `attachment; filename="hopibot-${tab}-${new Date().toISOString().slice(0, 19).replace(/:/g, "")}.log"`, "Cache-Control": "no-store" } });
    }
    return NextResponse.json({ lines }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/terminal/feed]", (err as Error).message);
    return NextResponse.json({ error: "Failed to load the log" }, { status: 500 });
  }
}
