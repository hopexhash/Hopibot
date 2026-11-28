import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo content of the Stroom template: a fictional installation company in Amersfoort. Everything
 * here is invented for the demonstration (the demo bar says so); the rates are example prices and
 * labelled as such. There are no reviews, awards, certificates, statistics or real people, and no
 * address or phone number.
 */
const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;
const photo = (key: string, id: string, alt: string, w?: number) => ({ key, src: u(id, w), alt, license: "stock" as const, credit: "Unsplash" });

export const sample: SiteSpec = {
  meta: {
    title: "Stroom Installatietechniek — loodgieter & elektricien in Amersfoort",
    description: "Loodgieterswerk, elektra, cv-ketels, warmtepompen en laadpalen in Amersfoort en omgeving. Vaste prijs vooraf, nette monteurs en snel hulp bij een storing.",
    lang: "nl",
    keywords: ["loodgieter Amersfoort", "elektricien Amersfoort", "cv-ketel", "warmtepomp", "laadpaal", "storing", "groepenkast", "installatiebedrijf"],
  },
  theme: { template: "service", design: "stroom", variation: 0, primary: "#0a1324", accent: "#1f5bff", mode: "light", font: "Sora", radius: "round" },
  business: {
    name: "Stroom Installatietechniek",
    tagline: "Water, warmte en stroom in goede handen",
    phone: null,
    email: null,
    address: null,
    city: "Amersfoort",
    mapsUrl: null,
    openingHours: ["Maandag – Vrijdag: 07:30 – 18:00", "Zaterdag: 09:00 – 14:00", "Zondag: Gesloten"],
  },
  images: [
    photo("hero", "1621905251918-48416bd8575a", "Monteur met helm en werkhandschoenen meet aan een elektrische aansluiting", 1920),
    photo("about", "1621905252507-b35492cc74b4", "Monteur in geruit overhemd en met veiligheidshelm naast een meterkast"),
    photo("art:svc0", "1607472586893-edb57bdc0e39", "Waterleidingen, kranen en een watermeter tegen een bakstenen muur"),
    photo("art:svc1", "1544724569-5f546fd6f2b5", "Groepenkast met rijen installatieautomaten en bekabeling"),
    photo("art:svc2", "1545259741-2ea3ebf61fa3", "Slimme thermostaat aan een witte wand"),
    photo("art:svc3", "1600047509358-9dc75507daeb", "Moderne woning met strakke gevel en een oprit"),
    photo("art:svc4", "1593941707874-ef25b8b4a92b", "Laadkabel in de laadpoort van een elektrische auto"),
    photo("art:svc5", "1620626011761-996317b8d101", "Lichte badkamer met vrijstaand bad en wastafel"),
    photo("g1", "1585704032915-c3400ca199e7", "Verchroomde badmengkraan met handdouche"),
    photo("g2", "1593941707882-a5bba14938c7", "Blauw verlichte laadaansluiting van een elektrische auto"),
    photo("g3", "1604709177225-055f99402ea3", "Moderne badkamer met ronde spiegel en vrijstaand bad"),
    photo("g4", "1542013936693-884638332954", "Keukenkraan met stromend water boven een spoelbak"),
    photo("g5", "1534398079543-7ae6d016b86a", "Tangen en kniptang op een houten werkblad"),
    photo("g6", "1507494924047-60b8ee826ca9", "Gloeilampen met zichtbare gloeidraad hangend voor een bakstenen muur"),
  ],
  hero: {
    eyebrow: "Installatietechniek · Amersfoort",
    headline: "Water, warmte en *stroom* goed geregeld.",
    subheadline: "Loodgieter, elektricien en verwarmingsmonteur in één. Voor reparaties, onderhoud en duurzame installaties, met een vaste prijs vooraf en monteurs die netjes werken.",
    primaryCta: { label: "Afspraak plannen", href: "#afspraak" },
    secondaryCta: { label: "Storing melden", href: "#storing" },
    image: "hero",
    layout: "split",
    note: "Ook voor storingen",
  },
  sections: [
    {
      type: "services",
      id: "diensten",
      title: "Alles voor *water, warmte* en stroom",
      intro: "Van een lekkende kraan tot een complete warmtepomp: onze monteurs zijn breed opgeleid, zodat u voor het hele huis één vast aanspreekpunt heeft.",
      items: [
        { title: "Loodgieterswerk", description: "Lekkages, verstoppingen, nieuwe leidingen en sanitair. We sporen het probleem op en lossen het netjes op, zonder onnodig breekwerk.", icon: "drop" },
        { title: "Elektra & groepenkast", description: "Extra groepen, een nieuwe groepenkast, stopcontacten of verlichting. Veilig aangelegd en duidelijk gelabeld.", icon: "bolt" },
        { title: "Cv-ketels", description: "Onderhoud, reparatie en vervanging van uw cv-ketel. Met advies over wat in uw situatie het meest zuinig is.", icon: "flame" },
        { title: "Warmtepompen", description: "Hybride of volledig elektrisch: we rekenen uw woning door, adviseren eerlijk en zorgen voor een stille, goed ingeregelde installatie.", icon: "sun" },
        { title: "Laadpalen", description: "Een laadpaal aan huis of bij uw bedrijf, inclusief aansluiting op de groepenkast en uitleg over slim laden.", icon: "car" },
        { title: "Badkamer & sanitair", description: "Van een nieuw toilet tot een complete badkamer: wij doen het leidingwerk, de elektra en de montage.", icon: "home" },
      ],
    },
    {
      type: "hours",
      id: "storing",
      title: "Storing? We zijn *snel* bij u.",
      note: "Lekkage, stroomuitval of een ketel die niet aanslaat? Neem tijdens onze openingstijden direct contact op. We plannen storingen met voorrang in en vertellen vooraf wat het kost.",
    },
    {
      type: "process",
      id: "werkwijze",
      title: "Zo werken we",
      intro: "Helder van eerste contact tot oplevering. U weet altijd wie er komt, wanneer en voor welke prijs.",
      steps: [
        { title: "Aanvragen", description: "Plan online een afspraak of meld een storing. U krijgt dezelfde dag een bevestiging." },
        { title: "Advies op locatie", description: "Een monteur bekijkt de situatie, legt uit wat er aan de hand is en wat de opties zijn." },
        { title: "Vaste prijs", description: "U ontvangt een duidelijke prijs vooraf. Pas als u akkoord geeft, gaan we aan de slag." },
        { title: "Installatie & uitleg", description: "We werken netjes, ruimen alles op en leggen uit hoe uw nieuwe installatie werkt." },
      ],
    },
    {
      type: "packages",
      id: "tarieven",
      title: "Eerlijke, *transparante* tarieven",
      intro: "Geen verrassingen op de factuur. Dit zijn onze voorbeeldtarieven; voor grotere klussen krijgt u altijd een vaste prijs vooraf.",
      items: [
        { name: "Storing & reparatie", price: "€ 69", unit: "voorrijden + eerste half uur", description: "Voor lekkages, verstoppingen en elektrische storingen.", features: ["Monteur met volle bus", "Kleine onderdelen direct vervangen", "Daarna € 29 per kwartier"], featured: false },
        { name: "Cv-onderhoud", price: "€ 109", unit: "per beurt", description: "Jaarlijks onderhoud voor een veilige, zuinige ketel.", features: ["Reinigen en afstellen", "Rookgasmeting", "Kort verslag per e-mail"], featured: true },
        { name: "Laadpaal compleet", price: "vanaf € 1.195", unit: "inclusief installatie", description: "Laadpaal aan huis, aangesloten op een eigen groep.", features: ["Advies over vermogen", "Nieuwe groep in de meterkast", "Uitleg over slim laden"], featured: false },
        { name: "Warmtepompadvies", price: "€ 149", unit: "eenmalig", description: "Een doorrekening van uw woning met eerlijk advies.", features: ["Opname op locatie", "Hybride of all-electric", "Bedrag verrekend bij opdracht"], featured: false },
      ],
      note: "Voorbeeldprijzen inclusief btw, ter illustratie van dit ontwerp. De definitieve prijs hoort u altijd vooraf.",
    },
    {
      type: "about",
      id: "over-ons",
      title: "Vakmensen die het *uitleggen*",
      paragraphs: [
        "Stroom Installatietechniek is een installatiebedrijf uit Amersfoort voor particulieren, VvE's en kleine bedrijven. Onze monteurs kunnen zowel met water en warmte als met elektra overweg, dus u heeft voor uw hele huis één aanspreekpunt.",
        "We werken netjes, leggen uit wat we doen en waarom, en laten niets achter behalve een installatie die werkt. Nieuwe techniek zoals warmtepompen en laadpalen bekijken we altijd in samenhang met de rest van uw woning.",
      ],
      image: "about",
      highlights: ["Vaste prijs vooraf", "Schoenen uit, vloer bedekt", "Uitleg in gewone taal", "Garantie op ons werk"],
    },
    {
      type: "features",
      id: "beloftes",
      title: "Waar u op kunt rekenen",
      intro: "Geen mooie woorden op de bus, wel afspraken die we nakomen. Zo werken we bij iedere klant.",
      items: [
        { title: "Afspraak is afspraak", description: "We komen op de afgesproken tijd. Lukt dat onverhoopt niet, dan bellen we u ruim van tevoren.", icon: "clock" },
        { title: "Vaste prijs vooraf", description: "U weet wat het kost voordat we beginnen. Meerwerk alleen na uw akkoord.", icon: "check" },
        { title: "Netjes werken", description: "Vloer afgedekt, stof beperkt en alles opgeruimd achtergelaten.", icon: "home" },
        { title: "Veilig aangelegd", description: "Elektra en gas volgens de geldende normen, gecontroleerd voordat we vertrekken.", icon: "shield" },
        { title: "Duurzaam advies", description: "We denken mee over zuiniger verwarmen, zonder u iets aan te praten.", icon: "leaf" },
      ],
    },
    {
      type: "features",
      id: "werkgebied",
      title: "Ons *werkgebied*",
      intro: "Vanuit Amersfoort zijn we snel in de hele regio. Woont u net buiten deze plaatsen? Vraag het gerust.",
      items: [
        { title: "Amersfoort", description: "Alle wijken, van het centrum tot Vathorst en Nieuwland.", icon: "map" },
        { title: "Leusden", description: "Inclusief Achterveld en Stoutenburg.", icon: "map" },
        { title: "Soest", description: "Soest, Soesterberg en omgeving.", icon: "map" },
        { title: "Baarn", description: "Baarn en Lage Vuursche.", icon: "map" },
        { title: "Nijkerk", description: "Nijkerk, Hoevelaken en Nijkerkerveen.", icon: "map" },
        { title: "Woudenberg", description: "Woudenberg, Scherpenzeel en Renswoude.", icon: "map" },
      ],
    },
    { type: "gallery", id: "werk", title: "Uit de *praktijk*", images: ["g1", "g2", "g3", "g4", "g5", "g6"] },
    {
      type: "faq",
      id: "vragen",
      title: "Veelgestelde vragen",
      items: [
        { q: "Hoe snel kunnen jullie komen bij een storing?", a: "Storingen plannen we met voorrang in, vaak dezelfde of de volgende werkdag. Bel of plan online, dan hoort u direct wanneer we kunnen komen." },
        { q: "Wat kost een monteur aan huis?", a: "Voor storingen werken we met een vast tarief voor voorrijden en het eerste half uur, daarna per kwartier. Bij grotere klussen krijgt u vooraf een vaste prijs." },
        { q: "Is mijn huis geschikt voor een warmtepomp?", a: "Dat hangt af van de isolatie, het afgiftesysteem en uw verbruik. Tijdens een adviesgesprek rekenen we uw woning door en adviseren we hybride, all-electric of (nog) niet." },
        { q: "Kan mijn groepenkast een laadpaal aan?", a: "Vaak is er een extra groep nodig. We bekijken uw meterkast en vertellen precies wat er nodig is voordat we een laadpaal plaatsen." },
        { q: "Doen jullie ook cv-onderhoud in een abonnement?", a: "U kunt jaarlijks onderhoud bij ons inplannen. We sturen u een herinnering, zodat u het niet hoeft te onthouden." },
        { q: "Werken jullie ook voor VvE's en bedrijven?", a: "Ja. Naast particulieren werken we voor VvE's, winkels en kantoren in de regio Amersfoort." },
      ],
    },
    {
      type: "booking",
      id: "afspraak",
      title: "Plan een *afspraak*",
      body: "Kies de dienst en een moment dat u past. We bevestigen uw afspraak en u weet vooraf wie er komt.",
      kind: "appointment",
      options: ["Storing of lekkage", "Elektra of groepenkast", "Cv-onderhoud of reparatie", "Warmtepompadvies", "Laadpaal", "Badkamer & sanitair"],
    },
    { type: "contact", id: "contact", title: "Contact", body: "Een vraag die niet in een afspraak past? Stuur ons een bericht, dan reageren we binnen één werkdag.", showForm: true, showMap: false },
  ],
  footer: { blurb: "Installatiebedrijf in Amersfoort voor loodgieterswerk, elektra, cv-ketels, warmtepompen en laadpalen." },
};
