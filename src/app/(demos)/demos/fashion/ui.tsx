"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Minus, Plus, Search, X } from "lucide-react";
import { DemoForm, useMenu } from "@/demos/kit";
import { IMAGES } from "@/demos/images";
import { Pic } from "@/demos/pic";

const I = IMAGES.fashion;
type ImgKey = keyof typeof I;

/* ── The catalogue ── */
type Cat = "alles" | "jassen" | "breisels" | "tops" | "broeken" | "accessoires";
const CATS: { key: Cat; label: string; long: string }[] = [
  { key: "alles", label: "Alles", long: "Alles bekijken" },
  { key: "jassen", label: "Jassen", long: "Jassen en mantels" },
  { key: "breisels", label: "Breisels", long: "Breisels" },
  { key: "tops", label: "Tops", long: "Tops en blouses" },
  { key: "broeken", label: "Broeken", long: "Broeken en pakjes" },
  { key: "accessoires", label: "Accessoires", long: "Accessoires" },
];

/** How a photo sits in its 4:5 frame: where it is anchored and how far it is enlarged. */
type Crop = { pos?: string; zoom?: number; origin?: string };
type Product = {
  id: string;
  art: string;
  name: string;
  kind: string;
  cat: Exclude<Cat, "alles">;
  price: number;
  color: string;
  hex: string;
  img: ImgKey;
  alt: string;
  crop?: Crop;
  detail: Crop;
  sizes: string[];
  out: string[];
  badge?: string;
  text: string;
  material: string;
  care: string;
};

const LETTERS = ["XS", "S", "M", "L", "XL"];
const NUMBERS = ["34", "36", "38", "40", "42", "44"];
const ONE = ["One size"];

/* In the order of arrival: the first is the newest. */
const PRODUCTS: Product[] = [
  {
    id: "margaux",
    art: "LA-07-001",
    name: "Blazer Margaux",
    kind: "Dubbelrijs blazer",
    cat: "jassen",
    price: 329,
    color: "Grijze ruit",
    hex: "#9b9895",
    img: "look-blazer",
    alt: "Model in een grijs geruite dubbelrijs blazer op een wit hemd",
    detail: { zoom: 1.7, origin: "42% 62%" },
    sizes: NUMBERS,
    out: ["34", "44"],
    badge: "Nieuw",
    text: "Dubbelrijs blazer met een iets verlengd silhouet en een schouder die zacht valt. Geweven in een fijne Prince-de-Galles-ruit met één rode draad, die je pas van dichtbij ziet.",
    material: "62% wol, 34% viscose, 4% elastaan. Voering van cupro, knopen van hoorn.",
    care: "Laten stomen. Tussendoor een nacht uithangen is meestal genoeg.",
  },
  {
    id: "sienna",
    art: "LA-07-002",
    name: "Bomber Sienna",
    kind: "Lichte bomber",
    cat: "jassen",
    price: 289,
    color: "Terracotta",
    hex: "#b5694a",
    img: "bomber",
    alt: "Terracotta bomberjack aan een hanger, omhooggehouden door een hand",
    detail: { zoom: 1.8, origin: "50% 78%" },
    sizes: LETTERS,
    out: ["XL"],
    badge: "Nieuw",
    text: "Een bomber zonder poespas: soepele twill met een zijdeachtige glans, een tweewegrits en een mouwzakje voor je sleutels. Valt recht en net op de heup.",
    material: "Buitenkant 58% lyocell, 42% katoen. Boorden van katoenrib, voering van gerecycleerd polyester.",
    care: "Wassen op 30 graden, binnenstebuiten. Niet in de droogkast.",
  },
  {
    id: "solene",
    art: "LA-07-003",
    name: "Trui Solène",
    kind: "Trui met intarsia",
    cat: "breisels",
    price: 219,
    color: "Karamel en ecru",
    hex: "#b5692f",
    img: "look-knit",
    alt: "Model aan het water in een trui met karamelkleurige en witte banen",
    crop: { pos: "50% 18%" },
    detail: { zoom: 1.9, origin: "45% 26%" },
    sizes: LETTERS,
    out: ["XS"],
    badge: "Nieuw",
    text: "Kort model met vleermuismouw en schuine banen in intarsia, dus ingebreid en niet opgedrukt. Stevig genoeg om zonder jas de deur uit te gaan.",
    material: "70% merinowol, 30% alpaca. Gebreid in Noord-Portugal.",
    care: "Handwas of wolprogramma, koud. Plat laten drogen op een handdoek.",
  },
  {
    id: "lune01",
    art: "LA-07-004",
    name: "Zonnebril Lune 01",
    kind: "Ronde zonnebril",
    cat: "accessoires",
    price: 149,
    color: "Goud en flessengroen",
    hex: "#2f4a45",
    img: "sunglasses",
    alt: "Ronde zonnebril met goudkleurig montuur en donkergroene glazen op wit marmer",
    crop: { pos: "50% 60%" },
    detail: { zoom: 1.6, origin: "45% 72%" },
    sizes: ONE,
    out: [],
    text: "Ons eerste montuur: rond, dun en licht. De glazen zijn mineraal en donkergroen, de neusvleugels verstelbaar. Komt in een etui van plantaardig gelooid leer.",
    material: "Montuur van roestvrij staal met een gouden afwerking. Minerale glazen, UV400, categorie 3.",
    care: "Schoonmaken met het bijgeleverde doekje. Bewaar de bril in het etui.",
  },
  {
    id: "colette",
    art: "LA-07-005",
    name: "Mantel Colette",
    kind: "Wollen mantel",
    cat: "jassen",
    price: 459,
    color: "Oudroze",
    hex: "#d6a79e",
    img: "look-arcade",
    alt: "Model in een oudroze wollen mantel onder een zuilengalerij",
    crop: { zoom: 1.45, origin: "50% 34%" },
    detail: { zoom: 2.3, origin: "50% 30%" },
    sizes: NUMBERS,
    out: ["36"],
    text: "De mantel waar het seizoen mee begon. Recht gesneden tot op de knie, met een verborgen knoopsluiting en diepe steekzakken. De kleur ligt tussen roze en zand en past daardoor bij alles.",
    material: "80% scheerwol, 20% polyamide. Volledig gevoerd met viscose.",
    care: "Laten stomen. Borstel de wol af en toe met een kleerborstel.",
  },
  {
    id: "celeste",
    art: "LA-07-006",
    name: "Broek Céleste",
    kind: "Satijnen broek",
    cat: "broeken",
    price: 169,
    color: "Poederroze",
    hex: "#d9a79a",
    img: "trousers",
    alt: "Poederroze satijnen broek met opgestikte zakken en een smalle enkel",
    crop: { pos: "50% 30%" },
    detail: { zoom: 1.9, origin: "50% 22%" },
    sizes: NUMBERS,
    out: ["42", "44"],
    text: "Hoge taille met elastiek in de rug, twee opgestikte zakken en een pijp die bij de enkel samenkomt. Mat satijn dat niet kreukt in de trein.",
    material: "100% viscose satijn uit gecertificeerde houtvezel.",
    care: "Wassen op 30 graden, fijne was. Strijken op de laagste stand, binnenstebuiten.",
  },
  {
    id: "basile",
    art: "LA-07-007",
    name: "Sweater Basile",
    kind: "Zware sweater",
    cat: "tops",
    price: 129,
    color: "Krijtwit",
    hex: "#f1eeea",
    img: "sweatshirt",
    alt: "Krijtwitte sweater met ronde hals, plat neergelegd",
    crop: { pos: "66% 50%" },
    detail: { zoom: 1.7, origin: "62% 30%" },
    sizes: LETTERS,
    out: [],
    text: "Zware, geruwde sweater van 420 gram met een ronde hals en brede boorden. Uniseks en ruim: neem je gewone maat voor een losse pasvorm.",
    material: "100% biologisch katoen, geruwd aan de binnenkant.",
    care: "Wassen op 30 graden. Krimpt niet, pilt niet.",
  },
  {
    id: "mistral",
    art: "LA-07-008",
    name: "Poncho Mistral",
    kind: "Gehaakte poncho",
    cat: "breisels",
    price: 179,
    color: "Ecru",
    hex: "#e9dfc8",
    img: "poncho",
    alt: "Ecru gehaakte poncho met franjes aan een houten hanger",
    detail: { zoom: 1.9, origin: "50% 80%" },
    sizes: ONE,
    out: [],
    text: "Open gehaakt in een honingraatsteek, met een V-hals en franjes die met de hand zijn aangeknoopt. Draag hem over een coltrui of in maart over een hemd.",
    material: "55% katoen, 45% linnen.",
    care: "Handwas, koud. Plat laten drogen en nooit ophangen als hij nat is.",
  },
  {
    id: "auguste",
    art: "LA-07-009",
    name: "Mantel Auguste",
    kind: "Uniseks mantel",
    cat: "jassen",
    price: 429,
    color: "Camel",
    hex: "#c08a5a",
    img: "look-man",
    alt: "Model op een houten kruk in een camelkleurige mantel en een lichte broek",
    crop: { pos: "50% 12%" },
    detail: { zoom: 1.8, origin: "50% 24%" },
    sizes: LETTERS,
    out: ["S"],
    text: "Een ongevoerde mantel in dubbel geweven wol, met een brede revers en één knoop. Uniseks gesneden: de schouder valt iets af, de mouw is lang genoeg om op te stropen.",
    material: "90% wol, 10% kasjmier. Dubbel geweven, daarom zonder voering.",
    care: "Laten stomen. Luchten op een brede hanger.",
  },
  {
    id: "romy",
    art: "LA-07-010",
    name: "Playsuit Romy",
    kind: "Playsuit met ceintuur",
    cat: "broeken",
    price: 189,
    color: "Mosgroen",
    hex: "#4a5140",
    img: "romper",
    alt: "Mosgroene playsuit met smalle bandjes en een ceintuur",
    crop: { pos: "56% 50%" },
    detail: { zoom: 1.8, origin: "58% 42%" },
    sizes: NUMBERS,
    out: ["34"],
    text: "Kort pakje met gevlochten schouderbandjes, een V-hals en een ceintuur met beklede gesp. In de winter met een maillot en de blazer, in juni zonder alles.",
    material: "100% lyocell.",
    care: "Wassen op 30 graden, fijne was. Hangend laten drogen.",
  },
  {
    id: "nocturne",
    art: "LA-07-011",
    name: "Top Nocturne",
    kind: "Top van tule",
    cat: "tops",
    price: 149,
    color: "Zwart",
    hex: "#1a1917",
    img: "look-dark",
    alt: "Model in een zwarte doorschijnende top tegen een donkere achtergrond",
    detail: { zoom: 1.7, origin: "50% 68%" },
    sizes: LETTERS,
    out: ["L", "XL"],
    badge: "Laatste stuks",
    text: "Een laag zachte tule met een ruime korte mouw, om over een hemdje of een body te dragen. Verbergt niets en maakt alles zachter.",
    material: "92% polyamide, 8% elastaan. Zomen met de hand gerold.",
    care: "Handwas, koud. Niet strijken.",
  },
  {
    id: "aurore",
    art: "LA-07-012",
    name: "Vest Aurore",
    kind: "Grof gebreid vest",
    cat: "breisels",
    price: 249,
    color: "Havermout",
    hex: "#cdbfa9",
    img: "knits",
    alt: "Grof gebreide vesten in havermout, roest en ecru aan een rek",
    crop: { pos: "88% 50%" },
    detail: { zoom: 1.9, origin: "70% 60%" },
    sizes: LETTERS,
    out: [],
    text: "Lang vest met kabels over de hele voorkant en zakken waar je handen in verdwijnen. Zwaar, warm en bedoeld om tien winters mee te gaan.",
    material: "60% lamswol, 40% alpaca. Ongeverfd garen.",
    care: "Handwas of wolprogramma, koud. Plat laten drogen, opgevouwen bewaren.",
  },
  {
    id: "odile",
    art: "LA-07-013",
    name: "Cape Odile",
    kind: "Geruite cape",
    cat: "jassen",
    price: 389,
    color: "Flessengroen geruit",
    hex: "#1f3a3a",
    img: "look-street",
    alt: "Model op straat in een donkergroen geruite cape, kijkend over de schouder",
    crop: { pos: "50% 0%", zoom: 1.12, origin: "50% 30%" },
    detail: { zoom: 1.9, origin: "50% 52%" },
    sizes: ["S/M", "L/XL"],
    out: [],
    text: "Half mantel, half cape: wijde mouwen, een ronde schouder en een ruit van donkergroen op nachtblauw. Sluit met twee drukkers onder de kraag.",
    material: "75% wol, 25% polyamide. Half gevoerd.",
    care: "Laten stomen.",
  },
  {
    id: "marcel",
    art: "LA-07-014",
    name: "Chino Marcel",
    kind: "Rechte chino",
    cat: "broeken",
    price: 159,
    color: "Oker",
    hex: "#b3702c",
    img: "look-circle",
    alt: "Model in een okerkleurige chino, zittend onder een rond raam",
    detail: { zoom: 2.2, origin: "56% 76%" },
    sizes: ["28", "30", "32", "34", "36"],
    out: ["36"],
    text: "Rechte pijp, normale taille, vijf zakken. Geverfd nadat de broek genaaid is, waardoor de kleur bij de naden mooi doorleeft.",
    material: "98% biologisch katoen, 2% elastaan. Zware twill van 320 gram.",
    care: "Wassen op 30 graden, binnenstebuiten, met gelijke kleuren.",
  },
  {
    id: "elise",
    art: "LA-07-015",
    name: "Blouse Élise",
    kind: "Blouse zonder mouwen",
    cat: "tops",
    price: 139,
    color: "Ecru",
    hex: "#efe8da",
    img: "rack-light",
    alt: "Ecru blouses en tops aan houten hangers aan een tak",
    crop: { pos: "24% 50%", zoom: 1.25, origin: "40% 70%" },
    detail: { zoom: 2.2, origin: "30% 78%" },
    sizes: NUMBERS,
    out: ["40"],
    text: "Mouwloze blouse met een V-hals, fijne plooitjes op de borst en een rij stofknoopjes. Dun genoeg voor onder een trui, mooi genoeg om alleen te dragen.",
    material: "100% katoenvoile.",
    care: "Wassen op 30 graden. Vochtig strijken.",
  },
  {
    id: "pierrot",
    art: "LA-07-016",
    name: "Hoed Pierrot",
    kind: "Vilten hoed",
    cat: "accessoires",
    price: 119,
    color: "Zand",
    hex: "#d9cdb8",
    img: "rack-coats",
    alt: "Zandkleurige vilten hoed met een donker lint aan het uiteinde van een kledingrek",
    crop: { pos: "100% 50%", zoom: 1.5, origin: "88% 24%" },
    detail: { zoom: 2.4, origin: "90% 26%" },
    sizes: ["56", "58", "60"],
    out: ["60"],
    text: "Een hoed met een rechte rand en een lint van gros-grain. Met de hand gevormd over een houten mal, daarom is er geen één helemaal gelijk.",
    material: "100% wolvilt. Lint van katoen, binnenband van leer.",
    care: "Afborstelen met een zachte borstel. Laat de hoed na regen drogen op zijn kruin.",
  },
];
const BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p])) as Record<string, Product>;
const countIn = (c: Cat) => (c === "alles" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c).length);
const catLabel = (c: Cat) => CATS.find((x) => x.key === c)!.long;

const FREE_FROM = 150;
const SHIPPING = 5.95;
const eur = (n: number) => (Number.isInteger(n) ? `€ ${n}` : `€ ${n.toFixed(2).replace(".", ",")}`);
const cropStyle = (c?: Crop): CSSProperties | undefined => (c ? { objectPosition: c.pos, scale: c.zoom, transformOrigin: c.origin } : undefined);

/* ── Shop state: one filter, one cart and one panel at a time, shared by the whole page ── */
type Panel = "menu" | "search" | "product" | "cart";
type Line = { id: string; size: string; qty: number };
type ShopState = {
  cat: Cat;
  setCat: (c: Cat) => void;
  open: boolean;
  panel: Panel;
  show: (p: Panel) => void;
  view: (id: string) => void;
  close: () => void;
  lines: Line[];
  count: number;
  add: (id: string, size: string, qty: number) => void;
  setQty: (id: string, size: string, qty: number) => void;
  remove: (id: string, size: string) => void;
};
const Ctx = createContext<ShopState | null>(null);
const useShop = () => {
  const s = useContext(Ctx);
  if (!s) throw new Error("Shop ontbreekt");
  return s;
};

/** Wraps the whole site: holds the cart and the filter, and draws the panels that glide over the page. */
export function Shop({ children }: { children: ReactNode }) {
  const m = useMenu();
  const [panel, setPanel] = useState<Panel>("menu");
  const [cat, setCat] = useState<Cat>("alles");
  const [pid, setPid] = useState(PRODUCTS[0].id);
  const [seq, setSeq] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const layers = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const show = (p: Panel) => {
    if (!m.open) opener.current = document.activeElement as HTMLElement | null;
    setPanel(p);
    m.setOpen(true);
  };
  const view = (id: string) => {
    setPid(id);
    setSeq((n) => n + 1);
    show("product");
  };
  const add = (id: string, size: string, qty: number) => {
    setLines((ls) => {
      const hit = ls.some((l) => l.id === id && l.size === size);
      return hit ? ls.map((l) => (l.id === id && l.size === size ? { ...l, qty: Math.min(9, l.qty + qty) } : l)) : [...ls, { id, size, qty }];
    });
    show("cart");
  };
  const setQty = (id: string, size: string, qty: number) => setLines((ls) => ls.map((l) => (l.id === id && l.size === size ? { ...l, qty: Math.max(1, Math.min(9, qty)) } : l)));
  const remove = (id: string, size: string) => setLines((ls) => ls.filter((l) => !(l.id === id && l.size === size)));
  const count = lines.reduce((n, l) => n + l.qty, 0);

  // Focus follows the panel, and returns to where it came from.
  const isOpen = m.open;
  useEffect(() => {
    if (isOpen) {
      layers.current?.querySelector<HTMLElement>(`[data-panel="${panel}"] [data-focus]`)?.focus({ preventScroll: true });
    } else if (opener.current) {
      opener.current.focus({ preventScroll: true });
      opener.current = null;
    }
  }, [isOpen, panel, seq]);

  const state: ShopState = { cat, setCat, open: m.open, panel, show, view, close: m.close, lines, count, add, setQty, remove };
  const on = (p: Panel) => m.open && panel === p;
  return (
    <Ctx.Provider value={state}>
      {children}
      <div ref={layers} className="l-layers">
        <div className={`l-scrim${m.open ? " is-open" : ""}`} onClick={m.close} aria-hidden="true" />
        <MenuPanel open={on("menu")} />
        <SearchPanel open={on("search")} />
        <ProductPanel open={on("product")} product={BY_ID[pid]} seq={seq} />
        <CartPanel open={on("cart")} />
      </div>
    </Ctx.Provider>
  );
}

function CloseButton({ label = "Sluit" }: { label?: string }) {
  const { close } = useShop();
  return (
    <button type="button" className="l-x" onClick={close} data-focus>
      <span>{label}</span>
      <X size={18} strokeWidth={1.25} aria-hidden="true" />
    </button>
  );
}

/* ── Header ── */
export function Header() {
  const s = useShop();
  const on = (p: Panel) => s.open && s.panel === p;
  return (
    <header className="l-head">
      <button type="button" className="l-burger" aria-expanded={on("menu")} aria-controls="l-menu" onClick={() => s.show("menu")}>
        <i aria-hidden="true" />
        <span>Menu</span>
      </button>
      <nav className="l-nav l-nav-a" aria-label="Categorieën">
        {CATS.slice(1).map((c) => (
          <a key={c.key} href="#winkel" onClick={() => s.setCat(c.key)}>
            {c.label}
          </a>
        ))}
      </nav>
      <a href="#top" className="l-logo" aria-label="Lune Atelier, naar boven">
        Lune <em>Atelier</em>
      </a>
      <nav className="l-nav l-nav-b" aria-label="Over Lune Atelier">
        <a href="#lookbook">Lookbook</a>
        <a href="#atelier">Atelier</a>
        <a href="#service">Service</a>
      </nav>
      <div className="l-head-tools">
        <button type="button" className="l-icon" aria-label="Zoeken" aria-expanded={on("search")} aria-controls="l-search" onClick={() => s.show("search")}>
          <Search size={19} strokeWidth={1.25} aria-hidden="true" />
        </button>
        <button type="button" className="l-bag" aria-label={`Winkelmand, ${s.count} ${s.count === 1 ? "artikel" : "artikelen"}`} aria-expanded={on("cart")} aria-controls="l-cart" onClick={() => s.show("cart")}>
          <span>Mandje</span>
          <b key={s.count} data-n={s.count}>
            {s.count}
          </b>
        </button>
      </div>
    </header>
  );
}

/** A link to the shop that also sets the category filter. */
export function CatLink({ cat, className, children }: { cat: Cat; className?: string; children: ReactNode }) {
  const { setCat } = useShop();
  return (
    <a href="#winkel" className={className} onClick={() => setCat(cat)}>
      {children}
    </a>
  );
}

/** A small label on a campaign photo that opens the product it shows. */
export function ProductTag({ id, look }: { id: string; look?: string }) {
  const { view } = useShop();
  const p = BY_ID[id];
  return (
    <button type="button" className="l-tag" onClick={() => view(id)}>
      {look ? <small>{look}</small> : null}
      <span>{p.name}</span>
      <b>{eur(p.price)}</b>
      <Plus size={14} strokeWidth={1.25} aria-hidden="true" />
    </button>
  );
}

/* ── Mobile menu ── */
function MenuPanel({ open }: { open: boolean }) {
  const s = useShop();
  return (
    <div id="l-menu" data-panel="menu" className={`l-panel l-menu${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
      <div className="l-panel-head">
        <p className="l-logo">
          Lune <em>Atelier</em>
        </p>
        <CloseButton />
      </div>
      <nav aria-label="Winkel" className="l-menu-cats">
        {CATS.map((c, i) => (
          <a
            key={c.key}
            href="#winkel"
            style={{ ["--i" as string]: i }}
            onClick={() => {
              s.setCat(c.key);
              s.close();
            }}
          >
            <span>{c.key === "alles" ? "De collectie" : c.long}</span>
            <small>{countIn(c.key)}</small>
          </a>
        ))}
      </nav>
      <nav aria-label="Meer" className="l-menu-more">
        {[
          ["#collecties", "Collecties"],
          ["#lookbook", "Lookbook"],
          ["#atelier", "Het atelier"],
          ["#service", "Service en maten"],
          ["#nieuwsbrief", "Nieuwsbrief"],
        ].map(([href, label]) => (
          <a key={href} href={href} onClick={s.close}>
            {label}
          </a>
        ))}
      </nav>
      <p className="l-menu-foot">
        Winkel en atelier, Het Zuid, Antwerpen
        <br />
        Dinsdag t/m zaterdag · 03 000 00 00
      </p>
    </div>
  );
}

/* ── Search ── */
const HINTS = ["Mantel", "Wol", "Trui", "Roze", "Zonnebril"];
function SearchPanel({ open }: { open: boolean }) {
  const s = useShop();
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const hits = term ? PRODUCTS.filter((p) => `${p.name} ${p.kind} ${p.color} ${p.material} ${catLabel(p.cat)}`.toLowerCase().includes(term)) : [];
  return (
    <div id="l-search" data-panel="search" className={`l-panel l-search${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Zoeken" inert={!open}>
      <div className="l-search-in">
        <div className="l-search-bar" role="search">
          <Search size={22} strokeWidth={1.25} aria-hidden="true" />
          <label htmlFor="l-q" className="l-sr">
            Zoek in de collectie
          </label>
          <input id="l-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Zoek op stuk, kleur of stof" autoComplete="off" enterKeyHint="search" data-focus />
          <CloseButton />
        </div>
        {term ? (
          <div className="l-search-res" role="status" aria-live="polite">
            <p className="l-label">{hits.length === 0 ? "Niets gevonden" : `${hits.length} ${hits.length === 1 ? "stuk" : "stukken"} gevonden`}</p>
            {hits.length === 0 ? (
              <p className="l-search-none">Er is geen stuk dat past bij “{q.trim()}”. Probeer een stof of een kleur, zoals wol of ecru.</p>
            ) : (
              <ul>
                {hits.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <button type="button" onClick={() => s.view(p.id)}>
                      <span className="l-thumb">
                        <Pic img={I[p.img]} alt="" sizes="64px" style={cropStyle(p.crop)} />
                      </span>
                      <span>
                        <b>{p.name}</b>
                        <small>
                          {p.kind} · {p.color}
                        </small>
                      </span>
                      <em>{eur(p.price)}</em>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="l-search-hints">
            <p className="l-label">Vaak gezocht</p>
            <div>
              {HINTS.map((h) => (
                <button key={h} type="button" onClick={() => setQ(h)}>
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Collections: an index of names, the photo follows the pointer ── */
const COLLS: { cat: Exclude<Cat, "alles">; name: string; note: string; img: ImgKey; alt: string; pos?: string }[] = [
  { cat: "jassen", name: "Jassen en mantels", note: "Wol, ruit en één bomber", img: "look-street", alt: "Model in een geruite cape op straat", pos: "50% 20%" },
  { cat: "breisels", name: "Breisels", note: "Merino, alpaca en lamswol", img: "knits", alt: "Gebreide vesten aan een rek naast pluimen pampasgras", pos: "80% 50%" },
  { cat: "tops", name: "Tops en blouses", note: "Voile, tule en zwaar katoen", img: "rack-light", alt: "Lichte blouses aan houten hangers", pos: "40% 50%" },
  { cat: "broeken", name: "Broeken en pakjes", note: "Satijn, twill en lyocell", img: "trousers", alt: "Poederroze satijnen broek", pos: "50% 30%" },
  { cat: "accessoires", name: "Accessoires", note: "Een bril en een hoed", img: "sunglasses", alt: "Ronde zonnebril op wit marmer", pos: "50% 60%" },
];
export function Collections() {
  const { setCat } = useShop();
  const [at, setAt] = useState(0);
  return (
    <div className="l-coll">
      <ol className="l-coll-list">
        {COLLS.map((c, i) => (
          <li key={c.cat} data-rv style={{ ["--i" as string]: i }}>
            <a href="#winkel" className={i === at ? "is-on" : undefined} onClick={() => setCat(c.cat)} onMouseEnter={() => setAt(i)} onFocus={() => setAt(i)}>
              <small>0{i + 1}</small>
              <span className="l-coll-thumb">
                <Pic img={I[c.img]} alt={c.alt} sizes="96px" style={{ objectPosition: c.pos }} />
              </span>
              <span className="l-coll-name">{c.name}</span>
              <span className="l-coll-note">{c.note}</span>
              <span className="l-coll-n">
                {countIn(c.cat)} stukken
                <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ol>
      <div className="l-coll-frame" aria-hidden="true">
        <div>
          {COLLS.map((c, i) => (
            <Pic key={c.cat} img={I[c.img]} alt="" sizes="(min-width: 1000px) 32vw, 1px" className={i === at ? "is-on" : undefined} style={{ objectPosition: c.pos }} />
          ))}
        </div>
        <p>
          <span>
            0{at + 1} / 0{COLLS.length}
          </span>
          <span>{COLLS[at].name}</span>
        </p>
      </div>
    </div>
  );
}

/* ── Product grid ── */
type Sort = "nieuw" | "op" | "af";
export function Grid() {
  const { cat, setCat, view } = useShop();
  const [sort, setSort] = useState<Sort>("nieuw");
  const list = useMemo(() => {
    const l = cat === "alles" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.cat === cat);
    if (sort === "op") l.sort((a, b) => a.price - b.price);
    if (sort === "af") l.sort((a, b) => b.price - a.price);
    return l;
  }, [cat, sort]);
  return (
    <div className="l-shop">
      <div className="l-tools" data-rv>
        <div className="l-filters" role="group" aria-label="Filter op categorie">
          {CATS.map((c) => (
            <button key={c.key} type="button" aria-pressed={cat === c.key} onClick={() => setCat(c.key)}>
              {c.label}
              <sup>{countIn(c.key)}</sup>
            </button>
          ))}
        </div>
        <p className="l-count" role="status" aria-live="polite">
          {list.length} {list.length === 1 ? "stuk" : "stukken"}
          {cat === "alles" ? "" : ` in ${catLabel(cat).toLowerCase()}`}
        </p>
        <label className="l-sort">
          <span>Sorteer op</span>
          <select aria-label="Sorteer op" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="nieuw">Nieuw</option>
            <option value="op">Prijs oplopend</option>
            <option value="af">Prijs aflopend</option>
          </select>
        </label>
      </div>
      <ul className="l-grid" key={`${cat}-${sort}`}>
        {list.map((p, i) => (
          <li key={p.id} className="l-card" style={{ ["--i" as string]: i }}>
            <div className="l-card-media">
              <Pic img={I[p.img]} alt={p.alt} sizes="(min-width: 1100px) 23vw, (min-width: 700px) 31vw, 46vw" style={cropStyle(p.crop)} />
              <span className="l-card-detail" aria-hidden="true">
                <Pic img={I[p.img]} alt="" sizes="(min-width: 1100px) 23vw, (min-width: 700px) 31vw, 46vw" style={cropStyle({ pos: p.crop?.pos, ...p.detail })} />
              </span>
              {p.badge ? <span className="l-badge">{p.badge}</span> : null}
              <span className="l-quick" aria-hidden="true">
                Snel bekijken
                <Plus size={15} strokeWidth={1.25} />
              </span>
            </div>
            <div className="l-card-info">
              <h3>
                <button type="button" onClick={() => view(p.id)}>
                  {p.name}
                </button>
              </h3>
              <p className="l-card-price">{eur(p.price)}</p>
              <p className="l-card-color">
                <i style={{ background: p.hex }} aria-hidden="true" />
                {p.color}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Product view ── */
function ProductPanel({ open, product, seq }: { open: boolean; product: Product; seq: number }) {
  return (
    <div id="l-product" data-panel="product" className={`l-panel l-product${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="l-product-name" inert={!open}>
      <ProductBody key={`${product.id}-${seq}`} p={product} />
    </div>
  );
}

function ProductBody({ p }: { p: Product }) {
  const s = useShop();
  const [size, setSize] = useState<string | null>(p.sizes.length === 1 ? p.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [warn, setWarn] = useState(false);
  const add = () => {
    if (!size) {
      setWarn(true);
      return;
    }
    s.add(p.id, size, qty);
  };
  return (
    <>
      <div className="l-product-media">
        <Pic img={I[p.img]} alt={p.alt} sizes="(min-width: 900px) 520px, 100vw" style={cropStyle(p.crop)} />
        {p.badge ? <span className="l-badge">{p.badge}</span> : null}
      </div>
      <div className="l-product-body">
        <div className="l-product-top">
          <p className="l-label">
            {catLabel(p.cat)} · {p.kind}
          </p>
          <CloseButton />
        </div>
        <h2 id="l-product-name">{p.name}</h2>
        <p className="l-product-price">
          <b>{eur(p.price)}</b>
          <span>
            <i style={{ background: p.hex }} aria-hidden="true" />
            {p.color}
          </span>
        </p>
        <p className="l-product-text">{p.text}</p>

        <fieldset className={`l-sizes${warn && !size ? " is-warn" : ""}`}>
          <legend>
            <span>Maat{size ? `: ${size}` : ""}</span>
            <a href="#maten" onClick={s.close}>
              Maattabel
            </a>
          </legend>
          <div>
            {p.sizes.map((z) => {
              const gone = p.out.includes(z);
              return (
                <label key={z} className={gone ? "is-out" : undefined}>
                  <input
                    type="radio"
                    name={`maat-${p.id}`}
                    value={z}
                    checked={size === z}
                    disabled={gone}
                    onChange={() => {
                      setSize(z);
                      setWarn(false);
                    }}
                  />
                  <span>
                    {z}
                    {gone ? <em className="l-sr"> (uitverkocht)</em> : null}
                  </span>
                </label>
              );
            })}
          </div>
          <p className="l-sizes-note" role="status" aria-live="polite">
            {warn && !size ? "Kies eerst een maat." : size ? "Op voorraad. Voor 15.00 uur besteld, vandaag verzonden." : p.out.length ? "Doorgestreepte maten zijn uitverkocht." : "Alle maten op voorraad."}
          </p>
        </fieldset>

        <div className="l-buy">
          <div className="l-qty" role="group" aria-label="Aantal">
            <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} disabled={qty <= 1} aria-label="Eén minder">
              <Minus size={15} strokeWidth={1.25} aria-hidden="true" />
            </button>
            <output aria-live="polite">{qty}</output>
            <button type="button" onClick={() => setQty((n) => Math.min(9, n + 1))} disabled={qty >= 9} aria-label="Eén meer">
              <Plus size={15} strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>
          <button type="button" className="l-btn l-add" onClick={add}>
            <span>In winkelmand</span>
            <span>{eur(p.price * qty)}</span>
          </button>
        </div>
        <p className="l-product-note">
          Gratis verzending vanaf {eur(FREE_FROM)} · 30 dagen bedenktijd · Art. {p.art}
        </p>

        <div className="l-acc">
          <details open>
            <summary>Materiaal en verzorging</summary>
            <div>
              <p>{p.material}</p>
              <p>{p.care}</p>
            </div>
          </details>
          <details>
            <summary>Verzending en retour</summary>
            <div>
              <p>In België en Nederland binnen 1 tot 2 werkdagen in huis. Verzending kost {eur(SHIPPING)} en is gratis vanaf {eur(FREE_FROM)}.</p>
              <p>Past het niet? Je hebt 30 dagen om te ruilen of terug te sturen. Terugbrengen in de winkel is gratis.</p>
            </div>
          </details>
          <details>
            <summary>Herstelservice</summary>
            <div>
              <p>Kleine herstellingen aan dit stuk doen we gratis in ons atelier, zolang het stuk leeft.</p>
            </div>
          </details>
        </div>
      </div>
    </>
  );
}

/* ── Cart ── */
function CartPanel({ open }: { open: boolean }) {
  const s = useShop();
  const [notice, setNotice] = useState(false);
  const subtotal = s.lines.reduce((n, l) => n + BY_ID[l.id].price * l.qty, 0);
  const free = subtotal >= FREE_FROM;
  const left = FREE_FROM - subtotal;
  const empty = s.lines.length === 0;
  return (
    <div id="l-cart" data-panel="cart" className={`l-panel l-cart${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="l-cart-h" inert={!open}>
      <div className="l-panel-head">
        <h2 id="l-cart-h">
          Winkelmand <sup>{s.count}</sup>
        </h2>
        <CloseButton />
      </div>

      {empty ? (
        <div className="l-cart-empty">
          <p>Je mandje is nog leeg.</p>
          <span>Begin bij de jassen. Daar begint elk najaar.</span>
          <a
            href="#winkel"
            className="l-btn"
            onClick={() => {
              s.setCat("jassen");
              s.close();
            }}
          >
            <span>Bekijk de jassen</span>
          </a>
        </div>
      ) : (
        <>
          <div className="l-ship" role="status" aria-live="polite">
            <p>{free ? "Je bestelling wordt gratis verzonden." : `Nog ${eur(left)} tot gratis verzending.`}</p>
            <div className="l-ship-bar" aria-hidden="true">
              <i style={{ transform: `scaleX(${Math.min(1, subtotal / FREE_FROM)})` }} />
            </div>
          </div>
          <ul className="l-lines">
            {s.lines.map((l) => {
              const p = BY_ID[l.id];
              return (
                <li key={`${l.id}-${l.size}`}>
                  <button type="button" className="l-thumb" onClick={() => s.view(p.id)} aria-label={`Bekijk ${p.name}`}>
                    <Pic img={I[p.img]} alt="" sizes="88px" style={cropStyle(p.crop)} />
                  </button>
                  <div className="l-line-info">
                    <h3>{p.name}</h3>
                    <p>
                      {p.color} · Maat {l.size}
                    </p>
                    <div className="l-qty l-qty-s" role="group" aria-label={`Aantal ${p.name}`}>
                      <button type="button" onClick={() => s.setQty(l.id, l.size, l.qty - 1)} disabled={l.qty <= 1} aria-label="Eén minder">
                        <Minus size={13} strokeWidth={1.25} aria-hidden="true" />
                      </button>
                      <output>{l.qty}</output>
                      <button type="button" onClick={() => s.setQty(l.id, l.size, l.qty + 1)} disabled={l.qty >= 9} aria-label="Eén meer">
                        <Plus size={13} strokeWidth={1.25} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="l-line-end">
                    <b>{eur(p.price * l.qty)}</b>
                    <button type="button" onClick={() => s.remove(l.id, l.size)} aria-label={`Verwijder ${p.name}, maat ${l.size}`}>
                      Verwijder
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="l-cart-foot">
            <dl>
              <div>
                <dt>Subtotaal</dt>
                <dd>{eur(subtotal)}</dd>
              </div>
              <div>
                <dt>Verzending</dt>
                <dd>{free ? "Gratis" : eur(SHIPPING)}</dd>
              </div>
              <div className="l-total">
                <dt>
                  Totaal <small>incl. btw</small>
                </dt>
                <dd data-total>{eur(subtotal + (free ? 0 : SHIPPING))}</dd>
              </div>
            </dl>
            <button type="button" className="l-btn l-pay" onClick={() => setNotice(true)} aria-describedby="l-pay-note">
              <span>Afrekenen</span>
            </button>
            <p id="l-pay-note" className={`l-pay-note${notice ? " is-on" : ""}`} role="status" aria-live="polite">
              {notice ? "Hier stopt de demo. Lune Atelier is een fictief merk in een demo-ontwerp van HOPI: je kunt niets bestellen of betalen." : "Demo: afrekenen is niet mogelijk."}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Lookbook: a strip you swipe through ── */
const LOOKS: { img: ImgKey; alt: string; text: string; id: string; pos?: string }[] = [
  { img: "look-blazer", alt: "Model in een geruite blazer met een zwart lint om de hals", text: "Blazer Margaux op een wit hemd, met een zwart lint in plaats van een das.", id: "margaux" },
  { img: "look-arcade", alt: "Model in een oudroze mantel in een zuilengalerij", text: "Mantel Colette, open gedragen in de galerij aan de kaai.", id: "colette" },
  { img: "look-knit", alt: "Model in een gestreepte trui op de rotsen aan het water", text: "Trui Solène aan het water, de mouwen opgestroopt.", id: "solene", pos: "50% 20%" },
  { img: "look-man", alt: "Model in een camelkleurige mantel, zittend op een houten kruk", text: "Mantel Auguste over een wit T-shirt. Meer is niet nodig.", id: "auguste" },
  { img: "look-dark", alt: "Portret van een model in een zwarte top van tule", text: "Top Nocturne, een laag tule voor na zonsondergang.", id: "nocturne" },
  { img: "look-street", alt: "Model in een geruite cape, kijkend over de schouder", text: "Cape Odile, op weg naar huis over de Leien.", id: "odile", pos: "50% 0%" },
  { img: "look-circle", alt: "Model in een okerkleurige chino onder een rond raam", text: "Chino Marcel, zaterdagochtend op het dak van het atelier.", id: "marcel" },
];
export function Lookbook() {
  const { view } = useShop();
  const strip = useRef<HTMLOListElement>(null);
  const move = (dir: number) => {
    const el = strip.current;
    if (!el) return;
    const step = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 320;
    el.scrollBy({ left: dir * (step + 24), behavior: "smooth" });
  };
  return (
    <>
      <div className="l-look-nav" data-rv>
        <button type="button" onClick={() => move(-1)} aria-label="Vorige look">
          <ArrowLeft size={20} strokeWidth={1.25} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Volgende look">
          <ArrowRight size={20} strokeWidth={1.25} aria-hidden="true" />
        </button>
      </div>
      <ol className="l-look-strip" ref={strip} aria-label="Lookbook, zeven looks" data-rv>
        {LOOKS.map((l, i) => {
          const p = BY_ID[l.id];
          return (
            <li key={l.img}>
              <button type="button" className="l-look-img" onClick={() => view(l.id)} aria-label={`Bekijk ${p.name}`}>
                <Pic img={I[l.img]} alt={l.alt} sizes="(min-width: 900px) 30vw, 74vw" style={{ objectPosition: l.pos }} />
                <span aria-hidden="true">
                  Bekijk het stuk
                  <Plus size={15} strokeWidth={1.25} />
                </span>
              </button>
              <div className="l-look-cap">
                <small>Look 0{i + 1}</small>
                <p>{l.text}</p>
                <button type="button" onClick={() => view(l.id)}>
                  <span>{p.name}</span>
                  <b>{eur(p.price)}</b>
                </button>
              </div>
            </li>
          );
        })}
        <li className="l-look-end">
          <p>
            Zestien stukken, <em>dat is alles.</em>
          </p>
          <a href="#winkel" className="l-btn l-btn-light">
            <span>Naar de collectie</span>
          </a>
        </li>
      </ol>
    </>
  );
}

/* ── Newsletter ── */
export function Newsletter() {
  return (
    <DemoForm className="l-news-form" done="Zo zou het werken: je staat op de lijst en krijgt de eerste brief. Dit is een demo-ontwerp van HOPI, er is niets verzonden.">
      <label htmlFor="l-mail">Je e-mailadres</label>
      <div>
        <input id="l-mail" type="email" name="email" autoComplete="email" placeholder="naam@voorbeeld.example" required />
        <button type="submit">
          Schrijf me in
          <ArrowRight size={17} strokeWidth={1.25} aria-hidden="true" />
        </button>
      </div>
    </DemoForm>
  );
}
