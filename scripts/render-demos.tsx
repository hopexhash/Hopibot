// Renders the live demo designs shown in the portfolio of the public website to
// public/site/demo/<key>.html. They are fictional businesses with obviously fictional
// contact details; each page carries the demonstration notice and is never indexed.
//   npx tsx scripts/render-demos.tsx
import { mkdirSync, writeFileSync } from "node:fs";
import { buildBlueprintSpec } from "../src/lib/site-blueprints";
import { DIRECTION_KEYS, finalizeIdentity, fingerprintOf, presetIdentity, seedOf, type Fingerprint } from "../src/sites/identity";
import { renderSite } from "../src/sites/render";

mkdirSync("public/site/demo", { recursive: true });
// Order matters: every design steers away from the ones before it. `key` = published file.
const CASES: [design: string, name: string, statement: string, key: string | null][] = [
  ["barbershop", "Barbershop The Gents", "Een goede knipbeurt begint met *luisteren*.", "barbershop-the-gents"],
  ["garage", "Garage Jansen", "Eerlijk advies, *vaste prijzen* en uw auto dezelfde dag terug.", "garage-jansen"],
  ["luxury-restaurant", "Restaurant De Gouden Lepel", "Seizoenen op het bord, *rust* aan tafel.", "de-gouden-lepel"],
  ["coffee-shop", "Koffiebar Noord", "Koffie van branders die we *bij naam* kennen.", "koffiebar-noord"],
  ["construction", "Bouwbedrijf De Vries", "We bouwen wat we beloven, *op de afgesproken dag*.", "bouwbedrijf-de-vries"],
  ["beauty-salon", "Beauty by Noor", "Tijd voor uzelf, *zonder haast*.", "beauty-by-noor"],
  ["cleaning", "Schoon & Fris", "Een schone zaak is *uw visitekaartje*.", null],
  ["burger", "Burger Brothers", "Vers gesmasht, *nooit uit de vriezer*.", null],
  ["landscaping", "Hoveniers Groenrijk", "Een tuin die *met u meegroeit*.", null],
  ["clinic", "Tandartspraktijk Centrum", "Zorg die begint met *uitleg*.", "tandartspraktijk-centrum"],
  ["local-service", "Loodgieter Bakker", "Binnen het uur *iemand aan de lijn*.", "loodgieter-bakker"],
  ["estate", "Makelaardij Maas", "Uw huis verkocht door iemand die *de straat kent*.", "makelaardij-maas"],
];
const recent: Fingerprint[] = [];
let n = 0;
for (const [i, [design, name, statement, key]] of CASES.entries()) {
  const direction = DIRECTION_KEYS[i % DIRECTION_KEYS.length];
  const spec = buildBlueprintSpec({ name, category: "local_service", city: "Zaandam", country: "Netherlands", phone: "075 000 00 00", address: "Voorbeeldstraat 1, 1500 AA Zaandam", openingHours: ["Maandag: Gesloten", "Dinsdag – Vrijdag: 09:00 – 18:00", "Zaterdag: 09:00 – 17:00"], googleMapsUrl: null }, design, 0);
  const seed = seedOf(name);
  const identity = finalizeIdentity(presetIdentity(direction, seed, i % 3 === 0 ? design : "plain", recent, { photos: false }), seed, recent, { photos: false, category: design });
  recent.unshift(fingerprintOf(identity, design));
  if (!key) continue;
  spec.theme.identity = identity;
  spec.sections.splice(1, 0, { type: "statement", id: "visie", title: statement, note: "" });
  const out = renderSite(spec, { agencyName: "HOPI", seedKey: design, assetBase: "/site-assets/" });
  // Fictional businesses: no dialable numbers and no outbound links.
  const html = out[0].content.replace(/href="tel:[^"]*"/g, 'href="#contact"').replace(/href="https?:\/\/(maps|www\.google)[^"]*"/g, 'href="#contact"');
  writeFileSync(`public/site/demo/${key}.html`, html);
  n++;
}
console.log(`rendered ${n} demo designs`);
