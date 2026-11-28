import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Noord: an original template (no portfolio demo). Nordic and quiet: off-white paper, black
 * ink and one clay accent, a large light serif with italics, hairline rules that draw
 * themselves and generous air. The headline arrives word by word, out of a soft blur; the
 * story lights up as you read it; the price list shows a photograph that follows the pointer;
 * the lookbook is a strip you can drag. Made for hair salons, barbers, beauty and wellness,
 * and other appointment-based studios.
 */

const CSS = `
.d-noord{--bg:#f6f5f1;--panel:#ebe8e1;--white:#ffffff;--ink:#141414;--ink-2:#2a2a28;--dim:#6b6862;--clay:#b5603c;--line:rgba(20,20,20,.14);--pad:clamp(20px,5vw,80px);--ease:cubic-bezier(.22,.7,.18,1);--slow:cubic-bezier(.65,0,.35,1);--serif:"Instrument Serif",Georgia,serif;--z-bg2:var(--panel);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--clay);--z-on-accent:#fff;--z-display:var(--serif);--z-radius:0;--z-field-radius:0;--z-ico-radius:50%;--z-h3:clamp(24px,2.2vw,32px);--z-statement:clamp(36px,5.4vw,92px);background:var(--bg);color:var(--ink);font-family:"Outfit",system-ui,sans-serif;font-weight:300;font-size:clamp(16px,1.05vw,18px);line-height:1.65}
.d-noord h1,.d-noord h2,.d-noord h3{font-family:var(--serif);font-weight:400;line-height:1;letter-spacing:-.015em}
.d-noord h1 em,.d-noord h2 em{font-style:italic;color:var(--clay)}
.d-noord h2{font-size:clamp(42px,5.8vw,96px)}
.d-noord h2.is-long{font-size:clamp(32px,4vw,62px);line-height:1.05}
.d-noord .nd-wrap{position:relative;width:min(100%,1440px);margin-inline:auto;padding-inline:var(--pad)}
.d-noord .nd-kick{display:flex;align-items:center;gap:14px;font-size:12px;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:var(--dim)}
.d-noord .nd-kick::before{content:"";width:36px;height:1px;background:currentColor;transform-origin:left;transition:transform 1s var(--ease) .2s}
.demo-js .d-noord .nd-kick[data-rv]:not(.in)::before{transform:scaleX(0)}
.d-noord .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:54px;padding:0 30px;overflow:hidden;isolation:isolate;font-size:13.5px;font-weight:400;letter-spacing:.14em;text-transform:uppercase;transition:color .45s var(--ease),border-color .3s}
.d-noord .btn svg{width:16px;height:16px;transition:transform .45s var(--ease)}
.d-noord .btn:hover svg{transform:translateX(5px)}
.d-noord .nd-fill{background:var(--ink);color:var(--bg)}
.d-noord .nd-fill::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--clay);clip-path:inset(0 100% 0 0);transition:clip-path .55s var(--slow)}
.d-noord .nd-fill:hover::before{clip-path:inset(0)}
.d-noord .nd-line{border:1px solid var(--ink);color:var(--ink)}
.d-noord .nd-line::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--ink);transform:translateY(101%);transition:transform .5s var(--slow)}
.d-noord .nd-line:hover{color:var(--bg)}
.d-noord .nd-line:hover::before{transform:none}
.d-noord .nd-text{position:relative;display:inline-flex;align-items:center;min-height:44px;font-size:13.5px;letter-spacing:.14em;text-transform:uppercase}
.d-noord .nd-text::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:1px;background:currentColor;transform-origin:right;transition:transform .5s var(--slow)}
.d-noord .nd-text:hover::after{transform:scaleX(0)}
.d-noord .nd-hdr{position:sticky;top:0;z-index:40;background:rgba(246,245,241,.86);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid transparent;transition:border-color .5s,transform .6s var(--ease)}
.d-noord.is-scrolled .nd-hdr{border-color:var(--line)}
.d-noord .nd-bar{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:24px;height:80px;transition:height .5s var(--ease)}
.d-noord.is-scrolled .nd-bar{height:66px}
.d-noord .nd-logo{overflow:hidden;font-family:var(--serif);font-size:clamp(24px,2vw,30px);line-height:1;text-overflow:ellipsis;white-space:nowrap;transition:letter-spacing .5s var(--ease)}
.d-noord .nd-logo:hover{letter-spacing:.02em}
.d-noord .nd-links{display:none;gap:34px;font-size:11.5px;letter-spacing:.2em;text-transform:uppercase}
.d-noord .nd-links a{position:relative;padding:8px 0;color:var(--ink-2)}
.d-noord .nd-links a::after{content:"";position:absolute;left:0;right:0;bottom:2px;height:1px;background:var(--clay);transform:scaleX(0);transform-origin:right;transition:transform .45s var(--slow)}
.d-noord .nd-links a:hover::after{transform:none;transform-origin:left}
.d-noord .nd-cta{display:none}
.d-noord .nd-burger{position:relative;z-index:41;display:flex;align-items:center;gap:12px;min-height:44px;padding:0;border:0;background:none;font-size:11.5px;letter-spacing:.2em;text-transform:uppercase}
.d-noord .nd-burger i{display:grid;gap:6px;width:26px}
.d-noord .nd-burger i::before,.d-noord .nd-burger i::after{content:"";height:1px;background:currentColor;transition:transform .45s var(--ease)}
.d-noord.menu-open .nd-burger i::before{transform:translateY(3.5px) rotate(22deg)}
.d-noord.menu-open .nd-burger i::after{transform:translateY(-3.5px) rotate(-22deg)}
@media (min-width:1020px){.d-noord .nd-bar{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}.d-noord .nd-links{display:flex}.d-noord .nd-cta{display:inline-flex;justify-self:end}.d-noord .nd-burger{display:none}}
.d-noord .nd-menu{position:fixed;inset:0;z-index:39;display:flex;flex-direction:column;justify-content:space-between;gap:32px;padding:110px var(--pad) 110px;background:var(--bg);overflow-y:auto;clip-path:inset(0 0 100% 0);visibility:hidden;transition:clip-path .8s var(--slow),visibility 0s .8s}
.d-noord .nd-menu.is-open{clip-path:inset(0);visibility:visible;transition:clip-path .8s var(--slow)}
.d-noord .nd-menu nav{display:grid;border-top:1px solid var(--line)}
.d-noord .nd-menu nav a{display:flex;align-items:baseline;justify-content:space-between;gap:16px;min-height:64px;padding:10px 0;border-bottom:1px solid var(--line);font-family:var(--serif);font-size:clamp(38px,9vw,70px);line-height:1.05;opacity:0;transform:translateY(30px);transition:opacity .6s,transform .8s var(--ease),color .3s}
.d-noord .nd-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.3s + var(--i,0) * 70ms)}
.d-noord .nd-menu nav a:hover{font-style:italic;color:var(--clay)}
.d-noord .nd-menu nav small{font-family:"Outfit",sans-serif;font-size:12px;letter-spacing:.2em;color:var(--dim)}
.d-noord .nd-menu p{color:var(--dim)}
.d-noord .nd-menu p a{display:inline-flex;align-items:center;min-height:40px;color:var(--ink)}
.d-noord.menu-open .nd-hdr{background:transparent;border-color:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-noord.menu-open .nd-logo{position:relative;z-index:41}
.d-noord .nd-hero{padding-top:clamp(36px,6vw,100px)}
.d-noord .nd-hero-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}
.d-noord .nd-now{display:inline-flex;align-items:center;gap:10px;font-size:12px;letter-spacing:.2em;text-transform:uppercase}
.d-noord .nd-now::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor}
.d-noord .nd-now.is-open{color:#4f7a52}
.d-noord .nd-now.is-closed{color:var(--clay)}
.d-noord .nd-hero h1{max-width:15ch;margin-top:28px;font-size:clamp(56px,10.4vw,176px);line-height:.92;letter-spacing:-.028em}
.d-noord .nd-hero h1.is-m{max-width:18ch;font-size:clamp(46px,7.8vw,132px)}
.d-noord .nd-hero h1.is-s{max-width:22ch;font-size:clamp(38px,5.8vw,96px);line-height:.98}
.d-noord .nd-w{display:inline-block;overflow:hidden;padding-bottom:.12em;margin-bottom:-.12em;vertical-align:top}
.d-noord .nd-w>span{display:inline-block;opacity:0;filter:blur(14px);transform:translateY(55%);animation:nd-word 1.3s var(--ease) both;animation-delay:calc(.15s + var(--i,0) * 85ms)}
.d-noord .nd-w.is-em>span{font-style:italic;color:var(--clay)}
.d-noord .nd-hero-row{display:grid;gap:32px 64px;margin-top:clamp(36px,4.4vw,64px);padding-bottom:clamp(40px,5vw,72px)}
@media (min-width:900px){.d-noord .nd-hero-row{grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);align-items:end}}
.d-noord .nd-fade{animation:nd-fade 1.2s var(--ease) both;animation-delay:calc(.7s + var(--i,0) * 110ms)}
.d-noord .nd-lede{max-width:46ch;font-size:clamp(17px,1.35vw,21px);color:var(--ink-2)}
.d-noord .nd-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px 30px;margin-top:32px}
.d-noord .nd-facts{position:relative;display:grid}
.d-noord .nd-facts::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:var(--ink);transform-origin:left;animation:nd-draw 1.4s var(--slow) .9s both}
.d-noord .nd-facts div{display:grid;grid-template-columns:118px minmax(0,1fr);gap:16px;padding:15px 0;border-bottom:1px solid var(--line)}
.d-noord .nd-facts dt{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}
.d-noord .nd-facts dd{margin:0}
.d-noord .nd-hero-media{position:relative;display:grid;gap:clamp(8px,1vw,16px);grid-template-columns:minmax(0,1fr)}
.d-noord .nd-hero-media figure{position:relative;overflow:hidden;aspect-ratio:4/5;clip-path:inset(100% 0 0 0);animation:nd-open 1.5s var(--slow) both;animation-delay:calc(.55s + var(--i,0) * 160ms)}
.d-noord .nd-hero-media img{width:100%;height:100%;object-fit:cover;transform:scale(calc(1.16 - var(--p,0) * -.06));transition:transform .2s linear}
@media (min-width:760px){.d-noord .nd-hero-media figure{aspect-ratio:21/9}.d-noord .nd-hero-media.has-3{grid-template-columns:minmax(0,2.2fr) minmax(0,1fr)}.d-noord .nd-hero-media.has-3 figure:first-child{grid-row:span 2;aspect-ratio:auto;min-height:100%}.d-noord .nd-hero-media.has-3 figure:not(:first-child){aspect-ratio:4/3}}
@media (max-width:759px){.d-noord .nd-hero-media figure:not(:first-child){display:none}}
.d-noord .nd-mark{display:grid;place-items:center;aspect-ratio:21/9;border-block:1px solid var(--ink);overflow:hidden}
.d-noord .nd-mark span{font-family:var(--serif);font-size:min(46vw,520px);font-style:italic;line-height:.8;color:var(--clay);animation:nd-word 1.6s var(--ease) .4s both}
@media (max-width:759px){.d-noord .nd-mark{aspect-ratio:4/3}}
.d-noord .nd-ticker{overflow:hidden;margin-top:clamp(48px,6vw,96px);border-block:1px solid var(--line)}
.d-noord .nd-ticker p{display:flex;width:max-content;gap:56px;padding:22px 0;font-family:var(--serif);font-size:clamp(28px,3vw,46px);font-style:italic;white-space:nowrap;animation:nd-run 60s linear infinite}
.d-noord .nd-ticker span{display:inline-flex;align-items:center;gap:56px}
.d-noord .nd-ticker span::after{content:"";width:7px;height:7px;border-radius:50%;background:var(--clay)}
.d-noord .nd-sec{position:relative;padding-block:clamp(90px,11vw,180px)}
.d-noord .nd-sec.is-panel{background:var(--panel)}
.d-noord .nd-sec.is-ink{background:var(--ink);color:var(--bg)}
.d-noord .nd-sec.is-ink .nd-kick{color:rgba(246,245,241,.6)}
.d-noord .nd-sec.is-ink h2 em{color:#e0a184}
.d-noord .nd-head{display:grid;gap:22px;margin-bottom:clamp(48px,6vw,96px)}
.d-noord .nd-head>p:not(.nd-kick){max-width:52ch;color:var(--dim)}
.d-noord .is-ink .nd-head>p:not(.nd-kick){color:rgba(246,245,241,.66)}
@media (min-width:1000px){.d-noord .nd-head.is-split{grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);align-items:end}.d-noord .nd-head.is-split .nd-kick{grid-column:1/-1}}
.d-noord .nd-about{display:grid;gap:clamp(40px,5vw,96px)}
@media (min-width:960px){.d-noord .nd-about{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}.d-noord .nd-about.is-solo{grid-template-columns:minmax(0,1fr)}}
.d-noord .nd-about-pic{position:relative;align-self:start;overflow:hidden;aspect-ratio:3/4}
.d-noord .nd-about-pic img{width:100%;height:100%;object-fit:cover;transform:scale(1.12) translateY(calc(var(--p,0) * -4%))}
.d-noord .nd-about-pic figcaption{position:absolute;left:16px;bottom:16px;padding:8px 14px;background:var(--bg);font-size:11px;letter-spacing:.2em;text-transform:uppercase}
@media (min-width:960px){.d-noord .nd-about-pic{position:sticky;top:110px}}
.d-noord .nd-about-copy{display:grid;gap:30px;align-content:start}
.d-noord .nd-lead{font-family:var(--serif);font-size:clamp(30px,3vw,50px);line-height:1.15;color:var(--ink)}
.d-noord [data-words] span{opacity:.18;transition:opacity .35s}
.d-noord [data-words] span.on{opacity:1}
.d-noord .nd-cols{display:grid;gap:20px 48px;color:var(--dim)}
@media (min-width:760px){.d-noord .nd-cols{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-noord .nd-trio{position:relative;display:grid;margin-top:12px}
.d-noord .nd-trio::before,.d-noord .nd-prices::before,.d-noord .nd-num::before,.d-noord .nd-hours::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:currentColor;transform-origin:left;transition:transform 1.4s var(--slow)}
.demo-js .d-noord .nd-trio:not(.in)::before,.demo-js .d-noord .nd-prices:not(.in)::before,.demo-js .d-noord .nd-num:not(.in)::before,.demo-js .d-noord .nd-hours:not(.in)::before{transform:scaleX(0)}
.demo-js .d-noord .nd-trio[data-rv],.demo-js .d-noord .nd-prices[data-rv],.demo-js .d-noord .nd-num[data-rv],.demo-js .d-noord .nd-hours[data-rv]{opacity:1;transform:none}
.d-noord .nd-trio li{display:grid;grid-template-columns:56px minmax(0,1fr);gap:12px;align-items:baseline;padding:20px 0;border-bottom:1px solid var(--line);font-size:1.08em;transition:padding .4s var(--ease)}
.d-noord .nd-trio li:hover{padding-left:12px}
.d-noord .nd-trio small{font-family:var(--serif);font-size:24px;font-style:italic;color:var(--clay)}
.d-noord .nd-prices{position:relative;display:grid;gap:0 clamp(40px,5vw,96px)}
@media (min-width:900px){.d-noord .nd-prices{grid-template-columns:repeat(2,minmax(0,1fr))}.d-noord .nd-prices.is-one{grid-template-columns:minmax(0,1fr);max-width:900px}}
.d-noord .nd-price{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:6px 18px;align-items:baseline;padding:26px 0;border-bottom:1px solid var(--line);opacity:0;transform:translateY(18px);transition:opacity .8s var(--ease),transform .8s var(--ease);transition-delay:calc(.2s + var(--i,0) * 70ms)}
.d-noord .nd-prices.in .nd-price,.d-noord .nd-prices:not([data-rv]) .nd-price,html:not(.demo-js) .d-noord .nd-price{opacity:1;transform:none}
.d-noord .nd-price::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:var(--clay);transform:scaleX(0);transform-origin:left;transition:transform .6s var(--slow)}
.d-noord .nd-price:hover::after{transform:none}
.d-noord .nd-price small{font-size:12px;letter-spacing:.14em;color:var(--dim)}
.d-noord .nd-price h3{font-size:clamp(26px,2.2vw,34px);transition:color .35s,transform .5s var(--ease)}
.d-noord .nd-price:hover h3{font-style:italic;color:var(--clay);transform:translateX(8px)}
.d-noord .nd-price p{grid-column:2/-1;max-width:52ch;color:var(--dim);font-size:.95em}
.d-noord .nd-amt{display:grid;justify-items:end;gap:2px;white-space:nowrap}
.d-noord .nd-amt b{font-weight:400;font-size:1.05em}
.d-noord .nd-amt span{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}
.d-noord .nd-peek{position:fixed;left:0;top:0;z-index:30;width:220px;aspect-ratio:3/4;overflow:hidden;pointer-events:none;opacity:0;scale:.85;transition:opacity .35s var(--ease),scale .5s var(--ease);will-change:transform}
.d-noord .nd-peek.on{opacity:1;scale:1}
.d-noord .nd-peek img{width:100%;height:100%;object-fit:cover}
.d-noord .nd-strip-head{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:24px;margin-bottom:clamp(40px,5vw,72px)}
.d-noord .nd-strip{display:flex;gap:clamp(10px,1.4vw,22px);overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-inline:var(--pad);scroll-padding-inline:var(--pad);cursor:grab;user-select:none}
.d-noord .nd-strip.is-drag{cursor:grabbing;scroll-snap-type:none}
.d-noord .nd-strip::-webkit-scrollbar{display:none}
.d-noord .nd-strip figure{flex:none;width:clamp(240px,30vw,460px);aspect-ratio:3/4;overflow:hidden;scroll-snap-align:start}
.d-noord .nd-strip figure:nth-child(3n+2){width:clamp(300px,42vw,680px);aspect-ratio:4/3;align-self:end}
.d-noord .nd-strip img{width:100%;height:100%;object-fit:cover;pointer-events:none;transition:transform 1.2s var(--ease)}
.d-noord .nd-strip figure:hover img{transform:scale(1.04)}
.d-noord .nd-strip-bar{width:min(100% - 2 * var(--pad),1440px - 2 * var(--pad));height:1px;margin:32px auto 0;background:var(--line)}
.d-noord .nd-strip-bar i{display:block;width:var(--w,20%);height:100%;background:var(--ink);transform:translateX(var(--x,0));transition:transform .2s linear}
.d-noord .nd-arrows{display:flex;gap:10px}
.d-noord .nd-arrows button{display:grid;place-items:center;width:56px;height:56px;border:1px solid var(--ink);border-radius:50%;background:none;font-size:20px;transition:background-color .35s,color .35s}
.d-noord .nd-arrows button:hover{background:var(--ink);color:var(--bg)}
.d-noord .nd-team{display:grid;gap:clamp(32px,3vw,56px) clamp(16px,2vw,32px);grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))}
.d-noord .nd-team li{cursor:default}
.d-noord .nd-team figure{overflow:hidden;aspect-ratio:3/4;margin-bottom:20px;background:var(--panel)}
.d-noord .nd-team img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.05);transform:scale(1.04);transition:filter .8s var(--ease),transform 1.2s var(--ease)}
.d-noord .nd-team li:hover img{filter:none;transform:none}
.d-noord .nd-team h3{font-size:clamp(28px,2.4vw,38px);font-style:italic;transition:transform .5s var(--ease)}
.d-noord .nd-team li:hover h3{transform:translateX(10px)}
.d-noord .nd-team p{margin-top:6px;color:var(--dim)}
.d-noord .nd-role{font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--clay)}
.d-noord .nd-num{position:relative;display:grid}
@media (min-width:860px){.d-noord .nd-num{grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}.d-noord .nd-num li+li{border-left:1px solid var(--line)}}
.d-noord .nd-num li{display:grid;gap:16px;align-content:start;padding:32px clamp(0px,2vw,34px) 36px;border-bottom:1px solid var(--line)}
@media (min-width:860px){.d-noord .nd-num li:first-child{padding-left:0}}
.d-noord .nd-num b{font-family:var(--serif);font-size:clamp(60px,5.6vw,96px);font-weight:400;font-style:italic;line-height:.85;color:var(--clay)}
.d-noord .nd-num h3{font-size:clamp(26px,2.2vw,32px)}
.d-noord .nd-num p{color:var(--dim)}
.d-noord .is-ink .nd-num li{border-color:rgba(246,245,241,.16)}
.d-noord .is-ink .nd-num b{color:#e0a184}
.d-noord .is-ink .nd-num p{color:rgba(246,245,241,.66)}
.d-noord .nd-ico{display:grid;place-items:center;width:48px;height:48px;border:1px solid currentColor;border-radius:50%;transition:transform .6s var(--ease)}
.d-noord .nd-num li:hover .nd-ico{transform:rotate(-20deg)}
.d-noord .nd-ico svg{width:20px;height:20px}
.d-noord .nd-hours{position:relative;display:grid}
.d-noord .nd-hours .z-hours{border:0}
.d-noord .nd-hours .z-hours div{padding:20px 0;font-size:1.06em;transition:padding .4s var(--ease)}
.d-noord .z-hours div.is-today{padding-inline:14px;background:var(--white)}
.d-noord .z-hours div.is-today dt::after{content:" ·";color:var(--clay)}
.d-noord .z-hours div.is-today dd{color:var(--clay)}
.d-noord .nd-book{display:grid;gap:clamp(40px,5vw,104px);align-items:start}
@media (min-width:980px){.d-noord .nd-book{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-noord .nd-book-copy{display:grid;gap:28px}
.d-noord .nd-book-copy>p{max-width:46ch;color:var(--dim)}
.d-noord .nd-form{position:relative;padding:clamp(26px,3.6vw,56px);background:var(--white)}
.d-noord .nd-form::before{content:"";position:absolute;left:0;top:0;width:100%;height:3px;background:var(--clay);transform-origin:left;transition:transform 1.2s var(--slow) .3s}
.demo-js .d-noord .nd-form:not(.in)::before{transform:scaleX(0)}
.d-noord .z-hours{border-color:var(--ink)}
.d-noord .z-field label,.d-noord .z-chipset legend{font-size:11px;letter-spacing:.2em}
.d-noord .z-field input,.d-noord .z-field select,.d-noord .z-field textarea{padding:10px 0;border-width:0 0 1px;border-color:var(--ink);font-weight:300;transition:border-color .3s}
.d-noord .z-field :focus-visible{outline:none;border-color:var(--clay)}
.d-noord .z-sec.z-cta{background:var(--panel)}
.d-noord .z-cta h2{font-size:clamp(44px,6vw,104px)}
.d-noord .z-statement h2{font-style:italic}
.d-noord .z-acc summary{font-family:var(--serif);font-size:clamp(25px,2.2vw,34px);line-height:1.15;transition:color .3s}
.d-noord .z-acc summary:hover{color:var(--clay)}
.d-noord .z-card{background:var(--white);border-color:var(--line)}
.d-noord .z-steps small,.d-noord .z-rows small{font-family:var(--serif);font-size:24px;font-style:italic;letter-spacing:0}
.d-noord .z-quotes blockquote>p{font-style:italic;font-size:clamp(24px,2.2vw,34px)}
.d-noord .nd-foot{padding:clamp(80px,9vw,140px) 0 140px;background:var(--ink);color:var(--bg);overflow:hidden}
.d-noord .nd-foot-cta{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:24px;padding-bottom:clamp(40px,5vw,72px);border-bottom:1px solid rgba(246,245,241,.2)}
.d-noord .nd-foot-cta p{max-width:18ch;font-family:var(--serif);font-size:clamp(40px,5vw,84px);line-height:1}
.d-noord .nd-foot-cta p em{color:#e0a184}
.d-noord .nd-foot .nd-fill{background:var(--bg);color:var(--ink)}
.d-noord .nd-foot .nd-fill:hover{color:var(--bg)}
.d-noord .nd-foot-run{overflow:hidden;margin-block:clamp(40px,6vw,84px)}
.d-noord .nd-foot-run p{display:flex;width:max-content;gap:.5em;font-family:var(--serif);font-size:min(17vw,240px);font-style:italic;line-height:1;white-space:nowrap;animation:nd-run 38s linear infinite}
.d-noord .nd-foot-run span::after{content:"—";margin-left:.5em;color:#e0a184}
.d-noord .nd-foot-grid{display:grid;gap:36px;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-noord .nd-foot-grid h3{margin-bottom:14px;font-family:"Outfit",sans-serif;font-size:11px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:rgba(246,245,241,.55)}
.d-noord .nd-foot-grid a,.d-noord .nd-foot-grid span{display:block;padding:4px 0}
.d-noord .nd-foot-grid a{transition:color .3s,transform .4s var(--ease)}
.d-noord .nd-foot-grid a:hover{color:#e0a184;transform:translateX(6px)}
.d-noord .nd-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;font-size:12px;letter-spacing:.06em;color:rgba(246,245,241,.55)}
@keyframes nd-word{to{opacity:1;filter:none;transform:none}}
@keyframes nd-fade{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes nd-open{to{clip-path:inset(0)}}
@keyframes nd-draw{from{transform:scaleX(0)}to{transform:none}}
@keyframes nd-run{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.d-noord .nd-w>span{opacity:1;filter:none;transform:none}.d-noord .nd-hero-media figure{clip-path:none}.d-noord .nd-ticker p,.d-noord .nd-foot-run p{animation:none}.d-noord [data-words] span{opacity:1}.d-noord .nd-price{opacity:1;transform:none}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The story lights up word by word as it is read; a price row shows its photograph next to
 * the pointer; the lookbook can be dragged and shows how far along it is.
 */
const JS = `(function(){var d=document,W=window,reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var ws=[].slice.call(d.querySelectorAll('[data-words]'));function lit(){var vh=W.innerHeight;ws.forEach(function(el){var r=el.getBoundingClientRect();var p=Math.min(1,Math.max(0,(vh*.82-r.top)/(r.height+vh*.3)));var sp=el.children,k=Math.round(p*sp.length);for(var n=0;n<sp.length;n++)sp[n].classList.toggle('on',reduce||n<k)})}if(ws.length){W.addEventListener('scroll',lit,{passive:true});W.addEventListener('resize',lit);lit()}
if(W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches&&!reduce){var rows=[].slice.call(d.querySelectorAll('[data-peek]'));if(rows.length){var pk=d.createElement('div');pk.className='nd-peek';pk.setAttribute('aria-hidden','true');var im=d.createElement('img');im.alt='';pk.appendChild(im);(d.querySelector('.fam')||d.body).appendChild(pk);var x=0,y=0,tx=0,ty=0,raf=0;function loop(){x+=(tx-x)*.18;y+=(ty-y)*.18;pk.style.transform='translate('+x+'px,'+y+'px) rotate('+((tx-x)*.03)+'deg)';raf=Math.abs(tx-x)+Math.abs(ty-y)>.5?requestAnimationFrame(loop):0}
rows.forEach(function(r){r.addEventListener('mouseenter',function(){im.src=r.getAttribute('data-peek');pk.classList.add('on')});r.addEventListener('mouseleave',function(){pk.classList.remove('on')});r.addEventListener('mousemove',function(e){tx=e.clientX+28;ty=e.clientY-150;if(!raf)raf=requestAnimationFrame(loop)})})}}
[].slice.call(d.querySelectorAll('.nd-strip')).forEach(function(s){var bar=d.querySelector('[data-bar="'+s.id+'"] i');function upd(){if(!bar)return;var max=s.scrollWidth-s.clientWidth,w=s.clientWidth/s.scrollWidth;bar.style.setProperty('--w',(w*100)+'%');bar.style.setProperty('--x',max>0?((s.scrollLeft/max)*(1/w-1)*100)+'%':'0')}s.addEventListener('scroll',upd,{passive:true});W.addEventListener('resize',upd);upd();var down=false,sx=0,sl=0,moved=0;s.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=0;sx=e.clientX;sl=s.scrollLeft;s.classList.add('is-drag')});W.addEventListener('pointermove',function(e){if(!down)return;moved=Math.abs(e.clientX-sx);s.scrollLeft=sl-(e.clientX-sx)});W.addEventListener('pointerup',function(){if(!down)return;down=false;s.classList.remove('is-drag')})})})();`;

/** The headline as words, kept whole, with the *marked* phrase in italics. */
function Words({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let n = 0;
  text.split(/\*([^*]+)\*/).forEach((chunk, k) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => {
        out.push(
          <span key={n} className={`nd-w${k % 2 ? " is-em" : ""}`}>
            <span style={i(n)}>{w}</span>
          </span>,
          " ",
        );
        n++;
      }),
  );
  return <>{out}</>;
}

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
    <path d="M3 10h14M12 5l5 5-5 5" />
  </svg>
);

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
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
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
  const words = offerWords(c, 8);
  return (
    <section className="nd-hero">
      <div className="nd-wrap">
        <div className="nd-hero-top">
          {hero.eyebrow ? <p className="nd-kick nd-fade">{hero.eyebrow}</p> : <span />}
          <NowBadge c={c} className="nd-now nd-fade" />
        </div>
        <h1 className={size}>
          <Words text={hero.headline} />
        </h1>
        <div className="nd-hero-row">
          <div className="nd-fade" style={i(1)}>
            <p className="nd-lede">{hero.subheadline}</p>
            <div className="nd-cta-row">
              <Btn c={c} href={hero.primaryCta.href}>
                {hero.primaryCta.label} <Arrow />
              </Btn>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="text">
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
            </div>
          </div>
          {facts.length > 0 && (
            <dl className="nd-facts nd-fade" style={i(2)}>
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
            <figure key={n} style={i(n)} {...(n === 0 ? { "data-px": "" } : {})}>
              <Pic p={p} eager sizes={n === 0 ? "(min-width: 760px) 66vw, 100vw" : "(min-width: 760px) 30vw, 100vw"} />
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
      {words.length >= 3 && (
        <div className="nd-ticker" aria-hidden="true">
          <p>
            {[...words, ...words, ...words].map((w, n) => (
              <span key={n}>{w}</span>
            ))}
          </p>
        </div>
      )}
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="nd-foot">
      <div className="nd-wrap">
        <div className="nd-foot-cta">
          <p data-rv>{em(c.spec.hero.headline)}</p>
          <Btn c={c} href={cta.href}>
            {cta.label} <Arrow />
          </Btn>
        </div>
      </div>
      <div className="nd-foot-run" aria-hidden="true">
        <p>
          {[0, 1, 2, 3].map((n) => (
            <span key={n}>{c.name}</span>
          ))}
        </p>
      </div>
      <div className="nd-wrap">
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
    <ol className="nd-num" data-rv style={{ ["--n" as string]: Math.min(4, items.length) }}>
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

/** A price list; rows that have a real photograph show it beside the pointer. */
function Prices({ rows }: { rows: { title: string; text?: string; price?: string | null; duration?: string | null; peek?: Photo | null }[] }) {
  return (
    <ol className={`nd-prices${rows.length < 4 ? " is-one" : ""}`} data-rv>
      {rows.map((r, n) => (
        <li key={n} className="nd-price" style={i(n % 6)} {...(r.peek ? { "data-peek": r.peek.src } : {})}>
          <small>{String(n + 1).padStart(2, "0")}</small>
          <h3>{r.title}</h3>
          {r.price || r.duration ? (
            <span className="nd-amt">
              {r.price ? <b>{r.price}</b> : null}
              {r.duration ? <span>{r.duration}</span> : null}
            </span>
          ) : (
            <span />
          )}
          {r.text ? <p>{r.text}</p> : null}
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
  js: JS + TODAY_JS,
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
              <figure className="nd-about-pic" data-rv data-px>
                <Pic p={p} sizes="(min-width: 960px) 36vw, 100vw" />
                {c.spec.business.city ? <figcaption>{c.spec.business.city}</figcaption> : null}
              </figure>
            ) : null}
            <div className="nd-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="nd-lead" data-words>
                {first.split(/\s+/).map((w, n) => (
                  <span key={n}>{w} </span>
                ))}
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
    services: (s, c) => {
      const rows = s.items.map((it, n) => ({ title: it.title, text: it.description, price: it.price, duration: it.duration, peek: c.photo(`art:svc${n}`) ?? (n < 4 ? c.spare() : null) }));
      return (
        <section className="nd-sec is-panel" id={s.id}>
          <div className="nd-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} split />
            <Prices rows={rows} />
          </div>
        </section>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="nd-sec is-panel" id={s.id}>
          <div className="nd-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} split />
            {cats.map((cat, n) => (
              <div key={n} style={{ marginTop: n ? 64 : 0 }}>
                <p className="nd-kick" data-rv style={{ marginBottom: 22 }}>
                  {cat.name}
                </p>
                <Prices rows={cat.items.map((d) => ({ title: d.name, text: d.description, price: d.price }))} />
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
          <div className="nd-wrap nd-strip-head">
            <div style={{ display: "grid", gap: 22 }}>
              <Kick>{c.t.kick.gallery}</Kick>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
            </div>
            {pics.length > 2 ? (
              <div className="nd-arrows" data-rv>
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
          {pics.length > 2 ? (
            <div className="nd-strip-bar" data-bar={strip} aria-hidden="true">
              <i />
            </div>
          ) : null}
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
    hours: (s, c) => (
      <section className="nd-sec" id={s.id}>
        <div className="nd-wrap nd-book">
          <div className="nd-book-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div>
            <p className="nd-kick" data-rv style={{ justifyContent: "space-between", marginBottom: 18 }}>
              {c.t.hours}
              <NowBadge c={c} className="nd-now" />
            </p>
            <div className="nd-hours" data-rv>
              {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
            </div>
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="nd-sec is-panel" id={s.id}>
        <div className="nd-wrap nd-book">
          <div className="nd-book-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="nd-form" data-rv>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : null}
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
