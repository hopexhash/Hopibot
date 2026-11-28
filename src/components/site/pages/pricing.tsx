import { Check } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs, ContactSection, Faq, HeroAmbient, JsonLd, PriceCards, Related, SiteFooter, Steps } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import { eur } from "@/lib/catalog";
import { catalogText } from "@/lib/catalog.en";
import type { Locale } from "@/lib/site/i18n";
import { breadcrumbLd, faqLd, plain, serviceLd } from "@/lib/site/seo";
import { seoMeta } from "@/lib/site/seo-meta";
import { informal } from "@/lib/site/text";
import { getSiteData } from "@/server/site";

const PATH = { nl: "/prijzen", en: "/en/pricing" };

const FAQ = {
  nl: [
    { q: "Moet ik iets betalen voordat ik het ontwerp heb gezien?", a: "Nee. Het ontwerp vooraf is gratis en vrijblijvend. Je betaalt pas als je het ontwerp goed vindt en een pakket kiest." },
    { q: "Zijn de prijzen inclusief btw?", a: "De prijzen zijn exclusief {vat} btw. Je krijgt altijd vooraf een duidelijk overzicht van wat je betaalt." },
    { q: "Welke kosten komen er na de bouw nog bij?", a: "Om online te blijven heeft je website hosting nodig. Dat regelen wij met een abonnement vanaf {hosting} per maand. Daarnaast betaal je voor je domeinnaam. Extra's zoals een logo of een extra taal zijn optioneel." },
    { q: "Is dit een betaalbare of een goedkope website?", a: "Het is een betaalbare website: de prijs is laag omdat we efficiënt werken, niet omdat we op kwaliteit besparen. Je beoordeelt het ontwerp zelf voordat je betaalt, dus je weet precies wat je voor je geld krijgt." },
    { q: "Welk pakket heb ik nodig?", a: "Starter is bedoeld voor wie alles op één pagina kwijt kan. Business is er voor bedrijven met meerdere diensten of veel te laten zien. Premium kies je als je op maat ontworpen pagina's wilt of een reserverings- of boekingssysteem wilt koppelen. Twijfel je, kies dan 'Weet ik nog niet' in het formulier: we adviseren je aan de hand van het ontwerp." },
    { q: "Kan ik later overstappen naar een groter pakket?", a: "Ja. Groeit je bedrijf, dan breiden we je website uit. Extra pagina's kun je ook los bijbestellen." },
  ],
  en: [
    { q: "Do I have to pay anything before I have seen the design?", a: "No. The design up front is free and without obligation. You only pay once you like the design and choose a package." },
    { q: "Do the prices include VAT?", a: "The prices exclude {vat} VAT. You always get a clear overview of what you pay in advance." },
    { q: "What costs come after the build?", a: "To stay online, your website needs hosting. We arrange that with a subscription from {hosting} a month. You also pay for your domain name. Extras such as a logo or an extra language are optional." },
    { q: "Is this an affordable website or a cheap one?", a: "It is an affordable website: the price is low because we work efficiently, not because we cut corners on quality. You judge the design yourself before you pay, so you know exactly what you get for your money." },
    { q: "Which package do I need?", a: "Starter is for anyone who can fit everything on one page. Business is for companies with several services or a lot to show. Choose Premium if you want custom-designed pages or want to connect a reservation or booking system. Not sure? Choose 'Not sure yet' in the form: we will advise you based on the design." },
    { q: "Can I move to a bigger package later?", a: "Yes. If your business grows, we expand your website. You can also order extra pages separately." },
  ],
};

const T = {
  nl: {
    crumb: "Prijzen",
    eyebrow: "Prijzen",
    h1: ["Wat kost een website ", "laten maken", "?"],
    lead: (vat: string) => `Bij HOPI betaal je een vast bedrag, en pas nadat je het ontwerp van je eigen website hebt gezien. Geen uurtje-factuurtje en geen aanbetaling voor iets wat je nog niet kent. Alle prijzen zijn exclusief ${vat} btw.`,
    ticks: ["Eerst zien, dan betalen", "Vaste bedragen", "Geen kleine lettertjes"],
    pkgH: "Je website: eenmalig",
    pkgText: "Drie pakketten, afhankelijk van hoeveel je wilt laten zien.",
    plansH: "Hosting en onderhoud: per maand",
    plansText: "Je website moet online blijven, veilig zijn en kloppen. Kies hoeveel je uit handen wilt geven.",
    plansLink: "Meer over website onderhoud",
    custom: "Op maat",
    onRequest: "prijs op aanvraag",
    perMonth: "per maand, excl. btw",
    plansNote: "De abonnementen zijn bedoeld voor websites die wij hebben gebouwd. De voorwaarden, zoals de looptijd, staan in je orderbevestiging.",
    extrasH: "Extra's: alleen als je ze nodig hebt",
    extrasText: "Niets hiervan is verplicht. We bespreken bij het ontwerp wat voor jouw bedrijf zin heeft.",
    cols: ["Extra", "Wat het is", "Prijs excl. btw"],
    request: "op aanvraag",
    month: " per maand",
    stepsTitle: "Zo kom je van aanvraag *naar* website",
    stepsIntro: "Je betaalt pas bij stap drie, als je het ontwerp hebt gezien en goedgekeurd.",
    faqEyebrow: "Vragen over prijzen",
    faqH: "Geen verrassingen achteraf",
    faqText: ["Wil je weten hoe onze prijzen zich verhouden tot de markt? Lees ", "wat kost een website laten maken", "."],
    article: "/blog/wat-kost-een-website-laten-maken",
    maintenance: "/website-onderhoud",
    related: ["/website-laten-maken", "/website-onderhoud", "/blog/wat-kost-een-website-laten-maken", "/blog/wat-kost-websiteonderhoud"],
    service: "Website laten maken",
    serviceDesc: (from: string) => `Websites voor ondernemers tegen een vaste prijs vanaf ${from} exclusief btw. Het ontwerp vooraf is gratis.`,
  },
  en: {
    crumb: "Pricing",
    eyebrow: "Pricing",
    h1: ["What does a website ", "cost", "?"],
    lead: (vat: string) => `At HOPI you pay a fixed amount, and only after you have seen the design of your own website. No hourly billing and no deposit for something you have not seen yet. All prices exclude ${vat} VAT.`,
    ticks: ["See first, then pay", "Fixed amounts", "No small print"],
    pkgH: "Your website: one-off",
    pkgText: "Three packages, depending on how much you want to show.",
    plansH: "Hosting and maintenance: per month",
    plansText: "Your website has to stay online, secure and up to date. Choose how much you want to hand over.",
    plansLink: "More about website maintenance",
    custom: "Custom",
    onRequest: "price on request",
    perMonth: "per month, excl. VAT",
    plansNote: "The subscriptions are meant for websites we have built. The terms, such as the duration, are in your order confirmation.",
    extrasH: "Extras: only if you need them",
    extrasText: "None of this is required. When we discuss the design, we talk about what makes sense for your business.",
    cols: ["Extra", "What it is", "Price excl. VAT"],
    request: "on request",
    month: " per month",
    stepsTitle: "From request *to* website",
    stepsIntro: "You only pay at step three, once you have seen and approved the design.",
    faqEyebrow: "Questions about pricing",
    faqH: "No surprises afterwards",
    faqText: ["Want to know how our prices compare to the market? Read ", "how much a website costs", "."],
    article: "/en/blog/how-much-does-a-website-cost",
    maintenance: "/en/website-maintenance",
    related: ["/en/website-design", "/en/website-maintenance", "/en/blog/how-much-does-a-website-cost", "/en/blog/how-much-does-website-maintenance-cost"],
    service: "Website design",
    serviceDesc: (from: string) => `Websites for businesses at a fixed price from ${from} excluding VAT. The design up front is free.`,
  },
};

export async function pricingMetadata(lang: Locale) {
  const { prices } = await getSiteData();
  return lang === "en"
    ? seoMeta({
        title: `Website design pricing: from ${prices.from} | HOPI`,
        description: `What does a website cost at HOPI? Fixed prices: ${prices.starter}, ${prices.business} or ${prices.premium} one-off, hosting from ${prices.hosting} a month. The design up front is free.`,
        path: PATH.en,
      })
    : seoMeta({
        title: `Betaalbare website laten maken: vanaf ${prices.from} | HOPI`,
        description: `Wat kost een website laten maken? Vaste, betaalbare prijzen: ${prices.starter}, ${prices.business} of ${prices.premium} eenmalig, hosting vanaf ${prices.hosting} per maand. Het ontwerp vooraf is gratis.`,
        path: PATH.nl,
      });
}

/** Catalogue text in the page's language. */
const cat = (text: string, lang: Locale) => (lang === "en" ? catalogText(informal(text), "en") : informal(text));

export async function PricingPage({ lang }: { lang: Locale }) {
  const data = await getSiteData();
  const t = T[lang];
  const path = PATH[lang];
  const crumbs = [{ name: t.crumb, path }];
  const faq = FAQ[lang];
  const v = data.prices;
  const c = data.catalog;
  const plans = c.plans.filter((p) => p.enabled);
  const addons = c.addons.filter((a) => a.enabled);
  const offers = c.packages.filter((p) => p.enabled && p.priceCents !== null).map((p) => ({ name: `Website ${p.name}`, priceCents: p.priceCents as number }));
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
            <p className="lead enter">{t.lead(v.vat)}</p>
            <ul className="ticks enter">
              {t.ticks.map((x) => (
                <li key={x}>
                  <Check strokeWidth={2.4} aria-hidden="true" /> {x}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="pakketten" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>{t.pkgH}</h2>
              <p>{t.pkgText}</p>
            </div>
            <PriceCards catalog={c} source={path} lang={lang} />
          </div>
        </section>

        {plans.length > 0 && (
          <section className="section tint" id="abonnementen">
            <div className="wrap">
              <div className="section-head" data-reveal>
                <h2>{t.plansH}</h2>
                <p>
                  {t.plansText} <Link href={t.maintenance}>{t.plansLink}</Link>
                </p>
              </div>
              <div className="prices plans-grid">
                {plans.map((p) => (
                  <article key={p.key} className="price" data-reveal>
                    <h3>{cat(p.name, lang)}</h3>
                    <p className="desc">{cat(p.description, lang)}</p>
                    <div className="amount">
                      <b>{p.priceCents === null ? t.custom : eur(p.priceCents)}</b>
                      <span>{p.priceCents === null ? t.onRequest : t.perMonth}</span>
                    </div>
                    <ul className="feat">
                      {p.features.map((f) => (
                        <li key={f}>
                          <Check strokeWidth={2.4} aria-hidden="true" />
                          {cat(f, lang)}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              <p className="note">{t.plansNote}</p>
            </div>
          </section>
        )}

        {addons.length > 0 && (
          <section className="section" id="extras">
            <div className="wrap">
              <div className="section-head" data-reveal>
                <h2>{t.extrasH}</h2>
                <p>{t.extrasText}</p>
              </div>
              <div className="table-wrap" data-reveal>
                <table className="price-table">
                  <thead>
                    <tr>
                      {t.cols.map((x) => (
                        <th key={x} scope="col">
                          {x}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {addons.map((a) => (
                      <tr key={a.key}>
                        <th scope="row">{cat(a.name, lang)}</th>
                        <td>{cat(a.description, lang)}</td>
                        <td className="num">{a.priceCents === null ? t.request : `${eur(a.priceCents)}${a.kind === "monthly" ? t.month : ""}${a.perUnit && a.unit ? ` per ${cat(a.unit, lang)}` : ""}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        <Steps title={t.stepsTitle} intro={t.stepsIntro} lang={lang} />

        <section className="section faq-section" id="vragen">
          <div className="wrap faq-grid">
            <div className="section-head" data-reveal>
              <span className="eyebrow">{t.faqEyebrow}</span>
              <h2>{t.faqH}</h2>
              <p>
                {t.faqText[0]}
                <Link href={t.article}>{t.faqText[1]}</Link>
                {t.faqText[2]}
              </p>
            </div>
            <Faq items={faq} vars={v} />
          </div>
        </section>

        <Related paths={t.related} lang={lang} />
        <ContactSection data={data} source={path} lang={lang} />
      </main>
      <SiteFooter data={data} lang={lang} />
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={serviceLd({ name: t.service, serviceType: t.service.toLowerCase(), description: t.serviceDesc(v.from), path, offers })} />
      <JsonLd data={faqLd(faq.map((f) => ({ q: f.q, a: plain(f.a, v) })))} />
    </>
  );
}
