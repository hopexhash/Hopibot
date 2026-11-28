import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { PageHeader, Section } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Badge, Card } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { formatDuration, formatUsd, timeAgo } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { SUPPORTED_MODELS } from "@/server/costs/pricing";
import { db, schema } from "@/server/db";
import { liveWorkers } from "@/server/health";
import { integrationMode } from "@/server/integrations/credentials";
import { AgentForm } from "../agent-form";
import { RunPanel } from "./run-panel";

export const metadata = { title: "Custom agent" };

export default async function CustomAgentPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ prompt?: string }> }) {
  const auth = await requireAuth();
  const id = z.string().uuid().safeParse((await params).id);
  if (!id.success) notFound();
  const { prompt } = await searchParams;
  const [agent] = await db().select().from(schema.customAgents).where(and(eq(schema.customAgents.id, id.data), eq(schema.customAgents.organizationId, auth.org.id), isNull(schema.customAgents.deletedAt)));
  if (!agent) notFound();
  const [claude, workers, runs] = await Promise.all([
    integrationMode(auth.org.id, "anthropic"),
    liveWorkers(),
    db()
      .select()
      .from(schema.agentTasks)
      .where(and(eq(schema.agentTasks.organizationId, auth.org.id), eq(schema.agentTasks.agentKey, "custom"), sql`${schema.agentTasks.input}->>'customAgentId' = ${agent.id}`))
      .orderBy(desc(schema.agentTasks.createdAt))
      .limit(20),
  ]);
  const canEdit = hasRole(auth.role, "admin");
  const workerOnline = workers.workers.some((w) => (w.agents as string[]).includes("custom"));

  return (
    <>
      <Link href="/builder" className="mb-3 inline-flex h-9 items-center gap-1.5 text-[13px] text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Agent Builder
      </Link>
      <PageHeader eyebrow="Custom agent" title={agent.name} description={agent.description || undefined} />
      <div className="space-y-4">
        <RunPanel
          agent={{ id: agent.id, name: agent.name, status: agent.status, tested: Boolean(agent.testedAt) }}
          canEdit={canEdit}
          claudeConnected={claude === "live"}
          workerOnline={workerOnline}
          initialPrompt={(prompt ?? "").slice(0, 400)}
        />

        {agent.memoryEnabled && (
          <Card className="p-4 sm:p-5">
            <h3 className="text-[14px] font-semibold">What this agent remembers</h3>
            <p className="mt-0.5 text-[12.5px] text-muted">Notes it saved for itself on earlier runs.</p>
            <pre className="term mt-3 max-h-40 overflow-y-auto whitespace-pre-wrap rounded-lg border border-border bg-surface-2 p-3 text-[12px] text-muted">{agent.memory || "Nothing yet."}</pre>
          </Card>
        )}

        <Section title="Run history" description="Every test and real run, with what it cost." className="mb-0 pt-2">
          <Table>
            <THead>
              <tr>
                <TH>When</TH>
                <TH>Type</TH>
                <TH>Status</TH>
                <TH className="text-right">Actions</TH>
                <TH className="text-right">Duration</TH>
                <TH className="text-right">Cost</TH>
                <TH>Result</TH>
              </tr>
            </THead>
            <tbody>
              {runs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[13px] text-muted">
                    No runs yet. Start with a test above.
                  </td>
                </tr>
              )}
              {runs.map((r) => {
                const out = (r.output ?? {}) as { result?: string; steps?: unknown[]; stopped?: string };
                const input = r.input as { test?: boolean };
                return (
                  <TR key={r.id}>
                    <TD className="whitespace-nowrap text-[12.5px] text-muted">{timeAgo(r.createdAt)}</TD>
                    <TD>{input.test ? <Badge tone="info">Test</Badge> : <Badge tone="accent">Real</Badge>}</TD>
                    <TD>
                      <StatusBadge status={r.status} />
                      {out.stopped && out.stopped !== "done" && <span className="ml-1.5 text-[12px] text-warning">stopped: {out.stopped.replace("_", " ")}</span>}
                    </TD>
                    <TD className="tabular text-right">{out.steps?.length ?? "—"}</TD>
                    <TD className="tabular text-right text-[12.5px]">{r.startedAt && r.completedAt ? formatDuration(r.completedAt.getTime() - r.startedAt.getTime()) : "—"}</TD>
                    <TD className="tabular text-right">{formatUsd(r.costUsd)}</TD>
                    <TD className="max-w-[320px] truncate text-[12.5px] text-muted" title={out.result ?? r.error?.message ?? ""}>
                      {r.error?.message ?? out.result ?? "—"}
                    </TD>
                  </TR>
                );
              })}
            </tbody>
          </Table>
        </Section>

        <Section title="Configuration" description="Changing the instructions, tools, permissions or model puts the agent back in draft until you test it again." className="mb-0 pt-4">
          <AgentForm
            id={agent.id}
            initial={{
              name: agent.name,
              description: agent.description,
              instructions: agent.instructions,
              model: agent.model,
              effort: agent.effort as "low" | "medium" | "high" | "xhigh" | "max",
              maxOutputTokens: agent.maxOutputTokens,
              tools: agent.tools,
              permissions: agent.permissions,
              memoryEnabled: agent.memoryEnabled,
              dailyBudgetUsd: agent.dailyBudgetUsd,
              maxRunSeconds: agent.maxRunSeconds,
              maxSteps: agent.maxSteps,
              maxRetries: agent.maxRetries,
            }}
            models={SUPPORTED_MODELS.map((m) => ({ id: m.id, label: m.label }))}
            canEdit={canEdit}
            claudeConnected={claude === "live"}
          />
        </Section>
      </div>
    </>
  );
}
