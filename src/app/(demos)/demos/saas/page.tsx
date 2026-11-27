import { Inter, Space_Grotesk } from "next/font/google";
import { ArrowRight, BookOpenCheck, CalendarDays, Camera, Check, ClipboardCheck, CreditCard, GripVertical, Home, ListChecks, Mail, MapPin, MousePointer2, Navigation, Package, User, Webhook, WifiOff } from "lucide-react";
import { demoMeta } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import { DemoShell } from "@/demos/kit";
import { Pic } from "@/demos/pic";
import { Faq, Mark, Nav, Pricing, ProductTabs, Spot, Stage, Trial } from "./ui";
import "./style.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--w-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--w-sans", display: "swap" });

export const metadata = demoMeta("saas");
const I = IMAGES.saas;
const i = (n: number) => ({ ["--i" as string]: n });

const TRADES = ["Installateurs", "Loodgieters", "Elektriciens", "Dakdekkers", "Cv-monteurs", "Koeltechniek", "Beveiliging", "Timmerbedrijven", "Zonnepanelen", "Servicediensten"];

const LIVE = [
  { to: 13, label: "klussen op het bord" },
  { to: 4, label: "monteurs onderweg" },
  { to: 5, label: "werkbonnen getekend" },
  { to: 940, label: "euro gefactureerd", pre: "€ " },
];

const WEEK = [
  { n: "Daan", v: [88, 100, 62, 75, 38] },
  { n: "Mila", v: [100, 75, 50, 88, 62] },
  { n: "Sem", v: [75, 88, 44, 100, 50] },
  { n: "Yara", v: [62, 100, 75, 50, 25] },
];
const DAYS = ["Ma 17", "Di 18", "Wo 19", "Do 20", "Vr 21"];

const INVOICES = [
  { nr: "F-0412", who: "Fam. Bakker, Zeist", sum: "186,50", st: "paid", label: "Betaald" },
  { nr: "F-0411", who: "VvE Parkzicht", sum: "1.240,00", st: "sent", label: "Verstuurd" },
  { nr: "F-0410", who: "Bakkerij Oost", sum: "412,80", st: "paid", label: "Betaald" },
  { nr: "F-0409", who: "Fam. El Idrissi", sum: "94,00", st: "late", label: "Herinnerd" },
  { nr: "F-0408", who: "Kapsalon Noord", sum: "328,40", st: "draft", label: "Concept" },
];

const LINKS = [
  { Icon: BookOpenCheck, kind: "Boekhouding", name: "Je boekhoudpakket", text: "Facturen en betalingen staan elke nacht afgeletterd in je administratie." },
  { Icon: CalendarDays, kind: "Agenda", name: "Agenda van kantoor en monteur", text: "Afspraken verschijnen vanzelf in de agenda die iedereen al gebruikt." },
  { Icon: CreditCard, kind: "Betalingen", name: "Betaallink en pin aan de deur", text: "De klant betaalt met een link op de factuur of direct bij de monteur." },
  { Icon: Package, kind: "Voorraad", name: "Groothandel en magazijn", text: "Materiaal op de werkbon boekt af en komt op de bestellijst." },
  { Icon: Mail, kind: "E-mail en sms", name: "Berichten naar de klant", text: "Bevestiging, herinnering en ‘de monteur is onderweg’, zonder dat iemand belt." },
  { Icon: Webhook, kind: "Eigen koppeling", name: "Open API en webhooks", text: "Iets eigens? Je ontwikkelaar haalt en schrijft alles wat je op het scherm ziet." },
];

const FEED = ["Factuur F-0412 naar boekhouding", "Afspraak Mila 13:00 in agenda", "Betaling € 186,50 ontvangen", "2 × thermostaatkraan afgeboekt", "Bericht ‘monteur onderweg’ verstuurd", "Werkbon WB-2418 gearchiveerd"];

const QUOTES = [
  { q: "De werkbon is getekend voordat ik de bus weer in stap. Papierwerk op vrijdagmiddag bestaat bij ons niet meer.", who: "Samira", what: "monteur koeltechniek" },
  { q: "Wij stuurden de factuur weken na de klus. Nu gaat hij dezelfde dag de deur uit, en vaak is hij betaald voor de monteur thuis is.", who: "Jeroen", what: "loodgietersbedrijf met 5 monteurs" },
  { q: "Ik ben niet handig met computers. Dit snapte ik in één ochtend, en mijn jongens ook.", who: "Henk", what: "dakdekker met 3 man" },
  { q: "Een spoedklus ertussen schuiven was een halfuur bellen. Nu is het één keer slepen en iedereen weet het.", who: "Lotte", what: "planner bij een servicebedrijf" },
];

function Head({ nr, kicker, children, text }: { nr: string; kicker: string; children: React.ReactNode; text?: string }) {
  return (
    <header className="w-head">
      <p className="w-kicker" data-rv>
        <b>{nr}</b>
        {kicker}
      </p>
      <h2 data-rv>{children}</h2>
      {text && <p data-rv>{text}</p>}
    </header>
  );
}

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="w-ticks">
      {items.map((t) => (
        <li key={t}>
          <Check aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Veldwerk() {
  return (
    <DemoShell slug="saas" name="Veldwerk" className={`d-veldwerk ${display.variable} ${sans.variable}`}>
      <Nav />
      <main id="top">
        {/* 1 · Opening met bewegend product */}
        <section className="w-hero">
          <div className="w-hero-bg" aria-hidden="true" />
          <div className="w-wrap">
            <p className="w-chip w-rise" style={i(0)}>
              <i aria-hidden="true" />
              Planning en werkbonnen voor installateurs en servicebedrijven
            </p>
            <h1>
              <span className="w-line">
                <span>Van storing tot factuur.</span>
              </span>
              <span className="w-line">
                <span>
                  <em>Op één planbord.</em>
                </span>
              </span>
            </h1>
            <div className="w-hero-row">
              <p className="w-lede w-rise" style={i(3)}>
                Sleep een klus naar een monteur en hij staat in zijn app. De klant tekent de werkbon op de telefoon, de factuur is onderweg voordat de bus de straat uit is.
              </p>
              <div className="w-hero-cta w-rise" style={i(4)}>
                <a href="#proef" className="w-btn w-btn-lime">
                  Start 14 dagen gratis
                  <ArrowRight aria-hidden="true" />
                </a>
                <a href="#product" className="w-btn w-btn-line">
                  Bekijk het product
                </a>
                <p>Geen creditcard nodig · in een middag ingericht</p>
              </div>
            </div>
            <Stage>
              <div className="w-live" data-rv>
                <p>
                  <b>Eén keer slepen.</b> Monteur, werkbon en factuur weten het op hetzelfde moment.
                </p>
                <dl>
                  {LIVE.map((l) => (
                    <div key={l.label}>
                      <dd>
                        {l.pre}
                        <span className="w-sr">{l.to}</span>
                        <span className="w-num" aria-hidden="true" style={{ ["--w-n" as string]: l.to }} />
                      </dd>
                      <dt>{l.label}</dt>
                    </div>
                  ))}
                </dl>
                <small>Voorbeeldgegevens uit de demo-omgeving, dinsdag 10.50 uur</small>
              </div>
            </Stage>
          </div>
        </section>

        {/* Band: voor wie */}
        <div className="w-band" aria-hidden="true">
          <p>
            {[...TRADES, ...TRADES].map((t, n) => (
              <span key={n}>{t}</span>
            ))}
          </p>
        </div>

        {/* 2 · Functies */}
        <section className="w-sec w-features" id="functies">
          <div className="w-aura w-aura-l" data-px aria-hidden="true" />
          <div className="w-wrap">
            <Head nr="01" kicker="Functies" text="Geen losse agenda, bonnenboekje en factuurprogramma meer. Veldwerk is één systeem voor kantoor en bus, gebouwd rond de klus.">
              Alles wat er gebeurt tussen <em>het telefoontje en de betaling.</em>
            </Head>
            <div className="w-bento">
              <Spot className="w-f w-f1" data-rv>
                <div className="w-f-ui w-drag" aria-hidden="true">
                  <div className="w-drag-lane">
                    <small>Sem</small>
                    <i style={{ ["--x" as string]: "4%", ["--w" as string]: "26%" }} data-tone="v" />
                    <i style={{ ["--x" as string]: "70%", ["--w" as string]: "24%" }} data-tone="a" />
                  </div>
                  <div className="w-drag-lane">
                    <small>Mila</small>
                    <i style={{ ["--x" as string]: "8%", ["--w" as string]: "22%" }} data-tone="p" />
                    <i style={{ ["--x" as string]: "74%", ["--w" as string]: "20%" }} data-tone="c" />
                  </div>
                  <div className="w-drag-job">
                    <b>Meterkast uitbreiden</b>
                    <span>13:00 · 2 uur</span>
                    <MousePointer2 />
                  </div>
                  <p className="w-drag-tip">
                    <Check /> Past · 9 min rijden vanaf Houten
                  </p>
                </div>
                <h3>Plannen door te slepen</h3>
                <p>Sleep een klus naar een monteur. Veldwerk rekent reistijd, werktijden en vaardigheden mee en zegt het meteen als iets niet past.</p>
              </Spot>

              <Spot className="w-f w-f2" data-rv style={i(1)}>
                <div className="w-f-ui w-sig" aria-hidden="true">
                  <div className="w-sig-pad">
                    <svg viewBox="0 0 170 46">
                      <path d="M5 33c9-17 17-26 22-22 5 5-11 27-4 29 7 2 13-25 21-25 6 0 0 19 6 19s10-15 16-15 2 13 8 13 12-11 20-13 15 6 31 2 21-8 40-11" />
                    </svg>
                  </div>
                  <p>
                    <span>
                      <Camera /> 4 foto’s
                    </span>
                    <span>
                      <Check /> Getekend 11:42
                    </span>
                  </p>
                </div>
                <h3>Werkbon met foto en handtekening</h3>
                <p>De klant tekent op de telefoon van de monteur en krijgt een kopie in de mail. Kantoor hoeft niets over te typen.</p>
              </Spot>

              <Spot className="w-f w-f3" data-rv>
                <div className="w-f-ui w-map" aria-hidden="true">
                  <svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice">
                    <path className="w-map-grid" d="M0 38h300M0 82h300M0 122h300M46 0v150M118 0v150M196 0v150M258 0v150" />
                    <path className="w-map-route" d="M30 122h88V82h78V38h62" />
                    <g className="w-map-pins">
                      <circle cx="30" cy="122" r="7" />
                      <circle cx="118" cy="82" r="7" />
                      <circle cx="196" cy="38" r="7" />
                      <circle cx="258" cy="38" r="7" />
                    </g>
                  </svg>
                  <p>
                    <MapPin /> 4 adressen · 41 km · 58 min rijden
                  </p>
                </div>
                <h3>Routes die kloppen</h3>
                <p>De volgorde van de dag volgt de kaart, niet de volgorde waarin er gebeld is.</p>
              </Spot>

              <figure className="w-f w-f4" data-rv style={i(1)}>
                <Pic img={I.electrician} alt="Een elektricien met gele helm werkt aan een aansluitkast" sizes="(min-width: 1000px) 30vw, 100vw" />
                <figcaption>
                  <b>Gebouwd met monteurs, niet voor ze.</b>
                  Grote knoppen, weinig tekst. Werkt met handschoenen aan en zonder bereik.
                </figcaption>
              </figure>

              <Spot className="w-f w-f5" data-rv style={i(2)}>
                <div className="w-f-ui w-pay" aria-hidden="true">
                  <p>
                    <span>Factuur F-0412</span>
                    <b>€ 186,50</b>
                  </p>
                  <ol>
                    <li>Concept</li>
                    <li>Verstuurd</li>
                    <li data-on="">Betaald</li>
                  </ol>
                </div>
                <h3>Factuur in één tik</h3>
                <p>Uren en materiaal staan er al op. Controleren, versturen, klaar. Met betaallink.</p>
              </Spot>

              <Spot className="w-f w-f6" data-rv>
                <div className="w-f-ui w-stock" aria-hidden="true">
                  {[
                    ["Knie 15 mm, koper", "14 st", 0.78, ""],
                    ["Flexibele slang 3/8", "9 st", 0.52, ""],
                    ["Thermostaatkraan", "2 st · besteld", 0.14, "low"],
                  ].map(([name, qty, v, low]) => (
                    <p key={name as string} data-low={low ? "" : undefined}>
                      <span>{name}</span>
                      <em>{qty}</em>
                      <i style={{ ["--v" as string]: v }} />
                    </p>
                  ))}
                </div>
                <h3>Voorraad in elke bus</h3>
                <p>Wat op de werkbon komt, gaat van de voorraad af. Raakt iets op, dan staat het al op de bestellijst.</p>
              </Spot>

              <Spot className="w-f w-f7" data-rv style={i(1)}>
                <div className="w-f-ui w-year" aria-hidden="true">
                  {[3, 5, 9, 6, 4, 2, 2, 3, 7, 10, 8, 4].map((v, n) => (
                    <i key={n} style={{ ["--v" as string]: v / 10, ["--i" as string]: n }} data-on={n === 10 ? "" : undefined}>
                      <span>{"JFMAMJJASOND"[n]}</span>
                    </i>
                  ))}
                </div>
                <h3>Onderhoud dat zichzelf inplant</h3>
                <p>Contracten voor ketels, warmtepompen en airco’s komen elk jaar vanzelf terug op het bord, met de juiste checklist erbij.</p>
              </Spot>
            </div>
          </div>
        </section>

        {/* 3 · Productdemonstratie in tabbladen */}
        <section className="w-sec w-product" id="product">
          <div className="w-wrap">
            <Head nr="02" kicker="Het product" text="Klik door de vier onderdelen. Wat je ziet zijn geen schermafbeeldingen: het is nagebouwd zoals je monteurs en planners het gebruiken.">
              Kijk rond. <em>Zo werkt een dag met Veldwerk.</em>
            </Head>
            <div data-rv>
              <ProductTabs>
                {/* Planning */}
                <div className="w-pane-in">
                  <div className="w-pane-copy">
                    <h3>Plan een week in een kwartier.</h3>
                    <p>Het weekoverzicht laat per monteur zien hoe vol de dag al zit. Nieuwe aanvragen staan links klaar. Veldwerk stelt het beste moment voor, jij sleept.</p>
                    <Ticks items={["Rekent de reistijd tussen klussen mee", "Kent vaardigheden en werktijden per monteur", "Waarschuwt bij dubbele afspraken en te volle dagen"]} />
                  </div>
                  <div className="w-card w-win" aria-hidden="true">
                    <div className="w-win-bar">
                      <span>Planning</span>
                      <b>Week 47</b>
                      <em>3 nog in te plannen</em>
                    </div>
                    <div className="w-wk">
                      <div className="w-wk-todo">
                        {[
                          ["Lekkende kraan keuken", "Utrecht-Oost · 1 uur", "p"],
                          ["Ketel plaatsen", "Zeist · 4 uur", "c"],
                          ["Jaarbeurt airco", "Houten · 1,5 uur", "v"],
                        ].map(([t, s, tone], n) => (
                          <p key={t} data-tone={tone} data-pick={n === 0 ? "" : undefined}>
                            <GripVertical />
                            <b>{t}</b>
                            <span>{s}</span>
                          </p>
                        ))}
                      </div>
                      <div className="w-wk-grid">
                        <span />
                        {DAYS.map((d) => (
                          <span key={d} className="w-wk-day">
                            {d}
                          </span>
                        ))}
                        {WEEK.map((row, r) => (
                          <div key={row.n} className="w-wk-row">
                            <span className="w-wk-name">{row.n}</span>
                            {row.v.map((v, c) => (
                              <i key={c} data-full={v >= 100 ? "" : undefined} data-pick={r === 2 && c === 2 ? "" : undefined} style={{ ["--v" as string]: v / 100, ["--i" as string]: r + c }}>
                                <b>{v >= 100 ? "vol" : `${Math.round((v / 100) * 8)} u`}</b>
                              </i>
                            ))}
                          </div>
                        ))}
                      </div>
                      <p className="w-wk-tip">
                        <Check /> Voorstel: woensdag 10:30 bij Sem · 12 min rijden · kraan ligt in bus 3
                      </p>
                    </div>
                  </div>
                </div>

                {/* Werkbonnen */}
                <div className="w-pane-in">
                  <div className="w-pane-copy">
                    <h3>De werkbon is af voordat de bus wegrijdt.</h3>
                    <p>De monteur vinkt af wat er gedaan is, voegt foto’s en materiaal toe en laat de klant tekenen op zijn telefoon. Kantoor ziet het op hetzelfde moment.</p>
                    <Ticks items={["Eigen checklist per soort klus", "Foto’s van voor en na in het dossier van de klant", "Handtekening op het scherm, kopie per e-mail"]} />
                  </div>
                  <div className="w-card w-win" aria-hidden="true">
                    <div className="w-win-bar">
                      <span>Werkbonnen</span>
                      <b>WB-2418</b>
                      <em data-lime="">Getekend</em>
                    </div>
                    <div className="w-sheet">
                      <div>
                        <b className="w-sheet-title">Lekkage badkamer</b>
                        <p className="w-sheet-meta">Fam. Bakker · Zeist · Daan, bus 1</p>
                        <ol className="w-steps">
                          <li data-on="">Gepland</li>
                          <li data-on="">Onderweg</li>
                          <li data-on="">Bezig</li>
                          <li data-on="">Getekend</li>
                        </ol>
                        <ul className="w-checks">
                          <li>
                            <Check /> Lek opgespoord onder de douchebak
                          </li>
                          <li>
                            <Check /> Sifon en afvoer vervangen
                          </li>
                          <li>
                            <Check /> Afgekit en twintig minuten getest
                          </li>
                          <li>
                            <Check /> Werkplek schoon achtergelaten
                          </li>
                        </ul>
                      </div>
                      <div>
                        <table>
                          <tbody>
                            <tr>
                              <td>Arbeid, 2 uur</td>
                              <td>€ 122,00</td>
                            </tr>
                            <tr>
                              <td>Sifon 40 mm</td>
                              <td>€ 18,50</td>
                            </tr>
                            <tr>
                              <td>Afvoerset en kit</td>
                              <td>€ 46,00</td>
                            </tr>
                            <tr>
                              <th>Totaal incl. btw</th>
                              <th>€ 186,50</th>
                            </tr>
                          </tbody>
                        </table>
                        <div className="w-sheet-pics">
                          <Pic img={I.fitter} alt="" sizes="160px" />
                          <Pic img={I.roofer} alt="" sizes="160px" />
                          <span>
                            <Camera /> +2
                          </span>
                        </div>
                        <div className="w-sheet-sign">
                          <svg viewBox="0 0 170 46">
                            <path d="M5 33c9-17 17-26 22-22 5 5-11 27-4 29 7 2 13-25 21-25 6 0 0 19 6 19s10-15 16-15 2 13 8 13 12-11 20-13 15 6 31 2 21-8 40-11" />
                          </svg>
                          <span>Getekend door de bewoner, 11:42</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Facturatie */}
                <div className="w-pane-in">
                  <div className="w-pane-copy">
                    <h3>Van getekende werkbon naar betaalde factuur.</h3>
                    <p>Uren en materiaal van de werkbon staan al op de factuur. Controleer, verstuur en laat de klant betalen met de betaallink. Wat openstaat, zie je in één lijst.</p>
                    <Ticks items={["Factuur in je eigen huisstijl", "Vriendelijke herinnering na veertien dagen", "Betalingen vanzelf afgeletterd in je boekhouding"]} />
                  </div>
                  <div className="w-card w-win" aria-hidden="true">
                    <div className="w-win-bar">
                      <span>Facturatie</span>
                      <b>November</b>
                      <em>5 van 38</em>
                    </div>
                    <div className="w-inv">
                      <dl>
                        <div>
                          <dt>Openstaand</dt>
                          <dd>€ 1.334</dd>
                        </div>
                        <div data-lime="">
                          <dt>Deze week betaald</dt>
                          <dd>€ 6.412</dd>
                        </div>
                        <div>
                          <dt>Betaald binnen</dt>
                          <dd>6 dagen</dd>
                        </div>
                      </dl>
                      <ul>
                        {INVOICES.map((f, n) => (
                          <li key={f.nr} style={i(n)}>
                            <span>{f.nr}</span>
                            <b>{f.who}</b>
                            <em>€ {f.sum}</em>
                            <u data-st={f.st}>{f.label}</u>
                          </li>
                        ))}
                      </ul>
                      <p className="w-inv-tip">
                        <CreditCard /> F-0412 betaald via betaallink, 4 minuten na versturen
                      </p>
                    </div>
                  </div>
                </div>

                {/* App voor monteurs */}
                <div className="w-pane-in">
                  <div className="w-pane-copy">
                    <h3>Een app die ook met vieze handen werkt.</h3>
                    <p>Grote knoppen, weinig tekst en alles voor vandaag op één scherm. Je monteurs zien hun route, het dossier van de klant en wat er in de bus ligt.</p>
                    <Ticks items={["Voor iPhone en Android", "Werkt door zonder bereik en werkt later bij", "Met één tik navigeren naar de volgende klus"]} />
                  </div>
                  <div className="w-phones" aria-hidden="true">
                    <div className="w-ph">
                      <div className="w-ph-screen">
                        <div className="w-ph-bar">
                          <span>07:42</span>
                          <i />
                        </div>
                        <p className="w-ph-hi">
                          Goedemorgen Daan
                          <span>3 klussen · 41 km</span>
                        </p>
                        <div className="w-ph-next">
                          <small>Eerste klus</small>
                          <b>CV-onderhoud</b>
                          <span>De Bilt · 08:00 tot 09:30</span>
                          <em>
                            <Navigation /> Navigeer · 14 min
                          </em>
                        </div>
                        <ul className="w-ph-list">
                          <li>
                            <time>10:00</time>
                            <span>Lekkage badkamer</span>
                            <i />
                          </li>
                          <li>
                            <time>13:00</time>
                            <span>Radiatoren inregelen</span>
                            <i />
                          </li>
                        </ul>
                        <div className="w-ph-tabs">
                          <Home />
                          <ListChecks />
                          <ClipboardCheck />
                          <User />
                        </div>
                      </div>
                    </div>
                    <div className="w-ph w-ph-b">
                      <div className="w-ph-screen">
                        <div className="w-ph-bar">
                          <span>10:04</span>
                          <u>
                            <WifiOff /> Geen bereik
                          </u>
                        </div>
                        <p className="w-ph-hi">
                          Lekkage badkamer
                          <span>Fam. Bakker · Zeist</span>
                        </p>
                        <ul className="w-ph-checks">
                          <li data-on="">
                            <Check /> Lek opgespoord
                          </li>
                          <li data-on="">
                            <Check /> Sifon vervangen
                          </li>
                          <li>
                            <Check /> Afgekit en getest
                          </li>
                        </ul>
                        <div className="w-ph-acts">
                          <span>
                            <Camera /> Foto
                          </span>
                          <span>
                            <Package /> Materiaal
                          </span>
                        </div>
                        <em className="w-ph-go">Laat de klant tekenen</em>
                        <small className="w-ph-off">Opgeslagen op dit toestel</small>
                      </div>
                    </div>
                  </div>
                </div>
              </ProductTabs>
            </div>
          </div>
        </section>

        {/* 4 · Koppelingen */}
        <section className="w-sec w-links-sec" id="koppelingen">
          <div className="w-aura w-aura-c" data-px aria-hidden="true" />
          <div className="w-wrap">
            <Head nr="03" kicker="Koppelingen" text="Niets dubbel overtypen. Facturen, afspraken, betalingen en voorraad lopen door naar de systemen waar je boekhouder en je klanten al mee werken.">
              Veldwerk praat met <em>wat je al gebruikt.</em>
            </Head>
            <div className="w-hub">
              <ul className="w-hub-side w-hub-a">
                {LINKS.slice(0, 3).map((l, n) => (
                  <li key={l.kind} data-rv style={i(n)}>
                    <i aria-hidden="true">
                      <l.Icon />
                    </i>
                    <small>{l.kind}</small>
                    <h3>{l.name}</h3>
                    <p>{l.text}</p>
                  </li>
                ))}
              </ul>
              <div className="w-card w-core" data-rv>
                <p className="w-core-mark">
                  <Mark />
                  veldwerk
                </p>
                <p className="w-core-st">
                  <i aria-hidden="true" /> Alles bijgewerkt, zojuist
                </p>
                <ul aria-label="Voorbeeld van wat er vanzelf wordt doorgezet">
                  {FEED.map((f, n) => (
                    <li key={f} style={i(n)}>
                      <Check aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="w-hub-side w-hub-b">
                {LINKS.slice(3).map((l, n) => (
                  <li key={l.kind} data-rv style={i(n)}>
                    <i aria-hidden="true">
                      <l.Icon />
                    </i>
                    <small>{l.kind}</small>
                    <h3>{l.name}</h3>
                    <p>{l.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5 · Prijzen */}
        <section className="w-sec w-prices" id="prijzen">
          <div className="w-aura w-aura-r" data-px aria-hidden="true" />
          <div className="w-wrap">
            <Head nr="04" kicker="Prijzen" text="Schuif naar het aantal monteurs en zie wat het per maand kost. Geen opstartkosten, geen kleine lettertjes.">
              Je betaalt per monteur. <em>Kantoor kijkt gratis mee.</em>
            </Head>
            <Pricing />
          </div>
        </section>

        {/* 6 · Klanten aan het woord */}
        <section className="w-sec w-voices" id="klanten">
          <div className="w-wrap">
            <Head nr="05" kicker="Klanten aan het woord">
              Minder bellen, <em>eerder naar huis.</em>
            </Head>
            <div className="w-voice-grid">
              <figure className="w-voice-lead" data-rv>
                <div className="w-voice-pic">
                  <Pic img={I.carpenter} alt="Een vakman met helm en gehoorbescherming zaagt een balk in een werkplaats" sizes="(min-width: 1000px) 48vw, 100vw" />
                </div>
                <blockquote>
                  <p>Vroeger belde ik elke ochtend zes man om te vragen waar ze waren. Nu kijk ik op het bord en bel ik alleen nog als er iets leuks te melden is.</p>
                  <footer>
                    <b>Rick</b>
                    <span>installatiebedrijf met 12 monteurs</span>
                  </footer>
                </blockquote>
              </figure>
              <div className="w-voice-list">
                {QUOTES.map((q, n) => (
                  <blockquote key={q.who} className="w-card" data-rv style={i(n % 2)}>
                    <p>{q.q}</p>
                    <footer>
                      <i aria-hidden="true">{q.who[0]}</i>
                      <b>{q.who}</b>
                      <span>{q.what}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7 · Veelgestelde vragen */}
        <section className="w-sec w-faq-sec" id="vragen">
          <div className="w-wrap w-faq-grid">
            <div className="w-faq-side">
              <Head nr="06" kicker="Veelgestelde vragen" text="Staat je vraag er niet bij? Bel of mail, je krijgt iemand aan de lijn die het product kent.">
                Vragen die we <em>elke week krijgen.</em>
              </Head>
              <p className="w-faq-contact" data-rv>
                <a href="tel:0300000000">030 000 00 00</a>
                <a href="mailto:hallo@veldwerk.example">hallo@veldwerk.example</a>
              </p>
            </div>
            <Faq />
          </div>
        </section>

        {/* 8 · Proefperiode starten */}
        <section className="w-trial" id="proef">
          <div className="w-wrap">
            <div className="w-trial-box">
              <div className="w-trial-bg" aria-hidden="true" data-px>
                <Pic img={I.glow} alt="" sizes="100vw" />
              </div>
              <div className="w-trial-copy">
                <p className="w-kicker" data-rv>
                  <b>07</b>
                  Proefperiode starten
                </p>
                <h2 data-rv>
                  Zet morgen je eerste werkdag <em>op het bord.</em>
                </h2>
                <p data-rv>Veertien dagen alles proberen met je eigen klussen en monteurs. Geen creditcard, geen verplichtingen. Bevalt het niet, dan hoef je niets op te zeggen.</p>
                <ol className="w-trial-steps" data-rv>
                  <li>
                    <b>Vandaag</b>
                    Je account staat klaar binnen twee minuten.
                  </li>
                  <li>
                    <b>Deze week</b>
                    Wij lezen je klanten en objecten in.
                  </li>
                  <li>
                    <b>Dag 14</b>
                    Jij beslist. Er gebeurt niets vanzelf.
                  </li>
                </ol>
              </div>
              <div className="w-trial-card" data-rv>
                <h3>Start je proefperiode</h3>
                <Trial />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-foot">
        <div className="w-wrap">
          <div className="w-foot-top">
            <a href="#top" className="w-logo" aria-label="Veldwerk, naar boven">
              <Mark />
              veldwerk
            </a>
            <p>Planning- en werkbonsoftware voor installateurs en servicebedrijven. Gemaakt in Utrecht.</p>
            <p className="w-foot-st">
              <i aria-hidden="true" /> Alle systemen werken
            </p>
          </div>
          <div className="w-foot-grid">
            <div>
              <h3>Product</h3>
              <a href="#functies">Functies</a>
              <a href="#product">Planning</a>
              <a href="#product">Werkbonnen</a>
              <a href="#product">Facturatie</a>
              <a href="#product">App voor monteurs</a>
            </div>
            <div>
              <h3>Meer</h3>
              <a href="#koppelingen">Koppelingen</a>
              <a href="#prijzen">Prijzen</a>
              <a href="#klanten">Klanten aan het woord</a>
              <a href="#vragen">Veelgestelde vragen</a>
              <a href="#proef">Proefperiode starten</a>
            </div>
            <div>
              <h3>Contact</h3>
              <a href="tel:0300000000">030 000 00 00</a>
              <a href="mailto:hallo@veldwerk.example">hallo@veldwerk.example</a>
              <p>Veldwerk, Utrecht</p>
            </div>
            <div>
              <h3>Support</h3>
              <p>Maandag t/m vrijdag 08.00 – 17.30</p>
              <p>Zaterdag storingslijn 09.00 – 13.00</p>
              <p>Zondag gesloten</p>
            </div>
          </div>
          <p className="w-legal">
            <span>© Veldwerk, Utrecht</span>
            <span>Demo-ontwerp van HOPI · Veldwerk is een fictief bedrijf</span>
          </p>
        </div>
      </footer>
    </DemoShell>
  );
}
