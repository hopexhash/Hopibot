import { ArrowRight, Check, Gauge, MessageCircle, PenTool, ShieldCheck, Smartphone, Wrench, X } from "lucide-react";
import Link from "next/link";
import { ContactSection, CtaBand, Devices, Faq, HeroAmbient, JsonLd, PriceCards, SiteFooter, Steps, WorkCard } from "@/components/site/parts";
import { SiteHeader, WhatsAppIcon } from "@/components/site/site-client";
import { faqLd, pageMeta, plain } from "@/lib/site/seo";
import { WORK, workByKey } from "@/lib/site/work";
import { getSiteData } from "@/server/site";

export async function generateMetadata() {
  const { prices } = await getSiteData();
  return pageMeta({
    title: "HOPI | Jouw nieuwe website. Eerst zien, dan betalen",
    description: `Webdesignbureau voor ondernemers in Nederland en België. Je ziet eerst gratis een ontwerp van je website en betaalt pas als het bevalt. Vanaf ${prices.from}.`,
    path: "/",
  });
}

const INDUSTRIES = ["Restaurants", "Kappers", "Loodgieters", "Bouwbedrijven", "Garages", "Schoonheidssalons", "Tandartsen", "Makelaars", "Cafés", "Hoveniers", "Schoonmaakbedrijven", "Sportscholen"];

const SERVICES = [
  { icon: PenTool, title: "Ontwerp op maat", text: "Een eigen ontwerp dat past bij je zaak en je klanten. Geen standaard sjabloon dat er bij iedereen hetzelfde uitziet." },
  { icon: Smartphone, title: "Gemaakt voor mobiel", text: "Eerst ontworpen voor de telefoon, waar veel klanten je opzoeken. Daarna voor tablet en computer." },
  { icon: MessageCircle, title: "Klanten in contact", text: "Bellen, een offerte aanvragen, reserveren of een afspraak maken: met één tik, op elke pagina." },
  { icon: Gauge, title: "Snel en vindbaar", text: "Snelle pagina's, nette techniek en een goede basis om gevonden te worden in je regio." },
  { icon: ShieldCheck, title: "Hosting & beveiliging", text: "Wij zetten je website online met SSL, back-ups en updates, zodat je er geen omkijken naar hebt." },
  { icon: Wrench, title: "Aanpassingen", text: "Nieuwe openingstijden, een ander menu of een actie? Laat het ons weten, wij passen het aan." },
];

const FAQ = [
  { q: "Is het ontwerp echt gratis?", a: "Ja. Je ziet eerst een ontwerp van je eigen website. Pas als het bevalt en je een pakket kiest, betaal je. Bevalt het niet, dan zit je nergens aan vast." },
  { q: "Wat kost een website bij HOPI?", a: "Een one-page website kost {starter}, een complete website {business} en een op maat ontworpen website {premium}. Dat zijn eenmalige bedragen, exclusief {vat} btw. Hosting en onderhoud kosten vanaf {hosting} per maand. Het volledige overzicht staat op de pagina [prijzen](/prijzen)." },
  { q: "Hoe snel staat mijn website online?", a: "Dat hangt af van het pakket en van hoe snel teksten en foto's rond zijn. Zodra je akkoord geeft op het ontwerp, spreken we samen een planning af." },
  { q: "Heb ik al een domeinnaam nodig?", a: "Nee. Heb je er al een, dan koppelen we die. Zo niet, dan helpen we je een passende domeinnaam te registreren." },
  { q: "Kan ik later nog dingen laten aanpassen?", a: "Ja. Met een [onderhoudsabonnement](/website-onderhoud) passen wij kleine dingen voor je aan, zoals openingstijden, een menukaart of nieuwe foto's." },
  { q: "Ik heb al een website. Kan die vervangen worden?", a: "Ja. We maken een nieuw ontwerp dat je naast je huidige website kunt leggen. Lees meer over een [website redesign](/website-redesign)." },
  { q: "Voor wie werkt HOPI?", a: "Voor ondernemers in Nederland en België: van restaurants en kappers tot loodgieters en bouwbedrijven, zzp'ers en mkb. Ook als je nog helemaal geen website hebt." },
];

export default async function HomePage() {
  const data = await getSiteData();
  const v = data.prices;
  const hero = workByKey("garage-jansen") ?? WORK[0];
  const heroPhone = workByKey("de-gouden-lepel") ?? WORK[1];

  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        {/* Hero: what, for whom, what it costs and the next step */}
        <section className="hero">
          <HeroAmbient />
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow enter">Webdesign voor ondernemers in NL & BE</span>
              <h1 className="enter lines">
                <span>Jouw nieuwe website.</span>{" "}
                <span>
                  Eerst zien, <em>dan betalen.</em>
                </span>
              </h1>
              <p className="lead enter">HOPI ontwerpt en bouwt websites voor ondernemers. Je krijgt eerst gratis een ontwerp van je eigen website te zien. Pas als het bevalt, kies je een pakket.</p>
              <div className="hero-actions enter">
                <a href="#contact" className="btn btn-dark" data-track="cta_click" data-track-label="hero" data-track-location="/">
                  Vraag een gratis ontwerp aan <ArrowRight aria-hidden="true" />
                </a>
                <a href="#werk" className="btn btn-line">
                  Bekijk voorbeelden
                </a>
              </div>
              {data.whatsapp && (
                <p className="hero-wa enter">
                  Liever even appen?{" "}
                  <a href={data.whatsapp} target="_blank" rel="noopener" data-track="whatsapp_click" data-track-label="hero" data-track-location="/">
                    <WhatsAppIcon /> Stuur ons een WhatsApp
                  </a>
                </p>
              )}
              <ul className="ticks enter">
                <li>
                  <Check strokeWidth={2.4} aria-hidden="true" /> Gratis ontwerp vooraf
                </li>
                <li>
                  <Check strokeWidth={2.4} aria-hidden="true" /> Vaste prijs vanaf {v.from}
                </li>
                <li>
                  <Check strokeWidth={2.4} aria-hidden="true" /> Hosting en onderhoud geregeld
                </li>
              </ul>
            </div>
            <div className="hero-visual enter">
              <Devices work={hero} phone={heroPhone} eager />
              <span className="tag">
                <b /> Demo-ontwerp
              </span>
            </div>
          </div>
        </section>

        {/* Decorative: the same industries are real links in the footer. */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-row">
            {[...INDUSTRIES, ...INDUSTRIES].map((x, i) => (
              <span key={i}>{x}</span>
            ))}
          </div>
        </div>

        {/* Why HOPI is different */}
        <section className="section" id="waarom">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Waarom HOPI</span>
              <h2>
                Geen gok, maar een <em>ontwerp</em> dat je kunt beoordelen.
              </h2>
              <p>Een website laten maken begint meestal met een offerte en een aanbetaling. Wat je krijgt, zie je pas weken later. Wij draaien de volgorde om.</p>
            </div>
            <div className="versus stagger" data-reveal>
              <div className="versus-col">
                <h3>Zo gaat het vaak</h3>
                <ul>
                  <li><X aria-hidden="true" /> Je kiest op basis van een offerte</li>
                  <li><X aria-hidden="true" /> Je betaalt vooraf een deel</li>
                  <li><X aria-hidden="true" /> Na weken zie je het eerste ontwerp</li>
                  <li><X aria-hidden="true" /> Valt het tegen, dan zit je eraan vast</li>
                </ul>
              </div>
              <div className="versus-col yes">
                <h3>Zo werkt HOPI</h3>
                <ul>
                  <li><Check strokeWidth={2.4} aria-hidden="true" /> Je ziet eerst een ontwerp van je eigen website</li>
                  <li><Check strokeWidth={2.4} aria-hidden="true" /> Het ontwerp is gratis en vrijblijvend</li>
                  <li><Check strokeWidth={2.4} aria-hidden="true" /> Bevalt het, dan kies je een pakket met een vaste prijs</li>
                  <li><Check strokeWidth={2.4} aria-hidden="true" /> Bevalt het niet, dan betaal je niets</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="section tint" id="werk">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Voorbeelden</span>
              <h2>
                Elk bedrijf een <em>eigen</em> gezicht.
              </h2>
              <p>Geen twee websites hetzelfde. Kleuren, letters en opbouw passen bij het vak en bij de klanten van de zaak. Klik op een voorbeeld en bekijk de hele website, ook op je telefoon.</p>
            </div>
            <div className="work">
              {WORK.map((w) => (
                <WorkCard key={w.key} work={w} />
              ))}
            </div>
            <p className="swipe">Veeg voor meer voorbeelden →</p>
            <p className="note">Dit zijn demo-ontwerpen voor fictieve bedrijven, gemaakt om te laten zien wat we kunnen leveren. Het zijn geen klantprojecten. Jouw eigen ontwerp maken we met je eigen naam, diensten en stijl.</p>
          </div>
        </section>

        {/* Services */}
        <section className="section" id="diensten">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Wat je krijgt</span>
              <h2>
                Alles voor een website die <em>werkt</em>.
              </h2>
              <p>
                Van het eerste ontwerp tot hosting en onderhoud. Je hebt één aanspreekpunt en hoeft zelf niets technisch te regelen. <Link href="/website-laten-maken">Meer over een website laten maken</Link>
              </p>
            </div>
            <div className="services" data-reveal>
              {SERVICES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="service">
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Steps />

        {/* Pricing */}
        <section className="section" id="prijzen">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Prijzen</span>
              <h2>
                Duidelijke prijzen, <em>geen</em> verrassingen.
              </h2>
              <p>
                Een vast bedrag voor je website, exclusief {v.vat} btw. Het ontwerp vooraf is altijd gratis.
              </p>
            </div>
            <PriceCards catalog={data.catalog} source="/" />
            <div className="plans" data-reveal>
              <span>
                <b>Hosting & onderhoud</b> vanaf {v.hosting} per maand, excl. btw.
              </span>
              <Link href="/prijzen" data-track="cta_click" data-track-label="all-prices">
                Bekijk alle prijzen en extra&apos;s <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section faq-section tint" id="vragen">
          <div className="wrap faq-grid">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Vragen</span>
              <h2>
                Goed om te <em>weten</em>.
              </h2>
              <p>
                Staat je vraag er niet bij? Stel hem gerust via het formulier, of lees verder in onze <Link href="/blog">artikelen</Link>.
              </p>
            </div>
            <Faq items={FAQ} vars={v} />
          </div>
        </section>

        <CtaBand location="/" />
        <ContactSection data={data} source="/" />
      </main>
      <SiteFooter data={data} />
      <JsonLd data={faqLd(FAQ.map((f) => ({ q: f.q, a: plain(f.a, v) })))} />
    </>
  );
}
