import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Noord: an original template (no portfolio demo). Nordic and quiet: off-white paper, black
 * ink and one clay accent, a large light serif with italics, thin rules and generous air.
 * A price list in two columns, a horizontal photo strip and portraits for the team. Made for
 * hair salons, barbers, beauty and wellness, and other appointment-based studios.
 */

const CSS = `
.d-noord{--bg:#f6f5f1;--panel:#ebe8e1;--white:#ffffff;--ink:#141414;--ink-2:#2a2a28;--dim:#6b6862;--clay:#b5603c;--line:rgba(20,20,20,.14);--pad:clamp(20px,5vw,80px);--ease:cubic-bezier(.22,.7,.18,1);--serif:"Instrument Serif",Georgia,serif;--z-bg2:var(--panel);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--clay);--z-on-accent:#fff;--z-display:var(--serif);--z-radius:0;--z-field-radius:0;--z-ico-radius:50%;--z-h3:clamp(24px,2.2vw,32px);--z-statement:clamp(34px,5vw,84px);background:var(--bg);color:var(--ink);font-family:"Outfit",system-ui,sans-serif;font-weight:300;font-size:clamp(16px,1.05vw,18px);line-height:1.65}
.d-noord h1,.d-noord h2,.d-noord h3{font-family:var(--serif);font-weight:400;line-height:1;letter-spacing:-.015em}
.d-noord h1 em,.d-noord h2 em{font-style:italic;color:var(--clay)}
.d-noord h2{font-size:clamp(40px,5.6vw,92px)}
.d-noord h2.is-long{font-size:clamp(32px,4vw,60px);line-height:1.05}
.d-noord .nd-wrap{width:min(100%,1440px);margin-inline:auto;padding-inline:var(--pad)}
.d-noord .nd-kick{display:flex;align-items:center;gap:14px;font-size:12px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}
.d-noord .nd-kick::before{content:"";width:34px;height:1px;background:currentColor}
.d-noord .btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:52px;padding:0 28px;font-size:14px;font-weight:400;letter-spacing:.12em;text-transform:uppercase;transition:background-color .3s,color .3s,border-color .3s}
.d-noord .nd-fill{background:var(--ink);color:var(--bg)}
.d-noord .nd-fill:hover{background:var(--clay)}
.d-noord .nd-line{border:1px solid var(--ink);color:var(--ink)}
.d-noord .nd-line:hover{background:var(--ink);color:var(--bg)}
.d-noord .nd-text{display:inline-flex;align-items:center;min-height:44px;font-size:14px;letter-spacing:.12em;text-transform:uppercase;border-bottom:1px solid currentColor}
.d-noord .nd-hdr{position:sticky;top:0;z-index:40;background:rgba(246,245,241,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:border-color .4s}
.d-noord.is-scrolled .nd-hdr{border-color:var(--line)}
.d-noord .nd-bar{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:24px;height:78px}
.d-noord .nd-logo{overflow:hidden;font-family:var(--serif);font-size:clamp(24px,2vw,30px);line-height:1;text-overflow:ellipsis;white-space:nowrap}
.d-noord .nd-links{display:none;gap:34px;font-size:12px;letter-spacing:.18em;text-transform:uppercase}
.d-noord .nd-links a{position:relative;padding:8px 0;color:var(--ink-2)}
.d-noord .nd-links a::after{content:"";position:absolute;left:0;right:0;bottom:2px;height:1px;background:var(--clay);transform:scaleX(0);transition:transform .35s var(--ease)}
.d-noord .nd-links a:hover::after{transform:none}
.d-noord .nd-cta{display:none}
.d-noord .nd-burger{display:flex;align-items:center;gap:12px;min-height:44px;padding:0;border:0;background:none;font-size:12px;letter-spacing:.18em;text-transform:uppercase}
.d-noord .nd-burger i{display:grid;gap:6px;width:26px}
.d-noord .nd-burger i::before,.d-noord .nd-burger i::after{content:"";height:1px;background:currentColor;transition:transform .35s var(--ease)}
.d-noord.menu-open .nd-burger i::before{transform:translateY(3.5px) rotate(20deg)}
.d-noord.menu-open .nd-burger i::after{transform:translateY(-3.5px) rotate(-20deg)}
@media (min-width:1020px){.d-noord .nd-bar{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}.d-noord .nd-links{display:flex}.d-noord .nd-cta{display:inline-flex;justify-self:end}.d-noord .nd-burger{display:none}}
.d-noord .nd-menu{position:fixed;inset:78px 0 0;z-index:39;display:flex;flex-direction:column;justify-content:space-between;gap:32px;padding:32px var(--pad) 110px;background:var(--bg);overflow-y:auto;clip-path:inset(0 0 100% 0);visibility:hidden;transition:clip-path .6s var(--ease),visibility 0s .6s}
.d-noord .nd-menu.is-open{clip-path:inset(0);visibility:visible;transition:clip-path .6s var(--ease)}
.d-noord .nd-menu nav{display:grid}
.d-noord .nd-menu nav a{display:flex;align-items:baseline;justify-content:space-between;gap:16px;min-height:60px;padding:8px 0;border-bottom:1px solid var(--line);font-family:var(--serif);font-size:clamp(36px,9vw,64px);line-height:1.05}
.d-noord .nd-menu nav a:hover{font-style:italic;color:var(--clay)}
.d-noord .nd-menu nav small{font-family:"Outfit",sans-serif;font-size:12px;letter-spacing:.18em;color:var(--dim)}
.d-noord .nd-menu p{color:var(--dim)}
.d-noord .nd-menu p a{display:inline-flex;align-items:center;min-height:40px;color:var(--ink)}
.d-noord .nd-hero{padding-top:clamp(36px,6vw,96px)}
.d-noord .nd-hero h1{max-width:15ch;margin-top:26px;font-size:clamp(54px,10.2vw,172px);line-height:.92;letter-spacing:-.025em}
.d-noord .nd-hero h1.is-m{max-width:18ch;font-size:clamp(46px,7.6vw,128px)}
.d-noord .nd-hero h1.is-s{max-width:22ch;font-size:clamp(38px,5.6vw,92px);line-height:.98}
.d-noord .nd-hero-row{display:grid;gap:32px 64px;margin-top:clamp(32px,4vw,56px);padding-bottom:clamp(36px,5vw,64px)}
@media (min-width:900px){.d-noord .nd-hero-row{grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);align-items:end}}
.d-noord .nd-lede{max-width:46ch;font-size:clamp(17px,1.35vw,21px);color:var(--ink-2)}
.d-noord .nd-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px 28px;margin-top:30px}
.d-noord .nd-facts{display:grid;border-top:1px solid var(--ink)}
.d-noord .nd-facts div{display:grid;grid-template-columns:110px minmax(0,1fr);gap:16px;padding:14px 0;border-bottom:1px solid var(--line)}
.d-noord .nd-facts dt{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}
.d-noord .nd-facts dd{margin:0}
.d-noord .nd-hero-media{position:relative;display:grid;gap:clamp(8px,1vw,16px);grid-template-columns:minmax(0,1fr)}
.d-noord .nd-hero-media figure{overflow:hidden;aspect-ratio:4/5}
.d-noord .nd-hero-media img{width:100%;height:100%;object-fit:cover;transform:scale(1.04);transition:transform 1.6s var(--ease)}
.d-noord .nd-hero-media figure.in img,.d-noord .nd-hero-media figure:hover img{transform:none}
@media (min-width:760px){.d-noord .nd-hero-media figure{aspect-ratio:21/9}.d-noord .nd-hero-media.has-3{grid-template-columns:minmax(0,2.2fr) minmax(0,1fr)}.d-noord .nd-hero-media.has-3 figure:first-child{grid-row:span 2;aspect-ratio:auto;min-height:100%}.d-noord .nd-hero-media.has-3 figure:not(:first-child){aspect-ratio:4/3}}
@media (max-width:759px){.d-noord .nd-hero-media figure:not(:first-child){display:none}}.d-noord .nd-mark{display:grid;place-items:center;aspect-ratio:21/9;border-block:1px solid var(--ink);overflow:hidden}
.d-noord .nd-mark span{font-family:var(--serif);font-size:min(46vw,520px);font-style:italic;line-height:.8;color:var(--clay)}
@media (max-width:759px){.d-noord .nd-mark{aspect-ratio:4/3}}
.d-noord .nd-sec{padding-block:clamp(80px,10vw,170px)}
.d-noord .nd-sec.is-panel{background:var(--panel)}
.d-noord .nd-sec.is-ink{background:var(--ink);color:var(--bg)}
.d-noord .nd-sec.is-ink .nd-kick{color:rgba(246,245,241,.6)}
.d-noord .nd-head{display:grid;gap:22px;margin-bottom:clamp(44px,6vw,90px)}
.d-noord .nd-head>p:not(.nd-kick){max-width:52ch;color:var(--dim)}
@media (min-width:1000px){.d-noord .nd-head.is-split{grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);align-items:end}.d-noord .nd-head.is-split .nd-kick{grid-column:1/-1}}
.d-noord .nd-about{display:grid;gap:clamp(36px,5vw,80px)}
@media (min-width:960px){.d-noord .nd-about{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}.d-noord .nd-about.is-solo{grid-template-columns:minmax(0,1fr)}}
.d-noord .nd-about-pic{align-self:start;overflow:hidden;aspect-ratio:3/4}
.d-noord .nd-about-pic img{width:100%;height:100%;object-fit:cover}
@media (min-width:960px){.d-noord .nd-about-pic{position:sticky;top:110px}}
.d-noord .nd-about-copy{display:grid;gap:26px;align-content:start}
.d-noord .nd-lead{font-family:var(--serif);font-size:clamp(28px,2.8vw,46px);line-height:1.15;color:var(--ink)}
.d-noord .nd-cols{display:grid;gap:20px 48px;color:var(--dim)}
@media (min-width:760px){.d-noord .nd-cols{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-noord .nd-trio{display:grid;gap:0;margin-top:16px;border-top:1px solid var(--ink)}
.d-noord .nd-trio li{display:grid;grid-template-columns:56px minmax(0,1fr);gap:12px;align-items:baseline;padding:18px 0;border-bottom:1px solid var(--line);font-size:1.08em}
.d-noord .nd-trio small{font-family:var(--serif);font-size:22px;font-style:italic;color:var(--clay)}
.d-noord .nd-prices{display:grid;gap:0 clamp(40px,5vw,96px);border-top:1px solid var(--ink)}
@media (min-width:900px){.d-noord .nd-prices{grid-template-columns:repeat(2,minmax(0,1fr))}.d-noord .nd-prices.is-one{grid-template-columns:minmax(0,1fr);max-width:900px}}
.d-noord .nd-price{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:6px 18px;align-items:baseline;padding:24px 0;border-bottom:1px solid var(--line);transition:background-color .3s}
.d-noord .nd-price small{font-size:12px;letter-spacing:.14em;color:var(--dim)}
.d-noord .nd-price h3{font-size:clamp(25px,2.1vw,32px);transition:color .3s,font-style .3s}
.d-noord .nd-price:hover h3{font-style:italic;color:var(--clay)}
.d-noord .nd-price p{grid-column:2/-1;max-width:52ch;color:var(--dim);font-size:.95em}
.d-noord .nd-price .nd-amt{display:grid;justify-items:end;gap:2px;white-space:nowrap}
.d-noord .nd-price .nd-amt b{font-weight:400;font-size:1.05em}
.d-noord .nd-price .nd-amt span{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}
.d-noord .nd-strip-wrap{position:relative}
.d-noord .nd-strip{display:flex;gap:clamp(10px,1.4vw,22px);overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-inline:var(--pad);scroll-padding-inline:var(--pad)}
.d-noord .nd-strip::-webkit-scrollbar{display:none}
.d-noord .nd-strip figure{flex:none;width:clamp(240px,30vw,460px);aspect-ratio:3/4;overflow:hidden;scroll-snap-align:start}
.d-noord .nd-strip figure:nth-child(3n+2){width:clamp(300px,42vw,680px);aspect-ratio:4/3;align-self:end}
.d-noord .nd-strip img{width:100%;height:100%;object-fit:cover}
.d-noord .nd-arrows{display:flex;gap:10px}
.d-noord .nd-arrows button{display:grid;place-items:center;width:52px;height:52px;border:1px solid var(--ink);border-radius:50%;background:none;font-size:20px;transition:background-color .3s,color .3s}
.d-noord .nd-arrows button:hover{background:var(--ink);color:var(--bg)}
.d-noord .nd-team{display:grid;gap:clamp(28px,3vw,48px) clamp(16px,2vw,32px);grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))}
.d-noord .nd-team figure{overflow:hidden;aspect-ratio:3/4;margin-bottom:18px;background:var(--panel)}
.d-noord .nd-team img{width:100%;height:100%;object-fit:cover;filter:grayscale(.2)}
.d-noord .nd-team h3{font-size:clamp(26px,2.2vw,34px);font-style:italic}
.d-noord .nd-team p{margin-top:6px;color:var(--dim)}
.d-noord .nd-team .nd-role{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--clay)}
.d-noord .nd-num{display:grid;gap:0;border-top:1px solid currentColor}
@media (min-width:860px){.d-noord .nd-num{grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}.d-noord .nd-num li+li{border-left:1px solid var(--line)}}
.d-noord .nd-num li{display:grid;gap:14px;align-content:start;padding:28px clamp(0px,2vw,32px) 32px;border-bottom:1px solid var(--line)}
.d-noord .nd-num li:first-child{padding-left:0}
.d-noord .nd-num b{font-family:var(--serif);font-size:clamp(54px,5vw,84px);font-weight:400;font-style:italic;line-height:.9;color:var(--clay)}
.d-noord .nd-num h3{font-size:clamp(24px,2vw,30px)}.d-noord .nd-num p{color:var(--dim)}
.d-noord .is-ink .nd-num li{border-color:rgba(246,245,241,.16)}
.d-noord .is-ink .nd-num p{color:rgba(246,245,241,.66)}
.d-noord .nd-num .nd-ico{display:grid;place-items:center;width:44px;height:44px;border:1px solid currentColor;border-radius:50%}
.d-noord .nd-num .nd-ico svg{width:20px;height:20px}
.d-noord .nd-book{display:grid;gap:clamp(36px,5vw,96px);align-items:start}
@media (min-width:980px){.d-noord .nd-book{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-noord .nd-book-copy{display:grid;gap:26px}
.d-noord .nd-book-copy>p{max-width:46ch;color:var(--dim)}
.d-noord .nd-form{padding:clamp(24px,3.4vw,52px);background:var(--white)}
.d-noord .z-hours{border-color:var(--ink)}
.d-noord .z-field label,.d-noord .z-chipset legend{font-size:11px;letter-spacing:.2em}
.d-noord .z-field input,.d-noord .z-field select,.d-noord .z-field textarea{padding:10px 0;border-width:0 0 1px;border-color:var(--ink);font-weight:300}
.d-noord .z-field :focus-visible{outline:none;border-color:var(--clay)}
.d-noord .z-sec.z-cta{background:var(--panel)}
.d-noord .z-statement h2{font-style:italic}
.d-noord .z-acc summary{font-family:var(--serif);font-size:clamp(24px,2.2vw,32px);line-height:1.15}
.d-noord .z-card{background:var(--white);border-color:var(--line)}
.d-noord .z-steps small,.d-noord .z-rows small{font-family:var(--serif);font-size:24px;font-style:italic;letter-spacing:0}
.d-noord .z-quotes blockquote>p{font-style:italic}
.d-noord .nd-foot{padding:clamp(72px,9vw,140px) 0 140px;background:var(--ink);color:var(--bg)}
.d-noord .nd-foot-name{font-family:var(--serif);font-size:min(17vw,240px,calc(200vw / var(--n,8)));font-style:italic;line-height:.88;letter-spacing:-.02em;word-break:break-word}
.d-noord .nd-foot-grid{display:grid;gap:36px;margin-top:clamp(48px,7vw,100px);padding-top:32px;border-top:1px solid rgba(246,245,241,.2);grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-noord .nd-foot-grid h3{margin-bottom:14px;font-family:"Outfit",sans-serif;font-size:11px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:rgba(246,245,241,.55)}
.d-noord .nd-foot-grid a,.d-noord .nd-foot-grid span{display:block;padding:4px 0}
.d-noord .nd-foot-grid a:hover{color:#e0a184}
.d-noord .nd-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;font-size:12px;letter-spacing:.06em;color:rgba(246,245,241,.55)}
`
  .replace(/\n/g, "")
  .trim();

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="nd-kick" data-rv>
    {children}
  </p>
);

function Head({ kicker, title, intro, id, split }: { kicker?: string; title: string; intro?: string; id?: string; split?: boolean }) {
  return (
    <header className={`nd-head${split && intro ? " is-split" : ""}`}>
      {kicker ? <Kick>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="nd-hdr hdr">
        <div className="nd-wrap nd-bar">
          <a href="#top" className="nd-logo" aria-label={c.name}>
            {c.name}
          </a>
          <nav aria-label={c.t.menu} className="nd-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="nd-text nd-cta">
            {cta.label}
          </a>
          <button type="button" className="nd-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="nd-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
              <small>{String(k + 1).padStart(2, "0")}</small>
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
  const main = c.photo(hero.image);
  // Two more pictures make a triptych on wide screens; never placeholders.
  const more = main ? [c.spare(), c.spare()].filter((p): p is Photo => Boolean(p)) : [];
  const pics = more.length === 2 ? [main!, ...more] : main ? [main] : [];
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 46 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const facts = heroFacts(c);
  return (
    <section className="nd-hero">
      <div className="nd-wrap">
        {hero.eyebrow ? <Kick>{hero.eyebrow}</Kick> : null}
        <h1 className={size} data-rv style={i(1)}>
          {em(hero.headline)}
        </h1>
        <div className="nd-hero-row">
          <div data-rv style={i(2)}>
            <p className="nd-lede">{hero.subheadline}</p>
            <div className="nd-cta-row">
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
            <dl className="nd-facts" data-rv style={i(3)}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
      {pics.length ? (
        <div className={`nd-wrap nd-hero-media${pics.length === 3 ? " has-3" : ""}`}>
          {pics.map((p, n) => (
            <figure key={n} data-rv style={i(n + 2)}>
              <Pic p={p} eager={n === 0} sizes={n === 0 ? "(min-width: 760px) 66vw, 100vw" : "(min-width: 760px) 30vw, 100vw"} />
            </figure>
          ))}
        </div>
      ) : (
        <div className="nd-wrap">
          <div className="nd-mark" aria-hidden="true">
            <span>{c.name.charAt(0)}</span>
          </div>
        </div>
      )}
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  return (
    <footer className="nd-foot">
      <div className="nd-wrap">
        <p className="nd-foot-name" aria-hidden="true" style={{ ["--n" as string]: Math.max(6, c.name.length) }}>
          {c.name}
        </p>
        <div className="nd-foot-grid">
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
          {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
        </div>
        <Legal c={c} className="nd-legal" />
      </div>
    </footer>
  );
}

/** Numbered columns: used for features (with icons) and for the steps of a process. */
function Numbered({ items }: { items: { title: string; description: string; icon?: Parameters<typeof Icon>[0]["name"] }[] }) {
  return (
    <ol className="nd-num" style={{ ["--n" as string]: Math.min(4, items.length) }}>
      {items.map((it, n) => (
        <li key={n} data-rv style={i(n % 4)}>
          {it.icon ? (
            <span className="nd-ico">
              <Icon name={it.icon} />
            </span>
          ) : (
            <b>{String(n + 1).padStart(2, "0")}</b>
          )}
          <h3>{it.title}</h3>
          <p>{it.description}</p>
        </li>
      ))}
    </ol>
  );
}

export const noord: Family = {
  key: "noord",
  root: "d-noord",
  fonts: ["Instrument Serif", "Outfit"],
  themeColor: "#f6f5f1",
  accent: "#b5603c",
  onAccent: "#ffffff",
  css: CSS,
  extra: "",
  cls: { wrap: "nd-wrap", eyebrow: "nd-kick", btn: "nd-fill", btnAlt: "nd-line", btnText: "nd-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="nd-sec" id={s.id}>
          <div className={`nd-wrap nd-about${p ? "" : " is-solo"}`}>
            {p ? (
              <figure className="nd-about-pic" data-rv>
                <Pic p={p} sizes="(min-width: 960px) 36vw, 100vw" />
              </figure>
            ) : null}
            <div className="nd-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="nd-lead" data-rv>
                {first}
              </p>
              {rest.length > 0 && (
                <div className="nd-cols" data-rv>
                  {rest.map((x, n) => (
                    <p key={n}>{x}</p>
                  ))}
                </div>
              )}
              {s.highlights.length > 0 && (
                <ul className="nd-trio" data-rv>
                  {s.highlights.map((h, n) => (
                    <li key={h}>
                      <small>{String(n + 1).padStart(2, "0")}</small>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      );
    },
    services: (s) => (
      <section className="nd-sec is-panel" id={s.id}>
        <div className="nd-wrap">
          <Head kicker={undefined} title={s.title} intro={s.intro} split />
          <ol className={`nd-prices${s.items.length < 4 ? " is-one" : ""}`}>
            {s.items.map((it, n) => (
              <li key={n} className="nd-price" data-rv style={i(n % 2)}>
                <small>{String(n + 1).padStart(2, "0")}</small>
                <h3>{it.title}</h3>
                {it.price || it.duration ? (
                  <span className="nd-amt">
                    {it.price ? <b>{it.price}</b> : null}
                    {it.duration ? <span>{it.duration}</span> : null}
                  </span>
                ) : (
                  <span />
                )}
                <p>{it.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    menu: (s) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="nd-sec is-panel" id={s.id}>
          <div className="nd-wrap">
            <Head title={s.title} intro={s.intro} split />
            {cats.map((cat, n) => (
              <div key={n} style={{ marginTop: n ? 56 : 0 }}>
                <p className="nd-kick" data-rv style={{ marginBottom: 18 }}>
                  {cat.name}
                </p>
                <ol className={`nd-prices${cat.items.length < 4 ? " is-one" : ""}`}>
                  {cat.items.map((d, m) => (
                    <li key={m} className="nd-price" data-rv style={i(m % 2)}>
                      <small>{String(m + 1).padStart(2, "0")}</small>
                      <h3>{d.name}</h3>
                      {d.price ? (
                        <span className="nd-amt">
                          <b>{d.price}</b>
                        </span>
                      ) : (
                        <span />
                      )}
                      {d.description ? <p>{d.description}</p> : null}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
            {s.note ? (
              <p className="z-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const strip = `${s.id}-strip`;
      return (
        <section className="nd-sec" id={s.id}>
          <div className="nd-wrap nd-head is-split" style={{ alignItems: "end" }}>
            <Kick>{c.t.kick.gallery}</Kick>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {pics.length > 2 ? (
              <div className="nd-arrows" style={{ justifySelf: "end" }}>
                <button type="button" data-scroll="prev" aria-controls={strip} aria-label="←">
                  ←
                </button>
                <button type="button" data-scroll="next" aria-controls={strip} aria-label="→">
                  →
                </button>
              </div>
            ) : null}
          </div>
          <div className="nd-strip" id={strip}>
            {pics.map((p, n) => (
              <figure key={n} data-rv style={i(n % 4)}>
                <Pic p={p} sizes="(min-width: 900px) 40vw, 80vw" />
              </figure>
            ))}
          </div>
        </section>
      );
    },
    team: (s, c) => (
      <section className="nd-sec" id={s.id}>
        <div className="nd-wrap">
          <Head kicker={c.t.kick.team} title={s.title} intro={s.intro} split />
          <ul className="nd-team">
            {s.members.map((m, n) => {
              const p = c.photo(m.image);
              return (
                <li key={n} data-rv style={i(n % 3)}>
                  {p ? (
                    <figure>
                      <Pic p={p} sizes="(min-width: 900px) 28vw, 50vw" />
                    </figure>
                  ) : null}
                  <p className="nd-role">{m.role}</p>
                  <h3>{m.name}</h3>
                  {m.bio ? <p>{m.bio}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    features: (s, c) => (
      <section className="nd-sec is-ink" id={s.id}>
        <div className="nd-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} split />
          <Numbered items={s.items} />
        </div>
      </section>
    ),
    process: (s, c) => (
      <section className="nd-sec" id={s.id}>
        <div className="nd-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} split />
          <Numbered items={s.steps} />
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="nd-sec is-panel" id={s.id}>
        <div className="nd-wrap nd-book">
          <div className="nd-book-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Hours c={c} />
            <Reach c={c} />
          </div>
          <div className="nd-form" data-rv>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </div>
        </div>
      </section>
    ),
  },
};
