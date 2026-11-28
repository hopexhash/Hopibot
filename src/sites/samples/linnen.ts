import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo of the Linnen template: a fictional interior design studio in Utrecht. Everything here is
 * example content for a design concept: no real clients, no reviews, no awards, and the projects
 * are concepts. Prices are marked as example prices.
 */

const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;
const img = (key: string, id: string, alt: string, w?: number) => ({ key, src: u(id, w), alt, license: "stock" as const, credit: "Unsplash" });

export const sample: SiteSpec = {
  meta: {
    title: "Studio Linnen — interieurontwerp in Utrecht",
    description: "Studio Linnen ontwerpt rustige, warme interieurs voor woningen en kleine horeca in Utrecht: advies aan huis, volledig ontwerp, styling en maatwerk meubels.",
    lang: "nl",
    keywords: ["interieurontwerp Utrecht", "interieuradvies aan huis", "interieurstylist", "maatwerk meubels", "Scandinavisch interieur", "horeca-interieur"],
  },
  theme: { template: "realestate", design: "linnen", variation: 0, primary: "#4c583c", accent: "#4c583c", mode: "light", font: "Fraunces Soft", radius: "round" },
  business: {
    name: "Studio Linnen",
    tagline: "Interieurontwerp met zachte materialen en veel licht",
    phone: null,
    email: null,
    address: null,
    city: "Utrecht",
    mapsUrl: null,
    openingHours: ["Maandag: Gesloten", "Dinsdag – Vrijdag: 09:30 – 17:30", "Zaterdag: 10:00 – 16:00", "Zondag: Gesloten"],
  },
  images: [
    img("art:hero", "1617325247661-675ab4b64ae2", "Slaapkamer met een bedbodem van oud eiken, wit linnen beddengoed en kussens in zand en grijs", 1920),
    img("art:side1", "1590439471364-192aa70c0b53", "Linnen handdoek, een keramieken schaaltje en natuurlijke zeep in zacht daglicht", 900),
    img("art:about", "1519710164239-da123dc03ef4", "Lichte hoek bij het raam met een ronde tafel, een stoel van gebogen hout en planten"),
    img("art:side2", "1610701596007-11502861dcfa", "Handgedraaide bekers van klei in crème en oker", 900),
    img("art:svc0", "1605774337664-7a846e9cdf17", "Woonkamer met een grijsgroene bank, een ovale salontafel van notenhout en een wollen poef"),
    img("art:svc1", "1630585308572-f53438fc684f", "Eiken wandpaneel, een natuurstenen salontafel en een diepgroene fluwelen bank"),
    img("art:svc2", "1578500494198-246f612d3b3d", "Gedroogde pluimen in een glazen vaas naast een bank in kameelkleurig suède"),
    img("art:svc3", "1622372738946-62e02505feb3", "Maatwerk keukenwand in eiken met een vitrinekast en een bar van donker hout"),
    img("art:svc4", "1551776235-dde6d482980b", "Zachte plooien van wit linnen in strijklicht"),
    img("art:svc5", "1600585154084-4e5fe7c39198", "Open ruimte met een lange eettafel, een lage bank en een glazen pui naar het terras"),
    img("art:g1", "1616627561839-074385245ff6", "Concept ‘Kleihuis’ — slaapkamer met roestbruin linnen, eiken en een wand in kalkverf"),
    img("art:g2", "1618221195710-dd6b41faaea6", "Concept ‘Lange kamer’ — laag zitmeubel, cognac leer en een smal lichtvenster"),
    img("art:g3", "1600607687126-8a3414349a51", "Concept ‘Witte morgen’ — bedhoek met bloeiende takken, grijs linnen en zwart staal"),
    img("art:g4", "1616486029423-aaa4789e8c9a", "Concept ‘Zandkamer’ — slaapkamer in zandtinten met een houten bankje aan het voeteneind"),
    img("art:g5", "1631679706909-1844bbd07221", "Concept ‘Zon in huis’ — bouclé, rieten spiegels en een ronde salontafel"),
    img("art:g6", "1517705008128-361805f42e86", "Concept ‘Werkplek aan huis’ — een lichte kuipstoel en een smal bijzettafeltje"),
    img("art:show", "1600210492493-0946911123ea", "Woonkamer met een houten plafond, een cognac bank en een glazen gevel naar het groen"),
  ],
  hero: {
    eyebrow: "Interieurstudio · Utrecht",
    headline: "Rust in huis, *met zachte materialen*",
    subheadline: "Studio Linnen ontwerpt warme, kalme interieurs voor woningen en kleine horeca. Van één adviesgesprek aan huis tot een volledig ontwerp met maatwerk in eiken.",
    primaryCta: { label: "Plan een adviesgesprek", href: "#afspraak" },
    secondaryCta: { label: "Bekijk de concepten", href: "#concepten" },
    image: "art:hero",
    layout: "split",
    note: "Advies aan huis in Utrecht en omgeving",
  },
  sections: [
    {
      type: "about",
      id: "studio",
      title: "Een interieur dat *ademt*",
      paragraphs: [
        "Wij geloven in kamers die rustig worden zodra je binnenkomt: minder spullen, betere materialen en licht dat de ruimte zijn werk laat doen.",
        "Elk ontwerp begint bij hoe u leeft. Waar valt de ochtendzon, waar wordt gelezen, gekookt, gewerkt? Daarna kiezen we materialen die mooier worden met de jaren: linnen, massief eiken, kalkverf, wol en natuursteen.",
        "We werken voor particulieren en voor kleine horeca: een koffiebar, een boetiekhotel met een handvol kamers, een praktijk met een wachtkamer waar mensen graag even zitten.",
      ],
      image: "art:about",
      highlights: ["Natuurlijke materialen", "Ontwerp op maat van uw dag", "Eén vast aanspreekpunt"],
    },
    {
      type: "services",
      id: "diensten",
      title: "Het *materiaalpalet* van de studio",
      intro: "Kies wat u nodig hebt: een frisse blik in één middag, of een volledig ontwerp tot en met de laatste lamp. Elk onderdeel kan ook los.",
      items: [
        { title: "Advies aan huis", description: "Een ochtend of middag bij u thuis. We lopen samen door de ruimtes en u krijgt concrete keuzes mee: indeling, kleur, licht en wat u kunt houden.", icon: "home", price: null, duration: "2,5 uur" },
        { title: "Volledig interieurontwerp", description: "Plattegrond, wandaanzichten, materiaalstaal en een lichtplan. Met een moodboard per ruimte en een overzicht van alle keuzes en leveranciers.", icon: "ruler", price: null, duration: null },
        { title: "Styling", description: "De laatste laag: textiel, keramiek, kunst en planten. We stylen een bestaande ruimte of maken een nieuwe woning helemaal af.", icon: "spark", price: null, duration: null },
        { title: "Maatwerk meubels", description: "Kasten, banken en tafels die precies passen, getekend in de studio en gemaakt door meubelmakers uit de regio. In eiken, essen of gelakt.", icon: "tool", price: null, duration: null },
        { title: "Kleur- en materiaaladvies", description: "Een kleurplan voor muren en plafonds, met stalen van verf, stof en vloer die u thuis in uw eigen licht kunt bekijken.", icon: "brush", price: null, duration: null },
        { title: "Kleine horeca", description: "Interieurs voor koffiebars, kleine hotels en praktijken: sfeer, looproutes en materialen die tegen dagelijks gebruik kunnen.", icon: "coffee", price: null, duration: null },
      ],
    },
    {
      type: "statement",
      id: "visie",
      title: "Een goed interieur valt *niet op*. Je merkt alleen dat je er langer blijft zitten.",
      note: "Waar de studio voor staat",
    },
    {
      type: "gallery",
      id: "concepten",
      title: "Concepten uit de *studio*",
      images: ["art:g1", "art:g2", "art:g3", "art:g4", "art:g5", "art:g6"],
    },
    {
      type: "process",
      id: "werkwijze",
      title: "Zo komt een ontwerp *tot rust*",
      intro: "Vier stappen, in uw tempo. Na elke stap beslist u of we verder gaan.",
      steps: [
        { title: "Kennismaken", description: "Een gesprek bij u thuis of in de studio. We luisteren naar hoe u woont en wat u mist, en meten de ruimte op." },
        { title: "Schetsontwerp", description: "Een eerste indeling en een moodboard met materialen en kleuren. We schuiven tot het klopt." },
        { title: "Definitief ontwerp", description: "Tekeningen, lichtplan, materiaalstaal en een begroting per onderdeel, zodat u precies weet waar u aan toe bent." },
        { title: "Uitvoering & styling", description: "We stemmen af met aannemer en meubelmaker en maken de ruimte af met textiel, licht en de laatste details." },
      ],
    },
    {
      type: "features",
      id: "uitgangspunten",
      title: "Waar we op *letten*",
      intro: "Geen trends om de trends, wel een paar vaste uitgangspunten in elk ontwerp.",
      items: [
        { title: "Materialen die blijven", description: "Massief hout, linnen, wol en natuursteen: materialen die je kunt repareren en die mooier worden als ze slijten.", icon: "leaf" },
        { title: "Licht eerst", description: "Daglicht bepaalt de indeling. Kunstlicht plannen we in lagen, zodat elke kamer 's avonds net zo rustig is.", icon: "sun" },
        { title: "Houden wat goed is", description: "We kijken eerst wat er al staat. Een geliefde stoel of een oude kast krijgt een plek in het nieuwe plan.", icon: "heart" },
      ],
    },
    {
      type: "showcase",
      id: "bibliotheek",
      title: "De materiaal*bibliotheek*",
      body: "In de studio liggen stalen van linnen, wol, hout, kalkverf en natuursteen klaar. Kom voelen voordat u kiest.",
      image: "art:show",
      cta: { label: "Maak een afspraak", href: "#afspraak" },
    },
    {
      type: "packages",
      id: "tarieven",
      title: "Drie manieren om te *beginnen*",
      intro: "Een vaste prijs vooraf voor advies; voor een volledig ontwerp maken we een voorstel op maat.",
      items: [
        { name: "Advies aan huis", price: "€ 245", unit: "per bezoek", description: "Een frisse blik op uw woning in één bezoek.", features: ["2,5 uur bij u thuis", "Schetsen en keuzes op papier", "Kleuradvies voor één ruimte"], featured: false },
        { name: "Ruimte-ontwerp", price: "€ 1.450", unit: "per ruimte", description: "Eén ruimte volledig uitgewerkt.", features: ["Plattegrond en wandaanzichten", "Moodboard en materiaalstaal", "Lichtplan", "Boodschappenlijst met leveranciers"], featured: true },
        { name: "Volledig ontwerp", price: null, unit: "", description: "Voor een hele woning of een horecazaak.", features: ["Ontwerp van alle ruimtes", "Maatwerk meubels", "Begeleiding tijdens de uitvoering", "Styling bij oplevering"], featured: false },
      ],
      note: "Voorbeeldprijzen voor dit websiteconcept, inclusief btw. Reiskosten buiten Utrecht in overleg.",
    },
    {
      type: "faq",
      id: "vragen",
      title: "Veelgestelde vragen",
      items: [
        { q: "Werken jullie alleen in Utrecht?", a: "De studio zit in Utrecht en de meeste opdrachten liggen in de provincie. Verder weg kan ook; we spreken dan vooraf de reiskosten af." },
        { q: "Moet ik alles in één keer laten ontwerpen?", a: "Nee. Veel mensen beginnen met één ruimte of met een adviesgesprek aan huis, en bouwen het daarna verder uit." },
        { q: "Kan ik mijn eigen meubels houden?", a: "Graag zelfs. We inventariseren wat er al is en geven goede stukken een plek in het nieuwe ontwerp." },
        { q: "Regelen jullie ook de aannemer en meubelmaker?", a: "Dat kan. We werken samen met vakmensen uit de regio en stemmen de uitvoering met hen af. U mag ook met uw eigen aannemer werken." },
        { q: "Doen jullie ook bedrijfsruimtes?", a: "Ja, kleine horeca, kleine hotels en praktijkruimtes. Voor grote kantoren zijn we niet de juiste studio." },
      ],
    },
    {
      type: "hours",
      id: "bezoek",
      title: "De studio *bezoeken*",
      note: "U bent welkom in de studio om stalen te bekijken. Op zaterdag werken we alleen op afspraak, zodat we echt tijd voor u hebben.",
    },
    {
      type: "booking",
      id: "afspraak",
      title: "Plan een *adviesgesprek*",
      body: "Vertel kort over uw ruimte en wat u zoekt. We nemen binnen twee werkdagen contact op om een moment te prikken, bij u thuis of in de studio.",
      kind: "appointment",
      options: ["Advies aan huis", "Volledig interieurontwerp", "Styling", "Maatwerk meubels", "Kleur- en materiaaladvies", "Kleine horeca"],
    },
  ],
  footer: { blurb: "Studio Linnen — interieurontwerp voor woningen en kleine horeca in Utrecht. Rustige ruimtes met materialen die blijven." },
};
