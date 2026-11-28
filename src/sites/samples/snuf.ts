import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo content of the Snuf template: a fictional pet shop in Nijmegen. Everything here is
 * invented for the demonstration and labelled as such by the demo bar; prices are marked as
 * example prices, and there are no reviews, ratings, certifications or named people.
 * Product photographs are named after their place on the shelf: art:menu<category>-<item>.
 */

const u = (id: string, w = 1100) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;
const img = (key: string, id: string, alt: string, w?: number) => ({ key, src: u(id, w), alt, license: "stock" as const, credit: "Unsplash" });

export const sample: SiteSpec = {
  meta: {
    title: "Snuf & Co | Dierenspeciaalzaak in Nijmegen",
    description: "Voer, snacks, verzorging en speelgoed voor honden en katten, met zorg gekozen. Bestel online en haal op in de winkel in Nijmegen, of kies de maandelijkse Snufbox.",
    lang: "nl",
    keywords: ["dierenwinkel Nijmegen", "hondenvoer", "kattenvoer", "hondenspeelgoed", "dierenspeciaalzaak", "snufbox"],
  },
  theme: { template: "service", design: "snuf", variation: 0, primary: "#183d30", accent: "#f6a46c", mode: "light", font: "Fraunces Soft", radius: "round" },
  business: {
    name: "Snuf & Co",
    tagline: "Goed spul voor blije snuiten",
    phone: null,
    email: null,
    address: null,
    city: "Nijmegen",
    mapsUrl: null,
    openingHours: ["Maandag: Gesloten", "Dinsdag – Vrijdag: 09:30 – 18:00", "Zaterdag: 09:00 – 17:00", "Zondag: Gesloten"],
  },
  images: [
    img("hero", "1537151625747-768eb6cf92b2", "Een corgi kijkt nieuwsgierig in de camera tegen een oranje achtergrond", 1600),
    img("about", "1596854407944-bf87f6fdd49e", "Een rode kat kijkt over zijn schouder tegen een okergele muur"),
    img("art:about2", "1552053831-71594a27632d", "Een jonge golden retriever met een tulp in zijn bek"),
    img("art:menu0-0", "1589924691995-400dc9ecc119", "Een kom hondenbrokken op een houten vloer naast twee pootjes"),
    img("art:menu0-1", "1568640347023-a616a30bc3bd", "Hondenkoekjes in de vorm van een botje op een roze ondergrond"),
    img("art:menu0-2", "1581888227599-779811939961", "Een hond ligt in een grijze mand tussen de planten"),
    img("art:menu1-1", "1592194996308-7b43878e84a6", "Een kitten tikt met zijn poot naar boven"),
    img("art:menu1-2", "1494256997604-768d1f608cac", "Een kat kruipt onder een zachte deken op de bank"),
    img("art:menu2-0", "1516734212186-a967f81ad0d7", "Een golden retriever wordt geborsteld en geaaid"),
    img("art:menu3-0", "1591946614720-90a587da4a36", "Een hond houdt een gestreepte knuffel in zijn bek"),
    img("art:menu3-2", "1585584114963-503344a119b0", "Een berner sennenpup knaagt op een rode bal in het gras"),
    img("art:g1", "1548199973-03cce0bbc87b", "Twee kleine honden rennen over een zandpad in de zon"),
    img("art:g2", "1543852786-1cf6624b9987", "Een kat met een gele bandana kijkt vrolijk omhoog"),
    img("art:g3", "1623387641168-d9803ddd3f35", "Een kat en een pup liggen samen in het gras"),
    img("art:g4", "1625316708582-7c38734be31d", "Een schnauzer likt zijn neus tegen een gele achtergrond"),
    img("art:g5", "1561037404-61cd46aa615b", "Een jack russell kijkt recht in de camera"),
    img("art:g6", "1543466835-00a7907e9de1", "Een blije beagle met zijn tong uit zijn bek"),
  ],
  hero: {
    eyebrow: "Dierenspeciaalzaak in Nijmegen",
    headline: "Goed spul voor *blije snuiten*",
    subheadline: "Voer, snacks, verzorging en speelgoed voor honden en katten — met zorg gekozen, eerlijk samengesteld en met plezier verkocht. Bestel online en haal op in de winkel.",
    primaryCta: { label: "Bestel & haal op", href: "#bestellen" },
    secondaryCta: { label: "Bekijk het assortiment", href: "#assortiment" },
    image: "hero",
    layout: "split",
    note: "Woef! Kom je even snuffelen?",
  },
  sections: [
    {
      type: "menu",
      id: "assortiment",
      title: "Uit de *schappen*",
      intro: "Een kleine, zorgvuldige selectie: liever twaalf dingen die we zelf zouden kopen dan honderd die we niet kennen. Tik op een hartje om iets te bewaren.",
      categories: [
        {
          name: "Honden",
          items: [
            { name: "Graanvrije brokken met zalm", description: "Volledige voeding met zalm, zoete aardappel en erwten. In zakken van 2 en 6 kg.", price: "€ 18,95", tags: ["Graanvrij"] },
            { name: "Hondenkoekjes in botvorm", description: "Knapperige koekjes met haver en pindakaas, zonder toegevoegde suiker.", price: "€ 5,95", tags: ["Snack"] },
            { name: "Mand van gerecycled katoen", description: "Zacht, stevig en met een afneembare hoes die in de wasmachine mag.", price: "€ 64,00", tags: ["Favoriet"] },
          ],
        },
        {
          name: "Katten",
          items: [
            { name: "Natvoer met kip, 12 × 85 g", description: "Malse stukjes kip in saus, met taurine en zonder kunstmatige kleurstoffen.", price: "€ 13,95" },
            { name: "Kattenhengel met veren", description: "Een buigzame hengel met een veren staart die blijft dansen.", price: "€ 6,95", tags: ["Speels"] },
            { name: "Fleece kattendeken", description: "Een zachte deken voor op de bank of in de vensterbank, in drie kleuren.", price: "€ 16,50" },
          ],
        },
        {
          name: "Verzorging",
          items: [
            { name: "Zachte borstel met houten greep", description: "Natuurlijke haren voor een glanzende vacht, ook voor gevoelige huid.", price: "€ 15,00" },
            { name: "Milde vachtshampoo", description: "Met havermout en aloë vera, zonder parfum. Voor honden en katten.", price: "€ 11,95" },
            { name: "Pootbalsem met sheabutter", description: "Beschermt kussentjes tegen strooizout, hete stoeptegels en ruwe paden.", price: "€ 8,95" },
          ],
        },
        {
          name: "Speelgoed",
          items: [
            { name: "Knuffel met piep", description: "Stevig gestikte knuffel met een piepje dat het lang volhoudt.", price: "€ 9,95", tags: ["Nieuw"] },
            { name: "Snuffelmat", description: "Verstop brokjes tussen de flappen: urenlang zoekplezier en rustig eten.", price: "€ 24,95" },
            { name: "Bal van natuurrubber", description: "Stuitert onvoorspelbaar en drijft, ideaal voor het park en het strand.", price: "€ 6,50" },
          ],
        },
      ],
      note: "Voorbeeldprijzen — dit is een ontwerpconcept. Prijzen en voorraad in de winkel kunnen afwijken.",
    },
    {
      type: "about",
      id: "verhaal",
      title: "Begonnen met één *nieuwsgierige neus*",
      paragraphs: [
        "Snuf & Co begon met een simpele vraag aan de toonbank: wat zit hier eigenlijk in? Het antwoord was vaak ingewikkelder dan nodig. Dus besloten we het anders te doen.",
        "In onze winkel in Nijmegen vind je een kleine selectie voer, snacks, verzorging en speelgoed die we zelf hebben uitgezocht. Van elk product weten we waar het vandaan komt en waarom het in het schap ligt.",
        "Twijfel je wat bij je hond of kat past? Neem je huisdier gerust mee. We nemen de tijd, luisteren en geven advies zonder verkooppraatje.",
      ],
      image: "about",
      highlights: ["Persoonlijk voeradvies", "Kleine, zorgvuldige selectie", "Online bestellen, in de winkel ophalen", "Honden én katten welkom"],
    },
    {
      type: "statement",
      id: "belofte",
      title: "We verkopen alleen wat we *onze eigen dieren* ook zouden geven.",
      note: "Onze belofte",
    },
    {
      type: "features",
      id: "principes",
      title: "Wat er wél *in de bak* gaat",
      intro: "Geen keurmerken om mee te pronken, wel heldere principes voor alles wat we verkopen.",
      items: [
        { title: "Ingrediënten die je kunt lezen", description: "Op het etiket staat vlees of vis bovenaan, en korte lijstjes met dingen die je herkent.", icon: "leaf" },
        { title: "Eerst zelf uitproberen", description: "Nieuwe producten testen we eerst met onze eigen dieren, voordat ze het schap in gaan.", icon: "heart" },
        { title: "Duurzaam waar het kan", description: "Navulbaar, gerecycled of zonder plastic: bij elke keuze kijken we ook naar de verpakking.", icon: "sprout" },
        { title: "Klein assortiment", description: "Minder keuze, beter gekozen. Zo vind je sneller wat bij jouw dier past.", icon: "check" },
        { title: "Advies zonder verkooppraatje", description: "We raden aan wat past, ook als dat het goedkopere product is.", icon: "chat" },
        { title: "Lokaal waar mogelijk", description: "Snacks en accessoires kopen we het liefst in bij makers uit de regio.", icon: "map" },
      ],
    },
    {
      type: "packages",
      id: "snufbox",
      title: "De *Snufbox*, elke maand",
      intro: "Een doos met voer, snacks en een verrassing, afgestemd op jouw hond of kat. Ophalen in de winkel of laten bezorgen in Nijmegen.",
      items: [
        { name: "Snuffeltje", price: "€ 19,95", unit: "per maand", description: "Voor de kleine trek en de eerste kennismaking.", features: ["Twee zakjes snacks", "Eén stuk speelgoed", "Tips op maat"], featured: false },
        { name: "Kwispel", price: "€ 34,95", unit: "per maand", description: "De box die de meeste baasjes kiezen.", features: ["Voer voor twee weken", "Drie soorten snacks", "Eén stuk speelgoed", "Verzorgingsproduct"], featured: true },
        { name: "Royaal", price: "€ 54,95", unit: "per maand", description: "Alles voor een hele maand, zonder nadenken.", features: ["Voer voor een maand", "Snacks en kauwartikelen", "Twee stuks speelgoed", "Gratis bezorging in Nijmegen"], featured: false },
      ],
      note: "Voorbeeldprijzen — maandelijks opzegbaar, ophalen in de winkel kost niets extra.",
    },
    {
      type: "process",
      id: "zo-werkt-het",
      title: "Zo werkt *de Snufbox*",
      intro: "In vier stappen van eerste kennismaking tot een box die precies past.",
      steps: [
        { title: "Vertel over je dier", description: "Leeftijd, formaat, smaak en allergieën: hoe meer we weten, hoe beter de box." },
        { title: "Wij stellen samen", description: "We kiezen voer, snacks en speelgoed uit ons eigen assortiment." },
        { title: "Ophalen of bezorgen", description: "Haal je box op in de winkel of laat hem thuisbezorgen in Nijmegen." },
        { title: "Bijsturen wanneer je wilt", description: "Iets niet in de smaak gevallen? Laat het weten, dan passen we de volgende aan." },
      ],
    },
    {
      type: "gallery",
      id: "snuiten",
      title: "Blije *snuiten*",
      images: ["art:g1", "art:g2", "art:g3", "art:g4", "art:g5", "art:g6"],
    },
    {
      type: "hours",
      id: "winkel",
      title: "Winkel & *afhalen*",
      note: "Online besteld? Je bestelling ligt meestal binnen twee werkdagen voor je klaar. We sturen een bericht zodra je hem kunt ophalen.",
    },
    {
      type: "faq",
      id: "vragen",
      title: "Vragen van *baasjes*",
      items: [
        { q: "Kan ik mijn hond meenemen naar de winkel?", a: "Graag zelfs! Aangelijnde honden zijn altijd welkom, en er staat een bak water bij de deur." },
        { q: "Hoe werkt online bestellen en ophalen?", a: "Vul het bestelformulier in. We zetten alles klaar en sturen een bericht zodra je bestelling in de winkel ligt." },
        { q: "Kan ik de Snufbox op elk moment stoppen?", a: "Ja, de Snufbox is maandelijks opzegbaar. Laat het voor het einde van de maand weten, dan sturen we geen nieuwe box." },
        { q: "Mijn hond heeft een allergie. Kunnen jullie helpen?", a: "We denken graag mee over voer zonder bepaalde ingrediënten. Neem bij twijfel ook contact op met je dierenarts." },
        { q: "Bezorgen jullie ook buiten Nijmegen?", a: "Op dit moment bezorgen we alleen in Nijmegen. Daarbuiten kun je je bestelling in de winkel ophalen." },
      ],
    },
    {
      type: "booking",
      id: "bestellen",
      title: "Bestellen & *ophalen*",
      body: "Laat weten wat je nodig hebt en of je wilt ophalen of laten bezorgen. Wij zetten het klaar en sturen een bericht zodra het zover is.",
      kind: "order",
      options: [],
    },
  ],
  footer: { blurb: "Snuf & Co — dierenspeciaalzaak in Nijmegen. Voer, snacks, verzorging en speelgoed voor honden en katten." },
};
