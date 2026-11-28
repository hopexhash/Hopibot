import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, splitLines, tel, type Ctx, type Family, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Ambacht: an original template (no portfolio demo). Clear and dependable: navy and white,
 * one safety-orange call to action, condensed uppercase headings and the phone number within
 * reach on every screen. The headline is wiped in line by line behind an orange bar, a band
 * of services runs past, the process line fills as you scroll through it and checkmarks draw
 * themselves. Made for plumbers, electricians, roofers, installers, cleaners, garages and
 * other local trades.
 */

const CSS = `
.d-ambacht{--white:#ffffff;--mist:#eef2f6;--navy:#0e2440;--navy-2:#0b1d34;--navy-3:#16345a;--text:#22344d;--dim:#5b6b80;--orange:#f26a1b;--orange-d:#d85a10;--peach:#fde8db;--line:rgba(14,36,64,.12);--r:10px;--pad:clamp(18px,4.4vw,60px);--ease:cubic-bezier(.2,.7,.2,1);--snap:cubic-bezier(.7,0,.2,1);--cond:"Barlow Condensed","Arial Narrow",sans-serif;--z-bg2:var(--mist);--z-ink:var(--navy);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--orange);--z-on-accent:#fff;--z-display:var(--cond);--z-display-weight:700;--z-radius:var(--r);--z-field-radius:8px;--z-ico-radius:10px;--z-h3:clamp(22px,1.8vw,27px);--z-statement:clamp(34px,4.6vw,68px);background:var(--white);color:var(--text);font-family:"DM Sans",system-ui,sans-serif;font-size:clamp(16px,1.05vw,17.5px);line-height:1.6}
.d-ambacht h1,.d-ambacht h2,.d-ambacht h3{font-family:var(--cond);font-weight:700;line-height:.98;letter-spacing:.005em;text-transform:uppercase;color:var(--navy)}
.d-ambacht h1 em,.d-ambacht h2 em{font-style:normal;color:var(--orange)}
.d-ambacht h2{font-size:clamp(40px,5.2vw,76px)}
.d-ambacht h2.is-long{font-size:clamp(30px,3.6vw,54px)}
.d-ambacht h3{font-size:clamp(22px,1.8vw,27px);line-height:1.05}
.d-ambacht .am-wrap{position:relative;width:min(100%,1320px);margin-inline:auto;padding-inline:var(--pad)}
.d-ambacht .am-kick{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--orange)}
.d-ambacht .am-kick::before{content:"";width:24px;height:3px;background:currentColor;transform-origin:left;transition:transform .7s var(--snap) .15s}
.demo-js .d-ambacht .am-kick[data-rv]:not(.in)::before{transform:scaleX(0)}
.d-ambacht .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:56px;padding:0 28px;border-radius:8px;overflow:hidden;isolation:isolate;font-family:var(--cond);font-size:19px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;transition:background-color .2s,color .2s,border-color .2s,transform .25s var(--ease),box-shadow .25s}
.d-ambacht .btn svg{width:18px;height:18px;transition:transform .3s var(--ease)}
.d-ambacht .btn:hover svg{transform:translateX(4px)}
.d-ambacht .am-fill{background:var(--orange);color:#fff;box-shadow:0 10px 24px -12px rgba(242,106,27,.8)}
.d-ambacht .am-fill::before{content:"";position:absolute;inset:0;z-index:-1;background:repeating-linear-gradient(-45deg,transparent 0 10px,rgba(255,255,255,.14) 10px 20px);transform:translateX(-100%);transition:transform .6s var(--ease)}
.d-ambacht .am-fill:hover{background:var(--orange-d);transform:translateY(-2px)}
.d-ambacht .am-fill:hover::before{transform:none}
.d-ambacht .am-line{border:2px solid currentColor}
.d-ambacht .am-line:hover{background:var(--navy);border-color:var(--navy);color:#fff}
.d-ambacht .am-text{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:700;color:var(--orange);text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:6px}
.d-ambacht .am-hdr{position:sticky;top:0;z-index:40;background:var(--white);transition:box-shadow .3s}
.d-ambacht.is-scrolled .am-hdr{box-shadow:0 12px 30px -20px rgba(14,36,64,.55)}
.d-ambacht .am-top{background:var(--navy-2);color:rgba(255,255,255,.82);font-size:14px;overflow:hidden;max-height:44px;transition:max-height .4s var(--ease)}
.d-ambacht.is-scrolled .am-top{max-height:0}
.d-ambacht .am-top .am-wrap{display:flex;flex-wrap:wrap;align-items:center;gap:4px 26px;min-height:42px}
.d-ambacht .am-top span,.d-ambacht .am-top a{display:inline-flex;align-items:center;gap:8px}
.d-ambacht .am-top svg{width:15px;height:15px;color:var(--orange)}
.d-ambacht .am-top a{margin-left:auto;font-weight:700;color:#fff}
.d-ambacht .am-top .am-now{margin-left:0}
@media (max-width:700px){.d-ambacht .am-top span{display:none}.d-ambacht .am-top a{margin-left:0}.d-ambacht .am-top .am-now{display:inline-flex}}
.d-ambacht .am-now{display:inline-flex;align-items:center;gap:7px;padding:2px 10px;border-radius:999px;background:rgba(255,255,255,.1);font-size:12.5px;font-weight:700;letter-spacing:.04em}
.d-ambacht .am-now::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor;box-shadow:0 0 0 3px rgba(255,255,255,.08)}
.d-ambacht .am-now.is-open{color:#7ee2a8}
.d-ambacht .am-now.is-closed{color:#ffb27f}
.d-ambacht .am-bar{display:flex;align-items:center;gap:22px;height:76px;border-bottom:1px solid var(--line)}
.d-ambacht .am-logo{display:flex;align-items:center;gap:12px;min-width:0}
.d-ambacht .am-logo i{position:relative;display:grid;flex:none;place-items:center;width:46px;height:46px;border-radius:8px;background:var(--navy);color:#fff;font-family:var(--cond);font-size:27px;font-style:normal;font-weight:700;overflow:hidden}
.d-ambacht .am-logo i::after{content:"";position:absolute;right:0;bottom:0;width:14px;height:14px;background:var(--orange);clip-path:polygon(100% 0,100% 100%,0 100%);transition:transform .4s var(--ease)}
.d-ambacht .am-logo:hover i::after{transform:scale(1.6);transform-origin:100% 100%}
.d-ambacht .am-logo span{overflow:hidden;font-family:var(--cond);font-size:25px;font-weight:700;line-height:1;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap;color:var(--navy)}
.d-ambacht .am-links{display:none;gap:30px;margin-left:auto;font-weight:500;color:var(--navy)}
.d-ambacht .am-links a{position:relative;padding:8px 0}
.d-ambacht .am-links a::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--orange);transform:scaleX(0);transform-origin:right;transition:transform .35s var(--snap)}
.d-ambacht .am-links a:hover::after{transform:none;transform-origin:left}
.d-ambacht .am-cta{display:none;min-height:50px}
.d-ambacht .am-call{display:grid;place-items:center;flex:none;width:50px;height:50px;margin-left:auto;border-radius:8px;background:var(--orange);color:#fff}
.d-ambacht .am-call svg{width:20px;height:20px;animation:am-ring 4s var(--ease) 2s infinite}
.d-ambacht .am-burger{display:flex;align-items:center;gap:10px;min-height:50px;padding:0 16px;border:2px solid var(--navy);border-radius:8px;background:none;font-family:var(--cond);font-size:18px;font-weight:700;text-transform:uppercase;color:var(--navy)}
.d-ambacht .am-burger i{display:grid;gap:5px;width:20px}
.d-ambacht .am-burger i::before,.d-ambacht .am-burger i::after{content:"";height:2px;background:currentColor;transition:transform .3s var(--ease)}
.d-ambacht.menu-open .am-burger i::before{transform:translateY(3.5px) rotate(45deg)}
.d-ambacht.menu-open .am-burger i::after{transform:translateY(-3.5px) rotate(-45deg)}
.d-ambacht .am-bar>.am-logo+.am-links+.am-cta+.am-burger{margin-left:auto}
@media (min-width:1040px){.d-ambacht .am-links,.d-ambacht .am-cta{display:inline-flex}.d-ambacht .am-burger,.d-ambacht .am-call{display:none}}
.d-ambacht .am-menu{position:fixed;inset:118px 0 0;z-index:39;display:flex;flex-direction:column;gap:28px;padding:24px var(--pad) 110px;background:var(--navy);color:#fff;overflow-y:auto;clip-path:inset(0 0 100% 0);visibility:hidden;transition:clip-path .55s var(--snap),visibility 0s .55s}
.d-ambacht.is-scrolled .am-menu{inset:76px 0 0}
.d-ambacht .am-menu.is-open{clip-path:inset(0);visibility:visible;transition:clip-path .55s var(--snap)}
.d-ambacht .am-menu nav{display:grid}
.d-ambacht .am-menu nav a{display:flex;align-items:center;justify-content:space-between;min-height:62px;border-bottom:1px solid rgba(255,255,255,.14);font-family:var(--cond);font-size:clamp(30px,7vw,46px);font-weight:700;text-transform:uppercase;opacity:0;transform:translateX(-24px);transition:opacity .4s,transform .5s var(--ease)}
.d-ambacht .am-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.15s + var(--i,0) * 50ms)}
.d-ambacht .am-menu nav a::after{content:"→";color:var(--orange);transition:transform .3s var(--ease)}
.d-ambacht .am-menu nav a:hover::after{transform:translateX(6px)}
.d-ambacht .am-menu .btn{align-self:start}
.d-ambacht .am-hero{position:relative;background:var(--navy);color:#fff;overflow:hidden}
.d-ambacht .am-hero::before{content:"";position:absolute;inset:-50%;background:repeating-linear-gradient(-55deg,transparent 0 46px,rgba(255,255,255,.03) 46px 47px);animation:am-drift 40s linear infinite;pointer-events:none}
.d-ambacht .am-hero::after{content:"";position:absolute;right:-10%;top:-30%;width:60%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(242,106,27,.18),transparent 65%);pointer-events:none}
.d-ambacht .am-hero-grid{position:relative;z-index:1;display:grid;gap:44px;padding-block:clamp(52px,7vw,116px) clamp(100px,11vw,160px)}
@media (min-width:980px){.d-ambacht .am-hero-grid{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:center}}
.d-ambacht .am-hero .am-kick{color:#ffb27f;animation:am-up .7s var(--ease) .1s both}
.d-ambacht .am-hero h1{margin-top:20px;font-size:clamp(50px,7.2vw,110px);line-height:.92;color:#fff}
.d-ambacht .am-hero h1.is-m{font-size:clamp(42px,5.8vw,88px)}
.d-ambacht .am-hero h1.is-s{font-size:clamp(36px,4.6vw,66px);line-height:.98}
.d-ambacht .am-ln{position:relative;display:block;width:max-content;max-width:100%}
.d-ambacht .am-ln>span{display:inline-block;opacity:0;animation:am-show .01s linear both;animation-delay:calc(.55s + var(--i,0) * 180ms)}
.d-ambacht .am-ln::after{content:"";position:absolute;inset:4% -2% 0;background:var(--orange);transform:scaleX(0);transform-origin:left;animation:am-wipe .75s var(--snap) both;animation-delay:calc(.2s + var(--i,0) * 180ms)}
.d-ambacht .am-hero h1:not(.is-marked) .am-ln:last-child>span{color:var(--orange)}
.d-ambacht .am-lede{max-width:50ch;margin-top:24px;font-size:clamp(17px,1.3vw,20px);color:rgba(255,255,255,.8);animation:am-up .8s var(--ease) .9s both}
.d-ambacht .am-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px;animation:am-up .8s var(--ease) 1s both}
.d-ambacht .am-hero .am-line{color:#fff}
.d-ambacht .am-hero .am-line:hover{background:#fff;color:var(--navy);border-color:#fff}
.d-ambacht .am-hero-pic{position:relative;animation:am-slide 1.2s var(--snap) .4s both}
.d-ambacht .am-hero-pic figure{position:relative;aspect-ratio:5/4;overflow:hidden;border-radius:var(--r);clip-path:polygon(9% 0,100% 0,100% 100%,0 100%)}
.d-ambacht .am-hero-pic img{width:100%;height:100%;object-fit:cover;scale:1.15;animation:am-zoom 2.4s var(--ease) .4s forwards}
.d-ambacht .am-hero-pic::after{content:"";position:absolute;left:0;bottom:-10px;width:44%;height:10px;background:var(--orange);transform-origin:left;animation:am-wipe-in 1s var(--snap) 1.1s both}
.d-ambacht .am-hero-tag{position:absolute;right:16px;top:16px;display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;background:var(--white);color:var(--navy);font-family:var(--cond);font-size:18px;font-weight:700;text-transform:uppercase;box-shadow:0 12px 30px -14px rgba(0,0,0,.5);animation:am-up .7s var(--ease) 1.3s both}
.d-ambacht .am-hero-tag svg{width:18px;height:18px;color:var(--orange)}
.d-ambacht .am-tiles{display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr))}
.d-ambacht .am-tiles li{display:grid;gap:14px;align-content:space-between;min-height:140px;padding:22px;border:1px solid rgba(255,255,255,.14);border-radius:var(--r);background:var(--navy-3);font-family:var(--cond);font-size:23px;font-weight:700;line-height:1.05;text-transform:uppercase;animation:am-up .8s var(--ease) both;animation-delay:calc(.5s + var(--i,0) * 100ms);transition:background-color .3s,transform .3s var(--ease)}
.d-ambacht .am-tiles li:hover{background:var(--orange);transform:translateY(-4px)}
.d-ambacht .am-tiles svg{width:28px;height:28px;color:var(--orange);transition:color .3s}
.d-ambacht .am-tiles li:hover svg{color:#fff}
.d-ambacht .am-facts{position:relative;z-index:2;display:grid;gap:12px;margin-top:-66px}
@media (min-width:760px){.d-ambacht .am-facts{grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}}
.d-ambacht .am-facts div{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 16px;align-items:center;padding:22px 24px;border-radius:var(--r);background:var(--white);box-shadow:0 24px 50px -28px rgba(14,36,64,.55);border-top:4px solid var(--orange);animation:am-up .8s var(--ease) both;animation-delay:calc(1.1s + var(--i,0) * 110ms);transition:transform .3s var(--ease)}
.d-ambacht .am-facts div:hover{transform:translateY(-4px)}
.d-ambacht .am-facts span{grid-row:span 2;display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--mist);color:var(--navy)}
.d-ambacht .am-facts svg{width:20px;height:20px}
.d-ambacht .am-facts dt{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}
.d-ambacht .am-facts dd{margin:0;font-weight:500;color:var(--navy)}
.d-ambacht .am-band{overflow:hidden;margin:clamp(56px,7vw,96px) -2% 0;background:var(--orange);color:#fff;transform:rotate(-1.2deg)}
.d-ambacht .am-band p{display:flex;width:max-content;gap:36px;padding:18px 0;font-family:var(--cond);font-size:clamp(24px,2.6vw,36px);font-weight:700;text-transform:uppercase;white-space:nowrap;animation:am-run 36s linear infinite}
.d-ambacht .am-band span{display:inline-flex;align-items:center;gap:36px}
.d-ambacht .am-band span::after{content:"";width:14px;height:14px;background:var(--navy);transform:rotate(45deg)}
.d-ambacht .am-sec{position:relative;padding-block:clamp(80px,10vw,150px)}
.d-ambacht .am-sec.is-mist{background:var(--mist)}
.d-ambacht .am-sec.is-navy{background:var(--navy);color:rgba(255,255,255,.82);overflow:hidden}
.d-ambacht .am-sec.is-navy::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse at 70% 20%,#000,transparent 70%);-webkit-mask-image:radial-gradient(ellipse at 70% 20%,#000,transparent 70%);pointer-events:none}
.d-ambacht .is-navy h2,.d-ambacht .is-navy h3{color:#fff}
.d-ambacht .is-navy .am-kick{color:#ffb27f}
.d-ambacht .am-head{display:grid;gap:16px;max-width:820px;margin-bottom:clamp(40px,5vw,68px)}
.d-ambacht .am-head>p:not(.am-kick){max-width:58ch;color:var(--dim)}
.d-ambacht .is-navy .am-head>p:not(.am-kick){color:rgba(255,255,255,.72)}
.d-ambacht .am-head.is-row{max-width:none}
@media (min-width:900px){.d-ambacht .am-head.is-row{grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);align-items:end}.d-ambacht .am-head.is-row .am-kick{grid-column:1/-1}}
.d-ambacht .am-about{display:grid;gap:clamp(40px,5vw,88px);align-items:center}
@media (min-width:960px){.d-ambacht .am-about{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}.d-ambacht .am-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:920px}}
.d-ambacht .am-about-copy{display:grid;gap:20px}
.d-ambacht .am-about-copy .am-lead{font-size:clamp(19px,1.5vw,22px);color:var(--navy)}
.d-ambacht .am-about-copy p{color:var(--dim)}
.d-ambacht .am-checks{display:grid;gap:14px;margin-top:8px}
@media (min-width:620px){.d-ambacht .am-checks{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-ambacht .am-checks li{display:flex;align-items:center;gap:12px;font-weight:600;color:var(--navy)}
.d-ambacht .am-checks span{display:grid;flex:none;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--orange);color:#fff;transform:scale(0);transition:transform .5s cubic-bezier(.34,1.56,.64,1);transition-delay:calc(.2s + var(--i,0) * 120ms)}
.d-ambacht .am-checks svg{width:16px;height:16px}
.d-ambacht .am-checks svg path{stroke-dasharray:30;stroke-dashoffset:30;transition:stroke-dashoffset .5s var(--ease);transition-delay:calc(.45s + var(--i,0) * 120ms)}
.d-ambacht .am-checks.in span,html:not(.demo-js) .d-ambacht .am-checks span{transform:none}
.d-ambacht .am-checks.in svg path,html:not(.demo-js) .d-ambacht .am-checks svg path{stroke-dashoffset:0}
.d-ambacht .am-about-pic{position:relative}
.d-ambacht .am-about-pic figure{aspect-ratio:4/5;overflow:hidden;border-radius:var(--r)}
.d-ambacht .am-about-pic img{width:100%;height:100%;object-fit:cover;transform:scale(1.1) translateY(calc(var(--p,0) * -3%))}
.d-ambacht .am-about-pic::before{content:"";position:absolute;right:-16px;top:-16px;width:40%;height:40%;border-top:6px solid var(--orange);border-right:6px solid var(--orange);border-radius:0 var(--r) 0 0}
.d-ambacht .am-badge{position:absolute;left:-14px;bottom:28px;display:flex;align-items:center;gap:10px;padding:14px 18px;border-radius:var(--r);background:var(--navy);color:#fff;font-family:var(--cond);font-size:21px;font-weight:700;text-transform:uppercase;box-shadow:0 14px 30px -14px rgba(14,36,64,.6)}
.d-ambacht .am-badge svg{width:20px;height:20px;color:var(--orange)}
.d-ambacht .am-cards{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))}
.d-ambacht .am-card{position:relative;display:grid;gap:14px;align-content:start;height:100%;padding:clamp(24px,2.4vw,32px);border:1px solid var(--line);border-radius:var(--r);background:var(--white);overflow:hidden;transition:transform .35s var(--ease),box-shadow .35s var(--ease)}
.d-ambacht .am-card::before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:var(--orange);transform:scaleX(0);transform-origin:left;transition:transform .45s var(--snap)}
.d-ambacht .am-card::after{content:attr(data-n);position:absolute;right:20px;top:14px;font-family:var(--cond);font-size:54px;font-weight:700;line-height:1;color:var(--mist);transition:color .35s}
.d-ambacht .am-card:hover{transform:translateY(-6px);box-shadow:0 26px 48px -28px rgba(14,36,64,.55)}
.d-ambacht .am-card:hover::before{transform:none}
.d-ambacht .am-card:hover::after{color:var(--peach)}
.d-ambacht .am-card>*{position:relative;z-index:1}
.d-ambacht .am-ico{display:grid;place-items:center;width:58px;height:58px;border-radius:10px;background:var(--peach);color:var(--orange-d);transition:transform .5s var(--ease),background-color .3s,color .3s}
.d-ambacht .am-card:hover .am-ico{transform:rotateY(180deg);background:var(--orange);color:#fff}
.d-ambacht .am-ico svg{width:26px;height:26px}
.d-ambacht .am-card p{color:var(--dim)}
.d-ambacht .am-card .z-pic{aspect-ratio:16/10;margin:-8px -8px 4px;border-radius:6px}
.d-ambacht .am-card .z-pic img{transition:transform .8s var(--ease)}
.d-ambacht .am-card:hover .z-pic img{transform:scale(1.06)}
.d-ambacht .am-meta{display:flex;flex-wrap:wrap;gap:8px}
.d-ambacht .am-meta span{padding:5px 12px;border-radius:999px;background:var(--mist);font-size:14px;font-weight:600;color:var(--navy)}
.d-ambacht .am-steps{position:relative;display:grid;gap:26px;--prog:0}
@media (min-width:900px){.d-ambacht .am-steps{grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:28px}}
.d-ambacht .am-steps::before,.d-ambacht .am-steps::after{content:"";position:absolute;left:27px;top:28px;bottom:28px;width:4px;border-radius:4px;background:var(--line)}
.d-ambacht .am-steps::after{background:var(--orange);transform:scaleY(var(--prog));transform-origin:top;transition:transform .2s linear}
@media (min-width:900px){.d-ambacht .am-steps::before,.d-ambacht .am-steps::after{left:28px;right:calc(100% / var(--n,4) - 28px);top:26px;bottom:auto;width:auto;height:4px}.d-ambacht .am-steps::after{transform:scaleX(var(--prog));transform-origin:left}}
.d-ambacht .am-steps li{position:relative;z-index:1;display:grid;gap:12px;align-content:start;padding-left:76px}
@media (min-width:900px){.d-ambacht .am-steps li{padding:84px 0 0}}
.d-ambacht .am-steps b{position:absolute;left:0;top:0;display:grid;place-items:center;width:56px;height:56px;border:3px solid var(--line);border-radius:50%;background:var(--white);font-family:var(--cond);font-size:27px;color:var(--navy);transition:background-color .4s,border-color .4s,color .4s,transform .5s cubic-bezier(.34,1.56,.64,1)}
.d-ambacht .am-steps li.is-done b{border-color:var(--orange);background:var(--orange);color:#fff;transform:scale(1.08)}
.d-ambacht .am-steps p{color:var(--dim)}
.d-ambacht .am-why{display:grid;gap:30px;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))}
.d-ambacht .am-why li{position:relative;display:grid;gap:14px;align-content:start;padding:26px;border:1px solid rgba(255,255,255,.12);border-radius:var(--r);background:rgba(255,255,255,.03);transition:background-color .35s,transform .35s var(--ease)}
.d-ambacht .am-why li:hover{background:rgba(255,255,255,.07);transform:translateY(-4px)}
.d-ambacht .am-why span{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:var(--orange);color:#fff;box-shadow:0 0 0 8px rgba(242,106,27,.14)}
.d-ambacht .am-why svg{width:24px;height:24px}
.d-ambacht .am-why p{color:rgba(255,255,255,.72)}
.d-ambacht .am-quote{display:grid;gap:clamp(32px,4vw,64px);align-items:start}
@media (min-width:980px){.d-ambacht .am-quote{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}}
.d-ambacht .am-quote-copy{display:grid;gap:22px}
.d-ambacht .am-quote-copy>p{color:var(--dim)}
.d-ambacht .am-quote-card{overflow:hidden;border-radius:var(--r);background:var(--white);box-shadow:0 34px 70px -38px rgba(14,36,64,.6)}
.d-ambacht .am-quote-card>header{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 18px;padding:20px clamp(22px,3vw,36px);background:var(--navy);color:#fff;overflow:hidden}
.d-ambacht .am-quote-card>header::after{content:"";position:absolute;left:0;bottom:0;height:4px;width:100%;background:var(--orange);transform-origin:left;transition:transform 1s var(--snap) .3s}
.demo-js .d-ambacht .am-quote-card:not(.in)>header::after{transform:scaleX(0)}
.d-ambacht .am-quote-card>header p{font-family:var(--cond);font-size:23px;font-weight:700;text-transform:uppercase}
.d-ambacht .am-quote-card>header a{display:inline-flex;align-items:center;gap:8px;min-height:40px;font-weight:600;color:#ffb27f}
.d-ambacht .am-quote-card>header svg{width:16px;height:16px}
.d-ambacht .am-quote-card .z-form{padding:clamp(22px,3vw,36px)}
.d-ambacht .am-board{padding:clamp(22px,3vw,36px);border-radius:var(--r);background:var(--navy);color:#fff}
.d-ambacht .am-board h3{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;color:#fff;font-size:26px}
.d-ambacht .am-board .z-hours,.d-ambacht .am-board .z-hours div{border-color:rgba(255,255,255,.14)}
.d-ambacht .am-board .z-hours dd{color:#fff}
.d-ambacht .z-hours div.is-today{margin-inline:-12px;padding-inline:12px;border-radius:6px;background:var(--orange);color:#fff;font-weight:700}
.d-ambacht .z-hours div.is-today dd{color:#fff}
.d-ambacht .z-field label{font-weight:700;letter-spacing:.06em;color:var(--navy)}
.d-ambacht .z-field input,.d-ambacht .z-field select,.d-ambacht .z-field textarea{border:1.5px solid #c9d3df;background:#fff;transition:border-color .2s,box-shadow .2s}
.d-ambacht .z-field input:focus,.d-ambacht .z-field select:focus,.d-ambacht .z-field textarea:focus{border-color:var(--orange);box-shadow:0 0 0 4px rgba(242,106,27,.15)}
.d-ambacht .z-field :focus-visible{outline:none}
.d-ambacht .z-hours{border-color:var(--line)}
.d-ambacht .z-hours dd{font-weight:600;color:var(--navy)}
.d-ambacht .z-sec.z-cta{background:var(--orange);color:#fff;overflow:hidden}
.d-ambacht .z-cta h2{color:#fff;font-size:clamp(44px,6vw,96px)}
.d-ambacht .z-cta h2 em{color:var(--navy)}
.d-ambacht .z-cta .z-center>p{color:rgba(255,255,255,.9)}
.d-ambacht .z-cta .am-fill{background:var(--navy);box-shadow:none}
.d-ambacht .z-acc summary{font-family:var(--cond);font-size:clamp(21px,1.7vw,26px);font-weight:700;text-transform:uppercase;color:var(--navy);transition:color .2s}
.d-ambacht .z-acc summary:hover{color:var(--orange)}
.d-ambacht .z-acc summary i{width:32px;height:32px;border-radius:8px;background:var(--mist);color:var(--orange)}
.d-ambacht .z-acc summary i::before,.d-ambacht .z-acc summary i::after{left:9px;width:14px;height:2px}
.d-ambacht .z-sec:has(.z-acc){background:var(--mist)}
.d-ambacht .z-card,.d-ambacht .z-panel{background:var(--white);border-color:var(--line);transition:transform .3s var(--ease),box-shadow .3s}
.d-ambacht .z-card:hover{transform:translateY(-4px);box-shadow:0 22px 40px -26px rgba(14,36,64,.5)}
.d-ambacht .z-pack.is-featured{border-width:2px}
.d-ambacht .z-steps small,.d-ambacht .z-rows small{font-family:var(--cond);font-size:22px;font-weight:700}
.d-ambacht .z-quotes blockquote>p{font-family:"DM Sans",sans-serif;font-size:clamp(18px,1.5vw,22px)}
.d-ambacht .am-foot{background:var(--navy-2);color:rgba(255,255,255,.75)}
.d-ambacht .am-call-band{position:relative;overflow:hidden;background:var(--orange);color:#fff}
.d-ambacht .am-call-band::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(-45deg,transparent 0 22px,rgba(255,255,255,.07) 22px 44px)}
.d-ambacht .am-call-band .am-wrap{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px 32px;padding-block:clamp(30px,4vw,52px)}
.d-ambacht .am-call-band p{font-family:var(--cond);font-size:clamp(34px,4.6vw,68px);font-weight:700;line-height:1;text-transform:uppercase}
.d-ambacht .am-call-band small{display:block;margin-bottom:8px;font-family:"DM Sans",sans-serif;font-size:14px;font-weight:600;letter-spacing:.12em;opacity:.85}
.d-ambacht .am-call-band .btn{background:var(--navy);color:#fff}
.d-ambacht .am-call-band .btn:hover{background:var(--navy-3);transform:translateY(-2px)}
.d-ambacht .am-foot-grid{display:grid;gap:36px;padding-block:clamp(56px,7vw,96px) 0;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-ambacht .am-foot-grid h3{margin-bottom:14px;font-size:21px;color:#fff}
.d-ambacht .am-foot-grid a,.d-ambacht .am-foot-grid span{display:block;padding:4px 0}
.d-ambacht .am-foot-grid a{transition:color .2s,transform .3s var(--ease)}
.d-ambacht .am-foot-grid a:hover{color:#ffb27f;transform:translateX(4px)}
.d-ambacht .am-foot .am-logo span{color:#fff}
.d-ambacht .am-foot .am-logo i{background:var(--orange)}
.d-ambacht .am-foot .am-logo i::after{background:var(--navy)}
.d-ambacht .am-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;padding:22px 0 130px;border-top:1px solid rgba(255,255,255,.12);font-size:13px}
@keyframes am-wipe{0%{transform:scaleX(0);transform-origin:left}49%{transform:scaleX(1);transform-origin:left}50%{transform:scaleX(1);transform-origin:right}100%{transform:scaleX(0);transform-origin:right}}
@keyframes am-show{to{opacity:1}}
@keyframes am-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes am-slide{from{opacity:0;clip-path:inset(0 0 0 100%)}to{opacity:1;clip-path:inset(0)}}
@keyframes am-zoom{to{scale:1}}
@keyframes am-wipe-in{from{transform:scaleX(0)}to{transform:none}}
@keyframes am-run{to{transform:translateX(-50%)}}
@keyframes am-drift{to{transform:translateX(94px)}}
@keyframes am-ring{0%,86%,100%{transform:none}88%{transform:rotate(-14deg)}90%{transform:rotate(12deg)}92%{transform:rotate(-8deg)}94%{transform:rotate(4deg)}}
@media (prefers-reduced-motion:reduce){.d-ambacht .am-ln>span{opacity:1}.d-ambacht .am-ln::after{display:none}.d-ambacht .am-hero-pic img{scale:1}.d-ambacht .am-band p,.d-ambacht .am-hero::before{animation:none}.d-ambacht .am-checks span{transform:none}.d-ambacht .am-checks svg path{stroke-dashoffset:0}}
`
  .replace(/\n/g, "")
  .trim();

/** The process line fills as its steps scroll past; a step counts as reached when its marker does. */
const JS = `(function(){var d=document,W=window;[].slice.call(d.querySelectorAll('.am-steps')).forEach(function(l){var items=[].slice.call(l.children);function upd(){var r=l.getBoundingClientRect(),vh=W.innerHeight,wide=W.innerWidth>=900;var p=wide?Math.min(1,Math.max(0,(vh*.85-r.top)/(vh*.6))):Math.min(1,Math.max(0,(vh*.65-r.top)/r.height));l.style.setProperty('--prog',p.toFixed(3));items.forEach(function(it,k){it.classList.toggle('is-done',p>=(items.length>1?k/(items.length-1):1)-.001)})}W.addEventListener('scroll',upd,{passive:true});W.addEventListener('resize',upd);upd()})})();`;

const Check = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4 10.5 4 4 8-9" />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="am-kick" data-rv>
    {children}
  </p>
);

function Head({ kicker, title, intro, id, row }: { kicker?: string; title: string; intro?: string; id?: string; row?: boolean }) {
  return (
    <header className={`am-head${row && intro ? " is-row" : ""}`}>
      {kicker ? <Kick>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

const Logo = ({ c }: { c: Ctx }) => (
  <a href="#top" className="am-logo" aria-label={c.name}>
    <i aria-hidden="true">{c.name.charAt(0)}</i>
    <span>{c.name}</span>
  </a>
);

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const open = b.openingHours?.find((l) => !/gesloten|closed|ferm[ée]|geschlossen/i.test(l));
  return (
    <>
      <header className="am-hdr hdr">
        <div className="am-top">
          <div className="am-wrap">
            {b.city ? (
              <span>
                <Icon name="map" />
                {b.city}
              </span>
            ) : null}
            {open ? (
              <span>
                <Icon name="clock" />
                {open}
              </span>
            ) : null}
            <NowBadge c={c} className="am-now" />
            {b.phone ? (
              <a href={tel(b.phone)}>
                <Icon name="phone" />
                {b.phone}
              </a>
            ) : null}
          </div>
        </div>
        <div className="am-wrap am-bar">
          <Logo c={c} />
          <nav aria-label={c.t.menu} className="am-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn am-fill am-cta">
            {cta.label}
          </a>
          {b.phone ? (
            <a href={tel(b.phone)} className="am-call" aria-label={`${c.t.phone}: ${b.phone}`}>
              <Icon name="phone" />
            </a>
          ) : null}
          <button type="button" className="am-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="am-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href={cta.href} className="btn am-fill">
          {cta.label}
        </a>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 44 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const { lines, marked } = splitLines(hero.headline, plain.length > 22 ? 3 : 2);
  const facts = heroFacts(c);
  // Without a photograph the right column shows the business's own services as tiles.
  const services = c.spec.sections.flatMap((s) => (s.type === "services" ? s.items.slice(0, 4).map((it) => ({ title: it.title, icon: it.icon })) : []));
  const icon = (label: string) => (label === c.t.address ? "map" : label === c.t.hours ? "clock" : label === c.t.phone ? "phone" : "check");
  return (
    <>
      <section className="am-hero">
        <div className="am-wrap am-hero-grid">
          <div>
            {hero.eyebrow ? <p className="am-kick">{hero.eyebrow}</p> : null}
            <h1 className={[size, marked ? "is-marked" : ""].filter(Boolean).join(" ") || undefined}>
              {lines.map((line, n) => (
                <span key={n} className="am-ln" style={i(n)}>
                  <span style={i(n)}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="am-lede">{hero.subheadline}</p>
            <div className="am-cta-row">
              <Btn c={c} href={hero.primaryCta.href}>
                {hero.primaryCta.label} <Arrow />
              </Btn>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                  {/^tel:/.test(hero.secondaryCta.href) ? <Icon name="phone" /> : null}
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
            </div>
          </div>
          {p ? (
            <div className="am-hero-pic">
              <figure>
                <Pic p={p} eager sizes="(min-width: 980px) 44vw, 92vw" />
              </figure>
              {c.spec.business.city ? (
                <p className="am-hero-tag">
                  <Icon name="map" />
                  {c.spec.business.city}
                </p>
              ) : null}
            </div>
          ) : services.length >= 2 ? (
            <ul className="am-tiles">
              {services.map((s, n) => (
                <li key={s.title} style={i(n)}>
                  <Icon name={s.icon} />
                  {s.title}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
      {facts.length > 0 && (
        <div className="am-wrap">
          <dl className="am-facts" style={{ ["--n" as string]: facts.length }}>
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
        </div>
      )}
      <Band c={c} />
    </>
  );
}

/** A band of what the business does, from its own services. */
function Band({ c }: { c: Ctx }) {
  const list = offerWords(c);
  if (list.length < 3) return null;
  return (
    <div className="am-band" aria-hidden="true">
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
  const cta = c.spec.hero.primaryCta;
  const callLabel = c.spec.hero.secondaryCta && /^tel:/.test(c.spec.hero.secondaryCta.href) ? c.spec.hero.secondaryCta.label : c.t.phone;
  return (
    <footer className="am-foot">
      <div className="am-call-band">
        <div className="am-wrap">
          <p data-rv>
            {b.phone ? <small>{callLabel}</small> : null}
            {b.phone ? b.phone : cta.label}
          </p>
          <a href={b.phone ? tel(b.phone) : cta.href} className="btn">
            {b.phone ? <Icon name="phone" /> : null}
            {b.phone ? callLabel : cta.label}
            <Arrow />
          </a>
        </div>
      </div>
      <div className="am-wrap">
        <div className="am-foot-grid">
          <div>
            <Logo c={c} />
            {c.spec.footer.blurb ? <p style={{ marginTop: 18 }}>{c.spec.footer.blurb}</p> : null}
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
        <Legal c={c} className="am-legal" />
      </div>
    </footer>
  );
}

export const ambacht: Family = {
  key: "ambacht",
  root: "d-ambacht",
  fonts: ["Barlow Condensed", "DM Sans"],
  themeColor: "#ffffff",
  accent: "#f26a1b",
  onAccent: "#ffffff",
  css: CSS,
  extra: "",
  js: JS + TODAY_JS,
  cls: { wrap: "am-wrap", eyebrow: "am-kick", btn: "am-fill", btnAlt: "am-line", btnText: "am-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="am-sec" id={s.id}>
          <div className={`am-wrap am-about${p ? "" : " is-solo"}`}>
            <div className="am-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="am-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="am-checks" data-rv>
                  {s.highlights.map((h, n) => (
                    <li key={h}>
                      <span aria-hidden="true" style={i(n)}>
                        <Check />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {p ? (
              <div className="am-about-pic" data-rv>
                <figure data-px>
                  <Pic p={p} sizes="(min-width: 960px) 40vw, 92vw" />
                </figure>
                {c.spec.business.city ? (
                  <p className="am-badge">
                    <Icon name="map" />
                    {c.spec.business.city}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => (
      <section className="am-sec is-mist" id={s.id}>
        <div className="am-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} row />
          <ul className="am-cards">
            {s.items.map((it, n) => {
              const p = c.photo(`art:svc${n}`);
              return (
                <li key={n} data-rv style={i(n % 3)}>
                  <div className="am-card" data-n={String(n + 1).padStart(2, "0")}>
                    {p ? (
                      <figure className="z-pic">
                        <Pic p={p} sizes="(min-width: 900px) 30vw, 92vw" />
                      </figure>
                    ) : (
                      <span className="am-ico" aria-hidden="true">
                        <Icon name={it.icon} />
                      </span>
                    )}
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                    {it.price || it.duration ? (
                      <p className="am-meta">
                        {it.price ? <span>{it.price}</span> : null}
                        {it.duration ? <span>{it.duration}</span> : null}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    process: (s, c) => (
      <section className="am-sec" id={s.id}>
        <div className="am-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} row />
          <ol className="am-steps" style={{ ["--n" as string]: s.steps.length }}>
            {s.steps.map((st, n) => (
              <li key={n} data-rv style={i(n)}>
                <b>{n + 1}</b>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    features: (s, c) => (
      <section className="am-sec is-navy" id={s.id}>
        <div className="am-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} row />
          <ul className="am-why">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span aria-hidden="true">
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
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="am-sec" id={s.id}>
          <div className="am-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className={`z-gal z-gal-${Math.min(6, pics.length)}`}>
              {pics.slice(0, 6).map((p, n) => (
                <figure key={n} className="z-pic" data-rv style={i(n % 3)}>
                  <Pic p={p} sizes="(min-width: 900px) 33vw, 50vw" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="am-sec" id={s.id}>
        <div className="am-wrap am-quote">
          <div className="am-quote-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="am-board" data-rv>
            <h3>
              {c.t.hours}
              <NowBadge c={c} className="am-now" />
            </h3>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="am-sec is-mist" id={s.id}>
        <div className="am-wrap am-quote">
          <div className="am-quote-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="am-quote-card" data-rv>
              <header>
                <p>{c.t.contact}</p>
                {c.spec.business.phone ? (
                  <a href={tel(c.spec.business.phone)}>
                    <Icon name="phone" />
                    {c.spec.business.phone}
                  </a>
                ) : null}
              </header>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : null}
        </div>
      </section>
    ),
    booking: (s, c) => {
      const b = c.spec.business;
      return (
        <section className="am-sec is-mist" id={s.id}>
          <div className="am-wrap am-quote">
            <div className="am-quote-copy">
              <Head kicker={c.t.kick.booking} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Hours c={c} />
              <Reach c={c} />
            </div>
            <div className="am-quote-card" data-rv>
              <header>
                <p>{c.t.submit[s.kind]}</p>
                {b.phone ? (
                  <a href={tel(b.phone)}>
                    <Icon name="phone" />
                    {b.phone}
                  </a>
                ) : null}
              </header>
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
            </div>
          </div>
        </section>
      );
    },
  },
};
