import type { ReactNode } from "react";
import { NowBadge, TODAY_JS } from "./today";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Velours: an original template (no portfolio demo). An Art Deco lounge: deep bottle green,
 * burgundy velvet and champagne gold, a high-contrast display face and strictly symmetrical,
 * centred compositions. A velvet curtain parts to open the page; the headline's letters close
 * in on the centre; photographs sit in stepped (ziggurat) arches with gold hairlines that draw
 * themselves; sunburst fans turn slowly as you scroll; the services are a price list with
 * dotted leaders and Roman numerals. Made for barbershops, cocktail bars, beauty clinics,
 * upscale salons and other places with a sense of occasion.
 */

const ZIG = "polygon(0 100%,0 20%,10% 20%,10% 12.5%,21% 12.5%,21% 5.8%,34% 5.8%,34% 0,66% 0,66% 5.8%,79% 5.8%,79% 12.5%,90% 12.5%,90% 20%,100% 20%,100% 100%)";
const ZIG_PTS = "-3.5,120 -3.5,20.5 6.5,20.5 6.5,11.5 17.5,11.5 17.5,3.5 30.5,3.5 30.5,-3.5 69.5,-3.5 69.5,3.5 82.5,3.5 82.5,11.5 93.5,11.5 93.5,20.5 103.5,20.5 103.5,120";
const ZIG_IN = "4,112 4,28 14,28 14,19 25,19 25,11 38,11 38,4 62,4 62,11 75,11 75,19 86,19 86,28 96,28 96,112";

const CSS = `
.d-velours{--green:#0d2620;--green-2:#11302a;--green-3:#173b32;--deep:#081a15;--wine:#5c1a2b;--wine-d:#43111e;--wine-l:#7b2b3f;--gold:#d4b273;--gold-l:#efdcaa;--gold-d:#9c7c45;--cream:#f3ead6;--dim:#b9ad92;--line:rgba(212,178,115,.24);--line-2:rgba(212,178,115,.55);--pad:clamp(20px,5vw,72px);--ease:cubic-bezier(.22,.68,.16,1);--slow:cubic-bezier(.72,0,.18,1);--deco:"Italiana",Georgia,serif;--zig:${ZIG};--bg:var(--green);--z-bg2:var(--green-2);--z-ink:var(--cream);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--gold);--z-on-accent:#081a15;--z-display:var(--deco);--z-display-weight:400;--z-radius:0;--z-field-radius:0;--z-ico-radius:0;--z-sec:clamp(84px,11vw,168px);--z-h3:clamp(23px,2vw,30px);--z-statement:clamp(34px,4.8vw,74px);background:var(--green);color:var(--cream);font-family:"Jost",system-ui,sans-serif;font-weight:300;font-size:clamp(16px,1.05vw,18px);line-height:1.7}
.d-velours h1,.d-velours h2,.d-velours h3{font-family:var(--deco);font-weight:400;line-height:1.06;letter-spacing:.02em}
.d-velours h2{font-size:clamp(40px,5.4vw,82px)}
.d-velours h2.is-long{font-size:clamp(32px,3.8vw,58px);line-height:1.1}
.d-velours h1 em,.d-velours h2 em{font-style:normal;color:var(--gold)}
.d-velours ::selection{background:var(--gold);color:var(--deep)}
.d-velours .vl-wrap{position:relative;width:min(100%,1240px);margin-inline:auto;padding-inline:var(--pad)}
.d-velours .vl-kick{display:inline-flex;align-items:center;justify-content:center;gap:14px;font-size:12px;font-weight:500;letter-spacing:.32em;text-transform:uppercase;color:var(--gold);text-align:center}
.d-velours p.vl-kick{color:var(--gold)}
.d-velours .vl-kick i{position:relative;flex:none;width:34px;height:1px;background:currentColor;transition:transform 1.1s var(--ease) .2s}
.d-velours .vl-kick i::after{content:"";position:absolute;top:-2.5px;width:5px;height:5px;background:currentColor;transform:rotate(45deg)}
.d-velours .vl-kick i:first-child{transform-origin:100% 50%}.d-velours .vl-kick i:first-child::after{left:-3px}
.d-velours .vl-kick i:last-child{transform-origin:0 50%}.d-velours .vl-kick i:last-child::after{right:-3px}
.demo-js .d-velours .vl-kick[data-rv] i{transform:scaleX(0)}
.demo-js .d-velours .vl-kick[data-rv].in i{transform:none}
.d-velours .vl-orn{display:flex;align-items:center;justify-content:center;gap:12px;color:var(--gold)}
.d-velours .vl-orn i{width:clamp(48px,7vw,96px);height:1px;transition:transform 1.4s var(--ease) .35s}
.d-velours .vl-orn i:first-child{background:linear-gradient(90deg,transparent,currentColor);transform-origin:100% 50%}
.d-velours .vl-orn i:last-child{background:linear-gradient(270deg,transparent,currentColor);transform-origin:0 50%}
.d-velours .vl-orn b{width:9px;height:9px;border:1px solid currentColor;transform:rotate(45deg);transition:transform .9s var(--ease) .2s}
.demo-js .d-velours .vl-orn[data-rv]{opacity:1;transform:none}
.demo-js .d-velours .vl-orn[data-rv] i{transform:scaleX(0)}
.demo-js .d-velours .vl-orn[data-rv] b{transform:rotate(45deg) scale(0)}
.demo-js .d-velours .vl-orn[data-rv].in i{transform:none}
.demo-js .d-velours .vl-orn[data-rv].in b{transform:rotate(45deg)}
.d-velours .vl-head{display:grid;justify-items:center;gap:20px;max-width:900px;margin:0 auto clamp(44px,6vw,84px);text-align:center}
.d-velours .vl-head>p:last-child:not(.vl-kick){max-width:56ch;color:var(--dim)}
.demo-js .d-velours .vl-head h2[data-rv],.demo-js .d-velours .vl-track[data-rv]{transform:none;letter-spacing:.16em;filter:blur(6px);transition:opacity 1.2s var(--ease),letter-spacing 1.5s var(--ease),filter 1.2s var(--ease)}
.demo-js .d-velours .vl-head h2[data-rv].in,.demo-js .d-velours .vl-track[data-rv].in{letter-spacing:.02em;filter:none}
.d-velours .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:54px;padding:0 34px;font-size:12.5px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;white-space:nowrap;isolation:isolate;transition:color .35s,letter-spacing .5s var(--ease)}
.d-velours .btn::before,.d-velours .btn::after{content:"";position:absolute;inset:0;z-index:-1;clip-path:polygon(14px 0,calc(100% - 14px) 0,100% 50%,calc(100% - 14px) 100%,14px 100%,0 50%);transition:opacity .4s,background-position .9s var(--ease),transform .5s var(--ease)}
.d-velours .btn:hover{letter-spacing:.3em}
.d-velours .btn svg{width:16px;height:16px;transition:transform .4s var(--ease)}
.d-velours .btn:hover svg{transform:translateX(4px)}
.d-velours .vl-fill{color:var(--deep)}
.d-velours .vl-fill::before{background:linear-gradient(110deg,var(--gold-d) 0%,var(--gold) 25%,var(--gold-l) 45%,var(--gold) 60%,var(--gold-d) 100%) 0 0/260% 100%}
.d-velours .vl-fill::after{display:none}
.d-velours .vl-fill:hover::before{background-position:100% 0}
.d-velours .vl-line{color:var(--gold-l)}
.d-velours .vl-line::before{background:var(--gold)}
.d-velours .vl-line::after{inset:1px;background:var(--bg)}
.d-velours .vl-line:hover{color:var(--deep)}
.d-velours .vl-line:hover::after{opacity:0;transform:scaleX(.6)}
.d-velours .vl-text{display:inline-flex;align-items:center;min-height:44px;font-size:12.5px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-l);background:linear-gradient(var(--gold),var(--gold)) 50% calc(100% - 8px)/0 1px no-repeat;transition:background-size .5s var(--ease)}
.d-velours .vl-text:hover{background-size:100% 1px}
.d-velours .vl-hdr{position:sticky;top:0;z-index:40;background:rgba(8,26,21,0);transition:background-color .5s,backdrop-filter .5s}
.d-velours .vl-hdr::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold) 30%,var(--gold) 70%,transparent);transform:scaleX(0);transition:transform 1.2s var(--ease)}
.d-velours.is-scrolled .vl-hdr{background:rgba(8,26,21,.93);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.d-velours.is-scrolled .vl-hdr::after{transform:none}
.d-velours .vl-bar{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:12px;height:72px;transition:height .45s var(--ease)}
.d-velours .vl-side{display:flex;align-items:center;gap:18px;min-width:0}
.d-velours .vl-side.is-r{justify-content:flex-end}
.d-velours .vl-logo{display:flex;align-items:center;justify-content:center;gap:14px;min-width:0;max-width:62vw;font-family:var(--deco);font-size:clamp(17px,1.7vw,24px);letter-spacing:.14em;text-transform:uppercase;line-height:1}
.d-velours .vl-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media (max-width:600px){.d-velours .vl-logo{gap:9px;font-size:15.5px;letter-spacing:.07em}.d-velours .vl-mono{width:34px;height:34px;font-size:15px}}
.d-velours .vl-mono{position:relative;display:grid;flex:none;place-items:center;width:38px;height:38px;font-size:17px;letter-spacing:0;color:var(--gold)}
.d-velours .vl-mono::before,.d-velours .vl-mono::after{content:"";position:absolute;inset:5px;border:1px solid var(--gold);transform:rotate(45deg);transition:transform .9s var(--ease)}
.d-velours .vl-mono::after{inset:9px;opacity:.5}
.d-velours .vl-logo:hover .vl-mono::before{transform:rotate(225deg)}
.d-velours .vl-logo:hover .vl-mono::after{transform:rotate(-135deg)}
.d-velours .vl-phone{display:none;font-size:13px;font-weight:400;letter-spacing:.16em;color:var(--dim);transition:color .3s}
.d-velours .vl-phone:hover{color:var(--gold-l)}
.d-velours .vl-cta{display:none;min-height:46px;padding:0 26px;font-size:11.5px}
.d-velours .vl-book{display:grid;place-items:center;width:44px;height:44px;color:var(--gold)}
.d-velours .vl-book svg{width:20px;height:20px}
.d-velours .vl-burger{position:relative;z-index:41;display:grid;place-items:center;width:48px;height:48px;margin-right:-4px;padding:0;border:0;background:none;color:var(--gold)}
.d-velours .vl-burger::before{content:"";position:absolute;inset:9px;border:1px solid var(--line-2);transform:rotate(45deg);transition:transform .7s var(--ease),border-color .3s}
.d-velours .vl-burger:hover::before{border-color:var(--gold)}
.d-velours.menu-open .vl-burger::before{transform:rotate(225deg)}
.d-velours .vl-burger i{position:relative;width:16px;height:1px;background:currentColor;transition:background-color .2s}
.d-velours .vl-burger i::before,.d-velours .vl-burger i::after{content:"";position:absolute;left:0;width:16px;height:1px;background:currentColor;transition:transform .45s var(--ease)}
.d-velours .vl-burger i::before{top:-5px}.d-velours .vl-burger i::after{top:5px}
.d-velours.menu-open .vl-burger i{background:transparent}
.d-velours.menu-open .vl-burger i::before{transform:translateY(5px) rotate(45deg)}
.d-velours.menu-open .vl-burger i::after{transform:translateY(-5px) rotate(-45deg)}
.d-velours .vl-burger .vl-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.d-velours .vl-nav{display:none}
@media (min-width:1000px){.d-velours .vl-bar{height:84px}.d-velours.is-scrolled .vl-bar{height:64px}.d-velours .vl-phone,.d-velours .vl-cta{display:inline-flex}.d-velours .vl-book,.d-velours .vl-burger{display:none}.d-velours .vl-nav{display:flex;justify-content:center;align-items:center;gap:6px;height:44px;border-top:1px solid var(--line);font-size:12px;font-weight:400;letter-spacing:.26em;text-transform:uppercase;transition:height .45s var(--ease),opacity .3s}.d-velours .vl-nav a{position:relative;display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 16px;color:var(--dim);transition:color .3s}.d-velours .vl-nav a::after{content:"";position:absolute;left:50%;right:50%;bottom:10px;height:1px;background:var(--gold);transition:left .45s var(--ease),right .45s var(--ease)}.d-velours .vl-nav a:hover{color:var(--gold-l)}.d-velours .vl-nav a:hover::after{left:16px;right:16px}.d-velours .vl-nav a+a::before{content:"";position:absolute;left:-2px;top:50%;width:4px;height:4px;background:var(--gold);opacity:.6;transform:rotate(45deg)}}
.d-velours .vl-menu{position:fixed;inset:0;z-index:39;display:grid;align-content:center;justify-items:center;gap:30px;padding:110px var(--pad) 120px;background:radial-gradient(ellipse at 50% 0%,rgba(212,178,115,.2),transparent 60%),repeating-conic-gradient(from -90deg at 50% 0%,rgba(212,178,115,.07) 0 1.2deg,transparent 1.2deg 9deg),var(--wine);color:var(--cream);text-align:center;overflow-y:auto;clip-path:inset(0 50% 0 50%);visibility:hidden;transition:clip-path .8s var(--slow),visibility 0s .8s}
.d-velours .vl-menu.is-open{clip-path:inset(0 0 0 0);visibility:visible;transition:clip-path .8s var(--slow)}
.d-velours .vl-menu nav{display:grid;justify-items:center;gap:2px}
.d-velours .vl-menu nav a{display:grid;justify-items:center;min-height:52px;padding:4px 10px;font-family:var(--deco);font-size:clamp(32px,9vw,54px);line-height:1.15;letter-spacing:.04em;opacity:0;transform:translateY(18px);transition:opacity .5s,transform .7s var(--ease),color .3s,letter-spacing .5s var(--ease)}
.d-velours .vl-menu nav a small{font-family:"Jost",sans-serif;font-size:11px;font-weight:500;letter-spacing:.32em;color:var(--gold)}
.d-velours .vl-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.35s + var(--i,0) * 70ms)}
.d-velours .vl-menu nav a:hover{color:var(--gold-l);letter-spacing:.08em}
.d-velours .vl-menu .vl-orn{opacity:0;transition:opacity .6s .3s}
.d-velours .vl-menu.is-open .vl-orn{opacity:1}
.d-velours .vl-menu-foot{display:grid;gap:4px;font-size:15px;color:rgba(243,234,214,.82)}
.d-velours .vl-menu-foot a{display:inline-flex;justify-content:center;align-items:center;min-height:44px;color:var(--gold-l);letter-spacing:.12em}
.d-velours.menu-open .vl-hdr{background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-velours.menu-open .vl-hdr::after{transform:scaleX(0)}
.d-velours.menu-open .vl-logo{position:relative;z-index:41}
.d-velours.menu-open .vl-book{visibility:hidden}
.d-velours .vl-hero{position:relative;padding:clamp(20px,3vw,40px) 0 clamp(72px,9vw,120px);overflow:hidden;isolation:isolate;text-align:center;background:radial-gradient(ellipse 70% 60% at 50% 40%,rgba(212,178,115,.13),transparent 70%),var(--green)}
.d-velours .vl-burst{position:absolute;left:50%;top:44%;z-index:-1;width:min(1600px,190vw);aspect-ratio:1;translate:-50% -50%;rotate:calc(var(--p,0) * 14deg);background:repeating-conic-gradient(from 0deg,rgba(212,178,115,.13) 0 .9deg,transparent .9deg 7.5deg);-webkit-mask:radial-gradient(circle,transparent 9%,#000 16%,rgba(0,0,0,.6) 40%,transparent 66%);mask:radial-gradient(circle,transparent 9%,#000 16%,rgba(0,0,0,.6) 40%,transparent 66%);animation:vl-burst 2.6s var(--ease) .9s both;pointer-events:none}
.d-velours .vl-curtain{position:absolute;inset:0;z-index:6;display:flex;pointer-events:none;animation:vl-gone 0s linear 2.3s forwards}
.d-velours .vl-curtain i{position:relative;flex:1;background:repeating-linear-gradient(90deg,rgba(0,0,0,.28) 0,rgba(255,255,255,.05) 2.2%,rgba(0,0,0,.28) 4.4%),linear-gradient(180deg,var(--wine-l),var(--wine) 40%,var(--wine-d));animation:vl-left 1.7s var(--slow) .45s forwards}
.d-velours .vl-curtain i:last-child{animation-name:vl-right}
.d-velours .vl-curtain i::after{content:"";position:absolute;top:0;bottom:0;width:10px;background:repeating-linear-gradient(180deg,var(--gold) 0 3px,var(--gold-d) 3px 6px)}
.d-velours .vl-curtain i:first-child::after{right:0}
.d-velours .vl-curtain i:last-child::after{left:0}
.d-velours .vl-curtain b{position:absolute;left:50%;top:42%;z-index:2;display:grid;place-items:center;width:84px;height:84px;font-family:var(--deco);font-size:34px;font-weight:400;color:var(--gold);translate:-50% -50%;animation:vl-seal .5s var(--ease) .25s forwards}
.d-velours .vl-curtain b::before{content:"";position:absolute;inset:10px;border:1px solid var(--gold);background:var(--wine-d);transform:rotate(45deg);z-index:-1}
.d-velours .vl-hero-in{display:grid;grid-template-columns:minmax(0,1fr);grid-template-areas:"eye" "arch" "h1" "lede" "cta" "l" "r";justify-items:center}
@media (min-width:960px){.d-velours .vl-hero-in{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);grid-template-areas:"eye eye eye" "l arch r" "h1 h1 h1" "lede lede lede" "cta cta cta";column-gap:clamp(28px,4vw,72px)}}
.d-velours .vl-eye{grid-area:eye;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px 16px;margin-bottom:clamp(20px,3vw,34px);animation:vl-up 1s var(--ease) 1.3s both}
.d-velours .vl-arch{grid-area:arch;position:relative;width:min(76vw,330px,40svh);aspect-ratio:5/6;animation:vl-rise 1.8s var(--ease) .8s both}
@media (min-width:960px){.d-velours .vl-arch{width:min(31vw,410px,45svh)}}
.d-velours .vl-arch-pic{position:absolute;inset:0;overflow:hidden;clip-path:var(--zig);background:var(--wine-d)}
.d-velours .vl-arch-pic img{width:100%;height:100%;object-fit:cover;animation:vl-zoom 2.6s var(--ease) .6s both}
.d-velours .vl-arch-pic::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(13,38,32,.55) 75%,var(--green) 100%)}
.d-velours .vl-arch svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;fill:none;stroke:var(--gold);stroke-width:.3;pointer-events:none}
.d-velours .vl-arch svg polyline{stroke-dasharray:1;stroke-dashoffset:1;animation:vl-draw 2.4s var(--ease) 1.2s forwards}
.d-velours .vl-arch svg polyline+polyline{stroke-opacity:.5;animation-delay:1.6s}
.d-velours .vl-arch.is-plain .vl-arch-pic{display:grid;place-items:center;background:repeating-conic-gradient(from -90deg at 50% 100%,rgba(212,178,115,.16) 0 1deg,transparent 1deg 8deg),radial-gradient(ellipse at 50% 100%,var(--wine-l),var(--wine) 50%,var(--wine-d))}
.d-velours .vl-arch.is-plain .vl-arch-pic::after{background:linear-gradient(180deg,transparent 60%,var(--green))}
.d-velours .vl-arch-mono{position:relative;z-index:1;margin-top:-12%;font-family:var(--deco);font-size:clamp(120px,15vw,220px);line-height:1;color:var(--gold);text-shadow:0 0 60px rgba(212,178,115,.35)}
.d-velours .vl-pil{display:none}
@media (min-width:960px){.d-velours .vl-pil{display:grid;align-self:end;gap:28px;padding-bottom:18%;animation:vl-up 1.2s var(--ease) 1.9s both}.d-velours .vl-pil.is-l{grid-area:l;justify-items:end;text-align:right}.d-velours .vl-pil.is-r{grid-area:r;justify-items:start;text-align:left}}
.d-velours .vl-pil div{display:grid;gap:4px;max-width:20ch}
.d-velours .vl-pil dt{font-size:11px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}
.d-velours .vl-pil dd{margin:0;font-family:var(--deco);font-size:clamp(19px,1.6vw,24px);line-height:1.25}
.d-velours .vl-pil::before{content:"";width:22px;height:clamp(60px,8vw,110px);background:linear-gradient(90deg,var(--gold) 0 1px,transparent 1px 10px,var(--gold) 10px 11px,transparent 11px 20px,var(--gold) 20px 21px,transparent 21px);opacity:.5;-webkit-mask:linear-gradient(transparent,#000);mask:linear-gradient(transparent,#000)}
.d-velours .vl-hero h1{grid-area:h1;position:relative;z-index:2;max-width:16ch;margin-top:-.62em;font-size:clamp(50px,7.6vw,128px);line-height:1;letter-spacing:.01em}
.d-velours .vl-hero h1.is-m{max-width:18ch;font-size:clamp(42px,6.2vw,100px)}
.d-velours .vl-hero h1.is-s{max-width:22ch;font-size:clamp(34px,4.6vw,74px);line-height:1.06}
.d-velours .vl-ln{display:block}
.d-velours .vl-w{display:inline-block;white-space:nowrap}
.d-velours .vl-w.is-em{color:var(--gold)}
.d-velours .vl-ln i{display:inline-block;font-style:normal;animation:vl-close 1.7s var(--ease) both;animation-delay:calc(1.05s + var(--i,0) * .2s)}
.d-velours .vl-hero h1:not(.is-marked) .vl-ln:nth-child(2) .vl-w{color:var(--gold)}
.d-velours .vl-lede{grid-area:lede;max-width:50ch;margin-top:clamp(20px,2.4vw,30px);font-size:clamp(17px,1.25vw,20px);color:var(--dim);animation:vl-up 1.1s var(--ease) 1.75s both}
.d-velours .vl-cta-row{grid-area:cta;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px 22px;margin-top:clamp(28px,3vw,40px);animation:vl-up 1.1s var(--ease) 1.9s both}
.d-velours .vl-facts{display:grid;gap:18px;margin-top:40px;padding-top:30px;border-top:1px solid var(--line);width:min(100%,360px)}
.d-velours .vl-facts.is-l{grid-area:l}.d-velours .vl-facts.is-r{grid-area:r;margin-top:18px;padding-top:0;border:0}
.d-velours .vl-facts div{display:grid;gap:2px}
.d-velours .vl-facts dt{font-size:11px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}
.d-velours .vl-facts dd{margin:0;font-family:var(--deco);font-size:21px}
.d-velours .vl-facts a,.d-velours .vl-pil a{display:inline-flex;min-height:40px;align-items:center}
@media (min-width:960px){.d-velours .vl-facts{display:none}}
.d-velours .vl-now{display:inline-flex;align-items:center;gap:9px;padding:6px 14px;border:1px solid var(--line-2);font-size:11px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-l);vertical-align:middle}
.d-velours .vl-now::before{content:"";width:6px;height:6px;background:currentColor;transform:rotate(45deg)}
.d-velours .vl-now.is-open::before{background:#8fd4a8;box-shadow:0 0 10px #8fd4a8}
.d-velours .vl-now.is-closed::before{background:#e0908f}
.d-velours .vl-sec{position:relative;padding-block:var(--z-sec)}
.d-velours .vl-sec.is-deep{--bg:var(--deep);background:var(--deep)}
.d-velours .vl-sec.is-wine{--bg:var(--wine);background:var(--wine)}
.d-velours .vl-sec.is-green2{--bg:var(--green-2);background:var(--green-2)}
.d-velours .vl-sec.is-fluted{background-image:repeating-linear-gradient(90deg,rgba(212,178,115,.035) 0 1px,transparent 1px 64px)}
.d-velours .vl-gem::before{content:"";position:absolute;left:50%;top:0;z-index:2;width:16px;height:16px;border:1px solid var(--gold);background:var(--bg);transform:translate(-50%,-50%) rotate(45deg)}
.d-velours .vl-gem::after{content:"";position:absolute;left:50%;top:0;z-index:2;width:6px;height:6px;background:var(--gold);transform:translate(-50%,-50%) rotate(45deg)}
.d-velours .vl-rays{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.d-velours .vl-rays::before{content:"";position:absolute;left:50%;top:0;width:min(1400px,200vw);aspect-ratio:1;translate:-50% -50%;rotate:calc(var(--p,0) * -10deg);background:repeating-conic-gradient(from 0deg,rgba(212,178,115,.09) 0 .8deg,transparent .8deg 6deg);-webkit-mask:radial-gradient(circle,#000 10%,transparent 62%);mask:radial-gradient(circle,#000 10%,transparent 62%)}
.d-velours .vl-about{display:grid;gap:clamp(36px,5vw,64px);justify-items:center;text-align:center}
@media (min-width:960px){.d-velours .vl-about{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;text-align:left}.d-velours .vl-about-l{text-align:right;justify-items:end}.d-velours .vl-about.is-solo{grid-template-columns:minmax(0,1fr) 1px minmax(0,1fr)}}
.d-velours .vl-about-l,.d-velours .vl-about-r{display:grid;gap:20px;max-width:46ch;align-content:center}
.d-velours .vl-about-r{justify-items:start}
@media (max-width:959px){.d-velours .vl-about-r{justify-items:center}}
.d-velours .vl-lead{font-family:var(--deco);font-size:clamp(23px,2.1vw,31px);line-height:1.35;color:var(--cream)}
.d-velours .vl-about p:not(.vl-lead){color:var(--dim)}
.d-velours .vl-frame{position:relative;width:min(78vw,360px);aspect-ratio:5/6;margin:14px}
.d-velours .vl-frame>div{position:absolute;inset:0;overflow:hidden;clip-path:var(--zig);background:var(--wine-d)}
.d-velours .vl-frame img{width:100%;height:116%;margin-top:-8%;object-fit:cover;transform:translateY(calc(var(--p,0) * -6%));transition:transform .15s linear}
.d-velours .vl-frame svg{position:absolute;inset:0;width:100%;height:100%;fill:none;stroke:var(--gold);stroke-width:.36;overflow:visible;pointer-events:none}
.d-velours .vl-frame svg polyline+polyline{stroke-opacity:.5}
.d-velours .vl-frame svg polyline{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 2.4s var(--ease) .3s}
.d-velours .vl-frame.in svg polyline,html:not(.demo-js) .d-velours .vl-frame svg polyline{stroke-dashoffset:0}
.d-velours .vl-frame:hover img{transform:translateY(calc(var(--p,0) * -6%)) scale(1.04)}
.d-velours .vl-pillar{display:none}
@media (min-width:960px){.d-velours .vl-pillar{display:block;align-self:stretch;width:1px;background:linear-gradient(transparent,var(--gold),transparent)}}
.d-velours .vl-gems{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 0;grid-column:1/-1;margin-top:8px}
.d-velours .vl-gems li{display:inline-flex;align-items:center;font-size:13px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-l)}
.d-velours .vl-gems li+li::before{content:"";width:5px;height:5px;margin:0 20px;background:var(--gold);transform:rotate(45deg)}
.d-velours .vl-card{position:relative;padding:clamp(28px,4.4vw,72px) clamp(20px,4.4vw,72px);border:1px solid var(--line-2);background:linear-gradient(180deg,rgba(212,178,115,.05),transparent 40%)}
.d-velours .vl-card::before{content:"";position:absolute;inset:8px;border:1px solid var(--line);pointer-events:none}
.d-velours .vl-corner{position:absolute;width:44px;height:44px;color:var(--gold);pointer-events:none}
.d-velours .vl-corner svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1}
.d-velours .vl-corner:nth-of-type(1){left:-1px;top:-1px}
.d-velours .vl-corner:nth-of-type(2){right:-1px;top:-1px;transform:scaleX(-1)}
.d-velours .vl-corner:nth-of-type(3){left:-1px;bottom:-1px;transform:scaleY(-1)}
.d-velours .vl-corner:nth-of-type(4){right:-1px;bottom:-1px;transform:scale(-1)}
.d-velours .vl-prices-wrap{display:grid;gap:40px;justify-items:center}
@media (min-width:1180px){.d-velours .vl-prices-wrap.has-pics{grid-template-columns:220px minmax(0,720px) 220px;justify-content:center;align-items:center;gap:56px}}
.d-velours .vl-side-pic{display:none}
@media (min-width:1180px){.d-velours .vl-side-pic{display:block;position:relative;width:220px;aspect-ratio:1/2.1;overflow:hidden;border-radius:999px 999px 0 0;outline:1px solid var(--line-2);outline-offset:8px}.d-velours .vl-side-pic img{width:100%;height:100%;object-fit:cover;transform:scale(1.08);transition:transform 1.2s var(--ease)}.d-velours .vl-side-pic:hover img{transform:scale(1)}}
.d-velours .vl-prices-wrap .vl-card{width:100%}
.d-velours .vl-prices{display:grid;column-gap:clamp(40px,6vw,96px)}
@media (min-width:980px){.d-velours .vl-prices.is-two{grid-template-columns:repeat(2,minmax(0,1fr));background:linear-gradient(var(--line),var(--line)) 50% 0/1px 100% no-repeat}}
.d-velours .vl-price{display:grid;grid-template-columns:46px minmax(0,1fr);grid-template-rows:auto auto;gap:4px 18px;align-items:start;align-content:start;padding:22px 0;border-bottom:1px solid var(--line)}
.d-velours .vl-price:last-child{border-bottom:0}
@media (min-width:980px){.d-velours .vl-prices.is-two .vl-price:nth-last-child(2):nth-child(odd){border-bottom:0}}
.d-velours .vl-num{position:relative;display:grid;grid-column:1;grid-row:1/3;place-items:center;width:42px;height:42px;font-family:var(--deco);font-size:15px;color:var(--gold);letter-spacing:.04em}
.d-velours .vl-num::before{content:"";position:absolute;inset:6px;border:1px solid var(--line-2);transform:rotate(45deg);transition:transform .7s var(--ease),background-color .4s,border-color .4s}
.d-velours .vl-price:hover .vl-num{color:var(--deep)}
.d-velours .vl-price:hover .vl-num::before{transform:rotate(225deg);background:var(--gold);border-color:var(--gold)}
.d-velours .vl-num span{position:relative}
.d-velours .vl-price-row{grid-column:2;grid-row:1;display:flex;align-items:baseline;gap:12px;min-width:0}
.d-velours .vl-price h3{font-size:clamp(22px,1.9vw,28px);line-height:1.15;transition:color .3s}
.d-velours .vl-price:hover h3{color:var(--gold-l)}
.d-velours .vl-leader{flex:1;min-width:20px;height:3px;background:radial-gradient(circle,var(--gold) 1px,transparent 1.3px) 0 50%/8px 3px repeat-x;opacity:.55;transform:translateY(-5px);clip-path:inset(0 100% 0 0);transition:clip-path 1.4s var(--ease);transition-delay:calc(.3s + var(--i,0) * 120ms)}
.d-velours .vl-price.in .vl-leader,html:not(.demo-js) .d-velours .vl-leader{clip-path:inset(0)}
.d-velours .vl-val{flex:none;display:grid;justify-items:end;font-size:13px;font-weight:500;letter-spacing:.14em;color:var(--gold);white-space:nowrap}
.d-velours .vl-val small{font-size:11px;letter-spacing:.2em;color:var(--dim);text-transform:uppercase}
.d-velours .vl-val.is-gem{width:7px;height:7px;background:var(--gold);transform:translateY(-5px) rotate(45deg)}
.d-velours .vl-price p{grid-column:2;grid-row:2;color:var(--dim);font-size:.96em}
.d-velours .vl-note{margin-top:28px;text-align:center;font-size:14px;color:var(--dim)}
.d-velours .vl-carte{display:grid;gap:clamp(40px,5vw,72px) clamp(40px,6vw,96px)}
@media (min-width:900px){.d-velours .vl-carte{grid-template-columns:repeat(2,minmax(0,1fr))}.d-velours .vl-carte.is-one{grid-template-columns:minmax(0,1fr);max-width:640px;margin-inline:auto}}
.d-velours .vl-course{display:grid;gap:18px;align-content:start;text-align:center}
.d-velours .vl-course>h3{display:flex;align-items:center;justify-content:center;gap:16px;font-size:clamp(26px,2.4vw,34px);color:var(--gold-l)}
.d-velours .vl-course>h3::before,.d-velours .vl-course>h3::after{content:"";flex:1;max-width:80px;height:1px;background:linear-gradient(90deg,transparent,var(--gold))}
.d-velours .vl-course>h3::after{transform:scaleX(-1)}
.d-velours .vl-dish{display:grid;justify-items:center;gap:4px;padding:10px 12px;transition:background-color .4s}
.d-velours .vl-dish:hover{background:rgba(212,178,115,.06)}
.d-velours .vl-dish b{font-family:var(--deco);font-size:clamp(21px,1.7vw,25px);font-weight:400;letter-spacing:.03em}
.d-velours .vl-dish p{max-width:42ch;font-size:.94em;color:var(--dim)}
.d-velours .vl-dish span{font-size:13px;font-weight:500;letter-spacing:.16em;color:var(--gold)}
.d-velours .vl-dish-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:6px}
.d-velours .vl-dish-tags i{padding:2px 10px;border:1px solid var(--line);font-size:11px;font-style:normal;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}
.d-velours .vl-medals{display:flex;flex-wrap:wrap;justify-content:center;gap:clamp(40px,5vw,64px) clamp(28px,4vw,56px)}
.d-velours .vl-medals>li{display:grid;justify-items:center;gap:14px;width:min(100%,320px);text-align:center}
.d-velours .vl-medal{position:relative;display:grid;place-items:center;width:92px;height:92px;margin-bottom:6px;color:var(--gold)}
.d-velours .vl-medal::before,.d-velours .vl-medal::after{content:"";position:absolute;inset:0;clip-path:polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%);transition:transform .9s var(--ease),background-color .4s}
.d-velours .vl-medal::before{background:var(--gold)}
.d-velours .vl-medal::after{inset:1px;background:var(--bg)}
.d-velours .vl-medal i{position:absolute;inset:-18px;border-radius:50%;background:repeating-conic-gradient(rgba(212,178,115,.35) 0 1deg,transparent 1deg 15deg);-webkit-mask:radial-gradient(circle,transparent 52%,#000 54%,transparent 72%);mask:radial-gradient(circle,transparent 52%,#000 54%,transparent 72%);opacity:0;transform:scale(.7) rotate(-30deg);transition:opacity .6s,transform 1.2s var(--ease)}
.d-velours .vl-medal svg{position:relative;z-index:1;width:30px;height:30px;transition:transform .6s var(--ease)}
.d-velours .vl-medals>li:hover .vl-medal::before,.d-velours .vl-medals>li:hover .vl-medal::after{transform:rotate(45deg)}
.d-velours .vl-medals>li:hover .vl-medal i{opacity:1;transform:none}
.d-velours .vl-medals>li:hover .vl-medal svg{transform:scale(1.12)}
.d-velours .vl-medals h3{font-size:clamp(24px,2vw,30px)}
.d-velours .vl-medals p{color:var(--dim)}
.d-velours .is-wine .vl-medals p,.d-velours .is-wine .vl-head>p:last-child:not(.vl-kick){color:rgba(243,234,214,.8)}
.d-velours .vl-steps{position:relative;display:grid;gap:0;max-width:1000px;margin-inline:auto}
.d-velours .vl-steps::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:1px;background:var(--line);transform:translateX(-50%)}
.d-velours .vl-steps::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(var(--gold-l),var(--gold));transform:translateX(-50%) scaleY(var(--prog,0));transform-origin:50% 0}
.d-velours .vl-step{position:relative;display:grid;justify-items:center;gap:12px;padding:0 0 clamp(48px,6vw,80px);text-align:center}
.d-velours .vl-step:last-child{padding-bottom:0}
.d-velours .vl-step-n{position:relative;z-index:1;display:grid;place-items:center;width:64px;height:64px;font-family:var(--deco);font-size:20px;color:var(--gold);background:var(--bg);transition:color .6s}
.d-velours .vl-step-n::before{content:"";position:absolute;inset:10px;border:1px solid var(--line-2);background:var(--bg);transform:rotate(45deg);transition:background-color .6s,border-color .6s,transform 1s var(--ease);z-index:-1}
.d-velours .vl-step.is-on .vl-step-n{color:var(--deep)}
.d-velours .vl-step.is-on .vl-step-n::before{background:var(--gold);border-color:var(--gold);transform:rotate(225deg)}
.d-velours .vl-step-t{position:relative;z-index:1;display:grid;gap:8px;max-width:40ch;padding:16px 18px;background:var(--bg)}
.d-velours .vl-step-t p{color:var(--dim)}
@media (min-width:860px){.d-velours .vl-step{grid-template-columns:minmax(0,1fr) 64px minmax(0,1fr);align-items:center;gap:0 clamp(28px,4vw,56px);padding-bottom:clamp(40px,5vw,64px)}.d-velours .vl-step-n{grid-column:2}.d-velours .vl-step-t{grid-row:1;padding:0;background:none}.d-velours .vl-step:nth-child(odd) .vl-step-t{grid-column:1;justify-self:end;text-align:right}.d-velours .vl-step:nth-child(even) .vl-step-t{grid-column:3;justify-self:start;text-align:left}}
.d-velours .vl-arcade{display:grid;gap:clamp(14px,2vw,28px);grid-template-columns:repeat(2,minmax(0,1fr));align-items:end;padding-top:12px}
@media (min-width:900px){.d-velours .vl-arcade{grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,44px)}.d-velours .vl-arcade.is-1{grid-template-columns:minmax(0,520px);justify-content:center}.d-velours .vl-arcade.is-2{grid-template-columns:repeat(2,minmax(0,420px));justify-content:center}}
.d-velours .vl-arcade figure{position:relative;aspect-ratio:3/4;overflow:hidden;border-radius:999px 999px 0 0;outline:1px solid var(--line-2);outline-offset:7px;transition:outline-color .4s,outline-offset .6s var(--ease)}
.d-velours .vl-arcade figure.is-zig{border-radius:0;outline:0;clip-path:var(--zig);aspect-ratio:3/4.5}
.d-velours .vl-arcade img{width:100%;height:100%;object-fit:cover;transform:scale(1.06);transition:transform 1.4s var(--ease),filter .8s}
.d-velours .vl-arcade figure::after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(239,220,170,.28) 50%,transparent 65%);transform:translateX(-110%);transition:transform 1.1s var(--ease)}
.d-velours .vl-arcade figure:hover{outline-color:var(--gold);outline-offset:11px}
.d-velours .vl-arcade figure:hover img{transform:none}
.d-velours .vl-arcade figure:hover::after{transform:translateX(110%)}
@media (max-width:899px){.d-velours .vl-arcade figure.is-zig{grid-column:1/-1;width:min(100%,420px);justify-self:center}}
.d-velours .vl-plaque{position:relative;width:min(100%,640px);margin-inline:auto;padding:clamp(56px,6vw,76px) clamp(22px,4vw,56px) clamp(32px,4vw,52px);border:1px solid var(--line-2);background:linear-gradient(180deg,rgba(212,178,115,.07),transparent 50%);text-align:center}
.d-velours .vl-plaque::before{content:"";position:absolute;inset:8px;border:1px solid var(--line);pointer-events:none}
.d-velours .vl-crest{position:absolute;left:50%;top:0;width:120px;height:62px;padding:0 10px;background:var(--bg);translate:-50% -50%;color:var(--gold)}
.d-velours .vl-crest svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1}
.d-velours .vl-plaque h3{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px 16px;margin-bottom:22px;font-size:clamp(26px,2.4vw,34px)}
.d-velours .z-hours{border-top:0;text-align:left}
.d-velours .z-hours div{display:flex;align-items:baseline;gap:12px;padding:12px 6px;border-bottom:1px solid var(--line);transition:background-color .3s}
.d-velours .z-hours div::after{content:"";order:1;flex:1;min-width:16px;height:3px;background:radial-gradient(circle,var(--gold) 1px,transparent 1.3px) 0 50%/8px 3px repeat-x;opacity:.45}
.d-velours .z-hours dt{order:0;font-family:var(--deco);font-size:clamp(18px,1.4vw,21px);letter-spacing:.03em}
.d-velours .z-hours dd{order:2;white-space:nowrap;font-size:14px;font-weight:400;letter-spacing:.08em;color:var(--dim);font-variant-numeric:tabular-nums}
.d-velours .z-hours div.is-today{position:relative;background:rgba(212,178,115,.1)}
.d-velours .z-hours div.is-today dt,.d-velours .z-hours div.is-today dd{color:var(--gold-l)}
.d-velours .z-hours div.is-today::before{content:"";position:absolute;left:-14px;top:50%;width:7px;height:7px;background:var(--gold);transform:translateY(-50%) rotate(45deg)}
.d-velours .vl-plaque .z-reach{justify-items:center;margin-top:22px}
.d-velours .z-reach{font-style:normal}
.d-velours .z-reach a{color:var(--cream);letter-spacing:.04em;transition:color .3s}
.d-velours .z-reach a:hover{color:var(--gold-l)}
.d-velours .z-reach .z-route{font-size:12.5px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.d-velours .vl-visit-note{max-width:56ch;margin:0 auto 32px;text-align:center;color:var(--dim)}
.d-velours .vl-reach-row{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 0;margin-top:36px;font-style:normal;text-align:center}
.d-velours .vl-reach-row>*{display:inline-flex;align-items:center;min-height:44px;color:var(--cream)}
.d-velours .vl-reach-row>*+*::before{content:"";width:5px;height:5px;margin:0 18px;background:var(--gold);transform:rotate(45deg)}
.d-velours .vl-reach-row a{transition:color .3s}
.d-velours .vl-reach-row a:hover{color:var(--gold-l)}
.d-velours .vl-reach-row .z-route{font-size:12.5px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.d-velours .vl-duo{display:grid;gap:clamp(28px,4vw,48px);align-items:start}
@media (min-width:960px){.d-velours .vl-duo{grid-template-columns:repeat(2,minmax(0,1fr))}.d-velours .vl-duo .vl-plaque{width:100%;height:100%}}
.d-velours .vl-duo.is-one{grid-template-columns:minmax(0,1fr)}
.d-velours .vl-form{position:relative;padding:clamp(28px,3.6vw,52px);border:1px solid var(--line-2);background:var(--bg)}
.d-velours .vl-form::before{content:"";position:absolute;inset:8px;border:1px solid var(--line);pointer-events:none}
.d-velours .vl-form>*{position:relative}
@media (max-width:959px){.d-velours .vl-duo .vl-form{order:-1}}
.d-velours .vl-form-t{margin-bottom:24px;text-align:center;font-family:var(--deco);font-size:clamp(24px,2.2vw,30px);color:var(--gold-l)}
.d-velours .z-field label,.d-velours .z-chipset legend{font-size:11px;font-weight:500;letter-spacing:.24em;color:var(--gold)}
.d-velours .z-field input,.d-velours .z-field select,.d-velours .z-field textarea{border:0;border-bottom:1px solid var(--line-2);padding-inline:2px;background:transparent;color:var(--cream);transition:border-color .3s,background-color .3s}
.d-velours .z-field input:focus,.d-velours .z-field select:focus,.d-velours .z-field textarea:focus{border-color:var(--gold);background:rgba(212,178,115,.06)}
.d-velours .z-field :focus-visible{outline:1px solid var(--gold);outline-offset:2px}
.d-velours .z-field input::-webkit-calendar-picker-indicator{filter:invert(.8) sepia(1) saturate(2) hue-rotate(5deg)}
.d-velours .z-field select{background-image:linear-gradient(45deg,transparent 50%,var(--gold) 50%),linear-gradient(135deg,var(--gold) 50%,transparent 50%);background-position:calc(100% - 14px) 52%,calc(100% - 9px) 52%;background-size:5px 5px;background-repeat:no-repeat}
.d-velours .z-chips button{border-color:var(--line-2);font-family:var(--deco)}
.d-velours .z-chips button[aria-pressed="true"]{background:var(--gold);color:var(--deep)}
.d-velours .form-note{text-align:center;color:var(--dim)}
.d-velours .form-status{border-color:var(--gold);text-align:center;color:var(--gold-l)}
.d-velours .vl-doors{display:flex;flex-wrap:wrap;justify-content:center;gap:clamp(20px,3vw,36px)}
.d-velours .vl-doors>li{width:min(100%,330px)}
.d-velours .vl-door{position:relative;display:grid;justify-items:center;gap:12px;height:100%;padding:clamp(74px,7vw,92px) 28px 36px;text-align:center;isolation:isolate}
.d-velours .vl-door::before,.d-velours .vl-door::after{content:"";position:absolute;inset:0;z-index:-1;clip-path:var(--zig);transition:background-color .5s}
.d-velours .vl-door::before{background:var(--line-2)}
.d-velours .vl-door::after{inset:1px;background:var(--bg)}
.d-velours .vl-door:hover::before{background:var(--gold)}
.d-velours .vl-door:hover::after{background:linear-gradient(180deg,rgba(212,178,115,.12),var(--bg) 70%),var(--bg)}
.d-velours .vl-door-ico{display:grid;place-items:center;width:52px;height:52px;color:var(--gold);transition:transform .7s var(--ease)}
.d-velours .vl-door-ico svg{width:26px;height:26px}
.d-velours .vl-door:hover .vl-door-ico{transform:translateY(-4px)}
.d-velours .vl-door p{color:var(--dim)}
.d-velours .vl-door em{margin-top:6px;font-style:normal;font-size:20px;color:var(--gold);transition:transform .5s var(--ease)}
.d-velours .vl-door:hover em{transform:translateX(6px)}
.d-velours .z-head{justify-items:center;max-width:900px;margin-inline:auto;text-align:center}
.d-velours .z-head .vl-kick{margin-bottom:2px}
.d-velours .z-intro{margin-inline:auto}
.d-velours .z-sec.z-cta,.d-velours .z-sec.z-showcase:not(.has-pic){--bg:var(--wine);background:radial-gradient(ellipse at 50% 120%,rgba(212,178,115,.22),transparent 60%),var(--wine);overflow:hidden}
.d-velours .z-cta::before{content:"";position:absolute;left:50%;bottom:0;width:min(1400px,220vw);aspect-ratio:2/1;translate:-50% 0;background:repeating-conic-gradient(from -90deg at 50% 100%,rgba(212,178,115,.12) 0 .9deg,transparent .9deg 7deg);-webkit-mask:radial-gradient(ellipse at 50% 100%,#000 15%,transparent 70%);mask:radial-gradient(ellipse at 50% 100%,#000 15%,transparent 70%);pointer-events:none}
.d-velours .z-cta .z-center{position:relative}
.d-velours .z-cta h2{font-size:clamp(42px,6vw,92px)}
.d-velours .z-cta .z-center>p{color:rgba(243,234,214,.82)}
.d-velours .z-sec.z-statement{text-align:center;background:var(--deep);--bg:var(--deep)}
.d-velours .z-statement .z-center::before{content:"";width:150px;height:76px;background:repeating-conic-gradient(from -90deg at 50% 100%,var(--gold) 0 .9deg,transparent .9deg 10deg);-webkit-mask:radial-gradient(circle at 50% 100%,transparent 22%,#000 24%,#000 98%,transparent 100%);mask:radial-gradient(circle at 50% 100%,transparent 22%,#000 24%,#000 98%,transparent 100%);opacity:.8}
.d-velours .z-statement h2{max-width:24ch;line-height:1.16;letter-spacing:.02em}
.d-velours .z-statement .vl-kick{order:-1}
.d-velours .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(8,26,21,.25),rgba(8,26,21,.9))}
.d-velours .z-show-in{justify-items:center;text-align:center}
.d-velours .z-showcase h2{font-size:clamp(40px,5.6vw,86px)}
.d-velours .z-showcase.has-pic .vl-line::after{background:rgba(8,26,21,.6)}
.d-velours .z-sec.z-faq,.d-velours .z-sec.z-packages{--bg:var(--green-2);background:var(--green-2)}
.d-velours .z-acc{border-color:var(--line-2)}
.d-velours .z-acc details{border-color:var(--line)}
.d-velours .z-acc summary{font-family:var(--deco);font-size:clamp(20px,1.7vw,25px);letter-spacing:.02em;transition:color .3s}
.d-velours .z-acc summary:hover,.d-velours .z-acc details[open] summary{color:var(--gold-l)}
.d-velours .z-acc summary i{width:12px;height:12px;border:1px solid var(--gold);transform:rotate(45deg);transition:transform .5s var(--ease),background-color .4s}
.d-velours .z-acc summary i::before,.d-velours .z-acc summary i::after{display:none}
.d-velours .z-acc details[open] summary i{transform:rotate(225deg);background:var(--gold)}
.d-velours .z-card,.d-velours .z-panel,.d-velours .z-channel{position:relative;border:1px solid var(--line-2);background:transparent;transition:border-color .4s,transform .6s var(--ease)}
.d-velours .z-card:hover{border-color:var(--gold);transform:translateY(-4px)}
.d-velours .z-pack{text-align:center;justify-items:center}
.d-velours .z-pack h3{font-size:clamp(28px,2.4vw,36px)}
.d-velours .z-pack.is-featured{--bg:var(--wine);background:linear-gradient(180deg,rgba(212,178,115,.12),transparent 50%),var(--wine);border-color:var(--gold);outline:1px solid var(--line);outline-offset:-9px}
.d-velours .z-pack .z-ticks li{padding-left:0}
.d-velours .z-pack .z-ticks li::before{display:none}
.d-velours .z-ticks li::before{top:.66em;width:6px;height:6px;transform:rotate(45deg)}
.d-velours .z-tag{color:var(--gold-l)}
.d-velours .z-team .z-grid{justify-items:center;text-align:center}
.d-velours .z-team .z-pic{border-radius:999px 999px 0 0;outline:1px solid var(--line-2);outline-offset:7px;width:100%}
.d-velours .z-team .z-grid>li{justify-items:center}
.d-velours .z-quotes blockquote{position:relative;padding-top:58px;border-top:0;background:linear-gradient(90deg,var(--line-2) calc(50% - 34px),transparent 0 calc(50% + 34px),var(--line-2) 0) 0 0/100% 1px no-repeat;text-align:center;justify-items:center}
.d-velours .z-quotes blockquote::before{content:"\\201C";position:absolute;left:50%;top:-14px;translate:-50% 0;font-family:var(--deco);font-size:64px;line-height:1;color:var(--gold)}
.d-velours .z-quotes footer a{color:var(--gold)}
.d-velours .z-ba{outline:1px solid var(--line-2);outline-offset:7px}
.d-velours .z-ba::after{background:var(--gold);width:1px}
.d-velours .z-ba figcaption{background:rgba(8,26,21,.8);letter-spacing:.08em}
.d-velours .z-steps small,.d-velours .z-rows small{font-family:var(--deco);font-size:20px;letter-spacing:.04em}
.d-velours .z-ico{border-color:var(--line-2);transform:rotate(45deg)}
.d-velours .z-ico svg{transform:rotate(-45deg)}
.d-velours .z-pic{outline:1px solid var(--line);outline-offset:6px}
.d-velours .vl-foot{position:relative;padding:clamp(80px,9vw,130px) 0 140px;background:var(--deep);text-align:center;overflow:hidden}
.d-velours .vl-foot-fan{position:absolute;left:50%;top:0;width:min(1100px,170vw);translate:-50% -50%;rotate:calc(var(--p,0) * 8deg);color:var(--gold);opacity:.32;pointer-events:none}
.d-velours .vl-foot-fan svg{display:block;width:100%;height:auto;fill:none;stroke:currentColor;stroke-width:.5}
.d-velours .vl-foot-in{position:relative;display:grid;justify-items:center;gap:26px}
.d-velours .vl-foot .vl-mono{width:60px;height:60px;font-size:26px}
.d-velours .vl-foot-name{max-width:100%;font-family:var(--deco);font-size:clamp(38px,min(9vw,calc(150vw / var(--n,10))),120px);line-height:1;letter-spacing:.06em;text-transform:uppercase;overflow-wrap:anywhere}
.demo-js .d-velours .vl-foot-name[data-rv]{letter-spacing:.3em}
.demo-js .d-velours .vl-foot-name[data-rv].in{letter-spacing:.06em}
.d-velours .vl-foot-grid{display:grid;gap:36px;width:100%;margin-top:clamp(28px,4vw,48px);padding-top:clamp(36px,4vw,52px);border-top:1px solid var(--line)}
@media (min-width:820px){.d-velours .vl-foot-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
.d-velours .vl-foot-grid h3{margin-bottom:14px;font-family:"Jost",sans-serif;font-size:11.5px;font-weight:500;letter-spacing:.32em;text-transform:uppercase;color:var(--gold)}
.d-velours .vl-foot-grid a,.d-velours .vl-foot-grid span{display:block;padding:4px 0;color:var(--dim)}
.d-velours .vl-foot-grid a{display:flex;justify-content:center;align-items:center;min-height:40px;padding:0;transition:color .3s,letter-spacing .4s var(--ease)}
.d-velours .vl-foot-grid a:hover{color:var(--gold-l);letter-spacing:.06em}
.d-velours .vl-blurb{max-width:56ch;color:var(--dim)}
.d-velours .vl-top{display:grid;place-items:center;width:52px;height:52px;color:var(--gold);position:relative}
.d-velours .vl-top::before{content:"";position:absolute;inset:10px;border:1px solid var(--line-2);transform:rotate(45deg);transition:transform .7s var(--ease),border-color .3s}
.d-velours .vl-top:hover::before{transform:rotate(225deg);border-color:var(--gold)}
.d-velours .vl-top svg{width:16px;height:16px}
.d-velours .vl-legal{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 22px;width:100%;margin-top:22px;padding-top:22px;border-top:1px solid var(--line);font-size:12.5px;letter-spacing:.06em;color:var(--dim)}
@keyframes vl-left{to{transform:translateX(-101%)}}
@keyframes vl-right{to{transform:translateX(101%)}}
@keyframes vl-gone{to{visibility:hidden}}
@keyframes vl-seal{to{opacity:0;scale:.6}}
@keyframes vl-burst{from{opacity:0;scale:.55}to{opacity:1;scale:1}}
@keyframes vl-rise{from{opacity:0;transform:translateY(40px) scale(.96)}to{opacity:1;transform:none}}
@keyframes vl-zoom{from{transform:scale(1.28);filter:brightness(.35)}to{transform:none;filter:none}}
@keyframes vl-draw{to{stroke-dashoffset:0}}
@keyframes vl-close{from{opacity:0;transform:translateX(calc(var(--o,0) * .34em));filter:blur(8px)}to{opacity:1;transform:none;filter:none}}
@keyframes vl-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.d-velours .vl-curtain{display:none}.d-velours .vl-ln i,.d-velours .vl-arch,.d-velours .vl-arch-pic img,.d-velours .vl-eye,.d-velours .vl-lede,.d-velours .vl-cta-row,.d-velours .vl-pil,.d-velours .vl-burst{animation:none}.d-velours .vl-arch svg polyline{animation:none;stroke-dashoffset:0}.d-velours .vl-frame svg polyline{stroke-dashoffset:0}.d-velours .vl-leader{clip-path:none}.demo-js .d-velours .vl-head h2[data-rv],.demo-js .d-velours .vl-track[data-rv],.demo-js .d-velours .vl-foot-name[data-rv]{letter-spacing:.02em;filter:none}}
`
  .replace(/\n/g, "")
  .trim();

/** The gold line of the steps fills as the list scrolls past the middle of the screen; passed steps light up. */
const JS = `(function(){var d=document,W=window;[].slice.call(d.querySelectorAll('.vl-steps')).forEach(function(l){var items=[].slice.call(l.querySelectorAll('.vl-step'));function upd(){var r=l.getBoundingClientRect(),vh=W.innerHeight,p=Math.min(1,Math.max(0,(vh*.6-r.top)/Math.max(1,r.height)));l.style.setProperty('--prog',p.toFixed(3));items.forEach(function(it){var n=it.querySelector('.vl-step-n');if(!n)return;var y=n.offsetTop+n.offsetHeight/2;it.classList.toggle('is-on',p*l.offsetHeight>=y-2)})}W.addEventListener('scroll',upd,{passive:true});W.addEventListener('resize',upd);upd()})})();`;

type Word = { w: string; em: boolean };

/** The headline as lines of whole words (the same grouping as splitLines), so each letter can move on its own. */
function wordLines(text: string, parts: number): { rows: Word[][]; marked: boolean } {
  const words: Word[] = [];
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => words.push({ w, em: n % 2 === 1 })),
  );
  const total = words.reduce((a, x) => a + x.w.length + 1, 0);
  const rows: Word[][] = [[]];
  let at = 0;
  for (const x of words) {
    const row = rows[rows.length - 1];
    if (row.length && rows.length < parts && at + x.w.length / 2 > (total / parts) * rows.length) rows.push([x]);
    else row.push(x);
    at += x.w.length + 1;
  }
  return { rows, marked: words.some((x) => x.em) };
}

/** A line whose letters close in on its centre: each letter starts out further from the middle. */
function Closing({ row, n }: { row: Word[]; n: number }) {
  const len = row.reduce((a, x) => a + x.w.length, 0) + row.length - 1;
  let k = 0;
  return (
    <span className="vl-ln">
      {row.map((x, m) => {
        const word = (
          <span key={m} className={`vl-w${x.em ? " is-em" : ""}`}>
            {[...x.w].map((ch, j) => {
              const o = k - (len - 1) / 2;
              k++;
              return (
                <i key={j} style={css({ "--o": o.toFixed(1), "--i": n })}>
                  {ch}
                </i>
              );
            })}
          </span>
        );
        k++;
        return m < row.length - 1 ? [word, " "] : word;
      })}
    </span>
  );
}

const ROMAN: [number, string][] = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];
const roman = (n: number) => {
  let out = "";
  for (const [v, s] of ROMAN) while (n >= v) ((out += s), (n -= v));
  return out;
};

/** A sunburst fan: rays from the middle of the base line, with two concentric arcs. Decoration only. */
function Fan({ rays = 19, className }: { rays?: number; className?: string }) {
  const lines = Array.from({ length: rays }, (_, k) => {
    const a = Math.PI - (Math.PI * k) / (rays - 1);
    return `M100 100L${(100 + 96 * Math.cos(a)).toFixed(2)} ${(100 - 96 * Math.sin(a)).toFixed(2)}`;
  });
  return (
    <svg className={className} viewBox="0 0 200 102" aria-hidden="true">
      <path d={lines.join("")} />
      <path d="M4 100A96 96 0 0 1 196 100M40 100A60 60 0 0 1 160 100M72 100A28 28 0 0 1 128 100M0 100.5H200" />
    </svg>
  );
}

/** Quarter fan for the corners of a framed card. */
const Corner = () => (
  <span className="vl-corner" aria-hidden="true">
    <svg viewBox="0 0 44 44">
      <path d="M1 43V1h42M6 38V6h32M1 1l14 14M1 22a21 21 0 0 1 21-21M1 32A31 31 0 0 1 32 1" />
    </svg>
  </span>
);

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="vl-kick" data-rv>
    <i aria-hidden="true" />
    {children}
    <i aria-hidden="true" />
  </p>
);

const Orn = () => (
  <span className="vl-orn" data-rv aria-hidden="true">
    <i />
    <b />
    <i />
  </span>
);

function Head({ kicker, title, intro, id }: { kicker?: string; title: string; intro?: string; id?: string }) {
  return (
    <header className="vl-head">
      {kicker ? <Kick>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      <Orn />
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 10h14M12 5l5 5-5 5" />
  </svg>
);

/** Gold hairlines around (and just inside) a stepped arch; the frame is always 5:6, so the drawing scales evenly. */
const Outline = () => (
  <svg viewBox="0 0 100 120" aria-hidden="true">
    <polyline points={ZIG_PTS} pathLength={1} />
    <polyline points={ZIG_IN} pathLength={1} />
  </svg>
);

/** A photograph in a stepped arch, with a gold outline that draws itself when it comes into view. */
function Frame({ p, sizes, className = "vl-frame" }: { p: Photo; sizes: string; className?: string }) {
  return (
    <figure className={className} data-rv>
      <div data-px>
        <Pic p={p} sizes={sizes} />
      </div>
      <Outline />
    </figure>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="vl-hdr hdr">
        <div className="vl-wrap vl-bar">
          <div className="vl-side">
            <a href={cta.href} className="vl-book" aria-label={cta.label}>
              <Icon name="calendar" />
            </a>
            {b.phone ? (
              <a href={tel(b.phone)} className="vl-phone">
                {b.phone}
              </a>
            ) : b.city ? (
              <span className="vl-phone">{b.city}</span>
            ) : null}
          </div>
          <a href="#top" className="vl-logo" aria-label={c.name}>
            <i className="vl-mono" aria-hidden="true">
              {c.name.charAt(0)}
            </i>
            <span>{c.name}</span>
          </a>
          <div className="vl-side is-r">
            <a href={cta.href} className="btn vl-line vl-cta">
              {cta.label}
            </a>
            <button type="button" className="vl-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
              <span className="vl-sr" data-label data-open={c.t.menu} data-close={c.t.close}>
                {c.t.menu}
              </span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
        <nav aria-label={c.t.menu} className="vl-nav" data-nav>
          {c.nav.slice(0, 4).map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
      </header>
      <div id="site-menu" className="vl-menu" data-nav inert>
        <Orn />
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{roman(k + 1)}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <Orn />
        <p className="vl-menu-foot">
          {b.address ?? b.city}
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
        </p>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 44 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const { rows, marked } = wordLines(hero.headline, plain.length > 34 ? 3 : 2);
  const facts = heroFacts(c);
  const left = facts.filter((_, n) => n % 2 === 0);
  const right = facts.filter((_, n) => n % 2 === 1);
  const list = (fs: typeof facts) =>
    fs.map((f) => (
      <div key={f.label}>
        <dt>{f.label}</dt>
        <dd>{f.value}</dd>
      </div>
    ));
  return (
    <section className="vl-hero">
      <span className="vl-burst" data-px aria-hidden="true" />
      <div className="vl-curtain" aria-hidden="true">
        <i />
        <i />
        <b>{c.name.charAt(0)}</b>
      </div>
      <div className="vl-wrap vl-hero-in">
        <div className="vl-eye">
          {hero.eyebrow ? (
            <p className="vl-kick">
              <i aria-hidden="true" />
              {hero.eyebrow}
              <i aria-hidden="true" />
            </p>
          ) : null}
          <NowBadge c={c} className="vl-now" />
        </div>
        {left.length > 0 && <dl className="vl-pil is-l">{list(left)}</dl>}
        <figure className={`vl-arch${p ? "" : " is-plain"}`}>
          <div className="vl-arch-pic">{p ? <Pic p={p} eager sizes="(min-width: 960px) 32vw, 78vw" /> : <span className="vl-arch-mono" aria-hidden="true">{c.name.charAt(0)}</span>}</div>
          <Outline />
        </figure>
        {right.length > 0 && <dl className="vl-pil is-r">{list(right)}</dl>}
        <h1 className={[size, marked ? "is-marked" : ""].filter(Boolean).join(" ") || undefined} aria-label={plain}>
          {rows.map((row, n) => (
            <Closing key={n} row={row} n={n} />
          ))}
        </h1>
        <p className="vl-lede">{hero.subheadline}</p>
        <div className="vl-cta-row">
          <Btn c={c} href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </Btn>
          {hero.secondaryCta ? (
            <Btn c={c} href={hero.secondaryCta.href} variant="alt">
              {hero.secondaryCta.label}
            </Btn>
          ) : null}
        </div>
        {left.length > 0 && (
          <dl className="vl-facts is-l">
            {list(left)}
          </dl>
        )}
        {right.length > 0 && (
          <dl className="vl-facts is-r">
            {list(right)}
          </dl>
        )}
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  return (
    <footer className="vl-foot">
      <div className="vl-foot-fan" data-px aria-hidden="true">
        <Fan rays={37} />
      </div>
      <div className="vl-wrap vl-foot-in">
        <a href="#top" className="vl-top" aria-label="Top">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
          </svg>
        </a>
        <p className="vl-foot-name vl-track" data-rv aria-hidden="true" style={css({ "--n": Math.max(8, c.name.length) })}>
          {c.name}
        </p>
        <Orn />
        {c.spec.footer.blurb ? <p className="vl-blurb">{c.spec.footer.blurb}</p> : null}
        <div className="vl-foot-grid">
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
        </div>
        <Legal c={c} className="vl-legal" />
      </div>
    </footer>
  );
}

/** Opening hours on a framed plaque with a sunburst crest and today marked. */
function Plaque({ c, title, children }: { c: Ctx; title?: string; children?: ReactNode }) {
  return (
    <div className="vl-plaque" data-rv>
      <span className="vl-crest" aria-hidden="true">
        <Fan rays={13} />
      </span>
      <h3>
        {title ?? c.t.hours}
        <NowBadge c={c} className="vl-now" />
      </h3>
      {children}
    </div>
  );
}

function ReachRow({ c }: { c: Ctx }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email && !b.mapsUrl) return null;
  return (
    <address className="vl-reach-row" data-rv>
      {b.address ? <span>{b.address}</span> : null}
      {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
      {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
      {b.mapsUrl ? (
        <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="z-route">
          {c.t.route}
        </a>
      ) : null}
    </address>
  );
}

const hoursOrNote = (c: Ctx) => (c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>);

export const velours: Family = {
  key: "velours",
  root: "d-velours",
  fonts: ["Italiana", "Jost"],
  themeColor: "#0d2620",
  accent: "#d4b273",
  onAccent: "#081a15",
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "vl-wrap", eyebrow: "vl-kick", btn: "vl-fill", btnAlt: "vl-line", btnText: "vl-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="vl-sec vl-gem is-green2 is-fluted" id={s.id}>
          <div className="vl-wrap">
            <Head kicker={c.t.kick.about} title={s.title} />
            <div className={`vl-about${p ? "" : " is-solo"}`}>
              <div className="vl-about-l">
                <p className="vl-lead" data-rv>
                  {first}
                </p>
              </div>
              {p ? <Frame p={p} sizes="(min-width: 960px) 30vw, 78vw" /> : <span className="vl-pillar" aria-hidden="true" />}
              <div className="vl-about-r">
                {rest.map((x, n) => (
                  <p key={n} data-rv>
                    {x}
                  </p>
                ))}
              </div>
              {s.highlights.length > 0 && (
                <ul className="vl-gems" data-rv>
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
      const pics = [c.photo("art:svc0"), c.photo("art:svc1")];
      const both = pics[0] && pics[1];
      const two = s.items.length > 3 && !both;
      return (
        <section className="vl-sec vl-gem is-deep" id={s.id}>
          <div className="vl-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
            <div className={`vl-prices-wrap${both ? " has-pics" : ""}`}>
              {both ? (
                <figure className="vl-side-pic" data-rv>
                  <Pic p={pics[0]!} sizes="200px" />
                </figure>
              ) : null}
              <div className="vl-card" data-rv>
                <Corner />
                <Corner />
                <Corner />
                <Corner />
                <ol className={`vl-prices${two ? " is-two" : ""}`}>
                  {s.items.map((it, n) => (
                    <li key={n} className="vl-price" data-rv style={i(n % 4)}>
                      <span className="vl-num" aria-hidden="true">
                        <span>{roman(n + 1)}</span>
                      </span>
                      <div className="vl-price-row">
                        <h3>{it.title}</h3>
                        <span className="vl-leader" aria-hidden="true" />
                        {it.price || it.duration ? (
                          <span className="vl-val">
                            {it.price ? <span>{it.price}</span> : null}
                            {it.duration ? <small>{it.duration}</small> : null}
                          </span>
                        ) : (
                          <span className="vl-val is-gem" aria-hidden="true" />
                        )}
                      </div>
                      <p>{it.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
              {both ? (
                <figure className="vl-side-pic" data-rv style={i(2)}>
                  <Pic p={pics[1]!} sizes="200px" />
                </figure>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="vl-sec vl-gem is-deep" id={s.id}>
          <div className="vl-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            <div className="vl-card" data-rv>
              <Corner />
              <Corner />
              <Corner />
              <Corner />
              <div className={`vl-carte${cats.length === 1 ? " is-one" : ""}`}>
                {cats.map((cat, n) => (
                  <div key={n} className="vl-course" data-rv style={i(n % 2)}>
                    <h3>{cat.name}</h3>
                    {cat.items.map((d, m) => (
                      <div key={m} className="vl-dish">
                        <b>{d.name}</b>
                        {d.description ? <p>{d.description}</p> : null}
                        {d.price ? <span>{d.price}</span> : null}
                        {d.tags?.length ? (
                          <span className="vl-dish-tags">
                            {d.tags.map((t) => (
                              <i key={t}>{t}</i>
                            ))}
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {s.note ? (
              <p className="vl-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="vl-sec vl-gem is-wine" id={s.id}>
        <span className="vl-rays" data-px aria-hidden="true" />
        <div className="vl-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="vl-medals">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span className="vl-medal" aria-hidden="true">
                  <i />
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
      <section className="vl-sec vl-gem is-green2" id={s.id}>
        <div className="vl-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <ol className="vl-steps">
            {s.steps.map((st, n) => (
              <li key={n} className="vl-step" data-rv>
                <span className="vl-step-n" aria-hidden="true">
                  {roman(n + 1)}
                </span>
                <div className="vl-step-t">
                  <h3>{st.title}</h3>
                  <p>{st.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const shown = pics.slice(0, 6);
      return (
        <section className="vl-sec vl-gem" id={s.id}>
          <div className="vl-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className={`vl-arcade is-${Math.min(shown.length, 3)}`}>
              {shown.map((p, n) => (
                <figure key={n} className={shown.length >= 3 && n % 3 === 1 ? "is-zig" : undefined} data-rv style={i(n % 3)}>
                  <Pic p={p} sizes="(min-width: 900px) 30vw, 46vw" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="vl-sec vl-gem is-green2 is-fluted" id={s.id}>
        <div className="vl-wrap">
          <Head kicker={c.t.kick.hours} title={s.title} />
          {s.note ? (
            <p className="vl-visit-note" data-rv>
              {s.note}
            </p>
          ) : null}
          <Plaque c={c}>{hoursOrNote(c)}</Plaque>
          <ReachRow c={c} />
        </div>
      </section>
    ),
    contact: (s, c) => {
      const withHours = !c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") && Boolean(c.spec.business.openingHours?.length);
      return (
        <section className="vl-sec vl-gem is-deep" id={s.id}>
          <div className="vl-wrap">
            <Head kicker={c.t.kick.contact} title={s.title} intro={s.body || undefined} />
            <div className={`vl-duo${s.showForm ? "" : " is-one"}`}>
              <Plaque c={c} title={withHours ? c.t.hours : c.t.contact}>
                {withHours ? <Hours c={c} /> : null}
                <Reach c={c} />
              </Plaque>
              {s.showForm ? (
                <div className="vl-form" data-rv>
                  <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    booking: (s, c) => (
      <section className="vl-sec vl-gem is-wine" id={s.id}>
        <span className="vl-rays" data-px aria-hidden="true" />
        <div className="vl-wrap">
          <Head kicker={c.t.kick.booking} title={s.title} intro={s.body || undefined} />
          <div className="vl-duo">
            <Plaque c={c}>
              {hoursOrNote(c)}
              <Reach c={c} />
            </Plaque>
            <div className="vl-form" data-rv>
              <p className="vl-form-t" aria-hidden="true">
                {c.t.submit[s.kind]}
              </p>
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
            </div>
          </div>
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="vl-sec vl-gem is-green2" id={s.id}>
        <div className="vl-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body || undefined} />
          <ul className="vl-doors">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} className="vl-door" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="vl-door-ico" aria-hidden="true">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <em aria-hidden="true">→</em>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
  },
};
