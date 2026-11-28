import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, splitLines, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Flora: an original template (no portfolio demo). Botanical and romantic: linen paper, sage,
 * deep forest green and blush, a light italic serif with a quiet sans. Photographs sit in soft
 * organic shapes that slowly change form, fine-line pressed flowers draw themselves (in the
 * opening on arrival, further down as you scroll past them), petals drift with the scroll, a
 * garland of the business's own offer flows along a curved line, the process grows as a vine
 * whose buds open, the gallery is a loose garden collage and the opening hours are a herbarium
 * sheet with today marked. Made for florists, garden centres, landscapers, wedding and event
 * planners and other businesses that work with what grows.
 */

const ALL = `
.d-flora{--paper:#f5f0e6;--linen:#ebe3d4;--petal:#fbf8f1;--sage:#a3b49b;--sage-l:#dde5d5;--fern:#587659;--forest:#1d3a2e;--forest-2:#284a3b;--moss:#142a21;--blush:#f0d2c9;--blush-l:#f7e7e1;--rose:#b9776b;--rose-d:#94564b;--ink:#1c2a23;--dim:#56645b;--line:rgba(29,58,46,.16);--pad:clamp(20px,5vw,80px);--ease:cubic-bezier(.23,.7,.18,1);--soft:cubic-bezier(.45,.05,.25,1);--serif:"Cormorant",Georgia,serif;--sans:"DM Sans",system-ui,sans-serif;--leaf:clamp(36px,4vw,64px) 10px clamp(36px,4vw,64px) 10px;--z-bg2:var(--petal);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--forest);--z-on-accent:#fbf8f1;--z-display:var(--serif);--z-display-weight:400;--z-radius:28px;--z-field-radius:0;--z-ico-radius:50%;--z-sec:clamp(84px,11vw,170px);--z-h3:clamp(24px,2.1vw,32px);--z-statement:clamp(34px,4.6vw,72px);background:var(--paper);color:var(--ink);font-family:var(--sans);font-weight:300;font-size:clamp(16px,1.04vw,18px);line-height:1.72}
.d-flora ::selection{background:var(--blush);color:var(--forest)}
.d-flora h1,.d-flora h2,.d-flora h3{font-family:var(--serif);font-weight:400;line-height:1.02;letter-spacing:-.012em}
.d-flora h1 em,.d-flora h2 em,.d-flora h3 em{font-style:italic;font-weight:400;color:var(--rose)}
.d-flora h2{font-size:clamp(42px,5.6vw,88px);font-weight:300}
.d-flora h2.is-long{font-size:clamp(34px,4vw,62px)}
.d-flora h3{font-size:var(--z-h3)}
.d-flora .fl-wrap{position:relative;width:min(100%,1320px);margin-inline:auto;padding-inline:var(--pad)}
.d-flora .fl-kick{display:inline-flex;align-items:center;gap:12px;font-family:var(--sans);font-size:12.5px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--fern)}
.d-flora .fl-kick svg{flex:none;width:22px;height:22px;overflow:visible;fill:none;stroke:currentColor;stroke-width:1.2;stroke-linecap:round;stroke-linejoin:round;transition:transform .9s var(--ease)}
.d-flora .fl-kick.in svg{transform:rotate(-14deg)}
.d-flora .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:56px;padding:0 30px;border-radius:999px;font-family:var(--sans);font-size:15px;font-weight:500;letter-spacing:.02em;overflow:hidden;isolation:isolate;transition:color .45s var(--ease),background-color .45s var(--ease),border-color .45s,transform .6s var(--ease)}
.d-flora .btn svg{width:18px;height:18px;flex:none;fill:none;stroke:currentColor;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;transition:transform .7s var(--ease)}
.d-flora .btn:hover svg{transform:rotate(-24deg) scale(1.15)}
.d-flora .fl-fill{background:var(--forest);color:var(--petal)}
.d-flora .fl-fill::before{content:"";position:absolute;left:50%;top:50%;z-index:-1;width:140%;aspect-ratio:1;border-radius:42% 58% 50% 50%/55% 45% 55% 45%;background:var(--rose);transform:translate(-50%,-50%) scale(0) rotate(-40deg);transition:transform .8s var(--ease)}
.d-flora .fl-fill:hover::before{transform:translate(-50%,-50%) scale(1) rotate(0)}
.d-flora .fl-fill:hover{transform:translateY(-2px)}
.d-flora .fl-line{border:1px solid var(--forest);color:var(--forest);background:transparent}
.d-flora .fl-line:hover{background:var(--forest);color:var(--petal)}
.d-flora .fl-text{position:relative;display:inline-flex;align-items:center;gap:10px;min-height:44px;font-weight:500;color:var(--forest)}
.d-flora .fl-text::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:1px;background:currentColor;transform-origin:right;transition:transform .7s var(--ease)}
.d-flora .fl-text:hover::after{transform:scaleX(0)}
.d-flora .fl-text svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.4;stroke-linecap:round}
.d-flora .fl-hdr{position:sticky;top:0;z-index:40;transition:background-color .5s,box-shadow .5s}
.d-flora.is-scrolled .fl-hdr{background:rgba(245,240,230,.88);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);box-shadow:0 1px 0 var(--line)}
.d-flora .fl-bar{display:flex;align-items:center;gap:24px;height:92px;transition:height .5s var(--ease)}
.d-flora.is-scrolled .fl-bar{height:72px}
.d-flora .fl-logo{position:relative;z-index:41;display:flex;align-items:center;gap:12px;min-width:0;font-family:var(--serif);font-size:clamp(23px,2vw,30px);font-style:italic;font-weight:500;line-height:1;color:var(--forest)}
.d-flora .fl-logo svg{flex:none;width:30px;height:38px;overflow:visible;fill:none;stroke:currentColor;stroke-width:1.2;stroke-linecap:round;stroke-linejoin:round;transform-origin:50% 100%;transition:transform 1s var(--ease)}
.d-flora .fl-logo:hover svg{transform:rotate(-12deg)}
.d-flora .fl-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-flora .fl-links{display:none;gap:30px;margin-left:auto;font-size:15px;font-weight:400}
.d-flora .fl-links a{position:relative;padding:10px 0}
.d-flora .fl-links a::after{content:"";position:absolute;left:0;bottom:4px;width:100%;height:1px;background:var(--rose);transform:scaleX(0);transform-origin:left;transition:transform .6s var(--ease)}
.d-flora .fl-links a::before{content:"";position:absolute;right:-7px;bottom:1px;width:7px;height:7px;border-radius:0 70% 0 70%;background:var(--rose);transform:scale(0) rotate(-30deg);transition:transform .5s var(--ease) .2s}
.d-flora .fl-links a:hover::after{transform:none}
.d-flora .fl-links a:hover::before{transform:none}
.d-flora .fl-cta{display:none;min-height:48px;padding:0 24px}
.d-flora .fl-burger{position:relative;z-index:41;display:flex;align-items:center;gap:12px;margin-left:auto;min-height:48px;padding:0 6px 0 18px;border:1px solid var(--line);border-radius:999px;background:rgba(251,248,241,.7);font-size:14px;font-weight:500;letter-spacing:.06em;color:var(--forest)}
.d-flora .fl-burger i{position:relative;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--forest)}
.d-flora .fl-burger i::before,.d-flora .fl-burger i::after{content:"";position:absolute;width:14px;height:1.4px;background:var(--petal);transition:transform .6s var(--ease)}
.d-flora .fl-burger i::before{transform:translateY(-3px)}
.d-flora .fl-burger i::after{transform:translateY(3px)}
.d-flora.menu-open .fl-burger i::before{transform:rotate(45deg)}
.d-flora.menu-open .fl-burger i::after{transform:rotate(-45deg)}
@media (max-width:440px){.d-flora .fl-logo{font-size:21px}.d-flora .fl-burger{padding-left:6px}.d-flora .fl-burger span{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}}
@media (min-width:1040px){.d-flora .fl-links,.d-flora .fl-cta{display:inline-flex}.d-flora .fl-burger{display:none}}
.d-flora .fl-menu{position:fixed;inset:0 0 0 auto;z-index:39;display:flex;flex-direction:column;justify-content:space-between;gap:28px;width:min(100%,560px);padding:112px var(--pad) 112px;background:var(--sage-l);color:var(--forest);overflow:hidden auto;border-radius:50% 0 0 50%/50% 0 0 50%;clip-path:inset(0 0 0 100%);visibility:hidden;transition:clip-path .9s var(--ease),border-radius 1.1s var(--ease),visibility 0s .9s}
.d-flora .fl-menu.is-open{clip-path:inset(0);border-radius:0;visibility:visible;transition:clip-path .9s var(--ease),border-radius 1.1s var(--ease)}
.d-flora .fl-menu nav{position:relative;z-index:1;display:grid;gap:2px}
.d-flora .fl-menu nav a{display:flex;align-items:baseline;gap:16px;min-height:60px;font-family:var(--serif);font-size:clamp(38px,9vw,58px);font-style:italic;font-weight:400;line-height:1.1;opacity:0;transform:translateX(40px);transition:opacity .6s,transform .9s var(--ease),color .3s}
.d-flora .fl-menu nav a small{font-family:var(--sans);font-size:12px;font-style:normal;letter-spacing:.2em;color:var(--fern)}
.d-flora .fl-menu nav a:hover{color:var(--rose-d)}
.d-flora .fl-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.3s + var(--i,0) * 70ms)}
.d-flora .fl-menu p{position:relative;z-index:1;font-size:16px}
.d-flora .fl-menu p a{display:inline-flex;align-items:center;min-height:44px;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:5px}
.d-flora .fl-menu .fl-msprig{position:absolute;right:-30px;bottom:-20px;width:min(50vw,280px);height:auto;opacity:.32}
.d-flora .fl-menu.is-open .fl-msprig path{animation:fl-draw 2.6s var(--ease) .4s forwards}
.d-flora.menu-open .fl-hdr{background:transparent;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-flora .fl-scrim{position:fixed;inset:0;z-index:38;background:rgba(20,42,33,.32);opacity:0;visibility:hidden;transition:opacity .6s,visibility 0s .6s}
.d-flora.menu-open .fl-scrim{opacity:1;visibility:visible;transition:opacity .6s}
.d-flora .fl-draw{overflow:visible;fill:none;stroke:var(--forest);stroke-width:1.1;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}
.d-flora .fl-draw path,.d-flora .fl-draw circle{stroke-dasharray:1 2;stroke-dashoffset:1.01}
.d-flora .fl-draw .fl-fill-leaf{fill:rgba(163,180,155,.0);transition:fill 1.2s}
html:not(.demo-js) .d-flora .fl-draw path,html:not(.demo-js) .d-flora .fl-draw circle{stroke-dashoffset:0}
.d-flora .fl-scroll path,.d-flora .fl-scroll circle{stroke-dashoffset:clamp(0,calc((var(--p,0) - .05) * 1.6),1.01)}
.d-flora .fl-hero{position:relative;padding:clamp(20px,4vw,56px) 0 clamp(70px,9vw,140px);overflow:hidden}
.d-flora .fl-hero-grid{position:relative;z-index:1;display:grid;gap:clamp(56px,6vw,96px);align-items:center}
@media (min-width:980px){.d-flora .fl-hero-grid{grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr)}}
.d-flora .fl-hero-top{display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;margin-bottom:clamp(20px,2.4vw,34px)}
.d-flora .fl-in{animation:fl-rise 1.3s var(--ease) both;animation-delay:calc(1s + var(--i,0) * 160ms)}
.d-flora .fl-hero-top .fl-kick{animation-delay:.15s}
.d-flora .fl-now{display:inline-flex;align-items:center;gap:9px;min-height:32px;padding:4px 14px 4px 10px;border:1px solid var(--line);border-radius:999px;background:var(--petal);font-size:13px;font-weight:500;letter-spacing:.04em;animation:fl-rise 1s var(--ease) .5s both}
.d-flora .fl-now::before{content:"";width:12px;height:12px;border-radius:50% 0 50% 0;background:currentColor;transform:rotate(45deg)}
.d-flora .fl-now.is-open{color:var(--fern)}
.d-flora .fl-now.is-closed{color:var(--rose-d)}
.d-flora .fl-hero h1{font-size:clamp(50px,7.8vw,124px);font-weight:300;line-height:.98;letter-spacing:-.02em;color:var(--forest)}
.d-flora .fl-hero h1.is-m{font-size:clamp(44px,6.2vw,98px)}
.d-flora .fl-hero h1.is-s{font-size:clamp(38px,4.8vw,74px);line-height:1.02}
.d-flora .fl-ln{display:block;padding:.04em 0 .1em;margin-bottom:-.06em}
.d-flora .fl-ln>span{display:inline-block;-webkit-mask-image:linear-gradient(100deg,#000 42%,transparent 58%);mask-image:linear-gradient(100deg,#000 42%,transparent 58%);-webkit-mask-size:260% 100%;mask-size:260% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:100% 0;mask-position:100% 0;transform:translateY(.18em);animation:fl-ink 2s var(--soft) both;animation-delay:calc(.25s + var(--i,0) * 240ms)}
.d-flora .fl-ln:nth-child(2)>span{padding-left:clamp(0px,4vw,72px)}
.d-flora .fl-ln:nth-child(3)>span{padding-left:clamp(0px,1.6vw,28px)}
.d-flora .fl-ln em{position:relative;white-space:nowrap}
.d-flora .fl-stem{display:block;width:min(300px,62%);height:30px;margin:6px 0 0 clamp(0px,4vw,72px);overflow:visible}
.d-flora .fl-stem path{fill:none;stroke:var(--rose);stroke-width:1.3;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.01;animation:fl-draw 2.2s var(--ease) 1.1s forwards}
.d-flora .fl-lede{max-width:44ch;margin-top:22px;font-size:clamp(17px,1.3vw,20px);color:var(--dim)}
.d-flora .fl-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px 30px;margin-top:36px}
.d-flora .fl-tag{position:relative;display:grid;width:min(100%,460px);margin-top:48px;padding:22px 26px 18px 54px;border:1px solid var(--line);border-radius:6px 26px 26px 6px;background:var(--petal);transform:rotate(-1.4deg);transform-origin:0 50%;box-shadow:0 22px 40px -32px rgba(20,42,33,.55);transition:transform 1.2s var(--ease)}
.d-flora .fl-tag:hover{transform:rotate(.6deg)}
.d-flora .fl-tag::before{content:"";position:absolute;left:20px;top:50%;width:13px;height:13px;border:1px solid var(--line);border-radius:50%;background:var(--paper);transform:translateY(-50%)}
.d-flora .fl-tag::after{content:"";position:absolute;left:-46px;top:50%;width:66px;height:1px;background:linear-gradient(90deg,transparent,var(--rose));transform:rotate(-8deg);transform-origin:right}
.d-flora .fl-tag div{display:grid;grid-template-columns:128px minmax(0,1fr);gap:12px;padding:7px 0;border-bottom:1px dashed var(--line)}
.d-flora .fl-tag div:last-child{border-bottom:0}
.d-flora .fl-tag dt{font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--fern);padding-top:4px}
.d-flora .fl-tag dd{margin:0;font-family:var(--serif);font-size:19px;font-style:italic;line-height:1.35;color:var(--forest);overflow-wrap:anywhere}
.d-flora .fl-tag dd a{text-decoration:underline;text-decoration-color:var(--blush);text-decoration-thickness:2px;text-underline-offset:4px}
@media (max-width:520px){.d-flora .fl-tag{padding-left:44px}.d-flora .fl-tag::before{left:15px}.d-flora .fl-tag::after{display:none}.d-flora .fl-tag div{grid-template-columns:minmax(0,1fr);gap:0}}
.d-flora .fl-art{position:relative;justify-self:center;width:min(100%,560px);aspect-ratio:1/1.08}
.d-flora .fl-halo{position:absolute;inset:-5% -6% -3% -4%;width:auto;height:auto;overflow:visible;fill:none;stroke:var(--rose);stroke-width:.8;opacity:.7;animation:fl-turn 70s linear infinite,fl-fade 2s var(--ease) .6s both}
.d-flora .fl-bloom{position:absolute;inset:4% 6% 6% 4%;overflow:hidden;border-radius:58% 42% 47% 53%/52% 58% 42% 48%;background:var(--sage-l);animation:fl-unfurl 2.2s var(--ease) .2s both,fl-morph 18s ease-in-out 2.4s infinite alternate}
.d-flora .fl-bloom img{width:100%;height:100%;object-fit:cover;transform:scale(1.2) rotate(8deg);animation:fl-settle 2.8s var(--ease) .2s forwards}
.d-flora .fl-bloom.is-empty{display:grid;place-items:center;background:var(--blush-l)}
.d-flora .fl-bloom.is-empty>span{font-family:var(--serif);font-size:clamp(220px,34vw,440px);font-style:italic;font-weight:300;line-height:1;color:var(--blush);transform:translate(4%,-4%)}
.d-flora .fl-bloom.is-empty .fl-draw{position:absolute;inset:8% 14% 0;width:72%;height:92%}
.d-flora .fl-bloom.is-empty .fl-draw path,.d-flora .fl-bloom.is-empty .fl-draw circle{animation:fl-draw 3.2s var(--ease) forwards;animation-delay:calc(.8s + var(--j,0) * 140ms)}
.d-flora .fl-bud{position:absolute;left:-4%;bottom:-2%;width:34%;aspect-ratio:1;overflow:hidden;border:8px solid var(--paper);border-radius:50%;animation:fl-pop 1.4s var(--ease) 1.3s both}
.d-flora .fl-bud img{width:100%;height:100%;object-fit:cover}
.d-flora .fl-art .fl-draw{position:absolute}
.d-flora .fl-art>.fl-draw path,.d-flora .fl-art>.fl-draw circle{animation:fl-draw 2.8s var(--ease) forwards;animation-delay:calc(1.2s + var(--j,0) * 110ms)}
.d-flora .fl-art .s1{right:-6%;top:-8%;width:clamp(90px,11vw,150px);height:auto;transform:rotate(18deg)}
.d-flora .fl-art .s2{left:-10%;top:16%;width:clamp(70px,8vw,110px);height:auto;transform:rotate(-14deg)}
.d-flora .fl-art .s3{right:2%;bottom:-10%;width:clamp(80px,9vw,130px);height:auto;transform:rotate(8deg)}
@media (max-width:620px){.d-flora .fl-art .s2{left:-4%}.d-flora .fl-art .s1{right:-2%}}
.d-flora .fl-petals{position:absolute;inset:0;z-index:0;pointer-events:none}
.d-flora .fl-petal{position:absolute;display:block;width:var(--w,22px);transform:translate3d(calc(var(--p,0) * var(--x,30px)),calc(var(--p,0) * var(--y,-120px)),0) rotate(calc(var(--r,0deg) + var(--p,0) * 70deg));transition:transform .4s linear}
.d-flora .fl-petal svg{display:block;width:100%;height:auto;overflow:visible;animation:fl-sway var(--t,9s) ease-in-out infinite alternate}
.d-flora .fl-petal path{fill:var(--blush);stroke:var(--rose);stroke-width:.7}
.d-flora .fl-petal.is-leaf path{fill:var(--sage-l);stroke:var(--fern)}
.d-flora .fl-garland{position:relative;z-index:2;margin-block:clamp(-30px,-2vw,-10px) 0;color:var(--forest)}
.d-flora .fl-garland+.fl-sec{padding-top:clamp(48px,6vw,96px)}
.d-flora .fl-garland svg{display:block;width:100%;height:auto;overflow:visible}
.d-flora .fl-garland .is-narrow{display:none}
@media (max-width:760px){.d-flora .fl-garland .is-wide{display:none}.d-flora .fl-garland .is-narrow{display:block}}
.d-flora .fl-garland .fl-gline{fill:none;stroke:var(--sage);stroke-width:1;stroke-dasharray:2 7;stroke-linecap:round}
.d-flora .fl-garland text{font-family:var(--serif);font-style:italic;font-weight:400;fill:var(--forest)}
.d-flora .fl-garland tspan.fl-dot{fill:var(--rose);font-style:normal}
.d-flora .fl-sec{position:relative;padding-block:var(--z-sec)}
.d-flora .fl-sec.is-linen{background:var(--linen)}
.d-flora .fl-sec.is-sage{background:var(--sage-l)}
.d-flora .fl-sec.is-forest{background:var(--forest);color:var(--petal)}
.d-flora .fl-sec.is-forest h2,.d-flora .fl-sec.is-forest h3{color:var(--petal)}
.d-flora .fl-sec.is-forest h2 em{color:var(--blush)}
.d-flora .fl-sec.is-forest .fl-kick{color:var(--sage)}
.d-flora .fl-dome{border-radius:50% 50% 0 0/clamp(28px,4.4vw,74px) clamp(28px,4.4vw,74px) 0 0;margin-top:clamp(-74px,-4.4vw,-28px);z-index:1}
.d-flora .fl-head{display:grid;gap:18px;max-width:780px;margin-bottom:clamp(44px,5.4vw,80px)}
.d-flora .fl-head.is-center{justify-items:center;margin-inline:auto;text-align:center}
.d-flora .fl-head.is-row{max-width:none}
@media (min-width:920px){.d-flora .fl-head.is-row{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);align-items:end;column-gap:64px}.d-flora .fl-head.is-row>.fl-kick{grid-column:1/-1}}
.d-flora .fl-head>p:not(.fl-kick){max-width:52ch;color:var(--dim)}
.d-flora .is-forest .fl-head>p:not(.fl-kick){color:rgba(251,248,241,.74)}
.d-flora .fl-flourish{display:block;width:150px;height:18px;overflow:visible;fill:none;stroke:var(--rose);stroke-width:1.1;stroke-linecap:round}
.d-flora .fl-flourish path{stroke-dasharray:1 2;stroke-dashoffset:1.01;transition:stroke-dashoffset 1.8s var(--ease) .3s}
.d-flora .fl-flourish.in path,html:not(.demo-js) .d-flora .fl-flourish path{stroke-dashoffset:0}
.demo-js .d-flora .fl-flourish[data-rv]{opacity:1;transform:none}
.demo-js .d-flora [data-rv]{transform:translateY(24px) scale(.985);transition-duration:1.2s,1.2s;transition-timing-function:var(--ease)}
.demo-js .d-flora [data-rv].in{transform:none}
.d-flora .fl-about{display:grid;gap:clamp(56px,6vw,110px);align-items:center}
@media (min-width:960px){.d-flora .fl-about{grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr)}}
.d-flora .fl-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:920px;margin-inline:auto}
.d-flora .fl-about-art{position:relative;padding:0 8% 10% 0}
.d-flora .fl-about-art>figure{position:relative;aspect-ratio:4/5;overflow:hidden;border-radius:46% 54% 50% 50%/34% 34% 66% 66%;background:var(--sage-l);animation:fl-morph-b 22s ease-in-out infinite alternate}
.d-flora .fl-about-art>figure img{width:100%;height:115%;object-fit:cover;transform:translateY(calc(var(--p,0) * -6%))}
.d-flora .fl-about-art .fl-draw{position:absolute;right:-4%;bottom:-2%;width:clamp(120px,15vw,210px);height:auto}
.d-flora .fl-about-art .fl-ring{position:absolute;left:-5%;top:6%;width:30%;aspect-ratio:1;border:1px solid var(--rose);border-radius:50%;transform:translateY(calc(var(--p,0) * 40px))}
.d-flora .fl-about-copy{display:grid;gap:22px}
.d-flora .fl-about-copy .fl-lead{font-family:var(--serif);font-size:clamp(23px,2vw,31px);font-style:italic;line-height:1.42;color:var(--forest)}
.d-flora .fl-about-copy>p{color:var(--dim)}
.d-flora .is-solo .fl-about-copy{justify-items:center;text-align:center}
.d-flora .is-solo .fl-about-copy>p{max-width:62ch}
.d-flora .fl-solo-art{display:flex;justify-content:center;gap:clamp(20px,4vw,60px);margin-bottom:10px}
.d-flora .fl-solo-art .fl-draw{width:clamp(70px,9vw,110px);height:auto}
.d-flora .fl-leaves{display:grid;gap:12px;margin-top:8px}
.d-flora .fl-leaves li{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--line);font-size:16px;color:var(--ink)}
.d-flora .fl-leaves svg{flex:none;width:26px;height:26px;fill:var(--sage-l);stroke:var(--fern);stroke-width:1.1;transition:transform .8s var(--ease),fill .5s}
.d-flora .fl-leaves li:hover svg{transform:rotate(-30deg) scale(1.1);fill:var(--blush)}
.d-flora .is-solo .fl-leaves{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 28px}
.d-flora .is-solo .fl-leaves li{border:0}
.d-flora .fl-seeds{display:grid;gap:clamp(18px,2.2vw,30px);grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))}
.d-flora .fl-seed{position:relative;display:grid;gap:14px;align-content:start;height:100%;padding:clamp(14px,1.4vw,18px) clamp(14px,1.4vw,18px) clamp(26px,2.6vw,36px);border-radius:var(--leaf);background:var(--petal);transition:transform .9s var(--ease),border-radius 1.1s var(--ease),box-shadow .6s}
.d-flora .fl-seed:hover{transform:translateY(-8px);border-radius:10px clamp(36px,4vw,64px) 10px clamp(36px,4vw,64px);box-shadow:0 30px 60px -40px rgba(20,42,33,.5)}
.d-flora .fl-seeds>li:nth-child(even) .fl-seed{border-radius:10px clamp(36px,4vw,64px) 10px clamp(36px,4vw,64px)}
.d-flora .fl-seeds>li:nth-child(even) .fl-seed:hover{border-radius:var(--leaf)}
.d-flora .fl-seed figure{aspect-ratio:5/4;overflow:hidden;border-radius:calc(clamp(36px,4vw,64px) - 8px) 6px calc(clamp(36px,4vw,64px) - 8px) 6px}
.d-flora .fl-seeds>li:nth-child(even) .fl-seed figure{border-radius:6px calc(clamp(36px,4vw,64px) - 8px) 6px calc(clamp(36px,4vw,64px) - 8px)}
.d-flora .fl-seed figure img{width:100%;height:100%;object-fit:cover;transition:transform 1.4s var(--ease)}
.d-flora .fl-seed:hover figure img{transform:scale(1.07) rotate(1deg)}
.d-flora .fl-seed-in{display:grid;gap:12px;padding:8px clamp(10px,1.4vw,18px) 0}
.d-flora .fl-seed-top{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}
.d-flora .fl-seed-top b{font-family:var(--serif);font-size:clamp(40px,4vw,56px);font-style:italic;font-weight:300;line-height:.9;color:var(--rose)}
.d-flora .fl-seed-top .fl-draw{width:54px;height:76px;stroke:var(--fern);stroke-width:1.5;transition:transform 1s var(--ease)}
.d-flora .fl-seed-top .fl-draw path,.d-flora .fl-seed-top .fl-draw circle{stroke-dashoffset:0}
.d-flora .fl-seed:hover .fl-seed-top .fl-draw{transform:rotate(-16deg) scale(1.12)}
.d-flora .fl-seed p{color:var(--dim)}
.d-flora .fl-seed .fl-meta{display:flex;flex-wrap:wrap;gap:8px 18px;padding-top:12px;border-top:1px solid var(--line);font-size:13px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--fern)}
.d-flora .fl-seed .fl-meta b{font-family:var(--serif);font-size:20px;font-style:italic;font-weight:500;letter-spacing:0;text-transform:none;color:var(--forest)}
.d-flora .fl-seed.has-pic .fl-seed-top .fl-draw{display:none}
.d-flora .fl-market{display:grid;gap:clamp(40px,4vw,64px) clamp(40px,6vw,110px)}
@media (min-width:900px){.d-flora .fl-market{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-flora .fl-market h3{display:flex;align-items:center;gap:14px;margin-bottom:10px;font-size:clamp(30px,2.6vw,40px);font-style:italic;color:var(--forest)}
.d-flora .fl-market h3 svg{width:34px;height:46px;flex:none;stroke:var(--fern)}
.d-flora .fl-market h3 svg path,.d-flora .fl-market h3 svg circle{stroke-dashoffset:0}
.d-flora .fl-stall li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 20px;align-items:baseline;padding:16px 0;border-bottom:1px solid var(--line);transition:padding .6s var(--ease)}
.d-flora .fl-stall li:hover{padding-left:12px}
.d-flora .fl-stall b{font-family:var(--serif);font-size:clamp(21px,1.6vw,25px);font-weight:500;line-height:1.2}
.d-flora .fl-stall span{font-family:var(--serif);font-size:20px;font-style:italic;color:var(--rose-d);white-space:nowrap}
.d-flora .fl-stall p{grid-column:1/-1;font-size:.94em;color:var(--dim)}
.d-flora .fl-stall small{grid-column:1/-1;font-size:11.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--fern)}
.d-flora .fl-note{margin-top:34px;font-size:14px;color:var(--dim)}
.d-flora .fl-sec.is-forest>.fl-bg{position:absolute;right:-2%;bottom:-6%;width:clamp(180px,24vw,360px);height:auto;stroke:var(--sage);opacity:.35}
.d-flora .fl-virtues{display:grid;gap:clamp(36px,4vw,60px) clamp(28px,4vw,64px);grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))}
.d-flora .fl-virtues li{display:grid;gap:14px;align-content:start}
.d-flora .fl-virtues p{color:rgba(251,248,241,.72)}
.d-flora .fl-seedico{position:relative;display:grid;place-items:center;width:78px;height:78px;margin-bottom:6px;color:var(--blush)}
.d-flora .fl-seedico::before{content:"";position:absolute;inset:0;border:1px solid rgba(240,210,201,.5);border-radius:58% 42% 47% 53%/52% 58% 42% 48%;transition:transform 1.4s var(--ease),border-radius 1.4s var(--ease)}
.d-flora .fl-seedico::after{content:"";position:absolute;inset:10px;border-radius:50%;background:rgba(163,180,155,.16);transition:transform 1s var(--ease)}
.d-flora .fl-virtues li:hover .fl-seedico::before{transform:rotate(120deg);border-radius:42% 58% 55% 45%/45% 42% 58% 55%}
.d-flora .fl-virtues li:hover .fl-seedico::after{transform:scale(1.15)}
.d-flora .fl-seedico svg{position:relative;z-index:1;width:28px;height:28px}
.d-flora .fl-sec.is-forest .fl-petal path{fill:rgba(240,210,201,.75);stroke:rgba(240,210,201,.9)}
.d-flora .fl-sec.is-forest .fl-petal.is-leaf path{fill:rgba(163,180,155,.45);stroke:var(--sage)}
.d-flora .fl-sec>.fl-petals{overflow:hidden}
.d-flora .fl-vine{position:relative;padding-left:56px}
.d-flora .fl-steps{display:flex;flex-direction:column;gap:clamp(30px,4vw,56px)}
.d-flora .fl-vine>svg{position:absolute;left:0;top:0;width:56px;height:100%;overflow:visible;fill:none;stroke:var(--fern);stroke-width:1.4;stroke-linecap:round}
.d-flora .fl-vine>svg .fl-vtrack{stroke:var(--line);stroke-width:1}
.d-flora .fl-vine>svg .fl-vgrow{stroke-dasharray:1 2;stroke-dashoffset:calc(1.01 - var(--prog,1) * 1.01)}
.d-flora .fl-step{position:relative;display:grid;gap:10px;padding:clamp(22px,2.4vw,32px);border-radius:var(--leaf);background:var(--petal);transition:transform .9s var(--ease),box-shadow .6s}
.d-flora .fl-step:hover{transform:translateX(6px);box-shadow:0 26px 50px -40px rgba(20,42,33,.55)}
.d-flora .fl-step small{font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--fern)}
.d-flora .fl-step p{color:var(--dim)}
.d-flora .fl-flower{position:absolute;left:-56px;top:clamp(22px,2.4vw,32px);width:56px;height:56px;margin-left:-0px;transform:translateX(0)}
.d-flora .fl-flower svg{display:block;width:56px;height:56px;overflow:visible}
.d-flora .fl-flower .fl-petals-g{transform-origin:28px 28px;transition:transform 1.2s var(--ease),opacity .6s}
.d-flora .fl-flower .fl-petals-g path{fill:var(--blush);stroke:var(--rose);stroke-width:.8}
.d-flora .fl-flower circle{fill:var(--forest)}
.demo-js .d-flora .fl-step:not(.is-open) .fl-petals-g{transform:scale(.2) rotate(-90deg);opacity:0}
.demo-js .d-flora .fl-step:not(.is-open) .fl-flower circle{fill:var(--sage)}
.d-flora .fl-flower circle{transition:fill .6s}
@media (min-width:900px){.d-flora .fl-vine{padding-left:0;--gap:clamp(90px,10vw,160px)}.d-flora .fl-vine>svg{left:50%;transform:translateX(-50%)}.d-flora .fl-steps{gap:0}.d-flora .fl-step{width:calc(50% - var(--gap) / 2)}.d-flora .fl-step:nth-child(odd){align-self:flex-start}.d-flora .fl-step:nth-child(even){align-self:flex-end;margin-top:clamp(-40px,-3vw,-20px)}.d-flora .fl-step+.fl-step:nth-child(odd){margin-top:clamp(-40px,-3vw,-20px)}.d-flora .fl-step:nth-child(odd) .fl-flower{left:auto;right:calc(-1 * var(--gap) / 2 - 28px)}.d-flora .fl-step:nth-child(even) .fl-flower{left:calc(-1 * var(--gap) / 2 - 28px)}.d-flora .fl-step:nth-child(odd):hover{transform:translateX(-6px)}}
.d-flora .fl-garden{position:relative;display:grid;gap:clamp(12px,1.6vw,22px);grid-template-columns:repeat(2,minmax(0,1fr))}
.d-flora .fl-garden figure{position:relative;overflow:hidden;aspect-ratio:4/5;background:var(--sage-l);border-radius:var(--b,46% 54% 50% 50%/40% 40% 60% 60%);transform:rotate(var(--r,0deg));transition:border-radius 1.4s var(--ease),transform 1.2s var(--ease)}
.d-flora .fl-garden figure img{width:100%;height:100%;object-fit:cover;transform:scale(1.04);transition:transform 1.6s var(--ease)}
.d-flora .fl-garden figure:hover{border-radius:var(--bh,50%);transform:rotate(0) scale(1.02);z-index:2}
.d-flora .fl-garden figure:hover img{transform:scale(1.12)}
.d-flora .fl-garden figure:nth-child(6n+1){--b:58% 42% 47% 53%/52% 58% 42% 48%;--bh:40% 60% 52% 48%/48% 42% 58% 52%;--r:-1.5deg}
.d-flora .fl-garden figure:nth-child(6n+2){--b:50%;--bh:46% 54% 40% 60%/60% 40% 60% 40%;aspect-ratio:1;--r:2deg;margin-top:18%}
.d-flora .fl-garden figure:nth-child(6n+3){--b:999px 999px 30px 30px;--bh:30px 30px 999px 999px;--r:1deg}
.d-flora .fl-garden figure:nth-child(6n+4){--b:var(--leaf);--bh:10px 64px 10px 64px;aspect-ratio:1;--r:-2deg;margin-top:-12%}
.d-flora .fl-garden figure:nth-child(6n+5){--b:42% 58% 64% 36%/50% 36% 64% 50%;--bh:58% 42% 36% 64%/36% 50% 50% 64%;--r:1.6deg}
.d-flora .fl-garden figure:nth-child(6n+6){--b:30px 30px 999px 999px;--bh:999px 999px 30px 30px;--r:-1deg;margin-top:-6%}
.demo-js .d-flora .fl-garden figure[data-rv]{opacity:0;transform:translateY(60px) rotate(calc(var(--r,0deg) * 4)) scale(.9)}
.demo-js .d-flora .fl-garden figure[data-rv].in{opacity:1;transform:rotate(var(--r,0deg));transition:opacity 1s,transform 1.6s var(--ease),border-radius 1.4s var(--ease);transition-delay:calc(var(--i,0) * 120ms)}
.demo-js .d-flora .fl-garden figure[data-rv].in:hover{transform:rotate(0) scale(1.02);transition-delay:0s}
@media (min-width:900px){.d-flora .fl-garden.is-6,.d-flora .fl-garden.is-5{grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-rows:clamp(40px,4.6vw,66px);gap:clamp(12px,1.4vw,20px)}.d-flora .fl-garden.is-6 figure,.d-flora .fl-garden.is-5 figure{aspect-ratio:auto;margin:0}
.d-flora .fl-garden.is-6 figure:nth-child(1),.d-flora .fl-garden.is-5 figure:nth-child(1){grid-column:1/6;grid-row:1/8}
.d-flora .fl-garden.is-6 figure:nth-child(2),.d-flora .fl-garden.is-5 figure:nth-child(2){grid-column:6/9;grid-row:2/5}
.d-flora .fl-garden.is-6 figure:nth-child(3),.d-flora .fl-garden.is-5 figure:nth-child(3){grid-column:9/13;grid-row:1/7}
.d-flora .fl-garden.is-6 figure:nth-child(4),.d-flora .fl-garden.is-5 figure:nth-child(4){grid-column:6/9;grid-row:5/10}
.d-flora .fl-garden.is-6 figure:nth-child(5),.d-flora .fl-garden.is-5 figure:nth-child(5){grid-column:2/6;grid-row:8/12}
.d-flora .fl-garden.is-6 figure:nth-child(6){grid-column:9/12;grid-row:7/12}
.d-flora .fl-garden.is-5 figure:nth-child(1){grid-row:1/11}.d-flora .fl-garden.is-5 figure:nth-child(5){grid-column:9/13;grid-row:7/11}
.d-flora .fl-garden.is-3,.d-flora .fl-garden.is-4{grid-template-columns:repeat(var(--n,3),minmax(0,1fr));align-items:start}}
.d-flora .fl-garden.is-1{grid-template-columns:minmax(0,1fr)}
.d-flora .fl-garden.is-1 figure{aspect-ratio:16/9;--b:clamp(40px,8vw,140px) 18px clamp(40px,8vw,140px) 18px}
.d-flora .fl-garden-sprig{position:absolute;z-index:3;width:clamp(80px,10vw,140px);height:auto;pointer-events:none}
.d-flora .fl-garden-sprig.a{left:44%;top:-6%;transform:rotate(-20deg)}
.d-flora .fl-garden-sprig.b{right:-2%;bottom:-6%;transform:rotate(24deg)}
@media (max-width:899px){.d-flora .fl-garden-sprig.a{left:auto;right:4%;top:-8%}}
.d-flora .fl-herb{display:grid;gap:clamp(40px,5vw,80px);align-items:start}
@media (min-width:960px){.d-flora .fl-herb{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-flora .fl-herb-copy{display:grid;gap:22px}
.d-flora .fl-herb-copy>p{color:var(--dim)}
.d-flora .fl-sheet{position:relative;padding:clamp(26px,3.4vw,54px);border:1px solid var(--line);background:var(--petal);box-shadow:0 1px 0 var(--line),0 40px 70px -56px rgba(20,42,33,.6);transform:rotate(.8deg);transition:transform 1.4s var(--ease)}
.d-flora .fl-sheet:hover{transform:rotate(0)}
.d-flora .fl-sheet::before{content:"";position:absolute;inset:10px;border:1px solid var(--line);pointer-events:none}
.d-flora .fl-sheet-top{display:grid;grid-template-columns:auto minmax(0,1fr);gap:clamp(18px,3vw,40px);align-items:start}
.d-flora .fl-sheet-top .fl-draw{width:clamp(76px,10vw,130px);height:auto;stroke:var(--fern)}
.d-flora .fl-sheet h3{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:10px;font-size:clamp(30px,2.6vw,40px);font-style:italic;color:var(--forest)}
.d-flora .fl-sheet .z-hours{border-top:0}
.d-flora .fl-sheet .z-hours div{padding:12px 0;border-bottom:1px dashed var(--line)}
.d-flora .fl-sheet .z-hours dt{font-family:var(--serif);font-size:20px;font-weight:500}
.d-flora .fl-sheet .z-hours dd{font-variant-numeric:tabular-nums;color:var(--dim);white-space:nowrap}
@media (max-width:620px){.d-flora .fl-sheet-top{grid-template-columns:minmax(0,1fr)}.d-flora .fl-sheet-top>.fl-draw{display:none}.d-flora .fl-sheet .z-hours dt{font-size:18px}.d-flora .fl-sheet .z-hours div{gap:12px}}
.d-flora .fl-label{display:grid;gap:2px;justify-self:end;width:min(100%,300px);margin:26px 0 0 auto;padding:14px 18px;border:1px solid var(--forest);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--fern)}
.d-flora .fl-label b{font-family:var(--serif);font-size:21px;font-style:italic;font-weight:500;letter-spacing:0;text-transform:none;color:var(--forest)}
.d-flora .z-hours div.is-today{position:relative;margin-inline:-14px;padding-inline:14px;border-radius:999px;background:var(--blush-l);border-bottom-color:transparent}
.d-flora .z-hours div.is-today dt::after{content:"";display:inline-block;width:9px;height:9px;margin-left:10px;border-radius:0 70% 0 70%;background:var(--rose);vertical-align:middle}
.d-flora .z-hours div.is-today dd{color:var(--forest);font-weight:500}
.d-flora .fl-meet{display:grid;gap:clamp(40px,5vw,84px);align-items:start}
@media (min-width:960px){.d-flora .fl-meet{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)}}
.d-flora .fl-meet-copy{display:grid;gap:22px}
.d-flora .fl-meet-copy>p{color:var(--dim)}
.d-flora .fl-post{display:grid;gap:18px;align-content:start;justify-items:start}
.d-flora .fl-post>.fl-draw{stroke:var(--fern)}
.d-flora .fl-post .fl-kick{margin-bottom:4px;padding-right:48px}
.d-flora .fl-post address{display:grid;gap:6px;font-style:normal;font-family:var(--serif);font-size:clamp(24px,2.2vw,32px);line-height:1.25;color:var(--forest)}
.d-flora .fl-post address a{display:inline-flex;align-items:center;min-height:44px;width:max-content;max-width:100%;background:linear-gradient(var(--blush),var(--blush)) 0 88%/100% 6px no-repeat;transition:background-size .7s var(--ease)}
.d-flora .fl-post address a:hover{background-size:100% 70%}
.d-flora .fl-post address .fl-route{font-family:var(--sans);font-size:14px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--fern);background:none}
.d-flora .fl-card{position:relative;padding:clamp(26px,3.4vw,52px);border-radius:clamp(40px,5vw,90px) 14px clamp(40px,5vw,90px) 14px;background:var(--petal);box-shadow:0 40px 80px -60px rgba(20,42,33,.5)}
.d-flora .fl-card>.fl-draw{position:absolute;right:-18px;top:clamp(-120px,-8vw,-80px);width:clamp(64px,7vw,100px);height:auto;transform:rotate(20deg)}
.d-flora .z-field label,.d-flora .z-chipset legend{font-size:11.5px;font-weight:500;letter-spacing:.16em;color:var(--fern)}
.d-flora .z-field input,.d-flora .z-field select,.d-flora .z-field textarea{padding:12px 2px;border:0;border-bottom:1px solid rgba(29,58,46,.28);background:transparent;transition:border-color .4s,background-color .4s}
.d-flora .z-field textarea{border:1px solid rgba(29,58,46,.22);border-radius:18px;padding:14px}
.d-flora .z-field input:focus,.d-flora .z-field select:focus,.d-flora .z-field textarea:focus{border-color:var(--rose);background:rgba(240,210,201,.18)}
.d-flora .z-field :focus-visible{outline:none}
.d-flora .z-field select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23587659' stroke-width='1.3'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 4px center;background-size:12px 8px}
.d-flora .z-chips button{border-radius:999px;transition:background-color .3s,color .3s,transform .5s var(--ease)}
.d-flora .z-chips button:hover{transform:translateY(-3px)}
.d-flora .form-status{border-color:var(--fern);border-radius:16px;background:var(--sage-l)}
.d-flora .fl-ways{display:grid;gap:clamp(16px,2vw,26px);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-flora .fl-way{position:relative;display:grid;gap:12px;align-content:start;height:100%;padding:clamp(26px,2.8vw,38px);border:1px solid var(--line);border-radius:var(--leaf);background:var(--petal);transition:transform .9s var(--ease),background-color .5s,border-radius 1.1s var(--ease)}
.d-flora .fl-way:hover{transform:translateY(-6px);background:var(--blush-l);border-radius:10px clamp(36px,4vw,64px) 10px clamp(36px,4vw,64px)}
.d-flora .fl-way .fl-wico{display:grid;place-items:center;width:58px;height:58px;border-radius:58% 42% 47% 53%/52% 58% 42% 48%;background:var(--sage-l);color:var(--forest);transition:transform 1s var(--ease)}
.d-flora .fl-way:hover .fl-wico{transform:rotate(-20deg)}
.d-flora .fl-way .fl-wico svg{width:24px;height:24px}
.d-flora .fl-way p{color:var(--dim)}
.d-flora .fl-way .fl-go{display:inline-flex;align-items:center;gap:8px;margin-top:6px;font-size:13px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--fern)}
.d-flora .fl-way .fl-go svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.4;transition:transform .7s var(--ease)}
.d-flora .fl-way:hover .fl-go svg{transform:translateX(6px)}
.d-flora .z-sec.z-cta{background:var(--forest);color:var(--petal);overflow:hidden}
.d-flora .z-cta h2{font-size:clamp(44px,6vw,96px);font-weight:300;color:var(--petal)}
.d-flora .z-cta h2 em{color:var(--blush)}
.d-flora .z-cta .z-center>p{color:rgba(251,248,241,.78)}
.d-flora .z-cta .fl-fill{background:var(--blush);color:var(--forest)}
.d-flora .z-cta .fl-fill::before{background:var(--petal)}
.d-flora .z-cta::before,.d-flora .z-cta::after{content:"";position:absolute;width:clamp(220px,30vw,460px);aspect-ratio:1;border:1px solid rgba(240,210,201,.28);border-radius:58% 42% 47% 53%/52% 58% 42% 48%;animation:fl-turn 80s linear infinite}
.d-flora .z-cta::before{left:-8%;top:-30%}
.d-flora .z-cta::after{right:-10%;bottom:-36%;animation-direction:reverse}
.d-flora .z-statement h2{font-style:italic;font-weight:300;color:var(--forest)}
.d-flora .z-statement h2 em{color:var(--rose)}
.d-flora .z-statement .fl-kick{order:-1}
.d-flora .z-statement{background:var(--blush-l)}
.d-flora .z-team,.d-flora .z-ba-sec{background:var(--linen)}
.d-flora .z-faq{background:var(--paper)}
.d-flora .z-card,.d-flora .z-panel{border:0;border-radius:var(--leaf);background:var(--petal)}
.d-flora .z-pack.is-featured{background:var(--forest);color:var(--petal)}
.d-flora .z-pack.is-featured h3,.d-flora .z-pack.is-featured .z-pack-price b{color:var(--petal)}
.d-flora .z-pack.is-featured .z-pack-price,.d-flora .z-pack.is-featured p{color:rgba(251,248,241,.78)}
.d-flora .z-pack.is-featured .z-tag{color:var(--blush)}
.d-flora .z-pack.is-featured .z-ticks li::before{background:var(--blush)}
.d-flora .z-ticks li::before{width:9px;height:9px;top:.62em;border-radius:0 70% 0 70%;background:var(--sage)}
.d-flora .z-acc summary{font-family:var(--serif);font-size:clamp(22px,1.9vw,28px);font-weight:500;transition:color .4s,padding .6s var(--ease)}
.d-flora .z-acc summary:hover{color:var(--rose-d);padding-left:10px}
.d-flora .z-acc details[open] summary{color:var(--rose-d)}
.d-flora .z-pic{border-radius:46% 54% 50% 50%/34% 34% 66% 66%}
.d-flora .z-team .z-grid>li{justify-items:center;text-align:center}
.d-flora .z-team .z-grid>li h3{font-style:italic}
.d-flora .z-team .z-grid>li:not(:has(figure))::before{content:"";width:92px;height:92px;border-radius:58% 42% 47% 53%/52% 58% 42% 48%;background:var(--blush-l);border:1px solid var(--line)}
.d-flora .z-quotes blockquote{padding:clamp(26px,3vw,40px);border:0;border-radius:var(--leaf);background:var(--petal)}
.d-flora .z-quotes blockquote>p{font-style:italic;font-weight:400}
.d-flora .z-steps small,.d-flora .z-rows small{font-family:var(--serif);font-size:28px;font-style:italic;letter-spacing:0;color:var(--rose)}
.d-flora .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(20,42,33,.06),rgba(20,42,33,.78))}
.d-flora .z-showcase h2{font-weight:300}
.d-flora .z-showcase h2 em{color:var(--blush)}
.d-flora .z-showcase .fl-line{border-color:var(--petal);color:var(--petal)}
.d-flora .z-showcase .fl-line:hover{background:var(--petal);color:var(--forest)}
.d-flora .z-show-media{border-radius:0 0 50% 50%/0 0 clamp(30px,5vw,90px) clamp(30px,5vw,90px);overflow:hidden}
.d-flora .z-ba{border-radius:var(--leaf)}
.d-flora .z-reach a{text-decoration:underline;text-decoration-color:var(--blush);text-decoration-thickness:2px;text-underline-offset:5px}
.d-flora .z-reach .z-route{color:var(--rose-d)}
.d-flora .fl-foot{position:relative;padding:clamp(90px,10vw,150px) 0 150px;background:var(--moss);color:rgba(251,248,241,.76);overflow:hidden}
.d-flora .fl-foot-branch{position:absolute;right:-2%;top:-10px;width:min(62vw,620px);height:auto;stroke:rgba(163,180,155,.6);stroke-width:1}
.d-flora .fl-foot-name{position:relative;max-width:16ch;font-family:var(--serif);font-size:min(13vw,148px,calc(180vw / var(--n,8)));font-style:italic;font-weight:300;line-height:.95;color:var(--petal);overflow-wrap:anywhere}
.d-flora .fl-foot-name span{display:inline-block;opacity:0;transform:translateY(.3em);filter:blur(0);transition:opacity 1.2s var(--ease),transform 1.4s var(--ease);transition-delay:calc(var(--i,0) * 120ms)}
.d-flora .fl-foot-name.in span,html:not(.demo-js) .d-flora .fl-foot-name span{opacity:1;transform:none}
.demo-js .d-flora .fl-foot-name[data-rv]{opacity:1;transform:none}
.d-flora .fl-foot-blurb{max-width:46ch;margin-top:22px;font-family:var(--serif);font-size:clamp(20px,1.6vw,24px);font-style:italic;color:var(--blush)}
.d-flora .fl-foot-grid{position:relative;display:grid;gap:34px;margin-top:clamp(50px,6vw,90px);padding-top:clamp(30px,4vw,50px);border-top:1px solid rgba(251,248,241,.14);grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-flora .fl-foot-grid h3{margin-bottom:14px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--sage)}
.d-flora .fl-foot-grid a,.d-flora .fl-foot-grid span{display:block;padding:5px 0}
.d-flora .fl-foot-grid a{width:max-content;max-width:100%;background:linear-gradient(var(--blush),var(--blush)) 0 100%/0 1px no-repeat;transition:background-size .7s var(--ease),color .4s}
.d-flora .fl-foot-grid a:hover{background-size:100% 1px;color:var(--petal)}
.d-flora .fl-legal{position:relative;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:60px;padding-top:24px;border-top:1px solid rgba(251,248,241,.14);font-size:13px}
.d-flora .fl-foot .fl-petal path{fill:rgba(240,210,201,.6);stroke:rgba(240,210,201,.8)}
.d-flora.no-photos .fl-hero::before{content:"";position:absolute;left:-12%;top:30%;width:44%;aspect-ratio:1;border-radius:58% 42% 47% 53%/52% 58% 42% 48%;background:radial-gradient(circle,rgba(221,229,213,.9),transparent 70%);pointer-events:none}
@keyframes fl-ink{to{-webkit-mask-position:0 0;mask-position:0 0;transform:none}}
@keyframes fl-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes fl-fade{from{opacity:0}}
@keyframes fl-draw{to{stroke-dashoffset:0}}
@keyframes fl-unfurl{from{opacity:0;transform:scale(.35) rotate(-28deg)}to{opacity:1;transform:none}}
@keyframes fl-settle{to{transform:none}}
@keyframes fl-pop{from{opacity:0;transform:scale(.4) rotate(30deg)}to{opacity:1;transform:none}}
@keyframes fl-morph{0%{border-radius:58% 42% 47% 53%/52% 58% 42% 48%}50%{border-radius:44% 56% 58% 42%/42% 46% 54% 58%}100%{border-radius:52% 48% 40% 60%/60% 42% 58% 40%}}
@keyframes fl-morph-b{0%{border-radius:46% 54% 50% 50%/34% 34% 66% 66%}100%{border-radius:54% 46% 44% 56%/40% 30% 70% 60%}}
@keyframes fl-turn{to{transform:rotate(360deg)}}
@keyframes fl-sway{from{transform:rotate(-14deg) translateX(-6px)}to{transform:rotate(16deg) translateX(8px)}}
@media (prefers-reduced-motion:reduce){.d-flora *,.d-flora *::before,.d-flora *::after{animation-delay:0s!important}.d-flora .fl-ln>span{-webkit-mask-image:none;mask-image:none;transform:none}.d-flora .fl-bloom img{transform:none}.d-flora .fl-draw path,.d-flora .fl-draw circle,.d-flora .fl-stem path,.d-flora .fl-flourish path{stroke-dashoffset:0!important}.d-flora .fl-petal{transform:rotate(var(--r,0deg))}.d-flora .fl-foot-name span{opacity:1;transform:none}.d-flora .fl-vine>svg .fl-vgrow{stroke-dashoffset:0}}
`
  .trim()
  .split("\n");
/* Restyles of the kit's default sections come after the shared defaults (as `extra`), the rest before them. */
const KIT_RULE = /\.z-|form-status/;
const CSS = ALL.filter((l) => !KIT_RULE.test(l)).join("");
const EXTRA = ALL.filter((l) => KIT_RULE.test(l)).join("");

/** The garland flows with the scroll; the vine grows as its steps pass and their buds open. */
const JS = `(function(){var d=document,W=window,q=function(s){return [].slice.call(d.querySelectorAll(s))};var rm=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;var gs=q('.fl-garland textPath'),vs=q('.fl-vine');if(!gs.length&&!vs.length)return;
function upd(){var vh=W.innerHeight;if(!rm)gs.forEach(function(t){var s=t.ownerSVGElement,r=s.getBoundingClientRect();if(!r.height||r.bottom<-50||r.top>vh+50)return;var p=(r.top+r.height/2)/vh;t.setAttribute('startOffset',(-36+p*24).toFixed(2)+'%')});
vs.forEach(function(v){var r=v.getBoundingClientRect(),line=vh*.72,p=rm?1:Math.min(1,Math.max(0,(line-r.top)/Math.max(1,r.height)));v.style.setProperty('--prog',p.toFixed(3));[].forEach.call(v.querySelectorAll('.fl-step'),function(s){var f=s.querySelector('.fl-flower')||s;s.classList.toggle('is-open',rm||f.getBoundingClientRect().top+20<line)})})}
var raf=0;function on(){if(!raf)raf=requestAnimationFrame(function(){raf=0;upd()})}W.addEventListener('scroll',on,{passive:true});W.addEventListener('resize',on);upd();
var s=d.querySelector('.fl-scrim'),b=d.querySelector('.d-flora .menu-btn');if(s&&b)s.addEventListener('click',function(){if(b.getAttribute('aria-expanded')==='true')b.click()})})();`;

/* ── Fine-line botanicals. Every path draws itself (pathLength 1 + stroke-dashoffset). Decoration only. ── */

const r1 = (n: number) => Math.round(n * 10) / 10;
type Draw = { className?: string; k?: number; scroll?: boolean };
const cls = (base: string | undefined, scroll?: boolean) => ["fl-draw", base, scroll ? "fl-scroll" : ""].filter(Boolean).join(" ");
const P = ({ d, j = 0, leaf }: { d: string; j?: number; leaf?: boolean }) => <path d={d} pathLength={1} style={{ ["--j" as string]: j }} className={leaf ? "fl-fill-leaf" : undefined} />;

/** A leafy sprig: a gently bending stem with paired leaves and a closed bud. */
function Sprig({ className, scroll }: Draw) {
  const leaves: string[] = [];
  for (let k = 0; k < 6; k++) {
    const y = 236 - k * 36;
    const x = 60 + Math.sin(k * 1.3) * 3;
    const s = 1 - k * 0.1;
    const side = k % 2 ? -1 : 1;
    leaves.push(`M${r1(x)} ${y}C${r1(x + side * 22 * s)} ${r1(y - 8 * s)} ${r1(x + side * 32 * s)} ${r1(y - 26 * s)} ${r1(x + side * 34 * s)} ${r1(y - 40 * s)}C${r1(x + side * 18 * s)} ${r1(y - 34 * s)} ${r1(x + side * 4 * s)} ${r1(y - 20 * s)} ${r1(x)} ${y}Z`);
    leaves.push(`M${r1(x)} ${y}L${r1(x + side * 26 * s)} ${r1(y - 30 * s)}`);
  }
  return (
    <svg className={cls(className, scroll)} viewBox="0 0 120 270" aria-hidden="true">
      <P d="M60 266C57 214 64 160 59 108S62 40 60 18" />
      {leaves.map((d, n) => (
        <P key={n} d={d} j={n + 1} />
      ))}
      <P d="M60 18C52 12 52 2 60-6C68 2 68 12 60 18Z" j={13} />
    </svg>
  );
}

/** A five-petalled blossom on a stem with one leaf. */
function Blossom({ className, scroll }: Draw) {
  const petal = "M60 58C50 44 50 26 60 16C70 26 70 44 60 58Z";
  return (
    <svg className={cls(className, scroll)} viewBox="0 0 120 220" aria-hidden="true">
      <P d="M60 216C63 180 54 140 60 70" />
      <P d="M59 160C42 154 32 138 32 122C46 126 56 140 59 160Z" j={1} />
      <P d="M59 160L38 128" j={2} />
      <P d="M61 128C76 124 86 112 88 100C76 100 64 110 61 128Z" j={3} />
      {[0, 72, 144, 216, 288].map((a, n) => (
        <g key={a} transform={`rotate(${a} 60 62)`}>
          <P d={petal} j={4 + n} />
        </g>
      ))}
      <circle cx="60" cy="62" r="5" pathLength={1} style={{ ["--j" as string]: 9 }} />
    </svg>
  );
}

/** A fern frond with leaflets that grow smaller towards the tip. */
function Fern({ className, scroll }: Draw) {
  const out: string[] = [];
  for (let k = 0; k < 11; k++) {
    const t = k / 11;
    const y = 280 - t * 250;
    const x = 60 + Math.sin(t * 3.2) * 6;
    const len = (1 - t) * 34 + 7;
    for (const side of [-1, 1]) out.push(`M${r1(x)} ${r1(y)}Q${r1(x + side * len * 0.5)} ${r1(y - len * 0.06)} ${r1(x + side * len)} ${r1(y - len * 0.52)}Q${r1(x + side * len * 0.52)} ${r1(y - len * 0.6)} ${r1(x)} ${r1(y)}Z`);
  }
  return (
    <svg className={cls(className, scroll)} viewBox="0 0 120 300" aria-hidden="true">
      <P d="M60 298C58 230 68 160 64 96S58 40 62 22" />
      {out.map((d, n) => (
        <P key={n} d={d} j={Math.floor(n / 2) + 1} />
      ))}
    </svg>
  );
}

/** Cow parsley: a stem that opens into rays, each ending in a tiny umbel. */
function Umbel({ className, scroll }: Draw) {
  const rays: string[] = [];
  const dots: { x: number; y: number }[] = [];
  for (let k = 0; k < 7; k++) {
    const a = ((-150 + k * 20) * Math.PI) / 180;
    const ex = 60 + Math.cos(a) * 52;
    const ey = 118 + Math.sin(a) * 52;
    rays.push(`M60 118Q${r1(60 + Math.cos(a) * 20)} ${r1(118 + Math.sin(a) * 34)} ${r1(ex)} ${r1(ey)}`);
    for (let m = 0; m < 5; m++) {
      const b = ((-160 + m * 35) * Math.PI) / 180;
      rays.push(`M${r1(ex)} ${r1(ey)}L${r1(ex + Math.cos(b) * 10)} ${r1(ey + Math.sin(b) * 10)}`);
      dots.push({ x: r1(ex + Math.cos(b) * 11.6), y: r1(ey + Math.sin(b) * 11.6) });
    }
  }
  return (
    <svg className={cls(className, scroll)} viewBox="0 0 120 300" aria-hidden="true">
      <P d="M60 298C62 240 56 180 60 118" />
      <P d="M60 236C44 226 36 210 36 196C50 202 58 216 60 236Z" j={1} />
      {rays.map((d, n) => (
        <P key={n} d={d} j={2 + Math.floor(n / 6)} />
      ))}
      {dots.map((p, n) => (
        <circle key={n} cx={p.x} cy={p.y} r="1.6" pathLength={1} style={{ ["--j" as string]: 4 + Math.floor(n / 5) }} />
      ))}
    </svg>
  );
}

/** A long flowering branch for the footer. */
function Branch({ className }: { className?: string }) {
  const out: string[] = [];
  for (let k = 0; k < 12; k++) {
    const t = k / 12;
    const x = 600 - t * 560;
    const y = 30 + Math.sin(t * 4) * 26 + t * 60;
    const side = k % 2 ? -1 : 1;
    out.push(`M${r1(x)} ${r1(y)}C${r1(x - 10)} ${r1(y + side * 18)} ${r1(x - 26)} ${r1(y + side * 26)} ${r1(x - 40)} ${r1(y + side * 26)}C${r1(x - 30)} ${r1(y + side * 12)} ${r1(x - 14)} ${r1(y + side * 4)} ${r1(x)} ${r1(y)}Z`);
  }
  return (
    <svg className={cls(className, true)} viewBox="0 0 620 160" aria-hidden="true">
      <P d="M620 20C520 40 460 80 380 70S220 40 140 90 30 130 0 120" />
      {out.map((d, n) => (
        <P key={n} d={d} j={n + 1} />
      ))}
    </svg>
  );
}

const LeafIcon = () => (
  <svg viewBox="0 0 26 26" aria-hidden="true">
    <path d="M4 22C4 10 12 4 23 3c0 11-6 19-19 19Zm0 0L15 11" />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
);

/** The little open bloom of buttons and labels: a flower that turns on hover. */
const Bloom = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M10 10C7 7 7 3 10 1c3 2 3 6 0 9Zm0 0c3-3 7-3 9 0-2 3-6 3-9 0Zm0 0c3 3 3 7 0 9-3-2-3-6 0-9Zm0 0c-3 3-7 3-9 0 2-3 6-3 9 0Z" />
  </svg>
);

/* ── Petals that drift with the scroll ── */

const PETAL = "M10 0C17 6 19 17 10 26C1 17 3 6 10 0Z";
const LEAF = "M2 24C2 12 9 3 22 1C22 14 14 23 2 24Z";
type Drift = { l: string; t: string; w: number; x: number; y: number; r: number; leaf?: boolean; tm?: number };
const HERO_PETALS: Drift[] = [
  { l: "6%", t: "12%", w: 18, x: 30, y: -140, r: -20 },
  { l: "42%", t: "6%", w: 14, x: -40, y: -90, r: 40, leaf: true, tm: 11 },
  { l: "52%", t: "78%", w: 22, x: 50, y: -180, r: 10 },
  { l: "88%", t: "62%", w: 16, x: -30, y: -120, r: 80, tm: 8 },
  { l: "28%", t: "88%", w: 20, x: 20, y: -160, r: -50, leaf: true },
  { l: "94%", t: "8%", w: 12, x: -20, y: -80, r: 120, tm: 12 },
];
const SEC_PETALS: Drift[] = [
  { l: "4%", t: "20%", w: 16, x: 30, y: -160, r: 10 },
  { l: "90%", t: "14%", w: 20, x: -40, y: -200, r: -40, leaf: true, tm: 10 },
  { l: "70%", t: "84%", w: 14, x: 20, y: -140, r: 60, tm: 12 },
  { l: "18%", t: "76%", w: 18, x: -30, y: -180, r: -70 },
];

function Petals({ set }: { set: Drift[] }) {
  return (
    <div className="fl-petals" aria-hidden="true">
      {set.map((p, n) => (
        <span key={n} className={`fl-petal${p.leaf ? " is-leaf" : ""}`} data-px style={{ left: p.l, top: p.t, ["--w" as string]: `${p.w}px`, ["--x" as string]: `${p.x}px`, ["--y" as string]: `${p.y}px`, ["--r" as string]: `${p.r}deg`, ["--t" as string]: `${p.tm ?? 9}s` }}>
          <svg viewBox="0 0 24 26">
            <path d={p.leaf ? LEAF : PETAL} />
          </svg>
        </span>
      ))}
    </div>
  );
}

/* ── Building blocks ── */

const Kick = ({ children, still }: { children: ReactNode; still?: boolean }) => (
  <p className="fl-kick" data-rv={still ? undefined : true}>
    <svg viewBox="0 0 22 22" aria-hidden="true">
      <path d="M11 21V9M11 13C6 13 3 9 3 4c5 0 8 4 8 9Zm0-4c0-4 3-7 8-7 0 4-3 7-8 7Z" />
    </svg>
    {children}
  </p>
);

const Flourish = () => (
  <svg className="fl-flourish" viewBox="0 0 150 18" aria-hidden="true" data-rv>
    <path pathLength={1} d="M2 10C30 2 52 16 75 9S120 2 148 10M70 9c3-5 8-6 10-2-2 4-7 4-10 2Z" />
  </svg>
);

function Head({ kicker, title, intro, id, center, row }: { kicker?: string; title: string; intro?: string; id?: string; center?: boolean; row?: boolean }) {
  return (
    <header className={`fl-head${center ? " is-center" : ""}${row && intro && !center ? " is-row" : ""}`}>
      {kicker ? <Kick>{kicker}</Kick> : null}
      <div>
        <h2 id={id} className={long(title)} data-rv>
          {em(title)}
        </h2>
        <Flourish />
      </div>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="fl-hdr hdr">
        <div className="fl-wrap fl-bar">
          <a href="#top" className="fl-logo" aria-label={c.name}>
            <svg viewBox="0 0 30 38" aria-hidden="true">
              <path d="M15 37V14M15 24c-6 0-10-4-10-10 6 0 10 4 10 10Zm0-6c0-6 4-9 10-9 0 6-4 9-10 9ZM15 14c-3-3-3-8 0-12 3 4 3 9 0 12Z" />
            </svg>
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="fl-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn fl-fill fl-cta">
            {cta.label}
          </a>
          <button type="button" className="fl-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className="fl-scrim" aria-hidden="true" />
      <div id="site-menu" className="fl-menu" data-nav inert>
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
        <Fern className="fl-msprig" />
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const small = p ? c.spare() : null;
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 46 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const { lines } = splitLines(hero.headline, plain.length > 22 ? 3 : 2);
  const facts = heroFacts(c);
  return (
    <section className="fl-hero">
      <Petals set={HERO_PETALS} />
      <div className="fl-wrap fl-hero-grid">
        <div>
          <div className="fl-hero-top">
            {hero.eyebrow ? (
              <Kick still>
                <span>{hero.eyebrow}</span>
              </Kick>
            ) : null}
            <NowBadge c={c} className="fl-now" />
          </div>
          <h1 className={size}>
            {lines.map((line, n) => (
              <span className="fl-ln" key={n}>
                <span style={i(n)}>{line}</span>
              </span>
            ))}
          </h1>
          <svg className="fl-stem" viewBox="0 0 300 30" aria-hidden="true">
            <path pathLength={1} d="M2 18C60 6 110 26 170 16S260 4 298 14M200 14c6-10 18-12 22-4-6 8-16 8-22 4ZM120 18c-4-9-14-12-20-6 4 8 14 9 20 6Z" />
          </svg>
          <p className="fl-lede fl-in" style={i(0)}>
            {hero.subheadline}
          </p>
          <div className="fl-cta-row fl-in" style={i(1)}>
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label} <Bloom />
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label} <Arrow />
              </Btn>
            ) : null}
          </div>
          {facts.length > 0 && (
            <dl className="fl-tag fl-in" style={i(2)}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="fl-art">
          <svg className="fl-halo" viewBox="0 0 200 200" aria-hidden="true">
            <path d="M104 6c38 2 76 26 86 66s-6 86-46 108-92 18-118-14S4 72 30 40 66 4 104 6Z" />
          </svg>
          {p ? (
            <figure className="fl-bloom">
              <Pic p={p} eager sizes="(min-width: 980px) 42vw, 92vw" />
            </figure>
          ) : (
            <div className="fl-bloom is-empty" aria-hidden="true">
              <span>{c.name.charAt(0)}</span>
              <Blossom />
            </div>
          )}
          {small ? (
            <figure className="fl-bud">
              <Pic p={small} eager sizes="200px" />
            </figure>
          ) : null}
          <Sprig className="s1" />
          <Umbel className="s2" />
          {p ? <Fern className="s3" /> : null}
        </div>
      </div>
    </section>
  );
}

/** The business's own offer, as a garland along a curved line that flows with the scroll. */
function Garland({ c, uid }: { c: Ctx; uid: string }) {
  const words = offerWords(c);
  if (words.length < 3) return null;
  const run = (n: number) =>
    Array.from({ length: n })
      .flatMap(() => words)
      .map((w, k) => (
        <tspan key={k}>
          {w}
          <tspan className="fl-dot"> • </tspan>
        </tspan>
      ));
  const wide = "M-40 96C160 30 380 30 580 92S980 156 1180 92 1480 28 1660 90";
  const narrow = "M-20 80C80 34 200 34 300 78S500 122 620 76";
  return (
    <div className="fl-garland" aria-hidden="true">
      <svg className="is-wide" viewBox="0 0 1600 150">
        <path id={`${uid}-w`} className="fl-gline" d={wide} />
        <text fontSize="44" dy="-14">
          <textPath href={`#${uid}-w`} startOffset="-20%">
            {run(4)}
          </textPath>
        </text>
      </svg>
      <svg className="is-narrow" viewBox="0 0 600 130">
        <path id={`${uid}-n`} className="fl-gline" d={narrow} />
        <text fontSize="34" dy="-10">
          <textPath href={`#${uid}-n`} startOffset="-20%">
            {run(3)}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  return (
    <footer className="fl-foot" data-px>
      <Petals set={SEC_PETALS} />
      <Branch className="fl-foot-branch" />
      <div className="fl-wrap">
        <p className="fl-foot-name" aria-hidden="true" data-rv style={{ ["--n" as string]: Math.max(7, ...c.name.split(" ").map((w) => w.length)) }}>
          {c.name.split(" ").map((w, n) => (
            <span key={n} style={i(n)}>
              {w}&nbsp;
            </span>
          ))}
        </p>
        {c.spec.footer.blurb ? <p className="fl-foot-blurb">{c.spec.footer.blurb}</p> : null}
        <div className="fl-foot-grid">
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
        <Legal c={c} className="fl-legal" />
      </div>
    </footer>
  );
}

const SEED_ART = [Blossom, Sprig, Umbel, Fern];
const ext = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

/** Copy column of a section with a form (contact and booking share it). */
function MeetCopy({ c, kicker, title, body, hours, reach = true }: { c: Ctx; kicker: string; title: string; body?: string; hours?: boolean; reach?: boolean }) {
  return (
    <div className="fl-meet-copy">
      <Head kicker={kicker} title={title} />
      {body ? <p data-rv>{body}</p> : null}
      {reach || !(c.spec.business.address || c.spec.business.phone || c.spec.business.email) ? <Reach c={c} /> : null}
      {hours ? <Hours c={c} /> : null}
    </div>
  );
}

/** Without a form, the contact section shows how to reach the business as a card. */
function Post({ c }: { c: Ctx }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email) return null;
  return (
    <div className="fl-card fl-post" data-rv data-px>
      <Kick still>{c.name}</Kick>
      <address>
        {b.address ? <span>{b.address}</span> : null}
        {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
        {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
        {b.mapsUrl ? (
          <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="fl-route">
            {c.t.route} →
          </a>
        ) : null}
      </address>
      <Umbel scroll />
    </div>
  );
}

export const flora: Family = {
  key: "flora",
  root: "d-flora",
  fonts: ["Cormorant", "DM Sans"],
  themeColor: "#f5f0e6",
  accent: "#1d3a2e",
  onAccent: "#fbf8f1",
  css: CSS,
  extra: EXTRA,
  js: JS + TODAY_JS,
  cls: { wrap: "fl-wrap", eyebrow: "fl-kick", btn: "fl-fill", btnAlt: "fl-line", btnText: "fl-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <>
          <Garland c={c} uid={`${s.id}-garland`} />
          <section className="fl-sec" id={s.id}>
            <div className={`fl-wrap fl-about${p ? "" : " is-solo"}`}>
              {p ? (
                <div className="fl-about-art" data-px>
                  <span className="fl-ring" aria-hidden="true" />
                  <figure>
                    <Pic p={p} sizes="(min-width: 960px) 40vw, 92vw" />
                  </figure>
                  <Sprig scroll />
                </div>
              ) : null}
              <div className="fl-about-copy">
                {!p ? (
                  <div className="fl-solo-art" data-px>
                    <Fern scroll />
                    <Blossom scroll />
                    <Umbel scroll />
                  </div>
                ) : null}
                <Head kicker={c.t.kick.about} title={s.title} center={!p} />
                <p className="fl-lead" data-rv>
                  {first}
                </p>
                {rest.map((x, n) => (
                  <p key={n} data-rv>
                    {x}
                  </p>
                ))}
                {s.highlights.length > 0 && (
                  <ul className="fl-leaves" data-rv>
                    {s.highlights.map((h) => (
                      <li key={h}>
                        <LeafIcon />
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
    services: (s, c) => (
      <section className="fl-sec is-linen fl-dome" id={s.id}>
        <div className="fl-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} row />
          <ul className="fl-seeds">
            {s.items.map((it, n) => {
              const p = c.photo(`art:svc${n}`);
              const Art = SEED_ART[n % SEED_ART.length];
              return (
                <li key={n} data-rv style={i(n % 3)}>
                  <article className={`fl-seed${p ? " has-pic" : ""}`}>
                    {p ? (
                      <figure>
                        <Pic p={p} sizes="(min-width: 900px) 30vw, 92vw" />
                      </figure>
                    ) : null}
                    <div className="fl-seed-in">
                      <div className="fl-seed-top">
                        <b>{String(n + 1).padStart(2, "0")}</b>
                        <Art />
                      </div>
                      <h3>{it.title}</h3>
                      <p>{it.description}</p>
                      {it.price || it.duration ? (
                        <p className="fl-meta">
                          {it.duration ? <span>{it.duration}</span> : null}
                          {it.price ? <b>{it.price}</b> : null}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="fl-sec" id={s.id}>
          <div className="fl-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} row />
            <div className="fl-market">
              {cats.map((cat, n) => {
                const Art = SEED_ART[n % SEED_ART.length];
                return (
                  <div key={n} data-rv style={i(n % 2)}>
                    <h3>
                      <Art />
                      {cat.name}
                    </h3>
                    <ul className="fl-stall">
                      {cat.items.map((d, m) => (
                        <li key={m}>
                          <b>{d.name}</b>
                          {d.price ? <span>{d.price}</span> : <span />}
                          {d.description ? <p>{d.description}</p> : null}
                          {d.tags?.length ? <small>{d.tags.join(" · ")}</small> : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            {s.note ? (
              <p className="fl-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="fl-sec is-forest" id={s.id} data-px>
        <Umbel className="fl-bg" scroll />
        <Petals set={SEC_PETALS} />
        <div className="fl-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} center />
          <ul className="fl-virtues">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span className="fl-seedico" aria-hidden="true">
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
      <section className="fl-sec is-sage" id={s.id}>
        <div className="fl-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} center />
          <div className="fl-vine">
            <svg viewBox="0 0 56 1000" preserveAspectRatio="none" aria-hidden="true">
              <path className="fl-vtrack" vectorEffect="non-scaling-stroke" d="M28 0C10 120 46 240 28 360S10 600 28 720 46 900 28 1000" />
              <path className="fl-vgrow" pathLength={1} vectorEffect="non-scaling-stroke" d="M28 0C10 120 46 240 28 360S10 600 28 720 46 900 28 1000" />
            </svg>
            <ol className="fl-steps">
            {s.steps.map((st, n) => (
              <li key={n} className="fl-step" data-rv>
                <span className="fl-flower" aria-hidden="true">
                  <svg viewBox="0 0 56 56">
                    <g className="fl-petals-g">
                      {[0, 60, 120, 180, 240, 300].map((a) => (
                        <path key={a} transform={`rotate(${a} 28 28)`} d="M28 27C22 21 22 11 28 5c6 6 6 16 0 22Z" />
                      ))}
                    </g>
                    <circle cx="28" cy="28" r="5" />
                  </svg>
                </span>
                <small>{String(n + 1).padStart(2, "0")}</small>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
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
      const shown = pics.slice(0, 6);
      return (
        <section className="fl-sec" id={s.id}>
          <div className="fl-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} center />
            <div className={`fl-garden is-${shown.length}`} style={{ ["--n" as string]: shown.length }} data-px>
              {shown.map((p, n) => (
                <figure key={n} data-rv style={i(n % 3)}>
                  <Pic p={p} sizes="(min-width: 900px) 34vw, 46vw" />
                </figure>
              ))}
              <Blossom className="fl-garden-sprig a" scroll />
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="fl-sec is-linen" id={s.id}>
        <div className="fl-wrap fl-herb">
          <div className="fl-herb-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="fl-sheet" data-rv>
            <div className="fl-sheet-top" data-px>
              <Fern scroll />
              <div>
                <h3>
                  {c.t.hours}
                  <NowBadge c={c} className="fl-now" />
                </h3>
                {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
              </div>
            </div>
            <p className="fl-label">
              <b>{c.name}</b>
              {c.spec.business.city ? <span>{c.spec.business.city}</span> : null}
            </p>
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="fl-sec" id={s.id}>
        <div className="fl-wrap fl-meet">
          <MeetCopy c={c} kicker={c.t.kick.contact} title={s.title} body={s.body} reach={s.showForm} hours={!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking")} />
          {s.showForm ? (
            <div className="fl-card" data-rv data-px>
              <Blossom scroll />
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : (
            <Post c={c} />
          )}
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="fl-sec is-blush" id={s.id} style={{ background: "var(--blush-l)" }}>
        <div className="fl-wrap fl-meet">
          <MeetCopy c={c} kicker={c.t.kick.booking} title={s.title} body={s.body} hours={!c.spec.sections.some((x) => x.type === "hours")} />
          <div className="fl-card" data-rv data-px>
            <Sprig scroll />
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
          </div>
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="fl-sec" id={s.id}>
        <div className="fl-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} row />
          <ul className="fl-ways">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} className="fl-way" {...ext(ch.href)}>
                  <span className="fl-wico" aria-hidden="true">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <span className="fl-go" aria-hidden="true">
                    <Arrow />
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
