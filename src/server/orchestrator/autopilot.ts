import "../guard";
import { and, desc, eq, gt, like, sql } from "drizzle-orm";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { resolveMarket } from "@/lib/markets";
import { parseOrgSettings, type OrgSettings } from "@/lib/settings";
import { db, schema } from "../db";
import { startRun } from "./runs";
import { notify } from "./tasks";

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
    const dayStart = new Date(now.getTime() - 24 * 3600_000);
    const [[d], [w], [runs]] = await Promise.all([
      db().select({ n: sql<number>`count(*)::int` }).from(schema.businesses).where(and(eq(schema.businesses.organizationId, org.id), gt(schema.businesses.createdAt, dayStart))),
      db().select({ n: sql<number>`count(*)::int` }).from(schema.websiteProjects).where(and(eq(schema.websiteProjects.organizationId, org.id), gt(schema.websiteProjects.createdAt, dayStart))),
      db().select({ n: sql<number>`count(*)::int` }).from(schema.workflowRuns).where(and(eq(schema.workflowRuns.organizationId, org.id), like(schema.workflowRuns.objective, `${PREFIX}%`))),
    ]);
    const batch = nextBatch(a, { discovered: d.n, websites: w.n }, runs.n);
    if (!batch) continue;
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
