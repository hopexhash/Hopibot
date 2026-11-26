import "./guard";
import { asc, eq } from "drizzle-orm";
import { cache } from "react";
import { DEFAULT_CATALOG, eur, parseCatalog, type Catalog } from "@/lib/catalog";
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

export type SiteData = {
  catalog: Catalog;
  name: string;
  email: string;
  phone: string;
  address: string;
  kvk: string;
  site: OrgSettings["site"];
  /** Formatted prices used inside running text, so copy never hardcodes an amount. */
  prices: Record<"starter" | "business" | "premium" | "from" | "hosting" | "care" | "growth" | "vat", string>;
  fromCents: number | null;
};

/**
 * Everything the public pages need, with safe defaults: the pages are prerendered and
 * refreshed in the background, and must still render when the database cannot be reached
 * (for example while building).
 */
export const getSiteData = cache(async (): Promise<SiteData> => {
  let org: Awaited<ReturnType<typeof getSiteOrg>> = null;
  try {
    org = await getSiteOrg();
  } catch {
    org = null;
  }
  const catalog = org?.catalog ?? DEFAULT_CATALOG;
  const s = org?.settings ?? parseOrgSettings({});
  const pkg = (key: string) => {
    const p = catalog.packages.find((x) => x.key === key && x.enabled);
    return p && p.priceCents !== null ? eur(p.priceCents) : "op aanvraag";
  };
  const plan = (key: string) => {
    const p = catalog.plans.find((x) => x.key === key && x.enabled);
    return p && p.priceCents !== null ? eur(p.priceCents) : "op aanvraag";
  };
  const fixed = catalog.packages.filter((p) => p.enabled && p.priceCents !== null).map((p) => p.priceCents as number);
  const fromCents = fixed.length ? Math.min(...fixed) : null;
  return {
    catalog,
    name: s.agencyName || "HOPI",
    email: s.replyToEmail || s.senderEmail || "",
    phone: s.site.phone,
    address: s.agencyAddress,
    kvk: s.kvkNumber,
    site: s.site,
    prices: { starter: pkg("starter"), business: pkg("business"), premium: pkg("premium"), from: fromCents !== null ? eur(fromCents) : "op aanvraag", hosting: plan("hosting"), care: plan("care"), growth: plan("growth"), vat: `${catalog.vatPct}%` },
    fromCents,
  };
});
