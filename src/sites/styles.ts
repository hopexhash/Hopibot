/**
 * Site stylesheet = shared base + layout variants (selected by body/section classes)
 * + one skin per design (SKINS). A rendered page only ships the skin it uses.
 */

const BASE = `
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:96px}
body{margin:0;font-family:var(--font-body);font-size:17px;line-height:1.65;color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden;counter-reset:sec}
img,svg{display:block;max-width:100%}
img{height:auto}
a{color:inherit}
h1,h2,h3,h4{font-family:var(--font-heading);font-weight:var(--heading-weight);font-style:var(--heading-style);text-transform:var(--heading-case);letter-spacing:var(--heading-track);line-height:var(--heading-lh);margin:0;color:var(--heading);text-wrap:balance}
h1{font-size:calc(var(--hs)*clamp(40px,6vw,76px))}
h2{font-size:calc(var(--hs)*clamp(30px,3.8vw,50px))}
h3{font-size:calc(var(--hs)*21px);line-height:1.2}
p{margin:0}
.wrap{width:100%;max-width:1200px;margin:0 auto;padding:0 28px}
.skip{position:absolute;left:-9999px;top:8px;z-index:200;background:var(--accent);color:var(--on-accent);padding:10px 16px}
.skip:focus{left:16px}
:focus-visible{outline:3px solid var(--accent-text);outline-offset:3px}
.demo-bar{position:relative;z-index:60;background:#111;color:#f5f5f5;font:500 12.5px/1.4 var(--font-body);text-align:center;padding:8px 16px;letter-spacing:.01em}
.demo-bar strong{color:#fff}

/* Header */
.util{background:var(--heading);color:var(--bg);font-size:13.5px;font-weight:500}
.util .wrap{display:flex;justify-content:space-between;align-items:center;min-height:38px;gap:16px}
.util span,.util a{display:inline-flex;align-items:center;gap:8px;text-decoration:none;white-space:nowrap}
.util svg{width:15px;height:15px}
.hdr{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--bg) 86%,transparent);backdrop-filter:saturate(1.5) blur(14px);-webkit-backdrop-filter:saturate(1.5) blur(14px);border-bottom:1px solid var(--line)}
.hdr .wrap{display:flex;align-items:center;justify-content:space-between;min-height:74px;gap:24px}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;font-family:var(--font-heading);font-weight:var(--heading-weight);font-style:var(--heading-style);text-transform:var(--heading-case);letter-spacing:var(--heading-track);font-size:calc(var(--hs)*21px);line-height:1.1;color:var(--heading);min-width:0}
.brand-mark{width:38px;height:38px;border-radius:var(--r-sm);display:grid;place-items:center;background:var(--accent);color:var(--on-accent);font-size:17px;flex:none;font-style:normal}
.brand-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@media (min-width:1081px){.hdr .brand{flex:0 1 auto;max-width:34%}.nav{flex:none}}
.ftr .brand-name{white-space:normal}
.nav{display:flex;align-items:center;gap:4px}
.nav a{white-space:nowrap;text-decoration:none;font-size:15px;font-weight:500;color:var(--text);padding:8px 12px;border-radius:var(--r-sm);transition:color .2s,background .2s}
.nav a:hover{color:var(--heading);background:var(--soft)}
.nav .btn{margin-left:10px;min-height:44px;padding:0 20px;font-size:14.5px}
.menu-toggle{display:none}
.menu-btn{display:none;width:46px;height:46px;border-radius:var(--r-sm);border:1px solid var(--line-strong);background:transparent;align-items:center;justify-content:center;cursor:pointer;color:var(--heading);flex:none}
.menu-btn svg{width:22px;height:22px}

/* Buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 28px;border-radius:var(--r-btn);font:600 15.5px/1 var(--font-body);text-decoration:none;border:1.5px solid transparent;cursor:pointer;transition:transform .2s cubic-bezier(.2,.7,.3,1),box-shadow .25s,background .2s,border-color .2s,color .2s;white-space:nowrap}
.btn svg{width:18px;height:18px;flex:none}
.btn-primary,.nav a.btn-primary{background:var(--accent);color:var(--on-accent)}
.btn-primary:hover,.nav a.btn-primary:hover{background:var(--accent-strong);color:var(--on-accent);transform:translateY(-2px)}
.btn-ghost{background:transparent;color:var(--heading);border-color:var(--line-strong)}
.btn-ghost:hover{border-color:var(--heading);transform:translateY(-2px)}
.on-image .btn-ghost{color:#fff;border-color:rgba(255,255,255,.5)}
.on-image .btn-ghost:hover{border-color:#fff}
.btn-pill .btn{border-radius:999px}
.btn-outline .btn-primary,.btn-outline .nav a.btn-primary{background:transparent;color:var(--accent-text);border-color:var(--accent);letter-spacing:.14em;text-transform:uppercase;font-size:12.5px;font-weight:500}
.btn-outline .btn-primary:hover,.btn-outline .nav a.btn-primary:hover{background:var(--accent);color:var(--on-accent)}
.btn-outline .on-image .btn-primary{color:#fff}
.btn-outline .btn-ghost{letter-spacing:.14em;text-transform:uppercase;font-size:12.5px;font-weight:500;border-color:transparent;text-decoration:underline;text-underline-offset:6px}
.btn-hard .btn{border:2.5px solid var(--heading);border-radius:var(--r-sm);box-shadow:5px 5px 0 var(--heading);font-weight:700;text-transform:uppercase;letter-spacing:.03em}
.btn-hard .btn:hover{transform:translate(3px,3px);box-shadow:2px 2px 0 var(--heading)}
.btn-hard .btn-ghost{background:var(--surface)}
.btn-underline .btn{border-radius:0;border:0;border-bottom:1.5px solid currentColor;padding:0 2px;min-height:44px;background:transparent;font-weight:500;letter-spacing:.06em;text-transform:uppercase;font-size:13px}
.btn-underline .btn-primary,.btn-underline .nav a.btn-primary{color:var(--accent-text);background:transparent}
.btn-underline .btn-primary:hover,.btn-underline .nav a.btn-primary:hover{background:transparent;color:var(--heading)}
.btn-underline .form .btn,.btn-underline .mbar .btn,.btn-underline .cta-band .btn{border:1.5px solid var(--heading);padding:0 26px;min-height:52px;background:var(--heading);color:var(--bg)}

/* Nav variants */
@media (min-width:1081px){
  .nav-stacked .hdr .wrap{flex-direction:column;justify-content:center;gap:10px;padding-top:18px;padding-bottom:12px}
  .nav-stacked .brand{font-size:calc(var(--hs)*30px)}
  .nav-stacked .brand-mark{display:none}
  .nav-stacked .nav a:not(.btn){font-size:12.5px;letter-spacing:.16em;text-transform:uppercase}
  .nav-pill .hdr{top:14px;background:transparent;border:0;backdrop-filter:none;-webkit-backdrop-filter:none;margin-top:14px}
  .nav-pill .hdr .wrap{max-width:1144px;width:calc(100% - 56px);background:color-mix(in srgb,var(--surface) 90%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--line-strong);border-radius:999px;padding:0 12px 0 22px;min-height:64px;box-shadow:var(--shadow-md)}
  .nav-pill .nav .btn{min-height:42px}
  .nav-minimal .hdr{background:var(--bg);backdrop-filter:none;-webkit-backdrop-filter:none}
  .nav-minimal .brand-mark{display:none}
  .nav-minimal .nav{gap:14px}
  .nav-minimal .nav a:not(.btn){font-size:12px;letter-spacing:.18em;text-transform:uppercase;padding:8px 4px;background:none}
  .nav-minimal .nav a:not(.btn):hover{color:var(--accent-text)}
}
.nav-block .hdr{background:var(--surface);backdrop-filter:none;-webkit-backdrop-filter:none;border-bottom:3px solid var(--heading)}
.nav-block .nav a:not(.btn){font-weight:600;text-transform:uppercase;font-size:13.5px;letter-spacing:.06em}

/* Section heads */
.section{padding:120px 0;position:relative;counter-increment:sec}
.section.alt{background:var(--bg-alt)}
.section-head{max-width:720px;margin-bottom:60px}
.section-head p,.lead-sm{margin-top:18px;font-size:18px;color:var(--muted)}
.kicker,.eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-body);font-size:12.5px;font-weight:600;font-style:normal;letter-spacing:.18em;text-transform:uppercase;color:var(--accent-text);margin-bottom:18px}
.head-center .section-head,.head-ornament .section-head{margin-left:auto;margin-right:auto;text-align:center}
.head-ornament .section-head h2::after{content:"";display:block;width:120px;height:13px;margin:26px auto 0;background:linear-gradient(var(--accent),var(--accent)) left center/46px 1px no-repeat,linear-gradient(var(--accent),var(--accent)) right center/46px 1px no-repeat;border:0}
.head-ornament .section-head h2{position:relative}
.head-ornament .section-head h2::before{content:"";position:absolute;left:50%;bottom:2px;width:9px;height:9px;margin-left:-4.5px;background:var(--accent);transform:rotate(45deg)}
.head-number .section-head{display:grid;grid-template-columns:auto 1fr;column-gap:28px;align-items:start;max-width:900px}
.head-number .section-head::before{content:"0" counter(sec);grid-row:1/4;font-family:var(--font-heading);font-size:calc(var(--hs)*clamp(44px,6vw,84px));line-height:.9;color:transparent;-webkit-text-stroke:1.5px var(--accent);font-style:normal}
.head-number .section-head>*{grid-column:2}
.head-tape .kicker{background:var(--accent);color:var(--on-accent);padding:7px 14px;transform:rotate(-2deg);font-family:var(--font-accent);font-size:15px;letter-spacing:.04em;font-weight:400;box-shadow:3px 3px 0 var(--heading)}

/* Hero — shared */
.hero{position:relative;overflow:hidden}
.hero .lead{margin-top:24px;font-size:clamp(17px,1.5vw,20px);color:var(--muted);max-width:560px}
.hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:36px;align-items:center}
.hero-meta{display:flex;flex-wrap:wrap;gap:12px 26px;margin-top:40px;font-size:14.5px;color:var(--muted)}
.hero-meta span{display:inline-flex;align-items:center;gap:8px}
.hero-meta svg{width:16px;height:16px;color:var(--accent-text);flex:none}
.hero-media img{width:100%;object-fit:cover;border-radius:var(--r-lg)}
.on-image h1{color:#fff}
.on-image .lead{color:rgba(255,255,255,.86)}
.on-image .eyebrow{color:#fff}
.on-image .hero-meta{color:rgba(255,255,255,.82)}
.on-image .hero-meta svg{color:#fff}
.hero-bg{position:absolute;inset:0;z-index:0}
.hero-bg img{width:100%;height:100%;object-fit:cover}
.hero .wrap{position:relative;z-index:2}

/* split */
.hero-split{padding:90px 0 110px}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:64px;align-items:center}
.hero-split .hero-media{position:relative}
.hero-split .hero-media img{aspect-ratio:1/1.05;box-shadow:var(--shadow-xl)}
.badge-float{position:absolute;left:-28px;bottom:36px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);padding:16px 20px;box-shadow:var(--shadow-lg);display:flex;gap:14px;align-items:center;max-width:290px}
.badge-float .ic{width:42px;height:42px;border-radius:var(--r-sm);background:var(--soft-accent);color:var(--accent-text);display:grid;place-items:center;flex:none}
.badge-float .ic svg{width:20px;height:20px}
.badge-float b{display:block;font-size:15px;color:var(--heading)}
.badge-float small{display:block;font-size:13px;color:var(--muted);line-height:1.4}

/* cinema */
.hero-cinema{min-height:min(92vh,880px);display:flex;align-items:flex-end;padding:180px 0 0;isolation:isolate}
.hero-cinema::after{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(0,0,0,.3) 0%,rgba(0,0,0,.15) 30%,rgba(0,0,0,.85) 100%),linear-gradient(90deg,rgba(0,0,0,.6),transparent 72%)}
.hero-cinema .hero-copy{max-width:820px;padding-bottom:56px}
.hero-cinema .hero-meta{margin:0;padding:22px 0;border-top:1px solid rgba(255,255,255,.22)}

/* centered */
.hero-centered{padding:110px 0 0;text-align:center}
.hero-centered .hero-copy{max-width:880px;margin:0 auto}
.hero-centered .lead{margin-left:auto;margin-right:auto}
.hero-centered .hero-actions,.hero-centered .hero-meta{justify-content:center}
.hero-centered .hero-media{margin:72px auto 0}
.hero-centered .hero-media img{aspect-ratio:16/7.6;border-radius:var(--r-lg) var(--r-lg) 0 0}

/* editorial */
.hero-editorial{padding:72px 0 100px}
.hero-editorial h1{font-size:calc(var(--hs)*clamp(46px,9.4vw,138px));line-height:.92;max-width:none}
.ed-top{border-bottom:1px solid var(--line-strong);padding-bottom:36px}
.ed-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:56px;align-items:end;margin-top:36px}
.ed-grid .hero-media img{aspect-ratio:13/9}
.ed-side .hero-meta{flex-direction:column;gap:10px;margin-top:36px;padding-top:24px;border-top:1px solid var(--line-strong)}

/* poster */
.hero-poster{padding:72px 0 0}
.poster-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:48px;align-items:center;padding-bottom:72px}
.hero-poster h1{font-size:calc(var(--hs)*clamp(44px,6.6vw,92px))}
.hero-poster .hero-media{position:relative}
.hero-poster .hero-media img{aspect-ratio:1/1;transform:rotate(3deg);border:3px solid var(--heading);box-shadow:10px 10px 0 var(--heading)}
.sticker{position:absolute;left:-18px;top:-18px;min-width:118px;min-height:118px;padding:14px;border-radius:50%;display:grid;place-items:center;text-align:center;background:var(--accent);color:var(--on-accent);font-family:var(--font-accent);font-size:19px;line-height:1.05;transform:rotate(-12deg);border:3px solid var(--heading)}
.marquee{overflow:hidden;background:var(--heading);color:var(--bg);border-block:3px solid var(--heading);padding:14px 0;white-space:nowrap}
.marquee>div{display:inline-flex;animation:marq 32s linear infinite}
.marquee span{display:inline-flex}
.marquee b{font-family:var(--font-heading);font-weight:var(--heading-weight);text-transform:uppercase;font-size:calc(var(--hs)*22px);letter-spacing:.04em;padding:0 22px;display:inline-flex;align-items:center;gap:44px}
.marquee b::after{content:"✦";color:var(--accent)}
@keyframes marq{to{transform:translateX(-25%)}}

/* frame */
.hero-frame{padding:84px 0 72px;text-align:center}
.hero-frame .hero-copy{max-width:800px;margin:0 auto}
.hero-frame .lead{margin-left:auto;margin-right:auto}
.hero-frame .hero-actions,.hero-frame .hero-meta{justify-content:center}
.frame-row{display:grid;grid-template-columns:1fr 1.25fr 1fr;gap:28px;align-items:end;margin-top:64px}
.frame-row img{width:100%;object-fit:cover}
.frame-main{position:relative}
.frame-main img{aspect-ratio:9/11;border-radius:999px 999px var(--r-md) var(--r-md);box-shadow:var(--shadow-xl)}
.frame-main::before{content:"";position:absolute;inset:-14px;border:1px solid var(--accent);border-radius:999px 999px var(--r-md) var(--r-md);pointer-events:none}
.frame-side{aspect-ratio:6/7.6;border-radius:999px 999px var(--r-md) var(--r-md);opacity:.96}
.hand{position:absolute;right:-34px;top:14%;font-family:var(--font-accent);font-size:30px;line-height:1;color:var(--accent-text);transform:rotate(8deg);max-width:170px;text-align:left}

/* minimal */
.hero-minimal{padding:96px 0 56px}
.min-grid{display:grid;grid-template-columns:40px 1.15fr .85fr;gap:48px;align-items:center}
.min-vert{writing-mode:vertical-rl;transform:rotate(180deg);font-size:11.5px;letter-spacing:.32em;text-transform:uppercase;color:var(--muted);border-left:1px solid var(--line-strong);padding-left:14px;justify-self:start;white-space:nowrap}
.hero-minimal h1{font-size:calc(var(--hs)*clamp(40px,6.4vw,92px))}
.hero-minimal .hero-media{position:relative}
.hero-minimal .hero-media img{aspect-ratio:1/1;border-radius:50%}
.hero-minimal .hero-meta{border-top:1px solid var(--line-strong);margin-top:72px;padding-top:22px;justify-content:space-between}

/* panel */
.hero-panel{padding:120px 0 0;min-height:min(86vh,820px);display:flex;align-items:center}
.hero-panel>.wrap{padding-bottom:0}
.panel-media{position:absolute;inset:0 0 0 46%;z-index:0;clip-path:polygon(18% 0,100% 0,100% 100%,0 100%)}
.panel-media img{width:100%;height:100%;object-fit:cover}
.hero-panel .hero-copy{max-width:600px;padding-bottom:88px}
.chips{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:0;position:relative;z-index:3;background:var(--accent);color:var(--on-accent);width:max-content;max-width:100%}
.chips li{display:flex;align-items:center;gap:10px;padding:20px 28px;font-weight:600;font-size:15px;border-right:1px solid color-mix(in srgb,var(--on-accent) 20%,transparent)}
.chips li:last-child{border-right:0}
.chips svg{width:18px;height:18px;flex:none}

/* card */
.hero-card-wrap{}
.hero.hero-card{padding:88px 0 96px;isolation:isolate;background:none;border:0;box-shadow:none}
.hero.hero-card .hero-bg{opacity:.2}
.hero.hero-card::after{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,var(--bg) 30%,color-mix(in srgb,var(--bg) 60%,transparent))}
.card-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center}
.hero-card .hero-card{background:var(--surface);border:1px solid var(--line-strong);border-radius:var(--r-lg);padding:30px;box-shadow:var(--shadow-xl)}
.hc-title{display:block;font-family:var(--font-heading);font-weight:var(--heading-weight);font-style:var(--heading-style);text-transform:var(--heading-case);letter-spacing:var(--heading-track);font-size:calc(var(--hs)*24px);color:var(--heading);margin-bottom:18px;line-height:1.1}
.hero-card .form{background:none;border:0;box-shadow:none;padding:0}

/* About */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:76px;align-items:center}
.about-media{position:relative}
.about-media img{width:100%;aspect-ratio:10/11;object-fit:cover;border-radius:var(--r-lg)}
.about-copy h2{margin-bottom:24px}
.about-copy p+p{margin-top:16px}
.about-copy p{color:var(--text);font-size:17.5px}
.highlights{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:32px 0 0;padding:0;list-style:none}
.highlights li{display:flex;gap:10px;align-items:flex-start;font-weight:500;color:var(--heading);font-size:15.5px}
.highlights svg{width:20px;height:20px;color:var(--accent-text);flex:none;margin-top:2px}
.about.v-overlap .about-media{padding:0 56px 56px 0}
.about.v-overlap .about-inset{position:absolute;right:0;bottom:0;width:46%;aspect-ratio:1/1;border:8px solid var(--bg);box-shadow:var(--shadow-lg)}
.section.alt.about.v-overlap .about-inset{border-color:var(--bg-alt)}
.about.v-centered .about-grid{grid-template-columns:1fr;text-align:center;gap:48px;max-width:860px}
.about.v-centered .about-media{order:2}
.about.v-centered .about-media img{aspect-ratio:16/8}
.about.v-centered .highlights{justify-items:center;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
.about.v-statement .about-grid{grid-template-columns:1.25fr .75fr;align-items:start}
.about.v-statement .about-media{order:2}
.about.v-statement .about-media img{aspect-ratio:4/5}
.about.v-statement .about-copy p:first-of-type{font-family:var(--font-heading);font-style:var(--heading-style);font-weight:var(--heading-weight);font-size:calc(var(--hs)*clamp(22px,2.5vw,32px));line-height:1.3;color:var(--heading);letter-spacing:var(--heading-track);text-transform:none}
.about.v-statement .highlights{grid-template-columns:1fr;border-top:1px solid var(--line-strong);padding-top:24px}

/* Services */
.svc{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.svc-item{position:relative;background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);padding:32px;transition:transform .35s cubic-bezier(.2,.7,.3,1),box-shadow .35s,border-color .35s;display:flex;flex-direction:column}
.svc-item:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg);border-color:var(--line-strong)}
.svc-item .ic,.feature .ic,.channel .ic,.contact-list .ic{width:52px;height:52px;border-radius:var(--r-sm);background:var(--soft-accent);color:var(--accent-text);display:grid;place-items:center;flex:none}
.svc-item .ic{margin-bottom:22px}
.ic svg{width:24px;height:24px}
.svc-item h3{margin-bottom:10px}
.svc-item p{color:var(--muted);font-size:16px}
.svc-meta{display:flex;gap:14px;align-items:baseline;margin-top:auto;padding-top:20px;font-weight:600;color:var(--heading)}
.svc-meta .dur{font-weight:500;color:var(--muted);font-size:14px}
.price{font-family:var(--font-heading);font-style:normal;color:var(--accent-text);white-space:nowrap;font-weight:600}
.svc.v-tiles .svc-item{padding:0;overflow:hidden}
.svc.v-tiles .svc-img{overflow:hidden}
.svc.v-tiles .svc-img img{width:100%;aspect-ratio:7/5.2;object-fit:cover;transition:transform .6s cubic-bezier(.2,.7,.3,1)}
.svc.v-tiles .svc-item:hover img{transform:scale(1.06)}
.svc.v-tiles .svc-body{padding:26px 28px 6px}
.svc.v-tiles .svc-meta{padding:14px 28px 26px}
.svc.v-tiles .svc-body:last-child{padding-bottom:30px}
.svc.v-rows{grid-template-columns:1fr;gap:0;counter-reset:row;border-top:1px solid var(--line-strong)}
.svc.v-rows .svc-item{background:none;border:0;border-bottom:1px solid var(--line-strong);border-radius:0;padding:34px 0;flex-direction:row;align-items:baseline;gap:32px;counter-increment:row}
.svc.v-rows .svc-item:hover{transform:none;box-shadow:none;padding-left:14px}
.svc.v-rows .svc-item{transition:padding .35s cubic-bezier(.2,.7,.3,1)}
.svc.v-rows .ic{display:none}
.svc.v-rows .svc-item::before{content:"0" counter(row);font-size:13px;letter-spacing:.14em;color:var(--accent-text);font-weight:600;width:36px;flex:none}
.svc.v-rows .svc-body{display:grid;grid-template-columns:1fr 1.3fr;gap:32px;flex:1;align-items:baseline}
.svc.v-rows h3{font-size:calc(var(--hs)*clamp(22px,2.4vw,32px));margin:0}
.svc.v-rows .svc-meta{margin:0;padding:0}
.svc.v-pricelist{grid-template-columns:1fr 1fr;gap:0 64px}
.svc.v-pricelist .svc-item{background:none;border:0;border-bottom:1px dashed var(--line-strong);border-radius:0;padding:22px 0;flex-direction:row;align-items:baseline;gap:20px}
.svc.v-pricelist .svc-item:hover{transform:none;box-shadow:none}
.svc.v-pricelist .ic{display:none}
.svc.v-pricelist .svc-body{flex:1}
.svc.v-pricelist h3{font-size:calc(var(--hs)*19px);margin-bottom:4px}
.svc.v-pricelist p{font-size:15px}
.svc.v-pricelist .svc-meta{margin:0;padding:0;flex-direction:column;align-items:flex-end;gap:2px}
.svc.v-pricelist .price{font-size:calc(var(--hs)*20px)}

.features{display:grid;grid-template-columns:repeat(3,1fr);gap:48px 40px}
.feature{display:flex;gap:18px}
.feature .ic{width:48px;height:48px;border-radius:50%}
.feature h3{font-size:calc(var(--hs)*18px);margin-bottom:6px}
.feature p{color:var(--muted);font-size:15.5px}

/* Menu */
.menu{display:grid;grid-template-columns:repeat(2,1fr);gap:48px 72px}
.menu-cat h3{font-size:calc(var(--hs)*26px);padding-bottom:14px;margin-bottom:6px;border-bottom:1px solid var(--line-strong)}
.menu-item{padding:16px 0}
.mi-top{display:flex;align-items:baseline;gap:10px}
.mi-top b{font-family:var(--font-heading);font-style:var(--heading-style);font-weight:var(--heading-weight);text-transform:var(--heading-case);letter-spacing:var(--heading-track);font-size:calc(var(--hs)*18.5px);color:var(--heading);line-height:1.25}
.mi-top i{flex:1;border-bottom:1.5px dotted var(--line-strong);transform:translateY(-4px);min-width:20px}
.mi-desc{display:block;color:var(--muted);font-size:15px;margin-top:4px;max-width:46ch}
.mi-tags{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}
.mi-tags em{font-style:normal;font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;color:var(--accent-text);border:1px solid currentColor;border-radius:999px;padding:2px 9px}
.menu-note{margin-top:44px;color:var(--muted);font-size:15px;text-align:center;font-style:italic}
.menu-sec.v-cards .menu{grid-template-columns:1fr;gap:56px}
.menu-sec.v-cards .menu-cat h3{border:0;display:flex;align-items:center;gap:18px;padding:0;margin-bottom:22px}
.menu-sec.v-cards .menu-cat h3::after{content:"";flex:1;height:1px;background:var(--line-strong)}
.menu-sec.v-cards .menu-items{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.menu-sec.v-cards .menu-item{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);padding:22px 24px}
.menu-sec.v-cards .mi-top i{border:0}
.menu-sec.v-board .menu{background:var(--heading);color:var(--bg);border-radius:var(--r-lg);padding:56px;gap:44px 64px;grid-template-columns:repeat(2,1fr)}
.menu-sec.v-board .menu-cat h3{color:var(--bg);border-color:color-mix(in srgb,var(--bg) 30%,transparent);font-size:calc(var(--hs)*24px)}
.menu-sec.v-board .mi-top b{color:var(--bg)}
.menu-sec.v-board .mi-top i{border-color:color-mix(in srgb,var(--bg) 35%,transparent)}
.menu-sec.v-board .mi-desc{color:color-mix(in srgb,var(--bg) 68%,transparent)}
.menu-sec.v-board .price{color:var(--bg)}
.menu-sec.v-board .mi-tags em{color:var(--bg)}
.menu-sec.v-rows .menu{grid-template-columns:1fr;gap:0;counter-reset:mi}
.menu-sec.v-rows .menu-cat{display:grid;grid-template-columns:240px 1fr;gap:40px;border-top:1px solid var(--heading);padding:34px 0 22px}
.menu-sec.v-rows .menu-cat h3{border:0;font-size:12.5px;font-family:var(--font-body);font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--accent-text);padding-top:6px}
.menu-sec.v-rows .menu-item{display:grid;grid-template-columns:44px 1fr;column-gap:8px;border-bottom:1px solid var(--line);padding:16px 0;counter-increment:mi}
.menu-sec.v-rows .menu-item::before{content:counter(mi,decimal-leading-zero);font-size:12.5px;color:var(--muted);letter-spacing:.08em;padding-top:5px;grid-row:1/3}
.menu-sec.v-rows .mi-top i{border:0}
.menu-sec.v-rows .mi-desc,.menu-sec.v-rows .mi-tags{grid-column:2}
.menu-sec.v-courses .menu{grid-template-columns:1fr;max-width:640px;margin:0 auto;text-align:center;gap:52px}
.menu-sec.v-courses .menu-cat h3{border:0;font-family:var(--font-body);font-size:12px;font-weight:500;letter-spacing:.32em;text-transform:uppercase;color:var(--accent-text);font-style:normal}
.menu-sec.v-courses .mi-top{flex-direction:column;align-items:center;gap:4px}
.menu-sec.v-courses .mi-top i{display:none}
.menu-sec.v-courses .mi-top b{font-size:calc(var(--hs)*23px)}
.menu-sec.v-courses .mi-desc{margin:6px auto 0}
.menu-sec.v-courses .mi-tags{justify-content:center}
.menu-sec.v-courses .menu-cat+.menu-cat::before{content:"";display:block;width:1px;height:44px;background:var(--accent);margin:0 auto 52px}

.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px;counter-reset:step}
.step{position:relative;padding:32px 28px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md)}
.step::before{counter-increment:step;content:"0" counter(step);display:block;font-family:var(--font-heading);font-weight:var(--heading-weight);font-size:calc(var(--hs)*42px);line-height:1;color:var(--accent-text);margin-bottom:18px;font-style:normal}
.step h3{margin-bottom:8px}
.step p{color:var(--muted);font-size:15.5px}

/* Gallery */
.gallery{display:grid;gap:16px}
.gallery figure{margin:0;overflow:hidden;border-radius:var(--r-md)}
.gallery img{width:100%;height:100%;aspect-ratio:1/1;object-fit:cover;transition:transform .6s cubic-bezier(.2,.7,.3,1)}
.gallery figure:hover img{transform:scale(1.05)}
.gallery.v-mosaic{grid-template-columns:repeat(4,1fr);grid-auto-rows:220px}
.gallery.v-mosaic img{aspect-ratio:auto}
.gallery.v-mosaic figure:nth-child(6n+1){grid-column:span 2;grid-row:span 2}
.gallery.v-mosaic figure:nth-child(6n+4){grid-column:span 2}
.gallery.v-grid{grid-template-columns:repeat(3,1fr);gap:6px}
.gallery.v-grid figure{border-radius:0}
.gal-bleed{padding-left:max(28px,calc((100vw - 1200px)/2 + 28px))}
.gallery.v-strip{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:18px;padding:0 28px 18px 0;scrollbar-width:thin}
.gallery.v-strip figure{flex:0 0 min(78vw,440px);scroll-snap-align:start}
.gallery.v-strip img{aspect-ratio:4/5}
.gallery.v-polaroid{grid-template-columns:repeat(3,1fr);gap:34px}
.gallery.v-polaroid figure{background:#fff;padding:12px 12px 46px;border-radius:2px;box-shadow:var(--shadow-lg);overflow:visible}
.gallery.v-polaroid figure:nth-child(3n+1){transform:rotate(-2.4deg)}
.gallery.v-polaroid figure:nth-child(3n+2){transform:rotate(1.6deg) translateY(14px)}
.gallery.v-polaroid figure:nth-child(3n){transform:rotate(-1deg)}
.gallery.v-polaroid figure:hover img{transform:none}

/* Visit / hours */
.visit{display:grid;grid-template-columns:1.25fr .75fr;gap:22px;max-width:1000px;margin:0 auto}
.hours-card,.visit-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-lg);padding:38px 42px}
.hours-list{list-style:none;margin:0;padding:0}
.hours-list li{display:flex;justify-content:space-between;gap:16px;padding:13px 0;border-bottom:1px solid var(--line);font-size:16.5px}
.hours-list li:last-child{border-bottom:0}
.hours-list li span:first-child{font-weight:600;color:var(--heading)}
.hours-list li span:last-child{color:var(--muted);text-align:right}
.hours-note{margin-top:18px;font-size:14.5px;color:var(--muted)}
.visit-card{background:var(--heading);color:var(--bg);border:0;display:flex;flex-direction:column;gap:16px;align-items:flex-start;justify-content:center}
.visit-card>svg{width:30px;height:30px;color:var(--accent)}
.visit-addr{font-family:var(--font-heading);font-style:var(--heading-style);font-weight:var(--heading-weight);font-size:calc(var(--hs)*24px);line-height:1.25;color:var(--bg)}
.visit-tel{font-size:18px;font-weight:600;text-decoration:none;color:var(--bg)}
.visit-card .btn-ghost{color:var(--bg);border-color:color-mix(in srgb,var(--bg) 40%,transparent);margin-top:8px}
.btn-hard .visit-card .btn-ghost{background:var(--accent);color:var(--on-accent);box-shadow:5px 5px 0 var(--bg);border-color:var(--bg)}
.visit>:only-child{grid-column:1/-1;max-width:720px;margin:0 auto;width:100%}

.faq{max-width:840px}
.head-center .faq,.head-ornament .faq{margin:0 auto}
.faq details{border-bottom:1px solid var(--line-strong);padding:4px 0}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:22px 0;font-family:var(--font-heading);font-style:var(--heading-style);font-weight:var(--heading-weight);text-transform:var(--heading-case);letter-spacing:var(--heading-track);font-size:calc(var(--hs)*20px);line-height:1.25;color:var(--heading)}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";font:400 28px/1 var(--font-body);color:var(--accent-text);transition:transform .3s;flex:none}
.faq details[open] summary::after{transform:rotate(45deg)}
.faq details p{padding:0 0 24px;color:var(--muted);max-width:68ch}

/* CTA */
.cta-sec{padding:96px 0}
.cta-band{position:relative;overflow:hidden;border-radius:var(--r-lg);padding:68px 64px;background:var(--primary);color:var(--on-primary);display:flex;align-items:center;justify-content:space-between;gap:40px}
.cta-band h2{color:var(--on-primary);max-width:640px;position:relative}
.cta-band p{color:color-mix(in srgb,var(--on-primary) 80%,transparent);margin-top:14px;max-width:560px;position:relative;font-size:18px}
.cta-band .btn{position:relative;flex:none}
.cta-sec.v-full{padding:0;isolation:isolate;overflow:hidden}
.cta-sec.v-full .cta-bg{position:absolute;inset:0;z-index:-2}
.cta-sec.v-full .cta-bg img{width:100%;height:100%;object-fit:cover}
.cta-sec.v-full::after{content:"";position:absolute;inset:0;z-index:-1;background:color-mix(in srgb,var(--primary) 86%,transparent)}
.cta-sec.v-full .cta-band{background:none;border-radius:0;padding:130px 0;flex-direction:column;text-align:center;gap:36px}
.cta-sec.v-full .cta-band h2{font-size:calc(var(--hs)*clamp(34px,5.4vw,72px));max-width:900px}
.cta-sec.v-full .cta-band p{margin-left:auto;margin-right:auto}
.cta-sec.v-card .cta-band{background:var(--surface);border:1px solid var(--line-strong);color:var(--text);flex-direction:column;text-align:center;padding:80px 40px;gap:32px}
.cta-sec.v-card .cta-band h2{color:var(--heading)}
.cta-sec.v-card .cta-band p{color:var(--muted);margin-left:auto;margin-right:auto}

/* Packages */
.packages{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:22px;align-items:stretch}
.package{position:relative;background:var(--surface);border:1px solid var(--line-strong);border-radius:var(--r-lg);padding:38px 32px;display:flex;flex-direction:column}
.package.featured{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent),var(--shadow-lg)}
.pk-flag{position:absolute;top:-13px;left:32px;background:var(--accent);color:var(--on-accent);font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:999px}
.pk-price{margin:14px 0 6px;display:flex;align-items:baseline;gap:8px}
.pk-price b{font-family:var(--font-heading);font-size:calc(var(--hs)*40px);color:var(--heading);line-height:1;font-weight:var(--heading-weight)}
.pk-price .pk-req{font-size:calc(var(--hs)*24px);color:var(--accent-text)}
.pk-price small{color:var(--muted);font-size:14px}
.pk-desc{color:var(--muted);font-size:15.5px}
.package ul{list-style:none;margin:24px 0 0;padding:24px 0 0;border-top:1px solid var(--line);display:grid;gap:12px}
.package li{display:flex;gap:10px;font-size:15.5px;color:var(--text)}
.package li svg{width:19px;height:19px;color:var(--accent-text);flex:none;margin-top:3px}

/* Team */
.team{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:26px}
.member img{width:100%;aspect-ratio:7/8.4;object-fit:cover;border-radius:var(--r-md);margin-bottom:20px}
.member .role{display:block;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent-text);font-weight:600;margin-top:6px}
.member p{color:var(--muted);font-size:15.5px;margin-top:10px}

/* Booking + forms */
.booking-grid,.contact-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:64px;align-items:start}
.big-tel{display:inline-flex;align-items:center;gap:12px;margin-top:32px;font-family:var(--font-heading);font-size:calc(var(--hs)*clamp(24px,3vw,34px));font-weight:var(--heading-weight);color:var(--heading);text-decoration:none}
.big-tel svg{width:26px;height:26px;color:var(--accent-text)}
.form{background:var(--surface);border:1px solid var(--line-strong);border-radius:var(--r-lg);padding:36px;box-shadow:var(--shadow-md);display:grid;gap:18px}
.form .row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.form label{display:block;font-size:13.5px;font-weight:600;color:var(--heading);margin-bottom:8px}
.form input,.form textarea,.form select{width:100%;min-height:50px;border:1px solid var(--line-strong);border-radius:var(--r-sm);background:var(--bg);color:var(--heading);padding:12px 14px;font:inherit;font-size:16px;transition:border-color .2s,box-shadow .2s;color-scheme:light dark}
.m-dark .form input,.m-dark .form textarea,.m-dark .form select{color-scheme:dark}
.form textarea{min-height:120px;resize:vertical}
.form.compact textarea{min-height:76px}
.form input:focus,.form textarea:focus,.form select:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 22%,transparent)}
.form .btn{width:100%}
.form-note{font-size:13px;color:var(--muted)}
.form-status{display:none;padding:14px 16px;border-radius:var(--r-sm);background:var(--soft-accent);color:var(--heading);font-size:15px}
.form-status.show{display:block}
.contact-list{list-style:none;margin:34px 0 0;padding:0;display:grid;gap:18px}
.contact-list li{display:flex;gap:16px;align-items:center}
.contact-list .ic{width:48px;height:48px}
.contact-list .ic svg{width:20px;height:20px}
.contact-list small{display:block;font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.12em;font-weight:600}
.contact-list a,.contact-list span{font-size:17px;font-weight:500;color:var(--heading);text-decoration:none;overflow-wrap:anywhere}
.contact-list a:hover{color:var(--accent-text)}
.map-link{margin-top:30px}
.contact-grid.solo{grid-template-columns:1fr;max-width:860px}
.contact-grid.solo .contact-list{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}

/* Before / after */
.ba-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:26px}
.ba-grid figure{margin:0}
.ba{position:relative;overflow:hidden;border-radius:var(--r-md);--pos:50%;aspect-ratio:10/7;background:var(--surface)}
.ba img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ba-before{position:absolute;inset:0;clip-path:inset(0 calc(100% - var(--pos)) 0 0)}
.ba-gen .ba-before img{filter:grayscale(.85) brightness(.62) contrast(.85) blur(1.2px)}
.ba::after{content:"";position:absolute;top:0;bottom:0;left:var(--pos);width:3px;margin-left:-1.5px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.2);pointer-events:none}
.ba::before{content:"‹ ›";position:absolute;z-index:2;top:50%;left:var(--pos);width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:#fff;color:#111;display:grid;place-items:center;font:700 16px/1 system-ui;letter-spacing:2px;box-shadow:0 4px 14px rgba(0,0,0,.35);pointer-events:none}
.ba input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0;z-index:3}
.ba-l,.ba-r{position:absolute;top:14px;z-index:2;background:rgba(0,0,0,.6);color:#fff;font-size:11.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:5px 10px;border-radius:999px}
.ba-l{left:14px}.ba-r{right:14px}
.ba-grid figcaption{margin-top:12px;font-size:14px;color:var(--muted)}

/* Order channels */
.channels{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px}
.channel{display:flex;align-items:center;gap:18px;padding:24px 26px;background:var(--surface);border:1px solid var(--line-strong);border-radius:var(--r-md);text-decoration:none;transition:transform .25s,border-color .25s,box-shadow .25s}
.channel:hover{transform:translateY(-4px);border-color:var(--accent);box-shadow:var(--shadow-lg)}
.channel b{display:block;font-family:var(--font-heading);font-size:calc(var(--hs)*19px);color:var(--heading);font-weight:var(--heading-weight);text-transform:var(--heading-case);letter-spacing:var(--heading-track)}
.channel span{display:block;color:var(--muted);font-size:14.5px;line-height:1.45;margin-top:2px}
.channel>div:nth-child(2){flex:1;min-width:0}
.channel>svg{width:20px;height:20px;color:var(--accent-text);flex:none}

/* Testimonials (verified only) */
.quotes{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:22px}
.quote{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);padding:32px}
.quote>svg{width:28px;height:28px;color:var(--accent)}
.quote p{margin-top:16px;font-size:17px;color:var(--heading)}
.quote footer{margin-top:20px;font-size:14px;display:flex;flex-direction:column;gap:2px}
.quote footer a{color:var(--muted)}

/* Footer */
.ftr{background:var(--footer-bg);color:var(--footer-text);padding:76px 0 36px}
.ftr-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:48px}
.ftr .brand{color:var(--footer-heading)}
.ftr p{margin-top:16px;font-size:15px;max-width:360px}
.ftr .ftr-h{color:var(--footer-heading);font-family:var(--font-body);font-style:normal;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:16px;font-weight:600}
.ftr ul{list-style:none;margin:0;padding:0;display:grid;gap:10px;font-size:15px}
.ftr a{text-decoration:none}
.ftr a:hover{color:var(--footer-heading)}
.ftr-bottom{margin-top:56px;padding-top:24px;border-top:1px solid color-mix(in srgb,var(--footer-heading) 14%,transparent);display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;font-size:13.5px}
.ftr-centered .ftr-grid{grid-template-columns:1fr;text-align:center;justify-items:center;gap:36px}
.ftr-centered .ftr .brand{justify-content:center;font-size:calc(var(--hs)*30px)}
.ftr-centered .ftr .brand-mark{display:none}
.ftr-centered .ftr p{margin-left:auto;margin-right:auto}
.ftr-centered .ftr ul{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 26px}
.ftr-centered .ftr-bottom{justify-content:center;text-align:center}
.ftr-word{font-family:var(--font-heading);font-weight:var(--heading-weight);font-style:var(--heading-style);text-transform:var(--heading-case);letter-spacing:var(--heading-track);font-size:calc(var(--hs)*clamp(48px,11vw,170px));line-height:.9;color:var(--footer-heading);margin-bottom:64px;overflow-wrap:anywhere;opacity:.96}

/* Mobile action bar */
.mbar{display:none}

/* Reveal animations (progressive enhancement) */
.js .reveal{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.3,1),transform .8s cubic-bezier(.2,.7,.3,1)}
.js .reveal.in{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.js .reveal{opacity:1;transform:none;transition:none}.marquee>div{animation:none}*{transition-duration:.01ms!important;animation-duration:.01ms!important}}

/* Responsive */
@media (max-width:1080px){
  .menu-btn{display:inline-flex}
  .hdr .wrap{min-height:66px}
  .nav{position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:2px;padding:12px 20px 22px;background:var(--bg);border-bottom:1px solid var(--line-strong);box-shadow:var(--shadow-lg);display:none}
  .nav-block .nav{background:var(--surface)}
  .nav a{padding:15px 10px;font-size:17px;border-bottom:1px solid var(--line)}
  .nav .btn{margin:14px 0 0;min-height:52px;border-bottom-width:1.5px}
  .menu-toggle:checked~.nav{display:flex}
  .hero-grid,.about-grid,.contact-grid,.booking-grid,.card-grid,.poster-grid,.ed-grid,.about.v-statement .about-grid{grid-template-columns:1fr;gap:44px}
  .svc,.features,.menu-sec.v-cards .menu-items{grid-template-columns:repeat(2,1fr)}
  .badge-float{left:16px}
  .ftr-grid{grid-template-columns:1fr 1fr}
  .min-grid{grid-template-columns:1fr;gap:36px}
  .min-vert{writing-mode:horizontal-tb;transform:none;border-left:0;border-bottom:1px solid var(--line-strong);padding:0 0 12px;white-space:normal}
  .hero-minimal .hero-media{max-width:440px}
  .panel-media{position:relative;inset:auto;clip-path:none;height:300px;order:2}
  .hero-panel{flex-direction:column;align-items:stretch;padding:72px 0 0;min-height:0}
  .hero-panel .hero-copy{padding-bottom:44px}
  .hero-panel>.wrap{order:1}
  .chips{width:100%}
  .chips li{flex:1 1 auto}
  .gallery.v-mosaic{grid-template-columns:repeat(2,1fr);grid-auto-rows:180px}
  .svc.v-rows .svc-body{grid-template-columns:1fr;gap:8px}
  .menu-sec.v-rows .menu-cat{grid-template-columns:1fr;gap:6px}
  .hand{right:-6px;font-size:24px}
  .poster-grid{padding-bottom:56px}
  .hero-poster .hero-media{max-width:420px;margin:0 auto 12px}
}
@media (max-width:820px){
  .section{padding:84px 0}
  .section-head{margin-bottom:44px}
  .hero-split,.hero-editorial{padding:56px 0 76px}
  .hero-cinema{padding-top:140px;min-height:78vh}
  .hero-centered,.hero-frame{padding-top:72px}
  .cta-band{flex-direction:column;align-items:flex-start;padding:48px 32px}
  .cta-sec.v-full .cta-band{padding:96px 0;align-items:center}
  .cta-sec.v-card .cta-band{align-items:center}
  .menu,.menu-sec.v-board .menu{grid-template-columns:1fr}
  .menu-sec.v-board .menu{padding:36px 26px}
  .svc.v-pricelist{grid-template-columns:1fr}
  .visit{grid-template-columns:1fr}
  .frame-row{grid-template-columns:1fr;max-width:420px;margin-left:auto;margin-right:auto}
  .frame-side{display:none}
  .gallery.v-polaroid{gap:22px}
  .head-number .section-head{column-gap:18px}
}
@media (max-width:640px){
  body{font-size:16px;padding-bottom:calc(74px + env(safe-area-inset-bottom,0px))}
  .wrap{padding:0 20px}
  .gal-bleed{padding-left:20px}
  .svc,.features,.highlights,.form .row,.ftr-grid,.menu-sec.v-cards .menu-items{grid-template-columns:1fr}
  .gallery.v-grid,.gallery.v-polaroid{grid-template-columns:1fr 1fr}
  .gallery.v-polaroid figure{padding:8px 8px 30px}
  .hours-card,.visit-card{padding:28px 24px}
  .form{padding:24px}
  .hero-actions .btn{width:100%}
  .btn-underline .hero-actions .btn{width:auto}
  .badge-float{position:relative;left:auto;bottom:auto;margin:-36px 16px 0;max-width:none}
  .about.v-overlap .about-media{padding:0 32px 32px 0}
  .svc.v-rows .svc-item{gap:16px;padding:26px 0}
  .svc.v-rows .svc-item::before{width:26px}
  .chips li{padding:15px 20px;flex:1 1 100%;border-right:0;border-bottom:1px solid color-mix(in srgb,var(--on-accent) 20%,transparent)}
  .sticker{left:-6px;top:-22px;min-width:96px;min-height:96px;font-size:16px}
  .hero-poster .hero-media img{box-shadow:7px 7px 0 var(--heading)}
  .util .wrap span{display:none}
  .util .wrap{justify-content:center}
  .ftr-bottom{flex-direction:column}
  .mbar{display:grid;grid-template-columns:auto 1fr;gap:10px;position:fixed;left:0;right:0;bottom:0;z-index:70;padding:10px 14px calc(10px + env(safe-area-inset-bottom,0px));background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-top:1px solid var(--line-strong)}
  .mbar .btn{min-height:50px;padding:0 18px;font-size:15px;overflow:hidden;text-overflow:ellipsis}
  .btn-hard .mbar .btn{box-shadow:3px 3px 0 var(--heading)}
  .hero-card .hero-card{padding:22px}
  .ba-grid{grid-template-columns:1fr}
  .packages{grid-template-columns:1fr}
}
`;

const stripes = (a: string, b: string, size = 18) => `repeating-linear-gradient(135deg,${a} 0 ${size}px,${b} ${size}px ${size * 2}px)`;

/** One skin per design: the details that give each identity its character. */
const SKINS: Record<string, string> = {
  "luxury-restaurant": `
.d-luxury-restaurant .hero-cinema .hero-copy{max-width:900px}
.d-luxury-restaurant h1{font-weight:300}
.d-luxury-restaurant .hero-cinema::before{content:"";position:absolute;inset:22px;border:1px solid rgba(198,161,91,.4);z-index:2;pointer-events:none}
.d-luxury-restaurant .eyebrow,.d-luxury-restaurant .kicker{letter-spacing:.34em;font-weight:400}
.d-luxury-restaurant .menu-cat h3{text-align:center;border-bottom:0;font-size:calc(var(--hs)*30px)}
.d-luxury-restaurant .menu-cat h3::after{content:"";display:block;width:36px;height:1px;background:var(--accent);margin:14px auto 0}
.d-luxury-restaurant .mi-top b{font-style:normal;font-weight:500;letter-spacing:.02em}
.d-luxury-restaurant .section{padding:140px 0}
.d-luxury-restaurant .cta-sec.v-full{padding:0}
.d-luxury-restaurant .gallery.v-strip img{filter:saturate(.9)}`,
  "modern-italian": `
.d-modern-italian .hdr{border-bottom:0}
.d-modern-italian .hdr::after{content:"";display:block;height:12px;background:${stripes("var(--accent)", "var(--bg)", 14).replace("135deg", "90deg")}}
.d-modern-italian .brand-mark{border-radius:50%}
.d-modern-italian .ed-grid .hero-media img{border-radius:300px 300px var(--r-md) var(--r-md);aspect-ratio:12/10}
.d-modern-italian .menu-cat h3{font-size:calc(var(--hs)*34px);color:var(--accent-text);border-bottom:2px solid var(--heading)}
.d-modern-italian .mi-top b{font-style:normal;font-family:var(--font-body);font-weight:600;font-size:17px}
.d-modern-italian .cta-band{background:var(--accent);color:var(--on-accent)}
.d-modern-italian .cta-band h2{color:var(--on-accent)}
.d-modern-italian .cta-band .btn{background:var(--bg);color:var(--heading)}
.d-modern-italian .faq summary,.d-modern-italian h3{font-style:normal}`,
  "turkish-restaurant": `
.d-turkish-restaurant{--tile:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23c05a30' stroke-width='1.4'%3E%3Cpath d='M24 2 46 24 24 46 2 24z'/%3E%3Cpath d='M24 12 36 24 24 36 12 24z'/%3E%3Ccircle cx='24' cy='24' r='3.5' fill='%23c05a30'/%3E%3Cpath d='M0 0l8 8M48 0l-8 8M0 48l8-8M48 48l-8-8'/%3E%3C/g%3E%3C/svg%3E")}
.d-turkish-restaurant .hdr{border-bottom:0}
.d-turkish-restaurant .hdr::after,.d-turkish-restaurant .ftr::before{content:"";display:block;height:24px;background:var(--tile) center/24px 24px repeat-x;opacity:.85}
.d-turkish-restaurant .ftr{padding-top:0}
.d-turkish-restaurant .ftr::before{margin-bottom:64px;filter:brightness(1.6)}
.d-turkish-restaurant .hero-frame{background:radial-gradient(60% 50% at 50% 0%,color-mix(in srgb,var(--accent) 12%,transparent),transparent)}
.d-turkish-restaurant .menu-sec.v-cards .menu-item{border-color:color-mix(in srgb,var(--accent) 30%,var(--line));background:var(--surface)}
.d-turkish-restaurant .svc-item{border-radius:120px 120px var(--r-md) var(--r-md)}
.d-turkish-restaurant .svc.v-tiles .svc-img img{aspect-ratio:1/1}
.d-turkish-restaurant .svc.v-tiles .svc-body{text-align:center}
.d-turkish-restaurant .cta-sec.v-full::after{background:color-mix(in srgb,var(--primary) 90%,transparent)}`,
  sushi: `
.d-sushi .hero-minimal .hero-media::before{content:"";position:absolute;width:46%;aspect-ratio:1;border-radius:50%;background:var(--accent);right:-9%;top:-7%;z-index:-1}
.d-sushi .hero-minimal .hero-media{isolation:isolate}
.d-sushi h1,.d-sushi h2{font-weight:200}
.d-sushi .section{padding:140px 0}
.d-sushi .section.alt{background:var(--bg);border-top:1px solid var(--line-strong)}
.d-sushi .head-number .section-head::before,.d-sushi .section-head::before{-webkit-text-stroke:0;color:var(--accent);font-size:13px!important;letter-spacing:.2em;font-weight:500;padding-top:14px;content:"N° 0" counter(sec)}
.d-sushi .gallery.v-grid{gap:1px;background:var(--line-strong);border:1px solid var(--line-strong)}
.d-sushi .form,.d-sushi .hours-card,.d-sushi .cta-band,.d-sushi .package{border-radius:0;box-shadow:none}
.d-sushi .brand{font-weight:500;letter-spacing:.3em;text-transform:uppercase;font-size:15px}
.d-sushi .cta-sec.v-card .cta-band{border-width:1px 0;border-color:var(--heading);background:none}`,
  burger: `
.d-burger .hdr{background:transparent}
.d-burger .nav-pill .hdr .wrap,.d-burger.nav-pill .hdr .wrap{border:2.5px solid var(--heading);box-shadow:5px 5px 0 var(--heading);background:var(--surface)}
.d-burger .section{background:var(--bg-alt)}
.d-burger .section.alt{background:var(--bg)}
.d-burger .svc-item,.d-burger .menu-sec.v-cards .menu-item,.d-burger .form,.d-burger .hours-card,.d-burger .step,.d-burger .package,.d-burger .channel{border:2.5px solid var(--heading);box-shadow:6px 6px 0 var(--heading);background:var(--surface)}
.d-burger .menu-sec.v-cards .price{background:var(--accent);color:var(--on-accent);padding:3px 10px;border-radius:999px;font-size:15px;transform:rotate(3deg)}
.d-burger .menu-sec.v-cards .menu-cat h3{font-size:calc(var(--hs)*34px)}
.d-burger .ic{background:var(--accent)!important;color:var(--on-accent)!important;border:2.5px solid var(--heading);border-radius:50%!important}
.d-burger .cta-sec.v-full::after{background:color-mix(in srgb,var(--accent) 92%,transparent)}
.d-burger .cta-sec.v-full .cta-band h2{color:var(--on-accent)}
.d-burger .cta-sec.v-full .cta-band p{color:var(--on-accent)}
.d-burger .cta-sec.v-full .btn{background:var(--bg);color:var(--heading)}
.d-burger .about-media img{border:3px solid var(--heading);box-shadow:10px 10px 0 var(--heading)}
.d-burger .hero .lead{color:var(--text)}
.d-burger .eyebrow{color:var(--heading)}
.d-burger .hero .hero-meta{color:var(--text)}`,
  pizzeria: `
.d-pizzeria{--check:conic-gradient(var(--accent) 25%,var(--surface) 0 50%,var(--accent) 0 75%,var(--surface) 0) 0 0/28px 28px}
.d-pizzeria .hero-split{padding-bottom:120px}
.d-pizzeria .hero-split::after,.d-pizzeria .ftr::before{content:"";position:absolute;left:0;right:0;bottom:0;height:28px;background:var(--check)}
.d-pizzeria .ftr{position:relative;padding-top:104px}
.d-pizzeria .ftr::before{top:0;bottom:auto}
.d-pizzeria .hero-split .hero-media img{border-radius:50%;aspect-ratio:1/1;border:10px solid var(--surface);outline:3px dashed var(--accent);outline-offset:10px;box-shadow:none}
.d-pizzeria .badge-float{border:2px solid var(--heading);border-radius:var(--r-md)}
.d-pizzeria .menu-cat h3{color:var(--primary);border-bottom:3px double var(--primary)}
.d-pizzeria .mi-top b{font-family:var(--font-body);font-weight:700;font-size:18px}
.d-pizzeria .price{font-family:var(--font-body);font-weight:700}
.d-pizzeria .cta-band{background:var(--primary)}
.d-pizzeria .head-tape .kicker,.d-pizzeria .kicker{font-family:var(--font-body);font-weight:700;font-size:12.5px;letter-spacing:.14em;box-shadow:none;border-radius:999px;transform:none}`,
  "coffee-shop": `
.d-coffee-shop .hero-centered{background:radial-gradient(70% 60% at 50% 0%,var(--surface),transparent)}
.d-coffee-shop .hero-centered .hero-media img{border-radius:300px 300px 0 0;aspect-ratio:16/8.6;max-width:980px;margin:0 auto}
.d-coffee-shop .menu-sec.v-board .menu{background:var(--primary);background-image:radial-gradient(rgba(255,255,255,.035) 1px,transparent 1px);background-size:5px 5px}
.d-coffee-shop .menu-sec.v-board .menu-cat h3{font-size:calc(var(--hs)*30px);border-bottom-style:dashed}
.d-coffee-shop .menu-sec.v-board .price{color:var(--accent);filter:brightness(1.5)}
.d-coffee-shop .svc.v-tiles .svc-item{border:0;background:none}
.d-coffee-shop .svc.v-tiles .svc-img img{border-radius:var(--r-lg);aspect-ratio:1/1}
.d-coffee-shop .svc.v-tiles .svc-body{padding:22px 4px 0;text-align:center}
.d-coffee-shop .svc.v-tiles .svc-item:hover{box-shadow:none}`,
  bakery: `
.d-bakery .hero-frame{position:relative}
.d-bakery .hero-frame::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:22px;background:radial-gradient(circle at 22px 22px,var(--bg-alt) 21px,transparent 22px) 0 0/44px 22px repeat-x}
.d-bakery .frame-main img,.d-bakery .frame-main::before{border-radius:46% 54% 50% 50%/42% 44% 56% 58%}
.d-bakery .frame-main::before{border:2px dashed var(--accent);inset:-16px}
.d-bakery .frame-side{border-radius:50%;aspect-ratio:1/1;align-self:center}
.d-bakery .kicker,.d-bakery .eyebrow{font-family:var(--font-accent);font-size:25px;letter-spacing:0;text-transform:none;font-weight:600;margin-bottom:8px}
.d-bakery .svc.v-tiles .svc-item{border:0;box-shadow:var(--shadow-md)}
.d-bakery .menu-sec.v-cards .menu-item{border:0;box-shadow:var(--shadow-md)}
.d-bakery .about-media img{border-radius:48% 52% 50% 50%/40% 42% 58% 60%}
.d-bakery .about.v-overlap .about-inset{border-radius:50%}
.d-bakery .cta-sec.v-card .cta-band{background:var(--accent);border:0}
.d-bakery .cta-sec.v-card .cta-band h2,.d-bakery .cta-sec.v-card .cta-band p{color:var(--on-accent)}
.d-bakery .cta-sec.v-card .btn{background:var(--surface);color:var(--heading)}`,
  "street-food": `
.d-street-food h1{text-shadow:4px 4px 0 var(--accent)}
.d-street-food .eyebrow,.d-street-food .kicker{color:var(--primary)}
.d-street-food .head-tape .kicker{background:var(--primary);color:#111;box-shadow:3px 3px 0 var(--accent)}
.d-street-food .btn-primary,.d-street-food .nav a.btn-primary{background:var(--primary);color:#111;border-color:#111;box-shadow:5px 5px 0 var(--accent)}
.d-street-food .btn-primary:hover{background:var(--primary);color:#111;box-shadow:2px 2px 0 var(--accent)}
.d-street-food .btn-ghost{box-shadow:5px 5px 0 var(--primary);border-color:var(--heading);background:transparent}
.d-street-food .hero-poster .hero-media img{border-color:var(--primary);box-shadow:10px 10px 0 var(--accent)}
.d-street-food .sticker{border-color:#111;background:var(--primary);color:#111}
.d-street-food .marquee{background:var(--primary);color:#111;border-color:var(--primary)}
.d-street-food .marquee b::after{color:var(--accent)}
.d-street-food .menu-sec.v-board .menu{background:var(--surface);border:2px dashed var(--primary);border-radius:0}
.d-street-food .menu-sec.v-board .menu-cat h3,.d-street-food .menu-sec.v-board .mi-top b{color:var(--heading)}
.d-street-food .menu-sec.v-board .menu-cat h3{color:var(--primary);font-size:calc(var(--hs)*30px)}
.d-street-food .menu-sec.v-board .mi-desc{color:var(--muted)}
.d-street-food .menu-sec.v-board .price{color:var(--accent);filter:brightness(1.25)}
.d-street-food .menu-sec.v-board .mi-top i{border-color:var(--line-strong)}
.d-street-food .svc-item{border:1.5px solid var(--line-strong)}
.d-street-food .svc-item:hover{border-color:var(--primary)}
.d-street-food .cta-sec.v-full::after{background:${stripes("rgba(198,255,61,.96)", "rgba(180,236,44,.96)", 22)}}
.d-street-food .cta-sec.v-full .cta-band h2,.d-street-food .cta-sec.v-full .cta-band p{color:#111}
.d-street-food .cta-sec.v-full .btn{background:#111;color:var(--primary);box-shadow:5px 5px 0 var(--accent)}
.d-street-food .ftr-word{color:var(--primary)}`,
  "fine-dining": `
.d-fine-dining .section{padding:150px 0}
.d-fine-dining .hero-centered{padding-top:130px}
.d-fine-dining .hero-centered h1{font-size:calc(var(--hs)*clamp(38px,5.6vw,80px))}
.d-fine-dining .hero-centered .hero-media{max-width:1040px;padding:14px;border:1px solid var(--line-strong);border-bottom:0}
.d-fine-dining .hero-centered .hero-media img{border-radius:0}
.d-fine-dining .eyebrow,.d-fine-dining .kicker{letter-spacing:.4em;font-weight:400;font-size:11.5px}
.d-fine-dining .brand{letter-spacing:.24em;text-transform:uppercase;font-size:17px}
.d-fine-dining .section.alt{background:var(--bg);border-block:1px solid var(--line-strong)}
.d-fine-dining .gallery.v-strip img{aspect-ratio:3/4}
.d-fine-dining .cta-sec.v-card .cta-band{background:none;border-width:1px 0;border-radius:0}
.d-fine-dining .form,.d-fine-dining .hours-card{box-shadow:none}`,
  "asian-fusion": `
.d-asian-fusion{background-image:radial-gradient(700px 500px at 90% 0%,rgba(255,77,141,.18),transparent 60%),radial-gradient(600px 500px at 0% 30%,rgba(46,230,166,.1),transparent 60%);background-repeat:no-repeat}
.d-asian-fusion .hero-split .hero-media img{border-radius:50%;aspect-ratio:1/1;box-shadow:0 0 0 12px rgba(255,255,255,.04),0 0 90px -10px var(--accent)}
.d-asian-fusion .badge-float,.d-asian-fusion .svc-item,.d-asian-fusion .menu-sec.v-cards .menu-item,.d-asian-fusion .form,.d-asian-fusion .hours-card,.d-asian-fusion .step{background:rgba(255,255,255,.045);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-color:rgba(255,255,255,.1)}
.d-asian-fusion .section.alt{background:rgba(255,255,255,.02)}
.d-asian-fusion h1 ,.d-asian-fusion .cta-band h2{background:linear-gradient(100deg,#fff 30%,var(--accent) 70%,var(--primary));-webkit-background-clip:text;background-clip:text;color:transparent}
.d-asian-fusion .eyebrow,.d-asian-fusion .kicker{color:var(--primary)}
.d-asian-fusion .price{color:var(--primary)}
.d-asian-fusion .ic{background:linear-gradient(135deg,var(--accent),var(--primary))!important;color:#150d1e!important}
.d-asian-fusion .cta-sec.v-card .cta-band{background:linear-gradient(135deg,rgba(255,77,141,.16),rgba(46,230,166,.12));border-color:rgba(255,255,255,.14)}`,
  "food-truck": `
.d-food-truck{background-image:radial-gradient(color-mix(in srgb,var(--primary) 16%,transparent) 1.4px,transparent 1.4px);background-size:22px 22px}
.d-food-truck .hero-poster h1{color:var(--primary)}
.d-food-truck .hero-poster .hero-media img{border-radius:var(--r-lg)}
.d-food-truck .marquee{background:var(--accent);color:#111;border-color:var(--heading)}
.d-food-truck .marquee b::after{color:#fff}
.d-food-truck .section.alt{background:var(--bg-alt)}
.d-food-truck .svc-item,.d-food-truck .form,.d-food-truck .hours-card,.d-food-truck .step{border:2.5px solid var(--heading);box-shadow:6px 6px 0 var(--primary)}
.d-food-truck .menu-sec.v-board .menu{background:var(--primary);border:3px solid var(--heading);box-shadow:8px 8px 0 var(--heading)}
.d-food-truck .menu-sec.v-board .menu-cat h3{color:#fff}
.d-food-truck .menu-sec.v-board .mi-top b,.d-food-truck .menu-sec.v-board .price{color:#fff}
.d-food-truck .menu-sec.v-board .mi-desc{color:rgba(255,255,255,.8)}
.d-food-truck .cta-band{background:var(--accent);border:3px solid var(--heading);box-shadow:8px 8px 0 var(--heading)}
.d-food-truck .cta-band h2,.d-food-truck .cta-band p{color:#111}
.d-food-truck .cta-band .btn{background:var(--primary);color:#fff}
.d-food-truck .btn-ghost{background:#fff}`,
  barbershop: `
.d-barbershop .hdr{border-bottom:0}
.d-barbershop .hdr::after{content:"";display:block;height:6px;background:${stripes("#b3261e", "#efe8d8", 9)}}
.d-barbershop .hdr::after{background:repeating-linear-gradient(135deg,#b3261e 0 9px,#efe8d8 9px 18px,#24427a 18px 27px,#efe8d8 27px 36px)}
.d-barbershop .hero.hero-card::after{background:linear-gradient(90deg,var(--bg) 20%,rgba(14,14,14,.55))}
.d-barbershop .hero.hero-card .hero-bg{opacity:.5}
.d-barbershop .hero-card .hero-card{border-color:var(--accent);border-radius:0}
.d-barbershop .btn-primary,.d-barbershop .nav a.btn-primary{letter-spacing:.14em;text-transform:uppercase;font-size:13.5px}
.d-barbershop .svc.v-pricelist .svc-item{border-bottom:1px solid var(--line-strong)}
.d-barbershop .svc.v-pricelist .price{color:var(--accent)}
.d-barbershop .section-head h2::after{content:"";display:block;width:64px;height:3px;background:var(--accent);margin-top:22px}
.d-barbershop .member img{filter:grayscale(.35) contrast(1.05)}
.d-barbershop .cta-sec.v-full::after{background:rgba(14,14,14,.82)}
.d-barbershop .cta-sec.v-full .cta-band h2{color:var(--heading)}
.d-barbershop .cta-sec.v-full .cta-band p{color:var(--text)}`,
  "hair-salon": `
.d-hair-salon .hero-editorial h1{font-weight:400;font-style:italic;font-size:calc(var(--hs)*clamp(46px,8.6vw,124px))}
.d-hair-salon .ed-top{border:0;padding-bottom:0}
@media (min-width:1081px){.d-hair-salon .ed-grid{grid-template-columns:.9fr 1.1fr;align-items:center;margin-top:44px}}
.d-hair-salon .ed-grid .hero-media img{aspect-ratio:4/5}
.d-hair-salon .ed-grid .hero-media{order:2}
.d-hair-salon .eyebrow,.d-hair-salon .kicker{letter-spacing:.3em;font-weight:400}
.d-hair-salon .svc.v-pricelist h3{font-size:calc(var(--hs)*24px)}
.d-hair-salon .svc.v-pricelist .svc-item{border-bottom-style:solid;padding:26px 0}
.d-hair-salon .brand{font-size:calc(var(--hs)*26px);font-style:italic}
.d-hair-salon .member img{aspect-ratio:3/4}
.d-hair-salon .cta-sec.v-card .cta-band{background:var(--bg-alt);border:0}`,
  "beauty-salon": `
.d-beauty-salon .hero-frame{background:linear-gradient(180deg,var(--bg-alt),var(--bg))}
.d-beauty-salon h1 em,.d-beauty-salon h1{font-style:normal}
.d-beauty-salon .svc.v-tiles .svc-item{border:0;background:none;text-align:center}
.d-beauty-salon .svc.v-tiles .svc-img img{border-radius:999px 999px var(--r-md) var(--r-md);aspect-ratio:4/5}
.d-beauty-salon .svc.v-tiles .svc-item:hover{box-shadow:none}
.d-beauty-salon .svc.v-tiles .svc-body{padding:24px 8px 0}
.d-beauty-salon .svc.v-tiles .svc-meta{justify-content:center;padding:12px 0 0}
.d-beauty-salon .about.v-centered .about-media img{border-radius:999px;aspect-ratio:16/7}
.d-beauty-salon .cta-sec.v-card .cta-band{background:linear-gradient(135deg,var(--bg-alt),var(--surface));border-color:color-mix(in srgb,var(--accent) 35%,transparent)}
.d-beauty-salon .gallery.v-mosaic figure{border-radius:var(--r-lg)}`,
  "car-detailing": `
.d-car-detailing{background-image:linear-gradient(115deg,transparent 0 46%,rgba(34,211,238,.05) 46% 46.4%,transparent 46.4% 60%,rgba(255,255,255,.025) 60% 60.3%,transparent 60.3%);background-attachment:fixed}
.d-car-detailing .hero-panel .panel-media::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--bg),transparent 40%),linear-gradient(0deg,var(--bg),transparent 30%)}
.d-car-detailing h1{background:linear-gradient(180deg,#fff 30%,#8e98a5);-webkit-background-clip:text;background-clip:text;color:transparent}
.d-car-detailing .chips{background:rgba(255,255,255,.04);color:var(--heading);border:1px solid var(--line-strong);border-bottom:0;backdrop-filter:blur(10px)}
.d-car-detailing .chips svg{color:var(--accent)}
.d-car-detailing .svc-item,.d-car-detailing .package,.d-car-detailing .form,.d-car-detailing .hours-card{background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.01));border-color:var(--line-strong)}
.d-car-detailing .svc-item:hover,.d-car-detailing .package.featured{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent),0 20px 60px -20px rgba(34,211,238,.45)}
.d-car-detailing .btn-primary{box-shadow:0 0 34px -6px var(--accent)}
.d-car-detailing .eyebrow,.d-car-detailing .kicker{font-family:var(--font-heading);font-size:10.5px;letter-spacing:.3em}
.d-car-detailing .cta-sec.v-full::after{background:linear-gradient(180deg,rgba(7,9,12,.9),rgba(7,9,12,.7))}
.d-car-detailing .cta-sec.v-full .cta-band h2{color:#fff}
.d-car-detailing .cta-sec.v-full .cta-band p{color:var(--text)}`,
  garage: `
.d-garage h1,.d-garage h2,.d-garage .brand{font-style:italic}
.d-garage .hdr .brand-mark{transform:skewX(-10deg)}
.d-garage .hero-panel{background:var(--surface)}
.d-garage .hero-panel::before{content:"";position:absolute;z-index:1;top:0;bottom:0;left:calc(46% + 3.5%);width:14px;background:var(--accent);transform:skewX(-9.5deg);transform-origin:bottom}
.d-garage .chips{background:var(--heading);color:#fff}
.d-garage .chips svg{color:var(--accent)}
.d-garage .head-number .section-head::before{-webkit-text-stroke:0;color:var(--accent);font-style:italic}
.d-garage .svc.v-rows .svc-item::before{color:var(--accent);font-family:var(--font-heading);font-size:22px;font-style:italic}
.d-garage .btn{transform:skewX(-8deg)}
.d-garage .btn:hover{transform:skewX(-8deg) translateY(-2px)}
.d-garage .cta-band{background:var(--heading);border-left:14px solid var(--accent);border-radius:0}
.d-garage .step{border-top:4px solid var(--accent)}
@media (max-width:1080px){.d-garage .hero-panel::before{display:none}}`,
  construction: `
.d-construction{background-image:linear-gradient(rgba(0,0,0,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.045) 1px,transparent 1px);background-size:56px 56px}
.d-construction .hero-split{padding:72px 0 0}
.d-construction .hero-split h1{font-size:calc(var(--hs)*clamp(46px,7vw,100px))}
.d-construction .hero-split .hero-media img{border-radius:0;box-shadow:none;aspect-ratio:1/1.08}
.d-construction .hero-split .hero-media::before{content:"";position:absolute;left:-18px;top:-18px;width:120px;height:120px;background:var(--accent);z-index:-1}
.d-construction .hero-split .hero-media{isolation:isolate}
.d-construction .hero-split::after{content:"";display:block;height:18px;margin-top:72px;background:${stripes("#171717", "#f5b301", 16)}}
.d-construction .badge-float{border-radius:0;border:0;background:var(--accent);color:#111}
.d-construction .badge-float .ic{background:#111;color:var(--accent);border-radius:0}
.d-construction .badge-float b,.d-construction .badge-float small{color:#111}
.d-construction .btn-primary,.d-construction .nav a.btn-primary{color:#111;text-transform:uppercase;letter-spacing:.06em;font-weight:700}
.d-construction .svc.v-tiles .svc-item{border:0;border-bottom:5px solid var(--accent)}
.d-construction .head-number .section-head::before{-webkit-text-stroke:0;color:var(--accent);background:#171717;padding:10px 12px 6px;font-size:calc(var(--hs)*34px)}
.d-construction .section.alt{background:color-mix(in srgb,var(--bg-alt) 92%,transparent)}
.d-construction .cta-sec.v-full::after{background:rgba(245,179,1,.94)}
.d-construction .cta-sec.v-full .cta-band h2,.d-construction .cta-sec.v-full .cta-band p{color:#111}
.d-construction .cta-sec.v-full .btn{background:#111;color:#fff}
.d-construction .ftr-word{color:var(--accent)}
.d-construction .step::before{color:#111;background:var(--accent);display:inline-block;padding:6px 10px 2px}`,
  cleaning: `
.d-cleaning .hero.hero-card{background:linear-gradient(160deg,var(--bg-alt),#e3f7f0)}
.d-cleaning .hero.hero-card::after{display:none}
.d-cleaning .hero.hero-card .hero-bg{inset:auto -6% -30% auto;width:56%;height:90%;opacity:.5;border-radius:50%;overflow:hidden}
.d-cleaning .hero.hero-card::before{content:"";position:absolute;left:0;right:0;bottom:-1px;height:56px;background:var(--bg);clip-path:ellipse(60% 100% at 50% 100%);z-index:1}
.d-cleaning .hero-card .hero-card{border:0;box-shadow:0 30px 80px -30px rgba(11,132,198,.55)}
.d-cleaning .svc-item{border:0;box-shadow:0 14px 40px -22px rgba(15,42,67,.35);text-align:center;align-items:center}
.d-cleaning .svc-item .ic{border-radius:50%;width:64px;height:64px;background:linear-gradient(135deg,#d9f0fb,#d8f7ea)}
.d-cleaning .step{border:0;background:var(--bg-alt);text-align:center}
.d-cleaning .cta-band{background:linear-gradient(120deg,var(--accent),#1aa7a0);color:#fff}
.d-cleaning .cta-band h2{color:#fff}
.d-cleaning .cta-band p{color:rgba(255,255,255,.9)}
.d-cleaning .cta-band .btn{background:#fff;color:var(--heading)}`,
  landscaping: `
.d-landscaping .hero-cinema{margin:14px;border-radius:40px 40px 180px 40px;min-height:min(86vh,820px)}
.d-landscaping .hero-cinema::after{background:linear-gradient(180deg,rgba(18,34,24,.2),rgba(18,34,24,.82))}
.d-landscaping .hero-cinema h1{font-weight:300}
.d-landscaping .about-media img{border-radius:200px 200px 28px 28px}
.d-landscaping .about.v-overlap .about-inset{border-radius:50%}
.d-landscaping .svc.v-tiles .svc-item{border:0;background:none}
.d-landscaping .svc.v-tiles .svc-img img{border-radius:28px 28px 120px 28px;aspect-ratio:4/4.4}
.d-landscaping .svc.v-tiles .svc-item:hover{box-shadow:none}
.d-landscaping .svc.v-tiles .svc-body{padding:24px 4px 0}
.d-landscaping .gallery.v-mosaic figure{border-radius:28px}
.d-landscaping .cta-sec.v-full{margin:0 14px;border-radius:180px 40px 40px 40px}
.d-landscaping .cta-sec.v-full::after{background:color-mix(in srgb,var(--primary) 82%,transparent)}
.d-landscaping .step{border:0;background:var(--surface);border-radius:28px 28px 80px 28px}
@media (max-width:640px){.d-landscaping .hero-cinema{margin:8px;border-radius:28px 28px 90px 28px}.d-landscaping .cta-sec.v-full{margin:0 8px;border-radius:90px 28px 28px 28px}}`,
  clinic: `
.d-clinic .hero-split{background:linear-gradient(160deg,var(--bg-alt),var(--bg) 60%)}
.d-clinic .hero-split .hero-media img{border-radius:200px 200px 34px 34px}
.d-clinic .svc-item{border:0;box-shadow:0 14px 40px -24px rgba(13,59,56,.4)}`,
  estate: `
.d-estate .hero-editorial h1{font-size:calc(var(--hs)*clamp(42px,7vw,104px))}
.d-estate .svc.v-rows h3{font-style:italic}
.d-estate .cta-sec.v-full::after{background:color-mix(in srgb,var(--primary) 90%,transparent)}
.d-estate .eyebrow,.d-estate .kicker{letter-spacing:.26em}`,
  studio: `
.d-studio .hero-centered{background:radial-gradient(60% 60% at 50% 0%,var(--soft-accent),transparent)}
.d-studio .hero-centered .hero-media img{border-radius:var(--r-lg) var(--r-lg) 0 0;box-shadow:var(--shadow-xl)}
.d-studio .cta-sec.v-card .cta-band{background:linear-gradient(135deg,var(--primary),var(--accent));border:0}
.d-studio .cta-sec.v-card .cta-band h2{color:#fff}
.d-studio .cta-sec.v-card .cta-band p{color:rgba(255,255,255,.86)}
.d-studio .cta-sec.v-card .btn{background:#fff;color:var(--heading)}`,
  "local-service": `
.d-local-service .util{background:var(--primary);color:#fff}
.d-local-service .hero.hero-card::after{background:linear-gradient(90deg,var(--bg) 34%,color-mix(in srgb,var(--bg) 40%,transparent))}
.d-local-service .hero.hero-card .hero-bg{opacity:.55}
.d-local-service .svc-item{border-top:4px solid var(--primary)}
.d-local-service .cta-band{background:var(--primary)}`,
};

export function siteCss(designKey: string) {
  return BASE + (SKINS[designKey] ?? "");
}
