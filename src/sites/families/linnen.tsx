import type { ReactNode } from "react";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, splitLines, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Linnen: an original template (no portfolio demo). Calm, warm Scandinavian minimalism:
 * oatmeal, linen, oak, stone and clay with one deep moss accent; a light, sharp display serif
 * (Fraunces at its largest optical size, without the soft corners) over a quiet humanist sans.
 * Sections are soft rooms with rounded corners floating on the oatmeal page; photographs are
 * placed asymmetrically and open slowly out of a pebble-shaped mask. The headline arrives line
 * by line through a feathered wipe, as if light moves across it. Signature details: a material
 * palette (the offer as swatches of linen, oak, stone, clay, wool and moss that each reveal
 * their photograph) and a project slider that is dragged, with a drag cursor on desktop.
 * Made for interior designers, home and furniture shops, florists, ceramic and design studios,
 * small hotels and other businesses where atmosphere is the product.
 */

const SWATCHES = 6;

const CSS = `
.d-linnen{--bg:#efe9e0;--sand:#e5dccd;--paper:#f8f4ed;--stone:#d3c8b6;--oak:#b08a5e;--clay:#c09a7e;--ink:#2a2622;--ink-2:#463f38;--dim:#73695e;--moss:#4c583c;--moss-d:#3b4530;--moss-l:#a9b38f;--line:rgba(42,38,34,.14);--pad:clamp(20px,5vw,84px);--r:clamp(18px,2.2vw,30px);--room:clamp(26px,3.4vw,52px);--ease:cubic-bezier(.22,.8,.24,1);--slow:cubic-bezier(.7,0,.2,1);--serif:"Fraunces Soft",Georgia,serif;--sans:"Hanken Grotesk",system-ui,sans-serif;--z-bg2:var(--paper);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--moss);--z-on-accent:#f8f4ed;--z-display:var(--serif);--z-radius:var(--r);--z-field-radius:14px;--z-ico-radius:44% 56% 52% 48% / 52% 44% 56% 48%;--z-sec:clamp(88px,11vw,170px);--z-h3:clamp(23px,2vw,30px);--z-statement:clamp(34px,4.6vw,76px);--z-display-weight:300;background:var(--bg);color:var(--ink);font-family:var(--sans);font-weight:400;font-size:clamp(16px,1.04vw,18px);line-height:1.68}
.d-linnen h1,.d-linnen h2,.d-linnen h3,.d-linnen .ln-serif{font-family:var(--serif);font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;line-height:1.02;letter-spacing:-.018em}
.d-linnen h1 em,.d-linnen h2 em{font-style:italic;color:var(--moss)}
.d-linnen h2{font-size:clamp(38px,4.8vw,78px)}
.d-linnen h2.is-long{font-size:clamp(31px,3.5vw,56px);line-height:1.08}
.d-linnen h3{font-size:var(--z-h3);line-height:1.12}
.d-linnen ::selection{background:var(--moss);color:var(--paper)}
.d-linnen .ln-wrap{position:relative;width:min(100%,1480px);margin-inline:auto;padding-inline:var(--pad)}
.d-linnen .ln-kick{display:inline-flex;align-items:center;gap:12px;font-size:12px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--dim)}
.d-linnen .ln-kick::before{content:"";flex:none;width:11px;height:11px;border-radius:50%;background:var(--moss);box-shadow:0 0 0 4px rgba(76,88,60,.12);transition:transform .9s var(--ease) .15s}
.demo-js .d-linnen .ln-kick[data-rv]:not(.in)::before{transform:scale(0)}
.d-linnen .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:16px;min-height:54px;overflow:hidden;isolation:isolate;border-radius:999px;font-size:15px;font-weight:500;letter-spacing:.01em;white-space:nowrap;transition:color .5s var(--ease),border-color .4s,transform .5s var(--ease)}
.d-linnen .btn:active{transform:scale(.97)}
.d-linnen .ln-fill{padding:0 9px 0 26px;background:var(--moss);color:var(--paper)}
.d-linnen .ln-fill:not(:has(.ln-arr)){padding:0 30px}
.d-linnen .ln-fill::before{content:"";position:absolute;right:9px;top:50%;z-index:-1;width:38px;height:38px;margin-top:-19px;border-radius:50%;background:var(--ink);transform:scale(0);transition:transform .7s var(--slow)}
.d-linnen .ln-fill:hover::before{transform:scale(12)}
.d-linnen .ln-fill:not(:has(.ln-arr))::before{right:50%;margin-right:-19px}
.d-linnen .ln-arr{display:grid;place-items:center;flex:none;width:38px;height:38px;border-radius:50%;background:var(--paper);color:var(--moss);transition:transform .6s var(--ease),background-color .5s,color .5s}
.d-linnen .ln-arr svg{width:15px;height:15px}
.d-linnen .btn:hover .ln-arr{transform:rotate(-45deg)}
.d-linnen .ln-ghost{padding:0 28px;border:1px solid currentColor;color:var(--ink)}
.d-linnen .ln-ghost::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform .6s var(--slow)}
.d-linnen .ln-ghost:hover{color:var(--paper);border-color:var(--ink)}
.d-linnen .ln-ghost:hover::before{transform:none}
.d-linnen .z-showcase.has-pic .ln-ghost{color:#fff}
.d-linnen .z-showcase.has-pic .ln-ghost::before{background:#fff}
.d-linnen .z-showcase.has-pic .ln-ghost:hover{color:var(--ink);border-color:#fff}
.d-linnen .ln-link{position:relative;display:inline-flex;align-items:center;gap:10px;min-height:44px;font-weight:500;color:var(--ink)}
.d-linnen .ln-link::after{content:"";position:absolute;left:0;right:0;bottom:9px;height:1px;background:currentColor;transform:scaleX(.35);transform-origin:left;transition:transform .6s var(--ease)}
.d-linnen .ln-link:hover::after{transform:none}
.d-linnen .ln-sw-0{background:repeating-linear-gradient(0deg,rgba(255,255,255,.22) 0 1px,transparent 1px 3px),repeating-linear-gradient(90deg,rgba(80,60,40,.07) 0 1px,transparent 1px 4px),linear-gradient(160deg,#e6dccb,#d6c9b4)}
.d-linnen .ln-sw-1{background:repeating-linear-gradient(97deg,rgba(92,62,32,.2) 0 1px,transparent 1px 7px,rgba(92,62,32,.09) 7px 9px,transparent 9px 15px),radial-gradient(ellipse 60% 18% at 40% 60%,rgba(92,62,32,.16),transparent 70%),linear-gradient(170deg,#c7a073,#a9804f)}
.d-linnen .ln-sw-2{background:repeating-linear-gradient(178deg,rgba(130,110,84,.13) 0 1px,transparent 1px 9px,rgba(130,110,84,.07) 9px 11px,transparent 11px 23px),radial-gradient(circle at 22% 30%,rgba(255,255,255,.45),transparent 38%),radial-gradient(circle at 78% 70%,rgba(130,110,84,.14),transparent 42%),#ddd1bc}
.d-linnen .ln-sw-3{background:radial-gradient(circle at 28% 26%,rgba(255,236,220,.38),transparent 46%),radial-gradient(circle at 70% 80%,rgba(120,70,44,.22),transparent 50%),linear-gradient(150deg,#cfa287,#b07e62)}
.d-linnen .ln-sw-4{background:radial-gradient(circle,rgba(255,255,255,.7) 1.3px,transparent 1.8px) 0 0/8px 8px,radial-gradient(circle,rgba(90,70,50,.09) 1.3px,transparent 1.8px) 4px 4px/8px 8px,#ece4d6}
.d-linnen .ln-sw-5{background:radial-gradient(circle at 72% 22%,rgba(255,255,255,.16),transparent 46%),repeating-radial-gradient(circle at 30% 70%,rgba(0,0,0,.05) 0 2px,transparent 2px 6px),linear-gradient(160deg,#5d6a4a,#434e35)}
.d-linnen .ln-hdr{position:fixed;left:0;right:0;top:0;z-index:50;padding-top:14px;transition:transform .6s var(--ease)}
.d-linnen .ln-bar{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:18px;width:min(100% - 24px,1440px);height:64px;margin-inline:auto;padding:0 10px 0 22px;border-radius:999px;transition:width .8s var(--ease),background-color .6s,box-shadow .6s}
.d-linnen .ln-bar::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background:rgba(248,244,237,.82);backdrop-filter:blur(16px) saturate(1.2);-webkit-backdrop-filter:blur(16px) saturate(1.2);box-shadow:0 18px 40px -26px rgba(42,38,34,.45),inset 0 0 0 1px rgba(42,38,34,.07);opacity:0;transform:scale(.97);transition:opacity .6s,transform .8s var(--ease)}
.d-linnen.is-scrolled .ln-bar::before,.d-linnen.menu-open .ln-bar::before{opacity:1;transform:none}
@media (min-width:1080px){.d-linnen.is-scrolled .ln-bar{width:min(100% - 24px,1080px)}}
.d-linnen .ln-logo{display:inline-flex;align-items:baseline;gap:10px;min-width:0;overflow:hidden;font-family:var(--serif);font-size:clamp(22px,1.9vw,28px);font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;line-height:1.1;white-space:nowrap;text-overflow:ellipsis;letter-spacing:-.01em}
.d-linnen .ln-logo i{flex:none;align-self:center;width:12px;height:12px;border-radius:50%;transition:transform .8s var(--ease)}
.d-linnen .ln-logo:hover i{transform:scale(1.5) rotate(90deg)}
.d-linnen .ln-logo span{overflow:hidden;text-overflow:ellipsis}
.d-linnen .ln-nav{display:none;align-items:center;gap:4px;padding:5px;border-radius:999px;background:rgba(229,220,205,.6)}
.d-linnen .ln-nav a{position:relative;display:inline-flex;align-items:center;min-height:40px;padding:0 16px;border-radius:999px;font-size:14.5px;color:var(--ink-2);transition:background-color .4s,color .4s}
.d-linnen .ln-nav a:hover{background:var(--paper);color:var(--ink)}
.d-linnen .ln-side{display:flex;align-items:center;gap:10px}
.d-linnen .ln-side .btn{display:none;min-height:46px}
.d-linnen .ln-burger{display:inline-flex;align-items:center;gap:12px;min-height:46px;padding:0 8px 0 18px;border:0;border-radius:999px;background:var(--ink);color:var(--paper);font-size:14px;font-weight:500}
.d-linnen .ln-burger i{position:relative;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--paper)}
.d-linnen .ln-burger i::before,.d-linnen .ln-burger i::after{content:"";position:absolute;width:12px;height:1.5px;background:var(--ink);transition:transform .5s var(--ease)}
.d-linnen .ln-burger i::before{transform:translateY(-3px)}
.d-linnen .ln-burger i::after{transform:translateY(3px)}
.d-linnen.menu-open .ln-burger i::before{transform:rotate(45deg)}
.d-linnen.menu-open .ln-burger i::after{transform:rotate(-45deg)}
@media (min-width:1080px){.d-linnen .ln-bar{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}.d-linnen .ln-nav{display:flex}.d-linnen .ln-side{justify-self:end}.d-linnen .ln-side .btn{display:inline-flex}.d-linnen .ln-burger{display:none}}
.d-linnen .ln-menu{position:fixed;inset:0;z-index:49;visibility:hidden;transition:visibility 0s .9s}
.d-linnen .ln-menu.is-open{visibility:visible;transition:none}
.d-linnen .ln-scrim{position:absolute;inset:0;background:rgba(42,38,34,.34);opacity:0;transition:opacity .7s}
.d-linnen .ln-menu.is-open .ln-scrim{opacity:1}
.d-linnen .ln-sheet{position:absolute;left:8px;right:8px;bottom:8px;display:grid;gap:26px;max-height:calc(100% - 96px);padding:30px clamp(22px,5vw,44px) 96px;overflow-y:auto;border-radius:32px;background:var(--paper);box-shadow:0 -20px 60px -30px rgba(42,38,34,.5);transform:translateY(calc(100% + 20px));transition:transform .85s var(--slow)}
.d-linnen .ln-menu.is-open .ln-sheet{transform:none}
.d-linnen .ln-sheet::before{content:"";justify-self:center;width:44px;height:4px;border-radius:4px;background:var(--stone)}
.d-linnen .ln-sheet nav{display:grid}
.d-linnen .ln-sheet nav a{display:flex;align-items:center;gap:16px;min-height:58px;padding:6px 0;border-bottom:1px solid var(--line);font-family:var(--serif);font-size:clamp(30px,8vw,46px);font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;line-height:1.1;opacity:0;transform:translateY(24px);transition:opacity .6s,transform .8s var(--ease),color .3s}
.d-linnen .ln-menu.is-open .ln-sheet nav a{opacity:1;transform:none;transition-delay:calc(.25s + var(--i,0) * 60ms)}
.d-linnen .ln-sheet nav a i{flex:none;width:16px;height:16px;border-radius:50%;transition:transform .6s var(--ease)}
.d-linnen .ln-sheet nav a:hover{color:var(--moss);font-style:italic}
.d-linnen .ln-sheet nav a:hover i{transform:scale(1.6)}
.d-linnen .ln-sheet-foot{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:18px;color:var(--dim)}
.d-linnen .ln-sheet-foot a{display:inline-flex;align-items:center;min-height:44px;color:var(--ink)}
.d-linnen .ln-swrow{display:flex;gap:8px}
.d-linnen .ln-swrow i{width:28px;height:28px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(42,38,34,.08)}
.d-linnen .ln-hero{position:relative;padding:clamp(112px,13vw,170px) 0 clamp(56px,7vw,110px)}
.d-linnen .ln-hero-grid{display:grid;gap:clamp(40px,5vw,72px)}
@media (min-width:980px){.d-linnen .ln-hero-grid{grid-template-columns:minmax(0,1.06fr) minmax(0,.94fr);align-items:center;min-height:calc(100svh - 200px)}}
.d-linnen .ln-hero-copy{display:grid;gap:clamp(22px,2.4vw,34px);align-content:center}
.d-linnen .ln-hero-top{display:flex;flex-wrap:wrap;align-items:center;gap:12px 22px}
.d-linnen .ln-now{display:inline-flex;align-items:center;gap:9px;min-height:32px;padding:0 14px;border-radius:999px;background:var(--paper);font-size:13px;font-weight:500;box-shadow:inset 0 0 0 1px var(--line)}
.d-linnen .ln-now::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor}
.d-linnen .ln-now.is-open{color:var(--moss)}
.d-linnen .ln-now.is-closed{color:#9a6a4e}
.d-linnen .ln-h1{max-width:13ch;font-size:clamp(46px,7.4vw,122px);line-height:.98;letter-spacing:-.03em}
.d-linnen .ln-h1.is-m{max-width:16ch;font-size:clamp(42px,6vw,98px)}
.d-linnen .ln-h1.is-s{max-width:20ch;font-size:clamp(36px,4.6vw,76px);line-height:1.02}
.d-linnen .ln-l{display:block;padding-bottom:.06em;-webkit-mask-image:linear-gradient(90deg,#000 42%,transparent 58%);mask-image:linear-gradient(90deg,#000 42%,transparent 58%);-webkit-mask-size:260% 100%;mask-size:260% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:100% 0;mask-position:100% 0;animation:ln-wipe 2.1s var(--ease) both;animation-delay:calc(.25s + var(--i,0) * .26s)}
.d-linnen .ln-l>span{display:inline-block;animation:ln-drift 2.4s var(--ease) both;animation-delay:calc(.25s + var(--i,0) * .26s)}
.d-linnen .ln-up{animation:ln-up 1.3s var(--ease) both;animation-delay:calc(.9s + var(--i,0) * 120ms)}
.d-linnen .ln-lede{max-width:44ch;font-size:clamp(17px,1.3vw,21px);line-height:1.6;color:var(--ink-2)}
.d-linnen .ln-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:14px 26px}
.d-linnen .ln-facts{display:flex;flex-wrap:wrap;gap:10px}
.d-linnen .ln-facts div{display:grid;gap:2px;padding:12px 18px;border-radius:18px;background:rgba(248,244,237,.7);box-shadow:inset 0 0 0 1px var(--line)}
.d-linnen .ln-facts dt{font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}
.d-linnen .ln-facts dd{margin:0;font-size:14.5px}
.d-linnen .ln-art{position:relative;min-height:0}@media (max-width:599px){.d-linnen .ln-facts{display:grid;gap:0;padding:4px 16px;border-radius:18px;background:rgba(248,244,237,.7);box-shadow:inset 0 0 0 1px var(--line)}.d-linnen .ln-facts div{grid-template-columns:minmax(0,1fr);gap:2px;padding:11px 0;border-radius:0;background:none;box-shadow:none}.d-linnen .ln-facts div+div{border-top:1px solid var(--line)}.d-linnen .ln-facts dt{padding-top:3px}}
.d-linnen .ln-mask{position:relative;overflow:hidden;border-radius:var(--r);background:var(--sand);transform:translateZ(0)}
.d-linnen .ln-mask img{width:100%;height:100%;object-fit:cover}
.d-linnen .ln-h-main{position:relative;width:88%;margin-left:auto;aspect-ratio:4/5;clip-path:inset(20% 26% 20% 26% round 999px);animation:ln-open 2s var(--slow) .45s both}
.d-linnen .ln-h-main img{transform:scale(1.22) translateY(calc(var(--p,0) * -3%));animation:ln-zoom 2.6s var(--ease) .45s both}
.d-linnen .ln-h-sub{position:absolute;left:0;bottom:-6%;width:42%;aspect-ratio:3/4;border:clamp(6px,.8vw,10px) solid var(--bg);border-radius:calc(var(--r) + 8px);clip-path:inset(30% 20% 30% 20% round 999px);animation:ln-open 1.8s var(--slow) 1.05s both}
.d-linnen .ln-h-sub img{border-radius:var(--r);transform:translateY(calc(var(--p,0) * 6%)) scale(1.12)}
.d-linnen .ln-disc{position:absolute;right:-2%;top:-5%;width:clamp(76px,9vw,132px);aspect-ratio:1;border-radius:50%;box-shadow:0 20px 40px -24px rgba(42,38,34,.6);animation:ln-pop 1.4s var(--ease) 1.5s both}
.d-linnen .ln-disc::after{content:"";position:absolute;inset:14%;border:1px dashed rgba(255,255,255,.55);border-radius:50%;animation:ln-spin 60s linear infinite}
.d-linnen .ln-tag{position:absolute;right:6%;bottom:7%;max-width:min(70%,280px);padding:10px 16px;border-radius:14px;background:var(--paper);font-size:13.5px;line-height:1.35;box-shadow:0 18px 40px -26px rgba(42,38,34,.6);animation:ln-up 1.2s var(--ease) 1.7s both}
.d-linnen .ln-tag b{display:block;font-family:var(--serif);font-size:18px;font-weight:300;font-style:italic;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;color:var(--moss)}
@media (max-width:979px){.d-linnen .ln-hero-grid{grid-template-areas:"copy" "art"}.d-linnen .ln-h-main{width:84%;aspect-ratio:4/4.4}.d-linnen .ln-h-sub{width:40%}.d-linnen .ln-tag{display:none}}
.d-linnen .ln-tiles{position:relative;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-template-rows:repeat(6,minmax(0,1fr));aspect-ratio:1;max-width:620px;margin-left:auto}
.d-linnen .ln-tiles>i{border-radius:var(--r);box-shadow:inset 0 0 0 1px rgba(42,38,34,.05);clip-path:inset(30% 30% 30% 30% round 999px);animation:ln-open 1.8s var(--slow) both;animation-delay:calc(.5s + var(--i,0) * .2s)}
.d-linnen .ln-tiles>i:nth-child(1){grid-area:1/2/5/6}
.d-linnen .ln-tiles>i:nth-child(2){grid-area:4/1/7/3;border-radius:999px 999px var(--r) var(--r)}
.d-linnen .ln-tiles>i:nth-child(3){grid-area:5/4/7/7;border-radius:50%}
.d-linnen .ln-tiles b{position:absolute;left:46%;top:18%;font-family:var(--serif);font-size:clamp(120px,18vw,260px);font-weight:300;font-style:italic;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;line-height:1;color:rgba(248,244,237,.92);animation:ln-up 1.6s var(--ease) 1.1s both}
.d-linnen .ln-sec{position:relative;padding-block:var(--z-sec)}
.d-linnen .ln-room{margin-inline:clamp(8px,1.4vw,20px);border-radius:var(--room);background:var(--sand)}
.d-linnen .ln-room.is-paper{background:var(--paper)}
.d-linnen .ln-room.is-moss{background:var(--moss-d);color:#efe9e0}
.d-linnen .ln-room.is-moss .ln-kick{color:rgba(239,233,224,.66)}
.d-linnen .ln-room.is-moss .ln-kick::before{background:var(--moss-l);box-shadow:0 0 0 4px rgba(169,179,143,.18)}
.d-linnen .ln-room.is-moss h2 em{color:var(--moss-l)}
.d-linnen .ln-room,.d-linnen .z-sec.z-faq,.d-linnen .z-sec.z-cta,.d-linnen .z-showcase,.d-linnen .z-sec.z-packages,.d-linnen .z-sec.z-quotes-sec,.d-linnen .z-sec.z-ba-sec{margin-block:clamp(6px,.8vw,12px)}
.d-linnen .ln-head{display:grid;gap:20px;max-width:64ch;margin-bottom:clamp(44px,5.6vw,88px)}
.d-linnen .ln-head>p:not(.ln-kick){max-width:52ch;color:var(--dim)}
.d-linnen .is-moss .ln-head>p:not(.ln-kick){color:rgba(239,233,224,.72)}
@media (min-width:1000px){.d-linnen .ln-head.is-split{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:20px 64px;max-width:none;align-items:end}.d-linnen .ln-head.is-split .ln-kick{grid-column:1/-1}.d-linnen .ln-head.is-split>p:not(.ln-kick){padding-bottom:.6em}}
.demo-js .d-linnen .ln-mask[data-rv]{opacity:1;transform:none;clip-path:inset(16% 22% 16% 22% round 999px);transition:clip-path 1.9s var(--slow)}
.demo-js .d-linnen .ln-mask[data-rv].in{clip-path:inset(0 round var(--r))}
.d-linnen .ln-mask[data-rv] img{transform:scale(1.16);transition:transform 2.6s var(--ease)}
.d-linnen .ln-mask[data-rv].in img{transform:scale(1.02)}
.d-linnen .ln-about{display:grid;gap:clamp(48px,6vw,110px)}
@media (min-width:980px){.d-linnen .ln-about{grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);align-items:center}.d-linnen .ln-about.is-solo{grid-template-columns:minmax(0,.55fr) minmax(0,1.45fr)}}
.d-linnen .ln-about-art{position:relative;padding-bottom:clamp(40px,6vw,90px)}
.d-linnen .ln-about-art .ln-a1{width:82%;aspect-ratio:4/5}
.d-linnen .ln-about-art .ln-a2{position:absolute;right:0;bottom:0;width:46%;aspect-ratio:1;border-radius:50%;border:clamp(6px,.8vw,10px) solid var(--bg)}
.d-linnen .ln-about-art .ln-a2 img{transform:translateY(calc(var(--p,0) * 8%)) scale(1.18)}
.d-linnen .ln-about-art figcaption{position:absolute;left:18px;top:18px;padding:7px 14px;border-radius:999px;background:var(--paper);font-size:12px;font-weight:500;letter-spacing:.14em;text-transform:uppercase}
.d-linnen .ln-about-solo{position:relative;aspect-ratio:3/4;max-width:360px;border-radius:999px 999px var(--r) var(--r);overflow:hidden}
.d-linnen .ln-about-solo i{position:absolute;inset:0}
.d-linnen .ln-about-solo b{position:absolute;inset:auto 0 12% 0;text-align:center;font-family:var(--serif);font-size:clamp(90px,12vw,180px);font-weight:300;font-style:italic;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;line-height:1;color:rgba(248,244,237,.92)}
.d-linnen .ln-about-copy{display:grid;gap:28px;align-content:start}.d-linnen .ln-about-copy .ln-head,.d-linnen .ln-visit-copy .ln-head{margin-bottom:0}
.d-linnen .ln-lead{font-family:var(--serif);font-size:clamp(25px,2.4vw,38px);font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;line-height:1.28;letter-spacing:-.01em;color:var(--ink)}
.d-linnen .ln-cols{display:grid;gap:18px 44px;color:var(--dim)}
@media (min-width:760px){.d-linnen .ln-cols.has-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-linnen .ln-chips{display:flex;flex-wrap:wrap;gap:10px}
.d-linnen .ln-chips li{display:inline-flex;align-items:center;gap:10px;min-height:42px;padding:0 18px 0 8px;border-radius:999px;background:var(--paper);font-size:14.5px;box-shadow:inset 0 0 0 1px var(--line);transition:transform .5s var(--ease),box-shadow .4s}
.d-linnen .ln-chips li:hover{transform:translateY(-3px);box-shadow:inset 0 0 0 1px var(--moss)}
.d-linnen .ln-chips i{flex:none;width:28px;height:28px;border-radius:50%}
.d-linnen .ln-mat{display:grid;gap:clamp(28px,4vw,64px)}
@media (min-width:980px){.d-linnen .ln-mat{grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);align-items:start}}
.d-linnen .ln-mat-stage{position:relative}
@media (min-width:980px){.d-linnen .ln-mat-stage{position:sticky;top:104px;order:-1}}
.d-linnen .ln-mat-panel{display:grid;gap:22px}
.d-linnen .ln-mat-panel[hidden]{display:none}
.d-linnen .ln-mat-pic{position:relative;aspect-ratio:5/4;overflow:hidden;border-radius:var(--r);animation:ln-open 1.3s var(--slow) both}
.d-linnen .ln-mat-pic img{width:100%;height:100%;object-fit:cover;animation:ln-zoom 1.8s var(--ease) both}
.d-linnen .ln-mat-pic>i{position:absolute;inset:0}
.d-linnen .ln-mat-pic span{position:absolute;left:18px;bottom:18px;display:inline-flex;align-items:center;gap:10px;padding:8px 16px 8px 8px;border-radius:999px;background:rgba(248,244,237,.9);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);font-size:13px;font-weight:500}
.d-linnen .ln-mat-pic span i{width:26px;height:26px;border-radius:50%}
.d-linnen .ln-mat-copy{display:grid;gap:10px;max-width:60ch;animation:ln-up .9s var(--ease) .15s both}
.d-linnen .ln-mat-copy h3{font-size:clamp(28px,2.6vw,40px)}
.d-linnen .ln-mat-copy p{color:var(--dim)}
.d-linnen .ln-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.d-linnen .ln-meta span{padding:5px 12px;border-radius:999px;background:var(--paper);font-size:13px;font-variant-numeric:tabular-nums;box-shadow:inset 0 0 0 1px var(--line)}
.d-linnen .ln-mat-list{display:grid;gap:8px;align-content:start}
.d-linnen .ln-mat-list button{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:16px;width:100%;min-height:68px;padding:10px 18px 10px 10px;border:0;border-radius:20px;background:transparent;text-align:left;transition:background-color .5s,box-shadow .5s}
.d-linnen .ln-mat-list button i{width:48px;height:48px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(42,38,34,.08);transition:transform .7s var(--ease),border-radius .7s var(--ease)}
.d-linnen .ln-mat-list button b{font-family:var(--serif);font-size:clamp(20px,1.6vw,25px);font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;line-height:1.2}
.d-linnen .ln-mat-list button small{font-size:12px;letter-spacing:.12em;color:var(--dim);font-variant-numeric:tabular-nums}
.d-linnen .ln-mat-list button:hover{background:rgba(248,244,237,.6)}
.d-linnen .ln-mat-list button:hover i{transform:rotate(30deg) scale(1.06)}
.d-linnen .ln-mat-list button[aria-selected="true"]{background:var(--paper);box-shadow:0 16px 36px -28px rgba(42,38,34,.6)}
.d-linnen .ln-mat-list button[aria-selected="true"] i{border-radius:38% 62% 55% 45% / 48% 40% 60% 52%;transform:scale(1.08)}
.d-linnen .ln-mat-list button[aria-selected="true"] b{font-style:italic;color:var(--moss)}
.d-linnen .ln-mat-list button[aria-selected="true"]::after{content:"";position:absolute;right:20px;top:50%;width:8px;height:8px;margin-top:-4px;border-radius:50%;background:var(--moss)}
.d-linnen .ln-mat-list button[aria-selected="true"] small{opacity:0}
@media (max-width:979px){.d-linnen .ln-mat-list{grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr))}.d-linnen .ln-mat-list button{min-height:60px}.d-linnen .ln-mat-list button i{width:40px;height:40px}}
.d-linnen .ln-menu-cats{display:grid;gap:clamp(36px,4vw,64px) clamp(32px,5vw,96px)}
@media (min-width:900px){.d-linnen .ln-menu-cats{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-linnen .ln-cat h3{display:flex;align-items:center;gap:12px;margin-bottom:12px;font-size:clamp(26px,2.2vw,34px)}
.d-linnen .ln-cat h3 i{width:22px;height:22px;border-radius:50%}
.d-linnen .ln-dish{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 18px;padding:16px 0;border-bottom:1px solid var(--line)}
.d-linnen .ln-dish b{font-weight:500}
.d-linnen .ln-dish p{grid-column:1/-1;font-size:.94em;color:var(--dim)}
.d-linnen .ln-dish span{font-variant-numeric:tabular-nums;color:var(--moss)}
.d-linnen .ln-proj-head{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:24px 40px;margin-bottom:clamp(36px,4.4vw,64px)}
.d-linnen .ln-proj-head .ln-head{margin:0}
.d-linnen .ln-proj-nav{display:flex;align-items:center;gap:18px}
.d-linnen .ln-count{font-family:var(--serif);font-size:22px;font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;font-variant-numeric:tabular-nums}
.d-linnen .ln-count b{font-weight:300;font-style:italic;color:var(--moss)}
.d-linnen .ln-proj-nav button{display:grid;place-items:center;width:54px;height:54px;border:1px solid var(--line);border-radius:50%;background:var(--paper);transition:background-color .4s,color .4s,transform .5s var(--ease)}
.d-linnen .ln-proj-nav button:hover{background:var(--ink);color:var(--paper);transform:scale(1.06)}
.d-linnen .ln-proj-nav svg{width:18px;height:18px}
.d-linnen .ln-proj-nav button[data-scroll="prev"] svg{transform:scaleX(-1)}
.d-linnen .ln-track{display:flex;align-items:flex-start;gap:clamp(14px,1.8vw,28px);overflow-x:auto;padding:0 var(--pad) 8px;scroll-padding-inline:var(--pad);scroll-snap-type:x mandatory;scrollbar-width:none;overscroll-behavior-x:contain}
.d-linnen .ln-track::-webkit-scrollbar{display:none}
.d-linnen .ln-track.is-drag{scroll-snap-type:none;cursor:grabbing}
.d-linnen .ln-track.is-drag *{pointer-events:none}
.d-linnen .ln-slide{flex:none;width:clamp(260px,32vw,480px);scroll-snap-align:start}
.d-linnen .ln-slide:nth-child(3n+2){width:clamp(300px,44vw,660px);margin-top:clamp(40px,6vw,110px)}
.d-linnen .ln-slide:nth-child(3n+3){width:clamp(240px,27vw,400px);margin-top:clamp(16px,2vw,36px)}
.d-linnen .ln-slide .ln-mask{aspect-ratio:4/5}
.d-linnen .ln-slide:nth-child(3n+2) .ln-mask{aspect-ratio:4/3}
.d-linnen .ln-slide:nth-child(3n+3) .ln-mask{aspect-ratio:1;border-radius:999px 999px var(--r) var(--r)}
.d-linnen .ln-slide img{pointer-events:none;-webkit-user-drag:none;user-select:none}
.d-linnen .ln-slide:hover .ln-mask.in img{transform:scale(1.07)}
.d-linnen .ln-slide figcaption{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;margin-top:16px;font-size:14.5px;line-height:1.5;color:var(--ink-2)}
.d-linnen .ln-slide figcaption small{font-family:var(--serif);font-size:18px;font-style:italic;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;color:var(--moss);line-height:1.2}
.d-linnen .ln-prog{width:min(100% - 2 * var(--pad),1480px - 2 * var(--pad));height:2px;margin:clamp(28px,3vw,44px) auto 0;border-radius:2px;background:var(--line);overflow:hidden}
.d-linnen .ln-prog i{display:block;width:100%;height:100%;border-radius:2px;background:var(--moss);transform:scaleX(var(--k,.12));transform-origin:left;transition:transform .25s linear}
.d-linnen .ln-drag{position:fixed;left:0;top:0;z-index:60;display:grid;place-items:center;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;background:rgba(42,38,34,.88);color:var(--paper);font-size:13px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;pointer-events:none;opacity:0;scale:.4;transition:opacity .35s,scale .5s var(--ease);will-change:transform}
.d-linnen .ln-drag.on{opacity:1;scale:1}
.d-linnen .ln-drag.down{scale:.82}
.d-linnen .ln-drag::before,.d-linnen .ln-drag::after{content:"";position:absolute;top:50%;width:6px;height:6px;margin-top:-3px;border-top:1.5px solid currentColor;border-left:1.5px solid currentColor}
.d-linnen .ln-drag::before{left:14px;transform:rotate(-45deg)}
.d-linnen .ln-drag::after{right:14px;transform:rotate(135deg)}
.d-linnen .ln-feats{display:grid;gap:clamp(18px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}
.d-linnen .ln-feat{display:grid;gap:16px;align-content:start;padding:clamp(26px,3vw,40px);border-radius:var(--r);background:rgba(248,244,237,.55);box-shadow:inset 0 0 0 1px var(--line);transition:background-color .6s,transform .7s var(--ease),box-shadow .6s}
@media (min-width:900px){.d-linnen .ln-feats.is-3 .ln-feat:nth-child(3n+2){transform:translateY(56px)}.d-linnen .ln-feats.is-3{padding-bottom:56px}.d-linnen .ln-feats.is-3 .ln-feat:nth-child(3n+2):hover{transform:translateY(48px)}}
.d-linnen .ln-feat:hover{background:var(--paper);box-shadow:0 30px 60px -40px rgba(42,38,34,.55);transform:translateY(-8px)}
.d-linnen .ln-feat p{color:var(--dim)}
.d-linnen .ln-pebble{display:grid;place-items:center;width:64px;height:64px;border-radius:44% 56% 52% 48% / 52% 44% 56% 48%;color:var(--paper);transition:border-radius 1s var(--ease),transform 1s var(--ease)}
.d-linnen .ln-pebble svg{width:24px;height:24px}
.d-linnen .ln-feat:hover .ln-pebble{border-radius:58% 42% 40% 60% / 42% 58% 44% 56%;transform:rotate(-12deg)}
.d-linnen .ln-pebble.ln-sw-0,.d-linnen .ln-pebble.ln-sw-2,.d-linnen .ln-pebble.ln-sw-4{color:var(--ink)}
.d-linnen .is-moss .ln-feat{background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1px rgba(239,233,224,.14)}
.d-linnen .is-moss .ln-feat:hover{background:rgba(255,255,255,.08)}
.d-linnen .is-moss .ln-feat p{color:rgba(239,233,224,.72)}
.d-linnen .ln-steps{position:relative;display:grid;gap:clamp(28px,3vw,44px);counter-reset:ln}
.d-linnen .ln-thread{position:absolute;left:23px;top:10px;bottom:10px;width:2px;overflow:visible;pointer-events:none}
.d-linnen .ln-thread path{fill:none;stroke:var(--moss);stroke-width:1.6;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:calc(1 - var(--k,1));vector-effect:non-scaling-stroke}
.d-linnen .ln-thread .ln-ghostline{stroke:var(--line);stroke-dashoffset:0}
.d-linnen .ln-thread-h{display:none}
.d-linnen .ln-step{position:relative;display:grid;grid-template-columns:48px minmax(0,1fr);gap:8px 22px;align-content:start}
.d-linnen .ln-step b{grid-row:span 2;display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--bg);box-shadow:inset 0 0 0 1px var(--moss);font-family:var(--serif);font-size:19px;font-weight:300;font-style:italic;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;color:var(--moss);transition:background-color .6s,color .6s}
.d-linnen .ln-step:hover b{background:var(--moss);color:var(--paper)}
.d-linnen .ln-step p{color:var(--dim)}
.d-linnen .ln-room .ln-step b{background:var(--sand)}
@media (min-width:980px){.d-linnen .ln-steps{grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:40px}.d-linnen .ln-thread{display:none}.d-linnen .ln-thread-h{display:block;position:absolute;left:24px;right:24px;top:0;width:auto;height:140px}.d-linnen .ln-step{grid-template-columns:minmax(0,1fr);padding-top:calc(var(--y,0) * 1px)}.d-linnen .ln-step b{grid-row:auto;margin-bottom:18px}.d-linnen .ln-step:nth-of-type(4n+2){--y:46}.d-linnen .ln-step:nth-of-type(4n+3){--y:92}.d-linnen .ln-step:nth-of-type(4n+4){--y:46}}
.d-linnen .ln-visit{display:grid;gap:clamp(40px,5vw,96px)}
@media (min-width:980px){.d-linnen .ln-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.d-linnen .ln-visit-copy{display:grid;gap:24px;align-content:start}
.d-linnen .ln-visit-copy>p{max-width:48ch;color:var(--dim)}
.d-linnen .ln-card{position:relative;padding:clamp(24px,3.4vw,48px);border-radius:var(--r);background:var(--paper);box-shadow:0 40px 80px -60px rgba(42,38,34,.6)}
.d-linnen .ln-card-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 18px;margin-bottom:12px}
.d-linnen .ln-card-top h3{font-size:clamp(24px,2vw,30px)}
.d-linnen .ln-card .z-hours{border:0}
.d-linnen .ln-card .z-hours div{align-items:center;margin-inline:-14px;padding:13px 14px;border-radius:14px;border-bottom:0;transition:background-color .4s}
.d-linnen .ln-card .z-hours div+div{box-shadow:0 -1px 0 var(--line)}
.d-linnen .ln-card .z-hours div:hover{background:var(--bg)}
.d-linnen .z-hours div.is-today{background:var(--moss);color:var(--paper);box-shadow:none}
.d-linnen .z-hours div.is-today dd{color:var(--paper)}
.d-linnen .z-hours div.is-today+div{box-shadow:none}
.d-linnen .z-hours div.is-today dt::after{content:" ●";font-size:.6em;vertical-align:.25em;color:var(--moss-l)}
.d-linnen .ln-card-swatch{position:absolute;right:clamp(20px,3vw,40px);top:-26px;display:flex;gap:6px}
.d-linnen .ln-card-swatch i{width:52px;height:52px;border-radius:50%;border:5px solid var(--sand);box-shadow:0 12px 24px -16px rgba(42,38,34,.6)}
.d-linnen .ln-card-swatch i+i{margin-left:-22px}
.d-linnen .ln-room.is-paper .ln-card-swatch i{border-color:var(--paper)}
.d-linnen .ln-reach{display:grid;gap:4px;justify-items:start}.d-linnen .ln-reach p{display:grid;gap:2px;width:100%;padding:14px 0;border-bottom:1px solid var(--line);font-family:var(--serif);font-size:clamp(22px,2vw,30px);font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;line-height:1.25;overflow-wrap:anywhere}.d-linnen .ln-reach small{font-family:var(--sans);font-size:11.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}.d-linnen .ln-reach a:not(.btn):hover{color:var(--moss)}.d-linnen .ln-reach .btn{margin-top:18px}.d-linnen .ln-form{position:relative;padding:clamp(24px,3.4vw,50px);border-radius:var(--r);background:var(--paper);box-shadow:0 40px 80px -60px rgba(42,38,34,.6)}
.d-linnen .ln-room.is-paper .ln-form,.d-linnen .ln-room.is-paper .ln-card{background:var(--bg)}
.d-linnen .z-field label,.d-linnen .z-chipset legend{font-size:11.5px;font-weight:500;letter-spacing:.14em}
.d-linnen .z-field input,.d-linnen .z-field select,.d-linnen .z-field textarea{border-color:transparent;background:var(--bg);box-shadow:inset 0 0 0 1px var(--line);transition:box-shadow .4s,background-color .4s}
.d-linnen .ln-room.is-paper .z-field input,.d-linnen .ln-room.is-paper .z-field select,.d-linnen .ln-room.is-paper .z-field textarea{background:var(--paper)}
.d-linnen .z-field select{background-image:linear-gradient(45deg,transparent 50%,var(--ink) 50%),linear-gradient(135deg,var(--ink) 50%,transparent 50%);background-position:calc(100% - 20px) 50%,calc(100% - 15px) 50%;background-size:5px 5px;background-repeat:no-repeat}
.d-linnen .z-field :focus-visible{outline:none;box-shadow:inset 0 0 0 1.5px var(--moss);background-color:var(--paper)}
.d-linnen .z-form .btn{min-height:58px}
.d-linnen .form-status{border-radius:14px;border-color:var(--moss)}
.d-linnen .z-chips button{border-radius:999px}
.d-linnen .ln-team{display:grid;gap:clamp(34px,4vw,56px) clamp(16px,2vw,32px);grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))}
.d-linnen .ln-team figure{aspect-ratio:3/4;margin-bottom:18px;border-radius:999px 999px var(--r) var(--r)}
.d-linnen .ln-team h3{transition:transform .6s var(--ease)}
.d-linnen .ln-team li:hover h3{transform:translateX(8px);font-style:italic}
.d-linnen .ln-team p{color:var(--dim)}
.d-linnen .ln-role{margin-top:4px;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--moss)!important}
.d-linnen .ln-chan{display:grid;gap:clamp(16px,2vw,24px);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-linnen .ln-chan a{display:grid;gap:14px;align-content:start;height:100%;padding:clamp(24px,3vw,36px);border-radius:var(--r);background:var(--paper);transition:transform .6s var(--ease),box-shadow .6s}
.d-linnen .ln-chan a:hover{transform:translateY(-6px);box-shadow:0 30px 60px -40px rgba(42,38,34,.55)}
.d-linnen .ln-chan p{color:var(--dim)}
.d-linnen .ln-chan .ln-link{pointer-events:none}
.d-linnen .z-sec{scroll-margin-top:90px}
.d-linnen .z-sec.z-faq,.d-linnen .z-sec.z-packages,.d-linnen .z-sec.z-quotes-sec,.d-linnen .z-sec.z-ba-sec{margin-inline:clamp(8px,1.4vw,20px);border-radius:var(--room)}
.d-linnen .z-sec.z-faq{background:var(--paper)}
.d-linnen .z-head{gap:20px}
.d-linnen .z-head .ln-kick{justify-self:start}
.d-linnen .z-acc{display:grid;gap:10px;border:0}
.d-linnen .z-acc details{border:0;border-radius:20px;background:var(--bg);transition:background-color .5s}
.d-linnen .z-acc details[open]{background:var(--sand)}
.d-linnen .z-acc summary{padding:20px 22px;font-family:var(--serif);font-size:clamp(20px,1.7vw,25px);font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;line-height:1.25}
.d-linnen .z-acc summary i{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--paper);transition:transform .6s var(--ease),background-color .4s}
.d-linnen .z-acc summary i::before,.d-linnen .z-acc summary i::after{left:12px;width:12px}
.d-linnen .z-acc details[open] summary i{transform:rotate(180deg);background:var(--moss);color:var(--paper)}
.d-linnen .z-acc summary:hover{color:var(--moss)}
.d-linnen .z-acc details>p{padding:0 22px 24px}
.d-linnen .z-sec.z-cta{margin-inline:clamp(8px,1.4vw,20px);border-radius:var(--room);background:var(--moss-d);color:#efe9e0}
.d-linnen .z-cta h2 em{color:var(--moss-l)}
.d-linnen .z-cta .z-center>p{color:rgba(239,233,224,.74)}
.d-linnen .z-cta .ln-fill{background:var(--paper);color:var(--ink)}
.d-linnen .z-cta .ln-fill::before{background:var(--moss-l)}
.d-linnen .z-statement h2{max-width:24ch;font-weight:300}
.d-linnen .z-statement .z-center::before{content:"";width:96px;height:32px;border-radius:999px;background:radial-gradient(circle at 16px 16px,#d6c9b4 15px,transparent 16px),radial-gradient(circle at 48px 16px,#b08a5e 15px,transparent 16px),radial-gradient(circle at 80px 16px,#4c583c 15px,transparent 16px)}
.d-linnen .z-showcase{margin-inline:clamp(8px,1.4vw,20px);border-radius:var(--room)}
.d-linnen .z-showcase.has-pic h2 em{color:#e6dccb}.d-linnen .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(42,38,34,0) 30%,rgba(42,38,34,.66))}
.d-linnen .z-showcase:not(.has-pic){background:var(--sand)}
.d-linnen .z-card{border:0;background:var(--paper);box-shadow:inset 0 0 0 1px var(--line)}
.d-linnen .z-pack.is-featured{background:var(--moss-d);color:#efe9e0;box-shadow:none}
.d-linnen .z-pack.is-featured h3,.d-linnen .z-pack.is-featured .z-pack-price b{color:#efe9e0}
.d-linnen .z-pack.is-featured p,.d-linnen .z-pack.is-featured .z-pack-price{color:rgba(239,233,224,.74)}
.d-linnen .z-pack.is-featured .z-tag{color:var(--moss-l)}
.d-linnen .z-pack.is-featured .z-ticks li::before{background:var(--moss-l)}
.d-linnen .z-sec.z-packages{background:var(--sand)}
.d-linnen .z-sec.z-quotes-sec{background:var(--paper)}
.d-linnen .z-quotes blockquote{padding:26px;border:0;border-radius:var(--r);background:var(--bg)}
.d-linnen .z-quotes blockquote>p{font-weight:300;font-style:italic;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0}
.d-linnen .z-ba{border-radius:var(--r)}
.d-linnen .z-ba figcaption{border-radius:999px;background:rgba(248,244,237,.9);color:var(--ink)}
.d-linnen .z-rows small,.d-linnen .z-steps small{font-family:var(--serif);font-size:20px;font-style:italic;letter-spacing:0}
.d-linnen .z-ico{border:0;background:var(--sand);color:var(--moss)}
.d-linnen .z-reach a{font-weight:500}
.d-linnen .ln-foot{position:relative;margin:clamp(8px,1.4vw,20px);margin-top:clamp(56px,7vw,120px);padding:clamp(64px,8vw,120px) 0 120px;border-radius:var(--room);background:var(--moss-d);color:#efe9e0;overflow:hidden}
.d-linnen .ln-foot-cta{display:grid;gap:30px;justify-items:start;max-width:980px}
.d-linnen .ln-foot-cta p{font-family:var(--serif);font-size:clamp(34px,4.6vw,76px);font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;line-height:1.04;letter-spacing:-.02em}
.d-linnen .ln-foot-cta p em{color:var(--moss-l)}
.d-linnen .ln-foot .ln-fill{background:var(--paper);color:var(--ink)}
.d-linnen .ln-foot .ln-fill .ln-arr{background:var(--moss-d);color:var(--paper)}
.d-linnen .ln-foot .ln-fill::before{background:var(--moss-l)}
.d-linnen .ln-foot-name{margin:clamp(56px,8vw,120px) 0 clamp(36px,5vw,72px);font-family:var(--serif);font-size:clamp(56px,13.4vw,236px);font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 0;line-height:.86;letter-spacing:-.045em;white-space:nowrap;color:rgba(239,233,224,.94);overflow:hidden}
.d-linnen .ln-foot-name.is-m{font-size:clamp(44px,10vw,170px)}
.d-linnen .ln-foot-name.is-l{font-size:clamp(34px,6.6vw,112px);white-space:normal;line-height:.95}
.d-linnen .ln-foot-name span{display:inline-block;transform:translateX(calc(var(--p,0) * 4%))}
.d-linnen .ln-foot-name em{font-style:italic;color:var(--moss-l)}
.d-linnen .ln-foot-grid{display:grid;gap:32px;padding-top:clamp(32px,4vw,56px);border-top:1px solid rgba(239,233,224,.18);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-linnen .ln-foot-grid h3{margin-bottom:12px;font-family:var(--sans);font-size:11.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:rgba(239,233,224,.56)}
.d-linnen .ln-foot-grid a,.d-linnen .ln-foot-grid span{display:block;padding:3px 0}
.d-linnen .ln-foot-grid a{display:flex;align-items:center;min-height:36px;transition:color .3s,transform .5s var(--ease)}
.d-linnen .ln-foot-grid a:hover{color:var(--moss-l);transform:translateX(6px)}
.d-linnen .ln-foot-grid p{max-width:34ch;color:rgba(239,233,224,.72)}
.d-linnen .ln-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:48px;font-size:12.5px;color:rgba(239,233,224,.56)}
.d-linnen .ln-foot .ln-swrow{position:absolute;right:var(--pad);top:clamp(64px,8vw,120px)}
@media (max-width:759px){.d-linnen .ln-foot .ln-swrow{display:none}}
@keyframes ln-wipe{to{-webkit-mask-position:0 0;mask-position:0 0}}
@keyframes ln-drift{from{transform:translateX(-.18em)}to{transform:none}}
@keyframes ln-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes ln-open{to{clip-path:inset(0 round var(--r))}}
@keyframes ln-zoom{from{scale:1.2}to{scale:1}}
@keyframes ln-pop{from{opacity:0;transform:scale(.3) rotate(-60deg)}to{opacity:1;transform:none}}
@keyframes ln-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.d-linnen .ln-l{-webkit-mask-image:none;mask-image:none}.d-linnen .ln-h-main,.d-linnen .ln-h-sub,.d-linnen .ln-tiles>i,.d-linnen .ln-mat-pic{clip-path:none}.d-linnen .ln-disc::after{animation:none}.d-linnen .ln-mask[data-rv] img{transform:none}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The material palette follows the pointer on desktop; the project slider is dragged with a
 * round drag cursor and shows how far along it is; the thread of the process draws itself.
 */
const JS = `(function(){var d=document,W=window,fam=d.querySelector('.d-linnen');if(!fam)return;var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches,fine=W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches;
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
if(fine)q('[data-mat] [role=tab]').forEach(function(t){var tm=0;t.addEventListener('mouseenter',function(){clearTimeout(tm);tm=setTimeout(function(){if(t.getAttribute('aria-selected')!=='true')t.click()},90)});t.addEventListener('mouseleave',function(){clearTimeout(tm)})});
var cur=null;if(fine&&!reduce&&q('.ln-track').length){cur=d.createElement('div');cur.className='ln-drag';cur.setAttribute('aria-hidden','true');var dl=d.querySelector('[data-drag-label]');cur.textContent=dl?dl.getAttribute('data-drag-label'):'Drag';fam.appendChild(cur)}
var cx=0,cy=0,tx=0,ty=0,craf=0;function cloop(){cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;cur.style.transform='translate('+cx.toFixed(1)+'px,'+cy.toFixed(1)+'px)';craf=Math.abs(tx-cx)+Math.abs(ty-cy)>.4?requestAnimationFrame(cloop):0}
q('.ln-track').forEach(function(s){var root=s.closest('section'),bar=root&&root.querySelector('.ln-prog i'),cnt=root&&root.querySelector('.ln-count b'),slides=q('.ln-slide',s),raf=0;
function upd(){raf=0;var max=s.scrollWidth-s.clientWidth,k=max>0?s.scrollLeft/max:1;if(bar)bar.style.setProperty('--k',Math.max(.06,Math.min(1,s.clientWidth/s.scrollWidth+k*(1-s.clientWidth/s.scrollWidth))).toFixed(3));if(cnt&&slides.length){var at=0,best=1e9,L=s.getBoundingClientRect().left;slides.forEach(function(x,n){var dx=Math.abs(x.getBoundingClientRect().left-L-parseFloat(getComputedStyle(s).paddingLeft));if(dx<best){best=dx;at=n}});if(k>.98)at=slides.length-1;cnt.textContent=String(at+1).padStart(2,'0')}}
s.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});W.addEventListener('resize',upd);upd();
var down=false,sx=0,sl=0,moved=0,vel=0,lx=0;s.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0)return;down=true;moved=0;sx=lx=e.clientX;sl=s.scrollLeft;if(cur)cur.classList.add('down')});
W.addEventListener('pointermove',function(e){if(!down)return;moved=Math.max(moved,Math.abs(e.clientX-sx));if(moved>4)s.classList.add('is-drag');vel=e.clientX-lx;lx=e.clientX;s.scrollLeft=sl-(e.clientX-sx)});
W.addEventListener('pointerup',function(){if(!down)return;down=false;s.classList.remove('is-drag');if(cur)cur.classList.remove('down');if(!reduce&&Math.abs(vel)>2)s.scrollBy({left:-vel*14,behavior:'smooth'})});
if(cur){s.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse')cur.classList.add('on')});s.addEventListener('pointerleave',function(){cur.classList.remove('on');cur.classList.remove('down')});s.addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;if(!craf)craf=requestAnimationFrame(cloop)})}});
var th=q('[data-thread]');if(th.length){var traf=0;function draw(){traf=0;var vh=W.innerHeight;th.forEach(function(el){var r=el.getBoundingClientRect(),k=reduce?1:Math.max(0,Math.min(1,(vh*.85-r.top)/(r.height+vh*.25)));el.style.setProperty('--k',k.toFixed(3))})}W.addEventListener('scroll',function(){if(!traf)traf=requestAnimationFrame(draw)},{passive:true});W.addEventListener('resize',draw);draw()}
})();`;

const DRAG: Record<string, string> = { nl: "Sleep", en: "Drag", de: "Ziehen", fr: "Glisser" };
const ROMAN = ["i", "ii", "iii", "iv", "v", "vi"];
const sw = (n: number) => `ln-sw-${n % SWATCHES}`;
const two = (n: number) => String(n).padStart(2, "0");

const Arrow = () => (
  <span className="ln-arr" aria-hidden="true">
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  </span>
);

const Chevron = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="ln-kick" data-rv>
    {children}
  </p>
);

function Head({ kicker, title, intro, id, split }: { kicker?: string; title: string; intro?: string; id?: string; split?: boolean }) {
  return (
    <header className={`ln-head${split && intro ? " is-split" : ""}`}>
      {kicker ? <Kick>{kicker}</Kick> : null}
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
      <header className="ln-hdr hdr">
        <div className="ln-bar">
          <a href="#top" className="ln-logo" aria-label={c.name}>
            <i className="ln-sw-5" aria-hidden="true" />
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="ln-nav" data-nav>
            {c.nav.slice(0, 5).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ln-side">
            <a className="btn ln-fill" href={cta.href}>
              {cta.label}
            </a>
            <button type="button" className="ln-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
              <span data-label data-open={c.t.menu} data-close={c.t.close}>
                {c.t.menu}
              </span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div id="site-menu" className="ln-menu" inert>
        <div className="ln-scrim" data-menu-close aria-hidden="true" />
        <div className="ln-sheet">
          <nav aria-label={c.t.menu} data-nav>
            {c.nav.map((n, k) => (
              <a key={n.id} href={`#${n.id}`} style={i(k)}>
                <i className={sw(k)} aria-hidden="true" />
                {n.label}
              </a>
            ))}
          </nav>
          <a className="btn ln-fill" href={cta.href}>
            {cta.label} <Arrow />
          </a>
          <div className="ln-sheet-foot">
            <p>
              {b.address ?? b.city}
              {b.phone ? (
                <>
                  <br />
                  <a href={tel(b.phone)}>{b.phone}</a>
                </>
              ) : null}
            </p>
            <span className="ln-swrow" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <i key={n} className={sw(n)} />
              ))}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const main = c.photo(hero.image);
  const sub = main ? c.spare() : null;
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 48 ? "is-s" : plain.length > 26 ? "is-m" : undefined;
  const { lines } = splitLines(hero.headline, plain.length > 34 ? 3 : 2);
  const facts = heroFacts(c);
  return (
    <section className="ln-hero">
      <div className="ln-wrap ln-hero-grid">
        <div className="ln-hero-copy">
          <div className="ln-hero-top">
            {hero.eyebrow ? (
              <p className="ln-kick ln-up" style={i(-4)}>
                {hero.eyebrow}
              </p>
            ) : null}
            <NowBadge c={c} className="ln-now ln-up" />
          </div>
          <h1 className={`ln-h1${size ? ` ${size}` : ""}`}>
            {lines.map((l, k) => (
              <span key={k} className="ln-l" style={i(k)}>
                <span>{l}</span>
              </span>
            ))}
          </h1>
          <p className="ln-lede ln-up">{hero.subheadline}</p>
          <div className="ln-ctas ln-up" style={i(1)}>
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
            <dl className="ln-facts ln-up" style={i(2)}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="ln-art">
          {main ? (
            <>
              <figure className="ln-mask ln-h-main" data-px>
                <Pic p={main} eager sizes="(min-width: 980px) 44vw, 84vw" />
              </figure>
              {sub ? (
                <figure className="ln-mask ln-h-sub" data-px>
                  <Pic p={sub} eager sizes="(min-width: 980px) 20vw, 40vw" />
                </figure>
              ) : null}
              <span className="ln-disc ln-sw-1" aria-hidden="true" />
              {hero.note ? (
                <p className="ln-tag">
                  <b>{c.spec.business.city ?? c.name}</b>
                  {hero.note}
                </p>
              ) : null}
            </>
          ) : (
            <div className="ln-tiles" aria-hidden="true">
              <i className="ln-sw-0" style={i(0)} />
              <i className="ln-sw-1" style={i(1)} />
              <i className="ln-sw-5" style={i(2)} />
              <b>{c.name.replace(/^(studio|atelier|interieur(studio)?|salon|bureau)\s+/i, "").charAt(0)}</b>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const n = c.name.length;
  const words = c.name.split(/\s+/);
  return (
    <footer className="ln-foot">
      <span className="ln-swrow" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <i key={k} className={sw(k)} />
        ))}
      </span>
      <div className="ln-wrap">
        <div className="ln-foot-cta">
          <p data-rv>{em(c.spec.hero.headline)}</p>
          <span data-rv style={i(1)}>
            <Btn c={c} href={cta.href}>
              {cta.label} <Arrow />
            </Btn>
          </span>
        </div>
        <p className={`ln-foot-name${n > 24 ? " is-l" : n > 15 ? " is-m" : ""}`} aria-hidden="true" data-px>
          <span>
            {words.slice(0, -1).join(" ")}
            {words.length > 1 ? " " : ""}
            <em>{words[words.length - 1]}</em>
          </span>
        </p>
        <div className="ln-foot-grid">
          <div>
            <h3>{c.t.explore}</h3>
            {c.nav.map((x) => (
              <a key={x.id} href={`#${x.id}`}>
                {x.label}
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
          {c.spec.footer.blurb ? (
            <div>
              <h3>{c.name}</h3>
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
        </div>
        <Legal c={c} className="ln-legal" />
      </div>
    </footer>
  );
}

type IconName = Parameters<typeof Icon>[0]["name"];

/** Soft cards with a pebble-shaped swatch: the features. */
function Pebbles({ items }: { items: { title: string; description: string; icon: IconName }[] }) {
  return (
    <ul className={`ln-feats${items.length % 3 === 0 ? " is-3" : ""}`}>
      {items.map((it, n) => (
        <li key={n} className="ln-feat" data-rv style={i(n % 3)}>
          <span className={`ln-pebble ${sw(n + 1)}`}>
            <Icon name={it.icon} />
          </span>
          <h3>{it.title}</h3>
          <p>{it.description}</p>
        </li>
      ))}
    </ul>
  );
}

/** The process as stations on a thread that draws itself while you read. */
function Thread({ steps }: { steps: { title: string; description: string }[] }) {
  // On wide screens the stations stand in a stair (0, 46, 92, 46 px down): the thread runs
  // from circle to circle, in the coordinates of the first row.
  const cols = Math.min(steps.length, 4);
  const pts = Array.from({ length: cols }, (_, k) => [Math.round(((k * 1000) / cols) * 1.07), 24 + [0, 46, 92, 46][k]]);
  const d = pts.map(([x, y], k) => (k === 0 ? `M${x} ${y}` : `C${(pts[k - 1][0] + x) / 2} ${pts[k - 1][1]} ${(pts[k - 1][0] + x) / 2} ${y} ${x} ${y}`)).join("");
  return (
    <ol className="ln-steps" data-thread style={css({ "--n": cols })}>
      <svg className="ln-thread" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
        <path className="ln-ghostline" d="M1 0V100" pathLength={1} />
        <path d="M1 0V100" pathLength={1} />
      </svg>
      {cols > 1 ? (
        <svg className="ln-thread ln-thread-h" viewBox="0 0 1000 140" preserveAspectRatio="none" aria-hidden="true">
          <path className="ln-ghostline" d={d} pathLength={1} />
          <path d={d} pathLength={1} />
        </svg>
      ) : null}
      {steps.map((st, n) => (
        <li key={n} className="ln-step" data-rv style={i(n % 4)}>
          <b>{ROMAN[n] ?? n + 1}</b>
          <h3>{st.title}</h3>
          <p>{st.description}</p>
        </li>
      ))}
    </ol>
  );
}

/** Opening hours as a paper card with today's row in moss. */
function HoursCard({ c }: { c: Ctx }) {
  return (
    <div className="ln-card" data-rv>
      <span className="ln-card-swatch" aria-hidden="true">
        <i className="ln-sw-0" />
        <i className="ln-sw-1" />
        <i className="ln-sw-5" />
      </span>
      <div className="ln-card-top">
        <h3>{c.t.hours}</h3>
        <NowBadge c={c} className="ln-now" />
      </div>
      {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
    </div>
  );
}

/** Contact details set large on a paper card, for a contact section without a form. */
function ContactCard({ c }: { c: Ctx }) {
  const b = c.spec.business;
  const rows = [
    b.phone ? { k: c.t.phone, v: <a href={tel(b.phone)}>{b.phone}</a> } : null,
    b.email ? { k: c.t.email, v: <a href={`mailto:${b.email}`}>{b.email}</a> } : null,
    b.address || b.city ? { k: c.t.address, v: <span>{b.address ?? b.city}</span> } : null,
  ].filter((x): x is { k: string; v: React.JSX.Element } => Boolean(x));
  return (
    <div className="ln-card ln-reach" data-rv>
      <span className="ln-card-swatch" aria-hidden="true">
        <i className="ln-sw-2" />
        <i className="ln-sw-3" />
        <i className="ln-sw-4" />
      </span>
      {rows.map((r) => (
        <p key={r.k}>
          <small>{r.k}</small>
          {r.v}
        </p>
      ))}
      {b.mapsUrl ? (
        <a className="ln-link" href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
          {c.t.route} →
        </a>
      ) : null}
      <a className="btn ln-fill" href={c.spec.hero.primaryCta.href}>
        {c.spec.hero.primaryCta.label} <Arrow />
      </a>
    </div>
  );
}

export const linnen: Family = {
  key: "linnen",
  root: "d-linnen",
  fonts: ["Fraunces Soft", "Hanken Grotesk"],
  themeColor: "#efe9e0",
  accent: "#4c583c",
  onAccent: "#f8f4ed",
  // Everything comes after the shared defaults, so the kit's sections take this look.
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "ln-wrap", eyebrow: "ln-kick", btn: "ln-fill", btnAlt: "ln-ghost", btnText: "ln-link" },
  Header: (c) => (
    <>
      {Header(c)}
      {/* The drag cursor reads its word from the root; it is set here so the script needs no strings. */}
      <span hidden data-drag-label={DRAG[c.spec.meta.lang] ?? DRAG.en} />
    </>
  ),
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const p2 = p ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="ln-sec" id={s.id}>
          <div className={`ln-wrap ln-about${p ? "" : " is-solo"}`}>
            {p ? (
              <div className="ln-about-art">
                <figure className="ln-mask ln-a1" data-rv>
                  <Pic p={p} sizes="(min-width: 980px) 36vw, 82vw" />
                  {c.spec.business.city ? <figcaption>{c.spec.business.city}</figcaption> : null}
                </figure>
                {p2 ? (
                  <figure className="ln-mask ln-a2" data-rv data-px style={i(2)}>
                    <Pic p={p2} sizes="(min-width: 980px) 20vw, 46vw" />
                  </figure>
                ) : null}
              </div>
            ) : (
              <div className="ln-about-solo" data-rv aria-hidden="true">
                <i className="ln-sw-2" />
                <b>{c.name.replace(/^(studio|atelier|interieur(studio)?|salon|bureau)\s+/i, "").charAt(0)}</b>
              </div>
            )}
            <div className="ln-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="ln-lead" data-rv>
                {first}
              </p>
              {rest.length > 0 && (
                <div className={`ln-cols${rest.length > 1 ? " has-2" : ""}`} data-rv>
                  {rest.map((x, n) => (
                    <p key={n}>{x}</p>
                  ))}
                </div>
              )}
              {s.highlights.length > 0 && (
                <ul className="ln-chips" data-rv>
                  {s.highlights.map((h, n) => (
                    <li key={h}>
                      <i className={sw(n)} aria-hidden="true" />
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
      const pics = s.items.map((_, n) => c.photo(`art:svc${n}`) ?? (n < 6 ? c.spare() : null));
      const id = (n: number) => `${s.id}-m${n}`;
      return (
        <section className="ln-sec ln-room" id={s.id}>
          <div className="ln-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} split />
            <div className="ln-mat" data-mat>
              <div className="ln-mat-list" role="tablist" aria-label={s.title.replace(/\*/g, "")} data-rv>
                {s.items.map((it, n) => (
                  <button key={n} type="button" role="tab" id={`${id(n)}-t`} aria-controls={id(n)} aria-selected={n === 0} tabIndex={n === 0 ? 0 : -1}>
                    <i className={sw(n)} aria-hidden="true" />
                    <b>{it.title}</b>
                    <small>{two(n + 1)}</small>
                  </button>
                ))}
              </div>
              <div className="ln-mat-stage" data-rv style={i(1)}>
                {s.items.map((it, n) => {
                  const p = pics[n];
                  return (
                    <div key={n} className="ln-mat-panel" role="tabpanel" id={id(n)} aria-labelledby={`${id(n)}-t`} hidden={n > 0}>
                      <figure className="ln-mat-pic">
                        {p ? <Pic p={p} sizes="(min-width: 980px) 52vw, 100vw" /> : <i className={sw(n)} aria-hidden="true" />}
                        <span aria-hidden="true">
                          <i className={sw(n)} />
                          {two(n + 1)} / {two(s.items.length)}
                        </span>
                      </figure>
                      <div className="ln-mat-copy">
                        <h3>{it.title}</h3>
                        <p>{it.description}</p>
                        {it.price || it.duration ? (
                          <p className="ln-meta">
                            {it.duration ? <span>{it.duration}</span> : null}
                            {it.price ? <span>{it.price}</span> : null}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="ln-sec ln-room" id={s.id}>
          <div className="ln-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} split />
            <div className="ln-menu-cats">
              {cats.map((cat, n) => (
                <div key={n} className="ln-cat" data-rv style={i(n % 2)}>
                  <h3>
                    <i className={sw(n)} aria-hidden="true" />
                    {cat.name}
                  </h3>
                  {cat.items.map((d, m) => (
                    <div key={m} className="ln-dish">
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
      const track = `${s.id}-track`;
      return (
        <section className="ln-sec" id={s.id}>
          <div className="ln-wrap ln-proj-head">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            {pics.length > 1 ? (
              <div className="ln-proj-nav" data-rv>
                <span className="ln-count" aria-hidden="true">
                  <b>01</b> / {two(pics.length)}
                </span>
                <button type="button" data-scroll="prev" aria-controls={track} aria-label="←">
                  <Chevron />
                </button>
                <button type="button" data-scroll="next" aria-controls={track} aria-label="→">
                  <Chevron />
                </button>
              </div>
            ) : null}
          </div>
          <div className="ln-track" id={track}>
            {pics.map((p, n) => (
              <figure key={n} className="ln-slide">
                <div className="ln-mask" data-rv style={i(n % 3)}>
                  <Pic p={p} sizes="(min-width: 900px) 40vw, 80vw" />
                </div>
                <figcaption>
                  <small>{two(n + 1)}</small>
                  <span>{p.alt.replace(/^Voorbeeldfoto:\s*/i, "")}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          {pics.length > 1 ? (
            <div className="ln-prog" aria-hidden="true">
              <i />
            </div>
          ) : null}
        </section>
      );
    },
    features: (s, c) => (
      <section className="ln-sec ln-room is-moss" id={s.id}>
        <div className="ln-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} split />
          <Pebbles items={s.items} />
        </div>
      </section>
    ),
    process: (s, c) => (
      <section className="ln-sec" id={s.id}>
        <div className="ln-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} split />
          <Thread steps={s.steps} />
        </div>
      </section>
    ),
    team: (s, c) => (
      <section className="ln-sec" id={s.id}>
        <div className="ln-wrap">
          <Head kicker={c.t.kick.team} title={s.title} intro={s.intro} split />
          <ul className="ln-team">
            {s.members.map((m, n) => {
              const p = c.photo(m.image);
              return (
                <li key={n} data-rv style={i(n % 3)}>
                  {p ? (
                    <figure className="ln-mask">
                      <Pic p={p} sizes="(min-width: 900px) 28vw, 50vw" />
                    </figure>
                  ) : null}
                  <h3>{m.name}</h3>
                  <p className="ln-role">{m.role}</p>
                  {m.bio ? <p>{m.bio}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    hours: (s, c) => (
      <section className="ln-sec ln-room is-paper" id={s.id}>
        <div className="ln-wrap ln-visit">
          <div className="ln-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <HoursCard c={c} />
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="ln-sec ln-room" id={s.id}>
        <div className="ln-wrap ln-visit">
          <div className="ln-visit-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours") && c.spec.business.openingHours?.length ? <HoursCard c={c} /> : null}
          </div>
          <div className="ln-form" data-rv>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="ln-sec" id={s.id}>
        <div className="ln-wrap ln-visit">
          <div className="ln-visit-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            {s.showForm ? <Reach c={c} /> : null}
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") && c.spec.business.openingHours?.length ? <HoursCard c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="ln-form" data-rv>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : (
            <ContactCard c={c} />
          )}
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="ln-sec ln-room" id={s.id}>
        <div className="ln-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} split />
          <ul className="ln-chan">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className={`ln-pebble ${sw(n + 1)}`}>
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
