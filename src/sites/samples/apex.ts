import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo site of the Apex template: a fictional showroom for sports and exotic cars in Eindhoven.
 * Prices and specifications are examples (the demo bar labels the site a concept; the notes say so).
 */
const img = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;
const photo = (key: string, id: string, alt: string, w?: number) => ({ key, src: img(id, w), alt, license: "stock" as const, credit: "Unsplash" });

export const sample: SiteSpec = {
  meta: {
    title: "Apex Automotive — sport- en exotische auto's in Eindhoven",
    description: "Geselecteerde sport- en exotische auto's met complete historie. Verkoop, inkoop, consignatie, inspectie en gesloten levering vanuit onze showroom in Eindhoven.",
    lang: "nl",
    keywords: ["sportauto kopen", "exotische auto", "supercar Eindhoven", "consignatie auto", "aankoopkeuring", "Porsche", "Ferrari", "Lamborghini"],
  },
  theme: { template: "automotive", design: "apex", variation: 0, primary: "#0a0a0b", accent: "#e3122c", mode: "dark", font: "Italiana", radius: "sharp" },
  business: {
    name: "Apex Automotive",
    tagline: "Geselecteerde sport- en exotische auto's",
    phone: null,
    email: null,
    address: null,
    city: "Eindhoven",
    mapsUrl: null,
    openingHours: ["Maandag: Gesloten", "Dinsdag – Vrijdag: 10:00 – 18:00", "Zaterdag: 10:00 – 16:00", "Zondag: Op afspraak"],
  },
  images: [
    photo("hero", "1611651338412-8403fa6e3599", "Achterzijde van een grijze Porsche 911 Turbo in een donkere ruimte", 1920),
    photo("huis", "1583121274602-3e2820c69888", "Rode Ferrari-hypercar in een lichte showroom"),
    photo("art:svc0", "1612825173281-9a193378527e", "Oranje Lamborghini Huracán in een donkere garage"),
    photo("art:svc1", "1606577924006-27d39b132ae2", "Close-up van de koplamp van een rode sportwagen"),
    photo("art:svc2", "1617814076367-b759c7d7e738", "Zwarte Mercedes-AMG GT aan een haven met jachten"),
    photo("art:svc3", "1615906655593-ad0386982a0f", "Monteur aan het werk in de motorruimte van een auto"),
    photo("art:svc4", "1503376780353-7e6692767b70", "Zwarte Porsche Panamera rijdend over een snelweg"),
    photo("art:svc5", "1542282088-fe8426682b8f", "Blauw oplichtende koplamp van een sportwagen in het donker"),
    photo("show", "1580274455191-1c62238fa333", "Zwarte Porsche 911 GT3 RS met grote achtervleugel", 1920),
    photo("g1", "1544636331-e26879cd4d9b", "Voorzijde van een zilveren Bugatti Chiron"),
    photo("g2", "1542362567-b07e54358753", "Zilveren McLaren 720S op een oprit"),
    photo("g3", "1580414057403-c5f451f30e1c", "Witte Lamborghini Huracán in beweging"),
    photo("g4", "1614200187524-dc4b892acf16", "Rode Ferrari F8 voor een rode garagedeur"),
    photo("g5", "1600706432502-77a0e2e32790", "Donkere roadster in de mist bij avondlicht"),
    photo("g6", "1621135802920-133df287f89c", "Blauwe Lamborghini Aventador voor een lichte gevel"),
    photo("car1", "1544829099-b9a0c07fad1a", "Witte Lamborghini Huracán Performante, voorzijde"),
    photo("car2", "1592198084033-aade902d1aae", "Rode Ferrari F8 Tributo bij zonsondergang"),
    photo("car3", "1603584173870-7f23fdae1b7a", "Grijze Audi R8 op een bergweg"),
    photo("car4", "1618843479313-40f8afb4b4d8", "Grijze Mercedes-AMG GT op een parkeerplaats"),
    photo("car5", "1614162692292-7ac56d7f7f1e", "Witte Porsche 911 in een besneeuwd berglandschap"),
  ],
  hero: {
    eyebrow: "Sport- & exotische auto's · Eindhoven",
    headline: "Snelheid, *zorgvuldig* geselecteerd",
    subheadline: "Apex Automotive selecteert sport- en exotische auto's met een complete, controleerbare historie. Bezichtigen op afspraak, inspectie vooraf en gesloten levering tot aan uw deur.",
    primaryCta: { label: "Bekijk de collectie", href: "#collectie" },
    secondaryCta: { label: "Plan een bezichtiging", href: "#bezichtiging" },
    image: "hero",
    layout: "fullbleed",
    note: "Bezichtiging alleen op afspraak",
  },
  sections: [
    {
      type: "menu",
      id: "collectie",
      title: "De *collectie*",
      intro: "Een kleine, wisselende selectie. Een auto staat hier pas als de historie compleet is en de inspectie is afgerond.",
      categories: [
        {
          name: "Supercars",
          items: [
            { name: "Lamborghini Huracán Performante", description: "Atmosferische V10, Ad Personam-interieur, keramische remmen en liftsysteem vooraan. Volledige dealerhistorie.", price: "€ 289.500", tags: ["640 pk", "2019", "14.200 km"] },
            { name: "Ferrari F8 Tributo", description: "V8 biturbo in Rosso Corsa, carbon racingstoelen, JBL-audio en ceramic-pakket. Eerste eigenaar.", price: "€ 264.900", tags: ["720 pk", "2021", "8.900 km"] },
          ],
        },
        {
          name: "Grand Touring",
          items: [
            { name: "Audi R8 V10 Performance", description: "Quattro-aandrijving, Nardo Grey, sportuitlaat en carbon motorruimte. Nederlandse auto met onderhoudsboekjes.", price: "€ 164.500", tags: ["620 pk", "2020", "21.600 km"] },
            { name: "Mercedes-AMG GT R", description: "Handgebouwde V8 biturbo, AMG Track Pace, achterasbesturing en Designo-lak in grafiet.", price: "€ 159.900", tags: ["585 pk", "2019", "17.300 km"] },
            { name: "Porsche 911 Carrera 4S", description: "Generatie 992 met sportchrono, achterasbesturing en PDCC. Porsche-onderhoud en approved-historie.", price: "€ 154.750", tags: ["450 pk", "2020", "26.800 km"] },
          ],
        },
      ],
      note: "Voorbeeldprijzen en -specificaties ter illustratie. De actuele voorraad wisselt; vraag gerust naar een specifieke auto.",
    },
    {
      type: "about",
      id: "huis",
      title: "Een showroom *zonder* haast",
      paragraphs: [
        "Apex Automotive is een kleine showroom in Eindhoven voor wie een bijzondere auto zoekt — of er afscheid van neemt. We werken op afspraak, zodat er altijd tijd is voor de auto en voor uw vragen.",
        "Elke auto in de collectie kiezen we zelf, op historie, staat en specificatie. Wat we niet zelf zouden willen rijden, verkopen we niet.",
        "Na de koop blijven we uw aanspreekpunt: voor onderhoud via vaste specialisten, voor stalling in de winter of voor de volgende auto.",
      ],
      image: "huis",
      highlights: ["Bezichtiging op afspraak", "Complete historie vooraf", "Vaste prijs, geen verrassingen", "Levering in gesloten transport"],
    },
    {
      type: "services",
      id: "diensten",
      title: "Van zoektocht tot *sleuteloverdracht*",
      intro: "We werken voor kopers én verkopers. Alles onder één dak, met één vast aanspreekpunt.",
      items: [
        { title: "Verkoop", description: "Geselecteerde sport- en exotische auto's met complete historie, nieuwe APK en een heldere, vaste prijs.", icon: "car" },
        { title: "Inkoop & taxatie", description: "Een eerlijk bod op basis van markt, staat en historie van uw auto. Betaling direct bij de overdracht.", icon: "key" },
        { title: "Consignatie", description: "Wij verkopen uw auto vanuit onze showroom: presentatie, fotografie, bezichtigingen en afhandeling.", icon: "shield" },
        { title: "Aankoopkeuring", description: "Een onafhankelijke inspectie op uw verzoek, met uitleesrapport, laklaagmeting en proefrit.", icon: "tool" },
        { title: "Levering", description: "Gesloten, verzekerd transport door Nederland en de Benelux, met overdracht bij u thuis.", icon: "truck" },
        { title: "Zoekopdracht", description: "Zoekt u één specifieke auto? Wij gaan voor u op zoek, in binnen- en buitenland, en houden u op de hoogte.", icon: "spark" },
      ],
    },
    {
      type: "showcase",
      id: "uitgelicht",
      title: "Gebouwd voor *bochten*",
      body: "Sommige auto's moet je niet alleen zien, maar voelen. Na een bezichtiging plannen we graag een proefrit over een route die laat zien waar de auto voor gemaakt is.",
      image: "show",
      cta: { label: "Plan een proefrit", href: "#bezichtiging" },
    },
    {
      type: "process",
      id: "werkwijze",
      title: "Zo verloopt een *aankoop*",
      intro: "Rustig, transparant en zonder druk — van de eerste vraag tot de overdracht.",
      steps: [
        { title: "Kennismaking", description: "U vertelt wat u zoekt. Wij laten zien wat er staat, of gaan voor u op zoek." },
        { title: "Historie & inspectie", description: "U ontvangt de volledige historie en op verzoek een onafhankelijke keuring." },
        { title: "Bezichtiging", description: "In de showroom, op afspraak, met alle tijd voor de auto en een proefrit." },
        { title: "Overdracht", description: "Gepoetst, met nieuwe APK en desgewenst in gesloten transport aan huis." },
      ],
    },
    { type: "gallery", id: "showroom", title: "In de *showroom*", images: ["g1", "g2", "g3", "g4", "g5", "g6"] },
    {
      type: "features",
      id: "zekerheid",
      title: "Wat u van ons mag *verwachten*",
      intro: "Geen beloftes in kleine letters, maar afspraken die we vooraf met u maken.",
      items: [
        { title: "Historie vooraf", description: "Onderhoudsboekjes, facturen en kilometerverloop liggen klaar voordat u komt kijken.", icon: "check" },
        { title: "Vaste prijs", description: "De prijs op de website is de prijs in de showroom. Geen bijkomende kosten achteraf.", icon: "key" },
        { title: "Garantie op maat", description: "Bij elke auto bespreken we welke garantie mogelijk is en leggen we die schriftelijk vast.", icon: "shield" },
        { title: "Inruil", description: "Uw huidige auto kan worden ingeruild. De taxatie ontvangt u vooraf op papier.", icon: "car" },
      ],
    },
    { type: "statement", id: "visie", title: "Een auto als deze koopt u niet op een foto. U koopt hem op *historie*, op gevoel en op vertrouwen.", note: "Waar wij voor staan" },
    {
      type: "packages",
      id: "consignatie",
      title: "Uw auto *verkopen* via Apex",
      intro: "Wij verkopen uw sport- of exotische auto vanuit de showroom. U kiest hoeveel u zelf wilt doen.",
      items: [
        { name: "Presentatie", price: "€ 495", unit: "eenmalig", description: "Wij presenteren uw auto online; hij blijft bij u thuis staan.", features: ["Professionele fotografie", "Plaatsing in de collectie", "Begeleiding bij bezichtiging"], featured: false },
        { name: "Showroom", price: "4%", unit: "van de verkoopprijs", description: "Uw auto staat in onze showroom tot hij verkocht is.", features: ["Stalling in de showroom", "Bezichtigingen en proefritten", "Afhandeling van de verkoop", "Gesloten transport naar Eindhoven"], featured: true },
        { name: "Op maat", price: null, unit: "", description: "Voor collecties of bijzondere auto's maken we een persoonlijk voorstel.", features: ["Persoonlijk voorstel", "Discreet, zonder advertentie"], featured: false },
      ],
      note: "Voorbeeldprijzen ter illustratie — de definitieve afspraken leggen we per auto schriftelijk vast.",
    },
    {
      type: "faq",
      id: "vragen",
      title: "Veelgestelde *vragen*",
      items: [
        { q: "Kan ik zonder afspraak langskomen?", a: "We werken op afspraak, zodat er iemand voor u is en de auto klaarstaat. Plan een bezichtiging via het formulier; vaak kan het nog dezelfde week." },
        { q: "Kan ik mijn huidige auto inruilen?", a: "Ja. We taxeren uw auto op basis van staat, historie en markt. U ontvangt het bod vooraf schriftelijk." },
        { q: "Leveren jullie ook buiten Eindhoven?", a: "Ja, in heel Nederland en de Benelux, in gesloten en verzekerd transport. De kosten hoort u vooraf." },
        { q: "Is een onafhankelijke keuring mogelijk?", a: "Altijd. U kiest zelf een keuringsinstantie of wij regelen er een; de auto staat ervoor klaar." },
        { q: "Hoe werkt consignatie precies?", a: "U blijft eigenaar tot de verkoop. Wij presenteren en verkopen de auto en rekenen met u af na de overdracht aan de koper." },
      ],
    },
    { type: "hours", id: "bezoek", title: "Showroom & *openingstijden*", note: "Bezichtigingen en proefritten zijn op afspraak, ook buiten de vaste tijden." },
    {
      type: "booking",
      id: "bezichtiging",
      title: "Plan een *bezichtiging*",
      body: "Laat weten welke auto u wilt zien of waarmee we u kunnen helpen. We bevestigen de afspraak persoonlijk.",
      kind: "appointment",
      options: ["Bezichtiging", "Proefrit", "Inruil of taxatie", "Consignatie", "Aankoopkeuring", "Zoekopdracht"],
    },
  ],
  footer: { blurb: "Geselecteerde sport- en exotische auto's in Eindhoven. Verkoop, inkoop, consignatie, inspectie en levering — op afspraak." },
};
