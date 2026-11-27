"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { DemoForm, useMenu } from "@/demos/kit";
import { IMAGES } from "@/demos/images";
import { Pic } from "@/demos/pic";

const I = IMAGES.hotel;
type ImgKey = keyof typeof I;

/** The mark of the house: a sun coming up over the water. */
export function Sun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 36" width="48" height="36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M14 22a10 10 0 0 1 20 0" />
      <path className="t-sun-rays" d="M35.7 15.3l3.9-2.3M30.8 10.3l2.2-3.9M24 8.5V4M17.2 10.3L15 6.4M12.3 15.3L8.4 13" />
      <path d="M5 22h38M11 27.5h26M17 33h14" />
    </svg>
  );
}

/* ── The rooms: one list for the opening bar, the row of rooms and the booking ── */
type Shot = { img: ImgKey; alt: string; cap: string };
type Room = {
  key: string;
  numeral: string;
  name: string;
  size: number;
  bed: string;
  view: string;
  max: number;
  price: number;
  line: string;
  text: string;
  incl: string[];
  pos: string;
  shots: Shot[];
};

const ROOMS: Room[] = [
  {
    key: "tuin",
    numeral: "I",
    name: "Tuinkamer",
    size: 22,
    bed: "Queensize, 160 × 200 cm",
    view: "De binnentuin",
    max: 2,
    price: 219,
    line: "Donker hout en openslaande deuren naar de tuin.",
    text: "De stilste kamers van het huis. Je kijkt uit op de binnentuin en hoort ’s ochtends alleen de merels. Warm hout, gedempt licht en een bed waar je moeilijk uit komt.",
    incl: ["Regendouche en badjassen", "Koffie en thee op de kamer", "Toegang tot het bad en de sauna", "Snelle wifi in het hele huis"],
    pos: "66% 50%",
    shots: [
      { img: "room-warm", alt: "Tuinkamer met donker houten wanden, een laag bed en uitzicht op groen", cap: "De kamer aan de tuin" },
      { img: "room-dark", alt: "Bed met wit linnen tegen een wand van donkere houten lamellen", cap: "Tuinkamer op de eerste verdieping" },
      { img: "linen", alt: "Ochtendlicht op wit beddengoed", cap: "Linnen, elke dag fris opgemaakt" },
    ],
  },
  {
    key: "gracht",
    numeral: "II",
    name: "Grachtenkamer",
    size: 28,
    bed: "Kingsize, 180 × 200 cm",
    view: "De gracht",
    max: 2,
    price: 269,
    line: "Hoge ramen, zware gordijnen en het water voor de deur.",
    text: "De klassieker van het huis. Hoge ramen aan de voorkant, een zithoek met uitzicht op het water en gordijnen die de stad buiten houden wanneer jij dat wilt.",
    incl: ["Zithoek aan het raam", "Regendouche en badjassen", "Minibar, bij aankomst gevuld", "Toegang tot het bad en de sauna"],
    pos: "64% 50%",
    shots: [
      { img: "room-classic", alt: "Grachtenkamer met een kingsize bed, een gecapitonneerde bank en hoge ramen met gordijnen", cap: "De kamer aan het water" },
      { img: "canal-day", alt: "Uitzicht over de gracht met bootjes en bomen op een zonnige dag", cap: "Het uitzicht vanuit de kamer" },
      { img: "bathroom", alt: "Lichte badkamer met een inloopdouche en een lange wastafel", cap: "De badkamer" },
    ],
  },
  {
    key: "brug",
    numeral: "III",
    name: "Brugkamer",
    size: 32,
    bed: "Kingsize, 180 × 210 cm",
    view: "De gracht en de brug",
    max: 3,
    price: 309,
    line: "Een hoekkamer in blauw, met de brug voor het raam.",
    text: "Op de hoek van het huis, met ramen aan twee kanten. Diepblauw fluweel, een werktafel bij het raam en een bank die ’s avonds een derde bed wordt.",
    incl: ["Slaapbank voor een derde gast", "Werktafel met uitzicht", "Regendouche en badjassen", "Toegang tot het bad en de sauna"],
    pos: "74% 50%",
    shots: [
      { img: "room-blue", alt: "Kamer in blauwtinten met een kingsize bed, een gele fauteuil en een raam", cap: "De hoekkamer" },
      { img: "room-navy", alt: "Bed met een donkerblauw hoofdbord en wit linnen", cap: "Fluweel en wit linnen" },
      { img: "pillow", alt: "Witte kussens tegen een donkerblauwe wand, met een bedlamp ernaast", cap: "Leeslamp aan elke kant" },
    ],
  },
  {
    key: "atelier",
    numeral: "IV",
    name: "Atelier suite",
    size: 46,
    bed: "Kingsize, 200 × 200 cm",
    view: "Daken en binnentuin",
    max: 3,
    price: 389,
    line: "Een voormalig schildersatelier onder de nok.",
    text: "Ooit werkte hier een schilder op het noorderlicht. Nu is het een suite met een aparte zithoek, een vrijstaand bad en ramen van vloer tot plafond.",
    incl: ["Vrijstaand bad en regendouche", "Aparte zithoek met slaapbank", "Welkomstfles van het huis", "Toegang tot het bad en de sauna"],
    pos: "42% 50%",
    shots: [
      { img: "room-grey", alt: "Suite met een gecapitonneerd bed, een messing hanglamp en hoge ramen met gordijnen", cap: "Het atelier" },
      { img: "room-mirror", alt: "Bed met een lichtgrijs hoofdbord onder een vergulde spiegel", cap: "Slapen onder de nok" },
      { img: "bath", alt: "Vrijstaand bad voor een wand van natuursteen, met een palm ernaast", cap: "Het vrijstaande bad" },
    ],
  },
  {
    key: "dak",
    numeral: "V",
    name: "Dakterras suite",
    size: 62,
    bed: "Kingsize, 200 × 210 cm",
    view: "Eigen terras, de stad",
    max: 4,
    price: 529,
    line: "De bovenste verdieping, met de stad aan je voeten.",
    text: "De hele bovenste verdieping van het middelste pand. Eén open ruimte met glazen puien, een eigen terras op het zuiden en plek voor vier. Ontbijt brengen we boven als je dat wilt.",
    incl: ["Eigen dakterras van 18 m²", "Vrijstaand bad en regendouche", "Slaapbank voor twee extra gasten", "Welkomstfles van het huis", "Toegang tot het bad en de sauna"],
    pos: "54% 50%",
    shots: [
      { img: "suite", alt: "Ruime suite met een laag bed, een zithoek en glazen puien naar het terras", cap: "De suite op de bovenste verdieping" },
      { img: "breakfast", alt: "Ontbijt met fruit, wafels en koffie op een marmeren tafel", cap: "Ontbijt op je eigen terras" },
      { img: "canal-dusk", alt: "De gracht bij schemering met verlichte gevels", cap: "De gracht als het donker wordt" },
    ],
  },
];

const eur = (n: number) => "€ " + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const nightsWord = (n: number) => (n === 1 ? "1 nacht" : `${n} nachten`);
const guestsWord = (n: number) => (n === 1 ? "1 gast" : `${n} gasten`);

/* Dates stay plain "jjjj-mm-dd" strings from the native inputs; they are only read as dates
   after a visitor has chosen them, so nothing here differs between server and browser. */
const DAY = 86400000;
const toUTC = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};
const addDays = (s: string, n: number) => new Date(toUTC(s) + n * DAY).toISOString().slice(0, 10);
const countNights = (a: string, b: string) => {
  if (!a || !b) return 0;
  const n = Math.round((toUTC(b) - toUTC(a)) / DAY);
  return Number.isFinite(n) ? n : 0;
};
const dayFmt = new Intl.DateTimeFormat("nl-NL", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
const nice = (s: string) => dayFmt.format(toUTC(s)).replace(/\./g, "");
const MAX_NIGHTS = 28;

const noSub = () => () => {};
const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
/** Today's date for the `min` of the date fields: empty on the server, filled in the browser. */
const useToday = () => useSyncExternalStore(noSub, localToday, () => "");

type Stay = {
  arrive: string;
  depart: string;
  guests: number;
  /** Number of nights, 0 until both dates are chosen and make sense. */
  nights: number;
  /** Why there is no total yet, if the dates were chosen but do not work. */
  hint: string;
  room: Room;
  cheapest: Room;
  setArrive: (v: string) => void;
  setDepart: (v: string) => void;
  setGuests: (n: number) => void;
  setRoomKey: (k: string) => void;
};
const StayCtx = createContext<Stay | null>(null);
const useStay = () => {
  const s = useContext(StayCtx);
  if (!s) throw new Error("StayProvider ontbreekt");
  return s;
};

/** The stay a visitor is putting together. Shared by the header, the opening bar, the rooms and the booking. */
export function StayProvider({ children }: { children: ReactNode }) {
  const [arrive, setArriveRaw] = useState("");
  const [depart, setDepart] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomKey, setRoomKey] = useState("");
  const value = useMemo<Stay>(() => {
    const raw = countNights(arrive, depart);
    const nights = raw >= 1 && raw <= MAX_NIGHTS ? raw : 0;
    const hint = !arrive || !depart ? "" : raw < 1 ? "Kies een vertrek na je aankomst" : raw > MAX_NIGHTS ? "Langer dan vier weken? Bel de receptie" : "";
    const fits = ROOMS.filter((r) => r.max >= guests);
    const cheapest = fits[0];
    const room = fits.find((r) => r.key === roomKey) ?? cheapest;
    const setArrive = (v: string) => {
      setArriveRaw(v);
      // Keep the departure after the arrival once both exist.
      if (v && depart && countNights(v, depart) < 1) setDepart(addDays(v, 1));
    };
    return { arrive, depart, guests, nights, hint, room, cheapest, setArrive, setDepart, setGuests, setRoomKey };
  }, [arrive, depart, guests, roomKey]);
  return <StayCtx.Provider value={value}>{children}</StayCtx.Provider>;
}

/* ── Header ── */
const LINKS = [
  ["#huis", "Het huis"],
  ["#kamers", "Kamers"],
  ["#restaurant", "Restaurant en bar"],
  ["#wellness", "Wellness"],
  ["#galerij", "Galerij"],
  ["#buurt", "De buurt"],
] as const;

/** Centred like a letterhead: links left and right of the mark. The booking button keeps count. */
export function Nav() {
  const m = useMenu();
  const s = useStay();
  return (
    <>
      <header className={`t-nav${m.open ? " is-open" : ""}`}>
        <button type="button" className="t-burger" aria-expanded={m.open} aria-controls="t-menu" onClick={m.toggle}>
          <i aria-hidden="true" />
          <span>{m.open ? "Sluit" : "Menu"}</span>
        </button>
        <nav aria-label="Hoofdmenu" className="t-links t-links-l">
          {LINKS.slice(0, 3).map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#top" className="t-logo" aria-label="Hotel Ostara, naar boven" onClick={m.close}>
          <Sun />
          <span>Ostara</span>
        </a>
        <div className="t-nav-r">
          <nav aria-label="Hoofdmenu, vervolg" className="t-links">
            {LINKS.slice(3).map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#boeken" className="t-nav-cta" onClick={m.close}>
            <span className="t-cta-long">{s.nights ? `${nightsWord(s.nights)} · vanaf ${eur(s.nights * s.cheapest.price)}` : "Boek je verblijf"}</span>
            <span className="t-cta-short">Boek</span>
          </a>
        </div>
      </header>
      <div id="t-menu" className={`t-menu${m.open ? " is-open" : ""}`} inert={!m.open}>
        <nav aria-label="Menu">
          {[...LINKS, ["#boeken", "Boeken"] as const].map(([href, label], i) => (
            <a key={href} href={href} onClick={m.close} style={{ ["--i" as string]: i }}>
              {label}
            </a>
          ))}
        </nav>
        <p>
          Receptie dag en nacht open
          <br />
          020 000 00 00 · welkom@hotelostara.example
        </p>
      </div>
    </>
  );
}

function Stepper({ value, min, max, onChange, label }: { value: number; min: number; max: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="t-step" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Eén gast minder">
        <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
          <path d="M1 6h10" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Eén gast meer">
        <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
          <path d="M1 6h10M6 1v10" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
    </div>
  );
}

/** The strip in the opening: dates and guests in, nights and a "vanaf" total out. */
export function BookingBar() {
  const s = useStay();
  const today = useToday();
  return (
    <div className="t-bar" role="group" aria-label="Bereken je verblijf">
      <label className="t-bar-f">
        <span>Aankomst</span>
        <input type="date" name="bar-aankomst" value={s.arrive} min={today || undefined} onChange={(e) => s.setArrive(e.target.value)} />
      </label>
      <label className="t-bar-f">
        <span>Vertrek</span>
        <input type="date" name="bar-vertrek" value={s.depart} min={s.arrive ? addDays(s.arrive, 1) : today || undefined} onChange={(e) => s.setDepart(e.target.value)} />
      </label>
      <div className="t-bar-f t-bar-g">
        <span>Gasten</span>
        <Stepper value={s.guests} min={1} max={4} onChange={s.setGuests} label="Aantal gasten" />
      </div>
      <p className="t-bar-sum" aria-live="polite">
        {s.nights ? (
          <>
            <small>
              {nightsWord(s.nights)} · {nice(s.arrive)} tot {nice(s.depart)}
            </small>
            <b>vanaf {eur(s.nights * s.cheapest.price)}</b>
            <small>in de {s.cheapest.name}</small>
          </>
        ) : (
          <>
            <small>{s.hint || "Kies je data, wij rekenen mee"}</small>
            <b>vanaf {eur(s.cheapest.price)}</b>
            <small>per nacht, {s.cheapest.name}</small>
          </>
        )}
      </p>
      <a href="#kamers" className="t-btn t-bar-go">
        <span>Bekijk kamers</span>
      </a>
    </div>
  );
}

/** Keeps Tab inside an open dialog. */
function trapTab(e: ReactKeyboardEvent<HTMLElement>) {
  if (e.key !== "Tab") return;
  const items = [...e.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], input, select, textarea")].filter((n) => n.offsetParent !== null);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

const Arrow = ({ back }: { back?: boolean }) => (
  <svg viewBox="0 0 28 12" width="28" height="12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" style={back ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M0 6h26M21 1l5 5-5 5" />
  </svg>
);
const Cross = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <path d="M2 2l12 12M14 2L2 14" />
  </svg>
);

/** Five rooms as tall panels in one row. A panel opens the room: photos to step through, the facts, and a way to book it. */
export function Rooms() {
  const s = useStay();
  const m = useMenu();
  const [at, setAt] = useState<number | null>(null);
  const [shot, setShot] = useState(0);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const room = at === null ? null : ROOMS[at];

  const openRoom = (i: number, el: HTMLButtonElement) => {
    opener.current = el;
    setAt(i);
    setShot(0);
    m.setOpen(true);
  };
  const book = () => {
    if (!room) return;
    s.setRoomKey(room.key);
    if (room.max < s.guests) s.setGuests(room.max);
    opener.current = null;
    m.close();
    window.setTimeout(() => document.getElementById("boeken")?.scrollIntoView({ behavior: "smooth", block: "start" }), 90);
  };
  const slide = (dir: number) => {
    const el = row.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".t-room");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 280) + 16), behavior: "smooth" });
  };

  useEffect(() => {
    if (m.open) closeBtn.current?.focus({ preventScroll: true });
    else opener.current?.focus({ preventScroll: true });
  }, [m.open]);
  useEffect(() => {
    if (!m.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setShot((n) => (n + 1) % 3);
      if (e.key === "ArrowLeft") setShot((n) => (n + 2) % 3);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [m.open]);

  return (
    <>
      <div className="t-rooms-row" ref={row}>
        {ROOMS.map((r, i) => (
          <article key={r.key} className="t-room" data-rv style={{ ["--i" as string]: i }}>
            <div className="t-room-img">
              <Pic img={I[r.shots[0].img]} alt={r.shots[0].alt} sizes="(min-width: 1100px) 19vw, (min-width: 700px) 300px, 72vw" style={{ objectPosition: r.pos }} />
              <span className="t-room-num" aria-hidden="true">
                {r.numeral}
              </span>
            </div>
            <h3>
              <button type="button" className="t-room-open" aria-haspopup="dialog" aria-controls="t-room-dlg" onClick={(e) => openRoom(i, e.currentTarget)}>
                {r.name}
              </button>
            </h3>
            <p className="t-room-facts">
              {r.size} m² · {r.view.toLowerCase()}
            </p>
            <p className="t-room-price">
              vanaf <b>{eur(r.price)}</b> per nacht
            </p>
            <span className="t-room-more" aria-hidden="true">
              Bekijk kamer
            </span>
          </article>
        ))}
      </div>
      <div className="t-rooms-ctl">
        <button type="button" onClick={() => slide(-1)} aria-label="Vorige kamers">
          <Arrow back />
        </button>
        <span>Veeg voor alle vijf</span>
        <button type="button" onClick={() => slide(1)} aria-label="Volgende kamers">
          <Arrow />
        </button>
      </div>

      <div id="t-room-dlg" className={`t-dlg${m.open ? " is-open" : ""}`} inert={!m.open}>
        <div className="t-dlg-scrim" onClick={m.close} aria-hidden="true" />
        <div className="t-dlg-panel" role="dialog" aria-modal="true" aria-labelledby="t-dlg-h" onKeyDown={trapTab}>
          <button type="button" ref={closeBtn} className="t-dlg-x" onClick={m.close} aria-label="Sluit dit venster">
            <Cross />
          </button>
          {room && (
            <>
              <div className="t-dlg-media">
                {room.shots.map((sh, k) => (
                  <Pic key={room.key + sh.img} img={I[sh.img]} alt={sh.alt} sizes="(min-width: 900px) 46vw, 100vw" className={k === shot ? "is-on" : undefined} />
                ))}
                <div className="t-dlg-step">
                  <button type="button" onClick={() => setShot((n) => (n + 2) % 3)} aria-label="Vorige foto">
                    <Arrow back />
                  </button>
                  <p aria-live="polite">
                    <b>
                      {shot + 1} / {room.shots.length}
                    </b>
                    <span>{room.shots[shot].cap}</span>
                  </p>
                  <button type="button" onClick={() => setShot((n) => (n + 1) % 3)} aria-label="Volgende foto">
                    <Arrow />
                  </button>
                </div>
              </div>
              <div className="t-dlg-body">
                <p className="t-dlg-kicker">
                  {room.numeral} · {room.name.includes("suite") ? "Suite" : "Kamer"}
                </p>
                <h3 id="t-dlg-h">{room.name}</h3>
                <p className="t-dlg-line">{room.line}</p>
                <p className="t-dlg-text">{room.text}</p>
                <dl className="t-dlg-facts">
                  <div>
                    <dt>Oppervlakte</dt>
                    <dd>{room.size} m²</dd>
                  </div>
                  <div>
                    <dt>Bed</dt>
                    <dd>{room.bed}</dd>
                  </div>
                  <div>
                    <dt>Uitzicht</dt>
                    <dd>{room.view}</dd>
                  </div>
                  <div>
                    <dt>Gasten</dt>
                    <dd>Tot {room.max}</dd>
                  </div>
                </dl>
                <h4>Bij de kamer</h4>
                <ul className="t-dlg-incl">
                  {room.incl.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="t-dlg-foot">
                  <p>
                    <b>{eur(room.price)}</b> per nacht
                    {s.nights ? (
                      <span>
                        {nightsWord(s.nights)}: {eur(s.nights * room.price)}
                      </span>
                    ) : (
                      <span>inclusief btw</span>
                    )}
                  </p>
                  <button type="button" className="t-btn" onClick={book}>
                    <span>Boek deze kamer</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Gallery ── */
const GALLERY: Shot[] = [
  { img: "canal-day", alt: "De gracht op een zomerdag, met bootjes langs de kade en bomen vol blad", cap: "De gracht voor de deur" },
  { img: "atrium", alt: "Het atrium met een glazen dak, hanglampen en een stalen trap", cap: "Het atrium, ooit de pakzolder" },
  { img: "pillow", alt: "Witte kussens tegen een donkerblauwe wand met een messing bedlamp", cap: "De Brugkamer" },
  { img: "coffee", alt: "Drie handen proosten met koppen koffie boven een houten tafel", cap: "Koffie in de bibliotheek" },
  { img: "bar", alt: "De bar met flessen tot aan het plafond en gekleurd glas-in-lood", cap: "Bar Schemer" },
  { img: "table", alt: "Een houten tafel van bovenaf, vol broodjes, kaas en sap", cap: "Lunch in restaurant Lente" },
  { img: "bath", alt: "Een vrijstaand bad voor een wand van natuursteen", cap: "Het bad in de Atelier suite" },
  { img: "room-mirror", alt: "Een opgemaakt bed met een dienblad onder een vergulde spiegel", cap: "Ontbijt op bed, op verzoek" },
];

/** A composed grid; any photo opens larger, with previous, next and Escape. */
export function Gallery() {
  const m = useMenu();
  const [at, setAt] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const n = GALLERY.length;
  const cur = at === null ? null : GALLERY[at];
  const step = (d: number) => setAt((a) => ((a ?? 0) + d + n) % n);

  useEffect(() => {
    if (m.open) closeBtn.current?.focus({ preventScroll: true });
    else opener.current?.focus({ preventScroll: true });
  }, [m.open]);
  useEffect(() => {
    if (!m.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setAt((a) => ((a ?? 0) + 1) % n);
      if (e.key === "ArrowLeft") setAt((a) => ((a ?? 0) + n - 1) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [m.open, n]);

  return (
    <>
      <ul className="t-gal">
        {GALLERY.map((g, i) => (
          <li key={g.img} className={`g${i + 1}`} data-rv="plate" style={{ ["--i" as string]: i % 3 }}>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-controls="t-lightbox"
              aria-label={`Vergroot foto: ${g.cap}`}
              onClick={(e) => {
                opener.current = e.currentTarget;
                setAt(i);
                m.setOpen(true);
              }}
            >
              <Pic img={I[g.img]} alt={g.alt} sizes="(min-width: 900px) 50vw, 100vw" />
              <span aria-hidden="true">{g.cap}</span>
            </button>
          </li>
        ))}
      </ul>
      <div id="t-lightbox" className={`t-lb${m.open ? " is-open" : ""}`} inert={!m.open} role="dialog" aria-modal="true" aria-label="Foto vergroot" onKeyDown={trapTab}>
        <div className="t-lb-scrim" onClick={m.close} aria-hidden="true" />
        <button type="button" ref={closeBtn} className="t-lb-x" onClick={m.close} aria-label="Sluit de foto">
          <Cross />
        </button>
        {cur && (
          <>
            <figure className="t-lb-fig" key={cur.img}>
              <Pic img={I[cur.img]} alt={cur.alt} sizes="100vw" />
            </figure>
            <div className="t-lb-bar">
              <button type="button" onClick={() => step(-1)} aria-label="Vorige foto">
                <Arrow back />
              </button>
              <p aria-live="polite">
                <b>
                  {(at ?? 0) + 1} / {n}
                </b>
                <span>{cur.cap}</span>
              </p>
              <button type="button" onClick={() => step(1)} aria-label="Volgende foto">
                <Arrow />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ── The neighbourhood: a walking compass ── */
const PLACES = [
  { key: "jordaan", name: "De Jordaan", time: "4 min lopen", x: 162.6, y: 193.4, text: "Smalle straten, hofjes en galeries. Op zaterdag staat er markt en ruikt de hele buurt naar appeltaart." },
  { key: "negen", name: "De Negen Straatjes", time: "6 min lopen", x: 210.1, y: 257.1, text: "Negen dwarsstraten vol kleine winkels, vintage en koffie. Beste moment: doordeweeks, voor elven." },
  { key: "dam", name: "De Dam", time: "9 min lopen", x: 285.7, y: 207.5, text: "Het oudste plein van de stad. Je loopt erheen over twee grachten en bent er voor je koffie koud is." },
  { key: "station", name: "Centraal Station", time: "14 min lopen", x: 300.4, y: 115.8, text: "Vanaf Schiphol zit je in zeventien minuten op Centraal. Daarna loop je langs het water naar het hotel." },
  { key: "ij", name: "Het IJ en de pont", time: "16 min lopen", x: 249.3, y: 64.7, text: "De pont naar Noord vaart dag en nacht en kost niets. Neem een fiets mee en je bent zo in een andere stad." },
  { key: "vondel", name: "Het Vondelpark", time: "9 min fietsen", x: 85.4, y: 314.6, text: "Het park van de stad. Wij pakken een picknickmand voor je in als je dat een dag van tevoren zegt." },
  { key: "museum", name: "Het museumkwartier", time: "10 min fietsen", x: 155.7, y: 365.2, text: "De grote musea liggen rond één plein. Onze receptie reserveert je tijdslot, dan sla je de rij over." },
] as const;

/** Rings of five, ten, fifteen and twenty-five minutes around the house. Choosing a place lights it up. */
export function Compass() {
  const [at, setAt] = useState(0);
  const p = PLACES[at];
  return (
    <div className="t-comp">
      <div className="t-comp-map" data-rv="map">
        <svg viewBox="0 0 400 400" role="img" aria-label="Kaart met looptijden vanaf Hotel Ostara">
          <g className="t-comp-rings" fill="none">
            <circle cx="200" cy="200" r="48" />
            <circle cx="200" cy="200" r="96" />
            <circle cx="200" cy="200" r="140" />
            <circle cx="200" cy="200" r="184" />
          </g>
          <path className="t-comp-cross" d="M200 6v388M6 200h388" />
          <g className="t-comp-min">
            <text x="204" y="148">5 min</text>
            <text x="204" y="100">10 min</text>
            <text x="204" y="56">15 min</text>
            <text x="204" y="12">25 min</text>
          </g>
          <text className="t-comp-n" x="200" y="-6" textAnchor="middle">
            N
          </text>
          <line className="t-comp-ray" key={p.key} x1="200" y1="200" x2={p.x} y2={p.y} />
          {PLACES.map((q, i) => (
            <g key={q.key} className={`t-comp-dot${i === at ? " is-on" : ""}`} transform={`translate(${q.x} ${q.y})`} onClick={() => setAt(i)} onMouseEnter={() => setAt(i)}>
              <circle className="t-comp-hit" r="20" />
              <circle className="t-comp-halo" r="13" />
              <circle className="t-comp-pt" r="5" />
            </g>
          ))}
          <g className="t-comp-home" transform="translate(200 200)">
            <circle r="17" />
            <path d="M-8 3a8 8 0 0 1 16 0M-11 3h22M-6 7h12" />
          </g>
        </svg>
      </div>
      <div className="t-comp-side">
        <ul className="t-comp-list" data-rv>
          {PLACES.map((q, i) => (
            <li key={q.key}>
              <button type="button" aria-pressed={i === at} onClick={() => setAt(i)} onMouseEnter={() => setAt(i)} onFocus={() => setAt(i)}>
                <span>{q.name}</span>
                <i aria-hidden="true" />
                <em>{q.time}</em>
              </button>
            </li>
          ))}
        </ul>
        <p className="t-comp-text" key={p.key} aria-live="polite">
          <b>{p.name}.</b> {p.text}
        </p>
      </div>
    </div>
  );
}

/* ── Booking ── */
const EXTRAS = [
  { key: "ontbijt", name: "Ontbijt in Lente", note: "€ 24 per persoon per nacht", per: "pn" as const, price: 24 },
  { key: "late", name: "Late check-out", note: "Je kamer tot 14.00 uur, € 35", per: "once" as const, price: 35 },
  { key: "fietsen", name: "Fietsen van het huis", note: "€ 18 per fiets per dag", per: "pn" as const, price: 18 },
];

/** The booking: room, dates, guests and extras, with a bill that adds up while you choose. Nothing is sent. */
export function Booking() {
  const s = useStay();
  const today = useToday();
  const [extras, setExtras] = useState<Record<string, boolean>>({});
  const n = s.nights;
  const lines = EXTRAS.filter((x) => extras[x.key]).map((x) => ({ name: x.name, sum: x.per === "once" ? x.price : x.price * s.guests * Math.max(n, 1) }));
  const roomSum = s.room.price * Math.max(n, 1);
  const total = roomSum + lines.reduce((a, l) => a + l.sum, 0);
  return (
    <DemoForm className="t-form" done={`Zo zou het werken: de ${s.room.name} voor ${guestsWord(s.guests)}${n ? `, ${nightsWord(n)}` : ""}. Dit is een demo-ontwerp van HOPI, er is niets verzonden.`}>
      <div className="t-form-fields">
        <fieldset>
          <legend>
            <b>I</b> Kies je kamer
          </legend>
          <div className="t-opts">
            {ROOMS.map((r) => {
              const off = r.max < s.guests;
              return (
                <label key={r.key} className="t-opt" data-off={off || undefined}>
                  <input type="radio" name="kamer" value={r.key} checked={s.room.key === r.key} disabled={off} onChange={() => s.setRoomKey(r.key)} />
                  <span className="t-opt-name">{r.name}</span>
                  <span className="t-opt-meta">{off ? `Tot ${r.max} gasten` : `${r.size} m² · tot ${r.max} gasten`}</span>
                  <span className="t-opt-price">{eur(r.price)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <b>II</b> Wanneer en met wie
          </legend>
          <div className="t-when">
            <label className="t-field">
              <span>Aankomst</span>
              <input type="date" name="aankomst" required value={s.arrive} min={today || undefined} onChange={(e) => s.setArrive(e.target.value)} />
            </label>
            <label className="t-field">
              <span>Vertrek</span>
              <input type="date" name="vertrek" required value={s.depart} min={s.arrive ? addDays(s.arrive, 1) : today || undefined} onChange={(e) => s.setDepart(e.target.value)} />
            </label>
            <div className="t-field">
              <span>Gasten</span>
              <Stepper value={s.guests} min={1} max={4} onChange={s.setGuests} label="Aantal gasten" />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <b>III</b> Maak het compleet
          </legend>
          <div className="t-togs">
            {EXTRAS.map((x) => (
              <label key={x.key} className="t-tog">
                <input type="checkbox" role="switch" name={x.key} checked={!!extras[x.key]} onChange={(e) => setExtras((o) => ({ ...o, [x.key]: e.target.checked }))} />
                <i aria-hidden="true" />
                <span>
                  <b>{x.name}</b>
                  <small>{x.note}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <b>IV</b> Je gegevens
          </legend>
          <div className="t-who">
            <label className="t-field">
              <span>Naam</span>
              <input type="text" name="naam" autoComplete="name" required />
            </label>
            <label className="t-field">
              <span>E-mail</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <label className="t-field t-field-wide">
              <span>Iets te vieren of een wens?</span>
              <input type="text" name="wens" />
            </label>
          </div>
        </fieldset>
      </div>

      <aside className="t-bill" aria-label="Samenvatting van je verblijf">
        <Sun />
        <h3>Je verblijf</h3>
        <dl aria-live="polite">
          <div>
            <dt>Kamer</dt>
            <dd>{s.room.name}</dd>
          </div>
          <div>
            <dt>Data</dt>
            <dd>{n ? `${nice(s.arrive)} tot ${nice(s.depart)}` : s.hint || "Nog niet gekozen"}</dd>
          </div>
          <div>
            <dt>Gasten</dt>
            <dd>{guestsWord(s.guests)}</dd>
          </div>
        </dl>
        <ul className="t-bill-lines" aria-live="polite">
          <li>
            <span>{n ? `${nightsWord(n)} × ${eur(s.room.price)}` : "Kamer, per nacht"}</span>
            <i aria-hidden="true" />
            <b>{eur(roomSum)}</b>
          </li>
          {lines.map((l) => (
            <li key={l.name}>
              <span>{l.name}</span>
              <i aria-hidden="true" />
              <b>{eur(l.sum)}</b>
            </li>
          ))}
        </ul>
        <p className="t-bill-total" aria-live="polite">
          <span>{n ? "Totaal" : "Per nacht"}</span>
          <b>{eur(total)}</b>
        </p>
        <button type="submit" className="t-btn t-btn-wide">
          <span>Vraag deze boeking aan</span>
        </button>
        <p className="t-bill-note">Inclusief btw, exclusief toeristenbelasting. Gratis annuleren tot 48 uur voor aankomst.</p>
      </aside>
    </DemoForm>
  );
}
