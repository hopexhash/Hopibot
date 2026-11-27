import { seoMeta } from "@/lib/site/seo-meta";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES, type Landing } from "@/lib/site/landing";
import { breadcrumbLd, faqLd, plain, serviceLd, type Crumb } from "@/lib/site/seo";
import { demoHref, WORK, workByKey } from "@/lib/site/work";
import { getSiteData } from "@/server/site";
import { CareVisual } from "./care-visual";
import { AddonList, Breadcrumbs, ContactSection, Devices, Faq, HeroAmbient, JsonLd, PriceCards, Related, SiteFooter, Steps } from "./parts";
import { rich } from "./rich";
import { SiteHeader } from "./site-client";

/** Preview shown in the hero of pages that are not about one industry. */
const VISUAL: Record<string, [browser: string, phone: string]> = {
  "/website-laten-maken": ["construction", "beauty-salon"],
  "/website-laten-maken/zzp": ["creative-agency", "fitness"],
  "/website-laten-maken/mkb": ["dental", "construction"],
  "/website-onderhoud": ["automotive", "dental"],
  "/website-redesign": ["real-estate", "automotive"],
  "/ai-website-laten-maken": ["saas", "restaurant"],
};

export async function landingMetadata(landing: Landing): Promise<Metadata> {
  const { prices } = await getSiteData();
  return seoMeta({ title: plain(landing.title, prices), description: plain(landing.description, prices), path: landing.path });
}

function crumbsFor(l: Landing): Crumb[] {
  const self = { name: l.label, path: l.path };
  return l.path.startsWith("/website-laten-maken/") ? [{ name: "Website laten maken", path: "/website-laten-maken" }, self] : [self];
}

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
  const work = l.work ? workByKey(l.work) : undefined;
  const [vb, vp] = VISUAL[l.path] ?? [];
  const heroWork = work ?? workByKey(vb ?? "automotive") ?? WORK[0];
  const heroPhone = work ?? workByKey(vp ?? "restaurant");
  const quote = l.pricing === "quote";
  const crumbs = crumbsFor(l);
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
            <Breadcrumbs crumbs={crumbs} />
            <div className="hero-grid">
              <div>
                <span className="eyebrow enter">{l.eyebrow}</span>
                <h1 className="enter">
                  <Heading text={l.h1} />
                </h1>
                <p className="lead enter">{rich(l.intro, v)}</p>
                <div className="hero-actions enter">
                  <a href="#contact" className="btn btn-dark" data-track="cta_click" data-track-label="hero" data-track-location={l.path}>
                    {quote ? "Vraag een offerte aan" : "Vraag een gratis ontwerp aan"} <ArrowRight aria-hidden="true" />
                  </a>
                  <Link href="/prijzen" className="btn btn-line">
                    Bekijk prijzen
                  </Link>
                </div>
                <ul className="ticks enter">
                  <li>
                    <Check strokeWidth={2.4} aria-hidden="true" /> Eerst zien, dan betalen
                  </li>
                  {l.path === "/website-onderhoud" ? (
                    <li>
                      <Check strokeWidth={2.4} aria-hidden="true" /> Vanaf {v.hosting} per maand
                    </li>
                  ) : (
                    <li>
                      <Check strokeWidth={2.4} aria-hidden="true" /> {quote ? "Prijs op offerte, vooraf bekend" : `Vaste prijs vanaf ${v.from}`}
                    </li>
                  )}
                  <li>
                    <Check strokeWidth={2.4} aria-hidden="true" /> Gemaakt voor mobiel
                  </li>
                </ul>
              </div>
              {l.path === "/website-onderhoud" ? (
                <CareVisual />
              ) : (
                <div className="hero-visual enter">
                  <Devices work={heroWork} phone={heroPhone} eager />
                  <span className="tag">
                    <b /> Demo-ontwerp
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
                <span className="eyebrow">Voorbeeld</span>
                <h2 className="h2">Zo kan jouw website eruitzien</h2>
                <p>
                  {work.name} is een demo-ontwerp voor een fictief bedrijf. {work.note} Klik door de hele website, ook op je telefoon. Jouw eigen ontwerp maken we met je eigen naam, diensten en stijl.
                </p>
                <a href={demoHref(work.key)} target="_blank" rel="noopener nofollow" className="btn btn-dark" data-track="portfolio_click" data-track-label={work.key} data-track-location={l.path}>
                  Bekijk de live demo <ArrowUpRight aria-hidden="true" />
                </a>
                <p>
                  <Link href={`/werk/${work.key}`}>Lees hoe het ontwerp van {work.name} is opgebouwd</Link>
                </p>
              </div>
              {l.addons && <AddonList catalog={data.catalog} keys={l.addons} title={l.addonsTitle ?? "Veel gekozen extra's"} />}
            </div>
          </section>
        )}

        {rest.map((s, i) => (
          <Section key={s.h2} s={s} v={v} alt={!work && i % 2 === 0} />
        ))}

        {!work && l.addons && (
          <section className="section tint">
            <div className="wrap narrow">
              <AddonList catalog={data.catalog} keys={l.addons} title={l.addonsTitle ?? "Veel gekozen extra's"} />
            </div>
          </section>
        )}

        {l.kind === "pillar" && (
          <section className="section tint" id="branches">
            <div className="wrap">
              <div className="section-head" data-reveal>
                <span className="eyebrow">Per branche</span>
                <h2>Een website die past bij jouw vak</h2>
                <p>Een restaurant heeft iets anders nodig dan een loodgieter. Bekijk per branche waar we op letten en hoe een ontwerp eruit kan zien.</p>
              </div>
              <div className="branches">
                {INDUSTRIES.map((ind) => {
                  const w = ind.work ? workByKey(ind.work) : undefined;
                  return (
                    <Link key={ind.path} href={ind.path} className="branch" data-reveal>
                      {w && <img src={`/site/work/${w.key}-d-720.webp`} alt="" width={720} height={450} loading="lazy" decoding="async" />}
                      <b>{ind.label}</b>
                      <span>
                        Bekijk <ArrowRight aria-hidden="true" />
                      </span>
                    </Link>
                  );
                })}
              </div>
              <p className="note">
                De afbeeldingen tonen demo-ontwerpen voor fictieve bedrijven. Ook voor <Link href="/website-laten-maken/zzp">zzp&apos;ers</Link> en <Link href="/website-laten-maken/mkb">mkb-bedrijven</Link> in andere branches maken we websites.
              </p>
            </div>
          </section>
        )}

        <Steps />

        {l.path !== "/website-onderhoud" && !quote && (
          <section className="section" id="prijzen">
            <div className="wrap">
              <div className="section-head" data-reveal>
                <span className="eyebrow">Prijzen</span>
                <h2>
                  Vaste prijzen, <em>geen</em> verrassingen
                </h2>
                <p>
                  Het ontwerp vooraf is gratis. Daarna kies je een pakket voor een vast bedrag, exclusief {v.vat} btw. Hosting en onderhoud vanaf {v.hosting} per maand. <Link href="/prijzen">Alle prijzen en extra&apos;s</Link>
                </p>
              </div>
              <PriceCards catalog={data.catalog} source={l.path} />
            </div>
          </section>
        )}

        <section className="section faq-section" id="vragen">
          <div className="wrap faq-grid">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Veelgestelde vragen</span>
              <h2>Goed om te weten</h2>
              <p>Staat je vraag er niet bij? Stel hem gerust via het formulier.</p>
            </div>
            <Faq items={l.faq} vars={v} />
          </div>
        </section>

        <Related paths={l.related} />
        <ContactSection data={data} source={l.path} />
      </main>
      <SiteFooter data={data} />
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={serviceLd({ name: l.service, serviceType: l.keywords.primary, description: plain(l.description, v), path: l.path, offers: quote ? undefined : l.path === "/website-onderhoud" ? planOffers : offers })} />
      <JsonLd data={faqLd(l.faq.map((f) => ({ q: f.q, a: plain(f.a, v) })))} />
    </>
  );
}
