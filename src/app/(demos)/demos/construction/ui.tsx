"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Check, Hammer, House, Phone, Plus, Warehouse, Wrench } from "lucide-react";
import { DemoForm, useMenu } from "@/demos/kit";
import { IMAGES } from "@/demos/images";
import { Pic } from "@/demos/pic";

const I = IMAGES.construction;
const LINKS = [
  ["#diensten", "Diensten"],
  ["#projecten", "Projecten"],
  ["#werkwijze", "Werkwijze"],
  ["#bedrijf", "Het bedrijf"],
  ["#offerte", "Offerte"],
] as const;

/** Header: a solid bar with the logo, the sections and the one thing a visitor should do. */
export function Nav() {
  const m = useMenu();
  return (
    <>
      <header className={`k-nav${m.open ? " is-menu" : ""}`}>
        <a href="#top" className="k-logo" aria-label="Kade Bouw, naar boven" onClick={m.close}>
          <i aria-hidden="true" />
          <b>Kade</b>
          <span>Bouw</span>
        </a>
        <nav aria-label="Hoofdmenu" className="k-links">
          {LINKS.slice(0, 4).map(([href, label], i) => (
            <a key={href} href={href}>
              <small>0{i + 1}</small>
              {label}
            </a>
          ))}
        </nav>
        <a href="tel:0100000000" className="k-nav-tel">
          <Phone aria-hidden="true" />
          010 000 00 00
        </a>
        <a href="#offerte" className="k-btn k-btn-y k-nav-cta" onClick={m.close}>
          Offerte
          <span> aanvragen</span>
        </a>
        <button type="button" className="k-burger" aria-expanded={m.open} aria-controls="k-menu" aria-label={m.open ? "Sluit het menu" : "Open het menu"} onClick={m.toggle}>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="k-menu" className={`k-menu${m.open ? " is-open" : ""}`} inert={!m.open}>
        <nav aria-label="Menu">
          {LINKS.map(([href, label], i) => (
            <a key={href} href={href} onClick={m.close} style={{ ["--i" as string]: i }}>
              <small>0{i + 1}</small>
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="k-menu-foot">
          <a href="tel:0100000000" onClick={m.close}>
            <Phone aria-hidden="true" />
            010 000 00 00
          </a>
          <p>Ma t/m vr, 7.00 tot 17.00 uur · Spaanse Polder, Rotterdam</p>
        </div>
      </div>
    </>
  );
}

/**
 * A key figure that counts up the first time it is seen. The final value is in the markup,
 * so it is right without scripts and with reduced motion; the count only rewrites the text.
 */
export function Count({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const text = (n: number) => n.toFixed(decimals).replace(".", ",");
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const show = (n: number) => (el.textContent = n.toFixed(decimals).replace(".", ","));
    let raf = 0;
    show(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1500;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          show(to * (1 - Math.pow(1 - p, 4)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      show(to);
    };
  }, [to, decimals]);
  return (
    <>
      <span className="k-sr">{text(to)}</span>
      <span ref={ref} aria-hidden="true" suppressHydrationWarning>
        {text(to)}
      </span>
    </>
  );
}

/* ── Projects ── */
type Cat = "nieuwbouw" | "renovatie" | "aanbouw" | "bedrijfspand";
const CATS: { key: Cat | "alles"; label: string }[] = [
  { key: "alles", label: "Alles" },
  { key: "nieuwbouw", label: "Nieuwbouw" },
  { key: "renovatie", label: "Renovatie" },
  { key: "aanbouw", label: "Aanbouw" },
  { key: "bedrijfspand", label: "Bedrijfspand" },
];
const CAT_LABEL: Record<Cat, string> = { nieuwbouw: "Nieuwbouw", renovatie: "Renovatie", aanbouw: "Aanbouw", bedrijfspand: "Bedrijfspand" };

type Project = { id: string; cat: Cat; name: string; place: string; img: keyof typeof I; alt: string; pos?: string; area: string; time: string; year: string; text: string; build: string; client: string };
const PROJECTS: Project[] = [
  {
    id: "plas",
    cat: "nieuwbouw",
    name: "Stadsvilla aan de plas",
    place: "Hillegersberg",
    img: "house-modern",
    alt: "Moderne villa met houten gevel en een zwart bijgebouw",
    area: "286 m²",
    time: "11 mnd",
    year: "2024",
    text: "Vrijstaande villa met houten gevel en een zwart bijgebouw. Gasloos, met warmtepomp en 28 zonnepanelen op het platte dak.",
    build: "Houtskelet op betonvloer",
    client: "Particulier",
  },
  {
    id: "leefkeuken",
    cat: "aanbouw",
    name: "Uitbouw met leefkeuken",
    place: "Schiebroek",
    img: "kitchen-white",
    alt: "Lichte leefkeuken met kookeiland en vier houten krukken",
    area: "38 m²",
    time: "9 wkn",
    year: "2024",
    text: "Vier meter uitgebouwd over de volle breedte van het huis, met een lichtstraat en een kookeiland van ruim drie meter.",
    build: "Staalportaal, geïsoleerd plat dak",
    client: "Particulier, bleef thuis wonen",
  },
  {
    id: "tuinwoning",
    cat: "nieuwbouw",
    name: "Zwarte tuinwoning",
    place: "Kralingen",
    img: "house-dark",
    alt: "Zwarte woning met verlichte houten entree in de schemering",
    pos: "50% 72%",
    area: "198 m²",
    time: "9 mnd",
    year: "2023",
    text: "Compacte woning op een binnenterrein, bekleed met zwart staal en warm hout bij de entree. De kavel is nog geen tien meter breed.",
    build: "Staalframe, stalen gevelbeplating",
    client: "Particulier",
  },
  {
    id: "badkamer",
    cat: "renovatie",
    name: "Badkamer in herenhuis",
    place: "Delfshaven",
    img: "bathroom-dark",
    alt: "Donkere badkamer met vrijstaand wit bad en inloopdouche",
    pos: "50% 82%",
    area: "14 m²",
    time: "4 wkn",
    year: "2025",
    text: "Van oude slaapkamer naar badkamer met vrijstaand bad en inloopdouche. Vloer verstevigd, leidingwerk vernieuwd, tegels tot het plafond.",
    build: "Houten balklaag verstevigd",
    client: "Particulier",
  },
  {
    id: "poolhouse",
    cat: "aanbouw",
    name: "Opbouw en poolhouse",
    place: "Rhoon",
    img: "pool-house",
    alt: "Woning met extra verdieping en houten poolhouse aan een zwembad",
    pos: "50% 62%",
    area: "62 m²",
    time: "4 mnd",
    year: "2023",
    text: "Een extra verdieping op de bestaande woning en een houten poolhouse langs het zwembad. De opbouw is in twee dagen geplaatst.",
    build: "Prefab houtbouw uit eigen werkplaats",
    client: "Particulier",
  },
  {
    id: "kantoor",
    cat: "bedrijfspand",
    name: "Kantoor met ontvangstruimte",
    place: "Spaanse Polder",
    img: "lounge",
    alt: "Ontvangstruimte met zwarte fauteuils en een glazen pui naar de binnentuin",
    area: "420 m²",
    time: "6 mnd",
    year: "2024",
    text: "Een oude loods omgebouwd tot kantoor met ontvangstruimte en een glazen pui naar de binnentuin. In drie fases gebouwd.",
    build: "Bestaand staalskelet, nieuwe gevel",
    client: "Ingenieursbureau, bleef open",
  },
  {
    id: "dertig",
    cat: "renovatie",
    name: "Jaren-dertigwoning",
    place: "Bergschenhoek",
    img: "house-brick",
    alt: "Bakstenen woning met leien dak en dakkapellen tussen de bomen",
    pos: "70% 50%",
    area: "172 m²",
    time: "5 mnd",
    year: "2024",
    text: "Compleet gerenoveerd met behoud van het metselwerk: nieuw dak met dakkapellen, vloerisolatie en nieuwe kozijnen.",
    build: "Van energielabel F naar A",
    client: "Particulier",
  },
  {
    id: "patio",
    cat: "nieuwbouw",
    name: "Witte patiowoning",
    place: "Nesselande",
    img: "house-white",
    alt: "Witte gestucte woning in gestapelde blokken met een tuinpad",
    pos: "50% 58%",
    area: "240 m²",
    time: "10 mnd",
    year: "2022",
    text: "Gestucte woning in gestapelde volumes rond een patio, met kozijnen die in het stucwerk verdwijnen.",
    build: "Kalkzandsteen, buitengevelisolatie",
    client: "Particulier",
  },
  {
    id: "bovenwoning",
    cat: "renovatie",
    name: "Bovenwoning met leefkeuken",
    place: "Oude Noorden",
    img: "kitchen-wood",
    alt: "Witte keuken met houten kookeiland, krukken en een roestvrijstalen afzuigkap",
    area: "96 m²",
    time: "10 wkn",
    year: "2025",
    text: "Twee kleine kamers en een keuken samengevoegd tot één leefkeuken. De draagmuur maakte plaats voor een stalen portaal.",
    build: "Staalportaal, nieuwe keuken op maat",
    client: "Particulier",
  },
  {
    id: "haven",
    cat: "bedrijfspand",
    name: "Werkgebouw aan de haven",
    place: "Waalhaven",
    img: "cranes-sky",
    alt: "Gebouw in de steigers met twee bouwkranen tegen een heldere lucht",
    area: "1.850 m²",
    time: "14 mnd",
    year: "2025",
    text: "Werkplaats met twee kantoorlagen voor een scheepsleverancier. De gevel is in elementen aangevoerd en in drie weken gesloten.",
    build: "Betonkern, stalen draagconstructie",
    client: "Scheepsleverancier",
  },
];

/** The portfolio: filter buttons that really filter, a count, and cards that open on hover, focus or tap. */
export function Portfolio() {
  const [cat, setCat] = useState<Cat | "alles">("alles");
  const [open, setOpen] = useState<string | null>(null);
  const list = cat === "alles" ? PROJECTS : PROJECTS.filter((p) => p.cat === cat);
  const pick = (c: Cat | "alles") => {
    setCat(c);
    setOpen(null);
  };
  return (
    <div className="k-folio" data-rv="cards">
      <div className="k-filter-row">
        <div className="k-filter" role="group" aria-label="Filter projecten op soort werk">
          {CATS.map((c) => (
            <button key={c.key} type="button" aria-pressed={cat === c.key} onClick={() => pick(c.key)}>
              {c.label}
              <small>{c.key === "alles" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === c.key).length}</small>
            </button>
          ))}
        </div>
        <p className="k-count" role="status" aria-live="polite">
          <b key={cat}>{String(list.length).padStart(2, "0")}</b>
          <span>
            van {PROJECTS.length} projecten
            <span className="k-sr"> getoond</span>
          </span>
        </p>
      </div>
      <ul className="k-cards" key={cat}>
        {list.map((p, i) => {
          const on = open === p.id;
          return (
            <li key={p.id} className={on ? "k-card is-open" : "k-card"} style={{ ["--i" as string]: i }}>
              <article>
                <div className="k-card-photo">
                  <Pic img={I[p.img]} alt={p.alt} sizes="(min-width: 1100px) 52vw, (min-width: 760px) 48vw, 84vw" style={p.pos ? { objectPosition: p.pos } : undefined} />
                  <p className="k-card-cat">
                    <b>{CAT_LABEL[p.cat]}</b>
                    <span>N° {String(PROJECTS.indexOf(p) + 1).padStart(2, "0")}</span>
                  </p>
                  <button type="button" className="k-card-btn" aria-expanded={on} aria-controls={`k-more-${p.id}`} onClick={() => setOpen(on ? null : p.id)}>
                    <span className="k-sr">{on ? `Sluit details van ${p.name}` : `Meer over ${p.name}`}</span>
                    <i aria-hidden="true">
                      <Plus />
                    </i>
                  </button>
                  <div className="k-card-more" id={`k-more-${p.id}`}>
                    <p>{p.text}</p>
                    <dl>
                      <div>
                        <dt>Bouwwijze</dt>
                        <dd>{p.build}</dd>
                      </div>
                      <div>
                        <dt>Opdrachtgever</dt>
                        <dd>{p.client}</dd>
                      </div>
                    </dl>
                    <a href="#offerte" data-k-pick={p.cat}>
                      Zoiets laten bouwen
                      <ArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className="k-card-body">
                  <h3>{p.name}</h3>
                  <p>{p.place}</p>
                </div>
                <dl className="k-card-data">
                  <div>
                    <dt>Oppervlak</dt>
                    <dd>{p.area}</dd>
                  </div>
                  <div>
                    <dt>Doorlooptijd</dt>
                    <dd>{p.time}</dd>
                  </div>
                  <div>
                    <dt>Opgeleverd</dt>
                    <dd>{p.year}</dd>
                  </div>
                </dl>
              </article>
            </li>
          );
        })}
      </ul>
      <p className="k-swipe" aria-hidden="true">
        Veeg opzij voor meer projecten
        <ArrowRight />
      </p>
    </div>
  );
}

/* ── Quote request ── */
const KINDS = [
  { key: "nieuwbouw", label: "Nieuwbouw", text: "Een nieuwe woning, van kavel tot sleutel", Icon: House },
  { key: "renovatie", label: "Renovatie", text: "Verbouwen, isoleren, keuken of badkamer", Icon: Hammer },
  { key: "aanbouw", label: "Aanbouw of opbouw", text: "Uitbouw, extra verdieping of dakkapel", Icon: Building2 },
  { key: "bedrijfspand", label: "Bedrijfspand", text: "Kantoor, werkplaats of hal", Icon: Warehouse },
  { key: "onderhoud", label: "Onderhoud", text: "Herstel, dak, kozijnen en voegwerk", Icon: Wrench },
] as const;
const SIZES = ["Tot 25 m²", "25 tot 75 m²", "75 tot 150 m²", "Meer dan 150 m²"];
const WHENS = ["Zo snel mogelijk", "Binnen 3 maanden", "Binnen een jaar", "Ik oriënteer me nog"];
const BUDGETS = ["Tot € 50.000", "€ 50.000 tot 150.000", "€ 150.000 tot 400.000", "Meer dan € 400.000", "Weet ik nog niet"];
const STEP_NAMES = ["Soort werk", "Omvang en planning", "Gegevens"];

function Chips({ legend, options, value, onPick }: { legend: string; options: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <fieldset className="k-chipset">
      <legend>{legend}</legend>
      <div className="k-chips">
        {options.map((o) => (
          <button key={o} type="button" aria-pressed={value === o} onClick={() => onPick(o)}>
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/** Quote request in three short steps. Nothing is sent: DemoForm says so. */
export function Quote() {
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [kind, setKind] = useState<string>("");
  const [size, setSize] = useState(SIZES[1]);
  const [when, setWhen] = useState(WHENS[1]);
  const [budget, setBudget] = useState(BUDGETS[4]);
  const head = useRef<HTMLParagraphElement>(null);
  const chosen = KINDS.find((k) => k.key === kind);

  // Links elsewhere on the page ("Zoiets laten bouwen") can choose the kind of work in advance.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("[data-k-pick]");
      const k = a?.getAttribute("data-k-pick");
      if (!k || !KINDS.some((x) => x.key === k)) return;
      setKind(k);
      setStep(0);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const go = (n: number) => {
    setStep(n);
    setReached((r) => Math.max(r, n));
    head.current?.focus({ preventScroll: true });
  };
  const summary = chosen ? `${chosen.label} · ${size.toLowerCase()} · ${when.toLowerCase()}` : "";

  return (
    <DemoForm
      className="k-form"
      done={`Zo zou het werken: je aanvraag voor ${chosen ? chosen.label.toLowerCase() : "een project"} (${size.toLowerCase()}, ${when.toLowerCase()}) ligt klaar. Dit is een demo-ontwerp van HOPI, er is niets verzonden.`}
    >
      <div className="k-form-top">
        <p className="k-form-step" ref={head} tabIndex={-1}>
          Stap <b>{step + 1}</b> van 3 <span>{STEP_NAMES[step]}</span>
        </p>
        <ol className="k-prog" aria-label="Voortgang van de aanvraag">
          {STEP_NAMES.map((s, i) => (
            <li key={s} aria-current={i === step ? "step" : undefined} data-done={i < step || undefined}>
              <button type="button" disabled={i > reached} onClick={() => go(i)}>
                <b>{i < step ? <Check aria-hidden="true" /> : i + 1}</b>
                <span>{s}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="k-prog-bar" aria-hidden="true">
          <i style={{ transform: `scaleX(${(step + 1) / 3})` }} />
        </div>
      </div>

      <div className="k-step" hidden={step !== 0}>
        <fieldset className="k-kinds-set">
          <legend>Wat wil je laten bouwen?</legend>
          <div className="k-kinds">
            {KINDS.map(({ key, label, text, Icon }) => (
              <button key={key} type="button" aria-pressed={kind === key} onClick={() => setKind(key)}>
                <Icon aria-hidden="true" />
                <b>{label}</b>
                <span>{text}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="k-form-nav">
          <p>{kind ? "Goed. Nog twee korte stappen." : "Kies één soort werk om verder te gaan."}</p>
          <button type="button" className="k-btn k-btn-k" disabled={!kind} onClick={() => go(1)}>
            Volgende stap
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="k-step" hidden={step !== 1}>
        <Chips legend="Hoe groot is het ongeveer?" options={SIZES} value={size} onPick={setSize} />
        <Chips legend="Wanneer wil je beginnen?" options={WHENS} value={when} onPick={setWhen} />
        <Chips legend="Welk budget heb je in gedachten?" options={BUDGETS} value={budget} onPick={setBudget} />
        <div className="k-form-nav">
          <button type="button" className="k-back" onClick={() => go(0)}>
            <ArrowLeft aria-hidden="true" />
            Vorige
          </button>
          <button type="button" className="k-btn k-btn-k" onClick={() => go(2)}>
            Volgende stap
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="k-step" hidden={step !== 2}>
        <p className="k-summary">
          <small>Je aanvraag</small>
          {summary}
          <span>{budget === BUDGETS[4] ? "Budget nog open" : `Budget ${budget.toLowerCase()}`}</span>
        </p>
        <div className="k-fields">
          <label>
            <span>Naam</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label>
            <span>Telefoon</span>
            <input type="tel" name="phone" autoComplete="tel" inputMode="tel" required />
          </label>
          <label>
            <span>E-mail</span>
            <input type="email" name="email" autoComplete="email" />
          </label>
          <label>
            <span>Plaats van het project</span>
            <input type="text" name="place" autoComplete="address-level2" />
          </label>
          <label className="k-field-wide">
            <span>Wat moeten we weten? (mag ook later)</span>
            <textarea name="note" rows={3} />
          </label>
        </div>
        <div className="k-form-nav">
          <button type="button" className="k-back" onClick={() => go(1)}>
            <ArrowLeft aria-hidden="true" />
            Vorige
          </button>
          <button type="submit" className="k-btn k-btn-y">
            Verstuur aanvraag
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </DemoForm>
  );
}
