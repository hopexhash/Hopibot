import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { Blocks, Plus } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/app/page";
import { Badge, Button, Card, EmptyState } from "@/components/ui";
import { formatUsd, timeAgo } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";

export const metadata = { title: "Agent Builder" };

const STATUS: Record<string, { label: string; tone: "success" | "warning" | "neutral" }> = {
  active: { label: "Active", tone: "success" },
  paused: { label: "Paused", tone: "warning" },
  draft: { label: "Draft", tone: "neutral" },
};

export default async function BuilderPage() {
  const auth = await requireAuth();
  const canEdit = hasRole(auth.role, "admin");
  const agents = await db().select().from(schema.customAgents).where(and(eq(schema.customAgents.organizationId, auth.org.id), isNull(schema.customAgents.deletedAt))).orderBy(desc(schema.customAgents.createdAt));
  // Real spend and run counts per custom agent over 30 days (through their tasks).
  const stats = (await db().execute(sql`
    SELECT input->>'customAgentId' AS id, count(*) AS runs, count(*) FILTER (WHERE status = 'FAILED') AS failed, coalesce(sum(cost_usd), 0) AS cost
    FROM agent_tasks
    WHERE organization_id = ${auth.org.id} AND agent_key = 'custom' AND created_at > now() - interval '30 days'
    GROUP BY 1`)) as unknown as { id: string; runs: string; failed: string; cost: string }[];

  return (
    <>
      <PageHeader
        eyebrow="Workforce"
        title="Agent Builder"
        description="Create your own agents without programming. Describe the job, choose what the agent may use, test it, then switch it on."
        actions={
          canEdit ? (
            <Button asChild variant="primary">
              <Link href="/builder/new">
                <Plus /> Create agent
              </Link>
            </Button>
          ) : undefined
        }
      />
      {agents.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Blocks />}
            title="No custom agents yet"
            description="Your seven built-in agents cover the standard agency workflow. Build a custom agent when you want something specific, like “find dental clinics in Rotterdam with outdated websites”."
            action={
              canEdit ? (
                <Button asChild variant="primary">
                  <Link href="/builder/new">
                    <Plus /> Create your first agent
                  </Link>
                </Button>
              ) : undefined
            }
          />
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {agents.map((a) => {
            const s = stats.find((x) => x.id === a.id);
            const st = STATUS[a.status] ?? STATUS.draft;
            return (
              <Link key={a.id} href={`/builder/${a.id}`} className="panel panel-hover flex flex-col p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                    <Blocks className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[15px] font-semibold">{a.name}</h3>
                    <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-muted">{a.description || "No description"}</p>
                  </div>
                  <Badge tone={st.tone}>{st.label}</Badge>
                </div>
                <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-[12px]">
                  <div>
                    <dt className="text-subtle">Tools</dt>
                    <dd className="tabular mt-0.5 text-[14px] font-semibold">{a.tools.length}</dd>
                  </div>
                  <div>
                    <dt className="text-subtle">Runs (30d)</dt>
                    <dd className="tabular mt-0.5 text-[14px] font-semibold">
                      {s ? Number(s.runs) : 0}
                      {s && Number(s.failed) > 0 && <span className="ml-1 text-[12px] font-normal text-danger">{Number(s.failed)} failed</span>}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-subtle">Cost (30d)</dt>
                    <dd className="tabular mt-0.5 text-[14px] font-semibold">{formatUsd(s ? Number(s.cost) : 0)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-[12px] text-subtle">{a.lastRunAt ? `Last run ${timeAgo(a.lastRunAt)}` : a.testedAt ? "Tested, never run for real" : "Not tested yet"}</p>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
