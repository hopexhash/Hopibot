import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo content of the Kinetik template: a fictional creative marketing agency in Eindhoven.
 * Work is shown as concept projects only (no clients, no logos, no results); the example prices
 * are marked as such; no phone number, address or e-mail.
 */
const img = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;

export const sample: SiteSpec = {
  meta: {
    title: "Kinetik — creatief marketingbureau in Eindhoven",
    description: "Kinetik is een experimenteel creatief bureau in Eindhoven voor merkstrategie, campagnes, content, websites en social. Merken die bewegen.",
    lang: "nl",
    keywords: ["creatief bureau Eindhoven", "marketingbureau", "merkstrategie", "campagnes", "contentproductie", "websites", "social media", "branding"],
  },
  theme: { template: "corporate", design: "kinetik", variation: 0, primary: "#121116", accent: "#5b2bff", mode: "light", font: "Archivo Wide", radius: "round" },
  business: {
    name: "Kinetik",
    tagline: "Creatief bureau voor merken die durven te bewegen.",
    phone: null,
    email: null,
    address: null,
    city: "Eindhoven",
    mapsUrl: null,
    openingHours: ["Maandag – Vrijdag: 09:00 – 18:00", "Zaterdag: Gesloten", "Zondag: Gesloten"],
  },
  images: [
    { key: "hero", src: img("1525909002-1b05e0c869d8", 1920), alt: "Verfrollers trekken banen in felle kleuren over een witte muur", license: "stock", credit: "Unsplash" },
    { key: "studio", src: img("1552664730-d307ca884978"), alt: "Een team staat rond een wand vol gekleurde memobriefjes tijdens een brainstorm", license: "stock", credit: "Unsplash" },
    { key: "art:svc0", src: img("1531403009284-440f080d1e12"), alt: "Wireframes en schetsen van een klantreis hangen naast elkaar op een wand", license: "stock", credit: "Unsplash" },
    { key: "art:svc1", src: img("1513364776144-60967b0f800f"), alt: "Een kwast met oranje verf trekt een brede streek over papier", license: "stock", credit: "Unsplash" },
    { key: "art:svc2", src: img("1541701494587-cb58502866ab"), alt: "Blauwe en oranje inkt die door elkaar heen wervelt in water", license: "stock", credit: "Unsplash" },
    { key: "art:svc3", src: img("1586717791821-3f44a563fa4c"), alt: "Een hand schetst een websiteontwerp op een tablet met pen", license: "stock", credit: "Unsplash" },
    { key: "art:svc4", src: img("1550684848-fac1c5b4e853"), alt: "Kleurrijke druppels olie op water in roze, geel en blauw", license: "stock", credit: "Unsplash" },
    { key: "case1", src: img("1617791160505-6f00504e3519"), alt: "Concept — campagnebeeld met golvende 3D-vormen voor een fictief audiomerk", license: "stock", credit: "Unsplash" },
    { key: "case2", src: img("1618005198919-d3d4b5a92ead"), alt: "Concept — zachte 3D-bol als sleutelbeeld voor een fictieve slaap-app", license: "stock", credit: "Unsplash" },
    { key: "case3", src: img("1626544827763-d516dce335e2"), alt: "Concept — lila vormenspel voor de huisstijl van een fictieve designbeurs", license: "stock", credit: "Unsplash" },
    { key: "case4", src: img("1550859492-d5da9d8e45f3"), alt: "Concept — kleurverloop als campagnebeeld voor een fictief zomerfestival", license: "stock", credit: "Unsplash" },
    { key: "case5", src: img("1620121692029-d088224ddc74"), alt: "Concept — vloeiende blauwe vormen voor de lancering van een fictieve bank-app", license: "stock", credit: "Unsplash" },
    { key: "case6", src: img("1574169208507-84376144848b"), alt: "Concept — inkt en rook als sfeerbeeld voor een fictief parfumlabel", license: "stock", credit: "Unsplash" },
  ],
  hero: {
    eyebrow: "Creatief bureau · Eindhoven",
    headline: "Wij zetten merken in *beweging*",
    subheadline: "Kinetik is een experimenteel creatief bureau. We bedenken merkstrategie, campagnes, content, websites en social die opvallen, blijven hangen en mensen in beweging krijgen.",
    primaryCta: { label: "Start een briefing", href: "#briefing" },
    secondaryCta: { label: "Bekijk conceptwerk", href: "#werk" },
    image: "hero",
    layout: "split",
  },
  sections: [
    {
      type: "about",
      id: "studio",
      title: "Een studio die *liever* iets probeert",
      paragraphs: [
        "Kinetik is een klein, eigenwijs bureau in Eindhoven. Strategen, ontwerpers, schrijvers en makers aan één lange tafel, zonder lagen ertussen.",
        "We geloven dat een merk pas leeft als het beweegt: in een campagne, op een scherm, in een feed of op straat. Daarom denken we niet in losse middelen maar in één idee dat overal werkt, en maken we dat idee zelf. Van de eerste schets tot de laatste export.",
      ],
      image: "studio",
      highlights: ["Eén vast team", "Strategie én productie", "Korte lijnen", "Eerlijke planning"],
    },
    {
      type: "services",
      id: "diensten",
      title: "Wat we *maken*",
      intro: "Vijf disciplines, één team. Je kiest wat je nodig hebt, wij zorgen dat het samen één verhaal vertelt.",
      items: [
        { title: "Merkstrategie", description: "Positionering, merkbelofte en tone of voice. We zoeken uit waar je merk voor staat en vertalen dat naar keuzes die je team elke dag kan maken.", icon: "chart" },
        { title: "Campagnes", description: "Eén scherp idee, uitgewerkt voor online, buiten en alles daartussen. Van concept en copy tot key visual en uitrol per kanaal.", icon: "spark" },
        { title: "Content", description: "Fotografie, video, motion en copy die je merk laten zien zoals het is. Gepland in series, zodat je niet elke week opnieuw hoeft te beginnen.", icon: "camera" },
        { title: "Websites", description: "Snelle, toegankelijke websites met karakter. Ontwerp, interactie en bouw in eigen huis, met een CMS waar je zelf mee verder kunt.", icon: "globe" },
        { title: "Social", description: "Formats, contentkalender en community-aanpak voor de kanalen die bij je publiek passen. Speels waar het kan, consequent waar het moet.", icon: "chat" },
      ],
    },
    {
      type: "statement",
      id: "manifest",
      title: "Saai is het enige *risico* dat we nooit nemen.",
      note: "Ons manifest",
    },
    {
      type: "gallery",
      id: "werk",
      title: "Concept*werk*",
      images: ["case1", "case2", "case3", "case4", "case5", "case6"],
    },
    {
      type: "features",
      id: "kunde",
      title: "Waar we *goed* in zijn",
      intro: "Wat je van ons kunt verwachten, in elk project, groot of klein.",
      items: [
        { title: "Eén idee, overal", description: "We bedenken concepten die werken op een billboard, in een story en op je website, zonder dat ze aan kracht verliezen.", icon: "bolt" },
        { title: "Motion first", description: "Beweging zit vanaf de eerste schets in het ontwerp: van logo-animatie tot scroll-interactie.", icon: "spark" },
        { title: "Strategie met lef", description: "Onderbouwde keuzes, maar nooit veilig om het veilig zijn. We durven te schrappen.", icon: "chart" },
        { title: "Eigen productie", description: "Fotografie, video en motion maken we zelf, dus het idee overleeft de uitvoering.", icon: "camera" },
        { title: "Toegankelijk ontwerp", description: "Contrast, leesbaarheid en snelheid zijn bij ons geen bijzaak maar uitgangspunt.", icon: "check" },
        { title: "Open samenwerking", description: "Je kijkt mee in ons werkbord en ziet het project groeien, niet alleen het eindresultaat.", icon: "chat" },
      ],
    },
    {
      type: "process",
      id: "aanpak",
      title: "Zo pakken we het *aan*",
      intro: "Vijf stappen, in korte sprints. Je ziet elke week iets nieuws.",
      steps: [
        { title: "Briefing", description: "We beginnen met je vraag, je doelgroep en je ambitie. Samen scherpen we de opdracht aan tot één heldere uitdaging." },
        { title: "Duik", description: "Een korte, intensieve onderzoeksfase: markt, merk, mensen. We zoeken de spanning waar het idee uit kan ontstaan." },
        { title: "Idee", description: "We presenteren een paar richtingen, in beeld en beweging, en kiezen samen de route die het meest belooft." },
        { title: "Maken", description: "Ontwerp, copy, productie en bouw lopen tegelijk op. Je geeft feedback op echt werk, niet op slides." },
        { title: "Lancering", description: "We brengen alles live en kijken mee hoe het landt. Wat beter kan, passen we aan." },
      ],
    },
    {
      type: "packages",
      id: "samenwerken",
      title: "Zo kun je met ons *werken*",
      intro: "Drie manieren om te beginnen. Elk project krijgt daarna een voorstel op maat.",
      items: [
        { name: "Sprint", price: "€ 4.500", unit: "per sprint", description: "Twee weken, één vraagstuk. Ideaal voor een campagne-idee of merkrichting.", features: ["Kick-off workshop", "Twee conceptrichtingen", "Uitgewerkt key visual", "Presentatie aan je team"], featured: false },
        { name: "Campagne", price: "vanaf € 14.500", unit: "per campagne", description: "Van idee tot uitrol over meerdere kanalen.", features: ["Campagneconcept en copy", "Fotografie of video", "Formats per kanaal", "Lanceringsbegeleiding"], featured: true },
        { name: "Partner", price: "€ 6.500", unit: "per maand", description: "Een vast team dat meedenkt en maakt, maand na maand.", features: ["Vast kernteam", "Contentplanning", "Maandelijkse sprint", "Direct contact via chat"], featured: false },
      ],
      note: "Voorbeeldprijzen, exclusief btw. Elk project begint met een voorstel op maat.",
    },
    {
      type: "faq",
      id: "vragen",
      title: "Vragen die we *vaak* krijgen",
      items: [
        { q: "Werken jullie alleen voor bedrijven in Eindhoven?", a: "Nee. We zitten in Eindhoven en werken graag op locatie, maar de meeste samenwerkingen lopen net zo goed op afstand." },
        { q: "Wat kost een project bij Kinetik?", a: "Dat hangt af van de vraag. Op deze pagina staan voorbeeldprijzen om je een idee te geven; na een briefing ontvang je altijd een voorstel met een vaste prijs per fase." },
        { q: "Hoe snel kunnen jullie starten?", a: "Meestal binnen twee tot vier weken na akkoord. Een korte sprint kan soms sneller; vraag het gerust." },
        { q: "Kunnen jullie ook alleen de uitvoering doen?", a: "Zeker. Heb je al een strategie of concept, dan maken we het af in beeld, beweging of code." },
        { q: "Is het werk op deze site echt voor klanten gemaakt?", a: "Nee, wat je hier ziet zijn conceptprojecten voor fictieve merken. Zo laten we zien hoe we denken, zonder werk van anderen te gebruiken." },
        { q: "Wie is de eigenaar van het werk na afloop?", a: "Na de eindbetaling zijn de rechten op het opgeleverde werk van jou. Dat leggen we vooraf vast in het voorstel." },
      ],
    },
    {
      type: "cta",
      id: "start",
      title: "Klaar om iets in *beweging* te zetten?",
      body: "Vertel ons waar je mee zit. Binnen twee werkdagen hoor je hoe we het zouden aanpakken.",
      cta: { label: "Start een briefing", href: "#briefing" },
    },
    {
      type: "booking",
      id: "briefing",
      title: "Start een *briefing*",
      body: "Kies waar je hulp bij zoekt en vertel kort wat je wilt bereiken. We nemen contact op voor een kennismaking, op de studio of online.",
      kind: "quote",
      options: ["Merkstrategie", "Campagne", "Content", "Website", "Social", "Iets anders"],
    },
  ],
  footer: { blurb: "Kinetik is een experimenteel creatief bureau in Eindhoven voor merkstrategie, campagnes, content, websites en social." },
};
