import { workByKey, type Work } from "./work";

/**
 * Selected work of the public website. Every entry is a CONCEPT: a design HOPI made for a
 * fictional business to show what we deliver. None of these is a client project, and every
 * place that shows them says so. A real client project gets `concept: false` and its own text.
 */
export type Project = {
  key: string;
  /** Industry as shown on the site. */
  industry: string;
  services: string[];
  /** Dominant colour of the design, used for the accent of its panel and page. */
  tone: string;
  /** Readable text colour on top of `tone`. */
  on: string;
  summary: string;
  decisions: { title: string; text: string }[];
  concept: true;
};

const BASE = ["Concept", "Webdesign", "Development"];

export const PROJECTS: Project[] = [
  {
    key: "de-gouden-lepel",
    industry: "Restaurant",
    services: [...BASE, "Copy"],
    tone: "#f5c400",
    on: "#0c0c0d",
    summary: "Een restaurant dat je onthoudt, verdient een website die dat ook doet. Eén felle kleur, letters zo groot als een uithangbord en de reserveerknop altijd binnen bereik.",
    decisions: [
      { title: "Eén kleur, voluit", text: "Geel over het hele scherm. Geen foto nodig om op te vallen tussen tien andere tabbladen." },
      { title: "Letters als uithangbord", text: "Smalle, zware kapitalen die de hele breedte pakken, met één schuine regel als handtekening." },
      { title: "Reserveren eerst", text: "De knop om een tafel te reserveren staat in de kop en in het eerste scherm, ook op een telefoon." },
    ],
    concept: true,
  },
  {
    key: "beauty-by-noor",
    industry: "Schoonheidssalon",
    services: [...BASE, "Copy"],
    tone: "#12241f",
    on: "#f2eee6",
    summary: "De rust van de behandelkamer, vertaald naar een scherm. Donkergroen, hoge schreefletters en veel lucht, zodat de website aanvoelt als de salon zelf.",
    decisions: [
      { title: "Donker en stil", text: "Een diepe groene achtergrond in plaats van wit. Het scherm komt tot rust voordat de bezoeker dat doet." },
      { title: "Hoge schreefletters", text: "De naam staat er als op een etiket van een goede crème: smal, hoog en zelfverzekerd." },
      { title: "Boeken zonder zoeken", text: "Een omlijnde knop om een behandeling te boeken, zichtbaar zonder te scrollen." },
    ],
    concept: true,
  },
  {
    key: "garage-jansen",
    industry: "Autogarage",
    services: BASE,
    tone: "#1c9270",
    on: "#f2eee6",
    summary: "Een garage waar je weet waar je aan toe bent. Rustig groen, een heldere belofte in gewone taal en een afspraak die je in twee tikken maakt.",
    decisions: [
      { title: "Vertrouwen in één zin", text: "De kop zegt wat de klant wil horen, zonder vakjargon en zonder uitroeptekens." },
      { title: "Zakelijk groen", text: "Een kalme, technische kleur die niet schreeuwt maar wel herkenbaar blijft." },
      { title: "Afspraak altijd in beeld", text: "De afspraakknop reist mee in de kop van de pagina, op elk scherm." },
    ],
    concept: true,
  },
  {
    key: "tandartspraktijk-centrum",
    industry: "Tandartspraktijk",
    services: BASE,
    tone: "#1c1b44",
    on: "#f2eee6",
    summary: "Naar de tandarts gaan is voor weinig mensen een feest. Deze website stelt gerust met donkerblauw, brede letters en één frisse knop om een afspraak te maken.",
    decisions: [
      { title: "Geruststellend donkerblauw", text: "Een avondblauwe achtergrond die serieus is zonder klinisch te worden." },
      { title: "Brede, open letters", text: "Kapitalen met veel ruimte. Modern, maar makkelijk te lezen voor elke leeftijd." },
      { title: "Eén accent", text: "De limoengroene afspraakknop is het enige felle element, dus je mist hem niet." },
    ],
    concept: true,
  },
  {
    key: "makelaardij-maas",
    industry: "Makelaardij",
    services: BASE,
    tone: "#dff1f7",
    on: "#0c0c0d",
    summary: "Een makelaar met een eigen gezicht, in een markt waar alles op elkaar lijkt. Stevige slab-letters, ijsblauw en een oranje knop die om een kennismaking vraagt.",
    decisions: [
      { title: "Letters met karakter", text: "Een dikke slab-serif als kop. Warm, eigenwijs en in één oogopslag te onderscheiden." },
      { title: "Fris ijsblauw", text: "Een lichte achtergrond die ruimte geeft en toch geen standaard wit is." },
      { title: "Gegevens bij de hand", text: "Adres, openingstijden en telefoon staan naast de kop, niet verstopt in de voettekst." },
    ],
    concept: true,
  },
  {
    key: "koffiebar-noord",
    industry: "Horeca",
    services: BASE,
    tone: "#f4f4f2",
    on: "#0c0c0d",
    summary: "Licht, strak en zonder franje, zoals een goede espresso. Veel wit, een grote vriendelijke kop en twee dingen voorop: de kaart en de openingstijden.",
    decisions: [
      { title: "Wit als ruimte", text: "Bijna niets op het scherm, zodat de kop en de knop al het werk doen." },
      { title: "Eén blauwe knop", text: "Kobaltblauw voor de kaart. De enige kleur op de pagina, dus de eerste klik." },
      { title: "Wat mensen zoeken", text: "Kaart, openingstijden en adres staan bovenaan. Het verhaal komt daarna." },
    ],
    concept: true,
  },
  {
    key: "bouwbedrijf-de-vries",
    industry: "Bouw & renovatie",
    services: BASE,
    tone: "#eef0ee",
    on: "#0c0c0d",
    summary: "Van plan tot oplevering, zonder omwegen. Een heldere website voor een bouwbedrijf, met de offerteaanvraag bovenaan en de contactgegevens ernaast.",
    decisions: [
      { title: "Offerte bovenaan", text: "De belangrijkste vraag van een bezoeker krijgt de eerste knop op de pagina." },
      { title: "Helder en licht", text: "Veel wit en één groen accent. Betrouwbaar, zonder saai te worden." },
      { title: "Schuine nadruk", text: "Eén cursief woord in de kop geeft de pagina beweging, als een handgeschreven krabbel op een bouwtekening." },
    ],
    concept: true,
  },
  {
    key: "barbershop-the-gents",
    industry: "Barbershop",
    services: BASE,
    tone: "#efe9d6",
    on: "#0c0c0d",
    summary: "Klassiek vakmanschap, online. Schreefletters en warme tinten voor een barbershop die tijd neemt voor een goede coupe.",
    decisions: [
      { title: "Klassieke schreef", text: "Letters die doen denken aan een geschilderde winkelruit." },
      { title: "Warme tinten", text: "Crème en donker in plaats van hard zwart-wit. Uitnodigend, als de zaak zelf." },
      { title: "Afspraak maken", text: "Een duidelijke knop om een afspraak te maken, bovenaan de pagina." },
    ],
    concept: true,
  },
  {
    key: "loodgieter-bakker",
    industry: "Loodgieter",
    services: BASE,
    tone: "#d6322f",
    on: "#f2eee6",
    summary: "Bij een lekkage telt elke minuut. Deze website is opvallend en direct: fel rood, grote letters en een telefoonnummer dat je niet kunt missen.",
    decisions: [
      { title: "Fel rood", text: "Een signaalkleur voor een vak waarin het vaak dringend is." },
      { title: "Bellen is de hoofdactie", text: "Het telefoonnummer is de grootste knop op de pagina." },
      { title: "Direct taalgebruik", text: "Korte zinnen. Wie water op de vloer heeft, leest geen lappen tekst." },
    ],
    concept: true,
  },
];

export type ProjectView = Project & { work: Work };
const view = (p: Project): ProjectView => ({ ...p, work: workByKey(p.key)! });

export const allProjects = (): ProjectView[] => PROJECTS.map(view);
/** The six shown on the homepage. */
export const selectedProjects = (): ProjectView[] => PROJECTS.slice(0, 6).map(view);
export const projectByKey = (key: string): ProjectView | undefined => {
  const p = PROJECTS.find((x) => x.key === key);
  return p ? view(p) : undefined;
};
export const projectPath = (key: string) => `/werk/${key}`;
