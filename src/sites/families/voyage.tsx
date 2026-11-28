import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type HeadProps, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Voyage: an original template (no portfolio demo). A glossy travel magazine: off-white paper,
 * deep ink and one sun-faded lagoon accent, a high-contrast display serif with a reading serif
 * and a condensed caption sans. The opening is a magazine cover whose masthead rises letter by
 * letter while the cover photograph zooms out of its frame; every section is a spread with a
 * running head, a chapter numeral and a folio; the story is set in columns with a drop cap; the
 * process is an itinerary that scrolls sideways along a route; the gallery is a photo essay with
 * figure captions and the request form is a reply card with a stamp. Made for travel agencies,
 * tour operators, guides, photographers, galleries and other businesses that sell a story.
 */

const SHEET = `
.d-voyage{--paper:#f3f0e9;--paper-2:#e8e3d8;--white:#fbfaf6;--ink:#121519;--ink-2:#262b31;--dim:#5b6066;--line:rgba(18,21,25,.14);--sun:#86aeb0;--sun-d:#3e6a6e;--sun-l:#d5e3e1;--pad:clamp(20px,4.6vw,72px);--ease:cubic-bezier(.19,1,.22,1);--io:cubic-bezier(.77,0,.18,1);--play:"Playfair Display",Georgia,serif;--read:"Newsreader",Georgia,serif;--cap:"Instrument Sans",system-ui,sans-serif;--z-bg2:var(--white);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--sun-d);--z-on-accent:#fff;--z-display:var(--play);--z-display-weight:400;--z-radius:0;--z-field-radius:0;--z-ico-radius:0;--z-h3:clamp(22px,1.9vw,28px);--z-statement:clamp(34px,5vw,82px);--z-sec:clamp(88px,11vw,170px);background:var(--paper);color:var(--ink);font-family:var(--read);font-optical-sizing:auto;font-size:clamp(17px,1.12vw,19.5px);line-height:1.62}
.d-voyage h1,.d-voyage h2,.d-voyage h3{font-family:var(--play);font-weight:400;line-height:1;letter-spacing:-.022em}
.d-voyage h1 em,.d-voyage h2 em,.d-voyage h3 em{font-style:italic;color:var(--sun-d)}
.d-voyage h2{font-size:clamp(40px,5.8vw,96px)}
.d-voyage h2.is-long{font-size:clamp(32px,4vw,62px);line-height:1.04}
.d-voyage .vy-wrap{position:relative;width:min(100%,1440px);margin-inline:auto;padding-inline:var(--pad)}
.d-voyage ::selection{background:var(--sun);color:var(--ink)}
.d-voyage .vy-cap{font-family:var(--cap);font-stretch:82%;font-size:11.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
.d-voyage .vy-kick{font-family:var(--cap);font-stretch:82%;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--sun-d)}
.d-voyage .vy-m{display:inline-block;overflow:hidden;padding:.06em .02em .12em;margin:-.06em -.02em -.12em;vertical-align:top}
.d-voyage .vy-m>span{display:inline-block;transition:transform 1.25s var(--ease);transition-delay:calc(var(--i,0) * 55ms)}
.demo-js .d-voyage .vy-h2[data-rv]{opacity:1;transform:none}
.demo-js .d-voyage .vy-h2[data-rv] .vy-m>span{transform:translateY(108%)}
.demo-js .d-voyage .vy-h2[data-rv].in .vy-m>span{transform:none}
.d-voyage .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:54px;padding:0 30px;border-radius:999px;font-family:var(--cap);font-stretch:85%;font-size:13.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;overflow:hidden;isolation:isolate;transition:background-color .5s var(--ease),color .5s var(--ease),border-color .5s,transform .6s var(--ease)}
.d-voyage .btn span{position:relative;display:inline-flex;align-items:center;gap:12px}
.d-voyage .btn svg{width:17px;height:17px;transition:transform .5s var(--ease)}
.d-voyage .btn:hover svg{transform:translate(3px,-3px)}
.d-voyage .vy-fill{background:var(--ink);color:var(--paper)}
.d-voyage .vy-fill::before{content:"";position:absolute;left:50%;top:50%;z-index:-1;width:140%;aspect-ratio:1;border-radius:50%;background:var(--sun);transform:translate(-50%,-50%) scale(0);transition:transform .7s var(--ease)}
.d-voyage .vy-fill:hover{color:var(--ink)}
.d-voyage .vy-fill:hover::before{transform:translate(-50%,-50%) scale(1)}
.d-voyage .vy-line{border:1px solid currentColor;background:transparent;color:inherit}
.d-voyage .vy-line:hover{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.d-voyage .vy-text{position:relative;display:inline-flex;align-items:center;gap:10px;min-height:44px;font-family:var(--cap);font-stretch:85%;font-size:13.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
.d-voyage .vy-text::after{content:"";position:absolute;left:0;right:0;bottom:9px;height:1px;background:currentColor;transform-origin:100% 50%;transition:transform .6s var(--ease)}
.d-voyage .vy-text:hover::after{transform:scaleX(0)}
.d-voyage .vy-text svg{width:16px;height:16px}
.d-voyage .vy-hdr{position:fixed;inset:0 0 auto;z-index:60;color:var(--ink);transition:color .5s var(--ease)}
.d-voyage .vy-hdr::before{content:"";position:absolute;inset:0;z-index:-1;background:rgba(243,240,233,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--line);transform:translateY(-101%);transition:transform .7s var(--ease)}
.d-voyage.is-scrolled .vy-hdr::before{transform:none}
.d-voyage:not(.no-photos):not(.is-scrolled):not(.menu-open) .vy-hdr{color:#fff}
.d-voyage.menu-open .vy-hdr{color:var(--ink)}
.d-voyage.menu-open .vy-hdr::before{transform:translateY(-101%)}
.d-voyage .vy-bar{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:20px;height:76px;transition:height .6s var(--ease)}
.d-voyage.is-scrolled .vy-bar{height:64px}
.d-voyage .vy-logo{min-width:0;overflow:hidden;font-family:var(--play);font-size:clamp(21px,1.8vw,26px);font-style:italic;line-height:1;white-space:nowrap;text-overflow:ellipsis}
.d-voyage .vy-links{display:none;gap:clamp(18px,2vw,34px)}
.d-voyage .vy-links a{position:relative;display:inline-flex;align-items:center;min-height:44px;font-family:var(--cap);font-stretch:85%;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
.d-voyage .vy-links a::after{content:"";position:absolute;left:0;right:0;bottom:10px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:0 50%;transition:transform .5s var(--ease)}
.d-voyage .vy-links a:hover::after{transform:none}
.d-voyage .vy-right{display:flex;align-items:center;gap:clamp(12px,1.6vw,26px)}
.d-voyage .vy-folio{display:none;align-items:baseline;gap:6px;font-family:var(--play);font-size:15px;font-variant-numeric:lining-nums}
.d-voyage .vy-folio b{display:inline-block;min-width:2.4em;text-align:right;font-weight:400;font-style:italic;font-size:19px}
.d-voyage .vy-burger{display:inline-flex;align-items:center;gap:12px;min-height:48px;padding:0 6px 0 16px;border:1px solid currentColor;border-radius:999px;background:none;font-family:var(--cap);font-stretch:85%;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
.d-voyage .vy-burger i{position:relative;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:currentColor}
.d-voyage .vy-burger i::before,.d-voyage .vy-burger i::after{content:"";position:absolute;width:14px;height:1.5px;background:var(--paper);transition:transform .5s var(--ease)}
.d-voyage:not(.no-photos):not(.is-scrolled):not(.menu-open) .vy-burger i::before,.d-voyage:not(.no-photos):not(.is-scrolled):not(.menu-open) .vy-burger i::after{background:var(--ink)}
.d-voyage .vy-burger i::before{transform:translateY(-3px)}.d-voyage .vy-burger i::after{transform:translateY(3px)}
.d-voyage.menu-open .vy-burger i::before{transform:rotate(45deg)}.d-voyage.menu-open .vy-burger i::after{transform:rotate(-45deg)}
@media (min-width:1100px){.d-voyage .vy-bar{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}.d-voyage .vy-links{display:flex}.d-voyage .vy-right{justify-content:flex-end}.d-voyage .vy-folio{display:inline-flex}}
@media (max-width:420px){.d-voyage .vy-burger [data-label]{display:none}.d-voyage .vy-burger{padding:0;border:0}.d-voyage .vy-burger i{width:44px;height:44px}}
.d-voyage .vy-progress{position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--sun);transform:scaleX(var(--read,0));transform-origin:0 50%;opacity:0;transition:opacity .4s}
.d-voyage.is-scrolled .vy-progress{opacity:1}
.d-voyage .vy-menu{position:fixed;inset:0;z-index:55;display:grid;align-content:start;gap:28px;padding:100px var(--pad) 110px;background:var(--paper);color:var(--ink);overflow-y:auto;transform:perspective(1800px) rotateY(-96deg);transform-origin:0 50%;visibility:hidden;box-shadow:inset -60px 0 80px -40px rgba(18,21,25,.25);transition:transform 1s var(--io),visibility 0s 1s,box-shadow 1s}
.d-voyage .vy-menu.is-open{transform:none;visibility:visible;box-shadow:inset 0 0 0 0 rgba(18,21,25,0);transition:transform 1s var(--io),box-shadow 1.2s}
.d-voyage .vy-menu-top{display:flex;justify-content:space-between;gap:20px;padding-bottom:16px;border-bottom:3px solid var(--ink)}
.d-voyage .vy-menu-grid{display:grid;gap:40px}
@media (min-width:1000px){.d-voyage .vy-menu-grid{grid-template-columns:minmax(0,1.4fr) minmax(0,.6fr);align-items:start}}
.d-voyage .vy-menu nav{display:grid}
.d-voyage .vy-menu nav a{display:grid;grid-template-columns:3.2em minmax(0,auto) minmax(20px,1fr) auto;align-items:baseline;gap:14px;min-height:60px;padding:12px 0;border-bottom:1px solid var(--line);opacity:0;transform:translateX(40px);transition:opacity .6s,transform .9s var(--ease)}
.d-voyage .vy-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.35s + var(--i,0) * 60ms)}
.d-voyage .vy-menu nav .r{font-family:var(--play);font-style:italic;font-size:20px;color:var(--sun-d)}
.d-voyage .vy-menu nav .t{font-family:var(--play);font-size:clamp(30px,6vw,58px);line-height:1.05;transition:transform .6s var(--ease)}
.d-voyage .vy-menu nav .l{align-self:center;height:1px;border-bottom:1px dotted rgba(18,21,25,.35)}
.d-voyage .vy-menu nav .p{font-family:var(--cap);font-stretch:82%;font-size:12px;font-weight:600;letter-spacing:.14em}
.d-voyage .vy-menu nav a:hover .t{transform:translateX(10px);font-style:italic}
.d-voyage .vy-menu-pic{position:relative;display:none;aspect-ratio:3/4;overflow:hidden;transform:rotate(2deg);box-shadow:0 30px 60px -30px rgba(18,21,25,.5)}
.d-voyage .vy-menu-pic img{width:100%;height:100%;object-fit:cover}
@media (min-width:1000px){.d-voyage .vy-menu-pic{display:block}}
.d-voyage .vy-menu-foot{display:flex;flex-wrap:wrap;align-items:center;gap:16px 28px}
.d-voyage .vy-menu-foot a:not(.btn){display:inline-flex;align-items:center;min-height:44px}
.d-voyage .vy-cover{position:relative;display:grid;min-height:100svh;padding:0;overflow:hidden;color:var(--ink);background:var(--paper)}
.d-voyage .vy-cover.has-pic{color:#fff;background:#1b2024}
.d-voyage .vy-cover-pic{position:absolute;inset:0;overflow:hidden;clip-path:inset(16% 24% 22% 24%);animation:vy-frame 2.1s var(--io) .15s forwards}
@keyframes vy-frame{to{clip-path:inset(0 0 0 0)}}
.d-voyage .vy-cover-pic img{width:100%;height:100%;object-fit:cover;transform:scale(1.32);animation:vy-zoom 2.8s var(--ease) .15s forwards}
@keyframes vy-zoom{to{transform:scale(1.04)}}
.d-voyage .vy-cover-pic::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,14,18,.5) 0,rgba(10,14,18,.08) 28%,rgba(10,14,18,.1) 50%,rgba(10,14,18,.78) 100%)}
@media (max-width:979px){.d-voyage .vy-cover-pic::after{background:linear-gradient(180deg,rgba(10,14,18,.55) 0,rgba(10,14,18,.15) 25%,rgba(10,14,18,.45) 45%,rgba(10,14,18,.82) 100%)}}
.d-voyage .vy-cover-in{position:relative;z-index:1;display:grid;grid-template-rows:auto auto 1fr auto;min-height:100svh;padding-top:88px;padding-bottom:clamp(28px,4vw,56px)}
.d-voyage .vy-mast-row{display:flex;justify-content:space-between;gap:16px;padding-bottom:10px;border-bottom:1px solid currentColor;animation:vy-fade 1s 1.2s both}
.d-voyage .vy-mast{display:flex;justify-content:center;margin-top:clamp(6px,1vw,14px);font-family:var(--play);font-size:min(calc(172vw / var(--n,10)),21vw);font-weight:500;line-height:.86;letter-spacing:-.035em;white-space:nowrap}
.d-voyage .vy-mast>span{display:inline-block;overflow:hidden;padding-bottom:.06em}
.d-voyage .vy-mast>span>span{display:inline-block;transform:translateY(105%);animation:vy-up 1.3s var(--ease) both;animation-delay:calc(.5s + var(--i,0) * 45ms)}
.d-voyage .vy-mast em{font-style:italic;font-weight:400}
@keyframes vy-up{to{transform:none}}
@keyframes vy-fade{from{opacity:0}to{opacity:1}}
@keyframes vy-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.d-voyage .vy-lines{display:grid;gap:28px;align-items:end;align-self:end;padding-top:40px}
@media (min-width:980px){.d-voyage .vy-lines{grid-template-columns:minmax(0,1.5fr) minmax(240px,.5fr);gap:60px}}
.d-voyage .vy-lines .vy-kick{color:inherit;opacity:.85;animation:vy-fade 1s 1.4s both}
.d-voyage .vy-cover h1{max-width:15ch;margin-top:14px;font-size:clamp(40px,5.6vw,92px);line-height:.98}
.d-voyage .vy-cover h1.is-s{max-width:20ch;font-size:clamp(34px,4.2vw,66px)}
.d-voyage .vy-cover.has-pic h1 em{color:var(--sun-l)}
.d-voyage .vy-cover h1 .vy-m>span{transform:translateY(108%);animation:vy-up 1.3s var(--ease) both;animation-delay:calc(1.15s + var(--i,0) * 60ms)}
.d-voyage .vy-sub{max-width:48ch;margin-top:20px;font-size:clamp(17px,1.25vw,20px);line-height:1.55;opacity:.92;animation:vy-rise 1.1s var(--ease) 1.6s both}
.d-voyage .vy-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:14px 26px;margin-top:28px;animation:vy-rise 1.1s var(--ease) 1.75s both}
.d-voyage .vy-cover.has-pic .vy-fill{background:#fff;color:var(--ink)}
.d-voyage .vy-side{display:grid;gap:0;border-top:1px solid currentColor;animation:vy-rise 1.1s var(--ease) 1.9s both}
.d-voyage .vy-side div{display:grid;gap:3px;padding:13px 0;border-bottom:1px solid rgba(127,127,127,.4)}
.d-voyage .vy-side dt{opacity:.75}
.d-voyage .vy-side dd{margin:0;font-family:var(--play);font-size:18px;line-height:1.3}
.d-voyage .vy-now{display:inline-flex;align-items:center;gap:8px}
.d-voyage .vy-now::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor;opacity:.5}
.d-voyage .vy-now.is-open::before{background:var(--sun);opacity:1;box-shadow:0 0 0 4px rgba(134,174,176,.3)}
.d-voyage .vy-sun{position:absolute;right:-12vw;top:18%;width:min(70vw,760px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 40%,var(--sun-l),var(--sun) 70%);opacity:.75;transform:translateY(calc(var(--p,0) * 60px));animation:vy-fade 2s .3s both}
.d-voyage .vy-cover:not(.has-pic) .vy-cover-in{z-index:1}
.d-voyage .vy-sec{position:relative;padding-block:var(--z-sec)}
.d-voyage .vy-sec.is-tint{background:var(--paper-2)}
.d-voyage .vy-sec.is-ink{background:var(--ink);color:var(--paper);--dim:rgba(243,240,233,.68);--line:rgba(243,240,233,.18);--z-ink:var(--paper);--z-dim:rgba(243,240,233,.68);--z-line:rgba(243,240,233,.18);--z-bg2:var(--ink-2)}
.d-voyage .vy-sec.is-ink h2 em,.d-voyage .vy-sec.is-ink h3 em{color:var(--sun)}
.d-voyage .vy-head{display:grid;gap:clamp(26px,3vw,40px);margin-bottom:clamp(44px,6vw,90px)}
.d-voyage .vy-run{display:flex;justify-content:space-between;gap:16px;padding-bottom:10px;border-bottom:1px solid var(--line);font-family:var(--cap);font-stretch:82%;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--dim)}
.d-voyage .vy-run span:nth-child(2){font-family:var(--play);font-size:14px;font-style:italic;letter-spacing:0;text-transform:none}
.d-voyage .vy-head-main{display:grid;gap:18px 40px;align-items:end}
@media (min-width:980px){.d-voyage .vy-head-main{grid-template-columns:auto minmax(0,1fr)}.d-voyage .vy-head.has-intro .vy-head-main{grid-template-columns:auto minmax(0,1.3fr) minmax(0,.7fr)}}
.d-voyage .vy-ch{font-family:var(--play);font-size:clamp(64px,8vw,140px);font-style:italic;font-weight:400;line-height:.8;color:transparent;-webkit-text-stroke:1px var(--sun-d);transform:translateY(calc(var(--p,0) * -24px))}
.d-voyage .is-ink .vy-ch{-webkit-text-stroke-color:var(--sun)}
.d-voyage .vy-head-copy{display:grid;gap:16px}
.d-voyage .vy-intro{max-width:46ch;color:var(--dim);font-size:1.02em}
@media (min-width:980px){.d-voyage .vy-head.has-intro .vy-intro{padding-bottom:8px}}
.d-voyage .z-head .z-intro{color:var(--dim)}
.d-voyage .vy-feature{display:grid;gap:clamp(36px,5vw,80px)}
@media (min-width:1000px){.d-voyage .vy-feature{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:start}.d-voyage .vy-feature.is-solo{grid-template-columns:minmax(0,1fr)}}
.d-voyage .vy-stand{font-family:var(--play);font-size:clamp(23px,2.1vw,32px);font-style:italic;line-height:1.32;letter-spacing:-.01em}
.d-voyage .vy-body{margin-top:clamp(28px,3vw,44px);color:var(--ink-2)}
.d-voyage .vy-body p+p{margin-top:1em;text-indent:1.4em}
@media (min-width:1000px){.d-voyage .vy-feature.is-solo .vy-body{columns:2;column-gap:56px;column-rule:1px solid var(--line)}}
@media (min-width:700px) and (max-width:999px){.d-voyage .vy-body{columns:2;column-gap:36px}}
.d-voyage .vy-body p:first-child::first-letter{float:left;margin:.08em .1em 0 0;font-family:var(--play);font-size:4.6em;font-weight:500;line-height:.76;color:var(--sun-d)}
.d-voyage .vy-aside{display:grid;gap:12px;margin-top:clamp(30px,3vw,44px);padding-top:18px;border-top:3px solid var(--ink)}
.d-voyage .vy-aside li{display:flex;gap:14px;padding:6px 0;border-bottom:1px solid var(--line);font-size:.95em}
.d-voyage .vy-aside li::before{content:"✦";color:var(--sun-d);font-size:.8em;line-height:1.9}
.d-voyage .vy-fig{position:relative}
.d-voyage .vy-fig>div{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--paper-2)}
.d-voyage .vy-fig img{width:100%;height:100%;object-fit:cover;transform:scale(1.18);transition:transform 1.8s var(--ease)}
.demo-js .d-voyage .vy-fig[data-rv]{opacity:1;transform:none}
.demo-js .d-voyage .vy-fig[data-rv]>div{clip-path:inset(12% 10% 12% 10%);transition:clip-path 1.6s var(--io)}
.demo-js .d-voyage .vy-fig[data-rv].in>div{clip-path:inset(0)}
.d-voyage .vy-fig.in img,.d-voyage .vy-fig:not([data-rv]) img{transform:scale(1)}
.d-voyage figcaption{display:flex;flex-wrap:wrap;gap:2px 10px;margin-top:12px;font-family:var(--cap);font-stretch:85%;font-size:12.5px;line-height:1.45;letter-spacing:.02em;color:var(--dim)}
.d-voyage figcaption b{flex:none;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink)}
.d-voyage .is-ink figcaption b{color:var(--paper)}
.d-voyage .vy-fig-small{width:48%;margin:-30% 0 0 auto;border:10px solid var(--paper);border-right:0}
.d-voyage .vy-fig:has(+.vy-fig-small) figcaption{max-width:48%}
.d-voyage .vy-fig-small>div{aspect-ratio:1}
.d-voyage .vy-quote{display:grid;gap:30px;justify-items:start}
.d-voyage .vy-quote blockquote{position:relative;max-width:22ch;font-family:var(--play);font-size:clamp(36px,5.4vw,92px);font-style:italic;line-height:1.04;letter-spacing:-.025em}
.d-voyage .vy-quote blockquote em{font-style:normal;color:var(--sun-d)}
.d-voyage .vy-quote blockquote::before{content:"“";position:absolute;left:-.04em;top:-.42em;z-index:-1;font-size:3.2em;line-height:1;color:var(--sun);opacity:.45;transform:translateY(calc(var(--p,0) * 40px))}
.d-voyage .vy-quote p{display:flex;align-items:center;gap:16px;color:var(--dim)}
.d-voyage .vy-quote p::before{content:"";width:60px;height:1px;background:currentColor}
@media (min-width:980px){.d-voyage .vy-quote{padding-left:16%}}
.d-voyage .vy-dests{display:grid;gap:clamp(56px,6vw,96px) clamp(24px,3vw,48px)}
@media (min-width:860px){.d-voyage .vy-dests{grid-template-columns:repeat(12,minmax(0,1fr))}.d-voyage .vy-dests>article:nth-child(4n+1){grid-column:1/span 7}.d-voyage .vy-dests>article:nth-child(4n+2){grid-column:9/span 4;margin-top:clamp(80px,12vw,200px)}.d-voyage .vy-dests>article:nth-child(4n+3){grid-column:2/span 4}.d-voyage .vy-dests>article:nth-child(4n+4){grid-column:7/span 6;margin-top:clamp(40px,6vw,100px)}.d-voyage .vy-dests.is-1>article{grid-column:2/span 10!important}}
.d-voyage .vy-dest{display:grid;gap:14px;align-content:start}
.d-voyage .vy-dest figure{position:relative;overflow:hidden;aspect-ratio:4/5;background:var(--paper-2)}
.d-voyage .vy-dests>article:nth-child(4n+1) figure,.d-voyage .vy-dests>article:nth-child(4n+4) figure{aspect-ratio:5/4}
.d-voyage .vy-dest img{width:100%;height:100%;object-fit:cover;transform:scale(1.06);transition:transform 1.6s var(--ease),filter .8s}
.d-voyage .vy-dest:hover img{transform:scale(1.12)}
.d-voyage .vy-dest figure::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(62,106,110,.35),rgba(62,106,110,0) 50%);opacity:0;transition:opacity .8s}
.d-voyage .vy-dest:hover figure::after{opacity:1}
.d-voyage .vy-dest .vy-no{position:absolute;left:16px;top:14px;z-index:1;font-family:var(--play);font-style:italic;font-size:22px;color:#fff;text-shadow:0 1px 14px rgba(0,0,0,.4)}
.d-voyage .vy-go{position:absolute;right:16px;bottom:16px;z-index:1;display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:var(--paper);color:var(--ink);transform:scale(0) rotate(-45deg);transition:transform .7s var(--ease)}
.d-voyage .vy-go svg{width:20px;height:20px}
.d-voyage .vy-dest:hover .vy-go{transform:none}
.d-voyage .vy-coord{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 16px;padding-bottom:10px;border-bottom:1px solid var(--line);color:var(--sun-d)}
.d-voyage .vy-coord span{display:inline-flex;align-items:center;gap:8px}
.d-voyage .vy-coord svg{width:14px;height:14px;transition:transform 1.2s var(--ease)}
.d-voyage .vy-dest:hover .vy-coord svg{transform:rotate(90deg)}
.d-voyage .vy-dest h3{font-size:clamp(28px,2.6vw,42px);line-height:1.02;transition:color .4s}
.d-voyage .vy-dest:hover h3{font-style:italic}
.d-voyage .vy-dest p{color:var(--dim)}
.d-voyage .vy-dest .vy-price{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 14px}
.d-voyage .vy-dest .vy-price b{font-family:var(--play);font-size:clamp(20px,1.6vw,24px);font-weight:400;color:var(--ink)}
.d-voyage .vy-index{border-top:3px solid var(--ink)}
.d-voyage .vy-index li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 24px;padding:clamp(22px,2.6vw,34px) 0;border-bottom:1px solid var(--line);transition:padding .6s var(--ease)}
.d-voyage .vy-index li:hover{padding-left:14px}
.d-voyage .vy-index .vy-no{font-family:var(--play);font-style:italic;font-size:clamp(26px,2.4vw,36px);line-height:1;color:var(--sun-d)}
.d-voyage .vy-index h3{font-size:clamp(26px,2.6vw,40px)}
.d-voyage .vy-index p{max-width:64ch;margin-top:8px;color:var(--dim)}
.d-voyage .vy-index .vy-coord{grid-column:2;border:0;padding:0;justify-content:flex-start}
@media (min-width:860px){.d-voyage .vy-index li{grid-template-columns:90px minmax(0,1fr) minmax(180px,auto)}.d-voyage .vy-index .vy-coord{grid-column:3;grid-row:1;flex-direction:column;align-items:flex-end;text-align:right}}
.d-voyage .vy-count{display:inline-flex;align-items:baseline;gap:10px;font-family:var(--play);font-size:clamp(46px,5vw,80px);font-style:italic;line-height:1;color:var(--sun-d);font-variant-numeric:lining-nums tabular-nums}
.d-voyage .vy-trip{position:relative;padding-block:var(--z-sec);background:var(--paper-2)}
.d-voyage .vy-trip-bar{display:none}
.d-voyage .vy-stops{position:relative;display:grid;gap:clamp(36px,5vw,56px);padding-left:42px}
.d-voyage .vy-stops::before{content:"";position:absolute;left:11px;top:8px;bottom:8px;width:0;border-left:1.5px dashed var(--sun-d);opacity:.7}
.d-voyage .vy-stop{position:relative;display:grid;gap:12px;align-content:start}
.d-voyage .vy-stop::before{content:"";position:absolute;left:-38px;top:10px;width:16px;height:16px;border:1.5px solid var(--sun-d);border-radius:50%;background:var(--paper-2)}
.d-voyage .vy-day{display:flex;align-items:baseline;gap:14px;color:var(--sun-d)}
.d-voyage .vy-day b{font-family:var(--play);font-size:clamp(54px,6vw,96px);font-style:italic;font-weight:400;line-height:.8;color:transparent;-webkit-text-stroke:1px var(--sun-d)}
.d-voyage .vy-stop h3{font-size:clamp(28px,2.6vw,42px)}
.d-voyage .vy-stop p{max-width:42ch;color:var(--dim)}
.d-voyage .vy-post{position:relative;width:min(100%,340px);margin-top:10px;padding:10px 10px 12px;background:var(--white);box-shadow:0 24px 40px -26px rgba(18,21,25,.5);transform:rotate(var(--r,-2deg))}
.d-voyage .vy-stop:nth-child(even) .vy-post{--r:2.4deg}
.d-voyage .vy-post>div{aspect-ratio:4/3;overflow:hidden}
.d-voyage .vy-post img{width:100%;height:100%;object-fit:cover}
.d-voyage .vy-post figcaption{margin-top:8px;font-size:11.5px}
.d-voyage .vy-trip.is-h{padding:0}
.d-voyage .vy-trip.is-h .vy-pin{position:sticky;top:0;display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:auto 1fr auto;height:100vh;padding-top:96px;padding-bottom:36px;overflow:hidden}
.d-voyage .vy-trip.is-h .vy-head{margin-bottom:20px}
.d-voyage .vy-trip.is-h.is-short .vy-pin{position:relative;height:auto;padding-block:var(--z-sec)}
.d-voyage .vy-trip.is-short .vy-plane{display:none}
.d-voyage .vy-trip.is-h .vy-track{position:relative;display:flex;align-items:center;width:max-content;will-change:transform}
.d-voyage .vy-trip.is-h .vy-track>.vy-wrap{width:max-content;max-width:none;margin:0;padding:0}
.d-voyage .vy-trip.is-h .vy-stops{display:flex;gap:0;padding:0 var(--pad) 0 max(var(--pad),calc((100vw - 1440px) / 2 + var(--pad)))}
.d-voyage .vy-trip.is-h .vy-stops::before{left:0;right:0;top:58px;bottom:auto;width:auto;height:0;border-left:0;border-top:1.5px dashed var(--sun-d)}
.d-voyage .vy-trip.is-h .vy-stop{flex:none;width:clamp(340px,34vw,520px);padding:0 clamp(32px,4vw,72px) 0 0}
.d-voyage .vy-trip.is-h .vy-stop::before{left:0;top:50px}
.d-voyage .vy-trip.is-h .vy-day{padding-left:30px;height:58px;align-items:center}
.d-voyage .vy-trip.is-h .vy-stop.has-post{width:clamp(420px,44vw,680px);grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:28px}
.d-voyage .vy-trip.is-h .vy-stop.has-post .vy-day,.d-voyage .vy-trip.is-h .vy-stop.has-post h3,.d-voyage .vy-trip.is-h .vy-stop.has-post>p{grid-column:1}
.d-voyage .vy-trip.is-h .vy-stop.has-post .vy-post{grid-column:2;grid-row:1/span 4;align-self:start;margin-top:84px;transform:rotate(calc(var(--r,-2deg) + var(--prog,0) * 4deg))}
.d-voyage .vy-trip.is-h .vy-plane{position:absolute;left:0;top:50px;z-index:2;width:30px;height:30px;color:var(--ink);transform:translateX(var(--fly,0px))}
.d-voyage .vy-plane{display:none}
.d-voyage .vy-trip.is-h .vy-plane{display:block}
.d-voyage .vy-trip.is-h .vy-trip-bar{display:flex;align-items:center;gap:20px}
.d-voyage .vy-trip-bar i{position:relative;flex:1;height:1px;background:var(--line)}
.d-voyage .vy-trip-bar i::after{content:"";position:absolute;inset:-1px 0;background:var(--ink);transform:scaleX(var(--prog,0));transform-origin:0 50%}
.d-voyage .vy-steps{display:grid;border-top:3px solid var(--ink);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-voyage .vy-steps li{position:relative;display:grid;gap:14px;align-content:start;padding:30px clamp(0px,2.4vw,36px) 36px 0}
@media (min-width:700px){.d-voyage .vy-steps li+li{padding-left:clamp(20px,2.4vw,36px);border-left:1px solid var(--line)}}
@media (max-width:699px){.d-voyage .vy-steps li+li{border-top:1px solid var(--line)}}
.d-voyage .vy-steps .vy-n{display:flex;align-items:center;justify-content:space-between;font-family:var(--play);font-size:clamp(46px,4.4vw,72px);font-style:italic;line-height:.9;color:var(--sun-d);transition:transform .6s var(--ease)}
.d-voyage .vy-steps li:hover .vy-n{transform:translateX(8px)}
.d-voyage .vy-steps .vy-n svg{width:24px;height:24px;color:var(--ink);opacity:.6}
.d-voyage .vy-steps h3{font-size:clamp(23px,1.9vw,29px);line-height:1.1}
.d-voyage .vy-steps p{color:var(--dim)}
.d-voyage .vy-essay{display:grid;gap:clamp(28px,3vw,48px) clamp(14px,2vw,32px);grid-template-columns:repeat(2,minmax(0,1fr))}
.d-voyage .vy-essay figure:first-child{grid-column:1/-1}
.d-voyage .vy-essay figure>div{overflow:hidden;aspect-ratio:4/5;background:var(--paper-2)}
.d-voyage .vy-essay figure:first-child>div{aspect-ratio:16/10}
@media (max-width:899px){.d-voyage .vy-essay figure:last-child:nth-child(even){grid-column:1/-1}.d-voyage .vy-essay figure:last-child:nth-child(even)>div{aspect-ratio:16/10}}
.d-voyage .vy-essay img{width:100%;height:116%;object-fit:cover;transform:translateY(calc(var(--p,0) * var(--d,-6%)))}
@media (min-width:900px){.d-voyage .vy-essay{grid-template-columns:repeat(12,minmax(0,1fr));align-items:start}.d-voyage .vy-essay figure{grid-column:span 4}.d-voyage .vy-essay figure:nth-child(8n+1){grid-column:1/span 8}.d-voyage .vy-essay figure:nth-child(8n+1)>div{aspect-ratio:16/10}.d-voyage .vy-essay figure:nth-child(8n+2){grid-column:9/span 4;margin-top:clamp(60px,10vw,160px)}.d-voyage .vy-essay figure:nth-child(8n+3){grid-column:2/span 3}.d-voyage .vy-essay figure:nth-child(8n+4){grid-column:6/span 3;margin-top:80px}.d-voyage .vy-essay figure:nth-child(8n+5){grid-column:10/span 3;margin-top:20px}.d-voyage .vy-essay figure:nth-child(8n+6){grid-column:1/span 5}.d-voyage .vy-essay figure:nth-child(8n+7){grid-column:7/span 6;margin-top:120px}.d-voyage .vy-essay figure:nth-child(8n+7)>div{aspect-ratio:3/2}.d-voyage .vy-essay figure:nth-child(8n+8){grid-column:3/span 4}.d-voyage .vy-essay figure:nth-child(3n+2){--d:-12%}.d-voyage .vy-essay figure:nth-child(3n){--d:4%}.d-voyage .vy-essay.is-few figure{grid-column:span 6!important;margin-top:0!important}}
.d-voyage .vy-essay figure>div{transition:clip-path 1.5s var(--io)}
.demo-js .d-voyage .vy-essay figure[data-rv]{transform:translateY(40px)}
.demo-js .d-voyage .vy-essay figure[data-rv]>div{clip-path:inset(100% 0 0 0)}
.demo-js .d-voyage .vy-essay figure[data-rv].in{transform:none}
.demo-js .d-voyage .vy-essay figure[data-rv].in>div{clip-path:inset(0)}
.d-voyage .vy-carte{display:grid;gap:clamp(40px,5vw,72px) clamp(32px,5vw,80px)}
@media (min-width:860px){.d-voyage .vy-carte{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-voyage .vy-carte h3{padding-bottom:14px;border-bottom:3px solid var(--ink);font-size:clamp(28px,2.6vw,40px);font-style:italic}
.d-voyage .vy-carte li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 20px;padding:16px 0;border-bottom:1px solid var(--line)}
.d-voyage .vy-carte b{font-family:var(--play);font-size:clamp(19px,1.5vw,22px);font-weight:400}
.d-voyage .vy-carte p{grid-column:1;font-size:.92em;color:var(--dim)}
.d-voyage .vy-carte span{grid-row:1;grid-column:2;font-family:var(--play);font-style:italic;color:var(--sun-d)}
.d-voyage .vy-carte small{grid-column:1;justify-self:start;padding:2px 10px;border:1px solid var(--line);border-radius:999px}
.d-voyage .vy-note{margin-top:clamp(30px,4vw,48px);max-width:70ch;color:var(--dim);font-size:.92em}
.d-voyage .vy-split{display:grid;gap:clamp(44px,6vw,100px)}
@media (min-width:980px){.d-voyage .vy-split{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.d-voyage .vy-copy{display:grid;gap:22px;align-content:start}
.d-voyage .vy-copy .vy-head{margin-bottom:6px}
.d-voyage .vy-copy>p{max-width:52ch;color:var(--dim)}
.d-voyage .vy-box{display:grid;gap:20px;padding:clamp(24px,3vw,40px);border-top:6px solid var(--ink);background:var(--white);box-shadow:0 30px 60px -44px rgba(18,21,25,.45)}
.d-voyage .vy-box h3{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;font-size:clamp(26px,2.2vw,34px)}
.d-voyage .vy-box .vy-now{color:var(--sun-d)}
.d-voyage .z-hours{border-color:var(--line)}
.d-voyage .z-hours div{border-color:var(--line);padding:14px 2px}
.d-voyage .z-hours dt{font-family:var(--play)}
.d-voyage .z-hours dd{font-family:var(--cap);font-stretch:85%;font-variant-numeric:tabular-nums;letter-spacing:.04em}
.d-voyage .z-hours div.is-today{position:relative;background:linear-gradient(90deg,var(--sun-l),rgba(213,227,225,0));padding-inline:14px 2px}
.d-voyage .z-hours div.is-today dt{font-style:italic}
.d-voyage .z-hours div.is-today dt::after{content:" ✦";color:var(--sun-d)}
.d-voyage .z-reach{font-family:var(--cap);font-stretch:90%;letter-spacing:.02em}
.d-voyage .vy-reply{display:grid;gap:clamp(44px,6vw,100px)}
@media (min-width:1000px){.d-voyage .vy-reply{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);align-items:start}}
.d-voyage .vy-card{position:relative;padding:clamp(26px,3.6vw,52px) clamp(22px,3.6vw,52px) clamp(26px,3.6vw,52px) clamp(34px,4.4vw,64px);background:var(--white);color:var(--ink);box-shadow:0 40px 70px -50px rgba(18,21,25,.6);transform:rotate(.6deg)}
.d-voyage .vy-card::before{content:"";position:absolute;left:clamp(14px,1.8vw,24px);top:0;bottom:0;border-left:2px dotted rgba(18,21,25,.3)}
.d-voyage .vy-card::after{content:"";position:absolute;left:-1px;top:0;bottom:0;width:10px;background:radial-gradient(circle at 0 50%,var(--paper-2) 5px,transparent 5.5px) 0 0/10px 18px repeat-y}
.d-voyage .vy-card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:28px;padding-bottom:20px;border-bottom:1px solid var(--line)}
.d-voyage .vy-card-to{display:grid;gap:4px;font-family:var(--play);font-size:clamp(22px,2vw,28px);font-style:italic;line-height:1.15}
.d-voyage .vy-card-to small{font-family:var(--cap);font-stretch:82%;font-size:11px;font-style:normal;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--dim)}
.d-voyage .vy-stamp{position:relative;flex:none;display:grid;place-items:center;align-content:center;width:84px;height:100px;padding:6px;background:var(--sun);color:var(--ink);-webkit-mask:radial-gradient(circle,#0000 3.2px,#000 3.8px) -5px -5px/10px 10px round,linear-gradient(#000 0 0) 5px 5px/calc(100% - 10px) calc(100% - 10px) no-repeat;mask:radial-gradient(circle,#0000 3.2px,#000 3.8px) -5px -5px/10px 10px round,linear-gradient(#000 0 0) 5px 5px/calc(100% - 10px) calc(100% - 10px) no-repeat;transform:rotate(4deg);transition:transform .8s var(--ease)}
.d-voyage .vy-card:hover .vy-stamp{transform:rotate(-3deg) scale(1.04)}
.d-voyage .vy-stamp b{font-family:var(--play);font-size:44px;font-style:italic;font-weight:400;line-height:1}
.d-voyage .vy-stamp small{font-family:var(--cap);font-stretch:80%;font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.d-voyage .vy-postmark{position:absolute;right:clamp(70px,7vw,96px);top:clamp(30px,4vw,56px);width:96px;height:96px;color:var(--sun-d);opacity:.55;pointer-events:none;transform:rotate(-12deg)}
.d-voyage .vy-card .z-fields{gap:22px 24px}
.d-voyage .z-field label{font-family:var(--cap);font-stretch:85%;font-size:11.5px;font-weight:600;letter-spacing:.16em}
.d-voyage .z-field input,.d-voyage .z-field select,.d-voyage .z-field textarea{border-width:0 0 1px;padding-inline:0;font-family:var(--read);font-size:18px;background:transparent}
.d-voyage .z-field textarea{border-width:1px;padding:12px;background:repeating-linear-gradient(transparent 0 31px,rgba(18,21,25,.08) 31px 32px)}
.d-voyage .z-field select{background:linear-gradient(45deg,transparent 50%,currentColor 50%) calc(100% - 12px) 55%/6px 6px no-repeat,linear-gradient(-45deg,transparent 50%,currentColor 50%) calc(100% - 6px) 55%/6px 6px no-repeat}
.d-voyage .z-field input:focus,.d-voyage .z-field select:focus,.d-voyage .z-field textarea:focus{border-color:var(--sun-d)}
.d-voyage .z-chips button{font-family:var(--play);font-size:19px}
.d-voyage .z-chips button[aria-pressed="true"]{background:var(--ink);border-color:var(--ink);color:var(--paper)}
.d-voyage .form-note{font-family:var(--cap);font-stretch:90%}
.d-voyage .vy-colo{display:grid;gap:clamp(40px,5vw,80px)}
.d-voyage .vy-copy .vy-head-main{grid-template-columns:minmax(0,1fr)!important;gap:10px}
.d-voyage .vy-copy .vy-ch{margin-bottom:10px;font-size:clamp(48px,5vw,84px)}
.d-voyage .vy-register{display:grid;align-content:start;border-top:3px solid currentColor}
.d-voyage .vy-register a{display:grid;grid-template-columns:3em minmax(0,auto) minmax(16px,1fr) auto;align-items:baseline;gap:12px;min-height:56px;padding:12px 0;border-bottom:1px solid var(--line);transition:padding .5s var(--ease)}
.d-voyage .vy-register a:hover{padding-left:10px}
.d-voyage .vy-register .r{font-family:var(--play);font-style:italic;color:var(--sun-d)}
.d-voyage .vy-register .t{font-family:var(--play);font-size:clamp(22px,2vw,30px);line-height:1.1}
.d-voyage .vy-register .l{border-bottom:1px dotted rgba(18,21,25,.35)}
@media (min-width:900px){.d-voyage .vy-essay figure:nth-child(8n+6):last-child{grid-column:3/span 8}.d-voyage .vy-essay figure:nth-child(8n+6):last-child>div{aspect-ratio:16/9}}
@media (min-width:980px){.d-voyage .vy-colo{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}}
.d-voyage .vy-colo-list{display:grid;align-content:start;border-top:3px solid currentColor}
.d-voyage .vy-colo-list div{display:grid;grid-template-columns:minmax(90px,.4fr) minmax(0,1fr);gap:16px;padding:14px 0;border-bottom:1px solid var(--line)}
.d-voyage .vy-colo-list dt{padding-top:3px;color:var(--dim)}
.d-voyage .vy-colo-list dd{margin:0;font-family:var(--play);font-size:clamp(19px,1.5vw,22px);overflow-wrap:anywhere}
.d-voyage .vy-colo-list a{display:inline-flex;align-items:center;min-height:32px}
.d-voyage .z-panel{border:0;border-top:6px solid currentColor;background:var(--z-bg2)}
.d-voyage .z-statement h2{max-width:20ch;font-style:italic;line-height:1.06}
.d-voyage .z-statement .z-center::before{content:"“";display:block;height:.5em;font-family:var(--play);font-size:clamp(90px,10vw,160px);line-height:1;color:var(--sun)}
.d-voyage .z-statement .vy-kick{color:var(--dim)}
.d-voyage .z-showcase.has-pic{min-height:min(96svh,900px)}
.d-voyage .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(10,14,18,0) 35%,rgba(10,14,18,.75))}
.d-voyage .z-show-in h2{max-width:14ch;font-size:clamp(44px,7vw,120px);line-height:.96}
.d-voyage .z-show-in h2 em{color:var(--sun-l)}
.d-voyage .z-show-in>p{max-width:42ch;font-size:clamp(17px,1.3vw,20px)}
.d-voyage .z-showcase .vy-line{color:#fff}
.d-voyage .z-showcase .vy-line:hover{background:#fff;color:var(--ink);border-color:#fff}
.d-voyage .z-acc{border-top:3px solid var(--ink)}
.d-voyage .z-acc details{border-color:var(--line)}
.d-voyage .z-acc summary{font-family:var(--play);font-size:clamp(20px,1.7vw,26px);line-height:1.25;transition:color .3s}
.d-voyage .z-acc summary:hover{color:var(--sun-d)}
.d-voyage .z-acc summary i{width:22px;height:22px}
.d-voyage .z-acc details>p{font-size:1em;line-height:1.65;color:var(--ink-2)}
.d-voyage .z-acc details[open]>p{animation:vy-rise .7s var(--ease)}
.d-voyage .z-card{border:0;border-top:3px solid var(--ink);background:var(--white);transition:transform .7s var(--ease),box-shadow .7s var(--ease)}
.d-voyage .z-card:hover{transform:translateY(-6px);box-shadow:0 30px 50px -36px rgba(18,21,25,.5)}
.d-voyage .z-pack.is-featured{border-top-color:var(--sun);background:var(--ink);color:var(--paper);--z-ink:var(--paper);--z-dim:rgba(243,240,233,.7)}
.d-voyage .z-pack h3{font-size:clamp(28px,2.4vw,38px);font-style:italic}
.d-voyage .z-tag{font-family:var(--cap);font-stretch:85%;font-weight:600}
.d-voyage .z-grid .z-ico,.d-voyage .z-channel .z-ico{border:0;border-top:2px solid var(--sun-d);width:44px;color:var(--sun-d)}
.d-voyage .z-team .z-pic{aspect-ratio:3/4}
.d-voyage .z-team .vy-kick{color:var(--dim)}
.d-voyage .z-quotes blockquote>p{font-style:italic}
.d-voyage .z-cta{background:var(--sun-l)}
.d-voyage .z-cta h2{font-style:italic}
.d-voyage .z-rows small,.d-voyage .z-steps small{font-family:var(--play);font-style:italic;font-size:18px;letter-spacing:0;color:var(--sun-d)}
.d-voyage .vy-foot{position:relative;padding:clamp(70px,8vw,120px) 0 120px;background:var(--ink);color:var(--paper);overflow:hidden;--line:rgba(243,240,233,.16);--dim:rgba(243,240,233,.62)}
.d-voyage .vy-foot-mast{display:block;font-family:var(--play);font-size:min(calc(168vw / var(--n,10)),20vw);font-weight:500;line-height:.86;letter-spacing:-.04em;white-space:nowrap;text-align:center}
.d-voyage .vy-foot-mast em{font-style:italic;font-weight:400;color:var(--sun)}
.d-voyage .vy-foot-row{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;margin-top:20px;padding:12px 0;border-block:1px solid var(--line);color:var(--dim)}
.d-voyage .vy-foot-grid{display:grid;gap:40px;padding-block:clamp(44px,5vw,72px);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-voyage .vy-foot-grid h3{margin-bottom:14px;font-family:var(--cap);font-stretch:82%;font-size:11.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--sun)}
.d-voyage .vy-foot-grid div{display:grid;gap:2px;align-content:start;justify-items:start}
.d-voyage .vy-foot-grid a,.d-voyage .vy-foot-grid span{display:inline-flex;align-items:center;min-height:36px;color:var(--dim);transition:color .3s}
.d-voyage .vy-foot-grid a:hover{color:var(--paper)}
.d-voyage .vy-foot-grid>p{max-width:40ch;font-family:var(--play);font-size:19px;font-style:italic;line-height:1.45;color:var(--paper)}
.d-voyage .vy-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 30px;padding-top:26px;border-top:1px solid var(--line);font-family:var(--cap);font-stretch:90%;font-size:13px;color:var(--dim)}
@media (prefers-reduced-motion:reduce){.d-voyage .vy-cover-pic{clip-path:none;animation:none}.d-voyage .vy-cover-pic img{transform:none;animation:none}.d-voyage .vy-mast>span>span,.d-voyage .vy-cover h1 .vy-m>span{transform:none;animation:none}.d-voyage .vy-menu{transition:none}}
`.trim();

/* Rules that restyle the kit's shared sections (.z-*) and form parts go in `extra`: they load after the shared defaults. */
const isKit = (l: string) => /\.z-|form-(status|note)/.test(l);
const CSS = SHEET.split("\n").filter((l) => !isKit(l)).join("");
const EXTRA = SHEET.split("\n").filter(isKit).join("");

/**
 * The magazine's own behaviour: the folio in the header follows the chapter on screen and a
 * reading line fills, the itinerary moves sideways while its section is pinned (wide screens,
 * no reduced motion), buttons lean towards the pointer, and the destination counter counts up
 * to the number of journeys actually shown.
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-voyage');if(!root)return;
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=W.matchMedia&&W.matchMedia('(pointer: fine)').matches;
var secs=q('main>section[data-ch]'),fol=d.querySelector('[data-vy-folio]'),bar=d.querySelector('.vy-progress');
if(fol&&secs.length&&'IntersectionObserver' in W){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)fol.textContent=e.target.getAttribute('data-ch')})},{rootMargin:'-45% 0px -54% 0px'});secs.forEach(function(s){io.observe(s)})}
var trips=q('.vy-trip'),wide=W.matchMedia('(min-width: 1000px)');
function layout(){trips.forEach(function(t){var track=t.querySelector('.vy-track');if(!track)return;var on=wide.matches&&!reduce;t.classList.toggle('is-h',on);if(!on){t.style.height='';track.style.transform='';return}var dist=Math.max(0,track.scrollWidth-W.innerWidth);t.setAttribute('data-dist',dist);t.classList.toggle('is-short',dist<120);t.style.height=dist<120?'':(W.innerHeight+dist)+'px'})}
var raf=0;function frame(){raf=0;var max=Math.max(1,d.documentElement.scrollHeight-W.innerHeight);if(bar)bar.style.setProperty('--read',(W.scrollY/max).toFixed(4));
trips.forEach(function(t){if(!t.classList.contains('is-h'))return;var r=t.getBoundingClientRect(),dist=+t.getAttribute('data-dist')||0,span=Math.max(1,r.height-W.innerHeight),p=Math.min(1,Math.max(0,-r.top/span));var track=t.querySelector('.vy-track');track.style.transform='translate3d('+(-p*dist).toFixed(1)+'px,0,0)';t.style.setProperty('--prog',p.toFixed(4));var pl=t.querySelector('.vy-plane'),st=t.querySelector('.vy-stops');if(pl&&st)pl.style.setProperty('--fly',(p*(st.scrollWidth-60)).toFixed(1)+'px')})}
function onScroll(){if(!raf)raf=requestAnimationFrame(frame)}
layout();frame();W.addEventListener('scroll',onScroll,{passive:true});W.addEventListener('resize',function(){layout();onScroll()});if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){layout();onScroll()});W.addEventListener('load',function(){layout();onScroll()});
if(fine&&!reduce)q('.d-voyage .btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.32).toFixed(1)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})});
q('[data-count]').forEach(function(el){var to=+el.getAttribute('data-count')||0;function run(){if(reduce){el.textContent=(to<10?'0':'')+to;return}var t0=0;function step(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1400),v=Math.round(to*(1-Math.pow(1-k,3)));el.textContent=(v<10?'0':'')+v;if(k<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
if(!('IntersectionObserver' in W)){run();return}var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();el.textContent='00';run()}},{threshold:.6});o.observe(el)});
})();`.replace(/\n/g, "");

/* ── pieces ── */

const ROMAN: [number, string][] = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];
const roman = (n: number) => {
  let out = "";
  let v = n;
  for (const [k, r] of ROMAN) while (v >= k) ((out += r), (v -= k));
  return out;
};
const pad2 = (n: number) => String(n).padStart(2, "0");
const folio = (n: number) => `p. ${String(4 + n * 8).padStart(3, "0")}`;

/** Chapter numbers per page, in the order the sections render (the cover is chapter 0). */
const chapters = new WeakMap<Ctx, number>();
/** The chapter a section gets: the same count as the headings, so menu, register and running heads agree. */
const chapterOf = (c: Ctx, id: string) => {
  let n = 1;
  for (const x of c.spec.sections) {
    const real = (r: string) => Boolean(c.spec.images.find((im) => im.key === r && im.license !== "generated" && /^https:\/\//.test(im.src)));
    const heads =
      x.type === "cta" || x.type === "showcase"
        ? false
        : x.type === "gallery"
          ? x.images.some(real)
          : x.type === "beforeafter"
            ? x.pairs.some((p) => real(p.before) && real(p.after))
            : x.type === "menu"
              ? x.categories.some((k) => k.items.length > 0)
              : true;
    if (heads) n++;
    if (x.id === id) return n;
  }
  return n;
};
const nextCh = (c: Ctx) => {
  const n = (chapters.get(c) ?? 1) + 1;
  chapters.set(c, n);
  return n;
};

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 15 15 5M7 5h8v8" />
  </svg>
);

const Cross = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <circle cx="8" cy="8" r="5.5" />
    <path d="M8 0v5M8 11v5M0 8h5M11 8h5" />
  </svg>
);

/** A title as words in masks, for the rising-type reveal; marked phrases stay emphasised. */
function Masked({ text, start = 0 }: { text: string; start?: number }) {
  const out: ReactNode[] = [];
  let k = 0;
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => {
        if (out.length) out.push(" ");
        out.push(
          <span className="vy-m" key={k}>
            <span style={i(start + k)}>{n % 2 ? <em>{w}</em> : w}</span>
          </span>,
        );
        k++;
      }),
  );
  return <>{out}</>;
}

/** Coordinates written at the start of a description ("35°01′N 135°46′E — …") become a caption. */
const COORD = /^\s*(\d{1,2}°\s?\d{0,2}[′']?\s?[NZS][,\s]+\d{1,3}°\s?\d{0,2}[′']?\s?[OWE])\s*[—–-]?\s*/;
const splitCoord = (text: string) => {
  const m = COORD.exec(text);
  return m ? { coord: m[1].replace(/'/g, "′"), rest: text.slice(m[0].length) } : { coord: null, rest: text };
};

function Head({ c, kicker, title, intro, id, ch }: HeadProps & { c: Ctx; ch?: number }) {
  const n = ch ?? nextCh(c);
  return (
    <header className={`vy-head${intro ? " has-intro" : ""}`}>
      <div className="vy-run" aria-hidden="true">
        <span>{c.name}</span>
        <span>{roman(n)}</span>
        <span>{folio(n)}</span>
      </div>
      <div className="vy-head-main">
        <span className="vy-ch" aria-hidden="true" data-px>
          {roman(n)}
        </span>
        <div className="vy-head-copy">
          {kicker ? (
            <p className="vy-kick" data-rv>
              {kicker}
            </p>
          ) : null}
          <h2 id={id} className={["vy-h2", long(title)].filter(Boolean).join(" ")} data-rv>
            <Masked text={title} />
          </h2>
        </div>
        {intro ? (
          <p className="vy-intro" data-rv>
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}

const MONTHS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/* ── header, cover, footer ── */

function navOf(c: Ctx) {
  return c.nav.map((n) => {
    const s = c.spec.sections.find((x) => x.id === n.id);
    const title = (s?.title ?? "").replace(/\*/g, "").trim();
    const head = title.split(/\s*[,:;–—]\s+|\s+[–—-]\s+/)[0];
    return { id: n.id, label: title && title.length <= 16 ? title : head.length >= 3 && head.length <= 18 && head !== title ? head : n.label };
  });
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const nav = navOf(c);
  const cover = c.photo(c.spec.hero.image);
  return (
    <>
      <header className="vy-hdr hdr">
        <div className="vy-wrap vy-bar">
          <a href="#top" className="vy-logo">
            {c.name}
          </a>
          <nav aria-label={c.t.menu} className="vy-links" data-nav>
            {nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="vy-right">
            <span className="vy-folio" aria-hidden="true">
              <b data-vy-folio>{roman(1)}</b>
            </span>
            <button type="button" className="vy-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
              <span data-label data-open={c.t.menu} data-close={c.t.close}>
                {c.t.menu}
              </span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
        <span className="vy-progress" aria-hidden="true" />
      </header>
      <div id="site-menu" className="vy-menu" data-nav inert>
        <div className="vy-menu-top vy-cap" aria-hidden="true">
          <span>{c.name}</span>
          <span>{b.city ?? ""}</span>
        </div>
        <div className="vy-menu-grid">
          <nav aria-label={c.t.menu}>
            {nav.map((n, k) => (
              <a key={n.id} href={`#${n.id}`} style={i(k)}>
                <span className="r" aria-hidden="true">
                  {roman(chapterOf(c, n.id))}
                </span>
                <span className="t">{n.label}</span>
                <span className="l" aria-hidden="true" />
                <span className="p" aria-hidden="true">
                  {folio(chapterOf(c, n.id))}
                </span>
              </a>
            ))}
          </nav>
          {cover ? (
            <figure className="vy-menu-pic">
              <Pic p={cover} sizes="30vw" />
            </figure>
          ) : null}
        </div>
        <div className="vy-menu-foot">
          <a href={cta.href} className="btn vy-fill">
            <span>
              {cta.label} <Arrow />
            </span>
          </a>
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
          {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const b = c.spec.business;
  const p = c.photo(hero.image);
  const facts = heroFacts(c);
  const now = new Date();
  const issue = `${MONTHS[now.getMonth()]} · ${now.getFullYear()}`;
  const words = c.name.split(" ");
  let k = 0;
  const plain = hero.headline.replace(/\*/g, "");
  return (
    <section className={`vy-cover${p ? " has-pic" : ""}`} data-ch={roman(1)}>
      {p ? (
        <div className="vy-cover-pic">
          <Pic p={p} eager sizes="100vw" />
        </div>
      ) : (
        <span className="vy-sun" aria-hidden="true" data-px />
      )}
      <div className="vy-wrap vy-cover-in">
        <div className="vy-mast-row vy-cap" aria-hidden="true">
          <span>{b.city ?? offerWords(c, 1)[0] ?? ""}</span>
          <span>{issue}</span>
        </div>
        <p className="vy-mast" aria-hidden="true" style={{ ["--n" as string]: Math.max(5, c.name.length) }}>
          {words.map((w, n) => (
            <span key={n} style={{ marginRight: n < words.length - 1 ? "0.18em" : undefined }}>
              {[...w].map((ch, m) => (
                <span key={m} style={i(k++)}>
                  {n === words.length - 1 && words.length > 1 ? <em>{ch}</em> : ch}
                </span>
              ))}
            </span>
          ))}
        </p>
        <span />
        <div className="vy-lines">
          <div>
            <p className="vy-kick">{hero.eyebrow}</p>
            <h1 className={plain.length > 48 ? "is-s" : undefined}>
              <Masked text={hero.headline} />
            </h1>
            <p className="vy-sub">{hero.subheadline}</p>
            <div className="vy-ctas">
              <a href={hero.primaryCta.href} className="btn vy-fill">
                <span>
                  {hero.primaryCta.label} <Arrow />
                </span>
              </a>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="text">
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
            </div>
          </div>
          {facts.length > 0 || b.openingHours?.length ? (
            <dl className="vy-side">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="vy-cap">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
              {b.openingHours?.length ? (
                <div>
                  <dt className="vy-cap">
                    <NowBadge c={c} className="vy-now" />
                  </dt>
                </div>
              ) : null}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const words = c.name.split(" ");
  const nav = navOf(c);
  return (
    <footer className="vy-foot">
      <div className="vy-wrap">
        <p className="vy-foot-mast" aria-hidden="true" style={{ ["--n" as string]: Math.max(5, c.name.length) }}>
          {words.length > 1 ? (
            <>
              {words.slice(0, -1).join(" ")} <em>{words[words.length - 1]}</em>
            </>
          ) : (
            c.name
          )}
        </p>
        <div className="vy-foot-row vy-cap" aria-hidden="true">
          <span>{b.city ?? ""}</span>
          <span>✦</span>
          <span>{folio(nav.length + 2)}</span>
        </div>
        <div className="vy-foot-grid">
          <div>
            <h3>{c.t.explore}</h3>
            {nav.map((n) => (
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
                {c.t.route} ↗
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
        <Legal c={c} className="vy-legal" />
      </div>
    </footer>
  );
}

/** A section as a spread: the chapter number goes on the element for the folio in the header. */
const Spread = ({ id, n, className = "", children }: { id: string; n: number; className?: string; children: ReactNode }) => (
  <section className={`vy-sec ${className}`.trim()} id={id} data-ch={roman(n)}>
    {children}
  </section>
);

/* ── the family ── */

export const voyage: Family = {
  key: "voyage",
  root: "d-voyage",
  fonts: ["Playfair Display", "Newsreader", "Instrument Sans"],
  themeColor: "#f3f0e9",
  accent: "#3e6a6e",
  onAccent: "#ffffff",
  css: CSS,
  extra: EXTRA,
  js: JS + TODAY_JS,
  cls: { wrap: "vy-wrap", eyebrow: "vy-kick", btn: "vy-fill", btnAlt: "vy-line", btnText: "vy-text" },
  Header,
  Hero,
  Footer,
  Head: (p, c) => <Head c={c} {...p} ch={nextCh(c)} />,
  sections: {
    about: (s, c) => {
      const n = nextCh(c);
      const p = c.photo(s.image);
      const small = p ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      return (
        <Spread id={s.id} n={n}>
          <div className="vy-wrap">
            <Head c={c} kicker={c.t.kick.about} title={s.title} ch={n} />
            <div className={`vy-feature${p ? "" : " is-solo"}`}>
              <div>
                <p className="vy-stand" data-rv>
                  {first}
                </p>
                {rest.length > 0 && (
                  <div className="vy-body" data-rv>
                    {rest.map((x, m) => (
                      <p key={m}>{x}</p>
                    ))}
                  </div>
                )}
                {s.highlights.length > 0 && (
                  <ul className="vy-aside" data-rv>
                    {s.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
              {p ? (
                <div>
                  <figure className="vy-fig" data-rv>
                    <div data-px>
                      <Pic p={p} sizes="(min-width: 1000px) 44vw, 92vw" />
                    </div>
                    <figcaption>
                      <b>Fig. 1</b>
                      {p.alt}
                    </figcaption>
                  </figure>
                  {small ? (
                    <figure className="vy-fig vy-fig-small" data-rv style={i(2)}>
                      <div>
                        <Pic p={small} sizes="(min-width: 1000px) 22vw, 46vw" />
                      </div>
                    </figure>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </Spread>
      );
    },
    statement: (s, c) => {
      const n = nextCh(c);
      return (
        <Spread id={s.id} n={n} className="is-tint">
          <div className="vy-wrap vy-quote">
            <blockquote data-rv>
              <span data-px style={{ display: "contents" }} />
              {em(s.title)}
            </blockquote>
            {s.note ? (
              <p className="vy-cap" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </Spread>
      );
    },
    services: (s, c) => {
      const n = nextCh(c);
      const pics = s.items.map((_, m) => c.photo(`art:svc${m}`));
      const any = pics.some(Boolean);
      return (
        <Spread id={s.id} n={n}>
          <div className="vy-wrap">
            <Head c={c} title={s.title} intro={s.intro} ch={n} />
            <p className="vy-count" aria-hidden="true" data-rv>
              <span data-count={s.items.length}>{pad2(s.items.length)}</span>
            </p>
            {any ? (
              <div className={`vy-dests${s.items.length === 1 ? " is-1" : ""}`}>
                {s.items.map((it, m) => {
                  const p = pics[m];
                  const { coord, rest } = splitCoord(it.description);
                  return (
                    <article key={m} className="vy-dest" data-rv style={i(m % 2)}>
                      {p ? (
                        <figure>
                          <Pic p={p} sizes="(min-width: 860px) 50vw, 92vw" />
                          <span className="vy-no" aria-hidden="true">
                            {pad2(m + 1)}
                          </span>
                          <span className="vy-go" aria-hidden="true">
                            <Arrow />
                          </span>
                        </figure>
                      ) : null}
                      <p className="vy-coord vy-cap">
                        <span>
                          <Cross />
                          {coord ?? it.duration ?? pad2(m + 1)}
                        </span>
                        {coord && it.duration ? <span>{it.duration}</span> : null}
                      </p>
                      <h3>{it.title}</h3>
                      <p>{rest}</p>
                      {it.price ? (
                        <p className="vy-price">
                          <b>{it.price}</b>
                        </p>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            ) : (
              <ol className="vy-index">
                {s.items.map((it, m) => {
                  const { coord, rest } = splitCoord(it.description);
                  return (
                    <li key={m} data-rv style={i(m % 4)}>
                      <span className="vy-no">{pad2(m + 1)}</span>
                      <div>
                        <h3>{it.title}</h3>
                        <p>{rest}</p>
                      </div>
                      {coord || it.duration || it.price ? (
                        <p className="vy-coord vy-cap">
                          {coord ? <span>{coord}</span> : null}
                          {it.duration ? <span>{it.duration}</span> : null}
                          {it.price ? <span>{it.price}</span> : null}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </Spread>
      );
    },
    process: (s, c) => {
      const n = nextCh(c);
      // Postcards from the photographs nobody asked for by name, on every other stop.
      const posts = s.steps.map((_, m) => (m % 2 === 0 ? c.spare() : null));
      return (
        <section className="vy-trip" id={s.id} data-ch={roman(n)}>
          <div className="vy-pin">
            <div className="vy-wrap">
              <Head c={c} title={s.title} intro={s.intro} ch={n} />
            </div>
            <div className="vy-track">
              <div className="vy-wrap">
                <ol className="vy-stops">
                  {s.steps.map((st, m) => {
                    const p = posts[m];
                    return (
                      <li key={m} className={`vy-stop${p ? " has-post" : ""}`}>
                        <p className="vy-day vy-cap">
                          <b>{pad2(m + 1)}</b>
                        </p>
                        <h3>{st.title}</h3>
                        <p>{st.description}</p>
                        {p ? (
                          <figure className="vy-post">
                            <div>
                              <Pic p={p} sizes="(min-width: 1000px) 22vw, 80vw" />
                            </div>
                            <figcaption>{p.alt}</figcaption>
                          </figure>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
                <svg className="vy-plane" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" fill="#121519" />
                  <path d="M6.5 12.6 17.5 8l-3.2 9.4-2.6-3.6-5.2-1.2Z" fill="#f3f0e9" />
                </svg>
              </div>
            </div>
            <div className="vy-wrap vy-trip-bar vy-cap" aria-hidden="true">
              <span>{pad2(1)}</span>
              <i />
              <span>{pad2(s.steps.length)}</span>
            </div>
          </div>
        </section>
      );
    },
    features: (s, c) => {
      const n = nextCh(c);
      return (
        <Spread id={s.id} n={n}>
          <div className="vy-wrap">
            <Head c={c} title={s.title} intro={s.intro} ch={n} />
            <ol className="vy-steps">
              {s.items.map((it, m) => (
                <li key={m} data-rv style={i(m % 4)}>
                  <span className="vy-n">
                    {pad2(m + 1)}
                    <Icon name={it.icon} />
                  </span>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Spread>
      );
    },
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const n = nextCh(c);
      return (
        <Spread id={s.id} n={n}>
          <div className="vy-wrap">
            <Head c={c} kicker={c.t.kick.gallery} title={s.title} ch={n} />
            <div className={`vy-essay${pics.length < 3 ? " is-few" : ""}`}>
              {pics.slice(0, 9).map((p, m) => (
                <figure key={m} data-rv style={i(m % 3)}>
                  <div data-px>
                    <Pic p={p} sizes={m === 0 ? "(min-width: 900px) 64vw, 92vw" : "(min-width: 900px) 32vw, 46vw"} />
                  </div>
                  <figcaption>
                    <b>Fig. {m + 2}</b>
                    {p.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Spread>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      const n = nextCh(c);
      return (
        <Spread id={s.id} n={n} className="is-tint">
          <div className="vy-wrap">
            <Head c={c} kicker={c.t.kick.menu} title={s.title} intro={s.intro} ch={n} />
            <div className="vy-carte">
              {cats.map((cat, m) => (
                <div key={m} data-rv style={i(m % 2)}>
                  <h3>{cat.name}</h3>
                  <ul>
                    {cat.items.map((d, k) => (
                      <li key={k}>
                        <b>{d.name}</b>
                        {d.price ? <span>{d.price}</span> : null}
                        {d.description ? <p>{d.description}</p> : null}
                        {d.tags?.map((t) => (
                          <small key={t} className="vy-cap">
                            {t}
                          </small>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {s.note ? (
              <p className="vy-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </Spread>
      );
    },
    hours: (s, c) => {
      const n = nextCh(c);
      return (
        <Spread id={s.id} n={n} className="is-tint">
          <div className="vy-wrap vy-split">
            <div className="vy-copy">
              <Head c={c} kicker={c.t.kick.hours} title={s.title} ch={n} />
              {s.note ? <p data-rv>{s.note}</p> : null}
              <Reach c={c} />
            </div>
            <div className="vy-box" data-rv>
              <h3>
                {c.t.hours}
                <NowBadge c={c} className="vy-now vy-cap" />
              </h3>
              {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
            </div>
          </div>
        </Spread>
      );
    },
    booking: (s, c) => {
      const n = nextCh(c);
      const b = c.spec.business;
      return (
        <Spread id={s.id} n={n} className="is-tint">
          <div className="vy-wrap vy-reply">
            <div className="vy-copy">
              <Head c={c} kicker={c.t.kick.booking} title={s.title} ch={n} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              {!c.spec.sections.some((x) => x.type === "hours") ? <Hours c={c} /> : null}
              <Reach c={c} />
            </div>
            <div className="vy-card" data-rv>
              <div className="vy-card-top">
                <p className="vy-card-to">
                  <small>{c.t.submit[s.kind]}</small>
                  {c.name}
                  {b.city ? <small>{b.city}</small> : null}
                </p>
                <span className="vy-stamp" aria-hidden="true">
                  <b>{c.name.charAt(0)}</b>
                  <small>{b.city ?? ""}</small>
                </span>
              </div>
              <svg className="vy-postmark" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <circle cx="50" cy="50" r="30" />
                <circle cx="50" cy="50" r="24" />
                <path d="M-10 36c12-6 24 6 36 0s24-6 36 0 24 6 36 0M-10 50c12-6 24 6 36 0s24-6 36 0 24 6 36 0M-10 64c12-6 24 6 36 0s24-6 36 0 24 6 36 0" />
              </svg>
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
            </div>
          </div>
        </Spread>
      );
    },
    contact: (s, c) => {
      const n = nextCh(c);
      const b = c.spec.business;
      const rows: { k: string; v: ReactNode }[] = [];
      rows.push({ k: c.t.contact, v: c.name });
      if (b.address) rows.push({ k: c.t.address, v: b.address });
      else if (b.city) rows.push({ k: c.t.address, v: b.city });
      if (b.phone) rows.push({ k: c.t.phone, v: <a href={tel(b.phone)}>{b.phone}</a> });
      if (b.email) rows.push({ k: c.t.email, v: <a href={`mailto:${b.email}`}>{b.email}</a> });
      if (b.mapsUrl)
        rows.push({
          k: c.t.route,
          v: (
            <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
              {c.t.route} ↗
            </a>
          ),
        });
      return (
        <Spread id={s.id} n={n}>
          <div className="vy-wrap">
            <Head c={c} kicker={c.t.kick.contact} title={s.title} ch={n} />
            <div className="vy-colo">
              <div className="vy-copy">
                {s.body ? <p data-rv>{s.body}</p> : null}
                <dl className="vy-colo-list" data-rv>
                  {rows.map((r) => (
                    <div key={r.k}>
                      <dt className="vy-cap">{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
                {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
              </div>
              {s.showForm ? (
                <div className="z-panel" data-rv>
                  <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
                </div>
              ) : (
                <nav className="vy-register" aria-label={c.t.explore} data-rv>
                  {navOf(c).map((x) => (
                    <a key={x.id} href={`#${x.id}`}>
                      <span className="r" aria-hidden="true">
                        {roman(chapterOf(c, x.id))}
                      </span>
                      <span className="t">{x.label}</span>
                      <span className="l" aria-hidden="true" />
                      <span className="vy-cap" aria-hidden="true">
                        {folio(chapterOf(c, x.id))}
                      </span>
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </Spread>
      );
    },
  },
};
