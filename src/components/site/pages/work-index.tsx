import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { DemoPreview } from "@/components/site/demo-preview";
import { ContactSection, CtaBand, JsonLd, SiteFooter } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import { Words } from "@/components/site/split";
import type { Locale } from "@/lib/site/i18n";
import { allProjects, inLang, projectPathIn } from "@/lib/site/projects";
import { breadcrumbLd } from "@/lib/site/seo";
import { seoMeta } from "@/lib/site/seo-meta";
import { demoHref } from "@/lib/site/work";
import { getSiteData } from "@/server/site";
import "@/components/site/work.css";

const PATH = { nl: "/werk", en: "/en/work" };

/** The number of demos written out ("twaalf"), or as digits above twelve. */
const WORDS = {
  nl: ["nul", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen", "tien", "elf", "twaalf"],
  en: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"],
};
const count = (lang: Locale) => WORDS[lang][allProjects().length] ?? String(allProjects().length);
const capital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const T = {
  nl: {
    title: (n: string) => `Werk: ${n} complete demo-websites | HOPI`,
    description: (n: string) => `Bekijk ons werk: ${n} complete demo-websites, van restaurant tot advocatenkantoor. Elk met een eigen ontwerp, op desktop en mobiel, en live te bekijken.`,
    label: "(Werk)",
    demos: "demo-websites",
    h1: "Werk dat blijft hangen",
    lead: (n: string) =>
      `${capital(n)} complete websites, elk met een eigen ontwerp, eigen letters en een eigen karakter. Het zijn demo's: wij ontwierpen en bouwden ze voor fictieve bedrijven, om te laten zien wat we leveren. Het zijn geen klantprojecten. Elke website werkt echt, dus klik gerust door alle pagina-onderdelen, ook op je telefoon.`,
    index: "Alle demo's",
    list: "Demo-websites",
    demo: "Demo",
    concept: "Ontwerpconcept",
    type: "Typografie",
    live: "Bekijk live demo",
    want: "Ik wil deze website",
    more: "Over dit ontwerp",
    band: "Jouw website als volgende?",
    crumb: "Werk",
  },
  en: {
    title: (n: string) => `Work: ${n} complete demo websites | HOPI`,
    description: (n: string) => `See our work: ${n} complete demo websites, from restaurant to law firm. Each with its own design, on desktop and mobile, and viewable live.`,
    label: "(Work)",
    demos: "demo websites",
    h1: "Work that sticks",
    lead: (n: string) =>
      `${capital(n)} complete websites, each with its own design, its own typefaces and its own character. They are demos: we designed and built them for fictional businesses to show what we deliver. They are not client projects. Every website really works, so feel free to click through all the sections, on your phone too. The demo websites themselves are in Dutch.`,
    index: "All demos",
    list: "Demo websites",
    demo: "Demo",
    concept: "Design concept",
    type: "Typography",
    live: "View live demo",
    want: "I want this website",
    more: "About this design",
    band: "Your website next?",
    crumb: "Work",
  },
};

export function workIndexMetadata(lang: Locale) {
  const t = T[lang];
  const n = count(lang);
  return seoMeta({ title: t.title(n), description: t.description(n), path: PATH[lang] });
}

export async function WorkIndexPage({ lang }: { lang: Locale }) {
  const data = await getSiteData();
  const t = T[lang];
  const path = PATH[lang];
  const projects = allProjects().map((p) => inLang(p, lang));
  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        <section className="wk-hero">
          <div className="wrap3">
            <p className="lbl mono">
              <span>{t.label}</span> {projects.length} {t.demos}
            </p>
            <h1 className="disp" data-in>
              <Words text={t.h1} />
            </h1>
            <p className="wk-lead">{t.lead(count(lang))}</p>
            <nav className="pf-index mono" aria-label={t.index}>
              {projects.map((p, i) => (
                <a key={p.key} href={`#${p.key}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span> {p.industry}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="pf-list" aria-label={t.list}>
          {projects.map((p, i) => (
            <article key={p.key} id={p.key} className="pf" style={{ "--tone": p.tone, "--on": p.on } as CSSProperties}>
              <div className="pf-media" data-in data-p>
                <DemoPreview slug={p.key} name={p.work.name} mode="card" eager={i === 0} />
              </div>
              <div className="pf-info">
                <p className="mono pf-n">
                  <span>{String(i + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")} · {t.demo}
                </p>
                <h2>{p.work.name}</h2>
                <p className="mono pf-cat">
                  {p.industry} · {p.city}
                </p>
                <p className="pf-line">{p.line}</p>
                <p className="pf-sum">{p.summary}</p>
                <dl className="pf-facts">
                  <div>
                    <dt className="mono">{t.concept}</dt>
                    <dd>{p.idea}</dd>
                  </div>
                  <div>
                    <dt className="mono">{t.type}</dt>
                    <dd>{p.type}</dd>
                  </div>
                </dl>
                <div className="pf-actions">
                  <a href={demoHref(p.key)} target="_blank" rel="noopener" className="btn btn-dark" data-track="portfolio_click" data-track-label={p.key} data-track-location={path}>
                    {t.live} <ArrowUpRight aria-hidden="true" />
                  </a>
                  <Link href={`${projectPathIn(p.key, lang)}#contact`} className="btn btn-accent" data-track="cta_click" data-track-label={`get-${p.key}`} data-track-location={path} data-pt={p.work.name}>
                    {t.want} <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
                <Link href={projectPathIn(p.key, lang)} className="pf-more mono" data-pt={p.work.name}>
                  {t.more}
                </Link>
              </div>
            </article>
          ))}
        </section>
        <CtaBand location={path} title={t.band} lang={lang} />
        <ContactSection data={data} source={path} lang={lang} />
      </main>
      <SiteFooter data={data} lang={lang} />
      <JsonLd data={breadcrumbLd([{ name: t.crumb, path }])} />
    </>
  );
}
