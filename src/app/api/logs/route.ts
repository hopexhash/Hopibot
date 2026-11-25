import { NextResponse } from "next/server";
import { AGENT_KEYS } from "@/lib/constants";
import { AuthError, requireApiAuth } from "@/server/auth";
import { getLogs } from "@/server/queries/command-center";

export const dynamic = "force-dynamic";

/** Real agent logs. ?after=<id> for streaming, ?agent=, ?q=, ?format=text for download. */
export async function GET(req: Request) {
  try {
    const auth = await requireApiAuth();
    const sp = new URL(req.url).searchParams;
    const agentParam = sp.get("agent") ?? "";
    const agent = agentParam === "orchestrator" || (AGENT_KEYS as readonly string[]).includes(agentParam) ? agentParam : undefined;
    const q = sp.get("q")?.slice(0, 100) || undefined;
    const after = Number(sp.get("after")) || undefined;
    const before = Number(sp.get("before")) || undefined;
    if (sp.get("format") === "text") {
      const rows = await getLogs(auth.org.id, { agent, q, limit: 5000, levels: ["debug", "info", "warn", "error"] });
      const text = rows
        .reverse()
        .map((r) => `[${r.createdAt}] ${r.level.toUpperCase().padEnd(5)} ${r.agentKey.toUpperCase().padEnd(16)} ${r.message}`)
        .join("\n");
      return new Response(text, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename="hopibot-logs-${new Date().toISOString().slice(0, 19).replace(/:/g, "")}.log"`,
          "Cache-Control": "no-store",
        },
      });
    }
    const items = await getLogs(auth.org.id, { after, before, agent, q, limit: Number(sp.get("limit")) || 120 });
    return NextResponse.json({ items }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/logs]", err);
    return NextResponse.json({ error: "Failed to load logs" }, { status: 500 });
  }
}
