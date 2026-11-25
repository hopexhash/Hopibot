import Link from "next/link";
import { AgentMonitor } from "@/components/app/agent-monitor";
import { SubNav } from "@/components/app/sidebar";
import { PageHeader } from "@/components/app/page";
import { Button } from "@/components/ui";
import { hasRole, requireAuth } from "@/server/auth";
import { getCommandCenterState } from "@/server/queries/command-center";

export const metadata = { title: "Agent Monitor" };

export default async function AgentMonitorPage() {
  const auth = await requireAuth();
  const cc = await getCommandCenterState(auth.org.id);
  return (
    <>
      <SubNav section="/agents" />
      <PageHeader
        eyebrow="Workforce"
        title="AI Agents"
        description="Seven specialists that work together like a small agency. Each card shows what the agent is doing right now."
        actions={
          <Button asChild>
            <Link href="/agents/config">Configure agents</Link>
          </Button>
        }
      />
      <AgentMonitor initial={cc} canControl={hasRole(auth.role, "admin")} />
    </>
  );
}
