import type { ReactNode } from "react";
import type { SiteSection } from "@/lib/site-spec";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo, type SectionOf } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Nimbus: an original template (no portfolio demo). A bright, product-led page in the manner of
 * a modern software company: cool daylight white, deep ink, one electric blue with a sky-to-
 * sunrise gradient of light, a futuristic geometric display face. The headline types itself;
 * below it a product window assembles out of the business's own content (its sections, its
 * offer, real counts) and flattens as you scroll. Features are told as a story at night: the
 * list scrolls while one screen beside it changes state. Services sit in a bento grid with a
 * light that follows the pointer, questions are answered in a chat that types, prices are
 * plain cards with a lit featured plan. Made for software, IT and online services; works for
 * any business that wants a clean, conversion-minded page.
 */

const CSS = `
.d-nimbus{--bg:#f4f6fb;--w:#ffffff;--ink:#0b1222;--ink2:#263049;--dim:#566079;--mute:#8790a6;--line:rgba(11,18,34,.08);--line2:rgba(11,18,34,.14);--blue:#2e5bff;--blue2:#1f45e0;--sky:#22b8ff;--sun:#ffb27d;--night:#070b18;--night2:#0e1529;--nline:rgba(220,230,255,.1);--grad:linear-gradient(100deg,var(--blue) 0%,var(--sky) 52%,var(--sun) 100%);--pad:clamp(18px,4vw,64px);--ease:cubic-bezier(.22,1,.36,1);--spring:cubic-bezier(.34,1.45,.64,1);--sora:"Sora",system-ui,sans-serif;--z-bg2:var(--w);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line2);--z-accent:var(--blue);--z-on-accent:#fff;--z-display:var(--sora);--z-display-weight:600;--z-radius:22px;--z-field-radius:14px;--z-ico-radius:14px;--z-sec:clamp(84px,10vw,150px);--z-h3:clamp(19px,1.5vw,23px);--z-statement:clamp(30px,4.2vw,64px);background:var(--bg);color:var(--ink);font-family:"Inter Tight",system-ui,sans-serif;font-size:clamp(15.5px,1.02vw,17.5px);line-height:1.6}
.d-nimbus ::selection{background:rgba(46,91,255,.18)}
.d-nimbus h1,.d-nimbus h2,.d-nimbus h3{font-family:var(--sora);font-weight:600;letter-spacing:-.045em;line-height:1.04}
.d-nimbus h2{font-size:clamp(34px,4.6vw,68px)}
.d-nimbus h2.is-long{font-size:clamp(28px,3.3vw,48px);line-height:1.08}
.d-nimbus h3{font-size:var(--z-h3);letter-spacing:-.03em;line-height:1.2}
.d-nimbus h2 em{font-style:normal;color:transparent;background:var(--grad);-webkit-background-clip:text;background-clip:text}
.demo-js .d-nimbus h2[data-rv]{transform:translateY(18px);letter-spacing:-.01em;transition:opacity .9s var(--ease),transform 1s var(--ease),letter-spacing 1.2s var(--ease)}
.demo-js .d-nimbus h2[data-rv].in{letter-spacing:-.045em}
.d-nimbus .nb-wrap{position:relative;width:min(100%,1280px);margin-inline:auto;padding-inline:var(--pad)}
.d-nimbus .nb-kick{display:inline-flex;align-items:center;gap:10px;justify-self:start;padding:6px 14px 6px 8px;border:1px solid var(--line2);border-radius:999px;background:rgba(255,255,255,.7);font-size:13px;font-weight:500;color:var(--ink2)}
.d-nimbus .nb-kick::before{content:"";width:18px;height:18px;border-radius:50%;background:var(--grad);box-shadow:inset 0 0 0 5px rgba(255,255,255,.75)}
.d-nimbus .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:52px;padding:0 10px 0 24px;border-radius:999px;font-size:15.5px;font-weight:600;letter-spacing:-.01em;transition:transform .5s var(--spring),box-shadow .5s var(--ease),background-color .3s,color .3s}
.d-nimbus .btn svg{width:16px;height:16px}
.d-nimbus .btn>i{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;transition:transform .5s var(--spring)}
.d-nimbus .btn:hover>i{transform:translateX(3px) rotate(-45deg)}
.d-nimbus .btn:active{transform:scale(.97)}
.d-nimbus .nb-fill{background:var(--ink);color:#fff;box-shadow:0 1px 0 rgba(255,255,255,.15) inset,0 10px 30px -12px rgba(11,18,34,.6)}
.d-nimbus .nb-fill>i{background:#fff;color:var(--ink)}
.d-nimbus .nb-fill:hover{transform:translateY(-2px);box-shadow:0 0 0 5px rgba(46,91,255,.14),0 18px 40px -14px rgba(46,91,255,.7)}
.d-nimbus .nb-ghost{padding:0 24px;background:var(--w);color:var(--ink);box-shadow:0 0 0 1px var(--line2) inset}
.d-nimbus .nb-ghost:hover{transform:translateY(-2px);box-shadow:0 0 0 1px rgba(46,91,255,.5) inset,0 12px 28px -16px rgba(46,91,255,.6)}
.d-nimbus .nb-text{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:600;color:var(--blue)}
.d-nimbus .nb-text svg{width:16px;height:16px;transition:transform .4s var(--spring)}
.d-nimbus .nb-text:hover svg{transform:translateX(4px)}
.d-nimbus .nb-hdr{position:fixed;left:0;right:0;top:12px;z-index:50;padding-inline:12px;pointer-events:none}
.d-nimbus .nb-pill{display:flex;align-items:center;gap:20px;width:min(100%,1180px);height:62px;margin-inline:auto;padding:0 8px 0 18px;border:1px solid rgba(255,255,255,.7);border-radius:999px;background:rgba(255,255,255,.66);box-shadow:0 1px 0 var(--line),0 10px 40px -20px rgba(11,18,34,.25);backdrop-filter:blur(18px) saturate(1.6);-webkit-backdrop-filter:blur(18px) saturate(1.6);pointer-events:auto;transition:width .6s var(--ease),height .5s var(--ease),box-shadow .5s}
.d-nimbus.is-scrolled .nb-pill{width:min(100%,1080px);height:56px;background:rgba(255,255,255,.82);box-shadow:0 1px 0 var(--line),0 18px 50px -24px rgba(11,18,34,.35)}
.d-nimbus .nb-logo{display:flex;align-items:center;gap:10px;min-width:0;min-height:44px;font-family:var(--sora);font-size:16.5px;font-weight:600;letter-spacing:-.03em}
.d-nimbus .nb-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-nimbus .nb-orb{position:relative;display:grid;flex:none;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--grad);color:#fff;font-family:var(--sora);font-size:13px;font-weight:700;font-style:normal;box-shadow:0 4px 14px -4px rgba(46,91,255,.7)}
.d-nimbus .nb-orb::after{content:"";position:absolute;inset:4px 8px auto 5px;height:8px;border-radius:50%;background:rgba(255,255,255,.45);filter:blur(2px)}
.d-nimbus .nb-links{display:none;gap:2px;margin-inline:auto;font-size:14.5px;font-weight:500;color:var(--ink2)}
.d-nimbus .nb-links a{display:inline-flex;align-items:center;min-height:40px;padding:0 14px;border-radius:999px;transition:background-color .3s,color .3s}
.d-nimbus .nb-links a:hover{background:rgba(11,18,34,.05);color:var(--ink)}
.d-nimbus .nb-hcta{display:none;min-height:46px;padding:0 6px 0 18px;font-size:14.5px}
.d-nimbus .nb-hcta>i{width:32px;height:32px}
.d-nimbus .nb-burger{position:relative;display:grid;place-items:center;width:46px;height:46px;margin-left:auto;border:0;border-radius:50%;background:var(--ink);color:#fff}
.d-nimbus .nb-burger i{position:relative;width:16px;height:8px}
.d-nimbus .nb-burger i::before,.d-nimbus .nb-burger i::after{content:"";position:absolute;left:0;width:16px;height:1.6px;border-radius:2px;background:currentColor;transition:transform .45s var(--spring)}
.d-nimbus .nb-burger i::before{top:0}.d-nimbus .nb-burger i::after{bottom:0}
.d-nimbus.menu-open .nb-burger i::before{transform:translateY(3.2px) rotate(45deg)}
.d-nimbus.menu-open .nb-burger i::after{transform:translateY(-3.2px) rotate(-45deg)}
.d-nimbus .nb-burger span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@media (min-width:1040px){.d-nimbus .nb-links,.d-nimbus .nb-hcta{display:inline-flex}.d-nimbus .nb-burger{display:none}.d-nimbus .nb-pill{padding-left:22px}}
.d-nimbus .nb-menu{position:fixed;inset:0;z-index:49;visibility:hidden;transition:visibility 0s .5s}
.d-nimbus .nb-menu.is-open{visibility:visible;transition:none}
.d-nimbus .nb-scrim{position:absolute;inset:0;background:rgba(11,18,34,.28);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:0;transition:opacity .4s}
.d-nimbus .nb-menu.is-open .nb-scrim{opacity:1}
.d-nimbus .nb-sheet{position:absolute;left:12px;right:12px;top:84px;display:grid;gap:18px;max-height:calc(100svh - 170px);padding:14px 14px 18px;overflow-y:auto;border-radius:28px;background:var(--w);box-shadow:0 30px 80px -30px rgba(11,18,34,.5);transform-origin:50% 0;opacity:0;transform:translateY(-14px) scale(.96);transition:opacity .35s,transform .55s var(--spring)}
.d-nimbus .nb-menu.is-open .nb-sheet{opacity:1;transform:none}
.d-nimbus .nb-sheet nav{display:grid}
.d-nimbus .nb-sheet nav a{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:58px;padding:0 12px;border-radius:16px;font-family:var(--sora);font-size:22px;font-weight:600;letter-spacing:-.035em;opacity:0;transform:translateY(10px);transition:opacity .4s,transform .5s var(--spring),background-color .3s}
.d-nimbus .nb-menu.is-open .nb-sheet nav a{opacity:1;transform:none;transition-delay:calc(.08s + var(--i,0) * 45ms)}
.d-nimbus .nb-sheet nav a:hover{background:var(--bg)}
.d-nimbus .nb-sheet nav svg{width:18px;height:18px;color:var(--blue)}
.d-nimbus .nb-sheet .btn{width:100%}
.d-nimbus .nb-sheet p{padding:0 12px;font-size:14px;color:var(--dim)}
.d-nimbus .nb-sheet p a{color:var(--ink);font-weight:600}
.d-nimbus .nb-hero{position:relative;padding:clamp(118px,11vw,150px) 0 clamp(70px,8vw,120px);overflow:hidden;isolation:isolate}
.d-nimbus .nb-aura{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden}
.d-nimbus .nb-aura i{position:absolute;border-radius:50%;filter:blur(60px);opacity:.55;animation:nb-drift 22s ease-in-out infinite alternate}
.d-nimbus .nb-aura i:nth-child(1){left:-12%;top:-18%;width:62vw;height:62vw;max-width:900px;max-height:900px;background:radial-gradient(circle,rgba(46,91,255,.5),transparent 65%)}
.d-nimbus .nb-aura i:nth-child(2){right:-14%;top:-10%;width:52vw;height:52vw;max-width:760px;max-height:760px;background:radial-gradient(circle,rgba(255,178,125,.6),transparent 65%);animation-duration:26s;animation-direction:alternate-reverse}
.d-nimbus .nb-aura i:nth-child(3){left:30%;top:30%;width:44vw;height:44vw;max-width:640px;max-height:640px;background:radial-gradient(circle,rgba(34,184,255,.45),transparent 65%);animation-duration:30s}
.d-nimbus .nb-aura::after{content:"";position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:64px 64px;-webkit-mask:radial-gradient(ellipse 70% 55% at 50% 30%,#000,transparent 75%);mask:radial-gradient(ellipse 70% 55% at 50% 30%,#000,transparent 75%)}
.d-nimbus .nb-hero-copy{display:grid;justify-items:center;gap:22px;text-align:center}
.d-nimbus .nb-pillnote{display:inline-flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;padding:6px 16px 6px 6px;border:1px solid rgba(255,255,255,.8);border-radius:999px;background:rgba(255,255,255,.7);box-shadow:0 8px 30px -18px rgba(11,18,34,.4);font-size:13.5px;font-weight:500;color:var(--ink2);animation:nb-rise .8s var(--ease) .1s both}
.d-nimbus .nb-pillnote>b{padding:4px 10px;border-radius:999px;background:var(--ink);color:#fff;font-size:12px;font-weight:600}
@media (max-width:520px){.d-nimbus .nb-pillnote>b{display:none}.d-nimbus .nb-pillnote{padding:7px 16px}}
.d-nimbus .nb-now{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:600;color:var(--dim)}
.d-nimbus .nb-now::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--mute)}
.d-nimbus .nb-now.is-open{color:#0f8a5a}
.d-nimbus .nb-now.is-open::before{background:#16b26e;box-shadow:0 0 0 3px rgba(22,178,110,.18)}
.d-nimbus .nb-now.is-closed::before{background:var(--sun)}
.d-nimbus .nb-hero h1{max-width:17ch;font-size:clamp(42px,6.6vw,100px);letter-spacing:-.055em;line-height:1}
.d-nimbus .nb-hero h1.is-m{max-width:19ch;font-size:clamp(38px,5.4vw,82px)}
.d-nimbus .nb-hero h1.is-s{max-width:22ch;font-size:clamp(34px,4.4vw,64px);line-height:1.04}
.d-nimbus .nb-hero h1 em{font-style:normal;color:var(--blue);background:linear-gradient(transparent 64%,rgba(34,184,255,.22) 64% 92%,transparent 92%) 0 0/0 100% no-repeat;animation:nb-mark .9s var(--ease) both;animation-delay:calc(.5s + var(--n,0) * 26ms)}
.d-nimbus .nb-wd{display:inline-block;white-space:nowrap}
.d-nimbus .nb-ch{opacity:0;animation:nb-on 0s linear both;animation-delay:calc(.35s + var(--c,0) * 26ms)}
.d-nimbus .nb-caret{display:inline-block;width:.07em;height:.82em;margin-left:.06em;border-radius:2px;background:var(--blue);vertical-align:-.04em;opacity:0;animation:nb-caret 1.8s steps(1) both;animation-delay:calc(.35s + var(--n,0) * 26ms)}
.d-nimbus .nb-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.d-nimbus .nb-lede{max-width:56ch;font-size:clamp(17px,1.35vw,20px);color:var(--dim);animation:nb-rise .9s var(--ease) both;animation-delay:calc(.5s + var(--n,0) * 26ms)}
.d-nimbus .nb-ctas{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;animation:nb-rise .9s var(--ease) both;animation-delay:calc(.62s + var(--n,0) * 26ms)}
.d-nimbus .nb-facts{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 22px;font-size:13.5px;color:var(--dim);animation:nb-rise .9s var(--ease) both;animation-delay:calc(.74s + var(--n,0) * 26ms)}
.d-nimbus .nb-facts span{display:inline-flex;align-items:center;gap:8px}
.d-nimbus .nb-facts svg{width:15px;height:15px;color:var(--blue)}
.d-nimbus .nb-facts a{color:var(--ink);font-weight:500}
.d-nimbus .nb-stage{position:relative;width:min(100%,1120px);margin:clamp(44px,4.4vw,64px) auto 0;perspective:1800px}
.d-nimbus .nb-app{position:relative;border:1px solid rgba(255,255,255,.9);border-radius:22px;background:rgba(255,255,255,.95);box-shadow:0 0 0 1px var(--line),0 50px 100px -40px rgba(23,42,110,.45),0 20px 40px -30px rgba(11,18,34,.3);overflow:hidden;transform:rotateX(calc((1 - var(--t,0)) * 16deg)) scale(calc(.93 + var(--t,0) * .07));transform-origin:50% 0;animation:nb-window 1.1s var(--ease) .5s both}
.d-nimbus .nb-bar{display:flex;align-items:center;gap:7px;height:44px;padding:0 16px;border-bottom:1px solid var(--line);background:rgba(244,246,251,.7)}
.d-nimbus .nb-bar>i{width:10px;height:10px;border-radius:50%;background:#e2e6ee}
.d-nimbus .nb-bar>i:nth-child(1){background:#ff8f7d}.d-nimbus .nb-bar>i:nth-child(2){background:#ffcf6e}.d-nimbus .nb-bar>i:nth-child(3){background:#7ed99a}
.d-nimbus .nb-url{display:flex;align-items:center;gap:8px;margin:0 auto;padding:4px 16px;max-width:52%;border-radius:999px;background:var(--w);box-shadow:0 0 0 1px var(--line) inset;font-size:12px;color:var(--mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-nimbus .nb-url::before{content:"";flex:none;width:8px;height:8px;border:1.5px solid var(--mute);border-radius:2px 2px 3px 3px}
.d-nimbus .nb-body{display:grid;grid-template-columns:1fr;min-height:clamp(300px,36vw,470px)}
@media (min-width:760px){.d-nimbus .nb-body{grid-template-columns:200px minmax(0,1fr)}}
.d-nimbus .nb-side{display:none;flex-direction:column;gap:6px;padding:18px 14px;border-right:1px solid var(--line);background:rgba(244,246,251,.55)}
@media (min-width:760px){.d-nimbus .nb-side{display:flex}}
.d-nimbus .nb-side>b{display:flex;align-items:center;gap:9px;margin-bottom:12px;font-family:var(--sora);font-size:13px;font-weight:600;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-nimbus .nb-side>b .nb-orb{width:22px;height:22px;font-size:10px}
.d-nimbus .nb-side li{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;font-size:12.5px;color:var(--dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;animation:nb-slide .6s var(--ease) both;animation-delay:calc(.9s + var(--i,0) * 70ms)}
.d-nimbus .nb-side li:first-child{background:var(--w);color:var(--ink);font-weight:600;box-shadow:0 1px 3px rgba(11,18,34,.08)}
.d-nimbus .nb-side svg{flex:none;width:14px;height:14px;color:var(--blue)}
.d-nimbus .nb-main{display:grid;align-content:start;gap:16px;padding:clamp(14px,2vw,24px);min-width:0}
.d-nimbus .nb-main-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
.d-nimbus .nb-main-top strong{font-family:var(--sora);font-size:clamp(13px,1.3vw,17px);font-weight:600;letter-spacing:-.03em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-nimbus .nb-faces{display:flex;flex:none}
.d-nimbus .nb-faces i{width:24px;height:24px;margin-left:-7px;border:2px solid #fff;border-radius:50%;background:var(--grad)}
.d-nimbus .nb-faces i:nth-child(2){background:linear-gradient(135deg,var(--sun),#ff8fa3)}.d-nimbus .nb-faces i:nth-child(3){background:linear-gradient(135deg,var(--sky),#7ce8c8)}
.d-nimbus .nb-kpis{display:grid;grid-template-columns:repeat(var(--k,3),minmax(0,1fr));gap:10px}
.d-nimbus .nb-kpis div{display:grid;gap:2px;padding:12px 14px;border-radius:14px;background:var(--w);box-shadow:0 0 0 1px var(--line);animation:nb-pop .7s var(--spring) both;animation-delay:calc(1.1s + var(--i,0) * 90ms);min-width:0}
.d-nimbus .nb-kpis small{font-size:11.5px;color:var(--mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-nimbus .nb-kpis b{font-family:var(--sora);font-size:clamp(20px,2.2vw,30px);font-weight:600;letter-spacing:-.04em;font-variant-numeric:tabular-nums}
.d-nimbus .nb-board{position:relative;display:grid;grid-template-columns:repeat(var(--cols,5),minmax(0,1fr));grid-auto-rows:clamp(34px,3.6vw,46px);gap:8px;padding:10px;border-radius:16px;background:repeating-linear-gradient(90deg,transparent 0 calc(20% - 1px),var(--line) calc(20% - 1px) 20%),rgba(244,246,251,.6);box-shadow:0 0 0 1px var(--line)}
.d-nimbus .nb-board>span{display:flex;align-items:center;gap:7px;min-width:0;padding:0 10px;border-radius:10px;font-size:11.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#13306e;background:rgba(46,91,255,.14);box-shadow:inset 3px 0 0 var(--blue);animation:nb-drop .7s var(--spring) both;animation-delay:calc(1.35s + var(--i,0) * 80ms)}
.d-nimbus .nb-board>span:nth-child(3n+2){color:#0b4a66;background:rgba(34,184,255,.16);box-shadow:inset 3px 0 0 var(--sky)}
.d-nimbus .nb-board>span:nth-child(3n){color:#7a3a10;background:rgba(255,178,125,.26);box-shadow:inset 3px 0 0 var(--sun)}
.d-nimbus .nb-board>span.is-sk::after{content:"";flex:1;height:6px;border-radius:4px;background:currentColor;opacity:.25}
.d-nimbus .nb-board>.is-now{position:absolute;top:6px;bottom:6px;left:calc(var(--x,40) * 1%);width:2px;padding:0;border-radius:2px;background:var(--blue);box-shadow:0 0 12px rgba(46,91,255,.8);animation:nb-fade .6s 2s both}
.d-nimbus .nb-board>.is-now::before{content:"";position:absolute;top:-4px;left:-3px;width:8px;height:8px;border-radius:50%;background:var(--blue)}
.d-nimbus .nb-toast{position:absolute;right:clamp(-10px,-1vw,10px);bottom:clamp(-30px,-2vw,-10px);z-index:3;display:flex;align-items:flex-start;gap:12px;width:min(320px,78%);padding:14px 16px;border:1px solid rgba(255,255,255,.9);border-radius:18px;background:rgba(255,255,255,.9);box-shadow:0 24px 60px -24px rgba(23,42,110,.5);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);animation:nb-toast .8s var(--spring) 2.3s both}
.d-nimbus .nb-toast small{display:block;font-size:11.5px;font-weight:600;color:var(--mute)}
.d-nimbus .nb-toast p{min-height:1.4em;font-size:14px;font-weight:500;line-height:1.4;color:var(--ink)}
.d-nimbus [data-type].is-typing::after{content:"";display:inline-block;width:2px;height:1em;margin-left:2px;background:var(--blue);vertical-align:-.15em;animation:nb-blink .8s steps(1) infinite}
.d-nimbus .nb-float{position:absolute;left:clamp(-40px,-3vw,-10px);bottom:clamp(-46px,-4vw,-20px);z-index:2;display:none;width:clamp(160px,17vw,230px);aspect-ratio:4/5;overflow:hidden;border:5px solid #fff;border-radius:22px;box-shadow:0 30px 60px -24px rgba(11,18,34,.5);transform:rotate(-4deg);animation:nb-float 1s var(--spring) 1.8s both}
.d-nimbus .nb-float img{width:100%;height:100%;object-fit:cover}
@media (min-width:960px){.d-nimbus .nb-float{display:block}}
.d-nimbus .nb-sec{position:relative;padding-block:var(--z-sec)}
.d-nimbus .nb-sec.is-white{background:var(--w)}
.d-nimbus .nb-head{display:grid;gap:18px;max-width:780px;margin-bottom:clamp(40px,5vw,72px)}
.d-nimbus .nb-head>p:last-child:not(.nb-kick){max-width:56ch;font-size:clamp(16px,1.2vw,19px);color:var(--dim)}
.d-nimbus .nb-head.is-center{justify-items:center;margin-inline:auto;text-align:center}
.d-nimbus .nb-head.is-center .nb-kick{justify-self:center}
.d-nimbus .nb-story{position:relative;padding-block:var(--z-sec);background:radial-gradient(ellipse 60% 40% at 80% 0,rgba(46,91,255,.35),transparent 70%),radial-gradient(ellipse 50% 40% at 0 100%,rgba(34,184,255,.18),transparent 70%),var(--night);color:#e9eeff;border-radius:clamp(28px,4vw,48px) clamp(28px,4vw,48px) 0 0}
.d-nimbus .nb-story+.nb-sec,.d-nimbus .nb-story+section{margin-top:0}
.d-nimbus .nb-story .nb-kick{border-color:var(--nline);background:rgba(255,255,255,.05);color:#c9d3f5}
.d-nimbus .nb-story .nb-kick::before{box-shadow:inset 0 0 0 5px rgba(7,11,24,.7)}
.d-nimbus .nb-story .nb-head>p:last-child:not(.nb-kick){color:#9aa6c8}
.d-nimbus .nb-story-grid{display:grid;gap:40px}
@media (min-width:960px){.d-nimbus .nb-story-grid{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(40px,6vw,96px)}}
.d-nimbus .nb-steps{display:grid;gap:18px}
.d-nimbus .nb-step{display:grid;gap:12px;align-content:center;padding:clamp(22px,2.4vw,30px);border:1px solid var(--nline);border-radius:22px;background:rgba(255,255,255,.03);transition:background-color .5s,border-color .5s,opacity .5s}
@media (min-width:960px){.d-nimbus .nb-step{min-height:54vh;padding:0 0 0 28px;border:0;border-left:1px solid var(--nline);border-radius:0;background:none;opacity:.35}.d-nimbus .nb-step.is-act{opacity:1;border-left-color:var(--sky)}.d-nimbus .nb-step:first-child{min-height:44vh;align-content:start;padding-top:8px}}
.d-nimbus .nb-step h3{font-size:clamp(22px,2vw,30px);color:#fff}
.d-nimbus .nb-step p{color:#a3aed0}
.d-nimbus .nb-step .nb-ico{background:rgba(255,255,255,.06);box-shadow:0 0 0 1px var(--nline) inset;color:#9fd8ff}
.d-nimbus .nb-step small{font-size:12.5px;font-weight:600;color:#6f7ca3;font-variant-numeric:tabular-nums}
.d-nimbus .nb-mini{margin-top:10px}
@media (min-width:960px){.d-nimbus .nb-mini{display:none}}
.d-nimbus .nb-screen-wrap{display:none}
@media (min-width:960px){.d-nimbus .nb-screen-wrap{position:sticky;top:calc(50vh - 220px);display:grid;gap:16px;align-self:start}}
.d-nimbus .nb-screen{position:relative;height:400px;border:1px solid var(--nline);border-radius:26px;background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.02));box-shadow:0 40px 100px -40px rgba(46,91,255,.55);overflow:hidden}
.d-nimbus .nb-screen::before{content:"";position:absolute;inset:-40% -20% auto;height:70%;background:radial-gradient(circle,rgba(34,184,255,.25),transparent 60%);transform:translateX(calc(var(--k,0) * 12% - 20%));transition:transform 1.2s var(--ease)}
.d-nimbus .nb-screen .nb-state{position:absolute;inset:0;padding:26px;opacity:0;transform:translateY(16px) scale(.98);transition:opacity .5s,transform .7s var(--ease);pointer-events:none}
.d-nimbus .nb-screen .nb-state.is-on{opacity:1;transform:none}
.d-nimbus .nb-dots{display:flex;align-items:center;gap:8px;justify-content:center;font-size:12.5px;font-weight:600;color:#6f7ca3;font-variant-numeric:tabular-nums}
.d-nimbus .nb-dots i{width:22px;height:4px;border-radius:4px;background:var(--nline);transition:background-color .4s,width .5s var(--ease)}
.d-nimbus .nb-dots i.is-on{width:40px;background:var(--sky)}
.d-nimbus .nb-state{display:grid;align-content:start;gap:14px;color:#dfe6ff;font-size:13px}
.d-nimbus .nb-mini .nb-state{padding:16px;border-radius:18px;background:rgba(255,255,255,.04);box-shadow:0 0 0 1px var(--nline) inset}
.d-nimbus .nb-st-top{display:flex;align-items:center;gap:10px;font-family:var(--sora);font-size:14px;font-weight:600;letter-spacing:-.02em}
.d-nimbus .nb-st-top svg{width:16px;height:16px;color:var(--sky)}
.d-nimbus .nb-st-top::after{content:"";margin-left:auto;width:44px;height:8px;border-radius:4px;background:var(--nline)}
.d-nimbus .nb-cal{display:grid;grid-template-columns:repeat(5,1fr);grid-auto-rows:42px;gap:6px}
.d-nimbus .nb-cal i{border-radius:10px;background:rgba(255,255,255,.04)}
.d-nimbus .nb-cal b{grid-column:var(--c) / span var(--s,1);grid-row:var(--r);display:flex;align-items:center;padding:0 10px;border-radius:10px;background:rgba(46,91,255,.35);box-shadow:inset 3px 0 0 #6f95ff;font-size:11.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:0;transform:scale(.85)}
.d-nimbus .nb-cal b:nth-of-type(2){background:rgba(34,184,255,.3);box-shadow:inset 3px 0 0 var(--sky)}
.d-nimbus .nb-cal b:nth-of-type(3){background:rgba(255,178,125,.3);box-shadow:inset 3px 0 0 var(--sun)}
.d-nimbus .nb-cal b.is-hl{background:linear-gradient(100deg,var(--blue),var(--sky));box-shadow:0 10px 30px -8px rgba(34,184,255,.7)}
.d-nimbus .nb-list{display:grid;gap:10px}
.d-nimbus .nb-list>div{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.05);box-shadow:0 0 0 1px var(--nline) inset;opacity:0;transform:translateY(12px)}
.d-nimbus .nb-list>div>span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-nimbus .nb-list>div>em{flex:none;width:34px;height:20px;border-radius:999px;background:rgba(255,255,255,.12);position:relative;transition:background-color .4s}
.d-nimbus .nb-list>div>em::after{content:"";position:absolute;left:3px;top:3px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .45s var(--spring)}
.d-nimbus .nb-list>div>i{display:grid;place-items:center;flex:none;width:22px;height:22px;border-radius:50%;box-shadow:0 0 0 1.5px rgba(255,255,255,.25) inset;transition:background-color .4s,box-shadow .4s}
.d-nimbus .nb-list>div>i svg{width:12px;height:12px;color:#fff;opacity:0;transition:opacity .3s}
.d-nimbus .nb-list .nb-bub{display:grid;place-items:center;flex:none;width:30px;height:30px;border-radius:10px;background:var(--grad);color:#fff}
.d-nimbus .nb-list .nb-bub svg{width:15px;height:15px}
.d-nimbus .nb-list small{display:block;margin-top:2px;width:70%;height:6px;border-radius:4px;background:var(--nline)}
.d-nimbus .nb-map{position:relative;height:300px;border-radius:16px;background:repeating-linear-gradient(0deg,transparent 0 39px,rgba(255,255,255,.05) 39px 40px),repeating-linear-gradient(90deg,transparent 0 39px,rgba(255,255,255,.05) 39px 40px),rgba(255,255,255,.02);overflow:hidden}
.d-nimbus .nb-mini .nb-map{height:200px}
.d-nimbus .nb-map svg{position:absolute;inset:0;width:100%;height:100%}
.d-nimbus .nb-map path{fill:none;stroke-width:3;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;vector-effect:non-scaling-stroke}
.d-nimbus .nb-map circle{fill:#fff;stroke:var(--sky);stroke-width:4;opacity:0;vector-effect:non-scaling-stroke}
.d-nimbus .nb-state.is-on .nb-cal b,.d-nimbus .nb-step.in .nb-cal b{animation:nb-pop .6s var(--spring) both;animation-delay:calc(.15s + var(--i,0) * 110ms)}
.d-nimbus .nb-state.is-on .nb-list>div,.d-nimbus .nb-step.in .nb-list>div{animation:nb-rise .6s var(--ease) both;animation-delay:calc(.1s + var(--i,0) * 120ms)}
.d-nimbus .nb-state.is-on .nb-list>div>em,.d-nimbus .nb-step.in .nb-list>div>em{background:var(--blue);transition-delay:calc(.5s + var(--i,0) * 220ms)}
.d-nimbus .nb-state.is-on .nb-list>div>em::after,.d-nimbus .nb-step.in .nb-list>div>em::after{transform:translateX(14px);transition-delay:calc(.5s + var(--i,0) * 220ms)}
.d-nimbus .nb-state.is-on .nb-list>div>i,.d-nimbus .nb-step.in .nb-list>div>i{background:var(--sky);box-shadow:none;transition-delay:calc(.5s + var(--i,0) * 220ms)}
.d-nimbus .nb-state.is-on .nb-list>div>i svg,.d-nimbus .nb-step.in .nb-list>div>i svg{opacity:1;transition-delay:calc(.6s + var(--i,0) * 220ms)}
.d-nimbus .nb-state.is-on .nb-map path,.d-nimbus .nb-step.in .nb-map path{stroke-dashoffset:0;transition:stroke-dashoffset 1.8s var(--ease) .2s}
.d-nimbus .nb-state.is-on .nb-map circle,.d-nimbus .nb-step.in .nb-map circle{animation:nb-fade .4s both;animation-delay:calc(.4s + var(--i,0) * 500ms)}
.d-nimbus .nb-ico{display:grid;place-items:center;width:46px;height:46px;border-radius:14px;background:linear-gradient(140deg,rgba(46,91,255,.12),rgba(34,184,255,.12));box-shadow:0 0 0 1px rgba(46,91,255,.14) inset;color:var(--blue)}
.d-nimbus .nb-ico svg{width:21px;height:21px}
.d-nimbus .nb-bento{display:grid;gap:14px;grid-template-columns:minmax(0,1fr)}
@media (min-width:700px){.d-nimbus .nb-bento{grid-template-columns:repeat(2,minmax(0,1fr))}.d-nimbus .nb-bento>li:last-child:nth-child(odd){grid-column:1/-1}}
@media (min-width:1080px){.d-nimbus .nb-bento{grid-template-columns:repeat(12,minmax(0,1fr))}.d-nimbus .nb-bento>li,.d-nimbus .nb-bento>li:last-child:nth-child(odd){grid-column:span var(--w,4)}}
.d-nimbus .nb-card{--cp:clamp(22px,2.2vw,30px);position:relative;display:grid;gap:14px;align-content:start;height:100%;padding:var(--cp);border-radius:24px;background:var(--w);box-shadow:0 0 0 1px var(--line),0 1px 2px rgba(11,18,34,.04);overflow:hidden;isolation:isolate;transition:transform .6s var(--spring),box-shadow .5s}
.d-nimbus .nb-spot::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(420px circle at var(--mx,50%) var(--my,0%),rgba(46,91,255,.1),transparent 60%);opacity:0;transition:opacity .4s}
.d-nimbus .nb-spot::after{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;padding:1px;background:radial-gradient(300px circle at var(--mx,50%) var(--my,0%),rgba(46,91,255,.7),transparent 60%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .4s}
.d-nimbus .nb-spot:hover::before,.d-nimbus .nb-spot:hover::after{opacity:1}
.d-nimbus .nb-card:hover{transform:translateY(-4px);box-shadow:0 0 0 1px var(--line),0 30px 60px -30px rgba(23,42,110,.35)}
.d-nimbus .nb-card p{color:var(--dim)}
.d-nimbus .nb-card-pic{margin:calc(var(--cp) * -1) calc(var(--cp) * -1) 6px;aspect-ratio:16/8;overflow:hidden;background:var(--bg)}
@media (min-width:1080px){.d-nimbus .nb-bento>li.is-wide .nb-card{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);column-gap:calc(var(--cp) * 2);align-content:center}.d-nimbus .nb-bento>li.is-wide .nb-card>*{grid-column:1}.d-nimbus .nb-bento>li.is-wide .nb-card-pic{grid-column:2;grid-row:1/span 6;margin:calc(var(--cp) * -1) calc(var(--cp) * -1) calc(var(--cp) * -1) 0;aspect-ratio:auto;min-height:280px}.d-nimbus .nb-bento>li.is-wide .nb-card>h3{margin-top:auto}}
.d-nimbus .nb-card-pic img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s var(--ease)}
.d-nimbus .nb-card:hover .nb-card-pic img{transform:scale(1.05)}
.d-nimbus .nb-card-n{position:absolute;right:22px;top:20px;font-family:var(--sora);font-size:13px;font-weight:600;color:var(--mute)}
.d-nimbus .nb-card-pic+.nb-card-n{top:14px;right:16px;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.85);color:var(--ink)}
.d-nimbus .nb-meta{display:flex;flex-wrap:wrap;gap:8px}
.d-nimbus .nb-meta span,.d-nimbus .nb-meta b{padding:4px 12px;border-radius:999px;background:var(--bg);font-size:13px;font-weight:600;color:var(--ink2)}
.d-nimbus .nb-meta b{background:rgba(46,91,255,.1);color:var(--blue2)}
.demo-js .d-nimbus .nb-bento>li[data-rv],.demo-js .d-nimbus .nb-gal>figure[data-rv],.demo-js .d-nimbus .nb-plans>li[data-rv]{transform:translateY(30px) scale(.97);filter:blur(6px);transition:opacity .8s var(--ease),transform 1s var(--ease),filter .8s var(--ease);transition-delay:calc(var(--i,0) * 80ms)}
.demo-js .d-nimbus .nb-bento>li[data-rv].in,.demo-js .d-nimbus .nb-gal>figure[data-rv].in,.demo-js .d-nimbus .nb-plans>li[data-rv].in{transform:none;filter:none}
.d-nimbus .nb-about{display:grid;gap:clamp(40px,6vw,96px);align-items:center}
@media (min-width:960px){.d-nimbus .nb-about{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-nimbus .nb-about-copy{display:grid;gap:22px}
.d-nimbus .nb-about-copy>p{color:var(--dim)}
.d-nimbus .nb-about-copy>.nb-lead{font-family:var(--sora);font-size:clamp(19px,1.6vw,24px);font-weight:500;line-height:1.42;letter-spacing:-.025em;color:var(--ink)}
.d-nimbus .nb-about-vis{position:relative;padding:0 0 30px 30px}
.d-nimbus .nb-about-pic{position:relative;aspect-ratio:5/6;overflow:hidden;border-radius:28px;box-shadow:0 40px 80px -40px rgba(23,42,110,.45)}
.d-nimbus .nb-about-pic img{width:100%;height:112%;object-fit:cover;transform:translateY(calc(var(--p,0) * -5%))}
.d-nimbus .nb-chips{display:grid;gap:10px}
.d-nimbus .nb-about-vis .nb-chips{position:absolute;left:0;bottom:0;max-width:min(78%,330px)}
.d-nimbus .nb-chips li{display:flex;align-items:center;gap:12px;padding:12px 16px 12px 12px;border:1px solid rgba(255,255,255,.9);border-radius:16px;background:rgba(255,255,255,.88);box-shadow:0 18px 40px -22px rgba(23,42,110,.45);font-size:14.5px;font-weight:600;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transform:translateY(calc(var(--p,0) * var(--d,0px)))}
.d-nimbus .nb-chips li:nth-child(2){--d:-16px;margin-left:24px}.d-nimbus .nb-chips li:nth-child(3){--d:-30px;margin-left:8px}.d-nimbus .nb-chips li:nth-child(4){--d:-42px;margin-left:30px}
.d-nimbus .nb-chips i{display:grid;place-items:center;flex:none;width:26px;height:26px;border-radius:50%;background:var(--grad);color:#fff}
.d-nimbus .nb-chips svg{width:14px;height:14px}
.d-nimbus .nb-about.is-solo .nb-chips{padding:24px;border-radius:28px;background:linear-gradient(150deg,rgba(46,91,255,.12),rgba(255,178,125,.18))}
.d-nimbus .nb-flow{position:relative;display:grid;gap:14px;grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.d-nimbus .nb-flow{grid-template-columns:repeat(var(--n,4),minmax(0,1fr))}}
.d-nimbus .nb-flow::before{content:"";position:absolute;left:31px;top:30px;bottom:30px;width:2px;border-radius:2px;background:var(--grad);transform:scaleY(0);transform-origin:top;transition:transform 1.8s var(--ease) .2s}
.d-nimbus .nb-flow.in::before{transform:none}
@media (min-width:900px){.d-nimbus .nb-flow::before{left:30px;right:30px;top:31px;bottom:auto;width:auto;height:2px;transform:scaleX(0);transform-origin:left}.d-nimbus .nb-flow.in::before{transform:none}}
.d-nimbus .nb-flow li{position:relative;display:grid;gap:10px;align-content:start;padding:0 0 0 76px;min-height:64px}
@media (min-width:900px){.d-nimbus .nb-flow li{padding:84px 22px 0 0}}
.d-nimbus .nb-node{position:absolute;left:8px;top:8px;display:grid;place-items:center;width:48px;height:48px;border-radius:16px;background:var(--w);box-shadow:0 0 0 1px var(--line2),0 10px 24px -12px rgba(23,42,110,.4);font-family:var(--sora);font-size:15px;font-weight:600;transition:background-color .5s,color .5s,box-shadow .5s;transition-delay:calc(.4s + var(--i,0) * 350ms)}
.d-nimbus .nb-flow.in .nb-node{background:var(--ink);color:#fff;box-shadow:0 0 0 5px rgba(46,91,255,.12),0 10px 24px -10px rgba(46,91,255,.6)}
.d-nimbus .nb-flow p{color:var(--dim)}
.d-nimbus .nb-plans{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr));align-items:stretch}
.d-nimbus .nb-plan{position:relative;display:grid;grid-template-rows:auto auto auto 1fr auto;gap:18px;height:100%;padding:clamp(24px,2.6vw,36px);border-radius:28px;background:var(--w);box-shadow:0 0 0 1px var(--line),0 20px 50px -40px rgba(23,42,110,.4)}
.d-nimbus .nb-plan h3{display:flex;align-items:center;justify-content:space-between;gap:10px}
.d-nimbus .nb-plan h3 small{padding:5px 12px;border-radius:999px;background:var(--grad);color:#fff;font-family:"Inter Tight",sans-serif;font-size:12px;font-weight:600;letter-spacing:0}
.d-nimbus .nb-price{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px}
.d-nimbus .nb-price b{font-family:var(--sora);font-size:clamp(40px,4vw,56px);font-weight:600;letter-spacing:-.05em;line-height:1}
.d-nimbus .nb-price span{font-size:14px;color:var(--mute)}
.d-nimbus .nb-plan>p{color:var(--dim)}
.d-nimbus .nb-plan>.nb-price{color:var(--ink)}
.d-nimbus .nb-plan.is-featured>.nb-price{color:#fff}
.d-nimbus .nb-price b.is-req{font-size:clamp(28px,2.6vw,36px)}
.d-nimbus .nb-ticks{display:grid;gap:11px;align-content:start;padding-top:18px;border-top:1px solid var(--line)}
.d-nimbus .nb-ticks li{display:flex;gap:10px;font-size:15px}
.d-nimbus .nb-ticks svg{flex:none;width:18px;height:18px;margin-top:3px;color:var(--blue)}
.d-nimbus .nb-plan .btn{width:100%}
.d-nimbus .nb-plan.is-featured{color:#e9eeff;background:radial-gradient(ellipse 90% 60% at 100% 0,rgba(46,91,255,.55),transparent 70%),var(--night);box-shadow:0 0 0 1px rgba(46,91,255,.5),0 40px 80px -30px rgba(46,91,255,.6)}
.d-nimbus .nb-plan.is-featured>p,.d-nimbus .nb-plan.is-featured .nb-price span{color:#a3aed0}
.d-nimbus .nb-plan.is-featured .nb-ticks{border-color:var(--nline)}
.d-nimbus .nb-plan.is-featured .nb-ticks svg{color:var(--sky)}
.d-nimbus .nb-plan.is-featured .nb-fill{background:#fff;color:var(--ink)}
.d-nimbus .nb-plan.is-featured .nb-fill>i{background:var(--ink);color:#fff}
@media (min-width:1000px){.d-nimbus .nb-plan.is-featured{transform:translateY(-14px)}}
.d-nimbus .nb-note{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:30px;font-size:14px;color:var(--dim);text-align:center}
.d-nimbus .nb-note svg{flex:none;width:16px;height:16px;color:var(--blue)}
.d-nimbus .nb-gal{display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:clamp(150px,22vw,300px);grid-auto-flow:dense}
@media (min-width:900px){.d-nimbus .nb-gal{grid-template-columns:repeat(4,minmax(0,1fr))}.d-nimbus .nb-gal .is-big{grid-column:span 2;grid-row:span 2}.d-nimbus .nb-gal .is-wide{grid-column:span 2}}
.d-nimbus .nb-gal.is-few{grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}
.d-nimbus .nb-gal .is-big{grid-column:span 2}
.d-nimbus .nb-gal figure{position:relative;overflow:hidden;border-radius:22px;background:var(--w)}
.d-nimbus .nb-gal img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s var(--ease)}
.d-nimbus .nb-gal figure:hover img{transform:scale(1.05)}
.d-nimbus .nb-gal figcaption{position:absolute;left:12px;right:12px;bottom:12px;padding:10px 14px;border-radius:14px;background:rgba(255,255,255,.88);font-size:13px;font-weight:500;line-height:1.35;color:var(--ink);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);opacity:0;transform:translateY(10px);transition:opacity .4s,transform .6s var(--spring)}
.d-nimbus .nb-gal figure:hover figcaption{opacity:1;transform:none}
@media (hover:none){.d-nimbus .nb-gal figcaption{display:none}}
.d-nimbus .nb-show{padding:clamp(12px,1.6vw,22px)}
.d-nimbus .nb-show-in{position:relative;display:grid;align-items:end;min-height:min(86svh,820px);overflow:hidden;border-radius:clamp(26px,3.4vw,44px);background:var(--night)}
.d-nimbus .nb-show-media{position:absolute;inset:-6% 0}
.d-nimbus .nb-show-media img{width:100%;height:100%;object-fit:cover;transform:translateY(calc(var(--p,0) * -4%))}
.d-nimbus .nb-show-in::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,11,24,.55),transparent 55%)}
.d-nimbus .nb-glass{position:relative;z-index:1;display:grid;gap:16px;justify-items:start;width:min(100% - 24px,540px);margin:clamp(12px,3vw,40px);padding:clamp(22px,2.6vw,36px);border:1px solid rgba(255,255,255,.7);border-radius:26px;background:rgba(255,255,255,.8);box-shadow:0 30px 70px -30px rgba(7,11,24,.6);backdrop-filter:blur(18px) saturate(1.5);-webkit-backdrop-filter:blur(18px) saturate(1.5)}
.d-nimbus .nb-glass h2{font-size:clamp(30px,3.4vw,50px)}
.d-nimbus .nb-glass p{color:var(--dim)}
.d-nimbus .nb-show.is-plain .nb-show-in{min-height:0;padding:clamp(40px,6vw,90px) 0;background:radial-gradient(ellipse 60% 70% at 100% 0,rgba(46,91,255,.5),transparent 70%),radial-gradient(ellipse 50% 60% at 0 100%,rgba(255,178,125,.35),transparent 70%),var(--night)}
.d-nimbus .nb-show.is-plain .nb-show-in::after{display:none}
.d-nimbus .nb-chat{display:grid;gap:18px}
@media (min-width:960px){.d-nimbus .nb-chat{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(30px,4vw,64px);align-items:start}}
.d-nimbus .nb-qs{display:flex;gap:8px;overflow-x:auto;margin-inline:calc(var(--pad) * -1);padding:4px var(--pad) 10px;scrollbar-width:none}
.d-nimbus .nb-qs::-webkit-scrollbar{display:none}
@media (min-width:960px){.d-nimbus .nb-qs{display:grid;margin:0;padding:0;overflow:visible}}
.d-nimbus .nb-qs button{flex:none;display:flex;align-items:center;gap:12px;max-width:280px;min-height:48px;padding:10px 16px;border:0;border-radius:16px;background:var(--w);box-shadow:0 0 0 1px var(--line);font-size:14.5px;font-weight:500;line-height:1.35;text-align:left;color:var(--ink2);transition:box-shadow .3s,background-color .3s,color .3s}
@media (min-width:960px){.d-nimbus .nb-qs button{max-width:none;padding:14px 18px}}
.d-nimbus .nb-qs button::before{content:"";flex:none;width:8px;height:8px;border-radius:50%;background:var(--line2);transition:background-color .3s,box-shadow .3s}
.d-nimbus .nb-qs button:hover{box-shadow:0 0 0 1px rgba(46,91,255,.4)}
.d-nimbus .nb-qs button[aria-selected="true"]{background:var(--ink);color:#fff;box-shadow:0 14px 30px -16px rgba(11,18,34,.7)}
.d-nimbus .nb-qs button[aria-selected="true"]::before{background:var(--sky);box-shadow:0 0 0 3px rgba(34,184,255,.25)}
.d-nimbus .nb-win{border-radius:26px;background:var(--w);box-shadow:0 0 0 1px var(--line),0 40px 80px -50px rgba(23,42,110,.5);overflow:hidden}
.d-nimbus .nb-win-bar{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid var(--line);font-size:13.5px;font-weight:600}
.d-nimbus .nb-win-bar .nb-orb{width:26px;height:26px;font-size:11px}
.d-nimbus .nb-win-bar span:last-child{margin-left:auto;display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--mute)}
.d-nimbus .nb-win-bar span:last-child::before{content:"";width:7px;height:7px;border-radius:50%;background:#16b26e}
.d-nimbus .nb-thread{display:grid;align-content:start;gap:14px;min-height:300px;padding:clamp(18px,2.4vw,28px);background:linear-gradient(180deg,var(--bg),var(--w))}
.d-nimbus .nb-thread[hidden]{display:none}
.d-nimbus .nb-q{justify-self:end;max-width:82%;padding:12px 16px;border-radius:18px 18px 4px 18px;background:var(--ink);color:#fff;font-size:15px;line-height:1.45;animation:nb-rise .5s var(--ease) both}
.d-nimbus .nb-a{display:flex;gap:10px;align-items:flex-end;max-width:92%}
.d-nimbus .nb-a .nb-orb{width:28px;height:28px;font-size:11px}
.d-nimbus .nb-a p{padding:14px 16px;border-radius:18px 18px 18px 4px;background:var(--w);box-shadow:0 0 0 1px var(--line);font-size:15px;line-height:1.55;color:var(--ink2);animation:nb-rise .5s var(--ease) .25s both}
.d-nimbus .nb-typing{display:none;gap:4px;padding:14px 16px;border-radius:18px 18px 18px 4px;background:var(--w);box-shadow:0 0 0 1px var(--line)}
.d-nimbus .nb-typing i{width:7px;height:7px;border-radius:50%;background:var(--mute);animation:nb-bob 1s ease-in-out infinite;animation-delay:calc(var(--i,0) * 140ms)}
.d-nimbus .nb-a.is-wait .nb-typing{display:flex}
.d-nimbus .nb-a.is-wait p{display:none}
.d-nimbus .nb-visit{display:grid;gap:clamp(40px,5vw,80px);align-items:start}
@media (min-width:960px){.d-nimbus .nb-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-nimbus .nb-visit-copy{display:grid;gap:22px;align-content:start}
.d-nimbus .nb-visit-copy>p{max-width:52ch;color:var(--dim)}
.d-nimbus .nb-widget{padding:clamp(20px,2.4vw,30px);border-radius:26px;background:var(--w);box-shadow:0 0 0 1px var(--line),0 40px 80px -50px rgba(23,42,110,.5)}
.d-nimbus .nb-widget-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;font-family:var(--sora);font-size:17px;font-weight:600;letter-spacing:-.03em}
.d-nimbus .nb-widget-top .nb-now{padding:5px 12px;border-radius:999px;background:var(--bg);font-family:"Inter Tight",sans-serif;letter-spacing:0}
.d-nimbus .z-hours{border-top:0}
.d-nimbus .z-hours div{padding:12px 14px;margin-inline:-14px;border-bottom:0;border-radius:12px;font-size:15px}
.d-nimbus .z-hours div:nth-child(odd){background:rgba(244,246,251,.7)}
.d-nimbus .z-hours div.is-today{background:linear-gradient(100deg,rgba(46,91,255,.12),rgba(34,184,255,.12));font-weight:600;box-shadow:inset 3px 0 0 var(--blue)}
.d-nimbus .z-hours div.is-today dd{color:var(--blue2)}
.d-nimbus .nb-book{display:grid;gap:clamp(36px,5vw,80px);align-items:start}
@media (min-width:960px){.d-nimbus .nb-book{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}}
.d-nimbus .nb-book-copy{display:grid;gap:22px;align-content:start}
.d-nimbus .nb-book-copy>p{color:var(--dim)}
.d-nimbus .nb-book-copy .nb-widget{padding:18px 22px}
.d-nimbus .nb-form{border-radius:28px;background:var(--w);box-shadow:0 0 0 1px var(--line),0 50px 100px -50px rgba(23,42,110,.55);overflow:hidden}
.d-nimbus .nb-form .nb-bar{background:var(--bg)}
.d-nimbus .nb-form .nb-url{max-width:70%}
.d-nimbus .nb-form .z-form{padding:clamp(20px,3vw,40px)}
.d-nimbus .z-field label,.d-nimbus .z-chipset legend{font-size:13px;font-weight:600;letter-spacing:0;text-transform:none;color:var(--ink2)}
.d-nimbus .z-field input,.d-nimbus .z-field select,.d-nimbus .z-field textarea{border:1px solid transparent;background:var(--bg);color:var(--ink);transition:border-color .3s,box-shadow .3s,background-color .3s}
.d-nimbus .z-field select{background-image:linear-gradient(45deg,transparent 50%,var(--dim) 50%),linear-gradient(-45deg,transparent 50%,var(--dim) 50%);background-size:5px 5px;background-position:calc(100% - 20px) 52%,calc(100% - 15px) 52%;background-repeat:no-repeat}
.d-nimbus .z-field input:hover,.d-nimbus .z-field select:hover,.d-nimbus .z-field textarea:hover{border-color:var(--line2)}
.d-nimbus .z-field input:focus,.d-nimbus .z-field select:focus,.d-nimbus .z-field textarea:focus{border-color:var(--blue);background-color:#fff;box-shadow:0 0 0 4px rgba(46,91,255,.14);outline:none}
.d-nimbus .z-chips button{border-color:var(--line2);border-radius:12px;font-weight:600}
.d-nimbus .z-chips button[aria-pressed="true"]{background:var(--ink);border-color:var(--ink);color:#fff}
.d-nimbus .z-form .btn{padding:0 24px}
.d-nimbus .form-status{border:0;border-radius:14px;background:rgba(46,91,255,.1);color:var(--blue2);font-weight:500}
.d-nimbus .z-card,.d-nimbus .z-panel,.d-nimbus .z-channel{border:0;background:var(--w);box-shadow:0 0 0 1px var(--line)}
.d-nimbus .z-channel:hover{box-shadow:0 0 0 1px rgba(46,91,255,.4),0 20px 40px -24px rgba(46,91,255,.5)}
.d-nimbus .z-ico{border:0;background:linear-gradient(140deg,rgba(46,91,255,.12),rgba(34,184,255,.12));color:var(--blue)}
.d-nimbus .z-pack.is-featured{box-shadow:0 0 0 2px var(--blue)}
.d-nimbus .z-tag{display:inline-block;justify-self:start;padding:4px 12px;border-radius:999px;background:var(--grad);color:#fff;letter-spacing:0;text-transform:none;font-weight:600}
.d-nimbus .z-ticks li::before{width:8px;height:8px;top:.55em;border-radius:50%;background:var(--grad)}
.d-nimbus .z-acc{border-top:0;display:grid;gap:10px}
.d-nimbus .z-acc details{border:0;border-radius:18px;background:var(--w);box-shadow:0 0 0 1px var(--line);padding-inline:22px}
.d-nimbus .z-acc summary{font-family:var(--sora);font-weight:600;letter-spacing:-.02em;font-size:17px}
.d-nimbus .z-quotes blockquote{padding:26px;border:0;border-radius:24px;background:var(--w);box-shadow:0 0 0 1px var(--line)}
.d-nimbus .z-quotes blockquote>p{font-size:clamp(18px,1.5vw,22px);letter-spacing:-.02em}
.d-nimbus .z-quotes footer a{color:var(--blue)}
.d-nimbus .z-team li{padding:18px;border-radius:24px;background:var(--w);box-shadow:0 0 0 1px var(--line)}
.d-nimbus .z-team .z-pic{border-radius:16px}
.d-nimbus .z-team li .nb-kick{padding:0;border:0;background:none;font-size:13px;color:var(--blue)}
.d-nimbus .z-team li .nb-kick::before{display:none}
.d-nimbus .z-ba-sec .z-cards{max-width:920px}
.d-nimbus .z-rows,.d-nimbus .z-steps{border-top-color:var(--line2)}
.d-nimbus .z-head h2{letter-spacing:-.045em}
.d-nimbus .z-pic{border-radius:22px}
.d-nimbus .z-ba{border-radius:22px}
.d-nimbus .z-statement{overflow:hidden}
.d-nimbus .z-statement h2{max-width:24ch;font-size:var(--z-statement);line-height:1.12;letter-spacing:-.045em}
.d-nimbus .z-statement h2 em{font-style:normal;color:transparent;background:var(--grad);-webkit-background-clip:text;background-clip:text}
.demo-js .d-nimbus .z-statement h2[data-rv]{opacity:1;transform:none;letter-spacing:-.045em}
.d-nimbus .nb-dawn{display:block}
.demo-js .d-nimbus [data-rv] .nb-dawn{-webkit-mask:linear-gradient(115deg,#000 40%,transparent 60%) 100% 0/300% 100% no-repeat;mask:linear-gradient(115deg,#000 40%,transparent 60%) 100% 0/300% 100% no-repeat;transition:-webkit-mask-position 2.2s var(--ease),mask-position 2.2s var(--ease)}
.demo-js .d-nimbus [data-rv].in .nb-dawn{-webkit-mask-position:0 0;mask-position:0 0}
.d-nimbus .z-statement::before{content:"";position:absolute;left:50%;top:50%;width:min(900px,90vw);height:360px;border-radius:50%;background:radial-gradient(ellipse,rgba(34,184,255,.16),transparent 65%);transform:translate(-50%,-50%);pointer-events:none}
.d-nimbus .z-sec.z-cta{margin:0 clamp(12px,1.6vw,22px);border-radius:clamp(26px,3.4vw,44px);background:radial-gradient(ellipse 70% 80% at 50% 120%,rgba(46,91,255,.6),transparent 70%),radial-gradient(ellipse 40% 50% at 100% 0,rgba(255,178,125,.3),transparent 70%),var(--night);color:#fff;overflow:hidden}
.d-nimbus .z-cta h2{font-size:clamp(36px,5vw,76px)}
.d-nimbus .z-cta .z-center>p{color:#a3aed0}
.d-nimbus .z-cta .nb-fill{background:#fff;color:var(--ink)}
.d-nimbus .z-cta .nb-fill>i{background:var(--ink);color:#fff}
.d-nimbus .z-showcase.has-pic .z-show-in{color:#fff}
.d-nimbus .nb-foot{position:relative;padding:clamp(80px,9vw,130px) 0 0;background:var(--w);overflow:hidden}
.d-nimbus .nb-foot-top{display:grid;gap:30px;padding-bottom:clamp(40px,5vw,70px);border-bottom:1px solid var(--line)}
@media (min-width:900px){.d-nimbus .nb-foot-top{grid-template-columns:minmax(0,1fr) auto;align-items:end}}
.d-nimbus .nb-foot-top h2{max-width:18ch;font-size:clamp(30px,3.6vw,52px)}
.d-nimbus .nb-foot-grid{display:grid;gap:34px 40px;padding-top:clamp(36px,4vw,56px);grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}
.d-nimbus .nb-foot-grid h3{margin-bottom:12px;font-family:"Inter Tight",sans-serif;font-size:13px;font-weight:600;letter-spacing:0;color:var(--mute)}
.d-nimbus .nb-foot-grid a,.d-nimbus .nb-foot-grid span{display:flex;align-items:center;min-height:34px;font-size:15px;color:var(--ink2)}
.d-nimbus .nb-foot-grid a{transition:color .3s}
.d-nimbus .nb-foot-grid a:hover{color:var(--blue)}
.d-nimbus .nb-foot-grid p{color:var(--dim);font-size:15px}
.d-nimbus .nb-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:40px;padding:22px 0;border-top:1px solid var(--line);font-size:13px;color:var(--mute)}
.d-nimbus .nb-mark{margin:10px 0 0;padding-bottom:130px;font-family:var(--sora);font-size:min(18vw,calc(150vw / var(--n,8)),260px);font-weight:700;line-height:.9;letter-spacing:-.07em;white-space:nowrap;text-align:center;color:transparent;background:linear-gradient(180deg,rgba(46,91,255,.9),rgba(34,184,255,.5) 55%,rgba(255,178,125,0) 100%);-webkit-background-clip:text;background-clip:text}
.demo-js .d-nimbus .nb-mark[data-rv]{transform:translateY(40%);transition:opacity 1.2s var(--ease),transform 1.4s var(--ease)}
.demo-js .d-nimbus .nb-mark[data-rv].in{transform:none}
@keyframes nb-on{to{opacity:1}}
@keyframes nb-caret{0%{opacity:1}12%{opacity:0}24%{opacity:1}36%{opacity:0}48%{opacity:1}60%{opacity:0}72%{opacity:1}100%{opacity:0}}
@keyframes nb-mark{to{background-size:100% 100%}}
@keyframes nb-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes nb-window{from{opacity:0;translate:0 50px}to{opacity:1;translate:0 0}}
@keyframes nb-slide{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}
@keyframes nb-pop{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}
@keyframes nb-drop{from{opacity:0;transform:translateY(-18px) scale(.9)}to{opacity:1;transform:none}}
@keyframes nb-fade{from{opacity:0}to{opacity:1}}
@keyframes nb-toast{from{opacity:0;transform:translateY(24px) scale(.9)}to{opacity:1;transform:none}}
@keyframes nb-float{from{opacity:0;transform:translateY(40px) rotate(-10deg)}to{opacity:1;transform:rotate(-4deg)}}
@keyframes nb-drift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(6%,8%) scale(1.12)}}
@keyframes nb-blink{50%{opacity:0}}
@keyframes nb-bob{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-4px);opacity:1}}
@media (prefers-reduced-motion:reduce){.d-nimbus .nb-ch{opacity:1;animation:none}.d-nimbus .nb-caret{display:none}.d-nimbus .nb-app{transform:none}.d-nimbus .nb-aura i{animation:none}.d-nimbus .nb-hero h1 em{background-size:100% 100%}.demo-js .d-nimbus [data-rv] .nb-dawn{-webkit-mask:none;mask:none}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The product window flattens as the opening scrolls away; counters count the real number of
 * items; the toast and the chat answers type themselves; the feature story switches its screen
 * to the feature in view; cards light up where the pointer is.
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-nimbus');if(!root)return;var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches,fine=W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches,IO='IntersectionObserver' in W;
var stage=d.querySelector('.nb-stage'),raf=0;function tick(){raf=0;if(!stage)return;var t=Math.max(0,Math.min(1,W.scrollY/(W.innerHeight*.55)));stage.style.setProperty('--t',reduce?'1':t.toFixed(3))}
W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(tick)},{passive:true});tick();
function count(el){var n=+el.getAttribute('data-count')||0;if(reduce){el.textContent=n;return}var t0=0,dur=900;function f(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/dur);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)}el.textContent='0';requestAnimationFrame(f)}
q('[data-count]').forEach(function(el){var w=+(el.getAttribute('data-wait')||0);if(!IO){count(el);return}var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();setTimeout(function(){count(el)},w)}});io.observe(el)});
function type(el,done){if(el._busy)return;var full=el.getAttribute('data-full');if(full===null){full=el.textContent;el.setAttribute('data-full',full)}if(reduce){el.textContent=full;if(done)done();return}el._busy=1;el.textContent='';el.classList.add('is-typing');var k=0,step=Math.max(1,Math.round(full.length/90));(function go(){k=Math.min(full.length,k+step);el.textContent=full.slice(0,k);if(k<full.length)setTimeout(go,16);else{el.classList.remove('is-typing');el._busy=0;if(done)done()}})()}
q('.nb-toast [data-type]').forEach(function(el){setTimeout(function(){type(el)},reduce?0:2700)});
function ask(panel){if(!panel||panel._done)return;panel._done=1;var a=panel.querySelector('.nb-a'),p=panel.querySelector('.nb-a p');if(!a||!p)return;if(reduce)return;a.classList.add('is-wait');setTimeout(function(){a.classList.remove('is-wait');type(p)},750)}
q('.nb-chat').forEach(function(ch){var tabs=q('[role=tab]',ch);tabs.forEach(function(t){t.addEventListener('click',function(){setTimeout(function(){ask(d.getElementById(t.getAttribute('aria-controls')))},0)})});var first=ch.querySelector('.nb-thread:not([hidden])');if(!first)return;if(!IO){return}var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();first._done=0;ask(first)}},{threshold:.4});first._done=1;io.observe(ch)});
q('.nb-story').forEach(function(s){var steps=q('.nb-step',s),states=q('.nb-screen .nb-state',s),dots=q('.nb-dots i',s),scr=s.querySelector('.nb-screen'),out=s.querySelector('[data-at]');function set(k){steps.forEach(function(x,n){x.classList.toggle('is-act',n===k)});states.forEach(function(x,n){x.classList.toggle('is-on',n===k)});dots.forEach(function(x,n){x.classList.toggle('is-on',n===k)});if(scr)scr.style.setProperty('--k',k);if(out)out.textContent=String(k+1).padStart(2,'0')}
if(IO){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)set(steps.indexOf(e.target))})},{rootMargin:'-48% 0px -48% 0px'});steps.forEach(function(x){io.observe(x)})}});
if(fine&&!reduce)q('.nb-spot').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left).toFixed(0)+'px');c.style.setProperty('--my',(e.clientY-r.top).toFixed(0)+'px')})})})();`;

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 10.5 3.2 3L15 6.5" />
  </svg>
);

/** A link-button with the arrow in its own circle (the family's call to action). */
function Go({ c, href, children, variant = "fill" }: { c: Ctx; href: string; children: ReactNode; variant?: "fill" | "alt" }) {
  return (
    <Btn c={c} href={href} variant={variant}>
      {children}
      {variant === "fill" ? (
        <i aria-hidden="true">
          <Arrow />
        </i>
      ) : null}
    </Btn>
  );
}

const n2 = (n: number) => String(n + 1).padStart(2, "0");

function Head({ kicker, title, intro, id, center }: { kicker?: string; title: string; intro?: string; id?: string; center?: boolean }) {
  return (
    <header className={`nb-head${center ? " is-center" : ""}`}>
      {kicker ? (
        <p className="nb-kick" data-rv>
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

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="nb-hdr hdr">
        <div className="nb-pill">
          <a href="#top" className="nb-logo" aria-label={c.name}>
            <i className="nb-orb" aria-hidden="true">
              {c.name.charAt(0)}
            </i>
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="nb-links" data-nav>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn nb-fill nb-hcta">
            {cta.label}
            <i aria-hidden="true">
              <Arrow />
            </i>
          </a>
          <button type="button" className="nb-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="nb-menu" data-nav inert>
        <span className="nb-scrim" data-menu-close aria-hidden="true" />
        <div className="nb-sheet">
          <nav aria-label={c.t.menu}>
            {c.nav.map((n, k) => (
              <a key={n.id} href={`#${n.id}`} style={i(k)}>
                {n.label}
                <Arrow />
              </a>
            ))}
          </nav>
          <Go c={c} href={cta.href}>
            {cta.label}
          </Go>
          {b.phone || b.city ? (
            <p>
              {b.city}
              {b.phone ? (
                <>
                  {b.city ? " · " : ""}
                  <a href={tel(b.phone)}>{b.phone}</a>
                </>
              ) : null}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

/** The headline, character by character, so it can type itself (CSS only; the text stays whole for readers). */
function Typed({ text }: { text: string }) {
  let c = 0;
  const words: ReactNode[] = [];
  text.split(/\*([^*]+)\*/).forEach((chunk, n) => {
    const ws = chunk.split(/\s+/).filter(Boolean);
    const group = ws.map((w) => {
      const word = (
        <span className="nb-wd" key={`w${c}`}>
          {[...w].map((ch) => {
            const k = c++;
            return (
              <span className="nb-ch" key={k} style={css({ "--c": k })}>
                {ch}
              </span>
            );
          })}
        </span>
      );
      c++;
      return word;
    });
    const joined: ReactNode[] = [];
    group.forEach((g, k) => {
      if (k) joined.push(" ");
      joined.push(g);
    });
    if (!joined.length) return;
    if (words.length) words.push(" ");
    words.push(n % 2 ? <em key={`e${n}`}>{joined}</em> : <span key={`s${n}`}>{joined}</span>);
  });
  return <>{words}</>;
}

/** Real counts from the business's own content, for the product window, named like the navigation names them. */
function counts(c: Ctx): { label: string; n: number }[] {
  const name = (s: SiteSection) => {
    const t = s.title.replace(/\*/g, "");
    return t.length <= 18 ? t : c.t.kick[s.type];
  };
  const out: { label: string; n: number }[] = [];
  for (const s of c.spec.sections) {
    if (s.type === "services") out.push({ label: name(s), n: s.items.length });
    if (s.type === "menu") out.push({ label: name(s), n: s.categories.reduce((a, x) => a + x.items.length, 0) });
    if (s.type === "packages") out.push({ label: name(s), n: s.items.length });
    if (s.type === "process") out.push({ label: name(s), n: s.steps.length });
    if (s.type === "faq") out.push({ label: name(s), n: s.items.length });
  }
  const seen = new Set<string>();
  return out.filter((x) => x.n > 0 && x.label && !seen.has(x.label) && seen.add(x.label)).slice(0, 3);
}

const NAV_ICONS = ["calendar", "user", "chat", "chart", "check"] as const;
const SLOTS: [col: number, row: number, span: number][] = [
  [1, 1, 2],
  [3, 1, 1],
  [4, 2, 2],
  [2, 2, 2],
  [1, 3, 1],
  [3, 3, 2],
  [5, 1, 1],
  [2, 4, 3],
];

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 52 ? "is-s" : plain.length > 30 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const words = offerWords(c, 8);
  const kpis = counts(c);
  const toast = hero.note || words[0] || c.spec.business.tagline || c.name;
  const icons = [<Icon key="m" name="map" />, <Icon key="c" name="clock" />, <Icon key="p" name="phone" />];
  return (
    <section className="nb-hero" style={css({ "--n": plain.length })}>
      <div className="nb-aura" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="nb-wrap">
        <div className="nb-hero-copy">
          {hero.eyebrow ? (
            <p className="nb-pillnote">
              <b>{c.name.length <= 22 ? c.name : c.name.charAt(0)}</b>
              {hero.eyebrow}
              <NowBadge c={c} className="nb-now" />
            </p>
          ) : null}
          <h1 className={size}>
            <span className="nb-sr">{plain}</span>
            <span aria-hidden="true">
              <Typed text={hero.headline} />
              <span className="nb-caret" />
            </span>
          </h1>
          <p className="nb-lede">{hero.subheadline}</p>
          <div className="nb-ctas">
            <Go c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Go>
            {hero.secondaryCta ? (
              <Go c={c} href={hero.secondaryCta.href} variant="alt">
                {hero.secondaryCta.label}
              </Go>
            ) : null}
          </div>
          {facts.length ? (
            <p className="nb-facts">
              {facts.map((f, n) => (
                <span key={f.label}>
                  {icons[n] ?? null}
                  {f.value}
                </span>
              ))}
            </p>
          ) : null}
        </div>
        <div className="nb-stage">
          <div className="nb-app" aria-hidden="true">
            <div className="nb-bar">
              <i />
              <i />
              <i />
              <span className="nb-url">{c.name}</span>
            </div>
            <div className="nb-body">
              <aside className="nb-side">
                <b>
                  <i className="nb-orb">{c.name.charAt(0)}</i>
                  {c.name}
                </b>
                <ul>
                  {c.nav.slice(0, 5).map((n, k) => (
                    <li key={n.id} style={i(k)}>
                      <Icon name={NAV_ICONS[k % NAV_ICONS.length]} />
                      {n.label}
                    </li>
                  ))}
                </ul>
              </aside>
              <div className="nb-main">
                <div className="nb-main-top">
                  <strong>{hero.eyebrow || c.name}</strong>
                  <span className="nb-faces">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                {kpis.length ? (
                  <div className="nb-kpis" style={css({ "--k": kpis.length })}>
                    {kpis.map((k, n) => (
                      <div key={k.label} style={i(n)}>
                        <small>{k.label}</small>
                        <b data-count={k.n} data-wait={1100 + n * 90}>
                          {k.n}
                        </b>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="nb-board">
                  {SLOTS.map(([col, row, span], n) => {
                    const w = words[n];
                    return (
                      <span key={n} className={w ? undefined : "is-sk"} style={css({ gridColumn: `${col} / span ${span}`, gridRow: row, "--i": n })}>
                        {w}
                      </span>
                    );
                  })}
                  <span className="is-now" style={css({ "--x": 46 })} />
                </div>
              </div>
            </div>
          </div>
          <div className="nb-toast" aria-hidden="true">
            <i className="nb-orb">{c.name.charAt(0)}</i>
            <div>
              <small>{c.name}</small>
              <p data-type>{toast}</p>
            </div>
          </div>
          {p ? (
            <figure className="nb-float">
              <Pic p={p} eager sizes="230px" />
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type Feature = SectionOf<"features">["items"][number];

/** One state of the product screen, drawn from a feature and its neighbours. */
function State({ it, all, n, on, uid }: { it: Feature; all: Feature[]; n: number; on?: boolean; uid: string }) {
  const kind = n % 5;
  const others = [it, ...all.filter((x) => x !== it)].slice(0, 4);
  const top = (
    <p className="nb-st-top">
      <Icon name={it.icon} />
      {it.title}
    </p>
  );
  let body: ReactNode;
  if (kind === 0)
    body = (
      <div className="nb-cal">
        {Array.from({ length: 15 }, (_, k) => (
          <i key={k} style={css({ gridColumn: (k % 5) + 1, gridRow: Math.floor(k / 5) + 1 })} />
        ))}
        {others.slice(0, 3).map((x, k) => (
          <b key={k} className={k === 0 ? "is-hl" : undefined} style={css({ "--c": [2, 4, 1][k], "--r": [2, 1, 3][k], "--s": [2, 2, 2][k], "--i": k })}>
            {x.title}
          </b>
        ))}
      </div>
    );
  else if (kind === 4)
    body = (
      <div className="nb-map">
        <svg viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`${uid}-rt`} x1="0" x2="1">
              <stop offset="0" stopColor="#2e5bff" />
              <stop offset="1" stopColor="#22b8ff" />
            </linearGradient>
          </defs>
          <path pathLength={1} stroke={`url(#${uid}-rt)`} d="M40 250 C 120 250, 110 150, 190 150 S 260 60, 360 60" />
          {[
            [40, 250],
            [190, 150],
            [360, 60],
          ].map(([x, y], k) => (
            <circle key={k} cx={x} cy={y} r="7" style={i(k)} />
          ))}
        </svg>
      </div>
    );
  else
    body = (
      <div className="nb-list">
        {others.map((x, k) => (
          <div key={k} style={i(k)}>
            {kind === 1 ? (
              <span className="nb-bub">
                <Icon name={x.icon} />
              </span>
            ) : null}
            <span>
              {x.title}
              {kind === 1 ? <small /> : null}
            </span>
            {kind === 2 ? (
              <i>
                <Check />
              </i>
            ) : kind === 3 ? (
              <em />
            ) : null}
          </div>
        ))}
      </div>
    );
  return (
    <div className={`nb-state${on ? " is-on" : ""}`}>
      {top}
      {body}
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="nb-foot">
      <div className="nb-wrap">
        <div className="nb-foot-top">
          <h2 data-rv>{c.spec.business.tagline || c.name}</h2>
          <p data-rv>
            <Go c={c} href={cta.href}>
              {cta.label}
            </Go>
          </p>
        </div>
        <div className="nb-foot-grid">
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
        <Legal c={c} className="nb-legal" />
      </div>
      <p className="nb-mark" aria-hidden="true" data-rv style={css({ "--n": Math.max(6, c.name.length) })}>
        {c.name}
      </p>
    </footer>
  );
}

/** Where a plan's button leads: the booking or contact section, else the opening's call to action. */
const planHref = (c: Ctx) => {
  const s = c.spec.sections.find((x) => x.type === "booking" || x.type === "contact");
  return s ? `#${s.id}` : c.spec.hero.primaryCta.href;
};

/** Bento widths on a 12-column grid: rows of 7+5, 4+4+4, 5+7, 6+6; a short last row shares the width. */
function bento(count: number): number[] {
  const rows = [[7, 5], [4, 4, 4], [5, 7], [6, 6]];
  const out: number[] = [];
  let r = 0;
  while (out.length < count) {
    const row = rows[r++ % rows.length];
    const left = count - out.length;
    if (left >= row.length) out.push(...row);
    else for (let k = 0; k < left; k++) out.push(12 / left);
  }
  return out;
}

export const nimbus: Family = {
  key: "nimbus",
  root: "d-nimbus",
  fonts: ["Sora", "Inter Tight"],
  themeColor: "#f4f6fb",
  accent: "#2e5bff",
  onAccent: "#ffffff",
  css: "",
  extra: CSS,
  js: TODAY_JS + JS,
  cls: { wrap: "nb-wrap", eyebrow: "nb-kick", btn: "nb-fill", btnAlt: "nb-ghost", btnText: "nb-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    features: (s, c) => (
      <section className="nb-story" id={s.id}>
        <div className="nb-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <div className="nb-story-grid">
            <ol className="nb-steps">
              {s.items.map((it, n) => (
                <li key={n} className={`nb-step${n === 0 ? " is-act" : ""}`} data-rv>
                  <small>
                    {n2(n)} / {n2(s.items.length - 1)}
                  </small>
                  <span className="nb-ico">
                    <Icon name={it.icon} />
                  </span>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                  <div className="nb-mini" aria-hidden="true">
                    <State it={it} all={s.items} n={n} uid={`${s.id}-m${n}`} />
                  </div>
                </li>
              ))}
            </ol>
            <div className="nb-screen-wrap" aria-hidden="true">
              <div className="nb-screen">
                {s.items.map((it, n) => (
                  <State key={n} it={it} all={s.items} n={n} on={n === 0} uid={`${s.id}-s${n}`} />
                ))}
              </div>
              <p className="nb-dots">
                <b data-at>01</b>
                {s.items.map((_, n) => (
                  <i key={n} className={n === 0 ? "is-on" : undefined} />
                ))}
                {n2(s.items.length - 1)}
              </p>
            </div>
          </div>
        </div>
      </section>
    ),
    services: (s, c) => {
      const w = bento(s.items.length);
      return (
        <section className="nb-sec" id={s.id}>
          <div className="nb-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
            <ul className="nb-bento">
              {s.items.map((it, n) => {
                const p = w[n] >= 5 ? c.photo(`art:svc${n}`) : null;
                return (
                  <li key={n} className={w[n] >= 12 && p ? "is-wide" : undefined} data-rv style={css({ "--w": w[n], "--i": n % 3 })}>
                    <div className="nb-card nb-spot">
                      {p ? (
                        <figure className="nb-card-pic">
                          <Pic p={p} sizes="(min-width: 1080px) 50vw, (min-width: 700px) 46vw, 92vw" />
                        </figure>
                      ) : null}
                      <span className="nb-card-n" aria-hidden="true">
                        {n2(n)}
                      </span>
                      {p ? null : (
                        <span className="nb-ico">
                          <Icon name={it.icon} />
                        </span>
                      )}
                      <h3>{it.title}</h3>
                      <p>{it.description}</p>
                      {it.duration || it.price ? (
                        <p className="nb-meta">
                          {it.duration ? <span>{it.duration}</span> : null}
                          {it.price ? <b>{it.price}</b> : null}
                        </p>
                      ) : null}
                    </div>
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
        <section className="nb-sec is-white" id={s.id}>
          <div className="nb-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            <div className="nb-plans">
              {cats.map((cat, n) => (
                <div key={n} className="nb-plan nb-spot" data-rv style={i(n % 3)}>
                  <h3>{cat.name}</h3>
                  <ul className="nb-ticks" style={{ gridRow: "2 / -1" }}>
                    {cat.items.map((d, m) => (
                      <li key={m}>
                        <Check />
                        <span>
                          <b>{d.name}</b>
                          {d.price ? <span className="z-price"> · {d.price}</span> : null}
                          {d.description ? (
                            <>
                              <br />
                              <span style={{ color: "var(--dim)", fontSize: "14px" }}>{d.description}</span>
                            </>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {s.note ? (
              <p className="nb-note" data-rv>
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
        <section className="nb-sec" id={s.id}>
          <div className={`nb-wrap nb-about${p ? "" : " is-solo"}`}>
            <div className="nb-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="nb-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
            </div>
            {p || s.highlights.length ? (
              <div className="nb-about-vis" data-px>
                {p ? (
                  <figure className="nb-about-pic" data-rv>
                    <Pic p={p} sizes="(min-width: 960px) 44vw, 92vw" />
                  </figure>
                ) : null}
                {s.highlights.length ? (
                  <ul className="nb-chips">
                    {s.highlights.map((h, n) => (
                      <li key={h} data-rv style={i(n + 1)}>
                        <i aria-hidden="true">
                          <Check />
                        </i>
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      );
    },
    process: (s, c) => (
      <section className="nb-sec is-white" id={s.id}>
        <div className="nb-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <ol className="nb-flow" data-rv style={css({ "--n": s.steps.length })}>
            {s.steps.map((st, n) => (
              <li key={n} style={i(n)}>
                <span className="nb-node" aria-hidden="true">
                  {n + 1}
                </span>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    packages: (s, c) => (
      <section className="nb-sec" id={s.id}>
        <div className="nb-wrap">
          <Head kicker={c.t.kick.packages} title={s.title} intro={s.intro} center />
          <ul className="nb-plans">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n)}>
                <div className={`nb-plan${it.featured ? " is-featured" : " nb-spot"}`}>
                  <h3>
                    {it.name}
                    {it.featured ? <small>{c.t.popular}</small> : null}
                  </h3>
                  <p className="nb-price">
                    {it.price ? (
                      <>
                        <b>{it.price}</b>
                        {it.unit ? <span>{it.unit}</span> : null}
                      </>
                    ) : (
                      <b className="is-req">{c.t.onRequest}</b>
                    )}
                  </p>
                  {it.description ? <p>{it.description}</p> : <span />}
                  {it.features.length ? (
                    <ul className="nb-ticks">
                      {it.features.map((f) => (
                        <li key={f}>
                          <Check />
                          {f}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span />
                  )}
                  <Go c={c} href={planHref(c)} variant={it.featured ? "fill" : "alt"}>
                    {c.spec.hero.primaryCta.label}
                  </Go>
                </div>
              </li>
            ))}
          </ul>
          {s.note ? (
            <p className="nb-note" data-rv>
              <Icon name="spark" />
              {s.note}
            </p>
          ) : null}
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const shape = (n: number) => (pics.length < 4 ? (n === 0 && pics.length === 3 ? "is-big" : undefined) : n % 6 === 0 ? "is-big" : n % 6 === 4 ? "is-wide" : undefined);
      return (
        <section className="nb-sec is-white" id={s.id}>
          <div className="nb-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className={`nb-gal${pics.length < 4 ? " is-few" : ""}`}>
              {pics.map((p, n) => (
                <figure key={n} className={shape(n)} data-rv style={i(n % 4)}>
                  <Pic p={p} sizes="(min-width: 900px) 50vw, 50vw" />
                  <figcaption>{p.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    showcase: (s, c) => {
      const p = c.photo(s.image);
      return (
        <section className={`nb-show${p ? "" : " is-plain"}`} id={s.id}>
          <div className="nb-show-in">
            {p ? (
              <div className="nb-show-media" data-px>
                <Pic p={p} sizes="100vw" />
              </div>
            ) : null}
            <div className="nb-glass" data-rv>
              <p className="nb-kick">{c.t.kick.showcase}</p>
              <h2 className={long(s.title)}>{em(s.title)}</h2>
              {s.body ? <p>{s.body}</p> : null}
              {s.cta ? (
                <Go c={c} href={s.cta.href}>
                  {s.cta.label}
                </Go>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    statement: (s) => (
      <section className="z-sec z-statement" id={s.id}>
        <div className="nb-wrap z-center">
          {s.note ? (
            <p className="nb-kick" data-rv>
              {s.note}
            </p>
          ) : null}
          <h2 data-rv>
            <span className="nb-dawn">{em(s.title)}</span>
          </h2>
        </div>
      </section>
    ),
    faq: (s, c) => {
      const id = (n: number) => `${s.id}-q-${n}`;
      return (
        <section className="nb-sec" id={s.id}>
          <div className="nb-wrap">
            <Head kicker={c.t.kick.faq} title={s.title} />
            <div className="nb-chat" data-rv>
              <div className="nb-qs" role="tablist" aria-label={s.title.replace(/\*/g, "")}>
                {s.items.map((it, n) => (
                  <button key={n} type="button" role="tab" id={id(n)} aria-selected={n === 0} aria-controls={`${id(n)}-a`} tabIndex={n === 0 ? 0 : -1}>
                    {it.q}
                  </button>
                ))}
              </div>
              <div className="nb-win">
                <p className="nb-win-bar" aria-hidden="true">
                  <i className="nb-orb">{c.name.charAt(0)}</i>
                  <span>{c.name}</span>
                  <span>{c.t.kick.faq}</span>
                </p>
                {s.items.map((it, n) => (
                  <div key={n} id={`${id(n)}-a`} className="nb-thread" role="tabpanel" aria-labelledby={id(n)} hidden={n > 0}>
                    <p className="nb-q">{it.q}</p>
                    <div className="nb-a">
                      <i className="nb-orb" aria-hidden="true">
                        {c.name.charAt(0)}
                      </i>
                      <span className="nb-typing" aria-hidden="true">
                        <i style={i(0)} />
                        <i style={i(1)} />
                        <i style={i(2)} />
                      </span>
                      <p>{it.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="nb-sec is-white" id={s.id}>
        <div className="nb-wrap nb-visit">
          <div className="nb-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="nb-widget" data-rv>
            <p className="nb-widget-top">
              {c.t.hours}
              <NowBadge c={c} className="nb-now" />
            </p>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="nb-sec" id={s.id}>
        <div className="nb-wrap nb-book">
          <div className="nb-book-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            {c.spec.business.openingHours?.length ? (
              <div className="nb-widget" data-rv>
                <p className="nb-widget-top">
                  {c.t.hours}
                  <NowBadge c={c} className="nb-now" />
                </p>
                <Hours c={c} />
              </div>
            ) : null}
            <Reach c={c} />
          </div>
          <div className="nb-form" data-rv>
            <div className="nb-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="nb-url">{c.t.submit[s.kind]}</span>
            </div>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" button={c.t.submit[s.kind]} />
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="nb-sec is-white" id={s.id}>
        <div className="nb-wrap nb-book">
          <div className="nb-book-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") && c.spec.business.openingHours?.length ? (
              <div className="nb-widget" data-rv>
                <p className="nb-widget-top">
                  {c.t.hours}
                  <NowBadge c={c} className="nb-now" />
                </p>
                <Hours c={c} />
              </div>
            ) : null}
          </div>
          {s.showForm ? (
            <div className="nb-form" data-rv>
              <div className="nb-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span className="nb-url">{c.t.message}</span>
              </div>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : null}
        </div>
      </section>
    ),
  },
};
