import Link from "next/link";
import { AgentMonitor } from "@/components/app/agent-monitor";
import { PageHeader } from "@/components/app/page";
import { Button } from "@/components/ui";
import { requireAuth } from "@/server/auth";
import { getCommandCenterState } from "@/server/queries/command-center";

export const metadata = { title: "Agent Monitor" };

export default async function AgentMonitorPage() {
  const auth = await requireAuth();
  const cc = await getCommandCenterState(auth.org.id);
  return (
    <>
      <PageHeader
        eyebrow="AI OPERATIONS // AGENT MONITOR"
        title="Agent Monitor"
        description="Live state of all seven agents. RUNNING is only shown while a worker is confirmed to be executing a task."
        actions={
          <Button asChild>
            <Link href="/agents/config">Configure agents</Link>
          </Button>
        }
      />
      <AgentMonitor initial={cc} />
    </>
  );
}
