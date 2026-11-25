import "../guard";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { claudeStructured } from "../integrations/anthropic";
import { integrationMode } from "../integrations/credentials";
import { planSchema, type RunPlan } from "./runs";

const CATEGORY_WORDS: Record<string, string[]> = {
  restaurant: ["restaurant", "restaurants", "restaurant", "eetcafe", "eetcafé", "bistro", "cafe", "café", "cafes"],
  dentist: ["dentist", "dentists", "tandarts", "tandartsen", "dental"],
  hair_salon: ["hairdresser", "hairdressers", "kapper", "kappers", "barber", "barbers", "hair salon"],
  construction: ["construction", "builder", "builders", "bouwbedrijf", "bouwbedrijven", "aannemer", "aannemers"],
  plumber: ["plumber", "plumbers", "loodgieter", "loodgieters"],
  electrician: ["electrician", "electricians", "elektricien", "elektriciens"],
  car_repair: ["garage", "garages", "car repair", "autogarage", "mechanic", "mechanics"],
  real_estate: ["real estate", "estate agent", "estate agents", "makelaar", "makelaars", "realtor"],
  cleaning: ["cleaning", "cleaner", "cleaners", "schoonmaak", "schoonmaakbedrijf"],
  beauty_salon: ["beauty salon", "beauty salons", "schoonheidssalon", "nail salon", "beauty"],
  gym: ["gym", "gyms", "sportschool", "fitness"],
  hotel: ["hotel", "hotels", "b&b", "bed and breakfast"],
};

const STEP_PHRASE: Record<string, string> = {
  research: "research them",
  contacts: "find contact details",
  generate_website: "build a website",
  qc: "test it",
  deploy: "put a preview online",
  sales_email: "draft an email",
  notify: "notify you",
};

/** Deterministic objective parser — used when Claude is not configured, and as a sanity baseline. */
export function parseObjectiveHeuristically(objective: string): RunPlan {
  const text = objective.toLowerCase();
  let category = "local_service";
  let best = 0;
  for (const [key, words] of Object.entries(CATEGORY_WORDS)) {
    for (const w of words) {
      if (text.includes(w) && w.length > best) {
        category = key;
        best = w.length;
      }
    }
  }
  const cityMatch = objective.match(/\b(?:in|te|rond|around|near)\s+([A-Z][\p{L}'-]+(?:[ -][A-Z][\p{L}'-]+)?)/u);
  const city = cityMatch?.[1] ?? "Rotterdam";
  const countryMatch = objective.match(/\b(Netherlands|Nederland|Belgium|België|Germany|Duitsland)\b/i);
  const country = countryMatch ? ({ nederland: "Netherlands", belgië: "Belgium", duitsland: "Germany" } as Record<string, string>)[countryMatch[1].toLowerCase()] ?? countryMatch[1] : "Netherlands";
  const numbers = [...objective.matchAll(/\b(\d{1,3})\b/g)].map((m) => Number(m[1]));
  const limit = Math.min(200, Math.max(1, numbers[0] ?? 20));
  const topMatch = objective.match(/(?:for|voor)\s+(?:the\s+|de\s+)?(\d{1,3})\s+(?:best|beste|top)/i) ?? objective.match(/top\s+(\d{1,3})/i);
  const topN = Math.min(limit, topMatch ? Number(topMatch[1]) : Math.min(limit, 10));
  const minScore = /outdated|verouderd|no website|geen website|bad website/.test(text) ? 50 : 40;

  const actions: RunPlan["actions"] = [];
  // "without a website" / "outdated websites" describe the target, not a request to build one.
  const wantsWebsites = /\b(build|create|generate|make|design|maak|bouw|ontwerp|genereer)\b[^.]{0,60}\b(websites?|sites?|previews?|concepts?)\b/.test(text) || /\bpreviews?\b/.test(text);
  if (/research|onderzo|analy/.test(text) || wantsWebsites) actions.push("research");
  if (/email|mail|contact|outreach|sales/.test(text)) actions.push("contacts");
  if (wantsWebsites) actions.push("generate_website", "qc", "deploy");
  if (/email|mail|outreach|sales|offer|offerte/.test(text)) actions.push("sales_email");
  const websiteStatus = /no website|without (a )?website|geen website/.test(text) ? "no_website" : "any";

  return planSchema.parse({
    summary: `Find ${limit} ${BUSINESS_CATEGORIES.find((c) => c.key === category)?.label.toLowerCase() ?? category} in ${city}${actions.length ? `, then ${actions.map((a) => STEP_PHRASE[a] ?? a).join(", ")} for the best ${topN}` : ""}.`,
    discovery: { country, city, category, radiusKm: 10, limit, minScore, keywords: "", businessName: "", websiteStatus },
    topN,
    actions,
  });
}

export async function planObjective(organizationId: string, objective: string): Promise<{ plan: RunPlan; source: "claude" | "heuristic" }> {
  const mode = await integrationMode(organizationId, "anthropic");
  if (mode !== "live") return { plan: parseObjectiveHeuristically(objective), source: "heuristic" };
  const res = await claudeStructured({
    ctx: { organizationId, agentKey: undefined },
    operation: "plan_objective",
    schema: planSchema,
    effort: "low",
    maxTokens: 4000,
    system: `You are the orchestrator of an AI website agency. Convert the operator's objective into an execution plan.
- discovery.category must be one of: ${BUSINESS_CATEGORIES.map((c) => c.key).join(", ")}.
- discovery.limit = how many businesses to discover (max 200). topN = how many of the best prospects get the follow-up actions.
- actions (ordered, subset of): research, contacts, generate_website, qc, deploy, sales_email, notify. Website generation implies research first and qc + deploy after. Emails imply contacts and a deployed preview.
- minScore: 0-100 lead score threshold (use 50-70 when the operator wants outdated/no websites, else 40).
- Never plan to send emails: sales_email only drafts emails for human approval.
- summary: one plain sentence describing the plan.`,
    prompt: objective.slice(0, 2000),
  });
  return { plan: res.data, source: "claude" };
}
