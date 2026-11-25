import { z } from "zod";

/**
 * HOPI Bot operates in the Netherlands and Belgium only. Every discovery, lead, website
 * and outreach path validates against this list; adding a country is a deliberate code
 * change (an administrator decision), never something an agent or a prompt can do.
 */
export const MARKETS = [
  {
    code: "NL", name: "Netherlands", aliases: ["netherlands", "the netherlands", "nederland", "holland", "nl", "pays-bas"],
    languages: ["nl", "en"], vatPct: 21, vatLabel: "btw", phonePrefix: "+31", tld: ".nl", googleDomain: "google.nl",
    cities: ["Amsterdam", "Rotterdam", "Utrecht", "Den Haag", "Eindhoven", "Tilburg", "Breda", "Groningen", "Maastricht"],
  },
  {
    code: "BE", name: "Belgium", aliases: ["belgium", "belgië", "belgie", "belgique", "belgien", "be"],
    languages: ["nl", "fr", "en"], vatPct: 21, vatLabel: "btw / TVA", phonePrefix: "+32", tld: ".be", googleDomain: "google.be",
    cities: ["Antwerpen", "Brussel", "Gent", "Brugge", "Leuven", "Mechelen", "Hasselt", "Liège", "Charleroi"],
  },
] as const;
export type MarketCode = (typeof MARKETS)[number]["code"];
export type Market = (typeof MARKETS)[number];
export const MARKET_NAMES = MARKETS.map((m) => m.name) as ["Netherlands", "Belgium"];

export function resolveMarket(country: string | null | undefined): Market | null {
  const k = (country ?? "").trim().toLowerCase();
  if (!k) return null;
  return MARKETS.find((m) => (m.aliases as readonly string[]).includes(k)) ?? null;
}

export const isSupportedCountry = (country: string | null | undefined) => resolveMarket(country) !== null;

export class UnsupportedMarketError extends Error {
  constructor(country: string | null | undefined) {
    super(`"${country || "unknown"}" is outside the supported markets. HOPI Bot only works in the Netherlands and Belgium.`);
  }
}

/** Zod field: accepts any spelling of a supported country and stores its canonical English name. */
export const marketCountry = z
  .string()
  .trim()
  .max(60)
  .default("Netherlands")
  .transform((v, ctx) => {
    const m = resolveMarket(v);
    if (!m) {
      ctx.addIssue({ code: "custom", message: `"${v}" is outside the supported markets (Netherlands and Belgium only).` });
      return z.NEVER;
    }
    return m.name as string;
  });

const FR_CITIES = /\b(li[eè]ge|luik|charleroi|namur|namen|mons|bergen|tournai|doornik|wavre|waver|nivelles|nijvel|arlon|aarlen|verviers|la louvi[eè]re|mouscron|seraing|ottignies|louvain-la-neuve|dinant|bastogne|waterloo|braine)\b/i;
const BRUSSELS = /\b(bru(ss|x)el(les|s)?|ixelles|elsene|schaerbeek|schaarbeek|anderlecht|uccle|ukkel|etterbeek|molenbeek|saint-gilles|sint-gillis|forest|vorst|woluwe|jette|evere|auderghem|oudergem|koekelberg|ganshoren|berchem-sainte-agathe|watermael)\b/i;

/**
 * Site and outreach language for a business, from its location:
 * Netherlands → Dutch · Flanders → Dutch · Wallonia → French · Brussels → French unless
 * the business's own texts are clearly Dutch. English is never chosen automatically.
 */
export function languageFor(b: { country: string | null; city?: string | null; postalCode?: string | null; address?: string | null; ownText?: string | null }): "nl" | "fr" {
  if (resolveMarket(b.country)?.code !== "BE") return "nl";
  const pc = Number((b.postalCode ?? b.address?.match(/\b(\d{4})\b/)?.[1] ?? "").slice(0, 4));
  const place = `${b.city ?? ""} ${b.address ?? ""}`;
  const dutchText = /\b(welkom|openingsuren|openingstijden|onze|contacteer|afspraak|over ons)\b/i.test(b.ownText ?? "");
  const frenchText = /\b(bienvenue|horaires|notre|nous|rendez-vous|à propos)\b/i.test(b.ownText ?? "");
  const brussels = (pc >= 1000 && pc <= 1299) || BRUSSELS.test(place);
  if (brussels) return dutchText && !frenchText ? "nl" : "fr";
  const wallonia = (pc >= 1300 && pc <= 1499) || (pc >= 4000 && pc <= 7999) || FR_CITIES.test(place);
  if (wallonia) return "fr";
  return frenchText && !dutchText && !pc ? "fr" : "nl";
}
