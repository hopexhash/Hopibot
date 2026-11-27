import type { CSSProperties, ReactNode } from "react";
import type { SiteSection, SiteSpec } from "@/lib/site-spec";
import type { FontFamily } from "../fonts";
import { em, hoursRows, Icon, strings, tel, type RenderOptions, type Strings } from "../site";

/**
 * The kit every template family shares. A family is one of the demo designs (src/demos,
 * /demos/<slug>) turned into a template: it brings its own header, opening, footer and the
 * sections its demo shows, in the demo's own markup and stylesheet. Everything else comes
 * from here: the document, the demonstration notice, forms that send nothing, the script
 * and a quiet default for every section type, styled through the family's tokens.
 *
 * Rules that hold for every family:
 *  - Only what the spec contains is shown. No invented numbers, people, prices or reviews.
 *  - A photograph is only used when it is a real one (stock or supplied); without photos the
 *    page is composed with type and colour.
 *  - Quality control relies on these hooks: .demo-bar, .hdr, .menu-btn, [data-nav], a.btn,
 *    form[data-demo-form] with .form-status, a.skip, <main>, exactly one <h1>.
 */

export type Photo = { src: string; alt: string; srcSet?: string };
export type SectionOf<K extends SiteSection["type"]> = Extract<SiteSection, { type: K }>;
export type SectionRenderers = { [K in SiteSection["type"]]?: (s: SectionOf<K>, c: Ctx, i: number) => ReactNode };

export type Family = {
  /** Design key (also the slug of the demo website this template is taken from). */
  key: string;
  /** Root class of the demo's stylesheet, e.g. "d-vesper". */
  root: string;
  fonts: FontFamily[];
  /** Colour of the browser chrome and the icon. */
  themeColor: string;
  accent: string;
  onAccent: string;
  /** The demo's stylesheet (generated into ./css by scripts/family-css.mjs). */
  css: string;
  /** The family's own additions; they come after the shared defaults and may restyle them. */
  extra: string;
  /** Extra script, run after the shared behaviours. */
  js?: string;
  /** Class names the default sections borrow so they look native. */
  cls: { wrap: string; eyebrow: string; btn: string; btnAlt: string; btnText: string };
  Header: (c: Ctx) => ReactNode;
  Hero: (c: Ctx) => ReactNode;
  Footer: (c: Ctx) => ReactNode;
  /** Section heading. Defaults to eyebrow + h2 + intro. */
  Head?: (p: HeadProps, c: Ctx) => ReactNode;
  sections: SectionRenderers;
};

export type HeadProps = { kicker?: string; title: string; intro?: string; id?: string };

export type Ctx = {
  spec: SiteSpec;
  opts: RenderOptions;
  t: Strings;
  fam: Family;
  /** Business name without internal markers. */
  name: string;
  /** Sections that get a place in the navigation, with short labels. */
  nav: { id: string; label: string }[];
  /** A real photograph for an image reference, or null. */
  photo: (ref: string | undefined) => Photo | null;
  /** Real photographs nobody asked for by name yet (extras placed by the photo search). */
  spare: () => Photo | null;
  hasPhotos: boolean;
  head: (p: HeadProps) => ReactNode;
};

/** Class for a heading that is too long for the design's largest size. */
export const long = (title: string) => (title.replace(/\*/g, "").length > 44 ? "is-long" : undefined);

/**
 * A headline as separate lines (designs that animate or stack lines need them apart). Words stay
 * whole, phrases marked with *asterisks* stay emphasised. `marked` says whether any were.
 */
export function splitLines(text: string, parts = 2): { lines: ReactNode[]; marked: boolean } {
  const words: { w: string; em: boolean }[] = [];
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => words.push({ w, em: n % 2 === 1 })),
  );
  const total = words.reduce((a, x) => a + x.w.length + 1, 0);
  const rows: (typeof words)[] = [[]];
  let at = 0;
  for (const x of words) {
    const row = rows[rows.length - 1];
    if (row.length && rows.length < parts && at + x.w.length / 2 > (total / parts) * rows.length) rows.push([x]);
    else row.push(x);
    at += x.w.length + 1;
  }
  const lines = rows.map((row, r) => {
    const out: ReactNode[] = [];
    let run: string[] = [];
    let mode = false;
    const flush = (k: number) => {
      if (!run.length) return;
      const textRun = run.join(" ");
      out.push(mode ? <em key={`${r}-${k}`}>{textRun}</em> : textRun);
      run = [];
    };
    row.forEach((x, k) => {
      if (x.em !== mode) {
        flush(k);
        if (out.length) out.push(" ");
        mode = x.em;
      }
      run.push(x.w);
    });
    flush(row.length);
    return <Frag key={r}>{out}</Frag>;
  });
  return { lines, marked: words.some((x) => x.em) };
}

export const css = (vars: Record<string, string | number>) => vars as CSSProperties;
export const i = (n: number) => css({ "--i": n });
export { em, hoursRows, Icon, tel };

const NAV_TYPES = ["about", "services", "menu", "packages", "team", "gallery", "process", "booking", "hours", "faq", "contact"];

function srcSet(src: string) {
  if (!/^https:\/\/images\.unsplash\.com\//.test(src) || !/[?&]w=\d+/.test(src)) return undefined;
  return [640, 1100, 1920].map((w) => `${src.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`).join(", ");
}

export function createCtx(spec: SiteSpec, opts: RenderOptions, fam: Family): Ctx {
  const t = strings(spec.meta.lang);
  const real = spec.images.filter((im) => im.license !== "generated" && /^https:\/\//.test(im.src));
  const used = new Set<string>();
  const toPhoto = (im: (typeof real)[number]): Photo => ({ src: im.src, alt: im.alt, srcSet: srcSet(im.src) });
  const photo = (ref: string | undefined) => {
    const im = ref ? real.find((x) => x.key === ref) : undefined;
    if (!im) return null;
    used.add(im.key);
    return toPhoto(im);
  };
  // Every reference a section names is reserved first, so extras never duplicate them.
  const named = new Set<string>([spec.hero.image]);
  for (const s of spec.sections) {
    if (s.type === "about" || s.type === "showcase") named.add(s.image);
    if (s.type === "gallery") s.images.forEach((r) => named.add(r));
    if (s.type === "services") s.items.forEach((_, n) => named.add(`art:svc${n}`));
    if (s.type === "team") s.members.forEach((m) => named.add(m.image));
    if (s.type === "beforeafter") s.pairs.forEach((p) => (named.add(p.before), named.add(p.after)));
  }
  const spare = () => {
    const im = real.find((x) => !named.has(x.key) && !used.has(x.key));
    if (!im) return null;
    used.add(im.key);
    return toPhoto(im);
  };
  const label = (s: SiteSection) => (s.title.replace(/\*/g, "").length <= 16 ? s.title.replace(/\*/g, "") : t.kick[s.type] || s.title);
  const nav = spec.sections
    .filter((s) => NAV_TYPES.includes(s.type))
    .slice(0, 5)
    .map((s) => ({ id: s.id, label: label(s) }));
  const c: Ctx = {
    spec,
    opts,
    t,
    fam,
    name: spec.business.name.replace(/\[MOCK\]\s*/g, "").trim(),
    nav,
    photo,
    spare,
    hasPhotos: real.length > 0,
    head: (p) => (fam.Head ? fam.Head(p, c) : <Head p={p} c={c} />),
  };
  return c;
}

const Frag = ({ children }: { children: ReactNode }) => <>{children}</>;

/** A photograph. The frame around it decides the crop (aspect-ratio + object-fit in CSS). */
export function Pic({ p, sizes = "100vw", eager, className, tab }: { p: Photo; sizes?: string; eager?: boolean; className?: string; tab?: string }) {
  return (
    <img
      className={className}
      data-tab={tab}
      src={p.src}
      srcSet={p.srcSet}
      sizes={p.srcSet ? sizes : undefined}
      alt={p.alt}
      {...(eager ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
      decoding="async"
    />
  );
}

function Head({ p, c }: { p: HeadProps; c: Ctx }) {
  return (
    <header className="z-head">
      {p.kicker ? (
        <p className={c.fam.cls.eyebrow} data-rv>
          {p.kicker}
        </p>
      ) : null}
      <h2 id={p.id} className={long(p.title)} data-rv>
        {em(p.title)}
      </h2>
      {p.intro ? (
        <p className="z-intro" data-rv>
          {p.intro}
        </p>
      ) : null}
    </header>
  );
}

/** Up to three facts for the first screen: where, when and how to call. Only what is on record. */
export function heroFacts(c: Ctx): { label: string; value: ReactNode }[] {
  const b = c.spec.business;
  const out: { label: string; value: ReactNode }[] = [];
  if (b.address || b.city) out.push({ label: c.t.address, value: b.address ?? b.city });
  // The first day the business is open: "Maandag: Gesloten" says nothing on a first screen.
  const open = b.openingHours?.find((l) => !/gesloten|closed|ferm[ée]|geschlossen/i.test(l)) ?? b.openingHours?.[0];
  if (open) out.push({ label: c.t.hours, value: open });
  if (b.phone) out.push({ label: c.t.phone, value: <a href={tel(b.phone)}>{b.phone}</a> });
  return out;
}

/** Short names from the business's own offer (dishes, services), for running lines and tickers. */
export function offerWords(c: Ctx, max = 8): string[] {
  const words: string[] = [];
  for (const s of c.spec.sections) {
    if (s.type === "menu") s.categories.forEach((cat) => cat.items.slice(0, 2).forEach((d) => words.push(d.name)));
    if (s.type === "services") s.items.forEach((it) => words.push(it.title));
    if (s.type === "packages") s.items.forEach((it) => words.push(it.name));
  }
  return [...new Set(words)].filter((w) => w.length <= 26).slice(0, max);
}

/** Opening hours as rows; nothing when the business has none on record. */
export function Hours({ c, className = "z-hours" }: { c: Ctx; className?: string }) {
  const lines = c.spec.business.openingHours;
  if (!lines?.length) return null;
  return (
    <dl className={className} data-rv>
      {hoursRows(lines).map(([day, time], n) => (
        <div key={n}>
          <dt>{day}</dt>
          <dd>{time}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Address, phone and e-mail of the business: only what is on record. */
export function Reach({ c, className = "z-reach" }: { c: Ctx; className?: string }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email) return null;
  return (
    <address className={className} data-rv>
      {b.address ? <span>{b.address}</span> : null}
      {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
      {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
      {b.mapsUrl ? (
        <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="z-route">
          {c.t.route} →
        </a>
      ) : null}
    </address>
  );
}

export type FormKind = "reservation" | "appointment" | "quote" | "order" | "message";

/**
 * A form of a demonstration site: it never sends anything and says so. `uid` keeps ids unique
 * when two forms share a page. Every field has a label with `for`, as quality control checks.
 */
export function DemoForm({ c, kind, options = [], uid, className = "z-form", button, guests = "select" }: { c: Ctx; kind: FormKind; options?: string[]; uid: string; className?: string; button?: string; guests?: "select" | "chips" }) {
  const { t } = c;
  const id = (n: string) => `${uid}-${n}`;
  const field = (n: string, label: string, props: Record<string, unknown> = {}, wide = false) => (
    <div className={`z-field${wide ? " z-field-wide" : ""}`}>
      <label htmlFor={id(n)}>{label}</label>
      <input id={id(n)} name={n} required {...props} />
    </div>
  );
  const select = (n: string, label: string, opts: string[], wide = false) => (
    <div className={`z-field${wide ? " z-field-wide" : ""}`}>
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
    <form className={className} data-demo-form noValidate aria-describedby={id("note")}>
      {kind === "reservation" && guests === "chips" && (
        <fieldset className="z-chipset">
          <legend>{t.guests}</legend>
          <div className="z-chips" data-chips="guests">
            {["1", "2", "3", "4", "5", "6", "7+"].map((n) => (
              <button key={n} type="button" aria-pressed={n === "2"} aria-label={`${n} ${t.persons}`}>
                {n}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <div className="z-fields">
        {kind === "reservation" && (
          <>
            {field("date", t.date, { type: "date" })}
            {field("time", t.time, { type: "time" })}
            {guests === "select" &&
              select(
                "guests",
                t.guests,
                ["1", "2", "3", "4", "5", "6", "7+"].map((n) => `${n} ${t.persons}`),
                true,
              )}
          </>
        )}
        {kind === "appointment" && (
          <>
            {options.length > 0 && select("service", t.service, options, true)}
            {field("date", t.date, { type: "date" })}
            {field("time", t.time, { type: "time" })}
          </>
        )}
        {kind === "quote" && options.length > 0 && select("service", t.service, options, true)}
        {kind === "order" && select("method", t.how, [t.pickup, t.delivery], true)}
        {field("name", t.name, { autoComplete: "name" })}
        {kind === "message" || kind === "quote" ? field("email", t.email, { type: "email", autoComplete: "email" }) : field("phone", t.phone, { type: "tel", autoComplete: "tel" })}
        <div className="z-field z-field-wide">
          <label htmlFor={id("msg")}>{kind === "message" ? t.message : t.notes}</label>
          <textarea id={id("msg")} name="message" rows={4} required={kind === "message"} />
        </div>
      </div>
      <button className={`btn ${c.fam.cls.btn}`} type="submit">
        {button ?? (kind === "message" ? t.send : t.submit[kind])}
      </button>
      <p id={id("note")} className="form-note">
        {t.formNote}
      </p>
      <p className="form-status" role="status" aria-live="polite" data-done={t.formDone} />
    </form>
  );
}

export function Btn({ c, href, children, variant = "fill" }: { c: Ctx; href: string; children: ReactNode; variant?: "fill" | "alt" | "text" }) {
  const cls = variant === "fill" ? c.fam.cls.btn : variant === "alt" ? c.fam.cls.btnAlt : c.fam.cls.btnText;
  const ext = /^https?:/.test(href);
  return (
    <a className={`${variant === "text" ? "" : "btn "}${cls}`} href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

const price = (p: string | null | undefined) => (p ? <span className="z-price">{p}</span> : null);

/** The default look of every section type. Families replace the ones their demo designed. */
const DEFAULTS: Required<SectionRenderers> = {
  about: (s, c) => {
    const p = c.photo(s.image);
    return (
      <section className={`z-sec z-about${p ? " has-pic" : ""}`} id={s.id}>
        <div className={`${c.fam.cls.wrap} z-split`}>
          <div className="z-copy">
            {c.head({ kicker: c.t.kick.about, title: s.title })}
            {s.paragraphs.map((x, n) => (
              <p key={n} className={n === 0 ? "z-lead" : undefined} data-rv>
                {x}
              </p>
            ))}
            {s.highlights.length > 0 && (
              <ul className="z-ticks" data-rv>
                {s.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </div>
          {p ? (
            <figure className="z-pic z-pic-tall" data-rv>
              <Pic p={p} sizes="(min-width: 900px) 42vw, 100vw" />
            </figure>
          ) : null}
        </div>
      </section>
    );
  },
  services: (s, c) => (
    <section className="z-sec z-services" id={s.id}>
      <div className={c.fam.cls.wrap}>
        {c.head({ kicker: c.t.kick.services, title: s.title, intro: s.intro })}
        <ol className="z-rows">
          {s.items.map((it, n) => (
            <li key={n} data-rv style={i(n % 4)}>
              <small>{String(n + 1).padStart(2, "0")}</small>
              <div>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
              </div>
              <span className="z-meta">
                {it.duration ? <span>{it.duration}</span> : null}
                {price(it.price)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  ),
  menu: (s, c) => (
    <section className="z-sec z-menu" id={s.id}>
      <div className={c.fam.cls.wrap}>
        {c.head({ kicker: c.t.kick.menu, title: s.title, intro: s.intro })}
        <div className="z-cards">
          {s.categories.map((cat, n) => (
            <div key={n} className="z-card" data-rv style={i(n % 3)}>
              <h3>{cat.name}</h3>
              <ul className="z-dots">
                {cat.items.map((d, m) => (
                  <li key={m}>
                    <div>
                      <b>{d.name}</b>
                      {d.description ? <p>{d.description}</p> : null}
                    </div>
                    {price(d.price)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {s.note ? (
          <p className="z-note" data-rv>
            {s.note}
          </p>
        ) : null}
      </div>
    </section>
  ),
  features: (s, c) => (
    <section className="z-sec z-features" id={s.id}>
      <div className={c.fam.cls.wrap}>
        {c.head({ kicker: c.t.kick.features, title: s.title, intro: s.intro })}
        <ul className="z-grid">
          {s.items.map((it, n) => (
            <li key={n} data-rv style={i(n % 3)}>
              <span className="z-ico">
                <Icon name={it.icon} />
              </span>
              <h3>{it.title}</h3>
              <p>{it.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  ),
  process: (s, c) => (
    <section className="z-sec z-process" id={s.id}>
      <div className={c.fam.cls.wrap}>
        {c.head({ kicker: c.t.kick.process, title: s.title, intro: s.intro })}
        <ol className="z-steps">
          {s.steps.map((st, n) => (
            <li key={n} data-rv style={i(n % 4)}>
              <small>{String(n + 1).padStart(2, "0")}</small>
              <h3>{st.title}</h3>
              <p>{st.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  ),
  gallery: (s, c) => {
    const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
    if (!pics.length) return null;
    return (
      <section className="z-sec z-gallery" id={s.id}>
        <div className={c.fam.cls.wrap}>
          {c.head({ kicker: c.t.kick.gallery, title: s.title })}
          <div className={`z-gal z-gal-${Math.min(pics.length, 6)}`}>
            {pics.slice(0, 6).map((p, n) => (
              <figure key={n} className="z-pic" data-rv style={i(n % 3)}>
                <Pic p={p} sizes="(min-width: 900px) 33vw, 50vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  },
  hours: (s, c) => (
    <section className="z-sec z-hours-sec" id={s.id}>
      <div className={`${c.fam.cls.wrap} z-split`}>
        <div className="z-copy">
          {c.head({ kicker: c.t.kick.hours, title: s.title })}
          {s.note ? <p data-rv>{s.note}</p> : null}
          <Reach c={c} />
        </div>
        <div>
          {c.spec.business.openingHours?.length ? (
            <Hours c={c} />
          ) : (
            <p className="z-note" data-rv>
              {c.t.hoursTbc}
            </p>
          )}
        </div>
      </div>
    </section>
  ),
  faq: (s, c) => (
    <section className="z-sec z-faq" id={s.id}>
      <div className={`${c.fam.cls.wrap} z-narrow`}>
        {c.head({ kicker: c.t.kick.faq, title: s.title })}
        <div className="z-acc">
          {s.items.map((it, n) => (
            <details key={n} data-rv style={i(n % 4)}>
              <summary>
                <span>{it.q}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  ),
  cta: (s, c) => (
    <section className="z-sec z-cta" id={s.id}>
      <div className={`${c.fam.cls.wrap} z-center`}>
        <h2 data-rv>{em(s.title)}</h2>
        {s.body ? <p data-rv>{s.body}</p> : null}
        <p data-rv>
          <Btn c={c} href={s.cta.href}>
            {s.cta.label}
          </Btn>
        </p>
      </div>
    </section>
  ),
  statement: (s, c) => (
    <section className="z-sec z-statement" id={s.id}>
      <div className={`${c.fam.cls.wrap} z-center`}>
        <h2 data-rv>{em(s.title)}</h2>
        {s.note ? (
          <p className={c.fam.cls.eyebrow} data-rv>
            {s.note}
          </p>
        ) : null}
      </div>
    </section>
  ),
  showcase: (s, c) => {
    const p = c.photo(s.image);
    return (
      <section className={`z-sec z-showcase${p ? " has-pic" : ""}`} id={s.id}>
        {p ? (
          <div className="z-show-media" data-px>
            <Pic p={p} sizes="100vw" />
          </div>
        ) : null}
        <div className={`${c.fam.cls.wrap} z-show-in`}>
          <h2 data-rv>{em(s.title)}</h2>
          {s.body ? <p data-rv>{s.body}</p> : null}
          {s.cta ? (
            <p data-rv>
              <Btn c={c} href={s.cta.href} variant="alt">
                {s.cta.label}
              </Btn>
            </p>
          ) : null}
        </div>
      </section>
    );
  },
  contact: (s, c) => (
    <section className="z-sec z-contact" id={s.id}>
      <div className={`${c.fam.cls.wrap} z-split`}>
        <div className="z-copy">
          {c.head({ kicker: c.t.kick.contact, title: s.title })}
          {s.body ? <p data-rv>{s.body}</p> : null}
          <Reach c={c} />
          {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
        </div>
        {s.showForm ? (
          <div className="z-panel" data-rv>
            <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
          </div>
        ) : null}
      </div>
    </section>
  ),
  packages: (s, c) => (
    <section className="z-sec z-packages" id={s.id}>
      <div className={c.fam.cls.wrap}>
        {c.head({ kicker: c.t.kick.packages, title: s.title, intro: s.intro })}
        <div className="z-cards">
          {s.items.map((it, n) => (
            <div key={n} className={`z-card z-pack${it.featured ? " is-featured" : ""}`} data-rv style={i(n % 3)}>
              {it.featured ? <small className="z-tag">{c.t.popular}</small> : null}
              <h3>{it.name}</h3>
              <p className="z-pack-price">
                {it.price ? (
                  <>
                    <b>{it.price}</b>
                    {it.unit ? <span> {it.unit}</span> : null}
                  </>
                ) : (
                  <span>{c.t.onRequest}</span>
                )}
              </p>
              {it.description ? <p>{it.description}</p> : null}
              {it.features.length > 0 && (
                <ul className="z-ticks">
                  {it.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        {s.note ? (
          <p className="z-note" data-rv>
            {s.note}
          </p>
        ) : null}
      </div>
    </section>
  ),
  team: (s, c) => (
    <section className="z-sec z-team" id={s.id}>
      <div className={c.fam.cls.wrap}>
        {c.head({ kicker: c.t.kick.team, title: s.title, intro: s.intro })}
        <ul className="z-grid">
          {s.members.map((m, n) => {
            const p = c.photo(m.image);
            return (
              <li key={n} data-rv style={i(n % 3)}>
                {p ? (
                  <figure className="z-pic z-pic-tall">
                    <Pic p={p} sizes="(min-width: 900px) 30vw, 50vw" />
                  </figure>
                ) : null}
                <h3>{m.name}</h3>
                <p className={c.fam.cls.eyebrow}>{m.role}</p>
                {m.bio ? <p>{m.bio}</p> : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  ),
  booking: (s, c) => (
    <section className="z-sec z-booking" id={s.id}>
      <div className={`${c.fam.cls.wrap} z-split`}>
        <div className="z-copy">
          {c.head({ kicker: c.t.kick.booking, title: s.title })}
          {s.body ? <p data-rv>{s.body}</p> : null}
          <Hours c={c} />
          <Reach c={c} />
        </div>
        <div className="z-panel" data-rv>
          <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
        </div>
      </div>
    </section>
  ),
  beforeafter: (s, c) => {
    const pairs = s.pairs.map((p) => ({ before: c.photo(p.before), after: c.photo(p.after), caption: p.caption })).filter((p) => p.before && p.after);
    // Before and after are a claim about real work: only the business's own photographs may show it.
    if (!pairs.length) return null;
    return (
      <section className="z-sec z-ba-sec" id={s.id}>
        <div className={c.fam.cls.wrap}>
          {c.head({ kicker: c.t.kick.beforeafter, title: s.title, intro: s.intro })}
          <div className="z-cards">
            {pairs.map((p, n) => (
              <figure key={n} className="z-ba" data-ba data-rv style={css({ "--pos": "50%", "--i": n % 3 })}>
                <Pic p={p.after!} sizes="(min-width: 900px) 45vw, 100vw" />
                <Pic p={p.before!} sizes="(min-width: 900px) 45vw, 100vw" className="z-ba-before" />
                <input type="range" min={0} max={100} defaultValue={50} aria-label={c.t.slider} />
                {p.caption ? <figcaption>{p.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  },
  order: (s, c) => (
    <section className="z-sec z-order" id={s.id}>
      <div className={c.fam.cls.wrap}>
        {c.head({ kicker: c.t.kick.order, title: s.title, intro: s.body })}
        <ul className="z-grid">
          {s.channels.map((ch, n) => (
            <li key={n} data-rv style={i(n % 3)}>
              <a href={ch.href} className="z-channel" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className="z-ico">
                  <Icon name={ch.icon} />
                </span>
                <h3>{ch.label}</h3>
                <p>{ch.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  ),
  testimonials: (s, c) => (
    <section className="z-sec z-quotes-sec" id={s.id}>
      <div className={c.fam.cls.wrap}>
        {c.head({ kicker: c.t.kick.testimonials, title: s.title })}
        <div className="z-quotes">
          {s.items.map((q, n) => (
            <blockquote key={n} data-rv style={i(n % 3)}>
              <p>{q.quote}</p>
              <footer>
                <b>{q.author}</b>
                <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {c.t.source}: {q.source}
                </a>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  ),
};

export function renderSection(s: SiteSection, c: Ctx, n: number): ReactNode {
  const own = c.fam.sections[s.type] as ((s: SiteSection, c: Ctx, i: number) => ReactNode) | undefined;
  const fallback = DEFAULTS[s.type] as (s: SiteSection, c: Ctx, i: number) => ReactNode;
  return (own ?? fallback)(s, c, n);
}

/** The demonstration notice: always visible, never dismissible. */
function Notice({ c }: { c: Ctx }) {
  return (
    <div className="demo-bar" role="note">
      <strong>{c.t.demoA}</strong>
      <span>{c.t.demoB(c.opts.agencyName, c.spec.business.name)}</span>
    </div>
  );
}

/** Small print every family's footer ends with: who designed this and whose photographs these are. */
export function Legal({ c, className = "z-legal" }: { c: Ctx; className?: string }) {
  const credits = [...new Set(c.spec.images.filter((im) => im.license === "stock" && im.credit).map((im) => im.credit as string))];
  return (
    <p className={className}>
      <span>
        © {new Date().getFullYear()} {c.spec.business.name}
      </span>
      <span>
        {c.t.rights} · {c.opts.agencyName}
        {c.opts.agencyContact ? ` · ${c.opts.agencyContact}` : ""}
        {credits.length ? ` · Photos: ${credits.slice(0, 6).join(", ")}` : ""}
      </span>
    </p>
  );
}

export function FamilyDocument({ spec: input, opts, fam, css: styles, script }: { spec: SiteSpec; opts: RenderOptions; fam: Family; css: string; script: string }) {
  // Two sections with the same id would break in-page links and the menu: later ones get a suffix.
  const seen = new Map<string, number>();
  const spec: SiteSpec = {
    ...input,
    sections: input.sections.map((s) => {
      const n = (seen.get(s.id) ?? 0) + 1;
      seen.set(s.id, n);
      return n === 1 ? s : { ...s, id: `${s.id}-${n}` };
    }),
  };
  const c = createCtx(spec, opts, fam);
  const b = spec.business;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: b.name,
    ...(b.address ? { address: b.address } : {}),
    ...(b.phone ? { telephone: b.phone } : {}),
    ...(b.openingHours?.length ? { openingHours: b.openingHours } : {}),
  };
  const initial = c.name.charAt(0).toUpperCase() || "•";
  const icon = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='${fam.accent}'/><text x='32' y='43' font-size='32' text-anchor='middle' fill='${fam.onAccent}' font-family='sans-serif' font-weight='700'>${initial.replace(/[<>&']/g, "")}</text></svg>`;
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
        <meta name="theme-color" content={fam.themeColor} />
        <link rel="icon" href={`data:image/svg+xml,${encodeURIComponent(icon)}`} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.className+=' demo-js'" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body id="top" style={{ background: fam.themeColor }}>
        <a className="skip" href="#main">
          {c.t.skip}
        </a>
        <Notice c={c} />
        {/* The design lives in this element, as in the demo: it clips what is wider than the screen. */}
        <div className={`demo fam ${fam.root}${c.hasPhotos ? "" : " no-photos"}`}>
          {fam.Header(c)}
          <main id="main">
            {fam.Hero(c)}
            {spec.sections.map((s, n) => (
              <Frag key={`${s.id}-${n}`}>{renderSection(s, c, n)}</Frag>
            ))}
          </main>
          {fam.Footer(c)}
        </div>
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </body>
    </html>
  );
}

