import { PageHeader } from "@/components/app/page";
import { Terminal } from "@/components/app/terminal";
import { AGENT_KEYS } from "@/lib/constants";
import { requireAuth } from "@/server/auth";
import { getLogs } from "@/server/queries/command-center";

export const metadata = { title: "Live Activity" };

export default async function ActivityPage({ searchParams }: { searchParams: Promise<{ agent?: string }> }) {
  const auth = await requireAuth();
  const { agent } = await searchParams;
  const valid = agent && (agent === "orchestrator" || (AGENT_KEYS as readonly string[]).includes(agent)) ? agent : "";
  const logs = await getLogs(auth.org.id, { agent: valid || undefined, limit: 200 });
  return (
    <>
      <PageHeader eyebrow="AI OPERATIONS // LIVE ACTIVITY" title="Live Activity" description="Real agent logs as they are written. Filter by agent, search, pause, copy or download." />
      <Terminal key={valid} initial={logs} initialAgent={valid} height="min(68dvh, 720px)" title="AGENCYOS://TERMINAL" />
    </>
  );
}
