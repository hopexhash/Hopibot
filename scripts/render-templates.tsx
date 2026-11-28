// Build step: renders one sample build per template into public/site-assets/templates/
// for the template library (static files: no server rendering, cacheable). The templates are
// the demo designs; the sample is a complete page for a fictional example business, with the
// sample photographs and without phone number, address or map link.
import { mkdirSync, writeFileSync } from "node:fs";
import { FAMILY_DESIGNS } from "../src/sites/designs";
import { FAMILIES } from "../src/sites/families";
import { colorwayCount } from "../src/sites/colorways";
import { renderSite } from "../src/sites/render";
import { SAMPLE_SITES } from "../src/sites/samples";
import { sampleSpec } from "./render-family";

const OUT = "public/site-assets/templates";
mkdirSync(OUT, { recursive: true });
const live = FAMILY_DESIGNS.filter((d) => FAMILIES[d.key]);
let n = 0;
for (const d of live) {
  // One sample per look: the original colours (<key>.html) and each colourway (<key>-<n>.html).
  for (let variation = 0; variation < colorwayCount(d.key); variation++) {
    // A family with its own complete demo content uses it; the others the generic sample business.
    const own = SAMPLE_SITES[d.key];
    const spec = own ? structuredClone(own) : sampleSpec(d.key, "all", true);
    spec.theme.variation = variation;
    const [index] = renderSite(spec, { agencyName: "HOPI", seedKey: d.key, assetBase: "/site-assets/" });
    writeFileSync(`${OUT}/${d.key}${variation ? `-${variation}` : ""}.html`, index.content);
    n++;
  }
}
console.log(`Rendered ${n} template previews to ${OUT}`);
