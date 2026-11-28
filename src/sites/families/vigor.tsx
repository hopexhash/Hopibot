import type { ReactNode } from "react";
import type { SiteSpec } from "@/lib/site-spec";
import { NowBadge, TODAY_JS } from "./today";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, splitLines, tel, type Ctx, type Family, type Photo, type SectionOf } from "./kit";

/**
 * Vigor: an original template (no portfolio demo). A performance club as an athletic
 * campaign: chalk white, graphite and one hot "blaze" accent, monochrome photography and
 * oversized condensed capitals. The opening sprints in line by line behind a shutter of
 * start-block strips; a band of programme names skews with the speed of the scroll; the
 * programmes are lanes that flash a duotone photograph; the class schedule is built from
 * the days the business itself writes next to its services; memberships are race bibs; a
 * track line fills with the scroll; numbers only ever count what the page itself lists.
 * Made for gyms, performance and boxing clubs, personal trainers and sports studios.
 */

const RULES = `
.d-vigor{--chalk:#edece8;--paper:#f7f6f3;--ink:#0c0c0d;--char:#18181a;--dim:#55555a;--mute:#a2a29f;--line:rgba(12,12,13,.14);--line-d:rgba(237,236,232,.16);--blaze:#ff4b12;--blaze-d:#d93a07;--pad:clamp(18px,4.4vw,72px);--cut:14px;--ease:cubic-bezier(.16,1,.3,1);--snap:cubic-bezier(.76,0,.24,1);--disp:"Big Shoulders Display","Arial Narrow",Impact,sans-serif;--z-bg2:var(--paper);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--blaze);--z-on-accent:#0c0c0d;--z-display:var(--disp);--z-display-weight:900;--z-radius:0px;--z-field-radius:0px;--z-ico-radius:0px;--z-sec:clamp(84px,11vw,170px);--z-h3:clamp(24px,2.2vw,34px);--z-statement:clamp(40px,6.4vw,104px);background:var(--chalk);color:var(--ink);font-family:"Archivo",system-ui,sans-serif;font-size:clamp(16px,1.02vw,18px);line-height:1.55}
.d-vigor h1,.d-vigor h2,.d-vigor h3{font-family:var(--disp);font-weight:900;text-transform:uppercase;letter-spacing:-.005em;line-height:.88}
.d-vigor h2{font-size:clamp(46px,7.2vw,124px)}
.d-vigor h2.is-long{font-size:clamp(36px,4.8vw,76px);line-height:.92}
.d-vigor h3{font-weight:800;line-height:.95}
.d-vigor em{font-style:normal;background:linear-gradient(transparent 64%,var(--blaze) 64% 90%,transparent 90%);-webkit-box-decoration-break:clone;box-decoration-break:clone;padding-inline:.04em}
.d-vigor .is-ink em,.d-vigor .vg-hero:not(.is-plain) em,.d-vigor .vg-foot em{background:none;color:var(--blaze);padding:0}
.d-vigor ::selection{background:var(--blaze);color:var(--ink)}
.d-vigor .vg-wrap{position:relative;width:min(100%,1680px);margin-inline:auto;padding-inline:var(--pad)}
.d-vigor .vg-kick{display:inline-flex;align-items:center;gap:12px;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.d-vigor .vg-kick i{width:10px;height:10px;background:var(--blaze);transform:skewX(-18deg)}
.d-vigor .vg-cut{clip-path:polygon(0 0,calc(100% - var(--cut)) 0,100% var(--cut),100% 100%,var(--cut) 100%,0 calc(100% - var(--cut)))}
.d-vigor .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:56px;padding:0 28px;font-family:var(--disp);font-size:20px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;line-height:1;overflow:hidden;isolation:isolate;transition:color .3s var(--ease),background-color .3s}
.d-vigor .btn svg{width:20px;height:20px;transition:transform .45s var(--ease)}
.d-vigor .btn:hover svg{transform:translateX(5px)}
.d-vigor .vg-fill{background:var(--blaze);color:var(--ink);clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))}
.d-vigor .vg-fill::before{content:"";position:absolute;inset:0 -20%;z-index:-1;background:var(--ink);transform:translateX(-105%) skewX(-24deg);transition:transform .5s var(--snap)}
.d-vigor .vg-fill:hover{color:var(--chalk)}
.d-vigor .vg-fill:hover::before{transform:translateX(0) skewX(-24deg)}
.d-vigor .vg-line{border:1.5px solid currentColor;background:transparent}
.d-vigor .vg-line::before{content:"";position:absolute;inset:0;z-index:-1;background:currentColor;transform:scaleY(0);transform-origin:50% 100%;transition:transform .45s var(--snap)}
.d-vigor .vg-line:hover::before{transform:scaleY(1)}
.d-vigor .vg-line:hover{color:var(--blaze)}
.d-vigor .vg-text{display:inline-flex;align-items:center;gap:10px;min-height:44px;font-family:var(--disp);font-size:20px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;background:linear-gradient(var(--blaze),var(--blaze)) 0 100%/100% 3px no-repeat;transition:background-size .4s var(--ease),color .3s}
.d-vigor .vg-text:hover{background-size:100% 100%;color:var(--ink)}
.d-vigor .vg-mag{display:inline-flex;transition:transform .5s var(--ease)}
.d-vigor .vg-hdr{position:fixed;left:0;right:0;top:0;z-index:50;color:var(--ink);transition:background-color .4s,color .4s,transform .5s var(--ease)}
.d-vigor .vg-hdr.is-over{color:var(--chalk)}
.d-vigor.is-scrolled .vg-hdr{background:rgba(237,236,232,.94);color:var(--ink);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.d-vigor .vg-bar{display:flex;align-items:center;gap:clamp(14px,2.4vw,36px);height:84px;transition:height .4s var(--ease)}
.d-vigor.is-scrolled .vg-bar{height:66px}
.d-vigor .vg-pace{position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--blaze);transform:scaleX(var(--pg,0));transform-origin:0 50%;opacity:0;transition:opacity .4s}
.d-vigor.is-scrolled .vg-pace{opacity:1}
.d-vigor .vg-logo{display:flex;align-items:center;gap:10px;min-width:0;min-height:44px;font-family:var(--disp);font-size:clamp(20px,5.2vw,28px);font-weight:900;letter-spacing:.02em;text-transform:uppercase;line-height:1}
.d-vigor .vg-logo i{flex:none;width:14px;height:26px;background:var(--blaze);transform:skewX(-20deg);transition:transform .5s var(--ease)}
.d-vigor .vg-logo:hover i{transform:skewX(-20deg) scaleY(1.3)}
.d-vigor .vg-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-vigor .vg-links{display:none;gap:clamp(18px,2vw,34px);margin-left:auto}
.d-vigor .vg-links a{position:relative;display:inline-flex;gap:6px;min-height:44px;align-items:center;white-space:nowrap;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.d-vigor .vg-links small{font-family:var(--disp);font-size:13px;font-weight:800;color:var(--blaze)}
.d-vigor .vg-links a::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:2px;background:currentColor;transform:scaleX(0);transform-origin:100% 50%;transition:transform .4s var(--ease)}
.d-vigor .vg-links a:hover::after{transform:scaleX(1);transform-origin:0 50%}
.d-vigor .vg-hcta{display:none;flex:none;min-height:48px;padding:0 22px;font-size:18px;white-space:nowrap}
@media (max-width:1439px){.d-vigor .vg-links small{display:none}}
.d-vigor .vg-burger{position:relative;z-index:52;display:inline-flex;align-items:center;gap:12px;margin-left:auto;min-height:48px;min-width:48px;padding:0 4px 0 14px;border:0;background:none;font-family:var(--disp);font-size:19px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
.d-vigor .vg-burger b{position:relative;display:grid;place-items:center;width:46px;height:46px;background:var(--blaze);clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))}
.d-vigor .vg-burger b::before,.d-vigor .vg-burger b::after{content:"";position:absolute;left:12px;width:22px;height:2.5px;background:var(--ink);transition:transform .45s var(--ease)}
.d-vigor .vg-burger b::before{top:17px}.d-vigor .vg-burger b::after{top:26px;width:14px}
.d-vigor.menu-open .vg-burger b::before{transform:translateY(4.5px) rotate(45deg)}
.d-vigor.menu-open .vg-burger b::after{width:22px;transform:translateY(-4.5px) rotate(-45deg)}
.d-vigor.menu-open .vg-hdr{z-index:53;background:transparent;color:var(--chalk);backdrop-filter:none;-webkit-backdrop-filter:none}
.d-vigor.menu-open .vg-pace{opacity:0}
@media (min-width:1180px){.d-vigor .vg-links{display:flex}.d-vigor .vg-burger{display:none}.d-vigor .vg-hcta{display:inline-flex}}
@media (min-width:620px) and (max-width:1179px){.d-vigor .vg-hcta{display:inline-flex;margin-left:auto}.d-vigor .vg-burger{margin-left:0}}
.d-vigor .vg-menu{position:fixed;inset:0;z-index:51;display:grid;grid-template-rows:1fr auto;padding:110px var(--pad) 0;background:var(--ink);color:var(--chalk);overflow-y:auto;clip-path:polygon(0 0,100% 0,100% 0,0 0);visibility:hidden;transition:clip-path .7s var(--snap),visibility 0s .7s}
.d-vigor .vg-menu.is-open{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);visibility:visible;transition:clip-path .7s var(--snap)}
.d-vigor .vg-menu::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 calc(25% - 1px),rgba(237,236,232,.07) calc(25% - 1px) 25%);pointer-events:none}
.d-vigor .vg-menu nav{position:relative;display:grid;align-content:start;gap:2px}
.d-vigor .vg-menu nav a{display:flex;align-items:center;gap:16px;min-height:60px;padding:4px 0;border-bottom:1px solid var(--line-d);font-family:var(--disp);font-size:clamp(40px,11vw,76px);font-weight:900;text-transform:uppercase;line-height:1;opacity:0;transform:translateX(-30%) skewX(-16deg);transition:opacity .4s,transform .7s var(--ease),color .25s}
.d-vigor .vg-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.2s + var(--i,0) * 70ms)}
.d-vigor .vg-menu nav a:hover{color:var(--blaze)}
.d-vigor .vg-menu nav small{min-width:2ch;font-size:15px;font-weight:800;color:var(--blaze)}
.d-vigor .vg-menu-foot{position:relative;display:grid;gap:18px;margin:36px calc(var(--pad) * -1) 0;padding:26px var(--pad) 120px;background:var(--blaze);color:var(--ink);opacity:0;transform:translateY(40px);transition:opacity .4s,transform .7s var(--ease)}
.d-vigor .vg-menu.is-open .vg-menu-foot{opacity:1;transform:none;transition-delay:.45s}
.d-vigor .vg-menu-foot a.vg-menu-cta{display:flex;justify-content:space-between;align-items:center;min-height:56px;font-family:var(--disp);font-size:clamp(28px,7vw,44px);font-weight:900;text-transform:uppercase;line-height:1}
.d-vigor .vg-menu-foot a.vg-menu-cta svg{width:34px;height:34px}
.d-vigor .vg-menu-foot p{font-size:14px;font-weight:600}
.d-vigor .vg-menu-foot p a{text-decoration:underline;text-underline-offset:3px}
.d-vigor .vg-hero{position:relative;display:grid;align-items:end;min-height:100svh;background:var(--ink);color:var(--chalk);overflow:hidden;isolation:isolate}
.d-vigor .vg-hero-media{position:absolute;inset:0;z-index:-1;overflow:hidden}
.d-vigor .vg-hero-media figure{position:absolute;inset:-8% 0;transform:translate3d(0,calc(var(--p,0) * -9%),0)}
.d-vigor .vg-hero-media img{width:100%;height:100%;object-fit:cover;object-position:50% 30%;filter:grayscale(1) contrast(1.18) brightness(.8);animation:vg-zoom 2.6s var(--ease) both}
.d-vigor .vg-hero-media::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(12,12,13,.62) 0%,rgba(12,12,13,.06) 30%,rgba(12,12,13,.3) 58%,rgba(12,12,13,.92) 100%)}
.d-vigor .vg-shutter{position:absolute;inset:0;z-index:1;display:grid;grid-template-columns:repeat(6,1fr);pointer-events:none}
.d-vigor .vg-shutter span{background:var(--ink);transform-origin:50% 0;animation:vg-shut 1.05s var(--snap) both;animation-delay:calc(.05s + var(--i,0) * 75ms)}
.d-vigor .vg-lanes{position:absolute;inset:0;z-index:0;display:grid;grid-template-columns:repeat(4,1fr);pointer-events:none}
.d-vigor .vg-lanes span{border-left:1px solid rgba(237,236,232,.1)}
.d-vigor .vg-lanes span:first-child{border:0}
.d-vigor .vg-hero.is-plain .vg-lanes span{border-color:var(--line)}
.d-vigor .vg-hero-in{position:relative;z-index:2;display:grid;gap:clamp(22px,3vw,40px);width:100%;padding-top:clamp(120px,16vh,180px);padding-bottom:clamp(28px,4vw,48px)}
.d-vigor .vg-tagrow{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;animation:vg-up .8s var(--ease) .9s both}
.d-vigor .vg-tag{display:inline-flex;align-items:center;gap:10px;min-height:34px;padding:0 14px;background:var(--blaze);color:var(--ink);font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}
.d-vigor .vg-h1{font-size:clamp(60px,16.4vw,240px);line-height:.84;letter-spacing:-.01em}
.d-vigor .vg-h1.is-m{font-size:clamp(50px,12.6vw,178px)}
@media (min-width:700px){.d-vigor .vg-h1{font-size:clamp(60px,14vw,240px)}.d-vigor .vg-h1.is-m{font-size:clamp(50px,10.4vw,178px)}}
.d-vigor .vg-h1.is-s{font-size:clamp(44px,7.6vw,128px);line-height:.88}
.d-vigor .vg-ln{display:block;overflow:hidden;padding-block:.05em;margin-block:-.05em}
.d-vigor .vg-ln>span{display:inline-block;animation:vg-dash 1.15s var(--ease) both;animation-delay:calc(.45s + var(--i,0) * 120ms)}
.d-vigor .vg-hero-row{display:grid;gap:26px 48px;align-items:end;animation:vg-up .9s var(--ease) 1.05s both}
@media (min-width:980px){.d-vigor .vg-hero-row{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr)}}
.d-vigor .vg-lede{max-width:44ch;font-size:clamp(17px,1.35vw,21px);line-height:1.5;color:rgba(237,236,232,.86)}
.d-vigor .vg-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:14px 22px;margin-top:26px}
.d-vigor .vg-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr));border-top:1px solid var(--line-d)}
.d-vigor .vg-facts div{display:grid;gap:4px;padding:16px 18px 4px 0}
.d-vigor .vg-facts dt{font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--blaze)}
.d-vigor .vg-facts dd{margin:0;font-weight:500}
.d-vigor .vg-facts a{text-decoration:underline;text-underline-offset:3px}
.d-vigor .vg-note{position:absolute;right:calc(var(--pad) * .55);top:50%;z-index:2;font-family:var(--disp);font-size:14px;font-weight:800;letter-spacing:.3em;text-transform:uppercase;writing-mode:vertical-rl;transform:translateY(-50%) rotate(180deg);color:var(--blaze);animation:vg-fade 1s 1.4s both}
@media (max-width:760px){.d-vigor .vg-note{display:none}}
.d-vigor .vg-now{display:inline-flex;align-items:center;gap:8px;min-height:34px;padding:0 12px;border:1px solid currentColor;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.d-vigor .vg-now::before{content:"";width:8px;height:8px;background:currentColor;transform:skewX(-18deg)}
.d-vigor .vg-now.is-open::before{background:var(--blaze)}
.d-vigor .vg-hero.is-plain{background:var(--chalk);color:var(--ink);align-items:center}
.d-vigor .vg-hero.is-plain .vg-lede{color:var(--dim)}
.d-vigor .vg-hero.is-plain .vg-facts{border-color:var(--line)}
.d-vigor .vg-hero.is-plain .vg-facts dt{color:var(--ink)}
.d-vigor .vg-ghost{position:absolute;left:-.04em;bottom:-.14em;z-index:0;font-family:var(--disp);font-size:min(38vw,calc(240vw / var(--n,8)));font-weight:900;line-height:.8;text-transform:uppercase;white-space:nowrap;color:transparent;-webkit-text-stroke:1.5px rgba(12,12,13,.12);pointer-events:none;animation:vg-ghost 1.6s var(--ease) .2s both}
.d-vigor .vg-plain-grid{display:grid;gap:clamp(36px,5vw,72px);align-items:end}
@media (min-width:1000px){.d-vigor .vg-plain-grid{grid-template-columns:minmax(0,1.35fr) minmax(0,.65fr)}}
.d-vigor .vg-heat{position:relative;background:var(--ink);color:var(--chalk);padding:clamp(22px,2.4vw,34px);animation:vg-in 1.1s var(--ease) .7s both}
.d-vigor .vg-heat-h{font-family:var(--disp);font-weight:900;text-transform:uppercase;line-height:.9;display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding-bottom:14px;margin-bottom:6px;border-bottom:3px solid var(--blaze);font-size:clamp(26px,2.4vw,34px)}
.d-vigor .vg-heat-h small{font-family:"Archivo",sans-serif;font-size:11px;font-weight:700;letter-spacing:.2em}
.d-vigor .vg-heat li{display:grid;grid-template-columns:36px minmax(0,1fr);gap:12px;align-items:baseline;padding:11px 0;border-bottom:1px solid var(--line-d);font-weight:600}
.d-vigor .vg-heat li b{font-family:var(--disp);font-size:22px;font-weight:900;color:var(--blaze)}
.d-vigor .vg-band{position:relative;z-index:3;margin-block:-1px;padding-block:clamp(14px,1.6vw,22px);background:var(--blaze);color:var(--ink);overflow:hidden}
.d-vigor .vg-band-track{display:flex;width:max-content;will-change:transform}
.d-vigor .vg-band span{display:inline-flex;align-items:center;gap:.4em;padding-right:.4em;font-family:var(--disp);font-size:clamp(40px,6.4vw,104px);font-weight:900;line-height:.9;text-transform:uppercase;white-space:nowrap}
.d-vigor .vg-band span:nth-child(even){color:transparent;-webkit-text-stroke:2px var(--ink)}
.d-vigor .vg-band span::after{content:"/";color:var(--ink);-webkit-text-stroke:0;font-weight:300}
.d-vigor .vg-sec{position:relative;padding-block:var(--z-sec)}
.d-vigor .vg-sec.is-ink{background:var(--ink);color:var(--chalk)}
.d-vigor .vg-sec.is-paper{background:var(--paper)}
.d-vigor .vg-head{display:grid;gap:20px;margin-bottom:clamp(44px,6vw,88px)}
.d-vigor .vg-head>p:not(.vg-kick){max-width:52ch;font-size:clamp(16px,1.2vw,19px);color:var(--dim)}
.d-vigor .is-ink .vg-head>p:not(.vg-kick){color:var(--mute)}
@media (min-width:980px){.d-vigor .vg-head.is-row{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);align-items:end;column-gap:64px}.d-vigor .vg-head.is-row .vg-kick{grid-column:1/-1}}
.demo-js .d-vigor .vg-head h2[data-rv]{transform:translateX(-5%) skewX(-12deg);transition-duration:1s}
.demo-js .d-vigor .vg-head h2[data-rv].in{transform:none}
.d-vigor .vg-about-grid{display:grid;gap:clamp(44px,6vw,100px);align-items:start}
@media (min-width:980px){.d-vigor .vg-about-grid{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}.d-vigor .vg-about-grid.is-solo{grid-template-columns:minmax(0,1fr);max-width:1080px}}
.d-vigor .vg-about-pic{position:relative;margin:0 0 0 18px}
.d-vigor .vg-about-pic::before{content:"";position:absolute;left:-18px;top:18px;width:62%;height:78%;background:var(--blaze)}
.d-vigor .vg-about-pic>div{position:relative;aspect-ratio:4/5;overflow:hidden}
.d-vigor .vg-about-pic img{width:100%;height:118%;object-fit:cover;filter:grayscale(1) contrast(1.12);transform:translate3d(0,calc(-8% + var(--p,0) * -6%),0)}
.d-vigor .vg-about-pic figcaption{position:absolute;right:12px;bottom:12px;display:flex;gap:10px;padding:8px 12px;background:var(--ink);color:var(--chalk);font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.d-vigor .vg-about-copy{display:grid;gap:22px}
.d-vigor .vg-about-copy .vg-head{margin-bottom:8px}
.d-vigor .vg-lead{max-width:34ch;font-size:clamp(21px,1.9vw,30px);font-weight:500;line-height:1.3;letter-spacing:-.01em}
.d-vigor .vg-about-copy>p:not(.vg-lead){max-width:58ch;color:var(--dim)}
.d-vigor .vg-spec{margin-top:10px;border-top:2px solid var(--ink)}
.d-vigor .vg-spec li{display:grid;grid-template-columns:52px minmax(0,1fr);gap:12px;align-items:center;min-height:56px;border-bottom:1px solid var(--line);font-weight:600;transition:padding .4s var(--ease),background-color .3s}
.d-vigor .vg-spec li:hover{padding-left:12px;background:var(--paper)}
.d-vigor .vg-spec b{font-family:var(--disp);font-size:20px;font-weight:900;color:var(--blaze-d)}
.d-vigor .vg-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));margin-top:clamp(64px,8vw,120px);border-top:2px solid var(--ink)}
.d-vigor .vg-stats li{display:grid;gap:4px;padding:22px 20px 6px 0;border-right:1px solid var(--line)}
.d-vigor .vg-stats li:last-child{border-right:0}
@media (max-width:620px){.d-vigor .vg-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.d-vigor .vg-stats li{padding:18px 12px 14px 0;border-right:0;border-bottom:1px solid var(--line)}}
.d-vigor .vg-stats b{font-family:var(--disp);font-size:clamp(84px,10vw,168px);font-weight:900;line-height:.82;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.d-vigor .vg-stats li:first-child b{color:var(--blaze)}
.d-vigor .vg-stats span{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.d-vigor .vg-rows{border-top:2px solid var(--ink);counter-reset:r}
.d-vigor .vg-row{position:relative;display:grid;grid-template-columns:minmax(0,1fr);gap:10px 28px;padding:clamp(22px,2.4vw,34px) 0;border-bottom:1px solid var(--line);isolation:isolate}
.d-vigor .vg-row::before{content:"";position:absolute;inset:0 calc(var(--pad) * -1);z-index:-1;background:var(--ink);transform:scaleY(0);transform-origin:50% 100%;transition:transform .55s var(--snap)}
.d-vigor .vg-row-n{font-family:var(--disp);font-size:clamp(44px,4.4vw,72px);font-weight:900;line-height:.8;color:transparent;-webkit-text-stroke:1.5px var(--ink);transition:color .3s,-webkit-text-stroke-color .3s}
.d-vigor .vg-row h3{font-size:clamp(34px,4.6vw,76px);transition:transform .6s var(--ease),color .3s}
.d-vigor .vg-row-main p{max-width:56ch;margin-top:10px;color:var(--dim);transition:color .3s}
.d-vigor .vg-row-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start;align-content:flex-start}
.d-vigor .vg-row-meta span,.d-vigor .vg-row-meta b{display:inline-flex;align-items:center;min-height:32px;padding:0 12px;border:1px solid currentColor;font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
.d-vigor .vg-row-meta b{border-color:var(--blaze);background:var(--blaze);color:var(--ink)}
.d-vigor .vg-row-pic{position:relative;aspect-ratio:21/9;overflow:hidden;background:var(--ink)}
.d-vigor .vg-row-pic::after{content:"";position:absolute;left:0;bottom:0;width:34%;height:5px;background:var(--blaze)}
.d-vigor .vg-row-pic img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.2)}
@media (min-width:900px){.d-vigor .vg-row{grid-template-columns:110px minmax(0,1fr) minmax(170px,auto);align-items:start}.d-vigor .vg-row-meta{justify-content:flex-end;padding-top:6px}}
@media (min-width:600px) and (max-width:899px){.d-vigor .vg-row{grid-template-columns:minmax(0,1fr) 38%;align-items:start}.d-vigor .vg-row-pic{grid-column:2;grid-row:1/4;aspect-ratio:4/3}.d-vigor .vg-row>:not(.vg-row-pic){grid-column:1}}
@media (min-width:900px) and (hover:none),(min-width:900px) and (pointer:coarse){.d-vigor .vg-row-pic{grid-column:2/4}}
@media (min-width:900px) and (hover:hover) and (pointer:fine){
.d-vigor .vg-row-pic{position:absolute;right:clamp(200px,22vw,340px);top:50%;z-index:2;width:min(360px,26vw);aspect-ratio:4/3;clip-path:polygon(0 0,0 0,-18% 100%,-18% 100%);transform:translateY(-50%) rotate(-3deg);transition:clip-path .6s var(--snap),transform .6s var(--ease);pointer-events:none}
.d-vigor .vg-row-pic{background:var(--blaze)}.d-vigor .vg-row-pic::after{display:none}.d-vigor .vg-row-pic img{mix-blend-mode:multiply}
.d-vigor .vg-row:hover .vg-row-pic{clip-path:polygon(0 0,118% 0,100% 100%,-18% 100%);transform:translateY(-50%) rotate(0)}
.d-vigor .vg-row:hover::before{transform:scaleY(1)}
.d-vigor .vg-row>:not(.vg-row-pic){position:relative;z-index:3}
.d-vigor .vg-row:hover{color:var(--chalk)}
.d-vigor .vg-row:hover .vg-row-n{color:var(--blaze);-webkit-text-stroke-color:var(--blaze)}
.d-vigor .vg-row:hover h3{transform:translateX(16px)}
.d-vigor .vg-row:hover .vg-row-main p{color:var(--mute)}
}
.d-vigor .vg-sched{margin-top:clamp(64px,8vw,120px);padding:clamp(22px,3vw,48px);background:var(--ink);color:var(--chalk)}
.d-vigor .vg-sched-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:14px 32px;margin-bottom:26px}
.d-vigor .vg-sched-top h3{font-size:clamp(40px,5vw,80px)}
.d-vigor .vg-sched-top p{max-width:40ch;font-size:14px;color:var(--mute)}
.d-vigor .vg-days{display:grid;grid-template-columns:repeat(auto-fit,minmax(64px,1fr));gap:4px;margin-bottom:6px}
.d-vigor .vg-days button{position:relative;display:grid;justify-items:start;gap:2px;min-height:68px;padding:10px 12px;border:0;background:var(--char);color:var(--chalk);text-align:left;transition:background-color .3s,color .3s}
.d-vigor .vg-days button span{font-family:var(--disp);font-size:clamp(24px,2.4vw,34px);font-weight:900;line-height:1;text-transform:uppercase}
.d-vigor .vg-days button small{font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--mute)}
.d-vigor .vg-days button:hover{background:#2a2a2d}
.d-vigor .vg-days button[aria-selected="true"]{background:var(--blaze);color:var(--ink)}
.d-vigor .vg-days button[aria-selected="true"] small{color:var(--ink)}
.d-vigor .vg-days button.is-today::after{content:"";position:absolute;right:10px;top:10px;width:8px;height:8px;border-radius:50%;background:currentColor}
.d-vigor .vg-day li{display:grid;grid-template-columns:minmax(0,1fr);gap:4px 24px;padding:18px 0;border-bottom:1px solid var(--line-d);animation:vg-up .5s var(--ease) both;animation-delay:calc(var(--i,0) * 60ms)}
.d-vigor .vg-day li>span{font-family:var(--disp);font-size:20px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:var(--blaze)}
.d-vigor .vg-day li b{font-family:var(--disp);font-size:clamp(26px,2.4vw,36px);font-weight:900;line-height:1;text-transform:uppercase}
.d-vigor .vg-day li p{font-size:15px;color:var(--mute)}
@media (min-width:860px){.d-vigor .vg-day li{grid-template-columns:240px minmax(0,1fr) minmax(0,1.2fr);align-items:baseline}}
.d-vigor .vg-pill-grid{display:grid;gap:4px;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))}
.d-vigor .vg-pill{position:relative;display:grid;gap:18px;align-content:start;min-height:300px;padding:clamp(24px,2.6vw,38px);background:var(--char);overflow:hidden;isolation:isolate;transition:color .35s}
.d-vigor .vg-pill::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--blaze);transform:translateY(118%) skewY(-6deg);transform-origin:0 100%;transition:transform .6s var(--snap)}
.d-vigor .vg-pill:hover{color:var(--ink)}
.d-vigor .vg-pill:hover::before{transform:none}
@media (max-width:620px){.d-vigor .vg-pill{min-height:0}}
.d-vigor .vg-pill-n{position:absolute;right:18px;top:6px;font-family:var(--disp);font-size:96px;font-weight:900;line-height:1;color:transparent;-webkit-text-stroke:1.5px rgba(237,236,232,.18);transition:-webkit-text-stroke-color .3s}
.d-vigor .vg-pill:hover .vg-pill-n{-webkit-text-stroke-color:rgba(12,12,13,.35)}
.d-vigor .vg-pill-ico{display:grid;place-items:center;width:54px;height:54px;background:var(--blaze);color:var(--ink);transition:background-color .3s,color .3s,transform .6s var(--ease)}
.d-vigor .vg-pill:hover .vg-pill-ico{background:var(--ink);color:var(--blaze);transform:rotate(-8deg)}
.d-vigor .vg-pill-ico svg{width:26px;height:26px}
.d-vigor .vg-pill h3{margin-top:auto;padding-top:14px;font-size:clamp(28px,2.6vw,40px)}
.d-vigor .vg-pill p{color:var(--mute);transition:color .3s}
.d-vigor .vg-pill:hover p{color:rgba(12,12,13,.78)}
.d-vigor .vg-track{position:relative;--fill:0}
.d-vigor .vg-track-line{position:absolute;left:21px;top:0;bottom:0;width:3px;background:var(--line)}
.d-vigor .vg-track-line i{position:absolute;inset:0;background:var(--blaze);transform:scaleY(var(--fill));transform-origin:50% 0}
.d-vigor .vg-track ol{display:grid;gap:clamp(34px,4vw,54px)}
.d-vigor .vg-track li{position:relative;display:grid;gap:10px;padding-left:72px}
.d-vigor .vg-track li>b{position:absolute;left:0;top:-6px;display:grid;place-items:center;width:45px;height:45px;background:var(--chalk);border:3px solid var(--line);font-family:var(--disp);font-size:20px;font-weight:900;transition:background-color .4s,border-color .4s,transform .5s var(--ease)}
.d-vigor .vg-track li.on>b{background:var(--blaze);border-color:var(--blaze);transform:rotate(-8deg)}
.d-vigor .vg-track h3{font-size:clamp(28px,2.6vw,42px)}
.d-vigor .vg-track p{max-width:40ch;color:var(--dim)}
@media (min-width:900px){.d-vigor .vg-track{padding-top:76px}.d-vigor .vg-track-line{left:0;right:0;top:20px;bottom:auto;width:auto;height:3px}.d-vigor .vg-track-line i{transform:scaleX(var(--fill));transform-origin:0 50%}.d-vigor .vg-track ol{grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:36px}.d-vigor .vg-track li{padding-left:0}.d-vigor .vg-track li>b{top:-76px}}
.d-vigor .vg-bibs{display:grid;gap:clamp(20px,2.6vw,36px);grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));align-items:start}
.d-vigor .vg-bib{--h:var(--ink);position:relative;display:grid;gap:16px;align-content:start;padding:clamp(40px,3.6vw,52px) clamp(22px,2.4vw,34px) clamp(26px,2.6vw,36px);background:radial-gradient(circle at 18px 18px,var(--h) 0 6px,transparent 7px),radial-gradient(circle at calc(100% - 18px) 18px,var(--h) 0 6px,transparent 7px),radial-gradient(circle at 18px calc(100% - 18px),var(--h) 0 6px,transparent 7px),radial-gradient(circle at calc(100% - 18px) calc(100% - 18px),var(--h) 0 6px,transparent 7px),var(--paper);color:var(--ink);transform:rotate(var(--r,-.8deg));transition:transform .6s var(--ease)}
.d-vigor .vg-bib:nth-child(even){--r:.9deg}
.d-vigor .vg-bib:hover{transform:rotate(0) translateY(-8px)}
.d-vigor .vg-bib.is-hot{background:radial-gradient(circle at 18px 18px,var(--h) 0 6px,transparent 7px),radial-gradient(circle at calc(100% - 18px) 18px,var(--h) 0 6px,transparent 7px),radial-gradient(circle at 18px calc(100% - 18px),var(--h) 0 6px,transparent 7px),radial-gradient(circle at calc(100% - 18px) calc(100% - 18px),var(--h) 0 6px,transparent 7px),var(--blaze)}
.d-vigor .vg-bib>header{display:flex;justify-content:space-between;gap:12px;padding-bottom:10px;border-bottom:2px solid var(--ink);font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}
.d-vigor .vg-bib>header span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-vigor .vg-bib h3{font-size:clamp(30px,2.8vw,44px)}
.d-vigor .vg-bib-price{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px}
.d-vigor .vg-bib-price b{font-family:var(--disp);font-size:clamp(64px,6vw,96px);font-weight:900;line-height:.85;letter-spacing:-.02em}
.d-vigor .vg-bib-price span{font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.d-vigor .vg-bib-tag{position:absolute;right:16px;top:-14px;padding:6px 12px;background:var(--ink);color:var(--blaze);font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;transform:rotate(3deg)}
.d-vigor .vg-bib>p:not([class]){color:rgba(12,12,13,.8)}
.d-vigor .vg-bib ul{display:grid;gap:8px;padding-top:14px;border-top:1px dashed rgba(12,12,13,.3)}
.d-vigor .vg-bib li{position:relative;padding-left:24px;font-weight:500}
.d-vigor .vg-bib li::before{content:"";position:absolute;left:0;top:.5em;width:12px;height:8px;background:var(--ink);transform:skewX(-20deg)}
.d-vigor .vg-bib.is-hot li::before{background:var(--paper)}
.d-vigor .vg-bib-go{display:flex;justify-content:space-between;align-items:center;min-height:50px;margin-top:6px;padding:0 16px;background:var(--ink);color:var(--chalk);font-family:var(--disp);font-size:19px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;transition:background-color .3s,color .3s}
.d-vigor .vg-bib-go:hover{background:var(--chalk);color:var(--ink)}
.d-vigor .vg-bib-go svg{width:20px;height:20px}
.d-vigor .vg-fine{margin-top:clamp(32px,4vw,52px);font-size:13px;letter-spacing:.06em;color:var(--mute)}
.d-vigor .vg-sec:not(.is-ink) .vg-fine{color:var(--dim)}
.d-vigor .vg-crew-grid{display:grid;gap:clamp(18px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))}
.d-vigor .vg-coach{display:grid;gap:14px;align-content:start}
.d-vigor .vg-coach figure{position:relative;aspect-ratio:3/4;overflow:hidden;background:var(--blaze)}
.d-vigor .vg-coach img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.15);transition:transform 1s var(--ease),mix-blend-mode 0s}
.d-vigor .vg-coach:hover img{mix-blend-mode:multiply;transform:scale(1.05)}
.d-vigor .vg-coach .vg-init{display:grid;place-items:center;aspect-ratio:3/4;background:var(--ink);color:transparent;font-family:var(--disp);font-size:clamp(140px,16vw,220px);font-weight:900;-webkit-text-stroke:2px var(--blaze)}
.d-vigor .vg-role{font-size:12px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--blaze-d)}
.d-vigor .vg-coach h3{font-size:clamp(30px,2.6vw,40px)}
.d-vigor .vg-coach p:last-child:not(.vg-role){color:var(--dim)}
.d-vigor .vg-cols{display:grid;gap:clamp(8px,1vw,16px);grid-template-columns:repeat(2,minmax(0,1fr))}
.d-vigor .vg-col{display:grid;gap:clamp(8px,1vw,16px);align-content:start}
.d-vigor .vg-col figure{position:relative;overflow:hidden;background:var(--blaze)}
.d-vigor .vg-col figure:nth-child(odd){aspect-ratio:4/5}
.d-vigor .vg-col figure:nth-child(even){aspect-ratio:1}
.d-vigor .vg-col img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.12);transition:transform 1.1s var(--ease),opacity .4s}
.d-vigor .vg-col figure:hover img{transform:scale(1.06);opacity:.86}
.d-vigor .vg-col figure::after{content:"";position:absolute;inset:0;border:0 solid var(--blaze);transition:border-width .35s var(--ease)}
.d-vigor .vg-col figure:hover::after{border-width:8px}
@media (max-width:767px){.d-vigor .vg-col.is-c3{grid-column:1/-1;grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:768px){.d-vigor .vg-cols{grid-template-columns:repeat(3,minmax(0,1fr))}.d-vigor .vg-col{transform:translate3d(0,calc(var(--p,0) * var(--f,0) * 1px),0)}.d-vigor .vg-col.is-c2{margin-top:80px}}
.d-vigor .vg-board{display:grid;gap:clamp(40px,5vw,90px);align-items:start}
@media (min-width:980px){.d-vigor .vg-board{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-vigor .vg-board-copy{display:grid;gap:22px}
.d-vigor .vg-board-copy .vg-head{margin-bottom:0}
.d-vigor .vg-board-copy h2,.d-vigor .vg-split-copy h2{font-size:clamp(42px,5vw,84px)}
.d-vigor .vg-board-copy>p{max-width:48ch;color:var(--dim)}
.d-vigor .vg-score{padding:clamp(22px,2.8vw,40px);background:var(--ink);color:var(--chalk)}
.d-vigor .vg-score-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px}
.d-vigor .vg-score-top h3{font-size:clamp(30px,3vw,46px)}
.d-vigor .vg-score .z-hours{border-color:var(--line-d)}
.d-vigor .vg-score .z-hours div{align-items:baseline;padding:14px 0;border-color:var(--line-d)}
.d-vigor .vg-score .z-hours div{gap:12px}
@media (max-width:420px){.d-vigor .vg-score .z-hours dd{font-size:21px}.d-vigor .vg-score .z-hours dt{font-size:11.5px;letter-spacing:.08em}}
.d-vigor .vg-score .z-hours dt{font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.d-vigor .vg-score .z-hours dd{white-space:nowrap;font-family:var(--disp);font-size:clamp(24px,2.4vw,34px);font-weight:800;line-height:1;color:var(--chalk);font-variant-numeric:tabular-nums}
.d-vigor .z-hours div.is-today{position:relative;margin-inline:-14px;padding-inline:14px;background:var(--blaze);color:var(--ink);border-color:transparent}
.d-vigor .z-hours div.is-today dd{color:var(--ink)}
.d-vigor .vg-split{display:grid;gap:clamp(40px,5vw,90px);align-items:start}
@media (min-width:980px){.d-vigor .vg-split{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-vigor .vg-split-copy{display:grid;gap:22px}
.d-vigor .vg-split-copy .vg-head{margin-bottom:0}
.d-vigor .vg-split-copy>p{max-width:46ch;color:var(--dim)}
.d-vigor .is-ink .vg-split-copy>p{color:var(--mute)}
.d-vigor .is-ink .z-hours,.d-vigor .is-ink .z-hours div{border-color:var(--line-d)}
.d-vigor .is-ink .z-hours dd,.d-vigor .is-ink .z-reach{color:var(--mute)}
.d-vigor .is-ink .z-reach a{color:var(--chalk)}
.d-vigor .z-reach .z-route{color:var(--blaze-d);font-weight:700}
.d-vigor .is-ink .z-reach .z-route{color:var(--blaze)}
.d-vigor .vg-panel{position:relative;padding:clamp(26px,3.2vw,48px);background:var(--paper);color:var(--ink)}
.d-vigor .is-paper .vg-panel{background:var(--chalk)}
.d-vigor .vg-panel-top{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:calc(clamp(26px,3.2vw,48px) * -1) calc(clamp(26px,3.2vw,48px) * -1) 28px;padding:16px clamp(26px,3.2vw,48px);background:var(--blaze);color:var(--ink);font-family:var(--disp);font-size:clamp(24px,2.2vw,32px);font-weight:900;text-transform:uppercase;line-height:1}
.d-vigor .vg-panel-top small{font-family:"Archivo",sans-serif;font-size:11px;font-weight:800;letter-spacing:.18em}
.d-vigor .z-field label{font-size:11.5px;font-weight:800;letter-spacing:.16em;color:var(--ink)}
.d-vigor .z-field input,.d-vigor .z-field select,.d-vigor .z-field textarea{min-height:54px;border:0;border-bottom:2px solid var(--ink);background:rgba(12,12,13,.04);color:var(--ink);transition:background-color .3s,border-color .3s}
.d-vigor .z-field input:focus,.d-vigor .z-field select:focus,.d-vigor .z-field textarea:focus{background:rgba(255,75,18,.08);border-color:var(--blaze)}
.d-vigor .z-field :focus-visible{outline:none}
.d-vigor .form-note{color:var(--dim)}
.d-vigor .form-status{border:0;background:var(--ink);color:var(--chalk)}
.d-vigor .z-chips button{font-family:var(--disp);font-weight:800;border-color:var(--ink)}
.d-vigor .z-acc{border-top:2px solid var(--ink)}
.d-vigor .z-acc summary{font-family:var(--disp);font-size:clamp(22px,2vw,30px);font-weight:800;text-transform:uppercase;line-height:1.05;transition:padding .4s var(--ease),color .3s}
.d-vigor .z-acc summary:hover{padding-left:10px}
.d-vigor .z-acc summary i{width:18px;height:18px}
.d-vigor .z-acc summary i::before,.d-vigor .z-acc summary i::after{height:3px;background:var(--blaze)}
.d-vigor .z-acc details[open] summary{color:var(--blaze-d)}
.d-vigor .z-faq .z-head h2,.d-vigor .z-head h2{font-size:clamp(44px,6.4vw,108px)}
.d-vigor .z-head .vg-kick{color:var(--ink)}
.d-vigor .z-sec.z-cta{background:var(--blaze);color:var(--ink);overflow:hidden}
.d-vigor .z-cta h2{font-size:clamp(52px,9vw,160px);max-width:14ch}
.d-vigor .z-cta h2 em{background:none;color:transparent;-webkit-text-stroke:2px var(--ink)}
.d-vigor .z-cta .z-center>p{color:rgba(12,12,13,.8)}
.d-vigor .z-cta .vg-fill{background:var(--ink);color:var(--chalk)}
.d-vigor .z-cta .vg-fill::before{background:var(--chalk)}
.d-vigor .z-cta .vg-fill:hover{color:var(--ink)}
.d-vigor .z-statement{background:var(--ink);color:var(--chalk)}
.d-vigor .z-statement h2{font-size:var(--z-statement);line-height:.92;max-width:18ch}
.d-vigor .z-statement h2 em{background:none;color:var(--blaze)}
.d-vigor .z-statement .vg-kick{color:var(--mute)}
.d-vigor .z-showcase .z-show-media img{filter:grayscale(1) contrast(1.15)}
.d-vigor .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(12,12,13,.1),rgba(12,12,13,.86))}
.d-vigor .z-show-in h2{font-size:clamp(48px,8vw,140px)}
.d-vigor .z-show-in h2 em{background:none;color:var(--blaze)}
.d-vigor .z-showcase:not(.has-pic){background:var(--ink);color:var(--chalk)}
.d-vigor .z-showcase .vg-line{color:var(--chalk)}
.d-vigor .z-card,.d-vigor .z-panel,.d-vigor .z-channel{border:0;background:var(--paper)}
.d-vigor .z-channel{position:relative;transition:background-color .3s,color .3s}
.d-vigor .z-channel:hover{background:var(--ink);color:var(--chalk)}
.d-vigor .z-channel:hover p{color:var(--mute)}
.d-vigor .z-ico{border:0;background:var(--blaze);color:var(--ink)}
.d-vigor .z-pack.is-featured{background:var(--blaze)}
.d-vigor .z-steps,.d-vigor .z-rows{border-top:2px solid var(--ink)}
.d-vigor .z-steps small,.d-vigor .z-rows small{font-family:var(--disp);font-size:28px;font-weight:900;letter-spacing:0;color:var(--blaze-d)}
.d-vigor .z-quotes blockquote{padding:26px;border-top:0;background:var(--paper)}
.d-vigor .z-quotes blockquote>p{font-family:"Archivo",sans-serif;font-size:clamp(18px,1.5vw,22px);font-weight:500}
.d-vigor .z-pic img{filter:grayscale(1) contrast(1.12)}
.d-vigor .z-ba img{filter:grayscale(1)}
.d-vigor .z-ba::after{background:var(--blaze);width:4px}
.d-vigor .z-ticks li::before{height:3px;background:var(--blaze)}
.d-vigor .z-price{color:var(--ink);font-weight:700}
.d-vigor .vg-foot{position:relative;padding:clamp(90px,10vw,150px) 0 140px;background:var(--ink);color:var(--chalk);overflow:hidden}
.d-vigor .vg-foot-cta{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:28px;padding-bottom:clamp(40px,5vw,64px);border-bottom:1px solid var(--line-d)}
.d-vigor .vg-foot-cta p{max-width:18ch;font-family:var(--disp);font-size:clamp(40px,5.6vw,92px);font-weight:900;line-height:.88;text-transform:uppercase}
.d-vigor .vg-foot-name{margin-top:clamp(32px,4vw,56px);font-family:var(--disp);font-size:min(22vw,calc(168vw / var(--n,8)),calc(2600px / var(--n,8)));font-weight:900;line-height:.8;letter-spacing:-.02em;text-transform:uppercase;white-space:nowrap;color:transparent;-webkit-text-stroke:1.5px rgba(237,236,232,.35);background:linear-gradient(90deg,var(--blaze) 0 50%,transparent 50% 100%) no-repeat;background-size:200% 100%;background-position:calc(clamp(0,var(--p,0) * 1.6 - .1,1) * 100%) 0;-webkit-background-clip:text;background-clip:text}
.d-vigor .vg-foot-grid{display:grid;gap:34px;margin-top:clamp(44px,5vw,72px);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-vigor .vg-foot-grid h3{margin-bottom:14px;font-family:"Archivo",sans-serif;font-size:11.5px;font-weight:800;letter-spacing:.2em;color:var(--blaze)}
.d-vigor .vg-foot-grid a,.d-vigor .vg-foot-grid span{display:flex;align-items:center;min-height:34px;color:rgba(237,236,232,.86);transition:color .25s,transform .35s var(--ease)}
.d-vigor .vg-foot-grid a:hover{color:var(--blaze);transform:translateX(6px)}
.d-vigor .vg-foot-grid>p{max-width:36ch;color:var(--mute)}
.d-vigor .vg-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;padding-top:22px;border-top:1px solid var(--line-d);font-size:12.5px;color:var(--mute)}
.d-vigor.no-photos .vg-row-pic{display:none}
@keyframes vg-shut{to{transform:scaleY(0)}}
@keyframes vg-zoom{from{transform:scale(1.16)}to{transform:none}}
@keyframes vg-dash{0%{opacity:0;transform:translateX(-28%) skewX(-24deg)}55%{opacity:1}100%{opacity:1;transform:none}}
@keyframes vg-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
@keyframes vg-in{from{opacity:0;transform:translateX(60px) skewX(-10deg)}to{opacity:1;transform:none}}
@keyframes vg-fade{from{opacity:0}to{opacity:1}}
@keyframes vg-ghost{from{opacity:0;transform:translateX(-12%)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.d-vigor .vg-shutter{display:none}.d-vigor .vg-ln>span,.d-vigor .vg-hero-media img,.d-vigor .vg-tagrow,.d-vigor .vg-hero-row,.d-vigor .vg-heat,.d-vigor .vg-ghost{animation:none}.d-vigor .vg-col,.d-vigor .vg-hero-media figure,.d-vigor .vg-about-pic img{transform:none}.d-vigor .vg-about-pic img{height:100%}}
`
  .trim()
  .split("\n");
/* Rules for the kit's own sections and forms come after the shared defaults (they would lose a tie in order). */
const KIT = /\.z-|\.form-/;
const CSS = RULES.filter((r) => !KIT.test(r)).join("");
const EXTRA = RULES.filter((r) => KIT.test(r)).join("");

/**
 * Scroll progress for the pace bar, the band that skews with the speed of the scroll, the
 * track that fills, numbers that count up to the real count, magnetic buttons on a mouse,
 * and the schedule opening on today's tab. All in one animation frame per scroll.
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-vigor');if(!root)return;
var mm=function(s){return W.matchMedia&&W.matchMedia(s).matches},reduce=mm('(prefers-reduced-motion: reduce)'),fine=mm('(hover: hover) and (pointer: fine)');
var q=function(s){return [].slice.call(d.querySelectorAll(s))};
var bands=q('.vg-band-track'),tracks=q('[data-track]'),last=W.scrollY,vel=0,raf=0;
function frame(){raf=0;var y=W.scrollY,vh=W.innerHeight,h=d.documentElement.scrollHeight-vh;root.style.setProperty('--pg',(h>0?Math.min(1,y/h):0).toFixed(4));
var dv=y-last;last=y;vel+=(dv-vel)*.25;
if(!reduce)bands.forEach(function(b,k){var w=b.scrollWidth/2;if(!w)return;var x=-((y*.5+k*240)%w);b.style.transform='translate3d('+x.toFixed(1)+'px,0,0) skewX('+Math.max(-16,Math.min(16,-vel*.4)).toFixed(2)+'deg)'});
tracks.forEach(function(t){var r=t.getBoundingClientRect();if(r.bottom<-vh||r.top>vh*2)return;var p=reduce?1:Math.max(0,Math.min(1,(vh*.72-r.top)/(r.height+vh*.1)));t.style.setProperty('--fill',p.toFixed(3));var li=t.querySelectorAll('li');for(var n=0;n<li.length;n++)li[n].classList.toggle('on',p>=(n+.3)/li.length)});
if(Math.abs(vel)>.2)raf=requestAnimationFrame(frame)}
function on(){if(!raf)raf=requestAnimationFrame(frame)}
frame();W.addEventListener('scroll',on,{passive:true});W.addEventListener('resize',on);
var cs=q('[data-count]');if(cs.length&&!reduce&&'IntersectionObserver' in W){var pad=function(v){return (v<10?'0':'')+v};var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);var el=e.target,n=+el.getAttribute('data-count'),t0=0;el.textContent=pad(0);function step(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1400);el.textContent=pad(Math.round(n*(1-Math.pow(1-k,4))));if(k<1)requestAnimationFrame(step)}requestAnimationFrame(step)})},{threshold:.5,rootMargin:'0px 0px -10% 0px'});cs.forEach(function(el){io.observe(el)})}
if(fine&&!reduce)q('[data-mag]').forEach(function(m){m.addEventListener('pointermove',function(e){var r=m.getBoundingClientRect();m.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.34).toFixed(1)+'px)'});m.addEventListener('pointerleave',function(){m.style.transform=''})});
var now=new Date().getDay();try{var wd=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Amsterdam',weekday:'short'}).format(new Date());now=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(wd)}catch(e){}
q('.vg-days').forEach(function(l){var b=l.querySelector('[data-day="'+now+'"]');if(b){b.classList.add('is-today');b.click()}})})();`;

/* Labels the design adds itself, per language. */
const LABELS = {
  nl: { schedule: "Rooster", classes: "lessen", scheduleNote: "Zoals vermeld bij elk programma.", days: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"], pick: "Kies", start: "Startlijst" },
  en: { schedule: "Schedule", classes: "classes", scheduleNote: "As listed with each programme.", days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], pick: "Choose", start: "Start list" },
  de: { schedule: "Stundenplan", classes: "Kurse", scheduleNote: "Wie bei jedem Programm angegeben.", days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], pick: "Wählen", start: "Startliste" },
  fr: { schedule: "Planning", classes: "cours", scheduleNote: "Comme indiqué pour chaque programme.", days: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"], pick: "Choisir", start: "Liste de départ" },
};
const L = (c: Ctx) => LABELS[c.spec.meta.lang as keyof typeof LABELS] ?? LABELS.en;

const pad = (n: number) => String(n).padStart(2, "0");
const clean = (s: string) => s.replace(/\*/g, "");

/* ── Days written next to a service ("Di & do · 07:00", "Maandag t/m vrijdag") ─────────── */
const FULL: [RegExp, number][] = [
  [/^(maandag|monday|montag|lundi)/, 1],
  [/^(dinsdag|tuesday|dienstag|mardi)/, 2],
  [/^(woensdag|wednesday|mittwoch|mercredi)/, 3],
  [/^(donderdag|thursday|donnerstag|jeudi)/, 4],
  [/^(vrijdag|friday|freitag|vendredi)/, 5],
  [/^(zaterdag|saturday|samstag|samedi)/, 6],
  [/^(zondag|sunday|sonntag|dimanche)/, 0],
];
const SHORT: Record<string, number> = { ma: 1, di: 2, wo: 3, do: 4, vr: 5, za: 6, zo: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 0 };

/** The weekdays a text names (0 = Sunday). Abbreviations only count in the short duration field. */
export function daysIn(text: string, short: boolean): number[] {
  const hits: { at: number; end: number; day: number }[] = [];
  const re = /[a-zäöüéèû]+/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const w = m[0].toLowerCase();
    const full = FULL.find(([r]) => r.test(w));
    const day = full ? full[1] : short && w in SHORT ? SHORT[w] : null;
    if (day != null) hits.push({ at: m.index, end: m.index + m[0].length, day });
  }
  const out = new Set<number>();
  hits.forEach((h, k) => {
    out.add(h.day);
    const next = hits[k + 1];
    // "ma–vr", "maandag t/m vrijdag", "mon to fri": everything in between.
    if (next && /^\s*(?:–|—|-|t\/m|tot en met|to|bis|à|au)\s*$/i.test(text.slice(h.end, next.at))) {
      for (let d = (h.day + 1) % 7, g = 0; d !== next.day && g < 7; d = (d + 1) % 7, g++) out.add(d);
    }
  });
  return [...out];
}

type Svc = SectionOf<"services">["items"][number];
function schedule(items: Svc[]) {
  const by = new Map<number, Svc[]>();
  for (const it of items) {
    const days = new Set([...daysIn(it.duration ?? "", true), ...daysIn(it.description, false)]);
    days.forEach((d) => by.set(d, [...(by.get(d) ?? []), it]));
  }
  return [1, 2, 3, 4, 5, 6, 0].filter((d) => by.has(d)).map((d) => ({ day: d, items: by.get(d)! }));
}

/** Where a call to action on a card should lead: the booking or contact section, if there is one. */
const target = (spec: SiteSpec) => spec.sections.find((s) => s.type === "booking")?.id ?? spec.sections.find((s) => s.type === "contact")?.id;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
    <path d="M3 12h17M13 5l7 7-7 7" />
  </svg>
);

function Head({ kicker, title, intro, id, row }: { kicker?: string; title: string; intro?: string; id?: string; row?: boolean }) {
  return (
    <header className={`vg-head${row && intro ? " is-row" : ""}`}>
      {kicker ? (
        <p className="vg-kick" data-rv>
          <i aria-hidden="true" />
          {kicker}
        </p>
      ) : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

const Mag = ({ children }: { children: ReactNode }) => (
  <span className="vg-mag" data-mag>
    {children}
  </span>
);

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const over = Boolean(c.photo(c.spec.hero.image));
  return (
    <>
      <header className={`vg-hdr hdr${over ? " is-over" : ""}`}>
        <div className="vg-wrap vg-bar">
          <a href="#top" className="vg-logo" aria-label={c.name}>
            <i aria-hidden="true" />
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="vg-links" data-nav>
            {c.nav.slice(0, 4).map((n, k) => (
              <a key={n.id} href={`#${n.id}`}>
                <small>{pad(k + 1)}</small>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn vg-fill vg-hcta">
            {cta.label}
          </a>
          <button type="button" className="vg-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <b aria-hidden="true" />
          </button>
        </div>
        <span className="vg-pace" aria-hidden="true" />
      </header>
      <div id="site-menu" className="vg-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{pad(k + 1)}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="vg-menu-foot">
          <a href={cta.href} className="vg-menu-cta">
            {cta.label}
            <Arrow />
          </a>
          <p>
            {b.address ?? b.city}
            {b.phone ? (
              <>
                {" · "}
                <a href={tel(b.phone)}>{b.phone}</a>
              </>
            ) : null}
          </p>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = clean(hero.headline);
  const size = plain.length > 44 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const { lines } = splitLines(hero.headline, plain.length > 34 ? 3 : 2);
  const facts = heroFacts(c);
  const words = offerWords(c, 6);
  const h1 = (
    <h1 className={`vg-h1${size ? ` ${size}` : ""}`}>
      {lines.map((line, n) => (
        <span className="vg-ln" key={n}>
          <span style={i(n)}>{line}</span>
        </span>
      ))}
    </h1>
  );
  const tags = (
    <div className="vg-tagrow">
      {hero.eyebrow ? <span className="vg-tag">{hero.eyebrow}</span> : null}
      <NowBadge c={c} className="vg-now" />
    </div>
  );
  const row = (
    <div className="vg-hero-row">
      <div>
        <p className="vg-lede">{hero.subheadline}</p>
        <div className="vg-ctas">
          <Mag>
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label} <Arrow />
            </Btn>
          </Mag>
          {hero.secondaryCta ? (
            <Btn c={c} href={hero.secondaryCta.href} variant="text">
              {hero.secondaryCta.label}
            </Btn>
          ) : null}
        </div>
      </div>
      {facts.length > 0 && (
        <dl className="vg-facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
  if (!p) {
    return (
      <section className="vg-hero is-plain">
        <div className="vg-lanes" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <p className="vg-ghost" aria-hidden="true" style={css({ "--n": Math.max(5, c.name.length) })}>
          {c.name}
        </p>
        <div className="vg-wrap vg-hero-in">
          <div className="vg-plain-grid">
            <div className="vg-hero-in" style={{ padding: 0 }}>
              {tags}
              {h1}
            </div>
            {words.length > 1 ? (
              <div className="vg-heat" aria-hidden="true">
                <p className="vg-heat-h">
                  {L(c).start}
                  <small>{c.spec.business.city ?? ""}</small>
                </p>
                <ol>
                  {words.map((w, n) => (
                    <li key={w}>
                      <b>{n + 1}</b>
                      {w}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
          {row}
        </div>
      </section>
    );
  }
  return (
    <section className="vg-hero">
      <div className="vg-hero-media">
        <figure data-px>
          <Pic p={p} eager sizes="100vw" />
        </figure>
      </div>
      <div className="vg-lanes" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="vg-shutter" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <span key={n} style={i(n)} />
        ))}
      </div>
      {hero.note ? (
        <p className="vg-note" aria-hidden="true">
          {hero.note}
        </p>
      ) : null}
      <div className="vg-wrap vg-hero-in">
        {tags}
        {h1}
        {row}
      </div>
    </section>
  );
}

/** A band of the club's own programme names that skews with the speed of the scroll. */
function Band({ c }: { c: Ctx }) {
  const words = offerWords(c, 8);
  if (words.length < 3) return null;
  const run = [...words, ...words];
  return (
    <div className="vg-band" aria-hidden="true">
      <div className="vg-band-track">
        {[...run, ...run].map((w, n) => (
          <span key={n}>{w}</span>
        ))}
      </div>
    </div>
  );
}

/** Real counts of what the page lists, labelled with the section's own title. */
function stats(c: Ctx) {
  const out: { n: number; label: string }[] = [];
  for (const s of c.spec.sections) {
    if (s.type === "services") out.push({ n: s.items.length, label: clean(s.title) });
    if (s.type === "packages") out.push({ n: s.items.length, label: clean(s.title) });
    if (s.type === "team") out.push({ n: s.members.length, label: clean(s.title) });
  }
  return out.filter((x) => x.n > 1 && x.label.length <= 34).slice(0, 3);
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="vg-foot">
      <div className="vg-wrap">
        <div className="vg-foot-cta">
          <p>{c.spec.business.tagline || c.name}</p>
          <Mag>
            <a href={cta.href} className="btn vg-fill">
              {cta.label} <Arrow />
            </a>
          </Mag>
        </div>
        <p className="vg-foot-name" aria-hidden="true" data-px style={css({ "--n": Math.max(5, c.name.length) })}>
          {c.name}
        </p>
        <div className="vg-foot-grid">
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
          {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
        </div>
        <Legal c={c} className="vg-legal" />
      </div>
    </footer>
  );
}

export const vigor: Family = {
  key: "vigor",
  root: "d-vigor",
  fonts: ["Big Shoulders Display", "Archivo"],
  themeColor: "#0c0c0d",
  accent: "#ff4b12",
  onAccent: "#0c0c0d",
  css: CSS,
  extra: EXTRA,
  js: JS + TODAY_JS,
  cls: { wrap: "vg-wrap", eyebrow: "vg-kick", btn: "vg-fill", btnAlt: "vg-line", btnText: "vg-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      const st = stats(c);
      return (
        <>
          <Band c={c} />
          <section className="vg-sec" id={s.id}>
            <div className={`vg-wrap vg-about-grid${p ? "" : " is-solo"}`}>
              {p ? (
                <figure className="vg-about-pic" data-rv>
                  <div data-px>
                    <Pic p={p} sizes="(min-width: 980px) 38vw, 92vw" />
                  </div>
                  <figcaption aria-hidden="true">
                    <span>{c.name}</span>
                    {c.spec.business.city ? <span>{c.spec.business.city}</span> : null}
                  </figcaption>
                </figure>
              ) : null}
              <div className="vg-about-copy">
                <Head kicker={c.t.kick.about} title={s.title} />
                <p className="vg-lead" data-rv>
                  {first}
                </p>
                {rest.map((x, n) => (
                  <p key={n} data-rv>
                    {x}
                  </p>
                ))}
                {s.highlights.length > 0 && (
                  <ul className="vg-spec" data-rv>
                    {s.highlights.map((h, n) => (
                      <li key={h}>
                        <b>/{pad(n + 1)}</b>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {st.length > 1 ? (
              <div className="vg-wrap">
                <ul className="vg-stats">
                  {st.map((x) => (
                    <li key={x.label} data-rv>
                      <b data-count={x.n}>{pad(x.n)}</b>
                      <span>{x.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        </>
      );
    },
    services: (s, c) => {
      const days = schedule(s.items);
      const l = L(c);
      return (
        <section className="vg-sec is-paper" id={s.id}>
          <div className="vg-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} row />
            <ol className="vg-rows">
              {s.items.map((it, n) => {
                const p = c.photo(`art:svc${n}`);
                return (
                  <li key={n} className="vg-row" data-rv style={i(n % 4)}>
                    <span className="vg-row-n" aria-hidden="true">
                      {pad(n + 1)}
                    </span>
                    <div className="vg-row-main">
                      <h3>{it.title}</h3>
                      <p>{it.description}</p>
                    </div>
                    {it.duration || it.price ? (
                      <p className="vg-row-meta">
                        {it.duration ? <span>{it.duration}</span> : null}
                        {it.price ? <b>{it.price}</b> : null}
                      </p>
                    ) : null}
                    {p ? (
                      <figure className="vg-row-pic">
                        <Pic p={p} sizes="(min-width: 900px) 26vw, 92vw" />
                      </figure>
                    ) : null}
                  </li>
                );
              })}
            </ol>
            {days.length > 0 ? (
              <div className="vg-sched" data-rv>
                <div className="vg-sched-top">
                  <h3>{l.schedule}</h3>
                  <p>{l.scheduleNote}</p>
                </div>
                <div className="vg-days" role="tablist" aria-label={l.schedule}>
                  {days.map((d, n) => (
                    <button key={d.day} type="button" role="tab" id={`${s.id}-day-${d.day}`} aria-controls={`${s.id}-dp-${d.day}`} aria-selected={n === 0} tabIndex={n === 0 ? 0 : -1} data-day={d.day}>
                      <span>{l.days[d.day]}</span>
                      <small>
                        {d.items.length} {l.classes}
                      </small>
                    </button>
                  ))}
                </div>
                {days.map((d, n) => (
                  <div key={d.day} className="vg-day" role="tabpanel" id={`${s.id}-dp-${d.day}`} aria-labelledby={`${s.id}-day-${d.day}`} hidden={n > 0}>
                    <ul>
                      {d.items.map((it, m) => (
                        <li key={m} style={i(m)}>
                          <span>{it.duration ?? ""}</span>
                          <b>{it.title}</b>
                          <p>{it.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="vg-sec is-ink" id={s.id}>
        <div className="vg-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} row />
          <ul className="vg-pill-grid">
            {s.items.map((it, n) => (
              <li key={n} className="vg-pill" data-rv style={i(n % 3)}>
                <span className="vg-pill-n" aria-hidden="true">
                  {pad(n + 1)}
                </span>
                <span className="vg-pill-ico">
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
      <section className="vg-sec" id={s.id}>
        <div className="vg-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} row />
          <div className="vg-track" data-track style={css({ "--n": s.steps.length })}>
            <span className="vg-track-line" aria-hidden="true">
              <i />
            </span>
            <ol>
              {s.steps.map((st, n) => (
                <li key={n} data-rv style={i(n)}>
                  <b aria-hidden="true">{pad(n + 1)}</b>
                  <h3>{st.title}</h3>
                  <p>{st.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    ),
    packages: (s, c) => {
      const go = target(c.spec);
      return (
        <section className="vg-sec is-ink" id={s.id}>
          <div className="vg-wrap">
            <Head kicker={c.t.kick.packages} title={s.title} intro={s.intro} row />
            <div className="vg-bibs">
              {s.items.map((it, n) => (
                <article key={n} className={`vg-bib${it.featured ? " is-hot" : ""}`} data-rv style={i(n % 3)}>
                  <header>
                    <span>{c.name}</span>
                    <span>№ {pad(n + 1)}</span>
                  </header>
                  {it.featured ? <p className="vg-bib-tag">{c.t.popular}</p> : null}
                  <h3>{it.name}</h3>
                  <p className="vg-bib-price">
                    {it.price ? (
                      <>
                        <b>{it.price}</b>
                        {it.unit ? <span>{it.unit}</span> : null}
                      </>
                    ) : (
                      <span>{c.t.onRequest}</span>
                    )}
                  </p>
                  {it.description ? <p>{it.description}</p> : null}
                  {it.features.length > 0 && (
                    <ul>
                      {it.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  )}
                  {go ? (
                    <a className="vg-bib-go" href={`#${go}`}>
                      {L(c).pick}
                      <Arrow />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
            {s.note ? (
              <p className="vg-fine" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    team: (s, c) => (
      <section className="vg-sec" id={s.id}>
        <div className="vg-wrap">
          <Head kicker={c.t.kick.team} title={s.title} intro={s.intro} row />
          <ul className="vg-crew-grid">
            {s.members.map((m, n) => {
              const p = c.photo(m.image);
              return (
                <li key={n} className="vg-coach" data-rv style={i(n % 3)}>
                  {p ? (
                    <figure>
                      <Pic p={p} sizes="(min-width: 900px) 30vw, 92vw" />
                    </figure>
                  ) : (
                    <span className="vg-init" aria-hidden="true">
                      {m.name.charAt(0)}
                    </span>
                  )}
                  <p className="vg-role">{m.role}</p>
                  <h3>{m.name}</h3>
                  {m.bio ? <p>{m.bio}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const cols: Photo[][] = [[], [], []];
      pics.slice(0, 9).forEach((p, n) => cols[n % 3].push(p));
      const speed = [-50, 70, -30];
      return (
        <section className="vg-sec is-ink" id={s.id} style={{ overflow: "hidden" }}>
          <div className="vg-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className="vg-cols">
              {cols
                .filter((col) => col.length)
                .map((col, k) => (
                  <div key={k} className={`vg-col is-c${k + 1}`} data-px style={css({ "--f": speed[k] })}>
                    {col.map((p, n) => (
                      <figure key={n} data-rv style={i(n)}>
                        <Pic p={p} sizes="(min-width: 768px) 32vw, 48vw" />
                      </figure>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="vg-sec is-paper" id={s.id}>
        <div className="vg-wrap vg-board">
          <div className="vg-board-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="vg-score vg-cut" data-rv>
            <div className="vg-score-top">
              <h3>{c.t.hours}</h3>
              <NowBadge c={c} className="vg-now" />
            </div>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="vg-sec is-ink" id={s.id}>
        <div className="vg-wrap vg-split">
          <div className="vg-split-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Hours c={c} />
            <Reach c={c} />
          </div>
          <div className="vg-panel vg-cut" data-rv>
            <p className="vg-panel-top">
              {c.t.submit[s.kind]}
              <small>{c.spec.business.city ?? ""}</small>
            </p>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="vg-sec" id={s.id}>
        <div className="vg-wrap vg-split">
          <div className="vg-split-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="vg-panel vg-cut" data-rv>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : null}
        </div>
      </section>
    ),
  },
};
