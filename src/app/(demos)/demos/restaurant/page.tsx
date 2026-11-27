import { Cormorant_Garamond, Jost } from "next/font/google";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { MenuCards, Nav, Reserve } from "./ui";
import "./style.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--v-serif", display: "swap" });
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--v-sans", display: "swap" });

export const metadata = demoMeta("restaurant");
const I = IMAGES.restaurant;

const SIGNATURES = [
  { img: I["dish-salmon"], alt: "Zalm op de huid met groene groenten op een zwart bord", name: "Zalm op de huid", text: "Het gerecht dat sinds de eerste avond op de kaart staat." },
  { img: I.steak, alt: "Gesneden steak op een houten plank", name: "Rund van de grill", text: "Vier weken gerijpt, boven houtskool van beukenhout." },
  { img: I["dish-egg"], alt: "Gepocheerd ei op groenten op een donker bord", name: "Ei, spinazie, truffel", text: "Een voorgerecht dat gasten terugvragen." },
  { img: I["dish-greens"], alt: "Salade met sinaasappel op een zwart bord", name: "Bittere bladeren", text: "Witlof, sinaasappel, gebrande pit. Elke week anders." },
  { img: I["dish-pork"], alt: "Varkensrib met appel en groene groenten", name: "Rib van het Livar-varken", text: "Appel uit de Betuwe, mosterdzaad, eigen jus." },
];

const GUESTS = [
  { quote: "De proeverij duurt drie uur en ik heb geen moment op mijn telefoon gekeken. Dat zegt genoeg.", who: "Marit", note: "at de proeverij in oktober" },
  { quote: "Bediening die precies weet wanneer je wilt praten en wanneer niet. En die tarbot. Die tarbot.", who: "Joost en Evi", note: "vierden hun tiende jaar samen" },
  { quote: "Eindelijk een wijnkaart waar je geen diploma voor nodig hebt. De sommelier koos, wij genoten.", who: "Sanne", note: "kwam met zes collega's" },
];

export default function Vesper() {
  return (
    <DemoShell slug="restaurant" name="Vesper" className={`d-vesper ${serif.variable} ${sans.variable}`}>
      <Nav />
      <main id="top">
        {/* 1 · Opening */}
        <section className="v-hero">
          <div className="v-hero-media">
            <Pic img={I.hero} alt="Een bord van de proeverij op een gedekte tafel bij kaarslicht" eager sizes="100vw" />
          </div>
          <div className="v-hero-in">
            <p className="v-eyebrow v-rise" style={{ ["--i" as string]: 0 }}>
              Restaurant · Amsterdam
            </p>
            <h1>
              <span className="v-line">
                <span>Elke avond</span>
              </span>
              <span className="v-line">
                <span>
                  begint bij <em>Vesper.</em>
                </span>
              </span>
            </h1>
            <p className="v-lede v-rise" style={{ ["--i" as string]: 3 }}>
              Zeven gangen uit het seizoen, een open keuken en een tafel die de hele avond van jou is.
            </p>
            <div className="v-cta v-rise" style={{ ["--i" as string]: 4 }}>
              <a href="#reserveren" className="v-btn v-btn-fill">
                Reserveer een tafel
              </a>
              <a href="#menu" className="v-btn v-btn-text">
                Bekijk het menu
              </a>
            </div>
          </div>
          <dl className="v-hero-foot v-rise" style={{ ["--i" as string]: 6 }}>
            <div>
              <dt>Open</dt>
              <dd>Wo t/m zo, vanaf 18.00</dd>
            </div>
            <div>
              <dt>Keuken</dt>
              <dd>Frans-Nederlands, uit het seizoen</dd>
            </div>
            <div>
              <dt>Waar</dt>
              <dd>Grachtengordel, Amsterdam</dd>
            </div>
          </dl>
        </section>

        {/* 2 · Het verhaal */}
        <section className="v-story" id="verhaal">
          <div className="v-wrap v-story-grid">
            <div className="v-story-copy">
              <p className="v-eyebrow" data-rv>
                Het verhaal
              </p>
              <h2 data-rv>
                Een keuken zonder deur, <em>een kaart zonder haast.</em>
              </h2>
              <p className="v-big" data-rv>
                Vesper is het avondgebed, het uur waarop de dag stilvalt. Zo koken we ook. Wat de teler die ochtend brengt, bepaalt wat er die avond op je bord ligt.
              </p>
              <p data-rv>
                Chef Thomas van Rijn en zijn brigade werken in het zicht van de zaal. Je ziet het vuur, hoort de pannen en krijgt je bord van degene die het gemaakt heeft. Achtendertig couverts, één zitting per avond, niemand die op je tafel wacht.
              </p>
              <ul className="v-facts" data-rv>
                <li>
                  <b>7</b>
                  <span>gangen in de proeverij</span>
                </li>
                <li>
                  <b>38</b>
                  <span>couverts, één zitting</span>
                </li>
                <li>
                  <b>24</b>
                  <span>telers en vissers bij naam</span>
                </li>
              </ul>
            </div>
            <figure className="v-story-a" data-rv="img">
              <Pic img={I["chef-plating"]} alt="De chef maakt borden op aan de pas" sizes="(min-width: 900px) 34vw, 86vw" />
              <figcaption>Thomas van Rijn aan de pas, 17.52 uur</figcaption>
            </figure>
            <figure className="v-story-b" data-rv="img" data-px>
              <Pic img={I["chef-fire"]} alt="Een kok flambeert boven het vuur in de open keuken" sizes="(min-width: 900px) 26vw, 60vw" />
            </figure>
          </div>
        </section>

        {/* Band */}
        <div className="v-band" aria-hidden="true">
          <p>
            {["Oester", "Noordzeetong", "Hert", "Morilles", "Tarbot", "Bloedsinaasappel", "Oester", "Noordzeetong", "Hert", "Morilles", "Tarbot", "Bloedsinaasappel"].map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </p>
        </div>

        {/* 3 · Menu */}
        <section className="v-menus" id="menu">
          <div className="v-wrap">
            <header className="v-head">
              <p className="v-eyebrow" data-rv>
                De kaart van deze week
              </p>
              <h2 data-rv>
                Proeven, <em>kiezen of blijven hangen.</em>
              </h2>
            </header>
            <MenuCards />
            <p className="v-small" data-rv>
              Allergie of dieetwens? Zeg het bij je reservering, dan koken we er een volwaardig menu omheen.
            </p>
          </div>
        </section>

        {/* 4 · Signatuurgerechten */}
        <section className="v-sig" aria-labelledby="v-sig-h">
          <div className="v-wrap v-sig-head">
            <h2 id="v-sig-h" data-rv>
              Waar we <em>om bekendstaan</em>
            </h2>
            <p data-rv>Vijf borden die de kaart niet meer verlaten. Veeg opzij om ze te zien.</p>
          </div>
          <ol className="v-sig-row">
            {SIGNATURES.map((s, i) => (
              <li key={s.name} data-rv style={{ ["--i" as string]: i }}>
                <div className="v-sig-img">
                  <Pic img={s.img} alt={s.alt} sizes="(min-width: 900px) 30vw, 72vw" />
                </div>
                <small>N° {i + 1}</small>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 5 · Wijn & bar */}
        <section className="v-wine" id="wijn">
          <div className="v-wine-media" data-px>
            <Pic img={I.bar} alt="De bar van Vesper met koperen lampen en flessen tot aan het plafond" sizes="(min-width: 900px) 50vw, 100vw" />
          </div>
          <div className="v-wine-copy">
            <p className="v-eyebrow" data-rv>
              Wijn & bar
            </p>
            <h2 data-rv>
              Driehonderd flessen, <em>één goed advies.</em>
            </h2>
            <p data-rv>
              Onze sommelier Anouk Dekker schenkt het liefst wat je nog niet kent. Kleine wijnboeren, veel per glas, en bij elke gang een arrangement dat klopt.
            </p>
            <ul className="v-pairs" data-rv>
              <li>
                <span>Wijnarrangement, zeven glazen</span>
                <b>72</b>
              </li>
              <li>
                <span>Alcoholvrij arrangement</span>
                <b>48</b>
              </li>
              <li>
                <span>Aperitief aan de bar, vanaf 17.00</span>
                <b>13</b>
              </li>
            </ul>
            <div className="v-wine-small" data-rv>
              <Pic img={I.cocktail} alt="Een cocktail wordt uitgeschonken over een groot blok ijs" sizes="(min-width: 900px) 20vw, 50vw" />
              <p>De bar is ook open zonder reservering. Schuif aan voor een glas en de kleine kaart.</p>
            </div>
          </div>
        </section>

        {/* 6 · Galerij */}
        <section className="v-gallery" id="galerij" aria-labelledby="v-gal-h">
          <div className="v-wrap">
            <h2 id="v-gal-h" data-rv>
              Een avond <em>in beeld</em>
            </h2>
            <div className="v-gal">
              <figure className="g1" data-rv="img">
                <Pic img={I.interior} alt="De zaal van Vesper, donker hout en gedekte tafels" sizes="(min-width: 900px) 58vw, 100vw" />
              </figure>
              <figure className="g2" data-rv="img" data-px>
                <Pic img={I["interior-tall"]} alt="Doorkijk naar de zaal met hanglampen" sizes="(min-width: 900px) 28vw, 50vw" />
              </figure>
              <figure className="g3" data-rv="img">
                <Pic img={I.wine} alt="Een glas rode wijn met druiven" sizes="(min-width: 900px) 24vw, 50vw" />
              </figure>
              <figure className="g4" data-rv="img" data-px>
                <Pic img={I.toast} alt="Gasten proosten met rode wijn" sizes="(min-width: 900px) 38vw, 100vw" />
              </figure>
              <figure className="g5" data-rv="img">
                <Pic img={I["dining-room"]} alt="Een tafel voor twee bij het raam" sizes="(min-width: 900px) 24vw, 50vw" />
              </figure>
              <figure className="g6" data-rv="img">
                <Pic img={I.kitchen} alt="De brigade aan het werk in de open keuken" sizes="(min-width: 900px) 34vw, 50vw" />
              </figure>
            </div>
          </div>
        </section>

        {/* 7 · Gasten */}
        <section className="v-guests" aria-labelledby="v-guests-h">
          <div className="v-wrap">
            <p className="v-eyebrow" id="v-guests-h" data-rv>
              Gasten over Vesper
            </p>
            <div className="v-quotes">
              {GUESTS.map((g, i) => (
                <blockquote key={g.who} data-rv style={{ ["--i" as string]: i }}>
                  <p>{g.quote}</p>
                  <footer>
                    <b>{g.who}</b>
                    <span>{g.note}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* 8 · Reserveren */}
        <section className="v-reserve" id="reserveren">
          <div className="v-wrap v-reserve-grid">
            <div className="v-reserve-copy">
              <p className="v-eyebrow" data-rv>
                Reserveren
              </p>
              <h2 data-rv>
                Je tafel <em>staat klaar.</em>
              </h2>
              <p data-rv>Reserveren kan tot zestig dagen vooruit. Met zeven of meer gasten? Bel ons, dan dekken we de lange tafel in de wijnkamer.</p>
              <dl className="v-hours" data-rv>
                <div>
                  <dt>Woensdag en donderdag</dt>
                  <dd>18.00 – 23.00</dd>
                </div>
                <div>
                  <dt>Vrijdag en zaterdag</dt>
                  <dd>17.00 – 00.30</dd>
                </div>
                <div>
                  <dt>Zondag</dt>
                  <dd>17.00 – 22.30</dd>
                </div>
                <div>
                  <dt>Maandag en dinsdag</dt>
                  <dd>Gesloten</dd>
                </div>
              </dl>
              <address data-rv>
                Vesper
                <br />
                Grachtengordel, Amsterdam
                <br />
                020 000 00 00 · tafel@vesper.example
              </address>
            </div>
            <div className="v-reserve-card" data-rv>
              <Reserve />
            </div>
          </div>
        </section>
      </main>

      <footer className="v-foot">
        <div className="v-wrap">
          <p className="v-foot-mark" aria-hidden="true">
            Vesper
          </p>
          <div className="v-foot-grid">
            <div>
              <h3>Restaurant</h3>
              <a href="#verhaal">Het verhaal</a>
              <a href="#menu">Menu</a>
              <a href="#wijn">Wijn & bar</a>
              <a href="#galerij">Galerij</a>
            </div>
            <div>
              <h3>Bezoek</h3>
              <a href="#reserveren">Reserveren</a>
              <a href="#reserveren">Openingstijden</a>
              <a href="#reserveren">Groepen en wijnkamer</a>
              <a href="#reserveren">Cadeaubon</a>
            </div>
            <div>
              <h3>Volg ons</h3>
              <a href="#top">Instagram</a>
              <a href="#top">Nieuwsbrief</a>
            </div>
            <p className="v-foot-note">
              Vesper kookt met wat het seizoen geeft. De kaart wisselt daarom elke week, soms elke dag.
            </p>
          </div>
          <p className="v-legal">
            <span>© Vesper, Amsterdam</span>
            <span>Demo-ontwerp van HOPI · Vesper is een fictief restaurant</span>
          </p>
        </div>
      </footer>
    </DemoShell>
  );
}
