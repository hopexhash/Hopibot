import type { ReactNode } from "react";
import { ArrowRight, Check, ChevronDown, Clock, Mail, MapPin, Phone } from "lucide-react";
import { CSS } from "./css/saas";
import { Btn, css, DemoForm, em, heroFacts, hoursRows, i, Icon, Legal, long, offerWords, Pic, splitLines, tel, type Ctx, type Family, type HeadProps, type Photo } from "./kit";

/**
 * Veldwerk (demo: /demos/saas). Midnight violet, lit from within: glass panels with a gradient
 * hairline, a violet-to-cyan glow and lime for actions. Made for IT companies, software makers
 * and IT support firms. The demo's product mock-ups need facts no spec carries, so the board of
 * the opening and the cards below are filled with the business's own services and details.
 */

const EXTRA = `
.d-veldwerk{--w-display:"Space Grotesk";--w-sans:"Inter";--z-bg2:var(--bg-2);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line-2);--z-accent:var(--lime);--z-on-accent:#0b0a14;--z-display:var(--w-display),system-ui,sans-serif;--z-display-weight:500;--z-radius:20px;--z-field-radius:12px;--z-ico-radius:13px;--z-h3:clamp(20px,1.8vw,26px);--z-sec:clamp(80px,10vw,150px);--z-statement:clamp(28px,3.8vw,56px)}
.d-veldwerk main{counter-reset:w}
.d-veldwerk .w-no::before{counter-increment:w;content:counter(w,decimal-leading-zero)}
.d-veldwerk h2.is-long{font-size:clamp(28px,3.4vw,48px)}
.d-veldwerk h2,.d-veldwerk h3{overflow-wrap:break-word}
.d-veldwerk .w-about-grid>*,.d-veldwerk .w-board-body>*,.d-veldwerk .w-contact-grid>*,.d-veldwerk .w-faq-grid>*,.d-veldwerk .w-voice-grid>*,.d-veldwerk .w-trial-box>*,.d-veldwerk .w-hub>*,.d-veldwerk .w-pane-in>*{min-width:0}
.d-veldwerk .w-btn{max-width:100%;white-space:normal;text-align:center;line-height:1.2}
.d-veldwerk .w-link{color:var(--lime);text-decoration:underline;text-underline-offset:4px}
.d-veldwerk .w-logo{flex:0 1 auto;min-width:0}
.d-veldwerk .w-logo span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-veldwerk .w-logo.is-long{font-size:17px;letter-spacing:-.02em}
.d-veldwerk .w-ini{display:grid;place-items:center;flex:none;width:30px;height:30px;border-radius:9px;background:linear-gradient(140deg,#c3b3ff,var(--violet) 45%,var(--indigo));box-shadow:0 0 18px -4px rgba(155,123,255,.8),inset 0 1px 0 rgba(255,255,255,.35);font-family:var(--w-display),sans-serif;font-size:16px;font-style:normal;font-weight:600;letter-spacing:0;line-height:1;color:#0b0a14}
.d-veldwerk .w-links{flex:none}
.d-veldwerk .w-nav-cta{flex:none;white-space:nowrap}
@media (max-width:599px){.d-veldwerk .w-nav-cta.is-long{display:none}}
@media (min-width:1000px) and (max-width:1199px){.d-veldwerk .w-nav.is-wide .w-links{display:none}.d-veldwerk .w-nav.is-wide .w-burger{display:grid}}
.d-veldwerk .w-menu nav a{font-size:clamp(24px,7vw,30px);line-height:1.15;padding-block:8px}
.d-veldwerk .w-menu-foot p a{display:inline-flex;align-items:center;min-height:44px;color:var(--ink);overflow-wrap:anywhere}
.d-veldwerk .w-hero h1.is-m{font-size:clamp(34px,5.4vw,76px)}
.d-veldwerk .w-hero h1.is-s{font-size:clamp(30px,4.4vw,62px);line-height:1.02}
.d-veldwerk .w-board-title{min-width:0}
.d-veldwerk .w-board-title b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-veldwerk .w-board-top{min-height:62px}
.d-veldwerk .w-board-dots{display:flex;gap:6px}
.d-veldwerk .w-board-dots i{width:10px;height:10px;border-radius:50%;background:var(--line-2)}
.d-veldwerk .w-board-dots i:first-child{background:var(--violet)}
.d-veldwerk .w-board-dots i:last-child{background:var(--lime)}
.d-veldwerk .w-board-body{display:grid;gap:12px;padding:12px}
.d-veldwerk .w-shot{position:relative;margin:0;overflow:hidden;aspect-ratio:4/3;border-radius:14px;background:var(--panel)}
.d-veldwerk .w-shot img{width:100%;height:100%;object-fit:cover}
.d-veldwerk .w-shot::after{content:"";position:absolute;inset:0;background:linear-gradient(140deg,rgba(93,91,245,.3),transparent 55%),linear-gradient(180deg,transparent 60%,rgba(11,10,20,.45));pointer-events:none}
.d-veldwerk .w-tiles{display:grid;gap:8px}
.d-veldwerk .w-tiles li{--tone:var(--violet);position:relative;display:flex;flex-direction:column;gap:4px;min-width:0;padding:12px 14px 12px 17px;border:1px solid color-mix(in srgb,var(--tone) 40%,transparent);border-radius:11px;background:color-mix(in srgb,var(--tone) 16%,#14112a);overflow:hidden;animation:w-pop .7s var(--ease) both;animation-delay:calc(.8s + var(--i,0) * 90ms)}
.d-veldwerk .w-tiles li::before{content:"";position:absolute;inset:0 auto 0 0;width:3px;background:var(--tone)}
.d-veldwerk .w-tiles li[data-tone="c"]{--tone:var(--cyan)}
.d-veldwerk .w-tiles li[data-tone="p"]{--tone:var(--pink)}
.d-veldwerk .w-tiles li[data-tone="a"]{--tone:var(--amber)}
.d-veldwerk .w-tiles b{font-size:14.5px;font-weight:600;line-height:1.3;overflow-wrap:break-word}
.d-veldwerk .w-tiles span{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;font-size:13px;line-height:1.45;color:var(--dim)}
.d-veldwerk .w-tiles em{margin-top:auto;padding-top:6px;font-size:11px;font-style:normal;letter-spacing:.1em;color:var(--mute);font-variant-numeric:tabular-nums}
.d-veldwerk .w-tiles small{align-self:flex-start;margin-top:4px;padding:2px 9px;border-radius:999px;background:rgba(201,255,74,.14);font-size:11.5px;font-weight:600;color:var(--lime)}
.d-veldwerk .w-hero.no-pic .w-tiles li{min-height:118px;padding:18px 18px 18px 21px}
.d-veldwerk .w-hero.no-pic .w-tiles b{font-family:var(--w-display),sans-serif;font-size:18px;font-weight:500;letter-spacing:-.02em}
@media (max-width:639px){.d-veldwerk .w-tiles li:nth-child(n+5){display:none}}
@media (min-width:640px){.d-veldwerk .w-board-body{gap:16px;padding:16px}.d-veldwerk .w-shot{aspect-ratio:16/9}.d-veldwerk .w-tiles{grid-template-columns:repeat(2,minmax(0,1fr))}.d-veldwerk .w-tiles[data-n="1"]{grid-template-columns:1fr}}
@media (min-width:1000px){.d-veldwerk .w-board-body.is-side{grid-template-columns:minmax(0,1.6fr) minmax(0,1fr)}.d-veldwerk .w-board-body.is-side .w-shot{aspect-ratio:auto;min-height:400px}.d-veldwerk .w-board-body.is-side .w-tiles span{-webkit-line-clamp:3}.d-veldwerk .w-board-body.is-side .w-tiles{grid-template-columns:1fr;grid-auto-rows:1fr}.d-veldwerk .w-board-body:not(.is-side) .w-shot{aspect-ratio:21/9}.d-veldwerk .w-board-body:not(.is-side) .w-tiles{grid-template-columns:repeat(3,minmax(0,1fr))}.d-veldwerk .w-board-body:not(.is-side) .w-tiles[data-n="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}.d-veldwerk .w-board-body:not(.is-side) .w-tiles[data-n="2"]{grid-template-columns:repeat(2,minmax(0,1fr))}.d-veldwerk .w-board-body:not(.is-side) .w-tiles[data-n="1"]{grid-template-columns:1fr}}
.d-veldwerk .w-facts{display:grid;gap:1px;margin:0;border-top:1px solid var(--line);border-radius:0 0 21px 21px;background:var(--line);overflow:hidden}
.d-veldwerk .w-facts div{display:grid;align-content:start;gap:2px;padding:14px 18px;background:rgba(14,12,28,.96)}
.d-veldwerk .w-facts dt{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--mute)}
.d-veldwerk .w-facts dd{display:flex;align-items:center;min-height:44px;font-family:var(--w-display),sans-serif;font-size:clamp(16px,1.4vw,19px);font-weight:500;letter-spacing:-.01em;color:var(--ink);overflow-wrap:anywhere}
.d-veldwerk .w-facts a{display:inline-flex;align-items:center;min-height:44px;color:var(--lime)}
@media (min-width:700px){.d-veldwerk .w-facts{grid-template-columns:repeat(var(--n),minmax(0,1fr))}}
.d-veldwerk .w-f-ico{display:grid;place-items:center;min-height:150px;background:radial-gradient(circle at 50% 50%,rgba(124,92,255,.32),transparent 58%),radial-gradient(rgba(233,230,255,.07) 1px,transparent 1px) 0 0/18px 18px,rgba(8,7,16,.55)}
.d-veldwerk .w-f-ico i{position:relative;display:grid;place-items:center;width:58px;height:58px;border-radius:16px;background:linear-gradient(140deg,rgba(155,123,255,.55),rgba(93,91,245,.2));box-shadow:0 0 0 12px rgba(155,123,255,.08),0 0 0 30px rgba(155,123,255,.045),0 0 0 52px rgba(155,123,255,.025),0 18px 40px -14px rgba(124,92,255,.9);color:var(--ink)}
.d-veldwerk .w-f-ico i svg{width:26px;height:26px}
.d-veldwerk .w-f-ico small{position:absolute;top:14px;right:16px;font-size:12px;letter-spacing:.08em;color:var(--lime);font-variant-numeric:tabular-nums}
.d-veldwerk .w-f4 figcaption b{overflow-wrap:break-word}
@media (min-width:720px){.d-veldwerk .w-bento>*{grid-column:span 6}.d-veldwerk .w-bento>:last-child:nth-child(odd){grid-column:span 12}}
@media (min-width:1000px){.d-veldwerk .w-bento>*,.d-veldwerk .w-bento>:last-child:nth-child(odd){grid-column:span var(--sp,4)}}
.d-veldwerk .w-hub-side li>i.has-pic{overflow:hidden}
.d-veldwerk .w-hub-side li>i img{width:46px;height:46px;object-fit:cover}
.d-veldwerk .w-hub-side li{align-content:center}
.d-veldwerk .w-hub-side li>*{min-width:0}
.d-veldwerk .w-hub-side h3 a{overflow-wrap:anywhere}
.d-veldwerk .w-hub-side p a{display:inline-flex;align-items:center;min-height:40px;color:var(--lime)}
.d-veldwerk .w-core-mark{flex-wrap:wrap;overflow-wrap:anywhere;line-height:1.1}
.d-veldwerk .w-core-mark .w-ini{width:38px;height:38px;border-radius:11px;font-size:20px}
.d-veldwerk .w-core .w-btn{width:100%;margin-top:22px}
.d-veldwerk .w-core ul li{overflow-wrap:anywhere}
@media (max-width:1059px){.d-veldwerk .w-hub .w-core{order:1}}
@media (min-width:1060px){.d-veldwerk .w-hub.is-one{grid-template-columns:minmax(0,1fr) 340px}}
@media (min-width:640px){.d-veldwerk .w-tabs{flex-wrap:wrap}}
.d-veldwerk .w-tabs button span{max-width:30ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-veldwerk .w-pane[hidden]{display:none}
.d-veldwerk .w-win-bar span,.d-veldwerk .w-win-bar b{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-veldwerk .w-win-bar span{flex:none}
.d-veldwerk .w-win-bar em{flex:none}
.d-veldwerk .w-win-pic figure{margin:0;aspect-ratio:4/3;overflow:hidden;border-radius:0 0 20px 20px}
.d-veldwerk .w-win-pic img{width:100%;height:100%;object-fit:cover}
.d-veldwerk .w-pane-copy .w-btn{margin-top:26px}
@media (min-width:1000px){.d-veldwerk .w-product .w-pane-in{min-height:0}.d-veldwerk .w-win-pic figure{aspect-ratio:16/10}}
.d-veldwerk .w-flow-list{display:grid;gap:14px}
.d-veldwerk .w-flow-list li{display:flex;flex-direction:column;padding:22px 22px 26px}
.d-veldwerk .w-flow-bar{position:relative;display:block;height:4px;margin-bottom:22px;border-radius:4px;background:rgba(233,230,255,.08);overflow:hidden}
.d-veldwerk .w-flow-bar::after{content:"";position:absolute;inset:0;width:calc(var(--f) * 100%);border-radius:inherit;background:linear-gradient(90deg,var(--violet),var(--lime));transform-origin:0 50%;transition:transform 1.2s var(--ease) .3s}
.demo-js .d-veldwerk .w-flow-list li[data-rv]:not(.in) .w-flow-bar::after{transform:scaleX(0)}
.d-veldwerk .w-flow-no{align-self:flex-start;padding:2px 8px;border:1px solid rgba(201,255,74,.4);border-radius:7px;font-size:12.5px;font-weight:600;letter-spacing:.04em;color:var(--lime)}
.d-veldwerk .w-flow-list h3{margin:16px 0 8px;font-size:22px}
.d-veldwerk .w-flow-list p{font-size:15px;color:var(--dim)}
@media (min-width:640px){.d-veldwerk .w-flow-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){.d-veldwerk .w-flow-list[data-n="3"],.d-veldwerk .w-flow-list[data-n="5"],.d-veldwerk .w-flow-list[data-n="6"]{grid-template-columns:repeat(3,minmax(0,1fr))}.d-veldwerk .w-flow-list[data-n="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}}
.d-veldwerk .w-plans:not(.has-top) .w-plan:not(.is-top){padding-top:30px}
.d-veldwerk .w-plan-who{min-height:0}
.d-veldwerk .w-plan-price{min-height:96px}
.d-veldwerk .w-plan-sum{flex-wrap:wrap}
.d-veldwerk .w-plan-sum b.is-long{font-size:clamp(30px,2.8vw,40px)}
.d-veldwerk .w-plan-ask{font-family:var(--w-display),sans-serif;font-size:clamp(26px,2.4vw,34px);font-weight:500;letter-spacing:-.03em}
.d-veldwerk .w-plan ul{margin-top:22px}
@media (min-width:760px) and (max-width:999px){.d-veldwerk .w-plans{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:760px){.d-veldwerk .w-plans[data-n="1"]{grid-template-columns:minmax(0,560px)}}
@media (min-width:1000px){.d-veldwerk .w-plans[data-n="2"],.d-veldwerk .w-plans[data-n="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}.d-veldwerk .w-plans[data-n="2"]{max-width:980px}}
@media (min-width:1200px){.d-veldwerk .w-plans[data-n="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}}
.d-veldwerk .w-voice-grid.is-solo{grid-template-columns:minmax(0,1fr)}
.d-veldwerk .w-voice-grid.is-solo .w-voice-lead:not(.no-pic){min-height:440px}
.d-veldwerk .w-voice-lead.no-pic{min-height:0;border:1px solid rgba(175,155,255,.3);background:radial-gradient(120% 80% at 0% 0%,rgba(124,92,255,.45),transparent 65%),linear-gradient(180deg,rgba(30,26,60,.96),rgba(17,15,34,.98))}
.d-veldwerk .w-voice-lead footer a,.d-veldwerk .w-voice-list footer a{display:inline-flex;align-items:center;min-height:36px;color:var(--dim);text-decoration:underline;text-underline-offset:3px}
.d-veldwerk .w-voice-list footer i{display:grid;place-items:center;background:linear-gradient(140deg,rgba(155,123,255,.45),rgba(93,91,245,.2));font-style:normal;font-weight:600}
.d-veldwerk .w-voice-list[data-n="1"]{grid-template-columns:minmax(0,1fr)}
.d-veldwerk .w-voice-list[data-n="1"] blockquote>p,.d-veldwerk .w-voice-list[data-n="2"] blockquote>p{font-family:var(--w-display),sans-serif;font-size:clamp(19px,1.7vw,24px);line-height:1.3;letter-spacing:-.02em}
@media (min-width:640px){.d-veldwerk .w-voice-list>:last-child:nth-child(odd):not(:first-child){grid-column:1/-1}}
.d-veldwerk .w-faq{min-width:0}
.d-veldwerk .w-faq-contact a{overflow-wrap:anywhere}
.d-veldwerk .w-faq-item summary{display:flex;align-items:center;gap:14px;min-height:68px;padding:14px 0;font-family:var(--w-display),sans-serif;font-size:clamp(17px,1.5vw,21px);font-weight:500;line-height:1.25;letter-spacing:-.02em;cursor:pointer;list-style:none}
.d-veldwerk .w-faq-item summary::-webkit-details-marker{display:none}
.d-veldwerk .w-faq-item summary svg{width:30px;height:30px;margin-left:auto;padding:6px;border:1px solid var(--line-2);border-radius:10px;transition:transform .5s var(--ease),background-color .3s,color .3s}
.d-veldwerk .w-faq-item summary:hover svg{border-color:var(--lime)}
.d-veldwerk .w-faq-item[open] small{color:var(--lime)}
.d-veldwerk .w-faq-item[open] summary svg{transform:rotate(180deg);border-color:var(--lime);background:var(--lime);color:#0b0a14}
.d-veldwerk .w-trial-box.no-pic{background:radial-gradient(90% 120% at 100% 0%,rgba(124,92,255,.42),transparent 62%),radial-gradient(rgba(233,230,255,.08) 1px,transparent 1px) 0 0/26px 26px,var(--bg-2)}
.d-veldwerk .w-trial-box.is-solo{grid-template-columns:minmax(0,1fr)}
.d-veldwerk .w-trial-box.is-solo .w-trial-copy{max-width:860px}
.d-veldwerk .w-trial-copy .w-hero-cta{justify-content:flex-start;margin-top:28px}
.d-veldwerk .w-trial-steps{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
.d-veldwerk .w-trial-card h3{overflow-wrap:break-word}
.d-veldwerk .w-reach{display:grid}
.d-veldwerk .w-reach li{display:grid;padding:12px 0;border-bottom:1px solid var(--line)}
.d-veldwerk .w-reach li:last-child{border-bottom:0}
.d-veldwerk .w-reach small{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--mute)}
.d-veldwerk .w-reach a,.d-veldwerk .w-reach span{display:inline-flex;align-items:center;min-height:40px;font-size:16px;color:var(--ink);overflow-wrap:anywhere}
.d-veldwerk .w-reach .w-route{color:var(--lime)}
.d-veldwerk .w-contact-grid{display:grid;gap:14px}
.d-veldwerk .w-contact-grid .w-hub-side{align-content:start}
.d-veldwerk .w-contact-grid .w-hub-side li::before,.d-veldwerk .w-contact-grid .w-hub-side li::after{content:none}
.d-veldwerk .w-contact-grid .w-hub-side li{grid-auto-rows:min-content}
.d-veldwerk .w-hours-list{display:grid;gap:2px;font-size:14.5px;color:var(--dim)}
@media (min-width:1000px){.d-veldwerk .w-contact-grid{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(28px,4vw,56px);align-items:start}.d-veldwerk .w-contact-grid.no-form{grid-template-columns:minmax(0,1fr)}.d-veldwerk .w-contact-grid.no-form .w-hub-side{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}}
.d-veldwerk .w-about-grid{display:grid;gap:clamp(28px,4vw,56px)}
.d-veldwerk .w-about-copy .w-head{margin-bottom:26px}
.d-veldwerk .w-about-copy>p{max-width:60ch;margin-top:16px;color:var(--dim)}
.d-veldwerk .w-about-copy>p.w-about-lead{margin-top:0;font-size:clamp(18px,1.5vw,21px);line-height:1.5;color:var(--ink)}
.d-veldwerk .w-about-copy .w-ticks{margin-top:26px}
.d-veldwerk .w-about-card{order:0;align-self:start}
@media (min-width:1000px){.d-veldwerk .w-about-grid.has-pic{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center}.d-veldwerk .w-about-grid.has-card{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);align-items:center}.d-veldwerk .w-about-grid.is-solo{max-width:980px}}
.d-veldwerk .w-state-in{display:grid;justify-items:center;gap:26px;text-align:center}
.d-veldwerk .w-state h2{max-width:22ch;font-size:clamp(32px,4.6vw,68px);line-height:1.06}
.d-veldwerk .w-state h2.w-state-m{max-width:28ch;font-size:clamp(28px,3.4vw,50px);line-height:1.1}
.d-veldwerk .w-state h2.w-state-s{max-width:34ch;font-size:clamp(24px,2.6vw,38px);line-height:1.18}
.d-veldwerk .w-show{display:flex;flex-direction:column;min-height:min(78svh,620px);margin:0}
.d-veldwerk .w-show figcaption{display:grid;gap:18px;justify-items:start;max-width:780px;padding:clamp(24px,4vw,56px)}
.d-veldwerk .w-show figcaption>p{max-width:52ch}
.d-veldwerk .w-show::after{background:linear-gradient(90deg,rgba(11,10,20,.7),transparent 70%),linear-gradient(180deg,rgba(11,10,20,.1) 20%,rgba(11,10,20,.92) 92%),linear-gradient(140deg,rgba(93,91,245,.45),rgba(155,123,255,.05) 60%)}
.d-veldwerk .w-show.no-pic{min-height:0;border:1px solid rgba(175,155,255,.3);background:radial-gradient(80% 120% at 100% 100%,rgba(124,92,255,.45),transparent 62%),radial-gradient(rgba(233,230,255,.08) 1px,transparent 1px) 0 0/26px 26px,var(--bg-2)}
.d-veldwerk .w-show.no-pic::after{content:none}
.d-veldwerk .w-team{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(min(100%,160px),1fr))}
@media (min-width:640px){.d-veldwerk .w-team{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}.d-veldwerk .w-team[data-n="1"],.d-veldwerk .w-team[data-n="2"]{max-width:760px}.d-veldwerk .w-team[data-n="3"] .w-team-pic{aspect-ratio:1}}
.d-veldwerk .w-team li{padding:14px}
.d-veldwerk .w-team-pic{margin:0;aspect-ratio:4/5;overflow:hidden;border-radius:14px}
.d-veldwerk .w-team-pic img{width:100%;height:100%;object-fit:cover}
.d-veldwerk .w-team-ini{display:grid;place-items:center;width:56px;height:56px;margin:8px;border-radius:16px;background:linear-gradient(140deg,rgba(155,123,255,.55),rgba(93,91,245,.2));font-family:var(--w-display),sans-serif;font-size:22px;font-style:normal;font-weight:600;color:var(--ink)}
.d-veldwerk .w-team-txt{display:grid;gap:4px;padding:16px 8px 8px}
.d-veldwerk .w-team h3{font-size:clamp(18px,2vw,22px)}
.d-veldwerk .w-team-role{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--lime)}
.d-veldwerk .w-team-txt>p:last-child:not(.w-team-role){margin-top:8px;font-size:15px;color:var(--dim)}
.d-veldwerk .z-card,.d-veldwerk .z-panel,.d-veldwerk .z-channel{border-color:rgba(175,155,255,.22);background:linear-gradient(180deg,rgba(233,230,255,.055),rgba(233,230,255,.018))}
.d-veldwerk .z-channel:hover{border-color:var(--violet)}
.d-veldwerk .z-sec h3{letter-spacing:-.02em}
.d-veldwerk .z-ico{border:0;background:linear-gradient(140deg,rgba(155,123,255,.4),rgba(93,91,245,.16));color:var(--ink)}
.d-veldwerk .z-hours dd{color:var(--ink)}
.d-veldwerk .z-reach a{min-height:44px}
.d-veldwerk .z-hours-sec,.d-veldwerk .z-menu{background:linear-gradient(180deg,var(--bg),var(--bg-2) 30%,var(--bg-2) 70%,var(--bg))}
.d-veldwerk .z-form{gap:16px}
.d-veldwerk .z-fields{gap:14px}
.d-veldwerk .z-field label,.d-veldwerk .z-chipset legend{font-size:13.5px;font-weight:500;letter-spacing:0;text-transform:none;color:var(--dim)}
.d-veldwerk .z-field input,.d-veldwerk .z-field select,.d-veldwerk .z-field textarea{min-height:52px;padding:13px 14px;border:1px solid var(--line-2);border-radius:12px;background-color:rgba(233,230,255,.05);color-scheme:dark;transition:border-color .3s,background-color .3s}
.d-veldwerk .z-field select{padding-right:40px;background-image:linear-gradient(45deg,transparent 50%,var(--dim) 50%),linear-gradient(135deg,var(--dim) 50%,transparent 50%);background-position:calc(100% - 21px) 50%,calc(100% - 16px) 50%;background-size:5px 5px;background-repeat:no-repeat}
.d-veldwerk .z-field input:focus,.d-veldwerk .z-field select:focus,.d-veldwerk .z-field textarea:focus{outline:none;border-color:var(--lime);background-color:rgba(201,255,74,.05)}
.d-veldwerk .z-form .btn{min-height:54px;margin-top:4px}
.d-veldwerk .form-note{color:var(--dim)}
.d-veldwerk .form-status{border-color:rgba(201,255,74,.5);border-radius:12px;background:rgba(201,255,74,.08);color:var(--lime)}
.d-veldwerk .z-chips button{border-radius:12px;font-family:var(--w-display),sans-serif}
.d-veldwerk .z-ba{border-radius:20px}
.d-veldwerk .z-ba:only-child{max-width:980px}
.d-veldwerk .z-ba figcaption{border-radius:999px;padding:6px 12px;background:rgba(11,10,20,.75)}
.d-veldwerk .w-foot-top .w-logo{max-width:100%}
.d-veldwerk .w-foot-top.no-blurb{grid-template-columns:auto 1fr}
.d-veldwerk .w-foot-grid a{overflow-wrap:anywhere}
@media (min-width:900px){.d-veldwerk .w-foot-grid[data-n="3"]{grid-template-columns:repeat(3,1fr)}.d-veldwerk .w-foot-grid[data-n="2"]{grid-template-columns:repeat(2,1fr)}.d-veldwerk .w-foot-top.no-blurb .w-foot-st{justify-self:end}}
`
  .replace(/\n/g, "")
  .trim();

/** The pointer lights the hairline of a card, as in the demo. */
const JS = `(function(){[].forEach.call(document.querySelectorAll('.d-veldwerk .w-spot'),function(n){n.addEventListener('pointermove',function(e){var r=n.getBoundingClientRect();n.style.setProperty('--mx',Math.round(e.clientX-r.left)+'px');n.style.setProperty('--my',Math.round(e.clientY-r.top)+'px')})})})();`;

const nr = (n: number) => String(n).padStart(2, "0");
const TONES = ["v", "c", "p", "a"];
const plain = (t: string) => t.replace(/\*/g, "");

/** Navigation without galleries that render nothing (no real photographs). */
function navOf(c: Ctx) {
  const real = new Set(c.spec.images.filter((im) => im.license !== "generated" && /^https:\/\//.test(im.src)).map((im) => im.key));
  const empty = new Set(c.spec.sections.filter((s) => s.type === "gallery" && !s.images.some((r) => real.has(r))).map((s) => s.id));
  return c.nav.filter((n) => !empty.has(n.id));
}

const ext = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="w-kicker" data-rv>
      <b className="w-no" aria-hidden="true" />
      {children}
    </p>
  );
}

function Head({ kicker, title, intro, id }: HeadProps) {
  return (
    <header className="w-head">
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

function Logo({ c }: { c: Ctx }) {
  return (
    <a href="#top" className={`w-logo${c.name.length > 18 ? " is-long" : ""}`} aria-label={c.name}>
      <i className="w-ini" aria-hidden="true">
        {c.name.charAt(0).toUpperCase()}
      </i>
      <span>{c.name}</span>
    </a>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const nav = navOf(c);
  const wide = c.name.length + cta.label.length + nav.reduce((a, n) => a + n.label.length + 3, 0) > 78;
  return (
    <>
      <header className={`w-nav hdr${wide ? " is-wide" : ""}`}>
        <div className="w-nav-in">
          <Logo c={c} />
          {nav.length > 0 && (
            <nav aria-label={c.t.menu} className="w-links" data-nav>
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`}>
                  {n.label}
                </a>
              ))}
            </nav>
          )}
          <a href={cta.href} className={`btn w-btn w-btn-lime w-nav-cta${cta.label.length > 18 ? " is-long" : ""}`} {...ext(cta.href)}>
            {cta.label}
          </a>
          <button type="button" className="w-burger menu-btn" aria-expanded="false" aria-controls="w-menu" aria-label={c.t.menu}>
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="w-menu" className="w-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{nr(k + 1)}</small>
              {n.label}
              <ArrowRight aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="w-menu-foot">
          <Btn c={c} href={cta.href}>
            {cta.label}
          </Btn>
          {b.phone || b.email ? (
            <p>
              <i aria-hidden="true" />
              {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
              {b.phone && b.email ? <br /> : null}
              {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

type Tile = { title: string; text?: string; meta?: string | null };

/** What the business does, for the board of the opening: its services, else its strengths or its steps. */
function offer(c: Ctx, max: number): Tile[] {
  for (const s of c.spec.sections) if (s.type === "services") return s.items.slice(0, max).map((it) => ({ title: it.title, text: it.description, meta: it.price || it.duration || null }));
  for (const s of c.spec.sections) if (s.type === "features") return s.items.slice(0, max).map((it) => ({ title: it.title, text: it.description }));
  for (const s of c.spec.sections) if (s.type === "process") return s.steps.slice(0, max).map((it) => ({ title: it.title, text: it.description }));
  return [];
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const b = c.spec.business;
  const p = c.photo(hero.image);
  const text = plain(hero.headline);
  const { lines, marked } = splitLines(hero.headline, text.length > 18 ? 2 : 1);
  const size = text.length > 60 ? "is-s" : text.length > 34 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const tiles = offer(c, p ? 5 : 6);
  const side = Boolean(p) && tiles.length >= 3;
  const board = p || tiles.length || facts.length;
  return (
    <>
      <section className={`w-hero${p ? "" : " no-pic"}`}>
        <div className="w-hero-bg" aria-hidden="true" />
        <div className="w-wrap">
          {hero.eyebrow ? (
            <p className="w-chip w-rise" style={i(0)}>
              <i aria-hidden="true" />
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className={size}>
            {lines.map((line, n) => (
              <span className="w-line" key={n}>
                {/* Without a marked phrase the last line carries the gradient of the design. */}
                <span>{!marked && lines.length > 1 && n === lines.length - 1 ? <em>{line}</em> : line}</span>
              </span>
            ))}
          </h1>
          <div className="w-hero-row">
            <p className="w-lede w-rise" style={i(3)}>
              {hero.subheadline}
            </p>
            <div className="w-hero-cta w-rise" style={i(4)}>
              <Btn c={c} href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" />
              </Btn>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
              {hero.note ? <p>{hero.note}</p> : null}
            </div>
          </div>
          {board ? (
            <div className="w-stage">
              <div className="w-board">
                <div className="w-board-top">
                  <div className="w-board-title">
                    <b>{c.name}</b>
                    {b.city || b.tagline ? <span>{b.city ?? b.tagline}</span> : null}
                  </div>
                  <span className="w-board-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                {p || tiles.length ? (
                  <div className={`w-board-body${side ? " is-side" : ""}`}>
                    {p ? (
                      <figure className="w-shot">
                        <Pic p={p} eager sizes={side ? "(min-width: 1000px) 60vw, 100vw" : "100vw"} />
                      </figure>
                    ) : null}
                    {tiles.length ? (
                      <ul className="w-tiles" data-n={tiles.length}>
                        {tiles.map((t, n) => (
                          <li key={n} data-tone={TONES[n % 4]} style={i(n)}>
                            <b>{t.title}</b>
                            {t.text ? <span>{t.text}</span> : null}
                            {t.meta ? <small>{t.meta}</small> : null}
                            <em aria-hidden="true">{nr(n + 1)}</em>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}
                {facts.length > 0 && (
                  <dl className="w-facts" style={css({ "--n": facts.length })}>
                    {facts.map((f) => (
                      <div key={f.label}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <Band c={c} />
    </>
  );
}

/** A running line of the business's own services, as the demo runs the trades it serves. */
function Band({ c }: { c: Ctx }) {
  const list = offerWords(c);
  if (list.length < 4) return null;
  return (
    <div className="w-band" aria-hidden="true">
      <p>
        {[...list, ...list].map((w, n) => (
          <span key={n}>{w}</span>
        ))}
      </p>
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const nav = navOf(c);
  const words = offerWords(c, 5);
  const reach = b.phone || b.email || b.address;
  const cols = [nav.length > 0, Boolean(reach), Boolean(b.openingHours?.length), words.length > 0].filter(Boolean).length;
  return (
    <footer className="w-foot">
      <div className="w-wrap">
        <div className={`w-foot-top${c.spec.footer.blurb ? "" : " no-blurb"}`}>
          <Logo c={c} />
          {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
          {b.city ? (
            <p className="w-foot-st">
              <i aria-hidden="true" /> {b.city}
            </p>
          ) : null}
        </div>
        {cols > 0 && (
          <div className="w-foot-grid" data-n={cols}>
            {nav.length > 0 && (
              <div>
                <h3>{c.t.explore}</h3>
                {nav.map((n) => (
                  <a key={n.id} href={`#${n.id}`}>
                    {n.label}
                  </a>
                ))}
              </div>
            )}
            {words.length > 0 && (
              <div>
                <h3>{c.t.kick.services}</h3>
                {words.map((w) => (
                  <p key={w}>{w}</p>
                ))}
              </div>
            )}
            {reach ? (
              <div>
                <h3>{c.t.contact}</h3>
                {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
                {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
                {b.address ? <p>{b.address}</p> : null}
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
                  <p key={l}>{l}</p>
                ))}
              </div>
            ) : null}
          </div>
        )}
        <Legal c={c} className="w-legal" />
      </div>
    </footer>
  );
}

/** Desktop column spans of the bento (12 columns) for 1 to 7 cards. */
const SPANS: Record<number, number[]> = { 1: [12], 2: [7, 5], 3: [4, 4, 4], 4: [7, 5, 5, 7], 5: [7, 5, 4, 4, 4], 6: [7, 5, 5, 7, 6, 6], 7: [7, 5, 4, 4, 4, 6, 6] };

function Reach({ c }: { c: Ctx }) {
  const b = c.spec.business;
  if (!b.phone && !b.email && !b.address) return null;
  return (
    <ul className="w-reach">
      {b.phone ? (
        <li>
          <small>{c.t.phone}</small>
          <a href={tel(b.phone)}>{b.phone}</a>
        </li>
      ) : null}
      {b.email ? (
        <li>
          <small>{c.t.email}</small>
          <a href={`mailto:${b.email}`}>{b.email}</a>
        </li>
      ) : null}
      {b.address ? (
        <li>
          <small>{c.t.address}</small>
          <span>{b.address}</span>
          {b.mapsUrl ? (
            <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="w-route">
              {c.t.route} →
            </a>
          ) : null}
        </li>
      ) : null}
    </ul>
  );
}

export const veldwerk: Family = {
  key: "veldwerk",
  root: "d-veldwerk",
  fonts: ["Space Grotesk", "Inter"],
  themeColor: "#0b0a14",
  accent: "#9b7bff",
  onAccent: "#0b0a14",
  css: CSS,
  extra: EXTRA,
  js: JS,
  cls: { wrap: "w-wrap", eyebrow: "w-kicker", btn: "w-btn w-btn-lime", btnAlt: "w-btn w-btn-line", btnText: "w-link" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      const card = !p && s.highlights.length > 0;
      return (
        <section className="w-sec w-about" id={s.id}>
          <div className={`w-wrap w-about-grid${p ? " has-pic" : card ? " has-card" : " is-solo"}`}>
            <div className="w-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="w-about-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {p && s.highlights.length > 0 && (
                <ul className="w-ticks" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>
                      <Check aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {p ? (
              <div data-rv>
                <div className="w-card w-win w-win-pic">
                  <div className="w-win-bar">
                    <span>{c.t.kick.about}</span>
                    <b>{c.name}</b>
                  </div>
                  <figure>
                    <Pic p={p} sizes="(min-width: 1000px) 46vw, 100vw" />
                  </figure>
                </div>
              </div>
            ) : card ? (
              <div className="w-card w-core w-about-card" data-rv>
                <p className="w-core-mark">
                  <i className="w-ini" aria-hidden="true">
                    {c.name.charAt(0).toUpperCase()}
                  </i>
                  {c.name}
                </p>
                {c.spec.business.city ? (
                  <p className="w-core-st">
                    <i aria-hidden="true" /> {c.spec.business.city}
                  </p>
                ) : null}
                <ul>
                  {s.highlights.map((h, k) => (
                    <li key={h} style={i(k)}>
                      <Check aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c) => {
      const pic = c.spare();
      const tagline = c.spec.business.tagline;
      const total = s.items.length + (pic ? 1 : 0);
      const spans = SPANS[total] ?? Array.from({ length: total }, () => 4);
      const at = pic ? Math.min(3, s.items.length) : -1;
      const sp = (k: number) => spans[at >= 0 && k >= at ? k + 1 : k];
      const cards: ReactNode[] = s.items.map((it, k) => (
        <div key={k} className="w-card w-spot w-f" data-rv style={css({ "--i": k % 3, "--sp": sp(k) })}>
          <div className="w-f-ui w-f-ico" aria-hidden="true">
            <i>
              <Icon name={it.icon} />
            </i>
            <small>{nr(k + 1)}</small>
          </div>
          <h3>{it.title}</h3>
          <p>{it.description}</p>
        </div>
      ));
      if (pic) {
        cards.splice(
          at,
          0,
          <figure key="pic" className="w-f w-f4" data-rv style={css({ "--i": 1, "--sp": spans[at] })}>
            <Pic p={pic} sizes="(min-width: 1000px) 34vw, 100vw" />
            {tagline ? (
              <figcaption>
                <b>{tagline}</b>
              </figcaption>
            ) : null}
          </figure>,
        );
      }
      return (
        <section className="w-sec w-features" id={s.id}>
          <div className="w-aura w-aura-l" data-px aria-hidden="true" />
          <div className="w-wrap">
            <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
            <div className="w-bento">{cards}</div>
          </div>
        </section>
      );
    },
    services: (s, c) => {
      const pics = s.items.map((_, n) => c.photo(`art:svc${n}`));
      const cta = c.spec.hero.primaryCta;
      if (s.items.length >= 2 && s.items.length <= 6 && pics.every(Boolean)) {
        const tab = (n: number) => `${s.id}-tab-${n}`;
        const pane = (n: number) => `${s.id}-pane-${n}`;
        return (
          <section className="w-sec w-product" id={s.id}>
            <div className="w-wrap">
              <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
              <div className="w-demo" data-rv>
                <div className="w-tabs" role="tablist" aria-label={plain(s.title)}>
                  {s.items.map((it, n) => (
                    <button key={n} type="button" role="tab" id={tab(n)} aria-selected={n === 0} aria-controls={pane(n)} tabIndex={n === 0 ? 0 : -1}>
                      <Icon name={it.icon} />
                      <span>{it.title}</span>
                    </button>
                  ))}
                </div>
                {s.items.map((it, n) => {
                  const meta = [it.price, it.duration].filter((x): x is string => Boolean(x));
                  return (
                    <div key={n} role="tabpanel" id={pane(n)} aria-labelledby={tab(n)} hidden={n > 0} tabIndex={0} className="w-pane">
                      <div className="w-pane-in">
                        <div className="w-pane-copy">
                          <h3>{it.title}</h3>
                          <p>{it.description}</p>
                          {meta.length > 0 && (
                            <ul className="w-ticks">
                              {meta.map((m) => (
                                <li key={m}>
                                  <Check aria-hidden="true" />
                                  {m}
                                </li>
                              ))}
                            </ul>
                          )}
                          <Btn c={c} href={cta.href} variant="alt">
                            {cta.label}
                          </Btn>
                        </div>
                        <div className="w-card w-win w-win-pic">
                          <div className="w-win-bar">
                            <span>{c.t.kick.services}</span>
                            <b>{it.title}</b>
                            <em data-lime="">{nr(n + 1)}</em>
                          </div>
                          <figure>
                            <Pic p={pics[n] as Photo} sizes="(min-width: 1000px) 56vw, 100vw" />
                          </figure>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      }
      const half = Math.ceil(s.items.length / 2);
      const card = (n: number) => {
        const it = s.items[n];
        const p = pics[n];
        return (
          <li key={n} data-rv style={i(n % half)}>
            <i aria-hidden="true" className={p ? "has-pic" : undefined}>
              {p ? <Pic p={p} sizes="46px" /> : <Icon name={it.icon} />}
            </i>
            <small>{it.price || it.duration || nr(n + 1)}</small>
            <h3>{it.title}</h3>
            <p>{it.description}</p>
          </li>
        );
      };
      const a = s.items.slice(0, half).map((_, n) => card(n));
      const bSide = s.items.slice(half).map((_, n) => card(half + n));
      return (
        <section className="w-sec w-links-sec" id={s.id}>
          <div className="w-aura w-aura-c" data-px aria-hidden="true" />
          <div className="w-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
            <div className={`w-hub${bSide.length ? "" : " is-one"}`}>
              <ul className="w-hub-side w-hub-a">{a}</ul>
              <div className="w-card w-core" data-rv>
                <p className="w-core-mark">
                  <i className="w-ini" aria-hidden="true">
                    {c.name.charAt(0).toUpperCase()}
                  </i>
                  {c.name}
                </p>
                {c.spec.business.tagline ? (
                  <p className="w-core-st">
                    <i aria-hidden="true" /> {c.spec.business.tagline}
                  </p>
                ) : null}
                <Btn c={c} href={cta.href}>
                  {cta.label}
                  <ArrowRight aria-hidden="true" />
                </Btn>
              </div>
              {bSide.length > 0 && <ul className="w-hub-side w-hub-b">{bSide}</ul>}
            </div>
          </div>
        </section>
      );
    },
    process: (s, c) => (
      <section className="w-sec w-flow" id={s.id}>
        <div className="w-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <ol className="w-flow-list" data-n={s.steps.length}>
            {s.steps.map((st, n) => (
              <li key={n} className="w-card" data-rv style={i(n % 4)}>
                <span className="w-flow-bar" aria-hidden="true" style={css({ "--f": (n + 1) / s.steps.length })} />
                <span className="w-flow-no">{nr(n + 1)}</span>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    packages: (s, c) => {
      const cta = c.spec.hero.primaryCta;
      const top = s.items.some((x) => x.featured);
      return (
        <section className="w-sec w-prices" id={s.id}>
          <div className="w-aura w-aura-r" data-px aria-hidden="true" />
          <div className="w-wrap">
            <Head kicker={c.t.kick.packages} title={s.title} intro={s.intro} />
            <div className={`w-plans${top ? " has-top" : ""}`} data-n={s.items.length}>
              {s.items.map((it, k) => (
                <div key={k} className={`w-card w-spot w-plan${it.featured ? " is-top" : ""}`} data-rv style={i(k)}>
                  {it.featured ? <p className="w-plan-flag">{c.t.popular}</p> : null}
                  <h3>{it.name}</h3>
                  {it.description ? <p className="w-plan-who">{it.description}</p> : null}
                  <div className="w-plan-price">
                    {it.price ? (
                      <p className="w-plan-sum">
                        <b className={it.price.length > 8 ? "is-long" : undefined}>{it.price}</b>
                        {it.unit ? <small>{it.unit}</small> : null}
                      </p>
                    ) : (
                      <p className="w-plan-ask">{c.t.onRequest}</p>
                    )}
                  </div>
                  <Btn c={c} href={cta.href} variant={it.featured ? "fill" : "alt"}>
                    {cta.label}
                  </Btn>
                  {it.features.length > 0 && (
                    <ul>
                      {it.features.map((f) => (
                        <li key={f}>
                          <Check aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            {s.note ? (
              <p className="w-price-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    team: (s, c) => (
      <section className="w-sec w-team-sec" id={s.id}>
        <div className="w-wrap">
          <Head kicker={c.t.kick.team} title={s.title} intro={s.intro} />
          <ul className="w-team" data-n={s.members.length}>
            {s.members.map((m, n) => {
              const p = c.photo(m.image);
              return (
                <li key={n} className="w-card w-spot" data-rv style={i(n % 3)}>
                  {p ? (
                    <figure className="w-team-pic">
                      <Pic p={p} sizes="(min-width: 1000px) 25vw, (min-width: 600px) 45vw, 100vw" />
                    </figure>
                  ) : (
                    <i className="w-team-ini" aria-hidden="true">
                      {m.name.charAt(0).toUpperCase()}
                    </i>
                  )}
                  <div className="w-team-txt">
                    <h3>{m.name}</h3>
                    <p className="w-team-role">{m.role}</p>
                    {m.bio ? <p>{m.bio}</p> : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    testimonials: (s, c) => {
      const [first, ...rest] = s.items;
      const pic = c.spare();
      return (
        <section className="w-sec w-voices" id={s.id}>
          <div className="w-wrap">
            <Head kicker={c.t.kick.testimonials} title={s.title} />
            <div className={`w-voice-grid${rest.length ? "" : " is-solo"}`}>
              <figure className={`w-voice-lead${pic ? "" : " no-pic"}`} data-rv>
                {pic ? (
                  <div className="w-voice-pic">
                    <Pic p={pic} sizes="(min-width: 1000px) 48vw, 100vw" />
                  </div>
                ) : null}
                <blockquote>
                  <p>{first.quote}</p>
                  <footer>
                    <b>{first.author}</b>
                    <a href={first.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {c.t.source}: {first.source}
                    </a>
                  </footer>
                </blockquote>
              </figure>
              {rest.length > 0 && (
                <div className="w-voice-list" data-n={rest.length}>
                  {rest.map((q, n) => (
                    <blockquote key={n} className="w-card" data-rv style={i(n % 2)}>
                      <p>{q.quote}</p>
                      <footer>
                        <i aria-hidden="true">{q.author.charAt(0).toUpperCase()}</i>
                        <b>{q.author}</b>
                        <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
                          {c.t.source}: {q.source}
                        </a>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      );
    },
    faq: (s, c) => {
      const b = c.spec.business;
      return (
        <section className="w-sec w-faq-sec" id={s.id}>
          <div className="w-wrap w-faq-grid">
            <div className="w-faq-side">
              <Head kicker={c.t.kick.faq} title={s.title} />
              {b.phone || b.email ? (
                <p className="w-faq-contact" data-rv>
                  {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
                  {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
                </p>
              ) : null}
            </div>
            <div className="w-faq" data-acc>
              {s.items.map((f, n) => (
                <details key={n} className="w-faq-item" data-rv style={i(Math.min(n, 5))} open={n === 0}>
                  <summary>
                    <small>{nr(n + 1)}</small>
                    <span>{f.q}</span>
                    <ChevronDown aria-hidden="true" />
                  </summary>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      );
    },
    cta: (s, c) => {
      const pic = c.spare();
      const b = c.spec.business;
      const reach = Boolean(b.phone || b.email || b.address);
      return (
        <section className="w-trial" id={s.id}>
          <div className="w-wrap">
            <div className={`w-trial-box${pic ? "" : " no-pic"}${reach ? "" : " is-solo"}`}>
              {pic ? (
                <div className="w-trial-bg" aria-hidden="true" data-px>
                  <Pic p={pic} sizes="100vw" />
                </div>
              ) : null}
              <div className="w-trial-copy">
                <h2 className={long(s.title)} data-rv>
                  {em(s.title)}
                </h2>
                {s.body ? <p data-rv>{s.body}</p> : null}
                <div className="w-hero-cta" data-rv>
                  <Btn c={c} href={s.cta.href}>
                    {s.cta.label}
                    <ArrowRight aria-hidden="true" />
                  </Btn>
                </div>
              </div>
              {reach ? (
                <div className="w-trial-card" data-rv>
                  <h3>{c.t.contact}</h3>
                  <Reach c={c} />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    booking: (s, c) => {
      const pic = c.spare();
      const hours = c.spec.business.openingHours;
      return (
        <section className="w-trial" id={s.id}>
          <div className="w-wrap">
            <div className={`w-trial-box${pic ? "" : " no-pic"}`}>
              {pic ? (
                <div className="w-trial-bg" aria-hidden="true" data-px>
                  <Pic p={pic} sizes="100vw" />
                </div>
              ) : null}
              <div className="w-trial-copy">
                <Kicker>{c.t.kick.booking}</Kicker>
                <h2 className={long(s.title)} data-rv>
                  {em(s.title)}
                </h2>
                {s.body ? <p data-rv>{s.body}</p> : null}
                {hours?.length ? (
                  <ol className="w-trial-steps" data-rv aria-label={c.t.hours}>
                    {hoursRows(hours)
                      .slice(0, 7)
                      .map(([day, time], n) => (
                        <li key={n}>
                          <b>{day}</b>
                          {time}
                        </li>
                      ))}
                  </ol>
                ) : null}
              </div>
              <div className="w-trial-card" data-rv>
                <h3>{c.t.submit[s.kind]}</h3>
                <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />
              </div>
            </div>
          </div>
        </section>
      );
    },
    contact: (s, c) => {
      const b = c.spec.business;
      const hours = !c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? b.openingHours : null;
      const any = b.phone || b.email || b.address || hours?.length;
      return (
        <section className="w-sec w-contact" id={s.id}>
          <div className="w-aura w-aura-l" data-px aria-hidden="true" />
          <div className="w-wrap">
            <Head kicker={c.t.kick.contact} title={s.title} intro={s.body} />
            <div className={`w-contact-grid${s.showForm ? "" : " no-form"}`}>
              {any ? (
                <ul className="w-hub-side">
                  {b.phone ? (
                    <li data-rv style={i(0)}>
                      <i aria-hidden="true">
                        <Phone />
                      </i>
                      <small>{c.t.phone}</small>
                      <h3>
                        <a href={tel(b.phone)}>{b.phone}</a>
                      </h3>
                    </li>
                  ) : null}
                  {b.email ? (
                    <li data-rv style={i(1)}>
                      <i aria-hidden="true">
                        <Mail />
                      </i>
                      <small>{c.t.email}</small>
                      <h3>
                        <a href={`mailto:${b.email}`}>{b.email}</a>
                      </h3>
                    </li>
                  ) : null}
                  {b.address ? (
                    <li data-rv style={i(2)}>
                      <i aria-hidden="true">
                        <MapPin />
                      </i>
                      <small>{c.t.address}</small>
                      <h3>{b.address}</h3>
                      {b.mapsUrl ? (
                        <p>
                          <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                            {c.t.route} →
                          </a>
                        </p>
                      ) : null}
                    </li>
                  ) : null}
                  {hours?.length ? (
                    <li data-rv style={i(3)}>
                      <i aria-hidden="true">
                        <Clock />
                      </i>
                      <small>{c.t.hours}</small>
                      <div className="w-hours-list">
                        {hours.slice(0, 7).map((l) => (
                          <span key={l}>{l}</span>
                        ))}
                      </div>
                    </li>
                  ) : null}
                </ul>
              ) : null}
              {s.showForm ? (
                <div className="w-trial-card" data-rv>
                  <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    statement: (s) => {
      const n = plain(s.title).length;
      return (
        <section className="w-sec w-state" id={s.id}>
          <div className="w-aura w-aura-c" data-px aria-hidden="true" />
          <div className="w-wrap w-state-in">
            {s.note ? (
              <p className="w-chip" data-rv>
                <i aria-hidden="true" />
                {s.note}
              </p>
            ) : null}
            <h2 className={n > 140 ? "w-state-s" : n > 70 ? "w-state-m" : undefined} data-rv>
              {em(s.title)}
            </h2>
          </div>
        </section>
      );
    },
    showcase: (s, c) => {
      const p = c.photo(s.image);
      return (
        <section className="w-sec w-show-sec" id={s.id}>
          <div className="w-wrap">
            <figure className={`w-f4 w-show${p ? "" : " no-pic"}`} data-rv>
              {p ? <Pic p={p} sizes="(min-width: 1320px) 1240px, 100vw" /> : null}
              <figcaption>
                <h2 className={long(s.title)}>{em(s.title)}</h2>
                {s.body ? <p>{s.body}</p> : null}
                {s.cta ? (
                  <Btn c={c} href={s.cta.href} variant="alt">
                    {s.cta.label}
                  </Btn>
                ) : null}
              </figcaption>
            </figure>
          </div>
        </section>
      );
    },
  },
};
