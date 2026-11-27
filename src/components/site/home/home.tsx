import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { HOME, HOME_FAQ, PROCESS, SERVICES } from "@/lib/site/home";
import { allProjects, projectPath, selectedProjects } from "@/lib/site/projects";
import { faqLd, plain, serviceLd } from "@/lib/site/seo";
import type { SiteData } from "@/server/site";
import { ContactSection, Faq, JsonLd, SiteFooter } from "../parts";
import { rich } from "../rich";
import { SiteHeader } from "../site-client";
import { CharLines, Words } from "../split";
import { HeroSculpture } from "./hero-sculpture";
import "./home.css";

const no = (i: number) => String(i + 1).padStart(2, "0");

/** The homepage: hero, introduction, selected work, services, why HOPI, process, closing. */
export function Home({ data }: { data: SiteData }) {
  const v = data.prices;
  const projects = selectedProjects();
  const introWords = HOME.intro.statement.split(" ").length;
  return (
    <>
      <SiteHeader />
      <main id="inhoud" className="m-flush">
        {/* 1 · Hero */}
        <section className="hx" data-theme="dark">
          <div className="hx-stand" aria-hidden="true" />
          <HeroSculpture />
          <div className="hx-in">
            <p className="hx-kicker mono">
              <i aria-hidden="true" /> {HOME.kicker}
            </p>
            <p className="hx-st" lang="en">
              <CharLines lines={HOME.statement} />
            </p>
            <div className="hx-foot">
              <div className="hx-what">
                <h1>{HOME.h1}</h1>
                <p>{HOME.lead}</p>
              </div>
              <div className="hx-cta">
                <a href="#contact" className="btn btn-accent" data-magnetic="0.25" data-track="cta_click" data-track-label="hero" data-track-location="/">
                  {HOME.cta} <ArrowRight aria-hidden="true" />
                </a>
                <a href="#werk" className="btn btn-ghost">
                  {HOME.cta2}
                </a>
              </div>
              <ul className="hx-disc mono" aria-label="Disciplines">
                {HOME.disciplines.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 2 · Introduction: the statement lights up word by word */}
        <section className="ix" id="intro">
          <div className="wrap3">
            <p className="lbl mono">
              <span>(01)</span> {HOME.intro.label}
            </p>
            <h2 className="ix-st" data-p>
              <Words text={HOME.intro.statement} total={introWords} />
            </h2>
            <div className="ix-row">
              <p className="ix-text" data-in>
                {HOME.intro.text}
              </p>
              <dl className="ix-facts" data-in>
                {HOME.intro.facts
                  .filter((f) => f.value !== "{from}" || data.fromCents !== null)
                  .map((f) => (
                    <div key={f.label}>
                      <dt className="mono">{f.label}</dt>
                      <dd>{plain(f.value, v)}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </div>
          <svg className="ix-seal" viewBox="0 0 200 200" aria-hidden="true" data-p>
            <defs>
              <path id="ix-circle" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" />
            </defs>
            <text>
              <textPath href="#ix-circle">HOPI · DIGITAL AGENCY · WEBDESIGN · DEVELOPMENT · AI · </textPath>
            </text>
            <circle cx="100" cy="100" r="16" />
          </svg>
        </section>

        {/* 3 · Selected work: scrolls sideways on large screens, swipes on phones */}
        <section className="wx" id="werk" data-theme="dark">
          <div className="wrap3 wx-head">
            <p className="lbl mono">
              <span>(02)</span> {HOME.work.label}
            </p>
            <h2 className="disp" data-in>
              <span className="w">
                <span className="wi">{HOME.work.title[0]}</span>
              </span>{" "}
              <span className="w">
                <span className="wi" style={{ "--i": 1 } as CSSProperties}>
                  {HOME.work.title[1]}
                  <sup className="mono">({no(projects.length - 1)})</sup>
                </span>
              </span>
            </h2>
            <p className="wx-note">{HOME.work.note}</p>
          </div>
          <div className="wx-pin" data-hscroll data-p="pin">
            <div className="wx-sticky">
              <ol className="wx-track" data-hscroll-track>
                {projects.map((p, i) => (
                  <li key={p.key} className="wx-item" style={{ "--tone": p.tone, "--on": p.on } as CSSProperties}>
                    <Link href={projectPath(p.key)} className="wx-card" data-cursor="Bekijk" data-pt={p.work.name}>
                      <div className="wx-media">
                        <img
                          src={`/site/work/${p.key}-d-1440.webp`}
                          srcSet={`/site/work/${p.key}-d-720.webp 720w, /site/work/${p.key}-d-1440.webp 1440w`}
                          sizes="(min-width: 1000px) 56vw, 84vw"
                          alt={`Conceptontwerp: website voor ${p.industry.toLowerCase()} ${p.work.name}`}
                          width={1440}
                          height={900}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="chip mono">Concept</span>
                      </div>
                      <div className="wx-meta">
                        <span className="mono wx-n">{no(i)}</span>
                        <div>
                          <h3>{p.work.name}</h3>
                          <p className="mono wx-tags">
                            {p.industry} — {p.services.join(" / ")}
                          </p>
                        </div>
                        <p className="wx-desc">{p.summary}</p>
                      </div>
                    </Link>
                  </li>
                ))}
                <li className="wx-item wx-end">
                  <Link href="/werk" className="wx-all" data-cursor="Open" data-pt="Werk">
                    <span className="mono">
                      {no(allProjects().length - 1)} conceptprojecten
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                    <span className="wx-all-t">{HOME.work.all}</span>
                  </Link>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* 4 · Services: an editorial list */}
        <section className="sx" id="diensten">
          <div className="wrap3 sx-grid">
            <div className="sx-head">
              <p className="lbl mono">
                <span>(03)</span> {HOME.services.label}
              </p>
              <h2 className="disp" data-in>
                <Words text={HOME.services.title} />
              </h2>
              <p>{HOME.services.text}</p>
            </div>
            <ol className="sx-list">
              {SERVICES.map((s, i) => (
                <li key={s.title} data-in>
                  <Link href={s.href} className="sx-row" data-pt={s.href.startsWith("/#") ? undefined : s.title}>
                    <span className="mono sx-n">{no(i)}</span>
                    <div className="sx-t">
                      <h3>{s.title}</h3>
                      <span className="mono" lang="en">
                        {s.en}
                      </span>
                    </div>
                    <div className="sx-d">
                      <p>{s.text}</p>
                      <p className="mono sx-tags">{s.tags.join(" · ")}</p>
                      <span className="sx-more">
                        {s.more} <ArrowUpRight aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="sx-note mono">{HOME.services.note}</p>
          </div>
        </section>

        {/* 5 · Why HOPI: four statements that stack */}
        <section className="yx" id="waarom" data-theme="dark">
          <div className="wrap3">
            <p className="lbl mono">
              <span>(04)</span> {HOME.why.label}
            </p>
            <h2 className="sr-only">Waarom ondernemers voor HOPI kiezen</h2>
          </div>
          <ol className="yx-stack">
            {HOME.why.items
              .filter((it) => !it.text.includes("{from}") || data.fromCents !== null)
              .map((it, i, all) => (
                <li key={it.title.join(" ")} className={`yx-card yx-${i % 4}`} style={{ "--i": i } as CSSProperties}>
                  <span className="mono">
                    {no(i)} / {no(all.length - 1)}
                  </span>
                  <h3>
                    {it.title[0]}
                    <br />
                    {it.title[1]}
                  </h3>
                  <p>{rich(it.text, v)}</p>
                </li>
              ))}
          </ol>
        </section>

        {/* 6 · Process: the number follows the step you are reading */}
        <section className="px" id="werkwijze" data-steps>
          <div className="wrap3 px-grid">
            <div className="px-side">
              <p className="lbl mono">
                <span>(05)</span> {HOME.process.label}
              </p>
              <h2 className="disp" data-in>
                <Words text={HOME.process.title} />
              </h2>
              <div className="px-num" aria-hidden="true">
                <span>0</span>
                <span className="px-roll">
                  <span className="px-strip">
                    {PROCESS.map((_, i) => (
                      <b key={i}>{i + 1}</b>
                    ))}
                  </span>
                </span>
              </div>
              <div className="px-bar" aria-hidden="true">
                <i />
              </div>
            </div>
            <ol className="px-list">
              {PROCESS.map((p, i) => (
                <li key={p.title} data-step-item>
                  <span className="mono">Stap {no(i)}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  {p.free && <em className="chip mono">Gratis</em>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Questions */}
        <section className="qx" id="vragen">
          <div className="wrap3 qx-grid">
            <div>
              <p className="lbl mono">
                <span>(06)</span> Vragen
              </p>
              <h2 className="disp" data-in>
                <Words text="Goed om te weten" />
              </h2>
            </div>
            <Faq items={HOME_FAQ} vars={v} />
          </div>
        </section>

        {/* 7 · Closing statement */}
        <section className="cx" data-theme="dark" data-p>
          <div className="wrap3">
            <p className="cx-st" lang="en" data-in>
              <CharLines lines={HOME.closing.statement} accentLast />
            </p>
            <div className="cx-row">
              <p>{HOME.closing.text}</p>
              <a href="#contact" className="cx-btn" data-magnetic="0.35" data-track="cta_click" data-track-label="closing" data-track-location="/">
                <span>{HOME.cta}</span>
                <i aria-hidden="true">
                  <ArrowDown />
                </i>
              </a>
            </div>
          </div>
        </section>
        <ContactSection data={data} source="/" title="Start een *project*" text="Vertel kort over je bedrijf en wat je nodig hebt. We nemen contact met je op en maken een ontwerp. Gratis en vrijblijvend: je betaalt pas als het ontwerp bevalt en je een pakket kiest." />
      </main>
      <SiteFooter data={data} />
      <JsonLd data={faqLd(HOME_FAQ.map((f) => ({ q: f.q, a: plain(f.a, data.prices) })))} />
      {SERVICES.map((s) => (
        <JsonLd key={s.title} data={serviceLd({ name: s.title, description: s.text, path: s.href.startsWith("/#") ? "/" : s.href, serviceType: s.title })} />
      ))}
    </>
  );
}
