import "../guard";
import type { AgentKey, WorkflowAction } from "@/lib/constants";
import { notify } from "./tasks";
import type { AgentContext } from "./types";

export const ACTION_TASK: Record<Exclude<WorkflowAction, "notify">, { agentKey: AgentKey; type: string }> = {
  research: { agentKey: "research", type: "research_business" },
  contacts: { agentKey: "contact_research", type: "find_contacts" },
  generate_website: { agentKey: "website_builder", type: "generate_website" },
  qc: { agentKey: "quality_control", type: "test_website" },
  deploy: { agentKey: "deployment", type: "deploy_preview" },
  sales_email: { agentKey: "sales", type: "draft_intro_email" },
};

/**
 * Continuation-style pipelines: each task carries the remaining actions in `input.next`.
 * When it completes it spawns the next step. This keeps runs resumable (state lives in the
 * task rows) and lets QC loop back to the builder without a static DAG.
 */
export async function continuePipeline(
  ctx: AgentContext,
  args: { businessId: string; projectId?: string | null; next: string[]; extra?: Record<string, unknown>; iteration?: number },
) {
  let remaining = [...args.next];
  while (remaining[0] === "notify") {
    await notify(ctx.organizationId, "Workflow step finished", `A business finished its automated pipeline.`, `/businesses/${args.businessId}`);
    remaining = remaining.slice(1);
  }
  const [action, ...rest] = remaining;
  if (!action) return null;
  const mapping = ACTION_TASK[action as keyof typeof ACTION_TASK];
  if (!mapping) {
    await ctx.log("warn", `Unknown pipeline action "${action}" skipped.`);
    return continuePipeline(ctx, { ...args, next: rest });
  }
  const runKey = ctx.task.runId ?? `adhoc-${ctx.task.id}`;
  return ctx.spawn({
    agentKey: mapping.agentKey,
    type: mapping.type,
    businessId: args.businessId,
    projectId: args.projectId ?? null,
    input: { ...(args.extra ?? {}), next: rest },
    idempotencyKey: `${runKey}:${action}:${args.businessId}:${args.iteration ?? 0}`,
  });
}
