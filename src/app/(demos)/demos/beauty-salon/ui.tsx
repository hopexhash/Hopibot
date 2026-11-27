"use client";

import { useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { DemoForm, useMenu } from "@/demos/kit";
import { IMAGES } from "@/demos/images";
import { Pic } from "@/demos/pic";

const I = IMAGES["beauty-salon"];

const LINKS = [
  ["#filosofie", "Filosofie"],
  ["#behandelingen", "Behandelingen"],
  ["#resultaten", "Resultaten"],
  ["#ruimte", "De ruimte"],
  ["#over", "Over Noor"],
  ["#ervaringen", "Ervaringen"],
] as const;

/* ── The treatment menu: one list, used by the menu and by the booking form ── */
type Treatment = { id: string; name: string; text: string; min: number; price: number };
type Category = { key: string; label: string; note: string; img: keyof typeof I; alt: string; zoom?: string; items: Treatment[] };

const MENU: Category[] = [
  {
    key: "gezicht",
    label: "Gezicht",
    note: "Altijd afgestemd op je huid van die dag. Twijfel je? Begin met de kennismaking.",
    img: "mask",
    alt: "Een kleimasker wordt met een kwast op het gezicht aangebracht",
    zoom: "s-z-mask",
    items: [
      { id: "kennismaking", name: "Kennismaking met huidanalyse", text: "Je eerste afspraak: we bekijken je huid bij daglicht en maken een plan.", min: 45, price: 49 },
      { id: "signatuur", name: "Signatuurbehandeling", text: "Reiniging, enzympeeling, lange massage en een masker op maat.", min: 75, price: 98 },
      { id: "dieptereiniging", name: "Dieptereiniging", text: "Voor een onrustige huid: stomen, zorgvuldig uitreinigen en kalmeren.", min: 60, price: 82 },
      { id: "sculpt", name: "Lift en sculpt massage", text: "Stevige gezichtsmassage met de handen, zonder apparaten.", min: 50, price: 76 },
      { id: "peeling", name: "Fruitzuurpeeling", text: "Milde peeling voor een egalere en helderdere teint.", min: 40, price: 68 },
    ],
  },
  {
    key: "lichaam",
    label: "Lichaam",
    note: "Met warme, ongeparfumeerde olie. De druk bepaal jij, niet het protocol.",
    img: "body-massage",
    alt: "Warme olie wordt in de hand geschonken voor een rugmassage",
    items: [
      { id: "ontspanning", name: "Ontspanningsmassage", text: "Warme olie en rustige, lange grepen van schouders tot voeten.", min: 60, price: 79 },
      { id: "rug", name: "Rug, nek en schouders", text: "Voor wie veel zit, veel tilt of veel draagt.", min: 40, price: 58 },
      { id: "scrub", name: "Lichaamsscrub met pakking", text: "Zeezout en amandelolie, daarna een voedende warme wikkel.", min: 70, price: 92 },
      { id: "zwanger", name: "Zwangerschapsmassage", text: "In zijligging met steunkussens, vanaf de veertiende week.", min: 60, price: 84 },
    ],
  },
  {
    key: "wimpers",
    label: "Wimpers & brows",
    note: "We werken met wat je hebt. Geen extensions, geen sjablonen.",
    img: "brushes",
    alt: "Kwasten, mascara en poeder in zachte tinten op een zandkleurige ondergrond",
    items: [
      { id: "browshaping", name: "Brow shaping", text: "Opmeten, epileren en harsen naar de vorm van je gezicht.", min: 30, price: 34 },
      { id: "browlamination", name: "Brow lamination met verven", text: "Vollere, in vorm gekamde wenkbrauwen voor zes weken.", min: 50, price: 62 },
      { id: "lashlift", name: "Lash lift met verven", text: "Je eigen wimpers, zichtbaar opener en donkerder.", min: 55, price: 68 },
      { id: "verven", name: "Wimpers en wenkbrauwen verven", text: "Kort bijwerken tussen twee afspraken door.", min: 25, price: 29 },
    ],
  },
  {
    key: "rituelen",
    label: "Rituelen",
    note: "Langere afspraken waarin het badhuis en de warmtekamer alleen van jou zijn.",
    img: "towel",
    alt: "Een opgerolde handdoek, een witte pompfles, een waxinelichtje en roze tulpen",
    items: [
      { id: "ochtend", name: "Ochtendritueel", text: "Signatuurbehandeling en rugmassage, met thee in de tuinkamer.", min: 120, price: 158 },
      { id: "sage", name: "Sage ritueel", text: "Scrub, bad, massage en gezichtsbehandeling. Onze langste afspraak.", min: 180, price: 235 },
      { id: "twee", name: "Ritueel voor twee", text: "Samen in het badhuis, daarna elk een eigen behandeling.", min: 150, price: 298 },
      { id: "seizoen", name: "Seizoensritueel", text: "Elk kwartaal anders. Dit najaar: massage met warme kruidenstempels.", min: 90, price: 124 },
    ],
  },
];

const ALL = MENU.flatMap((c) => c.items.map((t) => ({ ...t, cat: c.key })));
const dur = (min: number) => (min < 120 ? `${min} min` : `${String(min / 60).replace(".", ",")} uur`);

/* The chosen treatment is shared: "Boek" in the menu sets it, the booking form reads it. */
type Choice = { id: string; cat: string };
let choice: Choice = { id: "signatuur", cat: "gezicht" };
const FIRST: Choice = choice;
const subs = new Set<() => void>();
const setChoice = (next: Choice) => {
  choice = next;
  subs.forEach((f) => f());
};
const subscribe = (f: () => void) => {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
};
const pick = (id: string) => setChoice({ id, cat: ALL.find((t) => t.id === id)?.cat ?? choice.cat });
const useChoice = () =>
  useSyncExternalStore(
    subscribe,
    () => choice,
    () => FIRST,
  );

/** Header: logo, links, and the calm pill that is always within reach. */
export function Nav() {
  const m = useMenu();
  return (
    <>
      <header className={`s-nav${m.open ? " is-open" : ""}`}>
        <a href="#top" className="s-logo" aria-label="Atelier Sage, naar boven" onClick={m.close}>
          Atelier <em>Sage</em>
        </a>
        <nav aria-label="Hoofdmenu" className="s-links">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#boeken" className="s-pill s-nav-pill" onClick={m.close}>
          Boek <span>een afspraak</span>
        </a>
        <button type="button" className="s-burger" aria-expanded={m.open} aria-controls="s-menu" aria-label={m.open ? "Sluit het menu" : "Open het menu"} onClick={m.toggle}>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="s-menu" className={`s-menu${m.open ? " is-open" : ""}`} inert={!m.open}>
        <nav aria-label="Menu">
          {LINKS.map(([href, label], i) => (
            <a key={href} href={href} onClick={m.close} style={{ ["--i" as string]: i }}>
              {label}
            </a>
          ))}
          <a href="#boeken" onClick={m.close} style={{ ["--i" as string]: LINKS.length }}>
            <em>Afspraak boeken</em>
          </a>
        </nav>
        <div className="s-menu-foot">
          <p>
            <b>Open</b>
            Dinsdag t/m zaterdag
            <br />
            Donderdag tot 21.00 uur
          </p>
          <p>
            <b>Contact</b>
            030 000 00 00
            <br />
            hallo@ateliersage.example
          </p>
        </div>
      </div>
    </>
  );
}

/** Treatment menu: four categories as tabs, every treatment with duration, price and "Boek". */
export function Treatments() {
  const [at, setAt] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cat = MENU[at];
  const onKey = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    const next = e.key === "Home" ? 0 : e.key === "End" ? MENU.length - 1 : step ? (at + step + MENU.length) % MENU.length : -1;
    if (next < 0) return;
    e.preventDefault();
    setAt(next);
    tabs.current[next]?.focus();
  };
  return (
    <div className="s-treat">
      <div className="s-treat-side" data-rv>
        <div className="s-arch s-treat-photo">
          {MENU.map((c, i) => (
            <Pic key={c.key} img={I[c.img]} alt={c.alt} sizes="(min-width: 960px) 26vw, 60vw" className={[c.zoom, i === at ? "is-on" : ""].filter(Boolean).join(" ") || undefined} />
          ))}
        </div>
        <p className="s-treat-note" key={cat.key}>
          {cat.note}
        </p>
      </div>
      <div className="s-treat-main">
        <div className="s-tabs" role="tablist" aria-label="Soorten behandelingen" onKeyDown={onKey} data-rv>
          {MENU.map((c, i) => (
            <button
              key={c.key}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`s-tab-${c.key}`}
              aria-selected={i === at}
              aria-controls="s-tabpanel"
              tabIndex={i === at ? 0 : -1}
              onClick={() => setAt(i)}
            >
              {c.label}
              <small aria-hidden="true">{c.items.length}</small>
            </button>
          ))}
        </div>
        <div id="s-tabpanel" role="tabpanel" aria-labelledby={`s-tab-${cat.key}`} key={cat.key} className="s-rows">
          <ul>
            {cat.items.map((t, i) => (
              <li key={t.id} style={{ ["--i" as string]: i }}>
                <div className="s-row-main">
                  <h3>{t.name}</h3>
                  <p>{t.text}</p>
                </div>
                <span className="s-row-min">{dur(t.min)}</span>
                <span className="s-row-price">€ {t.price}</span>
                <a href="#boeken" className="s-row-book" aria-label={`Boek ${t.name}`} onClick={() => pick(t.id)}>
                  Boek
                  <i aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Results: an illustration of the before/after view. One photo, shown twice: the left side
 * carries a dulling filter, the right side is the photo as it is. The divider follows a range
 * input, so it works with touch, mouse and arrow keys.
 */
export function BeforeAfter() {
  const [x, setX] = useState(50);
  return (
    <figure className="s-ba" style={{ ["--x" as string]: `${x}%` }}>
      <div className="s-arch s-ba-frame">
        <Pic img={I.facial} alt="Close-up van een gezicht tijdens een behandeling, met een egale en heldere huid" sizes="(min-width: 960px) 40vw, 92vw" />
        <div className="s-ba-before" aria-hidden="true">
          <Pic img={I.facial} alt="" sizes="(min-width: 960px) 40vw, 92vw" />
        </div>
        <span className="s-ba-tag s-ba-tag-a" aria-hidden="true">
          Voor
        </span>
        <span className="s-ba-tag s-ba-tag-b" aria-hidden="true">
          Na
        </span>
        <input type="range" min={0} max={100} step={1} value={x} onChange={(e) => setX(Number(e.target.value))} aria-label="Verschuif de scheidslijn tussen voor en na" aria-valuetext={`${x} procent van de voor-weergave zichtbaar`} />
        <span className="s-ba-handle" aria-hidden="true">
          <i />
        </span>
      </div>
      <figcaption>
        <b>Illustratie van de voor-en-na-weergave.</b> Eén foto, links met een doffer filter. Sleep de lijn of gebruik de pijltjestoetsen. Echte resultaten bespreken we tijdens je kennismaking.
      </figcaption>
    </figure>
  );
}

const DAYS = [
  { key: "di", full: "dinsdag", times: ["09.30", "11.00", "13.00", "14.30", "16.00"] },
  { key: "wo", full: "woensdag", times: ["09.30", "11.00", "13.00", "14.30", "16.00"] },
  { key: "do", full: "donderdag", times: ["11.00", "13.00", "14.30", "16.00", "18.30", "20.00"] },
  { key: "vr", full: "vrijdag", times: ["09.30", "11.00", "13.00", "14.30", "16.00"] },
  { key: "za", full: "zaterdag", times: ["09.00", "10.30", "12.00", "13.30", "15.00"] },
];

/** Booking in three steps inside one form: treatment, day and time, details. Nothing is sent. */
export function Booking() {
  const { id, cat } = useChoice();
  const [dayKey, setDayKey] = useState("do");
  const [wish, setWish] = useState("14.30");
  const t = ALL.find((a) => a.id === id) ?? ALL[1];
  const group = MENU.find((c) => c.key === cat) ?? MENU[0];
  const day = DAYS.find((d) => d.key === dayKey) ?? DAYS[2];
  const time = day.times.includes(wish) ? wish : day.times[0];
  return (
    <DemoForm className="s-form" done={`Zo zou het werken: ${t.name} op ${day.full} om ${time} uur. Dit is een demo-ontwerp van HOPI, er is niets verzonden.`}>
      <fieldset className="s-step">
        <legend>
          <span aria-hidden="true">1</span>
          Kies je behandeling
        </legend>
        <div className="s-chips s-chips-cat" role="group" aria-label="Soort behandeling">
          {MENU.map((c) => (
            <button key={c.key} type="button" aria-pressed={c.key === group.key} onClick={() => setChoice({ id: c.items.some((i) => i.id === id) ? id : c.items[0].id, cat: c.key })}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="s-opts" key={group.key}>
          {group.items.map((o) => (
            <label key={o.id} className="s-opt">
              <input type="radio" name="behandeling" value={o.id} checked={o.id === id} onChange={() => pick(o.id)} />
              <span className="s-opt-name">{o.name}</span>
              <span className="s-opt-min">{dur(o.min)}</span>
              <span className="s-opt-price">€ {o.price}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="s-step">
        <legend>
          <span aria-hidden="true">2</span>
          Kies een dag en tijd
        </legend>
        <div className="s-chips s-chips-day" role="group" aria-label="Dag">
          {DAYS.map((d) => (
            <button key={d.key} type="button" aria-pressed={d.key === day.key} aria-label={d.full} onClick={() => setDayKey(d.key)}>
              {d.key}
            </button>
          ))}
        </div>
        <div className="s-chips s-chips-time" role="group" aria-label={`Tijd op ${day.full}`}>
          {day.times.map((h) => (
            <button key={h} type="button" aria-pressed={h === time} onClick={() => setWish(h)}>
              {h}
            </button>
          ))}
        </div>
        <p className="s-step-hint">{day.key === "do" ? "Donderdag is onze avond: de laatste afspraak begint om 20.00 uur." : day.key === "za" ? "Zaterdag sluiten we om 16.30 uur." : "Tijden zijn starttijden. We plannen ruim, je hoeft niet te haasten."}</p>
      </fieldset>

      <fieldset className="s-step">
        <legend>
          <span aria-hidden="true">3</span>
          Je gegevens
        </legend>
        <div className="s-fields">
          <label>
            <span>Naam</span>
            <input type="text" name="naam" autoComplete="name" required />
          </label>
          <label>
            <span>Telefoon</span>
            <input type="tel" name="telefoon" autoComplete="tel" />
          </label>
          <label className="s-field-wide">
            <span>E-mail</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label className="s-field-wide">
            <span>Iets wat we vooraf moeten weten?</span>
            <textarea name="opmerking" rows={2} />
          </label>
        </div>
        <label className="s-check">
          <input type="checkbox" name="eerste-keer" />
          <span>Dit is mijn eerste afspraak bij Atelier Sage</span>
        </label>
      </fieldset>

      <div className="s-sum" aria-live="polite">
        <p className="s-sum-label">Je afspraak</p>
        <p className="s-sum-what">{t.name}</p>
        <p className="s-sum-meta">
          {day.full} om {time} uur · {dur(t.min)} · € {t.price}
        </p>
      </div>
      <button type="submit" className="s-pill s-submit">
        Boek {day.full} om {time}
        <small>
          {t.name} · € {t.price}
        </small>
      </button>
    </DemoForm>
  );
}
