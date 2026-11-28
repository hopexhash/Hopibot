import type { ReactNode } from "react";
import { NowBadge, TODAY_JS } from "./today";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, offerWords, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Ledger: an original template (no portfolio demo). The front page of a broadsheet: newsprint
 * cream, black ink and one deep red. The opening is a masthead with the business's name and the
 * visitor's own date, a banner headline whose letters are pressed onto the page one by one in
 * fresh red ink, and a front-page photograph that rolls off the press in black and white (it
 * prints in colour under the cursor). Services are numbered articles in ruled columns, the
 * about text is a feature with a drop cap and a pull quote taken from the business's own words,
 * contact is a page of classified ads and booking is a coupon to cut out. A red reading line
 * under the header follows the scroll. Made for accountants, lawyers, consultants, financial and
 * tax advisers.
 */

const CSS = `
.d-ledger{--paper:#f2ede1;--paper2:#e6dfcd;--sheet:#f8f5ed;--ink:#16130f;--ink2:#2b2721;--dim:#58524a;--red:#a3161b;--red-d:#7d1014;--hair:rgba(22,19,15,.2);--hair-l:rgba(248,245,237,.22);--serif:"DM Serif Display",Georgia,serif;--text:"Lora",Georgia,serif;--label:"Archivo Narrow","Arial Narrow",sans-serif;--pad:clamp(16px,4vw,56px);--ease:cubic-bezier(.2,.7,.2,1);--press:cubic-bezier(.6,0,.2,1);--z-bg2:var(--sheet);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--hair);--z-accent:var(--red);--z-on-accent:#f8f5ed;--z-display:var(--serif);--z-radius:0px;--z-field-radius:0px;--z-ico-radius:0px;--z-sec:clamp(64px,8vw,120px);--z-h3:clamp(21px,1.8vw,27px);--z-statement:clamp(30px,4vw,60px);--z-display-weight:400;background-color:var(--paper);background-image:radial-gradient(rgba(22,19,15,.045) .7px,transparent .8px);background-size:4px 4px;color:var(--ink);font-family:var(--text);font-size:clamp(16px,1.04vw,18px);line-height:1.62}
.d-ledger ::selection{background:var(--red);color:#f8f5ed}
.d-ledger h1,.d-ledger h2,.d-ledger h3{font-family:var(--serif);font-weight:400;line-height:1.04;letter-spacing:-.005em}
.d-ledger h2{font-size:clamp(34px,4.6vw,68px)}
.d-ledger h2.is-long{font-size:clamp(28px,3.4vw,50px);line-height:1.08}
.d-ledger h1 em,.d-ledger h2 em,.d-ledger h3 em{font-style:normal;color:var(--red)}
.d-ledger .lg-wrap{position:relative;width:min(100%,1340px);margin-inline:auto;padding-inline:var(--pad)}
.d-ledger .lg-kick{display:inline-flex;align-items:center;gap:10px;font-family:var(--label);font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--red)}
.d-ledger .lg-kick::before{content:"";width:9px;height:9px;background:currentColor}
.d-ledger .lg-label{font-family:var(--label);font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.d-ledger .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:52px;padding:0 26px;font-family:var(--label);font-size:15px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;overflow:hidden;isolation:isolate;transition:color .3s,background-color .3s,border-color .3s}
.d-ledger .btn svg{width:18px;height:18px;transition:transform .4s var(--ease)}
.d-ledger .btn:hover svg{transform:translateX(5px)}
.d-ledger .lg-fill{border:1px solid var(--ink);background:var(--ink);color:var(--sheet)}
.d-ledger .lg-fill::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--red);transform:scaleX(0);transform-origin:0 50%;transition:transform .5s var(--ease)}
.d-ledger .lg-fill:hover{border-color:var(--red)}
.d-ledger .lg-fill:hover::before{transform:none}
.d-ledger .lg-line{border:1px solid var(--ink);background:transparent;color:var(--ink)}
.d-ledger .lg-line:hover{background:var(--ink);color:var(--sheet)}
.d-ledger .lg-text{display:inline-flex;align-items:center;gap:10px;min-height:44px;font-family:var(--label);font-size:15px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;background:linear-gradient(var(--red),var(--red)) 0 calc(100% - 6px)/100% 2px no-repeat;transition:background-size .35s var(--ease),color .3s}
.d-ledger .lg-text:hover{color:var(--red);background-size:100% 4px}
.d-ledger .lg-hdr{position:sticky;top:0;z-index:40;background:rgba(242,237,225,.94);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-bottom:1px solid var(--hair);transition:background-color .3s,border-color .3s}
.d-ledger.is-scrolled .lg-hdr{border-color:var(--ink)}
.d-ledger .lg-bar{display:flex;align-items:center;gap:20px;height:62px}
.d-ledger .lg-slot{position:relative;flex:1 1 0;min-width:0;align-self:stretch}
.d-ledger .lg-slot.is-end{display:flex;align-items:center;justify-content:flex-end;gap:12px}
.d-ledger .lg-hdate,.d-ledger .lg-mini{position:absolute;left:0;top:50%;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:opacity .45s,transform .6s var(--ease)}
.d-ledger .lg-hdate{font-family:var(--label);font-size:12.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);transform:translateY(-50%)}
.d-ledger .lg-hdate[hidden]{display:none}
.d-ledger .lg-mini{font-family:var(--serif);font-size:23px;line-height:1.3;transform:translateY(-50%)}
.d-ledger .lg-links{display:none;gap:2px}
.d-ledger .lg-links a{position:relative;display:inline-flex;align-items:center;min-height:44px;padding:0 13px;font-family:var(--label);font-size:13.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:color .25s}
.d-ledger .lg-links a::after{content:"";position:absolute;left:13px;right:13px;bottom:9px;height:2px;background:var(--red);transform:scaleX(0);transform-origin:100% 50%;transition:transform .4s var(--ease)}
.d-ledger .lg-links a:hover{color:var(--red)}
.d-ledger .lg-links a:hover::after{transform:none;transform-origin:0 50%}
.d-ledger .lg-cta{display:none;min-height:44px;padding:0 18px;font-size:13px}
.d-ledger .lg-burger{display:inline-flex;align-items:center;gap:12px;min-height:46px;padding:0 16px;border:1px solid var(--ink);background:var(--sheet);font-family:var(--label);font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;transition:background-color .25s,color .25s}
.d-ledger .lg-burger:hover{background:var(--ink);color:var(--sheet)}
.d-ledger .lg-burger i{position:relative;width:20px;height:12px;border-top:2px solid currentColor;border-bottom:2px solid currentColor;transition:border-color .2s}
.d-ledger .lg-burger i::before,.d-ledger .lg-burger i::after{content:"";position:absolute;left:0;top:3px;width:100%;height:2px;background:currentColor;transition:transform .4s var(--ease)}
.d-ledger.menu-open .lg-burger i{border-color:transparent}
.d-ledger.menu-open .lg-burger i::before{transform:rotate(45deg)}
.d-ledger.menu-open .lg-burger i::after{transform:rotate(-45deg)}
.d-ledger .lg-progress{position:absolute;left:0;right:0;bottom:-1px;height:3px;background:var(--red);transform:scaleX(var(--read,0));transform-origin:0 50%;pointer-events:none}
@media (min-width:1000px){.d-ledger .lg-links,.d-ledger .lg-cta{display:inline-flex}.d-ledger .lg-burger{display:none}.d-ledger .lg-mini{opacity:0;transform:translateY(-10%)}.d-ledger.is-scrolled .lg-mini{opacity:1;transform:translateY(-50%)}.d-ledger.is-scrolled .lg-hdate{opacity:0;transform:translateY(-130%)}}
@media (max-width:999px){.d-ledger .lg-hdate{display:none}.d-ledger .lg-mini{font-size:21px}}
.d-ledger .lg-drawer{position:fixed;inset:0;z-index:39;display:flex;flex-direction:column;gap:26px;padding:92px var(--pad) 120px;background:var(--sheet);color:var(--ink);overflow-y:auto;transform-origin:50% 0;transform:perspective(1600px) rotateX(-82deg);opacity:0;visibility:hidden;transition:transform .7s var(--ease),opacity .45s,visibility 0s .7s}
.d-ledger .lg-drawer.is-open{transform:none;opacity:1;visibility:visible;transition:transform .85s var(--ease),opacity .3s}
.d-ledger .lg-drawer-plate{padding:14px 0 12px;border-top:4px double var(--ink);border-bottom:1px solid var(--ink);font-family:var(--serif);font-size:clamp(30px,9vw,54px);line-height:1.02;text-align:center;text-wrap:balance}
.d-ledger .lg-drawer-date{margin-top:-14px;text-align:center;color:var(--dim)}
.d-ledger .lg-drawer nav{display:grid}
.d-ledger .lg-drawer nav a{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:baseline;gap:14px;min-height:58px;padding:14px 0;border-bottom:1px solid var(--hair);font-family:var(--serif);font-size:clamp(26px,7vw,40px);line-height:1.1;opacity:0;transform:translateY(14px);transition:opacity .4s,transform .6s var(--ease),color .2s}
.d-ledger .lg-drawer.is-open nav a{opacity:1;transform:none;transition-delay:calc(.25s + var(--i,0) * 60ms)}
.d-ledger .lg-drawer nav a:hover{color:var(--red)}
.d-ledger .lg-drawer nav b{font-family:var(--label);font-size:13px;font-weight:700;letter-spacing:.12em;color:var(--red)}
.d-ledger .lg-drawer nav i{font-style:normal;font-family:var(--label);font-size:20px;color:var(--red)}
.d-ledger .lg-drawer address{display:grid;gap:4px;font-style:normal;color:var(--dim)}
.d-ledger .lg-drawer address a{display:inline-flex;align-items:center;min-height:44px;color:var(--ink);text-decoration:underline;text-decoration-color:var(--red);text-underline-offset:4px}
.d-ledger.menu-open .lg-hdr{background:var(--sheet);backdrop-filter:none;-webkit-backdrop-filter:none}
.d-ledger.menu-open .lg-mini{opacity:1;transform:translateY(-50%)}
.d-ledger .lg-hero{position:relative;padding:clamp(14px,2.4vw,30px) 0 clamp(52px,6vw,88px)}
.d-ledger .lg-mast{display:grid;gap:14px;align-items:center;padding-bottom:clamp(10px,1.4vw,18px)}
@media (min-width:900px){.d-ledger .lg-mast{grid-template-columns:minmax(150px,1fr) minmax(0,4.2fr) minmax(150px,1fr);gap:clamp(18px,2vw,32px);align-items:stretch}.d-ledger .lg-plate-box{align-self:center}}
.d-ledger .lg-ear{display:none}
@media (min-width:900px){.d-ledger .lg-ear{display:grid;gap:6px;align-content:center;justify-items:center;min-height:92px;padding:12px 14px;border:1px solid var(--ink);outline:1px solid var(--ink);outline-offset:3px;text-align:center;animation:lg-fade .9s var(--ease) 1.1s both}}
.d-ledger .lg-ear small{font-family:var(--label);font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--red)}
.d-ledger .lg-ear b{font-family:var(--serif);font-size:19px;font-weight:400;line-height:1.15}
.d-ledger .lg-ear span{font-family:var(--label);font-size:13px;letter-spacing:.04em;color:var(--dim)}
.d-ledger .lg-plate-box{min-width:0;container-type:inline-size;text-align:center}
.d-ledger .lg-plate{display:block;font-family:var(--serif);font-size:min(12.6vw,66px,calc((100vw - 2 * var(--pad)) / (var(--lw,10) * .5)));line-height:1;letter-spacing:-.01em;text-wrap:balance;transform-origin:50% 100%;animation:lg-ink 1.3s var(--ease) .1s both}
@media (min-width:700px){.d-ledger .lg-plate{white-space:nowrap;font-size:min(150px,calc(178cqi / var(--n,10)))}}
.d-ledger .lg-dateline{position:relative;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:4px 22px;padding:11px 0 10px;font-family:var(--label);font-size:12.5px;font-weight:600;letter-spacing:.15em;text-transform:uppercase}
.d-ledger .lg-dateline::before,.d-ledger .lg-dateline::after{content:"";position:absolute;left:0;right:0;transform:scaleX(0);animation:lg-rule 1.1s var(--press) .35s forwards}
.d-ledger .lg-dateline::before{top:0;height:5px;border-top:3px solid var(--ink);border-bottom:1px solid var(--ink)}
.d-ledger .lg-dateline::after{bottom:0;height:1px;background:var(--ink);animation-delay:.5s}
.d-ledger .lg-dateline>*{animation:lg-fade .8s var(--ease) both;animation-delay:calc(.7s + var(--i,0) * 120ms)}
.d-ledger .lg-dateline time[hidden]{display:none}
@media (max-width:699px){.d-ledger .lg-dateline{justify-content:center;text-align:center}.d-ledger .lg-dateline .is-x{display:none}}
.d-ledger .lg-headline{padding:clamp(22px,3vw,40px) 0 clamp(20px,2.6vw,34px);border-bottom:1px solid var(--ink)}
.d-ledger .lg-headline .lg-kick{margin-bottom:clamp(12px,1.4vw,20px);animation:lg-fade .8s var(--ease) .3s both}
.d-ledger .lg-hero h1{font-size:min(clamp(46px,8.4vw,144px),calc((100vw - 2 * var(--pad)) / (var(--lw,10) * .49)));line-height:.98;letter-spacing:-.015em;text-wrap:balance}
.d-ledger .lg-hero h1.is-m{font-size:min(clamp(40px,6.4vw,108px),calc((100vw - 2 * var(--pad)) / (var(--lw,10) * .49)));line-height:1}
.d-ledger .lg-hero h1.is-s{font-size:min(clamp(34px,4.8vw,80px),calc((100vw - 2 * var(--pad)) / (var(--lw,10) * .49)));line-height:1.04}
.d-ledger .lg-w{display:inline-block;white-space:nowrap}
.d-ledger .lg-w.is-em{color:var(--red)}
.d-ledger .lg-c{display:inline-block;animation:lg-press .75s var(--ease) both;animation-delay:calc(.45s + var(--i,0) * var(--st,30ms))}
.d-ledger .lg-front{display:grid;gap:32px;padding-top:clamp(24px,2.8vw,36px)}
@media (min-width:760px){.d-ledger .lg-front{grid-template-columns:minmax(0,1fr) minmax(0,1.15fr)}.d-ledger .lg-rail{grid-column:1/-1}}
@media (min-width:1120px){.d-ledger .lg-front{grid-template-columns:minmax(0,4fr) minmax(0,5fr) minmax(0,3fr);gap:0}.d-ledger .lg-front>*{padding-inline:clamp(20px,2vw,34px)}.d-ledger .lg-front>:first-child{padding-left:0}.d-ledger .lg-front>:last-child{padding-right:0}.d-ledger .lg-front>*+*{border-left:1px solid var(--hair)}.d-ledger .lg-rail{grid-column:auto}}
.d-ledger .lg-up{animation:lg-up .9s var(--ease) both;animation-delay:calc(1s + var(--i,0) * 110ms)}
.d-ledger .lg-deck{font-style:italic;font-size:clamp(19px,1.55vw,24px);line-height:1.45;color:var(--ink2)}
.d-ledger .lg-by{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin-top:20px;padding-top:12px;border-top:1px solid var(--hair);color:var(--dim)}
.d-ledger .lg-by b{color:var(--ink)}
.d-ledger .lg-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px 24px;margin-top:26px}
.d-ledger .lg-facts{display:grid;margin-top:30px;border-top:3px solid var(--ink)}
.d-ledger .lg-facts div{display:grid;grid-template-columns:minmax(0,10.5em) minmax(0,1fr);gap:4px 14px;padding:12px 0;border-bottom:1px solid var(--hair)}
@media (max-width:519px),(min-width:1120px) and (max-width:1300px){.d-ledger .lg-facts div{grid-template-columns:minmax(0,1fr)}}
.d-ledger .lg-facts dt{padding-top:3px;font-family:var(--label);font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--red)}
.d-ledger .lg-facts dd{margin:0;font-size:.98em}
.d-ledger .lg-facts a{text-decoration:underline;text-decoration-color:var(--red);text-underline-offset:3px}
.d-ledger .lg-photo{position:relative;margin:0}
.d-ledger .lg-print{position:relative;aspect-ratio:5/6;overflow:hidden;background:var(--paper2);clip-path:inset(0 0 100% 0);animation:lg-roll 1.6s var(--press) .75s forwards}
@media (max-width:759px){.d-ledger .lg-print{aspect-ratio:4/3.4}}
.d-ledger .lg-print::before{content:"";position:absolute;inset:0;z-index:1;background:radial-gradient(rgba(22,19,15,.32) .8px,transparent 1.2px) 0 0/4px 4px;mix-blend-mode:multiply;opacity:.55;pointer-events:none;transition:opacity .8s}
.d-ledger .lg-print::after{content:"";position:absolute;left:0;right:0;top:0;z-index:2;height:3px;background:var(--red);box-shadow:0 0 14px rgba(163,22,27,.6);opacity:0;animation:lg-scan 1.6s var(--press) .75s both}
.d-ledger .lg-print img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.08) brightness(1.02);mix-blend-mode:multiply;transform:translateY(calc(var(--p,0) * -3%)) scale(1.08);transition:filter .9s var(--ease)}
.d-ledger .lg-photo:hover .lg-print img,.d-ledger .lg-fig:hover img,.d-ledger .lg-shot:hover img{filter:none}
.d-ledger .lg-photo:hover .lg-print::before,.d-ledger .lg-fig:hover .lg-print::before,.d-ledger .lg-shot:hover .lg-print::before{opacity:0}
.d-ledger .lg-cap{display:flex;justify-content:space-between;gap:14px;padding:10px 0;border-bottom:1px solid var(--hair);font-family:var(--label);font-size:12.5px;letter-spacing:.06em;color:var(--dim)}
.d-ledger .lg-cap b{flex:none;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--red)}
.d-ledger .lg-notice{position:relative;display:grid;align-content:center;justify-items:center;gap:18px;min-height:100%;padding:clamp(26px,3vw,40px) 20px;border:1px solid var(--ink);outline:1px solid var(--ink);outline-offset:4px;background:var(--sheet);text-align:center;animation:lg-up 1s var(--ease) .9s both}
.d-ledger .lg-notice>span{font-family:var(--serif);font-size:clamp(130px,16vw,220px);line-height:.8;color:var(--red)}
.d-ledger .lg-notice ul{display:grid;width:100%;max-width:320px;border-top:3px solid var(--ink)}
.d-ledger .lg-notice li{display:flex;justify-content:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--hair);font-family:var(--serif);font-size:20px;line-height:1.2}
.d-ledger .lg-notice p{color:var(--dim)}
.d-ledger .lg-rail-h{display:flex;justify-content:space-between;align-items:center;gap:12px;padding-bottom:10px;border-bottom:3px solid var(--ink)}
.d-ledger .lg-toc{display:grid}
@media (min-width:760px) and (max-width:1119px){.d-ledger .lg-toc{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:32px}}
.d-ledger .lg-toc a{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:baseline;gap:12px;min-height:50px;padding:13px 0;border-bottom:1px solid var(--hair);font-family:var(--serif);font-size:21px;line-height:1.15;transition:color .25s,padding .4s var(--ease)}
.d-ledger .lg-toc b{font-family:var(--label);font-size:12px;font-weight:700;letter-spacing:.12em;color:var(--red)}
.d-ledger .lg-toc i{font-style:normal;font-family:var(--label);color:var(--red);transition:transform .4s var(--ease)}
.d-ledger .lg-toc a:hover{color:var(--red);padding-left:6px}
.d-ledger .lg-toc a:hover i{transform:translateX(4px)}
.d-ledger .lg-rail-box{margin-top:26px;padding:16px 18px;border:1px solid var(--ink);background:var(--sheet)}
.d-ledger .lg-rail-box p{margin-top:8px;font-size:.95em;color:var(--dim)}
.d-ledger .lg-now{display:inline-flex;align-items:center;gap:8px;padding:5px 10px;border:1.5px solid currentColor;font-family:var(--label);font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;line-height:1;transform:rotate(-2deg)}
.d-ledger .lg-now::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor}
.d-ledger .lg-now.is-open{background:var(--ink);border-color:var(--ink);color:var(--sheet)}
.d-ledger .lg-now.is-closed{color:var(--red)}
.d-ledger .lg-wire{display:flex;align-items:stretch;overflow:hidden;background:var(--ink);color:var(--sheet)}
.d-ledger .lg-wire>b{position:relative;z-index:1;flex:none;display:flex;align-items:center;padding:0 clamp(14px,2vw,24px);background:var(--red);font-family:var(--label);font-size:12.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.d-ledger .lg-wire>b::after{content:"";position:absolute;right:-12px;top:0;bottom:0;width:12px;background:var(--red);clip-path:polygon(0 0,100% 50%,0 100%)}
.d-ledger .lg-wire>div{flex:1;min-width:0;overflow:hidden}
.d-ledger .lg-wire p{display:flex;width:max-content;animation:lg-run 70s linear infinite}
.d-ledger .lg-wire:hover p{animation-play-state:paused}
.d-ledger .lg-wire span{display:inline-flex;align-items:center;gap:24px;padding:14px 12px;font-family:var(--serif);font-size:20px;white-space:nowrap}
.d-ledger .lg-wire span::after{content:"";width:7px;height:7px;background:var(--red)}
.d-ledger .lg-sec{position:relative;padding-block:clamp(64px,8vw,120px)}
.d-ledger .lg-sec.is-sheet{background:var(--sheet)}
.d-ledger .lg-sec.is-tint{background:var(--paper2)}
.d-ledger .lg-sec.is-ink{background:var(--ink);color:var(--sheet)}
.d-ledger .lg-head{display:grid;gap:16px 48px;margin-bottom:clamp(32px,4vw,58px)}
.d-ledger .lg-head-top{position:relative;display:flex;justify-content:space-between;align-items:center;gap:16px;padding-top:14px}
.d-ledger .lg-head-top::before{content:"";position:absolute;left:0;right:0;top:0;height:6px;border-top:3px solid currentColor;border-bottom:1px solid currentColor;transform:scaleX(0);transform-origin:0 50%;transition:transform 1.1s var(--press)}
.d-ledger .lg-head-top.in::before{transform:none}
.d-ledger .lg-head-top .lg-label{color:var(--dim)}
.d-ledger .lg-head h2{max-width:20ch}
.d-ledger .lg-intro{max-width:56ch;font-style:italic;font-size:1.08em;color:var(--dim)}
@media (min-width:900px){.d-ledger .lg-head.is-row{grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);align-items:end}.d-ledger .lg-head.is-row .lg-head-top{grid-column:1/-1}}
.d-ledger .is-ink .lg-head-top .lg-label,.d-ledger .is-ink .lg-intro{color:rgba(248,245,237,.66)}
.d-ledger .is-ink .lg-kick{color:#e8655f}
.d-ledger .lg-article{display:grid;gap:clamp(36px,4vw,60px)}
@media (min-width:960px){.d-ledger .lg-article.has-side{grid-template-columns:minmax(0,2fr) minmax(0,1fr)}.d-ledger .lg-article.has-side .lg-side{padding-left:clamp(24px,3vw,44px);border-left:1px solid var(--hair)}}
.d-ledger .lg-body{font-size:1.04em}
.d-ledger .lg-body p{text-align:justify;-webkit-hyphens:auto;hyphens:auto}
.d-ledger .lg-body p+p{text-indent:1.6em}
.d-ledger .lg-body.is-cols{columns:2 280px;column-gap:44px;column-rule:1px solid var(--hair)}
.d-ledger .lg-body.is-short{font-size:clamp(20px,1.7vw,26px);line-height:1.5}
.d-ledger .lg-body.is-short p{text-align:left}
.d-ledger .lg-article:not(.is-tri) .lg-body.is-short{font-size:clamp(24px,2.5vw,38px);line-height:1.36;color:var(--ink2)}
@media (min-width:960px){.d-ledger .lg-article.is-tri{grid-template-columns:minmax(0,1.2fr) minmax(0,.85fr) minmax(0,.85fr);gap:0}.d-ledger .lg-article.is-tri .lg-side{display:contents}.d-ledger .lg-article.is-tri .lg-side>*{padding-left:clamp(22px,2.6vw,40px);margin-left:clamp(22px,2.6vw,40px);border-left:1px solid var(--hair)}.d-ledger .lg-article.is-tri .lg-notes{display:grid;gap:30px;align-content:start}}
.d-ledger .lg-notes{display:grid;gap:30px;align-content:start}
.d-ledger .lg-drop::first-letter{float:left;margin:.05em .12em 0 0;font-family:var(--serif);font-size:4.4em;line-height:.82;color:var(--red)}
.d-ledger .lg-side{display:grid;gap:30px;align-content:start}
.d-ledger .lg-fig{margin:0}
.d-ledger .lg-fig .lg-print{aspect-ratio:4/5;clip-path:none;animation:none}
.d-ledger .lg-fig .lg-print::after{display:none}
.d-ledger .lg-pull{position:relative;padding:22px 0 20px;border-top:3px solid var(--ink);border-bottom:1px solid var(--ink);font-family:var(--serif);font-size:clamp(25px,2.3vw,34px);line-height:1.16}
.d-ledger .lg-pull::before{content:"“";display:block;height:.5em;font-size:2.6em;line-height:.9;color:var(--red)}
.d-ledger .lg-pull footer{margin-top:14px;font-family:var(--label);font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}
.d-ledger .lg-brief{display:grid;border-top:1px solid var(--ink)}
.d-ledger .lg-brief li{display:flex;align-items:baseline;gap:12px;padding:11px 0;border-bottom:1px dotted rgba(22,19,15,.4);font-family:var(--label);font-size:15px;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
.d-ledger .lg-brief li::before{content:"";flex:none;width:8px;height:8px;background:var(--red);transform:translateY(-1px)}
.d-ledger .lg-lead{display:grid;gap:22px 48px;padding-bottom:clamp(30px,3.4vw,46px);margin-bottom:clamp(30px,3.4vw,46px);border-bottom:3px solid var(--ink)}
@media (min-width:900px){.d-ledger .lg-lead{grid-template-columns:auto minmax(0,1fr) minmax(0,1fr);align-items:start}.d-ledger .lg-lead.has-pic{grid-template-columns:auto minmax(0,1fr) minmax(0,.9fr) minmax(0,.8fr)}}
.d-ledger .lg-lead .lg-big{font-family:var(--serif);font-size:clamp(84px,9vw,150px);line-height:.8;color:transparent;-webkit-text-stroke:1.5px var(--red);transition:color .5s var(--ease)}
.d-ledger .lg-lead:hover .lg-big{color:var(--red)}
.d-ledger .lg-lead h3{font-size:clamp(32px,3.4vw,52px);line-height:1.02}
.d-ledger .lg-lead p:not(.lg-meta){font-size:clamp(18px,1.35vw,21px);line-height:1.55}
.d-ledger .lg-lead .lg-meta{margin-top:14px}
.d-ledger .lg-lead .lg-fig .lg-print{aspect-ratio:4/3}
.d-ledger .lg-hl{background:linear-gradient(var(--red),var(--red)) 0 100%/0 2px no-repeat;transition:background-size .6s var(--ease)}
.d-ledger .lg-lead:hover .lg-hl,.d-ledger .lg-art:hover .lg-hl{background-size:100% 2px}
.d-ledger .lg-arts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));margin-inline:calc(clamp(18px,2vw,28px) * -1);overflow:hidden}
.d-ledger .lg-art{position:relative;display:grid;gap:12px;align-content:start;padding:6px clamp(18px,2vw,28px) 34px;box-shadow:-1px 0 0 var(--hair);transition:background-color .35s}
.d-ledger .lg-art:hover{background:rgba(22,19,15,.035)}
.d-ledger .lg-art .lg-no{display:flex;justify-content:space-between;align-items:center;padding-bottom:10px;border-bottom:1px solid var(--ink);font-family:var(--label);font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.d-ledger .lg-art .lg-no b{font-family:var(--serif);font-size:34px;font-weight:400;line-height:1;letter-spacing:0;color:var(--red);transition:transform .5s var(--ease)}
.d-ledger .lg-art:hover .lg-no b{transform:translateY(-3px) rotate(-6deg)}
.d-ledger .lg-art p{color:var(--ink2)}
.d-ledger .lg-meta{display:flex;flex-wrap:wrap;gap:8px 16px;padding-top:10px;border-top:1px dotted rgba(22,19,15,.4);font-family:var(--label);font-size:13.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--dim)}
.d-ledger .lg-meta b{color:var(--red)}
.d-ledger .lg-briefs{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));border:1px solid rgba(248,245,237,.5);outline:1px solid rgba(248,245,237,.5);outline-offset:4px;overflow:hidden}
.d-ledger .lg-briefs li{display:grid;gap:12px;align-content:start;padding:clamp(22px,2.6vw,34px);box-shadow:-1px 0 0 var(--hair-l),0 -1px 0 var(--hair-l);transition:background-color .35s}
.d-ledger .lg-briefs li:hover{background:rgba(248,245,237,.05)}
.d-ledger .lg-briefs p{color:rgba(248,245,237,.72)}
.d-ledger .lg-ico{display:grid;place-items:center;width:50px;height:50px;border:1px solid currentColor;transition:transform .5s var(--ease),background-color .3s,color .3s}
.d-ledger .lg-ico svg{width:22px;height:22px}
.d-ledger .lg-briefs li:hover .lg-ico{background:#e8655f;border-color:#e8655f;color:var(--ink);transform:rotate(-6deg)}
.d-ledger .lg-chron{position:relative;display:grid;gap:30px;padding-left:34px}
.d-ledger .lg-chron::before,.d-ledger .lg-chron::after{content:"";position:absolute;left:8px;top:10px;bottom:10px;width:2px;background:var(--hair)}
.d-ledger .lg-chron::after{background:var(--red);transform:scaleY(clamp(0,calc(1 - var(--p,0) * 1.3),1));transform-origin:50% 0}
.d-ledger .lg-chron li{position:relative;display:grid;gap:10px;align-content:start}
.d-ledger .lg-chron li::before{content:"";position:absolute;left:-31px;top:12px;width:14px;height:14px;border:2px solid var(--red);background:var(--paper);transform:rotate(45deg);transition:background-color .4s}
.d-ledger .lg-chron li:hover::before{background:var(--red)}
.d-ledger .lg-rom{font-family:var(--serif);font-size:clamp(38px,3.6vw,54px);line-height:.9;color:var(--red)}
.d-ledger .lg-chron p{color:var(--ink2)}
@media (min-width:860px){.d-ledger .lg-chron{grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:clamp(24px,3vw,44px);padding:44px 0 0}.d-ledger .lg-chron::before,.d-ledger .lg-chron::after{left:0;right:0;top:8px;bottom:auto;width:auto;height:2px}.d-ledger .lg-chron::after{transform:scaleX(clamp(0,calc(1 - var(--p,0) * 1.3),1));transform-origin:0 50%}.d-ledger .lg-chron li::before{left:0;top:-43px}}
.d-ledger .lg-carte{columns:2 330px;column-gap:56px;column-rule:1px solid var(--hair)}
.d-ledger .lg-cat{break-inside:avoid;margin-bottom:38px}
.d-ledger .lg-cat h3{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:10px 0 9px;border-top:3px solid var(--ink);border-bottom:1px solid var(--ink);font-family:var(--label);font-size:15px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.d-ledger .lg-cat h3 small{font-size:12px;color:var(--red)}
.d-ledger .lg-item{padding:13px 8px;margin-inline:-8px;border-bottom:1px dotted rgba(22,19,15,.4);transition:background-color .3s}
.d-ledger .lg-item:hover{background:rgba(163,22,27,.06)}
.d-ledger .lg-item-row{display:flex;align-items:baseline;gap:10px}
.d-ledger .lg-item h4{font-family:var(--serif);font-size:21px;font-weight:400;line-height:1.2}
.d-ledger .lg-lead-dots{flex:1;min-width:20px;border-bottom:2px dotted rgba(22,19,15,.35);transform:translateY(-4px)}
.d-ledger .lg-item b{flex:none;font-family:var(--label);font-size:17px;font-weight:700;letter-spacing:.04em;font-variant-numeric:tabular-nums;color:var(--red)}
.d-ledger .lg-item p{margin-top:4px;font-style:italic;font-size:.94em;color:var(--dim)}
.d-ledger .lg-tags{display:flex;flex-wrap:wrap;gap:6px 12px;margin-top:6px;font-family:var(--label);font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--red)}
.d-ledger .lg-note{margin-top:8px;font-style:italic;font-size:.94em;color:var(--dim)}
.d-ledger .lg-photos{display:grid;gap:clamp(10px,1.4vw,18px);grid-template-columns:repeat(2,minmax(0,1fr))}
.d-ledger .lg-shot{display:grid;grid-template-rows:minmax(0,1fr) auto;margin:0;min-height:0}
.d-ledger .lg-shot .lg-print{aspect-ratio:auto;height:100%;min-height:150px;clip-path:none;animation:none}
.d-ledger .lg-shot .lg-print::after{display:none}
.d-ledger .lg-shot .lg-print img{transform:scale(1.02);transition:filter .9s var(--ease),transform 1.2s var(--ease)}
.d-ledger .lg-shot:hover .lg-print img{transform:scale(1.07)}
.d-ledger .lg-shot:first-child{grid-column:1/-1}
.d-ledger .lg-shot:first-child .lg-print{min-height:240px}
.d-ledger .lg-shot:last-child:nth-child(even){grid-column:1/-1}
@media (min-width:900px){.d-ledger .lg-photos{grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:clamp(200px,19vw,290px)}.d-ledger .lg-shot:first-child{grid-column:span 2;grid-row:span 2}.d-ledger .lg-shot:last-child:nth-child(even){grid-column:auto}.d-ledger .lg-shot:last-child:nth-child(4){grid-column:1/-1}.d-ledger .lg-shot:last-child:nth-child(5){grid-column:span 2}.d-ledger .lg-photos.is-2{grid-template-columns:repeat(2,minmax(0,1fr))}.d-ledger .lg-photos.is-2 .lg-shot:first-child,.d-ledger .lg-photos.is-1 .lg-shot:first-child{grid-column:auto;grid-row:span 2}.d-ledger .lg-photos.is-1{grid-template-columns:1fr}}
.d-ledger .lg-visit{display:grid;gap:clamp(36px,5vw,80px);align-items:start}
@media (min-width:900px){.d-ledger .lg-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-ledger .lg-visit-copy{display:grid;gap:22px;align-content:start}
.d-ledger .lg-visit-copy .lg-head{margin-bottom:8px}
.d-ledger .lg-visit-copy>p{max-width:52ch;color:var(--dim)}
.d-ledger .z-reach{gap:2px;font-size:1.02em}
.d-ledger .z-reach a{min-height:40px;text-decoration:underline;text-decoration-color:rgba(163,22,27,.5);text-underline-offset:4px;transition:text-decoration-color .3s,color .3s}
.d-ledger .z-reach a:hover{color:var(--red);text-decoration-color:var(--red)}
.d-ledger .z-reach .z-route{font-family:var(--label);font-weight:700;letter-spacing:.12em;text-transform:uppercase;text-decoration:none}
.d-ledger .lg-board{border:1px solid var(--ink);outline:1px solid var(--ink);outline-offset:5px;background:var(--sheet);margin:6px}
.d-ledger .lg-board-h{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;padding:14px 20px;background:var(--ink);color:var(--sheet)}
.d-ledger .lg-board-h h3{font-size:clamp(22px,2vw,28px)}
.d-ledger .lg-board-h .lg-now.is-open{background:var(--sheet);border-color:var(--sheet);color:var(--ink)}
.d-ledger .lg-board-h .lg-now.is-closed{color:#ff8f88}
.d-ledger .lg-board .z-hours{padding:6px 20px 14px;border:0}
.d-ledger .lg-board .z-note{padding:20px;margin:0}
.d-ledger .z-hours div{align-items:baseline;padding:13px 0;border-color:var(--hair);font-family:var(--label);font-size:16.5px;letter-spacing:.04em;transition:background-color .3s}
.d-ledger .z-hours dt{font-weight:700;text-transform:uppercase;letter-spacing:.1em;font-size:14.5px}
.d-ledger .z-hours dd{color:var(--ink2);font-variant-numeric:tabular-nums}
.d-ledger .z-hours div.is-today{position:relative;margin-inline:-10px;padding-inline:10px;background:var(--red);color:#f8f5ed}
.d-ledger .lg-board .z-hours div.is-today{margin-inline:-20px;padding-inline:20px}
.d-ledger .z-hours div.is-today dd{color:#f8f5ed}
.d-ledger .z-hours div.is-today dt::before{content:"▸ ";}
.d-ledger .lg-class{display:grid;gap:18px}
@media (min-width:960px){.d-ledger .lg-class.has-form{grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);align-items:start}}
.d-ledger .lg-ads{columns:3 220px;column-gap:16px}
.d-ledger .lg-class.has-form .lg-ads{columns:2 220px}
.d-ledger .lg-ad{display:grid;gap:10px;justify-items:center;break-inside:avoid;margin-bottom:16px;padding:18px 18px 20px;border:1px solid var(--ink);background:var(--sheet);text-align:center;transition:transform .45s var(--ease),border-color .3s,background-color .3s,color .3s,filter 1s var(--ease),opacity 1s var(--ease)}
.d-ledger .lg-ad:hover{transform:rotate(-.8deg) translateY(-2px);border-color:var(--red)}
.d-ledger .lg-ad h3{width:100%;padding-bottom:8px;border-bottom:1px solid currentColor;font-family:var(--label);font-size:13px;font-weight:700;letter-spacing:.22em;text-transform:uppercase}
.d-ledger .lg-ad .lg-big{font-family:var(--serif);font-size:clamp(23px,2.2vw,31px);line-height:1.12;overflow-wrap:anywhere}
.d-ledger .lg-ad a.lg-big{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:5px;text-decoration-color:rgba(163,22,27,.5)}
.d-ledger .lg-ad p{font-size:.96em;color:var(--ink2)}
.d-ledger .lg-ad.is-text{justify-items:start;text-align:left}
.d-ledger .lg-ad.is-text p{text-align:justify;-webkit-hyphens:auto;hyphens:auto}
.d-ledger .lg-ad.is-inv{background:var(--ink);color:var(--sheet)}
.d-ledger .lg-ad.is-inv:hover{background:var(--red);border-color:var(--red)}
.d-ledger .lg-ad.is-inv a.lg-big{text-decoration-color:rgba(248,245,237,.5)}
.d-ledger .lg-ad.is-dbl{border:4px double var(--ink)}
.d-ledger .lg-ad.is-dash{border:1.5px dashed var(--ink)}
.d-ledger .lg-ad.is-red{border:2px solid var(--red)}
.d-ledger .lg-ad.is-red .lg-big{color:var(--red)}
.d-ledger .lg-ad .z-hours{width:100%;border:0;text-align:left}
.d-ledger .lg-ad .z-hours div{padding:8px 0}
.d-ledger .lg-ad .z-hours div.is-today{margin-inline:-8px;padding-inline:8px}
.d-ledger .lg-ad .lg-text{font-size:13px}
.d-ledger .lg-coupon{position:relative;padding:clamp(24px,3.2vw,44px);border:2px dashed var(--ink);background:var(--sheet)}
.d-ledger .lg-cut{position:absolute;top:-15px;left:24px;display:grid;place-items:center;width:30px;height:30px;background:inherit;color:var(--red);transition:left 1.6s var(--press) .4s}
.d-ledger .lg-cut svg{width:22px;height:22px}
.d-ledger .lg-coupon.in .lg-cut{left:calc(100% - 54px)}
.d-ledger .lg-coupon-h{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:6px 12px;margin-bottom:22px;padding-bottom:12px;border-bottom:3px solid var(--ink)}
.d-ledger .lg-coupon-h p{font-family:var(--serif);font-size:clamp(24px,2.4vw,32px);line-height:1.1}
.d-ledger .lg-coupon-h span{min-width:0;overflow-wrap:anywhere;color:var(--red)}
.d-ledger .z-field label,.d-ledger .z-chipset legend{font-family:var(--label);font-size:12px;font-weight:700;letter-spacing:.16em;color:var(--dim)}
.d-ledger .z-field input,.d-ledger .z-field select,.d-ledger .z-field textarea{padding-inline:0;border:0;border-bottom:1px solid var(--ink);background:transparent;font-family:var(--text);transition:border-color .3s,box-shadow .3s}
.d-ledger .z-field textarea{padding:10px 12px;border:1px solid var(--ink)}
.d-ledger .z-field select{padding-right:28px;background:linear-gradient(45deg,transparent 50%,var(--ink) 50%) calc(100% - 12px) 50%/6px 6px no-repeat,linear-gradient(-45deg,transparent 50%,var(--ink) 50%) calc(100% - 6px) 50%/6px 6px no-repeat}
.d-ledger .z-field input:focus,.d-ledger .z-field select:focus,.d-ledger .z-field textarea:focus{border-color:var(--red);box-shadow:0 1px 0 var(--red)}
.d-ledger .z-field :focus-visible{outline:none}
.d-ledger .z-chips button{border-color:var(--ink);font-family:var(--label);font-weight:700}
.d-ledger .z-chips button[aria-pressed="true"]{background:var(--ink);border-color:var(--ink);color:var(--sheet)}
.d-ledger .form-note{font-style:italic}
.d-ledger .form-status{border:1px solid var(--ink);background:var(--paper)}
.d-ledger .lg-orders{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));border-top:3px solid var(--ink);border-bottom:1px solid var(--ink);overflow:hidden}
.d-ledger .lg-order{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px 18px;align-content:start;height:100%;padding:26px clamp(18px,2vw,28px);box-shadow:-1px 0 0 var(--hair);transition:background-color .35s,color .35s}
.d-ledger .lg-order .lg-ico{grid-row:span 3}
.d-ledger .lg-order p{color:var(--dim);transition:color .35s}
.d-ledger .lg-order .lg-go{font-family:var(--label);font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--red);transition:transform .4s var(--ease),color .35s}
.d-ledger .lg-order:hover{background:var(--ink);color:var(--sheet)}
.d-ledger .lg-order:hover p{color:rgba(248,245,237,.72)}
.d-ledger .lg-order:hover .lg-go{color:#e8655f;transform:translateX(6px)}
.d-ledger .lg-foot{position:relative;padding:clamp(56px,7vw,96px) 0 150px;background:var(--ink);color:var(--sheet)}
.d-ledger .lg-foot-plate{display:block;padding:12px 0 8px;border-top:4px double rgba(248,245,237,.7);border-bottom:1px solid rgba(248,245,237,.7);font-family:var(--serif);font-size:min(12vw,64px,calc((100vw - 2 * var(--pad)) / (var(--lw,10) * .5)));line-height:1;text-align:center;text-wrap:balance}
@media (min-width:700px){.d-ledger .lg-foot-plate{white-space:nowrap;font-size:min(170px,calc(160vw / var(--n,10)))}}
.d-ledger .lg-foot-line{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 20px;padding:11px 0;border-bottom:1px solid rgba(248,245,237,.3);color:rgba(248,245,237,.7)}
.d-ledger .lg-foot-line time[hidden]{display:none}
.d-ledger .lg-foot-grid{display:grid;gap:34px;margin-top:clamp(36px,5vw,64px);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-ledger .lg-foot-grid h3{margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(248,245,237,.3);font-family:var(--label);font-size:13px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#e8655f}
.d-ledger .lg-foot-grid a,.d-ledger .lg-foot-grid span{display:block;padding:5px 0}
.d-ledger .lg-foot-grid a{width:fit-content;text-decoration:underline;text-decoration-color:rgba(248,245,237,.3);text-underline-offset:4px;transition:color .25s,text-decoration-color .25s}
.d-ledger .lg-foot-grid a:hover{color:#e8655f;text-decoration-color:#e8655f}
.d-ledger .lg-foot-grid p{font-style:italic;color:rgba(248,245,237,.78)}
.d-ledger .lg-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;padding-top:20px;border-top:1px solid rgba(248,245,237,.3);font-family:var(--label);font-size:13px;letter-spacing:.06em;color:rgba(248,245,237,.66)}
.d-ledger .z-acc{border-top:3px solid var(--ink)}
.d-ledger .z-acc details{border-color:var(--hair)}
.d-ledger .z-acc summary{font-family:var(--serif);font-size:clamp(20px,1.8vw,26px);line-height:1.2;transition:color .25s}
.d-ledger .z-acc summary:hover,.d-ledger .z-acc details[open] summary{color:var(--red)}
.d-ledger .z-acc details>p{font-size:1.02em}
.d-ledger .z-sec.z-cta{background:var(--ink);color:var(--sheet)}
.d-ledger .z-cta .z-center{padding-block:44px 48px;background:linear-gradient(#f8f5ed,#f8f5ed) var(--pad) 0/calc(100% - 2 * var(--pad)) 3px no-repeat,linear-gradient(#f8f5ed,#f8f5ed) var(--pad) 6px/calc(100% - 2 * var(--pad)) 1px no-repeat,linear-gradient(#f8f5ed,#f8f5ed) var(--pad) 100%/calc(100% - 2 * var(--pad)) 1px no-repeat}
.d-ledger .z-cta h2{font-size:clamp(38px,5.4vw,84px)}
.d-ledger .z-cta h2 em{color:#e8655f}
.d-ledger .z-cta .z-center>p{color:rgba(248,245,237,.75);font-style:italic}
.d-ledger .z-cta .z-center>p .btn{font-style:normal}
.d-ledger .z-cta .lg-fill{background:var(--sheet);border-color:var(--sheet);color:var(--ink)}
.d-ledger .z-cta .lg-fill:hover{color:var(--sheet);border-color:var(--red)}
.d-ledger .z-statement .z-center{padding-block:clamp(36px,4.4vw,64px);background:linear-gradient(var(--ink),var(--ink)) var(--pad) 0/calc(100% - 2 * var(--pad)) 3px no-repeat,linear-gradient(var(--ink),var(--ink)) var(--pad) 6px/calc(100% - 2 * var(--pad)) 1px no-repeat,linear-gradient(var(--ink),var(--ink)) var(--pad) 100%/calc(100% - 2 * var(--pad)) 1px no-repeat}
.d-ledger .z-statement h2::before{content:"“";display:block;height:.42em;font-size:2.4em;line-height:.9;color:var(--red)}
.d-ledger .z-statement .lg-kick::before{display:none}
.d-ledger .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(22,19,15,.1),rgba(22,19,15,.82))}
.d-ledger .z-show-media img,.d-ledger .z-team .z-pic img,.d-ledger .z-gal img{filter:grayscale(1) contrast(1.08);transition:filter .9s var(--ease)}
.d-ledger .z-show-media:hover img,.d-ledger .z-team li:hover .z-pic img{filter:none}
.d-ledger .z-showcase .lg-line{border-color:#f8f5ed;color:#f8f5ed}
.d-ledger .z-showcase .lg-line:hover{background:#f8f5ed;color:var(--ink)}
.d-ledger .z-card,.d-ledger .z-panel,.d-ledger .z-channel{border-color:var(--ink);background:var(--sheet)}
.d-ledger .z-pack.is-featured{outline:1px solid var(--ink);outline-offset:4px;border-color:var(--ink)}
.d-ledger .z-pack h3{padding-bottom:10px;border-bottom:3px solid var(--ink)}
.d-ledger .z-tag{font-family:var(--label);font-weight:700}
.d-ledger .z-ticks li::before{width:8px;height:8px;top:.6em;background:var(--red)}
.d-ledger .z-team .z-pic{border:1px solid var(--ink)}
.d-ledger .z-team h3{margin-top:4px}
.d-ledger .z-quotes blockquote{border-top:3px solid var(--ink)}
.d-ledger .z-quotes blockquote>p{font-family:var(--text);font-style:italic;font-size:clamp(19px,1.6vw,24px);line-height:1.45}
.d-ledger .z-quotes blockquote>p::before{content:"“";color:var(--red)}
.d-ledger .z-quotes footer b{font-family:var(--label);letter-spacing:.12em;text-transform:uppercase}
.d-ledger .z-ba{border:1px solid var(--ink)}
.d-ledger .z-rows small,.d-ledger .z-steps small{font-family:var(--serif);font-size:26px;letter-spacing:0}
.demo-js .d-ledger [data-rv]{transform:none;filter:blur(3px);transition:opacity 1s var(--ease),filter 1s var(--ease),transform .45s var(--ease),border-color .3s,background-color .3s,color .3s;transition-delay:calc(var(--i,0) * 90ms)}
.demo-js .d-ledger [data-rv].in{filter:none}
.demo-js .d-ledger [data-rv].in:hover{transition-delay:0s}
.d-ledger.no-photos .lg-hero::before{content:"";position:absolute;right:0;top:0;width:min(40vw,520px);height:100%;background:radial-gradient(rgba(163,22,27,.06) 1.2px,transparent 1.4px) 0 0/8px 8px;-webkit-mask:linear-gradient(90deg,transparent,#000);mask:linear-gradient(90deg,transparent,#000);pointer-events:none}
@keyframes lg-press{0%{opacity:0;color:var(--red);filter:blur(6px);transform:translateY(-.06em) scale(1.32)}45%{opacity:1;color:var(--red);filter:blur(0);transform:scale(.98)}100%{opacity:1;filter:none;transform:none}}
@keyframes lg-ink{from{opacity:0;filter:blur(10px);transform:scaleY(1.25)}to{opacity:1;filter:none;transform:none}}
@keyframes lg-rule{to{transform:none}}
@keyframes lg-fade{from{opacity:0}to{opacity:1}}
@keyframes lg-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes lg-roll{to{clip-path:inset(0)}}
@keyframes lg-scan{0%{top:0;opacity:1}88%{opacity:1}100%{top:100%;opacity:0}}
@keyframes lg-run{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.d-ledger .lg-c,.d-ledger .lg-plate,.d-ledger .lg-up,.d-ledger .lg-ear,.d-ledger .lg-notice,.d-ledger .lg-dateline>*,.d-ledger .lg-headline .lg-kick{animation:none;opacity:1;filter:none;transform:none}.d-ledger .lg-print{animation:none;clip-path:none}.d-ledger .lg-print::after{display:none}.d-ledger .lg-dateline::before,.d-ledger .lg-dateline::after{animation:none;transform:none}.d-ledger .lg-wire p{animation:none}.demo-js .d-ledger [data-rv]{filter:none!important}.d-ledger .lg-head-top::before{transform:none}.d-ledger .lg-cut{transition:none}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * Today's date in the visitor's own browser (in the masthead, the header and the colophon), the
 * red reading line under the header, and a nameplate that fills its column exactly.
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-ledger');if(!root)return;
var lang=(d.documentElement.lang||'nl').slice(0,2),loc={nl:'nl-NL',en:'en-GB',de:'de-DE',fr:'fr-FR'}[lang]||lang,now=new Date(),txt='';
try{txt=new Intl.DateTimeFormat(loc,{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Europe/Amsterdam'}).format(now)}catch(e){txt=now.toDateString()}
[].slice.call(d.querySelectorAll('[data-lg-date]')).forEach(function(n){n.textContent=txt;n.setAttribute('datetime',now.toISOString().slice(0,10));n.hidden=false});
var raf=0;function read(){raf=0;var h=d.documentElement.scrollHeight-W.innerHeight;root.style.setProperty('--read',h>0?Math.min(1,Math.max(0,W.scrollY/h)).toFixed(4):'0')}
W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(read)},{passive:true});W.addEventListener('resize',read);read();
var fits=[].slice.call(d.querySelectorAll('[data-lg-fit]'));
function fit(){fits.forEach(function(el){el.style.fontSize='';if(!W.matchMedia('(min-width: 700px)').matches)return;var box=el.clientWidth,r=d.createRange();r.selectNodeContents(el);var w=r.getBoundingClientRect().width,f=parseFloat(getComputedStyle(el).fontSize);if(w>0&&box>0)el.style.fontSize=Math.min(f*box/w*0.985,parseFloat(el.getAttribute('data-lg-fit'))||160).toFixed(1)+'px'})}
fit();W.addEventListener('resize',fit);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(fit)})();`;

/** Words of the design itself (labels of the newspaper), in the site's language. */
const WORDS: Record<string, { edition: string; wire: string; colophon: string; fig: string; no: string; brief: string }> = {
  nl: { edition: "In deze editie", wire: "Uit het aanbod", colophon: "Colofon", fig: "Fig.", no: "Nr.", brief: "In het kort" },
  en: { edition: "In this edition", wire: "What we do", colophon: "Colophon", fig: "Fig.", no: "No.", brief: "In brief" },
  de: { edition: "In dieser Ausgabe", wire: "Unser Angebot", colophon: "Kolophon", fig: "Abb.", no: "Nr.", brief: "Kurz gesagt" },
  fr: { edition: "Dans cette édition", wire: "Notre offre", colophon: "Colophon", fig: "Fig.", no: "N°", brief: "En bref" },
};
const words = (c: Ctx) => WORDS[c.spec.meta.lang] ?? WORDS.en;
/** Length of the longest word: on a phone a nameplate or headline is never set wider than the screen. */
const longest = (s: string) => Math.max(6, ...plain(s).split(/\s+/).map((w) => w.length));
/** A drop cap only opens a text that runs to a few lines. */
const drop = (s: string, min = 140) => (s.length >= min ? "lg-drop" : undefined);

const plain = (s: string) => s.replace(/\*/g, "");
const two = (n: number) => String(n + 1).padStart(2, "0");
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/**
 * A sentence from the business's own text, to set as a pull quote. Never the opening sentence
 * (it already carries the drop cap) and nothing when the text has only one sentence.
 */
function pullQuote(paragraphs: string[]): string | null {
  const sentences = paragraphs
    .flatMap((p) => p.split(/(?<=[.!?…])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);
  const pool = sentences.slice(1).filter((s) => s.length >= 24 && s.length <= 160);
  if (!pool.length) return null;
  return pool.reduce((a, b) => (Math.abs(b.length - 80) < Math.abs(a.length - 80) ? b : a));
}

/** The banner headline, letter by letter: each one is pressed onto the page in fresh red ink. */
function Press({ text }: { text: string }) {
  let k = 0;
  const out: ReactNode[] = [];
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w, m) => {
        if (out.length) out.push(" ");
        out.push(
          <span key={`${n}-${m}`} className={`lg-w${n % 2 ? " is-em" : ""}`}>
            {[...w].map((ch, j) => (
              <span key={j} className="lg-c" style={i(k++)}>
                {ch}
              </span>
            ))}
          </span>,
        );
      }),
  );
  return <>{out}</>;
}

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" aria-hidden="true">
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
);

const DateStamp = ({ className }: { className?: string }) => <time className={className} data-lg-date hidden />;

function Head({ kicker, title, intro, id, no, c }: { kicker?: string; title: string; intro?: string; id?: string; no?: number; c: Ctx }) {
  return (
    <header className={`lg-head${intro ? " is-row" : ""}`}>
      <div className="lg-head-top" data-rv>
        {kicker ? <p className="lg-kick">{kicker}</p> : <span />}
        {no != null ? (
          <span className="lg-label">
            {words(c).no} {two(no)}
          </span>
        ) : null}
      </div>
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? (
        <p className="lg-intro" data-rv>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

/** A photograph printed in black ink on the newsprint; it comes up in colour under the cursor. */
function Print({ p, sizes, eager, className = "lg-fig", caption }: { p: Photo; sizes: string; eager?: boolean; className?: string; caption?: ReactNode }) {
  return (
    <figure className={className}>
      <div className="lg-print">
        <Pic p={p} sizes={sizes} eager={eager} />
      </div>
      {caption ? <figcaption className="lg-cap">{caption}</figcaption> : null}
    </figure>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="lg-hdr hdr">
        <div className="lg-wrap lg-bar">
          <div className="lg-slot">
            <DateStamp className="lg-hdate" />
            <a href="#top" className="lg-mini">
              {c.name}
            </a>
          </div>
          <nav aria-label={c.t.menu} className="lg-links" data-nav>
            {c.nav.slice(0, 5).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="lg-slot is-end">
            <a href={cta.href} className="btn lg-fill lg-cta">
              {cta.label}
            </a>
            <button type="button" className="lg-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
              <i aria-hidden="true" />
              <span data-label data-open={c.t.menu} data-close={c.t.close}>
                {c.t.menu}
              </span>
            </button>
          </div>
        </div>
        <span className="lg-progress" aria-hidden="true" />
      </header>
      <div id="site-menu" className="lg-drawer" data-nav inert>
        <p className="lg-drawer-plate">{c.name}</p>
        <p className="lg-drawer-date lg-label">
          <DateStamp />
        </p>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <b>{two(k)}</b>
              {n.label}
              <i aria-hidden="true">→</i>
            </a>
          ))}
        </nav>
        <address>
          {b.address ?? b.city}
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
          {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
        </address>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const b = c.spec.business;
  const w = words(c);
  const p = c.photo(hero.image);
  const text = plain(hero.headline);
  const size = text.length > 54 ? "is-s" : text.length > 28 ? "is-m" : undefined;
  const step = text.length > 54 ? 16 : text.length > 28 ? 22 : 32;
  const facts = heroFacts(c);
  const offer = offerWords(c, 5);
  const open = facts.find((f) => f.label === c.t.hours);
  return (
    <>
    <section className="lg-hero">
      <div className="lg-wrap">
        <div className="lg-mast">
          <div className="lg-ear">
            {offer.length >= 2 ? (
              <>
                <small>{w.wire}</small>
                <b>{offer[0]}</b>
                <span>{offer[1]}</span>
              </>
            ) : (
              <>
                <small>{hero.eyebrow || c.t.address}</small>
                <b>{b.city ?? c.name}</b>
              </>
            )}
          </div>
          <div className="lg-plate-box">
            <p className="lg-plate" data-lg-fit="150" style={css({ "--n": Math.max(8, c.name.length), "--lw": longest(c.name) })}>
              {c.name}
            </p>
          </div>
          <div className="lg-ear">
            {open ? (
              <>
                <small>{c.t.hours}</small>
                <NowBadge c={c} className="lg-now" />
                <span>{open.value}</span>
              </>
            ) : b.phone ? (
              <>
                <small>{c.t.phone}</small>
                <b>
                  <a href={tel(b.phone)}>{b.phone}</a>
                </b>
              </>
            ) : (
              <>
                <small>{c.t.contact}</small>
                <b>{c.name.charAt(0)}</b>
              </>
            )}
          </div>
        </div>
        <div className="lg-dateline">
          <span style={i(0)}>{b.city ?? c.name}</span>
          <DateStamp />
          <span className="is-x" style={i(2)}>
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : b.tagline}
          </span>
        </div>
        <div className="lg-headline">
          {hero.eyebrow ? <p className="lg-kick">{hero.eyebrow}</p> : null}
          <h1 className={size} aria-label={text} style={css({ "--st": `${step}ms`, "--lw": longest(text) })}>
            <span aria-hidden="true">
              <Press text={hero.headline} />
            </span>
          </h1>
        </div>
        <div className="lg-front">
          <div>
            <p className="lg-deck lg-up" style={i(0)}>
              {hero.subheadline}
            </p>
            <p className="lg-by lg-label lg-up" style={i(1)}>
              <b>{c.name}</b>
              {b.city ? <span>{b.city}</span> : null}
            </p>
            <div className="lg-cta-row lg-up" style={i(2)}>
              <Btn c={c} href={hero.primaryCta.href}>
                {hero.primaryCta.label} <Arrow />
              </Btn>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="text">
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
            </div>
            {facts.length > 0 && (
              <dl className="lg-facts lg-up" style={i(3)}>
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          {p ? (
            <figure className="lg-photo" data-px>
              <div className="lg-print">
                <Pic p={p} eager sizes="(min-width: 1120px) 38vw, (min-width: 760px) 52vw, 100vw" />
              </div>
              <figcaption className="lg-cap">
                <b>{w.fig} 1</b>
                <span>{p.alt}</span>
              </figcaption>
            </figure>
          ) : (
            <div className="lg-notice" aria-hidden={offer.length ? undefined : true}>
              <span aria-hidden="true">{c.name.charAt(0)}</span>
              {offer.length > 0 ? (
                <>
                  <p className="lg-label">{w.wire}</p>
                  <ul>
                    {offer.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="lg-label">{b.city ?? c.name}</p>
              )}
            </div>
          )}
          <aside className="lg-rail lg-up" style={i(4)} aria-label={w.edition}>
            <p className="lg-rail-h lg-label">
              <span>{w.edition}</span>
              <span aria-hidden="true">§</span>
            </p>
            <nav className="lg-toc" aria-label={w.edition}>
              {c.nav.map((n, k) => (
                <a key={n.id} href={`#${n.id}`}>
                  <b>{two(k)}</b>
                  <span>{n.label}</span>
                  <i aria-hidden="true">→</i>
                </a>
              ))}
            </nav>
            {hero.note ? (
              <div className="lg-rail-box">
                <p className="lg-kick">{c.name}</p>
                <p>{hero.note}</p>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
    <Wire c={c} />
    </>
  );
}

/** A newswire line of what the business offers, from its own services or menu. */
function Wire({ c }: { c: Ctx }) {
  const list = offerWords(c);
  if (list.length < 3) return null;
  const row = [...list, ...list, ...list, ...list];
  return (
    <div className="lg-wire" aria-hidden="true">
      <b>{words(c).wire}</b>
      <div>
        <p>
          {row.map((x, n) => (
            <span key={n}>{x}</span>
          ))}
        </p>
      </div>
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const w = words(c);
  return (
    <footer className="lg-foot">
      <div className="lg-wrap">
        <p className="lg-foot-plate" data-lg-fit="170" style={css({ "--n": Math.max(8, c.name.length), "--lw": longest(c.name) })}>
          {c.name}
        </p>
        <p className="lg-foot-line lg-label">
          <span>{b.city ?? c.name}</span>
          <DateStamp />
        </p>
        <div className="lg-foot-grid">
          <div>
            <h3>{w.colophon}</h3>
            {b.address ? <span>{b.address}</span> : null}
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
            {b.mapsUrl ? (
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                {c.t.route}
              </a>
            ) : null}
          </div>
          <div>
            <h3>{w.edition}</h3>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </div>
          {b.openingHours?.length ? (
            <div>
              <h3>{c.t.hours}</h3>
              {b.openingHours.slice(0, 7).map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          ) : null}
          {c.spec.footer.blurb ? (
            <div>
              <h3>{c.name}</h3>
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
        </div>
        <Legal c={c} className="lg-legal" />
      </div>
    </footer>
  );
}

export const ledger: Family = {
  key: "ledger",
  root: "d-ledger",
  fonts: ["DM Serif Display", "Lora", "Archivo Narrow"],
  themeColor: "#f2ede1",
  accent: "#a3161b",
  onAccent: "#f8f5ed",
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "lg-wrap", eyebrow: "lg-kick", btn: "lg-fill", btnAlt: "lg-line", btnText: "lg-text" },
  Header,
  Hero,
  Footer,
  Head: (p, c) => <Head {...p} c={c} />,
  sections: {
    about: (s, c, n) => {
      const p = c.photo(s.image);
      const quote = pullQuote(s.paragraphs);
      const side = Boolean(p || quote || s.highlights.length);
      const length = s.paragraphs.join(" ").length;
      const tri = Boolean(p && (quote || s.highlights.length) && length < 420);
      return (
        <>
          <section className="lg-sec" id={s.id}>
            <div className="lg-wrap">
              <Head kicker={c.t.kick.about} title={s.title} no={n} c={c} />
              <div className={`lg-article${side ? " has-side" : ""}${tri ? " is-tri" : ""}`}>
                <div className={`lg-body${length > 420 ? " is-cols" : length < 300 ? " is-short" : ""}`} data-rv>
                  {s.paragraphs.map((x, k) => (
                    <p key={k} className={k === 0 ? drop(x, 100) : undefined}>
                      {x}
                    </p>
                  ))}
                </div>
                {side ? (
                  <aside className="lg-side">
                    {p ? (
                      <div data-rv>
                        <Print
                          p={p}
                          sizes="(min-width: 960px) 30vw, 92vw"
                          caption={
                            <>
                              <b>{words(c).fig} 2</b>
                              <span>{p.alt}</span>
                            </>
                          }
                        />
                      </div>
                    ) : null}
                    {quote || s.highlights.length ? (
                      <div className="lg-notes">
                        {quote ? (
                          <blockquote className="lg-pull" data-rv>
                            <p>{quote}</p>
                            <footer>{c.name}</footer>
                          </blockquote>
                        ) : null}
                        {s.highlights.length > 0 && (
                          <div data-rv>
                            <p className="lg-label" style={{ marginBottom: 10 }}>
                              {words(c).brief}
                            </p>
                            <ul className="lg-brief">
                              {s.highlights.map((h) => (
                                <li key={h}>{h}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </aside>
                ) : null}
              </div>
            </div>
          </section>
        </>
      );
    },
    services: (s, c, n) => {
      const [first, ...rest] = s.items;
      const lead = s.items.length >= 3 ? first : null;
      const others = lead ? rest : s.items;
      const p = lead ? c.photo("art:svc0") : null;
      const meta = (it: (typeof s.items)[number]) =>
        it.duration || it.price ? (
          <p className="lg-meta">
            {it.duration ? <span>{it.duration}</span> : null}
            {it.price ? <b>{it.price}</b> : null}
          </p>
        ) : null;
      return (
        <section className="lg-sec is-sheet" id={s.id}>
          <div className="lg-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} no={n} c={c} />
            {lead ? (
              <article className={`lg-lead${p ? " has-pic" : ""}`} data-rv>
                <span className="lg-big" aria-hidden="true">
                  1
                </span>
                <h3>
                  <span className="lg-hl">{lead.title}</span>
                </h3>
                <div>
                  <p className={drop(lead.description)}>{lead.description}</p>
                  {meta(lead)}
                </div>
                {p ? <Print p={p} sizes="(min-width: 900px) 22vw, 92vw" /> : null}
              </article>
            ) : null}
            <ol className="lg-arts">
              {others.map((it, k) => (
                <li key={k} className="lg-art" data-rv style={i(k % 4)}>
                  <p className="lg-no">
                    <span>{words(c).no}</span>
                    <b>{k + (lead ? 2 : 1)}</b>
                  </p>
                  <h3>
                    <span className="lg-hl">{it.title}</span>
                  </h3>
                  <p>{it.description}</p>
                  {meta(it)}
                </li>
              ))}
            </ol>
          </div>
        </section>
      );
    },
    menu: (s, c, n) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="lg-sec is-sheet" id={s.id}>
          <div className="lg-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} no={n} c={c} />
            <div className="lg-carte">
              {cats.map((cat, k) => (
                <div key={k} className="lg-cat" data-rv style={i(k % 3)}>
                  <h3>
                    {cat.name}
                    <small>{two(k)}</small>
                  </h3>
                  {cat.items.map((d, m) => (
                    <div key={m} className="lg-item">
                      <div className="lg-item-row">
                        <h4>{d.name}</h4>
                        {d.price ? (
                          <>
                            <span className="lg-lead-dots" aria-hidden="true" />
                            <b>{d.price}</b>
                          </>
                        ) : null}
                      </div>
                      {d.description ? <p>{d.description}</p> : null}
                      {d.tags?.length ? (
                        <p className="lg-tags">
                          {d.tags.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {s.note ? (
              <p className="lg-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c, n) => (
      <section className="lg-sec is-ink" id={s.id}>
        <div className="lg-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} no={n} c={c} />
          <ul className="lg-briefs">
            {s.items.map((it, k) => (
              <li key={k} data-rv style={i(k % 3)}>
                <span className="lg-ico">
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
    process: (s, c, n) => (
      <section className="lg-sec is-tint" id={s.id}>
        <div className="lg-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} no={n} c={c} />
          <ol className="lg-chron" data-px>
            {s.steps.map((st, k) => (
              <li key={k} data-rv style={i(k % 4)}>
                <span className="lg-rom" aria-hidden="true">
                  {ROMAN[k] ?? k + 1}
                </span>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    gallery: (s, c, n) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const shown = pics.slice(0, 6);
      return (
        <section className="lg-sec" id={s.id}>
          <div className="lg-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} no={n} c={c} />
            <div className={`lg-photos is-${shown.length}`}>
              {shown.map((p, k) => (
                <figure key={k} className="lg-shot" data-rv style={i(k % 3)}>
                  <div className="lg-print">
                    <Pic p={p} sizes={k === 0 ? "(min-width: 900px) 62vw, 100vw" : "(min-width: 900px) 31vw, 50vw"} />
                  </div>
                  <figcaption className="lg-cap">
                    <b>
                      {words(c).fig} {k + 1}
                    </b>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c, n) => (
      <section className="lg-sec is-tint" id={s.id}>
        <div className="lg-wrap lg-visit">
          <div className="lg-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} no={n} c={c} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="lg-board" data-rv>
            <div className="lg-board-h">
              <h3>{c.t.hours}</h3>
              <NowBadge c={c} className="lg-now" />
            </div>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    contact: (s, c, n) => {
      const b = c.spec.business;
      const hours = !c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") && b.openingHours?.length;
      return (
        <section className="lg-sec" id={s.id}>
          <div className="lg-wrap">
            <Head kicker={c.t.kick.contact} title={s.title} no={n} c={c} />
            <div className={`lg-class${s.showForm ? " has-form" : ""}`}>
              <div className="lg-ads">
                {s.body ? (
                  <article className="lg-ad is-text" data-rv>
                    <h3>{c.name}</h3>
                    <p className={drop(s.body)}>{s.body}</p>
                  </article>
                ) : null}
                {b.phone ? (
                  <article className="lg-ad is-inv" data-rv style={i(1)}>
                    <h3>{c.t.phone}</h3>
                    <a className="lg-big" href={tel(b.phone)}>
                      {b.phone}
                    </a>
                  </article>
                ) : null}
                {b.address ? (
                  <article className="lg-ad is-dbl" data-rv style={i(2)}>
                    <h3>{c.t.address}</h3>
                    <p className="lg-big">{b.address}</p>
                    {b.mapsUrl ? (
                      <a className="lg-text" href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                        {c.t.route} →
                      </a>
                    ) : null}
                  </article>
                ) : null}
                {b.email ? (
                  <article className="lg-ad is-dash" data-rv style={i(3)}>
                    <h3>{c.t.email}</h3>
                    <a className="lg-big" href={`mailto:${b.email}`}>
                      {b.email}
                    </a>
                  </article>
                ) : null}
                {hours ? (
                  <article className="lg-ad is-dash" data-rv style={i(3)}>
                    <h3>{c.t.hours}</h3>
                    <NowBadge c={c} className="lg-now" />
                    <Hours c={c} />
                  </article>
                ) : null}
                <article className="lg-ad is-red" data-rv style={i(4)}>
                  <h3>{b.city ?? c.t.contact}</h3>
                  <p className="lg-big">{c.name}</p>
                </article>
              </div>
              {s.showForm ? (
                <div className="lg-coupon" data-rv>
                  <span className="lg-cut" aria-hidden="true">
                    <Scissors />
                  </span>
                  <div className="lg-coupon-h">
                    <p>{c.t.message}</p>
                    <span className="lg-label">{c.name}</span>
                  </div>
                  <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    booking: (s, c, n) => (
      <section className="lg-sec is-sheet" id={s.id}>
        <div className="lg-wrap lg-visit">
          <div className="lg-visit-copy">
            <Head kicker={c.t.kick.booking} title={s.title} no={n} c={c} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Hours c={c} />
            <Reach c={c} />
          </div>
          <div className="lg-coupon" data-rv>
            <span className="lg-cut" aria-hidden="true">
              <Scissors />
            </span>
            <div className="lg-coupon-h">
              <p>{c.t.submit[s.kind]}</p>
              <span className="lg-label">{c.name}</span>
            </div>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </div>
        </div>
      </section>
    ),
    order: (s, c, n) => (
      <section className="lg-sec" id={s.id}>
        <div className="lg-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} no={n} c={c} />
          <ul className="lg-orders">
            {s.channels.map((ch, k) => (
              <li key={k} data-rv style={i(k % 3)}>
                <a href={ch.href} className="lg-order" {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="lg-ico">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <span className="lg-go" aria-hidden="true">
                    →
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

function Scissors() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.1 8.1 20 20M8.1 15.9 20 4" />
    </svg>
  );
}
