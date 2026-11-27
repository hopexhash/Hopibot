import { Check } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs, ContactSection, HeroAmbient, JsonLd, Related, SiteFooter, Steps } from "@/components/site/parts";
import { rich } from "@/components/site/rich";
import { SiteHeader } from "@/components/site/site-client";
import { ALL_LANDINGS } from "@/lib/site/landing";
import { BRAND_DESCRIPTION, breadcrumbLd } from "@/lib/site/seo";
import { seoMeta } from "@/lib/site/seo-meta";
import { getSiteData } from "@/server/site";

const PATH = "/over-ons";
const CRUMBS = [{ name: "Over ons", path: PATH }];
const DESCRIPTION = "Wie HOPI is, wat we maken, hoe we werken met AI en mensen, voor wie, en waarom je bij ons eerst je ontwerp ziet en dan pas betaalt.";

export const generateMetadata = () =>
  seoMeta({
    title: "Over HOPI: webdesign, eerst zien dan betalen | HOPI",
    description: DESCRIPTION,
    path: PATH,
  });

/**
 * Who HOPI is. Everything on this page can be checked: no team photos of people who do not
 * work here, no client numbers, no awards. Company details appear once they are filled in
 * under Settings.
 */
const WHY = [
  {
    title: "Je ziet eerst je eigen ontwerp",
    text: "Geen offerte waar je op moet vertrouwen. Je beoordeelt een ontwerp met je eigen naam, diensten en stijl, en beslist dan pas.",
  },
  {
    title: "Vaste prijzen",
    text: "Websites hebben een vast bedrag, dat je vooraf kent. Staat het op de [prijzenpagina](/prijzen), dan betaal je dat ook.",
  },
  {
    title: "Twaalf eigen ontwerpen",
    text: "Geen thema dat duizend andere bedrijven ook gebruiken: elke website begint bij een van onze eigen ontwerpen, die je in [ons werk](/werk) kunt doorklikken.",
  },
  {
    title: "Gemaakt voor de telefoon",
    text: "We ontwerpen eerst voor mobiel, omdat de meeste bezoekers je daar vinden, en testen elke pagina op telefoon, tablet en computer.",
  },
  {
    title: "Eerlijke inhoud",
    text: "Geen verzonnen reviews, cijfers of beloftes. Op je website staat alleen wat over jouw bedrijf klopt.",
  },
  {
    title: "Online zonder gedoe",
    text: "Hosting, beveiliging, back-ups en kleine wijzigingen regelen we met een [onderhoudsabonnement](/website-onderhoud).",
  },
];

const NOT = [
  "We beloven geen eerste plek in Google. Dat kan niemand eerlijk beloven; wel bouwen we een snelle, nette basis.",
  "We schrijven geen reviews of klantverhalen die niet bestaan.",
  "We vragen geen aanbetaling voor een ontwerp dat je nog niet hebt gezien.",
];

export default async function AboutPage() {
  const data = await getSiteData();
  const v = data.prices;
  const industries = ALL_LANDINGS.filter((l) => l.kind === "industry" || l.kind === "audience");
  const facts = [
    data.kvk ? ["KvK-nummer", data.kvk] : null,
    data.address ? ["Adres", data.address] : null,
    data.email ? ["E-mail", data.email] : null,
    data.phone ? ["Telefoon", data.phone] : null,
  ].filter((x): x is string[] => x !== null);
  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        <section className="hero page-hero simple">
          <HeroAmbient />
          <div className="wrap">
            <Breadcrumbs crumbs={CRUMBS} />
            <span className="eyebrow enter">Over ons</span>
            <h1 className="enter">
              Websites die je <em>eerst</em> ziet, en dan pas betaalt
            </h1>
            <p className="lead enter">{BRAND_DESCRIPTION} We maken websites voor zzp&apos;ers en het mkb, van restaurants en kappers tot bouwbedrijven en advocaten.</p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>Wat HOPI doet</h2>
              <p>
                We ontwerpen en bouwen websites voor ondernemers, zetten ze online en houden ze daarna bij. Een website heeft bij ons een vaste prijs, vanaf {v.from} exclusief {v.vat} btw. Webshops en
                maatwerk maken we op offerte. Wat een website precies kost en wat erbij hoort, staat op de pagina <Link href="/prijzen">prijzen</Link>; hoe een traject verloopt lees je bij{" "}
                <Link href="/website-laten-maken">website laten maken</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section tint">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>Hoe we werken: software voor de snelheid, mensen voor het oordeel</h2>
              <p>
                Onze eigen software zoekt op wat er openbaar over je bedrijf bekend is en zet een eerste versie van de teksten in een van onze ontwerpen. Daarbij gebruiken we een AI-model. De software
                test elke pagina automatisch op telefoon, tablet en computer. Daarna kijkt een mens van HOPI alles na, en pas dan krijg jij het ontwerp te zien. Verzonnen feiten komen er niet in: wat
                we niet zeker weten, laten we weg of vragen we je.
              </p>
              <p>
                Zo kunnen we je snel en gratis een ontwerp laten zien, zonder dat de kwaliteit van het oordeel bij een machine ligt. Meer hierover lees je op{" "}
                <Link href="/ai-website-laten-maken">AI website laten maken</Link>.
              </p>
            </div>
          </div>
        </section>

        <Steps />

        <section className="section">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>Waarom ondernemers voor HOPI kiezen</h2>
            </div>
            <div className="cards stagger" data-reveal>
              {WHY.map((w) => (
                <div key={w.title} className="card">
                  <h3>{w.title}</h3>
                  <p>{rich(w.text, v)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section tint">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>Voor wie we websites maken</h2>
              <p>Ondernemers in heel Nederland en België. We werken op afstand: je hoeft nergens langs te komen, en het ontwerp bekijk je gewoon op je eigen telefoon of computer.</p>
            </div>
            <ul className="checks stagger" data-reveal>
              {industries.map((l) => (
                <li key={l.path}>
                  <Check strokeWidth={2.4} aria-hidden="true" />
                  <Link href={l.path}>{l.kind === "industry" ? `Website voor ${l.label.toLowerCase()}` : `Website ${l.label.toLowerCase()}`}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>Wat we bewust niet doen</h2>
            </div>
            <ul className="checks stagger" data-reveal>
              {NOT.map((x) => (
                <li key={x}>
                  <Check strokeWidth={2.4} aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
            {facts.length > 0 && (
              <dl className="facts" data-reveal>
                {facts.map(([k, val]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{val}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        <Related paths={["/werk", "/website-laten-maken", "/prijzen", "/blog"]} />
        <ContactSection data={data} source={PATH} />
      </main>
      <SiteFooter data={data} />
      <JsonLd
        data={breadcrumbLd(CRUMBS, {
          type: "AboutPage",
          description: DESCRIPTION,
        })}
      />
    </>
  );
}
