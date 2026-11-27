import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { DESIGNS, getDesign, type Design } from "@/sites/designs";

/**
 * Design selection engine (rule-based, free, deterministic).
 *
 * A site has an INDUSTRY (what kind of business this is: it decides the default content,
 * the structure and the photographs to look for) and a LOOK (one of the demo designs of the
 * portfolio, rendered by a template family).
 * 1. Signals in the business name / research text pick a specialised industry.
 * 2. Otherwise the business category's default industry is used.
 * 3. The look follows from the industry, or from the category when no signal refined it.
 */

const SIGNALS: { design: string; re: RegExp; why: string }[] = [
  { design: "sushi", re: /\b(sushi|sashimi|izakaya|ramen-?ya|japans|japanese)\b/i, why: "Japanese / sushi cuisine" },
  { design: "pizzeria", re: /\b(pizz[ae]r?i?a?|pizza)\b/i, why: "pizza is the core product" },
  { design: "burger", re: /\b(burgers?|smash|hamburger)\b/i, why: "burger concept" },
  { design: "turkish-restaurant", re: /\b(turks|turkish|ocakba[sş][ıi]|kebap|kebab|anadolu|sofras[ıi]|lahmacun|meze)\b/i, why: "Turkish cuisine" },
  { design: "modern-italian", re: /\b(trattoria|osteria|ristorante|italiaans|italian|pasta|cucina)\b/i, why: "Italian cuisine" },
  { design: "food-truck", re: /\b(food ?truck|foodtruck|rollende keuken)\b/i, why: "mobile kitchen" },
  { design: "street-food", re: /\b(street ?food|streetfood|wok|taco|bao|snackbar|cafetaria|grillroom|shoarma|d[öo]ner|takeaway|afhaal)\b/i, why: "fast casual / takeaway" },
  { design: "asian-fusion", re: /\b(fusion|asian|aziatisch|thai|thais|pok[eé]|dim ?sum|korean|koreaans|vietnamees|vietnamese|chinees|chinese)\b/i, why: "Asian kitchen" },
  { design: "bakery", re: /\b(bakker\w*|bakery|patisserie|banket\w*|taart\w*|cake\w*|p[aâ]tissier)\b/i, why: "bakery / patisserie" },
  { design: "coffee-shop", re: /\b(koffie|coffee|espresso|barista|lunchroom|brunch|caf[eé])\b/i, why: "coffee / lunch" },
  { design: "fine-dining", re: /\b(fine dining|michelin|chef\'?s table|gastronom|tasting menu|degustatie)\b/i, why: "fine-dining positioning" },
  { design: "barbershop", re: /\b(barber\w*|barbier\w*|herenkapper\w*|gents)\b/i, why: "barbershop" },
  { design: "car-detailing", re: /\b(detailing|poets\w*|polijst\w*|coating|car ?wash|carwash|autowas\w*)\b/i, why: "detailing services" },
  { design: "landscaping", re: /\b(hovenier\w*|tuin\w*|landscap\w*|garden\w*|groenvoorziening)\b/i, why: "garden / landscaping" },
  { design: "cleaning", re: /\b(schoonmaak\w*|cleaning|glazenwasser\w*|reiniging)\b/i, why: "cleaning services" },
  { design: "beauty-salon", re: /\b(beauty|schoonheid|nagel|nails|lash|wimper|skin|huid|spa)\b/i, why: "beauty treatments" },
];

const FOOD = new Set(DESIGNS.filter((d) => d.group === "food").map((d) => d.key));

export type DesignChoice = { design: Design; reason: string };

/** The demo design each industry is rendered in when a name signal (not the category) decided the industry. */
const LOOK_OF_INDUSTRY: Record<string, string> = {
  "luxury-restaurant": "vesper", "modern-italian": "vesper", "turkish-restaurant": "vesper", sushi: "vesper", burger: "vesper", pizzeria: "vesper",
  "street-food": "vesper", "fine-dining": "vesper", "asian-fusion": "vesper", "food-truck": "vesper", barbershop: "vesper",
  "coffee-shop": "ostara", bakery: "ostara", "hair-salon": "sage", "beauty-salon": "sage", "car-detailing": "obsidian", garage: "obsidian",
  construction: "kade", "local-service": "kade", cleaning: "helder", clinic: "helder", landscaping: "meridiaan", estate: "meridiaan",
};

/** The look of a business: the demo design its website is built in. */
export function selectDesign(b: { category: string; name: string; text?: string | null }): DesignChoice {
  const cat = BUSINESS_CATEGORIES.find((c) => c.key === b.category);
  const industry = selectIndustry(b);
  const refined = industry.design.key !== (cat?.design ?? "local-service");
  const key = (refined && LOOK_OF_INDUSTRY[industry.design.key]) || cat?.family || "kade";
  const design = getDesign(key);
  return { design, reason: `${design.name} design: ${refined ? industry.reason : `the look for ${cat?.label.toLowerCase() ?? "local businesses"}`}` };
}

/** The industry of a business: an entry of the classic library, used for its blueprint and photo direction. */
export function selectIndustry(b: { category: string; name: string; text?: string | null }): DesignChoice {
  const cat = BUSINESS_CATEGORIES.find((c) => c.key === b.category);
  const fallback = getDesign(cat?.design ?? "local-service");
  const haystack = `${b.name} ${b.text ?? ""}`.slice(0, 4000);
  const categoryIsFood = FOOD.has(fallback.key);
  for (const s of SIGNALS) {
    if (!s.re.test(haystack)) continue;
    // A name signal may refine within the same sector, never move a business across sectors
    // (a garage called "Pizza Auto" stays a garage). Generic categories accept any signal.
    const sameSector = FOOD.has(s.design) === categoryIsFood;
    if (sameSector || b.category === "local_service") return { design: getDesign(s.design), reason: `${s.why} detected in the business name or research` };
  }
  return { design: fallback, reason: `default design for ${cat?.label.toLowerCase() ?? "local businesses"}` };
}
