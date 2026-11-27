import { Inter, Unbounded } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { Appointment, BeforeAfter, Mark, Nav, Packages, Services } from "./ui";
import "./style.css";

const display = Unbounded({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--o-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--o-sans", display: "swap" });

export const metadata = demoMeta("automotive");
const I = IMAGES.automotive;

const STEPS = [
  { name: "Intake en meting", time: "20 minuten", text: "We lopen samen om de auto, meten de lakdikte per paneel en spreken af wat haalbaar is. Je hoort de prijs voordat we beginnen." },
  { name: "Voorwas", time: "30 minuten", text: "Sneeuwschuim weekt zand en vuil los. Pas als dat is afgespoeld, komt er een washandschoen aan de lak." },
  { name: "Handwas en decontaminatie", time: "1,5 uur", text: "Twee emmers, daarna vliegroest en teer eraf en een kleibehandeling tot de lak glad als glas aanvoelt." },
  { name: "Lakcorrectie", time: "4 tot 12 uur", text: "Paneel voor paneel onder schaduwvrij licht. Rubbers en kwetsbare randen plakken we eerst af." },
  { name: "Bescherming", time: "2 uur, plus uitharden", text: "Sealant of keramische coating, in dunne banen aangebracht en onder infraroodlampen uitgehard." },
  { name: "Controle en oplevering", time: "30 minuten", text: "Een laatste ronde met de inspectielamp, samen met jou. Je krijgt het meetrapport en een wasadvies mee." },
];

const STUDIO = [
  ["Werkplekken", "3, elk afgesloten"],
  ["Verlichting", "Schaduwvrij, 5.000 K"],
  ["Water", "Gedemineraliseerd, droogt vlekvrij"],
  ["Klimaat", "20 °C, stofarm"],
  ["Uitharding", "Infraroodlampen"],
  ["Wachten", "Lounge met koffie, of een leenfiets"],
];

const WORK = [
  { img: I.dusk, alt: "Grijze coupé bij zonsondergang met glanzende motorkap", car: "Coupé, grijs metallic", pack: "Ceramic" },
  { img: I.harbour, alt: "Zwarte sportwagen op een kade bij avondlicht", car: "Sportwagen, zwart", pack: "Signature" },
  { img: I.mountain, alt: "Zilveren vierdeurs coupé op een bergweg", car: "Vierdeurs coupé, zilver", pack: "Ceramic" },
  { img: I["dark-estate"], alt: "Zwarte stationwagen recht van voren in de schemering", car: "Stationwagen, zwart", pack: "Signature" },
  { img: I.engine, alt: "Schone motorruimte van een rode auto met open motorkap", car: "Motorruimte, gereinigd", pack: "Op aanvraag" },
];

const VOICES = [
  { quote: "Ze belden halverwege om te zeggen dat één kras te diep zat om veilig weg te halen. Die eerlijkheid is de reden dat ik terugkom.", who: "Fleur", car: "Grijze hatchback", pack: "Signature" },
  { quote: "Na de coating spoel ik de auto af en hij is schoon. Dat scheelt me elke zaterdag een uur.", who: "Mehmet", car: "Witte SUV", pack: "Ceramic" },
  { quote: "Een meetrapport per paneel had ik nog nergens gekregen. Je ziet precies wat er is gedaan.", who: "Sophie", car: "Blauwe coupé", pack: "Ceramic" },
];

function Head({ n, label, children, intro }: { n: string; label: string; children: React.ReactNode; intro?: string }) {
  return (
    <header className="o-head">
      <p className="o-eye" data-rv>
        <span>{n}</span>
        {label}
      </p>
      <h2 data-rv>{children}</h2>
      {intro ? (
        <p className="o-intro" data-rv>
          {intro}
        </p>
      ) : null}
      <i className="o-rule" data-rv aria-hidden="true" />
    </header>
  );
}

export default function Obsidian() {
  return (
    <DemoShell slug="automotive" name="Obsidian Detailing" className={`d-obsidian ${display.variable} ${sans.variable}`}>
      <Nav />
      <main id="top">
        {/* 1 · Filmische opening */}
        <section className="o-hero">
          <div className="o-hero-stage">
            <div className="o-hero-media">
              <Pic img={I.silhouette} alt="Zijaanzicht van een zwarte auto in het donker, alleen de daklijn en de wielen vangen licht" eager sizes="(min-width: 900px) 100vw, 120vw" />
            </div>
            <div className="o-hero-head">
              <p className="o-eye o-fade" style={{ ["--i" as string]: 0 }}>
                <span>Breda</span>
                Detailingstudio
              </p>
              <h1>
                <span>Dieper dan</span> <span>zwart.</span>
              </h1>
            </div>
            <div className="o-hero-body">
              <p className="o-lede o-fade" style={{ ["--i" as string]: 5 }}>
                Handwas, lakcorrectie en keramische coating in een gesloten studio. Eén auto per werkplek, en we stoppen pas als het licht er strak overheen loopt.
              </p>
              <div className="o-cta o-fade" style={{ ["--i" as string]: 6 }}>
                <a href="#afspraak" className="o-btn o-btn-fill">
                  Plan een afspraak
                </a>
                <a href="#pakketten" className="o-btn o-btn-line">
                  Bekijk de pakketten
                </a>
              </div>
            </div>
          </div>
          <dl className="o-strip o-fade" style={{ ["--i" as string]: 8 }}>
            <div>
              <dt>Werkplekken</dt>
              <dd>3, elk met eigen lichtstraat</dd>
            </div>
            <div>
              <dt>Per auto</dt>
              <dd>3 uur tot 3 dagen</dd>
            </div>
            <div>
              <dt>Vanaf</dt>
              <dd>€ 59 voor een handwas</dd>
            </div>
            <div>
              <dt>Open</dt>
              <dd>Di t/m za, op afspraak</dd>
            </div>
          </dl>
        </section>

        {/* 2 · Diensten */}
        <section className="o-sec" id="diensten">
          <div className="o-wrap">
            <Head n="01" label="Diensten" intro="Elke behandeling is los te boeken of zit in een pakket. We beginnen altijd met een meting van de lak, zodat je vooraf weet wat haalbaar is.">
              Vijf diensten, <span>één standaard.</span>
            </Head>
            <Services />
          </div>
        </section>

        {/* 3 · Voor en na */}
        <section className="o-sec o-sec-deep" id="voor-na">
          <div className="o-wrap">
            <Head n="02" label="Voor en na" intro="Doffe lak is geen vuil. Het zijn duizenden fijne krasjes die het licht verstrooien. Lakcorrectie haalt ze weg. Sleep de lijn en zie wat dat doet.">
              Schuif het <span>licht aan.</span>
            </Head>
            <BeforeAfter />
            <ul className="o-flaws">
              <li data-rv style={{ ["--i" as string]: 0 }}>
                <b>Wasstraatkrassen</b>
                <span>Fijne cirkels die je vooral in de zon ziet. Ze ontstaan door borstels en vuile sponzen.</span>
              </li>
              <li data-rv style={{ ["--i" as string]: 1 }}>
                <b>Hologrammen</b>
                <span>Wazige banen in donkere lak, meestal achtergelaten door haastig polijstwerk.</span>
              </li>
              <li data-rv style={{ ["--i" as string]: 2 }}>
                <b>Oxidatie</b>
                <span>Verweerde, grijs uitgeslagen lak op auto’s die jaren buiten hebben gestaan.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 4 · Pakketten en prijzen */}
        <section className="o-sec" id="pakketten">
          <div className="o-wrap">
            <Head n="03" label="Pakketten en prijzen" intro="Kies het formaat van je auto en je ziet wat het kost. Vaste prijzen, inclusief btw, zonder toeslagen achteraf.">
              Drie pakketten, <span>vaste prijzen.</span>
            </Head>
          </div>
          <Packages />
          <div className="o-wrap">
            <p className="o-note" data-rv>
              Prijzen zijn inclusief 21% btw. Sterk vervuilde of verweerde lak beoordelen we bij de intake. Je hoort de prijs altijd voordat we beginnen.
            </p>
          </div>
        </section>

        {/* 5 · Het proces */}
        <section className="o-sec o-sec-deep" id="proces">
          <div className="o-wrap">
            <Head n="04" label="Het proces" intro="Zo ziet een dag in de studio eruit bij het pakket Signature. Bij Ceramic komt er een tweede polijststap en een nacht uitharden bij.">
              Zes stappen, <span>geen haast.</span>
            </Head>
            <div className="o-proc">
              <figure className="o-proc-photo" data-rv="img">
                <Pic img={I.headlight} alt="Koplamp van een lichte auto die blauw oplicht in een donkere garage" sizes="(min-width: 960px) 34vw, 100vw" />
                <figcaption>Inspectie onder studiolicht</figcaption>
              </figure>
              <ol className="o-steps">
                {STEPS.map((s, i) => (
                  <li key={s.name} className="o-step" data-rv style={{ ["--i" as string]: i }}>
                    <span className="o-step-n" data-n={String(i + 1).padStart(2, "0")} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="o-step-body">
                      <h3>{s.name}</h3>
                      <p>{s.text}</p>
                      <small>{s.time}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 6 · De studio */}
        <section className="o-studio" id="studio">
          <div className="o-studio-media" data-px>
            <Pic img={I.garage} alt="De donkere studio met een witte sportwagen vooraan en auto’s op bruggen erachter" sizes="100vw" />
          </div>
          <div className="o-wrap">
            <Head n="05" label="De studio">
              Gebouwd <span>rond licht.</span>
            </Head>
            <div className="o-studio-grid">
              <div className="o-studio-copy">
                <p className="o-big" data-rv>
                  Onze studio in Breda is een gesloten ruimte zonder daglicht. Dat is precies de bedoeling: alleen onder gecontroleerd licht zie je elke kras, en zie je ook wanneer hij weg is.
                </p>
                <p data-rv>
                  Obsidian is opgezet door Jesse en Imane, twee detailers die liever één auto goed doen dan vier half. Wie je auto aanneemt, werkt eraan en levert hem ook weer op. Je krijgt dus nooit een ander aan de lijn.
                </p>
                <a href="#afspraak" className="o-more" data-rv>
                  Kom langs voor een intake
                  <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} />
                </a>
              </div>
              <div className="o-sheet" data-rv>
                <p className="o-sheet-title">Technische gegevens</p>
                <dl className="o-spec o-spec-rows">
                  {STUDIO.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <div className="o-work">
            <p className="o-work-title o-wrap" data-rv>
              Recent in de studio
            </p>
            <ul className="o-work-row" data-rv>
              {WORK.map((w, i) => (
                <li key={w.car}>
                  <div className="o-work-img">
                    <Pic img={w.img} alt={w.alt} sizes="(min-width: 900px) 22vw, 64vw" />
                  </div>
                  <p>
                    <small>{String(i + 1).padStart(2, "0")}</small>
                    <b>{w.car}</b>
                    <span>{w.pack}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7 · Klanten aan het woord */}
        <section className="o-sec o-sec-deep" id="klanten">
          <div className="o-wrap">
            <Head n="06" label="Klanten aan het woord">
              Wat klanten <span>terugzien.</span>
            </Head>
            <div className="o-voices">
              <blockquote className="o-voice-main" data-rv>
                <div className="o-voice-photo">
                  <Pic img={I.taillights} alt="Rode achterlichten van een sportwagen in een straat bij avond" sizes="(min-width: 960px) 44vw, 100vw" />
                </div>
                <p>Ik dacht dat mijn zwarte lak gewoon oud was. Na de lakcorrectie zag ik er voor het eerst in jaren de wolken in.</p>
                <footer>
                  <b>Daan</b>
                  <span>Zwarte stationwagen · Signature</span>
                </footer>
              </blockquote>
              <div className="o-voice-list">
                {VOICES.map((v, i) => (
                  <blockquote key={v.who} data-rv style={{ ["--i" as string]: i }}>
                    <p>{v.quote}</p>
                    <footer>
                      <b>{v.who}</b>
                      <span>
                        {v.car} · {v.pack}
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8 · Afspraak inplannen */}
        <section className="o-sec o-book" id="afspraak">
          <div className="o-wrap">
            <Head n="07" label="Afspraak inplannen" intro="Kies een pakket en een voorkeursdatum. We bellen binnen één werkdag om de afspraak te bevestigen en de intake te plannen.">
              Plan je <span>auto in.</span>
            </Head>
            <div className="o-book-grid">
              <div className="o-book-card" data-rv>
                <Appointment />
              </div>
              <aside className="o-book-side">
                <div className="o-sheet" data-rv>
                  <p className="o-sheet-title">Openingstijden</p>
                  <dl className="o-spec o-spec-rows">
                    <div>
                      <dt>Dinsdag t/m vrijdag</dt>
                      <dd>08.00 – 18.00</dd>
                    </div>
                    <div>
                      <dt>Zaterdag</dt>
                      <dd>09.00 – 16.00</dd>
                    </div>
                    <div>
                      <dt>Zondag en maandag</dt>
                      <dd>Gesloten</dd>
                    </div>
                  </dl>
                </div>
                <address data-rv>
                  <b>Obsidian Detailing</b>
                  Breda-Noord
                  <a href="tel:0760000000">076 000 00 00</a>
                  <a href="mailto:studio@obsidian.example">studio@obsidian.example</a>
                </address>
                <p className="o-book-tip" data-rv>
                  Liever eerst laten kijken? Een intake met lakmeting duurt twintig minuten en kost niets.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="o-foot">
        <div className="o-wrap">
          <p className="o-foot-mark" aria-hidden="true">
            Obsidian
          </p>
          <div className="o-foot-grid">
            <div className="o-foot-brand">
              <p className="o-logo">
                <Mark />
                <span>
                  Obsidian<small>Detailing</small>
                </span>
              </p>
              <p>Detailingstudio in Breda voor handwas, lakcorrectie en keramische coating.</p>
            </div>
            <nav aria-label="Behandelingen">
              <h3>Behandelingen</h3>
              <a href="#diensten">Diensten</a>
              <a href="#voor-na">Voor en na</a>
              <a href="#pakketten">Pakketten en prijzen</a>
              <a href="#proces">Het proces</a>
            </nav>
            <nav aria-label="Studio">
              <h3>Studio</h3>
              <a href="#studio">De studio</a>
              <a href="#klanten">Klanten aan het woord</a>
              <a href="#afspraak">Afspraak inplannen</a>
            </nav>
            <div>
              <h3>Contact</h3>
              <p>Breda-Noord</p>
              <a href="tel:0760000000">076 000 00 00</a>
              <a href="mailto:studio@obsidian.example">studio@obsidian.example</a>
            </div>
            <div>
              <h3>Open</h3>
              <p>Di t/m vr 08.00 – 18.00</p>
              <p>Za 09.00 – 16.00</p>
              <p>Alleen op afspraak</p>
            </div>
          </div>
          <p className="o-legal">
            <span>© Obsidian Detailing, Breda</span>
            <span>Demo-ontwerp van HOPI · Obsidian Detailing is een fictief bedrijf</span>
          </p>
        </div>
      </footer>
    </DemoShell>
  );
}
