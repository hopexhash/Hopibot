import { Instrument_Sans, Syne } from "next/font/google";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { Brief, Nav, Services, Work } from "./ui";
import "./style.css";

const display = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--x-display", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--x-sans", display: "swap" });

export const metadata = demoMeta("creative-agency");
const I = IMAGES["creative-agency"];

const v = (n: number) => ({ ["--i" as string]: n });

/** An eight-pointed star: the studio's full stop. */
function Star({ className }: { className?: string }) {
  return (
    <svg className={`x-star${className ? ` ${className}` : ""}`} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 0l3.4 11.8L34.1 5.9l-5.9 10.7L40 20l-11.8 3.4 5.9 10.7-10.7-5.9L20 40l-3.4-11.8L5.9 34.1l5.9-10.7L0 20l11.8-3.4L5.9 5.9l10.7 5.9z" fill="currentColor" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg className="x-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19L19 5M8 5h11v11" fill="none" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  );
}

/** A round sticker with type running along its edge. It turns slowly. */
function Ring({ id, text, className }: { id: string; text: string; className?: string }) {
  return (
    <span className={`x-ring${className ? ` ${className}` : ""}`} aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path id={id} d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" />
        </defs>
        <circle cx="100" cy="100" r="100" className="x-ring-bg" />
        <text className="x-ring-t">
          <textPath href={`#${id}`} textLength="458" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
        <path
          className="x-ring-c"
          d="M100 62l6.5 22.3 20.4-11.2-11.2 20.4L138 100l-22.3 6.5 11.2 20.4-20.4-11.2L100 138l-6.5-22.3-20.4 11.2 11.2-20.4L62 100l22.3-6.5-11.2-20.4 20.4 11.2z"
        />
      </svg>
    </span>
  );
}

const BURST = Array.from({ length: 36 }, (_, i) => {
  const a = (Math.PI * i) / 18;
  const r = i % 2 ? 84 : 100;
  return `${(100 + r * Math.sin(a)).toFixed(1)},${(100 - r * Math.cos(a)).toFixed(1)}`;
}).join(" ");

/** A stamp with a toothed edge and a few words in the middle. */
function Stamp({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={`x-stamp${className ? ` ${className}` : ""}`}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <polygon points={BURST} />
      </svg>
      <span>{children}</span>
    </span>
  );
}

/** A band of running words. Two of them cross each other in opposite directions. */
function Band({ words, className }: { words: string[]; className?: string }) {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className={`x-band${className ? ` ${className}` : ""}`} aria-hidden="true">
      <p>
        {row.map((w, i) => (
          <span key={i}>
            {w}
            <Star />
          </span>
        ))}
      </p>
    </div>
  );
}

/** A statement of the manifesto. Every word lights up as the sentence travels up the screen. */
function Say({ no, text, className }: { no: string; text: string; className?: string }) {
  const words = text.split(" ");
  // A word is loud from the word that opens with * up to the word that closes with *.
  const from = words.findIndex((w) => w.startsWith("*"));
  const to = words.findIndex((w) => w.endsWith("*"));
  return (
    <p className={`x-say${className ? ` ${className}` : ""}`} data-px>
      <small aria-hidden="true">{no}</small>
      {words.map((raw, i) => {
        const on = from >= 0 && i >= from && i <= to;
        const t = 0.72 - (i / Math.max(1, words.length - 1)) * 0.5;
        return (
          <span key={i} className={on ? "x-loud" : undefined} style={{ ["--t" as string]: t.toFixed(2) }}>
            {raw.replaceAll("*", "")}{" "}
          </span>
        );
      })}
    </p>
  );
}

const STEPS = [
  { name: "Omkeren", when: "Week 1", text: "We stellen je vraag achterstevoren. Wat als je niet meer klanten wil, maar andere? Je krijgt één pagina terug: de omgekeerde briefing." },
  { name: "Schetsen", when: "Week 2 tot 4", text: "Drie richtingen op de muur. Een veilige, een die klopt en een waar je buikpijn van krijgt. Meestal raden we de derde aan." },
  { name: "Maken", when: "Week 4 tot 10", text: "Ontwerpers, schrijvers en ontwikkelaars aan dezelfde tafel. Elke vrijdag zie je wat af is, niet wat bijna af is." },
  { name: "Loslaten", when: "Daarna", text: "Je krijgt een handleiding die je team ook echt gebruikt. En we kijken een jaar lang elke maand een uur mee, zonder factuur." },
];

const TEAM = [
  ["Noor", "creatief directeur"],
  ["Wannes", "strategie"],
  ["Fien", "art direction"],
  ["Siebe", "ontwerp"],
  ["Amira", "tekst"],
  ["Jonas", "development"],
  ["Lotte", "motion"],
  ["Kobe", "productie"],
  ["Renske", "studiomanager"],
];

const CLIENTS = [
  ["Bakkerij Ovenkind", "bakkerijketen", "2022"],
  ["Kwartslag", "kledinglabel", "2021"],
  ["Museumnacht Wakker", "cultuur", "2023"],
  ["Lauw", "huidverzorging", "2023"],
  ["Poot & Blad", "meubelmaker", "2022"],
  ["Kolk", "spaarapp", "2022"],
  ["Gloeiwerk", "energiecoöperatie", "2021"],
  ["Drukkerij Inktvos", "risodruk", "2019"],
  ["Rijwielfabriek Zwaluwstaart", "fietsenmaker", "2018"],
  ["Brouwerij Kwispel", "stadsbrouwerij", "2020"],
  ["Theaterhuis Ruis", "podium", "2017"],
  ["Koffiebranderij Vuurdoorn", "koffie", "2024"],
  ["Zwembad De Dieperik", "stadszwembad", "2020"],
  ["Stadskwekerij Molshoop", "kwekerij", "2025"],
];

export default function Antipode() {
  return (
    <DemoShell slug="creative-agency" name="Studio Antipode" className={`d-antipode ${display.variable} ${sans.variable}`}>
      <Nav />
      <main id="top">
        {/* 1 · Typografische opening */}
        <section className="x-hero">
          <p className="x-hero-tag">
            <span className="x-in" style={v(0)}>
              Creatief bureau
            </span>
            <span className="x-in" style={v(1)}>
              Merk, campagne, digitaal
            </span>
            <span className="x-in" style={v(2)}>
              Dok Noord, Gent
            </span>
          </p>
          <h1 className="x-h1">
            <span className="x-sr">Wij doen het andersom.</span>
            <span className="x-h1-art" aria-hidden="true">
              <span className="x-h1-a x-mask">
                <span>Wij doen</span>
              </span>
              <span className="x-h1-b">
                <span className="x-mask">
                  <span>het</span>
                </span>
                <span className="x-h1-pill">
                  <Pic img={I.marble} alt="Gemarmerde verf in koraalrood, blauw en zwart" eager sizes="(min-width: 900px) 56vw, 54vw" />
                </span>
                <Ring id="x-ring-hero" className="x-hero-ring x-ring-d" text="ANDERSOM DENKEN ✺ SINDS 2014 ✺ GENT ✺ " />
              </span>
              <span className="x-h1-c">
                <span className="x-flip">
                  <span>ander</span>
                  <span>som.</span>
                </span>
              </span>
            </span>
          </h1>
          <div className="x-hero-foot">
            <p className="x-lede x-in" style={v(5)}>
              Negen mensen in een oude garenfabriek aan Dok Noord. We bouwen merken, campagnes en websites voor bedrijven die liever opvallen dan meedoen. Eerst draaien we je vraag om. Daarna pas gaat het scherm aan.
            </p>
            <div className="x-hero-cta x-in" style={v(6)}>
              <a href="#werk" className="x-btn x-btn-ink">
                Bekijk het werk <Arrow />
              </a>
              <a href="#contact" className="x-btn x-btn-line">
                Start een project
              </a>
            </div>
            <p className="x-hero-coord x-in" style={v(7)}>
              <b>Onze antipode</b>
              51°03′ Z, 176°17′ W
              <br />
              Midden in de Stille Oceaan
            </p>
            <Ring id="x-ring-hero-m" className="x-hero-ring x-ring-m" text="ANDERSOM DENKEN ✺ SINDS 2014 ✺ GENT ✺ " />
          </div>
        </section>

        {/* Twee banden die elkaar kruisen */}
        <div className="x-bands">
          <Band words={["Merk", "Campagne", "Digitaal", "Beweging", "Verpakking", "Naam"]} className="x-band-a" />
          <Band words={["Nu vrij: twee plekken vanaf maart", "Eerst omkeren, dan ontwerpen", "Dok Noord, Gent"]} className="x-band-b" />
        </div>

        {/* 2 · Manifest */}
        <section className="x-mani" id="manifest">
          <span className="x-edge-no" aria-hidden="true" data-px>
            01
          </span>
          <header className="x-mani-head">
            <p className="x-kick" data-rv>
              <b>01</b> Manifest
            </p>
            <h2 data-rv="mask">
              <span>Vier zinnen waar we ons aan houden.</span>
            </h2>
          </header>
          <div className="x-says">
            <Say no="a" text="Gewoon is al *bezet.*" />
            <Say no="b" text="Dus beginnen wij bij het *tegendeel.*" className="x-say-in" />
            <Say no="c" text="Mooi is niet genoeg. Het moet ook *schuren.*" className="x-say-r" />
            <Say no="d" text="Wie niemand wil storen, wordt door *niemand gezien.*" />
          </div>
          <div className="x-mani-note">
            <figure className="x-mani-orb" data-rv="pop" data-px>
              <Pic img={I.orb} alt="Een glanzende bol die boven een pastelkleurig landschap zweeft" sizes="(min-width: 900px) 24vw, 62vw" />
              <Ring id="x-ring-orb" text="51°03′ ZUID ✺ 176°17′ WEST ✺ TEGENVOETER ✺ " />
            </figure>
            <div>
              <p className="x-note-big" data-rv>
                Antipode betekent tegenvoeter: het punt precies aan de andere kant van de aarde.
              </p>
              <p data-rv style={v(1)}>
                Dat van Gent ligt in de Stille Oceaan, ten zuidoosten van Nieuw-Zeeland. Er is daar niets, behalve ruimte. Zo beginnen wij aan elk project: zo ver mogelijk van waar iedereen al staat. Daarna komen we stap voor stap terug, tot het klopt voor jouw merk en niet voor dat van de buren.
              </p>
              <a href="#werk" className="x-link" data-rv style={v(2)}>
                Zie hoe dat eruitziet <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* 3 · Projecten met voorvertoning */}
        <section className="x-work" id="werk">
          <header className="x-work-head">
            <p className="x-kick" data-rv>
              <b>02</b> Werk
            </p>
            <h2 className="x-giant" data-px>
              <span>Werk</span>
              <sup>(08)</sup>
            </h2>
            <div className="x-work-intro" data-rv>
              <p>Acht projecten uit de voorbije drie jaar. Elk begon met een briefing die we eerst ondersteboven hebben gehouden.</p>
              <p className="x-hint x-hint-mouse">Beweeg over de lijst. Klik voor het verhaal erachter.</p>
              <p className="x-hint x-hint-touch">Tik op een project voor het verhaal erachter.</p>
            </div>
          </header>
          <Work />
        </section>

        {/* 4 · Diensten */}
        <section className="x-serv" id="diensten">
          <header className="x-serv-head">
            <p className="x-kick" data-rv>
              <b>03</b> Diensten
            </p>
            <h2 data-rv="mask">
              <span>Vijf dingen</span>
              <span>
                die we <em>goed</em> doen.
              </span>
            </h2>
            <p className="x-serv-intro" data-rv>
              Los te boeken of in één traject. De prijzen zijn startpunten, zodat je weet waar je aan begint. Een voorstel op maat krijg je binnen een week.
            </p>
          </header>
          <Services />
          <Stamp className="x-serv-stamp">
            Alles
            <br />
            excl. btw
          </Stamp>
        </section>

        {/* 5 · Werkwijze */}
        <section className="x-how" id="werkwijze">
          <header className="x-how-head">
            <p className="x-kick" data-rv>
              <b>04</b> Werkwijze
            </p>
            <h2 data-rv="mask">
              <span>Vier keer</span>
              <span>draaien.</span>
            </h2>
          </header>
          <figure className="x-how-pic x-how-pic-a" data-rv="wipe">
            <span>
              <Pic img={I.sketch} alt="Een hand tekent schermen van een website met pen op papier" sizes="(min-width: 900px) 30vw, 70vw" />
            </span>
            <figcaption>Fig. 1: de derde richting</figcaption>
          </figure>
          <ol className="x-steps">
            {STEPS.map((s, i) => (
              <li key={s.name} style={v(i)}>
                <span className="x-step-no" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 data-rv={i % 2 ? "r" : "l"}>{s.name}</h3>
                <div data-rv>
                  <p className="x-step-when">{s.when}</p>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <figure className="x-how-pic x-how-pic-b" data-rv="pop">
            <span>
              <Pic img={I.wireframe} alt="Iemand schetst schermopbouw op een tablet met een pen" sizes="(min-width: 900px) 22vw, 56vw" />
            </span>
          </figure>
          <p className="x-how-foot" data-rv>
            Een gemiddeld traject duurt tien weken. Haast? De Omkeerdag past in één dag en kost minder dan een verkeerd logo.
          </p>
        </section>

        {/* 6 · Het team */}
        <section className="x-team" id="team">
          <span className="x-edge-no" aria-hidden="true" data-px>
            09
          </span>
          <header className="x-team-head">
            <p className="x-kick" data-rv>
              <b>05</b> Het team
            </p>
            <h2 data-rv="mask">
              <span>Negen</span>
              <span>tegenvoeters.</span>
            </h2>
          </header>
          <div className="x-team-grid">
            <figure className="x-team-pic" data-rv="wipe">
              <span data-px>
                <Pic img={I.team} alt="Teamleden werken met laptops aan een lange houten tafel, van bovenaf gezien" sizes="(min-width: 900px) 40vw, 92vw" />
              </span>
              <figcaption>Maandag, 9.40 uur. De lange tafel.</figcaption>
            </figure>
            <Stamp className="x-team-stamp">
              Gezocht:
              <br />
              motion designer
            </Stamp>
            <div className="x-team-copy">
              <ul className="x-names">
                {TEAM.map(([name, role], i) => (
                  <li key={name} data-rv style={v(i)}>
                    <b>{name}</b>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
              <p className="x-team-text" data-rv>
                Geen accountmanagers, geen tussenlagen. Je praat met wie het maakt. Wie bij ons binnenloopt, ziet één lange tafel, negen stoelen en een muur vol ideeën die het niet gehaald hebben. Die muur is ons beste verkoopargument.
              </p>
            </div>
          </div>
          <div className="x-team-row">
            <figure className="x-team-loft" data-rv="wipe">
              <span>
                <Pic img={I.loft} alt="De studio: een open fabrieksverdieping met betonnen plafond en een vergadertafel bij het raam" sizes="(min-width: 900px) 46vw, 92vw" />
              </span>
            </figure>
            <ul className="x-team-facts">
              <li data-rv style={v(0)}>
                <b>9</b>
                <span>mensen, van strateeg tot ontwikkelaar</span>
              </li>
              <li data-rv style={v(1)}>
                <b>1</b>
                <span>lange tafel waar alles gebeurt</span>
              </li>
              <li data-rv style={v(2)}>
                <b>0</b>
                <span>accountmanagers tussen jou en de maker</span>
              </li>
            </ul>
            <figure className="x-team-lounge" data-rv="pop">
              <span>
                <Pic img={I.lounge} alt="Zithoek in de studio met lichte fauteuils en een zwarte leeslamp" sizes="(min-width: 900px) 16vw, 40vw" />
              </span>
            </figure>
          </div>
        </section>

        {/* 7 · Opdrachtgevers */}
        <section className="x-cli" id="opdrachtgevers">
          <header className="x-cli-head">
            <p className="x-kick" data-rv>
              <b>06</b> Opdrachtgevers
            </p>
            <h2 data-rv="mask">
              <span>Wie we al</span>
              <span>omdraaiden.</span>
            </h2>
          </header>
          <div className="x-cli-rows" aria-hidden="true">
            <p data-px>
              {CLIENTS.slice(0, 5).map(([n]) => (
                <span key={n}>
                  {n}
                  <Star />
                </span>
              ))}
            </p>
            <p data-px className="x-cli-rev">
              {CLIENTS.slice(5, 10).map(([n]) => (
                <span key={n}>
                  {n}
                  <Star />
                </span>
              ))}
            </p>
            <p data-px>
              {CLIENTS.slice(10).map(([n]) => (
                <span key={n}>
                  {n}
                  <Star />
                </span>
              ))}
            </p>
          </div>
          <div className="x-cli-grid">
            <blockquote className="x-quote" data-rv>
              <p>“We vroegen om een nieuw logo. We kregen de vraag terug waarom we dachten dat het aan het logo lag. Vervelend. En terecht.”</p>
              <footer>
                <b>Marthe</b>
                <span>Bakkerij Ovenkind</span>
              </footer>
            </blockquote>
            <ol className="x-cli-list">
              {CLIENTS.map(([n, what, since], i) => (
                <li key={n} data-rv style={v(i % 7)}>
                  <b>{n}</b>
                  <span>{what}</span>
                  <i>sinds {since}</i>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8 · Contact */}
        <section className="x-contact" id="contact">
          <Band words={["Iets dat andersom mag?", "Vertel het ons", "Koffie staat klaar"]} className="x-band-c" />
          <header className="x-contact-head">
            <p className="x-kick" data-rv>
              <b>07</b> Contact
            </p>
            <h2 data-rv="mask">
              <span>Gooi het maar</span>
              <span>op tafel.</span>
            </h2>
          </header>
          <p className="x-mail" data-rv="l">
            <span>hallo@</span>
            <span>antipode</span>
            <span>.example</span>
          </p>
          <div className="x-contact-grid">
            <div className="x-contact-info">
              <p className="x-contact-lede" data-rv>
                Een half idee is genoeg. Renske leest alles en belt je binnen twee werkdagen terug, ook als het antwoord is dat wij niet de juiste zijn.
              </p>
              <dl data-rv>
                <div>
                  <dt>Bel</dt>
                  <dd>09 000 00 00</dd>
                </div>
                <div>
                  <dt>Kom langs</dt>
                  <dd>
                    Oude garenfabriek
                    <br />
                    Dok Noord, Gent
                  </dd>
                </div>
                <div>
                  <dt>Open</dt>
                  <dd>
                    Ma t/m do 9.00 – 17.30
                    <br />
                    Vr 9.00 – 16.00, daarna open tafel
                  </dd>
                </div>
              </dl>
              <Stamp className="x-contact-stamp">
                Antwoord
                <br />
                binnen 2 dagen
              </Stamp>
            </div>
            <div className="x-contact-card" data-rv="r">
              <Brief />
            </div>
          </div>
        </section>
      </main>

      <footer className="x-foot">
        <p className="x-foot-mark" aria-hidden="true">
          <span>antipode</span>
          <span>antipode</span>
        </p>
        <div className="x-foot-grid">
          <div>
            <h3>Studio</h3>
            <a href="#manifest">Manifest</a>
            <a href="#werk">Werk</a>
            <a href="#diensten">Diensten</a>
            <a href="#werkwijze">Werkwijze</a>
            <a href="#team">Het team</a>
            <a href="#opdrachtgevers">Opdrachtgevers</a>
          </div>
          <div>
            <h3>Contact</h3>
            <p>hallo@antipode.example</p>
            <p>09 000 00 00</p>
            <p>
              Oude garenfabriek
              <br />
              Dok Noord, Gent
            </p>
            <a href="#contact">Start een project</a>
          </div>
          <div>
            <h3>Open</h3>
            <p>Ma t/m do 9.00 – 17.30</p>
            <p>Vr 9.00 – 16.00</p>
            <p>Vrijdag vanaf 16.00 open tafel</p>
            <p>Za en zo gesloten</p>
          </div>
          <div>
            <h3>Volg</h3>
            <a href="#werk">Instagram</a>
            <a href="#team">LinkedIn</a>
            <a href="#contact">Nieuwsbrief</a>
            <a href="#team">Vacatures</a>
          </div>
        </div>
        <p className="x-legal">
          <span>© Studio Antipode, Gent</span>
          <span>Demo-ontwerp van HOPI · Studio Antipode is een fictief bedrijf</span>
          <a href="#top">Terug naar boven ↑</a>
        </p>
      </footer>
    </DemoShell>
  );
}
