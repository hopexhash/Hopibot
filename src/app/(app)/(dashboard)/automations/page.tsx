import { desc, eq, inArray } from "drizzle-orm";
import { ArrowRight, CalendarClock, Hand, Workflow, Zap } from "lucide-react";
import Link from "next/link";
import { PageHeader, Section } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Badge, Card, EmptyState, MockBadge } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { WORKFLOW_ACTIONS } from "@/lib/constants";
import { formatDateTime, formatUsd, timeAgo } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { WorkflowEditor, WorkflowRowActions, type WorkflowDraft } from "./workflow-editor";

export const metadata = { title: "Automations" };

const TRIGGER = {
  new_qualified_lead: { label: "New qualified lead", icon: Zap },
  schedule: { label: "Scheduled campaign", icon: CalendarClock },
  manual: { label: "Manual", icon: Hand },
} as const;

export default async function AutomationsPage() {
  const auth = await requireAuth();
  const workflows = await db().select().from(schema.workflows).where(eq(schema.workflows.organizationId, auth.org.id)).orderBy(desc(schema.workflows.createdAt));
  const steps = workflows.length ? await db().select().from(schema.workflowSteps).where(inArray(schema.workflowSteps.workflowId, workflows.map((w) => w.id))).orderBy(schema.workflowSteps.position) : [];
  const runs = await db().select().from(schema.workflowRuns).where(eq(schema.workflowRuns.organizationId, auth.org.id)).orderBy(desc(schema.workflowRuns.createdAt)).limit(50);
  const canAdmin = hasRole(auth.role, "admin");

  return (
    <>
      <PageHeader title="Automations" description="Define what the agents do automatically. Every run is tracked, resumable, capped per day and stopped by spending limits." actions={canAdmin && <WorkflowEditor trigger="new" />} />
      <Section title="Workflows">
        {workflows.length === 0 ? (
          <Card>
            <EmptyState icon={<Workflow />} title="No automations yet" description="Create one to run discovery campaigns on a schedule or process every new qualified lead." />
          </Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {workflows.map((w) => {
              const t = TRIGGER[w.triggerType as keyof typeof TRIGGER] ?? TRIGGER.manual;
              const ws = steps.filter((s) => s.workflowId === w.id);
              const cfg = w.triggerConfig as { cron?: string; discovery?: WorkflowDraft["discovery"]; topN?: number };
              const draft: WorkflowDraft = {
                id: w.id,
                name: w.name,
                description: w.description ?? "",
                triggerType: w.triggerType as WorkflowDraft["triggerType"],
                cron: cfg.cron ?? "0 8 * * 1",
                discovery: cfg.discovery ?? { country: "Netherlands", city: "Rotterdam", category: "restaurant", radiusKm: 10, limit: 25, minScore: 60, keywords: "", businessName: "", websiteStatus: "any" },
                topN: cfg.topN ?? 10,
                maxRunsPerDay: w.maxRunsPerDay,
                enabled: w.enabled,
                steps: ws.map((s) => ({ action: s.action, enabled: s.enabled })),
              };
              return (
                <Card key={w.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold tracking-tight">{w.name}</p>
                      {w.description && <p className="mt-0.5 line-clamp-2 text-xs text-muted">{w.description}</p>}
                    </div>
                    {canAdmin && <WorkflowRowActions id={w.id} enabled={w.enabled} canRun={w.triggerType !== "new_qualified_lead"} />}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
                    <Badge tone="accent">
                      <t.icon /> {t.label}
                    </Badge>
                    {ws.map((s) => (
                      <span key={s.id} className="inline-flex items-center gap-1.5">
                        <ArrowRight className="h-3 w-3 text-subtle" />
                        <Badge tone={s.enabled ? "neutral" : "outline"} className={s.enabled ? "" : "line-through"}>
                          {WORKFLOW_ACTIONS.find((a) => a.key === s.action)?.label ?? s.action}
                        </Badge>
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-[12px] text-muted">
                    <span>
                      {w.enabled ? "Active" : "Paused"} · max {w.maxRunsPerDay} runs/day
                      {w.triggerType === "schedule" && w.nextRunAt ? ` · next ${formatDateTime(w.nextRunAt)}` : ""}
                      {w.lastRunAt ? ` · last ${timeAgo(w.lastRunAt)}` : ""}
                    </span>
                    {canAdmin && <WorkflowEditor trigger="edit" initial={draft} />}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Section>
      <Section title="Runs" description="Objectives, discovery campaigns and automation executions.">
        {runs.length === 0 ? (
          <Card>
            <EmptyState icon={<Workflow />} title="No runs yet" />
          </Card>
        ) : (
          <Table>
            <THead>
              <tr>
                <TH>Objective</TH>
                <TH>Status</TH>
                <TH className="text-right">Tasks</TH>
                <TH className="text-right">Cost</TH>
                <TH>Started</TH>
              </tr>
            </THead>
            <tbody>
              {runs.map((r) => {
                const rep = r.report as { tasks?: { completed: number; failed: number }; totalCostUsd?: number } | null;
                return (
                  <TR key={r.id}>
                    <TD className="max-w-[420px]">
                      <Link href={`/automations/runs/${r.id}`} className="flex items-center gap-2 font-medium hover:text-accent">
                        <span className="truncate">{r.objective ?? (r.plan as { summary?: string }).summary}</span> {r.isMock && <MockBadge />}
                      </Link>
                    </TD>
                    <TD>
                      <StatusBadge status={r.status} />
                    </TD>
                    <TD className="tabular text-right text-muted">{rep?.tasks ? `${rep.tasks.completed} ✓ / ${rep.tasks.failed} ✕` : "—"}</TD>
                    <TD className="tabular text-right text-muted">{rep?.totalCostUsd != null ? formatUsd(rep.totalCostUsd) : "—"}</TD>
                    <TD className="text-muted">{timeAgo(r.createdAt)}</TD>
                  </TR>
                );
              })}
            </tbody>
          </Table>
        )}
      </Section>
    </>
  );
}
