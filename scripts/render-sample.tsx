// Dev utility: renders every template with sample data to ./.samples for visual review.
import { mkdirSync, writeFileSync } from "node:fs";
import { BUSINESS_CATEGORIES } from "../src/lib/constants";
import { renderSite } from "../src/sites/render";
import { buildMockSpec } from "../src/server/website/mock-spec";

mkdirSync(".samples", { recursive: true });
const seen = new Set<string>();
for (const c of BUSINESS_CATEGORIES) {
  if (seen.has(c.template)) continue;
  seen.add(c.template);
  const spec = buildMockSpec({
    name: `Voorbeeld ${c.label.replace(/s$/, "")}`,
    category: c.key,
    city: "Rotterdam",
    phone: "+31 10 123 4567",
    address: "Witte de Withstraat 1, 3012 BL Rotterdam",
    openingHours: ["Maandag: 10:00 – 18:00", "Dinsdag: 10:00 – 18:00", "Zondag: Gesloten"],
    googleMapsUrl: "https://maps.google.com/?q=Rotterdam",
  });
  const files = renderSite(spec, { agencyName: "Sample Agency", seedKey: c.template, assetBase: "../public/site-assets/" });
  writeFileSync(`.samples/${c.template}.html`, files[0].content);
  console.log(`rendered ${c.template} (${(files[0].content.length / 1024).toFixed(0)} KB)`);
}
