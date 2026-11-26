import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { HOME, PROCESS, SERVICES } from "@/lib/site/home";
import { workByKey } from "@/lib/site/work";
import { HeroAmbient, PriceCards } from "../parts";
import { SiteHeader } from "../site-client";
import { PortfolioExplorer } from "./explorer";
import { Frame, Headline, HeroCopy, HomeJsonLd, HomeTail, portfolioItems, SiteFooter, type HomeProps } from "./shared";
import "./home-a.css";

/**
 * Direction A, "Atelier": light and calm. Three layered website previews carry the hero;
 * sections alternate between paper, ink and forest green; the portfolio is a wide stage
 * with industry tabs.
 */
export function HomeA({ data, fontClass = "" }: HomeProps) {
  const v = data.prices;
  const [resto, auto, beauty] = ["de-gouden-lepel", "garage-jansen", "beauty-by-noor"].map((k) => workByKey(k)!);
  return (
    <div className={`dir dir-a ${fontClass}`}>
      <SiteHeader />
      <main id="inhoud">
        <section className="hero a-hero">
          <HeroAmbient />
          <div className="wrap a-hero-grid">
            <div className="a-copy">
              <HeroCopy data={data} location="/" />
            </div>
            <div className="hero-visual a-stack enter" aria-label="Voorbeelden van websites die wij ontwerpen">
              <Frame work={resto} eager className="a-shot a-shot-1" sizes="(min-width: 1020px) 380px, 60vw" />
              <Frame work={beauty} eager className="a-shot a-shot-3" sizes="(min-width: 1020px) 360px, 56vw" />
              <Frame work={auto} eager high className="a-shot a-shot-2" sizes="(min-width: 1020px) 470px, 76vw" />
              <span className="a-chip a-chip-1">
                <b /> Ontwerp klaar · gratis
              </span>
              {data.fromCents !== null && <span className="a-chip a-chip-2">Website vanaf {v.from}</span>}
            </div>
          </div>
        </section>

        <section className="section dark a-usp" id="waarom">
          <div className="wrap a-usp-grid">
            <div data-reveal>
              <span className="eyebrow">Waarom HOPI</span>
              <Headline parts={HOME.usp.title} className="h2 a-big" />
              <p className="a-usp-text">{HOME.usp.text}</p>
              <a href="#contact" className="btn btn-green" data-track="cta_click" data-track-label="usp" data-track-location="/">
                {HOME.cta} <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <ol className="a-points stagger" data-reveal>
              {HOME.usp.points.map((p, i) => (
                <li key={p.title}>
                  <span aria-hidden="true">0{i + 1}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="werk">
          <div className="wrap">
            <div className="section-head a-head" data-reveal>
              <span className="eyebrow">Onze websites</span>
              <Headline parts={HOME.portfolioTitle} />
              <p>{HOME.portfolioText}</p>
            </div>
            <div data-reveal>
              <PortfolioExplorer items={portfolioItems()} variant="tabs" />
            </div>
            <p className="note">{HOME.portfolioNote}</p>
          </div>
        </section>

        <section className="section tint" id="diensten">
          <div className="wrap a-services">
            <div className="section-head a-sticky" data-reveal>
              <span className="eyebrow">Wat wij doen</span>
              <Headline parts={HOME.servicesTitle} />
              <p>
                Eén aanspreekpunt, van het eerste ontwerp tot het onderhoud daarna. <Link href="/website-laten-maken">Meer over een website laten maken</Link>
              </p>
            </div>
            <ol className="a-rows">
              {SERVICES.map((s, i) => (
                <li key={s.title} data-reveal>
                  <span aria-hidden="true">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section a-process" id="werkwijze">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Werkwijze</span>
              <Headline parts={HOME.processTitle} />
            </div>
            <ol className="a-steps">
              {PROCESS.map((p, i) => (
                <li key={p.title} data-reveal>
                  <span className="a-step-n" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  {i === 1 && (
                    <em className="a-free">
                      <Check strokeWidth={2.6} aria-hidden="true" /> Gratis
                    </em>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="prijzen">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Prijzen</span>
              <Headline parts={HOME.pricingTitle} />
              <p>
                {HOME.pricingText} Alle prijzen zijn exclusief {v.vat} btw.
              </p>
            </div>
            <PriceCards catalog={data.catalog} source="/" />
            <div className="plans" data-reveal>
              <span>
                <b>Hosting & onderhoud</b> vanaf {v.hosting} per maand, excl. btw.
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
