/**
 * The activity/event model behind the Live Operations feed. Every entry is written by the
 * code that actually performs the work (agents, the executor, the autopilot); nothing is
 * generated for display.
 */
export const ACTIVITY_CATEGORIES = [
  { key: "discovery", label: "Discovery", tag: "DISCOVERY AGENT" },
  { key: "analysis", label: "Website analysis", tag: "WEBSITE ANALYZER" },
  { key: "contacts", label: "Contact finding", tag: "CONTACT AGENT" },
  { key: "research", label: "Research", tag: "RESEARCH AGENT" },
  { key: "building", label: "Website building", tag: "WEBSITE BUILDER" },
  { key: "quality", label: "Quality & SEO", tag: "QUALITY CONTROL" },
  { key: "deployment", label: "Deployment", tag: "DEPLOYMENT AGENT" },
  { key: "outreach", label: "Outreach", tag: "SALES AGENT" },
  { key: "system", label: "System", tag: "SYSTEM" },
] as const;
export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number]["key"];
export const ACTIVITY_CATEGORY_KEYS = ACTIVITY_CATEGORIES.map((c) => c.key) as ActivityCategory[];

export const ACTIVITY_STATUSES = ["running", "completed", "failed", "waiting", "warning", "info"] as const;
export type ActivityStatus = (typeof ACTIVITY_STATUSES)[number];

const BY_AGENT: Record<string, ActivityCategory> = {
  lead_finder: "discovery",
  contact_research: "contacts",
  research: "research",
  website_builder: "building",
  quality_control: "quality",
  deployment: "deployment",
  sales: "outreach",
  orchestrator: "system",
  custom: "system",
};

/** Website inspection runs inside the discovery agent but is its own stage in the feed. */
export function categoryFor(agentKey: string, kind?: string | null): ActivityCategory {
  if (kind?.startsWith("inspection.")) return "analysis";
  if (kind?.startsWith("contact.")) return "contacts";
  if (kind?.startsWith("system.")) return "system";
  return BY_AGENT[agentKey] ?? "system";
}

export function statusFor(level: string, explicit?: string | null): ActivityStatus {
  if (explicit && (ACTIVITY_STATUSES as readonly string[]).includes(explicit)) return explicit as ActivityStatus;
  return level === "error" ? "failed" : level === "warn" ? "warning" : "info";
}

export const categoryTag = (category: string) => ACTIVITY_CATEGORIES.find((c) => c.key === category)?.tag ?? category.toUpperCase();

/** Event kinds that the objective progress counts. */
export const PROGRESS_KINDS = { discovered: "lead.discovered", inspected: "inspection.done", qualified: "lead.qualified", contacts: "contact.found", websites: "website.generated", deployed: "deploy.done" } as const;
