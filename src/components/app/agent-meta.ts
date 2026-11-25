// Shared by server and client components (deliberately not a "use client" module).
import { ClipboardCheck, FileSearch, Globe, type LucideIcon, Radar, Rocket, Send, UserSearch } from "lucide-react";
import type { AgentKey } from "@/lib/constants";
import type { AgentLiveState } from "@/server/queries/command-center";

export const AGENT_ICON: Record<AgentKey, LucideIcon> = {
  lead_finder: Radar,
  research: FileSearch,
  contact_research: UserSearch,
  website_builder: Globe,
  quality_control: ClipboardCheck,
  deployment: Rocket,
  sales: Send,
};

type StatusStyle = { label: string; pill: string; dot: string; pulse?: boolean; explain: string };
export const AGENT_STATUS: Record<AgentLiveState["status"], StatusStyle> = {
  running: { label: "Executing", pill: "border-[rgba(0,255,120,0.4)] bg-accent-soft text-accent", dot: "bg-accent text-accent", pulse: true, explain: "Working on a task right now (confirmed by a live worker)." },
  queued: { label: "Queued", pill: "border-[rgba(67,191,255,0.3)] bg-info-soft text-info", dot: "bg-info text-info", explain: "Has tasks lined up and will start them shortly." },
  waiting: { label: "Waiting for approval", pill: "border-[rgba(255,191,71,0.35)] bg-warning-soft text-warning", dot: "bg-warning text-warning", explain: "Paused until you approve something or a limit is raised." },
  failed: { label: "Failed", pill: "border-[rgba(255,77,97,0.35)] bg-danger-soft text-danger", dot: "bg-danger text-danger", explain: "Its most recent task failed. Open the logs to see why, then retry." },
  idle: { label: "Idle", pill: "border-border bg-surface-3 text-muted", dot: "bg-green-2 text-green-2", explain: "Online and ready. Nothing to do at the moment." },
  disabled: { label: "Paused", pill: "border-border bg-surface-3 text-muted", dot: "bg-subtle text-subtle", explain: "You paused this agent. Its tasks wait until you resume it." },
  offline: { label: "Offline", pill: "border-[rgba(255,77,97,0.3)] bg-danger-soft text-danger", dot: "bg-danger text-danger", explain: "No worker process is connected, so this agent cannot run tasks." },
};

