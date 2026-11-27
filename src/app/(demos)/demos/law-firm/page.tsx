import type { ReactNode } from "react";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoForm, DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { Areas, Attorneys, Cases, Intro, Nav, Pubs } from "./ui";
import "./style.css";

const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--a-serif", display: "swap" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--a-sans", display: "swap" });

export const metadata = demoMeta("law-firm");
const I = IMAGES["law-firm"];

const STEPS = [
  { title: "Kennismaking", text: "Drie kwartier, op kantoor of per videogesprek. U vertelt, wij vragen door. Dit gesprek is kosteloos en verplicht u tot niets." },
  { title: "Advies op schrift", text: "Binnen vijf werkdagen ontvangt u een brief van hooguit twee pagina’s: hoe wij uw positie zien, welke routes er zijn en welke risico’s daarbij horen." },
  { title: "Afspraak over kosten", text: "Voordat wij beginnen, leggen wij vast wat het werk kost: een uurtarief met begroting of een vaste prijs. Wijkt het af, dan hoort u dat vooraf." },
  { title: "Eén aanspreekpunt", text: "Uw advocaat doet het werk zelf en blijft uw aanspreekpunt. Na elke stap krijgt u een korte stand van zaken, ook als er weinig nieuws is." },
];

const FEES = [
  ["Kennismaking", "Kosteloos. Drie kwartier, zonder verplichting."],
  ["Uurtarief", "In overleg, afhankelijk van ervaring en spoed. Altijd met een begroting vooraf."],
  ["Vaste prijs", "Voor afgebakend werk, zoals een contract, een second opinion of een training."],
  ["Declaratie", "Maandelijks, met een specificatie per kwartier die u kunt narekenen."],
];

/** The margin of every chapter: paragraph sign, title and, on wide screens, a note in the margin. */
function Margin({ n, label, children }: { n: number; label: string; children?: ReactNode }) {
  return (
    <div className="a-margin">
      <p className="a-par" data-rv>
        <b>§ {n}</b>
        <span>{label}</span>
      </p>
      {children ? <p className="a-note">{children}</p> : null}
    </div>
  );
}

export default function VanAerden() {
  return (
    <DemoShell slug="law-firm" name="Van Aerden Advocaten" className={`d-aerden ${serif.variable} ${sans.variable}`}>
      <Nav />
      <main id="top">
        {/* Opening */}
        <section className="a-hero">
          <div className="a-grid">
            <div className="a-margin a-hero-facts">
              <dl>
                <div className="a-fade" style={{ ["--i" as string]: 5 }}>
                  <dt>Kantoor</dt>
                  <dd>Archipelbuurt, Den Haag</dd>
                </div>
                <div className="a-fade" style={{ ["--i" as string]: 6 }}>
                  <dt>Opgericht</dt>
                  <dd>1987</dd>
                </div>
                <div className="a-fade" style={{ ["--i" as string]: 7 }}>
                  <dt>Advocaten</dt>
                  <dd>Vier partners, één medewerker</dd>
                </div>
                <div className="a-fade" style={{ ["--i" as string]: 8 }}>
                  <dt>Kennismaking</dt>
                  <dd>Kosteloos, drie kwartier</dd>
                </div>
              </dl>
            </div>
            <div className="a-body">
              <p className="a-kicker">
                <span className="a-fade" style={{ ["--i" as string]: 0 }}>
                  Advocatenkantoor te Den Haag
                </span>
                <i aria-hidden="true" />
                <span className="a-fade" style={{ ["--i" as string]: 2 }}>
                  Sinds 1987
                </span>
              </p>
              <h1>
                <span className="a-fade" style={{ ["--i" as string]: 1 }}>
                  Eerst begrijpen,
                </span>
                <span className="a-fade" style={{ ["--i" as string]: 2.4 }}>
                  <em>dan pas pleiten.</em>
                </span>
              </h1>
              <div className="a-hero-row">
                <div className="a-hero-copy">
                  <p className="a-lede a-drop a-fade" style={{ ["--i" as string]: 4 }}>
                    Van Aerden Advocaten staat ondernemers, bestuurders en families bij op vijf rechtsgebieden. Met vijf advocaten, korte lijnen en adviezen die u zonder woordenboek kunt lezen.
                  </p>
                  <div className="a-cta a-fade" style={{ ["--i" as string]: 5 }}>
                    <a href="#kennismaking" className="a-btn">
                      Vraag een kennismaking aan
                    </a>
                    <a href="#rechtsgebieden" className="a-link">
                      Bekijk de rechtsgebieden
                    </a>
                  </div>
                </div>
                <figure className="a-hero-fig">
                  <div className="a-duo a-unveil">
                    <Pic img={I["justice-light"]} alt="Bronzen beeld van Vrouwe Justitia met blinddoek en weegschaal" eager sizes="(min-width: 1000px) 34vw, 100vw" />
                  </div>
                  <figcaption className="a-fade" style={{ ["--i" as string]: 7 }}>
                    <b>Afb. 1</b> Vrouwe Justitia in de hal van het kantoor. De blinddoek is van haar, het doorvragen van ons.
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* § 1 · Rechtsgebieden */}
        <section className="a-sec a-paper" id="rechtsgebieden">
          <div className="a-grid">
            <Margin n={1} label="Rechtsgebieden">
              Twijfelt u bij welk artikel uw vraag hoort? Bel ons. Wij verwijzen ook door als een ander kantoor u beter kan helpen.
            </Margin>
            <div className="a-body">
              <header className="a-sec-head">
                <h2 data-rv>
                  Vijf rechtsgebieden, <em>elk met een eigen partner.</em>
                </h2>
                <p className="a-intro" data-rv>
                  Wij doen niet alles. Wat wij doen, doen wij dagelijks. Elk rechtsgebied heeft een partner die verantwoordelijk is voor het werk en die u zelf aan de telefoon krijgt.
                </p>
              </header>
              <Areas />
            </div>
          </div>
        </section>

        {/* § 2 · Aanpak */}
        <section className="a-sec a-dark" id="aanpak">
          <div className="a-grid">
            <Margin n={2} label="Aanpak">
              Wij beloven geen uitkomsten. Wel een eerlijke inschatting, ook als die tegenvalt.
            </Margin>
            <div className="a-body">
              <header className="a-sec-head">
                <h2 data-rv>
                  Vier stappen, <em>alles op schrift.</em>
                </h2>
                <p className="a-intro" data-rv>
                  Een zaak begint met luisteren en eindigt met een brief die u kunt bewaren. Daartussen weet u steeds wat wij doen, waarom en wat het kost.
                </p>
              </header>
              <ol className="a-steps">
                {STEPS.map((s, i) => (
                  <li key={s.title} data-rv style={{ ["--i" as string]: i }}>
                    <span className="a-rule" aria-hidden="true">
                      <i />
                    </span>
                    <span className="a-cap a-acc-c">Lid {i + 1}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
              <div className="a-fees">
                <figure className="a-fees-fig" data-rv="img">
                  <div className="a-duo">
                    <Pic img={I.library} alt="Bibliotheek met marmeren bustes voor hoge boekenkasten" sizes="(min-width: 1000px) 32vw, 100vw" />
                  </div>
                  <figcaption>
                    <b>Afb. 2</b> Wat is opgeschreven, kan worden nagelezen.
                  </figcaption>
                </figure>
                <div className="a-fees-copy">
                  <h3 data-rv>Kosten, in beginsel</h3>
                  <p data-rv>Over geld praten wij aan het begin, niet aan het eind. De afspraak staat in de opdrachtbevestiging die u van ons ontvangt.</p>
                  <dl data-rv>
                    {FEES.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* § 3 · De advocaten */}
        <section className="a-sec" id="advocaten">
          <div className="a-grid">
            <Margin n={3} label="De advocaten">
              De titel mr. staat voor meester in de rechten. Aan de telefoon mag die weg.
            </Margin>
            <div className="a-body">
              <header className="a-sec-head">
                <h2 data-rv>
                  Vijf advocaten <em>die u bij naam kent.</em>
                </h2>
                <p className="a-intro" data-rv>
                  Geen afdelingen en geen doorschuiven. Wie uw zaak aanneemt, voert haar ook. Kies een advocaat om het volledige profiel te lezen.
                </p>
              </header>
            </div>
          </div>
          <div className="a-wide">
            <Attorneys />
          </div>
        </section>

        {/* § 4 · Expertise en zaken */}
        <section className="a-sec a-paper" id="zaken">
          <div className="a-grid">
            <Margin n={4} label="Expertise en zaken">
              Cliënten, bedragen en uitspraken noemen wij niet. Geheimhouding is geen formaliteit.
            </Margin>
            <div className="a-body">
              <header className="a-sec-head">
                <h2 data-rv>
                  Uit de praktijk, <em>zonder namen.</em>
                </h2>
                <p className="a-intro" data-rv>
                  Tien dossiernotities uit de afgelopen jaren, geanonimiseerd en in algemene bewoordingen beschreven. Elke zaak is anders: een notitie zegt niets over de uitkomst van een andere zaak.
                </p>
              </header>
              <Cases />
            </div>
          </div>
        </section>

        {/* Citaat */}
        <section className="a-band" aria-label="Citaat">
          <div className="a-band-img a-duo" data-px>
            <Pic img={I.columns} alt="Zuilen van een klassiek gebouw, van onderaf gezien" sizes="100vw" />
          </div>
          <blockquote className="a-band-in">
            <p data-rv>“Een advies dat u niet aan uw compagnon kunt uitleggen, is geen advies.”</p>
            <footer data-rv style={{ ["--i" as string]: 2 }}>
              <span className="a-rule" aria-hidden="true">
                <i />
              </span>
              mr. Frederik van Aerden, partner
            </footer>
          </blockquote>
        </section>

        {/* § 5 · Publicaties */}
        <section className="a-sec" id="publicaties">
          <div className="a-grid">
            <Margin n={5} label="Publicaties">
              Onze stukken zijn algemene informatie en geen advies in uw zaak. Daarvoor is de kennismaking.
            </Margin>
            <div className="a-body">
              <header className="a-sec-head">
                <h2 data-rv>
                  Recht <em>in gewone zinnen.</em>
                </h2>
                <p className="a-intro" data-rv>
                  Eens per maand schrijft een van ons over een vraag die die maand vaker dan eens langskwam. Kort, zonder voetnoten.
                </p>
              </header>
              <article className="a-lead">
                <figure className="a-lead-fig" data-rv="img">
                  <div className="a-duo">
                    <Pic img={I.signing} alt="Een hand ondertekent een document met een vulpen" sizes="(min-width: 1000px) 28vw, 100vw" />
                  </div>
                </figure>
                <div className="a-lead-copy">
                  <p className="a-cap a-acc-c" data-rv>
                    20 november 2026 · Familie- en erfrecht · 6 minuten
                  </p>
                  <h3 data-rv>Een testament is nog geen bedrijfsopvolging</h3>
                  <p className="a-byline" data-rv>
                    Door mr. Carmen Dijkhof
                  </p>
                  <div className="a-cols" data-rv>
                    <p className="a-drop">
                      Wie een onderneming nalaat, laat meer na dan aandelen. Er zijn medewerkers, een bank met zekerheden en vaak één kind dat al jaren meewerkt, naast broers of zussen die iets anders zijn gaan doen. Een testament verdeelt het vermogen, maar regelt niet wie maandagochtend de beslissingen neemt.
                    </p>
                    <p>
                      Opvolging slaagt het best wanneer drie documenten op elkaar aansluiten: het testament, de statuten en de afspraken tussen aandeelhouders. In dit stuk lopen wij langs de vragen die u als familie beter nu kunt beantwoorden dan op het moment dat het moet.
                    </p>
                  </div>
                </div>
              </article>
              <Pubs />
              <div className="a-letter" data-rv>
                <div>
                  <h3>De kwartaalbrief</h3>
                  <p>Vier keer per jaar de publicaties van het kwartaal in één brief. Geen reclame, opzeggen kan met één klik.</p>
                </div>
                <DemoForm className="a-letter-form" done="Zo zou het werken: u ontvangt de eerstvolgende kwartaalbrief. Dit is een demo-ontwerp van HOPI, er is niets verzonden.">
                  <label>
                    <span className="a-cap">E-mailadres</span>
                    <input type="email" name="email" autoComplete="email" placeholder="naam@bedrijf.example" required />
                  </label>
                  <button type="submit" className="a-btn a-btn-line">
                    Ontvang de brief
                  </button>
                </DemoForm>
              </div>
            </div>
          </div>
        </section>

        {/* § 6 · Kennismaking aanvragen */}
        <section className="a-sec a-dark" id="kennismaking">
          <div className="a-grid">
            <Margin n={6} label="Kennismaking aanvragen">
              Stuur nog geen vertrouwelijke stukken mee. Eerst controleren wij of wij vrij zijn om voor u op te treden.
            </Margin>
            <div className="a-body a-intro-grid">
              <div className="a-intro-copy">
                <h2 data-rv>
                  Leg uw vraag voor. <em>Het eerste gesprek is kosteloos.</em>
                </h2>
                <p className="a-intro" data-rv>
                  U krijgt binnen één werkdag antwoord van een advocaat, niet van een formulier. Past uw vraag niet bij ons, dan zeggen wij dat en denken wij mee over wie u wel kan helpen.
                </p>
                <ol className="a-after" data-rv>
                  <li>
                    <b>1</b>
                    <span>Wij bellen u binnen één werkdag terug.</span>
                  </li>
                  <li>
                    <b>2</b>
                    <span>Wij controleren of er geen tegenstrijdig belang is.</span>
                  </li>
                  <li>
                    <b>3</b>
                    <span>U spreekt drie kwartier met de partner van het rechtsgebied.</span>
                  </li>
                </ol>
                <figure className="a-intro-fig">
                  <div className="a-duo">
                    <Pic img={I.office} alt="Gang met glazen spreekkamers in het kantoor" sizes="(min-width: 1000px) 30vw, 100vw" />
                  </div>
                </figure>
                <dl className="a-contact" data-rv>
                  <div>
                    <dt>Telefoon</dt>
                    <dd>
                      <a href="tel:0700000000">070 000 00 00</a>
                    </dd>
                  </div>
                  <div>
                    <dt>E-mail</dt>
                    <dd>
                      <a href="mailto:kantoor@vanaerden.example">kantoor@vanaerden.example</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Kantoor</dt>
                    <dd>Archipelbuurt, Den Haag</dd>
                  </div>
                  <div>
                    <dt>Bereikbaar</dt>
                    <dd>Maandag t/m vrijdag, 8.30 tot 18.00 uur</dd>
                  </div>
                </dl>
              </div>
              <div className="a-form-card" data-rv>
                <Intro />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="a-foot">
        <div className="a-foot-in">
          <div className="a-foot-top">
            <p className="a-foot-mark">
              Van Aerden <em>Advocaten</em>
            </p>
            <p className="a-foot-line">Advocatenkantoor te Den Haag, sinds 1987. Voor ondernemers, bestuurders en families.</p>
          </div>
          <div className="a-foot-grid">
            <nav aria-label="Kantoor">
              <h3>Kantoor</h3>
              <a href="#aanpak">Aanpak en kosten</a>
              <a href="#advocaten">De advocaten</a>
              <a href="#zaken">Expertise en zaken</a>
              <a href="#publicaties">Publicaties</a>
              <a href="#kennismaking">Kennismaking aanvragen</a>
            </nav>
            <nav aria-label="Rechtsgebieden">
              <h3>Rechtsgebieden</h3>
              <a href="#rechtsgebieden">Ondernemingsrecht</a>
              <a href="#rechtsgebieden">Arbeidsrecht</a>
              <a href="#rechtsgebieden">Vastgoed en huur</a>
              <a href="#rechtsgebieden">Familie- en erfrecht</a>
              <a href="#rechtsgebieden">Procespraktijk</a>
            </nav>
            <div>
              <h3>Contact</h3>
              <p>Archipelbuurt, Den Haag</p>
              <a href="tel:0700000000">070 000 00 00</a>
              <a href="mailto:kantoor@vanaerden.example">kantoor@vanaerden.example</a>
              <p className="a-foot-dim">Bezoek uitsluitend op afspraak</p>
            </div>
            <div>
              <h3>Openingstijden</h3>
              <dl>
                <div>
                  <dt>Maandag t/m donderdag</dt>
                  <dd>8.30 – 18.00</dd>
                </div>
                <div>
                  <dt>Vrijdag</dt>
                  <dd>8.30 – 17.00</dd>
                </div>
                <div>
                  <dt>Weekend</dt>
                  <dd>Gesloten</dd>
                </div>
              </dl>
              <p className="a-foot-dim">Spoed buiten kantoortijd: bel het kantoornummer en kies 2.</p>
            </div>
          </div>
          <p className="a-colofon">
            <span>© 2026 Van Aerden Advocaten, Den Haag</span>
            <span>Op al ons werk zijn onze algemene voorwaarden en klachtenregeling van toepassing.</span>
            <span>Demo-ontwerp van HOPI · Van Aerden Advocaten is een fictief bedrijf</span>
          </p>
        </div>
      </footer>
    </DemoShell>
  );
}
