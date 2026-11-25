import { eq } from "drizzle-orm";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/app/page";
import { Badge, Card } from "@/components/ui";
import { AGENT_KEYS, AGENT_META } from "@/lib/constants";
import { formatDuration, formatUsd } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { getAgentStats } from "@/server/queries/metrics";

export const metadata = { title: "AI Agents" };

export default async function AgentsPage() {
  const auth = await requireAuth();
  const [agents, stats] = await Promise.all([
    db().select({ agent: schema.agents, config: schema.agentConfigurations }).from(schema.agents).innerJoin(schema.agentConfigurations, eq(schema.agentConfigurations.agentId, schema.agents.id)).where(eq(schema.agents.organizationId, auth.org.id)),
    getAgentStats(auth.org.id, 30),
  ]);
  return (
    <>
      <PageHeader title="AI Agents" description="Seven specialised agents coordinated by the orchestrator. Statistics cover the last 30 days." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {AGENT_KEYS.map((key, i) => {
          const row = agents.find((a) => a.agent.key === key);
          const s = stats[key] ?? { completed: 0, failed: 0, running: 0, pending: 0, waiting: 0, avgMs: null, cost: 0 };
          const total = s.completed + s.failed;
          const rate = total ? Math.round((s.completed / total) * 100) : null;
          const meta = AGENT_META[key];
          const status = !row?.agent.enabled ? "Disabled" : s.running > 0 ? "Working" : s.pending + s.waiting > 0 ? "Queued" : "Idle";
          return (
            <Link key={key} href={`/agents/${key}`} className="group">
              <Card className="h-full p-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow-md)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold text-white" style={{ background: meta.color }}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold tracking-tight">{meta.name}</p>
                      <p className="text-xs text-muted">{row?.config.model ?? "No LLM"}</p>
                    </div>
                  </div>
                  <Badge tone={status === "Working" ? "info" : status === "Disabled" ? "danger" : status === "Queued" ? "warning" : "neutral"}>
                    <span className={`h-1.5 w-1.5 rounded-full bg-current ${status === "Working" ? "animate-pulse-dot" : ""}`} />
                    {status}
                  </Badge>
                </div>
                <p className="mt-3 line-clamp-2 text-xs text-muted">{meta.description}</p>
                <div className="mt-4 grid grid-cols-4 gap-2 border-t border-border pt-3 text-center">
                  {[
                    ["Done", s.completed],
                    ["Failed", s.failed],
                    ["Success", rate == null ? "—" : `${rate}%`],
                    ["Avg time", formatDuration(s.avgMs)],
                  ].map(([l, v]) => (
                    <div key={String(l)}>
                      <div className="tabular text-[13px] font-semibold">{v}</div>
                      <div className="text-[10px] text-muted">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted">
                  <span>API spend {formatUsd(s.cost)}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
