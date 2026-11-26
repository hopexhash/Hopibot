import { ArrowRight, Check, Gauge, LayoutTemplate, Mail, MapPin, MessageCircle, PenTool, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import { DEFAULT_CATALOG, eur } from "@/lib/catalog";
import { getSiteOrg } from "@/server/site";
import { ContactForm, HopiMark, Reveal, SiteHeader } from "@/components/site/site-client";

// Prices and company details are read from Settings on every request.
export const dynamic = "force-dynamic";

/** Example designs: fictional businesses, rendered by our own website engine. */
const WORK = [
  { key: "garage-jansen", name: "Garage Jansen", type: "Autogarage", url: "garagejansen.nl" },
  { key: "de-gouden-lepel", name: "De Gouden Lepel", type: "Restaurant", url: "degoudenlepel.nl" },
  { key: "beauty-by-noor", name: "Beauty by Noor", type: "Schoonheidssalon", url: "beautybynoor.nl" },
  { key: "koffiebar-noord", name: "Koffiebar Noord", type: "Koffie & lunch", url: "koffiebarnoord.nl" },
  { key: "loodgieter-bakker", name: "Loodgieter Bakker", type: "Installateur", url: "loodgieterbakker.nl" },
  { key: "bouwbedrijf-de-vries", name: "Bouwbedrijf De Vries", type: "Bouw & renovatie", url: "bouwbedrijfdevries.nl" },
  { key: "barbershop-the-gents", name: "Barbershop The Gents", type: "Barbershop", url: "thegents.nl" },
  { key: "pizzeria-da-marco", name: "Pizzeria Da Marco", type: "Pizzeria", url: "damarco.nl" },
];

const INDUSTRIES = ["Restaurants", "Kappers", "Installateurs", "Bouwbedrijven", "Garages", "Schoonheidssalons", "Hoveniers", "Tandartsen", "Cafés", "Schoonmaakbedrijven", "Makelaars", "Sportscholen"];

const SERVICES = [
  { icon: PenTool, title: "Ontwerp op maat", text: "Een eigen ontwerp dat past bij uw zaak en uw klanten. Geen standaard sjabloon dat er bij iedereen hetzelfde uitziet." },
  { icon: Smartphone, title: "Gemaakt voor mobiel", text: "Eerst ontworpen voor de telefoon, waar veel klanten u opzoeken. Daarna voor tablet en computer." },
  { icon: MessageCircle, title: "Klanten in contact", text: "Bellen, een offerte aanvragen, reserveren of een afspraak maken: met één tik, op elke pagina." },
  { icon: Gauge, title: "Snel en vindbaar", text: "Snelle pagina's, nette techniek en een goede basis om gevonden te worden in uw regio." },
  { icon: ShieldCheck, title: "Hosting & beveiliging", text: "Wij zetten uw website online met SSL, back-ups en updates, zodat u er geen omkijken naar heeft." },
  { icon: Wrench, title: "Aanpassingen", text: "Nieuwe openingstijden, een ander menu of een actie? Laat het ons weten, wij passen het aan." },
];

const STEPS = [
  { title: "Kennismaking", text: "U vertelt kort over uw bedrijf via het formulier. Heeft u al een website, dan kijken we daar ook naar." },
  { title: "Gratis ontwerp", text: "We maken een ontwerp van uw nieuwe website, met uw naam, diensten en stijl. Gratis en vrijblijvend." },
  { title: "Samen afronden", text: "Bevalt het? Dan kiest u een pakket en maken we teksten, foto's en details samen definitief." },
  { title: "Online", text: "Uw website gaat live op uw eigen domeinnaam. Wij zorgen voor hosting, beveiliging en onderhoud." },
];

const FAQ = (vat: number) => [
  { q: "Is het ontwerp echt gratis?", a: "Ja. U ziet eerst een ontwerp van uw eigen website. Pas als het u bevalt en u een pakket kiest, betaalt u. Bevalt het niet, dan zit u nergens aan vast." },
  { q: "Hoe snel staat mijn website online?", a: "Dat hangt af van het pakket en van hoe snel teksten en foto's rond zijn. Zodra u akkoord geeft op het ontwerp, spreken we samen een planning af." },
  { q: "Heb ik al een domeinnaam nodig?", a: "Nee. Heeft u er al een, dan koppelen we die. Zo niet, dan helpen we u een passende domeinnaam te registreren." },
  { q: "Kan ik later nog dingen laten aanpassen?", a: "Ja. Met een onderhoudsabonnement passen wij kleine dingen voor u aan, zoals openingstijden, een menukaart of nieuwe foto's." },
  { q: "Voor wie werkt HOPI?", a: "Voor ondernemers in Nederland en België: van restaurants en kappers tot installateurs en bouwbedrijven. Ook als u nog helemaal geen website heeft." },
  { q: "Zijn de prijzen inclusief btw?", a: `De genoemde prijzen zijn exclusief ${vat}% btw. U krijgt altijd vooraf een duidelijk overzicht van de kosten.` },
];

export default async function HomePage() {
  const org = await getSiteOrg();
  const catalog = org?.catalog ?? DEFAULT_CATALOG;
  const s = org?.settings;
  const packages = catalog.packages.filter((p) => p.enabled);
  const plans = catalog.plans.filter((p) => p.enabled && p.priceCents !== null);
  const cheapestPlan = plans.length ? Math.min(...plans.map((p) => p.priceCents ?? 0)) : null;
  const email = s?.replyToEmail || s?.senderEmail || "";
  const hero = WORK[0];
  const heroPhone = WORK[1];

  return (
    <>
      <SiteHeader />
      <Reveal />
      <main id="top">
        {/* Hero */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow enter">Webdesign voor ondernemers in NL & BE</span>
              <h1 className="enter">
                Een website die <em>klanten</em> oplevert.
              </h1>
              <p className="lead enter">HOPI ontwerpt en bouwt moderne websites voor ondernemers. U ziet eerst gratis een ontwerp van uw eigen website. Pas als het u bevalt, gaan we verder.</p>
              <div className="hero-actions enter">
                <a href="#contact" className="btn btn-dark">
                  Vraag een gratis ontwerp aan <ArrowRight />
                </a>
                <a href="#werk" className="btn btn-line">
                  Bekijk voorbeelden
                </a>
              </div>
              <ul className="ticks enter">
                {["Gratis ontwerp vooraf", "Vaste prijzen", "Gemaakt voor mobiel"].map((t) => (
                  <li key={t}>
                    <Check strokeWidth={2.4} /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="devices enter" aria-label={`Voorbeeldontwerp voor ${hero.name}`}>
              <div className="browser">
                <div className="browser-bar">
                  <i />
                  <i />
                  <i />
                  <span>{hero.url}</span>
                </div>
                <img src={`/site/work/${hero.key}-d.jpg`} alt={`Voorbeeldontwerp: website voor ${hero.name}`} width={1440} height={900} fetchPriority="high" />
              </div>
              <div className="phone">
                <img src={`/site/work/${heroPhone.key}-m.jpg`} alt={`Voorbeeldontwerp op een telefoon: ${heroPhone.name}`} width={780} height={1560} />
              </div>
              <span className="tag">
                <b /> Voorbeeldontwerp
              </span>
            </div>
          </div>
        </section>

        {/* Industries */}
        <div className="ticker" aria-label="Voor ondernemers zoals">
          <div className="ticker-row" aria-hidden="true">
            {[...INDUSTRIES, ...INDUSTRIES].map((x, i) => (
              <span key={i}>{x}</span>
            ))}
          </div>
        </div>

        {/* Work */}
        <section className="section" id="werk">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Voorbeeldontwerpen</span>
              <h2>
                Elk bedrijf een <em>eigen</em> gezicht.
              </h2>
              <p>Geen twee websites hetzelfde. Kleuren, letters en opbouw passen bij het vak en bij de klanten van de zaak, op de telefoon en op de computer.</p>
            </div>
            <div className="work">
              {WORK.map((w) => (
                <article key={w.key} className="work-card" data-reveal>
                  <div className="work-shot">
                    <div className="browser">
                      <div className="browser-bar">
                        <i />
                        <i />
                        <i />
                        <span>{w.url}</span>
                      </div>
                      <img src={`/site/work/${w.key}-d.jpg`} alt={`Voorbeeldontwerp: website voor ${w.name}`} width={1440} height={900} loading="lazy" />
                    </div>
                    <div className="phone">
                      <img src={`/site/work/${w.key}-m.jpg`} alt="" width={780} height={1560} loading="lazy" />
                    </div>
                  </div>
                  <div className="work-meta">
                    <h3>{w.name}</h3>
                    <p>{w.type}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="swipe">Veeg voor meer voorbeelden →</p>
            <p className="note">Dit zijn voorbeeldontwerpen voor fictieve bedrijven, gemaakt om te laten zien wat mogelijk is. Uw eigen ontwerp maken we met uw naam, diensten en stijl.</p>
          </div>
        </section>

        {/* Services */}
        <section className="section" id="diensten" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Diensten</span>
              <h2>
                Alles voor een website die <em>werkt</em>.
              </h2>
              <p>Van het eerste ontwerp tot hosting en onderhoud. U heeft één aanspreekpunt en hoeft zelf niets technisch te regelen.</p>
            </div>
            <div className="services" data-reveal>
              {SERVICES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="service">
                  <Icon />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section dark" id="werkwijze">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Werkwijze</span>
              <h2>
                Eerst zien, <em>dan</em> beslissen.
              </h2>
              <p>U koopt geen kat in de zak. U ziet uw nieuwe website voordat u iets betaalt.</p>
            </div>
            <ol className="steps">
              {STEPS.map((st, i) => (
                <li key={st.title} className="step" data-reveal>
                  <span className="step-n">0{i + 1}</span>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pricing */}
        <section className="section" id="prijzen">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Prijzen</span>
              <h2>
                Duidelijke prijzen, <em>geen</em> verrassingen.
              </h2>
              <p>Een vast bedrag voor uw website. Het ontwerp vooraf is altijd gratis. Alle prijzen zijn exclusief {catalog.vatPct}% btw.</p>
            </div>
            <div className="prices">
              {packages.map((p) => (
                <article key={p.key} className={`price${p.featured ? " featured" : ""}`} data-reveal>
                  {p.featured && <span className="price-badge">Meest gekozen</span>}
                  <h3>{p.name}</h3>
                  <p className="desc">{p.description}</p>
                  <div className="amount">
                    {p.priceCents === null ? <b>Op maat</b> : <b>{eur(p.priceCents)}</b>}
                    <span>{p.priceCents === null ? "prijs op aanvraag" : "eenmalig, excl. btw"}</span>
                  </div>
                  <ul className="feat">
                    {p.features.map((f) => (
                      <li key={f}>
                        <Check strokeWidth={2.4} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={`/?pakket=${p.key}#contact`} className={`btn ${p.featured ? "btn-green" : "btn-line"}`}>
                    Kies {p.name} <ArrowRight />
                  </a>
                </article>
              ))}
            </div>
            {cheapestPlan !== null && (
              <div className="plans" data-reveal>
                <span>
                  <b>Hosting & onderhoud</b> vanaf {eur(cheapestPlan)} per maand, excl. btw.
                </span>
                <span>Extra&apos;s zoals een logo, online reserveren of teksten bespreken we bij het ontwerp.</span>
              </div>
            )}
          </div>
        </section>

        {/* Promise */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap promise">
            {[
              { t: "Gratis ontwerp vooraf", p: "U ziet uw eigen website voordat u iets betaalt." },
              { t: "Eén aanspreekpunt", p: "Vragen of wijzigingen? U heeft steeds hetzelfde contact." },
              { t: "Nederland & België", p: "Websites in het Nederlands, voor ondernemers in uw regio." },
            ].map((x) => (
              <div key={x.t} className="promise-item" data-reveal>
                <h3>{x.t}</h3>
                <p>{x.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="vragen" style={{ paddingTop: 0 }}>
          <div className="wrap faq-grid">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Vragen</span>
              <h2>
                Goed om te <em>weten</em>.
              </h2>
              <p>Staat uw vraag er niet bij? Stel hem gerust via het formulier.</p>
            </div>
            <div className="faq" data-reveal>
              {FAQ(catalog.vatPct).map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>
                    {f.q}
                    <i aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section style={{ paddingBottom: "clamp(76px, 11vw, 140px)" }}>
          <div className="wrap">
            <div className="band" data-reveal>
              <h2>Benieuwd hoe uw nieuwe website eruit kan zien?</h2>
              <a href="#contact" className="btn btn-dark">
                Vraag een gratis ontwerp aan <ArrowRight />
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section" id="contact" style={{ paddingTop: 0 }}>
          <div className="wrap contact">
            <div className="contact-copy" data-reveal>
              <span className="eyebrow">Contact</span>
              <h2 className="h2" style={{ marginTop: 18 }}>
                Uw gratis <em>ontwerp</em> aanvragen.
              </h2>
              <p>Vul het formulier in en vertel kort over uw bedrijf. We nemen contact met u op en maken een ontwerp van uw nieuwe website. Gratis en vrijblijvend.</p>
              <ul className="contact-list">
                {email && (
                  <li>
                    <Mail />
                    <a href={`mailto:${email}`}>{email}</a>
                  </li>
                )}
                <li>
                  <MapPin /> Voor ondernemers in Nederland en België
                </li>
                <li>
                  <LayoutTemplate /> Ontwerp vooraf, zonder verplichtingen
                </li>
              </ul>
            </div>
            <div data-reveal>
              <ContactForm packages={packages.map((p) => ({ key: p.key, name: p.name }))} />
            </div>
          </div>
        </section>
      </main>

      <footer className="ftr">
        <div className="wrap">
          <div className="ftr-grid">
            <div>
              <a href="#top" className="brand" aria-label="HOPI, naar boven">
                <HopiMark />
                HOPI
              </a>
              <p style={{ marginTop: 14, maxWidth: 320, color: "var(--muted)" }}>Moderne websites voor ondernemers in Nederland en België.</p>
            </div>
            <div>
              <h4>Menu</h4>
              <ul>
                <li><a href="#werk">Voorbeelden</a></li>
                <li><a href="#diensten">Diensten</a></li>
                <li><a href="#werkwijze">Werkwijze</a></li>
                <li><a href="#prijzen">Prijzen</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href="#contact">Gratis ontwerp aanvragen</a></li>
                {email && <li><a href={`mailto:${email}`}>{email}</a></li>}
                {s?.agencyAddress && <li>{s.agencyAddress}</li>}
              </ul>
            </div>
            <div>
              <h4>Gegevens</h4>
              <ul>
                <li>{s?.agencyName || "HOPI"}</li>
                {s?.kvkNumber && <li>KvK {s.kvkNumber}</li>}
                <li><a href="/privacy">Privacyverklaring</a></li>
              </ul>
            </div>
          </div>
          <div className="big" aria-hidden="true">HOPI</div>
          <div className="legal">
            <span>© {new Date().getFullYear()} {s?.agencyName || "HOPI"}</span>
            <span>Prijzen exclusief btw</span>
          </div>
        </div>
      </footer>
    </>
  );
}
