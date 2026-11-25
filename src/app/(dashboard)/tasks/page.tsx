import { and, count, desc, eq, type SQL } from "drizzle-orm";
import Link from "next/link";
import { SubNav } from "@/components/app/sidebar";
import { PageHeader } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { AGENT_META, type AgentKey } from "@/lib/constants";
import { cn, formatUsd, timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { TaskActions } from "../agents/[key]/agent-controls";

export const metadata = { title: "Task Queue" };

const STATUSES = ["PENDING", "RUNNING", "WAITING_FOR_APPROVAL", "FAILED", "COMPLETED", "CANCELLED"] as const;
const LABEL: Record<string, string> = { PENDING: "Queued", RUNNING: "Running", WAITING_FOR_APPROVAL: "Waiting", FAILED: "Failed", COMPLETED: "Completed", CANCELLED: "Cancelled" };

export default async function TaskQueuePage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const auth = await requireAuth();
  const { status } = await searchParams;
  const filter = STATUSES.includes(status as (typeof STATUSES)[number]) ? status : undefined;
  const t = schema.agentTasks;
  const where: SQL[] = [eq(t.organizationId, auth.org.id)];
  if (filter) where.push(eq(t.status, filter));
  const [rows, counts] = await Promise.all([
    db().select().from(t).where(and(...where)).orderBy(desc(t.createdAt)).limit(150),
    db().select({ status: t.status, n: count() }).from(t).where(eq(t.organizationId, auth.org.id)).groupBy(t.status),
  ]);
  const byStatus = Object.fromEntries(counts.map((c) => [c.status, c.n]));
  const total = counts.reduce((a, c) => a + c.n, 0);

  return (
    <>
      <SubNav section="/agents" />
      <PageHeader eyebrow="AI OPERATIONS // TASK QUEUE" title="Task Queue" description="Every task the orchestrator has scheduled. Retry failed work or cancel what has not started." />
      <div className="-mx-3.5 mb-4 flex gap-1.5 overflow-x-auto px-3.5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {[undefined, ...STATUSES].map((s) => (
          <Link
            key={s ?? "all"}
            href={s ? `/tasks?status=${s}` : "/tasks"}
            className={cn(
              "mono flex h-9 shrink-0 items-center gap-2 rounded-lg border px-3 text-[11.5px] font-semibold uppercase tracking-[0.1em]",
              filter === s ? "border-[rgba(0,255,120,0.45)] bg-accent-soft text-accent" : "border-border text-muted hover:text-foreground",
            )}
          >
            {s ? LABEL[s] : "All"}
            <span className={cn("tabular", s === "FAILED" && byStatus.FAILED ? "text-danger" : "text-subtle")}>{s ? (byStatus[s] ?? 0) : total}</span>
          </Link>
        ))}
      </div>
      <Table>
        <THead>
          <tr>
            <TH>Agent</TH>
            <TH>Task</TH>
            <TH>Status</TH>
            <TH className="text-right">Attempts</TH>
            <TH className="text-right">Cost</TH>
            <TH>Created</TH>
            <TH />
          </tr>
        </THead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} className="mono px-4 py-10 text-center text-[11px] text-subtle">
                Queue empty{filter ? ` for ${LABEL[filter].toLowerCase()}` : ""}.
              </td>
            </tr>
          )}
          {rows.map((r) => {
            const meta = AGENT_META[r.agentKey as AgentKey];
            return (
              <TR key={r.id}>
                <TD className="mono whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.1em]">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: meta?.color ?? "#00ff78" }} />
                  {meta?.name ?? r.agentKey}
                </TD>
                <TD className="max-w-[320px]">
                  <div className="mono truncate text-[12px]">{r.type}</div>
                  {(r.error?.message || r.waitingReason) && <div className={cn("mono truncate text-[11.5px]", r.error ? "text-danger" : "text-warning")}>{r.error?.message ?? r.waitingReason}</div>}
                  {r.runId && (
                    <Link href={`/automations/runs/${r.runId}`} className="mono text-[11px] text-subtle hover:text-accent">
                      run {r.runId.slice(0, 8)}
                    </Link>
                  )}
                </TD>
                <TD>
                  <StatusBadge status={r.status} />
                </TD>
                <TD className="mono tabular text-right text-[12px]">
                  {r.attempts}/{r.maxAttempts}
                </TD>
                <TD className="mono tabular text-right text-[12px]">{r.costUsd ? formatUsd(r.costUsd) : "—"}</TD>
                <TD className="mono whitespace-nowrap text-[11px] text-subtle">{timeAgo(r.createdAt)}</TD>
                <TD>
                  <TaskActions taskId={r.id} status={r.status} />
                </TD>
              </TR>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
