import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ContactSection, JsonLd, SiteFooter } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import { Words } from "@/components/site/split";
import { INDUSTRIES } from "@/lib/site/landing";
import { PROJECTS, projectByKey, projectPath } from "@/lib/site/projects";
import { breadcrumbLd, pageMeta } from "@/lib/site/seo";
import { demoHref } from "@/lib/site/work";
import { getSiteData } from "@/server/site";
import "@/components/site/work.css";

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.key }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = projectByKey((await params).slug);
  if (!p) return {};
  const base = `Conceptontwerp voor een ${p.industry.toLowerCase()}: ${p.work.note.replace(/\.$/, "").toLowerCase()}.`;
  const more = " Bekijk het ontwerp en klik door de werkende demo.";
  return pageMeta({
    title: `${p.work.name}: concept website | HOPI`,
    description: (base + more).length <= 158 ? base + more : `${base} Bekijk de werkende demo.`,
    path: projectPath(p.key),
    image: `/site/work/${p.key}-d-1440.webp`,
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
              <Link href="/werk">Werk</Link> / <span>Conceptproject</span>
            </p>
            <h1 className="disp" data-in>
              <Words text={p.work.name} />
            </h1>
            <dl className="pj-meta">
              <div>
                <dt className="mono">Branche</dt>
                <dd>{p.industry}</dd>
              </div>
              <div>
                <dt className="mono">Diensten</dt>
                <dd>{p.services.join(", ")}</dd>
              </div>
              <div>
                <dt className="mono">Soort project</dt>
                <dd>Concept voor een fictief bedrijf. Geen klantproject.</dd>
              </div>
            </dl>
          </div>
          <div className="pj-cover" data-p>
            <div>
              <img
              src={`/site/work/${p.key}-d-1440.webp`}
              srcSet={`/site/work/${p.key}-d-720.webp 720w, /site/work/${p.key}-d-1440.webp 1440w`}
              sizes="100vw"
              alt={`Conceptontwerp: de website van ${p.work.name} op een groot scherm`}
              width={1440}
              height={900}
              fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section className="pj-body">
          <div className="wrap3 pj-grid">
            <p className="lbl mono">
              <span>(01)</span> Het idee
            </p>
            <p className="pj-sum">{p.summary}</p>
          </div>
          <div className="wrap3">
            <ol className="pj-dec">
              {p.decisions.map((d, i) => (
                <li key={d.title} data-in>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <h2>{d.title}</h2>
                  <p>{d.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pj-shots" style={tone} data-p>
          <figure className="pj-long">
            <img src={`/site/work/${p.key}-tall-960.webp`} alt={`Conceptontwerp: de hele website van ${p.work.name}, van boven naar beneden`} width={960} height={1800} loading="lazy" decoding="async" />
          </figure>
          <figure className="pj-phone">
            <img src={`/site/work/${p.key}-m-780.webp`} alt={`Conceptontwerp: de website van ${p.work.name} op een telefoon`} width={780} height={1688} loading="lazy" decoding="async" />
          </figure>
        </section>

        <section className="pj-out">
          <div className="wrap3">
            <p className="pj-note">Dit is een conceptontwerp voor een fictief bedrijf, gemaakt door HOPI om te laten zien wat we leveren. Naam, adres en telefoonnummer in het ontwerp zijn verzonnen. Jouw eigen ontwerp maken we met je eigen naam, diensten en stijl.</p>
            <div className="pj-actions">
              <a href={demoHref(p.key)} target="_blank" rel="noopener nofollow" className="btn btn-dark" data-track="portfolio_click" data-track-label={p.key}>
                Bekijk de werkende demo <ArrowUpRight aria-hidden="true" />
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
        <ContactSection data={data} source={projectPath(p.key)} />
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
