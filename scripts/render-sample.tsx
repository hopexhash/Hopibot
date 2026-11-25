// Dev utility: renders every design with sample data to ./.samples for visual review.
import { mkdirSync, writeFileSync } from "node:fs";
import { buildBlueprintSpec } from "../src/lib/site-blueprints";
import { DESIGNS } from "../src/sites/designs";
import { renderSite } from "../src/sites/render";

mkdirSync(".samples", { recursive: true });
const NAMES: Record<string, string> = {
  "luxury-restaurant": "Restaurant De Gouden Lepel", "modern-italian": "Osteria Bella Vita", "turkish-restaurant": "Anadolu Sofrası", sushi: "Sushi Hana",
  burger: "Burger Brothers", pizzeria: "Pizzeria Da Marco", "coffee-shop": "Koffiebar Noord", bakery: "Bakkerij Van Dijk", "street-food": "Wok This Way",
  "fine-dining": "Restaurant Vermeer", "asian-fusion": "Umami House", "food-truck": "De Rollende Keuken", barbershop: "Barbershop The Gents",
  "hair-salon": "Salon Elise", "beauty-salon": "Beauty by Noor", "car-detailing": "Shine Detailing", garage: "Garage Jansen", construction: "Bouwbedrijf De Vries",
  cleaning: "Schoon & Fris", landscaping: "Hoveniers Groenrijk", clinic: "Tandartspraktijk Centrum", estate: "Makelaardij Maas", studio: "Studio Fit", "local-service": "Loodgieter Bakker",
};
const only = process.argv[2];
for (const d of DESIGNS) {
  if (only && d.key !== only) continue;
  const spec = buildBlueprintSpec(
    {
      name: NAMES[d.key] ?? d.name,
      category: "local_service",
      city: "Rotterdam",
      phone: "+31 10 123 4567",
      address: "Witte de Withstraat 1, 3012 BL Rotterdam",
      openingHours: ["Maandag: Gesloten", "Dinsdag – Vrijdag: 10:00 – 22:00", "Zaterdag: 10:00 – 23:00", "Zondag: 12:00 – 21:00"],
      googleMapsUrl: "https://maps.google.com/?q=Rotterdam",
    },
    d.key,
  );
  const files = renderSite(spec, { agencyName: "Sample Agency", seedKey: d.key, assetBase: "../public/site-assets/" });
  writeFileSync(`.samples/${d.key}.html`, files[0].content);
  console.log(`rendered ${d.key} (${(files[0].content.length / 1024).toFixed(0)} KB)`);
}
