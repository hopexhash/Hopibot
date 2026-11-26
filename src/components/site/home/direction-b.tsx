import { ArrowRight, Check, Code2, Gauge, Minus, PenTool, Search, Server, Smartphone, Wrench } from "lucide-react";
import Link from "next/link";
import { HOME, PROCESS, SERVICES } from "@/lib/site/home";
import { informal } from "@/lib/site/text";
import { workByKey } from "@/lib/site/work";
import { SiteHeader } from "../site-client";
import { PortfolioExplorer } from "./explorer";
import { featureMatrix, Frame, Headline, HeroCopy, HomeJsonLd, HomeTail, portfolioItems, price, SiteFooter, type HomeProps } from "./shared";
import "./home-b.css";

const ICONS = [PenTool, Code2, Smartphone, Search, Server, Wrench];

/**
 * Direction B, "Nachtlicht": a dark, cinematic opening. The headline is centred above a wide
 * arc of three website previews; the portfolio is a large list beside a stage that follows
 * the pointer; services are a bento grid and prices a comparison board.
 */
export function HomeB({ data, fontClass = "" }: HomeProps) {
  const v = data.prices;
  const [resto, auto, beauty] = ["de-gouden-lepel", "garage-jansen", "beauty-by-noor"].map((k) => workByKey(k)!);
  const { packages, rows, has } = featureMatrix(data.catalog);
  return (
    <div className={`dir dir-b ${fontClass}`}>
      <SiteHeader />
      <main id="inhoud">
        <section className="hero b-hero">
          <div className="b-glow" aria-hidden="true" />
          <div className="wrap b-copy">
            <HeroCopy data={data} location="/" />
          </div>
          <div className="hero-visual b-arc enter" aria-label="Voorbeelden van websites die wij ontwerpen">
            <Frame work={resto} eager className="b-shot b-shot-l" sizes="(min-width: 900px) 34vw, 62vw" />
            <Frame work={auto} eager high className="b-shot b-shot-c" sizes="(min-width: 900px) 46vw, 82vw" />
            <Frame work={beauty} eager className="b-shot b-shot-r" sizes="(min-width: 900px) 34vw, 62vw" />
          </div>
        </section>

        <section className="section b-usp" id="waarom">
          <div className="wrap">
            <div className="b-usp-head" data-reveal>
              <span className="eyebrow">Waarom HOPI</span>
              <Headline parts={HOME.usp.title} className="h2 b-huge" />
            </div>
            <div className="b-usp-grid">
              <p className="b-usp-text" data-reveal>
                {HOME.usp.text}
              </p>
              <ol className="b-flow stagger" data-reveal>
                {HOME.usp.points.map((p, i) => (
                  <li key={p.title}>
                    <span aria-hidden="true">{i + 1}</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section dark b-work" id="werk">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Onze websites</span>
              <Headline parts={HOME.portfolioTitle} />
              <p>{HOME.portfolioText}</p>
            </div>
            <div data-reveal>
              <PortfolioExplorer items={portfolioItems()} variant="list" />
            </div>
            <p className="note">{HOME.portfolioNote}</p>
          </div>
        </section>

        <section className="section" id="diensten">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Wat wij doen</span>
              <Headline parts={HOME.servicesTitle} />
            </div>
            <ul className="b-bento">
              {SERVICES.map((s, i) => {
                const Icon = ICONS[i] ?? Gauge;
                return (
                  <li key={s.title} className={`b-cell b-cell-${i + 1}`} data-reveal>
                    <span className="b-ico" aria-hidden="true">
                      <Icon strokeWidth={1.8} />
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    {i === 0 && (
                      <div className="b-cell-media" aria-hidden="true">
                        <img src="/site/work/makelaardij-maas-d-720.webp" alt="" width={720} height={450} loading="lazy" decoding="async" />
                      </div>
                    )}
                    {i === 2 && (
                      <div className="b-cell-media b-cell-tall" aria-hidden="true">
                        <img src="/site/work/beauty-by-noor-m-390.webp" alt="" width={390} height={844} loading="lazy" decoding="async" />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="note">
              Eén aanspreekpunt, van het eerste ontwerp tot het onderhoud daarna. <Link href="/website-laten-maken">Meer over een website laten maken</Link>
            </p>
          </div>
        </section>

        <section className="section dark b-process" id="werkwijze">
          <div className="wrap b-process-grid">
            <div className="section-head b-sticky" data-reveal>
              <span className="eyebrow">Werkwijze</span>
              <Headline parts={HOME.processTitle} />
              <a href="#contact" className="btn btn-green" data-track="cta_click" data-track-label="process" data-track-location="/">
                {HOME.cta} <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <ol className="b-line">
              {PROCESS.map((p, i) => (
                <li key={p.title} data-reveal>
                  <span className="b-dot" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  {i === 1 && <em className="b-free">Gratis · je zit nergens aan vast</em>}
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
            <div className="b-board" data-reveal>
              {packages.map((p, pi) => (
                <article key={p.key} className={`b-plan${p.featured ? " featured" : ""}`}>
                  {p.featured && <span className="b-badge">Meest gekozen</span>}
                  <h3>{p.name}</h3>
                  <p className="b-plan-desc">{informal(p.description)}</p>
                  <div className="b-amount">
                    <b>{price(p.priceCents)}</b>
                    <span>{p.priceCents === null ? "prijs op aanvraag" : "eenmalig, excl. btw"}</span>
                  </div>
                  <a href={`?pakket=${p.key}#contact`} className={`btn ${p.featured ? "btn-green" : "btn-line"}`} data-track="pricing_cta_click" data-track-label={p.key} data-track-location="/">
                    Kies {p.name} <ArrowRight aria-hidden="true" />
                  </a>
                  <ul>
                    {rows.map((r) => {
                      const on = has(pi, r);
                      return (
                        <li key={r} data-on={on}>
                          {on ? <Check strokeWidth={2.6} aria-hidden="true" /> : <Minus strokeWidth={2} aria-hidden="true" />}
                          <span>
                            {r}
                            {!on && <span className="sr-only"> (niet in dit pakket)</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
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
