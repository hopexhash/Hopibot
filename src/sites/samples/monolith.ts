import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo of the Monolith template: a fictional architecture firm in Rotterdam. Everything here is
 * example content for a design concept: the projects are concept studies, there are no real
 * clients, reviews, awards or figures.
 */

const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;
const img = (key: string, id: string, alt: string, w?: number) => ({ key, src: u(id, w), alt, license: "stock" as const, credit: "Unsplash" });

export const sample: SiteSpec = {
  meta: {
    title: "Monolith Architecten — architectuur in Rotterdam",
    description: "Monolith Architecten ontwerpt woningbouw, publieke en culturele gebouwen vanuit Rotterdam: helder in vorm, eerlijk in materiaal, met licht als bouwstof.",
    lang: "nl",
    keywords: ["architect Rotterdam", "architectenbureau", "woningbouw", "publieke gebouwen", "culturele gebouwen", "herbestemming", "interieurarchitectuur"],
  },
  theme: { template: "construction", design: "monolith", variation: 0, primary: "#0b0c0d", accent: "#eceef0", mode: "dark", font: "Big Shoulders Display", radius: "sharp" },
  business: {
    name: "Monolith Architecten",
    tagline: "Architectuur van massa, licht en schaduw",
    phone: null,
    email: null,
    address: null,
    city: "Rotterdam",
    mapsUrl: null,
    openingHours: ["Maandag – Vrijdag: 09:00 – 18:00", "Zaterdag: Gesloten", "Zondag: Gesloten"],
  },
  images: [
    img("art:hero", "1488972685288-c3fd157d7c7a", "Diagonale balkonplaten van een woongebouw tegen de lucht, scherp in licht en schaduw", 1920),
    img("art:about", "1527576539890-dfa815648363", "Gebogen gevelbanden van een gebouw van onderaf gezien, zwart-wit"),
    img("art:svc0", "1479839672679-a46483c0e7c8", "Gestapelde witte woonvolumes met diepe loggia's"),
    img("art:svc1", "1460574283810-2aab119d8511", "Gevel van geprefabriceerde betonnen cellen die naar boven toe versmalt"),
    img("art:svc2", "1518005020951-eccb494ad742", "Twee gebogen gevels die elkaar boven een plein raken"),
    img("art:svc3", "1542889601-399c4f3a8402", "Ruwe betonnen ruimte met een lange houten bank onder een open plafond"),
    img("art:svc4", "1600607686527-6fb886090705", "Strak interieur met een kookeiland, eiken kasten en een open trap"),
    img("art:svc5", "1449157291145-7efd050a4d0e", "Torens van onderaf gezien, die in de mist samenkomen"),
    img("art:g1", "1525438160292-a4a860951216", "Conceptstudie ‘Terras’ — woontoren met verspringende balkons als een opgaande trap"),
    img("art:g2", "1487958449943-2429e8be8625", "Conceptstudie ‘Kristal’ — een gevouwen volume van glas en metaal boven een plein"),
    img("art:g3", "1496307653780-42ee777d4833", "Conceptstudie ‘Wit’ — een toren die oplost in een witte lucht"),
    img("art:g4", "1541976590-713941681591", "Conceptstudie ‘Ritme’ — een gevel van diepe vensters die met het licht meebeweegt"),
    img("art:g5", "1481026469463-66327c86e544", "Conceptstudie ‘Huid’ — een glazen gevel van schuin geplaatste panelen"),
    img("art:g6", "1534237710431-e2fc698436d0", "Conceptstudie ‘Twee’ — twee slanke woontorens met een strak raster"),
    img("art:show", "1600585154526-990dced4db0d", "Een woning van donker metaal met verticale lamellen, 's avonds van binnenuit verlicht"),
    img("art:side1", "1497604401993-f2e922e5cb0a", "Witte gevelpanelen in een golvend patroon, van dichtbij"),
  ],
  hero: {
    eyebrow: "Architectenbureau · Rotterdam",
    headline: "Vorm volgt *licht*",
    subheadline: "Monolith Architecten ontwerpt woningbouw, publieke en culturele gebouwen. Gebouwen met massa en rust, waarin daglicht en schaduw het werk doen.",
    primaryCta: { label: "Start een project", href: "#project" },
    secondaryCta: { label: "Bekijk de studies", href: "#studies" },
    image: "art:hero",
    layout: "fullbleed",
  },
  sections: [
    {
      type: "about",
      id: "bureau",
      title: "Gebouwen met *gewicht*",
      paragraphs: [
        "Wij ontwerpen gebouwen die er over vijftig jaar nog net zo vanzelfsprekend staan. Weinig gebaren, veel aandacht: voor de plek, het licht en de mensen die er wonen, werken of samenkomen.",
        "Elk ontwerp begint met een maquette van de plek. We zoeken de lijn van de zon, de schaal van de straat en de route van de wind, en laten de vorm daaruit volgen.",
        "Materialen kiezen we om hoe ze ouder worden: beton, baksteen, hout en natuursteen. Eerlijk gedetailleerd, zonder decoratie die er later af moet.",
      ],
      image: "art:about",
      highlights: ["Ontwerp vanuit daglicht", "Eerlijke materialen", "Van studie tot oplevering"],
    },
    {
      type: "services",
      id: "disciplines",
      title: "Disciplines",
      intro: "Van een eerste haalbaarheidsstudie tot de begeleiding op de bouwplaats. Op elke schaal met hetzelfde team.",
      items: [
        { title: "Woningbouw", description: "Grondgebonden woningen, woongebouwen en wooncomplexen. Plattegronden die flexibel blijven en buitenruimtes die je echt gebruikt.", icon: "home" },
        { title: "Publieke gebouwen", description: "Scholen, bibliotheken, buurthuizen en zorggebouwen: toegankelijk, robuust en helder in hun routes.", icon: "globe" },
        { title: "Culturele gebouwen", description: "Podia, ateliers en tentoonstellingsruimtes, waarin licht, akoestiek en het verloop van de bezoeker samen ontworpen worden.", icon: "star" },
        { title: "Transformatie", description: "Herbestemming van kantoren, fabriekshallen en kerken. We houden wat er is en voegen alleen toe wat nodig is.", icon: "key" },
        { title: "Interieurarchitectuur", description: "Het interieur als verlengstuk van het gebouw: vaste kasten, trappen, licht en materiaal in één lijn ontworpen.", icon: "ruler" },
        { title: "Stedenbouwkundige studies", description: "Massastudies en verkavelingen voor een kavel, een blok of een gebied, met bezonning en zichtlijnen in beeld.", icon: "map" },
      ],
    },
    {
      type: "statement",
      id: "manifest",
      title: "Een gebouw is *af* als er niets meer weg kan.",
      note: "Uitgangspunt van het bureau",
    },
    {
      type: "gallery",
      id: "studies",
      title: "Concept*studies*",
      images: ["art:g1", "art:g2", "art:g3", "art:g4", "art:g5", "art:g6"],
    },
    {
      type: "features",
      id: "aanpak",
      title: "Aanpak",
      intro: "Drie principes die in elk ontwerp terugkomen, van woonblok tot theater.",
      items: [
        { title: "Licht als materiaal", description: "Vensters, lichtschachten en overstekken plaatsen we op de zon. Daglicht is het eerste dat we tekenen.", icon: "sun" },
        { title: "Robuust en eerlijk", description: "Constructie en materiaal blijven zichtbaar. Wat je ziet is wat het gebouw draagt.", icon: "shield" },
        { title: "Gebouwd om te blijven", description: "Demontabel waar het kan, aanpasbaar waar het moet: zodat een gebouw een tweede leven krijgt in plaats van een sloopvergunning.", icon: "leaf" },
      ],
    },
    {
      type: "process",
      id: "proces",
      title: "Van studie tot *gebouw*",
      intro: "Vier fasen, elk met een duidelijk resultaat. U beslist na iedere fase over de volgende.",
      steps: [
        { title: "Verkenning", description: "We bezoeken de plek, bespreken het programma en de ambitie, en maken een eerste massastudie met maquette." },
        { title: "Schetsontwerp", description: "Varianten in vorm, indeling en materiaal. Samen kiezen we één richting om verder uit te werken." },
        { title: "Uitwerking & vergunning", description: "Voorlopig en definitief ontwerp, afstemming met constructeur en adviseurs, en de aanvraag van de omgevingsvergunning." },
        { title: "Bouw & oplevering", description: "Technisch ontwerp, aanbesteding en esthetische begeleiding op de bouwplaats tot de sleutel wordt overgedragen." },
      ],
    },
    {
      type: "showcase",
      id: "nacht",
      title: "Licht van *binnen*",
      body: "Overdag vangt een gebouw licht; 's avonds geeft het licht terug aan de straat. Ook dat ontwerpen we.",
      image: "art:show",
      cta: { label: "Bespreek uw plan", href: "#project" },
    },
    {
      type: "faq",
      id: "vragen",
      title: "Vragen",
      items: [
        { q: "Werken jullie ook voor particulieren?", a: "Ja, voor een eigen woning of een verbouwing met architectonische ambitie. Daarnaast werken we voor corporaties, ontwikkelaars, gemeenten en culturele instellingen." },
        { q: "Hoe begint een samenwerking?", a: "Met een verkennend gesprek op de plek of op het bureau. Daarna ontvangt u een voorstel voor de eerste fase met een vaste prijs." },
        { q: "Regelen jullie de omgevingsvergunning?", a: "Ja. We stellen de aanvraag op, stemmen vooraf af met de gemeente en verwerken eventuele vragen tijdens de procedure." },
        { q: "Werken jullie alleen in Rotterdam?", a: "Het bureau zit in Rotterdam, maar we werken in heel Nederland. Voor projecten verder weg plannen we de bezoeken bewust." },
        { q: "Zijn de projecten op deze site gerealiseerd?", a: "Nee, dit zijn conceptstudies die laten zien hoe het bureau denkt over vorm, licht en materiaal." },
      ],
    },
    {
      type: "hours",
      id: "kantoor",
      title: "Het bureau",
      note: "Bezoek aan het bureau en de maquettewerkplaats is op afspraak, zodat er tijd is om de modellen samen te bekijken.",
    },
    {
      type: "booking",
      id: "project",
      title: "Start een *project*",
      body: "Vertel kort over de plek, het programma en de planning. We nemen binnen een week contact op voor een verkennend gesprek.",
      kind: "quote",
      options: ["Woningbouw", "Publieke gebouwen", "Culturele gebouwen", "Transformatie", "Interieurarchitectuur", "Stedenbouwkundige studie"],
    },
  ],
  footer: { blurb: "Monolith Architecten — architectuur voor wonen, publiek en cultuur, vanuit Rotterdam. De projecten op deze site zijn conceptstudies." },
};
