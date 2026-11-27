import type { ReactNode } from "react";
import { Marcellus, Mulish } from "next/font/google";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { Booking, BookingBar, Compass, Gallery, Nav, Rooms, StayProvider, Sun } from "./ui";
import "./style.css";

const display = Marcellus({ subsets: ["latin"], weight: "400", variable: "--t-display", display: "swap" });
const text = Mulish({ subsets: ["latin"], weight: ["300", "400", "600"], variable: "--t-text", display: "swap" });

export const metadata = demoMeta("hotel");
const I = IMAGES.hotel;

/** Section heading, set like a chapter opening in a printed brochure. */
function Head({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return (
    <header className="t-head">
      <p className="t-eyebrow" data-rv="rule">
        <i aria-hidden="true" />
        <span>{label}</span>
        <i aria-hidden="true" />
      </p>
      <h2 data-rv>{title}</h2>
      {children ? (
        <p className="t-lede" data-rv>
          {children}
        </p>
      ) : null}
    </header>
  );
}

const DAY = [
  ["07.00", "Ontbijt in Lente", "Tot 10.30 uur, in het weekend tot 11.30 uur"],
  ["12.00", "Lunch aan de tuinkant", "Tot 15.00 uur, ook om mee te nemen op de fiets"],
  ["15.00", "Thee in de bibliotheek", "Met taart uit eigen keuken"],
  ["16.00", "Bar Schemer open", "Elke dag tot 01.00 uur"],
  ["18.00", "Diner in Lente", "Laatste tafel om 21.30 uur"],
] as const;

const CARD = [
  ["Ontbijt aan tafel", "Brood uit eigen oven, eieren zoals je ze wilt, vers sap", "24"],
  ["Lunch in twee gangen", "Soep van de dag en een bord uit het seizoen", "32"],
  ["Diner in vier gangen", "Groenten uit de regio, vis van de afslag", "62"],
  ["Ostara spritz", "Vlierbloesem, droge mousserende wijn, citroenverbena uit de tuin", "13"],
  ["Plank van Schemer", "Kazen, gedroogde worst, ingelegde groenten", "19"],
] as const;

const WELL = [
  { n: "I", name: "Het bad", text: "Veertien meter lang en altijd 29 graden. Overdag valt het licht van de binnentuin door de lichtstraat op het water.", meta: "Elke dag van 07.00 tot 22.00 uur" },
  { n: "II", name: "Sauna en stoombad", text: "Een Finse sauna van 85 graden, een stoombad met eucalyptus en een emmer koud water voor wie durft.", meta: "Badjas en slippers liggen op je kamer" },
  { n: "III", name: "Behandelingen", text: "Massages en gezichtsbehandelingen in twee behandelkamers naast het bad. Reserveer bij de receptie.", meta: "Massage van 50 minuten € 95" },
];

export default function Ostara() {
  return (
    <DemoShell slug="hotel" name="Hotel Ostara" className={`d-ostara ${display.variable} ${text.variable}`}>
      <StayProvider>
        <Nav />
        <main id="top">
          {/* 1 · Opening */}
          <section className="t-open">
            <div className="t-open-media">
              <Pic img={I["canal-dusk"]} alt="De gracht bij schemering, met verlichte grachtenpanden die in het water spiegelen" eager sizes="100vw" />
            </div>
            <div className="t-open-in">
              <Sun className="t-open-sun" />
              <p className="t-open-eyebrow">
                <i aria-hidden="true" />
                <span>Aan de gracht · Amsterdam</span>
                <i aria-hidden="true" />
              </p>
              <h1>
                <span className="t-sr">Hotel Ostara</span>
                <span className="t-open-pre" aria-hidden="true">
                  Hotel
                </span>
                <span className="t-open-word" aria-hidden="true">
                  {"OSTARA".split("").map((c, i) => (
                    <span key={i} style={{ ["--i" as string]: i }}>
                      {c}
                    </span>
                  ))}
                </span>
              </h1>
              <p className="t-open-lede">Vierentwintig kamers in drie grachtenpanden. Wakker worden aan het water, ontbijten onder de vijgenboom.</p>
            </div>
            <BookingBar />
          </section>

          {/* 2 · Het huis */}
          <section className="t-house" id="huis">
            <div className="t-wrap">
              <Head label="Het huis" title="Drie panden, één voordeur">
                Ostara is de godin van de lente en van het eerste licht. Wie hier ’s ochtends de luiken opent, begrijpt de naam.
              </Head>
              <div className="t-house-grid">
                <div className="t-house-l">
                  <p data-rv>
                    Het huis bestaat uit drie koopmanspanden uit de zeventiende eeuw, rug aan rug rond een binnentuin. Achter de voordeur vind je een bibliotheek met open haard, een atrium waar vroeger de pakzolder was en vierentwintig kamers waarvan er geen twee hetzelfde zijn.
                  </p>
                  <figure className="t-plate t-house-lib" data-rv="plate">
                    <Pic img={I.library} alt="De bibliotheek met donker houten lambrisering, een bank en boekenkasten tot het plafond" sizes="(min-width: 960px) 28vw, 92vw" />
                    <figcaption>De bibliotheek, de hele dag open voor gasten</figcaption>
                  </figure>
                </div>
                <figure className="t-plate t-house-c" data-rv="plate" data-px>
                  <Pic img={I.atrium} alt="Het atrium met een glazen dak, hanglampen en een stalen trap naar de kamers" sizes="(min-width: 960px) 30vw, 92vw" />
                  <figcaption>Het atrium, ooit de pakzolder</figcaption>
                </figure>
                <div className="t-house-r">
                  <figure className="t-plate t-house-linen" data-rv="plate">
                    <Pic img={I.linen} alt="Ochtendlicht dat over wit beddengoed valt" sizes="(min-width: 960px) 28vw, 92vw" />
                    <figcaption>Het eerste licht, rond half zeven</figcaption>
                  </figure>
                  <p data-rv>
                    De receptie is dag en nacht bezet, door mensen die de buurt kennen. Zij weten waar je vanavond moet eten, welke brug je bij zonsondergang moet hebben en hoe laat de bakker om de hoek opengaat.
                  </p>
                </div>
              </div>
              <ul className="t-facts">
                <li data-rv style={{ ["--i" as string]: 0 }}>
                  <b>24</b>
                  <span>kamers en suites, geen twee gelijk</span>
                </li>
                <li data-rv style={{ ["--i" as string]: 1 }}>
                  <b>3</b>
                  <span>grachtenpanden uit de zeventiende eeuw</span>
                </li>
                <li data-rv style={{ ["--i" as string]: 2 }}>
                  <b>1</b>
                  <span>binnentuin met een vijgenboom</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 3 · Kamers en suites */}
          <section className="t-rooms" id="kamers">
            <div className="t-wrap">
              <Head label="Kamers en suites" title="Vijf manieren om wakker te worden">
                Elke kamer heeft zijn eigen karakter en zijn eigen uitzicht. Kies er een en bekijk wat erbij hoort.
              </Head>
            </div>
            <div className="t-wrap t-rooms-wrap">
              <Rooms />
              <p className="t-note" data-rv>
                Prijzen per kamer per nacht, inclusief btw en exclusief toeristenbelasting. Inchecken vanaf 15.00 uur, uitchecken tot 11.00 uur.
              </p>
            </div>
          </section>

          {/* 4 · Restaurant en bar */}
          <section className="t-eat" id="restaurant">
            <div className="t-wrap">
              <Head label="Restaurant en bar" title="Lente overdag, Schemer in de avond">
                Twee plekken onder één dak. Ook als je niet bij ons slaapt, ben je welkom.
              </Head>
              <div className="t-eat-grid">
                <article className="t-eat-col">
                  <figure className="t-plate" data-rv="plate">
                    <Pic img={I.restaurant} alt="Het restaurant met lichte tafels, hanglampen en grote ramen, gezien door groene bladeren" sizes="(min-width: 900px) 40vw, 92vw" style={{ objectPosition: "78% 50%" }} />
                  </figure>
                  <p className="t-eat-kicker" data-rv>
                    Restaurant
                  </p>
                  <h3 data-rv>Lente</h3>
                  <p data-rv>Ontbijt, lunch en diner aan de tuinkant. De keuken kookt Hollands en licht: groenten van telers uit de regio, vis van de afslag en brood dat elke ochtend in huis wordt gebakken.</p>
                </article>
                <article className="t-eat-col">
                  <figure className="t-plate" data-rv="plate">
                    <Pic img={I["cocktail-bar"]} alt="De bar bij avond, met rijen flessen en warme lampen boven de toog" sizes="(min-width: 900px) 40vw, 92vw" />
                  </figure>
                  <p className="t-eat-kicker" data-rv>
                    Bar
                  </p>
                  <h3 data-rv>Schemer</h3>
                  <p data-rv>Als het licht op de gracht verandert, gaat de bar open. Cocktails met kruiden uit de binnentuin, wijn per glas en een kleine kaart tot laat op de avond.</p>
                </article>
              </div>

              <div className="t-eat-lists">
                <div>
                  <h3 className="t-sub" data-rv>
                    Een dag aan tafel
                  </h3>
                  <ol className="t-day">
                    {DAY.map(([time, name, note], i) => (
                      <li key={name} data-rv style={{ ["--i" as string]: i }}>
                        <b>{time}</b>
                        <div>
                          <strong>{name}</strong>
                          <span>{note}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="t-sub" data-rv>
                    Van de kaart
                  </h3>
                  <ul className="t-card">
                    {CARD.map(([name, note, price], i) => (
                      <li key={name} data-rv style={{ ["--i" as string]: i }}>
                        <div>
                          <strong>{name}</strong>
                          <span>{note}</span>
                        </div>
                        <i aria-hidden="true" />
                        <b>€ {price}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="t-eat-strip">
                <figure className="t-plate" data-rv="plate" style={{ ["--i" as string]: 0 }}>
                  <Pic img={I.breakfast} alt="Ontbijt van bovenaf: kommen fruit, wafels en koffie op een marmeren tafel" sizes="(min-width: 900px) 30vw, 92vw" />
                  <figcaption>Ontbijt tot half elf</figcaption>
                </figure>
                <figure className="t-plate" data-rv="plate" style={{ ["--i" as string]: 1 }}>
                  <Pic img={I.table} alt="Een houten tafel vol broodjes, kaas en sap, van bovenaf gezien" sizes="(min-width: 900px) 30vw, 92vw" />
                  <figcaption>Lunch om te delen</figcaption>
                </figure>
                <figure className="t-plate" data-rv="plate" style={{ ["--i" as string]: 2 }}>
                  <Pic img={I.coffee} alt="Drie handen proosten met koppen koffie" sizes="(min-width: 900px) 30vw, 92vw" />
                  <figcaption>Koffie, de hele dag door</figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* 5 · Wellness */}
          <section className="t-well" id="wellness">
            <figure className="t-well-wide" data-px>
              <Pic img={I.pool} alt="Het binnenbad met turquoise water, houten wanden en ligbedden langs de rand" sizes="100vw" />
            </figure>
            <div className="t-wrap">
              <div className="t-well-card">
                <Head label="Wellness" title="Onder het huis is het stil">
                  In de gewelven onder de drie panden liggen een verwarmd bad, een sauna en een stoombad. Voor hotelgasten elke dag open, zonder reserveren en zonder toeslag.
                </Head>
              </div>
              <ul className="t-well-cols">
                {WELL.map((w, i) => (
                  <li key={w.name} data-rv style={{ ["--i" as string]: i }}>
                    <b aria-hidden="true">{w.n}</b>
                    <h3>{w.name}</h3>
                    <p>{w.text}</p>
                    <small>{w.meta}</small>
                  </li>
                ))}
              </ul>
              <div className="t-well-pair">
                <figure className="t-plate" data-rv="plate">
                  <Pic img={I.sauna} alt="De sauna met lichte houten banken en gedempt licht" sizes="(min-width: 900px) 52vw, 92vw" />
                  <figcaption>De Finse sauna</figcaption>
                </figure>
                <figure className="t-plate" data-rv="plate" style={{ ["--i" as string]: 1 }}>
                  <Pic img={I.bath} alt="Een vrijstaand bad voor een wand van natuursteen, met een palm ernaast" sizes="(min-width: 900px) 34vw, 92vw" />
                  <figcaption>Na de sauna: een bad voor jou alleen</figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* 6 · Galerij */}
          <section className="t-gallery" id="galerij">
            <div className="t-wrap">
              <Head label="Galerij" title="Het huis in beeld">
                Tik op een foto om hem groot te zien.
              </Head>
              <Gallery />
              <blockquote className="t-quote" data-rv>
                <Sun />
                <p>“We kwamen voor twee nachten en hebben er op de eerste ochtend een derde bij geboekt.”</p>
                <footer>Fleur, sliep in de Atelier suite</footer>
              </blockquote>
            </div>
          </section>

          {/* 7 · De buurt */}
          <section className="t-hood" id="buurt">
            <div className="t-wrap">
              <Head label="De buurt" title="Alles dichtbij, behalve de haast">
                Ostara ligt aan de rustige kant van de grachtengordel. De deur uit en je staat op een brug, vier minuten later in de Jordaan.
              </Head>
              <Compass />
            </div>
            <figure className="t-hood-wide" data-px>
              <Pic img={I["canal-day"]} alt="De gracht op een zomerdag met bootjes langs de kade en bomen vol blad" sizes="100vw" />
              <figcaption>
                <span>Fietsen staan klaar bij de voordeur</span>
                <span>Een sloep met schipper regelen we op aanvraag</span>
              </figcaption>
            </figure>
          </section>

          {/* 8 · Boeken */}
          <section className="t-book" id="boeken">
            <div className="t-wrap">
              <Head label="Boeken" title="Je kamer staat klaar">
                Boek rechtstreeks bij het huis: de laagste prijs, gratis annuleren tot 48 uur voor aankomst en een glas van Schemer bij binnenkomst.
              </Head>
              <div className="t-book-sheet" data-rv>
                <Booking />
              </div>
            </div>
          </section>
        </main>

        <footer className="t-foot">
          <div className="t-wrap">
            <div className="t-foot-mark">
              <Sun />
              <p aria-hidden="true">Ostara</p>
              <span>Hotel aan de gracht, Amsterdam centrum</span>
            </div>
            <div className="t-foot-grid">
              <div>
                <h3>Het hotel</h3>
                <a href="#huis">Het huis</a>
                <a href="#kamers">Kamers en suites</a>
                <a href="#galerij">Galerij</a>
                <a href="#buurt">De buurt</a>
              </div>
              <div>
                <h3>Eten en ontspannen</h3>
                <a href="#restaurant">Restaurant Lente</a>
                <a href="#restaurant">Bar Schemer</a>
                <a href="#wellness">Bad en sauna</a>
                <a href="#wellness">Behandelingen</a>
              </div>
              <div>
                <h3>Tijden</h3>
                <p>Receptie: dag en nacht</p>
                <p>Inchecken vanaf 15.00 uur</p>
                <p>Uitchecken tot 11.00 uur</p>
                <p>Restaurant 07.00 tot 22.00 uur</p>
                <p>Bar 16.00 tot 01.00 uur</p>
              </div>
              <div>
                <h3>Contact</h3>
                <p>Aan de gracht, Amsterdam centrum</p>
                <a href="tel:0200000000">020 000 00 00</a>
                <a href="mailto:welkom@hotelostara.example">welkom@hotelostara.example</a>
                <a href="#boeken" className="t-foot-book">
                  Boek je verblijf
                </a>
              </div>
            </div>
            <p className="t-legal">
              <span>© Hotel Ostara, Amsterdam</span>
              <span>Demo-ontwerp van HOPI · Hotel Ostara is een fictief bedrijf</span>
            </p>
          </div>
        </footer>
      </StayProvider>
    </DemoShell>
  );
}
