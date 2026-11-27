/**
 * Landing pages of the public website. One page per search intent (see docs/SEO.md for the
 * keyword map): never two pages for the same query. Copy is Dutch, informal ("je"), and may
 * use *emphasis*, [links](/pad) and price placeholders such as {starter} or {hosting}, which
 * are filled from Settings → Pricing so no amount is ever hardcoded.
 */

export type Landing = {
  /** URL path, e.g. /website-laten-maken/restaurant. */
  path: string;
  kind: "pillar" | "industry" | "audience" | "service";
  /** Short label for menus, breadcrumbs and related links. */
  label: string;
  /** Name of the service for structured data. */
  service: string;
  keywords: { primary: string; secondary: string[] };
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: { h2: string; body?: string[]; items?: { title: string; text: string }[]; list?: string[] }[];
  /** "quote": no fixed price (webshops). The page then asks for a quotation instead of showing packages. */
  pricing?: "fixed" | "quote";
  /** Link text when other pages link here; defaults to "Website voor <label>" for industry pages. */
  linkLabel?: string;
  /** Portfolio demo shown on the page (key from work.ts). */
  work?: string;
  /** Catalogue add-ons that fit this page. */
  addons?: string[];
  addonsTitle?: string;
  faq: { q: string; a: string }[];
  related: string[];
};

const industry = (slug: string, rest: Omit<Landing, "path" | "kind">): Landing => ({ path: `/website-laten-maken/${slug}`, kind: "industry", ...rest });

export const PILLAR: Landing = {
  path: "/website-laten-maken",
  kind: "pillar",
  label: "Website laten maken",
  service: "Website laten maken",
  keywords: { primary: "website laten maken", secondary: ["website laten bouwen", "professionele website laten maken", "website laten maken bedrijf", "webdesigner inhuren"] },
  title: "Website laten maken? Eerst zien, dan betalen | HOPI",
  description: "Laat je website maken door HOPI. Je ziet eerst gratis een ontwerp van je eigen site en betaalt pas als het bevalt. Vaste prijzen vanaf {from}, excl. btw.",
  eyebrow: "Website laten maken",
  h1: "Een website laten maken, *zonder* gok",
  intro: "Een website laten maken voelt vaak als een sprong in het diepe: je betaalt vooraf en hoopt dat het resultaat bevalt. Bij HOPI draaien we het om. Je ziet eerst een ontwerp van je eigen website, met je naam, je diensten en je stijl. Pas als je tevreden bent, kies je een pakket.",
  sections: [
    {
      h2: "Wat je krijgt als je je website laat maken",
      body: ["Een professionele website is meer dan een mooi plaatje. Het is de plek waar een bezoeker in een paar seconden beslist of hij belt, reserveert of verder zoekt. Daarom letten we bij elke website op dezelfde dingen."],
      items: [
        { title: "Een eigen ontwerp", text: "Kleuren, letters en opbouw die passen bij je vak en je klanten. Geen sjabloon dat er bij de buren net zo uitziet." },
        { title: "Gemaakt voor mobiel", text: "We ontwerpen eerst voor de telefoon, omdat veel bezoekers je daar opzoeken. Daarna voor tablet en computer." },
        { title: "Contact met één tik", text: "Bellen, een offerte aanvragen, reserveren of een afspraak maken: de knop staat altijd binnen handbereik." },
        { title: "Een goede basis voor Google", text: "Snelle pagina's, duidelijke koppen en nette techniek, zodat zoekmachines begrijpen wat je doet en waar." },
        { title: "Online zonder gedoe", text: "Wij regelen hosting, SSL, back-ups en updates. Jij hoeft niets technisch te doen." },
        { title: "Eén aanspreekpunt", text: "Voor vragen en wijzigingen heb je steeds hetzelfde contact." },
      ],
    },
    {
      h2: "Laten maken of zelf bouwen?",
      body: [
        "Met een websitebouwer kun je zelf een site in elkaar zetten. Dat is goedkoop als je de tijd hebt en het leuk vindt. De keerzijde: je moet zelf nadenken over opbouw, teksten, vindbaarheid en hoe het er op een telefoon uitziet, en veel zelfgebouwde sites blijven half af.",
        "Laat je je website maken, dan koop je vooral tijd en ervaring. Het verschil met de meeste bureaus is dat je bij HOPI niet op een offerte hoeft te vertrouwen: je beoordeelt een echt ontwerp. In ons artikel [website laten maken of zelf bouwen](/blog/website-laten-maken-of-zelf-bouwen) zetten we beide routes eerlijk naast elkaar. Hoe wij AI gebruiken om snel een eerste ontwerp te maken, lees je bij [AI website laten maken](/ai-website-laten-maken).",
      ],
    },
    {
      h2: "Wat kost een website laten maken?",
      body: [
        "Bij HOPI betaal je een vast bedrag: {starter} voor een one-page website, {business} voor een complete website en {premium} voor een op maat ontworpen site met bijvoorbeeld een reserverings- of boekingssysteem. Hosting en onderhoud kosten vanaf {hosting} per maand. Alle prijzen zijn exclusief {vat} btw en staan op de pagina [prijzen](/prijzen).",
        "Wil je weten hoe die bedragen zich verhouden tot de rest van de markt en waar je bij offertes op moet letten? Lees dan [wat kost een website laten maken](/blog/wat-kost-een-website-laten-maken).",
      ],
    },
  ],
  faq: [
    { q: "Is het ontwerp vooraf echt gratis?", a: "Ja. Je ziet eerst een ontwerp van je eigen website. Pas als het bevalt en je een pakket kiest, betaal je. Bevalt het niet, dan zit je nergens aan vast." },
    { q: "Hoe lang duurt het om een website te laten maken?", a: "Dat hangt af van het pakket en van hoe snel teksten en foto's compleet zijn. Zodra je akkoord geeft op het ontwerp, spreken we samen een planning af." },
    { q: "Moet ik zelf teksten en foto's aanleveren?", a: "Je vertelt wat je doet; wij zetten een eerste versie van de teksten in het ontwerp. Eigen foto's maken een website persoonlijker. Heb je die niet, dan denken we mee over een oplossing. Professionele teksten en fotografie zijn als extra beschikbaar." },
    { q: "Heb ik al een domeinnaam nodig?", a: "Nee. Heb je er al een, dan koppelen we die. Zo niet, dan helpen we je een passende domeinnaam te registreren." },
    { q: "Kan ik mijn website later laten aanpassen?", a: "Ja. Met een onderhoudsabonnement passen wij kleine dingen voor je aan, zoals openingstijden, prijzen of nieuwe foto's." },
    { q: "Voor welke bedrijven maakt HOPI websites?", a: "Voor ondernemers in Nederland en België: van restaurants, cafés, lunchrooms, kappers en schoonheidssalons tot garages, loodgieters, bouwbedrijven, tandartsen en makelaars. Zowel zzp'ers als mkb-bedrijven. Een [webshop](/website-laten-maken/webshop) maken we op offerte." },
  ],
  related: ["/prijzen", "/website-redesign", "/website-onderhoud", "/blog/wat-kost-een-website-laten-maken"],
};

export const LANDINGS: Landing[] = [
  industry("restaurant", {
    label: "Restaurant",
    service: "Website laten maken voor restaurants",
    keywords: { primary: "website laten maken restaurant", secondary: ["restaurant website laten maken", "restaurant website bouwen", "website voor restaurant"] },
    title: "Website laten maken voor je restaurant | HOPI",
    description: "Een restaurantwebsite met menukaart, reserveren en openingstijden, gemaakt voor de telefoon. Eerst gratis een ontwerp zien, vaste prijs vanaf {from}.",
    eyebrow: "Website voor restaurants",
    h1: "Website laten maken voor je *restaurant*",
    intro: "Wie uit eten wil, pakt zijn telefoon. Binnen een minuut wil een gast weten wat er op de kaart staat, of je open bent en hoe hij een tafel regelt. Een goede restaurantwebsite geeft die antwoorden meteen en laat proeven hoe het bij jou is.",
    sections: [
      {
        h2: "Waar gasten op je website naar zoeken",
        items: [
          { title: "De menukaart", text: "Als gewone webpagina, goed leesbaar op een telefoon. Geen pdf waar je op moet inzoomen." },
          { title: "Reserveren of bellen", text: "Een knop die altijd in beeld is, zodat een tafel boeken geen zoektocht wordt." },
          { title: "Openingstijden en route", text: "Vandaag open tot hoe laat, en waar parkeer ik? Het staat bovenaan, niet onderaan." },
          { title: "De sfeer", text: "Foto's van de zaak en de gerechten vertellen meer dan drie alinea's tekst." },
        ],
      },
      {
        h2: "Wat we voor een restaurant bouwen",
        body: ["Elk restaurant krijgt een eigen gezicht: een bistro vraagt om iets anders dan een pizzeria of een sterrenzaak. In het ontwerp dat je vooraf ziet, staan je eigen naam, je kaart en je stijl al op hun plek. Wat er allemaal op een goede restaurantwebsite hoort, lees je in [deze checklist](/blog/wat-moet-er-op-een-restaurantwebsite-staan)."],
        list: ["Een eigen ontwerp dat past bij je keuken en je gasten", "Menukaart die je makkelijk laat bijwerken", "Reserveerknop, of een koppeling met je reserveringssysteem", "Openingstijden, adres en routekaart", "Aparte aandacht voor groepen en besloten avonden", "Een basis om gevonden te worden op 'restaurant' plus je plaats"],
      },
    ],
    work: "restaurant",
    addons: ["menu", "booking", "photography", "gbp"],
    addonsTitle: "Veel gekozen door restaurants",
    faq: [
      { q: "Kan mijn menukaart op de website?", a: "Ja. We zetten je kaart als gewone webpagina op de site, zodat hij op een telefoon goed leesbaar is. Verandert de kaart per seizoen, dan passen we hem aan binnen een onderhoudsabonnement of met de digitale menukaart als extra." },
      { q: "Kunnen gasten online reserveren?", a: "Ja. Gebruik je al een reserveringssysteem, dan koppelen we dat aan je website. Heb je er geen, dan kan een reserveringsformulier of een duidelijke belknop voldoende zijn. We bespreken wat bij jouw zaak past." },
      { q: "Ik heb al een Instagram- of Facebookpagina. Is een website dan nog nodig?", a: "Sociale media zijn goed voor sfeer en trouwe gasten. Een eigen website is de plek die je zelf beheert en die mensen vinden als ze in Google naar een restaurant in jouw plaats zoeken. Daar staan je kaart, tijden en reserveerknop altijd actueel op een rij." },
    ],
    related: ["/website-laten-maken", "/prijzen", "/blog/wat-moet-er-op-een-restaurantwebsite-staan", "/website-laten-maken/horeca"],
  }),
  industry("horeca", {
    label: "Horeca",
    service: "Website laten maken voor horeca",
    keywords: { primary: "website laten maken horeca", secondary: ["website voor cafetaria", "website voor lunchroom", "website café", "snackbar website"] },
    title: "Website laten maken voor horeca en cafés | HOPI",
    description: "Een website voor je café, lunchroom of snackbar met kaart, actuele openingstijden en afhalen. Eerst gratis een ontwerp zien, vanaf {from}.",
    eyebrow: "Website voor horeca",
    h1: "Een website voor je *café*, lunchroom of snackbar",
    intro: "Bij een café, lunchroom of snackbar wil een gast in een paar seconden weten of je open bent, wat er op de kaart staat en of hij kan afhalen. Een website laten maken voor horeca draait dus om snelheid en actuele informatie, niet om lange verhalen. Wij maken een website die dat op de telefoon meteen laat zien, en je ziet eerst gratis een ontwerp voordat je iets betaalt.",
    sections: [
      {
        h2: "Wat een café of lunchroom anders nodig heeft dan een restaurant",
        items: [
          { title: "Afhalen en bezorgen", text: "Een bestel- of belknop die altijd in beeld is. Sta je op een bezorgplatform, dan geeft je eigen website vaste klanten een directe route naar jou. Zo ben je minder afhankelijk van één platform." },
          { title: "Openingstijden die kloppen", text: "Zomer- en wintertijden, dicht op maandag, langer open bij mooi weer: wisselende tijden staan bovenaan en zijn snel aangepast." },
          { title: "De lunchkaart en de daghap", text: "De kaart als gewone webpagina, met een vaste plek voor de daghap of het dagmenu." },
          { title: "Het terras", text: "Foto's van het terras, de bar of de toonbank laten zien waar gasten terechtkomen." },
          { title: "Events en groepen", text: "Een quizavond, live muziek of een groepslunch: een agenda voor activiteiten en een formulier voor groepsreserveringen." },
        ],
      },
      {
        h2: "Website laten maken voor horeca: wat we bouwen",
        body: ["Een eetcafé met een volle kaart vraagt om iets anders dan een koffiezaak met vijf soorten bonen of een snackbar waar alles om de bestelknop draait. In het ontwerp dat je vooraf ziet, staan je eigen naam, je kaart en je openingstijden al op hun plek."],
        list: ["Een eigen ontwerp dat past bij je zaak en je gasten", "De kaart als webpagina, met ruimte voor de daghap of het dagmenu", "Een bel- of bestelknop, of een link naar het bestelsysteem dat je al gebruikt", "Openingstijden met uitzonderingen, zoals feestdagen of het terrasseizoen", "Een agenda voor events en een aanvraagformulier voor groepen", "Een basis om gevonden te worden op 'café', 'lunchroom' of 'snackbar' plus je plaats"],
      },
      {
        h2: "Zo werkt het met HOPI voor je zaak",
        body: [
          "Je vult het aanvraagformulier in met de naam van je zaak en je plaats. Onze software zoekt de openbare informatie bij elkaar, zoals je openingstijden en je huidige website, en zet een eerste versie van de teksten in een van onze ontwerpen. Iemand van HOPI controleert het ontwerp voordat jij het krijgt. Hoe we AI daarbij inzetten, lees je bij [AI website laten maken](/ai-website-laten-maken).",
          "Bevalt het ontwerp, dan kies je een pakket en maken we de kaart, de foto's en de teksten samen definitief. Daarna regelen wij hosting en updates. Verandert je kaart of gaat het terras dicht voor de winter, dan geef je dat door en passen wij het aan met een [onderhoudsabonnement](/website-onderhoud).",
        ],
      },
      {
        h2: "Welk pakket past bij een café of snackbar?",
        body: [
          "Voor een snackbar of koffiezaak met één kaart en vaste tijden is Starter ({starter}) vaak genoeg: een one-page website met de kaart, je openingstijden, een routekaart en een belknop. Een eetcafé of lunchroom met events, een groepsmenu en meerdere pagina's past beter bij Business ({business}).",
          "Wil je dat gasten online een tafel of groep reserveren via je reserveringssysteem, dan zit die koppeling in Premium ({premium}) of neem je hem als extra. Alle prijzen zijn exclusief {vat} btw.",
        ],
      },
    ],
    work: "restaurant",
    addons: ["menu", "booking", "gbp", "photography"],
    addonsTitle: "Veel gekozen door horecazaken",
    faq: [
      { q: "Ik sta al op een bezorgplatform. Heb ik dan nog een eigen website nodig?", a: "Een platform helpt om gevonden te worden, maar het is niet van jou: de regels, de presentatie en het contact met de klant liggen daar. Op je eigen website bepaal je zelf wat gasten zien, en wijs je vaste klanten de weg om direct bij jou te bestellen of te bellen." },
      { q: "Kan ik via mijn website bestellingen voor afhalen ontvangen?", a: "Gebruik je al een systeem voor online bestellen, dan zetten we een duidelijke bestelknop op je website die daarnaar verwijst. Wil je dat gasten volledig op je eigen website bestellen en afrekenen, vertel dat bij je aanvraag. Dan hoor je eerlijk wat mogelijk is." },
      { q: "Mijn openingstijden wisselen per seizoen. Hoe houd ik dat actueel?", a: "Je geeft de nieuwe tijden door en wij passen ze aan. Met het abonnement Website Care zijn maandelijkse inhoudswijzigingen inbegrepen, zoals openingstijden, de kaart of een nieuw event. Houd ook je Google Bedrijfsprofiel bij, want ook daar zoeken gasten je tijden op. Het instellen daarvan is als extra beschikbaar." },
      { q: "Kan de daghap of het dagmenu op de website?", a: "Ja. We maken op de kaartpagina een vaste plek voor de daghap of het dagmenu. Wisselt die per week of per seizoen, dan passen we hem aan binnen een onderhoudsabonnement; de digitale menukaart is daarnaast als extra beschikbaar. Wisselt hij elke dag, vertel dat bij je aanvraag, dan zoeken we samen een praktische oplossing." },
      { q: "Kunnen gasten een groep of besloten feest aanvragen?", a: "Ja. We zetten een aanvraagformulier op de website waarin gasten de datum, het aantal personen en hun wensen invullen. De aanvraag komt bij jou in de mailbox binnen. Gebruik je een reserveringssysteem, dan kunnen we dat koppelen." },
    ],
    related: ["/website-laten-maken/restaurant", "/website-laten-maken", "/prijzen", "/blog/beter-vindbaar-in-google"],
  }),
  industry("kapper", {
    label: "Kapper & barbershop",
    service: "Website laten maken voor kappers en barbershops",
    keywords: { primary: "website laten maken kapper", secondary: ["website kapsalon", "kapper website laten maken", "barbershop website"] },
    title: "Website laten maken voor je kapsalon of barbershop | HOPI",
    description: "Een kapperswebsite met behandelingen, prijzen en online afspraken. Je ziet eerst gratis een ontwerp van je eigen site. Vaste prijs vanaf {from}.",
    eyebrow: "Website voor kappers",
    h1: "Website laten maken voor je *kapsalon*",
    intro: "Een nieuwe klant wil drie dingen weten: wat kost het, wanneer kan ik terecht en past deze salon bij mij? Een goede kapperswebsite beantwoordt dat in één oogopslag en maakt een afspraak boeken net zo makkelijk als een berichtje sturen.",
    sections: [
      {
        h2: "Wat klanten van een kapper willen zien",
        items: [
          { title: "Behandelingen en prijzen", text: "Een duidelijke prijslijst voorkomt twijfel en telefoontjes met steeds dezelfde vraag." },
          { title: "Een afspraak maken", text: "Online boeken, bellen of appen: de klant kiest, de knop staat altijd in beeld." },
          { title: "Je werk", text: "Foto's van coupes, kleuringen of baarden laten zien waar je goed in bent." },
          { title: "Tijden en adres", text: "Vandaag open? Koopavond? Het staat direct bovenaan." },
        ],
      },
      {
        h2: "Wat we voor een kapsalon of barbershop bouwen",
        body: ["Een barbershop met leren stoelen heeft een ander karakter dan een kleursalon of een kinderkapper. Dat zie je terug in het ontwerp: van de letters tot de toon van de teksten."],
        list: ["Een eigen ontwerp in de sfeer van je salon", "Prijslijst per behandeling", "Afspraakknop, of een koppeling met je online agenda", "Ruimte voor foto's van je werk en je team", "WhatsApp-knop voor snelle vragen", "Een basis om gevonden te worden op 'kapper' plus je plaats"],
      },
    ],
    work: "beauty-salon",
    addons: ["booking", "whatsapp", "gbp", "photography"],
    addonsTitle: "Veel gekozen door kappers",
    faq: [
      { q: "Kunnen klanten online een afspraak maken?", a: "Ja. Werk je al met een online agenda, dan koppelen we die aan je website. Heb je die nog niet, dan bespreken we de mogelijkheden; een koppeling met een boekingssysteem is als extra beschikbaar." },
      { q: "Kan ik mijn prijzen zelf laten aanpassen?", a: "Ja. Met een onderhoudsabonnement geef je een wijziging door en passen wij hem aan. Zo blijft je prijslijst kloppen zonder dat je zelf iets technisch hoeft te doen." },
      { q: "Werkt dit ook voor een barbershop?", a: "Zeker. Het voorbeeldontwerp op deze pagina is van een barbershop. Elke zaak krijgt een eigen stijl: klassiek, strak of juist uitgesproken." },
    ],
    related: ["/website-laten-maken", "/website-laten-maken/schoonheidssalon", "/prijzen", "/blog/waar-moet-een-goede-bedrijfswebsite-aan-voldoen"],
  }),
  industry("schoonheidssalon", {
    label: "Schoonheidssalon",
    service: "Website laten maken voor schoonheidssalons",
    keywords: { primary: "website laten maken schoonheidssalon", secondary: ["website schoonheidssalon", "beautysalon website laten maken", "website schoonheidsspecialiste"] },
    title: "Website laten maken voor je schoonheidssalon | HOPI",
    description: "Een rustige, verzorgde website voor je schoonheidssalon met behandelingen, prijzen en online boeken. Eerst gratis een ontwerp zien, vanaf {from}.",
    eyebrow: "Website voor schoonheidssalons",
    h1: "Website laten maken voor je *schoonheidssalon*",
    intro: "Wie een behandeling boekt, zoekt rust, vakkennis en vertrouwen. Je website is de eerste indruk van je salon: is die verzorgd, duidelijk en makkelijk te gebruiken, dan is de stap naar een afspraak klein.",
    sections: [
      {
        h2: "Wat klanten van een salon willen weten",
        items: [
          { title: "Welke behandelingen je doet", text: "Per behandeling kort wat het is, hoe lang het duurt en wat het kost." },
          { title: "Wie hen behandelt", text: "Een foto en een paar zinnen over jou en je opleiding geven vertrouwen." },
          { title: "Hoe ze boeken", text: "Online, telefonisch of via WhatsApp, zonder omwegen." },
          { title: "Praktische zaken", text: "Adres, parkeren, openingstijden en wat te doen bij verhindering." },
        ],
      },
      {
        h2: "Wat we voor een schoonheidssalon bouwen",
        body: ["De uitstraling van je website moet aanvoelen als je salon: sereen, luxe, fris of juist persoonlijk en huiselijk. Dat bepalen we samen aan de hand van het ontwerp dat je vooraf ziet."],
        list: ["Een eigen ontwerp in de sfeer van je salon", "Overzicht van behandelingen met prijzen en duur", "Boekknop, of een koppeling met je boekingssysteem", "Een pagina of sectie over jou en je werkwijze", "Ruimte voor acties en cadeaubonnen", "Een basis om gevonden te worden op 'schoonheidssalon' plus je plaats"],
      },
    ],
    work: "beauty-salon",
    addons: ["booking", "whatsapp", "copywriting", "gbp"],
    addonsTitle: "Veel gekozen door salons",
    faq: [
      { q: "Kan ik online boeken aanbieden?", a: "Ja. Gebruik je al een boekingssysteem, dan koppelen we dat. Zo niet, dan bespreken we wat past; de koppeling met een boekingssysteem is als extra beschikbaar." },
      { q: "Ik werk alleen en vanuit huis. Is een website dan niet te veel?", a: "Juist niet. Een one-page website met je behandelingen, prijzen en een boekknop is vaak al genoeg, en laat zien dat je je vak serieus neemt. Daarvoor is het Starter-pakket bedoeld." },
      { q: "Schrijven jullie ook de teksten over mijn behandelingen?", a: "In het ontwerp staat al een eerste versie op basis van wat je ons vertelt. Wil je alle teksten professioneel laten schrijven, dan kan dat als extra." },
    ],
    related: ["/website-laten-maken", "/website-laten-maken/kapper", "/website-laten-maken/zzp", "/prijzen"],
  }),
  industry("garage", {
    label: "Garage & autobedrijf",
    service: "Website laten maken voor garages en autobedrijven",
    keywords: { primary: "website laten maken garage", secondary: ["website autobedrijf laten maken", "website autogarage", "garage website"] },
    title: "Website laten maken voor je garage of autobedrijf | HOPI",
    description: "Een duidelijke website voor je garage met diensten, werkplaatsafspraken en contact met één tik. Eerst gratis een ontwerp zien, vaste prijs vanaf {from}.",
    eyebrow: "Website voor garages",
    h1: "Website laten maken voor je *garage*",
    intro: "Een lampje op het dashboard, de APK die verloopt of een rare tik onder de motorkap: wie een garage zoekt, wil snel weten of jij het kunt oplossen en wanneer de auto terecht kan. Je website moet dat zonder omhaal vertellen.",
    sections: [
      {
        h2: "Wat klanten van een garage willen weten",
        items: [
          { title: "Wat je doet", text: "APK, onderhoud, banden, airco, schade: een helder overzicht per dienst." },
          { title: "Hoe snel ze terecht kunnen", text: "Een afspraak maken of bellen moet met één tik kunnen, ook vanaf de vluchtstrook." },
          { title: "Of je te vertrouwen bent", text: "Wie er werkt, hoe lang je bestaat en hoe je met prijsafspraken omgaat." },
          { title: "Waar je zit", text: "Adres, route en openingstijden van de werkplaats." },
        ],
      },
      {
        h2: "Wat we voor een garage bouwen",
        body: ["Geen poespas, wel duidelijkheid. De website laat zien wat je doet, voor welke merken, en hoe iemand een afspraak maakt."],
        list: ["Een zakelijk, eigen ontwerp", "Diensten overzichtelijk op een rij", "Knop voor een werkplaatsafspraak en een directe belknop", "Ruimte voor merken, keurmerken en je team", "Adres, route en openingstijden", "Een basis om gevonden te worden op 'garage' of 'APK' plus je plaats"],
      },
    ],
    work: "automotive",
    addons: ["booking", "whatsapp", "gbp", "seo"],
    addonsTitle: "Veel gekozen door garages",
    faq: [
      { q: "Kunnen klanten online een werkplaatsafspraak maken?", a: "Ja. Dat kan met een afspraakformulier, of met een koppeling naar het planningssysteem dat je al gebruikt. We bespreken wat het beste bij je werkplaats past." },
      { q: "Kan mijn occasionaanbod op de website?", a: "Een overzicht met een paar auto's kunnen we als pagina opnemen. Een automatische koppeling met een voorraadsysteem zit niet standaard in de pakketten; vertel bij je aanvraag wat je nodig hebt, dan hoor je eerlijk wat mogelijk is." },
      { q: "Ik heb al een oude website. Kunnen jullie die vervangen?", a: "Ja. We kijken naar wat er nu staat en maken een nieuw ontwerp. Lees meer op de pagina over een [website redesign](/website-redesign)." },
    ],
    related: ["/website-laten-maken", "/website-redesign", "/website-laten-maken/loodgieter", "/prijzen"],
  }),
  industry("loodgieter", {
    label: "Loodgieter & installateur",
    service: "Website laten maken voor loodgieters en installateurs",
    keywords: { primary: "website laten maken loodgieter", secondary: ["website loodgieter", "website installatiebedrijf laten maken", "loodgieter website"] },
    title: "Website laten maken voor je loodgietersbedrijf | HOPI",
    description: "Een website voor loodgieters en installateurs waarmee klanten je direct bellen of een offerte aanvragen. Eerst gratis een ontwerp zien, vanaf {from}.",
    eyebrow: "Website voor loodgieters",
    h1: "Website laten maken voor je *loodgietersbedrijf*",
    intro: "Bij een lekkage zoekt niemand rustig drie offertes bij elkaar. De klant pakt zijn telefoon, zoekt een loodgieter in de buurt en belt de eerste die betrouwbaar overkomt. Je website heeft dus één taak: vertrouwen wekken en bellen makkelijk maken.",
    sections: [
      {
        h2: "Wat klanten van een loodgieter willen weten",
        items: [
          { title: "Kun je mijn probleem oplossen?", text: "Lekkage, verstopping, cv-ketel, badkamer: benoem je werk in gewone woorden." },
          { title: "Werk je in mijn buurt?", text: "Een duidelijk werkgebied voorkomt verspilde telefoontjes." },
          { title: "Hoe bereik ik je?", text: "Het telefoonnummer groot bovenaan, met één tik te bellen." },
          { title: "Ben je betrouwbaar?", text: "Wie je bent, welke diploma's of erkenningen je hebt en hoe je werkt." },
        ],
      },
      {
        h2: "Wat we voor een loodgieter of installateur bouwen",
        body: ["De meeste bezoekers komen via hun telefoon en hebben haast. Daarom staat de belknop vast in beeld en lees je bovenaan meteen wat je doet en waar."],
        list: ["Een opvallend, eigen ontwerp", "Diensten en werkgebied in één oogopslag", "Vaste belknop op de telefoon", "Offerteformulier voor grotere klussen", "Ruimte voor erkenningen en foto's van je werk", "Een basis om gevonden te worden op 'loodgieter' plus je plaats"],
      },
    ],
    work: "construction",
    addons: ["whatsapp", "seo", "gbp", "pages"],
    addonsTitle: "Veel gekozen door installateurs",
    faq: [
      { q: "Ik krijg mijn werk nu via mond-tot-mondreclame. Heb ik een website nodig?", a: "Ook wie je via een aanbeveling kent, zoekt je vaak eerst even op. Een verzorgde website bevestigt dat je een serieus bedrijf bent, en zorgt dat nieuwe klanten in je werkgebied je kunnen vinden." },
      { q: "Kan mijn werkgebied op de website?", a: "Ja. We noemen de plaatsen waar je werkt, zodat bezoekers en zoekmachines dat meteen zien. We maken geen nepvestigingen aan: alleen plaatsen waar je echt komt." },
      { q: "Ik heb geen tijd om teksten te schrijven. Is dat een probleem?", a: "Nee. In het ontwerp staat al een eerste versie op basis van wat je ons vertelt. Jij geeft aan wat er niet klopt, wij passen het aan." },
    ],
    related: ["/website-laten-maken", "/website-laten-maken/bouwbedrijf", "/website-laten-maken/zzp", "/blog/beter-vindbaar-in-google"],
  }),
  industry("bouwbedrijf", {
    label: "Bouwbedrijf & aannemer",
    service: "Website laten maken voor bouwbedrijven en aannemers",
    keywords: { primary: "website laten maken bouwbedrijf", secondary: ["website aannemer laten maken", "website bouwbedrijf", "aannemer website"] },
    title: "Website laten maken voor je bouwbedrijf | HOPI",
    description: "Een website voor aannemers en bouwbedrijven die je projecten laat zien en offerteaanvragen oplevert. Eerst gratis een ontwerp zien, vanaf {from}.",
    eyebrow: "Website voor bouwbedrijven",
    h1: "Website laten maken voor je *bouwbedrijf*",
    intro: "Een verbouwing of aanbouw is een grote uitgave. Voordat iemand je belt, wil hij zien wat je eerder hebt gemaakt en of je afspraken nakomt. Je website is dan je portfolio en je visitekaartje in één.",
    sections: [
      {
        h2: "Wat opdrachtgevers van een aannemer willen zien",
        items: [
          { title: "Projecten", text: "Foto's van opgeleverd werk, met een paar regels over wat de opdracht was." },
          { title: "Wat je wel en niet doet", text: "Nieuwbouw, verbouw, aanbouw, dakkapellen, onderhoud: wees duidelijk." },
          { title: "Hoe je werkt", text: "Van eerste gesprek tot oplevering, en hoe je met planning en meerwerk omgaat." },
          { title: "Een offerte aanvragen", text: "Een kort formulier waarin de klant zijn plan kan omschrijven." },
        ],
      },
      {
        h2: "Wat we voor een bouwbedrijf bouwen",
        body: ["Degelijk en overzichtelijk. De website laat je werk voor zich spreken en maakt het aanvragen van een offerte laagdrempelig."],
        list: ["Een betrouwbaar, eigen ontwerp", "Projectenoverzicht met foto's", "Diensten per type werk", "Offerteformulier bovenaan en onderaan", "Ruimte voor keurmerken en garanties", "Een basis om gevonden te worden op 'aannemer' of 'bouwbedrijf' plus je regio"],
      },
    ],
    work: "construction",
    addons: ["pages", "photography", "seo", "copywriting"],
    addonsTitle: "Veel gekozen door bouwbedrijven",
    faq: [
      { q: "Kunnen mijn projecten op de website?", a: "Ja. Vanaf het Business-pakket is er een fotogalerij en ruimte voor meerdere pagina's, zodat je projecten goed tot hun recht komen." },
      { q: "Ik heb weinig goede foto's van mijn werk. Wat nu?", a: "Begin met wat je hebt; ook foto's met een telefoon kunnen goed werken als ze scherp en opgeruimd zijn. Fotografie is daarnaast als extra aan te vragen." },
      { q: "Is zo'n website ook geschikt voor een kleine aannemer of zzp'er in de bouw?", a: "Ja. Voor een eenmanszaak is een compacte website met je diensten, een paar projecten en een offerteformulier vaak al genoeg. Kijk ook op de pagina voor [zzp'ers](/website-laten-maken/zzp)." },
    ],
    related: ["/website-laten-maken", "/website-laten-maken/loodgieter", "/website-laten-maken/mkb", "/prijzen"],
  }),
  industry("tandarts", {
    label: "Tandartspraktijk",
    service: "Website laten maken voor tandartspraktijken",
    keywords: { primary: "website laten maken tandarts", secondary: ["website tandartspraktijk", "tandarts website laten maken", "website mondzorgpraktijk"] },
    title: "Website laten maken voor je tandartspraktijk | HOPI",
    description: "Een rustige, duidelijke website voor je tandartspraktijk met behandelingen, team en inschrijven. Eerst gratis een ontwerp zien, vaste prijs vanaf {from}.",
    eyebrow: "Website voor tandartsen",
    h1: "Website laten maken voor je *tandartspraktijk*",
    intro: "Naar de tandarts gaan is voor veel mensen spannend. Een praktijkwebsite die rustig, duidelijk en persoonlijk is, neemt een deel van die drempel weg. Nieuwe patiënten willen weten wie hen behandelt, of je nog mensen aanneemt en wat ze moeten doen bij pijn.",
    sections: [
      {
        h2: "Wat patiënten op je website zoeken",
        items: [
          { title: "Neem je nieuwe patiënten aan?", text: "Zeg het bovenaan, met een duidelijke knop om in te schrijven." },
          { title: "Wat te doen bij spoed", text: "Het spoednummer en de werkwijze buiten openingstijden, direct vindbaar." },
          { title: "Het team", text: "Foto's en namen van tandartsen, mondhygiënisten en assistenten." },
          { title: "Behandelingen en tarieven", text: "Uitleg in gewone taal en een verwijzing naar de geldende tarieven." },
        ],
      },
      {
        h2: "Wat we voor een tandartspraktijk bouwen",
        body: ["Een website die kalmte uitstraalt en praktische vragen snel beantwoordt, zodat je balie minder telefoontjes krijgt over dingen die online kunnen staan."],
        list: ["Een modern, geruststellend ontwerp", "Inschrijf- en afspraakformulier", "Spoedinformatie op een vaste plek", "Teampagina en uitleg per behandeling", "Praktische informatie: bereikbaarheid, parkeren, toegankelijkheid", "Een basis om gevonden te worden op 'tandarts' plus je plaats"],
      },
    ],
    work: "dental",
    addons: ["pages", "copywriting", "multilingual", "gbp"],
    addonsTitle: "Veel gekozen door praktijken",
    faq: [
      { q: "Kunnen nieuwe patiënten zich via de website inschrijven?", a: "Ja. We nemen een inschrijfformulier op dat bij jullie in de mailbox binnenkomt. Voor medische gegevens adviseren we het formulier kort te houden en de rest in de praktijk of via je eigen patiëntensysteem te regelen." },
      { q: "Kan de website gekoppeld worden aan ons praktijksysteem?", a: "Een directe koppeling met praktijksoftware zit niet standaard in de pakketten. Een link naar jullie bestaande patiëntenportaal of online agenda kan wel. Vertel bij je aanvraag wat jullie gebruiken, dan hoor je eerlijk wat mogelijk is." },
      { q: "Kan de website ook in het Engels?", a: "Ja. Een extra taal is als extra beschikbaar, handig als je veel internationale patiënten hebt." },
    ],
    related: ["/website-laten-maken", "/website-laten-maken/mkb", "/website-onderhoud", "/prijzen"],
  }),
  industry("makelaar", {
    label: "Makelaar",
    service: "Website laten maken voor makelaars",
    keywords: { primary: "website laten maken makelaar", secondary: ["makelaar website laten maken", "website makelaarskantoor", "website makelaardij"] },
    title: "Website laten maken voor je makelaarskantoor | HOPI",
    description: "Een makelaarswebsite met een eigen gezicht die verkopers overtuigt om jou te bellen. Eerst gratis een ontwerp zien, vaste prijs vanaf {from}.",
    eyebrow: "Website voor makelaars",
    h1: "Website laten maken voor je *makelaarskantoor*",
    intro: "Kopers vinden woningen op de grote huizensites. Maar een verkoper die een makelaar kiest, kijkt naar jou: ken je de buurt, hoe werk je en wat mag hij verwachten? Je eigen website is de plek om dat te laten zien.",
    sections: [
      {
        h2: "Wat verkopers en kopers willen weten",
        items: [
          { title: "Waarom jij?", text: "Je kennis van de wijk, je aanpak en wat jou anders maakt dan een landelijke keten." },
          { title: "Wat je doet", text: "Verkoop, aankoop, taxaties, verhuur: per dienst uitgelegd." },
          { title: "Wat het kost", text: "Je tarieven of werkwijze helder, zodat een kennismaking geen verrassing wordt." },
          { title: "Een waardebepaling aanvragen", text: "Het formulier dat de meeste nieuwe opdrachten oplevert, prominent in beeld." },
        ],
      },
      {
        h2: "Wat we voor een makelaar bouwen",
        body: ["Een website met een herkenbaar eigen gezicht, gericht op de aanvraag van een waardebepaling of kennismaking."],
        list: ["Een uitgesproken, eigen ontwerp", "Diensten en werkwijze per doelgroep", "Formulier voor een gratis waardebepaling of kennismaking", "Ruimte voor het team en je kennis van de regio", "Verwijzing naar je actuele aanbod", "Een basis om gevonden te worden op 'makelaar' plus je plaats"],
      },
    ],
    work: "real-estate",
    addons: ["pages", "copywriting", "seo", "analytics"],
    addonsTitle: "Veel gekozen door makelaars",
    faq: [
      { q: "Kan mijn woningaanbod automatisch op de website?", a: "Een automatische koppeling met je woningaanbod zit niet standaard in de pakketten. Een duidelijke verwijzing naar je aanbod op de plek waar het al staat, kan altijd. Vertel bij je aanvraag welk systeem je gebruikt, dan hoor je eerlijk wat mogelijk is." },
      { q: "Waar levert een makelaarswebsite het meeste op?", a: "Bij verkopers. Zij vergelijken makelaars en kiezen op vertrouwen en aanpak. Daarom zetten we de aanvraag voor een waardebepaling centraal." },
      { q: "Kan ik zelf nieuws of verkochte woningen laten toevoegen?", a: "Ja. Met het abonnement Website Care geef je wijzigingen door en zetten wij ze voor je op de website." },
    ],
    related: ["/website-laten-maken", "/website-laten-maken/mkb", "/website-redesign", "/prijzen"],
  }),
  industry("webshop", {
    pricing: "quote",
    linkLabel: "Webshop laten maken",
    label: "Webshop",
    service: "Webshop laten maken",
    keywords: { primary: "webshop laten maken", secondary: ["webshop laten bouwen", "online winkel laten maken", "webshop voor kleine ondernemers"] },
    title: "Webshop laten maken, met een eerlijke offerte | HOPI",
    description: "Een webshop laten maken voor je eigen online winkel. Op offerte, want de prijs hangt af van je producten, betalen, verzenden en koppelingen.",
    eyebrow: "Webshop laten maken",
    h1: "Je eigen *webshop* laten maken",
    intro: "Een webshop laten maken doe je bij HOPI op offerte, niet voor een vaste prijs. Wat een webshop kost, hangt vooral af van het aantal producten, hoe klanten betalen, hoe je verzendt en of de winkel moet samenwerken met je voorraad of boekhouding. Vertel wat je wilt verkopen, dan krijg je een duidelijke offerte en weet je vooraf waar je aan toe bent.",
    sections: [
      {
        h2: "Wat bepaalt de prijs van een webshop?",
        body: ["Een webshop is meer werk dan een gewone website, omdat er na de klik op 'bestellen' nog veel moet gebeuren. Daarom rekenen we geen vast bedrag, maar maken we een offerte op basis van wat jouw winkel echt nodig heeft."],
        items: [
          { title: "Producten en varianten", text: "Tien producten zet je anders neer dan vijfhonderd artikelen in drie maten en vier kleuren. Meer producten betekent meer werk aan categorieën, filters en het invoeren zelf." },
          { title: "Betalen", text: "Welke betaalmethoden je klanten willen en via welke betaalprovider dat loopt. De kosten van die provider spreek je rechtstreeks met die partij af." },
          { title: "Verzenden", text: "Vaste verzendkosten of per gewicht, afhalen in de winkel, ook naar België: elke regel moet in de winkel kloppen." },
          { title: "Koppelingen", text: "Moet de webshop je voorraad bijwerken of bestellingen doorzetten naar je boekhouding? Dat scheelt je dagelijks werk, maar maakt het bouwen bewerkelijker." },
          { title: "Teksten en foto's", text: "Goede productfoto's en -teksten maken het verschil. Lever je die zelf aan, of moeten ze gemaakt worden?" },
        ],
      },
      {
        h2: "Webshop laten maken: wat je mag verwachten",
        body: [
          "Een webshop is niet klaar op de dag dat hij live gaat. Producten wisselen, prijzen veranderen en bestellingen moeten verwerkt worden. Reken erop dat je zelf tijd kwijt bent aan je assortiment, je klantenservice en het versturen van pakketten. Wij bouwen de winkel en zorgen dat hij technisch blijft draaien.",
          "Een eigen webshop brengt ook niet vanzelf kopers. Duidelijke productpagina's en een nette technische basis helpen om gevonden te worden, maar je werkt zelf ook aan de bekendheid van je winkel, bijvoorbeeld met sociale media of een nieuwsbrief. Garanties over posities in Google geven we niet.",
          "Hoe een webshop eruit kan zien, zie je in ons demo-ontwerp [Lune Atelier](/werk/fashion): een winkel voor een fictief modemerk, met collecties, productfilters, maten en een werkend winkelmandje. Het is een demo, geen klantproject.",
        ],
      },
      {
        h2: "Zo gaat het in zijn werk",
        body: ["Hoe concreter je aanvraag, hoe preciezer de offerte. Je hoeft nog niet alles te weten: wat nog open ligt, zoeken we samen uit."],
        list: [
          "Je vertelt via het aanvraagformulier wat je verkoopt, hoeveel producten je ongeveer hebt en hoe je wilt laten betalen en verzenden",
          "We bespreken wat de winkel moet kunnen en met welke systemen hij moet samenwerken",
          "Je krijgt een offerte waarin staat wat we bouwen, wat het kost en wat er niet bij zit",
          "Ga je akkoord, dan bouwen we de webshop en maken we teksten en foto's samen met jou definitief",
          "Na de lancering regelen wij hosting, SSL, back-ups en updates",
        ],
      },
      {
        h2: "Webshop of een website met een paar producten?",
        body: [
          "Niet iedereen die iets wil verkopen, heeft een volledige webshop nodig. Verkoop je een handvol producten of vooral diensten, dan kan een gewone website met een duidelijke bestel- of contactknop genoeg zijn. Die maken we wel voor een vaste prijs, vanaf {from} exclusief btw. De vaste pakketten verderop op deze pagina gelden voor zulke websites, niet voor een webshop.",
          "Wil je echt online afrekenen met een winkelmandje, dan is een webshop de logische keuze. Twijfel je, vertel het bij je aanvraag; dan zeggen we eerlijk wat bij jou past. Ben je zelfstandige, kijk dan ook bij [website laten maken als zzp'er](/website-laten-maken/zzp).",
        ],
      },
    ],
    work: "fashion",
    addons: ["photography", "copywriting", "multilingual", "analytics"],
    addonsTitle: "Handig voor een webshop",
    faq: [
      { q: "Wat kost een webshop laten maken?", a: "Dat hangt af van je winkel, daarom werken we met een offerte. De grootste factoren zijn het aantal producten en varianten, de betaalmethoden, je verzendregels en koppelingen met voorraad of boekhouding. In de offerte staat wat er wel en niet bij zit, zodat je achteraf niet verrast wordt. Wil je eerst weten hoe prijzen voor websites in elkaar zitten, lees dan [wat kost een website laten maken](/blog/wat-kost-een-website-laten-maken)." },
      { q: "Welke kosten heb ik naast het bouwen van de webshop?", a: "Hosting en onderhoud per maand, en de kosten van je betaalprovider, die vaak per transactie rekent. Verzendkosten spreek je af met je vervoerder. Wat hosting en onderhoud voor jouw webshop kosten, staat in de offerte." },
      { q: "Kan de webshop gekoppeld worden aan mijn voorraad of boekhouding?", a: "Dat hangt af van de systemen die je gebruikt. Noem ze in je aanvraag, dan hoor je eerlijk wat mogelijk is en wat het kost. Een koppeling maakt het dagelijkse werk lichter, maar telt mee in de prijs." },
      { q: "Is een webshop geschikt voor een kleine ondernemer?", a: "Ja, als je regelmatig producten online wilt verkopen en tijd hebt om bestellingen te verwerken. Begin dan klein, met je belangrijkste producten, en breid later uit. Verkoop je maar een paar producten, dan is een gewone website met een bestelknop soms verstandiger en goedkoper." },
      { q: "Hoe lang duurt het om een webshop te laten maken?", a: "Dat hangt af van de omvang van de winkel en van hoe snel productgegevens, foto's en teksten compleet zijn. Zodra je akkoord geeft op de offerte, spreken we samen een planning af." },
      { q: "Is Lune Atelier een echte klant?", a: "Nee. Lune Atelier is een demo-ontwerp van HOPI voor een fictief modemerk. Het laat zien hoe een webshop eruit kan zien en werkt, met collecties, filters en een winkelmandje. Het is geen klantproject." },
    ],
    related: ["/website-laten-maken", "/website-laten-maken/zzp", "/website-onderhoud", "/blog/wat-kost-een-website-laten-maken"],
  }),
  {
    path: "/website-laten-maken/zzp",
    kind: "audience",
    label: "Voor zzp'ers",
    service: "Website laten maken voor zzp'ers",
    keywords: { primary: "website laten maken zzp", secondary: ["zzp website laten maken", "website zzp'er", "betaalbare website zzp"] },
    title: "Website laten maken als zzp'er: vanaf {from} | HOPI",
    description: "Als zzp'er een professionele website zonder gedoe. Eerst gratis een ontwerp zien, daarna een vaste prijs vanaf {from} excl. btw. Wij regelen de techniek.",
    eyebrow: "Website voor zzp'ers",
    h1: "Website laten maken als *zzp'er*",
    intro: "Als zzp'er ben je je eigen directeur, boekhouder en marketingafdeling. Een website bouwen komt daar slecht bij, terwijl klanten je wel eerst online opzoeken. Wij maken een ontwerp van je website klaar, jij bekijkt het en beslist dan pas.",
    sections: [
      {
        h2: "Wat een zzp-website moet doen",
        items: [
          { title: "Laten zien wie je bent", text: "Klanten kiezen bij een zelfstandige voor de persoon. Een foto en een paar eerlijke zinnen doen veel." },
          { title: "Uitleggen wat je doet", text: "In de woorden van je klant, niet in vaktaal." },
          { title: "Contact makkelijk maken", text: "Bellen, mailen of WhatsApp met één tik." },
          { title: "Vindbaar zijn", text: "Op je naam, en op je vak in combinatie met je plaats of regio." },
        ],
      },
      {
        h2: "Welk pakket past bij een zzp'er?",
        body: [
          "Voor de meeste zelfstandigen is het Starter-pakket van {starter} genoeg: een professionele one-page website met je diensten, een contactformulier en een routekaart. Wil je aparte pagina's voor je diensten of een portfolio, dan is Business ({business}) de logische stap.",
          "De kosten van je website en van hosting zijn zakelijke kosten. Vraag je boekhouder hoe je die het beste verwerkt.",
        ],
      },
      {
        h2: "Zelf bouwen kan ook, maar kost tijd",
        body: ["Met een websitebouwer kun je zelf aan de slag. Reken dan wel op meerdere avonden werk, en op keuzes over opbouw, teksten en vindbaarheid waar je misschien niet dagelijks mee bezig bent. In [website laten maken of zelf bouwen](/blog/website-laten-maken-of-zelf-bouwen) lees je wanneer welke route verstandig is."],
      },
    ],
    addons: ["logo", "email", "domain", "copywriting"],
    addonsTitle: "Handig als je net begint",
    faq: [
      { q: "Ik ben net gestart en heb nog geen logo of huisstijl. Kan dat?", a: "Ja. We kiezen in het ontwerp kleuren en letters die bij je vak passen. Een logo-ontwerp is als extra beschikbaar." },
      { q: "Wat kost een website voor een zzp'er per maand?", a: "De website zelf is een eenmalig bedrag vanaf {starter}. Daarna betaal je voor hosting en onderhoud vanaf {hosting} per maand. Alle bedragen zijn exclusief btw." },
      { q: "Kan ik ook een zakelijk e-mailadres op mijn eigen domeinnaam krijgen?", a: "Ja. Het instellen van zakelijke e-mail op je eigen domeinnaam is als extra beschikbaar." },
    ],
    related: ["/prijzen", "/website-laten-maken", "/blog/website-laten-maken-of-zelf-bouwen", "/website-laten-maken/mkb"],
  },
  {
    path: "/website-laten-maken/mkb",
    kind: "audience",
    label: "Voor het mkb",
    service: "Website laten maken voor mkb-bedrijven",
    keywords: { primary: "website laten maken mkb", secondary: ["bedrijfswebsite laten maken", "website laten maken bedrijf", "zakelijke website laten maken"] },
    title: "Bedrijfswebsite laten maken voor het mkb | HOPI",
    description: "Een bedrijfswebsite die aanvragen oplevert, met meerdere pagina's, hosting en onderhoud. Eerst gratis een ontwerp zien. Vaste prijzen vanaf {from}.",
    eyebrow: "Website voor het mkb",
    h1: "Een *bedrijfswebsite* laten maken voor het mkb",
    intro: "Een bedrijfswebsite is zelden af: diensten veranderen, er komen collega's bij, de openingstijden wijzigen. Als mkb-bedrijf wil je een website die er verzorgd uitziet, aanvragen oplevert en die je niet zelf hoeft bij te houden.",
    sections: [
      {
        h2: "Waar een mkb-website aan moet voldoen",
        items: [
          { title: "Een pagina per dienst", text: "Zo vindt een bezoeker precies wat hij zoekt, en begrijpt Google waar elke pagina over gaat." },
          { title: "Aanvragen centraal", text: "Offerte, afspraak of terugbelverzoek: elke pagina eindigt met een logische volgende stap." },
          { title: "Vertrouwen", text: "Je team, je werkwijze en duidelijke bedrijfsgegevens." },
          { title: "Onderhoud geregeld", text: "Updates, back-ups en kleine wijzigingen zonder dat het een project wordt." },
        ],
      },
      {
        h2: "Welk pakket past bij een mkb-bedrijf?",
        body: [
          "De meeste mkb-bedrijven kiezen Business ({business}): een complete website tot vijf pagina's met een uitgebreid ontwerp. Heb je een reserverings- of boekingssysteem dat gekoppeld moet worden, of wil je op maat ontworpen pagina's, dan is Premium ({premium}) bedoeld voor jou.",
          "Voor de periode daarna zijn er drie abonnementen. Met Hosting & Onderhoud ({hosting} per maand) blijft de website online, snel en veilig. Met Website Care ({care} per maand) passen wij ook maandelijks inhoud voor je aan. Growth ({growth} per maand) voegt doorlopende SEO-verbeteringen en rapportages toe.",
        ],
      },
      {
        h2: "Heb je al een website?",
        body: ["Dan beginnen we daar. We kijken wat er nu staat, wat goed werkt en waar bezoekers afhaken, en maken een nieuw ontwerp dat je naast je huidige site kunt leggen. Meer daarover lees je bij [website redesign](/website-redesign)."],
      },
    ],
    addons: ["pages", "seo", "analytics", "multilingual"],
    addonsTitle: "Veel gekozen door mkb-bedrijven",
    faq: [
      { q: "Wie beheert de website na oplevering?", a: "Dat doen wij, als je een abonnement afsluit. Je geeft wijzigingen door en wij voeren ze uit. Je hebt geen eigen beheerder of technische kennis nodig." },
      { q: "Kunnen meerdere collega's wijzigingen doorgeven?", a: "Ja. We spreken af wie namens jullie wijzigingen mag aanleveren, zodat het overzichtelijk blijft." },
      { q: "Krijgen we inzicht in bezoekers en aanvragen?", a: "Statistieken en conversiemeting zijn als extra beschikbaar. Binnen het Growth-abonnement ontvang je daarnaast prestatierapporten." },
    ],
    related: ["/prijzen", "/website-redesign", "/website-onderhoud", "/blog/hoe-kies-je-een-webdesignbureau"],
  },
  {
    path: "/website-onderhoud",
    kind: "service",
    label: "Website onderhoud",
    service: "Website onderhoud en hosting",
    keywords: { primary: "website onderhoud", secondary: ["website laten onderhouden", "website onderhoud abonnement", "hosting en onderhoud website"] },
    title: "Website onderhoud en hosting vanaf {hosting} per maand | HOPI",
    description: "Hosting, SSL, back-ups, updates en wijzigingen voor je website. Onderhoud vanaf {hosting} per maand excl. btw, zonder technische zorgen.",
    eyebrow: "Website onderhoud",
    h1: "Website onderhoud, *zonder* omkijken",
    intro: "Een website die niet wordt bijgehouden, veroudert sneller dan je denkt: openingstijden kloppen niet meer, software loopt achter en de pagina's worden trager. Met een onderhoudsabonnement blijft je website online, veilig en actueel, zonder dat jij erover hoeft na te denken.",
    sections: [
      {
        h2: "Wat valt er onder onderhoud?",
        items: [
          { title: "Hosting", text: "Je website staat op snelle, betrouwbare servers en is bereikbaar op je eigen domeinnaam." },
          { title: "Beveiliging", text: "Een SSL-certificaat (het slotje in de browser) en beveiligingsupdates." },
          { title: "Back-ups", text: "Gaat er iets mis, dan zetten we een eerdere versie terug." },
          { title: "Monitoring", text: "We houden technisch in de gaten of je website bereikbaar is." },
          { title: "Inhoud bijwerken", text: "Openingstijden, prijzen, menu of diensten: je geeft het door, wij passen het aan (vanaf Website Care)." },
          { title: "Doorlopend verbeteren", text: "Maandelijkse SEO-verbeteringen en rapportages (Growth)." },
        ],
      },
      {
        h2: "Drie abonnementen",
        body: [
          "**Hosting & Onderhoud, {hosting} per maand.** Hosting, SSL, beveiligingsupdates, back-ups en technische monitoring. Voor wie zelden iets verandert.",
          "**Website Care, {care} per maand.** Alles uit Hosting & Onderhoud, plus maandelijkse inhoudswijzigingen en support met voorrang. Voor zaken waar prijzen, tijden of het aanbod regelmatig wijzigen.",
          "**Growth, {growth} per maand.** Alles uit Website Care, plus maandelijkse SEO-verbeteringen, prestatierapporten en optimalisatie van je Google Bedrijfsprofiel.",
          "De bedragen zijn exclusief {vat} btw. De abonnementen zijn bedoeld voor websites die wij voor je hebben gebouwd. De voorwaarden, zoals de looptijd, staan in je orderbevestiging.",
        ],
      },
    ],
    faq: [
      { q: "Is een onderhoudsabonnement verplicht?", a: "Je website moet ergens gehost worden om online te zijn. Met Hosting & Onderhoud regelen wij dat volledig voor je. Welke afspraken er gelden, staat in je orderbevestiging." },
      { q: "Onderhouden jullie ook websites die door een ander zijn gebouwd?", a: "Nee, de abonnementen zijn voor websites die wij zelf hebben gebouwd. Zo kunnen we instaan voor de techniek. Is je huidige website verouderd, kijk dan naar een [website redesign](/website-redesign)." },
      { q: "Hoe geef ik een wijziging door?", a: "Per e-mail naar je vaste contact. Bij Website Care en Growth zijn maandelijkse inhoudswijzigingen inbegrepen." },
      { q: "Wat kost websiteonderhoud normaal?", a: "Dat verschilt sterk per aanbieder en per soort website. In ons artikel [wat kost websiteonderhoud](/blog/wat-kost-websiteonderhoud) leggen we uit waar die verschillen vandaan komen." },
    ],
    related: ["/prijzen", "/website-laten-maken", "/blog/wat-kost-websiteonderhoud", "/website-redesign"],
  },
  {
    path: "/website-redesign",
    kind: "service",
    label: "Website redesign",
    service: "Website redesign",
    keywords: { primary: "website redesign", secondary: ["website laten vernieuwen", "nieuwe website laten maken", "website opnieuw laten maken", "verouderde website vernieuwen"] },
    title: "Website redesign: je oude site vernieuwen | HOPI",
    description: "Verouderde website? Wij maken eerst gratis een nieuw ontwerp dat je naast je huidige site legt. Je betaalt pas als het bevalt. Vaste prijs vanaf {from}.",
    eyebrow: "Website redesign",
    h1: "Je website laten *vernieuwen*",
    intro: "Een website van een paar jaar oud kan er op een telefoon ineens rommelig uitzien, traag laden of niet meer passen bij wat je bedrijf nu doet. Een redesign is dan vaak verstandiger dan blijven oplappen. Bij HOPI zie je eerst het nieuwe ontwerp, zodat je het naast je huidige website kunt leggen.",
    sections: [
      {
        h2: "Wanneer is een website toe aan vernieuwing?",
        items: [
          { title: "Hij werkt slecht op een telefoon", text: "Tekst is te klein, knoppen zitten te dicht op elkaar of je moet opzij schuiven." },
          { title: "Hij ziet er gedateerd uit", text: "Bezoekers verbinden een verouderde website al snel met een verouderd bedrijf." },
          { title: "De inhoud klopt niet meer", text: "Diensten, prijzen of foto's van jaren geleden." },
          { title: "Hij is traag", text: "Lang wachten is voor veel bezoekers een reden om af te haken." },
          { title: "Hij levert niets op", text: "Er komen geen aanvragen of telefoontjes via de website binnen." },
          { title: "Niemand kan er nog bij", text: "De bouwer is gestopt of je weet niet meer hoe je iets aanpast." },
        ],
      },
      {
        h2: "Zo pakken we een redesign aan",
        body: [
          "We beginnen bij je huidige website: wat staat er, wat is nog bruikbaar en waar haken bezoekers af? Daarna maken we een nieuw ontwerp met je eigen naam, diensten en stijl. Dat ontwerp krijg je te zien voordat je iets betaalt.",
          "Bevalt het, dan zetten we de inhoud over, vullen we aan wat ontbreekt en gaat de nieuwe website live op je bestaande domeinnaam. Waar dat kan, verwijzen we belangrijke oude pagina's door naar de nieuwe, zodat bezoekers en zoekmachines niet op een dood spoor komen.",
        ],
      },
      {
        h2: "Wat kost een redesign?",
        body: ["Hetzelfde als een nieuwe website: {starter} voor een one-page website, {business} voor een complete website en {premium} voor een op maat ontworpen site. Alle prijzen zijn exclusief {vat} btw. Het volledige overzicht staat bij [prijzen](/prijzen)."],
      },
    ],
    faq: [
      { q: "Blijft mijn domeinnaam hetzelfde?", a: "Ja. De nieuwe website komt op je bestaande domeinnaam. Je e-mailadressen blijven gewoon werken." },
      { q: "Raak ik mijn vindbaarheid in Google kwijt?", a: "Dat risico beperken we door de inhoud die goed werkt te behouden en belangrijke oude pagina's waar mogelijk door te verwijzen naar de nieuwe. Garanties over posities in Google kan niemand geven, wij ook niet." },
      { q: "Kunnen jullie de teksten en foto's van mijn oude website overnemen?", a: "Ja, voor zover ze nog kloppen en je de rechten erop hebt. We gebruiken ze als basis en vullen aan waar nodig." },
      { q: "Wat als ik het nieuwe ontwerp niet beter vind?", a: "Dan houd je gewoon je huidige website en betaal je niets. Het ontwerp vooraf is gratis en vrijblijvend." },
    ],
    related: ["/website-laten-maken", "/prijzen", "/website-onderhoud", "/blog/waar-moet-een-goede-bedrijfswebsite-aan-voldoen"],
  },
  {
    path: "/ai-website-laten-maken",
    kind: "service",
    label: "AI website laten maken",
    service: "AI website laten maken",
    keywords: { primary: "AI website laten maken", secondary: ["AI website builder", "website automatisch laten maken", "website met AI"] },
    title: "AI website laten maken, gecontroleerd door mensen | HOPI",
    description: "HOPI maakt je website met hulp van AI en een mens controleert het resultaat. Je ziet eerst gratis een ontwerp en betaalt pas als het bevalt.",
    eyebrow: "AI website laten maken",
    h1: "Een website met AI, *gecontroleerd* door mensen",
    intro: "Een AI website laten maken kan bij HOPI, maar niet zonder mensen. Onze software onderzoekt je bedrijf en een AI-model schrijft een eerste versie van de teksten in een van onze ontwerpen. Daarna controleert iemand van HOPI het ontwerp, en maken we de teksten en foto's samen met jou definitief. AI voor de snelheid, mensen voor het oordeel.",
    sections: [
      {
        h2: "Hoe we AI gebruiken om je website te maken",
        items: [
          { title: "Onderzoek", text: "Onze eigen software verzamelt openbare informatie over je bedrijf: je naam, branche, plaats, openingstijden en je huidige website, als je die hebt." },
          { title: "Een eerste versie van de teksten", text: "Een AI-model, Claude van Anthropic, schrijft op basis daarvan de eerste teksten. Die komen in een van onze twaalf met de hand ontworpen websiteontwerpen." },
          { title: "Automatisch getest", text: "De software test elke pagina in een echte browser, op telefoon, tablet en computer: de opmaak, de links, de formulieren en de basis van de snelheid." },
          { title: "Gecontroleerd door een mens", text: "Iemand van HOPI bekijkt het ontwerp en keurt het goed. Pas daarna krijg jij het te zien." },
          { title: "Samen afgerond", text: "Bevalt het ontwerp, dan maken we de teksten en foto's samen met jou definitief." },
        ],
      },
      {
        h2: "Wat AI bij ons niet doet",
        body: ["Een taalmodel kan overtuigende zinnen schrijven over dingen die niet waar zijn. Op een bedrijfswebsite is dat een risico: één verzonnen review of verkeerde prijs kost je het vertrouwen van een bezoeker. Daarom geldt bij ons een harde regel: we verzinnen geen feiten. Wat ontbreekt, vullen we samen met jou in."],
        list: ["Geen reviews of klantervaringen die je niet zelf hebt aangeleverd", "Geen prijzen die niet van jou komen", "Geen teamleden die je niet zelf hebt genoemd", "Geen beweringen over je bedrijf die je zelf niet doet, zoals keurmerken of beloftes"],
      },
      {
        h2: "AI website laten maken of zelf een AI website builder gebruiken?",
        body: [
          "Met een AI website builder typ je een paar zinnen over je bedrijf en staat er binnen korte tijd een website. Dat is snel en goedkoop, en voor een hobbyproject of een eerste test prima. Wil je een professionele bedrijfswebsite, dan ligt het meeste werk daarna bij jou.",
          "Je controleert dan zelf of elke zin klopt, of er geen beweringen in staan die niet waar zijn en of elke knop op een telefoon werkt. Je bepaalt zelf de opbouw die een bezoeker laat bellen of boeken, en je bent zelf verantwoordelijk voor domeinnaam, instellingen en bijhouden. Bij HOPI doet AI het snelle werk, test onze software elke pagina, beoordeelt een mens het resultaat en regelen wij de techniek.",
          "Hoe zo'n builder werkt en waar je op moet letten, lees je in [hoe werkt een AI website builder](/blog/hoe-werkt-een-ai-website-builder). De bredere afweging staat in [website laten maken of zelf bouwen](/blog/website-laten-maken-of-zelf-bouwen).",
        ],
      },
      {
        h2: "Zo werkt het voor jou",
        body: [
          "Je vult het aanvraagformulier in. Omdat de eerste versie snel klaarstaat, kunnen we je een ontwerp van je eigen website laten zien voordat je iets betaalt. Bevalt het, dan kies je een pakket: {starter} voor een one-page website, {business} voor een complete website of {premium} voor een site op maat met bijvoorbeeld een reserverings- of boekingssysteem. Bevalt het niet, dan betaal je niets.",
          "Daarna maken we de teksten en foto's samen definitief, gaat de website live en regelen wij hosting, SSL, back-ups en updates. Alle prijzen zijn exclusief {vat} btw en staan bij [prijzen](/prijzen).",
        ],
      },
    ],
    faq: [
      { q: "Schrijft AI de hele website?", a: "Nee. Een AI-model schrijft een eerste versie van de teksten, op basis van openbare informatie over je bedrijf. Het ontwerp komt uit een van onze twaalf met de hand ontworpen websiteontwerpen. Iemand van HOPI controleert het geheel, en de definitieve teksten en foto's maken we samen met jou." },
      { q: "Welk AI-model gebruiken jullie?", a: "Voor de eerste versie van de teksten gebruiken we Claude, een AI-model van Anthropic. Het onderzoek naar je bedrijf en het testen van de pagina's doet onze eigen software." },
      { q: "Kan AI dingen over mijn bedrijf verzinnen?", a: "Dat risico bestaat bij elk taalmodel, en daarom zetten we er regels en controle omheen. We plaatsen geen reviews, prijzen, teamleden of beweringen die je niet zelf hebt aangeleverd. Iemand van HOPI controleert het ontwerp voordat je het krijgt, en de definitieve teksten maken we samen met jou." },
      { q: "Is een website met AI goed voor Google?", a: "Voor Google telt vooral of een pagina nuttig is en klopt. Daarom controleren we de teksten en vullen we ze aan met wat alleen jij weet. Elke website krijgt een nette technische basis: snelle pagina's, duidelijke koppen en gestructureerde gegevens. Garanties over posities in Google geven we niet." },
      { q: "Is een AI website goedkoper?", a: "AI zit in de manier waarop we elk ontwerp maken; het is geen aparte, goedkopere variant. Je betaalt de vaste pakketprijzen, vanaf {from} exclusief btw, en het ontwerp vooraf is gratis." },
    ],
    related: ["/website-laten-maken", "/blog/hoe-werkt-een-ai-website-builder", "/blog/website-laten-maken-of-zelf-bouwen", "/prijzen"],
  },
];

export const ALL_LANDINGS = [PILLAR, ...LANDINGS];
export const INDUSTRIES = LANDINGS.filter((l) => l.kind === "industry");
export const landingByPath = (path: string) => ALL_LANDINGS.find((l) => l.path === path);
