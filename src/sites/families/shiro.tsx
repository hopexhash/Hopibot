import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Shiro: an original template (no portfolio demo). Japanese minimalism: washi paper, sumi ink
 * and a single vermilion accent that is only ever used as a hanko seal carrying the first
 * letter of the business. Plenty of empty paper, vertical section labels, brush strokes that
 * paint themselves, photographs in tall hanging-scroll frames, a menu set in quiet columns,
 * a folding-screen gallery, noren curtains for ordering and an ensō around today's opening
 * state. The headline seeps onto the paper letter by letter, like ink. Made for sushi bars,
 * ramen shops, Asian kitchens, tea houses and other calm, precise places.
 */

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .3 0 0 0 0 .26 0 0 0 0 .2 0 0 0 .11 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E\")";
const WORN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.6 2.15'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const CSS = `
.d-shiro{--washi:#f4efe6;--washi2:#ebe4d6;--kinari:#faf7f0;--sumi:#1c1b18;--sumi2:#3b3934;--dim:#6b655b;--mist:#a39c90;--line:rgba(28,27,24,.15);--line2:rgba(28,27,24,.08);--shu:#c73a22;--shu-d:#a42e19;--pad:clamp(20px,6vw,96px);--ease:cubic-bezier(.19,.7,.16,1);--slow:cubic-bezier(.62,.04,.2,1);--serif:"Cormorant",Georgia,serif;--sans:"Inter Tight",system-ui,sans-serif;--z-bg2:var(--kinari);--z-ink:var(--sumi);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--sumi);--z-on-accent:var(--washi);--z-display:var(--serif);--z-display-weight:300;--z-radius:0px;--z-sec:clamp(96px,13vw,190px);--z-h3:clamp(23px,1.9vw,29px);--z-field-radius:0px;--z-ico-radius:50%;--z-statement:clamp(32px,4.2vw,64px);background:var(--washi) ${NOISE};color:var(--sumi);font-family:var(--sans);font-weight:350;font-size:clamp(15.5px,1vw,17px);line-height:1.8;letter-spacing:.005em}
.d-shiro h1,.d-shiro h2,.d-shiro h3{font-family:var(--serif);font-weight:300;line-height:1.04;letter-spacing:-.012em}
.d-shiro h1 em,.d-shiro h2 em{font-style:italic;font-weight:300;color:var(--sumi2)}
.d-shiro h2{font-size:clamp(40px,5.4vw,84px)}
.d-shiro h2.is-long{font-size:clamp(32px,3.8vw,58px);line-height:1.08}
.d-shiro h3{font-weight:400}
.d-shiro ::selection{background:var(--sumi);color:var(--washi)}
.d-shiro .sh-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.d-shiro .sh-wrap{position:relative;width:min(100%,1300px);margin-inline:auto;padding-inline:var(--pad)}
.d-shiro .sh-eyebrow{font-size:11.5px;font-weight:450;letter-spacing:.32em;text-transform:uppercase;color:var(--dim)}
.d-shiro .sh-kick{position:relative;display:flex;align-items:center;gap:14px;writing-mode:vertical-rl;font-size:11.5px;font-weight:450;line-height:1;letter-spacing:.34em;text-transform:uppercase;color:var(--dim);white-space:nowrap}
.d-shiro .sh-kick::after{content:"";width:1px;height:56px;background:currentColor;opacity:.6;transform-origin:top;transition:transform 1.4s var(--ease) .3s}
.demo-js .d-shiro .sh-kick[data-rv]{opacity:0;transform:translateY(-14px);transition:opacity 1.2s var(--ease),transform 1.2s var(--ease)}
.demo-js .d-shiro .sh-kick[data-rv].in{opacity:1;transform:none}
.demo-js .d-shiro .sh-kick[data-rv]:not(.in)::after{transform:scaleY(0)}
.d-shiro .sh-hanko{--hs:44px;position:relative;display:inline-grid;flex:none;place-items:center;width:var(--hs);height:var(--hs);border-radius:3px 5px 4px 6px;background:var(--shu);color:var(--kinari);font-family:var(--serif);font-size:calc(var(--hs) * .6);font-weight:600;font-style:normal;line-height:1;text-transform:uppercase;transform:rotate(-3deg);-webkit-mask-image:${WORN};mask-image:${WORN};-webkit-mask-size:180px;mask-size:180px}
.d-shiro .sh-hanko::before{content:"";position:absolute;inset:calc(var(--hs) * .09);border:max(1px,calc(var(--hs) * .035)) solid var(--kinari);border-radius:2px}
.d-shiro .sh-hanko b{position:relative;font-weight:600;transform:translateY(-3%)}
.d-shiro .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:16px;min-height:54px;padding:0 30px;font-size:12.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;transition:background-color .5s var(--ease),color .5s var(--ease),letter-spacing .6s var(--ease)}
.d-shiro .sh-fill{background:var(--sumi);color:var(--washi)}
.d-shiro .sh-fill::after{content:"";flex:none;width:7px;height:7px;background:var(--shu);transition:transform .7s var(--ease)}
.d-shiro .sh-fill:hover{background:var(--sumi2);letter-spacing:.24em}
.d-shiro .sh-fill:hover::after{transform:rotate(45deg) scale(1.25)}
.d-shiro .sh-line{color:var(--sumi);background:linear-gradient(currentColor,currentColor) 0 0/14px 1px,linear-gradient(currentColor,currentColor) 0 0/1px 14px,linear-gradient(currentColor,currentColor) 100% 0/14px 1px,linear-gradient(currentColor,currentColor) 100% 0/1px 14px,linear-gradient(currentColor,currentColor) 0 100%/14px 1px,linear-gradient(currentColor,currentColor) 0 100%/1px 14px,linear-gradient(currentColor,currentColor) 100% 100%/14px 1px,linear-gradient(currentColor,currentColor) 100% 100%/1px 14px;background-repeat:no-repeat;transition:background-size .7s var(--ease),background-color .5s}
.d-shiro .sh-line:hover{background-size:51% 1px,1px 51%,51% 1px,1px 51%,51% 1px,1px 51%,51% 1px,1px 51%;background-color:rgba(28,27,24,.04)}
.d-shiro .sh-text{position:relative;display:inline-flex;align-items:center;gap:12px;min-height:44px;font-size:12.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
.d-shiro .sh-text::before{content:"";width:28px;height:1px;background:currentColor;transition:width .7s var(--ease)}
.d-shiro .sh-text:hover::before{width:52px}
.d-shiro .sh-hdr{position:sticky;top:0;z-index:40;transition:background-color .6s,box-shadow .6s}
.d-shiro.is-scrolled .sh-hdr{background:rgba(244,239,230,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 1px 0 var(--line2)}
.d-shiro .sh-bar{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:24px;height:88px;transition:height .6s var(--ease)}
.d-shiro.is-scrolled .sh-bar{height:70px}
.d-shiro .sh-logo{display:flex;align-items:center;gap:16px;min-width:0;min-height:44px}
.d-shiro .sh-logo .sh-hanko{--hs:38px;transition:transform .8s var(--ease)}
.d-shiro .sh-logo:hover .sh-hanko{transform:rotate(3deg) scale(1.06)}
.d-shiro .sh-logo span{overflow:hidden;font-family:var(--serif);font-size:clamp(20px,1.7vw,25px);font-weight:400;letter-spacing:.14em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}
.d-shiro .sh-links{display:none;gap:clamp(18px,2.4vw,40px)}
.d-shiro .sh-links a{position:relative;display:inline-flex;align-items:center;min-height:44px;white-space:nowrap;font-size:12px;font-weight:450;letter-spacing:.22em;text-transform:uppercase;color:var(--sumi2)}
.d-shiro .sh-links a::after{content:"";position:absolute;left:50%;right:50%;bottom:9px;height:1px;background:currentColor;transition:left .6s var(--ease),right .6s var(--ease)}
.d-shiro .sh-links a:hover::after{left:0;right:0}
.d-shiro .sh-cta{display:none;min-height:46px;padding:0 22px}
.d-shiro .sh-burger{position:relative;z-index:42;display:flex;align-items:center;gap:14px;min-height:48px;padding:0 4px 0 12px;border:0;background:none;font-size:12px;font-weight:500;letter-spacing:.24em;text-transform:uppercase}
.d-shiro .sh-burger i{position:relative;display:block;width:30px;height:9px}
.d-shiro .sh-burger i::before,.d-shiro .sh-burger i::after{content:"";position:absolute;right:0;height:1px;background:currentColor;transition:transform .6s var(--ease),width .6s var(--ease),top .6s var(--ease)}
.d-shiro .sh-burger i::before{top:0;width:30px}
.d-shiro .sh-burger i::after{top:8px;width:18px}
.d-shiro.menu-open .sh-burger i::before{top:4px;transform:rotate(18deg)}
.d-shiro.menu-open .sh-burger i::after{top:4px;width:30px;transform:rotate(-18deg)}
@media (min-width:1040px){.d-shiro .sh-bar{grid-template-columns:auto minmax(0,1fr) auto}.d-shiro .sh-links{display:flex;justify-content:center}.d-shiro .sh-cta{display:inline-flex}.d-shiro .sh-burger{display:none}}
.d-shiro .sh-menu{position:fixed;inset:0;z-index:39;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:24px;padding:120px var(--pad) 100px;overflow-y:auto;visibility:hidden;transition:visibility 0s 1s}
.d-shiro .sh-menu::before,.d-shiro .sh-menu::after{content:"";position:fixed;top:0;bottom:0;z-index:-1;width:50.5%;background:linear-gradient(90deg,transparent calc(100% - 1px),rgba(28,27,24,.08) 0) 0 0/33.4% 100%,linear-gradient(transparent calc(100% - 1px),rgba(28,27,24,.08) 0) 0 0/100% 96px,var(--kinari);transition:transform .9s var(--slow)}
.d-shiro .sh-menu::before{left:0;transform:translateX(-101%);box-shadow:inset -1px 0 0 var(--line)}
.d-shiro .sh-menu::after{right:0;transform:translateX(101%)}
.d-shiro .sh-menu.is-open{visibility:visible;transition:visibility 0s}
.d-shiro .sh-menu.is-open::before,.d-shiro .sh-menu.is-open::after{transform:none}
.d-shiro .sh-menu nav{display:grid;gap:4px}
.d-shiro .sh-menu nav a{display:flex;align-items:baseline;gap:18px;min-height:56px;font-family:var(--serif);font-size:clamp(36px,9vw,60px);font-weight:300;line-height:1.15;opacity:0;transform:translateY(18px);transition:opacity .6s var(--ease),transform .9s var(--ease)}
.d-shiro .sh-menu nav a small{font-family:var(--sans);font-size:11px;letter-spacing:.2em;color:var(--dim)}
.d-shiro .sh-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.55s + var(--i,0) * 80ms)}
.d-shiro .sh-menu nav a:hover{font-style:italic}
.d-shiro .sh-menu-side{display:flex;flex-direction:column;align-items:center;gap:18px;opacity:0;transition:opacity .8s .8s}
.d-shiro .sh-menu.is-open .sh-menu-side{opacity:1}
.d-shiro .sh-menu-side p{writing-mode:vertical-rl;font-family:var(--serif);font-size:22px;letter-spacing:.2em;color:var(--dim)}
.d-shiro .sh-menu-reach{grid-column:1/-1;display:grid;gap:2px;font-size:14px;color:var(--dim);opacity:0;transition:opacity .8s .9s}
.d-shiro .sh-menu.is-open .sh-menu-reach{opacity:1}
.d-shiro .sh-menu-reach a{display:inline-flex;align-items:center;min-height:40px;color:var(--sumi)}
.d-shiro.menu-open .sh-hdr{background:transparent;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-shiro.menu-open .sh-logo{position:relative;z-index:42}
.d-shiro .sh-hero{position:relative;padding:clamp(28px,5vw,72px) 0 clamp(96px,12vw,170px);overflow:hidden}
.d-shiro .sh-mist{position:absolute;left:-10%;top:4%;width:70%;height:80%;border-radius:50%;background:radial-gradient(closest-side,rgba(59,57,52,.09),rgba(59,57,52,.04) 55%,transparent);filter:blur(30px);transform:translate3d(calc(var(--p,0) * 40px),calc(var(--p,0) * -60px),0);pointer-events:none;animation:sh-fade 3s ease .2s both}
.d-shiro .sh-hero-grid{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);gap:clamp(40px,6vw,96px) clamp(16px,3vw,56px);align-items:start}
.d-shiro .sh-hero-grid>.sh-kick{grid-row:1;padding-top:10px;animation:sh-down 1.4s var(--ease) .1s both}
.d-shiro .sh-hero-grid>.sh-kick::after{height:110px;animation:sh-grow 1.6s var(--ease) .5s both}
.d-shiro .sh-hero-copy{display:grid;gap:clamp(22px,2.4vw,32px);align-content:start;min-width:0}
.d-shiro .sh-art{grid-column:1/-1}
@media (min-width:1000px){.d-shiro .sh-hero-grid{grid-template-columns:auto minmax(0,1.12fr) minmax(0,.88fr);align-items:center}.d-shiro .sh-art{grid-column:auto}}
.d-shiro .sh-now{display:inline-flex;align-items:center;gap:12px;font-size:11.5px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--sumi2)}
.d-shiro .sh-now::before{content:"";width:8px;height:8px;border:1px solid var(--dim)}
.d-shiro .sh-now.is-open::before{border-color:var(--shu);background:var(--shu)}
.d-shiro .sh-hero-copy .sh-now{justify-self:start;animation:sh-fade 1.4s ease 2.1s both}
.d-shiro .sh-hero h1{font-size:clamp(50px,7.6vw,128px);line-height:.98}
.d-shiro .sh-hero h1.is-m{font-size:clamp(44px,6vw,98px);line-height:1.02}
.d-shiro .sh-hero h1.is-s{font-size:clamp(36px,4.6vw,74px);line-height:1.06}
.d-shiro .sh-wd{display:inline-block;white-space:nowrap}
.d-shiro .sh-ch{display:inline-block;-webkit-mask-image:linear-gradient(180deg,#000 42%,transparent 58%);mask-image:linear-gradient(180deg,#000 42%,transparent 58%);-webkit-mask-size:100% 240%;mask-size:100% 240%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;animation:sh-ink 1.9s var(--ease) both;animation-delay:calc(.4s + var(--i,0) * 42ms)}
.d-shiro .sh-wd.is-em .sh-ch{font-style:italic;color:var(--sumi2)}
.d-shiro .sh-brush{display:block;width:min(100%,420px);height:22px;color:var(--sumi);overflow:visible}
.d-shiro .sh-brush path{fill:currentColor;filter:url(#sh-rough)}
.d-shiro .sh-brush path+path{opacity:.5}
.d-shiro .sh-defs{position:absolute;width:0;height:0;overflow:hidden}
.d-shiro .sh-hero .sh-brush{width:min(78%,440px);clip-path:inset(0 100% 0 0);animation:sh-paint 1.5s var(--slow) 1.5s forwards}
.demo-js .d-shiro .sh-brush[data-rv]{opacity:1;transform:none;clip-path:inset(0 100% 0 0);transition:clip-path 1.6s var(--slow) .25s}
.demo-js .d-shiro .sh-brush[data-rv].in{clip-path:inset(0 -2% 0 0)}
.d-shiro .sh-lede{max-width:44ch;font-size:clamp(16.5px,1.2vw,19px);color:var(--sumi2);animation:sh-rise 1.4s var(--ease) 1.7s both}
.d-shiro .sh-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px 26px;animation:sh-rise 1.4s var(--ease) 1.9s both}
.d-shiro .sh-facts{display:grid;gap:0;margin-top:clamp(8px,2vw,24px);border-top:1px solid var(--line)}
.d-shiro .sh-facts div{display:grid;grid-template-columns:minmax(0,1fr);gap:2px;padding:14px 0;border-bottom:1px solid var(--line2);animation:sh-rise 1.2s var(--ease) both;animation-delay:calc(2.1s + var(--i,0) * 120ms)}
.d-shiro .sh-facts dt{font-size:10.5px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--dim)}
.d-shiro .sh-facts dd{margin:0;font-family:var(--serif);font-size:clamp(18px,1.4vw,21px);font-weight:400;line-height:1.35;font-variant-numeric:lining-nums}
.d-shiro .sh-facts a{border-bottom:1px solid var(--line);transition:border-color .4s}
.d-shiro .sh-facts a:hover{border-color:var(--sumi)}
@media (min-width:700px){.d-shiro .sh-facts{grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:28px;border-top:0}.d-shiro .sh-facts div{grid-template-columns:1fr;gap:8px;padding:18px 0 0;border-top:1px solid var(--line);border-bottom:0}}
.d-shiro .sh-art{position:relative;display:grid;justify-items:end;padding:28px 0 0 24%}
.d-shiro .sh-scroll{position:relative;width:min(100%,420px);aspect-ratio:3/5}
.d-shiro .sh-cord{position:absolute;left:18%;right:18%;bottom:100%;width:64%;height:30px;margin-bottom:6px;color:var(--sumi2);overflow:visible;animation:sh-fade 1s ease .3s both}
.d-shiro .sh-cord path{fill:none;stroke:currentColor;stroke-width:1}
.d-shiro .sh-rod{position:absolute;left:-12px;right:-12px;z-index:2;height:9px;border-radius:5px;background:linear-gradient(180deg,#4a4740,var(--sumi) 60%);box-shadow:0 3px 8px -4px rgba(28,27,24,.6)}
.d-shiro .sh-rod.is-top{top:-5px;animation:sh-fade .8s ease .25s both}
.d-shiro .sh-rod.is-low{top:-5px;animation:sh-roll 2s var(--slow) .55s forwards}
.d-shiro .sh-scroll figure{position:absolute;inset:0;overflow:hidden;background:var(--washi2);box-shadow:0 30px 60px -40px rgba(28,27,24,.55);clip-path:inset(0 0 100% 0);animation:sh-unroll 2s var(--slow) .55s forwards}
.d-shiro .sh-scroll img{width:100%;height:100%;object-fit:cover;scale:1.14;animation:sh-settle 3.2s var(--ease) .6s forwards}
.d-shiro .sh-scroll.is-empty figure{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:clamp(18px,2vw,28px);padding:14% 0 10%;background:radial-gradient(90% 26% at 50% 104%,rgba(28,27,24,.2),transparent 70%),radial-gradient(70% 40% at 80% 0,rgba(59,57,52,.07),transparent 70%),var(--kinari) ${NOISE};box-shadow:inset 0 0 0 10px var(--kinari),inset 0 0 0 11px var(--line2),0 30px 60px -40px rgba(28,27,24,.55)}
.d-shiro .sh-scroll.is-empty figure span{writing-mode:vertical-rl;max-height:70%;font-family:var(--serif);font-size:clamp(40px,4.6vw,66px);font-weight:400;line-height:1;letter-spacing:.16em;color:var(--sumi);white-space:nowrap}
.d-shiro .sh-scroll.is-empty figure .sh-hanko{--hs:clamp(40px,3.6vw,52px);flex:none;animation:sh-stamp 1.1s cubic-bezier(.3,1.5,.5,1) 2.4s both}
.d-shiro .sh-slim{position:absolute;left:0;bottom:-7%;width:34%;aspect-ratio:1/2.3;overflow:hidden;border:7px solid var(--washi);background:var(--washi2);transform:translateY(calc(var(--p,0) * 40px));clip-path:inset(100% 0 0 0);animation:sh-unroll-up 1.6s var(--slow) 1.3s forwards}
.d-shiro .sh-slim img{width:100%;height:100%;object-fit:cover}
.d-shiro .sh-art>.sh-hanko{--hs:clamp(58px,6vw,82px);position:absolute;left:calc(24% - 26px);top:16%;z-index:3;animation:sh-stamp 1.1s cubic-bezier(.3,1.5,.5,1) 2.3s both}
.d-shiro .sh-strip{position:absolute;left:4%;top:16%;display:flex;flex-direction:row;gap:22px;align-items:center;writing-mode:vertical-rl;font-family:var(--serif);font-size:clamp(17px,1.5vw,21px);letter-spacing:.14em;color:var(--sumi2);animation:sh-fade 2s ease 2.4s both}
.d-shiro .sh-strip li{display:flex;align-items:center;gap:22px}
.d-shiro .sh-strip li+li::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--mist)}
.d-shiro .sh-sec{position:relative;padding-block:var(--z-sec)}
.d-shiro .sh-sec.is-paper{background:var(--washi2) ${NOISE}}
.d-shiro .sh-sec.is-ink{background:var(--sumi);color:var(--washi)}
.d-shiro .is-ink h2 em{color:var(--mist)}
.d-shiro .is-ink .sh-kick{color:var(--mist)}
.d-shiro .is-ink .sh-brush{color:var(--washi)}
.d-shiro .sh-head{display:grid;grid-template-columns:auto minmax(0,1fr);gap:clamp(18px,3vw,52px);align-items:start;max-width:980px;margin-bottom:clamp(48px,6vw,96px)}
.d-shiro .sh-head>div{display:grid;gap:22px;justify-items:start;min-width:0}
.d-shiro .sh-head>div>p{max-width:52ch;color:var(--dim)}
.d-shiro .is-ink .sh-head>div>p{color:rgba(244,239,230,.68)}
.d-shiro .sh-head .sh-brush{width:min(64%,300px);height:16px;margin-top:-4px}
@media (max-width:699px){.d-shiro .sh-head{gap:14px;margin-bottom:44px}.d-shiro .sh-head .sh-kick::after{height:28px}.d-shiro .sh-head h2{font-size:clamp(36px,10vw,48px)}.d-shiro .sh-head h2.is-long{font-size:clamp(30px,8vw,38px)}}
.d-shiro .sh-about{display:grid;gap:clamp(56px,7vw,120px);align-items:start}
@media (min-width:960px){.d-shiro .sh-about{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}}
.d-shiro .sh-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:900px}
.d-shiro .sh-about-copy{display:grid;gap:24px;align-content:start}
.d-shiro .sh-about-copy .sh-head{margin-bottom:12px}
.d-shiro .sh-lead{font-family:var(--serif);font-size:clamp(23px,2.1vw,32px);font-weight:300;line-height:1.42;color:var(--sumi)}
.d-shiro .sh-about-copy>p:not(.sh-lead){max-width:56ch;color:var(--dim)}
.d-shiro .sh-points{display:grid;margin-top:10px;border-top:1px solid var(--line)}
.d-shiro .sh-points li{display:flex;align-items:center;gap:18px;padding:16px 0;border-bottom:1px solid var(--line);font-size:14px;letter-spacing:.06em;transition:padding-left .6s var(--ease)}
.d-shiro .sh-points li::before{content:"";flex:none;width:6px;height:6px;border:1px solid var(--sumi);transform:rotate(45deg);transition:background-color .4s}
.d-shiro .sh-points li:hover{padding-left:10px}
.d-shiro .sh-points li:hover::before{background:var(--sumi)}
.d-shiro .sh-about-art{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.62fr);gap:clamp(14px,2vw,28px);align-items:end}
.d-shiro .sh-tall{position:relative;aspect-ratio:2/3.3;overflow:hidden;background:var(--washi2)}
.d-shiro .sh-tall img{width:100%;height:118%;object-fit:cover;transform:translateY(calc(var(--p,0) * -7% - 7%))}
.d-shiro .sh-tall.is-slim{aspect-ratio:1/2.4;margin-bottom:clamp(-60px,-5vw,-30px)}
.demo-js .d-shiro .sh-tall[data-rv]{opacity:1;transform:none;clip-path:inset(0 0 100% 0);transition:clip-path 1.8s var(--slow);transition-delay:calc(var(--i,0) * 220ms)}
.demo-js .d-shiro .sh-tall[data-rv].in{clip-path:inset(0)}
.d-shiro .sh-about-art .sh-hanko{--hs:52px;position:absolute;right:-6px;top:-18px;z-index:2}
.d-shiro .sh-solo-mark{display:flex;align-items:center;gap:22px;margin-top:22px;font-family:var(--serif);font-size:20px;font-style:italic;color:var(--dim)}
.d-shiro .sh-solo-mark .sh-hanko{--hs:56px}
.d-shiro .sh-oshi{--cols:1;display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));overflow:hidden;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
@media (min-width:700px){.d-shiro .sh-oshi{--cols:min(var(--n),2)}}
@media (min-width:1100px){.d-shiro .sh-oshi{--cols:var(--n)}.d-shiro .sh-oshi.is-many{--cols:3}}
.d-shiro .sh-col{display:grid;grid-template-columns:auto minmax(0,1fr);gap:clamp(18px,2vw,30px);margin:-1px 0 0 -1px;padding:clamp(28px,3vw,44px) clamp(4px,2vw,32px) clamp(28px,3vw,40px) clamp(4px,2vw,32px);border-top:1px solid var(--line);border-left:1px solid var(--line)}
.demo-js .d-shiro .sh-col[data-rv]{opacity:1;transform:none;clip-path:inset(0 0 100% 0);transition:clip-path 1.6s var(--slow);transition-delay:calc(var(--i,0) * 160ms)}
.demo-js .d-shiro .sh-col[data-rv].in{clip-path:inset(0 -10px)}
.d-shiro .sh-col h3{writing-mode:vertical-rl;font-size:clamp(28px,2.4vw,36px);font-weight:400;line-height:1;letter-spacing:.1em;white-space:nowrap}
.d-shiro .sh-col h3::after{content:"";display:inline-block;width:1px;height:42px;margin-top:18px;background:var(--sumi);opacity:.5}
.d-shiro .sh-dishes{display:grid;align-content:start}
.d-shiro .sh-dish{position:relative;display:grid;gap:4px;padding:15px 0 16px;border-bottom:1px solid var(--line2);transition:padding-left .6s var(--ease)}
.d-shiro .sh-dish:first-child{padding-top:4px}
.d-shiro .sh-dish:last-child{border-bottom:0}
.d-shiro .sh-dish::before{content:"";position:absolute;left:0;top:calc(50% - 3px);width:6px;height:6px;background:var(--shu);opacity:0;transform:scale(0) rotate(45deg);transition:opacity .4s,transform .6s var(--ease)}
.d-shiro .sh-dish:first-child::before{top:calc(50% - 7px)}
.d-shiro .sh-dish:hover{padding-left:18px}
.d-shiro .sh-dish:hover::before{opacity:1;transform:scale(1) rotate(45deg)}
.d-shiro .sh-dish-top{display:flex;align-items:baseline;justify-content:space-between;gap:16px}
.d-shiro .sh-dish b{font-weight:500;font-size:15.5px;letter-spacing:.02em}
.d-shiro .sh-dish-top span{font-family:var(--serif);font-size:19px;font-weight:500;font-variant-numeric:lining-nums;white-space:nowrap}
.d-shiro .sh-dish p{font-size:13.5px;line-height:1.55;color:var(--dim)}
.d-shiro .sh-dish small{font-size:10px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--mist)}
.d-shiro .sh-foot-note{margin-top:36px;font-family:var(--serif);font-size:18px;font-style:italic;color:var(--dim)}
.d-shiro .sh-list{border-top:1px solid var(--line)}
.d-shiro .sh-row{position:relative;display:grid;grid-template-columns:52px minmax(0,1fr);gap:8px clamp(18px,3vw,48px);align-items:baseline;padding:clamp(26px,3vw,40px) clamp(0px,1.5vw,20px);border-bottom:1px solid var(--line);isolation:isolate}
.d-shiro .sh-row::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--kinari);transform:scaleX(0);transform-origin:left;transition:transform .9s var(--slow)}
.d-shiro .sh-row:hover::before{transform:none}
.d-shiro .sh-row>small{font-family:var(--serif);font-size:22px;font-style:italic;color:var(--mist);transition:color .5s}
.d-shiro .sh-row:hover>small{color:var(--shu)}
.d-shiro .sh-row h3{font-size:clamp(26px,2.4vw,38px);transition:transform .8s var(--ease)}
.d-shiro .sh-row:hover h3{transform:translateX(8px)}
.d-shiro .sh-row p{max-width:58ch;margin-top:8px;color:var(--dim)}
.d-shiro .sh-row-meta{grid-column:2;display:flex;flex-wrap:wrap;gap:6px 22px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--sumi2)}
.d-shiro .sh-row-meta b{font-family:var(--serif);font-size:20px;font-weight:500;letter-spacing:0;text-transform:none}
.d-shiro .sh-row-ico{display:none}
@media (min-width:860px){.d-shiro .sh-row{grid-template-columns:72px minmax(0,1fr) auto 52px}.d-shiro .sh-row-meta{grid-column:auto;display:grid;justify-items:end;gap:2px}.d-shiro .sh-row-ico{display:grid;place-items:center;width:48px;height:48px;border:1px solid var(--line);border-radius:50%;color:var(--sumi2);transition:transform .8s var(--ease),border-color .4s}.d-shiro .sh-row-ico svg{width:20px;height:20px}.d-shiro .sh-row:hover .sh-row-ico{transform:rotate(-30deg);border-color:var(--sumi)}}
.d-shiro .sh-feats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));border-top:1px solid rgba(244,239,230,.16)}
.d-shiro .sh-feat{display:grid;gap:18px;align-content:start;padding:clamp(32px,3.4vw,52px) clamp(0px,2.4vw,40px) clamp(36px,3.4vw,52px) 0;border-bottom:1px solid rgba(244,239,230,.16)}
@media (min-width:640px){.d-shiro .sh-feat{padding-left:clamp(20px,2.4vw,40px);border-left:1px solid rgba(244,239,230,.16)}}
.d-shiro .sh-feat .sh-mon{position:relative;display:grid;place-items:center;width:64px;height:64px;color:var(--washi)}
.d-shiro .sh-mon svg{width:22px;height:22px}
.d-shiro .sh-mon::before{content:"";position:absolute;inset:0;border:1px solid rgba(244,239,230,.4);border-radius:50%;border-right-color:transparent;transform:rotate(-40deg);transition:transform 1.2s var(--ease)}
.d-shiro .sh-feat:hover .sh-mon::before{transform:rotate(320deg)}
.d-shiro .sh-feat h3{font-size:clamp(25px,2.1vw,32px)}
.d-shiro .sh-feat p{color:rgba(244,239,230,.66)}
.d-shiro .sh-steps{position:relative;display:grid;grid-template-columns:minmax(0,1fr);gap:0;padding-left:34px}
.d-shiro .sh-track{position:absolute;left:5px;top:6px;bottom:6px;width:1px;background:var(--line)}
.d-shiro .sh-track i{position:absolute;inset:0;background:var(--sumi);transform-origin:top;transform:scaleY(clamp(0,calc(1.1 - var(--p,1)),1))}
.d-shiro .sh-step{position:relative;display:grid;gap:10px;align-content:start;padding:0 0 clamp(36px,4vw,56px)}
.d-shiro .sh-step::before{content:"";position:absolute;left:-34px;top:9px;width:11px;height:11px;border:1px solid var(--sumi);border-radius:50%;background:var(--washi);transition:background-color .6s .5s,transform .8s var(--ease) .5s}
.d-shiro .sh-step.in::before,html:not(.demo-js) .d-shiro .sh-step::before{background:var(--sumi);transform:scale(1.15)}
.d-shiro .sh-step small{font-family:var(--serif);font-size:15px;font-style:italic;letter-spacing:.1em;color:var(--dim)}
.d-shiro .sh-step h3{font-size:clamp(26px,2.2vw,34px)}
.d-shiro .sh-step p{max-width:34ch;color:var(--dim)}
@media (min-width:900px){.d-shiro .sh-steps{grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:clamp(24px,3vw,56px);padding:44px 0 0}.d-shiro .sh-track{left:0;right:0;top:5px;bottom:auto;width:auto;height:1px}.d-shiro .sh-track i{transform-origin:left;transform:scaleX(clamp(0,calc(1.1 - var(--p,1)),1))}.d-shiro .sh-step::before{left:0;top:-44px}.d-shiro .sh-step{padding:0}}
.d-shiro .sh-byobu{display:flex;gap:clamp(6px,.8vw,12px);height:clamp(420px,46vw,640px)}
.d-shiro .sh-byobu figure{position:relative;flex:1 1 0;min-width:0;overflow:hidden;background:var(--washi2);transition:flex-grow 1.1s var(--slow)}
.d-shiro .sh-byobu figure:nth-child(even){margin-top:clamp(28px,4vw,64px)}
.d-shiro .sh-byobu figure:nth-child(odd){margin-bottom:clamp(28px,4vw,64px)}
.d-shiro .sh-byobu img{width:100%;height:100%;object-fit:cover;transform:scale(1.06);transition:transform 1.4s var(--ease),filter .8s}
.d-shiro .sh-byobu:hover figure:not(:hover) img{filter:saturate(.4) brightness(.92)}
.d-shiro .sh-byobu figure:hover{flex-grow:2.4}
.d-shiro .sh-byobu figure:hover img{transform:none}
.d-shiro .sh-byobu figcaption{position:absolute;left:12px;bottom:14px;writing-mode:vertical-rl;font-size:10.5px;letter-spacing:.3em;color:#fff;text-shadow:0 1px 8px rgba(0,0,0,.5)}
.demo-js .d-shiro .sh-byobu figure[data-rv]{opacity:1;transform:none;clip-path:inset(0 0 100% 0);transition:clip-path 1.6s var(--slow),flex-grow 1.1s var(--slow);transition-delay:calc(var(--i,0) * 140ms),0s}
.demo-js .d-shiro .sh-byobu figure[data-rv].in{clip-path:inset(0)}
@media (max-width:760px){.d-shiro .sh-byobu{height:auto;margin-inline:calc(-1 * var(--pad));padding:0 var(--pad) 12px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.d-shiro .sh-byobu::-webkit-scrollbar{display:none}.d-shiro .sh-byobu figure{flex:0 0 58%;aspect-ratio:9/16;scroll-snap-align:start}.d-shiro .sh-byobu figure:hover{flex-grow:0}}
.d-shiro .sh-visit{display:grid;gap:clamp(56px,7vw,110px);align-items:start}
@media (min-width:960px){.d-shiro .sh-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.d-shiro .sh-visit.is-enso{align-items:center}}
.d-shiro .sh-visit-copy{display:grid;gap:24px;align-content:start}
.d-shiro .sh-visit-copy .sh-head{margin-bottom:8px}
.d-shiro .sh-visit-copy>p{max-width:52ch;color:var(--dim)}
.d-shiro .sh-enso-box{display:grid;justify-items:center;align-content:center;padding:clamp(24px,4vw,60px) 0}
.d-shiro .sh-enso{position:relative;display:grid;place-items:center;width:min(86%,400px);aspect-ratio:1}
.d-shiro .sh-enso svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.d-shiro .sh-enso path{fill:none;stroke:var(--sumi);stroke-linecap:round;stroke-dasharray:1000;stroke-dashoffset:1000;transition:stroke-dashoffset 2.6s var(--slow) .2s}
.d-shiro .sh-enso path:first-child{stroke-width:13;filter:url(#sh-rough)}
.d-shiro .sh-enso path:nth-child(2){stroke-width:4;opacity:.4;filter:url(#sh-rough);transition-delay:.5s}
.d-shiro .sh-enso path:nth-child(3){stroke-width:1.6;opacity:.3;transition-delay:.7s}
.d-shiro .sh-plate{position:relative;display:grid;gap:22px;align-content:start;justify-items:start;padding:clamp(32px,4vw,60px);background:var(--kinari);box-shadow:0 1px 0 var(--line),0 40px 80px -60px rgba(28,27,24,.5)}
.d-shiro .sh-plate .sh-hanko{--hs:64px}
.d-shiro .sh-plate p{font-family:var(--serif);font-size:clamp(30px,3vw,44px);font-weight:300;line-height:1.1}
.d-shiro .sh-plate .z-reach{font-size:16px}
.d-shiro .sh-plate .z-reach>span{font-family:var(--serif);font-size:22px;line-height:1.3;color:var(--sumi)}
.d-shiro .sh-enso.in path,html:not(.demo-js) .d-shiro .sh-enso path{stroke-dashoffset:0}
.demo-js .d-shiro .sh-enso[data-rv]{opacity:1;transform:none}
.d-shiro .sh-enso-in{position:relative;display:grid;gap:10px;justify-items:center;max-width:70%;text-align:center}
.d-shiro .sh-enso-in>small{font-size:10.5px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--dim)}
.d-shiro .sh-enso-in .sh-now{font-family:var(--serif);font-size:clamp(26px,2.6vw,36px);font-weight:400;letter-spacing:.02em;text-transform:none;color:var(--sumi)}
.d-shiro .sh-enso-in .sh-now::before{width:10px;height:10px}
.d-shiro .sh-enso-in p{font-family:var(--serif);font-size:20px;font-style:italic;line-height:1.3;color:var(--dim)}
.d-shiro .sh-form{position:relative;padding:clamp(28px,3.6vw,56px);background:var(--kinari);box-shadow:0 1px 0 var(--line),0 40px 80px -60px rgba(28,27,24,.5)}
.d-shiro .sh-form>.sh-hanko{--hs:46px;position:absolute;right:clamp(18px,2.6vw,36px);top:-18px}
.d-shiro .sh-form>.sh-eyebrow{margin-bottom:26px}
.d-shiro .form-status{border-color:var(--sumi)}
.d-shiro .sh-noren{position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:8px;padding-top:7px}
.d-shiro .sh-noren::before{content:"";position:absolute;left:-14px;right:-14px;top:0;height:8px;border-radius:4px;background:linear-gradient(180deg,#5a554c,var(--sumi2))}
.d-shiro .sh-noren li{transform-origin:50% -22px}
.d-shiro .sh-noren a{position:relative;display:grid;gap:16px;align-content:start;min-height:clamp(260px,26vw,380px);padding:clamp(28px,3vw,44px) clamp(22px,2.4vw,36px) 90px;background:var(--sumi);color:var(--washi);overflow:hidden;transition:background-color .6s}
.d-shiro .sh-noren a::before{content:"";position:absolute;left:0;right:0;top:0;height:16px;background:repeating-linear-gradient(90deg,rgba(244,239,230,.2) 0 1px,transparent 1px 22px);border-bottom:1px solid rgba(244,239,230,.14)}
.d-shiro .sh-noren a::after{content:"";position:absolute;left:50%;bottom:0;width:6px;height:28%;background:var(--washi);transform:translateX(-50%);transition:height .8s var(--ease)}
.d-shiro .sh-sec.is-paper .sh-noren a::after{background:var(--washi2)}
.d-shiro .sh-noren a:hover{background:var(--sumi2)}
.d-shiro .sh-noren a:hover::after{height:36%}
.d-shiro .sh-noren li:hover{animation:sh-sway 1.6s var(--ease)}
.d-shiro .sh-noren .sh-mon{position:relative;display:grid;place-items:center;width:58px;height:58px;margin-top:10px;border:1px solid rgba(244,239,230,.45);border-radius:50%}
.d-shiro .sh-noren .sh-mon svg{width:22px;height:22px}
.d-shiro .sh-noren h3{font-size:clamp(28px,2.4vw,36px)}
.d-shiro .sh-noren p{max-width:30ch;color:rgba(244,239,230,.68)}
.d-shiro .sh-noren .sh-go{position:absolute;left:clamp(22px,2.4vw,36px);bottom:28px;display:flex;align-items:center;gap:12px;font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:rgba(244,239,230,.8)}
.d-shiro .sh-noren .sh-go::before{content:"";width:22px;height:1px;background:currentColor;transition:width .7s var(--ease)}
.d-shiro .sh-noren a:hover .sh-go::before{width:40px}
.d-shiro .sh-foot{position:relative;padding:clamp(90px,11vw,160px) 0 130px;background:var(--sumi);color:rgba(244,239,230,.72);overflow:hidden}
.d-shiro .sh-foot .sh-brush{position:absolute;left:var(--pad);top:clamp(40px,5vw,64px);width:min(46%,420px);color:var(--washi)}
.d-shiro .sh-foot-grid{position:relative;display:grid;gap:44px 32px;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}
.d-shiro .sh-foot-brand{display:grid;gap:20px;align-content:start;grid-column:1/-1}
@media (min-width:1000px){.d-shiro .sh-foot-grid{grid-template-columns:1.5fr 1fr 1fr 1.2fr}.d-shiro .sh-foot-brand{grid-column:auto}}
.d-shiro .sh-foot-brand .sh-hanko{--hs:64px}
.d-shiro .sh-foot-name{font-family:var(--serif);font-size:clamp(34px,3.6vw,52px);font-weight:300;line-height:1.05;letter-spacing:.04em;color:var(--washi)}
.d-shiro .sh-foot-brand p:last-child{max-width:36ch;font-size:14.5px}
.d-shiro .sh-foot h3{margin-bottom:16px;font-family:var(--sans);font-size:10.5px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--mist)}
.d-shiro .sh-foot-grid a,.d-shiro .sh-foot-grid span{display:block;padding:5px 0;font-size:14.5px}
.d-shiro .sh-foot-grid a{transition:color .4s,transform .6s var(--ease)}
.d-shiro .sh-foot-grid a:hover{color:var(--washi);transform:translateX(6px)}
.d-shiro .sh-foot-vert{position:absolute;right:var(--pad);top:clamp(60px,7vw,110px);bottom:150px;display:none;overflow:hidden;writing-mode:vertical-rl;font-family:var(--serif);font-size:clamp(56px,5.4vw,84px);font-weight:300;line-height:1;letter-spacing:.12em;color:rgba(244,239,230,.07);white-space:nowrap;transform:translateY(calc(var(--p,0) * -30px))}
@media (min-width:1200px){.d-shiro .sh-foot-vert{display:block}.d-shiro .sh-foot-grid{padding-right:140px}}
.d-shiro .sh-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:64px;padding-top:24px;border-top:1px solid rgba(244,239,230,.12);font-size:12.5px;color:rgba(244,239,230,.5)}
@keyframes sh-ink{0%{opacity:0;-webkit-mask-position:0 100%;mask-position:0 100%;color:var(--mist);text-shadow:0 0 22px rgba(28,27,24,.55)}35%{opacity:1}100%{opacity:1;-webkit-mask-position:0 0;mask-position:0 0;text-shadow:0 0 0 rgba(28,27,24,0)}}
@keyframes sh-fade{from{opacity:0}to{opacity:1}}
@keyframes sh-rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes sh-down{from{opacity:0;transform:translateY(-24px)}to{opacity:1;transform:none}}
@keyframes sh-grow{from{transform:scaleY(0)}to{transform:none}}
@keyframes sh-paint{to{clip-path:inset(0 -2% 0 0)}}
@keyframes sh-unroll{to{clip-path:inset(0)}}
@keyframes sh-unroll-up{to{clip-path:inset(0)}}
@keyframes sh-roll{to{top:calc(100% - 4px)}}
@keyframes sh-settle{to{scale:1}}
@keyframes sh-stamp{0%{opacity:0;transform:scale(1.9) rotate(-14deg)}55%{opacity:1;transform:scale(.92) rotate(-2deg)}100%{opacity:1;transform:scale(1) rotate(-4deg)}}
@keyframes sh-sway{0%,100%{transform:none}25%{transform:rotate(1.4deg)}55%{transform:rotate(-.9deg)}80%{transform:rotate(.4deg)}}
@media (prefers-reduced-motion:reduce){.d-shiro .sh-ch{-webkit-mask-image:none;mask-image:none}.d-shiro .sh-scroll figure,.d-shiro .sh-slim,.d-shiro .sh-hero .sh-brush,.demo-js .d-shiro .sh-brush[data-rv],.demo-js .d-shiro .sh-tall[data-rv],.demo-js .d-shiro .sh-col[data-rv],.demo-js .d-shiro .sh-byobu figure[data-rv]{clip-path:none}.d-shiro .sh-scroll img{scale:1}.d-shiro .sh-rod.is-low{top:calc(100% - 4px)}.d-shiro .sh-enso path{stroke-dashoffset:0}.d-shiro .sh-noren li:hover{animation:none}.d-shiro .sh-mist,.d-shiro .sh-slim,.d-shiro .sh-foot-vert{transform:none}}
`
  .replace(/\n/g, "")
  .trim();

/** Restyles the kit's shared sections (their rules come after the family stylesheet). */
const EXTRA = `
.d-shiro .sh-enso-box .z-hours{width:100%}
.d-shiro .z-hours{border-top:1px solid var(--line)}
.d-shiro .z-hours div{position:relative;align-items:baseline;padding:15px 0;border-bottom:1px solid var(--line2);transition:padding-left .6s var(--ease)}
.d-shiro .z-hours dt{font-size:13px;letter-spacing:.12em;text-transform:uppercase}
.d-shiro .z-hours dd{font-family:var(--serif);font-size:19px;font-variant-numeric:lining-nums;color:var(--sumi2)}
.d-shiro .z-price,.d-shiro .z-pack-price b{font-variant-numeric:lining-nums}
.d-shiro .z-showcase.has-pic .sh-line{color:#fff}
.d-shiro .z-show-in h2 em{color:inherit;opacity:.86}
@media (max-width:620px){.d-shiro .z-team .z-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 14px}.d-shiro .z-team h3{font-size:21px}}
.d-shiro .z-hours div.is-today{padding-left:22px;background:linear-gradient(90deg,rgba(199,58,34,.07),transparent 70%)}
.d-shiro .z-hours div.is-today::before{content:"";position:absolute;left:4px;top:calc(50% - 4px);width:8px;height:8px;background:var(--shu)}
.d-shiro .z-hours div.is-today dt{font-weight:600}
.d-shiro .z-hours div.is-today dd{color:var(--sumi)}
.d-shiro .z-reach{gap:4px;color:var(--dim)}
.d-shiro .z-reach a{min-height:40px;border-bottom:1px solid transparent;transition:border-color .4s}
.d-shiro .z-reach a:hover{border-color:currentColor}
.d-shiro .z-reach .z-route{color:var(--sumi);font-size:12.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
.d-shiro .z-field label,.d-shiro .z-chipset legend{font-size:10.5px;font-weight:500;letter-spacing:.26em;color:var(--dim)}
.d-shiro .z-field input,.d-shiro .z-field select,.d-shiro .z-field textarea{padding:12px 0;border:0;border-bottom:1px solid var(--line);background:transparent;font-weight:400;transition:border-color .4s}
.d-shiro .z-field textarea{min-height:96px}
.d-shiro .z-field input:focus,.d-shiro .z-field select:focus,.d-shiro .z-field textarea:focus{border-bottom-color:var(--sumi)}
.d-shiro .z-field :focus-visible{outline:none}
.d-shiro .z-field select{background:linear-gradient(45deg,transparent 50%,var(--sumi) 0) calc(100% - 6px) 55%/6px 6px no-repeat,linear-gradient(-45deg,transparent 50%,var(--sumi) 0) 100% 55%/6px 6px no-repeat}
.d-shiro .z-chips{gap:6px}
.d-shiro .z-chips button{border-color:var(--line);font-family:var(--serif);font-size:20px;transition:background-color .4s,color .4s,transform .5s var(--ease)}
.d-shiro .z-chips button:hover{transform:translateY(-3px)}
.d-shiro .z-sec h2{font-weight:300}
.d-shiro .z-head .sh-eyebrow,.d-shiro .z-center .sh-eyebrow{letter-spacing:.32em}
.d-shiro .z-sec.z-cta{background:radial-gradient(60% 80% at 50% 120%,rgba(28,27,24,.12),transparent 70%),var(--washi2)}
.d-shiro .z-cta h2{font-size:clamp(42px,5.8vw,92px)}
.d-shiro .z-cta .z-center::before{content:"";width:1px;height:72px;background:var(--sumi);opacity:.5}
.d-shiro .z-statement h2{font-style:italic;font-weight:300;line-height:1.18}
.d-shiro .z-statement h2 em{font-style:normal}
.d-shiro .z-statement .z-center::after{content:"";width:9px;height:9px;border:1px solid var(--sumi);transform:rotate(45deg)}
.d-shiro .z-card,.d-shiro .z-panel{border-color:var(--line);background:var(--kinari)}
.d-shiro .z-card{transition:transform .9s var(--ease),box-shadow .9s var(--ease)}
.d-shiro .z-card:hover{transform:translateY(-6px);box-shadow:0 30px 60px -44px rgba(28,27,24,.55)}
.d-shiro .z-pack.is-featured{border-color:var(--sumi);box-shadow:inset 0 3px 0 var(--sumi)}
.d-shiro .z-tag{color:var(--shu)}
.d-shiro .z-pack-price b{font-weight:300}
.d-shiro .z-ticks li::before{width:6px;height:6px;top:.72em;border:1px solid var(--sumi);background:none;transform:rotate(45deg)}
.d-shiro .z-acc summary{font-family:var(--serif);font-size:clamp(21px,1.8vw,27px);font-weight:400;transition:padding-left .6s var(--ease)}
.d-shiro .z-acc summary:hover{padding-left:10px}
.d-shiro .z-acc details>p{font-size:15.5px}
.d-shiro .z-quotes blockquote{border-top-color:var(--sumi)}
.d-shiro .z-quotes blockquote>p{font-style:italic;font-weight:300}
.d-shiro .z-rows small,.d-shiro .z-steps small{font-family:var(--serif);font-size:20px;font-style:italic;letter-spacing:.06em;color:var(--dim)}
.d-shiro .z-pic{background:var(--washi2)}
.d-shiro .z-team .z-pic-tall{aspect-ratio:2/3}
.d-shiro .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(28,27,24,.05),rgba(28,27,24,.78))}
.d-shiro .z-show-in h2{font-size:clamp(42px,5.4vw,86px)}
.d-shiro .z-channel{background:var(--kinari)}
.d-shiro .sh-foot .z-hours{border-color:rgba(244,239,230,.14)}
.d-shiro .sh-foot .z-hours div{padding:9px 0;border-color:rgba(244,239,230,.1)}
.d-shiro .sh-foot .z-hours dt{font-size:11.5px}
.d-shiro .sh-foot .z-hours dd{font-size:16px;white-space:nowrap;color:rgba(244,239,230,.8)}
.d-shiro .sh-foot .z-hours div.is-today{padding-left:20px;background:linear-gradient(90deg,rgba(199,58,34,.22),transparent 80%)}
.d-shiro .sh-foot .z-hours div.is-today dd,.d-shiro .sh-foot .z-hours div.is-today dt{color:var(--washi)}
`
  .replace(/\n/g, "")
  .trim();

/** A brush stroke that paints itself from left to right. Decoration only. */
const Brush = ({ rv = true }: { rv?: boolean }) => (
  <svg className="sh-brush" viewBox="0 0 420 24" preserveAspectRatio="none" aria-hidden="true" {...(rv ? { "data-rv": true } : {})}>
    <path d="M7 8.4C2.6 9.4 1.4 16 6.4 17.8 60 18.6 140 16.8 220 15.2c70-1.4 130-3 194-5.6l1.6-1C350 8.8 290 9.2 220 9.4 140 9.6 70 7.6 7 8.4Z" />
    <path d="M150 17.6c70 .2 150-2.2 252-6.4l.6 1.1C300 17 220 19.6 150 18.8Z" />
    <path d="M236 8.2c60-1 112-2 172-3.6l.3 1C350 7.6 296 8.8 236 9.4Z" />
  </svg>
);

/** The seal: a vermilion square stamped with the first letter of the business. */
const Hanko = ({ c }: { c: Ctx }) => (
  <i className="sh-hanko" aria-hidden="true">
    <b>{c.name.charAt(0)}</b>
  </i>
);

/** An ensō, painted in one stroke when it comes into view. */
const Enso = ({ children }: { children: ReactNode }) => (
  <div className="sh-enso" data-rv>
    <svg viewBox="0 0 300 300" aria-hidden="true">
      <path d="M176 38c-58-14-118 18-136 76-20 62 14 128 76 146 60 18 124-14 142-74 14-46-4-96-42-122" />
      <path d="M168 46c-52-10-106 20-120 72-16 58 18 116 74 130 56 14 112-18 126-72" />
      <path d="M190 30c-60-20-130 14-150 80" />
    </svg>
    <div className="sh-enso-in">{children}</div>
  </div>
);

/** The headline, letter by letter, each one seeping onto the paper like ink. */
function Ink({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let n = 0;
  text.split(/\*([^*]+)\*/).forEach((chunk, k) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w, m) => {
        out.push(
          <span key={`${k}-${m}`} className={`sh-wd${k % 2 ? " is-em" : ""}`}>
            {[...w].map((ch, j) => (
              <span key={j} className="sh-ch" style={i(n++)}>
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

function Head({ kicker, title, intro, id }: { kicker?: string; title: string; intro?: string; id?: string }) {
  return (
    <header className="sh-head">
      {kicker ? (
        <p className="sh-kick" data-rv>
          {kicker}
        </p>
      ) : (
        <span />
      )}
      <div>
        <h2 id={id} className={long(title)} data-rv>
          {em(title)}
        </h2>
        <Brush />
        {intro ? <p data-rv>{intro}</p> : null}
      </div>
    </header>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      {/* The rough edge every brush stroke on the page is drawn with. */}
      <svg className="sh-defs" aria-hidden="true" focusable="false">
        <filter id="sh-rough" x="-5%" y="-40%" width="110%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="3.2" />
        </filter>
      </svg>
      <header className="sh-hdr hdr">
        <div className="sh-wrap sh-bar">
          <a href="#top" className="sh-logo" aria-label={c.name}>
            <Hanko c={c} />
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="sh-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn sh-line sh-cta">
            {cta.label}
          </a>
          <button type="button" className="sh-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="sh-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{String(k + 1).padStart(2, "0")}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="sh-menu-side" aria-hidden="true">
          <Hanko c={c} />
          <p>{c.name}</p>
        </div>
        <div className="sh-menu-reach">
          {b.address ?? b.city ? <span>{b.address ?? b.city}</span> : null}
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const slim = p ? c.spare() : null;
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 44 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const words = offerWords(c, 3);
  return (
    <section className="sh-hero">
      <span className="sh-mist" data-px aria-hidden="true" />
      <div className="sh-wrap sh-hero-grid">
        <p className="sh-kick">{hero.eyebrow || c.spec.business.city || c.name}</p>
        <div className="sh-hero-copy">
          <NowBadge c={c} className="sh-now" />
          <h1 className={size}>
            <span className="sh-sr">{plain}</span>
            <span aria-hidden="true">
              <Ink text={hero.headline} />
            </span>
          </h1>
          <Brush rv={false} />
          <p className="sh-lede">{hero.subheadline}</p>
          <div className="sh-cta-row">
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
          {facts.length > 0 && (
            <dl className="sh-facts">
              {facts.map((f, n) => (
                <div key={f.label} style={i(n)}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="sh-art" style={p ? undefined : { paddingLeft: words.length ? "22%" : "0" }}>
          <div className={`sh-scroll${p ? "" : " is-empty"}`}>
            <svg className="sh-cord" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 30 50 1l48 29" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="sh-rod is-top" aria-hidden="true" />
            <figure>
              {p ? (
                <Pic p={p} eager sizes="(min-width: 1000px) 32vw, 72vw" />
              ) : (
                // No photograph: the scroll carries the name as calligraphy, sealed below.
                <>
                  <span aria-hidden="true">{c.name}</span>
                  <Hanko c={c} />
                </>
              )}
            </figure>
            <span className="sh-rod is-low" aria-hidden="true" />
          </div>
          {slim ? (
            <figure className="sh-slim" data-px>
              <Pic p={slim} eager sizes="(min-width: 1000px) 12vw, 30vw" />
            </figure>
          ) : null}
          {!p && words.length > 0 ? (
            <ul className="sh-strip" aria-hidden="true">
              {words.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          ) : null}
          {p ? <Hanko c={c} /> : null}
        </div>
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  return (
    <footer className="sh-foot">
      <Brush />
      <p className="sh-foot-vert" data-px aria-hidden="true">
        {c.name}
      </p>
      <div className="sh-wrap">
        <div className="sh-foot-grid">
          <div className="sh-foot-brand">
            <Hanko c={c} />
            <p className="sh-foot-name">{c.name}</p>
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
            {b.address ? <span>{b.address}</span> : null}
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
              <Hours c={c} />
            </div>
          ) : null}
        </div>
        <Legal c={c} className="sh-legal" />
      </div>
    </footer>
  );
}

export const shiro: Family = {
  key: "shiro",
  root: "d-shiro",
  fonts: ["Cormorant", "Inter Tight"],
  themeColor: "#f4efe6",
  accent: "#c73a22",
  onAccent: "#faf7f0",
  css: CSS,
  extra: EXTRA,
  js: TODAY_JS,
  cls: { wrap: "sh-wrap", eyebrow: "sh-eyebrow", btn: "sh-fill", btnAlt: "sh-line", btnText: "sh-text" },
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
        <section className="sh-sec" id={s.id}>
          <div className={`sh-wrap sh-about${a ? "" : " is-solo"}`}>
            <div className="sh-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="sh-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="sh-points" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              {!a ? (
                <p className="sh-solo-mark" data-rv>
                  <Hanko c={c} />
                  {c.name}
                </p>
              ) : null}
            </div>
            {a ? (
              <div className="sh-about-art">
                <figure className="sh-tall" data-rv data-px>
                  <Pic p={a} sizes="(min-width: 960px) 28vw, 60vw" />
                </figure>
                {b ? (
                  <figure className="sh-tall is-slim" data-rv data-px style={i(1)}>
                    <Pic p={b} sizes="(min-width: 960px) 16vw, 36vw" />
                  </figure>
                ) : null}
                <Hanko c={c} />
              </div>
            ) : null}
          </div>
        </section>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="sh-sec is-paper" id={s.id}>
          <div className="sh-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            <div className={`sh-oshi${cats.length > 4 ? " is-many" : ""}`} style={{ ["--n" as string]: cats.length }}>
              {cats.map((cat, n) => (
                <article key={n} className="sh-col" data-rv style={i(n % 4)}>
                  <h3>{cat.name}</h3>
                  <ul className="sh-dishes">
                    {cat.items.map((d, m) => (
                      <li key={m} className="sh-dish">
                        <div className="sh-dish-top">
                          <b>{d.name}</b>
                          {d.price ? <span>{d.price}</span> : null}
                        </div>
                        {d.description ? <p>{d.description}</p> : null}
                        {d.tags?.length ? <small>{d.tags.join(" · ")}</small> : null}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            {s.note ? (
              <p className="sh-foot-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => (
      <section className="sh-sec" id={s.id}>
        <div className="sh-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
          <ol className="sh-list">
            {s.items.map((it, n) => (
              <li key={n} className="sh-row" data-rv style={i(n % 4)}>
                <small>{String(n + 1).padStart(2, "0")}</small>
                <div>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                </div>
                {it.price || it.duration ? (
                  <p className="sh-row-meta">
                    {it.duration ? <span>{it.duration}</span> : null}
                    {it.price ? <b>{it.price}</b> : null}
                  </p>
                ) : (
                  <span />
                )}
                <span className="sh-row-ico" aria-hidden="true">
                  <Icon name={it.icon} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    features: (s, c) => (
      <section className="sh-sec is-ink" id={s.id}>
        <div className="sh-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="sh-feats">
            {s.items.map((it, n) => (
              <li key={n} className="sh-feat" data-rv style={i(n % 3)}>
                <span className="sh-mon" aria-hidden="true">
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
      <section className="sh-sec is-paper" id={s.id}>
        <div className="sh-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <ol className="sh-steps" data-px>
            <span className="sh-track" aria-hidden="true">
              <i />
            </span>
            {s.steps.map((st, n) => (
              <li key={n} className="sh-step" data-rv style={i(n)}>
                <small>{String(n + 1).padStart(2, "0")}</small>
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
        <section className="sh-sec" id={s.id}>
          <div className="sh-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className="sh-byobu">
              {pics.slice(0, 6).map((p, n) => (
                <figure key={n} data-rv style={i(n)}>
                  <Pic p={p} sizes="(min-width: 760px) 22vw, 58vw" />
                  <figcaption aria-hidden="true">{String(n + 1).padStart(2, "0")}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => {
      const has = Boolean(c.spec.business.openingHours?.length);
      return (
        <section className="sh-sec" id={s.id}>
          <div className="sh-wrap sh-visit is-enso">
            <div className="sh-visit-copy">
              <Head kicker={c.t.kick.hours} title={s.title} />
              {s.note ? <p data-rv>{s.note}</p> : null}
              <Hours c={c} />
              <Reach c={c} />
            </div>
            <div className="sh-enso-box">
              <Enso>
                <small>{has ? c.t.today : c.t.hours}</small>
                {has ? <NowBadge c={c} className="sh-now" /> : <p>{c.t.hoursTbc}</p>}
              </Enso>
            </div>
          </div>
        </section>
      );
    },
    contact: (s, c) => (
      <section className="sh-sec is-paper" id={s.id}>
        <div className="sh-wrap sh-visit">
          <div className="sh-visit-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            {s.showForm ? <Reach c={c} /> : null}
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="sh-form" data-rv>
              <Hanko c={c} />
              <p className="sh-eyebrow">{c.t.message}</p>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : (
            // Without a form, the business's own name plate: its seal, name and where to find it.
            <div className="sh-plate" data-rv>
              <Hanko c={c} />
              <p>{c.name}</p>
              <Reach c={c} />
            </div>
          )}
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="sh-sec" id={s.id}>
        <div className="sh-wrap sh-visit">
          <div className="sh-visit-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
          </div>
          <div className="sh-form" data-rv>
            <Hanko c={c} />
            <p className="sh-eyebrow">{c.t.submit[s.kind]}</p>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
          </div>
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="sh-sec is-paper" id={s.id}>
        <div className="sh-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} />
          <ul className="sh-noren">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 4)}>
                <a href={ch.href} {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="sh-mon" aria-hidden="true">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <span className="sh-go" aria-hidden="true">
                    {String(n + 1).padStart(2, "0")}
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
