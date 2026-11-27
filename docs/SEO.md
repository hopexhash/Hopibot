# HOPI website: SEO audit and plan

Date: 26 November 2026. Site: https://wearehopi.nl (until 27 November 2026 at https://hopibot.vercel.app, which now redirects).

This is an improvement of the existing website, not a redesign: the brand, colours, typography, layout language and all backend functions are unchanged.

## 1. Summary

| Area | Before | Now |
|---|---|---|
| Indexable pages | 2 (home, privacy) | 25, each with its own search intent |
| Language of the document | `lang="en"` on every page | `lang="nl"` on all public pages |
| Sitemap / robots.txt | none | `/sitemap.xml` (25 URLs), `/robots.txt` |
| Canonical URLs | none | on every page |
| Structured data | none | Organization (ProfessionalService), WebSite, BreadcrumbList, Service + Offer, FAQPage, Blog, BlogPosting |
| Social cards | hero screenshot, no size | 1200×630 image, Open Graph + Twitter on every page |
| Public pages load | bot stylesheet, 5 bot fonts, database query per visit | own 8 KB stylesheet, 3 font files, prebuilt pages (refreshed every 5 minutes) |
| Lighthouse mobile (home) | not measured | Performance 89–94, Accessibility 100, Best practices 100, SEO 100 |
| Tracking | none | consent-based GA4 / Tag Manager, switched on from Settings; conversion events defined |

Nobody can promise positions in Google, and this document does not. What is in place is a technically clean site with a clear page per search intent, honest Dutch content and a measurement setup.

## 2. Technical issues found and fixed

| # | Issue found | Fix |
|---|---|---|
| 1 | Public pages were served inside the control room's document: `lang="en"`, bot stylesheet and fonts, title "HOPI Bot" on error pages | The website has its own root layout (`src/app/(site)`); the control room has another (`src/app/(app)`) |
| 2 | 404 pages for control-room addresses leaked "Command Center · HOPI Bot" in the HTML | One neutral Dutch 404 for every unknown or hidden address, returned before any page code runs (`src/proxy.ts`, `global-not-found.tsx`) |
| 3 | No sitemap, no robots.txt | `src/app/sitemap.ts`, `src/app/robots.ts`; a test keeps the sitemap equal to the list of indexable pages |
| 4 | No canonical URLs, generic title on most pages | `pageMeta()` in `src/lib/site/seo.ts` sets title, description, canonical and social cards per page |
| 5 | No structured data | JSON-LD builders in `src/lib/site/seo.ts`; only facts that are filled in under Settings are published; no ratings or reviews are invented |
| 6 | One page had to rank for everything | 14 landing pages, a prices page and a blog (section 3) |
| 7 | Homepage hit the database on every visit | Pages are prebuilt and refreshed every 5 minutes; saving Settings refreshes them at once |
| 8 | Hero text started invisible (fade-in), so the main content was measured as painting late | Entrance animation moves only, never hides |
| 9 | Small grey text below 4.5:1 contrast; small tap targets in the footer | Colours and spacing adjusted (Accessibility 93 → 100) |
| 10 | Images were JPEG in one size | WebP in two sizes with `srcset`; lazy below the fold; width/height set (CLS 0) |
| 11 | Portfolio showed invented domain names in the browser bar and a dialable phone number in the demos | Bar shows "demo · name"; demos use an undialable number and no outbound links |
| 12 | Heading order skipped levels in places, FAQ questions were not headings | One H1 per page, H2/H3 in order (checked on all 25 pages) |
| 13 | Sign-in page linked to a sign-up page that does not exist | Link removed when the secret sign-in address is used |

Checked on every page in the sitemap, on a phone and a desktop viewport: status 200, one H1, no heading skips, unique title and description within length, canonical equals the URL, `index, follow`, valid JSON-LD, no horizontal overflow, no broken images, no broken internal links, no page without an incoming link. The script used is in the session scratchpad; the content rules are in `tests/unit/site-seo.test.ts` and run with the test suite.

## 3. Keyword map

**No keyword API is connected, so there are no verified search volumes or difficulty scores in this document.** The map is based on search intent and on what Google shows today for four sample queries (see "Research notes"). Volumes must be checked in Google Search Console once the site has data, or with a keyword tool.

One page per intent; a test fails if two pages claim the same primary keyword.

| Page | Primary keyword | Secondary keywords | Intent |
|---|---|---|---|
| `/` | webdesign bureau (brand: HOPI) | webdesign, eerst zien dan betalen, gratis ontwerp website | Commercial / brand |
| `/website-laten-maken` | website laten maken | website laten bouwen, professionele website laten maken, website laten maken bedrijf, webdesigner inhuren | Commercial (pillar) |
| `/prijzen` | website laten maken prijzen | betaalbare website laten maken, goedkope website laten maken | Commercial, price |
| `/website-laten-maken/restaurant` | website laten maken restaurant | restaurant website laten maken, horeca website | Commercial, industry |
| `/website-laten-maken/kapper` | website laten maken kapper | website kapsalon, barbershop website | Commercial, industry |
| `/website-laten-maken/schoonheidssalon` | website laten maken schoonheidssalon | website schoonheidssalon, beautysalon website | Commercial, industry |
| `/website-laten-maken/garage` | website laten maken garage | website autobedrijf, website autogarage | Commercial, industry |
| `/website-laten-maken/loodgieter` | website laten maken loodgieter | website loodgieter, website installatiebedrijf | Commercial, industry |
| `/website-laten-maken/bouwbedrijf` | website laten maken bouwbedrijf | website aannemer, aannemer website | Commercial, industry |
| `/website-laten-maken/tandarts` | website laten maken tandarts | website tandartspraktijk | Commercial, industry |
| `/website-laten-maken/makelaar` | website laten maken makelaar | makelaar website, website makelaarskantoor | Commercial, industry |
| `/website-laten-maken/zzp` | website laten maken zzp | zzp website laten maken, betaalbare website zzp | Commercial, audience |
| `/website-laten-maken/mkb` | website laten maken mkb | bedrijfswebsite laten maken, zakelijke website laten maken | Commercial, audience |
| `/website-onderhoud` | website onderhoud | website laten onderhouden, onderhoud abonnement | Commercial, service |
| `/website-redesign` | website redesign | website laten vernieuwen, nieuwe website laten maken | Commercial, service |
| `/blog/wat-kost-een-website-laten-maken` | website laten maken kosten | wat kost een website | Informational |
| `/blog/website-laten-maken-of-zelf-bouwen` | website laten maken of zelf maken | zelf website bouwen of laten maken | Informational |
| `/blog/waar-moet-een-goede-bedrijfswebsite-aan-voldoen` | goede bedrijfswebsite | checklist website | Informational |
| `/blog/hoe-kies-je-een-webdesignbureau` | webdesignbureau kiezen | waar op letten webdesigner | Informational |
| `/blog/beter-vindbaar-in-google` | bedrijf beter vindbaar in google | lokale seo, google bedrijfsprofiel | Informational |
| `/blog/wat-kost-websiteonderhoud` | website onderhoud kosten | wat kost onderhoud website | Informational |

How overlap is avoided: "kosten" (information) goes to the blog article, "prijzen / betaalbaar / goedkoop" (ready to buy) to `/prijzen`, and the pillar page links to both. "Website onderhoud" as a service goes to the service page, "wat kost onderhoud" to the article.

Keywords from the brief that deliberately have **no page**:

- **webshop laten maken**: HOPI does not build webshops today (the catalogue only has "Online bestellen" on request). A page would advertise something we cannot deliver. Decision for the owner, see section 10.
- **website laten maken zonder aanbetaling**: the offer (free design first) is on the homepage and pillar page, but the exact phrase is not claimed because the payment moment after choosing a package is set per order.

### Research notes (26 November 2026)

- "website laten maken": page one is KVK, comparison platforms (Trustoo), marketplaces and large guides. A new agency site will not rank on this head term soon; the realistic entry points are the industry pages, the price page and the articles.
- "website laten maken kosten": price guides dominate. Public guides quote very different ranges; the cost article labels them as rough indications.
- "website laten maken restaurant": mostly website builders (Wix, Hostinger). Honest industry pages with a real example have room in the long tail.
- "eerst zien dan betalen": one Belgian agency uses a similar promise; in the Netherlands the proposition is uncommon, which makes it a usable differentiator.

Sources: [KVK](https://www.kvk.nl/advies-en-informatie/marketing/tips-voor-het-maken-van-een-zakelijke-website/), [Finom](https://finom.co/nl-nl/blog/website-laten-maken-kosten/), [Searchlab](https://searchlab.nl/blog/wat-kost-een-website-in-2026), [Appy Pie](https://www.appypie.com/nl/?p=2729541), [Rudys.ai](https://rudys.ai/nl/website-laten-maken-kosten), [Trustoo](https://trustoo.nl/expert-blogs/webdesign/website-laten-maken-waar-op-letten/), [Sortlist: Ozon Webdesign](https://www.sortlist.com/agency/ozon-webdesign).

## 4. Internal linking

- Header: Website laten maken, Voorbeelden, Werkwijze, Prijzen, Blog. Footer: all services, all eight industries, blog, contact and legal pages, on every page.
- Pillar page links to every industry page (visual grid), to zzp/mkb, prices and two articles.
- Every landing page: breadcrumbs, a "Ook interessant" block with four related pages, and in-text links.
- Every article links to at least two commercial pages and one other article, and ends in the request form.
- Every portfolio demo links to its industry page.
- A test checks that every in-content link points to an existing page and that every article and non-industry landing page is linked from content, not only from the menu.

## 5. Structured data

| Type | Where | Notes |
|---|---|---|
| ProfessionalService (Organization) | every page | name, URL, logo, area served (Nederland, België), price range; e-mail, phone, address, KvK and Google profile only when filled in under Settings |
| WebSite | every page | |
| BreadcrumbList | every page except home | matches the visible breadcrumbs |
| Service + Offer | landing pages, prices | offers come from the price catalogue; "on request" items get no offer |
| FAQPage | home, landing pages, prices | same text as on the page. Google shows FAQ rich results for few sites; the markup is still valid and useful |
| Blog / BlogPosting | blog | author and publisher are the organisation; no invented authors |

Validation done: every block parses as JSON on all 25 pages, shapes are covered by unit tests. **Not done from this environment:** Google's Rich Results Test and Search Console's enhancement reports, because they need a live fetch by Google. Run https://search.google.com/test/rich-results on the homepage, one landing page and one article after deployment.

Deliberately absent: `aggregateRating`, `review`, a street address or opening hours that do not exist, `Product` for services.

## 6. Indexability

- `robots.txt`: everything public is allowed; `/api/`, `/p/`, `/d/`, `/u/` are disallowed. The secret sign-in address is not mentioned anywhere.
- Control-room pages, customer previews and the unsubscribe page carry `noindex`. Hidden addresses return a real 404 status.
- Demo websites (`/demos/…`) are for visitors only: `noindex` in the page and in the `X-Robots-Tag` header. Their project pages (`/werk/<slug>`) are indexed and in the sitemap. See `docs/DEMOS.md`.
- Canonical URLs are absolute and built from `APP_URL`. **When the domain is connected, set `APP_URL` to it**; canonicals, sitemap and structured data follow automatically. Then add a redirect from the vercel.app address to the domain.
- Duplicate content: `?pakket=` variants canonicalise to the clean URL.

## 7. Performance and Core Web Vitals (lab)

Lighthouse 12, mobile profile, production build on this machine. Field data (real visitors) only exists after launch; check it in Search Console → Core Web Vitals.

| Page | Performance | LCP simulated | LCP with applied throttling | CLS | TBT |
|---|---|---|---|---|---|
| Home | 89–94 | 3.6 s | 1.9 s | 0 | 140–240 ms |
| Industry page | 93 | 3.1 s | 1.8 s | 0 | 110–270 ms |
| Prices | 96 | 2.0 s | not measured | 0 | 210 ms |
| Article | 96 | 2.6 s | not measured | 0 | 70 ms |

The two LCP columns differ because Lighthouse's default mode estimates, and the other mode actually slows the browser down. Largest element is text, so it does not wait for an image. Total homepage weight is about 470 KB. PageSpeed Insights could not be run from here (no outbound access to it); run it on the live URL.

What was done: separate small stylesheet, three self-hosted font files with `swap`, WebP with two sizes, lazy loading, prebuilt pages, no animation library on the public site, tracking scripts only after consent.

## 8. Mobile

Checked at 430 px on all pages: no horizontal scroll, buttons at least 44 px high, forms use the right keyboards, pricing table becomes stacked rows, portfolio is a swipe row, breadcrumbs wrap, a sticky "Gratis ontwerp" bar appears after the first screen and hides at the form.

## 9. Measurement

Everything is switched on from **Settings → Agency → Public website & Google** in the control room:

| Field | What it does |
|---|---|
| Search Console verification code | adds the verification tag; then submit `/sitemap.xml` in Search Console |
| Google Analytics 4 ID | loads GA4, only after the visitor accepts cookies |
| Google Tag Manager ID | loads Tag Manager instead (also after consent) |
| Google Business Profile link | connects website and profile in structured data |
| Phone number | shown on the site; clicks are measured |

Events pushed to the `dataLayer` (no personal data):

| Event | When |
|---|---|
| `generate_lead` | request form sent successfully (with package and page) |
| `cta_click` | any "gratis ontwerp" button (with its position) |
| `pricing_cta_click` | "Kies Starter / Business / Premium" |
| `portfolio_click` | a live demo is opened |
| `phone_click`, `email_click` | tel: and mailto: links |

In GA4, mark `generate_lead` as a key event. Not wired yet: checkout start and purchase on the customer order page (`/d/…`), see section 11.

What to follow monthly (Search Console + GA4): impressions, clicks, CTR and average position per page; number of indexed pages; organic landing pages; `generate_lead` per landing page; share of visitors who open a demo. No numbers are filled in here because there is no data yet.

## 10. Decisions and limits (owner input needed)

1. **Catalogue promises vs. what is built automatically.** Business ("tot vijf pagina's") and Premium ("koppeling reserveringssysteem") are sold on the site, but the website engine currently generates one-page sites. Those extras have to be delivered by hand until they are built. The texts were kept because prices and packages were to stay as they are.
2. **Webshops.** No page was made (see section 3). If webshops should be sold, the offer has to exist first.
3. **City pages.** None were made. HOPI works remotely for the whole of the Netherlands and Belgium and has no local offices; fifteen city pages with the same text and a different place name are doorway pages and can harm the whole site. Section 12 describes when a city page becomes legitimate.
4. **Terms and conditions.** `/algemene-voorwaarden` is a careful first version. Payment term and cancellation period refer to the order confirmation because they have not been decided. Have it read by a legal adviser.
5. **Company details.** Address, KvK number, e-mail and phone are empty in Settings, so the footer, privacy page and structured data cannot show them yet. Dutch law requires them on a business website.
6. **Demos, not customers.** All eight portfolio items are demos for fictional businesses and are labelled so. No testimonials or client logos exist, so none are shown.
7. **Informal Dutch.** The public site now says "je" (the proposition is "Jouw nieuwe website…"). E-mails to prospects and the generated demo sites still say "u".

## 11. Remaining opportunities, in order of impact

1. Connect a domain and set `APP_URL` (a vercel.app address ranks poorly and looks temporary).
2. Fill in company details; create the Google Business Profile; verify Search Console and submit the sitemap; add the GA4 ID.
3. Collect the first real customer projects: replace demos by case studies (problem, approach, result with real numbers, with permission) and add real reviews with `Review` markup only when they exist on a public platform.
4. Review flow: after delivery, send the customer the Google review link; reply to every review; never buy or write reviews.
5. Content backlog (one article per real question, no fillers): "Waarom heeft mijn bedrijf een website nodig?", "Hoe krijg je meer klanten via je website?", "Waarom is een mobielvriendelijke website belangrijk?", "Hoe lang duurt het om een website te laten maken?", "Welke domeinnaam kies je voor je bedrijf?". "Wat is belangrijk voor SEO?" was merged into the Google article to avoid two pages on one intent.
6. More industry pages where there is a real example to show: hovenier, schoonmaakbedrijf, fysiotherapeut, rijschool, café.
7. Wire `begin_checkout` and `purchase` events on the order page (needs a consent banner there too).
8. Backlinks: KvK-style directories, local business associations, customers' footers ("Website door HOPI", with their permission).
9. French pages for Wallonia, only once French site copy can be delivered.

## 12. Local SEO approach

- Area served is declared as the Netherlands and Belgium in structured data and in copy. No fake addresses.
- Google Business Profile: create it as a service-area business (no storefront) with the real business address hidden if it is a home address; category "Webdesigner"; add the profile link in Settings.
- NAP consistency: use exactly the same name, address and phone in Settings, the Business Profile and directories.
- A city page becomes worthwhile when there is something local to say: at least one delivered project in that city, a local customer quote, or a real meeting location. Then: `/website-laten-maken/<stad>` with that project as the core of the page.

## 13. Where things live

| What | Where |
|---|---|
| Landing page texts and keyword data | `src/lib/site/landing.ts` |
| Articles | `src/lib/site/blog.ts` |
| Portfolio demos | `src/demos/catalog.ts` (twelve demo websites under `src/app/(demos)/demos/`), screenshots by `scripts/shoot-demos.mjs` |
| Metadata and structured data | `src/lib/site/seo.ts` |
| Page template | `src/components/site/landing-page.tsx`, shared parts in `parts.tsx` |
| Prices | Settings → Pricing (never hardcoded; copy uses `{starter}`-style placeholders) |
| Content rules as tests | `tests/unit/site-seo.test.ts` |

Adding a landing page or article means adding one entry to the data file; the route, sitemap, footer and tests pick it up.

## Rebuild of the public website (identity v3)

The design, navigation and motion of the public website were rebuilt from the ground up; the
URLs, the request form, prices from Settings, structured data and the blog were kept.

- **New indexable pages:** `/werk` and nine project pages `/werk/<project>`. All nine are
  concept designs for fictional businesses and say so on the page, in the alt texts and in
  the meta description. The sitemap now lists 35 pages.
- **Homepage:** the H1 is the Dutch line "Webdesign bureau voor websites, webshops en
  webapplicaties die mensen onthouden." The large English statements in the hero and the
  closing section are display lines (`lang="en"`), not headings. Title and description carry
  "webdesign bureau" and "website laten maken"; the introduction uses "professionele website
  laten maken", "webshop laten bouwen" and "van Amsterdam tot Antwerpen" as a service area,
  not as an office location. One FAQ answers the "website bouwer" search intent.
- **Structured data:** the homepage adds one `Service` per service next to `ProfessionalService`,
  `WebSite` and `FAQPage`. No address is published until one is filled in under Settings.
- **Content stays in the HTML.** The WebGL sculpture is decoration (`aria-hidden`); all text,
  including the animated headlines, is ordinary text cut into spans on the server.
- **Measured** (production build, Lighthouse mobile with real throttling, machine without a
  graphics chip): homepage performance 88, LCP 1.9 s, CLS 0; inner pages 91–95; SEO and best
  practices 100. Accessibility is 100 on dark-topped pages and 97 on light-topped pages: the
  checker does not understand that the navigation is drawn in "difference" blending and
  reports white-on-light, while on screen it is black on off-white.

Open points for the owner:

1. **Services.** Webshops, web applications, branding and AI solutions are now offered on the
   homepage "op offerte" (no prices). The automated pipeline only builds websites; these
   other services are delivered by hand.
2. **Social links.** The footer shows WhatsApp and a Google profile only when they are set
   under Settings. No other social profiles exist in Settings, so none are shown.
3. **Language.** The site is Dutch; only the two display statements are English.
