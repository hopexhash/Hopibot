import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Ambacht: an original template (no portfolio demo). Clear and dependable: navy and white,
 * one safety-orange call to action, condensed uppercase headings and the phone number within
 * reach on every screen. Service cards, a step-by-step process and a quote form. Made for
 * plumbers, electricians, roofers, installers, cleaners, garages and other local trades.
 */

const CSS = `
.d-ambacht{--white:#ffffff;--mist:#eef2f6;--navy:#0e2440;--navy-2:#0b1d34;--navy-3:#16345a;--text:#22344d;--dim:#5b6b80;--orange:#f26a1b;--orange-d:#d85a10;--line:rgba(14,36,64,.12);--r:10px;--pad:clamp(18px,4.4vw,60px);--ease:cubic-bezier(.2,.7,.2,1);--cond:"Barlow Condensed","Arial Narrow",sans-serif;--z-bg2:var(--mist);--z-ink:var(--navy);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--orange);--z-on-accent:#fff;--z-display:var(--cond);--z-display-weight:700;--z-radius:var(--r);--z-field-radius:8px;--z-ico-radius:10px;--z-h3:clamp(22px,1.8vw,27px);--z-statement:clamp(32px,4.4vw,64px);background:var(--white);color:var(--text);font-family:"DM Sans",system-ui,sans-serif;font-size:clamp(16px,1.05vw,17.5px);line-height:1.6}
.d-ambacht h1,.d-ambacht h2,.d-ambacht h3{font-family:var(--cond);font-weight:700;line-height:.98;letter-spacing:.005em;text-transform:uppercase;color:var(--navy)}
.d-ambacht h1 em,.d-ambacht h2 em{font-style:normal;color:var(--orange)}
.d-ambacht h2{font-size:clamp(38px,5vw,72px)}
.d-ambacht h2.is-long{font-size:clamp(30px,3.6vw,52px)}
.d-ambacht h3{font-size:clamp(22px,1.8vw,27px);line-height:1.05}
.d-ambacht .am-wrap{width:min(100%,1320px);margin-inline:auto;padding-inline:var(--pad)}
.d-ambacht .am-kick{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--orange)}
.d-ambacht .am-kick::before{content:"";width:22px;height:3px;background:currentColor}
.d-ambacht .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:0 26px;border-radius:8px;font-family:var(--cond);font-size:19px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;transition:background-color .2s,color .2s,border-color .2s,transform .2s var(--ease)}
.d-ambacht .btn svg{width:18px;height:18px}
.d-ambacht .am-fill{background:var(--orange);color:#fff}
.d-ambacht .am-fill:hover{background:var(--orange-d);transform:translateY(-1px)}
.d-ambacht .am-line{border:2px solid currentColor}
.d-ambacht .am-line:hover{background:var(--navy);border-color:var(--navy);color:#fff}
.d-ambacht .am-text{display:inline-flex;align-items:center;min-height:44px;font-weight:700;color:var(--orange);text-decoration:underline;text-underline-offset:5px}
.d-ambacht .am-top{background:var(--navy-2);color:rgba(255,255,255,.82);font-size:14px}
.d-ambacht .am-top .am-wrap{display:flex;flex-wrap:wrap;align-items:center;gap:4px 26px;min-height:40px}
.d-ambacht .am-top span,.d-ambacht .am-top a{display:inline-flex;align-items:center;gap:8px}
.d-ambacht .am-top svg{width:15px;height:15px;color:var(--orange)}
.d-ambacht .am-top a{margin-left:auto;font-weight:700;color:#fff}
@media (max-width:700px){.d-ambacht .am-top span{display:none}.d-ambacht .am-top a{margin-left:0}}
.d-ambacht .am-hdr{position:sticky;top:0;z-index:40;background:var(--white);border-bottom:1px solid var(--line);transition:box-shadow .3s}
.d-ambacht.is-scrolled .am-hdr{box-shadow:0 10px 30px -18px rgba(14,36,64,.45)}
.d-ambacht .am-bar{display:flex;align-items:center;gap:22px;height:76px}
.d-ambacht .am-logo{display:flex;align-items:center;gap:12px;min-width:0}
.d-ambacht .am-logo i{display:grid;flex:none;place-items:center;width:44px;height:44px;border-radius:8px;background:var(--navy);color:#fff;font-family:var(--cond);font-size:26px;font-style:normal;font-weight:700}
.d-ambacht .am-logo span{overflow:hidden;font-family:var(--cond);font-size:24px;font-weight:700;line-height:1;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap;color:var(--navy)}
.d-ambacht .am-links{display:none;gap:28px;margin-left:auto;font-weight:500;color:var(--navy)}
.d-ambacht .am-links a{padding:8px 0;border-bottom:3px solid transparent;transition:border-color .2s}
.d-ambacht .am-links a:hover{border-color:var(--orange)}
.d-ambacht .am-cta{display:none;min-height:48px}
.d-ambacht .am-call{display:grid;place-items:center;flex:none;width:48px;height:48px;margin-left:auto;border-radius:8px;background:var(--orange);color:#fff}
.d-ambacht .am-call svg{width:20px;height:20px}
.d-ambacht .am-burger{display:flex;align-items:center;gap:10px;min-height:48px;padding:0 16px;border:2px solid var(--navy);border-radius:8px;background:none;font-family:var(--cond);font-size:18px;font-weight:700;text-transform:uppercase;color:var(--navy)}
.d-ambacht .am-burger i{display:grid;gap:5px;width:20px}
.d-ambacht .am-burger i::before,.d-ambacht .am-burger i::after{content:"";height:2px;background:currentColor;transition:transform .3s var(--ease)}
.d-ambacht.menu-open .am-burger i::before{transform:translateY(3.5px) rotate(45deg)}
.d-ambacht.menu-open .am-burger i::after{transform:translateY(-3.5px) rotate(-45deg)}
.d-ambacht .am-call+.am-burger{margin-left:0}
.d-ambacht .am-bar>.am-burger:nth-child(4){margin-left:auto}
@media (min-width:1040px){.d-ambacht .am-links,.d-ambacht .am-cta{display:inline-flex}.d-ambacht .am-burger,.d-ambacht .am-call{display:none}}
.d-ambacht .am-menu{position:fixed;inset:116px 0 0;z-index:39;display:flex;flex-direction:column;gap:28px;padding:24px var(--pad) 110px;background:var(--navy);color:#fff;overflow-y:auto;opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s .25s}
.d-ambacht .am-menu.is-open{opacity:1;visibility:visible;transition:opacity .25s}
.d-ambacht .am-menu nav{display:grid}
.d-ambacht .am-menu nav a{display:flex;align-items:center;justify-content:space-between;min-height:58px;border-bottom:1px solid rgba(255,255,255,.14);font-family:var(--cond);font-size:clamp(28px,7vw,44px);font-weight:700;text-transform:uppercase}
.d-ambacht .am-menu nav a::after{content:"→";color:var(--orange)}
.d-ambacht .am-menu .btn{align-self:start}
.d-ambacht .am-hero{position:relative;background:var(--navy);color:#fff;overflow:hidden}
.d-ambacht .am-hero::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(-55deg,transparent 0 46px,rgba(255,255,255,.025) 46px 47px);pointer-events:none}
.d-ambacht .am-hero-grid{position:relative;display:grid;gap:40px;padding-block:clamp(48px,7vw,110px) clamp(90px,10vw,150px)}
@media (min-width:980px){.d-ambacht .am-hero-grid{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:center}}
.d-ambacht .am-hero .am-kick{color:#ffb27f}
.d-ambacht .am-hero h1{margin-top:18px;font-size:clamp(48px,7vw,104px);line-height:.92;color:#fff}
.d-ambacht .am-hero h1.is-m{font-size:clamp(42px,5.6vw,84px)}
.d-ambacht .am-hero h1.is-s{font-size:clamp(36px,4.4vw,64px);line-height:.98}
.d-ambacht .am-lede{max-width:50ch;margin-top:22px;font-size:clamp(17px,1.3vw,20px);color:rgba(255,255,255,.8)}
.d-ambacht .am-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
.d-ambacht .am-hero .am-line{color:#fff}
.d-ambacht .am-hero .am-line:hover{background:#fff;color:var(--navy);border-color:#fff}
.d-ambacht .am-hero-pic{position:relative;aspect-ratio:5/4;overflow:hidden;border-radius:var(--r);clip-path:polygon(9% 0,100% 0,100% 100%,0 100%)}
.d-ambacht .am-hero-pic img{width:100%;height:100%;object-fit:cover}
.d-ambacht .am-hero-pic::after{content:"";position:absolute;left:0;bottom:0;width:38%;height:8px;background:var(--orange)}
.d-ambacht .am-tiles{display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr))}
.d-ambacht .am-tiles li{display:grid;gap:12px;align-content:space-between;min-height:130px;padding:20px;border:1px solid rgba(255,255,255,.14);border-radius:var(--r);background:var(--navy-3);font-family:var(--cond);font-size:22px;font-weight:700;line-height:1.05;text-transform:uppercase}
.d-ambacht .am-tiles svg{width:26px;height:26px;color:var(--orange)}
.d-ambacht .am-facts{position:relative;z-index:2;display:grid;gap:12px;margin-top:-62px}
@media (min-width:760px){.d-ambacht .am-facts{grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}}
.d-ambacht .am-facts div{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 16px;align-items:center;padding:20px 22px;border-radius:var(--r);background:var(--white);box-shadow:0 18px 40px -22px rgba(14,36,64,.45);border-top:4px solid var(--orange)}
.d-ambacht .am-facts span{grid-row:span 2;display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--mist);color:var(--navy)}
.d-ambacht .am-facts svg{width:20px;height:20px}
.d-ambacht .am-facts dt{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}
.d-ambacht .am-facts dd{margin:0;font-weight:500;color:var(--navy)}
.d-ambacht .am-sec{padding-block:clamp(72px,9vw,140px)}
.d-ambacht .am-sec.is-mist{background:var(--mist)}
.d-ambacht .am-sec.is-navy{background:var(--navy);color:rgba(255,255,255,.82)}
.d-ambacht .is-navy h2,.d-ambacht .is-navy h3{color:#fff}
.d-ambacht .is-navy .am-kick{color:#ffb27f}
.d-ambacht .am-head{display:grid;gap:16px;max-width:820px;margin-bottom:clamp(36px,5vw,64px)}
.d-ambacht .am-head>p:not(.am-kick){max-width:58ch;color:var(--dim)}
.d-ambacht .is-navy .am-head>p:not(.am-kick){color:rgba(255,255,255,.72)}
.d-ambacht .am-about{display:grid;gap:clamp(36px,5vw,80px);align-items:center}
@media (min-width:960px){.d-ambacht .am-about{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}.d-ambacht .am-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:920px}}
.d-ambacht .am-about-copy{display:grid;gap:20px}
.d-ambacht .am-about-copy .am-lead{font-size:clamp(19px,1.5vw,22px);color:var(--navy)}
.d-ambacht .am-about-copy p{color:var(--dim)}
.d-ambacht .am-checks{display:grid;gap:12px;margin-top:8px}
@media (min-width:620px){.d-ambacht .am-checks{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-ambacht .am-checks li{display:flex;align-items:center;gap:12px;font-weight:500;color:var(--navy)}
.d-ambacht .am-checks span{display:grid;flex:none;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--orange);color:#fff}
.d-ambacht .am-checks svg{width:15px;height:15px}
.d-ambacht .am-about-pic{position:relative}
.d-ambacht .am-about-pic figure{aspect-ratio:4/5;overflow:hidden;border-radius:var(--r)}
.d-ambacht .am-about-pic img{width:100%;height:100%;object-fit:cover}
.d-ambacht .am-badge{position:absolute;left:-14px;bottom:28px;display:flex;align-items:center;gap:10px;padding:14px 18px;border-radius:var(--r);background:var(--navy);color:#fff;font-family:var(--cond);font-size:20px;font-weight:700;text-transform:uppercase;box-shadow:0 14px 30px -14px rgba(14,36,64,.6)}
.d-ambacht .am-badge svg{width:20px;height:20px;color:var(--orange)}
.d-ambacht .am-cards{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))}
.d-ambacht .am-card{position:relative;display:grid;gap:14px;align-content:start;padding:clamp(24px,2.4vw,32px);border:1px solid var(--line);border-radius:var(--r);background:var(--white);transition:transform .25s var(--ease),box-shadow .25s var(--ease),border-color .25s}
.d-ambacht .am-card::before{content:"";position:absolute;left:-1px;right:-1px;top:-1px;height:4px;border-radius:var(--r) var(--r) 0 0;background:var(--orange);transform:scaleX(0);transform-origin:left;transition:transform .35s var(--ease)}
.d-ambacht .am-card:hover{transform:translateY(-4px);box-shadow:0 22px 40px -26px rgba(14,36,64,.5)}
.d-ambacht .am-card:hover::before{transform:none}
.d-ambacht .am-ico{display:grid;place-items:center;width:54px;height:54px;border-radius:10px;background:#fde8db;color:var(--orange-d)}
.d-ambacht .am-ico svg{width:26px;height:26px}
.d-ambacht .am-card p{color:var(--dim)}
.d-ambacht .am-meta{display:flex;flex-wrap:wrap;gap:8px}
.d-ambacht .am-meta span{padding:5px 11px;border-radius:999px;background:var(--mist);font-size:14px;font-weight:600;color:var(--navy)}
.d-ambacht .am-steps{display:grid;gap:22px;counter-reset:s}
@media (min-width:900px){.d-ambacht .am-steps{grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:28px}}
.d-ambacht .am-steps li{position:relative;display:grid;gap:12px;align-content:start;padding-left:72px}
@media (min-width:900px){.d-ambacht .am-steps li{padding:0;padding-top:80px}}
.d-ambacht .am-steps b{position:absolute;left:0;top:0;display:grid;place-items:center;width:56px;height:56px;border:3px solid var(--orange);border-radius:50%;background:var(--white);font-family:var(--cond);font-size:26px;color:var(--navy);z-index:1}
.d-ambacht .am-steps li:not(:last-child)::after{content:"";position:absolute;left:27px;top:56px;bottom:-22px;width:3px;background:var(--line)}
@media (min-width:900px){.d-ambacht .am-steps li:not(:last-child)::after{left:56px;right:-28px;top:27px;bottom:auto;width:auto;height:3px}}
.d-ambacht .am-steps p{color:var(--dim)}
.d-ambacht .am-why{display:grid;gap:28px;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))}
.d-ambacht .am-why li{display:grid;gap:12px;align-content:start;padding-top:22px;border-top:1px solid rgba(255,255,255,.16)}
.d-ambacht .am-why span{display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:var(--orange);color:#fff}
.d-ambacht .am-why svg{width:24px;height:24px}
.d-ambacht .am-why p{color:rgba(255,255,255,.72)}
.d-ambacht .am-quote{display:grid;gap:clamp(32px,4vw,64px);align-items:start}
@media (min-width:980px){.d-ambacht .am-quote{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}}
.d-ambacht .am-quote-copy{display:grid;gap:22px}
.d-ambacht .am-quote-copy>p{color:var(--dim)}
.d-ambacht .am-quote-card{overflow:hidden;border-radius:var(--r);background:var(--white);box-shadow:0 30px 60px -34px rgba(14,36,64,.5)}
.d-ambacht .am-quote-card>header{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 18px;padding:18px clamp(22px,3vw,36px);background:var(--navy);color:#fff}
.d-ambacht .am-quote-card>header p{font-family:var(--cond);font-size:22px;font-weight:700;text-transform:uppercase}
.d-ambacht .am-quote-card>header a{display:inline-flex;align-items:center;gap:8px;min-height:40px;font-weight:600;color:#ffb27f}
.d-ambacht .am-quote-card>header svg{width:16px;height:16px}
.d-ambacht .am-quote-card .z-form{padding:clamp(22px,3vw,36px)}
.d-ambacht .z-field label{font-weight:700;letter-spacing:.06em;color:var(--navy)}
.d-ambacht .z-field input,.d-ambacht .z-field select,.d-ambacht .z-field textarea{border:1.5px solid #c9d3df;background:#fff}
.d-ambacht .z-field :focus-visible{outline:3px solid rgba(242,106,27,.35);border-color:var(--orange)}
.d-ambacht .z-hours{border-color:var(--line)}
.d-ambacht .z-hours dd{font-weight:600;color:var(--navy)}
.d-ambacht .z-sec.z-cta{background:var(--orange);color:#fff}
.d-ambacht .z-cta h2{color:#fff}
.d-ambacht .z-cta h2 em{color:var(--navy)}
.d-ambacht .z-cta .z-center>p{color:rgba(255,255,255,.9)}
.d-ambacht .z-cta .am-fill{background:var(--navy)}
.d-ambacht .z-acc summary{font-family:var(--cond);font-size:clamp(21px,1.7vw,25px);font-weight:700;text-transform:uppercase;color:var(--navy)}
.d-ambacht .z-acc summary i{color:var(--orange)}
.d-ambacht .z-sec:has(.z-acc){background:var(--mist)}
.d-ambacht .z-card,.d-ambacht .z-panel{background:var(--white);border-color:var(--line)}
.d-ambacht .z-pack.is-featured{border-width:2px}
.d-ambacht .z-steps small,.d-ambacht .z-rows small{font-family:var(--cond);font-size:22px;font-weight:700}
.d-ambacht .z-quotes blockquote>p{font-family:"DM Sans",sans-serif;font-size:clamp(18px,1.5vw,22px)}
.d-ambacht .am-foot{background:var(--navy-2);color:rgba(255,255,255,.75)}
.d-ambacht .am-band{background:var(--orange);color:#fff}
.d-ambacht .am-band .am-wrap{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px 32px;padding-block:clamp(28px,4vw,44px)}
.d-ambacht .am-band p{font-family:var(--cond);font-size:clamp(28px,3.4vw,46px);font-weight:700;line-height:1;text-transform:uppercase}
.d-ambacht .am-band .btn{background:var(--navy);color:#fff}
.d-ambacht .am-band .btn:hover{background:var(--navy-3)}
.d-ambacht .am-foot-grid{display:grid;gap:36px;padding-block:clamp(56px,7vw,96px) 0;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-ambacht .am-foot-grid h3{margin-bottom:14px;font-size:20px;color:#fff}
.d-ambacht .am-foot-grid a,.d-ambacht .am-foot-grid span{display:block;padding:4px 0}
.d-ambacht .am-foot-grid a:hover{color:#ffb27f}
.d-ambacht .am-foot .am-logo span{color:#fff}
.d-ambacht .am-foot .am-logo i{background:var(--orange)}
.d-ambacht .am-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;padding:22px 0 130px;border-top:1px solid rgba(255,255,255,.12);font-size:13px}
`
  .replace(/\n/g, "")
  .trim();

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="am-kick" data-rv>
    {children}
  </p>
);

function Head({ kicker, title, intro, id }: { kicker?: string; title: string; intro?: string; id?: string }) {
  return (
    <header className="am-head">
      {kicker ? <Kick>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

const Logo = ({ c }: { c: Ctx }) => (
  <a href="#top" className="am-logo" aria-label={c.name}>
    <i aria-hidden="true">{c.name.charAt(0)}</i>
    <span>{c.name}</span>
  </a>
);

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const open = b.openingHours?.find((l) => !/gesloten|closed|ferm[ée]|geschlossen/i.test(l));
  return (
    <>
      <header className="am-hdr hdr">
      <div className="am-top">
        <div className="am-wrap">
          {b.city ? (
            <span>
              <Icon name="map" />
              {b.city}
            </span>
          ) : null}
          {open ? (
            <span>
              <Icon name="clock" />
              {open}
            </span>
          ) : null}
          {b.phone ? (
            <a href={tel(b.phone)}>
              <Icon name="phone" />
              {b.phone}
            </a>
          ) : null}
        </div>
      </div>
        <div className="am-wrap am-bar">
          <Logo c={c} />
          <nav aria-label={c.t.menu} className="am-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn am-fill am-cta">
            {cta.label}
          </a>
          {b.phone ? (
            <a href={tel(b.phone)} className="am-call" aria-label={`${c.t.phone}: ${b.phone}`}>
              <Icon name="phone" />
            </a>
          ) : null}
          <button type="button" className="am-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="am-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href={cta.href} className="btn am-fill">
          {cta.label}
        </a>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 44 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const facts = heroFacts(c);
  // Without a photograph the right column shows the business's own services as tiles.
  const services = c.spec.sections.flatMap((s) => (s.type === "services" ? s.items.slice(0, 4).map((it) => ({ title: it.title, icon: it.icon })) : []));
  return (
    <>
      <section className="am-hero">
        <div className="am-wrap am-hero-grid">
          <div>
            {hero.eyebrow ? <Kick>{hero.eyebrow}</Kick> : null}
            <h1 className={size} data-rv style={i(1)}>
              {em(hero.headline)}
            </h1>
            <p className="am-lede" data-rv style={i(2)}>
              {hero.subheadline}
            </p>
            <div className="am-cta-row" data-rv style={i(3)}>
              <Btn c={c} href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </Btn>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                  {/^tel:/.test(hero.secondaryCta.href) ? <Icon name="phone" /> : null}
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
            </div>
          </div>
          {p ? (
            <figure className="am-hero-pic" data-rv style={i(2)}>
              <Pic p={p} eager sizes="(min-width: 980px) 44vw, 92vw" />
            </figure>
          ) : services.length >= 2 ? (
            <ul className="am-tiles" data-rv style={i(2)}>
              {services.map((s) => (
                <li key={s.title}>
                  <Icon name={s.icon} />
                  {s.title}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
      {facts.length > 0 && (
        <div className="am-wrap">
          <dl className="am-facts" style={{ ["--n" as string]: facts.length }}>
            {facts.map((f, n) => (
              <div key={f.label} data-rv style={i(n)}>
                <span aria-hidden="true">
                  <Icon name={f.label === c.t.address ? "map" : f.label === c.t.hours ? "clock" : f.label === c.t.phone ? "phone" : "check"} />
                </span>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="am-foot">
      <div className="am-band">
        <div className="am-wrap">
          <p>{b.phone ? b.phone : cta.label}</p>
          <a href={b.phone ? tel(b.phone) : cta.href} className="btn">
            {b.phone ? <Icon name="phone" /> : null}
            {b.phone ? (c.spec.hero.secondaryCta && /^tel:/.test(c.spec.hero.secondaryCta.href) ? c.spec.hero.secondaryCta.label : c.t.phone) : cta.label}
          </a>
        </div>
      </div>
      <div className="am-wrap">
        <div className="am-foot-grid">
          <div>
            <Logo c={c} />
            {c.spec.footer.blurb ? <p style={{ marginTop: 18 }}>{c.spec.footer.blurb}</p> : null}
          </div>
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
        </div>
        <Legal c={c} className="am-legal" />
      </div>
    </footer>
  );
}

export const ambacht: Family = {
  key: "ambacht",
  root: "d-ambacht",
  fonts: ["Barlow Condensed", "DM Sans"],
  themeColor: "#ffffff",
  accent: "#f26a1b",
  onAccent: "#ffffff",
  css: CSS,
  extra: "",
  cls: { wrap: "am-wrap", eyebrow: "am-kick", btn: "am-fill", btnAlt: "am-line", btnText: "am-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="am-sec" id={s.id}>
          <div className={`am-wrap am-about${p ? "" : " is-solo"}`}>
            <div className="am-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="am-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="am-checks" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>
                      <span aria-hidden="true">
                        <Icon name="check" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {p ? (
              <div className="am-about-pic" data-rv>
                <figure>
                  <Pic p={p} sizes="(min-width: 960px) 40vw, 92vw" />
                </figure>
                {c.spec.business.city ? (
                  <p className="am-badge">
                    <Icon name="map" />
                    {c.spec.business.city}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => (
      <section className="am-sec is-mist" id={s.id}>
        <div className="am-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
          <ul className="am-cards">
            {s.items.map((it, n) => {
              const p = c.photo(`art:svc${n}`);
              return (
                <li key={n} className="am-card" data-rv style={i(n % 3)}>
                  {p ? (
                    <figure className="z-pic" style={{ aspectRatio: "16/10", margin: "-8px -8px 4px" }}>
                      <Pic p={p} sizes="(min-width: 900px) 30vw, 92vw" />
                    </figure>
                  ) : (
                    <span className="am-ico" aria-hidden="true">
                      <Icon name={it.icon} />
                    </span>
                  )}
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                  {it.price || it.duration ? (
                    <p className="am-meta">
                      {it.price ? <span>{it.price}</span> : null}
                      {it.duration ? <span>{it.duration}</span> : null}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    process: (s, c) => (
      <section className="am-sec" id={s.id}>
        <div className="am-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <ol className="am-steps" style={{ ["--n" as string]: s.steps.length }}>
            {s.steps.map((st, n) => (
              <li key={n} data-rv style={i(n)}>
                <b>{n + 1}</b>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    features: (s, c) => (
      <section className="am-sec is-navy" id={s.id}>
        <div className="am-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="am-why">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span aria-hidden="true">
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
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="am-sec" id={s.id}>
          <div className="am-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className={`z-gal z-gal-${Math.min(6, pics.length)}`}>
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
    booking: (s, c) => {
      const b = c.spec.business;
      return (
        <section className="am-sec is-mist" id={s.id}>
          <div className="am-wrap am-quote">
            <div className="am-quote-copy">
              <Head kicker={c.t.kick.booking} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Hours c={c} />
              <Reach c={c} />
            </div>
            <div className="am-quote-card" data-rv>
              <header>
                <p>{c.t.submit[s.kind]}</p>
                {b.phone ? (
                  <a href={tel(b.phone)}>
                    <Icon name="phone" />
                    {b.phone}
                  </a>
                ) : null}
              </header>
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
            </div>
          </div>
        </section>
      );
    },
  },
};
