import type { ICONS, SiteSection, SiteSpec } from "@/lib/site-spec";
import { languageFor } from "@/lib/markets";
import { hashString } from "@/sites/art";
import { getDesign, variationCount } from "@/sites/designs";

/**
 * Default content per design. Blueprints are fact-safe: they describe what this kind of
 * business typically offers, never claim anything specific about the business, never
 * contain prices, reviews, awards or people's names. Verified facts (phone, address,
 * hours) are injected from the business record.
 */

type Icon = (typeof ICONS)[number];
type Row = [title: string, description: string, icon: Icon];
type Dish = [name: string, description: string, ...tags: string[]];
type SectionKey = "about" | "offer" | "features" | "gallery" | "hours" | "faq" | "cta" | "contact" | "packages" | "team" | "booking" | "beforeafter" | "order" | "process";

type Blueprint = {
  eyebrow: string;
  headline: (name: string, city: string) => string;
  sub: string;
  cta: string;
  note?: string;
  offer:
    | { kind: "menu"; id: string; title: string; intro: string; categories: { name: string; items: Dish[] }[] }
    | { kind: "services"; id: string; title: string; intro: string; items: Row[] };
  aboutTitle: string;
  about: string[];
  highlights: string[];
  features: Row[];
  faq: [string, string][];
  booking?: { kind: "reservation" | "appointment" | "quote" | "order"; title: string; body: string };
  packages?: { title: string; intro: string; items: [name: string, description: string, features: string[]][] };
  team?: { title: string; intro: string; roles: string[] };
  process?: { title: string; steps: [string, string][] };
  beforeafter?: { title: string; intro: string };
  order?: { title: string; body: string };
  galleryTitle: string;
  ctaTitle: string;
  ctaBody: string;
  sections: SectionKey[];
};

const MENU_NOTE = "Voorbeeldkaart ter illustratie — de definitieve kaart en prijzen nemen we over van uw eigen menukaart.";
const SERVICE_NOTE = "Tarieven op aanvraag — in de definitieve website tonen we uw eigen prijzen.";

const BLUEPRINTS: Record<string, Blueprint> = {
  "luxury-restaurant": {
    eyebrow: "Restaurant",
    headline: (n, c) => `Een avond om *te onthouden*${c ? ` in ${c}` : ""}`,
    sub: "Verfijnde gerechten, een zorgvuldig samengestelde wijnkaart en een tafel die voor u klaarstaat. Bekijk de kaart en reserveer uw avond.",
    cta: "Reserveer een tafel",
    offer: {
      kind: "menu", id: "menukaart", title: "De kaart", intro: "Een kaart die meebeweegt met het seizoen.",
      categories: [
        { name: "Voorgerechten", items: [["Seizoensvoorgerecht", "Wisselt met het aanbod van de dag"], ["Vis van de dag", "Licht bereid, met een frisse garnituur"], ["Vegetarische creatie", "Groenten in de hoofdrol"]] },
        { name: "Hoofdgerechten", items: [["Uit de zee", "Dagverse vis met seizoensgroenten"], ["Van het land", "Langzaam gegaard, met jus en bijgerechten"], ["Uit de tuin", "Een volwaardig vegetarisch hoofdgerecht"]] },
        { name: "Nagerechten", items: [["Dessert van de chef", "Een zoete afsluiter"], ["Kaasselectie", "Geserveerd met brood en compote"]] },
        { name: "Wijn", items: [["Wijnarrangement", "Bijpassende wijnen bij elk gerecht"], ["Per glas of fles", "Vraag naar de kaart van dit moment"]] },
      ],
    },
    aboutTitle: "Gastvrijheid met aandacht",
    about: ["Hier draait alles om de avond zelf: rustig aan tafel, goed eten en tijd voor elkaar.", "Op deze pagina vindt u de kaart, onze openingstijden en alles wat u nodig heeft om te reserveren."],
    highlights: ["Seizoenskaart", "Wijnarrangement", "Besloten diners"],
    features: [["Seizoensgebonden", "De kaart volgt het seizoen.", "leaf"], ["Wijn & spijs", "Advies bij elk gerecht.", "wine"], ["Besloten gezelschap", "Informeer naar de mogelijkheden.", "calendar"]],
    faq: [["Kan ik online reserveren?", "Ja, via het reserveringsformulier of telefonisch."], ["Houden jullie rekening met dieetwensen?", "Geef uw wensen door bij de reservering, dan bespreken we de mogelijkheden."], ["Is een besloten diner mogelijk?", "Neem contact op om uw gezelschap en wensen te bespreken."]],
    booking: { kind: "reservation", title: "Reserveer uw tafel", body: "Kies een datum en tijd. U ontvangt een bevestiging zodra uw reservering is verwerkt." },
    galleryTitle: "Sfeer", ctaTitle: "Uw tafel staat klaar", ctaBody: "Reserveer vandaag nog voor een avond aan tafel.",
    sections: ["about", "offer", "gallery", "booking", "hours", "faq", "cta", "contact"],
  },
  "modern-italian": {
    eyebrow: "Cucina italiana",
    headline: () => "Aan tafel, zoals in *Italië*",
    sub: "Verse pasta, eerlijke ingrediënten en een tafel vol gezelligheid. Bekijk de kaart, reserveer of bestel om af te halen.",
    cta: "Reserveer een tafel",
    offer: {
      kind: "menu", id: "menu", title: "Il menu", intro: "Klassiekers uit de Italiaanse keuken, met liefde bereid.",
      categories: [
        { name: "Antipasti", items: [["Bruschetta", "Geroosterd brood, tomaat, basilicum", "Vega"], ["Burrata", "Met tomaat en olijfolie", "Vega"], ["Antipasto misto", "Een plank om te delen"]] },
        { name: "Pasta", items: [["Tagliatelle al ragù", "Langzaam gestoofde saus"], ["Spaghetti alle vongole", "Met schelpdieren en knoflook"], ["Ravioli", "Gevuld, met salie en boter", "Vega"]] },
        { name: "Secondi", items: [["Vis van de dag", "Van de grill, met citroen"], ["Tagliata", "Gesneden, met rucola en Parmezaan"]] },
        { name: "Dolci", items: [["Tiramisù", "Het huisrecept"], ["Panna cotta", "Met seizoensfruit"]] },
      ],
    },
    aboutTitle: "La nostra cucina",
    about: ["Eten is bij ons een moment om te delen. Eenvoudige gerechten, goede ingrediënten en tijd voor elkaar.", "Kom langs voor de lunch, schuif 's avonds aan of neem uw favoriete gerechten mee naar huis."],
    highlights: ["Verse pasta", "Afhalen mogelijk", "Groepen welkom"],
    features: [["Vers bereid", "Elke dag opnieuw gemaakt.", "utensils"], ["Om te delen", "Schalen en planken voor de hele tafel.", "heart"], ["Afhalen", "Bestel en haal op wanneer het u uitkomt.", "bag"]],
    faq: [["Kan ik reserveren voor een groep?", "Ja. Neem contact op, dan bespreken we de mogelijkheden."], ["Hebben jullie vegetarische gerechten?", "Ja, op de kaart staan meerdere vegetarische gerechten."], ["Kan ik afhalen?", "Bel ons om uw bestelling door te geven."]],
    booking: { kind: "reservation", title: "Prenota un tavolo", body: "Reserveer eenvoudig online. Voor grotere groepen kunt u het beste even bellen." },
    order: { title: "Afhalen & bezorgen", body: "Liever thuis genieten? Geef uw bestelling door." },
    galleryTitle: "Uit onze keuken", ctaTitle: "Buon appetito", ctaBody: "Reserveer een tafel of bestel om af te halen.",
    sections: ["about", "offer", "gallery", "order", "booking", "hours", "faq", "cta", "contact"],
  },
  "turkish-restaurant": {
    eyebrow: "Turkse keuken",
    headline: (n) => `*Hoş geldiniz* bij ${n}`,
    sub: "Mezze om te delen, vlees van de houtskoolgrill en vers gebakken brood. Kom met familie en vrienden en schuif aan.",
    cta: "Reserveer een tafel",
    offer: {
      kind: "menu", id: "menukaart", title: "Menukaart", intro: "Van koude mezze tot gerechten van de grill.",
      categories: [
        { name: "Mezze", items: [["Humus", "Kikkererwten, tahin, olijfolie", "Vega"], ["Haydari", "Yoghurt met kruiden en knoflook", "Vega"], ["Sigara böreği", "Krokant deeg met witte kaas", "Vega"]] },
        { name: "Van de grill", items: [["Adana kebap", "Pittig gekruid, van de houtskoolgrill"], ["Tavuk şiş", "Gemarineerde kipspiesen"], ["Karışık ızgara", "Gemengde grillschotel om te delen"]] },
        { name: "Zoet & thee", items: [["Baklava", "Met pistache"], ["Künefe", "Warm geserveerd"], ["Turkse thee", "Geserveerd in een tulpglas"]] },
      ],
    },
    aboutTitle: "Aan tafel met elkaar",
    about: ["In de Turkse keuken eet je samen. De tafel staat vol met schaaltjes, brood komt warm uit de oven en er is altijd thee.", "Hier vindt u onze kaart, openingstijden en de mogelijkheid om een tafel te reserveren."],
    highlights: ["Houtskoolgrill", "Familie & groepen", "Afhalen"],
    features: [["Van de grill", "Vers bereid op houtskool.", "flame"], ["Samen eten", "Schotels om te delen.", "heart"], ["Groepen", "Ruimte voor familie en feesten.", "calendar"]],
    faq: [["Kan ik met een grote groep komen?", "Ja, neem contact op zodat we een tafel voor u kunnen klaarzetten."], ["Is afhalen mogelijk?", "Ja, bel ons om uw bestelling door te geven."], ["Zijn er vegetarische gerechten?", "Ja, veel van onze mezze zijn vegetarisch."]],
    booking: { kind: "reservation", title: "Reserveer een tafel", body: "Voor twee personen of de hele familie — laat weten wanneer u komt." },
    order: { title: "Afhalen & bestellen", body: "Geniet thuis van uw favoriete gerechten." },
    galleryTitle: "Proef de sfeer", ctaTitle: "Afiyet olsun", ctaBody: "Reserveer een tafel of bestel om af te halen.",
    sections: ["about", "offer", "features", "gallery", "order", "booking", "hours", "cta", "contact"],
  },
  sushi: {
    eyebrow: "Sushi & Japanse keuken",
    headline: () => "Sushi, met *precisie* gemaakt",
    sub: "Vers gesneden vis, perfect gekookte rijst en rust op het bord. Reserveer een tafel of bestel om af te halen.",
    cta: "Bestel online",
    offer: {
      kind: "menu", id: "menu", title: "Menu", intro: "Een selectie van de kaart.",
      categories: [
        { name: "Nigiri", items: [["Sake", "Zalm"], ["Maguro", "Tonijn"], ["Ebi", "Garnaal"]] },
        { name: "Maki", items: [["Kappa maki", "Komkommer", "Vega"], ["Sake maki", "Zalm"], ["California roll", "Krab, avocado, komkommer"]] },
        { name: "Sashimi", items: [["Sashimi moriawase", "Selectie van de chef"], ["Sake sashimi", "Zalm, dun gesneden"]] },
        { name: "Warm", items: [["Miso soep", "Tofu, wakame, bosui"], ["Gyoza", "Gebakken dumplings"], ["Edamame", "Met zeezout", "Vega"]] },
      ],
    },
    aboutTitle: "Minder is meer",
    about: ["Goede sushi vraagt om aandacht voor elk detail: de rijst, de snit, de temperatuur.", "Eet bij ons aan tafel, of bestel en haal uw sushi op."],
    highlights: ["Dagvers", "Afhalen & bezorgen", "Vegetarische keuzes"],
    features: [["Dagvers", "Elke dag vers bereid.", "drop"], ["Afhalen", "Bestel vooruit en haal op.", "bag"], ["Bezorgen", "Vraag naar het bezorggebied.", "bike"]],
    faq: [["Kan ik online bestellen?", "Ja, geef uw bestelling door via het formulier of telefonisch."], ["Bezorgen jullie ook?", "Neem contact op voor het bezorggebied en de tijden."], ["Zijn er vegetarische opties?", "Ja, op de kaart staan meerdere vegetarische gerechten."]],
    booking: { kind: "order", title: "Bestellen", body: "Kies voor afhalen of bezorgen. We nemen contact op om uw bestelling te bevestigen." },
    order: { title: "Afhalen & bezorgen", body: "Geniet thuis van uw sushi." },
    galleryTitle: "Van onze toonbank", ctaTitle: "Zin in sushi?", ctaBody: "Bestel nu of reserveer een tafel.",
    sections: ["about", "offer", "gallery", "order", "booking", "hours", "cta", "contact"],
  },
  burger: {
    eyebrow: "Burgers & friet",
    headline: () => "Grote trek? *Wij regelen het*",
    sub: "Sappige burgers, krokante friet en ijskoude drankjes. Eet bij ons, haal af of laat het thuisbezorgen.",
    cta: "Bestel nu",
    note: "Vers van de grill",
    offer: {
      kind: "menu", id: "menu", title: "Het menu", intro: "Kies je favoriet. Alles wordt vers voor je gemaakt.",
      categories: [
        { name: "Burgers", items: [["Classic", "Rundvlees, sla, tomaat, augurk, huissaus"], ["Cheese", "Dubbel kaas, gebakken ui"], ["Chicken", "Krokante kip, koolsla, mayo"], ["Veggie", "Plantaardige burger, avocado", "Vega"], ["Smokey", "Bacon, barbecuesaus, crispy ui"], ["Spicy", "Jalapeño, pittige saus", "Pittig"]] },
        { name: "Sides", items: [["Friet", "Krokant, met zeezout", "Vega"], ["Loaded fries", "Met kaas en topping"], ["Onion rings", "Uienringen uit de frituur", "Vega"]] },
      ],
    },
    aboutTitle: "Gewoon heel goede burgers",
    about: ["Geen poespas. Goed vlees, verse broodjes en sauzen waar je voor terugkomt.", "Kom langs, bestel om af te halen of laat bezorgen."],
    highlights: ["Vers bereid", "Afhalen", "Bezorgen"],
    features: [["Vers gegrild", "Op bestelling gemaakt.", "flame"], ["Afhalen", "Bestel vooruit, haal snel op.", "bag"], ["Bezorgen", "Warm bij jou thuis.", "bike"]],
    faq: [["Kan ik online bestellen?", "Ja, via het bestelformulier of telefonisch."], ["Hebben jullie vegetarische burgers?", "Ja, er staat een vegetarische burger op het menu."]],
    booking: { kind: "order", title: "Bestel je burger", body: "Afhalen of bezorgen? Laat het ons weten en we maken alles vers voor je klaar." },
    order: { title: "Afhalen of bezorgen", body: "Kies hoe je wilt bestellen." },
    galleryTitle: "Kijk en krijg trek", ctaTitle: "Honger gekregen?", ctaBody: "Bestel je favoriete burger voor afhalen of bezorgen.",
    sections: ["offer", "about", "order", "gallery", "booking", "hours", "cta", "contact"],
  },
  pizzeria: {
    eyebrow: "Pizzeria",
    headline: () => `Pizza, *vers uit de oven*`,
    sub: "Krokante bodem, tomatensaus met karakter en royaal belegd. Afhalen, bezorgen of gezellig bij ons aan tafel.",
    cta: "Bestel je pizza",
    offer: {
      kind: "menu", id: "menu", title: "Onze pizza's", intro: "Elke pizza wordt op bestelling gebakken.",
      categories: [
        { name: "Klassiekers", items: [["Margherita", "Tomaat, mozzarella, basilicum", "Vega"], ["Salami", "Tomaat, mozzarella, salami"], ["Funghi", "Tomaat, mozzarella, champignons", "Vega"], ["Quattro formaggi", "Vier kazen", "Vega"]] },
        { name: "Speciaal", items: [["Tonno", "Tonijn, ui, olijven"], ["Diavola", "Pittige salami, peper", "Pittig"], ["Prosciutto", "Ham, rucola, Parmezaan"], ["Vegetariana", "Gegrilde groenten", "Vega"]] },
        { name: "Pasta & meer", items: [["Lasagne", "Uit de oven"], ["Pasta bolognese", "Met Parmezaan"], ["Tiramisù", "Huisgemaakt"]] },
      ],
    },
    aboutTitle: "Met liefde gebakken",
    about: ["Goed deeg heeft tijd nodig. Daarna gaat het snel: beleggen, de oven in, en warm op tafel.", "Bestel om af te halen, laat bezorgen of kom bij ons eten."],
    highlights: ["Afhalen", "Bezorgen", "Vegetarische keuzes"],
    features: [["Vers deeg", "Elke dag gemaakt.", "flame"], ["Afhalen", "Bel of bestel online.", "bag"], ["Bezorgen", "Vraag naar het bezorggebied.", "bike"]],
    faq: [["Bezorgen jullie bij mij?", "Neem contact op voor het bezorggebied en de bezorgtijden."], ["Kan ik een pizza aanpassen?", "Ja, geef uw wensen door bij de bestelling."]],
    booking: { kind: "order", title: "Bestel online", body: "Geef uw bestelling door. We bellen u om de bestelling en het tijdstip te bevestigen." },
    order: { title: "Afhalen & bezorgen", body: "Trek in pizza? Zo bestelt u." },
    galleryTitle: "Vers uit de oven", ctaTitle: "Trek in pizza?", ctaBody: "Bestel nu voor afhalen of bezorgen.",
    sections: ["about", "offer", "order", "gallery", "booking", "hours", "faq", "cta", "contact"],
  },
  "coffee-shop": {
    eyebrow: "Koffie & lunch",
    headline: (n, c) => `Goede koffie${c ? ` in ${c}` : ""} begint bij ${n}`,
    sub: "Zorgvuldig gezette koffie, iets lekkers erbij en een plek om even te blijven. Kom binnen.",
    cta: "Bekijk de kaart",
    offer: {
      kind: "menu", id: "kaart", title: "Op de kaart", intro: "Koffie, thee en iets lekkers.",
      categories: [
        { name: "Koffie", items: [["Espresso", "Kort en krachtig"], ["Cappuccino", "Met gestoomde melk"], ["Flat white", "Dubbele shot, zijdezacht"], ["Filterkoffie", "Langzaam gezet"]] },
        { name: "Thee & koud", items: [["Verse muntthee", "Met honing"], ["Chai latte", "Kruidig en warm"], ["Iced latte", "Op ijs"]] },
        { name: "Zoet", items: [["Croissant", "Vers afgebakken"], ["Bananenbrood", "Per plak"], ["Taart van de dag", "Vraag wat er vandaag is"]] },
        { name: "Lunch", items: [["Tosti", "Uit de grill"], ["Broodje van de dag", "Wisselend belegd"], ["Yoghurt & granola", "Met fruit", "Vega"]] },
      ],
    },
    aboutTitle: "Een plek om te blijven",
    about: ["Koffie drinken is meer dan cafeïne. Het is even tijd nemen — alleen, met een boek of met vrienden.", "Kom langs voor uw eerste kop van de dag, een lunch of een stuk taart."],
    highlights: ["Plantaardige melk", "Lunch", "Om mee te nemen"],
    features: [["Vers gezet", "Elke kop met aandacht gemaakt.", "coffee"], ["Lunch", "Eenvoudig en goed.", "utensils"], ["To go", "Neem uw koffie mee.", "bag"]],
    faq: [["Hebben jullie plantaardige melk?", "Ja, vraag naar de mogelijkheden aan de bar."], ["Kan ik bij jullie werken?", "U bent welkom — vraag naar de wifi."]],
    galleryTitle: "Binnenkijken", ctaTitle: "Tot zo?", ctaBody: "Kom langs voor koffie, lunch of iets lekkers.",
    sections: ["about", "offer", "gallery", "features", "hours", "faq", "cta", "contact"],
  },
  bakery: {
    eyebrow: "Bakkerij & patisserie",
    headline: () => `Vers gebakken, *elke ochtend*`,
    sub: "Knapperig brood, boterzacht gebak en taarten voor elk moment. Kom langs of bestel uw taart vooruit.",
    cta: "Bestel een taart",
    note: "elke dag vers!",
    offer: {
      kind: "menu", id: "assortiment", title: "Ons assortiment", intro: "Een greep uit de vitrine.",
      categories: [
        { name: "Brood", items: [["Desembrood", "Lang gerezen, stevige korst"], ["Volkoren", "Voor elke dag"], ["Stokbrood", "Knapperig en luchtig"]] },
        { name: "Viennoiserie", items: [["Croissant", "Met roomboter"], ["Pain au chocolat", "Met pure chocolade"], ["Kaneelbroodje", "Zacht en zoet"]] },
        { name: "Gebak & taart", items: [["Fruittaart", "Met seizoensfruit"], ["Chocoladetaart", "Rijk en smeuïg"], ["Macarons", "In wisselende smaken"]] },
      ],
    },
    aboutTitle: "Ambacht dat je proeft",
    about: ["Lang voordat de stad wakker wordt, staat de oven al aan. Zo ligt er elke ochtend vers brood en gebak klaar.", "Een taart voor een bijzonder moment? Bestel hem vooruit, dan maken we hem speciaal voor u."],
    highlights: ["Dagelijks vers", "Taarten op bestelling", "Afhalen"],
    features: [["Dagvers", "Elke ochtend gebakken.", "sun"], ["Op bestelling", "Taarten voor elke gelegenheid.", "gift"], ["Afhalen", "Uw bestelling staat klaar.", "bag"]],
    faq: [["Hoe ver van tevoren moet ik een taart bestellen?", "Neem contact op, dan bespreken we wat mogelijk is."], ["Kan ik een taart laten personaliseren?", "Ja, geef uw wensen door bij de bestelling."]],
    booking: { kind: "order", title: "Bestel vooruit", body: "Geef uw bestelling door en haal hem op wanneer het u uitkomt." },
    galleryTitle: "Uit de vitrine", ctaTitle: "Iets te vieren?", ctaBody: "Bestel uw taart vooruit, dan staat hij voor u klaar.",
    sections: ["about", "offer", "gallery", "booking", "hours", "faq", "cta", "contact"],
  },
  "street-food": {
    eyebrow: "Street food",
    headline: () => "Straatvoedsel *met lef*",
    sub: "Grote smaken, snel klaar en gemaakt om met je handen te eten. Kom langs of bestel.",
    cta: "Bestel nu",
    note: "Hot & fresh",
    offer: {
      kind: "menu", id: "menu", title: "Menu", intro: "Kort menu, alles vers.",
      categories: [
        { name: "Hoofd", items: [["Loaded bowl", "Rijst, groenten, saus naar keuze"], ["Wrap", "Warm gevuld, opgerold"], ["Bao", "Gestoomd broodje, krokante vulling"], ["Taco's", "Per drie, met salsa"]] },
        { name: "Bij", items: [["Friet", "Met huisgemaakte saus", "Vega"], ["Slaw", "Fris en knapperig", "Vega"], ["Dips", "Mild tot heet"]] },
      ],
    },
    aboutTitle: "Eten van de straat",
    about: ["Geen tafellakens. Wel smaak, tempo en porties waar je blij van wordt.", "Sta je trek te hebben? Bestel vooruit en loop zo naar binnen."],
    highlights: ["Snel klaar", "Afhalen", "Catering"],
    features: [["Snel", "Vers en vlot.", "bolt"], ["Afhalen", "Bestel vooruit.", "bag"], ["Events", "Boek ons voor je feest.", "calendar"]],
    faq: [["Doen jullie ook catering?", "Ja, neem contact op om de mogelijkheden te bespreken."], ["Zijn er vegetarische opties?", "Ja, vraag ernaar bij het bestellen."]],
    booking: { kind: "order", title: "Bestel vooruit", body: "Geef je bestelling door en sla de rij over." },
    order: { title: "Zo bestel je", body: "Afhalen, bezorgen of gewoon langskomen." },
    galleryTitle: "Van de plaat", ctaTitle: "Trek?", ctaBody: "Bestel nu en haal het warm op.",
    sections: ["offer", "about", "order", "gallery", "booking", "hours", "cta", "contact"],
  },
  "fine-dining": {
    eyebrow: "Fine dining",
    headline: () => "Een avond in *gangen*",
    sub: "Een avond die zich gang voor gang ontvouwt. Reserveer uw tafel en laat u verrassen.",
    cta: "Reserveer",
    offer: {
      kind: "menu", id: "menu", title: "Het menu", intro: "Een proeverij die verandert met het seizoen.",
      categories: [
        { name: "Eerste gang", items: [["Amuse", "Een eerste kennismaking"], ["Koud voorgerecht", "Fris, licht, seizoensgebonden"]] },
        { name: "Tweede gang", items: [["Uit de zee", "Vis of schaaldier van het moment"]] },
        { name: "Hoofdgang", items: [["Van het land", "Met jus en groenten van het seizoen"]] },
        { name: "Tot slot", items: [["Kaas", "Een kleine selectie"], ["Dessert", "Zoet, zuur en iets krokants"]] },
      ],
    },
    aboutTitle: "De filosofie",
    about: ["Een gerecht begint bij het product. De keuken doet alleen wat nodig is om het beter te maken.", "Reserveer een tafel en neem de tijd — de avond is van u."],
    highlights: ["Meergangenmenu", "Wijnarrangement", "Besloten diner"],
    features: [["Seizoen", "Het menu volgt de natuur.", "leaf"], ["Wijn", "Een arrangement bij elke gang.", "wine"], ["Besloten", "Voor een bijzonder gezelschap.", "key"]],
    faq: [["Hoe lang duurt een avond?", "Neem ruim de tijd. Bij uw reservering vertellen we u meer."], ["Kan het menu worden aangepast?", "Geef dieetwensen en allergieën door bij uw reservering."]],
    booking: { kind: "reservation", title: "Reserveren", body: "Laat ons weten wanneer u wilt komen. Wij bevestigen uw reservering persoonlijk." },
    galleryTitle: "Impressie", ctaTitle: "Wij ontvangen u graag", ctaBody: "Reserveer uw tafel.",
    sections: ["about", "offer", "gallery", "booking", "hours", "cta", "contact"],
  },
  "asian-fusion": {
    eyebrow: "Asian fusion",
    headline: () => `Waar smaken *elkaar ontmoeten*`,
    sub: "Gerechten om te delen, geïnspireerd op keukens uit heel Azië. Reserveer een tafel of bestel voor thuis.",
    cta: "Reserveer een tafel",
    offer: {
      kind: "menu", id: "menu", title: "Menu", intro: "Bestel een paar gerechten en deel ze met de tafel.",
      categories: [
        { name: "Small plates", items: [["Gyoza", "Gebakken dumplings"], ["Bao bun", "Gestoomd broodje, hartige vulling"], ["Edamame", "Met chili en zeezout", "Vega"], ["Spring rolls", "Krokant, met dip", "Vega"]] },
        { name: "Bowls & wok", items: [["Ramen", "Bouillon, noedels, toppings"], ["Poké bowl", "Rijst, vis, groenten"], ["Wok", "Groenten, noedels of rijst"]] },
        { name: "Zoet", items: [["Mochi", "In wisselende smaken"], ["Matcha dessert", "Zoet en licht bitter"]] },
      ],
    },
    aboutTitle: "Eén tafel, veel smaken",
    about: ["Zoet, zout, zuur, pittig, umami — het mooiste is als ze allemaal op tafel staan.", "Schuif aan, bestel een ronde gerechten en begin gewoon ergens."],
    highlights: ["Shared dining", "Cocktails", "Afhalen"],
    features: [["Delen", "Kleine gerechten voor de hele tafel.", "heart"], ["Cocktails", "Bijpassend bij de kaart.", "wine"], ["Afhalen", "Ook voor thuis.", "bag"]],
    faq: [["Hoeveel gerechten bestel je per persoon?", "Reken op een paar gerechten per persoon; we adviseren u graag."], ["Zijn er vegetarische en vegan gerechten?", "Ja, vraag ernaar of bekijk de kaart."]],
    booking: { kind: "reservation", title: "Reserveer een tafel", body: "Kies uw moment. Voor grote groepen kunt u het beste bellen." },
    order: { title: "Afhalen & bezorgen", body: "Dezelfde smaken, bij u thuis." },
    galleryTitle: "Op tafel", ctaTitle: "Kom proeven", ctaBody: "Reserveer een tafel of bestel voor thuis.",
    sections: ["about", "offer", "gallery", "order", "booking", "hours", "cta", "contact"],
  },
  "food-truck": {
    eyebrow: "Foodtruck",
    headline: () => "Wij komen naar je toe",
    sub: "Vers streetfood vanuit de truck — op markten, festivals en jouw eigen feest. Check waar we staan of boek ons.",
    cta: "Boek de truck",
    note: "Boek ons!",
    offer: {
      kind: "menu", id: "menu", title: "Vanaf de truck", intro: "Klein menu, alles vers.",
      categories: [
        { name: "Eten", items: [["De klassieker", "Onze bestseller, vers van de plaat"], ["De vega", "Volledig vegetarisch", "Vega"], ["De pittige", "Met extra pit", "Pittig"]] },
        { name: "Erbij", items: [["Friet", "Krokant gebakken", "Vega"], ["Frisdrank", "IJskoud"], ["Dessert", "Iets zoets toe"]] },
      ],
    },
    aboutTitle: "Wij rijden, jij eet",
    about: ["Onze keuken staat op wielen. We staan op markten en evenementen en komen ook naar bedrijfsfeesten, bruiloften en verjaardagen.", "Vertel ons waar en wanneer, dan regelen wij het eten."],
    highlights: ["Evenementen", "Bedrijfscatering", "Privéfeesten"],
    features: [["Evenementen", "Festivals, markten en braderieën.", "calendar"], ["Zakelijk", "Lunch of borrel op locatie.", "truck"], ["Privé", "Bruiloften en verjaardagen.", "gift"]],
    faq: [["Hoeveel ruimte heeft de truck nodig?", "Neem contact op, dan bespreken we de locatie."], ["Voor hoeveel personen kunnen jullie koken?", "Vertel ons uw groepsgrootte, dan maken we een voorstel."]],
    booking: { kind: "quote", title: "Boek de truck", body: "Vertel ons over uw evenement. U ontvangt een voorstel op maat." },
    galleryTitle: "Onderweg", ctaTitle: "Feestje? Wij komen.", ctaBody: "Vraag vrijblijvend een voorstel aan voor uw evenement.",
    sections: ["about", "offer", "features", "gallery", "booking", "hours", "faq", "contact"],
  },
  barbershop: {
    eyebrow: "Barbershop",
    headline: () => "Scherp geknipt, *strak geschoren*",
    sub: "Knippen, scheren en baardverzorging door vakmensen. Boek je afspraak online en loop strak de deur uit.",
    cta: "Boek een afspraak",
    offer: {
      kind: "services", id: "behandelingen", title: "Behandelingen", intro: "Kies je behandeling en boek direct.",
      items: [["Knippen", "Wassen, knippen en stylen", "scissors"], ["Knippen & baard", "Complete behandeling", "scissors"], ["Baard trimmen", "In model, met contouren", "brush"], ["Hot towel shave", "Klassiek scheren met warm kompres", "drop"], ["Kinderen", "Voor de jongste klanten", "user"], ["Contouren", "Snel bijwerken tussendoor", "spark"]],
    },
    aboutTitle: "Vakmanschap in de stoel",
    about: ["Een goede barbier luistert eerst en knipt dan. Je krijgt een eerlijk advies en een kapsel dat bij je past.", "Boek online of loop binnen — de koffie staat klaar."],
    highlights: ["Online boeken", "Baardverzorging", "Kinderen welkom"],
    features: [["Op afspraak", "Geen wachttijd.", "calendar"], ["Vakmanschap", "Oog voor detail.", "scissors"], ["Advies", "Voor haar en baard.", "chat"]],
    faq: [["Moet ik een afspraak maken?", "Online boeken is het makkelijkst. Vraag naar de mogelijkheden voor inloop."], ["Kan ik mijn afspraak verzetten?", "Ja, neem tijdig contact met ons op."]],
    booking: { kind: "appointment", title: "Boek je afspraak", body: "Kies een behandeling, datum en tijd. We bevestigen je afspraak zo snel mogelijk." },
    team: { title: "De barbiers", intro: "Hier stelt u uw team voor, met foto en specialiteit.", roles: ["Barbier", "Barbier", "Barbier"] },
    galleryTitle: "Ons werk", ctaTitle: "Tijd voor een frisse cut?", ctaBody: "Boek je afspraak in een paar klikken.",
    sections: ["offer", "about", "team", "gallery", "booking", "hours", "faq", "cta", "contact"],
  },
  "hair-salon": {
    eyebrow: "Kapsalon",
    headline: () => "Haar dat *bij u past*",
    sub: "Knippen, kleuren en stylen met persoonlijk advies. Maak een afspraak en neem een moment voor uzelf.",
    cta: "Maak een afspraak",
    offer: {
      kind: "services", id: "behandelingen", title: "Behandelingen", intro: "Elke behandeling begint met een gesprek over uw wensen.",
      items: [["Knippen & föhnen", "Wassen, knippen en in model föhnen", "scissors"], ["Kleuren", "Uitgroei of een volledige kleuring", "brush"], ["Highlights & balayage", "Natuurlijke lichte accenten", "sun"], ["Styling", "Voor een bijzondere gelegenheid", "spark"], ["Haarverzorging", "Voedende behandeling", "drop"], ["Bruidskapsel", "Inclusief proefkapsel", "heart"]],
    },
    aboutTitle: "Tijd en aandacht",
    about: ["Mooi haar begint met goed luisteren. We nemen de tijd om te begrijpen wat u wilt en geven eerlijk advies.", "U verlaat de salon met een kapsel waar u thuis ook mee uit de voeten kunt."],
    highlights: ["Persoonlijk advies", "Kleurspecialist", "Online afspraak"],
    features: [["Advies", "Eerst kijken, dan knippen.", "chat"], ["Kleur", "Op maat gemengd.", "brush"], ["Rust", "Een moment voor uzelf.", "leaf"]],
    faq: [["Hoe maak ik een afspraak?", "Via het formulier op deze pagina of telefonisch."], ["Krijg ik advies over kleur?", "Ja, elke kleurbehandeling begint met een adviesgesprek."]],
    booking: { kind: "appointment", title: "Maak een afspraak", body: "Kies uw behandeling en gewenste moment. Wij nemen contact op om de afspraak te bevestigen." },
    team: { title: "Het team", intro: "Hier stelt u uw stylisten voor, met foto en specialisme.", roles: ["Stylist", "Kleurspecialist", "Stylist"] },
    galleryTitle: "Lookbook", ctaTitle: "Toe aan iets nieuws?", ctaBody: "Maak vandaag nog een afspraak.",
    sections: ["about", "offer", "gallery", "team", "booking", "hours", "cta", "contact"],
  },
  "beauty-salon": {
    eyebrow: "Schoonheidssalon",
    headline: () => `Even helemaal *tot rust*`,
    sub: "Gezichtsbehandelingen, nagels, wimpers en meer. Boek uw behandeling en gun uzelf een moment van verzorging.",
    cta: "Boek een behandeling",
    note: "tijd voor jezelf",
    offer: {
      kind: "services", id: "behandelingen", title: "Behandelingen", intro: "Een behandeling afgestemd op uw huid en wensen.",
      items: [["Gezichtsbehandeling", "Reinigen, verzorgen en ontspannen", "spark"], ["Manicure & pedicure", "Verzorgde handen en voeten", "heart"], ["Wimpers & wenkbrauwen", "Vormen, verven en liften", "star"], ["Harsen", "Glad en zorgvuldig", "drop"], ["Massage", "Ontspanning voor lichaam en geest", "leaf"], ["Make-up", "Voor dag, avond of bruiloft", "brush"]],
    },
    aboutTitle: "Verzorging met aandacht",
    about: ["In de salon draait het even alleen om u. In een rustige omgeving nemen we de tijd voor uw behandeling.", "Twijfelt u welke behandeling bij u past? We adviseren u graag."],
    highlights: ["Persoonlijk advies", "Rustige sfeer", "Cadeaubon"],
    features: [["Op maat", "Afgestemd op uw huid.", "spark"], ["Ontspanning", "Een moment van rust.", "leaf"], ["Cadeau", "Vraag naar een cadeaubon.", "gift"]],
    faq: [["Welke behandeling past bij mijn huid?", "Tijdens een intake bespreken we uw wensen en geven we advies."], ["Kan ik een cadeaubon kopen?", "Ja, neem contact op voor de mogelijkheden."]],
    booking: { kind: "appointment", title: "Boek uw behandeling", body: "Kies een behandeling en het moment dat u past. Wij bevestigen uw afspraak." },
    galleryTitle: "De salon", ctaTitle: "U verdient het", ctaBody: "Boek vandaag nog uw behandeling.",
    sections: ["about", "offer", "gallery", "booking", "hours", "faq", "cta", "contact"],
  },
  "car-detailing": {
    eyebrow: "Car detailing",
    headline: () => "*Showroomglans* voor uw auto",
    sub: "Van grondige reiniging tot lakcorrectie en coating. Kies een pakket of vraag een offerte aan voor uw auto.",
    cta: "Vraag een offerte aan",
    offer: {
      kind: "services", id: "diensten", title: "Wat we doen", intro: "Elke behandeling wordt afgestemd op de staat van uw auto.",
      items: [["Exterieur", "Handwas, decontaminatie en bescherming", "drop"], ["Interieur", "Dieptereiniging van bekleding en dashboard", "spark"], ["Polijsten", "Krassen en swirls verwijderen", "star"], ["Keramische coating", "Langdurige glans en bescherming", "shield"], ["Velgen & banden", "Reinigen en verzegelen", "car"], ["Verkoopklaar", "Uw auto op zijn best voor de verkoop", "key"]],
    },
    packages: {
      title: "Pakketten", intro: "Drie niveaus van verzorging. De prijs hangt af van het type en de staat van uw auto.",
      items: [["Basis", "Voor een frisse, schone auto.", ["Handwas exterieur", "Velgen reinigen", "Interieur stofzuigen", "Ramen binnen en buiten"]], ["Compleet", "Binnen en buiten grondig aangepakt.", ["Alles uit Basis", "Lak decontamineren", "Dieptereiniging interieur", "Beschermende waxlaag"]], ["Premium", "De volledige behandeling.", ["Alles uit Compleet", "Lakcorrectie", "Keramische coating", "Leer- en kunststofverzorging"]]],
    },
    beforeafter: { title: "Voor & na", intro: "Schuif om het verschil te zien." },
    aboutTitle: "Oog voor elk detail",
    about: ["Detailing is meer dan wassen. Het is uren werk aan lak, velgen en interieur tot alles klopt.", "Vertel ons over uw auto en uw wensen, dan adviseren we het pakket dat erbij past."],
    highlights: ["Op afspraak", "Advies op maat", "Zorgvuldige producten"],
    features: [["Zorgvuldig", "Veilig voor lak en interieur.", "shield"], ["Op maat", "Afgestemd op uw auto.", "car"], ["Op afspraak", "Plan een moment dat u past.", "calendar"]],
    faq: [["Hoe lang duurt een behandeling?", "Dat hangt af van het pakket en de staat van de auto. We geven vooraf een inschatting."], ["Wat kost detailing?", "Na het zien van uw auto ontvangt u een offerte op maat."]],
    booking: { kind: "quote", title: "Vraag een offerte aan", body: "Vertel ons welk pakket u interesseert en om welke auto het gaat. U ontvangt een voorstel op maat." },
    galleryTitle: "Resultaten", ctaTitle: "Klaar voor showroomglans?", ctaBody: "Vraag vrijblijvend een offerte aan.",
    sections: ["offer", "packages", "beforeafter", "about", "gallery", "booking", "faq", "cta", "contact"],
  },
  garage: {
    eyebrow: "Autogarage",
    headline: () => "Uw auto in *goede handen*",
    sub: "Onderhoud, reparatie en APK. Duidelijk advies vooraf en een afspraak op een moment dat u past.",
    cta: "Plan een afspraak",
    offer: {
      kind: "services", id: "diensten", title: "Onze diensten", intro: "Voor alle merken en bouwjaren.",
      items: [["Onderhoud", "Kleine en grote beurt volgens fabrieksvoorschrift", "tool"], ["APK", "Keuring en eventueel herstel", "check"], ["Reparatie", "Diagnose en herstel van storingen", "bolt"], ["Banden", "Wisselen, uitlijnen en opslag", "car"], ["Airco", "Controle en bijvullen", "drop"], ["Remmen", "Controle en vervanging", "shield"]],
    },
    process: { title: "Zo werkt het", steps: [["Afspraak", "Plan online of bel ons."], ["Diagnose", "We kijken uw auto na en bellen bij bijzonderheden."], ["Akkoord", "U hoort vooraf wat er nodig is."], ["Klaar", "U haalt uw auto op en rijdt weer veilig weg."]] },
    aboutTitle: "Eerlijk advies, vakkundig werk",
    about: ["U wilt weten waar u aan toe bent. Daarom leggen we vooraf uit wat er nodig is en overleggen we voordat we extra werk uitvoeren.", "Bel of plan online een afspraak in."],
    highlights: ["Alle merken", "Duidelijke afspraken", "Vervangend vervoer op aanvraag"],
    features: [["Duidelijk", "Vooraf weten wat er gebeurt.", "chat"], ["Alle merken", "Voor elke auto.", "car"], ["Op afspraak", "Plan wanneer het u past.", "calendar"]],
    faq: [["Kan ik wachten tijdens het onderhoud?", "Vraag bij het maken van de afspraak naar de mogelijkheden."], ["Krijg ik vooraf een prijsopgave?", "Ja, we overleggen altijd voordat we werkzaamheden uitvoeren."]],
    booking: { kind: "appointment", title: "Plan een afspraak", body: "Kies de dienst en een moment dat u past. We nemen contact op om de afspraak te bevestigen." },
    galleryTitle: "De werkplaats", ctaTitle: "Tijd voor onderhoud of APK?", ctaBody: "Plan vandaag nog uw afspraak.",
    sections: ["offer", "about", "process", "gallery", "booking", "hours", "faq", "cta", "contact"],
  },
  construction: {
    eyebrow: "Bouw & renovatie",
    headline: () => "Van plan tot *oplevering*",
    sub: "Nieuwbouw, verbouw en renovatie. Bespreek uw project en vraag vrijblijvend een offerte aan.",
    cta: "Vraag een offerte aan",
    offer: {
      kind: "services", id: "diensten", title: "Wat we bouwen", intro: "Eén aanspreekpunt voor uw hele project.",
      items: [["Nieuwbouw", "Woningen en bedrijfspanden", "home"], ["Verbouw & aanbouw", "Meer ruimte in en om het huis", "ruler"], ["Renovatie", "Bestaande panden klaar voor de toekomst", "tool"], ["Dakwerk", "Vernieuwen, isoleren en herstellen", "shield"], ["Badkamer & keuken", "Compleet geplaatst en afgewerkt", "drop"], ["Onderhoud", "Planmatig onderhoud voor uw pand", "check"]],
    },
    process: { title: "Onze werkwijze", steps: [["Kennismaking", "We bespreken uw wensen op locatie."], ["Offerte", "U ontvangt een heldere prijsopgave."], ["Uitvoering", "Eén vast aanspreekpunt tijdens de bouw."], ["Oplevering", "We lopen samen alles na."]] },
    aboutTitle: "Afspraak is afspraak",
    about: ["Een bouwproject is een grote stap. U wilt weten wat het kost, hoe lang het duurt en wie u kunt bellen.", "Daarom werken we met heldere afspraken en één vast aanspreekpunt van begin tot eind."],
    highlights: ["Eén aanspreekpunt", "Heldere offerte", "Actief in de regio"],
    features: [["Helder", "Vooraf duidelijkheid over kosten en planning.", "check"], ["Vakwerk", "Aandacht voor afwerking.", "tool"], ["Regionaal", "Dichtbij en betrokken.", "map"]],
    faq: [["Hoe vraag ik een offerte aan?", "Vul het formulier in of bel ons. We plannen een kennismaking op locatie."], ["Werken jullie ook voor bedrijven?", "Ja, neem contact op om uw project te bespreken."]],
    booking: { kind: "quote", title: "Vraag een offerte aan", body: "Vertel ons kort over uw project. We nemen contact op voor een vrijblijvende kennismaking." },
    galleryTitle: "Projecten", ctaTitle: "Plannen om te bouwen?", ctaBody: "Vraag vrijblijvend een offerte aan.",
    sections: ["about", "offer", "gallery", "process", "booking", "faq", "cta", "contact"],
  },
  cleaning: {
    eyebrow: "Schoonmaakbedrijf",
    headline: () => `Altijd een *schone* ruimte`,
    sub: "Schoonmaak voor kantoren, woningen en opleveringen. Vraag in een minuut een vrijblijvende offerte aan.",
    cta: "Gratis offerte aanvragen",
    offer: {
      kind: "services", id: "diensten", title: "Onze diensten", intro: "Regelmatig of eenmalig — wij regelen het.",
      items: [["Kantoorschoonmaak", "Dagelijks of wekelijks een frisse werkplek", "home"], ["Huishoudelijke hulp", "Vaste hulp bij u thuis", "heart"], ["Opleveringsschoonmaak", "Na verbouwing of verhuizing", "spark"], ["Glasbewassing", "Binnen en buiten streeploos", "drop"], ["Vloeronderhoud", "Reinigen en beschermen", "shield"], ["Eenmalige schoonmaak", "Grote beurt wanneer het nodig is", "check"]],
    },
    process: { title: "Zo werkt het", steps: [["Aanvraag", "Vertel wat u nodig heeft."], ["Voorstel", "U ontvangt een offerte op maat."], ["Planning", "We spreken vaste dagen en tijden af."], ["Schoon", "U merkt het verschil."]] },
    aboutTitle: "Betrouwbaar en grondig",
    about: ["Een schone ruimte werkt en woont prettiger. Wij zorgen ervoor dat u er geen omkijken naar heeft.", "U krijgt vaste afspraken, een vast aanspreekpunt en schoonmaak die past bij uw ruimte."],
    highlights: ["Vaste afspraken", "Offerte op maat", "Zakelijk & particulier"],
    features: [["Betrouwbaar", "We komen op de afgesproken tijden.", "clock"], ["Grondig", "Volgens een vast schoonmaakplan.", "check"], ["Flexibel", "Eenmalig of periodiek.", "calendar"]],
    faq: [["Wat kost schoonmaak?", "Dat hangt af van de ruimte en de frequentie. U ontvangt een offerte op maat."], ["Nemen jullie eigen materialen mee?", "Dat bespreken we bij de offerte."], ["Kan ik ook eenmalig laten schoonmaken?", "Ja, neem contact op voor de mogelijkheden."]],
    booking: { kind: "quote", title: "Vraag uw offerte aan", body: "Vertel ons om welke ruimte het gaat. U ontvangt een vrijblijvend voorstel." },
    galleryTitle: "Ons werk", ctaTitle: "Klaar voor een schone start?", ctaBody: "Vraag vandaag nog een vrijblijvende offerte aan.",
    sections: ["offer", "about", "process", "booking", "faq", "cta", "contact"],
  },
  landscaping: {
    eyebrow: "Hoveniersbedrijf",
    headline: () => `Een tuin om *in te leven*`,
    sub: "Tuinontwerp, aanleg en onderhoud. Van eerste schets tot een tuin die elk seizoen mooier wordt.",
    cta: "Vraag een offerte aan",
    offer: {
      kind: "services", id: "diensten", title: "Wat we doen", intro: "Alles voor uw tuin onder één dak.",
      items: [["Tuinontwerp", "Een plan dat past bij uw huis en wensen", "ruler"], ["Tuinaanleg", "Bestrating, beplanting en gazon", "sprout"], ["Tuinonderhoud", "Het hele jaar een verzorgde tuin", "leaf"], ["Bestrating", "Terrassen, paden en opritten", "home"], ["Schuttingen & vlonders", "Hout dat lang mooi blijft", "tool"], ["Verlichting & water", "Sfeer in de avond", "sun"]],
    },
    process: { title: "Van idee tot tuin", steps: [["Kennismaking", "We bekijken de tuin en uw wensen."], ["Ontwerp", "U ontvangt een plan en offerte."], ["Aanleg", "We leggen de tuin vakkundig aan."], ["Onderhoud", "Zo blijft uw tuin mooi."]] },
    aboutTitle: "Groen vakmanschap",
    about: ["Een goede tuin voelt als een extra kamer. Een plek om te zitten, te spelen en tot rust te komen.", "We denken mee over ontwerp, materialen en beplanting — en zorgen dat het resultaat klopt."],
    highlights: ["Ontwerp & aanleg", "Onderhoud", "Actief in de regio"],
    features: [["Persoonlijk", "Een ontwerp dat bij u past.", "heart"], ["Duurzaam", "Beplanting die het goed doet.", "sprout"], ["Compleet", "Van ontwerp tot onderhoud.", "check"]],
    faq: [["Wat kost een nieuwe tuin?", "Na een kennismaking op locatie ontvangt u een offerte op maat."], ["Doen jullie ook alleen onderhoud?", "Ja, eenmalig of op vaste momenten in het jaar."]],
    booking: { kind: "quote", title: "Vraag een offerte aan", body: "Vertel ons over uw tuin. We komen graag langs voor een vrijblijvende kennismaking." },
    galleryTitle: "Onze tuinen", ctaTitle: "Zin in een nieuwe tuin?", ctaBody: "Plan een vrijblijvende kennismaking op locatie.",
    sections: ["about", "offer", "gallery", "process", "booking", "faq", "cta", "contact"],
  },
  clinic: {
    eyebrow: "Praktijk",
    headline: (n) => `Zorg met aandacht bij ${n}`,
    sub: "Persoonlijke zorg in een rustige omgeving. Maak eenvoudig een afspraak of neem contact op met uw vraag.",
    cta: "Maak een afspraak",
    offer: { kind: "services", id: "behandelingen", title: "Behandelingen", intro: "Een overzicht van onze zorg.", items: [["Controle", "Periodieke controle en advies", "check"], ["Preventie", "Reiniging en voorlichting", "drop"], ["Behandelingen", "Neem contact op voor de mogelijkheden", "tooth"]] },
    aboutTitle: "Over de praktijk",
    about: ["Wij nemen de tijd voor uw vragen. Op deze website vindt u praktische informatie over afspraken, openingstijden en bereikbaarheid."],
    highlights: ["Rustige omgeving", "Duidelijke uitleg", "Goed bereikbaar"],
    features: [["Rustig", "Een prettige sfeer in de praktijk.", "leaf"], ["Duidelijk", "We leggen uit wat we doen.", "chat"], ["Bereikbaar", "Makkelijk te vinden.", "map"]],
    faq: [["Neemt de praktijk nieuwe patiënten aan?", "Neem contact op met de praktijk voor de actuele mogelijkheden."], ["Wat neem ik mee naar mijn eerste afspraak?", "Neem een geldig identiteitsbewijs en uw zorgpas mee."]],
    booking: { kind: "appointment", title: "Maak een afspraak", body: "Laat uw gegevens achter, dan nemen we contact met u op." },
    galleryTitle: "De praktijk", ctaTitle: "Een afspraak maken?", ctaBody: "Neem vandaag nog contact op.",
    sections: ["about", "offer", "features", "booking", "hours", "faq", "contact"],
  },
  estate: {
    eyebrow: "Makelaardij",
    headline: (n) => `Thuis in de markt met ${n}`,
    sub: "Verkopen, kopen of verhuren? Persoonlijke begeleiding van eerste gesprek tot sleuteloverdracht.",
    cta: "Plan een kennismaking",
    offer: { kind: "services", id: "diensten", title: "Onze diensten", intro: "Begeleiding bij elke stap.", items: [["Verkoop", "Begeleiding bij de verkoop van uw woning", "home"], ["Aankoop", "Hulp bij het vinden en aankopen van een woning", "key"], ["Taxatie", "Neem contact op voor de mogelijkheden", "chart"], ["Verhuur", "Van huurder zoeken tot contract", "user"]] },
    aboutTitle: "Over ons kantoor",
    about: ["Een woning kopen of verkopen is een grote stap. Wij begeleiden u persoonlijk en houden u bij elke stap op de hoogte."],
    highlights: ["Persoonlijk", "Kennis van de regio", "Helder proces"],
    features: [["Persoonlijk", "Eén vast aanspreekpunt.", "user"], ["Regiokennis", "Wij kennen de omgeving.", "map"], ["Helder", "U weet waar u aan toe bent.", "check"]],
    faq: [["Hoe begint het verkooptraject?", "Met een vrijblijvend kennismakingsgesprek waarin we uw wensen bespreken."]],
    booking: { kind: "quote", title: "Plan een kennismaking", body: "Laat uw gegevens achter. We nemen contact op voor een vrijblijvend gesprek." },
    galleryTitle: "Impressie", ctaTitle: "Benieuwd naar de mogelijkheden?", ctaBody: "Plan een vrijblijvende kennismaking.",
    sections: ["about", "offer", "features", "booking", "hours", "faq", "cta", "contact"],
  },
  studio: {
    eyebrow: "Welkom",
    headline: (n) => `Werk aan uw doelen met ${n}`,
    sub: "Ontdek het aanbod, bekijk de openingstijden en kom langs voor een kennismaking.",
    cta: "Plan een kennismaking",
    offer: { kind: "services", id: "aanbod", title: "Ons aanbod", intro: "Voor elk niveau.", items: [["Begeleiding", "Persoonlijke begeleiding bij uw doelen", "user"], ["Groepen", "Samen werken in groepsverband", "heart"], ["Advies", "Een plan dat bij u past", "chart"]] },
    aboutTitle: "Over ons",
    about: ["Iedereen is welkom, op elk niveau. Kom langs voor een kennismaking en ontdek wat bij u past."],
    highlights: ["Voor elk niveau", "Begeleiding", "Ruime openingstijden"],
    features: [["Toegankelijk", "Voor beginners en gevorderden.", "user"], ["Begeleid", "Hulp wanneer u dat wilt.", "chat"], ["Flexibel", "Kom wanneer het u uitkomt.", "clock"]],
    faq: [["Kan ik eerst kennismaken?", "Neem contact op voor de mogelijkheden van een kennismaking."]],
    booking: { kind: "appointment", title: "Plan een kennismaking", body: "Laat uw gegevens achter en we nemen contact met u op." },
    galleryTitle: "Impressie", ctaTitle: "Klaar om te beginnen?", ctaBody: "Plan een kennismaking.",
    sections: ["about", "offer", "features", "booking", "hours", "faq", "cta", "contact"],
  },
  "local-service": {
    eyebrow: "Vakwerk bij u in de buurt",
    headline: (n) => `${n}: snel en vakkundig geholpen`,
    sub: "Voor reparatie, installatie en onderhoud. Neem contact op en we bespreken wanneer we langs kunnen komen.",
    cta: "Vraag een offerte aan",
    offer: { kind: "services", id: "diensten", title: "Onze diensten", intro: "Waarmee we u kunnen helpen.", items: [["Reparatie", "Storingen en gebreken vakkundig verholpen", "tool"], ["Installatie", "Plaatsing en aansluiting", "bolt"], ["Onderhoud", "Periodieke controle en onderhoud", "shield"]] },
    aboutTitle: "Over ons",
    about: ["Wij helpen particulieren en bedrijven in de regio. Neem contact op en we bespreken wat u nodig heeft."],
    highlights: ["Bereikbaar", "Duidelijke afspraken", "Actief in de regio"],
    features: [["Bereikbaar", "Neem eenvoudig contact op.", "phone"], ["Duidelijk", "Vooraf afspraken over de werkzaamheden.", "check"], ["Lokaal", "Actief in de regio.", "map"]],
    faq: [["Hoe snel kunnen jullie komen?", "Neem contact op, dan bespreken we wanneer we langs kunnen komen."]],
    booking: { kind: "quote", title: "Vraag een offerte aan", body: "Omschrijf kort wat er moet gebeuren. We nemen contact met u op." },
    galleryTitle: "Ons werk", ctaTitle: "Hulp nodig?", ctaBody: "Neem vandaag nog contact op.",
    sections: ["offer", "about", "features", "booking", "hours", "faq", "cta", "contact"],
  },
};

export type BlueprintBusiness = {
  name: string;
  category: string;
  city: string | null;
  phone: string | null;
  address: string | null;
  openingHours: string[] | null;
  googleMapsUrl: string | null;
  country?: string | null;
  postalCode?: string | null;
};

/** Deterministic, fact-safe SiteSpec for a design: used in mock mode and as the base Claude personalises. */
export function buildBlueprintSpec(b: BlueprintBusiness, designKey: string, variation?: number): SiteSpec {
  const design = getDesign(designKey);
  const bp = BLUEPRINTS[design.key] ?? BLUEPRINTS["local-service"];
  const city = b.city ?? "";
  const telHref = b.phone ? `tel:${b.phone.replace(/[^\d+]/g, "")}` : null;
  const bookingId = bp.booking ? { reservation: "reserveren", appointment: "afspraak", quote: "offerte", order: "bestellen" }[bp.booking.kind] : "contact";
  const serviceTitles = bp.offer.kind === "services" ? bp.offer.items.map((i) => i[0]) : [];

  const make: Record<SectionKey, () => SiteSection | null> = {
    about: () => ({ type: "about", id: "over-ons", title: bp.aboutTitle, paragraphs: bp.about, image: "art:about", highlights: bp.highlights }),
    offer: () =>
      bp.offer.kind === "menu"
        ? {
            type: "menu", id: bp.offer.id, title: bp.offer.title, intro: bp.offer.intro,
            categories: bp.offer.categories.map((c) => ({ name: c.name, items: c.items.map(([name, description, ...tags]) => ({ name, description, price: null, tags })) })),
            note: MENU_NOTE,
          }
        : { type: "services", id: bp.offer.id, title: bp.offer.title, intro: bp.offer.intro, items: bp.offer.items.map(([title, description, icon]) => ({ title, description, icon, price: null, duration: null })) },
    features: () => ({ type: "features", id: "waarom", title: "Waarom bij ons", intro: "", items: bp.features.map(([title, description, icon]) => ({ title, description, icon })) }),
    gallery: () => ({ type: "gallery", id: "impressie", title: bp.galleryTitle, images: ["art:g1", "art:g2", "art:g3", "art:g4", "art:g5", "art:g6"] }),
    hours: () => ({ type: "hours", id: "openingstijden", title: "Openingstijden & locatie", note: "" }),
    faq: () => ({ type: "faq", id: "vragen", title: "Veelgestelde vragen", items: bp.faq.map(([q, a]) => ({ q, a })) }),
    cta: () => ({ type: "cta", id: "actie", title: bp.ctaTitle, body: bp.ctaBody, cta: { label: bp.cta, href: `#${bookingId}` } }),
    contact: () => ({ type: "contact", id: "contact", title: "Neem contact op", body: "Stel uw vraag — we horen graag van u.", showForm: !bp.booking, showMap: Boolean(b.googleMapsUrl) }),
    packages: () =>
      bp.packages
        ? { type: "packages", id: "pakketten", title: bp.packages.title, intro: bp.packages.intro, items: bp.packages.items.map(([name, description, features], i) => ({ name, price: null, unit: "", description, features, featured: i === 1 })), note: SERVICE_NOTE }
        : null,
    team: () => (bp.team ? { type: "team", id: "team", title: bp.team.title, intro: bp.team.intro, members: bp.team.roles.map((role, i) => ({ name: `Teamlid ${i + 1}`, role, bio: "", image: `art:team${i}` })) } : null),
    booking: () => (bp.booking ? { type: "booking", id: bookingId, title: bp.booking.title, body: bp.booking.body, kind: bp.booking.kind, options: serviceTitles.slice(0, 10) } : null),
    beforeafter: () => (bp.beforeafter ? { type: "beforeafter", id: "voor-en-na", title: bp.beforeafter.title, intro: bp.beforeafter.intro, pairs: [{ before: "art:ba1", after: "art:ba1", caption: "" }, { before: "art:ba2", after: "art:ba2", caption: "" }] } : null),
    order: () =>
      bp.order
        ? {
            type: "order", id: "afhalen", title: bp.order.title, body: bp.order.body,
            channels: [
              ...(telHref ? [{ label: "Bel om te bestellen", description: "Geef uw bestelling telefonisch door.", href: telHref, icon: "phone" as Icon }] : []),
              { label: "Online bestellen", description: "Vul het bestelformulier in.", href: `#${bookingId}`, icon: "bag" as Icon },
              ...(b.googleMapsUrl ? [{ label: "Afhalen op locatie", description: b.address ?? "Bekijk de route.", href: b.googleMapsUrl, icon: "map" as Icon }] : []),
            ],
          }
        : null,
    process: () => (bp.process ? { type: "process", id: "werkwijze", title: bp.process.title, intro: "", steps: bp.process.steps.map(([title, description]) => ({ title, description })) } : null),
  };

  const sections = bp.sections.map((k) => make[k]()).filter((s): s is SiteSection => s !== null);
  return {
    meta: {
      title: `${b.name}${city ? ` | ${city}` : ""}`.slice(0, 70),
      description: `${b.name}${city ? ` in ${city}` : ""}. ${bp.sub}`.slice(0, 160),
      // Blueprint copy is Dutch; the language flag follows the location so the AI writes French sites in Wallonia and Brussels.
      lang: languageFor({ country: b.country ?? "Netherlands", city: b.city, postalCode: b.postalCode, address: b.address }),
      keywords: [city, design.industry].filter(Boolean),
    },
    theme: { template: design.legacy, design: design.key, variation: variation ?? hashString(b.name) % variationCount(design), primary: design.palette.primary, accent: design.palette.accent, mode: design.mode, font: design.fonts.display, radius: design.radius },
    business: { name: b.name, tagline: bp.eyebrow, phone: b.phone, email: null, address: b.address, city: b.city, mapsUrl: b.googleMapsUrl, openingHours: b.openingHours },
    images: [],
    hero: {
      eyebrow: bp.eyebrow,
      headline: bp.headline(b.name, city).slice(0, 90),
      subheadline: bp.sub,
      primaryCta: { label: bp.cta, href: `#${bookingId}` },
      secondaryCta: bp.offer.kind === "menu" ? { label: bp.offer.title, href: `#${bp.offer.id}` } : telHref ? { label: "Bel ons", href: telHref } : null,
      image: "art:hero",
      layout: "split",
      ...(bp.note ? { note: bp.note } : {}),
    },
    sections,
    footer: { blurb: `${b.name}${city ? ` — ${city}` : ""}. ${bp.eyebrow}.` },
  };
}
