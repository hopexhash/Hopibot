import "../guard";
import { and, count, eq, gte, inArray, isNull, like } from "drizzle-orm";
import { db, schema } from "../db";
import { startRun } from "../orchestrator/runs";

/** Designs started automatically from the website form per day; more than this waits for a person. */
export const INQUIRY_BUILDS_PER_DAY = 10;
const OBJECTIVE = "Website enquiry:";

/**
 * Someone asked for a free design through the website: the bot researches their business,
 * builds a website and tests it. Nothing is sent to them here; the design waits for the
 * owner's approval. The usual budgets still apply to every step.
 */
export async function startInquiryBuild(organizationId: string, businessId: string, company: string): Promise<"started" | "exists" | "capped"> {
  const [project] = await db()
    .select({ id: schema.websiteProjects.id })
    .from(schema.websiteProjects)
    .where(and(eq(schema.websiteProjects.businessId, businessId), isNull(schema.websiteProjects.deletedAt)))
    .limit(1);
  if (project) return "exists";
  const [busy] = await db()
    .select({ id: schema.agentTasks.id })
    .from(schema.agentTasks)
    .where(and(eq(schema.agentTasks.businessId, businessId), inArray(schema.agentTasks.status, ["PENDING", "RUNNING", "WAITING_FOR_APPROVAL"])))
    .limit(1);
  if (busy) return "exists";
  const [today] = await db()
    .select({ n: count() })
    .from(schema.workflowRuns)
    .where(and(eq(schema.workflowRuns.organizationId, organizationId), like(schema.workflowRuns.objective, `${OBJECTIVE}%`), gte(schema.workflowRuns.createdAt, new Date(Date.now() - 24 * 3600 * 1000))));
  if ((today?.n ?? 0) >= INQUIRY_BUILDS_PER_DAY) return "capped";
  await startRun({
    organizationId,
    objective: `${OBJECTIVE} free design for ${company}`.slice(0, 200),
    plan: { summary: `Research ${company}, build their website and test it. Requested through the website form.`.slice(0, 500), discovery: null, topN: 0, actions: ["research", "generate_website", "qc", "deploy"], businessIds: [businessId] },
  });
  return "started";
}
