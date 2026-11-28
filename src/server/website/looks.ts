import { and, eq, ne, sql } from "drizzle-orm";
import type { UsedLook } from "@/lib/design-select";
import { familyOf } from "@/sites/families";
import { db, schema } from "../db";

/**
 * The looks (design + colourway) the other websites of this workspace have, with the category
 * and city of their business: what a new website of the same kind should not repeat.
 * Test (mock) businesses are left out.
 */
export async function usedLooks(organizationId: string, exceptProjectId?: string): Promise<UsedLook[]> {
  const p = schema.websiteProjects;
  const b = schema.businesses;
  const v = schema.websiteVersions;
  const rows = await db()
    .select({ family: p.templateKey, category: b.category, city: b.city, variation: sql<number | null>`(${v.spec}->'theme'->>'variation')::int` })
    .from(p)
    .innerJoin(b, eq(b.id, p.businessId))
    .leftJoin(v, eq(v.id, p.currentVersionId))
    .where(and(eq(p.organizationId, organizationId), eq(b.isMock, false), exceptProjectId ? ne(p.id, exceptProjectId) : undefined))
    .limit(2000);
  return rows.filter((r) => familyOf(r.family)).map((r) => ({ family: r.family, variation: r.variation ?? 0, category: r.category, city: r.city }));
}
