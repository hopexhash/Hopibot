import type { ReactNode } from "react";
import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type HeadProps, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Maison: an original template (no portfolio demo). An intimate canal-house hotel with its own
 * restaurant: warm plaster, deep oxblood and night ink with one brass detail, a sharp, wonky
 * high-contrast serif with a refined grotesk. The house lives through a day as you scroll: the
 * page starts in morning light and ends at night, the clock in the header runs along and the
 * dark rooms are lit by a lamp that follows the pointer. Its motif is the old hotel key: door
 * plaques number the sections, rooms open like doors, the process hangs on a key rack and the
 * menu opens like lift doors onto a lobby directory. Made for boutique hotels, B&Bs, guest
 * houses, restaurants with rooms and other hospitality with character.
 */

const SHEET = `
.d-maison{--chalk:#f7f1e7;--plaster:#efe5d6;--sand:#e7d3b6;--oxblood:#5b1820;--wine:#7a2731;--ink:#17121a;--ink-2:#231b26;--brass:#b08847;--brass-l:#d6b679;--text:#2b1e20;--pad:clamp(20px,5vw,76px);--ease:cubic-bezier(.22,.68,.16,1);--door:cubic-bezier(.7,0,.2,1);--serif:"Fraunces Soft",Georgia,serif;--wonk:"SOFT" 0,"WONK" 1;--sec:clamp(84px,11vw,176px);--z-display:var(--serif);--z-display-weight:340;--z-radius:2px;--z-field-radius:2px;--z-ico-radius:50%;--z-h3:clamp(22px,1.9vw,29px);--z-statement:clamp(32px,4.8vw,78px);--z-sec:var(--sec);--z-bg2:var(--chalk);--z-ink:var(--text);--z-dim:#6b5753;--z-line:rgba(43,30,32,.16);--z-accent:var(--oxblood);--z-on-accent:#f7f1e7;background:var(--chalk);color:var(--text);font-family:"Hanken Grotesk",system-ui,sans-serif;font-size:clamp(16px,1.04vw,18px);line-height:1.66;font-weight:400}
.d-maison h1,.d-maison h2,.d-maison h3{font-family:var(--serif);font-weight:340;font-variation-settings:var(--wonk);line-height:1;letter-spacing:-.018em}
.d-maison h1 em,.d-maison h2 em,.d-maison h3 em{font-style:italic;font-weight:300;color:var(--acc,var(--oxblood))}
.d-maison h2{font-size:clamp(38px,5.4vw,86px)}
.d-maison h2.is-long{font-size:clamp(30px,3.8vw,58px);line-height:1.06}
.d-maison .mk-wrap{position:relative;width:min(100%,1400px);margin-inline:auto;padding-inline:var(--pad)}
.d-maison ::selection{background:var(--oxblood);color:var(--chalk)}
.d-maison main>section{--bg:var(--plaster);--fg:var(--text);--dim:#6b5753;--line:rgba(43,30,32,.16);--acc:var(--oxblood);--acc-fg:#f7f1e7;--card:#f7f1e7;--card-2:#e6d8c4;--hang:var(--oxblood);--glow:rgba(214,182,121,0);--from:transparent;--tone:light;--z-bg2:var(--card);--z-ink:var(--fg);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--acc);--z-on-accent:var(--acc-fg);position:relative;isolation:isolate;background:radial-gradient(560px circle at var(--mx,50%) var(--my,-40%),var(--glow),rgba(214,182,121,0) 70%),var(--bg);color:var(--fg)}
.d-maison main>section:nth-of-type(2),.d-maison main>section:nth-of-type(3){--bg:var(--chalk);--card:#fffaf2;--card-2:#efe5d6}
.d-maison main>section:nth-last-of-type(-n+5):not(:nth-of-type(-n+3)){--bg:var(--sand);--card:#f4e7d3;--card-2:#dcc5a4;--dim:#654f45}
.d-maison main>section:nth-last-of-type(-n+4):not(:nth-of-type(1)){--bg:var(--oxblood);--fg:#f4eadb;--dim:rgba(244,234,219,.72);--line:rgba(244,234,219,.2);--acc:var(--brass-l);--acc-fg:#17121a;--card:#682029;--card-2:#4a1219;--hang:#3a0d14;--glow:rgba(214,182,121,.16);--tone:dark}
.d-maison main>section:nth-last-of-type(-n+2):not(:nth-of-type(1)){--bg:var(--ink);--card:#231b26;--card-2:#100c12;--hang:#3d1219;--glow:rgba(214,182,121,.13)}
.d-maison main>section:nth-last-of-type(5):not(:nth-of-type(-n+3)){--from:var(--plaster)}
.d-maison main>section:nth-last-of-type(4):not(:nth-of-type(1)){--from:var(--sand)}
.d-maison main>section:nth-last-of-type(2):not(:nth-of-type(1)){--from:var(--oxblood)}
.d-maison main>section::before{content:"";position:absolute;inset:0 0 auto;z-index:-1;height:calc(var(--sec) * .85);background:linear-gradient(var(--from),rgba(0,0,0,0));pointer-events:none}
.d-maison main>section.mk-hero::before{display:none}
.d-maison .mk-kick{display:inline-flex;align-items:center;gap:14px;font-size:12px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--dim,#6b5753)}
.d-maison .mk-plq{position:relative;display:inline-grid;flex:none;place-items:center;min-width:46px;height:30px;padding:0 10px;border-radius:50%;background:linear-gradient(160deg,#e4c88f,#b08847 46%,#8a6631);color:#2b1e20;font-family:var(--serif);font-size:14px;font-weight:500;font-style:italic;letter-spacing:0;text-transform:none;font-variant-numeric:lining-nums;box-shadow:inset 0 0 0 1.5px rgba(255,240,205,.55),inset 0 0 0 3px rgba(122,86,36,.5),0 3px 8px -3px rgba(23,18,26,.5)}
.d-maison .mk-plq::before,.d-maison .mk-plq::after{content:"";position:absolute;top:50%;width:3px;height:3px;border-radius:50%;background:#6e4f24;transform:translateY(-50%)}
.d-maison .mk-plq::before{left:5px}.d-maison .mk-plq::after{right:5px}
.d-maison .mk-head{display:grid;gap:20px;max-width:880px;margin-bottom:clamp(44px,6vw,88px)}
.d-maison .mk-head .mk-intro{max-width:56ch;color:var(--dim)}
.d-maison .mk-head.is-split{max-width:none}
@media (min-width:960px){.d-maison .mk-head.is-split{grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr);align-items:end;column-gap:64px}.d-maison .mk-head.is-split .mk-kick{grid-column:1/-1}.d-maison .mk-head.is-split .mk-intro{padding-bottom:10px}}
.d-maison .z-head .z-intro{color:var(--dim)}
.d-maison .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:54px;padding:0 30px;border-radius:2px;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;overflow:hidden;isolation:isolate;transition:color .45s var(--ease),background-color .45s var(--ease),border-color .45s var(--ease),transform .45s var(--ease)}
.d-maison .btn svg{width:18px;height:18px;flex:none;transition:transform .45s var(--ease)}
.d-maison .btn:hover svg{transform:translateX(5px)}
.d-maison .mk-fill{background:var(--acc,var(--oxblood));color:var(--acc-fg,#f7f1e7);box-shadow:inset 0 0 0 1px rgba(214,182,121,.0)}
.d-maison .mk-fill::before{content:"";position:absolute;inset:5px;border:1px solid rgba(214,182,121,.55);border-radius:1px;pointer-events:none;transition:inset .45s var(--ease)}
.d-maison .mk-fill::after{content:"";position:absolute;inset:0;z-index:-1;background:var(--ink);transform:scaleY(0);transform-origin:50% 100%;transition:transform .5s var(--ease)}
.d-maison .mk-fill:hover{color:#f7f1e7}
.d-maison .mk-fill:hover::before{inset:3px}
.d-maison .mk-fill:hover::after{transform:none}
.d-maison .mk-alt{border:1px solid currentColor;color:inherit;background:transparent}
.d-maison .mk-alt:hover{background:var(--fg,var(--text));color:var(--bg,var(--chalk));border-color:var(--fg,var(--text))}
.d-maison .mk-txt{position:relative;display:inline-flex;align-items:center;gap:10px;min-height:44px;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
.d-maison .mk-txt::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:1px;background:var(--acc,var(--oxblood));transform:scaleX(.3);transform-origin:0 50%;transition:transform .5s var(--ease)}
.d-maison .mk-txt:hover::after{transform:scaleX(1)}
.d-maison .mk-txt svg{width:16px;height:16px;transition:transform .45s var(--ease)}
.d-maison .mk-txt:hover svg{transform:translateX(4px)}
.d-maison .mk-fob{display:block;overflow:visible}
.d-maison .mk-fob .fr{fill:none;stroke:var(--brass);stroke-width:3}
.d-maison .mk-fob .fl{fill:var(--brass)}
.d-maison .mk-fob .fb{fill:var(--oxblood)}
.d-maison .mk-fob .fs{fill:none;stroke:var(--brass-l);stroke-width:1.1;stroke-dasharray:3 3;opacity:.8}
.d-maison .mk-fob .fh{fill:rgba(255,255,255,.08)}
.d-maison .mk-fob text{fill:var(--brass-l);font-family:var(--serif);font-style:italic;font-weight:400;font-size:19px;text-anchor:middle;dominant-baseline:middle}
.d-maison .mk-swing{transform-origin:50% 10%;transition:transform .8s var(--ease)}
@keyframes mk-swing{0%{transform:rotate(0)}22%{transform:rotate(9deg)}46%{transform:rotate(-6deg)}68%{transform:rotate(3deg)}86%{transform:rotate(-1.2deg)}100%{transform:rotate(0)}}
@keyframes mk-sway{0%,100%{transform:rotate(-2.4deg)}50%{transform:rotate(2.4deg)}}
.d-maison .mk-hdr{position:fixed;inset:0 0 auto;z-index:60;color:var(--text);transition:color .6s var(--ease),transform .5s var(--ease)}
.d-maison .mk-hdr::before{content:"";position:absolute;inset:0;z-index:-1;background:rgba(247,241,231,.88);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);border-bottom:1px solid rgba(43,30,32,.1);opacity:0;transition:opacity .5s var(--ease),background-color .6s var(--ease),border-color .6s}
.d-maison.is-scrolled .mk-hdr::before{opacity:1}
.d-maison .mk-hdr.is-dark{color:#f4eadb}
.d-maison .mk-hdr.is-dark::before{background:rgba(23,18,26,.8);border-color:rgba(244,234,219,.1)}
.d-maison.menu-open .mk-hdr{color:#f4eadb}
.d-maison.menu-open .mk-hdr::before{opacity:0}
.d-maison .mk-bar{display:flex;align-items:center;gap:clamp(14px,2vw,32px);height:84px;transition:height .5s var(--ease)}
.d-maison.is-scrolled .mk-bar{height:70px}
.d-maison .mk-logo{display:flex;align-items:center;gap:12px;min-width:0;margin-right:auto;font-family:var(--serif);font-variation-settings:var(--wonk);font-size:clamp(20px,1.7vw,24px);font-weight:400;line-height:1;letter-spacing:-.01em}
.d-maison .mk-logo .mk-fob{flex:none;width:24px;height:50px;margin-top:6px}
.d-maison .mk-logo:hover .mk-swing{animation:mk-swing 1.6s var(--ease)}
.d-maison .mk-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-maison .mk-links{display:none;gap:clamp(16px,2vw,34px);font-size:12.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.d-maison .mk-links a{position:relative;display:inline-flex;align-items:center;min-height:44px}
.d-maison .mk-links a::after{content:"";position:absolute;left:50%;bottom:10px;width:5px;height:5px;border-radius:50%;background:var(--brass);transform:translateX(-50%) scale(0);transition:transform .4s var(--ease)}
.d-maison .mk-links a:hover::after{transform:translateX(-50%) scale(1)}
.d-maison .mk-time{display:inline-flex;align-items:center;gap:10px;font-size:12.5px;font-weight:600;letter-spacing:.12em;font-variant-numeric:tabular-nums}
.d-maison .mk-dial{position:relative;flex:none;width:34px;height:18px;overflow:hidden}
.d-maison .mk-dial::before{content:"";position:absolute;left:0;right:0;top:0;height:34px;border:1px solid currentColor;border-radius:50%;opacity:.35}
.d-maison .mk-dial i{position:absolute;left:0;right:0;top:0;height:34px;transform:rotate(calc(-90deg + var(--sun,0) * 180deg));transition:transform .3s linear}
.d-maison .mk-dial i::before{content:"";position:absolute;left:50%;top:-4px;width:9px;height:9px;margin-left:-4.5px;border-radius:50%;background:var(--brass);box-shadow:0 0 0 3px rgba(214,182,121,.25)}
.d-maison .mk-cta{display:none;min-height:46px;padding:0 22px}
.d-maison .mk-burger{position:relative;z-index:2;display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:0 4px 0 14px;border:0;background:none;font-size:12.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.d-maison .mk-burger .mk-fob{width:20px;height:42px;margin-top:6px;transform-origin:50% 10%;transition:transform .7s var(--ease)}
.d-maison .mk-burger:hover .mk-fob{animation:mk-swing 1.6s var(--ease)}
.d-maison.menu-open .mk-hdr .mk-fob .fb{fill:#2a0d12}
.d-maison.menu-open .mk-burger .mk-fob{animation:mk-swing 1.6s var(--ease)}
@media (min-width:1080px){.d-maison .mk-links,.d-maison .mk-cta{display:inline-flex}.d-maison .mk-burger{display:none}}
@media (max-width:520px){.d-maison .mk-time{display:none}}
.d-maison .mk-menu{position:fixed;inset:0;z-index:55;display:grid;grid-template-rows:auto 1fr auto;gap:22px;padding:108px var(--pad) 104px;background:radial-gradient(120% 80% at 50% 0%,#6a1f28,#4a1219 60%,#2a0d12);color:#f4eadb;overflow-y:auto;clip-path:inset(0 50% 0 50%);visibility:hidden;transition:clip-path .8s var(--door),visibility 0s .8s}
.d-maison .mk-menu.is-open{clip-path:inset(0 0 0 0);visibility:visible;transition:clip-path .85s var(--door)}
.d-maison .mk-menu::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(transparent,rgba(214,182,121,.5),transparent);opacity:0;transition:opacity .4s}
.d-maison .mk-menu.is-open::before{animation:mk-seam-out 1.4s ease .2s both}
@keyframes mk-seam-out{0%{opacity:0}30%{opacity:1}100%{opacity:0}}
.d-maison .mk-gauge{position:relative;justify-self:center;width:150px;height:76px;overflow:hidden}
.d-maison .mk-gauge::before{content:"";position:absolute;left:0;right:0;top:0;height:150px;border-radius:50%;background:repeating-conic-gradient(from -90deg,rgba(214,182,121,.7) 0 1deg,transparent 1deg 18deg);-webkit-mask:radial-gradient(circle,transparent 62px,#000 63px);mask:radial-gradient(circle,transparent 62px,#000 63px)}
.d-maison .mk-gauge::after{content:"";position:absolute;left:5px;right:5px;top:5px;height:140px;border:1px solid rgba(214,182,121,.55);border-radius:50%}
.d-maison .mk-gauge i{position:absolute;left:50%;bottom:-3px;width:2px;height:62px;margin-left:-1px;background:var(--brass-l);transform-origin:50% 100%;transform:rotate(calc(-80deg + var(--k,0) * var(--step,40deg)));transition:transform .7s cubic-bezier(.3,1.4,.4,1)}
.d-maison .mk-gauge b{position:absolute;left:50%;bottom:-9px;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:var(--brass)}
.d-maison .mk-menu nav{display:grid;align-content:center;gap:2px;width:min(100%,560px);justify-self:center}
.d-maison .mk-menu nav a{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:18px;min-height:64px;padding:8px 0;border-bottom:1px solid rgba(214,182,121,.2);font-family:var(--serif);font-variation-settings:var(--wonk);font-size:clamp(30px,8vw,48px);font-weight:300;line-height:1.05;opacity:0;transform:translateY(18px);transition:opacity .5s,transform .7s var(--ease),color .3s}
.d-maison .mk-menu nav a .mk-plq{font-size:13px}
.d-maison .mk-menu nav a svg{width:20px;height:20px;opacity:.4;transition:transform .4s var(--ease),opacity .3s}
.d-maison .mk-menu nav a:hover{color:var(--brass-l)}
.d-maison .mk-menu nav a:hover svg{opacity:1;transform:translateX(4px)}
.d-maison .mk-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.4s + var(--i,0) * 70ms)}
.d-maison .mk-menu-foot{display:grid;gap:14px;justify-items:center;text-align:center;font-size:15px;color:rgba(244,234,219,.75);opacity:0;transition:opacity .6s}
.d-maison .mk-menu.is-open .mk-menu-foot{opacity:1;transition-delay:.8s}
.d-maison .mk-menu-foot a{display:inline-flex;align-items:center;min-height:44px}
.d-maison .mk-menu-foot .btn{--acc:var(--brass-l);--acc-fg:#17121a;width:min(100%,320px)}
.d-maison .mk-hero{--bg:var(--chalk);min-height:100svh;padding:calc(84px + clamp(28px,5vw,64px)) 0 clamp(56px,7vw,96px);overflow:hidden}
.d-maison .mk-beam{position:absolute;inset:-20% -10% auto auto;z-index:-1;width:70%;height:140%;background:linear-gradient(105deg,rgba(255,250,240,0) 30%,rgba(255,246,226,.75) 46%,rgba(255,250,240,0) 62%);transform:rotate(14deg) translateX(calc(var(--sun,0) * -40%));opacity:.9;animation:mk-beam 14s ease-in-out infinite alternate;pointer-events:none}
@keyframes mk-beam{from{opacity:.55}to{opacity:1}}
.d-maison .mk-hero::after{content:"";position:absolute;inset:0;z-index:-2;background:radial-gradient(rgba(43,30,32,.028) 1px,transparent 1.2px) 0 0/6px 6px,radial-gradient(rgba(176,136,71,.04) 1px,transparent 1.4px) 2px 3px/9px 9px;-webkit-mask:linear-gradient(#000 60%,transparent);mask:linear-gradient(#000 60%,transparent);pointer-events:none}
.d-maison .mk-hero-grid{display:grid;grid-template-areas:"copy" "art" "facts";gap:clamp(44px,6vw,80px) clamp(44px,6vw,80px)}
.d-maison .mk-hero-copy{grid-area:copy;align-self:end}
.d-maison .mk-hero-grid>.mk-art{grid-area:art}
.d-maison .mk-hero-grid>.mk-reg{grid-area:facts;align-self:start}
@media (min-width:980px){.d-maison .mk-hero-grid{grid-template-columns:minmax(0,1.18fr) minmax(0,.82fr);grid-template-rows:1fr auto;grid-template-areas:"copy art" "facts art";row-gap:0;min-height:calc(100svh - 84px - clamp(28px,5vw,64px) - clamp(56px,7vw,96px))}.d-maison .mk-hero-grid>.mk-art{align-self:end}}
.d-maison .mk-eyebrow{display:flex;flex-wrap:wrap;align-items:center;gap:12px 14px;margin-bottom:clamp(26px,3vw,40px);font-size:12.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b5753;animation:mk-fade 1s var(--ease) .1s both}
.d-maison .mk-now{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border:1px solid rgba(43,30,32,.18);border-radius:999px;font-size:11px;letter-spacing:.16em;color:var(--text)}
.d-maison .mk-now::before{content:"";width:7px;height:7px;border-radius:50%;background:#8a7a70}
.d-maison .mk-now.is-open::before{background:var(--brass);box-shadow:0 0 0 3px rgba(176,136,71,.25)}
.d-maison .mk-h1{font-size:clamp(46px,8.2vw,134px);font-weight:300;line-height:.95;letter-spacing:-.03em;perspective:900px}
.d-maison .mk-h1.is-m{font-size:clamp(42px,6.6vw,106px)}
.d-maison .mk-h1.is-s{font-size:clamp(36px,5vw,80px);line-height:1}
.d-maison .mk-w{display:inline-block;perspective:700px}
.d-maison .mk-w>span{display:inline-block;transform-origin:0 50%;animation:mk-door-word 1.3s var(--ease) both;animation-delay:calc(.25s + var(--i,0) * 85ms)}
@keyframes mk-door-word{from{opacity:0;transform:rotateY(-78deg) translateX(-.06em)}60%{opacity:1}to{opacity:1;transform:none}}
.d-maison .mk-h1 em{color:var(--oxblood)}
.d-maison .mk-lede{max-width:44ch;margin-top:clamp(24px,2.6vw,36px);font-size:clamp(17px,1.3vw,20px);line-height:1.6;color:#4e3d3c;animation:mk-rise 1s var(--ease) .9s both}
.d-maison .mk-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:14px 26px;margin-top:34px;animation:mk-rise 1s var(--ease) 1.05s both}
@keyframes mk-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes mk-fade{from{opacity:0}to{opacity:1}}
.d-maison .mk-reg{display:grid;width:100%;margin-top:clamp(0px,4vw,56px);max-width:560px;border-top:1px solid rgba(43,30,32,.2);animation:mk-rise 1s var(--ease) 1.2s both}
.d-maison .mk-reg div{display:flex;align-items:baseline;gap:12px;padding:13px 0;border-bottom:1px solid rgba(43,30,32,.2);font-size:15px}
.d-maison .mk-reg dt{flex:none;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#7a6560}
.d-maison .mk-reg dt::after{content:"";display:inline-block;width:32px;margin:0 0 3px 12px;border-bottom:1px dotted rgba(43,30,32,.4)}
.d-maison .mk-reg dd{min-width:0;margin:0 0 0 auto;text-align:right;font-family:var(--serif);font-variation-settings:var(--wonk);font-size:18px}
@media (max-width:620px){.d-maison .mk-reg div{display:grid;gap:4px}.d-maison .mk-reg dd{margin:0;text-align:left}}
.d-maison .mk-art{position:relative;justify-self:center;width:min(100%,520px)}
@media (min-width:980px){.d-maison .mk-art{justify-self:end;width:100%;max-width:540px}}
.d-maison .mk-gable{position:relative;aspect-ratio:5/6.6;clip-path:url(#mk-gable);background:var(--oxblood)}
@media (max-width:979px){.d-maison .mk-gable{aspect-ratio:5/5.6}}
.d-maison .mk-door{position:absolute;inset:0;clip-path:inset(0 50% 0 50%);animation:mk-door 1.9s var(--door) .45s forwards}
@keyframes mk-door{to{clip-path:inset(0 0 0 0)}}
.d-maison .mk-door img{width:100%;height:100%;object-fit:cover;transform:scale(1.16) translateY(calc(var(--p,0) * 3%));animation:mk-settle 2.6s var(--ease) .45s both}
@keyframes mk-settle{from{transform:scale(1.22)}to{transform:scale(1.04)}}
.d-maison .mk-gable::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;margin-left:-1px;background:linear-gradient(transparent,#fff6e2 30%,#fff6e2 70%,transparent);box-shadow:0 0 30px 8px rgba(255,236,196,.7);animation:mk-seam 1.9s var(--door) .45s forwards;pointer-events:none}
@keyframes mk-seam{0%{opacity:1;transform:scaleX(1)}70%{opacity:.6;transform:scaleX(60)}100%{opacity:0;transform:scaleX(90)}}
.d-maison .mk-gable-in{position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(90% 70% at 50% 30%,#7a2731,#5b1820 60%,#3d0f15)}
.d-maison .mk-gable-in b{font-family:var(--serif);font-variation-settings:var(--wonk);font-style:italic;font-weight:300;font-size:clamp(180px,26vw,360px);line-height:1;color:var(--brass-l);transform:translateY(8%)}
.d-maison .mk-gable-in ul{position:absolute;left:0;right:0;bottom:9%;display:grid;justify-items:center;gap:6px;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(244,234,219,.8)}
.d-maison .mk-sill{position:relative;height:16px;margin:0 -14px;background:linear-gradient(#e9dcc8,#d9c6aa);box-shadow:0 14px 30px -14px rgba(43,30,32,.45)}
.d-maison .mk-hero-fob{position:absolute;right:clamp(-8px,-1vw,0px);top:46%;z-index:2;width:clamp(58px,6vw,78px);height:auto;filter:drop-shadow(6px 14px 10px rgba(23,18,26,.3));animation:mk-fob-in 1.6s var(--ease) 1.5s both}
.d-maison .mk-hero-fob .mk-swing{animation:mk-sway 6s ease-in-out 3s infinite}
@keyframes mk-fob-in{from{opacity:0;transform:translateY(-30px) rotate(-20deg)}to{opacity:1;transform:none}}
.d-maison .mk-art figcaption{display:flex;justify-content:space-between;gap:16px;margin-top:16px;font-size:11.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#7a6560;animation:mk-fade 1s 1.8s both}
.d-maison .mk-sec{padding-block:var(--sec)}
.d-maison .mk-about{display:grid;gap:clamp(48px,7vw,110px);align-items:center}
@media (min-width:960px){.d-maison .mk-about{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}.d-maison .mk-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:980px}}
.d-maison .mk-about-pics{position:relative;padding:0 12% 14% 0}
.d-maison .mk-about-pics .mk-arch{position:relative;aspect-ratio:4/5;overflow:hidden;border-radius:999px 999px 2px 2px;background:var(--card-2)}
.d-maison .mk-about-pics .mk-arch img{width:100%;height:118%;object-fit:cover;transform:translateY(calc(var(--p,0) * -7%))}
.d-maison .mk-about-pics .mk-small{position:absolute;right:0;bottom:0;width:46%;aspect-ratio:1;overflow:hidden;border:10px solid var(--bg);border-radius:2px;background:var(--card-2)}
.d-maison .mk-about-pics .mk-small img{width:100%;height:100%;object-fit:cover}
.d-maison .mk-about-pics .mk-plq{position:absolute;left:50%;top:-14px;transform:translateX(-50%);min-width:60px;height:38px;font-size:17px}
.demo-js .d-maison .mk-arch[data-rv]{clip-path:inset(100% 0 0 0 round 999px 999px 0 0);opacity:1;transform:none;transition:clip-path 1.4s var(--door)}
.demo-js .d-maison .mk-arch[data-rv].in{clip-path:inset(0 0 0 0 round 999px 999px 0 0)}
.d-maison .mk-about-copy{display:grid;gap:22px}
.d-maison .mk-about-copy .mk-head{margin-bottom:10px}
.d-maison .mk-lead{font-family:var(--serif);font-variation-settings:var(--wonk);font-size:clamp(21px,1.9vw,28px);font-weight:340;line-height:1.38;letter-spacing:-.01em}
.d-maison .mk-lead::first-letter{float:left;margin:.06em .1em 0 0;font-size:3.3em;font-style:italic;font-weight:300;line-height:.8;color:var(--acc)}
.d-maison .mk-about-copy>p:not(.mk-lead){max-width:58ch;color:var(--dim)}
.d-maison .mk-ticks{display:grid;gap:0;margin-top:10px;border-top:1px solid var(--line)}
@media (min-width:640px){.d-maison .mk-ticks{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:28px}}
.d-maison .mk-ticks li{display:flex;align-items:center;gap:14px;padding:15px 0;border-bottom:1px solid var(--line);font-size:15.5px}
.d-maison .mk-ticks li::before{content:"";flex:none;width:9px;height:9px;border:1px solid var(--brass);transform:rotate(45deg)}
.d-maison .mk-suite{display:grid;gap:clamp(20px,3vw,40px)}
@media (min-width:980px){.d-maison .mk-suite{grid-template-columns:minmax(260px,.62fr) minmax(0,1.38fr);align-items:start}}
.d-maison .mk-doors{display:flex;gap:10px;margin-inline:calc(var(--pad) * -1);padding:4px var(--pad) 8px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:var(--pad);scrollbar-width:none}
.d-maison .mk-doors::-webkit-scrollbar{display:none}
@media (min-width:980px){.d-maison .mk-doors{position:sticky;top:110px;display:grid;margin:0;padding:0;overflow:visible;border-top:1px solid var(--line)}}
.d-maison .mk-doors button{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:4px 16px;flex:none;min-height:64px;padding:12px 18px 12px 12px;border:1px solid var(--line);border-radius:2px;background:none;text-align:left;scroll-snap-align:start;transition:background-color .4s var(--ease),border-color .4s,color .4s}
.d-maison .mk-doors button .mk-plq{grid-row:span 2;transition:transform .5s var(--ease)}
.d-maison .mk-doors .mk-dt{font-family:var(--serif);font-variation-settings:var(--wonk);font-size:clamp(19px,1.5vw,23px);line-height:1.15;white-space:nowrap}
.d-maison .mk-doors .mk-dp{font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}
.d-maison .mk-doors button[aria-selected="true"]{border-color:var(--oxblood);background:var(--oxblood);color:#f4eadb}
.d-maison .mk-doors button[aria-selected="true"] .mk-dp{color:rgba(244,234,219,.7)}
.d-maison .mk-doors button:hover .mk-plq{transform:rotate(-8deg)}
@media (min-width:980px){.d-maison .mk-doors button{min-height:84px;padding:16px 20px 16px 4px;border:0;border-bottom:1px solid var(--line)}.d-maison .mk-doors .mk-dt{white-space:normal}.d-maison .mk-doors button::after{content:"";position:absolute;left:-4px;right:-4px;top:-1px;bottom:-1px;z-index:-1;background:var(--oxblood);clip-path:inset(0 100% 0 0);transition:clip-path .6s var(--door)}.d-maison .mk-doors button[aria-selected="true"]{background:none;padding-left:18px}.d-maison .mk-doors button[aria-selected="true"]::after{clip-path:inset(0)}.d-maison .mk-doors button{transition:padding .6s var(--door),color .4s}}
.d-maison .mk-stagebox{position:relative;display:grid;gap:0}
.d-maison .mk-stage{position:relative;aspect-ratio:4/4.4;overflow:hidden;border-radius:2px;background:var(--card-2)}
@media (min-width:700px){.d-maison .mk-stage{aspect-ratio:16/11}}
.d-maison .mk-shot{position:absolute;inset:0;z-index:1;margin:0;clip-path:inset(0 0 0 100%);transition:clip-path 0s .95s}
.d-maison .mk-shot.is-on{z-index:2;clip-path:inset(0 0 0 0);transition:clip-path 1s var(--door)}
.d-maison .mk-shot img{width:100%;height:100%;object-fit:cover;transform:scale(1.1);transition:transform 1.8s var(--ease)}
.d-maison .mk-shot.is-on img{transform:scale(1)}
.d-maison .mk-stage-door{position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(80% 60% at 50% 40%,#e9dcc8,#d6c3a6)}
.d-maison .mk-stage-door>div{position:relative;width:min(56%,300px);aspect-ratio:1/2;border:10px solid #3d0f15;border-bottom:0;border-radius:999px 999px 0 0;background:linear-gradient(90deg,#5b1820,#6e2029 50%,#5b1820);box-shadow:inset 0 0 0 1px rgba(214,182,121,.4),0 30px 50px -30px rgba(23,18,26,.6)}
.d-maison .mk-stage-door>div::before,.d-maison .mk-stage-door>div::after{content:"";position:absolute;left:14%;right:14%;border:1px solid rgba(214,182,121,.35)}
.d-maison .mk-stage-door>div::before{top:14%;height:30%;border-radius:999px 999px 2px 2px}
.d-maison .mk-stage-door>div::after{top:52%;height:36%}
.d-maison .mk-stage-door i{position:absolute;right:12%;top:52%;width:12px;height:12px;border-radius:50%;background:var(--brass);box-shadow:0 0 0 3px rgba(214,182,121,.3)}
.d-maison .mk-stage-door .mk-plq{position:absolute;left:50%;top:46%;z-index:2;min-width:68px;height:42px;font-size:20px;opacity:0;transform:translate(-50%,8px);transition:opacity .4s,transform .6s var(--ease)}
.d-maison .mk-stage-door .mk-plq.is-on{opacity:1;transform:translate(-50%,0)}
.d-maison .mk-room{position:relative;z-index:3;display:grid;gap:14px;padding:clamp(24px,3vw,40px);background:var(--card);border:1px solid var(--line);border-top:0}
@media (min-width:980px){.d-maison .mk-room{width:min(78%,560px);margin:-120px 0 0 auto;border-top:1px solid var(--line);box-shadow:0 30px 60px -36px rgba(23,18,26,.45)}}
.d-maison .mk-room[hidden]{display:none}
.d-maison .mk-room:not([hidden])>*{animation:mk-rise .8s var(--ease) both;animation-delay:calc(var(--i,0) * 70ms)}
.d-maison .mk-room h3{font-size:clamp(28px,2.6vw,40px)}
.d-maison .mk-room p{color:var(--dim)}
.d-maison .mk-room-meta{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:10px 22px;padding-top:16px;border-top:1px solid var(--line)}
.d-maison .mk-room-meta span{font-size:12.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}
.d-maison .mk-room-meta b{font-family:var(--serif);font-variation-settings:var(--wonk);font-size:clamp(22px,2vw,28px);font-weight:400;color:var(--acc)}
.d-maison .mk-hangers{display:flex;gap:18px;margin-inline:calc(var(--pad) * -1);padding:30px var(--pad) 40px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:var(--pad);scrollbar-width:none}
.d-maison .mk-hangers::-webkit-scrollbar{display:none}
.d-maison .mk-hangers>li{flex:0 0 min(78%,320px);scroll-snap-align:start}
@media (min-width:900px){.d-maison .mk-hangers{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:clamp(18px,2.4vw,36px);margin:0;padding:30px 0 60px;overflow:visible}.d-maison .mk-hangers>li:nth-child(even){margin-top:56px}}
.d-maison .mk-hanger{position:relative;display:grid;gap:14px;align-content:start;height:100%;min-height:360px;padding:96px clamp(22px,2.4vw,32px) 34px;border-radius:30px 30px 4px 4px;background:var(--card);color:var(--fg);transform-origin:50% 50px;-webkit-mask:radial-gradient(circle at 50% 50px,transparent 21px,#000 22px);mask:radial-gradient(circle at 50% 50px,transparent 21px,#000 22px);box-shadow:inset 0 0 0 1px var(--line)}
.d-maison .mk-hangers>li:hover .mk-hanger{animation:mk-swing 1.8s var(--ease)}
.d-maison .mk-hangers>li:nth-child(3n+2) .mk-hanger{background:var(--hang);color:#f4eadb;--dim:rgba(244,234,219,.75);--acc:var(--brass-l)}
.d-maison .mk-hangers>li:nth-child(3n+3) .mk-hanger{background:var(--card-2)}
.d-maison .mk-hanger::before{content:"";position:absolute;left:50%;top:22px;width:56px;height:56px;margin-left:-28px;border:1px solid currentColor;border-radius:50%;opacity:.28}
.d-maison .mk-hanger::after{content:"";position:absolute;inset:auto 18px 16px;height:1px;background:repeating-linear-gradient(90deg,currentColor 0 4px,transparent 4px 8px);opacity:.25}
.d-maison .mk-hanger .mk-hno{position:absolute;right:20px;top:18px;font-family:var(--serif);font-style:italic;font-size:15px;opacity:.6}
.d-maison .mk-hanger .z-ico{width:52px;height:52px;border-color:currentColor;color:var(--acc);opacity:.95}
.d-maison .mk-hanger h3{font-size:clamp(23px,1.9vw,28px);line-height:1.1}
.d-maison .mk-hanger p{color:var(--dim);font-size:15.5px}
.d-maison .mk-rack{position:relative;padding:clamp(12px,1.6vw,20px);border-radius:3px;background:linear-gradient(180deg,#2c1d22,#1d1418);box-shadow:inset 0 0 0 1px rgba(214,182,121,.25),0 40px 70px -40px rgba(23,18,26,.7);color:#f4eadb}
.d-maison .mk-rack ol{display:flex;flex-wrap:wrap;gap:1px;background:rgba(214,182,121,.22);border:1px solid rgba(214,182,121,.22)}
.d-maison .mk-rack li{flex:1 1 100%}
@media (min-width:700px){.d-maison .mk-rack li{flex-basis:calc(50% - 1px)}}
@media (min-width:1100px){.d-maison .mk-rack li{flex-basis:calc(33.33% - 1px)}.d-maison .mk-rack .is-4 li,.d-maison .mk-rack .is-2 li{flex-basis:calc(50% - 1px)}}
@media (min-width:1300px){.d-maison .mk-rack .is-4 li{flex-basis:calc(25% - 1px)}}
.d-maison .mk-rack li{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 22px;align-content:start;padding:24px clamp(18px,2vw,28px) 30px;background:linear-gradient(180deg,#261a1f,#1f161a)}
.d-maison .mk-rack li::before{content:"";position:absolute;left:clamp(18px,2vw,28px);top:0;width:52px;height:6px;margin-left:5px;border-radius:0 0 4px 4px;background:linear-gradient(#d6b679,#8a6631)}
.d-maison .mk-rack .mk-fob{grid-row:span 3;width:52px;height:108px;margin-top:4px;transform-origin:50% 6%;transition:transform .8s var(--ease)}
.d-maison .mk-rack li:hover .mk-fob{animation:mk-swing 1.8s var(--ease)}
.d-maison .mk-rack h3{padding-top:8px;font-size:clamp(22px,1.8vw,27px);line-height:1.12}
.d-maison .mk-rack p{font-size:15px;color:rgba(244,234,219,.7)}
.demo-js .d-maison .mk-rack li[data-rv]{opacity:0;transform:none;transition:opacity 1s var(--ease)}
.demo-js .d-maison .mk-rack li[data-rv] .mk-fob{transform:translateY(-40px) rotate(-30deg);opacity:0;transition:transform 1.2s cubic-bezier(.3,1.5,.5,1),opacity .5s;transition-delay:calc(var(--i,0) * 120ms + .1s)}
.demo-js .d-maison .mk-rack li[data-rv].in{opacity:1}
.demo-js .d-maison .mk-rack li[data-rv].in .mk-fob{transform:none;opacity:1}
.d-maison .mk-salon{display:grid;gap:clamp(14px,2vw,30px);grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}
@media (min-width:900px){.d-maison .mk-salon{grid-template-columns:repeat(12,minmax(0,1fr));row-gap:clamp(40px,4vw,64px)}.d-maison .mk-salon>figure:nth-child(6n+1){grid-column:span 5}.d-maison .mk-salon>figure:nth-child(6n+2){grid-column:span 4;margin-top:70px}.d-maison .mk-salon>figure:nth-child(6n+3){grid-column:span 3;margin-top:20px}.d-maison .mk-salon>figure:nth-child(6n+4){grid-column:2/span 3;margin-top:30px}.d-maison .mk-salon>figure:nth-child(6n+5){grid-column:span 4}.d-maison .mk-salon>figure:nth-child(6n+6){grid-column:span 4;margin-top:50px}.d-maison .mk-salon.is-few>figure{grid-column:span 6!important;margin-top:0!important}}
.d-maison .mk-frame{position:relative;padding:clamp(8px,1vw,14px);background:var(--card);box-shadow:0 0 0 1px rgba(176,136,71,.45),0 26px 44px -30px rgba(23,18,26,.55);transition:transform .6s var(--ease),box-shadow .6s var(--ease)}
.d-maison .mk-frame::before{content:"";position:absolute;left:50%;top:-12px;width:34%;height:7px;border-radius:4px 4px 1px 1px;background:linear-gradient(#e4c88f,#8a6631);transform:translateX(-50%)}
.d-maison .mk-frame::after{content:"";position:absolute;left:10%;right:10%;top:-5px;height:60%;background:radial-gradient(60% 100% at 50% 0,rgba(255,232,184,.55),rgba(255,232,184,0));opacity:0;transition:opacity .6s;pointer-events:none}
.d-maison .mk-frame:hover{transform:translateY(-6px);box-shadow:0 0 0 1px rgba(176,136,71,.8),0 40px 60px -34px rgba(23,18,26,.6)}
.d-maison .mk-frame:hover::after{opacity:1}
.d-maison .mk-frame>div{overflow:hidden;aspect-ratio:4/5;background:var(--card-2)}
.d-maison .mk-salon>figure:nth-child(3n+1)>div{aspect-ratio:5/4}
.d-maison .mk-frame img{width:100%;height:112%;object-fit:cover;transform:translateY(calc(var(--p,0) * -5%))}
.d-maison .mk-carte-top{display:grid;gap:40px;margin-bottom:clamp(44px,6vw,80px)}
@media (min-width:980px){.d-maison .mk-carte-top{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);align-items:end}.d-maison .mk-carte-top .mk-head{margin:0}}
.d-maison .mk-carte-pic{position:relative;aspect-ratio:4/3;overflow:hidden;border-radius:999px 999px 2px 2px;box-shadow:0 0 0 1px rgba(214,182,121,.4),0 0 0 10px var(--card-2)}
.d-maison .mk-carte-pic img{width:100%;height:116%;object-fit:cover;transform:translateY(calc(var(--p,0) * -6%))}
.d-maison .mk-courses{display:grid;gap:clamp(44px,5vw,72px) clamp(32px,5vw,90px)}
@media (min-width:860px){.d-maison .mk-courses{grid-template-columns:repeat(2,minmax(0,1fr))}.d-maison .mk-courses.is-3{grid-template-columns:repeat(3,minmax(0,1fr))}.d-maison .mk-courses.is-1{grid-template-columns:minmax(0,760px);justify-content:center}}
.d-maison .mk-course h3{display:flex;align-items:center;gap:18px;margin-bottom:12px;font-size:clamp(26px,2.3vw,34px);font-style:italic;font-weight:300;color:var(--acc)}
.d-maison .mk-course h3::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,var(--acc),transparent);opacity:.5}
.d-maison .mk-course li{position:relative;display:flex;align-items:baseline;justify-content:space-between;gap:20px;padding:16px 0 16px 0;border-bottom:1px solid var(--line);transition:padding .5s var(--ease)}
.d-maison .mk-course li::before{content:"";position:absolute;left:0;top:50%;width:8px;height:8px;border:1px solid var(--acc);transform:translateY(-50%) rotate(45deg) scale(0);transition:transform .5s var(--ease)}
.d-maison .mk-course li:hover{padding-left:24px}
.d-maison .mk-course li:hover::before{transform:translateY(-50%) rotate(45deg) scale(1)}
.d-maison .mk-course b{display:block;font-family:var(--serif);font-variation-settings:var(--wonk);font-size:clamp(19px,1.5vw,22px);font-weight:400;line-height:1.25}
.d-maison .mk-course p{margin-top:4px;font-size:14.5px;line-height:1.5;color:var(--dim)}
.d-maison .mk-course small{display:inline-block;margin-top:8px;margin-right:6px;padding:2px 9px;border:1px solid var(--line);border-radius:999px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}
.d-maison .mk-course .mk-pr{flex:none;font-family:var(--serif);font-size:18px;font-variant-numeric:lining-nums tabular-nums;color:var(--acc)}
.d-maison .mk-carte-note{margin-top:clamp(36px,4vw,56px);max-width:70ch;font-size:14px;color:var(--dim)}
.d-maison .mk-carte-note::before{content:"";display:block;width:40px;height:1px;margin-bottom:16px;background:var(--acc)}
.d-maison .mk-desk{display:grid;gap:26px;padding:clamp(26px,3.4vw,48px);border:1px solid var(--line);border-radius:2px;background:var(--card)}
.d-maison .mk-desk h3{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;font-size:clamp(24px,2vw,30px)}
.d-maison .mk-desk .mk-now{border-color:var(--line);color:var(--fg)}
.d-maison .mk-clock{position:relative;justify-self:center;width:clamp(150px,16vw,200px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,var(--card) 58%,rgba(0,0,0,0) 59%),repeating-conic-gradient(var(--acc) 0 .6deg,rgba(0,0,0,0) .6deg 30deg),var(--card-2);box-shadow:0 0 0 1px var(--acc),0 0 0 9px var(--card-2),0 0 0 10px rgba(214,182,121,.45),0 30px 40px -24px rgba(0,0,0,.6)}
.d-maison .mk-clock i{position:absolute;left:50%;bottom:50%;width:3px;margin-left:-1.5px;border-radius:2px;background:var(--fg);transform-origin:50% 100%}
.d-maison .mk-clock .h{height:26%;transform:rotate(var(--hr,300deg))}
.d-maison .mk-clock .m{width:2px;margin-left:-1px;height:38%;background:var(--acc);transform:rotate(var(--mn,60deg))}
.d-maison .mk-clock b{position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:var(--acc)}
.d-maison .mk-clock span{position:absolute;left:0;right:0;top:64%;text-align:center;font-family:var(--serif);font-style:italic;font-size:13px;color:var(--dim)}
.d-maison .z-hours{border-color:var(--line)}
.d-maison .z-hours div{position:relative;padding:15px 4px;transition:padding .4s var(--ease)}
.d-maison .z-hours dt{font-weight:500}
.d-maison .z-hours dd{font-variant-numeric:tabular-nums}
.d-maison .z-hours div.is-today{padding-inline:18px 6px;background:linear-gradient(90deg,rgba(214,182,121,.2),rgba(214,182,121,0))}
.d-maison .z-hours div.is-today::before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:3px;background:var(--brass)}
.d-maison .z-hours div.is-today dt{font-weight:700}
.d-maison .z-hours div.is-today dd{color:var(--fg)}
.d-maison .mk-split{display:grid;gap:clamp(44px,6vw,100px)}
@media (min-width:960px){.d-maison .mk-split{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.d-maison .mk-copy{display:grid;gap:22px;align-content:start}
.d-maison .mk-copy .mk-head{margin-bottom:6px}
.d-maison .mk-copy>p{max-width:54ch;color:var(--dim)}
.d-maison .z-reach a{color:var(--fg)}
.d-maison .mk-plan{display:grid;gap:clamp(44px,6vw,90px)}
@media (min-width:1000px){.d-maison .mk-plan{grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);align-items:start}.d-maison .mk-plan-copy{position:sticky;top:110px}}
.d-maison .mk-plan-copy{display:grid;gap:24px;align-content:start}
.d-maison .mk-plan-copy .mk-head{margin-bottom:0}
.d-maison .mk-plan-copy>p{max-width:52ch;color:var(--dim)}
.d-maison .mk-keycard{position:relative;display:grid;gap:22px;width:min(100%,430px);margin-top:12px;padding:30px 30px 26px;border-radius:14px;background:linear-gradient(135deg,#6e2029,#5b1820 40%,#3d0f15);color:#f4eadb;box-shadow:inset 0 0 0 1px rgba(214,182,121,.35),0 40px 60px -34px rgba(23,18,26,.7);transform:rotate(-2deg);transition:transform .8s var(--ease)}
.d-maison .mk-keycard:hover{transform:rotate(0) translateY(-4px)}
.d-maison .mk-keycard::before{content:"";position:absolute;inset:8px;border:1px solid rgba(214,182,121,.3);border-radius:9px;pointer-events:none}
.d-maison .mk-keycard::after{content:"";position:absolute;right:28px;top:28px;width:44px;height:34px;border-radius:6px;background:linear-gradient(135deg,#e4c88f,#9c7638);box-shadow:inset 0 0 0 1px rgba(255,240,205,.5);-webkit-mask:linear-gradient(#000 0 0) 0 0/100% 100%,repeating-linear-gradient(90deg,transparent 0 10px,#000 10px 11px);mask:linear-gradient(#000 0 0)}
.d-maison .mk-kc-name{max-width:calc(100% - 64px);font-family:var(--serif);font-variation-settings:var(--wonk);font-style:italic;font-size:26px;font-weight:300;line-height:1.1}
.d-maison .mk-keycard dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 20px}
.d-maison .mk-keycard dl>div:nth-child(3){grid-column:1/-1}
.d-maison .mk-keycard dt{font-size:10.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(244,234,219,.6)}
.d-maison .mk-keycard dd{margin:4px 0 0;font-family:var(--serif);font-size:22px;line-height:1.2;color:var(--brass-l);overflow-wrap:break-word}
.d-maison .mk-keycard .mk-strip{height:22px;margin:0 -30px;background:repeating-linear-gradient(90deg,rgba(23,18,26,.6) 0 2px,rgba(23,18,26,.85) 2px 5px)}
.d-maison .mk-desk-form{padding:clamp(24px,3.4vw,48px);border:1px solid var(--line);border-radius:2px;background:var(--card);box-shadow:0 40px 70px -50px rgba(23,18,26,.6)}
.d-maison .mk-desk-form .z-form{gap:24px}
.d-maison .mk-desk-form fieldset{margin:0 0 24px;padding:0;border:0;min-width:0}
.d-maison .mk-desk-form legend{margin-bottom:10px;padding:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--dim)}
.d-maison .mk-opts{display:flex;flex-wrap:wrap;gap:8px}
.d-maison .mk-opts button{min-height:46px;padding:0 18px;border:1px solid var(--line);border-radius:999px;background:none;font-size:15px;transition:background-color .3s,color .3s,border-color .3s}
.d-maison .mk-opts button:hover{border-color:var(--acc)}
.d-maison .mk-opts button[aria-pressed="true"]{border-color:var(--oxblood);background:var(--oxblood);color:#f4eadb}
.d-maison .z-chips button{font-family:var(--serif);font-size:18px}
.d-maison .z-chips button[aria-pressed="true"]{border-color:var(--oxblood);background:var(--oxblood);color:#f4eadb}
.d-maison .z-field label{font-size:11.5px;letter-spacing:.14em}
.d-maison .z-field input,.d-maison .z-field select,.d-maison .z-field textarea{border-width:0 0 1px;padding-inline:2px;background:transparent}
.d-maison .z-field input:focus,.d-maison .z-field select:focus,.d-maison .z-field textarea:focus{border-color:var(--acc)}
.d-maison .z-field select{background:linear-gradient(45deg,transparent 50%,currentColor 50%) calc(100% - 12px) 55%/6px 6px no-repeat,linear-gradient(-45deg,transparent 50%,currentColor 50%) calc(100% - 6px) 55%/6px 6px no-repeat}
.d-maison .z-field textarea{border-width:1px;padding:12px}
.d-maison .form-status{border-color:var(--acc)}
.d-maison .mk-loc{overflow:hidden;padding-bottom:0}
.d-maison .mk-loc .mk-split{padding-bottom:clamp(40px,5vw,80px)}
.d-maison .mk-city{display:block;margin-top:clamp(20px,4vw,60px);padding-inline:var(--pad);font-family:var(--serif);font-variation-settings:var(--wonk);font-style:italic;font-weight:300;font-size:clamp(64px,17vw,300px);line-height:1;padding-bottom:.12em;letter-spacing:-.04em;white-space:nowrap;color:transparent;-webkit-text-stroke:1px rgba(214,182,121,.5);transform:translateX(calc(var(--p,0) * -6%));text-align:center}
.d-maison .mk-stars{position:absolute;inset:0;z-index:-1;background:radial-gradient(1px 1px at 12% 22%,rgba(255,240,205,.7),transparent),radial-gradient(1px 1px at 32% 12%,rgba(255,240,205,.5),transparent),radial-gradient(1.5px 1.5px at 58% 28%,rgba(255,240,205,.6),transparent),radial-gradient(1px 1px at 78% 10%,rgba(255,240,205,.6),transparent),radial-gradient(1px 1px at 88% 34%,rgba(255,240,205,.4),transparent),radial-gradient(1px 1px at 44% 40%,rgba(255,240,205,.35),transparent),radial-gradient(1.5px 1.5px at 22% 48%,rgba(255,240,205,.3),transparent);opacity:.8;animation:mk-twinkle 9s ease-in-out infinite alternate;pointer-events:none}
@keyframes mk-twinkle{from{opacity:.45}to{opacity:.9}}
.d-maison .z-panel{border-color:var(--line);background:var(--card)}
.d-maison .z-statement{text-align:center}
.d-maison .z-statement h2{max-width:24ch;margin-inline:auto;font-weight:300;line-height:1.1}
.d-maison .z-statement .mk-kick{justify-content:center}
.d-maison .z-statement .z-center::before{content:"";display:block;width:26px;height:54px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 132'%3E%3Ccircle cx='32' cy='13' r='10' fill='none' stroke='%23b08847' stroke-width='3'/%3E%3Cpath d='M32 27C50 27 57 44 57 64C57 92 43 112 32 128C21 112 7 92 7 64C7 44 14 27 32 27Z' fill='%235b1820'/%3E%3C/svg%3E") center/contain no-repeat;animation:mk-sway 6s ease-in-out infinite;transform-origin:50% 10%}
.d-maison .z-statement p{font-size:12px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--dim)}
.d-maison .z-showcase.has-pic{min-height:min(92svh,860px)}
.d-maison .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(23,18,26,.05) 30%,rgba(23,18,26,.82))}
.d-maison .z-show-in h2{max-width:16ch;font-size:clamp(40px,6vw,96px);font-weight:300}
.d-maison .z-show-in>p{font-size:clamp(16px,1.3vw,19px);opacity:.9}
.d-maison .z-showcase .mk-alt{border-color:rgba(255,255,255,.7)}
.d-maison .z-showcase .mk-alt:hover{background:#f4eadb;color:#17121a}
.d-maison .z-acc{border-color:var(--line)}
.d-maison .z-acc details{border-color:var(--line)}
.d-maison .z-acc summary{font-family:var(--serif);font-variation-settings:var(--wonk);font-size:clamp(19px,1.6vw,24px);font-weight:340;line-height:1.3;transition:color .3s,padding .5s var(--ease)}
.d-maison .z-acc summary:hover{color:var(--acc);padding-left:8px}
.d-maison .z-acc summary i{width:18px;height:18px;border:1px solid currentColor;border-radius:50%}
.d-maison .z-acc summary i::before,.d-maison .z-acc summary i::after{left:4px;width:8px}
.d-maison .z-acc details>p{color:var(--dim)}
.d-maison .z-acc details[open]>p{animation:mk-rise .6s var(--ease)}
.d-maison .z-cards .z-card{border-radius:2px;transition:transform .6s var(--ease),box-shadow .6s var(--ease)}
.d-maison .z-cards .z-card:hover{transform:translateY(-6px);box-shadow:0 30px 50px -36px rgba(23,18,26,.55)}
.d-maison .z-pack.is-featured{background:var(--oxblood);color:#f4eadb;border-color:var(--oxblood);--z-dim:rgba(244,234,219,.75);--z-ink:#f4eadb;--z-accent:var(--brass-l)}
.d-maison .z-pack h3{font-size:clamp(26px,2.2vw,34px)}
.d-maison .z-tag{display:inline-flex;align-self:start;justify-self:start;padding:5px 12px;border:1px solid currentColor;border-radius:999px}
.d-maison .z-grid .z-ico,.d-maison .z-channel .z-ico{color:var(--acc);border-color:var(--line)}
.d-maison .z-steps small,.d-maison .z-rows small{font-family:var(--serif);font-size:15px;font-style:italic;letter-spacing:0}
.d-maison .z-quotes blockquote>p{font-weight:300;font-style:italic}
.d-maison .z-cta h2{font-size:clamp(36px,5vw,76px);font-weight:300}
.d-maison .z-team .z-pic{border-radius:999px 999px 2px 2px}
.d-maison .mk-foot{position:relative;padding:clamp(80px,9vw,140px) 0 120px;background:radial-gradient(560px circle at var(--mx,50%) var(--my,-40%),rgba(214,182,121,.12),rgba(214,182,121,0) 70%),linear-gradient(#17121a,#0d0a0f 60%);color:#f4eadb;overflow:hidden;--tone:dark;--fg:#f4eadb;--dim:rgba(244,234,219,.62);--line:rgba(244,234,219,.14);--acc:var(--brass-l)}
.d-maison .mk-foot-top{display:grid;gap:44px;align-items:end;padding-bottom:clamp(48px,6vw,90px);border-bottom:1px solid var(--line)}
@media (min-width:900px){.d-maison .mk-foot-top{grid-template-columns:auto minmax(0,1fr)}}
.d-maison .mk-foot-fob{width:clamp(70px,7vw,96px);height:auto}
.d-maison .mk-foot-fob .mk-swing{animation:mk-sway 7s ease-in-out infinite}
.d-maison .mk-foot-name{font-family:var(--serif);font-variation-settings:var(--wonk);font-size:clamp(48px,9vw,150px);font-weight:300;line-height:.92;letter-spacing:-.035em}
.d-maison .mk-foot-name em{font-style:italic;color:var(--brass-l)}
.d-maison .mk-foot-grid{display:grid;gap:40px;padding-block:clamp(44px,5vw,72px);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-maison .mk-foot-grid h3{margin-bottom:16px;font-family:"Hanken Grotesk",sans-serif;font-size:11.5px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--brass-l)}
.d-maison .mk-foot-grid div{display:grid;gap:4px;align-content:start;justify-items:start}
.d-maison .mk-foot-grid a,.d-maison .mk-foot-grid span{display:inline-flex;align-items:center;min-height:36px;color:var(--dim);transition:color .3s}
.d-maison .mk-foot-grid a:hover{color:#f4eadb}
.d-maison .mk-foot-grid>p{max-width:40ch;color:var(--dim)}
.d-maison .mk-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 30px;padding-top:28px;border-top:1px solid var(--line);font-size:13px;color:var(--dim)}
.d-maison.no-photos .mk-hero{min-height:0}
@media (prefers-reduced-motion:reduce){.d-maison .mk-door{clip-path:none;animation:none}.d-maison .mk-gable::after{display:none}.d-maison .mk-beam,.d-maison .mk-stars{animation:none}.d-maison .mk-shot{transition:none}}
`.trim();

/* Rules that restyle the kit's shared sections (.z-*) and form parts go in `extra`: they load after the shared defaults. */
const isKit = (l: string) => /\.z-|form-(status|note)/.test(l);
const CSS = SHEET.split("\n").filter((l) => !isKit(l)).join("");
const EXTRA = SHEET.split("\n").filter(isKit).join("");

/**
 * The house's own behaviour: the clock in the header runs from morning to night with the scroll,
 * the header turns dark over the evening rooms, a lamp follows the pointer in the dark, the lobby
 * clock shows the real time in Amsterdam, the room photographs load before their doors open and
 * the needle of the lift dial points at the floor under the pointer.
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-maison');if(!root)return;
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var clocks=q('[data-mk-clock]'),hdr=d.querySelector('.mk-hdr'),raf=0,last=null;
function pad(n){return (n<10?'0':'')+n}
function frame(){raf=0;var max=Math.max(1,d.documentElement.scrollHeight-W.innerHeight),p=Math.min(1,Math.max(0,W.scrollY/max)),m=Math.round((420+p*990)/5)*5,t=pad(Math.floor(m/60)%24)+':'+pad(m%60);
clocks.forEach(function(c){if(c.textContent!==t)c.textContent=t});root.style.setProperty('--sun',p.toFixed(3));
if(hdr){var el=d.elementFromPoint(W.innerWidth/2,hdr.getBoundingClientRect().bottom+2),s=el&&el.closest?el.closest('main>section,footer'):null;if(s!==last){last=s;hdr.classList.toggle('is-dark',!!s&&getComputedStyle(s).getPropertyValue('--tone').trim()==='dark')}}}
function onScroll(){if(!raf)raf=requestAnimationFrame(frame)}
frame();W.addEventListener('scroll',onScroll,{passive:true});W.addEventListener('resize',onScroll);
if(!reduce&&W.matchMedia('(pointer: fine)').matches){var gx=0,gy=0,gs=null,gr=0;d.addEventListener('pointermove',function(e){var s=e.target&&e.target.closest?e.target.closest('main>section,footer'):null;if(!s)return;gs=s;gx=e.clientX;gy=e.clientY;if(!gr)gr=requestAnimationFrame(function(){gr=0;var r=gs.getBoundingClientRect();gs.style.setProperty('--mx',Math.round(gx-r.left)+'px');gs.style.setProperty('--my',Math.round(gy-r.top)+'px')})},{passive:true})}
var faces=q('.mk-clock');function time(){var h=0,m=0;try{var o={};new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Amsterdam',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).forEach(function(x){o[x.type]=x.value});h=+o.hour;m=+o.minute}catch(e){var n=new Date();h=n.getHours();m=n.getMinutes()}faces.forEach(function(c){c.style.setProperty('--hr',((h%12)*30+m/2)+'deg');c.style.setProperty('--mn',(m*6)+'deg')})}
if(faces.length){time();setInterval(time,30000)}
q('.mk-stage').forEach(function(st){function load(){q('img',st).forEach(function(im){im.loading='eager'})}if(!('IntersectionObserver' in W)){load();return}var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){load();io.disconnect()}},{rootMargin:'800px 0px'});io.observe(st)});
var menu=d.getElementById('site-menu');if(menu){var links=q('nav a',menu);menu.style.setProperty('--step',(160/Math.max(1,links.length))+'deg');links.forEach(function(a,k){a.addEventListener('pointerenter',function(){menu.style.setProperty('--k',String(k+.5))});a.addEventListener('focus',function(){menu.style.setProperty('--k',String(k+.5))})})}
})();`.replace(/\n/g, "");

/* ── pieces ── */

/** Labels this design needs that the shared strings do not have. */
const WORDS: Record<string, { nights: string; room: string }> = {
  nl: { nights: "Nachten", room: "Kamer" },
  en: { nights: "Nights", room: "Room" },
  de: { nights: "Nächte", room: "Zimmer" },
  fr: { nights: "Nuits", room: "Chambre" },
};
const words = (c: Ctx) => WORDS[c.spec.meta.lang] ?? WORDS.nl;
const no = (n: number) => String(n).padStart(2, "0");

/** Section numbers, per page, in the order the headings are rendered. */
const counters = new WeakMap<Ctx, number>();
const nextNo = (c: Ctx) => {
  const n = (counters.get(c) ?? 1) + 1;
  counters.set(c, n);
  return no(n);
};

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 10h13M11.5 5.5 16 10l-4.5 4.5" />
  </svg>
);

/** An old hotel key tag on its ring. Decoration only. */
function Fob({ label, className }: { label: string; className?: string }) {
  return (
    <svg className={`mk-fob${className ? ` ${className}` : ""}`} viewBox="0 0 64 132" aria-hidden="true">
      <g className="mk-swing">
        <circle className="fr" cx="32" cy="13" r="10" />
        <rect className="fl" x="28" y="21" width="8" height="9" rx="2" />
        <path className="fb" d="M32 27C50 27 57 44 57 64C57 92 43 112 32 128C21 112 7 92 7 64C7 44 14 27 32 27Z" />
        <path className="fh" d="M32 27C50 27 57 44 57 64C57 70 56.6 75 55.6 80C46 60 30 46 12 42C16 33 23 27 32 27Z" />
        <path className="fs" d="M32 33C46 33 51 47 51 64C51 88 40 105 32 119C24 105 13 88 13 64C13 47 18 33 32 33Z" />
        <text x="32" y="70">
          {label}
        </text>
      </g>
    </svg>
  );
}

function Head({ c, kicker, title, intro, id, split }: HeadProps & { c: Ctx; split?: boolean }) {
  return (
    <header className={`mk-head${split && intro ? " is-split" : ""}`}>
      <p className="mk-kick" data-rv>
        <span className="mk-plq" aria-hidden="true">
          {nextNo(c)}
        </span>
        {kicker}
      </p>
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? (
        <p className="mk-intro" data-rv>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

/** The headline word by word, each one swinging open like a door. */
function DoorWords({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let k = 0;
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => {
        if (out.length) out.push(" ");
        out.push(
          <span className="mk-w" key={k}>
            <span style={i(k)}>{n % 2 ? <em>{w}</em> : w}</span>
          </span>,
        );
        k++;
      }),
  );
  return <>{out}</>;
}

/**
 * Menu labels: a section title short enough is used as it is, a longer one by its first phrase
 * ("Vijf kamers, vijf deuren" becomes "Vijf kamers"); otherwise the shared label.
 */
const navOf = (c: Ctx) =>
  c.nav.map((n) => {
    const s = c.spec.sections.find((x) => x.id === n.id);
    const title = (s?.title ?? "").replace(/\*/g, "").trim();
    const head = title.split(/\s*[,:;–—]\s+|\s+[–—-]\s+/)[0];
    return { id: n.id, label: title.length <= 16 && title ? title : head.length >= 3 && head.length <= 18 && head !== title ? head : n.label };
  });

const bookingHref = (c: Ctx) => {
  const b = c.spec.sections.find((s) => s.type === "booking") ?? c.spec.sections.find((s) => s.type === "contact");
  return b ? `#${b.id}` : c.spec.hero.primaryCta.href;
};

/* ── header, opening, footer ── */

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          {/* A canal-house bell gable, in fractions of the box it frames. */}
          <clipPath id="mk-gable" clipPathUnits="objectBoundingBox">
            <path d="M0 1V.25C.1 .25 .16 .235 .2 .2C.24 .165 .25 .12 .3 .1C.34 .085 .36 .07 .37 .045C.39 .015 .44 0 .5 0C.56 0 .61 .015 .63 .045C.64 .07 .66 .085 .7 .1C.75 .12 .76 .165 .8 .2C.84 .235 .9 .25 1 .25V1Z" />
          </clipPath>
        </defs>
      </svg>
      <header className="mk-hdr hdr">
        <div className="mk-wrap mk-bar">
          <a href="#top" className="mk-logo" aria-label={c.name}>
            <Fob label={c.name.charAt(0)} />
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="mk-links" data-nav>
            {navOf(c).slice(0, 5).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <span className="mk-time" aria-hidden="true">
            <span className="mk-dial">
              <i />
            </span>
            <span data-mk-clock>07:00</span>
          </span>
          <a href={cta.href} className="btn mk-fill mk-cta">
            {cta.label}
          </a>
          <button type="button" className="mk-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <Fob label={c.name.charAt(0)} />
          </button>
        </div>
      </header>
      <div id="site-menu" className="mk-menu" data-nav inert>
        <div className="mk-gauge" aria-hidden="true">
          <i />
          <b />
        </div>
        <nav aria-label={c.t.menu}>
          {navOf(c).map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <span className="mk-plq" aria-hidden="true">
                {no(k + 1)}
              </span>
              <span>{n.label}</span>
              <Arrow />
            </a>
          ))}
        </nav>
        <div className="mk-menu-foot">
          <a href={cta.href} className="btn mk-fill">
            {cta.label}
          </a>
          <span>
            {b.city ?? b.address}
            {b.phone ? (
              <>
                {" · "}
                <a href={tel(b.phone)}>{b.phone}</a>
              </>
            ) : null}
          </span>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const b = c.spec.business;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 52 ? "is-s" : plain.length > 30 ? "is-m" : "";
  const facts = heroFacts(c);
  const offer = offerWords(c, 3);
  return (
    <section className="mk-hero">
      <span className="mk-beam" aria-hidden="true" />
      <div className="mk-wrap mk-hero-grid">
        <div className="mk-hero-copy">
          <p className="mk-eyebrow">
            <span className="mk-plq" aria-hidden="true">
              {no(1)}
            </span>
            {hero.eyebrow || b.city}
            <NowBadge c={c} className="mk-now" />
          </p>
          <h1 className={`mk-h1 ${size}`.trim()}>
            <DoorWords text={hero.headline} />
          </h1>
          <p className="mk-lede">{hero.subheadline}</p>
          <div className="mk-ctas">
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label} <Arrow />
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label} <Arrow />
              </Btn>
            ) : null}
          </div>
        </div>
        {facts.length > 0 && (
          <dl className="mk-reg">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <figure className="mk-art">
          <div className="mk-gable">
            {p ? (
              <div className="mk-door" data-px>
                <Pic p={p} eager sizes="(min-width: 980px) 40vw, 92vw" />
              </div>
            ) : (
              <div className="mk-gable-in" aria-hidden="true">
                <b>{c.name.charAt(0)}</b>
                {offer.length > 0 && (
                  <ul>
                    {offer.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className="mk-sill" aria-hidden="true" />
          <Fob label={hero.note && hero.note.length <= 4 ? hero.note : no(1)} className="mk-hero-fob" />
          <figcaption aria-hidden="true">
            <span>{c.name}</span>
            <span>{b.city ?? ""}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const parts = c.name.split(" ");
  return (
    <footer className="mk-foot">
      <span className="mk-stars" aria-hidden="true" />
      <div className="mk-wrap">
        <div className="mk-foot-top">
          <Fob label={c.name.charAt(0)} className="mk-foot-fob" />
          <p className="mk-foot-name" aria-hidden="true">
            {parts.length > 1 ? (
              <>
                {parts.slice(0, -1).join(" ")} <em>{parts[parts.length - 1]}</em>
              </>
            ) : (
              <em>{c.name}</em>
            )}
          </p>
        </div>
        <div className="mk-foot-grid">
          <div>
            <h3>{c.t.explore}</h3>
            {navOf(c).map((n) => (
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
                {c.t.route} →
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
        <Legal c={c} className="mk-legal" />
      </div>
    </footer>
  );
}

/* ── the family ── */

export const maison: Family = {
  key: "maison",
  root: "d-maison",
  fonts: ["Fraunces Soft", "Hanken Grotesk"],
  themeColor: "#f7f1e7",
  accent: "#5b1820",
  onAccent: "#f7f1e7",
  css: CSS,
  extra: EXTRA,
  js: JS + TODAY_JS,
  cls: { wrap: "mk-wrap", eyebrow: "mk-kick", btn: "mk-fill", btnAlt: "mk-alt", btnText: "mk-txt" },
  Header,
  Hero,
  Footer,
  Head: (p, c) => <Head c={c} {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const small = p ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="mk-sec" id={s.id}>
          <div className={`mk-wrap mk-about${p ? "" : " is-solo"}`}>
            {p ? (
              <div className="mk-about-pics">
                <figure className="mk-arch" data-rv>
                  <div data-px style={{ height: "100%" }}>
                    <Pic p={p} sizes="(min-width: 960px) 38vw, 88vw" />
                  </div>
                </figure>
                {small ? (
                  <figure className="mk-small" data-rv style={i(2)}>
                    <Pic p={small} sizes="(min-width: 960px) 18vw, 40vw" />
                  </figure>
                ) : null}
              </div>
            ) : null}
            <div className="mk-about-copy">
              <Head c={c} kicker={c.t.kick.about} title={s.title} />
              <p className="mk-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="mk-ticks" data-rv>
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
      const pics = s.items.map((_, n) => c.photo(`art:svc${n}`));
      const any = pics.some(Boolean);
      const tab = (n: number) => `${s.id}-door-${n}`;
      const panel = (n: number) => `${s.id}-room-${n}`;
      const many = s.items.length > 1;
      const href = bookingHref(c);
      return (
        <section className="mk-sec" id={s.id}>
          <div className="mk-wrap">
            <Head c={c} title={s.title} intro={s.intro} split />
            <div className="mk-suite" data-rv>
              {many ? (
                <div className="mk-doors" role="tablist" aria-label={s.title.replace(/\*/g, "")}>
                  {s.items.map((it, n) => (
                    <button key={n} type="button" role="tab" id={tab(n)} aria-selected={n === 0} aria-controls={panel(n)} tabIndex={n === 0 ? 0 : -1}>
                      <span className="mk-plq" aria-hidden="true">
                        {no(n + 1)}
                      </span>
                      <span className="mk-dt">{it.title}</span>
                      {it.price || it.duration ? <span className="mk-dp">{it.price ?? it.duration}</span> : null}
                    </button>
                  ))}
                </div>
              ) : null}
              <div className="mk-stagebox">
                <div className="mk-stage">
                  {any ? (
                    s.items.map((it, n) => {
                      const p = pics[n] ?? pics.find(Boolean)!;
                      return (
                        <figure key={n} className={`mk-shot${n === 0 ? " is-on" : ""}`} data-tab={many ? tab(n) : undefined}>
                          <Pic p={p} sizes="(min-width: 980px) 60vw, 100vw" />
                        </figure>
                      );
                    })
                  ) : (
                    <div className="mk-stage-door" aria-hidden="true">
                      <div>
                        <i />
                        {s.items.map((_, n) => (
                          <span key={n} className={`mk-plq${n === 0 ? " is-on" : ""}`} data-tab={many ? tab(n) : undefined}>
                            {no(n + 1)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {s.items.map((it, n) => (
                  <div key={n} className="mk-room" id={panel(n)} role={many ? "tabpanel" : undefined} aria-labelledby={many ? tab(n) : undefined} hidden={n > 0}>
                    <h3 style={i(0)}>{it.title}</h3>
                    <p style={i(1)}>{it.description}</p>
                    <div className="mk-room-meta" style={i(2)}>
                      {it.duration ? <span>{it.duration}</span> : <span>{no(n + 1)}</span>}
                      {it.price ? <b>{it.price}</b> : null}
                    </div>
                    <p style={i(3)}>
                      <Btn c={c} href={href} variant="text">
                        {c.spec.hero.primaryCta.label} <Arrow />
                      </Btn>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="mk-sec" id={s.id}>
        <div className="mk-wrap">
          <Head c={c} title={s.title} intro={s.intro} split />
          <ul className="mk-hangers">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 4)}>
                <div className="mk-hanger">
                  <span className="mk-hno" aria-hidden="true">
                    {no(n + 1)}
                  </span>
                  <span className="z-ico">
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
      <section className="mk-sec" id={s.id}>
        <div className="mk-wrap">
          <Head c={c} kicker={c.t.kick.process} title={s.title} intro={s.intro} split />
          <div className="mk-rack">
            <ol className={`is-${s.steps.length}`}>
              {s.steps.map((st, n) => (
                <li key={n} data-rv style={i(n)}>
                  <Fob label={no(n + 1)} />
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
      return (
        <section className="mk-sec" id={s.id}>
          <div className="mk-wrap">
            <Head c={c} kicker={c.t.kick.gallery} title={s.title} />
            <div className={`mk-salon${pics.length < 3 ? " is-few" : ""}`}>
              {pics.slice(0, 9).map((p, n) => (
                <figure key={n} className="mk-frame" data-rv style={i(n % 3)}>
                  <div data-px>
                    <Pic p={p} sizes="(min-width: 900px) 34vw, 46vw" />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      const p = c.spare();
      return (
        <section className="mk-sec" id={s.id}>
          <div className="mk-wrap">
            <div className="mk-carte-top">
              <Head c={c} kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
              {p ? (
                <figure className="mk-carte-pic" data-rv>
                  <div data-px style={{ height: "100%" }}>
                    <Pic p={p} sizes="(min-width: 980px) 34vw, 92vw" />
                  </div>
                </figure>
              ) : null}
            </div>
            <div className={`mk-courses${cats.length === 1 ? " is-1" : cats.length % 3 === 0 ? " is-3" : ""}`}>
              {cats.map((cat, n) => (
                <div key={n} className="mk-course" data-rv style={i(n % 3)}>
                  <h3>{cat.name}</h3>
                  <ul>
                    {cat.items.map((d, m) => (
                      <li key={m}>
                        <div>
                          <b>{d.name}</b>
                          {d.description ? <p>{d.description}</p> : null}
                          {d.tags?.map((t) => (
                            <small key={t}>{t}</small>
                          ))}
                        </div>
                        {d.price ? <span className="mk-pr">{d.price}</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {s.note ? (
              <p className="mk-carte-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="mk-sec" id={s.id}>
        <div className="mk-wrap mk-split">
          <div className="mk-copy">
            <Head c={c} kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="mk-desk" data-rv>
            <div className="mk-clock" aria-hidden="true">
              <i className="h" />
              <i className="m" />
              <b />
              <span>{c.spec.business.city ?? ""}</span>
            </div>
            <h3>
              {c.t.hours}
              <NowBadge c={c} className="mk-now" />
            </h3>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    booking: (s, c) => {
      const w = words(c);
      const hay = [s.title, s.body, ...s.options, c.spec.business.name, c.spec.business.tagline].join(" ");
      const stay = s.kind === "reservation" && /hotel|kamer|room|zimmer|chambre|suite|overnacht|verblijf|stay|nacht|night|b&b|logies|lodge/i.test(hay);
      const opts = s.kind === "reservation" ? s.options : [];
      return (
        <section className="mk-sec" id={s.id}>
          <div className="mk-wrap mk-plan">
            <div className="mk-plan-copy">
              <Head c={c} kicker={c.t.kick.booking} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              <div className="mk-keycard" data-rv aria-live="polite">
                <span className="mk-kc-name">{c.name}</span>
                <span className="mk-strip" aria-hidden="true" />
                <dl>
                  {s.kind === "reservation" ? (
                    <div>
                      <dt>{c.t.guests}</dt>
                      <dd data-out="guests">2</dd>
                    </div>
                  ) : (
                    <div>
                      <dt>{c.t.kick.booking}</dt>
                      <dd>{c.t.submit[s.kind]}</dd>
                    </div>
                  )}
                  {stay ? (
                    <div>
                      <dt>{w.nights}</dt>
                      <dd data-out="nights">2</dd>
                    </div>
                  ) : null}
                  {opts.length > 0 ? (
                    <div>
                      <dt>{stay ? w.room : c.t.service}</dt>
                      <dd data-out="option">{opts[0]}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
              <Reach c={c} />
            </div>
            <div className="mk-desk-form" data-rv>
              {stay ? (
                <fieldset>
                  <legend>{w.nights}</legend>
                  <div className="z-chips" data-chips="nights">
                    {["1", "2", "3", "4", "5", "6", "7+"].map((n) => (
                      <button key={n} type="button" aria-pressed={n === "2"} aria-label={`${n} ${w.nights.toLowerCase()}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}
              {opts.length > 0 ? (
                <fieldset>
                  <legend>{stay ? w.room : c.t.service}</legend>
                  <div className="mk-opts" data-chips="option">
                    {opts.map((o, n) => (
                      <button key={o} type="button" aria-pressed={n === 0}>
                        {o}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
            </div>
          </div>
        </section>
      );
    },
    contact: (s, c) => {
      const b = c.spec.business;
      return (
        <section className="mk-sec mk-loc" id={s.id}>
          <div className="mk-wrap mk-split">
            <div className="mk-copy">
              <Head c={c} kicker={c.t.kick.contact} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Reach c={c} />
              {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
            </div>
            {s.showForm ? (
              <div className="z-panel" data-rv>
                <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
              </div>
            ) : null}
          </div>
          {b.city ? (
            <p className="mk-city" aria-hidden="true" data-px>
              {b.city}
            </p>
          ) : null}
        </section>
      );
    },
  },
};
