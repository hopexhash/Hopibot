import { z } from "zod";

/**
 * Price catalogue: website packages (one-time), care plans (monthly) and add-ons.
 * Defaults live here; every organisation can edit names, prices and availability in
 * Settings → Pricing. Prices are in euro cents, excluding VAT.
 */

const item = z.object({
  key: z.string().min(1).max(40),
  name: z.string().min(1).max(60),
  description: z.string().max(200).default(""),
  /** null = price on request ("custom"): shown but cannot be bought online. */
  priceCents: z.number().int().min(0).max(10_000_000).nullable(),
  features: z.array(z.string().max(90)).max(12).default([]),
  enabled: z.boolean().default(true),
});
const addon = item.extend({ kind: z.enum(["one_time", "monthly"]).default("one_time"), unit: z.string().max(20).default(""), perUnit: z.boolean().default(false) });

export const catalogSchema = z.object({
  packages: z.array(item.extend({ featured: z.boolean().default(false) })).min(1).max(6),
  plans: z.array(item).max(6),
  addons: z.array(addon).max(30),
  vatPct: z.number().min(0).max(30).default(21),
});
export type Catalog = z.infer<typeof catalogSchema>;
export type CatalogAddon = Catalog["addons"][number];

/** Customer-facing texts default to Dutch (the launch market); every text and price is editable. */
export const DEFAULT_CATALOG: Catalog = {
  vatPct: 21,
  packages: [
    { key: "starter", name: "Starter", description: "Een professionele one-page website om gevonden en benaderd te worden.", priceCents: 29900, featured: false, enabled: true, features: ["Professionele one-page website", "Geoptimaliseerd voor mobiel", "Basis-SEO", "Contactformulier", "Google Maps-integratie"] },
    { key: "business", name: "Business", description: "Een complete website met meerdere pagina's die klanten oplevert.", priceCents: 49900, featured: true, enabled: true, features: ["Alles uit Starter", "Tot vijf pagina's", "Uitgebreid ontwerp", "Fotogalerij", "Menu- of dienstenpagina", "Betere lokale vindbaarheid"] },
    { key: "premium", name: "Premium", description: "Op maat ontworpen en gebouwd om te converteren, met reserveringen of bestellingen.", priceCents: 79900, featured: false, enabled: true, features: ["Alles uit Business", "Op maat ontworpen pagina's", "Koppeling met reserverings- of boekingssysteem", "Geavanceerde conversie-optimalisatie", "Extra inhoudssecties", "Levering met voorrang"] },
  ],
  plans: [
    { key: "hosting", name: "Hosting & Onderhoud", description: "Uw website online, snel en veilig.", priceCents: 4900, enabled: true, features: ["Hosting", "SSL-certificaat", "Beveiligingsupdates", "Back-ups", "Technische monitoring"] },
    { key: "care", name: "Website Care", description: "Wij houden uw inhoud voor u up-to-date.", priceCents: 7900, enabled: true, features: ["Alles uit Hosting & Onderhoud", "Maandelijkse inhoudswijzigingen", "Openingstijden bijwerken", "Menu of diensten bijwerken", "Support met voorrang"] },
    { key: "growth", name: "Growth", description: "Doorlopende verbetering voor meer klanten.", priceCents: 14900, enabled: true, features: ["Alles uit Website Care", "Maandelijkse SEO-verbeteringen", "Prestatierapporten", "Optimalisatie van uw Google Bedrijfsprofiel", "Conversieverbeteringen"] },
  ],
  addons: [
    { key: "logo", name: "Logo-ontwerp", description: "Een logo en kleurenpalet voor uw bedrijf.", priceCents: 9900, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
    { key: "pages", name: "Extra pagina", description: "Een extra pagina op uw website.", priceCents: 3900, kind: "one_time", unit: "pagina", perUnit: true, enabled: true, features: [] },
    { key: "booking", name: "Koppeling boekingssysteem", description: "Klanten boeken online een afspraak of tafel.", priceCents: 9900, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
    { key: "menu", name: "Digitale menukaart", description: "Uw menukaart, makkelijk bij te werken en goed leesbaar op een telefoon.", priceCents: 7900, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
    { key: "ordering", name: "Online bestellen", description: "Bestellingen voor afhalen en bezorgen via uw eigen website.", priceCents: null, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
    { key: "multilingual", name: "Meertalige website", description: "Uw website in een extra taal.", priceCents: 9900, kind: "one_time", unit: "taal", perUnit: true, enabled: true, features: [] },
    { key: "copywriting", name: "Professionele teksten", description: "Alle teksten voor u geschreven.", priceCents: 9900, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
    { key: "seo", name: "Lokaal SEO-pakket", description: "Gevonden worden door klanten in uw omgeving.", priceCents: 14900, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
    { key: "gbp", name: "Google Bedrijfsprofiel instellen", description: "Een compleet en geoptimaliseerd Google-profiel.", priceCents: 7900, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
    { key: "photography", name: "Fotografie", description: "Professionele foto's voor uw website.", priceCents: null, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
    { key: "email", name: "Zakelijke e-mail instellen", description: "E-mail op uw eigen domeinnaam.", priceCents: 4900, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
    { key: "domain", name: "Domeinregistratie", description: "Wij registreren en koppelen uw domeinnaam.", priceCents: null, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
    { key: "whatsapp", name: "WhatsApp-koppeling", description: "Klanten sturen u met één tik een bericht.", priceCents: 4900, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
    { key: "analytics", name: "Statistieken & conversiemeting", description: "Zie hoe bezoekers uw website vinden en gebruiken.", priceCents: 7900, kind: "one_time", unit: "", perUnit: false, enabled: true, features: [] },
  ],
};

export function parseCatalog(raw: unknown): Catalog {
  const res = catalogSchema.safeParse(raw);
  return res.success ? res.data : DEFAULT_CATALOG;
}

export const eur = (cents: number, digits = 0) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(cents / 100);

export type OrderSelection = { packageKey: string; planKey?: string | null; addons?: Record<string, number> };
export type OrderLine = { key: string; name: string; kind: "one_time" | "monthly"; unitCents: number; quantity: number };

/**
 * Prices an order from the catalogue. The server is the only authority on prices:
 * the browser sends keys and quantities, never amounts. Items without a fixed price
 * ("on request") are returned separately and never charged.
 */
export function priceOrder(catalog: Catalog, sel: OrderSelection): { lines: OrderLine[]; onRequest: string[]; oneTimeCents: number; monthlyCents: number } | { error: string } {
  const pkg = catalog.packages.find((p) => p.key === sel.packageKey && p.enabled);
  if (!pkg || pkg.priceCents === null) return { error: "This package is not available." };
  const lines: OrderLine[] = [{ key: pkg.key, name: `Website — ${pkg.name}`, kind: "one_time", unitCents: pkg.priceCents, quantity: 1 }];
  const onRequest: string[] = [];
  if (sel.planKey) {
    const plan = catalog.plans.find((p) => p.key === sel.planKey && p.enabled);
    if (!plan || plan.priceCents === null) return { error: "This care plan is not available." };
    lines.push({ key: plan.key, name: plan.name, kind: "monthly", unitCents: plan.priceCents, quantity: 1 });
  }
  for (const [key, rawQty] of Object.entries(sel.addons ?? {})) {
    const a = catalog.addons.find((x) => x.key === key && x.enabled);
    const qty = Math.floor(Number(rawQty));
    if (!a || !Number.isFinite(qty) || qty < 1) continue;
    if (a.priceCents === null) onRequest.push(a.name);
    else lines.push({ key: a.key, name: a.name, kind: a.kind, unitCents: a.priceCents, quantity: a.perUnit ? Math.min(qty, 20) : 1 });
  }
  const sum = (kind: OrderLine["kind"]) => lines.filter((l) => l.kind === kind).reduce((s, l) => s + l.unitCents * l.quantity, 0);
  return { lines, onRequest, oneTimeCents: sum("one_time"), monthlyCents: sum("monthly") };
}

/** Add-ons that fit an industry best (from the design's upsell list), limited to enabled catalogue items. */
export function recommendedAddons(catalog: Catalog, upsellKeys: string[], limit = 4): CatalogAddon[] {
  return upsellKeys.map((k) => catalog.addons.find((a) => a.key === k && a.enabled)).filter((a): a is CatalogAddon => Boolean(a)).slice(0, limit);
}
