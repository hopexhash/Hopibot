import type { ReactNode } from "react";
import { CSS } from "./css/construction";
import { Btn, css, DemoForm, em, heroFacts, hoursRows, i, Icon, Legal, long, offerWords, Pic, tel, type Ctx, type Family, type FormKind, type HeadProps, type Photo } from "./kit";

/**
 * Kade (demo: /demos/construction). A drawing sheet in concrete grey, black and signal yellow:
 * very wide capitals, condensed figures, sheet numbers, crop marks and hazard stripes. Made for
 * builders, roofers, plumbers, electricians and other trades.
 */

const EXTRA = `
.d-kade{--k-sans:"Archivo Wide";--k-narrow:"Archivo Narrow";--fp:clamp(16px,2.4vw,34px);--z-bg2:var(--paper);--z-ink:var(--k);--z-dim:var(--mut);--z-line:var(--line);--z-accent:var(--k);--z-on-accent:var(--y);--z-display:var(--k-narrow),"Arial Narrow",sans-serif;--z-display-weight:700;--z-radius:0;--z-field-radius:0;--z-ico-radius:0;--z-sec:var(--sec);--z-h3:clamp(20px,1.9vw,28px);--z-statement:clamp(25px,3.9vw,64px)}
.d-kade h2{font-size:clamp(27px,max(6vw,min(7.6vw,33px)),100px);overflow-wrap:break-word}
.d-kade h2.is-long{font-size:clamp(23px,max(4vw,min(6.4vw,28px)),64px);line-height:.98}
.d-kade .k-method h2,.d-kade .k-quote h2,.d-kade .z-copy h2{font-size:clamp(27px,max(4.4vw,min(7.6vw,33px)),72px)}
.d-kade .k-method h2.is-long,.d-kade .k-quote h2.is-long,.d-kade .z-copy h2.is-long{font-size:clamp(23px,max(3.2vw,min(6.4vw,28px)),52px)}
.d-kade h3{overflow-wrap:break-word}
.d-kade h1 em,.d-kade h2 em{padding:0 .08em;background:var(--y);font-style:normal;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.d-kade .k-method h2 em,.d-kade .k-call h2 em,.d-kade .z-showcase.has-pic h2 em{padding:0;background:none;color:var(--y)}
.d-kade .k-voices h2 em,.d-kade .z-statement h2 em{background:var(--k);color:var(--y)}
.d-kade main>section+section{border-top:1px solid var(--line)}
.d-kade .k-btn{max-width:100%;padding-block:10px;white-space:normal;text-align:center}
.d-kade .k-link{display:inline-flex;align-items:center;min-height:44px;font-weight:700;background:linear-gradient(var(--y),var(--y)) left 72%/100% .36em no-repeat}
.d-kade .k-head.is-solo{grid-template-columns:minmax(0,1fr)}
.d-kade .k-head>*{min-width:0}
.d-kade .k-tag{max-width:100%}
.d-kade .k-tag span{min-width:0;overflow-wrap:anywhere}
.d-kade .k-logo{min-width:0}
.d-kade .k-logo i{flex:none}
.d-kade .k-logo b{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-kade .k-logo.is-long b{font-size:15px;font-stretch:108%}
.d-kade .k-links{flex:none}
.d-kade .k-links a{white-space:nowrap}
.d-kade .k-nav-tel{flex:none;white-space:nowrap}
.d-kade .k-nav-cta{display:none;white-space:nowrap}
.d-kade .k-nav-cta span{display:block;max-width:24ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-kade.menu-open .k-nav{background:var(--k);color:var(--w)}
.d-kade.menu-open .k-nav-cta{border-color:var(--y)}
.d-kade .k-menu nav span{min-width:0;overflow-wrap:anywhere}
.d-kade .k-menu-foot{display:grid;gap:10px;justify-items:start}
.d-kade .k-menu-foot a.k-btn{min-height:56px;border-color:var(--y);font-family:inherit;font-size:14.5px;font-weight:800;color:var(--k)}
.d-kade .k-menu-foot a.k-btn:hover{color:var(--y)}
@media (min-width:620px){.d-kade .k-nav-cta{display:inline-flex}}
@media (min-width:480px){.d-kade .k-logo.is-long b{font-size:17px}}
@media (min-width:1040px) and (max-width:1239px){.d-kade .k-logo.is-long b{font-size:15px}.d-kade .k-nav-cta span{max-width:16ch}}
.d-kade .k-hero h1{max-width:100%;font-size:min(clamp(40px,12.8vw,84px),calc(86vw / (var(--w,8) * var(--cw))));overflow-wrap:anywhere;--cw:.86}
.d-kade .k-hero h1.is-m{font-size:min(clamp(32px,9.8vw,66px),calc(86vw / (var(--w,8) * var(--cw))))}
.d-kade .k-hero h1.is-s{font-size:min(clamp(27px,7.8vw,54px),calc(86vw / (var(--w,8) * var(--cw))))}
.d-kade .k-ln{max-width:100%}
.d-kade .k-hero-copy{max-width:100%}
.d-kade .k-hero-fig{align-content:start}
.d-kade .k-hero-photo .k-stamp{left:-8px;bottom:18px;max-width:min(78%,15ch);font-size:clamp(20px,2vw,30px);line-height:1;letter-spacing:.01em;text-transform:uppercase}
.d-kade .k-hero-photo.is-plate{display:grid;place-items:center;aspect-ratio:16 / 10;background:var(--y)}
.d-kade .k-hero-photo.is-plate::after{background:var(--k)}
.d-kade .k-plate-mark{font-family:var(--k-narrow),"Arial Narrow",sans-serif;font-size:clamp(130px,42vw,300px);font-weight:700;line-height:.8;letter-spacing:-.03em;animation:k-show .01s .62s both}
.d-kade .k-hero-photo .k-hazard{position:absolute;inset:auto 0 0 0}
.d-kade .k-title-block{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:1px;background:var(--k)}
.d-kade .k-title-block span{min-width:0;background:var(--paper);overflow-wrap:anywhere}
.d-kade .k-title-block span+span{border-left:0}
.d-kade .k-title-block[data-n="3"] span:first-child,.d-kade .k-title-block[data-n="1"] span{grid-column:1 / -1}
.d-kade .k-title-block a{display:inline-block;padding:6px 0;margin:-6px 0}
.d-kade .k-figs-in>div{position:relative;min-width:0}
.d-kade .k-figs dd{font-size:clamp(52px,6.6vw,108px)}
.d-kade .k-figs dt{max-width:none;font-size:15px;font-weight:600;color:var(--w);overflow-wrap:anywhere}
.d-kade .k-figs dt a::after{content:"";position:absolute;inset:0}
.d-kade .k-figs dt a:hover{color:var(--y)}
.d-kade .k-figs-in[data-n="3"]>div:last-child{grid-column:1 / -1}
@media (min-width:860px){.d-kade .k-figs-in[data-n="2"]{grid-template-columns:repeat(2,1fr)}.d-kade .k-figs-in[data-n="3"]{grid-template-columns:repeat(3,1fr)}.d-kade .k-figs-in[data-n="3"]>div:last-child{grid-column:auto}}
@media (min-width:960px){.d-kade .k-hero h1,.d-kade .k-hero h1.is-m,.d-kade .k-hero h1.is-s{font-size:min(clamp(58px,7.35vw,114px),calc(min(49vw,760px) / (var(--l,8) * var(--cw))))}.d-kade .k-hero-fig{align-content:stretch}.d-kade .k-hero-photo.is-plate{aspect-ratio:auto}.d-kade .k-plate-mark{font-size:clamp(150px,25vw,400px)}.d-kade .k-hero-photo .k-stamp{left:-26px;bottom:26px}}
.d-kade .k-svc-main ul li{color:var(--k)}
.d-kade .k-svc-price b{overflow-wrap:anywhere}
.d-kade .k-svc-price b.is-long{font-size:clamp(20px,1.8vw,26px);line-height:1.1}
.d-kade .k-svc.no-pic>li{grid-template-areas:"n main main" "price price go"}
.d-kade .k-svc.no-price>li{grid-template-areas:"photo photo photo" "n main go"}
.d-kade .k-svc.no-pic.no-price>li{grid-template-areas:"n main go"}
.d-kade .k-svc.no-price .k-svc-go{align-self:start;width:48px;height:48px}
@media (max-width:619px){.d-kade .k-svc.no-pic>li:first-child{padding-top:8px}}
@media (min-width:620px) and (max-width:959px){.d-kade .k-svc.no-pic>li{grid-template-columns:auto minmax(0,1fr) auto auto;grid-template-areas:"n main price go"}.d-kade .k-svc.no-price>li{grid-template-columns:auto minmax(0,1fr) 30% auto;grid-template-areas:"n main photo go"}.d-kade .k-svc.no-pic.no-price>li{grid-template-columns:auto minmax(0,1fr) auto;grid-template-areas:"n main go"}}
@media (min-width:960px){.d-kade .k-svc.no-pic>li{grid-template-columns:clamp(70px,7vw,112px) minmax(0,1fr) clamp(150px,13vw,200px) 56px;grid-template-areas:"n main price go"}.d-kade .k-svc.no-price>li{grid-template-columns:clamp(70px,7vw,112px) minmax(0,1fr) clamp(200px,21vw,330px) 56px;grid-template-areas:"n main photo go"}.d-kade .k-svc.no-pic.no-price>li{grid-template-columns:clamp(70px,7vw,112px) minmax(0,1fr) 56px;grid-template-areas:"n main go"}.d-kade .k-svc.no-price .k-svc-go{align-self:center;width:56px;height:56px}}
.d-kade .k-count b{animation:none}
.d-kade .k-card-photo{margin:0}
.d-kade .k-cards[data-n="1"] .k-card{flex-basis:100%}
.d-kade .k-method .k-btn-y,.d-kade .k-call .k-btn-y{border-color:var(--y)}
.d-kade .k-method-side>p.k-method-intro{max-width:48ch;color:rgba(255,255,255,.76)}
.d-kade .k-values li{grid-template-columns:auto minmax(0,1fr);gap:14px}
.d-kade .k-values i{padding:3px 6px 2px;background:var(--k);color:var(--y);font-family:var(--k-narrow),"Arial Narrow",sans-serif;font-size:13px;font-style:normal;font-weight:700;letter-spacing:.08em}
.d-kade .k-about-note span{overflow-wrap:break-word}
.d-kade .k-about-media.is-one{padding-bottom:clamp(36px,5vw,72px)}
.d-kade .k-about-media.is-one .k-about-note{width:min(74%,360px);box-shadow:0 0 0 8px var(--paper)}
.d-kade .k-about-media.is-bare{padding-bottom:0}
.d-kade .k-about-side{display:grid;gap:26px;align-content:start;min-width:0}
.d-kade .k-about-side .k-about-note{position:static;width:auto;padding:clamp(20px,2.4vw,36px)}
.d-kade .k-about-side .k-about-note span{font-size:clamp(19px,1.8vw,28px);font-weight:700;line-height:1.18;letter-spacing:-.01em}
.d-kade .k-about-side .k-values{margin-top:0}
.d-kade .k-about-grid.is-bare{grid-template-columns:minmax(0,1fr)}
.d-kade .k-about-grid.is-bare .k-about-copy{max-width:980px}
.d-kade .k-voice-mark{height:.46em;font-family:var(--k-narrow),"Arial Narrow",sans-serif;font-size:clamp(64px,5.6vw,92px);font-weight:700;line-height:.86}
.d-kade .k-voice-big .k-voice-mark{font-size:clamp(96px,11vw,180px);color:var(--y)}
.d-kade .k-voice.is-long blockquote p{font-size:clamp(16px,1.2vw,19px);font-weight:500}
.d-kade .k-voice-big.is-long blockquote p{font-size:clamp(19px,1.8vw,28px);font-weight:600;line-height:1.24}
.d-kade .k-voice figcaption a{justify-self:start;display:inline-flex;align-items:center;min-height:32px;font-size:15px;font-weight:500;color:var(--mut);text-decoration:underline;text-underline-offset:3px}
.d-kade .k-voice-big figcaption a{color:rgba(255,255,255,.74)}
@media (min-width:960px){.d-kade .k-voices-grid[data-n="1"]{grid-template-columns:minmax(0,1fr)}.d-kade .k-voices-grid[data-n="1"] .k-voice-big,.d-kade .k-voices-grid[data-n="2"] .k-voice-big{grid-row:auto}.d-kade .k-voices-grid[data-n="4"] .k-voice:last-child,.d-kade .k-voices-grid[data-n="6"] .k-voice:last-child{grid-column:1 / -1}}
.d-kade .k-quote-grid.is-solo{grid-template-columns:minmax(0,1fr)}
.d-kade .k-quote-grid.is-solo .k-quote-copy{max-width:980px}
.d-kade .k-quote-lede{margin-bottom:0}
.d-kade .k-contact{margin-top:30px}
.d-kade .k-contact li.is-rows{align-items:flex-start;padding-block:16px}
.d-kade .k-contact .k-row{display:block;font-size:15.5px;font-weight:600;line-height:1.5}
.d-kade .k-form-top{display:flex;justify-content:space-between;gap:16px;padding:13px var(--fp) 12px;border-bottom:6px solid var(--y);font-family:var(--k-narrow),"Arial Narrow",sans-serif;font-size:14px;font-weight:700;letter-spacing:.12em;line-height:1.3;text-transform:uppercase}
.d-kade .k-form-top b{min-width:0;font-weight:700;color:var(--y);overflow-wrap:anywhere}
.d-kade .k-form-top span{flex:none;color:rgba(255,255,255,.66)}
.d-kade .k-quote-card .z-form{padding:clamp(20px,2.4vw,32px) var(--fp) var(--fp)}
.d-kade .z-field label,.d-kade .z-chipset legend{font-family:var(--k-narrow),"Arial Narrow",sans-serif;font-size:14.5px;font-weight:700;letter-spacing:.08em;line-height:1.25;color:var(--k)}
.d-kade .z-field input,.d-kade .z-field select,.d-kade .z-field textarea{min-height:52px;border:2px solid var(--k);background-color:var(--paper);font-size:17px;line-height:1.35}
.d-kade .z-field select{padding-right:42px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 9'%3E%3Cpath d='M1 1l6 6 6-6' fill='none' stroke='%23111' stroke-width='2.4'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 15px center;background-size:14px 9px}
.d-kade .z-field :focus-visible{outline:3px solid var(--y);outline-offset:0;background-color:var(--w)}
.d-kade .z-chips button{border:2px solid var(--k);background:var(--paper);font-weight:700}
.d-kade .z-chips button:hover{background:var(--y)}
.d-kade .z-chips button[aria-pressed="true"]{background:var(--k);color:var(--y)}
.d-kade .form-note{font-size:13px;color:var(--mut)}
.d-kade .form-status{border:0;border-left:8px solid var(--y);background:var(--c1);font-size:15.5px;font-weight:700;line-height:1.35}
.d-kade .k-call{padding:0;background:var(--k);color:var(--w)}
.d-kade .k-call-in{display:grid;gap:22px;justify-items:start;padding-block:var(--sec)}
.d-kade .k-call-in>p:not(.k-tag){max-width:52ch;font-size:1.06em;color:rgba(255,255,255,.78)}
.d-kade .k-call-in .k-btn{margin-top:8px}
.d-kade .z-sec.z-features,.d-kade .z-sec.z-packages,.d-kade .z-sec.z-hours-sec,.d-kade .z-sec.z-team,.d-kade .z-sec.z-menu{background:var(--paper)}
.d-kade .z-copy .k-head{grid-template-columns:minmax(0,1fr);margin-bottom:6px;padding-bottom:0;border-bottom:0}
.d-kade .z-narrow{max-width:min(100%,1560px)}
.d-kade .z-acc{max-width:1120px;border-top:2px solid var(--k)}
.d-kade .z-acc details{border-bottom:1px solid var(--k)}
.d-kade .z-acc summary{padding:18px 0;font-size:clamp(17px,1.4vw,21px);font-weight:700;line-height:1.25}
.d-kade .z-acc summary i{width:36px;height:36px;background:var(--k);color:var(--y);transition:background-color .25s var(--ease),color .25s var(--ease)}
.d-kade .z-acc summary i::before,.d-kade .z-acc summary i::after{left:10px;width:16px;height:2px;margin-top:-1px}
.d-kade .z-acc details[open] summary i{background:var(--y);color:var(--k)}
.d-kade .z-features .z-grid{gap:clamp(14px,1.6vw,24px)}
.d-kade .z-features .z-grid>li,.d-kade .z-order .z-channel{padding:clamp(20px,2.2vw,32px);border:2px solid var(--k);background:var(--w)}
.d-kade .z-ico{border:0;background:var(--k);color:var(--y)}
.d-kade .z-order .z-channel{transition:background-color .25s var(--ease)}
.d-kade .z-order .z-channel:hover{background:var(--y)}
.d-kade .z-order .z-channel:hover p{color:var(--k)}
.d-kade .z-card{border:2px solid var(--k);background:var(--w)}
.d-kade .z-pack.is-featured{background:var(--y);box-shadow:6px 6px 0 var(--k)}
.d-kade .z-pack.is-featured p,.d-kade .z-pack.is-featured .z-pack-price{color:var(--k)}
.d-kade .z-tag{justify-self:start;padding:5px 9px 4px;background:var(--k);color:var(--y);font-family:var(--k-narrow),"Arial Narrow",sans-serif;font-size:12.5px;font-weight:700}
.d-kade .z-pack-price{font-family:var(--k-narrow),"Arial Narrow",sans-serif;font-size:15px;font-weight:600;letter-spacing:.06em;text-transform:uppercase}
.d-kade .z-pack-price b{font-size:clamp(40px,4vw,60px);line-height:1;letter-spacing:0}
.d-kade .z-ticks li{padding-left:24px}
.d-kade .z-ticks li::before{top:.44em;width:10px;height:10px;border:2px solid var(--k);background:var(--y)}
.d-kade .z-pack.is-featured .z-ticks li::before{background:var(--k)}
.d-kade .z-price,.d-kade .z-meta{font-family:var(--k-narrow),"Arial Narrow",sans-serif;font-size:1.1em;font-weight:700}
.d-kade .z-team .z-grid>li{padding-top:16px;border-top:2px solid var(--k)}
.d-kade .z-team .k-tag{font-size:13px;color:var(--mut)}
.d-kade .z-hours{border-top:2px solid var(--k)}
.d-kade .z-hours dt{font-family:var(--k-narrow),"Arial Narrow",sans-serif;font-size:15px;font-weight:700;letter-spacing:.09em;text-transform:uppercase}
.d-kade .z-hours dd{font-weight:600;color:var(--k)}
.d-kade .z-reach{font-weight:600}
.d-kade .z-reach .z-route{background:linear-gradient(var(--y),var(--y)) left 78%/100% .36em no-repeat}
.d-kade .z-sec.z-statement{background:var(--y)}
.d-kade .z-statement .z-center{justify-items:start;text-align:left}
.d-kade .z-statement h2{max-width:none;line-height:1}
.d-kade .z-showcase h2{font-size:clamp(28px,max(5vw,min(7.4vw,32px)),84px)}
.d-kade .z-showcase.has-pic .k-btn-line{border-color:var(--w);color:var(--w)}
.d-kade .z-showcase.has-pic .k-btn-line::before{background:var(--y)}
.d-kade .z-showcase.has-pic .k-btn-line:hover{color:var(--k)}
.d-kade .z-ba figcaption{font-family:var(--k-narrow),"Arial Narrow",sans-serif;font-weight:600;letter-spacing:.08em;text-transform:uppercase;background:var(--k);color:var(--y)}
.d-kade .k-foot-mark{white-space:normal;font-size:min(clamp(38px,11.6vw,196px),calc(min(96vw,1500px) / var(--n,9)));line-height:.86}
.d-kade .k-foot-mark span{display:block;white-space:nowrap}
.d-kade .k-foot-grid div>span{display:block;padding:10px 0;color:rgba(255,255,255,.82);overflow-wrap:anywhere}
.d-kade .k-hours div{flex-wrap:wrap}
.d-kade .k-hours dd{margin-left:auto}
`
  .replace(/\n/g, "")
  .trim();

const Svg = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);
const ARROW = "M5 12h14M12 5l7 7-7 7";
const UP_RIGHT = "M7 7h10v10M7 17 17 7";
const MAIL = "M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM22 7l-10 6L2 7";

const pad = (n: number) => String(n).padStart(2, "0");

const isReal = (c: Ctx, ref: string) => c.spec.images.some((im) => im.key === ref && im.license !== "generated" && /^https:\/\//.test(im.src));

/** Sheet number of a section: sections are numbered like the sheets of a drawing set. */
function sheet(c: Ctx, of: { id?: string; title?: string }): string {
  let n = 0;
  for (const x of c.spec.sections) {
    if (x.type === "cta" || x.type === "statement" || x.type === "showcase") continue;
    if (x.type === "gallery" && !x.images.some((r) => isReal(c, r))) continue;
    if (x.type === "beforeafter" && !x.pairs.some((p) => isReal(c, p.before) && isReal(c, p.after))) continue;
    n++;
    if (of.id ? x.id === of.id : x.title === of.title) return pad(n);
  }
  return pad(n + 1);
}

/** Section label in the manner of a drawing sheet: sheet number and title. */
const Tag = ({ n, children }: { n: string; children?: ReactNode }) => (
  <p className="k-tag" data-rv>
    <b>{n}</b>
    {children ? <span>{children}</span> : null}
  </p>
);

function Head(p: HeadProps, c: Ctx) {
  return (
    <header className={`k-head${p.intro ? "" : " is-solo"}`}>
      <Tag n={sheet(c, { title: p.title })}>{p.kicker}</Tag>
      <h2 id={p.id} className={long(p.title)} data-rv>
        {em(p.title)}
      </h2>
      {p.intro ? (
        <p className="k-head-side" data-rv>
          {p.intro}
        </p>
      ) : null}
    </header>
  );
}

/** Words set as balanced lines; phrases marked with *asterisks* stay marked. */
function setLines(text: string, parts: number) {
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
  const lines = rows.map((row) => {
    const out: ReactNode[] = [];
    let run: string[] = [];
    let mode = false;
    const flush = (k: number) => {
      if (!run.length) return;
      const t = run.join(" ");
      out.push(mode ? <em key={k}>{t}</em> : t);
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
    return out;
  });
  return {
    lines,
    texts: rows.map((row) => row.map((x) => x.w).join(" ")),
    marked: words.some((x) => x.em),
    longest: Math.max(1, ...rows.map((row) => row.map((x) => x.w).join(" ").length)),
    word: Math.max(1, ...words.map((x) => x.w.length)),
  };
}

const initials = (name: string) => {
  const w = name.split(/\s+/).filter((x) => /^[A-Za-zÀ-ÿ]/.test(x));
  return ((w[0]?.[0] ?? "") + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase();
};

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const foot = [b.openingHours?.[0], b.address ?? b.city].filter(Boolean).join(" · ");
  return (
    <>
      <header className="k-nav hdr">
        <a href="#top" className={`k-logo${c.name.length > 16 ? " is-long" : ""}`} aria-label={c.name}>
          <i aria-hidden="true" />
          <b>{c.name}</b>
        </a>
        <nav aria-label={c.t.menu} className="k-links" data-nav>
          {c.nav.slice(0, 4).map((n, k) => (
            <a key={n.id} href={`#${n.id}`}>
              <small>{pad(k + 1)}</small>
              {n.label}
            </a>
          ))}
        </nav>
        {b.phone && c.name.length <= 22 ? (
          <a href={tel(b.phone)} className="k-nav-tel">
            <Icon name="phone" />
            {b.phone}
          </a>
        ) : null}
        <a href={cta.href} className="btn k-btn k-btn-y k-nav-cta">
          <span>{cta.label}</span>
        </a>
        <button type="button" className="k-burger menu-btn" aria-expanded="false" aria-controls="site-menu" aria-label={c.t.menu}>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="site-menu" className="k-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{pad(k + 1)}</small>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="k-menu-foot">
          {b.phone ? (
            <a href={tel(b.phone)}>
              <Icon name="phone" />
              {b.phone}
            </a>
          ) : null}
          {foot ? <p>{foot}</p> : null}
          <a href={cta.href} className="btn k-btn k-btn-y">
            {cta.label}
            <Svg d={ARROW} />
          </a>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero, business: b, sections } = c.spec;
  // The photographs of the services are theirs: keep them out of the hands of earlier sections.
  for (const s of sections) if (s.type === "services") s.items.forEach((_, n) => c.photo(`art:svc${n}`));
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const N = plain.length;
  const set = setLines(hero.headline, N <= 8 ? 1 : N <= 16 ? 2 : N <= 36 ? 3 : N <= 62 ? 4 : 5);
  const size = N > 56 ? "is-s" : N > 30 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const words = offerWords(c, 4);
  const offer = sections.find((s) => s.type === "services" || s.type === "menu" || s.type === "packages");
  const label = hero.eyebrow || b.city;
  return (
    <section className={`k-hero k-grid${p ? "" : " no-pic"}`}>
      <div className="k-wrap k-hero-in">
        <div className="k-hero-copy">
          <p className="k-tag k-in" style={i(0)}>
            <b>{initials(c.name)}</b>
            {label ? <span>{label}</span> : null}
          </p>
          <h1 className={size} style={css({ "--l": set.longest, "--w": set.word })}>
            {set.lines.map((line, n) => (
              <span key={n} className={`k-ln${!set.marked && set.lines.length > 1 && n === set.lines.length - 1 ? " k-ln-y" : ""}`} style={i(n)}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="k-lede k-in" style={i(3)}>
            {hero.subheadline}
          </p>
          <div className="k-cta k-in" style={i(4)}>
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <Svg d={ARROW} />
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
        </div>
        <figure className="k-hero-fig">
          {b.city ? (
            <p className="k-dim k-dim-top">
              <span>{b.city}</span>
            </p>
          ) : null}
          <div className={`k-hero-photo${p ? "" : " is-plate"}`}>
            {p ? (
              <Pic p={p} eager sizes="(min-width: 960px) 42vw, 100vw" />
            ) : (
              <>
                <span className="k-plate-mark" aria-hidden="true">
                  {initials(c.name)}
                </span>
                <div className="k-hazard" aria-hidden="true" />
              </>
            )}
            {hero.note ? <span className="k-stamp">{hero.note}</span> : null}
          </div>
          {facts.length > 0 && (
            <figcaption className="k-title-block" data-n={facts.length}>
              {facts.map((f) => (
                <span key={f.label}>
                  <small>{f.label}</small>
                  {f.value}
                </span>
              ))}
            </figcaption>
          )}
        </figure>
      </div>
      {words.length >= 2 && offer ? (
        <div className="k-figs">
          <dl className="k-wrap k-figs-in" data-n={words.length}>
            {words.map((w, n) => (
              <div key={w} className="k-in" style={i(5 + n)}>
                <dt>
                  <a href={`#${offer.id}`}>{w}</a>
                </dt>
                <dd aria-hidden="true">{pad(n + 1)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}

/** How to reach the business, as the rows of the demo's contact list: only what is on record. */
function ReachList({ c, hours }: { c: Ctx; hours: boolean }) {
  const b = c.spec.business;
  const rows = hours && b.openingHours?.length ? b.openingHours.slice(0, 7) : [];
  if (!b.phone && !b.email && !b.address && !rows.length) return null;
  return (
    <ul className="k-contact" data-rv>
      {b.phone ? (
        <li>
          <Icon name="phone" />
          <span>
            <small>{c.t.phone}</small>
            <a href={tel(b.phone)}>{b.phone}</a>
          </span>
        </li>
      ) : null}
      {b.email ? (
        <li>
          <Svg d={MAIL} />
          <span>
            <small>{c.t.email}</small>
            <a href={`mailto:${b.email}`}>{b.email}</a>
          </span>
        </li>
      ) : null}
      {b.address ? (
        <li>
          <Icon name="map" />
          <span>
            <small>{c.t.address}</small>
            {b.mapsUrl ? (
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                {b.address}
              </a>
            ) : (
              b.address
            )}
          </span>
        </li>
      ) : null}
      {rows.length > 0 && (
        <li className="is-rows">
          <Icon name="clock" />
          <span>
            <small>{c.t.hours}</small>
            {rows.map((l) => (
              <span key={l} className="k-row">
                {l}
              </span>
            ))}
          </span>
        </li>
      )}
    </ul>
  );
}

/** The demo's request block: what to expect and how to reach us on the left, the form as a card. */
function Request({ c, s, kicker, kind, options, hours }: { c: Ctx; s: { id: string; title: string; body: string }; kicker: string; kind: FormKind | null; options?: string[]; hours: boolean }) {
  const no = sheet(c, { id: s.id });
  return (
    <section className="k-quote k-grid" id={s.id}>
      <div className={`k-wrap k-quote-grid${kind ? "" : " is-solo"}`}>
        <div className="k-quote-copy">
          <Tag n={no}>{kicker}</Tag>
          <h2 className={long(s.title)} data-rv>
            {em(s.title)}
          </h2>
          {s.body ? (
            <p className="k-quote-lede" data-rv>
              {s.body}
            </p>
          ) : null}
          <ReachList c={c} hours={hours} />
        </div>
        {kind ? (
          <div className="k-quote-card" data-rv>
            <div className="k-hazard" aria-hidden="true" />
            <p className="k-form-top">
              <b>{c.name}</b>
              <span aria-hidden="true">N° {no}</span>
            </p>
            <DemoForm c={c} kind={kind} options={options} uid={`f-${s.id}`} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const mark = setLines(c.name, c.name.length <= 12 ? 1 : c.name.length <= 26 ? 2 : 3);
  return (
    <footer className="k-foot">
      <div className="k-hazard" aria-hidden="true" />
      <div className="k-wrap">
        <p className="k-foot-mark" aria-hidden="true" style={css({ "--n": Math.max(5, mark.longest) })}>
          {mark.texts.map((l, n) => (
            <span key={n}>{l}</span>
          ))}
        </p>
        <div className="k-foot-grid">
          <div className="k-foot-about">
            {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
            <Btn c={c} href={cta.href}>
              {cta.label}
              <Svg d={ARROW} />
            </Btn>
          </div>
          <nav aria-label={c.t.explore}>
            <h3>{c.t.explore}</h3>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <div>
            <h3>{c.t.contact}</h3>
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
            {b.address ? <span>{b.address}</span> : null}
            {b.mapsUrl ? (
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                {c.t.route}
              </a>
            ) : null}
          </div>
          {b.openingHours?.length ? (
            <div>
              <h3>{c.t.hours}</h3>
              <dl className="k-hours">
                {hoursRows(b.openingHours.slice(0, 7)).map(([day, time], n) => (
                  <div key={n}>
                    <dt>{day}</dt>
                    <dd>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>
        <Legal c={c} className="k-legal" />
      </div>
    </footer>
  );
}

export const kade: Family = {
  key: "kade",
  root: "d-kade",
  fonts: ["Archivo Wide", "Archivo Narrow"],
  themeColor: "#e7e5e0",
  accent: "#f0b90b",
  onAccent: "#111111",
  css: CSS,
  extra: EXTRA,
  cls: { wrap: "k-wrap", eyebrow: "k-tag", btn: "k-btn k-btn-y", btnAlt: "k-btn k-btn-line", btnText: "k-link" },
  Header,
  Hero,
  Footer,
  Head,
  sections: {
    services: (s, c) => {
      const pics = s.items.map((_, n) => c.photo(`art:svc${n}`));
      const withPics = pics.every(Boolean);
      const withPrice = s.items.some((it) => it.price);
      const cta = c.spec.hero.primaryCta;
      return (
        <section className="k-services" id={s.id}>
          <div className="k-wrap">
            <header className={`k-head${s.intro ? "" : " is-solo"}`}>
              <Tag n={sheet(c, { id: s.id })}>{c.t.kick.services}</Tag>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
              {s.intro ? (
                <p className="k-head-side" data-rv>
                  {s.intro}
                </p>
              ) : null}
            </header>
            <ol className={`k-svc${withPics ? "" : " no-pic"}${withPrice ? "" : " no-price"}`}>
              {s.items.map((it, n) => (
                <li key={n} data-rv>
                  <span className="k-svc-n" aria-hidden="true">
                    {pad(n + 1)}
                  </span>
                  <div className="k-svc-main">
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                    {it.duration ? (
                      <ul>
                        <li>{it.duration}</li>
                      </ul>
                    ) : null}
                  </div>
                  {withPics ? (
                    <div className="k-svc-photo">
                      <Pic p={pics[n]!} sizes="(min-width: 960px) 22vw, 100vw" />
                    </div>
                  ) : null}
                  {withPrice ? <p className="k-svc-price">{it.price ? <b className={it.price.length > 9 ? "is-long" : undefined}>{it.price}</b> : null}</p> : null}
                  <a href={cta.href} className="k-svc-go" aria-label={`${cta.label}: ${it.title}`}>
                    <Svg d={UP_RIGHT} />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>
      );
    },
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="k-work k-grid" id={s.id}>
          <div className="k-wrap">
            <header className="k-head">
              <Tag n={sheet(c, { id: s.id })}>{c.t.kick.gallery}</Tag>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
              <p className="k-count k-head-side" aria-hidden="true" data-rv>
                <b>{pad(pics.length)}</b>
              </p>
            </header>
            <ul className="k-cards" data-rv="cards" data-n={pics.length}>
              {pics.map((p, n) => (
                <li key={n} className="k-card" style={i(n)}>
                  <figure className="k-card-photo">
                    <Pic p={p} sizes="(min-width: 1100px) 52vw, (min-width: 760px) 48vw, 84vw" />
                    <p className="k-card-cat" aria-hidden="true">
                      <b>N° {pad(n + 1)}</b>
                    </p>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    },
    process: (s, c) => {
      const p = c.spare();
      return (
        <section className="k-method" id={s.id}>
          <div className="k-wrap k-method-grid">
            <div className="k-method-side">
              <Tag n={sheet(c, { id: s.id })}>{c.t.kick.process}</Tag>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
              {s.intro ? (
                <p className="k-method-intro" data-rv>
                  {s.intro}
                </p>
              ) : null}
              {p ? (
                <figure className="k-method-fig" data-rv="wipe">
                  <Pic p={p} sizes="(min-width: 960px) 36vw, 100vw" />
                </figure>
              ) : null}
              <p className="k-dim k-dim-light" aria-hidden="true" data-rv="line">
                <span>
                  01 – {pad(s.steps.length)}
                </span>
              </p>
            </div>
            <ol className="k-steps">
              {s.steps.map((st, n) => (
                <li key={n} data-rv>
                  <span className="k-step-n" aria-hidden="true">
                    {pad(n + 1)}
                  </span>
                  <div>
                    <h3>{st.title}</h3>
                    <p>{st.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      );
    },
    about: (s, c) => {
      const a = c.photo(s.image);
      const b = a ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      const tagline = c.spec.business.tagline;
      const note = tagline && tagline.length <= 110 ? tagline : "";
      const values =
        s.highlights.length > 0 ? (
          <ul className="k-values" data-rv>
            {s.highlights.map((h, n) => (
              <li key={h}>
                <i aria-hidden="true">{pad(n + 1)}</i>
                <b>{h}</b>
              </li>
            ))}
          </ul>
        ) : null;
      const noteBlock = note ? (
        <p className="k-about-note" data-rv>
          <span>{note}</span>
        </p>
      ) : null;
      const bare = !a && !note && !values;
      return (
        <section className="k-about" id={s.id}>
          <div className="k-wrap">
            <header className="k-head is-solo">
              <Tag n={sheet(c, { id: s.id })}>{c.t.kick.about}</Tag>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
            </header>
            <div className={`k-about-grid${bare ? " is-bare" : ""}`}>
              <div className="k-about-copy">
                <p className="k-big" data-rv>
                  {first}
                </p>
                {rest.map((x, n) => (
                  <p key={n} data-rv>
                    {x}
                  </p>
                ))}
                {a ? values : null}
              </div>
              {a ? (
                <div className={`k-about-media${b ? "" : note ? " is-one" : " is-bare"}`}>
                  <figure className="k-about-a" data-rv="wipe">
                    <Pic p={a} sizes="(min-width: 960px) 46vw, 100vw" />
                  </figure>
                  {b ? (
                    <figure className="k-about-b" data-rv="wipe">
                      <Pic p={b} sizes="(min-width: 960px) 22vw, 60vw" />
                    </figure>
                  ) : null}
                  {noteBlock}
                </div>
              ) : bare ? null : (
                <div className="k-about-side">
                  {noteBlock}
                  {values}
                </div>
              )}
            </div>
          </div>
        </section>
      );
    },
    testimonials: (s, c) => (
      <section className="k-voices" id={s.id}>
        <div className="k-wrap">
          <header className="k-head is-solo">
            <Tag n={sheet(c, { id: s.id })}>{c.t.kick.testimonials}</Tag>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
          </header>
          <div className="k-voices-grid" data-n={s.items.length}>
            {s.items.map((q, n) => (
              <figure key={n} className={`k-voice${n === 0 ? " k-voice-big" : ""}${q.quote.length > 170 ? " is-long" : ""}`} data-rv style={i(n % 3)}>
                <p className="k-voice-mark" aria-hidden="true">
                  “
                </p>
                <blockquote>
                  <p>{q.quote}</p>
                </blockquote>
                <figcaption>
                  <b>{q.author}</b>
                  <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {c.t.source}: {q.source}
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    ),
    booking: (s, c) => <Request c={c} s={s} kicker={c.t.kick.booking} kind={s.kind} options={s.options} hours />,
    contact: (s, c) => <Request c={c} s={s} kicker={c.t.kick.contact} kind={s.showForm ? "message" : null} hours={!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking")} />,
    cta: (s, c) => (
      <section className="k-call" id={s.id}>
        <div className="k-hazard" aria-hidden="true" />
        <div className="k-wrap k-call-in">
          <h2 className={long(s.title)} data-rv>
            {em(s.title)}
          </h2>
          {s.body ? <p data-rv>{s.body}</p> : null}
          <p data-rv>
            <Btn c={c} href={s.cta.href}>
              {s.cta.label}
              <Svg d={ARROW} />
            </Btn>
          </p>
        </div>
      </section>
    ),
  },
};
