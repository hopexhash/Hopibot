import "../guard";
import { and, eq, gt, isNull, sql } from "drizzle-orm";
import { z } from "zod";
import { priceOrder, recommendedAddons, type Catalog } from "@/lib/catalog";
import { opportunityScore, type AuditLike } from "@/lib/opportunity";
import { designForSpec } from "@/sites/designs";
import { siteSpecSchema } from "@/lib/site-spec";
import { sha256 } from "../crypto";
import { db, schema } from "../db";
import { integrationMode } from "../integrations/credentials";
import { createCheckoutSession } from "../integrations/stripe";
import { advanceStage, notify } from "../orchestrator/tasks";
import { getOrgSettings } from "../org";

/** Everything the public demo page needs. Only finished (QC-passed) projects are shown. */
export async function loadDemo(slug: string) {
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return null;
  const [project] = await db()
    .select()
    .from(schema.websiteProjects)
    .where(and(eq(schema.websiteProjects.slug, slug), isNull(schema.websiteProjects.deletedAt)));
  if (!project?.currentVersionId || project.status !== "ready") return null;
  const [business] = await db().select().from(schema.businesses).where(eq(schema.businesses.id, project.businessId));
  if (!business || business.erasedAt) return null;
  const [version] = await db().select({ spec: schema.websiteVersions.spec }).from(schema.websiteVersions).where(eq(schema.websiteVersions.id, project.currentVersionId));
  const spec = siteSpecSchema.safeParse(version?.spec);
  const design = designForSpec(spec.success ? spec.data.theme : { template: "service", design: project.templateKey });
  const settings = await getOrgSettings(project.organizationId);
  const catalog: Catalog = settings.catalog;
  const lang = spec.success ? spec.data.meta.lang : "nl";
  const opportunity = opportunityScore({ websiteStatus: business.websiteStatus, audit: (business.websiteAudit as AuditLike | null) ?? null, lang });
  return {
    project,
    business,
    design,
    lang,
    /** What the generated site actually contains, in the site's own language. */
    included: spec.success ? spec.data.sections.filter((x) => x.type !== "cta").map((x) => x.title).slice(0, 8) : design.features,
    settings,
    catalog,
    opportunity,
    recommended: recommendedAddons(catalog, design.upsells),
    paymentsLive: (await integrationMode(project.organizationId, "stripe")) === "live",
  };
}

const BOT = /bot|crawl|spider|preview|scan|monitor|facebookexternalhit|slack|whatsapp|telegram|outlook|google|bing|curl|wget|python|headless/i;

/** Counts a prospect's visit (once per visitor per day). No IP address is stored. */
export async function recordDemoView(demo: { project: { id: string; organizationId: string; businessId: string } }, req: { ip: string; userAgent: string }, type: "view" | "checkout_view" = "view") {
  if (!req.userAgent || BOT.test(req.userAgent)) return;
  const day = new Date().toISOString().slice(0, 10);
  const visitor = sha256(`${day}|${demo.project.id}|${req.ip}|${req.userAgent}`).slice(0, 32);
  const [seen] = await db()
    .select({ id: schema.demoEvents.id })
    .from(schema.demoEvents)
    .where(and(eq(schema.demoEvents.projectId, demo.project.id), eq(schema.demoEvents.type, type), eq(schema.demoEvents.visitor, visitor)))
    .limit(1);
  if (seen) return;
  await db().insert(schema.demoEvents).values({ organizationId: demo.project.organizationId, projectId: demo.project.id, businessId: demo.project.businessId, type, visitor });
  if (type !== "view") return;
  // Only a contacted prospect opening the demo is a sales signal.
  const [moved] = await db()
    .update(schema.businesses)
    .set({ pipelineStage: "DEMO_VIEWED", updatedAt: new Date() })
    .where(and(eq(schema.businesses.id, demo.project.businessId), sql`${schema.businesses.pipelineStage} in ('CONTACTED','INTERESTED')`))
    .returning({ id: schema.businesses.id, name: schema.businesses.name });
  if (moved) {
    await db().insert(schema.crmActivities).values({ organizationId: demo.project.organizationId, businessId: moved.id, type: "stage_change", content: "Opened the demo page — stage changed to DEMO_VIEWED", metadata: { to: "DEMO_VIEWED", automated: true } });
    await notify(demo.project.organizationId, "Demo viewed", `${moved.name} opened their demo website.`, `/businesses/${moved.id}`, "info");
  }
}

export const orderInputSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{1,80}$/),
  packageKey: z.string().max(40),
  planKey: z.string().max(40).nullable().optional(),
  addons: z.record(z.string().max(40), z.number().int().min(1).max(20)).default({}),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  note: z.string().trim().max(1000).optional().default(""),
});

export type OrderResult = { ok: true; mode: "checkout"; url: string } | { ok: true; mode: "requested" } | { ok: false; error: string };

/**
 * Places an order from a demo page. Prices are computed here from the catalogue.
 * With Stripe connected the customer pays online; otherwise the order is stored as a
 * request and the agency is notified (nothing is charged, and we say so).
 */
export async function placeOrder(raw: unknown): Promise<OrderResult> {
  const parsed = orderInputSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Please check your details and try again." };
  const input = parsed.data;
  const demo = await loadDemo(input.slug);
  if (!demo) return { ok: false, error: "This demo is no longer available." };
  const orgId = demo.project.organizationId;
  // Abuse guard: a demo page accepts a handful of orders per hour.
  const [{ n }] = await db()
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.orders)
    .where(and(eq(schema.orders.projectId, demo.project.id), gt(schema.orders.createdAt, new Date(Date.now() - 3600_000))));
  if (n >= 5) return { ok: false, error: "Too many requests for this demo. Please try again later or contact us directly." };

  const priced = priceOrder(demo.catalog, { packageKey: input.packageKey, planKey: input.planKey ?? null, addons: input.addons });
  if ("error" in priced) return { ok: false, error: priced.error };
  const note = [input.note, priced.onRequest.length ? `Quote requested for: ${priced.onRequest.join(", ")}` : ""].filter(Boolean).join("\n");
  const [order] = await db()
    .insert(schema.orders)
    .values({
      organizationId: orgId,
      businessId: demo.business.id,
      projectId: demo.project.id,
      status: "requested",
      packageKey: input.packageKey,
      planKey: input.planKey ?? null,
      items: priced.lines,
      oneTimeCents: priced.oneTimeCents,
      monthlyCents: priced.monthlyCents,
      customerName: input.name,
      customerEmail: input.email,
      customerPhone: input.phone || null,
      note: note || null,
    })
    .returning();
  await db().insert(schema.demoEvents).values({ organizationId: orgId, projectId: demo.project.id, businessId: demo.business.id, type: "order" });
  const total = `€${(priced.oneTimeCents / 100).toFixed(0)}${priced.monthlyCents ? ` + €${(priced.monthlyCents / 100).toFixed(0)}/month` : ""}`;
  await db().insert(schema.crmActivities).values({ organizationId: orgId, businessId: demo.business.id, type: "system", content: `Order placed on the demo page by ${input.name} (${input.email}): ${priced.lines.map((l) => l.name).join(", ")} — ${total}` });

  if (demo.paymentsLive) {
    try {
      const base = process.env.APP_URL ?? "http://localhost:3000";
      const session = await createCheckoutSession(orgId, {
        orderId: order.id,
        businessId: demo.business.id,
        customerEmail: input.email,
        lines: priced.lines,
        successUrl: `${base}/d/${input.slug}?paid=1`,
        cancelUrl: `${base}/d/${input.slug}?cancelled=1#order`,
      });
      await db().update(schema.orders).set({ status: "checkout_started", stripeSessionId: session.id, updatedAt: new Date() }).where(eq(schema.orders.id, order.id));
      await advanceStage(demo.business.id, "CHECKOUT_STARTED", orgId);
      await notify(orgId, "Checkout started", `${demo.business.name} started paying for ${total}.`, `/businesses/${demo.business.id}`, "info");
      return { ok: true, mode: "checkout", url: session.url };
    } catch (err) {
      // Payment could not be started: keep the order as a request so the sale is not lost.
      await db().insert(schema.crmActivities).values({ organizationId: orgId, businessId: demo.business.id, type: "system", content: `Online payment could not be started (${(err as Error).message.slice(0, 120)}). The order was saved as a request.` });
    }
  }
  await advanceStage(demo.business.id, "INTERESTED", orgId);
  await notify(orgId, "New website order request", `${demo.business.name} (${input.name}) wants ${total}. Contact them to confirm and arrange payment.`, `/businesses/${demo.business.id}`, "approval");
  return { ok: true, mode: "requested" };
}
