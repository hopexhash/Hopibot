import "../guard";
import { and, desc, eq, isNull } from "drizzle-orm";
import { z } from "zod";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { FAMILY_DESIGNS } from "@/sites/designs";
import { FAMILIES } from "@/sites/families";
import { colorwayCount } from "@/sites/colorways";
import { auditWebsite } from "../audit/website-audit";
import { randomToken } from "../crypto";
import { db, schema } from "../db";
import { claudeStructured } from "../integrations/anthropic";
import { integrationMode } from "../integrations/credentials";
import { saveLead } from "../leads/save";
import { createTask } from "../orchestrator/tasks";
import { CATEGORY_WORDS } from "../orchestrator/planner";
import type { OrgSettings } from "@/lib/settings";

const CATEGORY_KEYS = BUSINESS_CATEGORIES.map((c) => c.key) as [string, ...string[]];

/** A website address in a chat message: "restaurantolijfje.nl", "www.x.be/menu" or a full https link. */
export function findWebsite(text: string): string | null {
  const m = text.match(/\bhttps?:\/\/[^\s<>"')]+/i) ?? text.match(/\b(?:www\.)?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9-]{1,63})*\.(?:nl|be|com|eu|net|org|shop|online|nu|info|biz|store|studio|amsterdam|frl|brussels|vlaanderen|gent)\b(?:\/[^\s<>"')]*)?/i);
  if (!m) return null;
  const raw = m[0].replace(/[.,;:!?]+$/, "");
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

/** A template named in a message ("in Vesper", "met de Ivoor template"). */
export function findTemplate(text: string): { key: string; name: string } | null {
  const lower = ` ${text.toLowerCase()} `;
  const d = FAMILY_DESIGNS.filter((x) => FAMILIES[x.key]).find((x) => lower.includes(` ${x.key} `) || lower.includes(` ${x.name.toLowerCase()} `) || lower.includes(` ${x.name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")} `));
  return d ? { key: d.key, name: d.name } : null;
}

const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#0?39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const first = (html: string, re: RegExp) => {
  const m = html.match(re);
  return m ? decode(m[1]) : null;
};

export type SiteGuess = {
  url: string;
  reachable: boolean;
  title: string | null;
  name: string | null;
  city: string | null;
  category: string | null;
  country: "Netherlands" | "Belgium";
  /** How the details were found, shown so the operator knows what to check. */
  source: "website" | "website + Claude" | "address only";
};

/** Reads the website once and guesses the business's name, city, sector and country. Every guess is shown for the operator to confirm. */
export async function readBusinessFromWebsite(organizationId: string, url: string, message: string): Promise<SiteGuess> {
  const host = new URL(url).hostname.replace(/^www\./, "");
  const tldCountry = host.endsWith(".be") ? "Belgium" : "Netherlands";
  const fromDomain = host.split(".")[0].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const res = await auditWebsite(url);
  if (!res.ok) return { url, reachable: false, title: null, name: fromDomain, city: null, category: guessCategory(`${host} ${message}`), country: tldCountry, source: "address only" };
  const html = res.html;
  const title = res.audit.title ? decode(res.audit.title) : null;
  const siteName = first(html, /<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i) ?? first(html, /"@type"\s*:\s*"(?:LocalBusiness|Restaurant|Organization|[A-Za-z]+Store|[A-Za-z]+Business)"[^}]*?"name"\s*:\s*"([^"]+)"/);
  const titleName = title?.split(/\s[|–—·:-]\s/)[0]?.trim() || null;
  const ldCity = first(html, /"addressLocality"\s*:\s*"([^"]+)"/);
  const ldCountry = first(html, /"addressCountry"\s*:\s*"?(?:\{[^}]*"name"\s*:\s*")?([A-Za-z ]+)"/);
  const pcCity = html.match(/\b\d{4}\s?[A-Z]{2}\s+([A-Z][a-zA-Zëéèïöü'-]{2,24}(?:\s[A-Z][a-zA-Zëéèïöü'-]{2,24})?)\b/)?.[1] ?? null;
  const country = /belg/i.test(ldCountry ?? "") || ldCountry === "BE" ? "Belgium" : /nether|nederland/i.test(ldCountry ?? "") || ldCountry === "NL" ? "Netherlands" : tldCountry;
  const text = decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).slice(0, 3000);
  const guess: SiteGuess = { url, reachable: true, title, name: siteName ?? titleName ?? fromDomain, city: ldCity ?? pcCity, category: guessCategory(`${title ?? ""} ${res.audit.metaDescription ?? ""} ${text.slice(0, 1200)} ${message}`), country, source: "website" };
  // With Claude connected, the guesses are checked against the page; without it they stay heuristic.
  if ((await integrationMode(organizationId, "anthropic")) === "live") {
    try {
      const r = await claudeStructured({
        ctx: { organizationId, agentKey: undefined },
        operation: "console_read_business",
        effort: "low",
        maxTokens: 600,
        schema: z.object({ name: z.string().max(160), city: z.string().max(80).nullable(), category: z.enum(CATEGORY_KEYS).nullable(), country: z.enum(["Netherlands", "Belgium"]) }),
        system: "From a business's own website, give its trading name, the city it is located in, its sector and its country. Use only what the page says; city null if it is not on the page. Country is Netherlands or Belgium.",
        prompt: `Operator message: ${message.slice(0, 500)}\nURL: ${url}\nTitle: ${title ?? ""}\nDescription: ${res.audit.metaDescription ?? ""}\nPage text: ${text}`,
      });
      return { ...guess, name: r.data.name || guess.name, city: r.data.city ?? guess.city, category: r.data.category ?? guess.category, country: r.data.country, source: "website + Claude" };
    } catch {
      return guess;
    }
  }
  return guess;
}

/** Dutch trade words as they appear inside domain names and titles ("kapsalonknipwerk.nl", "bakkerijdevries.nl"). */
const STEMS: [string, string][] = [
  ["barbershop", "barbershop"], ["barber", "barbershop"], ["kapsalon", "hair_salon"], ["kapper", "hair_salon"], ["haarstudio", "hair_salon"],
  ["schoonheidssalon", "beauty_salon"], ["nagelstudio", "beauty_salon"], ["beauty", "beauty_salon"], ["huidkliniek", "beauty_clinic"],
  ["pizzeria", "pizzeria"], ["pizza", "pizzeria"], ["burger", "burger_restaurant"], ["sushi", "sushi_restaurant"], ["bakkerij", "bakery"], ["bakker", "bakery"], ["patisserie", "bakery"],
  ["koffie", "coffee_shop"], ["coffee", "coffee_shop"], ["lunchroom", "coffee_shop"], ["cafetaria", "street_food"], ["snackbar", "street_food"], ["cocktail", "bar"], ["wijnbar", "bar"],
  ["restaurant", "restaurant"], ["eetcafe", "restaurant"], ["bistro", "restaurant"], ["hotel", "hotel"],
  ["autobedrijf", "car_repair"], ["garage", "car_repair"], ["autoschade", "car_repair"], ["detailing", "car_detailing"], ["autopoets", "car_detailing"],
  ["bouwbedrijf", "construction"], ["aannemer", "construction"], ["dakdekker", "roofing"], ["loodgieter", "plumber"], ["installatie", "plumber"], ["elektro", "electrician"], ["elektricien", "electrician"],
  ["hovenier", "landscaping"], ["tuin", "landscaping"], ["schoonmaak", "cleaning"], ["tandarts", "dentist"], ["mondzorg", "dentist"], ["fysio", "physiotherapist"],
  ["makelaar", "real_estate"], ["advocat", "lawyer"], ["advocaat", "lawyer"], ["boekhoud", "accountant"], ["administratie", "accountant"], ["accountant", "accountant"],
  ["sportschool", "gym"], ["fitness", "gym"], ["personaltrainer", "personal_trainer"], ["tattoo", "tattoo_studio"], ["fotograf", "photographer"], ["juwelier", "jewelry_store"],
  ["dierenwinkel", "pet_store"], ["trimsalon", "pet_store"], ["reisbureau", "travel_agency"], ["architect", "architect"], ["interieur", "interior_designer"], ["bloemen", "shop"],
];

function guessCategory(text: string): string | null {
  const t = text.toLowerCase();
  const stem = STEMS.find(([w]) => t.includes(w));
  if (stem) return stem[1];
  for (const [key, words] of Object.entries(CATEGORY_WORDS)) if (words.some((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(t))) return key;
  for (const c of BUSINESS_CATEGORIES) {
    const stem = c.label.toLowerCase().split(/[ &]/)[0].replace(/s$/, "");
    if (stem.length > 3 && t.includes(stem)) return c.key;
  }
  return null;
}

export const startSiteSchema = z.object({
  websiteUrl: z
    .string()
    .trim()
    .max(300)
    .transform((u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`))
    .pipe(z.string().url("Enter the website, for example bakkerijdevries.nl")),
  name: z.string().trim().min(2, "Enter the business name").max(160),
  category: z.enum(CATEGORY_KEYS, { message: "Choose a sector" }),
  city: z.string().trim().min(1, "Enter the city").max(80),
  country: z.enum(["Netherlands", "Belgium"]),
  designKey: z.string().max(40).nullish(),
  variation: z.number().int().min(0).max(5).default(0),
});

/**
 * Adds (or finds) the business and starts the real pipeline: research reads its current website,
 * the website builder builds a new site (in the chosen template when one is given) and quality
 * control tests it. Nothing is sent to the business; the result waits for approval.
 */
export async function startWebsiteFromSite(organizationId: string, settings: OrgSettings, input: z.input<typeof startSiteSchema>) {
  const p = startSiteSchema.parse(input);
  const design = p.designKey && FAMILIES[p.designKey] ? p.designKey : null;
  const saved = await saveLead(
    organizationId,
    { name: p.name, category: p.category, city: p.city, country: p.country, address: null, phone: null, websiteUrl: p.websiteUrl, source: "manual" },
    { weights: settings.scoringWeights, minScore: settings.minLeadScore },
  );
  const [b] = await db().select().from(schema.businesses).where(and(eq(schema.businesses.id, saved.id), eq(schema.businesses.organizationId, organizationId)));
  if (!b) throw new Error("The business could not be saved.");
  if (b.erasedAt) throw new Error("This business's data was erased at its request.");
  if (!b.websiteUrl) await db().update(schema.businesses).set({ websiteUrl: p.websiteUrl, updatedAt: new Date() }).where(eq(schema.businesses.id, b.id));
  let projectId: string | null = null;
  if (design) {
    const [existing] = await db()
      .select()
      .from(schema.websiteProjects)
      .where(and(eq(schema.websiteProjects.organizationId, organizationId), eq(schema.websiteProjects.businessId, b.id), isNull(schema.websiteProjects.deletedAt)))
      .orderBy(desc(schema.websiteProjects.createdAt))
      .limit(1);
    const project =
      existing ??
      (
        await db()
          .insert(schema.websiteProjects)
          .values({ organizationId, businessId: b.id, templateKey: design, slug: `${slugify(b.name, 36) || "site"}-${randomToken(4).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5)}`, status: "generating" })
          .returning()
      )[0];
    await db().update(schema.websiteProjects).set({ templateKey: design, status: "generating", updatedAt: new Date() }).where(eq(schema.websiteProjects.id, project.id));
    projectId = project.id;
  }
  const variation = design ? Math.min(p.variation, colorwayCount(design) - 1) : 0;
  const { task } = await createTask(organizationId, null, {
    agentKey: "research",
    type: "research_business",
    businessId: b.id,
    projectId,
    input: { next: ["generate_website", "qc"], ...(design ? { variation } : {}) },
    idempotencyKey: `site-intake:${b.id}:${randomToken(6)}`,
    priority: 2,
  });
  return { businessId: b.id, projectId, taskId: task.id, existing: saved.status === "duplicate" };
}

/** What is happening for these businesses right now, from the task and project tables (never simulated). */
export async function pipelineStatus(organizationId: string, businessIds: string[]) {
  const out: Record<string, { step: string; status: string; projectId: string | null; projectStatus: string | null; score: number | null; error: string | null }> = {};
  for (const id of businessIds.slice(0, 20)) {
    const [task] = await db()
      .select({ agentKey: schema.agentTasks.agentKey, type: schema.agentTasks.type, status: schema.agentTasks.status, error: schema.agentTasks.error })
      .from(schema.agentTasks)
      .where(and(eq(schema.agentTasks.organizationId, organizationId), eq(schema.agentTasks.businessId, id)))
      .orderBy(desc(schema.agentTasks.createdAt))
      .limit(1);
    const [project] = await db()
      .select({ id: schema.websiteProjects.id, status: schema.websiteProjects.status, score: schema.websiteProjects.qualityScore })
      .from(schema.websiteProjects)
      .where(and(eq(schema.websiteProjects.organizationId, organizationId), eq(schema.websiteProjects.businessId, id), isNull(schema.websiteProjects.deletedAt)))
      .orderBy(desc(schema.websiteProjects.createdAt))
      .limit(1);
    out[id] = { step: task?.type ?? "queued", status: task?.status ?? "PENDING", projectId: project?.id ?? null, projectStatus: project?.status ?? null, score: project?.score ?? null, error: task?.status === "FAILED" ? (task.error?.message ?? "failed").slice(0, 200) : null };
  }
  return out;
}
