import type { ReactNode } from "react";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Apex: an original template (no portfolio demo). A dark, quiet showroom for performance and
 * exotic cars: near-black, warm white and one precise redline accent, a tall luxury display
 * face over a technical grotesk with tabular figures. The opening widens like a cinema screen
 * after a red scan line, the headline comes in at speed and a band of light slides over the
 * bodywork. Offers are inventory cards that tilt and reveal their details, specifications draw
 * their own bars (only values the business wrote, compared with each other), the gallery runs
 * sideways while you scroll, the process is a racing line and the opening hours sit on an
 * instrument dial with today's opening time. A redline in the header fills as you read.
 * Made for car dealers, specialists, detailers and garages; works for any business.
 */

const CSS = `
.d-apex{--bk:#0a0a0b;--bk2:#111113;--bk3:#19191c;--ink:#f3f1ec;--dim:#a19e98;--mute:#6f6c67;--line:rgba(243,241,236,.11);--line2:rgba(243,241,236,.24);--red:#e3122c;--red2:#ff3a4f;--pad:clamp(20px,4.4vw,76px);--ease:cubic-bezier(.16,1,.3,1);--snap:cubic-bezier(.77,0,.18,1);--dsp:"Italiana",Georgia,serif;--ui:"Archivo",system-ui,sans-serif;--z-bg2:var(--bk2);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--red);--z-on-accent:#fff;--z-display:var(--dsp);--z-display-weight:400;--z-radius:2px;--z-field-radius:0;--z-ico-radius:0;--z-sec:clamp(88px,11vw,170px);--z-h3:clamp(22px,1.9vw,30px);--z-statement:clamp(34px,4.8vw,78px);background:var(--bk);color:var(--ink);font-family:var(--ui);font-size:clamp(15px,1vw,17px);line-height:1.62;font-variant-numeric:tabular-nums}
.d-apex ::selection{background:var(--red);color:#fff}
.d-apex h1,.d-apex h2,.d-apex h3{font-family:var(--dsp);font-weight:400;line-height:.98;letter-spacing:.005em}
.d-apex h2{font-size:clamp(32px,5.8vw,96px);text-transform:uppercase;overflow-wrap:break-word}
.d-apex h2.is-long{font-size:clamp(32px,3.9vw,62px);line-height:1.04}
.d-apex h3{font-size:var(--z-h3);line-height:1.08}
.d-apex h1 em,.d-apex h2 em{font-style:normal;background:linear-gradient(var(--red),var(--red)) 0 94%/0 2px no-repeat;transition:background-size 1.2s var(--snap) .5s}
.d-apex h2.in em,.d-apex .z-head h2.in em,.d-apex h2:not([data-rv]) em{background-size:100% 2px}
.d-apex .ax-wrap{position:relative;width:min(100%,1520px);margin-inline:auto;padding-inline:var(--pad)}
.d-apex .ax-kick{display:flex;align-items:center;gap:14px;font-size:11.5px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--dim)}
.d-apex .ax-kick::before{content:"";flex:none;width:28px;height:1px;background:var(--red);transform-origin:left;transition:transform .9s var(--snap) .15s}
.demo-js .d-apex .ax-kick[data-rv]:not(.in)::before{transform:scaleX(0)}
.d-apex .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:56px;padding:0 30px;overflow:hidden;isolation:isolate;font-family:var(--ui);font-size:12px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;border-radius:2px;transform:translate(var(--mx,0),var(--my,0));transition:color .45s var(--ease),border-color .4s,transform .5s var(--ease)}
.d-apex .btn svg{width:18px;height:18px;flex:none;transition:transform .5s var(--ease)}
.d-apex .btn:hover svg{transform:translateX(6px)}
.d-apex .ax-fill{background:var(--ink);color:var(--bk)}
.d-apex .ax-fill::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--red);transform:scaleX(0);transform-origin:right;transition:transform .55s var(--snap)}
.d-apex .ax-fill:hover{color:#fff}
.d-apex .ax-fill:hover::before{transform:scaleX(1);transform-origin:left}
.d-apex .ax-ghost{border:1px solid var(--line2);color:var(--ink);background:rgba(10,10,11,.18);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.d-apex .ax-ghost::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.16) 50%,transparent 65%);transform:translateX(-110%);transition:transform .9s var(--ease)}
.d-apex .ax-ghost:hover{border-color:var(--red)}
.d-apex .ax-ghost:hover::after{transform:translateX(110%)}
.d-apex .ax-text{display:inline-flex;align-items:center;gap:12px;min-height:44px;font-size:12px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;background:linear-gradient(var(--red),var(--red)) 0 100%/0 1px no-repeat;transition:background-size .6s var(--snap)}
.d-apex .ax-text:hover{background-size:100% 1px}
.d-apex .ax-hdr{position:fixed;left:0;right:0;top:0;z-index:50;transition:background-color .5s,backdrop-filter .5s}
.d-apex.is-scrolled .ax-hdr{background:rgba(10,10,11,.82);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2)}
.d-apex .ax-bar{display:flex;align-items:center;gap:28px;height:84px;transition:height .5s var(--ease)}
.d-apex.is-scrolled .ax-bar{height:68px}
.d-apex .ax-logo{position:relative;z-index:52;display:flex;align-items:center;gap:12px;min-width:0;min-height:44px;font-size:12.5px;font-weight:600;letter-spacing:.3em;text-transform:uppercase}
.d-apex .ax-logo svg{flex:none;width:30px;height:18px;color:var(--red);transition:transform .6s var(--ease)}
.d-apex .ax-logo:hover svg{transform:translateY(-3px)}
.d-apex .ax-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-apex .ax-links{display:none;gap:clamp(18px,2.2vw,36px);margin-left:auto;font-size:11.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
.d-apex .ax-links a{position:relative;display:inline-flex;align-items:center;min-height:44px;color:rgba(243,241,236,.78);transition:color .3s}
.d-apex .ax-links a::after{content:"";position:absolute;left:0;right:0;bottom:10px;height:1px;background:var(--red);transform:scaleX(0);transform-origin:right;transition:transform .5s var(--snap)}
.d-apex .ax-links a:hover{color:var(--ink)}
.d-apex .ax-links a:hover::after{transform:scaleX(1);transform-origin:left}
.d-apex .ax-hcta{display:none;min-height:46px;padding:0 22px}
.d-apex .ax-hcta i{width:6px;height:6px;border-radius:50%;background:var(--red)}
.d-apex .ax-burger{position:relative;z-index:52;display:flex;align-items:center;gap:14px;margin-left:auto;min-height:48px;padding:0 4px 0 14px;border:0;background:none;font-size:11.5px;font-weight:600;letter-spacing:.24em;text-transform:uppercase}
.d-apex .ax-burger i{position:relative;display:block;width:30px;height:12px}
.d-apex .ax-burger i::before,.d-apex .ax-burger i::after{content:"";position:absolute;right:0;height:1px;background:currentColor;transition:transform .5s var(--snap),width .5s var(--snap),background-color .3s}
.d-apex .ax-burger i::before{top:2px;width:30px}
.d-apex .ax-burger i::after{bottom:2px;width:18px;background:var(--red)}
.d-apex.menu-open .ax-burger i::before{width:26px;transform:translateY(4px) rotate(30deg)}
.d-apex.menu-open .ax-burger i::after{width:26px;transform:translateY(-4px) rotate(-30deg)}
@media (min-width:1100px){.d-apex .ax-links,.d-apex .ax-hcta{display:inline-flex}.d-apex .ax-burger{display:none}}
.d-apex .ax-rev{position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--line);overflow:hidden}
.d-apex .ax-rev::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(243,241,236,.4) 0 78%,var(--red) 86%);transform:scaleX(var(--sp,0));transform-origin:left;will-change:transform}
.d-apex .ax-menu{position:fixed;inset:0;z-index:49;display:grid;grid-template-rows:1fr auto;gap:28px;padding:118px var(--pad) 112px;background:var(--bk);overflow-y:auto;visibility:hidden;clip-path:inset(0 0 100% 0);transition:clip-path .8s var(--snap),visibility 0s .8s}
.d-apex .ax-menu.is-open{visibility:visible;clip-path:inset(0);transition:clip-path .8s var(--snap)}
.d-apex .ax-menu::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 80% 50% at 100% 0,rgba(227,18,44,.16),transparent 60%),repeating-linear-gradient(0deg,transparent 0 63px,rgba(243,241,236,.035) 63px 64px);pointer-events:none}
.d-apex .ax-menu nav{position:relative;display:grid;align-content:center;gap:2px}
.d-apex .ax-menu nav a{position:relative;display:flex;align-items:baseline;gap:18px;min-height:60px;padding:8px 0;border-bottom:1px solid var(--line);font-family:var(--dsp);font-size:clamp(36px,9vw,64px);line-height:1;text-transform:uppercase;clip-path:inset(0 100% 0 0);transition:clip-path .7s var(--snap),color .3s}
.d-apex .ax-menu nav a::after{content:"";position:absolute;left:0;bottom:-1px;height:1px;width:100%;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform .7s var(--snap)}
.d-apex .ax-menu.is-open nav a{clip-path:inset(0 0 0 0);transition-delay:calc(.25s + var(--i,0) * 70ms)}
.d-apex .ax-menu.is-open nav a::after{transform:scaleX(1);transition-delay:calc(.3s + var(--i,0) * 70ms)}
.d-apex .ax-menu nav a:hover{color:var(--red2)}
.d-apex .ax-menu nav small{font-family:var(--ui);font-size:11px;font-weight:600;letter-spacing:.24em;color:var(--red)}
.d-apex .ax-menu-foot{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;color:var(--dim);font-size:14px;opacity:0;transform:translateY(16px);transition:opacity .5s,transform .7s var(--ease)}
.d-apex .ax-menu.is-open .ax-menu-foot{opacity:1;transform:none;transition-delay:.6s}
.d-apex .ax-menu-foot a:not(.btn){display:inline-flex;align-items:center;min-height:44px;color:var(--ink)}
.d-apex.menu-open .ax-hdr{background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-apex .ax-hero{position:relative;display:grid;grid-template-rows:1fr auto;min-height:100svh;overflow:hidden;background:var(--bk)}
.d-apex .ax-hero-media{position:absolute;inset:0;clip-path:inset(49.6% 0 49.6% 0);animation:ax-open 1.5s var(--snap) .55s forwards}
.d-apex .ax-hero-media img{width:100%;height:100%;object-fit:cover;object-position:50% 58%;scale:1.22;animation:ax-settle 2.6s var(--ease) .55s forwards}
.d-apex .ax-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,10,11,.86) 0,rgba(10,10,11,.45) 48%,rgba(10,10,11,.1) 80%),linear-gradient(0deg,rgba(10,10,11,.95) 0,rgba(10,10,11,.2) 46%,rgba(10,10,11,.35) 100%)}
.d-apex .ax-sweep{position:absolute;inset:0;background:linear-gradient(104deg,transparent 38%,rgba(255,255,255,.2) 47%,rgba(255,255,255,.05) 52%,transparent 60%);mix-blend-mode:overlay;transform:translateX(-100%);animation:ax-sweep 2.2s var(--ease) 1.9s forwards;pointer-events:none}
.d-apex .ax-scan{position:absolute;left:0;right:0;top:50%;z-index:1;height:1px;background:linear-gradient(90deg,transparent,var(--red) 20%,var(--red2) 80%,transparent);transform:scaleX(0);transform-origin:left;animation:ax-scan 1.3s var(--snap) .05s forwards;pointer-events:none}
.d-apex .ax-hero-in{position:relative;z-index:2;display:grid;align-content:end;gap:clamp(20px,2.6vw,34px);padding-top:140px;padding-bottom:clamp(30px,4vw,56px)}
.d-apex .ax-eyebrow{display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;font-size:11.5px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:rgba(243,241,236,.82)}
.d-apex .ax-eyebrow>i{width:28px;height:1px;background:var(--red)}
.d-apex .ax-hero h1{max-width:15ch;font-size:clamp(50px,8.4vw,150px);line-height:.92;text-transform:uppercase}
.d-apex .ax-hero h1.is-m{max-width:17ch;font-size:clamp(44px,6.6vw,116px)}
.d-apex .ax-hero h1.is-s{max-width:20ch;font-size:clamp(38px,5vw,86px);line-height:.98}
.d-apex .ax-hero h1 em{transition-delay:2s;background-size:100% 2px;animation:ax-und 1.1s var(--snap) 1.9s both}
.d-apex .ax-w{display:inline-block}
.d-apex .ax-w>span{display:inline-block;opacity:0;filter:blur(10px);transform:translateX(-.7em) skewX(-16deg);animation:ax-fast 1.05s var(--ease) both;animation-delay:calc(1.05s + var(--i,0) * 75ms)}
.d-apex .ax-in{opacity:0;transform:translateY(18px);animation:ax-up 1s var(--ease) both;animation-delay:calc(1.6s + var(--i,0) * 120ms)}
.d-apex .ax-hero-row{display:grid;gap:26px;align-items:end}
@media (min-width:900px){.d-apex .ax-hero-row{grid-template-columns:minmax(0,46ch) auto;justify-content:space-between}}
.d-apex .ax-lede{max-width:46ch;font-size:clamp(16px,1.25vw,19px);color:rgba(243,241,236,.78)}
.d-apex .ax-ctas{display:flex;flex-wrap:wrap;gap:12px}
.d-apex .ax-dash{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:20px;align-items:end;padding-bottom:clamp(26px,3vw,40px)}
.d-apex .ax-facts{display:grid;gap:0;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-apex .ax-facts div{position:relative;display:grid;gap:4px;padding:16px 22px 4px 0}
.d-apex .ax-facts div::before{content:"";position:absolute;left:0;right:14px;top:0;height:1px;background:var(--line2);transform:scaleX(0);transform-origin:left;animation:ax-draw 1.2s var(--snap) both;animation-delay:calc(1.9s + var(--i,0) * 140ms)}
.d-apex .ax-facts div:first-child::before{background:linear-gradient(90deg,var(--red) 0 30%,var(--line2) 30%)}
.d-apex .ax-facts dt{font-size:10.5px;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:var(--mute)}
.d-apex .ax-facts dd{margin:0;font-size:14.5px;color:var(--ink)}
.d-apex .ax-facts a{display:inline-flex;min-height:32px;align-items:center}
.d-apex .ax-cue{display:none;align-items:center;gap:14px;font-size:10.5px;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:var(--mute);writing-mode:vertical-rl}
.d-apex .ax-cue::after{content:"";width:1px;height:64px;background:linear-gradient(var(--red),var(--red)) 0 0/1px 22px no-repeat,var(--line2);animation:ax-cue 2.8s var(--ease) 3s 3}
@media (min-width:900px){.d-apex .ax-cue{display:flex}}
.d-apex .ax-hero.is-plain{background:radial-gradient(ellipse 60% 55% at 78% 22%,rgba(243,241,236,.09),transparent 70%),radial-gradient(ellipse 40% 30% at 88% 14%,rgba(227,18,44,.14),transparent 70%),var(--bk)}
.d-apex .ax-art{position:absolute;inset:0;width:100%;height:100%;opacity:.95}
.d-apex .ax-art path{fill:none;stroke-width:1;vector-effect:non-scaling-stroke}
.d-apex .ax-art .ax-grid{stroke:rgba(243,241,236,.06)}
.d-apex .ax-art .ax-race{stroke:url(#ax-g);stroke-width:1.5;stroke-dasharray:1;stroke-dashoffset:1;animation:ax-dash 2.4s var(--snap) .9s forwards}
.d-apex .ax-art .ax-race2{stroke:rgba(243,241,236,.16);stroke-dasharray:1;stroke-dashoffset:1;animation:ax-dash 2.8s var(--snap) 1.1s forwards}
.d-apex .ax-art circle{fill:var(--red);opacity:0;animation:ax-pop .6s var(--ease) 2.6s forwards}
.d-apex .ax-streaks{position:absolute;inset:18% 0 30%;overflow:hidden;pointer-events:none}
.d-apex .ax-streaks i{position:absolute;left:0;height:1px;width:28%;background:linear-gradient(90deg,transparent,rgba(243,241,236,.35),transparent);animation:ax-streak 7s linear infinite;animation-delay:calc(var(--i,0) * -1.3s)}
.d-apex .ax-streaks i:nth-child(1){top:12%}.d-apex .ax-streaks i:nth-child(2){top:34%;width:18%}.d-apex .ax-streaks i:nth-child(3){top:51%;width:36%}.d-apex .ax-streaks i:nth-child(4){top:72%;width:22%}.d-apex .ax-streaks i:nth-child(5){top:90%;width:30%}
.d-apex .ax-now{display:inline-flex;align-items:center;gap:8px;padding:5px 12px;border:1px solid var(--line2);border-radius:999px;font-size:10.5px;letter-spacing:.2em;color:var(--ink)}
.d-apex .ax-now::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--mute)}
.d-apex .ax-now.is-open::before{background:#3ad07a;box-shadow:0 0 0 4px rgba(58,208,122,.16)}
.d-apex .ax-now.is-closed::before{background:var(--red)}
.d-apex .ax-sec{position:relative;padding-block:var(--z-sec)}
.d-apex .ax-sec.is-alt{background:var(--bk2)}
.d-apex .ax-sec+.ax-sec:not(.is-alt)::before,.d-apex .ax-sec.is-alt+.ax-sec.is-alt::before{content:"";position:absolute;left:var(--pad);right:var(--pad);top:0;height:1px;background:var(--line)}
.d-apex .ax-head{display:grid;gap:22px;max-width:980px;margin-bottom:clamp(44px,6vw,88px)}
.d-apex .ax-head>p:not(.ax-kick){max-width:54ch;color:var(--dim);font-size:clamp(15px,1.1vw,18px)}
.d-apex .ax-head.is-row{max-width:none}
@media (min-width:1000px){.d-apex .ax-head.is-row{grid-template-columns:minmax(0,1.35fr) minmax(0,.65fr);align-items:end;column-gap:64px}.d-apex .ax-head.is-row .ax-kick{grid-column:1/-1}}
.d-apex .ax-head.is-row>h2:first-child{align-self:end}
.demo-js .d-apex .ax-head h2[data-rv]{opacity:1;transform:none}
.d-apex .ax-cl{display:block}
.demo-js .d-apex [data-rv] .ax-cl{clip-path:inset(-10% 100% -10% 0);transition:clip-path 1.25s var(--snap)}
.demo-js .d-apex [data-rv].in .ax-cl{clip-path:inset(-10% -2% -10% 0)}
.d-apex .ax-about{display:grid;gap:clamp(48px,6vw,110px);align-items:start}
@media (min-width:960px){.d-apex .ax-about{grid-template-columns:minmax(0,.86fr) minmax(0,1.14fr)}.d-apex .ax-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:1100px}}
.d-apex .ax-about-pic{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--bk3)}
@media (min-width:960px){.d-apex .ax-about-pic{position:sticky;top:110px}}
.d-apex .ax-about-pic img{position:absolute;left:0;top:-8%;width:100%;height:116%;object-fit:cover;transform:translateY(calc(var(--p,0) * -6%))}
.d-apex .ax-about-pic::after{content:"";position:absolute;inset:auto 0 0;height:30%;background:linear-gradient(0deg,rgba(10,10,11,.75),transparent)}
.demo-js .d-apex .ax-about-pic[data-rv]{opacity:1;transform:none;background:none}
.d-apex .ax-about-pic>span{position:absolute;inset:0;overflow:hidden;background:var(--bk3)}
.demo-js .d-apex .ax-about-pic[data-rv]>span{clip-path:inset(0 0 0 100%);transition:clip-path 1.5s var(--snap)}
.demo-js .d-apex .ax-about-pic[data-rv].in>span{clip-path:inset(0)}
.d-apex .ax-about-pic figcaption{position:absolute;z-index:1;left:18px;bottom:16px;right:18px;display:flex;justify-content:space-between;gap:12px;font-size:10.5px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:rgba(243,241,236,.8)}
.d-apex .ax-about-copy{display:grid;gap:26px;align-content:start}
.d-apex .ax-lead{font-family:var(--dsp);font-size:clamp(25px,2.3vw,38px);line-height:1.18;color:var(--ink)}
.d-apex .ax-cols{display:grid;gap:18px 40px;color:var(--dim)}
@media (min-width:760px){.d-apex .ax-cols.is-two{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-apex .ax-sheet{display:grid;margin-top:12px;border-top:1px solid var(--line2)}
.d-apex .ax-sheet li{position:relative;display:grid;grid-template-columns:52px minmax(0,1fr);gap:16px;align-items:baseline;padding:18px 0;border-bottom:1px solid var(--line);font-size:15.5px}
.d-apex .ax-sheet li::after{content:"";position:absolute;left:0;bottom:-1px;width:52px;height:1px;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform 1s var(--snap);transition-delay:calc(.3s + var(--i,0) * 120ms)}
.d-apex .ax-sheet.in li::after{transform:none}
.d-apex .ax-sheet small{font-size:11px;letter-spacing:.2em;color:var(--mute)}
.d-apex .ax-inv-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;margin-bottom:34px}
.d-apex .ax-tabs{position:relative;display:flex;max-width:100%;border-bottom:1px solid var(--line);overflow-x:auto;scrollbar-width:none}
.d-apex .ax-tabs::-webkit-scrollbar{display:none}
.d-apex .ax-tabs button{flex:none;min-height:50px;padding:0 22px;border:0;background:none;font-size:11.5px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--mute);transition:color .3s}
.d-apex .ax-tabs button:first-of-type{padding-left:0}
.d-apex .ax-tabs button:hover,.d-apex .ax-tabs button[aria-selected="true"]{color:var(--ink)}
.d-apex .ax-ind{position:absolute;left:0;bottom:-1px;height:2px;width:0;background:var(--red);transition:transform .6s var(--snap),width .6s var(--snap)}
.d-apex .ax-tabs:not(.is-ready) button[aria-selected="true"]{box-shadow:inset 0 -2px var(--red)}
.d-apex .ax-total{font-size:11px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--mute)}
.d-apex .ax-total b{font-family:var(--dsp);font-size:30px;font-weight:400;letter-spacing:0;color:var(--ink);margin-right:8px}
.d-apex .ax-cars{display:grid;gap:clamp(14px,1.6vw,26px);grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}
.d-apex .ax-cars[hidden]{display:none}
.d-apex .ax-cars:not([hidden])>li{animation:ax-up .8s var(--ease) both;animation-delay:calc(var(--i,0) * 70ms)}
.d-apex .ax-car{position:relative;display:grid;height:100%;background:var(--bk2);border:1px solid var(--line);border-radius:2px;transform:perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .7s var(--ease),border-color .4s;will-change:transform}
.d-apex .ax-car.is-tilt{transition:transform .12s linear,border-color .4s}
.d-apex .ax-car:hover{border-color:var(--line2)}
.d-apex .ax-car::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at var(--gx,50%) var(--gy,0%),rgba(255,255,255,.08),transparent 45%);opacity:0;transition:opacity .4s;pointer-events:none}
.d-apex .ax-car:hover::after{opacity:1}
.d-apex .ax-car-pic{position:relative;aspect-ratio:16/10;overflow:hidden;background:radial-gradient(ellipse 70% 55% at 50% 100%,rgba(243,241,236,.1),transparent 70%),var(--bk3)}
.d-apex .ax-car-pic img{width:100%;height:100%;object-fit:cover;transition:transform 1.4s var(--ease),filter .8s}
.d-apex .ax-car:hover .ax-car-pic img{transform:scale(1.06)}
.d-apex .ax-car-pic::after{content:"";position:absolute;inset:0;background:linear-gradient(104deg,transparent 40%,rgba(255,255,255,.22) 49%,transparent 58%);mix-blend-mode:overlay;transform:translateX(-105%);pointer-events:none}
.d-apex .ax-car:hover .ax-car-pic::after{transform:translateX(105%);transition:transform 1.2s var(--ease)}
.d-apex .ax-car-ghost{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--dsp);font-size:clamp(90px,10vw,150px);line-height:1;color:transparent;-webkit-text-stroke:1px rgba(243,241,236,.2)}
.d-apex .ax-car-ghost::after{content:"";position:absolute;left:12%;right:12%;bottom:22%;height:1px;background:linear-gradient(90deg,transparent,var(--red),transparent)}
.d-apex .ax-car-idx{position:absolute;left:16px;top:14px;z-index:1;font-size:10.5px;font-weight:600;letter-spacing:.24em;color:rgba(243,241,236,.86)}
.d-apex .ax-car-body{display:grid;gap:18px;align-content:start;padding:22px clamp(18px,1.8vw,26px) 26px}
.d-apex .ax-car-top{display:flex;align-items:baseline;justify-content:space-between;gap:18px}
.d-apex .ax-car h3{font-size:clamp(22px,1.7vw,28px);text-transform:uppercase;line-height:1.02}
.d-apex .ax-car-top b{flex:none;font-size:15px;font-weight:600;letter-spacing:.02em;color:var(--ink)}
.d-apex .ax-specs{display:grid;grid-template-columns:repeat(auto-fit,minmax(78px,1fr));gap:14px;padding-top:16px;border-top:1px solid var(--line)}
.d-apex .ax-specs li{display:grid;gap:8px;align-content:start;font-size:13.5px;font-weight:500;letter-spacing:.02em;white-space:nowrap}
.d-apex .ax-specs i{position:relative;display:block;height:2px;background:rgba(243,241,236,.08);overflow:hidden}
.d-apex .ax-specs i::after{content:"";position:absolute;inset:0;width:calc(var(--v,1) * 100%);background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform 1.4s var(--snap) .2s}
.d-apex .ax-specs i.is-rel::after{background:linear-gradient(90deg,rgba(243,241,236,.55),var(--red))}
.d-apex .ax-cars.in .ax-specs i::after,.d-apex .ax-car.in .ax-specs i::after{transform:none}
.d-apex .ax-car-desc{font-size:14.5px;color:var(--dim)}
.d-apex .ax-car-cat{font-size:10.5px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--mute)}
@media (hover:hover) and (pointer:fine){.d-apex .ax-car.has-pic .ax-car-desc{position:absolute;left:0;right:0;top:0;z-index:2;display:flex;align-items:flex-end;aspect-ratio:16/10;padding:22px;background:linear-gradient(0deg,rgba(10,10,11,.92),rgba(10,10,11,.25) 70%,transparent);color:rgba(243,241,236,.9);opacity:0;transform:translateY(12px);transition:opacity .5s,transform .7s var(--ease)}.d-apex .ax-car.has-pic:hover .ax-car-desc{opacity:1;transform:none}}
.d-apex .ax-note{margin-top:30px;font-size:13px;letter-spacing:.04em;color:var(--mute)}
.d-apex .ax-note::before{content:"";display:inline-block;width:6px;height:6px;margin-right:12px;border-radius:50%;background:var(--red);vertical-align:middle}
.d-apex .ax-svc{display:grid;gap:clamp(40px,5vw,90px)}
@media (min-width:1000px){.d-apex .ax-svc.has-stage{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:start}}
.d-apex .ax-rows{border-top:1px solid var(--line2)}
.d-apex .ax-row{position:relative;display:grid;grid-template-columns:56px minmax(0,1fr);gap:6px 18px;padding:clamp(22px,2.4vw,34px) 0;border-bottom:1px solid var(--line);cursor:default}
.d-apex .ax-row::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform .8s var(--snap)}
.d-apex .ax-row.is-act::after,.d-apex .ax-row:hover::after{transform:scaleX(1)}
.d-apex .ax-row>small{padding-top:.5em;font-size:11px;font-weight:600;letter-spacing:.22em;color:var(--mute);transition:color .4s}
.d-apex .ax-row.is-act>small{color:var(--red)}
.d-apex .ax-row h3{text-transform:uppercase;transition:transform .6s var(--ease)}
.d-apex .ax-row.is-act h3{transform:translateX(10px)}
.d-apex .ax-row p{max-width:60ch;margin-top:10px;color:var(--dim)}
.d-apex .ax-row-meta{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:12px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--ink)}
.d-apex .ax-row-meta span{color:var(--mute)}
.d-apex .ax-thumb{grid-column:1/-1;aspect-ratio:16/9;margin-top:14px;overflow:hidden;background:var(--bk3)}
.d-apex .ax-thumb img{width:100%;height:100%;object-fit:cover}
@media (min-width:1000px){.d-apex .ax-thumb{display:none}}
.d-apex .ax-stage{position:sticky;top:110px;display:none}
@media (min-width:1000px){.d-apex .ax-stage{display:block}}
.d-apex .ax-frame{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--bk3)}
.d-apex .ax-frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;clip-path:inset(0 0 0 100%);transform:scale(1.08);transition:clip-path 1s var(--snap),transform 1.6s var(--ease)}
.d-apex .ax-frame img.is-on{clip-path:inset(0);transform:none;z-index:1}
.d-apex .ax-frame::after{content:"";position:absolute;inset:0;z-index:2;background:linear-gradient(0deg,rgba(10,10,11,.5),transparent 40%);pointer-events:none}
.d-apex .ax-stage-cap{display:flex;justify-content:space-between;gap:14px;margin-top:14px;font-size:11px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--mute)}
.d-apex .ax-stage-cap b{font-weight:600;color:var(--ink)}
.d-apex .ax-show{position:relative;display:grid;align-items:end;min-height:min(100svh,900px);overflow:hidden;background:var(--bk2)}
.d-apex .ax-show-media{position:absolute;inset:-10% 0}
.d-apex .ax-show-media img{width:100%;height:100%;object-fit:cover;transform:translateY(calc(var(--p,0) * -5%)) scale(calc(1.06 - var(--p,0) * .04))}
.d-apex .ax-show::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(10,10,11,.94),rgba(10,10,11,.25) 55%,rgba(10,10,11,.45))}
.d-apex .ax-show-sweep{position:absolute;inset:0;z-index:1;background:linear-gradient(104deg,transparent 38%,rgba(255,255,255,.24) 47%,rgba(255,255,255,.04) 53%,transparent 60%);mix-blend-mode:overlay;transform:translateX(-100%);pointer-events:none}
.d-apex .ax-show-fx{position:absolute;inset:0;z-index:1;overflow:hidden;pointer-events:none}
.demo-js .d-apex .ax-show-fx[data-rv]{opacity:1;transform:none}
.d-apex .ax-show-fx.in .ax-show-sweep{transform:translateX(100%);transition:transform 2.4s var(--ease) .3s}
.d-apex .ax-show-in{position:relative;z-index:2;display:grid;gap:24px;justify-items:start;padding-block:clamp(70px,10vw,150px)}
.d-apex .ax-show h2{max-width:16ch;font-size:clamp(44px,7vw,124px);line-height:.94}
.d-apex .ax-show-in>p{max-width:48ch;color:rgba(243,241,236,.8);font-size:clamp(15px,1.15vw,18px)}
.d-apex .ax-show:not(.has-pic){min-height:0;background:radial-gradient(ellipse 50% 70% at 85% 50%,rgba(227,18,44,.1),transparent 70%),var(--bk2)}
.d-apex .ax-show:not(.has-pic)::before{display:none}
.d-apex .ax-track{position:relative}
.d-apex .ax-race{position:absolute;left:0;right:0;top:0;width:100%;height:120px;overflow:visible;display:none}
.d-apex .ax-race path{fill:none;stroke-width:1.5;vector-effect:non-scaling-stroke;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 2.6s var(--snap) .2s}
.d-apex .ax-race .ax-r2{stroke:rgba(243,241,236,.12);stroke-dasharray:4 8;stroke-dashoffset:0}
.d-apex .ax-track.in .ax-race .ax-r1{stroke-dashoffset:0}
.d-apex .ax-steps{position:relative;display:grid;gap:0}
.d-apex .ax-steps::before{content:"";position:absolute;left:5px;top:12px;bottom:12px;width:1px;background:linear-gradient(var(--red),var(--line2) 40%);transform:scaleY(0);transform-origin:top;transition:transform 2s var(--snap) .2s}
.d-apex .ax-track.in .ax-steps::before{transform:none}
.d-apex .ax-steps li{position:relative;display:grid;gap:10px;align-content:start;padding:0 0 44px 44px}
.d-apex .ax-steps li>i{position:absolute;left:0;top:6px;width:11px;height:11px;border:1px solid var(--red);border-radius:50%;background:var(--bk);transition:background-color .5s;transition-delay:calc(.6s + var(--i,0) * 300ms)}
.d-apex .ax-track.in .ax-steps li>i{background:var(--red)}
.d-apex .ax-steps small{font-size:11px;font-weight:600;letter-spacing:.24em;color:var(--red)}
.d-apex .ax-steps h3{text-transform:uppercase}
.d-apex .ax-steps p{max-width:36ch;color:var(--dim)}
@media (min-width:900px){.d-apex .ax-race{display:block}.d-apex .ax-steps{grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:36px;padding-top:150px}.d-apex .ax-steps::before{display:none}.d-apex .ax-steps li{padding:26px 0 0;border-top:1px solid var(--line)}.d-apex .ax-steps li>i{top:-6px}}
.d-apex .ax-gal{position:relative;padding-top:var(--z-sec);padding-bottom:var(--z-sec)}
.d-apex .ax-gal-track{display:grid;gap:clamp(14px,2vw,24px);padding-inline:var(--pad)}
.d-apex .ax-gal-track figure{position:relative;margin:0}
.d-apex .ax-gal-pic{aspect-ratio:4/3;overflow:hidden;background:var(--bk3)}
.d-apex .ax-gal-pic img{width:100%;height:100%;object-fit:cover;transition:transform 1.4s var(--ease)}
.d-apex .ax-gal-track figure:hover img{transform:scale(1.04)}
.d-apex .ax-gal-track figcaption{display:flex;gap:16px;margin-top:12px;font-size:12px;color:var(--mute)}
.d-apex .ax-gal-track figcaption b{flex:none;font-weight:600;letter-spacing:.22em;color:var(--ink)}
.d-apex .ax-gal-prog{display:none}
@media (min-width:700px){.d-apex .ax-gal:not(.is-pinned) .ax-gal-track{grid-template-columns:repeat(2,minmax(0,1fr))}.d-apex .ax-gal:not(.is-pinned) .ax-gal-track figure:nth-child(3n+1){grid-column:1/-1}.d-apex .ax-gal:not(.is-pinned) .ax-gal-track figure:nth-child(3n+1) .ax-gal-pic{aspect-ratio:21/9}}
.d-apex .ax-gal.is-pinned{padding:0}
.d-apex .ax-gal.is-pinned .ax-gal-pin{position:sticky;top:0;display:flex;flex-direction:column;justify-content:center;gap:clamp(24px,4vh,48px);height:100vh;overflow:hidden;padding-top:70px}
.d-apex .ax-gal.is-pinned .ax-head{margin-bottom:0}
.d-apex .ax-gal.is-pinned .ax-gal-track{display:flex;width:max-content;gap:clamp(18px,2vw,32px);will-change:transform}
.d-apex .ax-gal.is-pinned .ax-gal-track figure{flex:none;width:clamp(380px,44vw,820px)}
.d-apex .ax-gal.is-pinned .ax-gal-track figure:nth-child(even){width:clamp(300px,30vw,560px)}
.d-apex .ax-gal.is-pinned .ax-gal-pic{aspect-ratio:auto;height:min(56vh,600px)}
.d-apex .ax-gal.is-pinned .ax-gal-pic img{width:112%;max-width:none;margin-left:-6%;transform:translateX(calc(var(--gp,0) * -5%))}
.d-apex .ax-gal.is-pinned .ax-gal-prog{display:flex;align-items:center;gap:18px;font-size:11px;font-weight:600;letter-spacing:.24em;color:var(--mute)}
.d-apex .ax-gal-prog span{position:relative;flex:1;max-width:320px;height:1px;background:var(--line2)}
.d-apex .ax-gal-prog span::after{content:"";position:absolute;inset:0;background:var(--red);transform:scaleX(var(--gp,0));transform-origin:left}
.d-apex .ax-feat{display:grid;gap:clamp(40px,5vw,90px)}
@media (min-width:1000px){.d-apex .ax-feat{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}.d-apex .ax-feat .ax-head{position:sticky;top:120px;margin-bottom:0}}
.d-apex .ax-feat-list{display:grid;border-top:1px solid var(--line2)}
@media (min-width:700px){.d-apex .ax-feat-list{grid-template-columns:repeat(2,minmax(0,1fr))}.d-apex .ax-feat-list li:nth-child(odd){border-right:1px solid var(--line);padding-right:clamp(20px,2.4vw,40px)}.d-apex .ax-feat-list li:nth-child(even){padding-left:clamp(20px,2.4vw,40px)}}
.d-apex .ax-feat-list li{position:relative;display:grid;gap:14px;align-content:start;padding-block:clamp(26px,3vw,44px);border-bottom:1px solid var(--line)}
.d-apex .ax-ico{display:grid;place-items:center;width:46px;height:46px;border:1px solid var(--line2);color:var(--ink);transition:border-color .4s,color .4s,transform .6s var(--ease)}
.d-apex .ax-feat-list li:hover .ax-ico{border-color:var(--red);color:var(--red);transform:rotate(-8deg)}
.d-apex .ax-ico svg{width:20px;height:20px;stroke-width:1.5}
.d-apex .ax-feat-list h3{text-transform:uppercase}
.d-apex .ax-feat-list p{color:var(--dim)}
.d-apex .ax-chan{display:grid;gap:14px;align-content:start;height:100%}
.d-apex .ax-chan .ax-text{justify-self:start}
.d-apex .ax-chan:hover .ax-ico{border-color:var(--red);color:var(--red)}
.d-apex .ax-visit{display:grid;gap:clamp(48px,6vw,110px);align-items:center}
@media (min-width:960px){.d-apex .ax-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-apex .ax-visit-copy{display:grid;gap:24px;align-content:start}
.d-apex .ax-visit-copy>p{max-width:52ch;color:var(--dim)}
.d-apex .ax-inst{display:grid;gap:34px;justify-items:center}
.d-apex .ax-dial{position:relative;width:min(82%,380px);aspect-ratio:1}
.d-apex .ax-dial svg{width:100%;height:100%;overflow:visible}
.d-apex .ax-dial .ax-trk{fill:none;stroke:rgba(243,241,236,.08);stroke-width:10}
.d-apex .ax-dial .ax-tk{stroke:rgba(243,241,236,.28);stroke-width:1}
.d-apex .ax-dial .ax-tk.is-major{stroke:var(--ink);stroke-width:1.5}
.d-apex .ax-dial text{fill:var(--mute);font-family:var(--ui);font-size:9px;font-weight:600;letter-spacing:.1em;text-anchor:middle;dominant-baseline:middle}
.d-apex .ax-dial .ax-arc{fill:none;stroke:var(--red);stroke-width:10;stroke-dasharray:0 1000;transition:stroke-dasharray 1.8s var(--snap)}
.d-apex .ax-dial .ax-needle{stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;fill:var(--ink);transform-origin:110px 110px;transform:rotate(-120deg);transition:transform 2s var(--snap)}
.d-apex .ax-dial-c{position:absolute;inset:30%;display:grid;place-content:center;gap:8px;text-align:center}
.d-apex .ax-dial-c b{font-family:var(--ui);font-size:clamp(17px,1.5vw,21px);font-weight:300;letter-spacing:.02em;line-height:1.05;color:var(--ink)}
.d-apex .ax-dial-c small{font-size:10px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--mute)}
.d-apex .ax-inst .z-hours{width:min(100%,460px)}
.d-apex .z-hours{border-top-color:var(--line2)}
.d-apex .z-hours div{position:relative;font-size:14.5px}
.d-apex .z-hours dt{letter-spacing:.04em}
.d-apex .z-hours div.is-today{color:var(--ink)}
.d-apex .z-hours div.is-today::before{content:"";position:absolute;left:-18px;top:50%;width:8px;height:1px;background:var(--red)}
.d-apex .z-hours div.is-today dd{color:var(--ink);font-weight:600}
.d-apex .z-reach{color:var(--dim)}
.d-apex .z-reach a{color:var(--ink);text-decoration:underline;text-decoration-color:var(--line2);text-underline-offset:5px}
.d-apex .ax-book{display:grid;gap:clamp(44px,6vw,110px);align-items:start}
@media (min-width:960px){.d-apex .ax-book{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-apex .ax-book-copy{display:grid;gap:24px;align-content:start}
.d-apex .ax-book-copy>p{max-width:50ch;color:var(--dim)}
.d-apex .ax-form{position:relative;padding:clamp(24px,3.4vw,52px);border:1px solid var(--line);background:linear-gradient(160deg,rgba(243,241,236,.04),transparent 40%),var(--bk2)}
.d-apex .ax-form::before{content:"";position:absolute;left:-1px;top:-1px;width:64px;height:1px;background:var(--red)}
.d-apex .ax-form-top{display:flex;justify-content:space-between;gap:12px;margin-bottom:28px;padding-bottom:18px;border-bottom:1px solid var(--line);font-size:11px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--mute)}
.d-apex .ax-form-top b{font-weight:600;color:var(--ink)}
.d-apex .z-fields{gap:26px 24px}
.d-apex .z-field label,.d-apex .z-chipset legend{font-size:10.5px;font-weight:600;letter-spacing:.24em;color:var(--mute)}
.d-apex .z-field input,.d-apex .z-field select,.d-apex .z-field textarea{padding:10px 0;border:0;border-bottom:1px solid var(--line2);background:transparent;color:var(--ink);transition:border-color .4s,background-size .6s var(--snap);background-image:linear-gradient(var(--red),var(--red));background-size:0 1px;background-position:0 100%;background-repeat:no-repeat}
.d-apex .z-field select{background-image:linear-gradient(var(--red),var(--red)),linear-gradient(45deg,transparent 50%,var(--dim) 50%),linear-gradient(-45deg,transparent 50%,var(--dim) 50%);background-size:0 1px,5px 5px,5px 5px;background-position:0 100%,calc(100% - 9px) 52%,calc(100% - 4px) 52%}
.d-apex .z-field input:focus,.d-apex .z-field textarea:focus{background-size:100% 1px;outline:none}
.d-apex .z-field select:focus{background-size:100% 1px,5px 5px,5px 5px;outline:none}
.d-apex .z-field textarea{padding-top:12px}
.d-apex .z-field input[type=date],.d-apex .z-field input[type=time]{color-scheme:dark}
.d-apex .z-chips button{border-color:var(--line2);font-family:var(--ui);font-size:15px}
.d-apex .z-chips button[aria-pressed="true"]{background:var(--red);border-color:var(--red);color:#fff}
.d-apex .z-form .btn{margin-top:6px}
.d-apex .form-status{border-color:var(--red);background:rgba(227,18,44,.08)}
.d-apex .form-note{color:var(--mute)}
.d-apex .z-card,.d-apex .z-panel,.d-apex .z-channel{border-color:var(--line);background:var(--bk2);border-radius:2px}
.d-apex .z-card{transition:border-color .4s,transform .7s var(--ease)}
.d-apex .z-card:hover{border-color:var(--line2);transform:translateY(-4px)}
.d-apex .z-card h3,.d-apex .z-grid h3,.d-apex .z-rows h3,.d-apex .z-steps h3{text-transform:uppercase}
.d-apex .z-pack{position:relative}
.d-apex .z-pack.is-featured{border-color:var(--line2);background:linear-gradient(180deg,rgba(227,18,44,.08),transparent 40%),var(--bk2)}
.d-apex .z-pack.is-featured::before{content:"";position:absolute;left:-1px;right:-1px;top:-1px;height:2px;background:var(--red)}
.d-apex .z-pack-price b{font-family:var(--ui);font-weight:200;letter-spacing:-.02em;font-size:clamp(34px,3.2vw,50px)}
.d-apex .z-tag{font-weight:600;letter-spacing:.24em}
.d-apex .z-ticks li::before{background:var(--red)}
.d-apex .z-acc{border-top-color:var(--line2)}
.d-apex .z-acc summary{font-family:var(--ui);font-size:clamp(16px,1.25vw,19px);font-weight:500;letter-spacing:.01em}
.d-apex .z-acc summary i{color:var(--red)}
.d-apex .z-acc details{position:relative}
.d-apex .z-acc details::before{content:"";position:absolute;left:-18px;top:0;bottom:0;width:1px;background:var(--red);transform:scaleY(0);transform-origin:top;transition:transform .6s var(--snap)}
.d-apex .z-acc details[open]::before{transform:none}
.d-apex .z-acc details>p{font-size:15.5px}
.d-apex .z-faq .z-head h2,.d-apex .z-quotes-sec .z-head h2,.d-apex .z-team .z-head h2,.d-apex .z-packages .z-head h2,.d-apex .z-ba-sec .z-head h2,.d-apex .z-order .z-head h2,.d-apex .z-contact .z-head h2,.d-apex .z-booking .z-head h2{text-transform:uppercase}
.d-apex .z-sec.z-faq,.d-apex .z-sec.z-quotes-sec,.d-apex .z-sec.z-team{background:var(--bk2)}
.d-apex .z-head .ax-kick{margin-bottom:-4px}
.d-apex .z-quotes blockquote{border-top-color:var(--line2)}
.d-apex .z-quotes blockquote>p{font-size:clamp(22px,2vw,30px)}
.d-apex .z-quotes footer a{color:var(--dim)}
.d-apex .z-team .z-pic{filter:grayscale(.3)}
.d-apex .z-team li h3{text-transform:uppercase}
.d-apex .z-rows,.d-apex .z-steps{border-top-color:var(--line2)}
.d-apex .z-sec.z-cta{background:repeating-linear-gradient(90deg,transparent 0 120px,rgba(243,241,236,.03) 120px 121px),radial-gradient(ellipse 60% 80% at 50% 120%,rgba(227,18,44,.22),transparent 70%),var(--bk2);overflow:hidden}
.d-apex .z-cta h2{max-width:18ch;font-size:clamp(40px,6vw,104px);text-transform:uppercase;line-height:.95}
.d-apex .z-statement{overflow:hidden}
.d-apex .z-statement h2{max-width:26ch;font-size:var(--z-statement);line-height:1.08;text-transform:none;color:transparent;background:linear-gradient(104deg,var(--ink) 0 40%,#fff 46%,var(--red2) 49%,#fff 52%,var(--ink) 58% 100%) 120% 0/260% 100% no-repeat;-webkit-background-clip:text;background-clip:text}
.d-apex .z-statement h2.in{background-position:0 0;transition:background-position 2.6s var(--ease) .2s,opacity .9s,transform .9s}
.d-apex .z-statement h2 em{color:var(--dim);background:none}
.d-apex .z-statement .ax-kick{justify-content:center}
.d-apex .z-showcase.has-pic::after{background:linear-gradient(0deg,rgba(10,10,11,.92),rgba(10,10,11,.2) 60%)}
.d-apex .z-ba-sec .z-cards{max-width:960px}
.d-apex .z-ba figcaption{background:rgba(10,10,11,.8);font-size:12px;letter-spacing:.06em}
.d-apex .ax-foot{position:relative;padding:clamp(90px,11vw,160px) 0 150px;background:var(--bk);overflow:hidden}
.d-apex .ax-foot::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:linear-gradient(90deg,transparent,var(--red) 30%,var(--red) 70%,transparent)}
.d-apex .ax-foot-cta{display:inline-flex;align-items:center;gap:clamp(16px,2vw,30px);max-width:100%;margin-top:22px;font-family:var(--dsp);font-size:clamp(38px,6.4vw,108px);line-height:.95;text-transform:uppercase;transition:color .4s}
.d-apex .ax-foot-cta svg{flex:none;width:clamp(34px,4.4vw,72px);height:auto;color:var(--red);transition:transform .7s var(--ease)}
.d-apex .ax-foot-cta:hover{color:var(--red2)}
.d-apex .ax-foot-cta:hover svg{transform:translateX(14px)}
.d-apex .ax-foot-grid{display:grid;gap:36px 40px;margin-top:clamp(60px,8vw,120px);padding-top:36px;border-top:1px solid var(--line);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-apex .ax-foot-grid h3{margin-bottom:14px;font-family:var(--ui);font-size:10.5px;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:var(--mute)}
.d-apex .ax-foot-grid a,.d-apex .ax-foot-grid span{display:flex;align-items:center;min-height:34px;font-size:14.5px;color:rgba(243,241,236,.86)}
.d-apex .ax-foot-grid a{transition:color .3s,transform .4s var(--ease)}
.d-apex .ax-foot-grid a:hover{color:var(--ink);transform:translateX(4px)}
.d-apex .ax-foot-grid p{font-size:14.5px;color:var(--dim)}
.d-apex .ax-foot-name{margin-top:clamp(60px,8vw,110px);font-family:var(--dsp);font-size:min(15vw,calc(150vw / var(--n,8)),240px);line-height:.82;letter-spacing:-.01em;text-transform:uppercase;white-space:nowrap;color:transparent;-webkit-text-stroke:1px rgba(243,241,236,.28)}
.demo-js .d-apex .ax-foot-name[data-rv]{opacity:1;transform:none}
.d-apex .ax-foot-name>span{display:block}
.demo-js .d-apex .ax-foot-name[data-rv]>span{clip-path:inset(50% 0 50% 0);transition:clip-path 1.6s var(--snap)}
.demo-js .d-apex .ax-foot-name[data-rv].in>span{clip-path:inset(-10% -2% -10% -2%)}
.d-apex .ax-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:28px;padding-top:22px;border-top:1px solid var(--line);font-size:12px;color:var(--mute)}
.d-apex .ax-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@keyframes ax-open{to{clip-path:inset(0)}}
@keyframes ax-settle{to{scale:1}}
@keyframes ax-scan{0%{transform:scaleX(0);opacity:1}55%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
@keyframes ax-sweep{to{transform:translateX(100%)}}
@keyframes ax-fast{to{opacity:1;filter:none;transform:none}}
@keyframes ax-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes ax-draw{to{transform:scaleX(1)}}
@keyframes ax-und{from{background-size:0 2px}to{background-size:100% 2px}}
@keyframes ax-cue{0%{background-position:0 -22px,0 0}100%{background-position:0 64px,0 0}}
@keyframes ax-dash{to{stroke-dashoffset:0}}
@keyframes ax-pop{to{opacity:1}}
@keyframes ax-streak{from{transform:translateX(-100%)}to{transform:translateX(420%)}}
@media (prefers-reduced-motion:reduce){.d-apex .ax-hero-media{clip-path:none}.d-apex .ax-hero-media img{scale:1}.d-apex .ax-w>span,.d-apex .ax-in{opacity:1;filter:none;transform:none}.d-apex .ax-streaks{display:none}.d-apex .btn{transform:none}.d-apex .ax-car{transform:none}.d-apex .z-statement h2{background-position:0 0}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The redline in the header follows the reading position; inventory cards tilt toward the
 * pointer; buttons in the opening lean toward it; the service list shows the photograph of the
 * row in view; the gallery runs sideways while the page scrolls (wide screens only); the dial
 * shows today's opening time (read by TODAY_JS) and the current time; the tab marker slides.
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-apex');if(!root)return;var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches,fine=W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches,wide=W.matchMedia&&W.matchMedia('(min-width: 900px)');
var gals=q('.ax-gal'),raf=0;
function layout(){gals.forEach(function(g){var tr=g.querySelector('.ax-gal-track');var on=!!(wide&&wide.matches)&&!reduce&&tr&&tr.children.length>1;g.classList.toggle('is-pinned',on);if(!on){g.style.height='';if(tr)tr.style.transform='';return}var dist=Math.max(0,tr.scrollWidth-W.innerWidth);g._d=dist;g.style.height=(W.innerHeight+dist)+'px'});tick()}
function tick(){raf=0;var h=d.documentElement.scrollHeight-W.innerHeight;root.style.setProperty('--sp',h>0?Math.min(1,W.scrollY/h).toFixed(4):'0');
gals.forEach(function(g){if(!g.classList.contains('is-pinned'))return;var r=g.getBoundingClientRect(),span=g.offsetHeight-W.innerHeight,p=span>0?Math.max(0,Math.min(1,-r.top/span)):0;var tr=g.querySelector('.ax-gal-track');tr.style.transform='translate3d('+(-p*g._d).toFixed(1)+'px,0,0)';g.style.setProperty('--gp',p.toFixed(4))})}
function onScroll(){if(!raf)raf=requestAnimationFrame(tick)}
W.addEventListener('scroll',onScroll,{passive:true});W.addEventListener('resize',function(){layout()});W.addEventListener('load',layout);layout();
if(fine&&!reduce){q('.ax-car').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.classList.add('is-tilt');c.style.setProperty('--rx',(-y*6).toFixed(2)+'deg');c.style.setProperty('--ry',(x*8).toFixed(2)+'deg');c.style.setProperty('--gx',((x+.5)*100).toFixed(1)+'%');c.style.setProperty('--gy',((y+.5)*100).toFixed(1)+'%')});c.addEventListener('pointerleave',function(){c.classList.remove('is-tilt');c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});
q('.ax-mag').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.setProperty('--mx',((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px');b.style.setProperty('--my',((e.clientY-r.top-r.height/2)*.32).toFixed(1)+'px')});b.addEventListener('pointerleave',function(){b.style.setProperty('--mx','0px');b.style.setProperty('--my','0px')})})}
q('.ax-svc').forEach(function(s){var rows=q('.ax-row',s),imgs=q('.ax-frame img',s),cnt=s.querySelector('[data-at]');function set(k){rows.forEach(function(r,n){r.classList.toggle('is-act',n===k)});var hit=imgs.filter(function(m){return +m.getAttribute('data-tab')===k});if(hit.length)imgs.forEach(function(m){m.classList.toggle('is-on',m===hit[0])});if(cnt)cnt.textContent=String(k+1).padStart(2,'0')}
rows.forEach(function(r,n){r.addEventListener('mouseenter',function(){set(n)})});if('IntersectionObserver' in W){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)set(rows.indexOf(e.target))})},{rootMargin:'-45% 0px -45% 0px'});rows.forEach(function(r){io.observe(r)})}});
q('.ax-tabs').forEach(function(t){var ind=t.querySelector('.ax-ind');if(!ind)return;function set(){var b=t.querySelector('[aria-selected="true"]');if(!b)return;var pl=parseFloat(getComputedStyle(b).paddingLeft)||0,pr=parseFloat(getComputedStyle(b).paddingRight)||0;ind.style.width=(b.offsetWidth-pl-pr)+'px';ind.style.transform='translateX('+(b.offsetLeft+pl)+'px)'}t.classList.add('is-ready');t.addEventListener('click',function(){setTimeout(set,0)});t.addEventListener('keydown',function(){setTimeout(set,0)});W.addEventListener('resize',set);set();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(set)});
q('[data-dial]').forEach(function(dl){var svg=dl.querySelector('svg'),g=dl.querySelector('.ax-arcs'),nd=dl.querySelector('.ax-needle'),out=dl.querySelector('[data-dial-time]'),C=2*Math.PI*86,ns='http://www.w3.org/2000/svg';var now=new Date(),mins=now.getHours()*60+now.getMinutes();try{var f=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Amsterdam',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now),o={};f.forEach(function(x){o[x.type]=x.value});mins=+o.hour*60+ +o.minute}catch(e){}
var row=(dl.closest('section')||d).querySelector('.z-hours div.is-today dd');var arcs=[];if(row){var t=row.textContent||'',re=/(\\d{1,2})[:.](\\d{2})\\s*(?:–|—|-|tot|to|bis|à)\\s*(\\d{1,2})[:.](\\d{2})/g,m;while((m=re.exec(t))){var s=+m[1]*60+ +m[2],e=+m[3]*60+ +m[4];if(e<=s)e+=1440;arcs.push([s,e])}if(out)out.textContent=t.trim()}
function show(){arcs.forEach(function(a){var c=d.createElementNS(ns,'circle');c.setAttribute('cx','110');c.setAttribute('cy','110');c.setAttribute('r','86');c.setAttribute('class','ax-arc');c.setAttribute('transform','rotate('+(a[0]/1440*360-90)+' 110 110)');g.appendChild(c);var len=Math.min(1,(a[1]-a[0])/1440)*C;requestAnimationFrame(function(){requestAnimationFrame(function(){c.style.strokeDasharray=len.toFixed(1)+' '+C.toFixed(1)})})});if(nd)nd.style.transform='rotate('+(mins/1440*360)+'deg)'}
if(reduce||!('IntersectionObserver' in W))show();else{var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){show();io.disconnect()}},{threshold:.3});io.observe(dl)}})})();`;

/** The brand mark: a racing line through a corner, its apex marked. Decoration only. */
const Mark = () => (
  <svg viewBox="0 0 30 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <path d="M1 17 C 9 17, 11 3, 15 3 S 21 17, 29 17" />
    <circle cx="15" cy="3" r="1.8" fill="currentColor" stroke="none" />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
    <path d="M3 12h17M14 6l6 6-6 6" />
  </svg>
);

const n2 = (n: number) => String(n + 1).padStart(2, "0");

function Head({ kicker, title, intro, id, row }: { kicker?: string; title: string; intro?: string; id?: string; row?: boolean }) {
  return (
    <header className={`ax-head${row && intro ? " is-row" : ""}`}>
      {kicker ? (
        <p className="ax-kick" data-rv>
          {kicker}
        </p>
      ) : null}
      <h2 id={id} className={long(title)} data-rv>
        <span className="ax-cl">{em(title)}</span>
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
      <header className="ax-hdr hdr">
        <div className="ax-wrap ax-bar">
          <a href="#top" className="ax-logo" aria-label={c.name}>
            <Mark />
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="ax-links" data-nav>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn ax-ghost ax-hcta">
            <i aria-hidden="true" />
            {cta.label}
          </a>
          <button type="button" className="ax-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
        <span className="ax-rev" aria-hidden="true" />
      </header>
      <div id="site-menu" className="ax-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{n2(k)}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ax-menu-foot">
          <p>
            {b.address ?? b.city}
            {b.phone ? (
              <>
                {" · "}
                <a href={tel(b.phone)}>{b.phone}</a>
              </>
            ) : null}
          </p>
          <Btn c={c} href={cta.href}>
            {cta.label} <Arrow />
          </Btn>
        </div>
      </div>
    </>
  );
}

/** The headline as words that arrive at speed; a marked phrase keeps its emphasis. */
function Words({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let k = 0;
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => {
        const node = (
          <span className="ax-w" key={k}>
            <span style={i(k)}>{n % 2 ? <em>{w}</em> : w}</span>
          </span>
        );
        if (k) out.push(" ");
        out.push(node);
        k++;
      }),
  );
  return <>{out}</>;
}

/** Without a photograph: a racing line through a corner over a faint grid, with passing light. */
const PlainArt = () => (
  <>
    <svg className="ax-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ax-g" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#f3f1ec" stopOpacity="0" />
          <stop offset=".55" stopColor="#f3f1ec" stopOpacity=".5" />
          <stop offset="1" stopColor="#e3122c" />
        </linearGradient>
      </defs>
      <path className="ax-grid" d="M0 225H1440M0 450H1440M0 675H1440M360 0V900M720 0V900M1080 0V900" />
      <path className="ax-race" pathLength={1} d="M-60 820 C 380 820, 640 760, 860 520 S 1180 210, 1500 190" />
      <path className="ax-race2" pathLength={1} d="M-60 870 C 420 870, 700 800, 920 560 S 1220 260, 1500 250" />
      <circle cx="1004" cy="355" r="5" />
    </svg>
    <div className="ax-streaks" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((n) => (
        <i key={n} style={i(n)} />
      ))}
    </div>
  </>
);

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 46 ? "is-s" : plain.length > 26 ? "is-m" : undefined;
  const facts = heroFacts(c);
  return (
    <section className={`ax-hero${p ? "" : " is-plain"}`}>
      <div className="ax-hero-media">
        {p ? <Pic p={p} eager sizes="100vw" /> : <PlainArt />}
        {p ? <span className="ax-shade" aria-hidden="true" /> : null}
        {p ? <span className="ax-sweep" aria-hidden="true" /> : null}
      </div>
      <span className="ax-scan" aria-hidden="true" />
      <div className="ax-wrap ax-hero-in">
        {hero.eyebrow ? (
          <p className="ax-eyebrow ax-in" style={i(-4)}>
            <i aria-hidden="true" />
            {hero.eyebrow}
            <NowBadge c={c} className="ax-now" />
          </p>
        ) : null}
        <h1 className={size}>
          <Words text={hero.headline} />
        </h1>
        <div className="ax-hero-row">
          <p className="ax-lede ax-in" style={i(0)}>
            {hero.subheadline}
          </p>
          <div className="ax-ctas ax-in" style={i(1)}>
            <a href={hero.primaryCta.href} className="btn ax-fill ax-mag">
              {hero.primaryCta.label} <Arrow />
            </a>
            {hero.secondaryCta ? (
              <a href={hero.secondaryCta.href} className="btn ax-ghost ax-mag">
                {hero.secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className="ax-wrap ax-dash">
        {facts.length || hero.note ? (
          <dl className="ax-facts">
            {facts.map((f, n) => (
              <div key={f.label} style={i(n)}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            {hero.note ? (
              <div style={i(facts.length)}>
                <dt>{c.name}</dt>
                <dd>{hero.note}</dd>
              </div>
            ) : null}
          </dl>
        ) : (
          <span />
        )}
        <span className="ax-cue" aria-hidden="true">
          {c.spec.business.city ?? ""}
        </span>
      </div>
    </section>
  );
}

/** Numbers with a unit ("640 pk", "12.800 km"): comparable when two or more share the unit. */
function parseSpec(t: string): { v: number; unit: string } | null {
  const m = /^([\d.,]+)\s*([a-zA-Z%°/ ]{1,8})$/.exec(t.trim());
  if (!m) return null;
  const v = parseFloat(m[1].replace(/\.(?=\d{3}\b)/g, "").replace(",", "."));
  return Number.isFinite(v) && v > 0 ? { v, unit: m[2].trim().toLowerCase() } : null;
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="ax-foot">
      <div className="ax-wrap">
        <p className="ax-kick" data-rv>
          {c.t.contact}
        </p>
        <a href={cta.href} className="ax-foot-cta">
          {cta.label}
          <Arrow />
        </a>
        <div className="ax-foot-grid">
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
            {b.address || b.city ? <span>{b.address ?? b.city}</span> : null}
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
          {c.spec.footer.blurb ? (
            <div>
              <h3>{c.name}</h3>
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
        </div>
        <p className="ax-foot-name" aria-hidden="true" data-rv style={css({ "--n": Math.max(7, c.name.length) })}>
          <span>{c.name}</span>
        </p>
        <Legal c={c} className="ax-legal" />
      </div>
    </footer>
  );
}

export const apex: Family = {
  key: "apex",
  root: "d-apex",
  fonts: ["Italiana", "Archivo"],
  themeColor: "#0a0a0b",
  accent: "#e3122c",
  onAccent: "#ffffff",
  css: "",
  extra: CSS,
  js: TODAY_JS + JS,
  cls: { wrap: "ax-wrap", eyebrow: "ax-kick", btn: "ax-fill", btnAlt: "ax-ghost", btnText: "ax-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="ax-sec" id={s.id}>
          <div className={`ax-wrap ax-about${p ? "" : " is-solo"}`}>
            {p ? (
              <figure className="ax-about-pic" data-rv data-px>
                <span>
                  <Pic p={p} sizes="(min-width: 960px) 40vw, 92vw" />
                </span>
                <figcaption aria-hidden="true">
                  <span>{c.name}</span>
                  <span>{c.spec.business.city ?? ""}</span>
                </figcaption>
              </figure>
            ) : null}
            <div className="ax-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="ax-lead" data-rv>
                {first}
              </p>
              {rest.length ? (
                <div className={`ax-cols${rest.length > 1 ? " is-two" : ""}`}>
                  {rest.map((x, n) => (
                    <p key={n} data-rv style={i(n)}>
                      {x}
                    </p>
                  ))}
                </div>
              ) : null}
              {s.highlights.length > 0 && (
                <ul className="ax-sheet" data-rv>
                  {s.highlights.map((h, n) => (
                    <li key={h} style={i(n)}>
                      <small>{n2(n)}</small>
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
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      const tab = (n: number) => `${s.id}-tab-${n}`;
      const total = cats.reduce((a, x) => a + x.items.length, 0);
      // Units shared by two or more items get proportional bars: their own values, compared.
      const max = new Map<string, number>();
      const seen = new Map<string, number>();
      for (const cat of cats)
        for (const it of cat.items)
          for (const t of it.tags ?? []) {
            const x = parseSpec(t);
            if (!x) continue;
            seen.set(x.unit, (seen.get(x.unit) ?? 0) + 1);
            max.set(x.unit, Math.max(max.get(x.unit) ?? 0, x.v));
          }
      let k = 0;
      return (
        <section className="ax-sec is-alt" id={s.id}>
          <div className="ax-wrap">
            <Head title={s.title} intro={s.intro} row />
            <div className="ax-inv-top" data-rv>
              {cats.length > 1 ? (
                <div className="ax-tabs" role="tablist" aria-label={s.title.replace(/\*/g, "")}>
                  <span className="ax-ind" aria-hidden="true" />
                  {cats.map((cat, n) => (
                    <button key={n} type="button" role="tab" id={tab(n)} aria-selected={n === 0} aria-controls={`${s.id}-panel-${n}`} tabIndex={n === 0 ? 0 : -1}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="ax-kick">{cats[0].name}</p>
              )}
              <p className="ax-total" aria-hidden="true">
                <b>{String(total).padStart(2, "0")}</b>
              </p>
            </div>
            {cats.map((cat, n) => (
              <ul key={n} id={`${s.id}-panel-${n}`} className="ax-cars" data-rv role={cats.length > 1 ? "tabpanel" : undefined} aria-labelledby={cats.length > 1 ? tab(n) : undefined} hidden={n > 0}>
                {cat.items.map((it, m) => {
                  const p = c.hasPhotos ? c.spare() : null;
                  const idx = k++;
                  return (
                    <li key={m} style={i(m % 6)}>
                      <article className={`ax-car${p ? " has-pic" : ""}`}>
                        <figure className="ax-car-pic">
                          <span className="ax-car-idx" aria-hidden="true">
                            {n2(idx)}
                          </span>
                          {p ? (
                            <Pic p={p} sizes="(min-width: 1100px) 32vw, (min-width: 700px) 48vw, 92vw" />
                          ) : (
                            <span className="ax-car-ghost" aria-hidden="true">
                              {n2(idx)}
                            </span>
                          )}
                        </figure>
                        <div className="ax-car-body">
                          <div className="ax-car-top">
                            <h3>{it.name}</h3>
                            {it.price ? <b>{it.price}</b> : null}
                          </div>
                          {it.tags?.length ? (
                            <ul className="ax-specs">
                              {it.tags.map((t) => {
                                const x = parseSpec(t);
                                const rel = x && (seen.get(x.unit) ?? 0) > 1 ? x.v / (max.get(x.unit) || x.v) : null;
                                return (
                                  <li key={t}>
                                    {t}
                                    <i className={rel ? "is-rel" : undefined} style={css({ "--v": rel ? rel.toFixed(3) : 1 })} aria-hidden="true" />
                                  </li>
                                );
                              })}
                            </ul>
                          ) : null}
                          {it.description ? <p className="ax-car-desc">{it.description}</p> : null}
                          {cats.length > 1 ? (
                            <p className="ax-car-cat" aria-hidden="true">
                              {cat.name}
                            </p>
                          ) : null}
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            ))}
            {s.note ? (
              <p className="ax-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => {
      const pics = s.items.map((_, n) => c.photo(`art:svc${n}`));
      const stage = pics.some(Boolean);
      return (
        <section className="ax-sec" id={s.id}>
          <div className="ax-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} row />
            <div className={`ax-svc${stage ? " has-stage" : ""}`}>
              <ol className="ax-rows">
                {s.items.map((it, n) => (
                  <li key={n} className={`ax-row${n === 0 ? " is-act" : ""}`} data-rv style={i(n % 4)}>
                    <small>{n2(n)}</small>
                    <div>
                      <h3>{it.title}</h3>
                      <p>{it.description}</p>
                      {it.duration || it.price ? (
                        <p className="ax-row-meta">
                          {it.duration ? <span>{it.duration}</span> : null}
                          {it.price ? <b>{it.price}</b> : null}
                        </p>
                      ) : null}
                    </div>
                    {pics[n] ? (
                      <figure className="ax-thumb">
                        <Pic p={pics[n]!} sizes="92vw" />
                      </figure>
                    ) : null}
                  </li>
                ))}
              </ol>
              {stage ? (
                <div className="ax-stage" aria-hidden="true">
                  <div className="ax-frame">
                    {pics.map((p, n) => (p ? <Pic key={n} p={p} sizes="(min-width: 1000px) 38vw, 1px" className={n === pics.findIndex(Boolean) ? "is-on" : undefined} tab={String(n)} /> : null))}
                  </div>
                  <p className="ax-stage-cap">
                    <span>
                      <b data-at>01</b> / {n2(s.items.length - 1)}
                    </span>
                    <span>{c.t.kick.services}</span>
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="ax-sec is-alt" id={s.id}>
        <div className="ax-wrap ax-feat">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="ax-feat-list">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 2)}>
                <span className="ax-ico">
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
      <section className="ax-sec" id={s.id}>
        <div className="ax-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} row />
          <div className="ax-track" data-rv>
            <svg className="ax-race" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id={`${s.id}-rg`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#f3f1ec" stopOpacity=".25" />
                  <stop offset=".7" stopColor="#f3f1ec" stopOpacity=".6" />
                  <stop offset="1" stopColor="#e3122c" />
                </linearGradient>
              </defs>
              <path className="ax-r2" d="M0 104 C 220 104, 300 24, 500 24 S 780 96, 1000 40" />
              <path className="ax-r1" pathLength={1} stroke={`url(#${s.id}-rg)`} d="M0 104 C 220 104, 300 24, 500 24 S 780 96, 1000 40" />
            </svg>
            <ol className="ax-steps" style={css({ "--n": s.steps.length })}>
              {s.steps.map((st, n) => (
                <li key={n} style={i(n)}>
                  <i aria-hidden="true" />
                  <small>S{n + 1}</small>
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
        <section className="ax-gal" id={s.id}>
          <div className="ax-gal-pin">
            <div className="ax-wrap">
              <Head kicker={c.t.kick.gallery} title={s.title} />
            </div>
            <div className="ax-gal-track">
              {pics.map((p, n) => (
                <figure key={n} data-rv style={i(n % 3)}>
                  <div className="ax-gal-pic">
                    <Pic p={p} sizes="(min-width: 900px) 44vw, 92vw" />
                  </div>
                  <figcaption>
                    <b>{n2(n)}</b>
                    <span>{p.alt}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="ax-wrap ax-gal-prog" aria-hidden="true">
              <b>01</b>
              <span />
              <b>{n2(pics.length - 1)}</b>
            </div>
          </div>
        </section>
      );
    },
    showcase: (s, c) => {
      const p = c.photo(s.image);
      return (
        <section className={`ax-show${p ? " has-pic" : ""}`} id={s.id}>
          {p ? (
            <>
              <div className="ax-show-media" data-px>
                <Pic p={p} sizes="100vw" />
              </div>
              <span className="ax-show-fx" data-rv aria-hidden="true">
                <span className="ax-show-sweep" />
              </span>
            </>
          ) : null}
          <div className="ax-wrap ax-show-in">
            <p className="ax-kick" data-rv>
              {c.t.kick.showcase}
            </p>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {s.body ? <p data-rv>{s.body}</p> : null}
            {s.cta ? (
              <p data-rv>
                <Btn c={c} href={s.cta.href} variant="alt">
                  {s.cta.label} <Arrow />
                </Btn>
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    statement: (s) => (
      <section className="z-sec z-statement" id={s.id}>
        <div className="ax-wrap z-center">
          {s.note ? (
            <p className="ax-kick" data-rv>
              {s.note}
            </p>
          ) : null}
          <h2 data-rv>{em(s.title)}</h2>
        </div>
      </section>
    ),
    hours: (s, c) => (
      <section className="ax-sec is-alt" id={s.id}>
        <div className="ax-wrap ax-visit">
          <div className="ax-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <p data-rv>
              <NowBadge c={c} className="ax-now" />
            </p>
            <Reach c={c} />
          </div>
          {c.spec.business.openingHours?.length ? (
            <div className="ax-inst">
              <Dial c={c} />
              <Hours c={c} />
            </div>
          ) : (
            <p className="z-note" data-rv>
              {c.t.hoursTbc}
            </p>
          )}
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="ax-sec" id={s.id}>
        <div className="ax-wrap ax-book">
          <div className="ax-book-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Hours c={c} />
            <Reach c={c} />
          </div>
          <div className="ax-form" data-rv>
            <p className="ax-form-top" aria-hidden="true">
              <b>{c.t.submit[s.kind]}</b>
              <span>{c.name}</span>
            </p>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="ax-sec is-alt" id={s.id}>
        <div className="ax-wrap ax-book">
          <div className="ax-book-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="ax-form" data-rv>
              <p className="ax-form-top" aria-hidden="true">
                <b>{c.t.send}</b>
                <span>{c.name}</span>
              </p>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : null}
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="ax-sec" id={s.id}>
        <div className="ax-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} row />
          <ul className="ax-feat-list">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 2)}>
                <a href={ch.href} className="ax-chan" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="ax-ico">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <span className="ax-text" aria-hidden="true">
                    <Arrow />
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

/** A 24-hour instrument: today's opening time as a red arc (filled in by the script), the needle on the current time. */
function Dial({ c }: { c: Ctx }) {
  const ticks = Array.from({ length: 48 }, (_, n) => n);
  return (
    <div className="ax-dial" data-dial aria-hidden="true">
      <svg viewBox="0 0 220 220">
        <circle className="ax-trk" cx="110" cy="110" r="86" />
        <g className="ax-arcs" />
        {ticks.map((n) => {
          const a = (n / 48) * Math.PI * 2;
          const major = n % 12 === 0;
          const r1 = major ? 98 : n % 2 === 0 ? 100 : 102;
          return <line key={n} className={major ? "ax-tk is-major" : "ax-tk"} x1={110 + Math.sin(a) * r1} y1={110 - Math.cos(a) * r1} x2={110 + Math.sin(a) * 106} y2={110 - Math.cos(a) * 106} />;
        })}
        {[0, 6, 12, 18].map((h) => {
          const a = (h / 24) * Math.PI * 2;
          return (
            <text key={h} x={110 + Math.sin(a) * 116} y={110 - Math.cos(a) * 116}>
              {String(h).padStart(2, "0")}
            </text>
          );
        })}
        <g className="ax-needle">
          <line x1="110" y1="12" x2="110" y2="44" />
          <circle cx="110" cy="12" r="3" />
        </g>
      </svg>
      <div className="ax-dial-c">
        <small>{c.t.today}</small>
        <b data-dial-time>{c.t.hours}</b>
      </div>
    </div>
  );
}
