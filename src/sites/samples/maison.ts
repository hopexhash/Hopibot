import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo site of the Maison template: a fictional boutique hotel with its own restaurant and bar in
 * a canal house in Amsterdam. City only (no address, phone or e-mail); example prices are labelled
 * as such; no reviews, awards or figures presented as facts.
 */
const photo = (key: string, id: string, alt: string, w = 1600) => ({
  key,
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`,
  alt,
  license: "stock" as const,
  credit: "Unsplash",
});

export const sample: SiteSpec = {
  meta: {
    title: "Maison Keizer — boutiquehotel aan de gracht in Amsterdam",
    description: "Slapen in een zeventiende-eeuws grachtenhuis in Amsterdam: vijf kamers achter oude deuren, een eigen restaurant en bar en een hammam in de kelder.",
    lang: "nl",
    keywords: ["boutiquehotel Amsterdam", "hotel aan de gracht", "grachtenhuis hotel", "hotel met restaurant", "hammam Amsterdam", "romantisch weekend Amsterdam"],
  },
  theme: { template: "service", design: "maison", variation: 0, primary: "#5b1820", accent: "#b08847", mode: "light", font: "Fraunces Soft", radius: "sharp" },
  business: {
    name: "Maison Keizer",
    tagline: "Boutiquehotel met eigen restaurant en bar, in een grachtenhuis in Amsterdam",
    phone: null,
    email: null,
    address: null,
    city: "Amsterdam",
    mapsUrl: null,
    openingHours: ["Maandag – Donderdag: 07:00 – 23:00", "Vrijdag – Zaterdag: 07:00 – 00:30", "Zondag: 08:00 – 23:00"],
  },
  images: [
    photo("hero", "1576924542622-772281b13aa8", "Grachtenpanden in het warme avondlicht, weerspiegeld in het water", 1920),
    photo("huis", "1590381105924-c72589b9ef3f", "Lounge met houten lambrisering, schemerlampen en een schilderij boven de bank"),
    photo("art:svc0", "1590490360182-c33d57733427", "Klassieke hotelkamer met een bank voor het raam en lange gordijnen"),
    photo("art:svc1", "1611892440504-42a792e24d32", "Warme kamer met donker hout en een raam op een groene tuin"),
    photo("art:svc2", "1566665797739-1674de7a421a", "Donkere kamer met houten luiken, leeslampjes en een opgemaakt bed"),
    photo("art:svc3", "1505693416388-ac5ce068fe85", "Lichte suite met een gecapitonneerd hoofdbord en twee nachtkastjes"),
    photo("art:svc4", "1540518614846-7eded433c457", "Kamer met een rood schilderij boven het bed en oranje voetenbankjes"),
    photo("gracht", "1534351590666-13e3e96b5017", "Amsterdamse gracht op een zonnige dag, met bootjes langs de kade"),
    photo("restaurant", "1517248135467-4c7edcad34c4", "Restaurant in de avond met gedekte tafels en zacht licht"),
    photo("art:spa", "1583416750470-965b2707b355", "Sauna van licht hout met indirecte verlichting", 1920),
    photo("art:g1", "1414235077428-338989a2e8c0", "Gerecht op een wit bord aan een gedekte tafel bij kaarslicht"),
    photo("art:g2", "1470337458703-46ad1756a187", "Barman schenkt een cocktail over een groot ijsblok"),
    photo("art:g3", "1512470876302-972faa2aa9a4", "Gracht in de schemering met verlichte ramen"),
    photo("art:g4", "1493770348161-369560ae357d", "Ontbijt met fruit, yoghurt en wafels op een marmeren tafel"),
    photo("art:g5", "1507652313519-d4e9174996dd", "Vrijstaand bad tegen een stenen muur met een plant"),
    photo("art:g6", "1543007630-9710e4a00a20", "Bar met flessen op verlichte planken en hanglampen"),
    photo("art:g7", "1551218808-94e220e084d2", "Kok snijdt kruiden op een houten plank"),
  ],
  hero: {
    eyebrow: "Boutiquehotel · Amsterdam",
    headline: "Thuiskomen aan de *gracht*",
    subheadline: "Een klein hotel in een zeventiende-eeuws grachtenhuis, met kamers achter oude deuren, een restaurant op de bel-etage en een hammam in de kelder.",
    primaryCta: { label: "Plan uw verblijf", href: "#plannen" },
    secondaryCta: { label: "Bekijk de kamers", href: "#kamers" },
    image: "hero",
    layout: "split",
  },
  sections: [
    {
      type: "about",
      id: "huis",
      title: "Een huis met een *eigen ritme*",
      paragraphs: [
        "Achter de gevel van Maison Keizer liggen een smalle trap, hoge plafonds en kamers die elk een ander verhaal vertellen. We hebben het huis niet gladgestreken: de balken, de schuiframen en de scheve vloeren mochten blijven.",
        "Overdag is het een rustige plek om de stad vanuit te verkennen. ’s Avonds gaan beneden de lampen aan, schuiven buren en gasten aan in het restaurant en schenkt de bar tot laat.",
        "Wie hier slaapt, krijgt geen pasje maar een echte sleutel aan een zware hanger. Bij vertrek hangt u die gewoon terug aan de haak.",
      ],
      image: "huis",
      highlights: ["Ontbijt tot 11 uur", "Eigen restaurant & bar", "Hammam in de kelder", "Fietsen van het huis"],
    },
    {
      type: "services",
      id: "kamers",
      title: "Vijf kamers, *vijf deuren*",
      intro: "Elke kamer is anders van maat, licht en uitzicht. Kies uw deur. Voorbeeldprijzen per nacht voor twee personen, inclusief ontbijt.",
      items: [
        { title: "Grachtkamer", description: "Hoge ramen aan de gracht, een bank in de erker en een bed van twee meter. ’s Ochtends valt het licht over de vloer tot aan de deur.", icon: "home", price: "vanaf € 245", duration: "2 personen · 28 m²" },
        { title: "Tuinkamer", description: "Aan de rustige achterkant, op de begane grond, met uitzicht op de stadstuin en een wand van donker hout. De stilste kamer van het huis.", icon: "leaf", price: "vanaf € 215", duration: "2 personen · 24 m²" },
        { title: "Pakzolder", description: "Onder de oude balken op de bovenste verdieping, met luiken voor de ramen en leeslampjes aan weerszijden van het bed. Voor wie het donker en knus wil.", icon: "key", price: "vanaf € 265", duration: "2 personen · 32 m²" },
        { title: "Suite Keizer", description: "Twee kamers en suite op de bel-etage, met een schrijftafel, een zithoek bij de schouw en een badkamer van marmer.", icon: "star", price: "vanaf € 395", duration: "2–3 personen · 46 m²" },
        { title: "Atelierkamer", description: "Een compacte kamer vol kunst van makers uit de buurt, met kleur op de muren en een raam boven het steegje. Ideaal voor een korte stedentrip.", icon: "brush", price: "vanaf € 185", duration: "1–2 personen · 18 m²" },
      ],
    },
    {
      type: "statement",
      id: "belofte",
      title: "Wij geven u geen pasje, maar een *sleutel*. En we laten de lamp in de gang voor u aan.",
      note: "Het huis, in één zin",
    },
    {
      type: "features",
      id: "buurt",
      title: "De buurt, *volgens de concierge*",
      intro: "Wat we zelf het liefst doen, binnen een kwartier lopen van de voordeur. U krijgt de briefjes mee bij de receptie.",
      items: [
        { title: "De Negen Straatjes", description: "Kleine winkels, tweedehands boeken en koffie aan het water, een paar bruggen van de voordeur.", icon: "bag" },
        { title: "Zaterdag op de markt", description: "De Noordermarkt met kaas, oesters en oude platen. Ga vroeg, en neem een tas van het huis mee.", icon: "leaf" },
        { title: "Met de sloep de gracht op", description: "Onze schipper vaart op verzoek een uur door de grachtengordel, met een fles wijn uit de bar aan boord.", icon: "drop" },
        { title: "Musea te voet", description: "Het Museumplein is een mooie wandeling langs de grachten. Kaartjes regelen we graag vooraf voor u.", icon: "camera" },
        { title: "Fietsen van het huis", description: "Twee zwarte omafietsen staan klaar in de gang. Wij leggen uit hoe u ontspannen door het stadsverkeer komt.", icon: "bike" },
        { title: "Een ochtendloop", description: "Een rondje langs drie grachten, voordat de stad wakker wordt. De route ligt voor u klaar bij de receptie.", icon: "map" },
      ],
    },
    {
      type: "showcase",
      id: "kelder",
      title: "Een *hammam* in de kelder",
      body: "Waar vroeger de turf lag, is nu een warme stenen ruimte met een stoombad en een sauna. Voor gasten van het huis vrij te gebruiken, op afspraak.",
      image: "art:spa",
      cta: { label: "Reserveer een tijd", href: "#plannen" },
    },
    {
      type: "process",
      id: "verblijf",
      title: "Uw verblijf, *van sleutel tot sleutel*",
      intro: "Zo verloopt een nacht in Maison Keizer: persoonlijk, zonder formulieren aan de balie.",
      steps: [
        { title: "Aanvragen", description: "U kiest een kamer en data in de planner hieronder. We bevestigen persoonlijk en vragen hoe laat u verwacht aan te komen." },
        { title: "Aankomst", description: "Vanaf 15:00 staat de thee klaar. U krijgt uw sleutel, een kaart van de buurt en desgewenst een tafel voor het diner." },
        { title: "De avond", description: "Beneden gaan de lampen aan: diner in het restaurant, een glas in de bar of een uur in de hammam." },
        { title: "De ochtend", description: "Ontbijt tot 11 uur, aan tafel geserveerd: brood van de bakker om de hoek en eieren zoals u ze het liefst eet." },
        { title: "Vertrek", description: "Uitchecken kan tot 12:00. Uw bagage bewaren we zolang u nog door de stad wilt lopen." },
      ],
    },
    { type: "gallery", id: "impressie", title: "Het huis, *kamer voor kamer*", images: ["art:g1", "art:g2", "art:g3", "art:g4", "art:g5", "art:g6", "art:g7"] },
    {
      type: "booking",
      id: "plannen",
      title: "Plan uw *verblijf*",
      body: "Kies uw kamer, het aantal nachten en gasten en de dag van aankomst. We bevestigen uw aanvraag persoonlijk; er wordt niets afgeschreven.",
      kind: "reservation",
      options: ["Grachtkamer", "Tuinkamer", "Pakzolder", "Suite Keizer", "Atelierkamer"],
    },
    {
      type: "menu",
      id: "restaurant",
      title: "Restaurant & bar *Keizer*",
      intro: "Op de bel-etage koken we elke avond een korte kaart met wat de markt en de polder brengen. De bar schenkt tot laat. Ook open voor wie niet in het huis slaapt.",
      categories: [
        {
          name: "Ontbijt",
          items: [
            { name: "Keizer-ontbijt", description: "Brood van de bakker, een eitje naar keuze, Hollandse kaas en vers sap", price: "€ 24" },
            { name: "Wentelteefjes", description: "Brioche, kaneel, crème fraîche en geroosterde peer", price: "€ 14" },
            { name: "Poffertjes", description: "Met roomboter en poedersuiker, of met fruit van het seizoen", price: "€ 12" },
          ],
        },
        {
          name: "Diner",
          items: [
            { name: "Noordzeekrab", description: "Groene appel, karnemelk en dille", price: "€ 19" },
            { name: "Gerookte biet", description: "Mierikswortel, hazelnoot en roggecrumble", price: "€ 16", tags: ["Vegetarisch"] },
            { name: "Polderlam", description: "Lamsrug, knolselderij, zwarte knoflook en jus", price: "€ 34" },
            { name: "Zeeduivel", description: "Beurre blanc, zeekraal en krielaardappels", price: "€ 32" },
            { name: "Hangop", description: "Rabarber en een koekje van de bakker", price: "€ 11" },
          ],
        },
        {
          name: "Bar",
          items: [
            { name: "Grachten-negroni", description: "Jenever, rode vermout en bitter, op een groot ijsblok", price: "€ 15" },
            { name: "Oude jenever", description: "Een glas uit het vat, met een paar bitterballen", price: "€ 9" },
            { name: "Wijn van de week", description: "Per glas, gekozen door de bar", price: "€ 8" },
          ],
        },
      ],
      note: "Voorbeeldkaart met voorbeeldprijzen. Reserveren voor het diner wordt aangeraden, zeker in het weekend.",
    },
    { type: "hours", id: "openingstijden", title: "Restaurant & bar, *vanavond*", note: "De receptie is dag en nacht bereikbaar voor gasten van het huis. Dit zijn de tijden van restaurant en bar." },
    {
      type: "faq",
      id: "vragen",
      title: "Goed om te *weten*",
      items: [
        { q: "Hoe laat kan ik inchecken en uitchecken?", a: "Inchecken kan vanaf 15:00, uitchecken tot 12:00. Komt u eerder aan of vertrekt u later? Uw bagage bewaren we graag, en we kijken altijd of uw kamer eerder klaar kan zijn." },
        { q: "Kan ik met de auto komen?", a: "Het huis ligt in het autoluwe centrum. We raden aan met de trein te komen. Met de auto parkeert u het voordeligst bij een P+R aan de rand van de stad; vandaar bent u met het openbaar vervoer snel bij ons." },
        { q: "Zijn er veel trappen?", a: "Het is een grachtenhuis: de trappen zijn steil en er is geen lift. De Tuinkamer ligt op de begane grond. Laat het ons weten als traplopen lastig is, dan denken we met u mee." },
        { q: "Kan ik in het restaurant eten zonder te overnachten?", a: "Zeker. Restaurant en bar zijn open voor iedereen. Reserveren voor het diner wordt aangeraden, zeker in het weekend." },
        { q: "Zijn kinderen en huisdieren welkom?", a: "Kinderen zijn welkom; in de Suite Keizer past een extra bed. Huisdieren kunnen we vanwege de oude vloeren en trappen helaas niet ontvangen." },
        { q: "Hoe werkt annuleren?", a: "Tot drie dagen voor aankomst annuleert u kosteloos. Daarna rekenen we de eerste nacht. Bij een arrangement kunnen andere voorwaarden gelden; die noemen we altijd vooraf." },
      ],
    },
    {
      type: "contact",
      id: "ligging",
      title: "Midden in de *grachtengordel*",
      body: "Maison Keizer ligt in het centrum van Amsterdam, op loopafstand van het Centraal Station. Een vraag over uw verblijf of een bijzonder verzoek? Schrijf ons gerust.",
      showForm: true,
      showMap: false,
    },
  ],
  footer: { blurb: "Een klein hotel met eigen restaurant en bar, in een grachtenhuis midden in Amsterdam." },
};
