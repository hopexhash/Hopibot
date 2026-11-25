import {
  ArrowRight,
  CalendarDays,
  Car,
  CircleCheck,
  Clock,
  Coffee,
  Droplets,
  Gem,
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
  Scissors,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  User,
  UtensilsCrossed,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { ICONS, SiteSection, SiteSpec } from "@/lib/site-spec";
import { artDataUri, generateArt } from "./art";
import { themeVars } from "./theme";

const ICON_MAP: Record<(typeof ICONS)[number], LucideIcon> = {
  star: Star,
  heart: Heart,
  shield: ShieldCheck,
  clock: Clock,
  phone: Phone,
  map: MapPin,
  leaf: Leaf,
  spark: Sparkles,
  tool: Wrench,
  home: House,
  car: Car,
  user: User,
  check: CircleCheck,
  "award-free": Gem,
  calendar: CalendarDays,
  chat: MessageCircle,
  coffee: Coffee,
  utensils: UtensilsCrossed,
  tooth: Smile,
  scissors: Scissors,
  bolt: Zap,
  drop: Droplets,
  key: KeyRound,
  chart: TrendingUp,
  globe: Globe,
  sun: Sun,
};

export type RenderOptions = {
  agencyName: string;
  agencyContact?: string;
  seedKey: string;
};

const T = {
  nl: {
    demo: (agency: string, biz: string) => (
      <>
        <strong>Demonstratie</strong> — een ontwerpconcept gemaakt door {agency}. Dit is niet de officiële website van {biz}.
      </>
    ),
    menu: "Menu",
    skip: "Naar inhoud",
    phone: "Telefoon",
    email: "E-mail",
    address: "Adres",
    hours: "Openingstijden",
    hoursTbc: "Openingstijden worden nog bevestigd.",
    name: "Naam",
    message: "Bericht",
    send: "Verstuur bericht",
    formNote: "Dit is een demonstratie: het formulier verstuurt geen gegevens.",
    formDone: "Bedankt! Dit is een demonstratie — er is niets verzonden.",
    route: "Routebeschrijving",
    contact: "Contact",
    explore: "Ontdek",
    rights: "Ontwerpconcept",
  },
  en: {
    demo: (agency: string, biz: string) => (
      <>
        <strong>Demonstration</strong> — a design concept created by {agency}. This is not the official website of {biz}.
      </>
    ),
    menu: "Menu",
    skip: "Skip to content",
    phone: "Phone",
    email: "Email",
    address: "Address",
    hours: "Opening hours",
    hoursTbc: "Opening hours to be confirmed.",
    name: "Name",
    message: "Message",
    send: "Send message",
    formNote: "This is a demonstration: the form does not send any data.",
    formDone: "Thank you! This is a demonstration — nothing was sent.",
    route: "Get directions",
    contact: "Contact",
    explore: "Explore",
    rights: "Design concept",
  },
};
type Strings = typeof T.en;

function strings(lang: string): Strings {
  return (T as Record<string, Strings>)[lang] ?? T.en;
}

export function resolveImage(spec: SiteSpec, ref: string, opts: RenderOptions, variant: number): { src: string; alt: string } {
  const img = spec.images.find((i) => i.key === ref);
  if (img && img.license !== "generated" && /^https:\/\//.test(img.src)) return { src: img.src, alt: img.alt };
  const svg = generateArt(spec.theme.template, { primary: spec.theme.primary, accent: spec.theme.accent }, opts.seedKey, variant);
  return { src: artDataUri(svg), alt: img?.alt || `Illustration in the style of ${spec.business.name}` };
}

const Icon = ({ name }: { name: (typeof ICONS)[number] }) => {
  const C = ICON_MAP[name] ?? Sparkles;
  return <C aria-hidden="true" strokeWidth={1.8} />;
};

function SectionHead({ kicker, title, intro, center }: { kicker?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`section-head reveal${center ? " center" : ""}`}>
      {kicker && <span className="kicker">{kicker}</span>}
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

function renderSection(s: SiteSection, i: number, spec: SiteSpec, opts: RenderOptions, t: Strings): ReactNode {
  const alt = i % 2 === 1 ? " alt" : "";
  const b = spec.business;
  switch (s.type) {
    case "about": {
      const img = resolveImage(spec, s.image, opts, 11);
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap about-grid">
            <div className="about-media reveal">
              <img src={img.src} alt={img.alt} width={1000} height={920} loading="lazy" decoding="async" />
            </div>
            <div className="about-copy reveal">
              <span className="kicker">{b.name}</span>
              <h2 style={{ fontSize: "clamp(30px,3.6vw,46px)", marginBottom: 22 }}>{s.title}</h2>
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
    }
    case "services":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <SectionHead title={s.title} intro={s.intro} center />
            <div className="cards">
              {s.items.map((it) => (
                <article className="card reveal" key={it.title}>
                  <div className="ic">
                    <Icon name={it.icon} />
                  </div>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
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
            <SectionHead title={s.title} intro={s.intro} />
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
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <SectionHead title={s.title} intro={s.intro} center />
            <div className="menu-grid">
              {s.categories.map((c) => (
                <div className="menu-cat reveal" key={c.name}>
                  <h3>{c.name}</h3>
                  {c.items.map((it) => (
                    <div className="menu-item" key={it.name}>
                      <b>{it.name}</b>
                      <span>{it.description}</span>
                    </div>
                  ))}
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
            <SectionHead title={s.title} intro={s.intro} />
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
            <SectionHead title={s.title} center />
            <div className="gallery">
              {s.images.map((ref, j) => {
                const img = resolveImage(spec, ref, opts, 20 + j);
                return (
                  <figure className="reveal" key={`${ref}-${j}`}>
                    <img src={img.src} alt={img.alt} width={800} height={800} loading="lazy" decoding="async" />
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      );
    case "hours":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <SectionHead title={s.title} center />
            <div className="hours-card reveal">
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
          </div>
        </section>
      );
    case "faq":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap">
            <SectionHead title={s.title} center />
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
        <section id={s.id} className="section" key={s.id}>
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
    case "contact":
      return (
        <section id={s.id} className={`section${alt}`} key={s.id}>
          <div className="wrap contact-grid">
            <div className="reveal">
              <span className="kicker">{t.contact}</span>
              <h2 style={{ fontSize: "clamp(30px,3.6vw,46px)" }}>{s.title}</h2>
              <p style={{ marginTop: 16, color: "var(--muted)", fontSize: 17.5 }}>{s.body}</p>
              <ul className="contact-list">
                {b.phone && (
                  <li>
                    <div className="ic">
                      <Phone aria-hidden="true" />
                    </div>
                    <div>
                      <small>{t.phone}</small>
                      <a href={`tel:${b.phone.replace(/[^\d+]/g, "")}`}>{b.phone}</a>
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
            {s.showForm && (
              <form className="form reveal" data-demo-form noValidate aria-describedby="form-note">
                <div className="row">
                  <div>
                    <label htmlFor="f-name">{t.name}</label>
                    <input id="f-name" name="name" autoComplete="name" required />
                  </div>
                  <div>
                    <label htmlFor="f-email">{t.email}</label>
                    <input id="f-email" name="email" type="email" autoComplete="email" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="f-msg">{t.message}</label>
                  <textarea id="f-msg" name="message" required />
                </div>
                <button className="btn btn-primary" type="submit">
                  {t.send} <ArrowRight aria-hidden="true" />
                </button>
                <p id="form-note" className="form-note">
                  {t.formNote}
                </p>
                <p className="form-status" role="status" aria-live="polite" data-done={t.formDone} />
              </form>
            )}
          </div>
        </section>
      );
  }
}

export function SiteDocument({ spec, opts, css, script }: { spec: SiteSpec; opts: RenderOptions; css: string; script: string }) {
  const t = strings(spec.meta.lang);
  const b = spec.business;
  const vars = themeVars(spec.theme) as CSSProperties;
  const heroImg = resolveImage(spec, spec.hero.image, opts, 1);
  const nav = spec.sections.filter((s) => ["about", "services", "menu", "process", "hours", "faq", "contact"].includes(s.type)).slice(0, 4);
  const contactSection = spec.sections.find((s) => s.type === "contact");
  const initials = b.name.replace(/\[MOCK\]\s*/g, "").trim().charAt(0).toUpperCase() || "•";
  const layout = spec.hero.layout;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: b.name,
    ...(b.address ? { address: b.address } : {}),
    ...(b.phone ? { telephone: b.phone } : {}),
    ...(b.openingHours?.length ? { openingHours: b.openingHours } : {}),
  };

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
        <meta name="theme-color" content={spec.theme.primary} />
        <link rel="icon" href={`data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='${spec.theme.accent}'/><text x='32' y='43' font-size='32' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='700'>${initials}</text></svg>`)}`} />
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body className={`t-${spec.theme.template}`} style={vars}>
        <a className="skip" href="#main">
          {t.skip}
        </a>
        <div className="demo-bar" role="note">
          {t.demo(opts.agencyName, b.name)}
        </div>
        <header className="hdr">
          <div className="wrap">
            <a className="brand" href="#top" aria-label={b.name}>
              <span className="brand-mark" aria-hidden="true">
                {initials}
              </span>
              <span>{b.name}</span>
            </a>
            <input type="checkbox" id="menu-toggle" className="menu-toggle" aria-hidden="true" tabIndex={-1} />
            <label htmlFor="menu-toggle" className="menu-btn" aria-label={t.menu} role="button" tabIndex={0}>
              <Menu aria-hidden="true" />
            </label>
            <nav className="nav" aria-label="Main">
              {nav.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.title}
                </a>
              ))}
              <a className="btn btn-primary" href={spec.hero.primaryCta.href}>
                {spec.hero.primaryCta.label}
              </a>
            </nav>
          </div>
        </header>
        <main id="main">
          <section id="top" className={`hero ${layout}${layout === "fullbleed" ? " on-image" : ""}`}>
            {layout === "fullbleed" && (
              <div className="hero-bg">
                <img src={heroImg.src} alt={heroImg.alt} width={1600} height={1000} fetchPriority="high" />
              </div>
            )}
            {layout !== "fullbleed" && <div className="hero-glow" aria-hidden="true" />}
            <div className={`wrap${layout === "split" ? " hero-grid" : ""}`}>
              <div className="reveal">
                <span className="eyebrow">{spec.hero.eyebrow}</span>
                <h1>{spec.hero.headline}</h1>
                <p className="lead">{spec.hero.subheadline}</p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href={spec.hero.primaryCta.href}>
                    {spec.hero.primaryCta.label} <ArrowRight aria-hidden="true" />
                  </a>
                  {spec.hero.secondaryCta && (
                    <a className="btn btn-ghost" href={spec.hero.secondaryCta.href}>
                      {spec.hero.secondaryCta.label}
                    </a>
                  )}
                </div>
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
              </div>
              {layout !== "fullbleed" && (
                <div className="hero-media reveal">
                  <img src={heroImg.src} alt={heroImg.alt} width={1000} height={1100} fetchPriority="high" />
                  {layout === "split" && b.openingHours?.length ? (
                    <div className="badge-float">
                      <div className="ic">
                        <Clock aria-hidden="true" />
                      </div>
                      <div>
                        <b>{t.hours}</b>
                        <small>{b.openingHours[0]}</small>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </section>
          {spec.sections.map((s, i) => renderSection(s, i, spec, opts, t))}
        </main>
        <footer className="ftr">
          <div className="wrap">
            <div className="ftr-grid">
              <div>
                <a className="brand" href="#top">
                  <span className="brand-mark" aria-hidden="true">
                    {initials}
                  </span>
                  <span>{b.name}</span>
                </a>
                <p>{spec.footer.blurb}</p>
              </div>
              <div>
                <h2 className="ftr-h">{t.explore}</h2>
                <ul>
                  {nav.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>{s.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="ftr-h">{t.contact}</h2>
                <ul>
                  {b.phone && (
                    <li>
                      <a href={`tel:${b.phone.replace(/[^\d+]/g, "")}`}>{b.phone}</a>
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
              </span>
            </div>
          </div>
        </footer>
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </body>
    </html>
  );
}
