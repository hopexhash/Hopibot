import { PageHeader } from "@/components/app/page";
import { TerminalConsole } from "@/components/app/terminal-console";
import { RUNTIME_KEYS } from "@/lib/constants";
import { hasRole, requireAuth } from "@/server/auth";

export const metadata = { title: "Terminal" };

const TABS = ["system", "agents", "executions", "api", "errors", "security"] as const;

export default async function TerminalPage({ searchParams }: { searchParams: Promise<{ agent?: string; tab?: string }> }) {
  const auth = await requireAuth();
  const { agent, tab } = await searchParams;
  const validAgent = agent && (RUNTIME_KEYS as readonly string[]).includes(agent) ? agent : "";
  const admin = hasRole(auth.role, "admin");
  const initialTab = TABS.find((t) => t === tab && (t !== "security" || admin)) ?? "agents";
  return (
    <>
      <PageHeader eyebrow="Workforce" title="Terminal" description="Watch everything your agents do as it happens, and control the system by typing commands or asking in plain language." />
      <TerminalConsole key={`${initialTab}:${validAgent}`} initialTab={initialTab} initialAgent={validAgent} canSeeSecurity={admin} />
    </>
  );
}
