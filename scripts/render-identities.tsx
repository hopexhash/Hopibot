// Dev utility: renders sample sites with per-business brand identities (one per direction),
// once with photographs and once typography-led, to ./.samples/id-*.html for visual review.
import { mkdirSync, writeFileSync } from "node:fs";
import { buildBlueprintSpec } from "../src/lib/site-blueprints";
import { DIRECTION_KEYS, finalizeIdentity, fingerprintOf, presetIdentity, seedOf, type Fingerprint } from "../src/sites/identity";
import { renderSite } from "../src/sites/render";

mkdirSync(".samples", { recursive: true });
const CASES: [design: string, name: string, statement: string][] = [
  ["barbershop", "Barbershop The Gents", "Een goede knipbeurt begint met *luisteren*."],
  ["garage", "Garage Jansen", "Eerlijk advies, *vaste prijzen* en uw auto dezelfde dag terug."],
  ["luxury-restaurant", "Restaurant De Gouden Lepel", "Seizoenen op het bord, *rust* aan tafel."],
  ["coffee-shop", "Koffiebar Noord", "Koffie van branders die we *bij naam* kennen."],
  ["construction", "Bouwbedrijf De Vries", "We bouwen wat we beloven, *op de afgesproken dag*."],
  ["beauty-salon", "Beauty by Noor", "Tijd voor uzelf, *zonder haast*."],
  ["cleaning", "Schoon & Fris", "Een schone zaak is *uw visitekaartje*."],
  ["burger", "Burger Brothers", "Vers gesmasht, *nooit uit de vriezer*."],
  ["landscaping", "Hoveniers Groenrijk", "Een tuin die *met u meegroeit*."],
  ["clinic", "Tandartspraktijk Centrum", "Zorg die begint met *uitleg*."],
  ["local-service", "Loodgieter Bakker", "Binnen het uur *iemand aan de lijn*."],
  ["estate", "Makelaardij Maas", "Uw huis verkocht door iemand die *de straat kent*."],
  ["hair-salon", "Salon Elise", "Kleur die past bij *wie u bent*."],
  ["studio", "Studio Fit", "Trainen in kleine groepen, *met aandacht*."],
  ["pizzeria", "Pizzeria Da Marco", "Deeg dat *48 uur* de tijd krijgt."],
  ["luxury-restaurant", "Café-Restaurant Amsterdam", "Eten en drinken in het *Machinepompgebouw*."],
];
const photoMode = process.argv.includes("--photos");
const recent: Fingerprint[] = [];
let n = 0;
for (const [i, [design, name, statement]] of CASES.entries()) {
  const direction = DIRECTION_KEYS[i % DIRECTION_KEYS.length];
  const spec = buildBlueprintSpec({ name, category: "local_service", city: "Zaandam", country: "Netherlands", phone: "+31 75 123 4567", address: "Westzijde 12, 1506 EE Zaandam", openingHours: ["Maandag: Gesloten", "Dinsdag – Vrijdag: 09:00 – 18:00", "Zaterdag: 09:00 – 17:00"], googleMapsUrl: "https://maps.google.com/?q=Zaandam" }, design, 0);
  const seed = seedOf(name);
  const identity = finalizeIdentity(presetIdentity(direction, seed, i % 3 === 0 ? design : "plain", recent, { photos: photoMode }), seed, recent, { photos: photoMode, category: design });
  if (name.startsWith("Café-Restaurant")) Object.assign(identity.layout, { hero: "wordmark", gallery: "scroller", button: "hard", nav: "block" });
  recent.unshift(fingerprintOf(identity, design));
  spec.theme.identity = identity;
  spec.sections.splice(1, 0, { type: "statement", id: "visie", title: statement, note: "" });
  if (photoMode) {
    const refs = new Set<string>([spec.hero.image, "art:about2", "art:cta", "art:side1", "art:side2", "art:show"]);
    for (const s of spec.sections) {
      if (s.type === "about") refs.add(s.image);
      if (s.type === "gallery") s.images.forEach((r) => refs.add(r));
      if (s.type === "services") s.items.forEach((_, j) => refs.add(`art:svc${j}`));
    }
    let k = 0;
    spec.images = [...refs].slice(0, 20).map((key) => ({ key, src: `https://img.test/${k++ % 14}.jpg`, alt: "Sample photograph", license: "stock" as const, credit: "Sample" }));
    spec.sections.splice(3, 0, { type: "showcase", id: "sfeer", title: "Kom langs en *ervaar het zelf*", body: "Een korte regel over de sfeer van de zaak.", image: "art:show", cta: null });
  }
  const out = renderSite(spec, { agencyName: "Sample Agency", seedKey: design, assetBase: "../public/site-assets/" });
  const html = out[0].content.replaceAll("https://img.test/", process.env.PHOTO_DIR ?? "photos/");
  writeFileSync(`.samples/id-${photoMode ? "p" : "t"}-${String(i).padStart(2, "0")}-${direction}.html`, html);
  n++;
}
console.log(`rendered ${n} identity samples (${photoMode ? "photographic" : "typography-led"})`);
