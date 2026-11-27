"use client";

import { useState } from "react";
import { DemoForm, useMenu } from "@/demos/kit";
import { IMAGES } from "@/demos/images";
import { Pic } from "@/demos/pic";

const I = IMAGES.restaurant;
const LINKS = [
  ["#verhaal", "Het verhaal"],
  ["#menu", "Menu"],
  ["#wijn", "Wijn & bar"],
  ["#galerij", "Galerij"],
  ["#reserveren", "Reserveren"],
] as const;

/** Header: transparent over the opening photo, solid once the page moves. */
export function Nav() {
  const m = useMenu();
  return (
    <>
      <header className="v-nav">
        <a href="#top" className="v-logo" aria-label="Vesper, naar boven">
          Vesper
        </a>
        <nav aria-label="Hoofdmenu" className="v-links">
          {LINKS.slice(0, 4).map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#reserveren" className="v-btn v-btn-line v-nav-cta">
          Reserveer een tafel
        </a>
        <button type="button" className="v-burger" aria-expanded={m.open} aria-controls="v-menu" onClick={m.toggle}>
          <span>{m.open ? "Sluit" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="v-menu" className={`v-menu${m.open ? " is-open" : ""}`} inert={!m.open}>
        <nav aria-label="Menu">
          {LINKS.map(([href, label], i) => (
            <a key={href} href={href} onClick={m.close} style={{ ["--i" as string]: i }}>
              <small>0{i + 1}</small>
              {label}
            </a>
          ))}
        </nav>
        <p>
          Woensdag t/m zondag vanaf 18.00 uur
          <br />
          Grachtengordel, Amsterdam
        </p>
      </div>
    </>
  );
}

type Dish = { name: string; text: string; price?: string };
const CARDS: { key: string; label: string; note: string; img: keyof typeof I; alt: string; dishes: Dish[] }[] = [
  {
    key: "proeverij",
    label: "Proeverij",
    note: "Zeven gangen · € 118 · wijnarrangement € 72",
    img: "dish-fish",
    alt: "Gebakken vis in een donkere jus met groenten",
    dishes: [
      { name: "Oester, komkommer, dille", text: "Zeeuwse platte oester, ingelegde komkommer, dille-olie" },
      { name: "Biet in zoutkorst", text: "Gerookte crème fraîche, hazelnoot, mierikswortel" },
      { name: "Noordzeetong", text: "Beurre blanc met vadouvan, venkel van de barbecue" },
      { name: "Kalfszwezerik", text: "Morilles, erwt, jus van gebrande ui" },
      { name: "Hert uit de Veluwe", text: "Knolselderij, zwarte knoflook, rode port" },
      { name: "Geitenkaas van de boerderij", text: "Honing uit de stad, zuurdesem, tijm" },
      { name: "Bloedsinaasappel", text: "Yoghurt van schapenmelk, olijfolie, zeezout" },
    ],
  },
  {
    key: "kaart",
    label: "À la carte",
    note: "Kies zelf · twee gangen vanaf € 54",
    img: "dish-beef",
    alt: "Ossenhaas met groene asperges op een wit bord",
    dishes: [
      { name: "Tartaar van rund", text: "Eidooier, kappertjes, brioche uit eigen oven", price: "19" },
      { name: "Gegrilde prei", text: "Mosselen, beurre noisette, bieslook", price: "17" },
      { name: "Ossenhaas van de grill", text: "Groene asperge, pommes Anna, bordelaise", price: "42" },
      { name: "Zalm op de huid", text: "Spinazie, citroen, beurre blanc", price: "34" },
      { name: "Risotto van parelgort", text: "Paddenstoelen, oude kaas, kervel", price: "28" },
      { name: "Hele tarbot voor twee", text: "Aan tafel gefileerd, met seizoensgroenten", price: "96" },
    ],
  },
  {
    key: "na",
    label: "Na",
    note: "Zoet, kaas en een laatste glas",
    img: "dessert",
    alt: "Dessert waar karamel over wordt geschonken",
    dishes: [
      { name: "Karamel, banaan, cacao", text: "Aan tafel afgemaakt met warme karamel", price: "14" },
      { name: "Tarte tatin voor twee", text: "Vanille-ijs van de dag, calvados", price: "24" },
      { name: "Vijf kazen", text: "Van Nederlandse bodem, met vijgenbrood", price: "18" },
      { name: "Koffie en friandises", text: "Uit de branderij om de hoek", price: "9" },
    ],
  },
];

/** The menu: three cards, one photo that changes with the card. */
export function MenuCards() {
  const [at, setAt] = useState(0);
  const card = CARDS[at];
  return (
    <div className="v-menu-grid">
      <div className="v-menu-photo" data-rv="img">
        {CARDS.map((c, i) => (
          <Pic key={c.key} img={I[c.img]} alt={c.alt} sizes="(min-width: 900px) 40vw, 100vw" className={i === at ? "is-on" : undefined} />
        ))}
      </div>
      <div className="v-menu-card">
        <div className="v-tabs" role="tablist" aria-label="Kaarten">
          {CARDS.map((c, i) => (
            <button key={c.key} type="button" role="tab" id={`v-tab-${c.key}`} aria-selected={i === at} aria-controls="v-tabpanel" onClick={() => setAt(i)}>
              {c.label}
            </button>
          ))}
        </div>
        <div id="v-tabpanel" role="tabpanel" aria-labelledby={`v-tab-${card.key}`} key={card.key} className="v-dishes">
          <p className="v-menu-note">{card.note}</p>
          <ol>
            {card.dishes.map((d, i) => (
              <li key={d.name} style={{ ["--i" as string]: i }}>
                <div>
                  <h3>{d.name}</h3>
                  <p>{d.text}</p>
                </div>
                {d.price ? <span className="v-price">{d.price}</span> : <span className="v-course">{String(i + 1).padStart(2, "0")}</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

const TIMES = ["18.00", "18.30", "19.00", "19.30", "20.00", "20.30", "21.00"];

/** Reservation: a choice of party size and time, then the details. Nothing is sent. */
export function Reserve() {
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("19.30");
  return (
    <DemoForm className="v-form" done={`Zo zou het werken: een tafel voor ${guests} om ${time} uur. Dit is een demo-ontwerp van HOPI, er is niets verzonden.`}>
      <fieldset>
        <legend>Met hoeveel gasten?</legend>
        <div className="v-chips">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button key={n} type="button" aria-pressed={guests === n} onClick={() => setGuests(n)}>
              {n}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Hoe laat?</legend>
        <div className="v-chips v-chips-wide">
          {TIMES.map((t) => (
            <button key={t} type="button" aria-pressed={time === t} onClick={() => setTime(t)}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="v-fields">
        <label>
          <span>Datum</span>
          <input type="date" name="date" required />
        </label>
        <label>
          <span>Naam</span>
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Telefoon</span>
          <input type="tel" name="phone" autoComplete="tel" />
        </label>
        <label className="v-field-wide">
          <span>Iets te vieren of een dieetwens?</span>
          <input type="text" name="note" />
        </label>
      </div>
      <button type="submit" className="v-btn v-btn-fill">
        Reserveer voor {guests} om {time}
      </button>
    </DemoForm>
  );
}
