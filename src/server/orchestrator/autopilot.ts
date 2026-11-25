import "../guard";
import { and, desc, eq, gt, like, sql } from "drizzle-orm";
import { PROGRESS_KINDS } from "@/lib/activity";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { resolveMarket } from "@/lib/markets";
import { parseOrgSettings, type OrgSettings } from "@/lib/settings";
import { checkBudget } from "../costs/usage";
import { db, schema } from "../db";
import { liveWorkers } from "../health";
import { integrationMode } from "../integrations/credentials";
import { startRun } from "./runs";
import { notify, notifyEvent, writeLog } from "./tasks";

const PREFIX = "Autopilot:";

/** Hour and weekday in the agency's market time zone (Amsterdam and Brussels share it). */
export function localClock(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", hourCycle: "h23", weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { hour: Number(get("hour")), day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")), date: `${get("year")}-${get("month")}-${get("day")}` };
}

export function withinWorkingHours(a: OrgSettings["autopilot"], now: Date) {
  const c = localClock(now);
  return a.days.includes(c.day) && c.hour >= a.startHour && c.hour < a.endHour;
}

/**
 * Decides the next autopilot batch from what is still allowed today. Pure, so the limits
 * are unit-tested: it can never plan more than the remaining daily allowance.
 */
export function nextBatch(a: OrgSettings["autopilot"], today: { discovered: number; websites: number }, rotation: number) {
  if (!a.enabled || !a.cities.length || !a.categories.length || !resolveMarket(a.country)) return null;
  const leftDiscovery = a.dailyDiscoveryLimit - today.discovered;
  if (leftDiscovery <= 0) return null;
  const leftWebsites = Math.max(0, a.dailyWebsiteLimit - today.websites);
  const categories = a.categories.filter((k) => BUSINESS_CATEGORIES.some((c) => c.key === k));
  if (!categories.length) return null;
  return {
    city: a.cities[rotation % a.cities.length],
    category: categories[Math.floor(rotation / a.cities.length) % categories.length],
    limit: Math.min(10, leftDiscovery),
    topN: Math.min(2, leftWebsites),
  };
}

/** Called from the worker's maintenance tick. Starts at most one small batch per organisation per half hour. */
export async function runAutopilot(now = new Date()): Promise<{ started: number }> {
  const orgs = await db().select({ id: schema.organizations.id, settings: schema.organizations.settings }).from(schema.organizations).where(sql`${schema.organizations.settings}->'autopilot'->>'enabled' = 'true'`);
  let started = 0;
  for (const org of orgs) {
    const settings = parseOrgSettings(org.settings);
    const a = settings.autopilot;
    if (!a.enabled || !withinWorkingHours(a, now)) continue;
    const [recent] = await db()
      .select({ id: schema.workflowRuns.id, status: schema.workflowRuns.status, createdAt: schema.workflowRuns.createdAt })
      .from(schema.workflowRuns)
      .where(and(eq(schema.workflowRuns.organizationId, org.id), like(schema.workflowRuns.objective, `${PREFIX}%`)))
      .orderBy(desc(schema.workflowRuns.createdAt))
      .limit(1);
    // One batch at a time, with a pause in between: quality over volume.
    if (recent && (["PENDING", "RUNNING", "WAITING_FOR_APPROVAL"].includes(recent.status) || now.getTime() - recent.createdAt.getTime() < 30 * 60_000)) continue;
    // Budgets are hard limits: no new batch once today's or this month's spend limit is reached.
    if (!(await checkBudget(org.id)).ok) continue;
    const dayStart = new Date(now.getTime() - 24 * 3600_000);
    const [[d], [w], [runs]] = await Promise.all([
      db().select({ n: sql<number>`count(*)::int` }).from(schema.businesses).where(and(eq(schema.businesses.organizationId, org.id), gt(schema.businesses.createdAt, dayStart))),
      db().select({ n: sql<number>`count(*)::int` }).from(schema.websiteProjects).where(and(eq(schema.websiteProjects.organizationId, org.id), gt(schema.websiteProjects.createdAt, dayStart))),
      db().select({ n: sql<number>`count(*)::int` }).from(schema.workflowRuns).where(and(eq(schema.workflowRuns.organizationId, org.id), like(schema.workflowRuns.objective, `${PREFIX}%`))),
    ]);
    const batch = nextBatch(a, { discovered: d.n, websites: w.n }, runs.n);
    if (!batch) {
      if (d.n >= a.dailyDiscoveryLimit) {
        const [said] = await db().select({ id: schema.agentLogs.id }).from(schema.agentLogs).where(and(eq(schema.agentLogs.organizationId, org.id), eq(schema.agentLogs.kind, "system.daily_limit"), gt(schema.agentLogs.createdAt, dayStart))).limit(1);
        if (!said) {
          await writeLog(org.id, { agentKey: "orchestrator", message: `Daily discovery limit reached (${d.n} of ${a.dailyDiscoveryLimit}). Discovery resumes automatically tomorrow.`, data: { kind: "system.daily_limit", status: "waiting" } });
          await notifyEvent(org.id, "dailyLimit", "Daily lead discovery limit reached", `${d.n} businesses were discovered in the last 24 hours. Work resumes automatically.`, "/settings?tab=autopilot", "info");
        }
      }
      continue;
    }
    const label = BUSINESS_CATEGORIES.find((c) => c.key === batch.category)?.label.toLowerCase() ?? batch.category;
    try {
      await startRun({
        organizationId: org.id,
        objective: `${PREFIX} find ${batch.limit} ${label} in ${batch.city}${batch.topN ? ` and build demos for the best ${batch.topN}` : ""}`,
        plan: {
          summary: `Autopilot batch for ${label} in ${batch.city}.`,
          discovery: { country: a.country, city: batch.city, category: batch.category, radiusKm: 10, limit: batch.limit, minScore: settings.minLeadScore, keywords: "", businessName: "", websiteStatus: "any" },
          topN: batch.topN,
          // Emails are only ever drafted for approval; autopilot never sends anything.
          actions: batch.topN ? ["research", "contacts", "generate_website", "qc", "deploy", "sales_email"] : [],
        },
      });
      started++;
    } catch (err) {
      await notify(org.id, "Autopilot could not start a batch", (err as Error).message.slice(0, 200), "/settings?tab=autopilot", "warning");
    }
  }
  return { started };
}

export type AutonomyStatus = Awaited<ReturnType<typeof getAutonomyStatus>>;

/**
 * The objective being pursued right now (or the most recent one), with stage counts taken
 * from the events the agents recorded for that run. Nothing here is estimated.
 */
async function currentObjective(organizationId: string) {
  const r = schema.workflowRuns;
  const [run] = await db()
    .select({ id: r.id, objective: r.objective, plan: r.plan, status: r.status, createdAt: r.createdAt, completedAt: r.completedAt })
    .from(r)
    .where(eq(r.organizationId, organizationId))
    .orderBy(sql`(${r.status} in ('RUNNING','WAITING_FOR_APPROVAL')) desc`, desc(r.createdAt))
    .limit(1);
  if (!run) return null;
  const rows = await db()
    .select({ kind: schema.agentLogs.kind, n: sql<number>`count(*)::int`, businesses: sql<number>`count(distinct ${schema.agentLogs.businessId})::int` })
    .from(schema.agentLogs)
    .where(and(eq(schema.agentLogs.runId, run.id), sql`${schema.agentLogs.kind} is not null`))
    .groupBy(schema.agentLogs.kind);
  const count = (kind: string) => {
    const row = rows.find((x) => x.kind === kind);
    return row ? row.businesses || row.n : 0;
  };
  const plan = run.plan as { summary?: string; discovery?: { limit?: number } | null; topN?: number; actions?: string[] };
  const builds = (plan.actions ?? []).includes("generate_website");
  return {
    runId: run.id,
    text: (run.objective ?? plan.summary ?? "").replace(PREFIX, "").trim(),
    autonomous: (run.objective ?? "").startsWith(PREFIX),
    status: run.status,
    active: run.status === "RUNNING" || run.status === "WAITING_FOR_APPROVAL",
    startedAt: run.createdAt.toISOString(),
    target: plan.discovery?.limit ?? null,
    stages: rows.length === 0 && !(run.status === "RUNNING" || run.status === "WAITING_FOR_APPROVAL") ? [] : [
      { key: "discovery", label: "Discovery", unit: "businesses found", value: count(PROGRESS_KINDS.discovered), target: plan.discovery?.limit ?? null },
      { key: "contacts", label: "Contact discovery", unit: "with a public email", value: count(PROGRESS_KINDS.contacts), target: null },
      { key: "inspection", label: "Inspection", unit: "websites analysed", value: count(PROGRESS_KINDS.inspected), target: null },
      { key: "qualification", label: "Qualification", unit: "qualified leads saved to CRM", value: count(PROGRESS_KINDS.qualified), target: null },
      ...(builds ? [{ key: "websites", label: "Websites", unit: "demo websites built", value: count(PROGRESS_KINDS.websites), target: plan.topN ?? null }, { key: "deployment", label: "Deployment", unit: "previews online", value: count(PROGRESS_KINDS.deployed), target: plan.topN ?? null }] : []),
    ],
  };
}

/**
 * What the autonomous engine is doing right now, from real state only: the mode the admin
 * set, whether it can actually work (worker, services, budget, schedule, limits) and what it
 * produced in the last 24 hours.
 */
export async function getAutonomyStatus(organizationId: string, settings: OrgSettings, now = new Date()) {
  const a = settings.autopilot;
  const dayStart = new Date(now.getTime() - 24 * 3600_000);
  const b = schema.businesses;
  const [workers, places, claude, budget, [disc], [qual], [web], [dep], [open], [last], [tasks], objective] = await Promise.all([
    liveWorkers(),
    integrationMode(organizationId, "google_maps"),
    integrationMode(organizationId, "anthropic"),
    checkBudget(organizationId),
    db().select({ n: sql<number>`count(*)::int` }).from(b).where(and(eq(b.organizationId, organizationId), eq(b.isMock, false), gt(b.createdAt, dayStart))),
    db().select({ n: sql<number>`count(*)::int` }).from(b).where(and(eq(b.organizationId, organizationId), eq(b.isMock, false), gt(b.createdAt, dayStart), sql`EXISTS (SELECT 1 FROM leads l WHERE l.business_id = ${b.id} AND l.qualified)`)),
    db().select({ n: sql<number>`count(*)::int` }).from(schema.websiteProjects).where(and(eq(schema.websiteProjects.organizationId, organizationId), gt(schema.websiteProjects.createdAt, dayStart))),
    db().select({ n: sql<number>`count(*)::int` }).from(schema.deployments).where(and(eq(schema.deployments.organizationId, organizationId), eq(schema.deployments.status, "ready"), gt(schema.deployments.createdAt, dayStart))),
    // Open opportunities: real businesses with a finished demo that have not bought yet.
    db()
      .select({ n: sql<number>`count(distinct ${b.id})::int` })
      .from(b)
      .innerJoin(schema.websiteProjects, eq(schema.websiteProjects.businessId, b.id))
      .where(and(eq(b.organizationId, organizationId), eq(b.isMock, false), eq(schema.websiteProjects.status, "ready"), sql`${b.pipelineStage} not in ('PURCHASED','UPSELL_OPPORTUNITY','CUSTOMER','LOST')`)),
    db().select({ objective: schema.workflowRuns.objective, status: schema.workflowRuns.status, createdAt: schema.workflowRuns.createdAt }).from(schema.workflowRuns).where(and(eq(schema.workflowRuns.organizationId, organizationId), like(schema.workflowRuns.objective, `${PREFIX}%`))).orderBy(desc(schema.workflowRuns.createdAt)).limit(1),
    db()
      .select({ running: sql<number>`count(*) filter (where ${schema.agentTasks.status} = 'RUNNING')::int`, waiting: sql<number>`count(*) filter (where ${schema.agentTasks.status} = 'PENDING')::int`, approval: sql<number>`count(*) filter (where ${schema.agentTasks.status} = 'WAITING_FOR_APPROVAL')::int` })
      .from(schema.agentTasks)
      .where(eq(schema.agentTasks.organizationId, organizationId)),
    currentObjective(organizationId),
  ]);
  // Everything that currently stops autonomous work, in the order the admin should fix it.
  const blockers: { key: string; text: string; href: string }[] = [];
  if (workers.workers.length === 0) blockers.push({ key: "worker", text: "No worker is online. The worker is the always-on process that runs your agents; it must be hosted separately from the dashboard.", href: "/health" });
  if (places !== "live") blockers.push({ key: "places", text: "Google Places is not connected, so no real businesses can be discovered.", href: "/integrations" });
  if (claude !== "live") blockers.push({ key: "claude", text: "Claude is not connected, so research and website generation cannot run.", href: "/integrations" });
  if (!budget.ok) blockers.push({ key: "budget", text: budget.reason ?? "A spending limit was reached.", href: "/settings?tab=ai" });
  if (!a.cities.length || !a.categories.length) blockers.push({ key: "scope", text: "Choose at least one city and one industry.", href: "/settings?tab=autopilot" });
  const inHours = withinWorkingHours(a, now);
  const limitReached = disc.n >= a.dailyDiscoveryLimit;
  const mode = a.enabled ? ("active" as const) : ("paused" as const);
  const state = !a.enabled ? ("paused" as const) : blockers.length ? ("blocked" as const) : !inHours ? ("off_hours" as const) : tasks.running > 0 ? ("working" as const) : limitReached ? ("limit_reached" as const) : ("standby" as const);
  const featured = settings.catalog.packages.find((p) => p.featured && p.enabled && p.priceCents !== null) ?? settings.catalog.packages.find((p) => p.enabled && p.priceCents !== null);
  return {
    mode,
    state,
    blockers,
    workersOnline: workers.workers.length,
    tasks: { running: tasks.running, waiting: tasks.waiting, approval: tasks.approval },
    today: { discovered: disc.n, qualified: qual.n, websites: web.n, deployed: dep.n, costUsd: budget.daily.spent },
    limits: { discovery: a.dailyDiscoveryLimit, websites: a.dailyWebsiteLimit, dailyUsd: budget.daily.limit },
    scope: { country: a.country, cities: a.cities, categories: a.categories, startHour: a.startHour, endHour: a.endHour, days: a.days },
    /** Estimate, not a forecast: open demos × the price of the recommended package. */
    opportunity: { openDemos: open.n, estimateCents: open.n * (featured?.priceCents ?? 0), packageName: featured?.name ?? null },
    objective,
    lastBatch: last ? { objective: (last.objective ?? "").replace(PREFIX, "").trim(), status: last.status, at: last.createdAt.toISOString() } : null,
  };
}
