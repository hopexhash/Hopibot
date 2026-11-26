/**
 * Blog of the public website. Every article answers one real search question and is written
 * to be useful on its own; none exists only to add a page. The body is a small Markdown
 * subset (## h2, ### h3, - lists, | tables, > note, blank line = paragraph) with
 * [links](/pad), **bold** and price placeholders such as {starter} that are filled from
 * Settings → Pricing. Market figures are given as rough indications and labelled as such.
 */

export type Article = {
  slug: string;
  /** The search question this article answers (see docs/SEO.md). */
  keyword: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  published: string;
  modified: string;
  readMinutes: number;
  body: string;
  related: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "wat-kost-een-website-laten-maken",
    keyword: "website laten maken kosten",
    title: "Wat kost een website laten maken in 2026?",
    seoTitle: "Wat kost een website laten maken in 2026? | HOPI",
    description: "Wat kost een website laten maken? De drie routes, waar je precies voor betaalt, de doorlopende kosten en waar je in offertes op moet letten.",
    excerpt: "Van zelf bouwen tot een bureau: wat je betaalt, waarvoor, en welke kosten elke maand terugkomen.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 6,
    body: `Het eerlijke antwoord: dat hangt af van wie de website maakt en wat hij moet kunnen. Een eenvoudige website kost een paar honderd euro, een grote maatwerksite kan in de duizenden lopen. In dit artikel lees je waar dat verschil vandaan komt, zodat je offertes kunt vergelijken zonder appels met peren te verwarren.

## De drie routes en wat ze ongeveer kosten

De bedragen hieronder zijn ruwe indicaties uit openbare prijsgidsen (stand november 2026). De bronnen lopen onderling flink uiteen, dus zie ze als richting, niet als prijslijst.

| Route | Indicatie | Past bij |
| Zelf bouwen met een websitebouwer | Meestal een abonnement van enkele tientjes per maand | Wie tijd heeft en het zelf wil doen |
| Freelancer | Vaak tussen enkele honderden en een paar duizend euro eenmalig | Een eenvoudige tot middelgrote bedrijfswebsite |
| Webdesignbureau | Vaak een paar duizend euro of meer | Maatwerk, grote websites, webshops |

Bij zelf bouwen betaal je weinig geld, maar wel met je tijd. Bij een freelancer of bureau betaal je voor ervaring: iemand die weet hoe je een bezoeker in een paar seconden duidelijk maakt wat je doet. In [website laten maken of zelf bouwen](/blog/website-laten-maken-of-zelf-bouwen) zetten we die afweging uitgebreider op een rij.

## Waar betaal je precies voor?

De prijs van een website wordt vooral bepaald door vijf dingen:

- **Het ontwerp.** Een bestaand sjabloon invullen is goedkoper dan een eigen ontwerp.
- **Het aantal pagina's.** Eén pagina met alles erop, of aparte pagina's per dienst.
- **Teksten en foto's.** Lever je die zelf aan, of laat je ze maken?
- **Functies.** Online reserveren, een boekingssysteem, meerdere talen of een webshop kosten extra werk.
- **Vindbaarheid.** Alleen een nette technische basis, of ook doorlopend werk aan je positie in Google.

Vraag bij elke offerte welke van deze vijf erin zitten. Twee offertes met hetzelfde eindbedrag kunnen iets heel anders bevatten.

## De kosten die elke maand of elk jaar terugkomen

Een website is geen eenmalige aankoop. Reken ook op:

- **Een domeinnaam**, die je per jaar verlengt.
- **Hosting**, de plek waar je website staat.
- **Onderhoud**: updates, beveiliging, back-ups en het bijwerken van inhoud.

Deze doorlopende kosten worden in offertes nogal eens klein gedrukt, terwijl ze over een paar jaar meer kunnen zijn dan het bouwen zelf. In [wat kost websiteonderhoud](/blog/wat-kost-websiteonderhoud) gaan we daar dieper op in.

## Waar je in een offerte op moet letten

- **Van wie zijn de domeinnaam en de inhoud?** Zorg dat de domeinnaam op jouw naam staat en dat je je teksten en foto's kunt meenemen.
- **Hoeveel wijzigingsrondes zijn inbegrepen?** En wat kost een extra ronde?
- **Wat betaal je per maand, en waarvoor?** Vraag wat er gebeurt als je opzegt.
- **Wanneer betaal je?** Veel bureaus vragen een aanbetaling voordat je iets hebt gezien.

## Wat kost een website bij HOPI?

Wij werken met vaste prijzen, exclusief {vat} btw:

| Pakket | Prijs | Wat je krijgt |
| Starter | {starter} | Een professionele one-page website |
| Business | {business} | Een complete website tot vijf pagina's |
| Premium | {premium} | Op maat ontworpen, met bijvoorbeeld een reserverings- of boekingssysteem |

Hosting en onderhoud kosten vanaf {hosting} per maand. Het belangrijkste verschil zit in de volgorde: je ziet eerst gratis een ontwerp van je eigen website en kiest daarna pas een pakket. Alle details staan op de pagina [prijzen](/prijzen).

> Benieuwd hoe jouw website eruit kan zien? [Vraag een gratis ontwerp aan](#contact). Je zit nergens aan vast.`,
    related: ["/prijzen", "/blog/website-laten-maken-of-zelf-bouwen", "/blog/wat-kost-websiteonderhoud", "/website-laten-maken"],
  },
  {
    slug: "website-laten-maken-of-zelf-bouwen",
    keyword: "website laten maken of zelf maken",
    title: "Website laten maken of zelf bouwen?",
    seoTitle: "Website laten maken of zelf bouwen? | HOPI",
    description: "Zelf een website bouwen of er een laten maken? De voor- en nadelen van beide routes, wat het je echt kost in tijd en geld, en wanneer wat verstandig is.",
    excerpt: "Zelf bouwen is goedkoop in geld en duur in tijd. Wanneer is welke keuze verstandig?",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 5,
    body: `Met een websitebouwer zet je in een weekend zelf een website in elkaar. Of je laat het doen door iemand die er dagelijks mee bezig is. Beide routes kunnen een prima website opleveren. Welke bij jou past, hangt vooral af van je tijd, je geduld en wat de website moet opleveren.

## Zelf bouwen: goedkoop in geld, duur in tijd

De voordelen zijn duidelijk. Je betaalt een bescheiden bedrag per maand, je kunt vandaag beginnen en je past alles zelf aan wanneer je wilt.

De nadelen merk je meestal pas onderweg:

- **Het kost meer tijd dan je denkt.** Niet het klikken, maar het beslissen: welke pagina's, welke volgorde, wat zet je bovenaan?
- **Teksten schrijven is lastig.** Over je eigen bedrijf schrijven in de woorden van je klant is een vak apart.
- **Een sjabloon blijft een sjabloon.** Met een beetje pech heeft de concurrent verderop dezelfde.
- **Techniek blijft jouw probleem.** Laadt de website traag of ziet hij er op een telefoon raar uit, dan moet je het zelf uitzoeken.
- **Veel zelfgebouwde websites raken nooit af.** Er komt altijd een klant tussendoor.

## Laten maken: je koopt tijd en ervaring

Wie zijn website laat maken, betaalt meer, maar krijgt daar iets voor terug: een ontwerp dat bij het bedrijf past, een opbouw die bezoekers naar de telefoon of het formulier leidt, en iemand die de techniek regelt.

Het nadeel is het risico. Je betaalt vaak vooraf en weet pas weken later of het resultaat bevalt. Daarom is het verstandig om te letten op hoe een bureau werkt en wat je te zien krijgt voordat je betaalt. In [hoe kies je een webdesignbureau](/blog/hoe-kies-je-een-webdesignbureau) staan de vragen die je vooraf kunt stellen.

## Wanneer is zelf bouwen verstandig?

- Je begint net en wilt eerst kijken of je idee aanslaat.
- Je hebt de tijd en vindt het leuk om uit te zoeken.
- Je website is vooral een visitekaartje voor mensen die je al kennen.

## Wanneer kun je het beter laten doen?

- Je website moet nieuwe klanten opleveren.
- Je uurtarief of je vrije avond is je meer waard dan het prijsverschil.
- Je wilt er daarna geen omkijken naar hebben.

## Een rekensom die helpt

Schat hoeveel uur je kwijt bent aan zelf bouwen, schrijven en bijhouden, en vermenigvuldig dat met wat een uur van jou waard is. Leg die uitkomst naast de prijs van laten maken. Voor veel ondernemers is het verschil kleiner dan gedacht. Wat laten maken kost, lees je in [wat kost een website laten maken](/blog/wat-kost-een-website-laten-maken).

## De tussenweg: eerst zien, dan beslissen

Het grootste bezwaar tegen laten maken is dat je vooraf niet weet wat je krijgt. Bij HOPI lossen we dat op door de volgorde om te draaien. Je ziet eerst gratis een ontwerp van je eigen website, met je naam en diensten erin. Bevalt het niet, dan stopt het daar. Bevalt het wel, dan kies je een pakket vanaf {starter}, exclusief btw.

> Twijfel je nog? [Vraag een gratis ontwerp aan](#contact) en leg het naast wat je zelf zou bouwen.`,
    related: ["/website-laten-maken", "/website-laten-maken/zzp", "/blog/wat-kost-een-website-laten-maken", "/blog/hoe-kies-je-een-webdesignbureau"],
  },
  {
    slug: "waar-moet-een-goede-bedrijfswebsite-aan-voldoen",
    keyword: "goede bedrijfswebsite",
    title: "Waar moet een goede bedrijfswebsite aan voldoen?",
    seoTitle: "Goede bedrijfswebsite: checklist met 10 punten | HOPI",
    description: "Een checklist met tien punten waar een goede bedrijfswebsite aan voldoet: van de eerste vijf seconden en mobiel gebruik tot vindbaarheid en wettelijke gegevens.",
    excerpt: "Tien punten waarmee je je eigen website in tien minuten kunt nalopen.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 6,
    body: `Een goede bedrijfswebsite herken je niet aan animaties of een dure foto bovenaan, maar aan wat een bezoeker ermee kan. Met de tien punten hieronder loop je je eigen website in tien minuten na. Pak je telefoon erbij, want daar beginnen de meeste bezoekers.

## 1. Binnen vijf seconden is duidelijk wat je doet

Bovenaan staat in gewone woorden wat je doet, voor wie en waar. "Loodgieter in Zaandam, ook 's avonds bereikbaar" werkt beter dan "Welkom op onze website".

## 2. Hij werkt goed op een telefoon

Tekst is leesbaar zonder inzoomen, knoppen zijn groot genoeg voor een duim en je hoeft nergens opzij te schuiven. Google beoordeelt je website bovendien op de mobiele versie.

## 3. Contact opnemen kost één tik

Het telefoonnummer is aanklikbaar, het formulier is kort en de belangrijkste knop staat op elke pagina. Hoe meer stappen, hoe meer bezoekers onderweg afhaken.

## 4. Hij laadt snel

Zware foto's en overbodige toeters maken een website traag. Test het op mobiel internet, niet op de wifi van kantoor.

## 5. Elke dienst heeft een eigen plek

Een aparte pagina of duidelijk blok per dienst helpt bezoekers én zoekmachines. Wie zoekt op "dakkapel plaatsen" wil op een pagina over dakkapellen landen, niet op een algemene lijst.

## 6. Je laat zien dat je echt bestaat

Een adres of werkgebied, een KvK-nummer, foto's van jezelf of je team en echte voorbeelden van je werk. Gebruik alleen beoordelingen van echte klanten; verzonnen reviews zijn misleidend en vallen vroeg of laat door de mand.

## 7. De inhoud klopt

Openingstijden, prijzen en diensten zijn actueel. Niets ondermijnt vertrouwen zo snel als een kerstactie in maart.

## 8. Hij is veilig

Een SSL-certificaat (het slotje in de adresbalk) is de ondergrens. Zonder slotje waarschuwen browsers bezoekers dat de verbinding niet veilig is.

## 9. Google begrijpt waar hij over gaat

Elke pagina heeft een eigen titel en omschrijving, één duidelijke hoofdkop en tekst waarin je vak en je plaats voorkomen. Meer daarover lees je in [beter vindbaar worden in Google](/blog/beter-vindbaar-in-google).

## 10. De wettelijke gegevens staan erop

Als ondernemer vermeld je onder meer je bedrijfsnaam, vestigingsadres, contactgegevens en KvK-nummer. Verzamel je gegevens via een formulier, dan hoort daar een privacyverklaring bij. Plaats je trackingcookies, dan vraag je daar eerst toestemming voor. Twijfel je over wat voor jouw situatie geldt, kijk dan bij de KVK of vraag het een jurist.

## Hoe scoort jouw website?

Haalt je website zeven of meer punten, dan staat de basis. Mis je er meer dan drie, dan loont het om te kijken of opknappen nog zin heeft of dat [vernieuwen](/website-redesign) verstandiger is.

> Wil je zien hoe een website eruitziet die op al deze punten klopt? [Vraag een gratis ontwerp aan](#contact) van je eigen website.`,
    related: ["/website-redesign", "/website-laten-maken", "/blog/beter-vindbaar-in-google", "/website-laten-maken/mkb"],
  },
  {
    slug: "hoe-kies-je-een-webdesignbureau",
    keyword: "webdesignbureau kiezen",
    title: "Hoe kies je een webdesignbureau?",
    seoTitle: "Hoe kies je een webdesignbureau? 8 vragen vooraf | HOPI",
    description: "Acht vragen die je een webdesignbureau stelt voordat je tekent: over eigendom, kosten, wijzigingen, onderhoud en wat je te zien krijgt voordat je betaalt.",
    excerpt: "Acht vragen die je stelt voordat je tekent, en de antwoorden waar je op let.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 5,
    body: `Er zijn in Nederland heel veel webdesigners en bureaus, van studenten met een laptop tot bureaus met vijftig man. Aan de buitenkant lijken ze op elkaar: allemaal een strak portfolio en mooie beloftes. Het verschil merk je pas als het project loopt. Met deze acht vragen ontdek je het vooraf.

## 1. Wat krijg ik te zien voordat ik betaal?

Veel bureaus sturen een offerte en vragen een aanbetaling voordat er één pixel is ontworpen. Vraag of je vooraf een schets of ontwerp kunt zien. Hoe concreter, hoe kleiner je risico.

## 2. Wat zit er precies in de prijs?

Vraag om een lijst: aantal pagina's, teksten, foto's, formulieren, koppelingen. En vraag wat er níet in zit. Een lage prijs met veel meerwerk is uiteindelijk geen lage prijs.

## 3. Van wie zijn de domeinnaam en de inhoud?

De domeinnaam hoort op jouw naam te staan. Vraag ook of je je teksten en foto's kunt meenemen als je ooit overstapt.

## 4. Hoeveel wijzigingen mag ik doorgeven?

Een eerste ontwerp is zelden in één keer goed. Vraag hoeveel rondes zijn inbegrepen en wat een extra ronde kost.

## 5. Wat betaal ik daarna per maand?

Hosting, onderhoud, updates en wijzigingen komen bovenop de bouw. Vraag wat er in het maandbedrag zit, wat de looptijd is en hoe je opzegt. In [wat kost websiteonderhoud](/blog/wat-kost-websiteonderhoud) lees je wat gebruikelijk is.

## 6. Wie is mijn aanspreekpunt?

Krijg je één vast contact, of een ticketsysteem? En hoe snel mag je een antwoord verwachten?

## 7. Kan ik vergelijkbaar werk zien?

Vraag naar voorbeelden uit jouw branche of van bedrijven van jouw grootte. Let op of het voorbeelden van echte klanten zijn of demo's; beide zeggen iets, maar niet hetzelfde. Een eerlijk bureau vertelt erbij wat wat is.

## 8. Wat beloven ze over Google?

Wees op je hoede bij garanties als "nummer één in Google". Niemand kan posities garanderen. Een goed bureau belooft een nette technische basis en legt uit wat je zelf kunt doen. In [beter vindbaar worden in Google](/blog/beter-vindbaar-in-google) lees je wat daar wel bij komt kijken.

## Signalen om alert op te zijn

- Druk om snel te tekenen, of kortingen die "alleen vandaag" gelden.
- Vage antwoorden op de vraag van wie de domeinnaam is.
- Geen duidelijke bedrijfsgegevens of KvK-nummer op de website.
- Recensies die je nergens kunt terugvinden.

## Hoe wij deze vragen beantwoorden

Het zou vreemd zijn om deze lijst te publiceren zonder er zelf langs te gaan. Bij HOPI zie je eerst gratis een ontwerp van je eigen website (vraag 1). De pakketten en wat erin zit, staan met vaste bedragen op de pagina [prijzen](/prijzen) (vraag 2 en 5). Posities in Google garanderen we niet (vraag 8). En de voorbeelden op onze website zijn demo-ontwerpen voor fictieve bedrijven; dat staat er ook bij (vraag 7).

> Wil je zelf zien wat je krijgt? [Vraag een gratis ontwerp aan](#contact).`,
    related: ["/website-laten-maken", "/prijzen", "/blog/wat-kost-een-website-laten-maken", "/blog/website-laten-maken-of-zelf-bouwen"],
  },
  {
    slug: "beter-vindbaar-in-google",
    keyword: "bedrijf beter vindbaar in google",
    title: "Hoe wordt je bedrijf beter vindbaar in Google?",
    seoTitle: "Je bedrijf beter vindbaar in Google: 7 stappen | HOPI",
    description: "Zeven concrete stappen om als lokaal bedrijf beter gevonden te worden in Google: van je Google Bedrijfsprofiel en echte reviews tot pagina's per dienst.",
    excerpt: "Zeven stappen voor lokale ondernemers, waarvan je de eerste vandaag nog kunt zetten.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 6,
    body: `Wie een kapper, garage of loodgieter zoekt, typt meestal het vak in met een plaatsnaam erbij, of gewoon "bij mij in de buurt". Google laat dan een kaart zien met een paar bedrijven en daaronder de gewone zoekresultaten. Je wilt op beide plekken staan. Dat lukt niet met één truc, wel met een paar dingen die je gewoon goed regelt.

## 1. Maak een Google Bedrijfsprofiel aan en vul het helemaal in

Het Bedrijfsprofiel is de kaart met je naam, adres, tijden en foto's die naast de zoekresultaten en in Google Maps verschijnt. Het is gratis en voor lokale vindbaarheid het belangrijkste dat je kunt doen. Vul alles in: categorie, openingstijden, diensten, foto's en je website.

## 2. Zorg dat je gegevens overal hetzelfde zijn

Je bedrijfsnaam, adres en telefoonnummer moeten op je website, je Bedrijfsprofiel en andere vermeldingen precies gelijk zijn. Afwijkingen maken het voor Google onduidelijk of het om hetzelfde bedrijf gaat.

## 3. Vraag tevreden klanten om een review

Reviews wegen mee in de lokale resultaten en overtuigen nieuwe klanten. Vraag er gewoon om, op het moment dat een klant tevreden is, en stuur de link naar je reviewpagina mee. Reageer ook op reviews, juist op de kritische. Koop of verzin nooit reviews: het is misleiding, het is in strijd met de regels van Google en het kan je profiel kosten.

## 4. Geef elke dienst een eigen pagina

Google toont pagina's, geen websites. Een pagina over "APK keuring" heeft meer kans om gevonden te worden op die zoekopdracht dan een pagina waar twintig diensten onder elkaar staan. Schrijf per dienst wat het is, voor wie, wat het kost en hoe iemand een afspraak maakt.

## 5. Noem je vak en je plaats, in gewone zinnen

Zet in de titel van de pagina, de hoofdkop en de eerste alinea wat je doet en waar. Eén keer goed is genoeg; een tekst volproppen met zoekwoorden leest slecht en werkt averechts.

## 6. Zorg dat je website snel en mobiel is

Google beoordeelt de mobiele versie van je website. Is die traag of onhandig, dan haken bezoekers af en dat helpt je positie niet. De checklist in [waar moet een goede bedrijfswebsite aan voldoen](/blog/waar-moet-een-goede-bedrijfswebsite-aan-voldoen) helpt je dat na te lopen.

## 7. Houd het bij

Vindbaarheid is geen klus die af is. Werk je tijden bij rond feestdagen, plaats af en toe een nieuwe foto en vul je website aan als je aanbod verandert. Een website en profiel die leven, doen het beter dan een die stilstaan.

## Wat je kunt verwachten, en wat niet

Wie deze zeven dingen goed doet, bouwt een stevige basis. Hoe snel je stijgt, hangt af van je plaats, je branche en wat concurrenten doen. Reken eerder in maanden dan in dagen, en wantrouw iedereen die een positie garandeert. Dat kan niemand.

## Hoe HOPI hierbij helpt

Elke website die wij maken, heeft een nette technische basis: snelle pagina's, een duidelijke opbouw en titels per pagina. Het instellen van je Google Bedrijfsprofiel en een lokaal SEO-pakket zijn als extra beschikbaar, en binnen het Growth-abonnement werken we er maandelijks aan door. De details staan bij [prijzen](/prijzen) en [website onderhoud](/website-onderhoud).

> Wil je beginnen met een website die Google goed kan lezen? [Vraag een gratis ontwerp aan](#contact).`,
    related: ["/website-onderhoud", "/website-laten-maken", "/blog/waar-moet-een-goede-bedrijfswebsite-aan-voldoen", "/website-laten-maken/loodgieter"],
  },
  {
    slug: "wat-kost-websiteonderhoud",
    keyword: "website onderhoud kosten",
    title: "Wat kost websiteonderhoud?",
    seoTitle: "Wat kost websiteonderhoud per maand? | HOPI",
    description: "Wat kost het onderhoud van een website? Wat eronder valt, waarom de prijzen zo verschillen en welke vragen je stelt voordat je een abonnement afsluit.",
    excerpt: "Waarom de ene aanbieder een tientje vraagt en de andere honderden euro's, en wat je echt nodig hebt.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 5,
    body: `Vraag vijf aanbieders wat websiteonderhoud kost en je krijgt vijf heel verschillende bedragen, van een tientje tot honderden euro's per maand. Dat komt doordat ze met "onderhoud" niet hetzelfde bedoelen. Wie weet wat eronder valt, kan veel beter vergelijken.

## Wat valt er onder onderhoud?

Grofweg zijn er vier lagen:

- **Hosting en domeinnaam.** Je website moet ergens staan en bereikbaar zijn op je eigen adres.
- **Techniek.** Beveiligingsupdates, een SSL-certificaat, back-ups en in de gaten houden of de website bereikbaar is.
- **Inhoud.** Openingstijden, prijzen, foto's en teksten bijwerken.
- **Verbeteren.** Doorlopend werken aan vindbaarheid, snelheid en hoeveel aanvragen de website oplevert.

Een abonnement van een tientje dekt meestal alleen de eerste laag. Een abonnement van een paar honderd euro bevat vaak alle vier, inclusief uren van een specialist.

## Waarom de prijzen zo verschillen

- **Het soort website.** Een webshop met betalingen en koppelingen vraagt meer zorg dan een website van vijf pagina's.
- **Wie de wijzigingen doet.** Doe je die zelf, of geef je ze door?
- **Hoe snel je geholpen wordt.** Support binnen een dag kost meer dan "we kijken er deze maand naar".
- **Of verbeteren erbij zit.** Maandelijks werk aan je vindbaarheid is mensenwerk, en dat zie je terug in de prijs.

## Kun je onderhoud ook zelf doen?

Deels. Teksten aanpassen kan bij veel systemen zelf. Updates en beveiliging zijn een ander verhaal: sla je die een tijd over, dan loop je risico op een gehackte of kapotte website. Dat herstellen is vaak duurder dan een jaar onderhoud.

## Signalen dat het onderhoud achterloopt

- De browser meldt dat je website "niet veilig" is.
- Aanvragen via het formulier komen niet meer aan in je mailbox.
- De website laadt merkbaar trager dan vroeger.
- Openingstijden of prijzen op de website kloppen niet meer.
- Niemand weet nog wie er bij de website kan.

Herken je er twee of meer, dan is het tijd om het onderhoud goed te regelen, of om te kijken of [vernieuwen](/website-redesign) verstandiger is.

## Vragen voordat je een abonnement afsluit

- Wat zit er precies in het maandbedrag, en wat niet?
- Hoeveel wijzigingen zijn inbegrepen, en wat kost een extra?
- Hoe snel worden wijzigingen doorgevoerd?
- Wat is de looptijd en hoe zeg je op?
- Wat gebeurt er met je website en domeinnaam als je stopt?

## Wat onderhoud bij HOPI kost

Wij hebben drie abonnementen, exclusief {vat} btw:

| Abonnement | Per maand | Wat erin zit |
| Hosting & Onderhoud | {hosting} | Hosting, SSL, beveiligingsupdates, back-ups en monitoring |
| Website Care | {care} | Alles hierboven, plus maandelijkse inhoudswijzigingen en support met voorrang |
| Growth | {growth} | Alles hierboven, plus maandelijkse SEO-verbeteringen en rapportages |

De abonnementen zijn bedoeld voor websites die wij zelf hebben gebouwd. Meer uitleg staat op de pagina [website onderhoud](/website-onderhoud).

> Heb je nog geen website, of is de huidige toe aan vervanging? [Vraag een gratis ontwerp aan](#contact).`,
    related: ["/website-onderhoud", "/prijzen", "/blog/wat-kost-een-website-laten-maken", "/website-redesign"],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
