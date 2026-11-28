import { Check } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs, ContactSection, HeroAmbient, JsonLd, Related, SiteFooter, Steps } from "@/components/site/parts";
import { rich } from "@/components/site/rich";
import { SiteHeader } from "@/components/site/site-client";
import { landingsOf } from "@/lib/site/content";
import type { Locale } from "@/lib/site/i18n";
import { BRAND_DESCRIPTION, breadcrumbLd } from "@/lib/site/seo";
import { seoMeta } from "@/lib/site/seo-meta";
import { getSiteData } from "@/server/site";

const PATH = { nl: "/over-ons", en: "/en/about" };

/**
 * Who HOPI is. Everything on this page can be checked: no team photos of people who do not
 * work here, no client numbers, no awards. Company details appear once they are filled in
 * under Settings.
 */
const T = {
  nl: {
    title: "Over HOPI: webdesign, eerst zien dan betalen | HOPI",
    description: "Wie HOPI is, wat we maken, hoe we werken, voor wie, en waarom je bij ons eerst gratis je ontwerp ziet en dan pas betaalt.",
    crumb: "Over ons",
    eyebrow: "Over ons",
    h1: ["Websites die je ", "eerst", " ziet, en dan pas betaalt"],
    brand: BRAND_DESCRIPTION,
    leadMore: " We maken websites voor zzp'ers en het mkb, van restaurants en kappers tot bouwbedrijven en advocaten.",
    whatH: "Wat HOPI doet",
    what: (from: string, vat: string) => (
      <>
        We ontwerpen en bouwen websites voor ondernemers, zetten ze online en houden ze daarna bij. Een website heeft bij ons een vaste prijs, vanaf {from} exclusief {vat} btw. Webshops en maatwerk maken we op offerte. Wat een website precies kost en wat erbij hoort, staat op de pagina <Link href="/prijzen">prijzen</Link>; hoe een traject verloopt lees je bij{" "}
        <Link href="/website-laten-maken">website laten maken</Link>.
      </>
    ),
    howH: "Hoe we werken",
    how1: "Je vertelt ons kort over je bedrijf. Wij bekijken wat er al over je te vinden is, zoals je huidige website en je openingstijden, en maken een eerste ontwerp in een van onze eigen ontwerpen: met je eigen naam, diensten en stijl. Elke pagina testen we op telefoon, tablet en computer, en we controleren alles voordat jij het ziet. Verzonnen feiten komen er niet in: wat we niet zeker weten, laten we weg of vragen we je.",
    how2: ["Zo kun je gratis beoordelen hoe je nieuwe website eruitziet, voordat je ergens aan vastzit. Hoe een traject verder verloopt, lees je bij ", "website laten maken", "."],
    whyH: "Waarom ondernemers voor HOPI kiezen",
    why: [
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
    ],
    forH: "Voor wie we websites maken",
    forText: "Ondernemers in heel Nederland en België. We werken op afstand: je hoeft nergens langs te komen, en het ontwerp bekijk je gewoon op je eigen telefoon of computer.",
    industry: (label: string) => `Website voor ${label.toLowerCase()}`,
    audience: (label: string) => `Website ${label.toLowerCase()}`,
    notH: "Wat we bewust niet doen",
    not: [
      "We beloven geen eerste plek in Google. Dat kan niemand eerlijk beloven; wel bouwen we een snelle, nette basis.",
      "We schrijven geen reviews of klantverhalen die niet bestaan.",
      "We vragen geen aanbetaling voor een ontwerp dat je nog niet hebt gezien.",
    ],
    facts: { kvk: "KvK-nummer", address: "Adres", email: "E-mail", phone: "Telefoon" },
    related: ["/werk", "/website-laten-maken", "/prijzen", "/contact"],
  },
  en: {
    title: "About HOPI: web design, see first and then pay | HOPI",
    description: "Who HOPI is, what we make, how we work, for whom, and why with us you first see your design for free and only then pay.",
    crumb: "About us",
    eyebrow: "About us",
    h1: ["Websites you see ", "first", ", and only then pay for"],
    brand: "HOPI is a web design agency for businesses in the Netherlands and Belgium. You first see a free design of your own website and only pay if you like it.",
    leadMore: " We make websites for freelancers and small businesses, from restaurants and hairdressers to construction companies and lawyers.",
    whatH: "What HOPI does",
    what: (from: string, vat: string) => (
      <>
        We design and build websites for businesses, put them online and keep them up to date afterwards. A website with us has a fixed price, from {from} excluding {vat} VAT. We make online shops and custom work on a quotation basis. What a website costs exactly and what is included is on the <Link href="/en/pricing">pricing</Link> page; you can read how the process works on{" "}
        <Link href="/en/website-design">website design</Link>.
      </>
    ),
    howH: "How we work",
    how1: "You tell us briefly about your business. We look at what can already be found about you, such as your current website and your opening hours, and make a first design in one of our own designs: with your own name, services and style. We test every page on phone, tablet and computer, and we check everything before you see it. Made-up facts do not go in: what we are not sure about, we leave out or ask you.",
    how2: ["That way you can judge for free what your new website looks like, before you are tied to anything. You can read how the rest of the process works on ", "website design", "."],
    whyH: "Why businesses choose HOPI",
    why: [
      {
        title: "You see your own design first",
        text: "No quotation you have to take on trust. You judge a design with your own name, services and style, and only then decide.",
      },
      {
        title: "Fixed prices",
        text: "Websites have a fixed amount that you know in advance. If it is on the [pricing page](/en/pricing), that is what you pay.",
      },
      {
        title: "Twelve designs of our own",
        text: "No theme that a thousand other businesses use as well: every website starts from one of our own designs, which you can click through in [our work](/en/work).",
      },
      {
        title: "Made for the phone",
        text: "We design for mobile first, because that is where most visitors find you, and we test every page on phone, tablet and computer.",
      },
      {
        title: "Honest content",
        text: "No made-up reviews, figures or promises. Your website only says what is true about your business.",
      },
      {
        title: "Online without the hassle",
        text: "We take care of hosting, security, backups and small changes with a [maintenance subscription](/en/website-maintenance).",
      },
    ],
    forH: "Who we make websites for",
    forText: "Businesses throughout the Netherlands and Belgium. We work remotely: you do not have to come in anywhere, and you simply view the design on your own phone or computer.",
    industry: (label: string) => `Website for ${label.toLowerCase()}`,
    audience: (label: string) => label,
    notH: "What we deliberately do not do",
    not: [
      "We do not promise first place in Google. Nobody can honestly promise that; what we do is build a fast, clean foundation.",
      "We do not write reviews or client stories that do not exist.",
      "We do not ask for a deposit for a design you have not seen yet.",
    ],
    facts: { kvk: "Chamber of Commerce (KvK) number", address: "Address", email: "Email", phone: "Phone" },
    related: ["/en/work", "/en/website-design", "/en/pricing", "/en/contact"],
  },
};

export function aboutMetadata(lang: Locale) {
  const t = T[lang];
  return seoMeta({ title: t.title, description: t.description, path: PATH[lang] });
}

export async function AboutPage({ lang }: { lang: Locale }) {
  const data = await getSiteData();
  const t = T[lang];
  const path = PATH[lang];
  const crumbs = [{ name: t.crumb, path }];
  const v = data.prices;
  const industries = landingsOf(lang).filter((l) => l.kind === "industry" || l.kind === "audience");
  const facts = [
    data.kvk ? [t.facts.kvk, data.kvk] : null,
    data.address ? [t.facts.address, data.address] : null,
    data.email ? [t.facts.email, data.email] : null,
    data.phone ? [t.facts.phone, data.phone] : null,
  ].filter((x): x is string[] => x !== null);
  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        <section className="hero page-hero simple">
          <HeroAmbient />
          <div className="wrap">
            <Breadcrumbs crumbs={crumbs} lang={lang} />
            <span className="eyebrow enter">{t.eyebrow}</span>
            <h1 className="enter">
              {t.h1[0]}
              <em>{t.h1[1]}</em>
              {t.h1[2]}
            </h1>
            <p className="lead enter">
              {t.brand}
              {t.leadMore}
            </p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>{t.whatH}</h2>
              <p>{t.what(v.from, v.vat)}</p>
            </div>
          </div>
        </section>

        <section className="section tint">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>{t.howH}</h2>
              <p>{t.how1}</p>
              <p>
                {t.how2[0]}
                <Link href={lang === "en" ? "/en/website-design" : "/website-laten-maken"}>{t.how2[1]}</Link>
                {t.how2[2]}
              </p>
            </div>
          </div>
        </section>

        <Steps lang={lang} />

        <section className="section">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>{t.whyH}</h2>
            </div>
            <div className="cards stagger" data-reveal>
              {t.why.map((w) => (
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
              <h2>{t.forH}</h2>
              <p>{t.forText}</p>
            </div>
            <ul className="checks stagger" data-reveal>
              {industries.map((l) => (
                <li key={l.path}>
                  <Check strokeWidth={2.4} aria-hidden="true" />
                  <Link href={l.path}>{l.kind === "industry" ? t.industry(l.label) : t.audience(l.label)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>{t.notH}</h2>
            </div>
            <ul className="checks stagger" data-reveal>
              {t.not.map((x) => (
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

        <Related paths={t.related} lang={lang} />
        <ContactSection data={data} source={path} lang={lang} />
      </main>
      <SiteFooter data={data} lang={lang} />
      <JsonLd
        data={breadcrumbLd(crumbs, {
          type: "AboutPage",
          description: t.description,
        })}
      />
    </>
  );
}
