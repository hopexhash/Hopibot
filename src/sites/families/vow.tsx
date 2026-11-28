import { NowBadge, TODAY_JS } from "./today";
import { Btn, css, DemoForm, em, heroFacts, Hours, i, Icon, Legal, Pic, splitLines, tel, type Ctx, type Family, type Photo } from "./kit";

/**
 * Vow: an original template (no portfolio demo). Romantic without the kitsch: ivory paper,
 * champagne, powder blue and sage, a light calligraphic italic (Cormorant) with engraved
 * capitals (Italiana) and an airy sans. Everything is composed like stationery: centred heads
 * under a hairline ornament that draws itself, photographs in an oval or behind a double
 * frame, invitation cards for packages. Headlines are written in with a soft sweep, the opening
 * oval cross-fades between photographs, services change the photograph beside them as you
 * read, the process is a timeline whose line draws itself on scroll and the gallery
 * dissolves from picture to picture. Made for wedding planners, event and party planners,
 * venues, florists, bridal stylists and other businesses around a celebration.
 */

const CSS = `
.d-vow{--ivory:#f8f4ec;--ivory2:#f0e8da;--paper:#fffdf8;--champ:#e9dcc5;--gold:#ad8b5c;--gold-d:#7f6239;--powder:#dfe6ea;--powder-d:#93a7b5;--sage:#9aa58f;--sage-d:#66735e;--ink:#3a3330;--dim:#6c625c;--line:rgba(58,51,48,.16);--pad:clamp(20px,5vw,72px);--soft:cubic-bezier(.25,.6,.2,1);--slow:cubic-bezier(.45,.05,.2,1);--script:"Cormorant",Georgia,serif;--cap:"Italiana","Cormorant",Georgia,serif;--z-bg2:var(--paper);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--gold-d);--z-on-accent:#fffdf8;--z-display:var(--script);--z-display-weight:300;--z-radius:2px;--z-field-radius:2px;--z-ico-radius:50%;--z-h3:clamp(24px,2.1vw,32px);--z-sec:clamp(90px,11vw,170px);--z-statement:clamp(32px,4.4vw,68px);background:var(--ivory);color:var(--ink);font-family:"DM Sans",system-ui,sans-serif;font-size:clamp(16px,1.04vw,18px);font-weight:350;line-height:1.75}
.d-vow ::selection{background:var(--champ);color:var(--ink)}
.d-vow h1,.d-vow h2,.d-vow h3{font-family:var(--script);font-weight:300;letter-spacing:-.005em;line-height:1.02}
.d-vow h2{font-size:clamp(40px,5.2vw,84px)}
.d-vow h2.is-long{font-size:clamp(32px,3.8vw,58px);line-height:1.08}
.d-vow h3{font-weight:400}
.d-vow h1 em,.d-vow h2 em,.d-vow h3 em{font-style:italic;font-weight:400;color:var(--gold-d)}
.d-vow .vw-wrap{position:relative;width:min(100%,1380px);margin-inline:auto;padding-inline:var(--pad)}
.d-vow .vw-kick{display:inline-flex;align-items:center;justify-content:center;gap:14px;font-family:var(--cap);font-size:14px;letter-spacing:.32em;text-transform:uppercase;color:var(--gold-d)}
.d-vow .vw-kick::before,.d-vow .vw-kick::after{content:"";width:28px;height:1px;background:currentColor;opacity:.6}
.d-vow .vw-orn{display:block;width:clamp(150px,16vw,220px);height:auto;margin-inline:auto;overflow:visible;color:var(--gold)}
.d-vow .vw-orn path,.d-vow .vw-sprig path,.d-vow .vw-oval-line ellipse{fill:none;stroke:currentColor;stroke-width:1;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1}
.d-vow .vw-orn path:nth-child(3){fill:currentColor;fill-opacity:0;transition:fill-opacity 1s 1.4s}
.d-vow [data-rv].in .vw-orn path,.d-vow .vw-orn[data-rv].in path,.d-vow .vw-draw path,.d-vow .vw-draw ellipse{stroke-dashoffset:0;transition:stroke-dashoffset 2.2s var(--slow);transition-delay:calc(.2s + var(--k,0) * .18s)}
.d-vow [data-rv].in .vw-orn path:nth-child(3),.d-vow .vw-orn[data-rv].in path:nth-child(3),.d-vow .vw-draw path:nth-child(3){fill-opacity:1}
.d-vow .btn{position:relative;isolation:isolate;display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:54px;max-width:100%;padding:0 30px;overflow:hidden;border:1px solid var(--ink);border-radius:999px;font-family:var(--cap);font-size:15px;letter-spacing:.2em;line-height:1.2;text-align:center;text-transform:uppercase;transition:color .6s var(--soft),border-color .6s}
.d-vow .btn::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--champ);transform:scaleX(0);transform-origin:100% 50%;transition:transform .8s var(--soft)}
.d-vow .btn:hover::before{transform:scaleX(1);transform-origin:0 50%}
.d-vow .btn i{position:relative;width:22px;height:1px;background:currentColor;transition:width .6s var(--soft)}
.d-vow .btn i::after{content:"";position:absolute;right:0;top:-3px;width:7px;height:7px;border-top:1px solid currentColor;border-right:1px solid currentColor;transform:rotate(45deg)}
.d-vow .btn:hover i{width:34px}
.d-vow .vw-fill{background:var(--ink);color:#fffdf8}
.d-vow .vw-fill:hover{color:var(--ink);border-color:var(--champ)}
.d-vow .vw-line{background:transparent;color:var(--ink)}
.d-vow .vw-line:hover{color:var(--ink);border-color:var(--gold)}
.d-vow .vw-text{position:relative;display:inline-flex;align-items:center;min-height:44px;font-family:var(--cap);font-size:15px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink)}
.d-vow .vw-text::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:1px;background:var(--gold);transform:scaleX(.3);transform-origin:0 50%;transition:transform .7s var(--soft)}
.d-vow .vw-text:hover::after{transform:scaleX(1)}
.d-vow .vw-hdr{position:sticky;top:0;z-index:40;background:rgba(248,244,236,0);transition:background-color .6s,box-shadow .6s}
.d-vow.is-scrolled .vw-hdr{background:rgba(248,244,236,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 1px 0 var(--line)}
.d-vow .vw-bar{display:flex;align-items:center;gap:20px;min-height:92px;transition:min-height .6s var(--soft)}
.d-vow.is-scrolled .vw-bar{min-height:72px}
.d-vow .vw-logo{display:flex;align-items:center;gap:12px;min-width:0;min-height:48px}
.d-vow .vw-mono{position:relative;display:grid;flex:none;place-items:center;width:46px;height:46px;border:1px solid var(--gold);border-radius:50%;font-family:var(--script);font-size:26px;font-style:italic;line-height:1;color:var(--gold-d)}
.d-vow .vw-mono::after{content:"";position:absolute;inset:-5px;border:1px dashed var(--gold);border-radius:50%;opacity:.5;transition:transform 2.4s var(--soft)}
.d-vow .vw-logo:hover .vw-mono::after{transform:rotate(180deg)}
.d-vow .vw-name{overflow:hidden;font-family:var(--cap);font-size:17px;letter-spacing:.22em;text-transform:uppercase;text-overflow:ellipsis;white-space:nowrap}
.d-vow .vw-links{display:none;gap:4px;font-size:14.5px;letter-spacing:.04em}
.d-vow .vw-links a{position:relative;display:inline-flex;align-items:center;min-height:44px;padding:0 12px}
.d-vow .vw-links a::after{content:"";position:absolute;left:50%;bottom:10px;width:4px;height:4px;border-radius:50%;background:var(--gold);transform:translateX(-50%) scale(0);transition:transform .5s var(--soft)}
.d-vow .vw-links a:hover::after{transform:translateX(-50%) scale(1)}
.d-vow .vw-side{display:none;align-items:center;justify-content:flex-end;gap:10px}
.d-vow .vw-cta{min-height:46px;padding:0 22px;font-size:13px}
.d-vow .vw-burger{display:inline-flex;align-items:center;gap:12px;margin-left:auto;min-height:48px;padding:0 4px 0 12px;border:0;background:none;font-family:var(--cap);font-size:14px;letter-spacing:.24em;text-transform:uppercase}
.d-vow .vw-burger i{position:relative;width:30px;height:9px}
.d-vow .vw-burger i::before,.d-vow .vw-burger i::after{content:"";position:absolute;left:0;right:0;height:1px;background:currentColor;transition:transform .6s var(--soft),width .6s var(--soft)}
.d-vow .vw-burger i::before{top:0}.d-vow .vw-burger i::after{bottom:0;left:auto;width:66%}
.d-vow.menu-open .vw-burger i::before{transform:translateY(4px) rotate(18deg)}
.d-vow.menu-open .vw-burger i::after{width:100%;transform:translateY(-4px) rotate(-18deg)}
@media (max-width:520px){.d-vow .vw-name{font-size:14px;letter-spacing:.12em}.d-vow .vw-mono{width:40px;height:40px;font-size:22px}}
@media (min-width:1120px){.d-vow .vw-bar{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}.d-vow .vw-links{display:flex}.d-vow .vw-left{justify-content:flex-start}.d-vow .vw-logo{flex-direction:column;gap:6px;justify-self:center}.d-vow.is-scrolled .vw-logo{flex-direction:row}.d-vow .vw-side{display:flex}.d-vow .vw-burger{display:none}}
.d-vow .vw-menu{position:fixed;inset:0;z-index:39;display:grid;place-items:center;padding:100px var(--pad) 100px;overflow-y:auto;background:var(--ivory);opacity:0;visibility:hidden;transition:opacity .7s var(--soft),visibility 0s .7s}
.d-vow .vw-menu.is-open{opacity:1;visibility:visible;transition:opacity .7s var(--soft)}
.d-vow .vw-menu::before,.d-vow .vw-menu::after{content:"";position:fixed;inset:14px;border:1px solid var(--gold);pointer-events:none;opacity:.55;transform:scale(.96);transition:transform 1.2s var(--soft)}
.d-vow .vw-menu::after{inset:20px;opacity:.3}
.d-vow .vw-menu.is-open::before,.d-vow .vw-menu.is-open::after{transform:none}
.d-vow .vw-menu-in{display:grid;gap:26px;justify-items:center;text-align:center}
.d-vow .vw-menu nav{display:grid;gap:2px;justify-items:center}
.d-vow .vw-menu nav a{display:inline-flex;align-items:baseline;gap:12px;min-height:52px;font-family:var(--script);font-size:clamp(34px,8.6vw,62px);font-style:italic;font-weight:300;line-height:1.15;opacity:0;letter-spacing:.12em;filter:blur(4px);transition:opacity .9s var(--soft),letter-spacing 1.2s var(--soft),filter .9s,color .4s}
.d-vow .vw-menu.is-open nav a{opacity:1;letter-spacing:0;filter:none;transition-delay:calc(.25s + var(--i,0) * 90ms)}
.d-vow .vw-menu nav a:hover{color:var(--gold-d)}
.d-vow .vw-menu nav small{font-family:var(--cap);font-size:12px;font-style:normal;letter-spacing:.2em;color:var(--gold-d)}
.d-vow .vw-menu-foot{display:grid;gap:6px;font-family:var(--cap);font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}
.d-vow .vw-menu-foot a{display:inline-flex;align-items:center;justify-content:center;min-height:44px}
.d-vow.menu-open .vw-hdr{background:transparent;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}
.d-vow .vw-hero{position:relative;padding:clamp(20px,4vw,60px) 0 clamp(80px,10vw,150px);overflow-x:clip}
.d-vow .vw-glow{position:absolute;z-index:0;border-radius:50%;filter:blur(10px);pointer-events:none;animation:vw-drift 26s ease-in-out infinite alternate}
.d-vow .vw-glow.g1{right:-8%;top:-10%;width:min(70vw,760px);aspect-ratio:1;background:radial-gradient(circle,rgba(223,230,234,.95),rgba(223,230,234,0) 66%)}
.d-vow .vw-glow.g2{left:-14%;bottom:-20%;width:min(60vw,640px);aspect-ratio:1;background:radial-gradient(circle,rgba(233,220,197,.8),rgba(233,220,197,0) 66%);animation-duration:32s;animation-direction:alternate-reverse}
.d-vow .vw-hero-g{position:relative;z-index:1;display:grid;gap:clamp(56px,7vw,90px);align-items:center}
@media (min-width:980px){.d-vow .vw-hero-g{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}}
.d-vow .vw-hero-copy{display:grid;justify-items:center;text-align:center}
@media (min-width:980px){.d-vow .vw-hero-copy{justify-items:start;text-align:left}}
.d-vow .vw-eyebrow{display:flex;align-items:center;gap:14px;font-family:var(--cap);font-size:14px;letter-spacing:.32em;text-transform:uppercase;color:var(--gold-d);animation:vw-fade 1.4s var(--soft) .2s both}
.d-vow .vw-eyebrow::before{content:"";width:36px;height:1px;background:currentColor}
@media (max-width:979px){.d-vow .vw-eyebrow{font-size:12.5px;letter-spacing:.24em}.d-vow .vw-eyebrow::before{display:none}}
.d-vow .vw-h1{margin-top:clamp(20px,2.6vw,34px);font-size:clamp(50px,6.6vw,100px);line-height:.98;letter-spacing:-.015em}
.d-vow .vw-h1.is-m{font-size:clamp(44px,5.4vw,84px)}
.d-vow .vw-h1.is-s{font-size:clamp(38px,4.4vw,66px);line-height:1.04}
.d-vow .vw-ln{display:block;padding:.04em .06em .1em;margin:0 -.06em -.1em}
.d-vow .vw-ln>span{display:inline-block;-webkit-mask-image:linear-gradient(90deg,#000 42%,transparent 58%);mask-image:linear-gradient(90deg,#000 42%,transparent 58%);-webkit-mask-size:280% 100%;mask-size:280% 100%;-webkit-mask-position:100% 0;mask-position:100% 0;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;animation:vw-write 2.2s var(--slow) both;animation-delay:calc(.5s + var(--i,0) * .55s)}
.d-vow .vw-ln:nth-child(2)>span{padding-left:clamp(0px,4vw,70px)}
@media (max-width:979px){.d-vow .vw-ln:nth-child(2)>span{padding-left:0}}
.d-vow .vw-sub{max-width:44ch;margin-top:clamp(22px,2.4vw,32px);font-size:clamp(17px,1.25vw,20px);color:var(--dim);animation:vw-rise 1.6s var(--soft) 1.5s both}
.d-vow .vw-ctas{display:flex;flex-wrap:wrap;align-items:center;justify-content:inherit;gap:14px 26px;margin-top:34px;animation:vw-rise 1.6s var(--soft) 1.7s both}
@media (max-width:979px){.d-vow .vw-ctas{justify-content:center}}
.d-vow .vw-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),max-content));justify-content:inherit;gap:18px 34px;width:100%;margin-top:clamp(36px,4vw,54px);animation:vw-rise 1.6s var(--soft) 1.9s both}
@media (max-width:979px){.d-vow .vw-facts{justify-content:center}}
.d-vow .vw-facts div{display:grid;gap:2px;padding-top:12px;border-top:1px solid var(--line)}
.d-vow .vw-facts dt{font-family:var(--cap);font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-d)}
.d-vow .vw-facts dd{margin:0;font-size:15px}
.d-vow .vw-now{display:inline-flex;align-items:center;gap:8px;margin-top:18px;font-family:var(--cap);font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--sage-d)}
.d-vow .vw-now::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor;box-shadow:0 0 0 4px rgba(154,165,143,.25)}
.d-vow .vw-now.is-closed{color:var(--dim)}
.d-vow .vw-now[hidden]{display:none}
.d-vow .vw-art{position:relative;justify-self:center;width:min(84%,500px);translate:0 calc(var(--p,0) * -26px)}
.d-vow .vw-oval{position:relative;z-index:1;aspect-ratio:3/4;overflow:hidden;border-radius:50%;background:var(--champ);clip-path:ellipse(0% 0% at 50% 50%);animation:vw-oval 2.2s var(--slow) .4s forwards}
.d-vow .vw-oval figure,.d-vow .vw-oval img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.d-vow .vw-oval img{opacity:0;scale:1.1;transition:opacity 2s var(--soft),scale 7s linear}
.d-vow .vw-oval img.is-on{opacity:1;scale:1}
.d-vow .vw-oval-line{position:absolute;inset:-5% -7%;z-index:2;width:114%;height:110%;overflow:visible;color:var(--gold);pointer-events:none;transform:rotate(-7deg)}
.d-vow .vw-oval-line ellipse{stroke-width:1}
.d-vow .vw-sprig{position:absolute;z-index:3;left:-16%;bottom:-4%;width:clamp(90px,11vw,150px);height:auto;overflow:visible;color:var(--sage-d);transform:rotate(-14deg)}
.d-vow .vw-sprig path{stroke-width:1.1}
.d-vow .vw-note{position:absolute;z-index:3;right:-6%;top:8%;max-width:15ch;padding:16px 20px;background:var(--paper);box-shadow:0 18px 40px -24px rgba(58,51,48,.45);font-family:var(--script);font-size:clamp(20px,1.7vw,26px);font-style:italic;line-height:1.15;text-align:center;color:var(--gold-d);rotate:5deg;animation:vw-rise 1.6s var(--soft) 2.2s both}
.d-vow .vw-note::before{content:"";position:absolute;inset:5px;border:1px solid var(--champ);pointer-events:none}
@media (max-width:620px){.d-vow .vw-note{right:-2%;top:-4%}.d-vow .vw-sprig{left:-6%}}
.d-vow .vw-mono-art{position:relative;z-index:1;display:grid;place-items:center;align-content:center;gap:8px;aspect-ratio:3/4;border-radius:50%;background:radial-gradient(ellipse at 50% 35%,var(--paper),var(--champ));clip-path:ellipse(0% 0% at 50% 50%);animation:vw-oval 2.2s var(--slow) .4s forwards}
.d-vow .vw-mono-art b{font-family:var(--script);font-size:clamp(140px,18vw,250px);font-style:italic;font-weight:300;line-height:.9;color:var(--gold-d)}
.d-vow .vw-mono-art span{font-family:var(--cap);font-size:14px;letter-spacing:.34em;text-transform:uppercase;color:var(--dim)}
.d-vow .vw-sec{position:relative;padding-block:var(--z-sec)}
.d-vow .is-tint{background:var(--ivory2)}
.d-vow .is-paper{background:var(--paper)}
.d-vow .is-powder{background:linear-gradient(180deg,var(--ivory),var(--powder) 22%,var(--powder) 78%,var(--ivory))}
.d-vow .is-champ{background:var(--champ)}
.d-vow .vw-head{display:grid;gap:18px;justify-items:center;max-width:860px;margin:0 auto clamp(48px,6vw,90px);text-align:center}
.d-vow .vw-head.is-left{justify-items:start;margin-left:0;text-align:left}
.d-vow .vw-head.is-left .vw-orn{margin-left:0}
.d-vow .vw-intro{max-width:52ch;font-size:clamp(17px,1.2vw,19px);color:var(--dim)}
.demo-js .d-vow .vw-head h2[data-rv]{opacity:0;transform:none;-webkit-mask-image:linear-gradient(90deg,#000 42%,transparent 58%);mask-image:linear-gradient(90deg,#000 42%,transparent 58%);-webkit-mask-size:280% 100%;mask-size:280% 100%;-webkit-mask-position:100% 0;mask-position:100% 0;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;transition:-webkit-mask-position 1.9s var(--slow),mask-position 1.9s var(--slow),opacity .4s}
.demo-js .d-vow .vw-head h2[data-rv].in{opacity:1;-webkit-mask-position:0 0;mask-position:0 0}
.demo-js .d-vow [data-rv]{transform:translateY(18px);transition:opacity 1.4s var(--soft),transform 1.4s var(--soft);transition-delay:calc(var(--i,0) * 120ms)}
.demo-js .d-vow [data-rv].in{transform:none}
.d-vow .vw-about{display:grid;gap:clamp(56px,7vw,120px);align-items:center}
@media (min-width:960px){.d-vow .vw-about{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.d-vow .vw-about.is-solo{grid-template-columns:minmax(0,1fr);max-width:900px}
.d-vow .vw-about.is-solo .vw-head{justify-items:center;margin-inline:auto;text-align:center}
.d-vow .vw-about.is-solo .vw-head .vw-orn{margin-inline:auto}
.d-vow .vw-about.is-solo .vw-about-copy{text-align:center;justify-items:center}
.d-vow .vw-frame{position:relative;margin:0 22px 22px 0}
.d-vow .vw-frame::before{content:"";position:absolute;inset:22px -22px -22px 22px;border:1px solid var(--gold);opacity:.7;transition:transform 1.4s var(--soft)}
.d-vow .vw-frame:hover::before{transform:translate(-8px,-8px)}
.d-vow .vw-frame>div{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--champ)}
.d-vow .vw-frame img{width:100%;height:100%;object-fit:cover;scale:1.1;translate:0 calc(var(--p,0) * -3%);transition:scale 2.4s var(--soft)}
.d-vow .vw-frame:hover img{scale:1.05}
.d-vow .vw-about-pic{position:relative;justify-self:center;width:min(100%,500px)}
.d-vow .vw-about-pic .vw-sprig{left:auto;right:-10%;bottom:auto;top:-10%;transform:rotate(18deg) scaleX(-1)}
.d-vow .vw-about-copy{display:grid;gap:22px;align-content:start}
.d-vow .vw-about-copy .vw-head{margin-bottom:6px}
.d-vow .vw-lead{font-family:var(--script);font-size:clamp(23px,2vw,31px);font-weight:400;line-height:1.38;color:var(--ink)}
.d-vow .vw-lead::first-letter{float:left;margin:.08em .12em 0 0;font-size:3.2em;font-style:italic;line-height:.8;color:var(--gold-d)}
.d-vow .vw-about.is-solo .vw-lead::first-letter{float:none;font-size:1.4em;margin:0}
.d-vow .vw-about-copy>p:not(.vw-lead){max-width:58ch;color:var(--dim)}
.d-vow .vw-ticks{display:grid;gap:12px;margin-top:8px}
.d-vow .vw-ticks li{display:flex;align-items:center;gap:14px;font-family:var(--cap);font-size:15px;letter-spacing:.14em;text-transform:uppercase}
.d-vow .vw-ticks li::before{content:"";flex:none;width:7px;height:7px;border:1px solid var(--gold);transform:rotate(45deg)}
.d-vow .vw-about.is-solo .vw-ticks{justify-items:center}
.d-vow .vw-svc{display:grid;gap:clamp(40px,6vw,100px);align-items:start}
@media (min-width:980px){.d-vow .vw-svc.has-pics{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}}
.d-vow .vw-svc-stage{display:none}
@media (min-width:980px){.d-vow .vw-svc-stage{position:sticky;top:110px;display:block}}
.d-vow .vw-svc-stage>div{position:relative;aspect-ratio:4/5;overflow:hidden;border-radius:50% 50% 50% 50%/36% 36% 36% 36%;background:var(--champ)}
.d-vow .vw-svc-stage figure{position:absolute;inset:0;opacity:0;transition:opacity 1.4s var(--soft)}
.d-vow .vw-svc-stage figure.is-on{opacity:1}
.d-vow .vw-svc-stage img{width:100%;height:100%;object-fit:cover;scale:1.06;transition:scale 3s var(--soft)}
.d-vow .vw-svc-stage figure.is-on img{scale:1}
.d-vow .vw-svc-stage p{margin-top:18px;font-family:var(--cap);font-size:13px;letter-spacing:.28em;text-align:center;color:var(--gold-d)}
.d-vow .vw-svc-list{display:grid;border-top:1px solid var(--line)}
.d-vow .vw-svc:not(.has-pics) .vw-svc-list{max-width:1040px;margin-inline:auto}
@media (min-width:860px){.d-vow .vw-svc:not(.has-pics) .vw-svc-list{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:70px}}
.d-vow .vw-svc-item{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px 24px;padding:clamp(26px,3vw,40px) 0;border-bottom:1px solid var(--line);transition:opacity .8s var(--soft)}
@media (min-width:980px){.d-vow .has-pics .vw-svc-item:not(.is-on){opacity:.5}.d-vow .has-pics .vw-svc-item:hover{opacity:1}}
.d-vow .vw-num{min-width:2.2em;padding-top:.3em;font-family:var(--cap);font-size:16px;letter-spacing:.16em;color:var(--gold-d)}
.d-vow .vw-svc-item h3{font-size:clamp(28px,2.6vw,42px);font-style:italic;font-weight:300;transition:color .6s,letter-spacing .9s var(--soft)}
.d-vow .vw-svc-item.is-on h3{color:var(--gold-d)}
.d-vow .vw-svc-item p{max-width:52ch;margin-top:8px;color:var(--dim)}
.d-vow .vw-svc-meta{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:12px;font-family:var(--cap);font-size:14px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-d)}
.d-vow .vw-svc-thumb{grid-column:1/-1;margin-top:14px;aspect-ratio:16/10;overflow:hidden;background:var(--champ)}
.d-vow .vw-svc-thumb img{width:100%;height:100%;object-fit:cover}
@media (min-width:980px){.d-vow .vw-svc-thumb{display:none}}
.d-vow .vw-styles{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:1px;border-block:1px solid var(--line);background:var(--line)}
.d-vow .vw-style{position:relative;display:grid;background:var(--ivory);gap:14px;justify-items:center;align-content:start;padding:clamp(34px,4vw,56px) clamp(20px,2.4vw,36px);text-align:center}
.d-vow .vw-style::before{content:"";position:absolute;inset:12px;border:1px solid var(--gold);opacity:0;transform:scale(.94);transition:opacity .8s var(--soft),transform .8s var(--soft);pointer-events:none}
.d-vow .vw-style:hover::before{opacity:.6;transform:none}
.d-vow .vw-style-ico{display:grid;place-items:center;width:66px;height:66px;border:1px solid var(--gold);border-radius:50%;color:var(--gold-d);transition:transform 1.2s var(--soft),background-color .8s}
.d-vow .vw-style:hover .vw-style-ico{transform:rotate(360deg);background:var(--paper)}
.d-vow .vw-style-ico svg{width:24px;height:24px;stroke-width:1.2}
.d-vow .vw-style h3{font-size:clamp(26px,2.2vw,34px);font-style:italic}
.d-vow .vw-style p{max-width:34ch;color:var(--dim)}
.d-vow .vw-tl{position:relative;max-width:1120px;margin-inline:auto;--tp:0}
.d-vow .vw-tl-track{position:absolute;left:19px;top:0;bottom:0;width:1px;background:rgba(58,51,48,.14)}
.d-vow .vw-tl-fill{position:absolute;inset:0;background:var(--gold-d);transform:scaleY(var(--tp));transform-origin:50% 0}
.d-vow .vw-tl-tip{position:absolute;left:50%;top:0;width:11px;height:11px;border:1px solid var(--gold-d);background:var(--ivory);transform:translate(-50%,-50%) translateY(calc(var(--tl-h,0px) * var(--tp))) rotate(45deg)}
.d-vow .vw-tl ol{display:grid;gap:clamp(30px,5vw,64px)}
.d-vow .vw-tl-step{position:relative;padding-left:58px}
.d-vow .vw-tl-dot{position:absolute;left:19px;top:.9em;width:15px;height:15px;border:1px solid var(--gold);border-radius:50%;background:var(--ivory);transform:translateX(-50%);transition:background-color .8s,box-shadow .8s,border-color .8s}
.d-vow .vw-tl-step.is-lit .vw-tl-dot{border-color:var(--gold-d);background:var(--gold-d);box-shadow:0 0 0 6px rgba(173,139,92,.18)}
.d-vow .vw-tl-card{display:grid;gap:10px;max-width:520px;padding:clamp(24px,2.6vw,36px);background:rgba(255,253,248,.72);box-shadow:0 30px 60px -48px rgba(58,51,48,.5);transition:transform 1s var(--soft),background-color .8s}
.d-vow .vw-tl-step.is-lit .vw-tl-card{background:var(--paper)}
.d-vow .vw-tl-n{font-family:var(--cap);font-size:14px;letter-spacing:.3em;color:var(--gold-d)}
.d-vow .vw-tl-card h3{font-size:clamp(28px,2.6vw,40px);font-style:italic}
.d-vow .vw-tl-card p{color:var(--dim)}
@media (min-width:860px){.d-vow .vw-tl-track{left:50%}.d-vow .vw-tl-step{width:50%;padding:0 64px 0 0;justify-self:start}.d-vow .vw-tl-step:nth-child(even){justify-self:end;padding:0 0 0 64px}.d-vow .vw-tl-dot{left:auto;right:0;transform:translateX(50%)}.d-vow .vw-tl-step:nth-child(even) .vw-tl-dot{right:auto;left:0;transform:translateX(-50%)}.d-vow .vw-tl-step:nth-child(odd) .vw-tl-card{margin-left:auto;text-align:right}.d-vow .vw-tl ol{gap:clamp(10px,2vw,30px)}.d-vow .vw-tl-step:nth-child(n+2){margin-top:clamp(-60px,-4vw,-20px)}}
.d-vow .vw-gal{display:grid;grid-template-columns:minmax(0,1fr);gap:18px}
.d-vow .vw-gal-bar>*{min-width:0}
.d-vow .vw-gal-stage{position:relative;aspect-ratio:16/9;overflow:hidden;background:var(--champ)}
@media (max-width:760px){.d-vow .vw-gal-stage{aspect-ratio:4/5}}
.d-vow .vw-gal-stage figure{position:absolute;inset:0;opacity:0;transition:opacity 1.8s var(--soft)}
.d-vow .vw-gal-stage figure.is-on{opacity:1}
.d-vow .vw-gal-stage img{width:100%;height:100%;object-fit:cover;scale:1.08;transition:scale 8s linear}
.d-vow .vw-gal-stage figure.is-on img{scale:1}
.d-vow .vw-gal-stage::after{content:"";position:absolute;inset:14px;border:1px solid rgba(255,253,248,.7);pointer-events:none}
.d-vow .vw-gal-bar{display:flex;align-items:center;justify-content:space-between;gap:20px}
.d-vow .vw-gal-count{font-family:var(--cap);font-size:15px;letter-spacing:.24em;color:var(--gold-d);white-space:nowrap}
.d-vow .vw-gal-count b{font-weight:400;color:var(--ink)}
.d-vow .vw-gal-thumbs{display:flex;gap:10px;overflow-x:auto;padding:4px 2px;scrollbar-width:none}
.d-vow .vw-gal-thumbs::-webkit-scrollbar{display:none}
.d-vow .vw-gal-thumbs button{position:relative;flex:none;width:clamp(60px,6vw,86px);aspect-ratio:1;padding:0;overflow:hidden;border:0;border-radius:50%;background:var(--champ);opacity:.55;transition:opacity .6s,transform .6s var(--soft)}
.d-vow .vw-gal-thumbs button::after{content:"";position:absolute;inset:3px;border:1px solid #fffdf8;border-radius:50%;opacity:0;transition:opacity .6s}
.d-vow .vw-gal-thumbs button[aria-pressed="true"]{opacity:1;transform:translateY(-3px)}
.d-vow .vw-gal-thumbs button[aria-pressed="true"]::after{opacity:1}
.d-vow .vw-gal-thumbs button:hover{opacity:1}
.d-vow .vw-gal-thumbs img{width:100%;height:100%;object-fit:cover}
.d-vow .vw-gal-time{height:1px;background:var(--line);overflow:hidden}
.d-vow .vw-gal-time i{display:block;height:100%;background:var(--gold-d);transform:scaleX(0);transform-origin:0 50%}
.d-vow .vw-gal.is-playing .vw-gal-time i{animation:vw-time var(--dur,6s) linear both}
.d-vow .vw-packs{display:grid;gap:clamp(18px,2.4vw,34px);grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));align-items:stretch}
.d-vow .vw-pack{position:relative;display:grid;gap:16px;align-content:start;justify-items:center;padding:clamp(40px,4vw,60px) clamp(26px,3vw,44px);background:var(--paper);text-align:center;transition:transform 1s var(--soft),box-shadow 1s var(--soft)}
.d-vow .vw-pack::before,.d-vow .vw-pack::after{content:"";position:absolute;inset:10px;border:1px solid var(--gold);opacity:.55;pointer-events:none}
.d-vow .vw-pack::after{inset:15px;opacity:.25}
.d-vow .vw-pack:hover{transform:translateY(-8px);box-shadow:0 40px 70px -50px rgba(58,51,48,.6)}
.d-vow .vw-pack.is-featured{background:var(--ink);color:#f8f4ec;--dim:rgba(248,244,236,.74)}
.d-vow .vw-pack.is-featured::before,.d-vow .vw-pack.is-featured::after{border-color:var(--champ)}
.d-vow .vw-pack-tag{font-family:var(--cap);font-size:12.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--champ)}
.d-vow .vw-pack h3{font-size:clamp(32px,2.8vw,44px);font-style:italic}
.d-vow .vw-pack .vw-orn{width:110px}
.d-vow .vw-pack-price{display:grid;gap:2px;justify-items:center}
.d-vow .vw-pack-price b{font-family:var(--script);font-size:clamp(38px,3.4vw,54px);font-weight:300;line-height:1}
.d-vow .vw-pack-price span{font-family:var(--cap);font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim)}
.d-vow .vw-pack>p{max-width:34ch;color:var(--dim)}
.d-vow .vw-pack ul{display:grid;gap:10px;width:100%;margin-top:8px;padding-top:20px;border-top:1px solid var(--line)}
.d-vow .vw-pack.is-featured ul{border-color:rgba(248,244,236,.2)}
.d-vow .vw-pack li{font-size:15.5px}
.d-vow .vw-pack li::before{content:"";display:inline-block;width:5px;height:5px;margin:0 12px 2px 0;border:1px solid var(--gold);transform:rotate(45deg)}
.d-vow .vw-note-line{margin-top:clamp(28px,3vw,44px);font-family:var(--script);font-size:clamp(19px,1.5vw,23px);font-style:italic;text-align:center;color:var(--dim)}
.d-vow .vw-dinner{display:grid;gap:clamp(40px,5vw,70px) clamp(40px,6vw,110px);max-width:1100px;margin-inline:auto}
@media (min-width:900px){.d-vow .vw-dinner.is-many{grid-template-columns:repeat(2,minmax(0,1fr))}}
.d-vow .vw-course{display:grid;gap:22px;justify-items:center;align-content:start;text-align:center}
.d-vow .vw-course>h3{font-family:var(--cap);font-size:16px;font-weight:400;letter-spacing:.32em;text-transform:uppercase;color:var(--gold-d)}
.d-vow .vw-course ul{display:grid;gap:22px}
.d-vow .vw-course li{display:grid;gap:4px;justify-items:center}
.d-vow .vw-course b{font-family:var(--script);font-size:clamp(23px,2vw,29px);font-weight:400;line-height:1.15}
.d-vow .vw-course p{max-width:40ch;font-size:15.5px;font-style:italic;color:var(--dim)}
.d-vow .vw-course span{font-family:var(--cap);font-size:14px;letter-spacing:.16em;color:var(--gold-d)}
.d-vow .vw-course small{font-family:var(--cap);font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--sage-d)}
.d-vow .vw-visit{display:grid;gap:clamp(48px,6vw,100px);align-items:start}
@media (min-width:960px){.d-vow .vw-visit{grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)}}
.d-vow .vw-visit-copy{display:grid;gap:22px;align-content:start}
.d-vow .vw-visit-copy .vw-head{margin-bottom:8px}
.d-vow .vw-visit-copy>p{max-width:50ch;color:var(--dim)}
.d-vow .vw-card{position:relative;padding:clamp(34px,4vw,60px) clamp(24px,3.6vw,56px);background:var(--paper);box-shadow:0 30px 60px -44px rgba(58,51,48,.4)}
.d-vow .vw-card::before,.d-vow .vw-card::after{content:"";position:absolute;inset:10px;border:1px solid var(--gold);opacity:.5;pointer-events:none}
.d-vow .vw-card::after{inset:15px;opacity:.22}
.d-vow .vw-card>*{position:relative;z-index:1}
.d-vow .vw-card-top{display:grid;gap:8px;justify-items:center;margin-bottom:26px;text-align:center}
.d-vow .vw-card-top h3{font-size:clamp(30px,2.6vw,40px);font-style:italic}
.d-vow .vw-card-top .vw-now{margin-top:0}
.d-vow .vw-card .z-hours{border-top:0}
.d-vow .vw-card .z-hours div{position:relative;align-items:baseline;gap:12px;padding:12px 10px;margin-inline:-10px;border-bottom:0}
.d-vow .vw-card .z-hours div::after{content:"";position:absolute;left:10px;right:10px;bottom:6px;border-bottom:1px dotted rgba(58,51,48,.3)}
.d-vow .vw-card .z-hours dt{font-family:var(--script);font-size:clamp(19px,1.5vw,22px);font-style:italic}
.d-vow .vw-card .z-hours dd{font-family:var(--cap);font-size:15px;letter-spacing:.12em;color:var(--ink)}
.d-vow .z-hours div.is-today{background:var(--ivory2)}
.d-vow .z-hours div.is-today dt{color:var(--gold-d)}
.d-vow .z-hours div.is-today dt::after{content:"";display:inline-block;width:6px;height:6px;margin:0 0 3px 10px;background:var(--gold-d);transform:rotate(45deg)}
.d-vow .vw-reach{display:grid;gap:6px;justify-items:start;font-style:normal}
.d-vow .vw-reach a,.d-vow .vw-reach span{display:inline-flex;align-items:center;min-height:40px;font-family:var(--script);font-size:clamp(22px,1.9vw,28px);font-style:italic;line-height:1.2}
.d-vow .vw-reach a{background:linear-gradient(var(--gold),var(--gold)) 0 92%/0 1px no-repeat;transition:background-size .9s var(--soft),color .4s}
.d-vow .vw-reach a:hover{background-size:100% 1px;color:var(--gold-d)}
.d-vow .vw-reach small{font-family:var(--cap);font-size:12px;font-style:normal;letter-spacing:.26em;text-transform:uppercase;color:var(--gold-d)}
.d-vow .vw-form .z-form{gap:26px}
.d-vow .vw-form-top{display:grid;gap:10px;justify-items:center;margin-bottom:28px;text-align:center}
.d-vow .vw-form-top h3{font-size:clamp(30px,2.6vw,40px);font-style:italic}
.d-vow .z-field label,.d-vow .z-chipset legend{font-family:var(--cap);font-size:12.5px;letter-spacing:.22em;color:var(--gold-d)}
.d-vow .z-field input,.d-vow .z-field select,.d-vow .z-field textarea{padding-inline:0;border:0;border-bottom:1px solid rgba(58,51,48,.28);border-radius:0;background:transparent;font-weight:350;transition:border-color .6s}
.d-vow .z-field select{background:linear-gradient(45deg,transparent 50%,var(--gold-d) 50%) calc(100% - 10px) 55%/5px 5px no-repeat,linear-gradient(-45deg,transparent 50%,var(--gold-d) 50%) calc(100% - 5px) 55%/5px 5px no-repeat}
.d-vow .z-field textarea{min-height:120px}
.d-vow .z-field input:focus,.d-vow .z-field select:focus,.d-vow .z-field textarea:focus{border-color:var(--gold-d)}
.d-vow .z-field :focus-visible{outline:none}
.d-vow .z-chips button{border-radius:50%;aspect-ratio:1;min-height:44px;font-family:var(--script);font-size:20px}
.d-vow .z-chips button[aria-pressed="true"]{background:var(--ink);border-color:var(--ink);color:#fffdf8}
.d-vow .form-note{text-align:center}
.d-vow .form-status{border-color:var(--gold);background:var(--ivory2);font-family:var(--script);font-size:19px;font-style:italic;text-align:center}
.d-vow .vw-chan{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));border-block:1px solid var(--line)}
.d-vow .vw-chan li+li{border-left:1px solid var(--line)}
@media (max-width:620px){.d-vow .vw-chan li+li{border-left:0;border-top:1px solid var(--line)}}
.d-vow .vw-chan a{display:grid;gap:12px;justify-items:center;padding:clamp(34px,4vw,54px) 24px;text-align:center;transition:background-color .8s}
.d-vow .vw-chan a:hover{background:var(--paper)}
.d-vow .vw-chan a>span{display:grid;place-items:center;width:60px;height:60px;border:1px solid var(--gold);border-radius:50%;color:var(--gold-d)}
.d-vow .vw-chan svg{width:22px;height:22px;stroke-width:1.2}
.d-vow .vw-chan h3{font-size:clamp(26px,2.2vw,32px);font-style:italic}
.d-vow .vw-chan p{color:var(--dim)}
.d-vow .vw-faq{max-width:900px;margin-inline:auto}
.d-vow .vw-faq details{border-bottom:1px solid var(--line)}
.d-vow .vw-faq details:first-child{border-top:1px solid var(--line)}
.d-vow .vw-faq summary{display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:44px;padding:clamp(22px,2.4vw,30px) 0;font-family:var(--script);font-size:clamp(22px,2vw,30px);font-weight:400;line-height:1.2;list-style:none;cursor:pointer;transition:color .5s}
.d-vow .vw-faq summary::-webkit-details-marker{display:none}
.d-vow .vw-faq summary:hover,.d-vow .vw-faq details[open] summary{color:var(--gold-d)}
.d-vow .vw-faq summary i{position:relative;flex:none;width:14px;height:14px;border:1px solid var(--gold-d);transform:rotate(45deg);transition:transform .9s var(--soft),background-color .6s}
.d-vow .vw-faq details[open] summary i{transform:rotate(225deg);background:var(--gold-d)}
.d-vow .vw-faq details>p{max-width:66ch;padding:0 0 30px;color:var(--dim);animation:vw-fade .9s var(--soft)}
.d-vow .z-sec.z-cta{background:var(--ink);color:#f8f4ec;--z-dim:rgba(248,244,236,.74)}
.d-vow .z-cta h2{font-size:clamp(42px,5.6vw,92px)}
.d-vow .z-cta h2 em{color:var(--champ)}
.d-vow .z-cta .vw-fill{background:#f8f4ec;color:var(--ink);border-color:#f8f4ec}
.d-vow .z-statement{background:var(--ivory2)}
.d-vow .z-statement h2{max-width:24ch;font-size:var(--z-statement);font-style:italic;line-height:1.16}
.d-vow .z-statement h2::before{content:"\\201C";display:block;height:.5em;font-size:2.2em;line-height:1;color:var(--gold)}
.d-vow .z-statement h2 em{font-style:normal;color:var(--gold-d)}
.d-vow .z-showcase{min-height:min(88svh,860px)}
.d-vow .z-showcase .z-show-in{justify-items:center;text-align:center}
.d-vow .z-showcase h2{font-size:clamp(44px,6vw,100px);font-style:italic}
.d-vow .z-showcase h2 em{color:var(--champ)}
.d-vow .z-showcase.has-pic::after{background:linear-gradient(180deg,rgba(58,51,48,.08),rgba(58,51,48,.62))}
.d-vow .z-showcase.has-pic .z-show-in::before{content:"";position:absolute;inset:-30px 0;border-block:1px solid rgba(255,253,248,.35);pointer-events:none}
.d-vow .z-showcase .vw-line{border-color:#fffdf8;color:#fffdf8}
.d-vow .z-showcase .vw-line:hover{color:var(--ink)}
.d-vow .z-head{justify-items:center;margin-inline:auto;text-align:center}
.d-vow .z-card,.d-vow .z-panel,.d-vow .z-channel{position:relative;border:0;background:var(--paper);box-shadow:inset 0 0 0 1px rgba(173,139,92,.4),inset 0 0 0 6px var(--paper),inset 0 0 0 7px rgba(173,139,92,.22)}
.d-vow .z-pack{justify-items:center;text-align:center}
.d-vow .z-pack.is-featured{background:var(--ink);color:#f8f4ec;--z-ink:#f8f4ec;--z-dim:rgba(248,244,236,.74)}
.d-vow .z-tag{font-family:var(--cap);letter-spacing:.3em}
.d-vow .z-ticks li::before{width:6px;height:6px;top:.7em;border:1px solid var(--gold);background:none;transform:rotate(45deg)}
.d-vow .z-team .z-grid{text-align:center}
.d-vow .z-team .z-pic{border-radius:50% 50% 50% 50%/40% 40% 40% 40%}
.d-vow .z-team h3{font-style:italic}
.d-vow .z-quotes blockquote{justify-items:center;padding:clamp(28px,3vw,44px);border:0;background:var(--paper);text-align:center}
.d-vow .z-quotes blockquote>p{font-style:italic}
.d-vow .z-steps small,.d-vow .z-rows small{font-family:var(--cap);font-size:14px;letter-spacing:.2em;color:var(--gold-d)}
.d-vow .z-ico{border-color:var(--gold);color:var(--gold-d)}
.d-vow .z-acc summary{font-family:var(--script);font-size:clamp(21px,1.8vw,27px)}
.d-vow .z-ba{border-radius:2px}
.d-vow .vw-foot{position:relative;padding:clamp(90px,10vw,150px) 0 140px;background:var(--ivory2);text-align:center;overflow:hidden}
.d-vow .vw-foot::before{content:"";position:absolute;left:50%;top:-30%;width:min(110vw,1300px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(223,230,234,.85),rgba(223,230,234,0) 62%);transform:translateX(-50%);pointer-events:none}
.d-vow .vw-foot>*{position:relative}
.d-vow .vw-foot-name{margin-top:24px;font-family:var(--script);font-size:min(13vw,calc((100vw - var(--pad) * 2) / (var(--n,8) * .48)),170px);font-style:italic;font-weight:300;line-height:1;color:var(--ink)}
.demo-js .d-vow .vw-foot-name[data-rv]{opacity:1;transform:none;-webkit-mask-image:linear-gradient(90deg,#000 42%,transparent 58%);mask-image:linear-gradient(90deg,#000 42%,transparent 58%);-webkit-mask-size:280% 100%;mask-size:280% 100%;-webkit-mask-position:100% 0;mask-position:100% 0;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;transition:-webkit-mask-position 2.6s var(--slow),mask-position 2.6s var(--slow)}
.demo-js .d-vow .vw-foot-name[data-rv].in{-webkit-mask-position:0 0;mask-position:0 0}
.d-vow .vw-foot-city{margin-top:14px;font-family:var(--cap);font-size:14px;letter-spacing:.4em;text-transform:uppercase;color:var(--gold-d)}
.d-vow .vw-foot-cta{margin-top:40px}
.d-vow .vw-foot-grid{display:grid;gap:36px;max-width:1100px;margin:clamp(60px,7vw,100px) auto 0;padding-top:clamp(40px,5vw,60px);border-top:1px solid var(--line);grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.d-vow .vw-foot-grid h3{margin-bottom:14px;font-family:var(--cap);font-size:13px;font-weight:400;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-d)}
.d-vow .vw-foot-grid a,.d-vow .vw-foot-grid span{display:block;padding:3px 0;color:var(--dim)}
.d-vow .vw-foot-grid a{display:flex;align-items:center;justify-content:center;min-height:36px;padding:0;transition:color .4s}
.d-vow .vw-foot-grid a:hover{color:var(--gold-d)}
.d-vow .vw-foot-grid p{max-width:36ch;margin-inline:auto;font-family:var(--script);font-size:20px;font-style:italic;line-height:1.4;color:var(--dim)}
.d-vow .vw-legal{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 28px;max-width:1100px;margin:56px auto 0;font-size:13px;color:var(--dim)}
.d-vow.no-photos .vw-hero .vw-glow.g1{background:radial-gradient(circle,rgba(233,220,197,.95),rgba(233,220,197,0) 66%)}
@keyframes vw-write{to{-webkit-mask-position:0 0;mask-position:0 0}}
@keyframes vw-fade{from{opacity:0}to{opacity:1}}
@keyframes vw-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes vw-oval{to{clip-path:ellipse(50% 50% at 50% 50%)}}
@keyframes vw-drift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(-6%,8%) scale(1.12)}}
@keyframes vw-time{to{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){.d-vow .vw-ln>span,.d-vow .vw-eyebrow,.d-vow .vw-sub,.d-vow .vw-ctas,.d-vow .vw-facts,.d-vow .vw-oval,.d-vow .vw-mono-art,.d-vow .vw-note,.d-vow .vw-glow{animation:none!important;opacity:1;transform:none;clip-path:none;-webkit-mask-image:none;mask-image:none}.demo-js .d-vow .vw-head h2[data-rv],.demo-js .d-vow .vw-foot-name[data-rv]{-webkit-mask-image:none;mask-image:none}.d-vow .vw-orn path,.d-vow .vw-sprig path,.d-vow .vw-oval-line ellipse{stroke-dashoffset:0;fill-opacity:1}.d-vow .vw-oval img{scale:1;transition:opacity .01ms}.d-vow .vw-gal-stage img{scale:1}}
`
  .replace(/\n/g, "")
  .trim();

/**
 * The behaviour of the design, in plain script:
 *  - SVG lines marked .vw-draw-on-view draw themselves once visible;
 *  - the opening oval cross-fades between its photographs;
 *  - services: the photograph beside the list follows the item being read (or hovered);
 *  - the timeline fills as the page scrolls and lights each step it reaches;
 *  - the gallery dissolves from photograph to photograph, pauses on hover and focus, and its
 *    round thumbnails choose a photograph.
 * Without motion everything is shown at once and nothing plays by itself.
 */
const JS = `(function(){var d=document,W=window,b=d.querySelector('.d-vow');if(!b)return;
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var io='IntersectionObserver' in W;
function warm(box){var ims=q('img[loading=lazy]',box);if(!ims.length)return;if(!io){ims.forEach(function(m){m.loading='eager'});return}var w=new IntersectionObserver(function(es){if(es[0].isIntersecting){ims.forEach(function(m){m.loading='eager'});w.disconnect()}},{rootMargin:'600px 0px'});w.observe(box)}
q('[data-svc],[data-gal],[data-fade]').forEach(warm);
var draws=q('[data-draw]');if(reduce||!io)draws.forEach(function(n){n.classList.add('vw-draw')});else{var dio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vw-draw');dio.unobserve(e.target)}})},{threshold:.2});draws.forEach(function(n){dio.observe(n)})}
q('[data-fade]').forEach(function(f){var ims=q('img',f),k=0;if(ims.length<2||reduce)return;setInterval(function(){if(d.hidden)return;ims[k].classList.remove('is-on');k=(k+1)%ims.length;ims[k].classList.add('is-on')},6000)});
q('[data-svc]').forEach(function(s){var items=q('.vw-svc-item',s),ims=q('.vw-svc-stage figure',s),lab=s.querySelector('[data-svc-n]');if(!items.length)return;function on(n){items.forEach(function(x,j){x.classList.toggle('is-on',j===n)});ims.forEach(function(x){x.classList.toggle('is-on',+x.getAttribute('data-k')===n)});if(lab)lab.textContent=items[n].getAttribute('data-n')||''}
on(0);items.forEach(function(x,j){x.addEventListener('pointerenter',function(){on(j)})});if(io){var sio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)on(items.indexOf(e.target))})},{rootMargin:'-45% 0px -45% 0px'});items.forEach(function(x){sio.observe(x)})}});
var tls=q('[data-tl]');function tl(){var vh=W.innerHeight;tls.forEach(function(t){var r=t.getBoundingClientRect();if(r.bottom<-vh||r.top>vh*2)return;var p=reduce?1:Math.max(0,Math.min(1,(vh*.62-r.top)/r.height));t.style.setProperty('--tp',p.toFixed(4));t.style.setProperty('--tl-h',r.height+'px');q('.vw-tl-step',t).forEach(function(s){var dot=s.querySelector('.vw-tl-dot');if(!dot)return;var dr=dot.getBoundingClientRect();s.classList.toggle('is-lit',dr.top+dr.height/2-r.top<=p*r.height+2)})})}
var raf=0;function ask(){if(!raf)raf=requestAnimationFrame(function(){raf=0;tl()})}if(tls.length){tl();W.addEventListener('scroll',ask,{passive:true});W.addEventListener('resize',ask)}
q('[data-gal]').forEach(function(g){var figs=q('.vw-gal-stage figure',g),bs=q('.vw-gal-thumbs button',g),cnt=g.querySelector('[data-gal-n]'),bar=g.querySelector('.vw-gal-time'),k=0,tm=0,vis=false,hold=false,dur=6000;if(figs.length<2)return;g.style.setProperty('--dur',dur+'ms');
function show(n){k=(n+figs.length)%figs.length;figs.forEach(function(f,j){f.classList.toggle('is-on',j===k)});bs.forEach(function(x,j){x.setAttribute('aria-pressed',j===k?'true':'false')});if(cnt)cnt.textContent=String(k+1).padStart(2,'0');restart()}
function restart(){clearTimeout(tm);g.classList.remove('is-playing');if(reduce||!vis||hold)return;void g.offsetWidth;g.classList.add('is-playing');tm=setTimeout(function(){show(k+1)},dur)}
bs.forEach(function(x,j){x.addEventListener('click',function(){show(j)})});
g.addEventListener('pointerenter',function(){hold=true;restart()});g.addEventListener('pointerleave',function(){hold=false;restart()});g.addEventListener('focusin',function(){hold=true;restart()});g.addEventListener('focusout',function(){hold=false;restart()});
if(io){new IntersectionObserver(function(es){es.forEach(function(e){vis=e.isIntersecting;restart()})},{threshold:.35}).observe(g)}})})();`;

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/** A hairline ornament: two rules, a diamond and a small loop. It draws itself when it appears. */
const Orn = ({ rv }: { rv?: boolean }) => (
  <svg className="vw-orn" viewBox="0 0 220 24" aria-hidden="true" {...(rv ? { "data-rv": true } : {})}>
    <path d="M2 12H84" pathLength={1} style={css({ "--k": 0 })} />
    <path d="M136 12h82" pathLength={1} style={css({ "--k": 0 })} />
    <path d="M110 4l7 8-7 8-7-8Z" pathLength={1} style={css({ "--k": 1 })} />
    <path d="M84 12c6-7 12-7 15 0M136 12c-6 7-12 7-15 0" pathLength={1} style={css({ "--k": 2 })} />
  </svg>
);

/** A drawn sprig of leaves. */
const Sprig = ({ draw = true }: { draw?: boolean }) => (
  <svg className="vw-sprig" viewBox="0 0 120 220" aria-hidden="true" {...(draw ? { "data-draw": true } : {})}>
    <path d="M60 216C57 160 67 110 58 8" pathLength={1} style={css({ "--k": 0 })} />
    <path d="M59 172C40 162 30 146 28 128c18 6 28 22 31 44Z" pathLength={1} style={css({ "--k": 1 })} />
    <path d="M61 142c19-10 29-25 31-43-18 6-28 22-31 43Z" pathLength={1} style={css({ "--k": 2 })} />
    <path d="M59 110C42 100 34 86 33 70c16 7 24 22 26 40Z" pathLength={1} style={css({ "--k": 3 })} />
    <path d="M60 80c16-10 24-24 25-40-15 7-23 22-25 40Z" pathLength={1} style={css({ "--k": 4 })} />
    <path d="M58 50C46 40 42 28 44 14c10 10 14 22 14 36Z" pathLength={1} style={css({ "--k": 5 })} />
  </svg>
);

function Head({ kicker, title, intro, id, left }: { kicker?: string; title: string; intro?: string; id?: string; left?: boolean }) {
  return (
    <header className={`vw-head${left ? " is-left" : ""}`}>
      {kicker ? (
        <p className="vw-kick" data-rv>
          {kicker}
        </p>
      ) : null}
      <h2 id={id} className={title.replace(/\*/g, "").length > 44 ? "is-long" : undefined} data-rv>
        {em(title)}
      </h2>
      <Orn rv />
      {intro ? (
        <p className="vw-intro" data-rv>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

function VReach({ c }: { c: Ctx }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email && !b.mapsUrl) return null;
  return (
    <address className="vw-reach" data-rv>
      {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
      {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
      {b.address ? <span>{b.address}</span> : null}
      {b.mapsUrl ? (
        <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
          <small>{c.t.route} →</small>
        </a>
      ) : null}
    </address>
  );
}

const Go = () => <i aria-hidden="true" />;

/**
 * A wedding or event enquiry: what kind of help, the date and how many guests, then who is asking.
 * It is a demonstration form like every other (it sends nothing and says so); DemoForm has no
 * field for a date without a time or for a guest count in the dozens.
 */
function Enquiry({ c, options, uid }: { c: Ctx; options: string[]; uid: string }) {
  const { t } = c;
  const id = (n: string) => `${uid}-${n}`;
  const guests = ["< 50", "50 – 100", "100 – 150", "150 – 200", "200+"].map((g) => `${g} ${t.persons}`);
  return (
    <form className="z-form" data-demo-form noValidate aria-describedby={id("note")}>
      <div className="z-fields">
        {options.length > 0 ? (
          <div className="z-field z-field-wide">
            <label htmlFor={id("service")}>{t.service}</label>
            <select id={id("service")} name="service" required defaultValue="">
              <option value="" disabled>
                {t.choose}
              </option>
              {options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="z-field">
          <label htmlFor={id("date")}>{t.date}</label>
          <input id={id("date")} name="date" type="date" required />
        </div>
        <div className="z-field">
          <label htmlFor={id("guests")}>{t.guests}</label>
          <select id={id("guests")} name="guests" required defaultValue="">
            <option value="" disabled>
              {t.choose}
            </option>
            {guests.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="z-field">
          <label htmlFor={id("name")}>{t.name}</label>
          <input id={id("name")} name="name" required autoComplete="name" />
        </div>
        <div className="z-field">
          <label htmlFor={id("email")}>{t.email}</label>
          <input id={id("email")} name="email" type="email" required autoComplete="email" />
        </div>
        <div className="z-field z-field-wide">
          <label htmlFor={id("msg")}>{t.message}</label>
          <textarea id={id("msg")} name="message" rows={4} />
        </div>
      </div>
      <button className="btn vw-fill" type="submit">
        {t.submit.quote}
      </button>
      <p id={id("note")} className="form-note">
        {t.formNote}
      </p>
      <p className="form-status" role="status" aria-live="polite" data-done={t.formDone} />
    </form>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const half = Math.ceil(c.nav.length / 2);
  return (
    <>
      <header className="vw-hdr hdr">
        <div className="vw-wrap vw-bar">
          <nav aria-label={c.t.menu} className="vw-links vw-left" data-nav>
            {c.nav.slice(0, half).map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#top" className="vw-logo" aria-label={c.name}>
            <span className="vw-mono" aria-hidden="true">
              {c.name.charAt(0)}
            </span>
            <span className="vw-name">{c.name}</span>
          </a>
          <div className="vw-side">
            <nav aria-label={c.t.explore} className="vw-links">
              {c.nav.slice(half).map((n) => (
                <a key={n.id} href={`#${n.id}`}>
                  {n.label}
                </a>
              ))}
            </nav>
            <a href={cta.href} className="btn vw-line vw-cta">
              {cta.label}
            </a>
          </div>
          <button type="button" className="vw-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu" className="vw-menu" data-nav inert>
        <div className="vw-menu-in">
          <svg className="vw-orn vw-draw" viewBox="0 0 220 24" aria-hidden="true">
            <path d="M2 12H84" pathLength={1} />
            <path d="M136 12h82" pathLength={1} />
            <path d="M110 4l7 8-7 8-7-8Z" pathLength={1} />
            <path d="M84 12c6-7 12-7 15 0M136 12c-6 7-12 7-15 0" pathLength={1} />
          </svg>
          <nav aria-label={c.t.menu}>
            {c.nav.map((n, k) => (
              <a key={n.id} href={`#${n.id}`} style={i(k)}>
                <small>{ROMAN[k]}</small>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="vw-menu-foot">
            <a href={cta.href}>{cta.label}</a>
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            {b.city ? <span>{b.city}</span> : null}
          </div>
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const more = p ? [c.spare(), c.spare()].filter((x): x is Photo => Boolean(x)) : [];
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 56 ? "is-s" : plain.length > 32 ? "is-m" : undefined;
  const { lines } = splitLines(hero.headline, plain.length > 34 ? 3 : 2);
  const facts = heroFacts(c);
  return (
    <section className="vw-hero">
      <span className="vw-glow g1" aria-hidden="true" />
      <span className="vw-glow g2" aria-hidden="true" />
      <div className="vw-wrap vw-hero-g">
        <div className="vw-hero-copy">
          {hero.eyebrow ? <p className="vw-eyebrow">{hero.eyebrow}</p> : null}
          <h1 className={`vw-h1${size ? ` ${size}` : ""}`}>
            {lines.map((line, n) => (
              <span className="vw-ln" key={n}>
                <span style={i(n)}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="vw-sub">{hero.subheadline}</p>
          <div className="vw-ctas">
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label} <Go />
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
          {facts.length > 0 && (
            <dl className="vw-facts">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <NowBadge c={c} className="vw-now" />
        </div>
        <div className="vw-art" data-px>
          {p ? (
            <div className="vw-oval">
              <figure data-fade>
                <Pic p={p} eager className="is-on" sizes="(min-width: 980px) 40vw, 90vw" />
                {more.map((x, k) => (
                  <Pic key={k} p={x} sizes="(min-width: 980px) 40vw, 90vw" />
                ))}
              </figure>
            </div>
          ) : (
            <div className="vw-mono-art" aria-hidden="true">
              <b>{c.name.charAt(0)}</b>
              {c.spec.business.city ? <span>{c.spec.business.city}</span> : null}
            </div>
          )}
          <svg className="vw-oval-line" viewBox="0 0 200 240" preserveAspectRatio="none" aria-hidden="true" data-draw>
            <ellipse cx="100" cy="120" rx="98" ry="118" pathLength={1} style={css({ "--k": 2 })} />
          </svg>
          <Sprig />
          {hero.note ? <p className="vw-note">{hero.note}</p> : null}
        </div>
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  return (
    <footer className="vw-foot">
      <div className="vw-wrap">
        <Orn rv />
        <p className="vw-foot-name" data-rv style={css({ "--n": Math.max(6, Math.min(c.name.length, 22)) })}>
          {c.name}
        </p>
        {b.city ? <p className="vw-foot-city">{b.city}</p> : null}
        <p className="vw-foot-cta">
          <a href={cta.href} className="btn vw-fill">
            {cta.label} <Go />
          </a>
        </p>
        <div className="vw-foot-grid">
          <div>
            <h3>{c.t.explore}</h3>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </div>
          {c.spec.footer.blurb ? (
            <div>
              <h3>{c.name}</h3>
              <p>{c.spec.footer.blurb}</p>
            </div>
          ) : null}
          {b.address || b.phone || b.email || b.mapsUrl ? (
            <div>
              <h3>{c.t.contact}</h3>
              {b.address ? <span>{b.address}</span> : null}
              {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
              {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
              {b.mapsUrl ? (
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {c.t.route}
                </a>
              ) : null}
            </div>
          ) : b.openingHours?.length ? (
            <div>
              <h3>{c.t.hours}</h3>
              {b.openingHours.slice(0, 7).map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          ) : null}
        </div>
        <Legal c={c} className="vw-legal" />
      </div>
    </footer>
  );
}

function HoursCard({ c }: { c: Ctx }) {
  return (
    <div className="vw-card" data-rv>
      <div className="vw-card-top">
        <h3>{c.t.hours}</h3>
        <NowBadge c={c} className="vw-now" />
      </div>
      {c.spec.business.openingHours?.length ? <Hours c={c} /> : <p className="z-note">{c.t.hoursTbc}</p>}
    </div>
  );
}

export const vow: Family = {
  key: "vow",
  root: "d-vow",
  fonts: ["Cormorant", "Italiana", "DM Sans"],
  themeColor: "#f8f4ec",
  accent: "#7f6239",
  onAccent: "#fffdf8",
  css: "",
  extra: CSS,
  js: JS + TODAY_JS,
  cls: { wrap: "vw-wrap", eyebrow: "vw-kick", btn: "vw-fill", btnAlt: "vw-line", btnText: "vw-text" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="vw-sec" id={s.id}>
          <div className={`vw-wrap vw-about${p ? "" : " is-solo"}`}>
            {p ? (
              <div className="vw-about-pic" data-rv>
                <div className="vw-frame">
                  <div data-px>
                    <Pic p={p} sizes="(min-width: 960px) 38vw, 90vw" />
                  </div>
                </div>
                <Sprig />
              </div>
            ) : null}
            <div className="vw-about-copy">
              <Head kicker={c.t.kick.about} title={s.title} left={Boolean(p)} />
              <p className="vw-lead" data-rv>
                {first}
              </p>
              {rest.map((x, k) => (
                <p key={k} data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ul className="vw-ticks" data-rv>
                  {s.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      );
    },
    services: (s, c) => {
      const pics = s.items.map((_, k) => c.photo(`art:svc${k}`));
      const has = pics.some(Boolean);
      return (
        <section className="vw-sec is-tint" id={s.id}>
          <div className="vw-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
            <div className={`vw-svc${has ? " has-pics" : ""}`} data-svc>
              {has ? (
                <div className="vw-svc-stage" aria-hidden="true">
                  <div>
                    {pics.map((p, k) =>
                      p ? (
                        <figure key={k} data-k={k} className={k === 0 ? "is-on" : undefined}>
                          <Pic p={p} sizes="34vw" />
                        </figure>
                      ) : null,
                    )}
                  </div>
                  <p data-svc-n>{ROMAN[0]}</p>
                </div>
              ) : null}
              <ol className="vw-svc-list">
                {s.items.map((it, k) => {
                  const p = pics[k];
                  return (
                    <li key={k} className={`vw-svc-item${k === 0 ? " is-on" : ""}`} data-n={ROMAN[k]} data-rv style={i(k % 3)}>
                      <span className="vw-num">{ROMAN[k]}.</span>
                      <div>
                        <h3>{it.title}</h3>
                        <p>{it.description}</p>
                        {it.duration || it.price ? (
                          <p className="vw-svc-meta">
                            {it.duration ? <span>{it.duration}</span> : null}
                            {it.price ? <span>{it.price}</span> : null}
                          </p>
                        ) : null}
                      </div>
                      {p ? (
                        <figure className="vw-svc-thumb">
                          <Pic p={p} sizes="90vw" />
                        </figure>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="vw-sec" id={s.id}>
        <div className="vw-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="vw-styles">
            {s.items.map((it, k) => (
              <li key={k} className="vw-style" data-rv style={i(k % 3)}>
                <span className="vw-style-ico">
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
      <section className="vw-sec is-powder" id={s.id}>
        <div className="vw-wrap">
          <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
          <div className="vw-tl" data-tl>
            <div className="vw-tl-track" aria-hidden="true">
              <span className="vw-tl-fill" />
              <span className="vw-tl-tip" />
            </div>
            <ol>
              {s.steps.map((st, k) => (
                <li key={k} className="vw-tl-step" data-rv>
                  <span className="vw-tl-dot" aria-hidden="true" />
                  <div className="vw-tl-card">
                    <span className="vw-tl-n">{ROMAN[k]}</span>
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
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p)).slice(0, 9);
      if (!pics.length) return null;
      const label = s.title.replace(/\*/g, "");
      return (
        <section className="vw-sec is-paper" id={s.id}>
          <div className="vw-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
            <div className="vw-gal" data-gal data-rv>
              <div className="vw-gal-stage">
                {pics.map((p, k) => (
                  <figure key={k} className={k === 0 ? "is-on" : undefined}>
                    <Pic p={p} sizes="(min-width: 1380px) 1240px, 92vw" />
                  </figure>
                ))}
              </div>
              {pics.length > 1 ? (
                <>
                  <div className="vw-gal-time" aria-hidden="true">
                    <i />
                  </div>
                  <div className="vw-gal-bar">
                    <div className="vw-gal-thumbs" role="group" aria-label={label}>
                      {pics.map((p, k) => (
                        <button key={k} type="button" aria-pressed={k === 0} aria-label={`${k + 1} / ${pics.length}: ${p.alt}`}>
                          <Pic p={p} sizes="90px" />
                        </button>
                      ))}
                    </div>
                    <p className="vw-gal-count" aria-hidden="true">
                      <b data-gal-n>01</b> — {String(pics.length).padStart(2, "0")}
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    packages: (s, c) => (
      <section className="vw-sec is-champ" id={s.id}>
        <div className="vw-wrap">
          <Head kicker={c.t.kick.packages} title={s.title} intro={s.intro} />
          <div className="vw-packs">
            {s.items.map((it, k) => (
              <div key={k} className={`vw-pack${it.featured ? " is-featured" : ""}`} data-rv style={i(k % 3)}>
                {it.featured ? <p className="vw-pack-tag">{c.t.popular}</p> : null}
                <h3>{it.name}</h3>
                <Orn />
                <p className="vw-pack-price">
                  {it.price ? (
                    <>
                      <b>{it.price}</b>
                      {it.unit ? <span>{it.unit}</span> : null}
                    </>
                  ) : (
                    <span>{c.t.onRequest}</span>
                  )}
                </p>
                {it.description ? <p>{it.description}</p> : null}
                {it.features.length > 0 && (
                  <ul>
                    {it.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {s.note ? (
            <p className="vw-note-line" data-rv>
              {s.note}
            </p>
          ) : null}
        </div>
      </section>
    ),
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      return (
        <section className="vw-sec is-paper" id={s.id}>
          <div className="vw-wrap">
            <Head kicker={c.t.kick.menu} title={s.title} intro={s.intro} />
            <div className={`vw-dinner${cats.length > 1 ? " is-many" : ""}`}>
              {cats.map((cat, k) => (
                <div key={k} className="vw-course" data-rv style={i(k % 2)}>
                  <h3>{cat.name}</h3>
                  <Orn />
                  <ul>
                    {cat.items.map((d, m) => (
                      <li key={m}>
                        <b>{d.name}</b>
                        {d.description ? <p>{d.description}</p> : null}
                        {d.tags?.length ? <small>{d.tags.join(" · ")}</small> : null}
                        {d.price ? <span>{d.price}</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {s.note ? (
              <p className="vw-note-line" data-rv>
                {s.note}
              </p>
            ) : null}
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="vw-sec is-tint" id={s.id}>
        <div className="vw-wrap vw-visit">
          <div className="vw-visit-copy">
            <Head kicker={c.t.kick.hours} title={s.title} left />
            {s.note ? <p data-rv>{s.note}</p> : null}
            <VReach c={c} />
          </div>
          <HoursCard c={c} />
        </div>
      </section>
    ),
    contact: (s, c) => (
      <section className="vw-sec" id={s.id}>
        <div className="vw-wrap vw-visit">
          <div className="vw-visit-copy">
            <Head kicker={c.t.kick.contact} title={s.title} left />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <VReach c={c} />
            {!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking") && c.spec.business.openingHours?.length ? <HoursCard c={c} /> : null}
          </div>
          {s.showForm ? (
            <div className="vw-card vw-form" data-rv>
              <div className="vw-form-top">
                <h3>{c.t.send}</h3>
                <Orn />
              </div>
              <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
            </div>
          ) : null}
        </div>
      </section>
    ),
    booking: (s, c) => (
      <section className="vw-sec is-tint" id={s.id}>
        <div className="vw-wrap vw-visit">
          <div className="vw-visit-copy">
            <Head kicker={c.t.kick.booking} title={s.title} left />
            {s.body ? <p data-rv>{s.body}</p> : null}
            <VReach c={c} />
            {c.spec.business.openingHours?.length ? <HoursCard c={c} /> : null}
          </div>
          <div className="vw-card vw-form" data-rv>
            <div className="vw-form-top">
              <h3>{c.t.submit[s.kind]}</h3>
              <Orn />
            </div>
            {s.kind === "quote" ? <Enquiry c={c} options={s.options} uid={`f-${s.id}`} /> : <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} guests="chips" />}
          </div>
        </div>
      </section>
    ),
    order: (s, c) => (
      <section className="vw-sec" id={s.id}>
        <div className="vw-wrap">
          <Head kicker={c.t.kick.order} title={s.title} intro={s.body} />
          <ul className="vw-chan">
            {s.channels.map((ch, k) => (
              <li key={k} data-rv style={i(k % 3)}>
                <a href={ch.href} {...(/^https?:/.test(ch.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span>
                    <Icon name={ch.icon} />
                  </span>
                  <h3>{ch.label}</h3>
                  <p>{ch.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    faq: (s, c) => (
      <section className="vw-sec" id={s.id}>
        <div className="vw-wrap">
          <Head kicker={c.t.kick.faq} title={s.title} />
          <div className="vw-faq" data-acc>
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
      </section>
    ),
  },
};
