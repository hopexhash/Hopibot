import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo content of the Skyline template: a fictional rooftop bar in Rotterdam. The programme
 * describes the bar's own recurring nights (no dates, no artists); prices only as examples.
 */
const photo = (key: string, id: string, alt: string) => ({ key, src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=1600`, alt, license: "stock" as const, credit: "Unsplash" });

export const sample: SiteSpec = {
  meta: {
    title: "Skyline Rooftop — Rooftop bar in Rotterdam",
    description: "Skyline Rooftop in Rotterdam: cocktails, dj's en uitzicht over de stad vanaf een overkapt dakterras. Bekijk het weekprogramma en reserveer een tafel.",
    lang: "nl",
    keywords: ["rooftop bar Rotterdam", "cocktailbar Rotterdam", "dakterras Rotterdam", "sunset", "uitgaan Rotterdam", "borrel", "tafel reserveren", "afterwork"],
  },
  theme: { template: "restaurant", design: "skyline", variation: 0, primary: "#07080d", accent: "#ff4d8d", mode: "dark", font: "Big Shoulders Display", radius: "round" },
  business: {
    name: "Skyline Rooftop",
    tagline: "Cocktails, muziek en de stad tot laat",
    phone: null,
    email: null,
    address: null,
    city: "Rotterdam",
    mapsUrl: null,
    openingHours: ["Maandag: Gesloten", "Dinsdag: Gesloten", "Woensdag: 17:00 – 00:00", "Donderdag: 17:00 – 01:00", "Vrijdag: 17:00 – 02:00", "Zaterdag: 16:00 – 02:00", "Zondag: 14:00 – 23:00"],
  },
  images: [
    photo("hero", "1496568816309-51d7c20e3b21", "Een stad bij schemering vanuit de hoogte, met verlichte torens en paarse lucht"),
    photo("hero-2", "1566417713940-fe7c737a9ef2", "Een bartender schenkt een cocktail in paars en roze licht"),
    photo("hero-3", "1575444758702-4a6b9222336e", "Gasten aan de bar voor een verlichte wand vol flessen"),
    photo("tafel", "1599458252573-56ae36120de1", "Een gereserveerde tafel met de lichtjes van de stad op de achtergrond"),
    photo("about", "1572116469696-31de0f17cc34", "Een lange bar met hanglampen en rijen flessen in warm licht"),
    photo("art:svc0", "1516997121675-4c2d1684aa3e", "Wijnglazen op een tafel in roze en paars licht"),
    photo("art:svc1", "1519671482749-fd09be7ccebf", "Vrienden proosten met glazen wijn"),
    photo("art:svc2", "1496337589254-7e19d01cec44", "Een dj draait voor een dansend publiek onder gekleurd licht"),
    photo("art:svc3", "1566737236500-c8ac43014a67", "Een donkere ruimte met lijnen van rood licht en een publiek"),
    photo("art:svc4", "1514362545857-3bc16c4c7d1b", "Een cocktail met ijs en kruiden op een houten plank in het donker"),
    photo("g-cocktail", "1536935338788-846bb9981813", "Een donkere cocktail met gedroogde citrus en bessen"),
    photo("g-martini", "1597075687490-8f673c6c17f6", "Een martini op de bar met flessen in de achtergrond"),
    photo("g-proost", "1527529482837-4698179dc6ce", "Gasten proosten aan een tafel onder lichtslingers"),
    photo("g-dans", "1545128485-c400e7702796", "Silhouetten van gasten in rood licht"),
    photo("g-flessen", "1525268323446-0505b6fe7778", "Silhouetten van flessen tegen oranje en rood licht"),
    photo("g-straat", "1519608487953-e999c86e7455", "Een lege straat in de stad bij nacht, in blauw en paars licht"),
    photo("uitzicht", "1444723121867-7a241cacace9", "De lichtjes van een uitgestrekte stad na zonsondergang"),
  ],
  hero: {
    eyebrow: "Rooftop bar",
    headline: "Boven de stad, *na zonsondergang*",
    subheadline: "Cocktails, dj's en het uitzicht over Rotterdam vanaf ons overkapte dakterras. Elke avond een eigen programma: reserveer een tafel of loop gewoon binnen.",
    primaryCta: { label: "Reserveer een tafel", href: "#reserveren" },
    secondaryCta: { label: "Het programma", href: "#programma" },
    image: "hero",
    layout: "fullbleed",
    note: "Elke avond open",
  },
  sections: [
    {
      type: "about",
      id: "rooftop",
      title: "Het dak van *de stad*",
      paragraphs: [
        "Skyline is een bar op het dak, met een overkapt terras, een lange bar en de stad als decor. Je komt voor één drankje bij zonsondergang en blijft tot de lichten van de havens aangaan.",
        "Achter de bar maken we klassiekers en eigen cocktails met siropen, infusies en garnituren die we zelf bereiden. De keuken serveert kleine gerechten om te delen, tot laat op de avond.",
      ],
      image: "about",
      highlights: ["Overkapt terras", "Eigen cocktails", "Dj's in het weekend", "Bites tot laat"],
    },
    {
      type: "services",
      id: "programma",
      title: "Het *programma*",
      intro: "Elke avond heeft een eigen karakter. Dit is hoe onze week klinkt; kijk op de avond zelf welke sfeer je zoekt.",
      items: [
        { title: "Woensdag — Vinyl & spritz", description: "Platen uit onze eigen collectie, spritz in vijf varianten en de eerste avondzon op het terras.", icon: "wine", duration: "17:00 – 00:00", price: null },
        { title: "Donderdag — Afterwork", description: "Borrelen boven de stad met bites uit de keuken. Kom vroeg voor een plek aan de reling.", icon: "chat", duration: "17:00 – 01:00", price: null },
        { title: "Vrijdag — Sunset sessions", description: "Een dj speelt de zon onder: warme house en disco terwijl de stad om ons heen aangaat.", icon: "sun", duration: "Vanaf 19:00", price: null },
        { title: "Zaterdag — Late night", description: "Na het diner gaat het licht omlaag en de muziek omhoog. Tafels voor groepen alleen op reservering.", icon: "spark", duration: "22:00 – 02:00", price: null },
        { title: "Zondag — Slow Sunday", description: "Een lange middag zonder haast: jazz op de achtergrond, cocktails en een kleine kaart om te delen.", icon: "coffee", duration: "14:00 – 23:00", price: null },
      ],
    },
    {
      type: "menu",
      id: "kaart",
      title: "De *kaart*",
      intro: "Eigen cocktails, klassiekers en een volwaardige alcoholvrije kaart. Uit de keuken: kleine gerechten om te delen.",
      categories: [
        {
          name: "Signatures",
          items: [
            { name: "Skyline Sour", description: "Bourbon, citroen, siroop van rood fruit en een kraag van eiwit.", price: "€ 14" },
            { name: "Neon Negroni", description: "Gin, rode bitter en vermout, gerijpt met sinaasappelschil.", price: "€ 14" },
            { name: "Haven Highball", description: "Japanse whisky, yuzu en zelfgemaakte gembersoda.", price: "€ 13" },
            { name: "Smoked Old Fashioned", description: "Rum, demerara en bitters, aan tafel gerookt met eikenhout.", price: "€ 15" },
          ],
        },
        {
          name: "Spritz & bubbels",
          items: [
            { name: "Spritz rosso", description: "Rode bitter, prosecco en sodawater met sinaasappel.", price: "€ 11" },
            { name: "Vlierbloesem spritz", description: "Vlierbloesem, munt, prosecco en limoen.", price: "€ 11" },
            { name: "Champagne per glas", description: "Brut van een kleine producent; ook per fles.", price: "€ 16" },
          ],
        },
        {
          name: "Alcoholvrij",
          items: [
            { name: "Sunset fizz", description: "Bloedsinaasappel, rozemarijn en tonic.", price: "€ 8", tags: ["0,0%"] },
            { name: "Ginger & yuzu", description: "Zelfgemaakte gembersoda met yuzu en limoen.", price: "€ 8", tags: ["0,0%"] },
            { name: "Alcoholvrije spritz", description: "Alcoholvrije bitter met bubbels en sinaasappel.", price: "€ 9", tags: ["0,0%"] },
          ],
        },
        {
          name: "Bites",
          items: [
            { name: "Edamame", description: "Met zeezout en chili.", price: "€ 6", tags: ["Vegan"] },
            { name: "Bao met krokante kip", description: "Gestoomd broodje, gochujang-mayonaise en ingelegde komkommer.", price: "€ 12" },
            { name: "Oesters", description: "Per stuk, met mignonette van sjalot.", price: "€ 4" },
            { name: "Bitterballen van short rib", description: "Zes stuks met grove mosterd.", price: "€ 10" },
          ],
        },
      ],
      note: "Voorbeeldprijzen. De kaart wisselt met het seizoen; vraag aan de bar naar de cocktail van de week.",
    },
    {
      type: "statement",
      id: "boven",
      title: "Overdag een dak. Na zonsondergang *de stad aan je voeten*.",
      note: "Rooftop bar · Rotterdam",
    },
    {
      type: "features",
      id: "de-plek",
      title: "Wat je *boven* vindt",
      intro: "Een dak dat werkt in elk seizoen, met plek voor twee of voor een hele groep.",
      items: [
        { title: "Overkapt terras", description: "Glazen windschermen, heaters en dekens: het terras is open zolang de bar open is.", icon: "sun" },
        { title: "Bar met uitzicht", description: "Aan de lange bar kijk je zo over de stad, terwijl je ziet hoe je cocktail wordt gemaakt.", icon: "wine" },
        { title: "Lounge voor groepen", description: "Loungeplekken voor acht tot twintig personen, met een vaste host voor de avond.", icon: "user" },
      ],
    },
    { type: "gallery", id: "sfeer", title: "Na *donker*", images: ["g-cocktail", "g-martini", "g-proost", "g-dans", "g-flessen", "g-straat"] },
    {
      type: "showcase",
      id: "uitzicht",
      title: "De stad *aan je voeten*",
      body: "Kom net voor zonsondergang en zie hoe de stad onder je aangaat, lampje voor lampje.",
      image: "uitzicht",
      cta: { label: "Reserveer voor sunset", href: "#reserveren" },
    },
    {
      type: "booking",
      id: "reserveren",
      title: "Tafel *boeken*",
      body: "Kies je avond en het aantal gasten. Voor groepen vanaf acht personen nemen we contact met je op over een loungeplek. Zonder reservering ben je ook welkom, zolang er plek is.",
      kind: "reservation",
      options: [],
    },
    { type: "hours", id: "openingstijden", title: "Open tot *laat*", note: "De keuken serveert bites tot een uur voor sluiting. Bij storm of onweer sluiten we het open deel van het terras." },
    {
      type: "faq",
      id: "vragen",
      title: "Voor je *naar boven* gaat",
      items: [
        { q: "Is er een dresscode?", a: "Geen strikte dresscode; verzorgd is prima. Op zaterdagavond weigeren we sportkleding en slippers." },
        { q: "Wat is de minimumleeftijd?", a: "Alcohol schenken we vanaf 18 jaar. Op vrijdag- en zaterdagavond is de bar na 22:00 uur toegankelijk vanaf 21 jaar." },
        { q: "Wat als het regent?", a: "Het grootste deel van het terras is overkapt en verwarmd. Alleen bij storm of onweer sluiten we het open deel." },
        { q: "Kan ik zonder reservering komen?", a: "Ja, de bar en een deel van het terras houden we vrij voor binnenlopers. Voor een tafel op vrijdag en zaterdag raden we reserveren aan." },
        { q: "Kunnen we het dak afhuren?", a: "Voor besloten borrels en feesten kun je een deel of het hele dak afhuren. Stuur ons een bericht met datum en aantal gasten." },
      ],
    },
    {
      type: "contact",
      id: "contact",
      title: "Contact",
      body: "Een vraag over een reservering, een groep of een besloten avond? Stuur ons een bericht, dan hoor je binnen een werkdag van ons.",
      showForm: true,
      showMap: false,
    },
  ],
  footer: { blurb: "Rooftop bar met cocktails, dj's en uitzicht over Rotterdam. Open van woensdag tot en met zondag, tot laat." },
};
