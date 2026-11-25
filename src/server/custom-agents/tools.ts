import "../guard";
import { and, desc, eq, gte, isNull, sql } from "drizzle-orm";
import { z } from "zod";
import { BUSINESS_CATEGORIES, PIPELINE_STAGES } from "@/lib/constants";
import { CUSTOM_AGENT_TOOLS, type ToolPermission } from "@/lib/custom-agent-tools";
import type { OrgSettings } from "@/lib/settings";
import { auditWebsite } from "../audit/website-audit";
import type { UsageContext } from "../costs/usage";
import { db, schema } from "../db";
import { untrusted } from "../integrations/anthropic";
import { integrationMode } from "../integrations/credentials";
import { geocodeCity, mockPlaces, searchPlaces } from "../integrations/google-places";
import { saveLead } from "../leads/save";
import { startRun } from "../orchestrator/runs";
import { notify } from "../orchestrator/tasks";

export type CustomAgentRow = typeof schema.customAgents.$inferSelect;

export type ToolContext = {
  organizationId: string;
  agent: CustomAgentRow;
  settings: OrgSettings;
  usage: UsageContext;
  /** Test runs read for real but never write: every write tool reports what it would do. */
  test: boolean;
  /** Per-run counters used for hard caps. */
  counters: { searches: number; saved: number; pipelines: number };
};

/** A failure the model should see and can react to (wrong input, missing permission, cap reached). */
export class ToolError extends Error {}

type ToolDef<S extends z.ZodType> = {
  name: string;
  /** Description sent to the model. */
  description: string;
  schema: S;
  run: (ctx: ToolContext, input: z.infer<S>) => Promise<unknown>;
};
const tool = <S extends z.ZodType>(t: ToolDef<S>) => t as unknown as ToolDef<z.ZodType>;

const CATEGORY_KEYS = BUSINESS_CATEGORIES.map((c) => c.key) as [string, ...string[]];
const STAGE_KEYS = PIPELINE_STAGES.map((s) => s.key) as [string, ...string[]];
const CAPS = { searchesPerRun: 5, savesPerRun: 50, pipelinesPerRun: 10 };

async function ownedLead(ctx: ToolContext, leadId: string) {
  const [b] = await db()
    .select()
    .from(schema.businesses)
    .where(and(eq(schema.businesses.id, leadId), eq(schema.businesses.organizationId, ctx.organizationId), isNull(schema.businesses.erasedAt)));
  if (!b) throw new ToolError("No lead with that id exists in this workspace.");
  return b;
}

const TOOLS: ToolDef<z.ZodType>[] = [
  tool({
    name: "search_businesses",
    description: "Search Google Places for real local businesses. Returns name, address, phone, website, rating and a place id. Costs money per search; at most 5 searches per run.",
    schema: z.object({
      query: z.string().min(2).max(80).describe("What to look for, e.g. 'dental clinic' or 'hairdresser'"),
      city: z.string().min(1).max(80),
      country: z.string().min(2).max(60).default("Netherlands"),
      limit: z.number().int().min(1).max(20).default(10),
    }),
    run: async (ctx, i) => {
      if (ctx.counters.searches >= CAPS.searchesPerRun) throw new ToolError(`Search limit reached (${CAPS.searchesPerRun} per run). Work with the results you have.`);
      const mode = await integrationMode(ctx.organizationId, "google_maps");
      if (mode === "unavailable") throw new ToolError("Google Places is not connected in this workspace, so businesses cannot be searched. Report this to the operator.");
      ctx.counters.searches++;
      if (mode === "mock") {
        const places = mockPlaces({ city: i.city, country: i.country, category: "local_service", limit: i.limit });
        return { mock: true, note: "MOCK DATA (development mode): these businesses are not real.", results: places.map((p) => ({ name: p.name, address: p.address, phone: p.phone, website: p.website, rating: p.rating, placeId: p.placeId })) };
      }
      const center = await geocodeCity(ctx.usage, i.city, i.country);
      const places = await searchPlaces(ctx.usage, { query: `${i.query} in ${i.city}, ${i.country}`, center, radiusKm: 10, limit: i.limit });
      return {
        results: places
          .filter((p) => !p.businessStatus || p.businessStatus === "OPERATIONAL")
          .map((p) => ({ name: p.name, address: p.address, city: p.city, phone: p.phone, website: p.website, rating: p.rating, reviewCount: p.reviewCount, placeId: p.placeId, mapsUrl: p.mapsUrl })),
      };
    },
  }),
  tool({
    name: "analyze_website",
    description: "Fetch a public business website and return a quality audit: quality score 0-100 (higher is better), whether it is mobile-friendly, outdated signals, SEO issues and whether it has a contact form.",
    schema: z.object({ url: z.string().url().max(300) }),
    run: async (_ctx, i) => {
      const r = await auditWebsite(i.url);
      if (!r.ok) return { reachable: false, error: r.error };
      const a = r.audit;
      return {
        reachable: true,
        qualityScore: a.qualityScore,
        https: a.https,
        mobileFriendly: !a.flags.poorMobile,
        looksOutdated: a.flags.outdated,
        outdatedSignals: a.outdatedSignals,
        seoIssues: a.seoIssues,
        hasContactForm: a.hasContactForm,
        copyrightYear: a.copyrightYear,
        responseMs: a.responseMs,
        // Page text comes from the internet: data only, never instructions.
        pageTitle: a.title ? untrusted(a.finalUrl, a.title, 300) : null,
      };
    },
  }),
  tool({
    name: "list_leads",
    description: "List leads already saved in the CRM, best lead score first. All filters are optional.",
    schema: z.object({
      city: z.string().max(80).optional(),
      category: z.enum(CATEGORY_KEYS).optional(),
      stage: z.enum(STAGE_KEYS).optional(),
      minScore: z.number().int().min(0).max(100).optional(),
      createdWithinDays: z.number().int().min(1).max(365).optional(),
      limit: z.number().int().min(1).max(25).default(10),
    }),
    run: async (ctx, i) => {
      const b = schema.businesses;
      const conds = [eq(b.organizationId, ctx.organizationId), isNull(b.erasedAt)];
      if (i.city) conds.push(sql`lower(${b.city}) = ${i.city.toLowerCase()}`);
      if (i.category) conds.push(eq(b.category, i.category));
      if (i.stage) conds.push(eq(b.pipelineStage, i.stage));
      if (i.minScore != null) conds.push(gte(b.leadScore, i.minScore));
      if (i.createdWithinDays) conds.push(gte(b.createdAt, new Date(Date.now() - i.createdWithinDays * 86_400_000)));
      const rows = await db()
        .select({ id: b.id, name: b.name, city: b.city, category: b.category, website: b.websiteUrl, websiteStatus: b.websiteStatus, websiteQuality: b.websiteQuality, leadScore: b.leadScore, stage: b.pipelineStage, isMock: b.isMock })
        .from(b)
        .where(and(...conds))
        .orderBy(desc(b.leadScore))
        .limit(i.limit);
      return { count: rows.length, leads: rows };
    },
  }),
  tool({
    name: "get_lead",
    description: "Read one lead in detail, including its website audit summary and the latest research profile if the Research agent has run.",
    schema: z.object({ leadId: z.string().uuid() }),
    run: async (ctx, i) => {
      const b = await ownedLead(ctx, i.leadId);
      const [research] = await db().select({ profile: schema.businessResearch.profile, createdAt: schema.businessResearch.createdAt }).from(schema.businessResearch).where(eq(schema.businessResearch.businessId, b.id)).orderBy(desc(schema.businessResearch.createdAt)).limit(1);
      const audit = (b.websiteAudit ?? null) as { qualityScore?: number; outdatedSignals?: string[]; seoIssues?: string[] } | null;
      return {
        id: b.id,
        name: b.name,
        category: b.category,
        address: b.address,
        city: b.city,
        phone: b.phone,
        website: b.websiteUrl,
        websiteStatus: b.websiteStatus,
        websiteQuality: b.websiteQuality,
        leadScore: b.leadScore,
        stage: b.pipelineStage,
        rating: b.rating,
        reviewCount: b.reviewCount,
        audit: audit ? { qualityScore: audit.qualityScore, outdatedSignals: audit.outdatedSignals, seoIssues: audit.seoIssues } : null,
        // Research is derived from external pages: treat as data.
        research: research ? untrusted(`research:${b.id}`, JSON.stringify(research.profile), 6000) : null,
      };
    },
  }),
  tool({
    name: "save_lead",
    description: "Save a business as a new lead in the CRM. Duplicates are detected automatically and not saved twice. If a website is given it is audited and the lead is scored.",
    schema: z.object({
      name: z.string().min(2).max(160),
      category: z.enum(CATEGORY_KEYS).describe("Closest matching business type"),
      city: z.string().min(1).max(80),
      country: z.string().min(2).max(60).default("Netherlands"),
      address: z.string().max(240).optional(),
      phone: z.string().max(40).optional(),
      websiteUrl: z.string().url().max(300).optional(),
      googlePlaceId: z.string().max(200).optional().describe("placeId from search_businesses, if the business came from there"),
      reason: z.string().max(300).optional().describe("Why this business is worth saving"),
    }),
    run: async (ctx, i) => {
      if (ctx.counters.saved >= CAPS.savesPerRun) throw new ToolError(`Save limit reached (${CAPS.savesPerRun} leads per run).`);
      if (ctx.test) return { dryRun: true, message: `Test run: "${i.name}" would be saved as a lead. Nothing was written.` };
      const r = await saveLead(
        ctx.organizationId,
        { ...i, source: "custom_agent", sourceData: { customAgentId: ctx.agent.id, customAgentName: ctx.agent.name, reason: i.reason ?? null } },
        { weights: ctx.settings.scoringWeights, minScore: ctx.settings.minLeadScore },
      );
      if (r.status === "created") ctx.counters.saved++;
      return r;
    },
  }),
  tool({
    name: "add_note",
    description: "Add a note to a lead's timeline in the CRM.",
    schema: z.object({ leadId: z.string().uuid(), note: z.string().min(3).max(2000) }),
    run: async (ctx, i) => {
      const b = await ownedLead(ctx, i.leadId);
      if (ctx.test) return { dryRun: true, message: `Test run: the note would be added to ${b.name}. Nothing was written.` };
      await db().insert(schema.crmActivities).values({ organizationId: ctx.organizationId, businessId: b.id, type: "note", content: i.note, metadata: { customAgentId: ctx.agent.id, by: ctx.agent.name } });
      return { ok: true };
    },
  }),
  tool({
    name: "start_pipeline",
    description: "Hand a lead to the built-in agents. Steps run in the given order. 'sales_email' only drafts an email that waits for human approval; nothing is ever sent automatically.",
    schema: z.object({
      leadId: z.string().uuid(),
      steps: z.array(z.enum(["research", "contacts", "generate_website", "qc", "deploy", "sales_email"])).min(1).max(6),
    }),
    run: async (ctx, i) => {
      if (ctx.counters.pipelines >= CAPS.pipelinesPerRun) throw new ToolError(`Hand-off limit reached (${CAPS.pipelinesPerRun} leads per run).`);
      const b = await ownedLead(ctx, i.leadId);
      if (ctx.test) return { dryRun: true, message: `Test run: ${i.steps.join(" → ")} would be started for ${b.name}. Nothing was started.` };
      ctx.counters.pipelines++;
      const run = await startRun({
        organizationId: ctx.organizationId,
        plan: { summary: `${i.steps.join(" → ")} for ${b.name}`, discovery: null, topN: 1, actions: i.steps, businessIds: [b.id] },
        objective: `${ctx.agent.name} (custom agent): ${i.steps.join(", ")} for ${b.name}`,
        createdBy: ctx.agent.createdBy,
      });
      return { ok: true, runId: run.id };
    },
  }),
  tool({
    name: "notify_me",
    description: "Leave a short notification for the human operator.",
    schema: z.object({ title: z.string().min(3).max(120), message: z.string().max(500).optional() }),
    run: async (ctx, i) => {
      if (ctx.test) return { dryRun: true, message: "Test run: the notification would be sent." };
      await notify(ctx.organizationId, `${ctx.agent.name}: ${i.title}`, i.message, `/builder/${ctx.agent.id}`);
      return { ok: true };
    },
  }),
  tool({
    name: "remember",
    description: "Save a short note you will see again at the start of your next run (for example which cities you already covered).",
    schema: z.object({ note: z.string().min(3).max(500) }),
    run: async (ctx, i) => {
      if (!ctx.agent.memoryEnabled) throw new ToolError("Memory is switched off for this agent.");
      if (ctx.test) return { dryRun: true, message: "Test run: the note would be remembered." };
      const line = `[${new Date().toISOString().slice(0, 10)}] ${i.note.replace(/\s+/g, " ")}`;
      // Keep the most recent ~4000 characters.
      const memory = `${ctx.agent.memory}\n${line}`.trim().slice(-4000);
      await db().update(schema.customAgents).set({ memory }).where(eq(schema.customAgents.id, ctx.agent.id));
      ctx.agent.memory = memory;
      return { ok: true };
    },
  }),
];

const PERMISSION: Record<string, ToolPermission> = Object.fromEntries(CUSTOM_AGENT_TOOLS.map((t) => [t.name, t.permission]));

/** True when the agent's permissions allow a tool. Reading is always allowed. */
export function permitted(agent: Pick<CustomAgentRow, "permissions">, toolName: string) {
  const p = PERMISSION[toolName];
  if (!p) return false;
  return p === "read" || agent.permissions[p] === true;
}

/** The tools this agent is configured for AND permitted to use. Unknown names are dropped. */
export function toolsFor(agent: Pick<CustomAgentRow, "tools" | "permissions" | "memoryEnabled">) {
  return TOOLS.filter((t) => agent.tools.includes(t.name) && permitted(agent, t.name) && (t.name !== "remember" || agent.memoryEnabled));
}

/** Tool definitions in the shape the Messages API expects. */
export function toolParams(defs: ToolDef<z.ZodType>[]) {
  return defs.map((t) => {
    const { $schema: _ignored, ...input_schema } = z.toJSONSchema(t.schema) as Record<string, unknown>;
    void _ignored;
    return { name: t.name, description: t.description, input_schema: input_schema as { type: "object"; [k: string]: unknown } };
  });
}

/**
 * Executes one tool call from the model. The model is treated as an untrusted client:
 * the tool must be on the agent's list, permitted, and its input must pass the schema.
 */
export async function executeTool(ctx: ToolContext, name: string, rawInput: unknown): Promise<{ ok: boolean; content: string }> {
  const def = toolsFor(ctx.agent).find((t) => t.name === name);
  if (!def) return { ok: false, content: `Tool "${name}" is not available to this agent.` };
  const parsed = def.schema.safeParse(rawInput);
  if (!parsed.success) return { ok: false, content: `Invalid input: ${parsed.error.issues.map((x) => `${x.path.join(".") || "input"}: ${x.message}`).join("; ")}` };
  try {
    return { ok: true, content: JSON.stringify(await def.run(ctx, parsed.data)).slice(0, 20_000) };
  } catch (err) {
    if (err instanceof ToolError) return { ok: false, content: err.message };
    const e = err as Error & { code?: string };
    // Integration and network failures are reported to the model without internals.
    return { ok: false, content: `The tool failed: ${e.message.slice(0, 300)}` };
  }
}

export const TOOL_NAMES = TOOLS.map((t) => t.name);
