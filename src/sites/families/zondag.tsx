import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Zondag: an original template (no portfolio demo). Soft and friendly: warm paper, cocoa,
 * butter yellow and sage, an italic serif with a handwritten note, arched photographs and a
 * menu laid out in coloured panels. Little doodles draw themselves, sections meet on a wave,
 * the opening hours hang on a chalkboard with today marked, and the photographs are taped-on
 * polaroids. Made for bakeries, coffee bars, lunchrooms, ice-cream parlours, florists and
 * small shops where people drop in.
 */

const CSS = `
.d-zondag{--paper:#fbf4ea;--oat:#f3e7d6;--cream:#fffdf8;--cocoa:#3a2a20;--cocoa-2:#5b4537;--dim:#7a6556;--butter:#f4c95d;--honey:#e2a93b;--sage:#a9bfa3;--sage-d:#5f7a59;--blush:#f2cdbd;--line:rgba(58,42,32,.14);--pad:clamp(18px,4.8vw,72px);--ease:cubic-bezier(.22,.72,.2,1);--bounce:cubic-bezier(.34,1.56,.64,1);--serif:"Lora",Georgia,serif;--hand:"Caveat","Comic Sans MS",cursive;--z-bg2:var(--oat);--z-ink:var(--cocoa);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--sage-d);--z-on-accent:#fffdf8;--z-display:var(--serif);--z-radius:28px;--z-field-radius:14px;--z-ico-radius:50%;--z-h3:clamp(21px,1.7vw,26px);--z-statement:clamp(32px,4.4vw,66px);background:var(--paper);color:var(--cocoa);font-family:"Sora",system-ui,sans-serif;font-weight:300;font-size:clamp(16px,1.02vw,17.5px);line-height:1.7}
.d-zondag h1,.d-zondag h2,.d-zondag h3{font-family:var(--serif);font-weight:500;line-height:1.08;letter-spacing:-.015em}
.d-zondag h1 em,.d-zondag h2 em{position:relative;font-style:italic;font-weight:400;color:var(--sage-d)}
.d-zondag h2{font-size:clamp(38px,4.8vw,72px)}
.d-zondag h2.is-long{font-size:clamp(30px,3.4vw,52px)}
.d-zondag .zo-wrap{position:relative;width:min(100%,1280px);margin-inline:auto;padding-inline:var(--pad)}
.d-zondag .zo-kick{font-family:var(--hand);font-size:clamp(25px,2.1vw,32px);font-weight:600;line-height:1;color:var(--honey);transform:rotate(-2deg);transform-origin:left}
.d-zondag .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:0 28px;border-radius:999px;font-weight:500;font-size:15.5px;transition:background-color .25s,color .25s,transform .35s var(--bounce),box-shadow .25s}
.d-zondag .btn svg{width:17px;height:17px;transition:transform .35s var(--bounce)}
.d-zondag .btn:hover svg{transform:translateX(4px) rotate(-10deg)}
.d-zondag .zo-fill{background:var(--cocoa);color:var(--cream);box-shadow:0 10px 24px -14px rgba(58,42,32,.7)}
.d-zondag .zo-fill:hover{background:var(--sage-d);transform:translateY(-3px) rotate(-1deg)}
.d-zondag .zo-line{background:var(--butter);color:var(--cocoa)}
.d-zondag .zo-line:hover{background:var(--honey);transform:translateY(-3px) rotate(1deg)}
.d-zondag .zo-text{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:500;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 8' preserveAspectRatio='none'%3E%3Cpath d='M1 5c20-4 40 2 60-1s28-1 38 0' fill='none' stroke='%23e2a93b' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E") 0 100%/100% 8px no-repeat}
.d-zondag .zo-hdr{position:sticky;top:0;z-index:40;background:rgba(251,244,234,.9);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:box-shadow .3s}
.d-zondag.is-scrolled .zo-hdr{box-shadow:0 1px 0 var(--line)}
.d-zondag .zo-bar{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:20px;height:84px;transition:height .4s var(--ease)}
.d-zondag.is-scrolled .zo-bar{height:70px}
.d-zondag .zo-logo{display:flex;align-items:center;gap:12px;min-width:0;font-family:var(--serif);font-size:clamp(22px,1.9vw,28px);font-style:italic;line-height:1}
.d-zondag .zo-logo i{display:grid;flex:none;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--butter);font-style:normal;font-size:21px;transition:transform .6s var(--bounce)}
.d-zondag .zo-logo:hover i{transform:rotate(-18deg) scale(1.1)}
.d-zondag .zo-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-zondag .zo-links{display:none;gap:4px}
.d-zondag .zo-links a{position:relative;padding:8px 16px;border-radius:999px;font-weight:400;transition:background-color .25s}
.d-zondag .zo-links a:hover{background:var(--oat)}
.d-zondag .zo-cta{display:none;min-height:46px}
.d-zondag .zo-burger{position:relative;z-index:41;display:flex;align-items:center;gap:10px;min-height:48px;padding:0 18px;border:0;border-radius:999px;background:var(--oat);font-weight:500}
.d-zondag .zo-burger i{display:grid;gap:5px;width:18px}
.d-zondag .zo-burger i::before,.d-zondag .zo-burger i::after{content:"";height:1.5px;border-radius:2px;background:currentColor;transition:transform .35s var(--bounce)}
.d-zondag.menu-open .zo-burger i::before{transform:translateY(3.25px) rotate(45deg)}
.d-zondag.menu-open .zo-burger i::after{transform:translateY(-3.25px) rotate(-45deg)}
@media (min-width:1020px){.d-zondag .zo-bar{grid-template-columns:minmax(0,1fr) auto auto}.d-zondag .zo-links,.d-zondag .zo-cta{display:inline-flex}.d-zondag .zo-burger{display:none}}
.d-zondag .zo-menu{position:fixed;inset:0;z-index:39;display:flex;flex-direction:column;justify-content:space-between;gap:30px;padding:110px var(--pad) 110px;background:var(--butter);overflow-y:auto;border-radius:0 0 40px 40px;transform:translateY(-102%);visibility:hidden;transition:transform .7s var(--ease),visibility 0s .7s}
.d-zondag .zo-menu.is-open{transform:none;visibility:visible;transition:transform .7s var(--ease)}
.d-zondag .zo-menu nav{display:grid;gap:2px}
.d-zondag .zo-menu nav a{display:flex;align-items:center;min-height:58px;font-family:var(--serif);font-size:clamp(34px,8vw,56px);font-style:italic;line-height:1.1;opacity:0;transform:translateY(20px) rotate(-2deg);transition:opacity .5s,transform .7s var(--bounce)}
.d-zondag .zo-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.25s + var(--i,0) * 60ms)}
.d-zondag .zo-menu p a{display:inline-flex;align-items:center;min-height:40px;text-decoration:underline;text-underline-offset:4px}
.d-zondag.menu-open .zo-hdr{background:transparent;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-zondag.menu-open .zo-logo{position:relative;z-index:41}
.d-zondag .zo-hero{position:relative;padding:clamp(24px,4vw,64px) 0 clamp(80px,9vw,140px);overflow:hidden}
.d-zondag .zo-hero-grid{display:grid;gap:clamp(48px,5vw,84px);align-items:center}
@media (min-width:940px){.d-zondag .zo-hero-grid{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}}
.d-zondag .zo-hero-top{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px}
.d-zondag .zo-hero .zo-kick{animation:zo-up .8s var(--ease) .1s both}
.d-zondag .zo-now{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:var(--cream);font-size:13.5px;font-weight:500;box-shadow:0 1px 0 var(--line);animation:zo-pop .7s var(--bounce) .6s both}
.d-zondag .zo-now::before{content:"";width:9px;height:9px;border-radius:50%;background:currentColor}
.d-zondag .zo-now.is-open{color:var(--sage-d)}
.d-zondag .zo-now.is-closed{color:#b5603c}
.d-zondag .zo-hero h1{margin-top:18px;font-size:clamp(48px,6.8vw,104px);line-height:1.02}
.d-zondag .zo-hero h1.is-m{font-size:clamp(40px,5.4vw,80px)}
.d-zondag .zo-hero h1.is-s{font-size:clamp(34px,4.2vw,62px)}
.d-zondag .zo-w{display:inline-block;opacity:0;transform:translateY(40%) rotate(4deg);animation:zo-word 1s var(--bounce) both;animation-delay:calc(.2s + var(--i,0) * 70ms)}
.d-zondag .zo-w.is-em{font-style:italic;font-weight:400;color:var(--sage-d)}
.d-zondag .zo-squig{display:block;width:min(260px,60%);height:18px;margin-top:6px;overflow:visible}
.d-zondag .zo-squig path{fill:none;stroke:var(--honey);stroke-width:4;stroke-linecap:round;stroke-dasharray:320;stroke-dashoffset:320;animation:zo-draw 1.2s var(--ease) 1s forwards}
.d-zondag .zo-lede{max-width:46ch;margin-top:22px;font-size:clamp(17px,1.3vw,20px);color:var(--cocoa-2);animation:zo-up .9s var(--ease) .8s both}
.d-zondag .zo-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px 22px;margin-top:32px;animation:zo-up .9s var(--ease) .95s both}
.d-zondag .zo-facts{display:flex;flex-wrap:wrap;gap:10px;margin-top:36px}
.d-zondag .zo-facts div{display:flex;align-items:center;gap:10px;padding:10px 18px 10px 10px;border-radius:999px;background:var(--cream);box-shadow:0 1px 0 var(--line);animation:zo-pop .7s var(--bounce) both;animation-delay:calc(1.1s + var(--i,0) * 90ms);transition:transform .35s var(--bounce)}
.d-zondag .zo-facts div:hover{transform:translateY(-3px) rotate(-1deg)}
.d-zondag .zo-facts span{display:grid;flex:none;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--oat);color:var(--sage-d)}
.d-zondag .zo-facts svg{width:16px;height:16px}
.d-zondag .zo-facts dt{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.d-zondag .zo-facts dd{margin:0;font-size:14.5px;font-weight:400}
.d-zondag .zo-art{position:relative;justify-self:center;width:min(100%,520px)}
.d-zondag .zo-sun{position:absolute;right:-8%;top:-6%;width:46%;aspect-ratio:1;border-radius:50%;background:var(--butter);animation:zo-sun 1.2s var(--bounce) .3s both}
.d-zondag .zo-sun::after{content:"";position:absolute;inset:-14%;border:2px dashed var(--honey);border-radius:50%;animation:zo-spin 40s linear infinite}
.d-zondag .zo-arch{position:relative;aspect-ratio:4/5;overflow:hidden;border-radius:999px 999px 28px 28px;background:var(--sage);clip-path:inset(100% 0 0 0 round 999px 999px 28px 28px);animation:zo-open 1.4s var(--ease) .25s forwards}
.d-zondag .zo-arch img{width:100%;height:100%;object-fit:cover;scale:1.15;animation:zo-zoom 2.4s var(--ease) .3s forwards}
.d-zondag .zo-arch.is-empty{display:grid;place-items:center}
.d-zondag .zo-arch.is-empty span{font-family:var(--serif);font-size:clamp(140px,20vw,260px);font-style:italic;line-height:1;color:var(--cream)}
.d-zondag .zo-note{position:absolute;left:-6%;bottom:9%;max-width:230px;padding:14px 22px;border-radius:18px;background:var(--cream);box-shadow:0 18px 40px -24px rgba(58,42,32,.5);font-family:var(--hand);font-size:clamp(23px,2.1vw,30px);font-weight:600;line-height:1.05;color:var(--cocoa);transform:rotate(-4deg);animation:zo-pop .8s var(--bounce) 1.2s both}
.d-zondag .zo-note b{display:inline-block;font-weight:600;clip-path:inset(0 100% 0 0);animation:zo-write 1.3s steps(24) 1.6s forwards}
.d-zondag .zo-small{position:absolute;right:-4%;bottom:-6%;width:34%;aspect-ratio:1;overflow:hidden;border:8px solid var(--paper);border-radius:50%;animation:zo-pop .8s var(--bounce) 1s both}
.d-zondag .zo-small img{width:100%;height:100%;object-fit:cover}
.d-zondag .zo-doodle{position:absolute;pointer-events:none;overflow:visible}
.d-zondag .zo-doodle path{fill:none;stroke:var(--cocoa);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:240;stroke-dashoffset:240;animation:zo-draw 1.6s var(--ease) forwards;animation-delay:calc(1s + var(--i,0) * 250ms)}
.d-zondag .zo-doodle.d1{left:-10%;top:8%;width:64px;animation:zo-bob 5s ease-in-out infinite}
.d-zondag .zo-doodle.d2{right:-4%;top:48%;width:52px;animation:zo-bob 6s ease-in-out -2s infinite}
.d-zondag .zo-doodle.d3{left:30%;top:-8%;width:56px}
@media (max-width:620px){.d-zondag .zo-doodle.d1{left:-2%}.d-zondag .zo-note{left:-2%}.d-zondag .zo-doodle.d3{display:none}}
.d-zondag .zo-wave{position:relative;z-index:1;display:block;width:100%;height:clamp(28px,4vw,56px);margin-top:calc(-1 * clamp(28px,4vw,56px));margin-bottom:-1px;color:var(--oat)}
.d-zondag .zo-wave+.zo-sec{margin-top:0}
.d-zondag .zo-band{overflow:hidden;padding-block:6px;background:var(--butter);transform:rotate(-1.5deg);margin-inline:-2%}
.d-zondag .zo-band p{display:flex;width:max-content;gap:34px;padding:12px 0;font-family:var(--hand);font-size:clamp(26px,2.6vw,38px);font-weight:600;line-height:1;white-space:nowrap;animation:zo-run 44s linear infinite}
.d-zondag .zo-band span{display:inline-flex;align-items:center;gap:34px}
.d-zondag .zo-band span::after{content:"✿";font-family:var(--serif);font-size:.7em;color:var(--sage-d)}
.d-zondag .zo-sec{position:relative;padding-block:clamp(80px,10vw,150px)}
.d-zondag .zo-sec.is-oat{background:var(--oat)}
.d-zondag .zo-sec.is-cocoa{background:var(--cocoa);color:var(--paper)}
.d-zondag .is-cocoa h2 em{color:var(--butter)}
.d-zondag .zo-head{display:grid;gap:14px;max-width:760px;margin-bottom:clamp(40px,5vw,68px)}
.d-zondag .zo-head.is-center{justify-items:center;margin-inline:auto;text-align:center}
.d-zondag .zo-head>p:not(.zo-kick){max-width:54ch;color:var(--dim)}
.d-zondag .is-cocoa .zo-head>p:not(.zo-kick){color:rgba(251,244,234,.72)}
.d-zondag .zo-under{display:block;width:120px;height:14px;margin-top:2px;overflow:visible}
.d-zondag .zo-head.is-center .zo-under{margin-inline:auto}
.d-zondag .zo-under path{fill:none;stroke:var(--honey);stroke-width:3.5;stroke-linecap:round;stroke-dasharray:160;stroke-dashoffset:160;transition:stroke-dashoffset 1.1s var(--ease) .4s}
.d-zondag .zo-under.in path,html:not(.demo-js) .d-zondag .zo-under path{stroke-dashoffset:0}
.demo-js .d-zondag .zo-under[data-rv]{opacity:1;transform:none}
.d-zondag .zo-about{display:grid;gap:clamp(48px,5vw,96px);align-items:center}
@media (min-width:920px){.d-zondag .zo-about{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)}.d-zondag .zo-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:860px;margin-inline:auto;text-align:center}}
.d-zondag .zo-about-pics{position:relative;padding:0 10% 12% 0}
.d-zondag .zo-about-pics>figure:first-child{aspect-ratio:4/5;overflow:hidden;border-radius:999px 999px 28px 28px}
.d-zondag .zo-about-pics>figure:first-child img{transform:scale(1.1) translateY(calc(var(--p,0) * -4%))}
.d-zondag .zo-about-pics>figure:nth-child(2){position:absolute;right:0;bottom:0;width:46%;aspect-ratio:1;overflow:hidden;border:8px solid var(--paper);border-radius:50%;transform:translateY(calc(var(--p,0) * 30px))}
.d-zondag .zo-about-pics img{width:100%;height:100%;object-fit:cover}
.d-zondag .zo-about-pics .zo-doodle{left:-6%;bottom:6%;width:70px}
.d-zondag .zo-about-copy{display:grid;gap:20px}
.d-zondag .zo-about-copy .zo-lead{font-family:var(--serif);font-size:clamp(22px,1.9vw,29px);font-style:italic;line-height:1.45;color:var(--cocoa)}
.d-zondag .zo-about-copy p{color:var(--dim)}
.d-zondag .zo-pills{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}
.d-zondag .is-solo .zo-pills{justify-content:center}
.d-zondag .zo-pills li{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:999px;background:var(--oat);font-weight:400;font-size:15px;transition:transform .4s var(--bounce),background-color .3s}
.d-zondag .zo-pills li:hover{transform:rotate(-3deg) translateY(-2px);background:var(--butter)}
.d-zondag .zo-pills li::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--honey)}
.d-zondag .zo-panels{display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}
.d-zondag .zo-panel{position:relative;display:grid;gap:16px;align-content:start;padding:clamp(28px,3vw,42px);border-radius:30px;background:var(--cream);transform:rotate(var(--r,0deg));transition:transform .5s var(--bounce),box-shadow .35s}
.d-zondag .zo-panel:nth-child(4n+1){background:#fbe7a8;--r:-.8deg}
.d-zondag .zo-panel:nth-child(4n+2){background:#dfe8da;--r:.6deg}
.d-zondag .zo-panel:nth-child(4n+3){background:#f8e0d4;--r:-.4deg}
.d-zondag .zo-panel:hover{transform:rotate(0) translateY(-6px);box-shadow:0 26px 50px -30px rgba(58,42,32,.55)}
.d-zondag .zo-panel>h3{font-size:clamp(27px,2.3vw,36px);font-style:italic;font-weight:400}
.d-zondag .zo-panel>svg{width:90px;height:12px;margin-top:-10px;overflow:visible}
.d-zondag .zo-panel>svg path{fill:none;stroke:var(--cocoa);stroke-width:2.5;stroke-linecap:round;opacity:.4}
.d-zondag .zo-items{display:grid;gap:14px}
.d-zondag .zo-item{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 16px;align-items:baseline;padding-bottom:14px;border-bottom:1px dashed rgba(58,42,32,.22)}
.d-zondag .zo-item:last-child{border-bottom:0;padding-bottom:0}
.d-zondag .zo-item b{font-weight:500}
.d-zondag .zo-item span{font-family:var(--serif);font-size:1.08em;font-weight:500;white-space:nowrap}
.d-zondag .zo-item p{grid-column:1/-1;font-size:.93em;color:var(--cocoa-2)}
.d-zondag .zo-item small{grid-column:1/-1;font-family:var(--hand);font-size:21px;line-height:1;color:var(--sage-d)}
.d-zondag .zo-cards{display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-zondag .zo-card{display:grid;gap:12px;align-content:start;height:100%;padding:clamp(26px,2.8vw,36px);border-radius:30px;background:var(--cream);transition:transform .5s var(--bounce),box-shadow .35s}
.d-zondag .zo-card:hover{transform:rotate(-1.2deg) translateY(-6px);box-shadow:0 26px 50px -30px rgba(58,42,32,.55)}
.d-zondag .zo-card .zo-ico{display:grid;place-items:center;width:60px;height:60px;border-radius:50%;background:var(--butter);color:var(--cocoa);transition:transform .6s var(--bounce)}
.d-zondag .zo-card:hover .zo-ico{transform:rotate(-16deg) scale(1.08)}
.d-zondag .zo-card .zo-ico svg{width:25px;height:25px}
.d-zondag .zo-card p{color:var(--dim)}
.d-zondag .is-cocoa .zo-card{background:rgba(251,244,234,.07);color:var(--paper)}
.d-zondag .is-cocoa .zo-card p{color:rgba(251,244,234,.72)}
.d-zondag .zo-card .zo-meta{font-family:var(--serif);font-weight:500;color:var(--sage-d)}
.d-zondag .zo-pola{display:grid;gap:clamp(18px,2.6vw,36px);grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:900px){.d-zondag .zo-pola{grid-template-columns:repeat(3,minmax(0,1fr))}}
.d-zondag .zo-pola figure{position:relative;padding:12px 12px 48px;background:#fff;box-shadow:0 18px 36px -26px rgba(58,42,32,.55);transform:rotate(var(--r,0deg));transition:transform .6s var(--bounce),box-shadow .35s}
.d-zondag .zo-pola figure:nth-child(4n+1){--r:-2.2deg}.d-zondag .zo-pola figure:nth-child(4n+2){--r:1.6deg}.d-zondag .zo-pola figure:nth-child(4n+3){--r:-.8deg}.d-zondag .zo-pola figure:nth-child(4n+4){--r:2.4deg}
.demo-js .d-zondag .zo-pola figure[data-rv]{opacity:0;transform:translateY(50px) rotate(calc(var(--r) * 4)) scale(.92)}
.demo-js .d-zondag .zo-pola figure[data-rv].in{opacity:1;transform:rotate(var(--r,0deg));transition:opacity .6s,transform 1s var(--bounce);transition-delay:calc(var(--i,0) * 90ms)}
.d-zondag .zo-pola figure:hover,.demo-js .d-zondag .zo-pola figure[data-rv].in:hover{transform:rotate(0) scale(1.04);box-shadow:0 30px 50px -28px rgba(58,42,32,.6);z-index:2;transition-delay:0s}
.d-zondag .zo-pola figure::before{content:"";position:absolute;left:50%;top:-12px;width:80px;height:26px;background:rgba(169,191,163,.75);transform:translateX(-50%) rotate(-3deg);z-index:1}
.d-zondag .zo-pola figure:nth-child(even)::before{background:rgba(244,201,93,.75);transform:translateX(-50%) rotate(4deg)}
.d-zondag .zo-pola div{aspect-ratio:1;overflow:hidden}
.d-zondag .zo-pola img{width:100%;height:100%;object-fit:cover}
.d-zondag .zo-board{display:grid;gap:clamp(40px,5vw,80px);align-items:start}
@media (min-width:940px){.d-zondag .zo-board{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-zondag .zo-board-copy{display:grid;gap:22px}
.d-zondag .zo-board-copy>p{color:var(--dim)}
.d-zondag .zo-form{position:relative;padding:clamp(26px,3.2vw,46px);border-radius:30px;background:var(--cream)}
.d-zondag .zo-form::before{content:"";position:absolute;inset:10px;border:1.5px dashed rgba(58,42,32,.18);border-radius:22px;pointer-events:none}
.d-zondag .zo-chalk{position:relative;padding:clamp(28px,3.4vw,48px);border:10px solid #8a6248;border-radius:22px;background:radial-gradient(120% 90% at 30% 20%,#45332a,var(--cocoa));color:var(--paper);box-shadow:0 30px 60px -34px rgba(58,42,32,.8);transform:rotate(-.8deg)}
.d-zondag .zo-chalk::after{content:"";position:absolute;left:50%;top:-34px;width:2px;height:28px;background:#8a6248;transform:translateX(-50%)}
.d-zondag .zo-chalk h3{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px;font-family:var(--hand);font-size:40px;font-weight:600;color:var(--butter)}
.d-zondag .zo-chalk .z-hours,.d-zondag .zo-chalk .z-hours div{border-color:rgba(251,244,234,.18)}
.d-zondag .zo-chalk .z-hours dd{color:var(--butter)}
.d-zondag .z-hours div.is-today{position:relative;font-weight:600}
.d-zondag .z-hours div.is-today::before{content:"";position:absolute;inset:6px -12px;border:2px solid var(--honey);border-radius:40% 60% 50% 50%/60% 40% 60% 40%;transform:rotate(-1deg);pointer-events:none}
.d-zondag .zo-chalk .z-hours div.is-today::before{border-color:var(--butter)}
.d-zondag .z-field label,.d-zondag .z-chipset legend{font-size:12px;letter-spacing:.06em;text-transform:none;color:var(--dim)}
.d-zondag .z-field input,.d-zondag .z-field select,.d-zondag .z-field textarea{border:1px solid rgba(58,42,32,.2);background:#fff;transition:border-color .25s,box-shadow .25s}
.d-zondag .z-field input:focus,.d-zondag .z-field select:focus,.d-zondag .z-field textarea:focus{border-color:var(--honey);box-shadow:0 0 0 4px rgba(244,201,93,.35)}
.d-zondag .z-field :focus-visible{outline:none}
.d-zondag .z-chips button{border-radius:999px;transition:transform .35s var(--bounce),background-color .2s}
.d-zondag .z-chips button:hover{transform:translateY(-3px) rotate(-3deg)}
.d-zondag .z-sec.z-cta{background:var(--butter)}
.d-zondag .z-cta h2{font-size:clamp(40px,5.4vw,84px)}
.d-zondag .z-card,.d-zondag .z-panel{background:var(--cream);border:0}
.d-zondag .z-acc summary{font-family:var(--serif);font-size:clamp(20px,1.7vw,25px);font-weight:500;transition:color .25s}
.d-zondag .z-acc summary:hover{color:var(--sage-d)}
.d-zondag .z-pic{border-radius:24px}
.d-zondag .z-statement h2{font-style:italic;font-weight:400}
.d-zondag .z-quotes blockquote{padding:30px;border:0;border-radius:30px;background:var(--cream)}
.d-zondag .z-quotes blockquote>p{font-style:italic}
.d-zondag .z-steps small,.d-zondag .z-rows small{font-family:var(--hand);font-size:30px;letter-spacing:0;color:var(--honey)}
.d-zondag .zo-foot{position:relative;padding:clamp(72px,9vw,130px) 0 140px;background:var(--cocoa);color:rgba(251,244,234,.8)}
.d-zondag .zo-foot-top{display:grid;gap:14px;justify-items:start}
.d-zondag .zo-foot-top>p:first-child{font-family:var(--hand);font-size:clamp(28px,2.6vw,40px);font-weight:600;line-height:1;color:var(--butter)}
.d-zondag .zo-foot-name{font-family:var(--serif);font-size:min(13vw,150px,calc(170vw / var(--n,8)));font-style:italic;line-height:1;color:var(--paper);word-break:break-word}
.d-zondag .zo-foot-top .zo-under{width:clamp(180px,26vw,360px);height:20px}
.d-zondag .zo-foot-grid{display:grid;gap:32px;margin-top:clamp(44px,6vw,80px);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-zondag .zo-foot-grid h3{margin-bottom:12px;font-family:"Sora",sans-serif;font-size:13px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--butter)}
.d-zondag .zo-foot-grid a,.d-zondag .zo-foot-grid span{display:block;padding:4px 0}
.d-zondag .zo-foot-grid a{transition:color .25s,transform .35s var(--bounce)}
.d-zondag .zo-foot-grid a:hover{color:var(--butter);transform:translateX(5px) rotate(-1deg)}
.d-zondag .zo-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:52px;padding-top:22px;border-top:1px solid rgba(251,244,234,.16);font-size:13px}
@keyframes zo-word{to{opacity:1;transform:none}}
@keyframes zo-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes zo-pop{from{opacity:0;transform:scale(.7) rotate(-6deg)}}
@keyframes zo-open{to{clip-path:inset(0 0 0 0 round 999px 999px 28px 28px)}}
@keyframes zo-zoom{to{scale:1}}
@keyframes zo-sun{from{opacity:0;transform:scale(.3) rotate(-40deg)}to{opacity:1;transform:none}}
@keyframes zo-draw{to{stroke-dashoffset:0}}
@keyframes zo-write{to{clip-path:inset(0)}}
@keyframes zo-bob{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(6deg)}}
@keyframes zo-spin{to{transform:rotate(360deg)}}
@keyframes zo-run{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.d-zondag .zo-w{opacity:1;transform:none}.d-zondag .zo-arch{clip-path:none}.d-zondag .zo-arch img{scale:1}.d-zondag .zo-note b{clip-path:none}.d-zondag .zo-squig path,.d-zondag .zo-doodle path,.d-zondag .zo-under path{stroke-dashoffset:0}.d-zondag .zo-band p,.d-zondag .zo-doodle,.d-zondag .zo-sun::after{animation:none}}
`
  .replace(/\n/g, "")
  .trim();

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

/** A hand-drawn underline that draws itself when it comes into view. */
const Under = () => (
  <svg className="zo-under" viewBox="0 0 120 14" aria-hidden="true" data-rv>
    <path d="M3 9c18-6 36 2 56-2s34-4 58 0" />
  </svg>
);

/* Little doodles around the opening: a star, a sprig and steam. Decoration only. */
const Doodles = () => (
  <>
    <svg className="zo-doodle d1" viewBox="0 0 64 64" aria-hidden="true" style={{ ["--i" as string]: 0 }}>
      <path d="M32 6l6 18 19 1-15 11 6 19-16-11-16 11 6-19L7 25l19-1Z" />
    </svg>
    <svg className="zo-doodle d2" viewBox="0 0 52 80" aria-hidden="true" style={{ ["--i" as string]: 1 }}>
      <path d="M26 78V18M26 30c-10-2-16-10-16-18 10 0 16 8 16 18Zm0 0c10-2 16-10 16-18-10 0-16 8-16 18Zm0 18c-10-2-16-10-16-18 10 0 16 8 16 18Zm0 0c10-2 16-10 16-18-10 0-16 8-16 18Z" />
    </svg>
    <svg className="zo-doodle d3" viewBox="0 0 56 56" aria-hidden="true" style={{ ["--i" as string]: 2 }}>
      <path d="M14 50c-8-10 8-16 0-28s8-16 4-20M30 50c-8-10 8-16 0-28s8-16 4-20M46 50c-8-10 8-16 0-28s8-16 4-20" />
    </svg>
  </>
);

/** A soft wave where two sections meet, in the colour of the section below. */
const Wave = ({ fill }: { fill: string }) => (
  <svg className="zo-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" style={{ color: fill }}>
    <path d="M0 40c120-26 240-26 360 0s240 26 360 0 240-26 360 0 240 26 360 0v20H0Z" fill="currentColor" />
  </svg>
);

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="zo-kick" data-rv>
    {children}
  </p>
);

function Head({ kicker, title, intro, id, center }: { kicker?: string; title: string; intro?: string; id?: string; center?: boolean }) {
  return (
    <header className={`zo-head${center ? " is-center" : ""}`}>
      {kicker ? <Kick>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      <Under />
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

/** The headline as words that pop in one after another, the *marked* phrase in italics. */
function Words({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let n = 0;
  text.split(/\*([^*]+)\*/).forEach((chunk, k) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => {
        out.push(
          <span key={n} className={`zo-w${k % 2 ? " is-em" : ""}`} style={i(n)}>
            {w}
          </span>,
          " ",
        );
        n++;
      }),
  );
  return <>{out}</>;
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="zo-hdr hdr">
        <div className="zo-wrap zo-bar">
          <a href="#top" className="zo-logo" aria-label={c.name}>
            <i aria-hidden="true">{c.name.charAt(0)}</i>
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="zo-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn zo-fill zo-cta">
            {cta.label}
          </a>
          <button type="button" className="zo-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="zo-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              {n.label}
            </a>
          ))}
        </nav>
        <p>
          {b.address ?? b.city}
          {b.phone ? (
            <>
              <br />
              <a href={tel(b.phone)}>{b.phone}</a>
            </>
          ) : null}
        </p>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const small = p ? c.spare() : null;
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 44 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const facts = heroFacts(c);
  // The handwritten note is the business's own short line, or the first thing it makes.
  const note = hero.note || offerWords(c, 1)[0];
  const icon = (label: string) => (label === c.t.address ? "map" : label === c.t.hours ? "clock" : "phone");
  return (
    <section className="zo-hero">
      <div className="zo-wrap zo-hero-grid">
        <div>
          <div className="zo-hero-top">
            {hero.eyebrow ? <p className="zo-kick">{hero.eyebrow}</p> : null}
            <NowBadge c={c} className="zo-now" />
          </div>
          <h1 className={size}>
            <Words text={hero.headline} />
          </h1>
          <svg className="zo-squig" viewBox="0 0 260 18" aria-hidden="true">
            <path d="M4 12c30-10 60 6 92-2s60-8 92 0 44 2 68-4" />
          </svg>
          <p className="zo-lede">{hero.subheadline}</p>
          <div className="zo-cta-row">
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
            <dl className="zo-facts">
              {facts.map((f, n) => (
                <div key={f.label} style={i(n)}>
                  <span aria-hidden="true">
                    <Icon name={icon(f.label)} />
                  </span>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="zo-art">
          <span className="zo-sun" aria-hidden="true" />
          {p ? (
            <figure className="zo-arch">
              <Pic p={p} eager sizes="(min-width: 940px) 40vw, 92vw" />
            </figure>
          ) : (
            <div className="zo-arch is-empty" aria-hidden="true">
              <span>{c.name.charAt(0)}</span>
            </div>
          )}
          {small ? (
            <figure className="zo-small">
              <Pic p={small} eager sizes="180px" />
            </figure>
          ) : null}
          {note ? (
            <p className="zo-note" aria-hidden="true">
              <b>{note}</b>
            </p>
          ) : null}
          <Doodles />
        </div>
      </div>
    </section>
  );
}

/** A tilted ribbon of what the place makes, in handwriting, from its own menu or services. */
function Band({ c }: { c: Ctx }) {
  const list = offerWords(c);
  if (list.length < 3) return null;
  return (
    <div className="zo-band" aria-hidden="true">
      <p>
        {[...list, ...list, ...list, ...list].map((w, n) => (
          <span key={n}>{w}</span>
        ))}
      </p>
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  return (
    <>
      <Wave fill="var(--cocoa)" />
      <footer className="zo-foot">
        <div className="zo-wrap">
          <div className="zo-foot-top">
            {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
            <p className="zo-foot-name" aria-hidden="true" style={{ ["--n" as string]: Math.max(6, c.name.length) }}>
              {c.name}
            </p>
            <Under />
          </div>
          <div className="zo-foot-grid">
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
          <Legal c={c} className="zo-legal" />
        </div>
      </footer>
    </>
  );
}

const Squiggle = () => (
  <svg viewBox="0 0 90 12" aria-hidden="true">
    <path d="M2 7c14-6 28 4 43-1s28-4 43 0" />
  </svg>
);

export const zondag: Family = {
  key: "zondag",
  root: "d-zondag",
  fonts: ["Lora", "Sora", "Caveat"],
  themeColor: "#fbf4ea",
  accent: "#f4c95d",
  onAccent: "#3a2a20",
  css: CSS,
  extra: "",
  js: TODAY_JS,
  cls: { wrap: "zo-wrap", eyebrow: "zo-kick", btn: "zo-fill", btnAlt: "zo-line", btnText: "zo-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const a = c.photo(s.image);
      const b = a ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      return (
        <>
          <Band c={c} />
          <section className="zo-sec" id={s.id}>
            <div className={`zo-wrap zo-about${a ? "" : " is-solo"}`}>
              {a ? (
                <div className="zo-about-pics" data-rv>
                  <figure data-px>
                    <Pic p={a} sizes="(min-width: 920px) 40vw, 90vw" />
                  </figure>
                  {b ? (
                    <figure data-px>
                      <Pic p={b} sizes="(min-width: 920px) 18vw, 40vw" />
                    </figure>
                  ) : null}
                </div>
              ) : null}
              <div className="zo-about-copy">
                <Head kicker={c.t.kick.about} title={s.title} center={!a} />
                <p className="zo-lead" data-rv>
                  {first}
                </p>
                {rest.map((x, n) => (
                  <p key={n} data-rv>
                    {x}
                  </p>
                ))}
                {s.highlights.length > 0 && (
                  <ul className="zo-pills" data-rv>
                    {s.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <>
          <Wave fill="var(--oat)" />
          <section className="zo-sec is-oat" id={s.id}>
            <div className="zo-wrap">
              <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} center />
              <div className="zo-panels">
                {cats.map((cat, n) => (
                  <article key={n} className="zo-panel" data-rv style={i(n % 3)}>
                    <h3>{cat.name}</h3>
                    <Squiggle />
                    <ul className="zo-items">
                      {cat.items.map((d, m) => (
                        <li key={m} className="zo-item">
                          <b>{d.name}</b>
                          {d.price ? <span>{d.price}</span> : <span />}
                          {d.description ? <p>{d.description}</p> : null}
                          {d.tags?.length ? <small>{d.tags.join(" · ")}</small> : null}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              {s.note ? (
                <p className="z-note" data-rv style={{ textAlign: "center" }}>
                  {s.note}
                </p>
              ) : null}
            </div>
          </section>
        </>
      );
    },
    services: (s, c) => (
      <>
        <Wave fill="var(--oat)" />
        <section className="zo-sec is-oat" id={s.id}>
          <div className="zo-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} center />
            <ul className="zo-cards">
              {s.items.map((it, n) => (
                <li key={n} data-rv style={i(n % 3)}>
                  <div className="zo-card">
                    <span className="zo-ico" aria-hidden="true">
                      <Icon name={it.icon} />
                    </span>
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                    {it.price || it.duration ? <p className="zo-meta">{[it.price, it.duration].filter(Boolean).join(" · ")}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </>
    ),
    features: (s, c) => (
      <>
        <Wave fill="var(--cocoa)" />
        <section className="zo-sec is-cocoa" id={s.id}>
          <div className="zo-wrap">
            <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} center />
            <ul className="zo-cards">
              {s.items.map((it, n) => (
                <li key={n} data-rv style={i(n % 3)}>
                  <div className="zo-card">
                    <span className="zo-ico" aria-hidden="true">
                      <Icon name={it.icon} />
                    </span>
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="zo-sec" id={s.id}>
          <div className="zo-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} center />
            <div className="zo-pola">
              {pics.slice(0, 6).map((p, n) => (
                <figure key={n} data-rv style={i(n % 3)}>
                  <div>
                    <Pic p={p} sizes="(min-width: 900px) 30vw, 46vw" />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="zo-sec" id={s.id}>
        <div className="zo-wrap zo-board">
          <div className="zo-board-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="zo-chalk" data-rv>
            <h3>
              {c.t.hours}
              <NowBadge c={c} className="zo-now" />
            </h3>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <>
        <Wave fill="var(--oat)" />
        <section className="zo-sec is-oat" id={s.id}>
          <div className="zo-wrap zo-board">
            <div className="zo-board-copy">
              <Head kicker={c.t.kick.contact} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Reach c={c} />
              {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
            </div>
            {s.showForm ? (
              <div className="zo-form" data-rv>
                <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
              </div>
            ) : null}
          </div>
        </section>
      </>
    ),
    booking: (s, c) => (
      <>
        <Wave fill="var(--oat)" />
        <section className="zo-sec is-oat" id={s.id}>
          <div className="zo-wrap zo-board">
            <div className="zo-board-copy">
              <Head kicker={c.t.kick.booking} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Reach c={c} />
            </div>
            <div className="zo-form" data-rv>
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
            </div>
          </div>
        </section>
      </>
    ),
  },
};
