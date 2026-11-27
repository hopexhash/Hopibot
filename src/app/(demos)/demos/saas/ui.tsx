"use client";

import { Children, useEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { ArrowRight, Bell, CalendarRange, Check, ChevronDown, ClipboardCheck, Clock, Home, ListChecks, Minus, Navigation, Plus, ReceiptText, RotateCcw, Smartphone, User, Zap } from "lucide-react";
import { DemoForm, useMenu } from "@/demos/kit";

const LINKS = [
  ["#functies", "Functies"],
  ["#product", "Product"],
  ["#koppelingen", "Koppelingen"],
  ["#prijzen", "Prijzen"],
  ["#klanten", "Klanten"],
  ["#vragen", "Vragen"],
] as const;

/** The mark: three job blocks that have slid into place. */
export function Mark() {
  return (
    <svg className="w-mark" viewBox="0 0 28 28" aria-hidden="true">
      <rect x="2" y="3" width="15" height="6" rx="2" />
      <rect x="9" y="11" width="17" height="6" rx="2" />
      <rect x="4" y="19" width="11" height="6" rx="2" />
    </svg>
  );
}

/** Header: a floating glass bar. On small screens the links move to a full-screen panel. */
export function Nav() {
  const m = useMenu();
  return (
    <>
      <header className="w-nav">
        <div className="w-nav-in">
          <a href="#top" className="w-logo" aria-label="Veldwerk, naar boven" onClick={m.close}>
            <Mark />
            veldwerk
          </a>
          <nav aria-label="Hoofdmenu" className="w-links">
            {LINKS.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#proef" className="w-btn w-btn-lime w-nav-cta">
            Start gratis proef
          </a>
          <button type="button" className="w-burger" aria-expanded={m.open} aria-controls="w-menu" aria-label={m.open ? "Sluit het menu" : "Open het menu"} onClick={m.toggle}>
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="w-menu" className={`w-menu${m.open ? " is-open" : ""}`} inert={!m.open}>
        <nav aria-label="Menu">
          {LINKS.map(([href, label], i) => (
            <a key={href} href={href} onClick={m.close} style={{ ["--i" as string]: i }}>
              <small>0{i + 1}</small>
              {label}
              <ArrowRight aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="w-menu-foot">
          <a href="#proef" className="w-btn w-btn-lime" onClick={m.close}>
            Start 14 dagen gratis
          </a>
          <p>
            <i aria-hidden="true" /> Support bereikbaar op werkdagen van 08.00 tot 17.30 uur
            <br />
            030 000 00 00 · hallo@veldwerk.example
          </p>
        </div>
      </div>
    </>
  );
}

/** A card whose hairline lights up under the pointer. */
export function Spot({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${Math.round(e.clientX - r.left)}px`);
    e.currentTarget.style.setProperty("--my", `${Math.round(e.clientY - r.top)}px`);
  };
  return (
    <div className={`w-card w-spot${className ? ` ${className}` : ""}`} onPointerMove={move} {...rest}>
      {children}
    </div>
  );
}

/* ── The opening: a planning board that plays out one small story ── */

type State = "plan" | "way" | "busy" | "done";
type Job = { id: string; t: string; p: string; s: number; d: number; r: number; tone: "v" | "c" | "a" | "p"; st: State };
const LABEL: Record<State, string> = { plan: "Gepland", way: "Onderweg", busy: "Bezig", done: "Afgerond" };
const HOURS = ["08", "09", "10", "11", "12", "13", "14", "15", "16"];
const TECHS = [
  { n: "Daan", role: "Bus 1 · sanitair" },
  { n: "Mila", role: "Bus 2 · warmtepomp" },
  { n: "Sem", role: "Bus 3 · elektra" },
  { n: "Yara", role: "Bus 4 · duurzaam" },
];
// s = start in hours after 08:00, d = duration in hours, r = technician
const JOBS: Job[] = [
  { id: "a1", t: "CV-onderhoud", p: "De Bilt", s: 0, d: 1.5, r: 0, tone: "v", st: "done" },
  { id: "a2", t: "Lekkage badkamer", p: "Zeist", s: 2, d: 2, r: 0, tone: "p", st: "busy" },
  { id: "a3", t: "Radiatoren inregelen", p: "Bunnik", s: 5, d: 2.5, r: 0, tone: "c", st: "plan" },
  { id: "b1", t: "Storing warmtepomp", p: "Nieuwegein", s: 0.5, d: 2, r: 1, tone: "p", st: "done" },
  { id: "b2", t: "Thermostaat", p: "Houten", s: 3, d: 1, r: 1, tone: "c", st: "way" },
  { id: "b3", t: "Radiator vervangen", p: "IJsselstein", s: 7.5, d: 1.5, r: 1, tone: "c", st: "plan" },
  { id: "c1", t: "Jaarlijks onderhoud", p: "Maarssen", s: 0, d: 2, r: 2, tone: "v", st: "done" },
  { id: "c2", t: "Airco service", p: "Vleuten", s: 2.5, d: 1.5, r: 2, tone: "v", st: "busy" },
  { id: "c3", t: "Meterkast uitbreiden", p: "De Meern", s: 5, d: 2, r: 2, tone: "c", st: "plan" },
  { id: "c4", t: "Ketelbeurt", p: "Woerden", s: 7.5, d: 1, r: 2, tone: "a", st: "plan" },
  { id: "d1", t: "Zonneboiler controle", p: "Houten", s: 1, d: 2.5, r: 3, tone: "a", st: "busy" },
  { id: "d2", t: "Offerte", p: "Odijk", s: 5.5, d: 1, r: 3, tone: "v", st: "plan" },
  { id: "d3", t: "Lekdetectie", p: "Vianen", s: 7, d: 2, r: 3, tone: "p", st: "plan" },
];
const LOG = [
  "Planning van vandaag geladen · 12 klussen, 4 monteurs",
  "Spoed binnen: geen warm water in Leidsche Rijn",
  "Meterkast uitbreiden verplaatst van Sem naar Mila",
  "Spoedklus ingepland bij Sem om 13.00 uur",
  "Lekkage badkamer afgerond · werkbon getekend",
  "Factuur F-0412 verstuurd naar de klant",
];
const AT = [2400, 4300, 6000, 8000, 9800];

export function Stage({ children }: { children?: ReactNode }) {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = AT.map((ms, i) => window.setTimeout(() => setStep(i + 1), still ? 0 : ms));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [run]);
  const replay = () => {
    setStep(0);
    setRun((r) => r + 1);
  };
  const moved = step >= 2;
  const signed = step >= 4;
  const total = step >= 3 ? 13 : 12;
  const busy = signed ? 3 : 4;
  const done = signed ? 4 : 3;

  return (
    <div className="w-stage">
      <p className="w-sr">
        Bewegend voorbeeld van het planbord van Veldwerk. Vier monteurs staan onder elkaar, de uren van 08.00 tot 17.00 uur ernaast. Er komt een spoedklus binnen, een klus verhuist van Sem naar Mila, de spoedklus krijgt een plek en een lekkage wordt afgerond, waarna de werkbon wordt getekend en de factuur wordt verstuurd.
      </p>
      <div className="w-board">
        <div className="w-board-top" aria-hidden="true">
          <div className="w-board-title">
            <b>Planbord</b>
            <span>Dinsdag 18 november</span>
          </div>
          <div className="w-seg">
            <span data-on="">Dag</span>
            <span>Week</span>
            <span>Kaart</span>
          </div>
          <dl className="w-board-stats">
            <div>
              <dt>Klussen</dt>
              <dd key={total}>{total}</dd>
            </div>
            <div>
              <dt>Bezig</dt>
              <dd key={busy}>{busy}</dd>
            </div>
            <div data-lime="">
              <dt>Afgerond</dt>
              <dd key={done}>{done}</dd>
            </div>
          </dl>
        </div>

        <div className="w-grid" aria-hidden="true" key={run}>
          <div className="w-corner">
            <Clock />
            <span>10:50</span>
          </div>
          <div className="w-hours">
            {HOURS.map((h) => (
              <span key={h}>
                {h}
                <i>:00</i>
              </span>
            ))}
          </div>
          <div className="w-techs">
            {TECHS.map((t, i) => (
              <div key={t.n} data-k={i}>
                <i>{t.n[0]}</i>
                <p>
                  <b>{t.n}</b>
                  <span>{t.role}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="w-track">
            <i className="w-lunch" />
            <i className="w-now" />
            {JOBS.map((j, i) => {
              const hop = j.id === "c3" && moved;
              const st: State = j.id === "a2" && signed ? "done" : j.st;
              return (
                <div
                  key={j.id}
                  className={`w-job${j.d <= 1 ? " is-short" : ""}${j.r === 3 ? " is-wide" : ""}`}
                  data-tone={j.tone}
                  data-st={st}
                  data-hop={hop ? "" : undefined}
                  style={{ ["--s" as string]: j.s, ["--d" as string]: j.d, ["--r" as string]: hop ? 1 : j.r, ["--i" as string]: i }}
                >
                  <b>{j.t}</b>
                  <span key={st}>
                    <i />
                    {LABEL[st]}
                    <em> · {j.p}</em>
                  </span>
                </div>
              );
            })}
            {step >= 3 && (
              <div className="w-job w-job-rush" data-tone="r" data-st="plan" style={{ ["--s" as string]: 5, ["--d" as string]: 1.5, ["--r" as string]: 2 }}>
                <b>Geen warm water</b>
                <span>
                  <Zap />
                  Spoed
                  <em> · Leidsche Rijn</em>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="w-board-foot">
          <p className="w-log" data-alert={step === 1 ? "" : undefined}>
            <i aria-hidden="true" />
            <span key={step}>{LOG[step]}</span>
          </p>
          <button type="button" className="w-replay" onClick={replay}>
            <RotateCcw aria-hidden="true" />
            Speel opnieuw af
          </button>
        </div>
      </div>

      <div className="w-under">
        {/* The work order of the job that gets finished */}
        <div className="w-card w-wo" aria-hidden="true" data-signed={signed ? "" : undefined}>
          <div className="w-wo-top">
            <span>Werkbon WB-2418</span>
            <em key={signed ? "s" : "b"}>{signed ? "Getekend" : "Bezig"}</em>
          </div>
          <b className="w-wo-title">Lekkage badkamer</b>
          <p className="w-wo-meta">Daan · Zeist · gestart 10:04</p>
          <ul className="w-wo-list">
            <li data-on="">
              <Check /> Lek opgespoord onder de douchebak
            </li>
            <li data-on="">
              <Check /> Sifon en afvoer vervangen
            </li>
            <li data-on={signed ? "" : undefined}>
              <Check /> Afgekit en twintig minuten getest
            </li>
          </ul>
          <div className="w-wo-sign">
            <svg viewBox="0 0 170 46">
              <path d="M5 33c9-17 17-26 22-22 5 5-11 27-4 29 7 2 13-25 21-25 6 0 0 19 6 19s10-15 16-15 2 13 8 13 12-11 20-13 15 6 31 2 21-8 40-11" />
            </svg>
            <span>{signed ? "Getekend door de bewoner, 11:42" : "Wacht op handtekening van de klant"}</span>
          </div>
          <p className="w-wo-inv" data-on={step >= 5 ? "" : undefined}>
            <ReceiptText />
            <span>
              Factuur F-0412 {step >= 5 ? "verstuurd" : "staat klaar"}
            </span>
            <b>€ 186,50</b>
          </p>
        </div>

        {children}

        {/* What Mila sees in her pocket */}
        <div className="w-ph w-ph-hero" aria-hidden="true">
          <div className="w-ph-screen">
            <div className="w-ph-bar">
              <span>10:50</span>
              <i />
            </div>
            <p className="w-ph-hi">
              Hoi Mila
              <span key={moved ? 4 : 3}>{moved ? "4" : "3"} klussen vandaag</span>
            </p>
            <div className="w-ph-note" data-on={moved ? "" : undefined}>
              <Bell />
              <p key={moved ? "n" : "o"}>
                <b>{moved ? "Nieuwe klus om 13:00" : "Geen nieuwe meldingen"}</b>
                <span>{moved ? "Meterkast uitbreiden, De Meern" : "Je planning is bijgewerkt"}</span>
              </p>
            </div>
            <div className="w-ph-next">
              <small>Nu onderweg</small>
              <b>Thermostaat plaatsen</b>
              <span>Houten · aankomst 11:02</span>
              <em>
                <Navigation /> Navigeer · 12 min
              </em>
            </div>
            <ul className="w-ph-list">
              <li data-st="done">
                <time>08:30</time>
                <span>Storing warmtepomp</span>
                <Check />
              </li>
              <li data-st="way">
                <time>11:00</time>
                <span>Thermostaat plaatsen</span>
                <i />
              </li>
              {moved && (
                <li data-st="new">
                  <time>13:00</time>
                  <span>Meterkast uitbreiden</span>
                  <u>Nieuw</u>
                </li>
              )}
              <li>
                <time>15:30</time>
                <span>Radiator vervangen</span>
                <i />
              </li>
            </ul>
            <div className="w-ph-tabs">
              <Home />
              <ListChecks />
              <ClipboardCheck />
              <User />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Product demonstration: four tabs, each with its own built interface ── */

const TABS = [
  { key: "planning", label: "Planning", Icon: CalendarRange },
  { key: "werkbonnen", label: "Werkbonnen", Icon: ClipboardCheck },
  { key: "facturatie", label: "Facturatie", Icon: ReceiptText },
  { key: "app", label: "App voor monteurs", Icon: Smartphone },
];

export function ProductTabs({ children }: { children: ReactNode }) {
  const panels = Children.toArray(children);
  const [at, setAt] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const go = (i: number) => {
    const n = (i + TABS.length) % TABS.length;
    setAt(n);
    tabs.current[n]?.focus();
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") go(at + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(at - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(TABS.length - 1);
    else return;
    e.preventDefault();
  };
  return (
    <div className="w-demo">
      <div className="w-tabs" role="tablist" aria-label="Onderdelen van Veldwerk" onKeyDown={onKey} style={{ ["--at" as string]: at }}>
        {TABS.map((t, i) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`w-tab-${t.key}`}
            aria-selected={i === at}
            aria-controls={`w-pane-${t.key}`}
            tabIndex={i === at ? 0 : -1}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            onClick={() => setAt(i)}
          >
            <t.Icon aria-hidden="true" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
      {panels.map((panel, i) => (
        <div key={TABS[i].key} role="tabpanel" id={`w-pane-${TABS[i].key}`} aria-labelledby={`w-tab-${TABS[i].key}`} hidden={i !== at} tabIndex={0} className="w-pane">
          {panel}
        </div>
      ))}
    </div>
  );
}

/* ── Pricing: per technician, per month or per year ── */

const euro = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const PLANS = [
  {
    key: "start",
    name: "Start",
    who: "Voor de zzp'er en het kleine team dat van papier af wil.",
    m: 19,
    y: 16,
    max: 5,
    top: false,
    lead: "Dit zit erin",
    feats: ["Planbord per dag en per week", "Digitale werkbon met foto en handtekening", "App voor iPhone en Android", "Klanten en objecten importeren", "Support per e-mail"],
  },
  {
    key: "team",
    name: "Team",
    who: "Voor het installatiebedrijf dat ook wil factureren en routes wil plannen.",
    m: 29,
    y: 24,
    max: 40,
    top: true,
    lead: "Alles uit Start, plus",
    feats: ["Facturen en betaallinks vanuit de werkbon", "Koppeling met je boekhouding en agenda", "Routes met reistijd tussen de klussen", "Terugkerend onderhoud en contracten", "Support per telefoon"],
  },
  {
    key: "bedrijf",
    name: "Bedrijf",
    who: "Voor het servicebedrijf met voorraad, vestigingen en eigen wensen.",
    m: 42,
    y: 35,
    max: 40,
    top: false,
    lead: "Alles uit Team, plus",
    feats: ["Voorraad per bus en per magazijn", "Meerdere vestigingen en teams", "Eigen rapportages en exports", "Open API en webhooks", "Vast aanspreekpunt en inrichting op locatie"],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [seats, setSeats] = useState(5);
  const set = (n: number) => setSeats(Math.max(1, Math.min(40, n)));
  return (
    <div className="w-pricing">
      <div className="w-card w-price-ctrl" data-rv>
        <div className="w-seats">
          <label htmlFor="w-seats">Hoeveel monteurs gaan ermee werken?</label>
          <div className="w-seats-row">
            <button type="button" onClick={() => set(seats - 1)} disabled={seats <= 1} aria-label="Eén monteur minder">
              <Minus aria-hidden="true" />
            </button>
            <output htmlFor="w-seats" key={seats}>
              {seats}
              {seats === 40 ? "+" : ""}
            </output>
            <button type="button" onClick={() => set(seats + 1)} disabled={seats >= 40} aria-label="Eén monteur meer">
              <Plus aria-hidden="true" />
            </button>
            <input id="w-seats" type="range" min={1} max={40} step={1} value={seats} onChange={(e) => set(Number(e.target.value))} style={{ ["--f" as string]: `${((seats - 1) / 39) * 100}%` }} />
          </div>
          <p>{seats === 40 ? "Meer dan 40 monteurs? Bel 030 000 00 00 voor een prijs op maat." : "Planners en kantoor kijken gratis mee. Je betaalt alleen voor monteurs met de app."}</p>
        </div>
        <div className="w-period">
          <span id="w-period-l">Betalen</span>
          <div role="radiogroup" aria-labelledby="w-period-l" className="w-switch" data-y={yearly ? "" : undefined}>
            <button type="button" role="radio" aria-checked={!yearly} onClick={() => setYearly(false)}>
              Per maand
            </button>
            <button type="button" role="radio" aria-checked={yearly} onClick={() => setYearly(true)}>
              Per jaar <em>2 maanden gratis</em>
            </button>
          </div>
        </div>
      </div>

      <div className="w-plans">
        {PLANS.map((p, i) => {
          const off = seats > p.max;
          const per = yearly ? p.y : p.m;
          const month = per * seats;
          return (
            <Spot key={p.key} className={`w-plan${p.top ? " is-top" : ""}`} data-off={off ? "" : undefined} data-rv style={{ ["--i" as string]: i }}>
              {p.top && <p className="w-plan-flag">Meest gekozen</p>}
              <h3>{p.name}</h3>
              <p className="w-plan-who">{p.who}</p>
              {off ? (
                <div className="w-plan-price">
                  <p className="w-plan-off">
                    Start is er voor teams tot en met 5 monteurs. Met {seats} monteurs past Team beter.
                  </p>
                </div>
              ) : (
                <div className="w-plan-price">
                  <p className="w-plan-sum">
                    <span>€</span>
                    <b key={month}>{euro(month)}</b>
                    <small>per maand</small>
                  </p>
                  <p className="w-plan-calc">
                    {seats} {seats === 1 ? "monteur" : "monteurs"} × € {per}
                    {yearly ? ` · € ${euro(month * 12)} per jaar, je bespaart € ${euro((p.m - p.y) * seats * 12)}` : " · maandelijks opzegbaar"}
                  </p>
                </div>
              )}
              <a href="#proef" className={`w-btn ${p.top ? "w-btn-lime" : "w-btn-line"}`}>
                {off ? "Bekijk Team" : `Probeer ${p.name} 14 dagen`}
              </a>
              <p className="w-plan-lead">{p.lead}</p>
              <ul>
                {p.feats.map((f) => (
                  <li key={f}>
                    <Check aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </Spot>
          );
        })}
      </div>
      <p className="w-price-note" data-rv>
        Alle prijzen zijn exclusief btw. Inrichting, updates en het overzetten van je klanten zitten in elk pakket.
      </p>
    </div>
  );
}

/* ── Frequently asked questions ── */

const FAQ = [
  {
    q: "Hoe snel kunnen we ermee werken?",
    a: "De meeste bedrijven plannen op de eerste dag hun eerste klus. Je importeert klanten en objecten uit een spreadsheet, nodigt je monteurs uit met hun telefoonnummer en zet de werkweek op het bord. Loop je vast, dan kijkt iemand van support met je mee.",
  },
  {
    q: "Werkt de app ook zonder bereik, in een kelder of kruipruimte?",
    a: "Ja. Alles voor vandaag staat op de telefoon: adressen, dossiers, checklists en de werkbon. Foto's en handtekeningen worden bewaard en gaan vanzelf naar kantoor zodra er weer verbinding is.",
  },
  {
    q: "Kunnen we onze bestaande klanten, objecten en contracten meenemen?",
    a: "Ja. Je levert een export aan uit je oude pakket of uit een spreadsheet, wij zetten de kolommen goed en lezen alles in. Dat zit in elk pakket en kost niets extra.",
  },
  {
    q: "Met welke boekhouding werkt Veldwerk samen?",
    a: "Met de gangbare boekhoudpakketten in Nederland en België via een standaardkoppeling. Staat die van jou er niet tussen, dan exporteer je facturen als bestand of bouw je een eigen koppeling met de open API.",
  },
  {
    q: "Betalen we ook voor collega's op kantoor?",
    a: "Nee. Je betaalt per monteur die de app gebruikt. Planners, administratie en de eigenaar kijken en werken gratis mee, hoeveel het er ook zijn.",
  },
  {
    q: "Zitten we vast aan een contract?",
    a: "Bij betalen per maand zeg je op wanneer je wilt, tot de laatste dag van de maand. Kies je voor een jaar, dan krijg je twee maanden gratis en loopt het na dat jaar per maand door.",
  },
  {
    q: "Wat gebeurt er na de proefperiode van veertien dagen?",
    a: "Niets, tot je zelf een pakket kiest. Er wordt niets afgeschreven en je hoeft niets op te zeggen. Je gegevens blijven dertig dagen bewaard, zodat je verder kunt waar je gebleven was.",
  },
  {
    q: "Van wie zijn de gegevens die we invoeren?",
    a: "Van jullie. Je kunt klanten, werkbonnen en facturen op elk moment exporteren. Stop je met Veldwerk, dan krijg je alles mee in een bestand dat elk ander pakket kan lezen.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="w-faq">
      {FAQ.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className="w-faq-item" data-on={on ? "" : undefined} data-rv style={{ ["--i" as string]: Math.min(i, 5) }}>
            <h3>
              <button type="button" id={`w-faq-q${i}`} aria-expanded={on} aria-controls={`w-faq-a${i}`} onClick={() => setOpen(on ? -1 : i)}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                <span>{f.q}</span>
                <ChevronDown aria-hidden="true" />
              </button>
            </h3>
            <div id={`w-faq-a${i}`} role="region" aria-labelledby={`w-faq-q${i}`} hidden={!on}>
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Start a trial. Nothing is sent. ── */

export function Trial() {
  return (
    <DemoForm className="w-form" done="Zo zou het werken: je proefomgeving staat klaar en de inloglink komt per e-mail. Dit is een demo-ontwerp van HOPI, er is niets verzonden.">
      <label>
        <span>Bedrijfsnaam</span>
        <input type="text" name="company" autoComplete="organization" placeholder="Installatiebedrijf De Vries" required />
      </label>
      <div className="w-form-row">
        <label>
          <span>Aantal monteurs</span>
          <input type="number" name="seats" min={1} max={500} inputMode="numeric" placeholder="8" required />
        </label>
        <label>
          <span>E-mailadres</span>
          <input type="email" name="email" autoComplete="email" placeholder="naam@bedrijf.example" required />
        </label>
      </div>
      <button type="submit" className="w-btn w-btn-lime">
        Start mijn proefperiode
        <ArrowRight aria-hidden="true" />
      </button>
    </DemoForm>
  );
}
