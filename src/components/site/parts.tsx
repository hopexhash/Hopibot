import { ArrowRight, Check, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { eur, type Catalog } from "@/lib/catalog";
import { catalogText } from "@/lib/catalog.en";
import { articlePath, articlesOf, landingsOf } from "@/lib/site/content";
import { href, type Locale } from "@/lib/site/i18n";
import type { Crumb } from "@/lib/site/seo";
import { informal } from "@/lib/site/text";
import type { Work } from "@/lib/site/work";
import type { SiteData } from "@/server/site";
import { rich as rich_ } from "./rich";
import { BackToTop, ConsentLink, ContactForm, LangSwitch, WhatsAppIcon } from "./site-client";
import { Words } from "./split";

/** Structured data. `<` is escaped so copy can never close the script element. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Ambient layer behind a hero: two slow lights, a faint dot texture and a few rising motes. Decorative only. */
export function HeroAmbient() {
  return (
    <div className="ambient" aria-hidden="true">
      <i />
      <i />
      <b />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export function Breadcrumbs({ crumbs, lang = "nl" }: { crumbs: Crumb[]; lang?: Locale }) {
  return (
    <nav className="crumbs" aria-label={lang === "en" ? "Breadcrumb" : "Kruimelpad"}>
      <ol>
        <li>
          <Link href={lang === "en" ? "/en" : "/"}>Home</Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.path}>
            <ChevronRight aria-hidden="true" />
            {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Screenshot of a demo design in two sizes; the browser picks the smallest that is sharp. */
function Shot({ k, view, alt, eager, sizes }: { k: string; view: "d" | "m"; alt: string; eager?: boolean; sizes: string }) {
  const [small, large, w, h] = view === "d" ? [720, 1440, 1440, 900] : [390, 780, 780, 1560];
  return (
    <img
      src={`/site/work/${k}-${view}-${large}.webp`}
      srcSet={`/site/work/${k}-${view}-${small}.webp ${small}w, /site/work/${k}-${view}-${large}.webp ${large}w`}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
    />
  );
}

/** Laptop and phone preview of one demo design. */
export function Devices({ work, phone, eager, className = "devices", sizes = "(min-width: 1020px) 560px, 90vw", lang = "nl" }: { work: Work; phone?: Work; eager?: boolean; className?: string; sizes?: string; lang?: Locale }) {
  const p = phone ?? work;
  return (
    <div className={className}>
      <div className="browser">
        <div className="browser-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>demo · {work.name}</span>
        </div>
        <Shot k={work.key} view="d" alt={lang === "en" ? `Demo design: website for ${work.name}` : `Demo-ontwerp: website voor ${work.type.toLowerCase()} ${work.name}`} eager={eager} sizes={sizes} />
      </div>
      <div className="phone">
        <Shot k={p.key} view="m" alt={lang === "en" ? `Demo design on a phone: ${p.name}` : `Demo-ontwerp op een telefoon: ${p.name}`} eager={eager} sizes="(min-width: 1020px) 180px, 30vw" />
      </div>
    </div>
  );
}

export const STEPS_EN = [
  { title: "You tell us about your business", text: "Fill in the form. If you already have a website, we look at that too." },
  { title: "We make a free design", text: "You get to see a design of your new website, with your own name, services and style." },
  { title: "You decide", text: "Like it? Then you choose a package and we finalise the copy, photos and details together. If you don't, it ends here." },
  { title: "Your website goes live", text: "On your own domain name. We take care of hosting, security and maintenance." },
];

export const STEPS = [
  { title: "Je vertelt over je bedrijf", text: "Vul het formulier in. Heb je al een website, dan kijken we daar ook naar." },
  { title: "Wij maken een gratis ontwerp", text: "Je krijgt een ontwerp van je nieuwe website te zien, met je eigen naam, diensten en stijl." },
  { title: "Je beslist", text: "Bevalt het? Dan kies je een pakket en maken we teksten, foto's en details samen definitief. Bevalt het niet, dan stopt het hier." },
  { title: "Je website gaat online", text: "Op je eigen domeinnaam. Wij regelen hosting, beveiliging en onderhoud." },
];

export function Steps({ title, intro, id = "werkwijze", lang = "nl" }: { title?: string; intro?: string; id?: string; lang?: Locale }) {
  const en = lang === "en";
  const [a, em, b] = (title ?? (en ? "See first, *then* pay" : "Eerst zien, *dan* betalen")).split("*");
  intro ??= en ? "Not a quote you have to take on trust, but a real design you can judge before you pay anything." : "Geen offerte waar je op moet vertrouwen, maar een echt ontwerp dat je kunt beoordelen voordat je iets betaalt.";
  return (
    <section className="section dark" id={id}>
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">{en ? "How it works" : "Zo werkt het"}</span>
          <h2>
            {a}
            {em && <em>{em}</em>}
            {b}
          </h2>
          <p>{intro}</p>
        </div>
        <ol className="steps">
          {(en ? STEPS_EN : STEPS).map((st, i) => (
            <li key={st.title} className="step" data-reveal>
              <span className="step-n" aria-hidden="true">
                0{i + 1}
              </span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Catalogue text in the page's language (Dutch is rewritten to "je", English is looked up). */
const cat = (text: string, lang: Locale) => (lang === "en" ? catalogText(informal(text), "en") : informal(text));

export function PriceCards({ catalog, source, lang = "nl" }: { catalog: Catalog; source: string; lang?: Locale }) {
  const en = lang === "en";
  const packages = catalog.packages.filter((p) => p.enabled);
  return (
    <div className="prices">
      {packages.map((p) => (
        <article key={p.key} className={`price${p.featured ? " featured" : ""}`} data-reveal>
          {p.featured && <span className="price-badge">{en ? "Most popular" : "Meest gekozen"}</span>}
          <h3>{cat(p.name, lang)}</h3>
          <p className="desc">{cat(p.description, lang)}</p>
          <div className="amount">
            {p.priceCents === null ? <b>{en ? "Custom" : "Op maat"}</b> : <b>{eur(p.priceCents)}</b>}
            <span>{p.priceCents === null ? (en ? "price on request" : "prijs op aanvraag") : en ? "one-off, excl. VAT" : "eenmalig, excl. btw"}</span>
          </div>
          <ul className="feat">
            {p.features.map((f) => (
              <li key={f}>
                <Check strokeWidth={2.4} aria-hidden="true" />
                {cat(f, lang)}
              </li>
            ))}
          </ul>
          <a href={`?pakket=${p.key}#contact`} className={`btn ${p.featured ? "btn-green" : "btn-line"}`} data-track="pricing_cta_click" data-track-label={p.key} data-track-location={source}>
            {en ? "Choose" : "Kies"} {cat(p.name, lang)} <ArrowRight aria-hidden="true" />
          </a>
          <p className="price-note">{en ? "A free design first. You only pay if you like it." : "Eerst gratis een ontwerp. Je betaalt pas als het bevalt."}</p>
        </article>
      ))}
    </div>
  );
}

export function AddonList({ catalog, keys, title, lang = "nl" }: { catalog: Catalog; keys: string[]; title: string; lang?: Locale }) {
  const en = lang === "en";
  const items = keys.map((k) => catalog.addons.find((a) => a.key === k && a.enabled)).filter((a) => a !== undefined);
  if (!items.length) return null;
  return (
    <div className="addons" data-reveal>
      <h3>{title}</h3>
      <ul>
        {items.map((a) => (
          <li key={a.key}>
            <div>
              <b>{cat(a.name, lang)}</b>
              <span>{cat(a.description, lang)}</span>
            </div>
            <em>{a.priceCents === null ? (en ? "on request" : "op aanvraag") : `${eur(a.priceCents)}${a.kind === "monthly" ? (en ? " per month" : " p/m") : ""}${a.perUnit && a.unit ? ` per ${cat(a.unit, lang)}` : ""}`}</em>
          </li>
        ))}
      </ul>
      {en ? (
        <p>
          Extras are optional and exclude VAT. All prices are on the <Link href="/en/pricing">pricing</Link> page.
        </p>
      ) : (
        <p>
          Extra&apos;s zijn optioneel en exclusief btw. Alle prijzen staan op de pagina <Link href="/prijzen">prijzen</Link>.
        </p>
      )}
    </div>
  );
}

export function Faq({ items, vars, openFirst = true }: { items: { q: string; a: string }[]; vars: Record<string, string>; openFirst?: boolean }) {
  return (
    <div className="faq" data-reveal>
      {items.map((f, i) => (
        <details key={f.q} open={openFirst && i === 0}>
          <summary>
            <h3>{f.q}</h3>
            <i aria-hidden="true" />
          </summary>
          <p>{rich_(f.a, vars)}</p>
        </details>
      ))}
    </div>
  );
}

const STATIC_LABELS_EN: Record<string, { label: string; text: string }> = {
  "/en/pricing": { label: "Pricing", text: "Every package, subscription and extra, with fixed amounts." },
  "/en/blog": { label: "Blog", text: "Practical articles about websites and being found online." },
  "/en/work": { label: "Work", text: "Twelve complete demo websites, each with its own design." },
  "/en/about": { label: "About HOPI", text: "Who we are, how we work and who we work for." },
  "/en/contact": { label: "Contact", text: "Request a free design or ask your question." },
};

const STATIC_LABELS: Record<string, { label: string; text: string }> = {
  "/prijzen": { label: "Prijzen", text: "Alle pakketten, abonnementen en extra's met vaste bedragen." },
  "/blog": { label: "Blog", text: "Praktische artikelen over websites en vindbaarheid." },
  "/werk": { label: "Werk", text: "Twaalf complete demo-websites, elk met een eigen ontwerp." },
  "/over-ons": { label: "Over HOPI", text: "Wie we zijn, hoe we werken en voor wie." },
  "/contact": { label: "Contact", text: "Vraag een gratis ontwerp aan of stel je vraag." },
};

/** Internal links to pages on a related subject. */
export function Related({ paths, title, lang = "nl" }: { paths: string[]; title?: string; lang?: Locale }) {
  const en = lang === "en";
  title ??= en ? "You may also like" : "Ook interessant";
  const items = paths
    .map((p) => {
      const l = landingsOf(lang).find((x) => x.path === p);
      if (l) return { path: p, label: l.linkLabel ?? (l.kind === "industry" ? (en ? `Website for ${l.label.toLowerCase()}` : `Website voor ${l.label.toLowerCase()}`) : l.label), text: l.intro.split(". ")[0] + "." };
      const a = articlesOf(lang).find((x) => articlePath(x.slug, lang) === p);
      if (a) return { path: p, label: a.title, text: a.excerpt };
      const s = (en ? STATIC_LABELS_EN : STATIC_LABELS)[p];
      return s ? { path: p, ...s } : null;
    })
    .filter((x) => x !== null);
  if (!items.length) return null;
  return (
    <section className="section related-section">
      <div className="wrap">
        <h2 className="h2 small" data-reveal>
          {title}
        </h2>
        <div className="related">
          {items.map((it) => (
            <Link key={it.path} href={it.path} className="related-card" data-reveal>
              <b>{it.label}</b>
              <span>{it.text}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ title, location, lang = "nl" }: { title?: string; location: string; lang?: Locale }) {
  const en = lang === "en";
  title ??= en ? "Curious what your new website could look like?" : "Benieuwd hoe jouw nieuwe website eruit kan zien?";
  return (
    <section className="band-section">
      <div className="wrap">
        <div className="band" data-reveal>
          <h2>{title}</h2>
          <a href="#contact" className="btn btn-dark" data-track="cta_click" data-track-label="band" data-track-location={location}>
            {en ? "Request a free design" : "Vraag een gratis ontwerp aan"} <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ data, source, title, text, lang = "nl" }: { data: SiteData; source: string; title?: string; text?: string; lang?: Locale }) {
  const en = lang === "en";
  title ??= en ? "Request your free *design*" : "Vraag je gratis *ontwerp* aan";
  text ??= en
    ? "Tell us briefly about your business. We will get in touch and make a design of your new website. Free and without obligation: you only pay if you like the design and choose a package."
    : "Vertel kort over je bedrijf. We nemen contact met je op en maken een ontwerp van je nieuwe website. Gratis en vrijblijvend: je betaalt pas als je het ontwerp goed vindt en een pakket kiest.";
  const [a, em, b] = title.split("*");
  const packages = data.catalog.packages.filter((p) => p.enabled).map((p) => ({ key: p.key, name: cat(p.name, lang) }));
  return (
    <section className="section contact-section" id="contact">
      <div className="wrap contact">
        <div className="contact-copy" data-reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="h2">
            {a}
            {em && <em>{em}</em>}
            {b}
          </h2>
          <p>{text}</p>
          {/* The one place WhatsApp is offered: with the contact text (centred on phones). */}
          {data.whatsapp && (
            <a href={data.whatsapp} target="_blank" rel="noopener" className="btn btn-wa contact-wa" data-track="whatsapp_click" data-track-label="contact" data-track-location={source}>
              <WhatsAppIcon /> {en ? "Send us a WhatsApp" : "Stuur ons een WhatsApp"}
            </a>
          )}
          <ul className="contact-list">
            {data.phone && (
              <li>
                <Phone aria-hidden="true" />
                <a href={`tel:${data.phone.replace(/[^+\d]/g, "")}`}>{data.phone}</a>
              </li>
            )}
            {data.email && (
              <li>
                <Mail aria-hidden="true" />
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </li>
            )}
            <li>
              <MapPin aria-hidden="true" /> {en ? "For businesses across the Netherlands and Belgium" : "Voor ondernemers in heel Nederland en België"}
            </li>
            <li>
              <Check aria-hidden="true" /> {en ? "See first, then pay" : "Eerst zien, dan betalen"}
            </li>
          </ul>
        </div>
        <div data-reveal>
          <ContactForm packages={packages} source={source} />
        </div>
      </div>
    </section>
  );
}

const FOOTER_WORDS = { nl: ["Gratis ontwerp", "Eerst zien", "Dan beslissen"], en: ["Free design", "See first", "Then decide"] };

/** Four-point star between the words of the footer band. */
function Spark() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 0C54 30 70 46 100 50 70 54 54 70 50 100 46 70 30 54 0 50 30 46 46 30 50 0Z" />
    </svg>
  );
}

/**
 * Footer: a band of very large words that moves at one steady pace, one closing line with the main
 * action, and a single quiet row. Navigation lives in the menu, contact details in the
 * request section and company details on the legal pages, so none of that is repeated here.
 */
/**
 * A quiet index of the website at the foot of every page: services, every industry page and
 * the company pages. It is how each landing page is linked from the whole site (search engines
 * follow it; visitors who scroll to the end find their own trade).
 */
function FooterNav({ lang }: { lang: Locale }) {
  const en = lang === "en";
  const services = landingsOf(lang).filter((l) => l.kind === "pillar" || l.kind === "service");
  const industries = landingsOf(lang).filter((l) => l.kind === "industry" || l.kind === "audience");
  const list = (items: { href: string; label: string }[], wide = false) => (
    <ul className={wide ? "ft-nav-wide" : undefined}>
      {items.map((i) => (
        <li key={i.href}>
          <Link href={i.href}>{i.label}</Link>
        </li>
      ))}
    </ul>
  );
  return (
    <nav className="ft-nav" aria-label={en ? "All pages" : "Alle pagina's"}>
      <div>
        <h2 className="mono">{en ? "Services" : "Diensten"}</h2>
        {list([...services.map((l) => ({ href: l.path, label: l.label })), { href: href("/prijzen", lang), label: en ? "Pricing" : "Prijzen" }])}
      </div>
      <div>
        <h2 className="mono">{en ? "Website for" : "Website voor"}</h2>
        {list(industries.map((l) => ({ href: l.path, label: l.label })), true)}
      </div>
      <div>
        <h2 className="mono">HOPI</h2>
        {list([
          { href: href("/werk", lang), label: en ? "Work" : "Werk" },
          { href: href("/blog", lang), label: "Blog" },
          { href: href("/over-ons", lang), label: en ? "About us" : "Over ons" },
          { href: href("/contact", lang), label: "Contact" },
        ])}
      </div>
    </nav>
  );
}

export function SiteFooter({ data, lang = "nl" }: { data: SiteData; lang?: Locale }) {
  const en = lang === "en";
  const tracking = Boolean(data.site.gaId || data.site.gtmId);
  return (
    <footer className="ft" data-theme="dark">
      <div className="ft-band" aria-hidden="true">
        <div className="ft-band-in">
          {[0, 1].map((n) => (
            <p key={n}>
              {FOOTER_WORDS[lang].map((w, i) => (
                <span key={w}>
                  {w}
                  {i % 2 === 0 ? <Spark /> : <i />}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
      <div className="wrap3">
        <div className="ft-close">
          <h2 data-in>
            <Words text={en ? "Your new website starts with a free design." : "Jouw nieuwe website begint met een gratis ontwerp."} />
          </h2>
          <p>{en ? "Tell us about your business. We will show you what is possible, without obligation." : "Vertel ons over jouw bedrijf. Wij laten je vrijblijvend zien wat er mogelijk is."}</p>
          <Link href={en ? "/en#contact" : "/#contact"} className="btn btn-accent" data-magnetic="0.25" data-track="cta_click" data-track-label="footer">
            {en ? "Request a free design" : "Vraag gratis ontwerp aan"} <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <FooterNav lang={lang} />
        <div className="ft-row">
          <Link href={en ? "/en" : "/"} className="ft-logo" aria-label={en ? "HOPI, to the homepage" : "HOPI, naar de homepage"} data-home="">
            HOPI
            <i aria-hidden="true" />
          </Link>
          <p>{en ? "Websites for businesses in the Netherlands and Belgium" : "Websites voor ondernemers in Nederland en België"}</p>
          <BackToTop />
        </div>
        <div className="ft-legal mono">
          <span>
            © {new Date().getFullYear()} {data.name} · {en ? `prices excl. ${data.prices.vat} VAT` : `prijzen excl. ${data.prices.vat} btw`}
          </span>
          <Link href={href("/algemene-voorwaarden", lang)}>{en ? "Terms" : "Voorwaarden"}</Link>
          <Link href={href("/privacy", lang)}>Privacy</Link>
          <Link href={href("/cookies", lang)}>Cookies</Link>
          <LangSwitch full />
          {tracking && <ConsentLink />}
        </div>
      </div>
    </footer>
  );
}

/**
 * Behind the page, at the very top: when a visitor pulls the page down past its start (the
 * rubber-band on phones and trackpads), the gap that opens shows this little character
 * looking over the edge instead of an empty background. It is decoration only, sits under
 * the page and is never in the way; a second, plain layer does the same for the bottom.
 */
export function PullGuy({ lang = "nl" }: { lang?: Locale }) {
  return (
    <>
      <div className="pull" aria-hidden="true">
        <div className="pull-guy">
          {/* His body is the whole gap: it runs from his shoulders to the page, edge to edge. */}
          <div className="pull-torso">
            <span className="mono">{lang === "en" ? "Hi! This is the top." : "Hoi! Hoger kan niet."}</span>
          </div>
          <svg className="pull-head" viewBox="-32 0 260 116">
            <path className="pull-arm" d="M22 108Q-2 98-8 60" />
            <path className="pull-body" d="M0 104q24 0 24-26V72C24 32 50 6 98 6s74 26 74 66v6q0 26 24 26v12H0Z" />
            <g className="pull-eyes">
              <ellipse cx="76" cy="54" rx="14" ry="17" />
              <ellipse cx="120" cy="54" rx="14" ry="17" />
              <g className="pull-look">
                <circle cx="79" cy="57" r="6.5" />
                <circle cx="123" cy="57" r="6.5" />
              </g>
            </g>
            <path className="pull-mouth" d="M86 84q12 10 24 0" />
          </svg>
        </div>
      </div>
      <div className="pull pull-b" aria-hidden="true" />
    </>
  );
}
