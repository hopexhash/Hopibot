/**
 * Content of the homepage. The three design directions (src/components/site/home) show
 * exactly this content, so they differ in design only. Prices are never written here: they
 * come from Settings → Pricing.
 */
export const HOME = {
  eyebrow: "Webdesign voor ondernemers in Nederland & België",
  /** The second part is the emphasised phrase. */
  headline: ["Jouw bedrijf verdient een website die", "indruk maakt."] as const,
  intro: "Wij ontwerpen en bouwen professionele websites op maat. Bekijk eerst gratis jouw ontwerp. Tevreden? Dan bouwen wij verder.",
  cta: "Vraag gratis ontwerp aan",
  cta2: "Ontdek onze websites",
  trust: ["Gratis ontwerp vooraf", "Geen verplichtingen", "Transparante prijzen"],
  usp: {
    title: ["Eerst zien.", "Dan beslissen."] as const,
    text: "Bij de meeste bureaus betaal je vooraf en zie je pas weken later wat je krijgt. Bij HOPI zie je eerst een ontwerp van je eigen website, met jouw naam, jouw diensten en jouw stijl. Pas als je tevreden bent, bouwen wij verder.",
    points: [
      { title: "Gratis ontwerp", text: "Je betaalt niets om te zien hoe jouw website wordt." },
      { title: "Helemaal van jou", text: "Geen voorbeeld van een ander, maar jouw naam, diensten en stijl." },
      { title: "Geen verplichtingen", text: "Bevalt het niet? Dan stopt het daar en betaal je niets." },
    ],
  },
  portfolioTitle: ["Elke branche een", "eigen gezicht."] as const,
  portfolioText: "Geen twee websites hetzelfde. Elk ontwerp krijgt zijn eigen letters, kleuren en opbouw. Bekijk de voorbeelden en klik door de hele website.",
  portfolioNote: "Dit zijn demo-ontwerpen voor fictieve bedrijven, gemaakt om te laten zien wat we leveren. Het zijn geen klantprojecten.",
  servicesTitle: ["Alles geregeld,", "van ontwerp tot onderhoud."] as const,
  processTitle: ["In vier stappen", "online."] as const,
  pricingTitle: ["Duidelijke prijzen.", "Geen verrassingen."] as const,
  pricingText: "Een vast bedrag voor je website. Het ontwerp vooraf is altijd gratis.",
};

/** Portfolio categories, each with the demo that represents it (keys from work.ts). */
export const PORTFOLIO = [
  { category: "Restaurants", key: "de-gouden-lepel", industry: "/website-laten-maken/restaurant" },
  { category: "Automotive", key: "garage-jansen", industry: "/website-laten-maken/garage" },
  { category: "Beauty", key: "beauty-by-noor", industry: "/website-laten-maken/schoonheidssalon" },
  { category: "Bouw", key: "bouwbedrijf-de-vries", industry: "/website-laten-maken/bouwbedrijf" },
  { category: "Zorg", key: "tandartspraktijk-centrum", industry: "/website-laten-maken/tandarts" },
  { category: "Horeca", key: "koffiebar-noord", industry: "/website-laten-maken/restaurant" },
  { category: "Zakelijke diensten", key: "makelaardij-maas", industry: "/website-laten-maken/makelaar" },
] as const;

export const SERVICES = [
  { title: "Webdesign", text: "Een eigen ontwerp dat past bij jouw bedrijf en jouw klanten. Geen standaard sjabloon." },
  { title: "Ontwikkeling", text: "Wij bouwen het ontwerp uit tot een snelle, veilige website die op elk scherm werkt." },
  { title: "Mobiel", text: "Eerst ontworpen voor de telefoon, want daar zoeken de meeste klanten je op." },
  { title: "SEO-basis", text: "Duidelijke opbouw, snelle pagina's en nette techniek, zodat Google begrijpt wat je doet." },
  { title: "Hosting", text: "Je website online op je eigen domeinnaam, met SSL-beveiliging en back-ups." },
  { title: "Onderhoud", text: "Updates, beveiliging en kleine wijzigingen. Jij hoeft er niet naar om te kijken." },
];

export const PROCESS = [
  { title: "Vertel ons over jouw bedrijf", text: "Vul het formulier in. Heb je al een website, dan kijken we daar ook naar." },
  { title: "Ontvang gratis jouw ontwerp", text: "Je ziet jouw nieuwe website, met je eigen naam, diensten en stijl." },
  { title: "Wij bouwen jouw website", text: "Tevreden? Dan kies je een pakket en maken we alles samen definitief." },
  { title: "Jouw website gaat live", text: "Op je eigen domeinnaam. Wij regelen hosting, beveiliging en onderhoud." },
];

export const HOME_FAQ = [
  { q: "Is het ontwerp echt gratis?", a: "Ja. Je ziet eerst een ontwerp van je eigen website. Pas als het bevalt en je een pakket kiest, betaal je. Bevalt het niet, dan zit je nergens aan vast." },
  { q: "Wat kost een website bij HOPI?", a: "Een one-page website kost {starter}, een complete website {business} en een op maat ontworpen website {premium}. Dat zijn eenmalige bedragen, exclusief {vat} btw. Hosting en onderhoud kosten vanaf {hosting} per maand. Het volledige overzicht staat op de pagina [prijzen](/prijzen)." },
  { q: "Hoe snel staat mijn website online?", a: "Dat hangt af van het pakket en van hoe snel teksten en foto's rond zijn. Zodra je akkoord geeft op het ontwerp, spreken we samen een planning af." },
  { q: "Heb ik al een domeinnaam nodig?", a: "Nee. Heb je er al een, dan koppelen we die. Zo niet, dan helpen we je een passende domeinnaam te registreren." },
  { q: "Kan ik later nog dingen laten aanpassen?", a: "Ja. Met een [onderhoudsabonnement](/website-onderhoud) passen wij kleine dingen voor je aan, zoals openingstijden, een menukaart of nieuwe foto's." },
  { q: "Ik heb al een website. Kan die vervangen worden?", a: "Ja. We maken een nieuw ontwerp dat je naast je huidige website kunt leggen. Lees meer over een [website redesign](/website-redesign)." },
  { q: "Voor wie werkt HOPI?", a: "Voor ondernemers in Nederland en België: van restaurants en kappers tot loodgieters en bouwbedrijven, zzp'ers en mkb. Ook als je nog helemaal geen website hebt." },
];
