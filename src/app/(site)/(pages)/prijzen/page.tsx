import { seoMeta } from "@/lib/site/seo-meta";
import { Check } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs, HeroAmbient, ContactSection, Faq, JsonLd, PriceCards, Related, SiteFooter, Steps } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import { eur } from "@/lib/catalog";
import { breadcrumbLd, faqLd, plain, serviceLd } from "@/lib/site/seo";
import { informal } from "@/lib/site/text";
import { getSiteData } from "@/server/site";

const PATH = "/prijzen";
const CRUMBS = [{ name: "Prijzen", path: PATH }];

export async function generateMetadata() {
  const { prices } = await getSiteData();
  return seoMeta({
    title: `Website laten maken: prijzen vanaf ${prices.from} | HOPI`,
    description: `Wat kost een website bij HOPI? Vaste prijzen: ${prices.starter}, ${prices.business} of ${prices.premium} eenmalig, hosting vanaf ${prices.hosting} per maand. Het ontwerp vooraf is gratis.`,
    path: PATH,
  });
}

const FAQ = [
  { q: "Moet ik iets betalen voordat ik het ontwerp heb gezien?", a: "Nee. Het ontwerp vooraf is gratis en vrijblijvend. Je betaalt pas als je het ontwerp goed vindt en een pakket kiest." },
  { q: "Zijn de prijzen inclusief btw?", a: "De prijzen zijn exclusief {vat} btw. Je krijgt altijd vooraf een duidelijk overzicht van wat je betaalt." },
  { q: "Welke kosten komen er na de bouw nog bij?", a: "Om online te blijven heeft je website hosting nodig. Dat regelen wij met een abonnement vanaf {hosting} per maand. Daarnaast betaal je voor je domeinnaam. Extra's zoals een logo of een extra taal zijn optioneel." },
  { q: "Is dit een betaalbare of een goedkope website?", a: "Het is een betaalbare website: de prijs is laag omdat we efficiënt werken, niet omdat we op kwaliteit besparen. Je beoordeelt het ontwerp zelf voordat je betaalt, dus je weet precies wat je voor je geld krijgt." },
  { q: "Welk pakket heb ik nodig?", a: "Starter is bedoeld voor wie alles op één pagina kwijt kan. Business is er voor bedrijven met meerdere diensten of veel te laten zien. Premium kies je als je op maat ontworpen pagina's wilt of een reserverings- of boekingssysteem wilt koppelen. Twijfel je, kies dan 'Weet ik nog niet' in het formulier: we adviseren je aan de hand van het ontwerp." },
  { q: "Kan ik later overstappen naar een groter pakket?", a: "Ja. Groeit je bedrijf, dan breiden we je website uit. Extra pagina's kun je ook los bijbestellen." },
];

export default async function PricingPage() {
  const data = await getSiteData();
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
            <Breadcrumbs crumbs={CRUMBS} />
            <span className="eyebrow enter">Prijzen</span>
            <h1 className="enter">
              Wat kost een website <em>laten maken</em>?
            </h1>
            <p className="lead enter">
              Bij HOPI betaal je een vast bedrag, en pas nadat je het ontwerp van je eigen website hebt gezien. Geen uurtje-factuurtje en geen aanbetaling voor iets wat je nog niet kent. Alle prijzen zijn exclusief {v.vat} btw.
            </p>
            <ul className="ticks enter">
              <li><Check strokeWidth={2.4} aria-hidden="true" /> Eerst zien, dan betalen</li>
              <li><Check strokeWidth={2.4} aria-hidden="true" /> Vaste bedragen</li>
              <li><Check strokeWidth={2.4} aria-hidden="true" /> Geen kleine lettertjes</li>
            </ul>
          </div>
        </section>

        <section className="section" id="pakketten" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>Je website: eenmalig</h2>
              <p>Drie pakketten, afhankelijk van hoeveel je wilt laten zien.</p>
            </div>
            <PriceCards catalog={c} source={PATH} />
          </div>
        </section>

        {plans.length > 0 && (
          <section className="section tint" id="abonnementen">
            <div className="wrap">
              <div className="section-head" data-reveal>
                <h2>Hosting en onderhoud: per maand</h2>
                <p>
                  Je website moet online blijven, veilig zijn en kloppen. Kies hoeveel je uit handen wilt geven. <Link href="/website-onderhoud">Meer over website onderhoud</Link>
                </p>
              </div>
              <div className="prices plans-grid">
                {plans.map((p) => (
                  <article key={p.key} className="price" data-reveal>
                    <h3>{p.name}</h3>
                    <p className="desc">{informal(p.description)}</p>
                    <div className="amount">
                      <b>{p.priceCents === null ? "Op maat" : eur(p.priceCents)}</b>
                      <span>{p.priceCents === null ? "prijs op aanvraag" : "per maand, excl. btw"}</span>
                    </div>
                    <ul className="feat">
                      {p.features.map((f) => (
                        <li key={f}>
                          <Check strokeWidth={2.4} aria-hidden="true" />
                          {informal(f)}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              <p className="note">De abonnementen zijn bedoeld voor websites die wij hebben gebouwd. De voorwaarden, zoals de looptijd, staan in je orderbevestiging.</p>
            </div>
          </section>
        )}

        {addons.length > 0 && (
          <section className="section" id="extras">
            <div className="wrap">
              <div className="section-head" data-reveal>
                <h2>Extra&apos;s: alleen als je ze nodig hebt</h2>
                <p>Niets hiervan is verplicht. We bespreken bij het ontwerp wat voor jouw bedrijf zin heeft.</p>
              </div>
              <div className="table-wrap" data-reveal>
                <table className="price-table">
                  <thead>
                    <tr>
                      <th scope="col">Extra</th>
                      <th scope="col">Wat het is</th>
                      <th scope="col">Prijs excl. btw</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addons.map((a) => (
                      <tr key={a.key}>
                        <th scope="row">{a.name}</th>
                        <td>{informal(a.description)}</td>
                        <td className="num">{a.priceCents === null ? "op aanvraag" : `${eur(a.priceCents)}${a.kind === "monthly" ? " per maand" : ""}${a.perUnit && a.unit ? ` per ${a.unit}` : ""}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        <Steps title="Zo kom je van aanvraag *naar* website" intro="Je betaalt pas bij stap drie, als je het ontwerp hebt gezien en goedgekeurd." />

        <section className="section faq-section" id="vragen">
          <div className="wrap faq-grid">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Vragen over prijzen</span>
              <h2>Geen verrassingen achteraf</h2>
              <p>
                Wil je weten hoe onze prijzen zich verhouden tot de markt? Lees <Link href="/blog/wat-kost-een-website-laten-maken">wat kost een website laten maken</Link>.
              </p>
            </div>
            <Faq items={FAQ} vars={v} />
          </div>
        </section>

        <Related paths={["/website-laten-maken", "/website-onderhoud", "/blog/wat-kost-een-website-laten-maken", "/blog/wat-kost-websiteonderhoud"]} />
        <ContactSection data={data} source={PATH} />
      </main>
      <SiteFooter data={data} />
      <JsonLd data={breadcrumbLd(CRUMBS)} />
      <JsonLd data={serviceLd({ name: "Website laten maken", serviceType: "website laten maken", description: `Websites voor ondernemers tegen een vaste prijs vanaf ${v.from} exclusief btw. Het ontwerp vooraf is gratis.`, path: PATH, offers })} />
      <JsonLd data={faqLd(FAQ.map((f) => ({ q: f.q, a: plain(f.a, v) })))} />
    </>
  );
}
