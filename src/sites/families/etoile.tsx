import { NowBadge, TODAY_JS } from "./today";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Étoile: an original template (no portfolio demo). Gastronomy as an evening in acts:
 * charcoal and ivory chapters, warm gold hairlines, a thin high-contrast display face
 * (Italiana) with an italic counter-voice (Fraunces) and quiet tracked capitals (Manrope).
 * The opening slits a full-screen photograph open from a single gold line while the headline
 * gathers letter by letter from its centre; on scroll the picture settles into a frame. The
 * signature is the tasting menu as a course timeline: a sticky frame swaps the photograph of
 * each course while a gold thread fills along the courses. A reservation tab stays in reach
 * on every screen, the gallery opens in a lightbox and the menu opens over the full screen.
 * Made for fine dining, chef's tables, wine restaurants and other places where the evening
 * itself is the product.
 */

const CSS = `
.d-etoile{--char:#121110;--char2:#1a1816;--char3:#25221e;--ivory:#f2ecdf;--ivory2:#e7dfcd;--paper:#fbf8f1;--ink:#1b1915;--gold:#c6a46a;--gold2:#e2c793;--gold-d:#87672f;--mist:#a8a091;--dimi:#5e574c;--lineD:rgba(242,236,223,.14);--lineI:rgba(27,25,21,.15);--pad:clamp(20px,5vw,72px);--ease:cubic-bezier(.22,.8,.18,1);--slow:cubic-bezier(.7,0,.2,1);--disp:"Italiana",Georgia,serif;--ital:"Fraunces",Georgia,serif;--z-bg2:var(--char2);--z-ink:var(--ivory);--z-dim:var(--mist);--z-line:var(--lineD);--z-accent:var(--gold);--z-on-accent:var(--ink);--z-display:var(--disp);--z-display-weight:400;--z-radius:0px;--z-field-radius:0px;--z-ico-radius:50%;--z-sec:clamp(88px,11vw,180px);--z-h3:clamp(24px,2.2vw,34px);--z-statement:clamp(32px,4.6vw,72px);background:var(--char);color:var(--ivory);font-family:"Manrope",system-ui,sans-serif;font-size:clamp(15.5px,1.02vw,17.5px);line-height:1.7;font-weight:400}
.d-etoile h1,.d-etoile h2{overflow-wrap:break-word}
@media (max-width:600px){.d-etoile h1,.d-etoile h2{hyphens:auto}}
.d-etoile h1,.d-etoile h2,.d-etoile h3{font-family:var(--disp);font-weight:400;line-height:1.02;letter-spacing:.005em}
.d-etoile h2{font-size:clamp(40px,5.6vw,92px)}
.d-etoile h2.is-long{font-size:clamp(32px,3.9vw,60px);line-height:1.08}
.d-etoile h1 em,.d-etoile h2 em,.d-etoile h3 em{font-family:var(--ital);font-style:italic;font-weight:300;font-variation-settings:"opsz" 144;letter-spacing:-.02em;color:var(--gold)}
.d-etoile .et-iv h2 em,.d-etoile .et-iv h3 em{color:var(--gold-d)}
.d-etoile ::selection{background:var(--gold);color:var(--ink)}
.d-etoile .et-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.d-etoile .et-wrap{position:relative;width:min(100%,1400px);margin-inline:auto;padding-inline:var(--pad)}
.d-etoile .et-star{display:inline-block;width:14px;height:14px;flex:none;color:var(--gold)}
.d-etoile .et-iv .et-star{color:var(--gold-d)}
.d-etoile .et-kick{display:inline-flex;align-items:center;gap:14px;font-size:11.5px;font-weight:600;letter-spacing:.32em;text-transform:uppercase;color:var(--gold)}
.d-etoile .et-iv .et-kick{color:var(--gold-d)}
.d-etoile .et-kick .et-star{width:11px;height:11px}
.d-etoile .et-kick::after{content:"";width:38px;height:1px;background:currentColor;opacity:.6}
.d-etoile .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:56px;padding:0 34px;border:1px solid var(--gold);font-size:12px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;overflow:hidden;isolation:isolate;transition:color .5s var(--ease),border-color .5s,transform .5s var(--ease)}
.d-etoile .btn::before{content:"";position:absolute;inset:0;z-index:-1;transform:scaleX(0);transform-origin:100% 50%;transition:transform .7s var(--slow)}
.d-etoile .btn:hover::before{transform:scaleX(1);transform-origin:0 50%}
.d-etoile .et-fill{background:var(--gold);color:var(--ink)}
.d-etoile .et-fill::before{background:var(--ivory)}
.d-etoile .et-iv .et-fill::before{background:var(--ink)}
.d-etoile .et-iv .et-fill:hover{color:var(--ivory);border-color:var(--ink)}
.d-etoile .et-line{color:var(--ivory)}
.d-etoile .et-line::before{background:var(--gold)}
.d-etoile .et-line:hover{color:var(--ink)}
.d-etoile .et-iv .et-line{color:var(--ink);border-color:var(--gold-d)}
.d-etoile .et-text{position:relative;display:inline-flex;align-items:center;gap:12px;min-height:48px;font-size:12px;font-weight:600;letter-spacing:.24em;text-transform:uppercase}
.d-etoile .et-text::after{content:"";position:absolute;left:0;right:0;bottom:10px;height:1px;background:currentColor;transform-origin:0 50%;transition:transform .6s var(--slow)}
.d-etoile .et-text:hover::after{transform:scaleX(.35)}
.d-etoile .et-arrow{width:26px;height:10px;flex:none;transition:transform .5s var(--ease)}
.d-etoile .btn:hover .et-arrow,.d-etoile .et-text:hover .et-arrow{transform:translateX(5px)}

.d-etoile .et-hdr{position:fixed;inset:0 0 auto;z-index:70;transition:background-color .6s,border-color .6s,backdrop-filter .6s;border-bottom:1px solid transparent}
.d-etoile.is-scrolled .et-hdr{background:rgba(18,17,16,.82);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);border-color:var(--lineD)}
.d-etoile .et-bar{position:relative;display:flex;align-items:center;justify-content:space-between;gap:16px;height:84px;padding-inline:var(--pad);transition:height .5s var(--ease)}
.d-etoile.is-scrolled .et-bar{height:68px}
.d-etoile .et-mark{display:inline-flex;align-items:center;gap:12px;min-width:0;min-height:44px;font-family:var(--disp);font-size:clamp(22px,2vw,28px);line-height:1;letter-spacing:.06em}
.d-etoile .et-mark span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-etoile .et-mark .et-star{width:16px;height:16px;transition:transform 1.2s var(--ease)}
.d-etoile .et-mark:hover .et-star{transform:rotate(180deg)}
.d-etoile .et-nav{display:none;gap:clamp(20px,2.4vw,40px);font-size:11.5px;font-weight:600;letter-spacing:.26em;text-transform:uppercase}
.d-etoile .et-nav a{position:relative;display:inline-flex;align-items:center;min-height:44px;color:rgba(242,236,223,.82);transition:color .4s}
.d-etoile .et-nav a::after{content:"";position:absolute;left:50%;bottom:8px;width:4px;height:4px;border-radius:50%;background:var(--gold);transform:translateX(-50%) scale(0);transition:transform .4s var(--ease)}
.d-etoile .et-nav a:hover{color:var(--ivory)}
.d-etoile .et-nav a:hover::after{transform:translateX(-50%) scale(1)}
.d-etoile .et-bar-r{display:flex;align-items:center;gap:clamp(10px,2vw,36px)}
.d-etoile .et-top-rsv{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border:1px solid var(--gold);font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);transition:background-color .4s,color .4s}
.d-etoile .et-top-rsv:hover{background:var(--gold);color:var(--ink)}
.d-etoile .et-burger{position:relative;z-index:62;display:inline-flex;align-items:center;gap:12px;min-height:44px;min-width:44px;padding:0 0 0 4px;border:0;background:none;font-size:11px;font-weight:600;letter-spacing:.24em;text-transform:uppercase}
.d-etoile .et-burger i{position:relative;width:26px;height:9px}
.d-etoile .et-burger i::before,.d-etoile .et-burger i::after{content:"";position:absolute;right:0;height:1px;background:currentColor;transition:transform .6s var(--ease),width .6s var(--ease),top .6s var(--ease)}
.d-etoile .et-burger i::before{top:0;width:26px}
.d-etoile .et-burger i::after{top:8px;width:16px}
.d-etoile .et-burger:hover i::after{width:26px}
.d-etoile.menu-open .et-burger i::before{top:4px;transform:rotate(45deg)}
.d-etoile.menu-open .et-burger i::after{top:4px;width:26px;transform:rotate(-45deg)}
@media (max-width:520px){.d-etoile .et-burger [data-label]{display:none}.d-etoile .et-top-rsv{padding:0 10px;font-size:10px;letter-spacing:.14em}.d-etoile .et-mark{font-size:19px;letter-spacing:.02em;gap:8px}.d-etoile .et-mark .et-star{width:12px;height:12px}.d-etoile .et-bar{gap:10px}.d-etoile .et-bar-r{gap:6px}}
@media (max-width:380px){.d-etoile .et-mark .et-star{display:none}.d-etoile .et-mark{font-size:18px}}
@media (min-width:1100px){.d-etoile .et-nav{display:flex}.d-etoile .et-mark{position:absolute;left:50%;transform:translateX(-50%)}.d-etoile .et-burger{display:none}.d-etoile .et-bar{justify-content:space-between}}
.d-etoile.menu-open .et-hdr{background:transparent;border-color:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-etoile.menu-open .et-top-rsv{opacity:0;pointer-events:none}

.d-etoile .et-menu{position:fixed;inset:0;z-index:65;display:grid;grid-template-rows:auto minmax(0,1fr);background:var(--char);visibility:hidden;clip-path:inset(0 0 100% 0);transition:clip-path 1s var(--slow),visibility 0s 1s}
.d-etoile .et-menu.is-open{visibility:visible;clip-path:inset(0);transition:clip-path 1s var(--slow)}
@media (min-width:900px){.d-etoile .et-menu{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);grid-template-rows:none}}
.d-etoile .et-menu-pic{position:relative;height:30svh;overflow:hidden;clip-path:inset(0 0 100% 0);transition:clip-path 1.2s var(--slow) .25s}
.d-etoile .et-menu.is-open .et-menu-pic{clip-path:inset(0)}
@media (min-width:900px){.d-etoile .et-menu-pic{height:auto}}
.d-etoile .et-menu-pic img{width:100%;height:100%;object-fit:cover;transform:scale(1.25);transition:transform 1.8s var(--ease)}
.d-etoile .et-menu.is-open .et-menu-pic img{transform:scale(1.02)}
.d-etoile .et-menu-pic::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(18,17,16,.55),rgba(18,17,16,0) 40%,var(--char))}
@media (min-width:900px){.d-etoile .et-menu-pic::after{background:linear-gradient(90deg,rgba(18,17,16,0) 60%,var(--char))}}
.d-etoile .et-menu-pic .et-orn{position:absolute;inset:12%;width:auto;height:auto}
.d-etoile .et-menu-in{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:36px;min-height:0;padding:12px var(--pad) 96px;overflow-y:auto}
@media (min-width:900px){.d-etoile .et-menu-in{padding-top:120px}}
.d-etoile .et-menu-in::before{content:"";position:absolute;right:-18%;bottom:-10%;width:70%;aspect-ratio:1;background:var(--gold);opacity:.05;clip-path:polygon(50% 0,56% 44%,100% 50%,56% 56%,50% 100%,44% 56%,0 50%,44% 44%);pointer-events:none}
.d-etoile .et-menu nav{display:grid;gap:2px;counter-reset:m}
.d-etoile .et-menu nav a{display:flex;align-items:baseline;gap:22px;padding:6px 0;border-bottom:1px solid var(--lineD);font-family:var(--disp);font-size:clamp(36px,8.6vw,84px);line-height:1.08}
.d-etoile .et-menu nav a>small{width:2.6em;flex:none}
.d-etoile .et-menu nav a>small,.d-etoile .et-menu nav a>b{font-family:"Manrope",sans-serif;font-size:11px;font-weight:600;letter-spacing:.3em;color:var(--gold);opacity:0;transition:opacity .6s}
.d-etoile .et-menu nav a>b{margin-left:auto;font-size:18px;letter-spacing:0;transform:translateX(-10px);transition:opacity .4s,transform .5s var(--ease)}
.d-etoile .et-menu nav a .et-mask{display:block;overflow:hidden;padding-bottom:.06em}
.d-etoile .et-menu nav a .et-mask>span{display:block;transform:translateY(105%);transition:transform 1s var(--ease);transition-delay:calc(.35s + var(--i,0) * 70ms)}
.d-etoile .et-menu.is-open nav a .et-mask>span{transform:none}
.d-etoile .et-menu.is-open nav a>small{opacity:1;transition-delay:calc(.5s + var(--i,0) * 70ms)}
.d-etoile .et-menu nav a:hover{color:var(--gold2)}
.d-etoile .et-menu nav a:hover>b{opacity:1;transform:none}
.d-etoile .et-menu-foot{display:grid;gap:18px;font-size:14px;color:var(--mist);opacity:0;transform:translateY(16px);transition:opacity .8s,transform .8s var(--ease)}
.d-etoile .et-menu.is-open .et-menu-foot{opacity:1;transform:none;transition-delay:.8s}
.d-etoile .et-menu-foot a{color:var(--ivory)}
.d-etoile .et-menu-foot .btn{justify-self:start}

.d-etoile .et-rsv{position:fixed;right:0;top:50%;z-index:55;display:none;align-items:center;gap:14px;padding:22px 13px;background:var(--gold);color:var(--ink);font-size:11px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;writing-mode:vertical-rl;transform:translate(110%,-50%) rotate(180deg);transition:transform .8s var(--ease),background-color .4s}
.d-etoile .et-rsv .et-star{width:12px;height:12px;color:var(--ink);transition:transform .8s var(--ease)}
.d-etoile .et-rsv:hover{background:var(--ivory)}
.d-etoile .et-rsv:hover .et-star{transform:rotate(90deg)}
.d-etoile .et-rsv.is-show{transform:translate(0,-50%) rotate(180deg)}
@media (min-width:900px){.d-etoile .et-rsv{display:inline-flex}}
.d-etoile.menu-open .et-rsv{transform:translate(110%,-50%) rotate(180deg)}

.d-etoile .et-hero{position:relative;background:var(--char)}
.d-etoile .et-hero-stick{position:relative;height:100svh;min-height:600px;overflow:hidden;display:grid;align-items:center}
@media (min-width:900px){.d-etoile .et-hero.has-pic{height:150svh}.d-etoile .et-hero.has-pic .et-hero-stick{position:sticky;top:0}}
.d-etoile .et-hero-media{position:absolute;inset:0;clip-path:inset(calc(var(--hp,0) * 9vh) calc(var(--hp,0) * 9vw))}
.d-etoile .et-hero-media>div{position:absolute;inset:0;animation:et-slit 1.9s var(--slow) .45s both}
.d-etoile .et-hero-media img{width:100%;height:100%;object-fit:cover;transform:scale(calc(1.08 + var(--hp,0) * .08));animation:et-settle 3.2s var(--ease) .45s both}
.d-etoile .et-hero-shade{position:absolute;inset:0;background:radial-gradient(120% 80% at 50% 45%,rgba(18,17,16,.18),rgba(18,17,16,.72) 70%),linear-gradient(180deg,rgba(18,17,16,.55),rgba(18,17,16,0) 30%,rgba(18,17,16,0) 55%,rgba(18,17,16,.85));pointer-events:none}
.d-etoile .et-hero-line{position:absolute;left:0;right:0;top:50%;height:1px;background:var(--gold);transform:scaleX(0);animation:et-line 1.4s var(--slow) 0s both}
.d-etoile .et-hero-in{position:relative;z-index:2;display:grid;justify-items:center;gap:26px;padding:120px var(--pad) 150px;text-align:center;transform:translateY(calc(var(--hp,0) * -60px));opacity:calc(1 - var(--hp,0) * 1.4)}
.d-etoile .et-hero-eye{display:inline-flex;align-items:center;gap:16px;font-size:11.5px;font-weight:600;letter-spacing:.34em;text-transform:uppercase;color:var(--gold2)}
.d-etoile .et-hero-eye .et-star{width:12px;height:12px;animation:et-turn 1.6s var(--ease) .8s both}
.d-etoile .et-hero h1{max-width:15ch;font-size:clamp(50px,8.6vw,152px);line-height:.98;letter-spacing:0;text-wrap:balance}
.d-etoile .et-hero h1.is-m{max-width:20ch;font-size:clamp(42px,6.4vw,112px)}
.d-etoile .et-hero h1.is-s{max-width:20ch;font-size:clamp(36px,4.9vw,84px);line-height:1.04}
.d-etoile .et-hl{display:block}
.d-etoile .et-w{display:inline-block;white-space:nowrap}
.d-etoile .et-w i{display:inline-block;font-style:normal;animation:et-letter 1.3s var(--ease) both;animation-delay:calc(.9s + var(--d,0) * 34ms)}
.d-etoile .et-w.is-em{font-family:var(--ital);font-style:italic;font-weight:300;font-variation-settings:"opsz" 144;letter-spacing:-.03em;color:var(--gold2)}
.d-etoile .et-w.is-em i{font-style:italic}
.d-etoile .et-hero-sub{max-width:52ch;font-size:clamp(16px,1.2vw,19px);color:rgba(242,236,223,.86)}
.d-etoile .et-hero-cta{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:14px 30px}
.d-etoile .et-up{animation:et-up 1.2s var(--ease) both;animation-delay:calc(1.5s + var(--i,0) * 120ms)}
.d-etoile .et-hero-foot{position:absolute;left:0;right:0;bottom:0;z-index:2;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 32px;padding:22px var(--pad) 74px;border-top:1px solid var(--lineD);opacity:calc(1 - var(--hp,0) * 2)}
.d-etoile .et-facts{display:flex;flex-wrap:wrap;gap:8px 36px;font-size:13px}
.d-etoile .et-facts div{display:flex;gap:12px;align-items:baseline}
.d-etoile .et-facts dt{font-size:10.5px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--gold)}
.d-etoile .et-facts dd{margin:0;color:rgba(242,236,223,.9)}
.d-etoile .et-cue{display:inline-flex;align-items:center;gap:14px;font-size:10.5px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--mist)}
.d-etoile .et-cue i{position:relative;width:1px;height:38px;overflow:hidden;background:var(--lineD)}
.d-etoile .et-cue i::after{content:"";position:absolute;left:0;top:0;width:1px;height:40%;background:var(--gold);animation:et-drip 2.8s var(--slow) 2.4s infinite}
@media (max-width:620px){.d-etoile .et-cue{display:none}.d-etoile .et-hero-foot{justify-content:center;text-align:center;padding-bottom:84px}.d-etoile .et-facts{justify-content:center;gap:10px 22px}.d-etoile .et-facts div{flex-direction:column;align-items:center;gap:2px}.d-etoile .et-hero-in{padding-bottom:36px}.d-etoile .et-hero-stick{height:auto;min-height:100svh;display:flex;flex-direction:column;justify-content:flex-end}.d-etoile .et-hero-in{margin-top:auto}.d-etoile .et-hero-foot{position:relative;margin-top:auto}}
.d-etoile .et-now{display:inline-flex;align-items:center;gap:9px;font-size:10.5px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:var(--gold2)}
.d-etoile .et-now::before{content:"";width:7px;height:7px;border:1px solid currentColor;border-radius:50%}
.d-etoile .et-now.is-open::before{background:currentColor}
.d-etoile .et-iv .et-now{color:var(--gold-d)}
.d-etoile .et-hero.no-pic .et-hero-stick{background:radial-gradient(70% 60% at 50% 40%,#2a241b,var(--char) 70%)}
.d-etoile .et-orn{position:absolute;left:50%;top:50%;width:min(130vw,1100px);height:min(130vw,1100px);color:var(--gold);opacity:.22;transform:translate(-50%,-50%);pointer-events:none}
.d-etoile .et-orn svg{width:100%;height:100%;animation:et-spin 160s linear infinite}

.d-etoile .et-sec{position:relative;padding-block:var(--z-sec)}
.d-etoile .et-iv{background:var(--ivory);color:var(--ink);--z-ink:var(--ink);--z-dim:var(--dimi);--z-line:var(--lineI);--z-bg2:var(--paper);--z-accent:var(--gold-d)}
.d-etoile .et-iv+.et-iv{border-top:1px solid var(--lineI)}
.d-etoile .et-head{display:grid;justify-items:center;gap:22px;max-width:900px;margin:0 auto clamp(48px,6vw,96px);text-align:center}
.d-etoile .et-head.is-left{justify-items:start;margin-inline:0;text-align:left}
.d-etoile .et-intro{max-width:56ch;font-size:clamp(16px,1.15vw,19px);color:var(--mist)}
.d-etoile .et-iv .et-intro{color:var(--dimi)}
.d-etoile .et-head [data-rv]{transition-duration:1.2s}
.d-etoile .et-clip{display:block}
.demo-js .d-etoile .et-head h2[data-rv]{opacity:1;transform:none}
.demo-js .d-etoile .et-head h2[data-rv] .et-clip{clip-path:inset(0 0 100% 0);transform:translateY(.25em);transition:clip-path 1.4s var(--slow),transform 1.4s var(--slow)}
.demo-js .d-etoile .et-head h2[data-rv].in .et-clip{clip-path:inset(-10% -5% -25% -5%);transform:none}
.d-etoile .et-note{margin-top:clamp(36px,4vw,56px);font-size:13px;letter-spacing:.04em;color:var(--mist);text-align:center}
.d-etoile .et-iv .et-note{color:var(--dimi)}

.d-etoile .et-about-grid{display:grid;gap:clamp(56px,7vw,120px);align-items:center}
@media (min-width:960px){.d-etoile .et-about-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.d-etoile .et-about-grid.is-solo{grid-template-columns:minmax(0,1fr);max-width:980px}}
.d-etoile .et-about-art{position:relative;padding:0 14% 16% 0}
.d-etoile .et-about-a{position:relative;aspect-ratio:4/5;overflow:hidden}
.d-etoile .et-about-a img{width:100%;height:118%;object-fit:cover;transform:translateY(calc(var(--p,0) * -7%))}
.d-etoile .et-about-b{position:absolute;right:0;bottom:0;width:46%;aspect-ratio:3/4;overflow:hidden;border:10px solid var(--ivory)}
.d-etoile .et-about-b img{width:100%;height:100%;object-fit:cover}
.demo-js .d-etoile .et-about-art[data-rv]{opacity:1;transform:none}
.demo-js .d-etoile [data-rv] .et-reveal{clip-path:inset(100% 0 0 0);transition:clip-path 1.6s var(--slow);transition-delay:calc(var(--i,0) * 220ms)}
.demo-js .d-etoile .in .et-reveal{clip-path:inset(0)}
.demo-js .d-etoile [data-rv] .et-reveal img{scale:1.18;transition:scale 2.2s var(--ease);transition-delay:calc(var(--i,0) * 220ms)}
.demo-js .d-etoile .in .et-reveal img{scale:1}
.d-etoile .et-about-cap{position:absolute;left:-6px;bottom:22%;display:flex;align-items:center;gap:12px;padding:12px 18px;background:var(--ink);color:var(--ivory);font-size:10.5px;font-weight:600;letter-spacing:.28em;text-transform:uppercase}
.d-etoile .et-about-copy{display:grid;gap:24px}
.d-etoile .et-about-copy .et-head{margin-bottom:8px}
.d-etoile .et-lede{font-family:var(--ital);font-size:clamp(21px,1.9vw,29px);font-weight:300;line-height:1.45;font-variation-settings:"opsz" 72;color:var(--ink)}
.d-etoile .et-about-copy>p:not(.et-lede){max-width:58ch;color:var(--dimi)}
.d-etoile .et-hls{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:10px;padding-top:26px;border-top:1px solid var(--lineI)}
.d-etoile .et-hls li{display:inline-flex;align-items:center;gap:12px;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.d-etoile .et-hls .et-star{width:10px;height:10px}

.d-etoile .et-courses{position:relative;display:grid;gap:clamp(40px,6vw,110px)}
@media (min-width:900px){.d-etoile .et-courses{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)}}
.d-etoile .et-frame{display:none}
@media (min-width:900px){.d-etoile .et-frame{display:block}}
.d-etoile .et-frame-in{position:sticky;top:max(96px,12vh);height:min(76vh,760px);overflow:hidden;background:var(--char2)}
.d-etoile .et-fr{position:absolute;inset:0;clip-path:inset(100% 0 0 0);transition:clip-path 1.3s var(--slow)}
.d-etoile .et-fr img{width:100%;height:100%;object-fit:cover;transform:scale(1.14);transition:transform 2.4s var(--ease)}
.d-etoile .et-fr.is-on{clip-path:inset(0);z-index:1}
.d-etoile .et-fr.is-on img{transform:scale(1.02)}
.d-etoile .et-fr.was{clip-path:inset(0);z-index:0}
.d-etoile .et-frame-in::after{content:"";position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,rgba(18,17,16,0) 55%,rgba(18,17,16,.8));pointer-events:none}
.d-etoile .et-frame-in::before{content:"";position:absolute;inset:14px;z-index:3;border:1px solid rgba(226,199,147,.4);pointer-events:none}
.d-etoile .et-frame-cap{position:absolute;left:36px;right:36px;bottom:30px;z-index:4;display:flex;align-items:baseline;gap:14px}
.d-etoile .et-frame-cap b{font-family:var(--disp);font-size:clamp(64px,6vw,104px);font-weight:400;line-height:.8;color:var(--ivory)}
.d-etoile .et-frame-cap span{font-size:12px;font-weight:600;letter-spacing:.26em;color:var(--gold2)}
.d-etoile .et-frame-cap small{margin-left:auto;font-size:11px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--ivory);text-align:right}
.d-etoile .et-courses:not(.has-pics) .et-frame-in{display:grid;place-items:center;background:radial-gradient(80% 70% at 50% 40%,#2b251c,var(--char2))}
.d-etoile .et-courses:not(.has-pics) .et-frame-in::after{display:none}
.d-etoile .et-courses:not(.has-pics) .et-frame-cap{position:static;flex-direction:column;align-items:center;gap:18px;text-align:center}
.d-etoile .et-courses:not(.has-pics) .et-frame-cap b{font-size:clamp(110px,12vw,190px);color:var(--gold2)}
.d-etoile .et-courses:not(.has-pics) .et-frame-cap small{margin:0;text-align:center}
.d-etoile .et-frame-cap b,.d-etoile .et-frame-cap small{transition:opacity .4s}
.d-etoile .et-frame-cap.is-swap b,.d-etoile .et-frame-cap.is-swap small{opacity:0}
.d-etoile .et-tl{position:relative;display:grid;padding-left:clamp(36px,4vw,64px)}
.d-etoile .et-tl-line{position:absolute;left:8px;top:14px;bottom:14px;width:1px;background:var(--lineD)}
.d-etoile .et-tl-line i{position:absolute;inset:0;background:linear-gradient(180deg,var(--gold2),var(--gold));transform-origin:50% 0;transform:scaleY(var(--cp,0))}
.d-etoile .et-act{display:flex;align-items:center;gap:14px;margin:0 0 22px;padding-top:clamp(20px,3vw,40px);font-size:11px;font-weight:700;letter-spacing:.34em;text-transform:uppercase;color:var(--gold)}
.d-etoile .et-act::after{content:"";flex:1;height:1px;background:var(--lineD)}
.d-etoile .et-course{position:relative;padding:clamp(22px,2.6vw,36px) 0;border-bottom:1px solid var(--lineD);transition:opacity .7s}
.d-etoile .et-course:first-of-type .et-act{padding-top:0}
.d-etoile .et-dot{position:absolute;left:calc(-1 * clamp(36px,4vw,64px) + 2px);top:calc(clamp(22px,2.6vw,36px) + .55em);width:13px;height:13px;color:var(--mist);transition:color .6s,transform .9s var(--ease)}
.d-etoile .et-act+.et-course-pic+.et-dot,.d-etoile .et-act+.et-dot{top:auto;margin-top:.5em}
.d-etoile .et-course.is-on .et-dot{color:var(--gold2);transform:rotate(180deg) scale(1.4)}
.d-etoile .et-course-row{display:flex;align-items:baseline;gap:18px}
.d-etoile .et-course-row small{flex:none;width:3.2em;font-size:11px;font-weight:600;letter-spacing:.22em;color:var(--gold)}
.d-etoile .et-course h3{font-size:clamp(28px,2.6vw,42px);line-height:1.08;transition:color .6s,transform .9s var(--ease);transform-origin:0 50%}
.d-etoile .et-course-row b{margin-left:auto;padding-left:16px;font-weight:500;font-size:14px;letter-spacing:.06em;color:var(--gold2);white-space:nowrap}
.d-etoile .et-course>p{max-width:46ch;margin-top:10px;padding-left:calc(3.2em * 11 / 16 + 18px);font-size:.95em;color:var(--mist)}
.d-etoile .et-course .et-tags{display:flex;flex-wrap:wrap;gap:8px}
.d-etoile .et-course .et-tags span{padding:3px 10px;border:1px solid var(--lineD);font-size:10.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--gold2)}
@media (min-width:900px){.d-etoile .et-courses.is-live .et-course:not(.is-on){opacity:.42}.d-etoile .et-course.is-on h3{transform:translateX(6px)}}
.d-etoile .et-course-pic{margin:0 0 20px;aspect-ratio:16/11;overflow:hidden}
.d-etoile .et-course-pic img{width:100%;height:100%;object-fit:cover}
@media (min-width:900px){.d-etoile .et-course-pic{display:none}}
@media (max-width:899px){.d-etoile .et-tl{padding-left:30px}.d-etoile .et-dot{left:-28px}.d-etoile .et-course>p{padding-left:0}.d-etoile .et-course-row{flex-wrap:wrap;gap:6px 14px}.d-etoile .et-course-row small{width:auto}.d-etoile .et-course-row h3{flex:1 1 100%;order:2}.d-etoile .et-course-row b{order:1;margin-left:auto}}

.d-etoile .et-carte{display:grid;gap:0 clamp(40px,6vw,96px);border-top:1px solid var(--lineI)}
@media (min-width:900px){.d-etoile .et-carte{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-etoile .et-carte>li{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);gap:22px;align-items:start;padding:clamp(26px,3vw,40px) 0;border-bottom:1px solid var(--lineI)}
.d-etoile .et-carte>li::after{content:"";position:absolute;left:0;bottom:-1px;width:100%;height:1px;background:var(--gold-d);transform:scaleX(0);transform-origin:0 50%;transition:transform .9s var(--slow)}
.d-etoile .et-carte>li:hover::after{transform:scaleX(1)}
.d-etoile .et-carte-pic{width:clamp(84px,9vw,128px);aspect-ratio:4/5;overflow:hidden}
.d-etoile .et-carte-pic img{width:100%;height:100%;object-fit:cover;transition:transform 1.4s var(--ease)}
.d-etoile .et-carte>li:hover .et-carte-pic img{transform:scale(1.08)}
.d-etoile .et-carte-n{font-family:var(--disp);font-size:clamp(34px,3vw,46px);line-height:.9;color:var(--gold-d);min-width:1.4em}
.d-etoile .et-carte h3{font-size:clamp(26px,2.2vw,34px)}
.d-etoile .et-carte p{margin-top:10px;color:var(--dimi)}
.d-etoile .et-carte .et-meta{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:14px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-d)}

.d-etoile .et-feat{display:grid;border-top:1px solid var(--lineD)}
@media (min-width:860px){.d-etoile .et-feat{grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}.d-etoile .et-feat li+li{border-left:1px solid var(--lineD)}}
.d-etoile .et-feat li{position:relative;display:grid;gap:16px;align-content:start;justify-items:center;padding:clamp(40px,4vw,64px) clamp(20px,3vw,44px);text-align:center;border-bottom:1px solid var(--lineD);transition:background-color .6s}
.d-etoile .et-feat li:hover{background:rgba(198,164,106,.06)}
.d-etoile .et-ico{position:relative;display:grid;place-items:center;width:64px;height:64px;color:var(--gold)}
.d-etoile .et-ico::before{content:"";position:absolute;inset:8px;border:1px solid rgba(198,164,106,.5);transform:rotate(45deg);transition:transform 1.2s var(--ease)}
.d-etoile .et-feat li:hover .et-ico::before{transform:rotate(225deg)}
.d-etoile .et-ico svg{position:relative;width:22px;height:22px}
.d-etoile .et-feat h3{font-size:clamp(26px,2.2vw,34px)}
.d-etoile .et-feat p{max-width:34ch;color:var(--mist)}

.d-etoile .et-steps{position:relative;display:grid;gap:0;counter-reset:s}
@media (min-width:900px){.d-etoile .et-steps{grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:clamp(20px,3vw,48px)}}
.d-etoile .et-steps::before{content:"";position:absolute;left:0;right:0;top:31px;height:1px;background:var(--gold-d);transform:scaleX(0);transform-origin:0 50%;transition:transform 2.2s var(--slow) .2s}
.d-etoile .et-steps.in::before{transform:scaleX(1)}
@media (max-width:899px){.d-etoile .et-steps::before{left:31px;right:auto;top:0;bottom:0;width:1px;height:auto;transform:scaleY(0);transform-origin:50% 0}.d-etoile .et-steps.in::before{transform:scaleY(1)}}
.demo-js .d-etoile .et-steps[data-rv]{opacity:1;transform:none}
.d-etoile .et-steps li{position:relative;display:grid;gap:14px;align-content:start;padding:0 0 40px}
@media (max-width:899px){.d-etoile .et-steps li{padding-left:88px}}
.d-etoile .et-step-n{position:relative;z-index:1;display:grid;place-items:center;width:62px;height:62px;border:1px solid var(--gold-d);border-radius:50%;background:var(--ivory);font-family:var(--disp);font-size:22px;color:var(--gold-d);transition:background-color .6s,color .6s}
@media (max-width:899px){.d-etoile .et-step-n{position:absolute;left:0;top:0}}
.d-etoile .et-steps li:hover .et-step-n{background:var(--ink);color:var(--ivory)}
.d-etoile .et-steps h3{margin-top:10px;font-size:clamp(26px,2.1vw,32px)}
.d-etoile .et-steps p{color:var(--dimi)}
.demo-js .d-etoile .et-steps li{opacity:0;transform:translateY(18px);transition:opacity 1s var(--ease),transform 1s var(--ease);transition-delay:calc(.4s + var(--i,0) * 220ms)}
.demo-js .d-etoile .et-steps.in li{opacity:1;transform:none}

.d-etoile .et-gal{display:grid;gap:clamp(10px,1.4vw,20px);grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-flow:dense}
@media (min-width:900px){.d-etoile .et-gal{grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-rows:clamp(120px,10.5vw,170px)}
.d-etoile .et-g:nth-child(6n+1){grid-column:span 7;grid-row:span 4}.d-etoile .et-g:nth-child(6n+2){grid-column:span 5;grid-row:span 2}.d-etoile .et-g:nth-child(6n+3){grid-column:span 5;grid-row:span 2}.d-etoile .et-g:nth-child(6n+4){grid-column:span 4;grid-row:span 3}.d-etoile .et-g:nth-child(6n+5){grid-column:span 4;grid-row:span 3}.d-etoile .et-g:nth-child(6n){grid-column:span 4;grid-row:span 3}
.d-etoile .et-gal.n1 .et-g{grid-column:1/-1;grid-row:span 4}.d-etoile .et-gal.n2 .et-g{grid-column:span 6;grid-row:span 4}}
@media (max-width:899px){.d-etoile .et-g{aspect-ratio:4/5}.d-etoile .et-g:nth-child(3n+1){grid-column:1/-1;aspect-ratio:16/11}}
.d-etoile .et-g{position:relative;margin:0;overflow:hidden;background:var(--char2)}
.d-etoile .et-g-btn{display:block;width:100%;height:100%;padding:0;border:0;background:none;cursor:zoom-in}
.d-etoile .et-g img{width:100%;height:100%;object-fit:cover;transition:transform 1.6s var(--ease),filter 1s}
.d-etoile .et-g:hover img{transform:scale(1.06)}
.d-etoile .et-gal:hover .et-g:not(:hover) img{filter:brightness(.55) saturate(.7)}
.d-etoile .et-g figcaption{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:flex-end;justify-content:space-between;gap:16px;padding:40px 22px 18px;background:linear-gradient(180deg,rgba(18,17,16,0),rgba(18,17,16,.82));font-size:12.5px;line-height:1.4;color:var(--ivory);opacity:0;transform:translateY(10px);transition:opacity .6s,transform .8s var(--ease);pointer-events:none}
.d-etoile .et-g figcaption i{flex:none;width:30px;height:30px;border:1px solid var(--gold);border-radius:50%;position:relative}
.d-etoile .et-g figcaption i::before,.d-etoile .et-g figcaption i::after{content:"";position:absolute;left:50%;top:50%;width:11px;height:1px;background:var(--gold);transform:translate(-50%,-50%)}
.d-etoile .et-g figcaption i::after{transform:translate(-50%,-50%) rotate(90deg)}
.d-etoile .et-g:hover figcaption,.d-etoile .et-g:focus-within figcaption{opacity:1;transform:none}
@media (hover:none){.d-etoile .et-g figcaption{opacity:1;transform:none;justify-content:flex-end;padding:0 12px 12px;background:none}.d-etoile .et-g figcaption span{display:none}.d-etoile .et-g figcaption i{background:rgba(18,17,16,.55)}}
.demo-js .d-etoile .et-g[data-rv]{opacity:1;transform:none;clip-path:inset(8% 8% 8% 8%);transition:clip-path 1.5s var(--slow);transition-delay:calc(var(--i,0) * 120ms)}
.demo-js .d-etoile .et-g[data-rv].in{clip-path:inset(0)}
.d-etoile .et-lb{position:fixed;inset:0;z-index:80;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:12px;padding:72px clamp(8px,3vw,40px);background:rgba(12,11,10,.96);opacity:0;transition:opacity .5s}
.d-etoile .et-lb.is-open{opacity:1}
.d-etoile .et-lb[hidden]{display:none}
.d-etoile .et-lb figure{display:grid;gap:16px;justify-items:center;max-height:100%;min-width:0}
.d-etoile .et-lb img{max-width:100%;max-height:calc(100svh - 200px);object-fit:contain;transform:scale(.96);transition:transform .8s var(--ease),opacity .4s}
.d-etoile .et-lb.is-open img{transform:none}
.d-etoile .et-lb figcaption{max-width:60ch;font-size:13px;color:var(--mist);text-align:center}
.d-etoile .et-lb button{display:grid;place-items:center;width:52px;height:52px;border:1px solid var(--lineD);border-radius:50%;background:none;color:var(--ivory);font-size:20px;line-height:1;transition:border-color .4s,color .4s}
.d-etoile .et-lb button:hover{border-color:var(--gold);color:var(--gold)}
.d-etoile .et-lb .et-lb-x{position:absolute;right:clamp(12px,3vw,40px);top:16px}
.d-etoile .et-lb-c{position:absolute;left:50%;top:30px;font-size:11px;font-weight:600;letter-spacing:.3em;color:var(--gold);transform:translateX(-50%)}
@media (max-width:620px){.d-etoile .et-lb{grid-template-columns:1fr 1fr;padding:70px 12px 40px}.d-etoile .et-lb figure{grid-column:1/-1;grid-row:1}.d-etoile .et-lb .et-lb-p{justify-self:end}.d-etoile .et-lb .et-lb-n{justify-self:start}}

.d-etoile .et-visit{display:grid;gap:clamp(40px,6vw,100px);align-items:center}
@media (min-width:960px){.d-etoile .et-visit{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}}
.d-etoile .et-card{position:relative;display:grid;justify-items:center;gap:20px;padding:clamp(44px,5vw,80px) clamp(22px,4vw,70px);background:var(--paper);text-align:center;box-shadow:0 40px 80px -50px rgba(27,25,21,.45)}
.d-etoile .et-card::before{content:"";position:absolute;inset:12px;border:1px solid rgba(135,103,47,.45);pointer-events:none}
.d-etoile .et-card::after{content:"";position:absolute;inset:17px;border:1px solid rgba(135,103,47,.18);pointer-events:none}
.d-etoile .et-card h2{font-size:clamp(36px,4vw,60px)}
.d-etoile .et-card .et-hours{width:100%;max-width:440px;margin-top:6px;border:0}
.d-etoile .et-hours div{position:relative;display:flex;align-items:baseline;gap:12px;padding:11px 0;border:0}
.d-etoile .et-hours div::after{content:"";order:2;flex:1;min-width:20px;border-bottom:1px dotted rgba(27,25,21,.35);transform:translateY(-4px)}
.d-etoile .et-hours dt{order:1;font-family:var(--disp);font-size:clamp(19px,1.5vw,22px)}
.d-etoile .et-hours dd{order:3;margin:0;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--dimi)}
@media (max-width:520px){.d-etoile .et-hours dt{font-size:17px}.d-etoile .et-hours dd{font-size:13px}.d-etoile .et-hours div::after{min-width:10px}.d-etoile .et-hours div.is-today::before{left:-14px}}
.d-etoile .et-hours div.is-today dt,.d-etoile .et-hours div.is-today dd{color:var(--gold-d)}
.d-etoile .et-hours div.is-today::before{content:"";position:absolute;left:-22px;top:50%;width:9px;height:9px;background:var(--gold-d);clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%);transform:translateY(-40%)}
.d-etoile .et-card>p:not(.et-kick){max-width:40ch;color:var(--dimi)}
.d-etoile .et-visit-side{display:grid;gap:26px;align-content:start}
.d-etoile .et-visit-side .et-lede{font-size:clamp(22px,2vw,30px)}
.d-etoile .et-reach{display:grid;gap:4px;font-style:normal}
.d-etoile .et-reach a,.d-etoile .et-reach span{display:inline-flex;align-items:center;min-height:40px;font-size:clamp(17px,1.3vw,20px)}
.d-etoile .et-reach a{background:linear-gradient(currentColor,currentColor) 0 85%/0 1px no-repeat;transition:background-size .6s var(--slow)}
.d-etoile .et-reach a:hover{background-size:100% 1px}
.d-etoile .et-reach .z-route{font-size:12px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-d)}

.d-etoile .et-book{padding:0;background:var(--char)}
.d-etoile .et-book-grid{display:grid;min-height:100svh}
@media (min-width:1000px){.d-etoile .et-book-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-etoile .et-book-pic{position:relative;min-height:56svh;overflow:hidden}
.d-etoile .et-book-pic>img,.d-etoile .et-book-pic>.et-bp{position:absolute;inset:0;width:100%;height:100%}
.d-etoile .et-book-pic img{width:100%;height:118%;object-fit:cover;transform:translateY(calc(var(--p,0) * -6%))}
.d-etoile .et-book-pic::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(18,17,16,.1),rgba(18,17,16,.75))}
.d-etoile .et-book-pic.no-pic{background:radial-gradient(70% 60% at 50% 45%,#2b251c,var(--char2))}
.d-etoile .et-book-pic.no-pic::after{display:none}
.d-etoile .et-book-pic .et-orn{width:150%;height:150%;opacity:.3}
.d-etoile .et-book-quote{position:absolute;left:var(--pad);right:var(--pad);bottom:clamp(32px,5vw,64px);z-index:1;display:grid;gap:14px;max-width:520px}
.d-etoile .et-book-quote p{font-family:var(--disp);font-size:clamp(30px,3.4vw,52px);line-height:1.05}
.d-etoile .et-book-quote small{font-size:11px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold2)}
.d-etoile .et-book-side{display:grid;align-content:center;padding:clamp(64px,8vw,130px) var(--pad)}
.d-etoile .et-book-card{display:grid;gap:26px;width:min(100%,600px)}
.d-etoile .et-book-card .et-head{margin-bottom:0}
.d-etoile .et-book-card>p{color:var(--mist)}
.d-etoile .et-book-hours{display:flex;flex-wrap:wrap;gap:6px 22px;font-size:13px;color:var(--mist)}
.d-etoile .et-book-hours b{font-weight:600;color:var(--ivory)}
.d-etoile .et-form .z-fields{gap:0 22px}
.d-etoile .et-form .z-field{gap:2px;padding-top:12px}
.d-etoile .et-form .z-field label,.d-etoile .et-form .z-chipset legend{font-size:10.5px;font-weight:600;letter-spacing:.26em;color:var(--gold)}
.d-etoile .et-form .z-field input,.d-etoile .et-form .z-field select,.d-etoile .et-form .z-field textarea{min-height:52px;padding:10px 0;border:0;border-bottom:1px solid var(--lineD);background:transparent;font-size:17px;transition:border-color .5s}
.d-etoile .et-form .z-field input:focus,.d-etoile .et-form .z-field select:focus,.d-etoile .et-form .z-field textarea:focus{outline:none;border-color:var(--gold)}
.d-etoile .et-form .z-field textarea{min-height:90px}
.d-etoile .et-form .z-field input::-webkit-calendar-picker-indicator{filter:invert(.8) sepia(.4)}
.d-etoile .et-form .z-chips{gap:6px}
.d-etoile .et-form .z-chips button{min-height:50px;border-color:var(--lineD);font-family:var(--disp);font-size:22px}
.d-etoile .et-form .z-chips button[aria-pressed="true"]{background:var(--gold);border-color:var(--gold);color:var(--ink)}
.d-etoile .et-form .btn{margin-top:6px}
.d-etoile .et-form .form-status{border-color:var(--gold)}
.d-etoile .et-iv .et-form .z-field input,.d-etoile .et-iv .et-form .z-field select,.d-etoile .et-iv .et-form .z-field textarea,.d-etoile .et-iv .et-form .z-chips button{border-color:var(--lineI)}
.d-etoile .et-iv .et-form .z-field label{color:var(--gold-d)}
.d-etoile .et-iv .et-form .z-field input::-webkit-calendar-picker-indicator{filter:none}

.d-etoile .et-contact{display:grid;gap:clamp(48px,6vw,100px)}
@media (min-width:960px){.d-etoile .et-contact{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-etoile .et-contact-copy{display:grid;gap:24px;align-content:start}
.d-etoile .et-contact-copy>p{max-width:48ch;color:var(--dimi)}
.d-etoile .et-contact-copy .et-head,.d-etoile .et-book-card .et-head{margin-bottom:0}
.d-etoile .et-city{display:flex;align-items:center;gap:16px;font-family:var(--disp);font-size:clamp(40px,4.4vw,68px);line-height:1}
.d-etoile .et-city .et-star{width:.4em;height:.4em}
.d-etoile .et-contact .et-hours{max-width:440px}
.d-etoile .et-contact.is-solo{align-items:end}
.d-etoile .et-contact.is-solo .et-lede{color:var(--ink)}
.d-etoile .et-paper{padding:clamp(28px,4vw,56px);background:var(--paper);box-shadow:0 40px 80px -50px rgba(27,25,21,.4)}

.d-etoile .et-state{text-align:center}
.d-etoile .et-state .et-wrap{display:grid;justify-items:center;gap:30px;max-width:1240px}
.d-etoile .et-state .et-star{width:22px;height:22px}
.d-etoile .et-state h2{max-width:24ch;font-size:clamp(34px,4.7vw,76px);line-height:1.1}
.d-etoile .et-words span{display:inline-block;white-space:pre}
.demo-js .d-etoile .et-words[data-rv]{opacity:1;transform:none}
.demo-js .d-etoile .et-words span{opacity:.12;transition:opacity 1.1s var(--ease);transition-delay:calc(var(--i,0) * 55ms)}
.demo-js .d-etoile .et-words.in span{opacity:1}
.d-etoile .et-state .et-kick::after{display:none}

.d-etoile .et-show{position:relative;display:grid;align-items:center;min-height:min(105svh,980px);overflow:hidden;background:var(--char)}
.d-etoile .et-show-media{--cy:12%;--cx:16%;position:absolute;inset:0;clip-path:inset(calc(clamp(0,var(--p,0),1) * var(--cy)) calc(clamp(0,var(--p,0),1) * var(--cx)))}
@media (max-width:700px){.d-etoile .et-show-media{--cy:5%;--cx:4%}}
.d-etoile .et-show-media img{width:100%;height:100%;object-fit:cover;transform:scale(calc(1.04 + clamp(0,var(--p,0),1) * .14))}
.d-etoile .et-show-media::after{content:"";position:absolute;inset:0;background:radial-gradient(70% 60% at 50% 50%,rgba(18,17,16,.62),rgba(18,17,16,.8))}
.d-etoile .et-show-in{position:relative;z-index:1;display:grid;justify-items:center;gap:26px;padding-block:clamp(90px,12vw,180px);text-align:center}
.d-etoile .et-show-in h2{max-width:16ch;font-size:clamp(44px,6.4vw,110px)}
.d-etoile .et-show-in>p{max-width:50ch;color:rgba(242,236,223,.86)}
.d-etoile .et-show:not(.has-pic){min-height:0}

.d-etoile .et-foot{position:relative;padding:clamp(90px,10vw,150px) 0 calc(110px + env(safe-area-inset-bottom));background:var(--char);border-top:1px solid var(--lineD);overflow:hidden}
.d-etoile .et-foot-cta{display:grid;justify-items:center;gap:26px;margin-bottom:clamp(64px,8vw,120px);text-align:center}
.d-etoile .et-foot-cta p{font-family:var(--disp);font-size:clamp(34px,4.4vw,68px);line-height:1.06;max-width:18ch}
.d-etoile .et-foot-name{display:flex;justify-content:center;align-items:center;gap:.12em;margin:0 0 clamp(40px,5vw,72px);font-family:var(--disp);font-size:min(17vw,calc((100vw - 2 * var(--pad)) / (var(--len,8) * .52)),240px);line-height:.9;white-space:nowrap;color:var(--ivory)}
.d-etoile .et-foot-name .et-star{width:.22em;height:.22em}
.demo-js .d-etoile .et-foot-name[data-rv]{opacity:1;transform:none}
.demo-js .d-etoile .et-foot-name[data-rv] .et-clip{clip-path:inset(0 50% 0 50%);transition:clip-path 2s var(--slow)}
.demo-js .d-etoile .et-foot-name[data-rv].in .et-clip{clip-path:inset(-10% -2% -20% -2%)}
.d-etoile .et-foot-grid{display:grid;gap:36px 48px;padding-top:44px;border-top:1px solid var(--lineD);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-etoile .et-foot-grid h3{margin-bottom:14px;font-family:"Manrope",sans-serif;font-size:10.5px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}
.d-etoile .et-foot-grid div{display:grid;gap:2px;align-content:start;font-size:14.5px;color:var(--mist)}
.d-etoile .et-foot-grid a{display:inline-flex;align-items:center;min-height:36px;color:var(--ivory);transition:color .4s}
.d-etoile .et-foot-grid a:hover{color:var(--gold2)}
.d-etoile .et-foot-grid>p{font-family:var(--ital);font-style:italic;font-weight:300;font-size:18px;line-height:1.5;color:rgba(242,236,223,.78)}
.d-etoile .et-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:56px;padding-top:24px;border-top:1px solid var(--lineD);font-size:12px;color:var(--mist)}

.d-etoile .z-sec.z-faq,.d-etoile .z-sec.z-packages,.d-etoile .z-sec.z-team,.d-etoile .z-sec.z-order,.d-etoile .z-sec.z-ba-sec{background:var(--ivory);color:var(--ink);--z-ink:var(--ink);--z-dim:var(--dimi);--z-line:var(--lineI);--z-bg2:var(--paper);--z-accent:var(--gold-d)}
.d-etoile .z-sec.z-faq .et-kick,.d-etoile .z-sec.z-packages .et-kick,.d-etoile .z-sec.z-team .et-kick,.d-etoile .z-sec.z-order .et-kick,.d-etoile .z-sec.z-ba-sec .et-kick{color:var(--gold-d)}
.d-etoile .z-faq h2 em,.d-etoile .z-packages h2 em,.d-etoile .z-team h2 em,.d-etoile .z-order h2 em{color:var(--gold-d)}
.d-etoile .z-acc summary{font-family:var(--disp);font-size:clamp(21px,1.8vw,27px);line-height:1.25;padding:26px 0}
.d-etoile .z-acc summary i{width:18px;height:18px;color:var(--gold-d)}
.d-etoile .z-acc details>p{padding-bottom:30px}
.d-etoile .z-acc details{transition:background-color .5s}
.d-etoile .z-card{background:var(--paper);border-color:var(--lineI)}
.d-etoile .z-pack.is-featured{background:var(--ink);color:var(--ivory);border-color:var(--ink);--z-ink:var(--ivory);--z-dim:var(--mist);--z-line:var(--lineD);--z-accent:var(--gold)}
.d-etoile .z-pack h3{font-size:clamp(28px,2.4vw,36px)}
.d-etoile .z-pack-price b{font-family:var(--disp)}
.d-etoile .z-team .z-grid h3{font-size:clamp(26px,2.2vw,34px)}
.d-etoile .z-team .et-kick::after{display:none}
.d-etoile .z-channel{background:var(--paper)}
.d-etoile .z-channel:hover{border-color:var(--gold-d)}
.d-etoile .z-channel h3{font-size:clamp(24px,2vw,30px)}
.d-etoile .z-ico{border-color:rgba(135,103,47,.4);color:var(--gold-d)}
.d-etoile .z-cta{background:var(--char2);overflow:hidden}
.d-etoile .z-cta h2{font-size:clamp(40px,5.4vw,88px)}
.d-etoile .z-cta::before{content:"";position:absolute;left:50%;top:50%;width:min(90vw,820px);aspect-ratio:1;border:1px solid rgba(198,164,106,.18);border-radius:50%;transform:translate(-50%,-50%)}
.d-etoile .z-cta::after{content:"";position:absolute;left:50%;top:50%;width:min(70vw,620px);aspect-ratio:1;border:1px solid rgba(198,164,106,.12);border-radius:50%;transform:translate(-50%,-50%)}
.d-etoile .z-cta .et-wrap{z-index:1}
.d-etoile .z-quotes blockquote{border-color:var(--lineD)}
.d-etoile .z-quotes blockquote>p{font-family:var(--ital);font-style:italic;font-weight:300}
.d-etoile .z-ba figcaption{background:rgba(18,17,16,.75)}
.d-etoile .z-showcase .z-show-in h2{font-size:clamp(40px,5.4vw,88px)}

@keyframes et-slit{from{clip-path:inset(50% 0 50% 0)}to{clip-path:inset(0)}}
@keyframes et-settle{from{transform:scale(1.32)}to{transform:scale(1.08)}}
@keyframes et-line{0%{transform:scaleX(0);opacity:1}55%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
@keyframes et-letter{from{opacity:0;transform:translateY(.35em);filter:blur(6px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes et-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes et-turn{from{transform:rotate(-180deg) scale(0)}to{transform:none}}
@keyframes et-spin{to{transform:rotate(360deg)}}
@keyframes et-drip{0%{transform:translateY(-100%)}60%,100%{transform:translateY(260%)}}
@media (prefers-reduced-motion:reduce){.d-etoile .et-hero-media,.d-etoile .et-hero-in,.d-etoile .et-show-media{clip-path:none!important;transform:none!important;opacity:1!important}.d-etoile .et-hero-media img,.d-etoile .et-show-media img,.d-etoile .et-about-a img,.d-etoile .et-book-pic img{transform:none!important;animation:none!important}.d-etoile .et-hero-media>div,.d-etoile .et-w i,.d-etoile .et-up,.d-etoile .et-hero-line{animation:none!important}.d-etoile .et-hero-line{display:none}.d-etoile .et-orn svg,.d-etoile .et-cue i::after{animation:none!important}.d-etoile .et-fr{transition:none}.d-etoile .et-hero-foot{opacity:1!important}}
`
  .replace(/\n/g, "")
  .trim();

/* Behaviour of the design (plain script, after the shared behaviours):
 *  - the opening settles into a frame on scroll (--hp), desktop only;
 *  - the course timeline: the course in the middle of the screen is "on", the sticky frame shows
 *    its photograph and number, the gold thread fills along (--cp);
 *  - the reservation tab appears after the opening and steps aside at the reservation itself;
 *  - magnetic buttons on fine pointers; a lightbox for the gallery. */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-etoile');if(!root)return;
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var mm=function(x){return W.matchMedia&&W.matchMedia(x).matches};var reduce=mm('(prefers-reduced-motion: reduce)'),fine=mm('(pointer: fine)');
var hero=d.querySelector('.et-hero.has-pic'),tls=q('[data-courses]'),rsv=d.querySelector('.et-rsv'),target=null,targetIn=false;
if(rsv){var h=rsv.getAttribute('href')||'';target=h.charAt(0)==='#'?d.getElementById(h.slice(1)):null;
if(target&&'IntersectionObserver' in W){new IntersectionObserver(function(es){es.forEach(function(e){targetIn=e.isIntersecting});tick()},{threshold:0.15}).observe(target)}}
var raf=0;function tick(){if(!raf)raf=requestAnimationFrame(frame)}
function frame(){raf=0;var vh=W.innerHeight;
if(hero&&!reduce&&W.innerWidth>=900){var r=hero.getBoundingClientRect(),span=Math.max(1,r.height-vh);hero.style.setProperty('--hp',Math.min(1,Math.max(0,-r.top/span)).toFixed(3))}
tls.forEach(function(t){var r=t.getBoundingClientRect();t.style.setProperty('--cp',Math.min(1,Math.max(0,(vh*.55-r.top)/Math.max(1,r.height))).toFixed(3))});
if(rsv)rsv.classList.toggle('is-show',W.scrollY>vh*.9&&!targetIn)}
W.addEventListener('scroll',tick,{passive:true});W.addEventListener('resize',tick);frame();
var ROM=function(n){var v=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']],o='';v.forEach(function(x){while(n>=x[0]){o+=x[1];n-=x[0]}});return o};
tls.forEach(function(t){var items=q('.et-course',t),frs=q('.et-fr',t),cap=t.querySelector('.et-frame-cap'),num=t.querySelector('[data-course-num]'),cat=t.querySelector('[data-course-cat]'),cur=0;
if(!items.length||!('IntersectionObserver' in W))return;t.classList.add('is-live');
function set(k){if(k===cur)return;var prev=cur;cur=k;items.forEach(function(x,n){x.classList.toggle('is-on',n===k)});
frs.forEach(function(f){var n=+f.getAttribute('data-k');f.classList.toggle('was',n===prev);f.classList.toggle('is-on',n===k)});
if(cap&&num){cap.classList.add('is-swap');setTimeout(function(){num.textContent=ROM(k+1);if(cat)cat.textContent=items[k].getAttribute('data-cat')||'';cap.classList.remove('is-swap')},reduce?0:380)}}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)set(items.indexOf(e.target))})},{rootMargin:'-46% 0px -46% 0px'});items.forEach(function(x){io.observe(x)})});
if(fine&&!reduce)q('[data-mag]').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.32).toFixed(1)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})});
q('[data-gal]').forEach(function(g){var btns=q('.et-g-btn',g);if(!btns.length)return;var L=d.createElement('div'),at=0,last=null;L.className='et-lb';L.hidden=true;L.setAttribute('role','dialog');L.setAttribute('aria-modal','true');L.setAttribute('aria-label',g.getAttribute('data-label')||'');
L.innerHTML='<p class="et-lb-c" aria-live="polite"></p><button type="button" class="et-lb-x"></button><button type="button" class="et-lb-p">&#8592;</button><figure><figcaption></figcaption></figure><button type="button" class="et-lb-n">&#8594;</button>';root.appendChild(L);
var img=d.createElement('img');L.querySelector('figure').insertBefore(img,L.querySelector('figcaption'));var cap=L.querySelector('figcaption'),cnt=L.querySelector('.et-lb-c'),x=L.querySelector('.et-lb-x');x.innerHTML='&#10005;';x.setAttribute('aria-label',g.getAttribute('data-close')||'Close');L.querySelector('.et-lb-p').setAttribute('aria-label',g.getAttribute('data-prev')||'Previous');L.querySelector('.et-lb-n').setAttribute('aria-label',g.getAttribute('data-next')||'Next');
function show(k){at=(k+btns.length)%btns.length;var s=btns[at].querySelector('img');img.src=btns[at].getAttribute('data-full')||s.currentSrc||s.src;img.alt=s.alt;cap.textContent=s.alt;cnt.textContent=ROM(at+1)+' / '+ROM(btns.length)}
function open(k){last=d.activeElement;show(k);L.hidden=false;d.documentElement.style.overflow='hidden';requestAnimationFrame(function(){L.classList.add('is-open')});x.focus()}
function close(){L.classList.remove('is-open');d.documentElement.style.overflow='';setTimeout(function(){L.hidden=true},reduce?0:400);if(last)last.focus()}
btns.forEach(function(b,k){b.addEventListener('click',function(){open(k)})});x.addEventListener('click',close);L.querySelector('.et-lb-p').addEventListener('click',function(){show(at-1)});L.querySelector('.et-lb-n').addEventListener('click',function(){show(at+1)});
L.addEventListener('click',function(e){if(e.target===L)close()});d.addEventListener('keydown',function(e){if(L.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(at-1);if(e.key==='ArrowRight')show(at+1);if(e.key==='Tab'){var f=q('button',L),a=f.indexOf(d.activeElement);if(e.shiftKey&&a<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&a===f.length-1){e.preventDefault();f[0].focus()}}})});
})();`.replace(/\n/g, "");

const LB: Record<string, { book: string; reserve: string; zoom: string; close: string; prev: string; next: string; scroll: string; menu: string }> = {
  nl: { book: "Reserveren", reserve: "Reserveer", zoom: "Vergroot", close: "Sluiten", prev: "Vorige foto", next: "Volgende foto", scroll: "Scroll", menu: "Gangen" },
  en: { book: "Reservations", reserve: "Book", zoom: "Enlarge", close: "Close", prev: "Previous photo", next: "Next photo", scroll: "Scroll", menu: "Courses" },
  de: { book: "Reservierung", reserve: "Reservieren", zoom: "Vergrößern", close: "Schließen", prev: "Vorheriges Foto", next: "Nächstes Foto", scroll: "Scrollen", menu: "Gänge" },
  fr: { book: "Réservation", reserve: "Réserver", zoom: "Agrandir", close: "Fermer", prev: "Photo précédente", next: "Photo suivante", scroll: "Défiler", menu: "Plats" },
};
const lb = (c: Ctx) => LB[c.spec.meta.lang] ?? LB.nl;

/** Roman numerals: the courses and chapters of the evening are counted like acts. */
export function roman(n: number): string {
  const table: [number, string][] = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let out = "";
  for (const [v, s] of table)
    while (n >= v) {
      out += s;
      n -= v;
    }
  return out;
}

const Star = ({ className = "et-star" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 0c.6 7.2 4.8 11.4 12 12-7.2.6-11.4 4.8-12 12-.6-7.2-4.8-11.4-12-12C7.2 11.4 11.4 7.2 12 0Z" />
  </svg>
);

const Arrow = () => (
  <svg className="et-arrow" viewBox="0 0 26 10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    <path d="M0 5h25M20.5 .5 25 5l-4.5 4.5" />
  </svg>
);

/** A celestial ornament (rings and a star) for compositions without photographs. Decoration only. */
const Ornament = () => (
  <div className="et-orn" aria-hidden="true">
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth=".6">
      <circle cx="200" cy="200" r="196" />
      <circle cx="200" cy="200" r="150" strokeDasharray="1 5" />
      <circle cx="200" cy="200" r="104" />
      <path d="M200 40c3 72 34 103 106 106v.2c-72 3-103 34-106 106-3-72-34-103-106-106C166 143 197 112 200 40Z" fill="currentColor" fillOpacity=".08" />
      <path d="M200 4v392M4 200h392M61 61l278 278M339 61 61 339" strokeDasharray="2 8" />
    </svg>
  </div>
);

type Word = { w: string; em: boolean };
const wordsOf = (text: string): Word[] => {
  const out: Word[] = [];
  text.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => out.push({ w, em: n % 2 === 1 })),
  );
  return out;
};

/** Words into balanced rows. */
function rows(words: Word[], parts: number): Word[][] {
  const total = words.reduce((a, x) => a + x.w.length + 1, 0);
  const out: Word[][] = [[]];
  let at = 0;
  for (const x of words) {
    const row = out[out.length - 1];
    if (row.length && out.length < parts && at + x.w.length / 2 > (total / parts) * out.length) out.push([x]);
    else row.push(x);
    at += x.w.length + 1;
  }
  return out;
}

function Head({ kicker, title, intro, id, left }: { kicker?: string; title: string; intro?: string; id?: string; left?: boolean }) {
  return (
    <header className={`et-head${left ? " is-left" : ""}`}>
      {kicker ? (
        <p className="et-kick" data-rv>
          <Star />
          {kicker}
        </p>
      ) : null}
      <h2 id={id} className={long(title)} data-rv>
        <span className="et-clip">{em(title)}</span>
      </h2>
      {intro ? (
        <p className="et-intro" data-rv>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

/** Where the reservation affordances lead: the booking section, else the opening's own call to action. */
function reserve(c: Ctx) {
  const book = c.spec.sections.find((s) => s.type === "booking");
  return { href: book ? `#${book.id}` : c.spec.hero.primaryCta.href, label: c.spec.hero.primaryCta.label };
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const r = reserve(c);
  const half = Math.ceil(Math.min(c.nav.length, 4) / 2);
  const left = c.nav.slice(0, half);
  const right = c.nav.slice(half, 4);
  const hero = c.photo(c.spec.hero.image);
  const open = b.openingHours?.find((l) => !/gesloten|closed|ferm|geschlossen/i.test(l));
  return (
    <>
      <header className="et-hdr hdr">
        <div className="et-bar">
          <nav className="et-nav" aria-label={c.t.menu} data-nav>
            {left.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#top" className="et-mark" aria-label={c.name}>
            <Star />
            <span>{c.name}</span>
          </a>
          <div className="et-bar-r">
            {right.length ? (
              <nav className="et-nav" aria-label={c.t.explore}>
                {right.map((n) => (
                  <a key={n.id} href={`#${n.id}`}>
                    {n.label}
                  </a>
                ))}
              </nav>
            ) : null}
            <a href={r.href} className="et-top-rsv">
              {r.label.length > 14 ? lb(c).reserve : r.label}
            </a>
            <button type="button" className="et-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
              <span data-label data-open={c.t.menu} data-close={c.t.close}>
                {c.t.menu}
              </span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div id="site-menu" className="et-menu" data-nav inert>
        <div className="et-menu-pic" aria-hidden="true">
          {hero ? <Pic p={{ ...hero, alt: hero.alt }} eager sizes="40vw" /> : <Ornament />}
        </div>
        <div className="et-menu-in">
          <nav aria-label={c.t.menu}>
            {c.nav.map((n, k) => (
              <a key={n.id} href={`#${n.id}`} style={i(k)}>
                <small>{roman(k + 1)}</small>
                <span className="et-mask">
                  <span>{n.label}</span>
                </span>
                <b aria-hidden="true">→</b>
              </a>
            ))}
          </nav>
          <div className="et-menu-foot">
            <p>
              {[b.city, open].filter(Boolean).join(" · ")}
              {b.phone ? (
                <>
                  <br />
                  <a href={tel(b.phone)}>{b.phone}</a>
                </>
              ) : null}
            </p>
            <a href={r.href} className="btn et-fill">
              {r.label}
            </a>
          </div>
        </div>
      </div>
      <a href={r.href} className="et-rsv" aria-label={r.label}>
        <Star />
        {r.label}
      </a>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 40 ? "is-s" : plain.length > 22 ? "is-m" : undefined;
  const ws = wordsOf(hero.headline);
  const lines = rows(ws, plain.length > 46 ? 3 : 2);
  const letters = ws.reduce((a, x) => a + x.w.length, 0);
  const mid = (letters - 1) / 2;
  let k = 0;
  const facts = heroFacts(c);
  return (
    <section className={`et-hero${p ? " has-pic" : " no-pic"}`}>
      <div className="et-hero-stick">
        {p ? (
          <div className="et-hero-media">
            <div>
              <Pic p={p} eager sizes="100vw" />
            </div>
          </div>
        ) : (
          <Ornament />
        )}
        <div className="et-hero-shade" aria-hidden="true" />
        <span className="et-hero-line" aria-hidden="true" />
        <div className="et-hero-in">
          <p className="et-hero-eye et-up" style={i(0)}>
            <Star />
            {[hero.eyebrow, c.spec.business.city].filter(Boolean).join(" · ")}
          </p>
          <h1 className={size}>
            <span className="et-sr">{plain}</span>
            <span aria-hidden="true">
              {lines.map((row, r) => (
                <span className="et-hl" key={r}>
                  {row.map((x, n) => (
                    <span key={n}>
                      {n > 0 ? " " : null}
                      <span className={`et-w${x.em ? " is-em" : ""}`}>
                        {[...x.w].map((ch, m) => (
                          <i key={m} style={css({ "--d": Math.round(Math.abs(k++ - mid)) })}>
                            {ch}
                          </i>
                        ))}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>
          <p className="et-hero-sub et-up" style={i(1)}>
            {hero.subheadline}
          </p>
          <div className="et-hero-cta et-up" style={i(2)}>
            <span data-mag>
              <Btn c={c} href={hero.primaryCta.href}>
                {hero.primaryCta.label} <Arrow />
              </Btn>
            </span>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
        </div>
        <div className="et-hero-foot et-up" style={i(3)}>
          {facts.length ? (
            <dl className="et-facts">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <span />
          )}
          <NowBadge c={c} className="et-now" />
          <span className="et-cue" aria-hidden="true">
            {lb(c).scroll}
            <i />
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const r = reserve(c);
  return (
    <footer className="et-foot">
      <div className="et-wrap">
        <div className="et-foot-cta">
          <Star />
          <p>{c.spec.footer.blurb && c.spec.footer.blurb.length <= 70 ? c.spec.footer.blurb : c.spec.business.tagline || c.name}</p>
          <a href={r.href} className="btn et-line">
            {r.label} <Arrow />
          </a>
        </div>
        <p className="et-foot-name" aria-hidden="true" data-rv style={css({ "--len": Math.max(5, c.name.length) })}>
          <span className="et-clip">{c.name}</span>
        </p>
        <div className="et-foot-grid">
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
            {b.address ? <span>{b.address}</span> : b.city ? <span>{b.city}</span> : null}
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
          {c.spec.footer.blurb && c.spec.footer.blurb.length > 70 ? <p>{c.spec.footer.blurb}</p> : null}
        </div>
        <Legal c={c} className="et-legal" />
      </div>
    </footer>
  );
}

export const etoile: Family = {
  key: "etoile",
  root: "d-etoile",
  fonts: ["Italiana", "Fraunces", "Manrope"],
  themeColor: "#121110",
  accent: "#c6a46a",
  onAccent: "#1b1915",
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "et-wrap", eyebrow: "et-kick", btn: "et-fill", btnAlt: "et-line", btnText: "et-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const p2 = p ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="et-sec et-iv et-about" id={s.id}>
          <div className={`et-wrap et-about-grid${p ? "" : " is-solo"}`}>
            {p ? (
              <div className="et-about-art" data-rv>
                <figure className="et-about-a et-reveal" data-px>
                  <Pic p={p} sizes="(min-width: 960px) 40vw, 86vw" />
                </figure>
                {p2 ? (
                  <figure className="et-about-b et-reveal" style={i(3)}>
                    <Pic p={p2} sizes="(min-width: 960px) 20vw, 40vw" />
                  </figure>
                ) : null}
                {c.spec.business.city ? (
                  <span className="et-about-cap" aria-hidden="true">
                    <Star />
                    {c.spec.business.city}
                  </span>
                ) : null}
              </div>
            ) : null}
            <div className="et-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} left />
              <p className="et-lede" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="et-hls" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>
                      <Star />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      );
    },
    menu: (s, c) => {
      const courses = s.categories.flatMap((cat) => cat.items.map((d, k) => ({ ...d, cat: cat.name, first: k === 0 })));
      if (!courses.length) return null;
      // Photographs nobody asked for by name: one per course, in order, while they last.
      const pics = courses.map(() => c.spare());
      const has = pics.some(Boolean);
      return (
        <section className="et-sec et-courses-sec" id={s.id}>
          <div className="et-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            <div className={`et-courses${has ? " has-pics" : ""}`} data-courses>
              <div className="et-frame" aria-hidden="true">
                <div className="et-frame-in">
                  {pics.map((p, n) =>
                    p ? (
                      <span key={n} className={`et-fr${n === 0 ? " is-on" : ""}`} data-k={n}>
                        <Pic p={p} sizes="46vw" />
                      </span>
                    ) : null,
                  )}
                  <div className="et-frame-cap">
                    <b data-course-num>I</b>
                    <span>/ {roman(courses.length)}</span>
                    <small data-course-cat>{courses[0].cat}</small>
                  </div>
                </div>
              </div>
              <ol className="et-tl">
                <span className="et-tl-line" aria-hidden="true">
                  <i />
                </span>
                {courses.map((d, n) => (
                  <li key={n} className={`et-course${n === 0 ? " is-on" : ""}`} data-cat={d.cat}>
                    {d.first ? <p className="et-act">{d.cat}</p> : null}
                    {pics[n] ? (
                      <figure className="et-course-pic">
                        <Pic p={pics[n] as Photo} sizes="92vw" />
                      </figure>
                    ) : null}
                    <Star className="et-dot" />
                    <div className="et-course-row">
                      <small>{roman(n + 1)}</small>
                      <h3>{d.name}</h3>
                      {d.price ? <b>{d.price}</b> : null}
                    </div>
                    {d.description ? <p>{d.description}</p> : null}
                    {d.tags?.length ? (
                      <p className="et-tags">
                        {d.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
            {s.note ? (
              <p className="et-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => {
      const pics = s.items.map((_, n) => c.photo(`art:svc${n}`));
      return (
        <section className="et-sec et-iv" id={s.id}>
          <div className="et-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
            <ol className="et-carte">
              {s.items.map((it, n) => (
                <li key={n} data-rv style={i(n % 2)}>
                  {pics[n] ? (
                    <figure className="et-carte-pic">
                      <Pic p={pics[n] as Photo} sizes="140px" />
                    </figure>
                  ) : (
                    <span className="et-carte-n" aria-hidden="true">
                      {roman(n + 1)}
                    </span>
                  )}
                  <div>
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                    {it.duration || it.price ? (
                      <p className="et-meta">
                        {it.duration ? <span>{it.duration}</span> : null}
                        {it.price ? <span>{it.price}</span> : null}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="et-sec" id={s.id}>
        <div className="et-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="et-feat" style={css({ "--n": Math.min(s.items.length, 3) })}>
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span className="et-ico">
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
      <section className="et-sec et-iv" id={s.id}>
        <div className="et-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <ol className="et-steps" data-rv style={css({ "--n": Math.min(s.steps.length, 5) })}>
            {s.steps.map((st, n) => (
              <li key={n} style={i(n)}>
                <span className="et-step-n">{roman(n + 1)}</span>
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
      const l = lb(c);
      return (
        <section className="et-sec" id={s.id}>
          <div className="et-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className={`et-gal n${Math.min(pics.length, 6)}`} data-gal data-label={s.title.replace(/\*/g, "")} data-close={l.close} data-prev={l.prev} data-next={l.next}>
              {pics.slice(0, 9).map((p, n) => (
                <figure key={n} className="et-g" data-rv style={i(n % 3)}>
                  <button type="button" className="et-g-btn" data-full={p.src} aria-label={`${l.zoom}: ${p.alt}`}>
                    <Pic p={p} sizes="(min-width: 900px) 50vw, 92vw" />
                  </button>
                  <figcaption aria-hidden="true">
                    <span>{p.alt}</span>
                    <i />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="et-sec et-iv" id={s.id}>
        <div className="et-wrap et-visit">
          <div className="et-card" data-rv>
            <p className="et-kick">
              <Star />
              {c.t.kick.hours}
            </p>
            <h2 className={long(s.title)}>{em(s.title)}</h2>
            <NowBadge c={c} className="et-now" />
            {c.spec.business.openingHours?.length ? <Hours c={c} className="z-hours et-hours" /> : <p>{c.t.hoursTbc}</p>}
          </div>
          <div className="et-visit-side">
            {s.note ? (
              <p className="et-lede" data-rv>
                {s.note}
              </p>
            ) : null}
            <Reach c={c} className="z-reach et-reach" />
            {!c.spec.business.address && !c.spec.business.phone && c.spec.business.city ? (
              <p className="et-city" data-rv>
                <Star />
                {c.spec.business.city}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    ),
    booking: (s, c) => {
      const p = c.spare();
      const b = c.spec.business;
      const open = (b.openingHours ?? []).filter((l) => !/gesloten|closed|ferm|geschlossen/i.test(l)).slice(0, 3);
      return (
        <section className="et-sec et-book" id={s.id}>
          <div className="et-book-grid">
            <div className={`et-book-pic${p ? "" : " no-pic"}`} data-px>
              {p ? <Pic p={p} sizes="(min-width: 1000px) 50vw, 100vw" /> : <Ornament />}
              <div className="et-book-quote">
                <small>{c.t.submit[s.kind]}</small>
                <p>{c.name}</p>
              </div>
            </div>
            <div className="et-book-side">
              <div className="et-book-card">
                <Head kicker={s.kind === "reservation" ? lb(c).book : c.t.kick.booking} title={s.title} left />
                {s.body ? <p data-rv>{s.body}</p> : null}
                {open.length ? (
                  <p className="et-book-hours" data-rv>
                    {open.map((l) => {
                      const at = l.indexOf(":");
                      return (
                        <span key={l}>
                          <b>{at > 0 ? l.slice(0, at) : l}</b> {at > 0 ? l.slice(at + 1) : ""}
                        </span>
                      );
                    })}
                  </p>
                ) : null}
                <div data-rv>
                  <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" className="z-form et-form" />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    },
    contact: (s, c) => {
      const hours = !c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} className="z-hours et-hours" /> : null;
      // Without a form the heading and the details face each other across the page.
      return (
        <section className="et-sec et-iv" id={s.id}>
          <div className={`et-wrap et-contact${s.showForm ? "" : " is-solo"}`}>
            <div className="et-contact-copy">
              <Head kicker={c.t.kick.contact} title={s.title} left />
              {s.showForm ? (
                <>
                  {s.body ? <p data-rv>{s.body}</p> : null}
                  <Reach c={c} className="z-reach et-reach" />
                  {hours}
                </>
              ) : null}
            </div>
            {s.showForm ? (
              <div className="et-paper" data-rv>
                <DemoForm c={c} kind="message" uid={`f-${s.id}`} className="z-form et-form" />
              </div>
            ) : (
              <div className="et-contact-copy">
                {s.body ? (
                  <p className="et-lede" data-rv>
                    {s.body}
                  </p>
                ) : null}
                <Reach c={c} className="z-reach et-reach" />
                {hours}
              </div>
            )}
          </div>
        </section>
      );
    },
    statement: (s) => {
      let k = 0;
      return (
        <section className="et-sec et-iv et-state" id={s.id}>
          <div className="et-wrap">
            <Star />
            <h2 className="et-words" data-rv>
              {wordsOf(s.title).map((x, n) => (
                <span key={n} style={i(k++)}>
                  {x.em ? <em>{x.w}</em> : x.w}
                  {" "}
                </span>
              ))}
            </h2>
            {s.note ? (
              <p className="et-kick" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    showcase: (s, c) => {
      const p = c.photo(s.image);
      return (
        <section className={`et-show${p ? " has-pic" : ""}`} id={s.id}>
          {p ? (
            <div className="et-show-media" data-px>
              <Pic p={p} sizes="100vw" />
            </div>
          ) : null}
          <div className="et-wrap et-show-in">
            <p className="et-kick" data-rv>
              <Star />
              {c.t.kick.showcase}
            </p>
            <h2 data-rv>{em(s.title)}</h2>
            {s.body ? <p data-rv>{s.body}</p> : null}
            {s.cta ? (
              <p data-rv>
                <Btn c={c} href={s.cta.href} variant="alt">
                  {s.cta.label} <Arrow />
                </Btn>
              </p>
            ) : null}
          </div>
        </section>
      );
    },
  },
};

