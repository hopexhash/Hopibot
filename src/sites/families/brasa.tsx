import type { ReactNode } from "react";
import { NowBadge, TODAY_JS } from "./today";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, splitLines, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Brasa: an original template (no portfolio demo). Casual food with an appetite: warm cream,
 * tomato red, basil green and mustard, a chunky slab serif and cards with a hard offset
 * shadow. The opening stacks its headline line by line next to a tilted photograph with a
 * slowly turning badge; ingredients drift on scroll; the menu is a price board with dotted
 * leaders and a sliding tab; sections meet on a zigzag edge. Made for pizzerias, burger and
 * street-food places, snack bars, food trucks and other places where you just walk in.
 */

const CSS = `
.d-brasa{--cream:#f7efe2;--paper:#fffaf1;--tomato:#d9381e;--tomato-d:#b72c15;--basil:#1f4d36;--mustard:#f2b33d;--blush:#f4d6c7;--ink:#1d1712;--dim:#5e5349;--line:rgba(29,23,18,.16);--edge:2px solid var(--ink);--lift:5px 5px 0 var(--ink);--pad:clamp(18px,4.6vw,64px);--ease:cubic-bezier(.2,.75,.25,1);--bounce:cubic-bezier(.34,1.56,.64,1);--slab:"Alfa Slab One",Georgia,serif;--z-bg2:var(--paper);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--tomato);--z-on-accent:#fffaf1;--z-display:var(--slab);--z-radius:18px;--z-field-radius:12px;--z-ico-radius:12px;--z-h3:clamp(20px,1.7vw,25px);--z-statement:clamp(30px,4.4vw,66px);background:var(--cream);color:var(--ink);font-family:"Rubik",system-ui,sans-serif;font-size:clamp(16px,1.05vw,18px);line-height:1.6}
.d-brasa h1,.d-brasa h2,.d-brasa h3{font-family:var(--slab);font-weight:400;line-height:1.02;letter-spacing:-.01em}
.d-brasa h2{font-size:clamp(34px,5vw,72px)}
.d-brasa h2.is-long{font-size:clamp(28px,3.6vw,52px);line-height:1.08}
.d-brasa h2 em,.d-brasa h1 em{font-style:normal;color:var(--tomato)}
.d-brasa .br-wrap{position:relative;width:min(100%,1320px);margin-inline:auto;padding-inline:var(--pad)}
.d-brasa .br-kick{display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--tomato)}
.d-brasa .br-kick svg{width:16px;height:16px;animation:br-spin 9s linear infinite}
.d-brasa .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:0 28px;border:var(--edge);border-radius:999px;font-weight:600;font-size:16px;overflow:hidden;isolation:isolate;transition:transform .25s var(--bounce),box-shadow .25s var(--ease),background-color .2s,color .2s}
.d-brasa .btn svg{width:18px;height:18px;transition:transform .3s var(--bounce)}
.d-brasa .btn:hover svg{transform:translateX(4px) rotate(-8deg)}
.d-brasa .br-fill{background:var(--tomato);color:#fffaf1;box-shadow:4px 4px 0 var(--ink)}
.d-brasa .br-fill::after{content:"";position:absolute;inset:0;z-index:-1;background:var(--tomato-d);transform:translateY(101%);transition:transform .35s var(--ease)}
.d-brasa .br-fill:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--ink)}
.d-brasa .br-fill:hover::after{transform:none}
.d-brasa .br-fill:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}
.d-brasa .br-line{background:var(--paper);color:var(--ink)}
.d-brasa .br-line:hover{background:var(--mustard);transform:rotate(-2deg)}
.d-brasa .br-text{display:inline-flex;align-items:center;min-height:44px;font-weight:700;background:linear-gradient(var(--mustard),var(--mustard)) 0 88%/100% 10px no-repeat;transition:background-size .3s var(--ease)}
.d-brasa .br-text:hover{background-size:100% 70%}
.d-brasa .br-hdr{position:sticky;top:0;z-index:40;background:rgba(247,239,226,.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:2px solid transparent;transition:border-color .3s,background-color .3s}
.d-brasa.is-scrolled .br-hdr{border-color:var(--ink);background:rgba(255,250,241,.96)}
.d-brasa .br-bar{display:flex;align-items:center;gap:24px;height:78px;transition:height .35s var(--ease)}
.d-brasa.is-scrolled .br-bar{height:66px}
.d-brasa .br-logo{display:flex;align-items:center;gap:10px;min-width:0;font-family:var(--slab);font-size:22px;line-height:1}
.d-brasa .br-logo i{display:grid;flex:none;place-items:center;width:42px;height:42px;border:var(--edge);border-radius:50%;background:var(--mustard);font-style:normal;font-size:19px;transition:transform .5s var(--bounce)}
.d-brasa .br-logo:hover i{transform:rotate(-20deg) scale(1.08)}
.d-brasa .br-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-brasa .br-links{display:none;gap:6px;margin-left:auto;padding:5px;border:var(--edge);border-radius:999px;background:var(--paper);font-weight:500;font-size:15px}
.d-brasa .br-links a{padding:8px 16px;border-radius:999px;transition:background-color .2s,color .2s}
.d-brasa .br-links a:hover{background:var(--ink);color:var(--paper)}
.d-brasa .br-cta{display:none;min-height:48px;padding:0 22px}
.d-brasa .br-burger{position:relative;z-index:41;display:flex;align-items:center;gap:10px;margin-left:auto;min-height:48px;padding:0 18px;border:var(--edge);border-radius:999px;background:var(--paper);font-weight:600;box-shadow:3px 3px 0 var(--ink)}
.d-brasa .br-burger i{position:relative;width:18px;height:2px;background:currentColor;transition:background-color .2s}
.d-brasa .br-burger i::before,.d-brasa .br-burger i::after{content:"";position:absolute;left:0;width:18px;height:2px;background:currentColor;transition:transform .35s var(--bounce)}
.d-brasa .br-burger i::before{top:-6px}.d-brasa .br-burger i::after{top:6px}
.d-brasa.menu-open .br-burger i{background:transparent}
.d-brasa.menu-open .br-burger i::before{transform:translateY(6px) rotate(45deg)}
.d-brasa.menu-open .br-burger i::after{transform:translateY(-6px) rotate(-45deg)}
@media (min-width:1000px){.d-brasa .br-links,.d-brasa .br-cta{display:inline-flex}.d-brasa .br-burger{display:none}}
.d-brasa .br-menu{position:fixed;inset:0;z-index:39;display:flex;flex-direction:column;justify-content:space-between;gap:28px;padding:104px var(--pad) 110px;background:var(--tomato);color:#fffaf1;overflow-y:auto;clip-path:circle(0 at calc(100% - 60px) 39px);visibility:hidden;transition:clip-path .7s var(--ease),visibility 0s .7s}
.d-brasa .br-menu.is-open{clip-path:circle(150% at calc(100% - 60px) 39px);visibility:visible;transition:clip-path .7s var(--ease)}
.d-brasa .br-menu nav{display:grid;gap:4px}
.d-brasa .br-menu nav a{display:flex;align-items:baseline;gap:14px;min-height:56px;font-family:var(--slab);font-size:clamp(34px,9vw,60px);line-height:1.05;opacity:0;transform:translateY(24px) rotate(-3deg);transition:opacity .4s,transform .6s var(--bounce)}
.d-brasa .br-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.18s + var(--i,0) * 60ms)}
.d-brasa .br-menu nav a:hover{color:var(--mustard)}
.d-brasa .br-menu nav small{font-family:"Rubik",sans-serif;font-size:14px;font-weight:700;opacity:.7}
.d-brasa .br-menu p{font-size:17px}
.d-brasa .br-menu p a{display:inline-flex;align-items:center;min-height:40px;text-decoration:underline;text-underline-offset:4px}
.d-brasa.menu-open .br-hdr{background:transparent;border-color:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-brasa.menu-open .br-logo{position:relative;z-index:41;color:#fffaf1}
.d-brasa .br-hero{position:relative;padding:clamp(28px,5vw,72px) 0 clamp(72px,9vw,130px);overflow:hidden}
.d-brasa .br-hero-grid{position:relative;z-index:1;display:grid;gap:clamp(48px,6vw,80px);align-items:center}
@media (min-width:960px){.d-brasa .br-hero-grid{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr)}}
.d-brasa .br-chip{display:inline-flex;align-items:center;gap:10px;margin-bottom:24px;padding:8px 16px 8px 10px;border:var(--edge);border-radius:999px;background:var(--paper);font-size:14px;font-weight:600;box-shadow:3px 3px 0 var(--ink);animation:br-pop .7s var(--bounce) .1s both}
.d-brasa .br-chip b{position:relative;width:12px;height:12px;border-radius:50%;background:var(--basil)}
.d-brasa .br-chip b::after{content:"";position:absolute;inset:-4px;border:2px solid var(--basil);border-radius:50%;animation:br-ping 2.4s var(--ease) 3}
.d-brasa .br-hero h1{font-size:clamp(48px,7.6vw,118px);line-height:.95}
.d-brasa .br-hero h1.is-m{font-size:clamp(42px,6vw,90px)}
.d-brasa .br-hero h1.is-s{font-size:clamp(34px,4.6vw,66px);line-height:1.02}
.d-brasa .br-ln{display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}
.d-brasa .br-ln>span{display:inline-block;transform:translateY(110%) rotate(4deg);transform-origin:0 100%;animation:br-line .9s var(--bounce) both;animation-delay:calc(.2s + var(--i,0) * 110ms)}
.d-brasa .br-ln:nth-child(2n)>span{color:var(--tomato)}
.d-brasa .br-hero h1.is-marked .br-ln>span{color:inherit}
.d-brasa .br-lede{max-width:46ch;margin-top:26px;font-size:clamp(17px,1.3vw,20px);color:var(--dim)}
.d-brasa .br-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px 24px;margin-top:34px}
.d-brasa .br-up{animation:br-up .9s var(--ease) both;animation-delay:calc(.5s + var(--i,0) * 90ms)}
.d-brasa .br-ticket{position:relative;display:grid;margin-top:44px;border:var(--edge);border-radius:18px;background:var(--paper);box-shadow:var(--lift)}
.d-brasa .br-ticket div{display:grid;gap:3px;padding:16px 20px}
.d-brasa .br-ticket div+div{border-top:2px dashed var(--line)}
.d-brasa .br-ticket dt{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--tomato)}
.d-brasa .br-ticket dd{margin:0;font-weight:500}
.d-brasa .br-ticket::before,.d-brasa .br-ticket::after{content:"";position:absolute;top:50%;width:20px;height:20px;border:var(--edge);border-radius:50%;background:var(--cream);transform:translateY(-50%)}
.d-brasa .br-ticket::before{left:-11px;clip-path:inset(0 0 0 50%)}
.d-brasa .br-ticket::after{right:-11px;clip-path:inset(0 50% 0 0)}
@media (min-width:700px){.d-brasa .br-ticket{grid-auto-flow:column;grid-auto-columns:minmax(0,1fr)}.d-brasa .br-ticket div+div{border-top:0;border-left:2px dashed var(--line)}}
.d-brasa .br-art{position:relative;justify-self:center;width:min(100%,560px);animation:br-in 1.1s var(--bounce) .35s both}
.d-brasa .br-blob{position:absolute;inset:6% -8% -6% 8%;z-index:0;border-radius:46% 54% 42% 58%/52% 44% 56% 48%;background:var(--mustard);animation:br-morph 12s ease-in-out infinite alternate}
.d-brasa .br-frame{position:relative;z-index:1;aspect-ratio:4/5;overflow:hidden;border:var(--edge);border-radius:clamp(28px,4vw,56px);box-shadow:12px 12px 0 var(--ink);transform:rotate(2.5deg);transition:transform .6s var(--bounce)}
.d-brasa .br-art:hover .br-frame{transform:rotate(0deg) scale(1.01)}
.d-brasa .br-frame img{width:100%;height:100%;object-fit:cover;scale:1.12;animation:br-zoom 2.2s var(--ease) .3s forwards}
.d-brasa .br-ring{position:absolute;z-index:2;left:-26px;bottom:6%;display:grid;place-items:center;width:clamp(124px,13vw,168px);aspect-ratio:1;border:var(--edge);border-radius:50%;background:var(--basil);color:#fffaf1;box-shadow:5px 5px 0 var(--ink)}
.d-brasa .br-ring svg{position:absolute;inset:6%;width:88%;height:88%;animation:br-spin 22s linear infinite}
.d-brasa .br-ring text{font-family:"Rubik",sans-serif;font-size:15px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;fill:#fffaf1}
.d-brasa .br-ring b{max-width:60%;font-family:var(--slab);font-size:clamp(14px,1.25vw,18px);font-weight:400;line-height:1.05;text-align:center;color:var(--mustard)}
.d-brasa .br-ring b svg{position:static;width:30px;height:30px;animation:none}
@media (max-width:620px){.d-brasa .br-ring{left:-8px;width:116px}}
.d-brasa .br-plate{position:relative;z-index:1;display:grid;place-items:center;aspect-ratio:1;border:var(--edge);border-radius:50%;background:var(--tomato);color:#fffaf1;box-shadow:12px 12px 0 var(--ink)}
.d-brasa .br-plate>span{font-family:var(--slab);font-size:clamp(130px,22vw,280px);line-height:1;transform:rotate(-8deg)}
.d-brasa .br-plate ul{position:absolute;inset:auto 0 -20px;display:flex;flex-wrap:wrap;justify-content:center;gap:8px}
.d-brasa .br-plate li{padding:8px 14px;border:var(--edge);border-radius:999px;background:var(--paper);color:var(--ink);font-size:14px;font-weight:600;box-shadow:3px 3px 0 var(--ink)}
.d-brasa .br-plate li:nth-child(2){transform:rotate(-4deg)}.d-brasa .br-plate li:nth-child(3){transform:rotate(3deg)}
.d-brasa .br-doodles{position:absolute;inset:0;z-index:0;pointer-events:none}
.d-brasa .br-doodles svg{position:absolute;width:clamp(44px,5vw,74px);height:auto;transform:translateY(calc(var(--p,0) * var(--d,40px))) rotate(var(--r,0deg));transition:transform .2s linear}
.d-brasa .br-doodles .d1{left:44%;top:6%;--d:-60px;--r:-14deg}
.d-brasa .br-doodles .d2{right:3%;top:58%;--d:80px;--r:18deg}
.d-brasa .br-doodles .d3{left:2%;bottom:5%;--d:-40px;--r:8deg}
.d-brasa .br-doodles .d4{left:52%;bottom:2%;--d:50px;--r:-6deg}
@media (max-width:959px){.d-brasa .br-doodles .d1{left:auto;right:6%;top:2%}.d-brasa .br-doodles .d3,.d-brasa .br-doodles .d4{display:none}}
.d-brasa .br-band{position:relative;z-index:2;padding-block:26px;overflow:hidden}
.d-brasa .br-band>div{display:flex;width:max-content;border-block:var(--edge)}
.d-brasa .br-band>div:first-child{background:var(--mustard);transform:rotate(-2deg) translateY(10px)}
.d-brasa .br-band>div:last-child{background:var(--ink);color:var(--paper);transform:rotate(1.5deg) translateY(-6px)}
.d-brasa .br-band p{display:flex;gap:30px;padding:14px 15px;font-family:var(--slab);font-size:clamp(20px,2vw,28px);white-space:nowrap;animation:br-run 40s linear infinite}
.d-brasa .br-band>div:last-child p{animation-direction:reverse;animation-duration:46s}
.d-brasa .br-band span{display:inline-flex;align-items:center;gap:30px}
.d-brasa .br-band span::after{content:"✶";color:var(--tomato)}
.d-brasa .br-band>div:last-child span::after{color:var(--mustard)}
.d-brasa .br-sec{position:relative;padding-block:clamp(80px,10vw,150px)}
.d-brasa .br-sec.is-paper{background:var(--paper)}
.d-brasa .br-sec.is-basil{background:var(--basil);color:#fffaf1}
.d-brasa .br-sec.is-basil .br-kick{color:var(--mustard)}
.d-brasa .br-sec.is-basil h2 em{color:var(--mustard)}
.d-brasa .br-zig::before{content:"";position:absolute;left:0;right:0;top:-15px;height:16px;background:inherit;-webkit-mask:conic-gradient(from 135deg at top,#0000,#000 1deg 90deg,#0000 91deg) 50%/30px 100%;mask:conic-gradient(from 135deg at top,#0000,#000 1deg 90deg,#0000 91deg) 50%/30px 100%}
.d-brasa .br-head{display:grid;gap:16px;max-width:820px;margin-bottom:clamp(40px,5vw,68px)}
.d-brasa .br-head>p:last-child:not(.br-kick){max-width:56ch;color:var(--dim)}
.d-brasa .is-basil .br-head>p:last-child:not(.br-kick){color:rgba(255,250,241,.78)}
.d-brasa .br-head.is-row{max-width:none}
@media (min-width:900px){.d-brasa .br-head.is-row{grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);align-items:end}.d-brasa .br-head.is-row .br-kick{grid-column:1/-1}}
.d-brasa .br-about{display:grid;gap:clamp(48px,6vw,96px);align-items:center}
@media (min-width:900px){.d-brasa .br-about{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}.d-brasa .br-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:900px}}
.d-brasa .br-about-pic{position:relative;margin:0 14px 14px 0}
.d-brasa .br-about-pic::before{content:"";position:absolute;inset:20px -14px -14px 20px;border:var(--edge);border-radius:30px;background:var(--tomato);transition:transform .5s var(--bounce)}
.d-brasa .br-about-pic:hover::before{transform:translate(6px,6px)}
.d-brasa .br-about-pic>figure:first-child{position:relative;aspect-ratio:4/5;overflow:hidden;border:var(--edge);border-radius:30px}
.d-brasa .br-about-pic>figure:first-child img{width:100%;height:100%;object-fit:cover;transform:scale(calc(1.1 + var(--p,0) * .05))}
.d-brasa .br-about-pic .br-dot{position:absolute;right:-22px;top:-26px;z-index:2;width:36%;aspect-ratio:1;overflow:hidden;border:var(--edge);border-radius:50%;box-shadow:5px 5px 0 var(--ink)}
.d-brasa .br-about-pic .br-dot img{width:100%;height:100%;object-fit:cover}
.d-brasa .br-about-copy{display:grid;gap:20px}
.d-brasa .br-about-copy .br-lead{font-size:clamp(19px,1.6vw,24px);line-height:1.45;color:var(--ink)}
.d-brasa .br-about-copy p{color:var(--dim)}
.d-brasa .br-stamps{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
.d-brasa .br-stamps li{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border:var(--edge);border-radius:999px;background:var(--paper);font-weight:600;font-size:15px;box-shadow:3px 3px 0 var(--ink);transform:rotate(var(--r,0deg));transition:transform .4s var(--bounce)}
.d-brasa .br-stamps li:nth-child(odd){--r:-1.5deg}.d-brasa .br-stamps li:nth-child(even){--r:1.5deg}
.d-brasa .br-stamps li:hover{transform:rotate(0) translateY(-3px)}
.d-brasa .br-stamps svg{width:16px;height:16px;color:var(--basil)}
.d-brasa .br-menu-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;margin-bottom:28px}
.d-brasa .br-tabs{position:relative;display:flex;gap:4px;max-width:100%;padding:5px;border:var(--edge);border-radius:999px;background:var(--cream);overflow-x:auto;scrollbar-width:none}
.d-brasa .br-tabs::-webkit-scrollbar{display:none}
.d-brasa .br-tabs button{position:relative;z-index:1;flex:none;min-height:46px;padding:0 22px;border:0;border-radius:999px;background:none;font-weight:600;white-space:nowrap;transition:color .3s}
.d-brasa .br-tabs button[aria-selected="true"]{color:var(--paper)}
.d-brasa .br-ind{position:absolute;left:0;top:5px;bottom:5px;width:0;border-radius:999px;background:var(--ink);transition:transform .45s var(--bounce),width .45s var(--bounce)}
.d-brasa .br-tabs:not(.is-ready) button[aria-selected="true"]{background:var(--ink)}
.d-brasa .br-count{font-family:var(--slab);font-size:15px;color:var(--dim)}
.d-brasa .br-board{display:grid;gap:4px 60px;padding:clamp(24px,3.4vw,52px);border:var(--edge);border-radius:30px;background:var(--paper);box-shadow:var(--lift)}
.d-brasa .br-board[hidden]{display:none}
.d-brasa .br-board:not([hidden]) .br-dish{animation:br-up .55s var(--ease) both;animation-delay:calc(var(--i,0) * 45ms)}
@media (min-width:900px){.d-brasa .br-board{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-brasa .br-dish{position:relative;padding:18px 14px;margin-inline:-14px;border-bottom:2px dashed var(--line);border-radius:14px;transition:background-color .25s}
.d-brasa .br-dish:hover{background:rgba(242,179,61,.22)}
.d-brasa .br-dish-row{display:flex;align-items:baseline;gap:10px}
.d-brasa .br-dish h3{font-size:clamp(19px,1.5vw,23px);line-height:1.15}
.d-brasa .br-dots{flex:1;min-width:16px;border-bottom:3px dotted var(--ink);opacity:.3;transform:translateY(-5px)}
.d-brasa .br-dish b{flex:none;font-family:var(--slab);font-weight:400;font-size:clamp(18px,1.4vw,22px);color:var(--tomato);transition:transform .3s var(--bounce)}
.d-brasa .br-dish:hover b{transform:scale(1.12) rotate(-4deg)}
.d-brasa .br-dish p{margin-top:6px;color:var(--dim);font-size:.95em}
.d-brasa .br-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}
.d-brasa .br-tags span{padding:3px 10px;border:1.5px solid var(--ink);border-radius:999px;background:var(--mustard);font-size:12px;font-weight:700}
.d-brasa .br-note{margin-top:26px;font-size:14px;color:var(--dim)}
.d-brasa .br-cards{display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}
.d-brasa .br-card{position:relative;display:grid;gap:14px;align-content:start;height:100%;padding:clamp(24px,2.6vw,36px);border:var(--edge);border-radius:26px;background:var(--paper);box-shadow:var(--lift);color:var(--ink);transform:rotate(var(--r,0deg));transition:transform .4s var(--bounce),box-shadow .3s var(--ease)}
.d-brasa .br-cards>li:nth-child(3n+1) .br-card{--r:-.8deg}
.d-brasa .br-cards>li:nth-child(3n+3) .br-card{--r:.8deg}
.d-brasa .br-card:hover{transform:rotate(0) translate(-3px,-5px);box-shadow:9px 10px 0 var(--ink)}
.d-brasa .br-cards>li:nth-child(3n+2) .br-card{background:var(--mustard)}
.d-brasa .br-cards>li:nth-child(3n+3) .br-card{background:var(--blush)}
.d-brasa .br-num{font-family:var(--slab);font-size:52px;line-height:.9;color:var(--tomato);-webkit-text-stroke:2px var(--ink);paint-order:stroke fill}
.d-brasa .br-card p{color:var(--dim)}
.d-brasa .br-meta{display:flex;flex-wrap:wrap;gap:8px}
.d-brasa .br-meta span,.d-brasa .br-meta b{padding:4px 12px;border:1.5px solid var(--ink);border-radius:999px;background:var(--paper);font-size:14px;font-weight:700}
.d-brasa .br-meta b{background:var(--ink);color:var(--paper)}
.d-brasa .br-ico{display:grid;place-items:center;width:58px;height:58px;border:var(--edge);border-radius:16px;background:var(--cream);transition:transform .5s var(--bounce)}
.d-brasa .br-card:hover .br-ico{transform:rotate(-12deg) scale(1.08)}
.d-brasa .br-ico svg{width:26px;height:26px}
.d-brasa .br-go{display:inline-flex;align-items:center;gap:8px;margin-top:4px;font-weight:700}
.d-brasa .br-go svg{width:22px;height:22px;transition:transform .3s var(--bounce)}
.d-brasa .br-card:hover .br-go svg{transform:translateX(6px)}
.d-brasa .br-pola{display:grid;gap:clamp(16px,2.4vw,30px);grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:900px){.d-brasa .br-pola{grid-template-columns:repeat(3,minmax(0,1fr))}}
.d-brasa .br-pola figure{position:relative;padding:11px 11px 44px;border:var(--edge);border-radius:14px;background:var(--paper);box-shadow:var(--lift);transform:rotate(var(--r,0deg));transition:transform .5s var(--bounce),box-shadow .3s}
.d-brasa .br-pola figure:nth-child(3n+1){--r:-2.4deg}.d-brasa .br-pola figure:nth-child(3n+2){--r:1.8deg}.d-brasa .br-pola figure:nth-child(3n){--r:-1deg}
.demo-js .d-brasa .br-pola figure[data-rv]{opacity:0;transform:translateY(60px) rotate(calc(var(--r) * 4))}
.demo-js .d-brasa .br-pola figure[data-rv].in{opacity:1;transform:rotate(var(--r,0deg));transition:opacity .5s,transform .9s var(--bounce);transition-delay:calc(var(--i,0) * 90ms)}
.d-brasa .br-pola figure:hover,.demo-js .d-brasa .br-pola figure[data-rv].in:hover{transform:rotate(0) scale(1.03);box-shadow:9px 9px 0 var(--ink);z-index:2;transition-delay:0s}
.d-brasa .br-pola figure::before{content:"";position:absolute;left:50%;top:-12px;width:84px;height:24px;background:rgba(242,179,61,.85);transform:translateX(-50%) rotate(-4deg);z-index:1}
.d-brasa .br-pola div{aspect-ratio:1;overflow:hidden;border-radius:8px}
.d-brasa .br-pola img{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease)}
.d-brasa .br-pola figure:hover img{transform:scale(1.07)}
.d-brasa .br-book{display:grid;gap:clamp(40px,5vw,80px);align-items:start}
@media (min-width:960px){.d-brasa .br-book{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-brasa .br-book-copy{display:grid;gap:22px}
.d-brasa .br-book-copy>p{color:rgba(255,250,241,.8)}
.d-brasa .br-book .z-hours,.d-brasa .br-book .z-hours div{border-color:rgba(255,250,241,.24)}
.d-brasa .br-book .z-hours dd{color:var(--mustard)}
.d-brasa .br-book .z-reach,.d-brasa .br-book .z-reach a{color:#fffaf1}
.d-brasa .br-book .z-reach .z-route{color:var(--mustard)}
.d-brasa .br-form{position:relative;padding:clamp(24px,3.2vw,44px);border:var(--edge);border-radius:30px;background:var(--paper);box-shadow:10px 10px 0 var(--mustard);color:var(--ink)}
.d-brasa .br-stamp{position:absolute;right:22px;top:-22px;padding:8px 16px;border:var(--edge);border-radius:999px;background:var(--tomato);color:#fffaf1;font-family:var(--slab);font-size:16px;transform:rotate(4deg);box-shadow:3px 3px 0 var(--ink)}
.d-brasa .z-field label,.d-brasa .z-chipset legend{font-size:12px;font-weight:700;letter-spacing:.1em;color:var(--dim)}
.d-brasa .z-field input,.d-brasa .z-field select,.d-brasa .z-field textarea{border:var(--edge);background:#fff;color:var(--ink);transition:box-shadow .2s,transform .2s}
.d-brasa .z-field input:focus,.d-brasa .z-field select:focus,.d-brasa .z-field textarea:focus{box-shadow:4px 4px 0 var(--mustard);transform:translate(-2px,-2px)}
.d-brasa .z-field :focus-visible{outline:none}
.d-brasa .z-chips button{border:var(--edge);font-family:var(--slab);transition:transform .3s var(--bounce),background-color .2s}
.d-brasa .z-chips button:hover{transform:translateY(-3px)}
.d-brasa .z-chips button[aria-pressed="true"]{background:var(--tomato);color:#fffaf1;border-color:var(--ink);box-shadow:3px 3px 0 var(--ink)}
.d-brasa .form-status{border:var(--edge);border-radius:12px;background:var(--mustard)}
.d-brasa .z-sec.z-cta{background:var(--tomato);color:#fffaf1}
.d-brasa .z-cta h2{font-size:clamp(38px,5.4vw,82px)}
.d-brasa .z-cta h2 em{color:var(--mustard)}
.d-brasa .z-cta .z-center>p{color:rgba(255,250,241,.85)}
.d-brasa .z-cta .br-fill{background:var(--paper);color:var(--ink)}
.d-brasa .z-cta .br-fill::after{background:var(--mustard)}
.d-brasa .z-card,.d-brasa .z-panel,.d-brasa .z-channel{border:var(--edge);box-shadow:var(--lift);background:var(--paper)}
.d-brasa .z-pack.is-featured{background:var(--mustard)}
.d-brasa .z-acc,.d-brasa .z-acc details{border-color:var(--ink)}
.d-brasa .z-acc summary{font-family:var(--slab);font-size:clamp(19px,1.6vw,24px)}
.d-brasa .z-acc details[open] summary{color:var(--tomato)}
.d-brasa .z-pic{border:var(--edge)}
.d-brasa .z-quotes blockquote{padding:28px;border:var(--edge);border-radius:24px;background:var(--paper);box-shadow:var(--lift)}
.d-brasa .z-quotes blockquote:nth-child(even){background:var(--mustard)}
.d-brasa .z-steps small,.d-brasa .z-rows small{font-family:var(--slab);font-size:24px;letter-spacing:0}
.d-brasa .z-statement h2{font-size:var(--z-statement)}
.d-brasa .z-statement h2 em{color:var(--ink);background:linear-gradient(var(--mustard),var(--mustard)) 0 85%/0 .38em no-repeat;transition:background-size 1.1s var(--ease) .3s}
.d-brasa .z-statement h2.in em{background-size:100% .38em}
.d-brasa .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(29,23,18,.05),rgba(29,23,18,.78))}
.d-brasa .br-foot{position:relative;padding:clamp(80px,9vw,130px) 0 150px;background:var(--tomato);color:#fffaf1;overflow:hidden}
.d-brasa .br-foot-name{display:flex;flex-wrap:wrap;column-gap:.22em;max-width:calc(100% - 200px);font-family:var(--slab);font-size:min(14vw,180px,calc(170vw / var(--n,8)));line-height:.92;letter-spacing:-.02em;color:#fffaf1}
@media (max-width:760px){.d-brasa .br-foot-name{max-width:none}}
.d-brasa .br-foot-name span{display:inline-flex}
.d-brasa .br-foot-name i{display:inline-block;font-style:normal;transform:translateY(60%) rotate(8deg);opacity:0;transition:transform .8s var(--bounce),opacity .4s,color .2s;transition-delay:calc(var(--i,0) * 35ms)}
.d-brasa .br-foot-name.in i{transform:none;opacity:1}
.d-brasa .br-foot-name.in i:hover{color:var(--mustard);transform:translateY(-8%) rotate(-6deg);transition-delay:0s}
.demo-js .d-brasa .br-foot-name[data-rv]{opacity:1;transform:none}
.d-brasa .br-foot .br-ring{right:var(--pad);top:clamp(28px,4vw,56px);left:auto;bottom:auto;background:var(--mustard);color:var(--ink)}
.d-brasa .br-foot .br-ring text{fill:var(--ink)}
.d-brasa .br-foot .br-ring b{color:var(--tomato);font-size:clamp(38px,4vw,54px)}
@media (max-width:760px){.d-brasa .br-foot .br-ring{display:none}}
.d-brasa .br-foot-grid{display:grid;gap:32px;margin-top:clamp(44px,6vw,80px);grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-brasa .br-foot-grid h3{margin-bottom:12px;font-size:21px;color:var(--mustard)}
.d-brasa .br-foot-grid a,.d-brasa .br-foot-grid span{display:block;padding:4px 0}
.d-brasa .br-foot-grid a{text-decoration:underline;text-decoration-color:rgba(255,250,241,.4);text-underline-offset:4px;transition:color .2s}
.d-brasa .br-foot-grid a:hover{color:var(--mustard)}
.d-brasa .br-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:52px;padding-top:22px;border-top:2px solid rgba(255,250,241,.3);font-size:13px;opacity:.88}
.d-brasa.no-photos .br-hero::after{content:"";position:absolute;right:-12%;top:-20%;width:60%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(242,179,61,.38),transparent 70%);pointer-events:none}
.d-brasa .br-now{display:inline-flex;align-items:center;gap:8px;margin-left:10px;padding:4px 12px;border:var(--edge);border-radius:999px;background:var(--paper);font-size:13px;font-weight:700;vertical-align:middle}
.d-brasa .br-now::before{content:"";width:9px;height:9px;border-radius:50%;background:currentColor}
.d-brasa .br-now.is-open{color:var(--basil)}
.d-brasa .br-now.is-closed{color:var(--tomato)}
.d-brasa .z-hours div.is-today{margin-inline:-14px;padding-inline:14px;border-radius:12px;background:var(--mustard);color:var(--ink);font-weight:600}
.d-brasa .z-hours div.is-today dd{color:var(--ink)}
.d-brasa .br-visit{display:grid;gap:clamp(36px,5vw,72px);align-items:start}
@media (min-width:900px){.d-brasa .br-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-brasa .br-visit-card{position:relative;padding:clamp(24px,3vw,40px);border:var(--edge);border-radius:28px;background:var(--paper);box-shadow:var(--lift);transform:rotate(-1deg)}
.d-brasa .br-visit-card h3{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:14px;font-size:clamp(24px,2vw,30px)}
.d-brasa .br-visit-copy{display:grid;gap:20px}
.d-brasa .br-visit-copy>p{color:var(--dim)}
.d-brasa .br-visit .z-reach a{font-weight:600}
.d-brasa .br-contact .br-form{box-shadow:10px 10px 0 var(--tomato)}
@keyframes br-line{to{transform:none}}
@keyframes br-up{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
@keyframes br-in{from{opacity:0;transform:translateY(40px) rotate(-4deg) scale(.94)}to{opacity:1;transform:none}}
@keyframes br-zoom{to{scale:1}}
@keyframes br-pop{from{opacity:0;transform:scale(.6) rotate(-8deg)}to{opacity:1;transform:none}}
@keyframes br-ping{0%{transform:scale(.6);opacity:.9}70%,100%{transform:scale(1.6);opacity:0}}
@keyframes br-spin{to{transform:rotate(360deg)}}
@keyframes br-run{to{transform:translateX(-50%)}}
@keyframes br-morph{0%{border-radius:46% 54% 42% 58%/52% 44% 56% 48%}100%{border-radius:58% 42% 55% 45%/42% 58% 44% 56%}}
@media (prefers-reduced-motion:reduce){.d-brasa .br-ln>span{transform:none}.d-brasa .br-frame img{scale:1}.d-brasa .br-band p,.d-brasa .br-ring svg,.d-brasa .br-blob{animation:none}.d-brasa .br-foot-name i{opacity:1;transform:none}}
`
  .replace(/\n/g, "")
  .trim();

/** The tab marker slides to the chosen tab (the shared script switches the panels). */
const JS = `(function(){var d=document;[].slice.call(d.querySelectorAll('.br-tabs')).forEach(function(t){var ind=t.querySelector('.br-ind');if(!ind)return;function set(){var b=t.querySelector('[aria-selected="true"]');if(!b)return;ind.style.width=b.offsetWidth+'px';ind.style.transform='translateX('+(b.offsetLeft)+'px)'}t.classList.add('is-ready');t.addEventListener('click',function(){setTimeout(set,0)});t.addEventListener('keydown',function(){setTimeout(set,0)});window.addEventListener('resize',set);set();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(set)})})();`;

/* Hand-drawn ingredients that drift on scroll. Decoration only. */
const Doodles = () => (
  <div className="br-doodles" aria-hidden="true">
    <svg className="d1" data-px viewBox="0 0 80 80" fill="none" stroke="#1d1712" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 72C16 58 10 30 26 10c18 6 30 30 14 62Z" fill="#1f4d36" />
      <path d="M40 72C34 52 30 34 26 12" stroke="#fffaf1" />
    </svg>
    <svg className="d2" data-px viewBox="0 0 80 80" fill="none" stroke="#1d1712" strokeWidth="3" strokeLinecap="round">
      <circle cx="40" cy="40" r="30" fill="#d9381e" />
      <circle cx="40" cy="40" r="20" fill="#f4d6c7" />
      <path d="M40 22v36M22 40h36M27 27l26 26M53 27 27 53" stroke="#d9381e" />
    </svg>
    <svg className="d3" data-px viewBox="0 0 80 80" fill="none" stroke="#1d1712" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 62c22 0 44-18 46-44" />
      <path d="M64 18c-10 2-30 10-40 34-2 6 0 10 6 10 18-2 30-22 34-44Z" fill="#d9381e" />
      <path d="M64 18c2-6 6-8 10-8" />
    </svg>
    <svg className="d4" data-px viewBox="0 0 80 80" fill="#f2b33d" stroke="#1d1712" strokeWidth="3" strokeLinejoin="round">
      <path d="m40 6 8 22 24 2-18 15 6 23-20-13-20 13 6-23L8 30l24-2Z" />
    </svg>
  </div>
);

/** A badge with the name and town running around it, turning slowly. `id` keeps two of them apart. */
function Ring({ c, id, center }: { c: Ctx; id: string; center?: ReactNode }) {
  const words = [c.name, c.spec.business.city].filter(Boolean).join(" · ");
  const text = `${words} · `.repeat(Math.max(1, Math.ceil(46 / (words.length + 3))));
  return (
    <div className="br-ring" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href={`#${id}`} textLength="486" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <b>{center ?? <Icon name="flame" />}</b>
    </div>
  );
}

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="br-kick" data-rv>
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m10 1 2.2 6.1L18.6 7l-5 4 1.8 6.3L10 13.6l-5.4 3.7L6.4 11l-5-4 6.4.1Z" fill="currentColor" />
    </svg>
    {children}
  </p>
);

function Head({ kicker, title, intro, id, row }: { kicker?: string; title: string; intro?: string; id?: string; row?: boolean }) {
  return (
    <header className={`br-head${row && intro ? " is-row" : ""}`}>
      {kicker ? <Kick>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="br-hdr hdr">
        <div className="br-wrap br-bar">
          <a href="#top" className="br-logo" aria-label={c.name}>
            <i aria-hidden="true">{c.name.charAt(0)}</i>
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="br-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn br-fill br-cta">
            {cta.label}
          </a>
          <button type="button" className="br-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="br-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{String(k + 1).padStart(2, "0")}</small>
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
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 46 ? "is-s" : plain.length > 26 ? "is-m" : undefined;
  const { lines, marked } = splitLines(hero.headline, plain.length > 30 ? 3 : 2);
  const facts = heroFacts(c);
  const words = offerWords(c, 4);
  // The badge carries the business's own short note, or the first thing it makes; never a claim.
  const sticker = hero.note || words[0];
  return (
    <section className="br-hero">
      <Doodles />
      <div className="br-wrap br-hero-grid">
        <div>
          {hero.eyebrow ? (
            <p className="br-chip">
              <b aria-hidden="true" />
              {hero.eyebrow}
              <NowBadge c={c} className="br-now" />
            </p>
          ) : null}
          <h1 className={[size, marked ? "is-marked" : ""].filter(Boolean).join(" ") || undefined}>
            {lines.map((line, n) => (
              <span className="br-ln" key={n}>
                <span style={i(n)}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="br-lede br-up" style={i(1)}>
            {hero.subheadline}
          </p>
          <div className="br-cta-row br-up" style={i(2)}>
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
            <dl className="br-ticket br-up" style={i(3)}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="br-art">
          {p ? (
            <>
              <span className="br-blob" aria-hidden="true" />
              <figure className="br-frame">
                <Pic p={p} eager sizes="(min-width: 960px) 42vw, 92vw" />
              </figure>
              <Ring c={c} id="br-ring-hero" center={sticker} />
            </>
          ) : (
            <div className="br-plate" aria-hidden="true">
              <span>{c.name.charAt(0)}</span>
              {words.length > 0 && (
                <ul>
                  {words.slice(0, 3).map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Two crossing bands of what the place makes, from its own menu or services. */
function Band({ c }: { c: Ctx }) {
  const list = offerWords(c);
  if (list.length < 3) return null;
  const row = [...list, ...list, ...list, ...list];
  return (
    <div className="br-band" aria-hidden="true">
      <div>
        <p>
          {row.map((w, n) => (
            <span key={n}>{w}</span>
          ))}
        </p>
      </div>
      <div>
        <p>
          {row
            .slice()
            .reverse()
            .map((w, n) => (
              <span key={n}>{w}</span>
            ))}
        </p>
      </div>
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  let k = 0;
  return (
    <footer className="br-foot">
      <Ring c={c} id="br-ring-foot" center={c.name.charAt(0)} />
      <div className="br-wrap">
        {/* The name, letter by letter, bouncing in when it comes into view. */}
        <p className="br-foot-name" aria-hidden="true" data-rv style={{ ["--n" as string]: Math.max(6, c.name.length) }}>
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
        <div className="br-foot-grid">
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
          {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
        </div>
        <Legal c={c} className="br-legal" />
      </div>
    </footer>
  );
}

export const brasa: Family = {
  key: "brasa",
  root: "d-brasa",
  fonts: ["Alfa Slab One", "Rubik"],
  themeColor: "#f7efe2",
  accent: "#d9381e",
  onAccent: "#fffaf1",
  css: CSS,
  extra: "",
  js: JS + TODAY_JS,
  cls: { wrap: "br-wrap", eyebrow: "br-kick", btn: "br-fill", btnAlt: "br-line", btnText: "br-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const small = p ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      return (
        <>
          <Band c={c} />
          <section className="br-sec" id={s.id}>
            <div className={`br-wrap br-about${p ? "" : " is-solo"}`}>
              {p ? (
                <div className="br-about-pic" data-rv>
                  <figure data-px>
                    <Pic p={p} sizes="(min-width: 900px) 40vw, 92vw" />
                  </figure>
                  {small ? (
                    <figure className="br-dot">
                      <Pic p={small} sizes="200px" />
                    </figure>
                  ) : null}
                </div>
              ) : null}
              <div className="br-about-copy">
                <Head kicker={c.t.kick.about} title={s.title} />
                <p className="br-lead" data-rv>
                  {first}
                </p>
                {rest.map((x, n) => (
                  <p key={n} data-rv>
                    {x}
                  </p>
                ))}
                {s.highlights.length > 0 && (
                  <ul className="br-stamps" data-rv>
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
        </>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      const tab = (n: number) => `${s.id}-tab-${n}`;
      const total = cats.reduce((a, x) => a + x.items.length, 0);
      return (
        <section className="br-sec is-paper br-zig" id={s.id}>
          <div className="br-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} row />
            <div className="br-menu-top" data-rv>
              {cats.length > 1 ? (
                <div className="br-tabs" role="tablist" aria-label={s.title.replace(/\*/g, "")}>
                  <span className="br-ind" aria-hidden="true" />
                  {cats.map((cat, n) => (
                    <button key={n} type="button" role="tab" id={tab(n)} aria-selected={n === 0} aria-controls={`${s.id}-panel-${n}`} tabIndex={n === 0 ? 0 : -1}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="br-kick">{cats[0].name}</p>
              )}
              <span className="br-count" aria-hidden="true">
                {total} ✶
              </span>
            </div>
            {cats.map((cat, n) => (
              <div key={n} id={`${s.id}-panel-${n}`} className="br-board" role={cats.length > 1 ? "tabpanel" : undefined} aria-labelledby={cats.length > 1 ? tab(n) : undefined} hidden={n > 0}>
                {cat.items.map((d, m) => (
                  <div key={m} className="br-dish" style={i(m)}>
                    <div className="br-dish-row">
                      <h3>{d.name}</h3>
                      {d.price ? (
                        <>
                          <span className="br-dots" aria-hidden="true" />
                          <b>{d.price}</b>
                        </>
                      ) : null}
                    </div>
                    {d.description ? <p>{d.description}</p> : null}
                    {d.tags?.length ? (
                      <p className="br-tags">
                        {d.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
            {s.note ? (
              <p className="br-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => (
      <section className="br-sec" id={s.id}>
        <div className="br-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} row />
          <ul className="br-cards">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <div className="br-card">
                  <span className="br-num">{String(n + 1).padStart(2, "0")}</span>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                  {it.price || it.duration ? (
                    <p className="br-meta">
                      {it.duration ? <span>{it.duration}</span> : null}
                      {it.price ? <b>{it.price}</b> : null}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    features: (s, c) => (
      <section className="br-sec is-basil br-zig" id={s.id}>
        <div className="br-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} row />
          <ul className="br-cards">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <div className="br-card">
                  <span className="br-ico">
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
    ),
    order: (s, c) => (
      <section className="br-sec" id={s.id}>
        <div className="br-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} row />
          <ul className="br-cards">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} className="br-card" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="br-ico">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <span className="br-go" aria-hidden="true">
                    <Arrow />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="br-sec is-paper br-zig" id={s.id}>
          <div className="br-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className="br-pola">
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
      <section className="br-sec br-zig" id={s.id} style={{ background: "var(--cream)" }}>
        <div className="br-wrap br-visit">
          <div className="br-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="br-visit-card" data-rv>
            <h3>
              {c.t.hours}
              <NowBadge c={c} className="br-now" />
            </h3>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="br-sec is-paper br-zig br-contact" id={s.id}>
        <div className="br-wrap br-visit">
          <div className="br-visit-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="br-form" data-rv>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : null}
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="br-sec is-basil br-zig" id={s.id}>
        <div className="br-wrap br-book">
          <div className="br-book-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Hours c={c} />
            <Reach c={c} />
          </div>
          <div className="br-form" data-rv>
            <p className="br-stamp" aria-hidden="true">
              {c.t.submit[s.kind]}
            </p>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
          </div>
        </div>
      </section>
    ),
  },
};
