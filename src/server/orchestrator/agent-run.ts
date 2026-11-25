import "../guard";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { AGENT_KEYS, type AgentKey } from "@/lib/constants";
import { randomToken } from "../crypto";
import { db, schema } from "../db";
import { createTask } from "./tasks";

/** A failure the operator can fix (shown verbatim). */
export class AgentRunError extends Error {}

/**
 * Starts one ad-hoc task for a built-in agent so it can be run on its own (used by the
 * agent page and the terminal's `agents run`). Picks a sensible subject from existing data.
 */
export async function startAgentRun(orgId: string, key: string, businessId?: string) {
    const k = z.enum(AGENT_KEYS).parse(key) as AgentKey;
    const suffix = randomToken(5);
    const pickBusiness = async () => {
      if (businessId) return z.string().uuid().parse(businessId);
      const [b] = await db().select({ id: schema.businesses.id }).from(schema.businesses).where(eq(schema.businesses.organizationId, orgId)).orderBy(desc(schema.businesses.leadScore)).limit(1);
      if (!b) throw new AgentRunError("Discover at least one business first.");
      return b.id;
    };
    const pickProject = async (ready: boolean) => {
      const conds = [eq(schema.websiteProjects.organizationId, orgId)];
      if (ready) conds.push(eq(schema.websiteProjects.status, "ready"));
      const [p] = await db().select().from(schema.websiteProjects).where(and(...conds)).orderBy(desc(schema.websiteProjects.updatedAt)).limit(1);
      if (!p?.currentVersionId) throw new AgentRunError(ready ? "No QC-approved website exists yet." : "Generate a website first.");
      return p;
    };
    let spec: Parameters<typeof createTask>[2];
    switch (k) {
      case "lead_finder": {
        const city = "Rotterdam";
        spec = { agentKey: k, type: "discover_leads", input: { params: { country: "Netherlands", city, category: "restaurant", radiusKm: 5, limit: 3, minScore: 40 }, actions: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      }
      case "research":
        spec = { agentKey: k, type: "research_business", businessId: await pickBusiness(), input: { next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      case "contact_research":
        spec = { agentKey: k, type: "find_contacts", businessId: await pickBusiness(), input: { next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      case "website_builder":
        spec = { agentKey: k, type: "generate_website", businessId: await pickBusiness(), input: { next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      case "quality_control": {
        const p = await pickProject(false);
        spec = { agentKey: k, type: "test_website", businessId: p.businessId, projectId: p.id, input: { versionId: p.currentVersionId, next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      }
      case "deployment": {
        const p = await pickProject(true);
        spec = { agentKey: k, type: "deploy_preview", businessId: p.businessId, projectId: p.id, input: { next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      }
      case "sales":
        spec = { agentKey: k, type: "draft_intro_email", businessId: (await pickProject(true)).businessId, input: { next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
    }
    const { task } = await createTask(orgId, null, { ...spec, priority: 1, maxAttempts: 1 });
    return { taskId: task.id, type: spec.type };
}
