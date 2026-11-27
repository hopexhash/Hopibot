// Takes the portfolio screenshots of the demo websites (/demos/<slug>) from a running server
// and writes them to public/site/work/. Run after changing a demo:
//   npm run dev            (in another terminal)
//   node scripts/shoot-demos.mjs [slug ...]        (no slug = all demos)
// Per demo: the first screen on desktop (1440 and 720 wide) and phone (780 and 390 wide), the
// whole page on desktop (960 wide) and phone (390 wide), and the first screens for the
// scrolling preview (720 wide). The floating HOPI bar is left out of the pictures.
import { mkdirSync, readFileSync } from "node:fs";
import { chromium } from "playwright";
import sharp from "sharp";

const BASE = process.env.DEMO_BASE ?? "http://localhost:3000";
const OUT = "public/site/work";
const all = [...readFileSync("src/demos/catalog.ts", "utf8").matchAll(/slug: "([a-z-]+)"/g)].map((m) => m[1]);
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : all;
mkdirSync(OUT, { recursive: true });

/** Everything in its final state: revealed, loaded, nothing mid-animation, no HOPI bar. */
async function settle(page) {
  await page.addStyleTag({
    content: ".demo-bar,nextjs-portal{display:none!important}*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important}",
  });
  await page.evaluate(async () => {
    document.querySelectorAll("[data-rv]").forEach((n) => n.classList.add("in"));
    document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += innerHeight) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    scrollTo(0, 0);
    await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => ((i.onload = r), (i.onerror = r))))));
    await document.fonts.ready;
    // Loaded is not yet painted: wait until every photo has been decoded.
    await Promise.all([...document.images].map((i) => i.decode().catch(() => null)));
  });
  await page.waitForTimeout(1200);
}
const webp = (buf, width, file, quality = 74) => sharp(buf).resize({ width }).webp({ quality, effort: 6 }).toFile(`${OUT}/${file}`);

const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });
for (const slug of slugs) {
  // Desktop
  let ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  let page = await ctx.newPage();
  await page.goto(`${BASE}/demos/${slug}`, { waitUntil: "load" });
  await settle(page);
  const top = await page.screenshot();
  await webp(top, 1440, `${slug}-d-1440.webp`, 78);
  await webp(top, 720, `${slug}-d-720.webp`);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const full = await page.screenshot({ fullPage: true });
  // The whole page, capped so one very long demo does not become a huge file.
  const cap = Math.min(height, 10800);
  await webp(await sharp(full).extract({ left: 0, top: 0, width: 1440, height: cap }).toBuffer(), 960, `${slug}-tall-960.webp`, 66);
  await webp(await sharp(full).extract({ left: 0, top: 0, width: 1440, height: Math.min(height, 4500) }).toBuffer(), 720, `${slug}-scroll-720.webp`, 68);
  await ctx.close();

  // Phone
  ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  page = await ctx.newPage();
  await page.goto(`${BASE}/demos/${slug}`, { waitUntil: "load" });
  await settle(page);
  const mtop = await page.screenshot();
  await webp(mtop, 780, `${slug}-m-780.webp`);
  await webp(mtop, 390, `${slug}-m-390.webp`);
  const mh = await page.evaluate(() => document.documentElement.scrollHeight);
  const mfull = await page.screenshot({ fullPage: true });
  await webp(await sharp(mfull).extract({ left: 0, top: 0, width: 780, height: Math.min(mh, 7600) * 2 }).toBuffer(), 390, `${slug}-mtall-390.webp`, 66);
  await ctx.close();
  console.log(slug, "desktop", height, "px · phone", mh, "px");
}
await browser.close();
