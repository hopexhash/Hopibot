import "../guard";
import { and, eq, or, sql } from "drizzle-orm";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { auditWebsite, mockAudit, type WebsiteAudit } from "../audit/website-audit";
import { db, schema } from "../db";
import { geocodeCity, mockPlaces, searchPlaces, type PlaceResult } from "../integrations/google-places";
import { IntegrationUnavailableError } from "../integrations/credentials";
import { safeFetch } from "../net/safe-fetch";
import { continuePipeline } from "../orchestrator/pipeline";
import { triggerQualifiedLeadWorkflows } from "../orchestrator/recovery";
import { discoveryParamsSchema } from "../orchestrator/runs";
import { advanceStage, notify } from "../orchestrator/tasks";
import type { AgentHandler } from "../orchestrator/types";
import { dedupeKey, domainOf, scoreLead } from "../scoring/lead-score";

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

export const leadFinder: AgentHandler = async (ctx) => {
  const input = ctx.task.input as { params: unknown; topN?: number; actions?: string[]; campaignId?: string | null };
  const params = discoveryParamsSchema.parse(input.params);
  const category = BUSINESS_CATEGORIES.find((c) => c.key === params.category)!;
  const weights = ctx.settings.scoringWeights;
  const minScore = params.minScore ?? ctx.settings.minLeadScore;
  const mode = await ctx.mode("google_maps");
  if (mode === "unavailable") throw new IntegrationUnavailableError("google_maps");
  const isMock = mode === "mock";

  const queryParts = [params.businessName || category.label, params.keywords, `in ${params.city}, ${params.country}`].filter(Boolean);
  const query = queryParts.join(" ");
  await ctx.log("info", `Searching Google Places for "${query}"${isMock ? " (MOCK MODE)" : ""}`, { params });

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
    });
  }
  await ctx.log("info", `Google Places returned ${places.length} result(s).`);

  let found = 0;
  let duplicates = 0;
  let skippedClosed = 0;
  const qualified: { id: string; score: number }[] = [];

  for (const place of places) {
    if (found >= params.limit) break;
    await ctx.heartbeat();
    if (place.businessStatus && place.businessStatus !== "OPERATIONAL") {
      skippedClosed++;
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
        country: place.country ?? params.country,
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
    await db().insert(schema.leadScores).values({ organizationId: ctx.organizationId, businessId: business.id, score: scored.score, breakdown: scored.breakdown, weights });
    const isQualified = scored.score >= minScore;
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
      qualified.push({ id: business.id, score: scored.score });
      await advanceStage(business.id, "QUALIFIED", ctx.organizationId);
    }
    await ctx.log("info", `Discovered ${place.name} — score ${scored.score}${isQualified ? " (qualified)" : ""}`, {
      businessId: business.id,
      websiteStatus,
    });
  }

  if (input.campaignId) {
    await db()
      .update(schema.discoveryCampaigns)
      .set({ found, qualified: qualified.length, duplicates, status: "COMPLETED", completedAt: new Date(), isMock })
      .where(eq(schema.discoveryCampaigns.id, input.campaignId));
  }

  // Hand the best prospects to the rest of the pipeline.
  const actions = input.actions ?? [];
  const top = qualified.sort((a, b) => b.score - a.score).slice(0, input.topN ?? qualified.length);
  if (actions.length) {
    for (const b of top) await continuePipeline(ctx, { businessId: b.id, next: actions });
    await ctx.log("info", `Started the pipeline for the top ${top.length} prospect(s).`);
  } else if (qualified.length) {
    const started = await triggerQualifiedLeadWorkflows(
      ctx.organizationId,
      qualified.map((q) => q.id),
    );
    if (started) await ctx.log("info", `Triggered ${started} "new qualified lead" automation(s).`);
  }

  if (qualified.length && !isMock) {
    await notify(ctx.organizationId, `${qualified.length} new qualified lead${qualified.length === 1 ? "" : "s"}`, `Found in ${params.city} (${found} businesses checked).`, "/businesses?minScore=" + minScore, "success");
  }
  return {
    status: "completed",
    output: { found, qualified: qualified.length, duplicates, skippedClosed, pipelineStarted: actions.length ? top.length : 0, mock: isMock },
  };
};
