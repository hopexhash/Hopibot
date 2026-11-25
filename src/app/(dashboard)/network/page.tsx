import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { PageHeader, Section } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { WorkflowNetwork } from "@/components/app/workflow-network";
import { Badge, Button, Card } from "@/components/ui";
import { timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { getCommandCenterState } from "@/server/queries/command-center";

export const metadata = { title: "Workflow Network" };

export default async function NetworkPage() {
  const auth = await requireAuth();
  const [cc, workflows, runs] = await Promise.all([
    getCommandCenterState(auth.org.id),
    db().select().from(schema.workflows).where(eq(schema.workflows.organizationId, auth.org.id)).orderBy(desc(schema.workflows.createdAt)),
    db().select().from(schema.workflowRuns).where(eq(schema.workflowRuns.organizationId, auth.org.id)).orderBy(desc(schema.workflowRuns.createdAt)).limit(8),
  ]);
  return (
    <>
      <PageHeader
        eyebrow="AI OPERATIONS // WORKFLOW NETWORK"
        title="Workflow Network"
        description="How work moves between agents. Nodes light up during confirmed execution; failed tasks in the last hour show in red."
        actions={
          <Button asChild variant="primary">
            <Link href="/automations">Automation builder</Link>
          </Button>
        }
      />
      <WorkflowNetwork initial={cc} height={560} />
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Section title="Automations" className="mb-0">
          <Card className="divide-y divide-[rgba(0,255,102,0.06)]">
            {workflows.length === 0 && <p className="mono p-4 text-[11px] text-subtle">No automations defined.</p>}
            {workflows.map((w) => (
              <Link key={w.id} href="/automations" className="flex min-h-12 items-center justify-between gap-3 px-4 py-2.5 hover:bg-accent-soft">
                <span className="min-w-0 truncate text-[13px] font-medium">{w.name}</span>
                <Badge tone={w.enabled ? "success" : "outline"}>{w.enabled ? "ACTIVE" : "PAUSED"}</Badge>
              </Link>
            ))}
          </Card>
        </Section>
        <Section title="Recent runs" className="mb-0">
          <Card className="divide-y divide-[rgba(0,255,102,0.06)]">
            {runs.length === 0 && <p className="mono p-4 text-[11px] text-subtle">No runs yet.</p>}
            {runs.map((r) => (
              <Link key={r.id} href={`/automations/runs/${r.id}`} className="flex min-h-12 items-center justify-between gap-3 px-4 py-2.5 hover:bg-accent-soft">
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium">{r.objective ?? "Run"}</span>
                  <span className="mono text-[10.5px] text-subtle">{timeAgo(r.createdAt)}</span>
                </span>
                <StatusBadge status={r.status} />
              </Link>
            ))}
          </Card>
        </Section>
      </div>
    </>
  );
}
