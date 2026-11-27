import type { Metadata } from "next";
import type { DemoSlug } from "./images";

/**
 * The demo websites. Every one is a complete website HOPI designed and built for a business
 * that does NOT exist: the names, people, prices and reviews in them are example content.
 * Wherever a demo is shown (portfolio, project page, the demo itself) it is called a demo or
 * concept. A real client project never goes in this list.
 */
export type Demo = {
  slug: DemoSlug;
  /** Name of the fictional business. */
  name: string;
  category: string;
  city: string;
  /** One line under the name in the portfolio. */
  line: string;
  /** Short professional description. */
  summary: string;
  /** The design concept: what was decided and why. */
  concept: string;
  /** What is in the website, as shown on its project page. */
  sections: string[];
  type: string;
  /** Panel colour in the portfolio and readable text colour on it. */
  tone: string;
  on: string;
  /** Slug of the matching /website-laten-maken/<industry> page, when there is one. */
  industry?: string;
};

/** Every demo, finished or not. Pages and tests use DEMOS (below) unless they say otherwise. */
export const ALL_DEMOS: Demo[] = [
  {
    slug: "restaurant",
    name: "Vesper",
    category: "Restaurant & fine dining",
    city: "Amsterdam",
    line: "Een avondrestaurant dat leest als een tijdschrift.",
    summary: "Een donker, redactioneel ontwerp voor een restaurant met een proeverijmenu. Grote fotografie, een menukaart die je wilt lezen en reserveren in drie tikken.",
    concept: "Fine dining verkoop je met sfeer, niet met een lijstje. Daarom staat de fotografie filmisch groot, is de typografie een hoge schreefletter met cursieve accenten en blijft de pagina donker en warm, zoals de zaal zelf. De reserveerknop reist mee, maar schreeuwt niet.",
    sections: ["Filmische opening", "Het verhaal van de keuken", "Menukaart met drie kaarten", "Signatuurgerechten", "Wijn & bar", "Galerij", "Gasten aan het woord", "Reserveren, openingstijden en route"],
    type: "Cormorant Garamond + Jost",
    tone: "#16110d",
    on: "#efe6d6",
    industry: "restaurant",
  },
  {
    slug: "beauty-salon",
    name: "Atelier Sage",
    category: "Beauty & huidverzorging",
    city: "Utrecht",
    line: "Rust, licht en huid. Minimalistische luxe.",
    summary: "Een licht en rustig ontwerp voor een huidsalon. Zachte neutrale tinten, veel wit, een helder behandelmenu met prijzen en een boekingsflow die past bij de sfeer.",
    concept: "Een behandeling begint bij het eerste scherm. Het ontwerp gebruikt veel lucht, een verfijnde schreefletter en zandtinten, zodat de website dezelfde kalmte uitstraalt als de behandelkamer. Prijzen staan open en bloot: wie rust verkoopt, verstopt niets.",
    sections: ["Rustige opening", "Filosofie van de salon", "Behandelingen met prijzen", "Resultaten", "De ruimte", "Over de oprichter", "Ervaringen", "Afspraak boeken"],
    type: "Fraunces + Figtree",
    tone: "#e9e1d6",
    on: "#2b2620",
    industry: "schoonheidssalon",
  },
  {
    slug: "construction",
    name: "Kade Bouw",
    category: "Bouw & renovatie",
    city: "Rotterdam",
    line: "Stevig, direct en gebouwd om offertes binnen te halen.",
    summary: "Een krachtig, industrieel ontwerp voor een bouw- en renovatiebedrijf. Zware letters, projectfotografie op groot formaat en een offerteaanvraag die niemand kan missen.",
    concept: "Een bouwer wordt gekozen op bewijs. Dus staan projecten voorop, met cijfers erbij, en is de vormgeving zo stevig als het werk: brede kapitalen, signaalgeel, een raster dat aan bouwtekeningen doet denken. De offerteaanvraag is in stappen opgedeeld, zodat hij ook op een steiger in te vullen is.",
    sections: ["Opening met kerncijfers", "Diensten", "Projectportfolio", "Werkwijze in stappen", "Het bedrijf", "Opdrachtgevers aan het woord", "Offerte aanvragen"],
    type: "Archivo + Archivo Narrow",
    tone: "#f0b90b",
    on: "#111111",
    industry: "bouwbedrijf",
  },
  {
    slug: "real-estate",
    name: "Meridiaan Makelaars",
    category: "Makelaardij",
    city: "Amsterdam",
    line: "Woningen gepresenteerd als in een architectuurblad.",
    summary: "Een luxe, redactioneel ontwerp voor een makelaarskantoor. Woningfotografie over de volle breedte, interactieve woningkaarten met filters en een detailweergave per woning.",
    concept: "Een woning in het hogere segment verdient meer dan een rijtje thumbnails. Elke woning krijgt ruimte, als een pagina in een tijdschrift, met de feiten strak eronder. Filters, favorieten en de detailweergave werken direct, zonder herladen.",
    sections: ["Opening met zoekbalk", "Uitgelicht aanbod met filters", "Woningdetail", "Diensten voor verkopers en kopers", "Het team", "De buurten", "Waardebepaling aanvragen"],
    type: "Playfair Display + Manrope",
    tone: "#1d2a24",
    on: "#ece7dc",
    industry: "makelaar",
  },
  {
    slug: "fitness",
    name: "FORGE Performance Club",
    category: "Fitness & personal training",
    city: "Eindhoven",
    line: "Donker, hard en zonder excuses.",
    summary: "Een donker ontwerp met veel energie voor een trainingsclub. Schermvullende typografie, zwart-witfotografie met één felle kleur, programma's, coaches en lidmaatschappen.",
    concept: "Een sportschool verkoop je op gevoel: wil ik hier trainen? Daarom is alles groot, contrastrijk en in beweging. Eén kleur, zuurgroen, wijst overal de volgende stap aan: proefles boeken.",
    sections: ["Schermvullende opening", "Trainingsprogramma's", "Lesrooster per dag", "Coaches", "Lidmaatschappen", "De club", "Resultaten van leden", "Proefles boeken"],
    type: "Anton + Inter Tight",
    tone: "#0b0b0b",
    on: "#d7ff3e",
  },
  {
    slug: "automotive",
    name: "Obsidian Detailing",
    category: "Auto & detailing",
    city: "Breda",
    line: "Donkere luxe voor wie zijn auto als nieuw wil.",
    summary: "Een donker, filmisch ontwerp voor een detailingstudio. Lak die glanst op groot formaat, een voor-en-na-schuif, pakketten met prijzen en online een afspraak inplannen.",
    concept: "Detailing is precisiewerk en dat moet je zien voordat je het leest. Veel zwart, smalle lichtlijnen zoals reflecties op lak, en een voor-en-na-schuif die het resultaat bewijst. Pakketten zijn in één oogopslag te vergelijken.",
    sections: ["Filmische opening", "Diensten", "Voor en na", "Pakketten en prijzen", "Het proces", "De studio", "Klanten aan het woord", "Afspraak inplannen"],
    type: "Unbounded + Inter",
    tone: "#0a0c10",
    on: "#e8edf2",
    industry: "garage",
  },
  {
    slug: "law-firm",
    name: "Van Aerden Advocaten",
    category: "Advocatenkantoor",
    city: "Den Haag",
    line: "Gezag zonder stijfheid.",
    summary: "Een ingetogen, redactioneel ontwerp voor een advocatenkantoor. Klassieke typografie, veel wit, heldere rechtsgebieden en advocaten met een gezicht.",
    concept: "Vertrouwen bouw je met rust en precisie. Het ontwerp leent van de opgemaakte akte: smalle kolommen, kleine kapitalen, dunne lijnen. Diepblauw en perkament in plaats van zwart en wit, zodat het kantoor benaderbaar blijft.",
    sections: ["Opening", "Rechtsgebieden", "Aanpak", "De advocaten", "Expertise en zaken", "Publicaties", "Kennismaking aanvragen"],
    type: "Newsreader + IBM Plex Sans",
    tone: "#13233a",
    on: "#ece6da",
  },
  {
    slug: "fashion",
    name: "Lune Atelier",
    category: "Webshop mode",
    city: "Antwerpen",
    line: "Een modewinkel die oogt als een lookbook.",
    summary: "Een complete webshop voor een modemerk. Redactionele campagnebeelden, collecties, productkaarten met filters, een productweergave met maten en een werkend winkelmandje.",
    concept: "Mode koop je met je ogen. De winkel opent als een lookbook en gaat pas daarna over in een raster. Productkaarten zijn rustig en groot, de productweergave en het winkelmandje schuiven over de pagina, zodat je nooit de draad kwijtraakt.",
    sections: ["Campagne-opening", "Collecties", "Productraster met filters", "Productweergave met maten", "Winkelmandje", "Lookbook", "Het atelier", "Nieuwsbrief en service"],
    type: "Bodoni Moda + Hanken Grotesk",
    tone: "#e6e1d8",
    on: "#17140f",
  },
  {
    slug: "dental",
    name: "Tandartspraktijk Helder",
    category: "Tandartspraktijk",
    city: "Haarlem",
    line: "Fris, duidelijk en geruststellend.",
    summary: "Een schoon en modern ontwerp voor een tandartspraktijk. Vriendelijke typografie, behandelingen in gewone taal, het team met een gezicht en online een afspraak maken.",
    concept: "Niemand gaat voor zijn plezier naar de tandarts. Het ontwerp neemt die drempel weg: zachte vormen, veel licht, korte zinnen en overal hetzelfde aanbod, namelijk een afspraak maken of bellen. Angstpatiënten krijgen een eigen plek.",
    sections: ["Opening met afspraakknop", "Behandelingen", "Eerste bezoek stap voor stap", "Het team", "De praktijk", "Tarieven en verzekering", "Patiënten aan het woord", "Afspraak maken"],
    type: "Plus Jakarta Sans",
    tone: "#dff1ee",
    on: "#0f3b3a",
    industry: "tandarts",
  },
  {
    slug: "saas",
    name: "Veldwerk",
    category: "Software & SaaS",
    city: "Utrecht",
    line: "Software uitleggen door hem te laten zien.",
    summary: "Een futuristisch ontwerp voor een softwarebedrijf. Het product is in de pagina zelf nagebouwd en beweegt mee, met functies, een prijstabel met schakelaar en interactieve onderdelen.",
    concept: "Software verkoop je door hem te tonen. In plaats van screenshots is de interface nagebouwd in de pagina: de planning verschuift, cijfers tellen op. Donker, met licht dat uit het product lijkt te komen.",
    sections: ["Opening met bewegend product", "Functies", "Productdemonstratie in tabbladen", "Koppelingen", "Prijzen met maand- en jaarschakelaar", "Klanten aan het woord", "Veelgestelde vragen", "Proefperiode starten"],
    type: "Space Grotesk + Inter",
    tone: "#0b0a14",
    on: "#e9e6ff",
  },
  {
    slug: "hotel",
    name: "Hotel Ostara",
    category: "Hotel & hospitality",
    city: "Amsterdam",
    line: "Een grachtenhotel waar je al bent voordat je boekt.",
    summary: "Een luxe, filmisch ontwerp voor een boutique hotel. Kamers en suites met prijzen, faciliteiten, een galerij en een boekingsbalk die meerekent.",
    concept: "Een hotel boek je op gevoel en daarna op feiten. Dus eerst de sfeer, breed en langzaam, dan de kamers met alles wat je wilt weten. De boekingsbalk blijft in beeld en rekent het aantal nachten voor je uit.",
    sections: ["Filmische opening met boekingsbalk", "Het huis", "Kamers en suites", "Restaurant en bar", "Wellness", "Galerij", "De buurt", "Boeken"],
    type: "Marcellus + Mulish",
    tone: "#2a2420",
    on: "#f1e9dc",
  },
  {
    slug: "creative-agency",
    name: "Studio Antipode",
    category: "Creatief bureau",
    city: "Gent",
    line: "Eigenzinnig, groot en in beweging.",
    summary: "Een experimenteel ontwerp voor een creatief bureau. Reusachtige typografie, een projectlijst die reageert op je cursor, onverwachte rasters en veel beweging.",
    concept: "Een creatief bureau moet op zijn eigen website durven. Dus breekt het raster, loopt tekst uit beeld en verandert de pagina van kleur per onderdeel. Onder al dat geweld blijft de structuur simpel: werk, diensten, contact.",
    sections: ["Typografische opening", "Manifest", "Projecten met voorvertoning", "Diensten", "Werkwijze", "Het team", "Opdrachtgevers", "Contact"],
    type: "Syne + Instrument Sans",
    tone: "#ff5a36",
    on: "#101010",
  },
];

/**
 * The demos that are finished and checked. Only these are shown in the portfolio, the sitemap
 * and the tests; a demo that is still being built stays out of sight until it is added here.
 */
const LIVE = new Set<DemoSlug>(["restaurant", "beauty-salon", "construction", "real-estate", "fitness", "automotive", "law-firm"]);

export const DEMOS: Demo[] = ALL_DEMOS.filter((d) => LIVE.has(d.slug));

export const demoBySlug = (slug: string) => ALL_DEMOS.find((d) => d.slug === slug);
export const demoPath = (slug: string) => `/demos/${slug}`;

/** Metadata of a demo page. Demos are for showing, not for search engines. */
export function demoMeta(slug: DemoSlug): Metadata {
  const d = demoBySlug(slug)!;
  return {
    title: `${d.name} · demo-ontwerp van HOPI`,
    description: `${d.category} in ${d.city}. ${d.name} is een fictief bedrijf: dit is een demo-ontwerp van HOPI.`,
    robots: { index: false, follow: true },
  };
}
