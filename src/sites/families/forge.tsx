import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { CSS } from "./css/fitness";
import { Btn, css, DemoForm, em, heroFacts, Hours, hoursRows, i, Icon, Legal, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Forge (demo: /demos/fitness). Black, white and one acid green: condensed capitals as large
 * as the screen allows, hard black-and-white photography, diagonal cuts and running bands.
 * Made for gyms, personal trainers, sports studios and tattoo studios.
 *
 * Anton has one weight and is always set in capitals, so every large line is sized from its
 * own text: `--lw` carries the width of its longest word (in em) and the stylesheet divides
 * the room of the surrounding container by it. Nothing can run off a 360px screen.
 */

const EXTRA = `
.d-forge{--f-display:"Anton";--f-text:"Inter Tight";--z-bg2:var(--bg-2);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--acid);--z-on-accent:#0b0b0b;--z-display:var(--f-display),Impact,sans-serif;--z-radius:0;--z-ico-radius:0;--z-field-radius:0;--z-h3:clamp(28px,2.6vw,40px);--z-sec:clamp(80px,10vw,170px);--col:calc(min(100vw,1560px) - var(--pad)*2);counter-reset:fsec}
.d-forge main>section:has(.f-num){counter-increment:fsec}
.d-forge .f-num::before{content:counter(fsec,decimal-leading-zero)}
.d-forge .f-slash{flex:none;width:11px;height:18px;background:var(--acid);clip-path:polygon(45% 0,100% 0,55% 100%,0 100%)}
.d-forge .f-kicker{min-width:0}
.d-forge .f-fit,.d-forge .f-head,.d-forge .f-head-split>div,.d-forge .f-results-side,.d-forge .f-trial-copy{container-type:inline-size}
.d-forge .f-h.f-h{--h2:14.6vw;max-width:none;font-size:min(calc(var(--h2)*var(--hk,1)),calc(var(--col)/var(--lw,6)));font-size:min(calc(var(--h2)*var(--hk,1)),calc(100cqw/var(--lw,6)));overflow-wrap:break-word;text-wrap:balance}
.d-forge .f-h.f-h.is-m{--h2:11.4vw}
.d-forge .f-h.f-h.is-l{--h2:9.2vw;line-height:.96}
.d-forge .f-h.f-h.is-xl{--h2:7.6vw;line-height:.98}
@media (min-width:700px){.d-forge .f-h.f-h{--h2:clamp(92px,8.4vw,160px)}.d-forge .f-h.f-h.is-m{--h2:clamp(68px,6.4vw,122px)}.d-forge .f-h.f-h.is-l{--h2:clamp(52px,4.8vw,92px)}.d-forge .f-h.f-h.is-xl{--h2:clamp(42px,3.8vw,72px)}}
@media (min-width:900px){.d-forge .z-split{--hk:.72}.d-forge .f-results-side{--hk:.82}.d-forge .f-trial-copy{--hk:.86}}
.d-forge .f-btn{padding-block:8px}
.d-forge .f-btn svg{width:20px;height:20px}
.d-forge .f-btn-white{background:var(--ink)}
.d-forge .f-btn-white:hover{background:var(--acid)}
.d-forge .f-logo{flex:0 1 auto;min-width:0}
.d-forge .f-logo i{flex:none}
.d-forge .f-logo span{overflow:hidden;line-height:1.2;text-overflow:ellipsis;white-space:nowrap}
.d-forge .f-logo.is-long{font-size:21px}
.d-forge .f-logo.is-xl{font-size:16px}
.d-forge .f-links{flex:none;white-space:nowrap}
.d-forge .f-nav-cta{flex:none;max-width:280px;white-space:nowrap}
.d-forge .f-nav-cta span{overflow:hidden;text-overflow:ellipsis}
@media (min-width:1080px){.d-forge .f-logo{max-width:32vw}}
@media (min-width:1080px) and (max-width:1359px){.d-forge .f-links a:nth-child(n+4){display:none}}
.d-forge.menu-open.menu-open .f-nav.hdr{border-color:transparent;background:none;color:#0b0b0b}
.d-forge.menu-open .f-logo i{background:#0b0b0b}
.d-forge.menu-open .f-nav :focus-visible{outline-color:#0b0b0b}
.d-forge .f-menu nav a{font-size:min(clamp(38px,min(12.6vw,7.6svh),64px),calc((100vw - var(--pad)*2 - 40px)/var(--lw,5)));white-space:nowrap}
.d-forge .f-menu-foot p a{display:inline-flex;align-items:center;min-height:44px;font-weight:700;text-decoration:underline;text-underline-offset:3px}
.d-forge .f-hero h1{font-size:min(25vw,calc(50svh/var(--ln,3)),calc((100vw - var(--pad)*2)/var(--lw,5)))}
.d-forge .f-hero h1 em{font-style:normal;color:var(--acid)}
.d-forge .f-l:nth-child(4)>span{animation-delay:.4s}
.d-forge .f-l:nth-child(5)>span{animation-delay:.5s}
.d-forge .f-hero-in:last-child{padding-bottom:calc(46px + 2.4vw)}
.d-forge .f-hero-facts{grid-template-columns:minmax(0,1fr);gap:0;padding-top:4px}
.d-forge .f-hero-facts div{display:flex;justify-content:space-between;align-items:center;gap:18px;min-height:44px;padding:8px 0;border-bottom:1px solid var(--line)}
.d-forge .f-hero-facts div:last-child{border-bottom:0}
.d-forge .f-hero-facts dt{flex:none;max-width:none;margin:0;font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--acid)}
.d-forge .f-hero-facts dd{margin:0;font-family:var(--f-text),system-ui,sans-serif;font-size:14.5px;font-weight:600;line-height:1.3;text-align:right}
.d-forge .f-hero-facts dd a{display:inline-flex;align-items:center;min-height:44px;margin-block:-8px}
.d-forge .f-hero-slab{position:absolute;inset:0;z-index:-1;overflow:hidden;background:var(--bg-2)}
.d-forge .f-hero-slab p{position:absolute;top:74px;right:-3vw;display:grid;justify-items:end;font-family:var(--f-display),Impact,sans-serif;font-size:clamp(70px,19vw,260px);line-height:.86;text-transform:uppercase;white-space:nowrap;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.16);transform:rotate(-4deg);transform-origin:100% 0;user-select:none}
.d-forge .f-hero-slab span:nth-child(3n+2){color:rgba(255,255,255,.06);-webkit-text-stroke:0}
.d-forge .f-hero-slab::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,11,11,0) 12%,rgba(11,11,11,.82) 56%,var(--bg) 90%)}
.d-forge .f-hero-edge{display:none}
@media (min-width:900px){.d-forge .f-hero h1{font-size:min(16.2vw,calc(60svh/var(--ln,3)),calc((100vw - var(--pad)*2)/var(--lw,5)))}.d-forge .f-hero .f-l:nth-child(n){display:block}.d-forge .f-hero-facts{grid-template-columns:repeat(3,auto);gap:clamp(40px,6vw,110px);padding-top:16px}.d-forge .f-hero-facts div{display:block;min-height:0;padding:0;border:0}.d-forge .f-hero-facts dd{max-width:32ch;margin-top:6px;font-size:16px;text-align:left}.d-forge .f-hero-facts dd a{margin-block:-12px}.d-forge .f-hero-slab{left:auto;width:60vw;clip-path:polygon(26% 0,100% 0,100% 100%,0 100%);animation:f-open .8s var(--cut) .05s both}.d-forge .f-hero-slab p{top:90px;font-size:clamp(120px,13vw,250px)}.d-forge .f-hero-slab::after{background:linear-gradient(180deg,rgba(11,11,11,0) 30%,rgba(11,11,11,.7) 100%)}.d-forge .f-hero-edge{position:absolute;inset:0 0 0 auto;z-index:-1;display:block;width:60vw;background:var(--acid);clip-path:polygon(26% 0,27.4% 0,1.4% 100%,0 100%);-webkit-mask-image:linear-gradient(180deg,transparent 64px,#000 150px,#000 calc(100% - 230px),transparent calc(100% - 150px));mask-image:linear-gradient(180deg,transparent 64px,#000 150px,#000 calc(100% - 230px),transparent calc(100% - 150px));animation:f-open .8s var(--cut) .05s both}}
@media (prefers-reduced-motion:reduce){.d-forge .f-band p{animation:none}}
.d-forge .f-prog-list>li{container-type:inline-size}
.d-forge .f-prog-list h3{--h3s:clamp(50px,15.4vw,76px);font-size:min(calc(var(--h3s)*var(--k,1)),calc((100cqw - var(--pad)*2)/var(--lw,5)));line-height:.94;overflow-wrap:break-word}
.d-forge .f-prog-list h3.is-m{--h3s:clamp(38px,11vw,56px)}
.d-forge .f-prog-list h3.is-l{--h3s:clamp(30px,8.4vw,44px)}
.d-forge .f-prog-list h3.is-xl{--h3s:clamp(26px,7vw,36px)}
.d-forge .f-prog-list.is-many{--k:.78}
.d-forge .f-prog-go{justify-self:end;min-width:0;text-align:right}
@media (min-width:900px){.d-forge .f-prog-main{container-type:inline-size;min-width:0}.d-forge .f-prog-list h3{--h3s:clamp(60px,7.2vw,132px);font-size:min(calc(var(--h3s)*var(--k,1)),calc(100cqw/var(--lw,5)))}.d-forge .f-prog-list h3.is-m{--h3s:clamp(48px,5.2vw,96px)}.d-forge .f-prog-list h3.is-l{--h3s:clamp(38px,3.8vw,70px)}.d-forge .f-prog-list h3.is-xl{--h3s:clamp(32px,3vw,54px)}.d-forge .f-prog-list a.no-pic{grid-template-columns:clamp(64px,7.5vw,130px) minmax(0,1fr);grid-template-areas:"n main" "n go"}.d-forge .f-prog-list a.no-meta .f-prog-sub{grid-template-columns:minmax(0,1fr)}.d-forge .f-prog-list a.no-meta .f-prog-go{margin-left:0}.d-forge .f-prog-go{justify-self:start;text-align:left}}
.d-forge .f-club{margin-top:0}
.d-forge .f-club-top.no-pic{min-height:0;padding:clamp(96px,12vw,190px) 0 0}
.d-forge .f-club-grid.is-solo{grid-template-columns:minmax(0,1fr)}
.d-forge .f-club-grid.is-solo .f-club-copy{max-width:980px}
.d-forge .f-club-copy>:first-child:first-child{margin-top:0}
.d-forge .f-club-side{aspect-ratio:4/3;background:var(--bg-3);clip-path:polygon(0 0,100% 0,100% 86%,0 100%)}
.d-forge .f-club-side img,.d-forge .f-side-pic img,.d-forge .f-mosaic img{display:block;width:100%;height:100%;object-fit:cover}
.d-forge .f-show .f-big{max-width:40ch;margin-top:20px}
.d-forge .f-show .btn{margin-top:26px}
.d-forge .f-show.no-pic{min-height:0;padding:clamp(80px,10vw,160px) 0;background:var(--bg-2)}
.d-forge .f-slab{position:relative;isolation:isolate;padding:clamp(84px,10vw,170px) 0 clamp(90px,11vw,180px)}
.d-forge .f-slab::before{content:"";position:absolute;inset:0;z-index:-2;background:var(--bg-2);transform:skewY(-2deg)}
.d-forge .f-feat{display:grid;gap:34px clamp(18px,2.4vw,40px)}
.d-forge .f-feat li{container-type:inline-size;padding-top:16px;border-top:2px solid var(--ink)}
.d-forge .f-feat-ico{display:grid;place-items:center;width:52px;height:40px;margin-bottom:18px;background:var(--acid);color:#0b0b0b;clip-path:polygon(9px 0,100% 0,calc(100% - 9px) 100%,0 100%)}
.d-forge .f-feat-ico svg{width:22px;height:22px;stroke-width:2.2}
.d-forge .f-feat h3{font-size:min(clamp(32px,3.1vw,50px),calc(100cqw/var(--lw,5)));line-height:.96;overflow-wrap:break-word}
.d-forge .f-feat p{max-width:40ch;margin-top:10px;color:var(--dim)}
@media (min-width:620px){.d-forge .f-feat{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){.d-forge .f-feat{grid-template-columns:repeat(3,minmax(0,1fr))}.d-forge .f-feat[data-n="2"]{grid-template-columns:repeat(2,minmax(0,1fr))}.d-forge .f-feat[data-n="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}}
.d-forge .f-plan{container-type:inline-size}
.d-forge .f-plan.is-top{padding-top:56px}
.d-forge .f-plan h3{font-size:min(clamp(44px,4.4vw,72px),calc(100cqw/var(--lw,4)));overflow-wrap:break-word}
.d-forge .f-price{flex-wrap:wrap;gap:4px 10px;overflow:visible}
.d-forge .f-price b{font-size:min(clamp(96px,10vw,170px),calc(100cqw/var(--lw,3)));text-transform:uppercase;white-space:nowrap}
.d-forge .f-price.is-ask b{font-size:min(clamp(46px,4.4vw,72px),calc(100cqw/var(--lw,5)));line-height:.95;white-space:normal}
.d-forge .f-price-per{width:auto;max-width:16ch;padding-bottom:.5em}
.d-forge .f-price:nth-last-child(2){margin-bottom:28px}
.d-forge .f-plan-points span{min-width:0}
@media (min-width:900px){.d-forge .f-plans{grid-template-columns:repeat(3,minmax(0,1fr))}.d-forge .f-plans[data-n="1"]{grid-template-columns:minmax(0,560px)}.d-forge .f-plans[data-n="2"],.d-forge .f-plans[data-n="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}.d-forge .f-plans[data-n="2"]{max-width:1100px}}
@media (min-width:1280px){.d-forge .f-plans[data-n="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}}
.d-forge .f-proc,.d-forge .f-gal,.d-forge .f-state{padding:clamp(80px,10vw,170px) 0}
.d-forge .f-steps h3{font-size:clamp(26px,2.4vw,38px);line-height:1;overflow-wrap:break-word}
.d-forge .f-steps p{max-width:38ch;margin-top:8px;font-size:15.5px;font-weight:400;color:var(--dim)}
.d-forge .f-steps li>div{min-width:0}
@media (min-width:900px){.d-forge .f-proc .f-steps{margin-top:0;row-gap:clamp(34px,4vw,64px)}.d-forge .f-steps li{align-items:start}.d-forge .f-steps[data-n="2"],.d-forge .f-steps[data-n="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1280px){.d-forge .f-steps[data-n="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}.d-forge .f-steps[data-n="4"] b{font-size:clamp(70px,6.4vw,112px)}}
.d-forge .f-gal .f-head{margin-bottom:clamp(28px,4vw,56px)}
.d-forge .f-mosaic{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding-inline:var(--pad)}
.d-forge .f-mosaic figure{aspect-ratio:3/4;background:var(--bg-3)}
.d-forge .f-mosaic .is-w{grid-column:1/-1;aspect-ratio:3/2}
@media (min-width:900px){.d-forge .f-mosaic{grid-template-columns:repeat(12,minmax(0,1fr));gap:clamp(10px,1.2vw,20px);align-items:start;width:min(100%,1560px);margin-inline:auto}.d-forge .f-mosaic .c3{grid-column:span 3;aspect-ratio:3/4}.d-forge .f-mosaic .c4{grid-column:span 4;aspect-ratio:1}.d-forge .f-mosaic .c5{grid-column:span 5;aspect-ratio:4/3}.d-forge .f-mosaic .c7{grid-column:span 7;aspect-ratio:16/10}.d-forge .f-mosaic .c12{grid-column:1/-1;aspect-ratio:21/9}.d-forge .f-mosaic figure:nth-child(3n+2){margin-top:clamp(30px,5vw,70px)}}
.d-forge .f-results blockquote p.is-long{max-width:50ch;font-size:clamp(16.5px,1.25vw,19px);font-weight:400;letter-spacing:0;line-height:1.5}
.d-forge .f-results blockquote footer a{justify-self:start;display:inline-flex;align-items:center;min-height:44px;text-decoration:underline;text-underline-offset:3px}
.d-forge .f-results-list.is-solo .f-res-n{font-size:clamp(72px,7vw,120px)}
.d-forge .f-trial .f-big{max-width:38ch}
.d-forge .f-trial-side{display:grid;gap:26px;align-content:start;min-width:0}
.d-forge .f-side-pic{aspect-ratio:16/9;background:var(--bg-3)}
.d-forge .z-split{grid-template-columns:minmax(0,1fr)}
.d-forge .z-split>*{min-width:0}
@media (min-width:900px){.d-forge .z-split{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-forge .z-reach{max-width:100%}
.d-forge .z-reach a{max-width:100%;overflow-wrap:anywhere}
.d-forge .f-hours{border-top:1px solid var(--line)}
.d-forge .f-hours div{display:flex;justify-content:space-between;gap:20px;padding:11px 0;border-bottom:1px solid var(--line);font-size:15.5px}
.d-forge .f-hours dt{color:var(--dim)}
.d-forge .f-hours dd{margin:0;font-weight:600;text-align:right}
@media (min-width:900px){.d-forge .f-trial-grid{grid-template-areas:"copy card" "pic card";grid-template-rows:auto 1fr}.d-forge .f-trial-side{grid-area:pic}}
.d-forge .z-form{gap:24px}
.d-forge .z-field label,.d-forge .z-chipset legend{font-size:12px;font-weight:700;letter-spacing:.08em;color:var(--dim)}
.d-forge .z-field input,.d-forge .z-field select,.d-forge .z-field textarea{min-height:54px;border:1.5px solid rgba(255,255,255,.28);background-color:var(--bg-2);font-size:17px;color-scheme:dark}
.d-forge .z-field select{padding-right:40px;background-image:linear-gradient(45deg,transparent 50%,var(--acid) 50%),linear-gradient(135deg,var(--acid) 50%,transparent 50%);background-position:calc(100% - 21px) 50%,calc(100% - 15px) 50%;background-size:6px 6px;background-repeat:no-repeat}
.d-forge .z-field :focus-visible{outline:none;border-color:var(--acid);box-shadow:0 0 0 1px var(--acid)}
.d-forge .z-form .btn{min-height:64px}
.d-forge .form-note{font-size:13px}
.d-forge .form-status{border:0;border-left:4px solid var(--acid);background:var(--bg-2);font-size:14.5px;line-height:1.45}
.d-forge .z-panel{border:0;border-top:6px solid var(--acid)}
.d-forge .z-panel .z-field input,.d-forge .z-panel .z-field select,.d-forge .z-panel .z-field textarea{background-color:var(--bg)}
.d-forge .z-panel .form-status{background:var(--bg)}
.d-forge .f-cta-sec{position:relative;z-index:2}
.d-forge .f-foot-cta .f-h{margin:0}
.d-forge .f-foot-cta .f-h em{-webkit-text-stroke-color:#0b0b0b}
.d-forge .f-cta-body{max-width:52ch;margin-top:18px;font-size:clamp(17px,1.4vw,21px);font-weight:600;line-height:1.4}
.d-forge .f-foot-cta .f-link:hover{color:#0b0b0b;opacity:.7}
.d-forge .f-state .f-h{margin-top:18px}
.d-forge .f-tm{flex:0 0 min(76vw,340px);min-width:0;scroll-snap-align:start}
.d-forge .f-tm .f-coach{container-type:inline-size}
.d-forge .f-tm .f-coach .f-coach-pic img{object-position:50% 22%}
.d-forge .f-tm .f-coach-foot{transform:none}
.d-forge .f-tm .f-coach-name{height:auto;padding:0 16px 16px}
.d-forge .f-tm .f-coach-name b{--nm:clamp(44px,4.2vw,66px);font-size:min(var(--nm),calc((100cqw - 32px)/var(--lw,4)));overflow-wrap:break-word}
.d-forge .f-tm .f-coach-name.is-m b{--nm:clamp(32px,2.8vw,44px)}
.d-forge .f-tm .f-coach-name.is-l b,.d-forge .f-tm .f-coach-name.is-xl b{--nm:28px}
.d-forge .f-tm-role{margin-top:14px;font-size:11.5px;font-weight:700;letter-spacing:.1em;line-height:1.3;text-transform:uppercase;color:var(--acid)}
.d-forge .f-tm-bio{max-width:46ch;margin-top:8px;font-size:15px;color:var(--dim)}
.d-forge .f-crew{display:grid;gap:0 clamp(18px,2.4vw,40px)}
.d-forge .f-crew li{container-type:inline-size;padding:18px 0 30px;border-top:2px solid var(--ink)}
.d-forge .f-crew .f-prog-n{display:block;font-size:34px;padding:0}
.d-forge .f-crew h3{margin-top:12px;font-size:min(clamp(40px,4.4vw,68px),calc(100cqw/var(--lw,4)));overflow-wrap:break-word}
@media (min-width:700px){.d-forge .f-crew{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:900px){.d-forge .f-coach-row{grid-template-columns:repeat(4,minmax(0,1fr))}.d-forge .f-coach-row[data-n="1"]{grid-template-columns:minmax(0,360px)}.d-forge .f-coach-row[data-n="2"]{grid-template-columns:repeat(2,minmax(0,360px))}.d-forge .f-coach-row[data-n="3"],.d-forge .f-coach-row[data-n="5"],.d-forge .f-coach-row[data-n="6"]{grid-template-columns:repeat(3,minmax(0,1fr))}.d-forge .f-tm:nth-child(even){margin-top:64px}}
@media (min-width:1000px){.d-forge .f-crew{grid-template-columns:repeat(3,minmax(0,1fr))}.d-forge .f-crew[data-n="2"],.d-forge .f-crew[data-n="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}.d-forge .f-crew[data-n="1"]{grid-template-columns:minmax(0,1fr)}}
.d-forge .z-sec h3{line-height:1;overflow-wrap:break-word}
.d-forge .z-card{border:0;border-top:4px solid var(--acid)}
.d-forge .z-ico{width:52px;height:40px;border:0;background:var(--acid);color:#0b0b0b;clip-path:polygon(9px 0,100% 0,calc(100% - 9px) 100%,0 100%)}
.d-forge .z-channel{border-color:rgba(255,255,255,.28);background:var(--bg-2)}
.d-forge .z-acc{border-top:2px solid var(--ink)}
.d-forge .z-acc summary{font-size:clamp(18px,1.5vw,22px);font-weight:600;line-height:1.3}
.d-forge .z-acc summary i{width:18px;height:18px;color:var(--acid)}
.d-forge .z-acc summary i::before,.d-forge .z-acc summary i::after{height:3px;margin-top:-1.5px}
.d-forge .z-hours dd{font-weight:600;color:var(--ink)}
.d-forge .z-price,.d-forge .z-reach .z-route{font-weight:700}
.d-forge .z-dots b{font-weight:600}
.d-forge .f-foot:not(:has(>.f-foot-cta)){border-top:1px solid var(--line)}
.d-forge .f-foot-grid>div{min-width:0}
.d-forge .f-foot-grid a{overflow-wrap:anywhere}
.d-forge .f-foot-grid dd{margin:0;text-align:right}
.d-forge .f-foot-mark{height:calc(.9em*(var(--ln,1) - 1) + .64em);font-size:min(40.5vw,640px,calc(var(--col)/var(--lw,3)))}
.d-forge .f-foot-mark b{display:block;font-weight:400}
.d-forge .f-coaches{padding-bottom:clamp(60px,7vw,120px)}
@media (max-width:899px){.d-forge .f-foot-grid .is-wide{grid-column:1/-1}}
`
  .replace(/\n/g, "")
  .trim();

const plain = (s: string) => s.replace(/\*/g, "");
const pad2 = (n: number) => String(n + 1).padStart(2, "0");
const ext = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

/** Width of a line of Anton capitals, in em (measured generously: a line may never run off the screen). */
const wd = (s: string) => [...s.toUpperCase()].reduce((a, ch) => a + (/[MW]/.test(ch) ? 0.72 : /[IJ.,:;!'’|]/.test(ch) ? 0.3 : ch === " " ? 0.22 : /[-–·]/.test(ch) ? 0.34 : 0.52), 0);

/** Size class by length, plus the width of the longest word for the stylesheet to divide by. */
function fit(text: string, lim: [number, number, number] = [20, 36, 56]) {
  const p = plain(text);
  const lw = Math.max(2.4, ...p.split(/\s+|(?<=-)/).map(wd)) + 0.06;
  return { cls: p.length > lim[2] ? "is-xl" : p.length > lim[1] ? "is-l" : p.length > lim[0] ? "is-m" : "", style: css({ "--lw": lw.toFixed(2) }) };
}

const Kicker = ({ children }: { children: ReactNode }) => (
  <p className="f-kicker" data-rv>
    <b className="f-num" aria-hidden="true" />
    {children}
  </p>
);

function H2({ title, id, lim }: { title: string; id?: string; lim?: [number, number, number] }) {
  const f = fit(title, lim);
  return (
    <h2 id={id} className={`f-h ${f.cls}`.trim()} style={f.style} data-rv="slam">
      <span>{em(title)}</span>
    </h2>
  );
}

/** Section heading of the demo: number tab, headline and, beside it on wide screens, the introduction. */
function SecHead({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <header className={`f-head${intro ? " f-head-split" : ""}`}>
      <div>
        <Kicker>{kicker}</Kicker>
        <H2 title={title} />
      </div>
      {intro ? (
        <p className="f-head-text" data-rv>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

/** A running band of the business's own words. */
function Band({ words, kind }: { words: string[]; kind: "acid" | "line" }) {
  if (words.length < 2) return null;
  const reps = words.length >= 5 ? 2 : 4;
  const row = Array.from({ length: reps }, () => words).flat();
  return (
    <div className={`f-band f-band-${kind}`} aria-hidden="true">
      <p style={{ animationDuration: `${Math.round((row.length / 2) * 3.2)}s` }}>
        {row.map((w, n) => (
          <span key={n}>{w}</span>
        ))}
      </p>
    </div>
  );
}

function bandWords(c: Ctx): string[] {
  const words = offerWords(c);
  if (words.length < 3) for (const x of [c.name, c.spec.business.city]) if (x && !words.includes(x)) words.push(x);
  return words;
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const where = b.address ?? b.city;
  return (
    <>
      <header className="f-nav hdr">
        <a href="#top" className={`f-logo${c.name.length > 24 ? " is-xl" : c.name.length > 14 ? " is-long" : ""}`} aria-label={c.name}>
          <i aria-hidden="true" />
          <span>{c.name}</span>
        </a>
        <nav aria-label={c.t.menu} className="f-links" data-nav>
          {c.nav.slice(0, 4).map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href={cta.href} className="btn f-btn f-nav-cta" {...ext(cta.href)}>
          <span>{cta.label}</span>
        </a>
        <button type="button" className="f-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
          <span className="f-sr" data-label data-open={c.t.menu} data-close={c.t.close}>
            {c.t.menu}
          </span>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="site-menu" className="f-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={css({ "--i": k, "--lw": (wd(n.label) + 0.1).toFixed(2) })}>
              <small>{pad2(k)}</small>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="f-menu-foot">
          <a href={cta.href} className="btn f-btn f-btn-dark" {...ext(cta.href)}>
            {cta.label} <ArrowRight aria-hidden="true" strokeWidth={2.6} />
          </a>
          {where || b.phone ? (
            <p>
              {where}
              {where && b.phone ? <br /> : null}
              {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

type Word = { w: string; em: boolean };

/** The headline as lines of about equal length; words stay whole and keep their emphasis. */
function heroRows(text: string, parts: number): { rows: Word[][]; marked: boolean } {
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

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const len = plain(hero.headline).length;
  const { rows, marked } = heroRows(hero.headline, len <= 12 ? 2 : len <= 40 ? 3 : len <= 68 ? 4 : 5);
  const lw = Math.max(2.4, ...rows.map((r) => wd(r.map((x) => x.w).join(" ")))) + 0.14;
  const facts = heroFacts(c);
  const ghost = offerWords(c, 5);
  // Without a marked phrase the lines take the demo's rhythm: solid, outlined, acid.
  const look = (n: number) => (marked || rows.length < 2 ? undefined : n === rows.length - 1 ? "f-acid" : n === 1 && rows.length > 2 ? "f-out" : undefined);
  return (
    <>
      <section className={`f-hero${p ? "" : " no-pic"}`}>
        {p ? (
          <div className="f-hero-media">
            <Pic p={p} eager sizes="(min-width: 900px) 62vw, 100vw" />
          </div>
        ) : (
          <>
            <div className="f-hero-slab" aria-hidden="true">
              <p>
                {(ghost.length ? ghost : [c.name]).map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </p>
            </div>
            <i className="f-hero-edge" aria-hidden="true" />
          </>
        )}
        <div className="f-hero-in">
          {hero.eyebrow ? (
            <p className="f-kicker f-pop" style={i(0)}>
              <i className="f-slash" aria-hidden="true" />
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 style={css({ "--lw": lw.toFixed(2), "--ln": rows.length })}>
            {rows.map((row, n) => (
              <span className="f-l" key={n}>
                <span className={look(n)}>
                  {row.map((x, k) => (
                    <span key={k}>
                      {k ? " " : ""}
                      {x.em ? <em>{x.w}</em> : x.w}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h1>
          <div className="f-hero-row">
            <p className="f-lede f-pop" style={i(4)}>
              {hero.subheadline}
            </p>
            <div className="f-cta f-pop" style={i(5)}>
              <Btn c={c} href={hero.primaryCta.href}>
                {hero.primaryCta.label} <ArrowRight aria-hidden="true" strokeWidth={2.6} />
              </Btn>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="text">
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
            </div>
          </div>
        </div>
        {facts.length > 0 && (
          <dl className="f-hero-facts f-pop" style={i(7)}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
      <Band words={bandWords(c)} kind="acid" />
    </>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  // The acid closing block belongs to the design; when the page has its own call to action, that one is it.
  // The closing wordmark: a long name is stacked on two or three lines so it stays large.
  const nameW = wd(c.name);
  const mark = heroRows(c.name, nameW > 15 ? 3 : nameW > 7 ? 2 : 1).rows.map((r) => r.map((x) => x.w).join(" "));
  const closing = !c.spec.sections.some((s) => s.type === "cta") && b.tagline ? fit(b.tagline) : null;
  return (
    <footer className="f-foot">
      {closing ? (
        <div className="f-foot-cta">
          <div className="f-wrap">
            <div className="f-fit">
              <p className={`f-foot-line f-h ${closing.cls}`.trim()} style={closing.style}>
                {b.tagline}
              </p>
            </div>
            <div className="f-foot-acts">
              <a href={cta.href} className="btn f-btn f-btn-dark f-btn-big" {...ext(cta.href)}>
                {cta.label} <ArrowRight aria-hidden="true" strokeWidth={2.6} />
              </a>
              {b.phone ? (
                <a href={tel(b.phone)} className="f-link">
                  {b.phone}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <div className="f-wrap">
        <div className="f-foot-grid">
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
            <p>
              {c.name}
              {b.address ? (
                <>
                  <br />
                  {b.address}
                </>
              ) : null}
            </p>
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
            {b.mapsUrl ? (
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                {c.t.route}
              </a>
            ) : null}
          </div>
          {b.openingHours?.length ? (
            <div className="is-wide">
              <h3>{c.t.hours}</h3>
              <dl>
                {hoursRows(b.openingHours).map(([day, time], n) => (
                  <div key={n}>
                    <dt>{day}</dt>
                    <dd>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
          {c.spec.footer.blurb ? (
            <div className="is-wide">
              <h3>{c.name}</h3>
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
        </div>
        <p className="f-foot-mark" aria-hidden="true" data-px style={css({ "--lw": (Math.max(...mark.map(wd)) + 0.1).toFixed(2), "--ln": mark.length })}>
          <span>
            {mark.map((row) => (
              <b key={row}>{row}</b>
            ))}
          </span>
        </p>
        <Legal c={c} className="f-legal" />
      </div>
    </footer>
  );
}

/** Photo layouts on a twelve-column grid, per number of photographs (four uses the demo's own strip). */
const MOSAIC: Record<number, number[][]> = {
  1: [[12]],
  2: [[7, 5]],
  3: [[5, 3, 4]],
  5: [[7, 5], [4, 4, 4]],
  6: [[5, 3, 4], [4, 5, 3]],
  7: [[5, 3, 4], [7, 5], [5, 7]],
  8: [[5, 3, 4], [7, 5], [4, 5, 3]],
  9: [[5, 3, 4], [4, 5, 3], [3, 4, 5]],
};

export const forge: Family = {
  key: "forge",
  root: "d-forge",
  fonts: ["Anton", "Inter Tight"],
  themeColor: "#0b0b0b",
  accent: "#d7ff3e",
  onAccent: "#0b0b0b",
  css: CSS,
  extra: EXTRA,
  cls: { wrap: "f-wrap", eyebrow: "f-kicker", btn: "f-btn f-btn-big", btnAlt: "f-btn f-btn-big f-btn-white", btnText: "f-link" },
  Header,
  Hero,
  Footer,
  Head: (p) => (
    <header className="f-head">
      {p.kicker ? <Kicker>{p.kicker}</Kicker> : null}
      <H2 title={p.title} id={p.id} />
      {p.intro ? (
        <p className="f-head-text" data-rv>
          {p.intro}
        </p>
      ) : null}
    </header>
  ),
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const side = c.spare();
      const [first, ...rest] = s.paragraphs;
      const more = (
        <>
          {rest.map((x, n) => (
            <p key={n} data-rv>
              {x}
            </p>
          ))}
          {s.highlights.length > 0 && (
            <ul className="f-club-list" data-rv>
              {s.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
        </>
      );
      const hasMore = rest.length > 0 || s.highlights.length > 0;
      return (
        <>
          <section className="f-club" id={s.id}>
            <div className={`f-club-top${p ? "" : " no-pic"}`}>
              {p ? (
                <div className="f-club-photo" data-px>
                  <Pic p={p} sizes="100vw" />
                </div>
              ) : null}
              <div className="f-wrap">
                <div className="f-fit">
                  <Kicker>{c.t.kick.about}</Kicker>
                  <H2 title={s.title} />
                </div>
              </div>
            </div>
            <div className={`f-wrap f-club-grid${side || hasMore ? "" : " is-solo"}`}>
              <div className="f-club-copy">
                <p className="f-big" data-rv>
                  {first}
                </p>
                {side ? more : null}
              </div>
              {side ? (
                <figure className="f-club-side" data-rv="cut">
                  <Pic p={side} sizes="(min-width: 900px) 44vw, 92vw" />
                </figure>
              ) : hasMore ? (
                <div className="f-club-copy">{more}</div>
              ) : null}
            </div>
          </section>
          <Band words={[...bandWords(c)].reverse()} kind="line" />
        </>
      );
    },
    services: (s, c) => {
      const go = c.spec.hero.primaryCta;
      return (
        <section className="f-prog" id={s.id}>
          <div className="f-wrap">
            <SecHead kicker={c.t.kick.services} title={s.title} intro={s.intro} />
          </div>
          <ol className={`f-prog-list${s.items.length > 6 ? " is-many" : ""}`}>
            {s.items.map((it, n) => {
              const p = c.photo(`art:svc${n}`);
              const meta = [it.duration, it.price].filter((x): x is string => Boolean(x));
              const f = fit(it.title, [14, 28, 44]);
              return (
                <li key={n} data-rv style={i(n % 3)}>
                  <a href={go.href} className={`${p ? "" : "no-pic"}${meta.length ? "" : " no-meta"}`.trim() || undefined} {...ext(go.href)}>
                    <span className="f-prog-n" aria-hidden="true">
                      {pad2(n)}
                    </span>
                    <div className="f-prog-main">
                      <h3 className={f.cls || undefined} style={f.style}>
                        {it.title}
                      </h3>
                      <div className="f-prog-sub">
                        {meta.length > 0 && (
                          <ul className="f-prog-meta">
                            {meta.map((m) => (
                              <li key={m}>{m}</li>
                            ))}
                          </ul>
                        )}
                        <p>{it.description}</p>
                      </div>
                    </div>
                    {p ? (
                      <span className="f-prog-pic">
                        <Pic p={p} sizes="(min-width: 900px) 22vw, 92vw" />
                      </span>
                    ) : null}
                    <span className="f-prog-go">
                      {go.label} <ArrowUpRight aria-hidden="true" size={20} strokeWidth={2.4} />
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </section>
      );
    },
    features: (s, c) => (
      <section className="f-slab" id={s.id}>
        <p className="f-ghost" aria-hidden="true" data-px>
          {c.t.kick.features}
        </p>
        <div className="f-wrap">
          <SecHead kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="f-feat" data-n={s.items.length}>
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span className="f-feat-ico">
                  <Icon name={it.icon} />
                </span>
                <h3 style={fit(it.title).style}>{it.title}</h3>
                <p>{it.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    packages: (s, c) => {
      const go = c.spec.hero.primaryCta;
      return (
        <section className="f-member" id={s.id}>
          <div className="f-wrap">
            <SecHead kicker={c.t.kick.packages} title={s.title} intro={s.intro} />
            <ul className="f-plans" data-n={s.items.length}>
              {s.items.map((it, n) => (
                <li key={n} className={`f-plan${it.featured ? " is-top" : ""}`} data-rv style={i(n)}>
                  {it.featured ? <p className="f-plan-flag">{c.t.popular}</p> : null}
                  <h3 style={fit(it.name).style}>{it.name}</h3>
                  {it.description ? <p className="f-plan-text">{it.description}</p> : null}
                  {it.price ? (
                    <p className="f-price">
                      <b style={css({ "--lw": (wd(it.price) + 0.1).toFixed(2) })}>{it.price}</b>
                      {it.unit ? <span className="f-price-per">{it.unit}</span> : null}
                    </p>
                  ) : (
                    <p className="f-price is-ask">
                      <b style={fit(c.t.onRequest).style}>{c.t.onRequest}</b>
                    </p>
                  )}
                  {it.features.length > 0 && (
                    <ul className="f-plan-points">
                      {it.features.map((x) => (
                        <li key={x}>
                          <Check aria-hidden="true" size={18} strokeWidth={3} />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a href={go.href} className={`btn f-btn${it.featured ? " f-btn-dark" : ""}`} {...ext(go.href)}>
                    {go.label}
                  </a>
                </li>
              ))}
            </ul>
            {s.note ? (
              <p className="f-member-foot" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    process: (s, c) => (
      <section className="f-proc" id={s.id}>
        <div className="f-wrap">
          <SecHead kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <ol className="f-steps" data-n={s.steps.length}>
            {s.steps.map((st, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <b aria-hidden="true">{n + 1}</b>
                <div>
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
      const cells = pics.length === 4 ? null : (MOSAIC[pics.length] ?? MOSAIC[9]).flatMap((row) => row.map((span, k) => ({ span, wide: row.length === 1 || (row.length === 3 && k === 0) })));
      return (
        <section className="f-gal" id={s.id}>
          <div className="f-wrap">
            <SecHead kicker={c.t.kick.gallery} title={s.title} />
          </div>
          {cells ? (
            <div className="f-mosaic">
              {pics.slice(0, cells.length).map((p, n) => (
                <figure key={n} className={`c${cells[n].span}${cells[n].wide ? " is-w" : ""}`} data-rv="cut" style={i(n % 3)}>
                  <Pic p={p} sizes={`(min-width: 900px) ${Math.round((cells[n].span / 12) * 100)}vw, ${cells[n].wide ? 92 : 46}vw`} />
                </figure>
              ))}
            </div>
          ) : (
            <div className="f-club-strip">
              {pics.map((p, n) => (
                <figure key={n} className={`s${n + 1}`} data-rv="cut" style={i(n)}>
                  <Pic p={p} sizes="(min-width: 900px) 34vw, 92vw" />
                </figure>
              ))}
            </div>
          )}
        </section>
      );
    },
    showcase: (s, c) => {
      const p = c.photo(s.image);
      return (
        <section className={`f-club-top f-show${p ? "" : " no-pic"}`} id={s.id}>
          {p ? (
            <div className="f-club-photo" data-px>
              <Pic p={p} sizes="100vw" />
            </div>
          ) : null}
          <div className="f-wrap">
            <div className="f-fit">
              <H2 title={s.title} />
              {s.body ? (
                <p className="f-big" data-rv>
                  {s.body}
                </p>
              ) : null}
              {s.cta ? (
                <p data-rv>
                  <Btn c={c} href={s.cta.href}>
                    {s.cta.label} <ArrowRight aria-hidden="true" strokeWidth={2.6} />
                  </Btn>
                </p>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    statement: (s) => (
      <section className="f-state" id={s.id}>
        <div className="f-wrap">
          <div className="f-fit">
            {s.note ? <Kicker>{s.note}</Kicker> : null}
            <H2 title={s.title} lim={[40, 90, 150]} />
          </div>
        </div>
      </section>
    ),
    cta: (s, c) => (
      <section className="f-foot-cta f-cta-sec" id={s.id}>
        <div className="f-wrap">
          <div className="f-fit">
            <H2 title={s.title} />
            {s.body ? (
              <p className="f-cta-body" data-rv>
                {s.body}
              </p>
            ) : null}
          </div>
          <div className="f-foot-acts">
            <a href={s.cta.href} className="btn f-btn f-btn-dark f-btn-big" {...ext(s.cta.href)}>
              {s.cta.label} <ArrowRight aria-hidden="true" strokeWidth={2.6} />
            </a>
            {c.spec.business.phone ? (
              <a href={tel(c.spec.business.phone)} className="f-link">
                {c.spec.business.phone}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    ),
    team: (s, c) => {
      const members = s.members.map((m) => ({ m, p: c.photo(m.image) }));
      const cards = members.every((x) => x.p);
      return (
        <section className="f-coaches" id={s.id}>
          <div className="f-wrap">
            <SecHead kicker={c.t.kick.team} title={s.title} intro={s.intro} />
          </div>
          {cards ? (
            <ul className="f-coach-row" data-n={members.length}>
              {members.map(({ m, p }, n) => {
                const f = fit(m.name, [12, 22, 40]);
                return (
                  <li key={n} className="f-tm" data-rv style={i(n % 4)}>
                    <div className="f-coach">
                      <span className="f-coach-pic">
                        <Pic p={p!} sizes="(min-width: 900px) 24vw, 76vw" />
                      </span>
                      <span className="f-coach-n" aria-hidden="true">
                        {pad2(n)}
                      </span>
                      <div className="f-coach-foot">
                        <h3 className={`f-coach-name ${f.cls}`.trim()} style={f.style}>
                          <b>{m.name}</b>
                        </h3>
                      </div>
                    </div>
                    <p className="f-tm-role">{m.role}</p>
                    {m.bio ? <p className="f-tm-bio">{m.bio}</p> : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="f-wrap">
              <ul className="f-crew" data-n={members.length}>
                {members.map(({ m }, n) => (
                  <li key={n} data-rv style={i(n % 3)}>
                    <span className="f-prog-n" aria-hidden="true">
                      {pad2(n)}
                    </span>
                    <h3 style={fit(m.name).style}>{m.name}</h3>
                    <p className="f-tm-role">{m.role}</p>
                    {m.bio ? <p className="f-tm-bio">{m.bio}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      );
    },
    testimonials: (s, c) => {
      const p = c.spare();
      return (
        <section className="f-results" id={s.id}>
          <div className="f-wrap f-results-grid">
            <div className="f-results-side">
              <Kicker>{c.t.kick.testimonials}</Kicker>
              <H2 title={s.title} />
              {p ? (
                <figure className="f-results-pic" data-rv="cut">
                  <Pic p={p} sizes="(min-width: 900px) 30vw, 92vw" />
                </figure>
              ) : null}
            </div>
            <ol className="f-results-list">
              {s.items.map((q, n) => (
                <li key={n} data-rv style={i(n % 2)}>
                  <p className="f-res-n" aria-hidden="true">
                    {pad2(n)}
                  </p>
                  <blockquote>
                    <p className={q.quote.length > 170 ? "is-long" : undefined}>{q.quote}</p>
                    <footer>
                      <b>{q.author}</b>
                      <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
                        {c.t.source}: {q.source}
                      </a>
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ol>
          </div>
        </section>
      );
    },
    booking: (s, c) => {
      const p = c.spare();
      return (
        <section className="f-trial" id={s.id}>
          <div className="f-wrap f-trial-grid">
            <div className="f-trial-copy">
              <Kicker>{c.t.kick.booking}</Kicker>
              <H2 title={s.title} />
              {s.body ? (
                <p className="f-big" data-rv>
                  {s.body}
                </p>
              ) : null}
            </div>
            <div className="f-trial-card" data-rv>
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
            </div>
            <div className="f-trial-side">
              {p ? (
                <figure className="f-side-pic" data-rv="cut">
                  <Pic p={p} sizes="(min-width: 900px) 36vw, 92vw" />
                </figure>
              ) : null}
              {c.spec.sections.some((x) => x.type === "hours") ? null : <Hours c={c} className="f-hours" />}
              <Reach c={c} />
            </div>
          </div>
        </section>
      );
    },
  },
};
