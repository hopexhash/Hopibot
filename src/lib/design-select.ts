import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { DESIGNS, getDesign, type Design } from "@/sites/designs";
import { colorwayCount, colorwayName } from "@/sites/colorways";

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
  "luxury-restaurant": "vesper", "modern-italian": "vesper", "turkish-restaurant": "vesper", sushi: "vesper", burger: "brasa", pizzeria: "brasa",
  "street-food": "brasa", "fine-dining": "vesper", "asian-fusion": "vesper", "food-truck": "brasa", barbershop: "vesper",
  "coffee-shop": "zondag", bakery: "zondag", "hair-salon": "sage", "beauty-salon": "sage", "car-detailing": "obsidian", garage: "obsidian",
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

/**
 * Every design that suits a business category, best fit first. The first one is the look the
 * category had when it had only one; the others are the designs a second, third... business of
 * the same kind gets, so neighbours never receive the same website.
 */
export const LOOKS_OF_CATEGORY: Record<string, string[]> = {
  restaurant: ["vesper", "ostara", "brasa", "velours", "lune", "meridiaan"],
  italian_restaurant: ["vesper", "brasa", "ostara", "lune"],
  turkish_restaurant: ["vesper", "brasa", "ostara", "meridiaan"],
  sushi_restaurant: ["vesper", "lune", "noord", "obsidian"],
  burger_restaurant: ["brasa", "vesper", "antipode", "forge"],
  pizzeria: ["brasa", "vesper", "ostara", "antipode"],
  coffee_shop: ["zondag", "ostara", "sage", "lune", "helder"],
  bakery: ["zondag", "ostara", "sage", "lune", "helder"],
  street_food: ["brasa", "vesper", "antipode", "forge"],
  asian_restaurant: ["vesper", "brasa", "lune", "antipode"],
  food_truck: ["brasa", "antipode", "vesper", "forge"],
  barbershop: ["vesper", "velours", "noord", "forge", "obsidian", "antipode"],
  hair_salon: ["sage", "noord", "lune", "helder", "ostara"],
  beauty_salon: ["sage", "noord", "lune", "helder", "ostara"],
  beauty_clinic: ["sage", "noord", "velours", "helder", "lune"],
  car_detailing: ["obsidian", "forge", "ambacht", "kade"],
  car_repair: ["obsidian", "ambacht", "kade", "forge"],
  car_dealer: ["obsidian", "meridiaan", "forge"],
  construction: ["kade", "ambacht", "meridiaan", "aerden", "forge"],
  roofing: ["kade", "ambacht", "meridiaan", "forge"],
  plumber: ["ambacht", "kade", "helder", "meridiaan"],
  electrician: ["ambacht", "kade", "helder", "veldwerk"],
  local_service: ["kade", "ambacht", "helder", "meridiaan"],
  cleaning: ["helder", "ambacht", "kade", "sage"],
  landscaping: ["meridiaan", "ambacht", "kade", "sage"],
  dentist: ["helder", "noord", "sage", "aerden"],
  physiotherapist: ["helder", "noord", "sage", "pulse", "forge"],
  real_estate: ["meridiaan", "aerden", "lune"],
  interior_designer: ["meridiaan", "lune", "sage"],
  gym: ["forge", "pulse", "antipode", "obsidian"],
  personal_trainer: ["forge", "pulse", "antipode", "noord", "helder"],
  hotel: ["ostara", "vesper", "velours", "meridiaan"],
  lawyer: ["aerden", "meridiaan", "veldwerk"],
  accountant: ["aerden", "veldwerk", "meridiaan"],
  consultant: ["aerden", "veldwerk", "meridiaan"],
  marketing_agency: ["antipode", "veldwerk", "lune"],
  photographer: ["antipode", "lune", "vesper"],
  event_business: ["antipode", "ostara", "velours", "pulse", "zondag", "lune"],
  it_company: ["veldwerk", "antipode", "aerden"],
  tattoo_studio: ["forge", "velours", "noord", "antipode", "vesper"],
  clothing_store: ["lune", "noord", "antipode", "sage", "zondag"],
  shop: ["lune", "zondag", "antipode", "sage"],
};

/** The same, for an industry that a signal in the name refined (a "Sushi" place in the restaurant category). */
const LOOKS_OF_INDUSTRY: Record<string, string[]> = {
  sushi: LOOKS_OF_CATEGORY.sushi_restaurant,
  pizzeria: LOOKS_OF_CATEGORY.pizzeria,
  burger: LOOKS_OF_CATEGORY.burger_restaurant,
  "turkish-restaurant": LOOKS_OF_CATEGORY.turkish_restaurant,
  "modern-italian": LOOKS_OF_CATEGORY.italian_restaurant,
  "food-truck": LOOKS_OF_CATEGORY.food_truck,
  "street-food": LOOKS_OF_CATEGORY.street_food,
  "asian-fusion": LOOKS_OF_CATEGORY.asian_restaurant,
  "fine-dining": ["vesper", "ostara", "lune"],
  bakery: LOOKS_OF_CATEGORY.bakery,
  "coffee-shop": LOOKS_OF_CATEGORY.coffee_shop,
  barbershop: LOOKS_OF_CATEGORY.barbershop,
  "car-detailing": LOOKS_OF_CATEGORY.car_detailing,
  landscaping: LOOKS_OF_CATEGORY.landscaping,
  cleaning: LOOKS_OF_CATEGORY.cleaning,
  "beauty-salon": LOOKS_OF_CATEGORY.beauty_salon,
};

/** A look: one of the demo designs, in its original colours (variation 0) or one of its colourways. */
export type Look = { family: string; variation: number };
/** A look already given to another business, with what makes it a neighbour. */
export type UsedLook = Look & { category: string; city: string | null };
export type LookChoice = { design: Design; variation: number; reason: string };

const norm = (city: string | null | undefined) => (city ?? "").trim().toLowerCase();
function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** The designs a business could get, best fit first. */
export function looksFor(b: { category: string; name: string; text?: string | null }): string[] {
  const cat = BUSINESS_CATEGORIES.find((c) => c.key === b.category);
  const industry = selectIndustry(b);
  const refined = industry.design.key !== (cat?.design ?? "local-service");
  const primary = selectDesign(b).design.key;
  const list = (refined && LOOKS_OF_INDUSTRY[industry.design.key]) || LOOKS_OF_CATEGORY[b.category] || [];
  return [primary, ...list.filter((k) => k !== primary)];
}

/**
 * The look for a new website: the best-fitting design and colours that no business of the same
 * kind has yet, nearby first. A business with no neighbours gets the original of its best design
 * (what it always got); the second one in the same category gets another design or colourway,
 * and so on. Deterministic: the same history and the same business give the same look.
 */
export function selectLook(b: { category: string; name: string; city?: string | null; text?: string | null }, used: UsedLook[]): LookChoice {
  const families = looksFor(b);
  const city = norm(b.city);
  const peers = used.filter((u) => u.category === b.category);
  let best: { family: string; variation: number; score: number; tie: number } | null = null;
  families.forEach((family, rank) => {
    for (let variation = 0; variation < colorwayCount(family); variation++) {
      let score = rank * 3 + variation;
      for (const u of peers) {
        const near = Boolean(city) && norm(u.city) === city;
        if (u.family === family && u.variation === variation) score += near ? 1000 : 100;
        else if (u.family === family) score += near ? 30 : 8;
      }
      const tie = hash(`${b.name}:${family}:${variation}`);
      if (!best || score < best.score || (score === best.score && tie < best.tie)) best = { family, variation, score, tie };
    }
  });
  const pick = best as { family: string; variation: number; score: number } | null;
  const design = getDesign(pick?.family ?? families[0] ?? "kade");
  const variation = pick?.variation ?? 0;
  const sameKind = peers.length;
  const colours = colorwayName(design.key, variation);
  const reason = sameKind
    ? `${design.name} design in ${colours.toLowerCase() === "original" ? "its original colours" : `the ${colours} colourway`}: ${sameKind} other ${sameKind === 1 ? "business" : "businesses"} of this kind already have a website, so this one gets a look none of them has${city ? `, least of all in ${b.city}` : ""}`
    : `${design.name} design: the best fit for this kind of business`;
  return { design, variation, reason };
}
