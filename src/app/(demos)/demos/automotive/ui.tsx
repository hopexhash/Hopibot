"use client";

import { Fragment, useState, useSyncExternalStore } from "react";
import { ArrowUpRight } from "lucide-react";
import { DemoForm, useMenu } from "@/demos/kit";
import { IMAGES } from "@/demos/images";
import { Pic } from "@/demos/pic";

const I = IMAGES.automotive;

const LINKS = [
  ["#diensten", "Diensten"],
  ["#voor-na", "Voor en na"],
  ["#pakketten", "Pakketten"],
  ["#proces", "Proces"],
  ["#studio", "Studio"],
  ["#klanten", "Klanten"],
  ["#afspraak", "Afspraak"],
] as const;

/** The mark: a shard of obsidian with one edge catching the light. */
export function Mark() {
  return (
    <svg className="o-mark" viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 1.5 25 9l-3.2 13L14 26.5 6.2 22 3 9z" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
      <path d="M14 1.5 17.4 12 14 26.5 10.6 12z" fill="currentColor" opacity="0.16" />
      <path d="M14 1.5 17.4 12 25 9M17.4 12 14 26.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/** Header: clear over the opening, a dark pane of glass once the page moves. */
export function Nav() {
  const m = useMenu();
  return (
    <>
      <header className="o-nav">
        <a href="#top" className="o-logo" aria-label="Obsidian Detailing, naar boven" onClick={m.close}>
          <Mark />
          <span>
            Obsidian<small>Detailing</small>
          </span>
        </a>
        <nav aria-label="Hoofdmenu" className="o-links">
          {LINKS.slice(0, 5).map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#afspraak" className="o-btn o-btn-line o-nav-cta">
          Plan een afspraak
        </a>
        <button type="button" className="o-burger" aria-expanded={m.open} aria-controls="o-menu" onClick={m.toggle}>
          <span>{m.open ? "Sluit" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="o-menu" className={`o-menu${m.open ? " is-open" : ""}`} inert={!m.open}>
        <nav aria-label="Menu">
          {LINKS.map(([href, label], i) => (
            <a key={href} href={href} onClick={m.close} style={{ ["--i" as string]: i }}>
              <small>{String(i + 1).padStart(2, "0")}</small>
              <span>{label}</span>
              <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.4} />
            </a>
          ))}
        </nav>
        <dl className="o-menu-foot">
          <div>
            <dt>Open</dt>
            <dd>Di t/m za, alleen op afspraak</dd>
          </div>
          <div>
            <dt>Bel</dt>
            <dd>
              <a href="tel:0760000000" onClick={m.close}>
                076 000 00 00
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}

/* ── Diensten ── */
type Service = { name: string; from: string; img: keyof typeof I; alt: string; text: string; specs: [string, string][] };
const SERVICES: Service[] = [
  {
    name: "Handwas",
    from: "59",
    img: "handwash",
    alt: "Een detailer wast met de hand een zwarte auto vol schuim",
    text: "Twee emmers, pH-neutrale shampoo en gedemineraliseerd water. Geen borstels, dus geen wasstraatkrassen. Drogen doen we met warme lucht en zachte doeken.",
    specs: [
      ["Duur", "1,5 uur"],
      ["Methode", "Twee emmers, met de hand"],
      ["Advies", "Elke 4 tot 6 weken"],
    ],
  },
  {
    name: "Lakcorrectie",
    from: "389",
    img: "sedan",
    alt: "Grijze sedan met strak glanzende lak in de zon",
    text: "Met de machine polijsten we krassen, hologrammen en doffe plekken laag voor laag uit de blanke lak. Vooraf meten we de lakdikte per paneel, zodat we nooit meer weghalen dan nodig is.",
    specs: [
      ["Duur", "1 tot 2 dagen"],
      ["Methode", "Eén of twee polijststappen"],
      ["Vooraf", "Lakdiktemeting per paneel"],
    ],
  },
  {
    name: "Keramische coating",
    from: "695",
    img: "road",
    alt: "Zwarte auto met diepe glans rijdt over een natte weg",
    text: "Een glasharde laag die zich aan de lak hecht. Water en vuil glijden eraf, wassen kost de helft van de tijd en de glans blijft jarenlang diep.",
    specs: [
      ["Duur", "2 tot 3 dagen, met uitharden"],
      ["Bescherming", "Tot 5 jaar"],
      ["Onderhoud", "Handwas, geen wasstraat"],
    ],
  },
  {
    name: "Interieurreiniging",
    from: "119",
    img: "interior",
    alt: "Schoon interieur van een auto met stuur, dashboard en groot scherm",
    text: "Stoom voor de naden, een zachte borstel voor het leer en extractie voor de bekleding. Het dashboard blijft mat, zoals het uit de fabriek kwam.",
    specs: [
      ["Duur", "3 uur"],
      ["Methode", "Stoom en extractie"],
      ["Leer", "Gereinigd en gevoed, niet glimmend"],
    ],
  },
  {
    name: "Velgen",
    from: "149",
    img: "foam",
    alt: "Velg en achterkant van een donkere sportwagen onder een laag schuim",
    text: "Waar het kan gaan de wielen eraf. We reinigen de binnenkant, de remklauwen en de wielkasten en zetten een hittebestendige coating die remstof loslaat.",
    specs: [
      ["Duur", "2 uur"],
      ["Methode", "Wielen los, binnen en buiten"],
      ["Bescherming", "Coating, circa 12 maanden"],
    ],
  },
];

/** Services: an index on the left, the chosen service on the right. On a phone it folds open in place. */
export function Services() {
  const [at, setAt] = useState(0);
  return (
    <div className="o-svc" data-rv>
      {SERVICES.map((s, i) => (
        <Fragment key={s.name}>
          <button type="button" className="o-svc-tab" id={`o-svc-t${i}`} aria-expanded={i === at} aria-controls={`o-svc-p${i}`} onClick={() => setAt(i)} style={{ ["--r" as string]: i + 1 }}>
            <span className="o-svc-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="o-svc-name">{s.name}</span>
            <span className="o-svc-from">vanaf € {s.from}</span>
            <i aria-hidden="true" />
          </button>
          <div className="o-svc-panel" id={`o-svc-p${i}`} role="region" aria-labelledby={`o-svc-t${i}`} hidden={i !== at}>
            <div className="o-svc-photo">
              <Pic img={I[s.img]} alt={s.alt} sizes="(min-width: 960px) 52vw, 100vw" />
            </div>
            <div className="o-svc-copy">
              <p>{s.text}</p>
              <dl className="o-spec">
                {s.specs.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <a href="#afspraak" className="o-more">
                Plan {s.name.toLowerCase()} in
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

/* ── Voor en na ── */
/** One photo twice. The left copy is made dull in CSS; a range input moves the line between them. */
export function BeforeAfter() {
  const [pos, setPos] = useState(54);
  return (
    <figure className="o-ba" data-rv style={{ ["--pos" as string]: `${pos}%` }}>
      <div className="o-ba-frame">
        <Pic img={I.suv} alt="Zwarte SUV recht van voren voor een donkere garagedeur, met glanzende lak" sizes="(min-width: 1200px) 1200px, 100vw" className="o-ba-after" />
        <div className="o-ba-before" aria-hidden="true">
          <Pic img={I.suv} alt="" sizes="(min-width: 1200px) 1200px, 100vw" />
        </div>
        <span className="o-ba-tag o-ba-tag-l" aria-hidden="true">
          Voor
        </span>
        <span className="o-ba-tag o-ba-tag-r" aria-hidden="true">
          Na
        </span>
        <input type="range" min={0} max={100} step={1} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Verschuif de lijn tussen voor en na" aria-valuetext={`${pos} procent voor, ${100 - pos} procent na`} />
        <div className="o-ba-line" aria-hidden="true">
          <b>
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M9 6 3 12l6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </b>
        </div>
      </div>
      <figcaption>
        <b>Illustratie.</b> Dit is één foto. De linkerkant is digitaal dof gemaakt om te laten zien wat lakcorrectie doet; het is geen opname van een auto die wij hebben behandeld.
      </figcaption>
    </figure>
  );
}

/* ── Pakketten: one small store, shared by the price table and the appointment form ── */
const SIZES = [
  { key: "compact", label: "Compact", hint: "Hatchback, stadsauto" },
  { key: "midden", label: "Midden", hint: "Sedan, stationwagen" },
  { key: "suv", label: "SUV", hint: "SUV, bus, grote coupé" },
] as const;

const ROWS = ["Handwas", "Decontaminatie", "Lakcorrectie", "Bescherming", "Interieur", "Nazorg"] as const;

type Pack = { name: string; line: string; time: string; prices: [number, number, number]; hot?: boolean; rows: (string | null)[] };
const PACKS: Pack[] = [
  {
    name: "Refresh",
    line: "Schoon en beschermd, binnen één ochtend.",
    time: "3 uur",
    prices: [129, 149, 179],
    rows: ["Twee emmers, velgen en dorpels", "Vliegroest en teer verwijderd", null, "Spraysealant, circa 3 maanden", "Stofzuigen, ruiten en dashboard", "Wasadvies op papier"],
  },
  {
    name: "Signature",
    line: "De glans terug en een half jaar beschermd.",
    time: "1 dag",
    prices: [449, 529, 619],
    hot: true,
    rows: ["Twee emmers, velgen, dorpels en kieren", "Vliegroest, teer en kleibehandeling", "Eén stap: lichte krassen en waas weg", "Sealant, circa 6 maanden", "Dieptereiniging van bekleding en leer", "Controle na 4 weken, zonder kosten"],
  },
  {
    name: "Ceramic",
    line: "Showroomlak die jarenlang makkelijk schoon blijft.",
    time: "3 dagen",
    prices: [1095, 1295, 1495],
    rows: ["Twee emmers, wielen eraf, kieren", "Vliegroest, teer en kleibehandeling", "Twee stappen: ook diepere krassen weg", "Keramische coating, tot 5 jaar", "Dieptereiniging, leer en kunststof beschermd", "Jaarlijkse onderhoudsbeurt met korting"],
  },
];

const euro = (n: number) => n.toLocaleString("nl-NL");

type Choice = { pack: number; size: number };
let choice: Choice = { pack: 1, size: 1 };
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};
const getChoice = () => choice;
function setChoice(next: Partial<Choice>) {
  choice = { ...choice, ...next };
  listeners.forEach((fn) => fn());
}
const useChoice = () => useSyncExternalStore(subscribe, getChoice, getChoice);

function SizeSwitch({ name, size }: { name: string; size: number }) {
  return (
    <div className="o-size" role="radiogroup" aria-label="Formaat van je auto" style={{ ["--at" as string]: size }}>
      <i aria-hidden="true" className="o-size-ind" />
      {SIZES.map((s, i) => (
        <label key={s.key}>
          <input type="radio" name={name} value={s.key} checked={size === i} onChange={() => setChoice({ size: i })} />
          <span>
            {s.label}
            <small>{s.hint}</small>
          </span>
        </label>
      ))}
    </div>
  );
}

/** Three packages side by side. The size of the car changes every price at once. */
export function Packages() {
  const { size } = useChoice();
  return (
    <div className="o-pk">
      <div className="o-pk-bar" data-rv>
        <p>Formaat van je auto</p>
        <SizeSwitch name="o-size-table" size={size} />
      </div>
      <div className="o-pk-grid" data-rv>
        {PACKS.map((p, i) => (
          <article key={p.name} className={`o-pkg${p.hot ? " is-hot" : ""}`}>
            <header>
              <p className="o-pkg-flag">{p.hot ? "Meest gekozen" : `Pakket ${i + 1}`}</p>
              <h3>{p.name}</h3>
              <p className="o-pkg-line">{p.line}</p>
              <p className="o-price">
                <span>€</span>
                <b key={size}>{euro(p.prices[size])}</b>
              </p>
              <p className="o-pkg-meta">
                {SIZES[size].label} · incl. btw · {p.time}
              </p>
            </header>
            <dl>
              {ROWS.map((r, k) => (
                <div key={r} className={p.rows[k] ? undefined : "is-off"}>
                  <dt>{r}</dt>
                  <dd>{p.rows[k] ?? "Niet inbegrepen"}</dd>
                </div>
              ))}
            </dl>
            <a href="#afspraak" className={`o-btn ${p.hot ? "o-btn-fill" : "o-btn-line"}`} onClick={() => setChoice({ pack: i })}>
              Kies {p.name}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

/** Appointment: package, vehicle, preferred date, details. Nothing is sent. */
export function Appointment() {
  const { pack, size } = useChoice();
  const p = PACKS[pack];
  const price = euro(p.prices[size]);
  return (
    <DemoForm className="o-form" done={`Zo zou het werken: ${p.name} voor een auto in de klasse ${SIZES[size].label}, € ${price}. Dit is een demo-ontwerp van HOPI, er is niets verzonden.`}>
      <fieldset>
        <legend>
          <span>1</span>Pakket
        </legend>
        <div className="o-picks">
          {PACKS.map((k, i) => (
            <label key={k.name}>
              <input type="radio" name="pakket" value={k.name} checked={pack === i} onChange={() => setChoice({ pack: i })} />
              <span>
                <b>{k.name}</b>
                <small>€ {euro(k.prices[size])}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <span>2</span>Voertuig
        </legend>
        <SizeSwitch name="o-size-form" size={size} />
        <label className="o-field">
          <span>Merk, model en kleur</span>
          <input type="text" name="voertuig" placeholder="Bijvoorbeeld: zwarte stationwagen, 2021" required />
        </label>
      </fieldset>
      <fieldset>
        <legend>
          <span>3</span>Voorkeursdatum
        </legend>
        <div className="o-fields">
          <label className="o-field">
            <span>Datum</span>
            <input type="date" name="datum" required />
          </label>
          <label className="o-field">
            <span>Brengen</span>
            <select name="dagdeel" defaultValue="ochtend">
              <option value="ochtend">Ochtend, vanaf 08.00</option>
              <option value="middag">Middag, vanaf 13.00</option>
            </select>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <span>4</span>Gegevens
        </legend>
        <div className="o-fields">
          <label className="o-field">
            <span>Naam</span>
            <input type="text" name="naam" autoComplete="name" required />
          </label>
          <label className="o-field">
            <span>Telefoon</span>
            <input type="tel" name="telefoon" autoComplete="tel" required />
          </label>
          <label className="o-field o-field-wide">
            <span>E-mail</span>
            <input type="email" name="email" autoComplete="email" />
          </label>
        </div>
      </fieldset>
      <button type="submit" className="o-btn o-btn-fill o-submit">
        <span>Plan {p.name} in</span>
        <span>€ {price}</span>
      </button>
    </DemoForm>
  );
}
