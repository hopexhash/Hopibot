import type { ReactNode } from "react";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, splitLines, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Ivoor: an original template (no portfolio demo). Architecture first: warm charcoal and ivory
 * cream, an oversized hairline display face set in capitals, full-screen photography and almost
 * no chrome. The opening photograph opens like a slit in a facade while a drafting line draws
 * the headline across the page; the offer is a sticky, full-screen sequence in which every
 * property wipes up over the previous one (stacked cards on phones); the gallery is a cinema
 * slider; a statement fills with light as it scrolls past. Made for real estate brokers,
 * architects, interior designers and other businesses that sell space and finish.
 */

const CSS = `
.d-ivoor{--ch:#141311;--ch2:#1c1a18;--ch3:#272522;--deep:#0d0c0b;--ivory:#f3ece1;--cream:#ece4d6;--cream2:#e2d8c6;--sand:#c7ab82;--sand2:#a88b61;--dimd:#a69d8f;--dimc:#5f574c;--lined:rgba(243,236,225,.14);--linec:rgba(20,19,17,.16);--pad:clamp(20px,5vw,96px);--ease:cubic-bezier(.19,.8,.22,1);--slow:cubic-bezier(.7,0,.2,1);--disp:"Italiana",Georgia,serif;--sans:"Archivo",system-ui,sans-serif;--z-bg2:var(--ch2);--z-ink:var(--ivory);--z-dim:var(--dimd);--z-line:var(--lined);--z-accent:var(--sand);--z-on-accent:#141311;--z-display:var(--disp);--z-display-weight:400;--z-radius:0;--z-field-radius:0;--z-ico-radius:0;--z-sec:clamp(96px,12vw,200px);--z-h3:clamp(26px,2.4vw,38px);--z-statement:clamp(36px,5.6vw,96px);background:var(--ch);color:var(--ivory);font-family:var(--sans);font-weight:300;font-size:clamp(16px,1.02vw,18px);line-height:1.7;letter-spacing:.005em}
.d-ivoor ::selection{background:var(--sand);color:var(--ch)}
.d-ivoor h1,.d-ivoor h2,.d-ivoor h3{font-family:var(--disp);font-weight:400;line-height:.98;letter-spacing:0;overflow-wrap:break-word;min-width:0}
.d-ivoor h1 em,.d-ivoor h2 em,.d-ivoor h3 em{font-style:normal;color:var(--sand)}
.d-ivoor h2{font-size:clamp(42px,6.6vw,128px);text-wrap:balance}
.d-ivoor h2.is-long{font-size:clamp(34px,4.4vw,80px);line-height:1.02}
.d-ivoor .iv-wrap{position:relative;width:min(100%,1680px);margin-inline:auto;padding-inline:var(--pad)}
.d-ivoor .iv-kick{display:inline-flex;align-items:center;gap:14px;font-size:11px;font-weight:500;line-height:1.4;letter-spacing:.3em;text-transform:uppercase;color:var(--sand)}
.d-ivoor .iv-kick::before{content:"";flex:none;width:34px;height:1px;background:currentColor;transform-origin:left;transition:transform 1.1s var(--ease) .15s}
.demo-js .d-ivoor .iv-kick[data-rv]:not(.in)::before{transform:scaleX(0)}
.d-ivoor .iv-lab{font-size:11px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:var(--dimd)}
.d-ivoor .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:16px;min-height:56px;padding:0 32px;overflow:hidden;isolation:isolate;font-size:12px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;white-space:nowrap;transition:color .5s var(--ease),border-color .5s,background-color .5s}
.d-ivoor .btn::before{content:"";position:absolute;inset:0;z-index:-1;transform:scaleY(0);transform-origin:bottom;transition:transform .6s var(--slow)}
.d-ivoor .btn:hover::before{transform:none}
.d-ivoor .btn svg{width:22px;height:10px;transition:transform .5s var(--ease)}
.d-ivoor .btn:hover svg{transform:translateX(6px)}
.d-ivoor .iv-fill{background:var(--ivory);color:var(--ch)}
.d-ivoor .iv-fill::before{background:var(--sand)}
.d-ivoor .iv-line{border:1px solid rgba(243,236,225,.5);color:var(--ivory)}
.d-ivoor .iv-line::before{background:var(--ivory)}
.d-ivoor .iv-line:hover{color:var(--ch);border-color:var(--ivory)}
.d-ivoor .is-light .iv-fill,.d-ivoor .z-faq .iv-fill,.d-ivoor .z-packages .iv-fill{background:var(--ch);color:var(--ivory)}
.d-ivoor .is-light .iv-fill:hover{color:var(--ch)}
.d-ivoor .is-light .iv-line{border-color:rgba(20,19,17,.4);color:var(--ch)}
.d-ivoor .is-light .iv-line::before{background:var(--ch)}
.d-ivoor .is-light .iv-line:hover{color:var(--ivory)}
.d-ivoor .iv-text{position:relative;display:inline-flex;align-items:center;gap:12px;min-height:44px;font-size:12px;font-weight:500;letter-spacing:.24em;text-transform:uppercase}
.d-ivoor .iv-text::after{content:"";position:absolute;left:0;right:0;bottom:9px;height:1px;background:currentColor;opacity:.45;transform-origin:right;transition:transform .6s var(--slow),opacity .3s}
.d-ivoor .iv-text:hover::after{transform:scaleX(.25);opacity:1}
.d-ivoor .iv-hdr{position:fixed;left:0;right:0;top:0;z-index:70;color:var(--ivory);transition:transform .7s var(--ease),background-color .6s,border-color .6s;border-bottom:1px solid transparent}
.d-ivoor.is-scrolled .iv-hdr{background:rgba(20,19,17,.82);backdrop-filter:blur(18px) saturate(1.2);-webkit-backdrop-filter:blur(18px) saturate(1.2);border-color:var(--lined)}
.d-ivoor.iv-up:not(.menu-open) .iv-hdr{transform:translateY(-101%)}
.d-ivoor.menu-open .iv-hdr{background:transparent;border-color:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-ivoor .iv-bar{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:20px;height:84px;transition:height .6s var(--ease)}
.d-ivoor.is-scrolled .iv-bar{height:68px}
.d-ivoor .iv-logo{display:flex;align-items:center;gap:14px;min-width:0;min-height:44px}
.d-ivoor .iv-logo b{overflow:hidden;font-family:var(--disp);font-weight:400;font-size:clamp(19px,1.6vw,24px);letter-spacing:.32em;text-transform:uppercase;white-space:nowrap;text-overflow:ellipsis;transition:letter-spacing .7s var(--ease)}
.d-ivoor .iv-logo:hover b{letter-spacing:.4em}
.d-ivoor .iv-logo i{flex:none;width:9px;height:9px;border:1px solid var(--sand);transform:rotate(45deg);transition:transform .8s var(--ease),background-color .4s}
.d-ivoor .iv-logo:hover i{transform:rotate(225deg);background:var(--sand)}
.d-ivoor .iv-links{display:none;gap:clamp(22px,2.6vw,44px)}
.d-ivoor .iv-links a{position:relative;display:inline-flex;align-items:center;min-height:44px;font-size:11px;font-weight:500;letter-spacing:.26em;text-transform:uppercase;opacity:.78;transition:opacity .3s}
.d-ivoor .iv-links a::after{content:"";position:absolute;left:50%;bottom:10px;width:4px;height:4px;background:var(--sand);transform:translateX(-50%) rotate(45deg) scale(0);transition:transform .45s var(--ease)}
.d-ivoor .iv-links a:hover{opacity:1}
.d-ivoor .iv-links a:hover::after{transform:translateX(-50%) rotate(45deg) scale(1)}
.d-ivoor .iv-right{display:flex;align-items:center;gap:28px}
.d-ivoor .iv-hcta{display:none}
.d-ivoor .iv-burger{display:flex;align-items:center;gap:14px;min-width:44px;min-height:44px;padding:0;border:0;background:none;font-size:11px;font-weight:500;letter-spacing:.26em;text-transform:uppercase}
.d-ivoor .iv-burger i{position:relative;display:block;width:30px;height:9px}
.d-ivoor .iv-burger i::before,.d-ivoor .iv-burger i::after{content:"";position:absolute;right:0;height:1px;background:currentColor;transition:transform .6s var(--ease),width .6s var(--ease)}
.d-ivoor .iv-burger i::before{top:0;width:100%}
.d-ivoor .iv-burger i::after{bottom:0;width:62%}
.d-ivoor .iv-burger:hover i::after{width:100%}
.d-ivoor.menu-open .iv-burger i::before{transform:translateY(4px) rotate(18deg)}
.d-ivoor.menu-open .iv-burger i::after{width:100%;transform:translateY(-4px) rotate(-18deg)}
@media (min-width:1240px){.d-ivoor .iv-bar{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}.d-ivoor .iv-links{display:flex}.d-ivoor .iv-right{justify-self:end}}
@media (min-width:1520px){.d-ivoor .iv-hcta{display:inline-flex;white-space:nowrap}}
.d-ivoor .iv-logo.is-long b{letter-spacing:.2em}
@media (max-width:520px){.d-ivoor .iv-burger span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}.d-ivoor .iv-logo b,.d-ivoor .iv-logo.is-long b{font-size:17px;letter-spacing:.2em}.d-ivoor .btn{min-height:52px;padding:12px 22px;white-space:normal;text-align:center;letter-spacing:.18em;line-height:1.5}.d-ivoor .z-hours dd{font-size:19px}.d-ivoor .z-hours dt{letter-spacing:.14em}}
.d-ivoor .iv-menu{position:fixed;inset:0;z-index:60;display:grid;visibility:hidden;transition:visibility 0s 1.1s}
.d-ivoor .iv-menu.is-open{visibility:visible;transition:none}
.d-ivoor .iv-lv{position:absolute;inset:0;display:grid;grid-template-columns:repeat(4,1fr)}
.d-ivoor .iv-lv i{background:var(--deep);transform:scaleY(0);transform-origin:top;transition:transform .75s var(--slow);transition-delay:calc((3 - var(--i,0)) * 60ms)}
.d-ivoor .iv-lv i+i{border-left:1px solid rgba(243,236,225,.05)}
.d-ivoor .iv-menu.is-open .iv-lv i{transform:none;transition-delay:calc(var(--i,0) * 70ms)}
.d-ivoor .iv-menu-in{position:relative;display:grid;align-content:space-between;gap:40px;min-height:100%;padding:120px var(--pad) 96px;overflow-y:auto;opacity:0;transition:opacity .4s}
.d-ivoor .iv-menu.is-open .iv-menu-in{opacity:1;transition:opacity .5s .45s}
.d-ivoor .iv-menu nav{display:grid;counter-reset:m}
.d-ivoor .iv-menu nav a{position:relative;display:flex;align-items:baseline;gap:18px;min-height:56px;padding:6px 0;font-family:var(--disp);font-size:clamp(40px,8.4vw,112px);line-height:1.02;text-transform:uppercase;letter-spacing:.02em;opacity:0;transform:translateY(40px);transition:opacity .7s var(--ease),transform .9s var(--ease),color .4s,letter-spacing .7s var(--ease)}
.d-ivoor .iv-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.45s + var(--i,0) * 70ms),calc(.45s + var(--i,0) * 70ms),0s,0s}
.d-ivoor .iv-menu nav a small{font-family:var(--sans);font-size:11px;letter-spacing:.24em;color:var(--sand)}
.d-ivoor .iv-menu nav a:hover{color:var(--sand);letter-spacing:.06em}
.d-ivoor .iv-menu-foot{display:grid;gap:24px;color:var(--dimd);font-size:15px}
@media (min-width:900px){.d-ivoor .iv-menu-foot{grid-template-columns:repeat(3,minmax(0,1fr))}}
.d-ivoor .iv-menu-foot a{display:inline-flex;align-items:center;min-height:40px;color:var(--ivory)}
.d-ivoor .iv-menu-foot .iv-lab{display:block;margin-bottom:6px;color:var(--sand)}
.d-ivoor .iv-hero{position:relative;display:grid;align-items:end;min-height:100svh;padding:140px 0 clamp(40px,6vw,80px);overflow:hidden;isolation:isolate}
.d-ivoor .iv-hero-media{position:absolute;inset:0;z-index:-2;overflow:hidden;clip-path:inset(0 50% 0 50%);animation:iv-slit 1.9s var(--slow) .15s both}
.d-ivoor .iv-hero-zoom{position:absolute;inset:0;animation:iv-zoom 3.2s var(--ease) .15s both}
.d-ivoor .iv-hero-media img{position:absolute;inset:-6% 0;width:100%;height:112%;object-fit:cover;transform:translateY(calc(var(--p,0) * -5%))}
.d-ivoor .iv-hero::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(13,12,11,.62),rgba(13,12,11,.18) 58%,rgba(13,12,11,0)),linear-gradient(180deg,rgba(13,12,11,.55) 0%,rgba(13,12,11,.1) 28%,rgba(13,12,11,.22) 52%,rgba(13,12,11,.92) 100%)}
@media (max-width:760px){.d-ivoor .iv-hero::before{background:linear-gradient(180deg,rgba(13,12,11,.55) 0%,rgba(13,12,11,.58) 30%,rgba(13,12,11,.74) 60%,rgba(13,12,11,.95) 100%)}.d-ivoor .iv-hero-media img{object-position:62% center}}
.d-ivoor.no-photos .iv-hero::before{background:radial-gradient(120% 80% at 70% 10%,rgba(199,171,130,.12),transparent 60%)}
.d-ivoor .iv-frame{position:absolute;inset:96px var(--pad) 24px;z-index:-1;pointer-events:none}
.d-ivoor .iv-frame i{position:absolute;background:rgba(243,236,225,.26)}
.d-ivoor .iv-frame i:nth-child(1){left:0;right:0;top:0;height:1px;transform-origin:left;animation:iv-sx 1.6s var(--slow) .9s both}
.d-ivoor .iv-frame i:nth-child(2){top:0;bottom:0;right:0;width:1px;transform-origin:top;animation:iv-sy 1.6s var(--slow) 1.2s both}
.d-ivoor .iv-frame i:nth-child(3){left:0;right:0;bottom:0;height:1px;transform-origin:right;animation:iv-sx 1.6s var(--slow) 1.5s both}
.d-ivoor .iv-frame i:nth-child(4){top:0;bottom:0;left:0;width:1px;transform-origin:bottom;animation:iv-sy 1.6s var(--slow) 1.8s both}
.d-ivoor .iv-facade{position:absolute;right:calc(var(--pad) * -.2);top:84px;bottom:0;z-index:-1;width:min(78vw,980px);color:var(--sand);opacity:.5;pointer-events:none}
.d-ivoor .iv-facade path,.d-ivoor .iv-facade line,.d-ivoor .iv-facade rect{fill:none;stroke:currentColor;stroke-width:1;vector-effect:non-scaling-stroke;stroke-dasharray:1;stroke-dashoffset:1;animation:iv-draw 3.4s var(--ease) both;animation-delay:calc(.4s + var(--i,0) * 90ms)}
.d-ivoor .iv-hero-in{position:relative;display:grid;gap:clamp(28px,4vw,56px)}
.d-ivoor .iv-hero-top{display:flex;flex-wrap:wrap;align-items:center;gap:14px 26px}
.d-ivoor .iv-now{display:inline-flex;align-items:center;gap:10px;min-height:30px;padding:0 14px;border:1px solid var(--lined);font-size:11px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--ivory)}
.d-ivoor .iv-now::before{content:"";width:6px;height:6px;background:var(--sand);transform:rotate(45deg)}
.d-ivoor .iv-now.is-open::before{background:#9fc39a}
.d-ivoor .iv-hero h1{max-width:16ch;font-size:min(clamp(52px,10.4vw,214px),calc((100vw - 2 * var(--pad)) / (var(--mw,8) * .78)));line-height:.9;letter-spacing:.01em;text-transform:uppercase}
.d-ivoor .iv-hero h1.is-m{max-width:18ch;font-size:min(clamp(46px,8vw,160px),calc((100vw - 2 * var(--pad)) / (var(--mw,8) * .78)))}
.d-ivoor .iv-hero h1.is-s{max-width:22ch;font-size:min(clamp(40px,6vw,118px),calc((100vw - 2 * var(--pad)) / (var(--mw,8) * .78)));line-height:.96}
.d-ivoor .iv-l{display:block}
.d-ivoor .iv-t{position:relative;display:inline-block;padding:.06em .04em .02em 0}
.d-ivoor .iv-x{display:inline-block;clip-path:inset(-20% 100% -20% 0);transform:translateX(-2%);animation:iv-wipe 1.6s var(--slow) both;animation-delay:calc(.55s + var(--i,0) * 260ms)}
.d-ivoor .iv-t::after{content:"";position:absolute;top:4%;bottom:6%;left:0;width:100%;border-right:1px solid var(--sand);transform:scaleX(0);transform-origin:left;opacity:0;animation:iv-scan 1.6s var(--slow) both;animation-delay:calc(.55s + var(--i,0) * 260ms);pointer-events:none}
.d-ivoor .iv-up-in{animation:iv-rise 1.3s var(--ease) both;animation-delay:calc(1.2s + var(--i,0) * 120ms)}
.d-ivoor .iv-hero-row{display:grid;gap:30px 64px;padding-top:clamp(24px,3vw,40px);border-top:1px solid var(--lined)}
@media (min-width:1000px){.d-ivoor .iv-hero-row{grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);align-items:end}}
.d-ivoor .iv-lede{max-width:46ch;font-size:clamp(16px,1.25vw,20px);color:rgba(243,236,225,.86)}
.d-ivoor .iv-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:14px 28px;margin-top:28px}
.d-ivoor .iv-spec{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr))}
.d-ivoor .iv-spec div{display:grid;gap:6px;align-content:start;padding:4px 20px 6px;border-left:1px solid var(--lined)}
.d-ivoor .iv-spec dt{font-size:10.5px;font-weight:500;letter-spacing:.26em;text-transform:uppercase;color:var(--sand)}
.d-ivoor .iv-spec dd{margin:0;font-size:15px;line-height:1.5}
.d-ivoor .iv-spec a{display:inline-flex;min-height:32px;align-items:center}
.d-ivoor .iv-cue{position:absolute;right:var(--pad);bottom:clamp(40px,6vw,80px);display:none;writing-mode:vertical-rl;align-items:center;gap:16px;font-size:10px;font-weight:500;letter-spacing:.34em;text-transform:uppercase;color:var(--dimd)}
.d-ivoor .iv-cue::after{content:"";width:1px;height:70px;background:linear-gradient(var(--sand),transparent);transform-origin:top;animation:iv-cue 3.6s var(--ease) infinite}
@media (min-width:1300px){.d-ivoor .iv-cue{display:flex}.d-ivoor .iv-has-cue .iv-hero-row{margin-right:60px}}
.d-ivoor .iv-sec{position:relative;padding-block:var(--z-sec)}
.d-ivoor .is-light{--z-bg2:var(--cream2);--z-ink:var(--ch);--z-dim:var(--dimc);--z-line:var(--linec);--z-accent:var(--sand2);background:var(--cream);color:var(--ch)}
.d-ivoor .is-light .iv-kick{color:var(--sand2)}
.d-ivoor .is-light h2 em,.d-ivoor .is-light h3 em{color:var(--sand2)}
.d-ivoor .is-light .iv-lab{color:var(--dimc)}
.d-ivoor .is-deep{background:var(--deep)}
.d-ivoor .iv-head{display:grid;gap:22px;margin-bottom:clamp(48px,7vw,120px)}
.d-ivoor .iv-head>p:not(.iv-kick){max-width:54ch;color:var(--z-dim)}
@media (min-width:1000px){.d-ivoor .iv-head{grid-template-columns:minmax(200px,1fr) minmax(0,3.2fr);column-gap:48px}.d-ivoor .iv-head>*{grid-column:2}.d-ivoor .iv-head>.iv-kick{grid-column:1;grid-row:1/span 3;align-self:start;margin-top:1.1em}}
.d-ivoor .iv-about{display:grid;gap:clamp(48px,6vw,110px)}
@media (min-width:1000px){.d-ivoor .iv-about.has-pic{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);align-items:start}}
.d-ivoor .iv-about-copy{display:grid;gap:28px;align-content:start}
.d-ivoor .iv-about-copy .iv-head{margin-bottom:8px}
@media (min-width:1000px){.d-ivoor .iv-about.has-pic .iv-head{grid-template-columns:minmax(0,1fr)}.d-ivoor .iv-about.has-pic .iv-head>*{grid-column:1}.d-ivoor .iv-about.has-pic .iv-head>.iv-kick{grid-row:auto;margin:0}}
.d-ivoor .iv-lead{max-width:30ch;font-family:var(--disp);font-size:clamp(26px,2.5vw,42px);line-height:1.22;color:var(--z-ink)}
.d-ivoor .iv-cols{display:grid;gap:18px 48px;color:var(--z-dim)}
@media (min-width:760px){.d-ivoor .iv-cols.has-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-ivoor .iv-ticks{display:grid;border-top:1px solid var(--z-line)}
@media (min-width:640px){.d-ivoor .iv-ticks{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:40px}}
.d-ivoor .iv-ticks li{display:flex;align-items:baseline;gap:18px;padding:18px 0;border-bottom:1px solid var(--z-line);font-size:15px;letter-spacing:.04em}
.d-ivoor .iv-ticks li::before{content:"";flex:none;width:7px;height:7px;border:1px solid var(--z-accent);transform:translateY(-2px) rotate(45deg)}
.d-ivoor .iv-pic{position:relative;margin:0}
.d-ivoor .iv-pic-in{position:relative;overflow:hidden;aspect-ratio:4/5;background:var(--z-bg2);clip-path:inset(0 0 0 0);transition:clip-path 1.6s var(--slow)}
.demo-js .d-ivoor .iv-pic[data-rv]:not(.in) .iv-pic-in{clip-path:inset(100% 0 0 0)}
.demo-js .d-ivoor .iv-pic[data-rv]{opacity:1;transform:none}
.d-ivoor .iv-pic img{width:100%;height:112%;object-fit:cover;transform:translateY(calc(-6% + var(--p,0) * 5%)) scale(1.04);transition:scale 1.4s var(--ease)}
.d-ivoor .iv-pic:hover img{scale:1.04}
.d-ivoor .iv-pic::before{content:"";position:absolute;inset:-18px 18px 18px -18px;border:1px solid var(--z-line);transform:translate(calc(var(--p,0) * -14px),calc(var(--p,0) * 14px));pointer-events:none}
.d-ivoor .iv-pic figcaption{display:flex;justify-content:space-between;gap:16px;margin-top:16px}
@media (min-width:1000px){.d-ivoor .iv-about .iv-pic{position:sticky;top:110px;margin-top:120px}}
.d-ivoor .iv-seq-head{margin-bottom:0}
.d-ivoor .iv-seq .iv-head{margin-bottom:clamp(40px,5vw,80px)}
.d-ivoor .iv-stage{display:grid;gap:clamp(48px,8vw,90px)}
.d-ivoor .iv-slide{position:relative;display:grid;gap:22px}
.d-ivoor .iv-slide-pic{position:relative;overflow:hidden;aspect-ratio:4/5;background:var(--ch2)}
@media (min-width:600px){.d-ivoor .iv-slide-pic{aspect-ratio:16/10}}
.d-ivoor .iv-slide-pic img{width:100%;height:100%;object-fit:cover;transition:transform 1.4s var(--ease)}
.d-ivoor .iv-slide:hover .iv-slide-pic img{transform:scale(1.03)}
.d-ivoor .iv-slide-copy{display:grid;gap:12px;align-content:start}
.d-ivoor .iv-slide-copy small{font-size:11px;font-weight:500;letter-spacing:.28em;color:var(--sand)}
.d-ivoor .iv-slide-copy h3{font-size:clamp(34px,4.6vw,88px);line-height:.98}
.d-ivoor .iv-slide-copy p{max-width:48ch;color:rgba(243,236,225,.8)}
.d-ivoor .iv-meta{display:flex;flex-wrap:wrap;gap:8px 24px;padding-top:12px;font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
.d-ivoor .iv-meta span+span::before{content:"";display:inline-block;width:5px;height:5px;margin-right:24px;background:var(--sand);transform:translateY(-2px) rotate(45deg)}
.d-ivoor .iv-meta .iv-price{color:var(--sand)}
.d-ivoor .iv-seq-ui{display:none}
.d-ivoor .iv-seq.is-live .iv-track{height:calc(var(--n) * 100svh)}
.d-ivoor .iv-seq.is-live .iv-stage{position:sticky;top:0;display:block;height:100svh;overflow:hidden}
.d-ivoor .iv-seq.is-live .iv-slide{position:absolute;inset:0;display:block;clip-path:inset(calc((1 - var(--r,0)) * 100%) 0 0 0)}
.d-ivoor .iv-seq.is-live .iv-slide:first-child{clip-path:none}
.d-ivoor .iv-seq.is-live .iv-slide-pic{position:absolute;inset:0;aspect-ratio:auto}
.d-ivoor .iv-seq.is-live .iv-slide-pic img{transform:scale(calc(1.18 - var(--r,1) * .14 + var(--c,0) * .06));transition:none}
.d-ivoor .iv-seq.is-live .iv-slide-pic::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(13,12,11,.82),rgba(13,12,11,.25) 55%,rgba(13,12,11,.1)),linear-gradient(0deg,rgba(13,12,11,.6),transparent 40%);opacity:calc(1 - var(--c,0) * .2)}
.d-ivoor .iv-seq.is-live .iv-slide::after{content:"";position:absolute;inset:0;background:#0d0c0b;opacity:calc(var(--c,0) * .7);pointer-events:none}
.d-ivoor .iv-seq.is-live .iv-slide-copy{position:absolute;left:var(--pad);bottom:clamp(60px,9vh,120px);z-index:2;width:min(46vw,720px)}
.d-ivoor .iv-seq.is-live .iv-slide-copy>*{opacity:0;transform:translateY(30px);transition:opacity .6s var(--ease),transform .9s var(--ease)}
.d-ivoor .iv-seq.is-live .iv-slide.is-on .iv-slide-copy>*{opacity:1;transform:none}
.d-ivoor .iv-seq.is-live .iv-slide.is-on .iv-slide-copy>:nth-child(2){transition-delay:.08s}
.d-ivoor .iv-seq.is-live .iv-slide.is-on .iv-slide-copy>:nth-child(3){transition-delay:.16s}
.d-ivoor .iv-seq.is-live .iv-slide.is-on .iv-slide-copy>:nth-child(4){transition-delay:.24s}
.d-ivoor .iv-seq.is-live .iv-seq-ui{position:absolute;right:var(--pad);bottom:clamp(60px,9vh,120px);z-index:3;display:grid;gap:22px;justify-items:end;width:min(30vw,380px)}
.d-ivoor .iv-count{display:flex;align-items:baseline;gap:12px;font-family:var(--disp);font-size:20px;color:var(--dimd)}
.d-ivoor .iv-count b{font-weight:400;font-size:clamp(56px,5vw,88px);line-height:.8;color:var(--ivory)}
.d-ivoor .iv-prog{width:100%;height:1px;background:var(--lined)}
.d-ivoor .iv-prog i{display:block;height:100%;background:var(--sand);transform:scaleX(var(--q,0));transform-origin:left}
.d-ivoor .iv-seq-ui ol{display:grid;width:100%}
.d-ivoor .iv-seq-ui button{display:flex;justify-content:space-between;gap:16px;width:100%;min-height:40px;padding:8px 0;border:0;border-bottom:1px solid var(--lined);background:none;font-size:11.5px;font-weight:500;letter-spacing:.2em;text-align:left;text-transform:uppercase;color:var(--dimd);transition:color .4s,padding .5s var(--ease)}
.d-ivoor .iv-seq-ui button:hover,.d-ivoor .iv-seq-ui button[aria-current="true"]{color:var(--ivory);padding-left:10px}
.d-ivoor .iv-seq-ui button[aria-current="true"] span:last-child{color:var(--sand)}
.d-ivoor .iv-index{border-top:1px solid var(--z-line)}
.d-ivoor .iv-row{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr);gap:10px 18px;padding:clamp(26px,3vw,44px) 0;border-bottom:1px solid var(--z-line);transition:padding .6s var(--ease)}
@media (min-width:1000px){.d-ivoor .iv-row{grid-template-columns:80px minmax(0,1.3fr) minmax(0,1fr);align-items:baseline}.d-ivoor .iv-row:hover{padding-left:24px}}
.d-ivoor .iv-row::after{content:"";position:absolute;left:0;bottom:-1px;width:100%;height:1px;background:var(--z-accent);transform:scaleX(0);transform-origin:left;transition:transform .8s var(--slow)}
.d-ivoor .iv-row:hover::after{transform:none}
.d-ivoor .iv-row small{font-size:11px;font-weight:500;letter-spacing:.24em;color:var(--z-accent)}
.d-ivoor .iv-row h3{font-size:clamp(32px,3.8vw,64px);transition:color .4s}
.d-ivoor .iv-row:hover h3{color:var(--z-accent)}
.d-ivoor .iv-row-side{grid-column:2;display:grid;gap:10px;color:var(--z-dim)}
@media (min-width:1000px){.d-ivoor .iv-row-side{grid-column:3}}
.d-ivoor .iv-row .iv-meta{padding-top:0;color:var(--z-ink)}
.d-ivoor .iv-feat{display:grid;border-top:1px solid var(--z-line)}
@media (min-width:760px){.d-ivoor .iv-feat{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1100px){.d-ivoor .iv-feat.n3,.d-ivoor .iv-feat.n5,.d-ivoor .iv-feat.n6{grid-template-columns:repeat(3,minmax(0,1fr))}.d-ivoor .iv-feat.n4{grid-template-columns:repeat(4,minmax(0,1fr))}}
.d-ivoor .iv-feat li{position:relative;display:grid;gap:16px;align-content:start;padding:clamp(28px,3vw,48px) clamp(0px,2vw,36px) clamp(36px,4vw,60px);border-bottom:1px solid var(--z-line);transition:background-color .6s}
@media (min-width:760px){.d-ivoor .iv-feat li{border-right:1px solid var(--z-line)}}
.d-ivoor .iv-feat li::before{content:"";position:absolute;left:0;top:-1px;width:100%;height:1px;background:var(--z-accent);transform:scaleX(0);transform-origin:left;transition:transform .8s var(--slow)}
.d-ivoor .iv-feat li:hover{background:rgba(243,236,225,.03)}
.d-ivoor .iv-feat li:hover::before{transform:none}
.d-ivoor .iv-feat-top{display:flex;justify-content:space-between;align-items:center}
.d-ivoor .iv-feat b{font-family:var(--disp);font-weight:400;font-size:clamp(44px,3.6vw,64px);line-height:.8;color:var(--z-accent)}
.d-ivoor .iv-feat svg{width:26px;height:26px;stroke-width:1.1;color:var(--z-dim);transition:transform .8s var(--ease),color .4s}
.d-ivoor .iv-feat li:hover svg{transform:rotate(-12deg) scale(1.1);color:var(--z-accent)}
.d-ivoor .iv-feat h3{font-size:clamp(26px,2.2vw,36px)}
.d-ivoor .iv-feat p{color:var(--z-dim)}
.d-ivoor .iv-proc{display:grid;gap:40px}
@media (min-width:1000px){.d-ivoor .iv-proc{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(40px,6vw,120px)}}
.d-ivoor .iv-big{display:none}
@media (min-width:1000px){.d-ivoor .iv-big{position:sticky;top:14vh;display:grid;align-self:start;height:72vh;overflow:hidden}.d-ivoor .iv-big span{grid-area:1/1;align-self:center;font-family:var(--disp);font-size:clamp(220px,26vw,460px);line-height:.8;color:transparent;-webkit-text-stroke:1px rgba(199,171,130,.7);opacity:0;transform:translateY(40%);transition:opacity .8s var(--ease),transform 1.1s var(--ease)}.d-ivoor .iv-big span.is-on{opacity:1;transform:none}.d-ivoor .iv-big span.is-past{transform:translateY(-40%)}}
.d-ivoor .iv-steps{display:grid;border-top:1px solid var(--z-line)}
.d-ivoor .iv-step{display:grid;grid-template-columns:52px minmax(0,1fr);gap:8px 18px;padding:clamp(30px,3.4vw,52px) 0;border-bottom:1px solid var(--z-line);transition:opacity .6s}
@media (min-width:1000px){.d-ivoor .iv-step{min-height:36vh;align-content:center;opacity:.35}.d-ivoor .iv-step.is-on{opacity:1}}
.d-ivoor .iv-step small{font-family:var(--disp);font-size:30px;line-height:1;color:var(--z-accent)}
.d-ivoor .iv-step h3{font-size:clamp(30px,2.8vw,48px)}
.d-ivoor .iv-step p{grid-column:2;max-width:50ch;color:var(--z-dim)}
.d-ivoor .iv-gal-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:24px}
.d-ivoor .iv-slider{position:relative}
.d-ivoor .iv-shots{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-inline:var(--pad);scroll-padding-inline:var(--pad)}
.d-ivoor .iv-shots::-webkit-scrollbar{display:none}
.d-ivoor .iv-shot{position:relative;flex:none;width:min(84vw,1200px);margin:0;overflow:hidden;aspect-ratio:4/5;scroll-snap-align:start;background:var(--ch2)}
@media (min-width:700px){.d-ivoor .iv-shot{aspect-ratio:16/9}}
.d-ivoor .iv-shot img{width:100%;height:100%;object-fit:cover}
.d-ivoor .iv-shot figcaption{position:absolute;left:0;right:0;bottom:0;padding:48px 22px 18px;background:linear-gradient(transparent,rgba(13,12,11,.7));font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,236,225,.85)}
.d-ivoor .iv-slider.is-live .iv-shots{display:block;position:relative;width:min(100% - 2 * var(--pad),1680px - 2 * var(--pad));margin-inline:auto;padding:0;overflow:hidden;aspect-ratio:4/5;touch-action:pan-y;cursor:grab}
@media (min-width:700px){.d-ivoor .iv-slider.is-live .iv-shots{aspect-ratio:16/8}}
.d-ivoor .iv-slider.is-live .iv-shot{position:absolute;inset:0;width:auto;aspect-ratio:auto;visibility:hidden;clip-path:inset(0 0 0 100%);transition:clip-path 1.2s var(--slow),visibility 0s 1.2s}
.d-ivoor .iv-slider.is-live .iv-shot.from-l{clip-path:inset(0 100% 0 0)}
.d-ivoor .iv-slider.is-live .iv-shot.is-on{z-index:2;visibility:visible;clip-path:inset(0);transition:clip-path 1.2s var(--slow),visibility 0s}
.d-ivoor .iv-slider.is-live .iv-shot.is-prev{z-index:1;visibility:visible;clip-path:inset(0);transition:none}
.d-ivoor .iv-slider.is-live .iv-shot img{transform:scale(1.12);transition:transform 1.8s var(--ease)}
.d-ivoor .iv-slider.is-live .iv-shot.is-on img{transform:none}
.d-ivoor .iv-slider.is-live .iv-shot.is-prev img{transform:scale(.96);transition:transform 1.2s var(--slow)}
.d-ivoor .iv-ctrl{display:none}
.d-ivoor .iv-slider.is-live .iv-ctrl{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;width:min(100% - 2 * var(--pad),1680px - 2 * var(--pad));margin:22px auto 0}
.d-ivoor .iv-thumbs{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;max-width:100%}
.d-ivoor .iv-thumbs button{position:relative;flex:none;width:76px;height:52px;padding:0;border:0;overflow:hidden;background:var(--ch2);opacity:.45;transition:opacity .4s}
.d-ivoor .iv-thumbs button img{width:100%;height:100%;object-fit:cover}
.d-ivoor .iv-thumbs button::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--sand);transform:scaleX(0);transition:transform .6s var(--ease)}
.d-ivoor .iv-thumbs button:hover{opacity:.8}
.d-ivoor .iv-thumbs button[aria-pressed="true"]{opacity:1}
.d-ivoor .iv-thumbs button[aria-pressed="true"]::after{transform:none}
@media (max-width:699px){.d-ivoor .iv-thumbs{display:none}}
.d-ivoor .iv-arrows{display:flex;align-items:center;gap:18px}
.d-ivoor .iv-arrows .iv-count{font-size:16px}
.d-ivoor .iv-arrows .iv-count b{font-size:34px}
.d-ivoor .iv-arrows button{display:grid;place-items:center;width:56px;height:56px;padding:0;border:1px solid var(--lined);border-radius:50%;background:none;transition:background-color .4s,color .4s,border-color .4s}
.d-ivoor .iv-arrows button:hover{background:var(--ivory);color:var(--ch);border-color:var(--ivory)}
.d-ivoor .iv-arrows svg{width:22px;height:10px}
.d-ivoor .iv-arrows button:first-of-type svg{transform:scaleX(-1)}
.d-ivoor .iv-fillh{font-size:var(--z-statement);line-height:1.02;text-transform:uppercase;letter-spacing:.01em;text-wrap:balance;color:transparent;background:linear-gradient(90deg,var(--ivory) 0 50%,rgba(243,236,225,.17) 50% 100%) no-repeat;background-size:200% 100%;background-position-x:clamp(0%,calc(100% - (.75 - var(--p,0)) * 125%),100%);-webkit-background-clip:text;background-clip:text}
.d-ivoor .iv-fillh em{color:transparent}
.d-ivoor .iv-state{display:grid;justify-items:center;gap:36px;text-align:center}
.d-ivoor .iv-state .iv-fillh{max-width:22ch}
.d-ivoor .iv-diamond{width:9px;height:9px;border:1px solid var(--sand);transform:rotate(45deg)}
.d-ivoor .iv-cta{display:grid;gap:34px;justify-items:start}
@media (min-width:1000px){.d-ivoor .iv-cta{grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);align-items:end}.d-ivoor .iv-cta .iv-cta-side{justify-self:end;display:grid;gap:26px;justify-items:start;max-width:40ch}}
.d-ivoor .iv-cta>*{min-width:0}
.d-ivoor .iv-cta h2{font-size:min(clamp(44px,8vw,150px),calc((100vw - 2 * var(--pad)) / (var(--mw,8) * .8)));line-height:.9;text-transform:uppercase}
.d-ivoor .iv-cta-side p{color:var(--z-dim)}
.d-ivoor .iv-split{display:grid;gap:clamp(44px,6vw,110px)}
@media (min-width:1000px){.d-ivoor .iv-split{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.d-ivoor .iv-split.is-solo{grid-template-columns:minmax(0,1fr)}
@media (min-width:1000px){.d-ivoor .iv-split.is-solo .iv-split-copy{grid-template-columns:minmax(200px,1fr) minmax(0,3.2fr);column-gap:48px}.d-ivoor .iv-split.is-solo .iv-split-copy>*{grid-column:2}}
.d-ivoor .iv-split-copy{display:grid;gap:26px;align-content:start}
.d-ivoor .iv-split-copy .iv-head{margin-bottom:6px}
@media (min-width:1000px){.d-ivoor .iv-split .iv-head{grid-template-columns:minmax(0,1fr)}.d-ivoor .iv-split .iv-head>*{grid-column:1}.d-ivoor .iv-split .iv-head>.iv-kick{grid-row:auto;margin:0}}
.d-ivoor .iv-split-copy>p{max-width:48ch;color:var(--z-dim)}
.d-ivoor .iv-hours-box{display:grid;gap:22px}
.d-ivoor .iv-hours-box>div:first-child{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px}
.d-ivoor .is-light .iv-now{border-color:var(--linec);color:var(--ch)}
.d-ivoor .z-hours{border-top:1px solid var(--z-ink)}
.d-ivoor .z-hours div{align-items:baseline;padding:20px 0;transition:padding .5s var(--ease)}
.d-ivoor .z-hours dt{font-size:12px;font-weight:500;letter-spacing:.22em;text-transform:uppercase}
.d-ivoor .z-hours dd{font-family:var(--disp);font-size:clamp(22px,1.9vw,30px);color:var(--z-ink)}
.d-ivoor .z-hours div.is-today{padding-inline:18px;background:var(--z-ink);color:var(--cream)}
.d-ivoor .z-hours div.is-today dd{color:var(--z-accent)}
.d-ivoor .iv-sec:not(.is-light) .z-hours div.is-today{background:var(--ivory);color:var(--ch)}
.d-ivoor .iv-sec:not(.is-light) .z-hours div.is-today dd{color:var(--sand2)}
.d-ivoor .z-reach{gap:4px}
.d-ivoor .z-reach a{font-size:1.05em}
.d-ivoor .iv-form{position:relative;padding:clamp(28px,4vw,64px);border:1px solid var(--z-line);background:var(--z-bg2)}
.d-ivoor .iv-form::before{content:"";position:absolute;left:-1px;top:-1px;width:56px;height:56px;border-left:1px solid var(--sand);border-top:1px solid var(--sand);transition:width 1s var(--ease),height 1s var(--ease)}
.d-ivoor .iv-form:hover::before{width:96px;height:96px}
.d-ivoor .z-field label,.d-ivoor .z-chipset legend{font-size:10.5px;font-weight:500;letter-spacing:.26em}
.d-ivoor .z-field input,.d-ivoor .z-field select,.d-ivoor .z-field textarea{padding:12px 0;border-width:0 0 1px;border-color:var(--z-line);font-weight:300;transition:border-color .4s}
.d-ivoor .z-field select{background:transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23c7ab82'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E") no-repeat right 4px center}
.d-ivoor .z-field :focus-visible{outline:none;border-color:var(--sand)}
.d-ivoor .z-field input::-webkit-calendar-picker-indicator{filter:invert(.8)}
.d-ivoor .is-light .z-field input::-webkit-calendar-picker-indicator{filter:none}
.d-ivoor .form-status{border-color:var(--sand)}
.d-ivoor .z-sec.z-faq,.d-ivoor .z-sec.z-packages,.d-ivoor .z-sec.z-team{--z-bg2:var(--cream2);--z-ink:var(--ch);--z-dim:var(--dimc);--z-line:var(--linec);--z-accent:var(--sand2);background:var(--cream);color:var(--ch)}
.d-ivoor .z-sec.z-faq .iv-kick,.d-ivoor .z-sec.z-packages .iv-kick,.d-ivoor .z-sec.z-team .iv-kick{color:var(--sand2)}
.d-ivoor .z-acc summary{font-family:var(--disp);font-size:clamp(24px,2.3vw,38px);line-height:1.12;transition:color .3s,padding .5s var(--ease)}
.d-ivoor .z-acc summary:hover{color:var(--z-accent);padding-left:10px}
.d-ivoor .z-acc summary i{width:18px;height:18px}
.d-ivoor .z-acc details[open] summary{color:var(--z-accent)}
.d-ivoor .z-card{border-color:var(--z-line);background:transparent;transition:background-color .5s,transform .6s var(--ease)}
.d-ivoor .z-card:hover{transform:translateY(-6px)}
.d-ivoor .z-card h3{font-size:clamp(30px,2.6vw,42px)}
.d-ivoor .z-pack.is-featured{background:var(--ch);color:var(--ivory);--z-ink:var(--ivory);--z-dim:var(--dimd);--z-line:var(--lined);--z-accent:var(--sand)}
.d-ivoor .z-pack-price b{font-size:clamp(40px,3.6vw,60px)}
.d-ivoor .z-tag{font-weight:500;letter-spacing:.26em}
.d-ivoor .z-team .z-grid h3{font-size:clamp(28px,2.4vw,38px)}
.d-ivoor .z-team .z-pic img{filter:grayscale(1);transition:filter .9s var(--ease),transform 1.2s var(--ease)}
.d-ivoor .z-team li:hover .z-pic img{filter:none;transform:scale(1.04)}
.d-ivoor .z-quotes blockquote>p{font-size:clamp(24px,2.2vw,34px)}
.d-ivoor .z-steps small,.d-ivoor .z-rows small{font-family:var(--disp);font-size:24px;letter-spacing:0}
.d-ivoor .z-channel{transition:border-color .4s,background-color .4s}
.d-ivoor .z-channel:hover{background:rgba(243,236,225,.04)}
.d-ivoor .z-channel h3{font-size:clamp(26px,2.2vw,34px)}
.d-ivoor .z-ico{border-color:var(--z-line)}
.d-ivoor .z-ico svg{stroke-width:1.2}
.d-ivoor .z-showcase h2{font-size:clamp(46px,7vw,132px);text-transform:uppercase;line-height:.92}
.d-ivoor .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(13,12,11,.1),rgba(13,12,11,.82))}
.d-ivoor .z-show-media img{transform:translateY(calc(var(--p,0) * -6%)) scale(1.06)}
.d-ivoor .z-ba{border:1px solid var(--z-line)}
.d-ivoor .iv-foot{position:relative;padding:clamp(90px,10vw,160px) 0 150px;background:var(--deep);color:var(--ivory);overflow:hidden}
.d-ivoor .iv-foot-top{display:grid;gap:32px;padding-bottom:clamp(48px,6vw,90px)}
@media (min-width:1000px){.d-ivoor .iv-foot-top{grid-template-columns:minmax(0,1.6fr) auto;align-items:end}}
.d-ivoor .iv-foot-top p{max-width:20ch;font-family:var(--disp);font-size:clamp(36px,4.6vw,80px);line-height:1}
.d-ivoor .iv-mark{display:inline-block;margin-block:clamp(24px,4vw,56px);font-family:var(--disp);font-size:18vw;line-height:.8;letter-spacing:.02em;text-transform:uppercase;white-space:nowrap;color:var(--ivory)}
.d-ivoor .iv-mark span{display:inline-block;transition:transform 1.4s var(--ease),opacity 1.2s var(--ease);transition-delay:calc(var(--i,0) * 45ms)}
.demo-js .d-ivoor .iv-mark[data-rv]{opacity:1;transform:none}
.demo-js .d-ivoor .iv-mark[data-rv]:not(.in) span{opacity:0;transform:translateY(60%)}
.d-ivoor .iv-foot-grid{display:grid;gap:36px;padding-top:clamp(36px,4vw,56px);border-top:1px solid var(--lined);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-ivoor .iv-foot-grid h3{margin-bottom:16px;font-family:var(--sans);font-size:10.5px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:var(--sand)}
.d-ivoor .iv-foot-grid a,.d-ivoor .iv-foot-grid span{display:block;padding:5px 0;color:rgba(243,236,225,.82)}
.d-ivoor .iv-foot-grid a{transition:color .3s,transform .5s var(--ease)}
.d-ivoor .iv-foot-grid a:hover{color:var(--ivory);transform:translateX(6px)}
.d-ivoor .iv-foot-grid p{color:var(--dimd)}
.d-ivoor .iv-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:64px;font-size:12px;letter-spacing:.06em;color:rgba(243,236,225,.5)}
@keyframes iv-slit{to{clip-path:inset(0)}}
@keyframes iv-zoom{from{transform:scale(1.28)}to{transform:scale(1)}}
@keyframes iv-wipe{to{clip-path:inset(-20% -2% -20% 0);transform:none}}
@keyframes iv-scan{0%{opacity:1;transform:scaleX(0)}82%{opacity:1;transform:scaleX(1)}100%{opacity:0;transform:scaleX(1)}}
@keyframes iv-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes iv-sx{from{transform:scaleX(0)}to{transform:none}}
@keyframes iv-sy{from{transform:scaleY(0)}to{transform:none}}
@keyframes iv-draw{to{stroke-dashoffset:0}}
@keyframes iv-cue{0%{transform:scaleY(0);opacity:1}55%{transform:scaleY(1);opacity:1}100%{transform:scaleY(1);opacity:0}}
@media (prefers-reduced-motion:reduce){.d-ivoor .iv-hero-media{clip-path:none}.d-ivoor .iv-x{clip-path:none;transform:none}.d-ivoor .iv-t::after{display:none}.d-ivoor .iv-facade *{stroke-dashoffset:0}.d-ivoor .iv-fillh{background:none;color:var(--ivory)}.d-ivoor .iv-fillh em{color:var(--sand)}.d-ivoor .iv-cue::after{animation:none}.d-ivoor .iv-pic img{transform:none}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The stylesheet in two parts: rules that restyle the kit's shared sections (.z-*, forms) go
 * after the shared defaults (BASE_CSS), so they win; everything else comes before.
 */
function partition(all: string): [own: string, kit: string] {
  const own: string[] = [];
  const kit: string[] = [];
  let depth = 0;
  let start = 0;
  for (let n = 0; n < all.length; n++) {
    if (all[n] === "{") depth++;
    else if (all[n] === "}" && --depth === 0) {
      const block = all.slice(start, n + 1);
      (/\.z-|form-status|form-note/.test(block) && !block.startsWith("@keyframes") ? kit : own).push(block);
      start = n + 1;
    }
  }
  return [own.join(""), kit.join("")];
}
const [OWN, KIT] = partition(CSS);

/**
 * The header steps aside while reading down and returns on the way up; the property sequence
 * follows the scroll (each slide wipes up over the last); the slider wipes between photographs
 * (buttons, thumbnails, arrow keys, swipe); the process keeps its step number in view; the
 * footer name is set to the full width.
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-ivoor');if(!root)return;var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var last=W.scrollY;function hdr(){var y=W.scrollY;if(y>320&&y>last+6)root.classList.add('iv-up');else if(y<last-6||y<320)root.classList.remove('iv-up');last=y}
var seqs=q('[data-seq]').map(function(s){return{el:s,track:s.querySelector('.iv-track'),slides:q('.iv-slide',s),btns:q('[data-go]',s),now:s.querySelector('[data-now-n]'),bar:s.querySelector('.iv-prog i'),on:-1}});
var mq=W.matchMedia?W.matchMedia('(min-width: 900px)'):null;
function live(){var ok=!reduce&&mq&&mq.matches;seqs.forEach(function(S){S.el.classList.toggle('is-live',!!ok);if(!ok)S.slides.forEach(function(x){x.classList.remove('is-on')})});return ok}
var isLive=live();if(mq&&mq.addEventListener)mq.addEventListener('change',function(){isLive=live();tick()});
function seq(){if(!isLive)return;var vh=W.innerHeight;seqs.forEach(function(S){var r=S.track.getBoundingClientRect(),n=S.slides.length,span=r.height-vh;if(r.bottom<-vh||r.top>vh*2)return;var p=Math.max(0,Math.min(1,-r.top/Math.max(1,span))),f=p*(n-1);
S.slides.forEach(function(x,k){var rv=k===0?1:Math.max(0,Math.min(1,f-(k-1)));var nx=k+1<n?Math.max(0,Math.min(1,f-k)):0;x.style.setProperty('--r',rv.toFixed(4));x.style.setProperty('--c',nx.toFixed(4))});
var on=Math.min(n-1,Math.floor(f+.45));if(on!==S.on){S.on=on;S.slides.forEach(function(x,k){x.classList.toggle('is-on',k===on)});S.btns.forEach(function(b,k){b.setAttribute('aria-current',k===on?'true':'false')});if(S.now)S.now.textContent=(on<9?'0':'')+(on+1)}if(S.bar)S.bar.style.setProperty('--q',p.toFixed(4))})}
seqs.forEach(function(S){S.btns.forEach(function(b,k){b.addEventListener('click',function(){var r=S.track.getBoundingClientRect(),n=S.slides.length,span=r.height-W.innerHeight;W.scrollTo({top:W.scrollY+r.top+span*(n>1?k/(n-1):0)+2,behavior:reduce?'auto':'smooth'})})})});
var raf=0;function tick(){raf=0;hdr();seq()}function onS(){if(!raf)raf=requestAnimationFrame(tick)}W.addEventListener('scroll',onS,{passive:true});W.addEventListener('resize',onS);tick();
q('[data-slider]').forEach(function(sl){var shots=q('.iv-shot',sl),th=q('.iv-thumbs button',sl),nb=sl.querySelector('[data-now-n]'),cur=0,box=sl.querySelector('.iv-shots');if(shots.length<2)return;sl.classList.add('is-live');
function go(n,dir){n=(n+shots.length)%shots.length;if(n===cur)return;var prev=shots[cur];shots.forEach(function(s){s.classList.remove('is-prev','from-l')});var nx=shots[n];if(dir<0){nx.classList.add('from-l')}prev.classList.remove('is-on');prev.classList.add('is-prev');void nx.offsetWidth;nx.classList.add('is-on');shots.forEach(function(s,k){s.setAttribute('aria-hidden',k===n?'false':'true')});th.forEach(function(b,k){b.setAttribute('aria-pressed',k===n?'true':'false')});if(nb)nb.textContent=(n<9?'0':'')+(n+1);cur=n}
shots.forEach(function(s,k){s.classList.toggle('is-on',k===0);s.setAttribute('aria-hidden',k===0?'false':'true')});
th.forEach(function(b,k){b.addEventListener('click',function(){go(k,k<cur?-1:1)})});
q('[data-dir]',sl).forEach(function(b){b.addEventListener('click',function(){var v=+b.getAttribute('data-dir');go(cur+v,v)})});
sl.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(cur+1,1)}if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1,-1)}});
var sx=null;box.addEventListener('pointerdown',function(e){sx=e.clientX});box.addEventListener('pointerup',function(e){if(sx===null)return;var dx=e.clientX-sx;sx=null;if(Math.abs(dx)>40)go(cur+(dx<0?1:-1),dx<0?1:-1)});box.addEventListener('pointercancel',function(){sx=null})});
var steps=q('[data-step]'),nums=q('.iv-big span');if(steps.length&&'IntersectionObserver' in W){var sio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var k=steps.indexOf(e.target);steps.forEach(function(s,j){s.classList.toggle('is-on',j===k)});nums.forEach(function(x,j){x.classList.toggle('is-on',j===k);x.classList.toggle('is-past',j<k)})})},{rootMargin:'-45% 0px -45% 0px'});steps.forEach(function(s){sio.observe(s)})}
function fit(){q('[data-fit]').forEach(function(el){var cs=getComputedStyle(el.parentNode),w=el.parentNode.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);el.style.fontSize='100px';var m=el.getBoundingClientRect().width;if(m>0)el.style.fontSize=Math.min(w*.3,100*w/m*.995)+'px'})}fit();W.addEventListener('resize',fit);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(fit)})();`;

type IconName = Parameters<typeof Icon>[0]["name"];

const COPY: Record<string, { prev: string; next: string; photo: string; scroll: string; of: string }> = {
  nl: { prev: "Vorige foto", next: "Volgende foto", photo: "Foto", scroll: "Scroll", of: "van" },
  en: { prev: "Previous photo", next: "Next photo", photo: "Photo", scroll: "Scroll", of: "of" },
  de: { prev: "Vorheriges Foto", next: "Nächstes Foto", photo: "Foto", scroll: "Scrollen", of: "von" },
  fr: { prev: "Photo précédente", next: "Photo suivante", photo: "Photo", scroll: "Défiler", of: "sur" },
};
const copy = (c: Ctx) => COPY[c.spec.meta.lang] ?? COPY.nl;
const two = (n: number) => String(n).padStart(2, "0");
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const Arrow = () => (
  <svg viewBox="0 0 28 10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    <path d="M0 5h26M22 1l4 4-4 4" />
  </svg>
);

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="iv-kick" data-rv>
    {children}
  </p>
);

function Head({ kicker, title, intro, id }: { kicker?: string; title: string; intro?: string; id?: string }) {
  return (
    <header className="iv-head">
      {kicker ? <Kick>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

/** Abstract elevation of a row of tall windows: the opening without photographs. Shape only, no picture of anything real. */
function Facade() {
  const cols = 5;
  const parts: ReactNode[] = [];
  let k = 0;
  for (let n = 0; n < cols; n++) {
    const x = 40 + n * 180;
    parts.push(<path key={`a${n}`} d={`M${x} 820 V250 A70 70 0 0 1 ${x + 140} 250 V820`} pathLength={1} style={i(k++)} />);
    parts.push(<line key={`b${n}`} x1={x + 70} y1={182} x2={x + 70} y2={820} pathLength={1} style={i(k++)} />);
    parts.push(<line key={`c${n}`} x1={x} y1={520} x2={x + 140} y2={520} pathLength={1} style={i(k++)} />);
  }
  parts.push(<line key="base" x1={0} y1={860} x2={960} y2={860} pathLength={1} style={i(k++)} />);
  parts.push(<rect key="frame" x={20} y={120} width={920} height={740} pathLength={1} style={i(k++)} />);
  return (
    <svg className="iv-facade" viewBox="0 0 960 880" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
      {parts}
    </svg>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="iv-hdr hdr">
        <div className="iv-wrap iv-bar">
          <a href="#top" className={`iv-logo${c.name.length > 16 ? " is-long" : ""}`} aria-label={c.name}>
            <i aria-hidden="true" />
            <b>{c.name}</b>
          </a>
          <nav aria-label={c.t.menu} className="iv-links" data-nav>
            {c.nav.slice(0, 3).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="iv-right">
            <a href={cta.href} className="iv-text iv-hcta">
              {cta.label}
            </a>
            <button type="button" className="iv-burger menu-btn" aria-expanded="false" aria-controls="site-menu" aria-label={c.t.menu}>
              <span data-label data-open={c.t.menu} data-close={c.t.close}>
                {c.t.menu}
              </span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div id="site-menu" className="iv-menu" data-nav inert>
        <div className="iv-lv" aria-hidden="true">
          {[0, 1, 2, 3].map((n) => (
            <i key={n} style={i(n)} />
          ))}
        </div>
        <div className="iv-menu-in">
          <nav aria-label={c.t.menu}>
            {c.nav.map((n, k) => (
              <a key={n.id} href={`#${n.id}`} style={i(k)}>
                <small>{two(k + 1)}</small>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="iv-menu-foot">
            <p>
              <span className="iv-lab">{c.t.contact}</span>
              {b.address ?? b.city}
              {b.phone ? (
                <>
                  <br />
                  <a href={tel(b.phone)}>{b.phone}</a>
                </>
              ) : null}
              {b.email ? (
                <>
                  <br />
                  <a href={`mailto:${b.email}`}>{b.email}</a>
                </>
              ) : null}
            </p>
            {b.openingHours?.length ? (
              <p>
                <span className="iv-lab">{c.t.hours}</span>
                {b.openingHours.slice(0, 4).map((l) => (
                  <span key={l} style={{ display: "block" }}>
                    {l}
                  </span>
                ))}
              </p>
            ) : null}
            <p>
              <a href={cta.href} className="iv-text">
                {cta.label}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 42 ? "is-s" : plain.length > 22 ? "is-m" : undefined;
  const longest = Math.max(...plain.split(/\s+/).map((w) => w.length), 6);
  const { lines } = splitLines(hero.headline, plain.length > 30 ? 3 : 2);
  const facts = heroFacts(c);
  return (
    <section className={`iv-hero${p ? "" : " is-plain"} iv-has-cue`}>
      {p ? (
        <div className="iv-hero-media" data-px>
          <div className="iv-hero-zoom">
            <Pic p={p} eager sizes="100vw" />
          </div>
        </div>
      ) : (
        <Facade />
      )}
      <div className="iv-frame" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="iv-wrap iv-hero-in">
        <div className="iv-hero-top iv-up-in">
          {hero.eyebrow ? <p className="iv-kick">{hero.eyebrow}</p> : null}
          <NowBadge c={c} className="iv-now" />
        </div>
        <h1 className={size} style={css({ "--mw": longest })}>
          {lines.map((l, n) => (
            <span key={n} className="iv-l">
              <span className="iv-t" style={i(n)}>
                <span className="iv-x" style={i(n)}>
                  {l}
                </span>
              </span>
            </span>
          ))}
        </h1>
        <div className="iv-hero-row">
          <div className="iv-up-in" style={i(1)}>
            <p className="iv-lede">{hero.subheadline}</p>
            <div className="iv-ctas">
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
            <dl className="iv-spec iv-up-in" style={i(2)}>
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
      <span className="iv-cue" aria-hidden="true">
        {copy(c).scroll}
      </span>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="iv-foot">
      <div className="iv-wrap">
        <div className="iv-foot-top">
          <p data-rv>{em(c.spec.business.tagline || c.spec.hero.headline)}</p>
          <div data-rv>
            <Btn c={c} href={cta.href}>
              {cta.label} <Arrow />
            </Btn>
          </div>
        </div>
        <span className="iv-mark" data-rv data-fit aria-hidden="true">
          {[...c.name].map((ch, n) => (
            <span key={n} style={i(n)}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </span>
        <div className="iv-foot-grid">
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
            {b.address ? <span>{b.address}</span> : b.city ? <span>{b.city}</span> : null}
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
          {c.spec.footer.blurb ? (
            <div>
              <h3>{c.name}</h3>
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
        </div>
        <Legal c={c} className="iv-legal" />
      </div>
    </footer>
  );
}

type Item = { title: string; text?: string; price?: string | null; duration?: string | null };

function Meta({ it }: { it: Item }) {
  if (!it.price && !it.duration) return null;
  return (
    <p className="iv-meta">
      {it.duration ? <span>{it.duration}</span> : null}
      {it.price ? <span className="iv-price">{it.price}</span> : null}
    </p>
  );
}

/** The offer as an index of large names: used when there are no photographs to show. */
function Index({ items }: { items: Item[] }) {
  return (
    <ol className="iv-index">
      {items.map((it, n) => (
        <li key={n} className="iv-row" data-rv style={i(n % 4)}>
          <small>{two(n + 1)}</small>
          <h3>{it.title}</h3>
          <div className="iv-row-side">
            {it.text ? <p>{it.text}</p> : null}
            <Meta it={it} />
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Full-screen sequence: on wide screens it is pinned and every slide wipes up over the previous one. */
function Sequence({ id, head, items, pics }: { id: string; head: ReactNode; items: Item[]; pics: Photo[] }) {
  const n = items.length;
  return (
    <section className="iv-sec iv-seq is-deep" id={id} data-seq style={css({ "--n": n })}>
      <div className="iv-wrap">{head}</div>
      <div className="iv-track">
        <div className="iv-stage">
          {items.map((it, k) => (
            <article key={k} className={`iv-slide${k === 0 ? " is-on" : ""}`} style={css({ "--r": k === 0 ? 1 : 0 })}>
              <figure className="iv-slide-pic">
                <Pic p={pics[k]} sizes="100vw" />
              </figure>
              <div className="iv-slide-copy iv-wrap">
                <small>
                  {two(k + 1)} — {two(n)}
                </small>
                <h3>{it.title}</h3>
                {it.text ? <p>{it.text}</p> : null}
                <Meta it={it} />
              </div>
            </article>
          ))}
          <div className="iv-seq-ui">
            <p className="iv-count" aria-hidden="true">
              <b data-now-n>01</b> / {two(n)}
            </p>
            <div className="iv-prog" aria-hidden="true">
              <i />
            </div>
            <ol>
              {items.map((it, k) => (
                <li key={k}>
                  <button type="button" data-go aria-current={k === 0 ? "true" : "false"}>
                    <span>{it.title}</span>
                    <span>{two(k + 1)}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Offer({ c, id, kicker, title, intro, items, photos }: { c: Ctx; id: string; kicker: string; title: string; intro?: string; items: Item[]; photos: (Photo | null)[] }) {
  const head = <Head kicker={kicker} title={title} intro={intro} />;
  if (items.length >= 2 && items.length <= 8 && photos.every(Boolean)) return <Sequence id={id} head={head} items={items} pics={photos as Photo[]} />;
  return (
    <section className="iv-sec" id={id}>
      <div className="iv-wrap">
        {head}
        <Index items={items} />
      </div>
    </section>
  );
}

function Split({ c, id, light, kicker, title, body, side, children }: { c: Ctx; id: string; light?: boolean; kicker: string; title: string; body?: string; side?: ReactNode; children?: ReactNode }) {
  return (
    <section className={`iv-sec${light ? " is-light" : ""}`} id={id}>
      <div className={`iv-wrap iv-split${children ? "" : " is-solo"}`}>
        <div className="iv-split-copy">
          <Head kicker={kicker} title={title} />
          {body ? <p data-rv>{body}</p> : null}
          {side}
        </div>
        {children}
      </div>
    </section>
  );
}

export const ivoor: Family = {
  key: "ivoor",
  root: "d-ivoor",
  fonts: ["Italiana", "Archivo"],
  themeColor: "#141311",
  accent: "#c7ab82",
  onAccent: "#141311",
  css: OWN,
  extra: KIT,
  js: JS + TODAY_JS,
  cls: { wrap: "iv-wrap", eyebrow: "iv-kick", btn: "iv-fill", btnAlt: "iv-line", btnText: "iv-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="iv-sec is-light" id={s.id}>
          <div className={`iv-wrap iv-about${p ? " has-pic" : ""}`}>
            <div className="iv-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="iv-lead" data-rv>
                {first}
              </p>
              {rest.length > 0 && (
                <div className={`iv-cols${rest.length > 1 ? " has-2" : ""}`} data-rv>
                  {rest.map((x, n) => (
                    <p key={n}>{x}</p>
                  ))}
                </div>
              )}
              {s.highlights.length > 0 && (
                <ul className="iv-ticks" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
            {p ? (
              <figure className="iv-pic" data-rv data-px>
                <div className="iv-pic-in">
                  <Pic p={p} sizes="(min-width: 1000px) 38vw, 100vw" />
                </div>
                {c.spec.business.city ? (
                  <figcaption className="iv-lab">
                    <span>{c.name}</span>
                    <span>{c.spec.business.city}</span>
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => {
      const items = s.items.map((it) => ({ title: it.title, text: it.description, price: it.price, duration: it.duration }));
      const photos = s.items.map((_, n) => c.photo(`art:svc${n}`));
      return <Offer c={c} id={s.id} kicker={c.t.kick.services} title={s.title} intro={s.intro} items={items} photos={photos} />;
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="iv-sec" id={s.id}>
          <div className="iv-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            {cats.map((cat, n) => (
              <div key={n} style={{ marginTop: n ? 72 : 0 }}>
                <p className="iv-kick" data-rv style={{ marginBottom: 20 }}>
                  {cat.name}
                </p>
                <Index items={cat.items.map((d) => ({ title: d.name, text: d.description, price: d.price }))} />
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
    features: (s, c) => (
      <section className="iv-sec" id={s.id}>
        <div className="iv-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className={`iv-feat n${s.items.length}`}>
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <div className="iv-feat-top">
                  <b>{ROMAN[n] ?? n + 1}</b>
                  <Icon name={it.icon as IconName} />
                </div>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    process: (s, c) => (
      <section className="iv-sec is-deep" id={s.id}>
        <div className="iv-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <div className="iv-proc">
            <div className="iv-big" aria-hidden="true">
              {s.steps.map((_, n) => (
                <span key={n} className={n === 0 ? "is-on" : undefined}>
                  {two(n + 1)}
                </span>
              ))}
            </div>
            <ol className="iv-steps">
              {s.steps.map((st, n) => (
                <li key={n} className={`iv-step${n === 0 ? " is-on" : ""}`} data-step data-rv>
                  <small>{two(n + 1)}</small>
                  <h3>{st.title}</h3>
                  <p>{st.description}</p>
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
      const l = copy(c);
      return (
        <section className="iv-sec" id={s.id}>
          <div className="iv-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
          </div>
          <div className="iv-slider" data-slider data-rv>
            <div className="iv-shots" aria-roledescription="carousel">
              {pics.map((p, n) => (
                <figure key={n} className="iv-shot">
                  <Pic p={p} sizes="(min-width: 900px) 90vw, 100vw" />
                  <figcaption>
                    {two(n + 1)} — {p.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="iv-ctrl">
              <div className="iv-thumbs">
                {pics.map((p, n) => (
                  <button key={n} type="button" aria-pressed={n === 0} aria-label={`${l.photo} ${n + 1} ${l.of} ${pics.length}`}>
                    <img src={p.src.replace(/([?&])w=\d+/, "$1w=240")} alt={p.alt} loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
              <div className="iv-arrows">
                <p className="iv-count" aria-hidden="true">
                  <b data-now-n>01</b> / {two(pics.length)}
                </p>
                <button type="button" data-dir="-1" aria-label={l.prev}>
                  <Arrow />
                </button>
                <button type="button" data-dir="1" aria-label={l.next}>
                  <Arrow />
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    },
    statement: (s, c) => (
      <section className="iv-sec" id={s.id}>
        <div className="iv-wrap iv-state">
          <span className="iv-diamond" aria-hidden="true" />
          <h2 className="iv-fillh" data-px>
            {em(s.title)}
          </h2>
          {s.note ? (
            <p className="iv-kick" data-rv>
              {s.note}
            </p>
          ) : null}
        </div>
      </section>
    ),
    cta: (s, c) => (
      <section className="iv-sec is-deep" id={s.id}>
        <div className="iv-wrap iv-cta">
          <h2 data-rv style={css({ "--mw": Math.max(...s.title.replace(/\*/g, "").split(/\s+/).map((w) => w.length), 6) })}>
            {em(s.title)}
          </h2>
          <div className="iv-cta-side" data-rv>
            {s.body ? <p>{s.body}</p> : null}
            <Btn c={c} href={s.cta.href}>
              {s.cta.label} <Arrow />
            </Btn>
          </div>
        </div>
      </section>
    ),
    hours: (s, c) => (
      <Split c={c} id={s.id} light kicker={c.t.kick.hours} title={s.title} body={s.note || undefined} side={<Reach c={c} />}>
        <div className="iv-hours-box" data-rv>
          <div>
            <span className="iv-lab">{c.t.hours}</span>
            <NowBadge c={c} className="iv-now" />
          </div>
          {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
        </div>
      </Split>
    ),
    contact: (s, c) => (
      <Split
        c={c}
        id={s.id}
        kicker={c.t.kick.contact}
        title={s.title}
        body={s.body || undefined}
        side={
          <>
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
          </>
        }
      >
        {s.showForm ? (
          <div className="iv-form" data-rv>
            <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
          </div>
        ) : null}
      </Split>
    ),
    booking: (s, c) => (
      <Split
        c={c}
        id={s.id}
        kicker={c.t.kick.booking}
        title={s.title}
        body={s.body || undefined}
        side={
          <>
            <Hours c={c} />
            <Reach c={c} />
          </>
        }
      >
        <div className="iv-form" data-rv>
          <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
        </div>
      </Split>
    ),
  },
};
