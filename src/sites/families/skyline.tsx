import type { SiteSection } from "@/lib/site-spec";
import { NowBadge, TODAY_JS } from "./today";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, Reach, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Skyline: an original template (no portfolio demo). Night above the city: a deep blue-black
 * interface, a tall condensed display face (Big Shoulders Display) set in capitals, and one
 * restrained neon gradient (amber into pink into violet, a sunset over the city) used for
 * accents, never for flashing. The opening cross-fades full-screen photographs under slow city
 * bokeh, a light sweep and film grain; headlines rise and catch the light once. Signatures: an
 * elevator floor indicator that follows the page, the weekly programme as a line-up whose rows
 * light up with their own photograph (and say which night is tonight, from the business's own
 * days), a horizontal photo story, a departure-board for opening hours and a generated skyline
 * whose windows glow in the footer. Made for rooftop and cocktail bars, clubs, lounges, late
 * kitchens and other places that come alive after dark.
 */

const CSS = `
.d-skyline{--night:#07080d;--night2:#0c0e16;--night3:#141726;--ink:#eef0f7;--dim:#9ba1b6;--line:rgba(238,240,247,.12);--line2:rgba(238,240,247,.22);--neon:#ff4d8d;--sun:#ffb35c;--violet:#8f6bff;--grad:linear-gradient(100deg,var(--sun),var(--neon) 55%,var(--violet));--glow:0 0 32px -6px rgba(255,77,141,.55);--pad:clamp(18px,4.6vw,72px);--ease:cubic-bezier(.16,1,.3,1);--io:cubic-bezier(.76,0,.24,1);--disp:"Big Shoulders Display","Arial Narrow",sans-serif;--z-bg2:var(--night3);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--neon);--z-on-accent:#0b0710;--z-display:var(--disp);--z-display-weight:800;--z-radius:18px;--z-field-radius:12px;--z-ico-radius:50%;--z-sec:clamp(90px,11vw,170px);--z-h3:clamp(24px,2.2vw,32px);--z-statement:clamp(40px,6vw,96px);position:relative;background:var(--night);color:var(--ink);font-family:"Archivo",system-ui,sans-serif;font-size:clamp(15.5px,1.02vw,17.5px);line-height:1.65}
.d-skyline::after{content:"";position:fixed;inset:-50%;z-index:58;pointer-events:none;opacity:.07;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")}
.d-skyline h1,.d-skyline h2{overflow-wrap:break-word}
@media (max-width:600px){.d-skyline h1,.d-skyline h2{hyphens:auto}}
.d-skyline h1,.d-skyline h2,.d-skyline h3{font-family:var(--disp);font-weight:800;line-height:.92;letter-spacing:-.005em;text-transform:uppercase}
.d-skyline h2{font-size:clamp(48px,7.4vw,124px)}
.d-skyline h2.is-long{font-size:clamp(38px,4.8vw,78px);line-height:.96}
.d-skyline h3{font-weight:700;letter-spacing:.01em}
.d-skyline h1 em,.d-skyline h2 em,.d-skyline h3 em,.d-skyline .sk-grad{font-style:normal;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 22px rgba(255,77,141,.35))}
.d-skyline ::selection{background:var(--neon);color:#0b0710}
.d-skyline .sk-wrap{position:relative;width:min(100%,1440px);margin-inline:auto;padding-inline:var(--pad)}
.d-skyline .sk-kick{display:inline-flex;align-items:center;gap:12px;font-size:12px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--dim)}
.d-skyline .sk-kick::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--neon);box-shadow:0 0 12px var(--neon)}
.d-skyline .sk-kick b{font-weight:600;color:var(--ink)}
.d-skyline .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:56px;padding:0 30px;border-radius:999px;font-size:13.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:transform .5s var(--ease),box-shadow .5s,background-position .8s var(--ease),border-color .4s,color .4s}
.d-skyline .sk-fill{background:linear-gradient(100deg,var(--sun),var(--neon) 45%,var(--violet) 90%) 0 0/200% 100%;color:#0b0710;box-shadow:0 14px 40px -16px rgba(255,77,141,.8)}
.d-skyline .sk-fill:hover{background-position:100% 0;box-shadow:0 18px 50px -12px rgba(255,77,141,.95)}
.d-skyline .sk-line{border:1px solid var(--line2);background:rgba(238,240,247,.04);color:var(--ink);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.d-skyline .sk-line:hover{border-color:var(--neon);box-shadow:var(--glow)}
.d-skyline .sk-text{display:inline-flex;align-items:center;gap:10px;min-height:48px;font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;background:linear-gradient(var(--neon),var(--neon)) 0 82%/0 2px no-repeat;transition:background-size .6s var(--ease)}
.d-skyline .sk-text:hover{background-size:100% 2px}
.d-skyline .sk-arrow{width:18px;height:18px;flex:none;transition:transform .5s var(--ease)}
.d-skyline .btn:hover .sk-arrow,.d-skyline .sk-text:hover .sk-arrow{transform:translate(3px,-3px)}

.d-skyline .sk-hdr{position:fixed;inset:0 0 auto;z-index:70;transition:background-color .5s,backdrop-filter .5s}
.d-skyline.is-scrolled .sk-hdr{background:rgba(7,8,13,.72);backdrop-filter:blur(16px) saturate(1.3);-webkit-backdrop-filter:blur(16px) saturate(1.3)}
.d-skyline .sk-hdr::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--grad);opacity:0;transition:opacity .5s}
.d-skyline.is-scrolled .sk-hdr::after{opacity:.5}
.d-skyline .sk-bar{display:flex;align-items:center;gap:20px;height:80px;padding-inline:var(--pad);transition:height .5s var(--ease)}
.d-skyline.is-scrolled .sk-bar{height:66px}
.d-skyline .sk-logo{display:inline-flex;align-items:center;gap:12px;min-width:0;min-height:44px;margin-right:auto;font-family:var(--disp);font-size:clamp(22px,2vw,28px);font-weight:800;letter-spacing:.04em;text-transform:uppercase;line-height:1}
.d-skyline .sk-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-skyline .sk-logo svg{width:26px;height:26px;flex:none;filter:drop-shadow(0 0 8px rgba(255,77,141,.6))}
.d-skyline .sk-logo svg rect{transform-box:fill-box;transform-origin:50% 100%;transition:transform .6s var(--ease)}
.d-skyline .sk-logo:hover svg rect:nth-child(2){transform:scaleY(1.25)}
.d-skyline .sk-logo:hover svg rect:nth-child(3){transform:scaleY(.8)}
.d-skyline .sk-nav{display:none;gap:clamp(18px,2.2vw,34px);font-size:12.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.d-skyline .sk-nav a{position:relative;display:inline-flex;align-items:center;min-height:44px;color:rgba(238,240,247,.8);transition:color .3s}
.d-skyline .sk-nav a::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:2px;border-radius:2px;background:var(--grad);transform:scaleX(0);transition:transform .5s var(--ease);box-shadow:0 0 12px var(--neon)}
.d-skyline .sk-nav a:hover{color:var(--ink)}
.d-skyline .sk-nav a:hover::after{transform:scaleX(1)}
.d-skyline .sk-top-cta{display:none;min-height:46px;padding:0 22px;font-size:12px}
.d-skyline .sk-burger{position:relative;z-index:72;display:inline-flex;align-items:center;gap:12px;min-height:46px;padding:0 8px 0 18px;border:1px solid var(--line2);border-radius:999px;background:rgba(7,8,13,.35);font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.d-skyline .sk-burger i{position:relative;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--grad)}
.d-skyline .sk-burger i::before,.d-skyline .sk-burger i::after{content:"";position:absolute;width:12px;height:2px;border-radius:2px;background:#0b0710;transition:transform .5s var(--ease)}
.d-skyline .sk-burger i::before{transform:translateY(-3px)}
.d-skyline .sk-burger i::after{transform:translateY(3px)}
.d-skyline.menu-open .sk-burger i::before{transform:rotate(45deg)}
.d-skyline.menu-open .sk-burger i::after{transform:rotate(-45deg)}
@media (min-width:1080px){.d-skyline .sk-nav,.d-skyline .sk-top-cta{display:inline-flex}.d-skyline .sk-burger{display:none}}
@media (max-width:1359px){.d-skyline .sk-nav a:nth-child(n+5){display:none}}
@media (max-width:420px){.d-skyline .sk-burger [data-label]{display:none}.d-skyline .sk-burger{padding:0 7px}}
.d-skyline.menu-open .sk-hdr{background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-skyline.menu-open .sk-hdr::after{opacity:0}

.d-skyline .sk-menu{position:fixed;inset:0;z-index:66;display:flex;flex-direction:column;justify-content:space-between;gap:30px;padding:104px var(--pad) 0;background:radial-gradient(120% 70% at 80% 10%,#2a1030,transparent 60%),radial-gradient(100% 60% at 0% 100%,#1b1640,transparent 60%),var(--night);overflow:hidden auto;visibility:hidden;clip-path:inset(0 50% 0 50%);transition:clip-path .9s var(--io),visibility 0s .9s}
.d-skyline .sk-menu.is-open{visibility:visible;clip-path:inset(0);transition:clip-path .9s var(--io)}
.d-skyline .sk-menu::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 30%,rgba(255,179,92,.5) 0 2px,transparent 3px),radial-gradient(circle at 70% 20%,rgba(255,77,141,.5) 0 3px,transparent 4px),radial-gradient(circle at 85% 55%,rgba(143,107,255,.45) 0 2px,transparent 3px),radial-gradient(circle at 40% 70%,rgba(255,77,141,.35) 0 2px,transparent 3px);background-size:420px 380px,520px 460px,380px 340px,600px 520px;opacity:.6;pointer-events:none}
.d-skyline .sk-menu nav{position:relative;display:grid;gap:0}
.d-skyline .sk-menu nav a{position:relative;display:flex;align-items:baseline;gap:16px;padding:2px 0;font-family:var(--disp);font-size:clamp(50px,13vw,120px);font-weight:900;line-height:.98;text-transform:uppercase;overflow:hidden}
.d-skyline .sk-menu nav a small{font-family:"Archivo",sans-serif;font-size:12px;font-weight:600;letter-spacing:.14em;color:var(--neon);opacity:0;transition:opacity .5s}
.d-skyline .sk-menu nav a span{display:block;transform:translateY(100%);transition:transform .9s var(--ease),color .3s}
.d-skyline .sk-menu.is-open nav a span{transform:none;transition-delay:calc(.3s + var(--i,0) * 60ms)}
.d-skyline .sk-menu.is-open nav a small{opacity:1;transition-delay:calc(.5s + var(--i,0) * 60ms)}
.d-skyline .sk-menu nav a:hover span{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.d-skyline .sk-menu-foot{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px 28px;padding-bottom:20px;font-size:14px;color:var(--dim);opacity:0;transition:opacity .6s .6s}
.d-skyline .sk-menu.is-open .sk-menu-foot{opacity:1}
.d-skyline .sk-menu-foot a:not(.btn){color:var(--ink)}
.d-skyline .sk-menu .sk-city{position:relative;margin:0 calc(-1 * var(--pad));height:clamp(120px,22vh,200px);transform:translateY(40%);transition:transform 1.2s var(--ease) .2s}
.d-skyline .sk-menu.is-open .sk-city{transform:none}

.d-skyline .sk-floors{position:fixed;right:clamp(12px,1.4vw,26px);top:50%;z-index:56;display:none;flex-direction:column;align-items:flex-end;text-align:right;gap:6px;transform:translateY(-50%);opacity:0;transition:opacity .6s}
.d-skyline.is-scrolled .sk-floors{opacity:1}
@media (min-width:1280px){.d-skyline .sk-floors{display:flex}}
.d-skyline .sk-floor-n{margin-bottom:10px;font-family:var(--disp);font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}
.d-skyline .sk-floor-n b{display:block;font-size:34px;font-weight:800;letter-spacing:0;line-height:1;color:var(--ink);text-shadow:0 0 18px rgba(255,77,141,.5)}
.d-skyline .sk-floors a{position:relative;display:flex;flex-direction:row-reverse;align-items:center;gap:10px;min-height:20px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:transparent;transition:color .4s}
.d-skyline .sk-floors a::before{content:"";width:12px;height:2px;border-radius:2px;background:var(--line2);transition:width .5s var(--ease),background-color .4s,box-shadow .4s}
.d-skyline .sk-floors a:hover,.d-skyline .sk-floors a:focus-visible{color:var(--ink);text-shadow:0 0 12px #07080d,0 0 4px #07080d}
.d-skyline .sk-floors a.is-on{color:transparent}
.d-skyline .sk-floors a.is-on::before{width:28px;background:var(--neon);box-shadow:0 0 10px var(--neon)}
.d-skyline.menu-open .sk-floors{opacity:0}

.d-skyline .sk-hero{position:relative;display:grid;align-items:end;min-height:100svh;overflow:hidden;isolation:isolate}
.d-skyline .sk-slides{position:absolute;inset:0;z-index:-3;background:var(--night)}
.d-skyline .sk-slide{position:absolute;inset:0;opacity:0;transition:opacity 1.8s ease}
.d-skyline .sk-slide.is-on{opacity:1}
.d-skyline .sk-slide img{width:100%;height:100%;object-fit:cover;transform:scale(1.14);transition:transform 9s linear}
.d-skyline .sk-slide.is-on img{transform:scale(1.02)}
.d-skyline .sk-hero::before{content:"";position:absolute;inset:0;z-index:-2;background:linear-gradient(180deg,rgba(7,8,13,.6),rgba(7,8,13,.1) 30%,rgba(7,8,13,.35) 60%,var(--night)),linear-gradient(90deg,rgba(7,8,13,.7),rgba(7,8,13,0) 65%)}
.d-skyline .sk-bokeh{position:absolute;inset:-10%;z-index:-1;pointer-events:none;background:radial-gradient(circle at 12% 30%,rgba(255,179,92,.28) 0 14px,transparent 34px),radial-gradient(circle at 78% 22%,rgba(255,77,141,.24) 0 22px,transparent 52px),radial-gradient(circle at 64% 64%,rgba(143,107,255,.2) 0 18px,transparent 44px),radial-gradient(circle at 30% 80%,rgba(255,77,141,.16) 0 26px,transparent 60px),radial-gradient(circle at 90% 75%,rgba(255,179,92,.18) 0 12px,transparent 30px),radial-gradient(circle at 46% 18%,rgba(143,107,255,.16) 0 10px,transparent 26px);filter:blur(3px);animation:sk-drift 28s ease-in-out infinite alternate}
.d-skyline .sk-sweep{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden}
.d-skyline .sk-sweep::before{content:"";position:absolute;top:-20%;bottom:-20%;left:-40%;width:40%;background:linear-gradient(100deg,transparent,rgba(255,200,150,.07) 45%,rgba(255,120,180,.08) 55%,transparent);transform:translateX(-60%) skewX(-14deg);animation:sk-sweep 16s var(--io) 2s infinite}
.d-skyline .sk-spot{position:absolute;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(520px circle at var(--mx,70%) var(--my,30%),rgba(255,77,141,.12),transparent 60%);transition:background .2s}
.d-skyline .sk-hero.no-pic .sk-slides{background:radial-gradient(90% 70% at 80% 20%,#2b0f33,transparent 60%),radial-gradient(80% 60% at 10% 90%,#151a45,transparent 60%),var(--night)}
.d-skyline .sk-hero.no-pic .sk-city{position:absolute;left:0;right:0;bottom:0;z-index:-1;height:30%;opacity:.75}
.d-skyline .sk-hero-in{display:grid;gap:30px;padding:140px var(--pad) clamp(120px,14vh,170px);width:min(100%,1440px);margin-inline:auto}
@media (min-width:1080px){.d-skyline .sk-hero-in{grid-template-columns:minmax(0,1fr) auto;align-items:end}}
.d-skyline .sk-hero-copy{display:grid;gap:26px;justify-items:start}
.d-skyline .sk-chip{display:inline-flex;align-items:center;gap:12px;padding:9px 16px;border:1px solid var(--line2);border-radius:999px;background:rgba(7,8,13,.4);font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.d-skyline .sk-now{display:inline-flex;align-items:center;gap:8px;color:var(--ink)}
.d-skyline .sk-now::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--dim)}
.d-skyline .sk-now.is-open::before{background:#5dffa8;box-shadow:0 0 10px #5dffa8}
.d-skyline .sk-now.is-closed::before{background:var(--neon);box-shadow:0 0 10px var(--neon)}
.d-skyline .sk-hero h1{max-width:13ch;font-size:clamp(62px,11.6vw,200px);font-weight:900;line-height:.86;letter-spacing:-.01em}
.d-skyline .sk-hero h1.is-m{max-width:15ch;font-size:clamp(54px,8.6vw,150px)}
.d-skyline .sk-hero h1.is-s{max-width:18ch;font-size:clamp(44px,6.2vw,108px);line-height:.9}
.d-skyline .sk-ln{display:block;overflow:hidden;padding:.04em 0 .02em}
.d-skyline .sk-ln>span{display:block;transform:translateY(105%);animation:sk-rise 1.2s var(--ease) both;animation-delay:calc(.25s + var(--i,0) * 120ms)}
.d-skyline .sk-ln>span.sk-lit{background:linear-gradient(100deg,var(--ink) 40%,#fff 48%,#ffd2e4 50%,var(--ink) 58%) 100% 0/260% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sk-rise 1.2s var(--ease) both,sk-lit 2.4s var(--io) both;animation-delay:calc(.25s + var(--i,0) * 120ms),calc(1.3s + var(--i,0) * 120ms)}
.d-skyline .sk-ln em{display:inline-block}
.d-skyline .sk-lede{max-width:48ch;font-size:clamp(16.5px,1.25vw,20px);color:rgba(238,240,247,.86)}
.d-skyline .sk-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px 26px}
.d-skyline .sk-up{animation:sk-up 1.1s var(--ease) both;animation-delay:calc(.8s + var(--i,0) * 110ms)}
.d-skyline .sk-tonight{display:grid;gap:8px;width:min(100%,340px);padding:22px 24px;border:1px solid var(--line2);border-radius:20px;background:rgba(12,14,22,.5);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 30px 60px -30px rgba(0,0,0,.8)}
.d-skyline .sk-tonight[hidden]{display:none}
.d-skyline .sk-tonight small{font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--neon)}
.d-skyline .sk-tonight b{font-family:var(--disp);font-size:34px;font-weight:800;line-height:1;text-transform:uppercase}
.d-skyline .sk-tonight span{font-size:14px;color:var(--dim)}
.d-skyline .sk-hero-foot{position:absolute;left:0;right:0;bottom:0;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px 30px;width:min(100%,1440px);margin-inline:auto;padding:0 var(--pad) 78px}
.d-skyline .sk-dots{display:flex;gap:8px}
.d-skyline .sk-dots i{position:relative;width:46px;height:2px;border-radius:2px;background:var(--line2);overflow:hidden}
.d-skyline .sk-dots i::after{content:"";position:absolute;inset:0;background:var(--grad);transform:scaleX(0);transform-origin:0 50%}
.d-skyline .sk-dots i.is-on::after{animation:sk-bar 6.5s linear both}
.d-skyline .sk-facts{display:flex;flex-wrap:wrap;gap:8px 30px;font-size:13px;color:var(--dim)}
.d-skyline .sk-facts div{display:flex;gap:10px}
.d-skyline .sk-facts dt{font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink)}
.d-skyline .sk-facts dd{margin:0}
@media (max-width:700px){.d-skyline .sk-tonight{display:none}.d-skyline .sk-chip{flex-wrap:wrap;gap:6px 12px;font-size:11px;letter-spacing:.14em}.d-skyline .sk-hero-in{padding-top:120px;padding-bottom:190px}.d-skyline .sk-hero-foot{padding-bottom:86px}.d-skyline .sk-facts{gap:4px 18px;font-size:12.5px}.d-skyline .sk-facts div{flex-direction:column;gap:0}}

.d-skyline .sk-sec{position:relative;padding-block:var(--z-sec)}
.d-skyline .sk-sec.is-alt{background:var(--night2)}
.d-skyline .sk-head{display:grid;gap:22px;margin-bottom:clamp(44px,5vw,84px)}
@media (min-width:1000px){.d-skyline .sk-head.has-intro{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);align-items:end;column-gap:60px}.d-skyline .sk-head.has-intro .sk-kick{grid-column:1/-1}}
.d-skyline .sk-head>p:last-child:not(.sk-kick){max-width:46ch;color:var(--dim)}
.d-skyline .sk-head h2{max-width:16ch}
.d-skyline .sk-head h2.is-long{max-width:24ch}
.d-skyline .sk-in{display:block}
.demo-js .d-skyline h2[data-rv]{opacity:1;transform:none}
.demo-js .d-skyline h2[data-rv] .sk-in{opacity:0;transform:translateY(.5em);transition:opacity 1s var(--ease),transform 1.2s var(--ease)}
.demo-js .d-skyline h2[data-rv].in .sk-in{opacity:1;transform:none}
.d-skyline .sk-center{text-align:center;justify-items:center}

.d-skyline .sk-about{display:grid;gap:clamp(48px,6vw,110px);align-items:center}
@media (min-width:1000px){.d-skyline .sk-about{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}.d-skyline .sk-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:1100px}}
.d-skyline .sk-about-copy{display:grid;gap:22px}
.d-skyline .sk-about-copy .sk-head{margin-bottom:6px}
.d-skyline .sk-big{font-size:clamp(20px,1.7vw,26px);line-height:1.45;color:var(--ink)}
.d-skyline .sk-about-copy>p:not(.sk-big){max-width:56ch;color:var(--dim)}
.d-skyline .sk-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}
.d-skyline .sk-tags li{display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border:1px solid var(--line2);border-radius:999px;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;transition:border-color .4s,box-shadow .4s}
.d-skyline .sk-tags li::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--sun);box-shadow:0 0 8px var(--sun)}
.d-skyline .sk-tags li:hover{border-color:var(--neon);box-shadow:var(--glow)}
.d-skyline .sk-window{position:relative;justify-self:center;width:min(100%,560px)}
.d-skyline .sk-window figure{position:relative;aspect-ratio:4/5;overflow:hidden;border-radius:clamp(20px,3vw,34px)}
.d-skyline .sk-window figure img{width:100%;height:116%;object-fit:cover;transform:translateY(calc(var(--p,0) * -6%))}
.d-skyline .sk-window::before{content:"";position:absolute;inset:-1px;z-index:1;border-radius:clamp(21px,3vw,35px);padding:1px;background:var(--grad);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.8;pointer-events:none}
.d-skyline .sk-window::after{content:"";position:absolute;left:8%;right:8%;bottom:-40px;height:60px;z-index:-1;background:var(--grad);filter:blur(40px);opacity:.45}
.d-skyline .sk-window .sk-badge{position:absolute;left:-14px;top:12%;z-index:2;display:grid;gap:2px;padding:14px 18px;border:1px solid var(--line2);border-radius:16px;background:rgba(12,14,22,.75);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}
.d-skyline .sk-window .sk-badge b{font-family:var(--disp);font-size:26px;font-weight:800;letter-spacing:.02em;color:var(--ink)}
.demo-js .d-skyline .sk-window[data-rv]{opacity:1;transform:none}
.demo-js .d-skyline .sk-window[data-rv] figure{clip-path:inset(0 0 0 100% round 30px);transition:clip-path 1.6s var(--io)}
.demo-js .d-skyline .sk-window[data-rv].in figure{clip-path:inset(0 0 0 0 round 0)}
.demo-js .d-skyline .sk-window[data-rv] figure img{filter:saturate(0) brightness(.6);transition:filter 2.4s var(--ease) .6s}
.demo-js .d-skyline .sk-window[data-rv].in figure img{filter:none}

.d-skyline .sk-prog{border-top:1px solid var(--line)}
.d-skyline .sk-row{position:relative;display:grid;grid-template-columns:minmax(0,1fr);gap:10px 32px;padding:clamp(24px,3vw,40px) 0;border-bottom:1px solid var(--line);isolation:isolate}
@media (min-width:900px){.d-skyline .sk-row{grid-template-columns:minmax(0,.9fr) minmax(0,1.3fr) auto;align-items:center;padding-inline:clamp(12px,1.5vw,24px)}}
.d-skyline .sk-row-bg{position:absolute;inset:0;z-index:-1;overflow:hidden;border-radius:18px;opacity:0;transition:opacity .7s var(--ease)}
.d-skyline .sk-row-bg img{width:100%;height:100%;object-fit:cover;transform:scale(1.12);transition:transform 1.6s var(--ease)}
.d-skyline .sk-row-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,8,13,.92),rgba(7,8,13,.55) 60%,rgba(7,8,13,.85))}
@media (hover:hover) and (min-width:900px){.d-skyline .sk-row:hover .sk-row-bg{opacity:1}.d-skyline .sk-row:hover .sk-row-bg img{transform:scale(1)}.d-skyline .sk-row:hover{border-color:transparent}}
.d-skyline .sk-day{font-family:var(--disp);font-size:clamp(46px,6vw,96px);font-weight:900;line-height:.86;text-transform:uppercase;color:transparent;-webkit-text-stroke:1.2px rgba(238,240,247,.45);transition:-webkit-text-stroke-color .5s}
.d-skyline .sk-day.is-num{font-size:clamp(40px,4.4vw,72px)}
.d-skyline .sk-row:hover .sk-day,.d-skyline .sk-row.is-tonight .sk-day{background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-stroke-color:transparent}
.d-skyline .sk-row h3{font-size:clamp(28px,2.6vw,42px);line-height:.96}
.d-skyline .sk-row p{max-width:52ch;margin-top:8px;color:var(--dim)}
.d-skyline .sk-when{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:flex-start}
@media (min-width:900px){.d-skyline .sk-when{justify-content:flex-end}}
.d-skyline .sk-when span{display:inline-flex;align-items:center;min-height:34px;padding:0 14px;border:1px solid var(--line2);border-radius:999px;font-size:13px;font-weight:600;letter-spacing:.06em;font-variant-numeric:tabular-nums;white-space:nowrap}
.d-skyline .sk-when b{display:none;align-items:center;min-height:34px;padding:0 14px;border-radius:999px;background:var(--grad);color:#0b0710;font-size:11.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;box-shadow:var(--glow)}
.d-skyline .sk-row.is-tonight .sk-when b{display:inline-flex}
.d-skyline .sk-row-pic{aspect-ratio:16/8;overflow:hidden;border-radius:16px;margin-bottom:6px}
.d-skyline .sk-row-pic img{width:100%;height:100%;object-fit:cover}
@media (min-width:900px){.d-skyline .sk-row-pic{display:none}}
@media (max-width:899px){.d-skyline .sk-row-bg{display:none}}
.demo-js .d-skyline .sk-row[data-rv]{transform:translateX(-24px)}
.demo-js .d-skyline .sk-row[data-rv].in{transform:none}

.d-skyline .sk-tabs{display:flex;gap:6px;max-width:100%;margin-bottom:clamp(28px,3vw,44px);padding:6px;border:1px solid var(--line);border-radius:999px;background:var(--night3);overflow-x:auto;scrollbar-width:none;width:max-content}
.d-skyline .sk-tabs::-webkit-scrollbar{display:none}
.d-skyline .sk-tabs button{flex:none;min-height:46px;padding:0 22px;border:0;border-radius:999px;background:none;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);transition:color .3s,background-color .3s,box-shadow .4s}
.d-skyline .sk-tabs button:hover{color:var(--ink)}
.d-skyline .sk-tabs button[aria-selected="true"]{background:var(--grad);color:#0b0710;box-shadow:var(--glow)}
.d-skyline .sk-list{display:grid;gap:0 clamp(40px,5vw,90px)}
@media (min-width:900px){.d-skyline .sk-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-skyline .sk-list[hidden]{display:none}
.d-skyline .sk-list:not([hidden]) .sk-drink{animation:sk-up .7s var(--ease) both;animation-delay:calc(var(--i,0) * 50ms)}
.d-skyline .sk-drink{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 18px;padding:22px 0;border-bottom:1px solid var(--line)}
.d-skyline .sk-drink h3{font-size:clamp(24px,2vw,30px)}
.d-skyline .sk-drink b{font-family:var(--disp);font-size:24px;font-weight:700;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.d-skyline .sk-drink p{grid-column:1/-1;max-width:50ch;color:var(--dim);font-size:.95em}
.d-skyline .sk-drink .sk-dtags{display:flex;gap:6px;flex-wrap:wrap}
.d-skyline .sk-drink .sk-dtags span{padding:2px 10px;border:1px solid var(--line2);border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--sun)}
.d-skyline .sk-note{margin-top:30px;font-size:13.5px;color:var(--dim)}

.d-skyline .sk-cards{display:grid;gap:clamp(14px,1.6vw,24px);grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));perspective:1200px}
.d-skyline .sk-card{position:relative;display:grid;gap:16px;align-content:start;height:100%;padding:clamp(26px,2.6vw,38px);border:1px solid var(--line);border-radius:24px;background:linear-gradient(160deg,rgba(238,240,247,.06),rgba(238,240,247,.015));overflow:hidden;transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .5s var(--ease),border-color .5s,box-shadow .5s}
.d-skyline .sk-card::before{content:"";position:absolute;inset:0;background:radial-gradient(400px circle at var(--cx,50%) var(--cy,0%),rgba(255,77,141,.16),transparent 50%);opacity:0;transition:opacity .5s;pointer-events:none}
.d-skyline .sk-card:hover{border-color:rgba(255,77,141,.5);box-shadow:0 30px 60px -30px rgba(255,77,141,.45)}
.d-skyline .sk-card:hover::before{opacity:1}
.d-skyline .sk-card .sk-n{position:absolute;right:20px;top:8px;font-family:var(--disp);font-size:90px;font-weight:900;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(238,240,247,.1)}
.d-skyline .sk-ico{position:relative;display:grid;place-items:center;width:54px;height:54px;border-radius:50%;background:var(--night);color:var(--ink)}
.d-skyline .sk-ico::before{content:"";position:absolute;inset:-1px;border-radius:50%;padding:1px;background:var(--grad);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.d-skyline .sk-ico svg{width:22px;height:22px}
.d-skyline .sk-card h3{font-size:clamp(26px,2.2vw,32px)}
.d-skyline .sk-card p{color:var(--dim)}

.d-skyline .sk-steps{position:relative;display:grid;gap:34px;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-skyline .sk-steps::before{content:"";position:absolute;left:0;right:0;top:27px;height:1px;background:var(--line2)}
.d-skyline .sk-steps::after{content:"";position:absolute;left:0;right:0;top:26px;height:3px;border-radius:3px;background:var(--grad);box-shadow:0 0 14px var(--neon);transform:scaleX(0);transform-origin:0 50%;transition:transform 2.4s var(--io) .2s}
.d-skyline .sk-steps.in::after{transform:scaleX(1)}
.demo-js .d-skyline .sk-steps[data-rv]{opacity:1;transform:none}
@media (max-width:899px){.d-skyline .sk-steps::before,.d-skyline .sk-steps::after{display:none}}
.d-skyline .sk-steps li{position:relative;display:grid;gap:12px;align-content:start}
.d-skyline .sk-steps li>span{display:grid;place-items:center;width:56px;height:56px;border:1px solid var(--line2);border-radius:50%;background:var(--night);font-family:var(--disp);font-size:22px;font-weight:800;transition:background-color .5s,color .5s,box-shadow .5s}
.d-skyline .sk-steps.in li>span{border-color:transparent;background:var(--grad);color:#0b0710;box-shadow:var(--glow);transition-delay:calc(.5s + var(--i,0) * 450ms)}
.d-skyline .sk-steps h3{margin-top:8px;font-size:clamp(26px,2.2vw,32px)}
.d-skyline .sk-steps p{color:var(--dim)}

.d-skyline .sk-hs{position:relative;padding-block:var(--z-sec)}
.d-skyline .sk-hs.is-pinned{padding:0}
.d-skyline .sk-hs-stick{display:grid;grid-template-columns:minmax(0,1fr);gap:clamp(30px,4vw,56px);align-content:center}
.d-skyline .sk-hs.is-pinned .sk-hs-stick{position:sticky;top:0;height:100svh;overflow:hidden;padding-top:76px;gap:clamp(20px,3vh,40px)}
.d-skyline .sk-hs.is-pinned .sk-shot,.d-skyline .sk-hs.is-pinned .sk-shot:nth-child(3n+2){width:auto;height:min(56svh,620px)}
.d-skyline .sk-hs.is-pinned .sk-shot:nth-child(3n+2){height:min(46svh,520px)}
.d-skyline .sk-hs .sk-head{margin-bottom:0}
.d-skyline .sk-track{display:flex;gap:clamp(12px,1.6vw,24px);padding-inline:var(--pad);overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.d-skyline .sk-track::-webkit-scrollbar{display:none}
.d-skyline .sk-hs.is-pinned .sk-track{overflow:visible;scroll-snap-type:none;will-change:transform}
.d-skyline .sk-shot{position:relative;flex:none;width:min(78vw,420px);margin:0;aspect-ratio:4/5;overflow:hidden;border-radius:22px;scroll-snap-align:center}
.d-skyline .sk-shot:nth-child(3n+2){width:min(88vw,640px);aspect-ratio:16/11;align-self:center}
.d-skyline .sk-shot img{width:100%;height:100%;object-fit:cover;transition:transform 1.4s var(--ease)}
.d-skyline .sk-shot:hover img{transform:scale(1.05)}
.d-skyline .sk-shot figcaption{position:absolute;left:16px;bottom:14px;padding:6px 12px;border-radius:999px;background:rgba(7,8,13,.6);font-size:11.5px;font-weight:700;letter-spacing:.16em;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
@media (min-width:900px){.d-skyline .sk-shot{width:clamp(320px,30vw,480px)}.d-skyline .sk-shot:nth-child(3n+2){width:clamp(480px,46vw,760px)}}
.d-skyline .sk-hs-bar{position:relative;height:2px;margin-inline:var(--pad);border-radius:2px;background:var(--line)}
.d-skyline .sk-hs-bar i{position:absolute;inset:0;border-radius:2px;background:var(--grad);transform:scaleX(var(--g,0));transform-origin:0 50%;box-shadow:0 0 12px var(--neon)}
.d-skyline .sk-hs:not(.is-pinned) .sk-hs-bar{display:none}

.d-skyline .sk-visit{display:grid;gap:clamp(40px,6vw,100px);align-items:center}
@media (min-width:1000px){.d-skyline .sk-visit{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-skyline .sk-visit-copy{display:grid;gap:22px;align-content:start}
.d-skyline .sk-visit-copy .sk-head{margin-bottom:0}
.d-skyline .sk-visit-copy>p{max-width:46ch;color:var(--dim)}
.d-skyline .sk-board{position:relative;padding:clamp(22px,3vw,40px);border:1px solid var(--line);border-radius:26px;background:linear-gradient(180deg,#0f1220,#0a0c14);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 40px 80px -40px rgba(0,0,0,.9)}
.d-skyline .sk-board-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px dashed var(--line2);font-size:11.5px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--dim)}
.d-skyline .sk-board .z-hours{border:0}
.d-skyline .sk-board .z-hours div{align-items:center;padding:12px 14px;margin-inline:-14px;border:0;border-radius:12px;transition:background-color .4s}
.d-skyline .sk-board .z-hours div:nth-child(odd){background:rgba(238,240,247,.025)}
.d-skyline .sk-board .z-hours dt{font-family:var(--disp);font-size:clamp(22px,2vw,28px);font-weight:700;letter-spacing:.04em;text-transform:uppercase}
.d-skyline .sk-board .z-hours dd{font-family:var(--disp);font-size:clamp(22px,2vw,28px);font-weight:600;letter-spacing:.06em;font-variant-numeric:tabular-nums;color:var(--sun)}
.d-skyline .sk-board .z-hours div.is-today{background:linear-gradient(90deg,rgba(255,77,141,.18),rgba(143,107,255,.08));box-shadow:inset 3px 0 0 var(--neon)}
.d-skyline .sk-board .z-hours div.is-today dt::after{content:" ◂";color:var(--neon)}
@media (max-width:520px){.d-skyline .sk-board .z-hours dt,.d-skyline .sk-board .z-hours dd{font-size:20px}.d-skyline .sk-board .z-hours div{gap:10px}}
.d-skyline .sk-reach{display:grid;gap:2px;font-style:normal}
.d-skyline .sk-reach a,.d-skyline .sk-reach span{display:inline-flex;align-items:center;min-height:40px;font-size:clamp(17px,1.3vw,20px)}
.d-skyline .sk-reach a{transition:color .3s}
.d-skyline .sk-reach a:hover{color:var(--neon)}
.d-skyline .sk-reach .z-route{font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--sun)}
.d-skyline .sk-city-big{font-family:var(--disp);font-size:clamp(56px,7vw,110px);font-weight:900;line-height:.9;text-transform:uppercase}

.d-skyline .sk-book{position:relative;overflow:hidden;isolation:isolate}
.d-skyline .sk-book-bg{position:absolute;inset:-8% 0;z-index:-2}
.d-skyline .sk-book-bg img{width:100%;height:100%;object-fit:cover;transform:translateY(calc(var(--p,0) * -5%)) scale(1.05)}
.d-skyline .sk-book::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(7,8,13,.94),rgba(7,8,13,.7) 55%,rgba(7,8,13,.55)),linear-gradient(180deg,var(--night),transparent 20%,transparent 80%,var(--night))}
.d-skyline .sk-book.no-pic::before{background:radial-gradient(70% 60% at 85% 30%,rgba(255,77,141,.18),transparent 60%),radial-gradient(60% 60% at 10% 90%,rgba(143,107,255,.16),transparent 60%),var(--night2)}
.d-skyline .sk-book-grid{display:grid;gap:clamp(40px,5vw,90px);align-items:center}
@media (min-width:1000px){.d-skyline .sk-book-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-skyline .sk-book-copy{display:grid;gap:22px;align-content:start}
.d-skyline .sk-book-copy .sk-head{margin-bottom:0}
.d-skyline .sk-book-copy>p{max-width:46ch;color:rgba(238,240,247,.8)}
.d-skyline .sk-glass{padding:clamp(24px,3.4vw,46px);border:1px solid var(--line2);border-radius:28px;background:rgba(12,14,22,.62);backdrop-filter:blur(18px) saturate(1.2);-webkit-backdrop-filter:blur(18px) saturate(1.2);box-shadow:0 50px 100px -50px rgba(0,0,0,.9)}
.d-skyline .sk-form .z-field label,.d-skyline .sk-form .z-chipset legend{font-size:11.5px;font-weight:700;letter-spacing:.16em;color:var(--dim)}
.d-skyline .sk-form .z-field input,.d-skyline .sk-form .z-field select,.d-skyline .sk-form .z-field textarea{border-color:var(--line2);background:rgba(7,8,13,.45);transition:border-color .3s,box-shadow .3s}
.d-skyline .sk-form .z-field input:focus,.d-skyline .sk-form .z-field select:focus,.d-skyline .sk-form .z-field textarea:focus{outline:none;border-color:var(--neon);box-shadow:0 0 0 3px rgba(255,77,141,.2)}
.d-skyline .sk-form .z-field input::-webkit-calendar-picker-indicator{filter:invert(1)}
.d-skyline .sk-form .z-chips button{border-color:var(--line2);border-radius:999px;font-family:var(--disp);font-size:22px;font-weight:800}
.d-skyline .sk-form .z-chips button[aria-pressed="true"]{border-color:transparent;background:var(--grad);color:#0b0710;box-shadow:var(--glow)}
.d-skyline .sk-form .form-status{border-color:var(--neon);border-radius:12px}

.d-skyline .sk-contact{display:grid;gap:clamp(40px,6vw,100px)}
@media (min-width:1000px){.d-skyline .sk-contact{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-skyline .sk-contact-copy{display:grid;gap:22px;align-content:start}
.d-skyline .sk-contact-copy .sk-head{margin-bottom:0}
.d-skyline .sk-contact-copy>p{max-width:46ch;color:var(--dim)}

.d-skyline .sk-state{overflow:hidden}
.d-skyline .sk-state h2{max-width:20ch;font-size:clamp(44px,7vw,120px);font-weight:900;line-height:.92;color:transparent;-webkit-text-stroke:1.2px rgba(238,240,247,.3);background:linear-gradient(100deg,var(--ink),var(--ink)) 0 0/calc(clamp(0, (1 - var(--p,1)) * 85, 100) * 1%) 100% no-repeat;-webkit-background-clip:text;background-clip:text}
.d-skyline .sk-state h2 em{-webkit-text-stroke:0;filter:none}
.d-skyline .sk-state .sk-kick{margin-top:30px}

.d-skyline .sk-show{position:relative;display:grid;align-items:end;min-height:min(100svh,920px);overflow:hidden;isolation:isolate}
.d-skyline .sk-show-media{position:absolute;inset:0;z-index:-2}
.d-skyline .sk-show-media img{width:100%;height:100%;object-fit:cover;transform:scale(calc(1.03 + clamp(0,var(--p,0),1) * .12))}
.d-skyline .sk-show::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,var(--night),rgba(7,8,13,.1) 30%,rgba(7,8,13,.3) 60%,rgba(7,8,13,.92))}
.d-skyline .sk-show-in{display:grid;gap:22px;justify-items:start;padding-block:clamp(100px,14vw,200px) clamp(60px,8vw,110px)}
.d-skyline .sk-show-in h2{max-width:14ch;font-size:clamp(52px,8vw,140px)}
.d-skyline .sk-show-in>p{max-width:48ch;color:rgba(238,240,247,.86)}
.d-skyline .sk-show:not(.has-pic){min-height:0;background:var(--night2)}

.d-skyline .sk-foot{position:relative;padding-top:clamp(80px,10vw,150px);background:var(--night);overflow:hidden}
.d-skyline .sk-foot-top{display:grid;gap:26px;justify-items:start;margin-bottom:clamp(50px,6vw,90px)}
.d-skyline .sk-foot-top p:not(.sk-kick){max-width:18ch;font-family:var(--disp);font-size:clamp(46px,7vw,120px);font-weight:900;line-height:.9;text-transform:uppercase}
.d-skyline .sk-foot-grid{display:grid;gap:34px 48px;padding-top:40px;border-top:1px solid var(--line);grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}
.d-skyline .sk-foot-grid h3{margin-bottom:12px;font-family:"Archivo",sans-serif;font-size:11.5px;font-weight:700;letter-spacing:.22em;color:var(--neon)}
.d-skyline .sk-foot-grid div{display:grid;gap:2px;align-content:start;font-size:14.5px;color:var(--dim)}
.d-skyline .sk-foot-grid a{display:inline-flex;align-items:center;min-height:36px;color:var(--ink);transition:color .3s}
.d-skyline .sk-foot-grid a:hover{color:var(--sun)}
.d-skyline .sk-foot-grid>p{color:var(--dim)}
.d-skyline .sk-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:50px;padding-top:22px;border-top:1px solid var(--line);font-size:12px;color:var(--dim)}
.d-skyline .sk-foot .sk-city{position:relative;height:clamp(140px,20vw,260px);margin-top:40px}
.d-skyline .sk-foot-name{position:absolute;left:0;right:0;bottom:-.12em;z-index:0;font-family:var(--disp);font-size:calc((100vw - 2 * var(--pad)) / (var(--len,8) * .5));font-weight:900;line-height:1;text-align:center;text-transform:uppercase;white-space:nowrap;color:transparent;-webkit-text-stroke:1px rgba(238,240,247,.08);pointer-events:none}
.d-skyline .sk-foot-base{position:relative;z-index:1;height:calc(96px + env(safe-area-inset-bottom));background:var(--night2)}
.d-skyline .sk-city{display:block;pointer-events:none}
.d-skyline .sk-city svg{position:absolute;inset:0;width:100%;height:100%}
.d-skyline .sk-city .b{fill:#131726}
.d-skyline .sk-city .b2{fill:#1a1f33;opacity:.7}
.d-skyline .sk-city .w{fill:var(--sun);opacity:.75}
.d-skyline .sk-city .w.p{fill:var(--neon);opacity:.7}
.d-skyline .sk-city .w.t{animation:sk-twinkle 7s ease-in-out infinite alternate}
.d-skyline .sk-city .w.t:nth-child(3n){animation-delay:-2.5s;animation-duration:9s}
.d-skyline .sk-city .w.t:nth-child(4n){animation-delay:-5s;animation-duration:11s}

.d-skyline .z-sec.z-faq,.d-skyline .z-sec.z-packages,.d-skyline .z-sec.z-team,.d-skyline .z-sec.z-order,.d-skyline .z-sec.z-quotes-sec{background:var(--night2)}
.d-skyline .z-acc details{border-color:var(--line)}
.d-skyline .z-acc summary{font-family:var(--disp);font-size:clamp(22px,2vw,30px);font-weight:700;text-transform:uppercase;line-height:1.05;padding:24px 0}
.d-skyline .z-acc summary i{width:30px;height:30px;border:1px solid var(--line2);border-radius:50%}
.d-skyline .z-acc summary i::before,.d-skyline .z-acc summary i::after{left:50%;width:12px;margin-left:-6px;background:var(--neon)}
.d-skyline .z-acc details[open] summary{color:var(--sun)}
.d-skyline .z-card{border-radius:24px;background:linear-gradient(160deg,rgba(238,240,247,.06),rgba(238,240,247,.015))}
.d-skyline .z-pack.is-featured{border-color:transparent;background:linear-gradient(160deg,rgba(255,77,141,.2),rgba(143,107,255,.12));box-shadow:0 30px 60px -30px rgba(255,77,141,.5)}
.d-skyline .z-pack-price b{font-weight:800}
.d-skyline .z-ticks li::before{background:var(--grad);height:2px}
.d-skyline .z-channel{border-radius:22px;background:rgba(238,240,247,.03)}
.d-skyline .z-channel:hover{border-color:var(--neon);box-shadow:var(--glow)}
.d-skyline .z-cta{position:relative;overflow:hidden;background:radial-gradient(60% 80% at 50% 120%,rgba(255,77,141,.28),transparent 70%),var(--night2)}
.d-skyline .z-cta h2{font-size:clamp(48px,7vw,120px)}
.d-skyline .z-quotes blockquote{border-color:var(--line2)}
.d-skyline .z-team .z-pic{border-radius:22px}
.d-skyline .z-ba{border-radius:22px}

@keyframes sk-rise{from{transform:translateY(105%)}to{transform:none}}
@keyframes sk-lit{from{background-position:100% 0}to{background-position:0 0}}
@keyframes sk-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes sk-bar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes sk-drift{from{transform:translate3d(0,0,0)}to{transform:translate3d(-3%,2%,0)}}
@keyframes sk-sweep{0%{transform:translateX(-60%) skewX(-14deg)}45%,100%{transform:translateX(420%) skewX(-14deg)}}
@keyframes sk-twinkle{0%,40%{opacity:.75}100%{opacity:.18}}
@media (prefers-reduced-motion:reduce){.d-skyline .sk-bokeh,.d-skyline .sk-sweep::before,.d-skyline .sk-city .w.t,.d-skyline .sk-dots i.is-on::after{animation:none!important}.d-skyline .sk-slide img{transform:none!important;transition:none}.d-skyline .sk-ln>span,.d-skyline .sk-up{animation:none!important;transform:none!important;opacity:1!important}.d-skyline .sk-ln>span.sk-lit{background:none;color:inherit}.d-skyline .sk-state h2{background-size:100% 100%}.d-skyline .sk-show-media img,.d-skyline .sk-window figure img,.d-skyline .sk-book-bg img{transform:none!important}.d-skyline .sk-card{transform:none!important}}
`
  .replace(/\n/g, "")
  .trim();

/* Behaviour (plain script, after the shared behaviours): the opening's slideshow and spotlight,
 * the floor indicator, "tonight" in the programme (from the business's own day names), the
 * pinned horizontal photo story, tilt on cards and magnetic buttons on fine pointers. */
const JS = `(function(){var d=document,W=window,root=d.querySelector('.d-skyline');if(!root)return;
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};var mm=function(x){return W.matchMedia&&W.matchMedia(x).matches};var reduce=mm('(prefers-reduced-motion: reduce)'),fine=mm('(pointer: fine)');
var sl=q('.sk-slide'),dots=q('.sk-dots i'),at=0;function go(k){sl[at].classList.remove('is-on');if(dots[at])dots[at].classList.remove('is-on');at=k;sl[at].classList.add('is-on');if(dots[at]){dots[at].classList.remove('is-on');void dots[at].offsetWidth;dots[at].classList.add('is-on')}}
if(sl.length>1&&!reduce)setInterval(function(){if(!d.hidden)go((at+1)%sl.length)},6500);
var hero=d.querySelector('.sk-hero');if(hero&&fine&&!reduce)hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px')});
var DAYS={zondag:0,sunday:0,sonntag:0,dimanche:0,maandag:1,monday:1,montag:1,lundi:1,dinsdag:2,tuesday:2,dienstag:2,mardi:2,woensdag:3,wednesday:3,mittwoch:3,mercredi:3,donderdag:4,thursday:4,donnerstag:4,jeudi:4,vrijdag:5,friday:5,freitag:5,vendredi:5,zaterdag:6,saturday:6,samstag:6,samedi:6};
var today=new Date().getDay();try{var wd=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Amsterdam',weekday:'short'}).format(new Date());today=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(wd)}catch(e){}
var tn=d.querySelector('.sk-tonight');q('[data-day]').forEach(function(r){var w=(r.getAttribute('data-day')||'').toLowerCase().replace(/[^a-zäöüéèû]/g,'');if(DAYS[w]!==today)return;r.classList.add('is-tonight');if(tn&&tn.hidden){var n=tn.querySelector('b'),t=tn.querySelector('span');if(n)n.textContent=r.getAttribute('data-name')||'';if(t)t.textContent=r.getAttribute('data-time')||'';tn.hidden=false}});
var fl=q('.sk-floors a'),fn=d.querySelector('.sk-floor-n b');if(fl.length&&'IntersectionObserver' in W){var map=fl.map(function(a){return d.getElementById(a.getAttribute('href').slice(1))});var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var k=map.indexOf(e.target);fl.forEach(function(a,n){a.classList.toggle('is-on',n===k)});if(fn)fn.textContent=fl[k].getAttribute('data-floor')})},{rootMargin:'-45% 0px -50% 0px'});map.forEach(function(t){if(t)io.observe(t)})}
var hs=q('[data-hscroll]');function size(){hs.forEach(function(s){var tr=s.querySelector('.sk-track');if(reduce||W.innerWidth<900||!tr){s.classList.remove('is-pinned');s.style.height='';if(tr)tr.style.transform='';s._ex=0;return}s.classList.add('is-pinned');var ex=Math.max(0,tr.scrollWidth-W.innerWidth);s._ex=ex;s.style.height=(W.innerHeight+ex)+'px'});tick()}
var raf=0;function tick(){if(!raf)raf=requestAnimationFrame(frame)}function frame(){raf=0;hs.forEach(function(s){if(!s._ex)return;var r=s.getBoundingClientRect(),span=Math.max(1,s.offsetHeight-W.innerHeight),p=Math.min(1,Math.max(0,-r.top/span));s.querySelector('.sk-track').style.transform='translate3d('+(-p*s._ex).toFixed(1)+'px,0,0)';s.style.setProperty('--g',p.toFixed(3))})}
if(hs.length){size();W.addEventListener('resize',size);W.addEventListener('scroll',tick,{passive:true});W.addEventListener('load',size)}
if(fine&&!reduce){q('.sk-card').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty('--ry',((x-.5)*8).toFixed(2)+'deg');c.style.setProperty('--rx',((.5-y)*8).toFixed(2)+'deg');c.style.setProperty('--cx',(x*100).toFixed(1)+'%');c.style.setProperty('--cy',(y*100).toFixed(1)+'%')});c.addEventListener('pointerleave',function(){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});
q('[data-mag]').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.35).toFixed(1)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})})}
})();`.replace(/\n/g, "");

const WORDS: Record<string, { tonight: string; floor: string; programme: string; book: string }> = {
  nl: { tonight: "Vanavond", floor: "Verdieping", programme: "Programma", book: "Reserveren" },
  en: { tonight: "Tonight", floor: "Floor", programme: "Programme", book: "Reservations" },
  de: { tonight: "Heute Abend", floor: "Etage", programme: "Programm", book: "Reservierung" },
  fr: { tonight: "Ce soir", floor: "Étage", programme: "Programme", book: "Réservation" },
};
const w = (c: Ctx) => WORDS[c.spec.meta.lang] ?? WORDS.nl;

const Arrow = () => (
  <svg className="sk-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 15 15 5M7 5h8v8" />
  </svg>
);

const Mark = () => (
  <svg viewBox="0 0 26 26" aria-hidden="true">
    <defs>
      <linearGradient id="sk-mark" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#ffb35c" />
        <stop offset=".55" stopColor="#ff4d8d" />
        <stop offset="1" stopColor="#8f6bff" />
      </linearGradient>
    </defs>
    <rect x="2" y="12" width="6" height="12" rx="1" fill="url(#sk-mark)" />
    <rect x="10" y="3" width="6" height="21" rx="1" fill="url(#sk-mark)" />
    <rect x="18" y="8" width="6" height="16" rx="1" fill="url(#sk-mark)" />
  </svg>
);

/** The buildings and lit windows of a skyline, from a name: the same name gives the same city. */
function cityOf(name: string) {
  let seed = 0;
  for (const ch of name) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const W = 1600;
  const H = 260;
  const back: string[] = [];
  const front: { x: number; y: number; w: number }[] = [];
  for (let x = -20; x < W; ) {
    const bw = 40 + Math.round(rnd() * 70);
    const bh = 70 + Math.round(rnd() * 150);
    back.push(`M${x} ${H}V${H - bh}h${bw}V${H}Z`);
    x += bw - 10;
  }
  for (let x = 0; x < W; ) {
    const bw = 46 + Math.round(rnd() * 80);
    const bh = 40 + Math.round(rnd() * (rnd() > 0.8 ? 210 : 140));
    front.push({ x, y: H - bh, w: bw });
    x += bw + Math.round(rnd() * 14);
  }
  const wins: { x: number; y: number; k: string }[] = [];
  for (const b of front) {
    for (let y = b.y + 12; y < H - 14; y += 14) {
      for (let x = b.x + 8; x < b.x + b.w - 10; x += 12) {
        const r = rnd();
        if (r > 0.84) wins.push({ x, y, k: r > 0.985 ? "w p t" : r > 0.95 ? "w t" : "w" });
      }
    }
  }
  return { W, H, back, front, wins };
}

/** A city at night, drawn from the business's name. Decoration only. */
function City({ c, id }: { c: Ctx; id: string }) {
  const { W, H, back, front, wins } = cityOf(c.name);
  return (
    <div className="sk-city" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff4d8d" stopOpacity="0" />
            <stop offset="1" stopColor="#ff4d8d" stopOpacity=".16" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#${id}-sky)`} />
        <path className="b2" d={back.join("")} />
        {front.map((b, n) => (
          <rect key={n} className="b" x={b.x} y={b.y} width={b.w} height={H - b.y} />
        ))}
        {wins.map((x, n) => (
          <rect key={n} className={x.k} x={x.x} y={x.y} width="5" height="7" />
        ))}
      </svg>
    </div>
  );
}

function Head({ kicker, title, intro, id, center }: { kicker?: string; title: string; intro?: string; id?: string; center?: boolean }) {
  return (
    <header className={`sk-head${intro && !center ? " has-intro" : ""}${center ? " sk-center" : ""}`}>
      {kicker ? (
        <p className="sk-kick" data-rv>
          {kicker}
        </p>
      ) : null}
      <h2 id={id} className={long(title)} data-rv>
        <span className="sk-in">{em(title)}</span>
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

/** Whether a section renders at all (a gallery without photographs does not), so links to it work. */
function shows(s: SiteSection, c: Ctx) {
  if (s.type === "gallery") return s.images.some((r) => c.photo(r));
  if (s.type === "beforeafter") return s.pairs.some((p) => c.photo(p.before) && c.photo(p.after));
  return true;
}

/** "Vrijdag — Sunset sessions" → day and name; anything else keeps its whole title. */
function dayOf(title: string): { day: string | null; name: string } {
  const m = title.match(/^\s*([^\s—–-]{3,14})\s*[—–-]\s*(.+)$/);
  if (m && /^(maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag|monday|tuesday|wednesday|thursday|friday|saturday|sunday|montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)$/i.test(m[1])) return { day: m[1], name: m[2] };
  return { day: null, name: title };
}

function reserve(c: Ctx) {
  const book = c.spec.sections.find((s) => s.type === "booking");
  return { href: book ? `#${book.id}` : c.spec.hero.primaryCta.href, label: book && c.spec.hero.primaryCta.label.length > 22 ? c.t.submit.reservation : c.spec.hero.primaryCta.label };
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const r = reserve(c);
  const floors = c.spec.sections.filter((s) => shows(s, c)).slice(0, 12);
  const label = (s: SiteSection) => {
    const t = s.title.replace(/\*/g, "");
    return t.length <= 18 ? t : c.t.kick[s.type] || t.slice(0, 18);
  };
  const open = b.openingHours?.find((l) => !/gesloten|closed|ferm|geschlossen/i.test(l));
  return (
    <>
      <header className="sk-hdr hdr">
        <div className="sk-bar">
          <a href="#top" className="sk-logo" aria-label={c.name}>
            <Mark />
            <span>{c.name}</span>
          </a>
          <nav className="sk-nav" aria-label={c.t.menu} data-nav>
            {c.nav.slice(0, 5).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <span data-mag>
            <a href={r.href} className="btn sk-fill sk-top-cta">
              {r.label}
            </a>
          </span>
          <button type="button" className="sk-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="sk-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{String(k + 1).padStart(2, "0")}</small>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="sk-menu-foot">
          <p>
            {[b.city, open].filter(Boolean).join(" · ")}
            {b.phone ? (
              <>
                <br />
                <a href={tel(b.phone)}>{b.phone}</a>
              </>
            ) : null}
          </p>
          <a href={r.href} className="btn sk-fill">
            {r.label} <Arrow />
          </a>
        </div>
        <City c={c} id="sk-city-menu" />
      </div>
      <nav className="sk-floors" aria-label={w(c).floor}>
        <p className="sk-floor-n" aria-hidden="true">
          {w(c).floor}
          <b>00</b>
        </p>
        {floors.map((s, n) => (
          <a key={s.id} href={`#${s.id}`} data-floor={String(n + 1).padStart(2, "0")}>
            {label(s)}
          </a>
        ))}
      </nav>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  // Two more photographs nobody asked for by name keep the opening moving.
  const more = p ? [c.spare(), c.spare()].filter((x): x is Photo => Boolean(x)) : [];
  const slides = p ? [p, ...more] : [];
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 42 ? "is-s" : plain.length > 24 ? "is-m" : undefined;
  const words: { w: string; em: boolean }[] = [];
  hero.headline.split(/\*([^*]+)\*/).forEach((chunk, n) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((x) => words.push({ w: x, em: n % 2 === 1 })),
  );
  // Lines of roughly equal length: condensed capitals stack beautifully.
  const parts = plain.length > 34 ? 4 : plain.length > 16 ? 3 : 2;
  const total = words.reduce((a, x) => a + x.w.length + 1, 0);
  const lines: (typeof words)[] = [[]];
  let at = 0;
  for (const x of words) {
    const row = lines[lines.length - 1];
    if (row.length && lines.length < parts && at + x.w.length / 2 > (total / parts) * lines.length) lines.push([x]);
    else row.push(x);
    at += x.w.length + 1;
  }
  const facts = heroFacts(c);
  return (
    <section className={`sk-hero${p ? "" : " no-pic"}`}>
      <div className="sk-slides">
        {slides.map((s, n) => (
          <div key={n} className={`sk-slide${n === 0 ? " is-on" : ""}`}>
            <Pic p={s} eager={n === 0} sizes="100vw" />
          </div>
        ))}
      </div>
      {p ? null : <City c={c} id="sk-city-hero" />}
      <span className="sk-bokeh" aria-hidden="true" />
      <span className="sk-sweep" aria-hidden="true" />
      <span className="sk-spot" aria-hidden="true" />
      <div className="sk-hero-in">
        <div className="sk-hero-copy">
          <p className="sk-chip sk-up" style={i(0)}>
            {[hero.eyebrow, c.spec.business.city].filter(Boolean).join(" · ")}
            <NowBadge c={c} className="sk-now" />
          </p>
          <h1 className={size}>
            {lines.map((row, n) => {
              const marked = row.some((x) => x.em);
              return (
                <span className="sk-ln" key={n}>
                  <span className={marked ? undefined : "sk-lit"} style={i(n)}>
                    {row.map((x, k) => (
                      <span key={k}>
                        {k > 0 ? " " : null}
                        {x.em ? <em>{x.w}</em> : x.w}
                      </span>
                    ))}
                  </span>
                </span>
              );
            })}
          </h1>
          <p className="sk-lede sk-up" style={i(2)}>
            {hero.subheadline}
          </p>
          <div className="sk-cta-row sk-up" style={i(3)}>
            <span data-mag>
              <Btn c={c} href={hero.primaryCta.href}>
                {hero.primaryCta.label} <Arrow />
              </Btn>
            </span>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
        </div>
        <div className="sk-tonight sk-up" style={i(4)} hidden>
          <small>{w(c).tonight}</small>
          <b />
          <span />
        </div>
      </div>
      <div className="sk-hero-foot sk-up" style={i(5)}>
        {slides.length > 1 ? (
          <div className="sk-dots" aria-hidden="true">
            {slides.map((_, n) => (
              <i key={n} className={n === 0 ? "is-on" : undefined} />
            ))}
          </div>
        ) : (
          <span />
        )}
        {facts.length ? (
          <dl className="sk-facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const r = reserve(c);
  return (
    <footer className="sk-foot">
      <div className="sk-wrap">
        <div className="sk-foot-top">
          <p className="sk-kick">{[c.name, b.city].filter(Boolean).join(" · ")}</p>
          <p>{em(c.spec.business.tagline || c.name)}</p>
          <span data-mag>
            <a href={r.href} className="btn sk-fill">
              {r.label} <Arrow />
            </a>
          </span>
        </div>
        <div className="sk-foot-grid">
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
          {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
        </div>
        <Legal c={c} className="sk-legal" />
      </div>
      <div className="sk-city-wrap" style={{ position: "relative" }}>
        <p className="sk-foot-name" aria-hidden="true" style={css({ "--len": Math.max(6, c.name.length) })}>
          {c.name}
        </p>
        <City c={c} id="sk-city-foot" />
      </div>
      <div className="sk-foot-base" />
    </footer>
  );
}

export const skyline: Family = {
  key: "skyline",
  root: "d-skyline",
  fonts: ["Big Shoulders Display", "Archivo"],
  themeColor: "#07080d",
  accent: "#ff4d8d",
  onAccent: "#0b0710",
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "sk-wrap", eyebrow: "sk-kick", btn: "sk-fill", btnAlt: "sk-line", btnText: "sk-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="sk-sec" id={s.id}>
          <div className={`sk-wrap sk-about${p ? "" : " is-solo"}`}>
            <div className="sk-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="sk-big" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="sk-tags" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
            {p ? (
              <div className="sk-window" data-rv>
                <figure data-px>
                  <Pic p={p} sizes="(min-width: 1000px) 40vw, 92vw" />
                </figure>
                {c.spec.business.city ? (
                  <span className="sk-badge" aria-hidden="true">
                    {c.t.kick.hours}
                    <b>{c.spec.business.city}</b>
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => (
      <section className="sk-sec is-alt" id={s.id}>
        <div className="sk-wrap">
          <Head kicker={s.items.some((it) => dayOf(it.title).day) ? w(c).programme : c.t.kick.services} title={s.title} intro={s.intro} />
          <ol className="sk-prog">
            {s.items.map((it, n) => {
              const p = c.photo(`art:svc${n}`);
              const { day, name } = dayOf(it.title);
              return (
                <li key={n} className="sk-row" data-rv style={i(n % 4)} {...(day ? { "data-day": day, "data-name": name, "data-time": it.duration ?? "" } : {})}>
                  {p ? (
                    <>
                      <span className="sk-row-bg" aria-hidden="true">
                        <Pic p={p} sizes="100vw" />
                      </span>
                      <figure className="sk-row-pic">
                        <Pic p={p} sizes="92vw" />
                      </figure>
                    </>
                  ) : null}
                  <span className={`sk-day${day ? "" : " is-num"}`} aria-hidden={day ? undefined : true}>
                    {day ?? String(n + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{name}</h3>
                    <p>{it.description}</p>
                  </div>
                  <p className="sk-when">
                    {day ? <b>{w(c).tonight}</b> : null}
                    {it.duration ? <span>{it.duration}</span> : null}
                    {it.price ? <span>{it.price}</span> : null}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    ),
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      const tab = (n: number) => `${s.id}-tab-${n}`;
      return (
        <section className="sk-sec" id={s.id}>
          <div className="sk-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            {cats.length > 1 ? (
              <div className="sk-tabs" role="tablist" aria-label={s.title.replace(/\*/g, "")} data-rv>
                {cats.map((cat, n) => (
                  <button key={n} type="button" role="tab" id={tab(n)} aria-selected={n === 0} aria-controls={`${s.id}-panel-${n}`} tabIndex={n === 0 ? 0 : -1}>
                    {cat.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="sk-kick" data-rv>
                {cats[0].name}
              </p>
            )}
            {cats.map((cat, n) => (
              <div key={n} id={`${s.id}-panel-${n}`} className="sk-list" role={cats.length > 1 ? "tabpanel" : undefined} aria-labelledby={cats.length > 1 ? tab(n) : undefined} hidden={n > 0}>
                {cat.items.map((d, m) => (
                  <div key={m} className="sk-drink" style={i(m)}>
                    <h3>{d.name}</h3>
                    {d.price ? <b>{d.price}</b> : <span />}
                    {d.description ? <p>{d.description}</p> : null}
                    {d.tags?.length ? (
                      <p className="sk-dtags">
                        {d.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
            {s.note ? (
              <p className="sk-note" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="sk-sec is-alt" id={s.id}>
        <div className="sk-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="sk-cards">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <div className="sk-card">
                  <span className="sk-n" aria-hidden="true">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <span className="sk-ico">
                    <Icon name={it.icon} />
                  </span>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    process: (s, c) => (
      <section className="sk-sec" id={s.id}>
        <div className="sk-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <ol className="sk-steps" data-rv>
            {s.steps.map((st, n) => (
              <li key={n} style={i(n)}>
                <span>{String(n + 1).padStart(2, "0")}</span>
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
        <section className="sk-hs" id={s.id} data-hscroll>
          <div className="sk-hs-stick">
            <div className="sk-wrap">
              <Head kicker={c.t.kick.gallery} title={s.title} />
            </div>
            <div className="sk-track">
              {pics.slice(0, 9).map((p, n) => (
                <figure key={n} className="sk-shot">
                  <Pic p={p} sizes="(min-width: 900px) 46vw, 88vw" />
                  <figcaption aria-hidden="true">
                    {String(n + 1).padStart(2, "0")} / {String(Math.min(pics.length, 9)).padStart(2, "0")}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="sk-hs-bar" aria-hidden="true">
              <i />
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => {
      const b = c.spec.business;
      return (
        <section className="sk-sec is-alt" id={s.id}>
          <div className="sk-wrap sk-visit">
            <div className="sk-visit-copy">
              <Head kicker={c.t.kick.hours} title={s.title} />
              {s.note ? <p data-rv>{s.note}</p> : null}
              <Reach c={c} className="z-reach sk-reach" />
              {!b.address && !b.phone && b.city ? (
                <p className="sk-city-big" data-rv>
                  <span className="sk-grad">{b.city}</span>
                </p>
              ) : null}
            </div>
            <div className="sk-board" data-rv>
              <p className="sk-board-top">
                <span>{c.t.hours}</span>
                <NowBadge c={c} className="sk-now" />
              </p>
              {b.openingHours?.length ? <Hours c={c} /> : <p>{c.t.hoursTbc}</p>}
            </div>
          </div>
        </section>
      );
    },
    booking: (s, c) => {
      const p = c.spare();
      return (
        <section className={`sk-sec sk-book${p ? "" : " no-pic"}`} id={s.id}>
          {p ? (
            <div className="sk-book-bg" data-px>
              <Pic p={p} sizes="100vw" />
            </div>
          ) : null}
          <div className="sk-wrap sk-book-grid">
            <div className="sk-book-copy">
              <Head kicker={s.kind === "reservation" ? w(c).book : c.t.kick.booking} title={s.title} />
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Reach c={c} className="z-reach sk-reach" />
            </div>
            <div className="sk-glass" data-rv>
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" className="z-form sk-form" />
            </div>
          </div>
        </section>
      );
    },
    contact: (s, c) => {
      const details = (
        <>
          {s.body ? <p data-rv>{s.body}</p> : null}
          <Reach c={c} className="z-reach sk-reach" />
          {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? <Hours c={c} /> : null}
        </>
      );
      // Without a form the details stand in a glass panel opposite the heading.
      return (
        <section className="sk-sec" id={s.id}>
          <div className="sk-wrap sk-contact">
            <div className="sk-contact-copy">
              <Head kicker={c.t.kick.contact} title={s.title} />
              {s.showForm ? details : null}
            </div>
            {s.showForm ? (
              <div className="sk-glass" data-rv>
                <DemoForm c={c} kind="message" uid={`f-${s.id}`} className="z-form sk-form" />
              </div>
            ) : (
              <div className="sk-glass sk-contact-copy" data-rv>
                {details}
              </div>
            )}
          </div>
        </section>
      );
    },
    statement: (s, c) => (
      <section className="sk-sec sk-state" id={s.id}>
        <div className="sk-wrap">
          <h2 data-px>{em(s.title)}</h2>
          {s.note ? (
            <p className={c.fam.cls.eyebrow} data-rv>
              {s.note}
            </p>
          ) : null}
        </div>
      </section>
    ),
    showcase: (s, c) => {
      const p = c.photo(s.image);
      return (
        <section className={`sk-show${p ? " has-pic" : ""}`} id={s.id}>
          {p ? (
            <div className="sk-show-media" data-px>
              <Pic p={p} sizes="100vw" />
            </div>
          ) : null}
          <div className="sk-wrap sk-show-in">
            <p className="sk-kick" data-rv>
              {c.t.kick.showcase}
            </p>
            <h2 data-rv>
              <span className="sk-in">{em(s.title)}</span>
            </h2>
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
