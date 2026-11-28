import type { ReactNode } from "react";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, splitLines, tel, type Ctx, type Family, type HeadProps, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Beton: an original template (no portfolio demo). Industrial and brutalist: raw concrete grey
 * with grain and formwork tie holes, graphite, one iron-oxide red ("menie"), huge tall capitals
 * and technical-drawing details drawn in SVG: structural grid axes with lettered bubbles,
 * dimension lines, section-cut markers and a drawing title block as the footer. The headline is
 * set like slabs craned into place (each line slides in from alternating sides), the opening
 * photograph is poured in from the top, service slabs shift into line as you scroll, the
 * process is a Gantt chart whose bars are built as it comes into view and the projects run past
 * horizontally under a pinned frame, followed by a CAD crosshair. Made for builders,
 * contractors, concrete and steel works, demolition, roofing and other heavy trades.
 */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .11 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const CSS = `
.d-beton{--paper:#d9d6cf;--paper-2:#cbc7bf;--paper-3:#e6e3dd;--ink:#141414;--ink-2:#1d1e1f;--ink-3:#2a2b2d;--steel:#3b3d40;--dim:#55524c;--line:rgba(20,20,20,.16);--line-2:rgba(20,20,20,.38);--ox:#b8371a;--ox-d:#952a12;--ox-l:#e7b3a3;--on-dark:rgba(234,231,225,.72);--pad:clamp(16px,4vw,56px);--heavy:cubic-bezier(.83,0,.17,1);--out:cubic-bezier(.16,1,.3,1);--bs:"Big Shoulders Display","Arial Narrow",Impact,sans-serif;--grain:${GRAIN};--z-bg2:var(--paper-3);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line-2);--z-accent:var(--ox);--z-on-accent:#fff;--z-display:var(--bs);--z-display-weight:800;--z-radius:0px;--z-field-radius:0px;--z-ico-radius:0px;--z-sec:clamp(80px,10vw,150px);--z-h3:clamp(26px,2.3vw,36px);--z-statement:clamp(40px,6vw,96px);background:var(--paper) var(--grain);color:var(--ink);font-family:"Space Grotesk",system-ui,sans-serif;font-size:clamp(16px,1.04vw,17.5px);line-height:1.55}
.d-beton h1,.d-beton h2,.d-beton h3{font-family:var(--bs);font-weight:800;line-height:.88;letter-spacing:-.005em;text-transform:uppercase;color:var(--ink)}
.d-beton h1 em,.d-beton h2 em,.d-beton h3 em{font-style:normal;color:var(--ox)}
.d-beton h2{font-size:clamp(50px,7.4vw,124px)}
.d-beton h2.is-long{font-size:clamp(38px,4.8vw,80px)}
.d-beton h3{font-size:var(--z-h3);line-height:.95}
.d-beton ::selection{background:var(--ox);color:#fff}
.d-beton .bt-wrap{position:relative;width:min(100%,1440px);margin-inline:auto;padding-inline:var(--pad)}
.d-beton .bt-kick{display:inline-flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--ink)}
.d-beton .bt-kick::before{content:"";width:10px;height:10px;background:var(--ox)}
.d-beton .bt-mono{font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;font-variant-numeric:tabular-nums}
.d-beton .bt-mark{width:64px;height:44px;flex:none;color:var(--ink);overflow:visible}
.d-beton .bt-mark circle,.d-beton .bt-mark line{fill:none;stroke:currentColor;stroke-width:1.5}
.d-beton .bt-mark circle{stroke-dasharray:126;stroke-dashoffset:0;transition:stroke-dashoffset 1.1s var(--heavy) .1s}
.d-beton .bt-mark path{fill:var(--ox);transition:transform .6s var(--heavy) .6s;transform-origin:44px 22px}
.d-beton .bt-mark text{fill:currentColor;font-family:var(--bs);font-size:12px;font-weight:700;letter-spacing:.04em}
.demo-js .d-beton [data-rv]:not(.in) .bt-mark circle{stroke-dashoffset:126}
.demo-js .d-beton [data-rv]:not(.in) .bt-mark path{transform:scaleX(0)}
.d-beton .btn{position:relative;display:inline-flex;align-items:stretch;min-height:58px;border:2px solid var(--ink);overflow:hidden;isolation:isolate;font-family:var(--bs);font-size:20px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;line-height:1;transition:color .35s var(--heavy),border-color .35s}
.d-beton .btn{align-items:center;padding:0 22px}
.d-beton .btn>span{display:flex;align-items:center}
.d-beton .btn>i{display:grid;align-self:stretch;place-items:center;width:56px;margin:0 -22px 0 22px;border-left:2px solid currentColor;transition:border-color .35s}
.d-beton .btn svg{width:20px;height:20px;transition:transform .45s var(--heavy)}
.d-beton .btn:hover svg{transform:translateX(5px)}
.d-beton .btn::before{content:"";position:absolute;inset:0;z-index:-1;transform:translateX(-101%);transition:transform .5s var(--heavy)}
.d-beton .btn:hover::before{transform:none}
.d-beton .bt-fill{background:var(--ox);border-color:var(--ox);color:#fff}
.d-beton .bt-fill::before{background:var(--ink)}
.d-beton .bt-fill:hover{border-color:var(--ink)}
.d-beton .bt-line{color:var(--ink)}
.d-beton .bt-line::before{background:var(--ink)}
.d-beton .bt-line:hover{color:var(--paper)}
.d-beton .bt-text{display:inline-flex;align-items:center;gap:10px;min-height:44px;font-family:var(--bs);font-size:19px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);background:linear-gradient(var(--ox),var(--ox)) 0 100%/100% 3px no-repeat;transition:background-size .45s var(--heavy),color .3s}
.d-beton .bt-text:hover{color:var(--ox);background-size:30% 3px}
.d-beton .z-form .btn{justify-content:center}
.d-beton .bt-hdr{position:sticky;top:0;z-index:50;background:var(--paper) var(--grain);border-bottom:2px solid var(--ink);transition:background-color .45s var(--heavy),color .45s var(--heavy)}
.d-beton.is-scrolled .bt-hdr{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.d-beton .bt-bar{display:flex;align-items:stretch;height:74px;transition:height .45s var(--heavy)}
.d-beton.is-scrolled .bt-bar{height:62px}
.d-beton .bt-logo{display:flex;align-items:center;gap:12px;min-width:0;padding-right:18px}
.d-beton .bt-logo i{position:relative;display:grid;flex:none;place-items:center;width:44px;height:44px;background:var(--ink);color:var(--paper);font-family:var(--bs);font-size:30px;font-style:normal;font-weight:900;line-height:1;transition:background-color .45s,color .45s}
.d-beton .bt-logo i::after{content:"";position:absolute;right:-5px;bottom:-5px;width:12px;height:12px;background:var(--ox);transition:transform .45s var(--heavy)}
.d-beton .bt-logo:hover i::after{transform:translate(-37px,-37px)}
.d-beton.is-scrolled .bt-logo i{background:var(--paper);color:var(--ink)}
.d-beton .bt-logo span{overflow:hidden;font-family:var(--bs);font-size:26px;font-weight:900;letter-spacing:.02em;line-height:1;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}
.d-beton .bt-links{display:none;margin-left:auto}
.d-beton .bt-links a{position:relative;display:flex;align-items:center;gap:9px;padding:0 clamp(12px,1.2vw,20px);white-space:nowrap;border-left:1px solid var(--line-2);font-size:14px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;overflow:hidden;transition:color .3s}
.d-beton.is-scrolled .bt-links a{border-color:rgba(234,231,225,.2)}
.d-beton .bt-links small{display:grid;place-items:center;width:22px;height:22px;border:1px solid currentColor;border-radius:50%;font-size:10px;font-weight:700;letter-spacing:0;transition:background-color .3s,color .3s,border-color .3s}
.d-beton .bt-links a::after{content:"";position:absolute;left:0;right:0;bottom:0;height:4px;background:var(--ox);transform:translateY(5px);transition:transform .35s var(--heavy)}
.d-beton .bt-links a:hover::after{transform:none}
.d-beton .bt-links a:hover small{background:var(--ox);border-color:var(--ox);color:#fff}
.d-beton .bt-hcta{display:none;align-self:center;margin-left:18px;min-height:48px}
.d-beton .bt-hcta{padding:0 18px;font-size:18px}
.d-beton .bt-burger{display:flex;align-items:center;gap:12px;margin-left:auto;margin-right:calc(var(--pad) * -1);padding:0 var(--pad) 0 20px;border:0;border-left:2px solid currentColor;background:none;font-family:var(--bs);font-size:20px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;min-width:44px}
.d-beton .bt-burger i{position:relative;display:block;width:26px;height:12px}
.d-beton .bt-burger i::before,.d-beton .bt-burger i::after{content:"";position:absolute;left:0;width:100%;height:3px;background:currentColor;transition:transform .45s var(--heavy),width .45s var(--heavy)}
.d-beton .bt-burger i::before{top:0}
.d-beton .bt-burger i::after{bottom:0;width:62%}
.d-beton.menu-open .bt-burger i::before{transform:translateY(4.5px) rotate(45deg)}
.d-beton.menu-open .bt-burger i::after{width:100%;transform:translateY(-4.5px) rotate(-45deg)}
.d-beton .bt-links a:nth-child(5){display:none}
@media (min-width:1440px){.d-beton .bt-links a:nth-child(5){display:flex}}
@media (min-width:1180px){.d-beton .bt-links{display:flex}.d-beton .bt-hcta{display:inline-flex}.d-beton .bt-burger{display:none}}
.d-beton .bt-menu{position:fixed;inset:0;z-index:45;display:flex;flex-direction:column;padding:96px var(--pad) 110px;background:var(--ink) var(--grain);color:var(--paper);overflow-y:auto;transform:translateY(-101%);visibility:hidden;transition:transform .8s var(--heavy),visibility 0s .8s}
.d-beton .bt-menu.is-open{transform:none;visibility:visible;transition:transform .8s var(--heavy)}
.d-beton .bt-menu::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(0,0,0,.55) 0 3px,rgba(255,255,255,.05) 4px,transparent 5px) 0 0/96px 96px;pointer-events:none}
.d-beton .bt-menu nav{position:relative;display:grid;border-top:1px solid rgba(234,231,225,.2)}
.d-beton .bt-menu nav a{display:flex;align-items:center;gap:18px;min-height:64px;padding:6px 0;border-bottom:1px solid rgba(234,231,225,.2);font-family:var(--bs);font-size:clamp(40px,11vw,76px);font-weight:900;line-height:.95;text-transform:uppercase;overflow:hidden}
.d-beton .bt-menu nav a span{display:block;transform:translateX(-105%);transition:transform .7s var(--heavy),color .3s}
.d-beton .bt-menu nav a small{display:grid;flex:none;place-items:center;width:34px;height:34px;border:1.5px solid var(--ox);border-radius:50%;font-family:"Space Grotesk",sans-serif;font-size:13px;font-weight:700;color:var(--ox);opacity:0;transition:opacity .4s}
.d-beton .bt-menu.is-open nav a span{transform:none;transition-delay:calc(.25s + var(--i,0) * 70ms)}
.d-beton .bt-menu.is-open nav a small{opacity:1;transition-delay:calc(.45s + var(--i,0) * 70ms)}
.d-beton .bt-menu nav a:hover span{color:var(--ox)}
.d-beton .bt-menu-foot{position:relative;display:grid;gap:18px;margin-top:36px;color:var(--on-dark)}
.d-beton .bt-menu-foot a:not(.btn){display:inline-flex;align-items:center;min-height:44px;font-size:18px;color:var(--paper)}
.d-beton .bt-menu .bt-line{color:var(--paper);border-color:var(--paper);justify-self:start}
.d-beton .bt-menu .bt-line::before{background:var(--ox)}
.d-beton .bt-axes{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.d-beton .bt-axes>div{display:flex;justify-content:space-between;height:100%}
.d-beton .bt-axes i{position:relative;width:1px;height:100%;background:repeating-linear-gradient(180deg,var(--line-2) 0 18px,transparent 18px 23px,var(--line-2) 23px 25px,transparent 25px 30px);transform-origin:top;animation:bt-grow 1.8s var(--heavy) both;animation-delay:calc(var(--i,0) * 90ms)}
.d-beton .bt-axes b{position:absolute;top:16px;left:0;display:grid;place-items:center;width:28px;height:28px;border:1.5px solid var(--ink);border-radius:50%;background:var(--paper);font-family:var(--bs);font-size:15px;font-weight:800;transform:translateX(-50%);animation:bt-pop .5s var(--heavy) both;animation-delay:calc(.5s + var(--i,0) * 90ms)}
.d-beton .bt-axes.is-dark i{background:repeating-linear-gradient(180deg,rgba(234,231,225,.22) 0 18px,transparent 18px 23px,rgba(234,231,225,.22) 23px 25px,transparent 25px 30px)}
.d-beton .bt-axes.is-dark b{background:var(--ink);border-color:rgba(234,231,225,.6);color:var(--paper)}
@media (max-width:640px){.d-beton .bt-axes i:nth-child(even){display:none}}
.d-beton .bt-hero{position:relative;padding-top:clamp(64px,5.4vw,96px);overflow:hidden}
.d-beton .bt-hero-in{position:relative;z-index:2}
.d-beton .bt-hero-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin-bottom:clamp(22px,2.2vw,34px);animation:bt-in-l .9s var(--heavy) .15s both}
.d-beton .bt-tag{display:inline-flex;flex-wrap:wrap;align-items:stretch;border:1.5px solid var(--ink);font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
.d-beton .bt-tag b{padding:7px 12px;background:var(--ink);color:var(--paper);font-weight:600}
.d-beton .bt-tag span{padding:7px 12px}
.d-beton .bt-now{display:inline-flex;align-items:center;gap:8px;padding:7px 12px;border:1.5px solid currentColor;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.d-beton .bt-now[hidden]{display:none}
.d-beton .bt-now::before{content:"";width:9px;height:9px;background:currentColor}
.d-beton .bt-now.is-open{color:#2f6b3a}
.d-beton .bt-now.is-closed{color:var(--ox)}
.d-beton .bt-hero h1{position:relative;font-size:clamp(62px,11.6vw,206px);line-height:.84;letter-spacing:-.01em}
.d-beton .bt-hero h1.is-m{font-size:clamp(50px,7.2vw,150px)}
.d-beton .bt-hero h1.is-s{font-size:clamp(42px,6.3vw,112px);line-height:.9}
.d-beton .bt-ln{position:relative;display:block;overflow:hidden;padding:.04em 0 .02em}
.d-beton .bt-ln>span{display:inline-block;transform:translateX(calc(110vw * var(--dir,-1)));animation:bt-slab 1.25s var(--heavy) forwards;animation-delay:calc(.3s + var(--i,0) * 150ms)}
.d-beton .bt-ln:nth-child(even)>span{--dir:1}
.d-beton .bt-ln::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1.5px;background:var(--line-2);transform:scaleX(0);transform-origin:left;animation:bt-draw 1s var(--heavy) forwards;animation-delay:calc(1.1s + var(--i,0) * 150ms)}
.d-beton .bt-hero h1:not(.is-marked) .bt-ln:last-child>span{color:var(--ox)}
.d-beton .bt-hero-foot>*{min-width:0}
.d-beton .bt-hero-foot{display:grid;gap:22px;margin-top:clamp(24px,2.4vw,40px)}
@media (min-width:980px){.d-beton .bt-hero-foot{grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:28px 64px}.d-beton .bt-hero-foot .bt-dim{grid-column:1/-1}}
.d-beton .bt-lede{max-width:54ch;font-size:clamp(17px,1.35vw,21px);line-height:1.5;animation:bt-in-l 1s var(--heavy) 1.05s both}
.d-beton .bt-ctas{display:flex;flex-wrap:wrap;gap:12px;animation:bt-in-r 1s var(--heavy) 1.15s both}
.d-beton .bt-dim{position:relative;display:flex;align-items:center;gap:14px;height:30px;color:var(--ink)}
.d-beton .bt-dim>svg{flex:1;min-width:0;height:30px;overflow:visible}
.d-beton .bt-dim line,.d-beton .bt-dim path{stroke:currentColor;stroke-width:1.25;fill:none;vector-effect:non-scaling-stroke}
.d-beton .bt-dim>svg:first-child{transform-origin:right}
.d-beton .bt-dim>svg:last-child{transform-origin:left}
.d-beton .bt-dim>span{flex:none;max-width:60%;overflow:hidden;font-size:12px;font-weight:600;letter-spacing:.18em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}
.d-beton .bt-hero .bt-dim>svg{animation:bt-draw 1.2s var(--heavy) .95s both}
.d-beton .bt-hero .bt-dim>span{animation:bt-pop .5s var(--heavy) 1.6s both}
.d-beton .bt-hero-pic{position:relative;z-index:1;margin-top:clamp(34px,3.4vw,60px);clip-path:inset(0 0 100% 0);animation:bt-pour 1.6s var(--heavy) .75s forwards}
.d-beton .bt-hero-pic figure{position:relative;height:clamp(320px,62vh,720px);overflow:hidden;background:var(--ink)}
.d-beton .bt-hero-pic img{width:100%;height:100%;object-fit:cover;filter:grayscale(.72) contrast(1.12) brightness(.9);scale:1.22;animation:bt-settle 2.6s var(--out) .75s forwards}
.d-beton .bt-hero-pic figure::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,20,20,.0) 50%,rgba(20,20,20,.55));pointer-events:none}
.d-beton .bt-hero-pic .bt-cap{position:absolute;left:var(--pad);right:var(--pad);bottom:22px;z-index:2;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;color:var(--paper)}
.d-beton .bt-hero-pic .bt-mark{color:var(--paper)}
.d-beton .bt-cap p{padding:8px 12px;background:var(--ox);color:#fff;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
.d-beton .bt-cross{position:absolute;inset:0;z-index:3;pointer-events:none;opacity:0;transition:opacity .3s}
.d-beton .bt-cross.is-on{opacity:1}
.d-beton .bt-cross::before,.d-beton .bt-cross::after{content:"";position:absolute;background:rgba(234,231,225,.55)}
.d-beton .bt-cross::before{left:0;right:0;top:var(--y,50%);height:1px}
.d-beton .bt-cross::after{top:0;bottom:0;left:var(--x,50%);width:1px}
.d-beton .bt-cross span{position:absolute;left:var(--x,50%);top:var(--y,50%);padding:4px 7px;background:var(--paper);color:var(--ink);font-size:11px;font-weight:600;letter-spacing:.1em;font-variant-numeric:tabular-nums;white-space:nowrap;transform:translate(10px,10px)}
.d-beton .bt-hero-pic figure{cursor:crosshair}
.d-beton .bt-hero-index{position:relative;z-index:1;display:grid;margin-top:clamp(40px,5vw,72px);border-top:2px solid var(--ink)}
@media (min-width:760px){.d-beton .bt-hero-index{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:clamp(24px,4vw,64px)}}
.d-beton .bt-hero-index li{display:flex;align-items:baseline;gap:18px;padding:16px 0;border-bottom:1px solid var(--line-2);font-family:var(--bs);font-size:clamp(28px,3.2vw,48px);font-weight:800;line-height:1;text-transform:uppercase;animation:bt-in-l .9s var(--heavy) both;animation-delay:calc(1.1s + var(--i,0) * 80ms)}
.d-beton .bt-hero-index small{flex:none;font-family:"Space Grotesk",sans-serif;font-size:12px;font-weight:600;letter-spacing:.14em;color:var(--ox)}
.d-beton .bt-facts{position:relative;z-index:2;display:grid;margin-top:0;border:2px solid var(--ink);border-top:0;background:var(--paper-3)}
.d-beton .bt-hero-pic+.bt-facts,.d-beton .bt-hero-index+.bt-facts{margin-top:0}
.d-beton .bt-hero-in+.bt-facts{margin-top:clamp(40px,5vw,72px);border-top:2px solid var(--ink)}
@media (min-width:760px){.d-beton .bt-facts{grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}}
.d-beton .bt-facts div{display:grid;gap:4px;padding:18px 22px;border-top:1px solid var(--line-2);animation:bt-in-r .8s var(--heavy) both;animation-delay:calc(1.4s + var(--i,0) * 90ms)}
.d-beton .bt-facts div:first-child{border-top:0}
@media (min-width:760px){.d-beton .bt-facts div{border-top:0;border-left:1px solid var(--line-2)}.d-beton .bt-facts div:first-child{border-left:0}}
.d-beton .bt-facts dt{font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--dim)}
.d-beton .bt-facts dd{margin:0;font-weight:600}
.d-beton .bt-facts a{text-decoration:underline;text-decoration-color:var(--ox);text-decoration-thickness:2px;text-underline-offset:4px}
.d-beton .bt-ruler{position:relative;margin-top:clamp(56px,7vw,100px);overflow:hidden;background:var(--ink);color:var(--paper);border-block:2px solid var(--ink)}
.d-beton .bt-ruler-track{display:flex;width:max-content;padding:30px 0 18px;transform:translateX(calc(var(--p,0) * 16vw - 22vw));background:repeating-linear-gradient(90deg,rgba(234,231,225,.75) 0 1px,transparent 1px 12px) 0 0/100% 9px no-repeat,repeating-linear-gradient(90deg,rgba(234,231,225,.95) 0 2px,transparent 2px 60px) 0 0/100% 18px no-repeat}
.d-beton .bt-ruler span{display:inline-flex;align-items:baseline;gap:14px;padding:0 44px 0 0;font-family:var(--bs);font-size:clamp(30px,3.4vw,52px);font-weight:800;line-height:1;text-transform:uppercase;white-space:nowrap}
.d-beton .bt-ruler b{font-family:"Space Grotesk",sans-serif;font-size:12px;font-weight:600;letter-spacing:.14em;color:var(--ox)}
.d-beton .bt-sec{position:relative;padding-block:clamp(84px,10vw,160px)}
.d-beton .bt-sec.is-light{background:var(--paper-3) var(--grain)}
.d-beton .bt-sec.is-dark{background:var(--ink-2) var(--grain);color:var(--on-dark)}
.d-beton .is-dark h2,.d-beton .is-dark h3{color:var(--paper)}
.d-beton .is-dark .bt-kick,.d-beton .is-dark .bt-mark{color:var(--paper)}
.d-beton .bt-ties{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 50% 50%,rgba(0,0,0,.5) 0 4px,rgba(255,255,255,.06) 5px,transparent 6px) 0 0/clamp(110px,12vw,180px) clamp(110px,12vw,180px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px) 0 0/clamp(330px,36vw,540px) 100%}
.d-beton .bt-head{display:grid;gap:20px;margin-bottom:clamp(40px,5.4vw,84px)}
.d-beton .bt-head-top{display:flex;align-items:center;gap:16px}
.d-beton .bt-head-top::after{content:"";flex:1;height:1.5px;background:currentColor;opacity:.4;transform-origin:left;transition:transform 1.2s var(--heavy) .2s}
.demo-js .d-beton .bt-head-top[data-rv]:not(.in)::after{transform:scaleX(0)}
.d-beton .bt-head-top[data-rv]{transform:none}
.d-beton .bt-head h2{max-width:16ch}
.d-beton .bt-head h2.is-long{max-width:24ch}
.demo-js .d-beton .bt-head h2[data-rv]{transform:translateX(-6vw);transition:opacity .8s var(--heavy),transform 1.1s var(--heavy)}
.demo-js .d-beton .bt-head h2[data-rv].in{transform:none}
.d-beton .bt-head .bt-intro{max-width:56ch;font-size:clamp(17px,1.25vw,20px);color:var(--dim)}
.d-beton .is-dark .bt-head .bt-intro{color:var(--on-dark)}
@media (min-width:1000px){.d-beton .bt-head.is-row{grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);align-items:end;column-gap:64px}.d-beton .bt-head.is-row .bt-head-top{grid-column:1/-1}}
.d-beton .bt-about{display:grid;gap:clamp(48px,6vw,110px);align-items:start}
@media (min-width:980px){.d-beton .bt-about{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr)}.d-beton .bt-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:1040px}}
.d-beton .bt-about-copy{display:grid;gap:22px}
.d-beton .bt-about-copy .bt-head{margin-bottom:12px}
.d-beton .bt-about-copy>p{max-width:60ch;color:var(--dim)}
.d-beton .bt-about-copy>.bt-lead{font-size:clamp(20px,1.7vw,27px);line-height:1.38;color:var(--ink)}
.d-beton .bt-spec{display:grid;margin-top:14px;border-top:2px solid var(--ink)}
@media (min-width:640px){.d-beton .bt-spec{grid-template-columns:repeat(2,minmax(0,1fr))}.d-beton .bt-spec li:nth-child(odd){border-right:1px solid var(--line-2)}.d-beton .bt-spec li:nth-child(even){padding-left:18px}}
.d-beton .bt-spec li{display:flex;align-items:center;gap:14px;min-height:62px;padding:12px 12px 12px 0;border-bottom:1px solid var(--line-2);font-weight:600}
.d-beton .bt-spec b{display:grid;flex:none;place-items:center;width:26px;height:26px;border:2px solid var(--ink);font-size:0}
.d-beton .bt-spec b::after{content:"";width:12px;height:12px;background:var(--ox);transform:scale(0);transition:transform .5s var(--heavy);transition-delay:calc(.2s + var(--i,0) * 120ms)}
.d-beton .bt-spec.in b::after,html:not(.demo-js) .d-beton .bt-spec b::after{transform:none}
.d-beton .bt-measure{position:relative;padding:44px 44px 0 0}
.d-beton .bt-measure-pic{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--ink)}
.d-beton .bt-measure-pic img{width:100%;height:116%;object-fit:cover;filter:grayscale(.7) contrast(1.1);transform:translateY(calc(var(--p,0) * -7%))}
.d-beton .bt-measure .bt-dim{position:absolute;left:0;right:44px;top:0}
.d-beton .bt-measure .bt-dim.is-v{left:auto;right:0;top:44px;bottom:0;width:30px;height:auto;flex-direction:column}
.d-beton .bt-measure .bt-dim.is-v>svg{width:30px;height:auto;flex:1}
.d-beton .bt-measure .bt-dim.is-v>span{writing-mode:vertical-rl;max-width:none;max-height:60%}
.d-beton .bt-measure .bt-dim>svg{transition:transform 1.3s var(--heavy) .3s}
.demo-js .d-beton .bt-measure:not(.in) .bt-dim>svg{transform:scaleX(0)}
.demo-js .d-beton .bt-measure:not(.in) .bt-dim.is-v>svg{transform:scaleY(0)}
.d-beton .bt-measure .bt-dim.is-v>svg:first-child{transform-origin:bottom}
.d-beton .bt-measure .bt-dim.is-v>svg:last-child{transform-origin:top}
.demo-js .d-beton .bt-measure[data-rv]{opacity:1;transform:none}
.demo-js .d-beton .bt-measure[data-rv] .bt-measure-pic{clip-path:inset(0 0 100% 0);transition:clip-path 1.4s var(--heavy)}
.demo-js .d-beton .bt-measure[data-rv].in .bt-measure-pic{clip-path:inset(0)}
.d-beton .bt-measure .bt-badge{position:absolute;left:-14px;bottom:28px;display:flex;align-items:center;gap:10px;padding:12px 16px;background:var(--ox);color:#fff;font-family:var(--bs);font-size:22px;font-weight:800;text-transform:uppercase;line-height:1}
.d-beton .bt-measure .bt-badge svg{width:20px;height:20px}
.d-beton .bt-svc{border-top:2px solid var(--ink)}
.d-beton .bt-slab{position:relative;border-bottom:2px solid var(--ink);overflow:hidden}
.d-beton .bt-slab-in{position:relative;display:grid;gap:18px 28px;padding-block:clamp(26px,3.2vw,46px);transform:translateX(calc(max(var(--p,0),0) * var(--dir,1) * var(--shift,0px)));transition:transform .2s linear}
@media (min-width:900px){.d-beton .bt-svc{--shift:9vw}.d-beton .bt-slab-in{grid-template-columns:minmax(90px,.55fr) minmax(0,2fr) minmax(0,1.4fr);align-items:center}}
.d-beton .bt-slab::before{content:"";position:absolute;inset:0;background:var(--ink);transform:translateX(-101%);transition:transform .6s var(--heavy)}
.d-beton .bt-slab:hover::before{transform:none}
.d-beton .bt-slab:hover h3,.d-beton .bt-slab:hover .bt-code{color:var(--paper)}
.d-beton .bt-slab:hover .bt-slab-copy p{color:var(--on-dark)}
.d-beton .bt-code{font-family:var(--bs);font-size:clamp(66px,8vw,140px);font-weight:900;line-height:.8;color:transparent;-webkit-text-stroke:1.5px var(--ink);transition:color .5s var(--heavy),-webkit-text-stroke-color .5s}
.d-beton .bt-slab:hover .bt-code{-webkit-text-stroke-color:var(--ox);color:var(--ox)}
.d-beton .bt-slab-copy{display:grid;gap:12px;align-content:center}
.d-beton .bt-slab-copy h3{font-size:clamp(34px,3.6vw,60px);transition:color .4s}
.d-beton .bt-slab-copy p{max-width:52ch;color:var(--dim);transition:color .4s}
.d-beton .bt-slab-meta{display:flex;flex-wrap:wrap;gap:8px}
.d-beton .bt-slab-meta span{padding:5px 10px;border:1.5px solid var(--ox);color:var(--ox);font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.d-beton .bt-slab-pic{position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--ink-3)}
.d-beton .bt-slab-pic img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.15);transition:filter .7s var(--heavy),transform 1s var(--heavy)}
.d-beton .bt-slab:hover .bt-slab-pic img{filter:grayscale(0) contrast(1.05);transform:scale(1.05)}
.d-beton .bt-slab-pic::after{content:"";position:absolute;right:0;bottom:0;width:22%;height:6px;background:var(--ox);transform:scaleX(0);transform-origin:right;transition:transform .6s var(--heavy) .1s}
.d-beton .bt-slab:hover .bt-slab-pic::after{transform:none}
.d-beton .bt-slab-ico{display:grid;place-items:center;justify-self:start;width:clamp(84px,8vw,120px);aspect-ratio:1;border:2px solid var(--ink);color:var(--ox);transition:border-color .4s,transform .6s var(--heavy)}
@media (min-width:900px){.d-beton .bt-slab-ico{justify-self:end}}
.d-beton .bt-slab-ico svg{width:42%;height:42%}
.d-beton .bt-slab:hover .bt-slab-ico{border-color:var(--ox);transform:rotate(90deg)}
.d-beton .bt-blocks{display:grid;gap:2px;padding:2px;background:var(--ink);grid-template-columns:minmax(0,1fr)}
@media (min-width:700px){.d-beton .bt-blocks{grid-template-columns:repeat(2,minmax(0,1fr))}.d-beton .bt-blocks.is-odd>li:last-child{grid-column:1/-1}}
@media (min-width:1000px){.d-beton .bt-blocks{grid-template-columns:repeat(var(--cols,3),minmax(0,1fr))}.d-beton .bt-blocks.is-odd>li:last-child{grid-column:auto}.d-beton .bt-blocks.is-five>li:last-child{grid-column:span 2}}
.d-beton .bt-blocks li{position:relative;display:grid;gap:14px;align-content:start;padding:clamp(26px,3vw,44px);background:var(--paper-3) var(--grain);overflow:hidden;transition:background-color .4s}
.d-beton .bt-blocks li::before,.d-beton .bt-blocks li::after{content:"";position:absolute;width:9px;height:9px;border-radius:50%;background:rgba(20,20,20,.3);box-shadow:inset 1px 1px 2px rgba(0,0,0,.4)}
.d-beton .bt-blocks li::before{left:14px;top:14px}
.d-beton .bt-blocks li::after{right:14px;top:14px}
.d-beton .bt-blocks .bt-blk-ico{display:grid;place-items:center;width:58px;height:58px;background:var(--ink);color:var(--paper);transition:background-color .4s,transform .6s var(--heavy)}
.d-beton .bt-blocks .bt-blk-ico svg{width:26px;height:26px}
.d-beton .bt-blocks li:hover .bt-blk-ico{background:var(--ox);transform:rotate(-90deg)}
.d-beton .bt-blocks h3{font-size:clamp(28px,2.4vw,38px)}
.d-beton .bt-blocks p{color:var(--dim)}
.d-beton .bt-blocks small{position:absolute;right:clamp(26px,3vw,44px);top:clamp(26px,3vw,44px);font-family:var(--bs);font-size:44px;font-weight:900;line-height:1;color:transparent;-webkit-text-stroke:1px var(--line-2)}
.d-beton .bt-blocks li>i{position:absolute;left:0;bottom:0;height:6px;width:100%;background:var(--ox);transform:scaleX(0);transform-origin:left;transition:transform .55s var(--heavy)}
.d-beton .bt-blocks li:hover>i{transform:none}
.d-beton .is-dark .bt-blocks{background:rgba(234,231,225,.22)}
.d-beton .is-dark .bt-blocks li{background:var(--ink-2) var(--grain)}
.d-beton .is-dark .bt-blocks p{color:var(--on-dark)}
.d-beton .is-dark .bt-blocks .bt-blk-ico{background:var(--paper);color:var(--ink)}
.d-beton .is-dark .bt-blocks li:hover .bt-blk-ico{background:var(--ox);color:#fff}
.d-beton .bt-gantt{position:relative;border-top:2px solid var(--ink)}
.d-beton .bt-gantt-hd{display:none}
@media (min-width:900px){.d-beton .bt-gantt-hd{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,7fr);gap:40px;padding:12px 0;border-bottom:1px solid var(--line-2)}.d-beton .bt-gantt-hd ol{display:grid;grid-template-columns:repeat(var(--n,4),minmax(0,1fr))}.d-beton .bt-gantt-hd li{padding-left:8px;border-left:1px solid var(--line-2)}}
.d-beton .bt-gantt>li{position:relative;display:grid;gap:12px 40px;padding:clamp(22px,2.6vw,34px) 0;border-bottom:1px solid var(--line-2)}
@media (min-width:900px){.d-beton .bt-gantt>li{grid-template-columns:minmax(0,4fr) minmax(0,7fr);align-items:center}}
.d-beton .bt-gantt-l{display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 18px;align-items:baseline}
.d-beton .bt-gantt-l b{grid-row:span 2;min-width:1.25em;font-family:var(--bs);font-size:clamp(40px,3.6vw,58px);font-weight:900;line-height:.85;color:var(--ox)}
.d-beton .bt-gantt-l p{color:var(--dim)}
.d-beton .bt-track{position:relative;height:clamp(34px,3vw,48px);background:repeating-linear-gradient(90deg,var(--line-2) 0 1px,transparent 1px calc(100% / var(--n,4)))}
.d-beton .bt-track span{position:absolute;top:0;bottom:0;left:calc(100% / var(--n,4) * var(--i,0));width:calc(100% / var(--n,4) * 1.6);max-width:calc(100% - 100% / var(--n,4) * var(--i,0));background:var(--ox) repeating-linear-gradient(-45deg,transparent 0 9px,rgba(0,0,0,.22) 9px 11px);transform:scaleX(0);transform-origin:left;transition:transform 1.2s var(--heavy);transition-delay:calc(.25s + var(--i,0) * 120ms)}
.d-beton .bt-track span::after{content:"";position:absolute;right:-1px;top:-8px;bottom:-8px;width:3px;background:var(--ink)}
.d-beton .bt-gantt>li.in .bt-track span,html:not(.demo-js) .d-beton .bt-track span{transform:none}
.demo-js .d-beton .bt-gantt>li[data-rv]{transform:none}
.d-beton .bt-proj .bt-head{margin-bottom:clamp(32px,4vw,56px)}
.d-beton .bt-hs-track{display:grid;gap:clamp(28px,4vw,48px);padding-inline:var(--pad)}
.d-beton .bt-frame{position:relative;display:grid;gap:12px}
.d-beton .bt-frame>div{position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--ink)}
.d-beton .bt-frame img{width:100%;height:100%;object-fit:cover;filter:grayscale(.85) contrast(1.12);transition:filter .8s var(--heavy),transform 1.2s var(--heavy)}
.d-beton .bt-frame:hover img{filter:grayscale(0) contrast(1.05);transform:scale(1.04)}
.d-beton .bt-frame figcaption{display:flex;align-items:baseline;gap:14px;padding-top:10px;border-top:2px solid var(--ink)}
.d-beton .bt-frame figcaption b{font-family:var(--bs);font-size:30px;font-weight:900;line-height:1;color:var(--ox)}
.d-beton .bt-frame figcaption span{font-size:14px;color:var(--dim)}
.d-beton .bt-frame>div::before{content:attr(data-n);position:absolute;left:14px;top:12px;z-index:1;padding:4px 8px;background:var(--paper);font-size:11px;font-weight:700;letter-spacing:.14em}
.d-beton .bt-hs-prog{display:none}
.d-beton .bt-hs.is-hs .bt-hs-pin{position:sticky;top:0;display:flex;flex-direction:column;justify-content:center;gap:28px;height:100vh;overflow:hidden}
.d-beton .bt-hs.is-hs .bt-hs-track{display:flex;width:max-content;align-items:flex-end;transform:translate3d(calc(var(--hx,0) * -1px),0,0);will-change:transform}
.d-beton .bt-hs.is-hs .bt-frame>div{height:min(62vh,640px);aspect-ratio:auto;width:calc(min(62vh,640px) * 1.4)}
.d-beton .bt-hs.is-hs .bt-frame:nth-child(3n+2)>div{width:calc(min(62vh,640px) * .8)}
.d-beton .bt-hs.is-hs .bt-frame:nth-child(3n)>div{height:min(48vh,500px);width:calc(min(48vh,500px) * 1.1)}
.d-beton .bt-hs.is-hs .bt-hs-prog{display:flex;align-items:center;gap:16px;width:min(100%,1440px);margin-inline:auto;padding-inline:var(--pad)}
.d-beton .bt-hs-prog i{position:relative;flex:1;height:2px;background:var(--line-2)}
.d-beton .bt-hs-prog i::before{content:"";position:absolute;inset:0;background:var(--ox);transform:scaleX(var(--hp,0));transform-origin:left}
.d-beton .bt-hs-prog i::after{content:"";position:absolute;left:calc(var(--hp,0) * 100%);top:-8px;width:2px;height:18px;background:var(--ink)}
@media (min-width:700px){.d-beton .bt-hs:not(.is-hs) .bt-hs-track{grid-template-columns:repeat(2,minmax(0,1fr));width:min(100%,1440px);margin-inline:auto}.d-beton .bt-hs:not(.is-hs) .bt-frame:first-child{grid-column:1/-1}.d-beton .bt-hs:not(.is-hs) .bt-frame:first-child>div{aspect-ratio:21/9}}
.d-beton .bt-split{display:grid;gap:clamp(40px,5vw,96px);align-items:start}
@media (min-width:980px){.d-beton .bt-split{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)}}
.d-beton .bt-split-copy{display:grid;gap:22px;align-content:start}
.d-beton .bt-split-copy .bt-head{margin-bottom:8px}
.d-beton .bt-split-copy>p{max-width:56ch;color:var(--dim)}
.d-beton .is-dark .bt-split-copy>p{color:var(--on-dark)}
.d-beton .z-reach{gap:4px;font-weight:500}
.d-beton .z-reach a{font-family:var(--bs);font-size:clamp(26px,2.4vw,36px);font-weight:800;text-transform:uppercase;color:var(--ink);transition:color .3s}
.d-beton .z-reach a:hover{color:var(--ox)}
.d-beton .is-dark .z-reach,.d-beton .is-dark .z-reach a{color:var(--paper)}
.d-beton .bt-board{position:relative;border:2px solid var(--ink);background:var(--paper-3) var(--grain)}
.d-beton .bt-board>header{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:16px 22px;background:var(--ink);color:var(--paper)}
.d-beton .bt-board>header p{font-family:var(--bs);font-size:26px;font-weight:800;text-transform:uppercase;line-height:1}
.d-beton .bt-board>header .bt-now.is-open{color:#8fd39c}
.d-beton .bt-board>header .bt-now.is-closed{color:#ff9b7e}
.d-beton .bt-board .z-hours{border:0;padding:6px 22px 10px}
.d-beton .bt-board .z-note{margin:0;padding:22px}
.d-beton .z-hours div{position:relative;padding:16px 0;border-color:var(--line-2);font-weight:500}
.d-beton .z-hours dt{font-size:13px;font-weight:600;letter-spacing:.12em;text-transform:uppercase}
.d-beton .z-hours dd{font-family:var(--bs);font-size:22px;font-weight:800;color:var(--ink);font-variant-numeric:tabular-nums;letter-spacing:.02em}
.d-beton .z-hours div.is-today{margin-inline:-22px;padding-inline:22px;background:var(--ox);border-color:var(--ox);color:#fff}
.d-beton .z-hours div.is-today dd{color:#fff}
.d-beton .z-hours div.is-today::before{content:"";position:absolute;left:6px;top:50%;border:6px solid transparent;border-left-color:#fff;transform:translateY(-50%)}
.d-beton .bt-sheet{position:relative;padding:clamp(18px,2.4vw,30px);border:2px solid var(--ink);background:var(--paper-3) var(--grain)}
.d-beton .bt-sheet>i{position:absolute;width:18px;height:18px;pointer-events:none}
.d-beton .bt-sheet>i::before,.d-beton .bt-sheet>i::after{content:"";position:absolute;background:var(--ox)}
.d-beton .bt-sheet>i::before{left:8px;top:0;width:2px;height:18px}
.d-beton .bt-sheet>i::after{top:8px;left:0;height:2px;width:18px}
.d-beton .bt-sheet>i:nth-of-type(1){left:-10px;top:-10px}
.d-beton .bt-sheet>i:nth-of-type(2){right:-10px;top:-10px}
.d-beton .bt-sheet>i:nth-of-type(3){left:-10px;bottom:-10px}
.d-beton .bt-sheet>i:nth-of-type(4){right:-10px;bottom:-10px}
.d-beton .bt-sheet-hd{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:6px 16px;margin:calc(clamp(18px,2.4vw,30px) * -1) calc(clamp(18px,2.4vw,30px) * -1) 26px;padding:14px clamp(18px,2.4vw,30px);border-bottom:2px solid var(--ink)}
.d-beton .bt-sheet-hd p{font-family:var(--bs);font-size:clamp(26px,2.4vw,34px);font-weight:800;line-height:1;text-transform:uppercase}
.d-beton .bt-sheet-hd small{grid-column:1;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}
.d-beton .bt-sheet-hd .bt-mark{grid-row:1/span 2;grid-column:2}
.d-beton .bt-sheet-hd a{grid-column:1;justify-self:start;display:inline-flex;align-items:center;gap:8px;min-height:36px;font-weight:600;color:var(--ox)}
.d-beton .bt-sheet-hd a svg{width:16px;height:16px}
.d-beton .z-field label{font-weight:600;letter-spacing:.14em;color:var(--ink)}
.d-beton .z-field input,.d-beton .z-field select,.d-beton .z-field textarea{border:0;border-bottom:2px solid var(--ink);background:rgba(255,255,255,.45);transition:background-color .3s,border-color .3s}
.d-beton .z-field select{background-image:linear-gradient(45deg,transparent 50%,var(--ink) 50%),linear-gradient(-45deg,transparent 50%,var(--ink) 50%);background-position:calc(100% - 20px) 52%,calc(100% - 14px) 52%;background-size:6px 6px;background-repeat:no-repeat}
.d-beton .z-field input:focus,.d-beton .z-field select:focus,.d-beton .z-field textarea:focus{border-color:var(--ox);background-color:#fff}
.d-beton .z-field :focus-visible{outline:2px solid var(--ox);outline-offset:0}
.d-beton .form-status{border:2px solid var(--ox);font-weight:600}
.d-beton .z-chips button{border:2px solid var(--ink);font-family:var(--bs);font-weight:800}
.d-beton .bt-menu-sec .bt-sheetlist{display:grid;gap:clamp(28px,3vw,44px)}
@media (min-width:980px){.d-beton .bt-sheetlist{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-beton .bt-cat{border:2px solid var(--ink);background:var(--paper-3)}
.d-beton .bt-cat h3{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 20px;background:var(--ink);color:var(--paper);font-size:clamp(26px,2.2vw,34px)}
.d-beton .bt-cat h3 small{font-family:"Space Grotesk",sans-serif;font-size:12px;font-weight:600;letter-spacing:.14em;color:var(--ox-l)}
.d-beton .bt-cat li{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:4px 16px;align-items:baseline;padding:14px 20px;border-top:1px solid var(--line-2);transition:background-color .3s}
.d-beton .bt-cat li:first-child{border-top:0}
.d-beton .bt-cat li:hover{background:rgba(184,55,26,.08)}
.d-beton .bt-cat li small{font-size:11px;font-weight:600;letter-spacing:.12em;color:var(--dim)}
.d-beton .bt-cat li b{font-weight:600}
.d-beton .bt-cat li p{grid-column:2;font-size:.92em;color:var(--dim)}
.d-beton .bt-cat .z-price{font-family:var(--bs);font-size:22px;font-weight:800}
.d-beton .bt-chan{display:grid;gap:2px;padding:2px;background:var(--ink);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-beton .bt-chan a{position:relative;display:grid;gap:14px;align-content:start;min-height:100%;padding:clamp(24px,3vw,40px);background:var(--paper-3);overflow:hidden;transition:color .4s}
.d-beton .bt-chan a::before{content:"";position:absolute;inset:0;background:var(--ox);transform:translateY(101%);transition:transform .55s var(--heavy)}
.d-beton .bt-chan a:hover::before{transform:none}
.d-beton .bt-chan a>*{position:relative}
.d-beton .bt-chan a:hover,.d-beton .bt-chan a:hover h3,.d-beton .bt-chan a:hover p{color:#fff}
.d-beton .bt-chan span{display:grid;place-items:center;width:54px;height:54px;border:2px solid currentColor}
.d-beton .bt-chan svg{width:24px;height:24px}
.d-beton .bt-chan p{color:var(--dim);transition:color .4s}
.d-beton .bt-chan i{font-style:normal;font-family:var(--bs);font-size:22px;font-weight:800;text-transform:uppercase}
.d-beton .bt-state{position:relative;overflow:hidden}
.d-beton .bt-state .bt-wrap{position:relative;z-index:1;display:grid;gap:28px}
.d-beton .bt-state h2{max-width:20ch;font-size:clamp(44px,6.6vw,118px);line-height:.9}
.d-beton .bt-state h2.is-long{max-width:24ch;font-size:clamp(38px,5.4vw,96px)}
.d-beton .bt-state .bt-words span{display:inline-block;opacity:.16;transition:opacity .5s}
.d-beton .bt-state .bt-words span.is-on{opacity:1}
.d-beton .bt-state p{display:flex;align-items:center;gap:14px;color:var(--ox-l)}
.d-beton .z-acc{border-top:2px solid var(--ink)}
.d-beton .z-acc details{border-color:var(--line-2);transition:background-color .3s}
.d-beton .z-acc details[open]{background:rgba(255,255,255,.35)}
.d-beton .z-acc summary{gap:20px;padding:24px 4px;font-family:var(--bs);font-size:clamp(24px,2.2vw,34px);font-weight:800;line-height:1.02;text-transform:uppercase;transition:color .3s,padding .4s var(--heavy)}
.d-beton .z-acc summary:hover{color:var(--ox);padding-left:14px}
.d-beton .z-acc summary i{width:38px;height:38px;border:2px solid currentColor;color:var(--ink);transition:background-color .3s,transform .5s var(--heavy)}
.d-beton .z-acc summary i::before,.d-beton .z-acc summary i::after{left:9px;width:16px;height:2px;margin-top:-1px}
.d-beton .z-acc details[open] summary i{background:var(--ox);border-color:var(--ox);color:#fff;transform:rotate(180deg)}
.d-beton .z-acc details>p{padding:0 4px 26px;font-size:1.04em}
.d-beton .z-sec.z-faq .z-head h2,.d-beton .z-sec .z-head h2{max-width:16ch}
.d-beton .z-sec.z-faq{background:var(--paper-3) var(--grain)}
.d-beton .bt-head-z{margin-bottom:clamp(32px,4.6vw,72px)}
.d-beton .z-sec.z-cta{background:var(--ox);color:#fff;overflow:hidden}
.d-beton .z-sec.z-cta::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(0,0,0,.28) 0 4px,transparent 5px) 0 0/140px 140px,linear-gradient(90deg,rgba(0,0,0,.14) 1px,transparent 1px) 0 0/420px 100%}
.d-beton .z-cta h2{position:relative;color:#fff;font-size:clamp(56px,9vw,170px);max-width:14ch}
.d-beton .z-cta h2 em{color:var(--ink)}
.d-beton .z-cta .z-center{position:relative}
.d-beton .z-cta .z-center>p{color:rgba(255,255,255,.88)}
.d-beton .z-cta .bt-fill{background:var(--ink);border-color:var(--ink)}
.d-beton .z-cta .bt-fill::before{background:var(--paper)}
.d-beton .z-cta .bt-fill:hover{color:var(--ink);border-color:var(--paper)}
.d-beton .z-statement{background:var(--ink-2) var(--grain);color:var(--paper)}
.d-beton .z-statement h2{color:var(--paper)}
.d-beton .z-statement .bt-kick{color:var(--ox-l)}
.d-beton .z-showcase.has-pic img{filter:grayscale(.8) contrast(1.15)}
.d-beton .z-showcase.has-pic::after{background:linear-gradient(90deg,rgba(20,20,20,.86),rgba(20,20,20,.25) 70%)}
.d-beton .z-showcase h2{color:#fff;font-size:clamp(52px,7.6vw,130px)}
.d-beton .z-showcase .bt-line{color:#fff;border-color:#fff}
.d-beton .z-showcase .bt-line::before{background:var(--ox)}
.d-beton .z-showcase .bt-line:hover{border-color:var(--ox)}
.d-beton .z-showcase:not(.has-pic){background:var(--ink-2);color:var(--paper)}
.d-beton .z-showcase:not(.has-pic) h2{color:var(--paper)}
.d-beton .z-card{border:2px solid var(--ink);background:var(--paper-3);transition:transform .45s var(--heavy),box-shadow .45s var(--heavy)}
.d-beton .z-card:hover{transform:translate(-6px,-6px);box-shadow:6px 6px 0 var(--ink)}
.d-beton .z-pack.is-featured{background:var(--ink);color:var(--on-dark);border-color:var(--ink)}
.d-beton .z-pack.is-featured h3,.d-beton .z-pack.is-featured .z-pack-price b{color:var(--paper)}
.d-beton .z-pack.is-featured .z-tag{justify-self:start;padding:5px 9px;background:var(--ox);color:#fff}
.d-beton .z-pack.is-featured .z-ticks li::before{background:var(--ox-l)}
.d-beton .z-pack-price b{font-weight:900}
.d-beton .z-ticks li::before{height:3px;width:14px}
.d-beton .z-team .z-grid>li{padding-bottom:18px;border-bottom:2px solid var(--ink)}
.d-beton .z-team .z-pic img{filter:grayscale(1) contrast(1.1);transition:filter .6s}
.d-beton .z-team .z-grid>li:hover .z-pic img{filter:none}
.d-beton .z-quotes blockquote{padding:26px;border:2px solid var(--ink);background:var(--paper-3)}
.d-beton .z-quotes blockquote>p{font-family:"Space Grotesk",sans-serif;font-size:clamp(18px,1.5vw,22px);line-height:1.45}
.d-beton .z-quotes footer b{font-family:var(--bs);font-size:20px;font-weight:800;text-transform:uppercase;color:var(--ink)}
.d-beton .z-ba{border:2px solid var(--ink)}
.d-beton .z-ba::after{width:4px;background:var(--ox)}
.d-beton .z-ba figcaption{background:var(--ink);font-weight:600;letter-spacing:.08em;text-transform:uppercase;font-size:12px}
.d-beton .z-ico{border:2px solid var(--ink);color:var(--ox)}
.d-beton .z-gal .z-pic img{filter:grayscale(.8) contrast(1.1);transition:filter .6s}
.d-beton .z-gal .z-pic:hover img{filter:none}
.d-beton .z-panel{border:2px solid var(--ink);background:var(--paper-3)}
.d-beton .z-note{font-size:.9em;letter-spacing:.02em}
.d-beton .bt-foot{position:relative;background:var(--ink) var(--grain);color:var(--on-dark);overflow:hidden}
.d-beton .bt-foot-cta{position:relative;display:grid;gap:20px;padding-block:clamp(70px,9vw,140px) clamp(48px,6vw,90px);border-bottom:1px solid rgba(234,231,225,.18)}
.d-beton .bt-foot-cta small{color:var(--ox-l)}
.d-beton .bt-foot-cta a{display:flex;align-items:center;justify-content:space-between;gap:24px;font-family:var(--bs);font-size:clamp(54px,9.4vw,180px);font-weight:900;line-height:.86;text-transform:uppercase;color:var(--paper);transition:color .4s}
.d-beton .bt-foot-cta a span{max-width:12ch}
.d-beton .bt-foot-cta a i{display:grid;flex:none;place-items:center;width:clamp(64px,8vw,136px);aspect-ratio:1;background:var(--ox);color:#fff;transition:transform .6s var(--heavy),background-color .4s}
.d-beton .bt-foot-cta a i svg{width:42%;height:42%}
.d-beton .bt-foot-cta a:hover{color:var(--ox)}
.d-beton .bt-foot-cta a:hover i{transform:rotate(-45deg);background:var(--paper);color:var(--ink)}
.d-beton .bt-tb{display:grid;margin-block:clamp(44px,5vw,72px) 28px;border:1.5px solid rgba(234,231,225,.35)}
@media (min-width:760px){.d-beton .bt-tb{grid-template-columns:minmax(0,1.6fr) repeat(2,minmax(0,1fr))}}
@media (min-width:1100px){.d-beton .bt-tb{grid-template-columns:minmax(0,1.5fr) repeat(3,minmax(0,1fr)) auto}}
.d-beton .bt-tb>div{display:grid;gap:8px;align-content:start;padding:20px 22px;border-bottom:1.5px solid rgba(234,231,225,.35)}
@media (min-width:760px){.d-beton .bt-tb>div{border-right:1.5px solid rgba(234,231,225,.35)}}
.d-beton .bt-tb small{font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--ox-l)}
.d-beton .bt-tb b{font-family:var(--bs);font-size:34px;font-weight:900;line-height:.95;text-transform:uppercase;color:var(--paper)}
.d-beton .bt-tb a,.d-beton .bt-tb span{display:flex;align-items:center;min-height:30px;color:var(--paper);transition:color .3s}
.d-beton .bt-tb a:hover{color:var(--ox-l)}
.d-beton .bt-tb .bt-tb-mark{display:flex;align-items:center;justify-content:center;gap:12px;color:var(--paper)}
.d-beton .bt-tb .bt-tb-mark .bt-mark{width:80px;height:55px;color:var(--paper)}
.d-beton .bt-legal{padding-bottom:28px;font-size:13px;color:rgba(234,231,225,.55)}
.d-beton .bt-foot-word{display:block;margin:0 0 -.12em;padding-inline:var(--pad);font-family:var(--bs);font-size:min(30vw,calc(196vw / var(--len,8)));font-weight:900;line-height:.8;text-transform:uppercase;white-space:nowrap;color:transparent;-webkit-text-stroke:1.5px rgba(234,231,225,.22);transform:translateY(calc(var(--p,0) * 14%));pointer-events:none}
@keyframes bt-slab{to{transform:none}}
@keyframes bt-draw{from{transform:scaleX(0)}to{transform:none}}
@keyframes bt-grow{from{transform:scaleY(0)}to{transform:none}}
@keyframes bt-pop{from{opacity:0;transform:translateX(-50%) scale(.4)}to{opacity:1;transform:translateX(-50%)}}
@keyframes bt-pour{to{clip-path:inset(0)}}
@keyframes bt-settle{to{scale:1}}
@keyframes bt-in-l{from{opacity:0;transform:translateX(-60px)}to{opacity:1;transform:none}}
@keyframes bt-in-r{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:none}}
.d-beton .bt-hero .bt-dim>span{animation-name:bt-in-r}
@media (prefers-reduced-motion:reduce){.d-beton .bt-ln>span,.d-beton .bt-hero-pic,.d-beton .bt-hero-pic img{animation:none!important;transform:none!important;clip-path:none!important;scale:1!important}.d-beton .bt-slab-in,.d-beton .bt-ruler-track,.d-beton .bt-foot-word,.d-beton .bt-measure-pic img{transform:none!important}.d-beton .bt-state .bt-words span{opacity:1}}
@media (max-width:899px){.d-beton .bt-hero-pic figure{height:min(68vh,520px)}.d-beton .bt-measure{padding:38px 38px 0 0}.d-beton .bt-measure .bt-dim{right:38px}.d-beton .bt-measure .bt-dim.is-v{top:38px}}
@media (max-width:520px){.d-beton .btn{font-size:18px}.d-beton .btn{padding:0 16px}.d-beton .btn>i{width:50px;margin-right:-16px}.d-beton .bt-ctas .btn{flex:1 1 100%;justify-content:space-between}.d-beton .bt-logo span{font-size:22px}.d-beton .bt-burger>span{display:none}.d-beton .bt-burger{padding-left:16px}}
`;

const JS = `(function(){var d=document,W=window,q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;var fine=W.matchMedia&&W.matchMedia('(pointer: fine)').matches;
q('.d-beton [data-hs]').forEach(function(sec){var pin=sec.querySelector('.bt-hs-pin'),tr=sec.querySelector('.bt-hs-track'),raf=0,on=false,max=0;
function size(){on=!reduce&&W.innerWidth>=900&&tr.children.length>1;sec.classList.toggle('is-hs',on);if(!on){sec.style.height='';return}max=Math.max(0,tr.scrollWidth-W.innerWidth);sec.style.height=(max+W.innerHeight)+'px';upd()}
function upd(){raf=0;if(!on)return;var r=sec.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/Math.max(1,r.height-W.innerHeight)));sec.style.setProperty('--hx',(p*max).toFixed(1));sec.style.setProperty('--hp',p.toFixed(4))}
W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});W.addEventListener('resize',size);W.addEventListener('load',size);size()});
q('.d-beton .bt-state').forEach(function(s){var ws=q('.bt-words span',s);if(!ws.length)return;if(reduce){ws.forEach(function(w){w.classList.add('is-on')});return}var raf=0;function upd(){raf=0;var r=s.getBoundingClientRect(),vh=W.innerHeight,p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height*.9+vh*.25)));var k=Math.round(p*ws.length);ws.forEach(function(w,n){w.classList.toggle('is-on',n<k)})}W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});upd()});
if(fine&&!reduce)q('.d-beton [data-cross]').forEach(function(f){var x=f.querySelector('.bt-cross'),o=x&&x.querySelector('span');if(!x)return;var raf=0,ex=0,ey=0;f.addEventListener('pointermove',function(e){ex=e.clientX;ey=e.clientY;if(!raf)raf=requestAnimationFrame(function(){raf=0;var r=f.getBoundingClientRect(),px=ex-r.left,py=ey-r.top;x.style.setProperty('--x',px+'px');x.style.setProperty('--y',py+'px');if(o)o.textContent='X '+String(Math.round(px)).padStart(4,'0')+'  Y '+String(Math.round(py)).padStart(4,'0')})});f.addEventListener('pointerenter',function(){x.classList.add('is-on')});f.addEventListener('pointerleave',function(){x.classList.remove('is-on')})})})();`;

const AX = "ABCDEFGHJKLM";
const nn = (n: number) => String(n).padStart(2, "0");

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
    <path d="M3 10h13M11 4.5 16.5 10 11 15.5" />
  </svg>
);

/** A section-cut marker as on a construction drawing: a split circle with a view arrow. */
const Mark = ({ top, bottom }: { top: string; bottom: string }) => (
  <svg className="bt-mark" viewBox="0 0 64 44" aria-hidden="true">
    <circle cx="22" cy="22" r="20" />
    <line x1="2" y1="22" x2="42" y2="22" />
    <path d="M44 13 L62 22 L44 31 Z" />
    <text x="22" y="17.5" textAnchor="middle">
      {top}
    </text>
    <text x="22" y="36" textAnchor="middle">
      {bottom}
    </text>
  </svg>
);

/** A dimension line with oblique ticks; the label comes from the business's own data. */
function Dim({ label, vertical }: { label: string; vertical?: boolean }) {
  const half = (flip: boolean) =>
    vertical ? (
      <svg viewBox="0 0 30 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="15" y1="0" x2="15" y2="100" />
        <line x1="4" y1={flip ? "100" : "0"} x2="26" y2={flip ? "100" : "0"} />
      </svg>
    ) : (
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="15" x2="100" y2="15" />
        <line x1={flip ? "100" : "0"} y1="4" x2={flip ? "100" : "0"} y2="26" />
      </svg>
    );
  return (
    <div className={`bt-dim${vertical ? " is-v" : ""}`} aria-hidden="true">
      {half(false)}
      <span>{label}</span>
      {half(true)}
    </div>
  );
}

function Axes({ n = 4, dark }: { n?: number; dark?: boolean }) {
  return (
    <div className={`bt-axes${dark ? " is-dark" : ""}`} aria-hidden="true">
      <div className="bt-wrap">
        {Array.from({ length: n + 1 }, (_, k) => (
          <i key={k} style={i(k)}>
            <b>{AX[k]}</b>
          </i>
        ))}
      </div>
    </div>
  );
}

/** The number of a section on the page (01, 02 …), for its marker. */
const indexOf = (c: Ctx, title: string) => Math.max(0, c.spec.sections.findIndex((s) => s.title === title)) + 1;

function Head({ c, kicker, title, intro, id, row }: HeadProps & { c: Ctx; row?: boolean }) {
  const n = indexOf(c, title);
  return (
    <header className={`bt-head${row && intro ? " is-row" : ""}`}>
      <div className="bt-head-top" data-rv>
        <Mark top={nn(n)} bottom={AX[(n - 1) % AX.length]} />
        {kicker ? <p className="bt-kick">{kicker}</p> : null}
      </div>
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? (
        <p className="bt-intro" data-rv>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

const Logo = ({ c }: { c: Ctx }) => (
  <a href="#top" className="bt-logo" aria-label={c.name}>
    <i aria-hidden="true">{c.name.charAt(0)}</i>
    <span>{c.name}</span>
  </a>
);

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="bt-hdr hdr">
        <div className="bt-wrap bt-bar">
          <Logo c={c} />
          <nav aria-label={c.t.menu} className="bt-links" data-nav>
            {c.nav.slice(0, 5).map((n, k) => (
              <a key={n.id} href={`#${n.id}`}>
                <small aria-hidden="true">{AX[k]}</small>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn bt-fill bt-hcta">
            <span>{cta.label}</span>
          </a>
          <button type="button" className="bt-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="bt-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small aria-hidden="true">{AX[k]}</small>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="bt-menu-foot">
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
          {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
          {b.city && !b.phone ? <span>{b.city}</span> : null}
          <a href={cta.href} className="btn bt-line">
            <span>{cta.label}</span>
            <i>
              <Arrow />
            </i>
          </a>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero, business: b } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 54 ? "is-s" : plain.length > 26 ? "is-m" : undefined;
  const { lines, marked } = splitLines(hero.headline, plain.length > 60 ? 4 : plain.length > 20 ? 3 : 2);
  const facts = heroFacts(c);
  const words = offerWords(c, 6);
  return (
    <>
      <section className={`bt-hero${p ? " has-pic" : ""}`}>
        <Axes n={4} />
        <div className="bt-wrap bt-hero-in">
          <div className="bt-hero-meta">
            <p className="bt-tag">
              <b>{hero.eyebrow || c.name}</b>
              {b.city && !hero.eyebrow.includes(b.city) ? <span>{b.city}</span> : null}
            </p>
            <NowBadge c={c} className="bt-now" />
          </div>
          <h1 className={[size, marked ? "is-marked" : ""].filter(Boolean).join(" ") || undefined}>
            {lines.map((line, n) => (
              <span key={n} className="bt-ln" style={i(n)}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <div className="bt-hero-foot">
            <Dim label={b.city ? `${c.name} — ${b.city}` : c.name} />
            <p className="bt-lede">{hero.subheadline}</p>
            <div className="bt-ctas">
              <Btn c={c} href={hero.primaryCta.href}>
                <span>{hero.primaryCta.label}</span>
                <i>
                  <Arrow />
                </i>
              </Btn>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                  <span>{hero.secondaryCta.label}</span>
                </Btn>
              ) : null}
            </div>
          </div>
        </div>
        {p ? (
          <div className="bt-hero-pic">
            <figure data-cross>
              <Pic p={p} eager sizes="100vw" />
              <div className="bt-cross" aria-hidden="true">
                <span />
              </div>
              <div className="bt-cap">
                <Mark top="01" bottom="A" />
                {hero.note ? <p>{hero.note}</p> : null}
              </div>
            </figure>
          </div>
        ) : words.length >= 3 ? (
          <div className="bt-wrap">
            <ol className="bt-hero-index">
              {words.map((w, n) => (
                <li key={w} style={i(n)}>
                  <small>{nn(n + 1)}</small>
                  {w}
                </li>
              ))}
            </ol>
          </div>
        ) : null}
        {facts.length > 0 && (
          <div className="bt-wrap">
            <dl className="bt-facts" style={css({ "--n": facts.length })}>
              {facts.map((f, n) => (
                <div key={f.label} style={i(n)}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>
      <Ruler c={c} />
    </>
  );
}

/** A measuring rule with the business's own services on it, moved by the scroll. */
function Ruler({ c }: { c: Ctx }) {
  const list = offerWords(c, 8);
  if (list.length < 2) return null;
  return (
    <div className="bt-ruler" aria-hidden="true">
      <div className="bt-ruler-track" data-px>
        {[...list, ...list, ...list, ...list].map((w, n) => (
          <span key={n}>
            <b>{nn((n % list.length) + 1)}</b>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A statement: the words light up one by one as it scrolls through the screen. */
function Words({ text }: { text: string }) {
  const out: ReactNode[] = [];
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w, k) => {
        // Punctuation right after a marked phrase belongs to it, without a space in between.
        if (/^[.,;:!?)]/.test(w) && out.length) out.pop();
        out.push(<span key={`${n}-${k}`}>{n % 2 ? <em>{w}</em> : w}</span>);
        out.push(" ");
      }),
  );
  return <>{out}</>;
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="bt-foot">
      <Axes n={4} dark />
      <div className="bt-wrap">
        <div className="bt-foot-cta">
          <p className="bt-kick bt-mono" data-rv>
            <small>{c.t.contact}</small>
          </p>
          <a href={cta.href}>
            <span>{cta.label}</span>
            <i aria-hidden="true">
              <Arrow />
            </i>
          </a>
        </div>
        <div className="bt-tb">
          <div>
            <small>{c.spec.hero.eyebrow || c.t.contact}</small>
            <b>{c.name}</b>
            {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
          </div>
          <div>
            <small>{c.t.explore}</small>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </div>
          <div>
            <small>{c.t.contact}</small>
            {b.address ? <span>{b.address}</span> : b.city ? <span>{b.city}</span> : null}
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
            {b.mapsUrl ? (
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                {c.t.route} →
              </a>
            ) : null}
          </div>
          {b.openingHours?.length ? (
            <div>
              <small>{c.t.hours}</small>
              {b.openingHours.slice(0, 7).map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          ) : null}
          <div className="bt-tb-mark">
            <Mark top={nn(c.spec.sections.length)} bottom={c.name.charAt(0).toUpperCase()} />
          </div>
        </div>
        <Legal c={c} className="z-legal bt-legal" />
      </div>
      <p className="bt-foot-word" data-px aria-hidden="true" style={css({ "--len": Math.max(5, c.name.length) })}>
        {c.name}
      </p>
    </footer>
  );
}

const Sheet = ({ c, title, children }: { c: Ctx; title: string; children: ReactNode }) => {
  const b = c.spec.business;
  return (
    <div className="bt-sheet" data-rv>
      <i aria-hidden="true" />
      <i aria-hidden="true" />
      <i aria-hidden="true" />
      <i aria-hidden="true" />
      <div className="bt-sheet-hd">
        <p>{title}</p>
        <small>{b.city ? `${c.name} · ${b.city}` : c.name}</small>
        {b.phone ? (
          <a href={tel(b.phone)}>
            <Icon name="phone" />
            {b.phone}
          </a>
        ) : null}
        <Mark top={nn(indexOf(c, title) || 1)} bottom="B" />
      </div>
      {children}
    </div>
  );
};

export const beton: Family = {
  key: "beton",
  root: "d-beton",
  fonts: ["Big Shoulders Display", "Space Grotesk"],
  themeColor: "#d9d6cf",
  accent: "#b8371a",
  onAccent: "#ffffff",
  css: "",
  // Everything after the shared defaults, so the kit's sections take the design's own look.
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "bt-wrap", eyebrow: "bt-kick", btn: "bt-fill", btnAlt: "bt-line", btnText: "bt-text" },
  Header,
  Hero,
  Footer,
  Head: (p, c) => <Head c={c} {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      const b = c.spec.business;
      return (
        <section className="bt-sec" id={s.id}>
          <div className={`bt-wrap bt-about${p ? "" : " is-solo"}`}>
            <div className="bt-about-copy">
              <Head c={c} kicker={c.t.kick.about} title={s.title} />
              <p className="bt-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="bt-spec" data-rv>
                  {s.highlights.map((h, n) => (
                    <li key={h}>
                      <b aria-hidden="true" style={i(n)} />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {p ? (
              <figure className="bt-measure" data-rv>
                <Dim label={c.name} />
                <Dim label={b.city ?? s.title.replace(/\*/g, "")} vertical />
                <div className="bt-measure-pic" data-px>
                  <Pic p={p} sizes="(min-width: 980px) 40vw, 92vw" />
                </div>
                {b.city ? (
                  <p className="bt-badge">
                    <Icon name="map" />
                    {b.city}
                  </p>
                ) : null}
              </figure>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => (
      <section className="bt-sec bt-svc-sec is-light" id={s.id}>
        <div className="bt-wrap">
          <Head c={c} kicker={c.t.kick.services} title={s.title} intro={s.intro} row />
        </div>
        <ol className="bt-svc">
          {s.items.map((it, n) => {
            const p = c.photo(`art:svc${n}`);
            return (
              <li key={n} className="bt-slab">
                <div className="bt-wrap bt-slab-in" data-px style={css({ "--dir": n % 2 ? -1 : 1 })}>
                  <span className="bt-code" aria-hidden="true">
                    {nn(n + 1)}
                  </span>
                  <div className="bt-slab-copy">
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                    {it.price || it.duration ? (
                      <p className="bt-slab-meta">
                        {it.price ? <span>{it.price}</span> : null}
                        {it.duration ? <span>{it.duration}</span> : null}
                      </p>
                    ) : null}
                  </div>
                  {p ? (
                    <figure className="bt-slab-pic">
                      <Pic p={p} sizes="(min-width: 900px) 34vw, 92vw" />
                    </figure>
                  ) : (
                    <span className="bt-slab-ico" aria-hidden="true">
                      <Icon name={it.icon} />
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    ),
    features: (s, c, n) => {
      const dark = n % 2 === 1;
      return (
        <section className={`bt-sec${dark ? " is-dark" : ""}`} id={s.id}>
          {dark ? <div className="bt-ties" aria-hidden="true" /> : null}
          <div className="bt-wrap">
            <Head c={c} kicker={c.t.kick.features} title={s.title} intro={s.intro} row />
            <ul
              className={`bt-blocks${s.items.length % 2 ? " is-odd" : ""}${s.items.length === 5 ? " is-five" : ""}`}
              style={css({ "--cols": s.items.length === 4 ? 2 : s.items.length < 3 ? s.items.length : 3 })}
            >
              {s.items.map((it, k) => (
                <li key={k} data-rv style={i(k % 3)}>
                  <span className="bt-blk-ico" aria-hidden="true">
                    <Icon name={it.icon} />
                  </span>
                  <small aria-hidden="true">{nn(k + 1)}</small>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                  <i aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    },
    process: (s, c) => (
      <section className="bt-sec" id={s.id}>
        <div className="bt-wrap">
          <Head c={c} kicker={c.t.kick.process} title={s.title} intro={s.intro} row />
          <div style={css({ "--n": s.steps.length })}>
            <div className="bt-gantt-hd bt-mono" aria-hidden="true">
              <span>{c.t.kick.process}</span>
              <ol>
                {s.steps.map((_, k) => (
                  <li key={k}>{nn(k + 1)}</li>
                ))}
              </ol>
            </div>
            <ol className="bt-gantt">
              {s.steps.map((st, k) => (
                <li key={k} data-rv style={i(k)}>
                  <div className="bt-gantt-l">
                    <b>{nn(k + 1)}</b>
                    <h3>{st.title}</h3>
                    <p>{st.description}</p>
                  </div>
                  <div className="bt-track" aria-hidden="true">
                    <span />
                  </div>
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
      return (
        <section className="bt-sec bt-proj" id={s.id}>
          <div className="bt-wrap">
            <Head c={c} kicker={c.t.kick.gallery} title={s.title} />
          </div>
          <div className="bt-hs" data-hs>
            <div className="bt-hs-pin">
              <div className="bt-hs-track">
                {pics.map((p, n) => (
                  <figure key={n} className="bt-frame" data-rv style={i(n % 2)}>
                    <div data-n={`${nn(n + 1)} / ${nn(pics.length)}`}>
                      <Pic p={p} sizes="(min-width: 900px) 60vw, 92vw" />
                    </div>
                    <figcaption>
                      <b>{nn(n + 1)}</b>
                      <span>{p.alt}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="bt-hs-prog bt-mono" aria-hidden="true">
                <span>01</span>
                <i />
                <span>{nn(pics.length)}</span>
              </div>
            </div>
          </div>
        </section>
      );
    },
    statement: (s, c) => (
      <section className="bt-sec is-dark bt-state" id={s.id}>
        <div className="bt-ties" aria-hidden="true" />
        <div className="bt-wrap">
          <h2 className={`bt-words ${long(s.title) ?? ""}`.trim()}>
            <Words text={s.title} />
          </h2>
          {s.note ? (
            <p className="bt-mono">
              <Mark top={nn(indexOf(c, s.title))} bottom="S" />
              {s.note}
            </p>
          ) : null}
        </div>
      </section>
    ),
    menu: (s, c) => (
      <section className="bt-sec bt-menu-sec is-light" id={s.id}>
        <div className="bt-wrap">
          <Head c={c} kicker={c.t.kick.menu} title={s.title} intro={s.intro} row />
          <div className="bt-sheetlist">
            {s.categories.map((cat, n) => (
              <div key={n} className="bt-cat" data-rv style={i(n % 2)}>
                <h3>
                  {cat.name}
                  <small>
                    {AX[n % AX.length]}·{nn(cat.items.length)}
                  </small>
                </h3>
                <ul>
                  {cat.items.map((d, k) => (
                    <li key={k}>
                      <small>
                        {AX[n % AX.length]}
                        {nn(k + 1)}
                      </small>
                      <b>{d.name}</b>
                      {d.price ? <span className="z-price">{d.price}</span> : <span />}
                      {d.description ? <p>{d.description}</p> : null}
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
    hours: (s, c) => (
      <section className="bt-sec" id={s.id}>
        <div className="bt-wrap bt-split">
          <div className="bt-split-copy">
            <Head c={c} kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="bt-board" data-rv>
            <header>
              <p>{c.t.hours}</p>
              <NowBadge c={c} className="bt-now" />
            </header>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="bt-sec is-light" id={s.id}>
        <div className="bt-wrap bt-split">
          <div className="bt-split-copy">
            <Head c={c} kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? (
              <div className="bt-board" data-rv>
                <header>
                  <p>{c.t.hours}</p>
                  <NowBadge c={c} className="bt-now" />
                </header>
                {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
              </div>
            ) : null}
          </div>
          {s.showForm ? (
            <Sheet c={c} title={s.title}>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </Sheet>
          ) : null}
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="bt-sec is-light" id={s.id}>
        <div className="bt-wrap bt-split">
          <div className="bt-split-copy">
            <Head c={c} kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
          </div>
          <Sheet c={c} title={s.title}>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </Sheet>
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="bt-sec" id={s.id}>
        <div className="bt-wrap">
          <Head c={c} kicker={c.t.kick.order} title={s.title} intro={s.body} row />
          <ul className="bt-chan">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span aria-hidden="true">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <i aria-hidden="true">→</i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
  },
};
