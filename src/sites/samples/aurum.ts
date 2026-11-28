import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo site of the Aurum template: a fictional jewellery atelier in Den Haag. Pieces and prices
 * are examples (the demonstration notice labels the site a concept); appointments instead of a
 * checkout; no address, phone number, reviews, awards or people.
 */
const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;
const photo = (key: string, id: string, alt: string, w?: number) => ({ key, src: u(id, w), alt, license: "stock" as const, credit: "Unsplash" });

export const sample: SiteSpec = {
  meta: {
    title: "Aurum Atelier — fijne sieraden in gerecycled goud, Den Haag",
    description: "Aurum Atelier ontwerpt en maakt ringen, oorbellen, colliers en trouwringen in gerecycled goud, met de hand in Den Haag. Bezoek de salon op afspraak.",
    lang: "nl",
    keywords: ["juwelier Den Haag", "gouden sieraden", "verlovingsring", "trouwringen op maat", "gerecycled goud", "handgemaakte sieraden", "diamanten ring", "parels"],
  },
  theme: { template: "service", design: "aurum", variation: 0, primary: "#0e0d0b", accent: "#a8834a", mode: "light", font: "Cormorant", radius: "sharp" },
  business: {
    name: "Aurum Atelier",
    tagline: "Fijne sieraden in gerecycled goud, met de hand gemaakt in Den Haag",
    phone: null,
    email: null,
    address: null,
    city: "Den Haag",
    mapsUrl: null,
    openingHours: ["Dinsdag – Vrijdag: 10:00 – 18:00", "Zaterdag: 10:00 – 17:00", "Zondag – Maandag: Gesloten"],
  },
  images: [
    photo("hero", "1633810542706-90e5ff7557be", "Vrouw in zwarte top met een gouden schakelketting en armband", 1400),
    photo("detail", "1605100804567-1ffe942b5cd6", "Ring met druppelvormige diamant en pavé op zwart fluweel", 800),
    photo("art:about", "1599643478518-a784e5dc4c8f", "Gouden kettingen met een maanhanger en een blauwe steen in warm licht"),
    photo("art:svc0", "1598560917807-1bae44bd2be8", "Geelgouden ring met een smaragdgeslepen diamant en pavé in de band"),
    photo("art:svc1", "1617038220319-276d3cfab638", "Gedraaide gouden creolen op een kiezel in zacht schaduwlicht"),
    photo("art:svc2", "1599643477877-530eb83abc8e", "Gouden collier met een achthoekige groene hanger"),
    photo("art:svc3", "1602173574767-37ac01994b2a", "Grove gouden schakelarmband op een opengeslagen tijdschrift"),
    photo("cover-1", "1605100804763-247f67b3557e", "Ring met ronde diamant in een krans van kleine stenen, op zwart"),
    photo("cover-2", "1631050165155-421c47e306f7", "Fijne gouden kettinkjes op ongebleekt linnen"),
    photo("cover-3", "1622398925373-3f91b1e275f5", "Twee gladde gouden trouwringen op roze stof"),
    photo("cover-4", "1515562141207-7a88fb7ce338", "Parelcollier in een geopend juwelenkistje"),
    photo("art:show", "1569397288884-4d43d6738fbd", "Gouden hanger en armband op een donkere geschenkdoos", 1920),
    photo("g1", "1599459183200-59c7687a0275", "Fijne gouden ketting met hanger op een goudkleurige jurk"),
    photo("g2", "1611652022419-a9419f74343d", "Laagjes gouden kettingen bij een witte blouse"),
    photo("g3", "1608042314453-ae338d80c427", "Gouden ringen met gekleurde stenen op een witte steen"),
    photo("g4", "1620656798579-1984d9e87df7", "Hand met gouden ringen bij een hanger aan een fijne ketting"),
    photo("g5", "1611085583191-a3b181a88401", "Fijne ketting met een parel bij een witte blouse"),
    photo("g6", "1603974372039-adc49044b6bd", "Gouden oorbellen op een spiegel tussen gedroogde bloemen"),
    photo("g7", "1601821765780-754fa98637c1", "Gelaagde gouden kettingen met kleine hangers"),
    photo("g8", "1627293509201-cd0c780043e6", "Twee trouwringen in wit- en roségoud op witte zijde"),
  ],
  hero: {
    eyebrow: "Atelier voor fijne sieraden · Den Haag",
    headline: "Goud dat *een leven* meegaat",
    subheadline: "Aurum Atelier ontwerpt en maakt fijne sieraden in gerecycled goud, met de hand, in Den Haag. Bekijk de collecties of maak een afspraak in de salon.",
    primaryCta: { label: "Maak een afspraak", href: "#afspraak" },
    secondaryCta: { label: "Bekijk de collecties", href: "#collecties" },
    image: "hero",
    layout: "split",
  },
  sections: [
    {
      type: "about",
      id: "atelier",
      title: "Gemaakt om te *blijven*",
      paragraphs: [
        "Een sieraad draag je elke dag, soms een leven lang. Daarom tekenen wij ieder stuk zo eenvoudig als het kan en maken we het zo zorgvuldig als het moet.",
        "In ons atelier wordt gezaagd, gesmeed, gezet en gepolijst aan dezelfde werkbank. Wij werken met gerecycled goud en kiezen elke steen met de hand, op kleur en op karakter.",
        "Wie de salon bezoekt, ziet de stukken in het licht waarin ze gedragen worden en kan alles passen. Bijna elk ontwerp is te maken in een andere maat, goudkleur of steen.",
      ],
      image: "art:about",
      highlights: ["18 karaat gerecycled goud", "Met de hand gemaakt", "Stenen met de hand gekozen", "Maatwerk mogelijk"],
    },
    {
      type: "services",
      id: "stukken",
      title: "Vier stukken, *van dichtbij*",
      intro: "Stukken uit de vaste collectie, verteld zoals ze gemaakt worden. Beweeg over een foto om het detail te zien. Voorbeeldprijzen.",
      items: [
        { title: "Ring Solène", description: "Een smaragdgeslepen diamant in een open kastzetting van vier gespleten griffen, op een band met fijn pavé die zich naar onderen toe versmalt.", icon: "gift", price: "vanaf € 3.450", duration: "18 kt geelgoud" },
        { title: "Creolen Ondine", description: "Uit massief draad gedraaid en daarna met de hand gepolijst, zodat het licht over elke winding rolt. Licht genoeg om de hele dag te dragen.", icon: "spark", price: "€ 690", duration: "18 kt geelgoud" },
        { title: "Collier Verte", description: "Een achthoekig geslepen groene toermalijn in een rand van goud, aan een ankerschakel die op twee lengtes te sluiten is.", icon: "drop", price: "€ 1.280", duration: "Toermalijn · goud" },
        { title: "Armband Maillon", description: "Grove ovale schakels, ieder apart gesmeed en gesoldeerd. De sluiting valt weg in de laatste schakel.", icon: "brush", price: "€ 1.950", duration: "18 kt geelgoud" },
      ],
    },
    {
      type: "menu",
      id: "collecties",
      title: "De *collecties*",
      intro: "Vier lijnen, één handschrift. Kies een collectie om de stukken en voorbeeldprijzen te zien.",
      categories: [
        {
          name: "Lumière",
          items: [
            { name: "Solitair Lumière", description: "Ronde briljant in een zetting van zes griffen, op een smalle band.", price: "vanaf € 2.850", tags: ["Verlovingsring"] },
            { name: "Halo Lumière", description: "Centrale steen omringd door een krans van kleine diamanten.", price: "vanaf € 3.900", tags: ["Verlovingsring"] },
            { name: "Oorknoppen Lumière", description: "Twee briljanten in een gladde chaton, met schroefsluiting.", price: "€ 1.450" },
            { name: "Rivière", description: "Armband van gelijke briljanten, elk in een eigen zetting.", price: "op aanvraag" },
          ],
        },
        {
          name: "Ondine",
          items: [
            { name: "Creolen Ondine", description: "Gedraaid massief draad, met de hand gepolijst.", price: "€ 690" },
            { name: "Ketting Ondine", description: "Fijne gedraaide schakel, 42 of 45 cm.", price: "€ 840" },
            { name: "Ring Ondine", description: "Smalle gedraaide band, mooi alleen of gestapeld.", price: "€ 420" },
            { name: "Oorhangers Ondine", description: "Kleine creool met een losse gouden druppel.", price: "€ 560" },
          ],
        },
        {
          name: "Mariage",
          items: [
            { name: "Trouwring Classique", description: "Bolle band, 3 of 4 mm, in geel-, wit- of roségoud.", price: "vanaf € 780", tags: ["Per ring"] },
            { name: "Trouwring Satin", description: "Vlakke band met een zijdemat gestraalde buitenkant.", price: "vanaf € 840", tags: ["Per ring"] },
            { name: "Trouwring Pavé", description: "Halve rij kleine diamanten in een smalle band.", price: "vanaf € 1.650", tags: ["Per ring"] },
            { name: "Ontwerp samen", description: "Twee ringen die bij elkaar horen, samen getekend in de salon.", price: "op aanvraag" },
          ],
        },
        {
          name: "Perle",
          items: [
            { name: "Collier Perle", description: "Gegradeerde zoetwaterparels, geknoopt op zijde met een gouden slot.", price: "€ 1.180" },
            { name: "Oorbellen Perle", description: "Eén ronde parel op een gouden pin.", price: "€ 340" },
            { name: "Hanger Perle", description: "Druppelparel aan een fijne gouden ketting.", price: "€ 460" },
          ],
        },
      ],
      note: "Voorbeeldprijzen. Bijna elk stuk is ook te maken in een andere maat, goudkleur of steen.",
    },
    {
      type: "statement",
      id: "belofte",
      title: "Goud vergaat niet. Daarom maken wij sieraden die *een leven lang meegaan*, en daarna nog een.",
      note: "Ons uitgangspunt",
    },
    {
      type: "features",
      id: "waarom",
      title: "Wat ieder stuk *meekrijgt*",
      intro: "Drie dingen die wij voor elk sieraad hetzelfde doen, van een paar oorknoppen tot een verlovingsring.",
      items: [
        { title: "Handwerk", description: "Gezaagd, gesmeed, gezet en gepolijst aan onze eigen werkbank in Den Haag.", icon: "brush" },
        { title: "Gerecycled goud", description: "Wij werken met gerecycled 18 karaat goud en vertellen u graag waar het vandaan komt.", icon: "leaf" },
        { title: "Onderhoud", description: "Reinigen, controleren en zo nodig herzetten: wij blijven voor uw sieraad zorgen zolang u het draagt.", icon: "shield" },
      ],
    },
    {
      type: "process",
      id: "maatwerk",
      title: "Van schets tot *sieraad*",
      intro: "Een sieraad op maat ontstaat in vijf stappen. U bent bij elke stap welkom in het atelier.",
      steps: [
        { title: "Het gesprek", description: "In de salon bespreken we wat het sieraad moet vertellen, voor wie het is en hoe het gedragen wordt." },
        { title: "Ontwerp", description: "Wij tekenen een paar richtingen uit en maken een model in was, zodat u de vorm kunt zien en passen." },
        { title: "De steen", description: "U kiest de steen uit een kleine selectie, naast elkaar bekeken in daglicht en in avondlicht." },
        { title: "Maken", description: "Het goud wordt gegoten of gesmeed, de steen gezet en het geheel met de hand afgewerkt." },
        { title: "Overhandiging", description: "Het sieraad ligt klaar in de salon, met een beschrijving van materiaal en steen." },
      ],
    },
    {
      type: "gallery",
      id: "campagne",
      title: "Gedragen, *niet bewaard*",
      images: ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"],
    },
    {
      type: "showcase",
      id: "geschenk",
      title: "Een geschenk *voor later*",
      body: "Elk sieraad gaat mee in een doos van ons atelier. Op verzoek graveren wij een datum of initialen aan de binnenkant, zodat het verhaal meegaat.",
      image: "art:show",
      cta: { label: "Vraag naar graveren", href: "#afspraak" },
    },
    {
      type: "hours",
      id: "salon",
      title: "Bezoek de *salon*",
      note: "Wij ontvangen u het liefst op afspraak, zodat we alle tijd voor u hebben. Op zaterdag kunt u ook zo binnenlopen.",
    },
    {
      type: "faq",
      id: "vragen",
      title: "Veelgestelde vragen",
      items: [
        { q: "Kan ik een sieraad laten aanpassen?", a: "Bijna elk ontwerp uit de collecties is te maken in een andere ringmaat, goudkleur of steen. In de salon bekijken we samen wat mogelijk is en wat dat betekent voor de prijs en de levertijd." },
        { q: "Hoe lang duurt het maken van een ring op maat?", a: "Dat hangt af van het ontwerp en de steen. Bij het eerste gesprek maken we een planning, zodat u precies weet wanneer de ring klaarligt." },
        { q: "Werken jullie met mijn eigen goud of stenen?", a: "Vaak wel. Breng het sieraad mee naar de salon; wij beoordelen of het goud en de stenen opnieuw te gebruiken zijn in een nieuw ontwerp." },
        { q: "Kan ik sieraden online bestellen?", a: "Wij verkopen bewust in de salon, zodat u elk stuk kunt zien en passen. Maak een afspraak, dan leggen wij de stukken die u wilt zien voor u klaar." },
        { q: "Hoe onderhoud ik mijn sieraden?", a: "Bewaar ze apart, droog en uit de zon, en doe ze af bij sporten en schoonmaken. Kom gerust langs om ze te laten reinigen en controleren." },
      ],
    },
    {
      type: "booking",
      id: "afspraak",
      title: "Maak een *afspraak*",
      body: "Vertel ons waar u naar zoekt, dan leggen wij de stukken voor u klaar. Een afspraak in de salon duurt ongeveer een uur.",
      kind: "appointment",
      options: ["Advies in de salon", "Verlovingsring", "Trouwringen", "Sieraad op maat", "Onderhoud of reparatie"],
    },
  ],
  footer: { blurb: "Aurum Atelier ontwerpt en maakt fijne sieraden in gerecycled goud, met de hand, in Den Haag." },
};
