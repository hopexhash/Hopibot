import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { TEMPLATE_INFO, type SiteSpec, type TemplateKey } from "@/lib/site-spec";

type Biz = {
  name: string;
  category: string;
  city: string | null;
  phone: string | null;
  address: string | null;
  openingHours: string[] | null;
  googleMapsUrl: string | null;
};

export function templateFor(category: string): TemplateKey {
  return (BUSINESS_CATEGORIES.find((c) => c.key === category)?.template ?? "service") as TemplateKey;
}

type Copy = {
  eyebrow: string;
  headline: (name: string, city: string) => string;
  sub: string;
  cta: string;
  services: { title: string; description: string; icon: string }[];
  aboutTitle: string;
  about: string[];
  features: { title: string; description: string; icon: string }[];
  faq: { q: string; a: string }[];
};

// Neutral, factual Dutch copy: describes the category, makes no claims about the business.
const COPY: Record<TemplateKey, Copy> = {
  restaurant: {
    eyebrow: "Eten & drinken",
    headline: (n, c) => `Welkom aan tafel bij ${n}${c ? ` in ${c}` : ""}`,
    sub: "Een plek om samen te genieten van eten en drinken. Bekijk onze kaart, openingstijden en reserveer eenvoudig een tafel.",
    cta: "Reserveer een tafel",
    services: [
      { title: "Lunch & diner", description: "Schuif aan voor een ontspannen maaltijd, alleen of met gezelschap.", icon: "utensils" },
      { title: "Groepen & gelegenheden", description: "Neem contact op om de mogelijkheden voor uw groep te bespreken.", icon: "calendar" },
      { title: "Afhalen", description: "Vraag naar de mogelijkheden om gerechten mee te nemen.", icon: "coffee" },
    ],
    aboutTitle: "Over ons",
    about: ["Wij heten u van harte welkom. Op deze pagina vindt u alles wat u nodig heeft om langs te komen: onze kaart, openingstijden en contactgegevens."],
    features: [
      { title: "Gastvrij", description: "Een warme ontvangst voor iedere gast.", icon: "heart" },
      { title: "Centraal gelegen", description: "Makkelijk te vinden en goed bereikbaar.", icon: "map" },
      { title: "Reserveren", description: "Neem contact op om een tafel te reserveren.", icon: "calendar" },
    ],
    faq: [
      { q: "Kan ik reserveren?", a: "Ja, neem contact met ons op via telefoon of het contactformulier." },
      { q: "Hebben jullie opties voor speciale diëten?", a: "Laat het ons weten bij uw reservering, dan bespreken we de mogelijkheden." },
    ],
  },
  dental: {
    eyebrow: "Tandheelkundige zorg",
    headline: (n) => `Zorg voor uw gebit bij ${n}`,
    sub: "Persoonlijke tandheelkundige zorg in een rustige omgeving. Maak eenvoudig een afspraak of neem contact op met uw vraag.",
    cta: "Maak een afspraak",
    services: [
      { title: "Controle", description: "Periodieke controle van gebit en tandvlees.", icon: "check" },
      { title: "Mondhygiëne", description: "Reiniging en advies voor een gezonde mond.", icon: "drop" },
      { title: "Behandelingen", description: "Neem contact op voor informatie over behandelmogelijkheden.", icon: "tooth" },
    ],
    aboutTitle: "Over de praktijk",
    about: ["Wij helpen patiënten met hun mondzorg. Op deze website vindt u praktische informatie over afspraken, openingstijden en bereikbaarheid."],
    features: [
      { title: "Rustige omgeving", description: "Een prettige sfeer in de praktijk.", icon: "leaf" },
      { title: "Duidelijke uitleg", description: "We nemen de tijd om uw vragen te beantwoorden.", icon: "chat" },
      { title: "Goed bereikbaar", description: "Makkelijk te vinden in de stad.", icon: "map" },
    ],
    faq: [
      { q: "Neemt de praktijk nieuwe patiënten aan?", a: "Neem contact op met de praktijk voor de actuele mogelijkheden." },
      { q: "Wat moet ik meenemen naar mijn eerste afspraak?", a: "Neem een geldig identiteitsbewijs en uw zorgpasgegevens mee." },
    ],
  },
  construction: {
    eyebrow: "Bouw & renovatie",
    headline: (n) => `Bouwen en verbouwen met ${n}`,
    sub: "Van eerste idee tot oplevering: bespreek uw bouw- of renovatieproject en vraag vrijblijvend een offerte aan.",
    cta: "Vraag een offerte aan",
    services: [
      { title: "Nieuwbouw", description: "Ondersteuning bij nieuwbouwprojecten.", icon: "home" },
      { title: "Renovatie", description: "Verbouwen en vernieuwen van bestaande ruimtes.", icon: "tool" },
      { title: "Onderhoud", description: "Onderhoud aan woningen en panden.", icon: "shield" },
    ],
    aboutTitle: "Over ons bedrijf",
    about: ["Wij denken mee over uw project. Neem contact op om de mogelijkheden te bespreken en een planning te maken."],
    features: [
      { title: "Heldere afspraken", description: "Vooraf duidelijkheid over planning en aanpak.", icon: "check" },
      { title: "Vakmanschap", description: "Aandacht voor detail in elk project.", icon: "tool" },
      { title: "Lokaal", description: "Actief in de regio.", icon: "map" },
    ],
    faq: [
      { q: "Hoe vraag ik een offerte aan?", a: "Vul het contactformulier in of bel ons; we nemen contact met u op." },
      { q: "Werken jullie ook voor bedrijven?", a: "Neem contact op om uw project te bespreken." },
    ],
  },
  automotive: {
    eyebrow: "Garage & onderhoud",
    headline: (n) => `Uw auto in goede handen bij ${n}`,
    sub: "Onderhoud, reparatie en advies voor uw auto. Plan eenvoudig een afspraak in.",
    cta: "Plan een afspraak",
    services: [
      { title: "Onderhoud", description: "Periodiek onderhoud volgens de richtlijnen van uw auto.", icon: "tool" },
      { title: "Reparatie", description: "Diagnose en reparatie van storingen.", icon: "bolt" },
      { title: "APK", description: "Neem contact op voor de mogelijkheden rond de APK.", icon: "check" },
    ],
    aboutTitle: "Over de garage",
    about: ["Wij helpen u graag met het onderhoud en de reparatie van uw auto. Neem contact op voor een afspraak."],
    features: [
      { title: "Duidelijk advies", description: "We leggen uit wat er nodig is.", icon: "chat" },
      { title: "Afspraak op maat", description: "Plan een moment dat u uitkomt.", icon: "calendar" },
      { title: "Bereikbaar", description: "Goed te bereiken in de regio.", icon: "map" },
    ],
    faq: [{ q: "Kan ik wachten tijdens het onderhoud?", a: "Vraag bij het maken van de afspraak naar de mogelijkheden." }],
  },
  beauty: {
    eyebrow: "Beauty & verzorging",
    headline: (n) => `Tijd voor uzelf bij ${n}`,
    sub: "Een moment van rust en verzorging. Bekijk de behandelingen en maak eenvoudig een afspraak.",
    cta: "Maak een afspraak",
    services: [
      { title: "Knippen & stylen", description: "Een look die bij u past.", icon: "scissors" },
      { title: "Verzorging", description: "Behandelingen voor ontspanning en verzorging.", icon: "spark" },
      { title: "Advies", description: "Persoonlijk advies over verzorging en styling.", icon: "chat" },
    ],
    aboutTitle: "Over de salon",
    about: ["Welkom in onze salon. Hier vindt u informatie over behandelingen, openingstijden en het maken van een afspraak."],
    features: [
      { title: "Persoonlijke aandacht", description: "Elke afspraak draait om u.", icon: "heart" },
      { title: "Ontspannen sfeer", description: "Kom tot rust tijdens uw behandeling.", icon: "leaf" },
      { title: "Eenvoudig afspreken", description: "Neem contact op voor een afspraak.", icon: "calendar" },
    ],
    faq: [{ q: "Hoe maak ik een afspraak?", a: "Bel ons of gebruik het contactformulier." }],
  },
  realestate: {
    eyebrow: "Makelaardij",
    headline: (n, c) => `Uw woning${c ? ` in ${c}` : ""}, onze aandacht — ${n}`,
    sub: "Verkopen, kopen of huren: bespreek uw woonwensen en plan een kennismaking.",
    cta: "Plan een kennismaking",
    services: [
      { title: "Verkoop", description: "Begeleiding bij de verkoop van uw woning.", icon: "home" },
      { title: "Aankoop", description: "Ondersteuning bij de zoektocht naar een nieuwe woning.", icon: "key" },
      { title: "Taxatie", description: "Neem contact op voor de mogelijkheden.", icon: "chart" },
    ],
    aboutTitle: "Over ons kantoor",
    about: ["Wij helpen bij de belangrijke stappen rond wonen. Neem contact op voor een vrijblijvende kennismaking."],
    features: [
      { title: "Lokale kennis", description: "Bekend met de regio.", icon: "map" },
      { title: "Persoonlijk", description: "Een vast aanspreekpunt.", icon: "user" },
      { title: "Helder proces", description: "Duidelijke stappen van begin tot eind.", icon: "check" },
    ],
    faq: [{ q: "Wat kost een eerste gesprek?", a: "Neem contact op; we bespreken graag de mogelijkheden." }],
  },
  corporate: {
    eyebrow: "Welkom",
    headline: (n) => `${n}`,
    sub: "Ontdek wat wij doen en neem contact op om de mogelijkheden te bespreken.",
    cta: "Neem contact op",
    services: [
      { title: "Onze diensten", description: "Neem contact op voor informatie over ons aanbod.", icon: "spark" },
      { title: "Begeleiding", description: "Persoonlijke begeleiding afgestemd op uw doelen.", icon: "user" },
      { title: "Planning", description: "Plan een moment dat u uitkomt.", icon: "calendar" },
    ],
    aboutTitle: "Over ons",
    about: ["Hier vindt u informatie over ons aanbod, onze openingstijden en hoe u contact opneemt."],
    features: [
      { title: "Toegankelijk", description: "Eenvoudig contact opnemen.", icon: "chat" },
      { title: "Flexibel", description: "Afspraken die passen in uw week.", icon: "clock" },
      { title: "Lokaal", description: "Gevestigd in de regio.", icon: "map" },
    ],
    faq: [{ q: "Hoe kan ik starten?", a: "Neem contact op, dan bespreken we de mogelijkheden." }],
  },
  service: {
    eyebrow: "Vakwerk aan huis",
    headline: (n, c) => `${n}: service${c ? ` in ${c}` : ""} en omgeving`,
    sub: "Hulp nodig in of om het huis? Beschrijf uw vraag en neem eenvoudig contact op.",
    cta: "Vraag een afspraak aan",
    services: [
      { title: "Storingen", description: "Hulp bij storingen en problemen.", icon: "bolt" },
      { title: "Installatie", description: "Aanleg en installatie volgens afspraak.", icon: "tool" },
      { title: "Onderhoud", description: "Onderhoud om problemen te voorkomen.", icon: "shield" },
    ],
    aboutTitle: "Over ons",
    about: ["Wij helpen particulieren en bedrijven in de regio. Neem contact op met uw vraag."],
    features: [
      { title: "Duidelijke afspraken", description: "Vooraf helderheid over de aanpak.", icon: "check" },
      { title: "In de regio", description: "Actief in de stad en omgeving.", icon: "map" },
      { title: "Bereikbaar", description: "Neem contact op via telefoon of formulier.", icon: "phone" },
    ],
    faq: [{ q: "Hoe snel kunnen jullie komen?", a: "Neem contact op, dan bespreken we wanneer we langs kunnen komen." }],
  },
};

/** Deterministic, fact-safe SiteSpec used in mock mode and as a fallback base. */
export function buildMockSpec(b: Biz): SiteSpec {
  const template = templateFor(b.category);
  const info = TEMPLATE_INFO[template];
  const c = COPY[template];
  const city = b.city ?? "";
  const sections: SiteSpec["sections"] = [
    { type: "about", id: "over-ons", title: c.aboutTitle, paragraphs: c.about, image: "art:about", highlights: c.features.map((f) => f.title).slice(0, 3) },
    template === "restaurant"
      ? {
          type: "menu",
          id: "menukaart",
          title: "Menukaart",
          intro: "Een greep uit de kaart. Vraag naar de actuele gerechten.",
          categories: [
            { name: "Voorgerechten", items: [{ name: "Wisselend voorgerecht", description: "Vraag het bedieningspersoneel naar de dagelijkse keuze." }] },
            { name: "Hoofdgerechten", items: [{ name: "Wisselend hoofdgerecht", description: "De actuele kaart is beschikbaar in het restaurant." }] },
          ],
          note: "De actuele kaart en prijzen zijn verkrijgbaar in het restaurant.",
        }
      : { type: "services", id: "diensten", title: "Wat wij doen", intro: "Een overzicht van onze diensten.", items: c.services as never },
    { type: "features", id: "waarom", title: "Waarom bij ons", intro: "", items: c.features as never },
    { type: "gallery", id: "sfeer", title: "Sfeer", images: ["art:g1", "art:g2", "art:g3"] },
    { type: "hours", id: "openingstijden", title: "Openingstijden", note: "" },
    { type: "faq", id: "vragen", title: "Veelgestelde vragen", items: c.faq },
    { type: "cta", id: "afspraak", title: c.cta, body: "Neem vandaag nog contact op.", cta: { label: c.cta, href: "#contact" } },
    { type: "contact", id: "contact", title: "Neem contact op", body: "Stel uw vraag of maak een afspraak. We horen graag van u.", showForm: true, showMap: Boolean(b.googleMapsUrl) },
  ];
  return {
    meta: {
      title: `${b.name}${city ? ` | ${city}` : ""}`.slice(0, 70),
      description: `${b.name}${city ? ` in ${city}` : ""}. ${c.sub}`.slice(0, 160),
      lang: "nl",
      keywords: [city, b.category].filter(Boolean),
    },
    theme: { template, primary: info.primary, accent: info.accent, mode: info.mode, font: "Poppins", radius: info.radius },
    business: {
      name: b.name,
      tagline: c.eyebrow,
      phone: b.phone,
      email: null,
      address: b.address,
      city: b.city,
      mapsUrl: b.googleMapsUrl,
      openingHours: b.openingHours,
    },
    images: [],
    hero: {
      eyebrow: c.eyebrow,
      headline: c.headline(b.name, city).slice(0, 90),
      subheadline: c.sub,
      primaryCta: { label: c.cta, href: "#contact" },
      secondaryCta: b.phone ? { label: "Bel ons", href: `tel:${b.phone.replace(/[^\d+]/g, "")}` } : null,
      image: "art:hero",
      layout: info.heroLayout,
    },
    sections,
    footer: { blurb: `${b.name}${city ? ` — ${city}` : ""}. ${c.eyebrow}.` },
  };
}
