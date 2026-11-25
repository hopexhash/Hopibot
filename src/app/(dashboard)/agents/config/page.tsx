import { eq } from "drizzle-orm";
import Link from "next/link";
import { PageHeader } from "@/components/app/page";
import { Badge, Button } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { AGENT_KEYS, AGENT_META } from "@/lib/constants";
import { formatUsd } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";

export const metadata = { title: "Agent Configuration" };

export default async function AgentConfigPage() {
  const auth = await requireAuth();
  const rows = await db()
    .select({ agent: schema.agents, config: schema.agentConfigurations })
    .from(schema.agents)
    .innerJoin(schema.agentConfigurations, eq(schema.agentConfigurations.agentId, schema.agents.id))
    .where(eq(schema.agents.organizationId, auth.org.id));
  return (
    <>
      <PageHeader eyebrow="SYSTEM // AGENT CONFIGURATION" title="Agent Configuration" description="Models, effort, concurrency, execution limits, spending limits and retries for each agent." />
      <Table>
        <THead>
          <tr>
            <TH>Agent</TH>
            <TH>State</TH>
            <TH>Model</TH>
            <TH>Effort</TH>
            <TH className="text-right">Concurrency</TH>
            <TH className="text-right">Max / run</TH>
            <TH className="text-right">Daily limit</TH>
            <TH className="text-right">Retries</TH>
            <TH className="text-right">Ver.</TH>
            <TH />
          </tr>
        </THead>
        <tbody>
          {AGENT_KEYS.map((k) => {
            const r = rows.find((x) => x.agent.key === k);
            if (!r) return null;
            return (
              <TR key={k}>
                <TD className="mono whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.1em]">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: AGENT_META[k].color }} />
                  {AGENT_META[k].name}
                </TD>
                <TD>{r.agent.enabled ? <Badge tone="success">ENABLED</Badge> : <Badge tone="danger">DISABLED</Badge>}</TD>
                <TD className="mono text-[12px] text-muted">{r.config.model ?? "— (no LLM)"}</TD>
                <TD className="mono text-[12px] text-muted">{r.config.effort ?? "—"}</TD>
                <TD className="mono tabular text-right">{r.config.concurrency}</TD>
                <TD className="mono tabular text-right">{r.config.maxTasksPerRun}</TD>
                <TD className="mono tabular text-right">{r.config.dailySpendLimitUsd != null ? formatUsd(r.config.dailySpendLimitUsd) : "—"}</TD>
                <TD className="mono tabular text-right">{r.config.maxRetries}</TD>
                <TD className="mono tabular text-right text-subtle">v{r.config.version}</TD>
                <TD className="text-right">
                  <Button asChild size="sm">
                    <Link href={`/agents/${k}`}>Configure</Link>
                  </Button>
                </TD>
              </TR>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
