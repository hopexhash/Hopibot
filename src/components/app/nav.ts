import {
  BarChart3,
  Blocks,
  Bot,
  Globe,
  HeartPulse,
  KanbanSquare,
  LayoutDashboard,
  Mail,
  Megaphone,
  Plug,
  Radar,
  Settings,
  ShieldCheck,
  TerminalSquare,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Other route prefixes that belong to this section (keeps it highlighted on sub-pages). */
  match?: string[];
  /** Plain-language hint shown in tooltips and the command palette. */
  hint: string;
};

export const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Command",
    items: [
      { href: "/", label: "Command Center", icon: LayoutDashboard, hint: "Everything at a glance" },
      { href: "/approvals", label: "Approvals", icon: ShieldCheck, hint: "Things waiting for your OK" },
    ],
  },
  {
    title: "Workforce",
    items: [
      { href: "/agents", label: "AI Agents", icon: Bot, match: ["/network", "/tasks"], hint: "Your seven AI workers" },
      { href: "/builder", label: "Agent Builder", icon: Blocks, hint: "Create your own agents" },
      { href: "/terminal", label: "Terminal", icon: TerminalSquare, match: ["/activity"], hint: "Live logs and commands" },
    ],
  },
  {
    title: "Business",
    items: [
      { href: "/discovery", label: "Lead Discovery", icon: Radar, hint: "Find businesses that need a website" },
      { href: "/pipeline", label: "CRM", icon: KanbanSquare, match: ["/businesses"], hint: "Leads, customers and deals" },
      { href: "/websites", label: "Websites", icon: Globe, match: ["/previews", "/deployments"], hint: "Generated sites and previews" },
      { href: "/campaigns", label: "Campaigns", icon: Megaphone, hint: "Outreach to groups of leads" },
      { href: "/emails", label: "Email Center", icon: Mail, hint: "Drafts, sent mail and unsubscribes" },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { href: "/analytics", label: "Analytics", icon: BarChart3, match: ["/revenue", "/costs"], hint: "Results, revenue and AI costs" },
      { href: "/automations", label: "Automations", icon: Workflow, hint: "Workflows that run by themselves" },
      { href: "/health", label: "System Health", icon: HeartPulse, hint: "Is everything running?" },
    ],
  },
  {
    title: "Platform",
    items: [
      { href: "/integrations", label: "Integrations", icon: Plug, hint: "Connect API keys and services" },
      { href: "/settings", label: "Settings", icon: Settings, hint: "Agency, limits, team and security" },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

/** The nav item a pathname belongs to: the longest matching prefix wins. */
export function activeHref(pathname: string): string | null {
  if (pathname === "/") return "/";
  let best: { href: string; len: number } | null = null;
  for (const item of NAV_ITEMS) {
    for (const prefix of [item.href, ...(item.match ?? [])]) {
      if (prefix === "/") continue;
      if ((pathname === prefix || pathname.startsWith(`${prefix}/`)) && (!best || prefix.length > best.len)) best = { href: item.href, len: prefix.length };
    }
  }
  return best?.href ?? null;
}

/** Secondary tabs shown at the top of a section's pages. */
export const SUB_NAV: Record<string, { href: string; label: string }[]> = {
  "/agents": [
    { href: "/agents", label: "Agents" },
    { href: "/network", label: "Workflow map" },
    { href: "/tasks", label: "Task queue" },
    { href: "/agents/config", label: "Configuration" },
  ],
  "/pipeline": [
    { href: "/pipeline", label: "Pipeline" },
    { href: "/businesses", label: "All leads" },
  ],
  "/websites": [
    { href: "/websites", label: "Websites" },
    { href: "/previews", label: "Live previews" },
    { href: "/deployments", label: "Deployments" },
  ],
  "/analytics": [
    { href: "/analytics", label: "Overview" },
    { href: "/revenue", label: "Revenue" },
    { href: "/costs", label: "AI costs" },
  ],
};
