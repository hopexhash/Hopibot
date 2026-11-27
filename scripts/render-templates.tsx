// Build step: renders one sample build per template into public/site-assets/templates/
// for the template library (static files: no server rendering, cacheable). The templates are
// the demo designs; the sample is a page for an example business, without photographs.
import { mkdirSync, writeFileSync } from "node:fs";
import { buildBlueprintSpec } from "../src/lib/site-blueprints";
import { FAMILY_DESIGNS } from "../src/sites/designs";
import { FAMILIES } from "../src/sites/families";
import { renderSite } from "../src/sites/render";
import { SAMPLES } from "./render-family";

const OUT = "public/site-assets/templates";
mkdirSync(OUT, { recursive: true });
const live = FAMILY_DESIGNS.filter((d) => FAMILIES[d.key]);
for (const d of live) {
  const [name, category] = SAMPLES[d.key].all;
  const spec = buildBlueprintSpec({ name, category, city: "Rotterdam", phone: null, address: null, openingHours: null, googleMapsUrl: null }, d.key);
  const [index] = renderSite(spec, { agencyName: "HOPI Bot", seedKey: d.key, assetBase: "/site-assets/" });
  writeFileSync(`${OUT}/${d.key}.html`, index.content);
}
console.log(`Rendered ${live.length} template previews to ${OUT}`);
