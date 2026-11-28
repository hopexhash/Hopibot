# HOPI: SEO implementation report, 28 November 2026 (round 3)

Site: https://wearehopi.nl. Primary market the Netherlands, secondary Belgium (Flanders and
Brussels). Nobody can guarantee positions in Google and this report does not. What it
describes is a technically clean, honest and conversion-focused site that gives Google every
reason to rank it.

## 1. Starting point (audit before this round)

The site already had a solid foundation from the earlier rounds (see `docs/SEO.md`). A full
crawl of the production build (server HTML, no JavaScript, 104 URLs) found:

| Check | Result |
|---|---|
| HTTP status of all sitemap URLs | all 200 |
| Redirects | `www` → apex (308), `/x/` → `/x` (308), old `hopibot.vercel.app` → domain (308), no chains |
| Canonicals | absolute, self-referencing on every indexable page |
| One H1 per page, title and description present | yes, every page |
| Orphan pages, pages missing from the sitemap, noindex pages in the sitemap | none |
| Images without alt text | none |
| robots.txt | allows everything except `/api/`, `/p/`, `/d/`, `/u/`; links the sitemap |
| Demo sites (`/demos/*`) | crawlable but `noindex, follow` (fictional businesses must not rank as real ones) |
| **Structured data** | **bug: on both homepages two different `Service` nodes (Webapplicaties, Branding) shared one `@id`** |
| **Duplicate titles** | **`/cookies` and `/en/cookies` both "Cookies \| HOPI"** |
| Field Web Vitals (real visitors, p75, only a few days of data) | LCP 0.52 s mobile / 0.63 s desktop, INP 24 ms, CLS 0.00, TTFB 56–76 ms. All "good". |

## 2. Changes implemented

### Metadata
- **Homepage** title and description exactly as requested:
  "Website laten maken? Bekijk eerst je gratis ontwerp | HOPI" /
  "Een professionele website laten maken? Bij HOPI zie je eerst gratis jouw websiteontwerp.
  Tevreden? Dan betaal je pas. Websites vanaf € 299 voor ondernemers in Nederland en België."
  The amount comes from Settings → Pricing, so it stays correct when the price changes.
  Note: the description is 179 characters; Google usually shows about 155–160, so the end
  ("…in Nederland en België") may be cut off in results. Shorten it if you prefer.
- **Pillar page** `/website-laten-maken` repositioned so it no longer competes with the
  homepage for the same title: "Professionele website laten maken of bouwen | HOPI".
- **Prices page**: "Betaalbare website laten maken: vanaf € 299 | HOPI" (covers "goedkoop" /
  "betaalbaar" intent without the word "goedkoop", which does not fit the brand).
- Cookie pages: "Cookiebeleid | HOPI" and "Cookie policy | HOPI" (no more duplicate).
- Hero button now carries the USP: "Ontvang jouw gratis ontwerp" (the round closing button
  keeps "Start een project", because it is drawn for a short label).

### Structured data
- Fixed the duplicate `@id`: services without their own page now get their own fragment
  (`#service-webapplicaties`, `#service-branding-design`).
- New pages get the same connected graph as the rest: `WebPage` + `BreadcrumbList` +
  `Service` (with `Offer`s from the catalogue) + `FAQPage`; new articles get `BlogPosting`.
- Still no `LocalBusiness`, ratings, reviews, awards or invented addresses: HOPI has no public
  business address, so it stays an `Organization` with area served NL + BE.

### International (hreflang)
- Dutch pages declare `nl` (+ `x-default`); pages with an English version also declare `en`.
- **Why not `nl-NL` and `nl-BE` separately:** there is one Dutch version for both countries.
  `hreflang="nl"` already targets Dutch speakers in the Netherlands and Belgium. Splitting would
  only make sense with genuinely different Belgian pages; two tags pointing to the same URL add
  nothing. Belgium is served by a dedicated page instead (below).
- New: pages that exist only in Dutch (see below) no longer point an `en` alternate at the
  English homepage, and they are not listed under `/en` in the sitemap. This is enforced by tests.

### Redirects (single hop, 308)
`/webshop-laten-maken` → `/website-laten-maken/webshop`, `/webdesign-bureau` → `/webdesign`,
`/gratis-website-ontwerp` → `/gratis-websiteontwerp`, `/website-laten-maken/zzper` → `/website-laten-maken/zzp`.

### Internal links
- Homepage intro now links naturally to *professionele website laten maken*, *webshop laten
  bouwen*, *webdesign bureau* and *België*; the "Eerst zien" block links to the free-design page.
- Pillar FAQ links to the free-design page and the new "hoe lang duurt het" article.
- New pages appear automatically in the footer index (every page links to them) and in
  related-page blocks.
- Template sample builds (`/voorbeeld/<template>`) and `/site-assets/templates/*` are
  `noindex, follow`.

## 3. New pages

| Page | Primary keyword | Why it exists (and is not thin) |
|---|---|---|
| `/webdesign` | webdesign bureau | Webdesign as a discipline: structure, visual design, mobile-first, development, SEO basis, accessibility; bureau vs freelancer; price. ~1,450 words. |
| `/gratis-websiteontwerp` | gratis website ontwerp | The USP explained honestly: what you get, the 5 steps, why it is free, what it is not (texts are a first version), what it costs afterwards. ~1,230 words. |
| `/website-laten-maken/belgie` | website laten maken België | Real differences for Belgian businesses: required company details on the website (ondernemingsnummer, btw-nummer; sources VLAIO and DNS Belgium), language/French option, .be domains, VAT reverse charge between EU businesses, cookies, Bancontact for shops. Flemish wording (kmo, zelfstandige). ~1,290 words. |
| `/blog/hoe-lang-duurt-het-om-een-website-te-laten-maken` | hoe lang duurt het om een website te laten maken | Phases table, what sets the pace, where projects wait, how to save time, how HOPI does it. No promised delivery times. |
| `/blog/waarom-heeft-mijn-bedrijf-een-website-nodig` | waarom heeft mijn bedrijf een professionele website nodig | Six reasons (platforms are not yours, Google profile, trust, questions answered 24/7, findability), when a small site is enough. No invented statistics. |

These five are Dutch only on purpose (Dutch-market search terms and the Belgian market).

### Not created, on purpose
- **City pages** (Rotterdam, Amsterdam, Antwerpen, Gent, Brussel…): HOPI works remotely and has
  no office, clients or projects in those cities yet. Pages that only swap the city name are
  doorway pages under Google's spam policies and can hurt the whole domain. Create one when
  there is real local content (a client project in that city, local knowledge).
- **"Wat kost een professionele website in 2026?"**: would compete with the existing article
  "Wat kost een website laten maken in 2026?". Topics already covered by existing articles
  (cost, build vs DIY, good business website, more customers, restaurant website) were not
  duplicated.
- **`/webshop-laten-maken`** as a separate page: the webshop page already exists at
  `/website-laten-maken/webshop`; the short URL now redirects there.

## 4. Keyword map (one page per intent)

| Page | Primary | Secondary |
|---|---|---|
| `/` | website laten maken | gratis ontwerp, website laten maken vanaf €299, HOPI |
| `/website-laten-maken` | professionele website laten maken | website laten bouwen, website laten maken bedrijf, inclusief hosting |
| `/webdesign` | webdesign bureau | webdesign, webdesign bureau Nederland, webdesigner Nederland, website ontwikkeling, moderne website |
| `/prijzen` | website laten maken prijs | betaalbare / goedkoop website laten maken, website laten maken vanaf €299 |
| `/gratis-websiteontwerp` | gratis website ontwerp | website eerst zien dan betalen, gratis website voorstel |
| `/website-laten-maken/zzp` | website laten maken zzp | website voor zzp'er, betaalbare website zzp |
| `/website-laten-maken/mkb` | website laten maken mkb | professionele bedrijfswebsite, website kleine onderneming, website voor ondernemers |
| `/website-laten-maken/belgie` | website laten maken België | webdesign België, website kmo, website zelfstandige |
| `/website-laten-maken/restaurant`, `/horeca`, `/kapper`, `/schoonheidssalon`, `/garage`, `/loodgieter`, `/bouwbedrijf`, `/tandarts`, `/makelaar` | `<branche> website laten maken` | per page |
| `/website-laten-maken/webshop` | webshop laten maken | webshop laten bouwen |
| `/website-redesign`, `/website-onderhoud` | website redesign / website onderhoud | laten vernieuwen / inclusief hosting |
| Articles | one informational question each | link to the commercial page they support |

**Realistic expectation:** the head terms ("website laten maken", "webdesign bureau") are
dominated by large agencies, comparison sites and KVK. The industry pages, the price page,
the free-design page and the articles are the realistic first entries; head terms follow
with authority (links, reviews, time). Validate volumes in Google Keyword Planner; none of the
volumes above were measured here.

## 5. Performance

No performance changes were needed. Real-visitor data (p75) is well inside Google's "good"
thresholds (LCP < 2.5 s, INP < 200 ms, CLS < 0.1), and the build's performance budgets pass.
The new pages reuse existing components and images, so they add no new scripts or fonts.
The sample is still small (data collection started recently); check the Performance page in
the dashboard after a few weeks of traffic.

## 6. Quality control after implementation

- Crawl of the new build: 109 URLs, all 200, 97 in the sitemap, no duplicate titles or
  descriptions, no duplicate `@id`, one H1 everywhere, no orphans, no missing alt text, every
  canonical self-referencing. The only flag: the homepage description length (see above).
- hreflang checked on old and new pages; redirects checked (single 308 hop each).
- Phone (iPhone 14) and desktop (1440 px) screenshots of the homepage and all new pages: no
  horizontal overflow, no layout change, no console errors.
- Unit tests: 192 passed (including the language and sitemap tests, updated for Dutch-only pages).

## 7. Things to correct or decide (owner)

1. **"Geen sjablonen" on the homepage.** Client websites are built from HOPI's own template
   designs (in colourways), filled with the business's content. "Geen sjablonen" can be read as
   "every site is designed from scratch", which is only true for Premium. Suggested wording:
   "Geen standaard websitebouwer. Eigen ontwerpen per branche, en nooit hetzelfde als je
   concurrent om de hoek." The new `/webdesign` page already describes it this way. Not changed
   without your approval.
2. **Homepage description length** (179 characters): keep as requested, or shorten to e.g.
   "Een professionele website laten maken? Bij HOPI zie je eerst gratis jouw ontwerp. Tevreden?
   Dan betaal je pas. Websites vanaf € 299." (about 140 characters).

## 8. Google Search Console and analytics: actions for you

Current state in production: **GA4 is set** (ID filled in, loads only after cookie consent);
**Google Tag Manager is not set** (not needed while GA4 runs directly); **no Search Console
verification code is set**; no Google Business Profile URL.

1. **Verify the domain in Search Console** (search.google.com/search-console): choose *Domain*
   `wearehopi.nl` and add the TXT record at your DNS provider, or choose *URL prefix* and the
   *HTML tag* method and paste only the code under Dashboard → Settings → Website → "Search
   Console verification code".
2. **Submit the sitemap**: `https://wearehopi.nl/sitemap.xml` (Sitemaps menu).
3. **Request indexing** (URL inspection) for `/`, `/webdesign`, `/gratis-websiteontwerp`,
   `/website-laten-maken/belgie` and the two new articles.
4. **Bing Webmaster Tools**: import from Search Console (one click), so Bing and DuckDuckGo
   follow.
5. **Optional, to see search data in the dashboard**: connect the read-only service account
   under Integrations → Google Search Console & Analytics (steps in `docs/SEO.md` 0.7).
6. In GA4, mark `generate_lead` as a key event (if not done yet).

## 9. Next 90 days

**Weeks 1–2**
- Do section 8. Check Search Console's *Pages* report for anything "Discovered/Crawled – not
  indexed" and the *Core Web Vitals* report once it has data.
- Decide on section 7.
- Create a **Google Business Profile** as a service-area business (address hidden; Google
  still verifies it), category "Webdesigner", service area NL + BE. Add its URL under
  Settings so it appears in the structured data.

**Weeks 3–6**
- Ask the first real customers for an honest review on the Google profile (never paid or
  pre-written). Real reviews are the strongest trust and local signal HOPI is missing.
- Earn legitimate links: KVK/Chamber listings where applicable, local entrepreneur
  associations, a "made by HOPI" credit on client sites (with the client's consent), partners
  (photographers, accountants). No paid links, link networks or directories made for links.
- In Search Console, look at queries where a page shows up at positions 8–20: improve that
  page's title/intro for that query instead of writing new pages.

**Weeks 7–12**
- Turn the first real client projects into case pages under `/werk` (with permission), clearly
  separated from the demo designs. This is the content competitors cannot copy.
- When there is real local work, write the first city page around it (for example the city
  where most clients are), not a set of copies.
- Add articles only for questions that show up in Search Console or from customers. Candidates
  not yet covered: "domeinnaam kiezen voor je bedrijf", "website en AVG: wat moet erop",
  "Google Bedrijfsprofiel instellen".
- Re-run the crawl (dashboard → SEO → Run audit) monthly and after every content change.
