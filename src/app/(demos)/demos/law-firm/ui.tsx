"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { DemoForm, useMenu } from "@/demos/kit";
import { IMAGES } from "@/demos/images";
import { Pic } from "@/demos/pic";

const I = IMAGES["law-firm"];

const LINKS = [
  ["#rechtsgebieden", "Rechtsgebieden"],
  ["#aanpak", "Aanpak"],
  ["#advocaten", "De advocaten"],
  ["#zaken", "Expertise en zaken"],
  ["#publicaties", "Publicaties"],
  ["#kennismaking", "Kennismaking aanvragen"],
] as const;

type AreaId = "onderneming" | "arbeid" | "vastgoed" | "familie" | "proces";
type PersonId = "aerden" | "dijkhof" | "reinders" | "vermolen" | "lindeman";

/** Parts of the page talk to each other through two small window events. */
const say = (name: "a-profile" | "a-area", detail: string) => window.dispatchEvent(new CustomEvent(name, { detail }));

/** Header: a letterhead with the contents of the document. On small screens the contents open as a page of their own. */
export function Nav() {
  const m = useMenu();
  return (
    <>
      <header className="a-head">
        <div className="a-head-in">
          <a href="#top" className="a-logo" aria-label="Van Aerden Advocaten, naar boven" onClick={m.close}>
            Van Aerden
            <small>Advocaten</small>
          </a>
          <nav aria-label="Hoofdmenu" className="a-links">
            {LINKS.slice(0, 5).map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <a href="tel:0700000000" className="a-head-tel">
            070 000 00 00
          </a>
          <a href="#kennismaking" className="a-btn a-btn-s a-head-cta">
            Kennismaking
          </a>
          <button type="button" className="a-burger" aria-expanded={m.open} aria-controls="a-toc" onClick={m.toggle}>
            <span>{m.open ? "Sluit" : "Inhoud"}</span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="a-toc" className={`a-toc${m.open ? " is-open" : ""}`} inert={!m.open}>
        <p className="a-cap a-toc-h">Inhoud</p>
        <nav aria-label="Inhoud">
          {LINKS.map(([href, label], i) => (
            <a key={href} href={href} onClick={m.close} style={{ ["--i" as string]: i }}>
              <span>{label}</span>
              <i aria-hidden="true" />
              <small>§ {i + 1}</small>
            </a>
          ))}
        </nav>
        <div className="a-toc-foot">
          <a href="tel:0700000000">070 000 00 00</a>
          <p>
            Maandag t/m vrijdag, 8.30 tot 18.00 uur
            <br />
            Archipelbuurt, Den Haag
          </p>
        </div>
      </div>
    </>
  );
}

const PEOPLE: {
  id: PersonId;
  img: keyof typeof I;
  pos: string;
  name: string;
  first: string;
  role: string;
  spec: string;
  area: AreaId;
  since: string;
  bio: string[];
  focus: string[];
  langs: string[];
  mail: string;
  alt: string;
}[] = [
  {
    id: "aerden",
    img: "partner-4",
    pos: "50% 30%",
    name: "mr. Frederik van Aerden",
    first: "Frederik",
    role: "Partner",
    spec: "Ondernemingsrecht en procespraktijk",
    area: "onderneming",
    since: "1998",
    bio: [
      "Frederik is de tweede generatie Van Aerden aan het kantoor en sinds 2009 partner. Hij adviseert familiebedrijven en directeuren-grootaandeelhouders, en staat hen bij als een geschil toch voor de rechter komt.",
      "Cliënten kennen hem van zijn brieven: zelden langer dan twee pagina’s, met het advies in de eerste alinea.",
    ],
    focus: ["Geschillen tussen aandeelhouders", "Overnames in het midden- en kleinbedrijf", "Aansprakelijkheid van bestuurders", "Handelsgeschillen en beslag"],
    langs: ["Nederlands", "Engels", "Duits"],
    mail: "f.vanaerden@vanaerden.example",
    alt: "Portret van Frederik van Aerden in pak voor een bakstenen muur",
  },
  {
    id: "dijkhof",
    img: "partner-3",
    pos: "50% 28%",
    name: "mr. Carmen Dijkhof",
    first: "Carmen",
    role: "Partner",
    spec: "Familie- en erfrecht",
    area: "familie",
    since: "2006",
    bio: [
      "Carmen werkt waar familie en vermogen elkaar raken. Zij begeleidt echtscheidingen waarin een onderneming of pensioen moet worden verdeeld en adviseert families over opvolging en nalatenschap.",
      "Zij is ook opgeleid als mediator en begint het liefst aan tafel. Lukt dat niet, dan procedeert zij zelf.",
    ],
    focus: ["Echtscheiding met een onderneming", "Afwikkeling van nalatenschappen", "Bedrijfsopvolging in de familie", "Mediation"],
    langs: ["Nederlands", "Engels", "Spaans"],
    mail: "c.dijkhof@vanaerden.example",
    alt: "Portret van Carmen Dijkhof, lachend, in een gestreept jasje",
  },
  {
    id: "reinders",
    img: "partner-1",
    pos: "50% 18%",
    name: "mr. Jasper Reinders",
    first: "Jasper",
    role: "Partner",
    spec: "Arbeidsrecht",
    area: "arbeid",
    since: "2008",
    bio: [
      "Jasper adviseert werkgevers, bestuurders en leidinggevenden. Voordat hij advocaat werd, werkte hij vier jaar op een personeelsafdeling. Hij weet hoe een dossier er in de praktijk uitziet en wat er meestal aan ontbreekt.",
      "Hij geeft geregeld trainingen aan leidinggevenden over het voeren van moeilijke gesprekken.",
    ],
    focus: ["Ontslag en reorganisatie", "Positie van de statutair bestuurder", "Ziekte en re-integratie", "Concurrentie- en relatiebedingen"],
    langs: ["Nederlands", "Engels"],
    mail: "j.reinders@vanaerden.example",
    alt: "Portret van Jasper Reinders met bril en donker colbert",
  },
  {
    id: "vermolen",
    img: "partner-2",
    pos: "50% 22%",
    name: "mr. Daan Vermolen",
    first: "Daan",
    role: "Partner",
    spec: "Vastgoed en huur",
    area: "vastgoed",
    since: "2013",
    bio: [
      "Daan is de jongste partner van het kantoor. Hij staat huurders, verhuurders en beleggers bij, van de eerste intentieverklaring tot en met de oplevering.",
      "Hij rekent mee, leest de bijlagen en loopt het pand het liefst zelf een keer door voordat hij adviseert.",
    ],
    focus: ["Huur van winkel- en kantoorruimte", "Aankoop en verkoop van vastgoed", "Geschillen bij oplevering", "Bouw en aanneming"],
    langs: ["Nederlands", "Engels", "Frans"],
    mail: "d.vermolen@vanaerden.example",
    alt: "Portret van Daan Vermolen in donker pak met de armen over elkaar",
  },
  {
    id: "lindeman",
    img: "associate",
    pos: "50% 16%",
    name: "mr. Sophie Lindeman",
    first: "Sophie",
    role: "Advocaat-medewerker",
    spec: "Arbeidsrecht en huurrecht",
    area: "arbeid",
    since: "2022",
    bio: [
      "Sophie kwam in 2022 bij het kantoor na haar master privaatrecht. Zij werkt met Jasper en Daan aan arbeids- en huurzaken en is voor veel cliënten het eerste aanspreekpunt.",
      "Zij schrijft ruim de helft van onze publicaties, omdat zij vindt dat een juridische tekst ook gewoon leesbaar mag zijn.",
    ],
    focus: ["Arbeidsovereenkomsten en reglementen", "Huurgeschillen", "Incasso en beslag"],
    langs: ["Nederlands", "Engels", "Italiaans"],
    mail: "s.lindeman@vanaerden.example",
    alt: "Portret van Sophie Lindeman in een grijs colbert bij het raam",
  },
];

const AREAS: { id: AreaId; title: string; sub: string; text: string[]; work: string[]; questions: string[]; partner: PersonId }[] = [
  {
    id: "onderneming",
    title: "Ondernemingsrecht",
    sub: "Van oprichting tot overdracht",
    text: [
      "Wij adviseren directeuren-grootaandeelhouders, familiebedrijven en groeiende ondernemingen over alles wat tussen aandeelhouders, bestuurders en contractpartijen geregeld moet zijn.",
      "Het liefst voordat het knelt: een aandeelhoudersovereenkomst die ook werkt als de verhoudingen veranderen, en voorwaarden die uw klanten daadwerkelijk lezen.",
    ],
    work: ["Aandeelhoudersovereenkomsten", "Overnames en participaties", "Bestuur en toezicht", "Commerciële contracten"],
    questions: ["Mijn compagnon wil eruit. Wat staat daarover in onze afspraken?", "Kan ik als bestuurder persoonlijk worden aangesproken?", "Hoe leggen wij een overname vast zonder dat de onderhandeling vastloopt?"],
    partner: "aerden",
  },
  {
    id: "arbeid",
    title: "Arbeidsrecht",
    sub: "Voor werkgevers en bestuurders",
    text: [
      "Arbeidsrecht gaat over mensen die elkaar morgen weer tegenkomen. Wij staan werkgevers, bestuurders en leidinggevenden bij op de momenten waarop dat lastig wordt.",
      "Een reorganisatie, een langdurig zieke collega of een vertrek dat netjes geregeld moet worden: wij helpen u het dossier op orde te brengen voordat het gesprek begint.",
    ],
    work: ["Ontslag en vaststellingsovereenkomsten", "Reorganisatie en medezeggenschap", "Ziekte en re-integratie", "Arbeidsvoorwaarden en bedingen"],
    questions: ["Is ons concurrentiebeding nog houdbaar nu de functie is veranderd?", "Wat moet er in een dossier zitten voordat wij over afscheid praten?", "Hoe richten wij een reorganisatie in die ook uit te leggen is?"],
    partner: "reinders",
  },
  {
    id: "vastgoed",
    title: "Vastgoed en huur",
    sub: "Bedrijfsruimte, belegging en bouw",
    text: [
      "Een huurcontract loopt vaak langer dan het ondernemingsplan waarvoor het is getekend. Wij begeleiden huurders, verhuurders en beleggers bij het sluiten, wijzigen en beëindigen van huurovereenkomsten.",
      "Voor winkels, kantoren en bedrijfshallen, en bij de aankoop en verkoop van vastgoed. Wij lezen ook de bijlagen, want daar staat meestal waar het om gaat.",
    ],
    work: ["Huur van bedrijfsruimte", "Aankoop en verkoop", "Oplevering en herstel", "Bouw en aanneming"],
    questions: ["Mag de verhuurder de huur op deze manier indexeren?", "Wij willen eerder weg uit het pand. Welke mogelijkheden zijn er?", "Wie betaalt het herstel bij de oplevering?"],
    partner: "vermolen",
  },
  {
    id: "familie",
    title: "Familie- en erfrecht",
    sub: "Vermogen, relatie en opvolging",
    text: [
      "Waar familie en vermogen samenkomen, is zorgvuldigheid geen luxe. Wij adviseren en procederen bij echtscheidingen met een onderneming of vermogen en bij de afwikkeling van nalatenschappen.",
      "Ook de overdracht van een bedrijf binnen de familie hoort hier thuis. Waar het kan, beginnen wij met mediation.",
    ],
    work: ["Echtscheiding en verdeling", "Nalatenschap en testament", "Bedrijfsopvolging", "Mediation"],
    questions: ["Wat gebeurt er met de onderneming als wij uit elkaar gaan?", "Wij komen er als erfgenamen niet uit. Hoe nu verder?", "Hoe draag ik het bedrijf over aan één kind zonder de anderen tekort te doen?"],
    partner: "dijkhof",
  },
  {
    id: "proces",
    title: "Procespraktijk",
    sub: "Als overleg niet meer genoeg is",
    text: [
      "Procederen is een middel en geen doel. Soms is het wel het juiste middel. Dan bereiden wij de zaak voor alsof er morgen wordt gepleit: feiten op een rij, bewijs geordend, risico’s benoemd.",
      "Zo weet u vooraf waar u aan begint, hoe lang het kan duren en wat het kan kosten. Een uitkomst kunnen wij niet toezeggen, een eerlijke inschatting wel.",
    ],
    work: ["Handelsgeschillen", "Beslag en incasso", "Kort geding", "Arbitrage en mediation"],
    questions: ["Hoe sterk staan wij als het tot een procedure komt?", "Kunnen wij beslag leggen om onze vordering veilig te stellen?", "Is mediation of arbitrage voor ons een beter spoor?"],
    partner: "aerden",
  },
];

const AREA_LABEL = Object.fromEntries(AREAS.map((a) => [a.id, a.title])) as Record<AreaId, string>;

/** Practice areas as numbered articles. One opens at a time; arrow keys move between the headings. */
export function Areas() {
  const [open, setOpen] = useState(0);
  const heads = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = AREAS.length - 1;
    const to = e.key === "ArrowDown" ? (i === last ? 0 : i + 1) : e.key === "ArrowUp" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (to < 0) return;
    e.preventDefault();
    heads.current[to]?.focus();
  };
  return (
    <div className="a-acc">
      {AREAS.map((a, i) => {
        const on = open === i;
        const p = PEOPLE.find((x) => x.id === a.partner)!;
        return (
          <article key={a.id} className={`a-art${on ? " is-open" : ""}`} data-rv style={{ ["--i" as string]: i }}>
            <h3>
              <button
                type="button"
                id={`a-art-${a.id}`}
                ref={(el) => {
                  heads.current[i] = el;
                }}
                aria-expanded={on}
                aria-controls={`a-artp-${a.id}`}
                onClick={() => setOpen(on ? -1 : i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="a-art-n">Art. 0{i + 1}</span>
                <span className="a-art-t">{a.title}</span>
                <span className="a-art-s">{a.sub}</span>
                <i className="a-plus" aria-hidden="true" />
              </button>
            </h3>
            <div id={`a-artp-${a.id}`} role="region" aria-labelledby={`a-art-${a.id}`} hidden={!on} className="a-art-p">
              <div className="a-art-text" style={{ ["--i" as string]: 0 }}>
                {a.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
                <ul className="a-art-work">
                  {a.work.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
              <div className="a-art-q" style={{ ["--i" as string]: 1 }}>
                <h4 className="a-cap">Vragen die wij vaak krijgen</h4>
                <ul>
                  {a.questions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
              <div className="a-art-who" style={{ ["--i" as string]: 2 }}>
                <h4 className="a-cap">Verantwoordelijk partner</h4>
                <div className="a-art-partner">
                  <span className="a-duo">
                    <Pic img={I[p.img]} alt="" sizes="72px" style={{ objectPosition: p.pos }} />
                  </span>
                  <p>
                    <b>{p.name}</b>
                    <span>{p.spec}</span>
                  </p>
                </div>
                <button type="button" className="a-link" onClick={() => say("a-profile", p.id)}>
                  Lees het profiel
                </button>
                <a href="#kennismaking" className="a-link" onClick={() => say("a-area", a.id)}>
                  Leg uw vraag voor
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** The attorneys, and the profile that opens beside the page (on a phone: over it). */
export function Attorneys() {
  const { open, setOpen } = useMenu();
  const [at, setAt] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const closer = useRef<HTMLButtonElement>(null);
  const from = useRef<HTMLElement | null>(null);
  const p = PEOPLE[at];

  const show = (i: number) => {
    from.current = document.activeElement as HTMLElement | null;
    setAt(i);
    setOpen(true);
  };
  const close = () => setOpen(false);
  const step = (d: number) => {
    setAt((i) => (i + d + PEOPLE.length) % PEOPLE.length);
    panel.current?.scrollTo({ top: 0 });
  };

  // A practice area can ask for the profile of its partner.
  useEffect(() => {
    const on = (e: Event) => {
      const i = PEOPLE.findIndex((x) => x.id === (e as CustomEvent<string>).detail);
      if (i < 0) return;
      from.current = document.activeElement as HTMLElement | null;
      setAt(i);
      setOpen(true);
    };
    window.addEventListener("a-profile", on);
    return () => window.removeEventListener("a-profile", on);
  }, [setOpen]);

  // Focus goes into the profile when it opens and back to where it came from when it closes.
  useEffect(() => {
    if (open) {
      closer.current?.focus({ preventScroll: true });
    } else if (from.current) {
      from.current.focus({ preventScroll: true });
      from.current = null;
    }
  }, [open]);

  const trap = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      step(e.key === "ArrowRight" ? 1 : -1);
      return;
    }
    if (e.key !== "Tab" || !panel.current) return;
    const f = panel.current.querySelectorAll<HTMLElement>("a[href], button");
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <ol className="a-team">
        {PEOPLE.map((x, i) => (
          <li key={x.id} data-rv style={{ ["--i" as string]: i }}>
            <button type="button" className="a-person" aria-haspopup="dialog" onClick={() => show(i)}>
              <span className="a-person-n" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="a-duo a-person-img">
                <Pic img={I[x.img]} alt={x.alt} sizes="(min-width: 1000px) 19vw, (min-width: 640px) 30vw, 120px" style={{ objectPosition: x.pos }} />
              </span>
              <span className="a-person-txt">
                <span className="a-cap a-acc-c">{x.role}</span>
                <b>{x.name}</b>
                <span className="a-person-spec">{x.spec}</span>
                <span className="a-person-more">
                  Lees het profiel <i aria-hidden="true">→</i>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className={`a-dlg${open ? " is-open" : ""}`} inert={!open}>
        <div className="a-dlg-back" onClick={close} aria-hidden="true" />
        <div className="a-dlg-panel" role="dialog" aria-modal="true" aria-labelledby="a-dlg-h" ref={panel} onKeyDown={trap}>
          <div className="a-dlg-bar">
            <p className="a-cap">
              Profiel {at + 1} van {PEOPLE.length}
            </p>
            <button type="button" className="a-dlg-step" onClick={() => step(-1)} aria-label="Vorige advocaat">
              ←
            </button>
            <button type="button" className="a-dlg-step" onClick={() => step(1)} aria-label="Volgende advocaat">
              →
            </button>
            <button type="button" className="a-dlg-x" ref={closer} onClick={close}>
              Sluit
            </button>
          </div>
          <div className="a-dlg-in" key={p.id}>
            <div className="a-dlg-top">
              <div className="a-duo a-dlg-img">
                <Pic img={I[p.img]} alt={p.alt} sizes="(min-width: 700px) 240px, 60vw" style={{ objectPosition: p.pos }} />
              </div>
              <div>
                <p className="a-cap a-acc-c">{p.role}</p>
                <h3 id="a-dlg-h">{p.name}</h3>
                <p className="a-dlg-spec">{p.spec}</p>
              </div>
            </div>
            <div className="a-dlg-bio">
              {p.bio.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <div className="a-dlg-cols">
              <div>
                <h4 className="a-cap">Aandachtsgebieden</h4>
                <ul>
                  {p.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="a-cap">Talen</h4>
                <ul>
                  {p.langs.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <h4 className="a-cap">Advocaat sinds</h4>
                <ul>
                  <li>{p.since}</li>
                </ul>
              </div>
            </div>
            <p className="a-dlg-mail">
              <span className="a-cap">Rechtstreeks</span>
              <a href={`mailto:${p.mail}`}>{p.mail}</a>
            </p>
            <a
              href="#kennismaking"
              className="a-btn"
              onClick={() => {
                from.current = null;
                say("a-area", p.area);
                close();
              }}
            >
              Vraag een kennismaking met {p.first} aan
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

const CASES: { area: AreaId; client: string; ask: string; work: string; course: string }[] = [
  {
    area: "onderneming",
    client: "Familiebedrijf in de maakindustrie",
    ask: "Twee takken van de familie dachten verschillend over de verkoop van een dochtervennootschap.",
    work: "De aandeelhoudersovereenkomst opnieuw gelezen, de besluitvorming in kaart gebracht en een gezamenlijk overleg voorbereid.",
    course: "De familie koos voor een verkoop in stappen, met nieuwe afspraken over zeggenschap.",
  },
  {
    area: "arbeid",
    client: "Zorginstelling met enkele honderden medewerkers",
    ask: "Twee locaties gingen samen. Dat had gevolgen voor functies en roosters.",
    work: "Het reorganisatieplan getoetst, het overleg met de ondernemingsraad voorbereid en een vertrekregeling opgesteld.",
    course: "Het plan is na overleg op onderdelen aangepast en daarna uitgevoerd.",
  },
  {
    area: "vastgoed",
    client: "Winkelketen met elf vestigingen",
    ask: "Elf huurcontracten, elk met een andere bepaling over de jaarlijkse verhoging van de huur.",
    work: "Alle contracten naast elkaar gelegd en per pand bepaald hoeveel ruimte er was voor nieuw overleg.",
    course: "Met een deel van de verhuurders zijn nieuwe afspraken op papier gezet.",
  },
  {
    area: "familie",
    client: "Ondernemersechtpaar met een horecabedrijf",
    ask: "Een echtscheiding, terwijl beide partners dagelijks in dezelfde zaak werkten.",
    work: "Mediation begeleid, de onderneming laten waarderen en de afspraken uitgewerkt in een convenant.",
    course: "Een van beiden zet het bedrijf voort. De afspraken zijn vastgelegd.",
  },
  {
    area: "proces",
    client: "Groothandel in bouwmaterialen",
    ask: "Een leverancier leverde maandenlang te laat, waardoor eigen afnemers afhaakten.",
    work: "De leverancier in gebreke gesteld, het bewijs geordend en een procedure voorbereid.",
    course: "Partijen hebben kort voor de zitting een regeling getroffen.",
  },
  {
    area: "onderneming",
    client: "Softwarebedrijf met twee oprichters",
    ask: "Een van de oprichters wilde vertrekken. Over de prijs van zijn aandelen was niets afgesproken.",
    work: "Een methode van waarderen voorgesteld, een onafhankelijke deskundige betrokken en de uittreding vastgelegd.",
    course: "De uittreding is geregeld zonder procedure. Het bedrijf werkte in die periode gewoon door.",
  },
  {
    area: "arbeid",
    client: "Statutair bestuurder van een handelsonderneming",
    ask: "Bestuurder en aandeelhouder verschilden van inzicht over de koers van het bedrijf.",
    work: "De positie van de bestuurder beoordeeld en de onderhandeling over een vertrek gevoerd.",
    course: "Partijen zijn uit elkaar gegaan met een vaststellingsovereenkomst.",
  },
  {
    area: "vastgoed",
    client: "Belegger in bedrijfshallen",
    ask: "Bij de oplevering van een verhuurde hal ontstond discussie over wie welk herstel moest betalen.",
    work: "Het contract naast het opleveringsrapport gelegd en het pand met een bouwkundige doorgelopen.",
    course: "De oplevering is afgewikkeld met een regeling tussen huurder en verhuurder.",
  },
  {
    area: "familie",
    client: "Erfgenamen van een agrarisch bedrijf",
    ask: "Drie kinderen, van wie er één het bedrijf wilde voortzetten.",
    work: "Het testament en eerdere schenkingen in kaart gebracht en met alle erfgenamen aan tafel gezeten.",
    course: "De nalatenschap is in onderling overleg verdeeld.",
  },
  {
    area: "proces",
    client: "Architectenbureau met tien medewerkers",
    ask: "Een opdrachtgever liet de laatste termijnen van een afgerond ontwerp onbetaald.",
    work: "Het dossier opgebouwd, de mogelijkheid van beslag beoordeeld en de procedure gevoerd.",
    course: "De rechter heeft uitspraak gedaan, waarna partijen de zaak hebben afgewikkeld.",
  },
];

const WORDS = ["nul", "één", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen", "tien"];

/** Anonymised case notes with a filter per practice area. */
export function Cases() {
  const [f, setF] = useState<AreaId | "alle">("alle");
  const [all, setAll] = useState(false);
  const found = CASES.map((c, i) => ({ ...c, n: i + 1 })).filter((c) => f === "alle" || c.area === f);
  const list = f === "alle" && !all ? found.slice(0, 6) : found;
  return (
    <div className="a-cases" data-rv>
      <div className="a-filter" role="group" aria-label="Filter op rechtsgebied">
        <button type="button" aria-pressed={f === "alle"} onClick={() => setF("alle")}>
          Alle <sup>{CASES.length}</sup>
        </button>
        {AREAS.map((a) => (
          <button key={a.id} type="button" aria-pressed={f === a.id} onClick={() => setF(a.id)}>
            {a.title} <sup>{CASES.filter((c) => c.area === a.id).length}</sup>
          </button>
        ))}
      </div>
      <p className="a-cases-count" role="status">
        <b>
          {list.length} van {found.length}
        </b>{" "}
        {f === "alle" ? "notities" : `notities over ${AREA_LABEL[f].toLowerCase()}`} · geanonimiseerd, zonder namen, bedragen of uitspraken
      </p>
      <ol className="a-notes" key={`${f}-${all}`}>
        {list.map((c, i) => (
          <li key={c.n} style={{ ["--i" as string]: i }}>
            <article>
              <header>
                <p className="a-cap">
                  <b>Notitie {String(c.n).padStart(2, "0")}</b> · {AREA_LABEL[c.area]}
                </p>
                <h3>{c.client}</h3>
              </header>
              <dl>
                <div>
                  <dt>Vraag</dt>
                  <dd>{c.ask}</dd>
                </div>
                <div>
                  <dt>Ons werk</dt>
                  <dd>{c.work}</dd>
                </div>
                <div>
                  <dt>Verloop</dt>
                  <dd>{c.course}</dd>
                </div>
              </dl>
            </article>
          </li>
        ))}
      </ol>
      {f === "alle" ? (
        <button type="button" className="a-link a-cases-more" aria-expanded={all} onClick={() => setAll(!all)}>
          {all ? "Toon minder notities" : `Toon alle ${WORDS[CASES.length]} notities`}
        </button>
      ) : null}
    </div>
  );
}

const PUBS = [
  {
    date: "12 november 2026",
    area: "Arbeidsrecht",
    title: "Het concurrentiebeding na een functiewijziging",
    by: "mr. Jasper Reinders",
    min: 5,
    text: "Een beding dat bij indiensttreding redelijk was, kan na een promotie anders gaan wegen. Wij beschrijven wanneer het verstandig is het beding opnieuw overeen te komen, en hoe u dat gesprek voert zonder de verhouding op scherp te zetten.",
  },
  {
    date: "28 oktober 2026",
    area: "Vastgoed en huur",
    title: "Indexering van de winkelhuur: lees eerst de definitie",
    by: "mr. Daan Vermolen",
    min: 4,
    text: "Bijna elk huurcontract kent een jaarlijkse aanpassing van de huur, maar de formule verschilt per contract. Aan de hand van drie veelvoorkomende formuleringen laten wij zien waar het in de praktijk misgaat en welke vragen u uw verhuurder kunt stellen.",
  },
  {
    date: "9 oktober 2026",
    area: "Ondernemingsrecht",
    title: "De aandeelhoudersovereenkomst die niemand meer leest",
    by: "mr. Frederik van Aerden",
    min: 7,
    text: "De meeste overeenkomsten tussen aandeelhouders worden getekend bij de oprichting en daarna niet meer ingezien, tot het moment dat het ertoe doet. Vijf bepalingen die u eens per twee jaar tegen het licht zou moeten houden.",
  },
  {
    date: "17 september 2026",
    area: "Procespraktijk",
    title: "Schikken is geen verliezen",
    by: "mr. Sophie Lindeman",
    min: 4,
    text: "Een regeling voelt soms als toegeven. Toch weegt wie procedeert tijd, kosten en onzekerheid af tegen het resultaat dat mogelijk is. Hoe wij met cliënten bepalen wanneer een voorstel het overwegen waard is, en wanneer niet.",
  },
];

/** Earlier publications: the title opens a short summary. */
export function Pubs() {
  const [open, setOpen] = useState(-1);
  return (
    <ol className="a-pubs">
      {PUBS.map((p, i) => {
        const on = open === i;
        return (
          <li key={p.title} className={on ? "is-open" : undefined} data-rv style={{ ["--i" as string]: i }}>
            <button type="button" aria-expanded={on} aria-controls={`a-pub-${i}`} onClick={() => setOpen(on ? -1 : i)}>
              <span className="a-pub-date">{p.date}</span>
              <span className="a-pub-main">
                <span className="a-cap a-acc-c">{p.area}</span>
                <span className="a-pub-title">{p.title}</span>
              </span>
              <span className="a-pub-by">
                {p.by} · {p.min} min
              </span>
              <i className="a-plus" aria-hidden="true" />
            </button>
            <div id={`a-pub-${i}`} className="a-pub-p" hidden={!on}>
              <p>{p.text}</p>
              <p className="a-pub-meta">
                Samenvatting. Door {p.by}, {p.min} minuten leestijd.
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

const WAYS = ["Bel mij terug", "Afspraak op kantoor", "Videogesprek"];

/** Request for an introduction. The practice area can be set from elsewhere on the page. Nothing is sent. */
export function Intro() {
  const [area, setArea] = useState<AreaId | "onbekend">("onderneming");
  useEffect(() => {
    const on = (e: Event) => setArea((e as CustomEvent<AreaId>).detail);
    window.addEventListener("a-area", on);
    return () => window.removeEventListener("a-area", on);
  }, []);
  const label = area === "onbekend" ? "een nog onbekend rechtsgebied" : AREA_LABEL[area].toLowerCase();
  return (
    <DemoForm className="a-form" done={`Zo zou het werken: uw aanvraag voor een kennismaking over ${label} is genoteerd en een advocaat belt u binnen één werkdag. Dit is een demo-ontwerp van HOPI, er is niets verzonden.`}>
      <p className="a-form-head">
        <span className="a-cap">Formulier K</span>
        <span className="a-cap">Aanvraag kennismaking</span>
      </p>
      <fieldset>
        <legend>
          <b>1</b> Waarover gaat uw vraag?
        </legend>
        <div className="a-choice">
          {AREAS.map((a) => (
            <label key={a.id}>
              <input type="radio" name="rechtsgebied" value={a.id} checked={area === a.id} onChange={() => setArea(a.id)} />
              <span>{a.title}</span>
            </label>
          ))}
          <label>
            <input type="radio" name="rechtsgebied" value="onbekend" checked={area === "onbekend"} onChange={() => setArea("onbekend")} />
            <span>Weet ik nog niet</span>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <b>2</b> Uw gegevens
        </legend>
        <div className="a-fields">
          <label>
            <span>Naam</span>
            <input type="text" name="naam" autoComplete="name" required />
          </label>
          <label>
            <span>Organisatie (als die er is)</span>
            <input type="text" name="organisatie" autoComplete="organization" />
          </label>
          <label>
            <span>E-mailadres</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            <span>Telefoon</span>
            <input type="tel" name="telefoon" autoComplete="tel" />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <b>3</b> Uw vraag in het kort
        </legend>
        <div className="a-fields">
          <label className="a-field-wide">
            <span>Wat speelt er, in twee of drie zinnen?</span>
            <textarea name="vraag" rows={3} />
          </label>
          <label className="a-field-wide">
            <span>Hoe spreekt u ons het liefst?</span>
            <select name="voorkeur" defaultValue={WAYS[0]}>
              {WAYS.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>
      <button type="submit" className="a-btn">
        Vraag de kennismaking aan
      </button>
    </DemoForm>
  );
}
