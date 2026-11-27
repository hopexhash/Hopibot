import type { ReactNode } from "react";
import { CSS } from "./css/beauty-salon";
import { Btn, css, DemoForm, em, heroFacts, Hours, hoursRows, i, Legal, long, Pic, splitLines, tel, type Ctx, type Family, type Photo, type SectionOf } from "./kit";

/**
 * Sage (demo: /demos/beauty-salon, "Atelier Sage"). Quiet luxury: cream and sand, one muted
 * sage, a light soft serif in large sizes, photographs in arched frames and hairlines instead
 * of boxes. Made for beauty salons, hairdressers, skin clinics and nail studios.
 */

const EXTRA = `
.d-sage{--s-serif:"Fraunces Soft";--s-sans:"Figtree";--z-bg2:var(--sand);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--sage-d);--z-on-accent:var(--paper);--z-display:var(--s-serif),Georgia,serif;--z-display-weight:300;--z-radius:0;--z-field-radius:0;--z-h3:clamp(23px,2vw,31px);--z-statement:clamp(30px,4.2vw,66px);--z-sec:clamp(88px,11vw,180px)}
.d-sage h2,.d-sage h3{overflow-wrap:break-word}
.d-sage h2.is-long{font-size:clamp(30px,3.7vw,58px);line-height:1.08}
.d-sage .s-pill{text-align:center}
.d-sage .s-pill-ghost{background:transparent;color:var(--ink)}
.d-sage .s-pill-ghost:hover{background:var(--ink);border-color:var(--ink);color:var(--bg)}
.d-sage.menu-open .s-nav{background:transparent;border-color:transparent;-webkit-backdrop-filter:none;backdrop-filter:none}
.d-sage .s-logo{flex:0 1 auto;min-width:0}
.d-sage .s-logo span{display:block;padding:.22em .12em .22em 0;overflow:hidden;text-overflow:ellipsis}
.d-sage .s-logo.is-long{font-size:19px}
.d-sage .s-links{flex:none}
.d-sage .s-links a{white-space:nowrap}
.d-sage .s-nav-pill{flex:none;white-space:nowrap}
.d-sage .s-burger{flex:none;cursor:pointer}
@media (max-width:419px){.d-sage .s-nav-pill.is-w1{display:none}}
@media (max-width:639px){.d-sage .s-nav-pill.is-w2{display:none}}
.d-sage .s-menu-foot a{display:inline-flex;align-items:center;min-height:40px;color:var(--ink);overflow-wrap:anywhere}
.d-sage .s-hero h1{overflow-wrap:break-word;-webkit-hyphens:auto;hyphens:auto}
.d-sage .s-hero h1.is-m{font-size:clamp(40px,10.4vw,66px);line-height:1}
.d-sage .s-hero h1.is-s{font-size:clamp(32px,8.2vw,50px);line-height:1.04;letter-spacing:-.028em}
.d-sage .s-hero-main img{object-position:50% 30%}
.d-sage .s-hero-facts dd{min-width:0;overflow-wrap:break-word}
.d-sage .s-hero-facts a{display:inline-block;margin:-10px 0;padding:10px 0;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}
.d-sage .s-mono{display:grid;place-items:center;aspect-ratio:3/4;background:linear-gradient(180deg,var(--wash),var(--sand));container-type:inline-size}
.d-sage .s-mono::after{content:"";position:absolute;inset:16px 16px 0;border:1px solid var(--sage);border-bottom:0;border-radius:999px 999px 0 0;opacity:.7}
.d-sage .s-mono span{font-family:var(--s-serif),Georgia,serif;font-variation-settings:"SOFT" 100;font-size:64cqw;font-style:italic;font-weight:200;line-height:1;color:var(--sage-d);transform:translateY(7%)}
@media (max-width:959px){.d-sage .s-hero-facts div{grid-template-columns:140px minmax(0,1fr)}.d-sage .s-hero-art.is-mono .s-hero-main{width:50%}.d-sage .s-hero-facts{margin-bottom:64px}}
@media (min-width:960px){.d-sage .s-hero h1.is-m{font-size:clamp(58px,6.1vw,104px)}.d-sage .s-hero h1.is-s{font-size:clamp(44px,4.5vw,76px)}.d-sage .s-hero-facts[data-n="2"]{grid-template-columns:repeat(2,1fr)}.d-sage .s-hero-facts[data-n="1"]{grid-template-columns:1fr}}
@media (min-width:1240px){.d-sage .s-hero-cap{max-width:42%;white-space:normal}}
.d-sage .s-phil h2.is-long{max-width:20ch}
.d-sage .s-phil-copy>.s-text{max-width:56ch;margin-top:22px;color:var(--dim)}
.d-sage .s-phil-grid.is-solo{gap:0}
.d-sage .s-principles.is-notes li{grid-template-columns:44px minmax(0,1fr)}
.d-sage .s-principles.is-notes span{grid-row:auto}
.d-sage .s-principles .s-note-h{max-width:34ch;font-family:var(--s-serif),Georgia,serif;font-variation-settings:"SOFT" 70;font-size:clamp(21px,1.8vw,27px);font-weight:300;line-height:1.2;letter-spacing:-.015em;color:var(--ink)}
.d-sage .s-principles li{min-width:0}
@media (min-width:960px){.d-sage .s-phil-grid.is-solo{grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(40px,6vw,110px)}.d-sage .s-phil-grid.is-solo .s-phil-copy{grid-column:2}.d-sage .s-phil-head{position:sticky;top:120px}.d-sage .s-phil-head h2{margin-bottom:0;font-size:clamp(34px,4vw,62px)}.d-sage .s-phil-grid.is-solo .s-principles{margin-top:clamp(36px,4vw,60px)}.d-sage .s-principles.is-notes li{grid-template-columns:64px minmax(0,1fr)}}
.d-sage .s-head.is-bare{grid-template-columns:minmax(0,1fr)}
.d-sage .s-feat{padding:clamp(88px,11vw,180px) 0}
.d-sage .s-feat .s-principles{margin-top:0}
.d-sage .s-treat.is-solo{grid-template-columns:minmax(0,1fr)}
.d-sage .s-treat-main{min-width:0}
.d-sage .s-treat-note{animation:none}
.d-sage .s-treat-side.is-bare{grid-template-columns:42%}
.d-sage .s-rows.is-flat{border-top:1px solid var(--line-2)}
.d-sage .s-rows li{grid-template-columns:minmax(0,1fr) auto}
.d-sage .s-rows li[data-rv]{animation:none}
.d-sage .s-row-min,.d-sage .s-row-price{white-space:nowrap}
.d-sage .s-row-main+.s-row-price{grid-row:2;margin-top:0}
.d-sage .s-row-book{white-space:nowrap}
.d-sage .s-row-tags{font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--sage-d)}
.d-sage .s-row-cat{padding:18px 0 0}
.d-sage .s-small{max-width:60ch;margin-top:28px;font-size:13.5px;line-height:1.55;color:var(--dim)}
.d-sage .s-tabs button{cursor:pointer;overflow-wrap:anywhere}
.d-sage .s-tabs button:last-child:nth-child(odd){grid-column:1/-1;border-right:0}
@media (max-width:959px){.d-sage .s-treat-side.is-long{grid-template-columns:minmax(0,1fr)}.d-sage .s-treat-side.is-long .s-treat-photo{width:46%}}
@media (min-width:700px){.d-sage .s-tabs{flex-wrap:wrap;row-gap:8px}.d-sage .s-tabs button{white-space:nowrap}}
@supports (grid-template-columns:subgrid){@media (min-width:700px){.d-sage .s-rows ul{display:grid;grid-template-columns:minmax(0,1fr) auto auto auto;column-gap:22px}.d-sage .s-rows li{grid-column:1/-1;grid-template-columns:subgrid}.d-sage .s-rows .s-row-main{grid-column:1}.d-sage .s-rows .s-row-min{grid-column:2}.d-sage .s-rows .s-row-price{grid-column:3;grid-row:auto}.d-sage .s-rows .s-row-book{grid-column:4}}}
@media (min-width:960px){.d-sage .s-treat-side.is-bare{grid-template-columns:1fr}}
.d-sage .s-stages.is-num li{display:grid;grid-template-columns:44px minmax(0,1fr)}
.d-sage .s-stages.is-num small{grid-row:span 2;padding-top:6px;font-family:var(--s-serif),Georgia,serif;font-size:15px;font-style:italic;color:var(--sage-d)}
@media (min-width:960px){.d-sage .s-results-grid.is-steps{grid-template-columns:minmax(0,5fr) minmax(0,1fr) minmax(0,6fr);grid-template-rows:auto}.d-sage .is-steps .s-results-head{grid-column:1;grid-row:1;position:sticky;top:120px;padding-top:0}.d-sage .is-steps .s-stages{grid-column:3;grid-row:1;margin-top:0}.d-sage .is-steps h2{font-size:clamp(34px,4vw,62px)}.d-sage .s-stages.is-num li{grid-template-columns:64px minmax(0,1fr)}}
.d-sage .s-space.is-gal{padding-top:clamp(96px,12vw,200px)}
.d-sage .s-gal .s-room{min-width:0;margin:0}
.d-sage .s-gal .is-a,.d-sage .s-gal .is-d,.d-sage .s-gal .is-wide{grid-column:1/-1}
.d-sage .s-gal .is-c{margin-top:54px}
.d-sage .s-gal .is-b:last-child{grid-column:2}
.d-sage .s-gal .is-d .s-frame{border-radius:clamp(110px,24vw,380px) 0 0 0}
@media (min-width:960px){.d-sage .s-gal{row-gap:clamp(56px,7vw,110px)}.d-sage .s-gal .is-a{grid-column:1/9}.d-sage .s-gal .is-b,.d-sage .s-gal .is-b:last-child{grid-column:10/13;align-self:end}.d-sage .s-gal .is-c{grid-column:2/5;margin-top:0}.d-sage .s-gal .is-d{grid-column:6/13;align-self:center}.d-sage .s-gal .is-d.is-lone{grid-column:3/13}.d-sage .s-gal .is-wide .s-frame{aspect-ratio:21/9}}
.d-sage .s-about-art img{object-position:50% 40%}
.d-sage .s-about-cta{margin-top:34px}
.d-sage .s-about-copy .s-role{margin-top:14px}
.d-sage .s-sign.is-name{font-size:clamp(38px,3.6vw,58px);line-height:1.05}
@media (min-width:960px){.d-sage .s-about-grid.is-solo{grid-template-columns:minmax(0,1fr)}.d-sage .s-about-grid.is-solo .s-about-copy{grid-column:1;max-width:980px}}
.d-sage .s-teamsec{padding:clamp(88px,11vw,180px) 0;background:var(--wash)}
.d-sage .s-team{display:grid;gap:36px}
.d-sage .s-team li{display:grid;grid-template-columns:42% minmax(0,1fr);gap:20px;align-items:end}
.d-sage .s-team .s-arch{aspect-ratio:3/4;margin:0;background:#cfd5c3}
.d-sage .s-team h3{font-size:clamp(23px,2vw,31px);font-style:italic;line-height:1.15}
.d-sage .s-role{margin-top:8px;font-size:11.5px;font-weight:500;letter-spacing:.18em;line-height:1.4;text-transform:uppercase;color:var(--sage-d)}
.d-sage .s-team p:not(.s-role){max-width:44ch;margin-top:12px;font-size:15px;line-height:1.55;color:#4d463d}
.d-sage .s-team.is-plain{gap:0;border-bottom:1px solid rgba(43,38,32,.2)}
.d-sage .s-team.is-plain li{display:block;padding:24px 0 26px;border-top:1px solid rgba(43,38,32,.2)}
@media (min-width:960px){.d-sage .s-team{grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(48px,5vw,80px) clamp(24px,3.4vw,56px);align-items:start}.d-sage .s-team[data-n="1"]{grid-template-columns:minmax(0,1fr);max-width:760px}.d-sage .s-team[data-n="2"]{grid-template-columns:repeat(2,minmax(0,1fr));max-width:900px}.d-sage .s-team[data-n="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}.d-sage .s-team li{display:block}.d-sage .s-team:not(.is-plain) li>div{margin-top:20px}.d-sage .s-team:not(.is-plain) li:nth-child(3n+2){margin-top:56px}.d-sage .s-team.is-plain{gap:0 clamp(24px,3.4vw,56px);border-bottom:0}.d-sage .s-team.is-plain li{padding:26px 0 34px}}
.d-sage .s-voice-big.is-long p{font-size:clamp(23px,2.5vw,38px);line-height:1.28;letter-spacing:-.015em;text-wrap:pretty}
.d-sage .s-voices blockquote footer a{justify-self:start;margin:-4px 0;padding:10px 0;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px;overflow-wrap:anywhere}
@media (min-width:960px){.d-sage .s-voices-top.is-solo{grid-template-columns:minmax(0,1fr)}.d-sage .s-voices-top.is-solo .s-voice-big{max-width:1100px}.d-sage .s-voices-rest[data-n="1"]{grid-template-columns:minmax(0,1fr);max-width:760px}.d-sage .s-voices-rest[data-n="2"],.d-sage .s-voices-rest[data-n="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}.d-sage .s-voices-rest[data-n="2"] blockquote:nth-child(3),.d-sage .s-voices-rest[data-n="4"] blockquote:nth-child(3){margin-top:0}.d-sage .s-voices-rest[data-n="4"] blockquote:nth-child(4){margin-top:56px}}
.d-sage .s-book h2 em{display:inline}
.d-sage .s-book-call{display:flex;flex-wrap:wrap;gap:0 24px}
.d-sage .s-book-call a{display:inline-flex;align-items:center;min-height:44px}
.d-sage .z-panel{padding:clamp(22px,3.4vw,54px);border:0;border-radius:clamp(28px,4vw,56px) clamp(28px,4vw,56px) 0 0;background:var(--paper)}
.d-sage .z-form{gap:30px}
.d-sage .z-fields{gap:22px 28px}
.d-sage .z-field label,.d-sage .z-chipset legend{font-size:11.5px;font-weight:500;letter-spacing:.16em;color:var(--dim)}
.d-sage .z-field input,.d-sage .z-field select,.d-sage .z-field textarea{min-height:48px;padding:10px 0;border:0;border-bottom:1px solid var(--line-2);border-radius:0;font-size:17px;transition:border-color .5s var(--ease)}
.d-sage .z-field select{padding-right:26px;background:linear-gradient(45deg,transparent 50%,var(--dim) 50%) calc(100% - 9px) 54%/5px 5px no-repeat,linear-gradient(-45deg,transparent 50%,var(--dim) 50%) calc(100% - 4px) 54%/5px 5px no-repeat;text-overflow:ellipsis;cursor:pointer}
.d-sage .z-field :focus-visible{outline:none;border-color:var(--sage-d);box-shadow:0 1px 0 var(--sage-d)}
.d-sage .z-form .btn{min-height:62px;font-size:16px}
.d-sage .z-chips button{border-color:var(--line-2);border-radius:999px;font-size:15px}
.d-sage .z-chips button[aria-pressed="true"]{border-color:var(--ink);background:var(--ink);color:var(--bg)}
.d-sage .form-note{font-size:13px;text-align:center}
.d-sage .form-status{padding:16px 18px;border:0;border-radius:4px;background:var(--wash);font-size:14.5px;font-weight:500;line-height:1.5;color:#3a4433}
.d-sage .z-head{gap:24px}
.d-sage .z-copy>.z-lead{font-family:var(--s-serif),Georgia,serif;font-variation-settings:"SOFT" 70;font-size:clamp(20px,1.75vw,28px);font-weight:300;line-height:1.42;letter-spacing:-.01em}
.d-sage .z-acc summary{font-family:var(--s-serif),Georgia,serif;font-variation-settings:"SOFT" 70;font-size:clamp(21px,1.9vw,28px);font-weight:300;line-height:1.2;letter-spacing:-.015em}
.d-sage .z-acc summary i{color:var(--sage-d)}
.d-sage .z-hours{font-size:15.5px}
.d-sage .z-hours div{padding:13px 0}
.d-sage .z-hours dd{font-variant-numeric:tabular-nums;color:var(--sage-d)}
.d-sage .z-reach a{min-height:44px}
.d-sage .z-reach .z-route{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}
.d-sage .z-sec.z-cta,.d-sage .s-book+.z-sec.z-contact{background:var(--wash)}
.d-sage .z-sec.z-contact,.d-sage .z-sec.z-packages,.d-sage .z-sec.z-menu{background:var(--sand)}
.d-sage .z-cta h2{font-size:clamp(34px,4.6vw,72px)}
.d-sage .z-statement h2{letter-spacing:-.025em;text-wrap:balance}
.d-sage .z-card{border:0;border-radius:clamp(24px,3vw,44px) clamp(24px,3vw,44px) 0 0;background:var(--paper)}
.d-sage .z-pack.is-featured{background:var(--wash)}
.d-sage .z-pack-price b{letter-spacing:-.02em}
.d-sage .z-ico{border-color:var(--sage)}
.d-sage .z-ba{border-radius:0 clamp(60px,12vw,160px) 0 0}
.d-sage .z-ba figcaption{border-radius:999px;background:rgba(245,240,232,.9);color:var(--ink)}
.d-sage .z-channel{background:var(--paper)}
.d-sage :is(.s-phil,.s-feat,.s-results,.s-space,.s-voices,.z-faq,.z-hours-sec,.z-statement,.z-order,.z-ba-sec)+:is(.s-phil,.s-feat,.s-results,.s-space,.s-voices,.z-faq,.z-hours-sec,.z-statement,.z-order,.z-ba-sec){padding-top:0}
.d-sage .s-foot-mark{max-width:100%;font-size:clamp(40px,calc(180vw / var(--n,10)),13.4vw);white-space:normal;overflow-wrap:break-word}
.d-sage .s-foot-top>.btn{justify-self:start}
.d-sage .s-foot-grid a{overflow-wrap:anywhere}
.d-sage .s-foot address a{min-height:40px;padding:8px 0}
.d-sage .s-foot-hours dt{min-width:0}
@media (min-width:960px){.d-sage .s-foot-mark{font-size:min(13.4vw,210px,calc(175vw / var(--n,10)),calc(2300px / var(--n,10)));white-space:nowrap}}
`
  .replace(/\n/g, "")
  .trim();

/** "Book" in a treatment row chooses that treatment in the booking form. */
const JS = `(function(){var d=document,q=function(s){return [].slice.call(d.querySelectorAll(s))};q('[data-pick]').forEach(function(a){a.addEventListener('click',function(){var v=a.getAttribute('data-pick');q('select[name=service]').forEach(function(s){[].slice.call(s.options).forEach(function(o){if(o.text===v)s.value=o.value})})})})})();`;

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const ext = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

/** The name with its last word in the italic sage of the design. */
function Mark({ name }: { name: string }) {
  const k = name.lastIndexOf(" ");
  if (k < 0) return <>{name}</>;
  return (
    <>
      {name.slice(0, k)} <em>{name.slice(k + 1)}</em>
    </>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const isLong = c.name.length > 18;
  // Room the logo and the pill need side by side on a phone, in px (estimated from their type sizes).
  const need = c.name.length * (isLong ? 9 : 11) + cta.label.length * 7.6 + 44;
  const pill = need <= 236 ? "" : need <= 300 ? " is-w1" : " is-w2";
  return (
    <>
      <header className="s-nav hdr">
        <a href="#top" className={`s-logo${isLong ? " is-long" : ""}`} aria-label={c.name}>
          <span>
            <Mark name={c.name} />
          </span>
        </a>
        <nav aria-label={c.t.menu} className="s-links" data-nav>
          {c.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href={cta.href} className={`btn s-pill s-nav-pill${pill}`} {...ext(cta.href)}>
          {cta.label}
        </a>
        <button type="button" className="s-burger menu-btn" aria-expanded="false" aria-controls="site-menu" aria-label={c.t.menu}>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="site-menu" className="s-menu" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              {n.label}
            </a>
          ))}
          <a href={cta.href} style={i(c.nav.length)} {...ext(cta.href)}>
            <em>{cta.label}</em>
          </a>
        </nav>
        <div className="s-menu-foot">
          {b.openingHours?.length ? (
            <p>
              <b>{c.t.hours}</b>
              {b.openingHours.slice(0, 3).map((l, k) => (
                <span key={k}>
                  {k > 0 ? <br /> : null}
                  {l}
                </span>
              ))}
            </p>
          ) : null}
          {b.phone || b.email ? (
            <p>
              <b>{c.t.contact}</b>
              {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
              {b.phone && b.email ? <br /> : null}
              {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const p = c.photo(hero.image);
  const small = p ? c.spare() : null;
  const plain = hero.headline.replace(/\*/g, "");
  const word = Math.max(...plain.split(/\s+/).map((w) => w.length));
  const size = plain.length > 44 || word > 15 ? "is-s" : plain.length > 22 || word > 10 ? "is-m" : undefined;
  const { lines, marked } = splitLines(hero.headline, plain.length > 44 ? 3 : plain.length > 12 ? 2 : 1);
  const facts = heroFacts(c);
  // The caption under the arch: the note of the opening, or the first treatment with its own duration and price.
  const first = c.spec.sections.find((s): s is SectionOf<"services"> => s.type === "services")?.items.find((it) => (it.price || it.duration) && it.title.length <= 28);
  const cap = hero.note ? (
    <p className="s-hero-cap">{hero.note}</p>
  ) : first ? (
    <p className="s-hero-cap">
      {first.title}
      <span>{[first.duration, first.price].filter(Boolean).join(" · ")}</span>
    </p>
  ) : null;
  return (
    <section className="s-hero">
      <div className="s-wrap s-hero-grid">
        <div className="s-hero-copy">
          {hero.eyebrow ? (
            <p className="s-label s-rise" style={i(0)}>
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className={size}>
            {lines.map((line, n) => (
              <span className="s-rise" key={n} style={i(n + 1)}>
                {/* Without a marked phrase the last line carries the italic sage of the design. */}
                {!marked && lines.length > 1 && n === lines.length - 1 ? <em>{line}</em> : line}
              </span>
            ))}
          </h1>
          <p className="s-lede s-rise" style={i(4)}>
            {hero.subheadline}
          </p>
          <div className="s-cta s-rise" style={i(5)}>
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Btn>
            {hero.secondaryCta ? (
              <Btn c={c} href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label}
              </Btn>
            ) : null}
          </div>
        </div>
        {p ? (
          <div className="s-hero-art">
            <div className="s-ring s-hero-main">
              <figure className="s-arch">
                <Pic p={p} eager sizes="(min-width: 960px) 30vw, 70vw" />
              </figure>
            </div>
            {small ? (
              <figure className="s-arch s-hero-small" data-px>
                <Pic p={small} sizes="(min-width: 960px) 13vw, 32vw" />
              </figure>
            ) : null}
            {cap}
          </div>
        ) : (
          <div className="s-hero-art is-mono">
            <div className="s-ring s-hero-main">
              <div className="s-arch s-mono" aria-hidden="true">
                <span>{c.name.charAt(0)}</span>
              </div>
            </div>
            {cap}
          </div>
        )}
      </div>
      {facts.length > 0 && (
        <div className="s-wrap">
          <dl className="s-hero-facts s-rise" data-n={facts.length} style={i(7)}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const rows = b.openingHours?.length ? hoursRows(b.openingHours) : [];
  return (
    <footer className="s-foot">
      <div className="s-wrap">
        <div className="s-foot-top">
          <p className="s-foot-mark" style={css({ "--n": Math.max(6, c.name.length) })}>
            <Mark name={c.name} />
          </p>
          {c.spec.footer.blurb ? <p className="s-foot-line">{c.spec.footer.blurb}</p> : null}
          <a href={cta.href} className="btn s-pill s-pill-light" {...ext(cta.href)}>
            {cta.label}
          </a>
        </div>
        <div className="s-foot-grid">
          <nav aria-label={c.t.explore}>
            <h3>{c.t.explore}</h3>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          {rows.length > 0 && (
            <div>
              <h3>{c.t.hours}</h3>
              <dl className="s-foot-hours">
                {rows.map(([day, time], n) => (
                  <div key={n}>
                    <dt>{day}</dt>
                    <dd>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div>
            <h3>{c.t.contact}</h3>
            <address>
              {c.name}
              {b.address ?? b.city ? (
                <>
                  <br />
                  {b.address ?? b.city}
                </>
              ) : null}
              {b.phone ? (
                <>
                  <br />
                  <a href={tel(b.phone)}>{b.phone}</a>
                </>
              ) : null}
              {b.email ? (
                <>
                  <br />
                  <a href={`mailto:${b.email}`}>{b.email}</a>
                </>
              ) : null}
              {b.mapsUrl ? (
                <>
                  <br />
                  <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                    {c.t.route}
                  </a>
                </>
              ) : null}
            </address>
          </div>
        </div>
        <Legal c={c} className="s-legal" />
      </div>
    </footer>
  );
}

/** Section head of the design: label and headline left, a short paragraph right. */
function SecHead({ kicker, title, intro }: { kicker?: string; title: string; intro?: string }) {
  return (
    <header className={`s-head${intro ? "" : " is-bare"}`}>
      <div>
        {kicker ? (
          <p className="s-label" data-rv>
            {kicker}
          </p>
        ) : null}
        <h2 className={long(title)} data-rv>
          {em(title)}
        </h2>
      </div>
      {intro ? <p data-rv>{intro}</p> : null}
    </header>
  );
}

type Row = { title: string; text?: string; min?: string | null; price?: string | null; tags?: string[] };

/** Where "book" in a treatment row leads: the booking form of this site, when it has one. */
function bookTarget(c: Ctx) {
  const s = c.spec.sections.find((x): x is SectionOf<"booking"> => x.type === "booking");
  return s ? { href: `#${s.id}`, label: c.t.kick.booking, options: s.options } : null;
}

/** The treatment rows of the design: name and text, duration, price and the way to the form. */
function Rows({ rows, book, reveal }: { rows: Row[]; book: ReturnType<typeof bookTarget>; reveal?: boolean }) {
  return (
    <ul>
      {rows.map((r, n) => (
        <li key={n} {...(reveal ? { "data-rv": "" } : {})} style={i(reveal ? n % 3 : Math.min(n, 8))}>
          <div className="s-row-main">
            <h3>{r.title}</h3>
            {r.text ? <p>{r.text}</p> : null}
            {r.tags?.length ? <p className="s-row-tags">{r.tags.join(" · ")}</p> : null}
          </div>
          {r.min ? <span className="s-row-min">{r.min}</span> : null}
          {r.price ? <span className="s-row-price">{r.price}</span> : null}
          {book ? (
            <a href={book.href} className="btn s-row-book" aria-label={`${book.label}: ${r.title}`} data-pick={book.options.includes(r.title) ? r.title : undefined}>
              {book.label}
              <i aria-hidden="true" />
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function Cite({ q, c }: { q: { author: string; source: string; sourceUrl: string }; c: Ctx }) {
  return (
    <footer>
      <b>{q.author}</b>
      <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
        {c.t.source}: {q.source}
      </a>
    </footer>
  );
}

/** A photograph in the ringed arch of the design, on the sage wash. */
function Ringed({ p, sizes }: { p: Photo; sizes: string }) {
  return (
    <div className="s-about-art">
      <div className="s-ring">
        <figure className="s-arch" data-rv="arch" data-px>
          <Pic p={p} sizes={sizes} />
        </figure>
      </div>
    </div>
  );
}

export const sage: Family = {
  key: "sage",
  root: "d-sage",
  fonts: ["Fraunces Soft", "Figtree"],
  themeColor: "#f5f0e8",
  accent: "#55624b",
  onAccent: "#fbf8f2",
  css: CSS,
  extra: EXTRA,
  js: JS,
  cls: { wrap: "s-wrap", eyebrow: "s-label", btn: "s-pill", btnAlt: "s-pill s-pill-ghost", btnText: "s-link" },
  Header,
  Hero,
  Footer,
  sections: {
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      const head: ReactNode = (
        <>
          <p className="s-label" data-rv>
            {c.t.kick.about}
          </p>
          <h2 className={long(s.title)} data-rv>
            {em(s.title)}
          </h2>
        </>
      );
      return (
        <section className="s-phil" id={s.id}>
          <div className={`s-wrap s-phil-grid${p ? "" : " is-solo"}`}>
            {p ? (
              <div className="s-phil-art">
                <div className="s-ring" data-px>
                  <figure className="s-arch" data-rv="arch">
                    <Pic p={p} sizes="(min-width: 960px) 28vw, 64vw" />
                  </figure>
                </div>
              </div>
            ) : (
              <div className="s-phil-head">{head}</div>
            )}
            <div className="s-phil-copy">
              {p ? head : null}
              <p className="s-big" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} className="s-text" data-rv>
                  {x}
                </p>
              ))}
              {s.highlights.length > 0 && (
                <ol className="s-principles is-notes">
                  {s.highlights.map((h, n) => (
                    <li key={h} data-rv style={i(n)}>
                      <span aria-hidden="true">{ROMAN[n]}</span>
                      <p className="s-note-h">{h}</p>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </section>
      );
    },
    services: (s, c) => {
      const p = c.spare();
      const book = bookTarget(c);
      return (
        <section className="s-menu-sec" id={s.id}>
          <div className="s-wrap">
            <SecHead kicker={c.t.kick.services} title={s.title} intro={p ? undefined : s.intro} />
            <div className={`s-treat${p ? "" : " is-solo"}`}>
              {p ? (
                <div className={`s-treat-side${s.intro ? (s.intro.length > 120 ? " is-long" : "") : " is-bare"}`} data-rv>
                  <div className="s-arch s-treat-photo">
                    <Pic p={p} sizes="(min-width: 960px) 26vw, 60vw" className="is-on" />
                  </div>
                  {s.intro ? <p className="s-treat-note">{s.intro}</p> : null}
                </div>
              ) : null}
              <div className="s-treat-main">
                <div className="s-rows is-flat">
                  <Rows rows={s.items.map((it) => ({ title: it.title, text: it.description, min: it.duration, price: it.price }))} book={book} reveal />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    },
    menu: (s, c) => {
      const cats = s.categories.filter((cat) => cat.items.length > 0);
      if (!cats.length) return null;
      // One photograph per category when there are enough, otherwise one for the whole list.
      const pics: Photo[] = [];
      for (let n = 0; n < cats.length; n++) {
        const p = c.spare();
        if (!p) break;
        pics.push(p);
      }
      const each = pics.length === cats.length && cats.length > 1;
      const tabId = (n: number) => `${s.id}-tab-${n}`;
      const book = bookTarget(c);
      return (
        <section className="s-menu-sec" id={s.id}>
          <div className="s-wrap">
            <SecHead kicker={c.t.kick.menu} title={s.title} intro={pics.length ? undefined : s.intro} />
            <div className={`s-treat${pics.length ? "" : " is-solo"}`}>
              {pics.length > 0 && (
                <div className={`s-treat-side${s.intro ? (s.intro.length > 120 ? " is-long" : "") : " is-bare"}`} data-rv>
                  <div className="s-arch s-treat-photo">
                    {(each ? pics : pics.slice(0, 1)).map((p, n) => (
                      <Pic key={n} p={p} sizes="(min-width: 960px) 26vw, 60vw" className={n === 0 ? "is-on" : undefined} tab={each ? tabId(n) : undefined} />
                    ))}
                  </div>
                  {s.intro ? <p className="s-treat-note">{s.intro}</p> : null}
                </div>
              )}
              <div className="s-treat-main">
                {cats.length > 1 && (
                  <div className="s-tabs" role="tablist" aria-label={s.title.replace(/\*/g, "")} data-rv>
                    {cats.map((cat, n) => (
                      <button key={n} type="button" role="tab" id={tabId(n)} aria-selected={n === 0} aria-controls={`${s.id}-panel-${n}`} tabIndex={n === 0 ? 0 : -1}>
                        {cat.name}
                        <small aria-hidden="true">{cat.items.length}</small>
                      </button>
                    ))}
                  </div>
                )}
                {cats.map((cat, n) => (
                  <div key={n} id={`${s.id}-panel-${n}`} role={cats.length > 1 ? "tabpanel" : undefined} aria-labelledby={cats.length > 1 ? tabId(n) : undefined} className={`s-rows${cats.length > 1 ? "" : " is-flat"}`} hidden={n > 0}>
                    {cats.length === 1 ? <p className="s-label s-row-cat">{cat.name}</p> : null}
                    <Rows rows={cat.items.map((d) => ({ title: d.name, text: d.description, price: d.price, tags: d.tags }))} book={book} />
                  </div>
                ))}
                {s.note ? (
                  <p className="s-small" data-rv>
                    {s.note}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="s-feat" id={s.id}>
        <div className="s-wrap">
          <SecHead kicker={c.t.kick.features} title={s.title} intro={s.intro} />
          <ol className="s-principles">
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span aria-hidden="true">{ROMAN[n]}</span>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    process: (s, c) => (
      <section className="s-results" id={s.id}>
        <div className="s-wrap s-results-grid is-steps">
          <div className="s-results-head">
            <p className="s-label" data-rv>
              {c.t.kick.process}
            </p>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {s.intro ? <p data-rv>{s.intro}</p> : null}
          </div>
          <ol className="s-stages is-num">
            {s.steps.map((st, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <small aria-hidden="true">{String(n + 1).padStart(2, "0")}</small>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images
        .map((r) => c.photo(r))
        .filter((p): p is Photo => Boolean(p))
        .slice(0, 9);
      if (!pics.length) return null;
      // The rhythm of the demo's rooms: a wide frame, an arch beside it, an arch and a wide frame below.
      const kind = (k: number) => {
        const last = k === pics.length - 1;
        const m = k % 4;
        if (m === 0) return last ? "is-wide" : "is-a";
        if (m === 1) return "is-b";
        if (m === 2) return last ? "is-d is-lone" : "is-c";
        return "is-d";
      };
      return (
        <section className="s-space is-gal" id={s.id}>
          <div className="s-wrap">
            <SecHead kicker={c.t.kick.gallery} title={s.title} />
            <div className="s-rooms s-gal">
              {pics.map((p, k) => {
                const cls = kind(k);
                const arch = cls === "is-b" || cls === "is-c";
                return (
                  <figure key={k} className={`s-room ${cls}`}>
                    <div className={arch ? "s-arch" : "s-frame"} data-rv="arch" {...(arch ? {} : { "data-px": "" })}>
                      <Pic p={p} sizes={arch ? "(min-width: 960px) 24vw, 44vw" : "(min-width: 960px) 62vw, 92vw"} />
                    </div>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      );
    },
    showcase: (s, c) => {
      const p = c.photo(s.image);
      return (
        <section className="s-about" id={s.id}>
          <div className={`s-wrap s-about-grid${p ? "" : " is-solo"}`}>
            {p ? <Ringed p={p} sizes="(min-width: 960px) 32vw, 78vw" /> : null}
            <div className="s-about-copy">
              {c.t.kick.showcase ? (
                <p className="s-label" data-rv>
                  {c.t.kick.showcase}
                </p>
              ) : null}
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
              {s.body ? (
                <p className="s-big" data-rv>
                  {s.body}
                </p>
              ) : null}
              {s.cta ? (
                <p className="s-about-cta" data-rv>
                  <Btn c={c} href={s.cta.href}>
                    {s.cta.label}
                  </Btn>
                </p>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    team: (s, c) => {
      const ms = s.members.map((m) => ({ ...m, p: c.photo(m.image) }));
      const solo = ms.length === 1 ? ms[0] : null;
      // One person with a portrait gets the founder layout of the design.
      if (solo?.p) {
        return (
          <section className="s-about" id={s.id}>
            <div className="s-wrap s-about-grid">
              <Ringed p={solo.p} sizes="(min-width: 960px) 32vw, 78vw" />
              <div className="s-about-copy">
                <p className="s-label" data-rv>
                  {c.t.kick.team}
                </p>
                <h2 className={long(s.title)} data-rv>
                  {em(s.title)}
                </h2>
                {s.intro ? (
                  <p className="s-big" data-rv>
                    {s.intro}
                  </p>
                ) : null}
                {solo.bio ? <p data-rv>{solo.bio}</p> : null}
                <h3 className="s-sign is-name" data-rv>
                  {solo.name}
                </h3>
                <p className="s-label s-role" data-rv>
                  {solo.role}
                </p>
              </div>
            </div>
          </section>
        );
      }
      // Portraits only when everyone has one: a row with gaps would read as missing people.
      const pics = ms.every((m) => m.p);
      return (
        <section className="s-teamsec" id={s.id}>
          <div className="s-wrap">
            <SecHead kicker={c.t.kick.team} title={s.title} intro={s.intro} />
            <ul className={`s-team${pics ? "" : " is-plain"}`} data-n={ms.length > 4 ? 3 : ms.length}>
              {ms.map((m, n) => (
                <li key={n}>
                  {pics && m.p ? (
                    <figure className="s-arch" data-rv="arch">
                      <Pic p={m.p} sizes="(min-width: 960px) 28vw, 42vw" />
                    </figure>
                  ) : null}
                  <div data-rv style={i(n % 3)}>
                    <h3>{m.name}</h3>
                    <p className="s-role">{m.role}</p>
                    {m.bio ? <p>{m.bio}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    },
    testimonials: (s, c) => {
      // The design opens with one short quote set large; the first that is short enough takes that place.
      const at = Math.max(
        0,
        s.items.findIndex((q) => q.quote.length <= 160),
      );
      const big = s.items[at];
      const rest = s.items.filter((_, n) => n !== at);
      const art = c.spare();
      return (
        <section className="s-voices" id={s.id} aria-labelledby={`${s.id}-h`}>
          <div className="s-wrap">
            <h2 className="s-label" id={`${s.id}-h`} data-rv>
              {s.title.replace(/\*/g, "")}
            </h2>
            <div className={`s-voices-top${art ? "" : " is-solo"}`}>
              <blockquote className={`s-voice-big${big.quote.length > 160 ? " is-long" : ""}`} data-rv>
                <p>{big.quote}</p>
                <Cite q={big} c={c} />
              </blockquote>
              {art ? (
                <figure className="s-arch s-voices-art" data-rv="arch" data-px>
                  <Pic p={art} sizes="(min-width: 960px) 20vw, 44vw" />
                </figure>
              ) : null}
            </div>
            {rest.length > 0 && (
              <div className="s-voices-rest" data-n={rest.length}>
                {rest.map((q, n) => (
                  <blockquote key={n} data-rv style={i(n % 3)}>
                    <p>{q.quote}</p>
                    <Cite q={q} c={c} />
                  </blockquote>
                ))}
              </div>
            )}
          </div>
        </section>
      );
    },
    booking: (s, c) => {
      const b = c.spec.business;
      return (
        <section className="s-book" id={s.id}>
          <div className="s-wrap s-book-grid">
            <div className="s-book-copy">
              <p className="s-label" data-rv>
                {c.t.kick.booking}
              </p>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Hours c={c} className="s-hours" />
              {b.phone || b.email ? (
                <p className="s-book-call" data-rv>
                  {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
                  {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
                </p>
              ) : null}
            </div>
            <div className="s-book-card" data-rv>
              <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
            </div>
          </div>
        </section>
      );
    },
  },
};
