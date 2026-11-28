import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Brasa: an original template (no portfolio demo). Casual food with an appetite: warm cream,
 * tomato red, basil green and mustard, a chunky slab serif, cards with a hard offset shadow
 * and a menu set like a price board with dotted leaders. Made for pizzerias, burger and
 * street-food places, snack bars, food trucks and other places where you just walk in.
 */

const CSS = `
.d-brasa{--cream:#f7efe2;--paper:#fffaf1;--tomato:#d9381e;--tomato-d:#b72c15;--basil:#1f4d36;--mustard:#f2b33d;--ink:#1d1712;--dim:#5e5349;--line:rgba(29,23,18,.16);--edge:2px solid var(--ink);--lift:5px 5px 0 var(--ink);--pad:clamp(18px,4.6vw,64px);--ease:cubic-bezier(.2,.75,.25,1);--z-bg2:var(--paper);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--tomato);--z-on-accent:#fffaf1;--z-display:"Alfa Slab One",Georgia,serif;--z-radius:18px;--z-field-radius:12px;--z-ico-radius:12px;--z-h3:clamp(20px,1.7vw,25px);--z-statement:clamp(30px,4.4vw,66px);background:var(--cream);color:var(--ink);font-family:"Rubik",system-ui,sans-serif;font-size:clamp(16px,1.05vw,18px);line-height:1.6}
.d-brasa h1,.d-brasa h2,.d-brasa h3{font-family:"Alfa Slab One",Georgia,serif;font-weight:400;line-height:1.02;letter-spacing:-.01em}
.d-brasa h2{font-size:clamp(34px,5vw,72px)}
.d-brasa h2.is-long{font-size:clamp(28px,3.6vw,52px);line-height:1.08}
.d-brasa h2 em,.d-brasa h1 em{font-style:normal;color:var(--tomato)}
.d-brasa .br-wrap{width:min(100%,1320px);margin-inline:auto;padding-inline:var(--pad)}
.d-brasa .br-kick{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--tomato)}
.d-brasa .br-kick::before{content:"";width:10px;height:10px;border-radius:50%;background:currentColor}
.d-brasa .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 26px;border:var(--edge);border-radius:999px;font-weight:600;font-size:16px;transition:transform .2s var(--ease),box-shadow .2s var(--ease),background-color .2s}
.d-brasa .br-fill{background:var(--tomato);color:#fffaf1;box-shadow:4px 4px 0 var(--ink)}
.d-brasa .br-fill:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--ink)}
.d-brasa .br-line{background:var(--paper);color:var(--ink)}
.d-brasa .br-line:hover{background:var(--mustard)}
.d-brasa .br-text{font-weight:600;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:5px}
.d-brasa .br-hdr{position:sticky;top:0;z-index:40;background:rgba(247,239,226,.94);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:2px solid transparent;transition:border-color .3s}
.d-brasa.is-scrolled .br-hdr{border-color:var(--ink)}
.d-brasa .br-bar{display:flex;align-items:center;gap:24px;height:76px}
.d-brasa .br-logo{display:flex;align-items:center;gap:10px;min-width:0;font-family:"Alfa Slab One",Georgia,serif;font-size:22px;line-height:1}
.d-brasa .br-logo i{display:grid;flex:none;place-items:center;width:40px;height:40px;border:var(--edge);border-radius:50%;background:var(--mustard);font-style:normal;font-size:18px}
.d-brasa .br-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-brasa .br-links{display:none;gap:26px;margin-left:auto;font-weight:500}
.d-brasa .br-links a{position:relative;padding:6px 0}
.d-brasa .br-links a::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--tomato);transform:scaleX(0);transform-origin:left;transition:transform .25s var(--ease)}
.d-brasa .br-links a:hover::after{transform:none}
.d-brasa .br-cta{display:none;min-height:46px;padding:0 20px}
.d-brasa .br-burger{display:flex;align-items:center;gap:10px;margin-left:auto;min-height:46px;padding:0 18px;border:var(--edge);border-radius:999px;background:var(--paper);font-weight:600}
.d-brasa .br-burger i{position:relative;width:18px;height:2px;background:currentColor;transition:background-color .2s}
.d-brasa .br-burger i::before,.d-brasa .br-burger i::after{content:"";position:absolute;left:0;width:18px;height:2px;background:currentColor;transition:transform .3s var(--ease)}
.d-brasa .br-burger i::before{top:-6px}.d-brasa .br-burger i::after{top:6px}
.d-brasa.menu-open .br-burger i{background:transparent}
.d-brasa.menu-open .br-burger i::before{transform:translateY(6px) rotate(45deg)}
.d-brasa.menu-open .br-burger i::after{transform:translateY(-6px) rotate(-45deg)}
@media (min-width:980px){.d-brasa .br-links,.d-brasa .br-cta{display:inline-flex}.d-brasa .br-burger{display:none}}
.d-brasa .br-menu{position:fixed;inset:76px 0 0;z-index:39;display:flex;flex-direction:column;gap:28px;padding:28px var(--pad) 110px;background:var(--tomato);color:#fffaf1;overflow-y:auto;opacity:0;visibility:hidden;transform:translateY(-12px);transition:opacity .3s,transform .4s var(--ease),visibility 0s .4s}
.d-brasa .br-menu.is-open{opacity:1;visibility:visible;transform:none;transition:opacity .3s,transform .4s var(--ease)}
.d-brasa .br-menu nav{display:grid;gap:4px}
.d-brasa .br-menu nav a{display:flex;align-items:baseline;gap:14px;min-height:52px;font-family:"Alfa Slab One",Georgia,serif;font-size:clamp(32px,8vw,56px);line-height:1.05}
.d-brasa .br-menu nav small{font-family:"Rubik",sans-serif;font-size:14px;font-weight:600;opacity:.7}
.d-brasa .br-menu p a{display:inline-flex;align-items:center;min-height:40px;text-decoration:underline;text-underline-offset:4px}
.d-brasa .br-hero{position:relative;padding:clamp(28px,5vw,72px) 0 clamp(56px,8vw,120px);overflow:hidden}
.d-brasa .br-hero-grid{display:grid;gap:clamp(36px,5vw,72px);align-items:center}
@media (min-width:960px){.d-brasa .br-hero-grid{grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr)}}
.d-brasa .br-chip{display:inline-flex;align-items:center;gap:8px;margin-bottom:22px;padding:8px 14px;border:var(--edge);border-radius:999px;background:var(--paper);font-size:14px;font-weight:600}
.d-brasa .br-chip b{width:9px;height:9px;border-radius:50%;background:var(--basil)}
.d-brasa .br-hero h1{font-size:clamp(46px,7.4vw,112px);line-height:.96}
.d-brasa .br-hero h1.is-m{font-size:clamp(40px,5.8vw,86px)}
.d-brasa .br-hero h1.is-s{font-size:clamp(34px,4.6vw,66px);line-height:1.02}
.d-brasa .br-lede{max-width:48ch;margin-top:24px;font-size:clamp(17px,1.3vw,20px);color:var(--dim)}
.d-brasa .br-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px 22px;margin-top:32px}
.d-brasa .br-ticket{display:grid;margin-top:40px;border:var(--edge);border-radius:18px;background:var(--paper);box-shadow:var(--lift)}
.d-brasa .br-ticket div{display:grid;gap:2px;padding:14px 18px}
.d-brasa .br-ticket div+div{border-top:2px dashed var(--line)}
.d-brasa .br-ticket dt{font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--tomato)}
.d-brasa .br-ticket dd{margin:0;font-weight:500}
@media (min-width:700px){.d-brasa .br-ticket{grid-auto-flow:column;grid-auto-columns:minmax(0,1fr)}.d-brasa .br-ticket div+div{border-top:0;border-left:2px dashed var(--line)}}
.d-brasa .br-hero-art{position:relative;justify-self:center;width:min(100%,560px)}
.d-brasa .br-hero-pic{position:relative;aspect-ratio:4/5;overflow:hidden;border:var(--edge);border-radius:clamp(28px,4vw,56px);box-shadow:10px 10px 0 var(--ink);transform:rotate(2deg)}
.d-brasa .br-hero-pic img{width:100%;height:100%;object-fit:cover}
.d-brasa .br-blob{position:absolute;inset:8% -6% -6% 10%;z-index:-1;border-radius:46% 54% 42% 58%/52% 44% 56% 48%;background:var(--mustard)}
.d-brasa .br-sticker{position:absolute;left:-14px;bottom:8%;display:grid;place-items:center;width:clamp(112px,12vw,150px);aspect-ratio:1;padding:14px;border:var(--edge);border-radius:50%;background:var(--basil);color:#fffaf1;font-family:"Alfa Slab One",Georgia,serif;font-size:clamp(15px,1.3vw,19px);line-height:1.1;text-align:center;transform:rotate(-10deg)}
.d-brasa .br-plate{display:grid;place-items:center;aspect-ratio:1;border:var(--edge);border-radius:50%;background:var(--tomato);color:#fffaf1;box-shadow:10px 10px 0 var(--ink)}
.d-brasa .br-plate span{font-family:"Alfa Slab One",Georgia,serif;font-size:clamp(120px,20vw,260px);line-height:1}
.d-brasa .br-plate ul{position:absolute;inset:auto 0 -18px;display:flex;flex-wrap:wrap;justify-content:center;gap:8px}
.d-brasa .br-plate li{padding:7px 13px;border:var(--edge);border-radius:999px;background:var(--paper);color:var(--ink);font-size:14px;font-weight:600}
.d-brasa .br-band{overflow:hidden;border-block:var(--edge);background:var(--mustard)}
.d-brasa .br-band p{display:flex;width:max-content;gap:28px;padding:16px 0;font-family:"Alfa Slab One",Georgia,serif;font-size:clamp(20px,2vw,28px);white-space:nowrap;animation:br-run 34s linear infinite}
.d-brasa .br-band span::after{content:"✶";margin-left:28px;color:var(--tomato)}
@keyframes br-run{to{transform:translateX(-50%)}}
.d-brasa .br-sec{padding-block:clamp(72px,9vw,140px)}
.d-brasa .br-sec.is-paper{background:var(--paper);border-block:var(--edge)}
.d-brasa .br-sec.is-basil{background:var(--basil);color:#fffaf1}
.d-brasa .br-sec.is-basil .br-kick{color:var(--mustard)}
.d-brasa .br-sec.is-basil h2 em{color:var(--mustard)}
.d-brasa .br-head{display:grid;gap:16px;max-width:820px;margin-bottom:clamp(36px,5vw,64px)}
.d-brasa .br-head>p:last-child:not(.br-kick){max-width:56ch;color:var(--dim)}
.d-brasa .is-basil .br-head>p:last-child:not(.br-kick){color:rgba(255,250,241,.78)}
.d-brasa .br-about{display:grid;gap:clamp(40px,6vw,88px);align-items:center}
@media (min-width:900px){.d-brasa .br-about{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}.d-brasa .br-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:900px}}
.d-brasa .br-about-pic{position:relative;margin:0 12px 12px 0}
.d-brasa .br-about-pic::before{content:"";position:absolute;inset:18px -12px -12px 18px;border:var(--edge);border-radius:28px;background:var(--tomato)}
.d-brasa .br-about-pic figure{position:relative;aspect-ratio:4/5;overflow:hidden;border:var(--edge);border-radius:28px}
.d-brasa .br-about-pic img{width:100%;height:100%;object-fit:cover}
.d-brasa .br-about-copy{display:grid;gap:20px}
.d-brasa .br-about-copy .br-lead{font-size:clamp(19px,1.6vw,24px);line-height:1.45}
.d-brasa .br-about-copy p{color:var(--dim)}
.d-brasa .br-about-copy .br-lead{color:var(--ink)}
.d-brasa .br-stamps{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}
.d-brasa .br-stamps li{display:inline-flex;align-items:center;gap:8px;padding:9px 15px;border:var(--edge);border-radius:999px;background:var(--paper);font-weight:600;font-size:15px}
.d-brasa .br-stamps svg{width:16px;height:16px;color:var(--basil)}
.d-brasa .br-tabs{display:flex;gap:10px;margin-bottom:34px;overflow-x:auto;scrollbar-width:none;padding:2px 6px 8px 2px}
.d-brasa .br-tabs::-webkit-scrollbar{display:none}
.d-brasa .br-tabs button{flex:none;min-height:48px;padding:0 22px;border:var(--edge);border-radius:999px;background:var(--paper);font-weight:600;white-space:nowrap;transition:background-color .2s,box-shadow .2s,transform .2s}
.d-brasa .br-tabs button[aria-selected="true"]{background:var(--ink);color:var(--paper);box-shadow:4px 4px 0 var(--tomato)}
.d-brasa .br-board{display:grid;gap:8px 56px;padding:clamp(24px,3.4vw,48px);border:var(--edge);border-radius:28px;background:var(--paper);box-shadow:var(--lift)}
.d-brasa .br-board[hidden]{display:none}
@media (min-width:900px){.d-brasa .br-board{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-brasa .br-dish{padding:16px 0;border-bottom:2px dashed var(--line)}
.d-brasa .br-dish-row{display:flex;align-items:baseline;gap:10px}
.d-brasa .br-dish h3{font-size:clamp(19px,1.5vw,23px);line-height:1.15}
.d-brasa .br-dots{flex:1;min-width:16px;border-bottom:3px dotted var(--ink);opacity:.35;transform:translateY(-5px)}
.d-brasa .br-dish b{flex:none;font-family:"Alfa Slab One",Georgia,serif;font-weight:400;font-size:clamp(18px,1.4vw,22px);color:var(--tomato)}
.d-brasa .br-dish p{margin-top:6px;color:var(--dim);font-size:.95em}
.d-brasa .br-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.d-brasa .br-tags span{padding:3px 10px;border-radius:999px;background:var(--mustard);font-size:12px;font-weight:600}
.d-brasa .br-note{margin-top:24px;font-size:14px;color:var(--dim)}
.d-brasa .br-cards{display:grid;gap:22px;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}
.d-brasa .br-card{position:relative;display:grid;gap:14px;align-content:start;padding:clamp(24px,2.6vw,34px);border:var(--edge);border-radius:24px;background:var(--paper);box-shadow:var(--lift);color:var(--ink);transition:transform .25s var(--ease),box-shadow .25s var(--ease)}
.d-brasa .br-card:hover{transform:translate(-3px,-3px);box-shadow:8px 8px 0 var(--ink)}
.d-brasa .br-card:nth-child(3n+2){background:var(--mustard)}
.d-brasa .br-card:nth-child(3n+3){background:#f4d6c7}
.d-brasa .br-card .br-num{font-family:"Alfa Slab One",Georgia,serif;font-size:44px;line-height:1;color:var(--tomato)}
.d-brasa .br-card:nth-child(3n+2) .br-num{color:var(--ink)}
.d-brasa .br-card p{color:var(--dim)}
.d-brasa .br-card .br-meta{display:flex;flex-wrap:wrap;gap:8px 16px;font-weight:600}
.d-brasa .br-card .br-meta b{color:var(--tomato)}
.d-brasa .br-card .br-ico{display:grid;place-items:center;width:52px;height:52px;border:var(--edge);border-radius:14px;background:var(--cream)}
.d-brasa .br-card .br-ico svg{width:24px;height:24px}
.d-brasa .br-card.is-link{cursor:pointer}
.d-brasa .br-pola{display:grid;gap:clamp(14px,2vw,26px);grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:900px){.d-brasa .br-pola{grid-template-columns:repeat(3,minmax(0,1fr))}}
.d-brasa .br-pola figure{padding:10px 10px 0;border:var(--edge);border-radius:16px;background:var(--paper);box-shadow:var(--lift);transform:rotate(var(--r,0deg))}
.d-brasa .br-pola figure:nth-child(3n+1){--r:-1.6deg}.d-brasa .br-pola figure:nth-child(3n+2){--r:1.2deg}.d-brasa .br-pola figure:nth-child(3n){--r:-.6deg}
.d-brasa .br-pola figure.in{transform:rotate(var(--r,0deg))}
.d-brasa .br-pola div{aspect-ratio:1;overflow:hidden;border-radius:10px}
.d-brasa .br-pola img{width:100%;height:100%;object-fit:cover}
.d-brasa .br-pola figure::after{content:"";display:block;height:34px}
.d-brasa .br-book{display:grid;gap:clamp(36px,5vw,72px);align-items:start}
@media (min-width:960px){.d-brasa .br-book{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-brasa .br-book-copy{display:grid;gap:22px}
.d-brasa .br-book-copy>p{color:rgba(255,250,241,.8)}
.d-brasa .br-book .z-hours{border-color:rgba(255,250,241,.24)}
.d-brasa .br-book .z-hours div{border-color:rgba(255,250,241,.24)}
.d-brasa .br-book .z-hours dd{color:var(--mustard)}
.d-brasa .br-book .z-reach,.d-brasa .br-book .z-reach a{color:#fffaf1}
.d-brasa .br-book .z-reach .z-route{color:var(--mustard)}
.d-brasa .br-form{padding:clamp(22px,3vw,40px);border:var(--edge);border-radius:28px;background:var(--paper);box-shadow:8px 8px 0 var(--mustard);color:var(--ink)}
.d-brasa .z-field label,.d-brasa .z-chipset legend{font-size:12px;font-weight:600;letter-spacing:.1em;color:var(--dim)}
.d-brasa .z-field input,.d-brasa .z-field select,.d-brasa .z-field textarea{border:var(--edge);background:#fff;color:var(--ink)}
.d-brasa .z-field :focus-visible{outline:3px solid var(--mustard);outline-offset:1px}
.d-brasa .z-chips button{border:var(--edge);font-family:"Alfa Slab One",Georgia,serif}
.d-brasa .z-chips button[aria-pressed="true"]{background:var(--tomato);color:#fffaf1;border-color:var(--ink)}
.d-brasa .form-status{border:var(--edge);border-radius:12px;background:var(--mustard)}

.d-brasa .z-sec.z-cta{background:var(--tomato);color:#fffaf1}.d-brasa .z-cta .z-center>p{color:rgba(255,250,241,.85)}
.d-brasa .z-cta h2 em{color:var(--mustard)}
.d-brasa .z-cta .br-fill{background:var(--paper);color:var(--ink)}
.d-brasa .z-card,.d-brasa .z-panel,.d-brasa .z-channel{border:var(--edge);box-shadow:var(--lift);background:var(--paper)}
.d-brasa .z-acc details{border-color:var(--ink)}
.d-brasa .z-acc{border-color:var(--ink)}
.d-brasa .z-acc summary{font-family:"Alfa Slab One",Georgia,serif;font-size:clamp(19px,1.6vw,24px)}
.d-brasa .z-pic{border:var(--edge)}
.d-brasa .z-quotes blockquote{padding:26px;border:var(--edge);border-radius:22px;background:var(--paper);box-shadow:var(--lift)}
.d-brasa .z-steps small,.d-brasa .z-rows small{font-family:"Alfa Slab One",Georgia,serif;font-size:22px;letter-spacing:0}
.d-brasa .z-statement h2{font-size:var(--z-statement)}
.d-brasa .br-foot{position:relative;padding:clamp(64px,8vw,110px) 0 140px;background:var(--tomato);color:#fffaf1;border-top:var(--edge);overflow:hidden}
.d-brasa .br-foot-name{font-family:"Alfa Slab One",Georgia,serif;font-size:min(16vw,200px,calc(190vw / var(--n,8)));line-height:.9;letter-spacing:-.02em;color:#fffaf1;word-break:break-word}
.d-brasa .br-foot-grid{display:grid;gap:32px;margin-top:clamp(40px,6vw,80px);grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-brasa .br-foot-grid h3{margin-bottom:12px;font-size:20px;color:var(--mustard)}
.d-brasa .br-foot-grid a,.d-brasa .br-foot-grid span{display:block;padding:4px 0}
.d-brasa .br-foot-grid a{text-decoration:underline;text-decoration-color:rgba(255,250,241,.4);text-underline-offset:4px}
.d-brasa .br-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:48px;padding-top:22px;border-top:2px solid rgba(255,250,241,.3);font-size:13px;opacity:.85}
.d-brasa.no-photos .br-hero{background:radial-gradient(60% 70% at 90% 10%,rgba(242,179,61,.35),transparent 60%)}
`
  .replace(/\n/g, "")
  .trim();

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="br-kick" data-rv>
    {children}
  </p>
);

function Head({ kicker, title, intro, id }: { c?: Ctx; kicker?: string; title: string; intro?: string; id?: string }) {
  return (
    <header className="br-head">
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
      <header className="br-hdr hdr">
        <div className="br-wrap br-bar">
          <a href="#top" className="br-logo" aria-label={c.name}>
            <i aria-hidden="true">{c.name.charAt(0)}</i>
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="br-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn br-fill br-cta">
            {cta.label}
          </a>
          <button type="button" className="br-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="br-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`}>
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
  const size = plain.length > 46 ? "is-s" : plain.length > 26 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const words = offerWords(c, 4);
  // The sticker carries the business's own short note, or the first thing it makes; never a claim.
  const sticker = hero.note || words[0];
  return (
    <section className="br-hero">
      <div className="br-wrap br-hero-grid">
        <div>
          {hero.eyebrow ? (
            <p className="br-chip" data-rv>
              <b aria-hidden="true" />
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className={size} data-rv style={i(1)}>
            {em(hero.headline)}
          </h1>
          <p className="br-lede" data-rv style={i(2)}>
            {hero.subheadline}
          </p>
          <div className="br-cta-row" data-rv style={i(3)}>
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
          {facts.length > 0 && (
            <dl className="br-ticket" data-rv style={i(4)}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="br-hero-art" data-rv style={i(2)}>
          {p ? (
            <>
              <span className="br-blob" aria-hidden="true" />
              <figure className="br-hero-pic">
                <Pic p={p} eager sizes="(min-width: 960px) 42vw, 92vw" />
              </figure>
              {sticker ? (
                <p className="br-sticker" aria-hidden="true">
                  {sticker}
                </p>
              ) : null}
            </>
          ) : (
            <div className="br-plate" aria-hidden="true" style={{ position: "relative" }}>
              <span>{c.name.charAt(0)}</span>
              {words.length > 0 && (
                <ul>
                  {words.slice(0, 3).map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** A running band of what the place makes, from its own menu or services. */
function Band({ c }: { c: Ctx }) {
  const list = offerWords(c);
  if (list.length < 3) return null;
  return (
    <div className="br-band" aria-hidden="true">
      <p>
        {[...list, ...list, ...list].map((w, n) => (
          <span key={n}>{w}</span>
        ))}
      </p>
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  return (
    <footer className="br-foot">
      <div className="br-wrap">
        <p className="br-foot-name" aria-hidden="true" style={{ ["--n" as string]: Math.max(6, c.name.length) }}>
          {c.name}
        </p>
        <div className="br-foot-grid">
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
        <Legal c={c} className="br-legal" />
      </div>
    </footer>
  );
}

export const brasa: Family = {
  key: "brasa",
  root: "d-brasa",
  fonts: ["Alfa Slab One", "Rubik"],
  themeColor: "#f7efe2",
  accent: "#d9381e",
  onAccent: "#fffaf1",
  css: CSS,
  extra: "",
  cls: { wrap: "br-wrap", eyebrow: "br-kick", btn: "br-fill", btnAlt: "br-line", btnText: "br-text" },
  Header,
  Hero,
  Footer,
  Head: (p, c) => <Head c={c} {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <>
          <Band c={c} />
          <section className="br-sec" id={s.id}>
            <div className={`br-wrap br-about${p ? "" : " is-solo"}`}>
              {p ? (
                <div className="br-about-pic" data-rv>
                  <figure>
                    <Pic p={p} sizes="(min-width: 900px) 40vw, 92vw" />
                  </figure>
                </div>
              ) : null}
              <div className="br-about-copy">
                <Head c={c} kicker={c.t.kick.about} title={s.title} />
                <p className="br-lead" data-rv>
                  {first}
                </p>
                {rest.map((x, n) => (
                  <p key={n} data-rv>
                    {x}
                  </p>
                ))}
                {s.highlights.length > 0 && (
                  <ul className="br-stamps" data-rv>
                    {s.highlights.map((h) => (
                      <li key={h}>
                        <Icon name="check" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      const tab = (n: number) => `${s.id}-tab-${n}`;
      return (
        <section className="br-sec is-paper" id={s.id}>
          <div className="br-wrap">
            <Head c={c} kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            {cats.length > 1 && (
              <div className="br-tabs" role="tablist" aria-label={s.title.replace(/\*/g, "")}>
                {cats.map((cat, n) => (
                  <button key={n} type="button" role="tab" id={tab(n)} aria-selected={n === 0} aria-controls={`${s.id}-panel-${n}`} tabIndex={n === 0 ? 0 : -1}>
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
            {cats.map((cat, n) => (
              <div key={n} id={`${s.id}-panel-${n}`} className="br-board" role={cats.length > 1 ? "tabpanel" : undefined} aria-labelledby={cats.length > 1 ? tab(n) : undefined} hidden={n > 0}>
                {cat.items.map((d, m) => (
                  <div key={m} className="br-dish">
                    <div className="br-dish-row">
                      <h3>{d.name}</h3>
                      {d.price ? (
                        <>
                          <span className="br-dots" aria-hidden="true" />
                          <b>{d.price}</b>
                        </>
                      ) : null}
                    </div>
                    {d.description ? <p>{d.description}</p> : null}
                    {d.tags?.length ? (
                      <p className="br-tags">
                        {d.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
            {s.note ? (
              <p className="br-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => (
      <section className="br-sec" id={s.id}>
        <div className="br-wrap">
          <Head c={c} kicker={c.t.kick.services} title={s.title} intro={s.intro} />
          <ol className="br-cards">
            {s.items.map((it, n) => (
              <li key={n} className="br-card" data-rv style={i(n % 3)}>
                <span className="br-num">{String(n + 1).padStart(2, "0")}</span>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
                {it.price || it.duration ? (
                  <p className="br-meta">
                    {it.duration ? <span>{it.duration}</span> : null}
                    {it.price ? <b>{it.price}</b> : null}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    features: (s, c) => (
      <section className="br-sec is-basil" id={s.id}>
        <div className="br-wrap">
          <Head c={c} kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="br-cards">
            {s.items.map((it, n) => (
              <li key={n} className="br-card" data-rv style={i(n % 3)}>
                <span className="br-ico">
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
    order: (s, c) => (
      <section className="br-sec" id={s.id}>
        <div className="br-wrap">
          <Head c={c} kicker={c.t.kick.order} title={s.title} intro={s.body} />
          <ul className="br-cards">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} className="br-card is-link" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="br-ico">
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
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="br-sec is-paper" id={s.id}>
          <div className="br-wrap">
            <Head c={c} kicker={c.t.kick.gallery} title={s.title} />
            <div className="br-pola">
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
    booking: (s, c) => (
      <section className="br-sec is-basil" id={s.id}>
        <div className="br-wrap br-book">
          <div className="br-book-copy">
            <Head c={c} kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Hours c={c} />
            <Reach c={c} />
          </div>
          <div className="br-form" data-rv>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
          </div>
        </div>
      </section>
    ),
  },
};
