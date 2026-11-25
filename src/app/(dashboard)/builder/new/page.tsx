import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/app/page";
import { hasRole, requireAuth } from "@/server/auth";
import { SUPPORTED_MODELS } from "@/server/costs/pricing";
import { integrationMode } from "@/server/integrations/credentials";
import { EMPTY_AGENT } from "@/lib/custom-agent-tools";
import { AgentForm } from "../agent-form";

export const metadata = { title: "Create agent" };

export default async function NewAgentPage() {
  const auth = await requireAuth();
  const claude = await integrationMode(auth.org.id, "anthropic");
  return (
    <>
      <Link href="/builder" className="mb-3 inline-flex h-9 items-center gap-1.5 text-[13px] text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Agent Builder
      </Link>
      <PageHeader eyebrow="Agent Builder" title="Create an agent" description="Four short steps. New agents start as a draft: they can only do test runs until you have seen them work." />
      <AgentForm id={null} initial={{ ...EMPTY_AGENT, effort: "medium", model: auth.org.settings.defaultModel }} models={SUPPORTED_MODELS.map((m) => ({ id: m.id, label: m.label }))} canEdit={hasRole(auth.role, "admin")} claudeConnected={claude === "live"} />
    </>
  );
}
