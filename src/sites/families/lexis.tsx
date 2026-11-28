import { Btn, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, splitLines, tel, type Ctx, type Family, type HeadProps, type Photo } from "./kit";
import { NowBadge, TODAY_JS } from "./today";

/**
 * Lexis: an original template (no portfolio demo). A modern corporate practice: ivory paper,
 * deep navy blocks and one fine metallic hairline that runs through the page. A high-contrast
 * display serif meets a light grotesk inside the same headline. Lines are revealed through
 * masks, slowly; every section is numbered like a clause. Signature details: the practice
 * areas as an index whose rows open while a photograph wipes into a frame beside them, a
 * sticky "approach" column whose counter rolls with the steps, a reading line in the header
 * and a gallery that pans sideways as the page scrolls. Made for law firms, accountants,
 * consultants, notaries and financial advisers.
 */

const CSS = `
.d-lexis{--iv:#f6f3ec;--iv2:#ece7db;--paper:#fcfbf7;--navy:#0c1a33;--navy2:#14264a;--navy3:#1c3160;--ink:#0c1a33;--dim:#596278;--gold:#b0935a;--gold-l:#e0cc9d;--gold-d:#7e6638;--line:rgba(12,26,51,.14);--metal:linear-gradient(90deg,#7e6638,#e0cc9d 38%,#b0935a 62%,#7e6638);--serif:"DM Serif Display",Georgia,serif;--sans:"Archivo",system-ui,sans-serif;--pad:clamp(20px,5vw,80px);--slow:cubic-bezier(.7,0,.2,1);--soft:cubic-bezier(.2,.7,.2,1);--hd:76px;--z-bg2:var(--paper);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--gold-d);--z-on-accent:#fcfbf7;--z-display:var(--serif);--z-display-weight:400;--z-radius:0;--z-field-radius:0;--z-ico-radius:0;--z-sec:clamp(88px,11vw,176px);--z-h3:clamp(22px,1.8vw,28px);--z-statement:clamp(32px,4.4vw,68px);background:var(--iv);color:var(--ink);font-family:var(--sans);font-size:clamp(16px,1.05vw,17.5px);font-weight:400;line-height:1.66;font-feature-settings:"tnum" 0}
.d-lexis ::selection{background:var(--navy);color:var(--gold-l)}
.d-lexis [hidden]{display:none!important}
.d-lexis section[id]{scroll-margin-top:var(--hd)}
.d-lexis h1,.d-lexis h2,.d-lexis h3{font-family:var(--serif);font-weight:400;letter-spacing:-.012em;line-height:1.02;overflow-wrap:break-word;text-wrap:balance}
.d-lexis h1 em,.d-lexis h2 em,.d-lexis h3 em{font-family:var(--sans);font-style:normal;font-weight:300;font-size:.9em;letter-spacing:-.05em;color:inherit}
.d-lexis h2{font-size:clamp(38px,5vw,80px)}
.d-lexis h2.is-long{font-size:clamp(30px,3.6vw,56px);line-height:1.06}
.d-lexis .lx-wrap{position:relative;width:min(100%,1440px);margin-inline:auto;padding-inline:var(--pad)}
.d-lexis .lx-cap{font-family:var(--sans);font-size:11.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;line-height:1.4}
.d-lexis .lx-navy{--ink:#f3efe6;--dim:rgba(243,239,230,.66);--line:rgba(243,239,230,.16);--z-bg2:var(--navy2);--z-ink:#f3efe6;--z-dim:rgba(243,239,230,.66);--z-line:rgba(243,239,230,.16);--z-accent:var(--gold-l);--z-on-accent:var(--navy);background:var(--navy);color:var(--ink)}
.d-lexis .lx-iv2{--z-bg2:var(--paper);background:var(--iv2)}
.d-lexis .lx-hair{display:block;height:1px;background:var(--metal);transform-origin:left;transform:scaleX(0);transition:transform 1.6s var(--slow)}
.d-lexis .lx-hair.in,html:not(.demo-js) .d-lexis .lx-hair{transform:none}
.demo-js .d-lexis .lx-hair[data-rv]{opacity:1}
.demo-js .d-lexis [data-rv]{transform:translateY(18px);transition:opacity 1.2s var(--soft),transform 1.4s var(--soft);transition-delay:calc(var(--i,0) * 110ms)}
.demo-js .d-lexis [data-rv].in{transform:none}
.d-lexis .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:56px;padding:0 30px;overflow:hidden;font-family:var(--sans);font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;text-align:center;isolation:isolate;transition:color .6s var(--slow),background-color .6s var(--slow),border-color .6s}
.d-lexis .btn svg{width:18px;height:18px;flex:none;transition:transform .8s var(--slow)}
.d-lexis .btn:hover svg{transform:translateX(6px)}
.d-lexis .lx-fill{background:var(--navy);color:var(--iv)}
.d-lexis .lx-fill::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--metal);transform:scaleX(0);transform-origin:right;transition:transform .9s var(--slow)}
.d-lexis .lx-fill:hover{background:var(--navy3)}
.d-lexis .lx-fill:hover::after{transform:scaleX(1);transform-origin:left}
.d-lexis .lx-navy .lx-fill{background:var(--iv);color:var(--navy)}
.d-lexis .lx-navy .lx-fill:hover{background:#fff}
.d-lexis .lx-line{border:1px solid currentColor;color:var(--ink)}
.d-lexis .lx-line::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--ink);transform:scaleY(0);transform-origin:bottom;transition:transform .8s var(--slow)}
.d-lexis .lx-line:hover{color:var(--iv)}
.d-lexis .lx-navy .lx-line:hover{color:var(--navy)}
.d-lexis .lx-line:hover::before{transform:none}
.d-lexis .lx-text{position:relative;display:inline-flex;align-items:center;gap:12px;min-height:44px;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
.d-lexis .lx-text::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:1px;background:currentColor;transform-origin:left;transition:transform .9s var(--slow)}
.d-lexis .lx-text:hover::after{animation:lx-redraw .9s var(--slow)}
.d-lexis .lx-text svg{width:16px;height:16px;transition:transform .8s var(--slow)}
.d-lexis .lx-text:hover svg{transform:translateX(5px)}
.d-lexis .lx-hdr{position:sticky;top:0;z-index:50;background:rgba(246,243,236,.86);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);transition:background-color .6s}
.d-lexis .lx-bar{display:flex;align-items:center;gap:clamp(16px,2.4vw,40px);height:var(--hd)}
.d-lexis .lx-logo{display:flex;align-items:baseline;gap:10px;min-width:0;margin-right:auto;white-space:nowrap}
.d-lexis .lx-logo b{font-family:var(--serif);font-size:clamp(25px,2vw,31px);font-weight:400;line-height:1;letter-spacing:-.01em}
.d-lexis .lx-logo span{overflow:hidden;text-overflow:ellipsis;font-size:11px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--dim)}
.d-lexis .lx-logo.is-long b{font-size:clamp(20px,1.6vw,25px)}
.d-lexis .lx-links{display:none;gap:clamp(18px,2vw,34px)}
.d-lexis .lx-links a{position:relative;display:inline-flex;align-items:baseline;gap:7px;padding:12px 0;font-size:14px;font-weight:500;white-space:nowrap}
@media (max-width:1439px){.d-lexis .lx-links a:nth-child(n+5){display:none}}
@media (max-width:1279px){.d-lexis .lx-links a:nth-child(n+4){display:none}}
.d-lexis .lx-logo span{max-width:16ch}
.d-lexis .lx-links a i{font-style:normal;font-size:10.5px;letter-spacing:.06em;color:var(--gold-d);font-variant-numeric:tabular-nums}
.d-lexis .lx-links a::after{content:"";position:absolute;left:0;right:0;bottom:6px;height:1px;background:var(--metal);transform:scaleX(0);transform-origin:right;transition:transform .8s var(--slow)}
.d-lexis .lx-links a:hover::after{transform:scaleX(1);transform-origin:left}
.d-lexis .lx-hcta{display:none;flex:none;min-height:46px;padding:0 22px;font-size:11.5px;white-space:nowrap}
.d-lexis .lx-burger{position:relative;z-index:62;display:inline-flex;align-items:center;gap:14px;min-height:48px;padding:0 0 0 14px;border:0;background:none;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.d-lexis .lx-burger i{position:relative;display:block;width:30px;height:9px}
.d-lexis .lx-burger i::before,.d-lexis .lx-burger i::after{content:"";position:absolute;right:0;height:1px;background:currentColor;transition:transform .8s var(--slow),width .8s var(--slow),top .8s var(--slow)}
.d-lexis .lx-burger i::before{top:0;width:30px}
.d-lexis .lx-burger i::after{top:8px;width:20px}
.d-lexis.menu-open .lx-burger{color:var(--iv)}
.d-lexis.menu-open .lx-burger i::before{top:4px;width:26px;transform:rotate(30deg)}
.d-lexis.menu-open .lx-burger i::after{top:4px;width:26px;transform:rotate(-30deg)}
.d-lexis.menu-open .lx-hdr{background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-lexis.menu-open .lx-logo{position:relative;z-index:62;color:var(--iv)}
.d-lexis.menu-open .lx-logo span{color:var(--gold-l)}
.d-lexis .lx-progress{position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--line)}
.d-lexis .lx-progress i{position:absolute;inset:0;background:var(--metal);transform:scaleX(var(--sp,0));transform-origin:left}
@media (min-width:1120px){.d-lexis .lx-links,.d-lexis .lx-hcta{display:inline-flex}.d-lexis .lx-burger{display:none}}
.d-lexis .lx-menu{position:fixed;inset:0;z-index:49;display:grid;grid-template-rows:1fr auto;gap:36px;padding:calc(var(--hd) + 28px) var(--pad) 96px;overflow-y:auto;background:var(--navy);color:var(--iv);clip-path:inset(0 0 0 100%);visibility:hidden;transition:clip-path 1s var(--slow),visibility 0s 1s}
.d-lexis .lx-menu.is-open{clip-path:inset(0);visibility:visible;transition:clip-path 1s var(--slow)}
.d-lexis .lx-menu::before{content:"";position:absolute;left:var(--pad);right:var(--pad);top:var(--hd);height:1px;background:var(--metal);transform:scaleX(0);transform-origin:left;transition:transform 1.2s var(--slow)}
.d-lexis .lx-menu.is-open::before{transform:none;transition-delay:.35s}
.d-lexis .lx-menu nav{display:grid;align-content:start}
.d-lexis .lx-menu nav a{display:grid;grid-template-columns:44px minmax(0,1fr);align-items:baseline;min-height:60px;padding:8px 0;border-bottom:1px solid rgba(243,239,230,.12)}
.d-lexis .lx-menu nav a i{font-style:normal;font-size:11px;letter-spacing:.1em;color:var(--gold-l);font-variant-numeric:tabular-nums;opacity:0;transition:opacity .8s}
.d-lexis .lx-menu nav a span{display:block;overflow:hidden;padding-bottom:.08em}
.d-lexis .lx-menu nav a b{display:block;font-family:var(--serif);font-size:clamp(34px,8.6vw,60px);font-weight:400;line-height:1.08;transform:translateY(105%);transition:transform 1.1s var(--slow)}
.d-lexis .lx-menu.is-open nav a b{transform:none;transition-delay:calc(.3s + var(--i,0) * 80ms)}
.d-lexis .lx-menu.is-open nav a i{opacity:1;transition-delay:calc(.5s + var(--i,0) * 80ms)}
.d-lexis .lx-menu-foot{display:grid;gap:14px;font-size:15px;color:rgba(243,239,230,.72);opacity:0;transition:opacity .8s}
.d-lexis .lx-menu.is-open .lx-menu-foot{opacity:1;transition-delay:.8s}
.d-lexis .lx-menu-foot a{display:inline-flex;align-items:center;min-height:44px;color:var(--iv)}
.d-lexis .lx-menu-foot .btn{justify-self:start}
.d-lexis .lx-now{display:inline-flex;align-items:center;gap:10px;font-size:11.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.d-lexis .lx-now::before{content:"";width:7px;height:7px;border:1px solid currentColor;transform:rotate(45deg);transition:background-color .6s}
.d-lexis .lx-now.is-open{color:#2f6b55}
.d-lexis .lx-now.is-open::before{background:currentColor}
.d-lexis .lx-now.is-closed{color:#8a4b3a}
.d-lexis .lx-navy .lx-now.is-open{color:#9fd3b8}
.d-lexis .lx-navy .lx-now.is-closed{color:#e7b19d}
.d-lexis .lx-hero{position:relative;padding:clamp(40px,6vw,96px) 0 0;overflow:hidden}
.d-lexis .lx-hero-grid{display:grid;gap:clamp(44px,5vw,72px);align-items:end}
@media (min-width:980px){.d-lexis .lx-hero-grid{grid-template-columns:minmax(0,1fr) minmax(0,.46fr)}.d-lexis .lx-hero-grid.is-solo{grid-template-columns:minmax(0,1fr)}}
.d-lexis .lx-hero-copy{position:relative;display:grid;gap:clamp(26px,2.6vw,38px);padding-bottom:clamp(8px,2vw,30px);container-type:inline-size}
.d-lexis .lx-hero-art.is-seal::before{display:none}
.d-lexis .lx-visit.is-solo{grid-template-columns:minmax(0,1fr)}
.d-lexis .lx-eyebrow{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;color:var(--dim)}
.d-lexis .lx-eyebrow>span:first-child{display:inline-flex;align-items:center;gap:14px}
.d-lexis .lx-eyebrow>span:first-child::before{content:"";width:44px;height:1px;background:var(--metal);transform-origin:left;animation:lx-grow 1.4s var(--slow) .15s both}
.d-lexis .lx-hero .lx-eyebrow{animation:lx-fade 1.2s var(--soft) .1s both}
.d-lexis .lx-hero h1{--fs:clamp(50px,7.6vw,132px);max-width:15ch;font-size:min(var(--fs),calc(100cqi / (var(--lw,4) * .56)));line-height:.98;letter-spacing:-.022em}
.d-lexis .lx-hero h1.is-m{--fs:clamp(42px,6vw,100px);max-width:18ch}
.d-lexis .lx-hero h1.is-s{--fs:clamp(36px,4.6vw,76px);max-width:22ch;line-height:1.02}
.d-lexis .lx-hero h1.has-lw{max-width:none}
@media (max-width:979px){.d-lexis .lx-hero h1{--fs:clamp(48px,15vw,104px)}.d-lexis .lx-hero h1.is-m{--fs:clamp(42px,10.5vw,84px)}.d-lexis .lx-hero h1.is-s{--fs:clamp(34px,8vw,64px)}}
.d-lexis .lx-ln{display:block;overflow:hidden;padding-bottom:.1em;margin-bottom:-.1em}
.d-lexis .lx-ln>span{display:block;transform:translateY(108%);animation:lx-rise 1.5s var(--slow) both;animation-delay:calc(.25s + var(--i,0) * 140ms)}
.d-lexis .lx-lede{max-width:50ch;font-size:clamp(17px,1.3vw,20px);line-height:1.6;color:var(--dim);animation:lx-fade 1.4s var(--soft) .95s both}
.d-lexis .lx-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:14px 28px;animation:lx-fade 1.4s var(--soft) 1.1s both}
.d-lexis .lx-hero-art{position:relative;align-self:stretch;min-height:0}
.d-lexis .lx-hero-art::before{content:"";position:absolute;left:-14%;right:24%;top:18%;bottom:-1px;background:var(--navy);transform-origin:left;animation:lx-sweep 1.4s var(--slow) .1s both}
.d-lexis .lx-hero-pic{position:relative;height:100%;min-height:clamp(380px,52vw,700px);overflow:hidden;clip-path:inset(100% 0 0 0);animation:lx-wipe 1.7s var(--slow) .45s forwards}
.d-lexis .lx-hero-pic img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;scale:1.22;animation:lx-zoom 2.8s var(--soft) .45s forwards;filter:saturate(.82) contrast(1.04)}
.d-lexis .lx-hero-pic::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(12,26,51,0) 55%,rgba(12,26,51,.5));pointer-events:none}
.d-lexis .lx-hero-pic figcaption{position:absolute;left:22px;bottom:20px;z-index:1;color:var(--iv)}
.d-lexis .lx-hero-art .lx-edge{position:absolute;left:-18px;top:0;bottom:0;width:1px;background:linear-gradient(180deg,#7e6638,#e0cc9d,#b0935a,#7e6638);transform-origin:top;animation:lx-grow-y 1.8s var(--slow) 1.1s both}
.d-lexis .lx-seal{position:relative;display:grid;place-items:center;height:100%;min-height:clamp(360px,44vw,600px);background:var(--navy);color:var(--iv);clip-path:inset(100% 0 0 0);animation:lx-wipe 1.7s var(--slow) .35s forwards}
.d-lexis .lx-seal b{position:relative;z-index:1;font-family:var(--serif);font-size:clamp(150px,18vw,280px);font-weight:400;line-height:1}
.d-lexis .lx-seal svg{position:absolute;left:50%;top:50%;width:min(76%,360px);aspect-ratio:1;transform:translate(-50%,-50%) rotate(-90deg);overflow:visible}
.d-lexis .lx-seal circle{fill:none;stroke:url(#lx-metal);stroke-width:.6;stroke-dasharray:316;stroke-dashoffset:316;animation:lx-draw 2.6s var(--slow) 1.1s forwards}
.d-lexis .lx-seal span{position:absolute;left:0;right:0;bottom:26px;text-align:center;color:var(--gold-l)}
.d-lexis .lx-hero-foot{position:relative;margin-top:clamp(40px,5vw,72px)}
.d-lexis .lx-facts{display:grid;border-top:1px solid var(--line);grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-lexis .lx-facts>div{display:grid;gap:6px;align-content:start;padding:22px 24px 26px 0;animation:lx-fade 1.2s var(--soft) both;animation-delay:calc(1.3s + var(--i,0) * 120ms)}
.d-lexis .lx-facts dt{color:var(--dim)}
.d-lexis .lx-facts dd{margin:0;font-family:var(--serif);font-size:clamp(19px,1.5vw,23px);line-height:1.25}
.d-lexis .lx-facts dd a{background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .8s var(--slow)}
.d-lexis .lx-facts dd a:hover{background-size:100% 1px}
@media (min-width:980px){.d-lexis .lx-facts>div+div{padding-left:28px;border-left:1px solid var(--line)}}
.d-lexis .lx-sec{position:relative;padding-block:var(--z-sec)}
.d-lexis main{counter-reset:lxsec}
.d-lexis .lx-head{display:grid;gap:22px;max-width:920px;margin-bottom:clamp(44px,6vw,88px)}
.d-lexis .lx-head.is-wide{grid-template-columns:minmax(0,1fr);max-width:none}
@media (min-width:1100px){.d-lexis .lx-head.is-wide{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);align-items:end;gap:28px 80px}.d-lexis .lx-head.is-wide .lx-kick{grid-column:1/-1}}
.d-lexis .lx-kick{display:flex;align-items:center;gap:16px;color:var(--dim)}
.d-lexis .lx-head .lx-kick::before{counter-increment:lxsec;content:counter(lxsec,decimal-leading-zero);font-family:var(--serif);font-size:22px;font-weight:400;letter-spacing:0;text-transform:none;color:var(--gold-d)}
.d-lexis .lx-navy .lx-head .lx-kick::before{color:var(--gold-l)}
.d-lexis .lx-kick::after{content:"";flex:none;width:48px;height:1px;background:var(--metal);order:1}
.d-lexis .lx-kick>span{order:2}
.d-lexis .lx-head>p:not(.lx-kick){max-width:52ch;font-size:clamp(16.5px,1.15vw,18.5px);color:var(--dim)}
.demo-js .d-lexis .lx-head h2[data-rv]{opacity:1;transform:translateY(24px);clip-path:inset(0 0 100% 0);transition:clip-path 1.5s var(--slow),transform 1.5s var(--slow)}
.demo-js .d-lexis .lx-head h2[data-rv].in{transform:none;clip-path:inset(-10% 0 -14% 0)}
.d-lexis .lx-index{display:grid;gap:40px}
@media (min-width:1000px){.d-lexis .lx-index.has-pics{grid-template-columns:minmax(0,1fr) minmax(0,.62fr);gap:clamp(48px,6vw,110px);align-items:start}}
.d-lexis .lx-rows{border-top:1px solid var(--line)}
.d-lexis .lx-row{position:relative;border-bottom:1px solid var(--line)}
.d-lexis .lx-row::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:var(--metal);transform:scaleX(0);transform-origin:right;transition:transform 1s var(--slow)}
.d-lexis .lx-row:hover::after,.d-lexis .lx-row.is-open::after{transform:scaleX(1);transform-origin:left}
.d-lexis .lx-row h3{font-size:inherit}
.d-lexis .lx-row-btn{display:grid;grid-template-columns:clamp(40px,5vw,72px) minmax(0,1fr) auto;align-items:baseline;gap:12px;width:100%;min-height:76px;padding:clamp(20px,2.2vw,30px) 0;border:0;background:none;text-align:left}
.d-lexis .lx-row-n{font-size:12px;font-weight:500;letter-spacing:.12em;color:var(--gold-l);font-variant-numeric:tabular-nums}
.d-lexis .lx-row-t{font-family:var(--serif);font-size:clamp(26px,3vw,46px);font-weight:400;line-height:1.08;transition:transform .9s var(--slow),color .6s}
@media (hover:hover){.d-lexis .lx-row-btn:hover .lx-row-t{transform:translateX(14px)}}
.d-lexis .lx-plus{position:relative;align-self:center;width:22px;height:22px}
.d-lexis .lx-plus::before,.d-lexis .lx-plus::after{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:currentColor;transition:transform .8s var(--slow)}
.d-lexis .lx-plus::after{transform:rotate(90deg)}
.d-lexis .lx-row.is-open .lx-plus::after{transform:rotate(0)}
.d-lexis .lx-row.is-open .lx-plus::before{transform:rotate(180deg)}
.d-lexis .lx-row-body{display:grid;grid-template-rows:1fr;transition:grid-template-rows .9s var(--slow)}
.demo-js .d-lexis .lx-row:not(.is-open) .lx-row-body{grid-template-rows:0fr}
.d-lexis .lx-row-body>div{min-height:0;overflow:hidden}
.d-lexis .lx-row-in{display:grid;gap:18px;padding:0 0 34px clamp(52px,calc(5vw + 12px),84px);opacity:1;transition:opacity .8s var(--soft) .15s}
.demo-js .d-lexis .lx-row:not(.is-open) .lx-row-in{opacity:0;transition-delay:0s}
.d-lexis .lx-row-in p{max-width:56ch;color:var(--dim)}
.d-lexis .lx-row-meta{display:flex;flex-wrap:wrap;gap:8px 24px;color:var(--gold-l)}
.d-lexis .lx-row-pic{aspect-ratio:16/10;overflow:hidden}
.d-lexis .lx-row-pic img{width:100%;height:100%;object-fit:cover}
@media (min-width:1000px){.d-lexis .has-pics .lx-row-pic{display:none}}
.d-lexis .lx-preview{position:sticky;top:calc(var(--hd) + 40px);display:none;aspect-ratio:4/5;overflow:hidden;background:var(--navy2)}
@media (min-width:1000px){.d-lexis .lx-preview{display:block}}
.d-lexis .lx-preview figure{position:absolute;inset:0;clip-path:inset(0 0 100% 0);transition:clip-path 0s .9s}
.d-lexis .lx-preview figure.is-was{z-index:1;clip-path:inset(0);transition:none}
.d-lexis .lx-preview figure.is-on{z-index:2;clip-path:inset(0);transition:clip-path 1.1s var(--slow)}
.d-lexis .lx-preview img{width:100%;height:100%;object-fit:cover;scale:1.12;transition:scale 2.2s var(--soft);filter:saturate(.8)}
.d-lexis .lx-preview figure.is-on img{scale:1}
.d-lexis .lx-preview::after{content:"";position:absolute;inset:14px;z-index:3;border:1px solid rgba(224,204,157,.45);pointer-events:none}
.d-lexis .lx-preview-n{position:absolute;right:26px;bottom:22px;z-index:4;font-family:var(--serif);font-size:56px;line-height:1;color:var(--iv);font-variant-numeric:tabular-nums;text-shadow:0 2px 20px rgba(12,26,51,.4)}
.d-lexis .lx-about{display:grid;gap:clamp(48px,6vw,110px);align-items:start}
@media (min-width:1000px){.d-lexis .lx-about{grid-template-columns:minmax(0,.82fr) minmax(0,1fr)}.d-lexis .lx-about.is-solo{grid-template-columns:minmax(0,.9fr) minmax(0,1fr)}}
.d-lexis .lx-about-pic{position:relative;padding:0 0 clamp(28px,4vw,56px) clamp(28px,4vw,56px)}
.d-lexis .lx-about-pic::before{content:"";position:absolute;left:0;bottom:0;width:72%;height:64%;background:var(--navy)}
.d-lexis .lx-about-pic figure{position:relative;aspect-ratio:4/5;overflow:hidden}
.d-lexis .lx-about-pic img{width:100%;height:116%;object-fit:cover;transform:translateY(calc(var(--p,0) * -6%));filter:saturate(.85)}
.demo-js .d-lexis .lx-about-pic figure[data-rv]{opacity:1;transform:none;clip-path:inset(0 0 100% 0);transition:clip-path 1.7s var(--slow)}
.demo-js .d-lexis .lx-about-pic figure[data-rv].in{clip-path:inset(0)}
.d-lexis .lx-about-pic figcaption{position:absolute;left:0;bottom:0;z-index:1;display:grid;gap:4px;padding:18px 22px;color:var(--iv)}
.d-lexis .lx-about-pic figcaption b{font-family:var(--serif);font-size:26px;font-weight:400;letter-spacing:0;text-transform:none}
.d-lexis .lx-about-copy{display:grid;gap:22px;align-content:start}
.d-lexis .lx-about-copy .lx-head{margin-bottom:12px}
.d-lexis .lx-lead{font-family:var(--serif);font-size:clamp(23px,2vw,32px);line-height:1.32;letter-spacing:-.005em}
.d-lexis .lx-about-copy>p:not(.lx-lead){max-width:60ch;color:var(--dim)}
.d-lexis .lx-roman{counter-reset:lxr;display:grid;margin-top:14px;border-top:1px solid var(--line)}
.d-lexis .lx-roman li{counter-increment:lxr;display:grid;grid-template-columns:52px minmax(0,1fr);align-items:baseline;padding:16px 0;border-bottom:1px solid var(--line);font-weight:500}
.d-lexis .lx-roman li::before{content:counter(lxr,lower-roman) ".";font-family:var(--serif);font-size:20px;font-weight:400;color:var(--gold-d)}
.d-lexis .lx-statement{text-align:center}
.d-lexis .lx-statement .lx-wrap{display:grid;justify-items:center;gap:clamp(28px,3vw,44px)}
.d-lexis .lx-statement .lx-hair{width:min(320px,50%);transform-origin:center}
.d-lexis .lx-statement h2{max-width:24ch;font-size:clamp(32px,4.4vw,70px);line-height:1.1}
.d-lexis .lx-statement h2 .lx-ln>span{transform:translateY(108%);transition:transform 1.5s var(--slow);transition-delay:calc(var(--i,0) * 140ms)}
.d-lexis .lx-statement h2.in .lx-ln>span,html:not(.demo-js) .d-lexis .lx-statement h2 .lx-ln>span{transform:none}
.d-lexis .lx-statement .lx-ln>span{animation:none}
.demo-js .d-lexis .lx-statement h2[data-rv]{opacity:1;transform:none}
.d-lexis .lx-appr{display:grid;gap:clamp(40px,5vw,80px)}
@media (min-width:1000px){.d-lexis .lx-appr{grid-template-columns:minmax(0,.9fr) minmax(0,1fr);align-items:start}.d-lexis .lx-appr-side{position:sticky;top:calc(var(--hd) + 48px)}}
.d-lexis .lx-appr-side .lx-head{margin-bottom:36px}
.d-lexis .lx-count{display:none;align-items:flex-end;gap:12px;font-family:var(--serif);line-height:1;color:var(--ink)}
@media (min-width:1000px){.d-lexis .lx-count{display:flex}}
.d-lexis .lx-count-roll{display:block;height:1em;overflow:hidden;font-size:clamp(110px,11vw,190px);letter-spacing:-.04em}
.d-lexis .lx-count-roll>span{display:grid;transform:translateY(calc(var(--k,0) * -1em));transition:transform 1s var(--slow)}
.d-lexis .lx-count-roll i{font-style:normal;height:1em;font-variant-numeric:tabular-nums}
.d-lexis .lx-count small{padding-bottom:.6em;font-family:var(--sans);font-size:13px;font-weight:500;letter-spacing:.16em;color:var(--dim)}
.d-lexis .lx-count-bar{display:none;position:relative;height:1px;margin-top:30px;background:var(--line)}
.d-lexis .lx-count-bar i{position:absolute;inset:0;background:var(--metal);transform:scaleX(var(--f,0));transform-origin:left;transition:transform 1s var(--slow)}
@media (min-width:1000px){.d-lexis .lx-count-bar{display:block}}
.d-lexis .lx-steps{display:grid;counter-reset:lxs}
.d-lexis .lx-step{position:relative;display:grid;gap:16px;padding:clamp(32px,4vw,56px) 0 clamp(32px,4vw,56px) clamp(56px,6vw,96px);border-top:1px solid var(--line);transition:opacity .9s var(--soft)}
.d-lexis .lx-step:last-child{border-bottom:1px solid var(--line)}
.d-lexis .lx-step>b{position:absolute;left:0;top:clamp(36px,4.2vw,60px);font-family:var(--serif);font-size:clamp(28px,2.6vw,40px);font-weight:400;line-height:1;color:var(--gold-d);font-variant-numeric:tabular-nums}
.d-lexis .lx-step h3{font-size:clamp(26px,2.4vw,38px)}
.d-lexis .lx-step p{max-width:52ch;color:var(--dim)}
@media (min-width:1000px){.d-lexis .lx-appr.is-live .lx-step{min-height:38vh;align-content:center;opacity:.3}.d-lexis .lx-appr.is-live .lx-step.is-on{opacity:1}.d-lexis .lx-appr.is-live .lx-step>b{top:50%;transform:translateY(-120%)}}
.d-lexis .lx-princ{display:grid;grid-template-columns:minmax(0,1fr)}
.d-lexis .lx-princ li{position:relative;display:grid;gap:16px;align-content:start;padding:clamp(30px,3vw,44px) clamp(0px,2.4vw,40px) clamp(34px,3vw,48px) 0;border-top:1px solid var(--line)}
@media (min-width:640px) and (max-width:899px){.d-lexis .lx-princ{grid-template-columns:repeat(2,minmax(0,1fr))}.d-lexis .lx-princ li:nth-child(2n){padding-left:24px;border-left:1px solid var(--line)}}
@media (min-width:900px){.d-lexis .lx-princ{grid-template-columns:repeat(var(--cols,3),minmax(0,1fr))}.d-lexis .lx-princ:not(.is-2) li:not(:nth-child(3n+1)),.d-lexis .lx-princ.is-2 li:nth-child(2n){padding-left:clamp(24px,2.4vw,40px);border-left:1px solid var(--line)}}
.d-lexis .lx-princ li::before{content:"";position:absolute;left:0;right:0;top:-1px;height:1px;background:var(--metal);transform:scaleX(0);transform-origin:left;transition:transform 1.1s var(--slow)}
.d-lexis .lx-princ li:hover::before{transform:none}

.d-lexis .lx-princ .lx-ico{display:grid;place-items:center;width:52px;height:52px;border:1px solid var(--line);color:var(--gold-l);transition:border-color .8s,transform 1s var(--slow)}
.d-lexis .lx-iv2 .lx-princ .lx-ico,.d-lexis .lx-sec:not(.lx-navy) .lx-princ .lx-ico{color:var(--gold-d)}
.d-lexis .lx-princ li:hover .lx-ico{border-color:var(--gold);transform:rotate(90deg)}
.d-lexis .lx-princ li:hover .lx-ico svg{transform:rotate(-90deg)}
.d-lexis .lx-ico svg{width:22px;height:22px;stroke-width:1.4;transition:transform 1s var(--slow)}
.d-lexis .lx-princ h3{font-size:clamp(23px,1.9vw,29px)}
.d-lexis .lx-princ p{color:var(--dim)}
.d-lexis .lx-tabs{display:flex;gap:6px 28px;overflow-x:auto;scrollbar-width:none;margin-bottom:clamp(28px,3vw,44px);border-bottom:1px solid var(--line)}
.d-lexis .lx-tabs button{position:relative;flex:none;min-height:52px;padding:0;border:0;background:none;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);transition:color .6s}
.d-lexis .lx-tabs button::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--metal);transform:scaleX(0);transform-origin:right;transition:transform .9s var(--slow)}
.d-lexis .lx-tabs button[aria-selected="true"]{color:var(--ink)}
.d-lexis .lx-tabs button[aria-selected="true"]::after{transform:none;transform-origin:left}
.d-lexis .lx-tabs button:hover{color:var(--ink)}
.d-lexis .lx-notes{display:grid;gap:1px;background:var(--line);border:1px solid var(--line);grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))}
.d-lexis .lx-note{position:relative;display:grid;grid-template-rows:auto 1fr auto;gap:18px;min-height:250px;padding:clamp(26px,2.6vw,38px);background:var(--paper);overflow:hidden;isolation:isolate;transition:color .7s var(--slow)}
.d-lexis .lx-note::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--navy);transform:scaleY(0);transform-origin:bottom;transition:transform .9s var(--slow)}
.d-lexis .lx-note:hover{color:var(--iv)}
.d-lexis .lx-note:hover::before{transform:none}
.d-lexis .lx-note-top{display:flex;justify-content:space-between;gap:16px;color:var(--gold-d);transition:color .7s}
.d-lexis .lx-note:hover .lx-note-top{color:var(--gold-l)}
.d-lexis .lx-note h3{font-size:clamp(22px,1.8vw,28px);line-height:1.14}
.d-lexis .lx-note p{color:var(--dim);transition:color .7s}
.d-lexis .lx-note:hover p{color:rgba(243,239,230,.72)}
.d-lexis .lx-note-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 18px;padding-top:16px;border-top:1px solid var(--line);transition:border-color .7s}
.d-lexis .lx-note:hover .lx-note-foot{border-color:rgba(243,239,230,.2)}
.d-lexis .lx-note-foot span{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim);transition:color .7s}
.d-lexis .lx-note:hover .lx-note-foot span{color:rgba(243,239,230,.7)}
.d-lexis .lx-note-foot b{font-family:var(--serif);font-size:22px;font-weight:400}
.d-lexis .lx-fine{margin-top:28px;max-width:70ch;font-size:14px;color:var(--dim)}
.d-lexis .lx-register{display:grid;border-top:1px solid var(--line)}
.d-lexis .lx-person{display:grid;gap:10px 40px;padding:clamp(26px,3vw,40px) 0;border-bottom:1px solid var(--line);grid-template-columns:minmax(0,1fr)}
@media (min-width:860px){.d-lexis .lx-person{grid-template-columns:clamp(60px,6vw,96px) minmax(0,1fr) minmax(0,1.1fr);align-items:baseline}.d-lexis .lx-person.has-pic{grid-template-columns:clamp(60px,6vw,96px) 140px minmax(0,1fr) minmax(0,1.1fr);align-items:center}}
.d-lexis .lx-person>small{font-family:var(--serif);font-size:24px;color:var(--gold-d);font-variant-numeric:tabular-nums}
.d-lexis .lx-person figure{width:140px;aspect-ratio:4/5;overflow:hidden}
.d-lexis .lx-person figure img{width:100%;height:100%;object-fit:cover;filter:grayscale(1);transition:filter 1s,scale 1.4s var(--soft)}
.d-lexis .lx-person:hover figure img{filter:none;scale:1.05}
.d-lexis .lx-person h3{font-size:clamp(26px,2.4vw,38px)}
.d-lexis .lx-person p{color:var(--dim)}
.d-lexis .lx-person .lx-cap{margin-bottom:6px;color:var(--gold-d)}
.d-lexis .lx-faq{display:grid;gap:clamp(40px,5vw,80px)}
@media (min-width:1000px){.d-lexis .lx-faq{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start}.d-lexis .lx-faq .lx-head{position:sticky;top:calc(var(--hd) + 48px)}}
.d-lexis .lx-acc{counter-reset:lxq;border-top:1px solid var(--line)}
.d-lexis .lx-acc details{counter-increment:lxq;position:relative;border-bottom:1px solid var(--line)}
.d-lexis .lx-acc summary{display:grid;grid-template-columns:44px minmax(0,1fr) 22px;align-items:baseline;gap:12px;min-height:44px;padding:clamp(22px,2.2vw,30px) 0;cursor:pointer;list-style:none}
.d-lexis .lx-acc summary::-webkit-details-marker{display:none}
.d-lexis .lx-acc summary::before{content:counter(lxq,decimal-leading-zero);font-size:12px;font-weight:500;letter-spacing:.1em;color:var(--gold-d);font-variant-numeric:tabular-nums}
.d-lexis .lx-acc summary span{font-family:var(--serif);font-size:clamp(21px,1.8vw,27px);line-height:1.2;transition:transform .8s var(--slow)}
.d-lexis .lx-acc summary:hover span{transform:translateX(8px)}
.d-lexis .lx-acc summary .lx-plus{align-self:center;width:18px;height:18px}
.d-lexis .lx-acc details[open] .lx-plus::after{transform:rotate(0)}
.d-lexis .lx-acc details[open] .lx-plus::before{transform:rotate(180deg)}
.d-lexis .lx-acc details>p{max-width:62ch;margin:0 0 0 56px;padding:0 0 30px 20px;border-left:1px solid var(--gold);color:var(--dim);animation:lx-fade .9s var(--soft)}
.d-lexis .lx-intake{display:grid;gap:clamp(44px,5vw,90px)}
@media (min-width:1000px){.d-lexis .lx-intake{grid-template-columns:minmax(0,.9fr) minmax(0,1fr);align-items:start}}
.d-lexis .lx-intake-copy{display:grid;gap:26px;align-content:start}
.d-lexis .lx-intake-copy .lx-head{margin-bottom:0}
.d-lexis .lx-intake-copy>p{max-width:52ch;color:var(--dim)}
.d-lexis .lx-lock{display:flex;align-items:center;gap:16px;padding:18px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.d-lexis .lx-lock svg{flex:none;width:40px;height:40px;overflow:visible}
.d-lexis .lx-lock path,.d-lexis .lx-lock rect{fill:none;stroke:var(--gold-l);stroke-width:1.2}
.d-lexis .lx-sec:not(.lx-navy) .lx-lock path,.d-lexis .lx-sec:not(.lx-navy) .lx-lock rect{stroke:var(--gold-d)}
.d-lexis .lx-lock>span{display:grid;justify-items:start;gap:8px;font-family:var(--serif);font-size:21px;line-height:1.2}.d-lexis .lx-lock .lx-now{font-family:var(--sans)}
.d-lexis .lx-card{position:relative;padding:clamp(26px,3.6vw,56px);background:var(--paper);color:var(--navy);--ink:#0c1a33;--dim:#596278;--line:rgba(12,26,51,.16);--z-ink:#0c1a33;--z-dim:#596278;--z-line:rgba(12,26,51,.18);--z-accent:var(--gold-d)}
.d-lexis .lx-card::before{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:var(--metal)}
.d-lexis .lx-card .lx-fill{background:var(--navy);color:var(--iv)}
.d-lexis .lx-card .lx-fill:hover{background:var(--navy3)}
.d-lexis .z-field label,.d-lexis .z-chipset legend{font-size:11px;font-weight:600;letter-spacing:.18em;color:var(--z-dim)}
.d-lexis .z-field input,.d-lexis .z-field select,.d-lexis .z-field textarea{padding:12px 0;border:0;border-bottom:1px solid var(--z-line);background:transparent;transition:border-color .6s}
.d-lexis .z-field select{background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 10px) 52%,calc(100% - 5px) 52%;background-size:5px 5px;background-repeat:no-repeat}
.d-lexis .z-field textarea{border:1px solid var(--z-line);padding:12px 14px}
.d-lexis .z-field input:focus,.d-lexis .z-field select:focus,.d-lexis .z-field textarea:focus{border-color:var(--gold);outline:none}
.d-lexis .z-field :focus-visible{outline:none}
.d-lexis .form-status{border-color:var(--gold)}
.d-lexis .lx-visit{display:grid;gap:clamp(40px,5vw,90px)}
@media (min-width:1000px){.d-lexis .lx-visit{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.d-lexis .lx-visit-copy{display:grid;gap:24px;align-content:start}
.d-lexis .lx-visit-copy .lx-head{margin-bottom:0}
.d-lexis .lx-visit-copy>p{max-width:52ch;color:var(--dim)}
.d-lexis .lx-table{padding:clamp(24px,3vw,44px);background:var(--paper);border-top:2px solid var(--gold)}
.d-lexis .lx-table-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
.d-lexis .lx-table-top h3{font-size:clamp(24px,2vw,30px)}
.d-lexis .z-hours{border-top:1px solid var(--z-line)}
.d-lexis .z-hours div{position:relative;align-items:baseline;padding:16px 0;transition:padding .8s var(--slow)}
.d-lexis .z-hours dt{font-weight:500}
.d-lexis .z-hours dd{font-variant-numeric:tabular-nums}
.d-lexis .z-hours div.is-today{padding-left:18px;color:var(--z-ink)}
.d-lexis .z-hours div.is-today::before{content:"";position:absolute;left:0;top:12px;bottom:12px;width:2px;background:linear-gradient(180deg,#7e6638,#e0cc9d,#b0935a)}
.d-lexis .z-hours div.is-today dd{color:var(--z-ink)}
.d-lexis .z-reach{gap:8px}
.d-lexis .z-reach a{font-family:var(--serif);font-size:21px;background:linear-gradient(currentColor,currentColor) 0 90%/0 1px no-repeat;transition:background-size .8s var(--slow)}
.d-lexis .z-reach a:hover{background-size:100% 1px}
.d-lexis .z-reach .z-route{font-family:var(--sans);font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--z-accent)}
.d-lexis .lx-film{padding-bottom:0}
.d-lexis .lx-film-top{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:20px 40px}
.d-lexis .lx-film-top .lx-head{margin-bottom:clamp(36px,4vw,56px)}
.d-lexis .lx-film-meta{display:none;align-items:center;gap:18px;margin-bottom:clamp(36px,4vw,56px);color:var(--dim)}
.d-lexis .lx-film-meta b{font-family:var(--serif);font-size:28px;font-weight:400;color:var(--ink)}
.d-lexis .lx-film-track{display:grid;gap:clamp(10px,1.4vw,20px);padding:0 var(--pad) var(--z-sec);grid-template-columns:repeat(2,minmax(0,1fr))}
.d-lexis .lx-film-track figure{position:relative;overflow:hidden;aspect-ratio:4/5;background:var(--iv2)}
.d-lexis .lx-film-track figure:nth-child(3n+1){grid-column:1/-1;aspect-ratio:16/10}
.d-lexis .lx-film-track img{width:100%;height:100%;object-fit:cover;filter:saturate(.82);transition:scale 1.6s var(--soft),filter 1s}
.d-lexis .lx-film-track figure:hover img{scale:1.05;filter:none}
.d-lexis .lx-film-track figure>span{position:absolute;left:16px;top:14px;z-index:1;font-family:var(--serif);font-size:20px;color:var(--iv);text-shadow:0 1px 12px rgba(12,26,51,.5)}
.d-lexis .lx-film-bar{display:none}
@media (min-width:900px){.d-lexis .lx-film-track{grid-template-columns:repeat(3,minmax(0,1fr))}.d-lexis .lx-film-track figure:nth-child(3n+1){grid-column:auto;aspect-ratio:4/5}.d-lexis .lx-film-track figure:nth-child(4n+1){grid-column:span 2;aspect-ratio:auto}}
.d-lexis .lx-film.is-film{padding-top:0}
.d-lexis .lx-film.is-film .lx-film-pin{position:sticky;top:var(--hd);display:flex;flex-direction:column;justify-content:center;height:calc(100vh - var(--hd));height:calc(100svh - var(--hd));overflow:hidden}
.d-lexis .lx-film.is-film .lx-film-meta{display:flex}
.d-lexis .lx-film.is-film .lx-film-track{display:flex;gap:clamp(16px,1.6vw,28px);width:max-content;padding:0 var(--pad);transform:translate3d(calc(var(--x,0) * -1px),0,0);will-change:transform}
.d-lexis .lx-film.is-film .lx-film-track figure{flex:none;width:auto;height:min(58vh,620px);aspect-ratio:4/5}
.d-lexis .lx-film.is-film .lx-film-track figure:nth-child(3n+2){aspect-ratio:16/11}
.d-lexis .lx-film.is-film .lx-film-track figure:nth-child(3n){height:min(46vh,500px);align-self:flex-end}
.d-lexis .lx-film.is-film .lx-film-bar{display:block;position:relative;width:calc(100% - 2 * var(--pad));height:1px;margin:clamp(28px,4vh,48px) var(--pad) 0;background:var(--line)}
.d-lexis .lx-film.is-film .lx-film-bar i{position:absolute;inset:0;background:var(--metal);transform:scaleX(var(--f,0));transform-origin:left}
.d-lexis .lx-channels{display:grid;border-top:1px solid var(--line)}
.d-lexis .lx-channels a{display:grid;grid-template-columns:52px minmax(0,1fr) auto;align-items:center;gap:20px;min-height:88px;padding:20px 0;border-bottom:1px solid var(--line);transition:padding .9s var(--slow)}
.d-lexis .lx-channels a:hover{padding-left:14px}
.d-lexis .lx-channels .lx-ico{display:grid;place-items:center;width:52px;height:52px;border:1px solid var(--line);color:var(--gold-d)}
.d-lexis .lx-channels h3{font-size:clamp(22px,2vw,30px)}
.d-lexis .lx-channels p{color:var(--dim)}
.d-lexis .lx-channels a>svg{width:22px;height:22px;transition:transform .8s var(--slow)}
.d-lexis .lx-channels a:hover>svg{transform:translateX(6px)}
.d-lexis .z-cta{background:var(--navy);color:#f3efe6;--z-ink:#f3efe6;--z-dim:rgba(243,239,230,.68);--z-line:rgba(243,239,230,.16)}
.d-lexis .z-cta h2{font-size:clamp(38px,5vw,80px)}
.d-lexis .z-cta .lx-fill{background:var(--iv);color:var(--navy)}
.d-lexis .z-cta .z-center::before{content:"";width:min(260px,40%);height:1px;background:var(--metal)}
.d-lexis .z-statement h2,.d-lexis .z-show-in h2{font-family:var(--serif)}
.d-lexis .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(12,26,51,.1),rgba(12,26,51,.82))}
.d-lexis .z-show-in h2{font-size:clamp(38px,5vw,78px)}
.d-lexis .z-show-in .lx-line{color:#fff}
.d-lexis .z-show-in .lx-line::before{background:#fff}
.d-lexis .z-show-in .lx-line:hover{color:var(--navy)}
.d-lexis .z-card{background:var(--paper)}
.d-lexis .z-pack{position:relative}
.d-lexis .z-pack.is-featured{background:var(--navy);color:#f3efe6;border-color:var(--navy);--z-ink:#f3efe6;--z-dim:rgba(243,239,230,.7);--z-line:rgba(243,239,230,.16);--z-accent:var(--gold-l)}
.d-lexis .z-pack.is-featured::before{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:var(--metal)}
.d-lexis .z-pack h3{font-size:clamp(26px,2.2vw,34px)}
.d-lexis .z-tag{font-weight:600;letter-spacing:.2em}
.d-lexis .z-quotes blockquote{border-top:1px solid var(--gold)}
.d-lexis .z-quotes blockquote>p{font-size:clamp(22px,2vw,30px)}
.d-lexis .z-rows small,.d-lexis .z-steps small{font-family:var(--serif);font-size:20px;letter-spacing:0;color:var(--gold-d)}
.d-lexis .z-grid h3,.d-lexis .z-rows h3,.d-lexis .z-steps h3,.d-lexis .z-card h3{font-family:var(--serif);font-weight:400}
.d-lexis .z-ico{color:var(--gold-d)}
.d-lexis .z-ico svg{stroke-width:1.4}
.d-lexis .z-pic img{filter:saturate(.85)}
.d-lexis .z-acc summary{font-family:var(--serif);font-size:clamp(21px,1.8vw,27px)}
.d-lexis .lx-foot{position:relative;padding:clamp(80px,10vw,150px) 0 130px;background:var(--navy);color:rgba(243,239,230,.72);overflow:hidden}
.d-lexis .lx-foot-cta{display:grid;gap:28px;justify-items:start;padding-bottom:clamp(56px,7vw,100px)}
.d-lexis .lx-foot-cta p{color:var(--gold-l)}
.d-lexis .lx-foot-cta h2{max-width:20ch;color:#f3efe6;font-size:clamp(36px,4.6vw,74px)}
.d-lexis .lx-foot-cta .lx-fill{background:var(--iv);color:var(--navy)}
.d-lexis .lx-foot-name{display:block;margin-top:clamp(56px,7vw,100px);padding-bottom:.14em;font-family:var(--serif);font-size:min(15vw,240px,calc(178vw / var(--n,8)));line-height:1;letter-spacing:-.03em;color:#f3efe6;white-space:nowrap;overflow:hidden;text-overflow:clip}
.d-lexis .lx-foot-name span{display:inline-block;transform:translateY(calc(var(--p,0) * 14%))}
.d-lexis .lx-foot-grid{display:grid;gap:36px 40px;padding-top:clamp(44px,5vw,64px);grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}
.d-lexis .lx-foot-grid h3{margin-bottom:16px;font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-l)}
.d-lexis .lx-foot-grid a,.d-lexis .lx-foot-grid span{display:block;padding:5px 0;line-height:1.5}
.d-lexis .lx-foot-grid a{min-height:36px;color:#f3efe6;transition:color .6s,transform .8s var(--slow)}
.d-lexis .lx-foot-grid a:hover{color:var(--gold-l);transform:translateX(6px)}
.d-lexis .lx-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;padding-top:24px;border-top:1px solid rgba(243,239,230,.14);font-size:12.5px;color:rgba(243,239,230,.55)}
@keyframes lx-rise{to{transform:none}}
@keyframes lx-fade{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes lx-wipe{to{clip-path:inset(0)}}
@keyframes lx-zoom{to{scale:1}}
@keyframes lx-sweep{from{transform:scaleX(0)}}
@keyframes lx-grow{from{transform:scaleX(0)}}
@keyframes lx-grow-y{from{transform:scaleY(0)}}
@keyframes lx-draw{to{stroke-dashoffset:0}}
@keyframes lx-redraw{0%{transform:scaleX(1);transform-origin:right}50%{transform:scaleX(0);transform-origin:right}50.1%{transform-origin:left}100%{transform:scaleX(1);transform-origin:left}}
@media (max-width:620px){.d-lexis .lx-row-btn{grid-template-columns:34px minmax(0,1fr) 20px}.d-lexis .lx-row-in{padding-left:46px}.d-lexis .lx-acc summary{grid-template-columns:34px minmax(0,1fr) 18px}.d-lexis .lx-acc details>p{margin-left:20px;padding-left:16px}.d-lexis .lx-hero-art::before{left:-30%;right:30%}.d-lexis .lx-hero-art .lx-edge{left:-10px}.d-lexis .lx-step{padding-left:52px}.d-lexis .lx-logo span{display:none}}
@media (prefers-reduced-motion:reduce){.d-lexis .lx-lede,.d-lexis .lx-ctas,.d-lexis .lx-hero .lx-eyebrow,.d-lexis .lx-eyebrow>span:first-child::before,.d-lexis .lx-facts>div,.d-lexis .lx-hero-art::before,.d-lexis .lx-hero-art .lx-edge{animation:none}.d-lexis .lx-ln>span,.d-lexis .lx-statement h2 .lx-ln>span{transform:none;animation:none}.d-lexis .lx-hero-pic,.d-lexis .lx-seal{clip-path:none;animation:none}.d-lexis .lx-hero-pic img{scale:1;animation:none}.d-lexis .lx-seal circle{stroke-dashoffset:0;animation:none}.d-lexis .lx-hair{transform:none}.d-lexis .lx-preview figure{transition:none}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * Practice index (open/close, photograph beside it), approach counter, reading line, sideways
 * gallery. Scroll work is batched into one animation frame; nothing runs with reduced motion
 * that would move the page by itself.
 */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-lexis');if(!root)return;var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches,fine=W.matchMedia&&W.matchMedia('(hover: hover) and (pointer: fine)').matches;
q('[data-index]').forEach(function(ix){var rows=q('.lx-row',ix),figs=q('.lx-preview figure',ix),num=ix.querySelector('.lx-preview-n'),cur=-1;
function show(k){var f=null;figs.forEach(function(x){if(x.getAttribute('data-pic')===String(k))f=x});if(!f||k===cur)return;figs.forEach(function(x){x.classList.remove('is-was');if(x.classList.contains('is-on')){x.classList.remove('is-on');x.classList.add('is-was')}});f.classList.add('is-on');cur=k;if(num)num.textContent=(k<9?'0':'')+(k+1)}
rows.forEach(function(r,k){var b=r.querySelector('.lx-row-btn');if(!b)return;b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')!=='true';rows.forEach(function(o){var ob=o.querySelector('.lx-row-btn');o.classList.toggle('is-open',o===r&&open);if(ob)ob.setAttribute('aria-expanded',o===r&&open?'true':'false')});if(open)show(k)});if(fine)r.addEventListener('mouseenter',function(){show(k)})});
var first=rows.findIndex?rows.findIndex(function(r){return r.classList.contains('is-open')}):0;show(first<0?0:first)});
var appr=q('[data-steps]').map(function(s){var wrap=s.closest('.lx-appr');if(wrap&&!reduce)wrap.classList.add('is-live');return{wrap:wrap,steps:q('.lx-step',s),roll:wrap&&wrap.querySelector('.lx-count-roll>span'),bar:wrap&&wrap.querySelector('.lx-count-bar i'),k:-1}});
var films=reduce?[]:q('[data-film]').map(function(f){return{el:f,track:f.querySelector('.lx-film-track'),bar:f.querySelector('.lx-film-bar i'),cur:f.querySelector('[data-film-cur]'),on:false,dist:0}});
function sizeFilms(){films.forEach(function(f){var want=W.innerWidth>=900&&f.track.children.length>2;f.el.classList.toggle('is-film',want);f.on=want;if(!want){f.el.style.height='';f.track.style.removeProperty('--x');return}f.dist=Math.max(0,f.track.scrollWidth-W.innerWidth);f.el.style.height=(W.innerHeight+f.dist)+'px'})}
var bar=root.querySelector('.lx-progress i'),raf=0;
function frame(){raf=0;var vh=W.innerHeight,de=d.documentElement,max=de.scrollHeight-vh;if(bar)bar.style.setProperty('--sp',max>0?Math.min(1,W.scrollY/max).toFixed(4):'0');
appr.forEach(function(a){var k=0;a.steps.forEach(function(s,n){if(s.getBoundingClientRect().top<vh*.55)k=n});if(k!==a.k){a.k=k;a.steps.forEach(function(s,n){s.classList.toggle('is-on',n===k)});if(a.roll)a.roll.style.setProperty('--k',k);if(a.bar)a.bar.style.setProperty('--f',((k+1)/a.steps.length).toFixed(3))}});
films.forEach(function(f){if(!f.on)return;var r=f.el.getBoundingClientRect(),p=Math.max(0,Math.min(1,-r.top/Math.max(1,f.dist)));f.track.style.setProperty('--x',(p*f.dist).toFixed(1));if(f.bar)f.bar.style.setProperty('--f',p.toFixed(3));if(f.cur){var n=Math.min(f.track.children.length,1+Math.floor(p*f.track.children.length*.999));f.cur.textContent=(n<10?'0':'')+n}})}
function req(){if(!raf)raf=requestAnimationFrame(frame)}
sizeFilms();frame();W.addEventListener('scroll',req,{passive:true});W.addEventListener('resize',function(){sizeFilms();req()});W.addEventListener('load',function(){sizeFilms();req()})})();`;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M3 12h17M14 6l6 6-6 6" />
  </svg>
);

/** The *marked* headline as lines that rise out of a mask, one after the other. */
function Lines({ text, parts }: { text: string; parts: number }) {
  const { lines } = splitLines(text, parts);
  return (
    <>
      {lines.map((l, n) => (
        <span key={n} className="lx-ln" style={i(n)}>
          <span>{l}</span>
        </span>
      ))}
    </>
  );
}

function Head({ kicker, title, intro, id, wide }: HeadProps & { wide?: boolean }) {
  return (
    <header className={`lx-head${wide ? " is-wide" : ""}`}>
      {kicker ? (
        <p className="lx-kick lx-cap" data-rv>
          <span>{kicker}</span>
        </p>
      ) : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

const two = (n: number) => String(n).padStart(2, "0");

/** Where an "ask about this" link may point: the intake or contact section, when the page has one. */
const askHref = (c: Ctx) => {
  const s = c.spec.sections.find((x) => x.type === "booking") ?? c.spec.sections.find((x) => x.type === "contact");
  return s ? `#${s.id}` : null;
};

/** The words on that link: the opening's own button when it goes there too. */
const askLabel = (c: Ctx) => {
  const s = c.spec.sections.find((x) => x.type === "booking");
  if (c.spec.hero.primaryCta.href === askHref(c)) return c.spec.hero.primaryCta.label;
  return s && s.type === "booking" ? c.t.submit[s.kind] : c.t.contact;
};

/** Navigation labels: the section's own title when it is short enough, otherwise its kind. */
const navOf = (c: Ctx) =>
  c.nav.map((n) => {
    const t = c.spec.sections.find((x) => x.id === n.id)?.title.replace(/\*/g, "");
    return { id: n.id, label: t && t.length <= 18 ? t : n.label };
  });

function Logo({ c }: { c: Ctx }) {
  const [first, ...rest] = c.name.split(/\s+/);
  return (
    <a href="#top" className={`lx-logo${c.name.length > 26 ? " is-long" : ""}`} aria-label={c.name}>
      <b>{first}</b>
      {rest.length ? <span>{rest.join(" ")}</span> : null}
    </a>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="lx-hdr hdr">
        <div className="lx-wrap lx-bar">
          <Logo c={c} />
          <nav aria-label={c.t.menu} className="lx-links" data-nav>
            {navOf(c).map((n, k) => (
              <a key={n.id} href={`#${n.id}`}>
                <i>{two(k + 1)}</i>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={cta.href} className="btn lx-fill lx-hcta">
            {cta.label}
          </a>
          <button type="button" className="lx-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
        <span className="lx-progress" aria-hidden="true">
          <i />
        </span>
      </header>
      <div id="site-menu" className="lx-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {navOf(c).map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <i>{two(k + 1)}</i>
              <span>
                <b>{n.label}</b>
              </span>
            </a>
          ))}
        </nav>
        <div className="lx-menu-foot">
          <NowBadge c={c} className="lx-now" />
          {b.city || b.address ? <span>{b.address ?? b.city}</span> : null}
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
          <a href={cta.href} className="btn lx-line" style={{ color: "#f3efe6" }}>
            {cta.label}
          </a>
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
  const size = plain.length > 52 ? "is-s" : plain.length > 28 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const lw = Math.max(...plain.split(/\s+/).map((w) => w.length));
  return (
    <section className="lx-hero">
      <div className="lx-wrap lx-hero-grid">
        <div className="lx-hero-copy">
          <p className="lx-eyebrow lx-cap">
            <span>{[hero.eyebrow, b.city && !hero.eyebrow.includes(b.city) ? b.city : ""].filter(Boolean).join(" — ")}</span>
            <NowBadge c={c} className="lx-now" />
          </p>
          <h1 className={[size, lw > 11 ? "has-lw" : ""].filter(Boolean).join(" ") || undefined} style={{ ["--lw" as string]: Math.max(4, lw) }}>
            <Lines text={hero.headline} parts={plain.length > 60 ? 4 : plain.length > 34 ? 3 : 2} />
          </h1>
          <p className="lx-lede">{hero.subheadline}</p>
          <div className="lx-ctas">
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
        <div className={`lx-hero-art${p ? "" : " is-seal"}`}>
          <span className="lx-edge" aria-hidden="true" />
          {p ? (
            <figure className="lx-hero-pic">
              <Pic p={p} eager sizes="(min-width: 980px) 32vw, 100vw" />
              {hero.note ? <figcaption className="lx-cap">{hero.note}</figcaption> : null}
            </figure>
          ) : (
            <div className="lx-seal" aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="lx-metal" x1="0" x2="1">
                    <stop offset="0" stopColor="#7e6638" />
                    <stop offset=".45" stopColor="#e0cc9d" />
                    <stop offset="1" stopColor="#b0935a" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="49" />
              </svg>
              <b>{c.name.charAt(0)}</b>
              {b.city ? <span className="lx-cap">{b.city}</span> : null}
            </div>
          )}
        </div>
      </div>
      {facts.length ? (
        <div className="lx-wrap lx-hero-foot">
          <dl className="lx-facts">
            {facts.map((f, n) => (
              <div key={f.label} style={i(n)}>
                <dt className="lx-cap">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="lx-foot">
      <div className="lx-wrap">
        <div className="lx-foot-cta">
          <p className="lx-cap" data-rv>
            {c.spec.hero.eyebrow}
          </p>
          <h2 data-rv>{em(c.spec.business.tagline && c.spec.business.tagline !== c.spec.hero.eyebrow ? c.spec.business.tagline : c.spec.hero.headline)}</h2>
          <p data-rv>
            <a href={cta.href} className="btn lx-fill">
              {cta.label} <Arrow />
            </a>
          </p>
        </div>
        <span className="lx-hair" data-rv aria-hidden="true" />
        <div className="lx-foot-grid">
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
            {b.address || b.city ? <span>{b.address ?? b.city}</span> : null}
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
          {c.spec.footer.blurb ? (
            <div>
              <h3>{c.name}</h3>
              <span>{c.spec.footer.blurb}</span>
            </div>
          ) : null}
        </div>
        <p className="lx-foot-name" aria-hidden="true" data-px style={{ ["--n" as string]: Math.max(6, c.name.length) }}>
          <span>{c.name}</span>
        </p>
        <Legal c={c} className="lx-legal" />
      </div>
    </footer>
  );
}

/** A lock drawn in fine metal: the intake is confidential. */
const Lock = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <rect x="9" y="17" width="22" height="17" />
    <path d="M14 17v-5a6 6 0 0 1 12 0v5M20 23v5" />
  </svg>
);

export const lexis: Family = {
  key: "lexis",
  root: "d-lexis",
  fonts: ["DM Serif Display", "Archivo"],
  themeColor: "#f6f3ec",
  accent: "#0c1a33",
  onAccent: "#e0cc9d",
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "lx-wrap", eyebrow: "lx-cap", btn: "lx-fill", btnAlt: "lx-line", btnText: "lx-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    services: (s, c) => {
      const pics = s.items.map((_, n) => c.photo(`art:svc${n}`));
      const any = pics.some(Boolean);
      const ask = askHref(c);
      return (
        <section className="lx-sec lx-navy" id={s.id}>
          <div className="lx-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} wide />
            <div className={`lx-index${any ? " has-pics" : ""}`} data-index>
              <ol className="lx-rows">
                {s.items.map((it, n) => (
                  <li key={n} className={`lx-row${n === 0 ? " is-open" : ""}`} data-rv style={i(n % 5)}>
                    <h3>
                      <button type="button" className="lx-row-btn" aria-expanded={n === 0} aria-controls={`${s.id}-r${n}`}>
                        <span className="lx-row-n">{two(n + 1)}</span>
                        <span className="lx-row-t">{it.title}</span>
                        <i className="lx-plus" aria-hidden="true" />
                      </button>
                    </h3>
                    <div className="lx-row-body" id={`${s.id}-r${n}`}>
                      <div>
                        <div className="lx-row-in">
                          {pics[n] ? (
                            <figure className="lx-row-pic">
                              <Pic p={pics[n]!} sizes="90vw" />
                            </figure>
                          ) : null}
                          <p>{it.description}</p>
                          {it.price || it.duration ? <p className="lx-row-meta lx-cap">{[it.duration, it.price].filter(Boolean).join(" · ")}</p> : null}
                          {ask ? (
                            <a href={ask} className="lx-text">
                              {askLabel(c)} <Arrow />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              {any ? (
                <div className="lx-preview" aria-hidden="true">
                  {pics.map((p, n) =>
                    p ? (
                      <figure key={n} data-pic={n} className={n === pics.findIndex(Boolean) ? "is-on" : undefined}>
                        <Pic p={p} sizes="(min-width: 1000px) 34vw, 1px" />
                      </figure>
                    ) : null,
                  )}
                  <span className="lx-preview-n">{two(pics.findIndex(Boolean) + 1)}</span>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="lx-sec" id={s.id}>
          <div className={`lx-wrap lx-about${p ? "" : " is-solo"}`}>
            {p ? (
              <div className="lx-about-pic">
                <figure data-rv data-px>
                  <Pic p={p} sizes="(min-width: 1000px) 38vw, 92vw" />
                </figure>
              </div>
            ) : (
              <Head kicker={c.t.kick.about} title={s.title} />
            )}
            <div className="lx-about-copy">
              {p ? <Head kicker={c.t.kick.about} title={s.title} /> : null}
              <p className="lx-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length ? (
                <ul className="lx-roman" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    statement: (s) => {
      const plain = s.title.replace(/\*/g, "");
      return (
        <section className="lx-sec lx-statement lx-iv2" id={s.id}>
          <div className="lx-wrap">
            <span className="lx-hair" data-rv aria-hidden="true" />
            <h2 data-rv>
              <Lines text={s.title} parts={plain.length > 120 ? 5 : plain.length > 70 ? 4 : 3} />
            </h2>
            {s.note ? (
              <p className="lx-cap" data-rv style={{ color: "var(--gold-d)" }}>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    process: (s, c) => (
      <section className="lx-sec lx-iv2" id={s.id}>
        <div className="lx-wrap lx-appr">
          <div className="lx-appr-side">
            <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
            <div className="lx-count" aria-hidden="true">
              <span className="lx-count-roll">
                <span>
                  {s.steps.map((_, n) => (
                    <i key={n}>{two(n + 1)}</i>
                  ))}
                </span>
              </span>
              <small>/ {two(s.steps.length)}</small>
            </div>
            <span className="lx-count-bar" aria-hidden="true">
              <i />
            </span>
          </div>
          <ol className="lx-steps" data-steps>
            {s.steps.map((st, n) => (
              <li key={n} className={`lx-step${n === 0 ? " is-on" : ""}`} data-rv>
                <b aria-hidden="true">{two(n + 1)}</b>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    features: (s, c, n) => (
      <section className={`lx-sec ${["services", "booking"].includes(c.spec.sections[n - 1]?.type ?? "") ? "lx-iv2" : "lx-navy"}`} id={s.id}>
        <div className="lx-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} wide />
          <ul className={`lx-princ${s.items.length % 3 && s.items.length % 2 === 0 ? " is-2" : ""}`} style={{ ["--cols" as string]: s.items.length % 3 && s.items.length % 2 === 0 ? 2 : Math.min(3, s.items.length) }}>
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span className="lx-ico" aria-hidden="true">
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
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      const tabs = cats.length > 1;
      const panel = (cat: (typeof cats)[number]) => (
        <div className="lx-notes">
          {cat.items.map((d, m) => (
            <article key={m} className="lx-note" data-rv style={i(m % 3)}>
              <p className="lx-note-top lx-cap">
                <span>{cat.name}</span>
                <span>{two(m + 1)}</span>
              </p>
              <div>
                <h3>{d.name}</h3>
                {d.description ? <p style={{ marginTop: 12 }}>{d.description}</p> : null}
              </div>
              {d.price || d.tags?.length ? (
                <p className="lx-note-foot">
                  <span>{d.tags?.join(" · ")}</span>
                  {d.price ? <b>{d.price}</b> : null}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      );
      return (
        <section className="lx-sec" id={s.id}>
          <div className="lx-wrap">
            <Head kicker={cats.length > 1 ? cats.slice(0, 3).map((cat) => cat.name).join(" · ") : c.t.kick.menu} title={s.title} intro={s.intro} wide />
            {tabs ? (
              <>
                <div className="lx-tabs" role="tablist" aria-label={s.title.replace(/\*/g, "")} data-rv>
                  {cats.map((cat, n) => (
                    <button key={n} type="button" role="tab" id={`${s.id}-t${n}`} aria-selected={n === 0} aria-controls={`${s.id}-p${n}`} tabIndex={n === 0 ? 0 : -1}>
                      {cat.name}
                    </button>
                  ))}
                </div>
                {cats.map((cat, n) => (
                  <div key={n} id={`${s.id}-p${n}`} role="tabpanel" aria-labelledby={`${s.id}-t${n}`} hidden={n !== 0}>
                    {panel(cat)}
                  </div>
                ))}
              </>
            ) : (
              panel(cats[0])
            )}
            {s.note ? (
              <p className="lx-fine" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    team: (s, c) => (
      <section className="lx-sec" id={s.id}>
        <div className="lx-wrap">
          <Head kicker={c.t.kick.team} title={s.title} intro={s.intro} wide />
          <ul className="lx-register">
            {s.members.map((m, n) => {
              const p = c.photo(m.image);
              return (
                <li key={n} className={`lx-person${p ? " has-pic" : ""}`} data-rv style={i(n % 4)}>
                  <small aria-hidden="true">{two(n + 1)}</small>
                  {p ? (
                    <figure>
                      <Pic p={p} sizes="140px" />
                    </figure>
                  ) : null}
                  <div>
                    <p className="lx-cap">{m.role}</p>
                    <h3>{m.name}</h3>
                  </div>
                  {m.bio ? <p>{m.bio}</p> : <span />}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    faq: (s, c) => (
      <section className="lx-sec" id={s.id}>
        <div className="lx-wrap lx-faq">
          <Head kicker={c.t.kick.faq} title={s.title} />
          <div className="lx-acc" data-acc>
            {s.items.map((it, n) => (
              <details key={n} data-rv style={i(n % 4)}>
                <summary>
                  <span>{it.q}</span>
                  <i className="lx-plus" aria-hidden="true" />
                </summary>
                <p>{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    ),
    booking: (s, c) => {
      const open = c.spec.business.openingHours?.find((l) => !/gesloten|closed|ferm[ée]|geschlossen/i.test(l));
      return (
      <section className="lx-sec lx-navy" id={s.id}>
        <div className="lx-wrap lx-intake">
          <div className="lx-intake-copy">
            <Head kicker={c.t.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            {open ? (
              <p className="lx-lock" data-rv>
                <Lock />
                <span>
                  {open}
                  <NowBadge c={c} className="lx-now" />
                </span>
              </p>
            ) : null}
            <Reach c={c} />
          </div>
          <div className="lx-card" data-rv>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </div>
        </div>
      </section>
      );
    },
    contact: (s, c) => (
      <section className="lx-sec lx-iv2" id={s.id}>
        <div className={`lx-wrap lx-visit${s.showForm ? "" : " is-solo"}`}>
          <div className="lx-visit-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="lx-card" data-rv>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : null}
        </div>
      </section>
    ),
    hours: (s, c) => (
      <section className="lx-sec lx-iv2" id={s.id}>
        <div className="lx-wrap lx-visit">
          <div className="lx-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <div className="lx-table" data-rv>
            <div className="lx-table-top">
              <h3>{c.t.hours}</h3>
              <NowBadge c={c} className="lx-now" />
            </div>
            {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
          </div>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="lx-sec lx-film" id={s.id} data-film>
          <div className="lx-film-pin">
            <div className="lx-wrap lx-film-top">
              <Head kicker={c.t.kick.gallery} title={s.title} />
              <p className="lx-film-meta lx-cap" aria-hidden="true">
                <b data-film-cur>01</b>
                <span>/ {two(pics.length)}</span>
              </p>
            </div>
            <div className="lx-film-track">
              {pics.map((p, n) => (
                <figure key={n} data-rv style={i(n % 3)}>
                  <span aria-hidden="true">{two(n + 1)}</span>
                  <Pic p={p} sizes="(min-width: 900px) 44vw, 50vw" />
                </figure>
              ))}
            </div>
            <span className="lx-film-bar" aria-hidden="true">
              <i />
            </span>
          </div>
        </section>
      );
    },
    order: (s, c) => (
      <section className="lx-sec" id={s.id}>
        <div className="lx-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} wide />
          <ul className="lx-channels">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="lx-ico" aria-hidden="true">
                    <Icon name={ch.icon} />
                  </span>
                  <span>
                    <h3>{ch.label}</h3>
                    <p>{ch.description}</p>
                  </span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
  },
};
