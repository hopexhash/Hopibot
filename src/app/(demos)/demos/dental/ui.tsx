"use client";

import { Fragment, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Baby, Check, Clock, Crown, HandHeart, Moon, Phone, Plus, Search, Smile, Sparkles, Sun, Sunrise, X } from "lucide-react";
import { DemoForm, useMenu } from "@/demos/kit";
import { IMAGES } from "@/demos/images";
import { Pic } from "@/demos/pic";

const I = IMAGES.dental;
const TEL = "023 000 00 00";
const TEL_HREF = "tel:0230000000";
const ICON = { size: 24, strokeWidth: 1.7 } as const;

/* ── Drawn icons: the tooth and its relatives, in the same line as the rest ── */
const TOOTH =
  "M12 5.6c-1.5-1.2-2.9-1.9-4.3-1.9-2.4 0-3.9 1.8-3.9 4.3 0 1.9.7 3.2 1.2 4.8.5 1.7.6 3.6 1 5.4.3 1.3.8 2.1 1.6 2.1 1 0 1.3-1 1.6-2.4.3-1.6.7-3.4 2.8-3.4s2.5 1.8 2.8 3.4c.3 1.4.6 2.4 1.6 2.4.8 0 1.3-.8 1.6-2.1.4-1.8.5-3.7 1-5.4.5-1.6 1.2-2.9 1.2-4.8 0-2.5-1.5-4.3-3.9-4.3-1.4 0-2.8.7-4.3 1.9z";

function Svg({ children, size = 24 }: { children: ReactNode; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
export function ToothIcon({ mark, size }: { mark?: "check" | "dot"; size?: number }) {
  return (
    <Svg size={size}>
      <path d={TOOTH} />
      {mark === "check" && <path d="M9.3 9.4l1.9 1.9 3.5-3.7" />}
      {mark === "dot" && <circle cx="12" cy="9.6" r="1.7" fill="currentColor" stroke="none" />}
    </Svg>
  );
}
function ImplantIcon() {
  return (
    <Svg>
      <path d="M8.2 3.6h7.6a2.2 2.2 0 0 1 2.2 2.3c-.1 2.3-1.500 4.300-3.400 4.300H9.400C7.500 10.200 6.100 8.200 6 5.900a2.200 2.200 0 0 1 2.200-2.300z" />
      <path d="M12 10.200v10.200M9.400 13.200h5.200M9.900 16.200h4.200M10.600 19.200h2.800" />
    </Svg>
  );
}

/** The mark of the practice: a smile with a gleam. */
export function Mark() {
  return (
    <svg className="h-mark" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
      <rect width="40" height="40" rx="14" fill="currentColor" />
      <path d="M11.500 18.500c2.200 7 14.800 7 17 0" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="28.500" cy="11.500" r="2.600" fill="#ff8a70" />
    </svg>
  );
}

/** The one call to action, everywhere the same shape. */
export function Cta({ href = "#afspraak", children, kind = "main", onClick }: { href?: string; children: ReactNode; kind?: "main" | "light" | "coral"; onClick?: () => void }) {
  return (
    <a href={href} className={`h-btn h-btn-${kind}`} onClick={onClick}>
      <span>{children}</span>
      <i aria-hidden="true">
        <ArrowRight size={18} strokeWidth={2.2} />
      </i>
    </a>
  );
}

const LINKS = [
  ["#behandelingen", "Behandelingen"],
  ["#eerste-bezoek", "Eerste bezoek"],
  ["#team", "Team"],
  ["#praktijk", "Praktijk"],
  ["#tarieven", "Tarieven"],
  ["#ervaringen", "Ervaringen"],
] as const;

/** Header: a floating pill. On a phone it opens a mint sheet that grows out of the button. */
export function Nav() {
  const m = useMenu();
  return (
    <>
      <header className={`h-nav${m.open ? " is-open" : ""}`}>
        <a href="#top" className="h-logo" aria-label="Tandartspraktijk Helder, naar boven" onClick={m.close}>
          <Mark />
          <span>
            Helder<small>tandartspraktijk</small>
          </span>
        </a>
        <nav aria-label="Hoofdmenu" className="h-links">
          {LINKS.slice(0, 5).map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a href={TEL_HREF} className="h-nav-tel">
          <Phone size={17} strokeWidth={1.9} aria-hidden="true" />
          {TEL}
        </a>
        <a href="#afspraak" className="h-nav-cta" onClick={m.close}>
          Afspraak <span>maken</span>
        </a>
        <button type="button" className="h-burger" aria-expanded={m.open} aria-controls="h-menu" aria-label={m.open ? "Sluit het menu" : "Open het menu"} onClick={m.toggle}>
          <i aria-hidden="true" />
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="h-menu" className={`h-menu${m.open ? " is-open" : ""}`} inert={!m.open}>
        <nav aria-label="Menu">
          {LINKS.map(([href, label], i) => (
            <a key={href} href={href} onClick={m.close} style={{ ["--i" as string]: i }}>
              {label}
              <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
            </a>
          ))}
          <a href="#angst" onClick={m.close} className="h-menu-soft" style={{ ["--i" as string]: LINKS.length }}>
            Bang voor de tandarts?
            <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
          </a>
        </nav>
        <div className="h-menu-foot">
          <Cta onClick={m.close}>Afspraak maken</Cta>
          <a href={TEL_HREF} className="h-btn h-btn-ghost">
            <Phone size={18} strokeWidth={1.9} aria-hidden="true" />
            Bel {TEL}
          </a>
          <p>Ma t/m vr vanaf 8.00 uur · di en do tot 20.00 uur</p>
        </div>
      </div>
    </>
  );
}

/* ── Treatments ── */
type Treatment = { key: string; name: string; short: string; time: string; price: string; icon: ReactNode; what: string; long: string; pain: string };
const TREATMENTS: Treatment[] = [
  {
    key: "controle",
    name: "Controle",
    short: "Twee keer per jaar even kijken",
    time: "20 minuten",
    price: "€ 28",
    icon: <ToothIcon mark="check" />,
    what: "We kijken je tanden, kiezen en tandvlees na en vragen hoe het thuis gaat. Zien we iets, dan laten we het zien in de spiegel of op het scherm.",
    long: "Ongeveer 20 minuten. Maken we er foto’s bij, dan een half uur.",
    pain: "Nee. Je voelt hooguit het haakje langs je tandvlees.",
  },
  {
    key: "reiniging",
    name: "Gebitsreiniging",
    short: "Tandsteen en aanslag weg",
    time: "30 tot 45 minuten",
    price: "€ 17 per 5 minuten",
    icon: <Sparkles {...ICON} />,
    what: "De mondhygiënist haalt tandsteen en aanslag weg, ook net onder de rand van het tandvlees, en polijst daarna. Je krijgt poetsadvies dat bij jouw gebit past.",
    long: "30 tot 45 minuten, afhankelijk van hoeveel tandsteen er zit.",
    pain: "Het kan gevoelig zijn, vooral bij ontstoken tandvlees. Zeg het gerust, dan verdoven we plaatselijk.",
  },
  {
    key: "vullingen",
    name: "Vullingen",
    short: "Een gaatje dichtmaken",
    time: "30 minuten",
    price: "vanaf € 58",
    icon: <ToothIcon mark="dot" />,
    what: "We verdoven de plek, halen het aangetaste stukje weg en vullen het met wit composiet in de kleur van je tand. Daarna slijpen we tot je beet weer goed voelt.",
    long: "Meestal 30 minuten per vulling.",
    pain: "De prik voel je even. Daarna voel je druk en trillen, geen pijn. De verdoving is na twee tot drie uur uitgewerkt.",
  },
  {
    key: "kronen",
    name: "Kronen en bruggen",
    short: "Een kapje of een overbrugging",
    time: "2 afspraken",
    price: "vanaf € 780",
    icon: <Crown {...ICON} />,
    what: "Een kroon is een kapje over een verzwakte kies. Een brug vult een open plek, met steun van de buren. We slijpen bij, maken een scan en plaatsen een noodkroon. Twee weken later zetten we de definitieve vast.",
    long: "Twee afspraken van ongeveer een uur, met twee weken ertussen.",
    pain: "Tijdens het slijpen ben je verdoofd. Een dag napijn rond het tandvlees komt voor.",
  },
  {
    key: "bleken",
    name: "Bleken",
    short: "Een paar tinten lichter",
    time: "2 weken thuis",
    price: "€ 295",
    icon: <Sun {...ICON} />,
    what: "We kijken eerst of je gebit gezond genoeg is. Dan maken we lepels op maat. Thuis draag je ze met een milde gel, een paar uur per dag. Vullingen en kronen kleuren niet mee, dat zeggen we er eerlijk bij.",
    long: "Twee korte afspraken en ongeveer twee weken thuis bleken.",
    pain: "Je tanden kunnen tijdelijk gevoelig zijn voor koud. Dat trekt meestal binnen een paar dagen weg.",
  },
  {
    key: "aligners",
    name: "Beugels of aligners",
    short: "Rechte tanden, ook als volwassene",
    time: "6 tot 18 maanden",
    price: "vanaf € 1.900",
    icon: <Smile {...ICON} />,
    what: "Met een scan zie je vooraf hoe je tanden kunnen komen te staan. Daarna kies je: doorzichtige aligners of een vaste beugel. Elke zes tot acht weken kijken we of alles op schema ligt.",
    long: "Gemiddeld 6 tot 18 maanden, afhankelijk van hoeveel er moet verschuiven.",
    pain: "De eerste dagen na een nieuwe stap voelen je tanden strak en gevoelig. Dat hoort erbij en zakt af.",
  },
  {
    key: "implantaten",
    name: "Implantaten",
    short: "Een vaste vervanger voor een tand",
    time: "3 tot 6 maanden",
    price: "vanaf € 2.250",
    icon: <ImplantIcon />,
    what: "Een implantaat is een kunstwortel in de kaak, met daarop een kroon. Eerst maken we foto’s en bespreken we of het bij jou kan. Na het plaatsen groeit het implantaat een paar maanden vast.",
    long: "Het plaatsen duurt ongeveer een uur. Het hele traject drie tot zes maanden.",
    pain: "Je bent plaatselijk verdoofd. Reken daarna op een paar dagen zwelling en napijn. We bespreken vooraf wat je daartegen kunt doen.",
  },
  {
    key: "kinderen",
    name: "Kindertandheelkunde",
    short: "Wennen vanaf de eerste tand",
    time: "15 minuten",
    price: "tot 18 jaar meestal vergoed",
    icon: <Baby {...ICON} />,
    what: "Kinderen mogen eerst meekijken, met de stoel omhoog en omlaag en zelf de spiegel vasthouden. We tellen tandjes, geven poetsles en lakken kiezen als dat helpt tegen gaatjes.",
    long: "Een kwartier is meestal genoeg. Korter als het spannend is.",
    pain: "Een controle doet geen pijn. Moet er iets gebeuren, dan leggen we elke stap uit en gaan we niet sneller dan je kind aankan.",
  },
  {
    key: "angst",
    name: "Angstbegeleiding",
    short: "Stap voor stap, in jouw tempo",
    time: "zo lang als nodig",
    price: "eerste gesprek kosteloos",
    icon: <HandHeart {...ICON} />,
    what: "We beginnen met een gesprek, zonder instrumenten. Samen spreken we af wat wel en niet gebeurt, en een stopteken. Daarna bouwen we rustig op, afspraak voor afspraak.",
    long: "De eerste afspraak duurt 30 minuten en is alleen praten. Daarna plannen we ruim.",
    pain: "We kunnen niet beloven dat je niets voelt. Wel dat je altijd weet wat er komt, en dat we stoppen als jij dat aangeeft.",
  },
];

/** Nine tiles; the chosen one opens a panel under its own row, in plain language. */
export function Treatments() {
  const [open, setOpen] = useState<number | null>(0);
  const toggle = (i: number, el: HTMLElement) => {
    setOpen((o) => (o === i ? null : i));
    // On a phone the panel above may close and move this tile: keep it in sight.
    requestAnimationFrame(() => requestAnimationFrame(() => el.scrollIntoView({ block: "nearest", behavior: "smooth" })));
  };
  return (
    <div className="h-treat-grid" data-rv="kids">
      {TREATMENTS.map((t, i) => {
        const on = open === i;
        return (
          <Fragment key={t.key}>
            <h3 className="h-treat">
              <button type="button" id={`h-treat-b-${t.key}`} aria-expanded={on} aria-controls={`h-treat-p-${t.key}`} onClick={(e) => toggle(i, e.currentTarget)}>
                <span className="h-ic">{t.icon}</span>
                <span className="h-treat-t">
                  <b>{t.name}</b>
                  <small>{t.short}</small>
                </span>
                <span className="h-plus" aria-hidden="true">
                  <Plus size={18} strokeWidth={2.2} />
                </span>
              </button>
            </h3>
            <div className="h-treat-panel" id={`h-treat-p-${t.key}`} hidden={!on} style={{ ["--c3" as string]: i % 3, ["--c2" as string]: i % 2 }}>
              <div className="h-qa">
                <div>
                  <h4>Wat gebeurt er?</h4>
                  <p>{t.what}</p>
                </div>
                <div>
                  <h4>Hoe lang duurt het?</h4>
                  <p>{t.long}</p>
                </div>
                <div>
                  <h4>Doet het pijn?</h4>
                  <p>{t.pain}</p>
                </div>
              </div>
              <div className="h-treat-foot">
                <span className="h-chip">
                  <Clock size={16} strokeWidth={1.9} aria-hidden="true" />
                  {t.time}
                </span>
                <a href="#tarieven" className="h-chip h-chip-link">
                  Voorbeeldprijs: {t.price}
                </a>
                <Cta>Afspraak maken</Cta>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

/* ── First visit ── */
const STEPS: { short: string; title: string; time: string; text: string; points: string[]; img: keyof typeof I; alt: string }[] = [
  {
    short: "Afspraak",
    title: "Je belt of plant online",
    time: "5 minuten",
    text: "Marieke of Dewi neemt op. Ze vragen waar je voor komt en of je ergens tegenop ziet. Dat laatste noteren we, zodat je het niet twee keer hoeft te vertellen.",
    points: ["Meestal binnen twee weken een plek", "Bij pijn proberen we je dezelfde dag te zien"],
    img: "smile",
    alt: "Een vrouw met krullen die breed lacht",
  },
  {
    short: "Welkom",
    title: "Je komt rustig binnen",
    time: "10 minuten",
    text: "Kom tien minuten eerder. Aan de balie loop je samen de gezondheidsvragen door: medicijnen, allergieën en eerdere ervaringen. Koffie en thee staan klaar.",
    points: ["Neem je identiteitsbewijs mee", "Een medicijnlijst bij de hand is handig"],
    img: "reception",
    alt: "De lichte ontvangstbalie van de praktijk",
  },
  {
    short: "Gesprek",
    title: "Eerst praten, dan kijken",
    time: "15 minuten",
    text: "Je tandarts stelt zich voor en vraagt wat jij belangrijk vindt. Pas daarna gaat de stoel naar achteren. We kijken alles na en vertellen hardop wat we zien.",
    points: ["Je krijgt een spiegel als je wilt meekijken", "Stoppen kan altijd: steek je hand op"],
    img: "chair",
    alt: "Een behandelkamer met een oranje behandelstoel en veel daglicht",
  },
  {
    short: "Foto’s",
    title: "Foto’s, alleen als het iets toevoegt",
    time: "5 minuten",
    text: "Soms zie je met het blote oog niet genoeg. Dan maken we een paar kleine röntgenfoto’s. Je kijkt mee op het scherm en we wijzen aan wat je ziet.",
    points: ["We vragen altijd eerst of het goed is", "Zwanger? Laat het weten, dan overleggen we eerst"],
    img: "xray",
    alt: "Een tandarts wijst iets aan op röntgenfoto’s van een gebit",
  },
  {
    short: "Plan",
    title: "Je gaat naar huis met een helder plan",
    time: "10 minuten",
    text: "Is alles goed, dan zien we je over een half jaar. Is er iets nodig, dan krijg je de opties op een rij, met wat het kost en hoe lang het duurt. Jij beslist, en dat hoeft niet vandaag.",
    points: ["Begroting vooraf bij alles boven € 250", "Je plan staat dezelfde dag in je mail"],
    img: "scan",
    alt: "Een hand in een blauwe handschoen wijst naar een gebitsscan op een scherm",
  },
];

/** The first visit as five steps: click a step, use the arrow keys, or Vorige and Volgende. */
export function Visit() {
  const [at, setAt] = useState(0);
  const last = STEPS.length - 1;
  const step = STEPS[at];
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const to = e.key === "ArrowRight" ? Math.min(last, at + 1) : e.key === "ArrowLeft" ? Math.max(0, at - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (to < 0) return;
    e.preventDefault();
    setAt(to);
    e.currentTarget.querySelector<HTMLElement>(`#h-step-${to}`)?.focus();
  };
  return (
    <div className="h-visit-box" data-rv>
      <div className="h-steps" role="tablist" aria-label="De stappen van je eerste bezoek" onKeyDown={onKey} style={{ ["--at" as string]: at / last }}>
        <span className="h-steps-line" aria-hidden="true">
          <i />
        </span>
        {STEPS.map((s, i) => (
          <button key={s.short} type="button" role="tab" id={`h-step-${i}`} aria-selected={i === at} aria-controls="h-step-panel" tabIndex={i === at ? 0 : -1} className={i < at ? "is-done" : undefined} onClick={() => setAt(i)}>
            <span className="h-step-n">{i < at ? <Check size={18} strokeWidth={2.4} aria-hidden="true" /> : i + 1}</span>
            <span className="h-step-l">{s.short}</span>
          </button>
        ))}
      </div>
      <div id="h-step-panel" role="tabpanel" aria-labelledby={`h-step-${at}`} className="h-step-panel">
        <div className="h-step-photo">
          {STEPS.map((s, i) => (
            <Pic key={s.short} img={I[s.img]} alt={s.alt} sizes="(min-width: 980px) 42vw, 92vw" className={i === at ? "is-on" : undefined} />
          ))}
        </div>
        <div className="h-step-copy">
          <div key={at} className="h-step-text">
            <p className="h-step-count">
              Stap {at + 1} van {STEPS.length}
              <span>
                <Clock size={15} strokeWidth={1.9} aria-hidden="true" />
                {step.time}
              </span>
            </p>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <ul>
              {step.points.map((p) => (
                <li key={p}>
                  <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-step-nav">
            <button type="button" className="h-round" onClick={() => setAt(at - 1)} disabled={at === 0} aria-label="Vorige stap">
              <ArrowLeft size={20} strokeWidth={2} aria-hidden="true" />
              <span>Vorige</span>
            </button>
            {at < last ? (
              <button type="button" className="h-btn h-btn-coral" onClick={() => setAt(at + 1)}>
                <span>Volgende: {STEPS[at + 1].short.toLowerCase()}</span>
                <i aria-hidden="true">
                  <ArrowRight size={18} strokeWidth={2.2} />
                </i>
              </button>
            ) : (
              <Cta kind="coral">Plan je eerste bezoek</Cta>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Fees ── */
const CATS = [
  ["top", "Veelgevraagd"],
  ["all", "Alles"],
  ["preventie", "Controle en preventie"],
  ["vullingen", "Vullingen"],
  ["kronen", "Kronen en bruggen"],
  ["cosmetisch", "Bleken en beugels"],
  ["implantaten", "Implantaten"],
  ["kinderen", "Kinderen"],
] as const;
type Cat = (typeof CATS)[number][0];
const FEES: { cat: Exclude<Cat, "top" | "all">; name: string; note: string; price: string; top?: boolean }[] = [
  { cat: "preventie", name: "Periodieke controle", note: "Twee keer per jaar", price: "€ 28", top: true },
  { cat: "preventie", name: "Intake nieuwe patiënt", note: "Uitgebreid eerste onderzoek", price: "€ 56", top: true },
  { cat: "preventie", name: "Kleine röntgenfoto", note: "Per foto", price: "€ 20" },
  { cat: "preventie", name: "Gebitsreiniging", note: "Per 5 minuten, gemiddeld een half uur", price: "€ 17", top: true },
  { cat: "preventie", name: "Verdoving", note: "Per prik", price: "€ 18" },
  { cat: "preventie", name: "Spoedconsult", note: "Onderzoek bij pijn of een ongelukje", price: "€ 28", top: true },
  { cat: "preventie", name: "Kennismaking bij angst", note: "Een half uur praten, zonder behandeling", price: "Kosteloos" },
  { cat: "vullingen", name: "Vulling, één vlak", note: "Wit composiet", price: "€ 58", top: true },
  { cat: "vullingen", name: "Vulling, twee vlakken", note: "Wit composiet", price: "€ 78" },
  { cat: "vullingen", name: "Vulling, drie vlakken", note: "Wit composiet", price: "€ 92" },
  { cat: "vullingen", name: "Wortelkanaalbehandeling", note: "Per kanaal", price: "vanaf € 135" },
  { cat: "vullingen", name: "Tand of kies trekken", note: "Exclusief verdoving", price: "€ 54" },
  { cat: "kronen", name: "Kroon van porselein", note: "Inclusief techniekkosten", price: "vanaf € 780", top: true },
  { cat: "kronen", name: "Brug, drie delen", note: "Inclusief techniekkosten", price: "vanaf € 1.950" },
  { cat: "kronen", name: "Opbeetplaat tegen knarsen", note: "Op maat gemaakt", price: "vanaf € 240" },
  { cat: "cosmetisch", name: "Bleken met lepels op maat", note: "Boven- en onderkaak", price: "€ 295", top: true },
  { cat: "cosmetisch", name: "Aligners, lichte correctie", note: "Volledig traject", price: "vanaf € 1.900" },
  { cat: "cosmetisch", name: "Vaste beugel", note: "Volledig traject", price: "vanaf € 2.600" },
  { cat: "cosmetisch", name: "Spalkje achter de tanden", note: "Per kaak", price: "€ 140" },
  { cat: "implantaten", name: "Onderzoek en plan implantaat", note: "Met foto’s en begroting", price: "€ 120" },
  { cat: "implantaten", name: "Implantaat met kroon", note: "Per tand, inclusief techniekkosten", price: "vanaf € 2.250" },
  { cat: "kinderen", name: "Controle tot 18 jaar", note: "Meestal vergoed uit de basisverzekering", price: "€ 28" },
  { cat: "kinderen", name: "Fluoridebehandeling", note: "Per keer", price: "€ 18" },
  { cat: "kinderen", name: "Kies sealen", note: "Per kies", price: "€ 31" },
];
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Example prices: search by word or pick a category. */
export function Fees() {
  const [cat, setCat] = useState<Cat>("top");
  const [q, setQ] = useState("");
  const needle = norm(q.trim());
  const label = (c: string) => CATS.find(([k]) => k === c)?.[1] ?? "";
  const rows = FEES.filter((f) => (cat === "all" ? true : cat === "top" ? f.top : f.cat === cat)).filter((f) => !needle || norm(`${f.name} ${f.note} ${label(f.cat)}`).includes(needle));
  return (
    <div className="h-fees">
      <p className="h-fees-demo">
        <b>Voorbeeldprijzen.</b> Dit is een demo-ontwerp: de bedragen zijn verzonnen en geen echte tarieven.
      </p>
      <label className="h-search">
        <span>Zoek een behandeling</span>
        <Search size={20} strokeWidth={1.9} aria-hidden="true" />
        <input
          type="search"
          name="q"
          value={q}
          placeholder="Bijv. vulling of kroon"
          autoComplete="off"
          onChange={(e) => {
            setQ(e.target.value);
            if (e.target.value && cat === "top") setCat("all");
          }}
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label="Wis de zoekopdracht">
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        )}
      </label>
      <div className="h-cats" role="group" aria-label="Categorie">
        {CATS.map(([k, l]) => (
          <button key={k} type="button" aria-pressed={cat === k} onClick={() => setCat(k)}>
            {l}
          </button>
        ))}
      </div>
      <p className="h-fees-count" role="status" aria-live="polite">
        {rows.length === 0 ? "Geen behandelingen gevonden" : `${rows.length} ${rows.length === 1 ? "behandeling" : "behandelingen"}`}
        {needle ? ` voor “${q.trim()}”` : ""}
      </p>
      {rows.length > 0 ? (
        <ul className="h-fee-list" key={`${cat}-${needle}`}>
          {rows.map((f, i) => (
            <li key={f.name} style={{ ["--i" as string]: Math.min(i, 10) }}>
              <div>
                <b>{f.name}</b>
                <span>{f.note}</span>
              </div>
              <strong>{f.price}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-fees-empty">
          <p>Staat het er niet tussen? Bel {TEL}, dan zoeken we het voor je uit en krijg je een begroting op maat.</p>
          <button
            type="button"
            className="h-chip h-chip-link"
            onClick={() => {
              setQ("");
              setCat("all");
            }}
          >
            Toon alle behandelingen
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Appointment ── */
const REASONS = [
  { key: "controle", label: "Controle", verb: "Controle aanvragen", done: "een controle" },
  { key: "pijn", label: "Pijnklacht", verb: "Pijnklacht melden", done: "een afspraak voor je pijnklacht" },
  { key: "nieuw", label: "Nieuwe patiënt", verb: "Inschrijven als patiënt", done: "je inschrijving en een eerste afspraak" },
  { key: "anders", label: "Anders", verb: "Afspraak aanvragen", done: "een afspraak" },
] as const;
const PARTS = [
  { key: "ochtend", label: "Ochtend", time: "8.00 – 12.00", icon: <Sunrise {...ICON} aria-hidden="true" /> },
  { key: "middag", label: "Middag", time: "12.00 – 17.30", icon: <Sun {...ICON} aria-hidden="true" /> },
  { key: "avond", label: "Avond", time: "di en do tot 20.00", icon: <Moon {...ICON} aria-hidden="true" /> },
] as const;

/** Appointment request. The button says what you are about to ask for. Nothing is sent. */
export function Booking() {
  const [reason, setReason] = useState(0);
  const [part, setPart] = useState(0);
  const r = REASONS[reason];
  const p = PARTS[part];
  return (
    <DemoForm className="h-form" done={`Zo zou het werken: ${r.done}, bij voorkeur in de ${p.key}. We zouden je binnen één werkdag terugbellen. Dit is een demo-ontwerp van HOPI, er is niets verzonden.`}>
      <fieldset>
        <legend>Waar kom je voor?</legend>
        <div className="h-chips">
          {REASONS.map((x, i) => (
            <button key={x.key} type="button" aria-pressed={reason === i} onClick={() => setReason(i)}>
              {x.label}
            </button>
          ))}
        </div>
        {r.key === "pijn" && (
          <p className="h-form-hint">
            Veel pijn of een zwelling? Bel dan liever direct: <a href={TEL_HREF}>{TEL}</a>. We proberen je dezelfde dag te zien.
          </p>
        )}
        {r.key === "nieuw" && <p className="h-form-hint">Welkom. Je eerste afspraak is een intake van drie kwartier, zodat er tijd is om kennis te maken.</p>}
      </fieldset>
      <fieldset>
        <legend>Welk dagdeel past het best?</legend>
        <div className="h-parts">
          {PARTS.map((x, i) => (
            <button key={x.key} type="button" aria-pressed={part === i} onClick={() => setPart(i)}>
              {x.icon}
              <b>{x.label}</b>
              <small>{x.time}</small>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="h-fields">
        <label>
          <span>Naam</span>
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Telefoon</span>
          <input type="tel" name="phone" autoComplete="tel" required />
        </label>
        <label className="h-field-wide">
          <span>E-mail</span>
          <input type="email" name="email" autoComplete="email" />
        </label>
        <label className="h-field-wide">
          <span>Wil je nog iets kwijt?</span>
          <textarea name="note" rows={3} placeholder="Bijvoorbeeld: gevoelige kies linksonder, of liever in de ochtend voor school." />
        </label>
      </div>
      <label className="h-check">
        <input type="checkbox" name="anxious" />
        <span>Ik vind de tandarts spannend. Houd daar rekening mee.</span>
      </label>
      <button type="submit" className="h-btn h-btn-main h-submit">
        <span>
          {r.verb}
          <small>voorkeur: in de {p.key}</small>
        </span>
        <i aria-hidden="true">
          <ArrowRight size={18} strokeWidth={2.2} />
        </i>
      </button>
    </DemoForm>
  );
}
