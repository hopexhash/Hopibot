import { Fragment, type ReactNode } from "react";
import { CSS } from "./css/automotive";
import { Btn, css, DemoForm, em, heroFacts, hoursRows, i, Icon, Legal, long, Pic, splitLines, tel, type Ctx, type Family, type FormKind, type HeadProps, type Photo } from "./kit";

/**
 * Obsidian (demo: /demos/automotive). Near-black and technical: a very wide display face,
 * ice-blue hairlines that catch the light, chamfered panels and numbered labels. Made for
 * car detailers, garages and dealers: an index of services, packages side by side, a
 * numbered process and an appointment form.
 */

const CHAMFER = (n: number) => `polygon(0 0,calc(100% - ${n}px) 0,100% ${n}px,100% 100%,${n}px 100%,0 calc(100% - ${n}px))`;

const EXTRA = `
.d-obsidian{--o-display:"Unbounded";--o-sans:"Inter";--z-bg2:var(--bg-2);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--ice);--z-on-accent:#0a0c10;--z-display:var(--o-display),system-ui,sans-serif;--z-display-weight:300;--z-radius:0;--z-field-radius:0;--z-ico-radius:0;--z-sec:var(--sec);--z-h3:clamp(17px,1.7vw,25px);--z-statement:clamp(21px,3.1vw,48px)}
.d-obsidian main{counter-reset:osec}
.d-obsidian main>section{--sbg:var(--bg);--pbg:var(--bg-2)}
.d-obsidian main>section:nth-of-type(2){--pbg:var(--bg)}
.d-obsidian main>section:nth-of-type(2n+3){--sbg:var(--bg-2);--pbg:var(--bg);background:linear-gradient(180deg,rgba(169,220,255,.035),transparent 340px),var(--bg-2)}
.d-obsidian main>section:nth-of-type(2n+3)::before{content:"";position:absolute;inset:0 0 auto 0;z-index:1;height:1px;background:linear-gradient(90deg,transparent 4%,rgba(169,220,255,.5) 30%,rgba(232,237,242,.14) 60%,transparent 96%)}
.d-obsidian .o-head{counter-increment:osec}
.d-obsidian .o-num::before{content:counter(osec,decimal-leading-zero)}
.d-obsidian .o-eye span{flex:none}
.d-obsidian h2{text-wrap:balance}
.d-obsidian h2 em{font-style:normal;color:var(--mute)}
.d-obsidian h2.is-long{font-size:clamp(22px,3.3vw,50px);line-height:1.1}
.d-obsidian h3{overflow-wrap:break-word}
.d-obsidian .o-btn{padding-block:10px;max-width:100%}
.d-obsidian .o-logo{flex:0 1 auto;min-width:0}
.d-obsidian .o-logo .o-init,.d-obsidian .o-crew .o-init{display:grid;flex:none;place-items:center;width:32px;height:32px;border:1px solid rgba(169,220,255,.5);background:rgba(169,220,255,.1);clip-path:${CHAMFER(8)};font-size:14px;letter-spacing:0;color:var(--ice)}
.d-obsidian .o-logo .o-logo-t{grid-template-columns:minmax(0,1fr);min-width:0}
.d-obsidian .o-logo-t b,.d-obsidian .o-logo-t small{display:block;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-obsidian .o-logo-t b{font-weight:500}
.d-obsidian .o-logo.is-long .o-logo-t b{font-size:11px;letter-spacing:.05em}
.d-obsidian .o-logo.is-tail .o-logo-t small{letter-spacing:.16em}
.d-obsidian .o-links{flex:none;white-space:nowrap}
@media (max-width:1359px){.d-obsidian .o-links a.is-wide{display:none}}
.d-obsidian .o-nav-cta{flex:none;max-width:280px}
.d-obsidian .o-nav-cta span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-obsidian .o-burger{flex:none;cursor:pointer}
.d-obsidian .o-menu nav span{min-width:0;overflow-wrap:break-word}
.d-obsidian .o-menu-foot dd{margin:4px 0 0}
.d-obsidian .o-hero h1{--fs:clamp(38px,12.2vw,62px);font-size:min(var(--fs),calc(122vw / var(--w,8)));text-wrap:balance;overflow-wrap:break-word}
.d-obsidian .o-hero h1.is-l{--fs:clamp(32px,10vw,54px)}
.d-obsidian .o-hero h1.is-m{--fs:clamp(28px,8.2vw,46px);line-height:1.02}
.d-obsidian .o-hero h1.is-s{--fs:clamp(24px,6.8vw,38px);line-height:1.06}
.d-obsidian .o-hero h1 em{font-style:normal;background:linear-gradient(180deg,#fff 6%,var(--ice) 52%,#6b9cbf 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.d-obsidian .o-hero.no-pic .o-hero-stage{background:radial-gradient(80% 60% at 78% 50%,rgba(169,220,255,.12),transparent 64%),linear-gradient(180deg,#050608,#0a0c10)}
.d-obsidian .o-hero-plate{position:relative;order:2;z-index:0;margin:30px calc(var(--pad) * -1) 14px;padding:.06em 0;overflow:hidden;font-family:var(--o-display),sans-serif;font-size:min(36vw,calc(112vw / var(--n,6)));font-weight:500;line-height:.86;letter-spacing:-.03em;white-space:nowrap;text-align:center;text-transform:uppercase;background:linear-gradient(180deg,rgba(169,220,255,.02) 4%,rgba(190,228,255,.34) 50%,rgba(169,220,255,.02) 96%);-webkit-background-clip:text;background-clip:text;color:transparent;user-select:none;pointer-events:none;animation:o-fade 1.6s var(--ease) .3s both}
.d-obsidian .o-hero-plate::after{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:linear-gradient(90deg,transparent,var(--ice) 28%,#fff 50%,var(--ice) 72%,transparent);box-shadow:0 0 26px 3px rgba(169,220,255,.45)}
.d-obsidian .o-strip a{display:inline-block;margin:-12px 0;padding:12px 0;text-decoration:underline;text-decoration-color:var(--line-2);text-underline-offset:4px}
.d-obsidian .o-strip[data-n="1"]{grid-template-columns:minmax(0,1fr)}
.d-obsidian .o-strip[data-n="3"] div:nth-child(3){grid-column:1 / -1}
.d-obsidian .o-strip div{min-width:0}
@media (max-width:899px){.d-obsidian .o-hero.no-pic .o-hero-stage{min-height:min(100svh,620px)}}
@media (min-width:900px){.d-obsidian .o-hero h1{--fs:clamp(56px,min(8.3vw,15vh),156px);font-size:min(var(--fs),calc(128vw / var(--w,8)));white-space:normal}.d-obsidian .o-hero h1.is-l{--fs:clamp(48px,min(6.2vw,12vh),116px)}.d-obsidian .o-hero h1.is-m{--fs:clamp(40px,min(4.6vw,9.5vh),86px)}.d-obsidian .o-hero h1.is-s{--fs:clamp(34px,min(3.6vw,7.5vh),66px);max-width:26em}.d-obsidian .o-hero.no-pic .o-hero-stage{min-height:max(84svh,640px)}.d-obsidian .o-hero-plate{position:absolute;inset:auto 0 24% 0;margin:0;font-size:min(27vw,calc(116vw / var(--n,6)))}.d-obsidian .o-strip[data-n="1"]{grid-template-columns:minmax(0,1fr)}.d-obsidian .o-strip[data-n="2"]{grid-template-columns:repeat(2,minmax(0,1fr))}.d-obsidian .o-strip[data-n="3"]{grid-template-columns:repeat(3,minmax(0,1fr))}.d-obsidian .o-strip[data-n="3"] div:nth-child(3){grid-column:auto}}
.d-obsidian .o-svc-h{display:contents}
.d-obsidian .o-svc-tab{font-family:var(--o-sans),system-ui,sans-serif;font-size:16px;font-weight:400;letter-spacing:0;line-height:1.62;cursor:pointer}
.d-obsidian .o-svc-name{min-width:0;overflow-wrap:break-word}
.d-obsidian .o-svc-from{white-space:nowrap}
.d-obsidian .o-svc-meta{display:flex;flex-wrap:wrap;gap:8px}
.d-obsidian .o-svc-meta span{padding:7px 12px;border:1px solid var(--line-2);font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--ice)}
.d-obsidian .o-svc-plate,.d-obsidian .o-svc-t{display:none}
@media (min-width:960px){.d-obsidian .o-svc{grid-template-rows:repeat(var(--n,5),auto) 1fr}.d-obsidian .o-svc-panel{grid-row:1 / -1}.d-obsidian .o-svc-in{position:sticky;top:96px}.d-obsidian .o-svc.is-many .o-svc-tab{min-height:74px}.d-obsidian .o-svc-panel.no-pic .o-svc-in{padding:clamp(28px,3vw,52px);border:1px solid var(--line);background:linear-gradient(160deg,rgba(232,237,242,.07),rgba(232,237,242,.012) 44%,transparent 72%),var(--bg-2);box-shadow:inset 0 1px 0 rgba(169,220,255,.34)}.d-obsidian .o-svc-plate{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:clamp(36px,5vw,84px)}.d-obsidian .o-svc-num{font-family:var(--o-display),sans-serif;font-size:clamp(72px,9vw,150px);font-weight:300;letter-spacing:-.04em;line-height:.9;color:transparent;-webkit-text-stroke:1px rgba(169,220,255,.42)}.d-obsidian .o-svc-t{display:block;font-family:var(--o-display),sans-serif;font-size:clamp(24px,2.4vw,38px);letter-spacing:-.025em;line-height:1.1;overflow-wrap:break-word}.d-obsidian .o-svc-panel.no-pic .o-svc-copy{padding-top:18px}}
.d-obsidian .o-rows li{display:grid;grid-template-columns:34px minmax(0,1fr);align-items:baseline;padding:13px 0 14px;border-top:1px solid var(--line);font-size:15px;line-height:1.45}
.d-obsidian .o-rows small{font-size:10.5px;font-weight:500;letter-spacing:.18em;color:var(--ice)}
.d-obsidian .o-sheet .o-rows li:last-child{padding-bottom:0}
.d-obsidian .o-pkg header{padding-bottom:22px}
.d-obsidian .o-pkg-meta{padding-bottom:0}
.d-obsidian .o-pkg header{container-type:inline-size}
.d-obsidian .o-pkg h3{--fs:clamp(25px,2.5vw,38px);max-width:100%;font-size:min(var(--fs),calc(100cqi / var(--w,8) / .84));overflow-wrap:break-word}
.d-obsidian .o-pkg h3.is-long{--fs:clamp(19px,1.7vw,26px);line-height:1.15}
.d-obsidian .o-price{flex-wrap:wrap;overflow:visible}
.d-obsidian .o-price b{animation:none;overflow-wrap:anywhere}
.d-obsidian .o-price.is-m b{font-size:clamp(27px,2.6vw,38px);letter-spacing:-.03em;line-height:1.1}
.d-obsidian .o-price.is-s b{font-size:clamp(19px,1.7vw,25px);letter-spacing:-.02em;line-height:1.2}
.d-obsidian .o-pkg-list{flex:1}
.d-obsidian .o-pkg:not(.is-hot) .o-pkg-list small{color:var(--mute)}
.d-obsidian .o-pk-grid[data-k="1"] .o-pkg{flex-basis:100%}
@media (min-width:960px){.d-obsidian .o-pk-grid{grid-template-columns:repeat(var(--k,3),minmax(0,1fr));grid-template-rows:auto repeat(var(--m,1),auto) auto}.d-obsidian .o-pkg-list{grid-row:2 / span var(--m,1);display:grid;grid-template-rows:subgrid;align-content:start}.d-obsidian .o-pkg .o-btn{grid-row:-2;align-self:end}.d-obsidian .o-pk-grid[data-k="1"]{grid-template-columns:minmax(0,640px)}.d-obsidian .o-pk-grid[data-k="2"]{grid-template-columns:repeat(2,minmax(0,560px))}.d-obsidian .o-pk-grid[data-k="4"] h3{--fs:clamp(20px,1.9vw,28px)}.d-obsidian .o-pk-grid[data-k="4"] h3.is-long{--fs:clamp(18px,1.5vw,23px)}}
@media (min-width:960px) and (max-width:1279px){.d-obsidian .o-pk-grid[data-k="4"]{display:flex;overflow-x:auto}.d-obsidian .o-pk-grid[data-k="4"] .o-pkg{display:flex;flex:0 0 340px}.d-obsidian .o-pk-grid[data-k="4"] .o-pkg-list{display:block}}
.d-obsidian .o-proc.is-solo{grid-template-columns:minmax(0,1fr)}
@media (min-width:960px){.d-obsidian .o-proc.is-solo .o-steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:clamp(40px,6vw,110px)}}
.d-obsidian .o-studio-media::after{background:linear-gradient(180deg,var(--pbg) 0%,transparent 22%,transparent 52%,var(--sbg) 100%)}
.d-obsidian .o-studio.no-pic{padding-top:var(--sec)}
.d-obsidian .o-studio.no-pic .o-head{margin-top:0}
.d-obsidian .o-studio-grid.is-solo{grid-template-columns:minmax(0,1fr)}
.d-obsidian .o-big.is-long{max-width:54ch;font-size:clamp(17px,1.45vw,21px);line-height:1.55;letter-spacing:0}
.d-obsidian .o-studio-aside{display:grid;gap:28px;align-content:start;min-width:0}
.d-obsidian .o-studio-pic{position:relative;aspect-ratio:4 / 3;overflow:hidden;clip-path:var(--chamfer);--cut:22px;background:var(--pane)}
.d-obsidian .o-studio-pic img{width:100%;height:100%;object-fit:cover}
.d-obsidian .o-work-row[data-n="1"] li{flex-basis:100%}
.d-obsidian .o-work-row[data-n="1"] .o-work-img{aspect-ratio:4 / 3}
@media (min-width:960px){.d-obsidian .o-work-row{grid-template-columns:repeat(var(--cols,5),minmax(0,1fr));row-gap:30px}.d-obsidian .o-work-row[data-n="1"] .o-work-img{aspect-ratio:21 / 9}.d-obsidian .o-work-row[data-n="2"] .o-work-img,.d-obsidian .o-work-row[data-n="6"] .o-work-img{aspect-ratio:4 / 3}.d-obsidian .o-work-row[data-n="3"] .o-work-img{aspect-ratio:4 / 5}}
.d-obsidian .o-voices.is-solo{grid-template-columns:minmax(0,1fr);max-width:1040px}
.d-obsidian .o-voice-main.no-pic>p{margin-top:0;padding-top:clamp(26px,3vw,48px)}
.d-obsidian .o-voice-main.no-pic>p::before{content:"";display:block;width:10px;height:10px;margin-bottom:22px;border:1px solid var(--ice);transform:rotate(45deg)}
.d-obsidian .o-voice-main>p.is-long{font-size:clamp(18px,1.6vw,24px);line-height:1.45}
.d-obsidian blockquote footer a{display:inline-flex;align-items:center;width:fit-content;min-height:44px;text-decoration:underline;text-underline-offset:3px}
.d-obsidian .o-book-grid.is-solo{grid-template-columns:minmax(0,1fr);max-width:1000px}
.d-obsidian .o-book-grid>*{min-width:0}
.d-obsidian .o-info{display:grid;gap:36px}
.d-obsidian .o-info>*{min-width:0}
@media (min-width:900px){.d-obsidian .o-info{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(40px,6vw,110px);align-items:start}}
.d-obsidian .o-spec dt{flex:0 1 auto}
.d-obsidian .o-spec dd{margin:0}
.d-obsidian address a{overflow-wrap:anywhere}
.d-obsidian .o-info.is-solo{grid-template-columns:minmax(0,1fr);max-width:880px}
.d-obsidian .o-reach-card .o-spec dd{min-width:0;overflow-wrap:anywhere}
.d-obsidian .o-reach-card .o-spec dt{white-space:nowrap}
@media (max-width:619px){.d-obsidian .o-reach-card .o-spec div{display:grid;gap:4px}.d-obsidian .o-reach-card .o-spec dd{text-align:left}}
.d-obsidian .o-reach-card .o-spec a{display:inline-flex;align-items:center;min-height:44px;margin:-12px 0;color:var(--ink);text-decoration:underline;text-decoration-color:var(--line-2);text-underline-offset:4px}
.d-obsidian .o-reach-card .o-more{margin-top:26px}
.d-obsidian .o-crew{display:grid;gap:20px}
.d-obsidian .o-crew-m{display:grid;align-content:start;gap:12px}
.d-obsidian .o-crew-pic{aspect-ratio:4 / 5;margin-bottom:10px}
.d-obsidian .o-crew-n{display:flex;justify-content:space-between;align-items:center;min-height:32px;font-size:10.5px;font-weight:500;letter-spacing:.2em;color:var(--ice)}
.d-obsidian .o-crew h3{font-family:var(--o-display),sans-serif;font-size:clamp(18px,1.6vw,24px);font-weight:400;letter-spacing:-.02em;line-height:1.2}
.d-obsidian .o-crew-role{font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--mute)}
.d-obsidian .o-crew-m p:last-child:not(.o-crew-role){font-size:15px;color:var(--dim)}
@media (min-width:760px){.d-obsidian .o-crew{grid-template-columns:repeat(2,minmax(0,1fr))}.d-obsidian .o-crew[data-n="1"]{grid-template-columns:minmax(0,520px)}}
@media (min-width:1100px){.d-obsidian .o-crew{grid-template-columns:repeat(3,minmax(0,1fr))}.d-obsidian .o-crew[data-n="2"],.d-obsidian .o-crew[data-n="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}.d-obsidian .o-crew[data-n="1"]{grid-template-columns:minmax(0,520px)}}
.d-obsidian .o-tbc{padding-left:16px;border-left:1px solid var(--ice);color:var(--dim)}
.d-obsidian .z-form{gap:26px}
.d-obsidian .z-field label{font-size:11px;font-weight:500;letter-spacing:.18em;color:var(--dim)}
.d-obsidian .z-field input,.d-obsidian .z-field select,.d-obsidian .z-field textarea{min-height:54px;padding:0 16px;border-color:var(--line-2);background-color:#0c0f14;color-scheme:dark;transition:border-color .3s var(--ease)}
.d-obsidian .z-field textarea{min-height:120px;padding:14px 16px}
.d-obsidian .z-field select{padding-right:40px;background-image:linear-gradient(45deg,transparent 50%,var(--dim) 50%),linear-gradient(135deg,var(--dim) 50%,transparent 50%);background-position:calc(100% - 21px) 50%,calc(100% - 16px) 50%;background-size:5px 5px,5px 5px;background-repeat:no-repeat}
.d-obsidian .z-field :focus-visible{outline:none;border-color:var(--ice);box-shadow:0 0 0 1px var(--ice)}
.d-obsidian .z-form .btn{min-height:62px;font-size:13px}
.d-obsidian .form-note{font-size:13px}
.d-obsidian .form-status{border:0;border-left:2px solid var(--ice);background:rgba(169,220,255,.1);font-weight:500}
.d-obsidian .o-feat{margin-top:0}
.d-obsidian .o-feat li{gap:10px;align-content:start;padding:24px 0 12px}
.d-obsidian .o-feat h3{font-size:clamp(16px,1.35vw,20px);line-height:1.2;letter-spacing:-.01em}
.d-obsidian .o-feat p{max-width:44ch;font-size:15px;color:var(--dim)}
.d-obsidian .o-ico,.d-obsidian .z-ico{display:grid;place-items:center;width:42px;height:42px;border:1px solid rgba(169,220,255,.5);background:rgba(169,220,255,.1);color:var(--ice);clip-path:${CHAMFER(9)}}
.d-obsidian .o-ico{margin-bottom:8px}
.d-obsidian .o-ico svg,.d-obsidian .z-ico svg{width:20px;height:20px}
@media (min-width:760px){.d-obsidian .o-feat[data-n="1"]{grid-template-columns:minmax(0,1fr)}.d-obsidian .o-feat[data-n="2"],.d-obsidian .o-feat[data-n="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1100px){.d-obsidian .o-feat[data-n="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}}
.d-obsidian .o-faq summary{display:grid;grid-template-columns:34px minmax(0,1fr) 14px;gap:12px;min-height:76px;padding:18px 0;font-family:var(--o-display),sans-serif;font-size:clamp(15px,1.35vw,20px);letter-spacing:-.015em;line-height:1.3;transition:color .3s var(--ease)}
.d-obsidian .o-faq summary small{font-family:var(--o-sans),sans-serif;font-size:11.5px;letter-spacing:.14em;color:var(--mute)}
.d-obsidian .o-faq details[open] summary small,.d-obsidian .o-faq summary i{color:var(--ice)}
.d-obsidian .o-faq details>p{padding:0 0 28px 46px}
@media (min-width:960px){.d-obsidian .o-faq summary{grid-template-columns:44px minmax(0,1fr) 14px}.d-obsidian .o-faq details>p{padding-left:56px}}
.d-obsidian .o-band{display:grid;gap:28px;padding:clamp(28px,5vw,84px)}
.d-obsidian .o-band h2{font-size:clamp(25px,3.7vw,58px)}
.d-obsidian .o-band h2.is-long{font-size:clamp(21px,2.7vw,40px);line-height:1.12}
.d-obsidian .o-band div{display:grid;gap:24px;justify-items:start;align-content:end;min-width:0}
.d-obsidian .o-band p{max-width:46ch;color:var(--dim)}
@media (min-width:960px){.d-obsidian .o-band{grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:clamp(40px,6vw,110px);align-items:end}}
.d-obsidian .o-say .o-wrap{display:grid;gap:28px}
.d-obsidian .o-say h2{max-width:30em;font-size:var(--z-statement);font-weight:300;line-height:1.24;letter-spacing:-.02em;text-wrap:pretty}
.d-obsidian .o-say h2 em{color:var(--ice)}
.d-obsidian .z-card,.d-obsidian .z-channel{position:relative;border-color:var(--line);background:linear-gradient(160deg,rgba(232,237,242,.065),rgba(232,237,242,.012) 42%,transparent 70%),var(--bg-2);box-shadow:inset 0 1px 0 rgba(169,220,255,.3)}
.d-obsidian .z-pic,.d-obsidian .z-ba{clip-path:var(--chamfer);--cut:22px}
.d-obsidian .z-ba figcaption{left:auto;right:12px}
.d-obsidian .z-grid>li{padding-top:22px;border-top:1px solid var(--line)}
.d-obsidian .z-acc summary{font-family:var(--o-display),sans-serif;font-size:clamp(15px,1.35vw,20px);letter-spacing:-.015em;line-height:1.3}
.d-obsidian .z-showcase h2{max-width:16em}
.d-obsidian .z-dots b{font-weight:600}
.d-obsidian .o-foot-mark{font-size:min(clamp(50px,17.2vw,268px),calc(126vw / var(--n,8)))}
.d-obsidian .o-foot-grid>*{min-width:0}
.d-obsidian .o-foot-grid a{max-width:100%;overflow-wrap:anywhere}
.d-obsidian .o-foot-brand .o-logo{margin-right:0}
.d-obsidian .o-foot-grid .o-hrs p{min-height:30px}
@media (min-width:960px){.d-obsidian .o-foot-grid{grid-template-columns:1.5fr repeat(var(--k,3),auto)}}
`
  .replace(/\n/g, "")
  .trim();

/** The index of services: one button opens its panel and closes the others (as in the demo). */
const JS = `(function(){var d=document;[].slice.call(d.querySelectorAll('[data-svc]')).forEach(function(g){var ts=[].slice.call(g.querySelectorAll('.o-svc-tab'));ts.forEach(function(t){t.addEventListener('click',function(){ts.forEach(function(x){var on=x===t,p=d.getElementById(x.getAttribute('aria-controls'));x.setAttribute('aria-expanded',on?'true':'false');if(p)p.hidden=!on});var y=t.getBoundingClientRect().top;if(y<70)window.scrollBy(0,y-84)})})})})();`;

const nn = (n: number) => String(n + 1).padStart(2, "0");

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10M7 17 17 7" />
  </svg>
);

/** Headings are two-tone in this design: a marked phrase, or else the second half, steps back. */
function tone(text: string): ReactNode {
  if (text.includes("*")) return em(text);
  const { lines } = splitLines(text, 2);
  return lines.length > 1 ? (
    <>
      {lines[0]} <em>{lines[1]}</em>
    </>
  ) : (
    text
  );
}

/** Section heading: a numbered technical label, the title, an optional intro and a hairline that catches light. */
function Head({ kicker, title, intro, id }: HeadProps) {
  return (
    <header className="o-head">
      <p className="o-eye" data-rv>
        <span className="o-num" aria-hidden="true" />
        {kicker}
      </p>
      <h2 id={id} className={long(title)} data-rv>
        {tone(title)}
      </h2>
      {intro ? (
        <p className="o-intro" data-rv>
          {intro}
        </p>
      ) : null}
      <i className="o-rule" data-rv aria-hidden="true" />
    </header>
  );
}

/** The word set very large (footer, opening without a photograph): the name, or its first word when long. */
function markWord(name: string) {
  if (name.length <= 16) return name;
  const words = name.split(/\s+/);
  return words[0].length < 4 && words[1] ? `${words[0]} ${words[1]}` : words[0];
}

function Logo({ c }: { c: Ctx }) {
  const [first, ...rest] = c.name.split(/\s+/);
  const tail = rest.join(" ");
  return {
    cls: `o-logo${first.length > 10 ? " is-long" : ""}${tail.length > 12 ? " is-tail" : ""}`,
    body: (
      <>
        <span className="o-init" aria-hidden="true">
          {c.name.charAt(0)}
        </span>
        <span className="o-logo-t">
          <b>{first}</b>
          {tail ? <small>{tail}</small> : null}
        </span>
      </>
    ),
  };
}

/** How many links fit beside the logo and the button on a 1060px screen (never fewer than two); the rest wait for a wide one. */
function fitLinks(nav: Ctx["nav"], room: number) {
  let n = 0;
  for (const x of nav.slice(0, 5)) {
    room -= x.label.length + 3;
    if (room < 0 && n >= 2) break;
    n++;
  }
  return n;
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const logo = Logo({ c });
  const fit = fitLinks(c.nav, 60 - cta.label.length);
  return (
    <>
      <header className="o-nav hdr">
        <a href="#top" className={logo.cls} aria-label={c.name}>
          {logo.body}
        </a>
        <nav aria-label={c.t.menu} className="o-links" data-nav>
          {c.nav.slice(0, 5).map((n, k) => (
            <a key={n.id} href={`#${n.id}`} className={k < fit ? undefined : "is-wide"}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href={cta.href} className="btn o-btn o-btn-line o-nav-cta">
          <span>{cta.label}</span>
        </a>
        <button type="button" className="o-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
          <span data-label data-open={c.t.menu} data-close={c.t.close}>
            {c.t.menu}
          </span>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="site-menu" className="o-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{nn(k)}</small>
              <span>{n.label}</span>
              <Arrow />
            </a>
          ))}
        </nav>
        {b.address || b.city || b.phone ? (
          <dl className="o-menu-foot">
            {b.address || b.city ? (
              <div>
                <dt>{c.t.address}</dt>
                <dd>{b.address ?? b.city}</dd>
              </div>
            ) : null}
            {b.phone ? (
              <div>
                <dt>{c.t.phone}</dt>
                <dd>
                  <a href={tel(b.phone)}>{b.phone}</a>
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero, business: b } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 54 ? "is-s" : plain.length > 32 ? "is-m" : plain.length > 18 ? "is-l" : undefined;
  // The longest word may never be wider than the screen: the type scales down to fit it.
  const widest = Math.max(8, ...plain.split(/\s+/).map((w) => w.length));
  const city = b.city && !hero.eyebrow.toLowerCase().includes(b.city.toLowerCase()) ? b.city : null;
  const facts = heroFacts(c);
  const word = markWord(c.name);
  return (
    <section className={`o-hero${p ? "" : " no-pic"}`}>
      <div className="o-hero-stage">
        {p ? (
          <div className="o-hero-media">
            <Pic p={p} eager sizes="(min-width: 900px) 100vw, 120vw" />
          </div>
        ) : (
          <div className="o-hero-plate" aria-hidden="true" style={css({ "--n": Math.max(5, word.length) })}>
            {word}
          </div>
        )}
        <div className="o-hero-head">
          {hero.eyebrow || city ? (
            <p className="o-eye o-fade" style={i(0)}>
              {city ? <span>{city}</span> : <span aria-hidden="true" />}
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className={size} style={css({ "--w": widest })}>
            {em(hero.headline)}
          </h1>
        </div>
        <div className="o-hero-body">
          <p className="o-lede o-fade" style={i(5)}>
            {hero.subheadline}
          </p>
          <div className="o-cta o-fade" style={i(6)}>
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="alt">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
        </div>
      </div>
      {facts.length > 0 && (
        <dl className="o-strip o-fade" data-n={facts.length} style={i(8)}>
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

/** Opening hours as a specification sheet. */
function HoursSheet({ c }: { c: Ctx }) {
  const lines = c.spec.business.openingHours;
  if (!lines?.length) return null;
  return (
    <div className="o-sheet" data-rv>
      <p className="o-sheet-title">{c.t.hours}</p>
      <dl className="o-spec o-spec-rows">
        {hoursRows(lines).map(([day, time], n) => (
          <div key={n}>
            <dt>{day}</dt>
            <dd>{time}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Reach({ c }: { c: Ctx }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email) return null;
  return (
    <address data-rv>
      <b>{c.name}</b>
      {b.address ? <span>{b.address}</span> : null}
      {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
      {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
      {b.mapsUrl ? (
        <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
          {c.t.route}
        </a>
      ) : null}
    </address>
  );
}

/** Contact details alone, as a specification sheet on a lit card; the main button when nothing is on record. */
function ReachCard({ c }: { c: Ctx }) {
  const b = c.spec.business;
  const rows: [string, ReactNode][] = [];
  if (b.address || b.city) rows.push([c.t.address, b.address ?? b.city]);
  if (b.phone) rows.push([c.t.phone, <a key="p" href={tel(b.phone)}>{b.phone}</a>]);
  if (b.email) rows.push([c.t.email, <a key="e" href={`mailto:${b.email}`}>{b.email}</a>]);
  const cta = c.spec.hero.primaryCta;
  if (!rows.length)
    return (
      <p data-rv>
        <Btn c={c} href={cta.href}>
          {cta.label}
        </Btn>
      </p>
    );
  return (
    <div className="o-book-card o-reach-card" data-rv>
      <p className="o-sheet-title">{c.name}</p>
      <dl className="o-spec">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {b.mapsUrl ? (
        <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="o-more">
          {c.t.route}
          <Arrow />
        </a>
      ) : null}
    </div>
  );
}

/** The appointment block of the demo: the form on a lit card, hours and address beside it. */
function Book({ c, id, kicker, title, intro, kind, options, hours, tbc }: { c: Ctx; id: string; kicker: string; title: string; intro?: string; kind: FormKind | null; options?: string[]; hours: boolean; tbc?: boolean }) {
  const b = c.spec.business;
  const sheet = hours ? <HoursSheet c={c} /> : null;
  const side = Boolean(b.address || b.phone || b.email || (hours && b.openingHours?.length));
  return (
    <section className="o-sec o-book" id={id}>
      <div className="o-wrap">
        <Head kicker={kicker} title={title} intro={intro} />
        {kind ? (
          <div className={`o-book-grid${side ? "" : " is-solo"}`}>
            <div className="o-book-card" data-rv>
              <DemoForm c={c} kind={kind} options={options} uid={`f-${id}`} />
            </div>
            {side ? (
              <aside className="o-book-side">
                {sheet}
                <Reach c={c} />
              </aside>
            ) : null}
          </div>
        ) : sheet || tbc ? (
          <div className="o-info">
            {sheet ?? (
              <p className="o-tbc" data-rv>
                {c.t.hoursTbc}
              </p>
            )}
            <Reach c={c} />
          </div>
        ) : (
          <div className="o-info is-solo">
            <ReachCard c={c} />
          </div>
        )}
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const logo = Logo({ c });
  const word = markWord(c.name);
  const reach = Boolean(b.address || b.phone || b.email);
  const hours = b.openingHours?.length ? b.openingHours : null;
  return (
    <footer className="o-foot">
      <div className="o-wrap">
        <p className="o-foot-mark" aria-hidden="true" style={css({ "--n": Math.max(8, word.length) })}>
          {word}
        </p>
        <div className="o-foot-grid" style={css({ "--k": 1 + (reach ? 1 : 0) + (hours ? 1 : 0) })}>
          <div className="o-foot-brand">
            <p className={logo.cls}>{logo.body}</p>
            {c.spec.footer.blurb ? <p>{c.spec.footer.blurb}</p> : null}
          </div>
          <nav aria-label={c.t.explore}>
            <h3>{c.t.explore}</h3>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          {reach ? (
            <div>
              <h3>{c.t.contact}</h3>
              {b.address ? <p>{b.address}</p> : null}
              {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
              {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
              {b.mapsUrl ? (
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {c.t.route}
                </a>
              ) : null}
            </div>
          ) : null}
          {hours ? (
            <div className="o-hrs">
              <h3>{c.t.hours}</h3>
              {hours.slice(0, 7).map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          ) : null}
        </div>
        <Legal c={c} className="o-legal" />
      </div>
    </footer>
  );
}

export const obsidian: Family = {
  key: "obsidian",
  root: "d-obsidian",
  fonts: ["Unbounded", "Inter"],
  themeColor: "#0a0c10",
  accent: "#a9dcff",
  onAccent: "#0a0c10",
  css: CSS,
  extra: EXTRA,
  js: JS,
  cls: { wrap: "o-wrap", eyebrow: "o-eye", btn: "o-btn o-btn-fill", btnAlt: "o-btn o-btn-line", btnText: "o-more" },
  Header,
  Hero,
  Footer,
  Head: (p) => <Head {...p} />,
  sections: {
    services: (s, c) => {
      const cta = c.spec.hero.primaryCta;
      return (
        <section className="o-sec" id={s.id}>
          <div className="o-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
            <div className={`o-svc${s.items.length > 7 ? " is-many" : ""}`} data-svc data-rv style={css({ "--n": s.items.length })}>
              {s.items.map((it, k) => {
                const p = c.photo(`art:svc${k}`);
                const meta = [it.duration, it.price].filter((x): x is string => Boolean(x));
                return (
                  <Fragment key={k}>
                    <h3 className="o-svc-h">
                      <button type="button" className="o-svc-tab" id={`${s.id}-t${k}`} aria-expanded={k === 0} aria-controls={`${s.id}-p${k}`} style={css({ "--r": k + 1 })}>
                        <span className="o-svc-n">{nn(k)}</span>
                        <span className="o-svc-name">{it.title}</span>
                        {meta.length ? <span className="o-svc-from">{it.price ?? it.duration}</span> : null}
                        <i aria-hidden="true" />
                      </button>
                    </h3>
                    <div className={`o-svc-panel${p ? "" : " no-pic"}`} id={`${s.id}-p${k}`} role="region" aria-labelledby={`${s.id}-t${k}`} hidden={k !== 0}>
                      <div className="o-svc-in">
                        {p ? (
                          <div className="o-svc-photo">
                            <Pic p={p} sizes="(min-width: 960px) 52vw, 100vw" />
                          </div>
                        ) : (
                          <>
                            <div className="o-svc-plate" aria-hidden="true">
                              <span className="o-svc-num">{nn(k)}</span>
                              <span className="o-ico">
                                <Icon name={it.icon} />
                              </span>
                            </div>
                            <p className="o-svc-t" aria-hidden="true">
                              {it.title}
                            </p>
                          </>
                        )}
                        <div className="o-svc-copy">
                          <p>{it.description}</p>
                          {meta.length ? (
                            <p className="o-svc-meta">
                              {meta.map((m) => (
                                <span key={m}>{m}</span>
                              ))}
                            </p>
                          ) : null}
                          <a href={cta.href} className="o-more">
                            {cta.label}
                            <Arrow />
                          </a>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </section>
      );
    },
    packages: (s, c) => {
      const cta = c.spec.hero.primaryCta;
      const rows = Math.max(1, ...s.items.map((it) => it.features.length));
      return (
        <section className="o-sec" id={s.id}>
          <div className="o-wrap">
            <Head kicker={c.t.kick.packages} title={s.title} intro={s.intro} />
          </div>
          <div className="o-pk">
            <div className="o-pk-grid" data-k={s.items.length} data-rv style={css({ "--k": s.items.length, "--m": rows })}>
              {s.items.map((it, n) => {
                const price = it.price ?? c.t.onRequest;
                const euro = /^€\s?([\d.,]+(?:,-)?)$/.exec(price);
                const len = euro ? euro[1].length : price.length;
                return (
                  <article key={n} className={`o-pkg${it.featured ? " is-hot" : ""}`}>
                    <header>
                      <p className="o-pkg-flag">{it.featured ? c.t.popular : `N° ${n + 1}`}</p>
                      <h3 className={it.name.length > 14 ? "is-long" : undefined} style={css({ "--w": Math.max(8, ...it.name.split(/\s+/).map((w) => w.length)) })}>
                        {it.name}
                      </h3>
                      {it.description ? <p className="o-pkg-line">{it.description}</p> : null}
                      <p className={`o-price${len > 12 ? " is-s" : len > 6 ? " is-m" : ""}`}>
                        {euro ? <span>€</span> : null}
                        <b>{euro ? euro[1] : price}</b>
                      </p>
                      {it.price && it.unit ? <p className="o-pkg-meta">{it.unit}</p> : null}
                    </header>
                    {it.features.length > 0 && (
                      <ul className="o-rows o-pkg-list">
                        {it.features.map((f, k) => (
                          <li key={k}>
                            <small>{nn(k)}</small>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Btn c={c} href={cta.href} variant={it.featured ? "fill" : "alt"}>
                      {cta.label}
                    </Btn>
                  </article>
                );
              })}
            </div>
          </div>
          {s.note ? (
            <div className="o-wrap">
              <p className="o-note" data-rv>
                {s.note}
              </p>
            </div>
          ) : null}
        </section>
      );
    },
    process: (s, c) => {
      const p = c.spare();
      return (
        <section className="o-sec" id={s.id}>
          <div className="o-wrap">
            <Head kicker={c.t.kick.process} title={s.title} intro={s.intro} />
            <div className={`o-proc${p ? "" : " is-solo"}`}>
              {p ? (
                <figure className="o-proc-photo" data-rv="img">
                  <Pic p={p} sizes="(min-width: 960px) 34vw, 100vw" />
                </figure>
              ) : null}
              <ol className="o-steps">
                {s.steps.map((st, n) => (
                  <li key={n} className="o-step" data-rv style={i(n % 4)}>
                    <span className="o-step-n" data-n={nn(n)} aria-hidden="true">
                      {nn(n)}
                    </span>
                    <div className="o-step-body">
                      <h3>{st.title}</h3>
                      <p>{st.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      );
    },
    about: (s, c) => {
      const p = c.photo(s.image);
      const second = p ? c.spare() : null;
      const cta = c.spec.hero.primaryCta;
      const [first, ...rest] = s.paragraphs;
      const aside = s.highlights.length > 0 || Boolean(second);
      return (
        <section className={`o-studio${p ? "" : " no-pic"}`} id={s.id}>
          {p ? (
            <div className="o-studio-media" data-px>
              <Pic p={p} sizes="100vw" />
            </div>
          ) : null}
          <div className="o-wrap">
            <Head kicker={c.t.kick.about} title={s.title} />
            <div className={`o-studio-grid${aside ? "" : " is-solo"}`}>
              <div className="o-studio-copy">
                <p className={`o-big${first.length > 220 ? " is-long" : ""}`} data-rv>
                  {first}
                </p>
                {rest.map((x, n) => (
                  <p key={n} data-rv>
                    {x}
                  </p>
                ))}
                <a href={cta.href} className="o-more" data-rv>
                  {cta.label}
                  <Arrow />
                </a>
              </div>
              {aside ? (
                <div className="o-studio-aside">
                  {s.highlights.length > 0 && (
                    <div className="o-sheet" data-rv>
                      <p className="o-sheet-title">{c.name}</p>
                      <ul className="o-rows">
                        {s.highlights.map((h, n) => (
                          <li key={h}>
                            <small>{nn(n)}</small>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {second ? (
                    <figure className="o-studio-pic" data-rv="img">
                      <Pic p={second} sizes="(min-width: 960px) 40vw, 100vw" />
                    </figure>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="o-sec" id={s.id}>
        <div className="o-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ul className="o-flaws o-feat" data-n={s.items.length}>
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span className="o-ico">
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
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const n = pics.length;
      const cols = n <= 5 ? n : n === 6 ? 3 : n === 9 ? 5 : 4;
      return (
        <section className="o-sec o-gal" id={s.id}>
          <div className="o-wrap">
            <Head kicker={c.t.kick.gallery} title={s.title} />
          </div>
          <ul className="o-work-row" data-n={n} data-rv style={css({ "--cols": cols })}>
            {pics.map((p, k) => (
              <li key={k}>
                <div className="o-work-img">
                  <Pic p={p} sizes={n < 3 ? "(min-width: 960px) 60vw, 100vw" : "(min-width: 960px) 24vw, 64vw"} />
                </div>
                <p aria-hidden="true">
                  <small>{nn(k)}</small>
                  <span>/ {nn(n - 1)}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>
      );
    },
    testimonials: (s, c) => {
      const [main, ...rest] = s.items;
      const p = c.spare();
      const by = (q: (typeof s.items)[number]) => (
        <footer>
          <b>{q.author}</b>
          <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
            {c.t.source}: {q.source}
          </a>
        </footer>
      );
      return (
        <section className="o-sec" id={s.id}>
          <div className="o-wrap">
            <Head kicker={c.t.kick.testimonials} title={s.title} />
            <div className={`o-voices${rest.length ? "" : " is-solo"}`}>
              <blockquote className={`o-voice-main${p ? "" : " no-pic"}`} data-rv>
                {p ? (
                  <div className="o-voice-photo">
                    <Pic p={p} sizes="(min-width: 960px) 44vw, 100vw" />
                  </div>
                ) : null}
                <p className={main.quote.length > 170 ? "is-long" : undefined}>{main.quote}</p>
                {by(main)}
              </blockquote>
              {rest.length > 0 && (
                <div className="o-voice-list">
                  {rest.map((q, n) => (
                    <blockquote key={n} data-rv style={i(n % 3)}>
                      <p>{q.quote}</p>
                      {by(q)}
                    </blockquote>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      );
    },
    team: (s, c) => (
      <section className="o-sec" id={s.id}>
        <div className="o-wrap">
          <Head kicker={c.t.kick.team} title={s.title} intro={s.intro} />
          <ul className="o-crew" data-n={s.members.length}>
            {s.members.map((m, n) => {
              const p = c.photo(m.image);
              return (
                <li key={n} className="o-sheet o-crew-m" data-rv style={i(n % 3)}>
                  {p ? (
                    <figure className="o-studio-pic o-crew-pic">
                      <Pic p={p} sizes="(min-width: 1100px) 30vw, (min-width: 760px) 45vw, 100vw" />
                    </figure>
                  ) : null}
                  <p className="o-crew-n" aria-hidden="true">
                    <span>{nn(n)}</span>
                    {p ? null : <span className="o-init">{m.name.charAt(0)}</span>}
                  </p>
                  <h3>{m.name}</h3>
                  {m.role ? <p className="o-crew-role">{m.role}</p> : null}
                  {m.bio ? <p>{m.bio}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ),
    booking: (s, c) => <Book c={c} id={s.id} kicker={c.t.kick.booking} title={s.title} intro={s.body} kind={s.kind} options={s.options} hours />,
    contact: (s, c) => <Book c={c} id={s.id} kicker={c.t.kick.contact} title={s.title} intro={s.body} kind={s.showForm ? "message" : null} hours={!c.spec.sections.some((x) => x.type === "hours" || x.type === "booking")} />,
    hours: (s, c) => <Book c={c} id={s.id} kicker={c.t.kick.hours} title={s.title} intro={s.note} kind={null} hours tbc />,
    faq: (s, c) => (
      <section className="o-sec" id={s.id}>
        <div className="o-wrap">
          <Head kicker={c.t.kick.faq} title={s.title} />
          <div className="z-acc o-faq" data-acc>
            {s.items.map((it, n) => (
              <details key={n} data-rv style={i(n % 4)}>
                <summary>
                  <small aria-hidden="true">{nn(n)}</small>
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
    cta: (s, c) => (
      <section className="o-sec" id={s.id}>
        <div className="o-wrap">
          <div className="o-book-card o-band" data-rv>
            <h2 className={long(s.title)}>{tone(s.title)}</h2>
            <div>
              {s.body ? <p>{s.body}</p> : null}
              <Btn c={c} href={s.cta.href}>
                {s.cta.label}
              </Btn>
            </div>
          </div>
        </div>
      </section>
    ),
    statement: (s) => (
      <section className="o-sec o-say" id={s.id}>
        <div className="o-wrap">
          {s.note ? (
            <p className="o-eye" data-rv>
              <span aria-hidden="true" />
              {s.note}
            </p>
          ) : null}
          <h2 data-rv>{em(s.title)}</h2>
        </div>
      </section>
    ),
  },
};
