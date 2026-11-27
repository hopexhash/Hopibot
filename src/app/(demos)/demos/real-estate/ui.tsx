"use client";

import { createContext, useContext, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Heart, Search as SearchIcon, X } from "lucide-react";
import { DemoForm, useMenu } from "@/demos/kit";
import { IMAGES } from "@/demos/images";
import { Pic } from "@/demos/pic";

const I = IMAGES["real-estate"];

/* ── The portfolio of homes ── */
type Mode = "koop" | "huur";
type Kind = "appartement" | "penthouse" | "stadswoning" | "villa";
type Sort = "aanbevolen" | "nieuw" | "prijs-op" | "prijs-af" | "groot";
type AgentKey = "maarten" | "liesbeth" | "noor" | "sem";
type Shot = { img: keyof typeof I; alt: string; cap: string; pos?: string };
type Home = {
  id: string;
  mode: Mode;
  kind: Kind;
  kindLabel: string;
  street: string;
  hood: string;
  city: string;
  region?: string;
  price: number;
  area: number;
  plot?: number;
  rooms: number;
  beds: number;
  baths: number;
  year: number;
  label: string;
  outside: string;
  parking: string;
  tag?: string;
  days: number;
  line: string;
  text: string[];
  features: string[];
  agent: AgentKey;
  shots: Shot[];
};

const AGENTS: Record<AgentKey, { name: string; first: string; role: string; img: keyof typeof I; alt: string; pos?: string }> = {
  maarten: { name: "Maarten Verhoeven", first: "Maarten", role: "Partner · grachtenpanden en monumenten", img: "agent-3", alt: "Portret van makelaar Maarten Verhoeven in een grijze trui" },
  liesbeth: { name: "Liesbeth van Dalen", first: "Liesbeth", role: "Partner · villa's in Kennemerland en Het Gooi", img: "agent-4", alt: "Portret van makelaar Liesbeth van Dalen, buiten bij avondlicht", pos: "50% 30%" },
  noor: { name: "Noor Hendriks", first: "Noor", role: "Makelaar · Oud-Zuid, Zuidas en verhuur", img: "agent-2", alt: "Portret van makelaar Noor Hendriks in een gestreepte blouse" },
  sem: { name: "Sem de Graaf", first: "Sem", role: "Aankoopmakelaar · IJburg en nieuwbouw", img: "agent-1", alt: "Portret van aankoopmakelaar Sem de Graaf in een lichtblauw overhemd" },
};

const HOMES: Home[] = [
  {
    id: "oranje-nassaulaan",
    mode: "koop",
    kind: "stadswoning",
    kindLabel: "Herenhuis",
    street: "Oranje Nassaulaan",
    hood: "Willemspark, Oud-Zuid",
    city: "Amsterdam",
    price: 3250000,
    area: 286,
    plot: 198,
    rooms: 8,
    beds: 5,
    baths: 3,
    year: 1908,
    label: "B",
    outside: "Tuin op het zuidwesten, 14 meter diep",
    parking: "Vergunning, twee plaatsen",
    tag: "Nieuw",
    days: 3,
    line: "Herenhuis uit 1908 met een open eiken trap, een stalen pui over de volle breedte en een tuin op het zuidwesten.",
    text: [
      "Op loopafstand van het Vondelpark staat dit herenhuis uit 1908, in 2021 tot op het casco vernieuwd. De begane grond is één doorlopende ruimte van voor naar achter geworden, met een stalen pui over de volle breedte en een open eiken trap als middelpunt.",
      "Boven liggen vijf slaapkamers over twee verdiepingen. De hoofdslaapkamer heeft een eigen badkamer en openslaande deuren naar het balkon. Vloerverwarming, een warmtepomp en nieuw dubbel glas brengen het huis op energielabel B, zeldzaam voor dit bouwjaar.",
    ],
    features: ["Fundering hersteld in 2021, met garantie", "Eigen grond, geen erfpacht", "Keuken met kookeiland en natuurstenen blad", "Dakterras van 22 m²"],
    agent: "noor",
    shots: [
      { img: "living-stairs", alt: "Lichte woonkamer met open trap, twee banken en een hond op het kleed", cap: "Woonkamer met open trap" },
      { img: "chair", alt: "Leeshoek met gele fauteuil, staande lamp en visgraatvloer", cap: "Leeshoek op de eerste verdieping" },
      { img: "bedroom", alt: "Slaapkamer met openslaande deuren en een bed in grijstinten", cap: "Hoofdslaapkamer" },
    ],
  },
  {
    id: "aerdenhout",
    mode: "koop",
    kind: "villa",
    kindLabel: "Villa",
    street: "Boekenroodeweg",
    hood: "Aerdenhout",
    city: "Aerdenhout",
    region: "Kennemerland",
    price: 4150000,
    area: 412,
    plot: 2140,
    rooms: 9,
    beds: 5,
    baths: 4,
    year: 2017,
    label: "A",
    outside: "Parktuin van 2.140 m² met oude bomen",
    parking: "Garage voor drie auto's",
    tag: "Op de omslag",
    days: 9,
    line: "Moderne villa van zwart staal en glas, ontworpen rond de oude boom die al een eeuw op de kavel staat.",
    text: [
      "Architectuur die om een boom heen is getekend: de oude boom in de tuin bepaalde waar de woonkamer kwam, hoe hoog de pui werd en waar 's avonds het licht valt. Het resultaat is een villa van zwart staal, glas en hout die groter is dan ze vanaf de straat lijkt.",
      "De leefverdieping van 140 m² ligt gelijkvloers met de tuin. Daarboven vijf slaapkamers en vier badkamers, daaronder een werkstudio met eigen ingang en een garage voor drie auto's. Het station ligt op zeven minuten fietsen, het strand op een kwartier.",
    ],
    features: ["Aardwarmte en 38 zonnepanelen", "Domotica voor licht, klimaat en beveiliging", "Werkstudio met eigen ingang", "Vrij uitzicht, geen inkijk"],
    agent: "liesbeth",
    shots: [
      { img: "hero", alt: "Moderne villa met verlichte glazen gevel onder een oude boom bij schemering", cap: "Tuinzijde bij schemer" },
      { img: "living-modern", alt: "Open leefruimte met witte bank, houten wand en glazen pui naar de tuin", cap: "Leefverdieping" },
      { img: "bedroom", alt: "Slaapkamer met openslaande deuren en een bed in grijstinten", cap: "Hoofdslaapkamer" },
    ],
  },
  {
    id: "keizersgracht",
    mode: "koop",
    kind: "appartement",
    kindLabel: "Bel-etage",
    street: "Keizersgracht",
    hood: "Grachtengordel",
    city: "Amsterdam",
    price: 1895000,
    area: 168,
    rooms: 5,
    beds: 3,
    baths: 2,
    year: 1672,
    label: "C",
    outside: "Stadstuin van 48 m² op het oosten",
    parking: "Vergunning",
    days: 16,
    line: "Bel-etage en tuinverdieping van een rijksmonument uit 1672, met plafonds van 3,60 meter en een eigen stadstuin.",
    text: [
      "Twee woonlagen in een grachtenpand uit 1672, aan het rustige deel van de gracht. De voorkamer kijkt over het water, de achterkamer over de tuin. Daartussen is de oorspronkelijke indeling bewaard: hoge deuren, marmeren schouw, balken in het zicht.",
      "Op de tuinverdieping liggen drie slaapkamers, twee badkamers en een bijkeuken met eigen opgang. De fundering is in 2016 hersteld en de vereniging van eigenaars is klein, actief en financieel gezond.",
    ],
    features: ["Rijksmonument, onderhoud fiscaal aftrekbaar", "Erfpacht eeuwigdurend afgekocht", "Plafondhoogte 3,60 meter", "Berging en wijnkelder in het souterrain"],
    agent: "maarten",
    shots: [
      { img: "living-soft", alt: "Lichte voorkamer met hoekbank, ronde salontafel en hoge ramen", cap: "Voorkamer" },
      { img: "chair", alt: "Zijkamer met gele fauteuil, staande lamp en visgraatvloer", cap: "Zijkamer" },
      { img: "canal-dusk", alt: "Grachtenpanden met verlichte ramen, weerspiegeld in het water bij schemering", cap: "De gracht voor de deur" },
    ],
  },
  {
    id: "bloemendaal",
    mode: "koop",
    kind: "villa",
    kindLabel: "Villa",
    street: "Hoge Duin en Daalseweg",
    hood: "Bloemendaal",
    city: "Bloemendaal",
    region: "Kennemerland",
    price: 3675000,
    area: 365,
    plot: 1480,
    rooms: 8,
    beds: 5,
    baths: 3,
    year: 2019,
    label: "A+",
    outside: "Tuin met verwarmd zwembad en buitenkeuken",
    parking: "Oprit en dubbele carport",
    days: 21,
    line: "Witte villa aan de duinrand met verwarmd zwembad, overdekte terrassen en vijf slaapkamers.",
    text: [
      "Tegen de duinrand, op tien minuten fietsen van zee, ligt deze witte villa uit 2019. De woonlaag opent zich over de volle breedte naar het terras en het zwembad. In de zomer schuift de pui weg en is de grens tussen binnen en buiten verdwenen.",
      "Vijf slaapkamers, waarvan twee met een eigen terras op de verdieping. Het zwembad wordt verwarmd met restwarmte van de warmtepomp en de buitenkeuken staat onder een vaste overkapping, zodat het seizoen hier in maart begint.",
    ],
    features: ["Zwembad van 12 bij 4 meter, verwarmd", "Overdekte buitenkeuken", "Twee slaapkamers met eigen terras", "Tuinontwerp met inheemse duinbeplanting"],
    agent: "liesbeth",
    shots: [
      { img: "villa-white", alt: "Witte villa met terrassen op twee verdiepingen en een zwembad in de tuin", cap: "Tuinzijde met zwembad" },
      { img: "living-wide", alt: "Brede woonkamer met lage banken en ramen over de volle lengte naar de tuin", cap: "Woonkamer" },
      { img: "living-stairs", alt: "Zitkamer met open trap en glazen pui", cap: "Zitkamer en trap" },
    ],
  },
  {
    id: "zuidas",
    mode: "koop",
    kind: "penthouse",
    kindLabel: "Penthouse",
    street: "George Gershwinlaan",
    hood: "Zuidas",
    city: "Amsterdam",
    price: 2475000,
    area: 212,
    rooms: 5,
    beds: 3,
    baths: 2,
    year: 2020,
    label: "A++",
    outside: "Daktuin van 86 m² op woonkamerhoogte",
    parking: "Twee plaatsen in de garage",
    tag: "Nieuw",
    days: 5,
    line: "Penthouse op de bovenste woonlaag van een kleinschalig gebouw, met een daktuin van 86 m² langs de hele woonkamer.",
    text: [
      "Een penthouse dat aanvoelt als een bungalow: alles ligt op één laag en de woonkamer van veertien meter breed grenst over de volle lengte aan de eigen daktuin. Die is door een hovenier aangelegd en heeft een automatische beregening.",
      "Drie slaapkamers, twee badkamers en een werkkamer aan de stille kant. De lift komt met een sleutel in de eigen hal uit. Twee parkeerplaatsen met laadpunt en een berging in de garage horen erbij.",
    ],
    features: ["Lift tot in de eigen hal", "Conciërge en pakketservice in het gebouw", "Twee parkeerplaatsen met laadpunt", "Station Zuid op vier minuten lopen"],
    agent: "noor",
    shots: [
      { img: "living-wide", alt: "Brede woonkamer met lage banken en ramen over de volle lengte naar de daktuin", cap: "Woonkamer aan de daktuin" },
      { img: "living-modern", alt: "Open keuken en zithoek met houten wand", cap: "Keuken en zithoek" },
      { img: "apartments", alt: "Gevel van een modern appartementengebouw met balkons tegen een blauwe lucht", cap: "Het gebouw", pos: "50% 60%" },
    ],
  },
  {
    id: "ijburg",
    mode: "koop",
    kind: "appartement",
    kindLabel: "Appartement",
    street: "Bert Haanstrakade",
    hood: "IJburg",
    city: "Amsterdam",
    price: 925000,
    area: 124,
    rooms: 4,
    beds: 3,
    baths: 1,
    year: 2011,
    label: "A+",
    outside: "Balkon op het zuiden, 11 m²",
    parking: "Eén plaats in de garage",
    days: 12,
    line: "Hoekappartement met visgraatvloer, ramen aan drie kanten en een balkon op het zuiden boven het water.",
    text: [
      "Een hoekappartement op de vierde verdieping, met ramen aan drie kanten en uitzicht over het water. De eiken visgraatvloer ligt door het hele huis en de keuken is in 2023 vernieuwd.",
      "Drie slaapkamers, een ruime badkamer met bad en inloopdouche, en een balkon waar de zon tot het eind van de middag blijft. De tram naar het Centraal Station stopt om de hoek en het stadsstrand ligt op vijf minuten lopen.",
    ],
    features: ["Erfpacht afgekocht tot 2058", "Stadsverwarming en vloerverwarming", "Parkeerplaats en berging in de garage", "Servicekosten € 214 per maand"],
    agent: "sem",
    shots: [
      { img: "apartment-blue", alt: "Woonkamer met blauwe bank, visgraatvloer en een lange witte kastenwand", cap: "Woonkamer" },
      { img: "plants", alt: "Zithoek met veel planten, boekenkast en een groot raam", cap: "Zithoek aan het raam" },
      { img: "apartments", alt: "Gevel van een modern appartementengebouw met balkons tegen een blauwe lucht", cap: "Het gebouw", pos: "50% 60%" },
    ],
  },
  {
    id: "blaricum",
    mode: "koop",
    kind: "villa",
    kindLabel: "Landhuis",
    street: "Eemnesserweg",
    hood: "Blaricum",
    city: "Blaricum",
    region: "Het Gooi",
    price: 2395000,
    area: 274,
    plot: 1860,
    rooms: 7,
    beds: 4,
    baths: 2,
    year: 1934,
    label: "B",
    outside: "Tuin rondom van 1.860 m² met gastenverblijf",
    parking: "Oprit voor vier auto's",
    days: 30,
    line: "Landhuis onder een steile kap, met een vrijstaand gastenverblijf en een tuin die overgaat in de eng.",
    text: [
      "Een landhuis uit 1934 dat in 2018 van binnen opnieuw is opgebouwd, met behoud van de steile kap en de houten gevels. De woonkeuken ligt in de nieuwe aanbouw en heeft een vide tot in de nok.",
      "Vier slaapkamers in het hoofdhuis en een vrijstaand gastenverblijf met eigen badkamer. De tuin loopt aan de achterzijde zonder schutting over in de eng, waardoor het uitzicht blijft zoals het is.",
    ],
    features: ["Gastenverblijf van 38 m² met badkamer", "Houtkachel en vloerverwarming", "Tuin op het zuiden, grenzend aan de eng", "Dorpskern op acht minuten lopen"],
    agent: "liesbeth",
    shots: [
      { img: "house-night", alt: "Landhuis met steile kap en verlichte ramen in een donkere tuin", cap: "Voorzijde in de avond" },
      { img: "living-soft", alt: "Lichte woonkamer met hoekbank en ronde salontafel", cap: "Woonkamer" },
      { img: "bedroom", alt: "Slaapkamer met openslaande deuren naar de tuin", cap: "Slaapkamer aan de tuin" },
    ],
  },
  {
    id: "amstelveen",
    mode: "koop",
    kind: "villa",
    kindLabel: "Vrijstaande woning",
    street: "Amsterdamseweg",
    hood: "Amstelveen, bij het Amsterdamse Bos",
    city: "Amstelveen",
    price: 1650000,
    area: 198,
    plot: 410,
    rooms: 6,
    beds: 4,
    baths: 2,
    year: 2022,
    label: "A+++",
    outside: "Tuin op het westen van 180 m²",
    parking: "Oprit met laadpaal",
    tag: "Nieuw",
    days: 2,
    line: "Energieneutrale woning van hout en beton, op vijf minuten fietsen van het Amsterdamse Bos.",
    text: [
      "Een vrijstaande woning uit 2022 die meer energie opwekt dan ze gebruikt. De gevel van onbehandeld hout vergrijst mee met de jaren, binnen is het beton van de vloeren in het zicht gelaten.",
      "Zes kamers, waarvan vier slaapkamers, en een tuin op het westen met een oprit voor twee auto's. Scholen, het Amsterdamse Bos en de snelle tram naar de Zuidas liggen allemaal binnen tien minuten.",
    ],
    features: ["Energielabel A+++, geen gasaansluiting", "24 zonnepanelen en thuisbatterij", "Laadpaal op eigen terrein", "Opgeleverd met tien jaar bouwgarantie"],
    agent: "sem",
    shots: [
      { img: "house-wood", alt: "Moderne vrijstaande woning met houten gevel en een voortuin met stapstenen", cap: "Voorzijde" },
      { img: "living-modern", alt: "Open leefruimte met witte bank, houten wand en glazen pui", cap: "Leefruimte" },
      { img: "chair", alt: "Hoek van de woonkamer met gele fauteuil en staande lamp", cap: "Zithoek" },
    ],
  },
  {
    id: "vinkeveen",
    mode: "koop",
    kind: "villa",
    kindLabel: "Villa aan het water",
    street: "Baambrugse Zuwe",
    hood: "Vinkeveense Plassen",
    city: "Vinkeveen",
    price: 2950000,
    area: 318,
    plot: 1120,
    rooms: 7,
    beds: 4,
    baths: 3,
    year: 2015,
    label: "A+",
    outside: "Zwembad, steiger en botenhuis",
    parking: "Garage en oprit",
    tag: "Uitgelicht",
    days: 14,
    line: "Witte villa aan de Vinkeveense Plassen, met een zwembad dat optisch overloopt in het water erachter.",
    text: [
      "Twintig minuten van de Zuidas en toch aan open water. Deze villa uit 2015 staat op een van de breedste kavels van de Zuwe, met de woonkamer, het terras en het zwembad op één lijn naar de plas.",
      "De eerste verdieping steekt als een houten luifel over het terras, zodat u ook bij regen buiten zit. Vier slaapkamers, drie badkamers en een botenhuis met ruimte voor een sloep van acht meter.",
    ],
    features: ["Eigen steiger van 18 meter", "Botenhuis met elektrische lift", "Zwembad van 14 bij 4 meter", "Schuifpui over 11 meter breedte"],
    agent: "liesbeth",
    shots: [
      { img: "villa-pool", alt: "Witte villa met houten luifel en een lang zwembad langs het terras", cap: "Terras en zwembad" },
      { img: "living-modern", alt: "Open leefruimte met witte bank, houten wand en glazen pui", cap: "Woonkamer" },
      { img: "bedroom", alt: "Slaapkamer met openslaande deuren en een bed in grijstinten", cap: "Hoofdslaapkamer" },
      { img: "living-wide", alt: "Tuinkamer met lage banken en ramen over de volle lengte", cap: "Tuinkamer" },
    ],
  },
  {
    id: "prinsengracht",
    mode: "huur",
    kind: "appartement",
    kindLabel: "Appartement",
    street: "Prinsengracht",
    hood: "Jordaan",
    city: "Amsterdam",
    price: 3950,
    area: 112,
    rooms: 3,
    beds: 2,
    baths: 1,
    year: 1890,
    label: "B",
    outside: "Frans balkon aan de gracht",
    parking: "Vergunning",
    tag: "Gemeubileerd",
    days: 4,
    line: "Gemeubileerd appartement op de tweede verdieping, met drie ramen aan de gracht en een werkkamer aan de hofzijde.",
    text: [
      "Een licht appartement op de tweede verdieping van een pand uit 1890, met drie hoge ramen aan de gracht. De eigenaar woont de komende jaren in het buitenland en verhuurt het huis zoals het is: met boeken, planten en een goede keuken.",
      "Twee slaapkamers, waarvan één als werkkamer is ingericht, en een badkamer met bad. Huurperiode minimaal twaalf maanden, in overleg te verlengen.",
    ],
    features: ["Volledig gemeubileerd en gestoffeerd", "Minimaal twaalf maanden", "Waarborgsom twee maanden huur", "Huisdieren in overleg"],
    agent: "noor",
    shots: [
      { img: "plants", alt: "Lichte woonkamer met veel planten, boekenkast en een groot raam", cap: "Woonkamer" },
      { img: "apartment-blue", alt: "Zitkamer met blauwe bank en visgraatvloer", cap: "Zitkamer" },
      { img: "canal-day", alt: "Gracht met bomen en woonboten op een zomerdag", cap: "Uitzicht vanaf de brug" },
    ],
  },
  {
    id: "apollolaan",
    mode: "huur",
    kind: "appartement",
    kindLabel: "Appartement",
    street: "Apollolaan",
    hood: "Apollobuurt, Oud-Zuid",
    city: "Amsterdam",
    price: 5750,
    area: 164,
    rooms: 5,
    beds: 3,
    baths: 2,
    year: 1931,
    label: "A",
    outside: "Balkon op het zuiden over de volle breedte",
    parking: "Garagebox",
    days: 10,
    line: "Gestoffeerd appartement van 164 m² in een gebouw uit 1931, met visgraatparket, twee badkamers en een eigen garagebox.",
    text: [
      "Een royaal appartement op de eerste verdieping van een gebouw uit 1931, in 2022 gerenoveerd met behoud van de stalen kozijnen en het visgraatparket. De woonkamer en suite is ruim negen meter diep.",
      "Drie slaapkamers, twee badkamers en een keuken met alle apparatuur. Het appartement wordt gestoffeerd verhuurd en heeft een eigen garagebox in de straat erachter.",
    ],
    features: ["Gestoffeerd, direct te betrekken", "Garagebox inbegrepen", "Huurtermijn 24 maanden", "Waarborgsom twee maanden huur"],
    agent: "noor",
    shots: [
      { img: "chair", alt: "Woonkamer met gele fauteuil, staande lamp en visgraatparket", cap: "Woonkamer" },
      { img: "living-soft", alt: "Zitkamer met hoekbank en ronde salontafel", cap: "Zitkamer" },
      { img: "bedroom", alt: "Slaapkamer met openslaande deuren", cap: "Slaapkamer" },
    ],
  },
  {
    id: "noordwijk",
    mode: "huur",
    kind: "villa",
    kindLabel: "Villa",
    street: "Duinweg",
    hood: "Noordwijk aan Zee",
    city: "Noordwijk",
    price: 9500,
    area: 340,
    plot: 1250,
    rooms: 8,
    beds: 5,
    baths: 4,
    year: 2018,
    label: "A+",
    outside: "Zwembad en terras op het zuiden",
    parking: "Garage voor twee auto's",
    tag: "Per direct",
    days: 7,
    line: "Villa in de duinen met vijf slaapkamers, een zwembad met uitzicht en het strand op loopafstand.",
    text: [
      "Hoog in de duinen ligt deze villa uit 2018, verhuurd voor een periode van één tot drie jaar. De woonlaag kijkt over het zwembad en de daken heen naar zee.",
      "Vijf slaapkamers, vier badkamers en een garage voor twee auto's. De tuin en het zwembad worden onderhouden door de vaste hovenier, de kosten daarvan zitten in de huur.",
    ],
    features: ["Tuin- en zwembadonderhoud inbegrepen", "Gestoffeerd of gemeubileerd, naar keuze", "Geschikt voor expats, huurcontract in het Engels mogelijk", "Internationale school op twintig minuten"],
    agent: "liesbeth",
    shots: [
      { img: "villa-coast", alt: "Villa met terrassen in lagen boven een zwembad in de duinen", cap: "Tuinzijde met zwembad" },
      { img: "living-wide", alt: "Brede woonkamer met lage banken en ramen over de volle lengte", cap: "Woonkamer" },
      { img: "bedroom", alt: "Slaapkamer met openslaande deuren", cap: "Slaapkamer" },
    ],
  },
];

const PLACES = ["Amsterdam", "Grachtengordel", "Jordaan", "Oud-Zuid", "Zuidas", "IJburg", "Amstelveen", "Aerdenhout", "Bloemendaal", "Blaricum", "Vinkeveen", "Noordwijk", "Kennemerland", "Het Gooi"];
const KINDS: [Kind | "alle", string][] = [
  ["alle", "Alle typen"],
  ["appartement", "Appartement"],
  ["penthouse", "Penthouse"],
  ["stadswoning", "Stadswoning"],
  ["villa", "Villa of landhuis"],
];
const SORTS: [Sort, string][] = [
  ["aanbevolen", "Aanbevolen"],
  ["nieuw", "Nieuwste eerst"],
  ["prijs-op", "Prijs oplopend"],
  ["prijs-af", "Prijs aflopend"],
  ["groot", "Grootste eerst"],
];
const STEPS: Record<Mode, number[]> = { koop: [1000000, 1500000, 2000000, 3000000, 4000000], huur: [4000, 6000, 9000] };

const dots = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const euro = (n: number) => `€\u00a0${dots(n)}`;
const suffix = (m: Mode) => (m === "koop" ? "k.k." : "per maand");
const two = (n: number) => String(n).padStart(2, "0");
const plural = (n: number) => `${n} ${n === 1 ? "woning" : "woningen"}`;
const inPlace = (h: Home, q: string) => !q.trim() || `${h.street} ${h.hood} ${h.city} ${h.region ?? ""}`.toLowerCase().includes(q.trim().toLowerCase());

/* ── Shared state: filters, favourites and the opened home ── */
type Filters = { mode: Mode; q: string; min: number; max: number; kind: Kind | "alle"; beds: number; sort: Sort; saved: boolean };
const START: Filters = { mode: "koop", q: "", min: 0, max: 0, kind: "alle", beds: 0, sort: "aanbevolen", saved: false };

type Store = {
  f: Filters;
  set: (patch: Partial<Filters>) => void;
  favs: string[];
  toggleFav: (id: string) => void;
  home: Home | null;
  panelOpen: boolean;
  openHome: (id: string) => void;
  closeHome: () => void;
};
const Ctx = createContext<Store | null>(null);
const useEstate = () => {
  const s = useContext(Ctx);
  if (!s) throw new Error("Estate ontbreekt");
  return s;
};

const toListings = () => {
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  requestAnimationFrame(() => document.getElementById("aanbod-lijst")?.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" }));
};

/** Wraps the whole site: the search bar, the listings, the neighbourhoods and the detail view share one state. */
export function Estate({ children }: { children: ReactNode }) {
  const [f, setF] = useState<Filters>(START);
  const [favs, setFavs] = useState<string[]>([]);
  const [homeId, setHomeId] = useState<string | null>(null);
  const panel = useMenu();
  const opener = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  // Focus returns to the button that opened the detail view.
  useEffect(() => {
    if (wasOpen.current && !panel.open) opener.current?.focus({ preventScroll: true });
    wasOpen.current = panel.open;
  }, [panel.open]);

  const store: Store = {
    f,
    set: (patch) =>
      setF((cur) => {
        const next = { ...cur, ...patch };
        if (patch.mode && patch.mode !== cur.mode) {
          next.min = patch.min ?? 0;
          next.max = patch.max ?? 0;
        }
        return next;
      }),
    favs,
    toggleFav: (id) => setFavs((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])),
    home: HOMES.find((h) => h.id === homeId) ?? null,
    panelOpen: panel.open,
    openHome: (id) => {
      opener.current = document.activeElement as HTMLElement | null;
      setHomeId(id);
      panel.setOpen(true);
    },
    closeHome: panel.close,
  };
  return (
    <Ctx.Provider value={store}>
      {children}
      <Detail />
    </Ctx.Provider>
  );
}

/* ── Header ── */
const LINKS = [
  ["#aanbod", "Aanbod"],
  ["#uitgelicht", "Uitgelicht"],
  ["#diensten", "Diensten"],
  ["#team", "Team"],
  ["#buurten", "Buurten"],
  ["#waardebepaling", "Waardebepaling"],
] as const;

function Mark() {
  return (
    <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" className="m-mark">
      <circle cx="16" cy="16" r="12.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="16" cy="16" rx="5.2" ry="12.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <line x1="16" y1="0" x2="16" y2="32" className="m-mark-line" strokeWidth="1.4" />
    </svg>
  );
}

export function Logo() {
  return (
    <a href="#top" className="m-logo" aria-label="Meridiaan Makelaars, naar boven">
      <Mark />
      <span>
        Meridiaan<small>Makelaars</small>
      </span>
    </a>
  );
}

/** Header: clear over the opening, a solid green bar once the page moves. */
export function Nav() {
  const m = useMenu();
  const { favs, set } = useEstate();
  const showSaved = () => {
    const mode: Mode = favs.length && !HOMES.some((h) => h.mode === "koop" && favs.includes(h.id)) ? "huur" : "koop";
    set({ ...START, mode, saved: true });
    m.close();
  };
  return (
    <>
      <header className="m-nav">
        <Logo />
        <nav aria-label="Hoofdmenu" className="m-links">
          {LINKS.slice(0, 5).map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#aanbod" className="m-nav-fav" onClick={showSaved} aria-label={`Bewaarde woningen: ${favs.length}`}>
          <Heart size={17} strokeWidth={1.5} aria-hidden="true" data-on={favs.length > 0 || undefined} />
          <b>{favs.length}</b>
        </a>
        <a href="#waardebepaling" className="m-btn m-btn-line m-nav-cta">
          Waardebepaling
        </a>
        <button type="button" className="m-burger" aria-expanded={m.open} aria-controls="m-menu" onClick={m.toggle}>
          <span>{m.open ? "Sluit" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="m-menu" className={`m-menu${m.open ? " is-open" : ""}`} inert={!m.open}>
        <nav aria-label="Menu">
          {LINKS.map(([href, label], i) => (
            <a key={href} href={href} onClick={m.close} style={{ ["--i" as string]: i }}>
              <small>{two(i + 1)}</small>
              {label}
            </a>
          ))}
        </nav>
        <div className="m-menu-foot">
          <p>
            Kantoor aan de Grachtengordel, Amsterdam
            <br />
            Maandag t/m vrijdag 9.00 tot 17.30 uur
          </p>
          <p>
            <a href="tel:0200000000">020 000 00 00</a>
            <br />
            <a href="mailto:kantoor@meridiaan.example">kantoor@meridiaan.example</a>
          </p>
        </div>
      </div>
    </>
  );
}

/* ── Small shared controls ── */
function Switch({ mode, onChange, counts }: { mode: Mode; onChange: (m: Mode) => void; counts?: boolean }) {
  return (
    <div className="m-switch" role="group" aria-label="Koop of huur">
      {(["koop", "huur"] as const).map((m) => (
        <button key={m} type="button" aria-pressed={mode === m} onClick={() => onChange(m)}>
          {m === "koop" ? "Koop" : "Huur"}
          {counts ? <sup>{HOMES.filter((h) => h.mode === m).length}</sup> : null}
        </button>
      ))}
    </div>
  );
}

function Fav({ id, name, text }: { id: string; name: string; text?: boolean }) {
  const { favs, toggleFav } = useEstate();
  const on = favs.includes(id);
  return (
    <button type="button" className={text ? "m-fav m-fav-text" : "m-fav"} aria-pressed={on} aria-label={text ? undefined : `${on ? "Verwijder" : "Bewaar"} ${name}`} onClick={() => toggleFav(id)}>
      <Heart size={18} strokeWidth={1.5} aria-hidden="true" />
      {text ? <span>{on ? "Bewaard" : "Bewaar woning"}</span> : null}
    </button>
  );
}

/** A button anywhere on the page that opens the detail view of one home. */
export function OpenHome({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  const { openHome } = useEstate();
  return (
    <button type="button" className={className} onClick={() => openHome(id)}>
      {children}
    </button>
  );
}

/** A link to the listings that also sets what they show. */
export function Jump({ mode = "koop", q = "", className, children }: { mode?: Mode; q?: string; className?: string; children: ReactNode }) {
  const { set } = useEstate();
  return (
    <a href="#aanbod" className={className} onClick={() => set({ ...START, mode, q })}>
      {children}
    </a>
  );
}

/* ── 1 · Search bar in the opening ── */
export function Search() {
  const { set } = useEstate();
  const [mode, setMode] = useState<Mode>("koop");
  const [q, setQ] = useState("");
  const [max, setMax] = useState(0);
  const n = HOMES.filter((h) => h.mode === mode && inPlace(h, q) && (!max || h.price <= max)).length;
  const go = () => {
    set({ ...START, mode, q: q.trim(), max });
    toListings();
  };
  return (
    <div className="m-search" role="search" aria-label="Zoek in het aanbod">
      <Switch
        mode={mode}
        onChange={(m) => {
          setMode(m);
          setMax(0);
        }}
      />
      <label className="m-search-field">
        <span>Plaats of buurt</span>
        <input type="text" name="plaats" list="m-places" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} placeholder="Bijvoorbeeld Jordaan of Blaricum" enterKeyHint="search" autoComplete="off" />
      </label>
      <datalist id="m-places">
        {PLACES.map((p) => (
          <option key={p} value={p} />
        ))}
      </datalist>
      <label className="m-search-field m-search-price">
        <span>Maximale prijs</span>
        <select name="max" value={max} onChange={(e) => setMax(Number(e.target.value))}>
          <option value={0}>Geen maximum</option>
          {STEPS[mode].map((p) => (
            <option key={p} value={p}>
              {euro(p)}
              {mode === "huur" ? " per maand" : ""}
            </option>
          ))}
        </select>
      </label>
      <button type="button" className="m-search-go" onClick={go}>
        <SearchIcon size={18} strokeWidth={1.5} aria-hidden="true" />
        <span>Toon {plural(n)}</span>
      </button>
    </div>
  );
}

/* ── 2 · Listings with filters, sort and favourites ── */
const sorted = (list: Home[], sort: Sort) => {
  const by: Record<Sort, (a: Home, b: Home) => number> = {
    aanbevolen: () => 0,
    nieuw: (a, b) => a.days - b.days,
    "prijs-op": (a, b) => a.price - b.price,
    "prijs-af": (a, b) => b.price - a.price,
    groot: (a, b) => b.area - a.area,
  };
  return [...list].sort(by[sort]);
};

export function Listings() {
  const { f, set, favs, openHome } = useEstate();
  const [all, setAll] = useState(false);
  const list = sorted(
    HOMES.filter((h) => h.mode === f.mode && inPlace(h, f.q) && h.price >= f.min && (!f.max || h.price <= f.max) && (f.kind === "alle" || h.kind === f.kind) && h.beds >= f.beds && (!f.saved || favs.includes(h.id))),
    f.sort,
  );
  const shown = all ? list : list.slice(0, 6);
  const dirty = Boolean(f.q || f.min || f.max || f.kind !== "alle" || f.beds || f.saved);
  const steps = STEPS[f.mode];
  const per = f.mode === "huur" ? " p/m" : "";

  return (
    <div className="m-list">
      <div className="m-filter" id="aanbod-lijst">
        <div className="m-filter-cell m-filter-mode">
          <span>Aanbod</span>
          <Switch mode={f.mode} onChange={(mode) => set({ mode })} counts />
        </div>
        <label className="m-filter-cell">
          <span>Type woning</span>
          <select value={f.kind} onChange={(e) => set({ kind: e.target.value as Filters["kind"] })}>
            {KINDS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="m-filter-cell">
          <span>Slaapkamers</span>
          <select value={f.beds} onChange={(e) => set({ beds: Number(e.target.value) })}>
            <option value={0}>Alle</option>
            {[2, 3, 4, 5].map((b) => (
              <option key={b} value={b}>
                {b} of meer
              </option>
            ))}
          </select>
        </label>
        <label className="m-filter-cell">
          <span>Prijs vanaf</span>
          <select value={f.min} onChange={(e) => set({ min: Number(e.target.value) })}>
            <option value={0}>Geen minimum</option>
            {steps.slice(0, -1).map((p) => (
              <option key={p} value={p}>
                {euro(p)}
                {per}
              </option>
            ))}
          </select>
        </label>
        <label className="m-filter-cell">
          <span>Prijs tot</span>
          <select value={f.max} onChange={(e) => set({ max: Number(e.target.value) })}>
            <option value={0}>Geen maximum</option>
            {steps.map((p) => (
              <option key={p} value={p}>
                {euro(p)}
                {per}
              </option>
            ))}
          </select>
        </label>
        <label className="m-filter-cell">
          <span>Sorteer op</span>
          <select value={f.sort} onChange={(e) => set({ sort: e.target.value as Sort })}>
            {SORTS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="m-result">
        <p role="status" aria-live="polite">
          <b>{two(list.length)}</b>
          <span>
            {list.length === 1 ? "woning" : "woningen"} {f.mode === "koop" ? "te koop" : "te huur"}
            {f.saved ? ", door u bewaard" : ""}
          </span>
        </p>
        <div className="m-chips">
          {f.q ? (
            <button type="button" className="m-chip" onClick={() => set({ q: "" })} aria-label={`Wis zoekterm ${f.q}`}>
              “{f.q}” <X size={14} strokeWidth={1.5} aria-hidden="true" />
            </button>
          ) : null}
          <button type="button" className="m-chip m-chip-fav" aria-pressed={f.saved} onClick={() => set({ saved: !f.saved })}>
            <Heart size={14} strokeWidth={1.5} aria-hidden="true" /> Bewaard <b>{favs.length}</b>
          </button>
          {dirty ? (
            <button type="button" className="m-chip m-chip-clear" onClick={() => set({ ...START, mode: f.mode, sort: f.sort })}>
              Wis filters
            </button>
          ) : null}
        </div>
      </div>

      {list.length ? (
        <ol className="m-homes" key={JSON.stringify(f)}>
          {shown.map((h, i) => {
            const wide = i % 3 === 0 || (i % 3 === 1 && i === shown.length - 1);
            const flip = wide && Math.floor(i / 3) % 2 === 1;
            const shot = h.shots[0];
            return (
              <li key={h.id} className={`m-home${wide ? " is-wide" : ""}${flip ? " is-flip" : ""}`} style={{ ["--i" as string]: Math.min(i, 6) }}>
                <div className="m-home-media">
                  <button type="button" className="m-home-open" onClick={() => openHome(h.id)} aria-label={`Bekijk ${h.street}, ${h.hood}`}>
                    <Pic img={I[shot.img]} alt={shot.alt} sizes={wide ? "(min-width: 900px) 62vw, 100vw" : "(min-width: 900px) 46vw, 100vw"} style={shot.pos ? { objectPosition: shot.pos } : undefined} />
                  </button>
                  {h.tag ? <span className="m-tag">{h.tag}</span> : null}
                  <Fav id={h.id} name={h.street} />
                </div>
                <div className="m-home-body">
                  <span className="m-home-no" aria-hidden="true">
                    {two(i + 1)}
                  </span>
                  <div className="m-home-title">
                    <p className="m-home-kind">
                      {h.kindLabel} · {h.city}
                    </p>
                    <h3>{h.street}</h3>
                    <p className="m-home-hood">{h.hood}</p>
                  </div>
                  <p className="m-home-price">
                    {euro(h.price)} <small>{suffix(h.mode)}</small>
                  </p>
                  <p className="m-home-line">{h.line}</p>
                  <dl className="m-facts">
                    <div>
                      <dt>Wonen</dt>
                      <dd>{h.area} m²</dd>
                    </div>
                    <div>
                      <dt>Kamers</dt>
                      <dd>{h.rooms}</dd>
                    </div>
                    <div>
                      <dt>Slaapkamers</dt>
                      <dd>{h.beds}</dd>
                    </div>
                    <div>
                      <dt>Energielabel</dt>
                      <dd>
                        <i className="m-label">{h.label}</i>
                      </dd>
                    </div>
                  </dl>
                  <button type="button" className="m-more" onClick={() => openHome(h.id)}>
                    <span>Bekijk woning</span>
                    <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="m-empty">
          <p className="m-empty-no" aria-hidden="true">
            00
          </p>
          <h3>{f.saved && !favs.length ? "U heeft nog geen woningen bewaard." : "Binnen deze keuze staat nu niets online."}</h3>
          <p>
            {f.saved && !favs.length
              ? "Tik op het hartje bij een woning en u vindt die hier terug."
              : "Een deel van ons aanbod wisselt in stilte van eigenaar. Verruim uw keuze, of laat ons weten wat u zoekt: dan hoort u het als eerste."}
          </p>
          <div className="m-empty-cta">
            <button type="button" className="m-btn m-btn-fill" onClick={() => set({ ...START, mode: f.mode })}>
              Toon het hele aanbod
            </button>
            <a href="#waardebepaling" className="m-textlink">
              Neem contact op
            </a>
          </div>
        </div>
      )}

      {list.length > 6 ? (
        <div className="m-list-more">
          <button type="button" className="m-btn m-btn-line" aria-expanded={all} onClick={() => setAll(!all)}>
            {all ? "Toon minder woningen" : `Toon alle ${list.length} woningen`}
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ── 3 · Detail view of one home ── */
const DAYS = ["Doordeweeks overdag", "Doordeweeks na 17.00", "Op zaterdag"];

function DetailBody({ home }: { home: Home }) {
  const [at, setAt] = useState(0);
  const [day, setDay] = useState(DAYS[0]);
  const agent = AGENTS[home.agent];
  const n = home.shots.length;
  const step = (d: number) => setAt((a) => (a + d + n) % n);
  const onKey = (e: KeyboardEvent) => {
    if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) return;
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };
  const spec: [string, ReactNode][] = [
    [home.mode === "koop" ? "Vraagprijs" : "Huurprijs", `${euro(home.price)} ${suffix(home.mode)}`],
    ["Woonoppervlakte", `${home.area} m²`],
    ...(home.plot ? ([["Perceel", `${dots(home.plot)} m²`]] as [string, ReactNode][]) : []),
    ["Kamers", `${home.rooms}, waarvan ${home.beds} slaapkamers`],
    ["Badkamers", home.baths],
    ["Bouwjaar", home.year],
    ["Energielabel", <i key="l" className="m-label">{home.label}</i>],
    ["Buitenruimte", home.outside],
    ["Parkeren", home.parking],
    ["Aanvaarding", home.mode === "koop" ? "In overleg" : "Per direct of in overleg"],
  ];
  return (
    <div className="m-detail-grid" onKeyDown={onKey}>
      <div className="m-gal">
        <div className="m-gal-stage" role="group" aria-roledescription="carrousel" aria-label={`Foto's van ${home.street}`}>
          {home.shots.map((s, i) => (
            <div key={s.img} className={i === at ? "is-on" : undefined} aria-hidden={i !== at}>
              <Pic img={I[s.img]} alt={s.alt} sizes="(min-width: 1000px) 54vw, 100vw" style={s.pos ? { objectPosition: s.pos } : undefined} />
            </div>
          ))}
        </div>
        <div className="m-gal-bar">
          <p aria-live="polite">
            <b>{two(at + 1)}</b>
            <i>/ {two(n)}</i>
            <span>{home.shots[at].cap}</span>
          </p>
          <div className="m-gal-thumbs">
            {home.shots.map((s, i) => (
              <button key={s.img} type="button" aria-label={`Foto ${i + 1}: ${s.cap}`} aria-current={i === at || undefined} onClick={() => setAt(i)}>
                <Pic img={I[s.img]} alt="" sizes="72px" />
              </button>
            ))}
          </div>
          <div className="m-gal-step">
            <button type="button" aria-label="Vorige foto" onClick={() => step(-1)}>
              <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Volgende foto" onClick={() => step(1)}>
              <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="m-detail-copy">
        <p className="m-eyebrow">
          {home.kindLabel} · {home.mode === "koop" ? "te koop" : "te huur"}
        </p>
        <h2 id="m-detail-h">{home.street}</h2>
        <p className="m-detail-hood">
          {home.hood}
          {home.hood.includes(home.city) ? "" : ` · ${home.city}`}
        </p>
        <div className="m-detail-row">
          <p className="m-detail-price">
            {euro(home.price)} <small>{suffix(home.mode)}</small>
          </p>
          <Fav id={home.id} name={home.street} text />
        </div>
        <p className="m-detail-lede">{home.line}</p>

        <dl className="m-spec">
          {spec.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <h3>Over deze woning</h3>
        {home.text.map((t) => (
          <p key={t.slice(0, 24)} className="m-detail-text">
            {t}
          </p>
        ))}

        <h3>Bijzonderheden</h3>
        <ul className="m-ticks">
          {home.features.map((t) => (
            <li key={t}>
              <Check size={16} strokeWidth={1.5} aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>

        <div className="m-agent">
          <Pic img={I[agent.img]} alt={agent.alt} sizes="96px" style={agent.pos ? { objectPosition: agent.pos } : undefined} />
          <p>
            <small>Uw makelaar voor deze woning</small>
            <b>{agent.name}</b>
            <span>{agent.role}</span>
            <a href="tel:0200000000">020 000 00 00</a>
          </p>
        </div>

        <h3>Bezichtiging aanvragen</h3>
        <DemoForm className="m-form" done={`Zo zou het werken: uw aanvraag voor ${home.street} gaat naar ${agent.first}, die binnen één werkdag belt. Dit is een demo-ontwerp van HOPI, er is niets verzonden.`}>
          <fieldset>
            <legend>Wanneer schikt het u?</legend>
            <div className="m-opts">
              {DAYS.map((d) => (
                <button key={d} type="button" aria-pressed={day === d} onClick={() => setDay(d)}>
                  {d}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="m-fields">
            <label>
              <span>Naam</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label>
              <span>Telefoon</span>
              <input type="tel" name="phone" autoComplete="tel" required />
            </label>
            <label className="m-field-wide">
              <span>E-mail</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <label className="m-field-wide">
              <span>Vraag of opmerking</span>
              <textarea name="note" rows={2} />
            </label>
          </div>
          <button type="submit" className="m-btn m-btn-fill">
            Vraag een bezichtiging aan
          </button>
        </DemoForm>
      </div>
    </div>
  );
}

function Detail() {
  const { home, panelOpen, closeHome } = useEstate();
  const closer = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const id = home?.id;
  useEffect(() => {
    if (!panelOpen) return;
    sheet.current?.scrollTo(0, 0);
    closer.current?.focus({ preventScroll: true });
  }, [panelOpen, id]);
  return (
    <div id="m-detail" className={`m-detail${panelOpen ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="m-detail-h" inert={!panelOpen}>
      <div className="m-veil" onClick={closeHome} aria-hidden="true" />
      <div className="m-sheet" ref={sheet}>
        {home ? <DetailBody key={home.id} home={home} /> : null}
      </div>
      <button type="button" className="m-detail-x" onClick={closeHome} ref={closer}>
        <span>Sluit</span>
        <X size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  );
}

/* ── 6 · Neighbourhoods ── */
const AREAS: { key: string; name: string; where: string; q: string; img: keyof typeof I; alt: string; pos?: string; text: string; facts: [string, string][] }[] = [
  {
    key: "grachtengordel",
    name: "Grachtengordel",
    where: "Amsterdam-Centrum",
    q: "Grachtengordel",
    img: "canal-dusk",
    alt: "Grachtenpanden met verlichte ramen, weerspiegeld in het water bij schemering",
    text: "Zeventiende-eeuwse panden met hoge plafonds, stadstuinen waar u ze niet verwacht en een fundering die u vóór het bieden wilt laten onderzoeken. Wij kennen de panden per deur, en vaak ook de aannemer die er het laatst heeft gewerkt.",
    facts: [
      ["Karakter", "Monumentaal, stil aan de tuinzijde"],
      ["Let op", "Fundering, splitsing en monumentenstatus"],
      ["Uw makelaar", "Maarten Verhoeven"],
    ],
  },
  {
    key: "jordaan",
    name: "Jordaan",
    where: "Amsterdam-Centrum",
    q: "Jordaan",
    img: "canal-day",
    alt: "Gracht met bomen en woonboten op een zomerdag",
    text: "Smalle straten, hofjes en bovenwoningen met uitzicht op het water. De Jordaan is geliefd bij wie uit het buitenland terugkomt en bij wie nooit meer weg wil. Het aanbod is klein en gaat vaak onderhands.",
    facts: [
      ["Karakter", "Dorps, levendig, alles te voet"],
      ["Let op", "Erfpacht en kleine verenigingen van eigenaars"],
      ["Uw makelaar", "Maarten Verhoeven"],
    ],
  },
  {
    key: "oud-zuid",
    name: "Oud-Zuid",
    where: "Amsterdam",
    q: "Oud-Zuid",
    img: "living-stairs",
    alt: "Lichte woonkamer met open trap in een herenhuis",
    text: "Brede lanen, herenhuizen uit het begin van de vorige eeuw en het Vondelpark als achtertuin. Gezinnen blijven hier lang wonen. Wie iets zoekt, heeft geduld nodig, of een makelaar die weet wie er over twee jaar wil verhuizen.",
    facts: [
      ["Karakter", "Statig, groen, veel gezinnen"],
      ["Let op", "Funderingsherstel en beschermd stadsgezicht"],
      ["Uw makelaar", "Noor Hendriks"],
    ],
  },
  {
    key: "zuidas",
    name: "Zuidas",
    where: "Amsterdam",
    q: "Zuidas",
    img: "living-wide",
    alt: "Brede woonkamer met ramen over de volle lengte naar een daktuin",
    text: "Nieuwbouw met conciërge, parkeergarage en energielabel A of beter. Voor wie de fiets naast de lift wil zetten en in tien minuten op het vliegveld wil staan. De servicekosten en erfpachtvoorwaarden verschillen per gebouw: wij leggen ze naast elkaar.",
    facts: [
      ["Karakter", "Nieuw, comfortabel, internationaal"],
      ["Let op", "Servicekosten en erfpachtcanon"],
      ["Uw makelaar", "Noor Hendriks"],
    ],
  },
  {
    key: "ijburg",
    name: "IJburg",
    where: "Amsterdam-Oost",
    q: "IJburg",
    img: "apartments",
    alt: "Gevel van een modern appartementengebouw met balkons tegen een blauwe lucht",
    pos: "50% 62%",
    text: "Water aan drie kanten, brede kades en woningen met meer vierkante meters dan de binnenstad voor hetzelfde bedrag biedt. Populair bij gezinnen die ruimte zoeken zonder de stad te verlaten.",
    facts: [
      ["Karakter", "Ruim, licht, aan het water"],
      ["Let op", "Einddatum van de afgekochte erfpacht"],
      ["Uw makelaar", "Sem de Graaf"],
    ],
  },
  {
    key: "kennemerland",
    name: "Kennemerland",
    where: "Aerdenhout, Bloemendaal, Overveen",
    q: "Kennemerland",
    img: "villa-white",
    alt: "Witte villa met terrassen en een zwembad in de tuin",
    text: "Villa’s op ruime kavels tussen duin en stad. Twintig minuten met de trein naar Amsterdam, een kwartier fietsen naar zee. Hier telt de kavel minstens zo zwaar als het huis, en wij weten welke lanen stil blijven.",
    facts: [
      ["Karakter", "Lommerrijk, privé, dicht bij zee"],
      ["Let op", "Bestemmingsplan en bomen op de kavel"],
      ["Uw makelaar", "Liesbeth van Dalen"],
    ],
  },
  {
    key: "gooi",
    name: "Het Gooi",
    where: "Blaricum, Laren, Naarden",
    q: "Het Gooi",
    img: "house-night",
    alt: "Landhuis met steile kap en verlichte ramen in een donkere tuin",
    text: "Landhuizen aan zandwegen, heide om de hoek en scholen waar ouders voor verhuizen. Veel woningen wisselen hier zonder bord in de tuin van eigenaar. Daarom begint zoeken in Het Gooi met een telefoontje, niet met een zoekmachine.",
    facts: [
      ["Karakter", "Landelijk, besloten, veel groen"],
      ["Let op", "Rieten kappen, bijgebouwen en erfgrenzen"],
      ["Uw makelaar", "Liesbeth van Dalen"],
    ],
  },
];

export function Areas() {
  const { set } = useEstate();
  const [at, setAt] = useState(0);
  const area = AREAS[at];
  const local = HOMES.filter((h) => inPlace(h, area.q));
  const mode: Mode = local.some((h) => h.mode === "koop") ? "koop" : "huur";
  const from = local.filter((h) => h.mode === mode).sort((a, b) => a.price - b.price)[0];
  return (
    <div className="m-areas">
      <div className="m-area-tabs" role="tablist" aria-label="Buurten" aria-orientation="vertical">
        {AREAS.map((a, i) => (
          <button key={a.key} type="button" role="tab" id={`m-area-${a.key}`} aria-selected={i === at} aria-controls="m-area-panel" onClick={() => setAt(i)}>
            <small>{two(i + 1)}</small>
            <span>{a.name}</span>
            <ArrowRight size={20} strokeWidth={1.25} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="m-area-stage" id="m-area-panel" role="tabpanel" aria-labelledby={`m-area-${area.key}`}>
        <div className="m-area-photo" data-px>
          {AREAS.map((a, i) => (
            <Pic key={a.key} img={I[a.img]} alt={a.alt} sizes="(min-width: 1000px) 52vw, 100vw" className={i === at ? "is-on" : undefined} style={a.pos ? { objectPosition: a.pos } : undefined} />
          ))}
          <p className="m-area-where">{area.where}</p>
        </div>
        <div className="m-area-copy" key={area.key}>
          <p className="m-area-text">{area.text}</p>
          <div>
            <dl className="m-spec">
              {area.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              <div>
                <dt>In ons aanbod</dt>
                <dd>{from ? `${plural(local.length)}, vanaf ${euro(from.price)}${mode === "huur" ? " per maand" : ""}` : "Nu alleen in stil aanbod"}</dd>
              </div>
            </dl>
            <a
              href="#aanbod"
              className="m-textlink"
              onClick={() => {
                set({ ...START, mode, q: area.q });
              }}
            >
              Bekijk het aanbod in {area.name}
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 7 · Valuation request ── */
const HOUSE = ["Appartement", "Stadswoning", "Villa of landhuis", "Anders"];
const WHEN = ["Binnen drie maanden", "Dit jaar", "Ik oriënteer me"];

export function Valuation() {
  const [house, setHouse] = useState(HOUSE[0]);
  const [when, setWhen] = useState(WHEN[1]);
  return (
    <DemoForm className="m-form" done={`Zo zou het werken: een partner belt u binnen één werkdag voor een afspraak over uw ${house === "Anders" ? "woning" : house.toLowerCase()}. Dit is een demo-ontwerp van HOPI, er is niets verzonden.`}>
      <fieldset>
        <legend>Wat voor woning is het?</legend>
        <div className="m-opts">
          {HOUSE.map((h) => (
            <button key={h} type="button" aria-pressed={house === h} onClick={() => setHouse(h)}>
              {h}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="m-fields">
        <label className="m-field-wide">
          <span>Straat en plaats</span>
          <input type="text" name="address" autoComplete="street-address" placeholder="Straatnaam, plaats" required />
        </label>
        <label>
          <span>Woonoppervlakte in m²</span>
          <input type="number" name="area" inputMode="numeric" min={20} placeholder="Bij benadering" />
        </label>
        <label>
          <span>Bouwjaar</span>
          <input type="number" name="year" inputMode="numeric" min={1500} max={2026} placeholder="Als u het weet" />
        </label>
      </div>
      <fieldset>
        <legend>Wanneer denkt u te verkopen?</legend>
        <div className="m-opts">
          {WHEN.map((w) => (
            <button key={w} type="button" aria-pressed={when === w} onClick={() => setWhen(w)}>
              {w}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="m-fields">
        <label>
          <span>Naam</span>
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Telefoon</span>
          <input type="tel" name="phone" autoComplete="tel" required />
        </label>
        <label className="m-field-wide">
          <span>E-mail</span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
      </div>
      <button type="submit" className="m-btn m-btn-fill">
        Vraag een waardebepaling aan
      </button>
    </DemoForm>
  );
}
