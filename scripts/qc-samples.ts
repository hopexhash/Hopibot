// Dev utility: runs the real browser QC against every design's blueprint render.
import { buildBlueprintSpec } from "../src/lib/site-blueprints";
import { DESIGNS } from "../src/sites/designs";
import { renderSite } from "../src/sites/render";

async function main() {
  process.env.SKIP_SERVER_GUARD = "1";
  const { runQc, closeQcBrowser } = await import("../src/server/qc/run-qc");
  const only = process.argv[2];
  for (const d of DESIGNS) {
    if (only && d.key !== only) continue;
    const spec = buildBlueprintSpec({ name: `Voorbeeld ${d.name}`, category: "local_service", city: "Rotterdam", phone: "+31 10 123 4567", address: "Kade 1, 3011 AB Rotterdam", openingHours: ["Maandag: 10:00 – 18:00"], googleMapsUrl: "https://maps.google.com/?cid=1" }, d.key);
    const files = renderSite(spec, { agencyName: "Agency", seedKey: d.key, assetBase: "assets/" });
    const report = await runQc({ files: files.map((f) => ({ path: f.path, content: f.content, contentType: f.contentType })), expectDemoBanner: true, integrityIssues: [] } as never);
    console.log(`${report.score}\t${d.key}\t${report.issues.map((i) => `${i.code}[${i.severity}${i.viewport ? "/" + i.viewport : ""}]${i.detail ? " " + String(i.detail).slice(0, 70) : ""} ${i.message.slice(0, 90)}`).join(" | ")}`);
  }
  await closeQcBrowser();
}
main().catch((e) => { console.error(e); process.exit(1); });
