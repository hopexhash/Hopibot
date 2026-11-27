"use client";

import { useRef, useState, type PointerEvent } from "react";
import { DemoForm, useMenu } from "@/demos/kit";
import { IMAGES } from "@/demos/images";
import { Pic } from "@/demos/pic";

const I = IMAGES["creative-agency"];

const LINKS = [
  ["#manifest", "Manifest"],
  ["#werk", "Werk"],
  ["#diensten", "Diensten"],
  ["#werkwijze", "Werkwijze"],
  ["#team", "Team"],
  ["#opdrachtgevers", "Klanten"],
  ["#contact", "Contact"],
] as const;

/** Header: three loose chips. The menu takes over the whole screen with links as large as posters. */
export function Nav() {
  const m = useMenu();
  return (
    <>
      <header className="x-top">
        <a href="#top" className="x-logo" aria-label="Studio Antipode, naar boven" onClick={m.close}>
          anti<i>pod</i>e
        </a>
        <a href="#contact" className="x-top-cta" onClick={m.close}>
          Start een project
        </a>
        <button type="button" className="x-menu-btn" aria-expanded={m.open} aria-controls="x-menu" onClick={m.toggle}>
          <span>{m.open ? "Sluit" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="x-menu" className="x-menu" data-open={m.open || undefined} inert={!m.open}>
        <nav aria-label="Hoofdmenu">
          {LINKS.map(([href, label], i) => (
            <a key={href} href={href} onClick={m.close} style={{ ["--i" as string]: i }}>
              <small>0{i + 1}</small>
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="x-menu-side">
          <p>
            <b>Nieuw project?</b>
            hallo@antipode.example
            <br />
            09 000 00 00
          </p>
          <p>
            <b>Studio</b>
            Oude garenfabriek, Dok Noord, Gent
            <br />
            Ma t/m vr vanaf 9.00
          </p>
        </div>
        <span className="x-menu-word" aria-hidden="true">
          andersom
        </span>
      </div>
    </>
  );
}

type Shape = "arch" | "circle" | "tilt" | "pill" | "leaf" | "skew" | "egg";
const PROJECTS: { name: string; kind: string; year: string; img: keyof typeof I; alt: string; shape: Shape; lead: string; ask: string; turn: string; made: string[] }[] = [
  {
    name: "Ovenkind",
    kind: "Merkidentiteit, verpakking",
    year: "2025",
    img: "case-pour",
    alt: "Een stapel pannenkoeken waar stroop over wordt geschonken",
    shape: "arch",
    lead: "Een bakkerijketen met elf winkels die eruitzag als elke andere bakkerij.",
    ask: "Maak ons warmer en ambachtelijker.",
    turn: "Iedereen toont brood. Wij toonden de ochtend: het uur waarop de oven aangaat en de stad nog slaapt. Zwart papier, één gele vlek en de openingsuren als belofte.",
    made: ["Naam", "Identiteit", "Verpakking", "Winkelinrichting"],
  },
  {
    name: "Kwartslag",
    kind: "Campagne, fotografie",
    year: "2025",
    img: "case-circle",
    alt: "Een man zit op een betonnen rand onder een rond venster met uitzicht op de stad",
    shape: "circle",
    lead: "Een kledinglabel uit Gent dat alleen jassen maakt.",
    ask: "Een campagne voor het nieuwe seizoen.",
    turn: "Geen modellen, geen studio. We fotografeerden dragers op de plek waar ze hun jas het vaakst vergeten uit te doen.",
    made: ["Concept", "Fotografie", "Affiches", "Social"],
  },
  {
    name: "Wakker",
    kind: "Campagne, beweging",
    year: "2024",
    img: "still-life",
    alt: "Een schilderij van een donker bloemstilleven met rode en witte bloemen",
    shape: "tilt",
    lead: "De museumnacht van veertien huizen langs het water.",
    ask: "Trek een jonger publiek.",
    turn: "We lieten de schilderijen zelf uitnodigen. Elk stilleven kreeg een slapeloze ondertitel en kwam ’s nachts tot leven op de gevels.",
    made: ["Campagne", "Motion", "Projecties", "Website"],
  },
  {
    name: "Lauw",
    kind: "Verpakking, webshop",
    year: "2024",
    img: "case-hand",
    alt: "Een hand tegen een roze achtergrond waar een straal lotion overheen loopt",
    shape: "pill",
    lead: "Huidverzorging zonder grote beloftes.",
    ask: "Een verpakking die opvalt in het schap.",
    turn: "Alle potjes roepen. Dat van Lauw fluistert: één zin, één kleur, en op de voorkant alleen hoe het voelt.",
    made: ["Verpakking", "Tone of voice", "Webshop"],
  },
  {
    name: "Poot & Blad",
    kind: "Webshop, fotografie",
    year: "2024",
    img: "case-chair",
    alt: "Een gele fauteuil in een lichte woonkamer met een staande lamp",
    shape: "leaf",
    lead: "Een meubelmaker met zes modellen en een wachtlijst.",
    ask: "Een webshop die sneller verkoopt.",
    turn: "We maakten hem trager. Eerst het hout, dan de maker, dan pas de prijs. Wie bestelt, weet waarom hij twaalf weken wacht.",
    made: ["UX", "Webdesign", "Development", "Fotografie"],
  },
  {
    name: "Kolk",
    kind: "App, merk",
    year: "2023",
    img: "case-wave",
    alt: "Een abstracte golf in paars, roze en blauw",
    shape: "skew",
    lead: "Een spaarapp voor mensen die een hekel hebben aan bankieren.",
    ask: "Maak sparen leuk.",
    turn: "Sparen is niet leuk, klaar zijn wel. De app toont geen saldo maar een golf die stijgt, en zwijgt verder.",
    made: ["Merk", "App-ontwerp", "Motion", "Geluid"],
  },
  {
    name: "Gloeiwerk",
    kind: "Merk, website",
    year: "2023",
    img: "bulb",
    alt: "Een hand houdt een gloeilamp omhoog tegen een roze en blauwe avondlucht",
    shape: "egg",
    lead: "Een energiecoöperatie van en voor één wijk.",
    ask: "Leg uit hoe het werkt.",
    turn: "Niemand wil uitleg over energie. We lieten de buren het zelf vertellen, op hun eigen dak, in één zin.",
    made: ["Naam", "Identiteit", "Website", "Buurtcampagne"],
  },
  {
    name: "Inktvos",
    kind: "Identiteit, drukwerk",
    year: "2023",
    img: "ink",
    alt: "Wolken blauwe en rode inkt die zich in water vermengen",
    shape: "pill",
    lead: "Een risodrukkerij die nooit twee keer hetzelfde drukt.",
    ask: "Een strak logo.",
    turn: "Een logo dat bij elke druk verloopt. Dertig varianten, één stempel en een huisstijl die de drukfout omarmt.",
    made: ["Identiteit", "Drukwerk", "Stempels"],
  },
];

/**
 * The project list. With a mouse, the photo of the row under the pointer travels along with it
 * (the position lives in two CSS variables on the list). On touch screens every row carries its
 * photo, and a tap opens the short story of the case. A click does the same with a mouse.
 */
export function Work() {
  const [hot, setHot] = useState(-1);
  const [open, setOpen] = useState(-1);
  const list = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = list.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${Math.round(e.clientX - r.left)}px`);
    el.style.setProperty("--my", `${Math.round(e.clientY - r.top)}px`);
    el.toggleAttribute("data-flip", e.clientX > window.innerWidth * 0.58);
  };
  return (
    <div className="x-list" ref={list} onPointerMove={move} onPointerLeave={() => setHot(-1)} data-hot={hot >= 0 || undefined}>
      <ol>
        {PROJECTS.map((p, i) => {
          const on = open === i;
          return (
            <li key={p.name} className="x-row" data-open={on || undefined} data-hot={hot === i || undefined}>
              <h3>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`x-case-${i}`}
                  onClick={() => setOpen(on ? -1 : i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHot(i)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setHot(-1)}
                >
                  <span className="x-row-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`x-row-thumb s-${p.shape}`}>
                    <Pic img={I[p.img]} alt={p.alt} sizes="(min-width: 900px) 1px, 50vw" />
                  </span>
                  <span className="x-row-name">{p.name}</span>
                  <span className="x-row-kind">{p.kind}</span>
                  <span className="x-row-year">{p.year}</span>
                  <span className="x-row-plus" aria-hidden="true" />
                </button>
              </h3>
              <div id={`x-case-${i}`} className="x-case" hidden={!on}>
                <p className="x-case-lead">{p.lead}</p>
                <dl>
                  <div>
                    <dt>De vraag</dt>
                    <dd>“{p.ask}”</dd>
                  </div>
                  <div>
                    <dt>Andersom</dt>
                    <dd>{p.turn}</dd>
                  </div>
                </dl>
                <div className="x-case-foot">
                  <ul>
                    {p.made.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="x-link">
                    Zoiets nodig? Vertel het ons
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="x-peek" aria-hidden="true">
        {PROJECTS.map((p, i) => (
          <span key={p.name} className={`x-peek-img s-${p.shape}`} data-on={hot === i || undefined}>
            <Pic img={I[p.img]} alt="" sizes="(min-width: 900px) 26vw, 1px" />
          </span>
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  {
    name: "Merk",
    line: "Strategie, naam, identiteit en verpakking.",
    text: "We zoeken eerst uit wat iedereen in jouw markt al doet. Dan tekenen we het tegendeel en kijken wat overeind blijft. Daar zit meestal je merk.",
    list: ["Positionering", "Naam en verhaal", "Logo en beeldtaal", "Verpakking", "Merkgids"],
    price: "Vanaf € 9.500",
    time: "6 tot 10 weken",
  },
  {
    name: "Campagne",
    line: "Eén idee dat op een affiche past en op een telefoon werkt.",
    text: "Geen losse posts, wel een gedachte die je een heel seizoen kan dragen. We bedenken, schrijven, fotograferen en filmen met onze eigen ploeg.",
    list: ["Concept", "Fotografie en film", "Affiches en buitenreclame", "Social", "Mediaplan met vaste partners"],
    price: "Vanaf € 14.000",
    time: "4 tot 8 weken",
  },
  {
    name: "Digitaal",
    line: "Websites, webshops en apps die anders durven te bewegen.",
    text: "Ontwerp en development zitten bij ons aan dezelfde tafel. Wat we tekenen, bouwen we ook, snel, toegankelijk en makkelijk zelf bij te werken.",
    list: ["UX en prototypes", "Webdesign", "Development", "Webshop en koppelingen", "Onderhoud"],
    price: "Vanaf € 12.000",
    time: "8 tot 14 weken",
  },
  {
    name: "Beweging",
    line: "Motion, film en geluid voor merken die niet stil kunnen zitten.",
    text: "Een logo dat ademt, een reeks van tien seconden, een geluid dat bij je merk hoort. Lotte maakt het, jij krijgt de bestanden en de spelregels.",
    list: ["Bewegend logo", "Explainers en reeksen", "Titels en leaders", "Sound design"],
    price: "Vanaf € 4.500",
    time: "2 tot 5 weken",
  },
  {
    name: "Omkeerdag",
    line: "Eén dag, jouw team, onze muur. Je briefing gaat ondersteboven.",
    text: "Een werksessie voor wie vastzit of nog niet weet wat de vraag is. ’s Ochtends breken we je briefing af, ’s middags bouwen we een betere. Je gaat naar huis met één pagina.",
    list: ["Voorgesprek van een uur", "Werkdag in Gent, tot acht mensen", "De omgekeerde briefing", "Lunch van om de hoek"],
    price: "€ 1.950",
    time: "1 dag",
  },
];

/** Services: an accordion in which the numbers are larger than the titles. */
export function Services() {
  const [at, setAt] = useState(0);
  return (
    <ol className="x-acc">
      {SERVICES.map((s, i) => {
        const on = at === i;
        return (
          <li key={s.name} data-open={on || undefined}>
            <h3>
              <button type="button" id={`x-serv-b-${i}`} aria-expanded={on} aria-controls={`x-serv-${i}`} onClick={() => setAt(on ? -1 : i)}>
                <span className="x-acc-no" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="x-acc-name">{s.name}</span>
                <span className="x-acc-line">{s.line}</span>
                <span className="x-acc-plus" aria-hidden="true" />
              </button>
            </h3>
            <div id={`x-serv-${i}`} role="region" aria-labelledby={`x-serv-b-${i}`} className="x-acc-panel" hidden={!on}>
              <p className="x-acc-line-m">{s.line}</p>
              <p className="x-acc-text">{s.text}</p>
              <ul>
                {s.list.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="x-acc-price">
                <b>{s.price}</b>
                <span>{s.time}</span>
                <a href="#contact" className="x-link">
                  Vraag een voorstel
                </a>
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

const BUDGETS = ["Tot € 10.000", "€ 10.000 – 25.000", "€ 25.000 – 50.000", "Meer dan € 50.000", "Geen idee, help"];
const TOPICS = ["Merk", "Campagne", "Digitaal", "Beweging", "Omkeerdag"];

/** The briefing form: budget and subject as chips, then three fields. Nothing is sent. */
export function Brief() {
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [topics, setTopics] = useState<string[]>(["Merk"]);
  const flip = (t: string) => setTopics((now) => (now.includes(t) ? now.filter((x) => x !== t) : [...now, t]));
  return (
    <DemoForm className="x-form" done={`Zo zou het werken: je vraag (budget: ${budget.toLowerCase()}) zou nu bij Renske liggen. Dit is een demo-ontwerp van HOPI, er is niets verzonden.`}>
      <fieldset>
        <legend>Waar gaat het over?</legend>
        <div className="x-chips">
          {TOPICS.map((t) => (
            <button key={t} type="button" aria-pressed={topics.includes(t)} onClick={() => flip(t)}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Wat is je budget?</legend>
        <div className="x-chips">
          {BUDGETS.map((b) => (
            <button key={b} type="button" aria-pressed={budget === b} onClick={() => setBudget(b)}>
              {b}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="x-fields">
        <label>
          <span>Naam</span>
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label>
          <span>E-mail</span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label className="x-field-wide">
          <span>Wat wil je omgooien?</span>
          <textarea name="message" rows={3} />
        </label>
      </div>
      <button type="submit" className="x-btn x-btn-acid">
        Verstuur je vraag
        <svg className="x-arrow" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 19L19 5M8 5h11v11" fill="none" stroke="currentColor" strokeWidth="2.6" />
        </svg>
      </button>
    </DemoForm>
  );
}
