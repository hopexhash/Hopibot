import { Fragment, type ReactNode } from "react";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Serene: an original template (no portfolio demo) for private clinics. Medical luxury, quiet
 * and exact: warm stone, porcelain and warm grey with one muted champagne, a fine display
 * capital (Italiana) over a light geometric sans (Jost), and symmetry. The motif is the
 * capsule: photographs sit in tall pill frames, like the mirrors of a treatment room.
 * The opening draws a champagne hairline that opens into the photograph while the headline's
 * letters close in from wide spacing. A precision gauge on the right edge shows where you
 * are on the page; treatments open as detail panels (what it is, duration, recovery), and
 * the gallery moves in three columns at different speeds. Made for aesthetic and medical
 * clinics, skin and laser clinics, private practices and other premium appointment-based care.
 */

const CSS = `
.d-serene{--stone:#ebe6de;--stone-2:#e2dbd0;--porc:#f7f4ef;--ink:#2a2723;--ink-2:#4a453e;--dim:#6b6359;--champ:#b39668;--champ-d:#7d6442;--champ-l:#dccaa8;--night:#25221e;--night-2:#2f2b26;--on-night:#ece6dc;--on-dim:rgba(236,230,220,.64);--line:rgba(42,39,35,.15);--line-n:rgba(236,230,220,.16);--pad:clamp(20px,5.2vw,76px);--max:1360px;--ease:cubic-bezier(.25,.6,.15,1);--slow:cubic-bezier(.7,0,.25,1);--disp:"Italiana","Cormorant",Georgia,serif;--sans:"Jost",system-ui,sans-serif;--z-bg2:var(--porc);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--champ-d);--z-on-accent:#fff;--z-display:var(--disp);--z-display-weight:400;--z-radius:18px;--z-field-radius:0;--z-ico-radius:50%;--z-sec:clamp(88px,11vw,168px);--z-h3:clamp(24px,2.1vw,31px);--z-statement:clamp(34px,4.6vw,72px);background:var(--stone);color:var(--ink-2);font-family:var(--sans);font-weight:300;font-size:clamp(16px,1.02vw,18px);line-height:1.7}
.d-serene h1,.d-serene h2,.d-serene h3{font-family:var(--disp);font-weight:400;line-height:1.02;letter-spacing:.005em;color:var(--ink)}
.d-serene h1 em,.d-serene h2 em,.d-serene h3 em{font-style:normal;color:var(--champ-d)}
.d-serene h2{font-size:clamp(40px,5.4vw,86px)}
.d-serene h2.is-long{font-size:clamp(32px,3.8vw,58px);line-height:1.08}
.d-serene ::selection{background:var(--champ-l);color:var(--ink)}
.d-serene .sr-wrap{position:relative;width:min(100%,var(--max));margin-inline:auto;padding-inline:var(--pad)}
.d-serene .sr-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.d-serene .sr-kick{display:inline-flex;align-items:center;gap:14px;font-size:11.5px;font-weight:400;letter-spacing:.32em;text-transform:uppercase;color:var(--champ-d)}
.d-serene .sr-kick::before,.d-serene .sr-kick.is-c::after{content:"";width:34px;height:1px;background:var(--champ);transform-origin:right;transition:transform 1.4s var(--slow) .2s}
.d-serene .sr-kick.is-c::after{transform-origin:left}
.demo-js .d-serene .sr-kick[data-rv]:not(.in)::before,.demo-js .d-serene .sr-kick[data-rv]:not(.in)::after{transform:scaleX(0)}
.demo-js .d-serene [data-rv]{transform:translateY(18px);transition:opacity 1.3s var(--ease),transform 1.3s var(--ease);transition-delay:calc(var(--i,0) * 110ms)}
.demo-js .d-serene [data-rv].in{transform:none}
.d-serene .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:54px;padding:0 32px;border-radius:999px;font-family:var(--sans);font-size:12.5px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap;overflow:hidden;isolation:isolate;transition:color .6s var(--ease),background-color .6s var(--ease),border-color .6s,transform .5s var(--ease)}
.d-serene .btn i{position:relative;display:block;width:18px;height:1px;background:currentColor;transition:width .6s var(--ease)}
.d-serene .btn i::after{content:"";position:absolute;right:0;top:-3px;width:7px;height:7px;border-top:1px solid currentColor;border-right:1px solid currentColor;transform:rotate(45deg)}
.d-serene .btn:hover i{width:30px}
.d-serene .sr-fill{background:var(--ink);color:var(--stone)}
.d-serene .sr-fill::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background:radial-gradient(120% 140% at 50% 120%,var(--champ) 0%,var(--champ-d) 70%);opacity:0;transform:scale(.6);transition:opacity .7s var(--ease),transform .9s var(--ease)}
.d-serene .sr-fill:hover::before{opacity:1;transform:none}
.d-serene .sr-ghost{border:1px solid rgba(42,39,35,.4);color:var(--ink)}
.d-serene .sr-ghost:hover{border-color:var(--ink);background:var(--ink);color:var(--stone)}
.d-serene .sr-link{position:relative;display:inline-flex;align-items:center;gap:10px;min-height:44px;font-size:12.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink)}
.d-serene .sr-link::after{content:"";position:absolute;left:0;right:0;bottom:9px;height:1px;background:var(--champ);transform-origin:left;transition:transform .7s var(--slow)}
.d-serene .sr-link:hover::after{transform:scaleX(.25)}
.d-serene .sr-hdr{position:fixed;top:0;left:0;right:0;z-index:40;transition:background-color .8s var(--ease),border-color .8s,box-shadow .8s}
.d-serene.is-scrolled .sr-hdr{background:rgba(247,244,239,.82);backdrop-filter:blur(18px) saturate(1.1);-webkit-backdrop-filter:blur(18px) saturate(1.1);box-shadow:0 1px 0 var(--line)}
.d-serene .sr-bar{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:20px;height:88px;transition:height .7s var(--ease)}
.d-serene.is-scrolled .sr-bar{height:68px}
.d-serene .sr-logo{display:grid;justify-items:center;align-content:center;gap:2px;min-height:46px;max-width:min(52vw,420px);text-align:center;line-height:1}
.d-serene .sr-logo b{overflow:hidden;max-width:100%;font-family:var(--disp);font-size:clamp(21px,1.9vw,28px);font-weight:400;letter-spacing:.16em;text-transform:uppercase;text-overflow:ellipsis;white-space:nowrap;color:var(--ink);transition:letter-spacing .8s var(--ease)}
.d-serene .sr-logo small{font-size:9.5px;letter-spacing:.42em;text-transform:uppercase;color:var(--champ-d);transition:opacity .5s,max-height .5s;max-height:16px;overflow:hidden}
.d-serene.is-scrolled .sr-logo small{opacity:0;max-height:0}
.d-serene .sr-logo:hover b{letter-spacing:.22em}.d-serene .sr-logo.is-long b{font-size:clamp(17px,1.4vw,22px);letter-spacing:.08em}.d-serene .sr-logo.is-long:hover b{letter-spacing:.11em}
.d-serene .sr-nav{display:none;align-items:center;gap:clamp(18px,2.2vw,36px);font-size:11.5px;font-weight:400;letter-spacing:.24em;text-transform:uppercase}
.d-serene .sr-nav.is-r{justify-content:flex-end}
.d-serene .sr-nav a{position:relative;padding:12px 0;color:var(--ink-2);white-space:nowrap;transition:color .4s}
.d-serene .sr-nav a::after{content:"";position:absolute;left:50%;bottom:6px;width:4px;height:4px;border-radius:50%;background:var(--champ);transform:translateX(-50%) scale(0);transition:transform .5s var(--ease)}
.d-serene .sr-nav a:hover{color:var(--ink)}
.d-serene .sr-nav a:hover::after{transform:translateX(-50%) scale(1)}
.d-serene .sr-nav .btn{flex:none;min-height:46px;padding:0 24px;font-size:11px;color:var(--stone)}
.d-serene .sr-nav .btn::after{display:none}
.d-serene .sr-burger{position:relative;z-index:41;display:inline-flex;align-items:center;gap:12px;justify-self:start;min-width:46px;min-height:46px;padding:0;border:0;background:none;font-size:11px;font-weight:400;letter-spacing:.26em;text-transform:uppercase;color:var(--ink)}
.d-serene .sr-burger i{position:relative;display:block;width:28px;height:7px}
.d-serene .sr-burger i::before,.d-serene .sr-burger i::after{content:"";position:absolute;left:0;height:1px;background:currentColor;transition:transform .7s var(--ease),width .7s var(--ease)}
.d-serene .sr-burger i::before{top:0;width:28px}
.d-serene .sr-burger i::after{bottom:0;width:18px}
.d-serene .sr-burger:hover i::after{width:28px}
.d-serene.menu-open .sr-burger i::before{transform:translateY(3px) rotate(18deg)}
.d-serene.menu-open .sr-burger i::after{width:28px;transform:translateY(-3px) rotate(-18deg)}
.d-serene .sr-mob-cta{justify-self:end;display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border:1px solid rgba(42,39,35,.35);border-radius:50%;color:var(--ink);transition:background-color .5s,color .5s}
.d-serene .sr-mob-cta:hover{background:var(--ink);color:var(--stone)}
.d-serene .sr-mob-cta svg{width:18px;height:18px}
@media (max-width:599px){.d-serene .sr-logo b{font-size:18px;letter-spacing:.1em}.d-serene .sr-logo small{letter-spacing:.3em}.d-serene .sr-burger span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}}@media (min-width:1100px){.d-serene .sr-nav{display:flex}.d-serene .sr-burger,.d-serene .sr-mob-cta{display:none}}
.d-serene .sr-menu{position:fixed;inset:0;z-index:39;display:grid;grid-template-rows:1fr auto;gap:28px;padding:118px var(--pad) 118px;background:var(--porc);overflow-y:auto;clip-path:inset(50% 0 50% 0);visibility:hidden;transition:clip-path 1s var(--slow),visibility 0s 1s}
.d-serene .sr-menu.is-open{clip-path:inset(0);visibility:visible;transition:clip-path 1s var(--slow)}
.d-serene .sr-menu::before{content:"";position:absolute;left:50%;top:50%;width:min(70vw,420px);height:1px;background:var(--champ);transform:translate(-50%,-50%) scaleX(0);transition:transform .6s var(--ease)}
.d-serene .sr-menu.is-open::before{transform:translate(-50%,-50%) scaleX(0);transition:none}
.d-serene .sr-menu nav{display:grid;align-content:center;justify-items:center;gap:4px;text-align:center}
.d-serene .sr-menu nav a{display:grid;justify-items:center;gap:2px;min-height:58px;padding:6px 18px;font-family:var(--disp);font-size:clamp(36px,9.4vw,64px);line-height:1.08;color:var(--ink);opacity:0;transform:translateY(18px);letter-spacing:.12em;transition:opacity .9s var(--ease),transform 1.1s var(--ease),letter-spacing 1.4s var(--ease),color .4s}
.d-serene .sr-menu.is-open nav a{opacity:1;transform:none;letter-spacing:.01em;transition-delay:calc(.35s + var(--i,0) * 80ms)}
.d-serene .sr-menu nav a small{font-family:var(--sans);font-size:10.5px;letter-spacing:.34em;color:var(--champ-d)}
.d-serene .sr-menu nav a:hover{color:var(--champ-d)}
.d-serene .sr-menu-foot{display:grid;justify-items:center;gap:6px;text-align:center;font-size:15px;color:var(--dim);opacity:0;transition:opacity .9s var(--ease) .7s}
.d-serene .sr-menu.is-open .sr-menu-foot{opacity:1}
.d-serene .sr-menu-foot a{display:inline-flex;align-items:center;min-height:44px;color:var(--ink)}
.d-serene .sr-menu-foot .btn{margin-top:10px;color:var(--stone)}
.d-serene.menu-open .sr-hdr{background:transparent;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-serene.menu-open .sr-mob-cta{opacity:0;pointer-events:none}
.d-serene .sr-gauge{position:fixed;right:clamp(14px,1.6vw,30px);top:50%;z-index:30;display:none;grid-template-columns:auto auto;align-items:center;gap:8px;height:min(34vh,300px);transform:translateY(-50%);pointer-events:none;opacity:0;transition:opacity 1s var(--ease)}
.d-serene.is-scrolled .sr-gauge{opacity:1}
.d-serene.menu-open .sr-gauge{opacity:0}
@media (min-width:1280px){.d-serene .sr-gauge{display:grid}}
.d-serene .sr-gauge-l{position:relative;width:12px;height:100%;font-size:9.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--champ-d)}
.d-serene .sr-gauge-l span{position:absolute;left:0;top:calc(var(--g,0) * 100%);writing-mode:vertical-rl;white-space:nowrap;opacity:0;transform:translateY(-50%) translateX(6px);transition:opacity .6s,transform .8s var(--ease),top .25s linear}
.d-serene .sr-gauge-l span.on{opacity:1;transform:translateY(-50%)}
.d-serene .sr-gauge-s{position:relative;display:flex;flex-direction:column;justify-content:space-between;width:14px;height:100%}
.d-serene .sr-gauge-s i{display:block;width:6px;height:1px;margin-left:auto;background:rgba(42,39,35,.32)}
.d-serene .sr-gauge-s i:nth-child(5n+1){width:12px;background:rgba(42,39,35,.55)}
.d-serene .sr-gauge-s b{position:absolute;right:-3px;top:calc(var(--g,0) * 100%);width:20px;height:1px;background:var(--champ-d);transition:top .25s linear}
.d-serene .sr-gauge-s b::after{content:"";position:absolute;left:-6px;top:-3px;width:7px;height:7px;border-radius:50%;background:var(--champ-d)}
.d-serene .sr-hero{position:relative;padding-top:clamp(112px,min(11vw,17vh),164px);padding-bottom:clamp(56px,7vw,104px);overflow:hidden}
.d-serene .sr-hero::before{content:"";position:absolute;left:50%;top:-20%;width:min(140vw,1700px);aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(247,244,239,.95),rgba(247,244,239,0));transform:translateX(-50%);pointer-events:none}
.d-serene .sr-hero-top{position:relative;display:grid;justify-items:center;gap:clamp(20px,2.4vw,34px);text-align:center}
.d-serene .sr-hero-top .sr-kick{opacity:0;animation:sr-fade 1.4s var(--ease) .3s both}@media (max-width:599px){.d-serene .sr-kick{letter-spacing:.22em;gap:10px}.d-serene .sr-kick::before,.d-serene .sr-kick.is-c::after{width:18px}.d-serene .sr-hero-top .sr-kick{max-width:30ch;text-align:center}}
.d-serene .sr-hero h1{max-width:16ch;font-size:clamp(50px,8.8vw,150px);line-height:.98;letter-spacing:.01em}
.d-serene .sr-hero h1.is-m{max-width:18ch;font-size:clamp(38px,7.4vw,120px)}
.d-serene .sr-hero h1.is-s{max-width:22ch;font-size:clamp(38px,5.6vw,90px);line-height:1.04}
.d-serene .sr-ln{display:block}
.d-serene .sr-w{display:inline-block;white-space:nowrap}
.d-serene .sr-ch{display:inline-block;opacity:0;transform:translateX(calc(var(--d,0) * 2.2em));animation:sr-track 2.1s var(--ease) both;animation-delay:calc(.25s + var(--i,0) * 160ms + var(--a,0) * 22ms)}
.d-serene .sr-w.is-em .sr-ch{color:var(--champ-d)}
.d-serene .sr-hero-row{position:relative;display:grid;gap:36px;justify-items:center;margin-top:clamp(36px,min(4vw,6vh),64px)}
@media (min-width:980px){.d-serene .sr-hero-row{grid-template-columns:minmax(0,1fr) clamp(250px,min(25vw,35vh),400px) minmax(0,1fr);align-items:end;gap:clamp(32px,4vw,72px)}}
.d-serene .sr-hero-copy{display:grid;gap:30px;justify-items:center;text-align:center;opacity:0;animation:sr-up 1.5s var(--ease) 1.25s both}
@media (min-width:980px){.d-serene .sr-hero-copy{justify-items:start;text-align:left;padding-bottom:12px}}
.d-serene .sr-lede{max-width:40ch;font-size:clamp(17px,1.25vw,20px);color:var(--ink-2)}
.d-serene .sr-cta-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px 26px}
@media (min-width:980px){.d-serene .sr-cta-row{justify-content:flex-start}}
.d-serene .sr-pill-wrap{position:relative;width:min(78vw,420px);order:-1}
@media (min-width:980px){.d-serene .sr-pill-wrap{width:100%;order:0}}
.d-serene .sr-pill{position:relative;overflow:hidden;aspect-ratio:3/4.3;border-radius:999px;background:var(--stone-2);clip-path:inset(50% 0 50% 0 round 999px);animation:sr-open 1.9s var(--slow) .75s both;isolation:isolate}
.d-serene .sr-pill img{width:100%;height:100%;object-fit:cover;transform:scale(1.22) translateY(calc(var(--p,0) * -4%));animation:sr-settle 2.6s var(--ease) .75s both}
.d-serene .sr-pill::after{content:"";position:absolute;inset:10px;z-index:1;border:1px solid rgba(247,244,239,.55);border-radius:999px;pointer-events:none}
.d-serene .sr-pill-line{position:absolute;left:-6%;right:-6%;top:50%;height:1px;background:var(--champ);transform:scaleX(0);animation:sr-line 1.6s var(--slow) .15s both}
.d-serene .sr-vert{position:absolute;right:calc(100% + 18px);bottom:12%;display:none;writing-mode:vertical-rl;transform:rotate(180deg);font-size:10.5px;letter-spacing:.42em;text-transform:uppercase;color:var(--champ-d);opacity:0;animation:sr-fade 1.4s var(--ease) 2s both}
@media (min-width:600px){.d-serene .sr-vert{display:block}}
.d-serene .sr-aura{position:relative;display:grid;place-items:center;overflow:hidden;aspect-ratio:3/4.3;border:1px solid var(--champ);border-radius:999px;background:radial-gradient(60% 46% at var(--ax,50%) var(--ay,38%),rgba(255,255,255,.95),rgba(220,202,168,.55) 55%,rgba(179,150,104,.35) 100%);clip-path:inset(50% 0 50% 0 round 999px);animation:sr-open 1.9s var(--slow) .75s both,sr-breathe 14s ease-in-out 2.6s infinite alternate}
.d-serene .sr-aura span{font-family:var(--disp);font-size:clamp(130px,16vw,240px);line-height:1;color:var(--champ-d);opacity:.85}
.d-serene .sr-aura::after{content:"";position:absolute;inset:12px;border:1px solid rgba(125,100,66,.35);border-radius:999px}
.d-serene .sr-facts{display:grid;width:min(100%,380px);opacity:0;animation:sr-up 1.5s var(--ease) 1.45s both}
@media (min-width:980px){.d-serene .sr-facts{justify-self:end;padding-bottom:12px}}
.d-serene .sr-facts div{display:grid;gap:2px;padding:14px 0;border-top:1px solid var(--line);text-align:center}
@media (min-width:980px){.d-serene .sr-facts div{text-align:right}}
.d-serene .sr-facts dt{font-size:10.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--champ-d)}
.d-serene .sr-facts dd{margin:0;color:var(--ink)}
.d-serene .sr-facts a{display:inline-flex;min-height:32px;align-items:center}
.d-serene .sr-now{display:inline-flex;align-items:center;gap:10px;font-size:10.5px;font-weight:400;letter-spacing:.3em;text-transform:uppercase;color:var(--ink-2)}
.d-serene .sr-now::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor;box-shadow:0 0 0 4px rgba(42,39,35,.06)}
.d-serene .sr-now.is-open{color:#55704f}
.d-serene .sr-now.is-closed{color:var(--champ-d)}
.d-serene .sr-index{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 22px;margin-top:clamp(56px,7vw,104px);padding-top:26px;border-top:1px solid var(--line);font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:var(--dim);opacity:0;animation:sr-fade 1.6s var(--ease) 1.9s both}
.d-serene .sr-index span{display:inline-flex;align-items:center;gap:22px}
.d-serene .sr-index span+span::before{content:"";width:5px;height:5px;background:var(--champ);transform:rotate(45deg)}
.d-serene .sr-sec{position:relative;padding-block:var(--z-sec)}
.d-serene .sr-sec.is-porc{background:var(--porc)}
.d-serene .sr-sec.is-stone2{background:var(--stone-2)}
.d-serene .sr-sec.is-night{background:var(--night);color:var(--on-dim)}
.d-serene .is-night h2,.d-serene .is-night h3{color:var(--on-night)}
.d-serene .is-night h2 em{color:var(--champ-l)}
.d-serene .is-night .sr-kick{color:var(--champ-l)}
.d-serene .sr-head{display:grid;gap:22px;justify-items:center;max-width:860px;margin:0 auto clamp(52px,6vw,96px);text-align:center}
.d-serene .sr-head>p:not(.sr-kick){max-width:54ch;color:var(--dim)}
.d-serene .is-night .sr-head>p:not(.sr-kick){color:var(--on-dim)}
.d-serene .sr-head.is-l{justify-items:start;margin-inline:0;text-align:left}.d-serene :is(.sr-about-copy,.sr-book-copy,.sr-visit-copy) .sr-head{margin-bottom:4px}
.d-serene .sr-about{display:grid;gap:clamp(44px,6vw,110px);align-items:center}
@media (min-width:960px){.d-serene .sr-about{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}.d-serene .sr-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:980px;margin-inline:auto}}
.d-serene .sr-about-copy{display:grid;gap:30px;align-content:start}
.d-serene .sr-lead{font-family:var(--disp);font-size:clamp(28px,2.7vw,44px);line-height:1.22;color:var(--ink)}
.d-serene .sr-cols{display:grid;gap:18px 44px;color:var(--dim)}
@media (min-width:760px){.d-serene .sr-cols.is-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-serene .sr-highs{display:flex;flex-wrap:wrap;gap:12px}
.d-serene .sr-highs li{display:inline-flex;align-items:center;gap:12px;min-height:44px;padding:0 22px;border:1px solid var(--line);border-radius:999px;font-size:14px;color:var(--ink);transition:border-color .5s,background-color .5s}
.d-serene .sr-highs li::before{content:"";width:5px;height:5px;background:var(--champ);transform:rotate(45deg)}
.d-serene .sr-highs li:hover{border-color:var(--champ);background:var(--porc)}
.d-serene .sr-frame{position:relative;padding:clamp(12px,1.4vw,20px)}
.d-serene .sr-frame::before{content:"";position:absolute;inset:0;border:1px solid var(--champ);border-radius:240px 240px 28px 28px;clip-path:inset(0 0 100% 0);transition:clip-path 1.8s var(--slow) .3s}
.d-serene .sr-frame.in::before,html:not(.demo-js) .d-serene .sr-frame::before{clip-path:inset(0)}
.d-serene .sr-frame figure{position:relative;overflow:hidden;aspect-ratio:4/5;border-radius:230px 230px 20px 20px;background:var(--stone-2)}
.d-serene .sr-frame img{width:100%;height:100%;object-fit:cover;transform:scale(1.12) translateY(calc(var(--p,0) * -3.5%));transition:transform 1.6s var(--ease)}
.d-serene .sr-frame figcaption{position:absolute;left:50%;bottom:clamp(24px,3vw,40px);padding:9px 18px;border-radius:999px;background:rgba(247,244,239,.9);font-size:10.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--ink);transform:translateX(-50%);white-space:nowrap;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.demo-js .d-serene .sr-frame[data-rv]{transform:none}
.d-serene .sr-treat{display:grid;gap:clamp(40px,5vw,96px)}
@media (min-width:980px){.d-serene .sr-treat{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);align-items:start}}
.d-serene .sr-tabs{display:none;margin-top:12px;border-top:1px solid var(--line)}
@media (min-width:980px){.d-serene .sr-tabs{display:grid}}
.d-serene .sr-tab{position:relative;display:grid;grid-template-columns:42px minmax(0,1fr) auto;align-items:baseline;gap:14px;width:100%;min-height:64px;padding:20px 0;border:0;border-bottom:1px solid var(--line);background:none;text-align:left;color:var(--dim);transition:color .5s,padding .7s var(--ease)}
.d-serene .sr-tab::after{content:"";position:absolute;left:0;bottom:-1px;width:100%;height:1px;background:var(--champ-d);transform:scaleX(0);transform-origin:left;transition:transform .9s var(--slow)}
.d-serene .sr-tab small{font-size:11px;letter-spacing:.24em;color:var(--champ-d)}
.d-serene .sr-tab b{font-family:var(--disp);font-size:clamp(24px,2.2vw,32px);font-weight:400;line-height:1.1}
.d-serene .sr-tab span{font-size:12px;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap}
.d-serene .sr-tab:hover{color:var(--ink);padding-left:8px}
.d-serene .sr-tab[aria-selected="true"]{color:var(--ink);padding-left:14px}
.d-serene .sr-tab[aria-selected="true"]::after{transform:none}
.d-serene .sr-panels{display:grid;gap:22px}
@media (min-width:980px){.d-serene .sr-panels{position:sticky;top:110px}}
.d-serene .sr-panel{display:grid;gap:0;overflow:hidden;border:1px solid var(--line);border-radius:28px;background:var(--porc)}
@media (max-width:979px){.d-serene .sr-panel[hidden]{display:grid}}
@media (min-width:980px){.d-serene .sr-panel[hidden]{display:none}.d-serene .sr-panel:not([hidden]){animation:sr-panel 1.1s var(--ease) both}}
@media (min-width:700px){.d-serene .sr-panel.has-pic{grid-template-columns:minmax(0,.62fr) minmax(0,1fr)}}
.d-serene .sr-panel figure{position:relative;overflow:hidden;min-height:220px;aspect-ratio:16/10;background:var(--stone-2)}
@media (min-width:700px){.d-serene .sr-panel figure{aspect-ratio:auto;min-height:100%}}
.d-serene .sr-panel img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 2s var(--ease)}
.d-serene .sr-panel:hover img{transform:scale(1.05)}
.d-serene .sr-panel-in{position:relative;display:grid;gap:20px;align-content:start;padding:clamp(26px,3.2vw,48px)}
.d-serene .sr-panel-n{font-family:var(--disp);font-size:15px;letter-spacing:.3em;color:var(--champ-d)}
.d-serene .sr-panel:not(.has-pic) .sr-panel-in::after{content:attr(data-n);position:absolute;right:clamp(18px,3vw,40px);top:6px;font-family:var(--disp);font-size:clamp(110px,12vw,180px);line-height:1;color:rgba(179,150,104,.18);pointer-events:none}
.d-serene .sr-panel h3{font-size:clamp(28px,2.3vw,40px);overflow-wrap:break-word}
.d-serene .sr-what{display:grid;gap:6px}
.d-serene .sr-what small,.d-serene .sr-spec dt{font-size:10.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--champ-d)}
.d-serene .sr-what p{color:var(--ink-2)}
.d-serene .sr-spec{display:grid;grid-template-columns:repeat(auto-fit,minmax(112px,1fr));gap:0 22px}
.d-serene .sr-spec div{display:grid;gap:4px;align-content:start;padding:14px 0 6px;border-top:1px solid var(--line)}

.d-serene .sr-spec dd{margin:0;color:var(--ink)}
.d-serene .sr-panel .sr-link{justify-self:start}
.d-serene .sr-carte{display:grid;gap:clamp(48px,6vw,88px);max-width:1080px;margin-inline:auto}
.d-serene .sr-carte h3.sr-cat{display:flex;align-items:center;gap:18px;margin-bottom:26px;font-family:var(--sans);font-size:11.5px;font-weight:400;letter-spacing:.34em;text-transform:uppercase;color:var(--champ-d)}
.d-serene .sr-carte h3.sr-cat::before,.d-serene .sr-carte h3.sr-cat::after{content:"";flex:1;height:1px;background:var(--line)}
.d-serene .sr-dishes{display:grid;gap:0 clamp(32px,5vw,80px)}
@media (min-width:820px){.d-serene .sr-dishes{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-serene .sr-dish{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 18px;padding:20px 0;border-bottom:1px solid var(--line)}
.d-serene .sr-dish b{font-family:var(--disp);font-size:clamp(23px,1.9vw,28px);font-weight:400;line-height:1.15;color:var(--ink)}
.d-serene .sr-dish span{color:var(--champ-d);white-space:nowrap}
.d-serene .sr-dish p{grid-column:1/-1;font-size:.94em;color:var(--dim)}
.d-serene .sr-feats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));border-top:1px solid var(--line-n)}
.d-serene .sr-feat{position:relative;display:grid;gap:16px;align-content:start;justify-items:center;padding:clamp(32px,3.4vw,52px) clamp(14px,2vw,30px);text-align:center}
.d-serene .sr-feat+.sr-feat{border-left:1px solid var(--line-n)}
@media (max-width:620px){.d-serene .sr-feat+.sr-feat{border-left:0;border-top:1px solid var(--line-n)}}
.d-serene .sr-feat i{position:relative;display:grid;place-items:center;width:64px;height:64px;border:1px solid var(--champ);border-radius:50%;color:var(--champ-l);transition:color .7s,background-color .7s}
.d-serene .sr-feat i::after{content:"";position:absolute;inset:-7px;border:1px solid rgba(179,150,104,.3);border-radius:50%;transform:scale(.85);opacity:0;transition:transform 1s var(--ease),opacity 1s}
.d-serene .sr-feat:hover i{background:var(--champ);color:var(--night)}
.d-serene .sr-feat:hover i::after{transform:none;opacity:1}
.d-serene .sr-feat svg{width:22px;height:22px;stroke-width:1.4}
.d-serene .sr-feat h3{font-size:clamp(24px,2vw,30px)}
.d-serene .sr-feat p{max-width:30ch}
.d-serene .sr-steps{display:grid;gap:clamp(40px,5vw,96px)}
@media (min-width:980px){.d-serene .sr-steps{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}.d-serene .sr-steps .sr-head{position:sticky;top:120px;align-self:start}}
.d-serene .sr-steps ol{border-top:1px solid var(--line)}
.d-serene .sr-step{display:grid;grid-template-columns:clamp(64px,7vw,110px) minmax(0,1fr);gap:8px clamp(18px,2.4vw,40px);padding:clamp(26px,3vw,44px) 0;border-bottom:1px solid var(--line)}
.d-serene .sr-step b{grid-row:span 2;font-family:var(--disp);font-size:clamp(46px,5vw,80px);font-weight:400;line-height:.9;color:var(--champ)}
.d-serene .sr-step h3{font-size:clamp(26px,2.3vw,36px)}
.d-serene .sr-step p{max-width:52ch;color:var(--dim)}
.d-serene .sr-step{position:relative}.d-serene .sr-step::after{content:"";position:absolute;inset:-1px 0;background:var(--stone);transform-origin:right;transform:scaleX(0);pointer-events:none}.demo-js .d-serene .sr-step[data-rv]{opacity:1;transform:none}.demo-js .d-serene .sr-step[data-rv]::after{transform:scaleX(1);transition:transform 1.6s var(--slow);transition-delay:calc(.1s + var(--i,0) * 120ms)}
.demo-js .d-serene .sr-step[data-rv].in::after{transform:scaleX(0)}
.d-serene .sr-cols3{display:grid;gap:clamp(12px,1.6vw,26px);grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}
@media (min-width:900px){.d-serene .sr-cols3{grid-template-columns:repeat(3,minmax(0,1fr))}}
.d-serene .sr-col{display:grid;gap:clamp(12px,1.6vw,26px);transform:translateY(calc(var(--p,0) * var(--k,0) * 1px));will-change:transform}
@media (max-width:899px){.d-serene .sr-col{--k:0!important}.d-serene .sr-col.is-3{display:contents}}
.d-serene .sr-col:nth-child(2){margin-top:clamp(40px,8vw,120px)}
.d-serene .sr-col figure{position:relative;overflow:hidden;aspect-ratio:4/5;border-radius:22px;background:var(--stone-2)}
.d-serene .sr-col figure.is-pill{aspect-ratio:3/4.4;border-radius:999px}
.d-serene .sr-col figure.is-wide{aspect-ratio:4/3}
.d-serene .sr-col img{width:100%;height:100%;object-fit:cover;transform:scale(1.04);transition:transform 2.2s var(--ease),filter 1.2s}
.d-serene .sr-col figure:hover img{transform:scale(1.1)}
.d-serene .sr-col figcaption{position:absolute;left:50%;bottom:18px;max-width:calc(100% - 40px);padding:7px 14px;border-radius:999px;background:rgba(247,244,239,.88);font-size:12px;line-height:1.35;color:var(--ink);text-align:center;transform:translate(-50%,10px);opacity:0;transition:opacity .6s,transform .8s var(--ease)}
.d-serene .sr-col figure:hover figcaption{opacity:1;transform:translate(-50%,0)}
@media (hover:none){.d-serene .sr-col figcaption{display:none}}
.d-serene .sr-team{display:grid;gap:clamp(40px,4vw,72px) clamp(20px,3vw,48px);grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));max-width:1180px;margin-inline:auto}
.d-serene .sr-member{display:grid;gap:12px;align-content:start;justify-items:center;text-align:center}
.d-serene .sr-member figure{position:relative;width:min(100%,300px);margin-bottom:16px;padding:10px}
.d-serene .sr-member figure::before{content:"";position:absolute;inset:0;border:1px solid var(--champ);border-radius:999px;opacity:0;transform:scale(.96);transition:opacity .8s,transform 1s var(--ease)}
.d-serene .sr-member:hover figure::before{opacity:1;transform:none}
.d-serene .sr-member figure div{overflow:hidden;aspect-ratio:3/4.3;border-radius:999px;background:var(--stone-2)}
.d-serene .sr-member img{width:100%;height:100%;object-fit:cover;filter:saturate(.72) sepia(.08);transform:scale(1.06);transition:filter 1.2s var(--ease),transform 1.6s var(--ease)}
.d-serene .sr-member:hover img{filter:none;transform:none}
.d-serene .sr-member .sr-mono{display:grid;place-items:center;width:112px;height:112px;margin-bottom:10px;border:1px solid var(--champ);border-radius:50%;font-family:var(--disp);font-size:44px;color:var(--champ-d)}
.d-serene .sr-role{font-size:10.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--champ-d)}
.d-serene .sr-member h3{font-size:clamp(27px,2.3vw,34px)}
.d-serene .sr-member p:not(.sr-role){max-width:34ch;color:var(--dim)}
.d-serene .sr-ba{display:grid;gap:clamp(20px,3vw,40px);grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));max-width:1180px;margin-inline:auto}
.d-serene .sr-ba figure{display:grid;gap:16px}
.d-serene .sr-ba-knob{position:absolute;left:var(--pos);top:50%;z-index:2;display:grid;place-items:center;width:58px;height:58px;border:1px solid rgba(247,244,239,.9);border-radius:50%;background:rgba(42,39,35,.32);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transform:translate(-50%,-50%);pointer-events:none;transition:background-color .4s}
.d-serene .sr-ba-knob::before,.d-serene .sr-ba-knob::after{content:"";position:absolute;top:50%;width:7px;height:7px;border-top:1px solid #fff;border-left:1px solid #fff}
.d-serene .sr-ba-knob::before{left:14px;transform:translateY(-50%) rotate(-45deg)}
.d-serene .sr-ba-knob::after{right:14px;transform:translateY(-50%) rotate(135deg)}
.d-serene .sr-ba-tag{position:absolute;top:18px;z-index:2;padding:6px 14px;border-radius:999px;background:rgba(247,244,239,.88);font-size:10.5px;letter-spacing:.28em;text-transform:uppercase;color:var(--ink);pointer-events:none}
.d-serene .sr-ba-tag.is-b{left:18px}
.d-serene .sr-ba-tag.is-a{right:18px}
.d-serene .sr-ba figcaption{font-family:var(--disp);font-size:clamp(21px,1.8vw,26px);text-align:center;color:var(--ink)}
.d-serene .sr-card{position:relative;display:grid;gap:22px;padding:clamp(30px,4vw,60px);border-radius:28px;background:var(--porc);box-shadow:0 40px 80px -60px rgba(42,39,35,.5)}
.d-serene .sr-card::before{content:"";position:absolute;inset:10px;border:1px solid rgba(179,150,104,.42);border-radius:20px;pointer-events:none}
.d-serene .sr-card-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 18px;padding-bottom:8px}
.d-serene .sr-card-top h3{font-size:clamp(26px,2.2vw,34px)}.d-serene .sr-card.is-reach{justify-items:start}.d-serene .sr-card.is-reach>p{font-size:1.1em;color:var(--ink)}.d-serene .sr-card.is-reach .sr-link{text-transform:none;letter-spacing:.04em;font-size:16px}.d-serene .sr-card.is-reach .btn{margin-top:8px}
.d-serene .sr-visit{display:grid;gap:clamp(40px,5vw,96px)}
@media (min-width:980px){.d-serene .sr-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center}}
.d-serene .sr-visit-copy{display:grid;gap:26px;align-content:start}
.d-serene .sr-visit-copy>p{max-width:46ch;color:var(--dim)}
.d-serene .sr-book{display:grid;gap:clamp(40px,5vw,96px);align-items:start}
@media (min-width:1000px){.d-serene .sr-book{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-serene .sr-book-copy{display:grid;gap:26px}
.d-serene .sr-book-copy>p{max-width:46ch;color:var(--dim)}
.d-serene .sr-form{position:relative;padding:clamp(30px,4vw,62px);border-radius:28px;background:var(--porc);box-shadow:0 50px 90px -70px rgba(42,39,35,.55)}
.d-serene .sr-form::before{content:attr(data-mono);position:absolute;left:50%;top:0;display:grid;place-items:center;width:58px;height:58px;border:1px solid var(--champ);border-radius:50%;background:var(--stone);font-family:var(--disp);font-size:24px;color:var(--champ-d);transform:translate(-50%,-50%)}
.d-serene .is-porc .sr-form{background:var(--stone)}
.d-serene .is-porc .sr-form::before{background:var(--porc)}
.d-serene .sr-orders{display:grid;gap:clamp(14px,2vw,24px);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));max-width:1180px;margin-inline:auto}
.d-serene .sr-order{display:grid;gap:14px;justify-items:center;height:100%;padding:clamp(30px,3.4vw,48px) 24px;border:1px solid var(--line);border-radius:999px 999px 28px 28px;background:var(--porc);text-align:center;transition:border-color .6s,transform .8s var(--ease)}
.d-serene .sr-order:hover{border-color:var(--champ);transform:translateY(-6px)}
.d-serene .sr-order i{display:grid;place-items:center;width:56px;height:56px;border:1px solid var(--champ);border-radius:50%;color:var(--champ-d)}
.d-serene .sr-order svg{width:20px;height:20px;stroke-width:1.4}
.d-serene .sr-order h3{font-size:clamp(25px,2vw,30px)}
.d-serene .sr-order p{color:var(--dim)}
.d-serene .sr-foot{position:relative;padding:clamp(88px,10vw,150px) 0 140px;background:var(--night);color:var(--on-dim);overflow:hidden}
.d-serene .sr-foot::before{content:"";position:absolute;left:50%;top:0;width:1px;height:clamp(56px,7vw,100px);background:linear-gradient(var(--champ),transparent)}
.d-serene .sr-foot-cta{display:grid;justify-items:center;gap:26px;max-width:980px;margin:0 auto;text-align:center}
.d-serene .sr-foot-cta>p:not(.sr-kick){font-family:var(--disp);font-size:clamp(36px,4.6vw,74px);line-height:1.08;color:var(--on-night)}
.d-serene .sr-foot-cta>p em{font-style:normal;color:var(--champ-l)}
.d-serene .sr-foot .sr-fill{background:var(--on-night);color:var(--night)}
.d-serene .sr-foot .sr-fill:hover{color:var(--on-night)}
.d-serene .sr-foot-name{margin:clamp(64px,8vw,120px) 0 clamp(40px,5vw,72px);padding-block:clamp(24px,3vw,40px);border-block:1px solid var(--line-n);font-family:var(--disp);font-size:min(10.5vw,168px);line-height:1;letter-spacing:.06em;text-align:center;text-transform:uppercase;white-space:nowrap;color:var(--on-night);overflow:hidden;text-overflow:clip}
.d-serene .sr-foot-name span{display:inline-block;letter-spacing:.3em;opacity:.4;transition:letter-spacing 2.4s var(--ease),opacity 2.4s var(--ease)}
.d-serene .sr-foot-name.in span,html:not(.demo-js) .d-serene .sr-foot-name span{letter-spacing:.06em;opacity:1}
.demo-js .d-serene .sr-foot-name[data-rv]{opacity:1;transform:none}
.d-serene .sr-foot-name{font-size:min(168px,calc(100vw / var(--n,12)))}
.d-serene .sr-foot-grid{display:grid;gap:36px 48px;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-serene .sr-foot-grid h3{margin-bottom:14px;font-family:var(--sans);font-size:10.5px;font-weight:400;letter-spacing:.32em;text-transform:uppercase;color:var(--champ-l)}
.d-serene .sr-foot-grid a,.d-serene .sr-foot-grid span{display:flex;align-items:center;min-height:40px}
.d-serene .sr-foot-grid a{transition:color .4s,transform .6s var(--ease)}
.d-serene .sr-foot-grid a:hover{color:var(--on-night);transform:translateX(6px)}
.d-serene .sr-foot-grid>p{max-width:34ch}
.d-serene .sr-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:64px;padding-top:24px;border-top:1px solid var(--line-n);font-size:12px;letter-spacing:.04em;color:rgba(236,230,220,.5)}
@keyframes sr-fade{from{opacity:0}to{opacity:1}}
@keyframes sr-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes sr-track{to{opacity:1;transform:none}}
@keyframes sr-line{0%{transform:scaleX(0);opacity:1}60%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
@keyframes sr-open{to{clip-path:inset(0 0 0 0 round 999px)}}
@keyframes sr-settle{to{transform:scale(1.06) translateY(calc(var(--p,0) * -4%))}}
@keyframes sr-panel{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes sr-breathe{0%{--ax:42%;--ay:34%}100%{--ax:60%;--ay:48%}}
@property --ax{syntax:"<percentage>";inherits:false;initial-value:50%}
@property --ay{syntax:"<percentage>";inherits:false;initial-value:38%}
@media (prefers-reduced-motion:reduce){.d-serene .sr-ch,.d-serene .sr-hero-top .sr-kick,.d-serene .sr-hero-copy,.d-serene .sr-facts,.d-serene .sr-index,.d-serene .sr-vert{opacity:1;transform:none;animation:none}.d-serene .sr-pill,.d-serene .sr-aura{clip-path:none;animation:none}.d-serene .sr-pill img{animation:none;transform:scale(1.06)}.d-serene .sr-pill-line{display:none}.d-serene .sr-col{transform:none}.d-serene .sr-foot-name span{letter-spacing:.06em;opacity:1}.d-serene .sr-step::after{display:none}}
`
  .replace(/\n/g, "")
  .trim();

/** Restyles of the kit's shared sections and fields: they load after BASE_CSS, so they win. */
const EXTRA = `
.d-serene .sr-ba .z-ba{aspect-ratio:4/3.2;border-radius:28px;background:var(--stone-2)}
.d-serene .sr-ba .z-ba::after{width:1px;background:rgba(247,244,239,.9)}
.d-serene .sr-ba .z-ba:hover .sr-ba-knob{background:rgba(125,100,66,.6)}
.d-serene .z-hours{border-color:var(--line)}
.d-serene .z-hours div{position:relative;padding:15px 4px;transition:padding .6s var(--ease)}
.d-serene .z-hours dt{color:var(--ink)}
.d-serene .z-hours div.is-today{padding-inline:18px;border-radius:999px;background:var(--stone);border-bottom-color:transparent}
.d-serene .z-hours div.is-today dt::before{content:"";display:inline-block;width:6px;height:6px;margin-right:12px;vertical-align:middle;background:var(--champ-d);transform:rotate(45deg)}
.d-serene .z-hours div.is-today dd{color:var(--champ-d)}
.d-serene .z-field label,.d-serene .z-chipset legend{font-size:10.5px;letter-spacing:.28em;color:var(--champ-d)}
.d-serene .z-field input,.d-serene .z-field select,.d-serene .z-field textarea{padding:10px 0;border-width:0 0 1px;border-color:rgba(42,39,35,.3);font-weight:300;transition:border-color .5s}
.d-serene .z-field select{background:linear-gradient(45deg,transparent 50%,var(--champ-d) 50%) calc(100% - 10px) 55%/6px 6px no-repeat,linear-gradient(-45deg,transparent 50%,var(--champ-d) 50%) calc(100% - 4px) 55%/6px 6px no-repeat}
.d-serene .z-field :focus-visible{outline:none;border-color:var(--champ-d)}
.d-serene .z-form .btn{margin-top:6px}
.d-serene .form-status{border-radius:14px;border-color:var(--champ)}
.d-serene .z-sec.z-faq{background:var(--porc)}
.d-serene .z-faq .z-head{justify-items:center;margin-inline:auto;text-align:center}
.d-serene .z-acc summary{font-family:var(--disp);font-size:clamp(22px,1.9vw,28px);line-height:1.2;transition:color .4s,padding .6s var(--ease)}
.d-serene .z-acc summary:hover{color:var(--champ-d);padding-left:8px}
.d-serene .z-acc summary i{width:30px;height:30px;border:1px solid var(--champ);border-radius:50%}
.d-serene .z-acc summary i::before,.d-serene .z-acc summary i::after{left:9px;width:10px;background:var(--champ-d)}
.d-serene .z-acc details[open] summary{color:var(--champ-d)}
.d-serene .z-acc details>p{animation:sr-up .9s var(--ease) both}
.d-serene .z-sec.z-cta{background:var(--night);color:var(--on-dim)}
.d-serene .z-cta h2{font-size:clamp(42px,5.6vw,92px);color:var(--on-night)}
.d-serene .z-cta h2 em{color:var(--champ-l)}
.d-serene .z-cta .sr-fill{background:var(--on-night);color:var(--night)}
.d-serene .z-cta .sr-fill:hover{color:var(--on-night)}
.d-serene .z-statement{background:var(--stone-2)}
.d-serene .z-statement .z-center{position:relative;padding-block:clamp(18px,2vw,30px)}
.d-serene .z-statement h2{line-height:1.14}
.d-serene .z-statement .z-center::before,.d-serene .z-statement .z-center::after{content:"";width:1px;height:clamp(44px,5vw,80px);background:var(--champ)}
.d-serene .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(37,34,30,0) 30%,rgba(37,34,30,.78))}
.d-serene .z-showcase h2{color:inherit}.d-serene .z-showcase.has-pic h2 em{color:var(--champ-l)}
.d-serene .z-showcase .sr-ghost{border-color:rgba(255,255,255,.6);color:#fff}
.d-serene .z-showcase .sr-ghost:hover{background:#fff;color:var(--ink)}
.d-serene .z-card{border-radius:28px;background:var(--porc)}
.d-serene .z-pack{border-radius:999px 999px 28px 28px;padding-top:clamp(44px,5vw,72px);text-align:center;justify-items:center}
.d-serene .z-pack .z-ticks{justify-items:start;text-align:left}
.d-serene .z-pack.is-featured{background:var(--night);color:var(--on-dim);border-color:var(--night)}
.d-serene .z-pack.is-featured h3,.d-serene .z-pack.is-featured .z-pack-price b{color:var(--on-night)}
.d-serene .z-pack.is-featured .z-tag{color:var(--champ-l)}
.d-serene .z-quotes blockquote>p{font-size:clamp(23px,2vw,30px)}
.d-serene .z-steps small,.d-serene .z-rows small{font-family:var(--disp);font-size:20px;letter-spacing:.12em}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The precision gauge follows the scroll and names the section in view; buttons marked
 * data-mag lean towards a fine pointer.
 */
const JS = `(function(){var d=document,W=window,reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var g=d.querySelector('.sr-gauge');if(g){var labs=[].slice.call(g.querySelectorAll('[data-for]')),secs=labs.map(function(l){return d.getElementById(l.getAttribute('data-for'))}),raf=0;
function upd(){raf=0;var h=d.documentElement.scrollHeight-W.innerHeight,p=h>0?Math.min(1,Math.max(0,W.scrollY/h)):0;g.style.setProperty('--g',p.toFixed(4));var cur=-1;secs.forEach(function(s,k){if(s&&s.getBoundingClientRect().top<W.innerHeight*.45)cur=k});labs.forEach(function(l,k){l.classList.toggle('on',k===cur)})}
W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});W.addEventListener('resize',upd);upd()}
if(!reduce&&W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches){[].slice.call(d.querySelectorAll('[data-mag] .btn,.btn[data-mag]')).forEach(function(b){var r=0,tx=0,ty=0;function set(){r=0;b.style.transform='translate('+tx+'px,'+ty+'px)'}b.addEventListener('mousemove',function(e){var q=b.getBoundingClientRect();tx=(e.clientX-q.left-q.width/2)*.22;ty=(e.clientY-q.top-q.height/2)*.32;if(!r)r=requestAnimationFrame(set)});b.addEventListener('mouseleave',function(){tx=0;ty=0;if(!r)r=requestAnimationFrame(set)})})}
})();`;

type Lang = "nl" | "en" | "de" | "fr";
const WORDS: Record<Lang, { what: string; dur: string; rec: string; fee: string; ask: string }> = {
  nl: { what: "Wat het is", dur: "Duur", rec: "Herstel", fee: "Tarief", ask: "Op aanvraag" },
  en: { what: "What it is", dur: "Duration", rec: "Recovery", fee: "Fee", ask: "On request" },
  de: { what: "Was es ist", dur: "Dauer", rec: "Erholung", fee: "Tarif", ask: "Auf Anfrage" },
  fr: { what: "De quoi s'agit-il", dur: "Durée", rec: "Récupération", fee: "Tarif", ask: "Sur demande" },
};
const words = (c: Ctx) => WORDS[c.spec.meta.lang as Lang] ?? WORDS.nl;

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const two = (n: number) => String(n + 1).padStart(2, "0");

/** A treatment description may end in "Herstel: …" (or Recovery/Downtime): that part is shown apart. */
const RECOVERY = /\s*(?:Herstel(?:tijd)?|Recovery|Downtime|Erholung|Récupération)\s*:\s*/i;
function treatment(desc: string) {
  const [what, rec] = desc.split(RECOVERY);
  return { what: what.trim(), rec: rec?.trim() || null };
}

/**
 * The headline as letters that close in from wide spacing towards the middle of their line.
 * Screen readers get the sentence once, as text.
 */
function Tracked({ text, lines: parts }: { text: string; lines: number }) {
  const ws: { w: string; em: boolean }[] = [];
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => ws.push({ w, em: n % 2 === 1 })),
  );
  const total = ws.reduce((a, x) => a + x.w.length + 1, 0);
  const rows: (typeof ws)[] = [[]];
  let at = 0;
  for (const x of ws) {
    const row = rows[rows.length - 1];
    if (row.length && rows.length < parts && at + x.w.length / 2 > (total / parts) * rows.length) rows.push([x]);
    else row.push(x);
    at += x.w.length + 1;
  }
  return (
    <>
      <span className="sr-sr">{text.replace(/\*/g, "")}</span>
      <span aria-hidden="true">
        {rows.map((row, r) => {
          const len = row.reduce((a, x) => a + x.w.length + 1, -1);
          let k = 0;
          return (
            <span className="sr-ln" key={r}>
              {row.map((x, n) => {
                const out = (
                  <span className={`sr-w${x.em ? " is-em" : ""}`}>
                    {[...x.w].map((ch, m) => {
                      const pos = k + m;
                      return (
                        <span key={m} className="sr-ch" style={css({ "--d": ((pos - len / 2) / Math.max(1, len)).toFixed(3), "--i": r, "--a": Math.abs(Math.round(pos - len / 2)) })}>
                          {ch}
                        </span>
                      );
                    })}
                  </span>
                );
                k += x.w.length + 1;
                return (
                  <Fragment key={n}>
                    {n ? " " : null}
                    {out}
                  </Fragment>
                );
              })}
            </span>
          );
        })}
      </span>
    </>
  );
}

const Arrow = () => <i aria-hidden="true" />;

const Kick = ({ children, center }: { children: ReactNode; center?: boolean }) => (
  <p className={`sr-kick${center ? " is-c" : ""}`} data-rv>
    {children}
  </p>
);

function Head({ kicker, title, intro, id, left }: { kicker?: string; title: string; intro?: string; id?: string; left?: boolean }) {
  return (
    <header className={`sr-head${left ? " is-l" : ""}`}>
      {kicker ? <Kick center={!left}>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

const Cal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  // Two links either side of the name would crowd the call to action: two left, one right.
  const left = c.nav.slice(0, 2);
  const right = c.nav.slice(2, 3);
  return (
    <>
      <header className="sr-hdr hdr">
        <div className="sr-wrap sr-bar">
          <nav aria-label={c.t.menu} className="sr-nav" data-nav>
            {left.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <button type="button" className="sr-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <i aria-hidden="true" />
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
          </button>
          <a href="#top" className={`sr-logo${c.name.length > 18 ? " is-long" : ""}`} aria-label={c.name}>
            <b>{c.name}</b>
            {b.city ? <small>{b.city}</small> : null}
          </a>
          <nav aria-label={c.t.menu} className="sr-nav is-r" data-mag>
            {right.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
            <a href={cta.href} className="btn sr-fill">
              {cta.label}
            </a>
          </nav>
          <a href={cta.href} className="sr-mob-cta" aria-label={cta.label}>
            <Cal />
          </a>
        </div>
      </header>
      <div id="site-menu" className="sr-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{ROMAN[k]}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="sr-menu-foot">
          {b.address || b.city ? <span>{b.address ?? b.city}</span> : null}
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
          <a href={cta.href} className="btn sr-fill">
            {cta.label} <Arrow />
          </a>
        </div>
      </div>
      {c.nav.length > 1 ? (
        <div className="sr-gauge" aria-hidden="true">
          <div className="sr-gauge-l">
            {c.nav.map((n) => (
              <span key={n.id} data-for={n.id}>
                {n.label}
              </span>
            ))}
          </div>
          <div className="sr-gauge-s">
            {Array.from({ length: 21 }, (_, k) => (
              <i key={k} />
            ))}
            <b />
          </div>
        </div>
      ) : null}
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 48 ? "is-s" : plain.length > 26 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const index = offerWords(c, 5);
  return (
    <section className="sr-hero">
      <div className="sr-wrap">
        <div className="sr-hero-top">
          {hero.eyebrow ? <p className="sr-kick is-c">{hero.eyebrow}</p> : null}
          <h1 className={size}>
            <Tracked text={hero.headline} lines={plain.length > 44 ? 3 : 2} />
          </h1>
        </div>
        <div className="sr-hero-row">
          <div className="sr-hero-copy">
            <NowBadge c={c} className="sr-now" />
            <p className="sr-lede">{hero.subheadline}</p>
            <div className="sr-cta-row" data-mag>
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
          <div className="sr-pill-wrap">
            <span className="sr-pill-line" aria-hidden="true" />
            {p ? (
              <figure className="sr-pill" data-px>
                <Pic p={p} eager sizes="(min-width: 980px) 30vw, 80vw" />
              </figure>
            ) : (
              <div className="sr-aura" aria-hidden="true">
                <span>{c.name.charAt(0)}</span>
              </div>
            )}
            {c.spec.business.city ? (
              <span className="sr-vert" aria-hidden="true">
                {c.spec.business.city}
              </span>
            ) : null}
          </div>
          {facts.length > 0 ? (
            <dl className="sr-facts">
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
        {index.length >= 3 ? (
          <p className="sr-index" aria-hidden="true">
            {index.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="sr-foot">
      <div className="sr-wrap">
        <div className="sr-foot-cta">
          <Kick center>{c.t.kick.booking}</Kick>
          <p data-rv>{em(c.spec.hero.headline)}</p>
          <div data-rv data-mag>
            <Btn c={c} href={cta.href}>
              {cta.label} <Arrow />
            </Btn>
          </div>
        </div>
        <p className="sr-foot-name" aria-hidden="true" data-rv style={css({ "--n": Math.max(10, c.name.length) })}>
          <span>{c.name}</span>
        </p>
        <div className="sr-foot-grid">
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
        <Legal c={c} className="sr-legal" />
      </div>
    </footer>
  );
}

/** Photographs in three columns that drift at their own speed while the page scrolls. */
function Drift({ pics }: { pics: Photo[] }) {
  const cols: Photo[][] = [[], [], []];
  pics.forEach((p, n) => cols[n % 3].push(p));
  const shape = (col: number, n: number) => ((col + n) % 3 === 0 ? "is-pill" : (col + n) % 3 === 2 ? "is-wide" : "");
  const speed = [-60, 50, -110];
  return (
    <div className="sr-cols3">
      {cols
        .filter((col) => col.length)
        .map((col, k) => (
          <div key={k} className={`sr-col${k === 2 ? " is-3" : ""}`} data-px style={css({ "--k": speed[k] })}>
            {col.map((p, n) => (
              <figure key={n} className={shape(k, n) || undefined} data-rv style={i(n + k)}>
                <Pic p={p} sizes="(min-width: 900px) 30vw, 50vw" />
                <figcaption>{p.alt}</figcaption>
              </figure>
            ))}
          </div>
        ))}
    </div>
  );
}

function Visit({ c, kicker, title, body, showHours }: { c: Ctx; kicker: string; title: string; body?: string; showHours: boolean }) {
  const b = c.spec.business;
  return (
    <div className="sr-wrap sr-visit">
      <div className="sr-visit-copy">
        <Head kicker={kicker} title={title} left />
        {body ? <p data-rv>{body}</p> : null}
        {showHours ? <Reach c={c} /> : null}
      </div>
      {showHours ? (
        <div className="sr-card" data-rv>
          <div className="sr-card-top">
            <h3>{c.t.hours}</h3>
            <NowBadge c={c} className="sr-now" />
          </div>
          {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
        </div>
      ) : (
        <div className="sr-card is-reach" data-rv>
          <div className="sr-card-top">
            <h3>{c.t.contact}</h3>
          </div>
          {b.address || b.city ? <p>{b.address ?? b.city}</p> : null}
          {b.phone ? (
            <a className="sr-link" href={tel(b.phone)}>
              {b.phone}
            </a>
          ) : null}
          {b.email ? (
            <a className="sr-link" href={`mailto:${b.email}`}>
              {b.email}
            </a>
          ) : null}
          <a className="btn sr-fill" href={c.spec.hero.primaryCta.href}>
            {c.spec.hero.primaryCta.label} <Arrow />
          </a>
        </div>
      )}
    </div>
  );
}

export const serene: Family = {
  key: "serene",
  root: "d-serene",
  fonts: ["Italiana", "Jost"],
  themeColor: "#ebe6de",
  accent: "#7d6442",
  onAccent: "#ffffff",
  css: CSS,
  extra: EXTRA,
  js: JS + TODAY_JS,
  cls: { wrap: "sr-wrap", eyebrow: "sr-kick", btn: "sr-fill", btnAlt: "sr-ghost", btnText: "sr-link" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="sr-sec" id={s.id}>
          <div className={`sr-wrap sr-about${p ? "" : " is-solo"}`}>
            <div className="sr-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} left />
              <p className="sr-lead" data-rv>
                {first}
              </p>
              {rest.length > 0 && (
                <div className={`sr-cols${rest.length > 1 ? " is-2" : ""}`} data-rv>
                  {rest.map((x, n) => (
                    <p key={n}>{x}</p>
                  ))}
                </div>
              )}
              {s.highlights.length > 0 && (
                <ul className="sr-highs" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
            {p ? (
              <div className="sr-frame" data-rv>
                <figure data-px>
                  <Pic p={p} sizes="(min-width: 960px) 44vw, 100vw" />
                  {c.spec.business.city ? <figcaption>{c.spec.business.city}</figcaption> : null}
                </figure>
              </div>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => {
      const w = words(c);
      return (
        <section className="sr-sec is-porc" id={s.id}>
          <div className="sr-wrap sr-treat">
            <div>
              <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} left />
              <div className="sr-tabs" role="tablist" aria-label={s.title.replace(/\*/g, "")} data-rv>
                {s.items.map((it, n) => (
                  <button key={n} type="button" role="tab" id={`${s.id}-t${n}`} aria-controls={`${s.id}-p${n}`} aria-selected={n === 0} tabIndex={n === 0 ? 0 : -1} className="sr-tab">
                    <small>{two(n)}</small>
                    <b>{it.title}</b>
                    {it.duration ? <span>{it.duration}</span> : <span />}
                  </button>
                ))}
              </div>
            </div>
            <div className="sr-panels">
              {s.items.map((it, n) => {
                const p = c.photo(`art:svc${n}`);
                const { what, rec } = treatment(it.description);
                return (
                  <article key={n} id={`${s.id}-p${n}`} role="tabpanel" aria-labelledby={`${s.id}-t${n}`} hidden={n > 0} className={`sr-panel${p ? " has-pic" : ""}`} data-rv>
                    {p ? (
                      <figure>
                        <Pic p={p} sizes="(min-width: 980px) 24vw, 100vw" />
                      </figure>
                    ) : null}
                    <div className="sr-panel-in" data-n={ROMAN[n]}>
                      <span className="sr-panel-n">{two(n)}</span>
                      <h3>{it.title}</h3>
                      <div className="sr-what">
                        <small>{w.what}</small>
                        <p>{what}</p>
                      </div>
                      {it.duration || rec || it.price ? (
                        <dl className="sr-spec">
                          {it.duration ? (
                            <div>
                              <dt>{w.dur}</dt>
                              <dd>{it.duration}</dd>
                            </div>
                          ) : null}
                          {rec ? (
                            <div>
                              <dt>{w.rec}</dt>
                              <dd>{rec}</dd>
                            </div>
                          ) : null}
                          {it.price ? (
                            <div>
                              <dt>{w.fee}</dt>
                              <dd>{it.price}</dd>
                            </div>
                          ) : null}
                        </dl>
                      ) : null}
                      <a className="sr-link" href={c.spec.hero.primaryCta.href}>
                        {c.spec.hero.primaryCta.label}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="sr-sec is-porc" id={s.id}>
          <div className="sr-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            <div className="sr-carte">
              {cats.map((cat, n) => (
                <div key={n}>
                  <h3 className="sr-cat" data-rv>
                    {cat.name}
                  </h3>
                  <ul className="sr-dishes">
                    {cat.items.map((d, m) => (
                      <li key={m} className="sr-dish" data-rv style={i(m % 4)}>
                        <b>{d.name}</b>
                        {d.price ? <span>{d.price}</span> : <span />}
                        {d.description ? <p>{d.description}</p> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {s.note ? (
              <p className="z-note" data-rv style={{ textAlign: "center" }}>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="sr-sec is-night" id={s.id}>
        <div className="sr-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="sr-feats">
            {s.items.map((it, n) => (
              <li key={n} className="sr-feat" data-rv style={i(n % 4)}>
                <i>
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
    process: (s, c) => (
      <section className="sr-sec" id={s.id}>
        <div className="sr-wrap sr-steps">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} left />
          <ol>
            {s.steps.map((st, n) => (
              <li key={n} className="sr-step" data-rv style={i(n % 4)}>
                <b aria-hidden="true">{ROMAN[n]}</b>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="sr-sec is-stone2" id={s.id} style={{ overflow: "hidden" }}>
          <div className="sr-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <Drift pics={pics} />
          </div>
        </section>
      );
    },
    team: (s, c) => (
      <section className="sr-sec" id={s.id}>
        <div className="sr-wrap">
          <Head kicker={c.t.kick.team} title={s.title} intro={s.intro} />
          <ul className="sr-team">
            {s.members.map((m, n) => {
              const p = c.photo(m.image);
              return (
                <li key={n} className="sr-member" data-rv style={i(n % 3)}>
                  {p ? (
                    <figure>
                      <div>
                        <Pic p={p} sizes="(min-width: 900px) 24vw, 70vw" />
                      </div>
                    </figure>
                  ) : (
                    <span className="sr-mono" aria-hidden="true">
                      {ROMAN[n]}
                    </span>
                  )}
                  <p className="sr-role">{m.role}</p>
                  <h3>{m.name}</h3>
                  {m.bio ? <p>{m.bio}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    beforeafter: (s, c) => {
      const pairs = s.pairs.map((p) => ({ before: c.photo(p.before), after: c.photo(p.after), caption: p.caption })).filter((p) => p.before && p.after);
      // Only the clinic's own photographs can show a result: without them the section stays away.
      if (!pairs.length) return null;
      return (
        <section className="sr-sec is-porc" id={s.id}>
          <div className="sr-wrap">
            <Head kicker={c.t.kick.beforeafter} title={s.title} intro={s.intro} />
            <div className="sr-ba">
              {pairs.map((p, n) => (
                <figure key={n} data-rv style={i(n % 2)}>
                  <div className="z-ba" data-ba style={css({ "--pos": "50%" })}>
                    <Pic p={p.after!} sizes="(min-width: 900px) 45vw, 100vw" />
                    <Pic p={p.before!} sizes="(min-width: 900px) 45vw, 100vw" className="z-ba-before" />
                    <span className="sr-ba-tag is-b" aria-hidden="true">
                      {c.t.before}
                    </span>
                    <span className="sr-ba-tag is-a" aria-hidden="true">
                      {c.t.after}
                    </span>
                    <span className="sr-ba-knob" aria-hidden="true" />
                    <input type="range" min={0} max={100} defaultValue={50} aria-label={c.t.slider} />
                  </div>
                  {p.caption ? <figcaption>{p.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="sr-sec is-stone2" id={s.id}>
        <Visit c={c} kicker={c.t.kick.hours} title={s.title} body={s.note || undefined} showHours />
      </section>
    ),
    contact: (s, c) => {
      const elsewhere = c.spec.sections.some((x) => x.type === "hours" || x.type === "booking");
      if (!s.showForm)
        return (
          <section className="sr-sec is-porc" id={s.id}>
            <Visit c={c} kicker={c.t.kick.contact} title={s.title} body={s.body || undefined} showHours={!elsewhere} />
          </section>
        );
      return (
        <section className="sr-sec is-porc" id={s.id}>
          <div className="sr-wrap sr-book">
            <div className="sr-book-copy">
              <Head kicker={c.t.kick.contact} title={s.title} left />
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Reach c={c} />
              {!elsewhere ? <Hours c={c} /> : null}
            </div>
            <div className="sr-form" data-mono={c.name.charAt(0)} data-rv>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          </div>
        </section>
      );
    },
    booking: (s, c) => (
      <section className="sr-sec" id={s.id}>
        <div className="sr-wrap sr-book">
          <div className="sr-book-copy">
            <Head kicker={c.t.kick.booking} title={s.title} left />
            {s.body ? <p data-rv>{s.body}</p> : null}
            {c.spec.business.openingHours?.length ? (
              <div className="sr-card" data-rv>
                <div className="sr-card-top">
                  <h3>{c.t.hours}</h3>
                  <NowBadge c={c} className="sr-now" />
                </div>
                <Hours c={c} />
              </div>
            ) : null}
            <Reach c={c} />
          </div>
          <div className="sr-form" data-mono={c.name.charAt(0)} data-rv>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </div>
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="sr-sec is-stone2" id={s.id}>
        <div className="sr-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} />
          <ul className="sr-orders">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} className="sr-order" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <i>
                    <Icon name={ch.icon} />
                  </i>
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
