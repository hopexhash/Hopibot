import { Fragment } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Accessibility, ArrowRight, Bike, CalendarCheck, Check, Clock, FileText, Hand, Headphones, Mail, MapPin, MessageCircleHeart, Phone, ScanLine, ShieldCheck, Siren, Users, Wallet } from "lucide-react";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { Booking, Cta, Fees, Mark, Nav, ToothIcon, Treatments, Visit } from "./ui";
import "./style.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--h-sans", display: "swap" });

export const metadata = demoMeta("dental");
const I = IMAGES.dental;
const TEL = "023 000 00 00";
const TEL_HREF = "tel:0230000000";
const IC = { size: 24, strokeWidth: 1.7, "aria-hidden": true } as const;

const H1 = ["De", "tandarts", "waar", "je", "rustig", "naar", "binnen", "loopt."];

const TEAM = [
  { img: I["dentist-2"], pos: "46% 30%", alt: "Ineke, tandarts, in een witte jas voor een boom", name: "Ineke Verhoeven", role: "Tandarts en praktijkhouder", text: "Begon Helder omdat uitleg bij de behandeling hoort, niet erna.", days: "Ma, di en do" },
  { img: I["dentist-1"], pos: "62% 30%", alt: "Sam, tandarts met bril en baard, armen over elkaar", name: "Sam Bakkali", role: "Tandarts", text: "Kronen, bruggen en implantaten. Tekent graag even uit wat hij gaat doen.", days: "Di, wo en vr" },
  { img: I["dentist-3"], pos: "50% 12%", alt: "Noor, mondhygiënist, in een turquoise werkjas", name: "Noor Haddad", role: "Mondhygiënist", text: "Poetsadvies zonder preek. Wel met een spiegel erbij.", days: "Ma, wo en do" },
  { img: I["dentist-4"], pos: "50% 10%", alt: "Jesse, tandarts, lachend in een blauwe werkjas", name: "Jesse Martina", role: "Tandarts voor kinderen en angst", text: "Heeft altijd tijd voor één vraag meer. Of tien.", days: "Di, do en vr" },
];

const CALM = [
  { icon: <MessageCircleHeart {...IC} />, title: "Eerst alleen praten", text: "De eerste afspraak is een gesprek. Geen stoel, geen instrumenten." },
  { icon: <Hand {...IC} />, title: "Jij hebt de stopknop", text: "Hand omhoog en we stoppen. Elke keer, zonder discussie." },
  { icon: <FileText {...IC} />, title: "Je weet wat er komt", text: "Elke stap kondigen we aan. Geen verrassingen in je mond." },
  { icon: <Users {...IC} />, title: "Eén vast gezicht", text: "Je ziet steeds dezelfde tandarts en we plannen extra ruim." },
];

const INSURANCE = [
  { icon: <ShieldCheck {...IC} />, title: "Tot 18 jaar", text: "De meeste tandzorg voor kinderen en jongeren wordt vergoed uit de basisverzekering. Een beugel valt daar meestal buiten." },
  { icon: <Wallet {...IC} />, title: "Vanaf 18 jaar", text: "Tandzorg zit doorgaans niet in de basisverzekering. Met een aanvullende tandartsverzekering krijg je een deel terug. Hoeveel, dat staat in je polis." },
  { icon: <FileText {...IC} />, title: "Altijd een begroting vooraf", text: "Kost een behandeling meer dan € 250, dan krijg je eerst de bedragen op papier. Jij beslist daarna pas." },
];

const VOICES = [
  { quote: "Kroon gebroken op vrijdagmiddag. Om vier uur zat ik in de stoel en om vijf uur weer buiten.", who: "Henk", note: "belde met spoed" },
  { quote: "Mijn dochter van vijf wilde niet meer weg. Ze mocht zelf de stoel omhoog doen.", who: "Fatima", note: "komt met twee kinderen" },
  { quote: "Ze bellen als er eerder een plek vrijkomt. Klinkt klein, maar het scheelde mij drie weken wachten.", who: "Ruben", note: "kwam voor een vulling" },
];

const HOURS = [
  ["Maandag", "8.00 – 17.30"],
  ["Dinsdag", "8.00 – 20.00"],
  ["Woensdag", "8.00 – 17.30"],
  ["Donderdag", "8.00 – 20.00"],
  ["Vrijdag", "8.00 – 16.00"],
  ["Zaterdag", "9.00 – 13.00"],
  ["Zondag", "Alleen spoedlijn"],
];

export default function Helder() {
  return (
    <DemoShell slug="dental" name="Tandartspraktijk Helder" className={`d-helder ${sans.variable}`}>
      <Nav />
      <main id="top">
        {/* 1 · Opening */}
        <section className="h-hero">
          <span className="h-orb h-orb-a" aria-hidden="true" data-px />
          <span className="h-orb h-orb-b" aria-hidden="true" data-px />
          <div className="h-wrap">
            <div className="h-hero-grid">
              <div className="h-hero-copy">
                <p className="h-tag h-rise" style={{ ["--i" as string]: 0 }}>
                  <i aria-hidden="true" />
                  Tandarts in Haarlem · nieuwe patiënten welkom
                </p>
                <h1>
                  {H1.map((w, i) => (
                    <Fragment key={w}>
                      <span className={w === "rustig" ? "h-w h-w-hl" : "h-w"} style={{ ["--i" as string]: i }}>
                        {w}
                      </span>{" "}
                    </Fragment>
                  ))}
                </h1>
                <p className="h-lede h-rise" style={{ ["--i" as string]: 5 }}>
                  We leggen uit wat we zien, wat het kost en wat je kunt kiezen. In gewone taal en zonder haast.
                </p>
                <div className="h-cta h-rise" style={{ ["--i" as string]: 6 }}>
                  <Cta>Afspraak maken</Cta>
                  <a href={TEL_HREF} className="h-btn h-btn-ghost">
                    <Phone size={18} strokeWidth={1.9} aria-hidden="true" />
                    Bel {TEL}
                  </a>
                </div>
                <p className="h-hero-note h-rise" style={{ ["--i" as string]: 7 }}>
                  <Clock size={17} strokeWidth={1.9} aria-hidden="true" />
                  Ma t/m vr vanaf 8.00 uur · di en do tot 20.00 uur
                </p>
              </div>
              <div className="h-hero-visual">
                <span className="h-ring" aria-hidden="true" />
                <figure className="h-hero-photo">
                  <Pic img={I.consult} alt="Een tandarts laat een patiënt in de stoel op een scherm zien wat hij ziet" eager sizes="(min-width: 980px) 44vw, 94vw" />
                </figure>
                <div className="h-float h-float-a">
                  <div>
                    <span className="h-ic">
                      <CalendarCheck {...IC} />
                    </span>
                    <p>
                      <b>Eerste afspraak</b>
                      <span>meestal binnen twee weken</span>
                    </p>
                  </div>
                </div>
                <div className="h-float h-float-b">
                  <div>
                    <span className="h-ic">
                      <ToothIcon mark="check" />
                    </span>
                    <p>
                      <b>Eerst uitleg,</b>
                      <span>dan pas de stoel</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ul className="h-needs">
              <li className="h-rise" style={{ ["--i" as string]: 8 }}>
                <a href={TEL_HREF} className="h-need h-need-a">
                  <span className="h-ic">
                    <Siren {...IC} />
                  </span>
                  <span>
                    <b>Ik heb pijn</b>
                    <small>Bel direct, we proberen je vandaag te zien</small>
                  </span>
                  <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
                </a>
              </li>
              <li className="h-rise" style={{ ["--i" as string]: 9 }}>
                <a href="#afspraak" className="h-need h-need-b">
                  <span className="h-ic">
                    <ToothIcon mark="check" />
                  </span>
                  <span>
                    <b>Tijd voor een controle</b>
                    <small>Plan online, wij bellen je terug</small>
                  </span>
                  <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
                </a>
              </li>
              <li className="h-rise" style={{ ["--i" as string]: 10 }}>
                <a href="#angst" className="h-need h-need-c">
                  <span className="h-ic">
                    <MessageCircleHeart {...IC} />
                  </span>
                  <span>
                    <b>Ik zie er tegenop</b>
                    <small>Lees hoe we het rustig aanpakken</small>
                  </span>
                  <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* 2 · Behandelingen */}
        <section className="h-sec" id="behandelingen">
          <div className="h-wrap">
            <header className="h-head h-head-split">
              <div>
                <p className="h-tag" data-rv>
                  <i aria-hidden="true" />
                  Behandelingen
                </p>
                <h2 data-rv>
                  Wat we doen, <em>in gewone taal.</em>
                </h2>
                <p data-rv>Kies een behandeling en lees wat er gebeurt, hoe lang het duurt en of het pijn doet. Eerlijk, ook als het antwoord “een beetje” is.</p>
              </div>
              <figure className="h-pill-photo" data-rv="img">
                <Pic img={I.aligner} alt="Iemand zet een doorzichtige aligner over de boventanden" sizes="(min-width: 980px) 30vw, 70vw" />
              </figure>
            </header>
            <Treatments />
          </div>
        </section>

        {/* Voor wie het spannend vindt */}
        <section className="h-calm" id="angst" aria-labelledby="h-calm-h">
          <div className="h-wrap">
            <div className="h-calm-card">
              <div className="h-calm-copy">
                <p className="h-tag" data-rv>
                  <i aria-hidden="true" />
                  Bang voor de tandarts?
                </p>
                <h2 id="h-calm-h" data-rv>
                  Spannend? Dan doen we het <em>rustig aan.</em>
                </h2>
                <p className="h-calm-lede" data-rv>
                  Je bent niet de enige en je hoeft je nergens voor te schamen. Ook niet als je jaren niet bent geweest. We beginnen waar jij aan toe bent.
                </p>
                <ul className="h-calm-list" data-rv="kids">
                  {CALM.map((c) => (
                    <li key={c.title}>
                      <span className="h-ic">{c.icon}</span>
                      <div>
                        <h3>{c.title}</h3>
                        <p>{c.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="h-cta" data-rv>
                  <Cta>Plan een gesprek zonder behandeling</Cta>
                  <a href={TEL_HREF} className="h-btn h-btn-ghost">
                    <Phone size={18} strokeWidth={1.9} aria-hidden="true" />
                    Liever eerst bellen
                  </a>
                </div>
              </div>
              <div className="h-calm-side">
                <div className="h-breath" aria-hidden="true" data-rv>
                  <span />
                  <span />
                  <span>
                    <b>adem in</b>
                    <b>adem uit</b>
                  </span>
                </div>
                <p className="h-breath-cap" data-rv>
                  Even ademhalen. Vier tellen in, vier tellen uit.
                </p>
                <figure className="h-calm-quote" data-rv>
                  <blockquote>
                    <p>“Niemand hoeft hier flink te zijn. Zeg wat je spannend vindt, dan weet ik waar ik op moet letten.”</p>
                  </blockquote>
                  <figcaption>
                    <Pic img={I["dentist-4"]} alt="Jesse, tandarts" sizes="56px" style={{ objectPosition: "50% 12%" }} />
                    <span>
                      <b>Jesse</b>
                      <small>tandarts, begeleidt angstpatiënten</small>
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 3 · Eerste bezoek */}
        <section className="h-visit h-dark" id="eerste-bezoek">
          <div className="h-wrap">
            <header className="h-head h-head-split">
              <div>
                <p className="h-tag" data-rv>
                  <i aria-hidden="true" />
                  Eerste bezoek
                </p>
                <h2 data-rv>
                  Zo gaat je eerste keer, <em>stap voor stap.</em>
                </h2>
              </div>
              <p data-rv>Reken op drie kwartier. Het grootste deel daarvan praten en kijken we. Behandelen doen we pas bij een volgende afspraak, tenzij je pijn hebt.</p>
            </header>
            <Visit />
          </div>
        </section>

        {/* 4 · Team */}
        <section className="h-sec" id="team">
          <div className="h-wrap">
            <header className="h-head h-head-split">
              <div>
                <p className="h-tag" data-rv>
                  <i aria-hidden="true" />
                  Het team
                </p>
                <h2 data-rv>
                  Vier vaste gezichten. <em>Je weet wie je ziet.</em>
                </h2>
              </div>
              <p data-rv>Bij Helder kies je een eigen tandarts en die houd je. Aan de balie zitten Marieke en Dewi, die na één bezoek weten hoe je heet.</p>
            </header>
            <ul className="h-team" data-rv="kids">
              {TEAM.map((t) => (
                <li key={t.name} className="h-member">
                  <div className="h-member-pic">
                    <Pic img={t.img} alt={t.alt} sizes="(min-width: 900px) 22vw, 70vw" style={{ objectPosition: t.pos }} />
                    <span aria-hidden="true">Hoi!</span>
                  </div>
                  <h3>{t.name}</h3>
                  <p className="h-member-role">{t.role}</p>
                  <p>{t.text}</p>
                  <p className="h-member-days">
                    <CalendarCheck size={16} strokeWidth={1.9} aria-hidden="true" />
                    {t.days}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 · De praktijk */}
        <section className="h-sec h-place" id="praktijk">
          <div className="h-wrap">
            <header className="h-head">
              <p className="h-tag" data-rv>
                <i aria-hidden="true" />
                De praktijk
              </p>
              <h2 data-rv>
                Een praktijk die niet <em>naar tandarts ruikt.</em>
              </h2>
              <p data-rv>Vier behandelkamers aan een hofje in het centrum van Haarlem. Veel daglicht, zachte stoelen en een wachtkamer waar je zelden lang zit.</p>
            </header>
            <div className="h-bento">
              <figure className="h-b-a" data-rv="img" data-px>
                <Pic img={I.practice} alt="Twee behandelstoelen in een lichte, witte ruimte" sizes="(min-width: 900px) 56vw, 94vw" />
                <figcaption>Kamer 1 en 2</figcaption>
              </figure>
              <div className="h-tile h-tile-teal h-b-b" data-rv>
                <span className="h-ic">
                  <ScanLine {...IC} />
                </span>
                <h3>Een scan in plaats van happen</h3>
                <p>Geen bakje pasta in je mond. Een kleine camera maakt de afdruk, en jij ziet je gebit meteen in 3D op het scherm.</p>
              </div>
              <figure className="h-b-c" data-rv="img">
                <Pic img={I["room-wood"]} alt="Behandelkamer met houten wand en een rode behandelstoel" sizes="(min-width: 900px) 24vw, 46vw" />
                <figcaption>Kamer 3</figcaption>
              </figure>
              <div className="h-tile h-tile-coral h-b-d" data-rv>
                <span className="h-ic">
                  <Headphones {...IC} />
                </span>
                <h3>Jouw muziek</h3>
                <p>In elke kamer ligt een koptelefoon.</p>
              </div>
              <div className="h-tile h-tile-mint h-b-e" data-rv>
                <ul>
                  <li>
                    <Accessibility {...IC} />
                    <span>
                      <b>Drempelloos</b>
                      Begane grond, brede deuren
                    </span>
                  </li>
                  <li>
                    <Bike {...IC} />
                    <span>
                      <b>Fiets voor de deur</b>
                      Garage op vijf minuten lopen
                    </span>
                  </li>
                  <li>
                    <MapPin {...IC} />
                    <span>
                      <b>Centrum, Haarlem</b>
                      Tien minuten van het station
                    </span>
                  </li>
                </ul>
              </div>
              <figure className="h-b-f" data-rv="img" data-px>
                <Pic img={I.suite} alt="Ruime behandelkamer met een blauwe stoel en grote ramen" sizes="(min-width: 900px) 40vw, 94vw" />
                <figcaption>Kamer 4, de lichtste</figcaption>
              </figure>
              <figure className="h-b-g" data-rv="img">
                <Pic img={I.room} alt="Behandelkamer met witte kasten en een werkblad langs het raam" sizes="(min-width: 900px) 30vw, 94vw" />
                <figcaption>De kamer van Noor</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 6 · Tarieven en verzekering */}
        <section className="h-fee-sec" id="tarieven">
          <div className="h-wrap h-fee-grid">
            <div className="h-fee-copy">
              <p className="h-tag" data-rv>
                <i aria-hidden="true" />
                Tarieven en verzekering
              </p>
              <h2 data-rv>
                Vooraf weten <em>wat het kost.</em>
              </h2>
              <p data-rv>Geen rekening die je verrast. Zoek je behandeling op, of vraag aan de balie om een begroting. Die krijg je altijd voordat we beginnen.</p>
              <ul className="h-ins" data-rv="kids">
                {INSURANCE.map((x) => (
                  <li key={x.title}>
                    <span className="h-ic">{x.icon}</span>
                    <div>
                      <h3>{x.title}</h3>
                      <p>{x.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="h-fee-pay" data-rv>
                Betalen doe je met pin aan de balie, of je krijgt de nota per e-mail. Declareren bij je verzekeraar doe je daarna zelf. Kom je er niet uit, dan helpen Marieke en Dewi je op weg.
              </p>
            </div>
            <div className="h-fee-card" data-rv>
              <Fees />
            </div>
          </div>
        </section>

        {/* 7 · Patiënten aan het woord */}
        <section className="h-sec" id="ervaringen">
          <div className="h-wrap">
            <header className="h-head">
              <p className="h-tag" data-rv>
                <i aria-hidden="true" />
                Patiënten aan het woord
              </p>
              <h2 data-rv>
                Ze zagen er <em>ook tegenop.</em>
              </h2>
            </header>
            <div className="h-voices">
              <figure className="h-voice h-voice-a" data-rv>
                <div className="h-voice-pic">
                  <Pic img={I["patient-1"]} alt="Marloes, een vrouw met blond haar, lacht in de avondzon" sizes="(min-width: 900px) 22vw, 60vw" style={{ objectPosition: "42% 30%" }} />
                </div>
                <div>
                  <blockquote>
                    <p>“Ik was twaalf jaar niet geweest. De eerste afspraak hebben we alleen gepraat. Nu kom ik gewoon elk half jaar, en dat had ik nooit gedacht.”</p>
                  </blockquote>
                  <figcaption>
                    <b>Marloes</b>
                    <span>kwam na twaalf jaar terug</span>
                  </figcaption>
                </div>
              </figure>
              <figure className="h-voice h-voice-b" data-rv style={{ ["--i" as string]: 1 }}>
                <blockquote>
                  <p>“Mijn aligners zag ik vooraf op het scherm, met erbij wat het zou kosten. Geen verkooppraatje, gewoon de opties op een rij.”</p>
                </blockquote>
                <figcaption>
                  <Pic img={I["patient-2"]} alt="Lotte, een jonge vrouw in een spijkerjack, lacht breed" sizes="72px" style={{ objectPosition: "50% 22%" }} />
                  <span>
                    <b>Lotte</b>
                    <small>draagt sinds dit voorjaar aligners</small>
                  </span>
                </figcaption>
              </figure>
              {VOICES.map((v, i) => (
                <figure key={v.who} className="h-bubble" data-rv style={{ ["--i" as string]: i }}>
                  <blockquote>
                    <p>“{v.quote}”</p>
                  </blockquote>
                  <figcaption>
                    <i aria-hidden="true">{v.who[0]}</i>
                    <span>
                      <b>{v.who}</b>
                      <small>{v.note}</small>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 8 · Afspraak maken */}
        <section className="h-book h-dark" id="afspraak">
          <div className="h-wrap h-book-grid">
            <div className="h-book-copy">
              <p className="h-tag" data-rv>
                <i aria-hidden="true" />
                Afspraak maken
              </p>
              <h2 data-rv>
                Zeg het maar. <em>Wij plannen het in.</em>
              </h2>
              <p data-rv>Vul in waar je voor komt en wanneer het uitkomt. We bellen je binnen één werkdag terug om een tijd af te spreken.</p>
              <ul className="h-contact" data-rv="kids">
                <li>
                  <a href={TEL_HREF}>
                    <span className="h-ic">
                      <Phone {...IC} />
                    </span>
                    <span>
                      <small>Bellen, op werkdagen vanaf 8.00 uur</small>
                      <b>{TEL}</b>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="mailto:hallo@helder.example">
                    <span className="h-ic">
                      <Mail {...IC} />
                    </span>
                    <span>
                      <small>Mailen</small>
                      <b>hallo@helder.example</b>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#praktijk">
                    <span className="h-ic">
                      <MapPin {...IC} />
                    </span>
                    <span>
                      <small>Langskomen</small>
                      <b>Centrum, Haarlem</b>
                    </span>
                  </a>
                </li>
              </ul>
              <p className="h-urgent" data-rv>
                <Siren {...IC} />
                <span>
                  <b>Pijn of een ongelukje?</b> Bel direct en kies 1. Ook ’s avonds en in het weekend hoor je waar je terechtkunt.
                </span>
              </p>
            </div>
            <div className="h-book-card" data-rv>
              <Booking />
            </div>
          </div>
        </section>
      </main>

      <footer className="h-foot">
        <div className="h-wrap">
          <div className="h-foot-grid">
            <div className="h-foot-brand">
              <a href="#top" className="h-logo" aria-label="Tandartspraktijk Helder, naar boven">
                <Mark />
                <span>
                  Helder<small>tandartspraktijk</small>
                </span>
              </a>
              <p>Tandarts in het centrum van Haarlem. Uitleg in gewone taal, een begroting vooraf en tijd voor je vragen.</p>
              <Cta>Afspraak maken</Cta>
            </div>
            <nav aria-label="Voettekst, praktijk">
              <h3>Praktijk</h3>
              <a href="#behandelingen">Behandelingen</a>
              <a href="#team">Het team</a>
              <a href="#praktijk">De praktijk</a>
              <a href="#ervaringen">Ervaringen</a>
            </nav>
            <nav aria-label="Voettekst, voor patiënten">
              <h3>Voor patiënten</h3>
              <a href="#eerste-bezoek">Eerste bezoek</a>
              <a href="#angst">Bang voor de tandarts</a>
              <a href="#tarieven">Tarieven en verzekering</a>
              <a href="#afspraak">Afspraak maken</a>
            </nav>
            <div className="h-foot-hours">
              <h3>Openingstijden</h3>
              <dl>
                {HOURS.map(([d, t]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{t}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="h-foot-urgent">
              <h3>
                <Siren size={20} strokeWidth={1.8} aria-hidden="true" />
                Spoedlijn
              </h3>
              <a href={TEL_HREF}>{TEL}</a>
              <p>Kies 1 bij pijn, een zwelling of een afgebroken tand. Buiten openingstijden hoor je welke tandarts dienst heeft.</p>
              <ul>
                <li>
                  <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                  hallo@helder.example
                </li>
                <li>
                  <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                  Centrum, Haarlem
                </li>
              </ul>
            </div>
          </div>
          <p className="h-legal">
            <span>© Tandartspraktijk Helder, Haarlem</span>
            <span>Demo-ontwerp van HOPI · Tandartspraktijk Helder is een fictief bedrijf</span>
          </p>
        </div>
      </footer>
    </DemoShell>
  );
}
