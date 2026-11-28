import type { ReactNode } from "react";
import { Btn, css, DemoForm, em, heroFacts, hoursRows, i, Icon, Legal, long, offerWords, Pic, Reach, splitLines, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Fjord: an original template (no portfolio demo) for dental and healthcare practices, in a
 * Scandinavian key: clean white, a soft cool blue and light oak, a precise grotesk (Manrope)
 * with a serif italic (Fraunces) for the one phrase that matters, and a faint column grid
 * the page is built on. The headline rises out of its lines while the photograph is uncovered
 * like window blinds; treatments are clear cards that say what to expect; the first visit is
 * told sideways as you scroll; opening hours are a week on a time line, today marked. On a
 * phone the menu is a sheet that slides up within reach of the thumb. Made for dentists,
 * orthodontists, physiotherapists, GP and other healthcare practices, and calm, precise
 * service businesses.
 */

const CSS = `
.d-fjord{--white:#ffffff;--fog:#f2f5f7;--ice:#e4edf4;--ice-2:#cfdeea;--blue:#7aa0c2;--blue-d:#2d5b80;--blue-dd:#1f4563;--ink:#14212b;--ink-2:#33424e;--dim:#5a6874;--line:rgba(20,33,43,.11);--line-2:rgba(20,33,43,.2);--oak:#d8bb92;--oak-l:#f4ece0;--oak-d:#80603b;--ok:#2f7d5b;--pad:clamp(18px,4.6vw,64px);--max:1320px;--r:16px;--ease:cubic-bezier(.2,.8,.2,1);--snap:cubic-bezier(.65,0,.2,1);--sans:"Manrope",system-ui,sans-serif;--serif:"Fraunces",Georgia,serif;--z-bg2:var(--fog);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--blue-d);--z-on-accent:#fff;--z-display:var(--sans);--z-display-weight:650;--z-radius:var(--r);--z-field-radius:10px;--z-ico-radius:12px;--z-sec:clamp(80px,9vw,140px);--z-h3:clamp(20px,1.6vw,24px);--z-statement:clamp(30px,3.8vw,56px);background:var(--white);color:var(--ink-2);font-family:var(--sans);font-weight:450;font-size:clamp(16px,1vw,17.5px);line-height:1.65}
.d-fjord h1,.d-fjord h2,.d-fjord h3{font-family:var(--sans);font-weight:650;letter-spacing:-.032em;line-height:1.04;color:var(--ink)}
.d-fjord h1 em,.d-fjord h2 em,.d-fjord h3 em,.d-fjord .fj-it{font-family:var(--serif);font-style:italic;font-weight:400;letter-spacing:-.015em;color:var(--blue-d)}
.d-fjord h2{font-size:clamp(34px,4.3vw,64px)}
.d-fjord h2.is-long{font-size:clamp(28px,3.2vw,46px);line-height:1.1}
.d-fjord h3{letter-spacing:-.02em;line-height:1.2}
.d-fjord ::selection{background:var(--ice-2);color:var(--ink)}
.d-fjord .fj-wrap{position:relative;width:min(100%,var(--max));margin-inline:auto;padding-inline:var(--pad)}
.d-fjord .fj-kick{display:inline-flex;align-items:center;gap:10px;font-size:12.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--blue-d)}
.d-fjord .fj-kick::before{content:"";width:8px;height:8px;border-radius:2px;background:var(--oak);transform:rotate(45deg)}
.demo-js .d-fjord [data-rv]{transform:translateY(28px);transition:opacity .8s var(--ease),transform .9s var(--ease);transition-delay:calc(var(--i,0) * 80ms)}
.demo-js .d-fjord [data-rv].in{transform:none}
.d-fjord .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 24px;border-radius:10px;font-size:15.5px;font-weight:700;letter-spacing:-.005em;white-space:nowrap;overflow:hidden;isolation:isolate;transition:background-color .35s var(--ease),color .35s,border-color .35s,transform .35s var(--ease),box-shadow .35s}
.d-fjord .btn svg{width:18px;height:18px;flex:none;transition:transform .45s var(--ease)}
.d-fjord .btn:hover svg{transform:translateX(4px)}
.d-fjord .fj-fill{background:var(--blue-d);color:#fff;box-shadow:0 1px 0 rgba(255,255,255,.18) inset,0 10px 24px -14px rgba(31,69,99,.8)}
.d-fjord .fj-fill:hover{background:var(--blue-dd);transform:translateY(-2px);box-shadow:0 1px 0 rgba(255,255,255,.18) inset,0 16px 30px -14px rgba(31,69,99,.85)}
.d-fjord .fj-fill:active{transform:none}
.d-fjord .fj-line{border:1.5px solid var(--line-2);background:var(--white);color:var(--ink)}
.d-fjord .fj-line:hover{border-color:var(--blue-d);color:var(--blue-d)}
.d-fjord .fj-text{position:relative;display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:700;color:var(--blue-d)}
.d-fjord .fj-text::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:2px;border-radius:2px;background:var(--oak);transform-origin:left;transition:transform .45s var(--snap)}
.d-fjord .fj-text:hover::after{transform:scaleX(.4)}
.d-fjord .fj-hdr{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.9);backdrop-filter:blur(16px) saturate(1.3);-webkit-backdrop-filter:blur(16px) saturate(1.3);transition:box-shadow .4s}
.d-fjord.is-scrolled .fj-hdr{box-shadow:0 1px 0 var(--line),0 12px 30px -26px rgba(20,33,43,.5)}
.d-fjord .fj-bar{display:flex;align-items:center;gap:18px;height:76px;transition:height .4s var(--ease)}
.d-fjord.is-scrolled .fj-bar{height:66px}
.d-fjord .fj-logo{display:flex;align-items:center;gap:11px;min-width:0;min-height:44px;margin-right:auto;font-size:18px;font-weight:750;letter-spacing:-.02em;color:var(--ink)}
.d-fjord .fj-logo i{position:relative;display:grid;flex:none;place-items:center;width:36px;height:36px;border-radius:10px;background:var(--blue-d);font-family:var(--serif);font-size:20px;font-style:italic;font-weight:400;color:#fff;overflow:hidden;transition:transform .5s var(--ease)}
.d-fjord .fj-logo i::after{content:"";position:absolute;left:0;right:0;bottom:0;height:30%;background:var(--oak)}
.d-fjord .fj-logo i span{position:relative;z-index:1;margin-top:-4px}
.d-fjord .fj-logo:hover i{transform:rotate(-6deg)}
.d-fjord .fj-logo b{overflow:hidden;font-weight:750;text-overflow:ellipsis;white-space:nowrap}
.d-fjord .fj-links{position:relative;display:none;align-items:center;gap:4px;font-size:15px;font-weight:600}
.d-fjord .fj-links a{position:relative;z-index:1;padding:10px 14px;border-radius:8px;color:var(--ink-2);white-space:nowrap;transition:color .3s}
.d-fjord .fj-links a:hover,.d-fjord .fj-links a.is-on{color:var(--blue-d)}
.d-fjord .fj-ind{position:absolute;left:0;bottom:2px;width:var(--w,0);height:2px;border-radius:2px;background:var(--blue-d);transform:translateX(var(--x,0));opacity:0;transition:transform .45s var(--ease),width .45s var(--ease),opacity .3s}
.d-fjord .fj-ind.on{opacity:1}
.d-fjord .fj-now{display:inline-flex;align-items:center;gap:8px;min-height:30px;padding:0 12px 0 10px;border-radius:999px;background:var(--fog);font-size:13px;font-weight:700;letter-spacing:-.005em;color:var(--ink-2);white-space:nowrap}
.d-fjord .fj-now::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor}
.d-fjord .fj-now.is-open{background:#e3f1ea;color:var(--ok)}
.d-fjord .fj-now.is-closed{color:var(--dim)}
.d-fjord .fj-hdr .fj-now{display:none}
.d-fjord .fj-hdr .fj-cta{display:none;min-height:46px;padding:0 18px;font-size:15px}
.d-fjord .fj-mbtn{display:inline-flex;align-items:center;gap:10px;min-height:46px;padding:0 16px;border:1.5px solid var(--line-2);border-radius:10px;background:var(--white);font-size:15px;font-weight:700;color:var(--ink)}
.d-fjord .fj-mbtn i{display:grid;gap:5px;width:18px}
.d-fjord .fj-mbtn i::before,.d-fjord .fj-mbtn i::after{content:"";height:2px;border-radius:2px;background:currentColor}
.d-fjord .fj-mbtn i::after{width:12px}
@media (min-width:600px){.d-fjord .fj-hdr .fj-cta{display:inline-flex}}
@media (min-width:1100px){.d-fjord .fj-links{display:flex}.d-fjord .fj-mbtn{display:none}.d-fjord .fj-logo{margin-right:0}.d-fjord .fj-links{margin:0 auto}}
@media (min-width:1280px){.d-fjord .fj-hdr .fj-now{display:inline-flex}}
.d-fjord .fj-sheet{position:fixed;inset:0;z-index:45;visibility:hidden;transition:visibility 0s .6s}
.d-fjord .fj-sheet.is-open{visibility:visible;transition:none}
.d-fjord .fj-scrim{position:absolute;inset:0;background:rgba(20,33,43,.42);opacity:0;transition:opacity .5s var(--ease)}
.d-fjord .fj-sheet.is-open .fj-scrim{opacity:1}
.d-fjord .fj-panel{position:absolute;left:0;right:0;bottom:0;display:grid;gap:18px;max-height:88svh;overflow-y:auto;padding:10px var(--pad) calc(96px + env(safe-area-inset-bottom));border-radius:24px 24px 0 0;background:var(--white);box-shadow:0 -20px 60px -30px rgba(20,33,43,.5);transform:translateY(104%);transition:transform .6s cubic-bezier(.2,.9,.15,1)}
.d-fjord .fj-sheet.is-open .fj-panel{transform:none}
.d-fjord .fj-grab{justify-self:center;width:44px;height:5px;border-radius:5px;background:var(--ice-2)}
.d-fjord .fj-panel-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
.d-fjord .fj-panel-top b{font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}
.d-fjord .fj-x{display:grid;place-items:center;width:44px;height:44px;border:0;border-radius:50%;background:var(--fog);color:var(--ink)}
.d-fjord .fj-x svg{width:18px;height:18px}
.d-fjord .fj-panel nav{display:grid;border-top:1px solid var(--line)}
.d-fjord .fj-panel nav a{display:grid;grid-template-columns:38px minmax(0,1fr) auto;align-items:center;min-height:60px;border-bottom:1px solid var(--line);font-size:21px;font-weight:650;letter-spacing:-.02em;color:var(--ink);opacity:0;transform:translateY(14px);transition:opacity .4s,transform .55s var(--ease),color .25s}
.d-fjord .fj-sheet.is-open .fj-panel nav a{opacity:1;transform:none;transition-delay:calc(.15s + var(--i,0) * 50ms)}
.d-fjord .fj-panel nav a small{font-family:var(--serif);font-size:15px;font-style:italic;font-weight:400;color:var(--blue)}
.d-fjord .fj-panel nav a svg{width:18px;height:18px;color:var(--blue-d)}
.d-fjord .fj-panel nav a:hover{color:var(--blue-d)}
.d-fjord .fj-panel .btn{width:100%}
.d-fjord .fj-panel-info{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 16px;font-size:14.5px;color:var(--dim)}
.d-fjord .fj-panel-info a{display:inline-flex;align-items:center;min-height:44px;font-weight:700;color:var(--ink)}
.d-fjord .fj-hero{position:relative;padding:clamp(28px,5vw,72px) 0 clamp(40px,5vw,80px);overflow:hidden}
.d-fjord .fj-grid{position:absolute;inset:0;z-index:0;display:grid;grid-template-columns:repeat(6,1fr);width:min(100%,var(--max));margin-inline:auto;padding-inline:var(--pad);pointer-events:none}
@media (min-width:900px){.d-fjord .fj-grid{grid-template-columns:repeat(12,1fr)}}
.d-fjord .fj-grid i{border-left:1px solid rgba(45,91,128,.07);transform-origin:top;animation:fj-draw 1.4s var(--snap) both;animation-delay:calc(var(--i,0) * 40ms)}
.d-fjord .fj-grid i:last-child{border-right:1px solid rgba(45,91,128,.07)}
@media (max-width:899px){.d-fjord .fj-grid i:nth-child(n+7){display:none}.d-fjord .fj-grid i:nth-child(6){border-right:1px solid rgba(45,91,128,.07)}}
.d-fjord .fj-hero-in{position:relative;z-index:1;display:grid;gap:clamp(32px,4vw,64px)}
@media (min-width:980px){.d-fjord .fj-hero-in{grid-template-columns:minmax(0,1.04fr) minmax(0,.96fr);align-items:center}}
.d-fjord .fj-hero-copy{display:grid;gap:24px;align-content:center}
.d-fjord .fj-chip{display:inline-flex;flex-wrap:wrap;align-items:center;gap:10px 14px;justify-self:start;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--blue-d);animation:fj-up .8s var(--ease) .1s both}
.d-fjord .fj-chip .fj-now{text-transform:none;letter-spacing:-.005em}
.d-fjord .fj-hero h1{font-size:clamp(42px,6vw,92px);line-height:1;letter-spacing:-.04em}
.d-fjord .fj-hero h1.is-m{font-size:clamp(38px,5vw,76px)}
.d-fjord .fj-hero h1.is-s{font-size:clamp(34px,4vw,60px);line-height:1.05}
.d-fjord .fj-ln{display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}
.d-fjord .fj-ln>span{display:block;transform:translateY(108%);animation:fj-rise 1s var(--snap) both;animation-delay:calc(.2s + var(--i,0) * 110ms)}
.d-fjord .fj-lede{max-width:46ch;font-size:clamp(17px,1.25vw,19.5px);color:var(--ink-2);animation:fj-up .9s var(--ease) .55s both}
.d-fjord .fj-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px 22px;animation:fj-up .9s var(--ease) .65s both}
.d-fjord .fj-trust{display:flex;flex-wrap:wrap;gap:8px}
.d-fjord .fj-trust li{display:inline-flex;align-items:center;gap:8px;min-height:38px;padding:0 14px 0 10px;border:1px solid var(--line);border-radius:999px;background:var(--white);font-size:14px;font-weight:600;color:var(--ink);animation:fj-up .7s var(--ease) both;animation-delay:calc(.8s + var(--i,0) * 90ms)}
.d-fjord .fj-trust svg{width:18px;height:18px;color:var(--blue-d)}
.d-fjord .fj-media{position:relative}
.d-fjord .fj-photo{position:relative;overflow:hidden;aspect-ratio:4/4.4;border-radius:20px;background:var(--ice)}
@media (min-width:980px){.d-fjord .fj-photo{aspect-ratio:4/4.8;max-height:calc(100svh - 150px);min-height:420px;width:100%}}
.d-fjord .fj-photo img{width:100%;height:100%;object-fit:cover;transform:scale(1.14) translateY(calc(var(--p,0) * -3%));animation:fj-settle 1.8s var(--ease) .3s both}
.d-fjord .fj-blinds{position:absolute;inset:0;z-index:1;display:grid;grid-template-columns:repeat(6,1fr);pointer-events:none}
.d-fjord .fj-blinds i{background:var(--white);transform-origin:top;animation:fj-blind .9s var(--snap) both;animation-delay:calc(.35s + var(--i,0) * 75ms)}
.d-fjord .fj-info{position:absolute;left:clamp(-28px,-2vw,-8px);bottom:clamp(16px,3vw,32px);z-index:2;display:grid;width:min(86%,330px);padding:8px 18px;border-radius:14px;background:var(--white);box-shadow:0 24px 50px -26px rgba(20,33,43,.45);animation:fj-slide .9s var(--ease) 1s both}
@media (max-width:979px){.d-fjord .fj-info{left:12px;bottom:12px}}
.d-fjord .fj-info div{display:grid;grid-template-columns:auto minmax(0,1fr);gap:2px 12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line)}
.d-fjord .fj-info div:last-child{border-bottom:0}
.d-fjord .fj-info dt{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:var(--ice);color:var(--blue-d)}
.d-fjord .fj-info dt svg{width:16px;height:16px}
.d-fjord .fj-info dd{margin:0;font-size:14.5px;font-weight:600;line-height:1.35;color:var(--ink)}
.d-fjord .fj-info dd small{display:block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--dim)}
.d-fjord .fj-info a{color:inherit}
.d-fjord .fj-plate{position:relative;display:grid;align-content:space-between;gap:24px;overflow:hidden;aspect-ratio:4/4.2;padding:clamp(24px,3vw,40px);border-radius:20px;background:linear-gradient(180deg,var(--ice) 0%,var(--fog) 62%,var(--oak-l) 62%,var(--oak-l) 100%);animation:fj-up 1s var(--ease) .3s both}
.d-fjord .fj-plate svg{position:absolute;left:0;right:0;top:44%;width:100%;height:auto;color:var(--blue);opacity:.55}
.d-fjord .fj-plate svg path{animation:fj-wave 9s ease-in-out infinite alternate;animation-delay:calc(var(--i,0) * -1.5s)}
.d-fjord .fj-plate b{position:relative;font-family:var(--serif);font-size:clamp(120px,14vw,210px);font-style:italic;font-weight:300;line-height:.8;color:var(--blue-d)}
.d-fjord .fj-plate ul{position:relative;display:flex;flex-wrap:wrap;gap:8px}
.d-fjord .fj-plate li{padding:6px 12px;border-radius:999px;background:var(--white);font-size:13.5px;font-weight:650;color:var(--ink)}
.d-fjord .fj-band{position:relative;z-index:1;margin-top:clamp(36px,5vw,72px)}
.d-fjord .fj-band ul{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));border-radius:var(--r);background:var(--oak-l);overflow:hidden}
.d-fjord .fj-band li+li{border-left:1px solid rgba(128,96,59,.18)}
@media (max-width:620px){.d-fjord .fj-band li+li{border-left:0;border-top:1px solid rgba(128,96,59,.18)}}
.d-fjord .fj-band a,.d-fjord .fj-band span{display:flex;align-items:baseline;gap:14px;height:100%;min-height:76px;padding:16px 22px;color:var(--ink)}
.d-fjord .fj-band a{transition:background-color .3s}
.d-fjord .fj-band a:hover{background:rgba(216,187,146,.28)}
.d-fjord .fj-band b{font-family:var(--serif);font-size:clamp(34px,3vw,46px);font-style:italic;font-weight:400;line-height:1;color:var(--oak-d);font-variant-numeric:tabular-nums}
.d-fjord .fj-band em{font-style:normal;font-size:15px;font-weight:650}
.d-fjord .fj-sec{position:relative;padding-block:var(--z-sec)}
.d-fjord .fj-sec.is-fog{background:var(--fog)}
.d-fjord .fj-sec.is-ice{background:var(--ice)}
.d-fjord .fj-sec.is-oak{background:var(--oak-l)}
.d-fjord .fj-sec.is-oak::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(92deg,rgba(128,96,59,0) 0 46px,rgba(128,96,59,.045) 46px 47px,rgba(128,96,59,0) 47px 88px,rgba(128,96,59,.03) 88px 90px);pointer-events:none}
.d-fjord .fj-head{display:grid;gap:16px;margin-bottom:clamp(40px,5vw,72px)}
.d-fjord .fj-head>p:not(.fj-kick){max-width:52ch;font-size:1.05em;color:var(--dim)}
@media (min-width:1000px){.d-fjord .fj-head.is-split{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);align-items:end;column-gap:64px}.d-fjord .fj-head.is-split .fj-kick{grid-column:1/-1}.d-fjord .fj-head.is-split>p:not(.fj-kick){padding-bottom:8px}}
.d-fjord .fj-about{display:grid;gap:clamp(36px,5vw,88px)}
@media (min-width:980px){.d-fjord .fj-about{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);align-items:center}.d-fjord .fj-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:960px}}
.d-fjord .fj-about-pic{position:relative}
.d-fjord .fj-about-pic figure{overflow:hidden;aspect-ratio:5/4.6;border-radius:20px;background:var(--ice)}
.d-fjord .fj-about-pic img{width:100%;height:100%;object-fit:cover;transform:scale(1.1) translateY(calc(var(--p,0) * -4%))}
.d-fjord .fj-about-pic::after{content:"";position:absolute;right:-14px;bottom:-14px;z-index:-1;width:46%;height:52%;border-radius:20px;background:var(--oak-l)}
.d-fjord .fj-about-copy{display:grid;gap:22px;align-content:start}
.d-fjord .fj-about-copy .fj-head{margin-bottom:6px}
.d-fjord .fj-lead{font-size:clamp(20px,1.6vw,24px);font-weight:550;line-height:1.5;letter-spacing:-.012em;color:var(--ink)}
.d-fjord .fj-about-copy>p:not(.fj-lead){max-width:60ch;color:var(--dim)}
.d-fjord .fj-checks{display:grid;gap:10px;margin-top:6px}
@media (min-width:600px){.d-fjord .fj-checks.is-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-fjord .fj-checks li{display:flex;align-items:center;gap:12px;min-height:52px;padding:10px 16px;border-radius:12px;background:var(--fog);font-weight:650;color:var(--ink);transition:background-color .3s,transform .4s var(--ease)}
.d-fjord .fj-checks li:hover{background:var(--ice);transform:translateX(4px)}
.d-fjord .fj-checks svg{flex:none;width:20px;height:20px;color:var(--blue-d)}
.d-fjord .fj-cards{display:grid;gap:clamp(14px,1.6vw,24px);grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))}
.d-fjord .fj-card{position:relative;display:flex;flex-direction:column;overflow:hidden;height:100%;border:1px solid var(--line);border-radius:var(--r);background:var(--white);transition:transform .5s var(--ease),box-shadow .5s var(--ease),border-color .4s}
.d-fjord .fj-card:hover{transform:translateY(-6px);border-color:var(--ice-2);box-shadow:0 30px 50px -34px rgba(20,33,43,.45)}
.demo-js .d-fjord .fj-card[data-rv].in:hover{transform:translateY(-6px);transition-delay:0s}
.d-fjord .fj-card figure{position:relative;overflow:hidden;aspect-ratio:16/10.5;background:var(--ice)}
.d-fjord .fj-card figure img{width:100%;height:100%;object-fit:cover;transition:transform 1s var(--ease)}
.d-fjord .fj-card:hover figure img{transform:scale(1.05)}
.d-fjord .fj-card-ico{display:grid;place-items:center;width:56px;height:56px;margin:clamp(22px,2.4vw,30px) clamp(22px,2.4vw,30px) 0;border-radius:14px;background:var(--ice);color:var(--blue-d);transition:transform .5s var(--ease),background-color .4s,color .4s}
.d-fjord .fj-card:hover .fj-card-ico{transform:rotate(-8deg);background:var(--blue-d);color:#fff}
.d-fjord .fj-card-ico svg{width:24px;height:24px}
.d-fjord .fj-card-in{display:flex;flex:1;flex-direction:column;gap:12px;padding:clamp(20px,2.2vw,28px) clamp(22px,2.4vw,30px) clamp(22px,2.4vw,30px)}
.d-fjord .fj-card-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.d-fjord .fj-n{position:relative;font-family:var(--serif);font-size:18px;font-style:italic;color:var(--blue-d)}
.d-fjord .fj-n::after{content:"";position:absolute;left:0;bottom:-2px;width:100%;height:2px;border-radius:2px;background:var(--oak);transform:scaleX(.4);transform-origin:left;transition:transform .5s var(--ease)}
.d-fjord .fj-card:hover .fj-n::after{transform:none}
.d-fjord .fj-tag{display:inline-flex;align-items:center;gap:6px;min-height:28px;padding:0 10px;border-radius:999px;background:var(--fog);font-size:13px;font-weight:650;color:var(--ink-2);white-space:nowrap}
.d-fjord .fj-tag svg{width:14px;height:14px;color:var(--blue-d)}
.d-fjord .fj-card h3{font-size:clamp(20px,1.6vw,24px)}
.d-fjord .fj-card p{color:var(--dim)}
.d-fjord .fj-expect{display:grid;gap:8px;margin-top:4px;padding-top:14px;border-top:1px dashed var(--line-2)}
.d-fjord .fj-expect small{font-size:12px;font-weight:750;letter-spacing:.1em;text-transform:uppercase;color:var(--oak-d)}
.d-fjord .fj-expect li{position:relative;padding-left:24px;font-size:15px;line-height:1.5;color:var(--ink-2)}
.d-fjord .fj-expect li::before{content:"";position:absolute;left:3px;top:.42em;width:10px;height:6px;border-left:2px solid var(--blue-d);border-bottom:2px solid var(--blue-d);transform:rotate(-45deg)}
.d-fjord .fj-card-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:auto;padding-top:14px}
.d-fjord .fj-price{font-size:16px;font-weight:750;color:var(--ink);font-variant-numeric:tabular-nums}
.d-fjord .fj-feats{position:relative;display:grid;gap:clamp(12px,1.4vw,20px);grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))}
.d-fjord .fj-feat{display:grid;gap:14px;align-content:start;height:100%;padding:clamp(22px,2.4vw,32px);border:1px solid rgba(128,96,59,.16);border-radius:var(--r);background:rgba(255,255,255,.78);transition:border-color .4s,background-color .4s,transform .5s var(--ease)}
.d-fjord .fj-feat:hover{border-color:var(--oak);background:#fff;transform:translateY(-4px)}
.d-fjord .fj-feat i{display:grid;place-items:center;width:48px;height:48px;border-radius:12px;background:var(--blue-d);color:#fff;transition:transform .5s var(--ease)}
.d-fjord .fj-feat:hover i{transform:rotate(-8deg) scale(1.05)}
.d-fjord .fj-feat svg{width:22px;height:22px}
.d-fjord .fj-feat h3{font-size:clamp(19px,1.5vw,22px)}
.d-fjord .fj-feat p{color:var(--dim)}
.d-fjord .fj-hs-track{position:relative}
.d-fjord .fj-hs ol{position:relative;display:grid;gap:16px;counter-reset:s}
.d-fjord .fj-step{position:relative;display:grid;grid-template-columns:52px minmax(0,1fr);gap:4px 18px;align-content:start;padding:22px 22px 24px;border:1px solid var(--line);border-radius:var(--r);background:var(--white)}
.d-fjord .fj-step b{grid-row:span 2;display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:var(--ice);font-family:var(--serif);font-size:24px;font-style:italic;font-weight:400;color:var(--blue-d)}
.d-fjord .fj-step h3{align-self:center;font-size:clamp(19px,1.5vw,23px)}
.d-fjord .fj-step p{color:var(--dim)}
.d-fjord .fj-hs:not(.is-hs) ol::before{content:"";position:absolute;left:48px;top:30px;bottom:30px;width:2px;background:var(--ice-2)}
.d-fjord .fj-hs-bar{display:none}
.d-fjord .fj-hs.is-hs{padding:0}
.d-fjord .fj-hs.is-hs .fj-hs-pin{position:sticky;top:0;display:grid;grid-template-columns:minmax(0,1fr);align-content:center;height:100vh;overflow:hidden;padding-block:clamp(64px,8vh,110px) 40px}
.d-fjord .fj-hs.is-hs .fj-head{margin-bottom:clamp(28px,4vh,56px)}
.d-fjord .fj-hs.is-hs ol{display:flex;gap:20px;width:max-content;padding-right:var(--pad);transform:translateX(calc(var(--hx,0) * -1px));will-change:transform}
.d-fjord .fj-hs.is-hs .fj-step{grid-template-columns:minmax(0,1fr);width:clamp(300px,30vw,420px);min-height:min(46vh,380px);padding:clamp(26px,2.6vw,38px);gap:18px}
.d-fjord .fj-hs.is-hs .fj-step b{grid-row:auto;width:auto;height:auto;place-items:start;background:none;font-size:clamp(84px,8vw,128px);font-weight:300;line-height:.8;color:var(--ice-2);transition:color .5s}
.d-fjord .fj-hs.is-hs .fj-step.on b{color:var(--blue-d)}
.d-fjord .fj-hs.is-hs .fj-step:nth-child(odd){background:var(--fog);border-color:transparent}
.d-fjord .fj-hs.is-hs .fj-hs-bar{display:flex;align-items:center;gap:16px;margin-top:clamp(26px,4vh,48px);font-size:13px;font-weight:700;color:var(--dim);font-variant-numeric:tabular-nums}
.d-fjord .fj-hs-bar em{font-style:normal}
.d-fjord .fj-hs-bar b{color:var(--blue-d)}
.d-fjord .fj-hs-line{flex:1;height:2px;border-radius:2px;background:var(--ice)}
.d-fjord .fj-hs-line i{display:block;height:100%;border-radius:2px;background:var(--blue-d);transform:scaleX(var(--hp,0));transform-origin:left}
.d-fjord .fj-viewer{display:grid;gap:14px}
.d-fjord .fj-stage{position:relative;overflow:hidden;aspect-ratio:4/3;border-radius:20px;background:var(--ice)}
@media (min-width:800px){.d-fjord .fj-stage{aspect-ratio:16/8.4}}
.d-fjord .fj-stage figure{position:absolute;inset:0}
.d-fjord .fj-stage figure:not([hidden]){animation:fj-show .9s var(--ease) both}
.d-fjord .fj-stage img{width:100%;height:100%;object-fit:cover}
.d-fjord .fj-stage figcaption{position:absolute;left:14px;bottom:14px;max-width:calc(100% - 28px);padding:8px 14px;border-radius:10px;background:rgba(255,255,255,.92);font-size:14px;font-weight:600;color:var(--ink);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.d-fjord .fj-thumbs{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 8px;scroll-snap-type:x mandatory;scrollbar-width:thin}
.d-fjord .fj-thumbs button{position:relative;flex:none;width:clamp(96px,12vw,150px);aspect-ratio:4/3;padding:0;overflow:hidden;border:0;border-radius:12px;background:var(--ice);scroll-snap-align:start;opacity:.62;transition:opacity .3s,transform .4s var(--ease)}
.d-fjord .fj-thumbs button::after{content:"";position:absolute;inset:0;border:2px solid transparent;border-radius:12px;transition:border-color .3s}
.d-fjord .fj-thumbs button:hover{opacity:1;transform:translateY(-2px)}
.d-fjord .fj-thumbs button[aria-selected="true"]{opacity:1}
.d-fjord .fj-thumbs button[aria-selected="true"]::after{border-color:var(--blue-d)}
.d-fjord .fj-thumbs img{width:100%;height:100%;object-fit:cover}
.d-fjord .fj-team{display:grid;gap:clamp(14px,1.6vw,24px);grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))}@media (min-width:1100px){.d-fjord .fj-team{grid-template-columns:repeat(auto-fit,minmax(250px,340px))}}
.d-fjord .fj-person{display:grid;gap:10px;align-content:start;padding:12px 12px 22px;border:1px solid var(--line);border-radius:20px;background:var(--white);transition:transform .5s var(--ease),box-shadow .5s}
.d-fjord .fj-person:hover{transform:translateY(-5px);box-shadow:0 30px 50px -36px rgba(20,33,43,.5)}
.demo-js .d-fjord .fj-person[data-rv].in:hover{transform:translateY(-5px);transition-delay:0s}
.d-fjord .fj-person figure{overflow:hidden;aspect-ratio:4/4.3;margin-bottom:8px;border-radius:14px;background:var(--ice)}
.d-fjord .fj-person img{width:100%;height:100%;object-fit:cover;transition:transform 1s var(--ease)}
.d-fjord .fj-person:hover img{transform:scale(1.05)}
.d-fjord .fj-person .fj-mono{display:grid;place-items:center;aspect-ratio:4/2.4;margin-bottom:8px;border-radius:14px;background:linear-gradient(180deg,var(--ice) 0 70%,var(--oak-l) 70%);font-family:var(--serif);font-size:72px;font-style:italic;color:var(--blue-d)}
.d-fjord .fj-person>*:not(figure):not(.fj-mono){margin-inline:10px}
.d-fjord .fj-role{justify-self:start;display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--ice);font-size:12.5px;font-weight:700;color:var(--blue-d)}
.d-fjord .fj-person h3{font-size:clamp(20px,1.6vw,23px)}
.d-fjord .fj-person p:not(.fj-role){font-size:15px;color:var(--dim)}
.d-fjord .fj-visit{display:grid;gap:clamp(32px,4vw,72px)}
@media (min-width:980px){.d-fjord .fj-visit{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);align-items:start}}
.d-fjord .fj-visit-copy{display:grid;gap:22px;align-content:start}
.d-fjord .fj-visit-copy .fj-head{margin-bottom:4px}
.d-fjord .fj-visit-copy>p{max-width:46ch;color:var(--dim)}
.d-fjord .fj-week{padding:clamp(20px,2.6vw,34px);border:1px solid var(--line);border-radius:20px;background:var(--white);box-shadow:0 30px 60px -48px rgba(20,33,43,.5)}
.d-fjord .fj-week-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
.d-fjord .fj-week-top h3{font-size:20px}
.d-fjord .fj-axis{display:grid;grid-template-columns:minmax(96px,.9fr) minmax(0,1.6fr) auto;gap:16px;padding:6px 0;font-size:11.5px;font-weight:700;color:var(--dim);font-variant-numeric:tabular-nums}
.d-fjord .fj-axis span{position:relative;display:flex;justify-content:space-between}
.d-fjord .fj-track{position:relative;order:2;height:10px;border-radius:10px;background:var(--fog);overflow:hidden}
.d-fjord .fj-track b{position:absolute;top:0;bottom:0;left:calc(var(--a) * 100%);width:calc(var(--w) * 100%);border-radius:10px;background:var(--blue);transform-origin:left;transition:transform 1s var(--snap);transition-delay:calc(var(--i,0) * 70ms)}
.demo-js .d-fjord .fj-week:not(.in) .fj-track b{transform:scaleX(0)}
.demo-js .d-fjord .fj-week[data-rv]{opacity:1;transform:none}
.d-fjord .fj-book{display:grid;gap:clamp(32px,4vw,72px);align-items:start}
@media (min-width:1000px){.d-fjord .fj-book{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-fjord .fj-book-copy{display:grid;gap:22px;align-content:start}
.d-fjord .fj-book-copy .fj-head{margin-bottom:4px}
.d-fjord .fj-book-copy>p{max-width:46ch;color:var(--dim)}
.d-fjord .fj-form{position:relative;padding:clamp(24px,3.2vw,44px);border:1px solid var(--line);border-radius:20px;background:var(--white);box-shadow:0 40px 70px -50px rgba(20,33,43,.55);overflow:hidden}
.d-fjord .fj-form::before{content:"";position:absolute;left:0;right:0;top:0;height:5px;background:linear-gradient(90deg,var(--blue-d) 0 70%,var(--oak) 70%)}
.d-fjord .fj-form-h{display:flex;align-items:center;gap:12px;margin-bottom:22px;font-size:19px;font-weight:700;letter-spacing:-.02em;color:var(--ink)}
.d-fjord .fj-form-h i{display:grid;place-items:center;width:40px;height:40px;border-radius:11px;background:var(--ice);color:var(--blue-d)}
.d-fjord .fj-form-h svg{width:20px;height:20px}
.d-fjord .fj-orders{display:grid;gap:clamp(12px,1.4vw,20px);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-fjord .fj-order{display:grid;gap:12px;align-content:start;height:100%;padding:clamp(22px,2.4vw,30px);border:1px solid var(--line);border-radius:var(--r);background:var(--white);transition:border-color .3s,transform .5s var(--ease)}
.d-fjord .fj-order:hover{border-color:var(--blue-d);transform:translateY(-4px)}
.d-fjord .fj-order i{display:grid;place-items:center;width:48px;height:48px;border-radius:12px;background:var(--ice);color:var(--blue-d)}
.d-fjord .fj-order svg{width:22px;height:22px}
.d-fjord .fj-order p{color:var(--dim)}
.d-fjord .fj-order span{display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--blue-d)}
.d-fjord .fj-carte{display:grid;gap:12px}
.d-fjord .fj-tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px}
.d-fjord .fj-tabs button{min-height:44px;padding:0 18px;border:1.5px solid var(--line-2);border-radius:999px;background:var(--white);font-size:15px;font-weight:650;transition:background-color .3s,color .3s,border-color .3s}
.d-fjord .fj-tabs button:hover{border-color:var(--blue-d)}
.d-fjord .fj-tabs button[aria-selected="true"]{border-color:var(--blue-d);background:var(--blue-d);color:#fff}
.d-fjord .fj-rows{display:grid;gap:0 48px;border-top:1px solid var(--line)}
@media (min-width:860px){.d-fjord .fj-rows{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-fjord .fj-rows li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 16px;padding:18px 0;border-bottom:1px solid var(--line)}
.d-fjord .fj-rows b{font-weight:700;color:var(--ink)}
.d-fjord .fj-rows span{font-weight:700;color:var(--blue-d);font-variant-numeric:tabular-nums}
.d-fjord .fj-rows p{grid-column:1/-1;font-size:15px;color:var(--dim)}
.d-fjord .fj-foot{position:relative;padding:0 0 130px;background:var(--ink);color:rgba(255,255,255,.68)}
.d-fjord .fj-foot::before{content:"";display:block;height:10px;background:repeating-linear-gradient(90deg,var(--oak) 0 120px,#cfae82 120px 122px,var(--oak) 122px 260px,#e0c6a1 260px 261px)}
.d-fjord .fj-foot-cta{display:grid;gap:22px;margin-top:clamp(48px,6vw,88px);padding:clamp(26px,4vw,56px);border-radius:22px;background:var(--blue-d)}
@media (min-width:900px){.d-fjord .fj-foot-cta{grid-template-columns:minmax(0,1fr) auto;align-items:center}}
.d-fjord .fj-foot-cta p{max-width:22ch;font-size:clamp(28px,3.4vw,48px);font-weight:650;line-height:1.08;letter-spacing:-.03em;color:#fff}
.d-fjord .fj-foot-cta p em{font-family:var(--serif);font-style:italic;font-weight:400;color:var(--oak)}
.d-fjord .fj-foot-cta .fj-fill{background:#fff;color:var(--blue-d);box-shadow:none}
.d-fjord .fj-foot-cta .fj-fill:hover{background:var(--oak-l)}
.d-fjord .fj-foot-grid{display:grid;gap:32px 40px;margin-top:clamp(48px,6vw,80px);grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}
.d-fjord .fj-foot-grid h3{margin-bottom:12px;font-size:12.5px;font-weight:750;letter-spacing:.12em;text-transform:uppercase;color:var(--oak)}
.d-fjord .fj-foot-grid a,.d-fjord .fj-foot-grid span{display:flex;align-items:center;min-height:40px}
.d-fjord .fj-foot-grid a{transition:color .3s,transform .4s var(--ease)}
.d-fjord .fj-foot-grid a:hover{color:#fff;transform:translateX(4px)}
.d-fjord .fj-foot-brand{display:grid;gap:14px;align-content:start}
.d-fjord .fj-foot-brand .fj-logo{color:#fff}
.d-fjord .fj-foot-brand p{max-width:34ch}
.d-fjord .fj-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;padding-top:22px;border-top:1px solid rgba(255,255,255,.12);font-size:13px;color:rgba(255,255,255,.5)}
@keyframes fj-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes fj-rise{to{transform:none}}
@keyframes fj-draw{from{transform:scaleY(0)}to{transform:none}}
@keyframes fj-blind{to{transform:scaleY(0)}}
@keyframes fj-settle{to{transform:scale(1.03) translateY(calc(var(--p,0) * -3%))}}
@keyframes fj-slide{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:none}}
@keyframes fj-show{from{opacity:0;transform:scale(1.03)}to{opacity:1;transform:none}}
@keyframes fj-wave{from{transform:translateX(-4%)}to{transform:translateX(4%)}}
@media (prefers-reduced-motion:reduce){.d-fjord .fj-ln>span,.d-fjord .fj-grid i,.d-fjord .fj-lede,.d-fjord .fj-cta-row,.d-fjord .fj-chip,.d-fjord .fj-trust li,.d-fjord .fj-info,.d-fjord .fj-plate{animation:none;opacity:1;transform:none}.d-fjord .fj-blinds{display:none}.d-fjord .fj-photo img{animation:none;transform:scale(1.03)}.d-fjord .fj-plate svg path{animation:none}.d-fjord .fj-track b{transform:none!important}}
`
  .replace(/\n/g, "")
  .trim();

/** Restyles of the kit's shared sections and fields: they load after BASE_CSS, so they win. */
const EXTRA = `
.d-fjord .fj-week .z-hours{border-top:0}
.d-fjord .fj-week .z-hours div{display:grid;grid-template-columns:minmax(96px,.9fr) minmax(0,1.6fr) auto;align-items:center;gap:16px;padding:12px 10px;margin-inline:-10px;border-bottom:1px solid var(--line);border-radius:10px;transition:background-color .3s}
.d-fjord .fj-week .z-hours dt{font-weight:650;color:var(--ink)}
.d-fjord .fj-week .z-hours dd{order:3;font-size:14.5px;font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums}
.d-fjord .z-hours div.is-today{background:var(--ice);border-bottom-color:transparent}
.d-fjord .z-hours div.is-today dt::after{content:"";display:inline-block;width:7px;height:7px;margin-left:8px;border-radius:50%;background:var(--blue-d);vertical-align:middle}
.d-fjord .z-hours div.is-today .fj-track b{background:var(--blue-d)}
.d-fjord .z-hours div.is-today dd{color:var(--blue-d)}
@media (max-width:560px){.d-fjord .fj-axis{display:none}.d-fjord .fj-week .z-hours div{grid-template-columns:minmax(0,1fr) auto;row-gap:8px}.d-fjord .fj-track{grid-column:1/-1;order:4}}
.d-fjord .z-field label,.d-fjord .z-chipset legend{font-size:12px;font-weight:700;letter-spacing:.06em;color:var(--ink-2)}
.d-fjord .z-field input,.d-fjord .z-field select,.d-fjord .z-field textarea{border-width:1.5px;background:var(--fog);font-weight:500;transition:border-color .3s,background-color .3s,box-shadow .3s}
.d-fjord .z-field input:hover,.d-fjord .z-field select:hover,.d-fjord .z-field textarea:hover{border-color:var(--line-2)}
.d-fjord .z-field :focus-visible{outline:none;border-color:var(--blue-d);background:#fff;box-shadow:0 0 0 4px rgba(45,91,128,.14)}
.d-fjord .z-field select{background:var(--fog) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%232d5b80' stroke-width='2'%3E%3Cpath d='M5 8l5 5 5-5'/%3E%3C/svg%3E") no-repeat right 12px center/18px}
.d-fjord .form-status{border-radius:10px;border-color:var(--blue-d);background:var(--ice)}
.d-fjord .z-sec.z-faq .z-narrow{max-width:var(--max)}
@media (min-width:1000px){.d-fjord .z-faq .z-narrow{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:64px;align-items:start}.d-fjord .z-faq .z-head{position:sticky;top:110px}}
.d-fjord .z-acc{display:grid;gap:10px;border:0}
.d-fjord .z-acc details{border:1px solid var(--line);border-radius:14px;background:var(--white);transition:border-color .3s,box-shadow .3s}
.d-fjord .z-acc details[open]{border-color:var(--ice-2);box-shadow:0 20px 40px -34px rgba(20,33,43,.5)}
.d-fjord .z-acc summary{padding:16px 18px;font-size:clamp(16.5px,1.2vw,18px);font-weight:700;letter-spacing:-.012em}
.d-fjord .z-acc summary i{width:32px;height:32px;border-radius:50%;background:var(--ice);transition:background-color .3s}
.d-fjord .z-acc summary i::before,.d-fjord .z-acc summary i::after{left:10px;width:12px;height:2px;border-radius:2px;background:var(--blue-d)}
.d-fjord .z-acc details[open] summary i{background:var(--blue-d)}
.d-fjord .z-acc details[open] summary i::before,.d-fjord .z-acc details[open] summary i::after{background:#fff}
.d-fjord .z-acc details>p{padding:0 18px 20px;animation:fj-up .5s var(--ease) both}
.d-fjord .z-faq{background:var(--fog)}
.d-fjord .z-sec.z-cta{background:var(--blue-d);color:rgba(255,255,255,.82)}
.d-fjord .z-cta h2{color:#fff}
.d-fjord .z-cta h2 em{color:var(--oak)}
.d-fjord .z-cta .fj-fill{background:#fff;color:var(--blue-d);box-shadow:none}
.d-fjord .z-cta .fj-fill:hover{background:var(--oak-l)}
.d-fjord .z-statement .z-center{gap:22px}
.d-fjord .z-statement .z-center::before{content:"";width:64px;height:4px;border-radius:4px;background:linear-gradient(90deg,var(--blue-d) 50%,var(--oak) 50%)}
.d-fjord .z-statement h2{font-weight:600;letter-spacing:-.03em}
.d-fjord .z-showcase.has-pic::after{background:linear-gradient(90deg,rgba(20,33,43,.72),rgba(20,33,43,.15) 75%),linear-gradient(180deg,rgba(20,33,43,0) 40%,rgba(20,33,43,.6))}
.d-fjord .z-showcase.has-pic h2 em{color:var(--oak)}
.d-fjord .z-showcase .fj-line{border-color:rgba(255,255,255,.6);background:transparent;color:#fff}
.d-fjord .z-showcase .fj-line:hover{background:#fff;color:var(--ink)}
.d-fjord .z-card{background:var(--white)}
.d-fjord .z-pack.is-featured{background:var(--ice);border-color:var(--blue-d);box-shadow:0 0 0 1px var(--blue-d)}
.d-fjord .z-tag{font-weight:800}
.d-fjord .z-ico{background:var(--ice);border:0}
.d-fjord .z-ba::before{content:"";position:absolute;left:var(--pos);top:50%;z-index:1;width:46px;height:46px;border-radius:50%;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232d5b80' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M9 6l-5 6 5 6M15 6l5 6-5 6'/%3E%3C/svg%3E") no-repeat center/22px;box-shadow:0 8px 20px -8px rgba(20,33,43,.5);transform:translate(-50%,-50%);pointer-events:none}
.d-fjord .z-ba-sec .z-cards{max-width:960px}
.d-fjord .z-ba{border-radius:var(--r)}
.d-fjord .z-ba figcaption{border-radius:8px;background:rgba(20,33,43,.72)}
.d-fjord .z-quotes blockquote>p{font-family:var(--serif);font-style:italic;font-weight:400}
.d-fjord .z-steps small,.d-fjord .z-rows small{font-family:var(--serif);font-style:italic;font-size:18px;letter-spacing:0}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The header's underline slides to the link under the pointer, or to the section in view;
 * numbers in the band count up to what the page shows; the first visit travels sideways
 * while the page scrolls (wide screens, motion allowed).
 */
const JS = `(function(){var d=document,W=window,reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var nav=d.querySelector('.fj-links');if(nav){var ind=nav.querySelector('.fj-ind'),ls=[].slice.call(nav.querySelectorAll('a')),cur=null,hov=null;
function put(a){if(!ind)return;if(!a){ind.classList.remove('on');return}ind.style.setProperty('--x',a.offsetLeft+14+'px');ind.style.setProperty('--w',a.offsetWidth-28+'px');ind.classList.add('on')}
ls.forEach(function(a){a.addEventListener('mouseenter',function(){hov=a;put(a)});a.addEventListener('focus',function(){put(a)})});nav.addEventListener('mouseleave',function(){hov=null;put(cur)});
var secs=ls.map(function(a){return d.getElementById(a.getAttribute('href').slice(1))}),r1=0;function spy(){r1=0;var k=-1;secs.forEach(function(s,n){if(s&&s.getBoundingClientRect().top<W.innerHeight*.4)k=n});var a=k>=0?ls[k]:null;if(a!==cur){if(cur)cur.classList.remove('is-on');cur=a;if(cur)cur.classList.add('is-on');if(!hov)put(cur)}}
W.addEventListener('scroll',function(){if(!r1)r1=requestAnimationFrame(spy)},{passive:true});W.addEventListener('resize',function(){put(hov||cur)});spy()}
var cs=[].slice.call(d.querySelectorAll('[data-count]'));function run(el){var to=+el.getAttribute('data-count'),pad=el.getAttribute('data-pad')==='1',t0=null;function f(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/1100),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=pad&&v<10?'0'+v:String(v);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
if(!reduce&&'IntersectionObserver' in W){var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);cio.unobserve(e.target)}})},{threshold:.6});cs.forEach(function(el){var pad=el.getAttribute('data-pad')==='1';el.textContent=pad?'00':'0';cio.observe(el)})}
[].slice.call(d.querySelectorAll('[data-hs]')).forEach(function(sec){var ol=sec.querySelector('ol'),bar=sec.querySelector('.fj-hs-bar'),num=sec.querySelector('[data-hs-n]'),steps=[].slice.call(ol.children),mq=W.matchMedia('(min-width: 1024px)'),on=false,max=0,r=0;
function layout(){var want=mq.matches&&!reduce&&steps.length>=3;sec.classList.toggle('is-hs',want);on=want;if(!want){sec.style.height='';ol.style.removeProperty('--hx');return}var trk=sec.querySelector('.fj-hs-track');max=Math.max(0,ol.scrollWidth-trk.clientWidth);sec.style.height=(W.innerHeight+max)+'px';frame()}
function frame(){r=0;if(!on)return;var rc=sec.getBoundingClientRect(),span=sec.offsetHeight-W.innerHeight,p=span>0?Math.min(1,Math.max(0,-rc.top/span)):0;ol.style.setProperty('--hx',(p*max).toFixed(1));if(bar)bar.style.setProperty('--hp',p.toFixed(3));var k=Math.min(steps.length-1,Math.round(p*(steps.length-1)));steps.forEach(function(s,n){s.classList.toggle('on',n<=k)});if(num)num.textContent=String(k+1).padStart(2,'0')}
W.addEventListener('scroll',function(){if(!r)r=requestAnimationFrame(frame)},{passive:true});W.addEventListener('resize',layout);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(layout);layout()})
})();`;

type Lang = "nl" | "en" | "de" | "fr";
const WORDS: Record<Lang, { expect: string; treatments: string; steps: string; team: string; request: string }> = {
  nl: { expect: "Wat u kunt verwachten", treatments: "behandelingen", steps: "stappen", team: "mensen", request: "Afspraak aanvragen" },
  en: { expect: "What to expect", treatments: "treatments", steps: "steps", team: "people", request: "Request an appointment" },
  de: { expect: "Was Sie erwartet", treatments: "Behandlungen", steps: "Schritte", team: "Menschen", request: "Termin anfragen" },
  fr: { expect: "À quoi vous attendre", treatments: "soins", steps: "étapes", team: "personnes", request: "Demander un rendez-vous" },
};
const words = (c: Ctx) => WORDS[c.spec.meta.lang as Lang] ?? WORDS.nl;
const two = (n: number) => String(n).padStart(2, "0");

/** A description as its first sentence and the sentences after it (shown as what to expect). */
function sentences(text: string): [string, string[]] {
  const parts = text.match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g)?.map((x) => x.trim()).filter(Boolean) ?? [text];
  return [parts[0] ?? text, parts.slice(1)];
}

/** Opening times of a line as [from, to] in minutes; [] when closed, null when unreadable. */
function spans(t: string): [number, number][] | null {
  if (/gesloten|closed|geschlossen|ferm/i.test(t)) return [];
  const out: [number, number][] = [];
  const re = /(\d{1,2})[:.](\d{2})\s*(?:–|—|-|tot|to|bis|à)\s*(\d{1,2})[:.](\d{2})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t))) {
    const s = +m[1] * 60 + +m[2];
    let e = +m[3] * 60 + +m[4];
    if (e <= s) e += 1440;
    out.push([s, Math.min(e, 1440)]);
  }
  return out.length ? out : null;
}

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 10h13M11.5 5l5 5-5 5" />
  </svg>
);
const Check = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10" cy="10" r="8.2" strokeWidth="1.5" />
    <path d="M6.5 10.2l2.3 2.3 4.7-4.8" />
  </svg>
);
const Clock = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <circle cx="10" cy="10" r="7.5" />
    <path d="M10 6v4.2l2.8 1.8" />
  </svg>
);
const Pin = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 18s6-5.2 6-10A6 6 0 1 0 4 8c0 4.8 6 10 6 10z" />
    <circle cx="10" cy="8" r="2.2" />
  </svg>
);
const Phone = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 3.5h3l1.5 4-2 1.3a9 9 0 0 0 4.7 4.7l1.3-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A14 14 0 0 1 2.5 5.1 1.5 1.5 0 0 1 4 3.5z" />
  </svg>
);
const Cal = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <rect x="3" y="4.5" width="14" height="12.5" rx="2.5" />
    <path d="M3 8.5h14M7 2.5v4M13 2.5v4" />
  </svg>
);
const X = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" />
  </svg>
);

function Head({ kicker, title, intro, id, split }: { kicker?: string; title: string; intro?: string; id?: string; split?: boolean }) {
  return (
    <header className={`fj-head${split && intro ? " is-split" : ""}`}>
      {kicker ? (
        <p className="fj-kick" data-rv>
          {kicker}
        </p>
      ) : null}
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

const Logo = ({ c }: { c: Ctx }) => (
  <a href="#top" className="fj-logo" aria-label={c.name}>
    <i aria-hidden="true">
      <span>{c.name.charAt(0)}</span>
    </i>
    <b>{c.name}</b>
  </a>
);

/** Short promises the business makes itself (its features, else its highlights), for the opening. */
function promises(c: Ctx, max = 3): string[] {
  const f = c.spec.sections.find((s) => s.type === "features");
  if (f && f.type === "features") return f.items.map((x) => x.title).slice(0, max);
  const a = c.spec.sections.find((s) => s.type === "about");
  return a && a.type === "about" ? a.highlights.slice(0, max) : [];
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="fj-hdr hdr">
        <div className="fj-wrap fj-bar">
          <Logo c={c} />
          <nav aria-label={c.t.menu} className="fj-links" data-nav>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
            <span className="fj-ind" aria-hidden="true" />
          </nav>
          <NowBadge c={c} className="fj-now" />
          <a href={cta.href} className="btn fj-fill fj-cta">
            {cta.label}
          </a>
          <button type="button" className="fj-mbtn menu-btn" aria-expanded="false" aria-controls="site-menu">
            <i aria-hidden="true" />
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
          </button>
        </div>
      </header>
      <div id="site-menu" className="fj-sheet" inert>
        <div className="fj-scrim" data-menu-close aria-hidden="true" />
        <div className="fj-panel" role="dialog" aria-label={c.t.menu}>
          <span className="fj-grab" aria-hidden="true" />
          <div className="fj-panel-top">
            <b>{c.name}</b>
            <button type="button" className="fj-x" data-menu-close aria-label={c.t.close}>
              <X />
            </button>
          </div>
          <nav aria-label={c.t.menu} data-nav>
            {c.nav.map((n, k) => (
              <a key={n.id} href={`#${n.id}`} style={i(k)}>
                <small>{two(k + 1)}</small>
                {n.label}
                <Arrow />
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn fj-fill">
            {cta.label} <Arrow />
          </a>
          <div className="fj-panel-info">
            <NowBadge c={c} className="fj-now" />
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : b.city ? <span>{b.city}</span> : null}
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
  const size = plain.length > 54 ? "is-s" : plain.length > 30 ? "is-m" : undefined;
  const { lines } = splitLines(hero.headline, plain.length > 24 ? 3 : 2);
  const facts = heroFacts(c);
  const trust = promises(c);
  const icons = [<Pin key="p" />, <Clock key="c" />, <Phone key="t" />];
  const w = words(c);
  const svc = c.spec.sections.find((s) => s.type === "services");
  const proc = c.spec.sections.find((s) => s.type === "process");
  const team = c.spec.sections.find((s) => s.type === "team");
  const band: { n: number; label: string; href: string }[] = [];
  if (svc && svc.type === "services") band.push({ n: svc.items.length, label: w.treatments, href: `#${svc.id}` });
  if (proc && proc.type === "process") band.push({ n: proc.steps.length, label: w.steps, href: `#${proc.id}` });
  if (team && team.type === "team") band.push({ n: team.members.length, label: w.team, href: `#${team.id}` });
  return (
    <section className="fj-hero">
      <div className="fj-grid" aria-hidden="true">
        {Array.from({ length: 12 }, (_, k) => (
          <i key={k} style={i(k)} />
        ))}
      </div>
      <div className="fj-wrap fj-hero-in">
        <div className="fj-hero-copy">
          <p className="fj-chip">
            {hero.eyebrow ? <span>{hero.eyebrow}</span> : null}
            <NowBadge c={c} className="fj-now" />
          </p>
          <h1 className={size}>
            {lines.map((line, n) => (
              <span className="fj-ln" key={n}>
                <span style={i(n)}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="fj-lede">{hero.subheadline}</p>
          <div className="fj-cta-row">
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label} <Arrow />
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
          {trust.length > 0 ? (
            <ul className="fj-trust">
              {trust.map((x, n) => (
                <li key={x} style={i(n)}>
                  <Check />
                  {x}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="fj-media">
          {p ? (
            <>
              <figure className="fj-photo" data-px>
                <Pic p={p} eager sizes="(min-width: 980px) 46vw, 100vw" />
                <span className="fj-blinds" aria-hidden="true">
                  {Array.from({ length: 6 }, (_, k) => (
                    <i key={k} style={i(k)} />
                  ))}
                </span>
              </figure>
              {facts.length > 0 ? (
                <dl className="fj-info">
                  {facts.map((f, n) => (
                    <div key={f.label}>
                      <dt>{icons[n] ?? <Check />}</dt>
                      <dd>
                        <small>{f.label}</small>
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </>
          ) : (
            <div className="fj-plate" aria-hidden="true">
              <b>{c.name.charAt(0)}</b>
              <svg viewBox="0 0 400 120" fill="none" stroke="currentColor" strokeWidth="1.5" preserveAspectRatio="none">
                {[0, 1, 2, 3].map((k) => (
                  <path key={k} style={i(k)} d={`M-20 ${30 + k * 22} C 60 ${14 + k * 22}, 120 ${46 + k * 22}, 200 ${30 + k * 22} S 340 ${14 + k * 22}, 420 ${30 + k * 22}`} />
                ))}
              </svg>
              {offerWords(c, 4).length > 0 ? (
                <ul>
                  {offerWords(c, 4).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          )}
        </div>
      </div>
      {band.length >= 2 ? (
        <div className="fj-wrap fj-band">
          <ul>
            {band.map((x) => (
              <li key={x.href}>
                <a href={x.href}>
                  <b data-count={x.n} data-pad="1">
                    {two(x.n)}
                  </b>
                  <em>{x.label}</em>
                </a>
              </li>
            ))}
            {c.spec.business.city ? (
              <li>
                <span>
                  <b aria-hidden="true">
                    <Pin />
                  </b>
                  <em>{c.spec.business.city}</em>
                </span>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="fj-foot">
      <div className="fj-wrap">
        <div className="fj-foot-cta" data-rv>
          <p>{em(c.spec.hero.headline)}</p>
          <Btn c={c} href={cta.href}>
            {cta.label} <Arrow />
          </Btn>
        </div>
        <div className="fj-foot-grid">
          <div className="fj-foot-brand">
            <Logo c={c} />
            {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
          </div>
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
        </div>
        <Legal c={c} className="fj-legal" />
      </div>
    </footer>
  );
}

/** The week on a time line: one bar per day, from the hours on record. Today is marked by TODAY_JS. */
function Week({ c }: { c: Ctx }) {
  const lines = c.spec.business.openingHours;
  if (!lines?.length) return <p className="z-note">{c.t.hoursTbc}</p>;
  const rows = hoursRows(lines).map(([day, time]) => ({ day, time, spans: spans(time) }));
  const all = rows.flatMap((r) => r.spans ?? []);
  const lo = Math.floor(Math.min(8 * 60, ...all.map((x) => x[0])) / 60) * 60;
  const hi = Math.ceil(Math.max(18 * 60, ...all.map((x) => x[1])) / 60) * 60;
  const range = hi - lo;
  const ticks = [0, 1, 2, 3, 4].map((k) => Math.round((lo + (range * k) / 4) / 60));
  return (
    <>
      <div className="fj-axis" aria-hidden="true">
        <span />
        <span>
          {ticks.map((t) => (
            <i key={t} style={{ fontStyle: "normal" }}>
              {String(t % 24).padStart(2, "0")}
            </i>
          ))}
        </span>
        <span />
      </div>
      <dl className="z-hours">
        {rows.map((r, n) => (
          <div key={n}>
            <dt>{r.day}</dt>
            <dd>{r.time}</dd>
            <span className="fj-track" aria-hidden="true">
              {(r.spans ?? []).map(([s, e], k) => (
                <b key={k} style={css({ "--a": ((s - lo) / range).toFixed(4), "--w": ((e - s) / range).toFixed(4), "--i": n })} />
              ))}
            </span>
          </div>
        ))}
      </dl>
    </>
  );
}

function Visit({ c, kicker, title, body }: { c: Ctx; kicker: string; title: string; body?: string }) {
  return (
    <div className="fj-wrap fj-visit">
      <div className="fj-visit-copy">
        <Head kicker={kicker} title={title} />
        {body ? <p data-rv>{body}</p> : null}
        <Reach c={c} />
      </div>
      <div className="fj-week" data-rv>
        <div className="fj-week-top">
          <h3>{c.t.hours}</h3>
          <NowBadge c={c} className="fj-now" />
        </div>
        <Week c={c} />
      </div>
    </div>
  );
}

function FormCard({ c, children }: { c: Ctx; children: ReactNode }) {
  return (
    <div className="fj-form" data-rv>
      <p className="fj-form-h">
        <i aria-hidden="true">
          <Cal />
        </i>
        {words(c).request}
      </p>
      {children}
    </div>
  );
}

export const fjord: Family = {
  key: "fjord",
  root: "d-fjord",
  fonts: ["Manrope", "Fraunces"],
  themeColor: "#ffffff",
  accent: "#2d5b80",
  onAccent: "#ffffff",
  css: CSS,
  extra: EXTRA,
  js: JS + TODAY_JS,
  cls: { wrap: "fj-wrap", eyebrow: "fj-kick", btn: "fj-fill", btnAlt: "fj-line", btnText: "fj-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="fj-sec" id={s.id}>
          <div className={`fj-wrap fj-about${p ? "" : " is-solo"}`}>
            {p ? (
              <div className="fj-about-pic" data-rv>
                <figure data-px>
                  <Pic p={p} sizes="(min-width: 980px) 44vw, 100vw" />
                </figure>
              </div>
            ) : null}
            <div className="fj-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="fj-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className={`fj-checks${s.highlights.length > 2 ? " is-2" : ""}`} data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>
                      <Check />
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
      const w = words(c);
      return (
        <section className="fj-sec is-fog" id={s.id}>
          <div className="fj-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} split />
            <ul className="fj-cards">
              {s.items.map((it, n) => {
                const p = c.photo(`art:svc${n}`);
                const [what, expect] = sentences(it.description);
                return (
                  <li key={n} data-rv style={i(n % 3)}>
                    <article className="fj-card">
                      {p ? (
                        <figure>
                          <Pic p={p} sizes="(min-width: 1100px) 30vw, (min-width: 680px) 46vw, 100vw" />
                        </figure>
                      ) : (
                        <span className="fj-card-ico" aria-hidden="true">
                          <Icon name={it.icon} />
                        </span>
                      )}
                      <div className="fj-card-in">
                        <div className="fj-card-top">
                          <span className="fj-n">{two(n + 1)}</span>
                          {it.duration ? (
                            <span className="fj-tag">
                              <Clock />
                              {it.duration}
                            </span>
                          ) : null}
                        </div>
                        <h3>{it.title}</h3>
                        <p>{what}</p>
                        {expect.length > 0 ? (
                          <div className="fj-expect">
                            <small>{w.expect}</small>
                            <ul>
                              {expect.map((x) => (
                                <li key={x}>{x}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {it.price ? (
                          <div className="fj-card-foot">
                            <span className="fj-price">{it.price}</span>
                          </div>
                        ) : null}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="fj-sec is-fog" id={s.id}>
          <div className="fj-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} split />
            <div className="fj-carte">
              {cats.length > 1 ? (
                <div className="fj-tabs" role="tablist" aria-label={s.title.replace(/\*/g, "")} data-rv>
                  {cats.map((cat, n) => (
                    <button key={n} type="button" role="tab" id={`${s.id}-t${n}`} aria-controls={`${s.id}-p${n}`} aria-selected={n === 0} tabIndex={n === 0 ? 0 : -1}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              ) : null}
              {cats.map((cat, n) => (
                <ul key={n} className="fj-rows" id={`${s.id}-p${n}`} {...(cats.length > 1 ? { role: "tabpanel", "aria-labelledby": `${s.id}-t${n}`, hidden: n > 0 } : {})}>
                  {cat.items.map((d, m) => (
                    <li key={m}>
                      <b>{d.name}</b>
                      {d.price ? <span>{d.price}</span> : <span />}
                      {d.description ? <p>{d.description}</p> : null}
                    </li>
                  ))}
                </ul>
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
    features: (s, c) => (
      <section className="fj-sec is-oak" id={s.id}>
        <div className="fj-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} split />
          <ul className="fj-feats">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 4)}>
                <div className="fj-feat">
                  <i>
                    <Icon name={it.icon} />
                  </i>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    process: (s, c) => (
      <section className="fj-sec fj-hs" id={s.id} data-hs>
        <div className="fj-hs-pin">
          <div className="fj-wrap">
            <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} split />
            <div className="fj-hs-track">
              <ol>
                {s.steps.map((st, n) => (
                  <li key={n} className="fj-step" data-rv style={i(n % 4)}>
                    <b aria-hidden="true">{n + 1}</b>
                    <h3>{st.title}</h3>
                    <p>{st.description}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="fj-hs-bar" aria-hidden="true">
              <em>
                <b data-hs-n>01</b> / {two(s.steps.length)}
              </em>
              <span className="fj-hs-line">
                <i />
              </span>
            </div>
          </div>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="fj-sec" id={s.id}>
          <div className="fj-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className="fj-viewer" data-rv>
              <div className="fj-stage">
                {pics.map((p, n) => (
                  <figure key={n} id={`${s.id}-v${n}`} {...(pics.length > 1 ? { role: "tabpanel", "aria-labelledby": `${s.id}-b${n}` } : {})} hidden={n > 0}>
                    <Pic p={p} sizes="(min-width: 1320px) 1200px, 100vw" />
                    <figcaption>{p.alt}</figcaption>
                  </figure>
                ))}
              </div>
              {pics.length > 1 ? (
                <div className="fj-thumbs" role="tablist" aria-label={s.title.replace(/\*/g, "")}>
                  {pics.map((p, n) => (
                    <button key={n} type="button" role="tab" id={`${s.id}-b${n}`} aria-controls={`${s.id}-v${n}`} aria-selected={n === 0} tabIndex={n === 0 ? 0 : -1}>
                      <Pic p={p} sizes="150px" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    team: (s, c) => (
      <section className="fj-sec" id={s.id}>
        <div className="fj-wrap">
          <Head kicker={c.t.kick.team} title={s.title} intro={s.intro} split />
          <ul className="fj-team">
            {s.members.map((m, n) => {
              const p = c.photo(m.image);
              return (
                <li key={n} className="fj-person" data-rv style={i(n % 4)}>
                  {p ? (
                    <figure>
                      <Pic p={p} sizes="(min-width: 1100px) 24vw, (min-width: 600px) 46vw, 100vw" />
                    </figure>
                  ) : (
                    <span className="fj-mono" aria-hidden="true">
                      {m.name.charAt(0)}
                    </span>
                  )}
                  <p className="fj-role">{m.role}</p>
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
      <section className="fj-sec is-ice" id={s.id}>
        <Visit c={c} kicker={c.t.kick.hours} title={s.title} body={s.note || undefined} />
      </section>
    ),
    contact: (s, c) => {
      const elsewhere = c.spec.sections.some((x) => x.type === "hours" || x.type === "booking");
      if (!s.showForm && !elsewhere)
        return (
          <section className="fj-sec" id={s.id}>
            <Visit c={c} kicker={c.t.kick.contact} title={s.title} body={s.body || undefined} />
          </section>
        );
      return (
        <section className="fj-sec" id={s.id}>
          <div className="fj-wrap fj-book">
            <div className="fj-book-copy">
              <Head kicker={c.t.kick.contact} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Reach c={c} />
            </div>
            {s.showForm ? (
              <div className="fj-form" data-rv>
                <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
              </div>
            ) : (
              <div className="fj-form" data-rv>
                <p className="fj-form-h">
                  <i aria-hidden="true">
                    <Phone />
                  </i>
                  {c.t.contact}
                </p>
                <Reach c={c} />
                <p style={{ marginTop: 18 }}>
                  <Btn c={c} href={c.spec.hero.primaryCta.href}>
                    {c.spec.hero.primaryCta.label} <Arrow />
                  </Btn>
                </p>
              </div>
            )}
          </div>
        </section>
      );
    },
    booking: (s, c) => {
      const trust = promises(c, 4);
      return (
        <section className="fj-sec is-fog" id={s.id}>
          <div className="fj-wrap fj-book">
            <div className="fj-book-copy">
              <Head kicker={c.t.kick.booking} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              {trust.length ? (
                <ul className="fj-checks" data-rv>
                  {trust.map((x) => (
                    <li key={x}>
                      <Check />
                      {x}
                    </li>
                  ))}
                </ul>
              ) : null}
              <Reach c={c} />
            </div>
            <FormCard c={c}>
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
            </FormCard>
          </div>
        </section>
      );
    },
    order: (s, c) => (
      <section className="fj-sec is-fog" id={s.id}>
        <div className="fj-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} split />
          <ul className="fj-orders">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} className="fj-order" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <i>
                    <Icon name={ch.icon} />
                  </i>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <span aria-hidden="true">
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
