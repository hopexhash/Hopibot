import type { CSSProperties, ReactNode } from "react";
import { NowBadge, TODAY_JS } from "./today";
import { css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, offerWords, Pic, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Kinetik: an original template (no portfolio demo). An experimental studio on off-white paper
 * with an electric palette (volt violet, hot pink, sun yellow) and one variable grotesk pushed
 * to its extremes: Archivo's width and weight axes stretch letters from condensed to wide. The
 * opening builds its headline letter by letter out of hairline-condensed type; letters near the
 * pointer stretch up, the headline leans with scroll speed and a band of the business's own
 * services runs faster the faster you scroll. Services are a list with a photo that follows the
 * cursor, the approach scrolls sideways on large screens, photographs stack as sticky cards,
 * sections slide over each other as rounded sheets and the footer hides a small easter egg.
 * Made for marketing, creative and event agencies, photographers and other studios.
 */

const CSS = `
.d-kinetik{--paper:#f2efe6;--paper2:#e6e1d3;--white:#fbfaf6;--ink:#121116;--ink2:#1e1c25;--dim:#57535f;--volt:#5b2bff;--volt-d:#4318e0;--pink:#ff3d8b;--sun:#ffd21f;--line:rgba(18,17,22,.14);--pad:clamp(16px,4vw,60px);--r:clamp(26px,3.4vw,52px);--ease:cubic-bezier(.22,1,.36,1);--spring:cubic-bezier(.34,1.56,.64,1);--wide:"Archivo Wide","Arial Black",system-ui,sans-serif;--z-bg2:var(--white);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--volt);--z-on-accent:#fbfaf6;--z-display:var(--wide);--z-display-weight:800;--z-radius:28px;--z-field-radius:16px;--z-ico-radius:16px;--z-h3:clamp(20px,1.7vw,26px);--z-sec:clamp(84px,10vw,160px);--z-statement:clamp(30px,4.6vw,76px);background:var(--paper);color:var(--ink);font-family:"Manrope",system-ui,sans-serif;font-size:clamp(16px,1.05vw,18px);font-weight:500;line-height:1.6}
.d-kinetik ::selection{background:var(--sun);color:var(--ink)}
.d-kinetik h1,.d-kinetik h2,.d-kinetik h3{font-family:var(--wide);font-weight:800;font-stretch:112%;letter-spacing:-.035em;line-height:.92;overflow-wrap:break-word}
.d-kinetik h3{line-height:1.05;letter-spacing:-.02em}
.d-kinetik h2{--fs:clamp(36px,6.2vw,108px);font-size:min(var(--fs),calc((100vw - var(--pad)*2) / (var(--lw,8) * .78)))}
.d-kinetik h2.is-long{--fs:clamp(30px,4.2vw,70px);line-height:.98}
.d-kinetik h2 em,.d-kinetik h3 em{font-style:normal;font-stretch:68%;font-weight:300;color:var(--volt)}
.d-kinetik .kt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.d-kinetik .kt-wrap{position:relative;width:min(100%,1560px);margin-inline:auto;padding-inline:var(--pad)}
.d-kinetik .kt-kick{display:inline-flex;align-items:center;gap:10px;font-family:var(--wide);font-size:12.5px;font-weight:700;font-stretch:125%;letter-spacing:.06em;text-transform:uppercase}
.d-kinetik .kt-kick b{display:inline-grid;place-items:center;min-width:38px;height:24px;padding:0 8px;border:1.5px solid currentColor;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:0}
.d-kinetik .kt-kick svg{width:14px;height:14px;color:var(--volt);transition:transform .6s var(--spring)}
.d-kinetik .kt-kick:hover svg{transform:rotate(180deg) scale(1.2)}
.d-kinetik .btn{position:relative;isolation:isolate;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:56px;max-width:100%;padding:0 28px;overflow:hidden;border:2px solid var(--ink);border-radius:999px;font-family:var(--wide);font-size:14px;font-weight:700;font-stretch:108%;letter-spacing:.01em;line-height:1.1;text-align:center;text-transform:uppercase;transition:color .35s var(--ease),border-color .35s,background-color .35s}
.d-kinetik .btn::before{content:"";position:absolute;left:50%;top:50%;z-index:-1;width:140%;aspect-ratio:1;border-radius:50%;background:var(--pink);transform:translate(-50%,-50%) scale(0);transition:transform .55s var(--ease)}
.d-kinetik .btn:hover::before{transform:translate(-50%,-50%) scale(1)}
.d-kinetik .btn svg{flex:none;width:18px;height:18px;transition:transform .45s var(--spring)}
.d-kinetik .btn:hover svg{transform:translateX(4px) rotate(-45deg)}
.d-kinetik .kt-fill{border-color:var(--volt);background:var(--volt);color:#fbfaf6}
.d-kinetik .kt-fill:hover{border-color:var(--pink);color:var(--ink)}
.d-kinetik .kt-line{background:transparent;color:var(--ink)}
.d-kinetik .kt-line:hover{color:var(--ink);border-color:var(--pink)}
.d-kinetik .kt-text{position:relative;display:inline-flex;align-items:center;gap:8px;min-height:44px;font-family:var(--wide);font-size:14px;font-weight:700;font-stretch:108%;text-transform:uppercase}
.d-kinetik .kt-text::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:3px;background:var(--pink);transform:scaleX(.25);transform-origin:0 50%;transition:transform .45s var(--ease)}
.d-kinetik .kt-text:hover::after{transform:scaleX(1)}
.d-kinetik .kt-roll{position:relative;display:inline-block;overflow:hidden;padding-block:2px}
.d-kinetik .kt-roll>span{display:block;transition:transform .5s var(--ease)}
.d-kinetik .kt-roll>span::after{content:attr(data-t);position:absolute;left:0;right:0;top:100%;padding-top:2px}
.d-kinetik .btn:hover .kt-roll>span{transform:translateY(-100%)}
.d-kinetik .kt-mag{will-change:transform;transition:translate .5s var(--spring),color .35s var(--ease),border-color .35s,background-color .35s}
.d-kinetik .kt-hdr{position:fixed;left:0;right:0;top:0;z-index:50;padding:12px var(--pad) 0;pointer-events:none;transition:transform .55s var(--ease)}
.d-kinetik.kt-hide:not(.menu-open) .kt-hdr{transform:translateY(-130%)}
.d-kinetik .kt-bar{display:flex;align-items:center;gap:14px;width:min(100%,1440px);margin-inline:auto;padding:8px 8px 8px 20px;border:1.5px solid var(--line);border-radius:999px;background:rgba(251,250,246,.86);backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4);pointer-events:auto;transition:box-shadow .4s,border-color .4s}
.d-kinetik.is-scrolled .kt-bar{border-color:rgba(18,17,22,.08);box-shadow:0 18px 40px -22px rgba(18,17,22,.45)}
.d-kinetik .kt-logo{display:flex;align-items:center;gap:10px;min-width:0;min-height:44px;font-family:var(--wide);font-size:19px;font-weight:800;font-stretch:100%;letter-spacing:-.03em;transition:font-stretch .5s var(--ease)}
.d-kinetik .kt-logo:hover{font-stretch:125%}
.d-kinetik .kt-logo svg{flex:none;width:26px;height:26px;color:var(--volt);transition:transform .8s var(--spring)}
.d-kinetik .kt-logo:hover svg{transform:rotate(225deg)}
.d-kinetik .kt-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-kinetik .kt-links{display:none;gap:2px;margin-left:auto;font-size:14.5px;font-weight:700}
.d-kinetik .kt-links a{position:relative;display:inline-flex;align-items:center;min-height:44px;padding:0 14px;border-radius:999px;transition:background-color .3s,color .3s}
.d-kinetik .kt-links a::after{content:"";position:absolute;left:14px;right:14px;bottom:9px;height:2px;background:var(--pink);transform:scaleX(0);transform-origin:100% 50%;transition:transform .4s var(--ease)}
.d-kinetik .kt-links a:hover::after{transform:scaleX(1);transform-origin:0 50%}
.d-kinetik .kt-cta{display:none;min-height:48px;padding:0 22px;font-size:13px}
.d-kinetik .kt-burger{position:relative;display:inline-flex;align-items:center;gap:12px;margin-left:auto;min-height:48px;padding:0 8px 0 18px;border:0;border-radius:999px;background:var(--ink);color:#fbfaf6;font-family:var(--wide);font-size:13px;font-weight:700;font-stretch:110%;text-transform:uppercase}
.d-kinetik .kt-burger i{position:relative;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--sun);transition:transform .6s var(--spring),background-color .3s}
.d-kinetik .kt-burger i::before,.d-kinetik .kt-burger i::after{content:"";position:absolute;width:14px;height:2px;background:var(--ink);transition:transform .45s var(--spring)}
.d-kinetik .kt-burger i::before{transform:translateY(-3px)}.d-kinetik .kt-burger i::after{transform:translateY(3px)}
.d-kinetik.menu-open .kt-burger i{background:var(--pink);transform:rotate(180deg)}
.d-kinetik.menu-open .kt-burger i::before{transform:rotate(45deg)}.d-kinetik.menu-open .kt-burger i::after{transform:rotate(-45deg)}
@media (min-width:1080px){.d-kinetik .kt-links,.d-kinetik .kt-cta{display:inline-flex}.d-kinetik .kt-burger{display:none}}
.d-kinetik .kt-prog{position:absolute;left:calc(var(--pad) + 30px);right:calc(var(--pad) + 30px);bottom:-2px;height:3px;border-radius:3px;overflow:hidden;pointer-events:none}
.d-kinetik .kt-prog i{display:block;height:100%;background:linear-gradient(90deg,var(--volt),var(--pink),var(--sun));transform:scaleX(0);transform-origin:0 50%}
.d-kinetik .kt-menu{position:fixed;inset:0;z-index:49;display:flex;flex-direction:column;justify-content:space-between;gap:28px;padding:110px var(--pad) 96px;overflow-y:auto;background:var(--volt);color:#fbfaf6;clip-path:inset(0 0 100% 0 round 0 0 60px 60px);visibility:hidden;transition:clip-path .75s var(--ease),visibility 0s .75s}
.d-kinetik .kt-menu.is-open{clip-path:inset(0 0 0 0 round 0);visibility:visible;transition:clip-path .75s var(--ease)}
.d-kinetik .kt-menu nav{display:grid;gap:2px}
.d-kinetik .kt-menu nav a{display:flex;align-items:baseline;gap:14px;min-height:56px;font-family:var(--wide);font-size:clamp(34px,10.5vw,92px);font-weight:800;font-stretch:62%;letter-spacing:-.04em;line-height:1;opacity:0;transform:translateY(40px);transition:opacity .45s,transform .7s var(--ease),font-stretch .9s var(--ease),color .25s}
.d-kinetik .kt-menu.is-open nav a{opacity:1;transform:none;font-stretch:112%;transition-delay:calc(.2s + var(--i,0) * 70ms)}
.d-kinetik .kt-menu nav a:hover{color:var(--sun)}
.d-kinetik .kt-menu nav small{font-family:"Manrope",sans-serif;font-size:13px;font-weight:700;letter-spacing:0;opacity:.7}
.d-kinetik .kt-menu-foot{display:grid;gap:14px;font-size:16px}
.d-kinetik .kt-menu-foot a{display:inline-flex;align-items:center;min-height:44px;text-decoration:underline;text-underline-offset:4px}
.d-kinetik .kt-menu-run{overflow:hidden;margin-inline:calc(var(--pad) * -1);border-block:2px solid rgba(251,250,246,.35)}
.d-kinetik .kt-menu-run p{display:flex;width:max-content;gap:28px;padding:10px 0;font-family:var(--wide);font-size:22px;font-weight:800;font-stretch:125%;white-space:nowrap;animation:kt-run 22s linear infinite}
.d-kinetik .kt-menu-run span::after{content:"✳";margin-left:28px;color:var(--sun)}
.d-kinetik .kt-menu-blob{position:absolute;right:-70px;top:96px;width:clamp(150px,34vw,320px);aspect-ratio:1;border-radius:50%;background:var(--pink);transform:scale(0);transition:transform .9s var(--spring) .2s;pointer-events:none}
.d-kinetik .kt-menu.is-open .kt-menu-blob{transform:scale(1)}
.d-kinetik .kt-menu>*{position:relative}
.d-kinetik .kt-menu>.kt-menu-blob{position:absolute}
.d-kinetik .kt-hero{position:relative;padding:clamp(112px,13vw,170px) 0 clamp(56px,7vw,110px);overflow:hidden}
.d-kinetik .kt-hero-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 20px;margin-bottom:clamp(20px,3vw,40px);animation:kt-up .9s var(--ease) .1s both}
.d-kinetik .kt-tag{display:inline-flex;flex-wrap:wrap;align-items:center;gap:10px;font-family:var(--wide);font-size:12.5px;font-weight:700;font-stretch:120%;letter-spacing:.05em;text-transform:uppercase}
.d-kinetik .kt-tag>i{width:12px;height:12px;border-radius:50%;background:var(--pink);box-shadow:16px 0 0 var(--sun),32px 0 0 var(--volt);margin-right:34px}
.d-kinetik .kt-loc{font-size:14px;font-weight:700;color:var(--dim)}
.d-kinetik .kt-now{display:inline-flex;align-items:center;gap:7px;padding:5px 12px;border-radius:999px;background:var(--ink);color:#fbfaf6;font-family:"Manrope",sans-serif;font-size:12px;font-weight:800;letter-spacing:.02em;text-transform:none}
.d-kinetik .kt-now::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor}
.d-kinetik .kt-now.is-open::before{background:#3ddc84}
.d-kinetik .kt-now.is-closed::before{background:var(--pink)}
.d-kinetik .kt-now[hidden]{display:none}
.d-kinetik .kt-h1{--fs:clamp(52px,9.4vw,172px);position:relative;z-index:2;isolation:isolate;font-size:min(var(--fs),calc((100vw - var(--pad)*2) / (var(--lw,8) * .8)));line-height:.86;letter-spacing:-.045em}
.d-kinetik .kt-h1.is-xl{--fs:clamp(60px,12.4vw,232px)}
.d-kinetik .kt-h1.is-m{--fs:clamp(44px,7.2vw,130px)}
.d-kinetik .kt-h1.is-s{--fs:clamp(36px,5.6vw,98px);line-height:.92}
.d-kinetik .kt-h1-in{display:block;transform:skewX(calc(var(--sk,0) * 1deg));transform-origin:0 100%}
.d-kinetik .kt-w{position:relative;display:inline-grid;vertical-align:top;white-space:nowrap}
.d-kinetik .kt-w>span{grid-area:1/1}
.d-kinetik .kt-ghost{visibility:hidden}
.d-kinetik .kt-l{display:inline-block;transform-origin:50% 92%;scale:1 calc(1 + var(--f,0) * .55);transition:scale .4s var(--spring),color .35s;animation:kt-letter 1.15s var(--ease) both;animation-delay:calc(.18s + var(--i,0) * 26ms)}
.d-kinetik .kt-w.kt-em{--ws:68%;--wg:300;color:var(--volt);font-stretch:68%;font-weight:300}
.d-kinetik .kt-w.kt-em::before{content:"";position:absolute;left:-.04em;right:-.04em;bottom:.08em;height:.3em;z-index:-1;background:var(--sun);transform:scaleX(0);transform-origin:0 50%;animation:kt-wipe .8s var(--ease) both;animation-delay:calc(.9s + var(--i,0) * 26ms)}
.d-kinetik .kt-h1 .kt-l.is-hot{color:var(--pink)}
.d-kinetik .kt-hero-low{position:relative;display:grid;gap:clamp(36px,5vw,60px);margin-top:clamp(28px,4vw,56px)}
@media (min-width:960px){.d-kinetik .kt-hero-low{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:end}}
.d-kinetik .kt-lede{max-width:44ch;font-size:clamp(18px,1.4vw,22px);line-height:1.5;font-weight:500;animation:kt-up 1s var(--ease) .75s both}
.d-kinetik .kt-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:12px 22px;margin-top:30px;animation:kt-up 1s var(--ease) .9s both}
.d-kinetik .kt-facts{display:flex;flex-wrap:wrap;gap:8px;margin-top:34px;animation:kt-up 1s var(--ease) 1.05s both}
.d-kinetik .kt-facts div{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px;padding:9px 16px;border:1.5px solid var(--line);border-radius:999px;background:var(--white);font-size:14px}
.d-kinetik .kt-facts dt{font-family:var(--wide);font-size:10.5px;font-weight:700;font-stretch:120%;letter-spacing:.06em;text-transform:uppercase;color:var(--volt)}
.d-kinetik .kt-facts dd{margin:0;font-weight:700}
.d-kinetik .kt-art{position:relative;justify-self:end;width:min(100%,560px);margin-top:clamp(0px,1vw,10px)}
@media (min-width:960px){.d-kinetik .is-tuck .kt-art{margin-top:clamp(-220px,-12vw,-80px)}}
.d-kinetik .kt-art-pic{position:relative;z-index:1;aspect-ratio:3/2;overflow:hidden;border-radius:999px;background:var(--paper2);clip-path:inset(48% 48% 48% 48% round 999px);animation:kt-open 1.4s var(--ease) .5s forwards}
.d-kinetik .kt-art-pic img{width:100%;height:100%;object-fit:cover;scale:1.35;animation:kt-zoom 2s var(--ease) .5s forwards;translate:calc(var(--mx,0) * -10px) calc(var(--my,0) * -8px);transition:translate .6s var(--ease)}
.d-kinetik .kt-shape{position:absolute;z-index:2;display:block;pointer-events:none;translate:calc(var(--mx,0) * var(--d,20px)) calc(var(--my,0) * var(--d,20px) + var(--p,0) * var(--sy,0px));transition:translate .7s var(--ease)}
.d-kinetik .kt-shape>i{display:block;width:100%;height:100%;animation:kt-pop .9s var(--spring) both;animation-delay:var(--dl,1s)}
.d-kinetik .kt-s1{left:-4%;top:-10%;width:clamp(70px,9vw,140px);aspect-ratio:1;--d:-26px;--sy:-50px;--dl:1.05s}
.d-kinetik .kt-s1>i{border-radius:50%;background:var(--sun)}
.d-kinetik .kt-s2{right:-3%;bottom:4%;width:clamp(110px,14vw,210px);height:clamp(46px,5.4vw,80px);--d:30px;--sy:40px;--dl:1.2s}
.d-kinetik .kt-s2>i{border-radius:999px;background:var(--pink);rotate:-18deg}
.d-kinetik .kt-s3{left:8%;bottom:-8%;width:clamp(64px,7vw,110px);aspect-ratio:1;--d:44px;--sy:-30px;--dl:1.35s;color:var(--volt)}
.d-kinetik .kt-s3>i{animation:kt-pop .9s var(--spring) var(--dl) both,kt-spin 26s linear 2.2s infinite}
.d-kinetik .kt-s3 svg{width:100%;height:100%}
.d-kinetik .kt-art-type{position:relative;z-index:1;display:grid;place-items:center;aspect-ratio:3/2;border-radius:999px;background:var(--volt);color:#fbfaf6;overflow:hidden;clip-path:inset(48% 48% 48% 48% round 999px);animation:kt-open 1.4s var(--ease) .5s forwards}
.d-kinetik .kt-art-type b{font-family:var(--wide);font-size:clamp(150px,22vw,330px);font-weight:900;font-stretch:125%;line-height:1;letter-spacing:-.06em;translate:calc(var(--mx,0) * -16px) calc(var(--my,0) * -12px);transition:translate .6s var(--ease)}
.d-kinetik .kt-art-words{position:absolute;inset:auto 0 -14px;z-index:3;display:flex;flex-wrap:wrap;justify-content:center;gap:8px}
.d-kinetik .kt-art-words li{padding:9px 16px;border-radius:999px;background:var(--ink);color:#fbfaf6;font-family:var(--wide);font-size:12.5px;font-weight:700;font-stretch:115%;text-transform:uppercase;animation:kt-pop .8s var(--spring) both;animation-delay:calc(1.3s + var(--i,0) * 120ms)}
.d-kinetik .kt-art-words li:nth-child(2){background:var(--sun);color:var(--ink);rotate:4deg}
.d-kinetik .kt-art-words li:nth-child(3){background:var(--pink);color:var(--ink);rotate:-5deg}
.d-kinetik .kt-mq{position:relative;z-index:3;overflow:hidden;background:var(--ink);color:#fbfaf6;border-radius:var(--r) var(--r) 0 0}
.d-kinetik .kt-mq-row{display:flex;width:max-content;will-change:transform}
.d-kinetik .kt-mq-row p{display:flex;align-items:center;gap:clamp(20px,2.4vw,40px);padding-right:clamp(20px,2.4vw,40px);white-space:nowrap}
.d-kinetik .kt-mq-a{padding-block:clamp(18px,2.4vw,34px)}
.d-kinetik .kt-mq-a span{font-family:var(--wide);font-size:clamp(40px,7vw,124px);font-weight:800;font-stretch:118%;letter-spacing:-.04em;line-height:1}
.d-kinetik .kt-mq-a span:nth-of-type(3n){font-stretch:64%;font-weight:300;color:var(--sun)}
.d-kinetik .kt-mq-a span:nth-of-type(3n+1){color:transparent;-webkit-text-stroke:2px #fbfaf6}
.d-kinetik .kt-mq svg{flex:none;width:clamp(28px,4vw,60px);height:auto;color:var(--pink)}
.d-kinetik .kt-mq-b{background:var(--sun);color:var(--ink);padding-block:12px}
.d-kinetik .kt-mq-b span{font-family:var(--wide);font-size:15px;font-weight:700;font-stretch:125%;letter-spacing:.04em;text-transform:uppercase}
.d-kinetik .kt-mq-b svg{width:16px;color:var(--volt)}
.d-kinetik .kt-sec{position:relative;padding-block:var(--z-sec)}
.d-kinetik .kt-sheet{z-index:1;margin-top:calc(var(--r) * -1);border-radius:var(--r) var(--r) 0 0}
.d-kinetik .is-paper{background:var(--paper)}
.d-kinetik .is-white{background:var(--white)}
.d-kinetik .is-ink{background:var(--ink);color:#fbfaf6;--z-ink:#fbfaf6;--z-dim:rgba(251,250,246,.72);--z-line:rgba(251,250,246,.18)}
.d-kinetik .is-ink h2 em{color:var(--sun)}
.d-kinetik .is-volt{background:var(--volt);color:#fbfaf6;--z-ink:#fbfaf6;--z-dim:rgba(251,250,246,.8);--z-line:rgba(251,250,246,.3)}
.d-kinetik .is-volt h2 em{color:var(--sun)}
.d-kinetik .is-sun{background:var(--sun);--z-dim:rgba(18,17,22,.74);--z-line:rgba(18,17,22,.2)}
.d-kinetik .is-sun h2 em{color:var(--volt)}
.d-kinetik .kt-head{display:grid;gap:18px;max-width:1100px;margin-bottom:clamp(40px,5.4vw,84px)}
.d-kinetik .kt-head.is-row{max-width:none}
@media (min-width:960px){.d-kinetik .kt-head.is-row{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);align-items:end;column-gap:60px}.d-kinetik .kt-head.is-row .kt-kick{grid-column:1/-1}}
.d-kinetik .kt-intro{max-width:46ch;font-size:clamp(17px,1.2vw,20px);color:var(--z-dim)}
.d-kinetik .kt-head h2>span{display:block}
.demo-js .d-kinetik .kt-head h2[data-rv]{opacity:1;transform:none}
.demo-js .d-kinetik .kt-head h2[data-rv]>span{clip-path:inset(0 0 100% 0);transform:translateY(.35em) skewY(5deg);transform-origin:0 100%;transition:clip-path 1s var(--ease),transform 1s var(--ease)}
.demo-js .d-kinetik .kt-head h2[data-rv].in>span{clip-path:inset(-10% -5% -20% -5%);transform:none}
.d-kinetik .kt-about{display:grid;gap:clamp(48px,6vw,100px);align-items:center}
@media (min-width:960px){.d-kinetik .kt-about{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}}
.d-kinetik .kt-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:1100px}
.d-kinetik .kt-about-copy{display:grid;gap:22px;align-content:start}
.d-kinetik .kt-about-copy .kt-head{margin-bottom:10px}
.d-kinetik .kt-lead{font-family:var(--wide);font-size:clamp(21px,2vw,32px);font-weight:600;font-stretch:100%;line-height:1.28;letter-spacing:-.02em}
.d-kinetik .kt-about-copy>p:not(.kt-lead){max-width:60ch;color:var(--dim)}
.d-kinetik .kt-stickers{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.d-kinetik .kt-stickers li{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 18px;border-radius:999px;background:var(--ink);color:#fbfaf6;font-weight:700;font-size:15px;rotate:var(--rt,0deg);transition:rotate .5s var(--spring),scale .5s var(--spring)}
.d-kinetik .kt-stickers li:nth-child(4n+1){background:var(--volt);--rt:-2deg}
.d-kinetik .kt-stickers li:nth-child(4n+2){background:var(--sun);color:var(--ink);--rt:2.5deg}
.d-kinetik .kt-stickers li:nth-child(4n+3){background:var(--pink);color:var(--ink);--rt:-1.5deg}
.d-kinetik .kt-stickers li:hover{rotate:0deg;scale:1.06}
.d-kinetik .kt-stickers svg{width:16px;height:16px}
.d-kinetik .kt-about-art{position:relative;justify-self:center;width:min(100%,520px);perspective:1100px}
.d-kinetik .kt-tilt{transform:rotateX(calc(var(--ry,0) * 1deg)) rotateY(calc(var(--rx,0) * 1deg));transform-style:preserve-3d;transition:transform .6s var(--ease)}
.d-kinetik .kt-about-card{position:relative;aspect-ratio:4/5;border-radius:var(--r);overflow:hidden;background:var(--paper2)}
.d-kinetik .kt-about-card img{width:100%;height:100%;object-fit:cover;scale:1.12;translate:0 calc(var(--p,0) * -4%)}
.d-kinetik .kt-about-tag{position:absolute;left:-18px;bottom:12%;z-index:2;padding:14px 22px;border-radius:999px;background:var(--pink);font-family:var(--wide);font-size:clamp(15px,1.4vw,20px);font-weight:800;font-stretch:120%;text-transform:uppercase;rotate:-8deg;transform:translateZ(60px);box-shadow:0 20px 40px -18px rgba(18,17,22,.5)}
.d-kinetik .kt-about-dot{position:absolute;right:-24px;top:-24px;z-index:2;width:clamp(76px,8vw,112px);aspect-ratio:1;border-radius:50%;background:var(--sun);transform:translateZ(90px)}
.d-kinetik .kt-about-dot svg{width:100%;height:100%;padding:24%;color:var(--ink);animation:kt-spin 18s linear infinite}
.d-kinetik .kt-list{border-top:2px solid var(--ink)}
.d-kinetik .kt-row{position:relative;isolation:isolate;display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px clamp(14px,2.4vw,40px);align-items:center;padding:clamp(22px,2.6vw,36px) clamp(4px,1.4vw,22px);border-bottom:2px solid var(--ink);cursor:default;transition:color .35s var(--ease)}
.d-kinetik .kt-row::before{content:"";position:absolute;inset:-1px 0;z-index:-1;background:var(--volt);transform:scaleY(0);transform-origin:50% 100%;transition:transform .55s var(--ease)}
.d-kinetik .kt-row-n{align-self:start;padding-top:.5em;font-family:var(--wide);font-size:13px;font-weight:700;font-stretch:125%;color:var(--volt);transition:color .3s,transform .5s var(--spring)}
.d-kinetik .kt-row-t{font-size:clamp(26px,4.2vw,68px);line-height:.95;letter-spacing:-.04em;transition:font-stretch .6s var(--ease),font-weight .6s var(--ease),letter-spacing .6s var(--ease)}
.d-kinetik .kt-row-body{display:grid;gap:12px;min-width:0}
.d-kinetik .kt-row-d{max-width:58ch;color:var(--dim);transition:color .35s}
.d-kinetik .kt-row-m{display:flex;flex-wrap:wrap;gap:8px}
.d-kinetik .kt-row-m span,.d-kinetik .kt-row-m b{padding:4px 12px;border:1.5px solid currentColor;border-radius:999px;font-size:13px;font-weight:700}
.d-kinetik .kt-row-m b{border-color:var(--ink);background:var(--ink);color:#fbfaf6}
.d-kinetik .kt-row-go{display:grid;place-items:center;width:clamp(48px,5vw,72px);aspect-ratio:1;border:2px solid currentColor;border-radius:50%;transition:transform .55s var(--spring),background-color .3s,color .3s,border-color .3s}
.d-kinetik .kt-row-go svg{width:40%;height:40%;transform:rotate(45deg);transition:transform .55s var(--spring)}
.d-kinetik .kt-row-pic{grid-column:2/-1;aspect-ratio:16/10;overflow:hidden;border-radius:22px;background:var(--paper2)}
.d-kinetik .kt-row-pic img{width:100%;height:100%;object-fit:cover}
@media (hover:hover) and (pointer:fine){.d-kinetik .kt-row:hover{color:#fbfaf6}.d-kinetik .kt-row:hover::before{transform:scaleY(1)}.d-kinetik .kt-row:hover .kt-row-t{font-stretch:125%;font-weight:900}.d-kinetik .kt-row:hover .kt-row-t em{color:var(--sun)}.d-kinetik .kt-row:hover .kt-row-n{color:var(--sun);transform:rotate(-12deg)}.d-kinetik .kt-row:hover .kt-row-d{color:rgba(251,250,246,.86)}.d-kinetik .kt-row:hover .kt-row-go{background:var(--sun);border-color:var(--sun);color:var(--ink)}.d-kinetik .kt-row:hover .kt-row-go svg{transform:rotate(0deg)}.d-kinetik .kt-row:hover .kt-row-m b{background:#fbfaf6;color:var(--ink);border-color:#fbfaf6}}
@media (hover:hover) and (pointer:fine) and (min-width:900px){.d-kinetik .kt-row-pic{display:none}}
@media (max-width:640px){.d-kinetik .kt-row{grid-template-columns:auto minmax(0,1fr)}.d-kinetik .kt-row-go{display:none}.d-kinetik .kt-row-pic{grid-column:1/-1}}
.d-kinetik .kt-peek{position:fixed;left:0;top:0;z-index:45;width:clamp(240px,22vw,360px);aspect-ratio:4/5;overflow:hidden;border-radius:28px;pointer-events:none;opacity:0;scale:.6;transition:opacity .35s var(--ease),scale .5s var(--spring);box-shadow:0 40px 80px -30px rgba(18,17,22,.6)}
.d-kinetik .kt-peek.on{opacity:1;scale:1}
.d-kinetik .kt-peek img{width:100%;height:100%;object-fit:cover}
.d-kinetik .kt-bento{display:grid;gap:clamp(12px,1.4vw,20px)}
@media (min-width:760px){.d-kinetik .kt-bento{grid-template-columns:repeat(6,minmax(0,1fr))}.d-kinetik .kt-bento>li{grid-column:span var(--span,2)}}
.d-kinetik .kt-bento>li{perspective:1000px}
.d-kinetik .kt-tile{--tc:#fbfaf6;position:relative;display:grid;gap:14px;align-content:space-between;min-height:clamp(240px,22vw,330px);height:100%;padding:clamp(24px,2.6vw,38px);overflow:hidden;border-radius:var(--r);background:var(--volt);color:#fbfaf6}
.d-kinetik .kt-tile.t-1{--tc:var(--ink);background:var(--pink);color:var(--ink)}
.d-kinetik .kt-tile.t-2{--tc:var(--ink);background:var(--sun);color:var(--ink)}
.d-kinetik .kt-tile.t-3{--tc:var(--ink);background:var(--white);color:var(--ink)}
.d-kinetik .kt-tile.t-4{background:var(--ink2);color:#fbfaf6;box-shadow:inset 0 0 0 1.5px rgba(251,250,246,.16)}
.d-kinetik .kt-tile h3{margin-bottom:10px;font-size:clamp(24px,2.3vw,36px)}
.d-kinetik .kt-tile p{max-width:44ch;opacity:.86}
.d-kinetik .kt-tile-top{display:flex;justify-content:space-between;align-items:flex-start;gap:14px}
.d-kinetik .kt-tile-ico{display:grid;place-items:center;width:58px;height:58px;border-radius:18px;background:rgba(251,250,246,.18);transition:transform .6s var(--spring),border-radius .6s var(--ease)}
.d-kinetik .kt-tile.t-1 .kt-tile-ico,.d-kinetik .kt-tile.t-2 .kt-tile-ico,.d-kinetik .kt-tile.t-3 .kt-tile-ico{background:rgba(18,17,22,.08)}
.d-kinetik .kt-tile-ico svg{width:26px;height:26px}
.d-kinetik .kt-tile:hover .kt-tile-ico{transform:rotate(-14deg) scale(1.1);border-radius:50%}
.d-kinetik .kt-tile-n{font-family:var(--wide);font-size:clamp(46px,5vw,84px);font-weight:900;font-stretch:125%;line-height:.8;color:transparent;-webkit-text-stroke:1.5px var(--tc);opacity:.55;transition:opacity .4s}
.d-kinetik .kt-tile:hover .kt-tile-n{opacity:1}
.d-kinetik .kt-tile::after{content:"";position:absolute;right:-20%;bottom:-40%;width:70%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.28),transparent 65%);transform:translate(calc(var(--rx,0) * 30px),calc(var(--ry,0) * -30px));transition:transform .6s var(--ease);pointer-events:none}
.d-kinetik .kt-hs{padding-block:var(--z-sec)}
.d-kinetik .kt-hs-track{display:grid;gap:clamp(14px,1.6vw,24px);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-kinetik .kt-step{position:relative;display:grid;gap:14px;align-content:start;min-height:280px;padding:clamp(24px,2.6vw,40px);border:2px solid var(--ink);border-radius:var(--r);background:var(--white);transition:background-color .4s,color .4s}
.d-kinetik .kt-step:hover{background:var(--ink);color:#fbfaf6}
.d-kinetik .kt-step-n{font-family:var(--wide);font-size:clamp(64px,7vw,132px);font-weight:900;font-stretch:125%;line-height:.8;letter-spacing:-.05em;color:transparent;-webkit-text-stroke:2px var(--volt);transition:color .4s,-webkit-text-stroke-color .4s}
.d-kinetik .kt-step:hover .kt-step-n{color:var(--sun);-webkit-text-stroke-color:var(--sun)}
.d-kinetik .kt-step h3{font-size:clamp(22px,2vw,32px)}
.d-kinetik .kt-step p{color:var(--dim);transition:color .4s}
.d-kinetik .kt-step:hover p{color:rgba(251,250,246,.8)}
.d-kinetik .kt-step:nth-child(3n+2){background:var(--sun)}
.d-kinetik .kt-step:nth-child(3n+3){background:var(--paper2)}
.d-kinetik .kt-step:nth-child(3n+2):hover,.d-kinetik .kt-step:nth-child(3n+3):hover{background:var(--ink)}
.d-kinetik .kt-hs-bar{display:none}
.d-kinetik .kt-hs.is-on{padding-block:0}
.d-kinetik .kt-hs.is-on .kt-hs-pin{position:sticky;top:0;display:flex;flex-direction:column;justify-content:center;height:100vh;overflow:hidden;padding-block:clamp(90px,9vh,120px) 40px}
.d-kinetik .kt-hs.is-on .kt-head{margin-bottom:clamp(24px,4vh,48px)}
.d-kinetik .kt-hs.is-on .kt-hs-track{display:flex;width:max-content;gap:24px;padding-inline:var(--pad);will-change:transform}
.d-kinetik .kt-hs.is-on .kt-step{flex:none;width:clamp(340px,31vw,500px);min-height:min(52vh,460px)}
.d-kinetik .kt-hs.is-on .kt-hs-bar{display:block;width:min(100% - var(--pad) * 2,1440px);height:4px;margin:clamp(24px,4vh,40px) auto 0;border-radius:4px;background:var(--line);overflow:hidden}
.d-kinetik .kt-hs-bar i{display:block;height:100%;background:var(--volt);transform:scaleX(var(--hp,0));transform-origin:0 50%}
.d-kinetik .kt-stack{display:grid;gap:clamp(18px,3vh,36px);padding-bottom:4vh}
.d-kinetik .kt-case{position:sticky;top:calc(96px + var(--i,0) * 18px)}
.d-kinetik .kt-case-in{position:relative;height:clamp(360px,72vh,780px);overflow:hidden;border-radius:var(--r);background:var(--ink2);transform-origin:50% 0;box-shadow:0 -30px 60px -40px rgba(0,0,0,.7)}
.d-kinetik .kt-case-in img{width:100%;height:100%;object-fit:cover;scale:1.08;transition:scale 1.2s var(--ease)}
.d-kinetik .kt-case:hover .kt-case-in img{scale:1.02}
.d-kinetik .kt-case-in::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(18,17,22,0) 45%,rgba(18,17,22,.72));pointer-events:none;opacity:calc(1 - var(--dk,0))}
.d-kinetik .kt-case-in::before{content:"";position:absolute;inset:0;z-index:2;background:#000;opacity:calc(var(--dk,0) * .5);pointer-events:none}
.d-kinetik .kt-case figcaption{position:absolute;left:clamp(16px,2.4vw,36px);right:clamp(16px,2.4vw,36px);bottom:clamp(16px,2.4vw,36px);z-index:1;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:14px;color:#fbfaf6}
.d-kinetik .kt-case figcaption span{max-width:52ch;padding:10px 18px;border-radius:999px;background:rgba(251,250,246,.94);color:var(--ink);font-size:14.5px;font-weight:700;line-height:1.35}
.d-kinetik .kt-case figcaption b{font-family:var(--wide);font-size:clamp(54px,8vw,150px);font-weight:900;font-stretch:125%;line-height:.75;letter-spacing:-.05em;color:transparent;-webkit-text-stroke:2px #fbfaf6}
.d-kinetik .kt-case:nth-child(3n+1) figcaption b{-webkit-text-stroke-color:var(--sun)}
.d-kinetik .kt-case:nth-child(3n+2) figcaption b{-webkit-text-stroke-color:var(--pink)}
@media (max-width:640px){.d-kinetik .kt-case{top:calc(84px + var(--i,0) * 12px)}.d-kinetik .kt-case-in{height:clamp(320px,62svh,560px)}.d-kinetik .kt-case figcaption span{font-size:13px;border-radius:16px}}
.d-kinetik .kt-visit{display:grid;gap:clamp(40px,5vw,80px);align-items:start}
@media (min-width:960px){.d-kinetik .kt-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-kinetik .kt-visit-copy{display:grid;gap:22px;align-content:start}
.d-kinetik .kt-visit-copy .kt-head{margin-bottom:8px}
@media (min-width:960px){.d-kinetik .kt-visit-copy h2,.d-kinetik .kt-about-copy h2{font-size:min(clamp(36px,5vw,92px),calc((50vw - var(--pad) * 2) / (var(--lw,8) * .8)))}}
.d-kinetik .kt-visit-copy>p{max-width:52ch;color:var(--z-dim)}
.d-kinetik .kt-board{padding:clamp(24px,3vw,44px);border-radius:var(--r);background:var(--ink);color:#fbfaf6;rotate:-1.2deg;transition:rotate .6s var(--spring)}
.d-kinetik .kt-board:hover{rotate:0deg}
.d-kinetik .kt-board-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:18px;font-family:var(--wide);font-size:14px;font-weight:700;font-stretch:120%;letter-spacing:.04em;text-transform:uppercase}
.d-kinetik .kt-board .kt-now{background:var(--sun);color:var(--ink)}
.d-kinetik .kt-board .z-hours,.d-kinetik .kt-board .z-hours div{border-color:rgba(251,250,246,.16)}
.d-kinetik .kt-board .z-hours div{align-items:baseline;padding:14px 12px;margin-inline:-12px;border-radius:14px}
.d-kinetik .kt-board .z-hours dt{font-family:var(--wide);font-size:clamp(15px,1.3vw,19px);font-weight:700;font-stretch:110%}
.d-kinetik .kt-board .z-hours dd{color:rgba(251,250,246,.78);font-variant-numeric:tabular-nums}
.d-kinetik .z-hours div.is-today{background:var(--volt);color:#fbfaf6;border-color:transparent}
.d-kinetik .z-hours div.is-today dd{color:#fbfaf6}
.d-kinetik .z-hours div.is-today dt::after{content:"●";margin-left:10px;color:var(--sun);font-size:.7em;vertical-align:middle}
.d-kinetik .kt-reach{display:grid;gap:4px;justify-items:start;font-style:normal}
.d-kinetik .kt-reach a,.d-kinetik .kt-reach span{display:inline-flex;align-items:center;gap:10px;min-height:44px;font-family:var(--wide);font-size:clamp(19px,1.9vw,30px);font-weight:700;font-stretch:105%;letter-spacing:-.02em;transition:font-stretch .5s var(--ease),color .3s}
.d-kinetik .kt-reach a:hover{font-stretch:125%;color:var(--volt)}
.d-kinetik .is-volt .kt-reach a:hover,.d-kinetik .is-ink .kt-reach a:hover{color:var(--sun)}
.d-kinetik .kt-reach a svg{width:.8em;height:.8em;transform:rotate(-45deg)}
.d-kinetik .kt-reach span{font-family:"Manrope",sans-serif;font-size:17px;font-weight:600;min-height:0}
.d-kinetik .kt-form{position:relative;padding:clamp(24px,3.2vw,48px);border-radius:var(--r);background:var(--white);color:var(--ink);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:rgba(18,17,22,.2);box-shadow:0 40px 80px -50px rgba(18,17,22,.55)}
.d-kinetik .kt-form-top{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:26px;font-family:var(--wide);font-size:clamp(20px,2vw,28px);font-weight:800;font-stretch:112%;letter-spacing:-.03em;line-height:1}
.d-kinetik .kt-form-top i{flex:none;display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:var(--sun);font-style:normal;animation:kt-spin 14s linear infinite}
.d-kinetik .kt-form-top i svg{width:24px;height:24px;color:var(--ink)}
.d-kinetik .z-field label,.d-kinetik .z-chipset legend{font-family:var(--wide);font-size:11px;font-weight:700;font-stretch:120%;letter-spacing:.06em;color:var(--dim)}
.d-kinetik .z-field input,.d-kinetik .z-field select,.d-kinetik .z-field textarea{border:0;border-bottom:2px solid rgba(18,17,22,.22);border-radius:0;padding-inline:2px;font-weight:600;transition:border-color .3s,background-color .3s}
.d-kinetik .z-field select{background:linear-gradient(45deg,transparent 50%,var(--ink) 50%) calc(100% - 14px) 52%/6px 6px no-repeat,linear-gradient(-45deg,transparent 50%,var(--ink) 50%) calc(100% - 8px) 52%/6px 6px no-repeat}
.d-kinetik .z-field input:focus,.d-kinetik .z-field select:focus,.d-kinetik .z-field textarea:focus{border-color:var(--volt);background-color:rgba(91,43,255,.05)}
.d-kinetik .z-field :focus-visible{outline:none}
.d-kinetik .z-form .btn{min-height:60px}
.d-kinetik .z-chips button{border:2px solid var(--ink);border-radius:999px;font-family:var(--wide);font-weight:700}
.d-kinetik .z-chips button[aria-pressed="true"]{background:var(--volt);border-color:var(--volt);color:#fbfaf6}
.d-kinetik .form-status{border:0;border-radius:16px;background:var(--sun);color:var(--ink);font-weight:700}
.d-kinetik .kt-menu-tabs{display:flex;gap:6px;max-width:100%;margin-bottom:30px;padding:6px;border-radius:999px;background:var(--paper2);overflow-x:auto;scrollbar-width:none;width:max-content}
.d-kinetik .kt-menu-tabs::-webkit-scrollbar{display:none}
.d-kinetik .kt-menu-tabs button{flex:none;min-height:46px;padding:0 22px;border:0;border-radius:999px;background:none;font-family:var(--wide);font-size:13px;font-weight:700;font-stretch:112%;text-transform:uppercase;white-space:nowrap;transition:background-color .3s,color .3s}
.d-kinetik .kt-menu-tabs button[aria-selected="true"]{background:var(--ink);color:#fbfaf6}
.d-kinetik .kt-dishes{display:grid;gap:0 clamp(30px,5vw,80px);border-top:2px solid var(--ink)}
.d-kinetik .kt-dishes[hidden]{display:none}
@media (min-width:900px){.d-kinetik .kt-dishes{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-kinetik .kt-dish{display:grid;gap:6px;padding:20px 0;border-bottom:1.5px solid var(--line);animation:kt-up .6s var(--ease) both;animation-delay:calc(var(--i,0) * 50ms)}
.d-kinetik .kt-dish-row{display:flex;align-items:baseline;justify-content:space-between;gap:16px}
.d-kinetik .kt-dish h3{font-size:clamp(18px,1.5vw,22px);font-stretch:108%}
.d-kinetik .kt-dish b{flex:none;padding:3px 12px;border-radius:999px;background:var(--volt);color:#fbfaf6;font-family:var(--wide);font-size:14px;font-weight:700;font-stretch:110%}
.d-kinetik .kt-dish p{color:var(--dim);font-size:.95em}
.d-kinetik .kt-dish small{display:flex;flex-wrap:wrap;gap:6px}
.d-kinetik .kt-dish small span{padding:2px 10px;border-radius:999px;background:var(--sun);font-size:12px;font-weight:800}
.d-kinetik .kt-note{margin-top:28px;font-size:14px;color:var(--z-dim)}
.d-kinetik .kt-chan{display:grid;gap:clamp(12px,1.4vw,20px);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-kinetik .kt-chan a{position:relative;display:grid;gap:12px;align-content:start;height:100%;min-height:220px;padding:clamp(24px,2.6vw,36px);border:2px solid var(--ink);border-radius:var(--r);background:var(--white);transition:background-color .4s,color .4s,transform .5s var(--spring)}
.d-kinetik .kt-chan a:hover{background:var(--volt);color:#fbfaf6;transform:translateY(-6px) rotate(-1deg)}
.d-kinetik .kt-chan a>span:first-child{display:grid;place-items:center;width:54px;height:54px;border-radius:50%;background:var(--sun);color:var(--ink)}
.d-kinetik .kt-chan svg{width:24px;height:24px}
.d-kinetik .kt-chan h3{font-size:clamp(22px,2vw,30px)}
.d-kinetik .kt-chan p{color:var(--dim);transition:color .4s}
.d-kinetik .kt-chan a:hover p{color:rgba(251,250,246,.84)}
.d-kinetik .kt-faq{max-width:1100px}
.d-kinetik .kt-faq details{border-bottom:2px solid var(--ink)}
.d-kinetik .kt-faq details:first-child{border-top:2px solid var(--ink)}
.d-kinetik .kt-faq summary{display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:44px;padding:clamp(20px,2.2vw,30px) 0;font-family:var(--wide);font-size:clamp(18px,1.8vw,28px);font-weight:700;font-stretch:104%;letter-spacing:-.02em;line-height:1.15;list-style:none;cursor:pointer;transition:color .3s,font-stretch .5s var(--ease)}
.d-kinetik .kt-faq summary::-webkit-details-marker{display:none}
.d-kinetik .kt-faq summary:hover{color:var(--volt)}
.d-kinetik .kt-faq summary i{position:relative;flex:none;display:grid;place-items:center;width:48px;height:48px;border:2px solid var(--ink);border-radius:50%;transition:transform .5s var(--spring),background-color .3s,border-color .3s}
.d-kinetik .kt-faq summary i::before,.d-kinetik .kt-faq summary i::after{content:"";position:absolute;width:16px;height:2px;background:var(--ink)}
.d-kinetik .kt-faq summary i::after{transform:rotate(90deg)}
.d-kinetik .kt-faq details[open] summary i{transform:rotate(135deg);background:var(--pink);border-color:var(--pink)}
.d-kinetik .kt-faq details[open] summary{color:var(--volt)}
.d-kinetik .kt-faq details>p{max-width:68ch;padding:0 70px 28px 0;color:var(--dim);animation:kt-up .5s var(--ease)}
.d-kinetik .z-sec.z-cta{background:var(--volt);color:#fbfaf6;--z-dim:rgba(251,250,246,.82);border-radius:var(--r) var(--r) 0 0;margin-top:calc(var(--r) * -1);z-index:1}
.d-kinetik .z-cta h2{font-size:clamp(38px,6.6vw,118px);max-width:16ch}
.d-kinetik .z-cta h2 em{color:var(--sun)}
.d-kinetik .z-cta .kt-fill{background:var(--sun);border-color:var(--sun);color:var(--ink)}
.d-kinetik .z-statement{background:var(--paper)}
.d-kinetik .z-statement h2{max-width:22ch;font-size:var(--z-statement);line-height:1}
.d-kinetik .z-statement h2 em{position:relative;z-index:0;color:var(--ink);font-stretch:62%;font-weight:300}
.d-kinetik .z-statement h2 em::before{content:"";position:absolute;left:-.04em;right:-.04em;bottom:-.04em;height:.24em;z-index:-1;background:var(--pink);transform:scaleX(0);transform-origin:0 50%;transition:transform 1s var(--ease) .4s}
.d-kinetik .z-statement h2.in em::before{transform:scaleX(1)}
.d-kinetik .z-statement .kt-kick{color:var(--volt)}
.d-kinetik .z-showcase{margin:0 clamp(8px,1.4vw,20px);border-radius:var(--r);min-height:min(86svh,820px)}
.d-kinetik .z-showcase .z-show-in h2{font-size:clamp(40px,7vw,128px);max-width:14ch}
.d-kinetik .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(91,43,255,.05),rgba(18,17,22,.76))}
.d-kinetik .z-showcase h2 em{color:var(--sun)}
.d-kinetik .z-pack.is-featured .z-ticks li::before{background:var(--sun)}
.d-kinetik .z-showcase .kt-line{border-color:#fbfaf6;color:#fbfaf6}
.d-kinetik .z-card,.d-kinetik .z-panel{border:2px solid var(--ink);border-radius:var(--r);background:var(--white)}
.d-kinetik .z-pack{transition:transform .5s var(--spring),background-color .4s}
.d-kinetik .z-pack:hover{transform:translateY(-8px) rotate(-.8deg)}
.d-kinetik .z-pack.is-featured{background:var(--volt);border-color:var(--volt);color:#fbfaf6;--z-ink:#fbfaf6;--z-dim:rgba(251,250,246,.8)}
.d-kinetik .z-pack.is-featured .z-tag{align-self:start;justify-self:start;padding:5px 12px;border-radius:999px;background:var(--sun);color:var(--ink);rotate:-4deg}
.d-kinetik .z-pack h3{font-size:clamp(24px,2.2vw,34px)}
.d-kinetik .z-pack-price b{font-stretch:120%;letter-spacing:-.04em}
.d-kinetik .z-tag{font-family:var(--wide);font-weight:700;font-stretch:120%}
.d-kinetik .z-ticks li::before{width:10px;height:10px;top:.55em;border-radius:50%;background:var(--pink)}
.d-kinetik .z-team .z-pic{border-radius:var(--r)}
.d-kinetik .z-team li{transition:transform .5s var(--spring)}
.d-kinetik .z-team li:hover{transform:rotate(-1.2deg) translateY(-6px)}
.d-kinetik .z-quotes blockquote{padding:clamp(24px,2.6vw,36px);border:2px solid var(--ink);border-radius:var(--r);background:var(--white)}
.d-kinetik .z-quotes blockquote:nth-child(3n+2){background:var(--sun)}
.d-kinetik .z-quotes blockquote>p{font-family:"Manrope",sans-serif;font-weight:600}
.d-kinetik .z-ba{border-radius:var(--r)}
.d-kinetik .z-steps small,.d-kinetik .z-rows small{font-family:var(--wide);font-size:13px;font-weight:700;font-stretch:125%}
.d-kinetik .z-ico{border:0;background:var(--sun);color:var(--ink)}
.d-kinetik .z-acc summary{font-family:var(--wide);font-weight:700}
.d-kinetik .kt-foot{position:relative;z-index:1;margin-top:calc(var(--r) * -1);padding:clamp(70px,8vw,120px) 0 130px;border-radius:var(--r) var(--r) 0 0;background:var(--ink);color:#fbfaf6;overflow:hidden}
.d-kinetik .kt-foot-cta{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:28px;padding-bottom:clamp(40px,5vw,70px);border-bottom:1.5px solid rgba(251,250,246,.16)}
.d-kinetik .kt-foot-cta p{max-width:18ch;font-family:var(--wide);font-size:clamp(30px,4.4vw,72px);font-weight:800;font-stretch:112%;letter-spacing:-.04em;line-height:.95}
.d-kinetik .kt-foot-cta p em{font-style:normal;font-stretch:64%;font-weight:300;color:var(--sun)}
.d-kinetik .kt-big{display:grid;place-items:center;width:clamp(170px,16vw,230px);overflow-wrap:anywhere;aspect-ratio:1;border-radius:50%;background:var(--sun);color:var(--ink);font-family:var(--wide);font-size:12.5px;font-weight:800;font-stretch:100%;line-height:1.15;text-align:center;text-transform:uppercase;padding:24px;transition:background-color .4s,color .4s,translate .5s var(--spring)}
.d-kinetik .kt-big:hover{background:var(--pink)}
.d-kinetik .kt-big>span{display:grid;justify-items:center;gap:8px}
.d-kinetik .kt-big svg{width:30px;height:30px;transform:rotate(-45deg);transition:transform .6s var(--spring)}
.d-kinetik .kt-big:hover svg{transform:rotate(0deg) scale(1.2)}
.d-kinetik .kt-foot-grid{display:grid;gap:34px;margin-top:clamp(40px,5vw,70px);grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}
.d-kinetik .kt-foot-grid h3{margin-bottom:12px;font-size:12px;font-weight:700;font-stretch:125%;letter-spacing:.08em;text-transform:uppercase;color:var(--sun)}
.d-kinetik .kt-foot-grid a,.d-kinetik .kt-foot-grid span{display:block;padding:5px 0;color:rgba(251,250,246,.84)}
.d-kinetik .kt-foot-grid a{display:flex;align-items:center;min-height:36px;padding:0;transition:color .25s,translate .4s var(--spring)}
.d-kinetik .kt-foot-grid a:hover{color:#fbfaf6;translate:6px 0}
.d-kinetik .kt-foot-grid p{color:rgba(251,250,246,.74)}
.d-kinetik .kt-mark{position:relative;display:flex;flex-wrap:nowrap;justify-content:center;margin:clamp(50px,7vw,100px) 0 10px;font-family:var(--wide);font-size:min(24vw,calc((100vw - var(--pad) * 2) / (var(--n,7) * .84)));font-weight:900;font-stretch:125%;letter-spacing:-.06em;line-height:.8;white-space:nowrap;user-select:none}
.d-kinetik .kt-mark .kt-l{animation:none;transform-origin:50% 100%}
.d-kinetik .kt-mark .kt-l:nth-child(3n+1){color:#fbfaf6}.d-kinetik .kt-mark .kt-l:nth-child(3n+2){color:var(--volt)}.d-kinetik .kt-mark .kt-l:nth-child(3n){color:var(--pink)}
.d-kinetik .kt-mark .kt-l.is-hot{color:var(--sun)}
.d-kinetik .kt-mark .kt-sp{display:inline-block;width:.25em}
.d-kinetik .kt-mark.is-fallen .kt-l{animation:kt-fall 1.25s cubic-bezier(.5,0,.6,1) both;animation-delay:calc(var(--i,0) * 45ms)}
.d-kinetik .kt-mark.is-back .kt-l{animation:kt-rise .9s var(--spring) both;animation-delay:calc(var(--i,0) * 35ms)}
.d-kinetik .kt-egg{display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;margin-top:22px}
.d-kinetik .kt-egg button{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 18px;border:1.5px dashed rgba(251,250,246,.4);border-radius:999px;background:none;color:rgba(251,250,246,.8);font-family:var(--wide);font-size:11.5px;font-weight:700;font-stretch:120%;letter-spacing:.06em;text-transform:uppercase;transition:border-color .3s,color .3s,background-color .3s}
.d-kinetik .kt-egg button:hover{border-color:var(--pink);border-style:solid;color:#fbfaf6;background:rgba(255,61,139,.14)}
.d-kinetik .kt-egg button i{width:10px;height:10px;border-radius:50%;background:var(--pink)}
.d-kinetik .kt-egg p{font-family:var(--wide);font-size:14px;font-weight:700;font-stretch:110%;color:var(--sun)}
.d-kinetik .kt-egg p:empty{display:none}
.d-kinetik .kt-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:34px;padding-top:22px;border-top:1.5px solid rgba(251,250,246,.16);font-size:13px;color:rgba(251,250,246,.66)}
.d-kinetik.no-photos .kt-hero::before{content:"";position:absolute;left:-10%;top:-30%;width:60%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(255,210,31,.36),transparent 68%);pointer-events:none}
@keyframes kt-letter{0%{opacity:0;translate:0 .6em;font-stretch:62%;font-weight:150}55%{opacity:1}100%{opacity:1;translate:0 0;font-stretch:var(--ws,112%);font-weight:var(--wg,800)}}
@keyframes kt-wipe{to{transform:scaleX(1)}}
@keyframes kt-up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes kt-open{to{clip-path:inset(0 0 0 0 round 999px)}}
@keyframes kt-zoom{to{scale:1.06}}
@keyframes kt-pop{from{opacity:0;transform:scale(0) rotate(-40deg)}to{opacity:1;transform:none}}
@keyframes kt-spin{to{rotate:360deg}}
@keyframes kt-run{to{transform:translateX(-50%)}}
@keyframes kt-drip{0%{background-position:0 100%}100%{background-position:0 -100%}}
@keyframes kt-fall{0%{translate:0 0;rotate:0deg;scale:1}55%{translate:var(--dx,0) var(--dy,300px);rotate:var(--rt,20deg);scale:.42}70%{translate:var(--dx,0) calc(var(--dy,300px) - 46px);rotate:calc(var(--rt,20deg) * 1.15)}84%{translate:var(--dx,0) var(--dy,300px)}92%{translate:var(--dx,0) calc(var(--dy,300px) - 10px)}100%{translate:var(--dx,0) var(--dy,300px);rotate:var(--rt,20deg);scale:.42}}
@keyframes kt-rise{from{translate:var(--dx,0) var(--dy,300px);rotate:var(--rt,20deg);scale:.42}to{translate:0 0;rotate:0deg;scale:1}}
@media (prefers-reduced-motion:reduce){.demo-js .d-kinetik .kt-head h2[data-rv]>span{clip-path:none;transform:none}.d-kinetik .kt-l,.d-kinetik .kt-w.kt-em::before,.d-kinetik .kt-art-pic,.d-kinetik .kt-art-pic img,.d-kinetik .kt-art-type,.d-kinetik .kt-shape>i,.d-kinetik .kt-s3>i,.d-kinetik .kt-art-words li,.d-kinetik .kt-hero-top,.d-kinetik .kt-lede,.d-kinetik .kt-ctas,.d-kinetik .kt-facts,.d-kinetik .kt-menu-run p,.d-kinetik .kt-form-top i,.d-kinetik .kt-about-dot svg{animation:none!important;opacity:1;clip-path:none;transform:none}.d-kinetik .kt-w.kt-em::before{transform:scaleX(1)}.d-kinetik .kt-art-pic img{scale:1.04}.d-kinetik .kt-mark.is-fallen .kt-l{animation:none;translate:var(--dx,0) var(--dy,300px);rotate:var(--rt,0deg);scale:.42}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The behaviour of the design, in plain script:
 *  - the header slides away while scrolling down and returns on the way up; a bar shows progress;
 *  - scroll speed is measured once per frame: it leans the headline and drives the running bands;
 *  - letters in [data-kin] stretch up near the pointer; [data-mx] zones move their shapes;
 *  - [data-peek] rows show their photograph next to the cursor; .kt-mag buttons are magnetic;
 *  - [data-tilt] cards tilt toward the pointer; the approach scrolls sideways on large screens;
 *  - stacked cards darken and shrink as the next one slides over; the footer egg drops the letters.
 * Everything heavy only runs on a fine pointer and without reduced motion.
 */
const JS = `(function(){var d=document,W=window,b=d.querySelector('.d-kinetik');if(!b)return;
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches;
var prog=d.querySelector('.kt-prog i'),hero=d.querySelector('.kt-hero'),lean=d.querySelector('.kt-h1-in');
var lastY=W.scrollY,vel=0,ly=W.scrollY,hidden=false;
var mqs=q('.kt-mq-row').map(function(r){return{el:r,x:0,dir:+(r.getAttribute('data-dir')||1),w:0,on:true}});
function measure(){mqs.forEach(function(m){var p=m.el.firstElementChild;m.w=p?p.offsetWidth:0})}
measure();W.addEventListener('resize',measure);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(measure);
if('IntersectionObserver' in W&&mqs.length){var mio=new IntersectionObserver(function(es){es.forEach(function(e){mqs.forEach(function(m){if(m.el===e.target)m.on=e.isIntersecting})})});mqs.forEach(function(m){mio.observe(m.el)})}
var hs=q('.kt-hs'),stacks=q('[data-stack]');
function setupHs(){hs.forEach(function(s){var on=!reduce&&W.innerWidth>=1000&&W.innerHeight>=560;s.classList.toggle('is-on',on);var t=s.querySelector('.kt-hs-track');if(!t)return;if(!on){s.style.height='';t.style.transform='';return}var dist=Math.max(0,t.scrollWidth-W.innerWidth);s._dist=dist;s.style.height=(W.innerHeight+dist)+'px'})}
setupHs();W.addEventListener('resize',setupHs);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(setupHs);
var tops=[];function measureStacks(){tops=stacks.map(function(st){return q('.kt-case',st).map(function(c){return parseFloat(getComputedStyle(c).top)||0})})}measureStacks();W.addEventListener('resize',measureStacks);
var seen=-1;
function tick(){var y=W.scrollY,dy=y-ly;ly=y;vel+=(dy-vel)*.14;
if(y!==seen){seen=y;
if(prog){var max=d.documentElement.scrollHeight-W.innerHeight;prog.style.transform='scaleX('+(max>0?Math.min(1,y/max):0)+')'}
if(Math.abs(y-lastY)>8){var down=y>lastY;var h=down&&y>W.innerHeight*.5;if(h!==hidden){hidden=h;b.classList.toggle('kt-hide',h)}lastY=y}
hs.forEach(function(s){if(!s.classList.contains('is-on'))return;var r=s.getBoundingClientRect();if(r.bottom<0||r.top>W.innerHeight)return;var span=r.height-W.innerHeight,p=span>0?Math.max(0,Math.min(1,-r.top/span)):0;var t=s.querySelector('.kt-hs-track');if(t)t.style.transform='translate3d('+(-p*(s._dist||0)).toFixed(1)+'px,0,0)';s.style.setProperty('--hp',p.toFixed(3))});
if(!reduce)stacks.forEach(function(st,j){var sr=st.getBoundingClientRect();if(sr.bottom<0||sr.top>W.innerHeight)return;var cs=q('.kt-case',st);cs.forEach(function(c,k){var n=cs[k+1],inn=c.firstElementChild;if(!inn)return;if(!n){inn.style.transform='';return}var r=n.getBoundingClientRect(),h=inn.offsetHeight||1,p=Math.max(0,Math.min(1,1-(r.top-(tops[j][k+1]||0))/h));inn.style.transform='scale('+(1-p*.07).toFixed(4)+')';c.style.setProperty('--dk',p.toFixed(3))})})}
if(!reduce){if(lean){var sk=Math.max(-12,Math.min(12,vel*-.35));if(Math.abs(sk)<.01)sk=0;lean.style.setProperty('--sk',sk.toFixed(2))}
mqs.forEach(function(m){if(!m.on||!m.w)return;m.x-=(.7+Math.min(14,Math.abs(vel)*.5))*m.dir*(vel<-0.5?-1:1);if(m.x<=-m.w)m.x+=m.w;if(m.x>0)m.x-=m.w;m.el.style.transform='translate3d('+m.x.toFixed(1)+'px,0,0)'})}
requestAnimationFrame(tick)}
requestAnimationFrame(tick);
if(!fine||reduce)return;
q('[data-kin]').forEach(function(zone){var ls=q('.kt-l',zone),raf=0,px=-9999,py=-9999,R=Math.max(140,W.innerWidth*.12);
function upd(){raf=0;ls.forEach(function(l){var r=l.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dist=Math.hypot(px-cx,(py-cy)*1.3),f=Math.max(0,1-dist/R);f=f*f;var v=f.toFixed(2);if(l._f!==v){l._f=v;l.style.setProperty('--f',v);l.classList.toggle('is-hot',f>.45)}})}
var host=zone.closest('section,footer')||zone;host.addEventListener('pointermove',function(e){px=e.clientX;py=e.clientY;if(!raf)raf=requestAnimationFrame(upd)});host.addEventListener('pointerleave',function(){px=py=-9999;if(!raf)raf=requestAnimationFrame(upd)})});
q('[data-mx]').forEach(function(z){z.addEventListener('pointermove',function(e){var r=z.getBoundingClientRect();z.style.setProperty('--mx',((e.clientX-r.left)/r.width*2-1).toFixed(3));z.style.setProperty('--my',((e.clientY-r.top)/r.height*2-1).toFixed(3))});z.addEventListener('pointerleave',function(){z.style.setProperty('--mx',0);z.style.setProperty('--my',0)})});
q('.kt-mag').forEach(function(m){m.addEventListener('pointermove',function(e){var r=m.getBoundingClientRect();m.style.translate=((e.clientX-r.left-r.width/2)*.28).toFixed(1)+'px '+((e.clientY-r.top-r.height/2)*.38).toFixed(1)+'px'});m.addEventListener('pointerleave',function(){m.style.translate=''})});
q('[data-tilt]').forEach(function(t){var host=t.parentNode;host.addEventListener('pointermove',function(e){var r=host.getBoundingClientRect();t.style.setProperty('--rx',(((e.clientX-r.left)/r.width-.5)*14).toFixed(2));t.style.setProperty('--ry',(((e.clientY-r.top)/r.height-.5)*-12).toFixed(2))});host.addEventListener('pointerleave',function(){t.style.setProperty('--rx',0);t.style.setProperty('--ry',0)})});
var rows=q('[data-peek]');if(rows.length){var pk=d.createElement('div');pk.className='kt-peek';pk.setAttribute('aria-hidden','true');var im=d.createElement('img');im.alt='';pk.appendChild(im);b.appendChild(pk);var x=0,y=0,tx=0,ty=0,raf2=0;
function loop(){x+=(tx-x)*.16;y+=(ty-y)*.16;var rot=Math.max(-14,Math.min(14,(tx-x)*.06));pk.style.transform='translate3d('+(x-pk.offsetWidth/2).toFixed(1)+'px,'+(y-pk.offsetHeight/2).toFixed(1)+'px,0) rotate('+rot.toFixed(2)+'deg)';raf2=Math.abs(tx-x)+Math.abs(ty-y)>.4?requestAnimationFrame(loop):0}
rows.forEach(function(r){r.addEventListener('pointerenter',function(e){if(im.getAttribute('src')!==r.getAttribute('data-peek'))im.src=r.getAttribute('data-peek');if(!pk.classList.contains('on')){x=tx=e.clientX;y=ty=e.clientY}pk.classList.add('on');if(!raf2)raf2=requestAnimationFrame(loop)});r.addEventListener('pointerleave',function(){pk.classList.remove('on')});r.addEventListener('pointermove',function(e){tx=e.clientX+(e.clientX>W.innerWidth*.6?-200:200);ty=e.clientY;if(!raf2)raf2=requestAnimationFrame(loop)})})}
})();
(function(){var d=document,W=window;[].slice.call(d.querySelectorAll('[data-egg]')).forEach(function(btn){var foot=btn.closest('footer'),mark=foot&&foot.querySelector('.kt-mark'),msg=foot&&foot.querySelector('[data-egg-msg]'),lab=btn.querySelector('span');if(!mark)return;var down=false;
btn.addEventListener('click',function(){down=!down;if(down){var fr=foot.getBoundingClientRect();[].slice.call(mark.querySelectorAll('.kt-l')).forEach(function(l){var r=l.getBoundingClientRect();var dy=Math.max(40,fr.bottom-r.bottom-14-Math.random()*24);l.style.setProperty('--dy',dy.toFixed(0)+'px');l.style.setProperty('--dx',((Math.random()-.5)*Math.min(160,W.innerWidth*.12)).toFixed(0)+'px');l.style.setProperty('--rt',((Math.random()-.5)*160).toFixed(0)+'deg')});mark.classList.remove('is-back');mark.classList.add('is-fallen')}else{mark.classList.remove('is-fallen');mark.classList.add('is-back')}
if(msg)msg.textContent=down?msg.getAttribute('data-msg'):'';if(lab)lab.textContent=btn.getAttribute(down?'data-b':'data-a');btn.setAttribute('aria-pressed',down?'true':'false')})})})();`;

type Words = { egg: string; back: string; msg: string; talk: string };
const LABELS: Record<string, Words> = {
  nl: { egg: "Niet op drukken", back: "Zet alles terug", msg: "Oeps. 404: zwaartekracht niet gevonden.", talk: "Begin hier" },
  en: { egg: "Do not press", back: "Put it all back", msg: "Oops. 404: gravity not found.", talk: "Start here" },
  de: { egg: "Nicht drücken", back: "Alles zurück", msg: "Hoppla. 404: Schwerkraft nicht gefunden.", talk: "Hier anfangen" },
  fr: { egg: "Ne pas appuyer", back: "Tout remettre", msg: "Oups. 404 : gravité introuvable.", talk: "Commencer ici" },
};
const lab = (c: Ctx) => LABELS[c.spec.meta.lang] ?? LABELS.en;

/** Width of the longest word, in characters: the stylesheet sizes large lines so it always fits. */
const lw = (text: string) => Math.max(4, ...text.replace(/\*/g, "").split(/\s+/).map((w) => w.length));
const fit = (text: string, extra: Record<string, string | number> = {}) => css({ "--lw": lw(text), ...extra }) as CSSProperties;

const Star = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 0c1.6 9.6 4.4 12.4 14 14-9.6 1.6-12.4 4.4-14 14-1.6-9.6-4.4-12.4-14-14 9.6-1.6 12.4-4.4 14-14Z" transform="translate(0 6)" fill="currentColor" />
  </svg>
);
const Burst = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path
      d="M50 2l7 26 22-16-9 26 27-2-23 15 23 15-27-2 9 26-22-16-7 26-7-26-22 16 9-26-27 2 23-15L3 36l27 2-9-26 22 16Z"
      fill="currentColor"
    />
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

/** A button of this design: a rolling label, a pink bubble on hover and a magnetic pull. */
function KBtn({ href, children, variant = "fill" }: { href: string; children: string; variant?: "fill" | "line" }) {
  const ext = /^https?:/.test(href);
  return (
    <a className={`btn kt-${variant} kt-mag`} href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span className="kt-roll">
        <span data-t={children}>{children}</span>
      </span>
      <Arrow />
    </a>
  );
}

/**
 * Words of a line as letters, each letter a span (for the stretch-in and the pointer). A word
 * is a little grid: an invisible copy at its final width keeps the lines from moving while the
 * letters widen. *Marked* words are set condensed and light, with a highlight behind them.
 */
function Letters({ text, start = 0 }: { text: string; start?: number }) {
  const out: ReactNode[] = [];
  let k = start;
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w, m) => {
        const marked = n % 2 === 1;
        const first = k;
        out.push(
          <span key={`${n}-${m}`} className={`kt-w${marked ? " kt-em" : ""}`} style={i(first)}>
            <span className="kt-ghost">{w}</span>
            <span>
              {[...w].map((ch, j) => (
                <span key={j} className="kt-l" style={i(k++)}>
                  {ch}
                </span>
              ))}
            </span>
          </span>,
          " ",
        );
      }),
  );
  return <>{out}</>;
}

function Head({ kicker, title, intro, id, n, row }: { kicker?: string; title: string; intro?: string; id?: string; n?: number; row?: boolean }) {
  return (
    <header className={`kt-head${row && intro ? " is-row" : ""}`}>
      {kicker ? (
        <p className="kt-kick" data-rv>
          {n != null ? <b>{String(n + 1).padStart(2, "0")}</b> : <Star />}
          {kicker}
        </p>
      ) : null}
      <h2 id={id} className={title.replace(/\*/g, "").length > 44 ? "is-long" : undefined} style={fit(title)} data-rv>
        <span>{em(title)}</span>
      </h2>
      {intro ? (
        <p className="kt-intro" data-rv>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

function KReach({ c }: { c: Ctx }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email && !b.mapsUrl) return null;
  return (
    <address className="kt-reach" data-rv>
      {b.phone ? (
        <a href={tel(b.phone)}>
          {b.phone} <Arrow />
        </a>
      ) : null}
      {b.email ? (
        <a href={`mailto:${b.email}`}>
          {b.email} <Arrow />
        </a>
      ) : null}
      {b.address ? <span>{b.address}</span> : null}
      {b.mapsUrl ? (
        <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
          {c.t.route} <Arrow />
        </a>
      ) : null}
    </address>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const run = [c.name, b.city, ...offerWords(c, 4)].filter(Boolean) as string[];
  return (
    <>
      <header className="kt-hdr hdr">
        <div className="kt-bar">
          <a href="#top" className="kt-logo" aria-label={c.name}>
            <Star />
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="kt-links" data-nav>
            {c.nav.slice(0, 5).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn kt-fill kt-cta">
            {cta.label}
          </a>
          <button type="button" className="kt-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
        <div className="kt-prog" aria-hidden="true">
          <i />
        </div>
      </header>
      <div id="site-menu" className="kt-menu" data-nav inert>
        <span className="kt-menu-blob" aria-hidden="true" />
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{String(k + 1).padStart(2, "0")}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="kt-menu-foot">
          <div className="kt-menu-run" aria-hidden="true">
            <p>
              {[...run, ...run, ...run, ...run].map((w, k) => (
                <span key={k}>{w}</span>
              ))}
            </p>
          </div>
          <p>
            <a href={cta.href}>{cta.label}</a>
            {b.phone ? (
              <>
                {" · "}
                <a href={tel(b.phone)}>{b.phone}</a>
              </>
            ) : null}
          </p>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length <= 20 ? "is-xl" : plain.length <= 40 ? "" : plain.length <= 60 ? "is-m" : "is-s";
  const facts = heroFacts(c);
  const words = offerWords(c, 3);
  return (
    <>
      <section className="kt-hero" data-mx>
        <div className="kt-wrap">
          <div className="kt-hero-top">
            <p className="kt-tag">
              <i aria-hidden="true" />
              {hero.eyebrow}
              <NowBadge c={c} className="kt-now" />
            </p>
            {c.spec.business.city ? <p className="kt-loc">{c.spec.business.city}</p> : null}
          </div>
          <h1 className={`kt-h1 ${size}`.trim()} style={fit(hero.headline)}>
            <span className="kt-sr">{plain}</span>
            <span className="kt-h1-in" aria-hidden="true" data-kin>
              <Letters text={hero.headline} />
            </span>
          </h1>
          <div className={`kt-hero-low${plain.length <= 34 ? " is-tuck" : ""}`}>
            <div>
              <p className="kt-lede">{hero.subheadline}</p>
              <div className="kt-ctas">
                <KBtn href={hero.primaryCta.href}>{hero.primaryCta.label}</KBtn>
                {hero.secondaryCta ? (
                  <a href={hero.secondaryCta.href} className="kt-text">
                    {hero.secondaryCta.label}
                  </a>
                ) : null}
              </div>
              {facts.length > 0 && (
                <dl className="kt-facts">
                  {facts.map((f) => (
                    <div key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            <div className="kt-art">
              <span className="kt-shape kt-s1" data-px aria-hidden="true">
                <i />
              </span>
              <span className="kt-shape kt-s2" data-px aria-hidden="true">
                <i />
              </span>
              <span className="kt-shape kt-s3" data-px aria-hidden="true">
                <i>
                  <Burst />
                </i>
              </span>
              {p ? (
                <figure className="kt-art-pic">
                  <Pic p={p} eager sizes="(min-width: 960px) 40vw, 92vw" />
                </figure>
              ) : (
                <div className="kt-art-type" aria-hidden="true">
                  <b>{c.name.charAt(0)}</b>
                  {words.length > 0 && (
                    <ul className="kt-art-words">
                      {words.map((w, k) => (
                        <li key={w} style={i(k)}>
                          {w}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Band c={c} />
    </>
  );
}

/** What the studio does, running across the screen: faster (and backwards) with the scroll. */
function Band({ c }: { c: Ctx }) {
  const list = offerWords(c, 8);
  if (list.length < 3) return null;
  const row = [...list, ...list];
  const small = [c.name, c.spec.business.city, ...list].filter(Boolean) as string[];
  const part = (words: string[], k: number) => (
    <p key={k}>
      {words.flatMap((w, n) => [<span key={`w${n}`}>{w}</span>, <Star key={`s${n}`} />])}
    </p>
  );
  return (
    <div className="kt-mq" aria-hidden="true">
      <div className="kt-mq-row kt-mq-a" data-dir="1">
        {part(row, 0)}
        {part(row, 1)}
      </div>
      <div className="kt-mq-row kt-mq-b" data-dir="-1">
        {part([...small, ...small], 0)}
        {part([...small, ...small], 1)}
      </div>
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const L = lab(c);
  const cta = c.spec.hero.primaryCta;
  let k = 0;
  const letters = c.name.length <= 18 ? c.name : c.name.split(" ")[0];
  return (
    <footer className="kt-foot">
      <div className="kt-wrap">
        <div className="kt-foot-cta">
          <p>{em(c.spec.business.tagline || cta.label)}</p>
          <a href={cta.href} className="kt-big kt-mag">
            <span>
              <Arrow />
              {cta.label}
            </span>
          </a>
        </div>
        <div className="kt-foot-grid">
          <div>
            <h3>{c.t.explore}</h3>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </div>
          {b.address || b.phone || b.email || b.mapsUrl ? (
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
          ) : null}
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
        <p className="kt-mark" aria-hidden="true" data-kin style={css({ "--n": Math.max(5, letters.length) })}>
          {[...letters].map((ch, n) =>
            ch === " " ? (
              <span key={n} className="kt-sp" />
            ) : (
              <span key={n} className="kt-l" style={i(k++)}>
                {ch}
              </span>
            ),
          )}
        </p>
        <div className="kt-egg">
          <button type="button" data-egg data-a={L.egg} data-b={L.back} aria-pressed="false">
            <i aria-hidden="true" />
            <span>{L.egg}</span>
          </button>
          <p data-egg-msg data-msg={L.msg} role="status" aria-live="polite" />
        </div>
        <Legal c={c} className="kt-legal" />
      </div>
    </footer>
  );
}

/** Spans of the six-column bento grid, by number of tiles: never two alike in a row. */
const BENTO: Record<number, number[]> = { 1: [6], 2: [3, 3], 3: [4, 2, 6], 4: [4, 2, 2, 4], 5: [3, 3, 2, 2, 2], 6: [4, 2, 2, 4, 3, 3] };

export const kinetik: Family = {
  key: "kinetik",
  root: "d-kinetik",
  fonts: ["Archivo Wide", "Manrope"],
  themeColor: "#f2efe6",
  accent: "#5b2bff",
  onAccent: "#fbfaf6",
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "kt-wrap", eyebrow: "kt-kick", btn: "kt-fill", btnAlt: "kt-line", btnText: "kt-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c, n) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="kt-sec is-paper" id={s.id}>
          <div className={`kt-wrap kt-about${p ? "" : " is-solo"}`}>
            <div className="kt-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} n={n} />
              <p className="kt-lead" data-rv>
                {first}
              </p>
              {rest.map((x, k) => (
                <p key={k} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="kt-stickers" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>
                      <Icon name="check" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {p ? (
              <div className="kt-about-art" data-rv>
                <div className="kt-tilt" data-tilt>
                  <figure className="kt-about-card" data-px>
                    <Pic p={p} sizes="(min-width: 960px) 36vw, 92vw" />
                  </figure>
                  {c.spec.business.city ? <span className="kt-about-tag">{c.spec.business.city}</span> : null}
                  <span className="kt-about-dot" aria-hidden="true">
                    <Burst />
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c, n) => (
      <section className="kt-sec kt-sheet is-white" id={s.id}>
        <div className="kt-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} n={n} row />
          <ol className="kt-list">
            {s.items.map((it, k) => {
              const p = c.photo(`art:svc${k}`);
              return (
                <li key={k} className="kt-row" data-rv style={i(k % 4)} {...(p ? { "data-peek": p.src } : {})}>
                  <span className="kt-row-n">{String(k + 1).padStart(2, "0")}</span>
                  <div className="kt-row-body">
                    <h3 className="kt-row-t">{it.title}</h3>
                    <p className="kt-row-d">{it.description}</p>
                    {it.duration || it.price ? (
                      <p className="kt-row-m">
                        {it.duration ? <span>{it.duration}</span> : null}
                        {it.price ? <b>{it.price}</b> : null}
                      </p>
                    ) : null}
                  </div>
                  <span className="kt-row-go" aria-hidden="true">
                    <Arrow />
                  </span>
                  {p ? (
                    <figure className="kt-row-pic">
                      <Pic p={p} sizes="(min-width: 640px) 80vw, 92vw" />
                    </figure>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    ),
    features: (s, c, n) => {
      const spans = BENTO[s.items.length] ?? s.items.map(() => 2);
      return (
        <section className="kt-sec kt-sheet is-ink" id={s.id}>
          <div className="kt-wrap">
            <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} n={n} row />
            <ul className="kt-bento">
              {s.items.map((it, k) => (
                <li key={k} data-rv style={css({ "--i": k % 3, "--span": spans[k] ?? 2 })}>
                  <div className={`kt-tile kt-tilt t-${k % 5}`} data-tilt>
                    <div className="kt-tile-top">
                      <span className="kt-tile-ico">
                        <Icon name={it.icon} />
                      </span>
                      <span className="kt-tile-n" aria-hidden="true">
                        {String(k + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3>{it.title}</h3>
                      <p>{it.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    },
    process: (s, c, n) => (
      <section className="kt-sec kt-sheet is-paper kt-hs" id={s.id}>
        <div className="kt-hs-pin">
          <div className="kt-wrap">
            <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} n={n} row />
          </div>
          <div className="kt-hs-view">
            <ol className="kt-hs-track kt-wrap">
              {s.steps.map((st, k) => (
                <li key={k} className="kt-step" data-rv style={i(k % 4)}>
                  <span className="kt-step-n" aria-hidden="true">
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <h3>{st.title}</h3>
                  <p>{st.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="kt-hs-bar" aria-hidden="true">
            <i />
          </div>
        </div>
      </section>
    ),
    gallery: (s, c, n) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="kt-sec kt-sheet is-ink" id={s.id}>
          <div className="kt-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} n={n} />
            <div className="kt-stack" data-stack>
              {pics.slice(0, 8).map((p, k) => (
                <figure key={k} className="kt-case" style={i(k)}>
                  <div className="kt-case-in">
                    <Pic p={p} sizes="(min-width: 1560px) 1440px, 94vw" />
                    <figcaption>
                      <span aria-hidden="true">{p.alt}</span>
                      <b aria-hidden="true">{String(k + 1).padStart(2, "0")}</b>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    menu: (s, c, n) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      const tab = (k: number) => `${s.id}-tab-${k}`;
      return (
        <section className="kt-sec kt-sheet is-white" id={s.id}>
          <div className="kt-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} n={n} row />
            {cats.length > 1 ? (
              <div className="kt-menu-tabs" role="tablist" aria-label={s.title.replace(/\*/g, "")} data-rv>
                {cats.map((cat, k) => (
                  <button key={k} type="button" role="tab" id={tab(k)} aria-selected={k === 0} aria-controls={`${s.id}-panel-${k}`} tabIndex={k === 0 ? 0 : -1}>
                    {cat.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="kt-kick" data-rv>
                {cats[0].name}
              </p>
            )}
            {cats.map((cat, k) => (
              <div key={k} id={`${s.id}-panel-${k}`} className="kt-dishes" role={cats.length > 1 ? "tabpanel" : undefined} aria-labelledby={cats.length > 1 ? tab(k) : undefined} hidden={k > 0}>
                {cat.items.map((d, m) => (
                  <div key={m} className="kt-dish" style={i(m)}>
                    <div className="kt-dish-row">
                      <h3>{d.name}</h3>
                      {d.price ? <b>{d.price}</b> : null}
                    </div>
                    {d.description ? <p>{d.description}</p> : null}
                    {d.tags?.length ? (
                      <small>
                        {d.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </small>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
            {s.note ? (
              <p className="kt-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    hours: (s, c, n) => (
      <section className="kt-sec kt-sheet is-sun" id={s.id}>
        <div className="kt-wrap kt-visit">
          <div className="kt-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} n={n} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <KReach c={c} />
          </div>
          <div className="kt-board" data-rv>
            <p className="kt-board-top">
              {c.t.hours}
              <NowBadge c={c} className="kt-now" />
            </p>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p>{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    contact: (s, c, n) => (
      <section className="kt-sec kt-sheet is-paper" id={s.id}>
        <div className="kt-wrap kt-visit">
          <div className="kt-visit-copy">
            <Head kicker={c.t.kick.contact} title={s.title} n={n} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <KReach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") && c.spec.business.openingHours?.length ? (
              <div className="kt-board" data-rv>
                <p className="kt-board-top">
                  {c.t.hours}
                  <NowBadge c={c} className="kt-now" />
                </p>
                <Hours c={c} />
              </div>
            ) : null}
          </div>
          {s.showForm ? (
            <div className="kt-form" data-rv>
              <p className="kt-form-top">
                {c.t.send}
                <i aria-hidden="true">
                  <Arrow />
                </i>
              </p>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : null}
        </div>
      </section>
    ),
    booking: (s, c, n) => (
      <section className="kt-sec kt-sheet is-volt" id={s.id}>
        <div className="kt-wrap kt-visit">
          <div className="kt-visit-copy">
            <Head kicker={c.t.kick.booking} title={s.title} n={n} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <KReach c={c} />
            {c.spec.business.openingHours?.length ? (
              <div className="kt-board" data-rv>
                <p className="kt-board-top">
                  {c.t.hours}
                  <NowBadge c={c} className="kt-now" />
                </p>
                <Hours c={c} />
              </div>
            ) : null}
          </div>
          <div className="kt-form" data-rv>
            <p className="kt-form-top">
              {lab(c).talk}
              <i aria-hidden="true">
                <Burst />
              </i>
            </p>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
          </div>
        </div>
      </section>
    ),
    order: (s, c, n) => (
      <section className="kt-sec kt-sheet is-white" id={s.id}>
        <div className="kt-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} n={n} row />
          <ul className="kt-chan">
            {s.channels.map((ch, k) => (
              <li key={k} data-rv style={i(k % 3)}>
                <a href={ch.href} {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span>
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
    faq: (s, c, n) => (
      <section className="kt-sec kt-sheet is-white" id={s.id}>
        <div className="kt-wrap kt-faq">
          <Head kicker={c.t.kick.faq} title={s.title} n={n} />
          <div data-acc>
            {s.items.map((it, k) => (
              <details key={k} data-rv style={i(k % 4)}>
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
  },
};
