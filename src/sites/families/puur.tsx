import type { ReactNode } from "react";
import { NowBadge, TODAY_JS } from "./today";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, long, Pic, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Puur: an original template (no portfolio demo). Soft and reassuring care: white, calm
 * periwinkle and peach, a friendly rounded sans with a soft serif for the words that matter,
 * very large radii and slow floating shapes. The headline breathes in word by word, the
 * photograph opens like a capsule and an appointment card floats over it; a visit is told
 * along a path that draws itself as you read, with a little dot walking from step to step.
 * Questions open in warm cards. Made for dentists, physiotherapists, clinics, therapists and
 * dietitians: places where people would like to feel at ease before they arrive.
 */

const CSS = `
.d-puur{--white:#ffffff;--mist:#f6f7fe;--peri-50:#eff1fd;--peri-100:#e1e5fb;--peri-200:#c9cff7;--peri:#8a95ee;--peri-d:#4f5bd5;--peri-dd:#3c46ad;--ink:#232a52;--ink-2:#3b4266;--dim:#646a8a;--peach-50:#fff5ef;--peach-100:#ffe5d8;--peach:#f8bb9e;--peach-d:#df7f58;--line:rgba(35,42,82,.1);--shadow:0 24px 60px -30px rgba(60,70,173,.35);--shadow-s:0 10px 30px -18px rgba(60,70,173,.35);--pad:clamp(18px,4.4vw,64px);--soft:cubic-bezier(.25,.8,.25,1);--out:cubic-bezier(.16,1,.3,1);--sans:"Manrope",system-ui,sans-serif;--serif:"Fraunces Soft",Georgia,serif;--z-bg2:var(--mist);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--peri-d);--z-on-accent:#ffffff;--z-display:var(--sans);--z-display-weight:700;--z-radius:28px;--z-field-radius:16px;--z-ico-radius:50%;--z-sec:clamp(76px,9vw,140px);--z-h3:clamp(19px,1.5vw,22px);--z-statement:clamp(30px,3.8vw,54px);background:var(--white);color:var(--ink-2);font-family:var(--sans);font-size:clamp(16px,1.04vw,17.5px);font-weight:450;line-height:1.7}
.d-puur h1,.d-puur h2,.d-puur h3{font-family:var(--sans);font-weight:700;letter-spacing:-.03em;line-height:1.1;color:var(--ink)}
.d-puur h3{letter-spacing:-.015em;line-height:1.25}
.d-puur h2{font-size:clamp(34px,4.3vw,62px)}
.d-puur h2.is-long{font-size:clamp(28px,3.2vw,46px)}
.d-puur h1 em,.d-puur h2 em,.d-puur .pu-serif{font-family:var(--serif);font-style:italic;font-weight:400;font-variation-settings:"SOFT" 100,"WONK" 0;letter-spacing:-.01em;color:var(--peri-d)}
.d-puur ::selection{background:var(--peach-100);color:var(--ink)}
.d-puur .pu-wrap{position:relative;width:min(100%,1280px);margin-inline:auto;padding-inline:var(--pad)}
.d-puur .pu-kick{display:inline-flex;align-items:center;gap:9px;justify-self:start;width:max-content;max-width:100%;padding:7px 15px 7px 11px;border-radius:999px;background:var(--peri-50);color:var(--peri-dd);font-size:13.5px;font-weight:650;letter-spacing:.01em;line-height:1.3}
.d-puur .pu-kick::before{content:"";flex:none;width:8px;height:8px;border-radius:50%;background:var(--peach-d)}
.d-puur .btn{position:relative;border:0;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:56px;padding:0 26px;border-radius:999px;font-size:15.5px;font-weight:700;letter-spacing:-.005em;line-height:1.1;white-space:nowrap;transition:background-color .3s,color .3s,box-shadow .4s,transform .5s var(--out)}
.d-puur .btn svg{width:18px;height:18px;transition:transform .5s var(--out)}
.d-puur .btn:hover svg{transform:translateX(4px)}
.d-puur .pu-fill{background:var(--peri-d);color:#fff;box-shadow:0 14px 30px -14px rgba(79,91,213,.75)}
.d-puur .pu-fill:hover{background:var(--peri-dd);transform:translateY(-2px);box-shadow:0 18px 36px -16px rgba(79,91,213,.85)}
.d-puur .pu-soft{background:#fff;color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--peri-100)}
.d-puur .pu-soft:hover{background:var(--peach-50);box-shadow:inset 0 0 0 1.5px var(--peach);transform:translateY(-2px)}
.d-puur .pu-text{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:700;color:var(--ink);text-decoration:underline;text-decoration-color:var(--peach);text-decoration-thickness:2px;text-underline-offset:6px;transition:color .3s,text-decoration-color .3s}
.d-puur .pu-text:hover{color:var(--peri-d);text-decoration-color:var(--peri-d)}
.d-puur .pu-ico{display:grid;flex:none;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--peri-50);color:var(--peri-d);transition:box-shadow .5s var(--out),transform .5s var(--out),background-color .3s}
.d-puur .pu-ico svg{width:21px;height:21px}
.d-puur .pu-ico.is-peach{background:var(--peach-50);color:var(--peach-d)}
.d-puur .pu-blob{position:absolute;z-index:0;pointer-events:none}
.d-puur .pu-blob i{display:block;width:100%;height:100%;border-radius:46% 54% 60% 40%/52% 44% 56% 48%;background:radial-gradient(circle at 35% 35%,var(--peri-100),var(--peri-50) 70%);animation:pu-morph 22s ease-in-out infinite alternate,pu-drift 28s ease-in-out infinite alternate;animation-delay:calc(var(--i,0) * -7s)}
.d-puur .pu-blob.is-peach i{background:radial-gradient(circle at 40% 40%,var(--peach-100),var(--peach-50) 72%)}
.d-puur .pu-blob[data-px]{transform:translateY(calc(var(--p,0) * 50px))}
.d-puur .pu-hdr{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.86);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);transition:box-shadow .4s}
.d-puur.is-scrolled .pu-hdr{box-shadow:0 1px 0 var(--line),0 12px 30px -24px rgba(60,70,173,.4)}
.d-puur .pu-bar{display:flex;align-items:center;justify-content:space-between;gap:20px;height:84px;transition:height .45s var(--out)}
.d-puur.is-scrolled .pu-bar{height:70px}
.d-puur .pu-logo{display:flex;align-items:center;gap:12px;min-width:0;font-size:clamp(17px,1.3vw,19px);font-weight:800;letter-spacing:-.025em;color:var(--ink)}
.d-puur .pu-logo span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-puur .pu-mark{position:relative;display:grid;flex:none;place-items:center;width:44px;height:44px;border-radius:46% 54% 52% 48%/56% 46% 54% 44%;background:linear-gradient(140deg,var(--peri),var(--peri-d));color:#fff;font-family:var(--serif);font-size:23px;font-style:italic;font-weight:400;font-variation-settings:"SOFT" 100;transition:border-radius .8s var(--out),transform .8s var(--out)}
.d-puur .pu-mark::after{content:"";position:absolute;right:-2px;bottom:2px;width:13px;height:13px;border:2.5px solid #fff;border-radius:50%;background:var(--peach)}
.d-puur .pu-logo:hover .pu-mark{border-radius:54% 46% 44% 56%/46% 56% 44% 54%;transform:rotate(-8deg)}
.d-puur .pu-links{display:none;gap:2px}
.d-puur .pu-links a{padding:10px 16px;border-radius:999px;font-size:15px;font-weight:600;color:var(--ink-2);transition:background-color .3s,color .3s}
.d-puur .pu-links a:hover{background:var(--peach-50);color:var(--ink)}
.d-puur .pu-acts{display:none;align-items:center;gap:10px}
.d-puur .pu-call{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:0 14px 0 4px;border-radius:999px;font-weight:700;color:var(--ink);transition:background-color .3s}
.d-puur .pu-call .pu-ico{width:40px;height:40px}
.d-puur .pu-call .pu-ico svg{width:17px;height:17px}
.d-puur .pu-call:hover{background:var(--peri-50)}
.d-puur .pu-acts .btn{min-height:48px;padding:0 22px;font-size:15px}
.d-puur .pu-burger{display:inline-flex;flex:none;align-items:center;gap:10px;min-height:48px;padding:0 8px 0 18px;border:0;border-radius:999px;background:var(--peri-50);color:var(--ink);font-size:15px;font-weight:700}
.d-puur .pu-burger i{display:grid;place-content:center;gap:5px;width:34px;height:34px;border-radius:50%;background:#fff}
.d-puur .pu-burger i::before,.d-puur .pu-burger i::after{content:"";display:block;width:15px;height:2px;border-radius:2px;background:currentColor}
@media (min-width:1080px){.d-puur .pu-links,.d-puur .pu-acts{display:flex}.d-puur .pu-burger{display:none}}
.d-puur .pu-menu{position:fixed;inset:0;z-index:60;visibility:hidden;transition:visibility 0s .6s}
.d-puur .pu-menu.is-open{visibility:visible;transition:none}
.d-puur .pu-scrim{position:absolute;inset:0;background:rgba(35,42,82,.32);opacity:0;transition:opacity .5s}
.d-puur .pu-menu.is-open .pu-scrim{opacity:1}
.d-puur .pu-sheet{position:absolute;left:0;right:0;bottom:0;display:grid;gap:20px;max-height:88vh;max-height:88svh;padding:14px var(--pad) calc(96px + env(safe-area-inset-bottom));overflow-y:auto;border-radius:34px 34px 0 0;background:#fff;box-shadow:0 -20px 60px -20px rgba(35,42,82,.35);transform:translateY(105%);transition:transform .6s var(--out)}
.d-puur .pu-menu.is-open .pu-sheet{transform:none}
.d-puur .pu-grip{display:flex;justify-content:space-between;align-items:center}
.d-puur .pu-grip::before{content:"";width:44px;height:5px;border-radius:5px;background:var(--peri-100)}
.d-puur .pu-close{display:grid;place-items:center;width:48px;height:48px;border:0;border-radius:50%;background:var(--peri-50);color:var(--ink);font-size:24px;line-height:1}
.d-puur .pu-sheet nav{display:grid;gap:6px}
.d-puur .pu-sheet nav a{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:60px;padding:8px 10px 8px 20px;border-radius:20px;background:var(--mist);font-size:clamp(19px,5vw,24px);font-weight:700;letter-spacing:-.02em;color:var(--ink);opacity:0;transform:translateY(16px);transition:opacity .4s,transform .6s var(--out),background-color .3s}
.d-puur .pu-sheet nav a svg{width:20px;height:20px;flex:none;color:var(--peri-d)}
.d-puur .pu-sheet nav a:hover{background:var(--peach-50)}
.d-puur .pu-menu.is-open nav a{opacity:1;transform:none;transition-delay:calc(.15s + var(--i,0) * 55ms)}
.d-puur .pu-sheet-foot{display:grid;gap:12px}
.d-puur .pu-sheet-foot .btn{width:100%}
.d-puur .pu-hero{position:relative;padding:clamp(28px,4vw,64px) 0 0;overflow:hidden}
.d-puur .pu-hero .pu-blob.b1{left:-10%;top:2%;width:min(560px,70vw);aspect-ratio:1}
.d-puur .pu-hero .pu-blob.b2{right:-8%;top:6%;width:min(440px,56vw);aspect-ratio:1}
.d-puur .pu-hero .pu-blob.b3{left:30%;top:40%;width:min(300px,40vw);aspect-ratio:1;opacity:.7}
.d-puur .pu-hero-in{position:relative;z-index:1;display:grid;justify-items:center;gap:24px;text-align:center}
.d-puur .pu-hero-top{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;animation:pu-rise .9s var(--out) .1s both}
.d-puur .pu-now{display:inline-flex;align-items:center;gap:9px;padding:7px 15px 7px 12px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1.5px var(--peri-100);font-size:13.5px;font-weight:700;line-height:1.3;color:var(--ink)}
.d-puur .pu-now::before{content:"";width:9px;height:9px;border-radius:50%;background:var(--dim);box-shadow:0 0 0 4px rgba(100,106,138,.15)}
.d-puur .pu-now.is-open::before{background:#3fae7d;box-shadow:0 0 0 4px rgba(63,174,125,.18)}
.d-puur .pu-now.is-closed::before{background:var(--peach-d);box-shadow:0 0 0 4px rgba(223,127,88,.18)}
.d-puur .pu-hero h1{max-width:17ch;font-size:clamp(40px,6vw,88px);line-height:1.04;letter-spacing:-.04em}
.d-puur .pu-hero h1.is-m{max-width:20ch;font-size:clamp(36px,5vw,74px)}
.d-puur .pu-hero h1.is-s{max-width:22ch;font-size:clamp(32px,4.2vw,62px)}
.d-puur .pu-w{display:inline-block;opacity:0;filter:blur(14px);transform:translateY(.22em) scale(.97);animation:pu-breathe 1.5s var(--soft) both;animation-delay:calc(.2s + var(--i,0) * 80ms)}
.d-puur .pu-hl{position:relative;display:inline;white-space:normal}
.d-puur .pu-hl .pu-w{font-family:var(--serif);font-style:italic;font-weight:400;font-variation-settings:"SOFT" 100,"WONK" 0;letter-spacing:-.01em;color:var(--peri-d)}
.d-puur .pu-hl .pu-w::after{content:"";position:absolute;left:-.08em;right:-.08em;bottom:.06em;z-index:-1;height:.36em;border-radius:1em;background:var(--peach-100);transform:scaleX(0);transform-origin:left;animation:pu-grow 1s var(--out) both;animation-delay:calc(1s + var(--i,0) * 80ms)}
.d-puur .pu-hl .pu-w{position:relative;z-index:0}
.d-puur .pu-lede{max-width:50ch;font-size:clamp(17px,1.35vw,20px);line-height:1.6;color:var(--dim);animation:pu-rise 1s var(--out) .8s both}
.d-puur .pu-cta-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:12px 18px;animation:pu-rise 1s var(--out) .95s both}
.d-puur .pu-stage{position:relative;z-index:1;margin-top:clamp(40px,5vw,72px)}
.d-puur .pu-cap{position:relative;aspect-ratio:4/5;overflow:hidden;border-radius:999px 999px 40px 40px;background:linear-gradient(160deg,var(--peri-100),var(--peach-100));clip-path:inset(0 32% 0 32% round 999px);animation:pu-open 1.6s var(--soft) .55s forwards}
@media (min-width:760px){.d-puur .pu-cap{aspect-ratio:12/5;border-radius:999px}}
.d-puur .pu-cap img{width:100%;height:100%;object-fit:cover;scale:1.14;transform:translateY(calc(var(--p,0) * -3%));animation:pu-settle 2.4s var(--out) .55s forwards}
.d-puur .pu-cap.is-empty{display:grid;place-items:center}@media (min-width:760px){.d-puur .pu-cap.is-empty{justify-items:start;padding-left:18%}}
.d-puur .pu-cap.is-empty>b{position:relative;z-index:1;font-family:var(--serif);font-size:clamp(150px,22vw,320px);font-style:italic;font-weight:300;font-variation-settings:"SOFT" 100;line-height:1;color:#fff;text-shadow:0 20px 60px rgba(79,91,213,.25)}
.d-puur .pu-cap.is-empty .pu-blob{width:46%;aspect-ratio:1}
.d-puur .pu-cap.is-empty .pu-blob.b4{left:8%;top:12%}
.d-puur .pu-cap.is-empty .pu-blob.b5{right:6%;bottom:-6%;opacity:.8}
.d-puur .pu-cap.is-empty .pu-blob i{background:radial-gradient(circle at 40% 40%,rgba(255,255,255,.75),rgba(255,255,255,0) 70%)}
.d-puur .pu-appt{position:relative;z-index:2;display:grid;gap:16px;width:min(100% - 24px,400px);margin:-80px auto 0;padding:22px;border-radius:30px;background:#fff;box-shadow:var(--shadow);text-align:left;animation:pu-card 1.1s var(--out) 1.4s both}
.d-puur .pu-appt-in{display:grid;gap:16px;animation:pu-bob 9s ease-in-out 2.6s infinite}
@media (min-width:760px){.d-puur .pu-appt{position:absolute;right:clamp(24px,5vw,80px);bottom:-46px;margin:0}}
.d-puur .pu-appt-top{display:flex;align-items:center;gap:14px}
.d-puur .pu-appt-top>div{display:grid;gap:4px}
.d-puur .pu-appt-top b{font-size:17px;font-weight:800;letter-spacing:-.02em;color:var(--ink);line-height:1.2}
.d-puur .pu-appt-top .pu-now{justify-self:start;padding:3px 10px 3px 8px;font-size:12.5px;box-shadow:none;background:var(--mist)}
.d-puur .pu-appt dl{display:grid;gap:2px;padding:6px 0;border-block:1px dashed var(--peri-100)}
.d-puur .pu-appt dl>div{display:flex;align-items:center;gap:12px;padding:7px 0}
.d-puur .pu-appt dt{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.d-puur .pu-appt dd{margin:0;font-size:14.5px;font-weight:600;line-height:1.35;color:var(--ink-2)}
.d-puur .pu-appt dl .pu-ico{width:34px;height:34px}
.d-puur .pu-appt dl .pu-ico svg{width:16px;height:16px}
.d-puur .pu-appt .btn{width:100%}
.d-puur .pu-reas{position:relative;z-index:1;display:flex;flex-wrap:wrap;justify-content:center;gap:10px 12px;margin-top:clamp(40px,5vw,96px);padding-bottom:clamp(40px,5vw,72px)}
@media (min-width:760px){.d-puur .pu-reas{justify-content:flex-start;max-width:calc(100% - 460px)}}
.d-puur .pu-reas li{display:inline-flex;align-items:center;gap:10px;padding:8px 18px 8px 8px;border-radius:999px;background:var(--mist);font-weight:650;font-size:15px;color:var(--ink);animation:pu-rise .9s var(--out) both;animation-delay:calc(1.7s + var(--i,0) * 100ms);transition:background-color .3s,transform .5s var(--out)}
.d-puur .pu-reas li:hover{background:var(--peach-50);transform:translateY(-2px)}
.d-puur .pu-reas .pu-ico{width:32px;height:32px;background:#fff}
.d-puur .pu-reas .pu-ico svg{width:15px;height:15px}
.d-puur .pu-sec{position:relative;padding-block:clamp(80px,9vw,140px);overflow-x:clip}
.d-puur .pu-panel{margin-inline:clamp(8px,1.4vw,20px);border-radius:clamp(30px,4vw,56px);background:var(--mist);overflow:hidden}
.d-puur .pu-panel.is-peach{background:var(--peach-50)}
.d-puur .pu-panel .pu-blob{opacity:.8}
.d-puur .pu-blob.b8{left:-10%;top:-12%;width:min(460px,70vw);aspect-ratio:1}
.d-puur .pu-blob.b9{right:-12%;top:18%;width:min(480px,70vw);aspect-ratio:1}
.d-puur .pu-blob.b10{left:-12%;bottom:-24%;width:min(460px,70vw);aspect-ratio:1}
.d-puur .pu-head{position:relative;z-index:1;display:grid;gap:18px;max-width:720px;margin-bottom:clamp(40px,5vw,72px)}
.d-puur .pu-head.is-center{justify-items:center;margin-inline:auto;text-align:center}
.d-puur .pu-head.is-center .pu-kick{justify-self:center}
.d-puur .pu-head>p:not(.pu-kick){max-width:54ch;font-size:clamp(16.5px,1.2vw,18.5px);color:var(--dim)}
.demo-js .d-puur .pu-head h2[data-rv]{filter:blur(8px);transition:opacity .9s var(--soft),transform .9s var(--soft),filter .9s var(--soft)}
.demo-js .d-puur .pu-head h2[data-rv].in{filter:none}
.d-puur .pu-about{position:relative;z-index:1;display:grid;gap:clamp(48px,6vw,96px);align-items:center}
@media (min-width:920px){.d-puur .pu-about{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.d-puur .pu-about.is-solo{max-width:820px;margin-inline:auto;padding:clamp(32px,5vw,72px);border-radius:44px;background:var(--mist);grid-template-columns:minmax(0,1fr)}
.d-puur .pu-pics{position:relative;padding:0 12% 12% 0}
.d-puur .pu-pics>.pu-blob{right:-4%;top:-6%;width:62%;aspect-ratio:1}
.d-puur .pu-pics>figure{position:relative;z-index:1;aspect-ratio:4/5;overflow:hidden;border-radius:40px;background:var(--peri-50)}
.d-puur .pu-pics>figure img{width:100%;height:108%;object-fit:cover;transform:translateY(calc(var(--p,0) * -3%))}
.d-puur .pu-pics>figure+figure{position:absolute;right:0;bottom:0;z-index:2;width:44%;aspect-ratio:1;border:8px solid #fff;border-radius:50%;box-shadow:var(--shadow-s)}
.d-puur .pu-about-copy{display:grid;gap:20px}
.d-puur .pu-lead{font-size:clamp(19px,1.6vw,23px);font-weight:500;line-height:1.55;color:var(--ink)}
.d-puur .pu-about-copy>p:not(.pu-lead){color:var(--dim)}
.d-puur .pu-checks{display:grid;gap:12px;margin-top:6px}
.d-puur .pu-checks li{display:flex;align-items:center;gap:14px;font-weight:650;color:var(--ink)}
.d-puur .pu-checks .pu-ico{width:38px;height:38px}
.d-puur .pu-checks .pu-ico svg{width:17px;height:17px}
.d-puur .pu-cards{position:relative;z-index:1;display:grid;gap:clamp(16px,2vw,24px);grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr))}
.d-puur .pu-card{display:grid;gap:14px;align-content:start;height:100%;padding:clamp(22px,2.4vw,30px);border-radius:30px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);transition:transform .6s var(--out),box-shadow .5s}
.d-puur .pu-card:hover{transform:translateY(-6px);box-shadow:inset 0 0 0 1px transparent,var(--shadow)}
.d-puur .pu-card:hover .pu-ico{box-shadow:0 0 0 8px var(--peri-50);transform:scale(1.04)}
.d-puur .pu-card:hover .pu-ico.is-peach{box-shadow:0 0 0 8px var(--peach-50)}
.d-puur .pu-card .pu-ico{width:58px;height:58px}
.d-puur .pu-card .pu-ico svg{width:24px;height:24px}
.d-puur .pu-card>p{color:var(--dim)}
.d-puur .pu-card-pic{margin:calc(clamp(22px,2.4vw,30px) * -1 + 8px) calc(clamp(22px,2.4vw,30px) * -1 + 8px) 4px;aspect-ratio:16/10;overflow:hidden;border-radius:24px;background:var(--peri-50)}
.d-puur .pu-card-pic img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s var(--out)}
.d-puur .pu-card:hover .pu-card-pic img{transform:scale(1.05)}
.d-puur .pu-card-pic+.pu-ico{margin-top:-44px;margin-left:12px;box-shadow:0 0 0 6px #fff}
.d-puur .pu-card:hover .pu-card-pic+.pu-ico{box-shadow:0 0 0 6px #fff,0 0 0 12px var(--peri-50)}
.d-puur .pu-card:hover .pu-card-pic+.pu-ico.is-peach{box-shadow:0 0 0 6px #fff,0 0 0 12px var(--peach-50)}
.d-puur .pu-meta{display:flex;flex-wrap:wrap;gap:8px}
.d-puur .pu-meta span{padding:4px 12px;border-radius:999px;background:var(--peach-50);font-size:13.5px;font-weight:700;color:var(--ink)}
.d-puur .pu-meta span+span{background:var(--peri-50)}
.d-puur .pu-feats{position:relative;z-index:1;display:grid;gap:clamp(28px,3vw,44px);grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))}
.d-puur .pu-feats li{display:grid;justify-items:center;gap:14px;text-align:center}
.d-puur .pu-feats .pu-ico{position:relative;width:76px;height:76px;margin-bottom:6px;border-radius:46% 54% 58% 42%/52% 46% 54% 48%;background:#fff;box-shadow:var(--shadow-s);transition:border-radius 1s var(--out),transform .8s var(--out)}
.d-puur .pu-feats .pu-ico svg{width:28px;height:28px}
.d-puur .pu-feats li:nth-child(even) .pu-ico{color:var(--peach-d)}
.d-puur .pu-feats li:hover .pu-ico{border-radius:54% 46% 42% 58%/46% 56% 44% 54%;transform:translateY(-4px) rotate(-6deg)}
.d-puur .pu-feats p{max-width:34ch;color:var(--dim)}
.d-puur .pu-path{position:relative;z-index:1;max-width:1080px;margin-inline:auto}
.d-puur .pu-path-art{position:absolute;top:0;bottom:0;left:0;width:56px;pointer-events:none}
.d-puur .pu-path-art svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.d-puur .pu-path-art::before{content:"";position:absolute;left:50%;top:28px;bottom:28px;border-left:2.5px dashed var(--peri-200);transform:translateX(-50%)}
.d-puur .pu-path.is-ready .pu-path-art::before{display:none}
.d-puur .pu-path-bg{fill:none;stroke:var(--peri-100);stroke-width:3;stroke-linecap:round;stroke-dasharray:2 10}
.d-puur .pu-path-line{fill:none;stroke:var(--peri-d);stroke-width:3;stroke-linecap:round}
.d-puur .pu-path-dot{position:absolute;left:-11px;top:-11px;width:22px;height:22px;border:5px solid #fff;border-radius:50%;background:var(--peach-d);box-shadow:0 6px 16px -4px rgba(223,127,88,.6);opacity:0;transition:opacity .4s}
.d-puur .pu-path.is-ready .pu-path-dot{opacity:1}
.d-puur .pu-stops{display:grid;gap:clamp(22px,3vw,36px)}
.d-puur .pu-stop{display:grid;grid-template-columns:56px minmax(0,1fr);column-gap:18px;align-items:start}
.d-puur .pu-node{position:relative;z-index:1;display:grid;place-items:center;width:56px;height:56px;margin-top:14px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2px var(--peri-100);font-family:var(--serif);font-size:24px;font-style:italic;font-variation-settings:"SOFT" 100;color:var(--peri-d);transition:background-color .5s,color .5s,box-shadow .5s,transform .6s var(--out)}
.d-puur .pu-stop.is-on .pu-node{background:var(--peri-d);color:#fff;box-shadow:0 0 0 8px var(--peri-100);transform:scale(1.05)}
.d-puur .pu-stop-card{display:grid;gap:8px;padding:clamp(20px,2.4vw,30px);border-radius:28px;background:#fff;box-shadow:var(--shadow-s);transition:transform .6s var(--out),box-shadow .5s}
.d-puur .pu-stop-card:hover{transform:translateY(-4px);box-shadow:var(--shadow)}
.d-puur .pu-stop-card p{color:var(--dim)}
@media (min-width:900px){.d-puur .pu-path-art{left:50%;width:180px;transform:translateX(-50%)}.d-puur .pu-stop{grid-template-columns:minmax(0,1fr) 180px minmax(0,1fr);column-gap:0}.d-puur .pu-node{grid-column:2;grid-row:1;justify-self:center;width:64px;height:64px;margin-top:22px;font-size:27px}.d-puur .pu-stop-card{grid-row:1;grid-column:1;text-align:right}.d-puur .pu-stop:nth-child(even) .pu-stop-card{grid-column:3;text-align:left}.d-puur .pu-stops{gap:clamp(24px,3vw,44px)}}
.d-puur .pu-gal{position:relative;z-index:1;display:grid;gap:clamp(10px,1.4vw,20px);grid-template-columns:repeat(2,minmax(0,1fr))}
.d-puur .pu-gal figure{overflow:hidden;aspect-ratio:1;border-radius:32px;background:var(--peri-50)}
.d-puur .pu-gal figure:nth-child(3n+1){aspect-ratio:4/5;border-radius:999px 999px 32px 32px}
.d-puur .pu-gal figure:nth-child(3n){border-radius:50%}
.d-puur .pu-gal img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s var(--out)}
.d-puur .pu-gal figure:hover img{transform:scale(1.06)}
@media (min-width:900px){.d-puur .pu-gal{grid-template-columns:repeat(3,minmax(0,1fr));align-items:center}}
.d-puur .pu-split{position:relative;z-index:1;display:grid;gap:clamp(40px,5vw,80px);align-items:start}
@media (min-width:940px){.d-puur .pu-split{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-puur .pu-split-copy{display:grid;gap:22px;align-content:start}
.d-puur .pu-split-copy>p{max-width:46ch;color:var(--dim)}.d-puur .pu-split-copy .pu-head,.d-puur .pu-about-copy .pu-head{margin-bottom:4px}.d-puur .pu-split.is-solo{grid-template-columns:minmax(0,1fr)}.d-puur .pu-split.is-solo .pu-reach{grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}
.d-puur .pu-hcard{position:relative;display:grid;gap:14px;padding:clamp(22px,3vw,38px);border-radius:34px;background:#fff;box-shadow:var(--shadow)}
.d-puur .pu-hcard-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}
.d-puur .pu-hcard-top>div{display:flex;align-items:center;gap:14px}
.d-puur .pu-hcard-top h3{font-size:21px}
.d-puur .pu-hcard .z-hours{border:0}
.d-puur .pu-hcard .z-hours div{align-items:center;margin:0 -14px;padding:12px 14px;border:0;border-radius:16px;transition:background-color .3s}
.d-puur .pu-hcard .z-hours div+div{box-shadow:0 -1px 0 var(--line)}
.d-puur .pu-hcard .z-hours dt{font-weight:650;color:var(--ink)}
.d-puur .z-hours div.is-today{background:var(--peri-50);box-shadow:none!important;color:var(--peri-dd)}
.d-puur .z-hours div.is-today dt::after{content:"";display:inline-block;width:8px;height:8px;margin-left:10px;border-radius:50%;background:var(--peach-d);vertical-align:.12em}
.d-puur .z-hours div.is-today+div{box-shadow:none!important}
.d-puur .z-hours div.is-today dd{color:var(--peri-dd);font-weight:700}
.d-puur .pu-reach{display:grid;gap:10px;font-style:normal}
.d-puur .pu-reach>*{display:flex;align-items:center;gap:14px;min-height:56px;padding:6px 18px 6px 6px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);font-weight:600;color:var(--ink);transition:box-shadow .4s,transform .5s var(--out)}
.d-puur .pu-reach>a:hover{box-shadow:inset 0 0 0 1px transparent,var(--shadow-s);transform:translateX(4px)}
.d-puur .pu-reach .pu-ico{width:44px;height:44px}
.d-puur .pu-reach .pu-ico svg{width:19px;height:19px}
.d-puur .pu-reach span:last-child{min-width:0;overflow-wrap:anywhere}
.d-puur .pu-book{position:relative;overflow:hidden;border-radius:36px;background:#fff;box-shadow:var(--shadow)}
.d-puur .pu-book-top{position:relative;display:flex;align-items:center;gap:16px;padding:clamp(20px,2.6vw,30px) clamp(22px,3vw,38px);background:linear-gradient(120deg,var(--peri-50),var(--peach-50))}
.d-puur .pu-book-top .pu-ico{width:56px;height:56px;background:#fff}
.d-puur .pu-book-top b{display:block;font-size:19px;font-weight:800;letter-spacing:-.02em;color:var(--ink);line-height:1.25}
.d-puur .pu-book-top small{display:block;font-size:14px;color:var(--dim)}
.d-puur .pu-book-body{padding:clamp(22px,3vw,38px)}
.d-puur .pu-book .z-form{gap:18px}
.d-puur .z-field label,.d-puur .z-chipset legend{font-size:13.5px;font-weight:700;letter-spacing:0;text-transform:none;color:var(--ink-2)}
.d-puur .z-field input,.d-puur .z-field select,.d-puur .z-field textarea{min-height:54px;padding:13px 18px;border:1.5px solid var(--peri-100);border-radius:16px;background:var(--mist);font-size:16px;color:var(--ink);transition:border-color .3s,background-color .3s,box-shadow .3s}
.d-puur .z-field select{padding-right:44px;background:var(--mist) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%234f5bd5' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") right 18px center/12px 8px no-repeat}
.d-puur .z-field input:hover,.d-puur .z-field select:hover,.d-puur .z-field textarea:hover{border-color:var(--peri-200)}
.d-puur .z-field input:focus,.d-puur .z-field select:focus,.d-puur .z-field textarea:focus{border-color:var(--peri-d);background-color:#fff;box-shadow:0 0 0 5px var(--peri-50);outline:none}
.d-puur .z-field :focus-visible{outline:none}
.d-puur .z-form .btn{min-height:58px}
.d-puur .form-note{color:var(--dim)}
.d-puur .form-status{border:0;border-radius:16px;background:var(--peach-50);color:var(--ink)}
.d-puur .z-chips button{border-radius:999px}
.d-puur .pu-faq{position:relative;z-index:1;display:grid;gap:12px;max-width:880px;margin-inline:auto}
.d-puur .pu-faq details{border-radius:24px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);transition:background-color .4s,box-shadow .4s}
.d-puur .pu-faq details:hover{box-shadow:inset 0 0 0 1px var(--peri-200)}
.d-puur .pu-faq details[open]{background:var(--peach-50);box-shadow:inset 0 0 0 1px var(--peach-100)}
.d-puur .pu-faq summary{display:flex;align-items:center;gap:16px;min-height:72px;padding:12px 14px 12px 14px;cursor:pointer;list-style:none;font-size:clamp(16.5px,1.3vw,19px);font-weight:700;letter-spacing:-.015em;color:var(--ink)}
.d-puur .pu-faq summary::-webkit-details-marker{display:none}
.d-puur .pu-faq summary>span{flex:1}
.d-puur .pu-faq summary .pu-q{display:grid;flex:none;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--peri-50);font-family:var(--serif);font-size:22px;font-style:italic;font-weight:400;font-variation-settings:"SOFT" 100;color:var(--peri-d);transition:background-color .4s,color .4s}
.d-puur .pu-faq details[open] .pu-q{background:#fff;color:var(--peach-d)}
.d-puur .pu-faq summary i{position:relative;display:grid;flex:none;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--mist);transition:transform .5s var(--out),background-color .4s}
.d-puur .pu-faq summary i::before,.d-puur .pu-faq summary i::after{content:"";position:absolute;width:14px;height:2px;border-radius:2px;background:var(--ink);transition:transform .5s var(--out)}
.d-puur .pu-faq summary i::after{transform:rotate(90deg)}
.d-puur .pu-faq details[open] summary i{background:#fff;transform:rotate(180deg)}
.d-puur .pu-faq details[open] summary i::after{transform:rotate(180deg)}
.d-puur .pu-faq details>p{padding:0 24px 24px 74px;max-width:70ch;color:var(--ink-2);animation:pu-rise .6s var(--out)}
@media (max-width:560px){.d-puur .pu-faq details>p{padding-left:24px}}
.d-puur .pu-chan{position:relative;z-index:1;display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.d-puur .pu-chan a{display:grid;gap:12px;align-content:start;height:100%;padding:28px;border-radius:30px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);transition:transform .6s var(--out),box-shadow .5s}
.d-puur .pu-chan a:hover{transform:translateY(-6px);box-shadow:var(--shadow)}
.d-puur .pu-chan a:hover .pu-ico{box-shadow:0 0 0 8px var(--peri-50)}
.d-puur .pu-chan p{color:var(--dim)}
.d-puur .pu-chan small{display:inline-flex;align-items:center;gap:8px;margin-top:4px;font-size:14.5px;font-weight:700;color:var(--peri-d)}
.d-puur .pu-chan small svg{width:16px;height:16px;transition:transform .5s var(--out)}
.d-puur .pu-chan a:hover small svg{transform:translateX(4px)}
.d-puur .pu-dishes{display:grid;gap:10px}
.d-puur .pu-dishes li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 16px;padding:12px 0;border-bottom:1px dashed var(--peri-100)}
.d-puur .pu-dishes li:last-child{border-bottom:0}
.d-puur .pu-dishes b{font-weight:700;color:var(--ink)}
.d-puur .pu-dishes span{font-weight:700;color:var(--peri-d);white-space:nowrap}
.d-puur .pu-dishes p{grid-column:1/-1;font-size:.94em;color:var(--dim)}
.d-puur .z-sec.z-cta{margin-inline:clamp(8px,1.4vw,20px);border-radius:clamp(30px,4vw,56px);background:linear-gradient(130deg,var(--peri-50),var(--peach-50))}
.d-puur .z-cta h2{font-size:clamp(34px,4.6vw,66px)}
.d-puur .z-statement h2{font-family:var(--serif);font-style:italic;font-weight:300;font-variation-settings:"SOFT" 100,"WONK" 0;letter-spacing:-.02em;line-height:1.2}
.d-puur .z-statement h2 em{color:var(--peach-d)}
.d-puur .z-statement .pu-kick{order:-1;justify-self:center}.d-puur .z-center .pu-kick{justify-self:center}
.d-puur .z-showcase{margin-inline:clamp(8px,1.4vw,20px);border-radius:clamp(30px,4vw,56px)}
.d-puur .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(35,42,82,0) 30%,rgba(35,42,82,.7))}
.d-puur .z-showcase.has-pic h2{color:#fff}.d-puur .z-showcase.has-pic h2 em{color:var(--peach)}
.d-puur .z-showcase .pu-soft{background:rgba(255,255,255,.92)}
.d-puur .z-card{border:0;border-radius:30px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);transition:transform .6s var(--out),box-shadow .5s}
.d-puur .z-card:hover{transform:translateY(-6px);box-shadow:var(--shadow)}
.d-puur .z-pack.is-featured{background:linear-gradient(160deg,var(--peri-50),#fff 60%);box-shadow:inset 0 0 0 2px var(--peri-200)}
.d-puur .z-tag{justify-self:start;padding:5px 12px;border-radius:999px;background:var(--peach-100);font-size:12px;font-weight:700;letter-spacing:.02em;text-transform:none;color:var(--ink)}
.d-puur .z-pack-price b{color:var(--peri-d)}
.d-puur .z-ticks li::before{top:.5em;width:8px;height:8px;border-radius:50%;background:var(--peach)}
.d-puur .z-team .z-grid>li{justify-items:center;text-align:center}
.d-puur .z-team .z-pic{width:min(100%,260px);aspect-ratio:1;border-radius:50%;box-shadow:0 0 0 10px var(--peri-50)}
.d-puur .z-quotes blockquote{padding:30px;border:0;border-radius:30px;background:var(--mist)}
.d-puur .z-quotes blockquote>p{font-family:var(--serif);font-style:italic;font-weight:400;font-variation-settings:"SOFT" 100}
.d-puur .z-quotes footer a{color:var(--peri-d)}
.d-puur .z-ba{border-radius:32px}
.d-puur .z-ba::after{width:4px;background:#fff;box-shadow:0 0 0 1px rgba(35,42,82,.1)}
.d-puur .z-ba figcaption{border-radius:999px;background:rgba(35,42,82,.7)}
.d-puur .z-acc details{border:0}
.d-puur .z-rows small,.d-puur .z-steps small{font-family:var(--serif);font-size:20px;font-style:italic;letter-spacing:0;color:var(--peri-d)}
.d-puur .pu-foot{position:relative;margin-top:clamp(40px,5vw,80px);padding:clamp(64px,8vw,120px) 0 130px;border-radius:clamp(36px,5vw,64px) clamp(36px,5vw,64px) 0 0;background:var(--peri-50);color:var(--ink-2);overflow:hidden}
.d-puur .pu-foot .pu-blob.b6{right:-10%;top:-30%;width:min(520px,80vw);aspect-ratio:1}
.d-puur .pu-foot .pu-blob.b6 i{background:radial-gradient(circle at 40% 40%,var(--peach-100),rgba(255,229,216,0) 70%)}
.d-puur .pu-foot-cta{position:relative;z-index:1;display:grid;gap:22px;justify-items:start;padding:clamp(26px,4vw,52px);border-radius:36px;background:#fff;box-shadow:var(--shadow)}
@media (min-width:860px){.d-puur .pu-foot-cta{grid-template-columns:minmax(0,1fr) auto;align-items:center}}
.d-puur .pu-foot-cta p{font-size:clamp(24px,2.8vw,40px);font-weight:700;letter-spacing:-.03em;line-height:1.15;color:var(--ink)}
.d-puur .pu-foot-cta p em{font-family:var(--serif);font-style:italic;font-weight:400;font-variation-settings:"SOFT" 100;color:var(--peri-d)}
.d-puur .pu-foot-cta>div{display:flex;flex-wrap:wrap;gap:12px}
.d-puur .pu-foot-name{position:relative;z-index:1;margin-top:clamp(48px,6vw,88px);font-family:var(--serif);font-size:min(12vw,130px,calc(150vw / var(--n,10)));font-style:italic;font-weight:300;font-variation-settings:"SOFT" 100,"WONK" 0;letter-spacing:-.03em;line-height:1;color:var(--ink);overflow-wrap:anywhere}
.d-puur .pu-foot-name::after{content:"";display:inline-block;width:.18em;height:.18em;margin-left:.08em;border-radius:50%;background:var(--peach)}
.d-puur .pu-foot-grid{position:relative;z-index:1;display:grid;gap:32px;margin-top:clamp(36px,5vw,64px);grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}
.d-puur .pu-foot-grid h3{margin-bottom:10px;font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--peri-dd)}
.d-puur .pu-foot-grid a,.d-puur .pu-foot-grid span{display:flex;align-items:center;min-height:34px;color:var(--ink-2)}
.d-puur .pu-foot-grid a{transition:color .3s,transform .5s var(--out)}
.d-puur .pu-foot-grid a:hover{color:var(--peri-d);transform:translateX(4px)}
.d-puur .pu-foot-grid p{max-width:34ch}
.d-puur .pu-legal{position:relative;z-index:1;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:48px;padding-top:22px;border-top:1px solid rgba(35,42,82,.12);font-size:13px;color:var(--dim)}
@keyframes pu-breathe{to{opacity:1;filter:none;transform:none}}
@keyframes pu-grow{to{transform:none}}
@keyframes pu-rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes pu-open{to{clip-path:inset(0 0 0 0 round 0)}}
@keyframes pu-settle{to{scale:1}}
@keyframes pu-card{from{opacity:0;transform:translateY(40px) scale(.96)}to{opacity:1;transform:none}}
@keyframes pu-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes pu-morph{0%{border-radius:46% 54% 60% 40%/52% 44% 56% 48%}50%{border-radius:58% 42% 44% 56%/42% 58% 42% 58%}100%{border-radius:40% 60% 52% 48%/58% 50% 50% 42%}}
@keyframes pu-drift{0%{transform:translate(0,0) rotate(0)}100%{transform:translate(4%,6%) rotate(24deg)}}
@media (prefers-reduced-motion:reduce){.d-puur .pu-w,.d-puur .pu-hl .pu-w::after,.d-puur .pu-cap,.d-puur .pu-cap img,.d-puur .pu-appt,.d-puur .pu-appt-in,.d-puur .pu-blob i,.d-puur .pu-hero-top,.d-puur .pu-lede,.d-puur .pu-cta-row,.d-puur .pu-reas li{animation:none;opacity:1;filter:none;transform:none;clip-path:none;scale:1}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The visit path: a soft line is drawn through the step markers (measured, so it always meets
 * them), fills as the reader moves down, and a dot walks along it; steps light up as it passes.
 */
const JS = `(function(){var d=document,W=window,NS='http://www.w3.org/2000/svg',reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var paths=[].slice.call(d.querySelectorAll('[data-path]')).map(function(w){return{w:w,art:w.querySelector('.pu-path-art'),svg:w.querySelector('svg'),bg:w.querySelector('.pu-path-bg'),ln:w.querySelector('.pu-path-line'),dot:w.querySelector('.pu-path-dot'),stops:[].slice.call(w.querySelectorAll('.pu-stop')),L:0}});
function build(x){var a=x.art.getBoundingClientRect(),wd=a.width,ht=a.height;if(!wd||!ht)return;var cx=wd/2,amp=Math.min(wd*.42,64),pts=x.stops.map(function(s){var n=s.querySelector('.pu-node').getBoundingClientRect();return n.top+n.height/2-a.top});var dd='M'+cx+' 0',prev=0;pts.concat([ht]).forEach(function(y,k){var h=y-prev,s=k%2?-1:1;dd+=' C'+(cx+s*amp)+' '+(prev+h*.35)+' '+(cx+s*amp)+' '+(y-h*.35)+' '+cx+' '+y;prev=y});x.svg.setAttribute('viewBox','0 0 '+wd+' '+ht);x.bg.setAttribute('d',dd);x.ln.setAttribute('d',dd);x.L=x.ln.getTotalLength();x.ln.style.strokeDasharray=x.L;x.w.classList.add('is-ready');upd(x)}
function upd(x){if(!x.L)return;var r=x.w.getBoundingClientRect(),vh=W.innerHeight,p=reduce?1:Math.min(1,Math.max(0,(vh*.62-r.top)/r.height));x.ln.style.strokeDashoffset=(x.L*(1-p)).toFixed(1);var pt=x.ln.getPointAtLength(x.L*p);x.dot.style.transform='translate('+pt.x.toFixed(1)+'px,'+pt.y.toFixed(1)+'px)';var a=x.art.getBoundingClientRect();x.stops.forEach(function(s){var n=s.querySelector('.pu-node').getBoundingClientRect();s.classList.toggle('is-on',reduce||pt.y>=n.top+n.height/2-a.top-2)})}
function all(){paths.forEach(build)}var raf=0;
W.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(function(){raf=0;paths.forEach(upd)})},{passive:true});W.addEventListener('resize',all);W.addEventListener('load',all);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(all);all()})();`;

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const Blob = ({ cls, peach, n = 0, px }: { cls: string; peach?: boolean; n?: number; px?: boolean }) => (
  <span className={`pu-blob ${cls}${peach ? " is-peach" : ""}`} aria-hidden="true" style={i(n)} {...(px ? { "data-px": "" } : {})}>
    <i />
  </span>
);

const Kick = ({ children }: { children: ReactNode }) => (
  <p className="pu-kick" data-rv>
    {children}
  </p>
);

function Head({ kicker, title, intro, id, center }: { kicker?: string; title: string; intro?: string; id?: string; center?: boolean }) {
  return (
    <header className={`pu-head${center ? " is-center" : ""}`}>
      {kicker ? <Kick>{kicker}</Kick> : null}
      <h2 id={id} className={long(title)} data-rv>
        {em(title)}
      </h2>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

/** The headline as words that breathe in; the *marked* phrase in the soft serif on a peach wash. */
function Words({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let n = 0;
  text.split(/\*([^*]+)\*/).forEach((chunk, k) => {
    const words = chunk.split(/\s+/).filter(Boolean);
    const spans = words.map((w) => {
      const el = (
        <span key={n} className="pu-w" style={i(n)}>
          {w}
        </span>
      );
      n++;
      return el;
    });
    if (!spans.length) return;
    const joined: ReactNode[] = [];
    spans.forEach((s, m) => joined.push(s, m < spans.length - 1 ? " " : null));
    out.push(
      k % 2 ? (
        <span key={`h${k}`} className="pu-hl">
          {joined}
        </span>
      ) : (
        <span key={`p${k}`}>{joined}</span>
      ),
      " ",
    );
  });
  return <>{out}</>;
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <>
      <header className="pu-hdr hdr">
        <div className="pu-wrap pu-bar">
          <a href="#top" className="pu-logo" aria-label={c.name}>
            <i className="pu-mark" aria-hidden="true">
              {c.name.charAt(0)}
            </i>
            <span>{c.name}</span>
          </a>
          <nav aria-label={c.t.menu} className="pu-links" data-nav>
            {c.nav.slice(0, 4).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="pu-acts">
            {b.phone ? (
              <a href={tel(b.phone)} className="pu-call">
                <span className="pu-ico" aria-hidden="true">
                  <Icon name="phone" />
                </span>
                {b.phone}
              </a>
            ) : null}
            <a href={cta.href} className="btn pu-fill">
              {cta.label}
            </a>
          </div>
          <button type="button" className="pu-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="pu-menu" data-nav inert>
        <span className="pu-scrim" data-menu-close aria-hidden="true" />
        <div className="pu-sheet">
          <div className="pu-grip">
            <button type="button" className="pu-close" data-menu-close aria-label={c.t.close}>
              ×
            </button>
          </div>
          <nav aria-label={c.t.menu}>
            {c.nav.map((n, k) => (
              <a key={n.id} href={`#${n.id}`} style={i(k)}>
                {n.label}
                <Arrow />
              </a>
            ))}
          </nav>
          <div className="pu-sheet-foot">
            <a href={cta.href} className="btn pu-fill">
              {cta.label} <Arrow />
            </a>
            {b.phone ? (
              <a href={tel(b.phone)} className="btn pu-soft">
                {b.phone}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

const factIcon = (c: Ctx, label: string) => (label === c.t.address ? "map" : label === c.t.hours ? "clock" : "phone");

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  // Without a marked phrase, the business's own name gets the soft serif.
  const headline = !hero.headline.includes("*") && c.name.length > 2 && hero.headline.includes(c.name) ? hero.headline.replace(c.name, `*${c.name}*`) : hero.headline;
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 44 ? "is-s" : plain.length > 26 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const about = c.spec.sections.find((s) => s.type === "about");
  const calm = about && about.type === "about" ? about.highlights.slice(0, 4) : [];
  return (
    <section className="pu-hero">
      <Blob cls="b1" n={0} px />
      <Blob cls="b2" peach n={1} px />
      <Blob cls="b3" n={2} />
      <div className="pu-wrap">
        <div className="pu-hero-in">
          <div className="pu-hero-top">
            {hero.eyebrow ? <p className="pu-kick">{hero.eyebrow}</p> : null}
            <NowBadge c={c} className="pu-now" />
          </div>
          <h1 className={size}>
            <Words text={headline} />
          </h1>
          <p className="pu-lede">{hero.subheadline}</p>
          <div className="pu-cta-row">
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label} <Arrow />
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
        </div>
        <div className="pu-stage">
          {p ? (
            <figure className="pu-cap" data-px>
              <Pic p={p} eager sizes="(min-width: 760px) 92vw, 100vw" />
            </figure>
          ) : (
            <div className="pu-cap is-empty" aria-hidden="true">
              <Blob cls="b4" n={1} />
              <Blob cls="b5" n={2} />
              <b>{c.name.charAt(0)}</b>
            </div>
          )}
          <aside className="pu-appt" aria-label={hero.primaryCta.label}>
            <div className="pu-appt-in">
              <div className="pu-appt-top">
                <span className="pu-ico is-peach" aria-hidden="true">
                  <Icon name="calendar" />
                </span>
                <div>
                  <b>{hero.primaryCta.label}</b>
                  <NowBadge c={c} className="pu-now" />
                </div>
              </div>
              {facts.length > 0 && (
                <dl>
                  {facts.map((f) => (
                    <div key={f.label}>
                      <span className="pu-ico" aria-hidden="true">
                        <Icon name={factIcon(c, f.label)} />
                      </span>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <Btn c={c} href={hero.primaryCta.href}>
                {hero.primaryCta.label} <Arrow />
              </Btn>
            </div>
          </aside>
        </div>
        {calm.length > 0 && (
          <ul className="pu-reas" aria-label={c.t.kick.about}>
            {calm.map((h, n) => (
              <li key={h} style={i(n)}>
                <span className="pu-ico" aria-hidden="true">
                  <Icon name="check" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/** Address, phone, e-mail and route as soft rows with an icon in a circle. */
function Reach({ c }: { c: Ctx }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email) return null;
  const row = (icon: Parameters<typeof Icon>[0]["name"], text: ReactNode, peach = false) => (
    <>
      <span className={`pu-ico${peach ? " is-peach" : ""}`} aria-hidden="true">
        <Icon name={icon} />
      </span>
      <span>{text}</span>
    </>
  );
  return (
    <address className="pu-reach" data-rv>
      {b.address ? <div>{row("map", b.address)}</div> : null}
      {b.phone ? <a href={tel(b.phone)}>{row("phone", b.phone, true)}</a> : null}
      {b.email ? <a href={`mailto:${b.email}`}>{row("chat", b.email)}</a> : null}
      {b.mapsUrl ? (
        <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
          {row("globe", `${c.t.route} →`, true)}
        </a>
      ) : null}
    </address>
  );
}

/** The opening hours on a soft card, today marked, with the live badge. */
function HoursCard({ c }: { c: Ctx }) {
  return (
    <div className="pu-hcard" data-rv>
      <div className="pu-hcard-top">
        <div>
          <span className="pu-ico" aria-hidden="true">
            <Icon name="clock" />
          </span>
          <h3>{c.t.hours}</h3>
        </div>
        <NowBadge c={c} className="pu-now" />
      </div>
      {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const { hero } = c.spec;
  return (
    <footer className="pu-foot">
      <Blob cls="b6" n={1} />
      <div className="pu-wrap">
        <div className="pu-foot-cta">
          <p>{em(hero.headline)}</p>
          <div>
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label} <Arrow />
            </Btn>
            {b.phone ? (
              <a href={tel(b.phone)} className="btn pu-soft">
                {b.phone}
              </a>
            ) : null}
          </div>
        </div>
        <p className="pu-foot-name" aria-hidden="true" style={css({ "--n": Math.max(8, c.name.length) })}>
          {c.name}
        </p>
        <div className="pu-foot-grid">
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
            {b.address ? <span>{b.address}</span> : null}
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
            {b.mapsUrl ? (
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                {c.t.route} →
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
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
        </div>
        <Legal c={c} className="pu-legal" />
      </div>
    </footer>
  );
}

export const puur: Family = {
  key: "puur",
  root: "d-puur",
  fonts: ["Manrope", "Fraunces Soft"],
  themeColor: "#ffffff",
  accent: "#4f5bd5",
  onAccent: "#ffffff",
  css: "",
  // After the shared defaults, so the family's own look wins where both style the same element.
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "pu-wrap", eyebrow: "pu-kick", btn: "pu-fill", btnAlt: "pu-soft", btnText: "pu-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const a = c.photo(s.image);
      const b = a ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="pu-sec" id={s.id}>
          <div className={`pu-wrap pu-about${a ? "" : " is-solo"}`}>
            {a ? (
              <div className="pu-pics" data-rv>
                <Blob cls="b7" peach n={2} />
                <figure data-px>
                  <Pic p={a} sizes="(min-width: 920px) 44vw, 90vw" />
                </figure>
                {b ? (
                  <figure>
                    <Pic p={b} sizes="(min-width: 920px) 20vw, 40vw" />
                  </figure>
                ) : null}
              </div>
            ) : null}
            <div className="pu-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} />
              <p className="pu-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="pu-checks" data-rv>
                  {s.highlights.map((h, n) => (
                    <li key={h}>
                      <span className={`pu-ico${n % 2 ? " is-peach" : ""}`} aria-hidden="true">
                        <Icon name="check" />
                      </span>
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
    services: (s, c) => (
      <section className="pu-sec pu-panel" id={s.id}>
        <Blob cls="b8" n={1} px />
        <div className="pu-wrap">
          <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} center />
          <ul className="pu-cards">
            {s.items.map((it, n) => {
              const p = c.photo(`art:svc${n}`);
              return (
                <li key={n} data-rv style={i(n % 3)}>
                  <div className="pu-card">
                    {p ? (
                      <figure className="pu-card-pic">
                        <Pic p={p} sizes="(min-width: 900px) 30vw, 90vw" />
                      </figure>
                    ) : null}
                    <span className={`pu-ico${n % 2 ? " is-peach" : ""}`} aria-hidden="true">
                      <Icon name={it.icon} />
                    </span>
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                    {it.duration || it.price ? (
                      <p className="pu-meta">
                        {it.duration ? <span>{it.duration}</span> : null}
                        {it.price ? <span>{it.price}</span> : null}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="pu-sec pu-panel" id={s.id}>
          <div className="pu-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} center />
            <div className="pu-cards">
              {cats.map((cat, n) => (
                <div key={n} className="pu-card" data-rv style={i(n % 3)}>
                  <h3>{cat.name}</h3>
                  <ul className="pu-dishes">
                    {cat.items.map((d, m) => (
                      <li key={m}>
                        <b>{d.name}</b>
                        {d.price ? <span>{d.price}</span> : <span />}
                        {d.description ? <p>{d.description}</p> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {s.note ? (
              <p className="z-note" data-rv style={{ textAlign: "center" }}>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="pu-sec" id={s.id}>
        <div className="pu-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} center />
          <ul className="pu-feats">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span className="pu-ico" aria-hidden="true">
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
      <section className="pu-sec pu-panel" id={s.id}>
        <Blob cls="b9" peach n={2} px />
        <div className="pu-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} center />
          <div className="pu-path" data-path>
            <div className="pu-path-art" aria-hidden="true">
              <svg>
                <path className="pu-path-bg" />
                <path className="pu-path-line" />
              </svg>
              <span className="pu-path-dot" />
            </div>
            <ol className="pu-stops">
              {s.steps.map((st, n) => (
                <li key={n} className="pu-stop">
                  <span className="pu-node" aria-hidden="true">
                    {n + 1}
                  </span>
                  <div className="pu-stop-card" data-rv>
                    <h3>{st.title}</h3>
                    <p>{st.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <section className="pu-sec" id={s.id}>
          <div className="pu-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} center />
            <div className="pu-gal">
              {pics.slice(0, 6).map((p, n) => (
                <figure key={n} data-rv style={i(n % 3)}>
                  <Pic p={p} sizes="(min-width: 900px) 30vw, 46vw" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="pu-sec" id={s.id}>
        <div className="pu-wrap pu-split">
          <div className="pu-split-copy">
            <Head kicker={c.t.kick.hours} title={s.title} />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Reach c={c} />
          </div>
          <HoursCard c={c} />
        </div>
      </section>
    ),
    faq: (s, c) => (
      <section className="pu-sec pu-panel is-peach" id={s.id}>
        <div className="pu-wrap">
          <Head kicker={c.t.kick.faq} title={s.title} center />
          <div className="pu-faq" data-acc>
            {s.items.map((it, n) => (
              <details key={n} data-rv style={i(n % 4)}>
                <summary>
                  <span className="pu-q" aria-hidden="true">
                    ?
                  </span>
                  <span>{it.q}</span>
                  <i aria-hidden="true" />
                </summary>
                <p>{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="pu-sec" id={s.id}>
        <div className={`pu-wrap pu-split${!s.showForm && c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? " is-solo" : ""}`}>
          <div className="pu-split-copy">
            <Head kicker={c.t.kick.contact} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
          </div>
          {s.showForm ? (
            <div className="pu-book" data-rv>
              <div className="pu-book-top">
                <span className="pu-ico" aria-hidden="true">
                  <Icon name="chat" />
                </span>
                <b>{c.t.message}</b>
              </div>
              <div className="pu-book-body">
                <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
              </div>
            </div>
          ) : !c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") ? (
            <HoursCard c={c} />
          ) : null}
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="pu-sec pu-panel" id={s.id}>
        <Blob cls="b10" peach n={1} px />
        <div className="pu-wrap pu-split">
          <div className="pu-split-copy">
            <Head kicker={c.t.kick.booking} title={s.title} />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Reach c={c} />
          </div>
          <div className="pu-book" data-rv>
            <div className="pu-book-top">
              <span className="pu-ico is-peach" aria-hidden="true">
                <Icon name="calendar" />
              </span>
              <div>
                <b>{s.title.replace(/\*/g, "")}</b>
                {c.spec.business.openingHours?.length ? <NowBadge c={c} className="pu-now" /> : null}
              </div>
            </div>
            <div className="pu-book-body">
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
            </div>
          </div>
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="pu-sec" id={s.id}>
        <div className="pu-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} center />
          <ul className="pu-chan">
            {s.channels.map((ch, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <a href={ch.href} {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className={`pu-ico${n % 2 ? " is-peach" : ""}`} aria-hidden="true">
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                  <small aria-hidden="true">
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
