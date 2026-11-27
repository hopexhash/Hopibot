import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { siteSpecSchema } from "@/lib/site-spec";
import { FAMILY_DESIGNS } from "@/sites/designs";
import { FAMILIES } from "@/sites/families";
import { fontFilesInHtml } from "@/sites/fonts";
import { renderSite } from "@/sites/render";
import { sampleSpec } from "../../scripts/render-family";
import { build } from "../../scripts/family-css.mjs";

/**
 * The template families: the demo websites as templates of the website builder. A family
 * must look like its demo, but may only ever show what the business's own spec contains.
 */
const text = (html: string) =>
  html
    .replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>|<head[\s\S]*?<\/head>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

/** Words that only exist in the demos' fictional content. */
const DEMO_COPY = /Thomas van Rijn|Anouk Dekker|proeverij|Atelier Sage|Kade Bouw|Meridiaan|FORGE Performance|Obsidian Detailing|Van Aerden|Lune Atelier|Tandartspraktijk Helder|Veldwerk|Hotel Ostara|Studio Antipode|fictief|\.example/i;

describe("template families", () => {
  it("every demo design has a family, and the other way round", () => {
    expect(Object.keys(FAMILIES).sort()).toEqual(FAMILY_DESIGNS.map((d) => d.key).sort());
    for (const d of FAMILY_DESIGNS) {
      expect(existsSync(`src/app/(demos)/demos/${d.demo}/page.tsx`), d.key).toBe(true);
      expect(existsSync(`public/site/work/${d.demo}-d-720.webp`), d.key).toBe(true);
      expect(FAMILIES[d.key].fonts.length, d.key).toBeGreaterThan(0);
    }
  });

  it("uses the demos' current stylesheets (run: node scripts/family-css.mjs)", () => {
    for (const [name, content] of build() as Map<string, string>) expect(readFileSync(`src/sites/families/css/${name}`, "utf8"), name).toBe(content);
  });

  for (const key of Object.keys(FAMILIES)) {
    for (const variant of ["all", "plain"] as const) {
      it(`${key} (${variant}) renders a complete, honest page`, () => {
        const spec = sampleSpec(key, variant);
        expect(() => siteSpecSchema.parse(spec)).not.toThrow();
        const html = renderSite(spec, { agencyName: "Agency", seedKey: key, assetBase: "assets/" })[0].content;
        const fam = FAMILIES[key];
        expect(html).toContain(`demo fam ${fam.root}`);
        // The demonstration notice, the skip link and one H1.
        expect(html).toContain('class="demo-bar"');
        expect(html).toContain("Dit is niet de officiële website");
        expect(html).toContain('class="skip"');
        expect((html.match(/<h1[\s>]/g) ?? []).length).toBe(1);
        // Navigation hooks quality control relies on.
        expect(html).toMatch(/class="[^"]*\bhdr\b/);
        const btn = html.match(/<button[^>]*class="[^"]*\bmenu-btn\b[^>]*>/)?.[0] ?? "";
        expect(btn).toContain('aria-expanded="false"');
        const panel = btn.match(/aria-controls="([^"]+)"/)?.[1];
        expect(panel && html.includes(`id="${panel}"`), `${key}: menu panel`).toBeTruthy();
        expect((html.match(/data-nav/g) ?? []).length).toBeGreaterThanOrEqual(2);
        // Every in-page link has a target, ids are unique, every field has a label.
        const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
        expect(new Set(ids).size).toBe(ids.length);
        for (const m of html.matchAll(/href="#([^"]+)"/g)) expect(ids, `#${m[1]}`).toContain(m[1]);
        for (const m of html.matchAll(/<(?:input|select|textarea)[^>]*? id="([^"]+)"/g)) expect(html, m[1]).toContain(`for="${m[1]}"`);
        // (A before/after slider is not a form field: it names itself.)
        for (const m of html.matchAll(/<(?:input|select|textarea)(?![^>]* id=)[^>]*>/g)) expect(m[0]).toMatch(/type="range"[^>]*aria-label="[^"]+"|aria-label="[^"]+"[^>]*type="range"/);
        // Forms never send anything.
        for (const m of html.matchAll(/<form[^>]*>/g)) {
          expect(m[0]).toContain("data-demo-form");
          expect(m[0]).not.toMatch(/action=|method=/);
        }
        // Self-contained: no remote scripts, styles or fonts; every font file is shipped.
        expect(html).not.toMatch(/fonts\.googleapis|fonts\.gstatic|<link[^>]+stylesheet|<script[^>]+src=|<iframe/);
        const fonts = fontFilesInHtml(html);
        expect(fonts.length).toBeGreaterThan(0);
        for (const f of fonts) expect(existsSync(`public/site-assets/fonts/${f}`), f).toBe(true);
        // Photographs only when the spec has real ones; never an illustration in their place.
        const imgs = [...html.matchAll(/<img[^>]*src="([^"]+)"/g)].map((m) => m[1]);
        if (variant === "plain") expect(imgs).toEqual([]);
        else {
          expect(imgs.length).toBeGreaterThan(2);
          for (const src of imgs) expect(src).toMatch(/^https:\/\/images\.unsplash\.com\//);
        }
        for (const m of html.matchAll(/<img[^>]*>/g)) expect(m[0]).toMatch(/ alt="[^"]+"/);
        // Nothing of the demo's fictional content reaches a real business's site.
        expect(text(html)).not.toMatch(DEMO_COPY);
        // What the spec says is on the page.
        const body = text(html);
        expect(body).toContain(spec.business.name);
        expect(body).toContain(spec.hero.subheadline.slice(0, 40));
        for (const s of spec.sections) {
          if (s.type === "gallery" || s.type === "beforeafter" || s.type === "showcase") continue;
          expect(html, `${key}: section ${s.type}`).toContain(`id="${s.id}"`);
        }
      });
    }
  }
});
