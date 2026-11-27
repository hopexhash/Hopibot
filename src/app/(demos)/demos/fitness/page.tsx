import { Anton, Inter_Tight } from "next/font/google";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { Coaches, Nav, Plans, Schedule, Trial } from "./ui";
import "./style.css";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--f-display", display: "swap" });
const text = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--f-text", display: "swap" });

export const metadata = demoMeta("fitness");
const I = IMAGES.fitness;

const BAND = ["Strength", "Conditioning", "Mobility", "Race prep", "Personal training"];
const VERBS = ["Tillen", "Duwen", "Trekken", "Dragen", "Rennen", "Herhalen"];

const PROGRAMS = [
  {
    name: "Strength",
    text: "Squat, deadlift, bankdrukken en overhead press. Je werkt in blokken van acht weken met een schema dat elke week iets zwaarder wordt.",
    meta: ["60 min", "Alle niveaus", "13 lessen per week"],
    img: I.squat,
    alt: "Sporter met een halterstang op de schouders in het squatrek",
    href: "#rooster",
    cta: "Bekijk de lessen",
  },
  {
    name: "Conditioning",
    text: "Intervallen met de slee, de roeier en de touwen. Kort, hard en elke les anders. Je eigen hartslag bepaalt het tempo, niet je buurman.",
    meta: ["45 min", "Alle niveaus", "10 lessen per week"],
    img: I["battle-ropes"],
    alt: "Sporter slaat golven in twee zware trainingstouwen",
    href: "#rooster",
    cta: "Bekijk de lessen",
  },
  {
    name: "Mobility",
    text: "Heupen, schouders en enkels die weer doen wat je vraagt. De les waardoor je squat dieper gaat en je de dag erna soepel uit bed stapt.",
    meta: ["45 min", "Rustig tempo", "7 lessen per week"],
    img: I["bar-grip"],
    alt: "Sporter zakt diep door de knieën en pakt een halterstang van de vloer",
    href: "#rooster",
    cta: "Bekijk de lessen",
  },
  {
    name: "Race prep",
    text: "Twaalf weken toewerken naar jouw startschot: een obstakelrun, een tien kilometer of een fitnessrace. Met een testdag aan het begin en aan het eind.",
    meta: ["75 min", "Gevorderd", "Start elke 12 weken"],
    img: I.deadlift,
    alt: "Sporter zet zich schrap boven een zware halter in een donkere zaal",
    href: "#rooster",
    cta: "Bekijk de lessen",
  },
  {
    name: "Personal training",
    text: "Eén coach, één uur, jouw plan. Voor wie techniek wil leren, een eigen doel heeft of liever niet in een groep begint.",
    meta: ["60 min", "Op afspraak", "Vanaf € 65 per uur"],
    img: I.bench,
    alt: "Sporter drukt een halterstang uit op de bank",
    href: "#proefles",
    cta: "Plan een kennismaking",
  },
];

const NUMBERS = [
  { n: "900", unit: "m²", text: "trainingsvloer met daglicht van drie kanten" },
  { n: "14", unit: "", text: "squatrekken, dus nooit wachten op een stang" },
  { n: "30", unit: "m", text: "sprintbaan voor sleeën en loopwerk" },
  { n: "12", unit: "", text: "sporters per les, meer worden het er niet" },
];

const RESULTS = [
  { n: "+30", unit: "kg", who: "Sanne", since: "lid sinds maart 2024 · Strength", text: "Op mijn deadlift, in acht maanden. Ik begon met een lege stang en durfde de zaal amper in." },
  { n: "1e", unit: "", who: "Ruben", since: "lid sinds september 2024 · Club", text: "Strikte pull-up, na vijf maanden oefenen met elastiek. Inmiddels doe ik er zes achter elkaar." },
  { n: "54:10", unit: "", who: "Fatima", since: "lid sinds januari 2023 · Race prep", text: "Op de tien kilometer, vier minuten sneller dan vorig jaar. En ik liep hem voor het eerst zonder te wandelen." },
  { n: "3×", unit: "", who: "Jeroen", since: "lid sinds mei 2023 · Open gym", text: "Per week, al anderhalf jaar. Dat hield ik bij geen enkele sportschool hiervoor langer dan een maand vol." },
];

function Band({ words, className }: { words: string[]; className?: string }) {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className={`f-band${className ? ` ${className}` : ""}`} aria-hidden="true">
      <p>
        {row.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </p>
    </div>
  );
}

export default function Forge() {
  return (
    <DemoShell slug="fitness" name="FORGE Performance Club" className={`d-forge ${display.variable} ${text.variable}`}>
      <Nav />
      <main id="top">
        {/* 1 · Opening */}
        <section className="f-hero">
          <div className="f-hero-media">
            <Pic img={I.back} alt="Sporter met een halterstang op de schouders, van achteren gezien" eager sizes="(min-width: 900px) 62vw, 100vw" />
          </div>
          <div className="f-hero-in">
            <p className="f-kicker f-pop" style={{ ["--i" as string]: 0 }}>
              <b>Forge</b> Trainingsclub · Strijp, Eindhoven
            </p>
            <h1>
              <span className="f-l">
                <span>Train</span>
              </span>
              <span className="f-l">
                <span className="f-out">zonder</span>
              </span>
              <span className="f-l">
                <span className="f-acid">excuses.</span>
              </span>
            </h1>
            <div className="f-hero-row">
              <p className="f-lede f-pop" style={{ ["--i" as string]: 4 }}>
                Kleine groepen, zware stangen en coaches die je naam kennen. Kom één keer meetrainen en voel het verschil met een gewone sportschool.
              </p>
              <div className="f-cta f-pop" style={{ ["--i" as string]: 5 }}>
                <a href="#proefles" className="f-btn f-btn-big">
                  Boek een gratis proefles <ArrowRight aria-hidden="true" size={20} strokeWidth={2.6} />
                </a>
                <a href="#rooster" className="f-link">
                  Bekijk het rooster
                </a>
              </div>
            </div>
          </div>
          <dl className="f-hero-facts f-pop" style={{ ["--i" as string]: 7 }}>
            <div>
              <dd>06–23</dd>
              <dt>uur open op werkdagen</dt>
            </div>
            <div>
              <dd>12</dd>
              <dt>sporters per les, maximaal</dt>
            </div>
            <div>
              <dd>4</dd>
              <dt>vaste coaches op de vloer</dt>
            </div>
          </dl>
        </section>

        <Band words={BAND} className="f-band-acid" />

        {/* 2 · Programma's */}
        <section className="f-prog" id="programmas">
          <div className="f-wrap">
            <header className="f-head">
              <p className="f-kicker" data-rv>
                <b>01</b> Trainingsprogramma’s
              </p>
              <h2 data-rv="slam">
                <span>
                  Vijf manieren om <em>sterker</em> te worden.
                </span>
              </h2>
              <p className="f-head-text" data-rv>
                Elk programma heeft een vast schema, een vaste coach en een duidelijk begin. Je hoeft alleen te komen opdagen. Combineren mag, de meeste leden doen er twee.
              </p>
            </header>
          </div>
          <ol className="f-prog-list">
            {PROGRAMS.map((p, i) => (
              <li key={p.name} data-rv style={{ ["--i" as string]: i % 3 }}>
                <a href={p.href}>
                  <span className="f-prog-n" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div className="f-prog-main">
                    <h3>{p.name}</h3>
                    <div className="f-prog-sub">
                      <ul className="f-prog-meta">
                        {p.meta.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                      <p>{p.text}</p>
                    </div>
                  </div>
                  <span className="f-prog-pic">
                    <Pic img={p.img} alt={p.alt} sizes="(min-width: 900px) 22vw, 92vw" />
                  </span>
                  <span className="f-prog-go">
                    {p.cta} <ArrowUpRight aria-hidden="true" size={20} strokeWidth={2.4} />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* 3 · Lesrooster */}
        <section className="f-sched" id="rooster">
          <p className="f-ghost" aria-hidden="true" data-px>
            Rooster
          </p>
          <div className="f-wrap">
            <header className="f-head f-head-split">
              <div>
                <p className="f-kicker" data-rv>
                  <b>02</b> Lesrooster per dag
                </p>
                <h2 data-rv="slam">
                  <span>
                    Kies je dag. <em>Pak</em> je plek.
                  </span>
                </h2>
              </div>
              <p className="f-head-text" data-rv>
                Zesendertig lessen per week, nooit meer dan twaalf sporters. Als lid boek je tot twee weken vooruit. Nog geen lid? Elke les met plek is ook een proefles.
              </p>
            </header>
            <Schedule />
            <ul className="f-legend" data-rv>
              <li>
                <b>Beginner</b> je leert de bewegingen stap voor stap
              </li>
              <li>
                <b>Alle niveaus</b> gewichten en tempo op maat
              </li>
              <li>
                <b>Gevorderd</b> je kent de basisliften
              </li>
            </ul>
          </div>
        </section>

        {/* 4 · Coaches */}
        <section className="f-coaches" id="coaches">
          <div className="f-wrap">
            <header className="f-head f-head-split">
              <div>
                <p className="f-kicker" data-rv>
                  <b>03</b> Coaches
                </p>
                <h2 data-rv="slam">
                  <span>
                    Vier coaches. <em>Geen</em> toeschouwers.
                  </span>
                </h2>
              </div>
              <p className="f-head-text" data-rv>
                Bij FORGE staat er altijd iemand naast je die kijkt, corrigeert en bijhoudt wat je vorige week deed. Tik op een coach om te zien waar die goed in is.
              </p>
            </header>
          </div>
          <div data-rv>
            <Coaches />
          </div>
        </section>

        {/* 5 · Lidmaatschappen */}
        <section className="f-member" id="lidmaatschap">
          <div className="f-wrap">
            <header className="f-head f-head-split">
              <div>
                <p className="f-kicker" data-rv>
                  <b>04</b> Lidmaatschappen
                </p>
                <h2 data-rv="slam">
                  <span>
                    Drie keuzes. <em>Geen</em> kleine lettertjes.
                  </span>
                </h2>
              </div>
              <p className="f-head-text" data-rv>
                Geen inschrijfgeld, geen jaarcontract waar je niet meer uit komt. Betaal per maand en zeg op wanneer je wilt, of betaal een jaar vooruit en train goedkoper.
              </p>
            </header>
            <Plans />
            <p className="f-member-foot" data-rv>
              Liever los? Een enkele les kost € 14, een tienrittenkaart € 120. Studenten en scholieren krijgen 15% korting op elk lidmaatschap.
            </p>
          </div>
        </section>

        {/* 6 · De club */}
        <section className="f-club" id="club">
          <div className="f-club-top">
            <div className="f-club-photo" data-px>
              <Pic img={I.floor} alt="De trainingsvloer van FORGE met banken, rekken en hoge ramen" sizes="100vw" />
            </div>
            <div className="f-wrap">
              <p className="f-kicker" data-rv>
                <b>05</b> De club
              </p>
              <h2 data-rv="slam">
                <span>
                  Geen spiegelwand. <em>Wel</em> veertien rekken.
                </span>
              </h2>
            </div>
          </div>
          <div className="f-wrap f-club-grid">
            <div className="f-club-copy">
              <p className="f-big" data-rv>
                FORGE zit op de bovenste verdieping van een oud fabrieksgebouw in Strijp. Negenhonderd vierkante meter rubber, staal en krijt, met daglicht van drie kanten.
              </p>
              <p data-rv>
                Je vindt hier geen spiegelwand en geen schermen boven de apparaten. Wel genoeg stangen voor een volle les, een baan om een slee over te duwen en een bar waar de koffie klaarstaat als je klaar bent.
              </p>
              <ul className="f-club-list" data-rv>
                <li>Halterstangen en schijven bij elk rek</li>
                <li>Dumbbells van 2 tot 60 kilo</li>
                <li>Sleeën, roeiers en touwen</li>
                <li>Douches, kluisjes en handdoeken</li>
                <li>Koffiebar met zicht op de vloer</li>
                <li>Gratis parkeren voor de deur</li>
              </ul>
            </div>
            <ul className="f-nums">
              {NUMBERS.map((x, i) => (
                <li key={x.text} data-rv style={{ ["--i" as string]: i }}>
                  <b>
                    {x.n}
                    {x.unit && <small>{x.unit}</small>}
                  </b>
                  <span>{x.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="f-club-strip">
            <figure className="s1" data-rv="cut" style={{ ["--i" as string]: 0 }}>
              <Pic img={I.rack} alt="Lange rij dumbbells in het rek met de zaal op de achtergrond" sizes="(min-width: 900px) 34vw, 92vw" />
              <figcaption>Dumbbells, 2 tot 60 kilo</figcaption>
            </figure>
            <figure className="s2" data-rv="cut" style={{ ["--i" as string]: 1 }}>
              <Pic img={I.dumbbells} alt="Zeshoekige dumbbells op een rij, van dichtbij" sizes="(min-width: 900px) 20vw, 44vw" />
            </figure>
            <figure className="s3" data-rv="cut" style={{ ["--i" as string]: 2 }}>
              <Pic img={I.grip} alt="Hand pakt een zware dumbbell uit het rek" sizes="(min-width: 900px) 26vw, 44vw" />
              <figcaption>Krijt mag. Graag zelfs.</figcaption>
            </figure>
            <figure className="s4" data-rv="cut" style={{ ["--i" as string]: 3 }}>
              <Pic img={I.barbell} alt="Sporter tilt een halterstang van de rubberen vloer" sizes="(min-width: 900px) 20vw, 92vw" />
            </figure>
          </div>
        </section>

        <Band words={VERBS} className="f-band-line" />

        {/* 7 · Resultaten */}
        <section className="f-results" id="resultaten">
          <div className="f-wrap f-results-grid">
            <div className="f-results-side">
              <p className="f-kicker" data-rv>
                <b>06</b> Resultaten van leden
              </p>
              <h2 data-rv="slam">
                <span>
                  Geen wonderen. <em>Wel</em> cijfers.
                </span>
              </h2>
              <figure className="f-results-pic" data-rv="cut">
                <Pic img={I.pullup} alt="Sporter hangt aan de optrekstang, van achteren gezien" sizes="(min-width: 900px) 30vw, 92vw" />
              </figure>
            </div>
            <ol className="f-results-list">
              {RESULTS.map((r, i) => (
                <li key={r.who} data-rv style={{ ["--i" as string]: i % 2 }}>
                  <p className="f-res-n" aria-hidden="true">
                    {r.n}
                    {r.unit && <small>{r.unit}</small>}
                  </p>
                  <blockquote>
                    <p>
                      <span className="f-sr">
                        {r.n} {r.unit}.{" "}
                      </span>
                      {r.text}
                    </p>
                    <footer>
                      <b>{r.who}</b>
                      <span>{r.since}</span>
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ol>
          </div>
          <p className="f-results-note f-wrap" data-rv>
            Dit zijn hun cijfers, niet die van jou. Wat jij haalt, hangt af van waar je begint en hoe vaak je komt. Wij beloven alleen dat we elke keer klaarstaan.
          </p>
        </section>

        {/* 8 · Proefles */}
        <section className="f-trial" id="proefles">
          <div className="f-wrap f-trial-grid">
            <div className="f-trial-copy">
              <p className="f-kicker" data-rv>
                <b>07</b> Proefles boeken
              </p>
              <h2 data-rv="slam">
                <span>
                  Eerste les <em>gratis.</em>
                </span>
              </h2>
              <p className="f-big" data-rv>
                Vul in wat je wilt bereiken en wanneer je kunt. Een coach belt je binnen een werkdag en zet je in een les die bij je past.
              </p>
            </div>
            <ol className="f-steps">
              <li data-rv style={{ ["--i" as string]: 0 }}>
                <b>1</b>
                <span>Kies je doel en je dag. Dat kost een minuut.</span>
              </li>
              <li data-rv style={{ ["--i" as string]: 1 }}>
                <b>2</b>
                <span>Een coach belt je en plant je in. Geen verkooppraatje.</span>
              </li>
              <li data-rv style={{ ["--i" as string]: 2 }}>
                <b>3</b>
                <span>Je traint zestig minuten mee. Neem een handdoek mee, de rest ligt klaar.</span>
              </li>
            </ol>
            <div className="f-trial-card" data-rv>
              <Trial />
            </div>
            <figure className="f-trial-pic" data-rv="cut">
              <Pic img={I["coach-1"]} alt="Een coach zit op een bank in de trainingszaal en kijkt opzij" sizes="(min-width: 900px) 36vw, 92vw" />
              <figcaption>Liever eerst bellen? 040 000 00 00, op werkdagen tot 21.00 uur.</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer className="f-foot">
        <div className="f-foot-cta">
          <div className="f-wrap">
            <p className="f-foot-line">Sterker weg dan je kwam. Elke keer.</p>
            <div className="f-foot-acts">
              <a href="#proefles" className="f-btn f-btn-dark f-btn-big">
                Boek een gratis proefles <ArrowRight aria-hidden="true" size={20} strokeWidth={2.6} />
              </a>
              <a href="#rooster" className="f-link">
                Of kijk eerst in het rooster
              </a>
            </div>
          </div>
        </div>
        <div className="f-wrap">
          <div className="f-foot-grid">
            <div>
              <h3>Trainen</h3>
              <a href="#programmas">Programma’s</a>
              <a href="#rooster">Lesrooster</a>
              <a href="#coaches">Coaches</a>
              <a href="#proefles">Personal training</a>
            </div>
            <div>
              <h3>Club</h3>
              <a href="#lidmaatschap">Lidmaatschappen</a>
              <a href="#club">De club</a>
              <a href="#resultaten">Resultaten</a>
              <a href="#proefles">Proefles boeken</a>
            </div>
            <div>
              <h3>Contact</h3>
              <p>
                FORGE Performance Club
                <br />
                Strijp, Eindhoven
              </p>
              <a href="tel:0400000000">040 000 00 00</a>
              <a href="mailto:hallo@forge.example">hallo@forge.example</a>
            </div>
            <div>
              <h3>Open</h3>
              <dl>
                <div>
                  <dt>Ma t/m vr</dt>
                  <dd>06.00 – 23.00</dd>
                </div>
                <div>
                  <dt>Za en zo</dt>
                  <dd>08.00 – 20.00</dd>
                </div>
                <div>
                  <dt>Feestdagen</dt>
                  <dd>09.00 – 16.00</dd>
                </div>
              </dl>
            </div>
          </div>
          <p className="f-foot-mark" aria-hidden="true" data-px>
            <span>Forge</span>
          </p>
          <p className="f-legal">
            <span>© FORGE Performance Club, Eindhoven</span>
            <span>Demo-ontwerp van HOPI · FORGE Performance Club is een fictief bedrijf</span>
          </p>
        </div>
      </footer>
    </DemoShell>
  );
}
