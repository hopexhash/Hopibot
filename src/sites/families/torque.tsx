import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, hoursRows, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, splitLines, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Torque: an original template (no portfolio demo). Retro motorsport: black, white and racing
 * yellow, a condensed display face set in italics by skewing it, racing stripes, chequered
 * flags and slanted section edges. The opening runs a start-light sequence (five red lights,
 * then lights out) before the headline launches in; a gauge shows today's opening hours on a
 * 24-hour dial with the needle on the current time; services hang on a pit board; the hours
 * are a timing screen with a bar per day; shift lights along the header fill as you scroll.
 * Made for garages, tyre centres, car detailing, dealers, motorbike shops and workshops.
 */

const CSS = `
.d-torque{--black:#0d0d0d;--carbon:#171717;--asphalt:#262626;--paper:#f2f1ec;--white:#ffffff;--yellow:#ffd400;--yellow-d:#e2bb00;--dim:#5d5b55;--grey:#8e8c86;--red:#ff2a1a;--green:#19c46a;--line:rgba(13,13,13,.14);--line-w:rgba(255,255,255,.13);--pad:clamp(18px,5vw,80px);--ease:cubic-bezier(.2,.8,.2,1);--snap:cubic-bezier(.7,0,.2,1);--kick:cubic-bezier(.3,1.5,.5,1);--disp:"Big Shoulders Display","Arial Narrow",Impact,sans-serif;--skew:-9deg;--check:conic-gradient(var(--white) 25%,var(--black) 0 50%,var(--white) 0 75%,var(--black) 0);--z-bg2:var(--white);--z-ink:var(--black);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--black);--z-on-accent:var(--yellow);--z-display:var(--disp);--z-display-weight:800;--z-radius:0px;--z-sec:clamp(88px,11vw,160px);--z-h3:clamp(24px,2vw,32px);--z-field-radius:0px;--z-ico-radius:0px;--z-statement:clamp(38px,5vw,80px);background:var(--paper);color:var(--black);font-family:"Archivo",system-ui,sans-serif;font-size:clamp(15.5px,1vw,17px);line-height:1.62}
.d-torque h1,.d-torque h2,.d-torque h3{font-family:var(--disp);font-weight:800;line-height:.9;letter-spacing:.004em;text-transform:uppercase}
.d-torque h2{font-size:clamp(46px,6.6vw,104px);font-weight:900;transform:skewX(var(--skew));transform-origin:0 100%}
.d-torque h2.is-long{font-size:clamp(38px,4.6vw,72px)}
.d-torque h2 em,.d-torque h1 em{font-style:normal;background:linear-gradient(transparent 58%,var(--yellow) 0 92%,transparent 0) 0 0/100% 100% no-repeat;-webkit-box-decoration-break:clone;box-decoration-break:clone;padding:0 .06em}
.d-torque .is-black h2 em,.d-torque .tq-hero h1 em{background:none;padding:0;color:var(--yellow)}
.d-torque .tq-wrap{position:relative;width:min(100%,1320px);margin-inline:auto;padding-inline:var(--pad)}
.d-torque .tq-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.d-torque .tq-kick{display:inline-flex;align-items:center;gap:12px;font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.d-torque .tq-kick::before{content:"";flex:none;width:30px;height:12px;background:var(--check) 0 0/6px 6px;transform:skewX(var(--skew))}
.d-torque .is-black .tq-kick,.d-torque .tq-hero .tq-kick{color:var(--yellow)}
.d-torque .btn{position:relative;z-index:0;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:54px;padding:0 30px;font-family:var(--disp);font-size:19px;font-weight:800;letter-spacing:.06em;line-height:1;text-transform:uppercase;transition:color .25s,transform .35s var(--ease)}
.d-torque .btn::before{content:"";position:absolute;inset:0;z-index:-1;transform:skewX(-14deg);transition:background-color .25s,border-color .25s,box-shadow .35s var(--ease)}
.d-torque .btn svg{width:20px;height:20px;transition:transform .45s var(--snap)}
.d-torque .btn:hover svg{transform:translateX(7px)}
.d-torque .btn:hover{transform:translateX(3px)}
.d-torque .tq-fill{color:var(--black)}
.d-torque .tq-fill::before{background:var(--yellow);box-shadow:5px 5px 0 var(--black)}
.d-torque .is-black .tq-fill::before,.d-torque .tq-hero .tq-fill::before,.d-torque .tq-foot .tq-fill::before{box-shadow:5px 5px 0 var(--white)}
.d-torque .tq-fill:hover::before{box-shadow:9px 7px 0 var(--black)}
.d-torque .is-black .tq-fill:hover::before,.d-torque .tq-hero .tq-fill:hover::before{box-shadow:9px 7px 0 var(--white)}
.d-torque .tq-fill::after{content:"";position:absolute;right:-8px;top:0;bottom:0;width:0;background:var(--check) 0 0/9px 9px;transform:skewX(-14deg);transition:width .35s var(--snap)}
.d-torque .tq-fill:hover::after{width:18px}
.d-torque .tq-line{color:currentColor}
.d-torque .tq-line::before{border:2px solid currentColor}
.d-torque .tq-line:hover{color:var(--black)}
.d-torque .tq-line:hover::before{border-color:var(--yellow);background:var(--yellow)}
.d-torque .tq-text{position:relative;display:inline-flex;align-items:center;gap:10px;min-height:44px;font-family:var(--disp);font-size:19px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.d-torque .tq-text::after{content:"";position:absolute;left:0;right:0;bottom:6px;height:4px;background:var(--yellow);transform:skewX(-14deg) scaleX(.35);transform-origin:left;transition:transform .4s var(--snap)}
.d-torque .tq-text:hover::after{transform:skewX(-14deg) scaleX(1)}
.d-torque .tq-hdr{position:sticky;top:0;z-index:40;background:var(--black);color:var(--white)}
.d-torque .tq-bar{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:20px;height:78px;transition:height .4s var(--ease)}
.d-torque.is-scrolled .tq-bar{height:64px}
.d-torque .tq-logo{display:flex;align-items:center;gap:14px;min-width:0;min-height:44px}
.d-torque .tq-logo i{position:relative;display:grid;flex:none;place-items:center;width:46px;height:38px;font-family:var(--disp);font-size:28px;font-weight:900;font-style:normal;color:var(--black);transition:transform .4s var(--kick)}
.d-torque .tq-logo i::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--yellow);transform:skewX(-14deg)}
.d-torque .tq-logo i{z-index:0}
.d-torque .tq-logo:hover i{transform:translateX(4px) rotate(-4deg)}
.d-torque .tq-logo span{overflow:hidden;font-family:var(--disp);font-size:clamp(22px,2vw,28px);font-weight:800;letter-spacing:.04em;line-height:1;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap;transform:skewX(var(--skew))}
.d-torque .tq-links{display:none;gap:4px}
.d-torque .tq-links a{position:relative;display:inline-flex;align-items:center;min-height:44px;padding:0 12px;white-space:nowrap;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.72);transition:color .2s}
.d-torque .tq-links a::after{content:"";position:absolute;left:12px;right:12px;bottom:6px;height:3px;background:var(--yellow);transform:skewX(-14deg) scaleX(0);transform-origin:left;transition:transform .35s var(--snap)}
.d-torque .tq-links a:hover{color:var(--white)}
.d-torque .tq-links a:hover::after{transform:skewX(-14deg) scaleX(1)}
.d-torque .tq-cta{display:none;min-height:46px;padding:0 22px;font-size:17px}
.d-torque .tq-burger{position:relative;z-index:42;display:flex;align-items:center;gap:12px;min-height:48px;padding:0 18px;border:0;background:none;color:var(--black);font-family:var(--disp);font-size:18px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
.d-torque .tq-burger::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--yellow);transform:skewX(-14deg)}
.d-torque .tq-burger{z-index:42;isolation:isolate}
.d-torque .tq-burger i{display:grid;gap:4px;width:20px}
.d-torque .tq-burger i::before,.d-torque .tq-burger i::after{content:"";height:3px;background:currentColor;transform:skewX(-14deg);transition:transform .35s var(--snap)}
.d-torque.menu-open .tq-burger i::before{transform:translateY(3.5px) rotate(45deg)}
.d-torque.menu-open .tq-burger i::after{transform:translateY(-3.5px) rotate(-45deg)}
@media (min-width:1080px){.d-torque .tq-bar{grid-template-columns:auto minmax(0,1fr) auto}.d-torque .tq-links{display:flex;justify-content:center}.d-torque .tq-cta{display:inline-flex}.d-torque .tq-burger{display:none}}
.d-torque .tq-shift{position:absolute;left:0;right:0;bottom:0;display:grid;grid-template-columns:repeat(15,minmax(0,1fr));gap:3px;height:4px;padding-inline:3px}
.d-torque .tq-shift i{background:var(--green);opacity:clamp(.12,calc(var(--sp,0) * 16 - var(--k)),1);transition:opacity .2s}
.d-torque .tq-shift i:nth-child(n+7){background:var(--yellow)}
.d-torque .tq-shift i:nth-child(n+12){background:var(--red)}
.d-torque .tq-menu{position:fixed;inset:0;z-index:39;display:flex;flex-direction:column;justify-content:space-between;gap:28px;padding:104px var(--pad) 110px;overflow-y:auto;background:var(--black);color:var(--white);transform:translateX(105%) skewX(-6deg);transform-origin:0 100%;visibility:hidden;transition:transform .6s var(--snap),visibility 0s .6s}
.d-torque .tq-menu.is-open{transform:none;visibility:visible;transition:transform .6s var(--snap)}
.d-torque .tq-menu::before{content:"";position:absolute;left:0;right:0;top:78px;height:16px;background:var(--check) 0 0/16px 16px;opacity:.9}
.d-torque .tq-menu::after{content:"";position:absolute;left:0;top:0;bottom:0;width:10px;background:var(--yellow)}
.d-torque .tq-menu nav{display:grid;gap:2px;margin-top:24px}
.d-torque .tq-menu nav a{display:flex;align-items:baseline;gap:16px;min-height:58px;font-family:var(--disp);font-size:clamp(42px,11vw,72px);font-weight:900;line-height:1;text-transform:uppercase;opacity:0;transform:translateX(60px) skewX(var(--skew));transition:opacity .4s,transform .6s var(--snap),color .2s}
.d-torque .tq-menu nav a small{font-size:.38em;color:var(--yellow)}
.d-torque .tq-menu nav a:hover{color:var(--yellow)}
.d-torque .tq-menu.is-open nav a{opacity:1;transform:skewX(var(--skew));transition-delay:calc(.25s + var(--i,0) * 60ms)}
.d-torque .tq-menu p{display:grid;gap:4px;color:rgba(255,255,255,.7)}
.d-torque .tq-menu p a{display:inline-flex;align-items:center;min-height:44px;font-family:var(--disp);font-size:30px;font-weight:800;color:var(--yellow)}
.d-torque.menu-open .tq-logo{position:relative;z-index:42}
.d-torque .tq-hero{position:relative;padding:clamp(36px,5vw,80px) 0 0;overflow:hidden;background:var(--black);color:var(--white)}
.d-torque .tq-stripes{position:absolute;right:-20%;bottom:16%;width:140%;height:clamp(90px,10vw,150px);transform:rotate(-14deg) translateX(calc(var(--p,0) * 60px));transform-origin:100% 50%;pointer-events:none}
.d-torque .tq-stripes i{position:absolute;left:0;right:0;transform-origin:100% 50%;animation:tq-wipe 1.1s var(--snap) both}
.d-torque .tq-stripes i:nth-child(1){top:0;height:44%;background:var(--yellow);animation-delay:1.45s}
.d-torque .tq-stripes i:nth-child(2){top:54%;height:14%;background:var(--white);animation-delay:1.55s}
.d-torque .tq-stripes i:nth-child(3){top:78%;height:22%;background:var(--yellow);animation-delay:1.65s}
.d-torque .tq-hero-grid{position:relative;display:grid;gap:clamp(44px,5vw,80px);align-items:center;padding-bottom:clamp(64px,7vw,110px)}
@media (min-width:1000px){.d-torque .tq-hero-grid{grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr)}}
.d-torque .tq-hero-copy{position:relative;z-index:2;display:grid;gap:clamp(20px,2.2vw,30px);justify-items:start;min-width:0}
.d-torque .tq-start{display:flex;flex-wrap:wrap;align-items:center;gap:14px 22px}
.d-torque .tq-lights{position:relative;display:flex;gap:8px;padding:6px 10px;background:var(--carbon);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
.d-torque .tq-lights::before{content:"";position:absolute;left:-10px;right:-10px;top:50%;height:6px;margin-top:-3px;background:var(--asphalt);z-index:-1}
.d-torque .tq-lights span{display:grid;gap:5px;padding:5px;border-radius:7px;background:#050505}
.d-torque .tq-lights i{width:16px;height:16px;border-radius:50%;background:#1d1d1d;box-shadow:inset 0 2px 3px rgba(0,0,0,.6)}
.d-torque .tq-lights i+i{background:#2a0e0c;animation:tq-on .01s steps(1) both,tq-off .12s ease 1.38s both;animation-delay:calc(.25s + var(--i,0) * 210ms),1.38s}
.d-torque .tq-hero .tq-kick{animation:tq-fade .5s ease .1s both}
.d-torque .tq-now{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.d-torque .tq-now::before{content:"";width:10px;height:10px;border-radius:50%;background:var(--grey)}
.d-torque .tq-now.is-open::before{background:var(--green);box-shadow:0 0 10px var(--green)}
.d-torque .tq-now.is-closed::before{background:var(--red)}
.d-torque .tq-hero h1{font-size:clamp(58px,9.4vw,156px);font-weight:900;line-height:.84;transform:skewX(var(--skew));transform-origin:0 100%}
.d-torque .tq-hero h1.is-m{font-size:clamp(50px,6.8vw,110px)}
.d-torque .tq-hero h1.is-s{font-size:clamp(42px,5.6vw,88px);line-height:.88}
.d-torque .tq-ln{position:relative;display:block;padding:.04em .12em .02em 0;overflow:hidden}
.d-torque .tq-ln>span{display:block;animation:tq-launch .95s cubic-bezier(.16,.84,.24,1) both;animation-delay:calc(1.5s + var(--i,0) * 110ms)}
.d-torque .tq-ln::after{content:"";position:absolute;left:0;top:42%;width:100%;height:12%;background:linear-gradient(90deg,transparent,var(--yellow) 70%,var(--white));transform:scaleX(0);transform-origin:left;pointer-events:none;animation:tq-streak .8s ease-out both;animation-delay:calc(1.48s + var(--i,0) * 110ms)}
.d-torque .tq-lede{max-width:46ch;font-size:clamp(16.5px,1.25vw,19px);color:rgba(255,255,255,.74);animation:tq-up .7s var(--ease) 2s both}
.d-torque .tq-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:16px 28px;animation:tq-up .7s var(--ease) 2.1s both}
.d-torque .tq-tele{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr));width:100%;margin-top:8px;border-top:1px solid var(--line-w);animation:tq-fade .6s ease 2.2s both}
.d-torque .tq-tele div{display:grid;gap:4px;padding:16px 18px 0 0;animation:tq-up .6s var(--ease) both;animation-delay:calc(2.25s + var(--i,0) * 100ms)}
.d-torque .tq-tele dt{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--yellow)}
.d-torque .tq-tele dd{margin:0;font-family:var(--disp);font-size:clamp(20px,1.6vw,24px);font-weight:700;line-height:1.1;letter-spacing:.02em}
.d-torque .tq-tele a{transition:color .2s}
.d-torque .tq-tele a:hover{color:var(--yellow)}
.d-torque .tq-art{position:relative;z-index:1;min-width:0}
.d-torque .tq-photo{position:relative;aspect-ratio:5/4;margin-left:6%;overflow:hidden;background:var(--carbon);clip-path:polygon(14% 0,14% 0,0 100%,0 100%);animation:tq-reveal 1s var(--snap) 1.55s forwards}
.d-torque .tq-photo img{width:100%;height:100%;object-fit:cover;scale:1.15;animation:tq-zoom 2.2s var(--ease) 1.55s forwards}
.d-torque .tq-photo::after{content:"";position:absolute;right:0;top:0;bottom:0;width:22%;background:linear-gradient(90deg,transparent,rgba(13,13,13,.5))}
.d-torque .tq-art>.tq-gauge{position:absolute;left:-2%;bottom:-12%;width:clamp(170px,17vw,240px);animation:tq-pop .7s var(--kick) 2s both}
.d-torque .tq-art.is-plain{display:grid;place-items:center;padding:20px 0}
.d-torque .tq-art.is-plain::before{content:"";position:absolute;inset:6% 4% 6% 18%;background:var(--check) 0 0/34px 34px;opacity:.1;transform:skewX(-14deg)}
.d-torque .tq-art.is-plain>.tq-gauge{position:relative;width:min(100%,460px);animation:tq-pop .8s var(--kick) 1.6s both}
.d-torque .tq-art.is-plain>.tq-plate{position:absolute;right:0;top:4%;animation:tq-pop .6s var(--kick) 2.2s both}
.d-torque .tq-checker{height:28px;background:var(--check) 0 0/28px 28px;animation:tq-wipe-l .9s var(--snap) 1.7s both}
.d-torque .tq-gauge{position:relative;aspect-ratio:1;filter:drop-shadow(0 18px 30px rgba(0,0,0,.55))}
.d-torque .tq-gauge svg{display:block;width:100%;height:100%;overflow:visible}
.d-torque .tq-g-face{fill:var(--black);stroke:#3a3a3a;stroke-width:2}
.d-torque .tq-g-bezel{fill:none;stroke:rgba(255,255,255,.16);stroke-width:2}
.d-torque .tq-g-track{fill:none;stroke:#2c2c2c;stroke-width:9}
.d-torque .tq-open{fill:none;stroke:var(--yellow);stroke-width:9;stroke-dasharray:0 1000;transition:stroke-dasharray 1.4s var(--ease) 1.8s}
.d-torque .tq-g-ticks line{stroke:rgba(255,255,255,.5);stroke-width:1.2}
.d-torque .tq-g-ticks line.is-major{stroke:var(--white);stroke-width:2.4}
.d-torque .tq-g-nums text{fill:rgba(255,255,255,.82);font-family:var(--disp);font-size:13px;font-weight:800;text-anchor:middle;dominant-baseline:middle}
.d-torque .tq-g-unit{fill:var(--yellow);font-family:var(--disp);font-size:10px;font-weight:800;letter-spacing:.12em;text-anchor:middle}
.d-torque .tq-clock{fill:var(--white);font-family:var(--disp);font-size:22px;font-weight:800;letter-spacing:.06em;text-anchor:middle}
.d-torque .tq-needle{transform-box:view-box;transform-origin:100px 100px;transform:rotate(var(--a,-120deg));transition:transform 1.5s cubic-bezier(.25,1.45,.45,1)}
.d-torque .tq-needle path{fill:var(--red)}
.d-torque .tq-needle circle{fill:var(--yellow);stroke:var(--black);stroke-width:3}
.d-torque .tq-gauge .tq-now{position:absolute;left:50%;bottom:9%;padding:5px 10px 5px 8px;background:var(--black);color:var(--white);font-size:clamp(9px,.8vw,11px);white-space:nowrap;transform:translateX(-50%)}
.d-torque .tq-gauge.is-big .tq-now{font-size:13px;bottom:10%}
.d-torque .tq-plate{position:relative;z-index:0;display:grid;place-items:center;width:clamp(110px,11vw,150px);aspect-ratio:1;border-radius:50%;background:var(--white);color:var(--black);font-family:var(--disp);font-size:clamp(70px,7vw,100px);font-weight:900;line-height:1;box-shadow:0 0 0 6px var(--black),0 0 0 10px var(--yellow)}
.d-torque .tq-plate b{font-weight:900;transform:skewX(var(--skew))}
.d-torque .tq-sec{position:relative;padding-block:var(--z-sec)}
.d-torque .tq-sec.is-white{background:var(--white)}
.d-torque .tq-sec.is-black{background:var(--black);color:var(--white)}
.d-torque .tq-sec.is-yellow{background:var(--yellow);color:var(--black)}
.d-torque .tq-slant::before{content:"";position:absolute;left:0;right:0;bottom:calc(100% - 1px);height:4vw;background:inherit;clip-path:polygon(0 100%,100% 0,100% 100%)}
.d-torque .tq-slant::after{content:"";position:absolute;left:0;right:0;bottom:calc(100% + 4px);height:calc(4vw + 2px);background:var(--yellow);clip-path:polygon(0 calc(100% - 6px),100% 0,100% 6px,0 100%)}
.d-torque .tq-slant.is-yellow::after{background:var(--black)}
.d-torque .tq-head{display:grid;gap:18px;max-width:900px;margin-bottom:clamp(40px,5vw,72px)}
.d-torque .tq-head>p:not(.tq-kick){max-width:54ch;font-size:1.06em;color:var(--dim)}
.d-torque .is-black .tq-head>p:not(.tq-kick){color:rgba(255,255,255,.66)}
.d-torque .is-yellow .tq-head>p:not(.tq-kick){color:rgba(13,13,13,.74)}
.d-torque .tq-head.is-row{max-width:none}
@media (min-width:980px){.d-torque .tq-head.is-row{grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);align-items:end;column-gap:48px}.d-torque .tq-head.is-row>.tq-kick{grid-column:1/-1}.d-torque .tq-head.is-row>p:not(.tq-kick){padding-bottom:6px}}
.demo-js .d-torque .tq-head h2[data-rv]{opacity:0;transform:translateX(-50px) skewX(-24deg);transition:opacity .5s,transform .8s var(--snap)}
.demo-js .d-torque .tq-head h2[data-rv].in{opacity:1;transform:skewX(var(--skew))}
.demo-js .d-torque h2[data-rv]{transform:translateY(26px) skewX(var(--skew))}
.demo-js .d-torque h2[data-rv].in{transform:skewX(var(--skew))}
.d-torque .tq-board{position:relative;padding:clamp(14px,1.6vw,22px);border-radius:6px;background:#2b2b2b;box-shadow:inset 0 0 0 2px #3a3a3a,0 40px 70px -40px rgba(0,0,0,.6)}
.d-torque .tq-board-in{position:relative;padding:clamp(8px,1.4vw,18px) clamp(16px,2.6vw,40px) clamp(14px,2vw,26px);background:var(--black);color:var(--white)}
.d-torque .tq-board-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 24px;padding:14px 0 16px;border-bottom:3px solid var(--yellow)}
.d-torque .tq-board-top b{font-family:var(--disp);font-size:clamp(22px,2vw,30px);font-weight:900;letter-spacing:.06em;text-transform:uppercase;transform:skewX(var(--skew))}
.d-torque .tq-board-top span{display:flex;align-items:center;gap:10px;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--grey)}
.d-torque .tq-board-top span::before{content:"";width:38px;height:12px;background:var(--check) 0 0/6px 6px}
.d-torque .tq-pit{display:grid}
.d-torque .tq-pit li{position:relative;display:grid;grid-template-columns:clamp(56px,6vw,84px) minmax(0,1fr);gap:4px clamp(14px,2vw,28px);align-items:center;padding:clamp(18px,2vw,26px) 0;border-bottom:1px dashed rgba(255,255,255,.16);isolation:isolate}
.d-torque .tq-pit li:last-child{border-bottom:0}
.d-torque .tq-pit li::before{content:"";position:absolute;inset:0 calc(-1 * clamp(16px,2.6vw,40px));z-index:-1;background:linear-gradient(90deg,rgba(255,212,0,.16),rgba(255,212,0,0) 70%);opacity:0;transition:opacity .3s}
.d-torque .tq-pit li::after{content:"";position:absolute;left:calc(-1 * clamp(16px,2.6vw,40px));top:14%;bottom:14%;width:6px;background:var(--yellow);transform:scaleY(0);transition:transform .35s var(--snap)}
.d-torque .tq-pit li:hover::before{opacity:1}
.d-torque .tq-pit li:hover::after{transform:none}
.d-torque .tq-pit-n{grid-row:span 2;font-family:var(--disp);font-size:clamp(46px,5vw,72px);font-weight:900;line-height:.8;color:var(--yellow);transform:skewX(var(--skew));transition:transform .4s var(--kick)}
.d-torque .tq-pit li:hover .tq-pit-n{transform:skewX(-16deg) translateX(6px)}
.d-torque .tq-pit h3{font-size:clamp(28px,2.8vw,44px);font-weight:900;transform:skewX(var(--skew));transform-origin:0 100%}
.d-torque .tq-pit p{max-width:62ch;font-size:14.5px;color:rgba(255,255,255,.62)}
.d-torque .tq-pit-meta{display:flex;flex-wrap:wrap;gap:4px 18px;font-family:var(--disp);font-size:20px;font-weight:800;letter-spacing:.04em;color:var(--yellow)}
.d-torque .tq-pit-ico{display:none}
@media (min-width:860px){.d-torque .tq-pit li{grid-template-columns:clamp(70px,6vw,90px) minmax(0,1fr) auto 54px;row-gap:6px}.d-torque .tq-pit-meta{grid-row:span 2;display:grid;justify-items:end;font-size:24px}.d-torque .tq-pit-ico{grid-row:span 2;display:grid;place-items:center;width:52px;height:52px;border:2px solid rgba(255,255,255,.2);color:var(--yellow);transform:skewX(-14deg);transition:background-color .25s,color .25s,border-color .25s}.d-torque .tq-pit-ico svg{width:22px;height:22px;transform:skewX(14deg)}.d-torque .tq-pit li:hover .tq-pit-ico{border-color:var(--yellow);background:var(--yellow);color:var(--black)}.d-torque .tq-pit li>div{grid-row:span 2}}
.demo-js .d-torque .tq-pit li[data-rv]{opacity:0;transform:translateX(-60px);transition:opacity .45s,transform .7s var(--snap);transition-delay:calc(var(--i,0) * 80ms)}
.demo-js .d-torque .tq-pit li[data-rv].in{opacity:1;transform:none}
.d-torque .tq-pole{position:absolute;left:50%;top:100%;width:14px;height:clamp(40px,6vw,90px);margin-left:-7px;background:linear-gradient(90deg,#3a3a3a,#6b6b6b,#3a3a3a)}
.d-torque .tq-menu-boards{display:grid;gap:clamp(18px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))}
.d-torque .tq-dish{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 16px;align-items:baseline;padding:14px 0;border-bottom:1px dashed rgba(255,255,255,.16)}
.d-torque .tq-dish:last-child{border-bottom:0}
.d-torque .tq-dish b{font-family:var(--disp);font-size:24px;font-weight:800;letter-spacing:.02em;text-transform:uppercase}
.d-torque .tq-dish span{font-family:var(--disp);font-size:22px;font-weight:800;color:var(--yellow)}
.d-torque .tq-dish p{grid-column:1/-1;font-size:14px;color:rgba(255,255,255,.62)}
.d-torque .tq-dish small{grid-column:1/-1;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--yellow)}
.d-torque .tq-note{margin-top:28px;font-size:14px;color:var(--dim)}
.d-torque .tq-about{display:grid;gap:clamp(48px,6vw,100px);align-items:center}
@media (min-width:960px){.d-torque .tq-about{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)}}
.d-torque .tq-livery{position:relative;padding:0 0 28px 0}
.d-torque .tq-livery figure{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--carbon);clip-path:polygon(0 0,82% 0,100% 14%,100% 100%,0 100%)}
.d-torque .tq-livery img{width:100%;height:116%;object-fit:cover;transform:translateY(calc(var(--p,0) * -6% - 6%))}
.d-torque .tq-livery figure::after{content:"";position:absolute;top:0;bottom:0;left:12%;width:46px;background:linear-gradient(90deg,var(--yellow) 0 56%,transparent 0 70%,var(--white) 0);opacity:.94;transform:scaleY(0);transform-origin:top;transition:transform 1s var(--snap) .3s}
.d-torque .tq-livery.in figure::after,html:not(.demo-js) .d-torque .tq-livery figure::after{transform:none}
.demo-js .d-torque .tq-livery[data-rv]{opacity:1;transform:none}
.demo-js .d-torque .tq-livery[data-rv] figure{clip-path:polygon(0 0,0 0,0 100%,0 100%);transition:clip-path 1s var(--snap)}
.demo-js .d-torque .tq-livery[data-rv].in figure{clip-path:polygon(0 0,82% 0,100% 14%,100% 100%,0 100%)}
.d-torque .tq-livery .tq-tag{position:absolute;right:6%;bottom:0;z-index:1;display:inline-flex;padding:12px 26px;font-family:var(--disp);font-size:clamp(22px,2vw,30px);font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:var(--yellow)}
.d-torque .tq-livery .tq-tag::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--black);transform:skewX(-14deg)}
.d-torque .tq-about-copy{display:grid;gap:22px;align-content:start}
.d-torque .tq-about-copy .tq-head{margin-bottom:6px}
.d-torque .tq-lead{font-size:clamp(19px,1.6vw,23px);font-weight:500;line-height:1.45}
.d-torque .tq-about-copy>p:not(.tq-lead){max-width:58ch;color:var(--dim)}
.d-torque .tq-chips{display:flex;flex-wrap:wrap;gap:12px 16px;margin-top:6px;padding-left:8px}
.d-torque .tq-chips li{position:relative;z-index:0;display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 18px;font-size:14px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--white);transition:transform .3s var(--kick)}
.d-torque .tq-chips li::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--black);transform:skewX(-14deg)}
.d-torque .tq-chips li svg{width:16px;height:16px;color:var(--yellow)}
.d-torque .tq-chips li:hover{transform:translateY(-3px)}
.d-torque .tq-roundel{position:relative;display:grid;place-items:center;aspect-ratio:1;max-width:460px;width:100%;justify-self:center}
.d-torque .tq-roundel::before{content:"";position:absolute;inset:-4% -30%;background:linear-gradient(var(--yellow),var(--yellow)) 50% 0/22% 100% no-repeat,linear-gradient(var(--black),var(--black)) 66% 0/5% 100% no-repeat;transform:skewX(-14deg)}
.d-torque .tq-roundel .tq-plate{width:76%;font-size:clamp(160px,20vw,280px);box-shadow:0 0 0 12px var(--black),0 0 0 20px var(--white),0 30px 60px -20px rgba(0,0,0,.5)}
.d-torque .tq-cards{display:grid;gap:0;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));border-top:3px solid var(--black);border-left:3px solid var(--black)}
.d-torque .tq-card{position:relative;display:grid;gap:14px;align-content:start;padding:clamp(26px,3vw,44px);border-right:3px solid var(--black);border-bottom:3px solid var(--black);isolation:isolate;transition:color .3s}
.d-torque .tq-card::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--black);transform:scaleY(0);transform-origin:bottom;transition:transform .45s var(--snap)}
.d-torque .tq-card:hover{color:var(--white)}
.d-torque .tq-card:hover::before{transform:none}
.d-torque .tq-card .tq-ico{display:grid;place-items:center;width:58px;height:58px;color:var(--yellow);transition:transform .45s var(--kick)}
.d-torque .tq-ico{position:relative;z-index:0}
.d-torque .tq-ico::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--black);transform:skewX(-14deg)}
.d-torque .tq-ico svg{width:24px;height:24px}
.d-torque .tq-card:hover .tq-ico{transform:translateX(8px) rotate(-6deg)}
.d-torque .tq-card h3{font-size:clamp(28px,2.4vw,38px);font-weight:900;transform:skewX(var(--skew));transform-origin:0 100%}
.d-torque .tq-card p{color:rgba(13,13,13,.76);transition:color .3s}
.d-torque .tq-card:hover p{color:rgba(255,255,255,.7)}
.d-torque .tq-lap{position:relative;padding-top:64px}
.d-torque .tq-road{position:absolute;left:0;right:46px;top:20px;height:14px;background:var(--asphalt);transform:skewX(-20deg)}
.d-torque .tq-road::before{content:"";position:absolute;left:0;right:0;top:6px;height:2px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.5) 0 18px,transparent 18px 36px)}
.d-torque .tq-road i{position:absolute;inset:0;background:var(--yellow);transform-origin:left;transform:scaleX(clamp(0,calc(1.15 - var(--p,1)),1))}
.d-torque .tq-road b{position:absolute;top:-10px;left:calc(clamp(0,calc(1.15 - var(--p,1)),1) * 100%);width:30px;height:34px;margin-left:-15px;background:var(--white);clip-path:polygon(0 0,100% 50%,0 100%,28% 50%)}
.d-torque .tq-flag{position:absolute;right:0;top:4px;width:40px;height:46px;background:var(--check) 0 0/10px 10px;transform:skewX(-10deg);box-shadow:-4px 0 0 var(--white)}
.d-torque .tq-steps{display:grid;gap:clamp(28px,3vw,48px) clamp(24px,3vw,40px);grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-torque .tq-step{display:grid;gap:12px;align-content:start;padding-top:20px;border-top:3px solid var(--line-w)}
.d-torque .tq-step small{display:inline-flex;align-items:center;justify-self:start;gap:8px;padding:4px 12px;background:var(--yellow);color:var(--black);font-family:var(--disp);font-size:18px;font-weight:900;letter-spacing:.06em;transform:skewX(-14deg)}
.d-torque .tq-step h3{font-size:clamp(28px,2.4vw,36px);font-weight:900;transform:skewX(var(--skew));transform-origin:0 100%}
.d-torque .tq-step p{color:rgba(255,255,255,.66)}
.demo-js .d-torque .tq-step[data-rv]{transform:translateX(-30px)}
.demo-js .d-torque .tq-step[data-rv].in{transform:none}
@media (max-width:640px){.d-torque .tq-lap{padding:0 0 0 42px}.d-torque .tq-road{left:6px;right:auto;top:0;bottom:0;width:12px;height:auto;transform:none}.d-torque .tq-road::before{left:5px;right:auto;top:0;bottom:0;width:2px;height:auto;background:repeating-linear-gradient(180deg,rgba(255,255,255,.5) 0 18px,transparent 18px 36px)}.d-torque .tq-road i{transform-origin:top;transform:scaleY(clamp(0,calc(1.15 - var(--p,1)),1))}.d-torque .tq-road b{left:-9px;top:calc(clamp(0,calc(1.15 - var(--p,1)),1) * 100%);margin:-15px 0 0;transform:rotate(90deg)}.d-torque .tq-flag{display:none}}
.d-torque .tq-shots{display:grid;gap:clamp(8px,1vw,14px);grid-template-columns:repeat(2,minmax(0,1fr))}
.d-torque .tq-shots figure{position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--carbon);clip-path:polygon(7% 0,100% 0,93% 100%,0 100%);transition:clip-path .5s var(--snap)}
.d-torque .tq-shots figure:first-child{grid-column:1/-1;aspect-ratio:16/9}
@media (max-width:899px){.d-torque .tq-shots figure:last-child:nth-child(even){grid-column:1/-1;aspect-ratio:16/9}}
.d-torque .tq-shots img{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease)}
.d-torque .tq-shots figure:hover{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}
.d-torque .tq-shots figure:hover img{transform:scale(1.06)}
.d-torque .tq-shots figcaption{position:absolute;left:12%;top:0;z-index:1;padding:4px 12px;background:var(--yellow);font-family:var(--disp);font-size:18px;font-weight:900;color:var(--black)}
.demo-js .d-torque .tq-shots figure[data-rv]{opacity:1;transform:none;clip-path:polygon(7% 0,7% 0,0 100%,0 100%);transition:clip-path .8s var(--snap);transition-delay:calc(var(--i,0) * 90ms)}
.demo-js .d-torque .tq-shots figure[data-rv].in{clip-path:polygon(7% 0,100% 0,93% 100%,0 100%)}
.demo-js .d-torque .tq-shots figure[data-rv].in:hover{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);transition-delay:0s}
@media (min-width:900px){.d-torque .tq-shots{grid-template-columns:repeat(3,minmax(0,1fr))}.d-torque .tq-shots figure:first-child{grid-column:span 2;grid-row:span 2;aspect-ratio:auto}}
.d-torque .tq-pits{display:grid;gap:clamp(40px,5vw,80px);align-items:start}
@media (min-width:980px){.d-torque .tq-pits{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}}
.d-torque .tq-pits-copy{display:grid;gap:22px;align-content:start}
.d-torque .tq-pits-copy .tq-head{margin-bottom:4px}
.d-torque .tq-pits-copy>p{max-width:52ch;color:var(--dim)}
.d-torque .tq-pits-copy h2{font-size:clamp(42px,4.8vw,72px)}
.d-torque .tq-pits-copy h2.is-long{font-size:clamp(36px,3.6vw,56px)}
.d-torque h2{overflow-wrap:break-word}
.d-torque .is-black .tq-pits-copy>p{color:rgba(255,255,255,.66)}
.d-torque .tq-screen{position:relative;padding:clamp(20px,2.6vw,36px);background:repeating-linear-gradient(45deg,#121212 0 6px,#161616 6px 12px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),0 0 0 6px #202020}
.d-torque .tq-screen-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding-bottom:16px;border-bottom:3px solid var(--yellow)}
.d-torque .tq-screen-top h3{font-size:clamp(24px,2.2vw,32px);font-weight:900;transform:skewX(var(--skew))}
.d-torque .tq-screen .tq-now{color:var(--white)}
.d-torque .tq-axis{display:grid;grid-template-columns:minmax(96px,.8fr) minmax(0,1.6fr);gap:14px;padding:12px 0 4px;font-family:var(--disp);font-size:13px;font-weight:700;color:var(--grey)}
.d-torque .tq-axis span{display:flex;justify-content:space-between}
.d-torque .tq-plain-hours{font-family:var(--disp);font-size:22px}
.d-torque .tq-form{position:relative;padding:clamp(26px,3.4vw,50px);padding-top:calc(clamp(26px,3.4vw,50px) + 18px);background:var(--white);color:var(--black);box-shadow:10px 10px 0 var(--black)}
.d-torque .is-black .tq-form{box-shadow:10px 10px 0 var(--yellow)}
.d-torque .tq-form::before{content:"";position:absolute;left:0;right:0;top:0;height:18px;background:var(--check) 0 0/18px 18px}
.d-torque .tq-form>.tq-form-h{display:inline-block;margin-bottom:24px;font-family:var(--disp);font-size:clamp(28px,2.4vw,36px);font-weight:900;line-height:1;text-transform:uppercase;transform:skewX(var(--skew))}
.d-torque .tq-dial{display:grid;gap:10px;align-content:start}
.d-torque .tq-dial>a{display:inline-flex;align-items:center;min-height:48px;font-family:var(--disp);font-size:clamp(40px,5vw,76px);font-weight:900;line-height:1;color:var(--yellow);transform:skewX(var(--skew));transform-origin:0 100%;transition:color .2s,transform .35s var(--kick)}
.d-torque .tq-dial>a:hover{color:var(--white);transform:skewX(-14deg) translateX(6px)}
.d-torque .tq-dial>span{font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--grey)}
.d-torque .tq-dial .z-reach{margin-top:12px;font-size:17px}
.d-torque .tq-orders{display:grid;gap:clamp(14px,1.6vw,22px);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));padding-left:12px}
.d-torque .tq-orders a{position:relative;z-index:0;display:grid;gap:14px;align-content:start;min-height:100%;padding:clamp(26px,3vw,40px) clamp(24px,2.6vw,36px);color:var(--white);transition:color .25s}
.d-torque .tq-orders a::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--black);transform:skewX(-6deg);transition:background-color .25s,transform .45s var(--kick)}
.d-torque .tq-orders a:hover{color:var(--black)}
.d-torque .tq-orders a:hover::before{background:var(--yellow);transform:skewX(-10deg) translateX(6px)}
.d-torque .tq-orders .tq-ico{width:56px;height:56px;display:grid;place-items:center;color:var(--black)}
.d-torque .tq-orders .tq-ico::before{background:var(--yellow);transition:background-color .25s}
.d-torque .tq-orders a:hover .tq-ico{color:var(--yellow)}
.d-torque .tq-orders a:hover .tq-ico::before{background:var(--black)}
.d-torque .tq-orders h3{font-size:clamp(28px,2.4vw,36px);font-weight:900;transform:skewX(var(--skew));transform-origin:0 100%}
.d-torque .tq-orders p{color:rgba(255,255,255,.66);transition:color .25s}
.d-torque .tq-orders a:hover p{color:rgba(13,13,13,.75)}
.d-torque .tq-go{display:flex;align-items:center;gap:6px;margin-top:6px;color:var(--yellow);transition:color .25s}
.d-torque .tq-go i{display:block;height:3px;background:currentColor;transform:skewX(-14deg);transition:width .4s var(--snap)}
.d-torque .tq-go i:nth-child(1){width:10px}.d-torque .tq-go i:nth-child(2){width:18px}.d-torque .tq-go i:nth-child(3){width:30px}
.d-torque .tq-orders a:hover .tq-go{color:var(--black)}
.d-torque .tq-orders a:hover .tq-go i:nth-child(3){width:60px}
.d-torque .tq-foot{position:relative;overflow-x:clip;padding:0 0 130px;background:var(--black);color:rgba(255,255,255,.72)}
.d-torque .tq-foot>.tq-checker{animation:none}
.d-torque .tq-foot-name{padding:clamp(56px,7vw,100px) 0 clamp(36px,4vw,56px);font-family:var(--disp);font-size:min(15vw,190px,calc(160vw / var(--n,8)));font-weight:900;line-height:.86;text-transform:uppercase;color:transparent;-webkit-text-stroke:2px rgba(255,255,255,.85);transform:skewX(var(--skew));transform-origin:0 100%;word-break:break-word}
.d-torque .tq-foot-name span{background:linear-gradient(90deg,var(--yellow),var(--yellow)) 0 0/0 100% no-repeat;-webkit-background-clip:text;background-clip:text;transition:background-size 1.2s var(--snap)}
.d-torque .tq-foot-name.in span,html:not(.demo-js) .d-torque .tq-foot-name span{background-size:100% 100%}
.demo-js .d-torque .tq-foot-name[data-rv]{opacity:1;transform:skewX(var(--skew))}
.d-torque .tq-foot-grid{display:grid;gap:36px 32px;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-torque .tq-foot h3{margin-bottom:14px;font-size:22px;font-weight:900;color:var(--yellow);transform:skewX(var(--skew))}
.d-torque .tq-foot-grid a,.d-torque .tq-foot-grid span{display:block;padding:4px 0}
.d-torque .tq-foot-grid>div>a{display:flex;align-items:center;min-height:36px;transition:color .2s,transform .3s var(--kick)}
.d-torque .tq-foot-grid>div>a:hover{color:var(--yellow);transform:translateX(6px)}
.d-torque .tq-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;padding-top:22px;border-top:1px solid var(--line-w);font-size:13px;color:rgba(255,255,255,.5)}
@keyframes tq-on{to{background:var(--red);box-shadow:0 0 14px 3px rgba(255,42,26,.75),inset 0 -3px 4px rgba(0,0,0,.25)}}
@keyframes tq-off{to{background:#2a0e0c;box-shadow:inset 0 2px 3px rgba(0,0,0,.6)}}
@keyframes tq-launch{0%{opacity:0;transform:translateX(-115%) skewX(-28deg)}55%{opacity:1;transform:translateX(4%) skewX(-4deg)}78%{transform:translateX(-1%) skewX(2deg)}100%{opacity:1;transform:none}}
@keyframes tq-streak{0%{transform:scaleX(0);opacity:1}55%{transform:scaleX(1);opacity:.9}100%{transform:scaleX(1) translateX(60%);opacity:0}}
@keyframes tq-fade{from{opacity:0}to{opacity:1}}
@keyframes tq-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes tq-wipe{from{transform:scaleX(0)}to{transform:none}}
@keyframes tq-wipe-l{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}
@keyframes tq-reveal{to{clip-path:polygon(14% 0,100% 0,86% 100%,0 100%)}}
@keyframes tq-zoom{to{scale:1}}
@keyframes tq-pop{from{opacity:0;transform:scale(.6) rotate(-30deg)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.d-torque .tq-lights i+i{animation:none}.d-torque .tq-photo{clip-path:polygon(14% 0,100% 0,86% 100%,0 100%)}.d-torque .tq-photo img{scale:1}.d-torque .tq-ln::after{display:none}.d-torque .tq-needle,.d-torque .tq-open{transition:none}.d-torque .tq-stripes{transform:rotate(-14deg)}.demo-js .d-torque .tq-livery[data-rv] figure,.demo-js .d-torque .tq-shots figure[data-rv]{clip-path:none}.d-torque .tq-foot-name span{background-size:100% 100%}}
`
  .replace(/\n/g, "")
  .trim();

/** Restyles the kit's shared sections (their rules come after the family stylesheet). */
const EXTRA = `
.d-torque .z-sec h2{font-weight:900}
.d-torque .z-hours{border-top:0}
.d-torque .z-hours div{display:grid;grid-template-columns:minmax(96px,.8fr) minmax(0,1.6fr);gap:14px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)}
.d-torque .z-hours dt{font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase}
.d-torque .z-hours dd{font-family:var(--disp);font-size:20px;font-weight:800;text-align:left}
.d-torque .tq-screen .z-hours div{border-color:rgba(255,255,255,.1)}
.d-torque .tq-screen .z-hours dd{display:grid;gap:6px;color:var(--white)}
.d-torque .tq-screen .z-hours dt{color:rgba(255,255,255,.8)}
.d-torque .tq-bars{position:relative;display:block;height:10px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.08) 0 1px,transparent 1px calc(100% / 24)),rgba(255,255,255,.05)}
.d-torque .tq-bars i{position:absolute;top:0;bottom:0;left:calc(var(--a) / 1440 * 100%);width:calc((var(--b) - var(--a)) / 1440 * 100%);background:var(--yellow);transform:skewX(-14deg) scaleX(0);transform-origin:left;transition:transform .9s var(--snap);transition-delay:calc(var(--i,0) * 90ms)}
.d-torque .z-hours.in .tq-bars i,html:not(.demo-js) .d-torque .tq-bars i{transform:skewX(-14deg)}
.d-torque .z-hours div.is-today{position:relative;background:linear-gradient(90deg,rgba(255,212,0,.18),transparent 85%);box-shadow:inset 5px 0 0 var(--yellow);margin-inline:-14px;padding-inline:14px}
.d-torque .z-hours div.is-today dt{color:var(--yellow)}
.d-torque .tq-foot .z-hours div{grid-template-columns:auto auto;justify-content:space-between;padding:7px 0;border-color:var(--line-w)}
.d-torque .tq-foot .z-hours dd{font-size:18px;text-align:right;color:var(--white)}
.d-torque .tq-foot .z-hours dt{font-size:12px;color:rgba(255,255,255,.66)}
.d-torque .tq-foot .z-hours div.is-today{margin-inline:-10px;padding-inline:10px}
.d-torque .z-form .btn{margin-inline:8px;width:calc(100% - 16px)}
.d-torque .z-form .btn::before{transform:skewX(-8deg)}
.d-torque .z-reach{gap:2px;color:inherit;opacity:.85}
.d-torque .z-reach a{color:inherit;font-weight:600}
.d-torque .z-reach .z-route{display:inline-flex;gap:6px;color:inherit;font-family:var(--disp);font-size:19px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;background:linear-gradient(var(--yellow),var(--yellow)) 0 88%/100% 4px no-repeat}
.d-torque .z-field label,.d-torque .z-chipset legend{font-size:11px;font-weight:800;letter-spacing:.14em;color:var(--black)}
.d-torque .z-field input,.d-torque .z-field select,.d-torque .z-field textarea{border:0;border-bottom:3px solid var(--black);background:#f4f3ef;font-weight:500;transition:background-color .2s,border-color .2s}
.d-torque .z-field input:focus,.d-torque .z-field select:focus,.d-torque .z-field textarea:focus{border-bottom-color:var(--yellow-d);background:#fff9d6}
.d-torque .z-field :focus-visible{outline:none}
.d-torque .z-chips{gap:8px;padding-left:4px}
.d-torque .z-chips button{border:2px solid var(--black);font-family:var(--disp);font-size:20px;font-weight:800;transform:skewX(-10deg);transition:background-color .2s,color .2s,transform .3s var(--kick)}
.d-torque .z-chips button:hover{transform:skewX(-10deg) translateY(-3px)}
.d-torque .z-chips button[aria-pressed="true"]{border-color:var(--black);background:var(--yellow);color:var(--black)}
.d-torque .form-note{color:var(--dim)}
.d-torque .form-status{border:3px solid var(--black);background:var(--yellow);font-weight:700}
.d-torque .z-sec.z-cta{overflow:hidden;background:linear-gradient(90deg,var(--yellow) 0 10px,transparent 10px 14px,var(--white) 14px 17px,transparent 17px calc(100% - 17px),var(--white) calc(100% - 17px) calc(100% - 14px),transparent calc(100% - 14px) calc(100% - 10px),var(--yellow) calc(100% - 10px)),repeating-linear-gradient(-60deg,transparent 0 40px,rgba(255,255,255,.03) 40px 80px),var(--black);color:var(--white)}.d-torque .z-cta h2{font-size:clamp(48px,7vw,120px)}
.d-torque .z-cta h2 em{background:none;-webkit-text-stroke:2px var(--yellow);color:transparent}
.d-torque .z-cta .z-center>p{color:rgba(255,255,255,.72)}
.d-torque .z-cta .tq-fill::before{box-shadow:5px 5px 0 var(--white)}
.d-torque .z-statement h2{font-weight:900;line-height:.95;transform:skewX(var(--skew))}
.d-torque .z-center h2{transform-origin:50% 100%}
.d-torque .z-statement .tq-kick{order:-1}
.d-torque .z-card,.d-torque .z-panel{border:3px solid var(--black);background:var(--white);transition:transform .35s var(--kick),box-shadow .35s var(--ease)}
.d-torque .z-card:hover{transform:translate(-4px,-4px);box-shadow:8px 8px 0 var(--black)}
.d-torque .z-card h3,.d-torque .z-grid h3{font-weight:900;transform:skewX(var(--skew));transform-origin:0 100%}
.d-torque .z-pack.is-featured{border-color:var(--black);box-shadow:inset 0 10px 0 var(--yellow)}
.d-torque .z-pack.is-featured:hover{box-shadow:inset 0 10px 0 var(--yellow),8px 8px 0 var(--black)}
.d-torque .z-tag{display:inline-block;justify-self:start;padding:3px 10px;background:var(--black);color:var(--yellow);font-weight:800}
.d-torque .z-pack-price b{font-weight:900}
.d-torque .z-ticks li::before{top:.55em;width:12px;height:7px;background:var(--yellow);transform:skewX(-14deg)}
.d-torque .z-acc{border-top:3px solid var(--black)}
.d-torque .z-acc details{border-bottom:1px solid var(--line)}
.d-torque .z-acc summary{font-family:var(--disp);font-size:clamp(24px,2.2vw,32px);font-weight:800;line-height:1.05;text-transform:uppercase;transition:padding-left .3s var(--kick),color .2s}
.d-torque .z-acc summary:hover{padding-left:10px}
.d-torque .z-acc summary i{width:18px;height:18px}
.d-torque .z-acc summary i::before,.d-torque .z-acc summary i::after{height:3px}
.d-torque .z-acc details[open] summary{color:var(--black);box-shadow:inset 6px 0 0 var(--yellow);padding-left:16px}
.d-torque .z-quotes blockquote{padding:26px;border:3px solid var(--black);background:var(--white)}
.d-torque .z-quotes blockquote>p{font-family:"Archivo",sans-serif;font-size:clamp(18px,1.5vw,22px);font-weight:500}
.d-torque .z-rows small,.d-torque .z-steps small{font-family:var(--disp);font-size:24px;font-weight:900;color:var(--black)}
.d-torque .z-pic{clip-path:polygon(6% 0,100% 0,94% 100%,0 100%)}
.d-torque .z-team .z-grid>li{gap:8px}
.d-torque .z-team .z-grid>li>.tq-kick::before{display:none}
.d-torque .z-showcase.has-pic::after{background:linear-gradient(100deg,rgba(13,13,13,.9),rgba(13,13,13,.35) 70%)}
.d-torque .z-show-in h2{font-size:clamp(48px,6.4vw,104px);font-weight:900;transform:skewX(var(--skew))}
.d-torque .z-show-in h2 em{background:none;color:var(--yellow)}
.d-torque .z-showcase.has-pic .tq-line{color:#fff}
.d-torque .z-ba{clip-path:polygon(4% 0,100% 0,96% 100%,0 100%)}
.d-torque .z-ba::after{width:6px;background:var(--yellow)}
.d-torque .z-channel{border:3px solid var(--black)}
@media (max-width:620px){.d-torque .z-team .z-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 12px}.d-torque .z-team h3{font-size:24px}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * Shift lights fill with how far the page has been read; the gauge reads today's opening hours
 * from the hours on the page (marked by the shared "today" script) and points at the time now.
 */
const JS = `(function(){var d=document,root=d.querySelector('.d-torque');if(!root)return;var W=window;
var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var raf=0;function sp(){raf=0;var h=d.documentElement.scrollHeight-W.innerHeight;root.style.setProperty('--sp',h>0?Math.min(1,Math.max(0,W.scrollY/h)).toFixed(3):'0')}
W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(sp)},{passive:true});sp();
var now=new Date(),m=now.getHours()*60+now.getMinutes();try{var q={};new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Amsterdam',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).forEach(function(x){q[x.type]=x.value});m=+q.hour*60+ +q.minute}catch(e){}
var row=d.querySelector('.z-hours>div.is-today dd'),spans=[];
if(row){var t=row.textContent||'',re=/(\\d{1,2})[:.](\\d{2})\\s*(?:–|—|-|tot|to|bis|à)\\s*(\\d{1,2})[:.](\\d{2})/g,x;while((x=re.exec(t))){var s=+x[1]*60+ +x[2],e=+x[3]*60+ +x[4];if(e<=s)e=1440;spans.push([s,e])}}
[].slice.call(d.querySelectorAll('[data-gauge]')).forEach(function(g){var arcs=[].slice.call(g.querySelectorAll('.tq-open'));
spans.slice(0,arcs.length).forEach(function(s,k){arcs[k].style.strokeDasharray=((s[1]-s[0])/6).toFixed(2)+' 1000';arcs[k].style.strokeDashoffset=(-s[0]/6).toFixed(2)});
var c=g.querySelector('.tq-clock');if(c)c.textContent=('0'+Math.floor(m/60)).slice(-2)+':'+('0'+m%60).slice(-2);
setTimeout(function(){g.style.setProperty('--a',(-120+m/6).toFixed(1)+'deg')},reduce?0:1900)})})();`.replace(/\n/g, "");

const ARC = "M30.72 140A80 80 0 1 1 169.28 140";
const pt = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [+(100 + r * Math.sin(a)).toFixed(2), +(100 - r * Math.cos(a)).toFixed(2)] as const;
};

/**
 * A 24-hour dial: the yellow arc is today's opening time, the needle the time now (both filled
 * in by the script from the business's own hours). Without hours it is only a clock.
 */
function Gauge({ c, big }: { c: Ctx; big?: boolean }) {
  const ticks: ReactNode[] = [];
  const nums: ReactNode[] = [];
  for (let h = 0; h <= 24; h++) {
    const deg = -120 + h * 10;
    const major = h % 3 === 0;
    const [x1, y1] = pt(deg, major ? 70 : 75);
    const [x2, y2] = pt(deg, 84);
    ticks.push(<line key={h} x1={x1} y1={y1} x2={x2} y2={y2} className={major ? "is-major" : undefined} />);
    if (major) {
      const [tx, ty] = pt(deg, 58);
      nums.push(
        <text key={h} x={tx} y={ty}>
          {h}
        </text>,
      );
    }
  }
  return (
    <div className={`tq-gauge${big ? " is-big" : ""}`} data-gauge>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <circle className="tq-g-face" cx="100" cy="100" r="98" />
        <circle className="tq-g-bezel" cx="100" cy="100" r="92" />
        <path className="tq-g-track" d={ARC} pathLength={240} />
        <path className="tq-open" d={ARC} pathLength={240} />
        <path className="tq-open" d={ARC} pathLength={240} />
        <g className="tq-g-ticks">{ticks}</g>
        <g className="tq-g-nums">{nums}</g>
        <text className="tq-g-unit" x="100" y="72">
          24H
        </text>
        <text className="tq-clock" x="100" y="146" />
        <g className="tq-needle">
          <path d="M97 100 100 24l3 76Z" />
          <circle cx="100" cy="100" r="9" />
        </g>
      </svg>
      <NowBadge c={c} className="tq-now" />
    </div>
  );
}

/** Five pods of the start gantry: the lower lamps light one by one, then all go out. */
const Lights = () => (
  <div className="tq-lights" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((k) => (
      <span key={k}>
        <i />
        <i style={i(k)} />
      </span>
    ))}
  </div>
);

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" aria-hidden="true">
    <path d="M3 10h13M11 4.5l5.5 5.5-5.5 5.5" />
  </svg>
);

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="tq-kick" data-rv>
    {children}
  </p>
);

function Head({ kicker, title, intro, id, row }: { kicker?: string; title: string; intro?: string; id?: string; row?: boolean }) {
  return (
    <header className={`tq-head${row && intro ? " is-row" : ""}`}>
      {kicker ? <Kick>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

/** "10:00 – 22:00" as minutes, for the bars of the timing screen; null when it is not a time span. */
function spansOf(time: string): [number, number][] {
  const out: [number, number][] = [];
  const re = /(\d{1,2})[:.](\d{2})\s*(?:–|—|-|tot|to|bis|à)\s*(\d{1,2})[:.](\d{2})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(time))) {
    const a = +m[1] * 60 + +m[2];
    let b = +m[3] * 60 + +m[4];
    if (b <= a) b = 1440;
    out.push([a, b]);
  }
  return out;
}

/** The opening hours as a timing screen: one row per day, with its open time as a bar on 24 hours. */
function Timing({ c }: { c: Ctx }) {
  const lines = c.spec.business.openingHours;
  if (!lines?.length) return <p className="tq-plain-hours">{c.t.hoursTbc}</p>;
  return (
    <>
      <div className="tq-axis" aria-hidden="true">
        <span />
        <span>
          <b>0</b>
          <b>6</b>
          <b>12</b>
          <b>18</b>
          <b>24</b>
        </span>
      </div>
      <dl className="z-hours" data-rv>
        {hoursRows(lines).map(([day, time], n) => (
          <div key={n}>
            <dt>{day}</dt>
            <dd>
              <span>{time}</span>
              <span className="tq-bars" aria-hidden="true">
                {spansOf(time).map(([a, b], k) => (
                  <i key={k} style={{ ["--a" as string]: a, ["--b" as string]: b, ["--i" as string]: n }} />
                ))}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="tq-hdr hdr">
        <div className="tq-wrap tq-bar">
          <a href="#top" className="tq-logo" aria-label={c.name}>
            <i aria-hidden="true">{c.name.charAt(0)}</i>
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="tq-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn tq-fill tq-cta">
            {cta.label}
          </a>
          <button type="button" className="tq-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
        <div className="tq-shift" aria-hidden="true">
          {Array.from({ length: 15 }, (_, k) => (
            <i key={k} style={{ ["--k" as string]: k }} />
          ))}
        </div>
      </header>
      <div id="site-menu" className="tq-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{String(k + 1).padStart(2, "0")}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <p>
          {b.address ?? b.city}
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
        </p>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 40 ? "is-s" : plain.length > 22 ? "is-m" : undefined;
  const { lines } = splitLines(hero.headline, plain.length > 26 ? 3 : 2);
  const facts = heroFacts(c);
  return (
    <section className="tq-hero">
      <div className="tq-stripes" data-px aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="tq-wrap tq-hero-grid">
        <div className="tq-hero-copy">
          <div className="tq-start">
            <Lights />
            {hero.eyebrow ? <p className="tq-kick">{hero.eyebrow}</p> : null}
          </div>
          <h1 className={size}>
            <span className="tq-sr">{plain}</span>
            {lines.map((line, n) => (
              <span className="tq-ln" key={n} style={i(n)} aria-hidden="true">
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="tq-lede">{hero.subheadline}</p>
          <div className="tq-cta-row">
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label} <Arrow />
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
          {facts.length > 0 && (
            <dl className="tq-tele">
              {facts.map((f, n) => (
                <div key={f.label} style={i(n)}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {p ? (
          <div className="tq-art">
            <figure className="tq-photo">
              <Pic p={p} eager sizes="(min-width: 1000px) 46vw, 94vw" />
            </figure>
            <Gauge c={c} />
          </div>
        ) : (
          <div className="tq-art is-plain">
            <Gauge c={c} big />
            <span className="tq-plate" aria-hidden="true">
              <b>{c.name.charAt(0)}</b>
            </span>
          </div>
        )}
      </div>
      <div className="tq-checker" aria-hidden="true" />
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  return (
    <footer className="tq-foot">
      <div className="tq-checker" aria-hidden="true" />
      <div className="tq-wrap">
        <p className="tq-foot-name" aria-hidden="true" data-rv style={{ ["--n" as string]: Math.max(6, c.name.length) }}>
          <span>{c.name}</span>
        </p>
        <div className="tq-foot-grid">
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
                {c.t.route} →
              </a>
            ) : null}
          </div>
          {b.openingHours?.length ? (
            <div>
              <h3>{c.t.hours}</h3>
              <Hours c={c} />
            </div>
          ) : null}
          {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
        </div>
        <Legal c={c} className="tq-legal" />
      </div>
    </footer>
  );
}

const ext = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

export const torque: Family = {
  key: "torque",
  root: "d-torque",
  fonts: ["Big Shoulders Display", "Archivo"],
  themeColor: "#0d0d0d",
  accent: "#ffd400",
  onAccent: "#0d0d0d",
  css: CSS,
  extra: EXTRA,
  js: TODAY_JS + JS,
  cls: { wrap: "tq-wrap", eyebrow: "tq-kick", btn: "tq-fill", btnAlt: "tq-line", btnText: "tq-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    services: (s, c) => (
      <section className="tq-sec" id={s.id}>
        <div className="tq-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} row />
          <div className="tq-board" data-rv>
            <div className="tq-board-in">
              <div className="tq-board-top" aria-hidden="true">
                <b>{c.name}</b>
                {c.spec.business.city ? <span>{c.spec.business.city}</span> : <span />}
              </div>
              <ol className="tq-pit">
                {s.items.map((it, n) => (
                  <li key={n} data-rv style={i(n % 6)}>
                    <span className="tq-pit-n">{String(n + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{it.title}</h3>
                      <p>{it.description}</p>
                    </div>
                    {it.price || it.duration ? (
                      <p className="tq-pit-meta">
                        {it.duration ? <span>{it.duration}</span> : null}
                        {it.price ? <b>{it.price}</b> : null}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="tq-pit-ico" aria-hidden="true">
                      <Icon name={it.icon} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    ),
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="tq-sec" id={s.id}>
          <div className="tq-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} row />
            <div className="tq-menu-boards">
              {cats.map((cat, n) => (
                <div key={n} className="tq-board" data-rv style={i(n % 3)}>
                  <div className="tq-board-in">
                    <div className="tq-board-top">
                      <b>{cat.name}</b>
                      <span aria-hidden="true" />
                    </div>
                    <ul>
                      {cat.items.map((d, m) => (
                        <li key={m} className="tq-dish">
                          <b>{d.name}</b>
                          {d.price ? <span>{d.price}</span> : <span />}
                          {d.description ? <p>{d.description}</p> : null}
                          {d.tags?.length ? <small>{d.tags.join(" · ")}</small> : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            {s.note ? (
              <p className="tq-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="tq-sec is-white" id={s.id}>
          <div className="tq-wrap tq-about">
            {p ? (
              <div className="tq-livery" data-rv>
                <figure data-px>
                  <Pic p={p} sizes="(min-width: 960px) 42vw, 92vw" />
                </figure>
                {c.spec.business.city ? (
                  <span className="tq-tag" aria-hidden="true">
                    {c.spec.business.city}
                  </span>
                ) : null}
              </div>
            ) : (
              <div className="tq-roundel" data-rv aria-hidden="true">
                <span className="tq-plate">
                  <b>{c.name.charAt(0)}</b>
                </span>
              </div>
            )}
            <div className="tq-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="tq-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="tq-chips" data-rv>
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
      );
    },
    features: (s, c) => (
      <section className="tq-sec is-yellow tq-slant" id={s.id}>
        <div className="tq-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} row />
          <ul className="tq-cards">
            {s.items.map((it, n) => (
              <li key={n} className="tq-card" data-rv style={i(n % 3)}>
                <span className="tq-ico" aria-hidden="true">
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
    process: (s, c) => (
      <section className="tq-sec is-black tq-slant" id={s.id}>
        <div className="tq-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} row />
          <div className="tq-lap" data-px>
            <span className="tq-road" aria-hidden="true">
              <i />
              <b />
            </span>
            <span className="tq-flag" aria-hidden="true" />
            <ol className="tq-steps">
              {s.steps.map((st, n) => (
                <li key={n} className="tq-step" data-rv style={i(n)}>
                  <small>{String(n + 1).padStart(2, "0")}</small>
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
      return (
        <section className="tq-sec" id={s.id}>
          <div className="tq-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className="tq-shots">
              {pics.slice(0, 6).map((p, n) => (
                <figure key={n} data-rv style={i(n % 3)}>
                  <Pic p={p} sizes={n === 0 ? "(min-width: 900px) 62vw, 94vw" : "(min-width: 900px) 30vw, 46vw"} />
                  <figcaption aria-hidden="true">{String(n + 1).padStart(2, "0")}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="tq-sec is-black tq-slant" id={s.id}>
        <div className="tq-wrap tq-pits">
          <div className="tq-pits-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="tq-screen" data-rv>
            <div className="tq-screen-top">
              <h3>{c.t.hours}</h3>
              <NowBadge c={c} className="tq-now" />
            </div>
            <Timing c={c} />
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => {
      const b = c.spec.business;
      return (
        <section className="tq-sec is-black tq-slant" id={s.id}>
          <div className="tq-wrap tq-pits">
            <div className="tq-pits-copy">
              <Head kicker={c.t.kick.contact} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              {b.phone ? (
                <div className="tq-dial" data-rv>
                  <span>{c.t.call}</span>
                  <a href={tel(b.phone)}>{b.phone}</a>
                </div>
              ) : null}
              {/* The phone number is already on the dial: the rest of the address card. */}
              {b.address || b.email || b.mapsUrl ? (
                <address className="z-reach" data-rv>
                  {b.address ? <span>{b.address}</span> : null}
                  {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
                  {b.mapsUrl ? (
                    <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="z-route">
                      {c.t.route} →
                    </a>
                  ) : null}
                </address>
              ) : null}
              {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
            </div>
            {s.showForm ? (
              <div className="tq-form" data-rv>
                <p className="tq-form-h">{c.t.message}</p>
                <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
              </div>
            ) : (
              <div className="tq-art is-plain" data-rv>
                <Gauge c={c} big />
              </div>
            )}
          </div>
        </section>
      );
    },
    booking: (s, c) => (
      <section className="tq-sec is-white" id={s.id}>
        <div className="tq-wrap tq-pits">
          <div className="tq-pits-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
          </div>
          <div className="tq-form" data-rv>
            <p className="tq-form-h">{c.t.submit[s.kind]}</p>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
          </div>
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="tq-sec is-white" id={s.id}>
        <div className="tq-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} row />
          <ul className="tq-orders">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 4)}>
                <a href={ch.href} {...ext(ch.href)}>
                  <span className="tq-ico" aria-hidden="true">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <span className="tq-go" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
  },
};
