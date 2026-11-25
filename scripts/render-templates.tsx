// Build step: renders one live sample per design into public/site-assets/templates/
// for the template library (static files: no server rendering, cacheable).
import { mkdirSync, writeFileSync } from "node:fs";
import { buildBlueprintSpec } from "../src/lib/site-blueprints";
import { DESIGNS } from "../src/sites/designs";
import { renderSite } from "../src/sites/render";

const OUT = "public/site-assets/templates";
mkdirSync(OUT, { recursive: true });
for (const d of DESIGNS) {
  const spec = buildBlueprintSpec({ name: `Voorbeeld ${d.name}`, category: "local_service", city: "Rotterdam", phone: null, address: null, openingHours: null, googleMapsUrl: null }, d.key);
  const [index] = renderSite(spec, { agencyName: "HOPI Bot", seedKey: d.key, assetBase: "/site-assets/" });
  writeFileSync(`${OUT}/${d.key}.html`, index.content);
}
console.log(`Rendered ${DESIGNS.length} template previews to ${OUT}`);
