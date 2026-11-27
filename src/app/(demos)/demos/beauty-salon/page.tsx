import { Figtree, Fraunces } from "next/font/google";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { BeforeAfter, Booking, Nav, Treatments } from "./ui";
import "./style.css";

const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz", "SOFT"], variable: "--s-serif", display: "swap" });
const sans = Figtree({ subsets: ["latin"], variable: "--s-sans", display: "swap" });

export const metadata = demoMeta("beauty-salon");
const I = IMAGES["beauty-salon"];

const PRINCIPLES = [
  { title: "Eerst kijken, dan behandelen", text: "Geen vaste protocollen. We lezen je huid bij daglicht en stellen de behandeling ter plekke samen." },
  { title: "Weinig producten, goed gekozen", text: "We werken met een korte lijn zonder parfum. Voor thuis adviseren we hooguit drie stappen." },
  { title: "Eén gast tegelijk", text: "Geen volle wachtkamer, geen deur die open en dicht gaat. De salon is dat uur helemaal van jou." },
];

const STAGES = [
  { when: "Na één behandeling", text: "Een schone, soepele huid en een kleur die rustiger oogt. Meestal ook: een middag nergens zin in." },
  { when: "Na zes weken", text: "Je huid heeft zich één keer vernieuwd. Onzuiverheden trekken sneller weg en je pakt minder vaak make-up." },
  { when: "Na een half jaar", text: "Een routine die bij je past en een huid die minder meebeweegt met seizoen, stress en slaap." },
];

const ROOM_NOTES = [
  "Behandelkamer op het noorden, voor eerlijk daglicht",
  "Linnen en handdoeken van biologisch katoen",
  "Vloerverwarming, ook onder de behandelstoel",
  "Je telefoon mag in het kluisje bij de deur",
];

const QUOTES = [
  { quote: "Voor het eerst kreeg ik geen lijst met producten mee, maar het advies om er twee weg te laten. Mijn huid is er rustiger van geworden.", who: "Samira", note: "kwam voor de kennismaking" },
  { quote: "Het ritueel voor twee was ons cadeau aan elkaar. Bad, massage, thee in de tuinkamer. We hebben de hele middag geen klok gezien.", who: "Annelies", note: "boekte het ritueel voor twee" },
  { quote: "Mijn wenkbrauwen zijn eindelijk van mij. Niet te strak, niet te donker, precies de vorm van mijn gezicht.", who: "Lotte", note: "brow shaping en lash lift" },
];

const HOURS = [
  ["Dinsdag en woensdag", "09.00 – 18.00"],
  ["Donderdag", "10.30 – 21.00"],
  ["Vrijdag", "09.00 – 18.00"],
  ["Zaterdag", "09.00 – 16.30"],
  ["Zondag en maandag", "Gesloten"],
];

export default function AtelierSage() {
  return (
    <DemoShell slug="beauty-salon" name="Atelier Sage" className={`d-sage ${serif.variable} ${sans.variable}`}>
      <Nav />
      <main id="top">
        {/* 1 · Rustige opening */}
        <section className="s-hero">
          <div className="s-wrap s-hero-grid">
            <div className="s-hero-copy">
              <p className="s-label s-rise" style={{ ["--i" as string]: 0 }}>
                Huidsalon · Utrecht
              </p>
              <h1>
                <span className="s-rise" style={{ ["--i" as string]: 1 }}>
                  Rust begint
                </span>
                <span className="s-rise" style={{ ["--i" as string]: 2 }}>
                  <em>bij je huid.</em>
                </span>
              </h1>
              <p className="s-lede s-rise" style={{ ["--i" as string]: 4 }}>
                Een kleine huidsalon in Wittevrouwen. Eén behandelkamer, één gast tegelijk en een behandeling die we afstemmen op hoe je huid er vandaag bij ligt.
              </p>
              <div className="s-cta s-rise" style={{ ["--i" as string]: 5 }}>
                <a href="#boeken" className="s-pill">
                  Boek een afspraak
                </a>
                <a href="#behandelingen" className="s-link">
                  Bekijk het behandelmenu
                </a>
              </div>
            </div>
            <div className="s-hero-art">
              <div className="s-ring s-hero-main">
                <figure className="s-arch">
                  <Pic img={I.portrait} alt="Portret van een vrouw met krullend haar en een egale, stralende huid tegen een zachtroze achtergrond" eager sizes="(min-width: 960px) 30vw, 70vw" />
                </figure>
              </div>
              <figure className="s-arch s-hero-small" data-px>
                <Pic img={I.serum} alt="Een druppel serum valt uit een pipet op de rug van een hand" sizes="(min-width: 960px) 13vw, 32vw" />
              </figure>
              <p className="s-hero-cap">
                Signatuurbehandeling
                <span>75 minuten · € 98</span>
              </p>
            </div>
          </div>
          <div className="s-wrap">
            <dl className="s-hero-facts s-rise" style={{ ["--i" as string]: 7 }}>
              <div>
                <dt>Open</dt>
                <dd>Dinsdag t/m zaterdag, donderdag ook ’s avonds</dd>
              </div>
              <div>
                <dt>Behandelingen</dt>
                <dd>Vanaf € 29, alle prijzen staan op deze pagina</dd>
              </div>
              <div>
                <dt>Waar</dt>
                <dd>Wittevrouwen, aan de rand van de binnenstad</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* 2 · Filosofie */}
        <section className="s-phil" id="filosofie">
          <div className="s-wrap s-phil-grid">
            <div className="s-phil-art">
              <div className="s-ring" data-px>
                <figure className="s-arch" data-rv="arch">
                  <Pic img={I.linen} alt="Een opgerolde handdoek, een schaaltje badzout, een borstel en een stuk zeep op licht steen" sizes="(min-width: 960px) 28vw, 64vw" />
                </figure>
              </div>
            </div>
            <div className="s-phil-copy">
              <p className="s-label" data-rv>
                Filosofie
              </p>
              <h2 data-rv>
                Je huid heeft geen tien stappen nodig. <em>Wel aandacht.</em>
              </h2>
              <p className="s-big" data-rv>
                Wij geloven in minder. Minder producten, minder beloftes, minder haast. Elke afspraak begint met kijken en vragen: hoe slaap je, wat gebruik je thuis, wat stoort je in de spiegel? Pas daarna kiezen we wat we doen.
              </p>
              <ol className="s-principles">
                {PRINCIPLES.map((p, i) => (
                  <li key={p.title} data-rv style={{ ["--i" as string]: i }}>
                    <span aria-hidden="true">{["I", "II", "III"][i]}</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 3 · Behandelingen met prijzen */}
        <section className="s-menu-sec" id="behandelingen">
          <div className="s-wrap">
            <header className="s-head">
              <div>
                <p className="s-label" data-rv>
                  Behandelingen
                </p>
                <h2 data-rv>
                  Het menu, <em>met de prijs erbij.</em>
                </h2>
              </div>
              <p data-rv>Elke behandeling is inclusief een korte huidanalyse vooraf en een kop kruidenthee na afloop. De genoemde tijden zijn behandeltijd, je afspraak duurt een kwartier langer.</p>
            </header>
            <Treatments />
          </div>
        </section>

        {/* 4 · Resultaten */}
        <section className="s-results" id="resultaten">
          <div className="s-wrap s-results-grid">
            <div className="s-results-head">
              <p className="s-label" data-rv>
                Resultaten
              </p>
              <h2 data-rv>
                Wat tijd en aandacht <em>met een huid doen.</em>
              </h2>
              <p data-rv>Een huid verandert niet in één middag. Wel in een paar maanden, als je haar met rust laat en op het juiste moment helpt. Dit is wat gasten meestal merken.</p>
            </div>
            <div className="s-results-ba" data-rv>
              <BeforeAfter />
            </div>
            <ol className="s-stages">
              {STAGES.map((s, i) => (
                <li key={s.when} data-rv style={{ ["--i" as string]: i }}>
                  <h3>{s.when}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5 · De ruimte */}
        <section className="s-space" id="ruimte">
          <div className="s-wrap">
            <header className="s-head">
              <div>
                <p className="s-label" data-rv>
                  De ruimte
                </p>
                <h2 data-rv>
                  Een benedenhuis, <em>ingericht op stilte.</em>
                </h2>
              </div>
              <p data-rv>Kalksteen, linnen en eikenhout. Geen muziek die je moet wegdenken en geen balie waar je staat te wachten. Je hangt je jas op, krijgt thee en de rest van het uur hoeft er niets.</p>
            </header>
            <div className="s-rooms">
              <figure className="s-room s-room-bath">
                <div className="s-frame" data-rv="arch" data-px>
                  <Pic img={I.bath} alt="Vrijstaand bad van natuursteen naast een palm, met een ruw gestucte wand erachter" sizes="(min-width: 960px) 62vw, 92vw" />
                </div>
                <figcaption data-rv>
                  <b>Het badhuis</b>
                  Vrijstaand bad van natuursteen, voor de rituelen
                </figcaption>
              </figure>
              <figure className="s-room s-room-sauna">
                <div className="s-arch" data-rv="arch">
                  <Pic img={I.sauna} alt="Houten sauna met banken langs drie wanden en zacht licht onder de zittingen" sizes="(min-width: 960px) 24vw, 44vw" />
                </div>
                <figcaption data-rv>
                  <b>De warmtekamer</b>
                  Sauna op 60 graden, voor of na je massage
                </figcaption>
              </figure>
              <figure className="s-room s-room-lounge">
                <div className="s-arch s-z-lounge" data-rv="arch">
                  <Pic img={I.lounge} alt="Oudroze fauteuil naast een grote groene plant in de tuinkamer" sizes="(min-width: 960px) 70vw, 140vw" />
                </div>
                <figcaption data-rv>
                  <b>De tuinkamer</b>
                  Waar je begint en eindigt, met thee
                </figcaption>
              </figure>
              <div className="s-room-notes">
                <h3 data-rv>
                  Wat je niet ziet, <em>maar wel merkt.</em>
                </h3>
                <ul>
                  {ROOM_NOTES.map((n, i) => (
                    <li key={n} data-rv style={{ ["--i" as string]: i }}>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · Over de oprichter */}
        <section className="s-about" id="over">
          <div className="s-wrap s-about-grid">
            <div className="s-about-art">
              <div className="s-ring">
                <figure className="s-arch" data-rv="arch" data-px>
                  <Pic img={I["face-massage"]} alt="De handen van de huidtherapeut masseren het voorhoofd van een gast" sizes="(min-width: 960px) 32vw, 78vw" />
                </figure>
              </div>
              <p className="s-about-cap" data-rv>
                Noor aan het werk in de behandelkamer
              </p>
            </div>
            <div className="s-about-copy">
              <p className="s-label" data-rv>
                Over de oprichter
              </p>
              <h2 data-rv>
                Noor Verhagen, <em>huidtherapeut.</em>
              </h2>
              <p className="s-big" data-rv>
                Ik heb twaalf jaar in grote klinieken gewerkt. Veel apparaten, strakke schema’s, om het kwartier een nieuwe gast. Ik leerde er veel over huid en weinig over mensen.
              </p>
              <p data-rv>In 2019 begon ik Atelier Sage om het andersom te doen. Eén kamer, mijn eigen handen en genoeg tijd om te vragen hoe het met je gaat. De meeste gasten komen eens in de zes weken. Sommigen al sinds de eerste maand.</p>
              <p className="s-sign" data-rv aria-label="Getekend, Noor">
                Noor
              </p>
              <dl className="s-about-facts" data-rv>
                <div>
                  <dt>Sinds 2019</dt>
                  <dd>een eigen salon in Wittevrouwen</dd>
                </div>
                <div>
                  <dt>Twaalf jaar</dt>
                  <dd>ervaring in huidtherapie</dd>
                </div>
                <div>
                  <dt>Zes weken</dt>
                  <dd>tussen twee afspraken, gemiddeld</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* 7 · Ervaringen */}
        <section className="s-voices" id="ervaringen" aria-labelledby="s-voices-h">
          <div className="s-wrap">
            <h2 className="s-label" id="s-voices-h" data-rv>
              Ervaringen van gasten
            </h2>
            <div className="s-voices-top">
              <blockquote className="s-voice-big" data-rv>
                <p>
                  Ik kwam voor mijn huid en bleef voor het uur waarin <em>niemand iets van me wil.</em> Noor ziet in tien seconden hoe mijn week was.
                </p>
                <footer>
                  <b>Fleur</b>
                  <span>komt sinds 2021 elke zes weken</span>
                </footer>
              </blockquote>
              <figure className="s-arch s-voices-art" data-rv="arch" data-px>
                <Pic img={I.hand} alt="Een hand waar crème overheen loopt tegen een zachtroze achtergrond" sizes="(min-width: 960px) 20vw, 44vw" />
              </figure>
            </div>
            <div className="s-voices-rest">
              {QUOTES.map((q, i) => (
                <blockquote key={q.who} data-rv style={{ ["--i" as string]: i }}>
                  <p>{q.quote}</p>
                  <footer>
                    <b>{q.who}</b>
                    <span>{q.note}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* 8 · Afspraak boeken */}
        <section className="s-book" id="boeken">
          <div className="s-wrap s-book-grid">
            <div className="s-book-copy">
              <p className="s-label" data-rv>
                Afspraak boeken
              </p>
              <h2 data-rv>
                Kies je moment. <em>De thee staat klaar.</em>
              </h2>
              <p data-rv>Boek in drie stappen. Je krijgt binnen een werkdag een bevestiging per e-mail. Kosteloos verzetten kan tot 24 uur vooraf.</p>
              <dl className="s-hours" data-rv>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className="s-book-call" data-rv>
                Liever even overleggen? Bel <a href="tel:0300000000">030 000 00 00</a> of mail naar <a href="mailto:hallo@ateliersage.example">hallo@ateliersage.example</a>.
              </p>
            </div>
            <div className="s-book-card" data-rv>
              <Booking />
            </div>
          </div>
        </section>
      </main>

      <footer className="s-foot">
        <div className="s-wrap">
          <div className="s-foot-top">
            <p className="s-foot-mark">
              Atelier <em>Sage</em>
            </p>
            <p className="s-foot-line">Huidsalon in Utrecht. Rust, licht en huid, voor één gast tegelijk.</p>
            <a href="#boeken" className="s-pill s-pill-light">
              Boek een afspraak
            </a>
          </div>
          <div className="s-foot-grid">
            <nav aria-label="Voettekst">
              <h3>Salon</h3>
              <a href="#filosofie">Filosofie</a>
              <a href="#behandelingen">Behandelingen en prijzen</a>
              <a href="#resultaten">Resultaten</a>
              <a href="#ruimte">De ruimte</a>
              <a href="#over">Over Noor</a>
              <a href="#ervaringen">Ervaringen</a>
              <a href="#boeken">Afspraak boeken</a>
            </nav>
            <div>
              <h3>Openingstijden</h3>
              <dl className="s-foot-hours">
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3>Contact</h3>
              <address>
                Atelier Sage
                <br />
                Wittevrouwen, Utrecht
                <br />
                <a href="tel:0300000000">030 000 00 00</a>
                <br />
                <a href="mailto:hallo@ateliersage.example">hallo@ateliersage.example</a>
              </address>
              <p className="s-foot-small">Behandeling op afspraak. Verzetten kan kosteloos tot 24 uur vooraf.</p>
            </div>
          </div>
          <p className="s-legal">
            <span>© Atelier Sage, Utrecht</span>
            <span>Demo-ontwerp van HOPI · Atelier Sage is een fictief bedrijf</span>
          </p>
        </div>
      </footer>
    </DemoShell>
  );
}
