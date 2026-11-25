/** Fonts are self-hosted (no third-party requests; GDPR-friendly). */
export function fontFaces(assetBase: string) {
  const faces: string[] = [];
  for (const family of ["Poppins", "Inter"]) {
    for (const w of [400, 500, 600, 700]) {
      faces.push(
        `@font-face{font-family:"${family}";font-style:normal;font-weight:${w};font-display:swap;src:url("${assetBase}fonts/${family.toLowerCase()}-latin-${w}-normal.woff2") format("woff2")}`,
      );
    }
  }
  return faces.join("");
}

export const SITE_CSS = `
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:88px}
body{margin:0;font-family:var(--font-body);font-size:17px;line-height:1.65;color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden}
img,svg{display:block;max-width:100%}
img{height:auto}
a{color:inherit}
h1,h2,h3,h4{font-family:var(--font-heading);line-height:1.12;letter-spacing:-0.02em;margin:0;color:var(--heading);font-weight:var(--heading-weight)}
p{margin:0}
.wrap{width:100%;max-width:1180px;margin:0 auto;padding:0 24px}
.skip{position:absolute;left:-9999px;top:8px;z-index:200;background:var(--accent);color:var(--on-accent);padding:10px 16px;border-radius:var(--r-sm)}
.skip:focus{left:16px}
:focus-visible{outline:3px solid var(--accent);outline-offset:3px}

/* Demonstration notice — always visible, never removable */
.demo-bar{position:relative;z-index:60;background:#111;color:#f5f5f5;font:500 12.5px/1.4 var(--font-body);text-align:center;padding:8px 16px;letter-spacing:.01em}
.demo-bar strong{color:#fff}

/* Header */
.hdr{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:saturate(1.6) blur(14px);-webkit-backdrop-filter:saturate(1.6) blur(14px);border-bottom:1px solid var(--line)}
.hdr .wrap{display:flex;align-items:center;justify-content:space-between;height:72px;gap:24px}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;font-family:var(--font-heading);font-weight:700;font-size:19px;letter-spacing:-0.02em;color:var(--heading);min-width:0}
.brand-mark{width:38px;height:38px;border-radius:var(--r-sm);display:grid;place-items:center;background:linear-gradient(135deg,var(--accent),var(--primary));color:var(--on-accent);font-size:16px;flex:none;box-shadow:0 6px 18px -6px var(--accent)}
.brand span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nav{display:flex;align-items:center;gap:6px}
.nav a{white-space:nowrap;text-decoration:none;font-size:15px;font-weight:500;color:var(--muted);padding:8px 12px;border-radius:var(--r-sm);transition:color .2s,background .2s}
.nav a:hover{color:var(--heading);background:var(--soft)}
.nav .btn{margin-left:8px;color:var(--on-accent)}
.nav .btn:hover{color:var(--on-accent);background:var(--accent-strong)}
.menu-toggle{display:none}
.menu-btn{display:none;width:44px;height:44px;border-radius:var(--r-sm);border:1px solid var(--line);background:var(--surface);align-items:center;justify-content:center;cursor:pointer;color:var(--heading)}
.menu-btn svg{width:22px;height:22px}

/* Buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:50px;padding:0 26px;border-radius:var(--r-btn);font:600 15.5px/1 var(--font-body);text-decoration:none;border:1px solid transparent;cursor:pointer;transition:transform .2s cubic-bezier(.2,.7,.3,1),box-shadow .25s,background .2s,border-color .2s;white-space:nowrap}
.btn svg{width:18px;height:18px}
.btn-primary{background:var(--accent);color:var(--on-accent);box-shadow:0 10px 30px -10px var(--accent)}
.btn-primary:hover{transform:translateY(-2px);background:var(--accent-strong);box-shadow:0 18px 40px -14px var(--accent)}
.btn-ghost{background:color-mix(in srgb,var(--surface) 70%,transparent);color:var(--heading);border-color:var(--line-strong)}
.btn-ghost:hover{transform:translateY(-2px);border-color:var(--accent)}
.on-image .btn-ghost{background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.35)}

/* Hero */
.hero{position:relative;padding:96px 0 104px;overflow:hidden}
.hero-glow{position:absolute;inset:-20% -10% auto auto;width:720px;height:720px;border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 28%,transparent),transparent);filter:blur(20px);pointer-events:none}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:64px;align-items:center;position:relative}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--accent-text);margin-bottom:22px}
.eyebrow::before{content:"";width:28px;height:2px;background:var(--accent);border-radius:2px}
.hero h1{font-size:clamp(40px,5.6vw,68px)}
.hero .lead{margin-top:22px;font-size:clamp(17px,1.6vw,20px);color:var(--muted);max-width:560px}
.hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:36px}
.hero-meta{display:flex;flex-wrap:wrap;gap:22px;margin-top:40px;font-size:14.5px;color:var(--muted)}
.hero-meta span{display:inline-flex;align-items:center;gap:8px}
.hero-meta svg{width:17px;height:17px;color:var(--accent-text)}
.hero-media{position:relative}
.hero-media img{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:var(--r-lg);box-shadow:var(--shadow-xl)}
.hero-media .badge-float{position:absolute;left:-28px;bottom:36px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);padding:16px 20px;box-shadow:var(--shadow-lg);display:flex;gap:14px;align-items:center;max-width:280px}
.badge-float .ic{width:42px;height:42px;border-radius:var(--r-sm);background:var(--soft-accent);color:var(--accent-text);display:grid;place-items:center;flex:none}
.badge-float .ic svg{width:20px;height:20px}
.badge-float b{display:block;font-size:15px;color:var(--heading)}
.badge-float small{display:block;font-size:13px;color:var(--muted);line-height:1.4}
.hero.fullbleed{padding:150px 0 140px;color:#fff;isolation:isolate}
.hero.fullbleed .hero-bg{position:absolute;inset:0;z-index:-2}
.hero.fullbleed .hero-bg img{width:100%;height:100%;object-fit:cover}
.hero.fullbleed::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.65)),linear-gradient(90deg,rgba(0,0,0,.55),transparent 70%)}
.hero.fullbleed h1{color:#fff;max-width:820px}
.hero.fullbleed .lead{color:rgba(255,255,255,.82)}
.hero.fullbleed .eyebrow{color:var(--accent)}
.hero.fullbleed .hero-meta{color:rgba(255,255,255,.8)}
.hero.fullbleed .hero-meta svg{color:var(--accent)}
.hero.centered{text-align:center;padding:120px 0 96px}
.hero.centered .lead{margin-left:auto;margin-right:auto}
.hero.centered .hero-actions,.hero.centered .hero-meta{justify-content:center}
.hero.centered .eyebrow::before{display:none}
.hero.centered .hero-media{max-width:980px;margin:72px auto 0}
.hero.centered .hero-media img{aspect-ratio:16/7.5}

/* Sections */
.section{padding:112px 0;position:relative}
.section.alt{background:var(--bg-alt)}
.section-head{max-width:680px;margin-bottom:56px}
.section-head.center{margin-left:auto;margin-right:auto;text-align:center}
.section-head h2{font-size:clamp(30px,3.6vw,46px)}
.section-head p{margin-top:16px;font-size:18px;color:var(--muted)}
.kicker{display:block;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--accent-text);margin-bottom:14px}

.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
.about-media img{width:100%;aspect-ratio:5/4.6;object-fit:cover;border-radius:var(--r-lg);box-shadow:var(--shadow-lg)}
.about-copy p+p{margin-top:16px}
.about-copy p{color:var(--muted);font-size:17.5px}
.highlights{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:32px;padding:0;list-style:none}
.highlights li{display:flex;gap:10px;align-items:flex-start;font-weight:500;color:var(--heading);font-size:15.5px}
.highlights svg{width:20px;height:20px;color:var(--accent-text);flex:none;margin-top:2px}

.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.card{position:relative;background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);padding:32px;transition:transform .35s cubic-bezier(.2,.7,.3,1),box-shadow .35s,border-color .35s;overflow:hidden}
.card::before{content:"";position:absolute;inset:0 0 auto;height:3px;background:linear-gradient(90deg,var(--accent),transparent);opacity:0;transition:opacity .35s}
.card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg);border-color:color-mix(in srgb,var(--accent) 40%,var(--line))}
.card:hover::before{opacity:1}
.card .ic{width:52px;height:52px;border-radius:var(--r-sm);background:var(--soft-accent);color:var(--accent-text);display:grid;place-items:center;margin-bottom:22px}
.card .ic svg{width:24px;height:24px}
.card h3{font-size:20px;margin-bottom:10px}
.card p{color:var(--muted);font-size:16px}

.features{display:grid;grid-template-columns:repeat(3,1fr);gap:48px 40px}
.feature{display:flex;gap:18px}
.feature .ic{width:48px;height:48px;flex:none;border-radius:50%;background:var(--soft-accent);color:var(--accent-text);display:grid;place-items:center}
.feature .ic svg{width:22px;height:22px}
.feature h3{font-size:18px;margin-bottom:6px}
.feature p{color:var(--muted);font-size:15.5px}

.menu-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:28px 56px}
.menu-cat h3{font-size:22px;padding-bottom:14px;margin-bottom:8px;border-bottom:1px solid var(--line-strong);color:var(--accent-text)}
.menu-item{padding:14px 0;border-bottom:1px dashed var(--line)}
.menu-item b{display:block;font-family:var(--font-heading);font-weight:600;font-size:17px;color:var(--heading)}
.menu-item span{display:block;color:var(--muted);font-size:15px;margin-top:2px}
.menu-note{margin-top:36px;color:var(--muted);font-size:15px;text-align:center;font-style:italic}

.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:22px;counter-reset:step}
.step{position:relative;padding:32px 28px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md)}
.step::before{counter-increment:step;content:"0" counter(step);display:block;font-family:var(--font-heading);font-weight:700;font-size:40px;line-height:1;color:transparent;-webkit-text-stroke:1.5px var(--accent);margin-bottom:18px}
.step h3{font-size:19px;margin-bottom:8px}
.step p{color:var(--muted);font-size:15.5px}

.gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.gallery img{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:var(--r-md);transition:transform .5s cubic-bezier(.2,.7,.3,1)}
.gallery figure{margin:0;overflow:hidden;border-radius:var(--r-md)}
.gallery figure:hover img{transform:scale(1.05)}
.gallery figure:first-child{grid-row:span 2}
.gallery figure:first-child img{aspect-ratio:auto;height:100%}

.hours-card{max-width:720px;margin:0 auto;background:var(--surface);border:1px solid var(--line);border-radius:var(--r-lg);padding:40px 44px;box-shadow:var(--shadow-md)}
.hours-list{list-style:none;margin:0;padding:0}
.hours-list li{display:flex;justify-content:space-between;gap:16px;padding:14px 0;border-bottom:1px solid var(--line);font-size:16.5px}
.hours-list li:last-child{border-bottom:0}
.hours-list li span:first-child{font-weight:600;color:var(--heading)}
.hours-list li span:last-child{color:var(--muted);text-align:right}
.hours-note{margin-top:20px;font-size:14.5px;color:var(--muted);text-align:center}

.faq{max-width:820px;margin:0 auto}
.faq details{border-bottom:1px solid var(--line);padding:6px 0}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px 0;font-family:var(--font-heading);font-weight:600;font-size:18.5px;color:var(--heading)}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";font-size:26px;font-weight:400;color:var(--accent-text);transition:transform .3s}
.faq details[open] summary::after{transform:rotate(45deg)}
.faq details p{padding:0 0 22px;color:var(--muted)}

.cta-band{position:relative;overflow:hidden;border-radius:var(--r-lg);padding:72px 64px;background:linear-gradient(135deg,var(--primary),color-mix(in srgb,var(--primary) 55%,var(--accent)));color:#fff;display:flex;align-items:center;justify-content:space-between;gap:40px}
.cta-band::after{content:"";position:absolute;right:-120px;top:-120px;width:380px;height:380px;border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 55%,transparent),transparent)}
.cta-band h2{color:#fff;font-size:clamp(28px,3.2vw,40px);max-width:620px;position:relative}
.cta-band p{color:rgba(255,255,255,.82);margin-top:12px;max-width:560px;position:relative}
.cta-band .btn{position:relative;flex:none;background:#fff;color:#111;box-shadow:none}
.cta-band .btn:hover{background:#f1f1f1}

.contact-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:start}
.contact-list{list-style:none;margin:32px 0 0;padding:0;display:grid;gap:18px}
.contact-list li{display:flex;gap:16px;align-items:flex-start}
.contact-list .ic{width:46px;height:46px;border-radius:var(--r-sm);background:var(--soft-accent);color:var(--accent-text);display:grid;place-items:center;flex:none}
.contact-list .ic svg{width:20px;height:20px}
.contact-list small{display:block;font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;font-weight:600}
.contact-list a,.contact-list span{font-size:17px;font-weight:500;color:var(--heading);text-decoration:none;overflow-wrap:anywhere}
.contact-list a:hover{color:var(--accent-text)}
.form{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-lg);padding:36px;box-shadow:var(--shadow-md);display:grid;gap:18px}
.form .row{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.form label{display:block;font-size:14px;font-weight:600;color:var(--heading);margin-bottom:8px}
.form input,.form textarea{width:100%;min-height:50px;border:1px solid var(--line-strong);border-radius:var(--r-sm);background:var(--bg);color:var(--text);padding:12px 16px;font:inherit;font-size:16px;transition:border-color .2s,box-shadow .2s}
.form textarea{min-height:140px;resize:vertical}
.form input:focus,.form textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 22%,transparent)}
.form-note{font-size:13.5px;color:var(--muted)}
.form-status{display:none;padding:14px 16px;border-radius:var(--r-sm);background:var(--soft-accent);color:var(--heading);font-size:15px}
.form-status.show{display:block}
.map-link{display:inline-flex;margin-top:28px}

/* Footer */
.ftr{background:var(--footer-bg);color:var(--footer-text);padding:72px 0 36px;margin-top:0}
.ftr-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:48px}
.ftr .brand{color:#fff}
.ftr p{margin-top:16px;font-size:15px;max-width:360px;color:var(--footer-text)}
.ftr .ftr-h{color:#fff;font-size:14px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:16px;font-weight:600}
.ftr ul{list-style:none;margin:0;padding:0;display:grid;gap:10px;font-size:15px}
.ftr a{text-decoration:none;color:var(--footer-text)}
.ftr a:hover{color:#fff}
.ftr-bottom{margin-top:56px;padding-top:24px;border-top:1px solid rgba(255,255,255,.1);display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;font-size:13.5px}

/* Reveal animations (progressive enhancement) */
.js .reveal{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.3,1),transform .8s cubic-bezier(.2,.7,.3,1)}
.js .reveal.in{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.js .reveal{opacity:1;transform:none;transition:none}*{transition-duration:.01ms!important;animation-duration:.01ms!important}}

/* Template personalities */
.t-restaurant{--heading-weight:600}
.t-restaurant .hero h1{letter-spacing:-0.03em}
.t-restaurant .card{background:color-mix(in srgb,var(--surface) 92%,var(--accent))}
.t-construction{--heading-weight:700}
.t-construction h1,.t-construction h2{text-transform:uppercase;letter-spacing:-0.01em}
.t-construction .hero h1,.t-automotive .hero h1{font-size:clamp(34px,4.4vw,56px)}
.t-construction .card::before{height:4px;background:var(--accent);opacity:1}
.t-construction .eyebrow::before{height:4px;width:36px}
.t-automotive{--heading-weight:700}
.t-automotive h1,.t-automotive h2{text-transform:uppercase;font-style:italic;letter-spacing:-0.02em}
.t-automotive .card{clip-path:polygon(0 0,100% 0,100% calc(100% - 22px),calc(100% - 22px) 100%,0 100%)}
.t-beauty{--heading-weight:500}
.t-beauty .section-head,.t-beauty .hero{text-align:center}
.t-beauty .section-head{margin-left:auto;margin-right:auto}
.t-beauty .card{text-align:center}
.t-beauty .card .ic{margin-left:auto;margin-right:auto;border-radius:50%}
.t-realestate{--heading-weight:600}
.t-realestate .card{border-width:0 0 0 3px;border-color:var(--accent);border-radius:0;box-shadow:var(--shadow-md)}
.t-realestate .kicker,.t-realestate .eyebrow{letter-spacing:.22em}
.t-dental .card{border-radius:var(--r-lg)}
.t-corporate .hero{background:radial-gradient(60% 60% at 50% 0%,var(--soft-accent),transparent)}
.t-service .feature .ic{border-radius:var(--r-sm)}

/* Responsive */
@media (max-width:1024px){
  .hero-grid,.about-grid,.contact-grid{grid-template-columns:1fr;gap:48px}
  .cards,.features{grid-template-columns:repeat(2,1fr)}
  .hero-media .badge-float{left:16px}
  .ftr-grid{grid-template-columns:1fr 1fr}
}
@media (max-width:1080px){
  .menu-btn{display:inline-flex}
  .nav{position:absolute;top:72px;left:0;right:0;flex-direction:column;align-items:stretch;gap:2px;padding:12px 16px 20px;background:var(--bg);border-bottom:1px solid var(--line);box-shadow:var(--shadow-lg);display:none}
  .nav a{padding:14px 12px;font-size:17px}
  .nav .btn{margin:8px 0 0}
  .menu-toggle:checked~.nav{display:flex}
}
@media (max-width:820px){
  .section{padding:80px 0}
  .hero{padding:64px 0 80px}
  .hero.fullbleed{padding:110px 0 100px}
  .cta-band{flex-direction:column;align-items:flex-start;padding:48px 32px}
  .menu-grid{grid-template-columns:1fr}
}
@media (max-width:640px){
  body{font-size:16px}
  .wrap{padding:0 20px}
  .cards,.features,.highlights,.form .row,.ftr-grid{grid-template-columns:1fr}
  .gallery{grid-template-columns:1fr 1fr}
  .gallery figure:first-child{grid-row:auto;grid-column:span 2}
  .hours-card{padding:28px 22px}
  .form{padding:24px}
  .hero-actions .btn{width:100%}
  .hero-media .badge-float{position:relative;left:auto;bottom:auto;margin:-36px 16px 0;max-width:none}
}
`;
