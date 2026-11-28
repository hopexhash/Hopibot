import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo site of the Nimbus template: fictional scheduling software for service businesses, from
 * Amsterdam. Prices are examples (the demo bar labels the site a concept; the note says so).
 */
const img = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;
const photo = (key: string, id: string, alt: string, w?: number) => ({ key, src: img(id, w), alt, license: "stock" as const, credit: "Unsplash" });

export const sample: SiteSpec = {
  meta: {
    title: "Nimbus Planning — planningssoftware voor dienstverleners",
    description: "Online boeken, een slimme agenda, automatische herinneringen en een teamrooster in één overzicht. Nimbus Planning uit Amsterdam, voor iedereen die op afspraak werkt.",
    lang: "nl",
    keywords: ["planningssoftware", "online afspraken", "boekingssysteem", "agenda voor salons", "teamrooster", "afspraakherinnering", "SaaS Amsterdam"],
  },
  theme: { template: "corporate", design: "nimbus", variation: 0, primary: "#0b1222", accent: "#2e5bff", mode: "light", font: "Sora", radius: "round" },
  business: {
    name: "Nimbus Planning",
    tagline: "Planningssoftware voor wie op afspraak werkt",
    phone: null,
    email: null,
    address: null,
    city: "Amsterdam",
    mapsUrl: null,
    openingHours: ["Maandag – Vrijdag: 08:30 – 17:30", "Zaterdag: Gesloten", "Zondag: Gesloten"],
  },
  images: [
    photo("hero", "1556740738-b6a63e27c4df", "Ondernemer achter de toonbank werkt op een tablet", 1100),
    photo("over", "1522202176988-66273c2fd55f", "Team aan een tafel met laptops in een licht kantoor"),
    photo("art:svc0", "1521590832167-7bcbfaa6381f", "Lichte kapsalon met roze stoelen en spiegels"),
    photo("art:svc1", "1563986768609-322da13575f3", "Iemand bekijkt de planning op laptop en telefoon"),
    photo("art:svc5", "1556742049-0cfed4f6a45d", "Klant betaalt met de telefoon aan de balie"),
    photo("show", "1497215728101-856f4ea42174", "Licht kantoor met grote ramen en planten", 1920),
    photo("g1", "1581578731548-c64695cc6952", "Schoonmaker zeemt een raam"),
    photo("g2", "1621905251918-48416bd8575a", "Elektricien met helm aan het werk bij een meterkast"),
    photo("g3", "1595476108010-b4d1f102b1b1", "Kleermaker bij een rek met kleding"),
    photo("g4", "1576091160550-2173dba999ef", "Laptop met een stethoscoop in een praktijk"),
    photo("g5", "1593642632559-0c6d3fc62b89", "Lichte werkplek met laptop en camera"),
    photo("g6", "1551434678-e076c223a692", "Collega's werken samen aan een bureau met schermen"),
  ],
  hero: {
    eyebrow: "Planningssoftware voor dienstverleners",
    headline: "Je hele week *gepland* in één rustig overzicht",
    subheadline: "Nimbus brengt afspraken, team en klanten samen in één agenda. Klanten boeken zelf online, krijgen vanzelf een herinnering en jij houdt tijd over voor het werk zelf.",
    primaryCta: { label: "Plan een demo", href: "#demo" },
    secondaryCta: { label: "Bekijk prijzen", href: "#prijzen" },
    image: "hero",
    layout: "centered",
    note: "Afspraak bevestigd — tot dinsdag!",
  },
  sections: [
    {
      type: "features",
      id: "product",
      title: "Zo loopt een dag *met Nimbus*",
      intro: "Van de eerste boeking tot de laatste afspraak: Nimbus regelt het werk tussendoor.",
      items: [
        { title: "Een klant boekt 's avonds online", description: "Terwijl jij thuis bent, kiest een klant een vrije tijd. De afspraak staat direct in de juiste agenda.", icon: "calendar" },
        { title: "De herinnering gaat vanzelf", description: "Een dag van tevoren krijgt de klant een bericht. Verzetten kan met één klik, zonder telefoontje.", icon: "chat" },
        { title: "Je team weet wat er komt", description: "Iedereen ziet 's ochtends zijn eigen dag: klanten, notities en wat er voorbereid moet worden.", icon: "check" },
        { title: "Instellingen die meegroeien", description: "Zet aanbetalingen, wachtlijsten of reistijd aan wanneer je eraan toe bent. Niets is verplicht.", icon: "bolt" },
        { title: "Onderweg in de goede volgorde", description: "Werk je op locatie? Nimbus zet de afspraken in een logische route en rekent de reistijd mee.", icon: "map" },
      ],
    },
    {
      type: "services",
      id: "functies",
      title: "Alle *functies*",
      intro: "Losse onderdelen die naadloos samenwerken. Begin klein en zet aan wat je nodig hebt.",
      items: [
        { title: "Online boeken", description: "Een eigen boekingspagina waar klanten dag en nacht een tijd kiezen die echt vrij is — op je website, in Google of via een link.", icon: "calendar" },
        { title: "Slimme agenda", description: "Behandeltijd, reistijd en pauzes worden meegerekend, zodat afspraken nooit meer overlappen.", icon: "clock" },
        { title: "Herinneringen", description: "Bevestigingen en herinneringen per e-mail of sms, automatisch en in je eigen huisstijl.", icon: "chat" },
        { title: "Teamrooster", description: "Beschikbaarheid, vrije dagen en vaardigheden per medewerker in één overzicht.", icon: "user" },
        { title: "Buitendienst", description: "Afspraken op locatie met een logische route en reistijd voor iedereen onderweg.", icon: "map" },
        { title: "Betalen bij boeken", description: "Laat klanten een aanbetaling of het volledige bedrag direct bij het boeken voldoen. Minder no-shows, minder administratie.", icon: "bag" },
      ],
    },
    {
      type: "about",
      id: "over",
      title: "Plannen hoort niet je *avond* te kosten",
      paragraphs: [
        "Nimbus is ontstaan in Amsterdam, aan de keukentafel van een kapsalon waar elke avond de agenda voor de volgende dag werd rondgebeld. Dat moest eenvoudiger kunnen.",
        "We bouwen software voor iedereen die op afspraak werkt: salons, praktijken, installateurs, schoonmakers en coaches. Geen ingewikkeld systeem, wel een planning die klopt.",
      ],
      image: "over",
      highlights: ["Gemaakt in Amsterdam", "Support in het Nederlands", "Gegevens opgeslagen in de EU", "Maandelijks opzegbaar"],
    },
    {
      type: "process",
      id: "starten",
      title: "Zo *begin* je",
      intro: "Opzetten doe je zelf, in je eigen tempo — of samen met ons in een korte sessie.",
      steps: [
        { title: "Account aanmaken", description: "Vul je bedrijfsgegevens in en kies je openingstijden. Een creditcard is niet nodig." },
        { title: "Diensten en team", description: "Zet je behandelingen of klussen erin, met duur en prijs, en nodig je collega's uit." },
        { title: "Boekingspagina delen", description: "Plaats de link op je website, in Google en op social media. Klanten kunnen meteen boeken." },
        { title: "Herinneringen aan", description: "Kies wanneer klanten een bericht krijgen. Vanaf nu loopt je agenda vanzelf." },
      ],
    },
    { type: "statement", id: "visie", title: "Goede software merk je pas als je hem *vergeet*: alles staat gewoon goed in je agenda.", note: "Waar we elke dag aan werken" },
    {
      type: "packages",
      id: "prijzen",
      title: "Eerlijke *prijzen*",
      intro: "Per maand, per locatie. Geen opstartkosten en maandelijks opzegbaar.",
      items: [
        { name: "Solo", price: "€ 19", unit: "per maand", description: "Voor zelfstandigen met één agenda.", features: ["1 medewerker", "Online boeken", "Herinneringen per e-mail", "Eigen boekingspagina"], featured: false },
        { name: "Team", price: "€ 49", unit: "per maand", description: "Voor salons, praktijken en teams tot tien mensen.", features: ["Tot 10 medewerkers", "Alles uit Solo", "Sms-herinneringen", "Teamrooster", "Betalen bij boeken"], featured: true },
        { name: "Organisatie", price: null, unit: "", description: "Voor meerdere locaties of grotere teams.", features: ["Meerdere locaties", "Buitendienst en routes", "Koppelingen op maat", "Vaste contactpersoon"], featured: false },
      ],
      note: "Voorbeeldprijzen — dit is een ontwerpconcept; de bedragen zijn ter illustratie.",
    },
    { type: "gallery", id: "praktijk", title: "In de *praktijk*", images: ["g1", "g2", "g3", "g4", "g5", "g6"] },
    {
      type: "showcase",
      id: "overal",
      title: "Je planning, *overal* bij de hand",
      body: "Op de computer in de zaak, op je telefoon onderweg: Nimbus werkt in elke browser en past zich aan je scherm aan.",
      image: "show",
      cta: { label: "Plan een demo", href: "#demo" },
    },
    {
      type: "faq",
      id: "vragen",
      title: "Vragen? *Stel ze maar*",
      items: [
        { q: "Kan ik Nimbus eerst uitproberen?", a: "Ja. Plan een demo, dan zetten we samen een proefomgeving op met jouw eigen diensten en team. Zo zie je meteen hoe jouw week eruitziet." },
        { q: "Moet ik iets installeren?", a: "Nee. Nimbus werkt in de browser op computer, tablet en telefoon. Je klanten boeken via een link of rechtstreeks op je website." },
        { q: "Kan ik mijn huidige agenda meenemen?", a: "Bestaande afspraken kun je importeren, en Nimbus houdt de agenda op je telefoon bij, zodat je niets dubbel hoeft in te voeren." },
        { q: "Wat kost een sms-herinnering?", a: "In het Team-pakket zijn sms-herinneringen inbegrepen. Met Solo verstuur je herinneringen per e-mail." },
        { q: "Waar worden mijn gegevens opgeslagen?", a: "Op servers binnen de Europese Unie. Je bent en blijft eigenaar van je eigen gegevens en die van je klanten." },
        { q: "Kan ik maandelijks opzeggen?", a: "Ja, alle pakketten zijn maandelijks opzegbaar, zonder opzegtermijn of verborgen kosten." },
      ],
    },
    { type: "cta", id: "proberen", title: "Klaar voor een *rustigere* week?", body: "Plan een demo van twintig minuten en zie je eigen planning in Nimbus.", cta: { label: "Plan een demo", href: "#demo" } },
    {
      type: "booking",
      id: "demo",
      title: "Plan een *demo*",
      body: "Kies een moment dat je uitkomt. We laten Nimbus zien met jouw diensten en beantwoorden al je vragen. Support is bereikbaar op werkdagen.",
      kind: "appointment",
      options: ["Productdemo", "Overstappen van een ander pakket", "Vragen over prijzen", "Meerdere locaties"],
    },
  ],
  footer: { blurb: "Nimbus Planning maakt planningssoftware voor dienstverleners: online boeken, een slimme agenda en herinneringen in één rustig overzicht." },
};
