/**
 * Website opportunity score (0–100): how much a business stands to gain from a new website.
 * Built only from things we measured on their current site (or the verified absence of one).
 * Every finding states what was observed; nothing here estimates lost customers or revenue.
 */

export type AuditLike = {
  https?: boolean;
  responseMs?: number;
  bytes?: number;
  title?: string | null;
  metaDescription?: string | null;
  hasViewport?: boolean;
  h1Count?: number;
  imagesWithoutAlt?: number;
  imageCount?: number;
  hasContactForm?: boolean;
  hasContactPage?: boolean;
  hasStructuredData?: boolean;
  hasOpenGraph?: boolean;
  copyrightYear?: number | null;
  outdatedSignals?: string[];
  seoIssues?: string[];
  phones?: string[];
  emails?: string[];
};

export type OpportunityArea = {
  key: "design" | "mobile" | "performance" | "navigation" | "seo" | "conversion" | "functionality";
  label: string;
  /** 0 = nothing to gain, 100 = everything to gain. */
  score: number;
  /** What we observed. Empty when this area looks fine. */
  findings: string[];
};

export type Opportunity = {
  score: number;
  basis: "no_website" | "unreachable" | "audit" | "not_analysed";
  summary: string;
  areas: OpportunityArea[];
};

const WEIGHTS: Record<OpportunityArea["key"], number> = { design: 20, mobile: 20, performance: 10, navigation: 10, seo: 15, conversion: 15, functionality: 10 };
const LABELS: Record<OpportunityArea["key"], string> = { design: "Design quality", mobile: "Mobile experience", performance: "Performance", navigation: "Navigation", seo: "Local SEO", conversion: "Conversion", functionality: "Functionality" };
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

function allAreas(score: number, finding: string): OpportunityArea[] {
  return (Object.keys(WEIGHTS) as OpportunityArea["key"][]).map((key) => ({ key, label: LABELS[key], score, findings: key === "design" ? [finding] : [] }));
}

const SEO_NL: Record<string, string> = { "missing title": "paginatitel ontbreekt", "title length": "paginatitel te kort of te lang", "missing meta description": "beschrijving voor zoekresultaten ontbreekt", "no H1": "geen hoofdkop", "multiple H1s": "meerdere hoofdkoppen", "images without alt text": "afbeeldingen zonder beschrijving", "no structured data": "geen bedrijfsgegevens voor Google" };

export function opportunityScore(input: { websiteStatus: string; audit: AuditLike | null; year?: number; lang?: string }): Opportunity {
  const { websiteStatus, audit } = input;
  const nl = input.lang === "nl";
  /** Findings are shown to prospects, so they follow the site language. */
  const L = (en: string, dutch: string) => (nl ? dutch : en);
  if (websiteStatus === "verified_none") return { score: 95, basis: "no_website", summary: "No website was found for this business.", areas: allAreas(95, "The business has no website (verified).") };
  if (websiteStatus === "none_found") return { score: 85, basis: "no_website", summary: "No website is listed for this business.", areas: allAreas(85, "No website is listed; one may exist that we could not find.") };
  if (websiteStatus === "unreachable") return { score: 80, basis: "unreachable", summary: "The listed website could not be reached.", areas: allAreas(80, "The listed website did not load when we checked it.") };
  if (!audit) return { score: 0, basis: "not_analysed", summary: "The current website has not been analysed yet.", areas: [] };

  const year = input.year ?? new Date().getFullYear();
  const a = audit;
  const area = (key: OpportunityArea["key"], score: number, findings: string[]): OpportunityArea => ({ key, label: LABELS[key], score: clamp(score), findings });
  const outdated = a.outdatedSignals ?? [];
  const seo = a.seoIssues ?? [];
  const ms = a.responseMs ?? 0;
  const kb = Math.round((a.bytes ?? 0) / 1024);

  const design = area(
    "design",
    outdated.length * 28 + (a.copyrightYear && a.copyrightYear < year - 2 ? 15 : 0),
    [...outdated.map((s) => L(`Outdated technology or markup: ${s}`, `Verouderde techniek of opmaak: ${s}`)), ...(a.copyrightYear && a.copyrightYear < year - 2 && !outdated.some((s) => s.startsWith("copyright")) ? [L(`Footer still shows ${a.copyrightYear}`, `In de voettekst staat nog ${a.copyrightYear}`)] : [])],
  );
  const mobile = area("mobile", a.hasViewport === false ? 100 : 10, a.hasViewport === false ? [L("No mobile viewport setting: the page is not built for phone screens", "Geen mobiele weergave ingesteld: de pagina is niet gebouwd voor telefoons")] : []);
  const performance = area(
    "performance",
    (ms > 4000 ? 80 : ms > 2000 ? 50 : ms > 1000 ? 25 : 5) + (kb > 800 ? 20 : 0),
    [...(ms > 2000 ? [L(`The server took ${(ms / 1000).toFixed(1)} s to respond`, `De server deed er ${(ms / 1000).toFixed(1)} s over om te reageren`)] : []), ...(kb > 800 ? [L(`The page's HTML alone is ${kb} KB`, `Alleen de HTML van de pagina is al ${kb} KB`)] : [])],
  );
  const navigation = area(
    "navigation",
    (a.hasContactPage === false ? 55 : 0) + ((a.h1Count ?? 1) === 0 ? 30 : 0),
    [...(a.hasContactPage === false ? [L("No contact page could be found from the homepage", "Vanaf de homepage is geen contactpagina te vinden")] : []), ...((a.h1Count ?? 1) === 0 ? [L("The homepage has no main heading", "De homepage heeft geen hoofdkop")] : [])],
  );
  const seoArea = area("seo", seo.length * 22, seo.map((s) => L(`Search engines: ${s}`, `Zoekmachines: ${SEO_NL[s] ?? s}`)));
  const conversion = area(
    "conversion",
    (a.hasContactForm === false ? 60 : 0) + (a.phones && a.phones.length === 0 ? 25 : 0) + (a.https === false ? 15 : 0),
    [...(a.hasContactForm === false ? [L("No contact or enquiry form", "Geen contact- of aanvraagformulier")] : []), ...(a.phones && a.phones.length === 0 ? [L("No tap-to-call phone link", "Geen telefoonnummer waarop men direct kan tikken om te bellen")] : []), ...(a.https === false ? [L("No secure connection (HTTPS): browsers show a warning", "Geen beveiligde verbinding (HTTPS): browsers tonen een waarschuwing")] : [])],
  );
  const functionality = area(
    "functionality",
    (a.hasStructuredData === false ? 40 : 0) + (a.hasOpenGraph === false ? 30 : 0) + (a.hasContactForm === false ? 30 : 0),
    [...(a.hasStructuredData === false ? [L("No business data for Google (opening hours, address) in the page", "Geen bedrijfsgegevens voor Google (openingstijden, adres) in de pagina")] : []), ...(a.hasOpenGraph === false ? [L("No preview image or text when the site is shared", "Geen voorbeeldafbeelding of tekst wanneer de site wordt gedeeld")] : [])],
  );
  const areas = [design, mobile, performance, navigation, seoArea, conversion, functionality];
  const score = clamp(areas.reduce((s, x) => s + x.score * WEIGHTS[x.key], 0) / 100);
  const top = [...areas].sort((x, y) => y.score * WEIGHTS[y.key] - x.score * WEIGHTS[x.key]).filter((x) => x.findings.length).slice(0, 2).map((x) => x.label.toLowerCase());
  return { score, basis: "audit", summary: top.length ? `Biggest gaps on the current website: ${top.join(" and ")}.` : "The current website covers the basics well.", areas };
}
