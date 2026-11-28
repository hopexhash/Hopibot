import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo content of the Étoile template: a fictional fine-dining restaurant in Utrecht. No address,
 * phone number or e-mail (the demo bar labels the site a concept); prices only as examples.
 */
const photo = (key: string, id: string, alt: string) => ({ key, src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=1600`, alt, license: "stock" as const, credit: "Unsplash" });

export const sample: SiteSpec = {
  meta: {
    title: "Restaurant Étoile — Fine dining in Utrecht",
    description: "Restaurant Étoile in Utrecht serveert één seizoensmenu in acht gangen, met wijnarrangement of alcoholvrije begeleiding. Reserveer uw tafel online.",
    lang: "nl",
    keywords: ["fine dining Utrecht", "restaurant Utrecht", "proeverijmenu", "chef's table", "wijnarrangement", "diner Utrecht", "seizoensmenu", "romantisch diner"],
  },
  theme: { template: "restaurant", design: "etoile", variation: 0, primary: "#121110", accent: "#c6a46a", mode: "dark", font: "Italiana", radius: "sharp" },
  business: {
    name: "Restaurant Étoile",
    tagline: "Eén menu, acht gangen, een avond die blijft",
    phone: null,
    email: null,
    address: null,
    city: "Utrecht",
    mapsUrl: null,
    openingHours: ["Maandag: Gesloten", "Dinsdag: Gesloten", "Woensdag – Zaterdag: 18:00 – 23:30", "Zondag: 12:30 – 17:00"],
  },
  images: [
    photo("hero", "1544510808-91bcbee1df55", "Dessert van verse vijgen, granaatappel en bessen op een wit bord, in warm avondlicht"),
    photo("about", "1577219491135-ce391730fb2c", "De chef werkt een gerecht af onder koperen warmhoudlampen"),
    photo("keuken", "1551218808-94e220e084d2", "Handen van een kok snijden verse kruiden op een plank"),
    photo("gang-1", "1626200419199-391ae4be7a41", "Groene soep van doperwt met een krokante grissini en basilicum"),
    photo("gang-2", "1625944525533-473f1a3d54e7", "Tartaar van zalm met forelkaviaar en basilicum in een diep wit bord"),
    photo("gang-3", "1590759668628-05b0fc34bb70", "Kreeft met citroen op een wit bord op donkere leisteen"),
    photo("gang-4", "1580959375944-abd7e991f971", "Gebakken visfilet op spinazie met een romige saus"),
    photo("gang-5", "1543826173-70651703c5a4", "Gerecht van knolselderij met strepen saffraansaus op een zwart bord"),
    photo("gang-6", "1588168333986-5078d3ae3976", "Rosé gebakken rundvlees in close-up tegen een donkere achtergrond"),
    photo("gang-7", "1452195100486-9cc805987862", "Blauwe kaas met vijgen, walnoten en kruiden op een donkere plank"),
    photo("gang-8", "1551024506-0bccd828d307", "Karamel wordt over een dessert met ijs geschonken, tegen een zwarte achtergrond"),
    photo("zaal", "1578474846511-04ba529f0b88", "Donkere eetzaal met gedekte tafels en gedimd licht"),
    photo("g-zalm", "1611599537845-1c7aca0091c0", "Gegrilde zalm met tomaat en kruiden in een donkere schaal"),
    photo("g-wijn", "1603073163308-9654c3fb70b5", "Gegrild vlees en groenten met een glas rode wijn op een gedekte tafel"),
    photo("g-tafel", "1584255014406-2a68ea38e48c", "Wit bord met bestek en een takje kruiden op marmer"),
    photo("g-olie", "1546241072-48010ad2862c", "Olijfolie wordt over broccoli geschonken op een donker bord"),
    photo("g-zee", "1615141982883-c7ad0e69fd62", "Verse vis, kreeft en schelpdieren op ijs"),
    photo("g-diner", "1625937286074-9ca519d5d9df", "Een gast proeft aan een donkere tafel bij kaarslicht"),
    photo("chefs-table", "1414235077428-338989a2e8c0", "Een gedekte tafel met wijnglazen en een fijn opgemaakt gerecht"),
  ],
  hero: {
    eyebrow: "Fine dining",
    headline: "Acht gangen, één *onvergetelijke* avond",
    subheadline: "Een seizoensmenu van de chef, geserveerd in een intieme eetzaal in het hart van Utrecht. Reserveer uw tafel en laat de avond zich gang voor gang ontvouwen.",
    primaryCta: { label: "Reserveer een tafel", href: "#reserveren" },
    secondaryCta: { label: "Bekijk het menu", href: "#menu" },
    image: "hero",
    layout: "fullbleed",
    note: "Seizoensmenu",
  },
  sections: [
    {
      type: "about",
      id: "verhaal",
      title: "Een keuken die *luistert* naar het seizoen",
      paragraphs: [
        "Bij Étoile begint een gerecht niet bij een idee, maar bij wat er deze week op het land, in de zee en bij onze kwekers klaarstaat.",
        "De chef stelt elk seizoen één menu samen. Geen keuzestress, geen haast: u schuift aan, wij nemen u mee. Van de eerste amuse tot de laatste mignardise vertelt elke gang een deel van hetzelfde verhaal.",
        "De eetzaal telt een beperkt aantal tafels, zodat de bediening tijd heeft voor elke gast en de keuken voor elk bord.",
      ],
      image: "about",
      highlights: ["Eén seizoensmenu", "Wijn & alcoholvrij", "Chef's table"],
    },
    {
      type: "menu",
      id: "menu",
      title: "Het avondmenu",
      intro: "Acht gangen in vier bedrijven. Het menu wisselt met het seizoen; dieetwensen verwerken we graag als u ze bij uw reservering doorgeeft.",
      categories: [
        {
          name: "Ouverture",
          items: [
            { name: "Doperwt & lavas", description: "Koude soep van jonge doperwten, lavasolie en een krokante grissini van zuurdesem.", price: null, tags: ["Vegetarisch"] },
            { name: "Zalm & forelkaviaar", description: "Tartaar van licht gerookte zalm, eidooier, avocado en zilte forelkaviaar.", price: null },
          ],
        },
        {
          name: "Uit de zee",
          items: [
            { name: "Oosterschelde kreeft", description: "Halve kreeft in beurre blanc van citroen, met venkel en dragon.", price: null },
            { name: "Zeebaars & spinazie", description: "Op de huid gebakken zeebaars, spinazie, tomaat en een saus van champagne.", price: null },
          ],
        },
        {
          name: "Van het land",
          items: [
            { name: "Knolselderij & saffraan", description: "Knolselderij uit de zoutkorst, gepofte gerst, saffraan en zure room.", price: null, tags: ["Vegetarisch"] },
            { name: "Rund & zwarte knoflook", description: "Dry aged rund, jus van rode wijn, zwarte knoflook en geroosterde ui.", price: null },
          ],
        },
        {
          name: "Finale",
          items: [
            { name: "Kaas van de boerderij", description: "Een kleine selectie Nederlandse kazen met vijg, walnoot en vijgenbrood.", price: null },
            { name: "Karamel & vanille", description: "IJs van vanille, gezouten boterkaramel aan tafel geschonken en krokante cacao.", price: null },
          ],
        },
      ],
      note: "Voorbeeldprijzen: avondmenu € 135 p.p. · wijnarrangement € 85 · alcoholvrije begeleiding € 55. Het menu wisselt met het seizoen.",
    },
    {
      type: "statement",
      id: "belofte",
      title: "Wij koken niet om te imponeren, maar om een avond *stil en volledig* te laten zijn.",
      note: "Onze belofte",
    },
    {
      type: "features",
      id: "beleving",
      title: "Wat u mag *verwachten*",
      intro: "Drie dingen die elke avond bij Étoile hetzelfde zijn, hoe het menu ook verandert.",
      items: [
        { title: "Het seizoen eerst", description: "Groenten, vis en vlees van Nederlandse kwekers, vissers en boeren, gekozen op het moment dat ze op hun best zijn.", icon: "leaf" },
        { title: "Wijn of alcoholvrij", description: "Bij elke gang een passend glas, of een begeleiding van huisgemaakte sappen, thee en kombucha.", icon: "wine" },
        { title: "Aan de chef's table", description: "Wie de keuken van dichtbij wil zien, reserveert een plek aan de tafel bij de pass.", icon: "utensils" },
      ],
    },
    {
      type: "process",
      id: "de-avond",
      title: "De *avond*",
      intro: "Reken op ongeveer drie uur. Neem de tijd: de tafel is de hele avond van u.",
      steps: [
        { title: "Aperitief", description: "U wordt ontvangen met een aperitief en de eerste hapjes uit de keuken." },
        { title: "Acht gangen", description: "Het menu ontvouwt zich in vier bedrijven, met uitleg van wie het bord serveert." },
        { title: "Kaas & digestief", description: "Een selectie kazen, of direct door naar het dessert: u kiest." },
        { title: "Koffie & mignardises", description: "De avond eindigt met koffie of thee en kleine zoetigheden." },
      ],
    },
    { type: "gallery", id: "impressie", title: "Aan *tafel*", images: ["g-zalm", "g-wijn", "g-tafel", "g-olie", "g-zee", "g-diner"] },
    {
      type: "showcase",
      id: "chefs-table",
      title: "Aan de *chef's table*",
      body: "Zes plaatsen aan de pass, met zicht op elke handeling in de keuken. Een avond voor wie wil zien hoe een bord ontstaat.",
      image: "chefs-table",
      cta: { label: "Reserveer de chef's table", href: "#reserveren" },
    },
    {
      type: "booking",
      id: "reserveren",
      title: "Reserveren",
      body: "Kies een datum, een tijd en het aantal gasten. Wij bevestigen uw reservering persoonlijk en vragen dan naar dieetwensen of een bijzondere gelegenheid.",
      kind: "reservation",
      options: [],
    },
    { type: "hours", id: "openingstijden", title: "Openingstijden", note: "Wij serveren het avondmenu vanaf 18:00 uur; de laatste aanvang is om 20:30 uur. Op zondag serveren wij een lunchmenu." },
    {
      type: "faq",
      id: "vragen",
      title: "Goed om te *weten*",
      items: [
        { q: "Kan het menu worden aangepast aan mijn dieet?", a: "Ja. Geef allergieën en dieetwensen door bij uw reservering, dan past de keuken de gangen voor u aan. Een volledig vegetarisch menu is altijd mogelijk." },
        { q: "Hoe lang duurt een avond?", a: "Reken op ongeveer drie uur voor het volledige menu. Wilt u eerder weg, laat het ons dan weten bij aankomst." },
        { q: "Is er een kledingvoorschrift?", a: "Nee. Kom zoals u zich prettig voelt; de meeste gasten kiezen voor iets nettere kleding." },
        { q: "Kan ik een reservering annuleren?", a: "Tot 48 uur van tevoren kunt u kosteloos annuleren of wijzigen. Daarna rekenen wij een deel van het menu, omdat de keuken al voor u heeft ingekocht." },
        { q: "Bieden jullie cadeaubonnen aan?", a: "Ja, een diner bij Étoile is als cadeaubon te geven. Vraag ernaar via het contactformulier." },
      ],
    },
    {
      type: "contact",
      id: "contact",
      title: "Contact",
      body: "Een vraag over een reservering, een besloten diner of een cadeaubon? Stuur ons een bericht; wij antwoorden binnen een werkdag.",
      showForm: true,
      showMap: false,
    },
  ],
  footer: { blurb: "Een seizoensmenu in acht gangen, met een wijnarrangement of alcoholvrije begeleiding. Wij ontvangen u graag in Utrecht." },
};
