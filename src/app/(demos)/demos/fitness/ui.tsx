"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { DemoForm, useMenu } from "@/demos/kit";
import { IMAGES } from "@/demos/images";
import { Pic } from "@/demos/pic";

const I = IMAGES.fitness;
const LINKS = [
  ["#programmas", "Programma's"],
  ["#rooster", "Rooster"],
  ["#coaches", "Coaches"],
  ["#lidmaatschap", "Lidmaatschap"],
  ["#club", "De club"],
  ["#resultaten", "Resultaten"],
] as const;

/** Header: bare over the opening, a black bar once the page moves. The phone menu is a green wall. */
export function Nav() {
  const m = useMenu();
  return (
    <>
      <header className={`f-nav${m.open ? " is-open" : ""}`}>
        <a href="#top" className="f-logo" aria-label="FORGE Performance Club, naar boven" onClick={m.close}>
          <i aria-hidden="true" />
          Forge
        </a>
        <nav aria-label="Hoofdmenu" className="f-links">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#proefles" className="f-btn f-nav-cta">
          Gratis proefles
        </a>
        <button type="button" className="f-burger" aria-expanded={m.open} aria-controls="f-menu" aria-label={m.open ? "Sluit het menu" : "Open het menu"} onClick={m.toggle}>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="f-menu" className={`f-menu${m.open ? " is-open" : ""}`} inert={!m.open}>
        <nav aria-label="Menu">
          {LINKS.map(([href, label], i) => (
            <a key={href} href={href} onClick={m.close} style={{ ["--i" as string]: i }}>
              <small>0{i + 1}</small>
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="f-menu-foot">
          <a href="#proefles" className="f-btn f-btn-dark" onClick={m.close}>
            Boek een gratis proefles <ArrowRight aria-hidden="true" size={18} strokeWidth={2.6} />
          </a>
          <p>
            Ma t/m vr 06.00 – 23.00 · za en zo 08.00 – 20.00
            <br />
            Strijp, Eindhoven · 040 000 00 00
          </p>
        </div>
      </div>
    </>
  );
}

/* ── Lesrooster ── */
type Lesson = [time: string, name: string, coach: string, level: 1 | 2 | 3, left: number];
const LEVELS = { 1: "Beginner", 2: "Alle niveaus", 3: "Gevorderd" } as const;
const MINUTES: Record<string, number> = { Strength: 60, "Strength basis": 60, Conditioning: 45, Mobility: 45, "Race prep": 75, "Race prep, lange sessie": 90, "Open training met coach": 90 };
const CAP = 12;
const DAYS: { key: string; short: string; full: string; lessons: Lesson[] }[] = [
  {
    key: "ma",
    short: "Ma",
    full: "Maandag",
    lessons: [
      ["06.30", "Strength", "Daan", 2, 4],
      ["09.00", "Mobility", "Yara", 1, 7],
      ["12.15", "Conditioning", "Noor", 2, 2],
      ["17.30", "Strength", "Daan", 3, 0],
      ["18.45", "Conditioning", "Noor", 2, 5],
      ["20.00", "Race prep", "Milan", 3, 3],
    ],
  },
  {
    key: "di",
    short: "Di",
    full: "Dinsdag",
    lessons: [
      ["06.30", "Conditioning", "Noor", 2, 6],
      ["09.00", "Strength basis", "Daan", 1, 8],
      ["12.15", "Mobility", "Yara", 1, 9],
      ["17.30", "Race prep", "Milan", 3, 1],
      ["18.45", "Strength", "Daan", 2, 0],
      ["20.00", "Mobility", "Yara", 1, 6],
    ],
  },
  {
    key: "wo",
    short: "Wo",
    full: "Woensdag",
    lessons: [
      ["06.30", "Strength", "Daan", 2, 3],
      ["09.00", "Conditioning", "Noor", 2, 8],
      ["12.15", "Strength", "Milan", 2, 5],
      ["17.30", "Conditioning", "Noor", 3, 2],
      ["18.45", "Strength basis", "Daan", 1, 4],
      ["20.00", "Race prep", "Milan", 3, 6],
    ],
  },
  {
    key: "do",
    short: "Do",
    full: "Donderdag",
    lessons: [
      ["06.30", "Conditioning", "Noor", 2, 7],
      ["09.00", "Mobility", "Yara", 1, 10],
      ["12.15", "Strength", "Daan", 2, 1],
      ["17.30", "Strength", "Daan", 3, 0],
      ["18.45", "Conditioning", "Noor", 2, 3],
      ["20.00", "Mobility", "Yara", 1, 8],
    ],
  },
  {
    key: "vr",
    short: "Vr",
    full: "Vrijdag",
    lessons: [
      ["06.30", "Strength", "Milan", 2, 5],
      ["09.00", "Strength basis", "Daan", 1, 6],
      ["12.15", "Conditioning", "Noor", 2, 4],
      ["16.30", "Race prep", "Milan", 3, 2],
      ["17.45", "Conditioning", "Noor", 2, 7],
    ],
  },
  {
    key: "za",
    short: "Za",
    full: "Zaterdag",
    lessons: [
      ["08.30", "Strength", "Daan", 2, 2],
      ["09.45", "Conditioning", "Noor", 2, 0],
      ["11.00", "Race prep, lange sessie", "Milan", 3, 4],
      ["12.30", "Mobility", "Yara", 1, 9],
    ],
  },
  {
    key: "zo",
    short: "Zo",
    full: "Zondag",
    lessons: [
      ["09.30", "Mobility", "Yara", 1, 11],
      ["10.45", "Strength basis", "Daan", 1, 5],
      ["12.00", "Open training met coach", "Milan", 2, 8],
    ],
  },
];

/** The week as seven tabs. Arrow keys move between days, as the tablist pattern asks. */
export function Schedule() {
  const [at, setAt] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const day = DAYS[at];
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = DAYS.length;
    const to = e.key === "ArrowRight" ? (at + 1) % n : e.key === "ArrowLeft" ? (at + n - 1) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    setAt(to);
    tabs.current[to]?.focus();
  };
  return (
    <div className="f-sched-box" data-rv>
      <div className="f-days" role="tablist" aria-label="Dag van de week" onKeyDown={onKey}>
        {DAYS.map((d, i) => (
          <button
            key={d.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`f-tab-${d.key}`}
            aria-selected={i === at}
            aria-controls="f-daypanel"
            aria-label={d.full}
            tabIndex={i === at ? 0 : -1}
            onClick={() => setAt(i)}
          >
            <b>{d.short}</b>
            <span>{d.lessons.length} lessen</span>
          </button>
        ))}
      </div>
      <div id="f-daypanel" role="tabpanel" aria-labelledby={`f-tab-${day.key}`} tabIndex={0} key={day.key} className="f-day">
        <p className="f-day-title">
          <b>{day.full}</b>
          <span>
            {day.lessons.length} lessen · {day.lessons.filter((l) => l[4] > 0).length} met plek
          </span>
        </p>
        <ol>
          {day.lessons.map(([time, name, coach, level, left], i) => (
            <li key={time} className={left === 0 ? "is-full" : undefined} style={{ ["--i" as string]: i }}>
              <p className="f-les-time">
                <b>{time}</b>
                <span>{MINUTES[name]} min</span>
              </p>
              <div className="f-les-what">
                <h3>{name}</h3>
                <p>met {coach}</p>
              </div>
              <p className="f-les-level" data-level={level}>
                <span aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                {LEVELS[level]}
              </p>
              <p className={`f-les-left${left > 0 && left <= 3 ? " is-low" : ""}`}>
                <span className="f-meter" aria-hidden="true">
                  <i style={{ ["--v" as string]: (CAP - left) / CAP }} />
                </span>
                {left === 0 ? "Vol, wachtlijst open" : left === 1 ? "Nog 1 plek" : `Nog ${left} plekken`}
              </p>
              <a href="#proefles" className="f-les-go" aria-label={left === 0 ? `Op de wachtlijst voor ${name} om ${time}` : `Proefles boeken bij ${name} om ${time}`}>
                <span>{left === 0 ? "Wachtlijst" : "Meetrainen"}</span>
                <ArrowUpRight aria-hidden="true" size={20} strokeWidth={2.4} />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ── Coaches ── */
const COACHES: { key: string; name: string; role: string; since: string; spec: string; line: string; img: keyof typeof I; alt: string }[] = [
  {
    key: "daan",
    name: "Daan",
    role: "Hoofdcoach kracht",
    since: "Coach sinds 2014",
    spec: "Squat, deadlift, bankdrukken",
    line: "Praat weinig, ziet alles. Zet je deadlift recht in drie sessies.",
    img: "coach-2",
    alt: "Coach Daan trekt een kabel aan in de trainingszaal",
  },
  {
    key: "noor",
    name: "Noor",
    role: "Conditioning",
    since: "Coach sinds 2018",
    spec: "Intervallen, slee en touwen",
    line: "Bouwt lessen waar je halverwege om vloekt en donderdag weer voor terugkomt.",
    img: "focus",
    alt: "Coach Noor, geconcentreerd tijdens een training met de touwen",
  },
  {
    key: "milan",
    name: "Milan",
    role: "Race prep en personal training",
    since: "Coach sinds 2016",
    spec: "Wedstrijdschema's en uithoudingsvermogen",
    line: "Liep zelf jaren wedstrijden en plant jouw seizoen week voor week terug vanaf de startdag.",
    img: "kettlebell",
    alt: "Coach Milan zwaait een kettlebell in de zaal",
  },
  {
    key: "yara",
    name: "Yara",
    role: "Mobility en techniek",
    since: "Coach sinds 2019",
    spec: "Heupen, schouders, houding onder de stang",
    line: "Vindt de stijve heup die jij al jaren negeert en geeft je er twee oefeningen voor mee.",
    img: "ropes-portrait",
    alt: "Coach Yara met een trainingstouw over haar schouder",
  },
];

/** Coach cards: the green panel comes up on hover, on keyboard focus and on tap. */
export function Coaches() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="f-coach-row">
      {COACHES.map((c, i) => {
        const on = open === c.key;
        return (
          <li key={c.key} className={`f-coach${on ? " is-open" : ""}`} style={{ ["--i" as string]: i }}>
            <span className="f-coach-pic">
              <Pic img={I[c.img]} alt={c.alt} sizes="(min-width: 900px) 24vw, 76vw" />
            </span>
            <span className="f-coach-n" aria-hidden="true">
              0{i + 1}
            </span>
            <div className="f-coach-foot">
              <h3 className="f-coach-name">
                <b>{c.name}</b>
                <small>{c.role}</small>
              </h3>
              <div className="f-coach-more" id={`f-coach-${c.key}`}>
                <p className="f-coach-spec">{c.spec}</p>
                <p className="f-coach-line">{c.line}</p>
                <p className="f-coach-since">{c.since}</p>
              </div>
            </div>
            <button type="button" aria-expanded={on} aria-controls={`f-coach-${c.key}`} aria-label={`${c.name}, ${c.role.toLowerCase()}: ${on ? "verberg" : "toon"} specialiteit`} onClick={() => setOpen(on ? null : c.key)}>
              <span className="f-coach-plus" aria-hidden="true">
                <Plus size={22} strokeWidth={2.6} />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* ── Lidmaatschappen ── */
const PLANS: { key: string; name: string; text: string; month: number; year: number; top?: boolean; points: string[] }[] = [
  {
    key: "open",
    name: "Open gym",
    text: "Je eigen schema, onze vloer.",
    month: 39,
    year: 34,
    points: ["Vrij trainen, elke dag dat we open zijn", "Intake van een uur met een coach", "Kluisje, douche en handdoek", "Losse groepsles voor € 9"],
  },
  {
    key: "club",
    name: "Club",
    text: "Alle lessen, zo vaak als je wilt.",
    month: 64,
    year: 55,
    top: true,
    points: ["Onbeperkt groepslessen", "Vrij trainen inbegrepen", "Elke acht weken een testdag", "Op zaterdag een vriend gratis mee", "Lessen boeken tot twee weken vooruit"],
  },
  {
    key: "coached",
    name: "Coached",
    text: "Club, met een coach naast je.",
    month: 129,
    year: 112,
    points: ["Alles van Club", "Twee uur personal training per maand", "Persoonlijk schema, elke maand bijgesteld", "Voorrang op de wachtlijst"],
  },
];

/** Three plans and one switch. Paying per year lowers the monthly price. */
export function Plans() {
  const [yearly, setYearly] = useState(false);
  return (
    <>
      <div className="f-switch" role="group" aria-label="Betaalperiode" data-yearly={yearly || undefined} data-rv>
        <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
          Per maand
        </button>
        <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
          Per jaar <em>bespaar tot € 204</em>
        </button>
      </div>
      <ul className="f-plans">
        {PLANS.map((p, i) => (
          <li key={p.key} className={`f-plan${p.top ? " is-top" : ""}`} data-rv style={{ ["--i" as string]: i }}>
            {p.top && <p className="f-plan-flag">Meest gekozen</p>}
            <h3>{p.name}</h3>
            <p className="f-plan-text">{p.text}</p>
            <p className="f-price" aria-live="polite">
              <span className="f-price-cur">€</span>
              <b key={yearly ? "y" : "m"}>{yearly ? p.year : p.month}</b>
              <span className="f-price-per">per maand</span>
            </p>
            <p className="f-plan-note" key={yearly ? "ny" : "nm"}>
              {yearly ? `€ ${p.year * 12} per jaar vooruit. Je bespaart € ${(p.month - p.year) * 12}.` : "Maandelijks opzegbaar, geen inschrijfgeld."}
            </p>
            <ul className="f-plan-points">
              {p.points.map((t) => (
                <li key={t}>
                  <Check aria-hidden="true" size={18} strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>
            <a href="#proefles" className={`f-btn${p.top ? " f-btn-dark" : ""}`}>
              Probeer eerst gratis <ArrowRight aria-hidden="true" size={18} strokeWidth={2.6} />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ── Proefles ── */
const GOALS = ["Sterker worden", "Conditie opbouwen", "Soepeler bewegen", "Trainen voor een wedstrijd", "Weet ik nog niet"];
const WEEK = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
const WEEK_FULL = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"];
const MOMENTS = ["Ochtend", "Middag", "Avond"];

/** Trial session: goal, preferred day and moment as chips, then the details. Nothing is sent. */
export function Trial() {
  const [goal, setGoal] = useState(GOALS[0]);
  const [day, setDay] = useState(1);
  const [moment, setMoment] = useState(MOMENTS[2]);
  return (
    <DemoForm
      className="f-form"
      done={`Zo zou het werken: een proefles op ${WEEK_FULL[day]} in de ${moment.toLowerCase()}, met als doel “${goal.toLowerCase()}”. Dit is een demo-ontwerp van HOPI, er is niets verzonden.`}
    >
      <fieldset>
        <legend>
          <b>1</b> Wat wil je bereiken?
        </legend>
        <div className="f-chips">
          {GOALS.map((g) => (
            <button key={g} type="button" aria-pressed={goal === g} onClick={() => setGoal(g)}>
              {g}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <b>2</b> Welke dag past het best?
        </legend>
        <div className="f-chips f-chips-days">
          {WEEK.map((d, i) => (
            <button key={d} type="button" aria-pressed={day === i} aria-label={WEEK_FULL[i]} onClick={() => setDay(i)}>
              {d}
            </button>
          ))}
        </div>
        <div className="f-chips f-chips-moments">
          {MOMENTS.map((t) => (
            <button key={t} type="button" aria-pressed={moment === t} onClick={() => setMoment(t)}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <b>3</b> Hoe bereiken we je?
        </legend>
        <div className="f-fields">
          <label>
            <span>Voornaam</span>
            <input type="text" name="name" autoComplete="given-name" required />
          </label>
          <label>
            <span>Telefoon</span>
            <input type="tel" name="phone" autoComplete="tel" required />
          </label>
          <label>
            <span>E-mail</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            <span>Ervaring met trainen</span>
            <select name="level" defaultValue="soms">
              <option value="nooit">Nog nooit met gewichten getraind</option>
              <option value="soms">Af en toe, zonder vast schema</option>
              <option value="vaak">Ik train al regelmatig</option>
            </select>
          </label>
        </div>
      </fieldset>
      <button type="submit" className="f-btn f-btn-big">
        Boek mijn proefles op {WEEK_FULL[day]} <ArrowRight aria-hidden="true" size={20} strokeWidth={2.6} />
      </button>
    </DemoForm>
  );
}
