import { Archivo, Archivo_Narrow } from "next/font/google";
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { Count, Nav, Portfolio, Quote } from "./ui";
import "./style.css";

const sans = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--k-sans", display: "swap" });
const narrow = Archivo_Narrow({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--k-narrow", display: "swap" });

export const metadata = demoMeta("construction");
const I = IMAGES.construction;

const FIGURES = [
  { to: 640, suffix: "+", label: "projecten opgeleverd sinds 1987" },
  { to: 46, label: "vakmensen in vaste dienst" },
  { to: 94, suffix: "%", label: "opgeleverd op de afgesproken dag" },
  { to: 9.1, decimals: 1, label: "gemiddeld cijfer bij oplevering" },
];

const SERVICES = [
  {
    key: "nieuwbouw",
    name: "Nieuwbouw",
    text: "Van lege kavel tot sleuteloverdracht. We bouwen vrijstaande woningen en kleine woongebouwen, traditioneel gemetseld of in houtbouw.",
    spec: ["Casco of sleutelklaar", "Eigen werkvoorbereiding", "Vergunning inbegrepen"],
    price: "€ 2.450",
    unit: "per m², sleutelklaar",
    img: I["site-top"],
    alt: "Twee bouwvakkers in oranje hesjes tussen wapeningsstaal op een betonvloer",
  },
  {
    key: "renovatie",
    name: "Renovatie",
    text: "Een jaren-dertigwoning naar energielabel A, een nieuwe indeling of een complete keuken en badkamer. Meestal kun je tijdens het werk gewoon blijven wonen.",
    spec: ["Isoleren en verduurzamen", "Keuken en badkamer", "Funderingsherstel"],
    price: "€ 1.150",
    unit: "per m², compleet",
    img: I.carpenter,
    alt: "Timmerman met helm meet houten balken af op een werkbank",
  },
  {
    key: "aanbouw",
    name: "Aanbouw en opbouw",
    text: "Meer ruimte zonder te verhuizen. Een uitbouw aan de tuinkant, een extra verdieping of een dakkapel, in onze werkplaats voorbereid en op locatie snel geplaatst.",
    spec: ["Uitbouw en tuinkamer", "Dakopbouw", "Dakkapel in één dag"],
    price: "€ 2.100",
    unit: "per m², afgewerkt",
    img: I.roofer,
    alt: "Dakdekker staat op het dak van een bakstenen woning",
  },
  {
    key: "bedrijfspand",
    name: "Bedrijfspanden",
    text: "Kantoren, werkplaatsen en hallen, nieuw of verbouwd. We plannen in fases, zodat jouw bedrijf open blijft terwijl wij bouwen.",
    spec: ["Staal- en betonbouw", "Bouwen in fases", "Brandveilig opgeleverd"],
    price: "€ 980",
    unit: "per m², casco",
    img: I.sparks,
    alt: "Vonken spatten bij het slijpen van een stalen profiel",
  },
  {
    key: "onderhoud",
    name: "Onderhoud en herstel",
    text: "Dakgoten, kozijnen, voegwerk, lekkages en elektra. Voor particulieren, verenigingen van eigenaren en beheerders, los of met een vast onderhoudsplan.",
    spec: ["Onderhoudsplan per jaar", "Storing binnen 24 uur", "Eén vaste vakman"],
    price: "€ 64",
    unit: "per uur, excl. btw",
    img: I.electrician,
    alt: "Elektricien met gele helm werkt aan een meterkast",
  },
];

const STEPS = [
  {
    name: "Opname op locatie",
    text: "We komen kijken, meten in en luisteren. Je hoort ter plekke wat kan, wat niet kan en waar het ongeveer op uitkomt.",
    time: "Eén bezoek van een uur",
    get: "Een eerlijke eerste inschatting",
  },
  {
    name: "Ontwerp en begroting",
    text: "Met jouw architect of de onze werken we het plan uit. Elke post staat apart in de begroting, van sloopwerk tot stopcontact.",
    time: "2 tot 4 weken",
    get: "Offerte met vaste prijs",
  },
  {
    name: "Vergunning en planning",
    text: "Wij vragen de omgevingsvergunning aan en bestellen wat een lange levertijd heeft. Je krijgt een planning per week, met de dag van oplevering erin.",
    time: "6 tot 10 weken",
    get: "Weekplanning met opleverdatum",
  },
  {
    name: "Bouwen",
    text: "Een vaste uitvoerder staat elke dag op de bouw en belt je elke vrijdag. Meerwerk voeren we pas uit na jouw akkoord op papier.",
    time: "Volgens de planning",
    get: "Elke week bericht met foto’s",
  },
  {
    name: "Oplevering en nazorg",
    text: "We lopen samen alles na en lossen restpunten binnen twee weken op. Na een jaar komen we terug voor een controle, ook als je niets hebt gemeld.",
    time: "Eén dag, plus nazorg",
    get: "10 jaar garantie op de constructie",
  },
];

const HISTORY = [
  { year: "1987", text: "Henk Kade begint een timmerbedrijf in een loods in Delfshaven." },
  { year: "1996", text: "De eerste complete nieuwbouwwoning wordt opgeleverd in Hillegersberg." },
  { year: "2004", text: "Verhuizing naar de Spaanse Polder, met een eigen timmerwerkplaats." },
  { year: "2013", text: "Het eerste bedrijfspand: een werkplaats met kantoor aan de Waalhaven." },
  { year: "2019", text: "Lotte Kade neemt de leiding over van haar vader." },
  { year: "2024", text: "De eerste woning volledig in houtbouw, gasloos opgeleverd." },
];

const VOICES = [
  {
    quote: "Drie offertes gehad. Die van Kade was de enige waar ik geen rekenmachine en geen jurist bij nodig had. Vaste prijs, en die is het gebleven.",
    who: "Jeroen en Saskia",
    what: "Stadsvilla, Hillegersberg",
    score: "9,4",
  },
  {
    quote: "We woonden tijdens de verbouwing gewoon boven. Elke vrijdag om vier uur stond de uitvoerder in de keuken met de planning voor de week erna.",
    who: "Marleen",
    what: "Uitbouw met leefkeuken, Schiebroek",
    score: "9,2",
  },
  {
    quote: "Ons kantoor moest open blijven. Ze werkten in fases, ruimden elke avond op en mijn klanten hebben er nauwelijks iets van gemerkt.",
    who: "Fatima",
    what: "Kantoor met ontvangstruimte, Spaanse Polder",
    score: "9,0",
  },
];

/** Section label in the manner of a drawing sheet: sheet number and title. */
function Tag({ n, children, id }: { n: string; children: React.ReactNode; id?: string }) {
  return (
    <p className="k-tag" id={id} data-rv>
      <b>{n}</b>
      <span>{children}</span>
    </p>
  );
}

export default function KadeBouw() {
  return (
    <DemoShell slug="construction" name="Kade Bouw" className={`d-kade ${sans.variable} ${narrow.variable}`}>
      <Nav />
      <main id="top">
        {/* 1 · Opening met kerncijfers */}
        <section className="k-hero k-grid">
          <div className="k-wrap k-hero-in">
            <div className="k-hero-copy">
              <p className="k-tag k-in" style={{ ["--i" as string]: 0 }}>
                <b>KB</b>
                <span>Bouw- en renovatiebedrijf · Rotterdam</span>
              </p>
              <h1>
                <span className="k-ln" style={{ ["--i" as string]: 0 }}>
                  <span>Gebouwd</span>
                </span>
                <span className="k-ln" style={{ ["--i" as string]: 1 }}>
                  <span>om te</span>
                </span>
                <span className="k-ln k-ln-y" style={{ ["--i" as string]: 2 }}>
                  <span>blijven.</span>
                </span>
              </h1>
              <p className="k-lede k-in" style={{ ["--i" as string]: 3 }}>
                Nieuwbouw, renovatie en aanbouw met eigen timmerlieden, metselaars en uitvoerders. Eén vaste prijs, één aanspreekpunt en een opleverdatum die we halen.
              </p>
              <div className="k-cta k-in" style={{ ["--i" as string]: 4 }}>
                <a href="#offerte" className="k-btn k-btn-y">
                  Vraag een offerte aan
                  <ArrowRight aria-hidden="true" />
                </a>
                <a href="#projecten" className="k-btn k-btn-line">
                  Bekijk projecten
                </a>
              </div>
            </div>
            <figure className="k-hero-fig">
              <p className="k-dim k-dim-top" aria-hidden="true">
                <span>24 woningen · 7 bouwlagen</span>
              </p>
              <div className="k-hero-photo">
                <Pic img={I.cranes} alt="Twee gele bouwkranen boven een woongebouw in de steigers" eager sizes="(min-width: 960px) 42vw, 100vw" />
              </div>
              <span className="k-stamp" aria-hidden="true">
                <small>Sinds</small>
                1987
              </span>
              <figcaption className="k-title-block">
                <span>
                  <small>Status</small>
                  In uitvoering
                </span>
                <span>
                  <small>Project</small>
                  Woongebouw, Katendrecht
                </span>
                <span>
                  <small>Blad</small>
                  A-01
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="k-figs">
            <dl className="k-wrap k-figs-in">
              {FIGURES.map((f, i) => (
                <div key={f.label} className="k-in" style={{ ["--i" as string]: 5 + i }}>
                  <dd>
                    <Count to={f.to} decimals={f.decimals} />
                    {f.suffix ? <i>{f.suffix}</i> : null}
                  </dd>
                  <dt>{f.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 2 · Diensten */}
        <section className="k-services" id="diensten">
          <div className="k-wrap">
            <header className="k-head">
              <Tag n="01">Diensten</Tag>
              <h2 data-rv>Van fundering tot nok.</h2>
              <p className="k-head-side" data-rv>
                Vijf soorten werk, één bedrijf. Wat we aannemen, bouwen we met onze eigen mensen. De richtprijzen zijn inclusief btw en gelden voor de regio Rotterdam.
              </p>
            </header>
            <ol className="k-svc">
              {SERVICES.map((s, i) => (
                <li key={s.key} data-rv>
                  <span className="k-svc-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="k-svc-main">
                    <h3>{s.name}</h3>
                    <p>{s.text}</p>
                    <ul>
                      {s.spec.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="k-svc-photo">
                    <Pic img={s.img} alt={s.alt} sizes="(min-width: 960px) 22vw, 100vw" />
                  </div>
                  <p className="k-svc-price">
                    <small>Richtprijs vanaf</small>
                    <b>{s.price}</b>
                    <span>{s.unit}</span>
                  </p>
                  <a href="#offerte" data-k-pick={s.key} className="k-svc-go" aria-label={`Offerte aanvragen voor ${s.name.toLowerCase()}`}>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 3 · Projectportfolio */}
        <section className="k-work k-grid" id="projecten">
          <div className="k-wrap">
            <header className="k-head">
              <Tag n="02">Projecten</Tag>
              <h2 data-rv>Bewijs in beton, baksteen en hout.</h2>
              <p className="k-head-side" data-rv>
                Tien opgeleverde projecten uit de afgelopen jaren, met de cijfers erbij. Kies een soort werk en bekijk wat we deden.
              </p>
            </header>
            <Portfolio />
          </div>
        </section>

        {/* 4 · Werkwijze in stappen */}
        <section className="k-method" id="werkwijze">
          <div className="k-wrap k-method-grid">
            <div className="k-method-side">
              <Tag n="03">Werkwijze</Tag>
              <h2 data-rv>Vijf stappen. Eén vaste prijs.</h2>
              <p data-rv>
                Bouwen gaat zelden mis op de steiger. Het gaat mis in de voorbereiding. Daarom leggen we alles vast voordat de eerste schop de grond in gaat: prijs, planning en wie je belt.
              </p>
              <figure className="k-method-fig" data-rv="wipe">
                <Pic img={I.blueprint} alt="Werkvoorbereider tekent met een liniaal op een bouwtekening" sizes="(min-width: 960px) 36vw, 100vw" />
              </figure>
              <p className="k-dim k-dim-light" aria-hidden="true" data-rv="line">
                <span>Schaal 1 : 50</span>
              </p>
            </div>
            <ol className="k-steps">
              {STEPS.map((s, i) => (
                <li key={s.name} data-rv>
                  <span className="k-step-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{s.name}</h3>
                    <p>{s.text}</p>
                    <dl>
                      <div>
                        <dt>Duur</dt>
                        <dd>{s.time}</dd>
                      </div>
                      <div>
                        <dt>Je krijgt</dt>
                        <dd>{s.get}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5 · Het bedrijf */}
        <section className="k-about" id="bedrijf">
          <div className="k-wrap">
            <header className="k-head">
              <Tag n="04">Het bedrijf</Tag>
              <h2 data-rv>Sinds 1987 aan de Maas.</h2>
            </header>
            <div className="k-about-grid">
              <div className="k-about-copy">
                <p className="k-big" data-rv>
                  Henk Kade begon met een bestelbus, een cirkelzaag en een loods in Delfshaven. Zijn regel was simpel: wat je belooft, bouw je.
                </p>
                <p data-rv>
                  Die regel hangt nog steeds boven de deur van onze werkplaats in de Spaanse Polder. Vandaag leidt zijn dochter Lotte Kade het bedrijf, met 46 vakmensen in vaste dienst: timmerlieden, metselaars, uitvoerders en werkvoorbereiders die elkaar kennen en elkaars werk afmaken.
                </p>
                <p data-rv>
                  Geen wisselende ploegen dus, wel dezelfde gezichten van de eerste paal tot de sleuteloverdracht. En een eigen werkplaats waar we kozijnen, trappen en complete dakkapellen maken voordat ze naar de bouw gaan.
                </p>
                <ul className="k-values" data-rv>
                  <li>
                    <b>Eigen ploeg</b>
                    <span>Geen ketting van onderaannemers op het hoofdwerk.</span>
                  </li>
                  <li>
                    <b>Vaste prijs</b>
                    <span>Wat in de offerte staat, staat op de factuur.</span>
                  </li>
                  <li>
                    <b>10 jaar garantie</b>
                    <span>Op alles wat het gebouw draagt.</span>
                  </li>
                </ul>
              </div>
              <div className="k-about-media">
                <figure className="k-about-a" data-rv="wipe">
                  <Pic img={I.crew} alt="Zes bouwvakkers in gekleurde hesjes kijken uit over een bouwplaats" sizes="(min-width: 960px) 46vw, 100vw" />
                </figure>
                <figure className="k-about-b" data-rv="wipe">
                  <Pic img={I["site-top"]} alt="Bouwvakkers vlechten wapening op een verdiepingsvloer" sizes="(min-width: 960px) 22vw, 60vw" />
                </figure>
                <p className="k-about-note" data-rv>
                  <b>07.00</b>
                  <span>Elke werkdag begint met dezelfde ploeg en dezelfde uitvoerder.</span>
                </p>
              </div>
            </div>

            <div className="k-time-wrap">
              <h3 className="k-time-h" data-rv>
                In het kort
              </h3>
              <ol className="k-time" data-rv="time">
                {HISTORY.map((h, i) => (
                  <li key={h.year} style={{ ["--i" as string]: i }}>
                    <b>{h.year}</b>
                    <p>{h.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 6 · Opdrachtgevers aan het woord */}
        <section className="k-voices" aria-labelledby="k-voices-h">
          <div className="k-wrap">
            <header className="k-head">
              <Tag n="05">Opdrachtgevers aan het woord</Tag>
              <h2 id="k-voices-h" data-rv>
                Zij bouwden met Kade.
              </h2>
            </header>
            <div className="k-voices-grid">
              {VOICES.map((v, i) => (
                <figure key={v.who} className={i === 0 ? "k-voice k-voice-big" : "k-voice"} data-rv style={{ ["--i" as string]: i }}>
                  <p className="k-voice-score" aria-label={`Cijfer bij oplevering: ${v.score}`}>
                    <b aria-hidden="true">{v.score}</b>
                    <small aria-hidden="true">cijfer bij oplevering</small>
                  </p>
                  <blockquote>
                    <p>“{v.quote}”</p>
                  </blockquote>
                  <figcaption>
                    <b>{v.who}</b>
                    <span>{v.what}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="k-voices-foot" data-rv>
              Na elke oplevering vragen we één cijfer en één verbeterpunt. Het gemiddelde over de laatste 212 opleveringen is een 9,1.
            </p>
          </div>
        </section>

        {/* 7 · Offerte aanvragen */}
        <section className="k-quote k-grid" id="offerte">
          <div className="k-hazard" aria-hidden="true" />
          <div className="k-wrap k-quote-grid">
            <div className="k-quote-copy">
              <Tag n="06">Offerte aanvragen</Tag>
              <h2 data-rv>Offerte in drie stappen.</h2>
              <p className="k-quote-lede" data-rv>
                Vertel wat je wilt bouwen. We bellen binnen twee werkdagen, komen kosteloos kijken en sturen binnen tien werkdagen een offerte met een vaste prijs.
              </p>
              <ul className="k-contact" data-rv>
                <li>
                  <Phone aria-hidden="true" />
                  <span>
                    <small>Bel de werkvoorbereiding</small>
                    <a href="tel:0100000000">010 000 00 00</a>
                  </span>
                </li>
                <li>
                  <Mail aria-hidden="true" />
                  <span>
                    <small>Mail je tekening of schets</small>
                    <a href="mailto:offerte@kadebouw.example">offerte@kadebouw.example</a>
                  </span>
                </li>
                <li>
                  <MapPin aria-hidden="true" />
                  <span>
                    <small>Kantoor en werkplaats</small>
                    Spaanse Polder, Rotterdam
                  </span>
                </li>
                <li>
                  <Clock aria-hidden="true" />
                  <span>
                    <small>Bereikbaar</small>
                    Ma t/m vr, 7.00 tot 17.00 uur
                  </span>
                </li>
              </ul>
            </div>
            <div className="k-quote-card" data-rv>
              <Quote />
            </div>
          </div>
        </section>
      </main>

      <footer className="k-foot">
        <div className="k-hazard" aria-hidden="true" />
        <div className="k-wrap">
          <p className="k-foot-mark" aria-hidden="true">
            Kade Bouw
          </p>
          <div className="k-foot-grid">
            <div className="k-foot-about">
              <p>Bouw- en renovatiebedrijf in Rotterdam. Nieuwbouw, renovatie, aanbouw en bedrijfspanden, gebouwd door onze eigen mensen.</p>
              <a href="#offerte" className="k-btn k-btn-y">
                Vraag een offerte aan
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <nav aria-label="Voetnavigatie">
              <h3>Navigatie</h3>
              <a href="#diensten">Diensten</a>
              <a href="#projecten">Projecten</a>
              <a href="#werkwijze">Werkwijze</a>
              <a href="#bedrijf">Het bedrijf</a>
              <a href="#offerte">Offerte aanvragen</a>
            </nav>
            <div>
              <h3>Contact</h3>
              <a href="tel:0100000000">010 000 00 00</a>
              <a href="mailto:info@kadebouw.example">info@kadebouw.example</a>
              <p>
                Spaanse Polder
                <br />
                Rotterdam
              </p>
            </div>
            <div>
              <h3>Openingstijden</h3>
              <dl className="k-hours">
                <div>
                  <dt>Kantoor</dt>
                  <dd>ma t/m vr 7.30 – 17.00</dd>
                </div>
                <div>
                  <dt>Bouwplaats</dt>
                  <dd>ma t/m vr 7.00 – 16.00</dd>
                </div>
                <div>
                  <dt>Zaterdag</dt>
                  <dd>op afspraak</dd>
                </div>
                <div>
                  <dt>Storing</dt>
                  <dd>bij lopend werk dag en nacht</dd>
                </div>
              </dl>
            </div>
          </div>
          <p className="k-legal">
            <span>© Kade Bouw, Rotterdam · KvK 00000000</span>
            <span>Demo-ontwerp van HOPI · Kade Bouw is een fictief bedrijf</span>
          </p>
        </div>
      </footer>
    </DemoShell>
  );
}
