import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Zondag: an original template (no portfolio demo). Soft and friendly: warm paper, cocoa,
 * butter yellow and sage, an italic serif with a handwritten note, arched photographs and a
 * menu laid out in coloured panels. Made for bakeries, coffee bars, lunchrooms, ice-cream
 * parlours, florists and small shops where people drop in.
 */

const CSS = `
.d-zondag{--paper:#fbf4ea;--oat:#f3e7d6;--cream:#fffdf8;--cocoa:#3a2a20;--cocoa-2:#5b4537;--dim:#7a6556;--butter:#f4c95d;--honey:#e2a93b;--sage:#a9bfa3;--sage-d:#5f7a59;--blush:#f2cdbd;--line:rgba(58,42,32,.14);--pad:clamp(18px,4.8vw,72px);--ease:cubic-bezier(.22,.72,.2,1);--serif:"Lora",Georgia,serif;--hand:"Caveat","Comic Sans MS",cursive;--z-bg2:var(--oat);--z-ink:var(--cocoa);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--sage-d);--z-on-accent:#fffdf8;--z-display:var(--serif);--z-radius:28px;--z-field-radius:14px;--z-ico-radius:50%;--z-h3:clamp(21px,1.7vw,26px);--z-statement:clamp(30px,4.2vw,62px);background:var(--paper);color:var(--cocoa);font-family:"Sora",system-ui,sans-serif;font-weight:300;font-size:clamp(16px,1.02vw,17.5px);line-height:1.7}
.d-zondag h1,.d-zondag h2,.d-zondag h3{font-family:var(--serif);font-weight:500;line-height:1.08;letter-spacing:-.015em}
.d-zondag h1 em,.d-zondag h2 em{font-style:italic;font-weight:400;color:var(--sage-d)}
.d-zondag h2{font-size:clamp(36px,4.6vw,68px)}
.d-zondag h2.is-long{font-size:clamp(30px,3.4vw,50px)}
.d-zondag .zo-wrap{width:min(100%,1280px);margin-inline:auto;padding-inline:var(--pad)}
.d-zondag .zo-kick{font-family:var(--hand);font-size:clamp(24px,2vw,30px);font-weight:500;line-height:1;color:var(--honey);transform:rotate(-2deg);transform-origin:left}
.d-zondag .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 28px;border-radius:999px;font-weight:500;font-size:15.5px;transition:background-color .25s,color .25s,transform .25s var(--ease)}
.d-zondag .zo-fill{background:var(--cocoa);color:var(--cream)}
.d-zondag .zo-fill:hover{background:var(--sage-d);transform:translateY(-2px)}
.d-zondag .zo-line{background:var(--butter);color:var(--cocoa)}
.d-zondag .zo-line:hover{background:var(--honey)}
.d-zondag .zo-text{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:500;border-bottom:1.5px solid currentColor}
.d-zondag .zo-hdr{position:sticky;top:0;z-index:40;background:rgba(251,244,234,.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:box-shadow .3s}
.d-zondag.is-scrolled .zo-hdr{box-shadow:0 1px 0 var(--line)}
.d-zondag .zo-bar{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:20px;height:82px}
.d-zondag .zo-logo{display:flex;align-items:center;gap:12px;min-width:0;font-family:var(--serif);font-size:clamp(22px,1.9vw,28px);font-style:italic;line-height:1}
.d-zondag .zo-logo i{display:grid;flex:none;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--butter);font-style:normal;font-size:20px}
.d-zondag .zo-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-zondag .zo-links{display:none;gap:6px}
.d-zondag .zo-links a{padding:8px 16px;border-radius:999px;font-weight:400;transition:background-color .2s}
.d-zondag .zo-links a:hover{background:var(--oat)}
.d-zondag .zo-cta{display:none;min-height:46px}
.d-zondag .zo-burger{display:flex;align-items:center;gap:10px;min-height:46px;padding:0 18px;border:0;border-radius:999px;background:var(--oat);font-weight:500}
.d-zondag .zo-burger i{display:grid;gap:5px;width:18px}
.d-zondag .zo-burger i::before,.d-zondag .zo-burger i::after{content:"";height:1.5px;border-radius:2px;background:currentColor;transition:transform .3s var(--ease)}
.d-zondag.menu-open .zo-burger i::before{transform:translateY(3.25px) rotate(45deg)}
.d-zondag.menu-open .zo-burger i::after{transform:translateY(-3.25px) rotate(-45deg)}
@media (min-width:1020px){.d-zondag .zo-bar{grid-template-columns:minmax(0,1fr) auto auto}.d-zondag .zo-links,.d-zondag .zo-cta{display:inline-flex}.d-zondag .zo-burger{display:none}}
.d-zondag .zo-menu{position:fixed;inset:82px 0 0;z-index:39;display:flex;flex-direction:column;gap:30px;padding:24px var(--pad) 110px;background:var(--butter);overflow-y:auto;border-radius:28px 28px 0 0;transform:translateY(100%);visibility:hidden;transition:transform .5s var(--ease),visibility 0s .5s}
.d-zondag .zo-menu.is-open{transform:none;visibility:visible;transition:transform .5s var(--ease)}
.d-zondag .zo-menu nav{display:grid;gap:2px}
.d-zondag .zo-menu nav a{display:flex;align-items:center;min-height:56px;font-family:var(--serif);font-size:clamp(32px,8vw,52px);font-style:italic;line-height:1.1}
.d-zondag .zo-menu p a{display:inline-flex;align-items:center;min-height:40px;text-decoration:underline;text-underline-offset:4px}
.d-zondag .zo-hero{position:relative;padding:clamp(24px,4vw,64px) 0 clamp(64px,8vw,120px);overflow:hidden}
.d-zondag .zo-hero-grid{display:grid;gap:clamp(40px,5vw,80px);align-items:center}
@media (min-width:940px){.d-zondag .zo-hero-grid{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}}
.d-zondag .zo-hero h1{margin-top:16px;font-size:clamp(46px,6.6vw,100px);line-height:1.02}
.d-zondag .zo-hero h1.is-m{font-size:clamp(40px,5.2vw,78px)}
.d-zondag .zo-hero h1.is-s{font-size:clamp(34px,4.2vw,60px)}
.d-zondag .zo-lede{max-width:46ch;margin-top:24px;font-size:clamp(17px,1.3vw,20px);color:var(--cocoa-2)}
.d-zondag .zo-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px 22px;margin-top:32px}
.d-zondag .zo-facts{display:flex;flex-wrap:wrap;gap:10px;margin-top:36px}
.d-zondag .zo-facts div{display:flex;align-items:center;gap:10px;padding:10px 16px 10px 10px;border-radius:999px;background:var(--cream);box-shadow:0 1px 0 var(--line)}
.d-zondag .zo-facts span{display:grid;flex:none;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--oat);color:var(--sage-d)}
.d-zondag .zo-facts svg{width:16px;height:16px}
.d-zondag .zo-facts dt{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.d-zondag .zo-facts dd{margin:0;font-size:14.5px;font-weight:400}
.d-zondag .zo-art{position:relative;justify-self:center;width:min(100%,520px)}
.d-zondag .zo-sun{position:absolute;right:-8%;top:-6%;width:46%;aspect-ratio:1;border-radius:50%;background:var(--butter)}
.d-zondag .zo-arch{position:relative;aspect-ratio:4/5;overflow:hidden;border-radius:999px 999px 28px 28px;background:var(--sage)}
.d-zondag .zo-arch img{width:100%;height:100%;object-fit:cover}
.d-zondag .zo-arch.is-empty{display:grid;place-items:center}
.d-zondag .zo-arch.is-empty span{font-family:var(--serif);font-size:clamp(140px,20vw,260px);font-style:italic;line-height:1;color:var(--cream)}
.d-zondag .zo-note{position:absolute;left:-6%;bottom:9%;max-width:220px;padding:14px 20px;border-radius:18px;background:var(--cream);box-shadow:0 18px 40px -24px rgba(58,42,32,.5);font-family:var(--hand);font-size:clamp(22px,2vw,28px);line-height:1.05;color:var(--cocoa);transform:rotate(-4deg)}
.d-zondag .zo-small{position:absolute;right:-4%;bottom:-6%;width:34%;aspect-ratio:1;overflow:hidden;border:8px solid var(--paper);border-radius:50%}
.d-zondag .zo-small img{width:100%;height:100%;object-fit:cover}
.d-zondag .zo-sec{padding-block:clamp(72px,9vw,140px)}
.d-zondag .zo-sec.is-oat{background:var(--oat)}
.d-zondag .zo-sec.is-cocoa{background:var(--cocoa);color:var(--paper)}
.d-zondag .is-cocoa h2 em{color:var(--butter)}
.d-zondag .zo-head{display:grid;gap:14px;max-width:760px;margin-bottom:clamp(36px,5vw,64px)}
.d-zondag .zo-head.is-center{justify-items:center;margin-inline:auto;text-align:center}
.d-zondag .zo-head>p:not(.zo-kick){max-width:54ch;color:var(--dim)}
.d-zondag .is-cocoa .zo-head>p:not(.zo-kick){color:rgba(251,244,234,.72)}
.d-zondag .zo-about{display:grid;gap:clamp(40px,5vw,84px);align-items:center}
@media (min-width:920px){.d-zondag .zo-about{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)}.d-zondag .zo-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:860px;margin-inline:auto;text-align:center}}
.d-zondag .zo-about-pics{position:relative;padding:0 10% 12% 0}
.d-zondag .zo-about-pics figure:first-child{aspect-ratio:4/5;overflow:hidden;border-radius:28px}
.d-zondag .zo-about-pics figure:nth-child(2){position:absolute;right:0;bottom:0;width:46%;aspect-ratio:1;overflow:hidden;border:8px solid var(--paper);border-radius:50%}
.d-zondag .zo-about-pics img{width:100%;height:100%;object-fit:cover}
.d-zondag .zo-about-copy{display:grid;gap:20px}
.d-zondag .zo-about-copy .zo-lead{font-family:var(--serif);font-size:clamp(21px,1.8vw,27px);font-style:italic;line-height:1.45;color:var(--cocoa)}
.d-zondag .zo-about-copy p{color:var(--dim)}
.d-zondag .zo-pills{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}
.d-zondag .is-solo .zo-pills{justify-content:center}
.d-zondag .zo-pills li{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;background:var(--oat);font-weight:400;font-size:15px}
.d-zondag .zo-pills li::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--honey)}
.d-zondag .zo-panels{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}
.d-zondag .zo-panel{display:grid;gap:16px;align-content:start;padding:clamp(26px,3vw,40px);border-radius:28px;background:var(--cream)}
.d-zondag .zo-panel:nth-child(4n+1){background:#fbe7a8}
.d-zondag .zo-panel:nth-child(4n+2){background:#dfe8da}
.d-zondag .zo-panel:nth-child(4n+3){background:#f8e0d4}
.d-zondag .zo-panel:nth-child(4n+4){background:var(--cream)}
.d-zondag .zo-panel>h3{font-size:clamp(26px,2.2vw,34px);font-style:italic;font-weight:400}
.d-zondag .zo-items{display:grid;gap:14px}
.d-zondag .zo-item{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 16px;align-items:baseline;padding-bottom:14px;border-bottom:1px dashed rgba(58,42,32,.22)}
.d-zondag .zo-item:last-child{border-bottom:0;padding-bottom:0}
.d-zondag .zo-item b{font-weight:500}
.d-zondag .zo-item span{font-family:var(--serif);font-size:1.08em;font-weight:500;white-space:nowrap}
.d-zondag .zo-item p{grid-column:1/-1;font-size:.93em;color:var(--cocoa-2)}
.d-zondag .zo-item small{grid-column:1/-1;font-family:var(--hand);font-size:20px;line-height:1;color:var(--sage-d)}
.d-zondag .zo-cards{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-zondag .zo-card{display:grid;gap:12px;align-content:start;padding:clamp(24px,2.6vw,34px);border-radius:28px;background:var(--cream);transition:transform .3s var(--ease)}
.d-zondag .zo-card:hover{transform:rotate(-1deg) translateY(-4px)}
.d-zondag .zo-card .zo-ico{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:var(--butter);color:var(--cocoa)}
.d-zondag .zo-card .zo-ico svg{width:24px;height:24px}
.d-zondag .zo-card p{color:var(--dim)}
.d-zondag .is-cocoa .zo-card{background:rgba(251,244,234,.07);color:var(--paper)}
.d-zondag .is-cocoa .zo-card p{color:rgba(251,244,234,.72)}
.d-zondag .zo-card .zo-meta{font-family:var(--serif);font-weight:500;color:var(--sage-d)}
.d-zondag .zo-pola{display:grid;gap:clamp(16px,2.4vw,32px);grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:900px){.d-zondag .zo-pola{grid-template-columns:repeat(3,minmax(0,1fr))}}
.d-zondag .zo-pola figure{padding:12px 12px 44px;background:#fff;box-shadow:0 18px 36px -26px rgba(58,42,32,.55);transform:rotate(var(--r,0deg))}
.d-zondag .zo-pola figure:nth-child(4n+1){--r:-2deg}.d-zondag .zo-pola figure:nth-child(4n+2){--r:1.5deg}.d-zondag .zo-pola figure:nth-child(4n+3){--r:-.8deg}.d-zondag .zo-pola figure:nth-child(4n+4){--r:2.2deg}
.d-zondag .zo-pola figure.in{transform:rotate(var(--r,0deg))}
.d-zondag .zo-pola div{aspect-ratio:1;overflow:hidden}
.d-zondag .zo-pola img{width:100%;height:100%;object-fit:cover}
.d-zondag .zo-board{display:grid;gap:clamp(36px,5vw,72px);align-items:start}
@media (min-width:940px){.d-zondag .zo-board{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-zondag .zo-board-copy{display:grid;gap:22px}
.d-zondag .zo-board-copy>p{color:var(--dim)}
.d-zondag .zo-form{padding:clamp(24px,3.2vw,44px);border-radius:28px;background:var(--cream)}
.d-zondag .zo-hours{padding:clamp(24px,3vw,40px);border-radius:28px;background:var(--cocoa);color:var(--paper)}
.d-zondag .zo-hours h3{margin-bottom:12px;font-family:var(--hand);font-size:34px;font-weight:500;color:var(--butter)}
.d-zondag .zo-hours .z-hours{border-color:rgba(251,244,234,.2)}
.d-zondag .zo-hours .z-hours div{border-color:rgba(251,244,234,.2)}
.d-zondag .zo-hours .z-hours dd{color:var(--butter)}
.d-zondag .z-field label,.d-zondag .z-chipset legend{font-size:12px;letter-spacing:.06em;text-transform:none;color:var(--dim)}
.d-zondag .z-field input,.d-zondag .z-field select,.d-zondag .z-field textarea{border:1px solid rgba(58,42,32,.2);background:#fff}
.d-zondag .z-field :focus-visible{outline:3px solid rgba(244,201,93,.7);outline-offset:1px}
.d-zondag .z-chips button{border-radius:999px}
.d-zondag .z-sec.z-cta{background:var(--butter)}
.d-zondag .z-card,.d-zondag .z-panel{background:var(--cream);border:0}
.d-zondag .z-acc summary{font-family:var(--serif);font-size:clamp(20px,1.7vw,25px);font-weight:500}
.d-zondag .z-pic{border-radius:24px}
.d-zondag .z-statement h2{font-style:italic;font-weight:400}
.d-zondag .z-quotes blockquote{padding:28px;border:0;border-radius:28px;background:var(--cream)}
.d-zondag .z-quotes blockquote>p{font-style:italic}
.d-zondag .z-steps small,.d-zondag .z-rows small{font-family:var(--hand);font-size:28px;letter-spacing:0;color:var(--honey)}
.d-zondag .zo-foot{position:relative;padding:clamp(72px,9vw,130px) 0 140px;background:var(--cocoa);color:rgba(251,244,234,.8);border-radius:40px 40px 0 0}
.d-zondag .zo-foot-top{display:grid;gap:18px;justify-items:start}
.d-zondag .zo-foot-top p:first-child{font-family:var(--hand);font-size:clamp(28px,2.6vw,38px);line-height:1;color:var(--butter)}
.d-zondag .zo-foot-name{font-family:var(--serif);font-size:min(13vw,150px,calc(170vw / var(--n,8)));font-style:italic;line-height:1;color:var(--paper);word-break:break-word}
.d-zondag .zo-foot-grid{display:grid;gap:32px;margin-top:clamp(44px,6vw,80px);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-zondag .zo-foot-grid h3{margin-bottom:12px;font-family:"Sora",sans-serif;font-size:13px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--butter)}
.d-zondag .zo-foot-grid a,.d-zondag .zo-foot-grid span{display:block;padding:4px 0}
.d-zondag .zo-foot-grid a:hover{color:var(--butter)}
.d-zondag .zo-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:52px;padding-top:22px;border-top:1px solid rgba(251,244,234,.16);font-size:13px}
`
  .replace(/\n/g, "")
  .trim();

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="zo-kick" data-rv>
    {children}
  </p>
);

function Head({ kicker, title, intro, id, center }: { kicker?: string; title: string; intro?: string; id?: string; center?: boolean }) {
  return (
    <header className={`zo-head${center ? " is-center" : ""}`}>
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
      <header className="zo-hdr hdr">
        <div className="zo-wrap zo-bar">
          <a href="#top" className="zo-logo" aria-label={c.name}>
            <i aria-hidden="true">{c.name.charAt(0)}</i>
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="zo-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn zo-fill zo-cta">
            {cta.label}
          </a>
          <button type="button" className="zo-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="zo-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
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
  const small = p ? c.spare() : null;
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 44 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const facts = heroFacts(c);
  // The handwritten note is the business's own short line, or the first thing it makes.
  const note = hero.note || offerWords(c, 1)[0];
  const icon = (label: string) => (label === c.t.address ? "map" : label === c.t.hours ? "clock" : "phone");
  return (
    <section className="zo-hero">
      <div className="zo-wrap zo-hero-grid">
        <div>
          {hero.eyebrow ? <Kick>{hero.eyebrow}</Kick> : null}
          <h1 className={size} data-rv style={i(1)}>
            {em(hero.headline)}
          </h1>
          <p className="zo-lede" data-rv style={i(2)}>
            {hero.subheadline}
          </p>
          <div className="zo-cta-row" data-rv style={i(3)}>
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
          {facts.length > 0 && (
            <dl className="zo-facts" data-rv style={i(4)}>
              {facts.map((f) => (
                <div key={f.label}>
                  <span aria-hidden="true">
                    <Icon name={icon(f.label)} />
                  </span>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="zo-art" data-rv style={i(2)}>
          <span className="zo-sun" aria-hidden="true" />
          {p ? (
            <figure className="zo-arch">
              <Pic p={p} eager sizes="(min-width: 940px) 40vw, 92vw" />
            </figure>
          ) : (
            <div className="zo-arch is-empty" aria-hidden="true">
              <span>{c.name.charAt(0)}</span>
            </div>
          )}
          {small ? (
            <figure className="zo-small">
              <Pic p={small} sizes="180px" />
            </figure>
          ) : null}
          {note ? (
            <p className="zo-note" aria-hidden="true">
              {note}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  return (
    <footer className="zo-foot">
      <div className="zo-wrap">
        <div className="zo-foot-top">
          {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
          <p className="zo-foot-name" aria-hidden="true" style={{ ["--n" as string]: Math.max(6, c.name.length) }}>
            {c.name}
          </p>
        </div>
        <div className="zo-foot-grid">
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
        <Legal c={c} className="zo-legal" />
      </div>
    </footer>
  );
}

export const zondag: Family = {
  key: "zondag",
  root: "d-zondag",
  fonts: ["Lora", "Sora", "Caveat"],
  themeColor: "#fbf4ea",
  accent: "#f4c95d",
  onAccent: "#3a2a20",
  css: CSS,
  extra: "",
  cls: { wrap: "zo-wrap", eyebrow: "zo-kick", btn: "zo-fill", btnAlt: "zo-line", btnText: "zo-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const a = c.photo(s.image);
      const b = a ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="zo-sec" id={s.id}>
          <div className={`zo-wrap zo-about${a ? "" : " is-solo"}`}>
            {a ? (
              <div className="zo-about-pics" data-rv>
                <figure>
                  <Pic p={a} sizes="(min-width: 920px) 40vw, 90vw" />
                </figure>
                {b ? (
                  <figure>
                    <Pic p={b} sizes="(min-width: 920px) 18vw, 40vw" />
                  </figure>
                ) : null}
              </div>
            ) : null}
            <div className="zo-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} center={!a} />
              <p className="zo-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="zo-pills" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="zo-sec is-oat" id={s.id}>
          <div className="zo-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} center />
            <div className="zo-panels">
              {cats.map((cat, n) => (
                <article key={n} className="zo-panel" data-rv style={i(n % 3)}>
                  <h3>{cat.name}</h3>
                  <ul className="zo-items">
                    {cat.items.map((d, m) => (
                      <li key={m} className="zo-item">
                        <b>{d.name}</b>
                        {d.price ? <span>{d.price}</span> : <span />}
                        {d.description ? <p>{d.description}</p> : null}
                        {d.tags?.length ? <small>{d.tags.join(" · ")}</small> : null}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            {s.note ? (
              <p className="z-note" data-rv style={{ textAlign: "center" }}>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => (
      <section className="zo-sec is-oat" id={s.id}>
        <div className="zo-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} center />
          <ul className="zo-cards">
            {s.items.map((it, n) => (
              <li key={n} className="zo-card" data-rv style={i(n % 3)}>
                <span className="zo-ico" aria-hidden="true">
                  <Icon name={it.icon} />
                </span>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
                {it.price || it.duration ? <p className="zo-meta">{[it.price, it.duration].filter(Boolean).join(" · ")}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    features: (s, c) => (
      <section className="zo-sec is-cocoa" id={s.id}>
        <div className="zo-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} center />
          <ul className="zo-cards">
            {s.items.map((it, n) => (
              <li key={n} className="zo-card" data-rv style={i(n % 3)}>
                <span className="zo-ico" aria-hidden="true">
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
        <section className="zo-sec" id={s.id}>
          <div className="zo-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} center />
            <div className="zo-pola">
              {pics.slice(0, 6).map((p, n) => (
                <figure key={n} data-rv style={i(n % 3)}>
                  <div>
                    <Pic p={p} sizes="(min-width: 900px) 30vw, 46vw" />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="zo-sec" id={s.id}>
        <div className="zo-wrap zo-board">
          <div className="zo-board-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          {c.spec.business.openingHours?.length ? (
            <div className="zo-hours" data-rv>
              <h3>{c.t.hours}</h3>
              <Hours c={c} />
            </div>
          ) : null}
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="zo-sec is-oat" id={s.id}>
        <div className="zo-wrap zo-board">
          <div className="zo-board-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
          </div>
          <div className="zo-form" data-rv>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
          </div>
        </div>
      </section>
    ),
  },
};
