import type { ReactNode } from "react";
import { NowBadge, TODAY_JS } from "./today";
import { Btn, css, DemoForm, em, heroFacts, hoursRows, i, Icon, Legal, long, offerWords, Pic, splitLines, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Pulse: an original template (no portfolio demo). High-energy and light: white with electric
 * cobalt and hot coral, a tall condensed headline and a sharp grotesk. The headline's lines
 * slam in from alternate sides while a cobalt slab cuts in diagonally with the photograph;
 * a band of the business's own classes runs faster when you scroll; an energy bar fills along
 * the top as you read; class cards tilt toward the pointer; sections are cut on the diagonal;
 * the process climbs like a staircase and the opening hours are drawn as bars across the day.
 * Made for gyms, boxing and dance studios, personal trainers, yoga and other sport.
 */

const CSS = `
.d-pulse{--white:#ffffff;--paper:#f3f5ff;--mist:#e3e8ff;--ink:#0b1030;--ink-2:#1d2452;--dim:#545b7c;--cobalt:#2347ff;--cobalt-d:#1530d8;--cobalt-l:#6b83ff;--coral:#ff5a4e;--coral-d:#e8443a;--coral-l:#ffe1dd;--line:rgba(11,16,48,.12);--pad:clamp(18px,4.4vw,64px);--cut:clamp(28px,5vw,84px);--ease:cubic-bezier(.2,.8,.2,1);--snap:cubic-bezier(.34,1.5,.5,1);--bebas:"Bebas Neue","Arial Narrow",Impact,sans-serif;--z-bg2:var(--paper);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--cobalt);--z-on-accent:#fff;--z-display:var(--bebas);--z-display-weight:400;--z-radius:18px;--z-field-radius:12px;--z-ico-radius:12px;--z-sec:clamp(80px,10vw,150px);--z-h3:clamp(26px,2.2vw,34px);--z-statement:clamp(44px,6.4vw,104px);background:var(--white);color:var(--ink);font-family:"Archivo",system-ui,sans-serif;font-size:clamp(16px,1.04vw,17.5px);line-height:1.6}
.d-pulse h1,.d-pulse h2,.d-pulse h3{font-family:var(--bebas);font-weight:400;line-height:.92;letter-spacing:.012em;text-transform:uppercase}
.d-pulse h2{font-size:clamp(54px,7.4vw,118px)}
.d-pulse h2.is-long{font-size:clamp(42px,5.2vw,82px);line-height:.95}
.d-pulse h3{font-size:var(--z-h3);line-height:1}
.d-pulse h1 em,.d-pulse h2 em{font-style:normal;color:var(--cobalt)}
.d-pulse ::selection{background:var(--coral);color:#fff}
.d-pulse .pu-wrap{position:relative;width:min(100%,1320px);margin-inline:auto;padding-inline:var(--pad)}
.d-pulse .pu-kick{display:inline-flex;align-items:center;gap:10px;justify-self:start;padding:7px 18px 7px 14px;background:var(--cobalt);color:#fff;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)}
.d-pulse .pu-kick b{display:flex;align-items:flex-end;gap:2px;height:11px}
.d-pulse .pu-kick b i{width:3px;background:currentColor}
.d-pulse .pu-kick b i:nth-child(1){height:40%}.d-pulse .pu-kick b i:nth-child(2){height:100%}.d-pulse .pu-kick b i:nth-child(3){height:65%}
.d-pulse .is-cobalt .pu-kick,.d-pulse .pu-foot .pu-kick{background:var(--coral)}
.demo-js .d-pulse .pu-kick[data-rv]{transform:translateX(-28px) skewX(-14deg);transition:opacity .4s,transform .6s var(--snap)}
.demo-js .d-pulse .pu-kick[data-rv].in{transform:none}
.d-pulse .pu-head{position:relative;display:grid;gap:18px;max-width:900px;margin-bottom:clamp(40px,5vw,72px)}
.d-pulse .pu-head>p:last-child:not(.pu-kick){max-width:56ch;font-size:1.08em;color:var(--dim)}
.d-pulse .is-cobalt .pu-head>p:last-child:not(.pu-kick){color:rgba(255,255,255,.82)}
.demo-js .d-pulse .pu-head h2[data-rv]{transform:translateX(-40px) skewX(-10deg);transition:opacity .6s,transform .9s var(--snap)}
.demo-js .d-pulse .pu-head h2[data-rv].in{transform:none}
.d-pulse .pu-big{position:absolute;right:0;top:50%;z-index:-1;font-family:var(--bebas);font-size:clamp(150px,22vw,330px);line-height:.8;color:transparent;-webkit-text-stroke:2px rgba(35,71,255,.16);translate:0 calc(-50% + var(--p,0) * 40px);pointer-events:none;user-select:none}
.d-pulse .is-cobalt .pu-big{-webkit-text-stroke-color:rgba(255,255,255,.2)}
.d-pulse .pu-sec{position:relative;padding-block:var(--z-sec);isolation:isolate}
.d-pulse .pu-sec.is-paper{background:var(--paper)}
.d-pulse .pu-sec.is-cobalt{background:var(--cobalt);color:#fff}
.d-pulse .pu-sec.is-cobalt h2 em{color:var(--ink)}
.d-pulse .pu-sec.is-ink{background:var(--ink)}
.d-pulse .pu-sec.is-ink h2 em{color:var(--coral)}
.d-pulse .pu-sec.is-ink::before{content:"";position:absolute;inset:0;z-index:-1;background:repeating-linear-gradient(-62deg,transparent 0 40px,rgba(255,255,255,.035) 40px 43px)}
.d-pulse p.pu-kick{color:#fff}
.d-pulse .pu-cut{z-index:1;margin-block:calc(var(--cut) * -1);padding-block:calc(var(--z-sec) + var(--cut));clip-path:polygon(0 var(--cut),100% 0,100% calc(100% - var(--cut)),0 100%)}
.d-pulse .pu-cut.is-rev{clip-path:polygon(0 0,100% var(--cut),100% 100%,0 calc(100% - var(--cut)))}
.d-pulse .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:56px;padding:0 30px;border:0;background:none;font-family:"Archivo",sans-serif;font-size:15px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;isolation:isolate;transition:color .25s,transform .25s var(--snap)}
.d-pulse .btn::before,.d-pulse .btn::after{content:"";position:absolute;inset:0;z-index:-1;border-radius:6px;transform:skewX(-10deg)}
.d-pulse .btn::after{transform:skewX(-10deg) scaleX(0);transform-origin:0 50%;transition:transform .4s var(--ease)}
.d-pulse .btn:hover::after{transform:skewX(-10deg) scaleX(1)}
.d-pulse .btn:active{transform:scale(.96)}
.d-pulse .btn svg{width:18px;height:18px;transition:transform .3s var(--snap)}
.d-pulse .btn:hover svg{transform:translateX(5px)}
.d-pulse .pu-fill{color:#fff}
.d-pulse .pu-fill::before{background:var(--coral);box-shadow:0 14px 30px -14px rgba(255,90,78,.8)}
.d-pulse .pu-fill::after{background:var(--cobalt)}
.d-pulse .is-cobalt .pu-fill::after,.d-pulse .z-cta .pu-fill::after,.d-pulse .pu-foot .pu-fill::after{background:var(--ink)}
.d-pulse .pu-ghost{color:var(--ink)}
.d-pulse .pu-ghost::before{border:2px solid var(--ink)}
.d-pulse .pu-ghost::after{background:var(--ink)}
.d-pulse .pu-ghost:hover{color:#fff}
.d-pulse .is-cobalt .pu-ghost,.d-pulse .z-showcase.has-pic .pu-ghost,.d-pulse .z-cta .pu-ghost{color:#fff}
.d-pulse .is-cobalt .pu-ghost::before,.d-pulse .z-showcase.has-pic .pu-ghost::before,.d-pulse .z-cta .pu-ghost::before{border-color:#fff}
.d-pulse .is-cobalt .pu-ghost::after,.d-pulse .z-showcase.has-pic .pu-ghost::after,.d-pulse .z-cta .pu-ghost::after{background:#fff}
.d-pulse .is-cobalt .pu-ghost:hover,.d-pulse .z-showcase.has-pic .pu-ghost:hover,.d-pulse .z-cta .pu-ghost:hover{color:var(--cobalt)}
.d-pulse .pu-text{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:800;font-size:15px;letter-spacing:.04em;text-transform:uppercase;background:linear-gradient(var(--coral),var(--coral)) 0 86%/100% 4px no-repeat;transition:background-size .3s var(--ease),color .2s}
.d-pulse .pu-text:hover{background-size:100% 40%}
.d-pulse .pu-hdr{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.88);backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4);transition:box-shadow .3s}
.d-pulse.is-scrolled .pu-hdr{box-shadow:0 10px 30px -20px rgba(11,16,48,.5)}
.d-pulse.menu-open .pu-hdr{background:#fff}
.d-pulse .pu-bar{display:flex;align-items:center;gap:20px;height:76px;transition:height .3s var(--ease)}
.d-pulse.is-scrolled .pu-bar{height:64px}
.d-pulse .pu-energy{position:absolute;left:0;right:0;bottom:0;height:4px;background:var(--mist);overflow:hidden}
.d-pulse .pu-energy i{position:absolute;inset:0;background:linear-gradient(90deg,var(--cobalt),var(--coral));transform:scaleX(var(--sp,0));transform-origin:0 50%}
.d-pulse .pu-energy i::after{content:"";position:absolute;right:0;top:0;bottom:0;width:40px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.8))}
.d-pulse .pu-logo{display:flex;align-items:center;gap:12px;min-width:0;font-family:var(--bebas);font-size:clamp(24px,2.2vw,30px);line-height:1;letter-spacing:.02em}
.d-pulse .pu-logo i{display:grid;flex:none;place-items:center;width:44px;height:40px;background:var(--cobalt);color:#fff;font-style:normal;font-size:26px;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);transition:background-color .2s,transform .4s var(--snap)}
.d-pulse .pu-logo:hover i{background:var(--coral);transform:skewX(-8deg)}
.d-pulse .pu-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-pulse .pu-links{display:none;gap:4px;margin-left:auto;font-size:14px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
.d-pulse .pu-links a{position:relative;display:inline-flex;align-items:center;min-height:44px;padding:0 14px}
.d-pulse .pu-links a::after{content:"";position:absolute;left:14px;right:14px;bottom:8px;height:3px;background:var(--coral);transform:skewX(-20deg) scaleX(0);transform-origin:0 50%;transition:transform .3s var(--ease)}
.d-pulse .pu-links a:hover::after{transform:skewX(-20deg) scaleX(1)}
.d-pulse .pu-cta{display:none;min-height:48px;padding:0 22px;font-size:13.5px}
.d-pulse .pu-burger{position:relative;z-index:41;display:grid;place-items:center;flex:none;width:50px;height:46px;margin-left:auto;padding:0;border:0;background:var(--cobalt);color:#fff;clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);transition:background-color .2s}
.d-pulse .pu-burger:hover{background:var(--coral)}
.d-pulse .pu-burger i{position:relative;width:20px;height:3px;background:currentColor;transform:translateY(-4px);transition:transform .35s var(--snap)}
.d-pulse .pu-burger i::after{content:"";position:absolute;left:4px;top:8px;width:16px;height:3px;background:currentColor;transition:transform .35s var(--snap),left .35s var(--snap),width .35s}
.d-pulse.menu-open .pu-burger{background:var(--coral)}
.d-pulse.menu-open .pu-burger i{transform:rotate(45deg)}
.d-pulse.menu-open .pu-burger i::after{left:0;width:20px;transform:translateY(-8px) rotate(-90deg)}
.d-pulse .pu-burger .pu-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (min-width:1040px){.d-pulse .pu-links,.d-pulse .pu-cta{display:inline-flex}.d-pulse .pu-burger{display:none}}
.d-pulse .pu-menu{position:fixed;inset:0;z-index:39;display:flex;flex-direction:column;justify-content:space-between;gap:28px;padding:104px var(--pad) 110px;background:var(--cobalt);color:#fff;overflow-y:auto;clip-path:polygon(100% 0,100% 0,100% 0,100% 0);visibility:hidden;transition:clip-path .6s var(--ease),visibility 0s .6s}
.d-pulse .pu-menu.is-open{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);visibility:visible;transition:clip-path .6s var(--ease)}
.d-pulse .pu-menu nav{display:grid;gap:2px}
.d-pulse .pu-menu nav a{display:flex;align-items:center;gap:16px;min-height:60px;font-family:var(--bebas);font-size:clamp(46px,13vw,84px);line-height:1;opacity:0;transform:translateX(60px) skewX(-12deg);transition:opacity .35s,transform .55s var(--snap),color .2s}
.d-pulse .pu-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.15s + var(--i,0) * 55ms)}
.d-pulse .pu-menu nav a small{font-size:.5em;color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.7)}
.d-pulse .pu-menu nav a:hover{color:var(--coral);transform:translateX(10px);transition-delay:0s}
.d-pulse .pu-menu-foot{display:grid;gap:4px;font-weight:600}
.d-pulse .pu-menu-foot a{display:inline-flex;align-items:center;min-height:44px;font-family:var(--bebas);font-size:34px;font-weight:400}
.d-pulse .pu-hero{position:relative;padding:clamp(28px,4vw,56px) 0 clamp(96px,11vw,170px);overflow:hidden;isolation:isolate}
.d-pulse .pu-slab{position:absolute;right:0;bottom:0;z-index:-1;width:100%;height:44%;background:var(--cobalt);clip-path:polygon(0 22%,100% 0,100% 100%,0 100%);animation:pu-slab-m 1s var(--ease) .05s both}
@media (min-width:980px){.d-pulse .pu-slab{top:0;height:auto;width:42%;clip-path:polygon(34% 0,100% 0,100% 100%,0 100%);animation-name:pu-slab}}
.d-pulse .pu-slab::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(-62deg,transparent 0 22px,rgba(255,255,255,.08) 22px 24px)}
.d-pulse .pu-ghost-name{position:absolute;left:0;bottom:-.14em;z-index:-1;display:flex;gap:.3em;font-family:var(--bebas);font-size:clamp(120px,21vw,340px);line-height:.8;white-space:nowrap;color:transparent;-webkit-text-stroke:2px rgba(35,71,255,.14);translate:calc(var(--p,0) * 12%) 0;pointer-events:none;user-select:none}
.d-pulse .pu-hero-grid{display:grid;gap:clamp(40px,5vw,72px);align-items:center}
@media (min-width:980px){.d-pulse .pu-hero-grid{grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);min-height:calc(100svh - 190px)}}
.d-pulse .pu-chip{display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;margin-bottom:22px;animation:pu-up .6s var(--ease) .15s both}
.d-pulse .pu-chip .pu-kick{animation:none}
.d-pulse .pu-hero h1{font-size:clamp(66px,9.4vw,160px);line-height:.86}
.d-pulse .pu-hero h1.is-m{font-size:clamp(58px,7.6vw,128px)}
.d-pulse .pu-hero h1.is-s{font-size:clamp(46px,5.8vw,96px);line-height:.9}
.d-pulse .pu-ln{display:block}
.d-pulse .pu-ln>span{display:inline-block;--from:-90px;animation:pu-slam .85s var(--snap) both;animation-delay:calc(.25s + var(--i,0) * 120ms)}
.d-pulse .pu-ln:nth-child(even)>span{--from:90px}
.d-pulse .pu-hero h1:not(.is-marked) .pu-ln:last-child>span{color:var(--cobalt)}
.d-pulse .pu-hero h1 em{color:var(--ink);padding:0 .08em;margin:0 -.04em;background:linear-gradient(var(--coral),var(--coral)) 0 60%/0 82% no-repeat;-webkit-box-decoration-break:clone;box-decoration-break:clone;animation:pu-mark .6s var(--ease) 1s forwards}
.d-pulse .pu-lede{max-width:46ch;margin-top:28px;font-size:clamp(17px,1.3vw,20px);color:var(--dim)}
.d-pulse .pu-up{animation:pu-up .7s var(--ease) both;animation-delay:calc(.75s + var(--i,0) * 90ms)}
.d-pulse .pu-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px 24px;margin-top:34px}
.d-pulse .pu-facts{display:grid;gap:14px 28px;margin-top:44px;grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr))}
.d-pulse .pu-facts div{display:grid;gap:4px;padding-top:12px;border-top:3px solid var(--ink)}
.d-pulse .pu-facts div:nth-child(2){border-color:var(--cobalt)}.d-pulse .pu-facts div:nth-child(3){border-color:var(--coral)}
.d-pulse .pu-facts dt{font-size:11.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--dim)}
.d-pulse .pu-facts dd{margin:0;font-weight:600;line-height:1.35}
.d-pulse .pu-facts a{display:inline-flex;align-items:center;min-height:32px}
.d-pulse .pu-art{position:relative;justify-self:center;width:min(100%,520px)}
.d-pulse .pu-shot{position:relative;aspect-ratio:4/5;overflow:hidden;clip-path:polygon(14% 0,100% 0,86% 100%,0 100%);animation:pu-wipe 1.1s var(--ease) .35s both}
.d-pulse .pu-shot img{width:100%;height:100%;object-fit:cover;animation:pu-zoom 1.8s var(--ease) .35s both}
.d-pulse .pu-art::before{content:"";position:absolute;inset:0;background:var(--coral);clip-path:polygon(14% 0,100% 0,86% 100%,0 100%);transform:translate(22px,22px);animation:pu-wipe 1.1s var(--ease) .55s both}
.d-pulse .pu-tag{position:absolute;left:-6px;bottom:12%;z-index:2;display:grid;gap:2px;padding:14px 22px 14px 18px;background:var(--ink);color:#fff;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);animation:pu-pop .6s var(--snap) 1.1s both}
.d-pulse .pu-tag small{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--coral)}
.d-pulse .pu-tag b{font-family:var(--bebas);font-size:30px;font-weight:400;line-height:1}
.d-pulse .pu-board{position:relative;display:grid;align-content:center;gap:4px;aspect-ratio:4/5;padding:clamp(28px,4vw,56px) clamp(28px,4vw,56px) clamp(28px,4vw,56px) 18%;background:var(--ink);color:#fff;clip-path:polygon(14% 0,100% 0,86% 100%,0 100%);overflow:hidden;animation:pu-wipe 1.1s var(--ease) .35s both}
.d-pulse .pu-board>span{position:absolute;right:-6%;bottom:-12%;font-family:var(--bebas);font-size:clamp(240px,30vw,440px);line-height:.8;color:transparent;-webkit-text-stroke:2px rgba(255,255,255,.18)}
.d-pulse .pu-board li{position:relative;font-family:var(--bebas);font-size:clamp(40px,4.6vw,72px);line-height:.95;animation:pu-slam .8s var(--snap) both;animation-delay:calc(.8s + var(--i,0) * 110ms);--from:70px}
.d-pulse .pu-board li:nth-child(even){color:transparent;-webkit-text-stroke:1.5px #fff}
.d-pulse .pu-board li:nth-child(3n){color:var(--coral);-webkit-text-stroke:0}
.d-pulse .pu-now{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border:2px solid currentColor;border-radius:999px;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;vertical-align:middle}
.d-pulse .pu-now::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor}
.d-pulse .pu-now.is-open{color:#0e9f6e}
.d-pulse .pu-now.is-closed{color:var(--coral-d)}
.d-pulse .is-cobalt .pu-now.is-open{color:#8ef0c4}
.d-pulse .is-cobalt .pu-now.is-closed{color:#ffd0cb}
.d-pulse .pu-band{position:relative;z-index:2;margin-top:calc(var(--cut) * -.6);padding-block:18px;overflow:hidden;pointer-events:none}
.d-pulse .pu-band>div{display:flex;width:max-content;transform:rotate(-2.2deg);background:var(--ink);color:#fff;box-shadow:0 20px 40px -24px rgba(11,16,48,.6)}
.d-pulse .pu-band>div+div{margin-top:-8px;transform:rotate(1.6deg);background:var(--coral);color:var(--ink)}
.d-pulse .pu-run{display:flex;will-change:transform}
.d-pulse .pu-run p{display:flex;flex:none;align-items:center;gap:28px;padding:12px 14px;font-family:var(--bebas);font-size:clamp(30px,3.4vw,52px);line-height:1;white-space:nowrap}
.d-pulse .pu-run span{display:inline-flex;align-items:center;gap:28px}
.d-pulse .pu-run span:nth-child(even){color:transparent;-webkit-text-stroke:1.5px currentColor}
.d-pulse .pu-band>div:first-child .pu-run span:nth-child(even){-webkit-text-stroke-color:#fff}
.d-pulse .pu-run span::after{content:"";width:.5em;height:.5em;background:var(--cobalt);clip-path:polygon(40% 0,100% 0,60% 100%,0 100%)}
.d-pulse .pu-band>div+div .pu-run span::after{background:#fff}
.d-pulse .pu-about{display:grid;gap:clamp(48px,6vw,96px);align-items:center}
@media (min-width:960px){.d-pulse .pu-about{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)}.d-pulse .pu-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:900px}}
.d-pulse .pu-about-art{position:relative;margin:0 26px 26px 0}
.d-pulse .pu-about-art::before{content:"";position:absolute;inset:26px -26px -26px 26px;background:var(--cobalt);clip-path:polygon(10% 0,100% 0,90% 100%,0 100%)}
.d-pulse .pu-about-art>figure:first-child{position:relative;aspect-ratio:4/5;overflow:hidden;clip-path:polygon(10% 0,100% 0,90% 100%,0 100%)}
.d-pulse .pu-about-art>figure:first-child img{width:100%;height:112%;margin-top:-6%;object-fit:cover;transform:translateY(calc(var(--p,0) * -5%))}
.d-pulse .pu-about-art .pu-sq{position:absolute;right:-30px;top:-34px;z-index:2;width:38%;aspect-ratio:1;overflow:hidden;border:6px solid #fff;border-radius:18px;box-shadow:0 24px 40px -20px rgba(11,16,48,.5);transform:rotate(4deg);transition:transform .5s var(--snap)}
.d-pulse .pu-about-art:hover .pu-sq{transform:rotate(-2deg) scale(1.05)}
.d-pulse .pu-about-art .pu-sq img{width:100%;height:100%;object-fit:cover}
@media (max-width:620px){.d-pulse .pu-about-art .pu-sq{right:-12px;width:42%}}
.d-pulse .pu-stack{position:relative;display:grid;gap:6px;padding:clamp(28px,4vw,52px);background:var(--cobalt);color:#fff;border-radius:22px;overflow:hidden}
.d-pulse .pu-stack>small{margin-bottom:10px;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--coral-l)}
.d-pulse .pu-stack li{display:flex;align-items:center;gap:14px;font-family:var(--bebas);font-size:clamp(36px,4vw,60px);line-height:1}
.d-pulse .pu-stack li svg{flex:none;width:28px;height:28px;padding:5px;border-radius:8px;background:var(--coral);color:#fff}
.d-pulse .pu-stack::after{content:"";position:absolute;right:-40px;bottom:-40px;width:200px;height:200px;background:repeating-linear-gradient(-62deg,transparent 0 14px,rgba(255,255,255,.12) 14px 16px);border-radius:50%}
.d-pulse .pu-about-copy{display:grid;gap:20px}
.d-pulse .pu-lead{font-size:clamp(20px,1.7vw,26px);font-weight:500;line-height:1.4;color:var(--ink)}
.d-pulse .pu-about-copy>p:not(.pu-lead){color:var(--dim)}
.d-pulse .pu-checks{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}
.d-pulse .pu-checks li{display:inline-flex;align-items:center;gap:8px;padding:10px 16px 10px 12px;border-radius:999px;background:var(--paper);font-weight:700;font-size:15px;transition:background-color .25s,color .25s,transform .3s var(--snap)}
.d-pulse .pu-checks li:hover{background:var(--cobalt);color:#fff;transform:translateY(-3px)}
.d-pulse .pu-checks svg{width:18px;height:18px;padding:3px;border-radius:50%;background:var(--cobalt);color:#fff}
.d-pulse .pu-checks li:hover svg{background:var(--coral)}
.d-pulse .pu-classes{display:grid;gap:clamp(18px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));perspective:1100px}
.d-pulse .pu-card{position:relative;display:flex;flex-direction:column;height:100%;border-radius:22px;background:#fff;color:var(--ink);box-shadow:0 1px 0 var(--line),0 24px 50px -30px rgba(11,16,48,.45);overflow:hidden;transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transform-style:preserve-3d;transition:transform .5s var(--ease),box-shadow .4s}
.d-pulse .pu-card.is-live{transition:transform .08s linear,box-shadow .4s}
.d-pulse .pu-card:hover{box-shadow:0 1px 0 var(--line),0 36px 60px -30px rgba(35,71,255,.55)}
.d-pulse .pu-card::after{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(circle at var(--gx,50%) var(--gy,0%),rgba(255,255,255,.55),transparent 45%);opacity:0;transition:opacity .4s;pointer-events:none}
.d-pulse .pu-card:hover::after{opacity:1}
.d-pulse .pu-card-top{position:relative;display:flex;align-items:flex-end;justify-content:space-between;min-height:150px;padding:20px 22px;background:var(--cobalt);color:#fff;overflow:hidden}
.d-pulse .pu-classes>li:nth-child(3n+2) .pu-card-top{background:var(--coral)}
.d-pulse .pu-classes>li:nth-child(3n+3) .pu-card-top{background:var(--ink)}
.d-pulse .pu-card-top.has-pic{min-height:0;aspect-ratio:16/10;align-items:flex-end}
.d-pulse .pu-card-top img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.15);transition:transform .8s var(--ease),filter .5s}
.d-pulse .pu-card-top.has-pic::before{content:"";position:absolute;inset:0;z-index:1;background:inherit;mix-blend-mode:multiply;opacity:.9;transition:opacity .5s}
.d-pulse .pu-card:hover .pu-card-top img{transform:scale(1.06);filter:none}
.d-pulse .pu-card:hover .pu-card-top.has-pic::before{opacity:.15}
.d-pulse .pu-card-top::after{content:"";position:absolute;inset:auto -10% -40% 30%;height:80%;background:repeating-linear-gradient(-62deg,transparent 0 16px,rgba(255,255,255,.12) 16px 18px);pointer-events:none}
.d-pulse .pu-card-n{position:relative;z-index:2;font-family:var(--bebas);font-size:clamp(84px,8vw,120px);line-height:.78;color:transparent;-webkit-text-stroke:2px #fff;transition:color .3s;translate:0 18%}
.d-pulse .pu-card:hover .pu-card-n{color:#fff}
.d-pulse .pu-card-ico{position:relative;z-index:2;display:grid;place-items:center;width:52px;height:52px;border-radius:14px;background:#fff;color:var(--ink);transform:rotate(-8deg);transition:transform .45s var(--snap)}
.d-pulse .pu-card:hover .pu-card-ico{transform:rotate(0) scale(1.1)}
.d-pulse .pu-card-ico svg{width:26px;height:26px}
.d-pulse .pu-card-body{display:grid;flex:1;gap:12px;align-content:start;padding:24px 22px 26px}
.d-pulse .pu-card-body h3{font-size:clamp(32px,2.6vw,42px)}
.d-pulse .pu-card-body p{color:var(--dim)}
.d-pulse .pu-meta{display:flex;flex-wrap:wrap;gap:8px}
.d-pulse .pu-meta span,.d-pulse .pu-meta b{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;background:var(--paper);font-size:13.5px;font-weight:700}
.d-pulse .pu-meta b{background:var(--ink);color:#fff}
.d-pulse .pu-meta svg{width:15px;height:15px}
.d-pulse .pu-card-go{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:auto;padding:16px 22px;border-top:1px solid var(--line);font-size:13.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;transition:background-color .25s,color .25s}
.d-pulse .pu-card-go svg{width:20px;height:20px;transition:transform .3s var(--snap)}
.d-pulse .pu-card-go:hover{background:var(--cobalt);color:#fff}
.d-pulse .pu-card-go:hover svg{transform:translateX(6px)}
.demo-js .d-pulse .pu-classes>li[data-rv]{transform:translateY(50px) rotate(2deg);transition:opacity .5s,transform .8s var(--snap);transition-delay:calc(var(--i,0) * 90ms)}
.demo-js .d-pulse .pu-classes>li[data-rv].in{transform:none}
.d-pulse .pu-feats{display:grid;gap:clamp(18px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}
.d-pulse .pu-feat{position:relative;display:grid;gap:14px;align-content:start;padding:clamp(24px,2.6vw,36px);border:2px solid rgba(255,255,255,.22);border-radius:22px;overflow:hidden;transition:background-color .35s,border-color .35s,transform .4s var(--snap)}
.d-pulse .pu-feat:hover{background:rgba(255,255,255,.08);border-color:#fff;transform:translateY(-6px)}
.d-pulse .pu-feat>span{position:absolute;right:14px;top:4px;font-family:var(--bebas);font-size:100px;line-height:1;color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.35);transition:color .3s,-webkit-text-stroke-color .3s}
.d-pulse .pu-feat:hover>span{color:rgba(255,255,255,.15);-webkit-text-stroke-color:#fff}
.d-pulse .pu-feat i{display:grid;place-items:center;width:58px;height:58px;border-radius:14px;background:var(--coral);color:#fff;transform:rotate(-8deg);transition:transform .45s var(--snap)}
.d-pulse .pu-feat:hover i{transform:rotate(0) scale(1.08)}
.d-pulse .pu-feat i svg{width:28px;height:28px}
.d-pulse .pu-feat h3{font-size:clamp(30px,2.6vw,40px)}
.d-pulse .pu-feat p{color:rgba(255,255,255,.82)}
.d-pulse .pu-stairs{display:grid;gap:16px}
.d-pulse .pu-stair{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 18px;align-items:start}
.d-pulse .pu-stair-n{grid-row:span 3;display:grid;place-items:center;width:64px;height:64px;border-radius:16px;background:var(--cobalt);color:#fff;font-family:var(--bebas);font-size:40px;line-height:1}
.d-pulse .pu-stair:nth-child(even) .pu-stair-n{background:var(--coral)}
.d-pulse .pu-stair h3{font-size:clamp(28px,2.4vw,36px)}
.d-pulse .pu-stair p{color:var(--dim)}
.d-pulse .pu-lvl{display:block;height:10px;margin-top:8px;border-radius:999px;background:var(--mist);overflow:hidden}
.d-pulse .pu-lvl i{display:block;width:var(--w,50%);height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--cobalt),var(--coral));transform:scaleX(0);transform-origin:0 50%;transition:transform 1.1s var(--ease) .3s}
.d-pulse .pu-stair.in .pu-lvl i,html:not(.demo-js) .d-pulse .pu-lvl i{transform:none}
@media (min-width:900px){.d-pulse .pu-stairs{grid-template-columns:repeat(var(--n,4),minmax(0,1fr));align-items:end;gap:clamp(14px,1.6vw,24px)}.d-pulse .pu-stair{grid-template-columns:minmax(0,1fr);align-content:end;gap:12px}.d-pulse .pu-stair-n{grid-row:auto;width:100%;height:auto;min-height:calc(110px + var(--k,0) * 64px);place-items:end start;padding:16px 18px;border-radius:18px;font-size:clamp(70px,6vw,100px);transform-origin:50% 100%}.demo-js .d-pulse .pu-stair[data-rv]{opacity:1;transform:none}.demo-js .d-pulse .pu-stair[data-rv] .pu-stair-n{transform:scaleY(0);transition:transform .9s var(--snap);transition-delay:calc(var(--k,0) * 120ms)}.demo-js .d-pulse .pu-stair[data-rv] .pu-stair-n,.demo-js .d-pulse .pu-stair[data-rv] h3,.demo-js .d-pulse .pu-stair[data-rv] p{opacity:1}.demo-js .d-pulse .pu-stair[data-rv].in .pu-stair-n{transform:none}.d-pulse .pu-lvl{display:none}}
.d-pulse .pu-tiles{display:grid;gap:clamp(10px,1.4vw,18px);grid-template-columns:repeat(2,minmax(0,1fr))}
.d-pulse .pu-tiles figure{position:relative;aspect-ratio:4/5;overflow:hidden;border-radius:18px;clip-path:polygon(9% 0,100% 0,91% 100%,0 100%);transition:clip-path .6s var(--ease)}
.d-pulse .pu-tiles figure:nth-child(3n+1){grid-column:1/-1;aspect-ratio:16/10;clip-path:polygon(5% 0,100% 0,95% 100%,0 100%)}
.d-pulse .pu-tiles img{width:100%;height:100%;object-fit:cover;transform:scale(1.08);transition:transform .9s var(--ease)}
.d-pulse .pu-tiles figure:hover{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}
.d-pulse .pu-tiles figure:hover img{transform:scale(1)}
.d-pulse .pu-tiles figure::after{content:"";position:absolute;inset:0;background:linear-gradient(200deg,transparent 55%,rgba(35,71,255,.55));opacity:0;transition:opacity .4s}
.d-pulse .pu-tiles figure:hover::after{opacity:1}
@media (min-width:900px){.d-pulse .pu-tiles{grid-template-columns:repeat(6,minmax(0,1fr))}.d-pulse .pu-tiles figure,.d-pulse .pu-tiles figure:nth-child(3n+1){grid-column:span 2;aspect-ratio:4/5;clip-path:polygon(9% 0,100% 0,91% 100%,0 100%)}.d-pulse .pu-tiles figure:nth-child(4n+1),.d-pulse .pu-tiles figure:nth-child(4n+4){grid-column:span 4;aspect-ratio:auto;clip-path:polygon(5% 0,100% 0,95% 100%,0 100%)}.d-pulse .pu-tiles.is-1 figure{grid-column:1/-1;aspect-ratio:16/8}.d-pulse .pu-tiles.is-2 figure{grid-column:span 3;aspect-ratio:4/3}}
.demo-js .d-pulse .pu-tiles figure[data-rv]{transform:translateY(40px) skewY(3deg);transition:opacity .5s,transform .8s var(--snap),clip-path .6s var(--ease);transition-delay:calc(var(--i,0) * 80ms)}
.demo-js .d-pulse .pu-tiles figure[data-rv].in{transform:none}
.d-pulse .pu-visit{display:grid;gap:clamp(40px,5vw,72px);align-items:start}
@media (min-width:960px){.d-pulse .pu-visit{grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr)}.d-pulse .pu-visit.is-solo{grid-template-columns:minmax(0,1fr)}}
.d-pulse .pu-visit-copy{display:grid;gap:22px;align-content:start}
.d-pulse .pu-visit-copy>p{color:var(--dim)}
.d-pulse .pu-visit-copy h2{font-size:clamp(50px,5.4vw,90px)}
.d-pulse .pu-visit.is-solo .pu-visit-copy h2{font-size:clamp(54px,7.4vw,118px)}
.d-pulse .z-center .pu-kick{justify-self:center}
.d-pulse .pu-sheet{position:relative;padding:clamp(22px,3vw,40px);border-radius:24px;background:#fff;box-shadow:0 1px 0 var(--line),0 30px 60px -36px rgba(11,16,48,.5)}
.d-pulse .pu-sheet-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}
.d-pulse .pu-sheet-top h3{font-size:clamp(32px,2.8vw,44px)}
.d-pulse .pu-hours{display:grid;gap:4px}
.d-pulse .pu-hours>div{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 16px;align-items:center;padding:12px 14px;border-radius:14px;transition:background-color .25s}
.d-pulse .pu-hours>div:hover{background:var(--paper)}
.d-pulse .pu-hours dt{font-weight:700}
.d-pulse .pu-hours dd{margin:0;font-weight:600;font-variant-numeric:tabular-nums;color:var(--dim);text-align:right}
.d-pulse .pu-track{position:relative;grid-column:1/-1;height:12px;border-radius:999px;background:repeating-linear-gradient(90deg,transparent 0 calc(var(--step) - 1px),rgba(11,16,48,.12) calc(var(--step) - 1px) var(--step)),var(--paper)}
.d-pulse .pu-track i{position:absolute;top:0;bottom:0;left:var(--a);width:var(--w);border-radius:inherit;background:var(--cobalt);transform:scaleX(0);transform-origin:0 50%;transition:transform 1s var(--ease);transition-delay:calc(.2s + var(--i,0) * 90ms)}
.d-pulse .pu-hours.in .pu-track i,html:not(.demo-js) .d-pulse .pu-track i{transform:none}
@media (min-width:700px){.d-pulse .pu-hours>div,.d-pulse .pu-scale{grid-template-columns:136px minmax(0,1fr) 116px}.d-pulse .pu-track{grid-column:2;grid-row:1}.d-pulse .pu-hours dd{grid-column:3}}
.d-pulse .pu-scale{display:grid;gap:0 16px;padding:0 14px;margin-top:6px;font-size:11.5px;font-weight:700;letter-spacing:.06em;color:var(--dim)}
.d-pulse .pu-ticks{position:relative;grid-column:1/-1;height:18px}
@media (min-width:700px){.d-pulse .pu-ticks{grid-column:2}}
.d-pulse .pu-ticks span{position:absolute;top:0;left:var(--a);translate:-50% 0}
.d-pulse .pu-ticks span:first-child{translate:0 0}.d-pulse .pu-ticks span:last-child{translate:-100% 0}
.d-pulse .z-hours div.is-today{background:var(--coral-l)}
.d-pulse .z-hours div.is-today dt,.d-pulse .z-hours div.is-today dd{color:var(--ink)}
.d-pulse .z-hours div.is-today dt::after{content:"";display:inline-block;width:8px;height:8px;margin-left:8px;border-radius:50%;background:var(--coral);vertical-align:middle}
.d-pulse .pu-hours div.is-today .pu-track i{background:var(--coral)}
.d-pulse .pu-reach{display:grid;gap:4px;font-style:normal}
.d-pulse .pu-reach a,.d-pulse .pu-reach span{display:inline-flex;align-items:center;gap:12px;min-height:48px;font-weight:600}
.d-pulse .pu-reach svg{flex:none;width:22px;height:22px;padding:4px;border-radius:8px;background:var(--paper);color:var(--cobalt)}
.d-pulse .pu-reach .is-big{font-family:var(--bebas);font-size:clamp(36px,3.6vw,54px);font-weight:400;line-height:1;transition:color .2s}
.d-pulse .pu-reach .is-big:hover{color:var(--coral)}
.d-pulse .pu-reach .is-big svg{width:40px;height:40px;padding:8px;border-radius:12px;background:var(--coral);color:#fff}
.d-pulse .pu-reach .pu-text{min-height:44px}
.d-pulse .is-cobalt .pu-reach svg{background:rgba(255,255,255,.14);color:#fff}
.d-pulse .is-cobalt .pu-reach .is-big svg{background:var(--coral)}
.d-pulse .is-cobalt .pu-reach .is-big:hover{color:var(--ink)}
.d-pulse .pu-book{display:grid;gap:clamp(40px,5vw,72px);align-items:start}
@media (min-width:960px){.d-pulse .pu-book{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-pulse .pu-book-copy{display:grid;gap:22px;align-content:start}
.d-pulse .pu-book-copy>p{color:rgba(255,255,255,.85)}
.d-pulse .pu-mini{display:grid;gap:2px;padding:18px 20px;border-radius:18px;background:rgba(255,255,255,.1)}
.d-pulse .pu-mini h3{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:6px;font-size:28px}
.d-pulse .pu-mini .z-hours{border:0}
.d-pulse .pu-mini .z-hours div{padding:8px 10px;border:0;border-radius:10px}
.d-pulse .pu-mini .z-hours dd{color:rgba(255,255,255,.85);font-variant-numeric:tabular-nums}
.d-pulse .pu-mini .z-hours div.is-today{background:#fff;color:var(--ink)}
.d-pulse .pu-form{position:relative;padding:clamp(24px,3.2vw,44px);border-radius:24px;background:#fff;color:var(--ink);box-shadow:16px 16px 0 var(--coral)}
.d-pulse .pu-contact .pu-form{box-shadow:16px 16px 0 var(--cobalt)}
.d-pulse .pu-form-t{display:inline-block;margin-bottom:22px;font-family:var(--bebas);font-size:clamp(30px,2.6vw,40px);line-height:1}
@media (max-width:620px){.d-pulse .pu-form{box-shadow:8px 8px 0 var(--coral)}.d-pulse .pu-contact .pu-form{box-shadow:8px 8px 0 var(--cobalt)}}
.d-pulse .z-field label,.d-pulse .z-chipset legend{font-size:12px;font-weight:800;letter-spacing:.1em;color:var(--ink)}
.d-pulse .z-field input,.d-pulse .z-field select,.d-pulse .z-field textarea{border:2px solid var(--mist);background:var(--paper);color:var(--ink);transition:border-color .2s,background-color .2s,box-shadow .2s}
.d-pulse .z-field input:hover,.d-pulse .z-field select:hover,.d-pulse .z-field textarea:hover{border-color:var(--cobalt-l)}
.d-pulse .z-field input:focus,.d-pulse .z-field select:focus,.d-pulse .z-field textarea:focus{border-color:var(--cobalt);background:#fff;box-shadow:0 0 0 4px rgba(35,71,255,.15)}
.d-pulse .z-field :focus-visible{outline:none}
.d-pulse .z-field select{background-image:linear-gradient(45deg,transparent 50%,var(--cobalt) 50%),linear-gradient(135deg,var(--cobalt) 50%,transparent 50%);background-position:calc(100% - 18px) 52%,calc(100% - 12px) 52%;background-size:6px 6px;background-repeat:no-repeat}
.d-pulse .z-chips button{border:2px solid var(--mist);font-family:var(--bebas);font-size:22px;transition:transform .25s var(--snap),background-color .2s,border-color .2s}
.d-pulse .z-chips button:hover{transform:translateY(-3px);border-color:var(--cobalt)}
.d-pulse .z-chips button[aria-pressed="true"]{background:var(--cobalt);border-color:var(--cobalt);color:#fff}
.d-pulse .form-status{border:0;border-radius:12px;background:var(--coral-l);font-weight:600}
.d-pulse .pu-menu-sec .pu-cats{display:grid;gap:clamp(18px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}
.d-pulse .pu-cat{padding:clamp(22px,2.6vw,34px);border-radius:22px;background:#fff;box-shadow:0 1px 0 var(--line),0 24px 50px -34px rgba(11,16,48,.5)}
.d-pulse .pu-cat h3{display:inline-block;margin-bottom:14px;padding:4px 14px 2px;background:var(--cobalt);color:#fff;font-size:30px;clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)}
.d-pulse .pu-cats>div:nth-child(even) h3{background:var(--coral)}
.d-pulse .pu-item{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 14px;padding:12px 0;border-bottom:1px solid var(--line)}
.d-pulse .pu-item:last-child{border-bottom:0}
.d-pulse .pu-item b{font-weight:700}
.d-pulse .pu-item span{font-family:var(--bebas);font-size:24px;line-height:1;color:var(--cobalt)}
.d-pulse .pu-item p{grid-column:1/-1;font-size:.94em;color:var(--dim)}
.d-pulse .pu-note{margin-top:24px;font-size:14px;color:var(--dim)}
.d-pulse .pu-chan{position:relative;display:grid;gap:12px;align-content:start;height:100%;padding:clamp(24px,2.6vw,34px);border-radius:22px;background:#fff;box-shadow:0 1px 0 var(--line),0 24px 50px -30px rgba(11,16,48,.45);transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .5s var(--ease),background-color .3s,color .3s}
.d-pulse .pu-chan.is-live{transition:transform .08s linear,background-color .3s,color .3s}
.d-pulse .pu-chan:hover{background:var(--cobalt);color:#fff}
.d-pulse .pu-chan p{color:var(--dim);transition:color .3s}
.d-pulse .pu-chan:hover p{color:rgba(255,255,255,.85)}
.d-pulse .pu-chan i{display:grid;place-items:center;width:54px;height:54px;border-radius:14px;background:var(--coral);color:#fff;transform:rotate(-8deg);transition:transform .4s var(--snap)}
.d-pulse .pu-chan:hover i{transform:rotate(0) scale(1.08)}
.d-pulse .pu-chan i svg{width:26px;height:26px}
.d-pulse .pu-chan em{font-style:normal;font-family:var(--bebas);font-size:30px;line-height:1;transition:transform .3s var(--snap)}
.d-pulse .pu-chan:hover em{transform:translateX(8px)}
.d-pulse .z-head .pu-kick{margin-bottom:2px}
.d-pulse .z-sec.z-cta{background:var(--cobalt);color:#fff;z-index:1;margin-block:calc(var(--cut) * -1);padding-block:calc(var(--z-sec) + var(--cut));clip-path:polygon(0 var(--cut),100% 0,100% calc(100% - var(--cut)),0 100%);overflow:hidden}
.d-pulse .z-cta::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(-62deg,transparent 0 30px,rgba(255,255,255,.07) 30px 33px)}
.d-pulse .z-cta .z-center{position:relative}
.d-pulse .z-cta h2{font-size:clamp(64px,9vw,150px);max-width:14ch}
.d-pulse .z-cta h2 em{color:var(--coral)}
.d-pulse .z-cta .z-center>p{color:rgba(255,255,255,.85)}
.d-pulse .z-statement h2{max-width:20ch;line-height:.95}
.d-pulse .z-statement h2 em{color:#fff;background:linear-gradient(var(--coral),var(--coral)) 0 55%/0 80% no-repeat;-webkit-box-decoration-break:clone;box-decoration-break:clone;transition:background-size .9s var(--ease) .4s;padding:0 .06em}
.d-pulse .z-statement h2.in em{background-size:100% 80%}
.d-pulse .z-statement .pu-kick{order:-1}
.d-pulse .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(35,71,255,.05),rgba(11,16,48,.82))}
.d-pulse .z-showcase h2{font-size:clamp(60px,8vw,130px)}
.d-pulse .z-showcase h2 em{color:var(--coral)}
.d-pulse .z-sec.z-faq,.d-pulse .z-sec.z-packages,.d-pulse .z-sec.z-quotes-sec{background:var(--paper)}
.d-pulse .z-acc{border:0;display:grid;gap:10px}
.d-pulse .z-acc details{border:0;border-radius:16px;background:#fff;padding:0 22px;box-shadow:0 1px 0 var(--line);transition:box-shadow .3s}
.d-pulse .z-acc details[open]{box-shadow:0 1px 0 var(--line),0 20px 40px -28px rgba(11,16,48,.5)}
.d-pulse .z-acc summary{font-weight:700;font-size:1.06em}
.d-pulse .z-acc summary i{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:var(--cobalt);color:#fff;transition:background-color .3s,transform .4s var(--snap)}
.d-pulse .z-acc summary i::before,.d-pulse .z-acc summary i::after{left:10px;width:14px;height:3px;top:calc(50% - 1.5px)}
.d-pulse .z-acc details[open] summary i{background:var(--coral);transform:rotate(180deg)}
.d-pulse .z-card,.d-pulse .z-panel,.d-pulse .z-channel{border:0;background:#fff;box-shadow:0 1px 0 var(--line),0 24px 50px -34px rgba(11,16,48,.5);transition:transform .4s var(--snap)}
.d-pulse .z-card:hover{transform:translateY(-6px)}
.d-pulse .z-pack.is-featured{background:var(--cobalt);color:#fff;box-shadow:12px 12px 0 var(--coral)}
.d-pulse .z-pack.is-featured .z-pack-price,.d-pulse .z-pack.is-featured .z-pack-price b,.d-pulse .z-pack.is-featured p{color:#fff}
.d-pulse .z-pack.is-featured .z-tag{color:var(--coral-l)}
.d-pulse .z-pack.is-featured .z-ticks li::before{background:#fff}
.d-pulse .z-pack-price b{font-size:clamp(44px,4vw,60px)}
.d-pulse .z-ticks li::before{height:3px;width:12px;transform:skewX(-20deg);background:var(--coral)}
.d-pulse .z-tag{font-weight:800}
.d-pulse .z-team .z-pic{border-radius:22px;clip-path:polygon(8% 0,100% 0,92% 100%,0 100%)}
.d-pulse .z-team h3{font-size:34px}
.d-pulse .z-quotes blockquote{position:relative;padding:58px 28px 28px;border:0;border-radius:22px;background:#fff;box-shadow:0 1px 0 var(--line)}
.d-pulse .z-quotes blockquote::before{content:"\\201C";position:absolute;left:24px;top:6px;font-family:var(--bebas);font-size:90px;line-height:1;color:var(--coral)}
.d-pulse .z-quotes blockquote>p{font-family:"Archivo",sans-serif;font-size:clamp(18px,1.4vw,21px);font-weight:500;line-height:1.5}
.d-pulse .z-quotes footer a{color:var(--cobalt)}
.d-pulse .z-ba{border-radius:22px}
.d-pulse .z-ba::after{width:4px;background:var(--coral)}
.d-pulse .z-steps small,.d-pulse .z-rows small{font-family:var(--bebas);font-size:30px;letter-spacing:0;color:var(--coral)}
.d-pulse .z-ico{border:0;background:var(--coral);color:#fff}
.d-pulse .z-pic{border-radius:22px}
.d-pulse .pu-foot{position:relative;padding:calc(clamp(80px,9vw,130px) + var(--cut)) 0 150px;background:var(--ink);color:#fff;clip-path:polygon(0 var(--cut),100% 0,100% 100%,0 100%);margin-top:calc(var(--cut) * -1);overflow:hidden}
.d-pulse .pu-foot::before{content:"";position:absolute;left:0;right:0;top:0;height:calc(var(--cut) + 6px);background:linear-gradient(90deg,var(--cobalt),var(--coral));clip-path:polygon(0 calc(100% - 6px),100% 0,100% 6px,0 100%)}
.d-pulse .pu-foot-top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:28px}
.d-pulse .pu-foot-name{display:flex;flex-wrap:wrap;column-gap:.2em;max-width:100%;font-family:var(--bebas);font-size:min(18vw,230px,calc(190vw / var(--n,8)));line-height:.82;letter-spacing:.005em}
.d-pulse .pu-foot-name span{display:inline-flex}
.d-pulse .pu-foot-name i{display:inline-block;font-style:normal;transform:translateY(40%) skewX(-14deg);opacity:0;transition:transform .7s var(--snap),opacity .4s,color .2s;transition-delay:calc(var(--i,0) * 28ms)}
.d-pulse .pu-foot-name.in i{transform:none;opacity:1}
.d-pulse .pu-foot-name i:nth-child(even){color:transparent;-webkit-text-stroke:2px #fff}
.d-pulse .pu-foot-name.in i:hover{color:var(--coral);-webkit-text-stroke-color:var(--coral);transform:translateY(-10%) skewX(-8deg);transition-delay:0s}
.demo-js .d-pulse .pu-foot-name[data-rv]{opacity:1;transform:none}
.d-pulse .pu-foot-grid{display:grid;gap:32px;margin-top:clamp(44px,6vw,80px);padding-top:36px;border-top:1px solid rgba(255,255,255,.18);grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-pulse .pu-foot-grid h3{margin-bottom:12px;font-size:26px;color:var(--coral)}
.d-pulse .pu-foot-grid a,.d-pulse .pu-foot-grid span{display:block;padding:4px 0;color:rgba(255,255,255,.78)}
.d-pulse .pu-foot-grid a{display:flex;align-items:center;min-height:40px;padding:0;transition:color .2s,transform .3s var(--snap)}
.d-pulse .pu-foot-grid a:hover{color:#fff;transform:translateX(6px)}
.d-pulse .pu-foot-grid p{color:rgba(255,255,255,.78)}
.d-pulse .pu-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:48px;padding-top:22px;border-top:1px solid rgba(255,255,255,.18);font-size:13px;color:rgba(255,255,255,.6)}
@keyframes pu-slam{0%{opacity:0;transform:translateX(var(--from,-90px)) skewX(-16deg)}55%{opacity:1;transform:translateX(calc(var(--from,-90px) * -.08)) skewX(5deg)}100%{opacity:1;transform:none}}
@keyframes pu-mark{to{background-size:100% 82%}}
@keyframes pu-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes pu-pop{from{opacity:0;transform:scale(.6) rotate(-6deg)}to{opacity:1;transform:none}}
@keyframes pu-slab{from{clip-path:polygon(100% 0,100% 0,100% 100%,100% 100%)}to{clip-path:polygon(34% 0,100% 0,100% 100%,0 100%)}}
@keyframes pu-slab-m{from{clip-path:polygon(0 100%,100% 100%,100% 100%,0 100%)}to{clip-path:polygon(0 22%,100% 0,100% 100%,0 100%)}}
@keyframes pu-wipe{from{clip-path:polygon(14% 0,14% 0,0 100%,0 100%)}to{clip-path:polygon(14% 0,100% 0,86% 100%,0 100%)}}
@keyframes pu-zoom{from{transform:scale(1.25)}to{transform:none}}
@media (prefers-reduced-motion:reduce){.d-pulse .pu-ln>span,.d-pulse .pu-board li,.d-pulse .pu-shot,.d-pulse .pu-shot img,.d-pulse .pu-art::before,.d-pulse .pu-board,.d-pulse .pu-slab,.d-pulse .pu-tag,.d-pulse .pu-chip,.d-pulse .pu-up{animation:none}.d-pulse .pu-hero h1 em{animation:none;background-size:100% 82%}.d-pulse .pu-track i,.d-pulse .pu-lvl i{transform:none}.d-pulse .pu-card,.d-pulse .pu-chan{transform:none}.d-pulse .pu-foot-name i{opacity:1;transform:none}.demo-js .d-pulse .pu-stair[data-rv] .pu-stair-n{transform:none}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * - the energy bar: --sp on the page (0 at the top, 1 at the bottom);
 * - the class band: runs on its own and faster while the page scrolls, in the scroll's direction;
 * - cards tilt toward a fine pointer (mouse), with a highlight where the pointer is.
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-pulse');if(!root)return;var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var lastY=W.scrollY,vel=0,dir=1;function sp(){var h=d.documentElement.scrollHeight-W.innerHeight;root.style.setProperty('--sp',h>0?Math.min(1,Math.max(0,W.scrollY/h)).toFixed(4):'0');var y=W.scrollY;vel+=Math.abs(y-lastY);if(y!==lastY)dir=y>lastY?1:-1;lastY=y}
W.addEventListener('scroll',sp,{passive:true});W.addEventListener('resize',sp);sp();
var runs=[].slice.call(d.querySelectorAll('.pu-run'));if(runs.length&&!reduce){var on=false,io=new IntersectionObserver(function(es){es.forEach(function(e){on=e.isIntersecting})});io.observe(runs[0].closest('.pu-band'));var st=runs.map(function(r,k){return{el:r,x:0,s:k%2?-1:1}}),t0=0;
function tick(t){var dt=t0?Math.min(64,t-t0):16;t0=t;var boost=Math.min(40,vel*.35);vel*=.88;if(on)st.forEach(function(o){var w=o.el.scrollWidth/2;if(!w)return;o.x-=o.s*dir*(dt*.045+boost);if(o.x<=-w)o.x+=w;if(o.x>0)o.x-=w;o.el.style.transform='translate3d('+o.x.toFixed(1)+'px,0,0)'});requestAnimationFrame(tick)}requestAnimationFrame(tick)}
if(!reduce&&W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches){[].slice.call(d.querySelectorAll('.pu-tilt')).forEach(function(el){el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;el.classList.add('is-live');el.style.setProperty('--ry',((x-.5)*10).toFixed(2)+'deg');el.style.setProperty('--rx',((.5-y)*8).toFixed(2)+'deg');el.style.setProperty('--gx',(x*100).toFixed(1)+'%');el.style.setProperty('--gy',(y*100).toFixed(1)+'%')});el.addEventListener('pointerleave',function(){el.classList.remove('is-live');el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')})})}
})();`;

const Bars = () => (
  <b aria-hidden="true">
    <i />
    <i />
    <i />
  </b>
);

const Kick = ({ children, rv = true }: { children: ReactNode; rv?: boolean }) => (
  <p className="pu-kick" data-rv={rv ? "" : undefined}>
    <Bars />
    {children}
  </p>
);

const two = (n: number) => String(n).padStart(2, "0");

function Head({ kicker, title, intro, id, n }: { kicker?: string; title: string; intro?: string; id?: string; n?: number }) {
  return (
    <header className="pu-head">
      {n != null ? (
        <span className="pu-big" data-px aria-hidden="true">
          {two(n)}
        </span>
      ) : null}
      {kicker ? <Kick>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
    <path d="M3 10h13M11 4.5l5.5 5.5-5.5 5.5" />
  </svg>
);

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="pu-hdr hdr">
        <div className="pu-wrap pu-bar">
          <a href="#top" className="pu-logo" aria-label={c.name}>
            <i aria-hidden="true">{c.name.charAt(0)}</i>
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="pu-links" data-nav>
            {c.nav.slice(0, 5).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn pu-fill pu-cta">
            {cta.label}
          </a>
          <button type="button" className="pu-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span className="pu-sr" data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
        <span className="pu-energy" aria-hidden="true">
          <i />
        </span>
      </header>
      <div id="site-menu" className="pu-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{two(k + 1)}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="pu-menu-foot">
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
          {b.address ?? b.city ? <span>{b.address ?? b.city}</span> : null}
        </div>
      </div>
    </>
  );
}

/** Two crossing bands of the business's own classes and services, set in motion by the script. */
function Band({ c }: { c: Ctx }) {
  const list = offerWords(c, 8);
  if (list.length < 2) return null;
  const row = Array.from({ length: Math.max(2, Math.ceil(12 / list.length)) }, () => list).flat();
  const run = (words: string[]) => (
    <div className="pu-run">
      {[0, 1].map((k) => (
        <p key={k}>
          {words.map((w, n) => (
            <span key={n}>{w}</span>
          ))}
        </p>
      ))}
    </div>
  );
  return (
    <div className="pu-band" aria-hidden="true">
      <div>{run(row)}</div>
      <div>{run(row.slice().reverse())}</div>
    </div>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 44 ? "is-s" : plain.length > 26 ? "is-m" : undefined;
  const { lines, marked } = splitLines(hero.headline, plain.length > 18 ? 3 : 2);
  const facts = heroFacts(c);
  const words = offerWords(c, 5);
  const city = c.spec.business.city;
  return (
    <>
      <section className="pu-hero">
        <span className="pu-slab" aria-hidden="true" />
        <p className="pu-ghost-name" data-px aria-hidden="true">
          <span>{c.name}</span>
          <span>{c.name}</span>
        </p>
        <div className="pu-wrap pu-hero-grid">
          <div>
            <div className="pu-chip">
              {hero.eyebrow ? <Kick rv={false}>{hero.eyebrow}</Kick> : null}
              <NowBadge c={c} className="pu-now" />
            </div>
            <h1 className={[size, marked ? "is-marked" : ""].filter(Boolean).join(" ") || undefined}>
              {lines.map((line, n) => (
                <span className="pu-ln" key={n}>
                  <span style={i(n)}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="pu-lede pu-up" style={i(0)}>
              {hero.subheadline}
            </p>
            <div className="pu-cta-row pu-up" style={i(1)}>
              <Btn c={c} href={hero.primaryCta.href}>
                {hero.primaryCta.label} <Arrow />
              </Btn>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
            </div>
            {facts.length > 0 && (
              <dl className="pu-facts pu-up" style={i(2)}>
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <div className="pu-art">
            {p ? (
              <>
                <figure className="pu-shot">
                  <Pic p={p} eager sizes="(min-width: 980px) 38vw, 92vw" />
                </figure>
                {hero.note || city ? (
                  <p className="pu-tag" aria-hidden="true">
                    <small>{c.name}</small>
                    <b>{hero.note || city}</b>
                  </p>
                ) : null}
              </>
            ) : (
              <div className="pu-board" aria-hidden="true">
                <span>{c.name.charAt(0)}</span>
                {words.length > 0 ? (
                  <ul>
                    {words.map((w, n) => (
                      <li key={w} style={i(n)}>
                        {w}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>
      <Band c={c} />
    </>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  let k = 0;
  return (
    <footer className="pu-foot">
      <div className="pu-wrap">
        <div className="pu-foot-top">
          <p className="pu-foot-name" aria-hidden="true" data-rv style={css({ "--n": Math.max(7, c.name.length) })}>
            {c.name.split(" ").map((w, n) => (
              <span key={n}>
                {[...w].map((ch, m) => (
                  <i key={m} style={i(k++)}>
                    {ch}
                  </i>
                ))}
              </span>
            ))}
          </p>
          <Btn c={c} href={cta.href}>
            {cta.label} <Arrow />
          </Btn>
        </div>
        <div className="pu-foot-grid">
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
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
        </div>
        <Legal c={c} className="pu-legal" />
      </div>
    </footer>
  );
}

/** Minutes after midnight of every "hh:mm – hh:mm" span in a line of opening hours. */
function spans(text: string): [number, number][] {
  if (/gesloten|closed|geschlossen|ferm/i.test(text)) return [];
  const out: [number, number][] = [];
  const re = /(\d{1,2})[:.](\d{2})\s*(?:–|—|-|tot|to|bis|à)\s*(\d{1,2})[:.](\d{2})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const s = +m[1] * 60 + +m[2];
    let e = +m[3] * 60 + +m[4];
    if (e <= s) e = 24 * 60;
    out.push([s, Math.min(e, 24 * 60)]);
  }
  return out;
}

/**
 * The opening hours as bars across the day, worked out from the hours on record (nothing is
 * drawn for a line that cannot be read). Same markup as the kit's list (dl.z-hours > div > dt + dd),
 * so today's row is marked by the shared script.
 */
function DayBars({ c }: { c: Ctx }) {
  const lines = c.spec.business.openingHours;
  if (!lines?.length) return <p className="z-note">{c.t.hoursTbc}</p>;
  const rows = hoursRows(lines).map(([day, time]) => ({ day, time, sp: spans(time) }));
  const all = rows.flatMap((r) => r.sp);
  const from = all.length ? Math.max(0, Math.floor(Math.min(...all.map((x) => x[0])) / 60 / 2) * 2) : 6;
  const to = all.length ? Math.min(24, Math.ceil(Math.max(...all.map((x) => x[1])) / 60 / 2) * 2) : 24;
  const range = Math.max(2, to - from) * 60;
  const ticks = Array.from({ length: Math.floor((to - from) / 4) + 1 }, (_, k) => from + k * 4).filter((h) => h <= to);
  return (
    <>
      <dl className="z-hours pu-hours" data-rv>
        {rows.map((r, n) => (
          <div key={n}>
            <dt>{r.day}</dt>
            <dd>{r.time}</dd>
            {all.length ? (
              <span className="pu-track" aria-hidden="true" style={css({ "--step": `${(100 * 120) / range}%` })}>
                {r.sp.map(([s, e], k) => (
                  <i key={k} style={css({ "--a": `${(100 * (s - from * 60)) / range}%`, "--w": `${(100 * (e - s)) / range}%`, "--i": n })} />
                ))}
              </span>
            ) : null}
          </div>
        ))}
      </dl>
      {all.length ? (
        <p className="pu-scale" aria-hidden="true">
          <span className="pu-ticks">
            {ticks.map((h) => (
              <span key={h} style={css({ "--a": `${(100 * (h - from) * 60) / range}%` })}>
                {two(h)}:00
              </span>
            ))}
          </span>
        </p>
      ) : null}
    </>
  );
}

/** Phone large, then address, e-mail and route: only what is on record. */
function Reach({ c }: { c: Ctx }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email && !b.mapsUrl) return null;
  return (
    <address className="pu-reach" data-rv>
      {b.phone ? (
        <a href={tel(b.phone)} className="is-big">
          <Icon name="phone" />
          {b.phone}
        </a>
      ) : null}
      {b.address ? (
        <span>
          <Icon name="map" />
          {b.address}
        </span>
      ) : null}
      {b.email ? (
        <a href={`mailto:${b.email}`}>
          <Icon name="chat" />
          {b.email}
        </a>
      ) : null}
      {b.mapsUrl ? (
        <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="pu-text">
          {c.t.route} <Arrow />
        </a>
      ) : null}
    </address>
  );
}

function SimpleHours({ c }: { c: Ctx }) {
  const lines = c.spec.business.openingHours;
  if (!lines?.length) return null;
  return (
    <dl className="z-hours">
      {hoursRows(lines).map(([day, time], n) => (
        <div key={n}>
          <dt>{day}</dt>
          <dd>{time}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Where a class card sends people: the booking section, else contact (labelled with that section's own title). */
function target(c: Ctx) {
  const s = c.spec.sections.find((x) => x.type === "booking") ?? c.spec.sections.find((x) => x.type === "contact");
  return s ? { href: `#${s.id}`, label: s.title.replace(/\*/g, "") } : null;
}

export const pulse: Family = {
  key: "pulse",
  root: "d-pulse",
  fonts: ["Bebas Neue", "Archivo"],
  themeColor: "#ffffff",
  accent: "#2347ff",
  onAccent: "#ffffff",
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "pu-wrap", eyebrow: "pu-kick", btn: "pu-fill", btnAlt: "pu-ghost", btnText: "pu-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c, n) => {
      const p = c.photo(s.image);
      const small = p ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      const stack = !p && s.highlights.length > 0;
      return (
        <section className="pu-sec" id={s.id}>
          <div className={`pu-wrap pu-about${p || stack ? "" : " is-solo"}`}>
            {p ? (
              <div className="pu-about-art" data-rv>
                <figure data-px>
                  <Pic p={p} sizes="(min-width: 960px) 42vw, 92vw" />
                </figure>
                {small ? (
                  <figure className="pu-sq">
                    <Pic p={small} sizes="220px" />
                  </figure>
                ) : null}
              </div>
            ) : stack ? (
              <div className="pu-stack" data-rv>
                <small>{c.name}</small>
                <ul>
                  {s.highlights.map((h) => (
                    <li key={h}>
                      <Icon name="check" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="pu-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} n={n + 1} />
              <p className="pu-lead" data-rv>
                {first}
              </p>
              {rest.map((x, k) => (
                <p key={k} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && !stack && (
                <ul className="pu-checks" data-rv>
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
    services: (s, c, n) => {
      const go = target(c);
      return (
        <section className="pu-sec is-paper" id={s.id}>
          <div className="pu-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} n={n + 1} />
            <ul className="pu-classes">
              {s.items.map((it, k) => {
                const p = c.photo(`art:svc${k}`);
                return (
                  <li key={k} data-rv style={i(k % 3)}>
                    <article className="pu-card pu-tilt">
                      <div className={`pu-card-top${p ? " has-pic" : ""}`}>
                        {p ? <Pic p={p} sizes="(min-width: 900px) 30vw, 92vw" /> : null}
                        <span className="pu-card-n" aria-hidden="true">
                          {two(k + 1)}
                        </span>
                        <span className="pu-card-ico" aria-hidden="true">
                          <Icon name={it.icon} />
                        </span>
                      </div>
                      <div className="pu-card-body">
                        <h3>{it.title}</h3>
                        <p>{it.description}</p>
                        {it.duration || it.price ? (
                          <p className="pu-meta">
                            {it.duration ? (
                              <span>
                                <Icon name="clock" />
                                {it.duration}
                              </span>
                            ) : null}
                            {it.price ? <b>{it.price}</b> : null}
                          </p>
                        ) : null}
                      </div>
                      {go ? (
                        <a href={go.href} className="pu-card-go">
                          {go.label}
                          <Arrow />
                        </a>
                      ) : null}
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      );
    },
    menu: (s, c, n) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="pu-sec is-paper pu-menu-sec" id={s.id}>
          <div className="pu-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} n={n + 1} />
            <div className="pu-cats">
              {cats.map((cat, k) => (
                <div key={k} className="pu-cat" data-rv style={i(k % 3)}>
                  <h3>{cat.name}</h3>
                  {cat.items.map((d, m) => (
                    <div key={m} className="pu-item">
                      <b>{d.name}</b>
                      {d.price ? <span>{d.price}</span> : <span aria-hidden="true" />}
                      {d.description ? <p>{d.description}</p> : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {s.note ? (
              <p className="pu-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c, n) => (
      <section className="pu-sec is-cobalt pu-cut" id={s.id}>
        <div className="pu-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} n={n + 1} />
          <ul className="pu-feats">
            {s.items.map((it, k) => (
              <li key={k} className="pu-feat" data-rv style={i(k % 3)}>
                <span aria-hidden="true">{two(k + 1)}</span>
                <i aria-hidden="true">
                  <Icon name={it.icon} />
                </i>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    process: (s, c, n) => (
      <section className="pu-sec" id={s.id}>
        <div className="pu-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} n={n + 1} />
          <ol className="pu-stairs" style={css({ "--n": s.steps.length })}>
            {s.steps.map((st, k) => (
              <li key={k} className="pu-stair" data-rv style={css({ "--k": k, "--i": k })}>
                <span className="pu-stair-n" aria-hidden="true">
                  {two(k + 1)}
                </span>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
                <span className="pu-lvl" aria-hidden="true">
                  <i style={css({ "--w": `${Math.round(((k + 1) / s.steps.length) * 100)}%` })} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    gallery: (s, c, n) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const shown = pics.slice(0, 6);
      return (
        <section className="pu-sec" id={s.id}>
          <div className="pu-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} n={n + 1} />
            <div className={`pu-tiles is-${Math.min(shown.length, 3)}`}>
              {shown.map((p, k) => (
                <figure key={k} data-rv style={i(k % 3)}>
                  <Pic p={p} sizes="(min-width: 900px) 40vw, 92vw" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c, n) => (
      <section className="pu-sec is-paper" id={s.id}>
        <div className="pu-wrap pu-visit">
          <div className="pu-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} n={n + 1} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="pu-sheet" data-rv>
            <div className="pu-sheet-top">
              <h3>{c.t.hours}</h3>
              <NowBadge c={c} className="pu-now" />
            </div>
            <DayBars c={c} />
          </div>
        </div>
      </section>
    ),
    contact: (s, c, n) => {
      const withHours = !c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") && Boolean(c.spec.business.openingHours?.length);
      return (
        <section className="pu-sec pu-contact" id={s.id}>
          <div className={`pu-wrap pu-visit${s.showForm || withHours ? "" : " is-solo"}`}>
            <div className="pu-visit-copy">
              <Head kicker={c.t.kick.contact} title={s.title} n={n + 1} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Reach c={c} />
            </div>
            {s.showForm ? (
              <div className="pu-form" data-rv>
                <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
              </div>
            ) : withHours ? (
              <div className="pu-sheet" data-rv>
                <div className="pu-sheet-top">
                  <h3>{c.t.hours}</h3>
                  <NowBadge c={c} className="pu-now" />
                </div>
                <DayBars c={c} />
              </div>
            ) : null}
          </div>
          {s.showForm && withHours ? (
            <div className="pu-wrap" style={{ marginTop: 56 }}>
              <div className="pu-sheet" data-rv>
                <div className="pu-sheet-top">
                  <h3>{c.t.hours}</h3>
                  <NowBadge c={c} className="pu-now" />
                </div>
                <DayBars c={c} />
              </div>
            </div>
          ) : null}
        </section>
      );
    },
    booking: (s, c, n) => (
      <section className="pu-sec is-cobalt is-ink pu-cut" id={s.id}>
        <div className="pu-wrap pu-book">
          <div className="pu-book-copy">
            <Head kicker={c.t.kick.booking} title={s.title} n={n + 1} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            {c.spec.business.openingHours?.length ? (
              <div className="pu-mini" data-rv>
                <h3>
                  {c.t.hours}
                  <NowBadge c={c} className="pu-now" />
                </h3>
                <SimpleHours c={c} />
              </div>
            ) : null}
            <Reach c={c} />
          </div>
          <div className="pu-form" data-rv>
            <p className="pu-form-t" aria-hidden="true">
              {c.t.submit[s.kind]}
            </p>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
          </div>
        </div>
      </section>
    ),
    order: (s, c, n) => (
      <section className="pu-sec is-paper" id={s.id}>
        <div className="pu-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} n={n + 1} />
          <ul className="pu-classes">
            {s.channels.map((ch, k) => (
              <li key={k} data-rv style={i(k % 3)}>
                <a href={ch.href} className="pu-chan pu-tilt" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <i aria-hidden="true">
                    <Icon name={ch.icon} />
                  </i>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <em aria-hidden="true">→</em>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
  },
};
