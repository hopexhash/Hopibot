/**
 * Styles and script shared by every template family: the demonstration notice, the forms,
 * and a default look for each section type that a family did not design itself. The defaults
 * take their colours and type from the family's tokens:
 *   --z-bg2 (panel background) --z-ink --z-dim --z-line --z-accent --z-display (heading font)
 *   --z-radius --z-sec (vertical room of a section) --z-h3
 * A family sets them on its root class next to the demo's own variables.
 */
export const BASE_CSS = `
html{scroll-behavior:smooth;scroll-padding-top:88px}
.skip{position:absolute;left:-9999px;top:0;z-index:2147483001;padding:12px 18px;background:#fff;color:#111;font:500 14px/1 system-ui,sans-serif}
.skip:focus{left:8px;top:8px}
.demo-bar{position:fixed;left:50%;bottom:calc(12px + env(safe-area-inset-bottom));z-index:2147483000;width:max-content;max-width:calc(100vw - 20px);padding:9px 16px;border:1px solid rgba(255,255,255,.14);border-radius:14px;background:rgba(12,12,13,.93);color:#d9d4ca;font:400 12px/1.4 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;letter-spacing:0;text-align:center;text-transform:none;box-shadow:0 14px 40px -12px rgba(0,0,0,.55);transform:translateX(-50%);pointer-events:none}
.demo-bar strong{font-weight:700;color:#fff}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.fam *,.fam *::before,.fam *::after{transition-duration:.01ms!important;transition-delay:0s!important}}
.fam .z-sec{position:relative;padding-block:var(--z-sec,clamp(72px,10vw,160px))}
.fam .z-sec h3{font-size:var(--z-h3,clamp(21px,2vw,30px))}
.fam .z-head{display:grid;gap:18px;max-width:62ch;margin-bottom:clamp(32px,5vw,72px)}
.fam .z-intro{max-width:52ch;color:var(--z-dim)}
.fam .z-narrow{max-width:1020px}
.fam .z-center{display:grid;justify-items:center;gap:26px;text-align:center}
.fam .z-center h2{max-width:22ch}
.fam .z-center>p{max-width:54ch;color:var(--z-dim)}
.fam .z-split{display:grid;gap:clamp(36px,6vw,96px)}
@media (min-width:900px){.fam .z-split{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.fam .z-copy{display:grid;gap:22px;align-content:start}
.fam .z-copy .z-head{margin-bottom:6px}
.fam .z-copy>p{max-width:56ch;color:var(--z-dim)}
.fam .z-copy>.z-lead{font-size:1.18em;color:var(--z-ink)}
.fam .z-pic{overflow:hidden;aspect-ratio:4/3;border-radius:var(--z-radius,0);background:var(--z-bg2)}
.fam .z-pic img{width:100%;height:100%;object-fit:cover}
.fam .z-pic-tall{aspect-ratio:4/5}
.fam .z-ticks{display:grid;gap:10px}
.fam .z-ticks li{position:relative;padding-left:28px}
.fam .z-ticks li::before{content:"";position:absolute;left:0;top:.72em;width:16px;height:1px;background:var(--z-accent)}
.fam .z-rows{border-top:1px solid var(--z-line)}
.fam .z-rows li{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:8px clamp(16px,3vw,48px);align-items:baseline;padding:clamp(20px,2.6vw,34px) 0;border-bottom:1px solid var(--z-line)}
.fam .z-rows small,.fam .z-steps small{font-size:12px;letter-spacing:.14em;color:var(--z-accent);font-variant-numeric:tabular-nums}
.fam .z-rows p{max-width:60ch;margin-top:6px;color:var(--z-dim)}
.fam .z-meta{display:grid;justify-items:end;gap:2px;font-size:.92em;color:var(--z-dim);white-space:nowrap}
.fam .z-price{color:var(--z-accent);font-variant-numeric:tabular-nums;white-space:nowrap}
@media (max-width:620px){.fam .z-rows li{grid-template-columns:auto minmax(0,1fr)}.fam .z-meta{grid-column:2;display:flex;gap:14px}}
.fam .z-cards{display:grid;gap:clamp(16px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))}
.fam .z-card{display:grid;gap:16px;align-content:start;padding:clamp(24px,3vw,40px);border:1px solid var(--z-line);border-radius:var(--z-radius,0);background:var(--z-bg2)}
.fam .z-dots{display:grid;gap:16px}
.fam .z-dots li{display:flex;justify-content:space-between;gap:18px;align-items:baseline}
.fam .z-dots b{font-weight:500;color:var(--z-ink)}
.fam .z-dots p{font-size:.92em;color:var(--z-dim)}
.fam .z-note{margin-top:32px;font-size:.9em;color:var(--z-dim)}
.fam .z-grid{display:grid;gap:clamp(28px,4vw,56px) clamp(20px,3vw,48px);grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))}
.fam .z-grid>li{display:grid;gap:12px;align-content:start}
.fam .z-grid p{color:var(--z-dim)}
.fam .z-ico{display:grid;place-items:center;width:48px;height:48px;border:1px solid var(--z-line);border-radius:var(--z-ico-radius,50%);color:var(--z-accent)}
.fam .z-ico svg{width:22px;height:22px}
.fam .z-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));border-top:1px solid var(--z-line)}
.fam .z-steps li{display:grid;gap:12px;align-content:start;padding:28px clamp(0px,2vw,28px) 28px 0}
.fam .z-steps p{color:var(--z-dim)}
.fam .z-gal{display:grid;gap:clamp(8px,1.2vw,18px);grid-template-columns:repeat(2,minmax(0,1fr))}
.fam .z-gal-1{grid-template-columns:1fr}
.fam .z-gal-1 .z-pic{aspect-ratio:16/9}
@media (max-width:899px){.fam .z-gal-3 .z-pic:first-child,.fam .z-gal-5 .z-pic:first-child{grid-column:1/-1;aspect-ratio:16/9}}
@media (min-width:900px){.fam .z-gal-3,.fam .z-gal-5,.fam .z-gal-6{grid-template-columns:repeat(3,minmax(0,1fr))}.fam .z-gal-5 .z-pic:first-child{grid-column:span 2;aspect-ratio:auto}}
.fam .z-hours{border-top:1px solid var(--z-line)}
.fam .z-hours div{display:flex;justify-content:space-between;gap:20px;padding:14px 0;border-bottom:1px solid var(--z-line)}
.fam .z-hours dd{margin:0;text-align:right;color:var(--z-dim)}
.fam .z-reach{display:grid;gap:6px;justify-items:start;font-style:normal;color:var(--z-dim)}
.fam .z-reach a{display:inline-flex;align-items:center;min-height:32px;color:var(--z-ink)}
.fam .z-reach .z-route{color:var(--z-accent)}
.fam .z-acc{border-top:1px solid var(--z-line)}
.fam .z-acc details{border-bottom:1px solid var(--z-line)}
.fam .z-acc summary{display:flex;justify-content:space-between;align-items:center;gap:24px;min-height:44px;padding:22px 0;font-size:1.12em;color:var(--z-ink);cursor:pointer;list-style:none}
.fam .z-acc summary::-webkit-details-marker{display:none}
.fam .z-acc summary i{position:relative;flex:none;width:14px;height:14px}
.fam .z-acc summary i::before,.fam .z-acc summary i::after{content:"";position:absolute;left:0;top:50%;width:100%;height:1px;background:currentColor;transition:transform .3s}
.fam .z-acc summary i::after{transform:rotate(90deg)}
.fam .z-acc details[open] summary i::after{transform:none}
.fam .z-acc details>p{max-width:70ch;padding:0 0 24px;color:var(--z-dim)}
.fam .z-cta{background:var(--z-bg2)}
.fam .z-showcase{display:grid;align-items:end;min-height:min(80svh,760px);padding-block:0;overflow:hidden}
.fam .z-showcase:not(.has-pic){min-height:0;background:var(--z-bg2)}
.fam .z-show-media{position:absolute;inset:-8% 0}
.fam .z-show-media img{width:100%;height:100%;object-fit:cover;transform:translateY(calc(var(--p,0)*-4%))}
.fam .z-showcase.has-pic::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.74))}
.fam .z-show-in{position:relative;z-index:1;display:grid;gap:20px;justify-items:start;padding-block:clamp(48px,8vw,110px)}
.fam .z-showcase.has-pic .z-show-in{color:#fff}
.fam .z-show-in>p{max-width:48ch}
.fam .z-panel{padding:clamp(22px,3.4vw,48px);border:1px solid var(--z-line);border-radius:var(--z-radius,0);background:var(--z-bg2)}
.fam .z-form{display:grid;gap:22px}
.fam .z-fields{display:grid;gap:16px;grid-template-columns:repeat(2,minmax(0,1fr))}
.fam .z-field{display:grid;gap:7px;min-width:0}
.fam .z-field-wide{grid-column:1/-1}
@media (max-width:520px){.fam .z-fields{grid-template-columns:minmax(0,1fr)}}
.fam .z-field label{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--z-dim)}
.fam .z-field input,.fam .z-field select,.fam .z-field textarea{width:100%;min-width:0;min-height:50px;padding:12px 14px;border:1px solid var(--z-line);border-radius:var(--z-field-radius,0);background:transparent;color:var(--z-ink);font:inherit;font-size:16px;-webkit-appearance:none;appearance:none}
.fam .z-field textarea{min-height:110px;resize:vertical}
.fam .z-field select option{color:#111;background:#fff}
.fam .z-field :focus-visible{outline:2px solid var(--z-accent);outline-offset:1px}
.fam .z-form .btn{width:100%;cursor:pointer}
.fam .form-note{font-size:12.5px;line-height:1.4;color:var(--z-dim)}
.fam .form-status{display:none;padding:14px 16px;border:1px solid var(--z-accent);font-size:14px;color:var(--z-ink)}
.fam .form-status.show{display:block}
.fam .z-chipset{margin:0;padding:0;border:0;min-width:0}
.fam .z-chipset legend{margin-bottom:10px;padding:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--z-dim)}
.fam .z-chips{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px}
.fam .z-chips button{min-height:48px;padding:0;border:1px solid var(--z-line);border-radius:var(--z-field-radius,0);background:none;font-size:17px;transition:background-color .3s,color .3s,border-color .3s}
.fam .z-chips button:hover{border-color:var(--z-accent)}
.fam .z-chips button[aria-pressed="true"]{border-color:var(--z-accent);background:var(--z-accent);color:var(--z-on-accent,#111)}
.fam .z-statement h2{max-width:28ch;font-size:var(--z-statement,clamp(28px,3.6vw,58px));line-height:1.12}
.fam .z-pack.is-featured{border-color:var(--z-accent)}
.fam .z-tag{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--z-accent)}
.fam .z-pack-price{color:var(--z-dim)}
.fam .z-pack-price b{font-family:var(--z-display);font-size:clamp(30px,3vw,44px);font-weight:var(--z-display-weight,400);color:var(--z-ink)}
.fam .z-ba{position:relative;overflow:hidden;aspect-ratio:4/3;border-radius:var(--z-radius,0)}
.fam .z-ba img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fam .z-ba .z-ba-before{clip-path:inset(0 calc(100% - var(--pos)) 0 0)}
.fam .z-ba::after{content:"";position:absolute;top:0;bottom:0;left:var(--pos);width:2px;background:#fff;transform:translateX(-1px);pointer-events:none}
.fam .z-ba input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:ew-resize}
.fam .z-ba figcaption{position:absolute;left:12px;bottom:12px;padding:6px 10px;background:rgba(0,0,0,.6);color:#fff;font-size:13px}
.fam .z-channel{display:grid;gap:12px;align-content:start;height:100%;padding:clamp(22px,3vw,36px);border:1px solid var(--z-line);border-radius:var(--z-radius,0);transition:border-color .3s}
.fam .z-channel:hover{border-color:var(--z-accent)}
.fam .z-quotes{display:grid;gap:clamp(24px,3vw,48px);grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))}
.fam .z-quotes blockquote{display:grid;gap:20px;align-content:start;padding-top:24px;border-top:1px solid var(--z-line)}
.fam .z-quotes blockquote>p{font-family:var(--z-display);font-size:clamp(20px,1.9vw,28px);line-height:1.3;color:var(--z-ink)}
.fam .z-quotes footer{display:grid;gap:2px;font-size:.9em;color:var(--z-dim)}
.fam .z-quotes footer a{text-decoration:underline;text-underline-offset:3px}
.fam .z-legal{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px}
`
  .replace(/\n/g, "")
  .trim();

/**
 * Behaviour of a generated site, in plain script (the page ships no framework):
 *  - [data-rv] gets "in" when it enters the screen, [data-px] gets --p from -1 to 1, the body
 *    gets "is-scrolled" after 40px (the same contract as the demo websites);
 *  - .menu-btn opens and closes the panel named by aria-controls (class "is-open", inert,
 *    Escape, scroll lock); choosing a link closes it;
 *  - [role=tablist]: tabs show their panel; elements with data-tab="<tab id>" get "is-on";
 *  - [data-chips]: one of a group of buttons is pressed, its value goes to the hidden input
 *    and to every [data-out="<name>"] on the page;
 *  - forms never send anything and say so; before/after sliders; details that close each other.
 */
export const BASE_JS = `(function(){var d=document,b=d.querySelector('.fam')||d.body,W=window;
var q=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var rv=q('[data-rv]');
if(reduce||!('IntersectionObserver' in W)){rv.forEach(function(n){n.classList.add('in')})}
else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:0.08});rv.forEach(function(n){io.observe(n)})}
var near=[],px=reduce||!('IntersectionObserver' in W)?[]:q('[data-px]');
if(px.length){var pio=new IntersectionObserver(function(es){es.forEach(function(e){var k=near.indexOf(e.target);if(e.isIntersecting&&k<0)near.push(e.target);if(!e.isIntersecting&&k>=0)near.splice(k,1)})},{rootMargin:'20% 0px'});px.forEach(function(n){pio.observe(n)})}
var raf=0,sc=null;
function frame(){raf=0;var vh=W.innerHeight,s=W.scrollY>40;if(s!==sc){sc=s;b.classList.toggle('is-scrolled',s)}
near.forEach(function(n){var r=n.getBoundingClientRect(),p=(r.top+r.height/2-vh/2)/(vh/2+r.height/2);n.style.setProperty('--p',Math.max(-1,Math.min(1,p)).toFixed(3))})}
function onScroll(){if(!raf)raf=requestAnimationFrame(frame)}
frame();W.addEventListener('scroll',onScroll,{passive:true});W.addEventListener('resize',onScroll);
q('.menu-btn').forEach(function(btn){var panel=d.getElementById(btn.getAttribute('aria-controls'));if(!panel)return;var lab=btn.querySelector('[data-label]');
function set(o){btn.setAttribute('aria-expanded',o?'true':'false');panel.classList.toggle('is-open',o);if(o)panel.removeAttribute('inert');else panel.setAttribute('inert','');d.documentElement.style.overflow=o?'hidden':'';b.classList.toggle('menu-open',o);if(lab)lab.textContent=lab.getAttribute(o?'data-close':'data-open')}
btn.addEventListener('click',function(){set(btn.getAttribute('aria-expanded')!=='true')});
q('a',panel).forEach(function(a){a.addEventListener('click',function(){set(false)})});
q('[data-menu-close]',panel).forEach(function(x){x.addEventListener('click',function(){set(false)})});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){set(false);btn.focus()}})});
q('[role=tablist]').forEach(function(list){var tabs=q('[role=tab]',list);
function pick(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on?'true':'false');x.tabIndex=on?0:-1;var p=d.getElementById(x.getAttribute('aria-controls'));if(p)p.hidden=!on;q('[data-tab="'+x.id+'"]').forEach(function(n){n.classList.toggle('is-on',on)})})}
tabs.forEach(function(t,k){t.addEventListener('click',function(){pick(t)});t.addEventListener('keydown',function(e){var n=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!n)return;e.preventDefault();var o=tabs[(k+n+tabs.length)%tabs.length];pick(o);o.focus()})})});
q('[data-chips]').forEach(function(g){var name=g.getAttribute('data-chips'),inp=g.querySelector('input[type=hidden]'),bs=q('button',g);
bs.forEach(function(x){x.addEventListener('click',function(){bs.forEach(function(y){y.setAttribute('aria-pressed',y===x?'true':'false')});var v=x.getAttribute('data-value')||x.textContent.trim();if(inp)inp.value=v;q('[data-out="'+name+'"]').forEach(function(o){o.textContent=v})})})});
q('form[data-demo-form]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var s=f.querySelector('.form-status');if(s){s.textContent=s.getAttribute('data-done');s.classList.add('show')}})});
q('[data-ba] input').forEach(function(r){r.addEventListener('input',function(){r.parentNode.style.setProperty('--pos',r.value+'%')})});
q('[data-acc]').forEach(function(a){var ds=q('details',a);ds.forEach(function(x){x.addEventListener('toggle',function(){if(x.open)ds.forEach(function(y){if(y!==x)y.open=false})})})});
q('[data-scroll]').forEach(function(btn){var el=d.getElementById(btn.getAttribute('aria-controls'));if(el)btn.addEventListener('click',function(){el.scrollBy({left:(btn.getAttribute('data-scroll')==='prev'?-1:1)*el.clientWidth*0.8,behavior:reduce?'auto':'smooth'})})});
})();`.replace(/\n/g, "");
