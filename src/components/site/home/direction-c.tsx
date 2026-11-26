import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { HOME, PORTFOLIO, PROCESS, SERVICES } from "@/lib/site/home";
import { informal } from "@/lib/site/text";
import { demoHref, workByKey } from "@/lib/site/work";
import { SiteHeader } from "../site-client";
import { Frame, Headline, HeroCopy, HomeJsonLd, HomeTail, portfolioItems, price, ScrollFrame, SiteFooter, type HomeProps } from "./shared";
import "./home-c.css";

/** The moment you start paying, drawn as a line: everything before "Akkoord" is free. */
const PATH = [
  { label: "Aanvragen", free: true },
  { label: "Ontwerp bekijken", free: true },
  { label: "Akkoord? Pakket kiezen", free: false },
  { label: "Website live", free: false },
];

/**
 * Direction C, "Podium": big confident type. The headline fills a forest-green stage and the
 * website previews step out over its edge; the portfolio is a staggered gallery, services a
 * list of large words, prices are rows you read from left to right.
 */
export function HomeC({ data, fontClass = "" }: HomeProps) {
  const v = data.prices;
  const [resto, auto, beauty] = ["de-gouden-lepel", "garage-jansen", "beauty-by-noor"].map((k) => workByKey(k)!);
  const items = portfolioItems();
  const packages = data.catalog.packages.filter((p) => p.enabled);
  const marquee = PORTFOLIO.map((p) => p.category);
  return (
    <div className={`dir dir-c ${fontClass}`}>
      <SiteHeader />
      <main id="inhoud">
        <section className="hero c-hero">
          <div className="c-stage">
            <div className="wrap c-copy">
              <HeroCopy data={data} location="/" />
            </div>
            <div className="hero-visual c-row enter" aria-label="Voorbeelden van websites die wij ontwerpen">
              <Frame work={resto} eager high className="c-shot c-shot-1" sizes="(min-width: 900px) 36vw, 78vw" />
              <Frame work={auto} eager className="c-shot c-shot-2" sizes="(min-width: 900px) 36vw, 78vw" />
              <Frame work={beauty} className="c-shot c-shot-3" sizes="(min-width: 900px) 36vw, 78vw" />
            </div>
          </div>
          <div className="c-marquee" aria-hidden="true">
            <div>
              {[0, 1].map((n) => (
                <p key={n}>
                  {marquee.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="section c-usp" id="waarom">
          <div className="wrap">
            <div className="c-usp-top">
              <Headline parts={HOME.usp.title} className="h2 c-giant" />
              <div data-reveal>
                <span className="eyebrow">Waarom HOPI</span>
                <p className="c-usp-text">{HOME.usp.text}</p>
                <a href="#contact" className="btn btn-primary" data-track="cta_click" data-track-label="usp" data-track-location="/">
                  {HOME.cta} <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <ol className="c-path" data-reveal aria-label="Wanneer je betaalt">
              {PATH.map((s, i) => (
                <li key={s.label} data-free={s.free}>
                  <span className="c-path-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <b>{s.label}</b>
                  <em>{s.free ? "Gratis" : i === 2 ? "Pas hier betaal je" : "Jouw website"}</em>
                </li>
              ))}
            </ol>
            <ul className="c-points stagger" data-reveal>
              {HOME.usp.points.map((p) => (
                <li key={p.title}>
                  <Check strokeWidth={2.6} aria-hidden="true" />
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section dark c-work" id="werk">
          <div className="wrap">
            <div className="section-head c-head" data-reveal>
              <span className="eyebrow">Onze websites</span>
              <Headline parts={HOME.portfolioTitle} />
              <p>{HOME.portfolioText}</p>
            </div>
            <ul className="c-gallery">
              {items.map((it, i) => (
                <li key={it.work.key} data-reveal>
                  <a href={demoHref(it.work.key)} target="_blank" rel="noopener nofollow" className="c-card" aria-label={`Demo-ontwerp ${it.work.name}: bekijk de live demo (opent in een nieuw tabblad)`} data-track="portfolio_click" data-track-label={it.work.key}>
                    <ScrollFrame work={it.work} />
                  </a>
                  <div className="c-meta">
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{it.category}</h3>
                      <p>
                        {it.work.name} · {it.work.note}
                      </p>
                    </div>
                    <div className="c-links">
                      <a href={demoHref(it.work.key)} target="_blank" rel="noopener nofollow" data-track="portfolio_click" data-track-label={it.work.key}>
                        Live demo <ArrowUpRight aria-hidden="true" />
                      </a>
                      <Link href={it.industry}>
                        Branche <ArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="note">{HOME.portfolioNote}</p>
          </div>
        </section>

        <section className="section c-services" id="diensten">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Wat wij doen</span>
              <Headline parts={HOME.servicesTitle} />
            </div>
            <ul className="c-words">
              {SERVICES.map((s, i) => (
                <li key={s.title} data-reveal>
                  <span aria-hidden="true">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
            <p className="note">
              Eén aanspreekpunt, van het eerste ontwerp tot het onderhoud daarna. <Link href="/website-laten-maken">Meer over een website laten maken</Link>
            </p>
          </div>
        </section>

        <section className="section c-process" id="werkwijze">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Werkwijze</span>
              <Headline parts={HOME.processTitle} />
            </div>
            <ol className="c-steps">
              {PROCESS.map((p, i) => (
                <li key={p.title} data-reveal>
                  <span className="c-step-n" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  {i === 1 && <em>Gratis</em>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section c-pricing" id="prijzen">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Prijzen</span>
              <Headline parts={HOME.pricingTitle} />
              <p>
                {HOME.pricingText} Alle prijzen zijn exclusief {v.vat} btw.
              </p>
            </div>
            <div className="c-plans">
              {packages.map((p) => (
                <article key={p.key} className={`c-plan${p.featured ? " featured" : ""}`} data-reveal>
                  <div className="c-plan-name">
                    <h3>
                      {p.name} {p.featured && <span>Meest gekozen</span>}
                    </h3>
                    <p>{informal(p.description)}</p>
                  </div>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>
                        <Check strokeWidth={2.6} aria-hidden="true" />
                        {informal(f)}
                      </li>
                    ))}
                  </ul>
                  <div className="c-plan-price">
                    <b>{price(p.priceCents)}</b>
                    <span>{p.priceCents === null ? "prijs op aanvraag" : "eenmalig, excl. btw"}</span>
                    <a href={`?pakket=${p.key}#contact`} className={`btn ${p.featured ? "btn-green" : "btn-dark"}`} data-track="pricing_cta_click" data-track-label={p.key} data-track-location="/">
                      Kies {p.name} <ArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="plans" data-reveal>
              <span>
                <b>Hosting & onderhoud</b> vanaf {v.hosting} per maand, excl. btw. Eerst gratis een ontwerp: je betaalt pas als het bevalt.
              </span>
              <Link href="/prijzen" data-track="cta_click" data-track-label="all-prices">
                Bekijk alle prijzen en extra&apos;s <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <HomeTail data={data} location="/" />
      </main>
      <SiteFooter data={data} />
      <HomeJsonLd data={data} />
    </div>
  );
}
