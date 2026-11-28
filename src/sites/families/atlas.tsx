import type { ReactNode } from "react";
import { NowBadge, TODAY_JS } from "./today";
import { Btn, css, DemoForm, em, heroFacts, hoursRows, i, Icon, Legal, long, Pic, Reach, splitLines, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Atlas: an original template (no portfolio demo). Swiss / International style: paper white
 * and black on a strict twelve-column grid whose guide lines fade in and stay faintly visible,
 * one signal-red dot, huge numerals and index labels, asymmetric compositions. The headline is
 * uncovered column by column by a row of shutters, sections are counted like a catalogue,
 * the projects run sideways through a pinned band as the page scrolls, services are a listing
 * with data columns and the opening hours are a timetable with bars on a 24-hour axis. Made
 * for architects, interior designers, estate agents and builders at the top of the market.
 */

const CSS = `
.d-atlas{--paper:#f4f4f1;--card:#ffffff;--stone:#e8e8e3;--ink:#0c0c0c;--ink-2:#2a2a28;--dim:#666662;--line:rgba(12,12,12,.14);--line-2:rgba(12,12,12,.07);--grid:rgba(12,12,12,.055);--red:#e4251c;--pad:clamp(16px,3.2vw,48px);--gut:clamp(10px,1.5vw,24px);--ease:cubic-bezier(.76,0,.24,1);--out:cubic-bezier(.16,1,.3,1);--disp:"Archivo",system-ui,sans-serif;--z-bg2:var(--stone);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--ink);--z-on-accent:var(--paper);--z-display:var(--disp);--z-display-weight:700;--z-radius:0px;--z-field-radius:0px;--z-ico-radius:0px;--z-sec:clamp(80px,10vw,160px);--z-h3:clamp(20px,1.7vw,26px);--z-statement:clamp(34px,5.4vw,92px);background:var(--paper);color:var(--ink-2);font-family:"Inter Tight",system-ui,sans-serif;font-size:clamp(16px,1.04vw,17.5px);line-height:1.55}
.d-atlas h1,.d-atlas h2,.d-atlas h3{font-family:var(--disp);font-weight:700;letter-spacing:-.045em;line-height:.94;color:var(--ink)}
.d-atlas h3{font-weight:600;letter-spacing:-.025em;line-height:1.12}
.d-atlas h2{font-size:clamp(40px,6.2vw,108px)}
.d-atlas h2.is-long{font-size:clamp(32px,4.2vw,70px);line-height:1}
.d-atlas h1 em,.d-atlas h2 em{font-style:normal;color:var(--dim)}
.d-atlas ::selection{background:var(--ink);color:var(--paper)}
.d-atlas .at-wrap{position:relative;width:min(100%,1480px);margin-inline:auto;padding-inline:var(--pad)}
.d-atlas .at-g{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));column-gap:var(--gut)}
.d-atlas .at-g>*{grid-column:1/-1;min-width:0}
@media (min-width:900px){.d-atlas .at-g{grid-template-columns:repeat(12,minmax(0,1fr))}}
.d-atlas .at-lab{font-family:var(--disp);font-size:11.5px;font-weight:600;line-height:1.3;letter-spacing:.11em;text-transform:uppercase;color:var(--dim);font-variant-numeric:tabular-nums}
.d-atlas .at-dot{display:inline-block;flex:none;width:.42em;height:.42em;border-radius:50%;background:var(--red);vertical-align:.08em}
.d-atlas .at-cols{position:fixed;top:0;bottom:0;left:50%;z-index:1;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));column-gap:var(--gut);width:min(100%,1480px);padding-inline:var(--pad);transform:translateX(-50%);pointer-events:none}
.d-atlas .at-cols i{border-inline:1px solid var(--grid);transform-origin:top;animation:at-col 1.6s var(--out) both;animation-delay:calc(var(--i,0) * 60ms)}
.d-atlas .at-cols i:nth-child(n+7){display:none}
@media (min-width:900px){.d-atlas .at-cols{grid-template-columns:repeat(12,minmax(0,1fr))}.d-atlas .at-cols i:nth-child(n+7){display:block}}
.d-atlas.menu-open .at-cols{opacity:0}
.d-atlas .btn{position:relative;border:0;display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:54px;padding:0 24px;font-family:var(--disp);font-size:15px;font-weight:600;letter-spacing:-.005em;line-height:1;white-space:nowrap;transition:background-color .35s,color .35s,border-color .35s,padding .45s var(--out)}
.d-atlas .btn svg{width:18px;height:18px;transition:transform .45s var(--out)}
.d-atlas .btn:hover svg{transform:translateX(5px)}
.d-atlas .at-fill{background:var(--ink);color:var(--paper)}
.d-atlas .at-fill::before{content:"";position:absolute;left:20px;top:50%;width:8px;height:8px;margin-top:-4px;border-radius:50%;background:var(--red);transform:scale(0);transition:transform .45s var(--out)}
.d-atlas .at-fill:hover{padding-left:40px}
.d-atlas .at-fill:hover::before{transform:scale(1)}
.d-atlas .at-line{border:1px solid var(--ink);color:var(--ink)}
.d-atlas .at-line:hover{background:var(--ink);color:var(--paper)}
.d-atlas .at-text{position:relative;display:inline-flex;align-items:center;gap:10px;min-height:44px;font-family:var(--disp);font-weight:600;color:var(--ink)}
.d-atlas .at-text::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:1px;background:currentColor;transform-origin:right;transition:transform .5s var(--ease)}
.d-atlas .at-text:hover::after{transform:scaleX(0)}
.d-atlas .at-hdr{position:sticky;top:0;z-index:50;background:rgba(244,244,241,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--line-2);transition:background-color .4s,color .4s,border-color .4s}
.d-atlas .at-bar{align-items:center;height:76px;transition:height .45s var(--out)}
.d-atlas.is-scrolled .at-bar{height:64px}
.d-atlas .at-logo{grid-column:1/5!important;display:inline-flex;align-items:baseline;gap:4px;min-width:0;font-family:var(--disp);font-size:clamp(17px,1.35vw,20px);font-weight:700;letter-spacing:-.03em;line-height:1.1;color:var(--ink)}
.d-atlas .at-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-atlas .at-logo .at-dot{width:9px;height:9px;transition:transform .5s var(--out)}
.d-atlas .at-logo:hover .at-dot{transform:translateX(4px) scale(1.3)}
.d-atlas .at-links{display:none}
.d-atlas .at-hdr-end{display:none}
.d-atlas .at-burger{grid-column:5/-1!important;justify-self:end;display:inline-flex;align-items:center;gap:12px;min-height:48px;padding:0 0 0 14px;border:0;background:none;font-family:var(--disp);font-size:14px;font-weight:600;letter-spacing:.02em;color:var(--ink)}
.d-atlas .at-burger i{position:relative;display:block;width:22px;height:10px}
.d-atlas .at-burger i::before,.d-atlas .at-burger i::after{content:"";position:absolute;left:0;width:100%;height:1.5px;background:currentColor;transition:transform .5s var(--ease),top .5s var(--ease)}
.d-atlas .at-burger i::before{top:0}
.d-atlas .at-burger i::after{top:8.5px}
.d-atlas.menu-open .at-burger i::before{top:4.25px;transform:rotate(45deg)}
.d-atlas.menu-open .at-burger i::after{top:4.25px;transform:rotate(-45deg)}
@media (min-width:1080px){.d-atlas .at-logo{grid-column:1/4!important}.d-atlas .at-links{grid-column:4/10;display:flex;gap:clamp(14px,1.8vw,30px)}.d-atlas .at-hdr-end{grid-column:10/-1;display:flex;justify-content:flex-end;align-items:center;gap:18px}.d-atlas .at-burger{display:none}}
.d-atlas .at-links a{position:relative;display:inline-flex;align-items:flex-start;gap:5px;padding:12px 0;font-family:var(--disp);font-size:14.5px;font-weight:500;color:var(--ink)}
.d-atlas .at-links a small{font-size:9.5px;font-weight:600;letter-spacing:.04em;color:var(--dim);font-variant-numeric:tabular-nums}
.d-atlas .at-links a::after{content:"";position:absolute;left:0;right:0;bottom:6px;height:1px;background:var(--ink);transform:scaleX(0);transform-origin:right;transition:transform .5s var(--ease)}
.d-atlas .at-links a:hover::after{transform:scaleX(1);transform-origin:left}
.d-atlas .at-hdr-end .btn{min-height:44px;padding:0 18px;font-size:14px}
.d-atlas .at-hdr-end .btn:hover{padding-left:34px}
.d-atlas .at-hdr-end .at-fill::before{left:16px}
.d-atlas .at-prog{position:absolute;left:0;right:0;bottom:-1px;height:1px;pointer-events:none}
.d-atlas .at-prog i{position:absolute;inset:0;background:var(--ink);transform:scaleX(var(--sp,0));transform-origin:left}
.d-atlas .at-prog b{position:absolute;top:-3px;left:calc(var(--sp,0) * 100% - 3px);width:7px;height:7px;border-radius:50%;background:var(--red);transform:scale(0);transition:transform .4s var(--out)}.d-atlas.is-scrolled .at-prog b{transform:none}
.d-atlas .at-now{display:inline-flex;align-items:center;gap:8px;font-family:var(--disp);font-size:11.5px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:var(--ink);white-space:nowrap}
.d-atlas .at-now::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--dim)}
.d-atlas .at-now.is-open::before{background:var(--red)}
.d-atlas .at-now.is-closed{color:var(--dim)}
.d-atlas .at-menu{position:fixed;inset:0;z-index:45;display:flex;flex-direction:column;justify-content:space-between;gap:28px;padding:96px var(--pad) 96px;overflow-y:auto;color:var(--paper);visibility:hidden;transition:visibility 0s .9s}
.d-atlas .at-menu.is-open{visibility:visible;transition:none}
.d-atlas .at-menu-bg{position:fixed;inset:0;z-index:-1;display:grid;grid-template-columns:repeat(6,1fr)}
.d-atlas .at-menu-bg i{margin-right:-1px;background:var(--ink);transform:scaleY(0);transform-origin:top;transition:transform .7s var(--ease);transition-delay:calc((5 - var(--i,0)) * 40ms)}
.d-atlas .at-menu.is-open .at-menu-bg i{transform:none;transition-delay:calc(var(--i,0) * 50ms)}
.d-atlas .at-menu nav{display:grid;border-top:1px solid rgba(244,244,241,.18)}
.d-atlas .at-menu nav a{display:grid;grid-template-columns:44px minmax(0,1fr) auto;align-items:baseline;gap:8px;min-height:64px;padding:14px 0;border-bottom:1px solid rgba(244,244,241,.18);font-family:var(--disp);font-size:clamp(28px,7.4vw,56px);font-weight:700;letter-spacing:-.045em;line-height:1;opacity:0;transform:translateY(24px);transition:opacity .4s,transform .6s var(--out)}
.d-atlas .at-menu nav a small{font-size:12px;font-weight:600;letter-spacing:.1em;color:rgba(244,244,241,.55);font-variant-numeric:tabular-nums}
.d-atlas .at-menu nav a::after{content:"";width:10px;height:10px;border-radius:50%;background:var(--red);transform:scale(0);transition:transform .4s var(--out)}
.d-atlas .at-menu nav a:hover::after{transform:scale(1)}
.d-atlas .at-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.35s + var(--i,0) * 60ms)}
.d-atlas .at-menu-foot{display:grid;gap:6px;font-size:15px;color:rgba(244,244,241,.7);opacity:0;transition:opacity .4s}
.d-atlas .at-menu.is-open .at-menu-foot{opacity:1;transition-delay:.7s}
.d-atlas .at-menu-foot a{display:inline-flex;align-items:center;min-height:44px;color:var(--paper);text-decoration:underline;text-underline-offset:4px}
.d-atlas .at-menu-foot .at-now{color:var(--paper)}
.d-atlas.menu-open .at-hdr{background:transparent;border-color:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-atlas.menu-open .at-logo,.d-atlas.menu-open .at-burger{color:var(--paper)}
.d-atlas.menu-open .at-prog{opacity:0}
.d-atlas .at-hero{position:relative;padding:clamp(28px,4vw,56px) 0 0}
.d-atlas .at-meta{row-gap:18px;padding-bottom:clamp(28px,4vw,52px)}
.d-atlas .at-meta>div{grid-column:span 3!important;display:grid;gap:5px;align-content:start;padding-top:10px;border-top:1px solid var(--ink);animation:at-fade .9s var(--out) both;animation-delay:calc(.1s + var(--i,0) * 90ms)}
.d-atlas .at-meta dt{margin:0}
.d-atlas .at-meta dd{margin:0;font-size:14.5px;line-height:1.4;color:var(--ink)}
.d-atlas .at-meta dd a{text-decoration:underline;text-decoration-color:var(--line);text-underline-offset:3px}
.d-atlas .at-meta dd a:hover{text-decoration-color:var(--ink)}
.d-atlas .at-h1box{position:relative}
.d-atlas .at-hero h1{font-size:clamp(54px,11.2vw,200px);font-weight:750;letter-spacing:-.058em;line-height:.88}
.d-atlas .at-hero h1.is-m{font-size:clamp(46px,8.6vw,154px)}
.d-atlas .at-hero h1.is-s{font-size:clamp(40px,6.9vw,124px);line-height:.9}
.d-atlas .at-ln{display:block;overflow:hidden;padding-bottom:.09em;margin-bottom:-.09em}
.d-atlas .at-ln>span{display:block;animation:at-line 1.15s var(--out) both;animation-delay:calc(.3s + var(--i,0) * 110ms)}
.d-atlas .at-ln:nth-child(2)>span{padding-left:calc(100% / 12 * 1)}
.d-atlas .at-ln:nth-child(3)>span{padding-left:calc(100% / 12 * 2)}
@media (max-width:899px){.d-atlas .at-ln>span{padding-left:0!important}}
.d-atlas .at-hdot{display:inline-block;width:.17em;height:.17em;margin-left:.04em;border-radius:50%;background:var(--red);vertical-align:baseline;animation:at-pop .8s var(--out) 1.35s both}
.d-atlas .at-shut{position:absolute;inset:-6% -1% -10%;z-index:2;display:grid;grid-template-columns:repeat(6,1fr);pointer-events:none}
.d-atlas .at-shut i{margin-right:-1px;background:var(--paper);transform-origin:top;animation:at-shut 1s var(--ease) both;animation-delay:calc(.25s + var(--i,0) * 70ms)}
.d-atlas .at-shut i:nth-child(n+7){display:none}
@media (min-width:900px){.d-atlas .at-shut{grid-template-columns:repeat(12,1fr)}.d-atlas .at-shut i:nth-child(n+7){display:block}.d-atlas .at-shut i{animation-delay:calc(.25s + var(--i,0) * 50ms)}}
.d-atlas .at-hero-grid{row-gap:32px;margin-top:clamp(32px,4vw,64px);align-items:start}
.d-atlas .at-hero-copy{display:grid;gap:26px;align-content:start;animation:at-fade 1s var(--out) 1s both}
.d-atlas .at-lede{max-width:40ch;font-size:clamp(17px,1.3vw,20px);line-height:1.45;color:var(--ink-2)}
.d-atlas .at-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px 24px}
.d-atlas .at-hero-pic{position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--stone);clip-path:inset(0 100% 0 0);animation:at-wipe 1.5s var(--ease) .75s forwards}
.d-atlas .at-hero-pic img{width:100%;height:100%;object-fit:cover;scale:1.22;transform:translateY(calc(var(--p,0) * -4%));animation:at-zoom 2.2s var(--out) .75s forwards}
.d-atlas .at-cap{display:flex;justify-content:space-between;gap:16px;margin-top:10px}
.d-atlas .at-hero-pic+.at-cap{animation:at-fade .8s var(--out) 1.6s both}
.d-atlas .at-hero-art{display:grid;align-content:end}
@media (min-width:900px){.d-atlas .at-hero-copy{grid-column:1/5!important;padding-top:4px}.d-atlas .at-hero-art{grid-column:5/-1!important}.d-atlas .at-hero-pic{aspect-ratio:16/9}}
.d-atlas .at-plate{position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--ink);color:var(--paper);clip-path:inset(0 100% 0 0);animation:at-wipe 1.5s var(--ease) .75s forwards}
@media (min-width:900px){.d-atlas .at-plate{aspect-ratio:16/9}}
.d-atlas .at-plate::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(244,244,241,.09) 0 1px,transparent 1px calc(100% / 8))}
.d-atlas .at-plate>b{position:absolute;left:4%;bottom:-.17em;font-family:var(--disp);font-size:clamp(150px,34vw,560px);font-weight:800;letter-spacing:-.06em;line-height:1;transform:translateY(calc(var(--p,0) * 8%))}
.d-atlas .at-plate>b .at-dot{width:.14em;height:.14em;margin-left:.02em;vertical-align:baseline}
.d-atlas .at-plate>span{position:absolute;top:18px;color:rgba(244,244,241,.7)}
.d-atlas .at-plate>span:first-of-type{left:20px}
.d-atlas .at-plate>span:last-of-type{right:20px;text-align:right}
.d-atlas .at-index{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gut);margin-top:clamp(48px,6vw,96px);border-top:1px solid var(--ink)}
@media (min-width:700px){.d-atlas .at-index{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}}
.d-atlas .at-index a{position:relative;display:grid;gap:4px;align-content:start;min-height:84px;padding:14px 0 20px;font-family:var(--disp);font-size:clamp(16px,1.3vw,19px);font-weight:600;letter-spacing:-.02em;color:var(--ink);animation:at-fade .8s var(--out) both;animation-delay:calc(1.4s + var(--i,0) * 70ms)}
.d-atlas .at-index a::after{content:"";position:absolute;right:4px;top:18px;width:8px;height:8px;border-radius:50%;background:var(--red);transform:scale(0);transition:transform .45s var(--out)}
.d-atlas .at-index a:hover::after{transform:scale(1)}
.d-atlas .at-index a span{transition:transform .45s var(--out)}
.d-atlas .at-index a:hover span{transform:translateX(6px)}
.d-atlas main{counter-reset:at}
.d-atlas .at-sec{position:relative;padding-block:clamp(84px,10vw,168px)}
.d-atlas .at-sec,.d-atlas .z-sec{border-top:1px solid var(--line)}
.d-atlas .at-hero+.at-sec,.d-atlas .at-hero+.z-sec{border-top:0}
.d-atlas .at-sec.is-ink{background:var(--ink);color:rgba(244,244,241,.78);border-color:var(--ink)}
.d-atlas .at-sec.is-ink h2,.d-atlas .at-sec.is-ink h3{color:var(--paper)}
.d-atlas .at-sec.is-ink .at-lab,.d-atlas .at-sec.is-ink .at-idx{color:rgba(244,244,241,.55)}
.d-atlas .at-sec.is-stone{background:var(--stone)}
.d-atlas .at-head{counter-increment:at;row-gap:22px;margin-bottom:clamp(44px,6vw,96px)}
.d-atlas .at-idx{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 12px;font-family:var(--disp);font-size:11.5px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:var(--dim)}
.d-atlas .at-idx::before{content:"(" counter(at,decimal-leading-zero) ")";color:var(--ink);font-variant-numeric:tabular-nums}
.d-atlas .is-ink .at-idx::before{color:var(--paper)}
.d-atlas .at-idx.is-plain::before{content:none}
.d-atlas .at-head>.at-idx{padding-top:10px;border-top:1px solid currentColor;border-color:var(--ink)}
.d-atlas .is-ink .at-head>.at-idx{border-color:rgba(244,244,241,.4)}
.d-atlas .at-head>p:not(.at-idx){max-width:52ch;font-size:clamp(17px,1.25vw,19px);color:var(--dim)}
.d-atlas .is-ink .at-head>p:not(.at-idx){color:rgba(244,244,241,.66)}
@media (min-width:900px){.d-atlas .at-head>.at-idx{grid-column:1/4!important;align-self:start}.d-atlas .at-head>h2{grid-column:4/-1!important}.d-atlas .at-head>p:not(.at-idx){grid-column:4/11!important}.d-atlas .at-head.is-tight>h2{grid-column:4/11!important}}
.demo-js .d-atlas .at-head h2[data-rv],.demo-js .d-atlas .at-wipe[data-rv]{opacity:1;transform:none;clip-path:inset(-12% 100% -18% 0);transition:clip-path 1.2s var(--ease)}
.demo-js .d-atlas .at-head h2[data-rv].in,.demo-js .d-atlas .at-wipe[data-rv].in{clip-path:inset(-12% -6% -18% 0)}
.d-atlas .at-about{row-gap:44px;align-items:start}
.d-atlas .at-about-pic{position:relative}
.d-atlas .at-about-pic>div{aspect-ratio:4/5;overflow:hidden;background:var(--stone)}
.d-atlas .at-about-pic img{width:100%;height:112%;object-fit:cover;transform:translateY(calc(var(--p,0) * -5%))}
.d-atlas .at-about-copy{display:grid;gap:28px;align-content:start}
.d-atlas .at-lead{font-family:var(--disp);font-size:clamp(23px,2.35vw,38px);font-weight:500;letter-spacing:-.03em;line-height:1.16;color:var(--ink)}
.d-atlas .at-lead::first-letter{color:var(--ink)}
.d-atlas .at-paras{display:grid;gap:18px;color:var(--dim)}
@media (min-width:700px){.d-atlas .at-paras.is-2{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gut)}}
.d-atlas .at-hl{display:grid;border-top:1px solid var(--ink)}
.d-atlas .at-hl li{display:grid;grid-template-columns:56px minmax(0,1fr) auto;align-items:baseline;gap:12px;padding:16px 0;border-bottom:1px solid var(--line);font-family:var(--disp);font-size:clamp(17px,1.4vw,21px);font-weight:600;letter-spacing:-.02em;color:var(--ink);transition:padding .45s var(--out)}
.d-atlas .at-hl li:hover{padding-left:10px}
.d-atlas .at-hl li small{font-size:11.5px;letter-spacing:.1em;color:var(--dim);font-variant-numeric:tabular-nums}
.d-atlas .at-hl li::after{content:"";width:8px;height:8px;border-radius:50%;background:var(--red);transform:scale(0);transition:transform .4s var(--out)}
.d-atlas .at-hl li:hover::after{transform:scale(1)}
@media (min-width:900px){.d-atlas .at-about.has-pic .at-about-pic{grid-column:1/6!important;position:sticky;top:110px}.d-atlas .at-about.has-pic .at-about-copy{grid-column:7/-1!important}.d-atlas .at-about:not(.has-pic) .at-about-copy{grid-column:4/-1!important}}
.d-atlas .at-band{position:relative;margin-top:clamp(64px,8vw,128px)}
.d-atlas .at-sec>.at-band:first-child{margin-top:0}
.d-atlas .at-band-top{display:flex;justify-content:space-between;align-items:baseline;gap:20px;padding-bottom:18px}
.d-atlas .at-band-count{display:none;font-family:var(--disp);font-size:13px;font-weight:600;letter-spacing:.08em;color:var(--dim);font-variant-numeric:tabular-nums}
.d-atlas .at-band-count b{color:var(--ink)}
.d-atlas .at-band-track{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px var(--gut);width:min(100%,1480px);margin-inline:auto;padding-inline:var(--pad)}
.d-atlas .at-band-item{display:grid;grid-template-columns:minmax(0,1fr);gap:10px;align-content:start;min-width:0}
.d-atlas .at-band-item:nth-child(3n+1){grid-column:1/-1}
.d-atlas .at-band-img{aspect-ratio:4/5;overflow:hidden;background:var(--stone)}
.d-atlas .at-band-item:nth-child(3n+1) .at-band-img{aspect-ratio:16/10}
.d-atlas .at-band-img img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s var(--out)}
.d-atlas .at-band-item:hover img{transform:scale(1.045)}
.d-atlas .at-band-item figcaption{display:flex;gap:12px;justify-content:space-between}
.d-atlas .at-band-item figcaption span:last-child{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right}
.d-atlas .at-band-bar{display:none}
@media (min-width:900px){.d-atlas .at-band-track{grid-template-columns:repeat(3,minmax(0,1fr))}.d-atlas .at-band-item:nth-child(3n+1){grid-column:auto}.d-atlas .at-band-item:nth-child(3n+1) .at-band-img{aspect-ratio:4/5}.d-atlas .at-band-item:nth-child(3n+2){margin-top:12vh}}
.d-atlas .at-band.is-pin{height:var(--bh,auto)}
.d-atlas .at-band.is-pin .at-band-pin{position:sticky;top:0;display:flex;flex-direction:column;justify-content:center;height:100vh;height:100svh;padding-top:64px}
.d-atlas .at-band.is-pin .at-band-count{display:block}
.d-atlas .at-band.is-pin .at-band-track{display:flex;align-items:flex-start;gap:clamp(20px,2.4vw,40px);width:max-content;margin:0;padding-inline:var(--pad) calc(var(--pad) + 8vw);will-change:transform}
.d-atlas .at-band.is-pin .at-band-item{flex:none;margin:0}
.d-atlas .at-band.is-pin .at-band-img{height:min(56vh,600px);aspect-ratio:4/5}
.d-atlas .at-band.is-pin .at-band-item:nth-child(3n+1) .at-band-img{aspect-ratio:3/2}
.d-atlas .at-band.is-pin .at-band-item:nth-child(3n+2){margin-top:7vh}
.d-atlas .at-band.is-pin .at-band-item:nth-child(3n) .at-band-img{height:min(44vh,480px);aspect-ratio:1}
.d-atlas .at-band.is-pin .at-band-item figcaption{max-width:100%}
.d-atlas .at-band.is-pin .at-band-bar{position:relative;display:block;height:1px;margin-top:clamp(20px,3vh,36px);background:var(--line)}
.d-atlas .at-band-bar i{position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:left}
.d-atlas .at-band-bar b{position:absolute;top:-4px;left:calc(var(--bp,0) * 100% - 4px);width:9px;height:9px;border-radius:50%;background:var(--red)}
.d-atlas .at-rows{border-top:1px solid var(--ink)}
.d-atlas .at-row{position:relative;display:grid;grid-template-columns:42px minmax(0,1fr) 28px;column-gap:var(--gut);row-gap:8px;align-items:baseline;padding:22px 0;border-bottom:1px solid var(--line);color:var(--ink-2);isolation:isolate;transition:color .35s,padding .5s var(--out)}
.d-atlas .at-row::before{content:"";position:absolute;inset:0 calc(var(--pad) * -1);z-index:-1;background:var(--ink);transform:scaleY(0);transform-origin:bottom;transition:transform .5s var(--ease)}
.d-atlas .at-row-n{font-family:var(--disp);font-size:12px;font-weight:600;letter-spacing:.08em;color:var(--dim);font-variant-numeric:tabular-nums}
.d-atlas .at-row h3{grid-column:2;font-size:clamp(22px,2.2vw,34px);letter-spacing:-.035em;transition:color .35s}
.d-atlas .at-row p{grid-column:2/-1;max-width:56ch;color:var(--dim);transition:color .35s}
.d-atlas .at-row-meta{grid-column:2/-1;display:flex;flex-wrap:wrap;gap:4px 18px;font-family:var(--disp);font-size:14px;font-weight:600;color:var(--ink);font-variant-numeric:tabular-nums;transition:color .35s}
.d-atlas .at-row-meta:empty{display:none}
.d-atlas .at-row-go{grid-column:3;grid-row:1;justify-self:end;display:grid;place-items:center;width:28px;height:28px;color:var(--ink);transition:transform .5s var(--out),color .35s}
.d-atlas .at-row-go svg{width:18px;height:18px}
.d-atlas .at-row-pic{display:none}
.d-atlas .at-row:hover{color:rgba(244,244,241,.8)}
.d-atlas .at-row:hover::before{transform:scaleY(1);transform-origin:top}
.d-atlas .at-row:hover h3,.d-atlas .at-row:hover .at-row-meta,.d-atlas .at-row:hover .at-row-go{color:var(--paper)}
.d-atlas .at-row:hover p{color:rgba(244,244,241,.7)}
.d-atlas .at-row:hover .at-row-n{color:var(--red)}
.d-atlas .at-row:hover .at-row-go{transform:rotate(-45deg)}
@media (min-width:900px){.d-atlas .at-row{grid-template-columns:repeat(12,minmax(0,1fr));align-items:center;padding:26px 0}.d-atlas .at-row:hover{padding-left:12px}.d-atlas .at-row h3{grid-column:2/6}.d-atlas .at-row p{grid-column:6/10}.d-atlas .at-row-meta{grid-column:10/12;flex-direction:column;align-items:flex-end;text-align:right}.d-atlas .at-row-go{grid-column:12;grid-row:auto}.d-atlas .at-rows.has-pics .at-row-pic{grid-column:2/4;display:block;aspect-ratio:4/3;overflow:hidden;background:var(--stone)}.d-atlas .at-rows.has-pics .at-row-pic img{width:100%;height:100%;object-fit:cover;filter:grayscale(1);transition:filter .6s,transform 1s var(--out)}.d-atlas .at-rows.has-pics .at-row:hover .at-row-pic img{filter:none;transform:scale(1.06)}.d-atlas .at-rows.has-pics .at-row h3{grid-column:4/7}.d-atlas .at-rows.has-pics .at-row p{grid-column:7/10}}
.d-atlas .at-rows-foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px;margin-top:22px}
.d-atlas .at-cat{row-gap:18px}
.d-atlas .at-cat+.at-cat{margin-top:clamp(48px,6vw,88px)}
.d-atlas .at-cat>h3{font-size:clamp(26px,2.6vw,40px)}
@media (min-width:900px){.d-atlas .at-cat>h3{grid-column:1/4!important;position:sticky;top:110px;align-self:start}.d-atlas .at-cat>ol{grid-column:4/-1!important}}
.d-atlas .at-dish{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 24px;align-items:baseline;padding:18px 0;border-bottom:1px solid var(--line);transition:padding .45s var(--out)}
.d-atlas .at-dish:first-child{border-top:1px solid var(--ink)}
.d-atlas .at-dish:hover{padding-left:10px}
.d-atlas .at-dish b{font-family:var(--disp);font-size:clamp(18px,1.5vw,22px);font-weight:600;letter-spacing:-.02em;color:var(--ink)}
.d-atlas .at-dish span{font-family:var(--disp);font-weight:600;color:var(--ink);font-variant-numeric:tabular-nums;white-space:nowrap}
.d-atlas .at-dish p,.d-atlas .at-dish small{grid-column:1/-1;color:var(--dim)}
.d-atlas .at-cells{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));border-top:1px solid var(--ink);border-left:1px solid var(--line)}
.d-atlas .at-cell{position:relative;display:grid;grid-template-rows:auto 1fr auto auto;gap:14px;min-height:clamp(230px,30vw,420px);padding:clamp(20px,2vw,30px);border-right:1px solid var(--line);border-bottom:1px solid var(--line);transition:background-color .45s,color .45s}
.d-atlas .at-big{font-family:var(--disp);font-size:clamp(84px,9vw,156px);font-weight:800;letter-spacing:-.07em;line-height:.8;color:var(--stone);font-variant-numeric:tabular-nums;transition:color .45s}
.d-atlas .is-ink .at-big{color:rgba(244,244,241,.12)}
.d-atlas .at-cell .at-ico{position:absolute;top:clamp(20px,2vw,30px);right:clamp(20px,2vw,30px);display:grid;place-items:center;width:46px;height:46px;border:1px solid var(--line);color:var(--ink);transition:background-color .45s,color .45s,border-color .45s}
.d-atlas .at-cell .at-ico svg{width:20px;height:20px}
.d-atlas .at-cell h3{align-self:end;font-size:clamp(22px,1.9vw,28px)}
.d-atlas .at-cell p{color:var(--dim);transition:color .45s}
.d-atlas .at-cell:hover{background:var(--ink);color:var(--paper)}
.d-atlas .at-cell:hover h3{color:var(--paper)}
.d-atlas .at-cell:hover p{color:rgba(244,244,241,.7)}
.d-atlas .at-cell:hover .at-big{color:var(--paper)}
.d-atlas .at-cell:hover .at-ico{border-color:var(--red);background:var(--red);color:#fff}
.d-atlas .is-ink .at-cells{border-top-color:rgba(244,244,241,.5);border-left-color:rgba(244,244,241,.14)}
.d-atlas .is-ink .at-cell{border-color:rgba(244,244,241,.14)}
.d-atlas .is-ink .at-cell .at-ico{border-color:rgba(244,244,241,.2);color:var(--paper)}
.d-atlas .is-ink .at-cell p{color:rgba(244,244,241,.62)}
.d-atlas .is-ink .at-cell:hover{background:var(--paper)}
.d-atlas .is-ink .at-cell:hover h3,.d-atlas .is-ink .at-cell:hover .at-big{color:var(--ink)}
.d-atlas .is-ink .at-cell:hover p{color:var(--dim)}
.d-atlas .at-stairs{display:grid;gap:44px}
.d-atlas .at-step{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:20px;row-gap:10px;padding-top:18px;border-top:2px solid var(--ink)}
.d-atlas .at-step::before{content:"";position:absolute;left:-1px;top:-6px;width:10px;height:10px;border-radius:50%;background:var(--red);transform:scale(0);transition:transform .6s var(--out) .5s}
.d-atlas .at-step.in::before,html:not(.demo-js) .d-atlas .at-step::before{transform:none}
.d-atlas .at-step .at-big{grid-row:1/4;font-size:clamp(64px,7vw,120px);color:var(--ink)}
.d-atlas .at-step h3{font-size:clamp(22px,1.9vw,28px)}
.d-atlas .at-step p{color:var(--dim)}
@media (min-width:900px){.d-atlas .at-stairs{grid-template-columns:repeat(var(--n,4),minmax(0,1fr));column-gap:var(--gut);align-items:start}.d-atlas .at-step{grid-template-columns:minmax(0,1fr);margin-top:calc(var(--i,0) * clamp(48px,5vw,88px))}.d-atlas .at-step .at-big{grid-row:auto;margin-bottom:18px}}
.demo-js .d-atlas .at-step[data-rv]{opacity:1;transform:none;clip-path:inset(-20px 100% -10px 0);transition:clip-path 1.1s var(--ease);transition-delay:calc(var(--i,0) * 140ms)}
.demo-js .d-atlas .at-step[data-rv].in{clip-path:inset(-20px -10px -10px 0)}
.d-atlas .at-time{row-gap:48px}
.d-atlas .at-time-info{display:grid;gap:26px;align-content:start}
.d-atlas .at-time-info>p{max-width:44ch;color:var(--dim)}
.d-atlas .at-time-now{display:flex;align-items:center;gap:14px;padding:16px 0;border-top:1px solid var(--ink);border-bottom:1px solid var(--line)}
.d-atlas .at-cells-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:22px var(--gut)}
.d-atlas .at-cells-2>div{display:grid;gap:6px;align-content:start;padding-top:10px;border-top:1px solid var(--line)}
.d-atlas .at-cells-2 dd,.d-atlas .at-cells-2 p{margin:0;color:var(--ink)}
.d-atlas .at-cells-2 a{display:inline-flex;align-items:center;min-height:32px;text-decoration:underline;text-decoration-color:var(--line);text-underline-offset:4px;transition:text-decoration-color .3s}
.d-atlas .at-cells-2 a:hover{text-decoration-color:var(--ink)}
@media (min-width:900px){.d-atlas .at-time-info{grid-column:1/5!important}.d-atlas .at-time-table{grid-column:6/-1!important}}
.d-atlas .at-axis{display:grid;grid-template-columns:minmax(110px,1.1fr) minmax(0,2.4fr);gap:var(--gut);padding-bottom:10px}
.d-atlas .at-axis>div{position:relative;display:flex;justify-content:space-between}
.d-atlas .at-axis span{font-family:var(--disp);font-size:11px;font-weight:600;letter-spacing:.06em;color:var(--dim);font-variant-numeric:tabular-nums}
.d-atlas .at-hours{border-top:1px solid var(--ink)}
.d-atlas .at-hours>div{position:relative;display:grid;grid-template-columns:minmax(110px,1.1fr) minmax(0,2.4fr);grid-template-areas:"d b" "t b";column-gap:var(--gut);row-gap:2px;align-items:center;padding:16px 0;border-bottom:1px solid var(--line)}
.d-atlas .at-hours dt{grid-area:d;font-family:var(--disp);font-weight:600;letter-spacing:-.01em;color:var(--ink)}
.d-atlas .at-hours dd{grid-area:t;margin:0;font-size:14px;text-align:left;color:var(--dim);font-variant-numeric:tabular-nums}
.d-atlas .at-tbar{grid-area:b;position:relative;height:22px;background:repeating-linear-gradient(90deg,var(--line) 0 1px,transparent 1px calc(100% / 4));background-size:calc(100% + 1px) 100%}
.d-atlas .at-tbar::after{content:"";position:absolute;right:0;top:0;bottom:0;width:1px;background:var(--line)}
.d-atlas .at-tbar i{position:absolute;top:5px;bottom:5px;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform 1.1s var(--ease);transition-delay:calc(.2s + var(--i,0) * 80ms)}
.d-atlas .at-hours.in .at-tbar i,html:not(.demo-js) .d-atlas .at-tbar i{transform:none}
.d-atlas .at-hours>div.is-today dt::before{content:"";display:inline-block;width:8px;height:8px;margin-right:10px;border-radius:50%;background:var(--red);vertical-align:.12em}
.d-atlas .at-hours>div.is-today .at-tbar i{background:var(--red)}
.d-atlas .at-hours>div.is-today dd{color:var(--ink)}
.d-atlas .z-hours div.is-today{font-weight:600}
@media (max-width:560px){.d-atlas .at-axis,.d-atlas .at-hours>div{grid-template-columns:minmax(0,1fr);grid-template-areas:"d" "t" "b"}.d-atlas .at-axis>span{display:none}.d-atlas .at-tbar{margin-top:8px}}
.d-atlas .at-book{row-gap:48px}
.d-atlas .at-book-info{display:grid;gap:28px;align-content:start}
.d-atlas .at-book-info>p{max-width:44ch;font-size:clamp(17px,1.25vw,19px);color:var(--dim)}
.d-atlas .at-book-info .z-hours{font-size:15px}
@media (min-width:900px){.d-atlas .at-book-info{grid-column:1/5!important}.d-atlas .at-book-form{grid-column:6/-1!important}}
.d-atlas .at-book-form{position:relative;padding-top:26px;border-top:2px solid var(--ink)}
.d-atlas .at-form{counter-reset:atf}
.d-atlas .at-form .z-fields{gap:4px var(--gut)}
.d-atlas .z-field{position:relative;gap:2px}
.d-atlas .z-field label,.d-atlas .z-chipset legend{font-family:var(--disp);font-size:11.5px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:var(--dim)}
.d-atlas .at-form .z-field{counter-increment:atf;padding-top:16px}
.d-atlas .at-form .z-field label::before{content:counter(atf,decimal-leading-zero) "  ";color:var(--ink)}
.d-atlas .z-field input,.d-atlas .z-field select,.d-atlas .z-field textarea{min-height:52px;padding:10px 0;border:0;border-bottom:1px solid var(--line);background:transparent;font-size:17px;color:var(--ink);transition:border-color .3s,padding .4s var(--out)}
.d-atlas .z-field select{background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%230c0c0c' stroke-width='1.4'/%3E%3C/svg%3E") right 4px center/12px 8px no-repeat}
.d-atlas .z-field input:hover,.d-atlas .z-field select:hover,.d-atlas .z-field textarea:hover{border-color:var(--ink)}
.d-atlas .z-field input:focus,.d-atlas .z-field select:focus,.d-atlas .z-field textarea:focus{border-color:var(--ink);padding-left:12px;outline:none}
.d-atlas .z-field :focus-visible{outline:none;box-shadow:inset 0 -2px 0 var(--red)}
.d-atlas .z-field textarea{min-height:96px}
.d-atlas .z-form .btn{justify-content:space-between;width:100%;min-height:62px;margin-top:10px;font-size:16px}
.d-atlas .form-status{border-color:var(--ink);border-left:4px solid var(--red)}
.d-atlas .z-chips button{font-family:var(--disp);font-weight:600}
.d-atlas .at-reach{display:grid;gap:clamp(6px,1vw,14px);font-style:normal}
.d-atlas .at-reach a,.d-atlas .at-reach span{position:relative;display:inline-flex;align-items:center;gap:.3em;justify-self:start;max-width:100%;min-height:44px;font-family:var(--disp);font-size:clamp(26px,4.6vw,76px);font-weight:700;letter-spacing:-.05em;line-height:1;color:var(--ink);overflow-wrap:anywhere}
.d-atlas .at-reach span{font-size:clamp(20px,2.4vw,36px);font-weight:600;letter-spacing:-.03em;color:var(--dim)}
.d-atlas .at-reach a::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:2px;background:var(--ink);transform:scaleX(0);transform-origin:right;transition:transform .6s var(--ease)}
.d-atlas .at-reach a:hover::after{transform:scaleX(1);transform-origin:left}
.d-atlas .at-reach a svg{width:.5em;height:.5em;flex:none;transition:transform .5s var(--out)}
.d-atlas .at-reach a:hover svg{transform:translate(4px,-4px)}
.d-atlas .at-reach a.is-small{font-size:clamp(18px,1.6vw,24px);letter-spacing:-.02em;font-weight:600}
.d-atlas .at-contact{row-gap:56px}
.d-atlas .at-contact-side{display:grid;gap:28px;align-content:start}
.d-atlas .at-contact-side>p{max-width:44ch;color:var(--dim)}
@media (min-width:900px){.d-atlas .at-contact.has-form .at-reach{grid-column:1/8!important}.d-atlas .at-contact.has-form .at-contact-side{grid-column:8/-1!important}.d-atlas .at-contact:not(.has-form) .at-reach{grid-column:1/9!important}.d-atlas .at-contact:not(.has-form) .at-contact-side{grid-column:9/-1!important}}
.d-atlas .at-chan{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));border-top:1px solid var(--ink);border-left:1px solid var(--line)}
.d-atlas .at-chan a{position:relative;display:grid;grid-template-rows:auto 1fr auto;gap:16px;min-height:260px;padding:clamp(20px,2vw,30px);border-right:1px solid var(--line);border-bottom:1px solid var(--line);isolation:isolate;transition:color .4s}
.d-atlas .at-chan a::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--ink);transform:scaleY(0);transform-origin:bottom;transition:transform .55s var(--ease)}
.d-atlas .at-chan a:hover{color:var(--paper)}
.d-atlas .at-chan a:hover::before{transform:none;transform-origin:top}
.d-atlas .at-chan a:hover h3{color:var(--paper)}
.d-atlas .at-chan a:hover p{color:rgba(244,244,241,.7)}
.d-atlas .at-chan .at-ico{display:grid;place-items:center;width:46px;height:46px;border:1px solid var(--line);transition:border-color .4s,background-color .4s}
.d-atlas .at-chan a:hover .at-ico{border-color:var(--red);background:var(--red);color:#fff}
.d-atlas .at-chan .at-ico svg{width:20px;height:20px}
.d-atlas .at-chan h3{align-self:end;font-size:clamp(24px,2.2vw,34px)}
.d-atlas .at-chan p{color:var(--dim);transition:color .4s}
.d-atlas .at-chan small{display:flex;justify-content:space-between;align-items:center}
.d-atlas .at-chan small svg{width:18px;height:18px;transition:transform .5s var(--out)}
.d-atlas .at-chan a:hover small svg{transform:rotate(-45deg)}
.d-atlas .z-sec.z-cta{background:var(--ink);color:rgba(244,244,241,.75);border-color:var(--ink)}
.d-atlas .z-cta .z-center{justify-items:start;text-align:left}
.d-atlas .z-cta h2{max-width:16ch;font-size:clamp(42px,7vw,124px);color:var(--paper)}
.d-atlas .z-cta .z-center::before{content:"";width:14px;height:14px;border-radius:50%;background:var(--red)}
.d-atlas .z-cta .z-center>p{color:rgba(244,244,241,.7)}
.d-atlas .z-cta .at-fill{background:var(--paper);color:var(--ink)}
.d-atlas .z-statement .z-center{justify-items:start;text-align:left}
.d-atlas .z-statement h2{max-width:20ch;font-weight:600;letter-spacing:-.045em;line-height:1}
.d-atlas .z-statement .at-lab{order:-1;padding-top:10px;border-top:1px solid var(--ink);min-width:min(100%,280px)}
.d-atlas .z-showcase .z-show-in h2{max-width:14ch;font-size:clamp(44px,7vw,120px);color:inherit}
.d-atlas .z-showcase.has-pic::after{background:linear-gradient(90deg,rgba(12,12,12,.55),rgba(12,12,12,0) 70%),linear-gradient(180deg,rgba(12,12,12,0) 30%,rgba(12,12,12,.72))}.d-atlas .z-showcase.has-pic h2 em{color:rgba(255,255,255,.66)}
.d-atlas .z-showcase .at-line{border-color:currentColor;color:inherit}
.d-atlas .z-showcase .at-line:hover{background:var(--paper);color:var(--ink)}
.d-atlas .z-card{border-color:var(--line);background:var(--card);transition:background-color .4s,color .4s}
.d-atlas .z-pack.is-featured{background:var(--ink);border-color:var(--ink);color:rgba(244,244,241,.75)}
.d-atlas .z-pack.is-featured h3,.d-atlas .z-pack.is-featured .z-pack-price b{color:var(--paper)}
.d-atlas .z-pack.is-featured .z-tag{color:var(--paper)}
.d-atlas .z-pack.is-featured .z-tag::before{content:"";display:inline-block;width:7px;height:7px;margin-right:8px;border-radius:50%;background:var(--red)}
.d-atlas .z-pack-price b{letter-spacing:-.05em}
.d-atlas .z-ticks li::before{background:var(--ink)}
.d-atlas .z-pack.is-featured .z-ticks li::before{background:var(--red)}
.d-atlas .z-team .z-grid>li{padding-top:12px;border-top:1px solid var(--ink)}
.d-atlas .z-team .z-pic img{filter:grayscale(1);transition:filter .6s}
.d-atlas .z-team .z-grid>li:hover .z-pic img{filter:none}
.d-atlas .z-quotes blockquote{border-top:1px solid var(--ink)}
.d-atlas .z-quotes blockquote>p{font-weight:500;letter-spacing:-.03em;line-height:1.2}
.d-atlas .z-quotes blockquote>p::before{content:"“";display:block;height:.55em;font-size:2.4em;line-height:1;color:var(--red)}
.d-atlas .z-acc{border-top:1px solid var(--ink)}
.d-atlas .z-acc summary{font-family:var(--disp);font-size:clamp(19px,1.7vw,26px);font-weight:600;letter-spacing:-.025em;transition:padding .45s var(--out)}
.d-atlas .z-acc summary:hover{padding-left:10px}
.d-atlas .z-acc summary i{width:36px;height:36px;border:1px solid var(--line);transition:background-color .3s,border-color .3s}
.d-atlas .z-acc summary i::before,.d-atlas .z-acc summary i::after{left:11px;width:12px}
.d-atlas .z-acc details[open] summary i{background:var(--ink);border-color:var(--ink);color:var(--paper)}
.d-atlas .z-acc details>p{animation:at-fade .5s var(--out)}
@media (min-width:900px){.d-atlas .z-faq .z-narrow{max-width:none}.d-atlas .z-faq .z-acc{margin-left:calc((100% - var(--gut) * 11) / 12 * 3 + var(--gut) * 3)}}
.d-atlas .z-ba{border-radius:0}
.d-atlas .z-ba::after{background:var(--red)}
.d-atlas .z-channel:hover{border-color:var(--ink)}
.d-atlas .z-panel{background:var(--card)}
.d-atlas .z-rows small,.d-atlas .z-steps small{font-family:var(--disp);font-weight:600;color:var(--ink)}
.d-atlas .at-foot{position:relative;z-index:2;padding:clamp(80px,9vw,140px) 0 120px;background:var(--ink);color:rgba(244,244,241,.66)}
.d-atlas .at-foot-top{row-gap:28px;align-items:end;padding-bottom:clamp(48px,6vw,88px)}
.d-atlas .at-foot-top>p{font-family:var(--disp);font-size:clamp(28px,3.6vw,56px);font-weight:600;letter-spacing:-.04em;line-height:1.02;color:var(--paper)}
.d-atlas .at-foot-top>p em{font-style:normal;color:rgba(244,244,241,.5)}
.d-atlas .at-foot .at-fill{background:var(--paper);color:var(--ink)}
@media (min-width:900px){.d-atlas .at-foot-top>p{grid-column:1/9!important}.d-atlas .at-foot-top>div{grid-column:10/-1!important;justify-self:end}}
.d-atlas .at-foot-name{display:block;padding-block:.06em .02em;border-block:1px solid rgba(244,244,241,.18);font-family:var(--disp);font-size:min(17vw,calc(178vw / var(--n,10)));font-weight:800;letter-spacing:-.065em;line-height:.86;color:var(--paper);overflow-wrap:anywhere}
.d-atlas .at-foot-name .at-dot{width:.16em;height:.16em;margin-left:.03em;vertical-align:baseline}
.d-atlas .at-foot-grid{row-gap:36px;margin-top:clamp(40px,5vw,72px)}
.d-atlas .at-foot-grid>div{display:grid;gap:4px;align-content:start}
@media (min-width:600px){.d-atlas .at-foot-grid>div{grid-column:span 3!important}}
.d-atlas .at-foot-grid h3{margin-bottom:12px;font-family:var(--disp);font-size:11.5px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:rgba(244,244,241,.45)}
.d-atlas .at-foot-grid a,.d-atlas .at-foot-grid span{display:flex;align-items:center;gap:10px;min-height:32px;color:rgba(244,244,241,.82)}
.d-atlas .at-foot-grid a{transition:color .3s,transform .45s var(--out)}
.d-atlas .at-foot-grid a:hover{color:var(--paper);transform:translateX(6px)}
.d-atlas .at-foot-grid a small{font-size:10.5px;letter-spacing:.08em;color:rgba(244,244,241,.4);font-variant-numeric:tabular-nums}
.d-atlas .at-foot-grid p{max-width:36ch}
.d-atlas .at-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;padding-top:20px;border-top:1px solid rgba(244,244,241,.16);font-size:13px;color:rgba(244,244,241,.5)}
.d-atlas .at-top{display:inline-flex;align-items:center;gap:10px;min-height:44px;font-family:var(--disp);font-weight:600;color:var(--paper)}
.d-atlas .at-top svg{width:16px;height:16px;transform:rotate(-90deg);transition:transform .45s var(--out)}
.d-atlas .at-top:hover svg{transform:rotate(-90deg) translateX(4px)}
@keyframes at-col{from{transform:scaleY(0)}to{transform:none}}
@keyframes at-shut{from{transform:scaleY(1)}to{transform:scaleY(0)}}
@keyframes at-line{from{transform:translateY(104%)}to{transform:none}}
@keyframes at-fade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes at-pop{from{transform:scale(0)}to{transform:scale(1)}}
@keyframes at-wipe{to{clip-path:inset(0 0 0 0)}}
@keyframes at-zoom{to{scale:1}}
@media (prefers-reduced-motion:reduce){.d-atlas .at-shut{display:none}.d-atlas .at-cols i,.d-atlas .at-ln>span,.d-atlas .at-hdot,.d-atlas .at-meta>div,.d-atlas .at-hero-copy,.d-atlas .at-hero-pic,.d-atlas .at-hero-pic img,.d-atlas .at-plate,.d-atlas .at-cap,.d-atlas .at-index a{animation:none;clip-path:none;scale:1}.d-atlas .at-tbar i{transform:none}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The header's progress line follows the page; the project band is pinned and runs sideways
 * while the page scrolls (wide screens with motion only: elsewhere it stays a plain grid).
 */
const JS = `(function(){var d=document,W=window,reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var hdr=d.querySelector('.at-hdr');function prog(){if(!hdr)return;var h=d.documentElement.scrollHeight-W.innerHeight;hdr.style.setProperty('--sp',h>0?Math.min(1,W.scrollY/h).toFixed(4):'0')}
var bands=[].slice.call(d.querySelectorAll('[data-band]')).map(function(b){return{b:b,tr:b.querySelector('.at-band-track'),now:b.querySelector('[data-band-now]'),bar:b.querySelector('.at-band-bar'),n:b.querySelectorAll('.at-band-item').length,ov:0,on:false}});
function setup(){bands.forEach(function(x){x.on=!reduce&&W.innerWidth>=900&&x.n>2;x.b.classList.toggle('is-pin',x.on);if(!x.on){x.b.style.removeProperty('--bh');x.tr.style.transform='';return}x.tr.style.transform='';x.ov=Math.max(0,x.tr.scrollWidth-W.innerWidth);x.b.style.setProperty('--bh',(W.innerHeight+x.ov)+'px')});tick()}
function tick(){prog();bands.forEach(function(x){if(!x.on)return;var r=x.b.getBoundingClientRect(),p=x.ov>0?Math.min(1,Math.max(0,-r.top/x.ov)):0;x.tr.style.transform='translate3d('+(-p*x.ov).toFixed(1)+'px,0,0)';if(x.bar){x.bar.style.setProperty('--bp',p.toFixed(4));x.bar.firstChild.style.transform='scaleX('+p.toFixed(4)+')'}if(x.now){var k=Math.min(x.n,1+Math.floor(p*x.n*.999));x.now.textContent=(k<10?'0':'')+k}})}
var raf=0;function on(){if(!raf)raf=requestAnimationFrame(function(){raf=0;tick()})}
setup();W.addEventListener('scroll',on,{passive:true});W.addEventListener('resize',function(){setup()});W.addEventListener('load',setup);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(setup);
[].slice.call(d.querySelectorAll('.at-hours')).forEach(function(h){if(reduce||!('IntersectionObserver' in W)){h.classList.add('in');return}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){h.classList.add('in');io.disconnect()}})},{threshold:.2});io.observe(h)})})();`;

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
    <path d="M3 10h13M11 4.5l5.5 5.5-5.5 5.5" />
  </svg>
);

const Corner = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
    <path d="M5 15L15 5M7 5h8v8" />
  </svg>
);

const pad = (n: number) => String(n).padStart(2, "0");

/** The faint twelve-column guide that sits over the whole page and fades in on load. */
const Cols = () => (
  <div className="at-cols" aria-hidden="true">
    {Array.from({ length: 12 }, (_, n) => (
      <i key={n} style={i(n)} />
    ))}
  </div>
);

function Head({ kicker, title, intro, id, tight }: { kicker?: string; title: string; intro?: string; id?: string; tight?: boolean }) {
  return (
    <header className={`at-head at-g${tight ? " is-tight" : ""}`}>
      <p className="at-idx" data-rv>
        {kicker}
      </p>
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
      <Cols />
      <header className="at-hdr hdr">
        <div className="at-wrap at-g at-bar">
          <a href="#top" className="at-logo" aria-label={c.name}>
            <span>{c.name}</span>
            <i className="at-dot" aria-hidden="true" />
          </a>
          <nav aria-label={c.t.menu} className="at-links" data-nav>
            {c.nav.slice(0, 5).map((n, k) => (
              <a key={n.id} href={`#${n.id}`}>
                <small>{pad(k + 1)}</small>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="at-hdr-end">
            <NowBadge c={c} className="at-now" />
            <a href={cta.href} className="btn at-fill">
              {cta.label}
            </a>
          </div>
          <button type="button" className="at-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
        <span className="at-prog" aria-hidden="true">
          <i />
          <b />
        </span>
      </header>
      <div id="site-menu" className="at-menu" data-nav inert>
        <div className="at-menu-bg" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <i key={n} style={i(n)} />
          ))}
        </div>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{pad(k + 1)}</small>
              {n.label}
            </a>
          ))}
          <a href={cta.href} style={i(c.nav.length)}>
            <small>→</small>
            {cta.label}
          </a>
        </nav>
        <div className="at-menu-foot">
          <NowBadge c={c} className="at-now" />
          {b.address || b.city ? <span>{b.address ?? b.city}</span> : null}
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const b = c.spec.business;
  const p = c.photo(hero.image);
  // The red dot is the headline's full stop: it replaces a final period, and stays away after ? or !.
  const text = hero.headline.trim().replace(/\.(\*?)$/, "$1");
  const plain = text.replace(/\*/g, "");
  const dot = !/[!?…:;,]$/.test(plain);
  const size = plain.length > 40 ? "is-s" : plain.length > 22 ? "is-m" : undefined;
  const { lines } = splitLines(text, plain.length > 18 ? 3 : 2);
  const facts = heroFacts(c);
  const meta: { label: ReactNode; value: ReactNode }[] = [];
  if (hero.eyebrow) meta.push({ label: <>(00)</>, value: hero.eyebrow });
  facts.forEach((f) => meta.push({ label: f.label, value: f.value }));
  return (
    <section className="at-hero">
      <div className="at-wrap">
        {meta.length > 0 && (
          <dl className="at-meta at-g">
            {meta.slice(0, 4).map((m, n) => (
              <div key={n} style={i(n)}>
                <dt className="at-lab">{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="at-h1box">
          <h1 className={size}>
            {lines.map((line, n) => (
              <span className="at-ln" key={n}>
                <span style={i(n)}>
                  {line}
                  {dot && n === lines.length - 1 ? <i className="at-hdot" aria-hidden="true" /> : null}
                </span>{" "}
              </span>
            ))}
          </h1>
          <span className="at-shut" aria-hidden="true">
            {Array.from({ length: 12 }, (_, n) => (
              <i key={n} style={i(n)} />
            ))}
          </span>
        </div>
        <div className="at-hero-grid at-g">
          <div className="at-hero-copy">
            <NowBadge c={c} className="at-now" />
            <p className="at-lede">{hero.subheadline}</p>
            <div className="at-cta-row">
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
          <div className="at-hero-art">
            {p ? (
              <>
                <figure className="at-hero-pic" data-px>
                  <Pic p={p} eager sizes="(min-width: 900px) 66vw, 100vw" />
                </figure>
                <p className="at-cap at-lab" aria-hidden="true">
                  <span>Fig. 01</span>
                  <span>{hero.note || b.city || c.name}</span>
                </p>
              </>
            ) : (
              <div className="at-plate" aria-hidden="true" data-px>
                <span className="at-lab">{hero.eyebrow || c.name}</span>
                <b>
                  {c.name.charAt(0)}
                  <i className="at-dot" />
                </b>
                <span className="at-lab">{b.city ?? ""}</span>
              </div>
            )}
          </div>
        </div>
        {c.nav.length > 1 && (
          <nav className="at-index" aria-label={c.t.explore}>
            {c.nav.map((n, k) => (
              <a key={n.id} href={`#${n.id}`} style={i(k)}>
                <small className="at-lab">{pad(k + 1)}</small>
                <span>{n.label}</span>
              </a>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}

/**
 * The project band: photographs in a row that moves sideways while the page scrolls, with a
 * counter and a progress line. Without room or motion it is a plain asymmetric grid.
 */
function Band({ pics, label }: { pics: Photo[]; label: ReactNode }) {
  return (
    <div className="at-band" data-band>
      <div className="at-band-pin">
        <div className="at-wrap at-band-top">
          <p className="at-lab">{label}</p>
          <p className="at-band-count" aria-hidden="true">
            <b data-band-now>01</b> / {pad(pics.length)}
          </p>
        </div>
        <div className="at-band-track">
          {pics.map((p, n) => (
            <figure key={n} className="at-band-item" data-rv style={i(n % 3)}>
              <div className="at-band-img">
                <Pic p={p} sizes="(min-width: 900px) 40vw, 50vw" />
              </div>
              <figcaption className="at-lab">
                <span>{pad(n + 1)}</span>
                <span>{p.alt}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="at-wrap">
          <div className="at-band-bar" aria-hidden="true">
            <i />
            <b />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Opening hours as a timetable: each row has a bar on a 24-hour axis, read from the hours on record. */
function Timetable({ c }: { c: Ctx }) {
  const lines = c.spec.business.openingHours;
  if (!lines?.length) return <p className="z-note">{c.t.hoursTbc}</p>;
  const spans = (t: string) => {
    if (/gesloten|closed|geschlossen|ferm/i.test(t)) return [];
    const out: [number, number][] = [];
    for (const m of t.matchAll(/(\d{1,2})[:.](\d{2})\s*(?:–|—|-|tot|to|bis|à)\s*(\d{1,2})[:.](\d{2})/g)) {
      const s = +m[1] * 60 + +m[2];
      let e = +m[3] * 60 + +m[4];
      if (e <= s) e += 1440;
      out.push([s / 1440, Math.min(1, e / 1440)]);
    }
    return out;
  };
  return (
    <div className="at-time-table" data-rv>
      <div className="at-axis" aria-hidden="true">
        <span />
        <div>
          {["00", "06", "12", "18", "24"].map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>
      <dl className="z-hours at-hours">
        {hoursRows(lines).map(([day, time], n) => (
          <div key={n}>
            <dt>{day}</dt>
            <dd>{time}</dd>
            <span className="at-tbar" aria-hidden="true">
              {spans(time).map(([a, z], k) => (
                <i key={k} style={css({ left: `${(a * 100).toFixed(2)}%`, width: `${((z - a) * 100).toFixed(2)}%`, "--i": n })} />
              ))}
            </span>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Address, phone and e-mail as data cells. */
function Cells({ c }: { c: Ctx }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email) return null;
  return (
    <dl className="at-cells-2" data-rv>
      {b.address ? (
        <div>
          <dt className="at-lab">{c.t.address}</dt>
          <dd>
            {b.address}
            {b.mapsUrl ? (
              <>
                <br />
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {c.t.route} ↗
                </a>
              </>
            ) : null}
          </dd>
        </div>
      ) : null}
      {b.phone ? (
        <div>
          <dt className="at-lab">{c.t.phone}</dt>
          <dd>
            <a href={tel(b.phone)}>{b.phone}</a>
          </dd>
        </div>
      ) : null}
      {b.email ? (
        <div>
          <dt className="at-lab">{c.t.email}</dt>
          <dd>
            <a href={`mailto:${b.email}`}>{b.email}</a>
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="at-foot">
      <div className="at-wrap">
        <div className="at-foot-top at-g">
          <p>{em(c.spec.hero.headline)}</p>
          <div>
            <Btn c={c} href={cta.href}>
              {cta.label} <Arrow />
            </Btn>
          </div>
        </div>
        <p className="at-foot-name" aria-hidden="true" style={css({ "--n": Math.max(8, c.name.length) })}>
          {c.name}
          <i className="at-dot" />
        </p>
        <div className="at-foot-grid at-g">
          <div>
            <h3>{c.t.explore}</h3>
            {c.nav.map((n, k) => (
              <a key={n.id} href={`#${n.id}`}>
                <small>{pad(k + 1)}</small>
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
                {c.t.route} ↗
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
          <div>
            {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
            <a href="#top" className="at-top">
              <Arrow /> {c.name}
            </a>
          </div>
        </div>
        <Legal c={c} className="at-legal" />
      </div>
    </footer>
  );
}

/** Rows of a listing: number, (photo), name, description, data and an arrow. */
function Rows({ rows, href, pics }: { rows: { title: string; text?: string; meta: (string | null | undefined)[]; pic?: Photo | null }[]; href?: string; pics: boolean }) {
  return (
    <ol className={`at-rows${pics ? " has-pics" : ""}`}>
      {rows.map((r, n) => {
        const inner = (
          <>
            <span className="at-row-n">{pad(n + 1)}</span>
            {pics ? <span className="at-row-pic">{r.pic ? <Pic p={r.pic} sizes="16vw" /> : null}</span> : null}
            <h3>{r.title}</h3>
            {r.text ? <p>{r.text}</p> : null}
            <span className="at-row-meta">
              {r.meta.filter(Boolean).map((m) => (
                <span key={m}>{m}</span>
              ))}
            </span>
            {href ? (
              <span className="at-row-go" aria-hidden="true">
                <Arrow />
              </span>
            ) : null}
          </>
        );
        return (
          <li key={n} data-rv style={i(n % 6)}>
            {href ? (
              <a href={href} className="at-row">
                {inner}
              </a>
            ) : (
              <div className="at-row">{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Where a row of the listing leads: the request form, when the page has one. */
const formTarget = (c: Ctx) => c.spec.sections.find((s) => s.type === "booking")?.id ?? c.spec.sections.find((s) => s.type === "contact")?.id;

export const atlas: Family = {
  key: "atlas",
  root: "d-atlas",
  fonts: ["Archivo", "Inter Tight"],
  themeColor: "#f4f4f1",
  accent: "#e4251c",
  onAccent: "#ffffff",
  css: "",
  // After the shared defaults, so the family's own look wins where both style the same element.
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "at-wrap", eyebrow: "at-lab", btn: "at-fill", btnAlt: "at-line", btnText: "at-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      // Without a gallery the spare photographs of the business still get their band.
      const extra = c.spec.sections.some((x) => x.type === "gallery") ? [] : [c.spare(), c.spare(), c.spare(), c.spare(), c.spare()].filter((x): x is Photo => Boolean(x));
      return (
        <section className="at-sec" id={s.id}>
          <div className="at-wrap">
            <Head kicker={c.t.kick.about} title={s.title} />
            <div className={`at-about at-g${p ? " has-pic" : ""}`}>
              {p ? (
                <figure className="at-about-pic" data-rv>
                  <div data-px>
                    <Pic p={p} sizes="(min-width: 900px) 40vw, 100vw" />
                  </div>
                  <figcaption className="at-cap at-lab">
                    <span>Fig. 02</span>
                    <span>{c.spec.business.city ?? c.name}</span>
                  </figcaption>
                </figure>
              ) : null}
              <div className="at-about-copy">
                <p className="at-lead" data-rv>
                  {first}
                </p>
                {rest.length > 0 && (
                  <div className={`at-paras${rest.length > 1 ? " is-2" : ""}`} data-rv>
                    {rest.map((x, n) => (
                      <p key={n}>{x}</p>
                    ))}
                  </div>
                )}
                {s.highlights.length > 0 && (
                  <ul className="at-hl" data-rv>
                    {s.highlights.map((h, n) => (
                      <li key={h}>
                        <small>{pad(n + 1)}</small>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          {extra.length >= 3 ? <Band pics={extra} label={c.t.kick.gallery} /> : null}
        </section>
      );
    },
    services: (s, c) => {
      const pics = s.items.map((_, n) => c.photo(`art:svc${n}`));
      const any = pics.some(Boolean);
      return (
        <section className="at-sec" id={s.id}>
          <div className="at-wrap">
            <Head kicker={`${c.t.kick.services} — ${pad(s.items.length)}`} title={s.title} intro={s.intro} />
            <Rows rows={s.items.map((it, n) => ({ title: it.title, text: it.description, meta: [it.duration, it.price], pic: pics[n] }))} href={formTarget(c) ? `#${formTarget(c)}` : undefined} pics={any} />
          </div>
        </section>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="at-sec" id={s.id}>
          <div className="at-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            {cats.map((cat, n) => (
              <div key={n} className="at-cat at-g">
                <h3 data-rv>{cat.name}</h3>
                <ol>
                  {cat.items.map((d, m) => (
                    <li key={m} className="at-dish" data-rv style={i(m % 6)}>
                      <b>{d.name}</b>
                      {d.price ? <span>{d.price}</span> : <span />}
                      {d.description ? <p>{d.description}</p> : null}
                      {d.tags?.length ? <small className="at-lab">{d.tags.join(" / ")}</small> : null}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
            {s.note ? (
              <p className="z-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="at-sec is-ink" id={s.id}>
        <div className="at-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="at-cells">
            {s.items.map((it, n) => (
              <li key={n} className="at-cell" data-rv style={i(n % 3)}>
                <span className="at-big" aria-hidden="true">
                  {pad(n + 1)}
                </span>
                <span className="at-ico" aria-hidden="true">
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
    process: (s, c) => (
      <section className="at-sec" id={s.id}>
        <div className="at-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <ol className="at-stairs" style={css({ "--n": Math.min(6, s.steps.length) })}>
            {s.steps.map((st, n) => (
              <li key={n} className="at-step" data-rv style={i(n)}>
                <span className="at-big" aria-hidden="true">
                  {pad(n + 1)}
                </span>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="at-sec" id={s.id}>
          <div className="at-wrap">
            <Head kicker={`${c.t.kick.gallery} — ${pad(pics.length)}`} title={s.title} />
          </div>
          <Band pics={pics} label={c.name} />
        </section>
      );
    },
    hours: (s, c) => (
      <section className="at-sec is-stone" id={s.id}>
        <div className="at-wrap">
          <Head kicker={c.t.kick.hours} title={s.title} />
          <div className="at-time at-g">
            <div className="at-time-info">
              {c.spec.business.openingHours?.length ? (
                <p className="at-time-now" data-rv>
                  <span className="at-lab">{c.t.hours}</span>
                  <NowBadge c={c} className="at-now" />
                </p>
              ) : null}
              {s.note ? <p data-rv>{s.note}</p> : null}
              <Cells c={c} />
            </div>
            <Timetable c={c} />
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => {
      const b = c.spec.business;
      const hoursElsewhere = c.spec.sections.some((x) => x.type === "hours" || x.type === "booking");
      return (
        <section className="at-sec" id={s.id}>
          <div className="at-wrap">
            <Head kicker={c.t.kick.contact} title={s.title} intro={s.body} />
            <div className={`at-contact at-g${s.showForm ? " has-form" : ""}`}>
              <address className="at-reach" data-rv>
                {b.phone ? (
                  <a href={tel(b.phone)}>
                    {b.phone} <Corner />
                  </a>
                ) : null}
                {b.email ? (
                  <a href={`mailto:${b.email}`}>
                    {b.email} <Corner />
                  </a>
                ) : null}
                {b.address ? <span>{b.address}</span> : null}
                {b.mapsUrl ? (
                  <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="is-small">
                    {c.t.route} <Corner />
                  </a>
                ) : null}
              </address>
              <div className="at-contact-side">
                {!hoursElsewhere ? <Timetable c={c} /> : null}
                {s.showForm ? (
                  <div className="at-book-form" data-rv>
                    <DemoForm c={c} kind="message" uid={`f-${s.id}`} className="z-form at-form" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      );
    },
    booking: (s, c) => (
      <section className="at-sec" id={s.id}>
        <div className="at-wrap">
          <Head kicker={c.t.kick.booking} title={s.title} />
          <div className="at-book at-g">
            <div className="at-book-info">
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Cells c={c} />
              {!c.spec.sections.some((x) => x.type === "hours") ? <Timetable c={c} /> : null}
            </div>
            <div className="at-book-form" data-rv>
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} className="z-form at-form" />
            </div>
          </div>
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="at-sec" id={s.id}>
        <div className="at-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} />
          <ul className="at-chan">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 4)}>
                <a href={ch.href} {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="at-ico" aria-hidden="true">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <small className="at-lab">
                    {pad(n + 1)}
                    <Arrow />
                  </small>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
  },
};
