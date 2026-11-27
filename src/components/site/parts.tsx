import { ArrowRight, Check, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { eur, type Catalog } from "@/lib/catalog";
import { ARTICLES } from "@/lib/site/blog";
import { ALL_LANDINGS } from "@/lib/site/landing";
import type { Crumb } from "@/lib/site/seo";
import { informal } from "@/lib/site/text";
import type { Work } from "@/lib/site/work";
import type { SiteData } from "@/server/site";
import { rich as rich_ } from "./rich";
import { ConsentLink, ContactForm, WhatsAppIcon } from "./site-client";
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

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Kruimelpad">
      <ol>
        <li>
          <Link href="/">Home</Link>
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
export function Devices({ work, phone, eager, className = "devices", sizes = "(min-width: 1020px) 560px, 90vw" }: { work: Work; phone?: Work; eager?: boolean; className?: string; sizes?: string }) {
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
        <Shot k={work.key} view="d" alt={`Demo-ontwerp: website voor ${work.type.toLowerCase()} ${work.name}`} eager={eager} sizes={sizes} />
      </div>
      <div className="phone">
        <Shot k={p.key} view="m" alt={`Demo-ontwerp op een telefoon: ${p.name}`} eager={eager} sizes="(min-width: 1020px) 180px, 30vw" />
      </div>
    </div>
  );
}

export const STEPS = [
  { title: "Je vertelt over je bedrijf", text: "Vul het formulier in. Heb je al een website, dan kijken we daar ook naar." },
  { title: "Wij maken een gratis ontwerp", text: "Je krijgt een ontwerp van je nieuwe website te zien, met je eigen naam, diensten en stijl." },
  { title: "Je beslist", text: "Bevalt het? Dan kies je een pakket en maken we teksten, foto's en details samen definitief. Bevalt het niet, dan stopt het hier." },
  { title: "Je website gaat online", text: "Op je eigen domeinnaam. Wij regelen hosting, beveiliging en onderhoud." },
];

export function Steps({ title = "Eerst zien, *dan* betalen", intro = "Geen offerte waar je op moet vertrouwen, maar een echt ontwerp dat je kunt beoordelen voordat je iets betaalt.", id = "werkwijze" }: { title?: string; intro?: string; id?: string }) {
  const [a, em, b] = title.split("*");
  return (
    <section className="section dark" id={id}>
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Zo werkt het</span>
          <h2>
            {a}
            {em && <em>{em}</em>}
            {b}
          </h2>
          <p>{intro}</p>
        </div>
        <ol className="steps">
          {STEPS.map((st, i) => (
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

export function PriceCards({ catalog, source }: { catalog: Catalog; source: string }) {
  const packages = catalog.packages.filter((p) => p.enabled);
  return (
    <div className="prices">
      {packages.map((p) => (
        <article key={p.key} className={`price${p.featured ? " featured" : ""}`} data-reveal>
          {p.featured && <span className="price-badge">Meest gekozen</span>}
          <h3>{p.name}</h3>
          <p className="desc">{informal(p.description)}</p>
          <div className="amount">
            {p.priceCents === null ? <b>Op maat</b> : <b>{eur(p.priceCents)}</b>}
            <span>{p.priceCents === null ? "prijs op aanvraag" : "eenmalig, excl. btw"}</span>
          </div>
          <ul className="feat">
            {p.features.map((f) => (
              <li key={f}>
                <Check strokeWidth={2.4} aria-hidden="true" />
                {informal(f)}
              </li>
            ))}
          </ul>
          <a href={`?pakket=${p.key}#contact`} className={`btn ${p.featured ? "btn-green" : "btn-line"}`} data-track="pricing_cta_click" data-track-label={p.key} data-track-location={source}>
            Kies {p.name} <ArrowRight aria-hidden="true" />
          </a>
          <p className="price-note">Eerst gratis een ontwerp. Je betaalt pas als het bevalt.</p>
        </article>
      ))}
    </div>
  );
}

export function AddonList({ catalog, keys, title }: { catalog: Catalog; keys: string[]; title: string }) {
  const items = keys.map((k) => catalog.addons.find((a) => a.key === k && a.enabled)).filter((a) => a !== undefined);
  if (!items.length) return null;
  return (
    <div className="addons" data-reveal>
      <h3>{title}</h3>
      <ul>
        {items.map((a) => (
          <li key={a.key}>
            <div>
              <b>{a.name}</b>
              <span>{informal(a.description)}</span>
            </div>
            <em>{a.priceCents === null ? "op aanvraag" : `${eur(a.priceCents)}${a.kind === "monthly" ? " p/m" : ""}${a.perUnit && a.unit ? ` per ${a.unit}` : ""}`}</em>
          </li>
        ))}
      </ul>
      <p>
        Extra&apos;s zijn optioneel en exclusief btw. Alle prijzen staan op de pagina <Link href="/prijzen">prijzen</Link>.
      </p>
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

const STATIC_LABELS: Record<string, { label: string; text: string }> = {
  "/prijzen": { label: "Prijzen", text: "Alle pakketten, abonnementen en extra's met vaste bedragen." },
  "/blog": { label: "Blog", text: "Praktische artikelen over websites en vindbaarheid." },
};

/** Internal links to pages on a related subject. */
export function Related({ paths, title = "Ook interessant" }: { paths: string[]; title?: string }) {
  const items = paths
    .map((p) => {
      const l = ALL_LANDINGS.find((x) => x.path === p);
      if (l) return { path: p, label: l.kind === "industry" ? `Website voor ${l.label.toLowerCase()}` : l.label, text: l.intro.split(". ")[0] + "." };
      const a = ARTICLES.find((x) => `/blog/${x.slug}` === p);
      if (a) return { path: p, label: a.title, text: a.excerpt };
      const s = STATIC_LABELS[p];
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

export function CtaBand({ title = "Benieuwd hoe jouw nieuwe website eruit kan zien?", location }: { title?: string; location: string }) {
  return (
    <section className="band-section">
      <div className="wrap">
        <div className="band" data-reveal>
          <h2>{title}</h2>
          <a href="#contact" className="btn btn-dark" data-track="cta_click" data-track-label="band" data-track-location={location}>
            Vraag een gratis ontwerp aan <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ data, source, title = "Vraag je gratis *ontwerp* aan", text = "Vertel kort over je bedrijf. We nemen contact met je op en maken een ontwerp van je nieuwe website. Gratis en vrijblijvend: je betaalt pas als je het ontwerp goed vindt en een pakket kiest." }: { data: SiteData; source: string; title?: string; text?: string }) {
  const [a, em, b] = title.split("*");
  const packages = data.catalog.packages.filter((p) => p.enabled).map((p) => ({ key: p.key, name: p.name }));
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
          {/* Wide screens: WhatsApp beside the form. Phones get it under the request button instead. */}
          {data.whatsapp && (
            <a href={data.whatsapp} target="_blank" rel="noopener" className="btn btn-wa contact-wa" data-track="whatsapp_click" data-track-label="contact" data-track-location={source}>
              <WhatsAppIcon /> Stuur ons een WhatsApp
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
              <MapPin aria-hidden="true" /> Voor ondernemers in heel Nederland en België
            </li>
            <li>
              <Check aria-hidden="true" /> Eerst zien, dan betalen
            </li>
          </ul>
        </div>
        <div data-reveal>
          <ContactForm packages={packages} source={source} whatsapp={data.whatsapp} />
        </div>
      </div>
    </section>
  );
}

const FOOTER_WORDS = ["Gratis ontwerp", "Eerst zien", "Dan beslissen"];

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
export function SiteFooter({ data }: { data: SiteData }) {
  const tracking = Boolean(data.site.gaId || data.site.gtmId);
  return (
    <footer className="ft" data-theme="dark">
      <div className="ft-band" aria-hidden="true">
        <div className="ft-band-in">
          {[0, 1].map((n) => (
            <p key={n}>
              {FOOTER_WORDS.map((w, i) => (
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
            <Words text="Jouw nieuwe website begint met een gratis ontwerp." />
          </h2>
          <p>Vertel ons over jouw bedrijf. Wij laten je vrijblijvend zien wat er mogelijk is.</p>
          <Link href="/#contact" className="btn btn-accent" data-magnetic="0.25" data-track="cta_click" data-track-label="footer">
            Vraag gratis ontwerp aan <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="ft-row">
          <Link href="/" className="ft-logo" aria-label="HOPI, naar de homepage" data-home="">
            HOPI
            <i aria-hidden="true" />
          </Link>
          <p>Websites voor ondernemers in Nederland en België</p>
        </div>
        <div className="ft-legal mono">
          <span>
            © {new Date().getFullYear()} {data.name} · prijzen excl. {data.prices.vat} btw
          </span>
          <Link href="/algemene-voorwaarden">Voorwaarden</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/cookies">Cookies</Link>
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
export function PullGuy() {
  return (
    <>
      <div className="pull" aria-hidden="true">
        <div className="pull-guy">
          {/* His body is the whole gap: it runs from his shoulders to the page, edge to edge. */}
          <div className="pull-torso">
            <span className="mono">Hoi! Hoger kan niet.</span>
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
