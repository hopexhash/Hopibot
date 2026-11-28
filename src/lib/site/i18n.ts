/**
 * Languages of the public website. Dutch is the main language and lives at the root
 * (/prijzen); English lives under /en with English addresses (/en/pricing). Every page has a
 * counterpart in the other language, listed here, so the language switch, hreflang and the
 * sitemap always point to the same page in the other language.
 *
 * The demo websites (/demos/...) are websites of fictional Dutch businesses and stay Dutch.
 */
export type Locale = "nl" | "en";
export const LOCALES: Locale[] = ["nl", "en"];

/** Dutch path → English path, for every page that exists in both languages. */
export const NL_TO_EN: Record<string, string> = {
  "/": "/en",
  "/website-laten-maken": "/en/website-design",
  "/website-laten-maken/restaurant": "/en/website-design/restaurant",
  "/website-laten-maken/horeca": "/en/website-design/hospitality",
  "/website-laten-maken/kapper": "/en/website-design/hairdresser",
  "/website-laten-maken/schoonheidssalon": "/en/website-design/beauty-salon",
  "/website-laten-maken/garage": "/en/website-design/garage",
  "/website-laten-maken/loodgieter": "/en/website-design/plumber",
  "/website-laten-maken/bouwbedrijf": "/en/website-design/construction",
  "/website-laten-maken/tandarts": "/en/website-design/dentist",
  "/website-laten-maken/makelaar": "/en/website-design/estate-agent",
  "/website-laten-maken/webshop": "/en/website-design/online-shop",
  "/website-laten-maken/zzp": "/en/website-design/freelancers",
  "/website-laten-maken/mkb": "/en/website-design/small-business",
  "/website-onderhoud": "/en/website-maintenance",
  "/website-redesign": "/en/website-redesign",
  "/prijzen": "/en/pricing",
  "/werk": "/en/work",
  "/blog": "/en/blog",
  "/over-ons": "/en/about",
  "/contact": "/en/contact",
  "/privacy": "/en/privacy",
  "/cookies": "/en/cookies",
  "/algemene-voorwaarden": "/en/terms",
  "/blog/wat-kost-een-website-laten-maken": "/en/blog/how-much-does-a-website-cost",
  "/blog/website-laten-maken-of-zelf-bouwen": "/en/blog/hire-a-web-designer-or-build-it-yourself",
  "/blog/waar-moet-een-goede-bedrijfswebsite-aan-voldoen": "/en/blog/what-makes-a-good-business-website",
  "/blog/hoe-kies-je-een-webdesignbureau": "/en/blog/how-to-choose-a-web-design-agency",
  "/blog/beter-vindbaar-in-google": "/en/blog/get-found-on-google",
  "/blog/wat-kost-websiteonderhoud": "/en/blog/how-much-does-website-maintenance-cost",
  "/blog/wat-moet-er-op-een-restaurantwebsite-staan": "/en/blog/what-to-put-on-a-restaurant-website",
  "/blog/waarom-is-een-mobiele-website-belangrijk": "/en/blog/why-a-mobile-friendly-website-matters",
  "/blog/maatwerk-website-of-template": "/en/blog/custom-website-or-template",
  "/blog/meer-klanten-via-je-website": "/en/blog/get-more-customers-from-your-website",
};
export const EN_TO_NL: Record<string, string> = Object.fromEntries(Object.entries(NL_TO_EN).map(([nl, en]) => [en, nl]));

/** Project pages keep their key in both languages: /werk/restaurant ↔ /en/work/restaurant. */
const WORK_NL = /^\/werk\/([a-z0-9-]+)$/;
const WORK_EN = /^\/en\/work\/([a-z0-9-]+)$/;

export const localeOf = (path: string): Locale => (path === "/en" || path.startsWith("/en/") ? "en" : "nl");

/** The same page in the other language (or the home page of that language when there is none). */
export function counterpart(path: string, to: Locale): string {
  const [p, hash = ""] = path.split("#");
  const clean = (p || "/").replace(/\/+$/, "") || "/";
  const suffix = hash ? `#${hash}` : "";
  if (localeOf(clean) === to) return clean + suffix;
  if (to === "en") {
    const w = clean.match(WORK_NL);
    if (w) return `/en/work/${w[1]}${suffix}`;
    return (NL_TO_EN[clean] ?? "/en") + suffix;
  }
  const w = clean.match(WORK_EN);
  if (w) return `/werk/${w[1]}${suffix}`;
  return (EN_TO_NL[clean] ?? "/") + suffix;
}

/** A Dutch path written in shared code, in the given language ("/prijzen" → "/en/pricing"). */
export const href = (nlPath: string, lang: Locale) => (lang === "nl" ? nlPath : counterpart(nlPath, "en"));

/** hreflang alternates for a page given by its path in either language. */
export function alternates(path: string) {
  const nl = counterpart(path, "nl");
  const en = counterpart(path, "en");
  return { nl, en };
}
