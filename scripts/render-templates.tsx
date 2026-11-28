// Build step: renders one sample build per template into public/site-assets/templates/
// for the template library (static files: no server rendering, cacheable). The templates are
// the demo designs; the sample is a page for an example business, without photographs.
import { mkdirSync, writeFileSync } from "node:fs";
import { buildBlueprintSpec } from "../src/lib/site-blueprints";
import { FAMILY_DESIGNS } from "../src/sites/designs";
import { FAMILIES } from "../src/sites/families";
import { colorwayCount } from "../src/sites/colorways";
import { renderSite } from "../src/sites/render";
import { SAMPLES } from "./render-family";

const OUT = "public/site-assets/templates";
mkdirSync(OUT, { recursive: true });
const live = FAMILY_DESIGNS.filter((d) => FAMILIES[d.key]);
let n = 0;
for (const d of live) {
  const [name, category] = SAMPLES[d.key].all;
  // One sample per look: the original colours (<key>.html) and each colourway (<key>-<n>.html).
  for (let variation = 0; variation < colorwayCount(d.key); variation++) {
    const spec = buildBlueprintSpec({ name, category, city: "Rotterdam", phone: null, address: null, openingHours: null, googleMapsUrl: null }, d.key);
    spec.theme.variation = variation;
    const [index] = renderSite(spec, { agencyName: "HOPI", seedKey: d.key, assetBase: "/site-assets/" });
    writeFileSync(`${OUT}/${d.key}${variation ? `-${variation}` : ""}.html`, index.content);
    n++;
  }
}
console.log(`Rendered ${n} template previews to ${OUT}`);
