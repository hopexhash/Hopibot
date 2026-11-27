import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { CatLink, Collections, Grid, Header, Lookbook, Newsletter, ProductTag, Shop } from "./ui";
import "./style.css";

const serif = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--l-serif", display: "swap" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--l-sans", display: "swap" });

export const metadata = demoMeta("fashion");
const I = IMAGES.fashion;

const SERVICE = [
  { h: "Verzending", t: "Gratis vanaf € 150. In België en Nederland binnen 1 tot 2 werkdagen in huis." },
  { h: "Retour", t: "30 dagen bedenktijd. Terugbrengen in de winkel kost niets." },
  { h: "Herstel", t: "Losse knoop of versleten voering? Ons atelier maakt het in orde." },
  { h: "Winkel", t: "Het Zuid, Antwerpen. Dinsdag t/m zaterdag open." },
];

const SIZES = [
  ["XS", "34", "80 – 84", "62 – 66", "88 – 92"],
  ["S", "36", "84 – 88", "66 – 70", "92 – 96"],
  ["M", "38", "88 – 92", "70 – 74", "96 – 100"],
  ["L", "40", "92 – 97", "74 – 79", "100 – 105"],
  ["XL", "42", "97 – 102", "79 – 84", "105 – 110"],
];

export default function LuneAtelier() {
  return (
    <DemoShell slug="fashion" name="Lune Atelier" className={`d-lune ${serif.variable} ${sans.variable}`}>
      <Shop>
        <div className="l-bar" id="top">
          <p>Gratis verzending vanaf € 150 in België en Nederland</p>
          <p>30 dagen bedenktijd</p>
          <p>Herstelservice in ons eigen atelier</p>
        </div>
        <Header />

        <main>
          {/* 1 · Campagne-opening */}
          <section className="l-hero" aria-labelledby="l-h1">
            <div className="l-hero-in">
              <div className="l-spread">
                <p className="l-label l-hero-eyebrow l-rise" style={{ ["--i" as string]: 0 }}>
                  Collectie N° 07 <i aria-hidden="true" /> Herfst en winter
                </p>
                <figure className="l-ph l-ph-a" style={{ ["--i" as string]: 0 }} data-px>
                  <span>
                    <Pic img={I["look-blazer"]} alt="Model in een grijs geruite blazer op een wit hemd met een zwart lint" eager sizes="(min-width: 900px) 34vw, 72vw" />
                  </span>
                </figure>
                <figure className="l-ph l-ph-b" style={{ ["--i" as string]: 2 }} data-px>
                  <span>
                    <Pic img={I["look-knit"]} alt="Model in een gestreepte trui op de rotsen aan het water" sizes="(min-width: 900px) 26vw, 46vw" />
                  </span>
                </figure>
                <figure className="l-ph l-ph-c" style={{ ["--i" as string]: 4 }} data-px>
                  <span>
                    <Pic img={I["look-dark"]} alt="Portret van een model in een zwarte top van tule" sizes="(min-width: 900px) 16vw, 1px" />
                  </span>
                </figure>
                <h1 id="l-h1">
                  <span className="l-line">
                    <span>Het lange</span>
                  </span>
                  <span className="l-line l-line-2">
                    <span>
                      <em>najaar</em>
                    </span>
                  </span>
                </h1>
              </div>
              <div className="l-hero-copy l-rise" style={{ ["--i" as string]: 5 }}>
                <p>Zestien stukken in wol, katoen en zijde. Getekend in Antwerpen, gemaakt om meer dan één seizoen mee te gaan.</p>
                <div>
                  <a href="#winkel" className="l-btn">
                    <span>Shop de collectie</span>
                  </a>
                  <a href="#lookbook" className="l-link">
                    Bekijk het lookbook
                  </a>
                </div>
              </div>
              <ul className="l-hero-tags">
                <li className="l-rise" style={{ ["--i" as string]: 7 }}>
                  <ProductTag id="margaux" look="Look 01" />
                </li>
                <li className="l-rise" style={{ ["--i" as string]: 8 }}>
                  <ProductTag id="solene" look="Look 03" />
                </li>
              </ul>
            </div>
          </section>

          <ul className="l-strip" aria-label="Service in het kort">
            {SERVICE.map((s, i) => (
              <li key={s.h} data-rv style={{ ["--i" as string]: i }}>
                <b>{s.h}</b>
                <span>{s.t}</span>
              </li>
            ))}
          </ul>

          {/* 2 · Collecties */}
          <section className="l-sec l-colls" id="collecties">
            <div className="l-wrap">
              <header className="l-head2">
                <p className="l-label" data-rv>
                  Collecties
                </p>
                <h2 data-rv>
                  Vijf hoofdstukken, <em>één garderobe.</em>
                </h2>
                <p className="l-intro" data-rv>
                  Alles past bij alles. Dat is geen toeval: elk seizoen vertrekt van hetzelfde palet van krijt, karamel, mos en nacht.
                </p>
              </header>
              <Collections />
            </div>
          </section>

          {/* 3 · Productraster · 4 productweergave · 5 winkelmandje (panelen in ui.tsx) */}
          <section className="l-sec l-winkel" id="winkel">
            <div className="l-wrap">
              <header className="l-head2 l-head2-row">
                <h2 data-rv>
                  De <em>collectie</em>
                </h2>
                <p className="l-intro" data-rv>
                  Herfst en winter, compleet. Tik op een stuk voor maten, materiaal en verzorging.
                </p>
              </header>
              <Grid />
            </div>
          </section>

          {/* 6 · Lookbook */}
          <section className="l-sec l-look" id="lookbook">
            <div className="l-wrap l-look-head">
              <p className="l-label" data-rv>
                Lookbook N° 07
              </p>
              <h2 data-rv>
                Zeven looks, <em>gedragen in de stad.</em>
              </h2>
              <p className="l-intro" data-rv>
                Gefotografeerd op een grijze dinsdag tussen het Zuid en de Schelde. Veeg opzij en tik op een look om het stuk te bekijken.
              </p>
            </div>
            <Lookbook />
          </section>

          {/* 7 · Het atelier */}
          <section className="l-sec l-atelier" id="atelier">
            <div className="l-wrap l-atelier-grid">
              <div className="l-atelier-title">
                <p className="l-label" data-rv>
                  Het atelier
                </p>
                <h2 data-rv>
                  Getekend op het Zuid, <em>gemaakt om te blijven.</em>
                </h2>
              </div>
              <figure className="l-atelier-a" data-rv="img" data-px>
                <Pic img={I.store} alt="De winkel van Lune Atelier met kledingrekken aan touwen en industriële lampen" sizes="(min-width: 900px) 56vw, 100vw" />
                <figcaption>Winkel en atelier, Het Zuid</figcaption>
              </figure>
              <div className="l-atelier-copy">
                <p className="l-lead" data-rv>
                  Lune Atelier begon in 2016 op een zolder boven een lijstenmaker. Nora Claes tekende er zes jassen, liet ze naaien in een familieatelier bij Porto en verkocht ze aan vriendinnen.
                </p>
                <p data-rv>
                  Die zolder is intussen een winkel met een werkplaats erachter, maar de werkwijze is dezelfde gebleven. Elk patroon wordt hier getekend, op echte mensen gepast en pas dan in productie genomen, bij vier ateliers die we bij naam kennen en elk jaar bezoeken.
                </p>
                <p data-rv>
                  We maken weinig en we maken het goed. Wat verslijt, herstellen we. Overschotten kennen we nauwelijks, want we snijden pas als de winkel erom vraagt.
                </p>
              </div>
              <figure className="l-atelier-b" data-rv="img" data-px>
                <Pic img={I["rack-coats"]} alt="Jassen van de collectie aan een stalen rek, met een hoed aan het uiteinde" sizes="(min-width: 900px) 30vw, 70vw" />
              </figure>
              <blockquote className="l-quote" data-rv>
                <p>Een goede jas koop je één keer. Daarna laat je hem alleen nog herstellen.</p>
                <footer>Nora Claes, oprichter en ontwerper</footer>
              </blockquote>
              <ul className="l-facts">
                <li data-rv style={{ ["--i" as string]: 0 }}>
                  <b>16</b>
                  <span>stukken per seizoen, niet meer</span>
                </li>
                <li data-rv style={{ ["--i" as string]: 1 }}>
                  <b>4</b>
                  <span>ateliers, alle vier binnen Europa</span>
                </li>
                <li data-rv style={{ ["--i" as string]: 2 }}>
                  <b>30</b>
                  <span>dagen om te passen, te twijfelen en te ruilen</span>
                </li>
              </ul>
              <dl className="l-visit" data-rv>
                <div>
                  <dt>Bezoek de winkel</dt>
                  <dd>Het Zuid, Antwerpen</dd>
                </div>
                <div>
                  <dt>Dinsdag t/m vrijdag</dt>
                  <dd>10.30 – 18.00</dd>
                </div>
                <div>
                  <dt>Zaterdag</dt>
                  <dd>10.00 – 18.00</dd>
                </div>
                <div>
                  <dt>Zondag en maandag</dt>
                  <dd>Gesloten</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* 8 · Service en nieuwsbrief */}
          <section className="l-sec l-service" id="service">
            <div className="l-wrap l-service-grid">
              <div>
                <p className="l-label" data-rv>
                  Service
                </p>
                <h2 data-rv>
                  Goed geregeld, <em>ook na de aankoop.</em>
                </h2>
                <div className="l-acc l-acc-big" data-rv>
                  <details open name="l-service">
                    <summary>Verzending</summary>
                    <div>
                      <p>Bestellingen voor 15.00 uur vertrekken dezelfde werkdag. In België en Nederland is je pakket binnen 1 tot 2 werkdagen in huis. Verzending kost € 5,95 en is gratis vanaf € 150. Afhalen in de winkel in Antwerpen kan altijd en kost niets.</p>
                    </div>
                  </details>
                  <details name="l-service">
                    <summary>Retourneren en ruilen</summary>
                    <div>
                      <p>Je hebt 30 dagen bedenktijd. Terugsturen per post kost € 4,95, terugbrengen in de winkel is gratis. Ruilen voor een andere maat doen we één keer kosteloos. Je geld staat binnen vijf werkdagen terug op je rekening.</p>
                    </div>
                  </details>
                  <details name="l-service">
                    <summary>Herstelservice</summary>
                    <div>
                      <p>Een losse knoop, een gescheurde voering, een rits die hapert: breng of stuur je stuk naar het atelier. Kleine herstellingen zijn gratis, zolang het stuk leeft. Voor groter werk krijg je vooraf een prijs.</p>
                    </div>
                  </details>
                  <details name="l-service">
                    <summary>Betalen</summary>
                    <div>
                      <p>Betalen kan met je bankkaart, kredietkaart of bankapp, of achteraf op factuur binnen 14 dagen. In deze demo kun je uiteraard niets betalen.</p>
                    </div>
                  </details>
                  <details name="l-service">
                    <summary>Cadeau geven</summary>
                    <div>
                      <p>Elk stuk verpakken we op verzoek in zijdepapier en een doos, met een handgeschreven kaart. De prijs laten we dan van de bon. Cadeaubonnen zijn er vanaf € 25 en blijven drie jaar geldig.</p>
                    </div>
                  </details>
                </div>
              </div>
              <div className="l-maten" id="maten" data-rv>
                <p className="l-label">Maattabel</p>
                <h3>Welke maat ben je bij ons?</h3>
                <div className="l-table">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Maat</th>
                        <th scope="col">BE / NL</th>
                        <th scope="col">Borst</th>
                        <th scope="col">Taille</th>
                        <th scope="col">Heup</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SIZES.map((r) => (
                        <tr key={r[0]}>
                          <th scope="row">{r[0]}</th>
                          {r.slice(1).map((c) => (
                            <td key={c}>{c}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>Maten in centimeters, gemeten op het lichaam. Twijfel je tussen twee maten? Onze mantels en breisels vallen ruim: neem de kleinste. Of bel de winkel op 03 000 00 00, dan meten we het stuk voor je na.</p>
              </div>
            </div>
          </section>

          <section className="l-news" id="nieuwsbrief" aria-labelledby="l-news-h">
            <div className="l-wrap l-news-grid">
              <div>
                <p className="l-label" data-rv>
                  Nieuwsbrief
                </p>
                <h2 id="l-news-h" data-rv>
                  Brieven uit <em>het atelier.</em>
                </h2>
              </div>
              <div data-rv>
                <p>Eén keer per maand, nooit vaker. Nieuwe stukken zie je een dag eerder en bij je eerste bestelling krijg je 10% korting.</p>
                <Newsletter />
              </div>
            </div>
          </section>
        </main>

        <footer className="l-foot">
          <div className="l-wrap">
            <div className="l-foot-grid">
              <div>
                <h3>Winkel</h3>
                <CatLink cat="alles">De hele collectie</CatLink>
                <CatLink cat="jassen">Jassen en mantels</CatLink>
                <CatLink cat="breisels">Breisels</CatLink>
                <CatLink cat="tops">Tops en blouses</CatLink>
                <CatLink cat="broeken">Broeken en pakjes</CatLink>
                <CatLink cat="accessoires">Accessoires</CatLink>
              </div>
              <div>
                <h3>Service</h3>
                <a href="#service">Verzending</a>
                <a href="#service">Retourneren en ruilen</a>
                <a href="#maten">Maattabel</a>
                <a href="#service">Herstelservice</a>
                <a href="#service">Betalen</a>
              </div>
              <div>
                <h3>Lune Atelier</h3>
                <a href="#atelier">Het atelier</a>
                <a href="#collecties">Collecties</a>
                <a href="#lookbook">Lookbook</a>
                <a href="#nieuwsbrief">Nieuwsbrief</a>
              </div>
              <div>
                <h3>Contact</h3>
                <p>
                  Winkel en atelier
                  <br />
                  Het Zuid, Antwerpen
                </p>
                <p>
                  03 000 00 00
                  <br />
                  hallo@luneatelier.example
                </p>
                <p>
                  Di t/m vr 10.30 – 18.00
                  <br />
                  Za 10.00 – 18.00
                </p>
              </div>
            </div>
            <p className="l-foot-mark" aria-hidden="true">
              Lune <em>Atelier</em>
            </p>
            <p className="l-legal">
              <span>© Lune Atelier, Antwerpen</span>
              <span>Demo-ontwerp van HOPI · Lune Atelier is een fictief bedrijf</span>
            </p>
          </div>
        </footer>
      </Shop>
    </DemoShell>
  );
}
