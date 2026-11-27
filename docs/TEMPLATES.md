# Templates of the website builder

Every website the bot builds for a business is rendered in one of the **demo designs** of the
portfolio (`/demos/<slug>`, see `docs/DEMOS.md`). A demo design used as a template is called a
**family**. The classic library (`src/sites/designs.ts`, the entries without `demo`) is no
longer used for new websites; a website built with it keeps it until it is generated again.

| Design (key) | Demo | Used for |
| --- | --- | --- |
| Vesper (`vesper`) | restaurant | restaurants, bars, street food, barbershops |
| Atelier Sage (`sage`) | beauty-salon | beauty salons, hairdressers, skin clinics |
| Kade Bouw (`kade`) | construction | construction, roofers, plumbers, electricians, other trades |
| Meridiaan (`meridiaan`) | real-estate | estate agencies, interior designers, landscapers |
| FORGE (`forge`) | fitness | gyms, personal trainers, tattoo studios |
| Obsidian (`obsidian`) | automotive | car detailing, garages, car dealers |
| Van Aerden (`aerden`) | law-firm | lawyers, accountants, consultants |
| Lune Atelier (`lune`) | fashion | clothing stores, shops |
| Helder (`helder`) | dental | dentists, physiotherapists, cleaning companies |
| Veldwerk (`veldwerk`) | saas | IT companies |
| Hotel Ostara (`ostara`) | hotel | hotels, coffee shops, bakeries |
| Studio Antipode (`antipode`) | creative-agency | marketing agencies, photographers, event businesses |

The mapping lives in `BUSINESS_CATEGORIES[].family` (`src/lib/constants.ts`) and
`src/lib/design-select.ts`.

## Look and industry are two things

- The **look** is the family: `selectDesign()` → `theme.design`, `website_projects.template_key`.
- The **industry** is what kind of business it is: `selectIndustry()`. It decides the default
  content and structure (the blueprint in `src/lib/site-blueprints.ts`), the industry profile
  and what photographs to search for. A bakery in the Ostara look still gets bakery content.

A family has one fixed look. No brand identity (colours, type, layout variants) is planned for
it: the creative direction only plans strategy, sections and imagery (`planForLook` in
`src/server/website/creative.ts`), and `theme.identity` stays empty.

## How a family renders

`renderSite()` (`src/sites/render.tsx`) sees that `theme.design` is a family and renders
`FamilyDocument` (`src/sites/families/kit.tsx`) instead of the classic document. The CSS of a
page is, in this order:

1. `@font-face` for the family's fonts (self-hosted, `public/site-assets/fonts`)
2. the demo kit's reset and reveal rules (`css/kit.ts`)
3. the demo's own stylesheet (`css/<demo>.ts`)
4. the shared defaults of `base.ts` (classes `z-…`, tokens `--z-…`)
5. the family's own additions (`extra`)

Items 2 and 3 are generated from the demo's files: after changing a demo's `style.css`, run
`node scripts/family-css.mjs`. A unit test fails when they are out of date.

A family (`src/sites/families/<key>.tsx`) brings its `Header`, `Hero`, `Footer` and a renderer
for every section type its demo designed. The remaining section types use the kit's default
markup, which takes the family's colours and type through the `--z-*` tokens. The page ships
no framework: `BASE_JS` (in `base.ts`) does reveal on scroll, parallax, the mobile menu, tabs,
chips, accordions, the before/after slider and the forms.

## Rules every family keeps

- **Only the spec.** A family shows what the business's `SiteSpec` contains and nothing else.
  The demo's fictional names, numbers, prices and reviews never reach a real site (a unit
  test looks for them). Parts of a demo that need facts a spec does not carry are rendered
  with the spec's nearest real content, or left out.
- **Photographs are real or absent.** `c.photo()` / `c.spare()` only return stock or supplied
  photographs. Without them a page is composed with type and colour (no illustrations).
- **The demonstration notice** (`.demo-bar`) is always visible and cannot be dismissed; forms
  never send anything and say so.
- **Hooks for quality control** (`src/server/qc/run-qc.ts`): `.demo-bar`, `.hdr`, `.menu-btn`
  with `aria-controls`, `[data-nav]`, `a.btn`, `form[data-demo-form]` with `.form-status`,
  `a.skip`, `<main>`, exactly one `<h1>`.

## Working on a family

```
npx tsx scripts/render-family.tsx <key>     # .samples/fam-<key>-all.html and -plain.html
npx tsx scripts/qc-samples.ts <key> --all   # the real browser QC on both samples
npx vitest run tests/unit/families.test.ts
```

"all" is a business with photographs and (nearly) every section type; "plain" is another
industry on the same family without any photograph. Sample photographs are the demo's own
(Unsplash); in a sandbox without DNS the QC reports them as blocked, which is not a finding.

The dashboard's template library (`/websites/templates`) shows the twelve designs with the
demo's screenshot, a link to the live demo and a sample build (`npm run templates`).
