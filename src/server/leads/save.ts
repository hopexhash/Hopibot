import "../guard";
import { and, eq, or, sql } from "drizzle-orm";
import type { ScoringWeights } from "@/lib/constants";
import { auditWebsite, type WebsiteAudit } from "../audit/website-audit";
import { db, schema } from "../db";
import { advanceStage } from "../orchestrator/tasks";
import { dedupeKey, domainOf, scoreLead } from "../scoring/lead-score";
import { resolveMarket, UnsupportedMarketError } from "@/lib/markets";

export type LeadInput = {
  name: string;
  category: string;
  city?: string | null;
  country?: string | null;
  address?: string | null;
  postalCode?: string | null;
  phone?: string | null;
  websiteUrl?: string | null;
  googlePlaceId?: string | null;
  googleMapsUrl?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  openingHours?: string[] | null;
  /** manual | google_places | custom_agent */
  source: string;
  sourceData?: Record<string, unknown>;
};

export type SaveLeadResult = { status: "created"; id: string; leadScore: number; qualified: boolean; websiteStatus: string } | { status: "duplicate"; id: string };

/**
 * Saves one business as a lead with the same rules as the Lead Discovery agent:
 * duplicate detection (place id, normalised name+address, phone, website domain), a real
 * website audit when a URL is known, and a lead score from the workspace's weights.
 */
export async function saveLead(organizationId: string, input: LeadInput, opts: { weights: ScoringWeights; minScore: number; audit?: boolean }): Promise<SaveLeadResult> {
  // Market restriction: leads outside the Netherlands and Belgium are never stored.
  const market = resolveMarket(input.country);
  if (!market) throw new UnsupportedMarketError(input.country);
  input = { ...input, country: market.name };
  const key = dedupeKey(input.name, input.address, input.city);
  const domain = domainOf(input.websiteUrl);
  const b = schema.businesses;
  const dupConds = [eq(b.dedupeKey, key)];
  if (input.googlePlaceId) dupConds.push(eq(b.googlePlaceId, input.googlePlaceId));
  if (input.phone) dupConds.push(eq(b.phone, input.phone));
  if (domain) dupConds.push(sql`lower(regexp_replace(${b.websiteUrl}, '^https?://(www\\.)?([^/]+).*$', '\\2')) = ${domain}`);
  const [dup] = await db()
    .select({ id: b.id })
    .from(b)
    .where(and(eq(b.organizationId, organizationId), or(...dupConds)))
    .limit(1);
  if (dup) return { status: "duplicate", id: dup.id };

  let websiteStatus = input.websiteUrl ? "unknown" : "none_found";
  let audit: WebsiteAudit | null = null;
  let auditError: string | null = null;
  if (input.websiteUrl && opts.audit !== false) {
    const r = await auditWebsite(input.websiteUrl);
    if (r.ok) {
      websiteStatus = "has_website";
      audit = r.audit;
    } else {
      websiteStatus = "unreachable";
      auditError = r.error;
    }
  }
  const scored = scoreLead({ websiteStatus, audit, phone: input.phone ?? null, openingHours: input.openingHours ?? null, address: input.address ?? null }, opts.weights);
  const [row] = await db()
    .insert(b)
    .values({
      organizationId,
      name: input.name,
      category: input.category,
      address: input.address ?? null,
      city: input.city ?? null,
      country: input.country ?? null,
      postalCode: input.postalCode ?? null,
      phone: input.phone ?? null,
      websiteUrl: input.websiteUrl ?? null,
      googlePlaceId: input.googlePlaceId ?? null,
      googleMapsUrl: input.googleMapsUrl ?? null,
      rating: input.rating ?? null,
      reviewCount: input.reviewCount ?? null,
      openingHours: input.openingHours ?? null,
      websiteStatus,
      websiteAudit: audit ? (audit as unknown as Record<string, unknown>) : auditError ? { error: auditError } : null,
      websiteQuality: audit?.qualityScore ?? null,
      leadScore: scored.score,
      dedupeKey: key,
      source: input.source,
      sourceData: input.sourceData ?? null,
    })
    .onConflictDoNothing()
    .returning({ id: b.id });
  if (!row) {
    // Lost a race with a concurrent insert of the same Google place.
    const [again] = await db().select({ id: b.id }).from(b).where(and(eq(b.organizationId, organizationId), or(...dupConds))).limit(1);
    return { status: "duplicate", id: again?.id ?? "" };
  }
  const qualified = scored.score >= opts.minScore;
  await db().insert(schema.leadScores).values({ organizationId, businessId: row.id, score: scored.score, breakdown: scored.breakdown, weights: opts.weights });
  await db().insert(schema.leads).values({ organizationId, businessId: row.id, qualified, status: qualified ? "qualified" : "new" }).onConflictDoNothing();
  if (input.phone) {
    await db()
      .insert(schema.businessContacts)
      .values({ organizationId, businessId: row.id, type: "phone", value: input.phone, source: input.source, sourceUrl: input.googleMapsUrl ?? null, verificationStatus: "unverified", lawfulBasis: "public_business_listing" })
      .onConflictDoNothing();
  }
  if (qualified) await advanceStage(row.id, "QUALIFIED", organizationId);
  return { status: "created", id: row.id, leadScore: scored.score, qualified, websiteStatus };
}
