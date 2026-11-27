import { Manrope, Playfair_Display } from "next/font/google";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { Areas, Estate, Jump, Listings, Logo, Nav, OpenHome, Search, Valuation } from "./ui";
import "./style.css";

const display = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--m-display", display: "swap" });
const text = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--m-text", display: "swap" });

export const metadata = demoMeta("real-estate");
const I = IMAGES["real-estate"];

const SELL = [
  { name: "Waardebepaling aan huis", text: "Een van onze partners loopt elk vertrek door en onderbouwt de waarde met recente verkopen in uw eigen straat." },
  { name: "Presentatie als in een tijdschrift", text: "Architectuurfotografie bij het juiste licht, plattegronden op schaal en een tekst die door een redacteur is geschreven." },
  { name: "Eerst in stilte, dan openbaar", text: "Uw woning gaat eerst naar onze eigen zoekers. Een derde van ons aanbod wisselt zo van eigenaar zonder ooit online te staan." },
  { name: "Onderhandelen en overdracht", text: "Wij voeren het gesprek, toetsen de koper op financiering en staan naast u bij de notaris." },
];
const BUY = [
  { name: "Zoekprofiel", text: "Een gesprek van een uur over hoe u wilt wonen. Niet alleen het aantal kamers, ook het licht, de straat en de school." },
  { name: "Voorselectie", text: "U ziet woningen voordat ze online staan en wij bezoeken ze eerst zelf. U bezichtigt alleen wat werkelijk past." },
  { name: "Bouwkundig en juridisch", text: "Fundering, erfpacht, vereniging van eigenaars: wij lezen alles en zeggen eerlijk wat het u gaat kosten." },
  { name: "Bieden en afronden", text: "Een bod met onderbouwing, heldere voorwaarden en begeleiding tot en met de sleuteloverdracht." },
];
const EXTRA = [
  { name: "Verhuur en beheer", text: "Voor eigenaren die een periode in het buitenland wonen. Wij selecteren de huurder en regelen het contract.", price: "Eén maand huur" },
  { name: "Taxatie", text: "Onderbouwd taxatierapport voor financiering, verdeling of nalatenschap.", price: "Vanaf € 895" },
  { name: "Stil aanbod", text: "Verkoop zonder bord in de tuin en zonder vermelding online.", price: "Zelfde courtage" },
  { name: "Verkoopklaar maken", text: "Met onze vaste stylist, schilder en hovenier. U krijgt vooraf één offerte.", price: "Offerte vooraf" },
];
const TEAM = [
  { img: I["agent-3"], alt: "Portret van makelaar Maarten Verhoeven in een grijze trui", name: "Maarten Verhoeven", role: "Partner", area: "Grachtengordel en Jordaan", text: "Begon in 1998 met één grachtenpand in de verkoop. Leest een splitsingsakte zoals een ander de krant.", mail: "maarten@meridiaan.example" },
  { img: I["agent-4"], alt: "Portret van makelaar Liesbeth van Dalen, buiten bij avondlicht", name: "Liesbeth van Dalen", role: "Partner", area: "Kennemerland en Het Gooi", text: "Opgegroeid in Bloemendaal en kent de lanen daar bij naam. Verkoopt villa's het liefst voordat de buren het weten.", mail: "liesbeth@meridiaan.example", pos: "50% 30%" },
  { img: I["agent-2"], alt: "Portret van makelaar Noor Hendriks in een gestreepte blouse", name: "Noor Hendriks", role: "Makelaar", area: "Oud-Zuid, Zuidas en verhuur", text: "Jurist van huis uit. Begeleidt expats en terugkeerders, in het Nederlands en het Engels.", mail: "noor@meridiaan.example" },
  { img: I["agent-1"], alt: "Portret van aankoopmakelaar Sem de Graaf in een lichtblauw overhemd", name: "Sem de Graaf", role: "Aankoopmakelaar", area: "IJburg, Amstelveen en nieuwbouw", text: "Bouwkundige met een voorliefde voor installaties. Ziet in tien minuten wat een keuring pas na een week meldt.", mail: "sem@meridiaan.example" },
];

export default function Meridiaan() {
  return (
    <DemoShell slug="real-estate" name="Meridiaan Makelaars" className={`d-meridiaan ${display.variable} ${text.variable}`}>
      <Estate>
        <Nav />
        <main id="top">
          {/* 1 · Opening met zoekbalk */}
          <section className="m-hero m-dark">
            <figure className="m-hero-media">
              <Pic img={I.hero} alt="Moderne villa met verlichte glazen gevel onder een oude boom bij schemering" eager sizes="(min-width: 1000px) 60vw, 100vw" />
              <figcaption>
                <OpenHome id="aerdenhout" className="m-cover">
                  <small>Op de omslag</small>
                  <span>
                    <i>Boekenroodeweg, </i>Aerdenhout
                  </span>
                  <b>€ 4.150.000 k.k.</b>
                  <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </OpenHome>
              </figcaption>
            </figure>
            <div className="m-hero-in">
              <p className="m-eyebrow m-rise" style={{ ["--i" as string]: 0 }}>
                Makelaars in het hogere segment · sinds 1998
              </p>
              <h1>
                <span className="m-row">
                  <span className="m-line" style={{ ["--i" as string]: 0 }}>
                    <span>Bijzondere</span>
                  </span>{" "}
                  <span className="m-line" style={{ ["--i" as string]: 1 }}>
                    <span>huizen,</span>
                  </span>
                </span>
                <span className="m-row">
                  <span className="m-line" style={{ ["--i" as string]: 2 }}>
                    <span>
                      <em>zorgvuldig</em>
                    </span>
                  </span>{" "}
                  <span className="m-line" style={{ ["--i" as string]: 3 }}>
                    <span>bemiddeld.</span>
                  </span>
                </span>
              </h1>
              <p className="m-lede m-rise" style={{ ["--i" as string]: 4 }}>
                Van bel-etage aan de gracht tot villa aan de duinrand. Meridiaan neemt per jaar hooguit veertig woningen aan, en kent ze daardoor tot in de kelder.
              </p>
            </div>
            <div className="m-hero-search m-rise" style={{ ["--i" as string]: 6 }}>
              <Search />
            </div>
            <p className="m-hero-foot m-rise" style={{ ["--i" as string]: 8 }}>
              <span>52°22′ NB · 4°53′ OL</span>
              <a href="#aanbod">
                Naar het aanbod <ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </p>
          </section>

          {/* Het kantoor in drie getallen */}
          <section className="m-intro" aria-labelledby="m-intro-h">
            <div className="m-wrap m-intro-grid">
              <p className="m-eyebrow" data-rv>
                Het kantoor
              </p>
              <h2 id="m-intro-h" className="m-statement" data-rv>
                Een huis verkopen vraagt aandacht die je niet over honderd adressen kunt verdelen. <em>Daarom doen wij er veertig per jaar.</em>
              </h2>
              <ul className="m-figures">
                <li data-rv style={{ ["--i" as string]: 0 }}>
                  <b>40</b>
                  <span>woningen per jaar, en niet meer</span>
                </li>
                <li data-rv style={{ ["--i" as string]: 1 }}>
                  <b>1</b>
                  <span>vaste makelaar, van eerste gesprek tot notaris</span>
                </li>
                <li data-rv style={{ ["--i" as string]: 2 }}>
                  <b>27</b>
                  <span>jaar aan de gracht, in hetzelfde pand</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 2 · Uitgelicht aanbod met filters */}
          <section className="m-listings" id="aanbod">
            <div className="m-wrap">
              <header className="m-head">
                <p className="m-eyebrow" data-rv>
                  I · Het aanbod
                </p>
                <h2 data-rv>
                  Twaalf adressen, <em>elk met een eigen verhaal.</em>
                </h2>
                <p className="m-head-note" data-rv>
                  Kies koop of huur, verfijn op type, prijs en slaapkamers, en bewaar met het hartje wat u aanspreekt. Elke woning opent als een eigen pagina.
                </p>
              </header>
              <Listings />
            </div>
          </section>

          {/* 3 · Woningdetail: de woning van de maand als spread */}
          <section className="m-feature m-dark" id="uitgelicht">
            <div className="m-feature-media" data-px>
              <Pic img={I["villa-pool"]} alt="Witte villa met houten luifel en een lang zwembad langs het terras" sizes="100vw" />
              <p className="m-feature-mark" aria-hidden="true">
                N° 09
              </p>
            </div>
            <div className="m-wrap m-feature-grid">
              <div className="m-feature-head">
                <p className="m-eyebrow" data-rv>
                  II · Uitgelicht deze maand
                </p>
                <h2 data-rv>
                  Baambrugse Zuwe, <em>Vinkeveen</em>
                </h2>
                <p className="m-big" data-rv>
                  Een witte villa aan de Vinkeveense Plassen, waar het zwembad optisch overloopt in het water erachter.
                </p>
              </div>
              <div className="m-sheetcard" data-rv>
                <p className="m-sheetcard-top">
                  <span>Villa aan het water</span>
                  <span>Te koop</span>
                </p>
                <p className="m-sheetcard-price">
                  € 2.950.000 <small>k.k.</small>
                </p>
                <dl className="m-spec">
                  <div>
                    <dt>Woonoppervlakte</dt>
                    <dd>318 m²</dd>
                  </div>
                  <div>
                    <dt>Perceel</dt>
                    <dd>1.120 m²</dd>
                  </div>
                  <div>
                    <dt>Kamers</dt>
                    <dd>7, waarvan 4 slaapkamers</dd>
                  </div>
                  <div>
                    <dt>Bouwjaar</dt>
                    <dd>2015</dd>
                  </div>
                  <div>
                    <dt>Energielabel</dt>
                    <dd>
                      <i className="m-label">A+</i>
                    </dd>
                  </div>
                  <div>
                    <dt>Aan het water</dt>
                    <dd>Steiger van 18 meter en botenhuis</dd>
                  </div>
                </dl>
                <OpenHome id="vinkeveen" className="m-btn m-btn-fill">
                  Open deze woning
                </OpenHome>
              </div>
              <div className="m-feature-copy">
                <p data-rv>
                  Twintig minuten van de Zuidas en toch aan open water. De woonkamer, het terras en het zwembad liggen op één lijn naar de plas. De verdieping steekt als een houten luifel over het terras, zodat u ook bij regen buiten zit.
                </p>
                <blockquote data-rv>
                  <p>Wie hier ’s ochtends de schuifpui opent, begrijpt waarom de eigenaren er twintig jaar over deden om weg te willen.</p>
                  <footer>Liesbeth van Dalen, makelaar van deze woning</footer>
                </blockquote>
                <OpenHome id="vinkeveen" className="m-textlink">
                  Bekijk alle foto’s en plan een bezichtiging
                  <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
                </OpenHome>
              </div>
              <figure className="m-feature-a" data-rv="img">
                <Pic img={I["living-modern"]} alt="Open leefruimte met witte bank, houten wand en glazen pui naar de tuin" sizes="(min-width: 1000px) 34vw, 100vw" />
                <figcaption>Woonkamer, 68 m²</figcaption>
              </figure>
              <figure className="m-feature-b" data-rv="img">
                <Pic img={I.bedroom} alt="Slaapkamer met openslaande deuren en een bed in grijstinten" sizes="(min-width: 1000px) 24vw, 60vw" />
                <figcaption>Hoofdslaapkamer</figcaption>
              </figure>
            </div>
          </section>

          {/* 4 · Diensten voor verkopers en kopers */}
          <section className="m-services" id="diensten">
            <div className="m-wrap">
              <header className="m-head">
                <p className="m-eyebrow" data-rv>
                  III · Diensten
                </p>
                <h2 data-rv>
                  Verkopen of kopen, <em>met één makelaar van begin tot eind.</em>
                </h2>
                <p className="m-head-note" data-rv>
                  Geen binnendienst en geen doorverbinden. De makelaar die u bij de eerste afspraak spreekt, zit ook naast u bij de notaris.
                </p>
              </header>
              <div className="m-chapters">
                <article className="m-chapter">
                  <p className="m-chapter-for" data-rv>
                    Voor verkopers
                  </p>
                  <h3 data-rv>Verkopen</h3>
                  <ol className="m-steps">
                    {SELL.map((s, i) => (
                      <li key={s.name} data-rv style={{ ["--i" as string]: i }}>
                        <span aria-hidden="true">{i + 1}</span>
                        <div>
                          <h4>{s.name}</h4>
                          <p>{s.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="m-fee" data-rv>
                    <span>Courtage</span>
                    <b>1,25%</b>
                    <small>van de koopsom, inclusief btw, fotografie en plattegronden</small>
                  </p>
                  <a href="#waardebepaling" className="m-textlink" data-rv>
                    Vraag een waardebepaling aan
                    <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </article>
                <article className="m-chapter">
                  <p className="m-chapter-for" data-rv>
                    Voor kopers
                  </p>
                  <h3 data-rv>Aankopen</h3>
                  <ol className="m-steps">
                    {BUY.map((s, i) => (
                      <li key={s.name} data-rv style={{ ["--i" as string]: i }}>
                        <span aria-hidden="true">{i + 1}</span>
                        <div>
                          <h4>{s.name}</h4>
                          <p>{s.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="m-fee" data-rv>
                    <span>Aankoopbegeleiding</span>
                    <b>0,9%</b>
                    <small>van de koopsom, inclusief btw, met een minimum van € 6.500</small>
                  </p>
                  <Jump className="m-textlink">
                    Bekijk het aanbod
                    <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
                  </Jump>
                </article>
              </div>
              <div className="m-extra">
                <figure className="m-extra-photo" data-rv="img" data-px>
                  <Pic img={I.chair} alt="Gele fauteuil naast een staande lamp op een visgraatvloer" sizes="(min-width: 1000px) 30vw, 100vw" />
                </figure>
                <div className="m-extra-list">
                  <h3 data-rv>Ook bij Meridiaan</h3>
                  <ul>
                    {EXTRA.map((e, i) => (
                      <li key={e.name} data-rv style={{ ["--i" as string]: i }}>
                        <h4>{e.name}</h4>
                        <p>{e.text}</p>
                        <b>{e.price}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 5 · Het team */}
          <section className="m-team" id="team">
            <div className="m-wrap">
              <header className="m-head">
                <p className="m-eyebrow" data-rv>
                  IV · Het team
                </p>
                <h2 data-rv>
                  Vier makelaars <em>die u bij naam kent.</em>
                </h2>
                <p className="m-head-note" data-rv>
                  Elk met een eigen werkgebied, zodat u iemand spreekt die de straat kent en niet alleen de cijfers.
                </p>
              </header>
              <ul className="m-people">
                {TEAM.map((t, i) => (
                  <li key={t.name} data-rv style={{ ["--i" as string]: i }}>
                    <figure>
                      <Pic img={t.img} alt={t.alt} sizes="(min-width: 1000px) 22vw, (min-width: 620px) 44vw, 40vw" style={t.pos ? { objectPosition: t.pos } : undefined} />
                    </figure>
                    <div>
                      <p className="m-person-role">{t.role}</p>
                      <h3>{t.name}</h3>
                      <p className="m-person-text">{t.text}</p>
                      <dl>
                        <div>
                          <dt>Werkgebied</dt>
                          <dd>{t.area}</dd>
                        </div>
                        <div>
                          <dt>Direct</dt>
                          <dd>
                            <a href={`mailto:${t.mail}`}>{t.mail}</a>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 6 · De buurten */}
          <section className="m-hoods m-dark" id="buurten">
            <div className="m-wrap">
              <header className="m-head">
                <p className="m-eyebrow" data-rv>
                  V · De buurten
                </p>
                <h2 data-rv>
                  Zeven buurten <em>waar wij de weg weten.</em>
                </h2>
                <p className="m-head-note" data-rv>
                  Van de binnenstad tot de duinrand. Kies een buurt en lees waar u op moet letten voordat u een bod doet.
                </p>
              </header>
              <Areas />
            </div>
          </section>

          {/* 7 · Waardebepaling aanvragen */}
          <section className="m-value" id="waardebepaling">
            <div className="m-wrap m-value-grid">
              <div className="m-value-copy">
                <p className="m-eyebrow" data-rv>
                  VI · Waardebepaling
                </p>
                <h2 data-rv>
                  Wat is uw huis <em>vandaag waard?</em>
                </h2>
                <p className="m-value-lede" data-rv>
                  Vraag een waardebepaling aan. Een van onze partners komt bij u langs en u ontvangt binnen een week een onderbouwd rapport. Kosteloos, en u zit nergens aan vast.
                </p>
                <ol className="m-value-steps">
                  <li data-rv style={{ ["--i" as string]: 0 }}>
                    <span>Binnen één werkdag</span>
                    Een partner belt u voor een afspraak.
                  </li>
                  <li data-rv style={{ ["--i" as string]: 1 }}>
                    <span>Aan huis, een uur</span>
                    We lopen elk vertrek door en bespreken uw plannen.
                  </li>
                  <li data-rv style={{ ["--i" as string]: 2 }}>
                    <span>Binnen een week</span>
                    U ontvangt de waarde, de onderbouwing en ons verkoopadvies.
                  </li>
                </ol>
                <dl className="m-office" data-rv>
                  <div>
                    <dt>Kantoor</dt>
                    <dd>
                      Grachtengordel, Amsterdam
                      <br />
                      <a href="tel:0200000000">020 000 00 00</a>
                      <br />
                      <a href="mailto:kantoor@meridiaan.example">kantoor@meridiaan.example</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Open</dt>
                    <dd>
                      Maandag t/m vrijdag 9.00 tot 17.30 uur
                      <br />
                      Zaterdag 10.00 tot 14.00 uur, op afspraak
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="m-value-card m-dark" data-rv>
                <p className="m-value-card-top">
                  <span>Aanvraag waardebepaling</span>
                  <span>Kosteloos</span>
                </p>
                <Valuation />
              </div>
            </div>
          </section>
        </main>

        <footer className="m-foot m-dark">
          <div className="m-wrap">
            <div className="m-foot-top">
              <Logo />
              <p>
                Bijzondere huizen, <em>zorgvuldig bemiddeld.</em>
              </p>
            </div>
            <div className="m-ruler" aria-hidden="true" />
            <div className="m-foot-grid">
              <div>
                <h3>Aanbod</h3>
                <Jump>Koopwoningen</Jump>
                <Jump mode="huur">Huurwoningen</Jump>
                <a href="#uitgelicht">Uitgelicht deze maand</a>
                <a href="#buurten">Zoeken per buurt</a>
              </div>
              <div>
                <h3>Kantoor</h3>
                <a href="#diensten">Verkopen</a>
                <a href="#diensten">Aankopen</a>
                <a href="#team">Het team</a>
                <a href="#waardebepaling">Waardebepaling</a>
              </div>
              <div>
                <h3>Contact</h3>
                <p>Grachtengordel, Amsterdam</p>
                <a href="tel:0200000000">020 000 00 00</a>
                <a href="mailto:kantoor@meridiaan.example">kantoor@meridiaan.example</a>
              </div>
              <div>
                <h3>Openingstijden</h3>
                <p>Ma t/m vr · 9.00 tot 17.30 uur</p>
                <p>Zaterdag · 10.00 tot 14.00 uur, op afspraak</p>
                <p>Bezichtigingen ook ’s avonds</p>
              </div>
            </div>
            <p className="m-legal">
              <span>© Meridiaan Makelaars, Amsterdam</span>
              <span>Demo-ontwerp van HOPI · Meridiaan Makelaars is een fictief bedrijf</span>
            </p>
          </div>
        </footer>
      </Estate>
    </DemoShell>
  );
}
