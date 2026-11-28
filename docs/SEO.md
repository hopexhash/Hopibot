# HOPI website: SEO audit, architecture and plan

Site: https://wearehopi.nl (until 27 November 2026 at https://hopibot.vercel.app, which now
redirects every page with a 308 to the same page on the domain).

Latest round: 28 November 2026 (sections 0 and 0.1 to 0.9). The older sections below describe
the foundation from 26 November and are still accurate unless section 0 says otherwise.

Nobody can promise positions in Google, and this document does not. What is in place is a
technically clean site with one page per search intent, honest Dutch content, structured data
that describes one connected organisation, and the measurement to see what works.

## 0. Round of 28 November 2026

> **Owner decision (28 November, later the same day): the public website says nothing about AI.**
> Visitors are put off by it. Removed: the page `/ai-website-laten-maken` (308 to
> `/website-laten-maken`), the article `/blog/hoe-werkt-een-ai-website-builder` (308 to
> `/blog/website-laten-maken-of-zelf-bouwen`), the "AI-oplossingen" service and the "AI"
> discipline on the homepage, every mention in the About, horeca and pillar pages, and the AI
> joke on the 404 page. Rows below that mention the AI page or article are kept for history
> only. Do not add AI wording to public pages, articles or structured data.

### 0.1 Audit (production build, crawled like a search engine: server HTML, no JavaScript)

| Check | Result before this round | Now |
|---|---|---|
| Pages in the sitemap, all HTTP 200, `index, follow`, one H1, no heading skips | 38 / all pass | 48 / all pass |
| Duplicate titles or descriptions | none | none |
| Titles over 60 characters | 3 (home, two project pages) | 0 |
| Canonical = own URL, absolute, on wearehopi.nl | yes | yes (query strings and trailing slashes canonicalise; `/x/` 308s to `/x`) |
| 404 for unknown pages, hidden control-room routes | real 404 | real 404 |
| `hopibot.vercel.app` | separate copy of the site | 308 to the same page on wearehopi.nl (pages, demos, previews); `www` 308s to the apex |
| Structured data | valid, but loose blocks without connections | one graph per page linked by `@id` (see 0.4) |
| Internal links to industry pages | 2–3 per page (only the pillar page) | every page via the footer index + contextual links |
| Hero previews on five landing pages | pointed at demos that no longer exist (all showed the same screenshot) | fixed |
| Lighthouse mobile (home / pillar / article) | not measured after the redesign | Performance 94 / 96 / 92, SEO 100, Best practices 100, Accessibility 97*, CLS 0 |

\* The 97 is a false positive: the header is drawn with "difference" blending (dark on light
on screen); the checker computes white on light. LCP in Lighthouse's simulated mobile mode:
2.6 s home, 2.7 s pillar; the article now serves a 720 px cover to phones.

### 0.2 New pages

| Page | Primary keyword | Why it exists |
|---|---|---|
| `/website-laten-maken/horeca` | website laten maken horeca | Cafés, lunchrooms, cafetaria's, bars: different needs from restaurants (takeaway, delivery platforms, changing hours). Restaurant page no longer claims "horeca" (now "restaurant website bouwen"). |
| `/website-laten-maken/webshop` | webshop laten maken | Webshops are offered on quotation on the homepage; this page explains what sets the price. No package prices or offers on this page. |
| `/ai-website-laten-maken` | AI website laten maken | Explains exactly how HOPI uses AI (research, first texts by Claude, browser tests, human approval) and what AI does not do. |
| `/over-ons` | (brand: over HOPI) | Who HOPI is, what it does, how, for whom, what it deliberately does not do. AboutPage. Company details appear once filled in under Settings. |
| `/contact` | (brand: contact HOPI) | Request form, contact details from Settings, what happens next. ContactPage. |
| 5 articles (category in brackets) | see 0.3 | Each answers one real question with sources. |

Pages from the brief that were **not** made, on purpose:

- **City pages** (`/website-laten-maken/amsterdam` and others): HOPI works remotely and has no
  local office, customers or projects in those cities yet. Ten pages with the same text and a
  different city name are doorway pages and can hurt the whole site. Make one when there is
  something local to show (section 12).
- **`/diensten`, `/locaties`, `/cases`, `/portfolio`**: services live on the homepage and the
  pillar page, the portfolio is `/werk`, and there are no client cases yet (all portfolio items
  are demos). `/cases/<client>` becomes worthwhile with the first real, approved project.
- **Blog category pages**: the blog index is grouped by four topics with anchors. Separate
  category URLs would hold two to four articles each (thin pages); add them past ~6 per topic.
- **Separate articles for "hoeveel kost een bedrijfswebsite", "zzp gids", "SEO belang",
  "vindbaarheid"**: they would compete with the existing cost article, the zzp landing page and
  the "beter vindbaar in Google" article. Merged into those instead.

### 0.3 Keyword map additions

| Page | Primary | Secondary | Intent |
|---|---|---|---|
| `/website-laten-maken/horeca` | website laten maken horeca | website voor cafetaria, website voor lunchroom, website café, snackbar website | Commercial, industry |
| `/website-laten-maken/webshop` | webshop laten maken | webshop laten bouwen, online winkel laten maken, webshop voor kleine ondernemers | Commercial |
| `/ai-website-laten-maken` | AI website laten maken | AI website builder, website automatisch laten maken, website met AI | Commercial |
| `/blog/wat-moet-er-op-een-restaurantwebsite-staan` | wat moet er op een restaurantwebsite staan | restaurant website maken, professionele restaurantwebsite | Informational → restaurant page |
| `/blog/waarom-is-een-mobiele-website-belangrijk` | waarom is een mobiele website belangrijk | mobile-first indexing | Informational |
| `/blog/maatwerk-website-of-template` | verschil maatwerk website en template | | Informational |
| `/blog/hoe-werkt-een-ai-website-builder` | hoe werkt een AI website builder | | Informational → AI page |
| `/blog/meer-klanten-via-je-website` | hoe krijg je meer klanten via je website | | Informational |

Restaurant page: secondary "horeca website" replaced by "restaurant website bouwen".
Volumes and difficulty are still **unverified**: validate every row in Google Keyword
Planner (search volume, competition) and, after a few weeks, in Search Console (impressions,
position) via the SEO control center. Expect the head term "website laten maken" to be
dominated by KVK, comparison sites and large agencies; the industry pages, the price page and
the articles are the realistic first entries.

### 0.4 Structured data

- Every page: `WebPage` (or `AboutPage`, `ContactPage`, `CollectionPage`) with `@id`
  `<url>#webpage`, `isPartOf` the `WebSite`, `breadcrumb` the page's `BreadcrumbList`.
- `Organization` (`<site>/#organization`): name, logo, slogan, one consistent description
  (also on the About page), `knowsAbout`, area served NL + BE; e-mail, phone, address, KvK,
  Google profile and a `ContactPoint` only when filled in under Settings. Changed from
  `ProfessionalService` (a LocalBusiness type that expects an address HOPI does not publish).
- `Service` per landing page with `mainEntityOfPage` and `provider`; `Offer`s only for fixed
  catalogue prices (none on the webshop page).
- `BlogPosting` with `@id`, `isPartOf` the `Blog`, `articleSection`, `wordCount`, cover image,
  publisher and author = the organisation (no invented authors).
- `FAQPage` where FAQs are on the page. No ratings, reviews or awards anywhere.

### 0.5 Blog engine

Articles live in `src/lib/site/blog.ts` (reviewed text in code, like the landing pages). Each
has: SEO title, description, slug, keyword, topic (`kosten`, `aanpak`, `vindbaarheid`,
`branches`), published and updated date, reading time, optional cover image with alt text and
size, sources (shown under the article), related pages, table of contents from its headings,
canonical, Open Graph and `BlogPosting`. Author line: "de redactie van HOPI", linked to the
About page. Titles and descriptions can be overridden in the SEO control center.

### 0.6 SEO control center (dashboard → SEO)

- **Overview**: internal site-health score (labelled as an internal diagnostic, not a Google
  score), errors/warnings, pages in the sitemap, broken internal links; Google Search data;
  all problems found, most serious first; Bing and Google verification.
- **Audit** ("Run audit now"): reads `sitemap.xml` and `robots.txt`, fetches every page's server
  HTML and checks status, noindex, title and description (missing, length, duplicates),
  canonical, H1, heading order, structured data (parses, has types, required fields), Open
  Graph, language, images (alt, width/height), thin content, internal links that break or
  redirect, and pages no other page links to from its content (orphans; menus and footer are
  not counted). Takes about a second for 48 pages.
- **Pages**: every public page with type, live title, words, contextual links in, structured
  data and problems; an editor per page for SEO title, description, canonical and noindex,
  with a search-result preview. Saving updates the live page and the sitemap within minutes;
  "Reset" returns to the page's own values. Only the workspace that owns the website can edit.
- **Google Search Console & Analytics** (Integrations): read-only service account. Shows
  clicks, impressions, CTR and average position for the last 28 days against the 28 before,
  top queries, top pages, pages losing clicks, sitemap status, and GA4 organic sessions and key
  events by landing page. Until a key is connected the section says so and shows no numbers.

### 0.7 What needs your accounts (cannot be done from here)

1. **Google Search Console**: verify `wearehopi.nl` (Domain property via DNS at GoDaddy, or the
   HTML tag: paste the code under Settings → Website), then submit `https://wearehopi.nl/sitemap.xml`.
2. **Search data in the dashboard**: Google Cloud → create a service account, enable "Google
   Search Console API" and "Google Analytics Data API", download its JSON key; add the service
   account's e-mail as a user in Search Console and as Viewer in GA4; paste the key under
   Integrations → Google Search Console & Analytics with the property (`sc-domain:wearehopi.nl`)
   and the GA4 property ID; press Test.
3. **GA4**: create a property, paste the `G-…` ID under Settings → Website, mark `generate_lead`
   as a key event.
4. **Bing Webmaster Tools**: import from Search Console, or paste the verification code under
   SEO → Search engines.
5. **Google Business Profile** as a service-area business (category "Webdesigner"), and the
   profile link under Settings → Website.
6. **Company details** (KvK, address, e-mail, phone) under Settings: required by Dutch law on a
   business website, and they complete the organisation in structured data.

### 0.8 Authority and backlinks (no paid links, no networks)

1. Consistent name, URL and description everywhere (use the About page sentence).
2. Business directories that are real and moderated: KVK-linked listings, Google Business
   Profile, Bing Places, Apple Business Connect, Trustoo/Werkspot-type marketplaces only if you
   actually take work through them.
3. Local partnerships: business associations (ondernemersverenigingen), coworking spaces,
   accountants and printers who refer clients.
4. Content others cite: the restaurant checklist and the cost article are linkable; offer them
   to horeca and entrepreneur platforms as guest contributions (rewritten, not duplicated).
5. Every delivered client site: with permission, a "Website door HOPI" footer link and a case
   study on `/werk` with real, approved results.
6. Reviews: ask every delivered client for a Google review; never write or buy them. Only then
   add `Review` markup, and only for reviews that exist publicly.

### 0.9 Next, in order of impact

1. Do 0.7 (Search Console, sitemap, GA4, Business Profile, company details).
2. After 3–4 weeks: in SEO → Overview, find pages with impressions but low CTR and rewrite
   their titles/descriptions in SEO → Pages; find queries ranking 8–20 and strengthen those pages.
3. First real clients → case studies with permission (problem, approach, verified result).
4. Content backlog, one real question each: "Hoe lang duurt het om een website te laten
   maken?", "Wat is hosting en heb ik het nodig?", "Website voor een kapsalon: waar let je op?",
   "Google Bedrijfsprofiel instellen", and updating the cost article to 2027 in January.
5. City page only with a delivered project in that city (section 12).
6. French pages for Wallonia when French copy can be delivered.

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

## English version (/en)

Every public page also exists in English under /en with English addresses (map in
`src/lib/site/i18n.ts`, `NL_TO_EN`). Each page declares both languages with hreflang
(`x-default` = Dutch), the sitemap lists both with alternates, and structured data carries
`inLanguage`. The language switch (NL/EN in the header, the menu on large screens, the footer)
opens the same page in the other language. English content: `landing.en.ts`, `blog.en.ts`,
`home.en.ts`, `src/demos/catalog.en.ts`, `src/lib/catalog.en.ts` (price catalogue texts; text an
owner changes in Settings shows as written). The demo websites stay Dutch. Enquiries from the
English pages are marked "reply in English" in the CRM. Tests: `tests/unit/i18n.test.ts`.
