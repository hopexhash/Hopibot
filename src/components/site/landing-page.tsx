import { seoMeta } from "@/lib/site/seo-meta";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { industriesOf } from "@/lib/site/content";
import { counterpart, href, localeOf, type Locale } from "@/lib/site/i18n";
import type { Landing } from "@/lib/site/landing";
import { breadcrumbLd, faqLd, plain, serviceLd, type Crumb } from "@/lib/site/seo";
import { demoHref, WORK, workByKey } from "@/lib/site/work";
import { getSiteData } from "@/server/site";
import { CareVisual } from "./care-visual";
import { AddonList, Breadcrumbs, ContactSection, Devices, Faq, HeroAmbient, JsonLd, PriceCards, Related, SiteFooter, Steps } from "./parts";
import { DEMO_EN } from "@/demos/catalog.en";
import { rich } from "./rich";
import { SiteHeader } from "./site-client";

/** Preview shown in the hero of pages that are not about one industry. */
const VISUAL: Record<string, [browser: string, phone: string]> = {
  "/website-laten-maken": ["construction", "beauty-salon"],
  "/website-laten-maken/zzp": ["creative-agency", "fitness"],
  "/website-laten-maken/mkb": ["dental", "construction"],
  "/website-onderhoud": ["automotive", "dental"],
  "/website-redesign": ["real-estate", "automotive"],
  "/webdesign": ["creative-agency", "hotel"],
  "/gratis-websiteontwerp": ["restaurant", "beauty-salon"],
  "/website-laten-maken/belgie": ["real-estate", "fitness"],
};

export async function landingMetadata(landing: Landing): Promise<Metadata> {
  const { prices } = await getSiteData();
  return seoMeta({ title: plain(landing.title, prices), description: plain(landing.description, prices), path: landing.path });
}

function crumbsFor(l: Landing, lang: Locale): Crumb[] {
  const self = { name: l.label, path: l.path };
  if (lang === "en") return l.path.startsWith("/en/website-design/") ? [{ name: "Website design", path: "/en/website-design" }, self] : [self];
  return l.path.startsWith("/website-laten-maken/") ? [{ name: "Website laten maken", path: "/website-laten-maken" }, self] : [self];
}

const T = {
  nl: {
    quote: "Vraag een offerte aan",
    design: "Vraag een gratis ontwerp aan",
    prices: "Bekijk prijzen",
    seeFirst: "Eerst zien, dan betalen",
    perMonth: (x: string) => `Vanaf ${x} per maand`,
    quotePrice: "Prijs op offerte, vooraf bekend",
    fixed: (x: string) => `Vaste prijs vanaf ${x}`,
    mobile: "Gemaakt voor mobiel",
    demo: "Demo-ontwerp",
    example: "Voorbeeld",
    exampleH: "Zo kan jouw website eruitzien",
    exampleText: (name: string, note: string) => `${name} is een demo-ontwerp voor een fictief bedrijf. ${note} Klik door de hele website, ook op je telefoon. Jouw eigen ontwerp maken we met je eigen naam, diensten en stijl.`,
    live: "Bekijk de live demo",
    how: (name: string) => `Lees hoe het ontwerp van ${name} is opgebouwd`,
    extras: "Veel gekozen extra's",
    branchesEyebrow: "Per branche",
    branchesH: "Een website die past bij jouw vak",
    branchesText: "Een restaurant heeft iets anders nodig dan een loodgieter. Bekijk per branche waar we op letten en hoe een ontwerp eruit kan zien.",
    view: "Bekijk",
    pricesEyebrow: "Prijzen",
    faqEyebrow: "Veelgestelde vragen",
    faqH: "Goed om te weten",
    faqText: "Staat je vraag er niet bij? Stel hem gerust via het formulier.",
  },
  en: {
    quote: "Request a quote",
    design: "Request a free design",
    prices: "See pricing",
    seeFirst: "See first, then pay",
    perMonth: (x: string) => `From ${x} a month`,
    quotePrice: "Price on quotation, known in advance",
    fixed: (x: string) => `Fixed price from ${x}`,
    mobile: "Made for mobile",
    demo: "Demo design",
    example: "Example",
    exampleH: "What your website could look like",
    exampleText: (name: string, note: string) => `${name} is a demo design for a fictional business. ${note} Click through the whole website, on your phone too. Your own design is made with your own name, services and style. (The demo websites are in Dutch.)`,
    live: "View the live demo",
    how: (name: string) => `Read how the design of ${name} was put together`,
    extras: "Popular extras",
    branchesEyebrow: "By industry",
    branchesH: "A website that fits your trade",
    branchesText: "A restaurant needs something different from a plumber. See per industry what we pay attention to and what a design can look like.",
    view: "View",
    pricesEyebrow: "Pricing",
    faqEyebrow: "Frequently asked questions",
    faqH: "Good to know",
    faqText: "Is your question not listed? Feel free to ask it through the form.",
  },
};

function Heading({ text }: { text: string }) {
  const [a, em, b] = text.split("*");
  return (
    <>
      {a}
      {em && <em>{em}</em>}
      {b}
    </>
  );
}

function Section({ s, v, alt }: { s: Landing["sections"][number]; v: Record<string, string>; alt?: boolean }) {
  return (
    <section className={`section${alt ? " tint" : ""}`}>
      <div className="wrap">
        <div className="section-head" data-reveal>
          <h2>{s.h2}</h2>
          {s.body?.map((p) => <p key={p}>{rich(p, v)}</p>)}
        </div>
        {s.items && (
          <div className="cards stagger" data-reveal>
            {s.items.map((it) => (
              <div key={it.title} className="card">
                <h3>{it.title}</h3>
                <p>{rich(it.text, v)}</p>
              </div>
            ))}
          </div>
        )}
        {s.list && (
          <ul className="checks stagger" data-reveal>
            {s.list.map((x) => (
              <li key={x}>
                <Check strokeWidth={2.4} aria-hidden="true" />
                {rich(x, v)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/** One landing page: every section has a job, from first impression to the request form. */
export async function LandingPage({ landing: l }: { landing: Landing }) {
  const data = await getSiteData();
  const v = data.prices;
  const lang = localeOf(l.path);
  const en = lang === "en";
  const t = T[lang];
  // The Dutch address identifies the page in both languages.
  const nlPath = counterpart(l.path, "nl");
  const care = nlPath === "/website-onderhoud";
  const work0 = l.work ? workByKey(l.work) : undefined;
  const work = work0 && en ? { ...work0, note: (DEMO_EN as Record<string, { line: string }>)[work0.key]?.line ?? work0.note } : work0;
  const [vb, vp] = VISUAL[nlPath] ?? [];
  const heroWork = work ?? workByKey(vb ?? "automotive") ?? WORK[0];
  const heroPhone = work ?? workByKey(vp ?? "restaurant");
  const quote = l.pricing === "quote";
  const crumbs = crumbsFor(l, lang);
  const [first, ...rest] = l.sections;
  const offers = data.catalog.packages.filter((p) => p.enabled && p.priceCents !== null).map((p) => ({ name: `Website ${p.name}`, priceCents: p.priceCents as number }));
  const planOffers = data.catalog.plans.filter((p) => p.enabled && p.priceCents !== null).map((p) => ({ name: p.name, priceCents: p.priceCents as number }));

  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        <section className="hero page-hero">
          <HeroAmbient />
          <div className="wrap">
            <Breadcrumbs crumbs={crumbs} lang={lang} />
            <div className="hero-grid">
              <div>
                <span className="eyebrow enter">{l.eyebrow}</span>
                <h1 className="enter">
                  <Heading text={l.h1} />
                </h1>
                <p className="lead enter">{rich(l.intro, v)}</p>
                <div className="hero-actions enter">
                  <a href="#contact" className="btn btn-dark" data-track="cta_click" data-track-label="hero" data-track-location={l.path}>
                    {quote ? t.quote : t.design} <ArrowRight aria-hidden="true" />
                  </a>
                  <Link href={href("/prijzen", lang)} className="btn btn-line">
                    {t.prices}
                  </Link>
                </div>
                <ul className="ticks enter">
                  <li>
                    <Check strokeWidth={2.4} aria-hidden="true" /> {t.seeFirst}
                  </li>
                  {care ? (
                    <li>
                      <Check strokeWidth={2.4} aria-hidden="true" /> {t.perMonth(v.hosting)}
                    </li>
                  ) : (
                    <li>
                      <Check strokeWidth={2.4} aria-hidden="true" /> {quote ? t.quotePrice : t.fixed(v.from)}
                    </li>
                  )}
                  <li>
                    <Check strokeWidth={2.4} aria-hidden="true" /> {t.mobile}
                  </li>
                </ul>
              </div>
              {care ? (
                <CareVisual lang={lang} />
              ) : (
                <div className="hero-visual enter">
                  <Devices work={heroWork} phone={heroPhone} eager lang={lang} />
                  <span className="tag">
                    <b /> {t.demo}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {first && <Section s={first} v={v} />}

        {work && (
          <section className="section tint example">
            <div className="wrap example-grid">
              <div data-reveal>
                <span className="eyebrow">{t.example}</span>
                <h2 className="h2">{t.exampleH}</h2>
                <p>{t.exampleText(work.name, work.note)}</p>
                <a href={demoHref(work.key)} target="_blank" rel="noopener nofollow" className="btn btn-dark" data-track="portfolio_click" data-track-label={work.key} data-track-location={l.path}>
                  {t.live} <ArrowUpRight aria-hidden="true" />
                </a>
                <p>
                  <Link href={en ? `/en/work/${work.key}` : `/werk/${work.key}`}>{t.how(work.name)}</Link>
                </p>
              </div>
              {l.addons && <AddonList catalog={data.catalog} keys={l.addons} title={l.addonsTitle ?? t.extras} lang={lang} />}
            </div>
          </section>
        )}

        {rest.map((s, i) => (
          <Section key={s.h2} s={s} v={v} alt={!work && i % 2 === 0} />
        ))}

        {!work && l.addons && (
          <section className="section tint">
            <div className="wrap narrow">
              <AddonList catalog={data.catalog} keys={l.addons} title={l.addonsTitle ?? t.extras} lang={lang} />
            </div>
          </section>
        )}

        {l.kind === "pillar" && (
          <section className="section tint" id="branches">
            <div className="wrap">
              <div className="section-head" data-reveal>
                <span className="eyebrow">{t.branchesEyebrow}</span>
                <h2>{t.branchesH}</h2>
                <p>{t.branchesText}</p>
              </div>
              <div className="branches">
                {industriesOf(lang).map((ind) => {
                  const w = ind.work ? workByKey(ind.work) : undefined;
                  return (
                    <Link key={ind.path} href={ind.path} className="branch" data-reveal>
                      {w && <img src={`/site/work/${w.key}-d-720.webp`} alt="" width={720} height={450} loading="lazy" decoding="async" />}
                      <b>{ind.label}</b>
                      <span>
                        {t.view} <ArrowRight aria-hidden="true" />
                      </span>
                    </Link>
                  );
                })}
              </div>
              {en ? (
                <p className="note">
                  The images show demo designs for fictional businesses. We also make websites for <Link href="/en/website-design/freelancers">freelancers</Link> and <Link href="/en/website-design/small-business">small businesses</Link> in other industries.
                </p>
              ) : (
                <p className="note">
                  De afbeeldingen tonen demo-ontwerpen voor fictieve bedrijven. Ook voor <Link href="/website-laten-maken/zzp">zzp&apos;ers</Link> en <Link href="/website-laten-maken/mkb">mkb-bedrijven</Link> in andere branches maken we websites.
                </p>
              )}
            </div>
          </section>
        )}

        <Steps lang={lang} />

        {!care && !quote && (
          <section className="section" id="prijzen">
            <div className="wrap">
              <div className="section-head" data-reveal>
                <span className="eyebrow">{t.pricesEyebrow}</span>
                {en ? (
                  <>
                    <h2>
                      Fixed prices, <em>no</em> surprises
                    </h2>
                    <p>
                      The design up front is free. After that you choose a package for a fixed amount, excluding {v.vat} VAT. Hosting and maintenance from {v.hosting} a month. <Link href="/en/pricing">All prices and extras</Link>
                    </p>
                  </>
                ) : (
                  <>
                    <h2>
                      Vaste prijzen, <em>geen</em> verrassingen
                    </h2>
                    <p>
                      Het ontwerp vooraf is gratis. Daarna kies je een pakket voor een vast bedrag, exclusief {v.vat} btw. Hosting en onderhoud vanaf {v.hosting} per maand. <Link href="/prijzen">Alle prijzen en extra&apos;s</Link>
                    </p>
                  </>
                )}
              </div>
              <PriceCards catalog={data.catalog} source={l.path} lang={lang} />
            </div>
          </section>
        )}

        <section className="section faq-section" id="vragen">
          <div className="wrap faq-grid">
            <div className="section-head" data-reveal>
              <span className="eyebrow">{t.faqEyebrow}</span>
              <h2>{t.faqH}</h2>
              <p>{t.faqText}</p>
            </div>
            <Faq items={l.faq} vars={v} />
          </div>
        </section>

        <Related paths={l.related} lang={lang} />
        <ContactSection data={data} source={l.path} lang={lang} />
      </main>
      <SiteFooter data={data} lang={lang} />
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={serviceLd({ name: l.service, serviceType: l.keywords.primary, description: plain(l.description, v), path: l.path, offers: quote ? undefined : care ? planOffers : offers })} />
      <JsonLd data={faqLd(l.faq.map((f) => ({ q: f.q, a: plain(f.a, v) })))} />
    </>
  );
}
