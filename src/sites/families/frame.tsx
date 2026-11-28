import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Frame: an original template (no portfolio demo). Dark and cinematic: near-black with a fine
 * grain, full-bleed photography and one tungsten-amber accent, a tall condensed display face
 * with small tracked capitals from a grotesk. The opening photograph opens like a lens
 * aperture behind a viewfinder, the headline develops letter by letter from outline to print,
 * photographs further down are wiped in like film past a light leak, the gallery is a film
 * strip with sprocket holes and frame counters (counting only the real photographs) that opens
 * each photograph full screen, and a ring follows the pointer and grows over images. Made for
 * photographers, videographers, creative studios and tattoo artists.
 */

const ALL = `
.d-frame{--black:#0b0b0c;--coal:#131315;--char:#1b1b1e;--smoke:#26262a;--ink:#efede8;--mute:#a19d95;--dim2:#6f6c66;--line:rgba(239,237,232,.14);--line-2:rgba(239,237,232,.28);--amber:#f2a33a;--amber-l:#ffc56e;--amber-d:#c47a14;--pad:clamp(16px,4.4vw,72px);--ease:cubic-bezier(.16,.84,.24,1);--snap:cubic-bezier(.7,0,.2,1);--disp:"Big Shoulders Display","Arial Narrow",sans-serif;--sans:"Archivo",system-ui,sans-serif;--z-bg2:var(--coal);--z-ink:var(--ink);--z-dim:var(--mute);--z-line:var(--line);--z-accent:var(--amber);--z-on-accent:#0b0b0c;--z-display:var(--disp);--z-display-weight:800;--z-radius:0;--z-field-radius:0;--z-ico-radius:0;--z-sec:clamp(84px,11vw,180px);--z-h3:clamp(24px,2.2vw,34px);--z-statement:clamp(40px,6vw,104px);position:relative;background:var(--black);color:var(--ink);font-family:var(--sans);font-size:clamp(15.5px,1.02vw,17.5px);font-weight:400;line-height:1.62}
.d-frame::after{content:"";position:fixed;inset:-50%;z-index:60;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:.06}
.d-frame ::selection{background:var(--amber);color:var(--black)}
.d-frame h1,.d-frame h2,.d-frame h3{font-family:var(--disp);font-weight:800;line-height:.9;letter-spacing:.005em;text-transform:uppercase}
.d-frame h2{font-size:clamp(50px,7.4vw,124px)}
.d-frame h2.is-long{font-size:clamp(40px,5vw,84px);line-height:.94}
.d-frame h2 em,.d-frame h1 em{font-style:normal;color:var(--amber)}
.d-frame h3{font-size:var(--z-h3);font-weight:700;line-height:1}
.d-frame .fr-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.d-frame .fr-wrap{position:relative;width:min(100%,1440px);margin-inline:auto;padding-inline:var(--pad)}
.d-frame .fr-cap{font-family:var(--sans);font-size:11.5px;font-weight:600;letter-spacing:.22em;line-height:1.3;text-transform:uppercase;font-variant-numeric:tabular-nums}
.d-frame .fr-kick{display:inline-flex;align-items:center;gap:14px;font-size:11.5px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--mute);font-variant-numeric:tabular-nums}
.d-frame .fr-kick b{display:inline-grid;place-items:center;min-width:44px;height:24px;padding:0 6px;border:1px solid var(--line-2);font-weight:600;letter-spacing:.12em;color:var(--amber)}
.d-frame .fr-kick::after{content:"";width:clamp(30px,5vw,80px);height:1px;background:var(--line-2);transform-origin:left;transform:scaleX(0);transition:transform 1.2s var(--ease) .3s}
.d-frame .fr-kick.in::after,html:not(.demo-js) .d-frame .fr-kick::after,.d-frame .fr-hero .fr-kick::after{transform:none}
.d-frame .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:56px;padding:0 28px;font-family:var(--sans);font-size:12.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;overflow:hidden;isolation:isolate;transition:color .5s var(--snap),border-color .5s,background-color .5s}
.d-frame .btn::before{content:"";position:absolute;inset:0;z-index:-1;transform:scaleX(0);transform-origin:right;transition:transform .6s var(--snap)}
.d-frame .btn:hover::before{transform:scaleX(1);transform-origin:left}
.d-frame .btn svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6;transition:transform .6s var(--snap)}
.d-frame .btn:hover svg{transform:translateX(5px)}
.d-frame .fr-fill{background:var(--amber);color:var(--black)}
.d-frame .fr-fill::before{background:var(--ink)}
.d-frame .fr-line{border:1px solid var(--line-2);color:var(--ink)}
.d-frame .fr-line::before{background:var(--ink)}
.d-frame .fr-line:hover{color:var(--black);border-color:var(--ink)}
.d-frame .fr-text{position:relative;display:inline-flex;align-items:center;gap:10px;min-height:44px;font-size:12.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--ink)}
.d-frame .fr-text::after{content:"";position:absolute;left:0;right:0;bottom:9px;height:1px;background:var(--amber);transform-origin:left;transition:transform .6s var(--snap)}
.d-frame .fr-text:hover::after{transform:scaleX(.3)}
.d-frame .fr-text svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.6}
.d-frame .fr-hdr{position:fixed;top:0;left:0;right:0;z-index:40;transition:background-color .5s,backdrop-filter .5s}
.d-frame.is-scrolled .fr-hdr{background:rgba(11,11,12,.82);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.d-frame .fr-hdr::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--line);transform:scaleX(0);transition:transform .9s var(--ease)}
.d-frame.is-scrolled .fr-hdr::after{transform:none}
.d-frame .fr-bar{display:flex;align-items:center;gap:28px;height:84px;transition:height .5s var(--ease)}
.d-frame.is-scrolled .fr-bar{height:68px}
.d-frame .fr-logo{position:relative;z-index:41;display:flex;align-items:center;gap:12px;min-width:0;font-family:var(--disp);font-size:clamp(22px,2vw,28px);font-weight:800;letter-spacing:.04em;line-height:1;text-transform:uppercase}
.d-frame .fr-logo i{position:relative;flex:none;width:30px;height:22px;border:1.5px solid var(--ink)}
.d-frame .fr-logo i::after{content:"";position:absolute;left:50%;top:50%;width:8px;height:8px;border-radius:50%;background:var(--amber);transform:translate(-50%,-50%);transition:transform .6s var(--ease)}
.d-frame .fr-logo:hover i::after{transform:translate(-50%,-50%) scale(1.8)}
.d-frame .fr-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-frame .fr-links{display:none;gap:30px;margin-left:auto}
.d-frame .fr-links a{position:relative;display:inline-flex;gap:8px;padding:10px 0;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.d-frame .fr-links a small{font-size:10px;color:var(--amber)}
.d-frame .fr-links a::after{content:"";position:absolute;left:0;right:0;bottom:3px;height:1px;background:var(--ink);transform:scaleX(0);transform-origin:right;transition:transform .5s var(--snap)}
.d-frame .fr-links a:hover::after{transform:scaleX(1);transform-origin:left}
.d-frame .fr-cta{display:none;min-height:46px;padding:0 20px}
.d-frame .fr-burger{position:relative;z-index:41;display:flex;align-items:center;gap:14px;margin-left:auto;min-height:48px;padding:0 4px 0 14px;border:0;background:none;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.d-frame .fr-burger i{position:relative;display:block;width:44px;height:44px;border:1px solid var(--line-2)}
.d-frame .fr-burger i::before,.d-frame .fr-burger i::after{content:"";position:absolute;left:12px;right:12px;height:1.5px;background:var(--ink);transition:transform .6s var(--snap),top .6s var(--snap)}
.d-frame .fr-burger i::before{top:17px}
.d-frame .fr-burger i::after{top:25px}
.d-frame.menu-open .fr-burger i::before{top:21px;transform:rotate(45deg)}
.d-frame.menu-open .fr-burger i::after{top:21px;transform:rotate(-45deg)}
@media (max-width:440px){.d-frame .fr-burger span{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-frame .fr-logo{font-size:21px}}
@media (min-width:1080px){.d-frame .fr-links,.d-frame .fr-cta{display:inline-flex}.d-frame .fr-burger{display:none}}
.d-frame .fr-menu{position:fixed;inset:0;z-index:39;display:flex;flex-direction:column;justify-content:space-between;gap:30px;padding:120px var(--pad) 110px;background:var(--black);overflow-y:auto;clip-path:inset(50% 0 50% 0);visibility:hidden;transition:clip-path .8s var(--snap),visibility 0s .8s}
.d-frame .fr-menu.is-open{clip-path:inset(0);visibility:visible;transition:clip-path .8s var(--snap)}
.d-frame .fr-menu::before,.d-frame .fr-menu::after{content:"";position:absolute;left:0;right:0;height:22px;background:repeating-linear-gradient(90deg,transparent 0 14px,rgba(239,237,232,.12) 14px 26px);background-size:26px 10px;background-repeat:repeat-x;background-position:0 50%;pointer-events:none}
.d-frame .fr-menu::before{top:88px}
.d-frame .fr-menu::after{bottom:76px}
.d-frame .fr-menu nav{display:grid;gap:0}
.d-frame .fr-menu nav a{display:flex;align-items:baseline;gap:18px;min-height:64px;padding:4px 0;border-bottom:1px solid var(--line);font-family:var(--disp);font-size:clamp(44px,12vw,80px);font-weight:800;line-height:1;text-transform:uppercase;opacity:0;transform:translateY(30px);transition:opacity .5s,transform .8s var(--ease),color .3s}
.d-frame .fr-menu nav a small{font-family:var(--sans);font-size:11.5px;font-weight:600;letter-spacing:.2em;color:var(--amber)}
.d-frame .fr-menu nav a:hover{color:var(--amber)}
.d-frame .fr-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.35s + var(--i,0) * 60ms)}
.d-frame .fr-menu p{font-size:15px;color:var(--mute)}
.d-frame .fr-menu p a{display:inline-flex;align-items:center;min-height:44px;color:var(--ink);text-decoration:underline;text-decoration-color:var(--amber);text-underline-offset:5px}
.d-frame.menu-open .fr-hdr{background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-frame .fr-hero{position:relative;display:flex;flex-direction:column;min-height:max(100svh,640px);overflow:hidden;background:var(--black)}
.d-frame .fr-hero-frame{position:relative;display:flex;flex:1;flex-direction:column;justify-content:flex-end;padding-top:clamp(150px,16vw,200px)}
.d-frame .fr-hero-media{position:absolute;inset:0;clip-path:polygon(50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%);animation:fr-iris 1.9s var(--snap) .25s forwards}
.d-frame .fr-hero-media img{width:100%;height:100%;object-fit:cover;transform:scale(1.18) translateY(calc(var(--p,0) * 4%));filter:brightness(.62) contrast(1.06);animation:fr-focus 2.6s var(--ease) .25s both}
.d-frame .fr-hero-media::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,11,12,.55) 0,rgba(11,11,12,0) 30%,rgba(11,11,12,.15) 55%,rgba(11,11,12,.92) 100%)}
.d-frame .fr-vf{position:absolute;inset:clamp(86px,9vw,110px) var(--pad) clamp(14px,1.6vw,24px);z-index:1;pointer-events:none;animation:fr-fade 1s var(--ease) 1.6s both}
.d-frame .fr-vf>i{position:absolute;width:clamp(18px,2.4vw,34px);height:clamp(18px,2.4vw,34px);border-color:rgba(239,237,232,.7);border-style:solid;border-width:0}
.d-frame .fr-vf .c1{left:0;top:0;border-left-width:1.5px;border-top-width:1.5px}
.d-frame .fr-vf .c2{right:0;top:0;border-right-width:1.5px;border-top-width:1.5px}
.d-frame .fr-vf .c3{left:0;bottom:0;border-left-width:1.5px;border-bottom-width:1.5px}
.d-frame .fr-vf .c4{right:0;bottom:0;border-right-width:1.5px;border-bottom-width:1.5px}
.d-frame .fr-vf .fr-x{position:absolute;left:50%;top:42%;width:26px;height:26px;transform:translate(-50%,-50%)}
.d-frame .fr-vf .fr-x::before,.d-frame .fr-vf .fr-x::after{content:"";position:absolute;background:rgba(239,237,232,.55)}
.d-frame .fr-vf .fr-x::before{left:50%;top:0;bottom:0;width:1px}
.d-frame .fr-vf .fr-x::after{top:50%;left:0;right:0;height:1px}
.d-frame .fr-vf .fr-tl,.d-frame .fr-vf .fr-tr{position:absolute;top:clamp(12px,1.4vw,18px);color:rgba(239,237,232,.8)}
.d-frame .fr-vf .fr-tl{left:clamp(30px,3.4vw,50px);display:flex;align-items:center;gap:10px}
.d-frame .fr-vf .fr-tl::before{content:"";width:7px;height:7px;background:var(--amber)}
.d-frame .fr-vf .fr-tr{right:clamp(30px,3.4vw,50px)}
.d-frame .fr-vf .fr-tr b{color:var(--amber);font-weight:600}
@media (max-width:700px){.d-frame .fr-vf .fr-x{display:none}}
.d-frame .fr-hero-in{position:relative;z-index:2;padding-bottom:clamp(40px,5vw,72px)}
@media (max-width:700px){.d-frame .fr-hero-frame{padding-top:150px}.d-frame .fr-vf .c3,.d-frame .fr-vf .c4{display:none}.d-frame .fr-hero h1,.d-frame .fr-hero h1.is-m,.d-frame .fr-hero h1.is-s{line-height:.9}.d-frame .fr-hero-media::after{background:linear-gradient(180deg,rgba(11,11,12,.6) 0,rgba(11,11,12,.25) 30%,rgba(11,11,12,.7) 55%,rgba(11,11,12,.95) 100%)}}
.d-frame .fr-hero-top{display:flex;flex-wrap:wrap;align-items:center;gap:12px 22px;margin-bottom:clamp(16px,2vw,26px);animation:fr-rise 1s var(--ease) 1.2s both}
.d-frame .fr-now{display:inline-flex;align-items:center;gap:9px;min-height:28px;padding:0 12px;border:1px solid var(--line-2);font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.d-frame .fr-now::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor}
.d-frame .fr-now.is-open{color:var(--amber)}
.d-frame .fr-now.is-closed{color:var(--mute)}
.d-frame .fr-hero h1{max-width:15ch;font-size:clamp(62px,10.4vw,188px);line-height:.84;letter-spacing:0}
.d-frame .fr-hero h1.is-m{max-width:17ch;font-size:clamp(54px,8.2vw,150px)}
.d-frame .fr-hero h1.is-s{max-width:20ch;font-size:clamp(44px,6.2vw,112px);line-height:.88}
.d-frame .fr-word{display:inline-block;white-space:nowrap}
.d-frame .fr-ch{display:inline-block;color:var(--ink);animation:fr-develop 1.5s var(--ease) both;animation-delay:calc(.5s + var(--d,0) * 1ms)}
.d-frame .fr-word.is-em .fr-ch{color:var(--amber);animation-name:fr-develop-em}
.d-frame .fr-hero-row{display:grid;gap:22px 48px;margin-top:clamp(22px,3vw,40px);align-items:end}
@media (min-width:900px){.d-frame .fr-hero-row{grid-template-columns:minmax(0,1fr) auto}}
.d-frame .fr-lede{max-width:48ch;font-size:clamp(16px,1.2vw,19px);color:rgba(239,237,232,.82);animation:fr-rise 1s var(--ease) 1.5s both}
.d-frame .fr-cta-row{display:flex;flex-wrap:wrap;gap:12px;animation:fr-rise 1s var(--ease) 1.7s both}
.d-frame .fr-facts{position:relative;z-index:2;display:grid;border-top:1px solid var(--line);background:rgba(11,11,12,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);animation:fr-rise 1s var(--ease) 1.9s both}
@media (min-width:760px){.d-frame .fr-facts{grid-auto-flow:column;grid-auto-columns:minmax(0,1fr)}}
.d-frame .fr-facts div{display:grid;gap:4px;padding:16px var(--pad)}
.d-frame .fr-facts div+div{border-top:1px solid var(--line)}
@media (min-width:760px){.d-frame .fr-facts div{padding:20px clamp(18px,2vw,30px)}.d-frame .fr-facts div:first-child{padding-left:var(--pad)}.d-frame .fr-facts div+div{border-top:0;border-left:1px solid var(--line)}}
.d-frame .fr-facts dt{font-size:10.5px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--amber)}
.d-frame .fr-facts dd{margin:0;font-size:15px;color:var(--ink);overflow-wrap:anywhere}
.d-frame .fr-facts dd a{text-decoration:underline;text-decoration-color:var(--line-2);text-underline-offset:4px}
.d-frame .fr-hero.is-type{background:radial-gradient(120% 90% at 78% 30%,#1e1d1f 0,var(--black) 60%)}
.d-frame .fr-lens{position:absolute;right:clamp(-260px,-12vw,-60px);top:50%;width:clamp(420px,62vw,980px);height:auto;overflow:visible;fill:none;stroke:rgba(239,237,232,.16);stroke-width:.35;transform:translateY(-50%);animation:fr-fade 2s var(--ease) .3s both}
.d-frame .fr-lens g{transform-origin:50px 50px;animation:fr-turn 90s linear infinite}
.d-frame .fr-lens .fr-blade{stroke:rgba(242,163,58,.6);stroke-width:.32}
.d-frame .fr-lens circle{stroke-dasharray:1 2;stroke-dashoffset:1.01;animation:fr-draw 2.4s var(--ease) .4s forwards}
.d-frame .fr-lens .fr-ticks{stroke:rgba(239,237,232,.3);stroke-width:.3}
@media (max-width:760px){.d-frame .fr-lens{right:-62%;top:30%;width:140vw;opacity:.4}}
.d-frame .fr-sec{position:relative;padding-block:var(--z-sec)}
.d-frame .fr-sec.is-coal{background:var(--coal)}
.d-frame .fr-sec.is-ink{background:var(--ink);color:var(--black)}
.d-frame .fr-head{display:grid;gap:20px;max-width:980px;margin-bottom:clamp(44px,5.4vw,88px)}
.d-frame .fr-head.is-row{max-width:none}
@media (min-width:960px){.d-frame .fr-head.is-row{grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);align-items:end;column-gap:64px}.d-frame .fr-head.is-row>.fr-kick{grid-column:1/-1}}
.d-frame .fr-head>p:not(.fr-kick){max-width:50ch;color:var(--mute)}
.demo-js .d-frame [data-rv]{opacity:0;transform:translateY(24px);transition:opacity .9s var(--ease),transform 1.1s var(--ease),clip-path 1.1s var(--ease);transition-delay:calc(var(--i,0) * 90ms)}
.demo-js .d-frame [data-rv].in{opacity:1;transform:none}
.demo-js .d-frame h2[data-rv]{clip-path:inset(-20% -20% 100% -20%);transform:translateY(.3em)}
.demo-js .d-frame h2[data-rv].in{clip-path:inset(-20% -20% -20% -20%);transform:none}
.d-frame .fr-wipe{position:relative;overflow:hidden;background:var(--char)}
.d-frame .fr-wipe img{width:100%;height:100%;object-fit:cover}
.demo-js .d-frame .fr-wipe[data-rv]{opacity:1;transform:none;clip-path:none}
.demo-js .d-frame .fr-wipe[data-rv] img{clip-path:inset(0 100% 0 0);transform:scale(1.12);transition:clip-path 1.4s var(--snap),transform 2.2s var(--ease)}
.demo-js .d-frame .fr-wipe[data-rv].in img{clip-path:inset(0);transform:scale(1.02)}
.d-frame .fr-wipe::after{content:"";position:absolute;top:0;bottom:0;left:0;z-index:1;width:22%;background:linear-gradient(90deg,transparent,rgba(242,163,58,.5) 40%,rgba(255,236,210,.85) 60%,transparent);opacity:0;pointer-events:none}
.d-frame .fr-wipe.in::after{animation:fr-leak 1.4s var(--snap)}
.d-frame .fr-corners{position:absolute;inset:12px;z-index:2;pointer-events:none}
.d-frame .fr-corners::before,.d-frame .fr-corners::after{content:"";position:absolute;width:22px;height:22px;border:0 solid rgba(239,237,232,.8);transition:transform .8s var(--ease)}
.d-frame .fr-corners::before{left:0;top:0;border-left-width:1.5px;border-top-width:1.5px}
.d-frame .fr-corners::after{right:0;bottom:0;border-right-width:1.5px;border-bottom-width:1.5px}
.d-frame .fr-about{display:grid;gap:clamp(48px,6vw,110px);align-items:start}
@media (min-width:960px){.d-frame .fr-about{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)}}
.d-frame .fr-about.is-solo{grid-template-columns:minmax(0,1fr)}
.d-frame .fr-about-pic{position:relative}
.d-frame .fr-about-pic>.fr-wipe{aspect-ratio:4/5}
.d-frame .fr-about-pic>.fr-wipe img{transform:translateY(calc(var(--p,0) * -5%)) scale(1.1)}
.demo-js .d-frame .fr-about-pic>.fr-wipe[data-rv].in img{transform:translateY(calc(var(--p,0) * -5%)) scale(1.1)}
.d-frame .fr-about-pic:hover .fr-corners::before{transform:translate(-6px,-6px)}
.d-frame .fr-about-pic:hover .fr-corners::after{transform:translate(6px,6px)}
.d-frame .fr-about-pic figcaption{display:flex;justify-content:space-between;gap:12px;margin-top:12px;color:var(--mute)}
.d-frame .fr-about-copy{display:grid;gap:24px}
@media (min-width:960px){.d-frame .fr-about-copy{position:sticky;top:120px}}
.d-frame .fr-about-copy .fr-lead{font-size:clamp(21px,1.9vw,30px);line-height:1.35;color:var(--ink)}
.d-frame .fr-about-copy>p{color:var(--mute)}
.d-frame .is-solo .fr-about-copy{grid-template-columns:minmax(0,1fr)}
@media (min-width:960px){.d-frame .is-solo .fr-about-copy{grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:80px;position:static}.d-frame .is-solo .fr-about-copy>.fr-head{grid-column:1/-1}.d-frame .is-solo .fr-about-copy .fr-lead{grid-row:span 3}}
.d-frame .fr-specs{display:grid;border-top:1px solid var(--line)}
.d-frame .fr-specs li{display:grid;grid-template-columns:52px minmax(0,1fr);gap:12px;align-items:baseline;padding:14px 0;border-bottom:1px solid var(--line);transition:padding .6s var(--ease),color .4s}
.d-frame .fr-specs li:hover{padding-left:10px;color:var(--amber)}
.d-frame .fr-specs small{color:var(--dim2)}
.d-frame .fr-index{border-top:1px solid var(--line)}
.d-frame .fr-row{position:relative;display:grid;grid-template-columns:minmax(0,1fr);gap:10px;padding:clamp(22px,2.6vw,36px) 0;border-bottom:1px solid var(--line);isolation:isolate}
.d-frame .fr-row::before{content:"";position:absolute;inset:0 calc(-1 * var(--pad));z-index:-1;background:var(--coal);transform:scaleY(0);transform-origin:bottom;transition:transform .6s var(--snap)}
.d-frame .fr-row:hover::before{transform:none}
.d-frame .fr-row-top{display:flex;align-items:baseline;gap:clamp(14px,2vw,28px)}
.d-frame .fr-row-top small{flex:none;color:var(--amber)}
.d-frame .fr-row h3{font-size:clamp(32px,3.6vw,60px);font-weight:800;line-height:.92;transition:transform .6s var(--snap),color .4s}
.d-frame .fr-row:hover h3{transform:translateX(12px);color:var(--amber)}
.d-frame .fr-row p{max-width:56ch;color:var(--mute)}
.d-frame .fr-row .fr-meta{display:flex;flex-wrap:wrap;gap:8px 22px;color:var(--ink)}
.d-frame .fr-row .fr-meta b{font-weight:600;color:var(--amber)}
.d-frame .fr-thumb{position:relative;overflow:hidden;width:100%;aspect-ratio:16/9;background:var(--char)}
.d-frame .fr-thumb img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1) brightness(.8);transform:scale(1.06);transition:filter .9s var(--ease),transform 1.2s var(--ease)}
.d-frame .fr-row:hover .fr-thumb img{filter:none;transform:scale(1)}
@media (hover:none){.d-frame .fr-thumb img,.d-frame .z-team .z-pic img{filter:none}}
@media (min-width:860px){.d-frame .fr-row{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr) auto;align-items:center;gap:clamp(24px,3vw,56px)}.d-frame .fr-row.has-pic{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr) clamp(150px,14vw,220px)}.d-frame .fr-thumb{aspect-ratio:4/3}.d-frame .fr-row .fr-go{justify-self:end}}
.d-frame .fr-go{display:grid;place-items:center;width:52px;height:52px;border:1px solid var(--line-2);transition:background-color .5s,color .5s,transform .6s var(--snap)}
.d-frame .fr-go svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6}
.d-frame .fr-row:hover .fr-go{background:var(--amber);color:var(--black);border-color:var(--amber);transform:rotate(-45deg)}
@media (max-width:859px){.d-frame .fr-row .fr-go{display:none}}
.d-frame .fr-pricelist{display:grid;gap:clamp(40px,4vw,64px) clamp(40px,6vw,100px)}
@media (min-width:900px){.d-frame .fr-pricelist{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-frame .fr-pricelist h3{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:14px;border-bottom:1px solid var(--line-2);font-size:clamp(28px,2.6vw,40px)}
.d-frame .fr-pricelist h3 small{color:var(--amber);font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:.2em}
.d-frame .fr-pricelist li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 18px;padding:14px 0;border-bottom:1px solid var(--line)}
.d-frame .fr-pricelist li b{font-weight:500}
.d-frame .fr-pricelist li span{font-variant-numeric:tabular-nums;color:var(--amber)}
.d-frame .fr-pricelist li p,.d-frame .fr-pricelist li small{grid-column:1/-1;font-size:.93em;color:var(--mute)}
.d-frame .fr-pricelist li small{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--dim2)}
.d-frame .fr-note{margin-top:30px;font-size:14px;color:var(--mute)}
.d-frame .fr-feats{display:grid;border-top:1px solid var(--line);grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}
.d-frame .fr-feats li{position:relative;display:grid;gap:14px;align-content:start;padding:clamp(28px,3vw,44px) clamp(0px,2vw,32px) clamp(28px,3vw,44px) 0;border-bottom:1px solid var(--line)}
.d-frame .fr-feats li::before{content:"";position:absolute;left:0;top:-1px;width:100%;height:1px;background:var(--amber);transform:scaleX(0);transform-origin:left;transition:transform 1s var(--ease)}
.d-frame .fr-feats li:hover::before{transform:none}
.d-frame .fr-feats .fr-big{font-family:var(--disp);font-size:clamp(64px,7vw,110px);font-weight:800;line-height:.8;color:transparent;-webkit-text-stroke:1px var(--line-2);transition:color .6s,-webkit-text-stroke-color .6s}
.d-frame .fr-feats li:hover .fr-big{color:var(--amber);-webkit-text-stroke-color:var(--amber)}
.d-frame .fr-feats .fr-ico{display:grid;place-items:center;width:46px;height:46px;border:1px solid var(--line-2);color:var(--amber)}
.d-frame .fr-feats .fr-ico svg{width:20px;height:20px}
.d-frame .fr-feats p{color:var(--mute)}
.d-frame .fr-feats .fr-feat-top{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}
.d-frame .fr-film{position:relative;padding-block:30px;background:#060607}
.d-frame .fr-film::before,.d-frame .fr-film::after{content:"";position:absolute;left:0;right:0;height:14px;background:radial-gradient(closest-side,rgba(239,237,232,.16) 70%,transparent 74%) 0 0/24px 14px repeat-x;pointer-events:none}
.d-frame .fr-film::before{top:8px}
.d-frame .fr-film::after{bottom:8px}
.d-frame .fr-steps{display:grid;gap:4px;grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.d-frame .fr-steps{grid-template-columns:repeat(var(--n,4),minmax(0,1fr))}}
.d-frame .fr-step{position:relative;display:grid;gap:12px;align-content:start;min-height:100%;padding:clamp(24px,2.6vw,38px);background:var(--char);transition:background-color .6s}
.d-frame .fr-step:hover{background:var(--smoke)}
.d-frame .fr-step-top{display:flex;justify-content:space-between;color:var(--mute)}
.d-frame .fr-step-top b{font-weight:600;color:var(--amber)}
.d-frame .fr-step h3{margin-top:clamp(20px,4vw,70px);font-size:clamp(30px,2.6vw,44px)}
.d-frame .fr-step p{color:var(--mute)}
.d-frame .fr-step::after{content:"";position:absolute;left:0;bottom:0;width:100%;height:2px;background:var(--amber);transform:scaleX(0);transform-origin:left;transition:transform 1.2s var(--ease);transition-delay:calc(.4s + var(--i,0) * 200ms)}
.d-frame .fr-step.in::after,html:not(.demo-js) .d-frame .fr-step::after{transform:none}
.d-frame .fr-reel{position:relative}
.d-frame .fr-reel-top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:28px}
.d-frame .fr-count{display:flex;align-items:baseline;gap:8px;font-family:var(--disp);font-size:clamp(44px,5vw,80px);font-weight:800;line-height:.8;font-variant-numeric:tabular-nums}
.d-frame .fr-count b{min-width:1.1em;color:var(--amber)}
.d-frame .fr-count span{font-size:.45em;color:var(--mute)}
.d-frame .fr-ctrl{display:flex;gap:8px}
.d-frame .fr-ctrl button{display:grid;place-items:center;width:56px;height:56px;border:1px solid var(--line-2);background:none;transition:background-color .4s,color .4s,border-color .4s}
.d-frame .fr-ctrl button:hover{background:var(--amber);border-color:var(--amber);color:var(--black)}
.d-frame .fr-ctrl svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.6}
.d-frame .fr-strip{display:flex;align-items:flex-start;gap:6px;padding:44px max(var(--pad),calc((100vw - 1440px) / 2 + var(--pad)));overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:max(var(--pad),calc((100vw - 1440px) / 2 + var(--pad)));scrollbar-width:none;background:radial-gradient(closest-side,rgba(239,237,232,.16) 70%,transparent 74%) 0 12px/24px 14px repeat-x local,radial-gradient(closest-side,rgba(239,237,232,.16) 70%,transparent 74%) 0 calc(100% - 12px)/24px 14px repeat-x local,#060607;cursor:grab}
.d-frame .fr-strip::-webkit-scrollbar{display:none}
.d-frame .fr-strip.is-drag{cursor:grabbing;scroll-snap-type:none}
.d-frame .fr-strip li{flex:none;width:clamp(260px,38vw,620px);scroll-snap-align:start}
.d-frame .fr-strip li:nth-child(3n+2){width:clamp(220px,26vw,420px)}
.d-frame .fr-shot{position:relative;display:block;width:100%;padding:0;border:0;background:none;cursor:zoom-in}
.d-frame .fr-shot .fr-iris{display:block;aspect-ratio:3/2;overflow:hidden;background:var(--char)}
.d-frame .fr-strip li:nth-child(3n+2) .fr-iris{aspect-ratio:4/5}
.d-frame .fr-shot img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s var(--ease),filter .8s}
.d-frame .fr-shot:hover img,.d-frame .fr-shot:focus-visible img{transform:scale(1.05)}
.demo-js .d-frame .fr-strip li[data-rv]{opacity:1;transform:none;clip-path:none}
.demo-js .d-frame .fr-strip li[data-rv] .fr-iris{clip-path:polygon(50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%);transition:clip-path 1.3s var(--snap);transition-delay:calc(var(--i,0) * 120ms)}
.demo-js .d-frame .fr-strip li[data-rv].in .fr-iris{clip-path:polygon(50% -40%,130% -30%,140% 50%,130% 130%,50% 140%,-30% 130%,-40% 50%,-30% -30%)}
.d-frame .fr-shot-cap{display:flex;justify-content:space-between;gap:12px;padding-top:12px;color:var(--mute);transition:color .4s}
.d-frame .fr-shot-cap b{color:var(--amber);font-weight:600}
.d-frame .fr-shot:hover .fr-shot-cap{color:var(--ink)}
.d-frame .fr-shot:focus-visible{outline:2px solid var(--amber);outline-offset:4px}
.d-frame .fr-reel-hint{display:flex;align-items:center;gap:14px;margin-top:16px;color:var(--dim2)}
.d-frame .fr-reel-bar{position:relative;flex:1;height:1px;background:var(--line)}
.d-frame .fr-reel-bar i{position:absolute;left:0;top:-1px;height:3px;width:20%;background:var(--amber);transition:transform .2s linear}
.d-frame .fr-lb{position:fixed;inset:0;z-index:70;width:100%;max-width:none;height:100%;max-height:none;margin:0;padding:0;border:0;background:rgba(6,6,7,.97);color:var(--ink)}
.d-frame .fr-lb::backdrop{background:rgba(6,6,7,.9)}
.d-frame .fr-lb[open]{display:grid;grid-template-rows:auto minmax(0,1fr) auto;animation:fr-fade .4s var(--ease)}
.d-frame .fr-lb-top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px var(--pad)}
.d-frame .fr-lb-top p{color:var(--mute)}
.d-frame .fr-lb-top p b{color:var(--amber);font-weight:600}
.d-frame .fr-lb figure{position:relative;display:grid;place-items:center;min-height:0;padding:0 var(--pad)}
.d-frame .fr-lb figure img{max-width:100%;max-height:calc(100vh - 240px);max-height:calc(100dvh - 240px);width:auto;height:auto;object-fit:contain;animation:fr-lb-in .7s var(--snap)}
.d-frame .fr-lb-nav{display:flex;justify-content:center;gap:8px;padding:16px var(--pad) 70px}
.d-frame .fr-lb button{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-width:56px;min-height:56px;padding:0 18px;border:1px solid var(--line-2);background:rgba(11,11,12,.6);font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;transition:background-color .4s,color .4s,border-color .4s}
.d-frame .fr-lb button:hover,.d-frame .fr-lb button:focus-visible{background:var(--amber);border-color:var(--amber);color:var(--black)}
.d-frame .fr-lb button svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.6}
.d-frame .fr-log{display:grid;gap:clamp(40px,5vw,90px);align-items:start}
@media (min-width:960px){.d-frame .fr-log{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-frame .fr-log-copy{display:grid;gap:22px}
.d-frame .fr-log-copy>p{color:var(--mute)}
.d-frame .fr-slate{position:relative;padding:clamp(24px,3vw,44px);border:1px solid var(--line-2);background:var(--coal)}
.d-frame .fr-slate::before{content:"";position:absolute;left:-1px;right:-1px;top:-1px;height:12px;background:repeating-linear-gradient(-55deg,var(--ink) 0 14px,var(--black) 14px 28px);opacity:.85}
.d-frame .fr-slate h3{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin:14px 0 18px;font-size:clamp(30px,2.8vw,44px)}
.d-frame .fr-slate .z-hours{border-top:1px solid var(--line-2)}
.d-frame .fr-slate .z-hours div{align-items:baseline;padding:14px 0}
.d-frame .fr-slate .z-hours dt{font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.d-frame .fr-slate .z-hours dd{font-family:var(--disp);font-size:clamp(22px,2vw,30px);font-weight:700;letter-spacing:.02em;color:var(--ink);font-variant-numeric:tabular-nums}
.d-frame .fr-slate-foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;margin-top:20px;color:var(--dim2)}
.d-frame .z-hours div.is-today{position:relative;padding-left:16px;background:linear-gradient(90deg,rgba(242,163,58,.14),transparent 70%)}
.d-frame .z-hours div.is-today::before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:3px;background:var(--amber)}
.d-frame .z-hours div.is-today dt,.d-frame .z-hours div.is-today dd{color:var(--amber)}
.d-frame .fr-book{display:grid;gap:clamp(40px,5vw,90px);align-items:start}
@media (min-width:960px){.d-frame .fr-book{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-frame .fr-book-copy{display:grid;gap:22px}
@media (min-width:960px){.d-frame .fr-book-copy{position:sticky;top:120px}}
.d-frame .fr-book-copy>p{color:var(--mute)}
.d-frame .fr-panel{position:relative;padding:clamp(24px,3.4vw,52px);border:1px solid var(--line-2);background:var(--coal)}
.d-frame .fr-panel>.fr-corners{inset:-1px}
.d-frame .fr-panel>.fr-corners::before,.d-frame .fr-panel>.fr-corners::after{border-color:var(--amber);width:28px;height:28px}
.d-frame .fr-panel:focus-within>.fr-corners::before{transform:translate(-5px,-5px)}
.d-frame .fr-panel:focus-within>.fr-corners::after{transform:translate(5px,5px)}
.d-frame .z-field label,.d-frame .z-chipset legend{font-size:10.5px;font-weight:600;letter-spacing:.22em;color:var(--mute)}
.d-frame .z-field input,.d-frame .z-field select,.d-frame .z-field textarea{border:0;border-bottom:1px solid var(--line-2);padding:12px 0;background:transparent;color:var(--ink);transition:border-color .4s,background-color .4s,padding .4s}
.d-frame .z-field textarea{padding:12px;border:1px solid var(--line-2)}
.d-frame .z-field input:focus,.d-frame .z-field select:focus,.d-frame .z-field textarea:focus{border-color:var(--amber);background:rgba(242,163,58,.06)}
.d-frame .z-field input:focus,.d-frame .z-field select:focus{padding-left:10px}
.d-frame .z-field :focus-visible{outline:none}
.d-frame .z-field input::-webkit-calendar-picker-indicator{filter:invert(1)}
.d-frame .z-field select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23f2a33a' stroke-width='1.4'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 2px center;background-size:12px 8px}
.d-frame .z-field select option{color:#111}
.d-frame .z-chips button{font-family:var(--disp);font-size:20px;font-weight:700;transition:background-color .3s,color .3s,border-color .3s}
.d-frame .form-status{border-color:var(--amber);background:rgba(242,163,58,.1)}
.d-frame .form-note{color:var(--dim2)}
.d-frame .fr-ways{display:grid;gap:clamp(12px,1.6vw,24px);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-frame .fr-way{position:relative;display:grid;gap:12px;align-content:start;height:100%;padding:clamp(26px,3vw,42px);border:1px solid var(--line);background:var(--coal);transition:border-color .5s,background-color .5s}
.d-frame .fr-way:hover{border-color:var(--amber);background:var(--char)}
.d-frame .fr-way:hover .fr-corners::before{transform:translate(-4px,-4px)}
.d-frame .fr-way:hover .fr-corners::after{transform:translate(4px,4px)}
.d-frame .fr-way .fr-corners::before,.d-frame .fr-way .fr-corners::after{border-color:var(--amber)}
.d-frame .fr-way-ico{display:grid;place-items:center;width:52px;height:52px;border:1px solid var(--line-2);color:var(--amber)}
.d-frame .fr-way-ico svg{width:22px;height:22px}
.d-frame .fr-way h3{margin-top:18px;font-size:clamp(30px,2.6vw,42px)}
.d-frame .fr-way p{color:var(--mute)}
.d-frame .fr-way .fr-go{margin-top:10px}
.d-frame .fr-way:hover .fr-go{background:var(--amber);color:var(--black);border-color:var(--amber);transform:rotate(-45deg)}
.d-frame .fr-post{display:grid;gap:22px;align-content:start}
.d-frame .fr-post address{display:grid;gap:4px;font-style:normal}
.d-frame .fr-post address span,.d-frame .fr-post address a{font-family:var(--disp);font-size:clamp(30px,3vw,52px);font-weight:800;line-height:1.02;text-transform:uppercase;overflow-wrap:anywhere}
.d-frame .fr-post address a{display:inline-block;width:max-content;max-width:100%;min-height:44px;background:linear-gradient(var(--amber),var(--amber)) 0 92%/0 3px no-repeat;transition:background-size .6s var(--snap),color .4s}
.d-frame .fr-post address a:hover{background-size:100% 3px;color:var(--amber)}
.d-frame .fr-post address .fr-route{font-family:var(--sans);font-size:12.5px;font-weight:600;letter-spacing:.2em;color:var(--amber)}
.d-frame .fr-band{overflow:hidden;padding-block:16px;border-block:1px solid var(--line);background:var(--black)}
.d-frame .fr-band p{display:flex;gap:40px;width:max-content;font-family:var(--disp);font-size:clamp(34px,4vw,64px);font-weight:800;line-height:1;text-transform:uppercase;white-space:nowrap;transform:translateX(calc(-25% + var(--p,0) * 12%));transition:transform .3s linear}
.d-frame .fr-band span{display:inline-flex;align-items:center;gap:40px;color:transparent;-webkit-text-stroke:1px rgba(239,237,232,.4)}
.d-frame .fr-band span:nth-child(3n+2){color:var(--ink);-webkit-text-stroke:0}
.d-frame .fr-band span::after{content:"";flex:none;width:16px;height:12px;border:1.5px solid var(--amber)}
.d-frame .z-sec.z-cta{background:var(--amber);color:var(--black)}
.d-frame .z-cta h2{font-size:clamp(54px,8vw,150px);color:var(--black)}
.d-frame .z-cta h2 em{color:var(--ink);-webkit-text-stroke:0;color:transparent;-webkit-text-stroke:1.5px var(--black)}
.d-frame .z-cta .z-center>p{color:rgba(11,11,12,.75)}
.d-frame .z-cta .fr-fill{background:var(--black);color:var(--ink)}
.d-frame .z-cta .fr-fill::before{background:var(--ink)}
.d-frame .z-cta .fr-fill:hover{color:var(--black)}
.d-frame .z-statement h2{font-size:var(--z-statement);line-height:.92;max-width:20ch}
.d-frame .z-statement h2 em{color:transparent;-webkit-text-stroke:1.5px var(--amber)}
.d-frame .z-statement{border-block:1px solid var(--line)}
.d-frame .z-card,.d-frame .z-panel{border:1px solid var(--line-2);background:var(--coal)}
.d-frame .z-pack.is-featured{border-color:var(--amber);background:var(--char)}
.d-frame .z-pack h3{font-size:clamp(30px,2.6vw,42px)}
.d-frame .z-ticks li::before{width:8px;height:8px;top:.6em;background:var(--amber)}
.d-frame .z-acc,.d-frame .z-acc details{border-color:var(--line-2)}
.d-frame .z-acc summary{font-family:var(--disp);font-size:clamp(24px,2.2vw,34px);font-weight:700;text-transform:uppercase;line-height:1;transition:color .3s,padding .5s var(--snap)}
.d-frame .z-acc summary:hover{color:var(--amber);padding-left:10px}
.d-frame .z-acc details[open] summary{color:var(--amber)}
.d-frame .z-acc summary i{color:var(--amber)}
.d-frame .z-pic{position:relative}
.d-frame .z-team .z-pic img{filter:grayscale(1) contrast(1.1);transition:filter .8s var(--ease),transform 1.2s var(--ease)}
.d-frame .z-team li:hover .z-pic img{filter:none;transform:scale(1.04)}
.d-frame .z-team h3{font-size:clamp(28px,2.4vw,38px)}
.d-frame .z-team .z-grid{counter-reset:fr-tm}
.d-frame .z-team .z-grid>li{counter-increment:fr-tm}
.d-frame .z-team .z-grid>li:not(:has(figure)){padding-top:22px;border-top:1px solid var(--line-2)}
.d-frame .z-team .z-grid>li:not(:has(figure))::before{content:counter(fr-tm,decimal-leading-zero);font-family:var(--disp);font-size:clamp(64px,7vw,110px);font-weight:800;line-height:.8;color:transparent;-webkit-text-stroke:1px var(--line-2);transition:color .6s,-webkit-text-stroke-color .6s}
.d-frame .z-team .z-grid>li:not(:has(figure)):hover::before{color:var(--amber);-webkit-text-stroke-color:var(--amber)}
.d-frame .z-quotes blockquote{border-top-color:var(--amber)}
.d-frame .z-quotes blockquote>p{font-family:var(--disp);font-size:clamp(26px,2.4vw,40px);font-weight:700;line-height:1.02;text-transform:uppercase}
.d-frame .z-steps small,.d-frame .z-rows small{color:var(--amber);letter-spacing:.2em}
.d-frame .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(11,11,12,.1),rgba(11,11,12,.85))}
.d-frame .z-show-media img{filter:brightness(.85)}
.d-frame .z-showcase h2{font-size:clamp(54px,8vw,140px)}
.d-frame .z-ba{border:1px solid var(--line-2)}
.d-frame .z-ba::after{background:var(--amber)}
.d-frame .z-channel{border-color:var(--line-2);background:var(--coal)}
.d-frame .z-reach a{text-decoration:underline;text-decoration-color:var(--line-2);text-underline-offset:5px;transition:text-decoration-color .3s}
.d-frame .z-reach a:hover{text-decoration-color:var(--amber)}
.d-frame .z-reach .z-route{color:var(--amber)}
.d-frame .fr-foot{position:relative;padding:clamp(90px,11vw,170px) 0 150px;background:#070708;border-top:1px solid var(--line);overflow:hidden}
.d-frame .fr-foot-name{display:block;font-family:var(--disp);font-size:min(22vw,300px,calc(200vw / var(--n,8)));font-weight:800;line-height:.9;padding-top:.06em;letter-spacing:-.005em;text-transform:uppercase;color:transparent;-webkit-text-stroke:1px rgba(239,237,232,.35);background:linear-gradient(var(--ink),var(--ink)) 0 0/0 100% no-repeat;-webkit-background-clip:text;background-clip:text;transition:background-size 1.8s var(--snap)}
.d-frame .fr-foot-name.in,html:not(.demo-js) .d-frame .fr-foot-name{background-size:100% 100%}
.demo-js .d-frame .fr-foot-name[data-rv]{opacity:1;transform:none;clip-path:none}
.d-frame .fr-credits{display:grid;gap:clamp(36px,4vw,60px);margin-top:clamp(60px,8vw,120px)}
@media (min-width:860px){.d-frame .fr-credits{grid-template-columns:repeat(auto-fit,minmax(0,1fr))}}
.d-frame .fr-credits h3{margin-bottom:16px;font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:.24em;color:var(--amber)}
.d-frame .fr-credits a,.d-frame .fr-credits span{display:block;padding:5px 0;color:var(--mute);transition:color .3s,transform .5s var(--snap)}
.d-frame .fr-credits a:hover{color:var(--ink);transform:translateX(6px)}
.d-frame .fr-credits p{max-width:40ch;color:var(--mute)}
.d-frame .fr-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:70px;padding-top:24px;border-top:1px solid var(--line);font-size:12px;letter-spacing:.06em;color:var(--dim2)}
.d-frame .fr-cursor{position:fixed;left:0;top:0;z-index:65;display:grid;place-items:center;width:44px;height:44px;margin:-22px 0 0 -22px;border:1px solid rgba(239,237,232,.75);border-radius:50%;pointer-events:none;opacity:0;transition:width .5s var(--ease),height .5s var(--ease),margin .5s var(--ease),background-color .4s,border-color .4s,opacity .3s}
.d-frame .fr-cursor.on{opacity:1}
.d-frame .fr-cursor span{font-size:10.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--black);opacity:0;transition:opacity .3s}
.d-frame .fr-cursor.is-img{width:110px;height:110px;margin:-55px 0 0 -55px;background:rgba(242,163,58,.92);border-color:var(--amber)}
.d-frame .fr-cursor.is-img span{opacity:1}
.d-frame .fr-cursor.is-link{width:14px;height:14px;margin:-7px 0 0 -7px;background:var(--amber);border-color:var(--amber)}
.d-frame.no-photos .fr-hero::after{content:"";position:absolute;left:0;right:0;bottom:0;height:40%;background:linear-gradient(180deg,transparent,rgba(11,11,12,.8));pointer-events:none}
@keyframes fr-iris{to{clip-path:polygon(50% -45%,135% -35%,145% 50%,135% 135%,50% 145%,-35% 135%,-45% 50%,-35% -35%)}}
@keyframes fr-focus{from{filter:brightness(.62) contrast(1.06) blur(14px)}to{filter:brightness(.62) contrast(1.06) blur(0)}}
@keyframes fr-develop{0%{opacity:0;color:transparent;-webkit-text-stroke:1px rgba(239,237,232,.0);transform:translateY(.08em)}35%{opacity:1;color:transparent;-webkit-text-stroke:1px rgba(239,237,232,.8)}99%{-webkit-text-stroke:1px transparent}100%{opacity:1;color:var(--ink);-webkit-text-stroke:0 transparent;transform:none}}
@keyframes fr-develop-em{0%{opacity:0;color:transparent;-webkit-text-stroke:1px rgba(242,163,58,0);transform:translateY(.08em)}35%{opacity:1;color:transparent;-webkit-text-stroke:1px rgba(242,163,58,.9)}99%{-webkit-text-stroke:1px transparent}100%{opacity:1;color:var(--amber);-webkit-text-stroke:0 transparent;transform:none}}
@keyframes fr-rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes fr-fade{from{opacity:0}}
@keyframes fr-leak{0%{opacity:1;transform:translateX(-100%)}80%{opacity:1}100%{opacity:0;transform:translateX(480%)}}
@keyframes fr-draw{to{stroke-dashoffset:0}}
@keyframes fr-turn{to{transform:rotate(360deg)}}
@keyframes fr-lb-in{from{opacity:0;clip-path:inset(0 50% 0 50%)}to{opacity:1;clip-path:inset(0)}}
@media (prefers-reduced-motion:reduce){.d-frame *,.d-frame *::before,.d-frame *::after{animation-delay:0s!important}.d-frame .fr-hero-media{clip-path:none}.d-frame .fr-hero-media img{filter:brightness(.62) contrast(1.06);transform:scale(1.06)}.d-frame .fr-ch{opacity:1;color:var(--ink)}.d-frame .fr-word.is-em .fr-ch{color:var(--amber)}.d-frame .fr-wipe img,.demo-js .d-frame .fr-strip li[data-rv] .fr-iris{clip-path:none!important}.d-frame .fr-lens circle{stroke-dashoffset:0}.d-frame .fr-band p{transform:translateX(-25%)}.d-frame .fr-cursor{display:none}}
`
  .trim()
  .split("\n");
/* Restyles of the kit's default sections come after the shared defaults (as `extra`), the rest before them. */
const KIT_RULE = /\.z-|form-status|form-note/;
const CSS = ALL.filter((l) => !KIT_RULE.test(l)).join("");
const EXTRA = ALL.filter((l) => KIT_RULE.test(l)).join("");

/**
 * The ring that follows the pointer (fine pointers only) and grows over photographs; the film
 * strip's counter and progress; the lightbox (a modal dialog: Escape closes it, focus returns to
 * the photograph that opened it, arrow keys step through the roll); dragging the strip.
 */
const JS = `(function(){var d=document,W=window,q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};var rm=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;var root=d.querySelector('.d-frame');if(!root)return;
if(W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches&&!rm){var cur=d.createElement('div');cur.className='fr-cursor';cur.style.transform='translate3d(-200px,-200px,0)';cur.setAttribute('aria-hidden','true');var lab=d.createElement('span');cur.appendChild(lab);root.appendChild(cur);var x=-100,y=-100,tx=-100,ty=-100,raf=0;function loop(){x+=(tx-x)*.2;y+=(ty-y)*.2;cur.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';raf=Math.abs(tx-x)+Math.abs(ty-y)>.3?requestAnimationFrame(loop):0}
d.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;cur.classList.add('on');if(!raf)raf=requestAnimationFrame(loop);var t=e.target,im=t.closest&&t.closest('[data-cursor],.fr-wipe,.fr-hero-media,.z-pic,.fr-thumb'),ln=t.closest&&t.closest('a,button,summary,input,select,textarea,label');var big=!!im&&!(ln&&!ln.hasAttribute('data-cursor'));cur.classList.toggle('is-img',big);cur.classList.toggle('is-link',!big&&!!ln);lab.textContent=big?(im.getAttribute('data-cursor')||''):''},{passive:true});d.addEventListener('mouseleave',function(){cur.classList.remove('on')})}
q('.fr-reel').forEach(function(g){var s=g.querySelector('.fr-strip'),n=g.querySelector('[data-count]'),bar=g.querySelector('.fr-reel-bar i');if(!s)return;var items=q('li',s);function upd(){var max=s.scrollWidth-s.clientWidth,p=max>0?s.scrollLeft/max:0,k=0,best=1e9;items.forEach(function(it,j){var dd=Math.abs(it.offsetLeft-s.offsetLeft-s.scrollLeft-parseFloat(getComputedStyle(s).paddingLeft||0));if(dd<best){best=dd;k=j}});if(p>.985)k=items.length-1;if(n)n.textContent=String(k+1).padStart(2,'0');if(bar){var w=Math.max(.08,s.clientWidth/s.scrollWidth);bar.style.width=(w*100).toFixed(2)+'%';bar.style.transform='translateX('+(p*(1/w-1)*100).toFixed(2)+'%)'}}s.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});W.addEventListener('resize',upd);upd();
var down=false,sx=0,sl=0,moved=0;s.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=0;sx=e.clientX;sl=s.scrollLeft});W.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){s.classList.add('is-drag');moved=Math.abs(dx)}s.scrollLeft=sl-dx});W.addEventListener('pointerup',function(){if(!down)return;down=false;s.classList.remove('is-drag')});s.addEventListener('click',function(e){if(moved>6){e.preventDefault();e.stopPropagation();moved=0}},true)});
var lb=d.querySelector('.fr-lb');if(lb){var shots=q('.fr-shot'),fig=lb.querySelector('figure'),num=lb.querySelector('[data-lb-n]'),k=0,opener=null;function show(j){k=(j+shots.length)%shots.length;var b=shots[k],im=d.createElement('img');im.src=b.getAttribute('data-full');im.alt=b.getAttribute('data-alt')||'';im.decoding='async';fig.innerHTML='';fig.appendChild(im);if(num)num.textContent=String(k+1).padStart(2,'0')}
function open(j,b){opener=b;show(j);if(lb.showModal){if(!lb.open)lb.showModal()}else lb.setAttribute('open','');d.documentElement.style.overflow='hidden';var c=lb.querySelector('[data-lb-close]');if(c)c.focus()}
function close(){if(lb.close&&lb.open)lb.close();else lb.removeAttribute('open')}
lb.addEventListener('close',function(){d.documentElement.style.overflow='';if(opener)opener.focus()});
shots.forEach(function(b,j){b.addEventListener('click',function(){open(j,b)})});
q('[data-lb-close]',lb).forEach(function(b){b.addEventListener('click',close)});q('[data-lb-prev]',lb).forEach(function(b){b.addEventListener('click',function(){show(k-1)})});q('[data-lb-next]',lb).forEach(function(b){b.addEventListener('click',function(){show(k+1)})});
lb.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();show(k+1)}else if(e.key==='ArrowLeft'){e.preventDefault();show(k-1)}else if(e.key==='Escape'&&!lb.showModal){close()}});
lb.addEventListener('click',function(e){if(e.target===lb||e.target===fig)close()})}
})();`;

/* ── Words in the visitor's language that the shared strings do not have. ── */
const WORDS: Record<string, { view: string; prev: string; next: string; photo: string; of: string }> = {
  nl: { view: "Bekijk", prev: "Vorige", next: "Volgende", photo: "Foto", of: "van" },
  en: { view: "View", prev: "Previous", next: "Next", photo: "Photo", of: "of" },
  de: { view: "Ansehen", prev: "Zurück", next: "Weiter", photo: "Foto", of: "von" },
  fr: { view: "Voir", prev: "Précédente", next: "Suivante", photo: "Photo", of: "sur" },
};
const words = (c: Ctx) => WORDS[c.spec.meta.lang] ?? WORDS.nl;
const pad = (n: number) => String(n).padStart(2, "0");
const ext = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});
/** How many real photographs the site has: the roll the frame counters count. */
const roll = (c: Ctx) => new Set(c.spec.images.filter((im) => im.license !== "generated" && /^https:\/\//.test(im.src)).map((im) => im.src)).size;

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M3 10h14M12 5l5 5-5 5" />
  </svg>
);
const Back = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M17 10H3M8 5l-5 5 5 5" />
  </svg>
);
const Cross = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 4l12 12M16 4 4 16" />
  </svg>
);

const Corners = () => <span className="fr-corners" aria-hidden="true" />;

/** The kicker: a numbered slate, like the label on a film can. */
const Kick = ({ children, n }: { children: ReactNode; n?: number }) => (
  <p className="fr-kick" data-rv>
    {n != null ? <b>{pad(n)}</b> : null}
    {children}
  </p>
);

function Head({ kicker, title, intro, id, row, n }: { kicker?: string; title: string; intro?: string; id?: string; row?: boolean; n?: number }) {
  return (
    <header className={`fr-head${row && intro ? " is-row" : ""}`}>
      {kicker ? <Kick n={n}>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

/**
 * The headline as characters that develop from outline to print in a scattered order, as a
 * photograph comes up in the developer. Screen readers get the sentence once, as text.
 */
function Develop({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let n = 0;
  text.split(/\*([^*]+)\*/).forEach((chunk, k) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w, m) => {
        out.push(
          <span key={`${k}-${m}`} className={`fr-word${k % 2 ? " is-em" : ""}`}>
            {[...w].map((ch, j) => {
              const d = 34 * n + ((n * 7 + j * 13) % 11) * 45;
              n++;
              return (
                <span key={j} className="fr-ch" style={{ ["--d" as string]: d }}>
                  {ch}
                </span>
              );
            })}
          </span>,
          " ",
        );
      }),
  );
  return <>{out}</>;
}

/** A lens aperture in fine lines, slowly turning: the opening without a photograph. */
function Lens() {
  // Six blades: chords of the barrel, each a sixth of a turn on, leave a hexagonal opening.
  const pt = (deg: number, r: number) => `${(50 + r * Math.cos((deg * Math.PI) / 180)).toFixed(2)} ${(50 + r * Math.sin((deg * Math.PI) / 180)).toFixed(2)}`;
  const blades = Array.from({ length: 6 }, (_, k) => `M${pt(k * 60, 40)}L${pt(k * 60 + 96, 40)}`);
  const ticks = Array.from({ length: 36 }, (_, k) => `M${pt(k * 10, 46)}L${pt(k * 10, k % 3 ? 47.2 : 48.6)}`);
  return (
    <svg className="fr-lens" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="49" pathLength={1} />
      <circle cx="50" cy="50" r="44.5" pathLength={1} />
      <circle cx="50" cy="50" r="40" pathLength={1} />
      <path className="fr-ticks" d={ticks.join("")} />
      <g>
        {blades.map((d) => (
          <path key={d} className="fr-blade" d={d} />
        ))}
      </g>
    </svg>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="fr-hdr hdr">
        <div className="fr-wrap fr-bar">
          <a href="#top" className="fr-logo" aria-label={c.name}>
            <i aria-hidden="true" />
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="fr-links" data-nav>
            {c.nav.slice(0, 4).map((n, k) => (
              <a key={n.id} href={`#${n.id}`}>
                <small>{pad(k + 1)}</small>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn fr-line fr-cta">
            {cta.label}
          </a>
          <button type="button" className="fr-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="fr-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{pad(k + 1)}</small>
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
  const size = plain.length > 44 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const total = roll(c);
  return (
    <section className={`fr-hero${p ? "" : " is-type"}`}>
      {p ? (
        <div className="fr-hero-media" data-px data-cursor="">
          <Pic p={p} eager sizes="100vw" />
        </div>
      ) : (
        <Lens />
      )}
      <div className="fr-hero-frame">
      <div className="fr-vf" aria-hidden="true">
        <i className="c1" />
        <i className="c2" />
        <i className="c3" />
        <i className="c4" />
        <span className="fr-x" />
        <span className="fr-tl fr-cap">{c.spec.business.city ?? c.name}</span>
        {total > 0 ? (
          <span className="fr-tr fr-cap">
            <b>01</b> / {pad(total)}
          </span>
        ) : null}
      </div>
      <div className="fr-wrap fr-hero-in">
        <div className="fr-hero-top">
          {hero.eyebrow ? <p className="fr-kick">{hero.eyebrow}</p> : null}
          <NowBadge c={c} className="fr-now" />
        </div>
        <h1 className={size}>
          <span className="fr-sr">{plain}</span>
          <span aria-hidden="true">
            <Develop text={hero.headline} />
          </span>
        </h1>
        <div className="fr-hero-row">
          <p className="fr-lede">{hero.subheadline}</p>
          <div className="fr-cta-row">
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label} <Arrow />
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
        </div>
      </div>
      </div>
      {facts.length > 0 && (
        <dl className="fr-facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

/** What the studio does, as a line of outlined capitals that slides with the scroll. */
function Band({ c }: { c: Ctx }) {
  const list = offerWords(c);
  if (list.length < 3) return null;
  return (
    <div className="fr-band" aria-hidden="true" data-px>
      <p>
        {[...list, ...list, ...list].map((w, n) => (
          <span key={n}>{w}</span>
        ))}
      </p>
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  return (
    <footer className="fr-foot">
      <div className="fr-wrap">
        <p className="fr-foot-name" aria-hidden="true" data-rv style={{ ["--n" as string]: Math.max(6, ...c.name.split(" ").map((w) => w.length)) }}>
          {c.name}
        </p>
        <div className="fr-credits">
          {c.spec.footer.blurb ? (
            <div>
              <h3 className="fr-cap">{c.name}</h3>
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
          <div>
            <h3 className="fr-cap">{c.t.explore}</h3>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </div>
          <div>
            <h3 className="fr-cap">{c.t.contact}</h3>
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
              <h3 className="fr-cap">{c.t.hours}</h3>
              {b.openingHours.slice(0, 7).map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          ) : null}
        </div>
        <Legal c={c} className="fr-legal" />
      </div>
    </footer>
  );
}

/** Copy column of the sections with a form. */
function SideCopy({ c, kicker, title, body, hours, n, reach = true }: { c: Ctx; kicker: string; title: string; body?: string; hours?: boolean; n: number; reach?: boolean }) {
  return (
    <div className="fr-book-copy">
      <Head kicker={kicker} title={title} n={n} />
      {body ? <p data-rv>{body}</p> : null}
      {reach ? <Reach c={c} /> : null}
      {hours ? <Hours c={c} /> : null}
    </div>
  );
}

/** Without a form, the contact section sets how to reach the studio as large type. */
function Post({ c }: { c: Ctx }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email) return null;
  return (
    <div className="fr-panel fr-post" data-rv>
      <Corners />
      <p className="fr-kick">{c.name}</p>
      <address>
        {b.address ? <span>{b.address}</span> : null}
        {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
        {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
        {b.mapsUrl ? (
          <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="fr-route">
            {c.t.route} →
          </a>
        ) : null}
      </address>
    </div>
  );
}

export const frame: Family = {
  key: "frame",
  root: "d-frame",
  fonts: ["Big Shoulders Display", "Archivo"],
  themeColor: "#0b0b0c",
  accent: "#f2a33a",
  onAccent: "#0b0b0c",
  css: CSS,
  extra: EXTRA,
  js: JS + TODAY_JS,
  cls: { wrap: "fr-wrap", eyebrow: "fr-kick", btn: "fr-fill", btnAlt: "fr-line", btnText: "fr-text" },
  Header,
  Hero,
  Footer,
  // The kit's own sections get their number on the slate too: their place on the page.
  Head: (p, c) => <Head {...p} n={c.spec.sections.findIndex((x) => x.title === p.title) + 1 || undefined} />,
  sections: {
    about: (s, c, n) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      const total = roll(c);
      return (
        <>
          <Band c={c} />
          <section className="fr-sec" id={s.id}>
            <div className={`fr-wrap fr-about${p ? "" : " is-solo"}`}>
              {p ? (
                <figure className="fr-about-pic" data-px>
                  <div className="fr-wipe" data-rv data-cursor="">
                    <Pic p={p} sizes="(min-width: 960px) 44vw, 100vw" />
                    <Corners />
                  </div>
                  <figcaption className="fr-cap" aria-hidden="true">
                    <span>{c.name}</span>
                    {total > 1 ? <span>02 / {pad(total)}</span> : null}
                  </figcaption>
                </figure>
              ) : null}
              <div className="fr-about-copy">
                <Head kicker={c.t.kick.about} title={s.title} n={n + 1} />
                <p className="fr-lead" data-rv>
                  {first}
                </p>
                {rest.map((x, k) => (
                  <p key={k} data-rv>
                    {x}
                  </p>
                ))}
                {s.highlights.length > 0 && (
                  <ul className="fr-specs" data-rv>
                    {s.highlights.map((h, k) => (
                      <li key={h}>
                        <small className="fr-cap">{pad(k + 1)}</small>
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
    services: (s, c, n) => (
      <section className="fr-sec is-coal" id={s.id}>
        <div className="fr-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} row n={n + 1} />
          <ol className="fr-index">
            {s.items.map((it, k) => {
              const p = c.photo(`art:svc${k}`);
              return (
                <li key={k} className={`fr-row${p ? " has-pic" : ""}`} data-rv>
                  <div>
                    <div className="fr-row-top">
                      <small className="fr-cap">{pad(k + 1)}</small>
                      <h3>{it.title}</h3>
                    </div>
                  </div>
                  <div>
                    <p>{it.description}</p>
                    {it.price || it.duration ? (
                      <p className="fr-meta fr-cap">
                        {it.duration ? <span>{it.duration}</span> : null}
                        {it.price ? <b>{it.price}</b> : null}
                      </p>
                    ) : null}
                  </div>
                  {p ? (
                    <div className="fr-thumb" data-cursor="">
                      <Pic p={p} sizes="(min-width: 860px) 220px, 100vw" />
                    </div>
                  ) : (
                    <span className="fr-go" aria-hidden="true">
                      <Arrow />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    ),
    menu: (s, c, n) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="fr-sec" id={s.id}>
          <div className="fr-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} row n={n + 1} />
            <div className="fr-pricelist">
              {cats.map((cat, k) => (
                <div key={k} data-rv style={i(k % 2)}>
                  <h3>
                    {cat.name}
                    <small>
                      {pad(k + 1)} / {pad(cats.length)}
                    </small>
                  </h3>
                  <ul>
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
              ))}
            </div>
            {s.note ? (
              <p className="fr-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c, n) => (
      <section className="fr-sec" id={s.id}>
        <div className="fr-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} row n={n + 1} />
          <ul className="fr-feats">
            {s.items.map((it, k) => (
              <li key={k} data-rv style={i(k % 3)}>
                <div className="fr-feat-top">
                  <span className="fr-big" aria-hidden="true">
                    {pad(k + 1)}
                  </span>
                  <span className="fr-ico" aria-hidden="true">
                    <Icon name={it.icon} />
                  </span>
                </div>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    process: (s, c, n) => (
      <section className="fr-sec is-coal" id={s.id}>
        <div className="fr-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} row n={n + 1} />
        </div>
        <div className="fr-film">
          <div className="fr-wrap">
            <ol className="fr-steps" style={{ ["--n" as string]: s.steps.length }}>
              {s.steps.map((st, k) => (
                <li key={k} className="fr-step" data-rv style={i(k)}>
                  <p className="fr-step-top fr-cap">
                    <b>{pad(k + 1)}</b>
                    <span>/ {pad(s.steps.length)}</span>
                  </p>
                  <h3>{st.title}</h3>
                  <p>{st.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    ),
    gallery: (s, c, n) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const w = words(c);
      const total = pad(pics.length);
      const strip = `${s.id}-strip`;
      return (
        <section className="fr-sec fr-reel" id={s.id}>
          <div className="fr-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} n={n + 1} />
            <div className="fr-reel-top" data-rv>
              <p className="fr-count" aria-hidden="true">
                <b data-count>01</b>
                <span>/ {total}</span>
              </p>
              {pics.length > 1 ? (
                <div className="fr-ctrl">
                  <button type="button" data-scroll="prev" aria-controls={strip} aria-label={w.prev}>
                    <Back />
                  </button>
                  <button type="button" data-scroll="next" aria-controls={strip} aria-label={w.next}>
                    <Arrow />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <ul className="fr-strip" id={strip}>
            {pics.map((p, k) => (
              <li key={k} data-rv style={i(k % 3)}>
                <button type="button" className="fr-shot" data-full={p.src} data-alt={p.alt} data-cursor={w.view} aria-label={`${w.photo} ${k + 1} ${w.of} ${pics.length}: ${p.alt}`}>
                  <span className="fr-iris">
                    <Pic p={p} sizes="(min-width: 900px) 40vw, 80vw" />
                  </span>
                  <span className="fr-shot-cap fr-cap" aria-hidden="true">
                    <span>
                      <b>{pad(k + 1)}</b> / {total}
                    </span>
                    <span>{c.name}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="fr-wrap">
            <div className="fr-reel-hint fr-cap" aria-hidden="true">
              <span>{pad(1)}</span>
              <span className="fr-reel-bar">
                <i />
              </span>
              <span>{total}</span>
            </div>
          </div>
          <dialog className="fr-lb" aria-label={s.title.replace(/\*/g, "")}>
            <div className="fr-lb-top">
              <p className="fr-cap">
                <b data-lb-n>01</b> / {total}
              </p>
              <button type="button" data-lb-close aria-label={c.t.close}>
                <Cross />
              </button>
            </div>
            <figure />
            {pics.length > 1 ? (
              <div className="fr-lb-nav">
                <button type="button" data-lb-prev aria-label={w.prev}>
                  <Back />
                </button>
                <button type="button" data-lb-next aria-label={w.next}>
                  <Arrow />
                </button>
              </div>
            ) : (
              <div className="fr-lb-nav" />
            )}
          </dialog>
        </section>
      );
    },
    hours: (s, c, n) => (
      <section className="fr-sec is-coal" id={s.id}>
        <div className="fr-wrap fr-log">
          <div className="fr-log-copy">
            <Head kicker={c.t.kick.hours} title={s.title} n={n + 1} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="fr-slate" data-rv>
            <h3>
              {c.t.hours}
              <NowBadge c={c} className="fr-now" />
            </h3>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
            <p className="fr-slate-foot fr-cap" aria-hidden="true">
              <span>{c.name}</span>
              {c.spec.business.city ? <span>{c.spec.business.city}</span> : null}
            </p>
          </div>
        </div>
      </section>
    ),
    contact: (s, c, n) => (
      <section className="fr-sec" id={s.id}>
        <div className="fr-wrap fr-book">
          <SideCopy c={c} kicker={c.t.kick.contact} title={s.title} body={s.body} n={n + 1} reach={s.showForm} hours={!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking")} />
          {s.showForm ? (
            <div className="fr-panel" data-rv>
              <Corners />
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : (
            <Post c={c} />
          )}
        </div>
      </section>
    ),
    booking: (s, c, n) => (
      <section className="fr-sec" id={s.id}>
        <div className="fr-wrap fr-book">
          <SideCopy c={c} kicker={c.t.kick.booking} title={s.title} body={s.body} n={n + 1} hours={!c.spec.sections.some((x) => x.type === "hours")} />
          <div className="fr-panel" data-rv>
            <Corners />
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
          </div>
        </div>
      </section>
    ),
    order: (s, c, n) => (
      <section className="fr-sec is-coal" id={s.id}>
        <div className="fr-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} row n={n + 1} />
          <ul className="fr-ways">
            {s.channels.map((ch, k) => (
              <li key={k} data-rv style={i(k % 3)}>
                <a href={ch.href} className="fr-way" {...ext(ch.href)}>
                  <Corners />
                  <span className="fr-way-ico" aria-hidden="true">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <span className="fr-go" aria-hidden="true">
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
