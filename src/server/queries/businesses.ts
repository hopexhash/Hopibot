import "../guard";
import { and, asc, count, desc, eq, gte, ilike, isNull, or, sql, type SQL } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "../db";

export const businessFilterSchema = z.object({
  q: z.string().trim().max(100).optional(),
  category: z.string().max(40).optional(),
  city: z.string().trim().max(80).optional(),
  stage: z.string().max(40).optional(),
  minScore: z.coerce.number().int().min(0).max(100).optional(),
  website: z.enum(["none_found", "verified_none", "has_website", "unreachable", "unknown"]).optional(),
  research: z.enum(["not_started", "in_progress", "done", "failed"]).optional(),
  campaign: z.string().uuid().optional(),
  mock: z.enum(["include", "exclude", "only"]).optional(),
  sort: z.enum(["name", "score", "quality", "created", "city"]).default("created"),
  dir: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(10).max(200).default(50),
});
export type BusinessFilters = z.infer<typeof businessFilterSchema>;

export function parseBusinessFilters(sp: Record<string, string | string[] | undefined>): BusinessFilters {
  const flat = Object.fromEntries(Object.entries(sp).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]).filter(([, v]) => v !== "" && v != null));
  const res = businessFilterSchema.safeParse(flat);
  return res.success ? res.data : businessFilterSchema.parse({});
}

function where(orgId: string, f: BusinessFilters) {
  const b = schema.businesses;
  const conds: SQL[] = [eq(b.organizationId, orgId), isNull(b.erasedAt)];
  if (f.q) conds.push(or(ilike(b.name, `%${f.q}%`), ilike(b.address, `%${f.q}%`), ilike(b.websiteUrl, `%${f.q}%`))!);
  if (f.category) conds.push(eq(b.category, f.category));
  if (f.city) conds.push(ilike(b.city, f.city));
  if (f.stage) conds.push(eq(b.pipelineStage, f.stage));
  if (f.minScore != null) conds.push(gte(b.leadScore, f.minScore));
  if (f.website) conds.push(eq(b.websiteStatus, f.website));
  if (f.research) conds.push(eq(b.researchStatus, f.research));
  if (f.campaign) conds.push(eq(b.campaignId, f.campaign));
  if (f.mock === "exclude") conds.push(eq(b.isMock, false));
  if (f.mock === "only") conds.push(eq(b.isMock, true));
  return and(...conds)!;
}

const SORT = {
  name: schema.businesses.name,
  score: schema.businesses.leadScore,
  quality: schema.businesses.websiteQuality,
  created: schema.businesses.createdAt,
  city: schema.businesses.city,
} as const;

export async function listBusinesses(orgId: string, f: BusinessFilters) {
  const b = schema.businesses;
  const order = f.dir === "asc" ? asc(SORT[f.sort]) : desc(SORT[f.sort]);
  const email = sql<string | null>`(
    SELECT c.value FROM business_contacts c
    WHERE c.business_id = ${b.id} AND c.type = 'email' AND c.verification_status <> 'invalid'
    ORDER BY (c.verification_status = 'valid') DESC, c.is_generic DESC LIMIT 1)`;
  const [rows, [{ total }]] = await Promise.all([
    db()
      .select({
        id: b.id,
        name: b.name,
        category: b.category,
        city: b.city,
        address: b.address,
        websiteUrl: b.websiteUrl,
        websiteStatus: b.websiteStatus,
        websiteQuality: b.websiteQuality,
        leadScore: b.leadScore,
        researchStatus: b.researchStatus,
        pipelineStage: b.pipelineStage,
        phone: b.phone,
        isMock: b.isMock,
        createdAt: b.createdAt,
        email,
      })
      .from(b)
      .where(where(orgId, f))
      .orderBy(sql`${order} NULLS LAST`, desc(b.id))
      .limit(f.pageSize)
      .offset((f.page - 1) * f.pageSize),
    db().select({ total: count() }).from(b).where(where(orgId, f)),
  ]);
  return { rows, total };
}

export type BusinessRow = Awaited<ReturnType<typeof listBusinesses>>["rows"][number];

export async function distinctCities(orgId: string) {
  const rows = await db()
    .selectDistinct({ city: schema.businesses.city })
    .from(schema.businesses)
    .where(eq(schema.businesses.organizationId, orgId))
    .orderBy(schema.businesses.city)
    .limit(200);
  return rows.map((r) => r.city).filter(Boolean) as string[];
}
