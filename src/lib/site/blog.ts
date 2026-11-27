/**
 * Blog of the public website. Every article answers one real search question and is written
 * to be useful on its own; none exists only to add a page. The body is a small Markdown
 * subset (## h2, ### h3, - lists, | tables, > note, blank line = paragraph) with
 * [links](/pad), **bold** and price placeholders such as {starter} that are filled from
 * Settings → Pricing. Market figures are given as rough indications and labelled as such.
 */

/** Topics of the blog. Every article belongs to one; the blog index groups by them. */
export const CATEGORIES = {
  kosten: { label: "Kosten en prijzen", text: "Wat een website kost, waarvoor je betaalt en welke kosten terugkomen." },
  aanpak: { label: "Een website laten maken", text: "Hoe je het aanpakt, waar je op let en welke keuzes je maakt." },
  vindbaarheid: { label: "Gevonden worden", text: "Google, mobiel en meer klanten via je website." },
  branches: { label: "Per branche", text: "Wat er op de website van jouw soort bedrijf moet staan." },
} as const;
export type CategoryKey = keyof typeof CATEGORIES;

export type Article = {
  slug: string;
  category: CategoryKey;
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
  /** Cover image (shown at the top, used for social cards and structured data). Only real images from /public. */
  image?: { src: string; alt: string; width: number; height: number };
  /** Public sources the article relies on, listed under the article. */
  sources?: { label: string; url: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "wat-kost-een-website-laten-maken",
    category: "kosten",
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
    category: "aanpak",
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
    related: ["/website-laten-maken", "/website-laten-maken/zzp", "/blog/hoe-werkt-een-ai-website-builder", "/blog/wat-kost-een-website-laten-maken"],
  },
  {
    slug: "waar-moet-een-goede-bedrijfswebsite-aan-voldoen",
    category: "aanpak",
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
    related: ["/website-redesign", "/website-laten-maken", "/blog/waarom-is-een-mobiele-website-belangrijk", "/blog/maatwerk-website-of-template"],
  },
  {
    slug: "hoe-kies-je-een-webdesignbureau",
    category: "aanpak",
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
    related: ["/website-laten-maken", "/prijzen", "/blog/maatwerk-website-of-template", "/blog/hoe-werkt-een-ai-website-builder"],
  },
  {
    slug: "beter-vindbaar-in-google",
    category: "vindbaarheid",
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
    related: ["/website-onderhoud", "/website-laten-maken", "/blog/meer-klanten-via-je-website", "/blog/waarom-is-een-mobiele-website-belangrijk"],
  },
  {
    slug: "wat-kost-websiteonderhoud",
    category: "kosten",
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
  {
    slug: "wat-moet-er-op-een-restaurantwebsite-staan",
    category: "branches",
    keyword: "wat moet er op een restaurantwebsite staan",
    title: "Wat moet er op een restaurantwebsite staan?",
    seoTitle: "Wat moet er op een restaurantwebsite staan? | HOPI",
    description: "Een checklist voor je restaurantwebsite: de menukaart als tekst, snel reserveren, actuele openingstijden, allergenen, echte foto's en je Google-profiel.",
    excerpt: "Een checklist voor restaurants: van een leesbare menukaart tot reserveren in een paar tikken.",
    published: "2026-11-28",
    modified: "2026-11-28",
    readMinutes: 6,
    image: { src: "/site/work/restaurant-d-1440.webp", alt: "Demo-ontwerp van HOPI voor een restaurantwebsite (Vesper, fictief restaurant)", width: 1440, height: 900 },
    body: `Op een restaurantwebsite staan in elk geval je menukaart als gewone tekst, een manier om direct te reserveren, actuele openingstijden, je adres met route en foto's die laten zien hoe het er echt uitziet. Daarnaast vertel je gasten hoe ze informatie over allergenen krijgen en zorg je dat alles werkt op een telefoon, want daar kijken de meeste mensen als ze een restaurant zoeken. Hieronder lopen we de punten één voor één langs, zodat je je eigen website kunt nalopen of weet wat je vraagt als je er een laat maken.

## Wat zoekt een gast op je website?

Bijna niemand leest een restaurantwebsite van boven naar beneden. Een gast komt met een vraag: zijn ze vanavond open, wat staat er op de kaart, wat kost het ongeveer, kan ik reserveren en waar parkeer ik? Vaak staat hij al op straat of zit hij op de bank met zijn telefoon. Elke vraag die niet binnen een paar tikken beantwoord is, is een reden om het volgende restaurant in de zoekresultaten te proberen.

Bovenaan hoort daarom in één zin wat voor restaurant je bent en waar: "Italiaans restaurant aan de haven van Harderwijk, open van woensdag tot en met zondag". Direct daaronder de knop om te reserveren. Sfeer is belangrijk, maar een grote video die eerst moet laden terwijl de gast nog niet weet waar hij is, kost je reserveringen.

## De checklist: wat moet er op een restaurantwebsite staan

- **Je menukaart als tekst op de pagina.** Geen pdf en geen foto van de kaart. Waarom, lees je hieronder.
- **Reserveren in een paar tikken.** Een knop die op elke pagina terugkomt en direct naar je reserveringssysteem of formulier gaat. Neem je alleen telefonisch reserveringen aan, maak het nummer dan aanklikbaar.
- **Actuele openingstijden.** Inclusief keukentijden als die afwijken, en aangepaste tijden rond feestdagen en vakanties.
- **Adres, route en parkeren.** Een kaart, een link naar de route en een zin over parkeren of het dichtstbijzijnde station.
- **Echte foto's.** Van je gerechten, je zaal en je terras. Geen stockfoto van een pasta die je niet serveert.
- **Informatie over allergenen.** Waar gasten die vinden of hoe ze ernaar vragen.
- **Prijzen.** Op de kaart, of minstens een indicatie per gang of menu. Gasten willen vooraf weten of je in hun budget past.
- **Groepen en arrangementen.** Heb je een zaal voor feesten of een lunch voor bedrijven, geef dat een eigen blok of pagina.
- **Contact en bedrijfsgegevens.** Telefoonnummer, e-mailadres en je KvK-nummer.

## Waarom je menukaart als gewone tekst op de site hoort

Veel restaurants zetten hun kaart als pdf op de website. Begrijpelijk, want het bestand bestaat al. Op een telefoon is een pdf alleen onhandig: inzoomen, opzij schuiven en soms eerst downloaden. Bovendien vergeet je zo'n bestand makkelijk bij te werken, waardoor er gerechten op staan die al maanden van de kaart zijn.

Een menukaart als gewone tekst (HTML) leest prettig op elk scherm, laadt snel en is ook bruikbaar voor de schermlezers die blinde en slechtziende gasten gebruiken. Zoekmachines kunnen de tekst lezen, dus wie zoekt op "vegetarisch restaurant" met je plaatsnaam erbij, komt eerder uit bij een pagina waar je vegetarische gerechten echt op staan. In de gestructureerde gegevens van je website kun je bovendien naar je menukaart verwijzen; Google beschrijft daarvoor een menu-eigenschap in zijn documentatie over lokale bedrijven.

Een paar tips voor de kaart zelf:

- Zet bij elk gerecht de naam, een korte omschrijving en de prijs.
- Markeer vegetarische en veganistische gerechten overal op dezelfde manier.
- Wissel je kaart vaak, laat dan zien dat het een voorbeeldkaart is en zet de datum erbij.

## Allergenen: wat de regels vragen

Gasten met een allergie willen vooraf weten of ze bij jou veilig kunnen eten. In Nederland moet je als horecaondernemer informatie kunnen geven over de veertien allergenen die de wet noemt, ook bij gerechten die je zelf bereidt. Volgens Koninklijke Horeca Nederland mag dat mondeling of schriftelijk. Geef je de informatie mondeling, dan moet die ook schriftelijk of digitaal beschikbaar zijn, voor je personeel en voor de NVWA. In België gelden vergelijkbare regels, waarover het FAVV uitleg geeft.

Je website hoeft niet de enige plek te zijn waar die informatie staat, maar hij helpt wel. Een korte zin bij de kaart, zoals "Heb je een allergie? Vraag ons gerust naar de allergenenkaart", neemt twijfel weg voordat iemand reserveert. Bied je online bestellen of afhalen aan, zoek dan uit wat er voor die situatie geldt, want dan kiest de gast zijn gerecht voordat hij jou spreekt.

> Dit artikel is geen juridisch advies. Twijfel je over wat voor jouw zaak geldt, vraag het dan na bij je brancheorganisatie of de NVWA.

## Je website en je Google-profiel horen bij elkaar

Veel gasten zien je Google Bedrijfsprofiel eerder dan je website: het blok met je naam, sterren, foto's en openingstijden in Google Zoeken en Maps. Google laat restaurants daar onder meer hun menukaart tonen en reserveringen ontvangen. Zorg dat de gegevens in dat profiel precies gelijk zijn aan die op je website. Staat op Google dat je maandag open bent en op je website dat je dicht bent, dan weet de gast niet wie hij moet geloven.

Een handige verdeling: het profiel is de etalage, je website is de zaak zelf. Het profiel laat in één oogopslag zien dat je bestaat en open bent. Je website geeft ruimte aan de volledige kaart, het verhaal van je keuken, groepsarrangementen en de reserveringsknop. Hoe je verder hoger komt in de lokale resultaten, lees je in [beter vindbaar worden in Google](/blog/beter-vindbaar-in-google).

## Mobiel, snel en makkelijk bij te werken

Test je website zoals een gast hem gebruikt: open hem op je eigen telefoon, op mobiel internet, en probeer binnen een halve minuut een tafel voor vier te reserveren. Lukt dat niet zonder inzoomen of zoeken, dan ligt daar je eerste verbeterpunt. Waarom dat zo zwaar weegt, ook voor Google, lees je in [waarom een mobiele website belangrijk is](/blog/waarom-is-een-mobiele-website-belangrijk).

Let ook op hoe makkelijk je dingen aanpast. Een restaurant verandert vaker dan de meeste bedrijven: een nieuwe seizoenskaart, een week dicht in de zomer, een kerstmenu. Spreek af hoe die wijzigingen gaan voordat de website live staat, zodat je kaart en tijden over een jaar nog steeds kloppen.

## Hoe een restaurantwebsite van HOPI eruitziet

Op onze website staat [Vesper, een demo-ontwerp voor een fictief restaurant](/werk/restaurant). Daarin zie je hoe de punten hierboven samenkomen: de kaart als tekst, een reserveringsknop die altijd in beeld is en openingstijden die je niet hoeft te zoeken. Het is een voorbeeld, geen klant. Wat we voor restaurants maken, en wat extra's zoals een digitale menukaart of een koppeling met je reserveringssysteem inhouden, staat op de pagina [website laten maken voor je restaurant](/website-laten-maken/restaurant).

Wil je weten hoe dit er voor jouw zaak uitziet? We maken eerst gratis een ontwerp van je eigen website, met je eigen naam en openingstijden erin. Pas als het je bevalt, kies je een pakket.

> [Vraag een gratis ontwerp aan](#contact) en bekijk je eigen restaurant op je telefoon.`,
    related: ["/website-laten-maken/restaurant", "/website-laten-maken/horeca", "/werk/restaurant", "/blog/meer-klanten-via-je-website"],
    sources: [
      { label: "KHN: Wat betekent de allergenenwetgeving voor mij?", url: "https://khn.nl/kennis/wat-betekent-de-wetgeving-allergenen-voor-je" },
      { label: "FAVV: Vragen en antwoorden over allergeneninformatie (België)", url: "https://favv-afsca.be/sites/default/files/2023-08/2015-07-14_QenAallergenen_nl_corr.pdf" },
      { label: "Google Bedrijfsprofiel voor restaurants", url: "https://business.google.com/nl/business-profile/restaurants/" },
      { label: "Google Search Central: gestructureerde gegevens voor lokale bedrijven", url: "https://developers.google.com/search/docs/appearance/structured-data/local-business" },
    ],
  },
  {
    slug: "waarom-is-een-mobiele-website-belangrijk",
    category: "vindbaarheid",
    keyword: "waarom is een mobiele website belangrijk",
    title: "Waarom is een mobiele website belangrijk?",
    seoTitle: "Waarom is een mobiele website belangrijk? | HOPI",
    description: "Google beoordeelt je website op de mobiele versie, en je klanten kijken eerst op hun telefoon. Wat dat betekent en hoe je je site in tien minuten test.",
    excerpt: "Google kijkt naar de mobiele versie van je website. Wat dat betekent en hoe je het zelf test.",
    published: "2026-11-28",
    modified: "2026-11-28",
    readMinutes: 5,
    body: `Een mobiele website is belangrijk om twee redenen: je klanten zoeken en vergelijken op hun telefoon, en Google gebruikt de mobiele versie van je website om hem te indexeren en te rangschikken. Werkt je website op een telefoon slecht, dan haken bezoekers af en ziet Google een slechtere versie van je bedrijf. Een website die op mobiel goed werkt, is daarom geen extraatje maar de basis.

## Wat mobile-first indexing betekent

Vroeger keek Google vooral naar de desktopversie van een website. Dat is omgedraaid. In de documentatie van Google Search Central staat dat Google de mobiele versie van de inhoud van een website gebruikt, opgehaald met een smartphone-crawler, om te indexeren en te rangschikken. Dat heet mobile-first indexing. In 2023 meldde Google dat de overstap voor het hele web is afgerond.

Wat dat in de praktijk betekent:

- **Wat niet op je mobiele versie staat, telt nauwelijks mee.** Verberg je op een telefoon een deel van je tekst, je diensten of je openingstijden om ruimte te besparen, dan mist Google dat ook.
- **Dezelfde inhoud op elk scherm.** Google raadt aan om op mobiel dezelfde inhoud, koppen, afbeeldingen en gestructureerde gegevens te tonen als op desktop.
- **Belangrijke inhoud niet pas laden na een tik.** Tekst die pas verschijnt als iemand ergens op tikt of veegt, kan Google missen.

Een responsive website, die zich aanpast aan elk scherm en overal dezelfde inhoud toont, voorkomt de meeste van deze problemen vanzelf.

## Waarom je klanten het als eerste merken

Los van Google: denk aan hoe je zelf een bedrijf zoekt. Je staat met een lekkende kraan in de keuken, of je zoekt op de bank een restaurant voor zaterdag. Je pakt je telefoon. Een website die dan klein, traag of onhandig is, sluit je binnen een paar seconden, en je probeert de volgende.

Op een telefoon is het scherm kleiner en het geduld ook. Elke extra stap weegt zwaarder: inzoomen om een telefoonnummer te lezen, een menu dat niet opengaat, een formulier met tien velden. Op een laptop werk je daar nog omheen. Op een telefoon niet.

## Waar het op mobiel vaak misgaat

### Knoppen en links die te klein zijn

Een vinger is minder precies dan een muis. De toegankelijkheidsrichtlijnen WCAG 2.2 vragen voor klikbare elementen minimaal 24 bij 24 CSS-pixels, of genoeg ruimte eromheen. Als strengere norm noemen ze 44 bij 44, en veel ontwerpers houden die maat aan voor belangrijke knoppen. Twee kleine links vlak onder elkaar zijn op een telefoon een gok.

### Een trage website

Op mobiel internet merk je zware foto's, video's en scripts direct. Google meet de ervaring van bezoekers met de Core Web Vitals. Volgens web.dev is een pagina goed als het grootste element binnen 2,5 seconden in beeld staat (LCP), de pagina binnen 200 milliseconden reageert op een tik (INP) en de inhoud tijdens het laden nauwelijks verspringt (een CLS van 0,1 of minder). Die drempels gelden voor mobiel en desktop, maar op een telefoon haal je ze het lastigst.

### Pop-ups die alles bedekken

Een cookiemelding, een nieuwsbriefvenster en een chatknop tegelijk laten op een klein scherm weinig over van je pagina. Houd het bij wat echt nodig is en zorg dat het makkelijk weg te tikken is.

### Tekst die te klein of te breed is

Moeten bezoekers inzoomen of opzij schuiven om een zin te lezen, dan is de pagina niet voor mobiel gemaakt. Veel ontwerpers houden voor lopende tekst ongeveer 16 pixels aan, met regels die binnen het scherm blijven.

## Wat je zelf kunt testen, in tien minuten

Je hebt geen technische kennis nodig om je eigen website na te lopen. Pak je telefoon en doe dit:

- **Zet je wifi uit** en open je website op mobiel internet. Hoe lang duurt het voordat je iets ziet?
- **Bel jezelf via de website.** Is je telefoonnummer aanklikbaar, of moet je het overtypen?
- **Vul je eigen contactformulier in** met je duim. Komt het bericht aan?
- **Zoek je openingstijden en adres op.** Hoeveel tikken heb je nodig?
- **Draai je telefoon** een keer naar liggend. Blijft alles netjes staan?
- **Laat iemand anders het proberen**, het liefst iemand die je website niet kent.

| Test | Goed teken | Slecht teken |
| Laden op mobiel internet | Binnen een paar seconden zie je waar je bent | Een wit scherm of een draaiend rondje |
| Bellen | Eén tik op het nummer | Het nummer overtypen of zoeken |
| Formulier | Een paar velden, groot genoeg voor je duim | Veel verplichte velden en kleine vakjes |
| Menu | Opent en sluit zonder haperen | Valt over de tekst of gaat niet meer dicht |

Wil je cijfers, voer je adres dan in bij PageSpeed Insights, de gratis tool van Google. Die laat de Core Web Vitals zien en wijst aan waar het vertraagt. In Google Search Console zie je bovendien of Google problemen heeft met het ophalen en indexeren van je pagina's.

## Mobiel ontwerpen is anders dan desktop verkleinen

Een veelgemaakte fout is een website eerst voor een groot scherm ontwerpen en daarna kijken hoe het op een telefoon past. Dan vallen kolommen onder elkaar in een volgorde die niemand heeft bedacht, en staat je belangrijkste knop ineens onderaan. Beter is beginnen bij het kleinste scherm: wat moet een bezoeker daar als eerste zien, en wat mag lager? Op een groter scherm voeg je daarna ruimte toe.

Twijfel je of je huidige website nog te redden is? Soms is een website met een paar aanpassingen goed te krijgen op mobiel. Is de opbouw zelf het probleem, dan is [je website vernieuwen](/website-redesign) vaak sneller en goedkoper dan blijven repareren. Een bredere checklist staat in [waar moet een goede bedrijfswebsite aan voldoen](/blog/waar-moet-een-goede-bedrijfswebsite-aan-voldoen).

## Hoe HOPI met mobiel omgaat

Elke website die wij maken, is mobile-first: we beginnen bij de telefoon. Onze software test elke pagina automatisch in een echte browser op telefoon, tablet en desktop, op opmaak, links, formulieren en de basis van de snelheid. Daarna kijkt een mens van HOPI het ontwerp na en keurt het goed voordat jij het ziet. Meer over hoe dat werkt, lees je op [website laten maken](/website-laten-maken).

> Benieuwd hoe je bedrijf eruitziet op een telefoon? [Vraag een gratis ontwerp aan](#contact) en bekijk het op je eigen scherm.`,
    related: ["/website-laten-maken", "/website-redesign", "/blog/waar-moet-een-goede-bedrijfswebsite-aan-voldoen", "/blog/beter-vindbaar-in-google"],
    sources: [
      { label: "Google Search Central: Mobile site and mobile-first indexing best practices", url: "https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" },
      { label: "Google Search Central Blog: Mobile-first indexing has landed (2023)", url: "https://developers.google.com/search/blog/2023/10/mobile-first-is-here" },
      { label: "web.dev: How the Core Web Vitals metrics thresholds were defined", url: "https://web.dev/articles/defining-core-web-vitals-thresholds" },
      { label: "W3C: Understanding WCAG 2.2, Target Size (Minimum)", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
    ],
  },
  {
    slug: "maatwerk-website-of-template",
    category: "aanpak",
    keyword: "verschil maatwerk website en template",
    title: "Maatwerk website of template: wat is het verschil?",
    seoTitle: "Maatwerk website of template: het verschil | HOPI",
    description: "Wat is het verschil tussen een maatwerk website en een template? Een eerlijke vergelijking van kosten, doorlooptijd en vrijheid, en wanneer welke past.",
    excerpt: "Een eerlijke vergelijking van kosten, tijd en vrijheid, plus de tussenvorm die vaak het best past.",
    published: "2026-11-28",
    modified: "2026-11-28",
    readMinutes: 5,
    body: `Het verschil tussen een maatwerk website en een template zit in waar het ontwerp vandaan komt. Bij een template begin je met een kant-en-klaar ontwerp dat ook door anderen wordt gebruikt, en vul je dat met je eigen teksten en foto's. Bij maatwerk worden het ontwerp en vaak ook de techniek speciaal voor jouw bedrijf gemaakt. Een template is sneller en goedkoper, maatwerk geeft meer vrijheid maar kost meer tijd en geld. Daartussen zitten vormen die voor veel ondernemers goed werken.

## Wat is een template precies?

Een template, ook wel thema of sjabloon genoemd, is een vooraf gemaakt ontwerp. Websitebouwers en systemen als WordPress hebben er duizenden: voor kappers, aannemers, restaurants. Je kiest er een, vervangt de voorbeeldteksten en foto's, en je website staat.

Dat werkt prima zolang je bedrijf in het sjabloon past. Het wordt lastig als dat niet zo is. Een template voor een restaurant gaat uit van een menukaart en een reserveringsknop; heb je een cateringbedrijf dat met offertes werkt, dan ga je passen en meten. Bovendien zit er in veel templates meer dan je nodig hebt: sliders, animaties en functies die je uitzet, maar waarvan de code vaak toch meelaadt.

## Wat is een maatwerk website?

Bij maatwerk begint een ontwerper met een leeg vel. Eerst komt de vraag wat je bezoekers willen doen en wat jouw bedrijf anders maakt, daarna het ontwerp, en vaak bouwt een ontwikkelaar het geheel speciaal voor jou. Alles is mogelijk: een eigen boekingsproces, een koppeling met je planning, een opbouw die precies bij je klanten past.

Die vrijheid heeft een prijs. Er gaan gesprekken, schetsen en feedbackrondes aan vooraf, dus de doorlooptijd loopt al snel op tot weken of maanden. En omdat alles uniek is, ben je voor aanpassingen vaak afhankelijk van de partij die het heeft gebouwd.

## Het verschil tussen maatwerk en een template op een rij

| Onderdeel | Template | Maatwerk |
| Kosten | Laag, soms alleen een abonnement | Hoog, want alles wordt voor jou gemaakt |
| Doorlooptijd | Dagen | Weken tot maanden |
| Uniek ontwerp | Nee, anderen gebruiken hetzelfde | Ja |
| Afwijkende wensen | Beperkt mogelijk | Alles is mogelijk |
| Snelheid en techniek | Wisselend, vaak veel overbodige code | Zo goed als de bouwer |
| Later aanpassen | Vaak zelf te doen | Vaak via de bouwer |

Twee dingen vallen op. Maatwerk is niet automatisch beter: een slecht gebouwde maatwerksite is trager en lastiger dan een goed template. En een template is niet automatisch goedkoop: wie veel uren steekt in het passend maken van een thema dat er niet voor bedoeld is, betaalt alsnog, in geld of in tijd.

## Wanneer is een template genoeg?

- Je begint net en wilt eerst online staan.
- Je bedrijf lijkt sterk op het voorbeeld in het template, zoals een kapsalon met een paar diensten en een boekingsknop.
- Je hebt geen bijzondere functies nodig.
- Je vindt het geen probleem als een ander bedrijf er ongeveer hetzelfde uitziet.

Ga je zelf aan de slag, controleer een template dan op snelheid en mobiel gebruik voordat je kiest. De demo ziet er altijd mooi uit. Test hem op je eigen telefoon en met PageSpeed Insights, dat de Core Web Vitals meet waarvoor web.dev duidelijke drempels geeft. Wat zelf bouwen je verder kost, lees je in [website laten maken of zelf bouwen](/blog/website-laten-maken-of-zelf-bouwen).

## Wanneer kies je voor maatwerk?

- Je hebt functies die nergens standaard in zitten, zoals een eigen boekingsproces of een koppeling met je software.
- Je wilt je met een ontwerp dat echt van jou is onderscheiden in een drukke markt.
- Je website is je belangrijkste verkoopkanaal en elke extra aanvraag telt.
- Je hebt het budget en de tijd voor een traject van weken.

## De tussenvorm: een eigen ontwerp, ingevuld voor jouw bedrijf

Tussen een template van de plank en volledig maatwerk zit een vorm die steeds vaker voorkomt: een bureau dat met een beperkt aantal eigen ontwerpen werkt en die per bedrijf invult. Zo werkt HOPI ook, en we leggen graag precies uit wat dat wel en niet is.

We hebben twaalf websiteontwerpen die we zelf met de hand hebben ontworpen. Die staan niet in een themawinkel, dus je deelt je website niet met honderden bedrijven die hetzelfde thema hebben gekocht. Jouw website krijgt een van die ontwerpen en wordt gevuld met jouw naam, diensten, openingstijden en teksten. De teksten en foto's maken we daarna samen met jou definitief.

Wat het niet is: volledig maatwerk vanaf een leeg vel. De basisopbouw van het ontwerp ligt vast, en juist daardoor kan het snel en voor een vaste prijs. Heb je meer nodig, zoals een ontwerp dat helemaal op maat is of een reserverings- of boekingssysteem, dan is daar het Premium-pakket voor. Webshops en webapplicaties maken we op offerte. Alle prijzen zijn exclusief {vat} btw.

| Route bij HOPI | Wat je krijgt | Prijs |
| Eigen ontwerp, ingevuld voor jou | Een one-page of complete website in een van onze twaalf ontwerpen | {starter} of {business} |
| Op maat ontworpen | Bijvoorbeeld met een reserverings- of boekingssysteem | {premium} |
| Webshop of webapplicatie | Afhankelijk van wat je nodig hebt | Op offerte |

## Welke past bij jou?

Stel jezelf drie vragen. Wat moet je website kunnen dat een standaardsite niet kan? Hoeveel tijd heb je voordat hij online moet? En hoe erg is het als een ander bedrijf er ongeveer hetzelfde uitziet? Wie op de eerste vraag "niets bijzonders" antwoordt, heeft zelden volledig maatwerk nodig. Wie op de laatste vraag "heel erg" zegt, wil geen template van de plank.

Het makkelijkst beslis je als je iets concreets voor je hebt. Op [ons werk](/werk) staan demo-ontwerpen voor fictieve bedrijven, zodat je de ontwerpen alvast kunt bekijken, en de pakketten staan op [prijzen](/prijzen). Nog concreter is je eigen bedrijf: we maken eerst gratis een ontwerp van je eigen website, zodat je ziet of het past voordat je iets kiest.

> [Vraag een gratis ontwerp aan](#contact) en beoordeel zelf of het genoeg van jou is.`,
    related: ["/website-laten-maken", "/prijzen", "/werk", "/blog/website-laten-maken-of-zelf-bouwen"],
    sources: [
      { label: "web.dev: How the Core Web Vitals metrics thresholds were defined", url: "https://web.dev/articles/defining-core-web-vitals-thresholds" },
      { label: "PageSpeed Insights (Google)", url: "https://pagespeed.web.dev/" },
    ],
  },
  {
    slug: "hoe-werkt-een-ai-website-builder",
    category: "aanpak",
    keyword: "hoe werkt een AI website builder",
    title: "Hoe werkt een AI website builder?",
    seoTitle: "Hoe werkt een AI website builder? | HOPI",
    description: "Hoe werkt een AI website builder, wat doet hij goed en waar gaat het mis? Over vage teksten, verzonnen feiten, toegankelijkheid en de rol van een mens.",
    excerpt: "Wat er gebeurt als je op genereer klikt, waar AI sterk in is en waar je zelf moet blijven opletten.",
    published: "2026-11-28",
    modified: "2026-11-28",
    readMinutes: 5,
    body: `Een AI website builder maakt op basis van een korte omschrijving van je bedrijf automatisch een website: hij kiest een opmaak uit een verzameling ontwerpen, laat een taalmodel de teksten schrijven en vult de pagina's met afbeeldingen. Binnen een paar minuten heb je zo een eerste versie. Dat is een prima startpunt, maar zelden een eindresultaat: de teksten zijn vaak algemeen, soms kloppen de feiten niet en toegankelijkheid krijgt weinig aandacht.

## Wat er gebeurt als je op "genereer" klikt

De meeste AI website builders werken in een paar stappen, ook al lijkt het één knop:

- **Je geeft input.** Meestal je bedrijfsnaam, je branche, een paar zinnen over wat je doet en soms je plaats of je bestaande website.
- **Het systeem kiest een structuur.** Op basis van je branche bepaalt het welke pagina's en blokken er komen: een kop bovenaan, diensten, over ons, contact. Bijna altijd uit een vaste verzameling sjablonen en bouwblokken.
- **Een taalmodel schrijft de teksten.** Een AI-model krijgt je input en de structuur, en schrijft koppen en alinea's die bij je branche passen.
- **Er komen beelden bij.** Vaak stockfoto's die bij je branche passen, of afbeeldingen die door AI zijn gemaakt.
- **Jij past aan en publiceert.** In een editor wijzig je teksten, kleuren en foto's, en zet je de site online.

De slimheid zit dus vooral in het schrijven en in het snel kiezen en vullen van een sjabloon. Het ontwerp zelf komt meestal uit een bibliotheek, net als bij een gewone websitebouwer.

## Waar AI website builders goed in zijn

- **Snelheid.** Van niets naar een complete eerste versie in minuten in plaats van dagen.
- **Het lege vel.** Veel ondernemers lopen vast op de eerste zin. Een conceptversie geeft iets om op te reageren, en reageren is makkelijker dan beginnen.
- **Structuur.** Een AI kent de gebruikelijke opbouw van een website in jouw branche en vergeet zelden een contactpagina.
- **Variaties.** Je laat snel drie versies van een kop maken en kiest de beste.

## Waar het misgaat

### Algemene teksten

Een taalmodel schrijft wat in het algemeen bij jouw soort bedrijf past. Het resultaat leest vlot, maar klinkt als iedereen: "Wij staan voor kwaliteit en service", "Uw tevredenheid is onze prioriteit". Zulke zinnen vertellen een bezoeker niet waarom hij jou zou kiezen. Wat jou anders maakt, weet het model niet, tenzij jij het vertelt.

### Verzonnen feiten

Taalmodellen kunnen overtuigend dingen opschrijven die niet waar zijn. Op een website betekent dat een oprichtingsjaar dat niet klopt, een dienst die je niet levert, een prijs die je nooit hebt genoemd, of zelfs reviews en klantnamen die niet bestaan. Dat laatste is meer dan slordig: nepreviews zijn in Nederland expliciet verboden en de Autoriteit Consument & Markt treedt ertegen op. Ook als een AI de tekst schreef, ben jij verantwoordelijk voor wat er op je website staat.

### Toegankelijkheid

Een website moet ook bruikbaar zijn voor mensen die slecht zien, een schermlezer gebruiken of hun telefoon met één hand bedienen. Gegenereerde sites schieten daar vaak tekort: afbeeldingen zonder beschrijving, te weinig contrast tussen tekst en achtergrond, knoppen die te klein zijn. De richtlijnen van WCAG 2.2 geven houvast, bijvoorbeeld met een minimale maat voor klikbare elementen. Verkoop je online, dan kunnen er sinds 28 juni 2025 ook wettelijke eisen voor digitale toegankelijkheid voor je gelden; op Ondernemersplein lees je of dat voor jouw bedrijf zo is.

### Hetzelfde als de buren

Omdat het ontwerp uit een gedeelde bibliotheek komt en het model voor dezelfde branche hetzelfde soort teksten schrijft, lijken AI-sites binnen een branche sterk op elkaar.

## Vindt Google AI-teksten erg?

Niet als zodanig. Google Search Central schreef in 2023 dat het beloont op kwaliteit van de inhoud, niet op de manier waarop die gemaakt is. Inhoud die vooral bedoeld is om zoekresultaten te manipuleren, blijft wel spam, ook als een AI hem schreef. Voor je website betekent dat: een AI-tekst is prima als hij klopt, specifiek is en je bezoeker helpt. Een gegenereerde tekst die niemand heeft nagelezen, is dat zelden.

## Zo haal je het meeste uit een AI website builder

- **Geef concrete input.** Je plaats, je specialisme, je werkgebied, wat klanten je vaak vragen. Hoe specifieker de input, hoe minder algemeen de tekst.
- **Lees elke zin na.** Klopt het, zou je het zelf zo zeggen, en begrijpt een klant het?
- **Schrap alles wat je niet kunt waarmaken.** Jaartallen, aantallen, keurmerken, reviews.
- **Vervang stockfoto's** door echte foto's van jou, je werk of je zaak.
- **Test op je telefoon.** Kun je bellen met één tik en het formulier invullen met je duim?

## Hoe HOPI AI gebruikt

Wij gebruiken AI ook, en vertellen graag precies hoe. Vraag je een gratis ontwerp aan, dan zoekt onze eigen software openbare informatie over je bedrijf op: je naam, branche, plaats, openingstijden en je huidige website als je die hebt. Daarna schrijft een AI-model (Claude, van Anthropic) een eerste versie van de teksten in een van onze twaalf websiteontwerpen, die we zelf met de hand hebben ontworpen.

Dan komen de controles. De software test elke pagina automatisch in een echte browser, op telefoon, tablet en desktop: opmaak, links, formulieren en de basis van de snelheid. Vervolgens bekijkt een mens van HOPI het ontwerp en keurt het goed voordat jij het krijgt. We verzinnen geen feiten: geen reviews, prijzen, teamleden of beweringen die je bedrijf zelf niet heeft aangeleverd. De teksten en foto's maken we daarna samen met jou definitief.

Het verschil met een AI website builder is dus niet dat er geen AI in zit, maar dat AI het begin is in plaats van het eindproduct. Meer over deze aanpak lees je op [AI website laten maken](/ai-website-laten-maken). Twijfel je tussen een vast ontwerp en volledig maatwerk, lees dan [maatwerk website of template](/blog/maatwerk-website-of-template).

> Benieuwd wat dit voor je eigen bedrijf oplevert? [Vraag een gratis ontwerp aan](#contact). Je betaalt pas als het je bevalt.`,
    related: ["/ai-website-laten-maken", "/website-laten-maken", "/blog/maatwerk-website-of-template", "/blog/website-laten-maken-of-zelf-bouwen"],
    sources: [
      { label: "Google Search Central Blog: Google Search's guidance about AI-generated content (2023)", url: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content" },
      { label: "ACM: Strengere regels voor online verkopers (verbod op nepreviews)", url: "https://www.acm.nl/nl/publicaties/acm-strengere-regels-voor-online-verkopers" },
      { label: "W3C: Understanding WCAG 2.2, Target Size (Minimum)", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
      { label: "Ondernemersplein: Regels voor digitale toegankelijkheid", url: "https://ondernemersplein.overheid.nl/wetten-en-regels/regels-voor-digitale-toegankelijkheid/" },
    ],
  },
  {
    slug: "meer-klanten-via-je-website",
    category: "vindbaarheid",
    keyword: "hoe krijg je meer klanten via je website",
    title: "Hoe krijg je meer klanten via je website?",
    seoTitle: "Meer klanten via je website: zo pak je het aan | HOPI",
    description: "Hoe krijg je meer klanten via je website? Een helder aanbod, contact in één tik, vertrouwen met echte informatie, lokale vindbaarheid en meten wat werkt.",
    excerpt: "Meer bezoekers helpt pas als ze ook bellen of mailen. Zo zorg je dat ze dat doen.",
    published: "2026-11-28",
    modified: "2026-11-28",
    readMinutes: 5,
    body: `Meer klanten via je website krijg je door twee dingen tegelijk te doen: zorgen dat de juiste mensen je vinden, en zorgen dat ze daarna ook contact opnemen. Dat tweede wordt vaak vergeten. Een helder aanbod, contact in één tik en echte informatie die vertrouwen geeft, leveren vaak meer op dan extra bezoekers. Daarna meet je wat werkt, zodat je niet op gevoel verbetert.

## Begin bij de bezoekers die al komen

Bij "meer klanten via je website" denken de meeste ondernemers aan meer bezoekers. Logisch, maar niet altijd de snelste weg. Een rekenvoorbeeld: stel dat honderd mensen per maand je website bekijken en twee daarvan bellen. Krijg je dat naar vier, dan verdubbel je je aanvragen zonder één extra bezoeker. Marketeers noemen dat conversie: het deel van je bezoekers dat doet wat je hoopt.

Waarom haken bezoekers af? Meestal om een van drie redenen: ze snappen niet snel genoeg wat je doet, ze vinden niet hoe ze contact opnemen, of ze vertrouwen het niet helemaal. Die drie pak je hieronder een voor een aan.

## 1. Maak in één zin duidelijk wat je doet, voor wie en waar

Bovenaan je homepage beslist een bezoeker of hij blijft. "Welkom bij Jansen Installatietechniek" vertelt hem niets. "Cv-ketel kapot? We komen in Amersfoort en omgeving vaak nog dezelfde dag" vertelt hem wat hij wil weten.

Een sterk aanbod beantwoordt drie vragen:

- **Wat lever je?** In de woorden van je klant, niet in vaktaal.
- **Voor wie?** Particulieren, bedrijven, een bepaalde regio of branche.
- **Waarom jij?** Iets concreets: snel ter plaatse, een vaste prijs, een specialisme, open op zaterdag.

Zet daaronder je belangrijkste diensten, elk met een eigen blok of pagina. Wie zoekt op één specifieke dienst, wil daarover lezen en niet over alles wat je doet.

## 2. Contact opnemen kost één tik

Hoe meer stappen tussen interesse en contact, hoe meer mensen onderweg afhaken. Op een telefoon geldt dat dubbel.

- **Een aanklikbaar telefoonnummer**, bovenaan en op elke pagina.
- **Eén duidelijke knop** met een werkwoord: "Plan een afspraak", "Vraag een offerte aan", "Reserveer een tafel".
- **Een kort formulier.** Naam, telefoon of e-mail en een vraag. Elk extra verplicht veld kost aanvragen.
- **WhatsApp**, als je daar ook echt snel op reageert.
- **Een belofte over je reactietijd**, zoals "We reageren binnen één werkdag", als je die kunt waarmaken.

Test het zelf: hoeveel tikken heb je op je telefoon nodig om je eigen bedrijf te bellen? Waarom dat zo zwaar weegt, lees je in [waarom een mobiele website belangrijk is](/blog/waarom-is-een-mobiele-website-belangrijk).

## 3. Win vertrouwen met echte informatie

Een bezoeker die jou niet kent, zoekt bewijs dat je bestaat en goed werk levert. Dat bewijs moet echt zijn.

- **Foto's van jezelf, je team en je werk.** Een echte foto van je bus of je werkplaats zegt meer dan een glimmende stockfoto.
- **Voorbeelden van je werk**, met een korte uitleg van wat de vraag was en wat je deed.
- **Echte reviews**, bijvoorbeeld uit je Google Bedrijfsprofiel, onder de naam die de klant zelf gebruikte.
- **Concrete gegevens**: je adres of werkgebied, je KvK-nummer en je openingstijden.
- **Duidelijkheid over prijzen**, al is het maar een indicatie of een vanafprijs.

Verzin nooit reviews, klanten of cijfers. Het is verleidelijk om een paar enthousiaste quotes te schrijven als je nog weinig reviews hebt, maar nepreviews zijn in Nederland expliciet verboden en de ACM treedt ertegen op. Bovendien prikken klanten er vaak doorheen, en dan ben je meer kwijt dan je won. Heb je nog weinig reviews, vraag tevreden klanten er dan gewoon om, op het moment dat ze tevreden zijn.

## 4. Zorg dat mensen in de buurt je vinden

Voor de meeste lokale bedrijven komen nieuwe klanten via Google: iemand zoekt je vak met een plaatsnaam erbij, of "in de buurt". Volgens Google worden de lokale resultaten vooral bepaald door relevantie, afstand en bekendheid. Afstand kun je niet veranderen, de andere twee wel.

| Wat | Waarom het helpt |
| Een volledig ingevuld Google Bedrijfsprofiel | Google gebruikt de informatie in je profiel voor de lokale resultaten |
| Overal dezelfde naam, hetzelfde adres en telefoonnummer | Google weet zeker dat het om hetzelfde bedrijf gaat |
| Een pagina per dienst, met je plaats erin | Je sluit aan op wat mensen echt intypen |
| Reviews, en je reacties daarop | Ze tellen mee voor je bekendheid en overtuigen nieuwe klanten |

Uitgebreider lees je dit in [beter vindbaar worden in Google](/blog/beter-vindbaar-in-google). Let wel op de volgorde: maak eerst je website overtuigend en stuur er dan pas meer bezoekers heen. Anders betaal je, in tijd of advertentiebudget, voor bezoekers die alsnog afhaken.

## 5. Meet wat werkt

Zonder meten weet je niet of een aanpassing iets opleverde. Twee gratis tools van Google zijn genoeg om te beginnen:

- **Google Search Console** laat zien bij welke zoekopdrachten je website verschijnt, hoe vaak erop geklikt wordt en of Google problemen ziet met je pagina's.
- **Google Analytics 4 (GA4)** laat zien hoeveel bezoekers je hebt, waar ze vandaan komen en wat ze doen. Markeer klikken op je telefoonnummer, je WhatsApp-knop en verzonden formulieren als belangrijke gebeurtenis (key event), zodat je ziet hoeveel aanvragen je website oplevert.

Gebruik je GA4, regel dan ook je cookiemelding en privacyverklaring goed. Kijk daarna eens per maand naar dezelfde paar cijfers: het aantal aanvragen, waar ze vandaan kwamen en welke pagina's het best werken. Verander één ding tegelijk, dan weet je wat het effect was. En vraag nieuwe klanten gewoon hoe ze je gevonden hebben. Dat ene vraagje vertelt soms meer dan een dashboard.

## Waar begin je?

Je hoeft niet alles tegelijk te doen. Een goede volgorde:

- Herschrijf de bovenkant van je homepage tot één heldere zin.
- Maak je telefoonnummer aanklikbaar en je formulier korter.
- Zet echte foto's en echte reviews op je website.
- Vul je Google Bedrijfsprofiel helemaal in.
- Stel GA4 en Search Console in en kijk na een maand wat er veranderd is.

Staat je huidige website ver af van deze punten, dan is opnieuw beginnen vaak sneller dan alles los repareren. Elke website van HOPI begint bij deze basis: een duidelijke kop, contact in één tik, pagina's die Google goed kan lezen en alleen informatie die klopt. Het instellen van je Google Bedrijfsprofiel kan er als extra bij. Meer lees je op [website laten maken](/website-laten-maken) en [website vernieuwen](/website-redesign).

> Wil je zien hoe jouw website er met deze basis uitziet? [Vraag een gratis ontwerp aan](#contact). Bevalt het niet, dan betaal je niets.`,
    related: ["/website-laten-maken", "/website-redesign", "/blog/beter-vindbaar-in-google", "/blog/waarom-is-een-mobiele-website-belangrijk"],
    sources: [
      { label: "Google Bedrijfsprofiel Help: Je lokale positie op Google verbeteren", url: "https://support.google.com/business/answer/7091?hl=nl" },
      { label: "ACM: Strengere regels voor online verkopers (verbod op nepreviews)", url: "https://www.acm.nl/nl/publicaties/acm-strengere-regels-voor-online-verkopers" },
      { label: "Google Analytics Help: Gebeurtenissen markeren als belangrijke gebeurtenissen", url: "https://support.google.com/analytics/answer/13128484?hl=nl" },
    ],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
