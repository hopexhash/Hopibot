import "./guard";
import { asc, eq } from "drizzle-orm";
import { cache } from "react";
import { parseCatalog, type Catalog } from "@/lib/catalog";
import { parseOrgSettings, type OrgSettings } from "@/lib/settings";
import { db, schema } from "./db";

/**
 * The public agency website belongs to one workspace: SITE_ORG_ID, or the oldest workspace
 * when it is not set (a single-agency installation). Prices, company details and incoming
 * enquiries all come from and go to that workspace.
 */
export const getSiteOrg = cache(async (): Promise<{ id: string; settings: OrgSettings; catalog: Catalog } | null> => {
  const id = process.env.SITE_ORG_ID?.trim();
  const [row] = await db()
    .select({ id: schema.organizations.id, settings: schema.organizations.settings })
    .from(schema.organizations)
    .where(id ? eq(schema.organizations.id, id) : undefined)
    .orderBy(asc(schema.organizations.createdAt))
    .limit(1);
  if (!row) return null;
  const settings = parseOrgSettings(row.settings);
  return { id: row.id, settings, catalog: parseCatalog(settings.catalog) };
});
