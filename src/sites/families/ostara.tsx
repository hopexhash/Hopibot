import { Fragment, type ReactNode } from "react";
import type { SiteSection, SiteSpec } from "@/lib/site-spec";
import { CSS } from "./css/hotel";
import { Btn, css, DemoForm, em, heroFacts, hoursRows, i, Icon, Legal, long, Pic, tel, type Ctx, type Family, type HeadProps, type Photo } from "./kit";

/**
 * Ostara (demo: /demos/hotel). Linen, terracotta and Roman capitals: a brochure set like a
 * letterhead, with centred chapter openings, framed plates and slow reveals. Made for hotels,
 * B&Bs, coffee shops, lunchrooms, bakeries and patisseries.
 */

const EXTRA = `
.d-ostara{--t-display:"Marcellus";--t-text:"Mulish";--z-bg2:var(--linen);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--terra);--z-on-accent:var(--cream);--z-display:var(--t-display),"Times New Roman",serif;--z-sec:var(--sec);--z-h3:clamp(17px,1.4vw,21px);--z-radius:0}
.d-ostara h2{overflow-wrap:break-word}
.d-ostara h2 em,.d-ostara h1 em{font-style:normal;color:var(--terra)}
.d-ostara h2.is-long{font-size:clamp(22px,2.7vw,40px)}
.d-ostara .t-btn{isolation:isolate;cursor:pointer}
.d-ostara .t-btn::before{z-index:-1}
.d-ostara .t-btn-line{background:none;color:inherit;box-shadow:inset 0 0 0 1px currentColor}
.d-ostara .t-btn-line::before{background:var(--terra)}
.d-ostara .t-btn-line:hover{color:var(--cream);box-shadow:none}
.d-ostara .t-link{display:inline-flex;align-items:center;min-height:44px;font-size:11.5px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;text-decoration:underline;text-underline-offset:7px;text-decoration-thickness:1px}
.d-ostara .t-logo{min-width:0}
.d-ostara .t-logo span{max-width:min(52vw,380px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-ostara .t-logo.is-long{font-size:13px;letter-spacing:.24em}
.d-ostara .t-logo.is-long span{padding-left:.24em}
.d-ostara.menu-open .t-nav{color:var(--ink)}
.d-ostara.menu-open .t-nav::before{opacity:0}
.d-ostara .t-nav-cta{max-width:28vw;overflow:hidden;text-overflow:ellipsis}
@media (max-width:479px){.d-ostara .t-nav-cta{display:none}}
@media (min-width:1180px){.d-ostara .t-nav-cta{max-width:260px}}
.d-ostara .t-menu nav a{padding:6px 0;line-height:1.3}
.d-ostara .t-menu p a{display:inline-flex;align-items:center;min-height:44px}
.d-ostara .t-open h1.t-open-h{display:block;max-width:min(100%,19em);padding-left:var(--ls);font-size:min(var(--fs),calc(80vw / var(--w)));letter-spacing:var(--ls);line-height:1.1;text-wrap:balance}
.d-ostara .t-open-h span{display:inline-block;animation:t-letter 2s var(--ease) both;animation-delay:calc(.4s + var(--i) * 110ms)}
.d-ostara .t-open-h em{color:var(--terra-l)}
.d-ostara .t-open-h.is-xl{--fs:clamp(46px,11vw,170px);--ls:.2em}
.d-ostara .t-open-h.is-l{--fs:clamp(38px,6.6vw,108px);--ls:.12em}
.d-ostara .t-open-h.is-m{--fs:clamp(30px,4.6vw,74px);--ls:.08em}
.d-ostara .t-open-h.is-s{--fs:clamp(26px,3.5vw,56px);--ls:.06em}
.d-ostara .t-open-cta,.d-ostara .t-open-more{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 16px;margin-top:clamp(22px,2.6vw,34px);animation:t-rise 1.8s var(--ease) 1.4s both}
.d-ostara .t-open-cta .t-btn::before{background:var(--cream)}
.d-ostara .t-open-cta .t-btn:hover{color:var(--ink)}
.d-ostara .t-open.no-pic{background:radial-gradient(70% 52% at 50% 104%,rgba(154,74,48,.55),transparent 72%),radial-gradient(120% 80% at 50% -10%,rgba(74,60,50,.7),transparent 70%),var(--night)}
.d-ostara .t-open-mark{position:absolute;left:50%;bottom:-3%;width:min(170vw,1300px);height:auto;color:rgba(241,233,220,.14);transform:translateX(-50%);pointer-events:none;animation:t-fade 3s var(--ease) .2s both}
.d-ostara .t-open-mark path{vector-effect:non-scaling-stroke}
.d-ostara .t-facts-bar .t-bar-f{border-left:0}
.d-ostara .t-facts-bar[data-n="1"] .t-bar-f,.d-ostara .t-facts-bar[data-n="3"] .t-bar-f:first-child{grid-column:1/-1}
.d-ostara .t-facts-bar[data-n="2"] .t-bar-f:nth-child(2),.d-ostara .t-facts-bar[data-n="3"] .t-bar-f:nth-child(3){border-left:1px solid var(--line)}
.d-ostara .t-bar-f strong{display:flex;align-items:center;min-height:40px;font-size:15px;font-weight:400;line-height:1.4;overflow-wrap:anywhere}
.d-ostara .t-bar-f strong a{display:inline-flex;align-items:center;min-height:40px}
@media (min-width:980px){.d-ostara .t-facts-bar{grid-template-columns:repeat(var(--n),minmax(0,1fr)) auto}.d-ostara .t-facts-bar .t-bar-f{grid-column:auto}.d-ostara .t-facts-bar .t-bar-f + .t-bar-f{border-left:1px solid var(--line)}}
.d-ostara .t-sec{position:relative;padding:var(--sec) 0}
.d-ostara .t-cream{--bg:var(--cream);--card:var(--linen);background:var(--bg)}
.d-ostara .t-linen{--bg:var(--linen);--card:var(--cream);--sheet:#dccfbb;background:var(--bg)}
.d-ostara .t-ink{--bg:var(--ink);--card:var(--cream);--sheet:#3a322c;--line:rgba(241,233,220,.2);--dim:rgba(241,233,220,.74);background:var(--bg);color:var(--cream)}
.d-ostara .t-ink .t-eyebrow,.d-ostara .t-ink h2 em,.d-ostara .t-ink .t-well-cols b,.d-ostara .t-ink .t-facts b,.d-ostara .t-ink .t-card b,.d-ostara .t-ink .t-day b,.d-ostara .t-ink .t-tags,.d-ostara .t-ink .t-quote svg{color:var(--terra-l)}
.d-ostara .t-ink .t-btn::before{background:var(--cream)}
.d-ostara .t-ink .t-btn:hover{color:var(--ink)}
.d-ostara .t-book-sheet,.d-ostara .t-pack{--dim:#6a5d52;--line:rgba(42,36,32,.2);color:var(--ink)}
.d-ostara .t-ink .t-book-sheet .t-btn::before{background:var(--ink)}
.d-ostara .t-ink .t-book-sheet .t-btn:hover{color:var(--cream)}
.d-ostara .t-sec:not(.t-ink) .t-book-sheet::before{border-color:var(--line)}
.d-ostara .t-rule{justify-content:center}
.d-ostara .t-house-grid[data-cols="1"]{max-width:760px;margin-inline:auto}
.d-ostara .t-house-grid[data-cols="1"] .t-house-c img{aspect-ratio:3/2}
@media (min-width:960px){.d-ostara .t-house-grid[data-cols="2"]{grid-template-columns:minmax(0,1fr) minmax(0,1.08fr)}.d-ostara .t-house-grid[data-cols="1"]{grid-template-columns:minmax(0,1fr)}.d-ostara .t-house-grid[data-cols="2"] .t-house-c img{aspect-ratio:4/5}.d-ostara .t-house-grid[data-cols="1"] .t-house-c img{aspect-ratio:3/2}}
@media (min-width:760px){.d-ostara .t-facts{grid-template-columns:repeat(var(--n),minmax(0,1fr))}}
.d-ostara .t-facts[data-n="1"]{max-width:520px;margin-inline:auto}
.d-ostara .t-rooms-row[data-n="1"]{justify-content:center}
.d-ostara .t-room-role{margin-top:6px;font-size:10.5px;font-weight:600;letter-spacing:.24em;line-height:1.5;text-transform:uppercase;color:var(--terra)}
.d-ostara .t-room-facts{max-width:34ch;line-height:1.55}
@media (min-width:1100px){.d-ostara .t-rooms-row{grid-template-columns:repeat(var(--c,5),minmax(0,1fr))}.d-ostara .t-rooms-row:not([data-n="5"]) .t-room{margin-top:0}.d-ostara .t-rooms-row[data-n="3"] .t-room:nth-child(odd),.d-ostara .t-rooms-row[data-n="4"] .t-room:nth-child(1),.d-ostara .t-rooms-row[data-n="4"] .t-room:nth-child(4){margin-top:48px}.d-ostara .t-rooms-row[data-n="1"]{max-width:380px;margin-inline:auto}.d-ostara .t-rooms-row[data-n="2"]{max-width:820px;margin-inline:auto}.d-ostara .t-rooms-row[data-n="6"]{row-gap:56px}.d-ostara .t-rooms-row[data-n="3"] .t-room-img,.d-ostara .t-rooms-row[data-n="6"] .t-room-img{aspect-ratio:4/5}}
.d-ostara .t-well-cols .t-role{max-width:none;margin:-4px 0 10px;font-size:10.5px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--terra)}
@media (min-width:860px){.d-ostara .t-well-cols[data-c="1"]{grid-template-columns:minmax(0,640px);justify-content:center}.d-ostara .t-well-cols[data-c="2"]{grid-template-columns:repeat(2,minmax(0,1fr))}.d-ostara .t-well-cols[data-c="2"] li:nth-child(2n+1),.d-ostara .t-well-cols[data-c="3"] li:nth-child(3n+1){border-left:0}.d-ostara .t-well-cols[data-c="2"] li:nth-child(n+3),.d-ostara .t-well-cols[data-c="3"] li:nth-child(n+4){border-top:1px solid var(--line)}}
.d-ostara .t-eat-lists[data-n="1"]{max-width:760px;margin-inline:auto}
@media (min-width:900px){.d-ostara .t-eat-lists[data-n="1"]{grid-template-columns:minmax(0,1fr)}}
.d-ostara .t-eat-lists{row-gap:clamp(48px,5vw,80px);margin-top:clamp(44px,6vw,96px)}
.d-ostara .t-sub{border-bottom-color:currentColor}
.d-ostara .t-day span,.d-ostara .t-card span{color:var(--dim)}
.d-ostara .t-day b,.d-ostara .t-card b{color:var(--terra)}
.d-ostara .t-card i{border-bottom-color:currentColor;opacity:.35}
.d-ostara .t-card li.no-p div{max-width:none}
.d-ostara .t-tags{display:block;margin-top:4px;font-size:10.5px;font-style:normal;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--terra)}
.d-ostara .t-eat-strip[data-n="1"]{grid-template-columns:minmax(0,1fr)}
.d-ostara .t-eat-strip[data-n="2"] figure{grid-column:1/-1}
.d-ostara .t-eat-strip[data-n="1"] figure img,.d-ostara .t-eat-strip[data-n="2"] figure img{aspect-ratio:3/2}
@media (min-width:900px){.d-ostara .t-eat-strip[data-n="2"]{grid-template-columns:1fr 1fr}.d-ostara .t-eat-strip[data-n="2"] figure{grid-column:auto}.d-ostara .t-eat-strip[data-n="1"] figure img{aspect-ratio:21/9}}
.d-ostara .t-proc{max-width:820px;margin:clamp(40px,5vw,80px) auto 0;border-top:1px solid currentColor}
.d-ostara .t-proc strong{font-family:var(--t-display),serif;font-weight:400;letter-spacing:.12em;text-transform:uppercase}
.d-ostara .t-gal li{grid-template:minmax(0,1fr)/minmax(0,1fr);overflow:hidden;background:#d5c7b2}
.d-ostara .t-gal li img{grid-area:1/1;min-height:0}
.d-ostara .t-gal li:hover img{transform:scale(1.06)}
@media (max-width:899px){.d-ostara .t-gal li[class^="q"]{grid-row:span 2}.d-ostara .t-gal li.q1{grid-column:1/-1;grid-row:span 3}.d-ostara .t-gal[data-n="2"] li:last-child,.d-ostara .t-gal[data-n="4"] li:last-child,.d-ostara .t-gal[data-n="6"] li:last-child{grid-column:1/-1;grid-row:span 3}.d-ostara .t-gal .g9{grid-area:17/1/20/3}}
@media (min-width:900px){.d-ostara .t-gal[data-n="1"] .q1{grid-area:1/1/7/13}.d-ostara .t-gal[data-n="2"] .q1{grid-area:1/1/6/8}.d-ostara .t-gal[data-n="2"] .q2{grid-area:1/8/6/13}.d-ostara .t-gal[data-n="3"] .q1{grid-area:1/1/7/8}.d-ostara .t-gal[data-n="3"] .q2{grid-area:1/8/4/13}.d-ostara .t-gal[data-n="3"] .q3{grid-area:4/8/7/13}.d-ostara .t-gal[data-n="4"] .q1{grid-area:1/1/5/8}.d-ostara .t-gal[data-n="4"] .q2{grid-area:1/8/5/13}.d-ostara .t-gal[data-n="4"] .q3{grid-area:5/1/9/6}.d-ostara .t-gal[data-n="4"] .q4{grid-area:5/6/9/13}.d-ostara .t-gal[data-n="5"] .q1{grid-area:1/1/6/8}.d-ostara .t-gal[data-n="5"] .q2{grid-area:1/8/6/13}.d-ostara .t-gal[data-n="5"] .q3{grid-area:6/1/9/5}.d-ostara .t-gal[data-n="5"] .q4{grid-area:6/5/9/9}.d-ostara .t-gal[data-n="5"] .q5{grid-area:6/9/9/13}.d-ostara .t-gal[data-n="6"] .q1,.d-ostara .t-gal[data-n="7"] .q1{grid-area:1/1/5/7}.d-ostara .t-gal[data-n="6"] .q2,.d-ostara .t-gal[data-n="7"] .q2{grid-area:1/7/7/10}.d-ostara .t-gal[data-n="6"] .q3,.d-ostara .t-gal[data-n="7"] .q3{grid-area:1/10/4/13}.d-ostara .t-gal[data-n="6"] .q4,.d-ostara .t-gal[data-n="7"] .q4{grid-area:4/10/7/13}.d-ostara .t-gal[data-n="6"] .q5,.d-ostara .t-gal[data-n="7"] .q5{grid-area:5/1/7/4}.d-ostara .t-gal[data-n="6"] .q6,.d-ostara .t-gal[data-n="7"] .q6{grid-area:5/4/7/7}.d-ostara .t-gal[data-n="7"] .q7{grid-area:7/1/11/13}.d-ostara .t-gal .g9{grid-area:10/1/14/13}}
.d-ostara .t-quotes-grid{display:grid;gap:clamp(56px,6vw,90px) clamp(40px,6vw,110px);margin-top:clamp(40px,5vw,80px)}
.d-ostara .t-quotes-grid .t-quote{margin-top:0}
.d-ostara .t-quote footer a{display:inline-flex;align-items:center;min-height:44px;text-decoration:underline;text-underline-offset:4px}
@media (min-width:900px){.d-ostara .t-quotes-grid:not([data-n="1"]){grid-template-columns:repeat(2,minmax(0,1fr))}.d-ostara .t-quotes-grid:not([data-n="1"]) .t-quote p{font-size:clamp(19px,1.8vw,27px)}}
.d-ostara .t-state .t-quote{margin-top:0}
.d-ostara .t-state h2{max-width:30ch;font-size:clamp(23px,3vw,44px);line-height:1.38;letter-spacing:.02em;text-transform:none}
.d-ostara .t-bookgrid{display:grid;gap:34px}
.d-ostara .t-bookgrid.is-solo{max-width:760px;margin-inline:auto}
@media (min-width:980px){.d-ostara .t-bookgrid:not(.is-solo){grid-template-columns:minmax(0,1.3fr) minmax(0,.8fr);gap:clamp(36px,5vw,80px);align-items:start}.d-ostara .t-bookgrid .t-bill{position:sticky;top:86px}}
.d-ostara .t-bill h3{max-width:100%;text-align:center;overflow-wrap:anywhere}
.d-ostara .t-bill dt{flex:none}
.d-ostara .t-bill dd{min-width:0;overflow-wrap:anywhere}
.d-ostara .t-bill dd a{display:inline-flex;align-items:center;min-height:32px}
.d-ostara .t-bill-lines li span{min-width:0}
.d-ostara .z-form{gap:24px}
.d-ostara .z-fields{gap:22px 18px}
.d-ostara .z-field{gap:2px}
.d-ostara .z-field label,.d-ostara .z-chipset legend{font-size:10.5px;font-weight:600;letter-spacing:.24em;color:var(--terra)}
.d-ostara .z-field input,.d-ostara .z-field select,.d-ostara .z-field textarea{min-height:48px;padding:6px 0;border-width:0 0 1px;border-color:rgba(42,36,32,.45);color:var(--ink);font-size:16px;color-scheme:light}
.d-ostara .z-field select{padding-right:22px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%239a4a30' stroke-width='1.2'/%3E%3C/svg%3E") no-repeat right 4px center}
.d-ostara .z-field textarea{min-height:96px}
.d-ostara .z-field :focus-visible{outline:0;border-color:var(--terra);box-shadow:0 1px 0 var(--terra)}
.d-ostara .form-note{font-size:12.5px;line-height:1.5;color:var(--dim)}
.d-ostara .form-status{border-color:var(--terra);background:var(--linen);color:var(--ink)}
.d-ostara .t-comp .t-book-sheet{width:auto;margin:0}
.d-ostara .t-comp.is-solo{grid-template-columns:minmax(0,1fr);max-width:760px}
.d-ostara .t-rows{border-top:1px solid currentColor}
.d-ostara .t-rows li{display:flex;align-items:baseline;gap:12px;min-height:54px;padding:15px 0 13px;border-bottom:1px solid var(--line)}
.d-ostara .t-rows li>span{flex:none;max-width:56%;font-family:var(--t-display),serif;font-size:clamp(14px,1.2vw,17px);letter-spacing:.12em;line-height:1.35;text-transform:uppercase}
.d-ostara .t-rows i{flex:1;min-width:12px;border-bottom:1px dotted;opacity:.4}
.d-ostara .t-rows em{min-width:0;font-size:14.5px;font-style:normal;line-height:1.45;text-align:right;color:var(--dim);overflow-wrap:anywhere}
.d-ostara .t-rows em a{color:var(--ink)}
.d-ostara .t-rows-note{margin-top:22px;color:var(--dim)}
.d-ostara .t-visit{display:grid;gap:4px;justify-items:start;align-content:start}
.d-ostara .t-visit .t-dlg-line{margin:8px 0 10px}
.d-ostara .t-visit a{display:inline-flex;align-items:center;min-height:40px}
.d-ostara .t-visit p:not([class]){color:var(--dim)}
.d-ostara .t-sec.has-wide{padding-bottom:0}
.d-ostara .t-show.has-pic{padding-top:0}
.d-ostara .t-show .t-well-card{background:var(--bg)}
.d-ostara .t-show:not(.has-pic) .t-well-card{margin-top:0;padding-top:0}
.d-ostara .t-show .t-head .t-btn,.d-ostara .t-show .t-head .t-link{margin-top:30px}
.d-ostara .t-end{overflow:hidden;text-align:center}
.d-ostara .t-end.has-pic{display:grid;align-items:center;min-height:min(86svh,780px);background:var(--night);color:var(--cream);--dim:rgba(241,233,220,.82)}
.d-ostara .t-end-media{position:absolute;inset:-10% 0}
.d-ostara .t-end-media img{width:100%;height:100%;object-fit:cover;transform:translateY(calc(var(--p,0) * -5%))}
.d-ostara .t-end-media::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(31,26,23,.6),rgba(31,26,23,.42) 45%,rgba(31,26,23,.78))}
.d-ostara .t-end-in{position:relative;z-index:1;display:grid;justify-items:center}
.d-ostara .t-end-in>svg{width:clamp(46px,4.4vw,64px);height:auto;color:var(--terra)}
.d-ostara .t-end.has-pic .t-end-in>svg,.d-ostara .t-end.t-ink .t-end-in>svg,.d-ostara .t-end.has-pic h2 em{color:var(--terra-l)}
.d-ostara .t-end h2{max-width:20em;margin-top:22px;font-size:clamp(27px,4.4vw,68px)}
.d-ostara .t-end .t-btn{margin-top:clamp(28px,3vw,44px)}
.d-ostara .t-end.has-pic .t-btn::before{background:var(--cream)}
.d-ostara .t-end.has-pic .t-btn:hover{color:var(--ink)}
.d-ostara .t-pack-grid{display:grid;gap:clamp(16px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));margin-top:clamp(40px,5vw,80px)}
.d-ostara .t-pack-grid[data-n="1"]{max-width:480px;margin-inline:auto}
.d-ostara .t-pack{align-content:start;background:var(--card)}
.d-ostara .t-pack.is-featured{box-shadow:inset 0 0 0 1px var(--terra)}
.d-ostara .t-pack .t-dlg-kicker{margin-bottom:-4px}
.d-ostara .t-pack .t-bill-total{margin:0 0 16px}
.d-ostara .t-pack .t-bill-total b.is-req{font-size:clamp(22px,2vw,28px)}
.d-ostara .t-pack-desc{width:100%;margin-bottom:14px;font-size:15px;color:var(--dim)}
.d-ostara .t-pack .t-dlg-incl{justify-self:stretch}
.d-ostara .t-acc{max-width:920px;margin:clamp(40px,5vw,80px) auto 0;border-top:1px solid currentColor}
.d-ostara .t-acc details{border-bottom:1px solid var(--line)}
.d-ostara .t-acc summary{display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:64px;padding:16px 0;font-family:var(--t-display),serif;font-size:clamp(15px,1.3vw,19px);letter-spacing:.1em;line-height:1.4;text-transform:uppercase;cursor:pointer;list-style:none}
.d-ostara .t-acc summary::-webkit-details-marker{display:none}
.d-ostara .t-acc summary i{position:relative;flex:none;width:14px;height:14px;color:var(--terra)}
.d-ostara .t-acc summary i::before,.d-ostara .t-acc summary i::after{content:"";position:absolute;left:0;top:50%;width:100%;height:1px;background:currentColor;transition:transform .5s var(--ease)}
.d-ostara .t-acc summary i::after{transform:rotate(90deg)}
.d-ostara .t-acc details[open] summary i::after{transform:none}
.d-ostara .t-acc details p{max-width:66ch;padding:0 0 24px;color:var(--dim)}
.d-ostara .t-chans{max-width:920px;margin:clamp(40px,5vw,80px) auto 0;border-top:1px solid currentColor}
.d-ostara .t-chan{display:grid;grid-template-columns:44px minmax(0,1fr) auto;align-items:center;gap:0 16px;min-height:78px;padding:16px 0;border-bottom:1px solid var(--line);transition:color .3s}
.d-ostara .t-chan:hover{color:var(--terra)}
.d-ostara .t-chan b{font-family:var(--t-display),serif;font-size:16px;font-weight:400;letter-spacing:.2em;color:var(--terra)}
.d-ostara .t-chan strong{display:block;font-family:var(--t-display),serif;font-size:clamp(15px,1.3vw,19px);font-weight:400;letter-spacing:.12em;line-height:1.35;text-transform:uppercase}
.d-ostara .t-chan small{display:block;margin-top:2px;font-size:14px;line-height:1.5;color:var(--dim)}
.d-ostara .t-chan svg{width:22px;height:22px;color:var(--terra)}
.d-ostara .z-ba-sec{background:var(--cream)}
.d-ostara .z-ba-sec .z-head{justify-items:center;max-width:940px;margin-inline:auto;text-align:center}
.d-ostara .t-foot-mark p{max-width:100%;font-size:min(132px,9.4vw,calc(88vw / var(--n)));text-wrap:balance}
.d-ostara .t-foot-grid h3{font-family:var(--t-text),sans-serif}
.d-ostara .t-foot-blurb{grid-column:1/-1;max-width:34ch}
@media (min-width:900px){.d-ostara .t-foot-blurb{grid-column:auto}}
`
  .replace(/\n/g, "")
  .trim();

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const ext = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

/** The mark of the design: a sun coming up over the water. */
function Sun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 36" width="48" height="36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M14 22a10 10 0 0 1 20 0" />
      <path d="M35.7 15.3l3.9-2.3M30.8 10.3l2.2-3.9M24 8.5V4M17.2 10.3L15 6.4M12.3 15.3L8.4 13" />
      <path d="M5 22h38M11 27.5h26M17 33h14" />
    </svg>
  );
}

/** Whether an image reference is a real photograph (the same test the kit uses). */
const real = (c: Ctx, ref: string) => c.spec.images.some((im) => im.key === ref && im.license !== "generated" && /^https:\/\//.test(im.src));

/** Navigation without sections that render nothing (a gallery without photographs). */
function navOf(c: Ctx) {
  const empty = new Set(c.spec.sections.filter((s) => s.type === "gallery" && !s.images.some((r) => real(c, r))).map((s) => s.id));
  return c.nav.filter((n) => !empty.has(n.id));
}

/*
 * The demo alternates cream, linen and ink from chapter to chapter. Each section type has its
 * natural ground; when two neighbours would share one, the second moves to the next ground.
 */
type Tone = "cream" | "linen" | "ink";
const NATURAL: Record<SiteSection["type"], Tone> = {
  about: "cream", services: "linen", menu: "ink", features: "cream", process: "linen", gallery: "linen", testimonials: "cream", booking: "ink", hours: "cream",
  contact: "linen", cta: "ink", statement: "cream", showcase: "cream", packages: "linen", team: "cream", faq: "cream", order: "linen", beforeafter: "cream",
};
const toneCache = new WeakMap<SiteSpec, (Tone | null)[]>();
function toneAt(c: Ctx, n: number, type: SiteSection["type"]): Tone {
  let list = toneCache.get(c.spec);
  if (!list) {
    let prev: Tone = "ink";
    list = c.spec.sections.map((s) => {
      if (s.type === "gallery" && !s.images.some((r) => real(c, r))) return null;
      if (s.type === "beforeafter") {
        if (!s.pairs.some((p) => real(c, p.before) && real(c, p.after))) return null;
        prev = "cream";
        return "cream";
      }
      let t = NATURAL[s.type];
      if (t === prev) t = t === "linen" ? "cream" : "linen";
      prev = t;
      return t;
    });
    toneCache.set(c.spec, list);
  }
  return list[n] ?? NATURAL[type];
}

function Sec({ c, s, n, cls = "", children }: { c: Ctx; s: SiteSection; n: number; cls?: string; children: ReactNode }) {
  return (
    <section id={s.id} className={`t-sec t-${toneAt(c, n, s.type)} ${cls}`.trim()}>
      {children}
    </section>
  );
}

/** Chapter opening: a ruled label, the title in Roman capitals and a lede. */
function Head(p: HeadProps) {
  return (
    <header className="t-head">
      {p.kicker ? (
        <p className="t-eyebrow" data-rv="rule">
          <i aria-hidden="true" />
          <span>{p.kicker}</span>
          <i aria-hidden="true" />
        </p>
      ) : (
        <span className="t-eyebrow t-rule" data-rv="rule" aria-hidden="true">
          <i />
          <i />
        </span>
      )}
      <h2 id={p.id} className={long(p.title)} data-rv>
        {em(p.title)}
      </h2>
      {p.intro ? (
        <p className="t-lede" data-rv>
          {p.intro}
        </p>
      ) : null}
    </header>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const links = navOf(c);
  const top = links.slice(0, 4);
  const half = Math.ceil(top.length / 2);
  const link = (n: { id: string; label: string }) => (
    <a key={n.id} href={`#${n.id}`}>
      {n.label}
    </a>
  );
  return (
    <>
      <header className="t-nav hdr">
        <button type="button" className="t-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
          <i aria-hidden="true" />
          <span data-label data-open={c.t.menu} data-close={c.t.close}>
            {c.t.menu}
          </span>
        </button>
        <nav aria-label={c.t.menu} className="t-links t-links-l" data-nav>
          {top.slice(0, half).map(link)}
        </nav>
        <a href="#top" className={`t-logo${c.name.length > 14 ? " is-long" : ""}`} aria-label={c.name}>
          <Sun />
          <span>{c.name}</span>
        </a>
        <div className="t-nav-r">
          {top.length > half ? (
            <nav aria-label={c.t.explore} className="t-links" data-nav>
              {top.slice(half).map(link)}
            </nav>
          ) : null}
          <a href={cta.href} className="btn t-nav-cta" {...ext(cta.href)}>
            {cta.label}
          </a>
        </div>
      </header>
      <div id="site-menu" className="t-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {links.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              {n.label}
            </a>
          ))}
          <a href={cta.href} style={i(links.length)} {...ext(cta.href)}>
            {cta.label}
          </a>
        </nav>
        {b.address || b.city || b.phone ? (
          <p>
            {b.address ?? b.city}
            {b.phone ? (
              <>
                <br />
                <a href={tel(b.phone)}>{b.phone}</a>
              </>
            ) : null}
          </p>
        ) : null}
      </div>
    </>
  );
}

/** A headline as words (with *marked* phrases), so it can rise word by word like the demo's letters. */
function words(text: string) {
  const out: { w: string; em: boolean }[] = [];
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => out.push({ w, em: n % 2 === 1 })),
  );
  return out;
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const list = words(hero.headline);
  const total = list.reduce((a, x) => a + x.w.length + 1, -1);
  const size = total <= 12 ? "is-xl" : total <= 26 ? "is-l" : total <= 48 ? "is-m" : "is-s";
  const widest = Math.max(5, ...list.map((x) => x.w.length));
  const facts = heroFacts(c);
  const go = hero.primaryCta;
  return (
    <section className={`t-open${p ? "" : " no-pic"}`}>
      {p ? (
        <div className="t-open-media">
          <Pic p={p} eager sizes="100vw" />
        </div>
      ) : (
        <Sun className="t-open-mark" />
      )}
      <div className="t-open-in">
        <Sun className="t-open-sun" />
        {hero.eyebrow ? (
          <p className="t-open-eyebrow">
            <i aria-hidden="true" />
            <span>{hero.eyebrow}</span>
            <i aria-hidden="true" />
          </p>
        ) : null}
        <h1 className={`t-open-h ${size}`} style={css({ "--w": widest })}>
          {list.map((x, k) => (
            <Fragment key={k}>
              {k > 0 ? " " : null}
              <span style={i(k)}>{x.em ? <em>{x.w}</em> : x.w}</span>
            </Fragment>
          ))}
        </h1>
        <p className="t-open-lede">{hero.subheadline}</p>
        {facts.length ? (
          hero.secondaryCta ? (
            <p className="t-open-more">
              <Btn c={c} href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label}
              </Btn>
            </p>
          ) : null
        ) : (
          <div className="t-open-cta">
            <Btn c={c} href={go.href}>
              {go.label}
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
        )}
      </div>
      {facts.length > 0 && (
        <div className="t-bar t-facts-bar" data-n={facts.length} style={css({ "--n": facts.length })}>
          {facts.map((f) => (
            <div key={f.label} className="t-bar-f">
              <span>{f.label}</span>
              <strong>{f.value}</strong>
            </div>
          ))}
          <a href={go.href} className="btn t-btn t-bar-go" {...ext(go.href)}>
            {go.label}
          </a>
        </div>
      )}
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const parts = c.name.split(/\s+/);
  const n = Math.max(6, ...parts.map((w) => w.length), Math.min(c.name.length, 16));
  return (
    <footer className="t-foot">
      <div className="t-wrap">
        <div className="t-foot-mark">
          <Sun />
          <p aria-hidden="true" style={css({ "--n": n })}>
            {c.name}
          </p>
          {b.tagline ? <span>{b.tagline}</span> : null}
        </div>
        <div className="t-foot-grid">
          <div>
            <h3>{c.t.explore}</h3>
            {navOf(c).map((x) => (
              <a key={x.id} href={`#${x.id}`}>
                {x.label}
              </a>
            ))}
          </div>
          {b.openingHours?.length ? (
            <div>
              <h3>{c.t.hours}</h3>
              {b.openingHours.slice(0, 8).map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          ) : null}
          <div>
            <h3>{c.t.contact}</h3>
            {b.address ? <p>{b.address}</p> : b.city ? <p>{b.city}</p> : null}
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
            {b.mapsUrl ? (
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                {c.t.route}
              </a>
            ) : null}
            <a href={cta.href} className="t-foot-book" {...ext(cta.href)}>
              {cta.label}
            </a>
          </div>
          {c.spec.footer.blurb ? (
            <div className="t-foot-blurb">
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
        </div>
        <Legal c={c} className="t-legal" />
      </div>
    </footer>
  );
}

/** A framed plate: the sheet over it lifts when it comes into view. */
function Plate({ p, cls, sizes, px, n = 0 }: { p: Photo; cls?: string; sizes: string; px?: boolean; n?: number }) {
  return (
    <figure className={`t-plate${cls ? ` ${cls}` : ""}`} data-rv="plate" style={i(n)} {...(px ? { "data-px": "" } : {})}>
      <Pic p={p} sizes={sizes} />
    </figure>
  );
}

type Card = { title: string; role?: string; text?: string; meta?: string | null; price?: string | null; pic: Photo | null };

/** Rooms as tall framed cards when every item has a photograph, otherwise the wellness columns. */
function Cards({ items }: { items: Card[] }) {
  const n = items.length;
  if (n <= 6 && items.every((x) => x.pic)) {
    return (
      <div className="t-rooms-row" data-n={n} style={css({ "--c": n === 6 ? 3 : n })}>
        {items.map((x, k) => (
          <article key={k} className="t-room" data-rv style={i(k)}>
            <div className="t-room-img">
              <Pic p={x.pic!} sizes="(min-width: 1100px) 22vw, (min-width: 700px) 300px, 72vw" />
              <span className="t-room-num" aria-hidden="true">
                {ROMAN[k]}
              </span>
            </div>
            <h3>{x.title}</h3>
            {x.role ? <p className="t-room-role">{x.role}</p> : null}
            {x.text ? <p className="t-room-facts">{x.text}</p> : null}
            {x.price || x.meta ? (
              <p className="t-room-price">
                {x.meta}
                {x.meta && x.price ? " · " : null}
                {x.price ? <b>{x.price}</b> : null}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    );
  }
  const cols = n === 1 ? 1 : n === 2 || n === 4 ? 2 : 3;
  return (
    <ul className="t-well-cols" data-c={cols}>
      {items.map((x, k) => (
        <li key={k} data-rv style={i(k % 3)}>
          <b aria-hidden="true">{ROMAN[k] ?? k + 1}</b>
          <h3>{x.title}</h3>
          {x.role ? <p className="t-role">{x.role}</p> : null}
          {x.text ? <p>{x.text}</p> : null}
          {x.meta || x.price ? <small>{[x.meta, x.price].filter(Boolean).join(" · ")}</small> : null}
        </li>
      ))}
    </ul>
  );
}

/** Label, dotted leader, value: the demo's list of places, used for hours and addresses. */
function Rows({ rows }: { rows: [string, ReactNode][] }) {
  if (!rows.length) return null;
  return (
    <ul className="t-rows" data-rv>
      {rows.map(([k, v], n) => (
        <li key={n}>
          <span>{k}</span>
          <i aria-hidden="true" />
          <em>{v}</em>
        </li>
      ))}
    </ul>
  );
}

const hourRows = (c: Ctx): [string, ReactNode][] => hoursRows(c.spec.business.openingHours ?? []).map(([d, t]) => [d, t]);

function reachRows(c: Ctx): [string, ReactNode][] {
  const b = c.spec.business;
  const rows: [string, ReactNode][] = [];
  if (b.address || b.city) rows.push([c.t.address, b.address ?? b.city]);
  if (b.phone)
    rows.push([
      c.t.phone,
      <a key="tel" href={tel(b.phone)}>
        {b.phone}
      </a>,
    ]);
  if (b.email)
    rows.push([
      c.t.email,
      <a key="mail" href={`mailto:${b.email}`}>
        {b.email}
      </a>,
    ]);
  return rows;
}

const Route = ({ c }: { c: Ctx }) =>
  c.spec.business.mapsUrl ? (
    <a href={c.spec.business.mapsUrl} target="_blank" rel="noopener noreferrer" className="t-link">
      {c.t.route}
    </a>
  ) : null;

export const ostara: Family = {
  key: "ostara",
  root: "d-ostara",
  fonts: ["Marcellus", "Mulish"],
  themeColor: "#f1e9dc",
  accent: "#9a4a30",
  onAccent: "#f7f1e6",
  css: CSS,
  extra: EXTRA,
  cls: { wrap: "t-wrap", eyebrow: "t-eyebrow", btn: "t-btn", btnAlt: "t-btn t-btn-line", btnText: "t-link" },
  Header,
  Hero,
  Footer,
  Head,
  sections: {
    about: (s, c, n) => {
      const a = c.photo(s.image);
      const b = a ? c.spare() : null;
      const d = b ? c.spare() : null;
      const [lede, ...rest] = s.paragraphs;
      const left: ReactNode[] = [];
      const right: ReactNode[] = [];
      if (rest[0]) left.push(<p key="p0" data-rv>{rest[0]}</p>);
      if (b) left.push(<Plate key="b" p={b} cls="t-house-lib" sizes="(min-width: 960px) 28vw, 92vw" />);
      if (d) right.push(<Plate key="d" p={d} cls="t-house-linen" sizes="(min-width: 960px) 28vw, 92vw" />);
      rest.slice(1).forEach((x, k) =>
        right.push(
          <p key={`p${k + 1}`} data-rv>
            {x}
          </p>,
        ),
      );
      const cols = (left.length ? 1 : 0) + (a ? 1 : 0) + (right.length ? 1 : 0);
      return (
        <Sec c={c} s={s} n={n}>
          <div className="t-wrap">
            {c.head({ kicker: c.t.kick.about, title: s.title, intro: lede })}
            {cols > 0 && (
              <div className="t-house-grid" data-cols={cols}>
                {left.length ? <div className="t-house-l">{left}</div> : null}
                {a ? <Plate p={a} cls="t-house-c" sizes="(min-width: 960px) 30vw, 92vw" px /> : null}
                {right.length ? <div className="t-house-r">{right}</div> : null}
              </div>
            )}
            {s.highlights.length > 0 && (
              <ul className="t-facts" data-n={s.highlights.length} style={css({ "--n": s.highlights.length })}>
                {s.highlights.map((h, k) => (
                  <li key={h} data-rv style={i(k)}>
                    <b aria-hidden="true">{ROMAN[k]}</b>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Sec>
      );
    },
    services: (s, c, n) => {
      const items: Card[] = s.items.map((it, k) => ({ title: it.title, text: it.description, meta: it.duration, price: it.price, pic: c.photo(`art:svc${k}`) }));
      return (
        <Sec c={c} s={s} n={n}>
          <div className="t-wrap">{c.head({ kicker: c.t.kick.services, title: s.title, intro: s.intro })}</div>
          <div className="t-wrap t-rooms-wrap">
            <Cards items={items} />
          </div>
        </Sec>
      );
    },
    team: (s, c, n) => {
      const items: Card[] = s.members.map((m) => ({ title: m.name, role: m.role, text: m.bio || undefined, pic: c.photo(m.image) }));
      return (
        <Sec c={c} s={s} n={n}>
          <div className="t-wrap">{c.head({ kicker: c.t.kick.team, title: s.title, intro: s.intro })}</div>
          <div className="t-wrap t-rooms-wrap">
            <Cards items={items} />
          </div>
        </Sec>
      );
    },
    features: (s, c, n) => (
      <Sec c={c} s={s} n={n}>
        <div className="t-wrap">
          {c.head({ kicker: c.t.kick.features, title: s.title, intro: s.intro })}
          <Cards items={s.items.map((it) => ({ title: it.title, text: it.description, pic: null }))} />
        </div>
      </Sec>
    ),
    menu: (s, c, n) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      const pics: Photo[] = [];
      for (let k = 0; k < 3 && cats.length; k++) {
        const p = c.spare();
        if (!p) break;
        pics.push(p);
      }
      return (
        <Sec c={c} s={s} n={n}>
          <div className="t-wrap">
            {c.head({ kicker: c.t.kick.menu, title: s.title, intro: s.intro })}
            {cats.length > 0 && (
              <div className="t-eat-lists" data-n={cats.length}>
                {cats.map((cat, k) => (
                  <div key={k}>
                    <h3 className="t-sub" data-rv>
                      {cat.name}
                    </h3>
                    <ul className="t-card">
                      {cat.items.map((d, m) => (
                        <li key={m} className={d.price ? undefined : "no-p"} data-rv style={i(m % 5)}>
                          <div>
                            <strong>{d.name}</strong>
                            {d.description ? <span>{d.description}</span> : null}
                            {d.tags?.length ? <em className="t-tags">{d.tags.join(" · ")}</em> : null}
                          </div>
                          {d.price ? (
                            <>
                              <i aria-hidden="true" />
                              <b>{d.price}</b>
                            </>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {pics.length > 0 && (
              <div className="t-eat-strip" data-n={pics.length}>
                {pics.map((p, k) => (
                  <Plate key={k} p={p} n={k} sizes={pics.length === 1 ? "(min-width: 900px) 90vw, 92vw" : "(min-width: 900px) 45vw, 92vw"} />
                ))}
              </div>
            )}
            {s.note ? (
              <p className="t-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </Sec>
      );
    },
    process: (s, c, n) => (
      <Sec c={c} s={s} n={n}>
        <div className="t-wrap">
          {c.head({ kicker: c.t.kick.process, title: s.title, intro: s.intro })}
          <ol className="t-day t-proc">
            {s.steps.map((st, k) => (
              <li key={k} data-rv style={i(k % 4)}>
                <b aria-hidden="true">{ROMAN[k]}</b>
                <div>
                  <strong>{st.title}</strong>
                  <span>{st.description}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Sec>
    ),
    gallery: (s, c, n) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p)).slice(0, 9);
      if (!pics.length) return null;
      const demo = pics.length >= 8;
      return (
        <Sec c={c} s={s} n={n}>
          <div className="t-wrap">
            {c.head({ kicker: c.t.kick.gallery, title: s.title })}
            <ul className="t-gal" data-n={pics.length}>
              {pics.map((p, k) => (
                <li key={k} className={demo ? `g${k + 1}` : `q${k + 1}`} data-rv="plate" style={i(k % 3)}>
                  <Pic p={p} sizes={k === 0 ? "(min-width: 900px) 50vw, 100vw" : "(min-width: 900px) 34vw, 50vw"} />
                </li>
              ))}
            </ul>
          </div>
        </Sec>
      );
    },
    testimonials: (s, c, n) => (
      <Sec c={c} s={s} n={n}>
        <div className="t-wrap">
          {c.head({ kicker: c.t.kick.testimonials, title: s.title })}
          <div className="t-quotes-grid" data-n={s.items.length}>
            {s.items.map((q, k) => (
              <blockquote key={k} className="t-quote" data-rv style={i(k % 2)}>
                <Sun />
                <p>“{q.quote}”</p>
                <footer>
                  {q.author} ·{" "}
                  <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {c.t.source}: {q.source}
                  </a>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </Sec>
    ),
    statement: (s, c, n) => (
      <Sec c={c} s={s} n={n} cls="t-state">
        <div className="t-wrap">
          <div className="t-quote">
            <Sun />
            <h2 data-rv>{em(s.title)}</h2>
            {s.note ? <footer data-rv>{s.note}</footer> : null}
          </div>
        </div>
      </Sec>
    ),
    showcase: (s, c, n) => {
      const p = c.photo(s.image);
      return (
        <Sec c={c} s={s} n={n} cls={`t-show${p ? " has-pic" : ""}`}>
          {p ? (
            <figure className="t-well-wide" data-px>
              <Pic p={p} sizes="100vw" />
            </figure>
          ) : null}
          <div className="t-wrap">
            <div className="t-well-card">
              <header className="t-head">
                <p className="t-eyebrow" data-rv="rule">
                  <i aria-hidden="true" />
                  <span>{c.t.kick.showcase}</span>
                  <i aria-hidden="true" />
                </p>
                <h2 className={long(s.title)} data-rv>
                  {em(s.title)}
                </h2>
                {s.body ? (
                  <p className="t-lede" data-rv>
                    {s.body}
                  </p>
                ) : null}
                {s.cta ? (
                  <p data-rv>
                    <Btn c={c} href={s.cta.href} variant="alt">
                      {s.cta.label}
                    </Btn>
                  </p>
                ) : null}
              </header>
            </div>
          </div>
        </Sec>
      );
    },
    cta: (s, c, n) => {
      const p = c.spare();
      return (
        <Sec c={c} s={s} n={n} cls={`t-end${p ? " has-pic" : ""}`}>
          {p ? (
            <div className="t-end-media" data-px>
              <Pic p={p} sizes="100vw" />
            </div>
          ) : null}
          <div className="t-wrap t-end-in">
            <Sun />
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {s.body ? (
              <p className="t-lede" data-rv>
                {s.body}
              </p>
            ) : null}
            <p data-rv>
              <Btn c={c} href={s.cta.href}>
                {s.cta.label}
              </Btn>
            </p>
          </div>
        </Sec>
      );
    },
    packages: (s, c, n) => (
      <Sec c={c} s={s} n={n}>
        <div className="t-wrap">
          {c.head({ kicker: c.t.kick.packages, title: s.title, intro: s.intro })}
          <div className="t-pack-grid" data-n={s.items.length}>
            {s.items.map((it, k) => (
              <article key={k} className={`t-bill t-pack${it.featured ? " is-featured" : ""}`} data-rv style={i(k)}>
                <Sun />
                {it.featured ? <p className="t-dlg-kicker">{c.t.popular}</p> : null}
                <h3>{it.name}</h3>
                <p className="t-bill-total">
                  <span>{it.price ? it.unit : ""}</span>
                  <b className={it.price ? undefined : "is-req"}>{it.price ?? c.t.onRequest}</b>
                </p>
                {it.description ? <p className="t-pack-desc">{it.description}</p> : null}
                {it.features.length > 0 && (
                  <ul className="t-dlg-incl">
                    {it.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
          {s.note ? (
            <p className="t-note" data-rv>
              {s.note}
            </p>
          ) : null}
        </div>
      </Sec>
    ),
    booking: (s, c, n) => {
      const b = c.spec.business;
      const facts = reachRows(c);
      const hours = hoursRows(b.openingHours ?? []);
      const bill = facts.length > 0 || hours.length > 0;
      return (
        <Sec c={c} s={s} n={n}>
          <div className="t-wrap">
            {c.head({ kicker: c.t.kick.booking, title: s.title, intro: s.body })}
            <div className="t-book-sheet" data-rv>
              <div className={`t-bookgrid${bill ? "" : " is-solo"}`}>
                <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
                {bill ? (
                  <aside className="t-bill">
                    <Sun />
                    <h3>{c.name}</h3>
                    {facts.length > 0 && (
                      <dl>
                        {facts.map(([k, v]) => (
                          <div key={k}>
                            <dt>{k}</dt>
                            <dd>{v}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {hours.length > 0 && (
                      <ul className="t-bill-lines">
                        {hours.map(([d, t], k) => (
                          <li key={k}>
                            <span>{d}</span>
                            <i aria-hidden="true" />
                            <b>{t}</b>
                          </li>
                        ))}
                      </ul>
                    )}
                  </aside>
                ) : null}
              </div>
            </div>
          </div>
        </Sec>
      );
    },
    hours: (s, c, n) => {
      const b = c.spec.business;
      const rows = hourRows(c);
      const p = c.spare();
      return (
        <Sec c={c} s={s} n={n} cls={p ? "has-wide" : undefined}>
          <div className="t-wrap">
            {c.head({ kicker: c.t.kick.hours, title: s.title, intro: s.note || undefined })}
            <div className="t-comp">
              <div>
                {rows.length ? (
                  <Rows rows={rows} />
                ) : (
                  <p className="t-rows-note" data-rv>
                    {c.t.hoursTbc}
                  </p>
                )}
              </div>
              <div className="t-visit" data-rv>
                <p className="t-dlg-kicker">{c.t.address}</p>
                <p className="t-dlg-line">{b.address ?? b.city ?? c.name}</p>
                {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
                {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
                <Route c={c} />
              </div>
            </div>
          </div>
          {p ? (
            <figure className="t-hood-wide" data-px>
              <Pic p={p} sizes="100vw" />
              {b.address || b.phone ? (
                <figcaption>
                  {b.address ? <span>{b.address}</span> : null}
                  {b.phone ? <span>{b.phone}</span> : null}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
        </Sec>
      );
    },
    contact: (s, c, n) => {
      const showHours = !c.spec.sections.some((x) => x.type === "hours" || x.type === "booking");
      const rows = [...reachRows(c), ...(showHours ? hourRows(c) : [])];
      return (
        <Sec c={c} s={s} n={n}>
          <div className="t-wrap">
            {c.head({ kicker: c.t.kick.contact, title: s.title, intro: s.body })}
            <div className={`t-comp${s.showForm ? "" : " is-solo"}`}>
              <div>
                <Rows rows={rows} />
                <p className="t-rows-note">
                  <Route c={c} />
                </p>
              </div>
              {s.showForm ? (
                <div className="t-book-sheet" data-rv>
                  <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
                </div>
              ) : null}
            </div>
          </div>
        </Sec>
      );
    },
    faq: (s, c, n) => (
      <Sec c={c} s={s} n={n}>
        <div className="t-wrap">
          {c.head({ kicker: c.t.kick.faq, title: s.title })}
          <div className="t-acc" data-acc>
            {s.items.map((it, k) => (
              <details key={k} data-rv style={i(k % 4)}>
                <summary>
                  <span>{it.q}</span>
                  <i aria-hidden="true" />
                </summary>
                <p>{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Sec>
    ),
    order: (s, c, n) => (
      <Sec c={c} s={s} n={n}>
        <div className="t-wrap">
          {c.head({ kicker: c.t.kick.order, title: s.title, intro: s.body })}
          <ul className="t-chans">
            {s.channels.map((ch, k) => (
              <li key={k} data-rv style={i(k)}>
                <a href={ch.href} className="t-chan" {...ext(ch.href)}>
                  <b aria-hidden="true">{ROMAN[k]}</b>
                  <span>
                    <strong>{ch.label}</strong>
                    {ch.description ? <small>{ch.description}</small> : null}
                  </span>
                  <Icon name={ch.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Sec>
    ),
  },
};
