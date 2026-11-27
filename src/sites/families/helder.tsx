import type { ReactNode } from "react";
import { ArrowRight, CalendarCheck, Check, Clock, Mail, MapPin, MessageCircle, Phone, Plus, Route, Users } from "lucide-react";
import { CSS } from "./css/dental";
import { css, DemoForm, em, heroFacts, Hours, hoursRows, i, Icon, Legal, long, Pic, tel, type Ctx, type Family, type HeadProps, type Photo, type SectionOf } from "./kit";

/**
 * Helder (demo: /demos/dental). Clean and reassuring: white and soft mint, deep teal type and
 * one warm coral. Everything is round: pill buttons, big radii, sections as soft cards, icons
 * in mint circles. Made for dentists, physiotherapists, other practices and cleaning companies.
 */

const EXTRA = `
.d-helder{--h-sans:"Plus Jakarta Sans";--z-bg2:var(--mint-2);--z-ink:var(--teal);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--teal-2);--z-on-accent:#fff;--z-display:var(--h-sans),system-ui,sans-serif;--z-display-weight:700;--z-radius:var(--r);--z-field-radius:18px;--z-h3:19px;--z-sec:clamp(72px,9vw,136px);--z-statement:clamp(30px,4vw,58px)}
.d-helder h2.is-long{font-size:clamp(28px,3.3vw,48px);line-height:1.08}
.d-helder .h-sec-card{padding-block:clamp(40px,5vw,80px)}
.d-helder :is(.h-sec,.z-sec)+:is(.h-sec,.z-sec){padding-top:0}
.d-helder .h-panel+.h-panel{margin-top:var(--edge)}
.d-helder p.h-tag:not(:has(>i))::before{content:"";flex:none;width:9px;height:9px;border-radius:50%;background:var(--coral)}
.d-helder .h-link{display:inline-flex;align-items:center;min-height:44px;font-weight:700;text-decoration:underline;text-decoration-color:var(--coral);text-decoration-thickness:2px;text-underline-offset:5px}
.d-helder .h-mark{position:relative;display:grid;place-items:center;flex:none;width:40px;height:40px;border-radius:14px;background:var(--teal);font-size:19px;font-weight:800;letter-spacing:0}
.d-helder .h-logo .h-mark{color:#fff}
.d-helder .h-mark::after{content:"";position:absolute;top:6px;right:6px;width:7px;height:7px;border-radius:50%;background:var(--coral)}
.d-helder .h-logo{min-width:0}
.d-helder .h-logo-t{display:grid;min-width:0}
.d-helder .h-logo-t b{overflow:hidden;font-weight:800;text-overflow:ellipsis;white-space:nowrap}
.d-helder .h-logo.is-long{font-size:17px}
.d-helder .h-logo-t small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-helder .h-links a{white-space:nowrap}
.d-helder .h-nav-cta{flex:none}
@media (max-width:480px){.d-helder .h-nav-cta.is-long{display:none}}
@media (min-width:1080px) and (max-width:1279px){.d-helder .h-links a:nth-child(5){display:none}}
@media (min-width:1080px){.d-helder .h-logo-t{max-width:clamp(160px,16vw,260px)}}
.d-helder .h-menu nav a{gap:16px;line-height:1.15;padding-block:8px}
.d-helder .h-menu nav a svg{flex:none}
.d-helder .h-hero h1.is-m{font-size:clamp(34px,4.7vw,70px)}
.d-helder .h-hero h1.is-s{font-size:clamp(30px,4vw,58px);line-height:1.06}
.d-helder .h-w{max-width:100%;hyphens:auto;overflow-wrap:break-word}
@media (max-width:480px){.d-helder .h-hero h1{font-size:clamp(31px,9.2vw,42px)}.d-helder .h-hero h1.is-s{font-size:clamp(28px,7.8vw,36px)}}
@media (min-width:980px){.d-helder .h-hero-grid.is-solo{grid-template-columns:minmax(0,1fr)}}
.d-helder .h-hero-grid.is-solo .h-hero-copy{max-width:920px}
.d-helder .h-float p{white-space:normal;max-width:230px}
.d-helder .h-hero-card{position:relative;z-index:1;display:grid;gap:8px;padding:clamp(14px,2vw,24px);border-radius:40px;background:#fff;box-shadow:0 30px 60px -40px rgba(15,59,58,.45);animation:h-photo 1.2s var(--ease) .25s both}
.d-helder .h-hero-card .h-tag{justify-self:start;margin:4px 0 6px 6px;background:var(--mint)}
.d-helder .h-fact{display:flex;align-items:center;gap:14px;padding:10px 22px 10px 10px;border-radius:30px;background:var(--mint-2);line-height:1.3}
.d-helder .h-fact>span:last-child{display:grid;min-width:0}
.d-helder .h-fact small{color:var(--dim);font-size:13.5px;font-weight:600}
.d-helder .h-fact b{font-size:17px;font-weight:700;letter-spacing:-.02em;overflow-wrap:anywhere}
.d-helder .h-fact:nth-child(3) .h-ic{background:var(--coral-2)}
.d-helder .h-fact:nth-child(4) .h-ic{background:#ffe9ad}
.d-helder .h-hero-visual.is-card .h-ring{top:-40px;right:-18px;width:30%}
.d-helder .h-need>span:nth-child(2){min-width:0}
.d-helder .h-need small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-helder .h-need-b .h-ic{background:var(--mint)}
@media (min-width:900px){.d-helder .h-needs[data-n="2"]{grid-template-columns:repeat(2,1fr)}}
.d-helder .h-treat-grid.is-one{--n:1}
.d-helder .h-treat-grid.is-one .h-treat-panel{--c:0}
@media (min-width:1060px){.d-helder .h-treat-grid.is-two{--n:2}.d-helder .h-treat-grid.is-two .h-treat-panel{--c:var(--c2)}}
.d-helder .h-treat-in{display:grid;gap:8px}
@media (min-width:760px){.d-helder .h-treat-in.has-pic{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}}
.d-helder .h-treat-pic{position:relative;overflow:hidden;min-height:220px;border-radius:calc(var(--r) - 8px);background:#cfe6e2}
.d-helder .h-treat-pic img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.d-helder .h-treat-copy{padding:clamp(18px,2.2vw,32px);border-radius:calc(var(--r) - 8px);background:#fff}
.d-helder .h-treat-copy h4{margin:0 0 8px;color:var(--teal-2);font-size:15px;font-weight:700}
.d-helder .h-treat-copy h4::before{content:"";display:inline-block;width:9px;height:9px;margin-right:9px;border-radius:50%;background:var(--coral)}
.d-helder .h-treat-copy p{max-width:62ch;font-size:16.5px;line-height:1.6}
.d-helder .h-treat-t b{overflow-wrap:anywhere}
@media (min-width:1020px){.d-helder .h-calm-card.is-solo{grid-template-columns:minmax(0,1fr)}.d-helder .h-calm-card.is-solo .h-calm-list{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}}
.d-helder .h-calm-pic{position:relative;overflow:hidden;width:100%;max-width:420px;aspect-ratio:4/5;border-radius:999px 999px var(--r) var(--r);background:#ffdccd}
.d-helder .h-calm-pic img{width:100%;height:100%;object-fit:cover}
.d-helder .h-calm-side{position:relative}
.d-helder .h-calm-side::after{content:"";position:absolute;right:4%;bottom:-14px;width:64px;height:64px;border-radius:50%;background:var(--coral);animation:h-bob 6s ease-in-out infinite alternate}
.d-helder .h-steps{--n:5}
.d-helder .h-steps button{flex:1 1 0;width:auto;min-width:0}
.d-helder .h-steps-line{left:calc(50% / var(--n));right:calc(50% / var(--n))}
.d-helder .h-step-l{display:none}
@media (min-width:980px){.d-helder .h-step-l{display:-webkit-box;max-width:100%;padding-inline:6px;overflow:hidden;font-size:14px;line-height:1.3;white-space:normal;text-align:center;-webkit-line-clamp:2;-webkit-box-orient:vertical}}
.d-helder .h-step-text{min-height:0}
.d-helder .h-step-text[hidden]{display:none}
@media (min-width:980px){.d-helder .h-step-panel.is-solo{grid-template-columns:minmax(0,1fr)}.d-helder .h-step-panel.is-solo .h-step-copy{max-width:820px}.d-helder .h-step-text{min-height:12em}}
.d-helder .h-step-nav{flex-wrap:wrap}
.d-helder .h-step-nav .h-btn{flex:0 1 auto}
@media (min-width:900px){.d-helder .h-team{grid-template-columns:repeat(var(--cols,4),minmax(0,1fr));max-width:calc(var(--cols,4) * 340px)}}
.d-helder .h-team[data-cols="3"] .h-member:nth-child(even),.d-helder .h-team[data-cols="1"] .h-member{margin-top:0}
@media (min-width:900px){.d-helder .h-team[data-cols="3"] .h-member:nth-child(3n+2){margin-top:56px}}
.d-helder .h-member-ini{display:grid;place-items:center;width:100%;aspect-ratio:4/5;border-radius:999px 999px var(--r) var(--r);background:var(--mint);font-size:clamp(64px,8vw,112px);font-weight:800;letter-spacing:-.04em}
.d-helder .h-member:nth-child(3n+2) .h-member-ini{background:var(--coral-2)}
.d-helder .h-member:nth-child(3n) .h-member-ini{background:#ffe9ad}
.d-helder .h-bento.h-grid{grid-template-areas:none;grid-template-rows:none;grid-template-columns:minmax(0,1fr);grid-auto-rows:auto}
.d-helder .h-grid>figure{min-height:0;aspect-ratio:4/3}
@media (max-width:899px){.d-helder .h-grid.h-gal{grid-template-columns:repeat(2,minmax(0,1fr))}.d-helder .h-gal>:first-child,.d-helder .h-gal>:last-child:nth-child(even){grid-column:1/-1}}
@media (min-width:900px){.d-helder .h-bento.h-grid.is-flat{grid-auto-rows:auto}.d-helder .h-bento.h-grid{grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-rows:minmax(250px,auto);grid-auto-flow:dense}.d-helder .h-grid>*{grid-column:span var(--cs,4);grid-row:span var(--rs,1)}.d-helder .h-grid>figure{aspect-ratio:auto}.d-helder .h-grid>figure.is-wide{aspect-ratio:21/9}}
.d-helder .h-tile-mint p+p{margin-top:12px}
.d-helder .h-tile-mint>p{color:var(--teal);font-size:16px;line-height:1.6}
.d-helder .h-tile-teal ul{display:grid;gap:14px;margin-top:28px}
.d-helder .h-tile-teal li{display:flex;gap:12px;font-size:16.5px;font-weight:650;line-height:1.4}
.d-helder .h-tile-teal li svg{flex:none;margin-top:2px;color:var(--coral)}
.d-helder .h-tile-teal .h-ic svg{color:var(--teal)}
@media (min-width:900px){.d-helder .h-tile-teal.is-row{flex-direction:row;align-items:center;gap:28px}.d-helder .h-tile-teal.is-row .h-ic{margin:0}.d-helder .h-tile-teal.is-row ul{flex:1;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));margin-top:0}}
@media (min-width:1020px){.d-helder .h-voices>*{grid-column:span var(--cs,4)}}
.d-helder .h-voice-b{display:flex;flex-direction:column;justify-content:space-between;gap:20px}
.d-helder .h-voice-b figcaption{flex-wrap:wrap}
.d-helder .h-voices .is-long blockquote{font-size:clamp(17px,1.3vw,19px);line-height:1.45}
.d-helder .h-voices figcaption>span{min-width:0}
.d-helder .h-voices figcaption i{display:grid;place-items:center;flex:none;width:44px;height:44px;border-radius:50%;background:var(--coral-2);color:var(--teal);font-style:normal;font-weight:800}
.d-helder .h-voice-b figcaption i{background:var(--coral)}
.d-helder .h-voices figcaption a{text-decoration:underline;text-underline-offset:3px}
.d-helder .h-bubble:nth-child(3n+3) figcaption i{background:#ffe9ad}
.d-helder .h-bubble:nth-child(3n+1) figcaption i{background:var(--mint)}
.d-helder .h-packs{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr))}
.d-helder .h-pack{display:flex;flex-direction:column;gap:14px;padding:clamp(22px,2.6vw,36px);border-radius:var(--r);background:#fff;box-shadow:0 30px 60px -48px rgba(15,59,58,.5)}
.d-helder .h-pack h3{font-size:clamp(21px,1.8vw,26px);letter-spacing:-.03em}
.d-helder .h-pack-tag{align-self:flex-start;padding:6px 13px;border-radius:999px;background:var(--coral);color:var(--teal);font-size:13px;font-weight:750}
.d-helder .h-pack-price{display:flex;flex-wrap:wrap;align-items:center;gap:8px;color:var(--dim);font-size:14.5px;font-weight:600}
.d-helder .h-pack-price strong{padding:6px 14px;border-radius:999px;background:var(--mint);color:var(--teal);font-size:clamp(18px,1.6vw,22px);font-weight:750;font-variant-numeric:tabular-nums}
.d-helder .h-pack>p:not([class]){color:var(--dim);font-size:15.5px;line-height:1.5}
.d-helder .h-pack ul{display:grid;gap:9px;margin-top:4px;font-size:15px;font-weight:600;line-height:1.4}
.d-helder .h-pack li{display:flex;gap:10px}
.d-helder .h-pack li svg{flex:none;margin-top:2px;color:var(--teal-2)}
.d-helder .h-pack.is-featured{background:var(--teal);color:var(--on)}
.d-helder .h-pack.is-featured>p:not([class]),.d-helder .h-pack.is-featured .h-pack-price{color:var(--on-dim)}
.d-helder .h-pack.is-featured .h-pack-price strong{background:var(--coral)}
.d-helder .h-pack.is-featured li svg{color:var(--coral)}
.d-helder .h-small{margin-top:24px;color:var(--dim);font-size:14.5px}
.d-helder .h-contact li>div{display:flex;align-items:center;gap:14px;padding:10px 20px 10px 10px;border-radius:30px;background:rgba(255,255,255,.07);line-height:1.3}
.d-helder .h-contact li>div>span:last-child{display:grid;min-width:0}
.d-helder .h-contact a{border-radius:30px}
.d-helder .h-contact.is-light a,.d-helder .h-contact.is-light li>div{background:#fff}
.d-helder .h-contact.is-light a:hover{background:var(--mint-2)}
.d-helder .h-contact.is-light small{color:var(--dim)}
.d-helder .h-contact.is-light .h-ic{background:var(--mint)}
.d-helder .h-book-hours{display:grid;margin-top:16px;padding:12px 22px;border-radius:24px;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.14);font-size:15px}
.d-helder .h-book-hours div{display:flex;justify-content:space-between;gap:16px;padding:8px 0;border-bottom:1.5px solid rgba(255,255,255,.1)}
.d-helder .h-book-hours div:last-child{border-bottom:0}
.d-helder .h-book-hours dt{font-weight:650}
.d-helder .h-book-hours dd{color:var(--on-dim);text-align:right}
.d-helder .h-hours-card{position:static!important;min-height:0!important}
.d-helder .h-hours-card .h-fee-list strong{white-space:normal;text-align:right}
.d-helder .h-hours-tbc{color:var(--dim)}
.d-helder .h-contact-card{position:relative;overflow:hidden;display:grid;gap:36px;padding:clamp(24px,5vw,80px);border-radius:var(--r-xl);background:var(--mint)}
.d-helder .h-contact-card::before{content:"";position:absolute;top:-160px;right:-140px;width:460px;height:460px;border-radius:50%;background:#fff;opacity:.45}
.d-helder .h-contact-card>*{position:relative;min-width:0}
.d-helder .h-contact-card .h-tag{background:#fff}
.d-helder .h-contact-copy h2{margin-top:18px}
.d-helder .h-contact-copy>p:not(.h-tag){max-width:32em;margin-top:20px;color:var(--dim);font-size:1.06em}
.d-helder .h-contact-hours{display:grid;max-width:420px;margin-top:20px;font-size:15px}
.d-helder .h-contact-hours div{display:flex;justify-content:space-between;gap:16px;padding:8px 0;border-bottom:1.5px solid var(--line)}
.d-helder .h-contact-hours dd{color:var(--dim);text-align:right}
@media (min-width:1020px){.d-helder .h-contact-card:not(.is-solo){grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(40px,5vw,88px);align-items:center}}
.d-helder .h-cta-card{position:relative;overflow:hidden;display:grid;justify-items:center;gap:22px;padding:clamp(40px,7vw,112px) clamp(22px,5vw,80px);border-radius:var(--r-xl);background:var(--teal);color:var(--on);text-align:center}
.d-helder .h-cta-card::before{content:"";position:absolute;top:-200px;right:-150px;width:520px;height:520px;border-radius:50%;border:2px dashed rgba(255,255,255,.12)}
.d-helder .h-cta-card::after{content:"";position:absolute;left:-120px;bottom:-170px;width:400px;height:400px;border-radius:50%;background:#164846}
.d-helder .h-cta-card>*{position:relative;z-index:1}
.d-helder .h-cta-card h2{max-width:18ch}
.d-helder .h-cta-card p{max-width:36em;color:var(--on-dim);font-size:1.08em}
.d-helder .h-state{position:relative;overflow:hidden;display:grid;justify-items:center;gap:24px;padding:clamp(40px,7vw,112px) clamp(22px,5vw,80px);border-radius:var(--r-xl);background:var(--warm);text-align:center}
.d-helder .h-state::before{content:"";position:absolute;top:-160px;right:-140px;width:460px;height:460px;border-radius:50%;background:#ffe3d6}
.d-helder .h-state>*{position:relative}
.d-helder .h-state .h-tag{background:#fff}
.d-helder .h-state h2{max-width:24ch;font-size:clamp(28px,3.8vw,54px);line-height:1.12}
.d-helder .h-state h2.is-long{font-size:clamp(24px,2.9vw,42px);line-height:1.2}
.d-helder .h-state h2 em{background-image:linear-gradient(#ffc4b3,#ffc4b3)}
.d-helder .h-show{position:relative;overflow:hidden;display:grid;align-items:end;min-height:min(78svh,680px);border-radius:var(--r-xl);background:var(--mint)}
.d-helder .h-show.no-pic{min-height:0;padding-top:clamp(48px,8vw,120px)}
.d-helder .h-show-pic{position:absolute;inset:0;overflow:hidden}
.d-helder .h-show-pic img{position:absolute;left:0;top:-7%;width:100%;height:114%;object-fit:cover;transform:translateY(calc(var(--p,0) * -5%))}
.d-helder .h-show-card{position:relative;display:grid;justify-items:start;gap:16px;max-width:580px;margin:clamp(12px,2.4vw,32px);padding:clamp(22px,3vw,40px);border-radius:var(--r);background:#fff}
.d-helder .h-show-card h2{font-size:clamp(28px,3.4vw,48px)}
.d-helder .h-show-card p{color:var(--dim)}
.d-helder .h-faq-grid{display:grid;gap:8px}
@media (min-width:980px){.d-helder .h-faq-grid{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(40px,6vw,96px);align-items:start}.d-helder .h-faq-grid .h-head{position:sticky;top:110px}}
.d-helder .h-faq{display:grid;gap:10px}
.d-helder .h-q{border-radius:30px;background:var(--mint-2);box-shadow:inset 0 0 0 1.5px var(--line);transition:background-color .35s var(--ease),box-shadow .35s var(--ease)}
.d-helder .h-q[open]{background:var(--mint);box-shadow:none}
.d-helder .h-q summary{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:72px;padding:14px 14px 14px 26px;font-size:17.5px;font-weight:700;letter-spacing:-.02em;line-height:1.35;cursor:pointer;list-style:none}
.d-helder .h-q summary::-webkit-details-marker{display:none}
.d-helder .h-q[open] .h-plus{background:var(--teal);color:#fff;transform:rotate(135deg)}
.d-helder .h-q summary:hover .h-plus{transform:scale(1.08)}
.d-helder .h-q[open] summary:hover .h-plus{transform:rotate(135deg) scale(1.08)}
.d-helder .h-q p{max-width:62ch;padding:0 26px 24px;color:var(--dim);line-height:1.6}
.d-helder .z-card{border:0;border-radius:var(--r);background:var(--mint-2);box-shadow:inset 0 0 0 1.5px var(--line)}
.d-helder .z-dots b{font-weight:700}
.d-helder .z-price{padding:4px 12px;border-radius:999px;background:var(--mint);color:var(--teal);font-size:15px;font-weight:750}
.d-helder .z-channel{border:0;background:var(--mint-2);box-shadow:inset 0 0 0 1.5px var(--line);transition:transform .5s var(--soft),background-color .3s var(--ease)}
.d-helder .z-channel:hover{background:var(--mint);transform:translateY(-4px)}
.d-helder .z-ico{width:52px;height:52px;border:0;background:var(--mint);color:var(--teal)}
.d-helder .z-ba figcaption{border-radius:999px;padding:7px 14px;background:#fff;color:var(--teal);font-weight:650}
.d-helder .z-form{gap:20px}
.d-helder .z-fields{gap:14px}
.d-helder .z-field label{color:var(--teal);font-size:14px;font-weight:650;letter-spacing:0;text-transform:none}
.d-helder .z-field input,.d-helder .z-field select,.d-helder .z-field textarea{min-height:54px;padding:0 18px;border:1.5px solid var(--line);border-radius:18px;background-color:var(--mint-2);color:var(--teal);font-size:16px;transition:border-color .3s var(--ease),background-color .3s var(--ease)}
.d-helder .z-field textarea{padding-block:14px;line-height:1.5}
.d-helder .z-field select{padding-right:46px;background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 25px) 52%,calc(100% - 19px) 52%;background-size:6px 6px;background-repeat:no-repeat}
.d-helder .z-field :focus-visible{outline:none;border-color:var(--teal);background-color:#fff}
.d-helder .z-form .btn{justify-content:center;width:100%;min-height:62px;padding:7px 26px;text-align:center}
.d-helder .form-note{color:var(--dim);font-size:13px;text-align:center}
.d-helder .form-status{padding:14px 18px;border:0;border-radius:18px;background:var(--mint);color:var(--teal);font-weight:600}
.d-helder .h-foot .h-logo{max-width:100%;margin-right:0}
.d-helder .h-foot .h-logo-t b{line-height:1.15;white-space:normal}
.d-helder .h-foot-grid>nav{grid-column:1/-1}
@media (min-width:760px){.d-helder .h-foot-grid>nav{grid-column:span 2}}
@media (min-width:1160px){.d-helder .h-foot-grid{grid-template-columns:1.35fr .8fr 1.15fr 1.3fr}.d-helder .h-foot-grid[data-n="3"]{grid-template-columns:1.4fr .8fr 1.3fr}.d-helder .h-foot-grid>nav{grid-column:auto}}
.d-helder .h-foot-urgent>a{font-size:clamp(22px,2vw,27px)}
.d-helder .h-foot-urgent li{align-items:flex-start;overflow-wrap:anywhere}
.d-helder .h-foot-urgent li svg{margin-top:4px}
.d-helder .h-foot-route{margin-top:4px}
.d-helder .h-foot dl dt{min-width:0}
.d-helder .h-foot dd{white-space:normal;text-align:right}
`
  .replace(/\n/g, "")
  .trim();

/** Two small behaviours of the demo: the service tiles open one panel at a time; the steps line follows the chosen step. */
const JS = `(function(){var d=document,q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
q('.h-treat-grid').forEach(function(g){var bs=q('.h-treat button',g);bs.forEach(function(b){b.addEventListener('click',function(){var on=b.getAttribute('aria-expanded')!=='true';bs.forEach(function(x){var o=x===b&&on;x.setAttribute('aria-expanded',o?'true':'false');var p=d.getElementById(x.getAttribute('aria-controls'));if(p)p.hidden=!o})})})});
q('.h-steps').forEach(function(l){var ts=q('[role=tab]',l);function u(){var k=0;ts.forEach(function(t,j){if(t.getAttribute('aria-selected')==='true')k=j});l.style.setProperty('--at',ts.length>1?k/(ts.length-1):0);ts.forEach(function(t,j){t.classList.toggle('is-done',j<k)})}l.addEventListener('click',u);l.addEventListener('keyup',u)});
})();`.replace(/\n/g, "");

const plain = (t: string) => t.replace(/\*/g, "");
const arrow = (
  <i aria-hidden="true">
    <ArrowRight size={18} strokeWidth={2.2} />
  </i>
);

/** The demo's one button: a pill with a round arrow. */
function Go({ href, children, kind = "main" }: { href: string; children: ReactNode; kind?: "main" | "coral" | "light" }) {
  const ext = /^https?:/.test(href);
  return (
    <a className={`btn h-btn h-btn-${kind}`} href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span>{children}</span>
      {arrow}
    </a>
  );
}

function Ghost({ href, children }: { href: string; children: ReactNode }) {
  const ext = /^https?:/.test(href);
  return (
    <a className="btn h-btn h-btn-ghost" href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {/^tel:/.test(href) ? <Phone size={18} strokeWidth={1.9} aria-hidden="true" /> : null}
      {children}
    </a>
  );
}

const Tag = ({ children, rv = true }: { children: ReactNode; rv?: boolean }) => (
  <p className="h-tag" {...(rv ? { "data-rv": "" } : {})}>
    <i aria-hidden="true" />
    {children}
  </p>
);

const Mark = ({ c }: { c: Ctx }) => (
  <span className="h-mark" aria-hidden="true">
    {c.name.charAt(0).toUpperCase()}
  </span>
);

const IC = { size: 24, strokeWidth: 1.7, "aria-hidden": true } as const;

function Head(p: HeadProps) {
  return (
    <header className="h-head">
      {p.kicker ? <Tag>{p.kicker}</Tag> : null}
      <h2 id={p.id} className={long(p.title)} data-rv>
        {em(p.title)}
      </h2>
      {p.intro ? <p data-rv>{p.intro}</p> : null}
    </header>
  );
}

/** A head with the title on the left and the intro (or a photo) on the right, as the demo's sections open. */
function SplitHead({ kicker, title, side }: { kicker?: string; title: string; side?: ReactNode }) {
  return (
    <header className="h-head h-head-split">
      <div>
        {kicker ? <Tag>{kicker}</Tag> : null}
        <h2 className={long(title)} data-rv>
          {em(title)}
        </h2>
      </div>
      {side}
    </header>
  );
}

/** Navigation without galleries that have no photograph to show. */
function navOf(c: Ctx) {
  const real = new Set(c.spec.images.filter((im) => im.license !== "generated" && /^https:\/\//.test(im.src)).map((im) => im.key));
  const empty = new Set(c.spec.sections.filter((s) => s.type === "gallery" && !s.images.some((r) => real.has(r))).map((s) => s.id));
  return c.nav.filter((n) => !empty.has(n.id));
}

const openDay = (c: Ctx) => heroFacts(c).find((f) => f.label === c.t.hours)?.value as string | undefined;

/** Column spans on a 12-column grid for n cards, rows of at most three. */
function spans(n: number): number[] {
  if (n <= 3) return Array.from({ length: n }, () => 12 / n);
  if (n === 4) return [6, 6, 6, 6];
  if (n === 5) return [4, 4, 4, 6, 6];
  return Array.from({ length: n }, (_, k) => (k < n - (n % 3 || 3) ? 4 : 12 / (n % 3 || 3)));
}

function Contacts({ c, light }: { c: Ctx; light?: boolean }) {
  const b = c.spec.business;
  if (!b.phone && !b.email && !b.address) return null;
  const where = (
    <>
      <span className="h-ic">
        <MapPin {...IC} />
      </span>
      <span>
        <small>{c.t.address}</small>
        <b>{b.address}</b>
      </span>
    </>
  );
  return (
    <ul className={`h-contact${light ? " is-light" : ""}`} data-rv="kids">
      {b.phone ? (
        <li>
          <a href={tel(b.phone)}>
            <span className="h-ic">
              <Phone {...IC} />
            </span>
            <span>
              <small>{c.t.phone}</small>
              <b>{b.phone}</b>
            </span>
          </a>
        </li>
      ) : null}
      {b.email ? (
        <li>
          <a href={`mailto:${b.email}`}>
            <span className="h-ic">
              <Mail {...IC} />
            </span>
            <span>
              <small>{c.t.email}</small>
              <b>{b.email}</b>
            </span>
          </a>
        </li>
      ) : null}
      {b.address ? (
        <li>
          {b.mapsUrl ? (
            <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`${b.address}, ${c.t.route}`}>
              {where}
            </a>
          ) : (
            <div>{where}</div>
          )}
        </li>
      ) : null}
    </ul>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const nav = navOf(c);
  const hours = openDay(c);
  return (
    <>
      <header className="h-nav hdr">
        <a href="#top" className={`h-logo${c.name.length > 18 ? " is-long" : ""}`} aria-label={c.name}>
          <Mark c={c} />
          <span className="h-logo-t">
            <b>{c.name}</b>
            {b.city && !c.name.toLowerCase().includes(b.city.toLowerCase()) ? <small>{b.city}</small> : null}
          </span>
        </a>
        <nav aria-label={c.t.menu} className="h-links" data-nav>
          {nav.slice(0, 5).map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        {b.phone ? (
          <a href={tel(b.phone)} className="h-nav-tel">
            <Phone size={17} strokeWidth={1.9} aria-hidden="true" />
            {b.phone}
          </a>
        ) : null}
        <a href={cta.href} className={`btn h-nav-cta${cta.label.length > 16 ? " is-long" : ""}`}>
          {cta.label}
        </a>
        <button type="button" className="h-burger menu-btn" aria-expanded="false" aria-controls="h-menu" aria-label={c.t.menu}>
          <i aria-hidden="true" />
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="h-menu" className="h-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              {n.label}
              <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="h-menu-foot">
          {hours ? <p>{hours}</p> : null}
          <Go href={cta.href}>{cta.label}</Go>
          {b.phone ? <Ghost href={tel(b.phone)}>{b.phone}</Ghost> : null}
        </div>
      </div>
    </>
  );
}

/** The headline as words that rise one by one; one word carries the coral marker. */
function words(text: string) {
  const out: { w: string; hl: boolean }[] = [];
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => out.push({ w, hl: n % 2 === 1 })),
  );
  if (!out.some((x) => x.hl) && out.length > 2) {
    const len = (w: string) => w.replace(/[.,;:!?'"’“”()]/g, "").length;
    let k = 0;
    out.forEach((x, j) => {
      if (len(x.w) >= len(out[k].w)) k = j;
    });
    out[k].hl = true;
  }
  return out;
}

type Need = { href: string; icon: ReactNode; b: string; small: string };

/** Three ways in, taken from what the site really offers. */
function needs(c: Ctx): Need[] {
  const b = c.spec.business;
  const out: Need[] = [];
  const label = (s: { title: string; type: string }) => (plain(s.title).length <= 24 ? plain(s.title) : c.t.kick[s.type as keyof typeof c.t.kick] || plain(s.title));
  if (b.phone && !/^tel:/.test(c.spec.hero.secondaryCta?.href ?? "tel:")) out.push({ href: tel(b.phone), icon: <Phone {...IC} />, b: c.t.call, small: b.phone });
  const order = ["services", "booking", "process", "features", "team", "faq", "hours", "contact"];
  const secs = [...c.spec.sections].filter((s) => order.includes(s.type)).sort((x, y) => order.indexOf(x.type) - order.indexOf(y.type));
  for (const s of secs) {
    if (out.length >= 3) break;
    const href = `#${s.id}`;
    if (s.type === "services") out.push({ href, icon: <Icon name={s.items[0].icon} />, b: label(s), small: s.items.slice(0, 3).map((x) => x.title).join(" · ") });
    else if (s.type === "booking") out.push({ href, icon: <CalendarCheck {...IC} />, b: label(s), small: s.body || s.options.slice(0, 3).join(" · ") });
    else if (s.type === "process") out.push({ href, icon: <Route {...IC} />, b: label(s), small: s.steps.slice(0, 3).map((x) => x.title).join(" · ") });
    else if (s.type === "features") out.push({ href, icon: <Icon name={s.items[0].icon} />, b: label(s), small: s.items.slice(0, 3).map((x) => x.title).join(" · ") });
    else if (s.type === "team") out.push({ href, icon: <Users {...IC} />, b: label(s), small: s.members.slice(0, 3).map((x) => x.name).join(" · ") });
    else if (s.type === "faq") out.push({ href, icon: <MessageCircle {...IC} />, b: label(s), small: s.items[0].q });
    else if (s.type === "hours" && openDay(c)) out.push({ href, icon: <Clock {...IC} />, b: label(s), small: openDay(c)! });
    else if (s.type === "contact") out.push({ href, icon: <MapPin {...IC} />, b: label(s), small: b.address ?? s.body });
  }
  return out.filter((n) => n.small);
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const b = c.spec.business;
  const p = c.photo(hero.image);
  const len = plain(hero.headline).length;
  const size = len > 64 ? "is-s" : len > 40 ? "is-m" : undefined;
  const list = words(hero.headline);
  const facts = heroFacts(c);
  const hours = openDay(c);
  const ways = needs(c);
  const second = hero.secondaryCta ?? (b.phone ? { label: b.phone, href: tel(b.phone) } : null);
  const factIcon = (label: string) => (label === c.t.hours ? <Clock {...IC} /> : label === c.t.phone ? <Phone {...IC} /> : <MapPin {...IC} />);
  return (
    <section className="h-hero h-panel">
      <span className="h-orb h-orb-a" aria-hidden="true" data-px />
      <span className="h-orb h-orb-b" aria-hidden="true" data-px />
      <div className="h-wrap">
        <div className={`h-hero-grid${p || facts.length ? "" : " is-solo"}`}>
          <div className="h-hero-copy">
            {hero.eyebrow ? (
              <p className="h-tag h-rise" style={i(0)}>
                <i aria-hidden="true" />
                {hero.eyebrow}
              </p>
            ) : null}
            <h1 className={size}>
              {list.map((x, n) => (
                <span key={n}>
                  <span className={x.hl ? "h-w h-w-hl" : "h-w"} style={i(Math.min(n, 12))}>
                    {x.w}
                  </span>{" "}
                </span>
              ))}
            </h1>
            <p className="h-lede h-rise" style={i(5)}>
              {hero.subheadline}
            </p>
            <div className="h-cta h-rise" style={i(6)}>
              <Go href={hero.primaryCta.href}>{hero.primaryCta.label}</Go>
              {second ? <Ghost href={second.href}>{second.label}</Ghost> : null}
            </div>
            {p && hours ? (
              <p className="h-hero-note h-rise" style={i(7)}>
                <Clock size={17} strokeWidth={1.9} aria-hidden="true" />
                {hours}
              </p>
            ) : null}
          </div>
          {p ? (
            <div className="h-hero-visual">
              <span className="h-ring" aria-hidden="true" />
              <figure className="h-hero-photo">
                <Pic p={p} eager sizes="(min-width: 980px) 44vw, 94vw" />
              </figure>
              {b.city || b.address ? (
                <div className="h-float h-float-a">
                  <div>
                    <span className="h-ic">
                      <MapPin {...IC} />
                    </span>
                    <p>
                      <b>{c.t.address}</b>
                      <span>{b.city ?? b.address}</span>
                    </p>
                  </div>
                </div>
              ) : null}
              {b.phone ? (
                <div className="h-float h-float-b">
                  <div>
                    <span className="h-ic">
                      <Phone {...IC} />
                    </span>
                    <p>
                      <b>{c.t.phone}</b>
                      <span>{b.phone}</span>
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          ) : facts.length ? (
            <div className="h-hero-visual is-card">
              <span className="h-ring" aria-hidden="true" />
              <div className="h-hero-card">
                <p className="h-tag">
                  <i aria-hidden="true" />
                  {c.name}
                </p>
                {facts.map((f) => (
                  <div key={f.label} className="h-fact">
                    <span className="h-ic">{factIcon(f.label)}</span>
                    <span>
                      <small>{f.label}</small>
                      <b>{f.value}</b>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        {ways.length >= 2 ? (
          <ul className="h-needs" data-n={ways.length}>
            {ways.map((w, n) => (
              <li key={w.href} className="h-rise" style={i(8 + n)}>
                <a href={w.href} className={`h-need h-need-${"abc"[n]}`}>
                  <span className="h-ic">{w.icon}</span>
                  <span>
                    <b>{w.b}</b>
                    <small>{w.small}</small>
                  </span>
                  <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const nav = navOf(c);
  const cta = c.spec.hero.primaryCta;
  const hours = b.openingHours?.length ? hoursRows(b.openingHours.slice(0, 8)) : [];
  const reach = b.phone || b.email || b.address;
  return (
    <footer className="h-foot">
      <div className="h-wrap">
        <div className="h-foot-grid" data-n={2 + (hours.length ? 1 : 0) + (reach ? 1 : 0)}>
          <div className="h-foot-brand">
            <a href="#top" className={`h-logo${c.name.length > 18 ? " is-long" : ""}`} aria-label={c.name}>
              <Mark c={c} />
              <span className="h-logo-t">
                <b>{c.name}</b>
                {b.city && !c.name.toLowerCase().includes(b.city.toLowerCase()) ? <small>{b.city}</small> : null}
              </span>
            </a>
            {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : <p>{c.spec.business.tagline}</p>}
            <Go href={cta.href}>{cta.label}</Go>
          </div>
          <nav aria-label={c.t.explore}>
            <h3>{c.t.explore}</h3>
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          {hours.length ? (
            <div className="h-foot-hours">
              <h3>{c.t.hours}</h3>
              <dl>
                {hours.map(([d, t], n) => (
                  <div key={n}>
                    <dt>{d}</dt>
                    <dd>{t}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
          {reach ? (
            <div className="h-foot-urgent">
              <h3>
                <Phone size={20} strokeWidth={1.8} aria-hidden="true" />
                {c.t.contact}
              </h3>
              {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
              <ul>
                {b.email ? (
                  <li>
                    <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                    <a href={`mailto:${b.email}`}>{b.email}</a>
                  </li>
                ) : null}
                {b.address ? (
                  <li>
                    <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                    <span>{b.address}</span>
                  </li>
                ) : null}
              </ul>
              {b.mapsUrl ? (
                <p className="h-foot-route">
                  <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="h-link">
                    {c.t.route}
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
        <Legal c={c} className="h-legal" />
      </div>
    </footer>
  );
}

/* ── Sections ── */

function services(s: SectionOf<"services">, c: Ctx) {
  const pics = s.items.map((_, n) => c.photo(`art:svc${n}`));
  const pill = c.spare();
  const n = s.items.length;
  const cta = c.spec.hero.primaryCta;
  return (
    <section className="h-sec" id={s.id}>
      <div className="h-wrap">
        <header className="h-head h-head-split">
          <div>
            <Tag>{c.t.kick.services}</Tag>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {s.intro ? <p data-rv>{s.intro}</p> : null}
          </div>
          {pill ? (
            <figure className="h-pill-photo" data-rv="img">
              <Pic p={pill} sizes="(min-width: 980px) 30vw, 70vw" />
            </figure>
          ) : null}
        </header>
        <div className={`h-treat-grid${n === 1 ? " is-one" : n === 2 || n === 4 ? " is-two" : ""}`} data-rv="kids">
          {s.items.map((it, k) => {
            const p = pics[k];
            return [
              <h3 key={`t${k}`} className="h-treat">
                <button type="button" id={`${s.id}-b-${k}`} aria-expanded={k === 0} aria-controls={`${s.id}-p-${k}`}>
                  <span className="h-ic">
                    <Icon name={it.icon} />
                  </span>
                  <span className="h-treat-t">
                    <b>{it.title}</b>
                    {it.duration || it.price ? <small>{[it.duration, it.price].filter(Boolean).join(" · ")}</small> : null}
                  </span>
                  <span className="h-plus" aria-hidden="true">
                    <Plus size={18} strokeWidth={2.2} />
                  </span>
                </button>
              </h3>,
              <div key={`p${k}`} className="h-treat-panel" id={`${s.id}-p-${k}`} role="region" aria-labelledby={`${s.id}-b-${k}`} hidden={k !== 0} style={css({ "--c3": k % 3, "--c2": k % 2 })}>
                <div className={`h-treat-in${p ? " has-pic" : ""}`}>
                  {p ? (
                    <figure className="h-treat-pic">
                      <Pic p={p} sizes="(min-width: 760px) 34vw, 90vw" />
                    </figure>
                  ) : null}
                  <div className="h-treat-copy">
                    <h4>{it.title}</h4>
                    <p>{it.description}</p>
                  </div>
                </div>
                <div className="h-treat-foot">
                  {it.duration ? (
                    <span className="h-chip">
                      <Clock size={16} strokeWidth={1.9} aria-hidden="true" />
                      {it.duration}
                    </span>
                  ) : null}
                  {it.price ? <span className="h-chip">{it.price}</span> : null}
                  <Go href={cta.href}>{cta.label}</Go>
                </div>
              </div>,
            ];
          })}
        </div>
      </div>
    </section>
  );
}

function features(s: SectionOf<"features">, c: Ctx) {
  const p = c.spare();
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <section className="h-calm h-sec h-sec-card" id={s.id}>
      <div className="h-wrap">
        <div className={`h-calm-card${p ? "" : " is-solo"}`}>
          <div className="h-calm-copy">
            <Tag>{c.t.kick.features}</Tag>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {s.intro ? (
              <p className="h-calm-lede" data-rv>
                {s.intro}
              </p>
            ) : null}
            <ul className="h-calm-list" data-rv="kids">
              {s.items.map((it, n) => (
                <li key={n}>
                  <span className="h-ic">
                    <Icon name={it.icon} />
                  </span>
                  <div>
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="h-cta" data-rv>
              <Go href={cta.href}>{cta.label}</Go>
              {b.phone ? <Ghost href={tel(b.phone)}>{b.phone}</Ghost> : null}
            </div>
          </div>
          {p ? (
            <div className="h-calm-side">
              <figure className="h-calm-pic" data-rv="img">
                <Pic p={p} sizes="(min-width: 1020px) 30vw, 86vw" />
              </figure>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function processSec(s: SectionOf<"process">, c: Ctx) {
  const p = c.spare();
  const n = s.steps.length;
  const tab = (k: number) => `${s.id}-tab-${k}`;
  const cta = c.spec.hero.primaryCta;
  const pad = (k: number) => String(k).padStart(2, "0");
  return (
    <section className="h-visit h-dark h-panel" id={s.id}>
      <div className="h-wrap">
        <SplitHead kicker={c.t.kick.process} title={s.title} side={s.intro ? <p data-rv>{s.intro}</p> : undefined} />
        <div className="h-visit-box" data-rv>
          <div className="h-steps" role="tablist" aria-label={plain(s.title)} style={css({ "--at": 0, "--n": n })}>
            <span className="h-steps-line" aria-hidden="true">
              <i />
            </span>
            {s.steps.map((st, k) => (
              <button key={k} type="button" role="tab" id={tab(k)} aria-selected={k === 0} aria-controls={`${s.id}-step-${k}`} tabIndex={k === 0 ? 0 : -1}>
                <span className="h-step-n">{k + 1}</span>
                <span className="h-step-l">{st.title}</span>
              </button>
            ))}
          </div>
          <div className={`h-step-panel${p ? "" : " is-solo"}`}>
            {p ? (
              <div className="h-step-photo">
                <Pic p={p} className="is-on" sizes="(min-width: 980px) 42vw, 92vw" />
              </div>
            ) : null}
            <div className="h-step-copy">
              {s.steps.map((st, k) => (
                <div key={k} id={`${s.id}-step-${k}`} role="tabpanel" aria-labelledby={tab(k)} className="h-step-text" hidden={k !== 0}>
                  <p className="h-step-count">
                    {pad(k + 1)} / {pad(n)}
                  </p>
                  <h3>{st.title}</h3>
                  <p>{st.description}</p>
                </div>
              ))}
              <div className="h-step-nav">
                <Go href={cta.href} kind="coral">
                  {cta.label}
                </Go>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function team(s: SectionOf<"team">, c: Ctx) {
  const n = s.members.length;
  return (
    <section className="h-sec" id={s.id}>
      <div className="h-wrap">
        <SplitHead kicker={c.t.kick.team} title={s.title} side={s.intro ? <p data-rv>{s.intro}</p> : undefined} />
        <ul className="h-team" data-rv="kids" data-cols={n <= 4 ? n : 3} style={css({ "--cols": n <= 4 ? n : 3 })}>
          {s.members.map((m, k) => {
            const p = c.photo(m.image);
            return (
              <li key={k} className="h-member">
                <div className="h-member-pic">
                  {p ? (
                    <Pic p={p} sizes="(min-width: 900px) 22vw, 70vw" />
                  ) : (
                    <span className="h-member-ini" aria-hidden="true">
                      {m.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3>{m.name}</h3>
                <p className="h-member-role">{m.role}</p>
                {m.bio ? <p>{m.bio}</p> : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

type Cell = { node: (style: ReturnType<typeof css>, cls: string) => ReactNode; photo: boolean };

function about(s: SectionOf<"about">, c: Ctx) {
  const a = c.photo(s.image);
  const [first, ...rest] = s.paragraphs;
  const cells: Cell[] = [];
  if (rest.length)
    cells.push({
      photo: false,
      node: (st, cls) => (
        <div key="t" className={`h-tile h-tile-mint ${cls}`} data-rv style={st}>
          {rest.map((x, n) => (
            <p key={n}>{x}</p>
          ))}
        </div>
      ),
    });
  if (s.highlights.length)
    cells.push({
      photo: false,
      node: (st, cls) => (
        <div key="h" className={`h-tile h-tile-teal ${cls}`.trim()} data-rv style={st}>
          <span className="h-ic">
            <Check {...IC} />
          </span>
          <ul>
            {s.highlights.map((h) => (
              <li key={h}>
                <Check size={18} strokeWidth={2.4} aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      ),
    });
  const extra = a && cells.length >= 1 ? c.spare() : null;
  if (extra)
    cells.push({
      photo: true,
      node: (st, cls) => (
        <figure key="x" className={cls} data-rv="img" style={st}>
          <Pic p={extra} sizes="(min-width: 900px) 40vw, 94vw" />
        </figure>
      ),
    });
  const k = cells.length;
  const out: ReactNode[] = [];
  if (a)
    out.push(
      <figure key="a" className={k ? "" : "is-wide"} data-rv="img" data-px style={css({ "--cs": k ? 7 : 12, "--rs": k >= 2 ? 2 : 1 })}>
        <Pic p={a} sizes="(min-width: 900px) 56vw, 94vw" />
      </figure>,
    );
  cells.forEach((cell, n) => {
    const cs = a ? (n === 2 ? 12 : 5) : 12 / k;
    out.push(cell.node(css({ "--cs": cs, "--rs": 1 }), cs === 12 ? (cell.photo ? "is-wide" : "is-row") : ""));
  });
  return (
    <section className="h-sec" id={s.id}>
      <div className="h-wrap">
        <SplitHead kicker={c.t.kick.about} title={s.title} side={<p data-rv>{first}</p>} />
        {out.length ? <div className={`h-bento h-grid${a ? "" : " is-flat"}`}>{out}</div> : null}
      </div>
    </section>
  );
}

function gallery(s: SectionOf<"gallery">, c: Ctx) {
  const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
  if (!pics.length) return null;
  const n = pics.length;
  const layout: [number, number][] = n === 1 ? [[12, 1]] : n === 2 ? [[7, 1], [5, 1]] : [[7, 2], [5, 1], [5, 1], ...spans(n - 3).map((x): [number, number] => [x, 1])];
  return (
    <section className="h-sec" id={s.id}>
      <div className="h-wrap">
        {c.head({ kicker: c.t.kick.gallery, title: s.title })}
        <div className="h-bento h-grid h-gal">
          {pics.map((p, k) => (
            <figure key={k} className={layout[k][0] === 12 ? "is-wide" : undefined} data-rv="img" {...(k % 2 === 0 ? { "data-px": "" } : {})} style={css({ "--cs": layout[k][0], "--rs": layout[k][1] })}>
              <Pic p={p} sizes={layout[k][0] >= 7 ? "(min-width: 900px) 56vw, 94vw" : "(min-width: 900px) 36vw, 47vw"} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function testimonials(s: SectionOf<"testimonials">, c: Ctx) {
  const sp = spans(s.items.length);
  return (
    <section className="h-sec" id={s.id}>
      <div className="h-wrap">
        {c.head({ kicker: c.t.kick.testimonials, title: s.title })}
        <div className="h-voices">
          {s.items.map((q, k) => (
            <figure key={k} className={`${k === 0 ? "h-voice h-voice-b" : "h-bubble"}${q.quote.length > 200 ? " is-long" : ""}`} data-rv style={css({ "--cs": sp[k], "--i": k % 3 })}>
              <blockquote>
                <p>“{q.quote}”</p>
              </blockquote>
              <figcaption>
                <i aria-hidden="true">{q.author.charAt(0).toUpperCase()}</i>
                <span>
                  <b>{q.author}</b>
                  <small>
                    <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {c.t.source}: {q.source}
                    </a>
                  </small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function packages(s: SectionOf<"packages">, c: Ctx) {
  return (
    <section className="h-fee-sec h-panel" id={s.id}>
      <div className="h-wrap">
        {c.head({ kicker: c.t.kick.packages, title: s.title, intro: s.intro })}
        <div className="h-packs">
          {s.items.map((it, k) => (
            <div key={k} className={`h-pack${it.featured ? " is-featured" : ""}`} data-rv style={i(k % 4)}>
              {it.featured ? <span className="h-pack-tag">{c.t.popular}</span> : null}
              <h3>{it.name}</h3>
              <p className="h-pack-price">
                {it.price ? (
                  <>
                    <strong>{it.price}</strong>
                    {it.unit ? <span>{it.unit}</span> : null}
                  </>
                ) : (
                  <strong>{c.t.onRequest}</strong>
                )}
              </p>
              {it.description ? <p>{it.description}</p> : null}
              {it.features.length ? (
                <ul>
                  {it.features.map((f) => (
                    <li key={f}>
                      <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
        {s.note ? (
          <p className="h-small" data-rv>
            {s.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function booking(s: SectionOf<"booking">, c: Ctx) {
  return (
    <section className="h-book h-dark h-panel" id={s.id}>
      <div className="h-wrap h-book-grid">
        <div className="h-book-copy">
          <Tag>{c.t.kick.booking}</Tag>
          <h2 className={long(s.title)} data-rv>
            {em(s.title)}
          </h2>
          {s.body ? <p data-rv>{s.body}</p> : null}
          <Contacts c={c} />
          <Hours c={c} className="h-book-hours" />
        </div>
        <div className="h-book-card" data-rv>
          <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
        </div>
      </div>
    </section>
  );
}

function hours(s: SectionOf<"hours">, c: Ctx) {
  const lines = c.spec.business.openingHours;
  return (
    <section className="h-fee-sec h-panel" id={s.id}>
      <div className="h-wrap h-fee-grid">
        <div className="h-fee-copy">
          <Tag>{c.t.kick.hours}</Tag>
          <h2 className={long(s.title)} data-rv>
            {em(s.title)}
          </h2>
          {s.note ? <p data-rv>{s.note}</p> : null}
          <Contacts c={c} light />
        </div>
        <div className="h-fee-card h-hours-card" data-rv>
          <p className="h-fees-count">{c.t.hours}</p>
          {lines?.length ? (
            <ul className="h-fee-list">
              {hoursRows(lines).map(([d, t], k) => (
                <li key={k} style={i(k)}>
                  <div>
                    <b>{d}</b>
                  </div>
                  {t ? <strong>{t}</strong> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="h-hours-tbc">{c.t.hoursTbc}</p>
          )}
        </div>
      </div>
    </section>
  );
}

function contact(s: SectionOf<"contact">, c: Ctx) {
  const showHours = !c.spec.sections.some((x) => x.type === "hours" || x.type === "booking");
  return (
    <section className="h-sec h-sec-card" id={s.id}>
      <div className="h-wrap">
        <div className={`h-contact-card${s.showForm ? "" : " is-solo"}`}>
          <div className="h-contact-copy">
            <Tag>{c.t.kick.contact}</Tag>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Contacts c={c} light />
            {showHours ? <Hours c={c} className="h-contact-hours" /> : null}
          </div>
          {s.showForm ? (
            <div className="h-book-card" data-rv>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export const helder: Family = {
  key: "helder",
  root: "d-helder",
  fonts: ["Plus Jakarta Sans"],
  themeColor: "#ffffff",
  accent: "#ff8a70",
  onAccent: "#0f3b3a",
  css: CSS,
  extra: EXTRA,
  js: JS,
  cls: { wrap: "h-wrap", eyebrow: "h-tag", btn: "h-btn h-btn-main", btnAlt: "h-btn h-btn-ghost", btnText: "h-link" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    services,
    features,
    process: processSec,
    team,
    about,
    gallery,
    testimonials,
    packages,
    booking,
    hours,
    contact,
    faq: (s, c) => (
      <section className="h-sec" id={s.id}>
        <div className="h-wrap h-faq-grid">
          <Head kicker={c.t.kick.faq} title={s.title} />
          <div className="h-faq" data-acc>
            {s.items.map((it, n) => (
              <details key={n} className="h-q" data-rv style={i(n % 4)}>
                <summary>
                  <span>{it.q}</span>
                  <span className="h-plus" aria-hidden="true">
                    <Plus size={18} strokeWidth={2.2} />
                  </span>
                </summary>
                <p>{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    ),
    cta: (s) => (
      <section className="h-sec h-sec-card" id={s.id}>
        <div className="h-wrap">
          <div className="h-cta-card h-dark">
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {s.body ? <p data-rv>{s.body}</p> : null}
            <div data-rv>
              <Go href={s.cta.href} kind="coral">
                {s.cta.label}
              </Go>
            </div>
          </div>
        </div>
      </section>
    ),
    statement: (s) => (
      <section className="h-sec h-sec-card" id={s.id}>
        <div className="h-wrap">
          <div className="h-state">
            {s.note ? <Tag>{s.note}</Tag> : null}
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
          </div>
        </div>
      </section>
    ),
    showcase: (s, c) => {
      const p = c.photo(s.image);
      return (
        <section className="h-sec h-sec-card" id={s.id}>
          <div className="h-wrap">
            <div className={`h-show${p ? "" : " no-pic"}`}>
              {p ? (
                <figure className="h-show-pic" data-px>
                  <Pic p={p} sizes="(min-width: 1344px) 1300px, 96vw" />
                </figure>
              ) : null}
              <div className="h-show-card" data-rv>
                <h2 className={long(s.title)}>{em(s.title)}</h2>
                {s.body ? <p>{s.body}</p> : null}
                {s.cta ? <Go href={s.cta.href}>{s.cta.label}</Go> : null}
              </div>
            </div>
          </div>
        </section>
      );
    },
  },
};
