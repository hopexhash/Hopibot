import type { ReactNode } from "react";
import { CSS } from "./css/restaurant";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Legal, long, offerWords, Pic, splitLines, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Vesper (demo: /demos/restaurant). Dark, warm and editorial: a tall serif with italic brass
 * accents and photography as large as the screen allows. Made for restaurants, bars and
 * other places where an evening is the product.
 */

const EXTRA = `
.d-vesper{--v-serif:"Cormorant Garamond";--v-sans:"Jost";--z-bg2:var(--bg-2);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--brass);--z-on-accent:#14100c;--z-display:var(--v-serif),Georgia,serif;--z-h3:clamp(24px,2.2vw,34px);--z-statement:clamp(32px,4.6vw,78px)}
.d-vesper h2.is-long{font-size:clamp(34px,4.4vw,72px);line-height:1.04}
.d-vesper .v-logo{max-width:62vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-vesper .v-logo.is-long{font-size:22px}
.d-vesper .v-menu{overflow-y:auto}
.d-vesper .v-menu p a{display:inline-flex;align-items:center;min-height:36px;color:var(--ink)}
.d-vesper .v-hero h1.is-m{font-size:clamp(44px,7.6vw,128px);line-height:.94}
.d-vesper .v-hero h1.is-s{font-size:clamp(38px,5.6vw,94px);line-height:.98}
.d-vesper .v-hero.no-pic{background:radial-gradient(120% 90% at 85% 0%,rgba(58,21,18,.9),transparent 60%),radial-gradient(90% 70% at 0% 100%,rgba(201,164,108,.1),transparent 62%),var(--bg)}
.d-vesper .v-hero-mark{position:absolute;right:-2vw;top:8%;font-family:var(--v-serif),Georgia,serif;font-size:min(92vw,880px);font-style:italic;line-height:.8;color:transparent;-webkit-text-stroke:1px rgba(201,164,108,.26);pointer-events:none;user-select:none}
.d-vesper .v-hero-foot a{border-bottom:1px solid var(--line)}
@media (max-width:759px){.d-vesper .v-hero-foot{padding-bottom:78px}}
@media (max-width:759px){.d-vesper .v-hero-foot[data-n="2"] div:nth-child(2){display:block}.d-vesper .v-hero-foot[data-n="1"]{grid-template-columns:1fr}}
@media (min-width:760px){.d-vesper .v-hero-foot[data-n="2"]{grid-template-columns:repeat(2,1fr)}.d-vesper .v-hero-foot[data-n="1"]{grid-template-columns:1fr}}
.d-vesper .v-story-grid.is-solo{grid-template-columns:minmax(0,1fr)}
.d-vesper .v-story-grid.is-solo .v-story-copy{max-width:980px;padding-top:0}
.d-vesper .v-story-grid.is-one .v-story-a{align-self:center}
.d-vesper .v-notes{display:grid;gap:12px 28px;margin-top:44px;padding-top:26px;border-top:1px solid var(--line)}
.d-vesper .v-notes li{font-family:var(--v-serif),Georgia,serif;font-size:clamp(20px,1.7vw,26px);font-style:italic;line-height:1.2;color:var(--brass)}
@media (min-width:620px){.d-vesper .v-notes{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-vesper .v-menu-grid.is-solo{grid-template-columns:minmax(0,1fr);max-width:1040px}
.d-vesper .v-tabs{overflow-x:auto;scrollbar-width:none}
.d-vesper .v-tabs::-webkit-scrollbar{display:none}
.d-vesper .v-tabs button{flex:none;white-space:nowrap}
.d-vesper .v-dishes[hidden]{display:none}
.d-vesper .v-dishes li>div{min-width:0}
.d-vesper .v-tags{margin-top:6px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--brass)}
.d-vesper .v-price{white-space:nowrap}
.d-vesper .v-list{padding:clamp(80px,11vw,180px) 0}
.d-vesper .v-list .v-dishes{max-width:1040px}
.d-vesper .v-dishes .v-dur{display:block;font-family:var(--v-sans),sans-serif;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);text-align:right}
.d-vesper .v-points{display:grid;gap:36px clamp(24px,4vw,70px)}
.d-vesper .v-points li{padding-top:22px;border-top:1px solid var(--line)}
.d-vesper .v-points h3{margin-bottom:10px;font-size:clamp(26px,2.4vw,38px);font-style:italic;color:var(--brass)}
.d-vesper .v-points p{color:var(--dim)}
@media (min-width:760px){.d-vesper .v-points{grid-template-columns:repeat(3,minmax(0,1fr))}.d-vesper .v-points[data-n="2"],.d-vesper .v-points[data-n="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-vesper .v-wine-copy .btn{margin-top:34px}
.d-vesper .v-wine.no-pic{grid-template-columns:minmax(0,1fr)}
.d-vesper .v-wine.no-pic .v-wine-copy{width:min(100%,1440px);margin-inline:auto}
.d-vesper .v-quotes blockquote footer a{text-decoration:underline;text-underline-offset:3px}
.d-vesper .v-reserve-copy address{display:grid;gap:4px;justify-items:start}
.d-vesper .v-reserve-copy address a{color:var(--ink)}
.d-vesper .z-panel{background:var(--bg)}
.d-vesper .z-sec.z-contact,.d-vesper .z-sec.z-cta{background:var(--bg-2)}
.d-vesper .z-field label,.d-vesper .z-chipset legend{font-size:11px;letter-spacing:.22em;color:var(--brass)}
.d-vesper .z-field input,.d-vesper .z-field select,.d-vesper .z-field textarea{padding:8px 0;border-width:0 0 1px;border-color:rgba(239,230,214,.34);font-size:17px;color-scheme:dark}
.d-vesper .z-field :focus-visible{outline:none;border-color:var(--brass)}
.d-vesper .z-chips button{font-family:var(--v-serif),Georgia,serif;font-size:21px}
.d-vesper .z-hours dd{color:var(--brass)}
.d-vesper .z-cta h2{font-size:clamp(36px,5vw,84px)}
.d-vesper .z-acc summary{font-family:var(--v-serif),Georgia,serif;font-size:clamp(22px,2vw,30px);line-height:1.2}
.d-vesper .z-pack-price b{font-style:italic;color:var(--brass)}
.d-vesper .z-steps small,.d-vesper .z-rows small{font-family:var(--v-serif),Georgia,serif;font-size:20px;font-style:italic;letter-spacing:0}
.d-vesper .v-foot-mark{font-size:min(27vw,460px,calc(205vw / var(--n,6)))}
.d-vesper .v-foot-grid span{display:block;padding:5px 0;color:var(--dim)}
`
  .replace(/\n/g, "")
  .trim();

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="v-eyebrow" data-rv>
    {children}
  </p>
);

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="v-nav hdr">
        <a href="#top" className={`v-logo${c.name.length > 16 ? " is-long" : ""}`} aria-label={c.name}>
          {c.name}
        </a>
        <nav aria-label={c.t.menu} className="v-links" data-nav>
          {c.nav.slice(0, 4).map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href={cta.href} className="btn v-btn v-btn-line v-nav-cta">
          {cta.label}
        </a>
        <button type="button" className="v-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
          <span data-label data-open={c.t.menu} data-close={c.t.close}>
            {c.t.menu}
          </span>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="site-menu" className="v-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{String(k + 1).padStart(2, "0")}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <p>
          {b.address ?? b.city}
          {b.phone ? (
            <>
              <br />
              <a href={tel(b.phone)}>{b.phone}</a>
            </>
          ) : null}
        </p>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const { lines, marked } = splitLines(hero.headline, plain.length > 14 ? 2 : 1);
  const size = plain.length > 44 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const facts = heroFacts(c);
  return (
    <section className={`v-hero${p ? "" : " no-pic"}`}>
      {p ? (
        <div className="v-hero-media">
          <Pic p={p} eager sizes="100vw" />
        </div>
      ) : (
        <span className="v-hero-mark" aria-hidden="true">
          {c.name.charAt(0)}
        </span>
      )}
      <div className="v-hero-in">
        {hero.eyebrow ? (
          <p className="v-eyebrow v-rise" style={i(0)}>
            {hero.eyebrow}
          </p>
        ) : null}
        <h1 className={size}>
          {lines.map((line, n) => (
            <span className="v-line" key={n}>
              {/* Without a marked phrase the last line carries the italic accent of the design. */}
              <span>{!marked && lines.length > 1 && n === lines.length - 1 ? <em>{line}</em> : line}</span>
            </span>
          ))}
        </h1>
        <p className="v-lede v-rise" style={i(3)}>
          {hero.subheadline}
        </p>
        <div className="v-cta v-rise" style={i(4)}>
          <Btn c={c} href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </Btn>
          {hero.secondaryCta ? (
            <Btn c={c} href={hero.secondaryCta.href} variant="text">
              {hero.secondaryCta.label}
            </Btn>
          ) : null}
        </div>
      </div>
      {facts.length > 0 && (
        <dl className="v-hero-foot v-rise" data-n={facts.length} style={i(6)}>
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

/** A running line of the things this business is about: taken from its own menu or services. */
function Band({ c }: { c: Ctx }) {
  const list = offerWords(c);
  if (list.length < 4) return null;
  return (
    <div className="v-band" aria-hidden="true">
      <p>
        {[...list, ...list].map((w, n) => (
          <span key={n}>{w}</span>
        ))}
      </p>
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  return (
    <footer className="v-foot">
      <div className="v-wrap">
        <p className="v-foot-mark" aria-hidden="true" style={css({ "--n": Math.max(4, c.name.length) })}>
          {c.name}
        </p>
        <div className="v-foot-grid">
          <div>
            <h3>{c.t.explore}</h3>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </div>
          <div>
            <h3>{c.t.contact}</h3>
            {b.address ? <span>{b.address}</span> : null}
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
            {b.mapsUrl ? (
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                {c.t.route}
              </a>
            ) : null}
          </div>
          {b.openingHours?.length ? (
            <div>
              <h3>{c.t.hours}</h3>
              {b.openingHours.slice(0, 7).map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          ) : null}
          {c.spec.footer.blurb ? <p className="v-foot-note">{c.spec.footer.blurb}</p> : null}
        </div>
        <Legal c={c} className="v-legal" />
      </div>
    </footer>
  );
}

export const vesper: Family = {
  key: "vesper",
  root: "d-vesper",
  fonts: ["Cormorant Garamond", "Jost"],
  themeColor: "#0f0c0a",
  accent: "#c9a46c",
  onAccent: "#14100c",
  css: CSS,
  extra: EXTRA,
  cls: { wrap: "v-wrap", eyebrow: "v-eyebrow", btn: "v-btn v-btn-fill", btnAlt: "v-btn v-btn-line", btnText: "v-btn v-btn-text" },
  Header,
  Hero,
  Footer,
  sections: {
    about: (s, c) => {
      const a = c.photo(s.image);
      const b = a ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      return (
        <>
          <section className="v-story" id={s.id}>
            <div className={`v-wrap v-story-grid${a ? (b ? "" : " is-one") : " is-solo"}`}>
              <div className="v-story-copy">
                <Eyebrow>{c.t.kick.about}</Eyebrow>
                <h2 className={long(s.title)} data-rv>
                  {em(s.title)}
                </h2>
                <p className="v-big" data-rv>
                  {first}
                </p>
                {rest.map((x, n) => (
                  <p key={n} data-rv>
                    {x}
                  </p>
                ))}
                {s.highlights.length > 0 && (
                  <ul className="v-notes" data-rv>
                    {s.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
              {a ? (
                <figure className="v-story-a" data-rv="img">
                  <Pic p={a} sizes="(min-width: 900px) 34vw, 86vw" />
                </figure>
              ) : null}
              {b ? (
                <figure className="v-story-b" data-rv="img" data-px>
                  <Pic p={b} sizes="(min-width: 900px) 26vw, 60vw" />
                </figure>
              ) : null}
            </div>
          </section>
          <Band c={c} />
        </>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      // One photograph per card when there are enough, otherwise one for the whole menu.
      const pics: Photo[] = [];
      for (let n = 0; n < cats.length; n++) {
        const p = c.spare();
        if (!p) break;
        pics.push(p);
      }
      const tabId = (n: number) => `${s.id}-tab-${n}`;
      return (
        <section className="v-menus" id={s.id}>
          <div className="v-wrap">
            <header className="v-head">
              <Eyebrow>{c.t.kick.menu}</Eyebrow>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
            </header>
            <div className={`v-menu-grid${pics.length ? "" : " is-solo"}`}>
              {pics.length > 0 && (
                <div className="v-menu-photo" data-rv="img">
                  {(pics.length === cats.length ? pics : pics.slice(0, 1)).map((p, n) => (
                    <Pic key={n} p={p} sizes="(min-width: 900px) 40vw, 100vw" className={n === 0 ? "is-on" : undefined} tab={pics.length === cats.length && cats.length > 1 ? tabId(n) : undefined} />
                  ))}
                </div>
              )}
              <div className="v-menu-card">
                {cats.length > 1 && (
                  <div className="v-tabs" role="tablist" aria-label={s.title.replace(/\*/g, "")}>
                    {cats.map((cat, n) => (
                      <button key={n} type="button" role="tab" id={tabId(n)} aria-selected={n === 0} aria-controls={`${s.id}-panel-${n}`} tabIndex={n === 0 ? 0 : -1}>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
                {cats.map((cat, n) => (
                  <div key={n} id={`${s.id}-panel-${n}`} role={cats.length > 1 ? "tabpanel" : undefined} aria-labelledby={cats.length > 1 ? tabId(n) : undefined} className="v-dishes" hidden={n > 0}>
                    <p className="v-menu-note">{cats.length > 1 ? s.intro : cat.name}</p>
                    <ol>
                      {cat.items.map((d, m) => (
                        <li key={m} style={i(m)}>
                          <div>
                            <h3>{d.name}</h3>
                            {d.description ? <p>{d.description}</p> : null}
                            {d.tags?.length ? <p className="v-tags">{d.tags.join(" · ")}</p> : null}
                          </div>
                          {d.price ? <span className="v-price">{d.price}</span> : null}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
            {s.note ? (
              <p className="v-small" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => {
      const pics = s.items.map((_, n) => c.photo(`art:svc${n}`));
      const head = (
        <>
          <h2 className={long(s.title)} data-rv>
            {em(s.title)}
          </h2>
          {s.intro ? <p data-rv>{s.intro}</p> : null}
        </>
      );
      if (s.items.length >= 3 && pics.every(Boolean)) {
        return (
          <section className="v-sig" id={s.id}>
            <div className="v-wrap v-sig-head">{head}</div>
            <ol className="v-sig-row">
              {s.items.map((it, n) => (
                <li key={n} data-rv style={i(n % 4)}>
                  <div className="v-sig-img">
                    <Pic p={pics[n]!} sizes="(min-width: 900px) 30vw, 72vw" />
                  </div>
                  <small>
                    N° {n + 1}
                    {it.price ? ` · ${it.price}` : ""}
                  </small>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                </li>
              ))}
            </ol>
          </section>
        );
      }
      return (
        <section className="v-list" id={s.id}>
          <div className="v-wrap">
            <header className="v-head v-sig-head">{head}</header>
            <div className="v-dishes">
              <ol>
                {s.items.map((it, n) => (
                  <li key={n} data-rv>
                    <div>
                      <h3>{it.title}</h3>
                      <p>{it.description}</p>
                    </div>
                    <span>
                      {it.price ? <span className="v-price">{it.price}</span> : <span className="v-course">{String(n + 1).padStart(2, "0")}</span>}
                      {it.duration ? <span className="v-dur">{it.duration}</span> : null}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="v-list" id={s.id}>
        <div className="v-wrap">
          <header className="v-head">
            <Eyebrow>{c.t.kick.features}</Eyebrow>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
          </header>
          <ul className="v-points" data-n={s.items.length}>
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    process: (s, c) => (
      <section className="v-list" id={s.id}>
        <div className="v-wrap">
          <header className="v-head">
            <Eyebrow>{c.t.kick.process}</Eyebrow>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
          </header>
          <div className="v-dishes">
            <ol>
              {s.steps.map((st, n) => (
                <li key={n} data-rv>
                  <div>
                    <h3>{st.title}</h3>
                    <p>{st.description}</p>
                  </div>
                  <span className="v-course">{String(n + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const editorial = pics.length >= 5;
      return (
        <section className="v-gallery" id={s.id}>
          <div className="v-wrap">
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {editorial ? (
              <div className="v-gal">
                {pics.slice(0, 6).map((p, n) => (
                  <figure key={n} className={`g${n + 1}`} data-rv="img" {...(n % 2 ? { "data-px": "" } : {})}>
                    <Pic p={p} sizes={n === 0 ? "(min-width: 900px) 58vw, 100vw" : "(min-width: 900px) 38vw, 50vw"} />
                  </figure>
                ))}
              </div>
            ) : (
              <div className={`z-gal z-gal-${pics.length}`}>
                {pics.map((p, n) => (
                  <figure key={n} className="z-pic" data-rv="img">
                    <Pic p={p} sizes="(min-width: 900px) 33vw, 50vw" />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      );
    },
    showcase: (s, c) => {
      const p = c.photo(s.image);
      return (
        <section className={`v-wine${p ? "" : " no-pic"}`} id={s.id}>
          {p ? (
            <div className="v-wine-media" data-px>
              <Pic p={p} sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
          ) : null}
          <div className="v-wine-copy">
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
    testimonials: (s, c) => (
      <section className="v-guests" id={s.id}>
        <div className="v-wrap">
          <Eyebrow>{s.title.replace(/\*/g, "")}</Eyebrow>
          <div className="v-quotes">
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
    booking: (s, c) => {
      const b = c.spec.business;
      return (
        <section className="v-reserve" id={s.id}>
          <div className="v-wrap v-reserve-grid">
            <div className="v-reserve-copy">
              <Eyebrow>{c.t.kick.booking}</Eyebrow>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Hours c={c} className="v-hours" />
              {b.address || b.phone || b.email ? (
                <address data-rv>
                  <span>{c.name}</span>
                  {b.address ? <span>{b.address}</span> : null}
                  {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
                  {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
                </address>
              ) : null}
            </div>
            <div className="v-reserve-card" data-rv>
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
            </div>
          </div>
        </section>
      );
    },
  },
};
