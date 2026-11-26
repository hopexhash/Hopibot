import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ContactSection, CtaBand, JsonLd, SiteFooter } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import { Words } from "@/components/site/split";
import { allProjects, projectPath } from "@/lib/site/projects";
import { breadcrumbLd, pageMeta } from "@/lib/site/seo";
import { getSiteData } from "@/server/site";
import "@/components/site/work.css";

const PATH = "/werk";
export const metadata = pageMeta({
  title: "Werk: conceptontwerpen voor websites | HOPI",
  description: "Bekijk ons werk: conceptontwerpen voor websites, van restaurant tot tandartspraktijk. Elk met eigen letters en kleuren, en een demo om door te klikken.",
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
              <span>(Werk)</span> {projects.length} conceptprojecten
            </p>
            <h1 className="disp" data-in>
              <Words text="Werk dat blijft hangen" />
            </h1>
            <p className="wk-lead">
              Elke website krijgt bij ons zijn eigen gezicht. Dit zijn conceptprojecten: ontwerpen die wij maakten voor fictieve bedrijven, om te laten zien wat we leveren. Het zijn geen klantprojecten. Elk ontwerp is een werkende website waar je doorheen kunt klikken.
            </p>
          </div>
        </section>
        <section className="wk-list" aria-label="Projecten">
          <ol className="wrap3">
            {projects.map((p, i) => (
              <li key={p.key} data-in={i > 1 ? "" : undefined}>
                <Link href={projectPath(p.key)} className="wk-row" data-peek={`/site/work/${p.key}-d-720.webp`} data-pt={p.work.name}>
                  <span className="mono wk-n">{String(i + 1).padStart(2, "0")}</span>
                  <h2>{p.work.name}</h2>
                  <span className="mono wk-ind">{p.industry}</span>
                  <span className="mono wk-svc">{p.services.join(" / ")}</span>
                  <img className="wk-thumb" src={`/site/work/${p.key}-d-720.webp`} alt={`Conceptontwerp: website voor ${p.industry.toLowerCase()} ${p.work.name}`} width={720} height={450} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : undefined} decoding="async" />
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <CtaBand location={PATH} title="Jouw website als volgende?" />
        <ContactSection data={data} source={PATH} />
      </main>
      <SiteFooter data={data} />
      <JsonLd data={breadcrumbLd([{ name: "Werk", path: PATH }])} />
    </>
  );
}
