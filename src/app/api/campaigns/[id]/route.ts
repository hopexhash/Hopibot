import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { AuthError, requireApiAuth } from "@/server/auth";
import { db, schema } from "@/server/db";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireApiAuth();
    const { id } = await ctx.params;
    if (!/^[0-9a-f-]{36}$/.test(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    const [c] = await db()
      .select()
      .from(schema.discoveryCampaigns)
      .where(and(eq(schema.discoveryCampaigns.id, id), eq(schema.discoveryCampaigns.organizationId, auth.org.id)));
    if (!c) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const logs = c.runId
      ? await db()
          .select({ id: schema.agentLogs.id, level: schema.agentLogs.level, message: schema.agentLogs.message, createdAt: schema.agentLogs.createdAt })
          .from(schema.agentLogs)
          .where(eq(schema.agentLogs.runId, c.runId))
          .orderBy(desc(schema.agentLogs.id))
          .limit(30)
      : [];
    const [task] = c.runId
      ? await db().select({ status: schema.agentTasks.status, error: schema.agentTasks.error }).from(schema.agentTasks).where(eq(schema.agentTasks.runId, c.runId)).limit(1)
      : [];
    return NextResponse.json({ campaign: c, logs, task: task ?? null });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/campaigns]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
