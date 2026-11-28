import type { CSSProperties, ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type HeadProps, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Snuf: an original template (no portfolio demo). A premium pet brand that is allowed to be
 * cheerful: cream, warm apricot and deep green, a soft chunky serif, rounded tiles arranged
 * as a bento box. Signature details: an opening made of tiles where the photograph talks in
 * a speech bubble, a product grid with filter chips (counts from the spec) and a wishlist
 * heart that bursts and counts up in the floating header, a subscription box whose lid lifts
 * when you point at it, a dotted trail that draws itself between the steps, and an
 * open/closed sign that swings on its string. Paws and doodles are used sparingly; things
 * wag and bounce only when you touch them. Made for pet shops, pet brands, groomers and
 * other friendly shops with a range to browse.
 */

const CSS = `
.d-snuf{--cream:#fff6ea;--cream2:#fdeedd;--white:#fffdf8;--apri:#f6a46c;--apri-l:#fcd6b6;--apri-d:#c9612a;--green:#1d4a3a;--green2:#2b6352;--mint:#d9ead5;--ink:#183d30;--dim:#5d6f66;--line:rgba(24,61,48,.13);--pad:clamp(16px,4.4vw,64px);--disp:"Fraunces Soft",Georgia,serif;--body:"Poppins",system-ui,sans-serif;--spring:cubic-bezier(.34,1.56,.64,1);--boing:cubic-bezier(.3,1.9,.5,1);--ease:cubic-bezier(.22,.8,.24,1);--r:32px;--z-bg2:var(--white);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--green);--z-on-accent:var(--cream);--z-display:var(--disp);--z-display-weight:800;--z-radius:28px;--z-field-radius:16px;--z-ico-radius:40% 60% 55% 45%/50% 45% 55% 50%;--z-sec:clamp(84px,10vw,150px);--z-h3:clamp(21px,1.7vw,26px);--z-statement:clamp(32px,4.4vw,66px);background:var(--cream);color:var(--ink);font-family:var(--body);font-size:clamp(15.5px,1vw,17px);font-weight:400;line-height:1.7}
.d-snuf ::selection{background:var(--apri);color:var(--green)}
.d-snuf [hidden]{display:none!important}
.d-snuf section[id]{scroll-margin-top:110px}
.d-snuf h1,.d-snuf h2,.d-snuf h3{font-family:var(--disp);font-weight:800;font-variation-settings:"SOFT" 100,"WONK" 1;line-height:1.02;letter-spacing:-.02em;overflow-wrap:break-word;text-wrap:balance}
.d-snuf h1 em,.d-snuf h2 em{font-style:italic;font-weight:700;color:var(--apri-d)}
.d-snuf h2{font-size:clamp(38px,5vw,76px)}
.d-snuf h2.is-long{font-size:clamp(30px,3.6vw,54px)}
.d-snuf .sn-wrap{position:relative;width:min(100%,1320px);margin-inline:auto;padding-inline:var(--pad)}
.d-snuf .sn-kick{display:inline-flex;align-items:center;gap:10px;width:max-content;max-width:100%;padding:7px 16px 7px 10px;border-radius:999px;background:var(--white);font-size:13.5px;font-weight:600;line-height:1.3;color:var(--green);box-shadow:0 1px 0 var(--line)}
.d-snuf .sn-kick svg{flex:none;width:20px;height:20px;color:var(--apri-d)}
.d-snuf .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:56px;padding:0 28px;border-radius:999px;font-weight:600;font-size:15.5px;line-height:1.2;text-align:center;transition:transform .45s var(--spring),background-color .3s,color .3s,box-shadow .3s}
.d-snuf .btn svg{width:18px;height:18px;flex:none;transition:transform .5s var(--boing)}
.d-snuf .btn:hover svg{animation:sn-wag .6s ease-in-out}
.d-snuf .sn-fill{background:var(--green);color:var(--cream);box-shadow:0 12px 26px -16px rgba(24,61,48,.8)}
.d-snuf .sn-fill:hover{background:var(--green2);transform:translateY(-3px) scale(1.02)}
.d-snuf .sn-alt{background:var(--white);color:var(--green)}
.d-snuf .sn-alt:hover{background:var(--cream2);transform:translateY(-3px) scale(1.02)}
.d-snuf .sn-text{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:600;color:var(--green);text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:6px;text-decoration-color:var(--apri)}
.d-snuf .sn-text:hover{text-decoration-color:var(--green)}
.d-snuf .sn-mag{will-change:transform}
.d-snuf .sn-hdr{position:sticky;top:0;z-index:50;padding:12px 0 0;pointer-events:none}
.d-snuf .sn-pillbar{display:flex;align-items:center;gap:clamp(10px,1.6vw,22px);min-height:68px;padding:8px 8px 8px 12px;border-radius:999px;background:rgba(255,253,248,.9);backdrop-filter:blur(12px) saturate(1.3);-webkit-backdrop-filter:blur(12px) saturate(1.3);box-shadow:0 10px 30px -22px rgba(24,61,48,.55),0 0 0 1px var(--line);pointer-events:auto;transition:box-shadow .4s}
.d-snuf.is-scrolled .sn-pillbar{box-shadow:0 14px 34px -18px rgba(24,61,48,.5),0 0 0 1px var(--line)}
.d-snuf .sn-logo{display:flex;align-items:center;gap:10px;min-width:0;margin-right:auto;font-family:var(--disp);font-size:clamp(21px,1.8vw,26px);font-weight:800;font-variation-settings:"SOFT" 100,"WONK" 1;line-height:1;letter-spacing:-.02em}
.d-snuf .sn-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-snuf .sn-mark{position:relative;display:grid;flex:none;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--apri);color:var(--green)}
.d-snuf .sn-mark svg{width:34px;height:34px;overflow:visible}
.d-snuf .sn-mark .ear{transform-box:fill-box;transform-origin:50% 10%;transition:transform .3s}
.d-snuf .sn-logo:hover .ear-l{animation:sn-ear-l .5s ease-in-out 2}
.d-snuf .sn-logo:hover .ear-r{animation:sn-ear-r .5s ease-in-out 2}
.d-snuf .sn-links{display:none;gap:2px}
.d-snuf .sn-links a{padding:10px 16px;border-radius:999px;font-size:15px;font-weight:500;transition:background-color .25s,transform .4s var(--spring)}
.d-snuf .sn-links a:hover{background:var(--mint);transform:translateY(-2px)}
.d-snuf .sn-wish-link{position:relative;display:grid;flex:none;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--cream2);color:var(--apri-d);transition:transform .4s var(--spring)}
.d-snuf .sn-wish-link:hover{transform:scale(1.08) rotate(-8deg)}
.d-snuf .sn-wish-link svg{width:22px;height:22px}
.d-snuf .sn-wish-link b{position:absolute;right:-2px;top:-2px;display:grid;place-items:center;min-width:22px;height:22px;padding:0 6px;border-radius:999px;background:var(--green);color:var(--cream);font-size:12px;font-weight:600;transform:scale(0);transition:transform .45s var(--boing)}
.d-snuf .sn-wish-link.has b{transform:scale(1)}
.d-snuf .sn-wish-link.bump{animation:sn-bump .5s var(--boing)}
.d-snuf .sn-hcta{display:none;min-height:52px}
.d-snuf .sn-burger{position:relative;z-index:62;display:inline-flex;flex:none;align-items:center;gap:10px;min-height:52px;padding:0 20px;border:0;border-radius:999px;background:var(--green);color:var(--cream);font-weight:600;font-size:15px}
.d-snuf .sn-burger i{display:grid;gap:5px;width:18px}
.d-snuf .sn-burger i::before,.d-snuf .sn-burger i::after{content:"";height:2px;border-radius:2px;background:currentColor;transition:transform .45s var(--spring)}
.d-snuf.menu-open .sn-burger i::before{transform:translateY(3.5px) rotate(45deg)}
.d-snuf.menu-open .sn-burger i::after{transform:translateY(-3.5px) rotate(-45deg)}
@media (min-width:1060px){.d-snuf .sn-links,.d-snuf .sn-hcta{display:inline-flex}.d-snuf .sn-burger{display:none}}
.d-snuf .sn-scrim{position:fixed;inset:0;z-index:48;background:rgba(24,61,48,.42);opacity:0;visibility:hidden;transition:opacity .4s,visibility 0s .4s}
.d-snuf.menu-open .sn-scrim{opacity:1;visibility:visible;transition:opacity .4s}
.d-snuf .sn-sheet{position:fixed;left:8px;right:8px;bottom:8px;z-index:49;display:grid;gap:22px;max-height:calc(100svh - 96px);padding:16px clamp(20px,5vw,40px) calc(28px + env(safe-area-inset-bottom));overflow-y:auto;border-radius:36px;background:var(--green);color:var(--cream);transform:translateY(110%);visibility:hidden;transition:transform .7s var(--ease),visibility 0s .7s}
.d-snuf .sn-sheet.is-open{transform:none;visibility:visible;transition:transform .75s var(--spring)}
.d-snuf .sn-sheet::before{content:"";justify-self:center;width:54px;height:5px;border-radius:9px;background:rgba(255,246,234,.3)}
.d-snuf .sn-sheet nav{display:grid;gap:2px}
.d-snuf .sn-sheet nav a{display:flex;align-items:center;gap:14px;min-height:58px;font-family:var(--disp);font-size:clamp(30px,8vw,46px);font-weight:800;font-variation-settings:"SOFT" 100,"WONK" 1;line-height:1.05;opacity:0;transform:translateY(24px) scale(.94);transition:opacity .4s,transform .6s var(--boing)}
.d-snuf .sn-sheet nav a svg{flex:none;width:26px;height:26px;color:var(--apri);transform:rotate(-20deg) scale(0);transition:transform .5s var(--boing)}
.d-snuf .sn-sheet.is-open nav a{opacity:1;transform:none;transition-delay:calc(.18s + var(--i,0) * 60ms)}
.d-snuf .sn-sheet.is-open nav a svg{transform:rotate(-20deg) scale(1);transition-delay:calc(.35s + var(--i,0) * 60ms)}
.d-snuf .sn-sheet-foot{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;padding-top:18px;border-top:1px solid rgba(255,246,234,.16);font-size:14.5px;color:rgba(255,246,234,.8)}
.d-snuf .sn-sheet-foot a{display:inline-flex;align-items:center;min-height:44px;color:var(--cream)}
.d-snuf .sn-sheet .btn{width:100%;background:var(--apri);color:var(--green)}
.d-snuf .sn-now{display:inline-flex;align-items:center;gap:8px;padding:6px 14px 6px 10px;border-radius:999px;background:var(--white);font-size:13.5px;font-weight:600;line-height:1.3;color:var(--green)}
.d-snuf .sn-now::before{content:"";width:10px;height:10px;border-radius:50%;background:currentColor;box-shadow:0 0 0 4px rgba(43,99,82,.16)}
.d-snuf .sn-now.is-open{color:var(--green2)}
.d-snuf .sn-now.is-closed{color:var(--apri-d)}
.d-snuf .sn-now.is-closed::before{box-shadow:0 0 0 4px rgba(201,97,42,.16)}
.d-snuf .sn-hero{padding:clamp(18px,2.4vw,34px) 0 clamp(60px,7vw,110px)}
.d-snuf .sn-bento{display:grid;gap:clamp(10px,1.2vw,18px);grid-template-columns:minmax(0,1fr)}
.d-snuf .sn-tile{position:relative;overflow:hidden;border-radius:clamp(26px,3vw,44px)}
.d-snuf .sn-bento>*{animation:sn-tile .9s var(--spring) both;animation-delay:calc(.05s + var(--i,0) * 110ms)}
.d-snuf .sn-t-main{display:grid;align-content:end;gap:22px;min-height:0;padding:clamp(26px,4vw,64px);background:var(--apri)}
.d-snuf .sn-t-main .sn-paw{position:absolute;right:clamp(18px,3vw,40px);top:clamp(18px,3vw,40px);width:clamp(64px,8vw,110px);color:var(--apri-d);opacity:.45;transform:rotate(18deg)}
.d-snuf .sn-hero-top{display:flex;flex-wrap:wrap;align-items:center;gap:10px;max-width:calc(100% - 90px)}
.d-snuf .sn-hero-top .sn-kick{box-shadow:none}
.d-snuf .sn-hero h1{max-width:12ch;font-size:clamp(50px,7.2vw,118px);line-height:.96;color:var(--green)}
.d-snuf .sn-hero h1.is-m{max-width:14ch;font-size:clamp(44px,5.8vw,92px)}
.d-snuf .sn-hero h1.is-s{max-width:18ch;font-size:clamp(36px,4.4vw,68px)}
.d-snuf .sn-hero h1 em{color:var(--green);background:linear-gradient(transparent 64%,var(--white) 64%,var(--white) 92%,transparent 92%) no-repeat 0 0/0% 100%;animation:sn-mark .9s var(--ease) 1.3s forwards;padding-inline:.04em}
.d-snuf .sn-word{display:inline-block;white-space:nowrap}
.d-snuf .sn-ch{display:inline-block;opacity:0;transform:translateY(55%) scale(.4) rotate(-14deg);animation:sn-pop .8s var(--boing) forwards;animation-delay:calc(.25s + var(--i,0) * 26ms)}
.d-snuf .sn-lede{max-width:46ch;font-size:clamp(16.5px,1.25vw,19px);color:var(--green);animation:sn-up .8s var(--ease) .95s both}
.d-snuf .sn-ctas{display:flex;flex-wrap:wrap;gap:12px;animation:sn-up .8s var(--ease) 1.1s both}
.d-snuf .sn-t-pic{min-height:clamp(380px,62vw,560px);background:var(--green)}
.d-snuf .sn-t-pic img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;scale:1.18;animation:sn-unzoom 1.6s var(--ease) .2s forwards;transition:transform 1.2s var(--ease)}
.d-snuf .sn-t-pic:hover img{transform:scale(1.04)}
.d-snuf .sn-bubble{position:absolute;left:clamp(16px,2vw,28px);bottom:clamp(16px,2vw,28px);z-index:2;max-width:min(250px,76%);padding:14px 20px;border-radius:26px 26px 26px 8px;background:var(--white);font-family:var(--disp);font-size:clamp(19px,1.6vw,23px);font-weight:800;font-variation-settings:"SOFT" 100,"WONK" 1;line-height:1.12;color:var(--green);box-shadow:0 18px 30px -20px rgba(24,61,48,.6);transform-origin:0 100%;animation:sn-bubble .8s var(--boing) 1.5s both}
.d-snuf .sn-t-pic:hover .sn-bubble{animation:sn-wiggle .7s ease-in-out}
.d-snuf .sn-empty{display:grid;place-items:center;background:var(--green);color:var(--apri)}
.d-snuf .sn-empty svg{width:min(62%,300px);height:auto}
.d-snuf .sn-empty b{position:absolute;left:50%;top:50%;font-family:var(--disp);font-size:clamp(90px,10vw,150px);font-weight:900;font-variation-settings:"SOFT" 100,"WONK" 1;line-height:1;color:var(--green);transform:translate(-50%,-38%)}
.d-snuf .sn-t-facts{display:grid;align-content:center;gap:4px;padding:clamp(22px,2.6vw,34px);background:var(--green);color:var(--cream)}
.d-snuf .sn-t-facts>div{display:flex;align-items:center;gap:14px;padding:8px 0}
.d-snuf .sn-t-facts span{display:grid;flex:none;place-items:center;width:42px;height:42px;border-radius:50%;background:rgba(255,246,234,.1);color:var(--apri)}
.d-snuf .sn-t-facts svg{width:19px;height:19px}
.d-snuf .sn-t-facts dt{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.d-snuf .sn-t-facts dd{margin:0;font-weight:500;line-height:1.35}
.d-snuf .sn-t-facts a{text-decoration:underline;text-decoration-color:var(--apri);text-underline-offset:4px}
.d-snuf .sn-t-cats{display:grid;align-content:center;gap:14px;padding:clamp(22px,2.6vw,34px);background:var(--white)}
.d-snuf .sn-t-cats p{font-family:var(--disp);font-size:clamp(22px,1.8vw,28px);font-weight:800;font-variation-settings:"SOFT" 100,"WONK" 1;line-height:1.1}
.d-snuf .sn-chiplinks{display:flex;flex-wrap:wrap;gap:8px}
.d-snuf .sn-chiplinks a{display:inline-flex;align-items:center;gap:8px;min-height:46px;padding:0 18px;border-radius:999px;background:var(--cream2);font-weight:500;transition:transform .45s var(--boing),background-color .25s}
.d-snuf .sn-chiplinks a:nth-child(3n+2){background:var(--mint)}
.d-snuf .sn-chiplinks a:hover{transform:translateY(-3px) rotate(-3deg);background:var(--apri-l)}
@media (min-width:760px) and (max-width:1019px){.d-snuf .sn-bento{grid-template-columns:repeat(2,minmax(0,1fr))}.d-snuf .sn-t-main,.d-snuf .sn-t-pic{grid-column:1/-1}.d-snuf .sn-bento.no-facts .sn-t-cats,.d-snuf .sn-bento.no-cats .sn-t-facts{grid-column:1/-1}}
@media (min-width:1020px){.d-snuf .sn-bento{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr) minmax(0,1fr);grid-template-areas:"main main pic" "facts cats pic"}.d-snuf .sn-bento.no-cats{grid-template-areas:"main main pic" "facts facts pic"}.d-snuf .sn-bento.no-facts{grid-template-areas:"main main pic" "cats cats pic"}.d-snuf .sn-bento.no-facts.no-cats{grid-template-areas:"main main pic"}.d-snuf .sn-t-main{grid-area:main;min-height:min(74vh,640px)}.d-snuf .sn-t-pic{grid-area:pic;min-height:0}.d-snuf .sn-t-facts{grid-area:facts}.d-snuf .sn-t-cats{grid-area:cats}}
.d-snuf .sn-sec{position:relative;padding-block:var(--z-sec)}
.d-snuf .sn-sec.is-white{background:var(--white)}
.d-snuf .sn-sec.is-tint{background:var(--cream2)}
.d-snuf .sn-head{display:grid;justify-items:start;gap:18px;max-width:780px;margin-bottom:clamp(36px,5vw,64px)}
.d-snuf .sn-head.is-center{justify-items:center;margin-inline:auto;text-align:center}
.d-snuf .sn-head>p:not(.sn-kick){max-width:54ch;font-size:clamp(16px,1.15vw,18px);color:var(--dim)}
.demo-js .d-snuf [data-rv]{transform:translateY(34px) scale(.98);transition:opacity .7s var(--ease),transform .9s var(--spring);transition-delay:calc(var(--i,0) * 80ms)}
.demo-js .d-snuf [data-rv].in{transform:none}
.d-snuf .sn-filter{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:0 auto clamp(28px,3vw,44px)}
.d-snuf .sn-filter button{display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:0 20px;border:0;border-radius:999px;background:var(--white);font-weight:600;font-size:15px;color:var(--green);box-shadow:0 0 0 1px var(--line);transition:transform .45s var(--boing),background-color .3s,color .3s,box-shadow .3s}
.d-snuf .sn-filter button sup{display:grid;place-items:center;min-width:24px;height:24px;padding:0 7px;border-radius:999px;background:var(--cream2);font-size:12px;line-height:1;transition:background-color .3s}
.d-snuf .sn-filter button:hover{transform:translateY(-3px)}
.d-snuf .sn-filter button[aria-pressed="true"]{background:var(--green);color:var(--cream);box-shadow:none;animation:sn-press .5s var(--boing)}
.d-snuf .sn-filter button[aria-pressed="true"] sup{background:var(--apri);color:var(--green)}
.d-snuf .sn-grid{display:grid;gap:clamp(14px,1.6vw,24px);grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:900px){.d-snuf .sn-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (min-width:1180px){.d-snuf .sn-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (max-width:599px){.d-snuf .sn-grid{gap:10px}.d-snuf .sn-card{border-radius:24px}.d-snuf .sn-pic{border-radius:24px 24px 16px 16px}.d-snuf .sn-body{padding:12px 12px 14px;gap:4px}.d-snuf .sn-body small{font-size:10.5px}.d-snuf .sn-body h3{font-size:17px}.d-snuf .sn-body p{font-size:13px;line-height:1.45}.d-snuf .sn-body footer b{font-size:18px}.d-snuf .sn-ask{width:40px;height:40px}.d-snuf .sn-wish{right:8px;top:8px;width:40px;height:40px}.d-snuf .sn-sticker{left:8px;top:10px;font-size:11px;padding:4px 10px}.d-snuf .sn-filter{flex-wrap:nowrap;justify-content:flex-start;margin-inline:calc(-1 * var(--pad));padding:4px var(--pad) 6px;overflow-x:auto;scrollbar-width:none}.d-snuf .sn-filter button{flex:none}}
.d-snuf .sn-grid.is-svc{grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))}
.d-snuf .sn-pic.is-icon{display:grid;place-items:center;aspect-ratio:16/10}
.d-snuf .sn-bigico{display:grid;place-items:center;width:96px;height:96px;border-radius:42% 58% 55% 45%/50% 42% 58% 50%;background:var(--white);color:var(--green);transition:transform .6s var(--boing)}
.d-snuf .sn-bigico svg{width:40px;height:40px;stroke-width:1.6}
.d-snuf .sn-card:hover .sn-bigico{transform:rotate(-12deg) scale(1.08)}
.d-snuf .sn-prod{transition:opacity .35s,transform .5s var(--spring)}
.d-snuf .sn-prod.is-out{opacity:0;transform:scale(.86) rotate(-2deg)}
.d-snuf .sn-prod.is-gone{display:none}
.d-snuf .sn-card{position:relative;display:grid;grid-template-rows:auto 1fr;height:100%;border-radius:var(--r);background:var(--white);box-shadow:0 0 0 1px var(--line);transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(var(--ty,0));transition:transform .5s var(--spring),box-shadow .4s}
.d-snuf .sn-card:hover{--ty:-8px;box-shadow:0 30px 50px -30px rgba(24,61,48,.45),0 0 0 1px var(--line)}
.d-snuf .sn-card.is-tilt{transition:transform .15s linear,box-shadow .4s}
.d-snuf .sn-pic{position:relative;aspect-ratio:1/1;overflow:hidden;border-radius:var(--r) var(--r) 22px 22px;background:var(--cream2)}
.d-snuf .sn-pic img{width:100%;height:100%;object-fit:cover;transition:transform .9s var(--ease)}
.d-snuf .sn-card:hover .sn-pic img{transform:scale(1.07)}
.d-snuf .sn-pic.t0{background:var(--apri-l)}.d-snuf .sn-pic.t1{background:var(--mint)}.d-snuf .sn-pic.t2{background:var(--cream2)}.d-snuf .sn-pic.t3{background:#f6dccf}
.d-snuf .sn-pic .sn-art{position:absolute;inset:18%;width:64%;height:64%;color:var(--green);opacity:.85;transition:transform .7s var(--boing)}
.d-snuf .sn-card:hover .sn-art,.d-snuf .sn-card:hover .sn-letter{transform:rotate(-10deg) scale(1.06)}
.d-snuf .sn-letter{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--disp);font-size:clamp(90px,9vw,140px);font-weight:900;font-style:italic;font-variation-settings:"SOFT" 100,"WONK" 1;line-height:1;color:var(--green);transition:transform .7s var(--boing)}
.d-snuf .sn-sticker{position:absolute;left:14px;top:14px;padding:5px 12px;border-radius:999px;background:var(--green);color:var(--cream);font-size:12px;font-weight:600;line-height:1.4;transform:rotate(-4deg)}
.d-snuf .sn-wish{position:absolute;right:12px;top:12px;z-index:2;display:grid;place-items:center;width:46px;height:46px;padding:0;border:0;border-radius:50%;background:rgba(255,253,248,.92);color:var(--apri-d);box-shadow:0 6px 16px -10px rgba(24,61,48,.6);transition:transform .45s var(--boing),background-color .3s}
.d-snuf .sn-wish:hover{transform:scale(1.12)}
.d-snuf .sn-wish svg{position:relative;z-index:1;width:22px;height:22px;transition:transform .5s var(--boing)}
.d-snuf .sn-wish svg path{fill:transparent;stroke:currentColor;stroke-width:2;transition:fill .25s}
.d-snuf .sn-wish[aria-pressed="true"]{background:var(--apri)}
.d-snuf .sn-wish[aria-pressed="true"] svg{color:var(--green);animation:sn-heart .6s var(--boing)}
.d-snuf .sn-wish[aria-pressed="true"] svg path{fill:var(--green);stroke:var(--green)}
.d-snuf .sn-wish i{position:absolute;left:50%;top:50%;width:7px;height:7px;margin:-3.5px;border-radius:50%;background:var(--apri);opacity:0;pointer-events:none}
.d-snuf .sn-wish i:nth-child(2n){background:var(--green2)}
.d-snuf .sn-wish.is-burst i{animation:sn-burst .7s var(--ease) forwards}
.d-snuf .sn-wish i:nth-of-type(1){--a:0deg}.d-snuf .sn-wish i:nth-of-type(2){--a:60deg}.d-snuf .sn-wish i:nth-of-type(3){--a:120deg}.d-snuf .sn-wish i:nth-of-type(4){--a:180deg}.d-snuf .sn-wish i:nth-of-type(5){--a:240deg}.d-snuf .sn-wish i:nth-of-type(6){--a:300deg}
.d-snuf .sn-body{display:grid;grid-template-rows:auto auto 1fr auto;gap:6px;padding:18px clamp(16px,1.6vw,22px) 18px}
.d-snuf .sn-body small{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--apri-d)}
.d-snuf .sn-body h3{font-size:clamp(19px,1.45vw,22px);line-height:1.15}
.d-snuf .sn-body p{font-size:14.5px;line-height:1.55;color:var(--dim)}
.d-snuf .sn-body footer{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px}
.d-snuf .sn-body footer b{font-family:var(--disp);font-size:22px;font-weight:800;font-variation-settings:"SOFT" 100,"WONK" 1;white-space:nowrap}
.d-snuf .sn-ask{display:grid;flex:none;place-items:center;width:44px;height:44px;margin-left:auto;border-radius:50%;background:var(--green);color:var(--cream);transition:transform .45s var(--boing),background-color .3s}
.d-snuf .sn-ask:hover{transform:rotate(90deg) scale(1.08);background:var(--apri-d)}
.d-snuf .sn-ask svg{width:18px;height:18px}
.d-snuf .sn-note{max-width:70ch;margin:28px auto 0;font-size:14px;text-align:center;color:var(--dim)}
.d-snuf .sn-note::before{content:"✱ ";color:var(--apri-d)}
.d-snuf .sn-story{display:grid;gap:clamp(36px,5vw,80px);align-items:center;padding:clamp(28px,5vw,80px);border-radius:clamp(32px,4vw,56px);background:var(--green);color:var(--cream)}
@media (min-width:980px){.d-snuf .sn-story{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}.d-snuf .sn-story.is-solo{grid-template-columns:minmax(0,1fr);max-width:980px;margin-inline:auto;text-align:center;justify-items:center}}
.d-snuf .sn-story h2{color:var(--cream)}
.d-snuf .sn-story h2 em{color:var(--apri)}
.d-snuf .sn-story .sn-kick{background:rgba(255,246,234,.1);color:var(--cream);box-shadow:none}
.d-snuf .sn-story .sn-kick svg{color:var(--apri)}
.d-snuf .sn-story-pics{position:relative;padding:0 8% 10% 0}
.d-snuf .sn-blob{aspect-ratio:4/5;overflow:hidden;border-radius:46% 54% 42% 58%/52% 44% 56% 48%;animation:sn-morph 16s ease-in-out infinite alternate;background:var(--green2)}
.d-snuf .sn-blob img{width:100%;height:112%;object-fit:cover;transform:translateY(calc(var(--p,0) * -5%))}
.d-snuf .sn-dot{position:absolute;right:0;bottom:0;width:40%;aspect-ratio:1;overflow:hidden;border:8px solid var(--green);border-radius:50%;transform:translateY(calc(var(--p,0) * 24px)) rotate(-4deg)}
.d-snuf .sn-dot img{width:100%;height:100%;object-fit:cover}
.d-snuf .sn-story-copy{display:grid;gap:20px;justify-items:start}
.d-snuf .is-solo .sn-story-copy{justify-items:center}
.d-snuf .sn-story-copy .sn-head{margin-bottom:6px}
.d-snuf .sn-story-copy .sn-lead{font-family:var(--disp);font-size:clamp(21px,1.8vw,27px);font-weight:600;font-variation-settings:"SOFT" 100,"WONK" 0;line-height:1.35}
.d-snuf .sn-story-copy>p:not(.sn-lead){max-width:58ch;color:rgba(255,246,234,.78)}
.d-snuf .sn-ticks{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
.d-snuf .is-solo .sn-ticks{justify-content:center}
.d-snuf .sn-ticks li{display:inline-flex;align-items:center;gap:8px;padding:9px 16px 9px 10px;border-radius:999px;background:var(--apri);color:var(--green);font-weight:600;font-size:14.5px;transition:transform .45s var(--boing)}
.d-snuf .sn-ticks li:hover{transform:rotate(-3deg) translateY(-3px)}
.d-snuf .sn-ticks svg{width:20px;height:20px}
.d-snuf .sn-cards{display:grid;gap:clamp(14px,1.6vw,22px);grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}
.d-snuf .sn-feat{display:grid;gap:14px;align-content:start;height:100%;padding:clamp(24px,2.6vw,36px);border-radius:var(--r);background:var(--white);box-shadow:0 0 0 1px var(--line);transition:transform .5s var(--spring),box-shadow .4s}
.d-snuf .sn-feat:hover{transform:translateY(-6px) rotate(-.6deg);box-shadow:0 26px 44px -30px rgba(24,61,48,.45),0 0 0 1px var(--line)}
.d-snuf .sn-feat-top{display:flex;align-items:center;justify-content:space-between}
.d-snuf .sn-feat-top small{font-family:var(--disp);font-size:20px;font-weight:800;color:var(--apri-d);font-variation-settings:"SOFT" 100,"WONK" 1}
.d-snuf .sn-ico{display:grid;place-items:center;width:62px;height:62px;border-radius:42% 58% 55% 45%/50% 42% 58% 50%;background:var(--apri-l);color:var(--green)}
.d-snuf li:nth-child(3n+2) .sn-ico{background:var(--mint)}
.d-snuf li:nth-child(3n) .sn-ico{background:var(--cream2)}
.d-snuf .sn-ico svg{width:26px;height:26px}
.d-snuf .sn-feat:hover .sn-ico,.d-snuf .sn-chan:hover .sn-ico{animation:sn-wiggle .6s ease-in-out}
.d-snuf .sn-feat p,.d-snuf .sn-chan p{color:var(--dim)}
.d-snuf .sn-boxes{display:grid;gap:clamp(18px,2vw,28px);padding-top:30px;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))}
.d-snuf .sn-box{position:relative;display:grid;gap:14px;align-content:start;height:100%;padding:56px clamp(24px,2.6vw,36px) clamp(26px,2.6vw,36px);border-radius:18px 18px var(--r) var(--r);background:var(--white);box-shadow:0 0 0 1px var(--line);transition:transform .5s var(--spring),box-shadow .4s}
.d-snuf .sn-box:hover{transform:translateY(-6px);box-shadow:0 30px 50px -32px rgba(24,61,48,.45),0 0 0 1px var(--line)}
.d-snuf .sn-lid{position:absolute;left:-8px;right:-8px;top:-14px;z-index:2;height:34px;border-radius:12px;background:var(--green);transform-origin:12% 100%;transition:transform .6s var(--boing)}
.d-snuf .sn-lid::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:26px;margin-left:-13px;background:var(--apri)}
.d-snuf .sn-box:hover .sn-lid{transform:translateY(-12px) rotate(-7deg)}
.d-snuf .sn-peek{position:absolute;left:50%;top:-6px;z-index:1;width:54px;margin-left:-27px;color:var(--apri-d);transform:translateY(30px) rotate(8deg);opacity:0;transition:transform .55s var(--boing) .05s,opacity .2s}
.d-snuf .sn-box:hover .sn-peek{transform:translateY(-36px) rotate(-6deg);opacity:1}
.d-snuf .sn-box.is-featured{background:var(--apri);box-shadow:none}
.d-snuf .sn-box.is-featured .sn-lid::after{background:var(--white)}
.d-snuf .sn-box.is-featured .sn-peek{color:var(--green)}
.d-snuf .sn-box .sn-tagx{position:absolute;right:18px;top:30px;z-index:3;padding:6px 14px;border-radius:999px;background:var(--white);font-size:12.5px;font-weight:600;color:var(--green);transform:rotate(5deg)}
.d-snuf .sn-box h3{font-size:clamp(26px,2.2vw,34px)}
.d-snuf .sn-price{display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 8px}
.d-snuf .sn-price b{font-family:var(--disp);font-size:clamp(36px,3.4vw,50px);font-weight:900;font-variation-settings:"SOFT" 100,"WONK" 1;line-height:1}
.d-snuf .sn-price span{color:var(--dim)}
.d-snuf .sn-box.is-featured .sn-price span,.d-snuf .sn-box.is-featured>p{color:var(--green)}
.d-snuf .sn-box>p{color:var(--dim)}
.d-snuf .sn-box>.sn-price{color:var(--ink)}
.d-snuf .sn-pawlist{display:grid;gap:9px;margin-top:4px}
.d-snuf .sn-pawlist li{display:grid;grid-template-columns:20px minmax(0,1fr);gap:10px;align-items:start;font-size:15px}
.d-snuf .sn-pawlist svg{width:18px;height:18px;margin-top:3px;color:var(--apri-d)}
.d-snuf .is-featured .sn-pawlist svg{color:var(--green)}
.d-snuf .sn-box .btn{margin-top:10px}
.d-snuf .sn-box .sn-alt{background:var(--cream2)}
.d-snuf .sn-box .sn-alt:hover{background:var(--apri-l)}
.d-snuf .sn-box.is-featured .sn-fill{background:var(--green)}
.d-snuf .sn-trail{position:relative;display:grid;gap:clamp(18px,2vw,28px)}
.d-snuf .sn-trail-line{position:absolute;left:31px;top:20px;bottom:20px;width:6px;overflow:visible}
.d-snuf .sn-trail-line line{stroke:var(--apri);stroke-width:4;stroke-linecap:round;stroke-dasharray:.1 12}
.d-snuf .sn-trail-wave{display:none}
.d-snuf .sn-trail ol{position:relative;display:grid;gap:clamp(18px,2vw,28px)}
.d-snuf .sn-step{display:grid;grid-template-columns:68px minmax(0,1fr);gap:18px;align-items:start}
.d-snuf .sn-step>b{position:relative;z-index:1;display:grid;place-items:center;width:68px;height:68px;border-radius:50%;background:var(--green);color:var(--cream);font-family:var(--disp);font-size:26px;font-weight:800;font-variation-settings:"SOFT" 100,"WONK" 1;box-shadow:0 0 0 8px var(--cream2);transition:transform .5s var(--boing),background-color .3s}
.d-snuf .sn-step:hover>b{transform:scale(1.1) rotate(-8deg);background:var(--apri-d)}
.d-snuf .sn-step>div{display:grid;gap:8px;padding:16px 22px 20px;border-radius:24px;background:var(--white)}
.d-snuf .sn-step p{color:var(--dim)}
@media (min-width:980px){.d-snuf .sn-trail-line{display:none}.d-snuf .sn-trail-wave{display:block;position:absolute;left:0;right:0;top:0;width:100%;height:120px;overflow:visible}.d-snuf .sn-trail-wave path{fill:none;stroke-linecap:round;stroke-width:4}.d-snuf .sn-trail-wave .dash{stroke:var(--apri-d);stroke-width:5;stroke-dasharray:.1 16;vector-effect:non-scaling-stroke}.d-snuf .sn-trail-wave .draw{stroke:#fff;stroke-width:10;stroke-dasharray:1;stroke-dashoffset:calc(1 - var(--d,1))}.d-snuf .sn-trail ol{grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:clamp(16px,2vw,30px)}.d-snuf .sn-step{grid-template-columns:minmax(0,1fr);justify-items:center;text-align:center}.d-snuf .sn-step:nth-child(even){margin-top:56px}.d-snuf .sn-step>div{justify-items:center}}
.d-snuf .sn-pola{display:grid;gap:clamp(10px,1.4vw,20px);grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:900px){.d-snuf .sn-pola{grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:clamp(160px,16vw,240px);grid-auto-flow:dense}.d-snuf .sn-pola figure:nth-child(6n+1){grid-column:span 2;grid-row:span 2}.d-snuf .sn-pola figure:nth-child(6n+3){grid-row:span 2}.d-snuf .sn-pola figure:nth-child(6n+5),.d-snuf .sn-pola figure:nth-child(6n+6){grid-column:span 2}.d-snuf .sn-pola figure:last-child:nth-child(6n+5){grid-column:span 4}}
.d-snuf .sn-pola figure{position:relative;min-height:180px;overflow:hidden;border-radius:var(--r);background:var(--cream2);transition:transform .6s var(--spring)}
.d-snuf .sn-pola figure:nth-child(6n+3){border-radius:50% 50% var(--r) var(--r)}
.d-snuf .sn-pola figure:nth-child(6n+5){border-radius:var(--r) 50% var(--r) var(--r)}
.d-snuf .sn-pola figure:hover{transform:rotate(-1.5deg) scale(1.02)}
.d-snuf .sn-pola img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1s var(--ease)}
.d-snuf .sn-pola figure:hover img{transform:scale(1.06)}
.d-snuf .sn-visit{display:grid;gap:clamp(36px,5vw,80px);align-items:start}
@media (min-width:980px){.d-snuf .sn-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-snuf .sn-visit-copy{display:grid;gap:22px;justify-items:start}
.d-snuf .sn-visit-copy .sn-head{margin-bottom:0}
.d-snuf .sn-visit-copy>p{max-width:52ch;color:var(--dim)}
.d-snuf .sn-board{position:relative;padding:clamp(70px,7vw,90px) clamp(22px,3vw,40px) clamp(24px,3vw,40px);border-radius:var(--r);background:var(--green);color:var(--cream);--z-line:rgba(255,246,234,.14);--z-dim:rgba(255,246,234,.75);--z-ink:var(--cream)}
.d-snuf .sn-sign{position:absolute;left:50%;top:-22px;display:grid;justify-items:center;transform-origin:50% 0;transform:translateX(-50%)}
.d-snuf .sn-sign::before{content:"";width:72px;height:36px;margin-bottom:-6px;border:2px solid var(--apri-d);border-bottom:0;border-radius:50% 50% 0 0/100% 100% 0 0}
.d-snuf .sn-sign>span{display:grid;justify-items:center;gap:2px;min-width:170px;padding:10px 20px;border-radius:16px;background:var(--apri);color:var(--green);box-shadow:0 12px 22px -14px rgba(0,0,0,.5);font-family:var(--disp);font-size:22px;font-weight:800;font-variation-settings:"SOFT" 100,"WONK" 1;line-height:1.1;text-align:center}
.d-snuf .sn-sign .sn-now{padding:0;background:none;font-family:var(--body);font-size:13px}
.d-snuf .sn-board:hover .sn-sign,.d-snuf .sn-sign:hover{animation:sn-swing 1.4s ease-in-out}
.d-snuf .sn-board .z-hours{border-top:1px solid var(--z-line)}
.d-snuf .sn-board .z-hours div{align-items:center;padding:14px 12px;border-bottom:1px solid var(--z-line);border-radius:14px}
.d-snuf .sn-board .z-hours dt{font-weight:500}
.d-snuf .sn-board .z-hours dd{color:rgba(255,246,234,.8)}
.d-snuf .z-hours div.is-today{position:relative;border-bottom-color:transparent;background:var(--apri);color:var(--green);font-weight:600}
.d-snuf .z-hours div.is-today dd{color:var(--green)}
.d-snuf .z-reach a{font-weight:600}
.d-snuf .z-reach .z-route{color:var(--apri-d)}
.d-snuf .sn-order{display:grid;gap:clamp(36px,5vw,80px);align-items:start}
@media (min-width:980px){.d-snuf .sn-order{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-snuf .sn-order-copy{display:grid;gap:22px;justify-items:start}
.d-snuf .sn-order-copy .sn-head{margin-bottom:0}
.d-snuf .sn-order-copy>p{max-width:52ch;color:var(--dim)}
.d-snuf .sn-order.is-solo{grid-template-columns:minmax(0,1fr);justify-items:center;text-align:center}
.d-snuf .sn-order.is-solo .sn-order-copy{justify-items:center}
.d-snuf .sn-order.is-solo .z-reach{justify-items:center}
.d-snuf .sn-formcard{position:relative;padding:clamp(24px,3.4vw,48px);border-radius:var(--r);background:var(--white);box-shadow:0 30px 60px -44px rgba(24,61,48,.55),0 0 0 1px var(--line)}
.d-snuf .sn-formcard>.sn-stamp{position:absolute;right:-14px;top:-22px;width:74px;color:var(--apri);transform:rotate(16deg)}
.d-snuf .z-field label,.d-snuf .z-chipset legend{font-size:13px;font-weight:600;letter-spacing:0;text-transform:none;color:var(--green)}
.d-snuf .z-field input,.d-snuf .z-field select,.d-snuf .z-field textarea{border:2px solid transparent;background:var(--cream);transition:border-color .25s,box-shadow .25s,background-color .25s}
.d-snuf .z-field input:hover,.d-snuf .z-field select:hover,.d-snuf .z-field textarea:hover{background:var(--cream2)}
.d-snuf .z-field input:focus,.d-snuf .z-field select:focus,.d-snuf .z-field textarea:focus{border-color:var(--apri);background:var(--white);box-shadow:0 0 0 5px rgba(246,164,108,.25);outline:none}
.d-snuf .z-field :focus-visible{outline:none}
.d-snuf .z-field select{background-image:linear-gradient(45deg,transparent 50%,var(--green) 50%),linear-gradient(135deg,var(--green) 50%,transparent 50%);background-position:calc(100% - 20px) 52%,calc(100% - 14px) 52%;background-size:6px 6px;background-repeat:no-repeat}
.d-snuf .z-form .btn{min-height:58px}
.d-snuf .form-status{border:0;border-radius:16px;background:var(--mint)}
.d-snuf .z-chips button{border-radius:999px}
.d-snuf .sn-faq{max-width:900px;margin-inline:auto}
.d-snuf .sn-acc{display:grid;gap:10px}
.d-snuf .sn-acc details{border-radius:26px;background:var(--white);box-shadow:0 0 0 1px var(--line);transition:box-shadow .3s,background-color .3s}
.d-snuf .sn-acc details[open]{background:var(--white);box-shadow:0 0 0 2px var(--apri)}
.d-snuf .sn-acc summary{display:flex;align-items:center;justify-content:space-between;gap:18px;min-height:64px;padding:16px 16px 16px 26px;font-family:var(--disp);font-size:clamp(18px,1.5vw,22px);font-weight:700;font-variation-settings:"SOFT" 100,"WONK" 0;line-height:1.25;cursor:pointer;list-style:none}
.d-snuf .sn-acc summary::-webkit-details-marker{display:none}
.d-snuf .sn-acc summary i{position:relative;display:grid;flex:none;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--cream2);transition:transform .5s var(--boing),background-color .3s}
.d-snuf .sn-acc summary i::before,.d-snuf .sn-acc summary i::after{content:"";position:absolute;width:16px;height:2.5px;border-radius:2px;background:var(--green)}
.d-snuf .sn-acc summary i::after{transform:rotate(90deg)}
.d-snuf .sn-acc details[open] summary i{transform:rotate(135deg);background:var(--apri)}
.d-snuf .sn-acc summary:hover i{transform:scale(1.1)}
.d-snuf .sn-acc details[open] summary:hover i{transform:rotate(135deg) scale(1.1)}
.d-snuf .sn-acc details>p{max-width:68ch;padding:0 26px 24px;color:var(--dim);animation:sn-up .5s var(--ease)}
.d-snuf .sn-chans{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-snuf .sn-chan{display:grid;gap:12px;align-content:start;height:100%;padding:clamp(22px,2.6vw,32px);border-radius:var(--r);background:var(--white);box-shadow:0 0 0 1px var(--line);transition:transform .5s var(--spring),box-shadow .3s}
.d-snuf .sn-chan:hover{transform:translateY(-6px) rotate(-.8deg);box-shadow:0 26px 44px -30px rgba(24,61,48,.45),0 0 0 1px var(--line)}
.d-snuf .sn-statement{text-align:center}
.d-snuf .sn-statement .sn-wrap{display:grid;justify-items:center;gap:26px}
.d-snuf .sn-statement h2{max-width:22ch;font-size:clamp(34px,4.6vw,72px);line-height:1.06}
.d-snuf .sn-statement .sn-trailpaws{display:flex;gap:16px;color:var(--apri-d)}
.d-snuf .sn-trailpaws svg{width:26px;height:26px;opacity:0;transform:scale(.4) rotate(var(--r,0deg))}
.d-snuf .sn-trailpaws svg:nth-child(odd){--r:-18deg;margin-top:12px}
.d-snuf .sn-trailpaws svg:nth-child(even){--r:14deg}
.d-snuf .sn-trailpaws.in svg,html:not(.demo-js) .d-snuf .sn-trailpaws svg{opacity:1;transform:scale(1) rotate(var(--r,0deg));transition:opacity .3s,transform .5s var(--boing);transition-delay:calc(var(--i,0) * 180ms)}
.demo-js .d-snuf .sn-trailpaws[data-rv]{opacity:1;transform:none}
.d-snuf .z-sec.z-cta{margin:0 var(--pad);border-radius:clamp(32px,4vw,56px);background:var(--apri)}
.d-snuf .z-cta h2{font-size:clamp(40px,5.4vw,84px);color:var(--green)}
.d-snuf .z-cta .z-center>p{color:var(--green)}
.d-snuf .z-card,.d-snuf .z-panel{border:0;box-shadow:0 0 0 1px var(--line);background:var(--white)}
.d-snuf .z-pack.is-featured{background:var(--apri);box-shadow:none}
.d-snuf .z-pic{border-radius:var(--r)}
.d-snuf .z-grid>li{padding:clamp(22px,2.4vw,30px);border-radius:var(--r);background:var(--white);box-shadow:0 0 0 1px var(--line)}
.d-snuf .z-grid h3,.d-snuf .z-rows h3,.d-snuf .z-steps h3{font-weight:800}
.d-snuf .z-ico{border:0;background:var(--apri-l);color:var(--green)}
.d-snuf .z-rows small,.d-snuf .z-steps small{font-family:var(--disp);font-size:22px;font-weight:800;letter-spacing:0;color:var(--apri-d)}
.d-snuf .z-quotes blockquote{padding:28px;border:0;border-radius:var(--r);background:var(--white)}
.d-snuf .z-statement h2{font-weight:800}
.d-snuf .z-showcase{margin:0 var(--pad);border-radius:clamp(32px,4vw,56px)}
.d-snuf .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(24,61,48,0),rgba(24,61,48,.8))}
.d-snuf .z-show-in .sn-alt{background:var(--apri)}
.d-snuf .z-acc summary{font-family:var(--disp);font-weight:700}
.d-snuf .z-ba{border-radius:var(--r)}
.d-snuf .sn-foot{position:relative;margin-top:clamp(60px,8vw,120px);padding:clamp(70px,9vw,130px) 0 130px;border-radius:clamp(36px,5vw,72px) clamp(36px,5vw,72px) 0 0;background:var(--green);color:rgba(255,246,234,.78);overflow:hidden}
.d-snuf .sn-foot-top{display:grid;gap:22px;justify-items:start}
.d-snuf .sn-foot-top>p{max-width:46ch}
.d-snuf .sn-foot-name{font-family:var(--disp);font-size:min(16vw,210px,calc(180vw / var(--n,8)));font-weight:900;font-variation-settings:"SOFT" 100,"WONK" 1;line-height:.92;letter-spacing:-.03em;color:var(--cream);word-break:break-word}
.d-snuf .sn-foot-name span{display:inline-block;color:var(--apri);transition:transform .6s var(--boing)}
.d-snuf .sn-foot-name:hover span{transform:rotate(-8deg) translateY(-6px)}
.d-snuf .sn-foot-top .btn{background:var(--apri);color:var(--green)}
.d-snuf .sn-foot-grid{display:grid;gap:32px;margin-top:clamp(44px,6vw,80px);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-snuf .sn-foot-grid h3{margin-bottom:12px;font-family:var(--disp);font-size:22px;font-weight:800;color:var(--apri)}
.d-snuf .sn-foot-grid a,.d-snuf .sn-foot-grid span{display:block;padding:4px 0}
.d-snuf .sn-foot-grid a{min-height:36px;color:var(--cream);transition:transform .45s var(--boing),color .25s}
.d-snuf .sn-foot-grid a:hover{color:var(--apri);transform:translateX(6px) rotate(-1deg)}
.d-snuf .sn-foot .sn-trailpaws{position:absolute;right:var(--pad);top:clamp(40px,6vw,80px);color:rgba(246,164,108,.55)}
.d-snuf .sn-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:52px;padding-top:22px;border-top:1px solid rgba(255,246,234,.16);font-size:13px}
@keyframes sn-pop{to{opacity:1;transform:none}}
@keyframes sn-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes sn-tile{from{opacity:0;transform:translateY(40px) scale(.94)}to{opacity:1;transform:none}}
@keyframes sn-unzoom{to{scale:1}}
@keyframes sn-mark{to{background-size:100% 100%}}
@keyframes sn-bubble{from{opacity:0;transform:scale(.3) rotate(-10deg)}to{opacity:1;transform:none}}
@keyframes sn-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-7deg)}40%{transform:rotate(6deg)}60%{transform:rotate(-4deg)}80%{transform:rotate(2deg)}}
@keyframes sn-wag{0%,100%{transform:rotate(0)}25%{transform:rotate(-16deg)}75%{transform:rotate(16deg)}}
@keyframes sn-ear-l{0%,100%{transform:rotate(0)}50%{transform:rotate(-22deg)}}
@keyframes sn-ear-r{0%,100%{transform:rotate(0)}50%{transform:rotate(22deg)}}
@keyframes sn-heart{0%{transform:scale(.6)}60%{transform:scale(1.3)}100%{transform:scale(1)}}
@keyframes sn-burst{0%{opacity:1;transform:rotate(var(--a)) translateY(0) scale(1)}100%{opacity:0;transform:rotate(var(--a)) translateY(-30px) scale(.3)}}
@keyframes sn-bump{0%{transform:scale(1)}40%{transform:scale(1.25) rotate(-10deg)}100%{transform:scale(1)}}
@keyframes sn-press{0%{transform:scale(.92)}100%{transform:scale(1)}}
@keyframes sn-morph{0%{border-radius:46% 54% 42% 58%/52% 44% 56% 48%}50%{border-radius:58% 42% 52% 48%/44% 56% 44% 56%}100%{border-radius:42% 58% 48% 52%/56% 48% 52% 44%}}
@keyframes sn-swing{0%,100%{transform:translateX(-50%) rotate(0)}20%{transform:translateX(-50%) rotate(7deg)}45%{transform:translateX(-50%) rotate(-5deg)}70%{transform:translateX(-50%) rotate(3deg)}85%{transform:translateX(-50%) rotate(-1deg)}}
@media (max-width:420px){.d-snuf .sn-burger{width:52px;padding:0;justify-content:center}.d-snuf .sn-burger span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}}
@media (max-width:620px){.d-snuf .sn-pillbar{min-height:62px;padding:6px 6px 6px 8px}.d-snuf .sn-mark{width:44px;height:44px}.d-snuf .sn-burger{padding:0 16px}.d-snuf .sn-t-main{min-height:0;padding-top:24px}.d-snuf .sn-t-main .sn-paw{display:none}.d-snuf .sn-hero-top{max-width:none}.d-snuf .sn-ctas .btn{flex:1 1 auto}.d-snuf .sn-story{margin-inline:calc(-1 * var(--pad) + 8px)}}
@media (prefers-reduced-motion:reduce){.d-snuf .sn-ch{opacity:1;transform:none;animation:none}.d-snuf .sn-bento>*,.d-snuf .sn-lede,.d-snuf .sn-ctas,.d-snuf .sn-bubble{animation:none}.d-snuf .sn-t-pic img{scale:1;animation:none}.d-snuf .sn-hero h1 em{background-size:100% 100%;animation:none}.d-snuf .sn-blob{animation:none}.d-snuf .sn-trailpaws svg{opacity:1;transform:none}.d-snuf .sn-card{transform:none}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * Filter chips, wishlist hearts (with the count in the header), card tilt and magnetic buttons
 * on a fine pointer, and the trail between the steps drawn by scrolling.
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-snuf');if(!root)return;var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches,fine=W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches;
q('[data-shop]').forEach(function(shop){var grid=shop.querySelector('.sn-grid'),items=q('.sn-prod',shop),bs=q('.sn-filter button',shop);
function pick(f){bs.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-f')===f?'true':'false')});items.forEach(function(it){var on=f==='all'||it.getAttribute('data-cat')===f;clearTimeout(it._t);if(on){it.classList.remove('is-gone');requestAnimationFrame(function(){requestAnimationFrame(function(){it.classList.remove('is-out')})})}else{it.classList.add('is-out');it._t=setTimeout(function(){it.classList.add('is-gone')},reduce?0:320)}})}
bs.forEach(function(b){b.addEventListener('click',function(){pick(b.getAttribute('data-f'))})});shop._pick=pick});
q('[data-go]').forEach(function(a){a.addEventListener('click',function(){var t=d.getElementById((a.getAttribute('href')||'').slice(1));if(t&&t._pick)t._pick(a.getAttribute('data-go'))})});
var wl=root.querySelector('.sn-wish-link'),wc=wl&&wl.querySelector('b');
function count(){var n=q('.sn-wish[aria-pressed="true"]').length;if(!wl)return;wc.textContent=n;wl.classList.toggle('has',n>0);wl.classList.remove('bump');void wl.offsetWidth;wl.classList.add('bump')}
q('.sn-wish').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();var on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on?'true':'false');b.classList.remove('is-burst');if(on&&!reduce){void b.offsetWidth;b.classList.add('is-burst')}count()})});
if(fine&&!reduce){q('.sn-card').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.classList.add('is-tilt');c.style.setProperty('--ry',(x*9).toFixed(2)+'deg');c.style.setProperty('--rx',(-y*7).toFixed(2)+'deg')});c.addEventListener('mouseleave',function(){c.classList.remove('is-tilt');c.style.removeProperty('--rx');c.style.removeProperty('--ry')})});
q('.sn-mag').forEach(function(m){m.addEventListener('mousemove',function(e){var r=m.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;m.style.transform='translate('+(x*.18).toFixed(1)+'px,'+(y*.28).toFixed(1)+'px)'});m.addEventListener('mouseleave',function(){m.style.transform=''})})}
var trails=reduce?[]:q('[data-trail]'),raf=0;trails.forEach(function(t){t.style.setProperty('--d','0')});
function frame(){raf=0;var vh=W.innerHeight;trails.forEach(function(t){var r=t.getBoundingClientRect(),p=(vh*.85-r.top)/(r.height+vh*.25);t.style.setProperty('--d',Math.max(0,Math.min(1,p)).toFixed(3))})}
if(trails.length){W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(frame)},{passive:true});W.addEventListener('resize',frame);frame()}})();`;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const Heart = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.7 4 7.2 4c2 0 3.6 1.1 4.8 2.8C13.2 5.1 14.8 4 16.8 4c3.5 0 5.8 3.6 4.5 7.1-1.8 4.8-9.3 9.4-9.3 9.4Z" strokeLinejoin="round" />
  </svg>
);

/** A paw print: four toes and a pad. Used sparingly. */
const Paw = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
    <ellipse cx="14" cy="27" rx="6.5" ry="8.5" transform="rotate(-18 14 27)" />
    <ellipse cx="26" cy="15" rx="6.5" ry="9" transform="rotate(-6 26 15)" />
    <ellipse cx="40" cy="15" rx="6.5" ry="9" transform="rotate(8 40 15)" />
    <ellipse cx="51" cy="28" rx="6.5" ry="8.5" transform="rotate(20 51 28)" />
    <path d="M32 31c-8 0-17 10-17 18 0 6 5 9 10 8 3-.5 4.5-2 7-2s4 1.5 7 2c5 1 10-2 10-8 0-8-9-18-17-18Z" />
  </svg>
);

/** The little dog of the logo: its ears flap when you point at it. */
const Mark = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <path className="ear ear-l" d="M9 8c-5 1-7 9-5 15 1 3 4 3 5 0l3-10c1-3-1-5-3-5Z" fill="currentColor" />
    <path className="ear ear-r" d="M31 8c5 1 7 9 5 15-1 3-4 3-5 0l-3-10c-1-3 1-5 3-5Z" fill="currentColor" />
    <path d="M20 7c-6.5 0-10 4.6-10 11.5C10 27 14.3 33 20 33s10-6 10-14.5C30 11.6 26.5 7 20 7Z" fill="#fffdf8" />
    <circle cx="16" cy="18" r="1.8" fill="currentColor" />
    <circle cx="24" cy="18" r="1.8" fill="currentColor" />
    <path d="M17.6 24c0-1.3 1.1-2 2.4-2s2.4.7 2.4 2c0 1.2-1.2 2.2-2.4 2.2s-2.4-1-2.4-2.2Z" fill="currentColor" />
  </svg>
);

/* Doodles for products without a photograph, one per category: bone, fish, comb, ball. */
const ART: ReactNode[] = [
  <path key="bone" d="M18 26a8 8 0 1 1 10-10l20 20a8 8 0 1 1 10 10 8 8 0 1 1-10 10L28 36a8 8 0 1 1-10-10Z" />,
  <path key="fish" d="M8 32c8-12 22-16 34-10l10-8v36l-10-8C30 48 16 44 8 32Zm14-2.5a2.5 2.5 0 1 0 0 .01" />,
  <path key="comb" d="M10 20h44v10H10zM14 30v18M21 30v18M28 30v18M35 30v18M42 30v18M49 30v18" />,
  <path key="ball" d="M32 8a24 24 0 1 0 0 48 24 24 0 0 0 0-48ZM10 26c10 4 34 4 44 0M10 38c10-4 34-4 44 0" />,
];

/** Which doodle a shelf gets, from its own name: dogs, cats, care, toys. Other shelves get a letter. */
const artOf = (name: string) => {
  const t = name.toLowerCase();
  if (/hond|dog|hund|chien|puppy|pup/.test(t)) return 0;
  if (/kat|cat|katze|chat|kitten/.test(t)) return 1;
  if (/verzorg|care|pflege|soin|groom|trim|vacht/.test(t)) return 2;
  if (/speel|toy|spiel|jouet|play/.test(t)) return 3;
  return -1;
};

const Art = ({ shelf, item }: { shelf: string; item: string }) => {
  const k = artOf(shelf);
  if (k < 0)
    return (
      <b className="sn-letter" aria-hidden="true">
        {item.charAt(0)}
      </b>
    );
  return (
    <svg className="sn-art" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ART[k]}
    </svg>
  );
};

const WORDS: Record<string, { all: string; save: string; explore: string }> = {
  nl: { all: "Alles", save: "Bewaar", explore: "Snuffel rond" },
  en: { all: "All", save: "Save", explore: "Have a sniff around" },
  de: { all: "Alle", save: "Merken", explore: "Stöbern" },
  fr: { all: "Tout", save: "Garder", explore: "Explorer" },
};
const words = (c: Ctx) => WORDS[c.spec.meta.lang] ?? WORDS.nl;

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="sn-kick" data-rv>
    <Paw />
    {children}
  </p>
);

function Head({ kicker, title, intro, id, center }: HeadProps & { center?: boolean }) {
  return (
    <header className={`sn-head${center ? " is-center" : ""}`}>
      {kicker ? <Kick>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

/** The headline as letters that hop in one after another; words never break apart. */
function Letters({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let n = 0;
  text.split(/\*([^*]+)\*/).forEach((chunk, k) => {
    const ws = chunk.split(/\s+/).filter(Boolean);
    const group = ws.map((w, j) => (
      <span key={`${k}-${j}`}>
        <span className="sn-word">
          {[...w].map((ch) => (
            <span key={n} className="sn-ch" style={i(n++)}>
              {ch}
            </span>
          ))}
        </span>
        {j < ws.length - 1 ? " " : null}
      </span>
    ));
    if (!ws.length) return;
    if (out.length) out.push(" ");
    out.push(k % 2 ? <em key={`e${k}`}>{group}</em> : <span key={`s${k}`}>{group}</span>);
  });
  return <>{out}</>;
}

/** Product photographs are named after their place on the shelf: art:menu<category>-<item>. */
const shelfRef = (cat: number, item: number) => `art:menu${cat}-${item}`;

/** Reserve the product photographs, so extras handed out elsewhere never take one of them. */
function reserveShelf(c: Ctx) {
  c.spec.sections.forEach((s) => {
    if (s.type === "menu") s.categories.forEach((cat, n) => cat.items.forEach((_, m) => c.photo(shelfRef(n, m))));
  });
}

const orderHref = (c: Ctx) => {
  const s = c.spec.sections.find((x) => x.type === "booking") ?? c.spec.sections.find((x) => x.type === "contact");
  return s ? `#${s.id}` : null;
};

/** The words on a link to the order form: the opening's own button when it goes there too. */
const orderLabel = (c: Ctx) => {
  const s = c.spec.sections.find((x) => x.type === "booking");
  if (c.spec.hero.primaryCta.href === orderHref(c)) return c.spec.hero.primaryCta.label;
  return s && s.type === "booking" ? c.t.submit[s.kind] : c.t.contact;
};

/** Quick links for the opening tile: the shelves of the menu, or the services. */
function shelves(c: Ctx): { label: string; href: string; go?: string }[] {
  const menu = c.spec.sections.find((s) => s.type === "menu");
  if (menu && menu.type === "menu") {
    const cats = menu.categories.filter((cat) => cat.items.length);
    if (cats.length > 1) return cats.slice(0, 6).map((cat) => ({ label: cat.name, href: `#${menu.id}`, go: String(menu.categories.indexOf(cat)) }));
  }
  const svc = c.spec.sections.find((s) => s.type === "services");
  return svc ? offerWords(c, 6).map((w) => ({ label: w, href: `#${svc.id}` })) : [];
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const menu = c.spec.sections.find((s) => s.type === "menu");
  return (
    <>
      <header className="sn-hdr hdr">
        <div className="sn-wrap">
          <div className="sn-pillbar">
            <a href="#top" className="sn-logo" aria-label={c.name}>
              <i className="sn-mark">
                <Mark />
              </i>
              <span>{c.name}</span>
            </a>
            <nav aria-label={c.t.menu} className="sn-links" data-nav>
              {c.nav.slice(0, 4).map((n) => (
                <a key={n.id} href={`#${n.id}`}>
                  {n.label}
                </a>
              ))}
            </nav>
            {menu ? (
              <a href={`#${menu.id}`} className="sn-wish-link" aria-label={words(c).save}>
                <Heart />
                <b aria-hidden="true">0</b>
              </a>
            ) : null}
            <a href={cta.href} className="btn sn-fill sn-hcta">
              {cta.label}
            </a>
            <button type="button" className="sn-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
              <span data-label data-open={c.t.menu} data-close={c.t.close}>
                {c.t.menu}
              </span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div className="sn-scrim" aria-hidden="true" />
      <div id="site-menu" className="sn-sheet" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <Paw />
              {n.label}
            </a>
          ))}
        </nav>
        <a href={cta.href} className="btn">
          {cta.label} <Arrow />
        </a>
        <div className="sn-sheet-foot">
          <NowBadge c={c} className="sn-now" />
          {b.city || b.address ? <span>{b.address ?? b.city}</span> : null}
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  reserveShelf(c);
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 46 ? "is-s" : plain.length > 26 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const links = shelves(c);
  const icon = (label: string) => (label === c.t.address ? "map" : label === c.t.hours ? "clock" : "phone");
  const note = hero.note;
  return (
    <section className="sn-hero">
      <div className={`sn-wrap sn-bento${facts.length ? "" : " no-facts"}${links.length ? "" : " no-cats"}`}>
        <div className="sn-tile sn-t-main" style={i(0)}>
          <Paw className="sn-paw" />
          <div className="sn-hero-top">
            {hero.eyebrow ? <span className="sn-kick">{hero.eyebrow}</span> : null}
            <NowBadge c={c} className="sn-now" />
          </div>
          <h1 className={size}>
            <Letters text={hero.headline} />
          </h1>
          <p className="sn-lede">{hero.subheadline}</p>
          <div className="sn-ctas">
            <a href={hero.primaryCta.href} className="btn sn-fill sn-mag">
              {hero.primaryCta.label} <Arrow />
            </a>
            {hero.secondaryCta ? (
              <a href={hero.secondaryCta.href} className="btn sn-alt sn-mag">
                {hero.secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
        {p ? (
          <figure className="sn-tile sn-t-pic" style={i(1)}>
            <Pic p={p} eager sizes="(min-width: 1020px) 34vw, 100vw" />
            {note ? (
              <figcaption className="sn-bubble" aria-hidden="true">
                {note}
              </figcaption>
            ) : null}
          </figure>
        ) : (
          <div className="sn-tile sn-t-pic sn-empty" style={i(1)} aria-hidden="true">
            <Paw />
            <b>{c.name.charAt(0)}</b>
            {note ? <span className="sn-bubble">{note}</span> : null}
          </div>
        )}
        {facts.length ? (
          <dl className="sn-tile sn-t-facts" style={i(2)}>
            {facts.map((f) => (
              <div key={f.label}>
                <span aria-hidden="true">
                  <Icon name={icon(f.label)} />
                </span>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {links.length ? (
          <nav className="sn-tile sn-t-cats" style={i(3)} aria-label={words(c).explore}>
            <p>{words(c).explore}</p>
            <div className="sn-chiplinks">
              {links.map((l) => (
                <a key={l.label} href={l.href} data-go={l.go}>
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const name = c.name;
  return (
    <footer className="sn-foot">
      <div className="sn-trailpaws" data-rv aria-hidden="true">
        {[0, 1, 2, 3].map((n) => (
          <Paw key={n} style={i(n)} />
        ))}
      </div>
      <div className="sn-wrap">
        <div className="sn-foot-top">
          <p className="sn-foot-name" aria-hidden="true" style={{ ["--n" as string]: Math.max(5, name.length) }}>
            {name.slice(0, -1)}
            <span>{name.slice(-1)}</span>
          </p>
          {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
          <a href={cta.href} className="btn">
            {cta.label} <Arrow />
          </a>
        </div>
        <div className="sn-foot-grid">
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
        <Legal c={c} className="sn-legal" />
      </div>
    </footer>
  );
}

/** A wavy line that runs behind the steps on wide screens, dotted, drawn as you scroll. */
function Wave({ id, n }: { id: string; n: number }) {
  const w = 1000;
  const seg = w / Math.max(1, n);
  let d = `M ${seg / 2} 34`;
  for (let k = 1; k < n; k++) {
    const x0 = seg / 2 + (k - 1) * seg;
    const x1 = x0 + seg;
    const y0 = k % 2 ? 34 : 90;
    const y1 = k % 2 ? 90 : 34;
    d += ` C ${x0 + seg / 2} ${y0}, ${x1 - seg / 2} ${y1}, ${x1} ${y1}`;
  }
  return (
    <svg className="sn-trail-wave" viewBox={`0 0 ${w} 120`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <mask id={`${id}-m`} maskUnits="userSpaceOnUse" x="-20" y="-20" width={w + 40} height="160">
          <path className="draw" d={d} pathLength={1} />
        </mask>
      </defs>
      <path className="dash" d={d} mask={`url(#${id}-m)`} />
    </svg>
  );
}

export const snuf: Family = {
  key: "snuf",
  root: "d-snuf",
  fonts: ["Fraunces Soft", "Poppins"],
  themeColor: "#fff6ea",
  accent: "#f6a46c",
  onAccent: "#183d30",
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "sn-wrap", eyebrow: "sn-kick", btn: "sn-fill", btnAlt: "sn-alt", btnText: "sn-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    menu: (s, c) => {
      const cats = s.categories.map((cat, n) => ({ ...cat, n })).filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      const w = words(c);
      const ask = orderHref(c);
      const total = cats.reduce((a, cat) => a + cat.items.length, 0);
      let k = 0;
      return (
        <section className="sn-sec" id={s.id} data-shop>
          <div className="sn-wrap">
            <Head kicker={cats.length > 1 ? cats.slice(0, 3).map((cat) => cat.name).join(" · ") : c.t.kick.menu} title={s.title} intro={s.intro} center />
            {cats.length > 1 ? (
              <div className="sn-filter" role="group" aria-label={s.title.replace(/\*/g, "")} data-rv>
                <button type="button" aria-pressed="true" data-f="all">
                  {w.all} <sup>{total}</sup>
                </button>
                {cats.map((cat) => (
                  <button key={cat.n} type="button" aria-pressed="false" data-f={String(cat.n)}>
                    {cat.name} <sup>{cat.items.length}</sup>
                  </button>
                ))}
              </div>
            ) : null}
            <ul className="sn-grid">
              {cats.flatMap((cat) =>
                cat.items.map((d, m) => {
                  const p = c.photo(shelfRef(cat.n, m));
                  const n = k++;
                  return (
                    <li key={`${cat.n}-${m}`} className="sn-prod" data-cat={cat.n}>
                      <article className="sn-card" data-rv style={i(n % 4)}>
                        <div className={`sn-pic t${cat.n % 4}`}>
                          {p ? <Pic p={p} sizes="(min-width: 1180px) 22vw, (min-width: 900px) 30vw, (min-width: 480px) 46vw, 92vw" /> : <Art shelf={cat.name} item={d.name} />}
                          {d.tags?.[0] ? <span className="sn-sticker">{d.tags[0]}</span> : null}
                          <button type="button" className="sn-wish" aria-pressed="false" aria-label={`${w.save}: ${d.name}`}>
                            <Heart />
                            <i />
                            <i />
                            <i />
                            <i />
                            <i />
                            <i />
                          </button>
                        </div>
                        <div className="sn-body">
                          <small>{cat.name}</small>
                          <h3>{d.name}</h3>
                          {d.description ? <p>{d.description}</p> : <span />}
                          <footer>
                            {d.price ? <b>{d.price}</b> : null}
                            {ask ? (
                              <a href={ask} className="sn-ask" aria-label={`${orderLabel(c)}: ${d.name}`}>
                                <Plus />
                              </a>
                            ) : null}
                          </footer>
                        </div>
                      </article>
                    </li>
                  );
                }),
              )}
            </ul>
            {s.note ? (
              <p className="sn-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    about: (s, c) => {
      reserveShelf(c);
      const a = c.photo(s.image);
      const b = a ? (c.photo("art:about2") ?? c.spare()) : null;
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="sn-sec" id={s.id}>
          <div className="sn-wrap">
            <div className={`sn-story${a ? "" : " is-solo"}`}>
              {a ? (
                <div className="sn-story-pics" data-rv>
                  <figure className="sn-blob" data-px>
                    <Pic p={a} sizes="(min-width: 980px) 38vw, 90vw" />
                  </figure>
                  {b ? (
                    <figure className="sn-dot" data-px>
                      <Pic p={b} sizes="(min-width: 980px) 16vw, 36vw" />
                    </figure>
                  ) : null}
                </div>
              ) : null}
              <div className="sn-story-copy">
                <Head kicker={c.t.kick.about} title={s.title} center={!a} />
                <p className="sn-lead" data-rv>
                  {first}
                </p>
                {rest.map((x, n) => (
                  <p key={n} data-rv>
                    {x}
                  </p>
                ))}
                {s.highlights.length ? (
                  <ul className="sn-ticks" data-rv>
                    {s.highlights.map((h) => (
                      <li key={h}>
                        <Paw />
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      );
    },
    services: (s, c) => (
      <section className="sn-sec is-tint" id={s.id}>
        <div className="sn-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} center />
          <ul className="sn-grid is-svc">
            {s.items.map((it, n) => {
              const p = c.photo(`art:svc${n}`);
              return (
                <li key={n}>
                  <article className="sn-card" data-rv style={i(n % 4)}>
                    <div className={`sn-pic t${n % 4}${p ? "" : " is-icon"}`}>
                      {p ? (
                        <Pic p={p} sizes="(min-width: 1180px) 22vw, (min-width: 900px) 30vw, 46vw" />
                      ) : (
                        <span className="sn-bigico" aria-hidden="true">
                          <Icon name={it.icon} />
                        </span>
                      )}
                    </div>
                    <div className="sn-body">
                      <small>{[it.duration, it.price].filter(Boolean).join(" · ") || " "}</small>
                      <h3>{it.title}</h3>
                      <p>{it.description}</p>
                      <span />
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    features: (s, c) => (
      <section className="sn-sec" id={s.id}>
        <div className="sn-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} center />
          <ul className="sn-cards">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <div className="sn-feat">
                  <div className="sn-feat-top">
                    <span className="sn-ico" aria-hidden="true">
                      <Icon name={it.icon} />
                    </span>
                    <small aria-hidden="true">{String(n + 1).padStart(2, "0")}</small>
                  </div>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    packages: (s, c) => {
      const ask = orderHref(c);
      return (
        <section className="sn-sec is-tint" id={s.id}>
          <div className="sn-wrap">
            <Head kicker={c.t.kick.packages} title={s.title} intro={s.intro} center />
            <ul className="sn-boxes">
              {s.items.map((it, n) => (
                <li key={n} data-rv style={i(n % 3)}>
                  <div className={`sn-box${it.featured ? " is-featured" : ""}`}>
                    <Paw className="sn-peek" />
                    <span className="sn-lid" aria-hidden="true" />
                    {it.featured ? <small className="sn-tagx">{c.t.popular}</small> : null}
                    <h3>{it.name}</h3>
                    <p className="sn-price">
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
                    {it.features.length ? (
                      <ul className="sn-pawlist">
                        {it.features.map((f) => (
                          <li key={f}>
                            <Paw />
                            {f}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {ask ? (
                      <Btn c={c} href={ask} variant={it.featured ? "fill" : "alt"}>
                        {orderLabel(c)} <Arrow />
                      </Btn>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
            {s.note ? (
              <p className="sn-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    process: (s, c) => (
      <section className="sn-sec is-tint" id={s.id}>
        <div className="sn-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} center />
          <div className="sn-trail" data-trail style={{ ["--n" as string]: s.steps.length }}>
            <Wave id={`${s.id}-w`} n={s.steps.length} />
            <svg className="sn-trail-line" aria-hidden="true">
              <line x1="3" y1="0" x2="3" y2="100%" />
            </svg>
            <ol>
              {s.steps.map((st, n) => (
                <li key={n} className="sn-step" data-rv style={i(n)}>
                  <b aria-hidden="true">{n + 1}</b>
                  <div>
                    <h3>{st.title}</h3>
                    <p>{st.description}</p>
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
        <section className="sn-sec" id={s.id}>
          <div className="sn-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} center />
            <div className="sn-pola">
              {pics.slice(0, 6).map((p, n) => (
                <figure key={n} data-rv style={i(n % 3)}>
                  <Pic p={p} sizes="(min-width: 900px) 40vw, 48vw" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    statement: (s) => (
      <section className="sn-sec sn-statement" id={s.id}>
        <div className="sn-wrap">
          <div className="sn-trailpaws" data-rv aria-hidden="true">
            {[0, 1, 2, 3, 4].map((n) => (
              <Paw key={n} style={i(n)} />
            ))}
          </div>
          <h2 data-rv>{em(s.title)}</h2>
          {s.note ? <Kick>{s.note}</Kick> : null}
        </div>
      </section>
    ),
    hours: (s, c) => (
      <section className="sn-sec" id={s.id}>
        <div className="sn-wrap sn-visit">
          <div className="sn-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="sn-board" data-rv>
            <div className="sn-sign">
              <span>
                {c.t.hours}
                <NowBadge c={c} className="sn-now" />
              </span>
            </div>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="sn-sec is-tint" id={s.id}>
        <div className="sn-wrap sn-order">
          <div className="sn-order-copy">
            <Head kicker={s.kind === "order" ? c.t.kick.order : c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours") ? <Hours c={c} /> : null}
          </div>
          <div className="sn-formcard" data-rv>
            <Paw className="sn-stamp" />
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="sn-sec is-tint" id={s.id}>
        <div className={`sn-wrap sn-order${s.showForm ? "" : " is-solo"}`}>
          <div className="sn-order-copy">
            <Head kicker={c.t.kick.contact} title={s.title} center={!s.showForm} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="sn-formcard" data-rv>
              <Paw className="sn-stamp" />
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : null}
        </div>
      </section>
    ),
    faq: (s, c) => (
      <section className="sn-sec" id={s.id}>
        <div className="sn-wrap sn-faq">
          <Head kicker={c.t.kick.faq} title={s.title} center />
          <div className="sn-acc" data-acc>
            {s.items.map((it, n) => (
              <details key={n} data-rv style={i(n % 4)}>
                <summary>
                  <span>{it.q}</span>
                  <i aria-hidden="true" />
                </summary>
                <p>{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="sn-sec" id={s.id}>
        <div className="sn-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} center />
          <ul className="sn-chans">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} className="sn-chan" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="sn-ico" aria-hidden="true">
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
