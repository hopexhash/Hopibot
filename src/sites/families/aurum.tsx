import { Fragment, type ReactNode } from "react";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Aurum: an original template (no portfolio demo). A high-fashion campaign in print: cream
 * paper, true black and a whisper of gold, a light Garamond-style serif in roman and italic,
 * tiny tracked captions ("Fig. 01") and a magazine grid. The headline rises letter by letter;
 * the cover photograph is unveiled from the top; every piece is a spread with a loupe that
 * follows the pointer; collections are tabs that unmask their pieces; the making of is told
 * sideways on a pinned horizontal track. Made for jewellers, watchmakers, boutiques, bridal
 * and other shops where the object is the story.
 */

const CSS = `
.d-aurum{--cream:#f3eee5;--paper:#ebe4d7;--bone:#faf7f1;--ink:#0e0d0b;--ink2:#2b2822;--dim:#6d6558;--gold:#a8834a;--gold-l:#d2b27c;--line:rgba(14,13,11,.14);--lined:rgba(243,238,229,.16);--pad:clamp(20px,4.6vw,88px);--ease:cubic-bezier(.16,.84,.24,1);--silk:cubic-bezier(.77,0,.18,1);--serif:"Cormorant",Garamond,Georgia,serif;--sans:"Inter",system-ui,sans-serif;--z-bg2:var(--paper);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--gold);--z-on-accent:#ffffff;--z-display:var(--serif);--z-display-weight:300;--z-radius:0;--z-field-radius:0;--z-ico-radius:50%;--z-sec:clamp(96px,11vw,190px);--z-h3:clamp(26px,2.2vw,36px);--z-statement:clamp(34px,4.8vw,84px);background:var(--cream);color:var(--ink2);font-family:var(--sans);font-size:clamp(15px,.98vw,17px);line-height:1.72}
.d-aurum ::selection{background:var(--ink);color:var(--gold-l)}
.d-aurum h1,.d-aurum h2,.d-aurum h3{font-family:var(--serif);font-weight:300;line-height:1;letter-spacing:-.012em;color:var(--ink)}
.d-aurum h1 em,.d-aurum h2 em,.d-aurum h3 em{font-style:italic;color:var(--gold)}
.d-aurum h2{font-size:clamp(44px,6vw,104px);text-wrap:balance}
.d-aurum h2.is-long{font-size:clamp(34px,4vw,68px);line-height:1.04}
.d-aurum h3{font-weight:400}
.d-aurum .au-wrap{position:relative;width:min(100%,1560px);margin-inline:auto;padding-inline:var(--pad)}
.d-aurum .au-cap{display:inline-flex;align-items:center;gap:12px;font-size:10.5px;font-weight:500;line-height:1.4;letter-spacing:.24em;text-transform:uppercase;color:var(--dim)}
.d-aurum .au-kick{display:inline-flex;align-items:center;gap:12px;font-size:10.5px;font-weight:500;line-height:1.4;letter-spacing:.26em;text-transform:uppercase;color:var(--gold)}
.d-aurum .au-kick::before{content:"";width:6px;height:6px;border-radius:50%;border:1px solid currentColor;transition:transform .9s var(--ease) .2s}
.demo-js .d-aurum .au-kick[data-rv]:not(.in)::before{transform:scale(0)}
.d-aurum .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:54px;padding:0 34px;border-radius:999px;font-size:11.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap;isolation:isolate;overflow:hidden;transition:color .5s var(--ease),background-color .5s,border-color .5s,translate .5s var(--ease)}
.d-aurum .btn>span{display:inline-flex;align-items:center;gap:14px;transition:translate .5s var(--ease)}
.d-aurum .btn::before{content:"";position:absolute;left:50%;top:50%;z-index:-1;width:120%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%) scale(0);transition:transform .7s var(--ease)}
.d-aurum .btn:hover::before{transform:translate(-50%,-50%) scale(1)}
.d-aurum .btn svg{width:14px;height:14px}
.d-aurum .au-fill{background:var(--ink);color:var(--cream)}
.d-aurum .au-fill::before{background:var(--gold)}
.d-aurum .au-fill:hover{color:var(--ink)}
.d-aurum .au-line{border:1px solid var(--ink);color:var(--ink)}
.d-aurum .au-line::before{background:var(--ink)}
.d-aurum .au-line:hover{color:var(--cream)}
.d-aurum .is-black .au-fill,.d-aurum .au-foot .au-fill{background:var(--cream);color:var(--ink)}
.d-aurum .is-black .au-line{border-color:rgba(243,238,229,.6);color:var(--cream)}
.d-aurum .is-black .au-line::before{background:var(--cream)}
.d-aurum .is-black .au-line:hover{color:var(--ink)}
.d-aurum .au-text{position:relative;display:inline-flex;align-items:center;min-height:44px;font-family:var(--serif);font-size:clamp(19px,1.4vw,22px);font-style:italic;color:inherit}
.d-aurum .au-text::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:1px;background:var(--gold);transform-origin:left;transition:transform .6s var(--silk)}
.d-aurum .au-text:hover::after{transform:scaleX(0);transform-origin:right}
.d-aurum .au-hdr{position:sticky;top:0;z-index:70;background:rgba(243,238,229,.9);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);transition:background-color .5s}
.d-aurum .au-hdr::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold) 50%,transparent);transform:scaleX(0);transition:transform 1.2s var(--ease)}
.d-aurum.is-scrolled .au-hdr::after{transform:none}
.d-aurum.menu-open .au-hdr{background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-aurum.menu-open .au-hdr::after{transform:scaleX(0)}
.d-aurum .au-bar{display:grid;grid-template-columns:44px minmax(0,1fr) 44px;align-items:center;gap:12px;height:78px;transition:height .6s var(--ease)}
.d-aurum.is-scrolled .au-bar{height:62px}
.d-aurum .au-logo{justify-self:center;display:grid;justify-items:center;min-width:0;max-width:100%;line-height:1}
.d-aurum .au-logo b{overflow:hidden;max-width:100%;font-family:var(--serif);font-size:clamp(22px,2vw,30px);font-weight:400;letter-spacing:.16em;text-transform:uppercase;text-overflow:ellipsis;white-space:nowrap;color:var(--ink);transition:letter-spacing .8s var(--ease)}
.d-aurum .au-logo small{margin-top:6px;font-size:9px;font-weight:500;letter-spacing:.42em;text-transform:uppercase;color:var(--gold);transition:opacity .4s,margin .5s var(--ease),height .5s}
.d-aurum.is-scrolled .au-logo small{height:0;margin:0;opacity:0;overflow:hidden}
.d-aurum .au-logo:hover b{letter-spacing:.22em}
.d-aurum .au-nav{display:none;gap:clamp(20px,2.4vw,40px)}
.d-aurum .au-nav a{position:relative;display:inline-flex;align-items:center;min-height:44px;font-size:10.5px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--ink2)}
.d-aurum .au-nav a::after{content:"";position:absolute;left:0;right:0;bottom:10px;height:1px;background:var(--gold);transform:scaleX(0);transition:transform .5s var(--silk)}
.d-aurum .au-nav a:hover::after{transform:none}
.d-aurum .au-nav.is-r{justify-content:flex-end}
.d-aurum .au-burger{position:relative;z-index:2;display:grid;place-items:center;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:none;grid-column:3}
.d-aurum .au-burger i{position:relative;width:22px;height:7px}
.d-aurum .au-burger i::before,.d-aurum .au-burger i::after{content:"";position:absolute;left:0;right:0;height:1px;background:var(--ink);transition:transform .6s var(--ease)}
.d-aurum .au-burger i::before{top:0}
.d-aurum .au-burger i::after{bottom:0}
.d-aurum.menu-open .au-burger i::before{transform:translateY(3px) rotate(45deg)}
.d-aurum.menu-open .au-burger i::after{transform:translateY(-3px) rotate(-45deg)}
.d-aurum .au-bar>.au-dot{grid-column:1;grid-row:1;justify-self:start;width:7px;height:7px;border-radius:50%;background:var(--gold)}
.d-aurum .au-logo{grid-column:2;grid-row:1}
@media (min-width:1080px){.d-aurum .au-bar{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);height:92px}.d-aurum .au-nav{display:flex}.d-aurum .au-burger,.d-aurum .au-bar>.au-dot{display:none}.d-aurum .au-nav.is-l{grid-column:1;grid-row:1}.d-aurum .au-nav.is-r{grid-column:3;grid-row:1}}
.d-aurum .au-menu{position:fixed;inset:0;z-index:65;display:grid;align-content:space-between;gap:36px;padding:110px var(--pad) 100px;background:var(--bone);overflow-y:auto;clip-path:circle(0 at calc(100% - var(--pad) - 22px) 39px);visibility:hidden;transition:clip-path .9s var(--silk),visibility 0s .9s}
.d-aurum .au-menu.is-open{clip-path:circle(150% at calc(100% - var(--pad) - 22px) 39px);visibility:visible;transition:clip-path 1s var(--silk)}
.d-aurum .au-menu nav{display:grid}
.d-aurum .au-menu nav a{display:grid;grid-template-columns:44px minmax(0,1fr);align-items:baseline;min-height:60px;padding:8px 0;border-bottom:1px solid var(--line);font-family:var(--serif);font-size:clamp(38px,10vw,64px);font-weight:300;line-height:1.05;color:var(--ink);opacity:0;transform:translateY(24px);transition:opacity .6s var(--ease),transform .8s var(--ease),color .3s}
.d-aurum .au-menu nav a small{font-family:var(--serif);font-size:18px;font-style:italic;color:var(--gold)}
.d-aurum .au-menu nav a:hover{font-style:italic;color:var(--gold)}
.d-aurum .au-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.35s + var(--i,0) * 60ms)}
.d-aurum .au-menu-foot{display:grid;gap:18px;color:var(--dim)}
.d-aurum .au-menu-foot a:not(.btn){display:inline-flex;align-items:center;min-height:40px;color:var(--ink)}
.d-aurum .au-hero{position:relative;display:grid;align-items:center;padding:clamp(28px,4vw,64px) 0 clamp(64px,7vw,110px);overflow:hidden}
@media (min-width:1000px){.d-aurum .au-hero{min-height:calc(100svh - 92px)}}
.d-aurum .au-hero-grid{display:grid;gap:clamp(36px,5vw,80px)}
@media (min-width:1000px){.d-aurum .au-hero-grid.has-pic{grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);align-items:end}}
.d-aurum .au-hero-copy{position:relative;z-index:2;display:grid;gap:clamp(24px,3vw,40px);align-content:end}
.d-aurum .au-hero-top{display:flex;flex-wrap:wrap;align-items:center;gap:12px 26px}
.d-aurum .au-now{display:inline-flex;align-items:center;gap:9px;font-size:10.5px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--ink2)}
.d-aurum .au-now::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 4px rgba(168,131,74,.16)}
.d-aurum .au-now.is-closed::before{background:var(--dim);box-shadow:none}
.d-aurum .au-hero h1{font-size:min(clamp(60px,9.4vw,180px),calc((100vw - 2 * var(--pad)) / (var(--mw,8) * .5)));line-height:.92;letter-spacing:-.025em}
.d-aurum .au-hero h1.is-m{font-size:min(clamp(54px,7.8vw,150px),calc((100vw - 2 * var(--pad)) / (var(--mw,8) * .5)))}
.d-aurum .au-hero h1.is-s{font-size:min(clamp(42px,5.2vw,98px),calc((100vw - 2 * var(--pad)) / (var(--mw,8) * .5)));line-height:.98}
.d-aurum .au-hero-grid:not(.has-pic) h1{max-width:14ch}
.d-aurum .au-w{display:inline-block;overflow:hidden;padding:.08em .06em .14em 0;margin:-.08em -.06em -.14em 0;vertical-align:top;white-space:nowrap}
.d-aurum .au-w.is-em{font-style:italic;color:var(--gold)}
.d-aurum .au-ch{display:inline-block;transform:translateY(115%) rotate(8deg);transform-origin:0 100%;animation:au-ch 1.25s var(--ease) both;animation-delay:calc(.25s + var(--i,0) * 32ms)}
.d-aurum .au-in{animation:au-in 1.3s var(--ease) both;animation-delay:calc(.9s + var(--i,0) * 120ms)}
.d-aurum .au-lede{max-width:44ch;font-size:clamp(16px,1.15vw,19px);color:var(--ink2)}
.d-aurum .au-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:14px 30px;margin-top:30px}
.d-aurum .au-colo{display:flex;flex-wrap:wrap;gap:8px 28px;padding-top:22px;border-top:1px solid var(--line);font-size:13px}
.d-aurum .au-colo div{display:flex;gap:10px;align-items:baseline}
.d-aurum .au-colo dt{font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.d-aurum .au-colo dd{margin:0}
.d-aurum .au-colo a{display:inline-flex;align-items:center;min-height:32px}
.d-aurum .au-cover{position:relative;margin:0}
.d-aurum .au-cover-main{position:relative;overflow:hidden;aspect-ratio:4/5;clip-path:inset(0 0 100% 0);animation:au-unveil 1.7s var(--silk) .35s both;background:var(--paper)}
@media (min-width:1000px){.d-aurum .au-cover-main{aspect-ratio:3/4}}
.d-aurum .au-cover-main img{width:100%;height:100%;object-fit:cover;animation:au-settle 2.6s var(--ease) .35s both}
.d-aurum .au-cover-main .au-par{position:absolute;inset:-5% 0;transform:translateY(calc(var(--p,0) * 4%))}
.d-aurum .au-cover-main .au-par img{height:100%}
.d-aurum .au-cover figcaption{display:flex;justify-content:space-between;gap:12px;margin-top:14px}
.d-aurum .au-detail{position:absolute;left:-14%;bottom:12%;width:38%;overflow:hidden;aspect-ratio:1;border:8px solid var(--cream);clip-path:inset(100% 0 0 0);animation:au-unveil-up 1.4s var(--silk) 1.1s both;transform:translateY(calc(var(--p,0) * -30px))}
.d-aurum .au-detail img{width:100%;height:100%;object-fit:cover}
@media (max-width:999px){.d-aurum .au-detail{left:auto;right:-4%;bottom:-6%;width:34%}}
.d-aurum .au-ring{position:relative;display:grid;place-items:center;aspect-ratio:1;width:min(100%,560px);justify-self:center;perspective:900px}
.d-aurum .au-ring i{position:absolute;inset:8%;border:1px solid var(--gold);border-radius:50%;opacity:.75;transform:rotateZ(calc(var(--i,0) * 60deg)) rotateX(72deg);animation:au-turn 26s linear infinite}
@media (min-width:1000px){.d-aurum .au-hero-grid:not(.has-pic){grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:center}}
@media (max-width:999px){.d-aurum .au-ring{width:min(100%,340px)}}
.d-aurum .au-ring span{position:relative;font-family:var(--serif);font-size:clamp(110px,16vw,260px);font-style:italic;font-weight:300;line-height:1;color:var(--ink)}
.d-aurum .au-sec{position:relative;padding-block:var(--z-sec)}
.d-aurum .is-paper{background:var(--paper)}
.d-aurum .is-bone{background:var(--bone)}
.d-aurum .is-black{--z-bg2:#1a1815;--z-ink:var(--cream);--z-dim:rgba(243,238,229,.62);--z-line:var(--lined);--z-accent:var(--gold-l);--z-on-accent:var(--ink);background:var(--ink);color:rgba(243,238,229,.82)}
.d-aurum .is-black h2,.d-aurum .is-black h3{color:var(--cream)}
.d-aurum .is-black h2 em,.d-aurum .is-black h3 em,.d-aurum .is-black .au-kick{color:var(--gold-l)}
.d-aurum .is-black .au-cap{color:rgba(243,238,229,.55)}
.d-aurum .au-head{display:grid;gap:20px;margin-bottom:clamp(48px,6vw,100px)}
.d-aurum .au-head>p:not(.au-kick){max-width:52ch;color:var(--z-dim)}
.d-aurum .au-head.is-c{justify-items:center;text-align:center}
.d-aurum .au-head.is-c h2{max-width:18ch}
.d-aurum .au-about{display:grid;gap:clamp(48px,6vw,110px)}
@media (min-width:1000px){.d-aurum .au-about.has-pic{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}}
.d-aurum .au-about-pic{position:relative;margin:0;align-self:start}
.d-aurum .au-about-pic>div{overflow:hidden;aspect-ratio:3/4}
.d-aurum .au-about-pic img{width:100%;height:112%;object-fit:cover;transform:translateY(calc(-6% + var(--p,0) * 5%))}
.d-aurum .au-about-pic figcaption{display:flex;justify-content:space-between;margin-top:14px}
@media (min-width:1000px){.d-aurum .au-about-pic{position:sticky;top:120px}}
.d-aurum .au-about-copy{display:grid;gap:34px;align-content:start}
.d-aurum .au-about-copy .au-head{margin-bottom:0}
.d-aurum .au-lead{font-family:var(--serif);font-size:clamp(24px,2.3vw,38px);font-weight:300;line-height:1.3;color:var(--ink)}
.d-aurum .au-lead::first-letter{float:left;margin:.08em .1em 0 0;font-size:3.4em;line-height:.72;font-style:italic;color:var(--gold)}
.d-aurum .au-cols{display:grid;gap:18px 44px;color:var(--dim)}
@media (min-width:760px){.d-aurum .au-cols.has-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-aurum .au-mats{display:flex;flex-wrap:wrap;gap:10px}
.d-aurum .au-mats li{display:inline-flex;align-items:center;gap:10px;min-height:40px;padding:0 18px;border:1px solid var(--line);border-radius:999px;font-size:12.5px;letter-spacing:.06em;transition:border-color .4s,background-color .4s}
.d-aurum .au-mats li::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--gold)}
.d-aurum .au-mats li:hover{border-color:var(--gold);background:var(--bone)}
.d-aurum .au-pieces{display:grid;gap:clamp(72px,10vw,180px)}
.d-aurum .au-piece{display:grid;gap:clamp(24px,4vw,72px);align-items:center}
@media (min-width:900px){.d-aurum .au-piece{grid-template-columns:repeat(12,minmax(0,1fr))}.d-aurum .au-piece .au-loupe{grid-column:1/span 7}.d-aurum .au-piece .au-piece-copy{grid-column:9/span 4}.d-aurum .au-piece:nth-child(even) .au-loupe{grid-column:6/span 7;grid-row:1}.d-aurum .au-piece:nth-child(even) .au-piece-copy{grid-column:1/span 4;grid-row:1}.d-aurum .au-piece:nth-child(3n) .au-loupe{grid-column:2/span 6}}
.d-aurum .au-loupe{position:relative;margin:0}
.d-aurum .au-loupe>div{position:relative;overflow:hidden;aspect-ratio:4/5;background:var(--paper);cursor:zoom-in;clip-path:inset(0);transition:clip-path 1.5s var(--silk)}
.demo-js .d-aurum .au-loupe[data-rv]{opacity:1;transform:none}
.demo-js .d-aurum .au-loupe[data-rv]:not(.in)>div{clip-path:inset(0 0 100% 0)}
.d-aurum .au-loupe img{width:100%;height:100%;object-fit:cover;transform-origin:var(--zx,50%) var(--zy,50%);transition:transform .9s var(--ease)}
.d-aurum .au-loupe:hover img{transform:scale(1.06)}
.d-aurum .au-loupe.is-zoom img{transform:scale(2.1);transition:transform .6s var(--ease)}
.d-aurum .au-loupe figcaption{display:flex;justify-content:space-between;gap:16px;margin-top:14px}
.d-aurum .au-piece-copy{display:grid;gap:18px;align-content:center}
.d-aurum .au-piece-copy h3{font-size:clamp(36px,3.6vw,64px);font-weight:300;line-height:1}
.d-aurum .au-piece-copy p{color:var(--dim)}
.d-aurum .au-note{display:grid;gap:4px;padding-top:16px;border-top:1px solid var(--line)}
.d-aurum .au-price{font-family:var(--serif);font-size:clamp(24px,1.9vw,30px);font-style:italic;color:var(--ink)}
.is-black .au-price{color:var(--cream)}
.d-aurum .au-list{display:grid;border-top:1px solid var(--z-line)}
@media (min-width:900px){.d-aurum .au-list.is-2{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:clamp(40px,5vw,96px)}}
.d-aurum .au-item{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 24px;align-items:baseline;padding:22px 0;border-bottom:1px solid var(--z-line);transition:padding .5s var(--ease)}
.d-aurum .au-item:hover{padding-left:10px}
.d-aurum .au-item::after{content:"";position:absolute;left:0;bottom:-1px;width:100%;height:1px;background:var(--z-accent);transform:scaleX(0);transform-origin:left;transition:transform .7s var(--silk)}
.d-aurum .au-item:hover::after{transform:none}
.d-aurum .au-item h3{font-size:clamp(24px,1.9vw,32px)}
.d-aurum .au-item .au-price{font-size:clamp(20px,1.6vw,26px)}
.d-aurum .au-item p{grid-column:1/-1;max-width:58ch;font-size:.95em;color:var(--z-dim)}
.d-aurum .au-item small{grid-column:1/-1;font-size:10.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--z-accent)}
.d-aurum .au-tabs{position:relative;display:flex;gap:clamp(18px,3vw,56px);margin-bottom:clamp(40px,5vw,72px);overflow-x:auto;scrollbar-width:none;border-bottom:1px solid var(--z-line)}
.d-aurum .au-tabs::-webkit-scrollbar{display:none}
.d-aurum .au-tabs button{position:relative;flex:none;display:inline-flex;align-items:baseline;gap:8px;min-height:60px;padding:0 0 10px;border:0;background:none;font-family:var(--serif);font-size:clamp(24px,2.4vw,38px);font-weight:300;color:var(--z-dim);transition:color .4s}
.d-aurum .au-tabs button sup{font-family:var(--sans);font-size:10px;font-weight:500;letter-spacing:.1em;color:var(--z-accent)}
.d-aurum .au-tabs button:hover{color:var(--z-ink)}
.d-aurum .au-tabs button[aria-selected="true"]{font-style:italic;color:var(--z-ink)}
.d-aurum .au-tabs .au-bead{position:absolute;left:0;bottom:-1px;width:var(--w,0);height:1px;background:var(--z-accent);transform:translateX(var(--x,0));transition:transform .7s var(--silk),width .7s var(--silk)}
.d-aurum .au-panel{display:grid;gap:clamp(32px,5vw,90px)}
.d-aurum .au-panel[hidden]{display:none}
@media (min-width:1000px){.d-aurum .au-panel.has-pic{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);align-items:start}}
.d-aurum .au-panel-pic{position:relative;margin:0;overflow:hidden;aspect-ratio:4/5;background:var(--paper)}
@media (min-width:1000px){.d-aurum .au-panel-pic{position:sticky;top:120px}}
.d-aurum .au-panel-pic img{width:100%;height:100%;object-fit:cover;animation:au-settle 1.8s var(--ease) both}
.d-aurum .au-panel-pic{animation:au-mask 1.3s var(--silk) both}
.d-aurum .au-panel-pic figcaption{position:absolute;left:16px;bottom:16px;padding:8px 14px;background:var(--cream);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--ink)}
.d-aurum .au-panel .au-item{animation:au-rise 1s var(--ease) both;animation-delay:calc(.15s + var(--i,0) * 80ms)}
.demo-js .d-aurum .au-panel:not(.is-seen) .au-item,.demo-js .d-aurum .au-panel:not(.is-seen) .au-panel-pic,.demo-js .d-aurum .au-panel:not(.is-seen) .au-panel-pic img{animation-play-state:paused}
.d-aurum .au-feats{display:grid;border-top:1px solid var(--z-line)}
@media (min-width:800px){.d-aurum .au-feats{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1100px){.d-aurum .au-feats.n3,.d-aurum .au-feats.n5,.d-aurum .au-feats.n6{grid-template-columns:repeat(3,minmax(0,1fr))}.d-aurum .au-feats.n4{grid-template-columns:repeat(4,minmax(0,1fr))}}
.d-aurum .au-feats li{display:grid;gap:16px;align-content:start;justify-items:center;padding:clamp(36px,4vw,64px) clamp(16px,2vw,40px);border-bottom:1px solid var(--z-line);text-align:center;transition:background-color .6s}
@media (min-width:800px){.d-aurum .au-feats li{border-right:1px solid var(--z-line)}}
.d-aurum .au-feats li:hover{background:rgba(210,178,124,.06)}
.d-aurum .au-feats b{font-family:var(--serif);font-size:clamp(30px,2.6vw,42px);font-style:italic;font-weight:300;line-height:1;color:var(--z-accent)}
.d-aurum .au-feats .au-ico{display:grid;place-items:center;width:52px;height:52px;border:1px solid var(--z-line);border-radius:50%;color:var(--z-accent);transition:transform 1s var(--ease),border-color .4s}
.d-aurum .au-feats li:hover .au-ico{transform:rotate(180deg);border-color:var(--z-accent)}
.d-aurum .au-feats svg{width:20px;height:20px;stroke-width:1.2}
.d-aurum .au-feats h3{font-size:clamp(26px,2.1vw,34px)}
.d-aurum .au-feats p{max-width:34ch;color:var(--z-dim)}
.d-aurum .au-hs{position:relative}
.d-aurum .au-hs-track{display:grid;gap:0}
.d-aurum .au-hs-intro+.au-hs-step{border-top:1px solid var(--z-line)}
.d-aurum .au-hs-step{position:relative;display:grid;grid-template-columns:72px minmax(0,1fr);gap:6px 18px;padding:clamp(28px,3vw,44px) 0;border-bottom:1px solid var(--z-line)}
.d-aurum .au-hs-step b{font-family:var(--serif);font-size:clamp(48px,5vw,72px);font-style:italic;font-weight:300;line-height:.85;color:var(--z-accent)}
.d-aurum .au-hs-step h3{font-size:clamp(28px,2.6vw,42px)}
.d-aurum .au-hs-step p{grid-column:2;max-width:46ch;color:var(--z-dim)}
.d-aurum .au-hs-bar{display:none}
.d-aurum .au-hs.is-live .au-hs-pin{position:sticky;top:0;display:grid;grid-template-columns:minmax(0,1fr);align-content:center;height:100svh;overflow:hidden}
.d-aurum .au-hs.is-live .au-hs-pin>.au-wrap{width:100%;max-width:none;padding:0}
.d-aurum .au-hs.is-live .au-hs-track{display:flex;width:max-content;gap:0;padding-inline:var(--pad);border:0;transform:translate3d(calc(var(--hx,0) * -1px),0,0);will-change:transform}
.d-aurum .au-hs.is-live .au-hs-step{flex:none;display:grid;grid-template-columns:1fr;align-content:start;gap:22px;width:clamp(340px,34vw,560px);min-height:min(58vh,520px);padding:0 clamp(28px,3vw,56px);border:0;border-left:1px solid var(--z-line)}
.d-aurum .au-hs.is-live .au-hs-step b{font-size:clamp(120px,11vw,200px)}
.d-aurum .au-hs.is-live .au-hs-step p{grid-column:1}
.d-aurum .au-hs.is-live .au-hs-intro{width:clamp(380px,38vw,640px);padding-right:clamp(40px,5vw,96px)}
.d-aurum .au-hs.is-live .au-hs-intro .au-head{margin:0}
.d-aurum .au-hs-intro{border:0}
.d-aurum .au-hs.is-live .au-hs-intro{display:grid;align-content:start;flex:none}
.d-aurum .au-hs.is-live .au-hs-intro h2{font-size:clamp(44px,4.6vw,84px)}
.d-aurum .au-hs.is-live .au-hs-bar{display:block;width:min(100% - 2 * var(--pad),1560px - 2 * var(--pad));height:1px;margin:clamp(40px,6vh,72px) auto 0;background:var(--z-line)}
.d-aurum .au-hs-bar i{display:block;height:100%;background:var(--z-accent);transform:scaleX(var(--hp,0));transform-origin:left}
.d-aurum .au-look{display:grid;gap:clamp(10px,1.4vw,22px);grid-template-columns:repeat(2,minmax(0,1fr))}
.d-aurum .au-look figure{position:relative;margin:0;overflow:hidden;background:var(--paper)}
.d-aurum .au-look figure>div{aspect-ratio:4/5;overflow:hidden;clip-path:inset(0);transition:clip-path 1.4s var(--silk);transition-delay:calc(var(--i,0) * 110ms)}
@media (max-width:899px){.d-aurum .au-look figure:first-child,.d-aurum .au-look figure:last-child:nth-child(even){grid-column:1/-1}.d-aurum .au-look figure:first-child>div,.d-aurum .au-look figure:last-child:nth-child(even)>div{aspect-ratio:4/3}}
@media (max-width:520px){.d-aurum .au-logo b{font-size:20px;letter-spacing:.08em}.d-aurum .btn{padding:12px 24px;white-space:normal;text-align:center;line-height:1.5}}
@media (min-width:900px){.d-aurum .au-look{display:block;columns:3;column-gap:clamp(14px,1.6vw,26px)}.d-aurum .au-look.n1{columns:1}.d-aurum .au-look figure{break-inside:avoid;margin-bottom:clamp(14px,1.6vw,26px)}.d-aurum .au-look figure:nth-child(3n+2)>div{aspect-ratio:1}.d-aurum .au-look figure:nth-child(3n)>div{aspect-ratio:3/4}.d-aurum .au-look figure:nth-child(4n+1)>div{aspect-ratio:4/5.6}}
.demo-js .d-aurum .au-look figure[data-rv]{opacity:1;transform:none}
.demo-js .d-aurum .au-look figure[data-rv]:not(.in)>div{clip-path:inset(0 100% 0 0)}
.d-aurum .au-look img{width:100%;height:100%;object-fit:cover;transition:transform 1.6s var(--ease),filter 1s}
.d-aurum .au-look figure:hover img{transform:scale(1.05)}
.d-aurum .au-look figcaption{position:absolute;left:14px;bottom:14px;padding:6px 12px;background:var(--cream);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--ink);opacity:0;transform:translateY(8px);transition:opacity .5s,transform .6s var(--ease)}
.d-aurum .au-look figure:hover figcaption{opacity:1;transform:none}
.d-aurum .au-state{display:grid;justify-items:center;gap:30px;text-align:center}
.d-aurum .au-state h2{max-width:24ch;font-size:var(--z-statement);font-style:italic;line-height:1.1}
.d-aurum .au-state h2 em{font-style:normal}
.d-aurum .au-state .au-sw{display:inline-block;opacity:.12;transition:opacity 1.1s var(--ease);transition-delay:calc(var(--i,0) * 60ms)}
.d-aurum .au-state.in .au-sw,html:not(.demo-js) .d-aurum .au-sw{opacity:1}
.demo-js .d-aurum .au-state[data-rv]{opacity:1;transform:none}
.d-aurum .au-rule{display:flex;align-items:center;gap:16px;color:var(--gold)}
.d-aurum .au-rule::before,.d-aurum .au-rule::after{content:"";width:clamp(60px,10vw,160px);height:1px;background:currentColor;transform:scaleX(0);transition:transform 1.4s var(--ease) .3s}
.d-aurum .au-rule::before{transform-origin:right}
.d-aurum .au-rule::after{transform-origin:left}
.d-aurum .in .au-rule::before,.d-aurum .in .au-rule::after,html:not(.demo-js) .d-aurum .au-rule::before,html:not(.demo-js) .d-aurum .au-rule::after{transform:none}
.d-aurum .au-rule i{width:7px;height:7px;border:1px solid currentColor;border-radius:50%}
.d-aurum .au-cta{display:grid;justify-items:center;gap:30px;text-align:center}
.d-aurum .au-cta h2{max-width:16ch;font-size:clamp(48px,7vw,128px)}
.d-aurum .au-cta p{max-width:48ch;color:var(--z-dim)}
.d-aurum .au-split{display:grid;gap:clamp(44px,6vw,110px)}
@media (min-width:1000px){.d-aurum .au-split{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.d-aurum .au-split.is-solo{grid-template-columns:minmax(0,1fr);max-width:980px}
.d-aurum .au-split-copy{display:grid;gap:26px;align-content:start}
.d-aurum .au-split-copy .au-head{margin-bottom:4px}
.d-aurum .au-split-copy>p{max-width:46ch;color:var(--z-dim)}
.d-aurum .au-visit{display:grid;gap:20px}
.d-aurum .au-visit>div:first-child{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px}
.d-aurum .is-black .au-now{color:var(--cream)}
.d-aurum .z-hours{border-top:1px solid var(--z-line)}
.d-aurum .z-hours div{align-items:baseline;padding:18px 0;transition:padding .5s var(--ease)}
.d-aurum .z-hours dt{font-family:var(--serif);font-size:clamp(20px,1.6vw,26px);color:var(--z-ink)}
.d-aurum .z-hours dd{font-size:14px;letter-spacing:.06em}
.d-aurum .z-hours div.is-today{padding-inline:16px;background:rgba(168,131,74,.12)}
.d-aurum .z-hours div.is-today dt{font-style:italic;color:var(--z-accent)}
.d-aurum .z-hours div.is-today dd{color:var(--z-ink)}
.d-aurum .au-form{position:relative;padding:clamp(28px,4vw,60px);background:var(--bone);box-shadow:0 30px 80px -50px rgba(14,13,11,.35)}
.d-aurum .is-black .au-form{background:#191714;box-shadow:none;border:1px solid var(--lined)}
.d-aurum .au-form::before{content:"";position:absolute;left:50%;top:0;width:64px;height:1px;background:var(--gold);transform:translateX(-50%);transition:width 1.2s var(--ease)}
.d-aurum .au-form:hover::before{width:100%}
.d-aurum .z-field label,.d-aurum .z-chipset legend{font-size:10px;font-weight:500;letter-spacing:.24em}
.d-aurum .z-field input,.d-aurum .z-field select,.d-aurum .z-field textarea{padding:12px 0;border-width:0 0 1px;border-color:var(--z-line);transition:border-color .4s}
.d-aurum .z-field select{background:transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23a8834a'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E") no-repeat right 4px center}
.d-aurum .z-field :focus-visible{outline:none;border-color:var(--gold)}
.d-aurum .z-chips button{border-radius:999px}
.d-aurum .form-status{border-color:var(--gold)}
.d-aurum .z-sec.z-faq{background:var(--bone)}
.d-aurum .z-acc summary{font-family:var(--serif);font-size:clamp(23px,2vw,32px);font-weight:400;line-height:1.2;transition:color .3s}
.d-aurum .z-acc summary:hover,.d-aurum .z-acc details[open] summary{font-style:italic;color:var(--gold)}
.d-aurum .z-acc summary i{width:15px;height:15px}
.d-aurum .z-card{background:var(--bone);border-color:var(--line);transition:transform .7s var(--ease),box-shadow .7s var(--ease)}
.d-aurum .z-card:hover{transform:translateY(-6px);box-shadow:0 30px 60px -40px rgba(14,13,11,.4)}
.d-aurum .z-card h3{font-size:clamp(28px,2.4vw,38px)}
.d-aurum .z-pack.is-featured{background:var(--ink);color:rgba(243,238,229,.82);--z-ink:var(--cream);--z-dim:rgba(243,238,229,.62);--z-line:var(--lined);--z-accent:var(--gold-l)}
.d-aurum .z-pack.is-featured h3{color:var(--cream)}
.d-aurum .z-pack-price b{font-style:italic}
.d-aurum .z-sec.z-packages{background:var(--paper)}
.d-aurum .z-team .z-pic{aspect-ratio:3/4}
.d-aurum .z-team .z-pic img{transition:transform 1.4s var(--ease)}
.d-aurum .z-team li:hover .z-pic img{transform:scale(1.05)}
.d-aurum .z-team .z-grid h3{font-style:italic}
.d-aurum .z-quotes blockquote>p{font-style:italic;font-weight:300;font-size:clamp(24px,2.2vw,34px)}
.d-aurum .z-steps small,.d-aurum .z-rows small{font-family:var(--serif);font-size:24px;font-style:italic;letter-spacing:0}
.d-aurum .z-channel{background:var(--bone);transition:border-color .4s,transform .6s var(--ease)}
.d-aurum .z-channel:hover{transform:translateY(-4px)}
.d-aurum .z-showcase h2{font-size:clamp(44px,6vw,110px);font-style:italic}
.d-aurum .z-showcase.has-pic h2{color:#fff}
.d-aurum .z-showcase.has-pic::after{background:linear-gradient(90deg,rgba(14,13,11,.6),rgba(14,13,11,0) 65%),linear-gradient(180deg,rgba(14,13,11,0) 35%,rgba(14,13,11,.7))}
.d-aurum .z-showcase.has-pic .au-line{border-color:rgba(255,255,255,.7);color:#fff}
.d-aurum .z-showcase.has-pic .au-line::before{background:#fff}
.d-aurum .z-showcase.has-pic .au-line:hover{color:var(--ink)}
.d-aurum .z-ba{border:8px solid var(--bone)}
.d-aurum .au-foot{position:relative;padding:clamp(90px,10vw,150px) 0 150px;background:var(--ink);color:rgba(243,238,229,.78);overflow:hidden}
.d-aurum .au-foot-top{display:grid;justify-items:center;gap:30px;text-align:center}
.d-aurum .au-foot-top p{max-width:22ch;font-family:var(--serif);font-size:clamp(34px,4vw,64px);font-weight:300;line-height:1.08;color:var(--cream)}
.d-aurum .au-foot-top p em{color:var(--gold-l)}
.d-aurum .au-sig{display:block;margin:clamp(56px,8vw,120px) 0 clamp(40px,6vw,80px);font-family:var(--serif);font-size:clamp(56px,13vw,260px);font-style:italic;font-weight:300;line-height:.9;letter-spacing:-.03em;text-align:center;white-space:nowrap;color:transparent;background:linear-gradient(100deg,#8a6a3a 0%,#e6cd97 30%,#a8834a 50%,#f1dfb5 70%,#8a6a3a 100%) 0 0/250% 100%;-webkit-background-clip:text;background-clip:text;animation:au-sheen 9s ease-in-out infinite alternate}
.d-aurum .au-foot-grid{display:grid;gap:36px;padding-top:clamp(36px,4vw,56px);border-top:1px solid var(--lined);grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}
.d-aurum .au-foot-grid h3{margin-bottom:14px;font-family:var(--sans);font-size:10px;font-weight:500;letter-spacing:.26em;text-transform:uppercase;color:var(--gold-l)}
.d-aurum .au-foot-grid a,.d-aurum .au-foot-grid span{display:block;padding:5px 0}
.d-aurum .au-foot-grid a{transition:color .3s,font-style .3s}
.d-aurum .au-foot-grid a:hover{color:var(--cream)}
.d-aurum .au-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:60px;font-size:12px;color:rgba(243,238,229,.45)}
@keyframes au-ch{to{transform:none}}
@keyframes au-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes au-unveil{to{clip-path:inset(0)}}
@keyframes au-unveil-up{to{clip-path:inset(0)}}
@keyframes au-settle{from{transform:scale(1.22)}to{transform:none}}
@keyframes au-mask{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0)}}
@keyframes au-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes au-turn{from{transform:rotateZ(calc(var(--i,0) * 60deg)) rotateY(0) rotateX(72deg)}to{transform:rotateZ(calc(var(--i,0) * 60deg)) rotateY(360deg) rotateX(72deg)}}
@keyframes au-sheen{to{background-position:100% 0}}
@media (prefers-reduced-motion:reduce){.d-aurum .au-ch{transform:none}.d-aurum .au-cover-main,.d-aurum .au-detail,.d-aurum .au-panel-pic{clip-path:none}.d-aurum .au-ring i{animation:none}.d-aurum .au-sig{animation:none}.d-aurum .au-sw{opacity:1}.d-aurum .btn{translate:none!important}.d-aurum .btn>span{translate:none!important}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The stylesheet in two parts: rules that restyle the kit's shared sections (.z-*, forms) go
 * after the shared defaults (BASE_CSS), so they win; everything else comes before.
 */
function partition(all: string): [own: string, kit: string] {
  const own: string[] = [];
  const kit: string[] = [];
  let depth = 0;
  let start = 0;
  for (let n = 0; n < all.length; n++) {
    if (all[n] === "{") depth++;
    else if (all[n] === "}" && --depth === 0) {
      const block = all.slice(start, n + 1);
      (/\.z-|form-status|form-note/.test(block) && !block.startsWith("@keyframes") ? kit : own).push(block);
      start = n + 1;
    }
  }
  return [own.join(""), kit.join("")];
}
const [OWN, KIT] = partition(CSS);

/**
 * Buttons lean towards the pointer; a piece's photograph becomes a loupe under the pointer;
 * the collection tabs move a gold bead and unmask the panel once it is seen; the making of
 * runs sideways while the page scrolls (pinned on wide screens, a plain list elsewhere).
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-aurum');if(!root)return;var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches,fine=W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches;
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
if(fine&&!reduce){q('.d-aurum .btn').forEach(function(b){var sp=b.querySelector('span');b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;b.style.translate=(x*.18).toFixed(1)+'px '+(y*.3).toFixed(1)+'px';if(sp)sp.style.translate=(x*.1).toFixed(1)+'px '+(y*.14).toFixed(1)+'px'});b.addEventListener('pointerleave',function(){b.style.translate='';if(sp)sp.style.translate=''})});
q('[data-zoom]').forEach(function(f){var box=f.firstElementChild;box.addEventListener('pointermove',function(e){var r=box.getBoundingClientRect();f.style.setProperty('--zx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');f.style.setProperty('--zy',((e.clientY-r.top)/r.height*100).toFixed(1)+'%')});box.addEventListener('pointerenter',function(){f.classList.add('is-zoom')});box.addEventListener('pointerleave',function(){f.classList.remove('is-zoom')})})}
q('.au-tabs').forEach(function(list){var bead=list.querySelector('.au-bead');function place(){var t=list.querySelector('[aria-selected="true"]');if(!t||!bead)return;list.style.setProperty('--x',t.offsetLeft+'px');list.style.setProperty('--w',t.offsetWidth+'px')}q('[role=tab]',list).forEach(function(t){t.addEventListener('click',function(){setTimeout(place,0)});t.addEventListener('keydown',function(){setTimeout(place,0)})});place();W.addEventListener('resize',place);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(place)});
var panels=q('.au-panel');if(panels.length){if(reduce||!('IntersectionObserver' in W))panels.forEach(function(p){p.classList.add('is-seen')});else{var pio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){q('.au-panel',e.target.closest('section')).forEach(function(p){p.classList.add('is-seen')});pio.unobserve(e.target)}})},{threshold:.15});panels.forEach(function(p){pio.observe(p)})}}
var hs=q('[data-hs]').map(function(s){return{el:s,pin:s.querySelector('.au-hs-pin'),tr:s.querySelector('.au-hs-track'),bar:s.querySelector('.au-hs-bar'),dist:0}});var mq=W.matchMedia?W.matchMedia('(min-width: 1000px)'):null;
function setup(){var ok=!reduce&&mq&&mq.matches;hs.forEach(function(H){H.el.classList.toggle('is-live',!!ok);if(!ok){H.el.style.height='';return}H.dist=Math.max(0,H.tr.scrollWidth-W.innerWidth);H.el.style.height=(H.dist+W.innerHeight)+'px'});tick()}
function tick(){raf=0;hs.forEach(function(H){if(!H.el.classList.contains('is-live'))return;var r=H.el.getBoundingClientRect();var p=Math.max(0,Math.min(1,-r.top/Math.max(1,H.dist)));H.tr.style.setProperty('--hx',(p*H.dist).toFixed(1));if(H.bar)H.bar.style.setProperty('--hp',p.toFixed(4))})}
var raf=0;W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(tick)},{passive:true});W.addEventListener('resize',setup);if(mq&&mq.addEventListener)mq.addEventListener('change',setup);setup();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(setup);W.addEventListener('load',setup)})();`;

type IconName = Parameters<typeof Icon>[0]["name"];
const two = (n: number) => String(n).padStart(2, "0");
const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];

const Arrow = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
    <path d="M1 7h12M8.5 2.5 13 7l-4.5 4.5" />
  </svg>
);

function Head({ kicker, title, intro, id, center }: { kicker?: string; title: string; intro?: string; id?: string; center?: boolean }) {
  return (
    <header className={`au-head${center ? " is-c" : ""}`}>
      {kicker ? (
        <p className="au-kick" data-rv>
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

/** The headline as letters that rise one by one; words never break, the *marked* phrase is italic gold. */
function Letters({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let n = 0;
  let w = 0;
  text.split(/\*([^*]+)\*/).forEach((chunk, k) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => {
        out.push(
          <span key={w++} className={`au-w${k % 2 ? " is-em" : ""}`}>
            {[...word].map((ch) => (
              <span key={n} className="au-ch" style={i(n++)}>
                {ch}
              </span>
            ))}
          </span>,
          " ",
        );
      }),
  );
  return <>{out}</>;
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const half = Math.ceil(Math.min(c.nav.length, 4) / 2);
  const left = c.nav.slice(0, half);
  const right = c.nav.slice(half, 4);
  return (
    <>
      <header className="au-hdr hdr">
        <div className="au-wrap au-bar">
          <span className="au-dot" aria-hidden="true" />
          <nav aria-label={c.t.menu} className="au-nav is-l" data-nav>
            {left.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#top" className="au-logo" aria-label={c.name}>
            <b>{c.name}</b>
            {b.city ? <small>{b.city}</small> : null}
          </a>
          <nav aria-label={c.t.menu} className="au-nav is-r" data-nav>
            {right.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
            <a href={cta.href}>{cta.label}</a>
          </nav>
          <button type="button" className="au-burger menu-btn" aria-expanded="false" aria-controls="site-menu" aria-label={c.t.menu}>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="au-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{ROMAN[k] ?? k + 1}.</small>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="au-menu-foot">
          <p>
            {b.address ?? b.city}
            {b.phone ? (
              <>
                <br />
                <a href={tel(b.phone)}>{b.phone}</a>
              </>
            ) : null}
          </p>
          <p>
            <Btn c={c} href={cta.href}>
              <span>
                {cta.label} <Arrow />
              </span>
            </Btn>
          </p>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const main = c.photo(hero.image);
  const detail = main ? c.spare() : null;
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 44 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const longest = Math.max(...plain.split(/\s+/).map((w) => w.length), 6);
  const facts = heroFacts(c);
  return (
    <section className="au-hero">
      <div className={`au-wrap au-hero-grid${main ? " has-pic" : ""}`}>
        <div className="au-hero-copy">
          <div className="au-hero-top au-in">
            {hero.eyebrow ? <p className="au-kick">{hero.eyebrow}</p> : null}
            <NowBadge c={c} className="au-now" />
          </div>
          <h1 className={size} style={css({ "--mw": longest })}>
            <Letters text={hero.headline} />
          </h1>
          <div className="au-in" style={i(1)}>
            <p className="au-lede">{hero.subheadline}</p>
            <div className="au-ctas">
              <Btn c={c} href={hero.primaryCta.href}>
                <span>
                  {hero.primaryCta.label} <Arrow />
                </span>
              </Btn>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="text">
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
            </div>
          </div>
          {facts.length > 0 && (
            <dl className="au-colo au-in" style={i(2)}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {main ? (
          <figure className="au-cover" data-px>
            <div className="au-cover-main">
              <div className="au-par">
                <Pic p={main} eager sizes="(min-width: 1000px) 42vw, 100vw" />
              </div>
            </div>
            {detail ? (
              <div className="au-detail">
                <Pic p={detail} eager sizes="(min-width: 1000px) 16vw, 34vw" />
              </div>
            ) : null}
            <figcaption className="au-cap au-in" style={i(3)}>
              <span>Fig. 01</span>
              <span>{c.name}</span>
            </figcaption>
          </figure>
        ) : (
          <div className="au-ring" aria-hidden="true">
            <i style={i(0)} />
            <i style={i(1)} />
            <i style={i(2)} />
            <span>{c.name.charAt(0)}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="au-foot">
      <div className="au-wrap">
        <div className="au-foot-top">
          <span className="au-rule" aria-hidden="true">
            <i />
          </span>
          <p data-rv>{em(c.spec.hero.headline)}</p>
          <div data-rv>
            <Btn c={c} href={cta.href}>
              <span>
                {cta.label} <Arrow />
              </span>
            </Btn>
          </div>
        </div>
        <span className="au-sig" aria-hidden="true">
          {c.name}
        </span>
        <div className="au-foot-grid">
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
              <h3>{c.name}</h3>
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
        </div>
        <Legal c={c} className="au-legal" />
      </div>
    </footer>
  );
}

type Item = { title: string; text?: string; price?: string | null; note?: string | null };

/** A price list in one or two columns: pieces, dishes or services without photographs. */
function List({ items, two: cols }: { items: Item[]; two?: boolean }) {
  return (
    <ol className={`au-list${cols && items.length > 3 ? " is-2" : ""}`}>
      {items.map((it, n) => (
        <li key={n} className="au-item" data-rv style={i(n % 6)}>
          {it.note ? <small>{it.note}</small> : null}
          <h3>{it.title}</h3>
          {it.price ? <span className="au-price">{it.price}</span> : <span />}
          {it.text ? <p>{it.text}</p> : null}
        </li>
      ))}
    </ol>
  );
}

function Split({ id, tone, kicker, title, body, side, children }: { id: string; tone?: string; kicker: string; title: string; body?: string; side?: ReactNode; children?: ReactNode }) {
  return (
    <section className={`au-sec${tone ? ` ${tone}` : ""}`} id={id}>
      <div className={`au-wrap au-split${children ? "" : " is-solo"}`}>
        <div className="au-split-copy">
          <Head kicker={kicker} title={title} />
          {body ? <p data-rv>{body}</p> : null}
          {side}
        </div>
        {children}
      </div>
    </section>
  );
}

export const aurum: Family = {
  key: "aurum",
  root: "d-aurum",
  fonts: ["Cormorant", "Inter"],
  themeColor: "#f3eee5",
  accent: "#a8834a",
  onAccent: "#ffffff",
  css: OWN,
  extra: KIT,
  js: JS + TODAY_JS,
  cls: { wrap: "au-wrap", eyebrow: "au-kick", btn: "au-fill", btnAlt: "au-line", btnText: "au-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="au-sec is-bone" id={s.id}>
          <div className={`au-wrap au-about${p ? " has-pic" : ""}`}>
            {p ? (
              <figure className="au-about-pic" data-rv data-px>
                <div>
                  <Pic p={p} sizes="(min-width: 1000px) 34vw, 100vw" />
                </div>
                <figcaption className="au-cap">
                  <span>Fig. 02</span>
                  <span>{c.spec.business.city ?? c.name}</span>
                </figcaption>
              </figure>
            ) : null}
            <div className="au-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="au-lead" data-rv>
                {first}
              </p>
              {rest.length > 0 && (
                <div className={`au-cols${rest.length > 1 ? " has-2" : ""}`} data-rv>
                  {rest.map((x, n) => (
                    <p key={n}>{x}</p>
                  ))}
                </div>
              )}
              {s.highlights.length > 0 && (
                <ul className="au-mats" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      );
    },
    services: (s, c) => {
      const pics = s.items.map((_, n) => c.photo(`art:svc${n}`));
      const cta = c.spec.hero.primaryCta;
      if (!pics.some(Boolean)) {
        return (
          <section className="au-sec" id={s.id}>
            <div className="au-wrap">
              <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
              <List two items={s.items.map((it) => ({ title: it.title, text: it.description, price: it.price, note: it.duration }))} />
            </div>
          </section>
        );
      }
      return (
        <section className="au-sec" id={s.id}>
          <div className="au-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
            <div className="au-pieces">
              {s.items.map((it, n) => {
                const p = pics[n];
                return (
                  <article key={n} className="au-piece">
                    {p ? (
                      <figure className="au-loupe" data-rv data-zoom>
                        <div>
                          <Pic p={p} sizes="(min-width: 900px) 55vw, 100vw" />
                        </div>
                        <figcaption className="au-cap">
                          <span>Fig. {two(n + 1)}</span>
                          <span>{it.title}</span>
                        </figcaption>
                      </figure>
                    ) : null}
                    <div className="au-piece-copy" data-rv>
                      <p className="au-kick">{it.duration || two(n + 1)}</p>
                      <h3>{it.title}</h3>
                      <p>{it.description}</p>
                      <div className="au-note">
                        {it.price ? <span className="au-price">{it.price}</span> : null}
                        <a href={cta.href} className="au-text">
                          {cta.label}
                        </a>
                      </div>
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
      const covers = cats.map(() => c.spare());
      const tab = (n: number) => `${s.id}-tab-${n}`;
      const multi = cats.length > 1;
      return (
        <section className="au-sec is-paper" id={s.id}>
          <div className="au-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            {multi ? (
              <div className="au-tabs" role="tablist" aria-label={s.title.replace(/\*/g, "")} data-rv>
                {cats.map((cat, n) => (
                  <button key={n} type="button" role="tab" id={tab(n)} aria-selected={n === 0} aria-controls={`${s.id}-panel-${n}`} tabIndex={n === 0 ? 0 : -1}>
                    {cat.name}
                    <sup>{two(cat.items.length)}</sup>
                  </button>
                ))}
                <span className="au-bead" aria-hidden="true" />
              </div>
            ) : null}
            {cats.map((cat, n) => {
              const p = covers[n];
              return (
                <div key={n} id={`${s.id}-panel-${n}`} role={multi ? "tabpanel" : undefined} aria-labelledby={multi ? tab(n) : undefined} className={`au-panel${p ? " has-pic" : ""}`} hidden={n > 0}>
                  {p ? (
                    <figure className="au-panel-pic">
                      <Pic p={p} sizes="(min-width: 1000px) 40vw, 100vw" />
                      <figcaption>{cat.name}</figcaption>
                    </figure>
                  ) : null}
                  <div>
                    {!multi ? (
                      <p className="au-kick" style={{ marginBottom: 20 }}>
                        {cat.name}
                      </p>
                    ) : null}
                    <ol className="au-list">
                      {cat.items.map((d, m) => (
                        <li key={m} className="au-item" style={i(m)}>
                          {d.tags?.length ? <small>{d.tags.join(" · ")}</small> : null}
                          <h3>{d.name}</h3>
                          {d.price ? <span className="au-price">{d.price}</span> : <span />}
                          {d.description ? <p>{d.description}</p> : null}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              );
            })}
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
      <section className="au-sec is-black" id={s.id}>
        <div className="au-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} center />
          <ul className={`au-feats n${s.items.length}`}>
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <b>{ROMAN[n] ?? n + 1}.</b>
                <span className="au-ico">
                  <Icon name={it.icon as IconName} />
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
      <section className="au-sec au-hs is-bone" id={s.id} data-hs>
        <div className="au-hs-pin">
          <div className="au-wrap">
            <ol className="au-hs-track">
              <li className="au-hs-intro">
                <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
              </li>
              {s.steps.map((st, n) => (
                <li key={n} className="au-hs-step" data-rv style={i(n % 4)}>
                  <b>{two(n + 1)}</b>
                  <h3>{st.title}</h3>
                  <p>{st.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="au-hs-bar" aria-hidden="true">
            <i />
          </div>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="au-sec" id={s.id}>
          <div className="au-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className={`au-look n${Math.min(pics.length, 2)}`}>
              {pics.map((p, n) => (
                <figure key={n} data-rv style={i(n % 3)}>
                  <div>
                    <Pic p={p} sizes="(min-width: 900px) 40vw, 50vw" />
                  </div>
                  <figcaption>Fig. {two(n + 1)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    statement: (s, c) => {
      let n = 0;
      return (
        <section className="au-sec is-paper" id={s.id}>
          <div className="au-wrap au-state" data-rv>
            <span className="au-rule" aria-hidden="true">
              <i />
            </span>
            <h2>
              {s.title
                .split(/\*([^*]+)\*/)
                .flatMap((chunk, k) =>
                  chunk
                    .split(/\s+/)
                    .filter(Boolean)
                    .map((w) => ({ w, em: k % 2 === 1 })),
                )
                .reduce<{ w: string; em: boolean }[]>((acc, x) => {
                  // Punctuation stays with the word before it, so a line never starts with a comma.
                  if (acc.length && /^[,.;:!?)]/.test(x.w)) acc[acc.length - 1] = { ...acc[acc.length - 1], w: acc[acc.length - 1].w + x.w };
                  else acc.push(x);
                  return acc;
                }, [])
                .map((x) => {
                  const k = n++;
                  const word = (
                    <span className="au-sw" style={i(k)}>
                      {x.w}
                    </span>
                  );
                  return (
                    <Fragment key={k}>
                      {k > 0 ? " " : null}
                      {x.em ? <em>{word}</em> : word}
                    </Fragment>
                  );
                })}
            </h2>
            {s.note ? <p className="au-kick">{s.note}</p> : null}
          </div>
        </section>
      );
    },
    cta: (s, c) => (
      <section className="au-sec is-black" id={s.id}>
        <div className="au-wrap au-cta">
          <span className="au-rule in" aria-hidden="true">
            <i />
          </span>
          <h2 data-rv>{em(s.title)}</h2>
          {s.body ? <p data-rv>{s.body}</p> : null}
          <div data-rv>
            <Btn c={c} href={s.cta.href}>
              <span>
                {s.cta.label} <Arrow />
              </span>
            </Btn>
          </div>
        </div>
      </section>
    ),
    hours: (s, c) => (
      <Split id={s.id} tone="is-black" kicker={c.t.kick.hours} title={s.title} body={s.note || undefined} side={<Reach c={c} />}>
        <div className="au-visit" data-rv>
          <div>
            <span className="au-cap">{c.t.hours}</span>
            <NowBadge c={c} className="au-now" />
          </div>
          {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
        </div>
      </Split>
    ),
    contact: (s, c) => (
      <Split
        id={s.id}
        tone="is-paper"
        kicker={c.t.kick.contact}
        title={s.title}
        body={s.body || undefined}
        side={
          <>
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
          </>
        }
      >
        {s.showForm ? (
          <div className="au-form" data-rv>
            <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
          </div>
        ) : null}
      </Split>
    ),
    booking: (s, c) => (
      <Split
        id={s.id}
        kicker={c.t.kick.booking}
        title={s.title}
        body={s.body || undefined}
        side={
          <>
            <Hours c={c} />
            <Reach c={c} />
          </>
        }
      >
        <div className="au-form" data-rv>
          <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
        </div>
      </Split>
    ),
  },
};
