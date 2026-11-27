import { seoMeta } from "@/lib/site/seo-meta";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { DemoPreview } from "@/components/site/demo-preview";
import { ContactSection, CtaBand, JsonLd, SiteFooter } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import { Words } from "@/components/site/split";
import { allProjects, projectPath } from "@/lib/site/projects";
import { breadcrumbLd } from "@/lib/site/seo";
import { demoHref } from "@/lib/site/work";
import { getSiteData } from "@/server/site";
import "@/components/site/work.css";

const PATH = "/werk";
const COUNT = ["nul", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen", "tien", "elf", "twaalf"][allProjects().length] ?? String(allProjects().length);
export const generateMetadata = () =>
  seoMeta({
  title: `Werk: ${COUNT} complete demo-websites | HOPI`,
  description: `Bekijk ons werk: ${COUNT} complete demo-websites, van restaurant tot advocatenkantoor. Elk met een eigen ontwerp, op desktop en mobiel, en live te bekijken.`,
  path: PATH,
});

export default async function WorkPage() {
  const data = await getSiteData();
  const projects = allProjects();
  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        <section className="wk-hero">
          <div className="wrap3">
            <p className="lbl mono">
              <span>(Werk)</span> {projects.length} demo-websites
            </p>
            <h1 className="disp" data-in>
              <Words text="Werk dat blijft hangen" />
            </h1>
            <p className="wk-lead">
              {COUNT.charAt(0).toUpperCase() + COUNT.slice(1)} complete websites, elk met een eigen ontwerp, eigen letters en een eigen karakter. Het zijn demo&apos;s: wij ontwierpen en bouwden ze voor fictieve bedrijven, om te laten zien wat we leveren. Het zijn geen klantprojecten. Elke website werkt echt, dus klik gerust door alle pagina-onderdelen, ook op je telefoon.
            </p>
            <nav className="pf-index mono" aria-label="Alle demo's">
              {projects.map((p, i) => (
                <a key={p.key} href={`#${p.key}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span> {p.industry}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="pf-list" aria-label="Demo-websites">
          {projects.map((p, i) => (
            <article key={p.key} id={p.key} className="pf" style={{ "--tone": p.tone, "--on": p.on } as CSSProperties}>
              <div className="pf-media" data-in data-p>
                <DemoPreview slug={p.key} name={p.work.name} mode="card" eager={i === 0} />
              </div>
              <div className="pf-info">
                <p className="mono pf-n">
                  <span>{String(i + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")} · Demo
                </p>
                <h2>{p.work.name}</h2>
                <p className="mono pf-cat">
                  {p.industry} · {p.city}
                </p>
                <p className="pf-line">{p.line}</p>
                <p className="pf-sum">{p.summary}</p>
                <dl className="pf-facts">
                  <div>
                    <dt className="mono">Ontwerpconcept</dt>
                    <dd>{p.idea}</dd>
                  </div>
                  <div>
                    <dt className="mono">Typografie</dt>
                    <dd>{p.type}</dd>
                  </div>
                </dl>
                <div className="pf-actions">
                  <a href={demoHref(p.key)} target="_blank" rel="noopener" className="btn btn-dark" data-track="portfolio_click" data-track-label={p.key} data-track-location={PATH}>
                    Bekijk live demo <ArrowUpRight aria-hidden="true" />
                  </a>
                  <Link href={`${projectPath(p.key)}#contact`} className="btn btn-accent" data-track="cta_click" data-track-label={`get-${p.key}`} data-track-location={PATH} data-pt={p.work.name}>
                    Ik wil deze website <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
                <Link href={projectPath(p.key)} className="pf-more mono" data-pt={p.work.name}>
                  Over dit ontwerp
                </Link>
              </div>
            </article>
          ))}
        </section>
        <CtaBand location={PATH} title="Jouw website als volgende?" />
        <ContactSection data={data} source={PATH} />
      </main>
      <SiteFooter data={data} />
      <JsonLd data={breadcrumbLd([{ name: "Werk", path: PATH }])} />
    </>
  );
}
