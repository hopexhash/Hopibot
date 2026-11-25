import {
  ArrowRight,
  Bike,
  Brush,
  CalendarDays,
  Camera,
  Car,
  CircleCheck,
  Clock,
  Coffee,
  Droplets,
  Flame,
  Gem,
  Gift,
  Globe,
  Heart,
  House,
  KeyRound,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Ruler,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Smile,
  Sparkles,
  Sprout,
  Star,
  Sun,
  TrendingUp,
  Truck,
  User,
  UtensilsCrossed,
  Wine,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { ICONS, SiteSection, SiteSpec } from "@/lib/site-spec";
import { artDataUri, generateArt } from "./art";
import { designForSpec, type Design } from "./designs";
import { themeVars } from "./theme";

const ICON_MAP: Record<(typeof ICONS)[number], LucideIcon> = {
  star: Star, heart: Heart, shield: ShieldCheck, clock: Clock, phone: Phone, map: MapPin, leaf: Leaf, spark: Sparkles, tool: Wrench, home: House,
  car: Car, user: User, check: CircleCheck, "award-free": Gem, calendar: CalendarDays, chat: MessageCircle, coffee: Coffee, utensils: UtensilsCrossed,
  tooth: Smile, scissors: Scissors, bolt: Zap, drop: Droplets, key: KeyRound, chart: TrendingUp, globe: Globe, sun: Sun, truck: Truck, flame: Flame,
  bag: ShoppingBag, bike: Bike, brush: Brush, ruler: Ruler, camera: Camera, sprout: Sprout, wine: Wine, gift: Gift,
};

export type RenderOptions = {
  agencyName: string;
  agencyContact?: string;
  seedKey: string;
};

const T = {
  nl: {
    demoA: "Demonstratie",
    demoB: (agency: string, biz: string) => ` — een ontwerpconcept gemaakt door ${agency}. Dit is niet de officiële website van ${biz}.`,
    menu: "Menu", skip: "Naar inhoud", phone: "Telefoon", email: "E-mail", address: "Adres", hours: "Openingstijden",
    hoursTbc: "Openingstijden worden nog bevestigd.", name: "Naam", message: "Bericht", send: "Verstuur bericht",
    formNote: "Dit is een demonstratie: het formulier verstuurt geen gegevens.", formDone: "Bedankt! Dit is een demonstratie — er is niets verzonden.",
    route: "Routebeschrijving", contact: "Contact", explore: "Ontdek", rights: "Ontwerpconcept", call: "Bel ons", today: "Vandaag",
    date: "Datum", time: "Tijd", guests: "Aantal personen", service: "Dienst", choose: "Maak een keuze", pickup: "Afhalen", delivery: "Bezorgen",
    how: "Hoe wilt u bestellen?", notes: "Opmerkingen", before: "Voor", after: "Na", example: "Voorbeeldweergave — hier komen uw eigen foto's",
    onRequest: "Op aanvraag", popular: "Meest gekozen", source: "Bron", slider: "Vergelijk voor en na", persons: "personen",
    submit: { reservation: "Reservering aanvragen", appointment: "Afspraak aanvragen", quote: "Offerte aanvragen", order: "Bestelling plaatsen" },
    kick: { about: "Over ons", services: "Diensten", menu: "Menukaart", features: "Waarom wij", process: "Werkwijze", gallery: "Impressie", hours: "Bezoek ons", faq: "Vragen", contact: "Contact", packages: "Pakketten", team: "Team", booking: "Plannen", beforeafter: "Voor & na", order: "Bestellen", testimonials: "Ervaringen", cta: "" },
  },
  en: {
    demoA: "Demonstration",
    demoB: (agency: string, biz: string) => ` — a design concept created by ${agency}. This is not the official website of ${biz}.`,
    menu: "Menu", skip: "Skip to content", phone: "Phone", email: "Email", address: "Address", hours: "Opening hours",
    hoursTbc: "Opening hours to be confirmed.", name: "Name", message: "Message", send: "Send message",
    formNote: "This is a demonstration: the form does not send any data.", formDone: "Thank you! This is a demonstration — nothing was sent.",
    route: "Get directions", contact: "Contact", explore: "Explore", rights: "Design concept", call: "Call us", today: "Today",
    date: "Date", time: "Time", guests: "Guests", service: "Service", choose: "Choose an option", pickup: "Pickup", delivery: "Delivery",
    how: "How would you like to order?", notes: "Notes", before: "Before", after: "After", example: "Example view — your own photos go here",
    onRequest: "On request", popular: "Most popular", source: "Source", slider: "Compare before and after", persons: "guests",
    submit: { reservation: "Request reservation", appointment: "Request appointment", quote: "Request a quote", order: "Place order" },
    kick: { about: "About", services: "Services", menu: "Menu", features: "Why us", process: "How we work", gallery: "Gallery", hours: "Visit us", faq: "Questions", contact: "Contact", packages: "Packages", team: "Team", booking: "Book", beforeafter: "Before & after", order: "Order", testimonials: "Reviews", cta: "" },
  },
};
type Strings = typeof T.en;
const strings = (lang: string): Strings => (T as Record<string, Strings>)[lang] ?? T.en;

type Ctx = { spec: SiteSpec; opts: RenderOptions; t: Strings; design: Design };

export function resolveImage(spec: SiteSpec, ref: string, opts: RenderOptions, variant: number, w = 1200, h = 1000): { src: string; alt: string; credit?: string } {
  const img = spec.images.find((i) => i.key === ref);
  if (img && img.license !== "generated" && /^https:\/\//.test(img.src)) return { src: img.src, alt: img.alt, credit: img.credit ?? undefined };
  const design = designForSpec(spec.theme);
  const p = design.palette;
  const accent = spec.theme.design ? spec.theme.accent : p.accent;
  const primary = spec.theme.design ? spec.theme.primary : p.primary;
  const svg = generateArt(design.art, { bg: p.bg, ink: p.ink, surface: p.surface, primary, accent, dark: design.mode === "dark" }, opts.seedKey, variant, w, h);
  return { src: artDataUri(svg), alt: img?.alt || `Illustration for ${spec.business.name}` };
}

const Icon = ({ name }: { name: (typeof ICONS)[number] }) => {
  const C = ICON_MAP[name] ?? Sparkles;
  return <C aria-hidden="true" strokeWidth={1.7} />;
};

function Img({ c, refKey, variant, w, h, eager, className }: { c: Ctx; refKey: string; variant: number; w: number; h: number; eager?: boolean; className?: string }) {
  const img = resolveImage(c.spec, refKey, c.opts, variant, w, h);
  return <img className={className} src={img.src} alt={img.alt} width={w} height={h} {...(eager ? { fetchPriority: "high" as const } : { loading: "lazy" as const, decoding: "async" as const })} />;
}

function Head({ kicker, title, intro }: { kicker?: string; title: string; intro?: string }) {
  return (
    <div className="section-head reveal">
      {kicker ? <span className="kicker">{kicker}</span> : null}
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

function hoursRows(lines: string[]) {
  return lines.map((l) => {
    const i = l.indexOf(":");
    return i > 0 ? [l.slice(0, i), l.slice(i + 1).trim()] : [l, ""];
  });
}

const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;

/** Demo form. `uid` keeps ids unique when the same form appears twice on a page. */
function BookingForm({ c, kind, options, uid, compact }: { c: Ctx; kind: "reservation" | "appointment" | "quote" | "order" | "message"; options: string[]; uid: string; compact?: boolean }) {
  const { t } = c;
  const id = (n: string) => `${uid}-${n}`;
  const field = (n: string, label: string, props: Record<string, unknown> = {}) => (
    <div>
      <label htmlFor={id(n)}>{label}</label>
      <input id={id(n)} name={n} required {...props} />
    </div>
  );
  const select = (n: string, label: string, opts: string[]) => (
    <div>
      <label htmlFor={id(n)}>{label}</label>
      <select id={id(n)} name={n} required defaultValue="">
        <option value="" disabled>
          {t.choose}
        </option>
        {opts.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
  return (
    <form className={`form reveal${compact ? " compact" : ""}`} data-demo-form noValidate aria-describedby={id("note")}>
      {kind === "reservation" && (
        <>
          <div className="row">
            {field("date", t.date, { type: "date" })}
            {field("time", t.time, { type: "time" })}
          </div>
          {select("guests", t.guests, ["1", "2", "3", "4", "5", "6", "7+"].map((n) => `${n} ${t.persons}`))}
        </>
      )}
      {kind === "appointment" && (
        <>
          {options.length > 0 && select("service", t.service, options)}
          <div className="row">
            {field("date", t.date, { type: "date" })}
            {field("time", t.time, { type: "time" })}
          </div>
        </>
      )}
      {kind === "quote" && options.length > 0 && select("service", t.service, options)}
      {kind === "order" && select("method", t.how, [t.pickup, t.delivery])}
      <div className="row">
        {field("name", t.name, { autoComplete: "name" })}
        {kind === "message" || kind === "quote" ? field("email", t.email, { type: "email", autoComplete: "email" }) : field("phone", t.phone, { type: "tel", autoComplete: "tel" })}
      </div>
      {(kind === "message" || kind === "quote" || kind === "order" || !compact) && (
        <div>
          <label htmlFor={id("msg")}>{kind === "message" ? t.message : t.notes}</label>
          <textarea id={id("msg")} name="message" required={kind === "message"} />
        </div>
      )}
      <button className="btn btn-primary" type="submit">
        {kind === "message" ? t.send : t.submit[kind]} <ArrowRight aria-hidden="true" />
      </button>
      <p id={id("note")} className="form-note">
        {t.formNote}
      </p>
      <p className="form-status" role="status" aria-live="polite" data-done={t.formDone} />
    </form>
  );
}

function renderSection(s: SiteSection, i: number, c: Ctx): ReactNode {
  const { spec, t, design } = c;
  const v = design.v;
  const alt = i % 2 === 1 ? " alt" : "";
  const b = spec.business;
  const kick = t.kick[s.type];
  switch (s.type) {
    case "about":
      return (
        <section id={s.id} className={`section about v-${v.about}${alt}`} key={s.id}>
          <div className="wrap about-grid">
            <div className="about-media reveal">
              <Img c={c} refKey={s.image} variant={11} w={1000} h={1100} />
              {v.about === "overlap" && <Img c={c} refKey="art:about2" variant={12} w={600} h={600} className="about-inset" />}
            </div>
            <div className="about-copy reveal">
              <span className="kicker">{kick}</span>
              <h2>{s.title}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="highlights">
                  {s.highlights.map((h) => (
                    <li key={h}>
                      <CircleCheck aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      );
    case "services":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} intro={s.intro} />
            <div className={`svc v-${v.services}`}>
              {s.items.map((it, j) => (
                <article className="svc-item reveal" key={it.title}>
                  {v.services === "tiles" ? (
                    <div className="svc-img">
                      <Img c={c} refKey={`art:svc${j}`} variant={40 + j} w={700} h={520} />
                    </div>
                  ) : (
                    <div className="ic">
                      <Icon name={it.icon} />
                    </div>
                  )}
                  <div className="svc-body">
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                  </div>
                  {(it.price || it.duration) && (
                    <div className="svc-meta">
                      {it.duration ? <span className="dur">{it.duration}</span> : null}
                      {it.price ? <span className="price">{it.price}</span> : null}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    case "features":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} intro={s.intro} />
            <div className="features">
              {s.items.map((it) => (
                <div className="feature reveal" key={it.title}>
                  <div className="ic">
                    <Icon name={it.icon} />
                  </div>
                  <div>
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "menu":
      return (
        <section id={s.id} className={`section menu-sec v-${v.menu}${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} intro={s.intro} />
            <div className="menu">
              {s.categories.map((cat) => (
                <div className="menu-cat reveal" key={cat.name}>
                  <h3>{cat.name}</h3>
                  <div className="menu-items">
                    {cat.items.map((it) => (
                      <div className="menu-item" key={it.name}>
                        <div className="mi-top">
                          <b>{it.name}</b>
                          <i aria-hidden="true" />
                          {it.price ? <span className="price">{it.price}</span> : null}
                        </div>
                        {it.description ? <span className="mi-desc">{it.description}</span> : null}
                        {it.tags?.length ? (
                          <span className="mi-tags">
                            {it.tags.map((tag) => (
                              <em key={tag}>{tag}</em>
                            ))}
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {s.note && <p className="menu-note">{s.note}</p>}
          </div>
        </section>
      );
    case "process":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} intro={s.intro} />
            <div className="steps">
              {s.steps.map((st) => (
                <div className="step reveal" key={st.title}>
                  <h3>{st.title}</h3>
                  <p>{st.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "gallery":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} />
          </div>
          <div className={v.gallery === "strip" ? "gal-bleed" : "wrap"}>
            <div className={`gallery v-${v.gallery}`}>
              {s.images.map((ref, j) => (
                <figure className="reveal" key={`${ref}-${j}`}>
                  <Img c={c} refKey={ref} variant={20 + j} w={900} h={900} />
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    case "hours":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} />
            <div className="visit reveal">
              <div className="hours-card">
                {b.openingHours?.length ? (
                  <ul className="hours-list">
                    {hoursRows(b.openingHours).map(([d, h]) => (
                      <li key={d}>
                        <span>{d}</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="hours-note">{t.hoursTbc}</p>
                )}
                {s.note && <p className="hours-note">{s.note}</p>}
              </div>
              {(b.address || b.phone) && (
                <div className="visit-card">
                  <MapPin aria-hidden="true" />
                  {b.address && <p className="visit-addr">{b.address}</p>}
                  {b.phone && (
                    <a className="visit-tel" href={tel(b.phone)}>
                      {b.phone}
                    </a>
                  )}
                  {b.mapsUrl && (
                    <a className="btn btn-ghost" href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                      {t.route} <ArrowRight aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      );
    case "faq":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} />
            <div className="faq reveal">
              {s.items.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      );
    case "cta":
      return (
        <section id={s.id} className={`section cta-sec v-${v.cta}`} key={s.id}>
          {v.cta === "full" && (
            <div className="cta-bg" aria-hidden="true">
              <Img c={c} refKey="art:cta" variant={31} w={1600} h={700} />
            </div>
          )}
          <div className="wrap">
            <div className="cta-band reveal">
              <div>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
              <a className="btn btn-primary" href={s.cta.href}>
                {s.cta.label} <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      );
    case "packages":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} intro={s.intro} />
            <div className="packages">
              {s.items.map((p) => (
                <article className={`package reveal${p.featured ? " featured" : ""}`} key={p.name}>
                  {p.featured && <span className="pk-flag">{t.popular}</span>}
                  <h3>{p.name}</h3>
                  <p className="pk-price">
                    {p.price ? (
                      <>
                        <b>{p.price}</b>
                        {p.unit ? <small>{p.unit}</small> : null}
                      </>
                    ) : (
                      <b className="pk-req">{t.onRequest}</b>
                    )}
                  </p>
                  <p className="pk-desc">{p.description}</p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>
                        <CircleCheck aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            {s.note && <p className="menu-note">{s.note}</p>}
          </div>
        </section>
      );
    case "team":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} intro={s.intro} />
            <div className="team">
              {s.members.map((m, j) => (
                <article className="member reveal" key={`${m.name}-${j}`}>
                  <Img c={c} refKey={m.image} variant={60 + j} w={700} h={840} />
                  <h3>{m.name}</h3>
                  <span className="role">{m.role}</span>
                  {m.bio ? <p>{m.bio}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    case "booking":
      return (
        <section id={s.id} className={`section booking${alt}`} key={s.id}>
          <div className="wrap booking-grid">
            <div className="reveal">
              <span className="kicker">{kick}</span>
              <h2>{s.title}</h2>
              <p className="lead-sm">{s.body}</p>
              {b.phone && (
                <a className="big-tel" href={tel(b.phone)}>
                  <Phone aria-hidden="true" /> {b.phone}
                </a>
              )}
            </div>
            <BookingForm c={c} kind={s.kind} options={s.options} uid={`bk-${s.id}`} />
          </div>
        </section>
      );
    case "beforeafter":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} intro={s.intro} />
            <div className="ba-grid">
              {s.pairs.map((p, j) => {
                const generated = !spec.images.some((im) => im.key === p.after && im.license !== "generated");
                return (
                  <figure className="reveal" key={j}>
                    <div className={`ba${generated ? " ba-gen" : ""}`} data-ba>
                      <Img c={c} refKey={p.after} variant={70 + j} w={1000} h={700} />
                      <div className="ba-before">
                        <Img c={c} refKey={generated ? p.after : p.before} variant={70 + j} w={1000} h={700} />
                      </div>
                      <span className="ba-l">{t.before}</span>
                      <span className="ba-r">{t.after}</span>
                      <input type="range" min={0} max={100} defaultValue={50} aria-label={t.slider} />
                    </div>
                    <figcaption>{generated ? t.example : p.caption}</figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      );
    case "order":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} intro={s.body} />
            <div className="channels">
              {s.channels.map((ch) => (
                <a className="channel reveal" href={ch.href} key={ch.label}>
                  <div className="ic">
                    <Icon name={ch.icon} />
                  </div>
                  <div>
                    <b>{ch.label}</b>
                    <span>{ch.description}</span>
                  </div>
                  <ArrowRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>
      );
    case "testimonials":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <Head kicker={kick} title={s.title} />
            <div className="quotes">
              {s.items.map((q) => (
                <blockquote className="quote reveal" key={q.quote}>
                  <Quote aria-hidden="true" />
                  <p>{q.quote}</p>
                  <footer>
                    <b>{q.author}</b>
                    <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {t.source}: {q.source}
                    </a>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      );
    case "contact":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className={`wrap contact-grid${s.showForm ? "" : " solo"}`}>
            <div className="reveal">
              <span className="kicker">{kick}</span>
              <h2>{s.title}</h2>
              <p className="lead-sm">{s.body}</p>
              <ul className="contact-list">
                {b.phone && (
                  <li>
                    <div className="ic">
                      <Phone aria-hidden="true" />
                    </div>
                    <div>
                      <small>{t.phone}</small>
                      <a href={tel(b.phone)}>{b.phone}</a>
                    </div>
                  </li>
                )}
                {b.email && (
                  <li>
                    <div className="ic">
                      <Mail aria-hidden="true" />
                    </div>
                    <div>
                      <small>{t.email}</small>
                      <a href={`mailto:${b.email}`}>{b.email}</a>
                    </div>
                  </li>
                )}
                {b.address && (
                  <li>
                    <div className="ic">
                      <MapPin aria-hidden="true" />
                    </div>
                    <div>
                      <small>{t.address}</small>
                      <span>{b.address}</span>
                    </div>
                  </li>
                )}
              </ul>
              {s.showMap && b.mapsUrl && (
                <a className="btn btn-ghost map-link" href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin aria-hidden="true" /> {t.route}
                </a>
              )}
            </div>
            {s.showForm && <BookingForm c={c} kind="message" options={[]} uid={`ct-${s.id}`} />}
          </div>
        </section>
      );
  }
}

function Hero({ c }: { c: Ctx }) {
  const { spec, t, design } = c;
  const b = spec.business;
  const h = spec.hero;
  const variant = design.v.hero;
  const booking = spec.sections.find((s) => s.type === "booking");
  const firstList = spec.sections.find((s) => s.type === "services" || s.type === "features");
  const chips = firstList && "items" in firstList ? firstList.items.slice(0, 3).map((x) => ("title" in x ? x.title : "")) : [];
  const actions = (
    <div className="hero-actions">
      <a className="btn btn-primary" href={h.primaryCta.href}>
        {h.primaryCta.label} <ArrowRight aria-hidden="true" />
      </a>
      {h.secondaryCta && (
        <a className="btn btn-ghost" href={h.secondaryCta.href}>
          {h.secondaryCta.label}
        </a>
      )}
    </div>
  );
  const meta = (
    <div className="hero-meta">
      {b.city && (
        <span>
          <MapPin aria-hidden="true" /> {b.city}
        </span>
      )}
      {b.phone && (
        <span>
          <Phone aria-hidden="true" /> {b.phone}
        </span>
      )}
    </div>
  );
  const copy = (
    <>
      <span className="eyebrow">{h.eyebrow}</span>
      <h1>{h.headline}</h1>
      <p className="lead">{h.subheadline}</p>
    </>
  );
  const cls = `hero hero-${variant}`;
  switch (variant) {
    case "cinema":
      return (
        <section id="top" className={`${cls} on-image`}>
          <div className="hero-bg">
            <Img c={c} refKey={h.image} variant={1} w={1800} h={1100} eager />
          </div>
          <div className="wrap">
            <div className="reveal hero-copy">
              {copy}
              {actions}
            </div>
            {meta}
          </div>
        </section>
      );
    case "editorial":
      return (
        <section id="top" className={cls}>
          <div className="wrap">
            <div className="reveal ed-top">
              <span className="eyebrow">{h.eyebrow}</span>
              <h1>{h.headline}</h1>
            </div>
            <div className="ed-grid">
              <div className="hero-media reveal">
                <Img c={c} refKey={h.image} variant={1} w={1300} h={900} eager />
              </div>
              <div className="reveal ed-side">
                <p className="lead">{h.subheadline}</p>
                {actions}
                {meta}
              </div>
            </div>
          </div>
        </section>
      );
    case "poster": {
      const words = [h.eyebrow, b.city, h.primaryCta.label, b.tagline].filter(Boolean) as string[];
      return (
        <section id="top" className={cls}>
          <div className="wrap poster-grid">
            <div className="reveal hero-copy">
              {copy}
              {actions}
            </div>
            <div className="hero-media reveal">
              <Img c={c} refKey={h.image} variant={1} w={1000} h={1000} eager />
              {(h.note || b.city) && <span className="sticker">{h.note || b.city}</span>}
            </div>
          </div>
          <div className="marquee" aria-hidden="true">
            <div>
              {[0, 1, 2, 3].map((k) => (
                <span key={k}>
                  {words.map((w, j) => (
                    <b key={j}>{w}</b>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case "frame":
      return (
        <section id="top" className={cls}>
          <div className="wrap">
            <div className="reveal hero-copy">
              {copy}
              {actions}
            </div>
            <div className="frame-row reveal">
              <Img c={c} refKey="art:side1" variant={2} w={600} h={760} className="frame-side" />
              <div className="frame-main">
                <Img c={c} refKey={h.image} variant={1} w={900} h={1100} eager />
                {h.note && <span className="hand">{h.note}</span>}
              </div>
              <Img c={c} refKey="art:side2" variant={3} w={600} h={760} className="frame-side" />
            </div>
            {meta}
          </div>
        </section>
      );
    case "minimal":
      return (
        <section id="top" className={cls}>
          <div className="wrap min-grid">
            <span className="min-vert" aria-hidden="true">
              {[b.city, h.eyebrow].filter(Boolean).join(" — ")}
            </span>
            <div className="reveal hero-copy">
              {copy}
              {actions}
            </div>
            <div className="hero-media reveal">
              <Img c={c} refKey={h.image} variant={1} w={1000} h={1000} eager />
            </div>
          </div>
          <div className="wrap">{meta}</div>
        </section>
      );
    case "panel":
      return (
        <section id="top" className={cls}>
          <div className="panel-media">
            <Img c={c} refKey={h.image} variant={1} w={1400} h={1100} eager />
          </div>
          <div className="wrap">
            <div className="reveal hero-copy">
              {copy}
              {actions}
            </div>
            {chips.length > 0 && (
              <ul className="chips reveal">
                {chips.map((x) => (
                  <li key={x}>
                    <CircleCheck aria-hidden="true" /> {x}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      );
    case "card":
      return (
        <section id="top" className={cls}>
          <div className="hero-bg" aria-hidden="true">
            <Img c={c} refKey={h.image} variant={1} w={1800} h={1100} eager />
          </div>
          <div className="wrap card-grid">
            <div className="reveal hero-copy">
              {copy}
              {meta}
            </div>
            <div className="hero-card reveal">
              <b className="hc-title">{h.primaryCta.label}</b>
              <BookingForm c={c} kind={booking?.kind ?? "quote"} options={booking?.options ?? chips} uid="hero" compact />
            </div>
          </div>
        </section>
      );
    case "centered":
      return (
        <section id="top" className={cls}>
          <div className="wrap">
            <div className="reveal hero-copy">
              {copy}
              {actions}
              {meta}
            </div>
            <div className="hero-media reveal">
              <Img c={c} refKey={h.image} variant={1} w={1600} h={760} eager />
            </div>
          </div>
        </section>
      );
    default:
      return (
        <section id="top" className={cls}>
          <div className="wrap hero-grid">
            <div className="reveal hero-copy">
              {copy}
              {actions}
              {meta}
            </div>
            <div className="hero-media reveal">
              <Img c={c} refKey={h.image} variant={1} w={1000} h={1100} eager />
              {b.address ? (
                <div className="badge-float">
                  <div className="ic">
                    <MapPin aria-hidden="true" />
                  </div>
                  <div>
                    <b>{t.address}</b>
                    <small>{b.address}</small>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
  }
}

export function SiteDocument({ spec, opts, css, script }: { spec: SiteSpec; opts: RenderOptions; css: string; script: string }) {
  const t = strings(spec.meta.lang);
  const design = designForSpec(spec.theme);
  const c: Ctx = { spec, opts, t, design };
  const b = spec.business;
  const vars = themeVars(spec.theme) as CSSProperties;
  const navTypes = ["about", "services", "menu", "packages", "team", "gallery", "process", "hours", "faq", "contact"];
  const nav = spec.sections.filter((s) => navTypes.includes(s.type)).slice(0, 5);
  // Short, predictable menu labels; section titles can be long sentences.
  const navLabel = (s: SiteSection) => (s.title.length <= 14 ? s.title : t.kick[s.type] || s.title);
  const contactSection = spec.sections.find((s) => s.type === "contact");
  const cleanName = b.name.replace(/\[MOCK\]\s*/g, "").trim();
  const initials = cleanName.charAt(0).toUpperCase() || "•";
  const credits = [...new Set(spec.images.filter((i) => i.license === "stock" && i.credit).map((i) => i.credit as string))];
  const v = design.v;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: b.name,
    ...(b.address ? { address: b.address } : {}),
    ...(b.phone ? { telephone: b.phone } : {}),
    ...(b.openingHours?.length ? { openingHours: b.openingHours } : {}),
  };
  const brand = (
    <a className="brand" href="#top" aria-label={b.name}>
      <span className="brand-mark" aria-hidden="true">
        {initials}
      </span>
      <span className="brand-name">{b.name}</span>
    </a>
  );

  return (
    <html lang={spec.meta.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{spec.meta.title}</title>
        <meta name="description" content={spec.meta.description} />
        {spec.meta.keywords.length > 0 && <meta name="keywords" content={spec.meta.keywords.join(", ")} />}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="generator" content={`Design concept by ${opts.agencyName}`} />
        <meta property="og:title" content={spec.meta.title} />
        <meta property="og:description" content={spec.meta.description} />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content={design.palette.bg} />
        <link
          rel="icon"
          href={`data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='${vars["--accent" as keyof CSSProperties]}'/><text x='32' y='43' font-size='32' text-anchor='middle' fill='${vars["--on-accent" as keyof CSSProperties]}' font-family='sans-serif' font-weight='700'>${initials}</text></svg>`)}`}
        />
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body className={`d-${design.key} m-${design.mode} nav-${v.nav} head-${v.head} btn-${v.button} ftr-${v.footer}`} style={vars}>
        <a className="skip" href="#main">
          {t.skip}
        </a>
        <div className="demo-bar" role="note">
          <strong>{t.demoA}</strong>
          {t.demoB(opts.agencyName, b.name)}
        </div>
        {v.nav === "block" && (b.phone || b.address) ? (
          <div className="util">
            <div className="wrap">
              {b.address ? (
                <span>
                  <MapPin aria-hidden="true" /> {b.address}
                </span>
              ) : (
                <span />
              )}
              {b.phone && (
                <a href={tel(b.phone)}>
                  <Phone aria-hidden="true" /> {b.phone}
                </a>
              )}
            </div>
          </div>
        ) : null}
        <header className="hdr">
          <div className="wrap">
            {brand}
            <input type="checkbox" id="menu-toggle" className="menu-toggle" aria-hidden="true" tabIndex={-1} />
            <label htmlFor="menu-toggle" className="menu-btn" aria-label={t.menu} role="button" tabIndex={0}>
              <Menu aria-hidden="true" />
            </label>
            <nav className="nav" aria-label="Main">
              {nav.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {navLabel(s)}
                </a>
              ))}
              <a className="btn btn-primary" href={spec.hero.primaryCta.href}>
                {spec.hero.primaryCta.label}
              </a>
            </nav>
          </div>
        </header>
        <main id="main">
          <Hero c={c} />
          {spec.sections.map((s, i) => renderSection(s, i, c))}
        </main>
        <footer className="ftr">
          <div className="wrap">
            {v.footer === "big" && (
              <div className="ftr-word" aria-hidden="true">
                {cleanName}
              </div>
            )}
            <div className="ftr-grid">
              <div>
                {brand}
                <p>{spec.footer.blurb}</p>
              </div>
              <div>
                <h2 className="ftr-h">{t.explore}</h2>
                <ul>
                  {nav.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>{navLabel(s)}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="ftr-h">{t.contact}</h2>
                <ul>
                  {b.phone && (
                    <li>
                      <a href={tel(b.phone)}>{b.phone}</a>
                    </li>
                  )}
                  {b.email && (
                    <li>
                      <a href={`mailto:${b.email}`}>{b.email}</a>
                    </li>
                  )}
                  {b.address && <li>{b.address}</li>}
                  {!b.phone && !b.email && !b.address && contactSection && (
                    <li>
                      <a href={`#${contactSection.id}`}>{t.contact}</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="ftr-bottom">
              <span>
                © {new Date().getFullYear()} {b.name}
              </span>
              <span>
                {t.rights} · {opts.agencyName}
                {opts.agencyContact ? ` · ${opts.agencyContact}` : ""}
                {credits.length ? ` · Photos: ${credits.slice(0, 6).join(", ")}` : ""}
              </span>
            </div>
          </div>
        </footer>
        {b.phone && (
          <div className="mbar">
            <a href={tel(b.phone)} className="btn btn-ghost">
              <Phone aria-hidden="true" /> {t.call}
            </a>
            <a href={spec.hero.primaryCta.href} className="btn btn-primary">
              {spec.hero.primaryCta.label}
            </a>
          </div>
        )}
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </body>
    </html>
  );
}
