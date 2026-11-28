import type { ReactNode } from "react";
import type { SiteSpec } from "@/lib/site-spec";
import { NowBadge, TODAY_JS } from "./today";
import { Btn, css, DemoForm, em, heroFacts, Hours, hoursRows, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Cutline: an original template (no portfolio demo). Underground luxury for contemporary
 * men's grooming: warm black and bone, a sharp display serif, editorial photography with
 * figure captions and a single motif, the cut. The headline is sliced in two and slides
 * together along a blade of light; photographs open from a horizontal line; service cards
 * open their photograph on hover while a label follows the cursor; the gallery runs
 * sideways while you scroll; barbers are introduced by their role; the booking panel walks
 * from treatment to day to time, built from the real opening hours. Made for barbershops,
 * men's salons, tattoo and piercing studios and other appointment-led ateliers.
 */

const RULES = `
.d-cutline{--black:#0d0c0b;--coal:#151412;--coal2:#1d1b19;--bone:#eeeae3;--bone2:#e5e0d7;--smoke:#a29c92;--ash:#6e695f;--line:rgba(238,234,227,.14);--line-k:rgba(13,12,11,.15);--pad:clamp(18px,4.2vw,68px);--ease:cubic-bezier(.22,1,.36,1);--slow:cubic-bezier(.65,0,.35,1);--serif:"DM Serif Display",Georgia,serif;--z-bg2:var(--coal);--z-ink:var(--bone);--z-dim:var(--smoke);--z-line:var(--line);--z-accent:var(--bone);--z-on-accent:#0d0c0b;--z-display:var(--serif);--z-display-weight:400;--z-radius:0px;--z-field-radius:0px;--z-ico-radius:50%;--z-sec:clamp(96px,12vw,190px);--z-h3:clamp(24px,2.1vw,32px);--z-statement:clamp(34px,4.8vw,76px);background:var(--black);color:var(--bone);font-family:"Inter Tight",system-ui,sans-serif;font-size:clamp(15.5px,1vw,17.5px);line-height:1.6;font-feature-settings:"ss01"}
.d-cutline h1,.d-cutline h2,.d-cutline h3{font-family:var(--serif);font-weight:400;letter-spacing:-.015em;line-height:1}
.d-cutline h2{font-size:clamp(42px,5.8vw,96px)}
.d-cutline h2.is-long{font-size:clamp(34px,4vw,62px);line-height:1.04}
.d-cutline em{font-style:normal;color:transparent;-webkit-text-stroke:1px currentColor}
.d-cutline h1 em,.d-cutline h2 em{-webkit-text-stroke-color:var(--bone)}
.d-cutline .is-bone h2 em,.d-cutline .z-cta h2 em{-webkit-text-stroke-color:var(--black)}
.d-cutline ::selection{background:var(--bone);color:var(--black)}
.d-cutline main{counter-reset:sec}
.d-cutline .ct-wrap{position:relative;width:min(100%,1520px);margin-inline:auto;padding-inline:var(--pad)}
.d-cutline .ct-kick{display:inline-flex;align-items:center;gap:14px;font-size:11.5px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--smoke)}
.d-cutline .ct-kick::before{counter-increment:sec;content:"(" counter(sec,decimal-leading-zero) ")";letter-spacing:.06em;color:var(--bone)}
.d-cutline .ct-kick::after{content:"";width:44px;height:1px;background:currentColor;opacity:.6}
.d-cutline .is-bone .ct-kick{color:var(--ash)}
.d-cutline .is-bone .ct-kick::before{color:var(--black)}
.d-cutline .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:54px;padding:0 30px;font-size:12.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;overflow:hidden;isolation:isolate;transition:color .5s var(--ease)}
.d-cutline .btn svg{width:18px;height:18px;transition:transform .5s var(--ease)}
.d-cutline .btn:hover svg{transform:translateX(4px)}
.d-cutline .ct-fill{background:var(--bone);color:var(--black)}
.d-cutline .ct-fill::before,.d-cutline .ct-fill::after{content:"";position:absolute;left:0;right:0;z-index:-1;height:50%;background:var(--black);transition:transform .55s var(--slow)}
.d-cutline .ct-fill::before{top:0;transform:translateX(-101%)}
.d-cutline .ct-fill::after{bottom:0;transform:translateX(101%)}
.d-cutline .ct-fill:hover{color:var(--bone);box-shadow:inset 0 0 0 1px var(--bone)}
.d-cutline .ct-fill:hover::before,.d-cutline .ct-fill:hover::after{transform:none}
.d-cutline .is-bone .ct-fill,.d-cutline .z-cta .ct-fill{background:var(--black);color:var(--bone)}
.d-cutline .is-bone .ct-fill::before,.d-cutline .is-bone .ct-fill::after,.d-cutline .z-cta .ct-fill::before,.d-cutline .z-cta .ct-fill::after{background:var(--bone)}
.d-cutline .is-bone .ct-fill:hover,.d-cutline .z-cta .ct-fill:hover{color:var(--black);box-shadow:inset 0 0 0 1px var(--black)}
.d-cutline .ct-line{box-shadow:inset 0 0 0 1px currentColor;background:transparent}
.d-cutline .ct-line::before{content:"";position:absolute;inset:0;z-index:-1;background:currentColor;clip-path:inset(50% 0 50% 0);transition:clip-path .55s var(--slow)}
.d-cutline .ct-line:hover::before{clip-path:inset(0)}
.d-cutline .ct-line:hover{color:var(--black)}
.d-cutline .ct-text{position:relative;display:inline-flex;align-items:center;gap:12px;min-height:44px;font-size:12.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.d-cutline .ct-text::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:1px;background:currentColor;transform-origin:100% 50%;transition:transform .5s var(--slow)}
.d-cutline .ct-text:hover::after{transform:scaleX(0)}
.d-cutline .ct-hdr{position:fixed;left:0;right:0;top:0;z-index:50;transition:transform .6s var(--ease),background-color .5s}
.d-cutline .ct-hdr.is-hidden{transform:translateY(-102%)}
.d-cutline .ct-hdr::before{content:"";position:absolute;inset:0 0 -40px;z-index:-1;background:linear-gradient(180deg,rgba(13,12,11,.7),rgba(13,12,11,0));opacity:1;transition:opacity .5s;pointer-events:none}
.d-cutline.is-scrolled .ct-hdr::before,.d-cutline.menu-open .ct-hdr::before{opacity:0}
.d-cutline.is-scrolled .ct-hdr{background:rgba(13,12,11,.88);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.d-cutline .ct-bar{display:flex;align-items:center;gap:clamp(16px,2.4vw,40px);height:88px;transition:height .5s var(--ease)}
.d-cutline.is-scrolled .ct-bar{height:70px}
.d-cutline .ct-bar::after{content:"";position:absolute;left:var(--pad);right:var(--pad);bottom:0;height:1px;background:var(--line);transform:scaleX(0);transform-origin:50% 50%;transition:transform .8s var(--slow)}
.d-cutline.is-scrolled .ct-bar::after{transform:scaleX(1)}
.d-cutline .ct-logo{display:flex;align-items:baseline;gap:12px;min-width:0;min-height:44px;align-items:center}
.d-cutline .ct-logo b{overflow:hidden;font-family:var(--serif);font-size:clamp(22px,1.9vw,28px);font-weight:400;line-height:1;letter-spacing:-.01em;text-overflow:ellipsis;white-space:nowrap}
.d-cutline .ct-logo span{display:none;padding-left:12px;border-left:1px solid var(--line);font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--smoke);white-space:nowrap}
@media (min-width:700px){.d-cutline .ct-logo span{display:inline}}
.d-cutline .ct-links{display:none;gap:clamp(20px,2.2vw,38px);margin-left:auto}
.d-cutline .ct-links a{position:relative;display:inline-flex;align-items:center;min-height:44px;font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap;color:rgba(238,234,227,.78);transition:color .3s}
.d-cutline .ct-links a:hover{color:var(--bone)}
.d-cutline .ct-links a::before,.d-cutline .ct-links a::after{content:"";position:absolute;bottom:10px;width:50%;height:1px;background:var(--bone);transform:scaleX(0);transition:transform .45s var(--slow)}
.d-cutline .ct-links a::before{left:0;transform-origin:0 50%}
.d-cutline .ct-links a::after{right:0;transform-origin:100% 50%}
.d-cutline .ct-links a:hover::before,.d-cutline .ct-links a:hover::after{transform:scaleX(1)}
.d-cutline .ct-hcta{display:none;flex:none;min-height:46px;padding:0 22px;font-size:11.5px}
.d-cutline .ct-burger{position:relative;z-index:52;display:inline-flex;align-items:center;gap:14px;margin-left:auto;min-height:48px;padding:0 0 0 12px;border:0;background:none;font-size:11.5px;font-weight:600;letter-spacing:.24em;text-transform:uppercase}
.d-cutline .ct-burger i{position:relative;display:block;width:34px;height:12px}
.d-cutline .ct-burger i::before,.d-cutline .ct-burger i::after{content:"";position:absolute;right:0;height:1.5px;background:currentColor;transition:transform .5s var(--ease),width .5s var(--ease)}
.d-cutline .ct-burger i::before{top:0;width:34px}.d-cutline .ct-burger i::after{bottom:0;width:22px}
.d-cutline .ct-burger:hover i::after{width:34px}
.d-cutline.menu-open .ct-burger{color:var(--black)}
.d-cutline.menu-open .ct-burger i::before{transform:translateY(5.25px) rotate(14deg)}
.d-cutline.menu-open .ct-burger i::after{width:34px;transform:translateY(-5.25px) rotate(-14deg)}
.d-cutline.menu-open .ct-hdr{z-index:53;transform:none;background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-cutline.menu-open .ct-logo{position:relative;z-index:52;color:var(--black)}
.d-cutline.menu-open .ct-bar::after{opacity:0}
@media (min-width:1120px){.d-cutline .ct-links{display:flex}.d-cutline .ct-burger{display:none}.d-cutline .ct-hcta{display:inline-flex}}
@media (min-width:640px) and (max-width:1119px){.d-cutline .ct-hcta{display:inline-flex;margin-left:auto}.d-cutline .ct-burger{margin-left:0}}
.d-cutline .ct-menu{position:fixed;inset:0;z-index:51;display:grid;align-content:space-between;gap:36px;padding:118px var(--pad) 120px;color:var(--black);overflow-y:auto;visibility:hidden;transition:visibility 0s .9s}
.d-cutline .ct-menu::before,.d-cutline .ct-menu::after{content:"";position:fixed;left:0;right:0;z-index:-1;height:50.5%;background:var(--bone);transition:transform .75s var(--slow)}
.d-cutline .ct-menu::before{top:0;transform:translateY(-100%)}
.d-cutline .ct-menu::after{bottom:0;transform:translateY(100%)}
.d-cutline .ct-menu.is-open{visibility:visible;transition:visibility 0s}
.d-cutline .ct-menu.is-open::before,.d-cutline .ct-menu.is-open::after{transform:none}
.d-cutline .ct-menu nav{display:grid}
.d-cutline .ct-menu nav a{display:grid;grid-template-columns:3.2ch minmax(0,1fr);align-items:baseline;gap:12px;min-height:58px;padding:6px 0;border-bottom:1px solid var(--line-k);font-family:var(--serif);font-size:clamp(36px,9vw,68px);line-height:1.05;opacity:0;clip-path:inset(0 0 100% 0);transform:translateY(20px);transition:opacity .3s,clip-path .8s var(--ease),transform .8s var(--ease)}
.d-cutline .ct-menu.is-open nav a{opacity:1;clip-path:inset(0 0 -20% 0);transform:none;transition-delay:calc(.35s + var(--i,0) * 70ms)}
.d-cutline .ct-menu nav small{font-family:"Inter Tight",sans-serif;font-size:12px;letter-spacing:.14em;color:var(--ash)}
.d-cutline .ct-menu nav a:hover{font-style:normal;color:transparent;-webkit-text-stroke:1px var(--black)}
.d-cutline .ct-menu-foot{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:20px;opacity:0;transition:opacity .5s}
.d-cutline .ct-menu.is-open .ct-menu-foot{opacity:1;transition-delay:.7s}
.d-cutline .ct-menu-foot p{font-size:13px;letter-spacing:.06em;color:var(--ash)}
.d-cutline .ct-menu-foot p a{color:var(--black);text-decoration:underline;text-underline-offset:3px}
.d-cutline .ct-menu .ct-fill{background:var(--black);color:var(--bone)}
.d-cutline .ct-hero{position:relative;padding:clamp(120px,15vh,170px) 0 0;overflow:hidden}
.d-cutline .ct-hero-grid{display:grid;gap:clamp(40px,5vw,80px);align-items:end}
@media (min-width:980px){.d-cutline .ct-hero-grid{grid-template-columns:minmax(0,1.32fr) minmax(0,.68fr)}.d-cutline .ct-hero.is-plain .ct-hero-grid{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr)}}
.d-cutline .ct-top{display:flex;flex-wrap:wrap;align-items:center;gap:12px 22px;margin-bottom:clamp(26px,3.4vw,48px);font-size:11.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--smoke);animation:ct-fade 1s var(--ease) 1.2s both}
.d-cutline .ct-top>span:first-child{display:inline-flex;align-items:center;gap:14px}
.d-cutline .ct-top>span:first-child::before{content:"";width:44px;height:1px;background:currentColor}
.d-cutline .ct-h1{position:relative;font-size:clamp(56px,8.6vw,158px);line-height:.94;letter-spacing:-.025em}
.d-cutline .ct-h1.is-m{font-size:clamp(48px,6.8vw,122px)}
.d-cutline .ct-h1.is-s{font-size:clamp(40px,5.2vw,92px);line-height:1}
.d-cutline .ct-cut{position:relative;display:block}
.d-cutline .ct-cut-a,.d-cutline .ct-cut-b{display:block}
.d-cutline .ct-cut-a{position:relative;z-index:1;animation:ct-half-a 1.5s var(--ease) .55s both}
.d-cutline .ct-cut-b{position:absolute;inset:0;clip-path:inset(50% 0 0 0);animation:ct-half-b 1.5s var(--ease) .55s both}
.d-cutline .ct-blade{position:absolute;left:-2%;right:-2%;top:50%;z-index:2;height:1px;background:var(--bone);transform-origin:0 50%;animation:ct-blade 1.5s var(--slow) .15s both;pointer-events:none}
.d-cutline .ct-lede{max-width:44ch;margin-top:clamp(24px,3vw,40px);font-size:clamp(17px,1.3vw,20px);line-height:1.55;color:var(--smoke);animation:ct-up 1s var(--ease) 1.25s both}
.d-cutline .ct-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:16px 28px;margin-top:34px;animation:ct-up 1s var(--ease) 1.4s both}
.d-cutline .ct-hero-pic{position:relative;justify-self:end;width:100%;max-width:560px}
.d-cutline .ct-hero-frame{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--coal);clip-path:inset(50% 0 50% 0);animation:ct-open 1.5s var(--slow) .9s both}
.d-cutline .ct-hero-frame img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.08) brightness(.92);transform:scale(calc(1.12 + var(--p,0) * -.06));animation:ct-settle 2.6s var(--ease) .9s backwards}
.d-cutline .ct-cap{display:flex;justify-content:space-between;gap:16px;margin-top:14px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--smoke)}
.d-cutline .ct-hero-pic .ct-cap{animation:ct-fade 1s 1.8s both}
.d-cutline .ct-mono{position:relative;display:grid;place-items:center;aspect-ratio:4/5;max-width:520px;justify-self:end;width:100%;border:1px solid var(--line);overflow:hidden;animation:ct-fade 1.4s var(--ease) .6s both}
.d-cutline .ct-mono>span{font-family:var(--serif);font-size:clamp(220px,26vw,420px);line-height:.8;color:transparent;-webkit-text-stroke:1px var(--bone)}
.d-cutline .ct-mono::before{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:var(--bone);transform:scaleX(0);animation:ct-blade-stay 1.4s var(--slow) 1s forwards}
.d-cutline .ct-mono ul{position:absolute;left:18px;right:18px;bottom:16px;display:flex;flex-wrap:wrap;gap:6px 18px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--smoke)}
@media (min-width:980px){.d-cutline .ct-hero:not(.is-plain){display:flex;flex-direction:column;justify-content:flex-end;min-height:max(760px,100svh);padding:150px 0 36px}
.d-cutline .ct-hero:not(.is-plain) .ct-hero-grid{display:block}
.d-cutline .ct-hero:not(.is-plain)>.ct-wrap{position:static}
.d-cutline .ct-hero:not(.is-plain) .ct-hero-grid>div:first-child{max-width:min(58vw,1000px)}
.d-cutline .ct-hero:not(.is-plain) .ct-h1{z-index:3;width:max-content;max-width:63vw;font-size:clamp(64px,9.6vw,166px);mix-blend-mode:difference}
.d-cutline .ct-hero:not(.is-plain) .ct-h1.is-m{font-size:clamp(56px,7.6vw,144px)}
.d-cutline .ct-hero:not(.is-plain) .ct-h1.is-s{font-size:clamp(46px,5.6vw,104px)}
.d-cutline .ct-hero:not(.is-plain) .ct-hero-pic{position:absolute;top:0;right:0;bottom:0;width:min(44vw,max(38vw,640px));max-width:none}
.d-cutline .ct-hero:not(.is-plain) .ct-hero-frame{height:100%;aspect-ratio:auto}
.d-cutline .ct-hero:not(.is-plain) .ct-hero-frame::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,12,11,.4),transparent 30%,transparent 70%,rgba(13,12,11,.7))}
.d-cutline .ct-hero:not(.is-plain) .ct-hero-pic .ct-cap{position:absolute;left:28px;right:28px;bottom:24px;z-index:2;margin:0;color:var(--bone)}
.d-cutline .ct-hero:not(.is-plain) .ct-facts{max-width:min(54vw,920px);margin-top:clamp(48px,6vh,80px)}}
@media (min-width:600px) and (max-width:979px){.d-cutline .ct-hero-frame{aspect-ratio:16/11}.d-cutline .ct-about-side{max-width:560px}}
@media (max-width:979px){.d-cutline .ct-hero-pic{justify-self:stretch;margin-inline:calc(var(--pad) * -1);width:auto;max-width:none}.d-cutline .ct-hero-pic .ct-cap{padding-inline:var(--pad)}}
.d-cutline .ct-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));margin-top:clamp(56px,7vw,110px);border-top:1px solid var(--line);animation:ct-fade 1s 1.6s both}
.d-cutline .ct-facts div{display:grid;gap:6px;padding:20px 24px 26px 0}
.d-cutline .ct-facts div+div{padding-left:24px;border-left:1px solid var(--line)}
@media (max-width:620px){.d-cutline .ct-facts div+div{padding-left:0;border-left:0;border-top:1px solid var(--line)}}
.d-cutline .ct-facts dt{font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--smoke)}
.d-cutline .ct-facts dd{margin:0;font-family:var(--serif);font-size:clamp(19px,1.5vw,23px);line-height:1.25}
.d-cutline .ct-facts a{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}
.d-cutline .ct-now{display:inline-flex;align-items:center;gap:10px;min-height:30px;padding:0 12px;border:1px solid var(--line);font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--bone)}
.d-cutline .ct-now::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--smoke)}
.d-cutline .ct-now.is-open::before{background:var(--bone);box-shadow:0 0 0 4px rgba(238,234,227,.14)}
.d-cutline .ct-sec{position:relative;padding-block:var(--z-sec)}
.d-cutline .ct-sec.is-bone{background:var(--bone);color:var(--black)}
.d-cutline .ct-sec.is-coal{background:var(--coal)}
.d-cutline .ct-head{display:grid;gap:22px;margin-bottom:clamp(48px,6vw,96px)}
.d-cutline .ct-head>p:not(.ct-kick){max-width:48ch;font-size:clamp(16px,1.15vw,18.5px);color:var(--smoke)}
.d-cutline .is-bone .ct-head>p:not(.ct-kick){color:var(--ash)}
@media (min-width:980px){.d-cutline .ct-head.is-row{grid-template-columns:minmax(0,1.4fr) minmax(0,.8fr);align-items:end;column-gap:80px}.d-cutline .ct-head.is-row .ct-kick{grid-column:1/-1}}
.demo-js .d-cutline .ct-head h2[data-rv]{opacity:1;transform:translateY(.25em);clip-path:inset(0 0 100% 0);transition:clip-path 1.2s var(--ease),transform 1.2s var(--ease)}
.demo-js .d-cutline .ct-head h2[data-rv].in{transform:none;clip-path:inset(-.1em -.1em -.25em -.1em)}
.d-cutline .ct-reveal{position:relative;overflow:hidden;background:var(--coal)}
.d-cutline .ct-reveal img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.06);transition:transform 1.8s var(--ease),filter .8s}
.demo-js .d-cutline .ct-reveal[data-rv]{opacity:1;transform:none;clip-path:inset(50% 0 50% 0);transition:clip-path 1.3s var(--slow)}
.demo-js .d-cutline .ct-reveal[data-rv] img{transform:scale(1.18)}
.demo-js .d-cutline .ct-reveal[data-rv].in{clip-path:inset(0)}
.demo-js .d-cutline .ct-reveal[data-rv].in img{transform:none}
.d-cutline .ct-about-grid{display:grid;gap:clamp(36px,5vw,72px)}
@media (min-width:980px){.d-cutline .ct-about-grid{grid-template-columns:repeat(12,minmax(0,1fr));column-gap:clamp(20px,2vw,32px)}.d-cutline .ct-about-head{grid-column:1/8}.d-cutline .ct-about-text{grid-column:2/8}.d-cutline .ct-about-side{grid-column:9/13;grid-row:1/3;align-self:start}.d-cutline .ct-about-grid.is-solo .ct-about-head{grid-column:1/10}.d-cutline .ct-about-grid.is-solo .ct-about-text{grid-column:1/9}}
.d-cutline .ct-about-head .ct-head{margin-bottom:0}
.d-cutline .ct-about-text{display:grid;gap:22px}
.d-cutline .ct-lead{font-family:var(--serif);font-size:clamp(23px,2vw,32px);line-height:1.3;letter-spacing:-.005em}
.d-cutline .ct-about-text>p:not(.ct-lead){max-width:56ch;color:var(--smoke)}
.d-cutline .ct-roman{display:grid;margin-top:12px;border-top:1px solid var(--line)}
.d-cutline .ct-roman li{display:grid;grid-template-columns:52px minmax(0,1fr);align-items:baseline;gap:12px;padding:16px 0;border-bottom:1px solid var(--line);transition:padding .5s var(--ease)}
.d-cutline .ct-roman li:hover{padding-left:10px}
.d-cutline .ct-roman b{font-family:var(--serif);font-size:20px;font-weight:400;color:var(--smoke)}
.d-cutline .ct-about-side{display:grid;gap:12px}
.d-cutline .ct-about-side .ct-reveal{aspect-ratio:3/4}
.d-cutline .ct-about-side .ct-reveal img{transform:translateY(calc(var(--p,0) * -4%)) scale(1.08)}
.demo-js .d-cutline .ct-about-side .ct-reveal[data-rv].in img{transform:translateY(calc(var(--p,0) * -4%)) scale(1.08)}
.d-cutline .ct-svc-grid{display:grid;gap:1px;background:var(--line-k);border:1px solid var(--line-k);grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))}
.d-cutline .ct-svc{position:relative;display:grid;grid-template-rows:auto auto 1fr auto;gap:14px;height:100%;min-height:clamp(300px,26vw,380px);padding:clamp(22px,2.2vw,34px);background:var(--bone);color:var(--black);overflow:hidden;isolation:isolate;transition:color .5s var(--ease)}
@media (max-width:699px){.d-cutline .ct-svc{min-height:0}}
.d-cutline .ct-svc-pic{position:relative;margin:calc(clamp(22px,2.2vw,34px) * -1) calc(clamp(22px,2.2vw,34px) * -1) 6px;aspect-ratio:16/10;overflow:hidden;background:var(--black)}
.d-cutline .ct-svc-pic img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.05);transition:transform 1.4s var(--ease)}
.d-cutline .ct-svc-top{display:flex;justify-content:space-between;gap:12px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--ash);transition:color .5s}
.d-cutline .ct-svc h3{font-size:clamp(28px,2.5vw,40px);line-height:1.02}
.d-cutline .ct-svc>p{max-width:40ch;color:var(--ash);transition:color .5s}
.d-cutline .ct-svc-foot{display:flex;justify-content:space-between;align-items:end;gap:12px;padding-top:16px;border-top:1px solid var(--line-k);transition:border-color .5s}
.d-cutline .ct-svc-foot b{font-family:var(--serif);font-size:clamp(24px,2vw,32px);font-weight:400;line-height:1}
.d-cutline .ct-svc-go{display:grid;place-items:center;width:42px;height:42px;margin-left:auto;border:1px solid currentColor;border-radius:50%;transition:transform .6s var(--ease),background-color .4s,color .4s}
.d-cutline .ct-svc-go svg{width:16px;height:16px}
.d-cutline a.ct-svc:hover .ct-svc-go{transform:rotate(-45deg)}
@media (hover:hover) and (pointer:fine) and (min-width:700px){
.d-cutline .ct-svc-pic{position:absolute;inset:0;z-index:-1;margin:0;aspect-ratio:auto;clip-path:inset(50% 0 50% 0);transition:clip-path .9s var(--slow)}
.d-cutline .ct-svc-pic::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,12,11,.55),rgba(13,12,11,.86))}
.d-cutline .ct-svc-pic img{transform:scale(1.15)}
.d-cutline .ct-svc:hover{color:var(--bone)}
.d-cutline .ct-svc:hover .ct-svc-pic{clip-path:inset(0)}
.d-cutline .ct-svc:hover .ct-svc-pic img{transform:none}
.d-cutline .ct-svc:hover>p,.d-cutline .ct-svc:hover .ct-svc-top{color:rgba(238,234,227,.78)}
.d-cutline .ct-svc:hover .ct-svc-foot{border-color:var(--line)}
.d-cutline .ct-svc.no-pic::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--black);clip-path:inset(50% 0 50% 0);transition:clip-path .8s var(--slow)}
.d-cutline .ct-svc.no-pic:hover::before{clip-path:inset(0)}
.d-cutline [data-cursor]{cursor:none}
}
.d-cutline .ct-cursor{position:fixed;left:0;top:0;z-index:60;display:grid;place-items:center;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;background:var(--bone);color:var(--black);font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;pointer-events:none;opacity:0;scale:.3;transition:opacity .3s,scale .45s var(--ease)}
.d-cutline .ct-cursor.on{opacity:1;scale:1}
.d-cutline .ct-crew{display:grid;gap:clamp(28px,3vw,48px) clamp(16px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-cutline .ct-barber{display:grid;gap:16px;align-content:start}
.d-cutline .ct-barber .ct-reveal{aspect-ratio:4/5}
.d-cutline .ct-barber:hover .ct-reveal img{filter:grayscale(.15) contrast(1.04);transform:scale(1.04)}
.d-cutline .ct-barber-mono{position:relative;display:grid;place-items:center;aspect-ratio:4/5;border:1px solid var(--line);font-family:var(--serif);font-size:clamp(120px,12vw,200px);line-height:1;color:transparent;-webkit-text-stroke:1px var(--bone)}
.d-cutline .ct-barber-mono::after{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:var(--bone);opacity:.7}
.d-cutline .ct-barber h3{font-size:clamp(28px,2.5vw,40px)}
.d-cutline .ct-barber-name{display:flex;align-items:center;gap:12px;font-size:11.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--smoke)}
.d-cutline .ct-barber-name::before{content:"";width:28px;height:1px;background:currentColor}
.d-cutline .ct-barber>p:last-child:not(.ct-barber-name){color:var(--smoke)}
.d-cutline .ct-gal{padding-block:var(--z-sec);overflow:hidden;overflow:clip}
.d-cutline .ct-gal-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:20px 40px;margin-bottom:clamp(36px,4vw,60px)}
.d-cutline .ct-gal-top .ct-head{margin-bottom:0}
.d-cutline .ct-gal-ctl{display:flex;align-items:center;gap:14px;font-size:12px;letter-spacing:.2em;color:var(--smoke)}
.d-cutline .ct-gal-ctl button{display:grid;place-items:center;width:48px;height:48px;border:1px solid var(--line);border-radius:50%;background:none;transition:background-color .3s,color .3s}
.d-cutline .ct-gal-ctl button:hover{background:var(--bone);color:var(--black)}
.d-cutline .ct-gal-ctl svg{width:16px;height:16px}
.d-cutline .ct-gal-ctl b{font-family:var(--serif);font-size:24px;font-weight:400;color:var(--bone);font-variant-numeric:tabular-nums}
.d-cutline .ct-gal-track{display:flex;gap:clamp(12px,2vw,32px);padding-inline:var(--pad);overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;overscroll-behavior-x:contain}
.d-cutline .ct-gal-track::-webkit-scrollbar{display:none}
.d-cutline .ct-gal-track figure{flex:none;width:min(78vw,420px);scroll-snap-align:center}
.d-cutline .ct-gal-track figure>div{aspect-ratio:4/5;overflow:hidden;background:var(--coal)}
.d-cutline .ct-gal-track figure:nth-child(3n+2)>div{aspect-ratio:1}
.d-cutline .ct-gal-track img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.06);transition:filter .8s,transform 1.4s var(--ease)}
.d-cutline .ct-gal-track figure:hover img{filter:grayscale(.2);transform:scale(1.04)}
.d-cutline .ct-gal-track figcaption{display:flex;justify-content:space-between;gap:12px;margin-top:12px;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--smoke)}
.d-cutline .ct-gal.is-pinned{padding:0}
.d-cutline .ct-gal.is-pinned .ct-gal-pin{position:sticky;top:0;display:grid;grid-template-columns:minmax(0,1fr);align-content:center;height:100vh;height:100svh;overflow:hidden}
.d-cutline .ct-gal.is-pinned .ct-gal-track{width:max-content;overflow:visible;scroll-snap-type:none;will-change:transform}
.d-cutline .ct-gal.is-pinned .ct-gal-track figure{width:auto}
.d-cutline .ct-gal.is-pinned .ct-gal-track figure>div{height:min(56vh,560px);clip-path:inset(calc((1 - var(--r,1)) * 50%) 0 calc((1 - var(--r,1)) * 50%) 0)}
.d-cutline .ct-gal.is-pinned .ct-gal-ctl button{display:none}
.d-cutline .ct-gal-end{flex:none;display:grid;align-content:center;gap:18px;width:min(40vw,420px);padding-left:clamp(12px,2vw,32px);font-family:var(--serif);font-size:clamp(32px,3vw,52px);line-height:1.05}
.d-cutline .ct-steps2{display:grid;gap:0;border-top:1px solid var(--line-k)}
@media (min-width:980px){.d-cutline .ct-proc{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:80px;align-items:start}.d-cutline .ct-proc .ct-head{position:sticky;top:130px}}
.d-cutline .ct-steps2 li{position:relative;display:grid;grid-template-columns:clamp(64px,7vw,110px) minmax(0,1fr);gap:8px 20px;padding:clamp(24px,2.8vw,40px) 0;border-bottom:1px solid var(--line-k)}
.d-cutline .ct-steps2 li>b{grid-row:1/3;font-family:var(--serif);font-size:clamp(40px,4.4vw,72px);font-weight:400;line-height:.9;color:transparent;-webkit-text-stroke:1px currentColor}
.d-cutline .is-bone .ct-steps2 li>b{-webkit-text-stroke-color:var(--black)}
.d-cutline .ct-steps2 h3{font-size:clamp(26px,2.3vw,36px)}
.d-cutline .ct-steps2 p{max-width:48ch;color:var(--ash)}
.d-cutline .ct-sec:not(.is-bone) .ct-steps2,.d-cutline .ct-sec:not(.is-bone) .ct-steps2 li{border-color:var(--line)}
.d-cutline .ct-sec:not(.is-bone) .ct-steps2 p{color:var(--smoke)}
.d-cutline .ct-steps2 li::after{content:"";position:absolute;left:0;bottom:-1px;width:100%;height:1px;background:currentColor;transform:scaleX(0);transform-origin:0 50%;transition:transform 1.4s var(--slow) .2s}
.d-cutline .ct-steps2 li.in::after{transform:scaleX(1)}
.d-cutline .ct-feat{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));border-top:1px solid var(--line)}
.d-cutline .ct-feat li{display:grid;gap:16px;align-content:start;padding:clamp(28px,3vw,44px) clamp(18px,2.2vw,36px) clamp(28px,3vw,44px) 0;border-bottom:1px solid var(--line)}
@media (min-width:700px){.d-cutline .ct-feat li+li{padding-left:clamp(18px,2.2vw,36px);border-left:1px solid var(--line)}}
.d-cutline .ct-feat .z-ico{width:56px;height:56px;border:1px solid var(--line);color:var(--bone);transition:background-color .5s,color .5s,transform .8s var(--ease)}
.d-cutline .ct-feat li:hover .z-ico{background:var(--bone);color:var(--black);transform:rotate(-90deg)}
.d-cutline .ct-feat h3{font-size:clamp(24px,2vw,32px)}
.d-cutline .ct-feat p{color:var(--smoke)}
.d-cutline .ct-packs{display:grid;gap:clamp(16px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));align-items:stretch}
.d-cutline .ct-pack{position:relative;display:grid;gap:18px;align-content:start;padding:clamp(28px,3vw,44px);border:1px solid var(--line);outline:1px solid var(--line);outline-offset:-8px;transition:outline-offset .6s var(--ease),border-color .4s}
.d-cutline .ct-pack:hover{outline-offset:-14px;border-color:var(--smoke)}
.d-cutline .ct-pack.is-feat{background:var(--bone);color:var(--black);border-color:var(--bone);outline-color:var(--line-k)}
.d-cutline .ct-pack-tag{font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--smoke)}
.d-cutline .ct-pack.is-feat .ct-pack-tag,.d-cutline .ct-pack.is-feat>p{color:var(--ash)}
.d-cutline .ct-pack h3{font-size:clamp(28px,2.4vw,38px)}
.d-cutline .ct-pack-price{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 12px;padding-block:14px;border-block:1px solid var(--line)}
.d-cutline .ct-pack.is-feat .ct-pack-price{border-color:var(--line-k)}
.d-cutline .ct-pack-price b{font-family:var(--serif);font-size:clamp(46px,4.4vw,68px);font-weight:400;line-height:1}
.d-cutline .ct-pack-price span{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--smoke)}
.d-cutline .ct-pack>p{color:var(--smoke)}
.d-cutline .ct-pack ul{display:grid;gap:10px}
.d-cutline .ct-pack li{display:grid;grid-template-columns:18px minmax(0,1fr);gap:10px;align-items:baseline}
.d-cutline .ct-pack li::before{content:"";height:1px;background:currentColor;transform:translateY(-4px)}
.d-cutline .ct-fine{margin-top:clamp(28px,3vw,44px);font-size:12.5px;letter-spacing:.06em;color:var(--smoke)}
.d-cutline .is-bone .ct-fine{color:var(--ash)}
.d-cutline .ct-split{display:grid;gap:clamp(40px,5vw,96px);align-items:start}
@media (min-width:980px){.d-cutline .ct-split{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}}
.d-cutline .ct-split-copy{display:grid;gap:24px}
.d-cutline .ct-split-copy .ct-head{margin-bottom:0}
.d-cutline .ct-split-copy h2{font-size:clamp(40px,4.6vw,80px)}
.d-cutline .ct-split-copy>p{max-width:46ch;color:var(--smoke)}
.d-cutline .is-bone .ct-split-copy>p{color:var(--ash)}
.d-cutline .ct-ledger{padding:clamp(24px,3vw,44px);border:1px solid var(--line);background:var(--coal)}
.d-cutline .ct-ledger-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding-bottom:20px;margin-bottom:6px;border-bottom:1px solid var(--line)}
.d-cutline .ct-ledger-top h3{font-size:clamp(26px,2.2vw,34px)}
.d-cutline .ct-ledger .z-hours{border:0}
.d-cutline .ct-ledger .z-hours div{position:relative;align-items:baseline;gap:14px;padding:16px 0;border-bottom:1px solid var(--line)}
.d-cutline .ct-ledger .z-hours div::after{content:"";order:1;flex:1;min-width:20px;border-bottom:1px dotted rgba(238,234,227,.3);transform:translateY(-4px)}
.d-cutline .ct-ledger .z-hours dt{order:0;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--smoke)}
.d-cutline .ct-ledger .z-hours dd{order:2;font-family:var(--serif);font-size:clamp(20px,1.7vw,26px);line-height:1;color:var(--bone);white-space:nowrap}
.d-cutline .z-hours div.is-today{padding-left:18px}
.d-cutline .z-hours div.is-today::before{content:"";position:absolute;left:0;top:50%;width:8px;height:8px;border-radius:50%;background:var(--bone);transform:translateY(-50%)}
.d-cutline .z-hours div.is-today dt{color:var(--bone)}
.d-cutline .ct-book-grid{display:grid;gap:clamp(40px,5vw,90px);align-items:start}
@media (min-width:1040px){.d-cutline .ct-book-grid{grid-template-columns:minmax(0,.7fr) minmax(0,1.3fr)}.d-cutline .ct-book-copy{position:sticky;top:120px}}
.d-cutline .ct-book-copy{display:grid;gap:24px}
.d-cutline .ct-book-copy .ct-head{margin-bottom:0}
.d-cutline .ct-book-copy h2{font-size:clamp(40px,4.6vw,80px)}
.d-cutline .ct-book-copy>p{max-width:42ch;color:var(--smoke)}
.d-cutline .ct-panel{display:grid;gap:0;border:1px solid var(--line);background:var(--coal)}
.d-cutline .ct-flow{display:grid}
.d-cutline .ct-step{display:grid;gap:16px;padding:clamp(22px,2.6vw,36px);border-bottom:1px solid var(--line)}
.d-cutline .ct-step-h{display:flex;align-items:baseline;gap:14px;font-size:11.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--smoke)}
.d-cutline .ct-step-h b{font-family:var(--serif);font-size:26px;font-weight:400;letter-spacing:0;color:var(--bone)}
.d-cutline .ct-chips{display:flex;flex-wrap:wrap;gap:8px}
.d-cutline .ct-chips button{display:inline-flex;align-items:center;gap:8px;min-height:46px;padding:0 18px;border:1px solid var(--line);background:none;font-size:14px;letter-spacing:.02em;white-space:nowrap;transition:background-color .35s,color .35s,border-color .35s}
.d-cutline .ct-chips button:hover{border-color:var(--bone)}
.d-cutline .ct-chips button[aria-pressed="true"]{border-color:var(--bone);background:var(--bone);color:var(--black)}
.d-cutline .ct-chips.is-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr))}
.d-cutline .ct-chips.is-grid button{justify-content:center;padding:0 8px;font-variant-numeric:tabular-nums}
.d-cutline .ct-days button{display:grid;justify-items:start;gap:0;min-height:58px;padding:8px 16px;line-height:1.15}
.d-cutline .ct-days button small{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;opacity:.7}
.d-cutline .ct-hint{font-size:13.5px;color:var(--smoke)}
.d-cutline .ct-sum{display:grid;gap:14px;padding:clamp(22px,2.6vw,36px);border-bottom:1px solid var(--line);background:var(--bone);color:var(--black)}
.d-cutline .ct-sum>p{font-size:11.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--ash)}
.d-cutline .ct-sum dl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.d-cutline .ct-sum dt{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ash)}
.d-cutline .ct-sum dd{margin:4px 0 0;font-family:var(--serif);font-size:clamp(18px,1.6vw,24px);line-height:1.15;overflow-wrap:anywhere}
@media (max-width:560px){.d-cutline .ct-sum dl{grid-template-columns:minmax(0,1fr)}}
.d-cutline .ct-form{padding:clamp(22px,2.6vw,36px)}
.d-cutline .ct-form-h{margin-bottom:18px}
.d-cutline .z-field label{font-size:10.5px;letter-spacing:.22em;color:var(--smoke)}
.d-cutline .z-field input,.d-cutline .z-field select,.d-cutline .z-field textarea{min-height:52px;padding:12px 0;border:0;border-bottom:1px solid var(--line);background:transparent;color:var(--bone);transition:border-color .4s}
.d-cutline .z-field input:focus,.d-cutline .z-field select:focus,.d-cutline .z-field textarea:focus{border-color:var(--bone)}
.d-cutline .z-field :focus-visible{outline:none}
.d-cutline .z-field input::-webkit-calendar-picker-indicator{filter:invert(1);opacity:.6}
.d-cutline .is-bone .z-field input,.d-cutline .is-bone .z-field select,.d-cutline .is-bone .z-field textarea{border-color:var(--line-k);color:var(--black)}
.d-cutline .is-bone .z-field input::-webkit-calendar-picker-indicator{filter:none}
.d-cutline .is-bone .z-field label{color:var(--ash)}
.d-cutline .form-note{color:var(--smoke)}
.d-cutline .is-bone .form-note{color:var(--ash)}
.d-cutline .form-status{border-color:currentColor;color:inherit}
.d-cutline .z-panel{border:1px solid var(--line);background:var(--coal)}
.d-cutline .is-bone .z-panel,.d-cutline .is-bone .ct-panel{border-color:var(--line-k);background:var(--bone2)}
.d-cutline .z-chips button{border-color:var(--line)}
.d-cutline .z-acc{border-color:var(--line)}
.d-cutline .z-acc details{border-color:var(--line)}
.d-cutline .z-acc summary{font-family:var(--serif);font-size:clamp(21px,1.8vw,28px);line-height:1.2;transition:padding .5s var(--ease)}
.d-cutline .z-acc summary:hover{padding-left:12px}
.d-cutline .z-acc details>p{color:var(--smoke)}
.d-cutline .is-bone .z-acc,.d-cutline .is-bone .z-acc details{border-color:var(--line-k)}
.d-cutline .is-bone .z-acc summary{color:var(--black)}
.d-cutline .is-bone .z-acc details>p{color:var(--ash)}
.d-cutline .z-sec.z-cta{background:var(--bone);color:var(--black)}
.d-cutline .z-cta h2{font-size:clamp(44px,6.6vw,112px);max-width:16ch}
.d-cutline .z-cta .z-center>p{color:var(--ash)}
.d-cutline .z-statement h2{font-size:var(--z-statement);line-height:1.08;max-width:24ch}
.d-cutline .z-statement .ct-kick::before{content:none}
.d-cutline .z-showcase{min-height:min(92svh,860px)}
.d-cutline .z-showcase .z-show-media img{filter:grayscale(1) contrast(1.05)}
.d-cutline .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(13,12,11,.25),rgba(13,12,11,.82))}
.d-cutline .z-show-in h2{font-size:clamp(44px,6.4vw,110px)}
.d-cutline .z-showcase:not(.has-pic){background:var(--coal)}
.d-cutline .z-card,.d-cutline .z-channel{border:1px solid var(--line);background:var(--coal)}
.d-cutline .z-channel:hover{border-color:var(--bone)}
.d-cutline .z-ico{border-color:var(--line);color:var(--bone)}
.d-cutline .z-pack.is-featured{background:var(--bone);color:var(--black)}
.d-cutline .z-steps,.d-cutline .z-rows,.d-cutline .z-hours,.d-cutline .z-hours div{border-color:var(--line)}
.d-cutline .z-steps small,.d-cutline .z-rows small{font-family:var(--serif);font-size:26px;letter-spacing:0;color:var(--smoke)}
.d-cutline .z-quotes blockquote{border-color:var(--line)}
.d-cutline .z-pic img{filter:grayscale(1)}
.d-cutline .z-ba img{filter:grayscale(1)}
.d-cutline .z-ticks li::before{background:var(--bone)}
.d-cutline .z-price{color:var(--bone)}
.d-cutline .z-reach a{color:var(--bone)}
.d-cutline .z-reach .z-route{color:var(--bone);text-decoration:underline;text-underline-offset:4px}
.d-cutline .is-bone .z-reach,.d-cutline .is-bone .z-hours dd{color:var(--ash)}
.d-cutline .is-bone .z-reach a,.d-cutline .is-bone .z-reach .z-route{color:var(--black)}
.d-cutline .is-bone .z-hours,.d-cutline .is-bone .z-hours div{border-color:var(--line-k)}
.d-cutline .ct-foot{position:relative;padding:clamp(96px,11vw,170px) 0 140px;border-top:1px solid var(--line);overflow:hidden}
.d-cutline .ct-foot-cta{display:inline-flex;align-items:baseline;flex-wrap:wrap;gap:.2em .4em;max-width:100%;font-family:var(--serif);font-size:clamp(44px,7.4vw,128px);line-height:1;letter-spacing:-.02em}
.d-cutline .ct-foot-cta span{background:linear-gradient(var(--bone),var(--bone)) 0 92%/0 1px no-repeat;transition:background-size .8s var(--slow)}
.d-cutline .ct-foot-cta:hover span{background-size:100% 1px}
.d-cutline .ct-foot-cta svg{width:.5em;height:.5em;transition:transform .7s var(--ease)}
.d-cutline .ct-foot-cta:hover svg{transform:rotate(-45deg)}
.d-cutline .ct-foot-name{position:relative;margin-top:clamp(56px,7vw,110px);font-family:var(--serif);font-size:min(17vw,calc(172vw / var(--n,8)));line-height:.86;letter-spacing:-.03em;white-space:nowrap;color:var(--bone);user-select:none}
.d-cutline .ct-foot-name span{display:block}
.d-cutline .ct-foot-name span:first-child{clip-path:inset(0 0 50% 0);transform:translateX(calc(var(--p,0) * -6%))}
.d-cutline .ct-foot-name span+span{position:absolute;inset:0;clip-path:inset(50% 0 0 0);transform:translateX(calc(var(--p,0) * 6%))}
.d-cutline .ct-foot-grid{display:grid;gap:34px;margin-top:clamp(48px,5vw,80px);padding-top:36px;border-top:1px solid var(--line);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-cutline .ct-foot-grid h3{margin-bottom:14px;font-family:"Inter Tight",sans-serif;font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--smoke)}
.d-cutline .ct-foot-grid a,.d-cutline .ct-foot-grid span{display:flex;align-items:center;min-height:34px;transition:color .3s}
.d-cutline .ct-foot-grid a:hover{color:var(--smoke)}
.d-cutline .ct-foot-grid>p{max-width:36ch;color:var(--smoke)}
.d-cutline .ct-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;font-size:12px;letter-spacing:.04em;color:var(--ash)}
@keyframes ct-blade{0%{transform:scaleX(0);opacity:1}45%{transform:scaleX(1);opacity:1}80%{opacity:.5}100%{transform:scaleX(1);opacity:0}}
@keyframes ct-blade-stay{to{transform:scaleX(1)}}
@keyframes ct-half-a{0%{opacity:0;clip-path:inset(0 0 50% 0);transform:translateX(-5%)}25%{opacity:1}88%{clip-path:inset(0 0 50% 0);transform:none}100%{opacity:1;clip-path:inset(-20% -5% -20% -5%);transform:none}}
@keyframes ct-half-b{0%{opacity:0;transform:translateX(5%)}25%{opacity:1}88%{transform:none;opacity:1}100%{transform:none;opacity:0}}
@keyframes ct-open{to{clip-path:inset(0)}}
@keyframes ct-settle{from{transform:scale(1.3)}}
@keyframes ct-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes ct-fade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.d-cutline .ct-cut-a,.d-cutline .ct-hero-frame,.d-cutline .ct-hero-frame img,.d-cutline .ct-top,.d-cutline .ct-lede,.d-cutline .ct-ctas,.d-cutline .ct-facts,.d-cutline .ct-mono,.d-cutline .ct-hero-pic .ct-cap{animation:none;clip-path:none}.d-cutline .ct-cut-b,.d-cutline .ct-blade,.d-cutline .ct-cursor{display:none}.d-cutline .ct-mono::before{animation:none;transform:scaleX(1)}.d-cutline .ct-foot-name span{transform:none}.d-cutline .ct-reveal img,.d-cutline .ct-hero-frame img{transform:none}}
`
  .trim()
  .split("\n");
/* Rules for the kit's own sections and forms come after the shared defaults (they would lose a tie in order). */
const KIT = /\.z-|\.form-/;
const CSS = RULES.filter((r) => !KIT.test(r)).join("");
const EXTRA = RULES.filter((r) => KIT.test(r)).join("");

/**
 * The header that steps aside while you read and returns when you scroll back, the label that
 * follows the cursor over cards and photographs, the gallery that runs sideways while the page
 * scrolls (a normal swipe row on phones and with reduced motion), and the booking panel:
 * treatment, then one of the coming open days, then a time within that day's real hours. The
 * chips fill in the form's own fields, so the form also works on its own.
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-cutline');if(!root)return;
var mm=function(s){return W.matchMedia&&W.matchMedia(s).matches},reduce=mm('(prefers-reduced-motion: reduce)'),fine=mm('(hover: hover) and (pointer: fine)');
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var hdr=d.querySelector('.ct-hdr'),last=W.scrollY,raf=0,gals=q('[data-hscroll]');
function layout(){gals.forEach(function(g){var tr=g.querySelector('.ct-gal-track');var on=W.innerWidth>=900&&!reduce;g.classList.toggle('is-pinned',on);if(on){tr.style.transform='';var dist=Math.max(0,tr.scrollWidth-W.innerWidth);g._d=dist;g.style.height=(W.innerHeight+dist)+'px'}else{g._d=0;g.style.height='';tr.style.transform=''}})}
function frame(){raf=0;var y=W.scrollY,vh=W.innerHeight,vw=W.innerWidth;
if(hdr&&!root.classList.contains('menu-open')){if(y>240&&y>last+4)hdr.classList.add('is-hidden');else if(y<last-4||y<240)hdr.classList.remove('is-hidden')}last=y;
gals.forEach(function(g){if(!g._d)return;var r=g.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;var p=Math.max(0,Math.min(1,-r.top/(r.height-vh)));var tr=g.querySelector('.ct-gal-track');tr.style.transform='translate3d('+(-p*g._d).toFixed(1)+'px,0,0)';var fs=q('figure',tr),cur=1;fs.forEach(function(f,k){var b=f.getBoundingClientRect(),c=b.left+b.width/2;var v=Math.max(0,Math.min(1,1.25-Math.abs(c-vw*.55)/(vw*.75)));f.style.setProperty('--r',Math.min(1,.3+v).toFixed(3));if(c<vw*.7)cur=k+1});var o=g.querySelector('[data-cur]');if(o)o.textContent=(cur<10?'0':'')+cur})}
var cuOff=null;function on(){if(cuOff)cuOff();if(!raf)raf=requestAnimationFrame(frame)}
layout();frame();W.addEventListener('scroll',on,{passive:true});W.addEventListener('resize',function(){layout();on()});W.addEventListener('load',function(){layout();on()});
q('[data-hscroll] [data-scroll]').forEach(function(b){b.addEventListener('click',function(){setTimeout(function(){var tr=d.getElementById(b.getAttribute('aria-controls'));if(!tr)return;var fs=q('figure',tr),k=0;fs.forEach(function(f,n){if(f.getBoundingClientRect().left<W.innerWidth*.4)k=n});var o=b.closest('[data-hscroll]').querySelector('[data-cur]');if(o)o.textContent=(k+1<10?'0':'')+(k+1)},420)})});
q('[data-hscroll] .ct-gal-track').forEach(function(tr){tr.addEventListener('scroll',function(){var fs=q('figure',tr),k=0;fs.forEach(function(f,n){if(f.getBoundingClientRect().left<W.innerWidth*.45)k=n});var o=tr.closest('[data-hscroll]').querySelector('[data-cur]');if(o)o.textContent=(k+1<10?'0':'')+(k+1)},{passive:true})});
if(fine&&!reduce){var cu=d.createElement('div');cu.className='ct-cursor';cu.setAttribute('aria-hidden','true');root.appendChild(cu);cuOff=function(){cu.classList.remove('on')};var x=-200,y=-200,tx=-200,ty=-200,lr=0;function loop(){x+=(tx-x)*.2;y+=(ty-y)*.2;cu.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';lr=Math.abs(tx-x)+Math.abs(ty-y)>.3?requestAnimationFrame(loop):0}
d.addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;var t=e.target.closest&&e.target.closest('[data-cursor]');if(t){if(cu.textContent!==t.getAttribute('data-cursor'))cu.textContent=t.getAttribute('data-cursor');cu.classList.add('on')}else cu.classList.remove('on');if(!lr)lr=requestAnimationFrame(loop)},{passive:true})}
q('[data-book]').forEach(function(p){var uid=p.getAttribute('data-uid'),lang=p.getAttribute('data-lang')||'nl',f=function(n){return d.getElementById(uid+'-'+n)};var sel=f('service'),date=f('date'),time=f('time');
var out=function(k,v){q('[data-sum="'+k+'"]',p).forEach(function(o){o.textContent=v||'—'})};
function press(g,b){q('button',g).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')})}
q('[data-pick="service"] button',p).forEach(function(b){b.addEventListener('click',function(){press(b.parentNode,b);var v=b.getAttribute('data-value');if(sel)sel.value=v;out('service',v)})});
if(sel)sel.addEventListener('change',function(){out('service',sel.value);q('[data-pick="service"] button',p).forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-value')===sel.value?'true':'false')})});
var hrs={};try{hrs=JSON.parse(p.getAttribute('data-hours')||'{}')}catch(e){}
var dg=p.querySelector('[data-pick="day"]'),tg=p.querySelector('[data-pick="time"]');if(!dg||!tg)return;
var fmt,fmtL;try{fmt=new Intl.DateTimeFormat(lang,{weekday:'short',day:'numeric',month:'short'});fmtL=new Intl.DateTimeFormat(lang,{weekday:'long',day:'numeric',month:'long'})}catch(e){fmt=fmtL={format:function(x){return x.toDateString()}}}
var two=function(n){return (n<10?'0':'')+n},iso=function(x){return x.getFullYear()+'-'+two(x.getMonth()+1)+'-'+two(x.getDate())};
var now=new Date(),mins=now.getHours()*60+now.getMinutes(),made=0;
for(var k=0;k<21&&made<8;k++){var day=new Date(now.getFullYear(),now.getMonth(),now.getDate()+k),sp=hrs[day.getDay()];if(!sp||!sp.length)continue;var late=k===0&&sp.every(function(s){return s[1]-30<=mins+60});if(late)continue;made++;(function(day,sp,first){var b=d.createElement('button');b.type='button';b.setAttribute('aria-pressed','false');var parts=fmt.format(day).split(/,?\\s+/);b.innerHTML='<span></span><small></small>';b.firstChild.textContent=parts.slice(1).join(' ')||fmt.format(day);b.lastChild.textContent=parts[0];b.setAttribute('aria-label',fmtL.format(day));b.addEventListener('click',function(){press(dg,b);if(date)date.value=iso(day);out('day',fmtL.format(day));out('time','');if(time)time.value='';slots(sp,first?mins+60:0)});dg.appendChild(b)})(day,sp,k===0)}
function slots(sp,from){tg.innerHTML='';sp.forEach(function(s){for(var m=Math.ceil(Math.max(s[0],from)/30)*30;m<=s[1]-30;m+=30){(function(m){var b=d.createElement('button');b.type='button';b.setAttribute('aria-pressed','false');b.textContent=two(Math.floor(m/60)%24)+':'+two(m%60);b.addEventListener('click',function(){press(tg,b);if(time)time.value=b.textContent;out('time',b.textContent)});tg.appendChild(b)})(m)}});tg.classList.add('is-grid')}
if(made)p.classList.add('has-days');else{q('[data-only-days]',p).forEach(function(n){n.hidden=true})}
if(date)date.addEventListener('change',function(){out('day',date.value)});if(time)time.addEventListener('change',function(){out('time',time.value)})})})();`;

/* Labels the design adds itself, per language. */
const LABELS = {
  nl: { book: "Boek", drag: "Sleep", view: "Bekijk", service: "Behandeling", day: "Dag", time: "Tijd", your: "Jouw afspraak", pickDay: "Kies eerst een dag.", details: "Je gegevens", fig: "Fig.", next: "Volgende", prev: "Vorige", noDays: "Kies een datum en tijd in het formulier." },
  en: { book: "Book", drag: "Drag", view: "View", service: "Service", day: "Day", time: "Time", your: "Your appointment", pickDay: "Choose a day first.", details: "Your details", fig: "Fig.", next: "Next", prev: "Previous", noDays: "Choose a date and time in the form." },
  de: { book: "Buchen", drag: "Ziehen", view: "Ansehen", service: "Behandlung", day: "Tag", time: "Uhrzeit", your: "Ihr Termin", pickDay: "Wählen Sie zuerst einen Tag.", details: "Ihre Angaben", fig: "Abb.", next: "Weiter", prev: "Zurück", noDays: "Wählen Sie Datum und Uhrzeit im Formular." },
  fr: { book: "Réserver", drag: "Glisser", view: "Voir", service: "Prestation", day: "Jour", time: "Heure", your: "Votre rendez-vous", pickDay: "Choisissez d’abord un jour.", details: "Vos coordonnées", fig: "Fig.", next: "Suivant", prev: "Précédent", noDays: "Choisissez une date et une heure dans le formulaire." },
};
const L = (c: Ctx) => LABELS[c.spec.meta.lang as keyof typeof LABELS] ?? LABELS.en;

const pad = (n: number) => String(n).padStart(2, "0");
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/* ── Opening hours as minutes per weekday, for the booking panel (only what can be read with certainty) ── */
const DAY_RE: [RegExp, number][] = [
  [/^(maandag|monday|montag|lundi|ma|mon|mo|lun)$/, 1],
  [/^(dinsdag|tuesday|dienstag|mardi|di|tue|tu|mar)$/, 2],
  [/^(woensdag|wednesday|mittwoch|mercredi|wo|wed|mi|mer)$/, 3],
  [/^(donderdag|thursday|donnerstag|jeudi|do|thu|th|jeu)$/, 4],
  [/^(vrijdag|friday|freitag|vendredi|vr|fri|fr|ven)$/, 5],
  [/^(zaterdag|saturday|samstag|samedi|za|sat|sa|sam)$/, 6],
  [/^(zondag|sunday|sonntag|dimanche|zo|sun|so|dim)$/, 0],
];
const dayOf = (w: string) => DAY_RE.find(([r]) => r.test(w.toLowerCase().replace(/[^a-zäöüéèû]/g, "")))?.[1] ?? null;

export function openSpans(lines: string[] | null | undefined): Record<number, [number, number][]> | null {
  if (!lines?.length) return null;
  const out: Record<number, [number, number][]> = {};
  let read = 0;
  for (const [label, time] of hoursRows(lines)) {
    const words = label.toLowerCase().match(/[a-zäöüéèû]+/g) ?? [];
    const parts = label.split(/\s*(?:–|—|-|t\/m|tot en met|to|bis|à|au)\s*/i);
    let days: number[] = [];
    if (parts.length === 2) {
      const a = dayOf(parts[0].trim().split(/\s+/)[0]);
      const b = dayOf(parts[1].trim().split(/\s+/)[0]);
      if (a != null && b != null) for (let k = a, g = 0; g < 8; g++, k = (k + 1) % 7) {
        days.push(k);
        if (k === b) break;
      }
    }
    if (!days.length) days = words.map(dayOf).filter((x): x is number => x != null);
    if (!days.length) continue;
    if (/gesloten|closed|geschlossen|ferm/i.test(time)) {
      read++;
      continue;
    }
    const spans: [number, number][] = [];
    for (const m of time.matchAll(/(\d{1,2})[:.](\d{2})\s*(?:–|—|-|tot|to|bis|à)\s*(\d{1,2})[:.](\d{2})/g)) {
      const s = +m[1] * 60 + +m[2];
      const e = +m[3] * 60 + +m[4];
      if (e > s) spans.push([s, e]);
    }
    if (!spans.length) continue;
    read++;
    days.forEach((d) => (out[d] = [...(out[d] ?? []), ...spans]));
  }
  return read && Object.keys(out).length ? out : null;
}

const target = (spec: SiteSpec) => spec.sections.find((s) => s.type === "booking")?.id ?? spec.sections.find((s) => s.type === "contact")?.id;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

function Head({ kicker, title, intro, id, row }: { kicker?: string; title: string; intro?: string; id?: string; row?: boolean }) {
  return (
    <header className={`ct-head${row && intro ? " is-row" : ""}`}>
      {kicker ? (
        <p className="ct-kick" data-rv>
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

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="ct-hdr hdr">
        <div className="ct-wrap ct-bar">
          <a href="#top" className="ct-logo" aria-label={c.name}>
            <b>{c.name}</b>
            {b.city ? <span aria-hidden="true">{b.city}</span> : null}
          </a>
          <nav aria-label={c.t.menu} className="ct-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn ct-fill ct-hcta">
            {cta.label}
          </a>
          <button type="button" className="ct-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="ct-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{pad(k + 1)}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ct-menu-foot">
          <p>
            {b.address ?? b.city}
            {b.phone ? (
              <>
                <br />
                <a href={tel(b.phone)}>{b.phone}</a>
              </>
            ) : null}
            {b.openingHours?.length ? (
              <>
                <br />
                {b.openingHours.find((l) => !/gesloten|closed|ferm|geschlossen/i.test(l)) ?? b.openingHours[0]}
              </>
            ) : null}
          </p>
          <a href={cta.href} className="btn ct-fill">
            {cta.label} <Arrow />
          </a>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 48 ? "is-s" : plain.length > 28 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const words = offerWords(c, 4);
  return (
    <section className={`ct-hero${p ? "" : " is-plain"}`}>
      <div className="ct-wrap">
        <div className="ct-hero-grid">
          <div>
            <p className="ct-top">
              {hero.eyebrow ? <span>{hero.eyebrow}</span> : null}
              <NowBadge c={c} className="ct-now" />
            </p>
            {/* The headline, cut in two along a blade of light; the lower half is decoration. */}
            <h1 className={`ct-h1${size ? ` ${size}` : ""}`}>
              <span className="ct-cut">
                <span className="ct-cut-a">{em(hero.headline)}</span>
                <span className="ct-cut-b" aria-hidden="true">
                  {em(hero.headline)}
                </span>
              </span>
              <i className="ct-blade" aria-hidden="true" />
            </h1>
            <p className="ct-lede">{hero.subheadline}</p>
            <div className="ct-ctas">
              <Btn c={c} href={hero.primaryCta.href}>
                {hero.primaryCta.label} <Arrow />
              </Btn>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="text">
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
            </div>
          </div>
          {p ? (
            <figure className="ct-hero-pic">
              <div className="ct-hero-frame" data-px>
                <Pic p={p} eager sizes="(min-width: 980px) 34vw, 92vw" />
              </div>
              <figcaption className="ct-cap" aria-hidden="true">
                <span>{L(c).fig} 01</span>
                <span>{hero.note || c.spec.business.city || c.name}</span>
              </figcaption>
            </figure>
          ) : (
            <div className="ct-mono" aria-hidden="true">
              <span>{c.name.charAt(0)}</span>
              {words.length ? (
                <ul>
                  {words.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </div>
        {facts.length > 0 && (
          <dl className="ct-facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="ct-foot">
      <div className="ct-wrap">
        <a href={cta.href} className="ct-foot-cta">
          <span>{cta.label}</span>
          <Arrow />
        </a>
        <p className="ct-foot-name" aria-hidden="true" data-px style={css({ "--n": Math.max(6, c.name.length) })}>
          <span>{c.name}</span>
          <span>{c.name}</span>
        </p>
        <div className="ct-foot-grid">
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
          {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
        </div>
        <Legal c={c} className="ct-legal" />
      </div>
    </footer>
  );
}

export const cutline: Family = {
  key: "cutline",
  root: "d-cutline",
  fonts: ["DM Serif Display", "Inter Tight"],
  themeColor: "#0d0c0b",
  accent: "#eeeae3",
  onAccent: "#0d0c0b",
  css: CSS,
  extra: EXTRA,
  js: JS + TODAY_JS,
  cls: { wrap: "ct-wrap", eyebrow: "ct-kick", btn: "ct-fill", btnAlt: "ct-line", btnText: "ct-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="ct-sec" id={s.id}>
          <div className={`ct-wrap ct-about-grid${p ? "" : " is-solo"}`}>
            <div className="ct-about-head">
              <Head kicker={c.t.kick.about} title={s.title} />
            </div>
            <div className="ct-about-text">
              <p className="ct-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ol className="ct-roman" data-rv>
                  {s.highlights.map((h, n) => (
                    <li key={h}>
                      <b>{ROMAN[n]}</b>
                      {h}
                    </li>
                  ))}
                </ol>
              )}
            </div>
            {p ? (
              <figure className="ct-about-side">
                <div className="ct-reveal" data-rv data-px>
                  <Pic p={p} sizes="(min-width: 980px) 30vw, 92vw" />
                </div>
                <figcaption className="ct-cap" aria-hidden="true">
                  <span>{L(c).fig} 02</span>
                  <span>{c.name}</span>
                </figcaption>
              </figure>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => {
      const go = target(c.spec);
      const l = L(c);
      return (
        <section className="ct-sec is-bone" id={s.id}>
          <div className="ct-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} row />
            <ul className="ct-svc-grid">
              {s.items.map((it, n) => {
                const p = c.photo(`art:svc${n}`);
                const inner: ReactNode = (
                  <>
                    {p ? (
                      <figure className="ct-svc-pic">
                        <Pic p={p} sizes="(min-width: 900px) 33vw, 92vw" />
                      </figure>
                    ) : null}
                    <p className="ct-svc-top">
                      <span>{pad(n + 1)}</span>
                      {it.duration ? <span>{it.duration}</span> : null}
                    </p>
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                    <div className="ct-svc-foot">
                      {it.price ? <b>{it.price}</b> : null}
                      {go ? (
                        <span className="ct-svc-go" aria-hidden="true">
                          <Arrow />
                        </span>
                      ) : null}
                    </div>
                  </>
                );
                const cls = `ct-svc${p ? "" : " no-pic"}`;
                return (
                  <li key={n} data-rv style={i(n % 3)}>
                    {go ? (
                      <a className={cls} href={`#${go}`} data-cursor={l.book}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      );
    },
    team: (s, c) => (
      <section className="ct-sec" id={s.id}>
        <div className="ct-wrap">
          <Head kicker={c.t.kick.team} title={s.title} intro={s.intro} row />
          <ul className="ct-crew">
            {s.members.map((m, n) => {
              const p = c.photo(m.image);
              return (
                <li key={n} className="ct-barber" data-rv style={i(n % 3)}>
                  {p ? (
                    <div className="ct-reveal" data-rv>
                      <Pic p={p} sizes="(min-width: 900px) 30vw, 92vw" />
                    </div>
                  ) : (
                    <span className="ct-barber-mono" aria-hidden="true">
                      {(m.role || m.name).charAt(0)}
                    </span>
                  )}
                  <h3>{m.role}</h3>
                  <p className="ct-barber-name">{m.name}</p>
                  {m.bio ? <p>{m.bio}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const l = L(c);
      const track = `${s.id}-track`;
      return (
        <section className="ct-gal" id={s.id} data-hscroll>
          <div className="ct-gal-pin">
            <div className="ct-wrap ct-gal-top">
              <Head kicker={c.t.kick.gallery} title={s.title} />
              <div className="ct-gal-ctl">
                <button type="button" data-scroll="prev" aria-controls={track} aria-label={l.prev}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                    <path d="M20 12H4M10 6l-6 6 6 6" />
                  </svg>
                </button>
                <span aria-hidden="true">
                  <b data-cur>01</b> / {pad(pics.length)}
                </span>
                <button type="button" data-scroll="next" aria-controls={track} aria-label={l.next}>
                  <Arrow />
                </button>
              </div>
            </div>
            <div className="ct-gal-track" id={track} data-cursor={l.drag}>
              {pics.map((p, n) => (
                <figure key={n}>
                  <div>
                    <Pic p={p} sizes="(min-width: 900px) 40vw, 78vw" />
                  </div>
                  <figcaption aria-hidden="true">
                    <span>
                      {l.fig} {pad(n + 3)}
                    </span>
                    <span>{c.spec.business.city ?? c.name}</span>
                  </figcaption>
                </figure>
              ))}
              <p className="ct-gal-end" aria-hidden="true">
                {c.name}
              </p>
            </div>
          </div>
        </section>
      );
    },
    process: (s, c) => (
      <section className="ct-sec is-bone" id={s.id}>
        <div className="ct-wrap ct-proc">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <ol className="ct-steps2">
            {s.steps.map((st, n) => (
              <li key={n} data-rv style={i(n)}>
                <b aria-hidden="true">{ROMAN[n]}</b>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    features: (s, c) => (
      <section className="ct-sec is-coal" id={s.id}>
        <div className="ct-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} row />
          <ul className="ct-feat">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span className="z-ico">
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
    packages: (s, c) => (
      <section className="ct-sec" id={s.id}>
        <div className="ct-wrap">
          <Head kicker={c.t.kick.packages} title={s.title} intro={s.intro} row />
          <div className="ct-packs">
            {s.items.map((it, n) => (
              <article key={n} className={`ct-pack${it.featured ? " is-feat" : ""}`} data-rv style={i(n % 3)}>
                <p className="ct-pack-tag">{it.featured ? c.t.popular : `${ROMAN[n]}.`}</p>
                <h3>{it.name}</h3>
                <p className="ct-pack-price">
                  {it.price ? (
                    <>
                      <b>{it.price}</b>
                      {it.unit ? <span>{it.unit}</span> : null}
                    </>
                  ) : (
                    <span>{c.t.onRequest}</span>
                  )}
                </p>
                {it.description ? <p>{it.description}</p> : null}
                {it.features.length > 0 && (
                  <ul>
                    {it.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
          {s.note ? (
            <p className="ct-fine" data-rv>
              {s.note}
            </p>
          ) : null}
        </div>
      </section>
    ),
    hours: (s, c) => (
      <section className="ct-sec" id={s.id}>
        <div className="ct-wrap ct-split">
          <div className="ct-split-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="ct-ledger" data-rv>
            <div className="ct-ledger-top">
              <h3>{c.t.hours}</h3>
              <NowBadge c={c} className="ct-now" />
            </div>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    booking: (s, c) => {
      const l = L(c);
      const uid = `f-${s.id}`;
      const timed = s.kind === "appointment" || s.kind === "reservation";
      const spans = timed ? openSpans(c.spec.business.openingHours) : null;
      const opts = s.kind === "appointment" ? s.options : [];
      return (
        <section className="ct-sec" id={s.id}>
          <div className="ct-wrap ct-book-grid">
            <div className="ct-book-copy">
              <Head kicker={c.t.kick.booking} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Reach c={c} />
            </div>
            <div className="ct-panel" data-rv data-book data-uid={uid} data-lang={c.spec.meta.lang} data-hours={spans ? JSON.stringify(spans) : undefined}>
              {opts.length > 0 || spans ? (
                <ol className="ct-flow">
                  {opts.length > 0 ? (
                    <li className="ct-step">
                      <p className="ct-step-h">
                        <b>I</b>
                        {l.service}
                      </p>
                      <div className="ct-chips" data-pick="service">
                        {opts.map((o) => (
                          <button key={o} type="button" aria-pressed="false" data-value={o}>
                            {o}
                          </button>
                        ))}
                      </div>
                    </li>
                  ) : null}
                  {spans ? (
                    <>
                      <li className="ct-step" data-only-days>
                        <p className="ct-step-h">
                          <b>{opts.length ? "II" : "I"}</b>
                          {l.day}
                        </p>
                        <div className="ct-chips ct-days" data-pick="day" />
                      </li>
                      <li className="ct-step" data-only-days>
                        <p className="ct-step-h">
                          <b>{opts.length ? "III" : "II"}</b>
                          {l.time}
                        </p>
                        <div className="ct-chips" data-pick="time">
                          <p className="ct-hint">{l.pickDay}</p>
                        </div>
                      </li>
                    </>
                  ) : null}
                </ol>
              ) : null}
              {opts.length > 0 || spans ? (
                <div className="ct-sum" aria-live="polite">
                  <p>{l.your}</p>
                  <dl>
                    {opts.length > 0 ? (
                      <div>
                        <dt>{l.service}</dt>
                        <dd data-sum="service">—</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt>{l.day}</dt>
                      <dd data-sum="day">—</dd>
                    </div>
                    <div>
                      <dt>{l.time}</dt>
                      <dd data-sum="time">—</dd>
                    </div>
                  </dl>
                </div>
              ) : null}
              <div className="ct-form">
                <p className="ct-step-h ct-form-h">{l.details}</p>
                <DemoForm c={c} kind={s.kind} options={s.options} uid={uid} />
              </div>
            </div>
          </div>
        </section>
      );
    },
    contact: (s, c) => (
      <section className="ct-sec is-bone" id={s.id}>
        <div className="ct-wrap ct-split">
          <div className="ct-split-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
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
      </section>
    ),
  },
};
