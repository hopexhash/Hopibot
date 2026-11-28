import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { DemoPreview } from "@/components/site/demo-preview";
import { ContactSection, JsonLd, SiteFooter } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import { Words } from "@/components/site/split";
import { industriesOf } from "@/lib/site/content";
import { href, type Locale } from "@/lib/site/i18n";
import type { Landing } from "@/lib/site/landing";
import { inLang, PROJECTS, projectByKey, projectPathIn, type ProjectView } from "@/lib/site/projects";
import { breadcrumbLd } from "@/lib/site/seo";
import { seoMeta } from "@/lib/site/seo-meta";
import { demoHref, shot } from "@/lib/site/work";
import { getSiteData } from "@/server/site";
import "@/components/site/work.css";

const T = {
  nl: {
    metaBase: (name: string, industry: string, line: string) => `${name}: demo-website voor ${industry.toLowerCase()}. ${line}`,
    metaMore: " Bekijk het ontwerp op desktop en mobiel en open de live demo.",
    titles: (name: string, industry: string) => [`${name}: demo-website ${industry.toLowerCase()} | HOPI`, `${name}: demo-website | HOPI`],
    work: "Werk",
    kind: "Demo-website",
    live: "Bekijk live demo",
    want: "Ik wil deze website",
    dutch: null,
    industry: "Branche",
    type: "Typografie",
    project: "Soort project",
    projectText: "Demo voor een fictief bedrijf. Geen klantproject.",
    preview: "Voorvertoning",
    idea: "Het idee",
    concept: "Ontwerpconcept",
    sections: "Wat erin zit",
    note: (name: string) =>
      `${name} is een demo-website voor een fictief bedrijf, ontworpen en gebouwd door HOPI om te laten zien wat we leveren. Namen, prijzen, recensies en contactgegevens in het ontwerp zijn voorbeeldinhoud, en formulieren versturen niets. Jouw website maken we met je eigen naam, diensten, foto's en stijl.`,
    industryLink: (l: Landing) => `Website voor ${l.label.toLowerCase()}`,
    nextCursor: "Volgende",
    next: "Volgend project",
    contactTitle: "Deze website voor *jouw bedrijf*?",
    contactText: (name: string) =>
      `Vertel kort over je bedrijf. We maken een ontwerp in de stijl van ${name}, met je eigen naam, diensten en foto's. Gratis en vrijblijvend: je betaalt pas als het ontwerp bevalt en je een pakket kiest.`,
  },
  en: {
    metaBase: (name: string, industry: string, line: string) => `${name}: a demo website for ${industry.toLowerCase()}. ${line}`,
    metaMore: " See the design on desktop and mobile and open the live demo.",
    titles: (name: string, industry: string) => [`${name}: ${industry.toLowerCase()} demo website | HOPI`, `${name}: demo website | HOPI`],
    work: "Work",
    kind: "Demo website",
    live: "View live demo",
    want: "I want this website",
    dutch: "Please note: the demo websites themselves are in Dutch.",
    industry: "Industry",
    type: "Typography",
    project: "Type of project",
    projectText: "Demo for a fictional business. Not a client project.",
    preview: "Preview",
    idea: "The idea",
    concept: "Design concept",
    sections: "What's in it",
    note: (name: string) =>
      `${name} is a demo website for a fictional business, designed and built by HOPI to show what we deliver. Names, prices, reviews and contact details in the design are sample content, and the forms do not send anything. We make your website with your own name, services, photos and style.`,
    industryLink: (l: Landing) => l.linkLabel ?? `Website for ${l.label.toLowerCase()}`,
    nextCursor: "Next",
    next: "Next project",
    contactTitle: "This website for *your business*?",
    contactText: (name: string) =>
      `Tell us briefly about your business. We will make a design in the style of ${name}, with your own name, services and photos. Free and without obligation: you only pay if you like the design and choose a package.`,
  },
};

/** The project with this key, with its texts in the given language. */
export function findProject(key: string, lang: Locale): ProjectView | undefined {
  const p = projectByKey(key);
  return p ? inLang(p, lang) : undefined;
}

export function workProjectMetadata(p: ProjectView, lang: Locale) {
  const t = T[lang];
  const base = t.metaBase(p.work.name, p.industry, p.line);
  const more = t.metaMore;
  return seoMeta({
    // Within 60 characters, so Google shows the whole title: the long form when it fits.
    title: t.titles(p.work.name, p.industry).find((x) => x.length <= 60) ?? `${p.work.name} | HOPI`,
    description: (base + more).length <= 158 ? base + more : base.slice(0, 158),
    path: projectPathIn(p.key, lang),
    image: shot(p.key, "d-1440"),
  });
}

export async function WorkProjectPage({ project: p, lang }: { project: ProjectView; lang: Locale }) {
  const data = await getSiteData();
  const t = T[lang];
  const work = href("/werk", lang);
  const path = projectPathIn(p.key, lang);
  const index = PROJECTS.findIndex((x) => x.key === p.key);
  const next = findProject(PROJECTS[(index + 1) % PROJECTS.length].key, lang)!;
  const industry = industriesOf(lang).find((l) => l.path === href(`/website-laten-maken/${p.work.industry}`, lang));
  const tone = { "--tone": p.tone, "--on": p.on } as CSSProperties;
  return (
    <>
      <SiteHeader />
      <main id="inhoud" className="m-flush">
        <section className="pj-hero" data-theme="dark" style={tone}>
          <div className="wrap3">
            <p className="lbl mono">
              <Link href={work}>{t.work}</Link> / <span>{t.kind}</span>
            </p>
            <h1 className="disp" data-in>
              <Words text={p.work.name} />
            </h1>
            <p className="pj-line">{p.line}</p>
            <div className="pj-actions pj-actions-top">
              <a href={demoHref(p.key)} target="_blank" rel="noopener" className="btn btn-accent" data-track="portfolio_click" data-track-label={p.key}>
                {t.live} <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-line" data-track="cta_click" data-track-label={`get-${p.key}`}>
                {t.want} <ArrowRight aria-hidden="true" />
              </a>
            </div>
            {t.dutch && (
              <p className="mono" style={{ margin: "14px 0 0", fontSize: 13, opacity: 0.75 }}>
                {t.dutch}
              </p>
            )}
            <dl className="pj-meta">
              <div>
                <dt className="mono">{t.industry}</dt>
                <dd>
                  {p.industry}, {p.city}
                </dd>
              </div>
              <div>
                <dt className="mono">{t.type}</dt>
                <dd>{p.type}</dd>
              </div>
              <div>
                <dt className="mono">{t.project}</dt>
                <dd>{t.projectText}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="pj-view" style={tone} aria-label={t.preview}>
          <DemoPreview slug={p.key} name={p.work.name} mode="viewer" eager />
        </section>

        <section className="pj-body">
          <div className="wrap3 pj-grid">
            <p className="lbl mono">
              <span>(01)</span> {t.idea}
            </p>
            <p className="pj-sum">{p.summary}</p>
          </div>
          <div className="wrap3 pj-grid pj-idea">
            <p className="lbl mono">
              <span>(02)</span> {t.concept}
            </p>
            <p>{p.idea}</p>
          </div>
          <div className="wrap3 pj-grid">
            <p className="lbl mono">
              <span>(03)</span> {t.sections}
            </p>
            <ol className="pj-secs">
              {p.sections.map((sec, i) => (
                <li key={sec} data-in>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  {sec}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pj-out">
          <div className="wrap3">
            <p className="pj-note">{t.note(p.work.name)}</p>
            <div className="pj-actions">
              <a href={demoHref(p.key)} target="_blank" rel="noopener" className="btn btn-dark" data-track="portfolio_click" data-track-label={p.key}>
                {t.live} <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-accent" data-track="cta_click" data-track-label={`get-${p.key}`}>
                {t.want} <ArrowRight aria-hidden="true" />
              </a>
              {industry && (
                <Link href={industry.path} className="btn btn-line">
                  {t.industryLink(industry)} <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </section>

        <Link href={projectPathIn(next.key, lang)} className="pj-next" data-theme="dark" data-cursor={t.nextCursor} data-pt={next.work.name} style={{ "--tone": next.tone } as CSSProperties}>
          <span className="mono">{t.next}</span>
          <span className="disp">{next.work.name}</span>
          <span className="mono">{next.industry}</span>
        </Link>
        <ContactSection data={data} source={path} title={t.contactTitle} text={t.contactText(p.work.name)} lang={lang} />
      </main>
      <SiteFooter data={data} lang={lang} />
      <JsonLd
        data={breadcrumbLd([
          { name: t.work, path: work },
          { name: p.work.name, path },
        ])}
      />
    </>
  );
}
