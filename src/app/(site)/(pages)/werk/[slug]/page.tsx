import { seoMeta } from "@/lib/site/seo-meta";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { DemoPreview } from "@/components/site/demo-preview";
import { ContactSection, JsonLd, SiteFooter } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import { Words } from "@/components/site/split";
import { INDUSTRIES } from "@/lib/site/landing";
import { PROJECTS, projectByKey, projectPath } from "@/lib/site/projects";
import { breadcrumbLd } from "@/lib/site/seo";
import { demoHref, shot } from "@/lib/site/work";
import { getSiteData } from "@/server/site";
import "@/components/site/work.css";

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.key }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = projectByKey((await params).slug);
  if (!p) return {};
  const base = `${p.work.name}: demo-website voor ${p.industry.toLowerCase()}. ${p.line}`;
  const more = " Bekijk het ontwerp op desktop en mobiel en open de live demo.";
  return seoMeta({
    // Within 60 characters, so Google shows the whole title: the long form when it fits.
    title: [`${p.work.name}: demo-website ${p.industry.toLowerCase()} | HOPI`, `${p.work.name}: demo-website | HOPI`].find((t) => t.length <= 60) ?? `${p.work.name} | HOPI`,
    description: (base + more).length <= 158 ? base + more : base.slice(0, 158),
    path: projectPath(p.key),
    image: shot(p.key, "d-1440"),
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = projectByKey((await params).slug);
  if (!p) notFound();
  const data = await getSiteData();
  const index = PROJECTS.findIndex((x) => x.key === p.key);
  const next = projectByKey(PROJECTS[(index + 1) % PROJECTS.length].key)!;
  const industry = INDUSTRIES.find((l) => l.path === `/website-laten-maken/${p.work.industry}`);
  const tone = { "--tone": p.tone, "--on": p.on } as CSSProperties;
  return (
    <>
      <SiteHeader />
      <main id="inhoud" className="m-flush">
        <section className="pj-hero" data-theme="dark" style={tone}>
          <div className="wrap3">
            <p className="lbl mono">
              <Link href="/werk">Werk</Link> / <span>Demo-website</span>
            </p>
            <h1 className="disp" data-in>
              <Words text={p.work.name} />
            </h1>
            <p className="pj-line">{p.line}</p>
            <div className="pj-actions pj-actions-top">
              <a href={demoHref(p.key)} target="_blank" rel="noopener" className="btn btn-accent" data-track="portfolio_click" data-track-label={p.key}>
                Bekijk live demo <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-line" data-track="cta_click" data-track-label={`get-${p.key}`}>
                Ik wil deze website <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <dl className="pj-meta">
              <div>
                <dt className="mono">Branche</dt>
                <dd>
                  {p.industry}, {p.city}
                </dd>
              </div>
              <div>
                <dt className="mono">Typografie</dt>
                <dd>{p.type}</dd>
              </div>
              <div>
                <dt className="mono">Soort project</dt>
                <dd>Demo voor een fictief bedrijf. Geen klantproject.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="pj-view" style={tone} aria-label="Voorvertoning">
          <DemoPreview slug={p.key} name={p.work.name} mode="viewer" eager />
        </section>

        <section className="pj-body">
          <div className="wrap3 pj-grid">
            <p className="lbl mono">
              <span>(01)</span> Het idee
            </p>
            <p className="pj-sum">{p.summary}</p>
          </div>
          <div className="wrap3 pj-grid pj-idea">
            <p className="lbl mono">
              <span>(02)</span> Ontwerpconcept
            </p>
            <p>{p.idea}</p>
          </div>
          <div className="wrap3 pj-grid">
            <p className="lbl mono">
              <span>(03)</span> Wat erin zit
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
            <p className="pj-note">
              {p.work.name} is een demo-website voor een fictief bedrijf, ontworpen en gebouwd door HOPI om te laten zien wat we leveren. Namen, prijzen, recensies en contactgegevens in het ontwerp zijn voorbeeldinhoud, en formulieren versturen niets. Jouw website maken we met je eigen naam, diensten, foto&apos;s en stijl.
            </p>
            <div className="pj-actions">
              <a href={demoHref(p.key)} target="_blank" rel="noopener" className="btn btn-dark" data-track="portfolio_click" data-track-label={p.key}>
                Bekijk live demo <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-accent" data-track="cta_click" data-track-label={`get-${p.key}`}>
                Ik wil deze website <ArrowRight aria-hidden="true" />
              </a>
              {industry && (
                <Link href={industry.path} className="btn btn-line">
                  Website voor {industry.label.toLowerCase()} <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </section>

        <Link href={projectPath(next.key)} className="pj-next" data-theme="dark" data-cursor="Volgende" data-pt={next.work.name} style={{ "--tone": next.tone } as CSSProperties}>
          <span className="mono">Volgend project</span>
          <span className="disp">{next.work.name}</span>
          <span className="mono">{next.industry}</span>
        </Link>
        <ContactSection data={data} source={projectPath(p.key)} title="Deze website voor *jouw bedrijf*?" text={`Vertel kort over je bedrijf. We maken een ontwerp in de stijl van ${p.work.name}, met je eigen naam, diensten en foto's. Gratis en vrijblijvend: je betaalt pas als het ontwerp bevalt en je een pakket kiest.`} />
      </main>
      <SiteFooter data={data} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Werk", path: "/werk" },
          { name: p.work.name, path: projectPath(p.key) },
        ])}
      />
    </>
  );
}
