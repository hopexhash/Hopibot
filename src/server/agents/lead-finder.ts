import "../guard";
import { resolveMarket, UnsupportedMarketError } from "@/lib/markets";
import { AgentError } from "../integrations/anthropic";
import { and, eq, or, sql } from "drizzle-orm";
import { BUSINESS_CATEGORIES, categoryLabel } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { auditWebsite, extractEmails, mockAudit, type WebsiteAudit } from "../audit/website-audit";
import { belongsToBusiness, isGenericEmail } from "./contact-research";
import { db, schema } from "../db";
import { geocodeCity, mockPlaces, searchPlaces, type PlaceResult } from "../integrations/google-places";
import { IntegrationUnavailableError } from "../integrations/credentials";
import { safeFetch } from "../net/safe-fetch";
import { continuePipeline } from "../orchestrator/pipeline";
import { triggerQualifiedLeadWorkflows } from "../orchestrator/recovery";
import { discoveryParamsSchema } from "../orchestrator/runs";
import { advanceStage, notify, notifyEvent } from "../orchestrator/tasks";
import type { AgentHandler } from "../orchestrator/types";
import { dedupeKey, domainOf, scoreLead } from "../scoring/lead-score";
import { isQualifiedLead, QUALIFICATION_META, type Qualification } from "@/lib/qualification";
import { qualifyWebsite } from "../inspection/qualify";

/**
 * When Google lists no website we do not assume there is none. We probe a few likely
 * domains and only accept one whose page title or body mentions the business name.
 */
async function probeForWebsite(name: string, city: string | null): Promise<string | null> {
  const base = slugify(name.replace(/\[MOCK\]/g, ""), 40).replace(/-/g, "");
  const dashed = slugify(name.replace(/\[MOCK\]/g, ""), 40);
  if (!base || base.length < 4) return null;
  const candidates = [...new Set([`${base}.nl`, `${dashed}.nl`, `${base}.com`, city ? `${base}${slugify(city).replace(/-/g, "")}.nl` : null])].filter(
    Boolean,
  ) as string[];
  const words = name
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3);
  for (const domain of candidates.slice(0, 4)) {
    try {
      const res = await safeFetch(`https://${domain}`, { timeoutMs: 6000, maxBytes: 400_000 });
      if (res.status >= 400) continue;
      const hay = res.body.slice(0, 200_000).toLowerCase();
      const hits = words.filter((w) => hay.includes(w)).length;
      if (words.length && hits / words.length >= 0.6) return res.url;
    } catch {
      // unreachable candidate — keep trying
    }
  }
  return null;
}

const VALID_EMAIL = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,24}$/;

/** Public email addresses of a business: its homepage first, then its contact page. Nothing is guessed. */
async function findPublicEmails(audit: Pick<WebsiteAudit, "emails" | "contactPageUrl">, websiteUrl: string | null | undefined): Promise<string[]> {
  const siteDomain = domainOf(websiteUrl);
  const own = (list: string[]) => [...new Set(list.map((e) => e.toLowerCase()))].filter((e) => VALID_EMAIL.test(e) && belongsToBusiness(e, siteDomain, true));
  let emails = own(audit.emails ?? []);
  if (!emails.length && audit.contactPageUrl) {
    try {
      const r = await safeFetch(audit.contactPageUrl, { timeoutMs: 10000, maxBytes: 1_000_000 });
      if (r.status < 400) emails = own(extractEmails(r.body));
    } catch {
      // The contact page could not be read; the business simply has no known email yet.
    }
  }
  return emails;
}

async function storeEmails(organizationId: string, businessId: string, emails: string[], sourceUrl: string | null) {
  for (const e of emails.slice(0, 3)) {
    await db()
      .insert(schema.businessContacts)
      .values({ organizationId, businessId, type: "email", value: e, isGeneric: isGenericEmail(e), source: "website", sourceUrl, verificationStatus: "unverified", lawfulBasis: isGenericEmail(e) ? "legitimate_interest_b2b_generic_address" : "legitimate_interest_b2b_review_required" })
      .onConflictDoNothing();
  }
}

/**
 * Inspects the website of a business that is already in the CRM (leads found before the
 * qualification engine existed, or a re-check you asked for) and applies the decision.
 */
const inspectExisting: AgentHandler = async (ctx) => {
  const [b] = await db()
    .select()
    .from(schema.businesses)
    .where(and(eq(schema.businesses.id, ctx.task.businessId ?? ""), eq(schema.businesses.organizationId, ctx.organizationId)));
  if (!b) throw new AgentError("Business not found.", "NOT_FOUND", false);
  if (!b.websiteUrl || b.websiteStatus !== "has_website") return { status: "completed", output: { skipped: "This business has no reachable website to inspect." } };
  let [email] = await db()
    .select({ id: schema.businessContacts.id })
    .from(schema.businessContacts)
    .where(and(eq(schema.businessContacts.businessId, b.id), eq(schema.businessContacts.type, "email")))
    .limit(1);
  // No address on file yet: look for one on the homepage and the contact page before giving up.
  if (!email && !b.isMock) {
    await ctx.log("info", `Searching the website of ${b.name} for a public email address`, { kind: "contact.searching", status: "running", url: b.websiteUrl });
    let audit = b.websiteAudit as (Pick<WebsiteAudit, "emails" | "contactPageUrl"> & { error?: string }) | null;
    if (!audit || audit.error || !Array.isArray(audit.emails)) {
      const r = await auditWebsite(b.websiteUrl);
      audit = r.ok ? r.audit : null;
    }
    const emails = audit ? await findPublicEmails(audit, b.websiteUrl) : [];
    if (emails.length) {
      await storeEmails(ctx.organizationId, b.id, emails, audit?.contactPageUrl ?? b.websiteUrl);
      email = { id: "new" };
      await ctx.log("info", `Found a publicly listed email address for ${b.name}`, { kind: "contact.found", status: "completed" });
    }
  }
  const forced = Boolean((ctx.task.input as { force?: boolean }).force);
  if (ctx.settings.requireEmail && !email && !forced) {
    await db().update(schema.businesses).set({ qualification: "no_email" }).where(eq(schema.businesses.id, b.id));
    await db().update(schema.leads).set({ qualified: false, status: "new" }).where(eq(schema.leads.businessId, b.id));
    await ctx.log("info", `${b.name} — ${QUALIFICATION_META.no_email.badge}: no public email address, so the website was not inspected.`);
    return { status: "completed", output: { qualification: "no_email" } };
  }
  const mock = b.isMock || (await ctx.mode("anthropic")) === "mock";
  const q = await qualifyWebsite({ organizationId: ctx.organizationId, usage: { ...ctx.usage, businessId: b.id }, mock, log: ctx.log }, { id: b.id, name: b.name, category: categoryLabel(b.category), url: b.websiteUrl });
  const ok = isQualifiedLead(q.qualification) && (!ctx.settings.requireEmail || Boolean(email));
  await db().update(schema.leads).set({ qualified: ok, status: ok ? "qualified" : "new" }).where(eq(schema.leads.businessId, b.id));
  if (ok) await advanceStage(b.id, "QUALIFIED", ctx.organizationId);
  return { status: "completed", output: { qualification: q.qualification, redesignScore: q.score, costUsd: q.costUsd } };
};

export const leadFinder: AgentHandler = async (ctx) => {
  if (ctx.task.type === "inspect_website") return inspectExisting(ctx);
  const input = ctx.task.input as { params: unknown; topN?: number; actions?: string[]; campaignId?: string | null };
  const params = discoveryParamsSchema.parse(input.params);
  const category = BUSINESS_CATEGORIES.find((c) => c.key === params.category)!;
  const weights = ctx.settings.scoringWeights;
  const minScore = params.minScore ?? ctx.settings.minLeadScore;
  const mode = await ctx.mode("google_maps");
  if (mode === "unavailable") throw new IntegrationUnavailableError("google_maps");
  const isMock = mode === "mock";

  // Market restriction: discovery only ever runs inside the Netherlands and Belgium.
  const market = resolveMarket(params.country);
  if (!market) throw new AgentError(new UnsupportedMarketError(params.country).message, "UNSUPPORTED_MARKET", false);
  let outsideMarket = 0;
  const queryParts = [params.businessName || category.label, params.keywords, `in ${params.city}, ${params.country}`].filter(Boolean);
  const query = queryParts.join(" ");
  await ctx.log("info", `Searching Google Maps for ${category.label.toLowerCase()} in ${params.city}${isMock ? " (MOCK MODE)" : ""}`, { params, kind: "discovery.search", status: "running" });

  // Over-fetch to leave room for duplicates and filtered results.
  const fetchCount = Math.min(60, Math.ceil(params.limit * 1.5));
  let places: PlaceResult[];
  if (isMock) {
    places = mockPlaces({ city: params.city, country: params.country, category: params.category, limit: fetchCount });
  } else {
    const center = await geocodeCity(ctx.usage, params.city, params.country);
    places = await searchPlaces(ctx.usage, {
      query,
      includedType: params.businessName ? null : category.placesType,
      center,
      radiusKm: params.radiusKm,
      limit: fetchCount,
      regionCode: market.code.toLowerCase(),
    });
  }
  await ctx.log("info", `Found ${places.length} potential business${places.length === 1 ? "" : "es"}. Filtering out duplicates and closed businesses.`, { kind: "discovery.results", status: "info" });

  let found = 0;
  let duplicates = 0;
  let skippedClosed = 0;
  let noEmail = 0;
  const requireEmail = ctx.settings.requireEmail;
  const qualified: { id: string; score: number }[] = [];
  const decisions: Record<string, number> = {};
  let inspectionCost = 0;
  const aiMock = isMock || (await ctx.mode("anthropic")) === "mock";

  for (const place of places) {
    if (found >= params.limit) break;
    await ctx.heartbeat();
    if (place.businessStatus && place.businessStatus !== "OPERATIONAL") {
      skippedClosed++;
      continue;
    }
    // The country of every result is validated: a search near the border can return foreign businesses.
    if (place.country && resolveMarket(place.country)?.code !== market.code) {
      outsideMarket++;
      continue;
    }
    const key = dedupeKey(place.name, place.address, place.city ?? params.city);
    const domain = domainOf(place.website);
    const dupConds = [eq(schema.businesses.googlePlaceId, place.placeId), eq(schema.businesses.dedupeKey, key)];
    if (place.phone) dupConds.push(eq(schema.businesses.phone, place.phone));
    if (domain) dupConds.push(sql`lower(regexp_replace(${schema.businesses.websiteUrl}, '^https?://(www\\.)?([^/]+).*$', '\\2')) = ${domain}`);
    const [dup] = await db()
      .select({ id: schema.businesses.id, leadScore: schema.businesses.leadScore })
      .from(schema.businesses)
      .where(and(eq(schema.businesses.organizationId, ctx.organizationId), or(...dupConds)))
      .limit(1);
    if (dup) {
      duplicates++;
      if (input.campaignId) {
        await db().insert(schema.leads).values({ organizationId: ctx.organizationId, businessId: dup.id, campaignId: input.campaignId, status: "duplicate" }).onConflictDoNothing();
      }
      continue;
    }

    // Website verification & audit.
    let websiteStatus = "unknown";
    let websiteUrl = place.website;
    let audit: WebsiteAudit | null = null;
    let auditError: string | null = null;
    if (isMock) {
      websiteStatus = place.website ? "has_website" : "none_found";
      audit = place.website ? mockAudit(place.website, found) : null;
    } else if (place.website) {
      const r = await auditWebsite(place.website);
      if (r.ok) {
        websiteStatus = "has_website";
        audit = r.audit;
      } else {
        websiteStatus = "unreachable";
        auditError = r.error;
      }
    } else {
      const probed = await probeForWebsite(place.name, place.city);
      if (probed) {
        websiteUrl = probed;
        const r = await auditWebsite(probed);
        websiteStatus = r.ok ? "has_website" : "unreachable";
        audit = r.ok ? r.audit : null;
        await ctx.log("info", `Found an unlisted website for ${place.name}: ${probed}`);
      } else {
        websiteStatus = "none_found";
      }
    }
    if (params.websiteStatus === "no_website" && websiteStatus === "has_website") continue;
    if (params.websiteStatus === "has_website" && websiteStatus !== "has_website") continue;

    const scored = scoreLead(
      { websiteStatus, audit, phone: place.phone, openingHours: place.openingHours, address: place.address, businessStatus: place.businessStatus },
      weights,
    );
    const [business] = await db()
      .insert(schema.businesses)
      .values({
        organizationId: ctx.organizationId,
        name: place.name,
        category: params.category,
        address: place.address,
        city: place.city ?? params.city,
        country: market.name,
        postalCode: place.postalCode,
        lat: place.lat,
        lng: place.lng,
        phone: place.phone,
        websiteUrl,
        googlePlaceId: place.placeId,
        googleMapsUrl: place.mapsUrl,
        rating: place.rating,
        reviewCount: place.reviewCount,
        openingHours: place.openingHours,
        businessStatus: place.businessStatus,
        websiteStatus,
        websiteAudit: audit ? (audit as unknown as Record<string, unknown>) : auditError ? { error: auditError } : null,
        websiteQuality: audit?.qualityScore ?? null,
        leadScore: scored.score,
        dedupeKey: key,
        source: isMock ? "mock" : "google_places",
        sourceData: { primaryType: place.primaryType, query },
        campaignId: input.campaignId ?? null,
        isMock,
      })
      .onConflictDoNothing()
      .returning({ id: schema.businesses.id });
    if (!business) {
      duplicates++;
      continue;
    }
    found++;
    await ctx.log("info", `New business: ${place.name}${websiteUrl ? ` — ${domainOf(websiteUrl) ?? websiteUrl}` : " — no website found"}`, { kind: "lead.discovered", status: "info", businessId: business.id, url: websiteUrl ?? undefined });
    await db().insert(schema.leadScores).values({ organizationId: ctx.organizationId, businessId: business.id, score: scored.score, breakdown: scored.breakdown, weights });
    // Public email addresses: from the homepage, then from the contact page. Only addresses
    // that belong to the business are kept; nothing is guessed.
    let emails: string[] = [];
    if (isMock) {
      emails = websiteUrl ? [`info@${domainOf(websiteUrl) ?? "example.invalid"}`] : [];
    } else if (audit) {
      emails = await findPublicEmails(audit, websiteUrl);
    }
    const hasEmail = emails.length > 0;
    if (!hasEmail) noEmail++;
    if (hasEmail) await ctx.log("info", `Found a publicly listed email address for ${place.name}`, { kind: "contact.found", status: "completed", businessId: business.id });
    if (!isMock) {
      for (const e of emails.slice(0, 3)) {
        await db()
          .insert(schema.businessContacts)
          .values({ organizationId: ctx.organizationId, businessId: business.id, type: "email", value: e, isGeneric: isGenericEmail(e), source: "website", sourceUrl: audit?.contactPageUrl ?? websiteUrl ?? null, verificationStatus: "unverified", lawfulBasis: isGenericEmail(e) ? "legitimate_interest_b2b_generic_address" : "legitimate_interest_b2b_review_required", isMock })
          .onConflictDoNothing();
      }
    }
    // Website qualification: a business with a website is only a lead when a real-browser
    // inspection shows that the site genuinely needs a redesign. Businesses that cannot be
    // emailed are not inspected at all, so no browser time or AI call is spent on them.
    let qualification: Qualification | null = null;
    let redesignScore: number | null = null;
    if (websiteStatus === "has_website" && websiteUrl) {
      if (requireEmail && !hasEmail) {
        qualification = "no_email";
        await db().update(schema.businesses).set({ qualification }).where(eq(schema.businesses.id, business.id));
      } else {
        await ctx.heartbeat();
        const q = await qualifyWebsite(
          { organizationId: ctx.organizationId, usage: { ...ctx.usage, businessId: business.id }, mock: aiMock, log: ctx.log },
          { id: business.id, name: place.name, category: category.label, url: websiteUrl, mockSeed: found },
        );
        qualification = q.qualification;
        redesignScore = q.score;
        inspectionCost += q.costUsd;
      }
      decisions[qualification] = (decisions[qualification] ?? 0) + 1;
    }
    // A lead only qualifies when it can actually be emailed (Settings → Autopilot → require email).
    // With a website: the redesign qualification decides. Without one: the lead score decides.
    const isQualified = (qualification ? isQualifiedLead(qualification) : scored.score >= minScore) && (!requireEmail || hasEmail);
    await db()
      .insert(schema.leads)
      .values({ organizationId: ctx.organizationId, businessId: business.id, campaignId: input.campaignId ?? null, qualified: isQualified, status: isQualified ? "qualified" : "new" })
      .onConflictDoNothing();
    // Phone listed on Google is a public business contact.
    if (place.phone) {
      await db()
        .insert(schema.businessContacts)
        .values({
          organizationId: ctx.organizationId,
          businessId: business.id,
          type: "phone",
          value: place.phone,
          source: isMock ? "mock" : "google_places",
          sourceUrl: place.mapsUrl,
          verificationStatus: "unverified",
          lawfulBasis: "public_business_listing",
          isMock,
        })
        .onConflictDoNothing();
    }
    if (isQualified) {
      qualified.push({ id: business.id, score: redesignScore ?? scored.score });
      await advanceStage(business.id, "QUALIFIED", ctx.organizationId);
      await ctx.log("info", `Saved ${place.name} to the CRM as a ${qualification === "high_priority" ? "high-priority" : "qualified"} lead`, { kind: "lead.qualified", status: "completed", businessId: business.id });
      if (qualification === "high_priority" && !isMock) await notifyEvent(ctx.organizationId, "highQualityLead", `High-priority lead: ${place.name}`, `Redesign score ${redesignScore}. The website has serious, visible problems.`, `/businesses/${business.id}`, "success");
    }
    if (!qualification || qualification === "no_email") {
      const why = qualification === "no_email" ? `${QUALIFICATION_META.no_email.badge}: no public email address, so the website was not inspected` : `no website (${websiteStatus}), lead score ${scored.score}${isQualified ? " (qualified)" : requireEmail && !hasEmail ? " (not qualified: no public email address)" : " (not qualified)"}`;
      await ctx.log("info", `${place.name} — ${why}`, { businessId: business.id, websiteStatus, kind: "lead.skipped", status: "info" });
    }
  }

  if (input.campaignId) {
    await db()
      .update(schema.discoveryCampaigns)
      .set({ found, qualified: qualified.length, duplicates, status: "COMPLETED", completedAt: new Date(), isMock })
      .where(eq(schema.discoveryCampaigns.id, input.campaignId));
  }

  if (duplicates || skippedClosed || outsideMarket) {
    await ctx.log("info", `Skipped ${duplicates} already in the CRM, ${skippedClosed} closed and ${outsideMarket} outside ${market.name}.`, { kind: "discovery.filtered", status: "info" });
  }
  const summary = Object.entries(decisions)
    .map(([k, n]) => `${n} × ${QUALIFICATION_META[k as Qualification].badge}`)
    .join(", ");
  if (summary) await ctx.log("info", `Website qualification finished: ${summary}. AI cost for inspections: $${inspectionCost.toFixed(3)}.`, { kind: "inspection.summary", status: "completed" });

  // Hand the best prospects to the rest of the pipeline.
  let actions: string[] = input.actions ?? [];
  // When an email address is required, contacts are checked first: it is the cheapest step and
  // it stops the pipeline before any money is spent on research or a website nobody can receive.
  if (requireEmail && actions.some((a) => a === "generate_website" || a === "sales_email")) {
    actions = ["contacts", ...actions.filter((a) => a !== "contacts")];
  }
  const top = qualified.sort((a, b) => b.score - a.score).slice(0, input.topN ?? qualified.length);
  if (actions.length) {
    for (const b of top) await continuePipeline(ctx, { businessId: b.id, next: actions });
    if (top.length) await ctx.log("info", `Handed the best ${top.length} lead${top.length === 1 ? "" : "s"} to the next agents.`, { kind: "discovery.handoff", status: "completed" });
  } else if (qualified.length) {
    const started = await triggerQualifiedLeadWorkflows(
      ctx.organizationId,
      qualified.map((q) => q.id),
    );
    if (started) await ctx.log("info", `Triggered ${started} "new qualified lead" automation(s).`);
  }

  if (qualified.length && !isMock) {
    await notify(ctx.organizationId, `${qualified.length} new qualified lead${qualified.length === 1 ? "" : "s"}`, `Found in ${params.city} (${found} businesses checked).`, "/businesses", "success");
  }
  return {
    status: "completed",
    output: { found, qualified: qualified.length, websiteDecisions: decisions, inspectionCostUsd: Math.round(inspectionCost * 1000) / 1000, withoutEmail: noEmail, duplicates, skippedClosed, pipelineStarted: actions.length ? top.length : 0, mock: isMock },
  };
};
