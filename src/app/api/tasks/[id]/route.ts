import { and, asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { AuthError, requireApiAuth } from "@/server/auth";
import { db, schema } from "@/server/db";

export const dynamic = "force-dynamic";

/** Live status of one task (used to follow test runs): status, result, cost and its log lines. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireApiAuth();
    const id = z.string().uuid().safeParse((await params).id);
    if (!id.success) return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
    const [task] = await db().select().from(schema.agentTasks).where(and(eq(schema.agentTasks.id, id.data), eq(schema.agentTasks.organizationId, auth.org.id)));
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
    const logs = await db()
      .select({ id: schema.agentLogs.id, level: schema.agentLogs.level, message: schema.agentLogs.message, createdAt: schema.agentLogs.createdAt })
      .from(schema.agentLogs)
      .where(and(eq(schema.agentLogs.taskId, task.id), eq(schema.agentLogs.organizationId, auth.org.id)))
      .orderBy(asc(schema.agentLogs.id))
      .limit(200);
    return NextResponse.json(
      { id: task.id, status: task.status, output: task.output, error: task.error?.message ?? null, costUsd: task.costUsd, startedAt: task.startedAt, completedAt: task.completedAt, logs: logs.filter((l) => l.level !== "debug") },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/tasks]", (err as Error).message);
    return NextResponse.json({ error: "Failed to load task" }, { status: 500 });
  }
}
