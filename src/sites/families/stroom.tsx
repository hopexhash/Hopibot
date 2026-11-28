import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, splitLines, tel, type Ctx, type Family, type HeadProps, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Stroom: an original template (no portfolio demo). Premium installation work: crisp white and
 * cool greys, one vivid electric blue and a warm heat colour, a clear geometric sans and rounded
 * panels. The headline charges up line by line like a battery bar, a current runs around the
 * opening photograph, cards light up where the pointer is, buttons are pulled towards it, the
 * process steps are joined by a line that carries current as you scroll, the service area is a
 * range map of place names, and the hours sit on a dark "on call" panel with a slow waveform.
 * Made for plumbers, electricians, heating and installation companies and other technical services.
 */

const CSS = `
.d-stroom{--white:#ffffff;--cloud:#f3f6f9;--cloud-2:#e8edf3;--ink:#0a1324;--ink-2:#0f1b31;--ink-3:#18284a;--text:#2b3950;--dim:#5a6679;--line:rgba(10,19,36,.1);--line-2:rgba(10,19,36,.18);--volt:#1f5bff;--volt-d:#1847d6;--volt-2:#5b8cff;--volt-l:#e8efff;--heat:#ff6a3d;--heat-l:#ffeee7;--go:#16b47e;--r:24px;--r-s:14px;--pad:clamp(16px,4.2vw,64px);--ease:cubic-bezier(.22,1,.36,1);--spring:cubic-bezier(.34,1.56,.64,1);--sora:"Sora",ui-sans-serif,system-ui,sans-serif;--z-bg2:var(--cloud);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line-2);--z-accent:var(--volt);--z-on-accent:#fff;--z-display:var(--sora);--z-display-weight:600;--z-radius:var(--r);--z-field-radius:12px;--z-ico-radius:14px;--z-sec:clamp(84px,10vw,150px);--z-h3:clamp(20px,1.5vw,23px);--z-statement:clamp(30px,3.6vw,54px);background:var(--white);color:var(--text);font-family:"Inter",system-ui,sans-serif;font-size:clamp(16px,1.02vw,17px);line-height:1.6}
.d-stroom h1,.d-stroom h2,.d-stroom h3{font-family:var(--sora);font-weight:600;line-height:1.06;letter-spacing:-.035em;color:var(--ink)}
.d-stroom h2{font-size:clamp(34px,4.2vw,62px)}
.d-stroom h2.is-long{font-size:clamp(28px,3.1vw,46px)}
.d-stroom h3{font-size:var(--z-h3);letter-spacing:-.02em;line-height:1.2}
.d-stroom h2 em,.d-stroom h3 em{font-style:normal;background:linear-gradient(100deg,var(--volt) 10%,var(--volt-2) 60%,var(--heat) 130%);-webkit-background-clip:text;background-clip:text;color:transparent}
.d-stroom ::selection{background:var(--volt);color:#fff}
.d-stroom .sr-wrap{position:relative;width:min(100%,1320px);margin-inline:auto;padding-inline:var(--pad)}
.d-stroom .sr-kick{display:inline-flex;align-items:center;gap:10px;justify-self:start;padding:7px 14px 7px 8px;border:1px solid var(--line);border-radius:999px;background:var(--white);font-size:13px;font-weight:600;letter-spacing:.01em;color:var(--ink)}
.d-stroom .sr-kick::before{content:"";width:22px;height:22px;border-radius:50%;background:var(--volt) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.4' stroke-linejoin='round'%3E%3Cpath d='M13 3 6 13.5h5.5L10.5 21 18 10h-5.5L13 3Z'/%3E%3C/svg%3E") center/13px no-repeat}
.d-stroom .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:56px;padding:0 10px 0 26px;border-radius:999px;overflow:hidden;isolation:isolate;font-family:var(--sora);font-size:15.5px;font-weight:600;letter-spacing:-.01em;transition:background-color .3s,color .3s,border-color .3s,box-shadow .4s var(--ease),translate .5s var(--ease)}
.d-stroom .btn>i{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;transition:transform .5s var(--ease),background-color .3s}
.d-stroom .btn>i svg{width:16px;height:16px}
.d-stroom .btn:hover>i{transform:rotate(-45deg)}
.d-stroom .btn:not(:has(>i)){padding:0 26px}
.d-stroom .btn::after{content:"";position:absolute;top:0;bottom:0;left:-60%;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);transform:skewX(-20deg) translateX(0);transition:transform .9s var(--ease);pointer-events:none}
.d-stroom .btn:hover::after{transform:skewX(-20deg) translateX(420%)}
.d-stroom .sr-fill{background:linear-gradient(135deg,var(--volt),var(--volt-d));color:#fff;box-shadow:0 14px 30px -14px rgba(31,91,255,.75),inset 0 1px 0 rgba(255,255,255,.25)}
.d-stroom .sr-fill>i{background:rgba(255,255,255,.16)}
.d-stroom .sr-fill:hover{box-shadow:0 20px 40px -14px rgba(31,91,255,.85),inset 0 1px 0 rgba(255,255,255,.25)}
.d-stroom .sr-line{border:1.5px solid var(--line-2);background:var(--white);color:var(--ink)}
.d-stroom .sr-line>i{background:var(--cloud)}
.d-stroom .sr-line:hover{border-color:var(--volt);color:var(--volt)}
.d-stroom .sr-line:hover>i{background:var(--volt-l)}
.d-stroom .sr-text{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-family:var(--sora);font-weight:600;color:var(--volt)}
.d-stroom .sr-text::after{content:"→";transition:transform .4s var(--ease)}
.d-stroom .sr-text:hover::after{transform:translateX(5px)}
.d-stroom .z-form .btn{padding:0 26px}
.d-stroom .sr-hdr{position:sticky;top:0;z-index:50;padding:12px 0 0;transition:padding .45s var(--ease)}
.d-stroom.is-scrolled .sr-hdr{padding-top:8px}
.d-stroom .sr-bar{display:flex;align-items:center;gap:14px;min-height:66px;padding:8px 8px 8px 16px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.82);-webkit-backdrop-filter:saturate(1.6) blur(16px);backdrop-filter:saturate(1.6) blur(16px);box-shadow:0 10px 30px -22px rgba(10,19,36,.4);transition:box-shadow .4s var(--ease)}
.d-stroom.is-scrolled .sr-bar{box-shadow:0 18px 40px -24px rgba(10,19,36,.5)}
.d-stroom .sr-logo{display:flex;align-items:center;gap:11px;min-width:0;margin-right:auto}
.d-stroom .sr-logo svg{flex:none;width:40px;height:40px;transition:transform .7s var(--spring)}
.d-stroom .sr-logo:hover svg{transform:rotate(-12deg) scale(1.06)}
.d-stroom .sr-logo span{overflow:hidden;font-family:var(--sora);font-size:18px;font-weight:700;letter-spacing:-.03em;text-overflow:ellipsis;white-space:nowrap;color:var(--ink)}
.d-stroom .sr-links{position:relative;display:none;align-items:center;gap:2px}
.d-stroom .sr-links a{position:relative;z-index:1;display:flex;align-items:center;min-height:44px;padding:0 15px;border-radius:999px;font-size:14.5px;font-weight:500;color:var(--text);white-space:nowrap;transition:color .25s}
.d-stroom .sr-links a:hover{color:var(--ink)}
.d-stroom .sr-ind{position:absolute;left:0;top:50%;height:44px;width:var(--iw,0px);border-radius:999px;background:var(--cloud-2);transform:translate(var(--ix,0px),-50%);opacity:0;transition:transform .45s var(--ease),width .45s var(--ease),opacity .25s;pointer-events:none}
.d-stroom .sr-links.is-hover .sr-ind{opacity:1}
.d-stroom .sr-call{display:none;align-items:center;gap:10px;min-height:48px;padding:0 16px;border-radius:999px;background:var(--heat-l);color:var(--ink);font-weight:600;font-size:14.5px;transition:background-color .3s}
.d-stroom .sr-call svg{width:16px;height:16px;color:var(--heat)}
.d-stroom .sr-call:hover{background:#ffe0d3}
.d-stroom .sr-hcta{display:none;min-height:50px;white-space:nowrap}
.d-stroom .sr-call{white-space:nowrap}
.d-stroom .sr-now{display:inline-flex;align-items:center;gap:8px;padding:5px 12px 5px 9px;border-radius:999px;background:var(--cloud);font-size:12.5px;font-weight:600;color:var(--ink);white-space:nowrap}
.d-stroom .sr-now[hidden]{display:none}
.d-stroom .sr-now::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor;box-shadow:0 0 0 3px rgba(22,180,126,.18)}
.d-stroom .sr-now.is-open{color:#0d8a60;background:#e3f7ef}
.d-stroom .sr-now.is-closed{color:#c2451f;background:var(--heat-l)}
.d-stroom .sr-now.is-closed::before{box-shadow:0 0 0 3px rgba(255,106,61,.18)}
.d-stroom .sr-burger{display:flex;align-items:center;gap:10px;min-height:50px;padding:0 8px 0 18px;border:0;border-radius:999px;background:var(--ink);color:#fff;font-family:var(--sora);font-size:14.5px;font-weight:600}
.d-stroom .sr-burger i{position:relative;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.12)}
.d-stroom .sr-burger i::before,.d-stroom .sr-burger i::after{content:"";position:absolute;width:14px;height:2px;border-radius:2px;background:currentColor;transition:transform .45s var(--ease)}
.d-stroom .sr-burger i::before{transform:translateY(-3.5px)}
.d-stroom .sr-burger i::after{transform:translateY(3.5px)}
.d-stroom.menu-open .sr-burger i::before{transform:rotate(45deg)}
.d-stroom.menu-open .sr-burger i::after{transform:rotate(-45deg)}
@media (min-width:1100px){.d-stroom .sr-links,.d-stroom .sr-hcta{display:inline-flex}.d-stroom .sr-burger{display:none}.d-stroom .sr-logo{margin-right:0}.d-stroom .sr-links{margin-inline:auto}}
@media (min-width:1100px) and (max-width:1279px){.d-stroom .sr-links a:nth-of-type(5){display:none}}
@media (min-width:1440px){.d-stroom .sr-call{display:inline-flex}}
.d-stroom .sr-menu{position:fixed;inset:0;z-index:45;display:flex;flex-direction:column;gap:24px;padding:104px var(--pad) 120px;background:var(--ink);color:#fff;overflow-y:auto;clip-path:circle(0 at calc(100% - 52px) 46px);visibility:hidden;transition:clip-path .75s var(--ease),visibility 0s .75s}
.d-stroom .sr-menu.is-open{clip-path:circle(150% at calc(100% - 52px) 46px);visibility:visible;transition:clip-path .85s var(--ease)}
.d-stroom .sr-menu::before{content:"";position:absolute;right:-30%;top:-20%;width:90%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(31,91,255,.35),transparent 62%);pointer-events:none}
.d-stroom .sr-menu nav{position:relative;display:grid;gap:4px}
.d-stroom .sr-menu nav a{display:flex;align-items:center;gap:16px;min-height:64px;padding:8px 6px;border-bottom:1px solid rgba(255,255,255,.1);font-family:var(--sora);font-size:clamp(28px,7.4vw,44px);font-weight:600;letter-spacing:-.035em;opacity:0;transform:translateY(18px);transition:opacity .45s,transform .6s var(--ease),color .25s}
.d-stroom .sr-menu nav a small{flex:none;width:34px;font-family:"Inter",sans-serif;font-size:12px;font-weight:600;letter-spacing:.06em;color:var(--volt-2)}
.d-stroom .sr-menu nav a::after{content:"→";margin-left:auto;font-size:.6em;color:var(--volt-2);transition:transform .35s var(--ease)}
.d-stroom .sr-menu nav a:hover{color:var(--volt-2)}
.d-stroom .sr-menu nav a:hover::after{transform:translateX(6px)}
.d-stroom .sr-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.2s + var(--i,0) * 60ms)}
.d-stroom .sr-menu-card{position:relative;display:grid;gap:12px;padding:22px;border:1px solid rgba(255,255,255,.12);border-radius:var(--r);background:rgba(255,255,255,.05);opacity:0;transform:translateY(18px);transition:opacity .5s .45s,transform .6s var(--ease) .45s}
.d-stroom .sr-menu.is-open .sr-menu-card{opacity:1;transform:none}
.d-stroom .sr-menu-card p{display:flex;flex-wrap:wrap;align-items:center;gap:10px;color:rgba(255,255,255,.7)}
.d-stroom .sr-menu-card a:not(.btn){font-family:var(--sora);font-size:22px;font-weight:600;color:#fff}
.d-stroom .sr-menu .sr-now{background:rgba(255,255,255,.1)}
.d-stroom .sr-menu .sr-now.is-open{color:#6fe3b5}
.d-stroom .sr-menu .sr-now.is-closed{color:#ffab8f}
.d-stroom .sr-hero{position:relative;padding:clamp(40px,6vw,96px) 0 clamp(60px,7vw,110px);overflow:hidden}
.d-stroom .sr-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(rgba(10,19,36,.09) 1px,transparent 1.4px) 0 0/26px 26px;-webkit-mask-image:radial-gradient(ellipse 70% 60% at 70% 30%,#000,transparent 75%);mask-image:radial-gradient(ellipse 70% 60% at 70% 30%,#000,transparent 75%);pointer-events:none}
.d-stroom .sr-glow{position:absolute;right:-12%;top:-18%;width:min(70vw,900px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(31,91,255,.16),rgba(91,140,255,.07) 40%,transparent 68%);animation:sr-drift 22s ease-in-out infinite alternate;pointer-events:none}
.d-stroom .sr-hero-grid{position:relative;display:grid;gap:clamp(44px,5vw,72px);align-items:center}
@media (min-width:1000px){.d-stroom .sr-hero-grid{grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr)}}
.d-stroom .sr-hero-copy{display:grid;gap:26px;justify-items:start}
.d-stroom .sr-hero-top{display:flex;flex-wrap:wrap;align-items:center;gap:10px;animation:sr-up .8s var(--ease) .1s both}
.d-stroom .sr-hero h1{font-size:clamp(44px,6.4vw,96px);line-height:1;letter-spacing:-.05em}
.d-stroom .sr-hero h1.is-m{font-size:clamp(38px,5.2vw,78px)}
.d-stroom .sr-hero h1.is-s{font-size:clamp(32px,4.2vw,60px);line-height:1.04}
.d-stroom .sr-ln{position:relative;display:block;padding-bottom:.06em}
.d-stroom .sr-ln>span,.d-stroom .sr-ln em{background:linear-gradient(90deg,var(--ink) 0 50%,rgba(10,19,36,.13) 50%) 100% 0/201% 100% no-repeat;-webkit-background-clip:text;background-clip:text;color:transparent;font-style:normal;animation:sr-charge 1.1s var(--ease) forwards;animation-delay:calc(.35s + var(--i,0) * 220ms)}
.d-stroom .sr-ln em{background-image:linear-gradient(90deg,var(--volt) 0,var(--volt-2) 38%,var(--heat) 50%,rgba(31,91,255,.16) 50%)}
.d-stroom .sr-hero h1:not(.is-marked) .sr-ln:last-child>span{background-image:linear-gradient(90deg,var(--volt) 0,var(--volt-2) 40%,var(--volt) 50%,rgba(31,91,255,.16) 50%)}
.d-stroom .sr-ln::after{content:"";position:absolute;left:0;top:46%;width:10px;height:10px;border-radius:50%;background:#fff;box-shadow:0 0 0 3px rgba(31,91,255,.4),0 0 18px 6px rgba(91,140,255,.8);opacity:0;animation:sr-spark 1.1s var(--ease) forwards;animation-delay:calc(.35s + var(--i,0) * 220ms)}
.d-stroom .sr-lede{max-width:52ch;font-size:clamp(17px,1.3vw,20px);color:var(--dim);animation:sr-up .9s var(--ease) 1s both}
.d-stroom .sr-ctas{display:flex;flex-wrap:wrap;gap:12px;animation:sr-up .9s var(--ease) 1.1s both}
.d-stroom .sr-trust{display:flex;flex-wrap:wrap;gap:8px 18px;animation:sr-up .9s var(--ease) 1.2s both}
.d-stroom .sr-trust li{display:flex;align-items:center;gap:8px;font-size:14.5px;font-weight:500;color:var(--ink)}
.d-stroom .sr-trust svg{width:18px;height:18px;padding:3px;border-radius:50%;background:var(--volt-l);color:var(--volt)}
.d-stroom .sr-visual{position:relative;animation:sr-up 1s var(--ease) .3s both}
.d-stroom .sr-frame{position:relative;padding:14px}
.d-stroom .sr-frame>svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.d-stroom .sr-frame rect{x:1px;y:1px;width:calc(100% - 2px);height:calc(100% - 2px);rx:36px;fill:none;stroke-width:1.5}
.d-stroom .sr-frame .sr-base{stroke:var(--line-2)}
.d-stroom .sr-frame .sr-cur{stroke:var(--volt);stroke-width:2.5;stroke-linecap:round;stroke-dasharray:70 930;filter:drop-shadow(0 0 4px rgba(31,91,255,.7));animation:sr-orbit 9s linear infinite}
.d-stroom .sr-frame .sr-cur.is-heat{stroke:var(--heat);filter:drop-shadow(0 0 4px rgba(255,106,61,.6));animation-delay:-4.5s}
.d-stroom .sr-photo{position:relative;aspect-ratio:4/4.6;overflow:hidden;border-radius:26px;background:var(--cloud);clip-path:circle(0 at 62% 42%);animation:sr-iris 1.5s var(--ease) .45s forwards}
@media (max-width:999px){.d-stroom .sr-visual{width:min(100%,620px)}.d-stroom .sr-photo{aspect-ratio:5/4.4}}
.d-stroom .sr-photo img{width:100%;height:100%;object-fit:cover;scale:1.18;animation:sr-settle 2.4s var(--ease) .45s forwards}
.d-stroom .sr-photo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(10,19,36,.35));pointer-events:none}
.d-stroom .sr-chip{position:absolute;z-index:2;display:flex;align-items:center;gap:12px;padding:12px 16px 12px 12px;border:1px solid rgba(255,255,255,.7);border-radius:18px;background:rgba(255,255,255,.86);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 20px 40px -22px rgba(10,19,36,.45);animation:sr-pop .8s var(--spring) both}
.d-stroom .sr-chip>span:first-child{display:grid;flex:none;place-items:center;width:42px;height:42px;border-radius:12px;background:var(--volt);color:#fff}
.d-stroom .sr-chip.is-heat>span:first-child{background:var(--heat)}
.d-stroom .sr-chip svg{width:20px;height:20px}
.d-stroom .sr-chip p{display:grid;gap:1px;font-size:12.5px;line-height:1.3;color:var(--dim)}
.d-stroom .sr-chip b{font-family:var(--sora);font-size:16px;font-weight:600;color:var(--ink)}
.d-stroom .sr-chip.is-a{left:-10px;bottom:46px;animation-delay:1.25s}
.d-stroom .sr-chip.is-b{right:-6px;top:40px;animation-delay:1.45s}
@media (min-width:1000px){.d-stroom .sr-chip.is-a{left:-44px}.d-stroom .sr-chip.is-b{right:-26px}}
.d-stroom .sr-panel{position:relative;padding:22px;border:1px solid var(--line);border-radius:30px;background:linear-gradient(160deg,var(--white),var(--cloud));box-shadow:0 40px 80px -50px rgba(10,19,36,.45)}
.d-stroom .sr-panel>header{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding:4px 6px 16px;border-bottom:1px solid var(--line)}
.d-stroom .sr-panel>header b{font-family:var(--sora);font-size:15px;font-weight:600;color:var(--ink)}
.d-stroom .sr-panel ul{display:grid;gap:8px;margin-top:14px}
.d-stroom .sr-panel li{display:flex;align-items:center;gap:14px;padding:14px;border-radius:16px;background:var(--white);border:1px solid var(--line);font-family:var(--sora);font-size:16px;font-weight:600;color:var(--ink);animation:sr-up .7s var(--ease) both;animation-delay:calc(.6s + var(--i,0) * 110ms)}
.d-stroom .sr-panel li>span{display:grid;flex:none;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--volt-l);color:var(--volt)}
.d-stroom .sr-panel li svg{width:19px;height:19px}
.d-stroom .sr-switch{position:relative;flex:none;width:46px;height:26px;margin-left:auto;border-radius:999px;background:var(--cloud-2);animation:sr-on .4s var(--ease) forwards;animation-delay:calc(1.2s + var(--i,0) * 160ms)}
.d-stroom .sr-switch::after{content:"";position:absolute;left:3px;top:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(10,19,36,.25);animation:sr-knob .4s var(--spring) forwards;animation-delay:calc(1.2s + var(--i,0) * 160ms)}
.d-stroom .sr-facts{position:relative;display:grid;gap:10px;margin-top:clamp(44px,5vw,72px)}
@media (min-width:760px){.d-stroom .sr-facts{grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}}
.d-stroom .sr-facts div{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1px solid var(--line);border-radius:18px;background:var(--white);animation:sr-up .8s var(--ease) both;animation-delay:calc(1.3s + var(--i,0) * 100ms);transition:border-color .3s,transform .4s var(--ease)}
.d-stroom .sr-facts div:hover{border-color:rgba(31,91,255,.4);transform:translateY(-3px)}
.d-stroom .sr-facts span{display:grid;flex:none;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--cloud);color:var(--volt)}
.d-stroom .sr-facts svg{width:18px;height:18px}
.d-stroom .sr-facts dl{display:grid;gap:1px;min-width:0}
.d-stroom .sr-facts dt{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--dim)}
.d-stroom .sr-facts dd{margin:0;font-weight:600;color:var(--ink)}
.d-stroom .sr-sec{position:relative;padding-block:clamp(84px,10vw,150px)}
.d-stroom .sr-sec.is-cloud{background:var(--cloud)}
.d-stroom .sr-sec.is-ink{background:var(--ink);color:rgba(255,255,255,.72);overflow:hidden}
.d-stroom .is-ink h2,.d-stroom .is-ink h3{color:#fff}
.d-stroom .is-ink .sr-kick{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14);color:#fff}
.d-stroom .sr-head{display:grid;gap:18px;justify-items:start;max-width:760px;margin-bottom:clamp(40px,5vw,72px)}
.d-stroom .sr-head>p:not(.sr-kick){max-width:58ch;font-size:clamp(16.5px,1.15vw,18.5px);color:var(--dim)}
.d-stroom .is-ink .sr-head>p:not(.sr-kick){color:rgba(255,255,255,.66)}
.d-stroom .sr-head.is-row{max-width:none}
@media (min-width:980px){.d-stroom .sr-head.is-row{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:end;column-gap:64px}.d-stroom .sr-head.is-row .sr-kick{grid-column:1/-1}.d-stroom .sr-head.is-row>p:not(.sr-kick){justify-self:end}}
.d-stroom .sr-head.is-center{justify-items:center;margin-inline:auto;text-align:center}
.demo-js .d-stroom .sr-head h2[data-rv]{transform:translateY(18px);filter:none;transition:opacity .9s var(--ease),transform 1s var(--ease)}
.d-stroom .sr-cards{display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))}
.d-stroom .sr-card{position:relative;display:grid;gap:14px;align-content:start;height:100%;padding:clamp(22px,2.2vw,30px);border:1px solid var(--line);border-radius:var(--r);background:var(--white);overflow:hidden;isolation:isolate;transition:transform .5s var(--ease),box-shadow .5s var(--ease),border-color .4s}
.d-stroom .sr-card::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(340px circle at var(--mx,50%) var(--my,0%),rgba(31,91,255,.1),transparent 60%);opacity:0;transition:opacity .4s}
.d-stroom .sr-card:hover{transform:translateY(-6px);border-color:rgba(31,91,255,.35);box-shadow:0 30px 60px -36px rgba(31,91,255,.55)}
.d-stroom .sr-card:hover::before{opacity:1}
.d-stroom .sr-ico{position:relative;display:grid;place-items:center;width:58px;height:58px;border-radius:18px;background:var(--volt-l);color:var(--volt);transition:background-color .4s,color .4s}
.d-stroom .sr-ico.is-heat{background:var(--heat-l);color:var(--heat)}
.d-stroom .sr-ico svg{width:26px;height:26px}
.d-stroom .sr-ico svg *{stroke-dasharray:60;stroke-dashoffset:0}
.d-stroom .sr-card:hover .sr-ico{background:var(--volt);color:#fff}
.d-stroom .sr-card:hover .sr-ico.is-heat{background:var(--heat)}
.d-stroom .sr-card:hover .sr-ico svg *{animation:sr-redraw 1s var(--ease)}
.d-stroom .sr-ico::after{content:"";position:absolute;inset:-6px;border:1.5px solid currentColor;border-radius:22px;opacity:0;transform:scale(.8);transition:opacity .4s,transform .5s var(--ease)}
.d-stroom .sr-card:hover .sr-ico::after{opacity:.3;transform:none;border-color:var(--volt)}
.d-stroom .sr-card p{color:var(--dim)}
.d-stroom .sr-card .sr-more{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:6px;padding-top:16px;border-top:1px solid var(--line);font-size:14px;font-weight:600;color:var(--ink)}
.d-stroom .sr-card .sr-more i{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--cloud);color:var(--ink);font-style:normal;transition:background-color .3s,color .3s,transform .5s var(--ease)}
.d-stroom .sr-card:hover .sr-more i{background:var(--volt);color:#fff;transform:rotate(-45deg)}
.d-stroom .sr-card .sr-tags{display:flex;flex-wrap:wrap;gap:6px}
.d-stroom .sr-card .sr-tags span{padding:4px 10px;border-radius:999px;background:var(--cloud);font-size:13px;font-weight:600;color:var(--ink)}
.d-stroom .sr-card .z-pic{aspect-ratio:16/10;margin:-8px -8px 4px;border-radius:16px}
.d-stroom .sr-card .z-pic img{transition:transform 1s var(--ease)}
.d-stroom .sr-card:hover .z-pic img{transform:scale(1.06)}
.d-stroom .sr-card.has-pic .sr-ico{position:absolute;left:calc(clamp(22px,2.2vw,30px) + 12px);top:calc(clamp(22px,2.2vw,30px) + 12px);width:48px;height:48px;border-radius:14px;background:rgba(255,255,255,.92);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.d-stroom .sr-card.has-pic .sr-ico svg{width:22px;height:22px}
.d-stroom .sr-about{display:grid;gap:clamp(44px,6vw,100px);align-items:center}
@media (min-width:980px){.d-stroom .sr-about{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)}.d-stroom .sr-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:980px}}
.d-stroom .sr-about-pic{position:relative}
.d-stroom .sr-about-pic figure{position:relative;aspect-ratio:5/6;overflow:hidden;border-radius:30px;background:var(--cloud)}
.d-stroom .sr-about-pic img{width:100%;height:112%;object-fit:cover;transform:translateY(calc(var(--p,0) * -5%))}
.d-stroom .sr-about-pic::before{content:"";position:absolute;left:-18px;bottom:-18px;width:46%;height:46%;border-radius:30px;background:linear-gradient(135deg,var(--volt),var(--volt-2));z-index:-1}
.d-stroom .sr-about-pic .sr-chip{position:absolute;right:-8px;bottom:28px;left:auto;top:auto;animation:none}
@media (min-width:980px){.d-stroom .sr-about-pic .sr-chip{right:-30px}}
.d-stroom .sr-about-copy{display:grid;gap:20px}
.d-stroom .sr-about-copy .sr-head{margin-bottom:8px}
.d-stroom .sr-about-copy>p{max-width:58ch;color:var(--dim)}
.d-stroom .sr-about-copy>.sr-lead{font-size:clamp(19px,1.5vw,23px);line-height:1.5;color:var(--ink)}
.d-stroom .sr-checks{display:grid;gap:10px;margin-top:6px}
@media (min-width:620px){.d-stroom .sr-checks{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-stroom .sr-checks li{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--line);border-radius:16px;background:var(--white);font-weight:600;color:var(--ink);transition:border-color .3s,transform .4s var(--ease)}
.d-stroom .sr-checks li:hover{border-color:rgba(31,91,255,.4);transform:translateX(4px)}
.d-stroom .sr-checks svg{flex:none;width:24px;height:24px;padding:4px;border-radius:50%;background:var(--volt);color:#fff}
.d-stroom .sr-checks svg path{stroke-dasharray:24;stroke-dashoffset:24;transition:stroke-dashoffset .6s var(--ease);transition-delay:calc(.25s + var(--i,0) * 120ms)}
.d-stroom .sr-checks.in svg path,html:not(.demo-js) .d-stroom .sr-checks svg path{stroke-dashoffset:0}
.d-stroom .sr-flow{position:relative;--fp:0}
.d-stroom .sr-flow-rail{display:none}
@media (min-width:980px){.d-stroom .sr-flow-rail{position:relative;display:block;height:110px;margin-bottom:8px}.d-stroom .sr-flow-rail svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}}
.d-stroom .sr-flow-rail path{fill:none;stroke-width:3;stroke-linecap:round}
.d-stroom .sr-flow-rail .sr-p0{stroke:var(--line-2);stroke-dasharray:2 7}
.d-stroom .sr-flow-rail .sr-p1{stroke-dasharray:1;stroke-dashoffset:calc(1 - var(--fp));transition:stroke-dashoffset .15s linear}
.d-stroom .sr-flow-rail .sr-p2{stroke:#fff;stroke-width:3;stroke-dasharray:.012 .05;opacity:.75;animation:sr-current 3s linear infinite}
.d-stroom .sr-node{position:absolute;top:50%;left:calc((var(--k) + .5) / var(--n) * 100%);display:grid;place-items:center;width:58px;height:58px;border:2px solid var(--cloud-2);border-radius:50%;background:var(--white);font-family:var(--sora);font-size:17px;font-weight:700;color:var(--dim);transform:translate(-50%,-50%);transition:background-color .4s,border-color .4s,color .4s,box-shadow .5s var(--ease),transform .5s var(--spring)}
.d-stroom .sr-node.is-on{border-color:var(--volt);background:var(--volt);color:#fff;box-shadow:0 0 0 8px rgba(31,91,255,.12),0 10px 24px -8px rgba(31,91,255,.7);transform:translate(-50%,-50%) scale(1.06)}
.d-stroom .sr-steps{position:relative;display:grid;gap:14px}
@media (min-width:980px){.d-stroom .sr-steps{grid-template-columns:repeat(var(--n,4),minmax(0,1fr))}}
.d-stroom .sr-steps>li{position:relative;display:grid;gap:10px;align-content:start;padding:24px;border:1px solid var(--line);border-radius:var(--r);background:var(--white);transition:border-color .5s,box-shadow .5s var(--ease)}
.d-stroom .sr-steps>li.is-on{border-color:rgba(31,91,255,.35);box-shadow:0 24px 50px -36px rgba(31,91,255,.6)}
.d-stroom .sr-steps>li>b{font-family:var(--sora);font-size:13px;font-weight:600;letter-spacing:.04em;color:var(--volt)}
.d-stroom .sr-steps p{color:var(--dim)}
@media (max-width:979px){.d-stroom .sr-steps{padding-left:44px}.d-stroom .sr-steps::before,.d-stroom .sr-steps::after{content:"";position:absolute;left:14px;top:20px;bottom:20px;width:3px;border-radius:3px;background:var(--cloud-2)}.d-stroom .sr-steps::after{background:linear-gradient(180deg,var(--volt),var(--volt-2),var(--heat));transform:scaleY(var(--fp));transform-origin:top;transition:transform .15s linear}.d-stroom .sr-steps>li::before{content:"";position:absolute;left:-39px;top:28px;width:15px;height:15px;border:3px solid var(--cloud-2);border-radius:50%;background:var(--white);transition:border-color .4s,background-color .4s,box-shadow .4s}.d-stroom .sr-steps>li.is-on::before{border-color:var(--volt);background:var(--volt);box-shadow:0 0 0 5px rgba(31,91,255,.15)}}
.d-stroom .sr-bento{display:grid;gap:16px}
@media (min-width:760px){.d-stroom .sr-bento{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1080px){.d-stroom .sr-bento{grid-template-columns:repeat(var(--cols,3),minmax(0,1fr))}.d-stroom .sr-bento.is-five>li:first-child{grid-row:span 2}}
@media (min-width:760px) and (max-width:1079px){.d-stroom .sr-bento.is-odd>li:first-child{grid-column:1/-1}}
.d-stroom .sr-bento>li{position:relative;display:grid;gap:14px;align-content:start;padding:clamp(24px,2.4vw,34px);border:1px solid var(--line);border-radius:var(--r);background:var(--white);overflow:hidden;isolation:isolate;transition:transform .5s var(--ease),border-color .4s}
.d-stroom .sr-bento>li:hover{transform:translateY(-4px);border-color:rgba(31,91,255,.35)}
.d-stroom .sr-bento>li::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(300px circle at var(--mx,50%) var(--my,0%),rgba(31,91,255,.09),transparent 60%);opacity:0;transition:opacity .4s}
.d-stroom .sr-bento>li:hover::before{opacity:1}
.d-stroom .sr-bento>li:first-child{align-content:end;min-height:280px;background:linear-gradient(160deg,var(--ink-3),var(--ink));border-color:transparent;color:rgba(255,255,255,.72)}
.d-stroom .sr-bento>li:first-child h3{color:#fff;font-size:clamp(24px,2.2vw,32px)}
.d-stroom .sr-bento>li:first-child .sr-ico{background:var(--volt);color:#fff}
.d-stroom .sr-bento>li:first-child::after{content:"";position:absolute;right:-30%;top:-30%;width:80%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(31,91,255,.45),transparent 65%);z-index:-1}
.d-stroom .sr-bento p{color:var(--dim)}
.d-stroom .sr-bento>li:first-child p{color:rgba(255,255,255,.7)}
.d-stroom .sr-area{display:grid;gap:clamp(40px,5vw,80px);align-items:center}
@media (min-width:1000px){.d-stroom .sr-area{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-stroom .sr-area-list{display:grid;gap:8px}
.d-stroom .sr-area-list li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:2px 14px;align-items:center;padding:14px 16px;border:1px solid var(--line);border-radius:18px;background:var(--white);cursor:default;transition:border-color .3s,background-color .3s,transform .4s var(--ease)}
.d-stroom .sr-area-list li:hover,.d-stroom .sr-area-list li.is-hot{border-color:rgba(31,91,255,.45);background:var(--volt-l);transform:translateX(6px)}
.d-stroom .sr-area-list li>span{grid-row:span 2;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--cloud);font-family:var(--sora);font-size:13px;font-weight:700;color:var(--volt);transition:background-color .3s,color .3s}
.d-stroom .sr-area-list li:hover>span,.d-stroom .sr-area-list li.is-hot>span{background:var(--volt);color:#fff}
.d-stroom .sr-area-list b{font-family:var(--sora);font-weight:600;color:var(--ink)}
.d-stroom .sr-area-list p{font-size:14.5px;color:var(--dim)}
.d-stroom .sr-map{position:relative;width:min(100%,560px);aspect-ratio:1;margin-inline:auto;container-type:inline-size}
.d-stroom .sr-map>svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.d-stroom .sr-map circle:not(.sr-ring-fill){fill:none;stroke:var(--line-2);stroke-width:1}
.d-stroom .sr-map .sr-ring-dash{stroke:var(--volt);stroke-opacity:.45;stroke-dasharray:4 10;transform-origin:50% 50%;animation:sr-turn 60s linear infinite}
.d-stroom .sr-map .sr-ring-fill{stroke:none}
.d-stroom .sr-center{position:absolute;left:50%;top:50%;display:grid;justify-items:center;gap:4px;padding:14px 18px;border-radius:18px;background:var(--ink);color:#fff;font-family:var(--sora);font-weight:600;text-align:center;transform:translate(-50%,-50%);box-shadow:0 0 0 10px rgba(31,91,255,.12),0 20px 40px -16px rgba(10,19,36,.6)}
.d-stroom .sr-center svg{width:20px;height:20px;color:var(--volt-2)}
.d-stroom .sr-pin{position:absolute;left:50%;top:50%;display:grid;justify-items:center;gap:6px;transform:translate(-50%,-50%) rotate(var(--a)) translateY(calc(var(--r) * -1)) rotate(calc(var(--a) * -1));transition:filter .3s}
.d-stroom .sr-pin i{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--white);border:2px solid var(--volt);font-family:var(--sora);font-size:12px;font-style:normal;font-weight:700;color:var(--volt);box-shadow:0 8px 18px -8px rgba(31,91,255,.6);transition:background-color .3s,color .3s,transform .4s var(--spring)}
.d-stroom .sr-pin b{padding:3px 9px;border-radius:999px;background:var(--white);border:1px solid var(--line);font-size:12.5px;font-weight:600;color:var(--ink);white-space:nowrap}
.d-stroom .sr-pin.is-hot i{background:var(--volt);color:#fff;transform:scale(1.2)}
@media (max-width:560px){.d-stroom .sr-pin b{display:none}}
.d-stroom .sr-oncall{position:relative;overflow:hidden;border-radius:clamp(26px,3vw,40px);background:radial-gradient(ellipse at 85% 0%,rgba(31,91,255,.4),transparent 55%),linear-gradient(160deg,var(--ink-3),var(--ink));color:rgba(255,255,255,.72)}
.d-stroom .sr-oncall-in{position:relative;z-index:1;display:grid;gap:clamp(32px,4vw,64px);padding:clamp(28px,5vw,72px)}
@media (min-width:980px){.d-stroom .sr-oncall-in{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:center}}
.d-stroom .sr-oncall h2{color:#fff}
.d-stroom .sr-oncall .sr-head{margin-bottom:6px}
.d-stroom .sr-oncall .sr-head>p:not(.sr-kick){color:rgba(255,255,255,.7)}
.d-stroom .sr-oncall .sr-kick{background:rgba(255,106,61,.14);border-color:rgba(255,106,61,.3);color:#fff}
.d-stroom .sr-oncall .sr-kick::before{background-color:var(--heat)}
.d-stroom .sr-oncall-copy{display:grid;gap:22px;justify-items:start}
.d-stroom .sr-oncall .z-reach{color:rgba(255,255,255,.7)}
.d-stroom .sr-oncall .z-reach a{color:#fff;font-family:var(--sora);font-size:clamp(22px,2vw,28px);font-weight:600}
.d-stroom .sr-oncall .z-reach .z-route{font-size:16px;color:var(--volt-2)}
.d-stroom .sr-oncall .sr-line{background:transparent;border-color:rgba(255,255,255,.3);color:#fff}
.d-stroom .sr-oncall .sr-line>i{background:rgba(255,255,255,.1)}
.d-stroom .sr-glass{padding:clamp(20px,2.4vw,30px);border:1px solid rgba(255,255,255,.12);border-radius:var(--r);background:rgba(255,255,255,.05);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.d-stroom .sr-glass>header{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}
.d-stroom .sr-glass>header p{font-family:var(--sora);font-size:18px;font-weight:600;color:#fff}
.d-stroom .sr-glass .sr-now{background:rgba(255,255,255,.1)}
.d-stroom .sr-glass .sr-now.is-open{color:#6fe3b5}
.d-stroom .sr-glass .sr-now.is-closed{color:#ffab8f}
.d-stroom .sr-glass .z-hours,.d-stroom .sr-glass .z-hours div{border-color:rgba(255,255,255,.1)}
.d-stroom .sr-glass .z-hours{border-top:0}
.d-stroom .sr-glass .z-hours dt{color:rgba(255,255,255,.75)}
.d-stroom .sr-glass .z-hours dd{color:#fff}
.d-stroom .sr-glass .z-note{color:rgba(255,255,255,.7)}
.d-stroom .sr-wave{position:absolute;left:0;right:0;bottom:0;height:120px;overflow:hidden;opacity:.55;pointer-events:none}
.d-stroom .sr-wave svg{width:200%;height:100%;animation:sr-wave 16s linear infinite}
.d-stroom .sr-wave path{fill:none;stroke:var(--volt-2);stroke-width:1.5;vector-effect:non-scaling-stroke}
.d-stroom .sr-wave path+path{stroke:var(--heat);stroke-opacity:.6}
.d-stroom .z-hours div{align-items:center;padding:14px 12px;margin-inline:-12px;border-radius:12px;transition:background-color .3s}
.d-stroom .z-hours dt{font-weight:500}
.d-stroom .z-hours dd{font-weight:600;color:var(--ink);font-variant-numeric:tabular-nums}
.d-stroom .z-hours div.is-today{background:var(--volt);border-color:transparent;color:#fff;box-shadow:0 12px 26px -14px rgba(31,91,255,.9)}
.d-stroom .z-hours div.is-today dt,.d-stroom .z-hours div.is-today dd{color:#fff}
.d-stroom .z-hours div.is-today dt::after{content:"";display:inline-block;width:7px;height:7px;margin-left:10px;border-radius:50%;background:#fff;vertical-align:middle}
.d-stroom .sr-rates{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))}
.d-stroom .sr-rate{position:relative;display:grid;gap:16px;align-content:start;padding:clamp(24px,2.4vw,32px);border:1px solid var(--line);border-radius:var(--r);background:var(--white);transition:transform .5s var(--ease),box-shadow .5s var(--ease),border-color .4s}
.d-stroom .sr-rate:hover{transform:translateY(-6px);border-color:rgba(31,91,255,.35);box-shadow:0 30px 60px -36px rgba(31,91,255,.5)}
.d-stroom .sr-rate h3{font-size:18px}
.d-stroom .sr-rate .sr-price{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px;padding-bottom:16px;border-bottom:1px dashed var(--line-2)}
.d-stroom .sr-rate .sr-price b{white-space:nowrap;font-family:var(--sora);font-size:clamp(30px,2.6vw,40px);font-weight:600;letter-spacing:-.04em;color:var(--ink)}
.d-stroom .sr-rate .sr-price.is-long b{font-size:clamp(24px,1.9vw,30px)}
.d-stroom .sr-rate .sr-price span{font-size:14px;color:var(--dim)}
.d-stroom .sr-rate>p{color:var(--dim)}
.d-stroom .sr-rate ul{display:grid;gap:10px}
.d-stroom .sr-rate li{display:flex;gap:10px;align-items:flex-start;font-size:15px}
.d-stroom .sr-rate li svg{flex:none;width:18px;height:18px;margin-top:3px;padding:3px;border-radius:50%;background:var(--volt-l);color:var(--volt)}
.d-stroom .sr-rate.is-featured{background:linear-gradient(165deg,var(--ink-3),var(--ink));border-color:transparent;color:rgba(255,255,255,.72);box-shadow:0 30px 60px -30px rgba(10,19,36,.6)}
.d-stroom .sr-rate.is-featured h3,.d-stroom .sr-rate.is-featured .sr-price b{color:#fff}
.d-stroom .sr-rate.is-featured .sr-price{border-color:rgba(255,255,255,.2)}
.d-stroom .sr-rate.is-featured .sr-price span,.d-stroom .sr-rate.is-featured>p{color:rgba(255,255,255,.66)}
.d-stroom .sr-rate.is-featured li svg{background:var(--volt);color:#fff}
.d-stroom .sr-rate small{justify-self:start;padding:4px 10px;border-radius:999px;background:var(--volt);font-size:12px;font-weight:600;color:#fff}
.d-stroom .sr-callout{display:flex;align-items:flex-start;gap:12px;margin-top:22px;padding:16px 18px;border-radius:16px;background:var(--heat-l);color:var(--ink);font-size:14.5px}
.d-stroom .sr-callout svg{flex:none;width:20px;height:20px;margin-top:1px;color:var(--heat)}
.d-stroom .sr-gal{display:grid;gap:14px;grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:900px){.d-stroom .sr-gal{grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:clamp(180px,17vw,250px)}.d-stroom .sr-gal>figure:nth-child(6n+1){grid-column:span 2;grid-row:span 2}.d-stroom .sr-gal>figure:nth-child(6n+4),.d-stroom .sr-gal>figure:nth-child(6n+5),.d-stroom .sr-gal>figure:nth-child(6n){grid-column:span 2}.d-stroom .sr-gal{grid-auto-flow:dense}}
.d-stroom .sr-gal>figure{position:relative;aspect-ratio:1;overflow:hidden;border-radius:20px;background:var(--cloud);transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .5s var(--ease),box-shadow .5s var(--ease)}
@media (min-width:900px){.d-stroom .sr-gal>figure{aspect-ratio:auto}}
.d-stroom .sr-gal>figure:hover{box-shadow:0 30px 60px -30px rgba(10,19,36,.5)}
.d-stroom .sr-gal img{width:100%;height:100%;object-fit:cover;transition:transform 1s var(--ease)}
.d-stroom .sr-gal>figure:hover img{transform:scale(1.05)}
.d-stroom .sr-gal figcaption{position:absolute;left:10px;right:10px;bottom:10px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);font-size:13px;line-height:1.35;color:var(--ink);opacity:0;transform:translateY(10px);transition:opacity .35s,transform .45s var(--ease)}
.d-stroom .sr-gal>figure:hover figcaption{opacity:1;transform:none}
.d-stroom .sr-split{display:grid;gap:clamp(36px,5vw,80px);align-items:start}
@media (min-width:980px){.d-stroom .sr-split{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-stroom .sr-split-copy{display:grid;gap:22px;align-content:start}
.d-stroom .sr-split-copy .sr-head{margin-bottom:6px}
.d-stroom .sr-split-copy>p{max-width:54ch;color:var(--dim)}
.d-stroom .sr-steps-mini{display:grid;gap:10px}
.d-stroom .sr-steps-mini li{display:flex;align-items:center;gap:12px;font-weight:500;color:var(--ink)}
.d-stroom .sr-steps-mini li span{display:grid;flex:none;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--volt-l);font-family:var(--sora);font-size:13px;font-weight:700;color:var(--volt)}
.d-stroom .sr-formcard{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:30px;background:var(--white);box-shadow:0 40px 80px -50px rgba(10,19,36,.45)}
.d-stroom .sr-formcard>header{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 16px;padding:22px clamp(22px,3vw,34px);background:linear-gradient(120deg,var(--volt),var(--volt-d));color:#fff;overflow:hidden}
.d-stroom .sr-formcard>header::after{content:"";position:absolute;right:-40px;top:-60px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.25),transparent 65%)}
.d-stroom .sr-formcard>header p{position:relative;display:flex;align-items:center;gap:10px;font-family:var(--sora);font-size:19px;font-weight:600}
.d-stroom .sr-formcard>header p svg{width:20px;height:20px}
.d-stroom .sr-formcard>header a{position:relative;display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 14px;border-radius:999px;background:rgba(255,255,255,.16);font-weight:600}
.d-stroom .sr-formcard>header a svg{width:15px;height:15px}
.d-stroom .sr-formcard .z-form{padding:clamp(22px,3vw,34px)}
.d-stroom .z-field label{font-size:12.5px;font-weight:600;letter-spacing:.02em;text-transform:none;color:var(--ink)}
.d-stroom .z-field input,.d-stroom .z-field select,.d-stroom .z-field textarea{border:1.5px solid var(--cloud-2);background:var(--cloud);transition:border-color .25s,background-color .25s,box-shadow .25s}
.d-stroom .z-field select{background-image:linear-gradient(45deg,transparent 50%,var(--ink) 50%),linear-gradient(-45deg,transparent 50%,var(--ink) 50%);background-position:calc(100% - 22px) 52%,calc(100% - 16px) 52%;background-size:6px 6px;background-repeat:no-repeat}
.d-stroom .z-field input:hover,.d-stroom .z-field select:hover,.d-stroom .z-field textarea:hover{border-color:var(--line-2)}
.d-stroom .z-field input:focus,.d-stroom .z-field select:focus,.d-stroom .z-field textarea:focus{border-color:var(--volt);background-color:#fff;box-shadow:0 0 0 4px rgba(31,91,255,.14)}
.d-stroom .z-field :focus-visible{outline:none}
.d-stroom .form-status{border:0;border-radius:12px;background:#e3f7ef;color:#0b5e42;font-weight:500}
.d-stroom .z-chips button{border-radius:12px}
.d-stroom .sr-reach{display:grid;gap:10px}
.d-stroom .sr-reach a,.d-stroom .sr-reach span{display:flex;align-items:center;gap:12px;min-height:56px;padding:10px 16px;border:1px solid var(--line);border-radius:16px;background:var(--white);font-weight:600;color:var(--ink);transition:border-color .3s,transform .4s var(--ease)}
.d-stroom .sr-reach a:hover{border-color:rgba(31,91,255,.45);transform:translateX(4px)}
.d-stroom .sr-reach svg{flex:none;width:18px;height:18px;color:var(--volt)}
.d-stroom .sr-state{position:relative;overflow:hidden}
.d-stroom .sr-state .sr-wrap{display:grid;gap:22px;justify-items:center;text-align:center}
.d-stroom .sr-state h2{max-width:26ch;font-size:var(--z-statement);line-height:1.14;background:linear-gradient(100deg,var(--ink) 0 calc(var(--sp,0) * 100% - 10%),var(--volt) calc(var(--sp,0) * 100%),rgba(10,19,36,.22) calc(var(--sp,0) * 100% + 12%));-webkit-background-clip:text;background-clip:text;color:transparent}
.d-stroom .sr-state h2 em{color:transparent;background:none;-webkit-background-clip:initial}
.d-stroom .sr-state p{color:var(--dim)}
.d-stroom .sr-state .sr-kick{justify-self:center}
.d-stroom .z-acc{display:grid;gap:10px;border:0}
.d-stroom .z-acc details{border:1px solid var(--line);border-radius:18px;background:var(--white);transition:border-color .3s,box-shadow .4s var(--ease)}
.d-stroom .z-acc details[open]{border-color:rgba(31,91,255,.35);box-shadow:0 20px 40px -30px rgba(31,91,255,.5)}
.d-stroom .z-acc summary{padding:20px 22px;font-family:var(--sora);font-size:clamp(16.5px,1.25vw,19px);font-weight:600;letter-spacing:-.015em}
.d-stroom .z-acc summary i{width:34px;height:34px;border-radius:50%;background:var(--cloud);color:var(--ink);transition:background-color .3s,color .3s,transform .5s var(--ease)}
.d-stroom .z-acc summary i::before,.d-stroom .z-acc summary i::after{left:10px;width:14px;height:2px;margin-top:-1px;border-radius:2px}
.d-stroom .z-acc summary:hover i{background:var(--volt-l);color:var(--volt)}
.d-stroom .z-acc details[open] summary i{background:var(--volt);color:#fff;transform:rotate(180deg)}
.d-stroom .z-acc details>p{padding:0 22px 22px}
.d-stroom .z-sec.z-faq{background:var(--cloud)}
.d-stroom .z-head .sr-head,.d-stroom .z-head{margin-bottom:clamp(32px,4vw,56px)}
.d-stroom .z-sec.z-cta{margin-inline:max(var(--pad),calc((100% - 1320px) / 2 + var(--pad)));padding-inline:var(--pad);border-radius:clamp(26px,3vw,40px);background:radial-gradient(ellipse at 20% 0%,rgba(255,255,255,.22),transparent 50%),radial-gradient(ellipse at 100% 100%,rgba(255,106,61,.45),transparent 50%),linear-gradient(135deg,var(--volt),var(--volt-d));color:#fff;overflow:hidden}
.d-stroom .z-cta h2{color:#fff;font-size:clamp(34px,4.6vw,66px)}
.d-stroom .z-cta h2 em{background:none;color:#ffd5c7}
.d-stroom .z-cta .z-center>p{color:rgba(255,255,255,.85)}
.d-stroom .z-cta .sr-fill{background:#fff;color:var(--volt-d);box-shadow:0 18px 40px -18px rgba(0,0,0,.45)}
.d-stroom .z-cta .sr-fill::after{background:linear-gradient(100deg,transparent,rgba(31,91,255,.18),transparent)}
.d-stroom .z-statement{background:var(--cloud)}
.d-stroom .z-showcase{margin-inline:max(var(--pad),calc((100% - 1320px) / 2 + var(--pad)));border-radius:clamp(26px,3vw,40px)}
.d-stroom .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(10,19,36,.05),rgba(10,19,36,.78))}
.d-stroom .z-showcase h2{color:#fff}
.d-stroom .z-showcase h2 em{background:none;color:#a9c2ff}
.d-stroom .z-showcase .sr-line{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.4);color:#fff;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.d-stroom .z-showcase:not(.has-pic){background:var(--ink);color:#fff}
.d-stroom .z-showcase:not(.has-pic) h2{color:#fff}
.d-stroom .z-card{border-color:var(--line);background:var(--white);transition:transform .5s var(--ease),box-shadow .5s var(--ease),border-color .4s}
.d-stroom .z-card:hover{transform:translateY(-6px);border-color:rgba(31,91,255,.35);box-shadow:0 30px 60px -36px rgba(31,91,255,.5)}
.d-stroom .z-pack.is-featured{background:linear-gradient(165deg,var(--ink-3),var(--ink));color:rgba(255,255,255,.72)}
.d-stroom .z-pack.is-featured h3,.d-stroom .z-pack.is-featured .z-pack-price b{color:#fff}
.d-stroom .z-ico{background:var(--volt-l);border:0;color:var(--volt)}
.d-stroom .z-grid>li{padding:24px;border:1px solid var(--line);border-radius:var(--r);background:var(--white)}
.d-stroom .z-team .z-grid>li{padding:14px 14px 22px}
.d-stroom .z-team .z-pic{border-radius:16px}
.d-stroom .z-quotes blockquote{padding:26px;border:1px solid var(--line);border-radius:var(--r);background:var(--white)}
.d-stroom .z-quotes blockquote>p{font-size:clamp(17px,1.4vw,20px);font-weight:500;letter-spacing:-.01em}
.d-stroom .z-ba{border-radius:var(--r)}
.d-stroom .z-ba::after{width:3px;background:var(--volt)}
.d-stroom .z-ba figcaption{border-radius:10px}
.d-stroom .z-channel{border-color:var(--line);background:var(--white);transition:border-color .3s,transform .5s var(--ease)}
.d-stroom .z-channel:hover{transform:translateY(-4px)}
.d-stroom .z-gal .z-pic{border-radius:20px}
.d-stroom .z-panel{border-color:var(--line);border-radius:30px;background:var(--white)}
.d-stroom .z-tag{color:var(--volt)}
.d-stroom .sr-menu-list{display:grid;gap:16px}
@media (min-width:900px){.d-stroom .sr-menu-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-stroom .sr-menu-cat{padding:clamp(22px,2.4vw,30px);border:1px solid var(--line);border-radius:var(--r);background:var(--white)}
.d-stroom .sr-menu-cat h3{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.d-stroom .sr-menu-cat h3::before{content:"";width:10px;height:10px;border-radius:50%;background:var(--volt);box-shadow:0 0 0 4px var(--volt-l)}
.d-stroom .sr-menu-cat li{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-top:1px solid var(--line)}
.d-stroom .sr-menu-cat li:first-child{border-top:0}
.d-stroom .sr-menu-cat b{font-weight:600;color:var(--ink)}
.d-stroom .sr-menu-cat p{font-size:.92em;color:var(--dim)}
.d-stroom .sr-menu-cat .z-price{font-family:var(--sora);font-weight:600;color:var(--volt)}
.d-stroom .sr-foot{position:relative;margin-top:clamp(40px,6vw,80px);background:var(--ink);color:rgba(255,255,255,.66);overflow:hidden}
.d-stroom .sr-foot::before{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,transparent,var(--volt-2),var(--heat),transparent) 0 0/50% 100% no-repeat;animation:sr-scan 7s linear infinite}
.d-stroom .sr-foot-cta{display:grid;gap:26px;padding-block:clamp(60px,8vw,110px);border-bottom:1px solid rgba(255,255,255,.1)}
@media (min-width:900px){.d-stroom .sr-foot-cta{grid-template-columns:minmax(0,1fr) auto;align-items:end}}
.d-stroom .sr-foot-cta h2{max-width:16ch;color:#fff;font-size:clamp(36px,5vw,72px)}
.d-stroom .sr-foot-cta .sr-ctas{animation:none}
.d-stroom .sr-foot-cta .sr-line{background:transparent;border-color:rgba(255,255,255,.25);color:#fff}
.d-stroom .sr-foot-cta .sr-line>i{background:rgba(255,255,255,.1)}
.d-stroom .sr-foot-grid{display:grid;gap:36px 24px;padding-block:clamp(48px,6vw,80px);grid-template-columns:repeat(2,minmax(0,1fr))}
.d-stroom .sr-foot-grid>div:first-child,.d-stroom .sr-foot-grid>div:last-child{grid-column:1/-1}
@media (min-width:900px){.d-stroom .sr-foot-grid{grid-template-columns:minmax(0,1.3fr) repeat(3,minmax(0,1fr))}.d-stroom .sr-foot-grid>div:first-child,.d-stroom .sr-foot-grid>div:last-child{grid-column:auto}}
.d-stroom .sr-foot-grid h3{margin-bottom:14px;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.45)}
.d-stroom .sr-foot-grid>div{display:grid;gap:6px;align-content:start}
.d-stroom .sr-foot-grid a,.d-stroom .sr-foot-grid span{display:flex;align-items:center;min-height:32px;color:rgba(255,255,255,.82);transition:color .25s}
.d-stroom .sr-foot-grid a:hover{color:var(--volt-2)}
.d-stroom .sr-foot .sr-logo span{color:#fff;white-space:normal}
.d-stroom .sr-reach.is-row{grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-stroom .sr-split.is-solo{grid-template-columns:minmax(0,1fr)}
.d-stroom .sr-foot .sr-logo{margin-right:0;margin-bottom:12px}
.d-stroom .sr-legal{padding-block:22px 30px;border-top:1px solid rgba(255,255,255,.1);font-size:13px;color:rgba(255,255,255,.45)}
@keyframes sr-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes sr-pop{from{opacity:0;transform:translateY(14px) scale(.9)}to{opacity:1;transform:none}}
@keyframes sr-charge{to{background-position:0 0}}
@keyframes sr-spark{0%{opacity:0;left:0}12%{opacity:1}85%{opacity:1}100%{opacity:0;left:calc(100% - 10px)}}
@keyframes sr-iris{to{clip-path:circle(75% at 50% 50%)}}
@keyframes sr-settle{to{scale:1}}
@keyframes sr-orbit{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
@keyframes sr-drift{to{transform:translate(-6%,8%) scale(1.08)}}
@keyframes sr-on{to{background:var(--volt)}}
@keyframes sr-knob{to{transform:translateX(20px)}}
@keyframes sr-redraw{from{stroke-dashoffset:60}to{stroke-dashoffset:0}}
@keyframes sr-current{from{stroke-dashoffset:.62}to{stroke-dashoffset:0}}
@keyframes sr-turn{to{transform:rotate(360deg)}}
@keyframes sr-wave{to{transform:translateX(-50%)}}
@keyframes sr-scan{from{background-position:-50% 0}to{background-position:150% 0}}
@media (prefers-reduced-motion:reduce){.d-stroom .sr-ln>span,.d-stroom .sr-ln em{animation:none!important;background-position:0 0!important}.d-stroom .sr-ln::after{display:none}.d-stroom .sr-photo,.d-stroom .sr-photo img{animation:none!important;clip-path:none!important;scale:1!important}.d-stroom .sr-frame .sr-cur,.d-stroom .sr-wave svg,.d-stroom .sr-glow,.d-stroom .sr-ring-dash,.d-stroom .sr-flow-rail .sr-p2,.d-stroom .sr-foot::before{animation:none!important}.d-stroom .sr-frame .sr-cur{display:none}.d-stroom .sr-switch{background:var(--volt)}.d-stroom .sr-switch::after{transform:translateX(20px)}.d-stroom .sr-state h2{--sp:1.2}.d-stroom .sr-gal>figure{transform:none!important}.d-stroom .sr-about-pic img{transform:none!important}}
@media (max-width:520px){.d-stroom .sr-ctas .btn{flex:1 1 100%;justify-content:space-between}.d-stroom .sr-bar{padding-left:12px}.d-stroom .sr-logo span{font-size:16px}.d-stroom .sr-burger{padding-left:14px}.d-stroom .sr-burger>span{display:none}.d-stroom .sr-burger{padding:0 8px}.d-stroom .sr-chip{padding:10px 12px 10px 10px}.d-stroom .sr-chip>span:first-child{width:36px;height:36px}.d-stroom .sr-chip b{font-size:14.5px}}
`;

const JS = `(function(){var d=document,W=window,q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;var fine=W.matchMedia&&W.matchMedia('(pointer: fine)').matches;
q('.d-stroom .sr-links').forEach(function(nav){var ind=nav.querySelector('.sr-ind');if(!ind)return;q('a',nav).forEach(function(a){a.addEventListener('mouseenter',function(){nav.style.setProperty('--ix',a.offsetLeft+'px');nav.style.setProperty('--iw',a.offsetWidth+'px');nav.classList.add('is-hover')})});nav.addEventListener('mouseleave',function(){nav.classList.remove('is-hover')})});
if(fine){q('.d-stroom .sr-card,.d-stroom .sr-bento>li').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
if(!reduce){q('.d-stroom .sr-mag').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px '+((e.clientY-r.top-r.height/2)*.35).toFixed(1)+'px'});b.addEventListener('pointerleave',function(){b.style.translate=''})});
q('.d-stroom .sr-gal>figure').forEach(function(f){f.addEventListener('pointermove',function(e){var r=f.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;f.style.setProperty('--ry',(x*7).toFixed(2)+'deg');f.style.setProperty('--rx',(-y*7).toFixed(2)+'deg')});f.addEventListener('pointerleave',function(){f.style.setProperty('--rx','0deg');f.style.setProperty('--ry','0deg')})})}}
q('.d-stroom [data-flow]').forEach(function(fl){var items=q('[data-step]',fl),nodes=q('.sr-node',fl),raf=0;function upd(){raf=0;var r=fl.getBoundingClientRect(),vh=W.innerHeight,p=reduce?1:Math.min(1,Math.max(0,(vh*.78-r.top)/Math.max(1,r.height*.75)));fl.style.setProperty('--fp',p.toFixed(3));var n=items.length;items.forEach(function(it,k){var on=p>=(n>1?k/(n-1):1)*.98-.001;it.classList.toggle('is-on',on);if(nodes[k])nodes[k].classList.toggle('is-on',on)})}W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});W.addEventListener('resize',upd);upd()});
q('.d-stroom .sr-state').forEach(function(s){var raf=0;function upd(){raf=0;var r=s.getBoundingClientRect(),vh=W.innerHeight,p=reduce?1.2:Math.min(1.2,Math.max(0,(vh-r.top)/(vh*.9)));s.style.setProperty('--sp',p.toFixed(3))}W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});upd()});
q('.d-stroom [data-area]').forEach(function(a){var rows=q('.sr-area-list li',a),pins=q('.sr-pin',a);rows.forEach(function(r,k){r.addEventListener('mouseenter',function(){if(pins[k])pins[k].classList.add('is-hot')});r.addEventListener('mouseleave',function(){if(pins[k])pins[k].classList.remove('is-hot')})});pins.forEach(function(p,k){p.addEventListener('mouseenter',function(){if(rows[k])rows[k].classList.add('is-hot');p.classList.add('is-hot')});p.addEventListener('mouseleave',function(){if(rows[k])rows[k].classList.remove('is-hot');p.classList.remove('is-hot')})})});
var cs=q('.d-stroom [data-count]');if(cs.length){var run=function(el){var n=+el.getAttribute('data-count');if(reduce||!n){el.textContent=n;return}var t0=null;function step(t){if(t0===null)t0=t;var k=Math.min(1,(t-t0)/1100);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(step)}requestAnimationFrame(step)};if('IntersectionObserver' in W){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target)}})});cs.forEach(function(c){io.observe(c)})}else cs.forEach(run)}})();`;

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4.5 10.5 3.5 3.5 7.5-8" />
  </svg>
);

/** The brand mark: a drop of water and a bolt of current in one circle. */
const Mark = ({ id }: { id: string }) => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <defs>
      <linearGradient id={`sr-mark-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1f5bff" />
        <stop offset="1" stopColor="#5b8cff" />
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="12" fill={`url(#sr-mark-${id})`} />
    <path d="M20 8.5c-4.6 5.4-7 9.3-7 12.7a7 7 0 0 0 14 0c0-3.4-2.4-7.3-7-12.7Z" fill="none" stroke="#fff" strokeWidth="2" />
    <path d="m21.4 15.5-4.2 6.4h3.4l-1 5 4.3-6.6h-3.4l.9-4.8Z" fill="#ff6a3d" />
  </svg>
);

/** Words that point at water or heat get the warm colour instead of the electric one. */
const warm = (icon: string) => ["drop", "flame", "sun", "coffee"].includes(icon);

function Head({ kicker, title, intro, id, row, center }: HeadProps & { row?: boolean; center?: boolean }) {
  return (
    <header className={`sr-head${row && intro ? " is-row" : ""}${center ? " is-center" : ""}`}>
      {kicker ? (
        <p className="sr-kick" data-rv>
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

const Logo = ({ c, id }: { c: Ctx; id: string }) => (
  <a href="#top" className="sr-logo" aria-label={c.name}>
    <Mark id={id} />
    <span>{c.name}</span>
  </a>
);

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="sr-hdr hdr">
        <div className="sr-wrap">
          <div className="sr-bar">
            <Logo c={c} id="h" />
            <nav aria-label={c.t.menu} className="sr-links" data-nav>
              <i className="sr-ind" aria-hidden="true" />
              {c.nav.slice(0, 5).map((n) => (
                <a key={n.id} href={`#${n.id}`}>
                  {n.label}
                </a>
              ))}
            </nav>
            {b.phone ? (
              <a href={tel(b.phone)} className="sr-call">
                <Icon name="phone" />
                {b.phone}
              </a>
            ) : null}
            <a href={cta.href} className="btn sr-fill sr-hcta">
              {cta.label}
            </a>
            <button type="button" className="sr-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
              <span data-label data-open={c.t.menu} data-close={c.t.close}>
                {c.t.menu}
              </span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div id="site-menu" className="sr-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small aria-hidden="true">{String(k + 1).padStart(2, "0")}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="sr-menu-card">
          <p>
            {b.city ?? c.name}
            <NowBadge c={c} className="sr-now" />
          </p>
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
          <a href={cta.href} className="btn sr-fill">
            {cta.label}
            <i>
              <Arrow />
            </i>
          </a>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero, business: b } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 56 ? "is-s" : plain.length > 30 ? "is-m" : undefined;
  const { lines, marked } = splitLines(hero.headline, plain.length > 34 ? 3 : 2);
  const facts = heroFacts(c);
  const services = c.spec.sections.flatMap((s) => (s.type === "services" ? s.items : []));
  const about = c.spec.sections.find((s) => s.type === "about");
  const trust = about && about.type === "about" ? about.highlights.slice(0, 3) : [];
  const open = b.openingHours?.find((l) => !/gesloten|closed|ferm[ée]|geschlossen/i.test(l));
  const icon = (label: string) => (label === c.t.address ? "map" : label === c.t.hours ? "clock" : label === c.t.phone ? "phone" : "check");
  return (
    <section className="sr-hero">
      <div className="sr-glow" aria-hidden="true" />
      <div className="sr-wrap">
        <div className="sr-hero-grid">
          <div className="sr-hero-copy">
            <div className="sr-hero-top">
              {hero.eyebrow ? <p className="sr-kick">{hero.eyebrow}</p> : null}
              <NowBadge c={c} className="sr-now" />
            </div>
            <h1 className={[size, marked ? "is-marked" : ""].filter(Boolean).join(" ") || undefined}>
              {lines.map((line, n) => (
                <span key={n} className="sr-ln" style={i(n)}>
                  <span style={i(n)}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="sr-lede">{hero.subheadline}</p>
            <div className="sr-ctas">
              <a className="btn sr-fill sr-mag" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <i>
                  <Arrow />
                </i>
              </a>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
            </div>
            {trust.length > 0 && (
              <ul className="sr-trust">
                {trust.map((t) => (
                  <li key={t}>
                    <Check />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="sr-visual">
            {p ? (
              <div className="sr-frame">
                <svg aria-hidden="true">
                  <rect className="sr-base" />
                  <rect className="sr-cur" pathLength={1000} />
                  <rect className="sr-cur is-heat" pathLength={1000} />
                </svg>
                <figure className="sr-photo">
                  <Pic p={p} eager sizes="(min-width: 1000px) 44vw, 92vw" />
                </figure>
                {open ? (
                  <div className="sr-chip is-a">
                    <span aria-hidden="true">
                      <Icon name="clock" />
                    </span>
                    <p>
                      {c.t.hours}
                      <b>{open}</b>
                    </p>
                  </div>
                ) : null}
                {services.length > 1 ? (
                  <div className="sr-chip is-b is-heat">
                    <span aria-hidden="true">
                      <Icon name="bolt" />
                    </span>
                    <p>
                      <b>
                        <span data-count={services.length}>{services.length}</span> {c.t.kick.services.toLowerCase()}
                      </b>
                      {services
                        .slice(0, 2)
                        .map((x) => x.title)
                        .join(" · ")}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : services.length > 0 ? (
              <div className="sr-panel">
                <header>
                  <b>{c.name}</b>
                  <NowBadge c={c} className="sr-now" />
                </header>
                <ul>
                  {services.slice(0, 5).map((s, n) => (
                    <li key={s.title} style={i(n)}>
                      <span aria-hidden="true">
                        <Icon name={s.icon} />
                      </span>
                      {s.title}
                      <i className="sr-switch" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        {facts.length > 0 && (
          <div className="sr-facts" style={css({ "--n": facts.length })}>
            {facts.map((f, n) => (
              <div key={f.label} style={i(n)}>
                <span aria-hidden="true">
                  <Icon name={icon(f.label)} />
                </span>
                <dl>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </dl>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const { primaryCta, secondaryCta } = c.spec.hero;
  const words = c.spec.sections.flatMap((x) => (x.type === "services" ? x.items.map((it) => it.title) : [])).slice(0, 6);
  return (
    <footer className="sr-foot">
      <div className="sr-wrap">
        <div className="sr-foot-cta">
          <h2 data-rv>{em(c.spec.business.tagline || primaryCta.label)}</h2>
          <div className="sr-ctas">
            <a className="btn sr-fill sr-mag" href={primaryCta.href}>
              {primaryCta.label}
              <i>
                <Arrow />
              </i>
            </a>
            {secondaryCta ? (
              <a className="btn sr-line" href={secondaryCta.href}>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
        <div className="sr-foot-grid">
          <div>
            <Logo c={c} id="f" />
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
          {words.length > 0 ? (
            <div>
              <h3>{c.t.kick.services}</h3>
              {words.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
          ) : null}
          <div>
            <h3>{c.t.contact}</h3>
            {b.address ? <span>{b.address}</span> : b.city ? <span>{b.city}</span> : null}
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
            {b.mapsUrl ? (
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                {c.t.route} →
              </a>
            ) : null}
            {b.openingHours?.slice(0, 4).map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
        <Legal c={c} className="z-legal sr-legal" />
      </div>
    </footer>
  );
}

/** Ways to reach the business, as tappable rows: only what is on record. */
function ReachRows({ c, row }: { c: Ctx; row?: boolean }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email && !b.city) return null;
  return (
    <div className={`sr-reach${row ? " is-row" : ""}`} data-rv>
      {b.phone ? (
        <a href={tel(b.phone)}>
          <Icon name="phone" />
          {b.phone}
        </a>
      ) : null}
      {b.email ? (
        <a href={`mailto:${b.email}`}>
          <Icon name="chat" />
          {b.email}
        </a>
      ) : null}
      {b.address ? (
        <span>
          <Icon name="map" />
          {b.address}
        </span>
      ) : b.city ? (
        <span>
          <Icon name="map" />
          {b.city}
        </span>
      ) : null}
      {b.mapsUrl ? (
        <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
          <Icon name="globe" />
          {c.t.route} →
        </a>
      ) : null}
    </div>
  );
}

/** The process: steps joined by a line that carries current as the section scrolls by. */
function flowPath(n: number) {
  // Nodes sit at the centre of each column (x in 0..1000, y = 55); the line swings between them.
  const xs = Array.from({ length: n }, (_, k) => ((k + 0.5) / n) * 1000);
  let dPath = `M0 55 L${xs[0].toFixed(1)} 55`;
  xs.slice(1).forEach((x, k) => {
    const x0 = xs[k];
    const mid = (x0 + x) / 2;
    const y = k % 2 ? 100 : 10;
    dPath += ` C${(x0 + (mid - x0) * 0.6).toFixed(1)} 55 ${(mid - (mid - x0) * 0.4).toFixed(1)} ${y} ${mid.toFixed(1)} ${y} S${(x - (x - mid) * 0.6).toFixed(1)} 55 ${x.toFixed(1)} 55`;
  });
  return `${dPath} L1000 55`;
}

function Area({ s, c }: { s: Extract<Ctx["spec"]["sections"][number], { type: "features" }>; c: Ctx }) {
  const center = c.spec.business.city ?? c.name;
  const n = s.items.length;
  return (
    <section className="sr-sec" id={s.id}>
      <div className="sr-wrap sr-area" data-area>
        <div>
          <Head kicker={c.spec.business.city ?? c.t.kick.features} title={s.title} intro={s.intro} />
          <ol className="sr-area-list">
            {s.items.map((it, k) => (
              <li key={k} data-rv style={i(k % 4)}>
                <span aria-hidden="true">{String(k + 1).padStart(2, "0")}</span>
                <b>{it.title}</b>
                <p>{it.description}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="sr-map" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <defs>
              <radialGradient id={`sr-area-${s.id}`}>
                <stop offset="0" stopColor="#1f5bff" stopOpacity=".14" />
                <stop offset="1" stopColor="#1f5bff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle className="sr-ring-fill" cx="50" cy="50" r="48" fill={`url(#sr-area-${s.id})`} />
            <circle cx="50" cy="50" r="46" />
            <circle className="sr-ring-dash" cx="50" cy="50" r="34" />
            <circle cx="50" cy="50" r="22" />
          </svg>
          <p className="sr-center">
            <Icon name="map" />
            {center}
          </p>
          {s.items.map((it, k) => (
            <span key={k} className="sr-pin" style={css({ "--a": `${(360 / n) * k + 20}deg`, "--r": k % 2 ? "29cqw" : "41cqw" })}>
              <i>{String(k + 1).padStart(2, "0")}</i>
              <b>{it.title}</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export const stroom: Family = {
  key: "stroom",
  root: "d-stroom",
  fonts: ["Sora", "Inter"],
  themeColor: "#ffffff",
  accent: "#1f5bff",
  onAccent: "#ffffff",
  css: "",
  // Everything after the shared defaults, so the kit's sections take the design's own look.
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "sr-wrap", eyebrow: "sr-kick", btn: "sr-fill", btnAlt: "sr-line", btnText: "sr-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      const b = c.spec.business;
      return (
        <section className="sr-sec" id={s.id}>
          <div className={`sr-wrap sr-about${p ? "" : " is-solo"}`}>
            {p ? (
              <div className="sr-about-pic" data-rv>
                <figure data-px>
                  <Pic p={p} sizes="(min-width: 980px) 44vw, 92vw" />
                </figure>
                {b.city ? (
                  <div className="sr-chip">
                    <span aria-hidden="true">
                      <Icon name="map" />
                    </span>
                    <p>
                      {c.t.address}
                      <b>{b.city}</b>
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className="sr-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="sr-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="sr-checks" data-rv>
                  {s.highlights.map((h, n) => (
                    <li key={h} style={i(n)}>
                      <Check />
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
      <section className="sr-sec is-cloud" id={s.id}>
        <div className="sr-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} row />
          <ul className="sr-cards">
            {s.items.map((it, n) => {
              const p = c.photo(`art:svc${n}`);
              return (
                <li key={n} data-rv style={i(n % 3)}>
                  <div className={`sr-card${p ? " has-pic" : ""}`}>
                    {p ? (
                      <figure className="z-pic">
                        <Pic p={p} sizes="(min-width: 900px) 30vw, 92vw" />
                      </figure>
                    ) : null}
                    <span className={`sr-ico${warm(it.icon) ? " is-heat" : ""}`} aria-hidden="true">
                      <Icon name={it.icon} />
                    </span>
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                    {it.price || it.duration ? (
                      <p className="sr-tags">
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
    features: (s, c) => {
      if (s.items.length > 1 && s.items.every((it) => it.icon === "map")) return <Area s={s} c={c} />;
      return (
        <section className="sr-sec" id={s.id}>
          <div className="sr-wrap">
            <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} row />
            <ul
              className={`sr-bento${s.items.length === 5 ? " is-five" : ""}${s.items.length % 2 ? " is-odd" : ""}`}
              style={css({ "--cols": s.items.length === 4 || s.items.length === 2 ? 2 : s.items.length === 1 ? 1 : 3 })}
            >
              {s.items.map((it, n) => (
                <li key={n} data-rv style={i(n % 3)}>
                  <span className={`sr-ico${warm(it.icon) && n ? " is-heat" : ""}`} aria-hidden="true">
                    <Icon name={it.icon} />
                  </span>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    },
    process: (s, c) => {
      const n = s.steps.length;
      return (
        <section className="sr-sec is-cloud" id={s.id}>
          <div className="sr-wrap">
            <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} row />
            <div className="sr-flow" data-flow style={css({ "--n": n })}>
              <div className="sr-flow-rail" aria-hidden="true">
                <svg viewBox="0 0 1000 110" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`sr-grad-${s.id}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#1f5bff" />
                      <stop offset=".6" stopColor="#5b8cff" />
                      <stop offset="1" stopColor="#ff6a3d" />
                    </linearGradient>
                  </defs>
                  <path className="sr-p0" d={flowPath(n)} />
                  <path className="sr-p1" d={flowPath(n)} pathLength={1} stroke={`url(#sr-grad-${s.id})`} />
                  <path className="sr-p2" d={flowPath(n)} pathLength={1} />
                </svg>
                {s.steps.map((_, k) => (
                  <span key={k} className="sr-node" style={css({ "--k": k })}>
                    {k + 1}
                  </span>
                ))}
              </div>
              <ol className="sr-steps">
                {s.steps.map((st, k) => (
                  <li key={k} data-step data-rv style={i(k)}>
                    <b>{String(k + 1).padStart(2, "0")}</b>
                    <h3>{st.title}</h3>
                    <p>{st.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      );
    },
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="sr-sec" id={s.id}>
          <div className="sr-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className="sr-gal">
              {pics.map((p, n) => (
                <figure key={n} data-rv style={i(n % 4)}>
                  <Pic p={p} sizes="(min-width: 900px) 40vw, 50vw" />
                  <figcaption>{p.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => {
      const b = c.spec.business;
      const cta = c.spec.hero.primaryCta;
      return (
        <section className="sr-sec" id={s.id}>
          <div className="sr-wrap">
            <div className="sr-oncall">
              <div className="sr-wave" aria-hidden="true">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0 60 C 75 10 75 10 150 60 S 225 110 300 60 S 375 10 450 60 S 525 110 600 60 S 675 10 750 60 S 825 110 900 60 S 975 10 1050 60 S 1125 110 1200 60" />
                  <path d="M0 70 C 100 40 100 40 200 70 S 300 100 400 70 S 500 40 600 70 S 700 100 800 70 S 900 40 1000 70 S 1100 100 1200 70" />
                </svg>
              </div>
              <div className="sr-oncall-in">
                <div className="sr-oncall-copy">
                  <Head kicker={c.t.kick.hours} title={s.title} intro={s.note || undefined} />
                  <Reach c={c} />
                  <div className="sr-ctas" style={{ animation: "none" }}>
                    {b.phone ? (
                      <a className="btn sr-fill sr-mag" href={tel(b.phone)}>
                        {c.t.call}
                        <i>
                          <Icon name="phone" />
                        </i>
                      </a>
                    ) : (
                      <a className="btn sr-fill sr-mag" href={cta.href}>
                        {cta.label}
                        <i>
                          <Arrow />
                        </i>
                      </a>
                    )}
                  </div>
                </div>
                <div className="sr-glass" data-rv>
                  <header>
                    <p>{c.t.hours}</p>
                    <NowBadge c={c} className="sr-now" />
                  </header>
                  {b.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    },
    packages: (s, c) => (
      <section className="sr-sec" id={s.id}>
        <div className="sr-wrap">
          <Head kicker={c.t.kick.packages} title={s.title} intro={s.intro} row />
          <div className="sr-rates">
            {s.items.map((it, n) => (
              <div key={n} className={`sr-rate${it.featured ? " is-featured" : ""}`} data-rv style={i(n % 4)}>
                {it.featured ? <small>{c.t.popular}</small> : null}
                <h3>{it.name}</h3>
                <p className={`sr-price${(it.price ?? "").length > 8 ? " is-long" : ""}`}>
                  {it.price ? (
                    <>
                      <b>{it.price}</b>
                      {it.unit ? <span>{it.unit}</span> : null}
                    </>
                  ) : (
                    <b>{c.t.onRequest}</b>
                  )}
                </p>
                {it.description ? <p>{it.description}</p> : null}
                {it.features.length > 0 && (
                  <ul>
                    {it.features.map((f) => (
                      <li key={f}>
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {s.note ? (
            <p className="sr-callout" data-rv>
              <Icon name="spark" />
              {s.note}
            </p>
          ) : null}
        </div>
      </section>
    ),
    statement: (s, c) => (
      <section className="sr-sec is-cloud sr-state" id={s.id}>
        <div className="sr-wrap">
          <h2>{s.title.replace(/\*/g, "")}</h2>
          {s.note ? (
            <p className="sr-kick" data-rv>
              {s.note}
            </p>
          ) : (
            <p className="sr-kick">{c.name}</p>
          )}
        </div>
      </section>
    ),
    menu: (s, c) => (
      <section className="sr-sec is-cloud" id={s.id}>
        <div className="sr-wrap">
          <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} row />
          <div className="sr-menu-list">
            {s.categories.map((cat, n) => (
              <div key={n} className="sr-menu-cat" data-rv style={i(n % 2)}>
                <h3>{cat.name}</h3>
                <ul>
                  {cat.items.map((d, k) => (
                    <li key={k}>
                      <div>
                        <b>{d.name}</b>
                        {d.description ? <p>{d.description}</p> : null}
                      </div>
                      {d.price ? <span className="z-price">{d.price}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {s.note ? (
            <p className="sr-callout" data-rv>
              <Icon name="spark" />
              {s.note}
            </p>
          ) : null}
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="sr-sec is-cloud" id={s.id}>
        <div className={`sr-wrap sr-split${s.showForm ? "" : " is-solo"}`}>
          <div className="sr-split-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <ReachRows c={c} row={!s.showForm} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="sr-formcard" data-rv>
              <header>
                <p>
                  <Icon name="chat" />
                  {c.t.contact}
                </p>
                <NowBadge c={c} className="sr-now" />
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
        <section className="sr-sec" id={s.id}>
          <div className="sr-wrap sr-split">
            <div className="sr-split-copy">
              <Head kicker={c.t.kick.booking} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              {s.options.length > 0 && (
                <ul className="sr-steps-mini" data-rv>
                  {s.options.slice(0, 6).map((o, n) => (
                    <li key={o}>
                      <span aria-hidden="true">{n + 1}</span>
                      {o}
                    </li>
                  ))}
                </ul>
              )}
              <ReachRows c={c} />
            </div>
            <div className="sr-formcard" data-rv>
              <header>
                <p>
                  <Icon name="calendar" />
                  {c.t.submit[s.kind]}
                </p>
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
    order: (s, c) => (
      <section className="sr-sec is-cloud" id={s.id}>
        <div className="sr-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} row />
          <ul className="sr-cards">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} className="sr-card" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="sr-ico" aria-hidden="true">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <span className="sr-more">
                    {ch.label}
                    <i aria-hidden="true">→</i>
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
