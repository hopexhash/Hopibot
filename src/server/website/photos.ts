import "../guard";
import type { SiteSpec } from "@/lib/site-spec";
import type { ArtScene } from "@/sites/designs";
import { hashString } from "@/sites/art";
import { searchPhotos, type StockPhoto } from "../integrations/pexels";

/**
 * Art direction per industry: what to search for in each image slot. Queries describe a
 * mood and subject (dark, moody, close-up…) so the photos match the design's atmosphere.
 */
const DIRECTION: Record<ArtScene, { hero: string; about: string; gallery: string; detail: string }> = {
  finedining: { hero: "fine dining restaurant interior candlelight dark", about: "chef plating dish dark kitchen", gallery: "fine dining plated dish dark background", detail: "wine glass restaurant table dark" },
  italian: { hero: "italian restaurant table pasta rustic", about: "chef making fresh pasta hands flour", gallery: "italian food pasta dish overhead", detail: "tomato basil olive oil rustic" },
  mezze: { hero: "turkish restaurant mezze table spread", about: "charcoal grill kebab skewers", gallery: "turkish food mezze dishes overhead", detail: "turkish tea glass baklava" },
  sushi: { hero: "sushi platter dark slate minimal", about: "sushi chef hands knife preparing", gallery: "sushi nigiri maki close up dark", detail: "japanese restaurant interior minimal wood" },
  burger: { hero: "gourmet burger close up dark background", about: "burger grill flames kitchen", gallery: "burger fries close up", detail: "loaded fries street food" },
  pizza: { hero: "wood fired pizza oven flames", about: "pizzaiolo stretching pizza dough", gallery: "neapolitan pizza overhead rustic table", detail: "pizza ingredients tomato mozzarella basil" },
  coffee: { hero: "coffee shop interior cozy warm light", about: "barista pouring latte art", gallery: "coffee cup pastry cafe table", detail: "coffee beans roasting close up" },
  bakery: { hero: "artisan bakery croissants pastry display", about: "baker hands kneading dough flour", gallery: "pastries cakes bakery close up", detail: "sourdough bread loaves rustic" },
  street: { hero: "street food night market neon", about: "street food chef cooking wok flames", gallery: "street food tacos bao close up", detail: "food stall night lights" },
  fusion: { hero: "asian fusion restaurant dark moody interior", about: "chef cooking wok asian kitchen", gallery: "ramen dumplings asian food dark", detail: "cocktail bar dark neon" },
  truck: { hero: "food truck festival sunny", about: "food truck serving customers", gallery: "street food serving festival", detail: "food truck window menu" },
  barber: { hero: "barbershop interior vintage dark leather chairs", about: "barber cutting hair client close up", gallery: "men haircut fade barber", detail: "barber tools razor scissors dark" },
  hair: { hero: "hair salon interior modern bright elegant", about: "hairdresser styling woman hair salon", gallery: "woman hairstyle salon portrait", detail: "hair salon products shelf" },
  beauty: { hero: "beauty salon spa treatment room soft light", about: "facial treatment beauty salon", gallery: "manicure nails beauty treatment", detail: "skincare products flowers soft pink" },
  detailing: { hero: "black sports car dark garage studio light", about: "car detailing polishing paint", gallery: "car detailing foam wash close up", detail: "car interior leather clean detail" },
  garage: { hero: "auto repair garage workshop car lift", about: "mechanic working on car engine", gallery: "car mechanic workshop tools", detail: "car tyre wheel workshop" },
  construction: { hero: "construction site modern house building", about: "construction workers building site", gallery: "modern house renovation exterior", detail: "architect blueprint tools" },
  cleaning: { hero: "clean bright modern office interior", about: "professional cleaner cleaning window", gallery: "clean modern home interior bright", detail: "cleaning supplies spray cloth" },
  garden: { hero: "landscaped garden design modern terrace", about: "gardener planting garden", gallery: "beautiful garden path plants", detail: "garden plants close up green" },
  dental: { hero: "modern dental clinic bright interior", about: "dentist patient friendly", gallery: "dental practice treatment room", detail: "smile teeth close up" },
  estate: { hero: "modern house exterior dusk", about: "real estate agent handing keys", gallery: "modern home interior living room", detail: "house keys door" },
  corporate: { hero: "modern gym studio interior", about: "personal trainer coaching client", gallery: "fitness training studio", detail: "gym equipment close up" },
  service: { hero: "tradesman working home repair", about: "plumber electrician working tools", gallery: "home repair tools work", detail: "toolbox tools close up" },
};

const cache = new Map<string, { at: number; photos: StockPhoto[] }>();

async function pool(organizationId: string, query: string, orientation: "landscape" | "portrait" | "square") {
  const key = `${organizationId}|${query}|${orientation}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < 6 * 3600_000) return hit.photos;
  const photos = await searchPhotos(organizationId, { query, orientation, count: 30 });
  cache.set(key, { at: Date.now(), photos });
  return photos;
}

/**
 * Fills every image slot of a spec with licensed stock photos that fit the design.
 * Photos already supplied by the business (license "authorised") are never replaced.
 * `seed` makes two businesses on the same design get different photos.
 */
export async function attachStockPhotos(organizationId: string, spec: SiteSpec, scene: ArtScene, seed: string): Promise<{ spec: SiteSpec; added: number }> {
  const dir = DIRECTION[scene] ?? DIRECTION.service;
  const refs = new Set<string>([spec.hero.image, "art:about2", "art:cta", "art:side1", "art:side2"]);
  for (const s of spec.sections) {
    if (s.type === "about") refs.add(s.image);
    if (s.type === "gallery") s.images.forEach((r) => refs.add(r));
    if (s.type === "services") s.items.forEach((_, j) => refs.add(`art:svc${j}`));
    if (s.type === "beforeafter") continue; // before/after must be the business's own photos
  }
  const has = new Set(spec.images.filter((i) => i.license !== "generated").map((i) => i.key));
  const offset = hashString(seed);
  const [hero, about, gallery, detail] = await Promise.all([pool(organizationId, dir.hero, "landscape"), pool(organizationId, dir.about, "portrait"), pool(organizationId, dir.gallery, "square"), pool(organizationId, dir.detail, "landscape")]);
  const used = new Set<number>();
  const pick = (list: StockPhoto[], n: number) => {
    for (let i = 0; i < list.length; i++) {
      const p = list[(offset + n * 7 + i) % list.length];
      if (p && !used.has(p.id)) {
        used.add(p.id);
        return p;
      }
    }
    return null;
  };
  const images = [...spec.images];
  let n = 0;
  for (const ref of refs) {
    if (has.has(ref) || images.length >= 20) continue;
    const source = ref === spec.hero.image || ref === "art:cta" ? hero : ref.startsWith("art:about") || ref.startsWith("art:side") ? about : ref.startsWith("art:svc") ? detail : gallery;
    const p = pick(source.length ? source : gallery, n++);
    if (!p) continue;
    images.push({ key: ref, src: ref === spec.hero.image ? p.src : p.srcSmall, alt: p.alt || "", license: "stock", credit: `${p.photographer} / Pexels` });
  }
  return { spec: { ...spec, images: images.filter((im, i, arr) => arr.findIndex((x) => x.key === im.key && x.license === im.license) === i) }, added: n };
}
