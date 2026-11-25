// Client-safe catalogue of the tools a custom agent can be given. The implementations and
// all permission checks live on the server (src/server/custom-agents/tools.ts).

export type ToolPermission = "read" | "writeCrm" | "usePaidApis" | "startAgents";

export type ToolInfo = {
  name: string;
  label: string;
  /** Plain-language explanation shown in the Agent Builder. */
  description: string;
  permission: ToolPermission;
};

export const CUSTOM_AGENT_TOOLS: ToolInfo[] = [
  { name: "search_businesses", label: "Search for businesses", description: "Looks up real local businesses on Google Places by city and type. Each search costs a few cents.", permission: "usePaidApis" },
  { name: "analyze_website", label: "Analyze a website", description: "Opens a business website and checks how modern, mobile-friendly and complete it is. Free.", permission: "read" },
  { name: "list_leads", label: "Read leads in the CRM", description: "Looks through the leads you already have (by city, type, stage or score).", permission: "read" },
  { name: "get_lead", label: "Read one lead in detail", description: "Reads everything known about a single lead, including research notes.", permission: "read" },
  { name: "save_lead", label: "Save a lead to the CRM", description: "Adds a business as a new lead. Duplicates are detected and skipped.", permission: "writeCrm" },
  { name: "add_note", label: "Add a note to a lead", description: "Writes a note on a lead's timeline.", permission: "writeCrm" },
  { name: "start_pipeline", label: "Hand a lead to the standard agents", description: "Asks the built-in agents to research a lead, build a website preview or draft an email. Emails still wait for your approval.", permission: "startAgents" },
  { name: "notify_me", label: "Send me a notification", description: "Leaves a message in your notification bell.", permission: "read" },
  { name: "remember", label: "Remember something for next time", description: "Saves a short note the agent sees again on its next run. Only works when memory is switched on.", permission: "read" },
];

export const PERMISSION_INFO: Record<Exclude<ToolPermission, "read">, { label: string; description: string }> = {
  writeCrm: { label: "Change the CRM", description: "May add leads and notes. Without this the agent can only read." },
  usePaidApis: { label: "Use paid services", description: "May run searches that cost money (always inside the budget you set)." },
  startAgents: { label: "Start other agents", description: "May hand leads to the built-in agents (research, website, email draft)." },
};

export const DEFAULT_CUSTOM_AGENT = {
  model: "claude-opus-5-5",
  effort: "medium",
  maxOutputTokens: 8000,
  dailyBudgetUsd: 1,
  maxRunSeconds: 300,
  maxSteps: 15,
  maxRetries: 1,
} as const;

/** Starting point for a new agent: read-only, with safe limits. (Plain data: usable on server and client.) */
export const EMPTY_AGENT = {
  name: "",
  description: "",
  instructions: "",
  tools: ["list_leads", "notify_me"] as string[],
  permissions: { writeCrm: false, usePaidApis: false, startAgents: false },
  memoryEnabled: false,
  ...DEFAULT_CUSTOM_AGENT,
};
