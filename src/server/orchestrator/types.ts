import type { RuntimeKey } from "@/lib/constants";
import type { IntegrationKey, IntegrationMode } from "@/lib/integrations-meta";
import type { OrgSettings } from "@/lib/settings";
import type { schema } from "../db";
import type { UsageContext } from "../costs/usage";

export type TaskRow = typeof schema.agentTasks.$inferSelect;
export type AgentConfig = typeof schema.agentConfigurations.$inferSelect;

export type TaskSpec = {
  agentKey: RuntimeKey;
  type: string;
  businessId?: string | null;
  projectId?: string | null;
  input?: Record<string, unknown>;
  dependsOn?: string[];
  idempotencyKey: string;
  priority?: number;
  maxAttempts?: number;
  delayMs?: number;
};

export type AgentContext = {
  task: TaskRow;
  organizationId: string;
  settings: OrgSettings;
  config: AgentConfig;
  usage: UsageContext;
  log: (level: "debug" | "info" | "warn" | "error", message: string, data?: Record<string, unknown>) => Promise<void>;
  heartbeat: () => Promise<void>;
  mode: (provider: IntegrationKey) => Promise<IntegrationMode>;
  /** Create a follow-up task in the same run (idempotent by key). */
  spawn: (spec: TaskSpec) => Promise<TaskRow | null>;
};

export type AgentResult =
  | { status: "completed"; output: Record<string, unknown> }
  | {
      status: "waiting_for_approval";
      output?: Record<string, unknown>;
      reason: string;
      approval?: { kind: string; subjectType: string; subjectId: string; summary: string; payload?: Record<string, unknown> };
    };

export type AgentHandler = (ctx: AgentContext) => Promise<AgentResult>;

/** Paid providers each agent may call (for budget checks). */
export const AGENT_PAID: Record<RuntimeKey, boolean> = {
  lead_finder: true,
  research: true,
  contact_research: true,
  website_builder: true,
  quality_control: false,
  deployment: false,
  sales: true,
  custom: true,
};
