import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { eur, type Catalog } from "@/lib/catalog";
import { HOME, HOME_FAQ, PORTFOLIO } from "@/lib/site/home";
import { faqLd, plain } from "@/lib/site/seo";
import { informal } from "@/lib/site/text";
import { workByKey, type Work } from "@/lib/site/work";
import type { SiteData } from "@/server/site";
import { ContactSection, CtaBand, Faq, JsonLd, SiteFooter } from "../parts";
import { WhatsAppIcon } from "../site-client";

export type HomeProps = { data: SiteData; fontClass?: string };

export type PortfolioItem = { category: string; industry: string; work: Work };
export const portfolioItems = (): PortfolioItem[] => PORTFOLIO.map((p) => ({ category: p.category, industry: p.industry, work: workByKey(p.key)! })).filter((p) => p.work);

/** A website preview: the top of a demo site in a slim window frame. No device mock-ups. */
/** `eager`: load with the page (first screen). `high`: the one preview the browser should fetch first. */
export function Frame({ work, eager, high, sizes = "(min-width: 1020px) 520px, 90vw", className = "" }: { work: Work; eager?: boolean; high?: boolean; sizes?: string; className?: string }) {
  return (
    <figure className={`frame ${className}`}>
      <div className="frame-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{work.type}</span>
      </div>
      <img
        src={`/site/work/${work.key}-d-1440.webp`}
        srcSet={`/site/work/${work.key}-d-720.webp 720w, /site/work/${work.key}-d-1440.webp 1440w`}
        sizes={sizes}
        alt={`Demo-ontwerp: website voor ${work.type.toLowerCase()} ${work.name}`}
        width={1440}
        height={900}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={high ? "high" : undefined}
        decoding="async"
      />
    </figure>
  );
}

/** A long capture of a demo that scrolls inside its window while the pointer rests on it. */
export function ScrollFrame({ work, className = "" }: { work: Work; className?: string }) {
  return (
    <figure className={`frame scroll-frame ${className}`}>
      <div className="frame-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>demo · {work.name}</span>
      </div>
      <div className="scroll-view">
        <img src={`/site/work/${work.key}-tall-960.webp`} alt={`Demo-ontwerp: de website van ${work.name} van boven naar beneden`} width={960} height={1800} loading="lazy" decoding="async" />
      </div>
    </figure>
  );
}

export function Headline({ parts, as: Tag = "h2", className }: { parts: readonly [string, string]; as?: "h1" | "h2"; className?: string }) {
  return (
    <Tag className={className}>
      <span>{parts[0]}</span> <span><em>{parts[1]}</em></span>
    </Tag>
  );
}

export function HeroCopy({ data, location }: { data: SiteData; location: string }) {
  return (
    <>
      <span className="eyebrow enter">{HOME.eyebrow}</span>
      <h1 className="enter lines">
        <span>{HOME.headline[0]}</span>{" "}
        <span>
          <em>{HOME.headline[1]}</em>
        </span>
      </h1>
      <p className="lead enter">{HOME.intro}</p>
      <div className="hero-actions enter">
        <a href="#contact" className="btn btn-primary" data-track="cta_click" data-track-label="hero" data-track-location={location}>
          {HOME.cta} <ArrowRight aria-hidden="true" />
        </a>
        <a href="#werk" className="btn btn-line">
          {HOME.cta2}
        </a>
      </div>
      {data.whatsapp && (
        <p className="hero-wa enter">
          Liever even appen?{" "}
          <a href={data.whatsapp} target="_blank" rel="noopener" data-track="whatsapp_click" data-track-label="hero" data-track-location={location}>
            <WhatsAppIcon /> Stuur ons een WhatsApp
          </a>
        </p>
      )}
      <ul className="ticks enter">
        {HOME.trust.map((t) => (
          <li key={t}>
            <Check strokeWidth={2.6} aria-hidden="true" /> {t}
          </li>
        ))}
        {data.fromCents !== null && (
          <li>
            <Check strokeWidth={2.6} aria-hidden="true" /> Vanaf {data.prices.from}
          </li>
        )}
      </ul>
    </>
  );
}

/** Which features each package has, derived from the catalogue ("Alles uit …" means: everything before it). */
export function featureMatrix(catalog: Catalog) {
  const packages = catalog.packages.filter((p) => p.enabled);
  const own = packages.map((p) => p.features.filter((f) => !/^alles uit/i.test(f)).map(informal));
  const rows = [...new Set(own.flat())];
  const has = (pkg: number, feature: string) => own.slice(0, pkg + 1).some((list) => list.includes(feature));
  return { packages, rows, has };
}

export const price = (cents: number | null) => (cents === null ? "Op maat" : eur(cents));

/** Closing sections shared by every direction: questions, call to action, request form, footer. */
export function HomeTail({ data, location }: { data: SiteData; location: string }) {
  return (
    <>
      <section className="section faq-section" id="vragen">
        <div className="wrap faq-grid">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Vragen</span>
            <h2>
              Goed om te <em>weten.</em>
            </h2>
            <p>
              Staat je vraag er niet bij? Stel hem gerust via het formulier, of lees verder in onze <Link href="/blog">artikelen</Link>.
            </p>
          </div>
          <Faq items={HOME_FAQ} vars={data.prices} />
        </div>
      </section>
      <CtaBand location={location} title="Benieuwd hoe jouw nieuwe website eruit kan zien?" />
      <ContactSection data={data} source={location} />
    </>
  );
}

export function HomeJsonLd({ data }: { data: SiteData }) {
  return <JsonLd data={faqLd(HOME_FAQ.map((f) => ({ q: f.q, a: plain(f.a, data.prices) })))} />;
}

export { SiteFooter };
