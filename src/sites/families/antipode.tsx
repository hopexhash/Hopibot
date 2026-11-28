import type { ReactNode } from "react";
import type { SiteSection } from "@/lib/site-spec";
import { CSS } from "./css/creative-agency";
import { Btn, css, DemoForm, heroFacts, hoursRows, i, Legal, offerWords, Pic, splitLines, tel, type Ctx, type Family, type HeadProps, type Photo, type SectionOf } from "./kit";

/**
 * Antipode (demo: /demos/creative-agency). Signal red, acid and cobalt, every part of the page
 * in its own full-bleed colour, heavy Syne set as large as the screen allows, stickers that turn
 * and photographs cut into arches, circles and pills. Made for creative studios, marketing
 * agencies, photographers and event businesses.
 *
 * Syne 800 is wide, so every large line is sized from its own text: `--lw` carries the width of
 * its longest word (in em) and the stylesheet divides the room of the screen by it.
 */

const EXTRA = `
.d-antipode{--x-display:"Syne";--x-sans:"Instrument Sans";--z-bg2:#fff;--z-ink:var(--ink);--z-dim:rgba(16,16,16,.72);--z-line:var(--ink);--z-accent:var(--red);--z-on-accent:var(--ink);--z-display:var(--x-display),system-ui,sans-serif;--z-display-weight:800;--z-radius:28px;--z-field-radius:0;--z-h3:clamp(22px,2.2vw,34px);--z-sec:clamp(80px,10vw,160px);--mute:rgba(244,241,234,.78)}
.d-antipode .x-t-ink{--bg:var(--ink);--fg:var(--paper);--hi:var(--acid);--mute:rgba(244,241,234,.78);--rule:rgba(244,241,234,.3)}
.d-antipode .x-t-cobalt{--bg:var(--cobalt);--fg:var(--paper);--hi:var(--acid);--mute:rgba(244,241,234,.86);--rule:rgba(244,241,234,.42)}
.d-antipode .x-t-paper{--bg:var(--paper);--fg:var(--ink);--hi:var(--red);--mute:rgba(16,16,16,.74);--rule:rgba(16,16,16,.22)}
.d-antipode .x-t-acid{--bg:var(--acid);--fg:var(--ink);--hi:var(--cobalt);--mute:rgba(16,16,16,.78);--rule:rgba(16,16,16,.26)}
.d-antipode .x-t-red{--bg:var(--red);--fg:var(--ink);--hi:var(--paper);--mute:rgba(16,16,16,.82);--rule:rgba(16,16,16,.3)}
.d-antipode .x-wrap{width:100%;max-width:1680px;margin-inline:auto;padding-inline:var(--pad)}
.d-antipode h2.x-h{--hs:clamp(40px,7.4vw,132px);font-size:min(var(--hs),calc((100vw - var(--pad)*2)/var(--lw,6)));overflow-wrap:break-word}
.d-antipode h2.x-h.is-m{--hs:clamp(36px,6vw,108px);line-height:.92}
.d-antipode h2.x-h.is-long{--hs:clamp(30px,4.4vw,76px);line-height:.96}
.d-antipode .x-btn{max-width:100%;padding-block:10px;white-space:normal;line-height:1.15}
.d-antipode .x-t-ink .x-btn-ink,.d-antipode .x-t-cobalt .x-btn-ink{--fill:var(--paper);border-color:var(--acid);background:var(--acid);color:var(--ink)}
.d-antipode .x-t-ink .x-btn-line,.d-antipode .x-t-cobalt .x-btn-line{--fill:var(--paper);border-color:var(--paper)}
.d-antipode .x-t-ink .x-btn-line:hover,.d-antipode .x-t-cobalt .x-btn-line:hover{color:var(--ink)}
.d-antipode .x-t-paper .x-edge-no,.d-antipode .x-t-acid .x-edge-no,.d-antipode .x-t-red .x-edge-no{-webkit-text-stroke-color:rgba(16,16,16,.14)}
.d-antipode .x-logo{flex:0 1 auto;min-width:0}
.d-antipode .x-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-antipode .x-logo.is-long{font-size:17px;letter-spacing:-.04em}
.d-antipode .x-logo.is-xl{font-size:15px;letter-spacing:-.03em}
.d-antipode .x-top-cta{flex:none;max-width:260px}
.d-antipode .x-top-cta span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-antipode .x-menu-btn{flex:none;min-width:44px}
.d-antipode .x-top-links{display:none}
@media (min-width:1100px){.d-antipode .x-logo{max-width:30vw}.d-antipode .x-top-links{display:flex;flex:none;align-items:center;height:46px;padding:0 4px;border:2px solid var(--ink);border-radius:999px;background:var(--paper);animation:x-drop .8s var(--back) .04s both}.d-antipode .x-top-links a{display:inline-flex;align-items:center;height:38px;padding:0 13px;border-radius:999px;color:var(--ink);font-family:var(--x-display),sans-serif;font-size:14px;font-weight:700;white-space:nowrap;transition:background-color .3s}.d-antipode .x-top-links a:hover{background:var(--acid)}}
@media (min-width:1100px) and (max-width:1399px){.d-antipode .x-top-links a:nth-child(n+4){display:none}}
.d-antipode .x-menu.is-open{clip-path:circle(150vmax at calc(100% - 70px) 38px);visibility:visible;transition:clip-path 1s var(--ease),visibility 0s}
.d-antipode .x-menu.is-open nav a{opacity:1;transform:none;transition:opacity .6s var(--ease) calc(.22s + var(--i)*55ms),transform .9s var(--ease) calc(.22s + var(--i)*55ms)}
.d-antipode .x-menu nav a{max-width:100%;font-size:min(clamp(32px,min(10.3vw,10.4svh),150px),calc((100vw - var(--pad)*2 - 40px)/var(--lw,6)));white-space:nowrap}
@media (min-width:900px){.d-antipode .x-menu nav a{font-size:min(clamp(32px,min(8vw,10.4svh),130px),calc((58vw - 40px)/var(--lw,6)))}}
.d-antipode .x-menu-side a{display:inline-flex;align-items:center;min-height:44px;text-decoration:underline;text-underline-offset:3px}
.d-antipode .x-menu-side p{overflow-wrap:anywhere}
.d-antipode .x-hero-tag span{max-width:100%}
.d-antipode .x-h1{--hp:13.3vw;font-size:min(var(--hp),calc((100vw - var(--pad)*2)/var(--lwd,5)))}
@media (max-width:899px){.d-antipode .x-h1-art{animation:x-in 1s var(--ease) .15s both}.d-antipode .x-h1-art>.x-h1-a,.d-antipode .x-h1-art>.x-h1-b,.d-antipode .x-h1-b>.x-mask{display:inline;margin:0;padding:0;overflow:visible}.d-antipode .x-h1-art .x-mask>span{display:inline;animation:none}.d-antipode .x-h1-pill{display:inline-block;width:2.4em;height:.56em;margin-left:.1em;vertical-align:.04em}.d-antipode .x-h1-c{margin-top:.1em}}
.d-antipode .x-h1.is-m{--hp:11.4vw}
.d-antipode .x-h1.is-l{--hp:9.6vw;line-height:.86}
.d-antipode .x-h1.is-xl{--hp:8.4vw;line-height:.88}
.d-antipode .x-h1-b{flex-wrap:wrap;row-gap:.08em}
.d-antipode .x-h1-b .x-mask{flex:0 1 auto;min-width:0}
.d-antipode .x-h1-pill{flex:1 0 1.6em;width:0;min-width:1.6em}
.d-antipode .x-hero>*{min-width:0}
.d-antipode .x-h1-pill.is-type{display:inline-flex;align-items:center;background:var(--cobalt);color:var(--acid)}
.d-antipode .x-pill-run{display:flex;width:max-content;font-size:.34em;letter-spacing:-.03em;line-height:1;white-space:nowrap;animation:x-run 30s linear infinite}
.d-antipode .x-pill-run span{display:inline-flex;align-items:center}
.d-antipode .x-pill-run .x-star{margin:0 .45em}
.d-antipode .x-h1-c{font-size:min(calc(var(--ckp,1)*1em),calc((100vw - var(--pad)*2)/var(--lwc,5)))}
.d-antipode .x-flip{animation-name:x-turn}
.d-antipode .x-h1 .x-ring-d{width:max(76px,min(clamp(110px,11vw,190px),1.1em))}
@keyframes x-turn{0%{transform:rotate(0)}6%,24%{transform:rotate(180deg)}30%,100%{transform:rotate(360deg)}}
.d-antipode .x-hero-coord{display:grid;gap:10px;padding-right:118px}
.d-antipode .x-hero-coord dt{margin-bottom:2px}
.d-antipode .x-hero-coord dd{font-weight:500}
.d-antipode .x-hero-coord a{text-decoration:underline;text-underline-offset:3px}
.d-antipode .x-hero-cta .x-btn-line:hover{color:var(--paper)}
@media (min-width:900px){.d-antipode .x-h1{font-size:min(13.6vw,var(--hv,25svh),calc((100vw - var(--pad)*2 - 9vw)/var(--lwr,5)))}.d-antipode .x-h1-art>span{white-space:nowrap}.d-antipode .x-h1-b{flex-wrap:nowrap}.d-antipode .x-h1-c{font-size:calc(var(--ckd,1)*1em)}.d-antipode .x-hero-coord{padding-right:0}.d-antipode .x-hero-foot.is-two{grid-template-columns:minmax(0,1.25fr) auto}}
.d-antipode .x-bands{background:linear-gradient(var(--red) 50%,var(--next,var(--ink)) 50%)}
.d-antipode .x-say{max-width:max(11.5em,calc(var(--lw,6)*1em));font-size:min(clamp(33px,8.6vw,156px),calc((100vw - var(--pad)*2)/var(--lw,6)));overflow-wrap:break-word}
.d-antipode .x-say.is-m{font-size:min(clamp(30px,6.2vw,112px),calc((100vw - var(--pad)*2)/var(--lw,6)));max-width:max(14em,calc(var(--lw,6)*1em))}
.d-antipode .x-say.is-long{font-size:min(clamp(26px,4.4vw,80px),calc((100vw - var(--pad)*2)/var(--lw,6)));max-width:max(18em,calc(var(--lw,6)*1em));line-height:.98}
.d-antipode .x-say.is-xl{font-size:min(clamp(24px,3.3vw,58px),calc((100vw - var(--pad)*2)/var(--lw,6)));max-width:max(24em,calc(var(--lw,6)*1em));line-height:1}
.d-antipode .x-say small{border-color:var(--hi);color:var(--hi)}
.d-antipode .x-loud{color:var(--hi)}
.d-antipode .x-mani-head h2:not(.x-h){max-width:16em}
.d-antipode .x-mani-note p:not(.x-note-big){color:var(--mute)}
.d-antipode .x-mani-note p.x-note-lead{max-width:40ch;font-size:clamp(18px,1.5vw,24px);font-weight:500;line-height:1.4;color:var(--fg)}
.d-antipode .x-mani .x-link{color:var(--hi)}
.d-antipode .x-mani-note.is-solo>div{max-width:1000px}
.d-antipode .x-mani-note.is-solo .x-note-big{max-width:24ch}
@media (min-width:900px){.d-antipode .x-mani-note.is-solo{grid-template-columns:minmax(0,1fr)}}
.d-antipode .x-stmt .x-kick{position:relative;margin-bottom:clamp(36px,5vw,70px)}
.d-antipode .x-stmt .x-say{position:relative;margin:0}
.d-antipode .x-serv-intro{color:var(--fg)}
.d-antipode .x-acc{border-top-color:var(--fg)}
.d-antipode .x-acc>li{border-bottom-color:var(--fg)}
.d-antipode .x-acc summary{display:grid;grid-template-columns:minmax(0,1fr) 44px;grid-template-areas:"no plus" "name name";align-items:center;padding:14px var(--pad);cursor:pointer;list-style:none}
.d-antipode .x-acc summary::-webkit-details-marker{display:none}
.d-antipode .x-acc h3.x-acc-name{font-family:var(--x-display),sans-serif;font-size:min(9.6vw,calc((100vw - var(--pad)*2)/var(--lw,6)));font-weight:800;letter-spacing:-.05em;line-height:.9;overflow-wrap:break-word}
.d-antipode .x-acc-no{-webkit-text-stroke-color:var(--fg)}
.d-antipode .x-acc details[open] .x-acc-no{color:var(--hi);-webkit-text-stroke-color:var(--hi);transform:rotate(-7deg)}
.d-antipode .x-acc details[open] .x-acc-name{margin-top:.12em}
.d-antipode .x-acc summary:hover .x-acc-name{transform:translateX(.12em)}
.d-antipode .x-acc details[open] .x-acc-plus{border-color:var(--hi);background:var(--hi);color:var(--ink);transform:rotate(135deg)}
.d-antipode .x-acc.is-many .x-acc-no{font-size:clamp(64px,17vw,96px)}
.d-antipode .x-acc-panel{color:var(--fg)}
.d-antipode .x-acc-text{color:var(--mute)}
.d-antipode .x-acc-pic{margin:0;max-width:420px}
.d-antipode .x-acc-pic>span{display:block;aspect-ratio:16/10;overflow:hidden}
.d-antipode .x-acc-pic img{width:100%;height:100%;object-fit:cover}
.d-antipode .x-acc-price b{color:var(--hi)}
.d-antipode .x-acc-price .x-acc-meta+.x-acc-meta{font-weight:600}
.d-antipode .x-acc-price .x-link{flex-basis:auto}
@media (min-width:900px){.d-antipode .x-acc summary{grid-template-columns:24vw minmax(0,1fr) auto 56px;grid-template-areas:"no name line plus";gap:0 clamp(16px,2vw,36px);padding-block:18px 10px}.d-antipode .x-acc h3.x-acc-name{font-size:min(4.2vw,76px,calc(36vw/var(--lw,6)))}.d-antipode .x-acc.is-many .x-acc-no{font-size:min(8vw,150px)}.d-antipode .x-acc.is-many summary{grid-template-columns:14vw minmax(0,1fr) auto 56px}.d-antipode .x-acc.is-many .x-acc-panel{padding-left:calc(var(--pad) + 14vw + clamp(16px,2vw,36px))}.d-antipode .x-acc-line{max-width:16em;font-family:var(--x-display),sans-serif;font-size:clamp(18px,1.6vw,26px);font-weight:700;letter-spacing:-.03em;text-align:right;opacity:1;color:var(--hi)}.d-antipode .x-acc-line small{display:block;font-family:var(--x-sans),sans-serif;font-size:14px;font-weight:600;letter-spacing:0;color:var(--fg)}.d-antipode .x-acc-panel .x-acc-meta{display:none}.d-antipode .x-acc-panel.no-pic{grid-template-columns:minmax(0,46em)}.d-antipode .x-acc-pic{grid-row:span 2;justify-self:end;width:100%}}
.d-antipode .x-how-foot.is-long{max-width:48ch;font-family:var(--x-sans),sans-serif;font-size:clamp(17px,1.4vw,22px);font-weight:500;letter-spacing:0;line-height:1.4}
.d-antipode .x-steps li{container-type:inline-size}
.d-antipode .x-steps h3{font-size:min(9.3vw,calc((100cqw - 9vw - 14px)/var(--lw,6)));overflow-wrap:break-word}
.d-antipode .x-steps li>div{color:var(--mute)}
.d-antipode .x-step-no{-webkit-text-stroke-color:var(--fg)}
@media (min-width:900px){.d-antipode .x-steps h3{font-size:min(7vw,130px,calc((100cqw - 7vw)/var(--lw,6)))}.d-antipode .x-how.has-a .x-how-head{min-height:min(calc(22.5vw - 30px),360px);padding-right:calc(min(30vw,520px) + 4vw)}.d-antipode .x-how.has-b .x-how-foot{display:flex;align-items:flex-end;min-height:min(19vw,320px)}.d-antipode .x-how.has-b .x-how-foot:empty{width:30ch}}
.d-antipode .x-feat{padding:clamp(90px,11vw,170px) var(--pad);overflow:hidden}
.d-antipode .x-feat-head{position:relative;display:grid;gap:20px;margin-bottom:clamp(44px,6vw,90px)}
.d-antipode .x-feat-head .x-serv-intro{max-width:46ch}
.d-antipode .x-feats{position:relative;display:grid;gap:0 clamp(30px,4vw,70px)}
.d-antipode .x-feats li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;align-items:start;padding:18px 0 26px;border-top:2px solid var(--fg)}
.d-antipode .x-feats b{min-width:1.5em;color:var(--hi);font-family:var(--x-display),sans-serif;font-size:clamp(40px,4.4vw,72px);font-weight:800;letter-spacing:-.07em;line-height:.86}
.d-antipode .x-feats li>div{container-type:inline-size;min-width:0}
.d-antipode .x-feats h3{margin:4px 0 10px;font-size:min(clamp(24px,2.3vw,38px),calc(100cqw/var(--lw,6)));letter-spacing:-.04em;line-height:1;overflow-wrap:break-word}
.d-antipode .x-feats p{max-width:46ch;color:var(--mute)}
@media (min-width:760px){.d-antipode .x-feats{grid-template-columns:repeat(2,minmax(0,1fr))}.d-antipode .x-feats[data-n="1"]{grid-template-columns:minmax(0,900px)}}
@media (min-width:1100px){.d-antipode .x-feats[data-n="3"],.d-antipode .x-feats[data-n="5"],.d-antipode .x-feats[data-n="6"]{grid-template-columns:repeat(3,minmax(0,1fr))}}
.d-antipode .x-work .x-giant{font-size:min(21.6vw,calc((100vw - var(--pad)*2)/var(--lw,6)))}
.d-antipode .x-gal{position:relative;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:clamp(18px,3vw,48px) clamp(14px,2.4vw,40px);padding-inline:var(--pad)}
.d-antipode .x-gal figure{width:44%;margin:0}
.d-antipode .x-gal figure>span{display:block;aspect-ratio:4/5;overflow:hidden}
.d-antipode .x-gal img{display:block;width:100%;height:100%;object-fit:cover}
.d-antipode .x-gal .s-circle,.d-antipode .x-gal .s-leaf{aspect-ratio:1}
.d-antipode .x-gal .s-tilt,.d-antipode .x-gal .s-skew{aspect-ratio:4/3}
.d-antipode .x-gal .s-pill{aspect-ratio:2/1}
.d-antipode .x-gal figure.is-wide{width:100%}
.d-antipode .x-gal figure:nth-child(4n+2){margin-top:9vw}
.d-antipode .x-gal[data-n="1"] figure{width:100%;margin:0}
.d-antipode .x-gal[data-n="1"] figure>span{aspect-ratio:16/9;border-radius:999px}
@media (min-width:900px){.d-antipode .x-gal figure{width:26%}.d-antipode .x-gal figure.is-wide{width:40%}.d-antipode .x-gal figure:nth-child(4n+2){margin-top:0}.d-antipode .x-gal figure:nth-child(3n+2){margin-top:7vw}.d-antipode .x-gal figure:nth-child(3n){margin-top:2.5vw}.d-antipode .x-gal[data-n="2"] figure{width:38%}.d-antipode .x-gal[data-n="1"] figure{width:100%;margin:0}}
.d-antipode .x-show{display:grid;gap:clamp(40px,5vw,90px);padding:clamp(80px,10vw,160px) var(--pad);overflow:hidden}
.d-antipode .x-show-pic{position:relative;width:min(100%,560px);margin:0}
.d-antipode .x-show-pic>span{aspect-ratio:4/5;border-radius:999px 999px 0 0}
.d-antipode .x-show-pic img{width:100%;height:112%;object-fit:cover;transform:translateY(calc(-5% + var(--p,0)*-5%))}
.d-antipode .x-show-pic .x-ring{position:absolute;right:-14px;bottom:8%;z-index:2;width:clamp(104px,11vw,170px)}
.d-antipode .x-show-pic .x-ring-bg{fill:var(--acid)}
.d-antipode .x-show-copy{display:grid;gap:26px;justify-items:start;align-content:center}
.d-antipode .x-show-copy .x-lede{max-width:44ch}
@media (min-width:900px){.d-antipode .x-show{grid-template-columns:minmax(0,.85fr) minmax(0,1fr);align-items:center}.d-antipode .x-show.no-pic{grid-template-columns:minmax(0,1fr)}.d-antipode .x-show-pic{justify-self:center}}
.d-antipode .x-team-copy{min-width:0}
.d-antipode .x-team-grid.is-solo{grid-template-columns:minmax(0,1fr)}
.d-antipode .x-team-text{color:var(--mute)}
.d-antipode .x-names li{flex-wrap:wrap;min-width:0}
.d-antipode .x-names b{overflow-wrap:break-word;min-width:0}
.d-antipode .x-names span{color:var(--hi)}
.d-antipode .x-face{flex:none;width:clamp(52px,5vw,84px);aspect-ratio:1;margin:0 6px 0 0;overflow:hidden;border:2px solid var(--fg);border-radius:50%}
.d-antipode .x-face img{width:100%;height:100%;object-fit:cover}
.d-antipode .x-names.has-bio{display:grid;gap:clamp(28px,3vw,44px)}
.d-antipode .x-names.has-bio li{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:4px 16px;padding-top:18px;border-top:1px solid var(--rule)}
.d-antipode .x-names.has-bio li>:not(.x-face){grid-column:2}
.d-antipode .x-names.has-bio .x-face{grid-row:span 3;align-self:start}
.d-antipode .x-names.has-bio b{font-size:clamp(30px,3.4vw,56px)}
.d-antipode .x-names.has-bio span{margin:0}
.d-antipode .x-names p{max-width:52ch;margin-top:6px;color:var(--mute)}
.d-antipode .x-quotes{display:grid;gap:clamp(28px,3.4vw,56px);padding-inline:var(--pad)}
.d-antipode .x-quotes .x-quote{max-width:900px;color:var(--ink)}
.d-antipode .x-quotes .x-quote:nth-child(3n+2){background:var(--ink);color:var(--paper);rotate:1.6deg}
.d-antipode .x-quotes .x-quote:nth-child(3n){background:var(--cobalt);color:var(--paper);rotate:-1deg}
.d-antipode .x-quote footer a{display:inline-flex;align-items:center;min-height:44px;font-size:14.5px;text-decoration:underline;text-underline-offset:3px}
@media (min-width:900px){.d-antipode .x-quotes{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}.d-antipode .x-quotes[data-n="1"]{grid-template-columns:minmax(0,900px)}.d-antipode .x-quotes .x-quote:nth-child(even){margin-top:clamp(40px,5vw,90px)}}
.d-antipode .x-packs{padding:clamp(80px,10vw,160px) 0 clamp(90px,11vw,180px);overflow:hidden}
.d-antipode .x-pack-grid{display:grid;gap:clamp(28px,3vw,48px);grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));padding:clamp(20px,3vw,40px) var(--pad) 0}
.d-antipode .x-pack-grid[data-n="1"]{max-width:760px}
.d-antipode .x-pack{position:relative;display:grid;gap:16px;align-content:start;padding:clamp(26px,3vw,46px);border-radius:clamp(22px,3vw,44px);background:var(--paper);color:var(--ink)}
.d-antipode .x-pack:nth-child(even){rotate:1deg}
.d-antipode .x-pack.is-hot{background:var(--acid);rotate:-1.6deg}
.d-antipode .x-pack{container-type:inline-size}
.d-antipode .x-pack h3{font-size:min(clamp(28px,2.8vw,46px),calc(100cqw/var(--lw,6)));letter-spacing:-.045em;overflow-wrap:break-word}
.d-antipode .x-pack.is-hot h3{padding-right:min(24%,100px)}
.d-antipode .x-pack .x-acc-price b{color:var(--ink);overflow-wrap:anywhere}
.d-antipode .x-pack .x-acc-price b.is-req{font-size:clamp(24px,2.2vw,34px)}
.d-antipode .x-pack .x-acc-price span{font-weight:600}
.d-antipode .x-pack>p{max-width:44ch}
.d-antipode .x-pack ul{display:grid}
.d-antipode .x-pack li{display:flex;gap:12px;padding:9px 0;border-top:1.5px solid rgba(16,16,16,.25);font-weight:500}
.d-antipode .x-pack li::before{content:"↗";color:var(--red)}
.d-antipode .x-pack.is-hot li::before{color:var(--cobalt)}
.d-antipode .x-pack-stamp{position:absolute;right:-12px;top:-44px;width:clamp(104px,9vw,136px)}
.d-antipode .x-pack-stamp svg{fill:var(--red)}
.d-antipode .x-pack-note{max-width:60ch;margin-top:40px;padding-inline:var(--pad);color:var(--mute)}
.d-antipode .x-faq,.d-antipode .x-hrs{padding:clamp(80px,10vw,150px) 0 clamp(90px,10vw,160px)}
.d-antipode .x-qa{margin-inline:var(--pad);border-top:2px solid var(--fg)}
.d-antipode .x-qa details{border-bottom:2px solid var(--fg)}
.d-antipode .x-qa summary{display:grid;grid-template-columns:auto minmax(0,1fr) 44px;align-items:center;gap:14px clamp(14px,2vw,32px);min-height:44px;padding:18px 0;cursor:pointer;list-style:none}
.d-antipode .x-qa summary::-webkit-details-marker{display:none}
.d-antipode .x-qa-no{min-width:2ch;font-family:var(--x-display),sans-serif;font-size:15px;font-weight:800}
.d-antipode .x-qa-q{font-family:var(--x-display),sans-serif;font-size:clamp(20px,2.2vw,34px);font-weight:700;letter-spacing:-.035em;line-height:1.08;overflow-wrap:break-word}
.d-antipode .x-qa .x-acc-plus{grid-area:auto}
.d-antipode .x-qa details[open] .x-acc-plus{border-color:var(--fg);background:var(--fg);color:var(--bg);transform:rotate(135deg)}
.d-antipode .x-qa summary:hover .x-qa-q{text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:5px}
.d-antipode .x-qa details>p{max-width:62ch;padding:0 0 26px calc(2ch + clamp(14px,2vw,32px));color:var(--mute)}
.d-antipode .x-cta{padding:3.2vw 0 clamp(90px,10vw,160px);overflow:hidden}
.d-antipode .x-cta.no-band{padding-top:0}
.d-antipode .x-cta-in{display:grid;gap:28px;justify-items:start;padding:clamp(64px,8vw,120px) var(--pad) 0}
.d-antipode .x-cta-in .x-lede{max-width:44ch}
.d-antipode .x-contact.no-band{padding-top:0}
.d-antipode .x-mail{font-size:min(13vw,calc((100vw - var(--pad)*2)/var(--lwm,6)));-webkit-user-select:text;user-select:text}
.d-antipode .x-mail a{display:block;width:max-content;max-width:100%}
.d-antipode .x-mail span:nth-child(2){color:var(--hi)}
.d-antipode .x-contact dl{border-top-color:var(--fg)}
.d-antipode .x-contact dl div{border-bottom-color:var(--fg)}
.d-antipode .x-contact dd{overflow-wrap:anywhere}
.d-antipode .x-contact dd a{display:inline-flex;align-items:center;min-height:32px;text-decoration:underline;text-underline-offset:3px}
.d-antipode .x-contact-info>.x-link{margin-top:14px}
.d-antipode .x-contact-grid.is-solo{max-width:1100px}
@media (min-width:900px){.d-antipode .x-mail{font-size:min(6.6vw,calc((100vw - var(--pad)*2)/var(--lwa,12)))}.d-antipode .x-contact-grid.is-solo{grid-template-columns:minmax(0,1fr) auto;align-items:end}}
.d-antipode .x-contact-card{color:var(--paper)}
.d-antipode .z-form{gap:24px}
.d-antipode .z-fields{gap:22px 20px}
.d-antipode .z-field label,.d-antipode .z-chipset legend{font-family:var(--x-sans),system-ui,sans-serif;font-stretch:78%;font-weight:600;font-size:13.5px;letter-spacing:.07em;text-transform:uppercase;color:var(--acid)}
.d-antipode .z-field input,.d-antipode .z-field select,.d-antipode .z-field textarea{padding:10px 0;border-width:0 0 2px;border-color:rgba(244,241,234,.45);border-radius:0;color:var(--paper);font-size:17px;color-scheme:dark}
.d-antipode .z-field select{padding-right:26px;background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 12px) 55%,calc(100% - 6px) 55%;background-size:6px 6px;background-repeat:no-repeat}
.d-antipode .z-field :focus-visible{outline:none;border-color:var(--acid)}
.d-antipode .z-chips{display:flex;flex-wrap:wrap;gap:8px}
.d-antipode .z-chips button{min-width:52px;min-height:46px;padding:0 16px;border:2px solid rgba(244,241,234,.45);border-radius:999px;color:var(--paper);font-size:15px;font-weight:600}
.d-antipode .z-chips button[aria-pressed="true"]{border-color:var(--acid);background:var(--acid);color:var(--ink);transform:rotate(-3deg)}
.d-antipode .z-form .btn{width:auto;justify-self:start;--fill:var(--paper);border-color:var(--acid);background:var(--acid);color:var(--ink)}
.d-antipode .z-form .btn:hover{color:var(--ink)}
.d-antipode .form-note{color:rgba(244,241,234,.7)}
.d-antipode .form-status{border:2px solid var(--acid);border-radius:18px;color:var(--paper)}
.d-antipode .x-hrs-grid{display:grid;gap:44px;padding-inline:var(--pad)}
.d-antipode .x-hrs-list{border-top:2px solid var(--fg)}
.d-antipode .x-hrs-list div{display:flex;justify-content:space-between;gap:20px;padding:13px 0;border-bottom:2px solid var(--fg)}
.d-antipode .x-hrs-list dd{font-family:var(--x-display),sans-serif;font-size:clamp(17px,1.6vw,24px);font-weight:700;letter-spacing:-.02em;text-align:right}
.d-antipode .x-hrs-side{display:grid;gap:18px;align-content:start}
.d-antipode .x-hrs-side address{display:grid;gap:4px;justify-items:start;font-style:normal;font-weight:600}
.d-antipode .x-hrs-side address a{display:inline-flex;align-items:center;min-height:40px;text-decoration:underline;text-underline-offset:3px}
@media (min-width:900px){.d-antipode .x-hrs-grid{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(50px,7vw,120px)}}
.d-antipode .x-foot-mark{font-size:min(13.4vw,calc((100vw - var(--pad)*2)/var(--lw,6)))}
.d-antipode .x-foot-grid>div{min-width:0}
.d-antipode .x-foot-grid p{overflow-wrap:anywhere}
.d-antipode .x-foot-blurb{grid-column:1/-1}
.d-antipode .x-foot-blurb p{max-width:34ch}
@media (min-width:900px){.d-antipode .x-foot-blurb{grid-column:auto}}
.d-antipode .x-legal{flex-wrap:wrap}
.d-antipode .z-sec{--bg:var(--paper);--fg:var(--ink);--hi:var(--red);--mute:rgba(16,16,16,.74)}
.d-antipode .z-head .x-kick{color:var(--fg)}
.d-antipode .z-head{max-width:none}
.d-antipode .z-head h2{max-width:15em}
.d-antipode .z-card,.d-antipode .z-channel{border-width:2px}
.d-antipode .z-price{font-family:var(--x-display),sans-serif;font-weight:800}
.d-antipode .z-dots b{font-family:var(--x-display),sans-serif;font-weight:700}
.d-antipode .z-ico{border:2px solid var(--ink);color:var(--ink);background:var(--acid)}
.d-antipode .z-sec h3{letter-spacing:-.04em;line-height:1}
`
  .replace(/\n/g, "")
  .trim();

type Tone = "ink" | "paper" | "cobalt" | "acid" | "red";
type Kind = SiteSection["type"];

/** The colour each part prefers, and the one it takes when its neighbour already wears the first. */
const TONES: Partial<Record<Kind, [Tone, Tone]>> = {
  about: ["ink", "cobalt"],
  statement: ["ink", "cobalt"],
  services: ["cobalt", "ink"],
  features: ["ink", "cobalt"],
  process: ["acid", "paper"],
  gallery: ["paper", "acid"],
  showcase: ["red", "acid"],
  team: ["ink", "cobalt"],
  testimonials: ["paper", "acid"],
  packages: ["ink", "cobalt"],
  faq: ["paper", "acid"],
  cta: ["acid", "red"],
  booking: ["red", "acid"],
  contact: ["red", "acid"],
  hours: ["acid", "paper"],
};

const strip = (s: string) => s.replace(/\*/g, "").trim();
const pad2 = (n: number) => String(n + 1).padStart(2, "0");
const ext = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

/** Advance of each glyph of Syne ExtraBold at the demo's tracking, in em (measured in the browser). */
const GLYPH: Record<string, number> = Object.fromEntries(
  (
    "a=1.01 b=1.04 c=.94 d=1.04 e=.94 f=.62 g=.89 h=.95 i=.31 j=.31 k=.89 l=.31 m=1.6 n=.94 o=.96 p=1.01 q=1.04 r=.51 s=.79 t=.57 u=.94 v=.86 w=1.41 x=.93 y=.88 z=.84 " +
    "A=1.1 B=1.09 C=1.26 D=1.25 E=1.09 F=1.07 G=1.29 H=1.23 I=.37 J=.95 K=1.15 L=.89 M=1.53 N=1.25 O=1.28 P=1.12 Q=1.28 R=1.18 S=1 T=1.05 U=1.23 V=1.11 W=1.83 X=1.09 Y=1.02 Z=1.15 " +
    "1=.47 .=.3 ,=.25 -=.54 '=.25 ’=.25 :=.3 ;=.3 !=.34 ?=.82 &=1.2 @=1.44 /=.6 (=.5 )=.5"
  )
    .split(" ")
    .map((t) => [t[0], Number(t.slice(2))]),
);
/** Width of a line of Syne ExtraBold, in em (measured generously: a line may never run off the screen). */
const wd = (s: string) => [...s].reduce((a, ch) => a + 0.02 + (ch === " " ? 0.26 : (GLYPH[ch] ?? GLYPH[ch.normalize("NFD")[0]] ?? 1.06)), 0);
const longest = (s: string) => Math.max(2, ...strip(s).split(/\s+|(?<=-)/).map(wd));
const lw = (s: string, k = 0.1) => (longest(s) + k).toFixed(2);

type Info = { shown: boolean[]; tone: Tone[]; ord: number[]; prev: Tone[]; bands: boolean };
const memo = new WeakMap<object, Info>();

function bandWords(c: Ctx) {
  return offerWords(c, 7);
}

/** Which parts render, their number on the page and their colour. Worked out once per page. */
function info(c: Ctx): Info {
  const hit = memo.get(c.spec);
  if (hit) return hit;
  const secs = c.spec.sections;
  const shown = secs.map((s) => {
    if (s.type === "gallery") return s.images.some((r) => c.photo(r));
    if (s.type === "beforeafter") return s.pairs.some((p) => c.photo(p.before) && c.photo(p.after));
    return true;
  });
  const bands = bandWords(c).length >= 3;
  const tone: Tone[] = [];
  const prev: Tone[] = [];
  const ord: number[] = [];
  let last: Tone = "red";
  let count = 0;
  secs.forEach((s, n) => {
    ord[n] = count;
    if (!shown[n]) {
      tone[n] = last;
      prev[n] = last;
      return;
    }
    count++;
    const pair = TONES[s.type];
    let next: Tone | null = "ink";
    for (let k = n + 1; k < secs.length; k++) {
      if (!shown[k]) continue;
      next = TONES[secs[k].type] ? null : "paper";
      break;
    }
    const t = !pair ? "paper" : pair[0] !== last && pair[0] !== next ? pair[0] : pair[1] !== last ? pair[1] : pair[0];
    prev[n] = count === 1 && bands ? t : last;
    tone[n] = t;
    last = t;
  });
  const v = { shown, tone, ord, prev, bands };
  memo.set(c.spec, v);
  return v;
}

const tc = (c: Ctx, n: number) => `x-t-${info(c).tone[n]}`;
const seam = (c: Ctx, n: number) => css({ "--prev": `var(--${info(c).prev[n]})` });
const no = (c: Ctx, n: number) => pad2(info(c).ord[n]);

function Star({ className }: { className?: string }) {
  return (
    <svg className={`x-star${className ? ` ${className}` : ""}`} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 0l3.4 11.8L34.1 5.9l-5.9 10.7L40 20l-11.8 3.4 5.9 10.7-10.7-5.9L20 40l-3.4-11.8L5.9 34.1l5.9-10.7L0 20l11.8-3.4L5.9 5.9l10.7 5.9z" fill="currentColor" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg className="x-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19L19 5M8 5h11v11" fill="none" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  );
}

/** A round sticker with the business's own words running along its edge. */
function Ring({ id, text, className }: { id: string; text: string; className?: string }) {
  return (
    <span className={`x-ring${className ? ` ${className}` : ""}`} aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path id={id} d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" />
        </defs>
        <circle cx="100" cy="100" r="100" className="x-ring-bg" />
        <text className="x-ring-t">
          <textPath href={`#${id}`} textLength="458" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
        <path className="x-ring-c" d="M100 62l6.5 22.3 20.4-11.2-11.2 20.4L138 100l-22.3 6.5 11.2 20.4-20.4-11.2L100 138l-6.5-22.3-20.4 11.2 11.2-20.4L62 100l22.3-6.5-11.2-20.4 20.4 11.2z" />
      </svg>
    </span>
  );
}

const BURST = Array.from({ length: 36 }, (_, k) => {
  const a = (Math.PI * k) / 18;
  const r = k % 2 ? 84 : 100;
  return `${(100 + r * Math.sin(a)).toFixed(1)},${(100 - r * Math.cos(a)).toFixed(1)}`;
}).join(" ");

function Stamp({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={`x-stamp${className ? ` ${className}` : ""}`}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <polygon points={BURST} />
      </svg>
      <span>{children}</span>
    </span>
  );
}

function Band({ words, className }: { words: string[]; className?: string }) {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className={`x-band${className ? ` ${className}` : ""}`} aria-hidden="true">
      <p>
        {row.map((w, k) => (
          <span key={k}>
            {w}
            <Star />
          </span>
        ))}
      </p>
    </div>
  );
}

/** Words of the business itself for a running band: short, unique, at least two. */
function words(list: (string | null | undefined)[], max = 40) {
  return [...new Set(list.map((w) => strip(w ?? "")).filter((w) => w && w.length <= max))];
}

/** The text of a turning sticker: the name, the town, the eyebrow, as many as fit around it. */
function ringText(c: Ctx) {
  const parts = words([c.name, c.spec.business.city, c.spec.hero.eyebrow], 24);
  const out: string[] = [];
  for (const p of parts) {
    if ([...out, p].join(" ✺ ").length > 38) break;
    out.push(p);
  }
  if (!out.length) out.push((c.name.split(/\s+/)[0] ?? c.name).slice(0, 20));
  const unit = `${out.join(" ✺ ")} ✺ `;
  let s = unit;
  while (s.length + unit.length <= 44) s += unit;
  return s.toUpperCase();
}

/** A statement whose words light up as it travels up the screen; the marked (or last) words are loud. */
function Say({ text, mark, className, as = "p" }: { text: string; mark?: string; className?: string; as?: "p" | "h2" }) {
  const list = text.split(/\s+/).filter(Boolean);
  let from = list.findIndex((w) => w.startsWith("*"));
  let to = list.findIndex((w, k) => k >= from && w.endsWith("*"));
  if (from < 0 || to < 0) {
    from = list.length > 1 ? list.length - 1 : -1;
    to = from;
  }
  const len = strip(text).length;
  const size = len > 140 ? " is-xl" : len > 90 ? " is-long" : len > 44 ? " is-m" : "";
  const props = { className: `x-say${size}${className ? ` ${className}` : ""}`, "data-px": "", style: css({ "--lw": lw(text) }) };
  const body = (
    <>
      {mark ? <small aria-hidden="true">{mark}</small> : null}
      {list.map((raw, k) => (
        <span key={k} className={k >= from && k <= to && from >= 0 ? "x-loud" : undefined} style={css({ "--t": (0.72 - (k / Math.max(1, list.length - 1)) * 0.5).toFixed(2) })}>
          {raw.replace(/\*/g, "")}{" "}
        </span>
      ))}
    </>
  );
  return as === "h2" ? <h2 {...props}>{body}</h2> : <p {...props}>{body}</p>;
}

function Kick({ n, label }: { n?: string; label?: string }) {
  if (!label && !n) return null;
  return (
    <p className="x-kick" data-rv>
      {n ? <b>{n}</b> : null} {label}
    </p>
  );
}

/** A section heading: lines wiped in one by one, sized from the longest word. */
function H2({ title, id, className }: { title: string; id?: string; className?: string }) {
  const len = strip(title).length;
  const { lines } = splitLines(title, len > 18 ? 2 : 1);
  return (
    <h2 id={id} className={`x-h${len > 44 ? " is-long" : len > 22 ? " is-m" : ""}${className ? ` ${className}` : ""}`} style={css({ "--lw": lw(title) })} data-rv="mask">
      {lines.map((l, k) => (
        <span key={k}>{l}</span>
      ))}
    </h2>
  );
}

/** Navigation entries that lead somewhere: a gallery without photographs renders nothing. */
function navOf(c: Ctx) {
  const { shown } = info(c);
  return c.nav.filter((x) => {
    const n = c.spec.sections.findIndex((s) => s.id === x.id);
    return n < 0 || shown[n];
  });
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const nav = navOf(c);
  const word = c.name.split(/\s+/).find((w) => w.length >= 4 && w.length <= 12);
  return (
    <>
      <header className="x-top hdr">
        <a href="#top" className={`x-logo${c.name.length > 30 ? " is-xl" : c.name.length > 16 ? " is-long" : ""}`} aria-label={c.name}>
          <span>{c.name}</span>
        </a>
        <nav aria-label={c.t.menu} className="x-top-links" data-nav>
          {nav.map((x) => (
            <a key={x.id} href={`#${x.id}`}>
              {x.label}
            </a>
          ))}
        </nav>
        <a href={cta.href} className="btn x-top-cta" {...ext(cta.href)}>
          <span>{cta.label}</span>
        </a>
        <button type="button" className="x-menu-btn menu-btn" aria-expanded="false" aria-controls="site-menu">
          <span data-label data-open={c.t.menu} data-close={c.t.close}>
            {c.t.menu}
          </span>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="site-menu" className="x-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {nav.map((x, k) => (
            <a key={x.id} href={`#${x.id}`} style={css({ "--i": k, "--lw": (wd(x.label) + 0.2).toFixed(2) })}>
              <small>{pad2(k)}</small>
              <span>{x.label}</span>
            </a>
          ))}
          <a href={cta.href} style={css({ "--i": nav.length, "--lw": (wd(cta.label) + 0.2).toFixed(2) })} {...ext(cta.href)}>
            <small>{pad2(nav.length)}</small>
            <span>{cta.label}</span>
          </a>
        </nav>
        {b.email || b.phone || b.address || b.city ? (
          <div className="x-menu-side">
            {b.email || b.phone ? (
              <p>
                <b>{c.t.contact}</b>
                {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
                {b.email && b.phone ? <br /> : null}
                {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
              </p>
            ) : null}
            {b.address || b.city ? (
              <p>
                <b>{c.t.address}</b>
                {b.address ?? b.city}
              </p>
            ) : null}
          </div>
        ) : null}
        {word ? (
          <span className="x-menu-word" aria-hidden="true">
            {word.toLowerCase()}
          </span>
        ) : null}
      </div>
    </>
  );
}

type Word = { w: string; em: boolean };

/**
 * The headline in rows (words stay whole, *marked* words keep their accent). The row that carries
 * the photograph is kept short, so the pill next to it has room; the others are balanced.
 */
function rowsOf(text: string, parts: number): Word[][] {
  const list: Word[] = [];
  text.split(/\*([^*]+)\*/).forEach((chunk, k) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => list.push({ w, em: k % 2 === 1 })),
  );
  const n = list.length;
  const w = (a: number, b: number) => wd(list.slice(a, b).map((x) => x.w).join(" "));
  if (parts <= 1 || n < 2) return [list];
  const PILL = 3.2;
  let best: number[] = [];
  let score = Infinity;
  if (parts === 2 || n < 3) {
    for (let a = 1; a < n; a++) {
      const v = Math.max(w(0, a) + PILL, w(a, n));
      if (v < score) [score, best] = [v, [a]];
    }
  } else {
    for (let a = 1; a < n - 1; a++)
      for (let b = a + 1; b < n; b++) {
        const v = Math.max(w(0, a), w(a, b) + PILL, w(b, n));
        if (v < score) [score, best] = [v, [a, b]];
      }
  }
  const cuts = [0, ...best, n];
  return cuts.slice(0, -1).map((a, k) => list.slice(a, cuts[k + 1]));
}

const rowText = (r: Word[]) => r.map((x) => x.w).join(" ");

function Row({ r }: { r: Word[] }) {
  const out: ReactNode[] = [];
  r.forEach((x, k) => {
    if (k) out.push(" ");
    out.push(x.em ? <em key={k}>{x.w}</em> : x.w);
  });
  return <>{out}</>;
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const b = c.spec.business;
  const p = c.photo(hero.image);
  const plain = strip(hero.headline);
  const count = plain.split(/\s+/).length;
  const rows = rowsOf(hero.headline, Math.min(count, plain.length <= 14 ? 1 : plain.length <= 30 ? 2 : 3));
  const texts = rows.map(rowText);
  // Which row carries the photograph, and which one is the large closing line.
  const pillAt = rows.length >= 3 ? 1 : 0;
  const lastAt = rows.length >= 2 ? rows.length - 1 : -1;
  const wA = rows.length !== 2 ? wd(texts[0]) : 0;
  const wB = rows.length === 1 ? 0 : wd(texts[pillAt]) + 3.2;
  const wC = lastAt >= 0 ? wd(texts[lastAt]) : 0;
  const base = Math.max(wA, wB, 2);
  const ckd = wC ? Math.max(0.8, Math.min(1.25, base / wC)) : 1;
  const lwr = Math.max(base, wC * ckd);
  const size = plain.length > 64 ? "is-xl" : plain.length > 44 ? "is-l" : plain.length > 22 ? "is-m" : "";
  const run = words([...offerWords(c, 6), hero.eyebrow, b.city], 30);
  const lastWords = lastAt >= 0 ? rows[lastAt] : [];
  const flip = lastWords.length > 0 && lastWords[lastWords.length - 1].w.length <= 9 && plain.length <= 48;
  const facts = heroFacts(c).slice(0, 2);
  const tags = words([hero.eyebrow, offerWords(c, 3).join(", "), b.city], 44);
  const ring = ringText(c);
  const bandA = bandWords(c);
  const bandB = words([hero.eyebrow, b.city, b.tagline, hero.primaryCta.label, hero.note], 46);
  const first = info(c).tone[info(c).shown.indexOf(true)] ?? "ink";
  const pill = (
    <span className={`x-h1-pill${p ? "" : " is-type"}`}>
      {p ? (
        <Pic p={p} eager sizes="(min-width: 900px) 56vw, 54vw" />
      ) : (
        <span className="x-pill-run">
          {[...run, ...run, ...run, ...run].map((w, k) => (
            <span key={k}>
              {w}
              <Star />
            </span>
          ))}
          {run.length ? null : Array.from({ length: 16 }, (_, k) => <Star key={k} />)}
        </span>
      )}
    </span>
  );
  const lineB = (text: ReactNode) => (
    <span className="x-h1-b">
      {text ? (
        <span className="x-mask">
          <span>{text}</span>
        </span>
      ) : null}
      {text ? " " : null}
      {pill}
      <Ring id="x-ring-hero" className="x-hero-ring x-ring-d" text={ring} />
    </span>
  );
  return (
    <>
      <section className="x-hero">
        {tags.length ? (
          <p className="x-hero-tag">
            {tags.map((t, k) => (
              <span key={t} className="x-in" style={i(k)}>
                {t}
              </span>
            ))}
          </p>
        ) : (
          <span />
        )}
        <h1 className={`x-h1${size ? ` ${size}` : ""}`} style={css({ "--lwd": lw(plain, 0.15), "--lwr": (lwr + 0.15).toFixed(2), "--hv": rows.length >= 3 ? "22svh" : rows.length === 2 ? "28svh" : "34svh" })}>
          <span className="x-sr">{plain}</span>
          <span className="x-h1-art" aria-hidden="true">
            {rows.length >= 3 ? (
              <span className="x-h1-a x-mask">
                <span>
                  <Row r={rows[0]} />
                </span>
              </span>
            ) : null}
            {rows.length >= 3 ? " " : null}
            {rows.length === 1 ? (
              <>
                <span className="x-h1-a x-mask">
                  <span>
                    <Row r={rows[0]} />
                  </span>
                </span>{" "}
                {lineB(null)}
              </>
            ) : (
              lineB(<Row r={rows[pillAt]} />)
            )}
            {lastAt > 0 ? (
              <span className="x-h1-c" style={css({ "--ckd": ckd.toFixed(3), "--ckp": texts[lastAt].length <= 10 ? 1.3 : 1, "--lwc": lw(texts[lastAt], 0.15) })}>
                {flip ? (
                  <>
                    <Row r={lastWords.slice(0, -1)} />
                    {lastWords.length > 1 ? " " : null}
                    <span className="x-flip">
                      <span>{lastWords[lastWords.length - 1].em ? <em>{lastWords[lastWords.length - 1].w}</em> : lastWords[lastWords.length - 1].w}</span>
                    </span>
                  </>
                ) : (
                  <Row r={lastWords} />
                )}
              </span>
            ) : null}
          </span>
        </h1>
        <div className={`x-hero-foot${facts.length ? "" : " is-two"}`}>
          <p className="x-lede x-in" style={i(5)}>
            {hero.subheadline}
          </p>
          <div className="x-hero-cta x-in" style={i(6)}>
            <Btn c={c} href={hero.primaryCta.href}>
              <span>{hero.primaryCta.label}</span> <Arrow />
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                <span>{hero.secondaryCta.label}</span>
              </Btn>
            ) : null}
          </div>
          {facts.length ? (
            <dl className="x-hero-coord x-in" style={i(7)}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <Ring id="x-ring-hero-m" className="x-hero-ring x-ring-m" text={ring} />
        </div>
      </section>
      {info(c).bands ? (
        <div className="x-bands" style={css({ "--next": `var(--${first})` })}>
          <Band words={bandA} className="x-band-a" />
          <Band words={bandB.length >= 2 ? bandB : [...bandA].reverse()} className="x-band-b" />
        </div>
      ) : null}
    </>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const nav = navOf(c);
  return (
    <footer className="x-foot">
      <p className="x-foot-mark" aria-hidden="true" style={css({ "--lw": (wd(c.name) + 0.2).toFixed(2) })}>
        <span>{c.name}</span>
        <span>{c.name}</span>
      </p>
      <div className="x-foot-grid">
        <div>
          <h3>{c.t.explore}</h3>
          {nav.map((x) => (
            <a key={x.id} href={`#${x.id}`}>
              {x.label}
            </a>
          ))}
        </div>
        <div>
          <h3>{c.t.contact}</h3>
          {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
          {b.address ?? b.city ? <p>{b.address ?? b.city}</p> : null}
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
              <p key={l}>{l}</p>
            ))}
          </div>
        ) : null}
        {c.spec.footer.blurb ? (
          <div className="x-foot-blurb">
            <h3>{c.name}</h3>
            <p>{c.spec.footer.blurb}</p>
          </div>
        ) : null}
      </div>
      <Legal c={c} className="x-legal" />
    </footer>
  );
}

function Head(p: HeadProps) {
  return (
    <header className="z-head">
      {p.kicker ? <Kick label={p.kicker} /> : null}
      <H2 title={p.title} id={p.id} />
      {p.intro ? (
        <p className="z-intro" data-rv>
          {p.intro}
        </p>
      ) : null}
    </header>
  );
}

const SHAPES = ["arch", "circle", "pill", "leaf", "egg", "tilt", "skew", "circle", "arch"];

/** Contact and booking share the demo's closing part: a band, the address as large as a headline, the card. */
function Closing({ s, c, n, form, kick }: { s: SectionOf<"contact"> | SectionOf<"booking">; c: Ctx; n: number; form: ReactNode; kick: string }) {
  const b = c.spec.business;
  const band = words([s.title, c.spec.hero.primaryCta.label, c.name], 42);
  const mail = b.email ? (/^(.+@)(.+?)(\.[^.]+)$/.exec(b.email)?.slice(1) ?? [b.email]) : b.phone ? [b.phone] : null;
  const first = c.spec.sections.findIndex((x) => x.type === "contact" || x.type === "booking") === n;
  return (
    <section className={`x-contact ${tc(c, n)}${band.length >= 2 ? "" : " no-band"}`} id={s.id}>
      {band.length >= 2 ? <Band words={band} className="x-band-c" /> : null}
      <header className="x-contact-head">
        <Kick n={no(c, n)} label={kick} />
        <H2 title={s.title} />
      </header>
      {mail ? (
        <p className="x-mail" data-rv="l" style={css({ "--lwm": (Math.max(...mail.map(wd)) + 0.1).toFixed(2), "--lwa": (wd(mail.join("")) + 0.1).toFixed(2) })}>
          <a href={b.email ? `mailto:${b.email}` : tel(b.phone ?? "")}>
            {mail.map((m, k) => (
              <span key={k}>{m}</span>
            ))}
          </a>
        </p>
      ) : null}
      <div className={`x-contact-grid${form ? "" : " is-solo"}`}>
        <div className="x-contact-info">
          {s.body ? (
            <p className="x-contact-lede" data-rv>
              {s.body}
            </p>
          ) : null}
          {b.address || b.phone || b.email || b.openingHours?.length ? (
            <dl data-rv>
              {b.phone ? (
                <div>
                  <dt>{c.t.phone}</dt>
                  <dd>
                    <a href={tel(b.phone)}>{b.phone}</a>
                  </dd>
                </div>
              ) : null}
              {b.email ? (
                <div>
                  <dt>{c.t.email}</dt>
                  <dd>
                    <a href={`mailto:${b.email}`}>{b.email}</a>
                  </dd>
                </div>
              ) : null}
              {b.address ? (
                <div>
                  <dt>{c.t.address}</dt>
                  <dd>{b.address}</dd>
                </div>
              ) : null}
              {b.openingHours?.length ? (
                <div>
                  <dt>{c.t.hours}</dt>
                  <dd>
                    {b.openingHours.slice(0, 7).map((l, k) => (
                      <span key={k}>
                        {k ? <br /> : null}
                        {l}
                      </span>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
          {b.mapsUrl ? (
            <a href={b.mapsUrl} className="x-link" target="_blank" rel="noopener noreferrer" data-rv>
              {c.t.route} <Arrow />
            </a>
          ) : null}
          {first && c.spec.hero.note ? <Stamp className="x-contact-stamp">{c.spec.hero.note}</Stamp> : null}
        </div>
        {form ? (
          <div className="x-contact-card" data-rv="r">
            {form}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export const antipode: Family = {
  key: "antipode",
  root: "d-antipode",
  fonts: ["Syne", "Instrument Sans"],
  themeColor: "#101010",
  accent: "#ff5a36",
  onAccent: "#101010",
  css: CSS,
  extra: EXTRA,
  cls: { wrap: "x-wrap", eyebrow: "x-kick", btn: "x-btn x-btn-ink", btnAlt: "x-btn x-btn-line", btnText: "x-link" },
  Header,
  Hero,
  Footer,
  Head: (p) => Head(p),
  sections: {
    about: (s, c, n) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      const says = s.highlights.filter(Boolean);
      return (
        <section className={`x-mani ${tc(c, n)}`} id={s.id}>
          <span className="x-edge-no" aria-hidden="true" data-px>
            {no(c, n)}
          </span>
          <header className="x-mani-head">
            <Kick n={no(c, n)} label={c.t.kick.about} />
            {says.length ? (
              <h2 data-rv="mask">
                <span>{strip(s.title)}</span>
              </h2>
            ) : (
              <H2 title={s.title} />
            )}
          </header>
          {says.length ? (
            <div className="x-says">
              {says.map((h, k) => (
                <Say key={k} text={h} mark={"abcd"[k]} className={k % 3 === 1 ? "x-say-in" : k % 3 === 2 ? "x-say-r" : undefined} />
              ))}
            </div>
          ) : null}
          <div className={`x-mani-note${p ? "" : " is-solo"}`}>
            {p ? (
              <figure className="x-mani-orb" data-rv="pop" data-px>
                <Pic p={p} sizes="(min-width: 900px) 26vw, 64vw" />
                <Ring id={`${s.id}-ring`} text={ringText(c)} />
              </figure>
            ) : null}
            <div>
              <p className={first.length <= 170 ? "x-note-big" : "x-note-lead"} data-rv>
                {first}
              </p>
              {rest.map((x, k) => (
                <p key={k} data-rv style={i(k + 1)}>
                  {x}
                </p>
              ))}
            </div>
          </div>
        </section>
      );
    },
    statement: (s, c, n) => (
      <section className={`x-mani x-stmt ${tc(c, n)}`} id={s.id}>
        <span className="x-edge-no" aria-hidden="true" data-px>
          {no(c, n)}
        </span>
        <Kick n={no(c, n)} label={s.note || undefined} />
        <Say text={s.title} as="h2" />
      </section>
    ),
    services: (s, c, n) => {
      const cta = c.spec.hero.primaryCta;
      return (
        <section className={`x-serv ${tc(c, n)}`} id={s.id}>
          <header className="x-serv-head">
            <Kick n={no(c, n)} label={c.t.kick.services} />
            <H2 title={s.title} />
            {s.intro ? (
              <p className="x-serv-intro" data-rv>
                {s.intro}
              </p>
            ) : null}
          </header>
          <ol className={`x-acc${s.items.length > 6 ? " is-many" : ""}`} data-acc>
            {s.items.map((it, k) => {
              const p = c.photo(`art:svc${k}`);
              const meta = it.price || it.duration;
              return (
                <li key={k}>
                  <details open={k === 0}>
                    <summary>
                      <span className="x-acc-no" aria-hidden="true">
                        {pad2(k)}
                      </span>
                      <h3 className="x-acc-name" style={css({ "--lw": lw(it.title) })}>
                        {it.title}
                      </h3>
                      {meta ? (
                        <span className="x-acc-line">
                          {it.price ?? null}
                          {it.duration ? it.price ? <small>{it.duration}</small> : it.duration : null}
                        </span>
                      ) : null}
                      <span className="x-acc-plus" aria-hidden="true" />
                    </summary>
                    <div className={`x-acc-panel${p ? "" : " no-pic"}`}>
                      <p className="x-acc-text">{it.description}</p>
                      {p ? (
                        <figure className="x-acc-pic">
                          <span className={`s-${k % 2 ? "pill" : "arch"}`}>
                            <Pic p={p} sizes="(min-width: 900px) 30vw, 90vw" />
                          </span>
                        </figure>
                      ) : null}
                      <p className="x-acc-price">
                        {it.price ? <b className="x-acc-meta">{it.price}</b> : null}
                        {it.duration ? <span className="x-acc-meta">{it.duration}</span> : null}
                        <a href={cta.href} className="x-link" {...ext(cta.href)}>
                          {cta.label} <Arrow />
                        </a>
                      </p>
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        </section>
      );
    },
    features: (s, c, n) => (
      <section className={`x-feat ${tc(c, n)}`} id={s.id}>
        <header className="x-feat-head">
          <Kick n={no(c, n)} label={c.t.kick.features} />
          <H2 title={s.title} />
          {s.intro ? (
            <p className="x-serv-intro" data-rv>
              {s.intro}
            </p>
          ) : null}
        </header>
        <ul className="x-feats" data-n={s.items.length}>
          {s.items.map((it, k) => (
            <li key={k} data-rv style={i(k % 3)}>
              <b aria-hidden="true">{pad2(k)}</b>
              <div>
                <h3 style={css({ "--lw": lw(it.title) })}>{it.title}</h3>
                <p>{it.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    ),
    process: (s, c, n) => {
      const a = c.spare();
      const b = c.spare();
      const count = s.steps.length;
      const longIntro = s.intro.length > 150;
      return (
        <section className={`x-how ${tc(c, n)}${a ? " has-a" : ""}${b ? " has-b" : ""}`} id={s.id} style={seam(c, n)}>
          <header className="x-how-head">
            <Kick n={no(c, n)} label={c.t.kick.process} />
            <H2 title={s.title} />
            {s.intro && longIntro ? (
              <p className="x-how-foot is-long" data-rv>
                {s.intro}
              </p>
            ) : null}
          </header>
          {a ? (
            <figure className="x-how-pic x-how-pic-a" data-rv="wipe">
              <span>
                <Pic p={a} sizes="(min-width: 900px) 30vw, 70vw" />
              </span>
              <figcaption aria-hidden="true">Fig. 1</figcaption>
            </figure>
          ) : null}
          <ol className="x-steps">
            {s.steps.map((st, k) => (
              <li key={k} style={i(count > 4 ? (k * 3) / (count - 1) : k)}>
                <span className="x-step-no" aria-hidden="true">
                  {k + 1}
                </span>
                <h3 data-rv={k % 2 ? "r" : "l"} style={css({ "--lw": lw(st.title) })}>
                  {st.title}
                </h3>
                <div data-rv>
                  <p>{st.description}</p>
                </div>
              </li>
            ))}
          </ol>
          {b ? (
            <figure className="x-how-pic x-how-pic-b" data-rv="pop">
              <span>
                <Pic p={b} sizes="(min-width: 900px) 20vw, 56vw" />
              </span>
            </figure>
          ) : null}
          {s.intro && !longIntro ? (
            <p className="x-how-foot" data-rv>
              {s.intro}
            </p>
          ) : b ? (
            <div className="x-how-foot" aria-hidden="true" />
          ) : null}
        </section>
      );
    },
    gallery: (s, c, n) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const title = strip(s.title);
      return (
        <section className={`x-work ${tc(c, n)}`} id={s.id} style={seam(c, n)}>
          <header className="x-work-head">
            <Kick n={no(c, n)} label={c.t.kick.gallery} />
            {title.length <= 14 ? (
              <h2 className="x-giant" data-px style={css({ "--lw": (wd(title) + 0.9).toFixed(2) })}>
                <span>{title}</span>
                <sup>({String(pics.length).padStart(2, "0")})</sup>
              </h2>
            ) : (
              <H2 title={s.title} />
            )}
          </header>
          <div className="x-gal" data-n={pics.length}>
            {pics.map((p, k) => {
              const shape = pics.length === 1 ? "pill" : SHAPES[k % SHAPES.length];
              return (
                <figure key={k} className={shape === "pill" ? "is-wide" : undefined} data-rv="pop" style={i(k % 3)}>
                  <span className={`s-${shape}`}>
                    <Pic p={p} sizes={shape === "pill" ? "(min-width: 900px) 42vw, 92vw" : "(min-width: 900px) 28vw, 46vw"} />
                  </span>
                </figure>
              );
            })}
          </div>
        </section>
      );
    },
    showcase: (s, c, n) => {
      const p = c.photo(s.image);
      return (
        <section className={`x-show ${tc(c, n)}${p ? "" : " no-pic"}`} id={s.id}>
          {p ? (
            <figure className="x-show-pic" data-rv="wipe">
              <span data-px>
                <Pic p={p} sizes="(min-width: 900px) 40vw, 92vw" />
              </span>
              <Ring id={`${s.id}-ring`} text={ringText(c)} />
            </figure>
          ) : null}
          <div className="x-show-copy">
            <H2 title={s.title} />
            {s.body ? (
              <p className="x-lede" data-rv>
                {s.body}
              </p>
            ) : null}
            {s.cta ? (
              <p data-rv>
                <Btn c={c} href={s.cta.href}>
                  <span>{s.cta.label}</span> <Arrow />
                </Btn>
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    team: (s, c, n) => {
      const faces = s.members.map((m) => c.photo(m.image));
      const pic = faces.some(Boolean) ? null : c.spare();
      const bios = s.members.some((m) => m.bio);
      return (
        <section className={`x-team ${tc(c, n)}`} id={s.id}>
          <span className="x-edge-no" aria-hidden="true" data-px>
            {no(c, n)}
          </span>
          <header className="x-team-head">
            <Kick n={no(c, n)} label={c.t.kick.team} />
            <H2 title={s.title} />
          </header>
          <div className={`x-team-grid${pic ? "" : " is-solo"}`}>
            {pic ? (
              <figure className="x-team-pic" data-rv="wipe">
                <span data-px>
                  <Pic p={pic} sizes="(min-width: 900px) 40vw, 92vw" />
                </span>
              </figure>
            ) : null}
            <div className="x-team-copy">
              <ul className={`x-names${bios ? " has-bio" : ""}`}>
                {s.members.map((m, k) => (
                  <li key={k} data-rv style={i(k)}>
                    {faces[k] ? (
                      <figure className="x-face">
                        <Pic p={faces[k]!} sizes="84px" />
                      </figure>
                    ) : null}
                    <b>{m.name}</b>
                    <span>{m.role}</span>
                    {m.bio ? <p>{m.bio}</p> : null}
                  </li>
                ))}
              </ul>
              {s.intro ? (
                <p className="x-team-text" data-rv>
                  {s.intro}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    testimonials: (s, c, n) => (
      <section className={`x-cli ${tc(c, n)}`} id={s.id} style={seam(c, n)}>
        <header className="x-cli-head">
          <Kick n={no(c, n)} label={c.t.kick.testimonials} />
          <H2 title={s.title} />
        </header>
        <div className="x-quotes" data-n={s.items.length}>
          {s.items.map((q, k) => (
            <blockquote key={k} className="x-quote" data-rv style={i(k % 3)}>
              <p>{q.quote}</p>
              <footer>
                <b>{q.author}</b>
                <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {c.t.source}: {q.source}
                </a>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    ),
    packages: (s, c, n) => (
      <section className={`x-packs ${tc(c, n)}`} id={s.id}>
        <header className="x-serv-head">
          <Kick n={no(c, n)} label={c.t.kick.packages} />
          <H2 title={s.title} />
          {s.intro ? (
            <p className="x-serv-intro" data-rv>
              {s.intro}
            </p>
          ) : null}
        </header>
        <div className="x-pack-grid" data-n={s.items.length}>
          {s.items.map((it, k) => (
            <article key={k} className={`x-pack${it.featured ? " is-hot" : ""}`} data-rv style={i(k % 3)}>
              {it.featured ? <Stamp className="x-pack-stamp">{c.t.popular}</Stamp> : null}
              <h3 style={css({ "--lw": lw(it.name, it.featured ? 1.2 : 0.2) })}>{it.name}</h3>
              <p className="x-acc-price">
                {it.price ? (
                  <>
                    <b>{it.price}</b>
                    {it.unit ? <span>{it.unit}</span> : null}
                  </>
                ) : (
                  <b className="is-req">{c.t.onRequest}</b>
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
          <p className="x-pack-note" data-rv>
            {s.note}
          </p>
        ) : null}
      </section>
    ),
    faq: (s, c, n) => (
      <section className={`x-faq ${tc(c, n)}`} id={s.id}>
        <header className="x-cli-head">
          <Kick n={no(c, n)} label={c.t.kick.faq} />
          <H2 title={s.title} />
        </header>
        <div className="x-qa" data-acc>
          {s.items.map((it, k) => (
            <details key={k} data-rv style={i(k % 4)}>
              <summary>
                <span className="x-qa-no" aria-hidden="true">
                  {pad2(k)}
                </span>
                <span className="x-qa-q">{it.q}</span>
                <span className="x-acc-plus" aria-hidden="true" />
              </summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </section>
    ),
    cta: (s, c, n) => {
      const band = words([s.cta.label, c.spec.hero.eyebrow, c.name], 42);
      return (
        <section className={`x-cta ${tc(c, n)}${band.length >= 2 ? "" : " no-band"}`} id={s.id}>
          {band.length >= 2 ? <Band words={band} className="x-band-c" /> : null}
          <div className="x-cta-in">
            <H2 title={s.title} />
            {s.body ? (
              <p className="x-lede" data-rv>
                {s.body}
              </p>
            ) : null}
            <p data-rv>
              <Btn c={c} href={s.cta.href}>
                <span>{s.cta.label}</span> <Arrow />
              </Btn>
            </p>
          </div>
        </section>
      );
    },
    hours: (s, c, n) => {
      const b = c.spec.business;
      const lines = b.openingHours ?? [];
      return (
        <section className={`x-hrs ${tc(c, n)}`} id={s.id}>
          <header className="x-cli-head">
            <Kick n={no(c, n)} label={c.t.kick.hours} />
            <H2 title={s.title} />
          </header>
          <div className="x-hrs-grid">
            {lines.length ? (
              <dl className="x-hrs-list" data-rv>
                {hoursRows(lines).map(([d, t], k) => (
                  <div key={k}>
                    <dt>{d}</dt>
                    <dd>{t}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="x-contact-lede" data-rv>
                {c.t.hoursTbc}
              </p>
            )}
            <div className="x-hrs-side">
              {s.note ? (
                <p className="x-contact-lede" data-rv>
                  {s.note}
                </p>
              ) : null}
              {b.address || b.phone || b.email ? (
                <address data-rv>
                  {b.address ? <span>{b.address}</span> : null}
                  {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
                  {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
                  {b.mapsUrl ? (
                    <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                      {c.t.route}
                    </a>
                  ) : null}
                </address>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    booking: (s, c, n) => <Closing s={s} c={c} n={n} kick={c.t.kick.booking} form={<DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />} />,
    contact: (s, c, n) => <Closing s={s} c={c} n={n} kick={c.t.kick.contact} form={s.showForm ? <DemoForm c={c} kind="message" uid={`f-${s.id}`} /> : null} />,
  },
};
