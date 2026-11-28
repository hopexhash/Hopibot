import type { CSSProperties, ReactNode } from "react";
import { NowBadge, TODAY_JS } from "./today";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Kiosk: an original template (no portfolio demo). Retro pop for places that make people
 * happy: bubblegum pink, mint, sunshine yellow and grape on vanilla, chunky rounded type with a
 * marker pen for the odd accent. The opening rolls out a striped shop awning, drops the
 * headline in word by word like scoops landing on a cone (with a little squash), scoops the
 * photograph open from below inside an arch on a slowly turning sunburst, and slaps stickers
 * around it that peel at the corner under the cursor. Wavy ribbons of what the shop sells run
 * across the page, the menu is a set of colourful flavour cards that wiggle, the opening hours
 * hang on a sign that swings, and confetti drifts by slowly. Made for ice-cream parlours,
 * bubble-tea and snack shops, toy stores, kids' activities and fun cafés.
 */

const CSS = `
.d-kiosk{--vanilla:#fff6ea;--cream:#fffdf8;--pink:#ff5fa2;--pink-d:#d92f7e;--blush:#ffd6e8;--mint:#6fdcbc;--mint-l:#cff5e8;--sun:#ffd23f;--sun-l:#fff1b8;--grape:#6b3fa0;--lilac:#e9ddff;--ink:#35185a;--dim:#685781;--line:rgba(53,24,90,.16);--edge:3px solid var(--ink);--pad:clamp(16px,4.4vw,64px);--ease:cubic-bezier(.22,.8,.24,1);--bounce:cubic-bezier(.34,1.56,.64,1);--fat:"Unbounded",system-ui,sans-serif;--marker:"Permanent Marker","Comic Sans MS",cursive;--z-bg2:var(--cream);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--pink-d);--z-on-accent:#35185a;--z-display:var(--fat);--z-radius:28px;--z-field-radius:16px;--z-ico-radius:50%;--z-sec:clamp(72px,9vw,130px);--z-h3:clamp(19px,1.6vw,23px);--z-statement:clamp(28px,4vw,58px);--z-display-weight:800;background:var(--vanilla);color:var(--ink);font-family:"Poppins",system-ui,sans-serif;font-size:clamp(16px,1.04vw,18px);line-height:1.6;font-variant-ligatures:no-common-ligatures;font-feature-settings:"liga" 0,"locl" 0}
.d-kiosk ::selection{background:var(--sun);color:var(--ink)}
.d-kiosk h1,.d-kiosk h2,.d-kiosk h3{font-family:var(--fat);font-weight:800;line-height:1.04;letter-spacing:-.025em;overflow-wrap:break-word}
.d-kiosk h2{font-size:min(clamp(32px,4.6vw,66px),calc(100cqi / (var(--lw,8) * .8)))}
.d-kiosk h2.is-long{font-size:min(clamp(26px,3.3vw,48px),calc(100cqi / (var(--lw,8) * .8)));line-height:1.1}
.d-kiosk h3{font-weight:700;letter-spacing:-.015em}
.d-kiosk h1 em,.d-kiosk h2 em{display:inline-block;font-family:var(--marker);font-style:normal;font-weight:400;letter-spacing:0;color:var(--pink-d);transform:rotate(-3deg)}
.d-kiosk .ki-wrap{position:relative;width:min(100%,1300px);margin-inline:auto;padding-inline:var(--pad);container-type:inline-size}
.d-kiosk .ki-hero-copy,.d-kiosk .ki-copy,.d-kiosk .ki-visit-copy{min-width:0;container-type:inline-size}
.d-kiosk .ki-kick{display:inline-flex;align-items:center;gap:9px;padding:7px 16px 7px 10px;border:2.5px solid var(--ink);border-radius:999px;background:var(--mint);font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;line-height:1.3;transform:rotate(-2deg)}
.d-kiosk .ki-kick::before{content:"";flex:none;width:12px;height:12px;border:2px solid var(--ink);border-radius:50%;background:var(--pink)}
.d-kiosk .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:56px;padding:0 28px;border:var(--edge);border-radius:999px;font-family:var(--fat);font-size:15px;font-weight:700;letter-spacing:0;text-align:center;transition:transform .4s var(--bounce),box-shadow .3s var(--ease),background-color .25s}
.d-kiosk .btn svg{width:20px;height:20px;transition:transform .45s var(--bounce)}
.d-kiosk .btn:hover svg{transform:translateX(4px) rotate(-12deg) scale(1.1)}
.d-kiosk .ki-fill{background:var(--pink);color:var(--ink);box-shadow:0 6px 0 var(--ink)}
.d-kiosk .ki-fill:hover{transform:translateY(-3px) rotate(-2deg);box-shadow:0 9px 0 var(--ink);background:#ff7ab2}
.d-kiosk .ki-fill:active{transform:translateY(4px);box-shadow:0 2px 0 var(--ink)}
.d-kiosk .ki-line{background:var(--cream);color:var(--ink)}
.d-kiosk .ki-line:hover{background:var(--mint);transform:rotate(2deg) scale(1.03)}
.d-kiosk .ki-text{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:700;text-decoration:underline wavy var(--pink);text-decoration-thickness:2px;text-underline-offset:7px;transition:color .25s,text-underline-offset .3s}
.d-kiosk .ki-text:hover{color:var(--pink-d);text-underline-offset:4px}
.d-kiosk .ki-hdr{position:fixed;top:0;left:0;right:0;z-index:40;padding:12px var(--pad) 0;pointer-events:none}
.d-kiosk .ki-bar{display:flex;align-items:center;gap:14px;max-width:1260px;height:66px;margin-inline:auto;padding:0 8px 0 9px;border:var(--edge);border-radius:999px;background:var(--cream);box-shadow:0 16px 30px -18px rgba(53,24,90,.55);pointer-events:auto;transition:height .4s var(--bounce),box-shadow .3s}
.d-kiosk.is-scrolled .ki-bar{height:60px;box-shadow:0 18px 34px -16px rgba(53,24,90,.5)}
.d-kiosk .ki-logo{display:flex;align-items:center;gap:10px;min-width:0;font-family:var(--fat);font-size:17px;font-weight:800;letter-spacing:-.02em}
.d-kiosk .ki-logo i{display:grid;flex:none;place-items:center;width:46px;height:46px;border:var(--edge);border-radius:50%;background:var(--pink);font-style:normal;font-size:20px;transition:transform .6s var(--bounce)}
.d-kiosk .ki-logo:hover i{transform:rotate(-200deg) scale(1.08)}
.d-kiosk .ki-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-kiosk .ki-links{display:none;gap:4px;margin-left:auto}
.d-kiosk .ki-links a{display:inline-flex;align-items:center;min-height:46px;padding:0 15px;border-radius:999px;font-size:15px;font-weight:600;transition:background-color .25s,transform .35s var(--bounce)}
.d-kiosk .ki-links a:nth-child(4n+1):hover{background:var(--blush)}
.d-kiosk .ki-links a:nth-child(4n+2):hover{background:var(--mint-l)}
.d-kiosk .ki-links a:nth-child(4n+3):hover{background:var(--sun-l)}
.d-kiosk .ki-links a:nth-child(4n+4):hover{background:var(--lilac)}
.d-kiosk .ki-links a:hover{transform:rotate(-3deg) scale(1.05)}
.d-kiosk .ki-cta{display:none;min-height:48px;padding:0 22px;font-size:14px;box-shadow:none}
.d-kiosk .ki-cta:hover{box-shadow:none;transform:rotate(-3deg) scale(1.04)}
.d-kiosk .ki-burger{display:inline-flex;align-items:center;gap:10px;margin-left:auto;min-height:48px;padding:0 16px 0 14px;border:var(--edge);border-radius:999px;background:var(--sun);font-family:var(--fat);font-size:14px;font-weight:700;transition:transform .4s var(--bounce),background-color .3s}
.d-kiosk .ki-burger:hover{transform:rotate(-4deg)}
.d-kiosk .ki-burger i{position:relative;width:18px;height:3px;border-radius:3px;background:currentColor;transition:background-color .2s}
.d-kiosk .ki-burger i::before,.d-kiosk .ki-burger i::after{content:"";position:absolute;left:0;width:18px;height:3px;border-radius:3px;background:currentColor;transition:transform .45s var(--bounce)}
.d-kiosk .ki-burger i::before{top:-6px}.d-kiosk .ki-burger i::after{top:6px}
.d-kiosk.menu-open .ki-burger{background:var(--pink)}
.d-kiosk.menu-open .ki-burger i{background:transparent}
.d-kiosk.menu-open .ki-burger i::before{transform:translateY(6px) rotate(45deg)}
.d-kiosk.menu-open .ki-burger i::after{transform:translateY(-6px) rotate(-45deg)}
@media (min-width:1040px){.d-kiosk .ki-links,.d-kiosk .ki-cta{display:inline-flex}.d-kiosk .ki-cta{margin-left:6px}.d-kiosk .ki-burger{display:none}}
.d-kiosk .ki-drawer{position:fixed;left:0;right:0;top:0;z-index:39;display:grid;gap:26px;max-height:calc(100svh - 24px);padding:104px var(--pad) 58px;background:var(--sun);overflow-y:auto;-webkit-mask:linear-gradient(#000,#000) 0 0/100% calc(100% - 22px) no-repeat,radial-gradient(circle at 22px 0,#000 21.5px,transparent 22.5px) 0 100%/44px 22px repeat-x;mask:linear-gradient(#000,#000) 0 0/100% calc(100% - 22px) no-repeat,radial-gradient(circle at 22px 0,#000 21.5px,transparent 22.5px) 0 100%/44px 22px repeat-x;transform:translateY(-110%);visibility:hidden;transition:transform .75s var(--bounce),visibility 0s .75s}
.d-kiosk .ki-drawer.is-open{transform:none;visibility:visible;transition:transform .75s var(--bounce)}
.d-kiosk.menu-open::after{content:"";position:fixed;inset:0;z-index:38;background:rgba(53,24,90,.45)}
.d-kiosk .ki-drawer nav{display:flex;flex-wrap:wrap;gap:12px}
.d-kiosk .ki-drawer nav a{--c:var(--cream);display:inline-flex;align-items:center;gap:12px;min-height:60px;padding:6px 22px 6px 8px;border:var(--edge);border-radius:999px;background:var(--c);font-family:var(--fat);font-size:clamp(20px,6vw,34px);font-weight:800;letter-spacing:-.02em;opacity:0;transform:scale(.5) rotate(-12deg);transition:opacity .3s,transform .6s var(--bounce)}
.d-kiosk .ki-drawer nav a:nth-child(4n+1){--c:var(--blush);--r:-2deg}
.d-kiosk .ki-drawer nav a:nth-child(4n+2){--c:var(--mint-l);--r:1.5deg}
.d-kiosk .ki-drawer nav a:nth-child(4n+3){--c:var(--cream);--r:-1deg}
.d-kiosk .ki-drawer nav a:nth-child(4n+4){--c:var(--lilac);--r:2deg}
.d-kiosk .ki-drawer.is-open nav a{opacity:1;transform:rotate(var(--r,0deg));transition-delay:calc(.2s + var(--i,0) * 70ms)}
.d-kiosk .ki-drawer nav a:hover{transform:rotate(0) scale(1.05)}
.d-kiosk .ki-drawer nav b{display:grid;place-items:center;width:42px;height:42px;border:2.5px solid var(--ink);border-radius:50%;background:var(--cream);font-size:14px}
.d-kiosk .ki-drawer p{font-weight:600}
.d-kiosk .ki-drawer p a{display:inline-flex;align-items:center;min-height:44px;text-decoration:underline wavy var(--pink-d);text-underline-offset:6px}
.d-kiosk .ki-hero{position:relative;padding:0 0 clamp(64px,7vw,110px);overflow:hidden}
.d-kiosk .ki-awning{position:relative;z-index:2;height:clamp(84px,8vw,100px);transform-origin:50% 0;animation:ki-unroll 1s var(--bounce) both}
.d-kiosk .ki-awning::before{content:"";position:absolute;inset:0 0 26px;background:repeating-linear-gradient(90deg,var(--pink) 0 52px,var(--cream) 52px 104px);box-shadow:inset 0 -4px 0 rgba(53,24,90,.12)}
.d-kiosk .ki-awning::after{content:"";position:absolute;left:0;right:0;bottom:0;height:26px;background:radial-gradient(circle at 26px 0,var(--pink) 25.5px,transparent 26.5px) 0 0/104px 26px repeat-x,radial-gradient(circle at 78px 0,var(--cream) 25.5px,transparent 26.5px) 0 0/104px 26px repeat-x;filter:drop-shadow(0 5px 0 rgba(53,24,90,.1));transform-origin:50% 0;animation:ki-flap 1.6s var(--ease) .5s both}
.d-kiosk .ki-hero-grid{position:relative;z-index:1;display:grid;gap:clamp(48px,5vw,80px);align-items:center;padding-top:clamp(30px,4vw,60px)}
@media (min-width:960px){.d-kiosk .ki-hero-grid{grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr)}}
.d-kiosk .ki-hero-top{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:24px}
.d-kiosk .ki-hero-top .ki-kick{animation:ki-pop .8s var(--bounce) .25s backwards}
.d-kiosk .ki-hero h1{font-size:min(clamp(40px,5.4vw,86px),calc(100cqi / (var(--lw,8) * .82)));line-height:1.02;letter-spacing:-.035em}
.d-kiosk .ki-hero h1.is-m{font-size:min(clamp(34px,4.3vw,68px),calc(100cqi / (var(--lw,8) * .82)))}
.d-kiosk .ki-hero h1.is-s{font-size:min(clamp(30px,3.4vw,54px),calc(100cqi / (var(--lw,8) * .82)));line-height:1.08}
.d-kiosk .ki-word{display:inline-block;transform-origin:50% 100%;animation:ki-drop 1s var(--ease) both;animation-delay:calc(.4s + var(--i,0) * 95ms)}
.d-kiosk .ki-word.is-pop{color:var(--pink-d)}
.d-kiosk .ki-hero h1 em.ki-word{font-size:1.06em}
.d-kiosk .ki-lede{max-width:44ch;margin-top:24px;font-size:clamp(17px,1.3vw,20px);color:var(--dim)}
.d-kiosk .ki-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:16px 26px;margin-top:32px}
.d-kiosk .ki-up{animation:ki-up .9s var(--ease) both;animation-delay:calc(.9s + var(--i,0) * 110ms)}
.d-kiosk .ki-facts{display:flex;flex-wrap:wrap;gap:12px;margin-top:38px}
.d-kiosk .ki-facts div{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:0 12px;min-width:0;padding:10px 18px 10px 10px;border:2.5px solid var(--ink);border-radius:22px;background:var(--cream);transition:transform .4s var(--bounce)}
.d-kiosk .ki-facts div:nth-child(1){background:var(--sun-l)}
.d-kiosk .ki-facts div:nth-child(2){background:var(--mint-l)}
.d-kiosk .ki-facts div:nth-child(3){background:var(--blush)}
.d-kiosk .ki-facts div:hover{transform:translateY(-3px) rotate(-1.5deg)}
.d-kiosk .ki-facts span{grid-row:span 2;display:grid;place-items:center;width:40px;height:40px;border:2px solid var(--ink);border-radius:50%;background:var(--cream)}
.d-kiosk .ki-facts span svg{width:18px;height:18px}
.d-kiosk .ki-facts dt{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}
.d-kiosk .ki-facts dd{margin:0;font-size:14.5px;font-weight:600;line-height:1.35;overflow-wrap:anywhere}
.d-kiosk .ki-art{position:relative;justify-self:center;width:min(100%,520px);aspect-ratio:1/1.1}
.d-kiosk .ki-sunburst{position:absolute;left:50%;top:50%;width:118%;aspect-ratio:1;margin:-59% 0 0 -59%;border-radius:50%;background:repeating-conic-gradient(var(--sun) 0 9deg,var(--sun-l) 9deg 18deg);-webkit-mask:radial-gradient(closest-side,#000 97%,transparent 98%);mask:radial-gradient(closest-side,#000 97%,transparent 98%);animation:ki-in 1s var(--ease) .2s both,ki-spin 90s linear 1.2s infinite}
.d-kiosk .ki-arch{position:absolute;left:11%;right:11%;top:5%;bottom:2%;border:8px solid var(--cream);border-radius:999px 999px 48px 48px;background:var(--blush);box-shadow:0 0 0 3px var(--ink),0 34px 60px -26px rgba(53,24,90,.6);animation:ki-pop 1s var(--bounce) .3s backwards}
.d-kiosk .ki-arch-in{position:absolute;inset:0;overflow:hidden;border-radius:999px 999px 40px 40px;clip-path:circle(0% at 50% 100%);animation:ki-scoop 1.5s var(--ease) .55s forwards}
.d-kiosk .ki-arch img{width:100%;height:100%;object-fit:cover;scale:1.14;transform:translateY(calc(var(--p,0) * -4%));animation:ki-zoom 2.2s var(--ease) .55s forwards}
.d-kiosk .ki-blobs{position:absolute;inset:4% 6% 2%}
.d-kiosk .ki-blobs b{position:absolute;display:grid;place-items:center;border:var(--edge);border-radius:50%;animation:ki-pop 1s var(--bounce) backwards;animation-delay:calc(.3s + var(--i,0) * 120ms)}
.d-kiosk .ki-blobs b:nth-child(1){left:8%;top:6%;width:72%;aspect-ratio:1;background:var(--pink);box-shadow:0 0 0 8px var(--cream),0 0 0 11px var(--ink);font-family:var(--fat);font-size:clamp(120px,17vw,230px);font-weight:800;line-height:1}
.d-kiosk .ki-blobs b:nth-child(2){right:2%;top:40%;width:38%;aspect-ratio:1;background:var(--mint)}
.d-kiosk .ki-blobs b:nth-child(3){left:2%;bottom:2%;width:30%;aspect-ratio:1;background:var(--sun)}
.d-kiosk .ki-blobs b:nth-child(4){right:20%;top:0;width:14%;aspect-ratio:1;background:var(--grape)}
.d-kiosk .ki-stk{position:absolute;z-index:3;display:inline-flex;align-items:center;gap:8px;max-width:60%;padding:10px 18px;border:var(--edge);border-radius:18px;background:var(--c,var(--sun));font-size:15px;font-weight:700;line-height:1.2;box-shadow:0 0 0 5px var(--cream),0 16px 26px -14px rgba(53,24,90,.55);transform:rotate(var(--r,0deg));animation:ki-pop .8s var(--bounce) backwards;animation-delay:calc(1.2s + var(--i,0) * 150ms);transition:transform .45s var(--bounce)}
.d-kiosk .ki-stk[hidden]{display:none}
.d-kiosk .ki-stk::after{content:"";position:absolute;right:-3px;bottom:-3px;width:0;height:0;border-radius:0 0 16px 0;background:linear-gradient(315deg,var(--vanilla) 0 47%,rgba(53,24,90,.3) 49%,#ffffff 51%,#f2eaf7 100%);transition:width .4s var(--ease),height .4s var(--ease)}
.d-kiosk .ki-stk:hover{transform:rotate(calc(var(--r,0deg) * -1)) translateY(-5px) scale(1.06)}
.d-kiosk .ki-stk:hover::after{width:28px;height:28px}
.d-kiosk .ki-stk.is-now{--c:var(--mint);--r:4deg;right:-2%;top:56%}
.d-kiosk .ki-stk.is-now::before{content:"";width:11px;height:11px;border:2px solid var(--ink);border-radius:50%;background:var(--cream)}
.d-kiosk .ki-stk.is-now.is-closed{--c:var(--blush)}
.d-kiosk .ki-stk.is-word{--c:var(--sun);--r:-6deg;left:-2%;bottom:7%;font-family:var(--fat);font-size:16px}
.d-kiosk .ki-seal{position:absolute;z-index:3;left:-5%;top:6%;display:grid;place-items:center;width:clamp(124px,12vw,156px);aspect-ratio:1;animation:ki-pop .9s var(--bounce) 1.05s backwards;transition:transform .6s var(--bounce)}
.d-kiosk .ki-seal::before,.d-kiosk .ki-seal::after{content:"";position:absolute;clip-path:var(--burst)}
.d-kiosk .ki-seal::before{inset:-8px;background:var(--ink)}
.d-kiosk .ki-seal::after{inset:-3px;background:var(--pink);box-shadow:inset 0 0 0 4px var(--cream)}
.d-kiosk .ki-seal b{position:relative;z-index:1;max-width:74%;font-family:var(--marker);font-size:var(--fs,18px);font-weight:400;line-height:1.05;text-align:center;transform:rotate(-10deg);overflow-wrap:anywhere}
.d-kiosk .ki-seal:hover{transform:rotate(24deg) scale(1.06)}
.d-kiosk .ki-seal .ki-ring{position:absolute;inset:14%;z-index:1;border:2px dashed rgba(53,24,90,.5);border-radius:50%;animation:ki-spin 30s linear infinite}
@media (max-width:620px){.d-kiosk .ki-seal{left:-2%;top:2%;width:112px}.d-kiosk .ki-stk{font-size:13.5px;padding:8px 14px}.d-kiosk .ki-stk.is-now{right:0}.d-kiosk .ki-stk.is-word{left:0}}
.d-kiosk .ki-confetti{position:absolute;inset:0;z-index:0;pointer-events:none;transform:translateY(calc(var(--p,0) * 50px))}
.d-kiosk .ki-confetti i{position:absolute;left:var(--x);top:var(--y);width:var(--s);height:var(--s);background:var(--c);border:2.5px solid var(--ink);animation:ki-drift var(--t,16s) ease-in-out var(--d,0s) infinite alternate}
.d-kiosk .ki-confetti .c-dot{border-radius:50%}
.d-kiosk .ki-confetti .c-ring{border-radius:50%;background:transparent;border:5px solid var(--c)}
.d-kiosk .ki-confetti .c-spr{height:calc(var(--s) * .34);border-radius:99px}
.d-kiosk .ki-confetti .c-tri{border:0;clip-path:polygon(50% 0,100% 100%,0 100%)}
.d-kiosk .ki-confetti .c-star{border:0;clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)}
.d-kiosk .ki-confetti .c-sq{border-radius:6px}
@media (max-width:700px){.d-kiosk .ki-confetti i:nth-child(n+7){display:none}.d-kiosk .ki-hero .ki-confetti i:not(:nth-child(3)),.d-kiosk .ki-foot .ki-confetti{display:none}}
.d-kiosk .ki-ribbons{position:relative;z-index:2;height:clamp(150px,15vw,200px);margin-block:-24px -10px;overflow:hidden;pointer-events:none}
.d-kiosk .ki-ribbon{position:absolute;left:0;top:50%;width:4800px;height:120px;margin-top:-60px;overflow:visible;transform-origin:min(50vw,720px) 50%}
.d-kiosk .ki-ribbon svg{display:block;width:100%;height:100%;overflow:visible;animation:ki-wave 48s linear infinite}
.d-kiosk .ki-ribbon.is-back{transform:rotate(-4deg) translateY(10px)}
.d-kiosk .ki-ribbon.is-back svg{animation-direction:reverse;animation-duration:60s}
.d-kiosk .ki-ribbon.is-front{transform:rotate(2.5deg) translateY(-6px)}
.d-kiosk .ki-ribbon text{font-family:var(--fat);font-size:27px;font-weight:800;letter-spacing:0}
@media (max-width:700px){.d-kiosk .ki-ribbon{width:3360px;height:84px;margin-top:-42px}.d-kiosk .ki-ribbons{height:132px}}
.d-kiosk .ki-sec{--bg:var(--vanilla);position:relative;padding-block:clamp(78px,9vw,140px);background:var(--bg)}
.d-kiosk .ki-sec.is-mint{--bg:var(--mint-l)}
.d-kiosk .ki-sec.is-pink{--bg:var(--blush)}
.d-kiosk .ki-sec.is-sun{--bg:var(--sun)}
.d-kiosk .ki-sec.is-lilac{--bg:var(--lilac)}
.d-kiosk .ki-sec.is-cream{--bg:var(--cream)}
.d-kiosk .ki-sec.is-grape{--bg:var(--grape);color:#fffdf8}
.d-kiosk .ki-sec.is-grape .ki-kick{background:var(--sun)}
.d-kiosk .ki-sec.is-grape h2 em{color:var(--sun)}
.d-kiosk .ki-edge::before{content:"";position:absolute;left:0;right:0;top:-21px;height:22px;background:radial-gradient(circle at 22px 22px,var(--bg) 21.5px,transparent 22.5px) 0 0/44px 22px repeat-x;pointer-events:none}
.d-kiosk .ki-head{display:grid;gap:16px;justify-items:start;max-width:860px;margin-bottom:clamp(38px,4.6vw,66px)}
.d-kiosk .ki-head.is-center{justify-items:center;margin-inline:auto;text-align:center}
.d-kiosk .ki-intro{max-width:54ch;font-size:1.06em;color:var(--dim)}
.d-kiosk .is-grape .ki-intro{color:rgba(255,253,248,.8)}
.d-kiosk .ki-about{display:grid;gap:clamp(48px,6vw,96px);align-items:center}
@media (min-width:900px){.d-kiosk .ki-about{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)}.d-kiosk .ki-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:920px}}
.d-kiosk .ki-about-pic{position:relative;width:min(100%,520px);justify-self:center}
.d-kiosk .ki-blob{position:relative;aspect-ratio:1/1.05;overflow:hidden;border:8px solid var(--cream);border-radius:58% 42% 52% 48%/48% 58% 42% 52%;box-shadow:0 0 0 3px var(--ink),0 30px 50px -26px rgba(53,24,90,.55);animation:ki-morph 14s ease-in-out infinite alternate}
.d-kiosk .ki-blob img{width:100%;height:100%;object-fit:cover;transform:scale(calc(1.12 + var(--p,0) * .05));transition:transform .8s var(--ease)}
.d-kiosk .ki-dot{position:absolute;right:-4%;bottom:-2%;width:38%;aspect-ratio:1;overflow:hidden;border:6px solid var(--cream);border-radius:50%;box-shadow:0 0 0 3px var(--ink);transform:rotate(-6deg);transition:transform .6s var(--bounce)}
.d-kiosk .ki-about-pic:hover .ki-dot{transform:rotate(8deg) scale(1.06)}
.d-kiosk .ki-dot img{width:100%;height:100%;object-fit:cover}
.d-kiosk .ki-copy{display:grid;gap:20px;align-content:start}
.d-kiosk .ki-copy .ki-head,.d-kiosk .ki-visit-copy .ki-head{margin-bottom:6px}
.d-kiosk .ki-copy .ki-lead{font-size:clamp(19px,1.6vw,24px);font-weight:500;line-height:1.5}
.d-kiosk .ki-copy>p{color:var(--dim)}
.d-kiosk .ki-copy>p.ki-lead{color:var(--ink)}
.d-kiosk .ki-chips{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px}
.d-kiosk .ki-chips li{position:relative;display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border:2.5px solid var(--ink);border-radius:16px;background:var(--c,var(--cream));font-weight:700;font-size:15px;box-shadow:0 0 0 4px var(--cream);transform:rotate(var(--r,0deg));transition:transform .45s var(--bounce)}
.d-kiosk .ki-chips li:nth-child(4n+1){--c:var(--sun);--r:-2deg}
.d-kiosk .ki-chips li:nth-child(4n+2){--c:var(--blush);--r:1.5deg}
.d-kiosk .ki-chips li:nth-child(4n+3){--c:var(--cream);--r:-1deg}
.d-kiosk .ki-chips li:nth-child(4n+4){--c:var(--lilac);--r:2deg}
.d-kiosk .ki-chips li::after{content:"";position:absolute;right:-2.5px;bottom:-2.5px;width:0;height:0;border-radius:0 0 14px 0;background:linear-gradient(315deg,var(--bg,var(--vanilla)) 0 47%,rgba(53,24,90,.3) 49%,#ffffff 51%,#f2eaf7 100%);transition:width .35s var(--ease),height .35s var(--ease)}
.d-kiosk .ki-chips li:hover{transform:rotate(0) translateY(-4px)}
.d-kiosk .ki-chips li:hover::after{width:22px;height:22px}
.d-kiosk .ki-chips svg{width:16px;height:16px}
.d-kiosk .ki-flavours{display:grid;gap:54px clamp(18px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));padding-top:36px}
.d-kiosk .ki-flavours>li{--c:var(--blush);--s:var(--pink)}
.d-kiosk .ki-flavours>li:nth-child(4n+2){--c:var(--mint-l);--s:var(--mint)}
.d-kiosk .ki-flavours>li:nth-child(4n+3){--c:var(--sun-l);--s:var(--sun)}
.d-kiosk .ki-flavours>li:nth-child(4n+4){--c:var(--lilac);--s:var(--grape);--so:#fffdf8}
.d-kiosk .ki-flavour{position:relative;display:grid;gap:12px;align-content:start;height:100%;padding:clamp(56px,5vw,64px) clamp(22px,2.4vw,32px) clamp(24px,2.4vw,32px);border:var(--edge);border-radius:32px;background:var(--c);color:var(--ink);transition:box-shadow .4s var(--ease)}
.d-kiosk .ki-flavour:hover{animation:ki-wiggle .7s var(--ease);box-shadow:0 26px 40px -24px rgba(53,24,90,.6)}
.d-kiosk .ki-scoop{position:absolute;left:clamp(20px,2.2vw,28px);top:-36px;display:grid;place-items:center;width:74px;height:72px;border:var(--edge);border-radius:52% 48% 46% 54%/58% 56% 44% 42%;background:var(--s);color:var(--so,var(--ink));font-family:var(--fat);font-size:24px;font-weight:800;box-shadow:0 0 0 5px var(--cream);transition:transform .5s var(--bounce)}
.d-kiosk .ki-scoop svg{width:28px;height:28px}
.d-kiosk .ki-flavour:hover .ki-scoop{transform:translateY(-8px) rotate(-10deg) scale(1.08)}
.d-kiosk .ki-flavour p{color:var(--dim)}
.d-kiosk .ki-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.d-kiosk .ki-meta span{padding:4px 12px;border:2px solid var(--ink);border-radius:999px;background:var(--cream);font-size:13.5px;font-weight:600}
.d-kiosk .ki-price{display:inline-block;padding:4px 14px 3px;border:2px solid var(--ink);border-radius:10px;background:var(--sun);font-family:var(--marker);font-size:18px;font-weight:400;line-height:1.3;transform:rotate(-4deg);transition:transform .4s var(--bounce)}
.d-kiosk .ki-flavour:hover .ki-price,.d-kiosk .ki-treat:hover .ki-price{transform:rotate(4deg) scale(1.1)}
.d-kiosk .ki-go{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;margin-top:6px;border:2.5px solid var(--ink);border-radius:50%;background:var(--cream);transition:transform .45s var(--bounce),background-color .3s}
.d-kiosk .ki-go svg{width:20px;height:20px}
.d-kiosk .ki-flavour:hover .ki-go{transform:translateX(6px) rotate(-12deg);background:var(--s)}
.d-kiosk .ki-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:30px}
.d-kiosk .ki-tabs button{min-height:50px;padding:0 22px;border:var(--edge);border-radius:999px;background:var(--cream);font-family:var(--fat);font-size:15px;font-weight:700;transition:transform .4s var(--bounce),background-color .25s}
.d-kiosk .ki-tabs button:hover{transform:rotate(-3deg) translateY(-2px);background:var(--sun-l)}
.d-kiosk .ki-tabs button[aria-selected="true"]{background:var(--pink);transform:rotate(-2deg)}
.d-kiosk .ki-treats{display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(min(100%,280px),1fr))}
.d-kiosk .ki-treats[hidden]{display:none}
.d-kiosk .ki-treats:not([hidden]) .ki-treat{animation:ki-pop .6s var(--bounce) backwards;animation-delay:calc(var(--i,0) * 60ms)}
.d-kiosk .ki-treat{--c:var(--blush);--s:var(--pink);position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 16px;align-content:start;padding:20px 20px 22px;border:var(--edge);border-radius:28px;background:var(--cream);transition:background-color .3s}
.d-kiosk .ki-treat:nth-child(4n+2){--c:var(--mint-l);--s:var(--mint)}
.d-kiosk .ki-treat:nth-child(4n+3){--c:var(--sun-l);--s:var(--sun)}
.d-kiosk .ki-treat:nth-child(4n+4){--c:var(--lilac);--s:var(--grape)}
.d-kiosk .ki-treat:hover{background:var(--c);animation:ki-wiggle .7s var(--ease)}
.d-kiosk .ki-treat>i{grid-row:span 3;width:52px;height:52px;border:var(--edge);border-radius:50%;background:radial-gradient(circle at 34% 30%,rgba(255,255,255,.7) 0 14%,transparent 15%),var(--s);transition:transform .5s var(--bounce)}
.d-kiosk .ki-treat:hover>i{transform:rotate(-20deg) scale(1.1)}
.d-kiosk .ki-treat h3{font-size:clamp(17px,1.4vw,20px);line-height:1.2}
.d-kiosk .ki-treat p{font-size:.94em;color:var(--dim)}
.d-kiosk .ki-treat .ki-price{justify-self:start;margin-top:8px}
.d-kiosk .ki-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.d-kiosk .ki-tags span{padding:2px 10px;border:2px solid var(--ink);border-radius:999px;background:var(--mint);font-size:12px;font-weight:700}
.d-kiosk .ki-note{margin-top:26px;font-size:14.5px;color:var(--dim)}
.d-kiosk .ki-badges{display:grid;gap:clamp(20px,2.4vw,32px);grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))}
.d-kiosk .ki-badge{position:relative;display:grid;gap:12px;justify-items:center;align-content:start;height:100%;padding:clamp(26px,3vw,40px) 24px;border:var(--edge);border-radius:44px;background:var(--cream);text-align:center;box-shadow:0 0 0 7px #ffffff,0 22px 36px -22px rgba(53,24,90,.6);transform:rotate(var(--r,0deg));transition:transform .5s var(--bounce)}
.d-kiosk .ki-badges>li:nth-child(3n+1) .ki-badge{--r:-2.5deg;--s:var(--pink)}
.d-kiosk .ki-badges>li:nth-child(3n+2) .ki-badge{--r:1.5deg;--s:var(--mint)}
.d-kiosk .ki-badges>li:nth-child(3n+3) .ki-badge{--r:-1deg;--s:var(--lilac)}
.d-kiosk .ki-badge:hover{transform:rotate(0) scale(1.04) translateY(-4px)}
.d-kiosk .ki-ico{display:grid;place-items:center;width:76px;height:76px;border:var(--edge);border-radius:50%;background:var(--s,var(--pink));transition:transform .7s var(--bounce)}
.d-kiosk .ki-ico svg{width:32px;height:32px}
.d-kiosk .ki-badge:hover .ki-ico{transform:rotate(360deg)}
.d-kiosk .ki-badge p{color:var(--dim)}
.d-kiosk .ki-path{position:relative;display:grid;gap:34px}
.d-kiosk .ki-path li{position:relative;display:grid;gap:10px;align-content:start;padding-left:96px}
.d-kiosk .ki-path li::before{content:"";position:absolute;left:36px;top:80px;bottom:-30px;width:8px;background:radial-gradient(circle,var(--ink) 3px,transparent 3.5px) 50% 0/8px 16px repeat-y;transform:scaleY(0);transform-origin:50% 0;transition:transform 1s var(--ease) .3s}
.d-kiosk .ki-path li:last-child::before{display:none}
.d-kiosk .ki-path li.in::before{transform:none}
.d-kiosk .ki-num{position:absolute;left:0;top:0;display:grid;place-items:center;width:80px;height:80px;border:var(--edge);border-radius:50%;background:var(--s,var(--pink));font-family:var(--fat);font-size:28px;font-weight:800;box-shadow:0 0 0 6px var(--cream);transition:transform .5s var(--bounce)}
.d-kiosk .ki-path li:nth-child(4n+2){--s:var(--mint)}
.d-kiosk .ki-path li:nth-child(4n+3){--s:var(--sun)}
.d-kiosk .ki-path li:nth-child(4n+4){--s:var(--lilac)}
.d-kiosk .ki-path li:hover .ki-num{transform:scale(1.1) rotate(-10deg)}
.d-kiosk .ki-path p{color:var(--dim)}
@media (min-width:900px){.d-kiosk .ki-path{grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:clamp(22px,3vw,44px)}.d-kiosk .ki-path li{padding:104px 0 0}.d-kiosk .ki-path li::before{left:96px;right:-20px;top:36px;bottom:auto;width:auto;height:8px;background:radial-gradient(circle,var(--ink) 3px,transparent 3.5px) 0 50%/16px 8px repeat-x;transform:scaleX(0);transform-origin:0 50%}.d-kiosk .ki-path li:nth-child(even){margin-top:34px}.d-kiosk .ki-path li:nth-child(even)::before{top:2px;transform:scaleX(0) rotate(-6deg)}.d-kiosk .ki-path li:nth-child(odd)::before{transform:scaleX(0) rotate(6deg)}.d-kiosk .ki-path li.in:nth-child(odd)::before{transform:rotate(6deg)}.d-kiosk .ki-path li.in:nth-child(even)::before{transform:rotate(-6deg)}}
.d-kiosk .ki-shapes{display:grid;gap:clamp(16px,2.4vw,34px);grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:900px){.d-kiosk .ki-shapes{grid-template-columns:repeat(3,minmax(0,1fr))}}
.d-kiosk .ki-shape{position:relative;margin:0;aspect-ratio:1;overflow:hidden;border:7px solid var(--cream);box-shadow:0 0 0 3px var(--ink),0 26px 44px -26px rgba(0,0,0,.6);transform:rotate(var(--r,0deg));transition:transform .6s var(--bounce),border-radius .8s var(--ease)}
.d-kiosk .ki-shape img{width:100%;height:100%;object-fit:cover;transition:transform 1s var(--ease)}
.d-kiosk .ki-shape:hover{transform:rotate(0) scale(1.04);z-index:2}
.d-kiosk .ki-shape:hover img{transform:scale(1.08)}
.d-kiosk .ki-shape:nth-child(6n+1){border-radius:50%;--r:-3deg}
.d-kiosk .ki-shape:nth-child(6n+2){border-radius:999px 999px 30px 30px;aspect-ratio:4/5;--r:2deg}
.d-kiosk .ki-shape:nth-child(6n+3){border-radius:58% 42% 52% 48%/48% 58% 42% 52%;--r:-1deg}
.d-kiosk .ki-shape:nth-child(6n+4){border-radius:44px;aspect-ratio:4/5;--r:2.5deg}
.d-kiosk .ki-shape:nth-child(6n+5){border-radius:999px;aspect-ratio:3/4;--r:-2deg}
.d-kiosk .ki-shape:nth-child(6n+6){border-radius:30px 30px 999px 999px;--r:1deg}
.d-kiosk .ki-shape:hover{border-radius:36px}
.d-kiosk .ki-shapes .ki-shape{align-self:center}
.demo-js .d-kiosk .ki-shape[data-rv]{transform:translateY(50px) rotate(calc(var(--r,0deg) * 4)) scale(.9)}
.demo-js .d-kiosk .ki-shape[data-rv].in{transform:rotate(var(--r,0deg));transition:opacity .5s,transform .9s var(--bounce),border-radius .8s var(--ease);transition-delay:calc(var(--i,0) * 90ms)}
.demo-js .d-kiosk .ki-shape[data-rv].in:hover{transform:rotate(0) scale(1.04);transition-delay:0s}
.d-kiosk .ki-visit{display:grid;gap:clamp(44px,5vw,80px);align-items:start}
@media (min-width:900px){.d-kiosk .ki-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-kiosk .ki-visit-copy{display:grid;gap:20px;align-content:start}
.d-kiosk .ki-visit-copy>p{max-width:52ch;color:var(--dim)}
.d-kiosk .z-reach{gap:4px;font-weight:500;color:var(--ink)}
.d-kiosk .z-reach a{min-height:40px;font-weight:600;text-decoration:underline wavy var(--pink);text-decoration-thickness:2px;text-underline-offset:6px;transition:color .25s}
.d-kiosk .z-reach a:hover{color:var(--pink-d)}
.d-kiosk .z-reach .z-route{color:var(--ink);font-family:var(--fat);font-size:15px}
.d-kiosk .ki-sign-wrap{position:relative;padding-top:58px}
.d-kiosk .ki-strings{position:absolute;left:0;right:0;top:0;width:100%;height:62px;overflow:visible}
.d-kiosk .ki-strings path{fill:none;stroke:var(--ink);stroke-width:3;vector-effect:non-scaling-stroke}
.d-kiosk .ki-strings circle{fill:var(--ink)}
.d-kiosk .ki-sign{position:relative;padding:clamp(22px,3vw,36px);border:var(--edge);border-radius:34px;background:var(--cream);box-shadow:0 0 0 7px #ffffff,0 30px 50px -28px rgba(53,24,90,.6);transform-origin:50% -58px}
.d-kiosk .ki-sign-wrap.in .ki-sign{animation:ki-swing 2.8s var(--ease) .2s both}
.d-kiosk .ki-sign:hover{animation:ki-nudge 1.4s var(--ease)}
.d-kiosk .ki-sign-h{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 16px;margin-bottom:14px}
.d-kiosk .ki-sign-h h3{font-size:clamp(22px,2.2vw,30px)}
.d-kiosk .ki-now{display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border:2.5px solid var(--ink);border-radius:999px;background:var(--mint);font-family:var(--fat);font-size:14px;font-weight:700;line-height:1.1;transform:rotate(3deg)}
.d-kiosk .ki-now::before{content:"";width:10px;height:10px;border:2px solid var(--ink);border-radius:50%;background:var(--cream)}
.d-kiosk .ki-now.is-closed{background:var(--blush)}
.d-kiosk .z-hours{border-top:2.5px dashed var(--line)}
.d-kiosk .z-hours div{align-items:center;padding:12px 14px;margin-inline:-14px;border-bottom:2.5px dashed var(--line);border-radius:16px;font-weight:500;transition:background-color .3s}
.d-kiosk .z-hours dt{font-weight:600}
.d-kiosk .z-hours dd{color:var(--ink);font-variant-numeric:tabular-nums}
.d-kiosk .z-hours div.is-today{border-color:transparent;background:var(--sun);font-weight:700;transform:rotate(-1deg)}
.d-kiosk .ki-tiles{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))}
.d-kiosk .ki-tile{position:relative;display:grid;gap:8px;align-content:start;height:100%;padding:24px;border:var(--edge);border-radius:30px;background:var(--c,var(--cream));color:var(--ink);transition:transform .45s var(--bounce)}
.d-kiosk .ki-tiles>:nth-child(4n+1) .ki-tile{--c:var(--pink)}
.d-kiosk .ki-tiles>:nth-child(4n+2) .ki-tile{--c:var(--mint)}
.d-kiosk .ki-tiles>:nth-child(4n+3) .ki-tile{--c:var(--sun)}
.d-kiosk .ki-tiles>:nth-child(4n+4) .ki-tile{--c:var(--lilac)}
.d-kiosk .ki-tile:hover{transform:rotate(-2deg) translateY(-4px)}
.d-kiosk .ki-tile .ki-ico{width:52px;height:52px;background:var(--cream)}
.d-kiosk .ki-tile .ki-ico svg{width:22px;height:22px}
.d-kiosk .ki-tile small{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.d-kiosk .ki-tile b{font-family:var(--fat);font-size:clamp(17px,1.5vw,21px);font-weight:700;line-height:1.25;overflow-wrap:anywhere}
.d-kiosk .ki-contact{display:grid;gap:clamp(36px,4vw,64px)}
@media (min-width:960px){.d-kiosk .ki-contact.has-form{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.d-kiosk .ki-contact .z-hours{margin-top:8px;border-color:rgba(255,253,248,.3)}
.d-kiosk .is-grape .z-hours div{border-color:rgba(255,253,248,.3)}
.d-kiosk .is-grape .z-hours dd{color:#fffdf8}
.d-kiosk .is-grape .z-hours div.is-today{color:var(--ink)}
.d-kiosk .is-grape .z-hours div.is-today dd{color:var(--ink)}
.d-kiosk .ki-form{position:relative;padding:clamp(26px,3.2vw,44px);border:var(--edge);border-radius:36px;background:var(--cream);color:var(--ink);box-shadow:0 0 0 7px #ffffff,0 30px 50px -28px rgba(53,24,90,.6)}
.d-kiosk .ki-form-tag{position:absolute;right:24px;top:-22px;padding:8px 18px;border:var(--edge);border-radius:14px;background:var(--pink);font-family:var(--marker);font-size:18px;line-height:1.2;transform:rotate(4deg);box-shadow:0 0 0 4px var(--cream)}
.d-kiosk .z-field label,.d-kiosk .z-chipset legend{font-size:12px;font-weight:700;letter-spacing:.1em;color:var(--dim)}
.d-kiosk .z-field input,.d-kiosk .z-field select,.d-kiosk .z-field textarea{border:2.5px solid var(--ink);background:#ffffff;color:var(--ink);transition:box-shadow .25s,border-color .25s}
.d-kiosk .z-field input:focus,.d-kiosk .z-field select:focus,.d-kiosk .z-field textarea:focus{box-shadow:0 0 0 5px var(--blush);border-color:var(--pink-d)}
.d-kiosk .z-field :focus-visible{outline:none}
.d-kiosk .z-chips button{border:2.5px solid var(--ink);border-radius:14px;font-family:var(--fat);font-weight:700;transition:transform .35s var(--bounce),background-color .2s}
.d-kiosk .z-chips button:hover{transform:translateY(-3px) rotate(-3deg)}
.d-kiosk .z-chips button[aria-pressed="true"]{background:var(--pink);border-color:var(--ink);color:var(--ink)}
.d-kiosk .form-status{border:2.5px solid var(--ink);border-radius:16px;background:var(--mint-l)}
.d-kiosk .ki-arcade{--c:var(--pink);display:grid;gap:10px;align-content:start;height:100%;padding:28px 26px;border:var(--edge);border-radius:32px;background:var(--c);color:var(--ink);box-shadow:0 8px 0 var(--ink);transition:transform .2s var(--ease),box-shadow .2s var(--ease)}
.d-kiosk .ki-flavours>li:nth-child(4n+2) .ki-arcade{--c:var(--mint)}
.d-kiosk .ki-flavours>li:nth-child(4n+3) .ki-arcade{--c:var(--sun)}
.d-kiosk .ki-flavours>li:nth-child(4n+4) .ki-arcade{--c:var(--lilac)}
.d-kiosk .ki-arcade:hover{transform:translateY(4px);box-shadow:0 4px 0 var(--ink)}
.d-kiosk .ki-arcade:active{transform:translateY(8px);box-shadow:0 0 0 var(--ink)}
.d-kiosk .ki-arcade .ki-ico{background:var(--cream)}
.d-kiosk .ki-arcade p{color:var(--ink);opacity:.82}
.d-kiosk .ki-buttons{padding-top:0;row-gap:clamp(18px,2vw,28px)}
.d-kiosk .ki-foot{--bg:var(--ink);position:relative;padding:clamp(80px,9vw,130px) 0 150px;background:var(--bg);color:#fffdf8}
.d-kiosk .ki-foot .ki-confetti{overflow:hidden}
.d-kiosk .ki-foot .ki-confetti i{border-color:#fffdf8}
.d-kiosk .ki-foot-name{position:relative;z-index:1;display:flex;flex-wrap:wrap;column-gap:.25em;font-family:var(--fat);font-size:min(12vw,150px,calc(150vw / var(--n,8)),calc(100cqi / (var(--lw,8) * .82)));font-weight:800;line-height:1;letter-spacing:-.04em}
.d-kiosk .ki-foot-name span{display:inline-flex}
.d-kiosk .ki-foot-name i{display:inline-block;font-style:normal;transform-origin:50% 100%;transition:color .3s}
.d-kiosk .ki-foot-name i:nth-child(4n+1){color:var(--pink)}
.d-kiosk .ki-foot-name i:nth-child(4n+2){color:var(--mint)}
.d-kiosk .ki-foot-name i:nth-child(4n+3){color:var(--sun)}
.d-kiosk .ki-foot-name i:nth-child(4n+4){color:#fffdf8}
.d-kiosk .ki-foot-name i:hover{animation:ki-jelly .8s var(--ease)}
.d-kiosk .ki-foot-grid{position:relative;z-index:1;display:grid;gap:32px;margin-top:clamp(44px,6vw,80px);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-kiosk .ki-foot-grid h3{display:inline-block;margin-bottom:14px;padding:5px 14px;border:2.5px solid #fffdf8;border-radius:999px;font-size:14px;color:var(--sun)}
.d-kiosk .ki-foot-grid a,.d-kiosk .ki-foot-grid span{display:block;padding:4px 0}
.d-kiosk .ki-foot-grid a{width:fit-content;text-decoration:underline wavy rgba(255,95,162,.7);text-underline-offset:6px;transition:color .2s}
.d-kiosk .ki-foot-grid a:hover{color:var(--pink)}
.d-kiosk .ki-foot-grid p{color:rgba(255,253,248,.82)}
.d-kiosk .ki-legal{position:relative;z-index:1;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;padding-top:22px;border-top:2.5px dashed rgba(255,253,248,.3);font-size:13px;color:rgba(255,253,248,.75)}
.d-kiosk .z-acc{border:0;display:grid;gap:12px}
.d-kiosk .z-acc details{border:var(--edge);border-radius:26px;background:var(--cream);transition:background-color .3s}
.d-kiosk .z-acc details[open]{background:var(--mint-l)}
.d-kiosk .z-acc summary{padding:18px 22px;font-family:var(--fat);font-size:clamp(16px,1.4vw,19px);font-weight:700;letter-spacing:-.01em}
.d-kiosk .z-acc summary i{display:grid;place-items:center;width:34px;height:34px;border:2.5px solid var(--ink);border-radius:50%;background:var(--sun)}
.d-kiosk .z-acc summary i::before,.d-kiosk .z-acc summary i::after{left:8px;width:12px;height:2.5px}
.d-kiosk .z-acc details>p{padding:0 22px 22px}
.d-kiosk .z-sec.z-cta{background-color:var(--sun);background-image:radial-gradient(circle,#ff5fa2 5px,transparent 6px),radial-gradient(circle,#6b3fa0 4px,transparent 5px),radial-gradient(circle,#6fdcbc 5px,transparent 6px);background-size:140px 120px,170px 150px,120px 160px;background-position:10px 20px,80px 70px,40px 100px}
.d-kiosk .z-cta .z-center{padding:clamp(34px,5vw,60px) clamp(20px,4vw,48px);border:var(--edge);border-radius:44px;background:var(--cream);box-shadow:0 0 0 8px #ffffff;width:min(calc(100% - 2 * var(--pad)),900px);margin-inline:auto}
.d-kiosk .z-cta h2{font-size:clamp(30px,4.4vw,60px)}
.d-kiosk .z-statement .z-center h2{font-family:var(--fat);font-weight:800;letter-spacing:-.03em}
.d-kiosk .z-statement .z-center h2 em{font-size:1.08em}
.d-kiosk .z-statement .ki-kick{transform:rotate(2deg)}
.d-kiosk .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(53,24,90,.05),rgba(53,24,90,.8))}
.d-kiosk .z-showcase h2{font-size:clamp(32px,4.6vw,64px)}
.d-kiosk .z-showcase h2 em{color:var(--sun)}
.d-kiosk .z-showcase .ki-line{background:var(--sun)}
.d-kiosk .z-card,.d-kiosk .z-panel,.d-kiosk .z-channel{border:var(--edge);border-radius:32px;background:var(--cream)}
.d-kiosk .z-pack.is-featured{background:var(--sun-l);transform:rotate(-1deg)}
.d-kiosk .z-tag{display:inline-block;justify-self:start;padding:4px 12px;border:2px solid var(--ink);border-radius:999px;background:var(--pink);color:var(--ink);font-weight:700;letter-spacing:.08em}
.d-kiosk .z-pack-price b{font-weight:800}
.d-kiosk .z-ticks li::before{width:12px;height:12px;top:.5em;border:2px solid var(--ink);border-radius:50%;background:var(--mint)}
.d-kiosk .z-team .z-pic{aspect-ratio:1;border:7px solid var(--cream);border-radius:50%;box-shadow:0 0 0 3px var(--ink)}
.d-kiosk .z-team li{justify-items:center;text-align:center}
.d-kiosk .z-team .ki-kick{transform:rotate(-2deg)}
.d-kiosk .z-quotes blockquote{position:relative;padding:28px;border:var(--edge);border-radius:30px;background:var(--cream)}
.d-kiosk .z-quotes blockquote::after{content:"";position:absolute;left:40px;bottom:-19px;width:30px;height:30px;border-right:var(--edge);border-bottom:var(--edge);background:var(--cream);transform:rotate(45deg) skew(10deg,10deg)}
.d-kiosk .z-quotes blockquote:nth-child(even){background:var(--mint-l)}
.d-kiosk .z-quotes blockquote:nth-child(even)::after{background:var(--mint-l)}
.d-kiosk .z-quotes blockquote>p{font-family:"Poppins",sans-serif;font-size:clamp(17px,1.4vw,20px);font-weight:500;line-height:1.5}
.d-kiosk .z-quotes-sec{padding-bottom:calc(var(--z-sec) + 20px)}
.d-kiosk .z-ba{border:var(--edge);border-radius:32px}
.d-kiosk .z-pic{border:var(--edge);border-radius:28px}
.d-kiosk .z-rows small,.d-kiosk .z-steps small{font-family:var(--fat);font-size:22px;font-weight:800;letter-spacing:0;color:var(--pink-d)}
.demo-js .d-kiosk [data-rv]{transform:translateY(34px) scale(.95);transition:opacity .6s var(--ease),transform .9s var(--bounce);transition-delay:calc(var(--i,0) * 90ms)}
.demo-js .d-kiosk [data-rv].in{transform:none}
.demo-js .d-kiosk .ki-kick[data-rv].in{transform:rotate(-2deg)}
.d-kiosk.no-photos .ki-hero-grid{padding-top:clamp(30px,4vw,60px)}
@keyframes ki-unroll{from{transform:scaleY(0)}to{transform:none}}
@keyframes ki-flap{0%{transform:scaleY(0)}55%{transform:scaleY(1.25)}75%{transform:scaleY(.9)}100%{transform:none}}
@keyframes ki-drop{0%{opacity:0;transform:translateY(-90%) scaleY(1.2)}50%{opacity:1;transform:translateY(5%) scale(1.1,.82)}72%{transform:translateY(-4%) scale(.96,1.06)}100%{opacity:1;transform:none}}
@keyframes ki-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes ki-pop{from{opacity:0;transform:scale(.3) rotate(-24deg)}}
@keyframes ki-in{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
@keyframes ki-scoop{to{clip-path:circle(150% at 50% 100%)}}
@keyframes ki-zoom{to{scale:1}}
@keyframes ki-spin{to{transform:rotate(360deg)}}
@keyframes ki-wave{to{transform:translateX(-50%)}}
@keyframes ki-drift{from{transform:translate(0,0) rotate(var(--r,0deg))}to{transform:translate(var(--dx,20px),var(--dy,-30px)) rotate(calc(var(--r,0deg) + 160deg))}}
@keyframes ki-wiggle{0%,100%{transform:none}20%{transform:rotate(-2.5deg) translateY(-4px)}45%{transform:rotate(2deg) translateY(-6px)}70%{transform:rotate(-1deg) translateY(-3px)}}
@keyframes ki-morph{0%{border-radius:58% 42% 52% 48%/48% 58% 42% 52%}100%{border-radius:44% 56% 46% 54%/56% 44% 58% 42%}}
@keyframes ki-swing{0%{transform:rotate(9deg)}25%{transform:rotate(-6deg)}45%{transform:rotate(3.5deg)}65%{transform:rotate(-1.6deg)}82%{transform:rotate(.6deg)}100%{transform:none}}
@keyframes ki-nudge{0%,100%{transform:none}25%{transform:rotate(-3deg)}55%{transform:rotate(1.8deg)}80%{transform:rotate(-.6deg)}}
@keyframes ki-jelly{0%,100%{transform:none}30%{transform:scale(1.25,.75)}50%{transform:scale(.85,1.2) translateY(-12%)}70%{transform:scale(1.08,.94)}}
@media (prefers-reduced-motion:reduce){.d-kiosk .ki-word,.d-kiosk .ki-up,.d-kiosk .ki-awning,.d-kiosk .ki-awning::after,.d-kiosk .ki-stk,.d-kiosk .ki-seal,.d-kiosk .ki-arch,.d-kiosk .ki-blobs b,.d-kiosk .ki-hero-top .ki-kick{animation:none;opacity:1;transform:none}.d-kiosk .ki-stk{transform:rotate(var(--r,0deg))}.d-kiosk .ki-arch-in{animation:none;clip-path:none}.d-kiosk .ki-arch img{animation:none;scale:1}.d-kiosk .ki-sunburst,.d-kiosk .ki-confetti i,.d-kiosk .ki-ribbon svg,.d-kiosk .ki-blob,.d-kiosk .ki-seal .ki-ring{animation:none}.d-kiosk .ki-sign-wrap.in .ki-sign{animation:none}.d-kiosk .ki-path li::before{transform:none!important}}
`
  .replace(/\n/g, "")
  .trim();

/** The ribbons' text is fitted to the exact length of their wave. */
const JS = `(function(){var d=document;function fit(){[].slice.call(d.querySelectorAll('.ki-ribbon textPath')).forEach(function(tp){var p=d.getElementById((tp.getAttribute('href')||'').slice(1)),t=tp.parentNode;if(!p||!p.getTotalLength||!t.getComputedTextLength)return;var L=Math.floor(p.getTotalLength()-4);t.style.fontSize='';tp.removeAttribute('textLength');var n=t.getComputedTextLength();if(n>L){var f=parseFloat(getComputedStyle(t).fontSize);t.style.fontSize=(f*L/n*0.97).toFixed(2)+'px'}tp.setAttribute('textLength',String(L))})}fit();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(fit)})();`;

const plain = (s: string) => s.replace(/\*/g, "");
const longest = (s: string) => Math.max(5, ...plain(s).split(/\s+/).map((w) => w.length));

/** Points of a starburst sticker, as a clip-path polygon. */
const BURST = (() => {
  const n = 14;
  const pts: string[] = [];
  for (let k = 0; k < n * 2; k++) {
    const a = (Math.PI * k) / n - Math.PI / 2;
    const r = k % 2 ? 41 : 50;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(1)}% ${(50 + r * Math.sin(a)).toFixed(1)}%`);
  }
  return `polygon(${pts.join(",")})`;
})();

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

/** Confetti that drifts slowly: decoration only, in the design's own colours. */
const BITS: { k: string; x: string; y: string; s: number; c: string; t: number; d: number; r: number; dx: number; dy: number }[] = [
  { k: "c-dot", x: "4%", y: "18%", s: 18, c: "var(--pink)", t: 14, d: 0, r: 0, dx: 24, dy: -30 },
  { k: "c-spr", x: "46%", y: "8%", s: 34, c: "var(--mint)", t: 18, d: -4, r: 30, dx: -20, dy: 26 },
  { k: "c-star", x: "88%", y: "14%", s: 30, c: "var(--sun)", t: 22, d: -8, r: 10, dx: -26, dy: 30 },
  { k: "c-ring", x: "92%", y: "70%", s: 34, c: "var(--grape)", t: 16, d: -2, r: 0, dx: -18, dy: -34 },
  { k: "c-tri", x: "40%", y: "88%", s: 26, c: "var(--pink)", t: 20, d: -6, r: -20, dx: 30, dy: -18 },
  { k: "c-sq", x: "2%", y: "94%", s: 20, c: "var(--sun)", t: 17, d: -10, r: 20, dx: 22, dy: -26 },
  { k: "c-spr", x: "70%", y: "92%", s: 30, c: "var(--grape)", t: 19, d: -3, r: -40, dx: -24, dy: -22 },
  { k: "c-dot", x: "60%", y: "4%", s: 12, c: "var(--grape)", t: 15, d: -7, r: 0, dx: 18, dy: 24 },
  { k: "c-star", x: "50%", y: "64%", s: 22, c: "var(--mint)", t: 24, d: -12, r: -15, dx: 20, dy: 20 },
  { k: "c-ring", x: "30%", y: "6%", s: 24, c: "var(--pink)", t: 21, d: -9, r: 0, dx: -16, dy: 28 },
];

function Confetti({ from = 0, count = 10 }: { from?: number; count?: number }) {
  const list = [...BITS.slice(from), ...BITS.slice(0, from)].slice(0, count);
  return (
    <div className="ki-confetti" aria-hidden="true" data-px>
      {list.map((b, n) => (
        <i key={n} className={b.k} style={css({ "--x": b.x, "--y": b.y, "--s": `${b.s}px`, "--c": b.c, "--t": `${b.t}s`, "--d": `${b.d}s`, "--r": `${b.r}deg`, "--dx": `${b.dx}px`, "--dy": `${b.dy}px` })} />
      ))}
    </div>
  );
}

/**
 * A ribbon that waves across the page with what the shop sells running along it. The wave is
 * periodic, the text is set twice along it, and the whole strip slides by exactly one half.
 */
function Ribbon({ id, words, band, ink, back }: { id: string; words: string[]; band: string; ink: string; back?: boolean }) {
  const parts: string[] = [];
  let k = 0;
  while (parts.join(" • ").length < 116) parts.push(words[k++ % words.length]);
  const half = `${parts.join(" • ")} • `;
  const d = `M0 60 Q60 30 120 60${Array.from({ length: 39 }, (_, n) => ` T${240 + n * 120} 60`).join("")}`;
  return (
    <div className={`ki-ribbon${back ? " is-back" : " is-front"}`}>
      <svg viewBox="0 0 4800 120" preserveAspectRatio="none">
        <defs>
          <path id={id} d={d} />
        </defs>
        <path d={d} fill="none" stroke="#35185a" strokeWidth="76" />
        <path d={d} fill="none" stroke={band} strokeWidth="64" />
        <text fill={ink} dy="10">
          <textPath href={`#${id}`} textLength="4989" lengthAdjust="spacing">
            {half + half}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

function Ribbons({ c }: { c: Ctx }) {
  const list = offerWords(c);
  if (list.length < 3) return null;
  return (
    <div className="ki-ribbons" aria-hidden="true">
      <Ribbon id="ki-wave-a" words={[...list].reverse()} band="#ff5fa2" ink="#35185a" back />
      <Ribbon id="ki-wave-b" words={list} band="#ffd23f" ink="#35185a" />
    </div>
  );
}

function Head({ kicker, title, intro, id, center }: { kicker?: string; title: string; intro?: string; id?: string; center?: boolean }) {
  return (
    <header className={`ki-head${center ? " is-center" : ""}`}>
      {kicker ? (
        <p className="ki-kick" data-rv>
          {kicker}
        </p>
      ) : null}
      <h2 id={id} className={long(title)} style={css({ "--lw": longest(title) })} data-rv>
        {em(title)}
      </h2>
      {intro ? (
        <p className="ki-intro" data-rv>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

/** The headline, word by word: each one drops in and lands with a little squash. */
function Drop({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const marked = /\*[^*]+\*/.test(text);
  const all = plain(text).split(/\s+/).filter(Boolean);
  let k = 0;
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w, m) => {
        if (out.length) out.push(" ");
        const last = !marked && k === all.length - 1 && all.length > 2;
        const style = i(k++);
        out.push(
          n % 2 ? (
            <em key={`${n}-${m}`} className="ki-word" style={style}>
              {w}
            </em>
          ) : (
            <span key={`${n}-${m}`} className={`ki-word${last ? " is-pop" : ""}`} style={style}>
              {w}
            </span>
          ),
        );
      }),
  );
  return <>{out}</>;
}

const FACT_ICON = (c: Ctx, label: string) => (label === c.t.address ? "map" : label === c.t.hours ? "clock" : "phone");

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="ki-hdr hdr">
        <div className="ki-bar">
          <a href="#top" className="ki-logo" aria-label={c.name}>
            <i aria-hidden="true">{c.name.charAt(0)}</i>
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="ki-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn ki-fill ki-cta">
            {cta.label}
          </a>
          <button type="button" className="ki-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <i aria-hidden="true" />
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
          </button>
        </div>
      </header>
      <div id="site-menu" className="ki-drawer" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <b>{k + 1}</b>
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
  const text = plain(hero.headline);
  const size = text.length > 44 ? "is-s" : text.length > 22 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const offer = offerWords(c, 4);
  const seal = hero.note || offer[0];
  const word = hero.note ? offer[0] : offer[1];
  return (
    <>
      <section className="ki-hero">
        <div className="ki-awning" aria-hidden="true" />
        <Confetti />
        <div className="ki-wrap ki-hero-grid">
          <div className="ki-hero-copy">
            <div className="ki-hero-top">
              {hero.eyebrow ? <p className="ki-kick">{hero.eyebrow}</p> : null}
            </div>
            <h1 className={size} aria-label={text} style={css({ "--lw": longest(text) })}>
              <span aria-hidden="true">
                <Drop text={hero.headline} />
              </span>
            </h1>
            <p className="ki-lede ki-up" style={i(0)}>
              {hero.subheadline}
            </p>
            <div className="ki-cta-row ki-up" style={i(1)}>
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
              <dl className="ki-facts ki-up" style={i(2)}>
                {facts.map((f) => (
                  <div key={f.label}>
                    <span aria-hidden="true">
                      <Icon name={FACT_ICON(c, f.label)} />
                    </span>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <div className="ki-art">
            <span className="ki-sunburst" aria-hidden="true" />
            {p ? (
              <figure className="ki-arch">
                <div className="ki-arch-in" data-px>
                  <Pic p={p} eager sizes="(min-width: 960px) 36vw, 80vw" />
                </div>
              </figure>
            ) : (
              <div className="ki-blobs" aria-hidden="true">
                <b style={i(0)}>{c.name.charAt(0)}</b>
                <b style={i(1)} />
                <b style={i(2)} />
                <b style={i(3)} />
              </div>
            )}
            {seal ? (
              <p className="ki-seal" aria-hidden="true" style={{ ["--burst" as string]: BURST, ["--fs" as string]: `${Math.min(19, Math.floor(96 / (longest(seal) * 0.56)))}px` } as CSSProperties}>
                <span className="ki-ring" />
                <b>{seal}</b>
              </p>
            ) : null}
            <NowBadge c={c} className="ki-stk is-now" />
            {word ? (
              <span className="ki-stk is-word" style={i(1)} aria-hidden="true">
                {word}
              </span>
            ) : null}
          </div>
        </div>
      </section>
      <Ribbons c={c} />
    </>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  return (
    <footer className="ki-foot ki-edge">
      <Confetti from={3} count={7} />
      <div className="ki-wrap">
        <p className="ki-foot-name" aria-hidden="true" style={css({ "--n": Math.max(6, c.name.length), "--lw": longest(c.name) })}>
          {c.name.split(" ").map((w, n) => (
            <span key={n}>
              {[...w].map((ch, m) => (
                <i key={m}>{ch}</i>
              ))}
            </span>
          ))}
        </p>
        <div className="ki-foot-grid">
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
          {c.spec.footer.blurb ? (
            <div>
              <h3>{c.name}</h3>
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
        </div>
        <Legal c={c} className="ki-legal" />
      </div>
    </footer>
  );
}

/** A colour for each section that has its own background, so the page reads as a row of shop fronts. */
const TONE: Record<string, string> = { about: "is-mint", services: "is-cream", menu: "is-pink", features: "is-sun", process: "is-lilac", gallery: "is-grape", hours: "is-pink", contact: "is-grape", booking: "is-mint", order: "is-cream" };

export const kiosk: Family = {
  key: "kiosk",
  root: "d-kiosk",
  fonts: ["Unbounded", "Poppins", "Permanent Marker"],
  themeColor: "#fff6ea",
  accent: "#ff5fa2",
  onAccent: "#35185a",
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "ki-wrap", eyebrow: "ki-kick", btn: "ki-fill", btnAlt: "ki-line", btnText: "ki-text" },
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
        <section className={`ki-sec ki-edge ${TONE.about}`} id={s.id}>
          <div className={`ki-wrap ki-about${p ? "" : " is-solo"}`}>
            {p ? (
              <div className="ki-about-pic" data-rv>
                <figure className="ki-blob" data-px>
                  <Pic p={p} sizes="(min-width: 900px) 40vw, 92vw" />
                </figure>
                {small ? (
                  <figure className="ki-dot">
                    <Pic p={small} sizes="220px" />
                  </figure>
                ) : null}
              </div>
            ) : null}
            <div className="ki-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="ki-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="ki-chips" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>
                      <Icon name="heart" />
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
    services: (s, c) => (
      <section className={`ki-sec ki-edge ${TONE.services}`} id={s.id}>
        <div className="ki-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
          <ul className="ki-flavours">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 4)}>
                <div className="ki-flavour">
                  <span className="ki-scoop" aria-hidden="true">
                    {n + 1}
                  </span>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                  {it.duration || it.price ? (
                    <p className="ki-meta">
                      {it.duration ? <span>{it.duration}</span> : null}
                      {it.price ? <b className="ki-price">{it.price}</b> : null}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      const tab = (n: number) => `${s.id}-tab-${n}`;
      return (
        <section className={`ki-sec ki-edge ${TONE.menu}`} id={s.id}>
          <Confetti from={5} count={5} />
          <div className="ki-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            {cats.length > 1 ? (
              <div className="ki-tabs" role="tablist" aria-label={plain(s.title)} data-rv>
                {cats.map((cat, n) => (
                  <button key={n} type="button" role="tab" id={tab(n)} aria-selected={n === 0} aria-controls={`${s.id}-panel-${n}`} tabIndex={n === 0 ? 0 : -1}>
                    {cat.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="ki-kick" style={{ marginBottom: 26 }}>
                {cats[0].name}
              </p>
            )}
            {cats.map((cat, n) => (
              <div key={n} id={`${s.id}-panel-${n}`} className="ki-treats" role={cats.length > 1 ? "tabpanel" : undefined} aria-labelledby={cats.length > 1 ? tab(n) : undefined} hidden={n > 0}>
                {cat.items.map((d, m) => (
                  <div key={m} className="ki-treat" style={i(m)}>
                    <i aria-hidden="true" />
                    <h3>{d.name}</h3>
                    {d.description ? <p>{d.description}</p> : null}
                    {d.tags?.length ? (
                      <p className="ki-tags">
                        {d.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </p>
                    ) : null}
                    {d.price ? <b className="ki-price">{d.price}</b> : null}
                  </div>
                ))}
              </div>
            ))}
            {s.note ? (
              <p className="ki-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className={`ki-sec ki-edge ${TONE.features}`} id={s.id}>
        <div className="ki-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} center />
          <ul className="ki-badges">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <div className="ki-badge">
                  <span className="ki-ico">
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
    process: (s, c) => (
      <section className={`ki-sec ki-edge ${TONE.process}`} id={s.id}>
        <div className="ki-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <ol className="ki-path">
            {s.steps.map((st, n) => (
              <li key={n} data-rv style={i(n % 4)}>
                <span className="ki-num" aria-hidden="true">
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
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className={`ki-sec ki-edge ${TONE.gallery}`} id={s.id}>
          <Confetti from={2} count={6} />
          <div className="ki-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} center />
            <div className="ki-shapes">
              {pics.slice(0, 6).map((p, n) => (
                <figure key={n} className="ki-shape" data-rv style={i(n % 3)}>
                  <Pic p={p} sizes="(min-width: 900px) 30vw, 46vw" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className={`ki-sec ki-edge ${TONE.hours}`} id={s.id}>
        <div className="ki-wrap ki-visit">
          <div className="ki-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="ki-sign-wrap" data-rv>
            <svg className="ki-strings" viewBox="0 0 100 62" preserveAspectRatio="none" aria-hidden="true">
              <path d="M22 62 L50 6 L78 62" />
            </svg>
            <div className="ki-sign">
              <div className="ki-sign-h">
                <h3>{c.t.hours}</h3>
                <NowBadge c={c} className="ki-now" />
              </div>
              {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
            </div>
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => {
      const b = c.spec.business;
      const tiles = [
        b.phone ? { icon: "phone" as const, label: c.t.phone, value: b.phone, href: tel(b.phone) } : null,
        b.email ? { icon: "chat" as const, label: c.t.email, value: b.email, href: `mailto:${b.email}` } : null,
        b.address ? { icon: "map" as const, label: c.t.address, value: b.address, href: b.mapsUrl ?? undefined } : null,
      ].filter((x): x is NonNullable<typeof x> => Boolean(x));
      const hours = !c.spec.sections.some((x) => x.type === "hours" || x.type === "booking");
      return (
        <section className={`ki-sec ki-edge ${TONE.contact}`} id={s.id}>
          <div className={`ki-wrap ki-contact${s.showForm ? " has-form" : ""}`}>
            <div className="ki-visit-copy">
              <Head kicker={c.t.kick.contact} title={s.title} intro={s.body || undefined} />
              {tiles.length ? (
                <ul className="ki-tiles">
                  {tiles.map((x, n) => (
                    <li key={x.label} data-rv style={i(n)}>
                      {x.href ? (
                        <a className="ki-tile" href={x.href} {...(/^https?:/.test(x.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                          <span className="ki-ico">
                            <Icon name={x.icon} />
                          </span>
                          <small>{x.label}</small>
                          <b>{x.value}</b>
                        </a>
                      ) : (
                        <div className="ki-tile">
                          <span className="ki-ico">
                            <Icon name={x.icon} />
                          </span>
                          <small>{x.label}</small>
                          <b>{x.value}</b>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
              {hours ? <Hours c={c} /> : null}
            </div>
            {s.showForm ? (
              <div className="ki-form" data-rv>
                <p className="ki-form-tag" aria-hidden="true">
                  {c.t.message}
                </p>
                <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
              </div>
            ) : null}
          </div>
        </section>
      );
    },
    booking: (s, c) => (
      <section className={`ki-sec ki-edge ${TONE.booking}`} id={s.id}>
        <div className="ki-wrap ki-visit">
          <div className="ki-visit-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Hours c={c} />
            <Reach c={c} />
          </div>
          <div className="ki-form" data-rv>
            <p className="ki-form-tag" aria-hidden="true">
              {c.t.submit[s.kind]}
            </p>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
          </div>
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className={`ki-sec ki-edge ${TONE.order}`} id={s.id}>
        <div className="ki-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} />
          <ul className="ki-flavours ki-buttons">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} className="ki-arcade" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="ki-ico">
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
