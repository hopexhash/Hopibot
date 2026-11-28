import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Monolith: an original template (no portfolio demo). Strictly monochrome and cinematic: near
 * black, concrete greys and white, nothing else; photographs are shown in black and white.
 * Oversized condensed capitals (Big Shoulders Display, heavy against hairline-thin outlines)
 * over a technical sans. Every section carries its index number; a rail on the left measures
 * how far down the page you are. The opening photograph opens like light through a slot and the
 * headline rises letter by letter out of the ground. Signature details: projects told as a
 * horizontal sequence that scrolls sideways while the page is pinned (stacked on phones and
 * with reduced motion), disciplines whose photograph is cut open behind the row, process steps
 * that stack like floors, and a crosshair cursor with a coordinate readout on desktop.
 * Made for architects, builders of high-end homes, interior architects, photographers and
 * other businesses that sell form, space and precision.
 */

const CSS = `
.d-monolith{--k0:#0b0c0d;--k1:#121315;--k2:#1a1b1e;--k3:#26282c;--g1:#4a4d53;--g2:#8b8e94;--g3:#c3c5c9;--w:#eceef0;--c0:#d9dadd;--c1:#c9cbcf;--line:rgba(236,238,240,.14);--line-2:rgba(236,238,240,.28);--pad:clamp(20px,4.6vw,76px);--rail:0px;--ease:cubic-bezier(.16,.84,.24,1);--cut:cubic-bezier(.77,0,.18,1);--disp:"Big Shoulders Display","Arial Narrow",Impact,sans-serif;--sans:"IBM Plex Sans",system-ui,sans-serif;--z-bg2:var(--k1);--z-ink:var(--w);--z-dim:var(--g2);--z-line:var(--line);--z-accent:var(--w);--z-on-accent:var(--k0);--z-display:var(--disp);--z-radius:0;--z-field-radius:0;--z-ico-radius:0;--z-sec:clamp(96px,12vw,190px);--z-h3:clamp(24px,2.2vw,34px);--z-statement:clamp(40px,6.4vw,112px);--z-display-weight:800;background:var(--k0);color:var(--w);font-family:var(--sans);font-size:clamp(15.5px,1vw,17px);line-height:1.62;counter-reset:mo}
@media (min-width:1100px){.d-monolith{--rail:64px}}
.d-monolith ::selection{background:var(--w);color:var(--k0)}
.d-monolith h1,.d-monolith h2,.d-monolith h3{font-family:var(--disp);font-weight:800;line-height:.88;letter-spacing:-.005em;text-transform:uppercase}
.d-monolith h2{font-size:clamp(46px,7.4vw,128px)}
.d-monolith h2.is-long{font-size:clamp(36px,5vw,84px);line-height:.92}
.d-monolith h3{font-size:var(--z-h3);font-weight:700;line-height:.95;letter-spacing:.01em}
.d-monolith h1 em,.d-monolith h2 em,.d-monolith .mo-hollow{font-style:normal;font-weight:300;color:transparent;-webkit-text-stroke:1.5px var(--w)}
@supports not (-webkit-text-stroke:1px #fff){.d-monolith h1 em,.d-monolith h2 em{color:var(--g2)}}
.d-monolith .mo-wrap{position:relative;width:min(100%,1600px);margin-inline:auto;padding-inline:var(--pad)}
@media (min-width:1100px){.d-monolith main,.d-monolith .mo-foot{padding-left:var(--rail)}}
.d-monolith .mo-tag{display:inline-flex;align-items:center;gap:12px;font-size:11.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--g2);font-variant-numeric:tabular-nums}
.d-monolith .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:56px;padding:0 28px;overflow:hidden;isolation:isolate;font-size:12.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;transition:color .5s var(--ease),border-color .4s}
.d-monolith .btn svg{width:16px;height:16px;transition:transform .5s var(--ease)}
.d-monolith .btn:hover svg{transform:translateX(5px)}
.d-monolith .mo-solid{background:var(--w);color:var(--k0)}
.d-monolith .mo-solid::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--k0);clip-path:inset(100% 0 0 0);transition:clip-path .6s var(--cut)}
.d-monolith .mo-solid:hover{color:var(--w);box-shadow:inset 0 0 0 1px var(--w)}
.d-monolith .mo-solid:hover::before{clip-path:inset(0)}
.d-monolith .mo-line{border:1px solid var(--line-2);color:var(--w)}
.d-monolith .mo-line::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--w);clip-path:inset(0 100% 0 0);transition:clip-path .6s var(--cut)}
.d-monolith .mo-line:hover{color:var(--k0);border-color:var(--w)}
.d-monolith .mo-line:hover::before{clip-path:inset(0)}
.d-monolith .mo-text{position:relative;display:inline-flex;align-items:center;gap:12px;min-height:44px;font-size:12.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase}
.d-monolith .mo-text::before{content:"";width:28px;height:1px;background:currentColor;transition:width .6s var(--ease)}
.d-monolith .mo-text:hover::before{width:56px}
.d-monolith .mo-hdr{position:fixed;left:0;right:0;top:0;z-index:60;transition:transform .7s var(--ease),background-color .6s}
.d-monolith .mo-bar{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:20px;height:72px;padding-inline:var(--pad);border-bottom:1px solid transparent;transition:height .6s var(--ease),border-color .6s,background-color .6s}
.d-monolith.is-scrolled .mo-bar{height:60px;border-color:var(--line);background:rgba(11,12,13,.82);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.d-monolith.menu-open .mo-bar{background:transparent;border-color:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
@media (min-width:1100px){.d-monolith .mo-bar{padding-left:calc(var(--rail) + var(--pad))}}
.d-monolith .mo-logo{display:flex;align-items:center;gap:14px;min-width:0;font-family:var(--disp);font-size:clamp(20px,1.7vw,26px);font-weight:800;letter-spacing:.06em;line-height:1;text-transform:uppercase;white-space:nowrap}
.d-monolith .mo-logo i{flex:none;width:14px;height:22px;background:var(--w);transition:transform .7s var(--ease)}
.d-monolith .mo-logo:hover i{transform:scaleY(1.4)}
.d-monolith .mo-logo span{overflow:hidden;text-overflow:ellipsis}
.d-monolith .mo-links{display:none;gap:4px}
.d-monolith .mo-links a{position:relative;display:inline-flex;white-space:nowrap;align-items:center;gap:8px;min-height:44px;padding:0 14px;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--g3);transition:color .3s}
.d-monolith .mo-links a small{font-size:10px;color:var(--g1);font-variant-numeric:tabular-nums;transition:color .3s}
.d-monolith .mo-links a::after{content:"";position:absolute;left:14px;right:14px;bottom:8px;height:1px;background:var(--w);transform:scaleX(0);transform-origin:right;transition:transform .5s var(--cut)}
.d-monolith .mo-links a:hover{color:var(--w)}
@media (max-width:1399px){.d-monolith .mo-links a{padding:0 10px}.d-monolith .mo-links a:nth-child(n+5){display:none}}
.d-monolith .mo-links a:hover small{color:var(--w)}
.d-monolith .mo-links a:hover::after{transform:none;transform-origin:left}
.d-monolith .mo-right{display:flex;align-items:center;gap:8px}
.d-monolith .mo-right .btn{display:none;min-height:44px;padding:0 20px}
.d-monolith .mo-burger{position:relative;z-index:62;display:inline-flex;align-items:center;gap:14px;min-height:44px;padding:0 0 0 14px;border:0;background:none;font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
.d-monolith .mo-burger i{position:relative;display:block;width:44px;height:44px;border:1px solid var(--line-2);transition:border-color .4s,transform .7s var(--ease)}
.d-monolith .mo-burger i::before,.d-monolith .mo-burger i::after{content:"";position:absolute;left:50%;top:50%;width:18px;height:1.5px;margin:-.75px 0 0 -9px;background:var(--w);transition:transform .6s var(--ease)}
.d-monolith .mo-burger i::before{transform:translateY(-4px)}
.d-monolith .mo-burger i::after{transform:translateY(4px) scaleX(.6);transform-origin:right}
.d-monolith .mo-burger:hover i{border-color:var(--w)}
.d-monolith.menu-open .mo-burger i{transform:rotate(90deg)}
.d-monolith.menu-open .mo-burger i::before{transform:rotate(45deg)}
.d-monolith.menu-open .mo-burger i::after{transform:rotate(-45deg);transform-origin:center}
@media (min-width:1100px){.d-monolith .mo-bar{grid-template-columns:auto minmax(0,1fr) auto}.d-monolith .mo-links{display:flex;justify-self:center}.d-monolith .mo-right .btn{display:inline-flex}.d-monolith .mo-burger{display:none}}
.d-monolith .mo-rail{display:none}
@media (min-width:1100px){.d-monolith .mo-rail{position:fixed;left:0;top:0;bottom:0;z-index:55;display:flex;flex-direction:column;align-items:center;justify-content:space-between;width:var(--rail);padding:96px 0 28px;border-right:1px solid var(--line);background:var(--k0);font-size:10.5px;letter-spacing:.2em;color:var(--g2);font-variant-numeric:tabular-nums}.d-monolith .mo-rail b{font-weight:500;color:var(--w);writing-mode:vertical-rl;transform:rotate(180deg)}.d-monolith .mo-rail span{writing-mode:vertical-rl;transform:rotate(180deg);text-transform:uppercase;white-space:nowrap;overflow:hidden;max-height:34vh;text-overflow:ellipsis}.d-monolith .mo-rail i{position:relative;flex:1;width:1px;margin:24px 0;background:var(--line)}.d-monolith .mo-rail i::after{content:"";position:absolute;left:-1px;top:0;width:3px;height:100%;background:var(--w);transform:scaleY(var(--sp,0));transform-origin:top}}
.d-monolith .mo-menu{position:fixed;inset:0;z-index:58;visibility:hidden;transition:visibility 0s 1s}
.d-monolith .mo-menu.is-open{visibility:visible;transition:none}
.d-monolith .mo-slats{position:absolute;inset:0;display:grid;grid-template-columns:repeat(6,1fr)}
.d-monolith .mo-slats i{background:var(--k1);border-right:1px solid var(--line);transform:scaleY(0);transform-origin:top;transition:transform .7s var(--cut);transition-delay:calc((5 - var(--i,0)) * 40ms)}
.d-monolith .mo-menu.is-open .mo-slats i{transform:none;transition-delay:calc(var(--i,0) * 55ms)}
.d-monolith .mo-menu-in{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:36px;height:100%;padding:110px var(--pad) 100px;overflow-y:auto}
.d-monolith .mo-menu nav{display:grid;border-top:1px solid var(--line)}
.d-monolith .mo-menu nav a{display:flex;align-items:baseline;gap:18px;padding:10px 0;border-bottom:1px solid var(--line);font-family:var(--disp);font-size:clamp(46px,13vw,120px);font-weight:800;line-height:.9;text-transform:uppercase;color:transparent;-webkit-text-stroke:1.2px var(--w);clip-path:inset(0 0 100% 0);transform:translateY(40%);transition:clip-path .8s var(--cut),transform .8s var(--cut),color .35s}
.d-monolith .mo-menu.is-open nav a{clip-path:inset(0 0 -10% 0);transform:none;transition-delay:calc(.35s + var(--i,0) * 70ms),calc(.35s + var(--i,0) * 70ms),0s}
.d-monolith .mo-menu nav a:hover{color:var(--w)}
.d-monolith .mo-menu nav small{font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.16em;color:var(--g2);-webkit-text-stroke:0;font-variant-numeric:tabular-nums}
.d-monolith .mo-menu-foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px;font-size:13px;color:var(--g2);opacity:0;transition:opacity .5s}
.d-monolith .mo-menu.is-open .mo-menu-foot{opacity:1;transition-delay:.8s}
.d-monolith .mo-menu-foot a{display:inline-flex;align-items:center;min-height:44px;color:var(--w)}
.d-monolith .mo-hero{position:relative;display:grid;min-height:max(640px,100svh);overflow:hidden;background:var(--k0);isolation:isolate}
.d-monolith .mo-hero-pic{position:absolute;inset:0;z-index:-2;clip-path:inset(50% 0 50% 0);animation:mo-slot 1.9s var(--cut) .2s both}
.d-monolith .mo-hero-pic img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.12) brightness(.82);transform:scale(1.28) translateY(calc(var(--p,0) * -4%));animation:mo-settle 3.2s var(--ease) .2s both}
.d-monolith .mo-hero::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(11,12,13,.6) 0,rgba(11,12,13,.05) 32%,rgba(11,12,13,.2) 55%,rgba(11,12,13,.92) 100%)}
.d-monolith .mo-hero-in{display:grid;grid-template-rows:auto 1fr auto;gap:28px;padding-top:108px;padding-bottom:clamp(36px,4vw,60px)}
.d-monolith .mo-hero-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 28px;animation:mo-fade 1s var(--ease) 1.4s both}
.d-monolith .mo-hero-top>div{display:flex;flex-wrap:wrap;align-items:center;gap:10px 24px}
.d-monolith .mo-now{display:inline-flex;align-items:center;gap:10px;font-size:11.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
.d-monolith .mo-now::before{content:"";width:8px;height:8px;background:currentColor}
.d-monolith .mo-now.is-closed{color:var(--g2)}
.d-monolith .mo-now.is-closed::before{background:transparent;box-shadow:inset 0 0 0 1px currentColor}
.d-monolith .mo-h1{align-self:end;max-width:100%;font-size:clamp(60px,11.2vw,212px);line-height:.84;letter-spacing:-.01em}
.d-monolith .mo-h1.is-m{font-size:clamp(52px,8.6vw,164px)}
.d-monolith .mo-h1.is-s{font-size:clamp(44px,6.6vw,124px);line-height:.88}
@media (max-width:759px){.d-monolith .mo-h1{font-size:clamp(60px,19vw,120px)}.d-monolith .mo-h1.is-m{font-size:clamp(48px,14.5vw,96px)}.d-monolith .mo-h1.is-s{font-size:clamp(40px,11.4vw,80px)}.d-monolith .mo-hero-top>.mo-tag{display:none}.d-monolith .mo-hero-top>div{gap:8px 18px}}.d-monolith .mo-ln{display:block;overflow:hidden;padding:.04em 0 .02em;margin-bottom:-.02em}
.d-monolith .mo-w{display:inline-block;white-space:nowrap}
.d-monolith .mo-c{display:inline-block;transform:translateY(108%) scaleY(1.9);transform-origin:50% 100%;animation:mo-rise 1.15s var(--ease) both;animation-delay:calc(.7s + var(--i,0) * 32ms)}
.d-monolith .mo-hero-row{display:grid;gap:26px 64px;align-items:end;padding-top:26px;border-top:1px solid var(--line-2)}
@media (min-width:960px){.d-monolith .mo-hero-row{grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto}}
.d-monolith .mo-hero-row>*{animation:mo-fade 1s var(--ease) both;animation-delay:calc(1.5s + var(--i,0) * 120ms)}
.d-monolith .mo-lede{max-width:46ch;font-size:clamp(16px,1.2vw,19px);color:var(--g3)}
.d-monolith .mo-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:14px 26px}
.d-monolith .mo-facts{display:grid;gap:6px;font-size:13px;color:var(--g3)}
.d-monolith .mo-facts div{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px}
.d-monolith .mo-facts dt{min-width:84px;font-size:10.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--g2);line-height:2}
.d-monolith .mo-facts dd{margin:0}
.d-monolith .mo-crops{position:absolute;inset:92px var(--pad) 24px;z-index:-1;pointer-events:none;animation:mo-fade 1.4s var(--ease) 1.8s both}
@media (min-width:1100px){.d-monolith .mo-crops{left:calc(var(--rail) + var(--pad))}}
.d-monolith .mo-crops i{position:absolute;width:18px;height:18px}
.d-monolith .mo-crops i::before,.d-monolith .mo-crops i::after{content:"";position:absolute;background:var(--w);opacity:.7}
.d-monolith .mo-crops i::before{left:0;right:0;top:50%;height:1px}
.d-monolith .mo-crops i::after{top:0;bottom:0;left:50%;width:1px}
.d-monolith .mo-crops i:nth-child(1){left:-9px;top:-9px}
.d-monolith .mo-crops i:nth-child(2){right:-9px;top:-9px}
.d-monolith .mo-crops i:nth-child(3){left:-9px;bottom:-9px}
.d-monolith .mo-crops i:nth-child(4){right:-9px;bottom:-9px}
.d-monolith .mo-scroll{position:absolute;right:var(--pad);top:50%;display:none;align-items:center;gap:14px;font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--g3);writing-mode:vertical-rl;animation:mo-fade 1s var(--ease) 2.2s both}
.d-monolith .mo-scroll::after{content:"";width:1px;height:72px;background:linear-gradient(var(--w) 50%,transparent 50%) 0 0/1px 200%;animation:mo-drip 2.6s var(--cut) infinite}
@media (min-width:960px){.d-monolith .mo-scroll{display:flex}}
.d-monolith .mo-slab{position:absolute;inset:0;z-index:-2;overflow:hidden;background:radial-gradient(ellipse 70% 60% at 70% 30%,#1d1f22,#0b0c0d 70%)}
.d-monolith .mo-slab::before{content:"";position:absolute;left:0;right:0;top:64%;height:1px;background:var(--line-2)}
.d-monolith .mo-slab i{position:absolute;right:16%;bottom:36%;width:clamp(110px,13vw,230px);height:clamp(300px,48vh,560px);background:linear-gradient(90deg,#3a3c41 0,#2a2c30 38%,#16171a 38.5%,#0f1012 100%);box-shadow:0 0 0 1px rgba(236,238,240,.06);clip-path:inset(100% 0 0 0);animation:mo-build 2.2s var(--cut) .3s both}
.d-monolith .mo-slab i::after{content:"";position:absolute;left:100%;bottom:0;width:260%;height:44px;background:linear-gradient(90deg,rgba(0,0,0,.7),transparent);transform:skewX(-58deg);transform-origin:0 100%}
.d-monolith .mo-slab b{position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(236,238,240,.05) 50%,transparent 60%) 0 0/300% 100%;animation:mo-sweep 14s linear infinite}
.d-monolith .mo-sec{position:relative;padding-block:var(--z-sec);counter-increment:mo}
.d-monolith .z-sec{counter-increment:mo}
.d-monolith .z-sec.z-faq{background:var(--k1)}.d-monolith .mo-sec.is-light,.d-monolith .z-sec.z-cta{background:var(--c0);color:var(--k0);--z-ink:var(--k0);--z-dim:#4f5258;--z-line:rgba(11,12,13,.16);--z-accent:var(--k0);--z-on-accent:var(--w);--line:rgba(11,12,13,.16);--line-2:rgba(11,12,13,.32)}
.d-monolith .is-light h2 em,.d-monolith .z-cta h2 em{-webkit-text-stroke-color:var(--k0)}
.d-monolith .is-light .mo-tag,.d-monolith .z-cta .mo-tag{color:#4f5258}
.d-monolith .is-light .mo-solid,.d-monolith .z-cta .mo-solid{background:var(--k0);color:var(--w)}
.d-monolith .is-light .mo-solid::before,.d-monolith .z-cta .mo-solid::before{background:var(--c0)}
.d-monolith .is-light .mo-solid:hover,.d-monolith .z-cta .mo-solid:hover{color:var(--k0);box-shadow:inset 0 0 0 1px var(--k0)}
.d-monolith .mo-sec.is-k1{background:var(--k1)}
.d-monolith .mo-head{display:grid;gap:22px;margin-bottom:clamp(48px,6vw,104px)}
.d-monolith .mo-idx{display:flex;align-items:center;gap:16px}
.d-monolith .mo-idx::before{content:counter(mo,decimal-leading-zero);font-family:var(--disp);font-size:clamp(40px,4vw,64px);font-weight:200;line-height:.8;letter-spacing:0;color:currentColor}
.d-monolith .mo-idx::after{content:"";flex:1;max-width:220px;height:1px;background:var(--line-2);transform-origin:left;transition:transform 1.2s var(--cut) .2s}
.demo-js .d-monolith .mo-idx[data-rv]:not(.in)::after{transform:scaleX(0)}
.d-monolith .mo-head>p:not(.mo-idx){max-width:52ch;color:var(--g2)}
.d-monolith .is-light .mo-head>p:not(.mo-idx){color:#4f5258}
@media (min-width:1000px){.d-monolith .mo-head.is-split{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:22px 72px;align-items:end}.d-monolith .mo-head.is-split .mo-idx{grid-column:1/-1}}
.demo-js .d-monolith h2[data-rv]{clip-path:inset(0 0 55% 0);transform:translateY(30px);transition:clip-path 1.1s var(--cut),transform 1.1s var(--cut),opacity .4s}
.demo-js .d-monolith h2[data-rv].in{clip-path:inset(0 0 -12% 0);transform:none}
.d-monolith .mo-clip{position:relative;overflow:hidden;background:var(--k2)}
.d-monolith .mo-clip img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1)}
.demo-js .d-monolith .mo-clip[data-rv]{opacity:1;transform:none}.demo-js .d-monolith .mo-clip[data-rv] img{clip-path:inset(0 0 100% 0);transform:scale(1.25);transition:clip-path 1.4s var(--cut),transform 2.2s var(--ease)}.demo-js .d-monolith .mo-clip[data-rv].in img{clip-path:inset(0);transform:scale(1.04)}
.d-monolith .mo-marks{position:relative}
.d-monolith .mo-marks::before,.d-monolith .mo-marks::after{content:"";position:absolute;z-index:2;width:22px;height:22px;pointer-events:none;background:linear-gradient(var(--w),var(--w)) 50% 0/1px 100% no-repeat,linear-gradient(var(--w),var(--w)) 0 50%/100% 1px no-repeat;opacity:.85}
.d-monolith .mo-marks::before{left:-11px;top:-11px}
.d-monolith .mo-marks::after{right:-11px;bottom:-11px}
.d-monolith .is-light .mo-marks::before,.d-monolith .is-light .mo-marks::after{background:linear-gradient(var(--k0),var(--k0)) 50% 0/1px 100% no-repeat,linear-gradient(var(--k0),var(--k0)) 0 50%/100% 1px no-repeat}
.d-monolith .mo-about{display:grid;gap:clamp(48px,6vw,110px)}
@media (min-width:1000px){.d-monolith .mo-about{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:start}.d-monolith .mo-about.is-solo{grid-template-columns:minmax(0,1fr)}}
.d-monolith .mo-about-pic{aspect-ratio:4/5}
@media (min-width:1000px){.d-monolith .mo-about-pic{position:sticky;top:96px;aspect-ratio:auto;height:min(78vh,820px)}}
.d-monolith .mo-about-pic .mo-light{position:absolute;inset:0;z-index:1;background:linear-gradient(115deg,transparent 30%,rgba(236,238,240,.16) 46%,transparent 62%);transform:translateX(calc(var(--p,0) * 40%));mix-blend-mode:screen;pointer-events:none}
.d-monolith .mo-about-pic figcaption{position:absolute;left:0;bottom:0;z-index:2;display:flex;gap:18px;padding:14px 18px;background:var(--k0);font-size:10.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--g3)}
.d-monolith .mo-about-copy{display:grid;gap:30px;align-content:start}
.d-monolith .mo-about-copy .mo-head{margin-bottom:0}
.d-monolith .mo-lead{font-size:clamp(21px,1.9vw,30px);font-weight:300;line-height:1.38;color:var(--w)}
.d-monolith .mo-cols{display:grid;gap:18px 44px;color:var(--g2)}
@media (min-width:760px){.d-monolith .mo-cols.has-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-monolith .mo-spec{border-top:1px solid var(--line-2)}
.d-monolith .mo-spec li{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:14px;align-items:center;min-height:58px;border-bottom:1px solid var(--line);font-family:var(--disp);font-size:clamp(20px,1.7vw,26px);font-weight:700;text-transform:uppercase;letter-spacing:.02em;transition:padding .5s var(--ease),background-color .5s}
.d-monolith .mo-spec li:hover{padding-left:12px;background:var(--k1)}
.d-monolith .mo-spec small{font-family:var(--sans);font-size:11px;font-weight:500;letter-spacing:.16em;color:var(--g2);font-variant-numeric:tabular-nums}
.d-monolith .mo-spec li::after{content:"+";font-family:var(--sans);font-weight:300;color:var(--g2)}
.d-monolith .mo-dis{border-top:1px solid var(--line-2)}
.d-monolith .mo-row{position:relative;display:grid;gap:14px 40px;padding:clamp(26px,3vw,44px) 0;border-bottom:1px solid var(--line);isolation:isolate}
@media (min-width:900px){.d-monolith .mo-row{grid-template-columns:90px minmax(0,1.25fr) minmax(0,1fr);align-items:center}}
.d-monolith .mo-row>small{font-size:12px;font-weight:500;letter-spacing:.18em;color:var(--g2);font-variant-numeric:tabular-nums;transition:color .4s}
.d-monolith .mo-row h3{font-size:clamp(34px,4.4vw,78px);font-weight:800;line-height:.86;transition:transform .7s var(--ease),letter-spacing .7s var(--ease)}
.d-monolith .mo-row-txt{display:grid;gap:10px;color:var(--g2);transition:color .4s}
.d-monolith .mo-row-meta{display:flex;flex-wrap:wrap;gap:8px 18px;font-size:11.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--w);font-variant-numeric:tabular-nums}
.d-monolith .mo-row-pic{position:absolute;inset:0;z-index:-1;clip-path:inset(50% 0 50% 0);transition:clip-path .8s var(--cut)}
.d-monolith .mo-row-pic img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.15) brightness(.38);transform:scale(1.12);transition:transform 1.4s var(--ease)}
@media (hover:hover) and (min-width:900px){.d-monolith .mo-row:hover .mo-row-pic{clip-path:inset(0)}.d-monolith .mo-row:hover .mo-row-pic img{transform:scale(1.02)}.d-monolith .mo-row:hover h3{transform:translateX(18px)}.d-monolith .mo-row:hover>small,.d-monolith .mo-row:hover .mo-row-txt{color:var(--w)}.d-monolith .mo-row:hover{padding-inline:20px}.d-monolith .mo-row{transition:padding .7s var(--ease)}}
@media (max-width:899px){.d-monolith .mo-row-pic{position:relative;inset:auto;z-index:0;order:-1;aspect-ratio:21/9;clip-path:none}.d-monolith .mo-row-pic img{filter:grayscale(1) contrast(1.1);transform:none}}
.d-monolith .mo-hs{position:relative;counter-increment:mo}
.d-monolith .mo-hs-head{padding-top:var(--z-sec)}
.d-monolith .mo-hs-track{display:grid;gap:clamp(48px,7vw,96px);padding:0 var(--pad) var(--z-sec)}
.d-monolith .mo-panel{display:grid;gap:18px}
.d-monolith .mo-panel .mo-clip{aspect-ratio:4/3}
.d-monolith .mo-panel figcaption{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px 22px;align-items:start}
.d-monolith .mo-panel figcaption b{font-family:var(--disp);font-size:clamp(56px,7vw,120px);font-weight:200;line-height:.78;font-variant-numeric:tabular-nums}
.d-monolith .mo-panel figcaption span{max-width:44ch;padding-top:6px;color:var(--g3)}
.d-monolith .mo-hs.is-pinned .mo-hs-head{display:none}
.d-monolith .mo-hs.is-pinned .mo-hs-stick{position:sticky;top:0;height:100vh;overflow:hidden}
.d-monolith .mo-hs.is-pinned .mo-hs-track{display:flex;align-items:center;gap:clamp(40px,4vw,80px);width:max-content;height:100%;padding:72px var(--pad) 40px calc(var(--pad) + var(--rail));transform:translate3d(calc(var(--x,0) * -1px),0,0);will-change:transform}
@media (min-width:900px){.d-monolith .mo-hs:not(.is-pinned) .mo-hs-track{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-monolith .mo-hs-intro{display:none}
.d-monolith .mo-hs.is-pinned .mo-hs-intro{display:grid;align-content:center;gap:26px;width:min(38vw,560px);height:100%}
.d-monolith .mo-hs-intro h2{font-size:clamp(56px,7vw,128px)}
.d-monolith .mo-hs-intro p{max-width:34ch;color:var(--g2)}
.d-monolith .mo-hs.is-pinned .mo-panel{grid-template-rows:minmax(0,1fr) auto;width:auto;height:min(76vh,760px)}
.d-monolith .mo-hs.is-pinned .mo-panel .mo-clip{height:100%;aspect-ratio:var(--ar,4/3)}
.d-monolith .mo-hs.is-pinned .mo-panel:nth-child(3n+3) .mo-clip{--ar:3/4}
.d-monolith .mo-hs.is-pinned .mo-panel:nth-child(3n+1) .mo-clip{--ar:16/10}
.d-monolith .mo-hs.is-pinned .mo-panel .mo-clip img{transform:scale(calc(1.18 - var(--e,0) * .14));transition:none}
.d-monolith .mo-hs.is-pinned .mo-panel .mo-clip{clip-path:inset(calc((1 - var(--e,0)) * 14%) 0 calc((1 - var(--e,0)) * 14%) 0)}
.d-monolith .mo-hs-bar{display:none}
.d-monolith .mo-hs.is-pinned .mo-hs-bar{position:absolute;left:calc(var(--pad) + var(--rail));right:var(--pad);bottom:28px;display:flex;align-items:center;gap:20px;font-size:11px;font-weight:500;letter-spacing:.2em;color:var(--g2);font-variant-numeric:tabular-nums}
.d-monolith .mo-hs-bar i{position:relative;flex:1;height:1px;background:var(--line)}
.d-monolith .mo-hs-bar i::after{content:"";position:absolute;inset:0;background:var(--w);transform:scaleX(var(--k,0));transform-origin:left}
.d-monolith .mo-hs-bar b{font-weight:500;color:var(--w)}
.d-monolith .mo-feats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));border-top:1px solid var(--line-2);border-left:1px solid var(--line)}
.d-monolith .mo-feat{position:relative;display:grid;gap:18px;align-content:start;min-height:clamp(260px,24vw,360px);padding:clamp(26px,3vw,44px);border-right:1px solid var(--line);border-bottom:1px solid var(--line);overflow:hidden;isolation:isolate}
.d-monolith .mo-feat::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(360px circle at var(--mx,50%) var(--my,-40%),rgba(236,238,240,.12),transparent 60%);opacity:0;transition:opacity .5s}
.d-monolith .mo-feat:hover::before{opacity:1}
.d-monolith .mo-feat>small{font-size:11px;font-weight:500;letter-spacing:.2em;color:var(--g2);font-variant-numeric:tabular-nums}
.d-monolith .mo-feat h3{margin-top:auto;font-size:clamp(28px,2.6vw,42px)}
.d-monolith .mo-feat p{color:var(--g2)}
.d-monolith .mo-ico{position:absolute;right:clamp(26px,3vw,44px);top:clamp(26px,3vw,44px);display:grid;place-items:center;width:48px;height:48px;border:1px solid var(--line-2);transition:transform .8s var(--ease),background-color .4s,color .4s}
.d-monolith .mo-ico svg{width:20px;height:20px}
.d-monolith .mo-feat:hover .mo-ico{transform:rotate(90deg);background:var(--w);color:var(--k0)}
.d-monolith .mo-floors{display:grid;gap:0}
.d-monolith .mo-floor{position:relative;display:grid;gap:12px 40px;padding:clamp(28px,3vw,48px) 0;border-top:1px solid var(--line-2);background:var(--k0)}
@media (min-width:900px){.d-monolith .mo-floor{grid-template-columns:minmax(120px,.5fr) minmax(0,1.2fr) minmax(0,1fr);align-items:start;position:sticky;top:calc(84px + var(--i,0) * 30px);min-height:clamp(200px,24vh,280px);box-shadow:0 -30px 60px -30px rgba(0,0,0,.8)}}
.d-monolith .mo-sec.is-k1 .mo-floor{background:var(--k1)}
.d-monolith .mo-floor b{font-family:var(--disp);font-size:clamp(72px,9vw,160px);font-weight:200;line-height:.76;color:transparent;-webkit-text-stroke:1.2px var(--w)}
.d-monolith .mo-floor h3{font-size:clamp(30px,3.2vw,54px)}
.d-monolith .mo-floor p{color:var(--g2)}
.d-monolith .mo-visit{display:grid;gap:clamp(40px,5vw,100px)}
@media (min-width:1000px){.d-monolith .mo-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.d-monolith .mo-visit-copy{display:grid;gap:26px;align-content:start}
.d-monolith .mo-visit-copy .mo-head{margin-bottom:0}
.d-monolith .mo-visit-copy>p{max-width:48ch;color:var(--g2)}
.d-monolith .is-light .mo-visit-copy>p{color:#4f5258}
.d-monolith .mo-table{border-top:2px solid currentColor}
.d-monolith .mo-table-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;padding:16px 0;border-bottom:1px solid var(--line)}
.d-monolith .mo-table .z-hours{border:0}
.d-monolith .mo-table .z-hours div{align-items:baseline;padding:16px 0;font-variant-numeric:tabular-nums;transition:padding .5s var(--ease)}
.d-monolith .mo-table .z-hours dt{font-family:var(--disp);font-size:clamp(22px,1.8vw,28px);font-weight:700;text-transform:uppercase;letter-spacing:.02em}
.d-monolith .mo-table .z-hours div:hover{padding-inline:12px}
.d-monolith .z-hours div.is-today{padding-inline:14px;background:var(--w);color:var(--k0)}
.d-monolith .z-hours div.is-today dd{color:var(--k0)}
.d-monolith .is-light .z-hours div.is-today{background:var(--k0);color:var(--w)}
.d-monolith .is-light .z-hours div.is-today dd{color:var(--w)}
.d-monolith .z-hours div.is-today dt::before{content:"▸ ";font-size:.7em;vertical-align:.15em}
.d-monolith .mo-form{position:relative;padding:clamp(24px,3.4vw,52px);border:1px solid var(--line-2);background:var(--k1)}
.d-monolith .is-light .mo-form{background:var(--c1);border-color:rgba(11,12,13,.2)}
.d-monolith .z-field label,.d-monolith .z-chipset legend{font-size:10.5px;font-weight:500;letter-spacing:.2em}
.d-monolith .z-field input,.d-monolith .z-field select,.d-monolith .z-field textarea{padding:12px 0;border-width:0 0 1px;border-color:var(--line-2);font-size:16px;transition:border-color .3s}
.d-monolith .z-field select option{color:#111;background:#fff}
.d-monolith .z-field :focus-visible{outline:none;border-color:var(--w)}
.d-monolith .is-light .z-field :focus-visible{border-color:var(--k0)}
.d-monolith .z-form .btn{min-height:60px}
.d-monolith .form-status{border-color:currentColor}
.d-monolith .mo-reach{display:grid;border-top:1px solid var(--line-2)}
.d-monolith .mo-reach p{display:grid;grid-template-columns:150px minmax(0,1fr);gap:16px;align-items:baseline;padding:16px 0;border-bottom:1px solid var(--line)}
.d-monolith .mo-reach small{font-size:10.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--g2)}
.d-monolith .mo-reach a:not(.btn),.d-monolith .mo-reach span{font-family:var(--disp);font-size:clamp(22px,2vw,32px);font-weight:700;line-height:1.05;text-transform:uppercase;overflow-wrap:anywhere}
.d-monolith .mo-reach a:not(.btn){transition:letter-spacing .5s var(--ease)}
.d-monolith .mo-reach a:not(.btn):hover{letter-spacing:.04em}
.d-monolith .mo-reach .btn{justify-self:start;margin-top:22px}
@media (max-width:520px){.d-monolith .mo-reach p{grid-template-columns:minmax(0,1fr);gap:4px}}
.d-monolith .mo-team{display:grid;gap:clamp(30px,3vw,48px) clamp(14px,1.6vw,24px);grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))}
.d-monolith .mo-team figure{aspect-ratio:3/4;margin-bottom:18px}
.d-monolith .mo-team h3{font-size:clamp(26px,2.2vw,36px)}
.d-monolith .mo-team p{margin-top:6px;color:var(--g2)}
.d-monolith .mo-role{font-size:11px!important;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--w)!important}
.d-monolith .mo-menu-cats{display:grid;gap:56px clamp(32px,5vw,96px)}
@media (min-width:900px){.d-monolith .mo-menu-cats{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-monolith .mo-cat h3{padding-bottom:14px;border-bottom:2px solid currentColor;font-size:clamp(30px,2.8vw,44px)}
.d-monolith .mo-dish{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 18px;padding:16px 0;border-bottom:1px solid var(--line)}
.d-monolith .mo-dish b{font-weight:500}
.d-monolith .mo-dish span{font-variant-numeric:tabular-nums}
.d-monolith .mo-dish p{grid-column:1/-1;font-size:.94em;color:var(--g2)}
.d-monolith .mo-chan{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));border-top:1px solid var(--line-2);border-left:1px solid var(--line)}
.d-monolith .mo-chan a{display:grid;gap:14px;align-content:start;height:100%;padding:clamp(24px,3vw,40px);border-right:1px solid var(--line);border-bottom:1px solid var(--line);transition:background-color .5s,color .5s}
.d-monolith .mo-chan a:hover{background:var(--w);color:var(--k0)}
.d-monolith .mo-chan a:hover p{color:var(--k2)}
.d-monolith .mo-chan p{color:var(--g2)}
.d-monolith .mo-chan .mo-ico{position:static}
.d-monolith .z-head{gap:22px}
.d-monolith .z-sec h2{max-width:none}
.d-monolith .z-acc{border-top:2px solid currentColor;counter-reset:q}
.d-monolith .z-acc details{counter-increment:q}
.d-monolith .z-acc summary{padding:24px 0;font-family:var(--disp);font-size:clamp(22px,2.2vw,34px);font-weight:700;line-height:1;text-transform:uppercase;letter-spacing:.01em}
.d-monolith .z-acc summary::before{content:counter(q,decimal-leading-zero);flex:none;width:52px;font-family:var(--sans);font-size:11px;font-weight:500;letter-spacing:.18em;color:var(--g2)}.d-monolith .z-acc summary span{flex:1}
.d-monolith .z-acc summary i{width:20px;height:20px}
.d-monolith .z-acc summary:hover span{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:6px}
.d-monolith .z-acc details>p{padding-left:52px}
.d-monolith .z-sec.z-cta{padding-block:clamp(110px,14vw,220px)}
.d-monolith .z-cta h2{max-width:16ch;font-size:clamp(54px,9vw,170px)}
.d-monolith .z-cta .z-center>p{color:#4f5258}
.d-monolith .z-statement h2{max-width:22ch;font-weight:800;line-height:.9;text-transform:uppercase}
.d-monolith .z-statement .z-center{gap:34px}
.d-monolith .z-showcase{min-height:min(92svh,900px)}
.d-monolith .z-show-media img{filter:grayscale(1) contrast(1.15) brightness(.85)}
.d-monolith .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(11,12,13,.15),rgba(11,12,13,.9))}
.d-monolith .z-show-in h2{font-size:clamp(50px,8vw,150px)}
.d-monolith .z-card{border-color:var(--line-2);background:transparent}
.d-monolith .z-cards{gap:0;border-left:1px solid var(--line-2)}
.d-monolith .z-packages .z-card{border-width:1px 1px 1px 0}
.d-monolith .z-pack.is-featured{background:var(--w);color:var(--k0);border-color:var(--w)}
.d-monolith .z-pack.is-featured h3,.d-monolith .z-pack.is-featured .z-pack-price b,.d-monolith .z-pack.is-featured .z-tag{color:var(--k0)}
.d-monolith .z-pack.is-featured p,.d-monolith .z-pack.is-featured .z-pack-price,.d-monolith .z-pack.is-featured li{color:#3a3c41}
.d-monolith .z-pack.is-featured .z-ticks li::before{background:var(--k0)}
.d-monolith .z-pack-price b{font-weight:800}
.d-monolith .z-quotes blockquote>p{font-family:var(--sans);font-size:clamp(19px,1.6vw,24px);font-weight:300}
.d-monolith .z-pic img,.d-monolith .z-ba img{filter:grayscale(1) contrast(1.1)}
.d-monolith .z-ba figcaption{background:var(--k0);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase}
.d-monolith .z-rows small,.d-monolith .z-steps small{font-weight:500}
.d-monolith .z-ico{border-color:var(--line-2);color:var(--w)}
.d-monolith .z-channel:hover{background:var(--w);color:var(--k0)}
.d-monolith .mo-foot{position:relative;overflow:hidden;padding:clamp(80px,9vw,150px) 0 130px;border-top:1px solid var(--line);background:var(--k0)}
.d-monolith .mo-foot-cta{display:grid;gap:30px;justify-items:start}
@media (min-width:1000px){.d-monolith .mo-foot-cta{grid-template-columns:minmax(0,1fr) auto;align-items:end}}
.d-monolith .mo-foot-cta p{max-width:16ch;font-family:var(--disp);font-size:clamp(44px,6vw,108px);font-weight:800;line-height:.86;text-transform:uppercase}
.d-monolith .mo-foot-cta p em{font-style:normal;font-weight:300;color:transparent;-webkit-text-stroke:1.4px var(--w)}
.d-monolith .mo-foot-name{margin:clamp(60px,8vw,130px) 0 clamp(30px,4vw,60px);font-family:var(--disp);font-size:clamp(64px,19vw,360px);font-weight:900;line-height:.76;letter-spacing:-.01em;text-transform:uppercase;white-space:nowrap;color:transparent;-webkit-text-stroke:1px var(--line-2);transform:translateX(calc(var(--p,0) * 3%))}
.d-monolith .mo-foot-name.is-m{font-size:clamp(52px,13vw,250px)}
.d-monolith .mo-foot-name.is-l{font-size:clamp(40px,8.6vw,168px);white-space:normal;line-height:.84}
.d-monolith .mo-foot-grid{display:grid;gap:30px;padding-top:32px;border-top:1px solid var(--line-2);grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}
.d-monolith .mo-foot-grid h3{margin-bottom:14px;font-family:var(--sans);font-size:10.5px;font-weight:500;letter-spacing:.22em;color:var(--g2)}
.d-monolith .mo-foot-grid a,.d-monolith .mo-foot-grid span{display:block;padding:3px 0;color:var(--g3)}
.d-monolith .mo-foot-grid a{display:flex;align-items:center;min-height:34px;transition:color .3s,transform .5s var(--ease)}
.d-monolith .mo-foot-grid a:hover{color:var(--w);transform:translateX(6px)}
.d-monolith .mo-foot-grid p{max-width:34ch;color:var(--g2)}
.d-monolith .mo-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:52px;font-size:11.5px;letter-spacing:.06em;color:var(--g2)}
.d-monolith .mo-top{display:inline-flex;align-items:center;gap:10px;min-height:44px;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
.d-monolith .mo-top::before{content:"";width:9px;height:9px;border-left:1px solid currentColor;border-top:1px solid currentColor;transform:rotate(45deg) translate(2px,2px)}
.d-monolith .mo-cross{position:fixed;inset:0;z-index:70;pointer-events:none;opacity:0;transition:opacity .4s}
.d-monolith .mo-cross.on{opacity:1}
.d-monolith .mo-cross i{position:absolute;left:0;top:0;background:rgba(236,238,240,.28);mix-blend-mode:difference;will-change:transform}
.d-monolith .mo-cross .mo-cx{width:100%;height:1px}
.d-monolith .mo-cross .mo-cy{width:1px;height:100%}
.d-monolith .mo-cross b{position:absolute;left:0;top:0;padding:4px 7px;background:var(--w);color:var(--k0);font-size:10px;font-weight:500;letter-spacing:.14em;white-space:nowrap;font-variant-numeric:tabular-nums;will-change:transform}
.d-monolith .mo-cross s{position:absolute;left:0;top:0;width:28px;height:28px;margin:-14px 0 0 -14px;border:1px solid var(--w);mix-blend-mode:difference;text-decoration:none;transform-origin:center;transition:width .4s var(--ease),height .4s var(--ease),margin .4s var(--ease);will-change:transform}
.d-monolith .mo-cross.is-link s{width:52px;height:52px;margin:-26px 0 0 -26px}
.d-monolith.has-cross,.d-monolith.has-cross *{cursor:crosshair}
.d-monolith.has-cross a,.d-monolith.has-cross button,.d-monolith.has-cross summary,.d-monolith.has-cross label,.d-monolith.has-cross select{cursor:pointer}
.d-monolith.has-cross input,.d-monolith.has-cross textarea{cursor:text}
@keyframes mo-slot{0%{clip-path:inset(50% 0 50% 0)}35%{clip-path:inset(49.6% 0 49.6% 0)}100%{clip-path:inset(0)}}
@keyframes mo-settle{to{transform:scale(1.06) translateY(calc(var(--p,0) * -4%))}}
@keyframes mo-rise{to{transform:none}}
@keyframes mo-fade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes mo-build{to{clip-path:inset(0)}}
@keyframes mo-sweep{to{background-position:-300% 0}}
@keyframes mo-drip{0%{background-position:0 100%}100%{background-position:0 -100%}}
@media (prefers-reduced-motion:reduce){.demo-js .d-monolith .mo-clip[data-rv] img{clip-path:none}.d-monolith .mo-hero-pic,.d-monolith .mo-slab i{clip-path:none}.d-monolith .mo-hero-pic img{transform:scale(1.06)}.d-monolith .mo-c{transform:none}.d-monolith .mo-scroll::after,.d-monolith .mo-slab b{animation:none}.demo-js .d-monolith h2[data-rv]{clip-path:none!important}.d-monolith .mo-floor{position:relative;top:auto}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The rail measures the scroll; the projects scroll sideways while the page is pinned (desktop,
 * no reduced motion); a crosshair with a coordinate readout follows the pointer on desktop;
 * principle cards catch a light where the pointer is.
 */
const JS = `(function(){var d=document,W=window,fam=d.querySelector('.d-monolith');if(!fam)return;var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches,fine=W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches;
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};var pc=d.querySelector('[data-pct]');
var hs=q('.mo-hs').map(function(s){return {s:s,st:s.querySelector('.mo-hs-stick'),tr:s.querySelector('.mo-hs-track'),ps:q('.mo-panel',s),bar:s.querySelector('.mo-hs-bar i'),n:s.querySelector('.mo-hs-bar b'),max:0}});
function size(){var wide=W.innerWidth>=900&&!reduce;hs.forEach(function(h){h.s.classList.toggle('is-pinned',wide);if(!wide){h.s.style.height='';h.max=0;return}h.max=Math.max(0,h.tr.scrollWidth-W.innerWidth);h.s.style.height=(h.max+W.innerHeight)+'px'});tick()}
var raf=0;function tick(){raf=0;var H=d.documentElement.scrollHeight-W.innerHeight,sp=H>0?Math.min(1,Math.max(0,W.scrollY/H)):0;fam.style.setProperty('--sp',sp.toFixed(4));if(pc)pc.textContent=String(Math.round(sp*100)).padStart(3,'0');
hs.forEach(function(h){if(!h.max)return;var r=h.s.getBoundingClientRect(),k=Math.min(1,Math.max(0,-r.top/h.max)),x=k*h.max;h.tr.style.setProperty('--x',x.toFixed(1));if(h.bar)h.bar.style.setProperty('--k',k.toFixed(4));var cx=W.innerWidth/2,best=0,bd=1e9;h.ps.forEach(function(p,n){var b=p.getBoundingClientRect(),m=b.left+b.width/2,dd=Math.abs(m-cx),e=Math.max(0,1-dd/(W.innerWidth*.6));p.style.setProperty('--e',e.toFixed(3));if(dd<bd){bd=dd;best=n}});if(h.n)h.n.textContent=String(best+1).padStart(2,'0')})}
W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(tick)},{passive:true});W.addEventListener('resize',size);W.addEventListener('load',size);size();
if(fine&&!reduce){var c=d.createElement('div');c.className='mo-cross';c.setAttribute('aria-hidden','true');c.innerHTML='<i class="mo-cx"></i><i class="mo-cy"></i><s></s><b></b>';fam.appendChild(c);fam.classList.add('has-cross');var cx=c.querySelector('.mo-cx'),cy=c.querySelector('.mo-cy'),bx=c.querySelector('b'),sq=c.querySelector('s'),x=0,y=0,tx=0,ty=0,craf=0;
function loop(){x+=(tx-x)*.24;y+=(ty-y)*.24;cx.style.transform='translate3d(0,'+y.toFixed(1)+'px,0)';cy.style.transform='translate3d('+x.toFixed(1)+'px,0,0)';sq.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';var bxX=Math.min(W.innerWidth-130,x+14);bx.style.transform='translate3d('+bxX.toFixed(1)+'px,'+(y+14).toFixed(1)+'px,0)';bx.textContent='X '+String(Math.round(tx)).padStart(4,'0')+' \\u00b7 Y '+String(Math.round(ty+W.scrollY)).padStart(5,'0');craf=Math.abs(tx-x)+Math.abs(ty-y)>.3?requestAnimationFrame(loop):0}
d.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;tx=e.clientX;ty=e.clientY;c.classList.add('on');c.classList.toggle('is-link',!!(e.target.closest&&e.target.closest('a,button,summary,input,select,textarea,label')));if(!craf)craf=requestAnimationFrame(loop)},{passive:true});
d.addEventListener('pointerleave',function(){c.classList.remove('on')});d.documentElement.addEventListener('mouseleave',function(){c.classList.remove('on')});
q('.mo-feat').forEach(function(f){f.addEventListener('pointermove',function(e){var r=f.getBoundingClientRect();f.style.setProperty('--mx',(e.clientX-r.left)+'px');f.style.setProperty('--my',(e.clientY-r.top)+'px')})})}
})();`;

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M2 10h16M12 4l6 6-6 6" />
  </svg>
);

const two = (n: number) => String(n).padStart(2, "0");

/** The headline as letters that rise out of the ground, words kept whole, *marked* words hollow. */
function Rise({ text }: { text: string }) {
  const words: { w: string; em: boolean }[] = [];
  text.split(/\*([^*]+)\*/).forEach((chunk, k) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => words.push({ w, em: k % 2 === 1 })),
  );
  let n = 0;
  const out: ReactNode[] = [];
  words.forEach((x, k) => {
    const chars = [...x.w].map((ch, m) => (
      <span key={m} className="mo-c" style={i(n++)}>
        {ch}
      </span>
    ));
    out.push(
      <span key={k} className="mo-w">
        {x.em ? <em>{chars}</em> : chars}
      </span>,
    );
    if (k < words.length - 1) out.push(" ");
  });
  return <span className="mo-ln">{out}</span>;
}

function Head({ kicker, title, intro, id, split }: { kicker?: string; title: string; intro?: string; id?: string; split?: boolean }) {
  return (
    <header className={`mo-head${split && intro ? " is-split" : ""}`}>
      <p className="mo-idx mo-tag" data-rv>
        {kicker ?? ""}
      </p>
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? (
        <p data-rv style={i(1)}>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="mo-hdr hdr">
        <div className="mo-bar">
          <a href="#top" className="mo-logo" aria-label={c.name}>
            <i aria-hidden="true" />
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="mo-links" data-nav>
            {c.nav.slice(0, 5).map((n, k) => (
              <a key={n.id} href={`#${n.id}`}>
                <small>{two(k + 1)}</small>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mo-right">
            <a className="btn mo-line" href={cta.href}>
              {cta.label}
            </a>
            <button type="button" className="mo-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
              <span data-label data-open={c.t.menu} data-close={c.t.close}>
                {c.t.menu}
              </span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <aside className="mo-rail" aria-hidden="true">
        <span>{b.city ?? c.name}</span>
        <i />
        <b data-pct>000</b>
      </aside>
      <div id="site-menu" className="mo-menu" inert>
        <div className="mo-slats" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <i key={n} style={i(n)} />
          ))}
        </div>
        <div className="mo-menu-in">
          <nav aria-label={c.t.menu} data-nav>
            {c.nav.map((n, k) => (
              <a key={n.id} href={`#${n.id}`} style={i(k)}>
                <small>{two(k + 1)}</small>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mo-menu-foot">
            <span>{b.address ?? b.city ?? c.name}</span>
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            <a href={cta.href}>{cta.label} →</a>
          </div>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const pic = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 42 ? "is-s" : plain.length > 22 ? "is-m" : undefined;
  const facts = heroFacts(c);
  return (
    <section className="mo-hero">
      {pic ? (
        <div className="mo-hero-pic" data-px>
          <Pic p={pic} eager sizes="100vw" />
        </div>
      ) : (
        <div className="mo-slab" aria-hidden="true">
          <i />
          <b />
        </div>
      )}
      <div className="mo-crops" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="mo-wrap mo-hero-in">
        <div className="mo-hero-top">
          <div>
            {hero.eyebrow ? <p className="mo-tag">{hero.eyebrow}</p> : null}
            <NowBadge c={c} className="mo-now" />
          </div>
          {c.spec.business.city ? <p className="mo-tag">{c.spec.business.city}</p> : null}
        </div>
        <h1 className={`mo-h1${size ? ` ${size}` : ""}`}>
          <Rise text={hero.headline} />
        </h1>
        <div className="mo-hero-row">
          <p className="mo-lede" style={i(0)}>
            {hero.subheadline}
          </p>
          <div className="mo-ctas" style={i(1)}>
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label} <Arrow />
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
          {facts.length > 0 ? (
            <dl className="mo-facts" style={i(2)}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <span />
          )}
        </div>
      </div>
      <p className="mo-scroll" aria-hidden="true">
        Scroll
      </p>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const n = c.name.length;
  return (
    <footer className="mo-foot">
      <div className="mo-wrap">
        <div className="mo-foot-cta">
          <p data-rv>{em(c.spec.hero.headline)}</p>
          <Btn c={c} href={cta.href}>
            {cta.label} <Arrow />
          </Btn>
        </div>
        <p className={`mo-foot-name${n > 14 ? " is-l" : n > 8 ? " is-m" : ""}`} aria-hidden="true" data-px>
          {c.name}
        </p>
        <div className="mo-foot-grid">
          <div>
            <h3>{c.t.explore}</h3>
            {c.nav.map((x, k) => (
              <a key={x.id} href={`#${x.id}`}>
                {two(k + 1)} — {x.label}
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
                {c.t.route} →
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
          <div>
            <h3>{c.name}</h3>
            {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
            <a className="mo-top" href="#top">
              Top
            </a>
          </div>
        </div>
        <Legal c={c} className="mo-legal" />
      </div>
    </footer>
  );
}

type IconName = Parameters<typeof Icon>[0]["name"];

function Principles({ items }: { items: { title: string; description: string; icon: IconName }[] }) {
  return (
    <ul className="mo-feats">
      {items.map((it, n) => (
        <li key={n} className="mo-feat" data-rv style={i(n % 3)}>
          <small>{two(n + 1)}</small>
          <span className="mo-ico">
            <Icon name={it.icon} />
          </span>
          <h3>{it.title}</h3>
          <p>{it.description}</p>
        </li>
      ))}
    </ul>
  );
}

function Floors({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <ol className="mo-floors">
      {steps.map((st, n) => (
        <li key={n} className="mo-floor" style={i(n)}>
          <b>{two(n + 1)}</b>
          <h3>{st.title}</h3>
          <p>{st.description}</p>
        </li>
      ))}
    </ol>
  );
}

function Table({ c }: { c: Ctx }) {
  return (
    <div className="mo-table" data-rv>
      <div className="mo-table-top">
        <span className="mo-tag">{c.t.hours}</span>
        <NowBadge c={c} className="mo-now" />
      </div>
      {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
    </div>
  );
}

function ReachList({ c, cta }: { c: Ctx; cta?: boolean }) {
  const b = c.spec.business;
  const rows = [
    b.phone ? { k: c.t.phone, v: <a href={tel(b.phone)}>{b.phone}</a> } : null,
    b.email ? { k: c.t.email, v: <a href={`mailto:${b.email}`}>{b.email}</a> } : null,
    b.address || b.city ? { k: c.t.address, v: <span>{b.address ?? b.city}</span> } : null,
    b.mapsUrl
      ? {
          k: c.t.route,
          v: (
            <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
              Maps →
            </a>
          ),
        }
      : null,
  ].filter((x): x is { k: string; v: React.JSX.Element } => Boolean(x));
  return (
    <div className="mo-reach" data-rv>
      {rows.map((r) => (
        <p key={r.k}>
          <small>{r.k}</small>
          {r.v}
        </p>
      ))}
      {cta ? (
        <a className="btn mo-solid" href={c.spec.hero.primaryCta.href}>
          {c.spec.hero.primaryCta.label} <Arrow />
        </a>
      ) : null}
    </div>
  );
}

export const monolith: Family = {
  key: "monolith",
  root: "d-monolith",
  fonts: ["Big Shoulders Display", "IBM Plex Sans"],
  themeColor: "#0b0c0d",
  accent: "#eceef0",
  onAccent: "#0b0c0d",
  // Everything comes after the shared defaults, so the kit's sections take this look.
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "mo-wrap", eyebrow: "mo-tag", btn: "mo-solid", btnAlt: "mo-line", btnText: "mo-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="mo-sec" id={s.id}>
          <div className={`mo-wrap mo-about${p ? "" : " is-solo"}`}>
            {p ? (
              <figure className="mo-clip mo-marks mo-about-pic" data-rv data-px>
                <Pic p={p} sizes="(min-width: 1000px) 52vw, 100vw" />
                <span className="mo-light" aria-hidden="true" />
                {c.spec.business.city ? (
                  <figcaption>
                    <span>{c.spec.business.city}</span>
                    <span>{c.name}</span>
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
            <div className="mo-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="mo-lead" data-rv>
                {first}
              </p>
              {rest.length > 0 && (
                <div className={`mo-cols${rest.length > 1 ? " has-2" : ""}`} data-rv>
                  {rest.map((x, n) => (
                    <p key={n}>{x}</p>
                  ))}
                </div>
              )}
              {s.highlights.length > 0 && (
                <ul className="mo-spec" data-rv>
                  {s.highlights.map((h, n) => (
                    <li key={h}>
                      <small>{two(n + 1)}</small>
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
    services: (s, c) => (
      <section className="mo-sec is-k1" id={s.id}>
        <div className="mo-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} split />
          <ol className="mo-dis">
            {s.items.map((it, n) => {
              const p = c.photo(`art:svc${n}`) ?? (n < 6 ? c.spare() : null);
              return (
                <li key={n} className="mo-row" data-rv style={i(n % 4)}>
                  {p ? (
                    <div className="mo-row-pic" aria-hidden="true">
                      <Pic p={p} sizes="100vw" />
                    </div>
                  ) : null}
                  <small>{two(n + 1)}</small>
                  <h3>{it.title}</h3>
                  <div className="mo-row-txt">
                    <p>{it.description}</p>
                    {it.price || it.duration ? (
                      <p className="mo-row-meta">
                        {it.duration ? <span>{it.duration}</span> : null}
                        {it.price ? <span>{it.price}</span> : null}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    ),
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="mo-sec is-k1" id={s.id}>
          <div className="mo-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} split />
            <div className="mo-menu-cats">
              {cats.map((cat, n) => (
                <div key={n} className="mo-cat" data-rv style={i(n % 2)}>
                  <h3>{cat.name}</h3>
                  {cat.items.map((d, m) => (
                    <div key={m} className="mo-dish">
                      <b>{d.name}</b>
                      {d.price ? <span>{d.price}</span> : <span />}
                      {d.description ? <p>{d.description}</p> : null}
                    </div>
                  ))}
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
      );
    },
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const caption = (p: Photo) => p.alt.replace(/^Voorbeeldfoto:\s*/i, "");
      return (
        <section className="mo-hs" id={s.id} aria-labelledby={`${s.id}-h`}>
          <div className="mo-wrap mo-hs-head">
            <Head kicker={c.t.kick.gallery} title={s.title} id={`${s.id}-h`} />
          </div>
          <div className="mo-hs-stick">
            <div className="mo-hs-track">
              <div className="mo-hs-intro" aria-hidden="true">
                <p className="mo-tag">
                  {c.t.kick.gallery} — {two(pics.length)}
                </p>
                <h2>{em(s.title)}</h2>
                <p>{c.spec.business.city ?? c.name}</p>
              </div>
              {pics.map((p, n) => (
                <figure key={n} className="mo-panel">
                  <div className="mo-clip mo-marks" data-rv>
                    <Pic p={p} sizes="(min-width: 900px) 60vw, 100vw" />
                  </div>
                  <figcaption>
                    <b>{two(n + 1)}</b>
                    <span>{caption(p)}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mo-hs-bar" aria-hidden="true">
              <b>01</b>
              <i />
              <span>{two(pics.length)}</span>
            </div>
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="mo-sec" id={s.id}>
        <div className="mo-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} split />
          <Principles items={s.items} />
        </div>
      </section>
    ),
    process: (s, c) => (
      <section className="mo-sec is-k1" id={s.id}>
        <div className="mo-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} split />
          <Floors steps={s.steps} />
        </div>
      </section>
    ),
    team: (s, c) => (
      <section className="mo-sec" id={s.id}>
        <div className="mo-wrap">
          <Head kicker={c.t.kick.team} title={s.title} intro={s.intro} split />
          <ul className="mo-team">
            {s.members.map((m, n) => {
              const p = c.photo(m.image);
              return (
                <li key={n} data-rv style={i(n % 3)}>
                  {p ? (
                    <figure className="mo-clip">
                      <Pic p={p} sizes="(min-width: 900px) 28vw, 50vw" />
                    </figure>
                  ) : null}
                  <p className="mo-role">{m.role}</p>
                  <h3>{m.name}</h3>
                  {m.bio ? <p>{m.bio}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    hours: (s, c) => (
      <section className="mo-sec is-light" id={s.id}>
        <div className="mo-wrap mo-visit">
          <div className="mo-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <Table c={c} />
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="mo-sec" id={s.id}>
        <div className="mo-wrap mo-visit">
          <div className="mo-visit-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <ReachList c={c} />
            {!c.spec.sections.some((x) => x.type === "hours") && c.spec.business.openingHours?.length ? <Table c={c} /> : null}
          </div>
          <div className="mo-form mo-marks" data-rv>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="mo-sec is-k1" id={s.id}>
        <div className="mo-wrap mo-visit">
          <div className="mo-visit-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            {s.showForm ? <ReachList c={c} /> : null}
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") && c.spec.business.openingHours?.length ? <Table c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="mo-form mo-marks" data-rv>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : (
            <ReachList c={c} cta />
          )}
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="mo-sec" id={s.id}>
        <div className="mo-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} split />
          <ul className="mo-chan">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="mo-ico">
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
  },
};

