/**
 * Content of the homepage. Prices are never written here: they come from Settings → Pricing
 * through the {from} placeholder. The two display statements are in English on purpose (the
 * agency's signature lines); everything a visitor has to understand or Google has to index
 * is Dutch.
 */
export const HOME = {
  kicker: "Webdesign bureau · Nederland & België",
  /** Display statement of the hero (English). */
  statement: ["We make the", "internet feel", "different."] as const,
  /** The page's H1: what HOPI is, in the words people search for. */
  h1: "Webdesign bureau voor websites, webshops en webapplicaties die mensen onthouden.",
  lead: "Je ziet eerst een ontwerp van je eigen website. Pas daarna beslis je.",
  cta: "Start een project",
  cta2: "Bekijk ons werk",
  disciplines: ["Webdesign", "Development", "E-commerce", "Branding", "AI"],

  intro: {
    label: "Introductie",
    /** Lights up word by word while you scroll. */
    statement: "HOPI is een digitaal bureau. Wij ontwerpen en bouwen websites, webshops en webapplicaties die er anders uitzien, snel laden en doen wat ze moeten doen. Geen sjablonen. Geen verrassingen.",
    text: "Of je nu een professionele website wilt laten maken, een webshop wilt laten bouwen of je huidige website wilt vernieuwen: wij werken als webdesign bureau voor ondernemers in heel Nederland en België, van Amsterdam tot Antwerpen.",
    facts: [
      { label: "Werkgebied", value: "Nederland & België" },
      { label: "Werkwijze", value: "Eerst zien, dan betalen" },
      { label: "Website vanaf", value: "{from}" },
    ],
  },

  work: {
    label: "Geselecteerd werk",
    title: ["Geselecteerd", "werk"] as const,
    note: "Demo-websites: complete websites die wij ontwierpen en bouwden voor fictieve bedrijven, om te laten zien wat we leveren. Het zijn geen klantprojecten.",
    all: "Bekijk al het werk",
  },

  services: {
    label: "Diensten",
    title: "Wat wij maken",
    text: "Eén team voor ontwerp, techniek en alles wat daarna komt.",
    note: "Websites hebben bij ons een vaste prijs. Webshops, applicaties, branding en AI-oplossingen maken we op offerte.",
  },

  why: {
    label: "Waarom HOPI",
    items: [
      { title: ["Eerst zien.", "Dan beslissen."], text: "Je krijgt een ontwerp van je eigen website voordat je iets betaalt. Bevalt het niet, dan stopt het daar en zit je nergens aan vast." },
      { title: ["Geen", "sjablonen."], text: "Elk ontwerp krijgt zijn eigen letters, kleuren en opbouw. Geen twee websites hetzelfde, en zeker niet die van je concurrent." },
      { title: ["Vaste", "prijzen."], text: "Een website heeft bij ons een vast bedrag, vanaf {from} exclusief btw. Je weet vooraf waar je aan toe bent. [Bekijk de prijzen](/prijzen)." },
      { title: ["Eén", "aanspreekpunt."], text: "Van het eerste ontwerp tot hosting en [onderhoud](/website-onderhoud) daarna. Jij hoeft niets technisch te doen." },
    ],
  },

  process: {
    label: "Werkwijze",
    title: "Van idee tot live",
  },

  closing: {
    /** Display statement of the closing section (English). */
    statement: ["Let's build", "something", "extraordinary."] as const,
    text: "Vertel ons over je project. Je ontvangt eerst een ontwerp, gratis en vrijblijvend.",
  },
};

export const SERVICES = [
  { title: "Website laten maken", en: "Website development", text: "Een website op maat, ontworpen voor jouw bedrijf en gebouwd om snel te laden op elk scherm.", tags: ["Ontwerp", "Development", "Mobiel", "SEO-basis"], href: "/website-laten-maken", more: "Meer over een website laten maken" },
  { title: "Webshops", en: "E-commerce development", text: "Een webshop die verkoopt zonder gedoe: heldere productpagina's, een soepele bestelling en betalen zoals je klanten gewend zijn.", tags: ["Productpagina's", "Afrekenen", "Betalingen"], href: "/#contact", more: "Vraag een offerte aan" },
  { title: "Website redesign", en: "Website redesign", text: "Je huidige website opnieuw ontworpen. Je legt het nieuwe ontwerp naast het oude en beslist dan pas.", tags: ["Nieuw ontwerp", "Zelfde domein", "Betere techniek"], href: "/website-redesign", more: "Meer over een website redesign" },
  { title: "Webapplicaties", en: "Custom web applications", text: "Portalen, dashboards en tools die precies doen wat jouw bedrijf nodig heeft.", tags: ["Portalen", "Dashboards", "Koppelingen"], href: "/#contact", more: "Bespreek je idee" },
  { title: "Branding & design", en: "Branding & digital design", text: "Logo, kleuren, letters en beeldtaal die online en offline kloppen.", tags: ["Logo", "Huisstijl", "Beeldtaal"], href: "/#contact", more: "Vraag een offerte aan" },
  { title: "AI-oplossingen", en: "AI solutions", text: "Slimme assistenten en automatisering die werk uit handen nemen, van de eerste aanvraag tot de opvolging.", tags: ["Assistenten", "Automatisering", "Koppelingen"], href: "/#contact", more: "Bespreek je idee" },
];

export const PROCESS = [
  { title: "Vertel ons over je bedrijf", text: "Vul het formulier in of stuur een bericht. Heb je al een website, dan kijken we daar ook naar." },
  { title: "Ontvang je ontwerp", text: "Je ziet jouw nieuwe website, met je eigen naam, diensten en stijl. Gratis en vrijblijvend.", free: true },
  { title: "Wij bouwen", text: "Tevreden? Dan kies je een pakket en maken we teksten, beeld en details samen definitief." },
  { title: "Je gaat live", text: "Op je eigen domeinnaam. Wij regelen hosting, beveiliging en onderhoud." },
];

export const HOME_FAQ = [
  { q: "Is het ontwerp echt gratis?", a: "Ja. Je ziet eerst een ontwerp van je eigen website. Pas als het bevalt en je een pakket kiest, betaal je. Bevalt het niet, dan zit je nergens aan vast." },
  { q: "Wat kost een website laten maken bij HOPI?", a: "Een one-page website kost {starter}, een complete website {business} en een op maat ontworpen website {premium}. Dat zijn eenmalige bedragen, exclusief {vat} btw. Hosting en onderhoud kosten vanaf {hosting} per maand. Het volledige overzicht staat op de pagina [prijzen](/prijzen)." },
  { q: "Is HOPI een website bouwer waarmee ik zelf aan de slag moet?", a: "Nee. Een website bouwer is een programma waarin je zelf sleept en typt. Wij zijn een bureau: wij ontwerpen en bouwen je website voor je. Het verschil lees je in [website laten maken of zelf bouwen](/blog/website-laten-maken-of-zelf-bouwen)." },
  { q: "Hoe snel staat mijn website online?", a: "Dat hangt af van het pakket en van hoe snel teksten en foto's rond zijn. Zodra je akkoord geeft op het ontwerp, spreken we samen een planning af." },
  { q: "Ik heb al een website. Kan die vervangen worden?", a: "Ja. We maken een nieuw ontwerp dat je naast je huidige website kunt leggen. Lees meer over een [website redesign](/website-redesign)." },
  { q: "Maken jullie ook webshops en webapplicaties?", a: "Ja. Die maken we op offerte, omdat elke webshop en elke applicatie anders is. Vertel ons wat je nodig hebt via het formulier, dan hoor je wat het kost voordat je beslist." },
  { q: "Voor wie werkt HOPI?", a: "Voor ondernemers in Nederland en België: van restaurants en kappers tot bouwbedrijven, zzp'ers en mkb. Ook als je nog helemaal geen website hebt." },
];
