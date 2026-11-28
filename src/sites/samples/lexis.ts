import type { SiteSpec } from "@/lib/site-spec";

/**
 * Demo content of the Lexis template: a fictional corporate law firm in Amsterdam. Everything
 * here is invented for the demonstration and labelled as such by the demo bar; it contains no
 * reviews, ratings, awards, numbers presented as facts or named people.
 */

const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;
const img = (key: string, id: string, alt: string, w?: number) => ({ key, src: u(id, w), alt, license: "stock" as const, credit: "Unsplash" });

export const sample: SiteSpec = {
  meta: {
    title: "Lexis Advocaten | Ondernemingsrecht in Amsterdam",
    description: "Lexis Advocaten adviseert en procedeert voor ondernemers, bestuurders en investeerders: ondernemingsrecht, contracten, arbeidsrecht, vastgoed en geschillen.",
    lang: "nl",
    keywords: ["advocaat Amsterdam", "ondernemingsrecht", "arbeidsrecht werkgevers", "contractenrecht", "procesrecht", "advocatenkantoor"],
  },
  theme: { template: "corporate", design: "lexis", variation: 0, primary: "#0c1a33", accent: "#b0935a", mode: "light", font: "DM Serif Display", radius: "sharp" },
  business: {
    name: "Lexis Advocaten",
    tagline: "Advocaten voor ondernemers die vooruit willen",
    phone: null,
    email: null,
    address: null,
    city: "Amsterdam",
    mapsUrl: null,
    openingHours: ["Maandag – Vrijdag: 08:30 – 18:00", "Zaterdag: Gesloten", "Zondag: Gesloten"],
  },
  images: [
    img("hero", "1486406146926-c627a92ad1ab", "Glazen kantoortorens van onderaf gezien tegen een lichte lucht", 1920),
    img("about", "1497215728101-856f4ea42174", "Lichte werkplek aan een raam met uitzicht over de stad"),
    img("art:svc0", "1464938050520-ef2270bb8ce8", "Kantoortorens in een zakendistrict"),
    img("art:svc1", "1450101499163-c8848c66ca85", "Een hand tekent een overeenkomst met een vulpen"),
    img("art:svc2", "1462826303086-329426d1aef5", "Lichte vergaderzaal met een lange tafel"),
    img("art:svc3", "1436450412740-6b988f486c6b", "Zuilen en fronton van een klassiek gerechtsgebouw"),
    img("art:svc4", "1554469384-e58fac16e23a", "Gebogen glazen gevel van een modern kantoorgebouw"),
    img("art:svc5", "1455390582262-044cdead277a", "Close-up van een vulpen die aantekeningen schrijft"),
    img("art:g1", "1497366216548-37526070297c", "Gang met glazen wanden en een donkerblauwe wand"),
    img("art:g2", "1431540015161-0bf868a2d407", "Boardroom met leren stoelen en uitzicht"),
    img("art:g3", "1534536281715-e28d76689b4d", "Klassieke telefoon tegen een donkerblauwe wand"),
    img("art:g4", "1512470876302-972faa2aa9a4", "Amsterdamse gracht met grachtenpanden in de avond"),
    img("art:g5", "1449157291145-7efd050a4d0e", "Torens die in de mist verdwijnen"),
    img("art:g6", "1521791055366-0d553872125f", "Ondertekening van een document aan een houten tafel"),
  ],
  hero: {
    eyebrow: "Advocaten voor ondernemers",
    headline: "Advies dat *vooruitkijkt*",
    subheadline: "Lexis Advocaten staat ondernemingen, bestuurders en investeerders bij — van de eerste vraag tot de laatste handtekening, en waar nodig tot in de rechtszaal.",
    primaryCta: { label: "Vertrouwelijke intake", href: "#intake" },
    secondaryCta: { label: "Praktijkgebieden", href: "#praktijk" },
    image: "hero",
    layout: "split",
    note: "Kantoor Amsterdam",
  },
  sections: [
    {
      type: "services",
      id: "praktijk",
      title: "Zes praktijken, *één* kantoor",
      intro: "Wij werken voor ondernemingen in elke fase: bij de start, tijdens de groei en op de momenten dat het spannend wordt. Open een praktijkgebied voor wat wij daarin voor u doen.",
      items: [
        { title: "Ondernemingsrecht & M&A", description: "Oprichting, herstructurering, aandeelhoudersverhoudingen en overnames: van term sheet tot closing, met oog voor wat er na de deal moet blijven werken.", icon: "chart", price: null, duration: null },
        { title: "Contracten", description: "Leverings-, distributie- en samenwerkingsovereenkomsten die helder zijn opgesteld, onderhandelbaar blijven en standhouden als het erop aankomt.", icon: "check", price: null, duration: null },
        { title: "Arbeidsrecht", description: "Advies aan werkgevers over arbeidsovereenkomsten, reorganisaties, ontslag en medezeggenschap: zorgvuldig in de uitvoering, nuchter in de toon.", icon: "user", price: null, duration: null },
        { title: "Procesrecht & geschillen", description: "Onderhandelen waar het kan, procederen waar het moet. Wij voeren zaken bij de rechtbank, het gerechtshof en in arbitrage, en bereiden ze grondig voor.", icon: "shield", price: null, duration: null },
        { title: "Vastgoed & huur", description: "Aan- en verkoop van bedrijfsvastgoed, huurovereenkomsten voor winkel- en kantoorruimte en geschillen tussen huurder en verhuurder.", icon: "home", price: null, duration: null },
        { title: "Herstructurering", description: "Bijsturen voordat het knelt: advies bij financiële druk, akkoorden met schuldeisers en begeleiding van bestuurders bij lastige besluiten.", icon: "key", price: null, duration: null },
      ],
    },
    {
      type: "about",
      id: "kantoor",
      title: "Juridisch scherp, *zakelijk* helder",
      paragraphs: [
        "Wij geloven dat goed juridisch advies pas waarde heeft als het bruikbaar is. Daarom vertalen wij elke analyse naar een keuze die u kunt maken, met de risico's en de kansen naast elkaar.",
        "Ons kantoor is bewust compact gehouden. U werkt met een vaste advocaat die uw onderneming kent, en die de juiste collega aan tafel haalt wanneer een vraagstuk daarom vraagt.",
        "We schrijven in begrijpelijke taal, spreken af wat u wanneer van ons kunt verwachten en houden ons daaraan.",
      ],
      image: "about",
      highlights: ["Een vaste advocaat als aanspreekpunt", "Opdrachtbevestiging met heldere afspraken vooraf", "Advies in begrijpelijke taal", "Werkzaam in het Nederlands en het Engels"],
    },
    {
      type: "statement",
      id: "overtuiging",
      title: "Goed advies begint bij *de juiste vraag* — en is pas af als u weet wat u ermee moet.",
      note: "Waar wij voor staan",
    },
    {
      type: "process",
      id: "aanpak",
      title: "Zo pakken wij *een zaak* aan",
      intro: "Elke opdracht verloopt volgens dezelfde zorgvuldige lijn, zodat u op elk moment weet waar u staat.",
      steps: [
        { title: "Intake & conflictcheck", description: "U schetst uw vraag in een vertrouwelijk gesprek. Wij controleren eerst of we u onafhankelijk kunnen bijstaan." },
        { title: "Analyse & strategie", description: "We brengen de feiten, de juridische positie en de belangen in kaart en leggen de mogelijke routes naast elkaar." },
        { title: "Heldere afspraken", description: "U ontvangt een opdrachtbevestiging met de aanpak, de planning en de tariefafspraken, voordat er werk wordt verricht." },
        { title: "Uitvoering", description: "We onderhandelen, stellen op of procederen, en houden u op vaste momenten op de hoogte van de voortgang." },
        { title: "Afronding & nazorg", description: "We sluiten af met een overzicht van wat er is bereikt en wat u in de toekomst in de gaten moet houden." },
      ],
    },
    {
      type: "features",
      id: "principes",
      title: "Waar u op kunt *rekenen*",
      intro: "Geen beloftes over uitkomsten, wel over de manier waarop wij werken.",
      items: [
        { title: "Eén aanspreekpunt", description: "Uw vaste advocaat kent uw onderneming en houdt het overzicht, ook als er meerdere specialisten meewerken.", icon: "user" },
        { title: "Kosten vooraf bespreekbaar", description: "Wij bespreken de verwachte inzet en de tariefafspraken voordat we beginnen, en melden het als een zaak een andere wending neemt.", icon: "chart" },
        { title: "Vertrouwelijk", description: "Wat u ons toevertrouwt, blijft binnen het kantoor. Dat geldt vanaf het allereerste gesprek.", icon: "shield" },
        { title: "Bereikbaar", description: "U krijgt binnen één werkdag een reactie op uw bericht, ook als het antwoord nog even op zich laat wachten.", icon: "clock" },
        { title: "Begrijpelijk", description: "Memo's en adviezen beginnen met de conclusie. De onderbouwing staat erachter, voor wie die wil lezen.", icon: "chat" },
        { title: "Pragmatisch", description: "Een procedure is soms nodig, maar zelden het doel. We zoeken eerst de route die uw onderneming het minst kost.", icon: "key" },
      ],
    },
    {
      type: "gallery",
      id: "impressie",
      title: "Een blik op *het kantoor*",
      images: ["art:g1", "art:g2", "art:g3", "art:g4", "art:g5", "art:g6"],
    },
    {
      type: "menu",
      id: "kennis",
      title: "Kennis & *inzichten*",
      intro: "Onderwerpen waarover ondernemers ons regelmatig vragen stellen. Een eerste oriëntatie — voor uw eigen situatie bespreken we graag wat er speelt.",
      categories: [
        {
          name: "Ondernemen",
          items: [
            { name: "De aandeelhoudersovereenkomst: wat regelt u vooraf?", description: "Over zeggenschap, winstverdeling, een uittreedregeling en wat er gebeurt als de samenwerking stopt.", tags: ["Leeswijzer"] },
            { name: "Due diligence bij een overname", description: "Welke stukken een koper wil zien, en hoe u als verkoper het onderzoek goed voorbereidt.", tags: ["Stappenplan"] },
            { name: "Bestuurdersaansprakelijkheid in vogelvlucht", description: "Wanneer een bestuurder persoonlijk kan worden aangesproken en hoe u dat risico beperkt.", tags: ["Achtergrond"] },
          ],
        },
        {
          name: "Werkgeven",
          items: [
            { name: "Een reorganisatie zorgvuldig voorbereiden", description: "Van bedrijfseconomische onderbouwing tot afspiegeling en de rol van de ondernemingsraad.", tags: ["Stappenplan"] },
            { name: "Het concurrentiebeding in arbeidsovereenkomsten", description: "Wanneer een beding geldig is, wat een rechter toetst en hoe u het goed formuleert.", tags: ["Leeswijzer"] },
            { name: "Een vaststellingsovereenkomst sluiten", description: "Welke afspraken erin horen en waar beide partijen op moeten letten.", tags: ["Checklist"] },
          ],
        },
        {
          name: "Contracten & geschillen",
          items: [
            { name: "Algemene voorwaarden die standhouden", description: "Hoe u voorwaarden van toepassing verklaart en welke bepalingen vaak onderuitgaan.", tags: ["Checklist"] },
            { name: "Een incassotraject tegen een zakelijke klant", description: "Van aanmaning tot dagvaarding: de stappen en de keuzes onderweg.", tags: ["Stappenplan"] },
            { name: "Mediation, arbitrage of de rechter?", description: "De verschillen in snelheid, openbaarheid en kosten naast elkaar gezet.", tags: ["Achtergrond"] },
          ],
        },
      ],
      note: "Deze onderwerpen zijn een algemene oriëntatie en geen juridisch advies voor uw situatie.",
    },
    {
      type: "team",
      id: "team",
      title: "Mensen met *een vak*",
      intro: "Een compact team, ingericht rond de vragen van ondernemers. Bij elke zaak weet u wie u aan de lijn krijgt.",
      members: [
        { name: "Partner", role: "Ondernemingsrecht & M&A", bio: "Begeleidt ondernemers en investeerders bij transacties, herstructureringen en aandeelhoudersvraagstukken.", image: "art:team0" },
        { name: "Partner", role: "Procesrecht & geschillen", bio: "Voert procedures en arbitrages en adviseert over de strategie voordat een geschil escaleert.", image: "art:team1" },
        { name: "Senior advocaat", role: "Arbeidsrecht", bio: "Adviseert werkgevers over contracten, reorganisaties en de samenwerking met de ondernemingsraad.", image: "art:team2" },
        { name: "Advocaat", role: "Vastgoed & huur", bio: "Stelt huur- en koopovereenkomsten op en staat partijen bij in geschillen over bedrijfsruimte.", image: "art:team3" },
        { name: "Office manager", role: "Intake & planning", bio: "Uw eerste aanspreekpunt bij een nieuwe vraag: plant het intakegesprek en de conflictcheck.", image: "art:team4" },
      ],
    },
    {
      type: "faq",
      id: "vragen",
      title: "Veelgestelde *vragen*",
      items: [
        { q: "Kost een eerste gesprek iets?", a: "Het intakegesprek is bedoeld om uw vraag te begrijpen en te bepalen of en hoe wij u kunnen helpen. Over de kosten van dat gesprek maken we vooraf een duidelijke afspraak." },
        { q: "Hoe worden de kosten berekend?", a: "Afhankelijk van de opdracht werken we op basis van een uurtarief, een vaste prijs voor een afgebakende opdracht of een combinatie. U ontvangt de afspraken altijd vooraf schriftelijk." },
        { q: "Wat is een conflictcheck?", a: "Voordat wij een opdracht aannemen, controleren we of we niet al voor een andere betrokken partij werken. Zo kunnen we u onafhankelijk bijstaan." },
        { q: "Staan jullie ook particulieren bij?", a: "Ons kantoor richt zich op ondernemingen, bestuurders en investeerders. Voor particuliere vragen verwijzen we u graag door naar een passend kantoor." },
        { q: "Kunnen wij ook in het Engels samenwerken?", a: "Ja. Adviezen, contracten en correspondentie kunnen in het Nederlands of het Engels worden opgesteld." },
        { q: "Hoe snel kunt u een zaak oppakken?", a: "U ontvangt binnen één werkdag een reactie op uw aanvraag. Bij spoedeisende zaken bespreken we direct wat er op korte termijn nodig is." },
      ],
    },
    {
      type: "booking",
      id: "intake",
      title: "Vertrouwelijke *intake*",
      body: "Beschrijf in een paar zinnen waar uw vraag over gaat en welke partijen erbij betrokken zijn. Wij gebruiken uw gegevens alleen voor een conflictcheck en een eerste reactie, binnen één werkdag.",
      kind: "quote",
      options: ["Ondernemingsrecht & M&A", "Contracten", "Arbeidsrecht", "Procesrecht & geschillen", "Vastgoed & huur", "Herstructurering", "Weet ik nog niet"],
    },
    {
      type: "hours",
      id: "bereikbaarheid",
      title: "Kantoortijden & *bereikbaarheid*",
      note: "Gesprekken vinden plaats op ons kantoor in Amsterdam, bij u op locatie of via een videoverbinding. Buiten kantoortijden plannen we in overleg.",
    },
  ],
  footer: { blurb: "Lexis Advocaten — advocaten voor ondernemers, bestuurders en investeerders in Amsterdam." },
};
