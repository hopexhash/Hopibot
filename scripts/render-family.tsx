// Dev utility: renders the template families (the demo designs) with sample businesses, to
// ./.samples/fam-<key>-<variant>.html, for visual review and for scripts/qc-samples.ts.
//   npx tsx scripts/render-family.tsx [key]
// Variants: "all" has every section type and photographs, "plain" is a typical page of
// another industry on the same family without any photograph.
import { mkdirSync, writeFileSync } from "node:fs";
import { buildBlueprintSpec, type BlueprintBusiness } from "../src/lib/site-blueprints";
import type { SiteSection, SiteSpec } from "../src/lib/site-spec";
import { FAMILY_DESIGNS } from "../src/sites/designs";
import { FAMILIES } from "../src/sites/families";
import { renderSite } from "../src/sites/render";
import { SAMPLE_SITES } from "../src/sites/samples";
import PHOTOS from "./family-sample-photos.json";

const url = (id: string, w = 1920) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;

/** Per family: [business of the "all" sample, its blueprint] and [business of the "plain" sample, its blueprint]. */
export const SAMPLES: Record<string, { all: [string, string, string]; plain: [string, string, string] }> = {
  vesper: { all: ["Restaurant De Gouden Lepel", "restaurant", "luxury-restaurant"], plain: ["Barbershop The Gents", "barbershop", "barbershop"] },
  sage: { all: ["Beauty by Noor", "beauty_salon", "beauty-salon"], plain: ["Salon Elise", "hair_salon", "hair-salon"] },
  kade: { all: ["Bouwbedrijf De Vries", "construction", "construction"], plain: ["Loodgieter Bakker", "plumber", "local-service"] },
  meridiaan: { all: ["Makelaardij Maas", "real_estate", "estate"], plain: ["Hoveniers Groenrijk", "landscaping", "landscaping"] },
  forge: { all: ["Studio Fit Rotterdam", "gym", "studio"], plain: ["Coach Daan Personal Training", "personal_trainer", "studio"] },
  obsidian: { all: ["Shine Detailing", "car_detailing", "car-detailing"], plain: ["Garage Jansen", "car_repair", "garage"] },
  aerden: { all: ["Van den Berg Advocaten", "lawyer", "estate"], plain: ["Administratiekantoor Smit", "accountant", "estate"] },
  lune: { all: ["Atelier Mare", "clothing_store", "studio"], plain: ["Boekhandel De Kade", "shop", "studio"] },
  helder: { all: ["Tandartspraktijk Centrum", "dentist", "clinic"], plain: ["Fysio Noord", "physiotherapist", "clinic"] },
  veldwerk: { all: ["Noordcode", "it_company", "studio"], plain: ["Helder IT Beheer", "it_company", "studio"] },
  ostara: { all: ["Hotel De Linde", "hotel", "fine-dining"], plain: ["Bakkerij Van Dijk", "bakery", "bakery"] },
  antipode: { all: ["Studio Kompas", "marketing_agency", "studio"], plain: ["Fotostudio Licht", "photographer", "studio"] },
  brasa: { all: ["Pizzeria Fuoco", "pizzeria", "pizzeria"], plain: ["Snackbar De Hoek", "street_food", "street-food"] },
  noord: { all: ["Salon Nova", "hair_salon", "hair-salon"], plain: ["Barbier Bram", "barbershop", "barbershop"] },
  ambacht: { all: ["Installatiebedrijf Visser", "plumber", "local-service"], plain: ["Dakwerken Mulder", "roofing", "construction"] },
  zondag: { all: ["Bakkerij Zondag", "bakery", "bakery"], plain: ["Koffiebar Lof", "coffee_shop", "coffee-shop"] },
  velours: { all: ["Barbier Edison", "barbershop", "barbershop"], plain: ["Cocktailbar Mercer", "restaurant", "luxury-restaurant"] },
  pulse: { all: ["Studio Puls", "gym", "studio"], plain: ["Coach Lisa", "personal_trainer", "studio"] },
};

/** Sample photographs of the original templates (they have no demo of their own): borrowed from a demo of the same trade. */
const PHOTO_SET: Record<string, string> = { brasa: "restaurant", noord: "beauty-salon", ambacht: "construction", zondag: "restaurant", velours: "hotel", pulse: "fitness" };

/** `published`: a sample shown on the public site carries no phone number, address or map link. */
const business = (name: string, category: string, published = false): BlueprintBusiness => ({
  name,
  category,
  city: "Rotterdam",
  country: "Netherlands",
  phone: published ? null : "+31 10 123 4567",
  address: published ? null : "Witte de Withstraat 1, 3012 BL Rotterdam",
  openingHours: ["Maandag: Gesloten", "Dinsdag – Vrijdag: 10:00 – 22:00", "Zaterdag: 10:00 – 23:00", "Zondag: 12:00 – 21:00"],
  googleMapsUrl: published ? null : "https://maps.google.com/?q=Rotterdam",
});

/** One example of every section type a blueprint may leave out, so each family is seen complete. */
const EXTRA: SiteSection[] = [
  { type: "statement", id: "visie", title: "Wij geloven dat *aandacht* het verschil maakt, elke dag opnieuw.", note: "Waar wij voor staan" },
  { type: "showcase", id: "sfeer", title: "Kom het *zelf* ervaren", body: "Een indruk van hoe het er bij ons aan toe gaat. Loop gerust binnen of maak een afspraak.", image: "art:show", cta: { label: "Neem contact op", href: "#contact" } },
  { type: "packages", id: "pakketten", title: "Kies wat bij u past", intro: "Drie mogelijkheden, van compact tot compleet.", items: [{ name: "Basis", price: null, unit: "", description: "Voor wie eenvoudig wil beginnen.", features: ["Kennismaking", "Vaste contactpersoon"], featured: false }, { name: "Compleet", price: "€ 95", unit: "per keer", description: "Onze meest gekozen vorm.", features: ["Alles uit Basis", "Uitgebreid advies", "Nazorg"], featured: true }, { name: "Op maat", price: null, unit: "", description: "Samengesteld op uw wensen.", features: ["Persoonlijk voorstel"], featured: false }], note: "Voorbeeldpakketten ter illustratie." },
  { type: "team", id: "team", title: "De mensen achter de naam", intro: "Wie u aan de lijn of aan tafel krijgt.", members: [{ name: "Teamlid 1", role: "Eigenaar", bio: "", image: "art:team0" }, { name: "Teamlid 2", role: "Specialist", bio: "", image: "art:team1" }, { name: "Teamlid 3", role: "Klantcontact", bio: "", image: "art:team2" }] },
  { type: "testimonials", id: "ervaringen", title: "Wat klanten schrijven", items: [{ quote: "Voorbeeldtekst: zo komt een echte, openbare beoordeling in dit ontwerp te staan.", author: "Voorbeeld", source: "Google", sourceUrl: "https://maps.google.com/?q=Rotterdam" }, { quote: "Tweede voorbeeldtekst, om de opmaak met meer dan één beoordeling te tonen.", author: "Voorbeeld", source: "Google", sourceUrl: "https://maps.google.com/?q=Rotterdam" }] },
  { type: "beforeafter", id: "voor-en-na", title: "Voor en na", intro: "Schuif om het verschil te zien.", pairs: [{ before: "art:ba1", after: "art:ba2", caption: "Voorbeeldweergave" }] },
  { type: "gallery", id: "impressie", title: "Een *indruk*", images: ["art:g1", "art:g2", "art:g3", "art:g4", "art:g5", "art:g6"] },
  { type: "process", id: "werkwijze", title: "Zo werken wij", intro: "In vier stappen van eerste contact tot resultaat.", steps: [{ title: "Kennismaken", description: "We bespreken wat u zoekt en wat daarbij komt kijken." }, { title: "Voorstel", description: "U ontvangt een helder voorstel zonder verrassingen." }, { title: "Uitvoering", description: "We gaan aan de slag volgens de afspraken." }, { title: "Nazorg", description: "Na afloop blijven we bereikbaar voor vragen." }] },
  { type: "features", id: "waarom", title: "Waarom mensen voor ons kiezen", intro: "", items: [{ title: "Persoonlijk", description: "U heeft één vast aanspreekpunt.", icon: "user" }, { title: "Duidelijk", description: "Heldere afspraken vooraf.", icon: "check" }, { title: "Dichtbij", description: "Gevestigd in de regio.", icon: "map" }] },
  { type: "faq", id: "vragen", title: "Veelgestelde vragen", items: [{ q: "Moet ik een afspraak maken?", a: "Dat is het handigst. Bel of vul het formulier in, dan plannen we een moment dat u past." }, { q: "Waar kan ik parkeren?", a: "In de directe omgeving is betaald parkeren mogelijk." }, { q: "Kan ik pinnen?", a: "Ja, u kunt bij ons met pin betalen." }] },
  { type: "hours", id: "openingstijden", title: "Openingstijden & locatie", note: "" },
  { type: "order", id: "zo-bestellen", title: "Zo bestelt u", body: "Kies wat u het makkelijkst vindt.", channels: [{ label: "Bel ons", description: "Geef uw bestelling telefonisch door.", href: "tel:+31101234567", icon: "phone" }, { label: "Online", description: "Vul het formulier in.", href: "#contact", icon: "bag" }, { label: "Kom langs", description: "Bekijk de route.", href: "https://maps.google.com/?q=Rotterdam", icon: "map" }] },
];

export function sampleSpec(key: string, variant: "all" | "plain", published = false): SiteSpec {
  const design = FAMILY_DESIGNS.find((d) => d.key === key)!;
  const [name, category, blueprint] = SAMPLES[key][variant];
  const spec = buildBlueprintSpec(business(name, category, published), blueprint, 0);
  spec.theme = { ...spec.theme, design: key, template: design.legacy, mode: design.mode, radius: design.radius, identity: undefined };
  if (variant === "plain") {
    // No photographs; the section types the "all" sample has no room for are shown here.
    const base = spec.sections.filter((s) => s.type !== "gallery" && s.type !== "showcase" && s.type !== "beforeafter");
    const seen = new Set<string>(base.map((s) => s.type));
    const more = EXTRA.filter((s) => ["order", "hours", "faq", "features", "process"].includes(s.type) && !seen.has(s.type));
    const last = base.filter((s) => s.type === "contact");
    spec.sections = [...[...base.filter((s) => s.type !== "contact"), ...more].slice(0, 14 - last.length), ...last];
    return spec;
  }
  // Every section type once, contact last. A published sample leaves out what would read as
  // invented facts: example reviews, an example team and example prices.
  const have = new Set(spec.sections.map((s) => s.type));
  const contact = spec.sections.filter((s) => s.type === "contact");
  spec.sections = [...[...spec.sections.filter((s) => s.type !== "contact"), ...EXTRA.filter((s) => !have.has(s.type))].slice(0, 14 - contact.length), ...contact];
  if (published) spec.sections = spec.sections.filter((s) => !["testimonials", "team", "packages", "beforeafter"].includes(s.type));
  // Photographs: the ones of the family's own demo, from Unsplash.
  const ids = Object.entries((PHOTOS as Record<string, Record<string, string>>)[PHOTO_SET[key] ?? design.demo!]);
  const refs = new Set<string>([spec.hero.image, "art:about2", "art:cta", "art:side1", "art:side2"]);
  for (const s of spec.sections) {
    if (s.type === "about" || s.type === "showcase") refs.add(s.image);
    if (s.type === "gallery") s.images.forEach((r) => refs.add(r));
    if (s.type === "services") s.items.forEach((_, j) => refs.add(`art:svc${j}`));
    if (s.type === "team") s.members.forEach((m) => refs.add(m.image));
    if (s.type === "beforeafter") s.pairs.forEach((p) => (refs.add(p.before), refs.add(p.after)));
  }
  spec.images = [...refs].slice(0, 20).map((ref, n) => {
    const [label, id] = ids[n % ids.length];
    return { key: ref, src: url(id, ref === spec.hero.image ? 1920 : 1100), alt: `Voorbeeldfoto: ${label.replace(/-/g, " ")}`, license: "stock" as const, credit: "Unsplash" };
  });
  return spec;
}

async function main() {
  mkdirSync(".samples", { recursive: true });
  const only = process.argv[2];
  // A family that is still being built is not in the registry yet: load its file directly.
  if (only && !FAMILIES[only]) FAMILIES[only] = ((await import(`../src/sites/families/${only}`)) as Record<string, (typeof FAMILIES)[string]>)[only];
  for (const d of FAMILY_DESIGNS) {
    if ((only && d.key !== only) || !FAMILIES[d.key]) continue;
    for (const variant of ["all", "plain"] as const) {
      const out = renderSite(sampleSpec(d.key, variant), { agencyName: "HOPI", seedKey: `${d.key}-${variant}`, assetBase: "../public/site-assets/" });
      writeFileSync(`.samples/fam-${d.key}-${variant}.html`, out[0].content);
      console.log(`.samples/fam-${d.key}-${variant}.html  ${Math.round(out[0].content.length / 1024)} kB`);
    }
    // The family's own complete demo, when it has one.
    if (SAMPLE_SITES[d.key]) {
      const out = renderSite(SAMPLE_SITES[d.key], { agencyName: "HOPI", seedKey: d.key, assetBase: "../public/site-assets/" });
      writeFileSync(`.samples/fam-${d.key}-demo.html`, out[0].content);
      console.log(`.samples/fam-${d.key}-demo.html  ${Math.round(out[0].content.length / 1024)} kB`);
    }
  }
}

if (process.argv[1]?.endsWith("render-family.tsx")) void main();
