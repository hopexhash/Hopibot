import type { ReactNode } from "react";
import type { SiteSection } from "@/lib/site-spec";
import { CSS } from "./css/fashion";
import { Btn, css, DemoForm, em, heroFacts, hoursRows, i, Legal, long, Pic, splitLines, tel, type Ctx, type Family, type HeadProps, type Photo } from "./kit";

/**
 * Lune (demo: /demos/fashion). Bone paper, near-black ink and one oxblood accent: a
 * high-contrast Bodoni set very large over a spread of black-and-white photographs, a quiet
 * grotesk for the work. For clothing stores, boutiques, book and gift shops. There is no cart
 * or catalogue: the range is shown editorially, as a numbered index and a lookbook.
 */

const EXTRA = `
.d-lune{--l-serif:"Bodoni Moda";--l-sans:"Hanken Grotesk";--z-bg2:var(--paper);--z-ink:var(--ink);--z-dim:var(--dim);--z-line:var(--line);--z-accent:var(--accent);--z-on-accent:var(--paper);--z-display:var(--l-serif),Didot,serif;--z-radius:0;--z-ico-radius:0;--z-field-radius:0;--z-sec:clamp(76px,10vw,170px);--z-h3:clamp(24px,2.2vw,32px);--z-statement:clamp(32px,4.4vw,72px)}
.d-lune h2.is-long{font-size:clamp(34px,4.2vw,68px);line-height:1.02}
.d-lune .l-head2 h2.is-long{max-width:20ch}
.d-lune .l-btn{isolation:isolate;text-align:center}
.d-lune .l-btn::before{z-index:-1}
.d-lune .l-bar p{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-lune .l-head .l-logo{max-width:calc(100% - 120px);overflow:hidden;text-overflow:ellipsis}
.d-lune .l-logo.is-long{font-size:19px}
.d-lune .l-head-r{display:contents}
.d-lune .l-head-cta{display:none;min-height:40px;max-width:280px;padding:0 18px;font-size:10.5px;white-space:nowrap}
.d-lune .l-head-cta span{min-width:0;overflow:hidden;text-overflow:ellipsis}
@media (min-width:520px){.d-lune .l-head .l-logo{max-width:calc(100% - 230px)}}
@media (min-width:760px){.d-lune .l-head-cta{display:inline-flex}.d-lune .l-head .l-logo{max-width:calc(100% - 400px)}}
@media (min-width:1180px){.d-lune .l-head{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:28px}.d-lune .l-head .l-logo{position:static;transform:none;max-width:30vw;justify-self:center}.d-lune .l-logo.is-long{font-size:22px}.d-lune .l-head-r{display:flex;align-items:center;justify-content:flex-end;gap:20px;min-width:0}.d-lune .l-nav{min-width:0;overflow:hidden}.d-lune .l-nav-b{margin:0}.d-lune .l-nav a{white-space:nowrap;line-height:16px}.d-lune .l-nav{flex-wrap:wrap;height:44px;align-content:flex-start}.d-lune .l-nav-b{justify-content:flex-end}}
.d-lune.menu-open .l-scrim{opacity:1;visibility:visible;transition:opacity .6s var(--ease),visibility 0s}
.d-lune .l-x i{position:relative;width:14px;height:14px}
.d-lune .l-x i::before,.d-lune .l-x i::after{content:"";position:absolute;left:0;top:50%;width:100%;height:1px;background:currentColor;transform:rotate(45deg)}
.d-lune .l-x i::after{transform:rotate(-45deg)}
.d-lune .l-panel-head .l-logo{min-width:0;overflow:hidden;text-overflow:ellipsis}
.d-lune .l-menu-cats a span{min-width:0;overflow-wrap:anywhere}
.d-lune .l-menu-more{grid-template-columns:minmax(0,1fr)}
.d-lune .l-hero-eyebrow{position:static;margin-bottom:14px;white-space:normal;max-width:100%}
.d-lune .l-ph-a{top:0}
.d-lune .l-ph-b{top:43cqw}
.d-lune .l-spread{height:var(--sh,140cqw)}
.d-lune .l-hero h1{top:96cqw;font-size:var(--fp)}
.d-lune .l-line-3{margin-left:10cqw}
.d-lune .l-hero.is-long .l-line-2{margin-left:8cqw}
.d-lune .l-hero.is-long .l-line-3{margin-left:4cqw}
.d-lune .l-line-3>span{animation-delay:.65s}
.d-lune .l-tag svg{flex:none;margin-left:auto}
.d-lune .l-tag span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media (min-width:900px){.d-lune .l-hero-eyebrow{position:absolute;margin:0;max-width:33cqw}.d-lune .l-ph-b{top:6cqw}.d-lune .l-spread{height:64cqw}.d-lune .l-hero h1{top:14.6cqw;font-size:var(--fd)}.d-lune .l-line-3{margin-left:12cqw}.d-lune .l-hero.is-long .l-line-2{margin-left:12cqw}.d-lune .l-hero.no-pic .l-line-2{margin-left:18cqw}.d-lune .l-hero.no-pic .l-line-3{margin-left:8cqw}.d-lune .l-hero.no-pic.is-long .l-line-2{margin-left:8cqw}.d-lune .l-hero-copy{position:relative;top:auto;right:auto;width:26cqw;margin:-21cqw 0 0 auto}}
.d-lune .l-hero .l-ph img{filter:grayscale(1) contrast(.86) brightness(1.14)}
.d-lune .l-hero h1{text-shadow:0 0 .3em rgba(230,225,216,.75)}
.d-lune .l-hero.no-pic .l-spread{height:auto;padding-bottom:clamp(22px,3vw,44px);border-bottom:1px solid var(--ink)}
.d-lune .l-hero.no-pic h1{position:static;padding-top:clamp(18px,4vw,64px);font-size:var(--fp)}
.d-lune .l-hero.no-pic h1 em{color:var(--accent)}
@media (min-width:900px){.d-lune .l-hero.no-pic .l-hero-in{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,26cqw);column-gap:6cqw;padding-bottom:0}.d-lune .l-hero.no-pic .l-spread{grid-column:1/-1}.d-lune .l-hero.no-pic .l-hero-eyebrow{position:static;max-width:none}.d-lune .l-hero.no-pic h1{font-size:var(--fd)}.d-lune .l-hero.no-pic .l-hero-copy{grid-column:2;grid-row:2;width:auto;margin:36px 0 0}.d-lune .l-hero.no-pic .l-hero-tags{grid-column:1;grid-row:2;align-self:start;max-width:40cqw;margin-top:36px;border-top:1px solid var(--line)}.d-lune .l-hero.no-pic .l-hero-tags li{position:static;width:auto;border-bottom:1px solid var(--line)}.d-lune .l-hero.no-pic .l-hero-tags li .l-tag{height:auto;min-height:52px}}
.d-lune .l-strip[data-n="1"]{grid-template-columns:minmax(0,1fr)}
.d-lune .l-strip[data-n="1"] li{border-right:0}
.d-lune .l-strip li{min-width:0;overflow-wrap:anywhere}
.d-lune .l-strip a{text-decoration:underline;text-underline-offset:3px}
@media (max-width:899px){.d-lune .l-strip[data-n="3"] li:last-child,.d-lune .l-strip[data-n="5"] li:last-child{grid-column:1/-1;border-right:0}}
@media (min-width:900px){.d-lune .l-strip[data-n="2"]{grid-template-columns:repeat(2,1fr)}.d-lune .l-strip[data-n="3"],.d-lune .l-strip[data-n="5"],.d-lune .l-strip[data-n="6"]{grid-template-columns:repeat(3,1fr)}.d-lune .l-strip[data-n="5"] li:nth-child(n+4),.d-lune .l-strip[data-n="6"] li:nth-child(n+4){border-top:1px solid var(--line)!important}.d-lune .l-strip[data-n="5"] li:nth-child(3n),.d-lune .l-strip[data-n="6"] li:nth-child(3n){border-right:0}.d-lune .l-strip[data-n="5"] li:nth-child(4),.d-lune .l-strip[data-n="6"] li:nth-child(4){padding-left:var(--pad)}.d-lune .l-strip[data-n="5"] li:last-child{grid-column:span 2}}
.d-lune .l-feat{padding-bottom:0}
.d-lune .l-strip h3{font-size:inherit;font-weight:inherit;line-height:1.45}
.d-lune .l-coll-list a{min-height:64px}
.d-lune .l-coll.no-pic .l-coll-list a{grid-template-columns:40px minmax(0,1fr) auto;grid-template-areas:"num name n" "num note n"}
.d-lune .l-coll.no-pic .l-coll-list small{display:block;grid-area:num;align-self:start;padding-top:12px}
.d-lune .l-coll-name.is-long{font-size:clamp(24px,3vw,46px)}
.d-lune .l-coll-note{max-width:60ch}
.d-lune .l-coll-n b{font-size:11px;font-weight:500;letter-spacing:.14em}
.d-lune .l-coll-frame p:not(.is-on){display:none}
@media (max-width:999px){.d-lune .l-coll-n{align-self:start;padding-top:12px}.d-lune .l-coll-n b{max-width:9ch;white-space:normal;text-align:right;line-height:1.4}}
@media (min-width:1000px){.d-lune .l-coll.no-pic{grid-template-columns:minmax(0,1fr);max-width:1200px}}
.d-lune .l-look{--sheet:var(--ink)}
.d-lune .l-look-strip[data-n="1"]>li:not(.l-look-end){flex-basis:min(78vw,560px)}
.d-lune .l-look-strip[data-n="2"]>li:not(.l-look-end){flex-basis:clamp(236px,34vw,540px)}
.d-lune .l-look-end p.l-logo{font-size:clamp(34px,3.6vw,58px);line-height:1.02;white-space:normal;overflow-wrap:anywhere}
.d-lune .l-atelier-copy p{overflow-wrap:break-word}
.d-lune .l-facts li{min-width:0}
.d-lune .l-facts span{max-width:30ch;color:var(--ink)}
@media (min-width:900px){.d-lune .l-facts[data-n="1"]{grid-template-columns:minmax(0,1fr)}.d-lune .l-facts[data-n="2"]{grid-template-columns:repeat(2,1fr)}.d-lune .l-facts[data-n="4"]{grid-template-columns:repeat(4,1fr)}.d-lune .l-facts.is-side{grid-column:1/8;grid-row:3;align-self:center;grid-template-columns:minmax(0,1fr);border-top:1px solid var(--ink)}.d-lune .l-facts.is-side li{display:flex;gap:24px;padding:16px 0;border:0;border-bottom:1px solid var(--line)}.d-lune .l-atelier.no-pic .l-atelier-copy{grid-column:5/13;max-width:62ch}}
.d-lune .l-grid2{align-items:start!important}
.d-lune .l-service h2{font-size:clamp(40px,5vw,88px)}
.d-lune .l-service h2.is-long{max-width:18ch;font-size:clamp(32px,3.8vw,60px)}
.d-lune .l-paper{--sheet:var(--paper);background:var(--paper)}
.d-lune .l-paper .l-maten{background:var(--bone)}
@media (min-width:1000px){.d-lune .l-service-grid.is-solo .l-copy{max-width:980px}}
@media (min-width:1000px){.d-lune .l-service-grid.is-solo{grid-template-columns:minmax(0,1fr)}}
.d-lune .l-copy>p:not(.l-label){max-width:52ch;margin-bottom:14px;color:var(--dim)}
.d-lune .l-acc-big{border-bottom:1px solid var(--line)}
.d-lune .l-acc-big summary{padding:14px 0;line-height:1.15}
.d-lune .l-visit.is-col{grid-template-columns:repeat(2,minmax(0,1fr));margin-top:30px;padding-top:22px;border-top:1px solid var(--line)}
.d-lune .l-visit dd{overflow-wrap:anywhere}
.d-lune .l-visit a{display:inline-flex;align-items:center;min-height:40px}
.d-lune .l-route{margin-top:14px}
.d-lune .l-hours-t th{white-space:normal}
.d-lune .l-hours-t td{text-align:right;padding-right:0}
.d-lune .l-maten h3{overflow-wrap:anywhere}
.d-lune .l-maten .z-form{margin-top:8px}
.d-lune .z-form{gap:26px}
.d-lune .z-fields{gap:24px 26px}
.d-lune .z-field label,.d-lune .z-chipset legend{font-size:10.5px;font-weight:500;letter-spacing:.22em;color:var(--dim)}
.d-lune .z-field input,.d-lune .z-field select,.d-lune .z-field textarea{min-height:52px;padding:6px 0;border:0;border-bottom:1px solid var(--ink);font-family:var(--l-serif),Didot,serif;font-size:20px;letter-spacing:-.01em}
.d-lune .z-field textarea{min-height:96px}
.d-lune .z-field :focus-visible{outline:none;border-bottom-width:2px}
.d-lune .form-status{border-color:var(--accent);background:var(--bone)}
.d-lune .l-state h2{max-width:22ch;font-size:clamp(34px,4.6vw,78px);font-style:italic;line-height:1.04;letter-spacing:-.03em}
.d-lune .l-state h2 em{font-style:normal}
.d-lune .l-state h2.is-long{max-width:30ch;font-size:clamp(28px,3.2vw,54px);line-height:1.08}
.d-lune .l-state .l-label{margin-top:30px}
@media (min-width:900px){.d-lune .l-state .l-wrap{padding-left:calc(var(--pad) + 8.333%)}}
.d-lune .l-says-grid{display:grid;gap:clamp(40px,5vw,80px) clamp(24px,3vw,56px);grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))}
.d-lune .l-says .l-quote{display:grid;gap:22px;align-content:start;padding-top:22px;border-top:1px solid var(--ink)}
.d-lune .l-says .l-quote p{font-size:clamp(24px,2.3vw,36px);line-height:1.12}
.d-lune .l-says .l-quote footer{display:grid;gap:2px;margin:0}
.d-lune .l-says .l-quote footer a{display:inline-flex;align-items:center;min-height:36px;color:var(--dim);text-decoration:underline;text-underline-offset:3px}
.d-lune .l-showc-grid{display:grid;gap:34px}
.d-lune .l-showc-pic{aspect-ratio:4/3}
.d-lune .l-showc-pic img{width:100%;height:112%;object-fit:cover;transform:translateY(calc(-5% + var(--p,0) * -5%))}
.d-lune .l-showc-copy{display:grid;gap:20px;justify-items:start;max-width:46ch}
.d-lune .l-showc-copy h2{font-size:clamp(38px,4.4vw,74px)}
.d-lune .l-showc-copy>p:not(.l-label){color:var(--dim)}
@media (min-width:900px){.d-lune .l-showc-grid{grid-template-columns:repeat(12,minmax(0,1fr));column-gap:clamp(18px,2vw,32px)}.d-lune .l-showc-pic{grid-column:1/8}.d-lune .l-showc-copy{grid-column:9/13;align-self:end}.d-lune .l-showc.no-pic .l-showc-copy{grid-column:1/10;max-width:none}}
.d-lune .l-cta .btn{margin-top:28px}
.d-lune .l-foot-grid>div{min-width:0;overflow-wrap:anywhere}
.d-lune .l-foot-note{max-width:34ch;color:var(--dim)}
.d-lune .l-foot-mark{font-size:min(16.4vw,300px,calc(176vw / var(--n,12)))}
@media (max-width:899px){.d-lune .l-foot-grid a{display:flex;align-items:center;min-height:44px;padding:0}}
@media (min-width:900px){.d-lune .l-foot-grid[data-n="2"]{grid-template-columns:repeat(2,minmax(0,1fr))}.d-lune .l-foot-grid[data-n="3"]{grid-template-columns:repeat(3,minmax(0,1fr))}}
.d-lune .z-sec h3{font-family:var(--l-serif),Didot,serif;font-weight:400;letter-spacing:-.02em;line-height:1.1}
.d-lune .z-card,.d-lune .z-channel{border:0;background:var(--paper)}
.d-lune .z-pack.is-featured{box-shadow:inset 0 0 0 1px var(--ink)}
.d-lune .z-packages{background:var(--paper)}
.d-lune .z-packages .z-card{background:var(--bone)}
.d-lune .z-steps,.d-lune .z-rows{border-top-color:var(--ink)}
.d-lune .z-steps small,.d-lune .z-rows small{font-family:var(--l-serif),Didot,serif;font-size:24px;font-style:italic;letter-spacing:0;color:var(--ink)}
.d-lune .z-ico{border-color:var(--ink);color:var(--ink)}
.d-lune .z-tag,.d-lune .z-price{color:var(--accent)}
.d-lune .z-pic{background:var(--paper)}
`
  .replace(/\n/g, "")
  .trim();

/** Hover and focus in the index move the photograph in its frame; the scrim closes the menu. */
const JS = `(function(){var d=document,f=function(l,g){[].forEach.call(l,g)};f(d.querySelectorAll('.l-coll'),function(g){var as=g.querySelectorAll('.l-coll-list a'),ls=[as,g.querySelectorAll('.l-coll-frame img'),g.querySelectorAll('.l-coll-frame p')];f(as,function(a,k){var on=function(){ls.forEach(function(l){f(l,function(x,j){x.classList.toggle('is-on',j===k)})})};a.addEventListener('mouseenter',on);a.addEventListener('focus',on)})});var s=d.querySelector('.l-scrim'),b=d.querySelector('.d-lune .menu-btn');if(s&&b)s.addEventListener('click',function(){if(b.getAttribute('aria-expanded')==='true')b.click()})})();`;

const pad = (n: number) => String(n).padStart(2, "0");
const plain = (t: string) => t.replace(/\*/g, "");
const ext = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

const Arrow = ({ back }: { back?: boolean }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true" style={back ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
const Plus = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
    <path d="M12 4v16M4 12h16" />
  </svg>
);

/** The name as the demo sets its own: the last word in italics. */
function Logo({ name }: { name: string }) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length < 2) return <>{name}</>;
  return (
    <>
      {words.slice(0, -1).join(" ")} <em>{words[words.length - 1]}</em>
    </>
  );
}

const realKeys = (c: Ctx) => new Set(c.spec.images.filter((im) => im.license !== "generated" && /^https:\/\//.test(im.src)).map((im) => im.key));

/** Navigation without sections that render nothing (a gallery without photographs). */
function navOf(c: Ctx) {
  const keys = realKeys(c);
  return c.nav.filter((n) => {
    const s = c.spec.sections.find((x) => x.id === n.id);
    if (!s) return false;
    if (s.type === "gallery") return s.images.some((r) => keys.has(r));
    return true;
  });
}

const has = (c: Ctx, type: SiteSection["type"]) => c.spec.sections.some((s) => s.type === type);

/** Where a line of the shop's range leads: the form of the page, or the hero's own call to action. */
function target(c: Ctx) {
  const s = c.spec.sections.find((x) => x.type === "booking" || (x.type === "contact" && x.showForm)) ?? c.spec.sections.find((x) => x.type === "contact");
  return s ? `#${s.id}` : c.spec.hero.primaryCta.href;
}

/** Character count of each line splitLines makes (same rule, on plain text). */
function lineLens(text: string, parts: number) {
  const words = plain(text).split(/\s+/).filter(Boolean);
  const total = words.reduce((a, w) => a + w.length + 1, 0);
  const rows: string[][] = [[]];
  let at = 0;
  for (const w of words) {
    const row = rows[rows.length - 1];
    if (row.length && rows.length < parts && at + w.length / 2 > (total / parts) * rows.length) rows.push([w]);
    else row.push(w);
    at += w.length + 1;
  }
  return rows.map((r) => Math.max(4, r.join(" ").length));
}

/**
 * Sizes of the headline (in cqw of the hero) so the longest line fits beside its indent. On a
 * phone a long headline keeps a readable size and wraps inside its lines; the spread grows with it.
 */
function heroType(headline: string, pic: boolean) {
  const len = plain(headline).length;
  const parts = len > 34 ? 3 : len > 11 ? 2 : 1;
  const lens = lineLens(headline, parts);
  const n = lens.length;
  const lg = len > 50;
  const W = 0.54;
  const fit = (offs: number[], room: number, max: number) => Math.min(max, ...lens.map((l, k) => (room - offs[k]) / (l * W)));
  const fd = pic ? Math.min(fit(lg ? [0, 12, 4] : [0, 28, 12], 89, 15.6), 27 / (0.83 * n)) : fit(lg ? [0, 8, 4] : [0, 18, 8], 99, 17);
  const op = lg ? [0, 8, 4] : [0, 20, 10];
  const fp = Math.max(fit(op, 99, 21), 11);
  const rows = lens.reduce((a, l, k) => a + Math.ceil((l * W * fp) / (99 - op[k]) - 0.04), 0);
  const sh = Math.max(96 + rows * 0.86 * fp + 4, 112);
  return { parts, lg, style: css({ "--fd": `${fd.toFixed(2)}cqw`, "--fp": `${fp.toFixed(2)}cqw`, "--sh": `${sh.toFixed(1)}cqw` }) };
}

function Head(p: HeadProps) {
  return (
    <header className="l-head2">
      {p.kicker ? (
        <p className="l-label" data-rv>
          {p.kicker}
        </p>
      ) : null}
      <h2 id={p.id} className={long(p.title)} data-rv>
        {em(p.title)}
      </h2>
      {p.intro ? (
        <p className="l-intro" data-rv>
          {p.intro}
        </p>
      ) : null}
    </header>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const nav = navOf(c);
  const half = Math.ceil(nav.length / 2);
  const open = heroFacts(c).find((f) => f.label === c.t.hours);
  return (
    <>
      {b.tagline ? (
        <div className="l-bar">
          <p>{b.tagline}</p>
        </div>
      ) : null}
      <header className="l-head hdr">
        <button type="button" className="l-burger menu-btn" aria-expanded="false" aria-controls="l-menu">
          <i aria-hidden="true" />
          <span data-label data-open={c.t.menu} data-close={c.t.close}>
            {c.t.menu}
          </span>
        </button>
        <nav className="l-nav l-nav-a" aria-label={c.t.menu} data-nav>
          {nav.slice(0, half).map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#top" className={`l-logo${c.name.length > 18 ? " is-long" : ""}`} aria-label={c.name}>
          <Logo name={c.name} />
        </a>
        <div className="l-head-r">
          {nav.length > 1 ? (
            <nav className="l-nav l-nav-b" aria-label={c.t.explore} data-nav>
              {nav.slice(half).map((n) => (
                <a key={n.id} href={`#${n.id}`}>
                  {n.label}
                </a>
              ))}
            </nav>
          ) : null}
          <div className="l-head-tools">
            <a href={cta.href} className="btn l-btn l-head-cta" {...ext(cta.href)}>
              <span>{cta.label}</span>
            </a>
          </div>
        </div>
      </header>
      <div className="l-scrim" aria-hidden="true" />
      <div id="l-menu" className="l-panel l-menu" data-nav inert>
        <div className="l-panel-head">
          <p className="l-logo">
            <Logo name={c.name} />
          </p>
          <button type="button" className="l-x" data-menu-close>
            {c.t.close}
            <i aria-hidden="true" />
          </button>
        </div>
        <nav aria-label={c.t.menu} className="l-menu-cats">
          {nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <span>{n.label}</span>
              <small>{pad(k + 1)}</small>
            </a>
          ))}
        </nav>
        <div className="l-menu-more">
          <a href={cta.href} {...ext(cta.href)}>
            {cta.label}
          </a>
          {c.spec.hero.secondaryCta ? (
            <a href={c.spec.hero.secondaryCta.href} {...ext(c.spec.hero.secondaryCta.href)}>
              {c.spec.hero.secondaryCta.label}
            </a>
          ) : null}
        </div>
        <p className="l-menu-foot">
          {b.address ?? b.city}
          {open || b.phone ? (
            <>
              {b.address || b.city ? <br /> : null}
              {open ? open.value : null}
              {open && b.phone ? " · " : null}
              {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            </>
          ) : null}
        </p>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero, business: b } = c.spec;
  const a = c.photo(hero.image);
  const pb = a ? c.spare() : null;
  const pc = pb ? c.spare() : null;
  const { parts, lg, style } = heroType(hero.headline, Boolean(a));
  const { lines, marked } = splitLines(hero.headline, parts);
  const nav = navOf(c);
  const tags = a ? nav.slice(0, 2) : nav;
  const facts = heroFacts(c);
  if (b.email && facts.length < 4) facts.push({ label: c.t.email, value: <a href={`mailto:${b.email}`}>{b.email}</a> });
  const city = b.city && !hero.eyebrow.toLowerCase().includes(b.city.toLowerCase()) ? b.city : null;
  return (
    <>
      <section className={`l-hero${a ? "" : " no-pic"}${lg ? " is-long" : ""}`} aria-labelledby="l-h1">
        <div className="l-hero-in" style={style}>
          {hero.eyebrow || city ? (
            <p className="l-label l-hero-eyebrow l-rise" style={i(0)}>
              {hero.eyebrow}
              {hero.eyebrow && city ? <i aria-hidden="true" /> : null}
              {city}
            </p>
          ) : null}
          <div className="l-spread">
            {a ? (
              <figure className="l-ph l-ph-a" style={i(0)} data-px>
                <span>
                  <Pic p={a} eager sizes="(min-width: 900px) 34vw, 72vw" />
                </span>
              </figure>
            ) : null}
            {pb ? (
              <figure className="l-ph l-ph-b" style={i(2)} data-px>
                <span>
                  <Pic p={pb} sizes="(min-width: 900px) 26vw, 46vw" />
                </span>
              </figure>
            ) : null}
            {pc ? (
              <figure className="l-ph l-ph-c" style={i(4)} data-px>
                <span>
                  <Pic p={pc} sizes="(min-width: 900px) 16vw, 1px" />
                </span>
              </figure>
            ) : null}
            <h1 id="l-h1">
              {lines.map((line, n) => (
                <span key={n} className={`l-line${n ? ` l-line-${n + 1}` : ""}`}>
                  {/* Without a marked phrase the last line carries the italic of the design. */}
                  <span>{!marked && lines.length > 1 && n === lines.length - 1 ? <em>{line}</em> : line}</span>
                </span>
              ))}
            </h1>
          </div>
          <div className="l-hero-copy l-rise" style={i(5)}>
            <p>{hero.subheadline}</p>
            <div>
              <Btn c={c} href={hero.primaryCta.href}>
                <span>{hero.primaryCta.label}</span>
              </Btn>
              {hero.secondaryCta ? (
                <Btn c={c} href={hero.secondaryCta.href} variant="text">
                  {hero.secondaryCta.label}
                </Btn>
              ) : null}
            </div>
          </div>
          {tags.length > 0 ? (
            <ul className="l-hero-tags" data-nav>
              {tags.map((n, k) => (
                <li key={n.id} className="l-rise" style={i(7 + k)}>
                  <a className="l-tag" href={`#${n.id}`}>
                    <small>{pad(k + 1)}</small>
                    <span>{n.label}</span>
                    <Plus />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
      {facts.length > 0 ? (
        <ul className="l-strip" data-n={facts.length} aria-label={c.t.contact}>
          {facts.map((f, n) => (
            <li key={f.label} data-rv style={i(n)}>
              <b>{f.label}</b>
              <span>{f.value}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

/** Address, phone, e-mail (and the hours when no other part of the page shows them) as the demo's visit list. */
function Visit({ c, hours }: { c: Ctx; hours: boolean }) {
  const b = c.spec.business;
  const rows: [string, ReactNode][] = [];
  if (b.address) rows.push([c.t.address, b.address]);
  if (b.phone) rows.push([c.t.phone, <a key="p" href={tel(b.phone)}>{b.phone}</a>]);
  if (b.email) rows.push([c.t.email, <a key="e" href={`mailto:${b.email}`}>{b.email}</a>]);
  if (hours && b.openingHours?.length) hoursRows(b.openingHours).forEach(([d, t]) => rows.push([d, t]));
  return (
    <>
      {rows.length ? (
        <dl className="l-visit is-col" data-rv>
          {rows.map(([dt, dd], n) => (
            <div key={n}>
              <dt>{dt}</dt>
              <dd>{dd}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {b.mapsUrl ? (
        <p className="l-route" data-rv>
          <a href={b.mapsUrl} className="l-link" target="_blank" rel="noopener noreferrer">
            {c.t.route}
          </a>
        </p>
      ) : null}
    </>
  );
}

/** Opening hours as the demo's size table. */
function HoursCard({ c }: { c: Ctx }) {
  const lines = c.spec.business.openingHours ?? [];
  return (
    <div className="l-maten" data-rv>
      <p className="l-label">{c.t.hours}</p>
      <h3>{c.name}</h3>
      {lines.length ? (
        <div className="l-table">
          <table className="l-hours-t">
            <tbody>
              {hoursRows(lines).map(([d, t], n) => (
                <tr key={n}>
                  <th scope="row">{d}</th>
                  <td>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>{c.t.hoursTbc}</p>
      )}
    </div>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const nav = navOf(c);
  const cols = [nav.length > 0, true, Boolean(b.openingHours?.length), Boolean(c.spec.footer.blurb)].filter(Boolean).length;
  return (
    <footer className="l-foot">
      <div className="l-wrap">
        <div className="l-foot-grid" data-n={cols}>
          {nav.length ? (
            <div>
              <h3>{c.t.explore}</h3>
              <nav aria-label={c.t.explore} data-nav>
                {nav.map((n) => (
                  <a key={n.id} href={`#${n.id}`}>
                    {n.label}
                  </a>
                ))}
              </nav>
            </div>
          ) : null}
          <div>
            <h3>{c.t.contact}</h3>
            {b.address || b.city ? <p>{b.address ?? b.city}</p> : null}
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
              <p>
                {b.openingHours.slice(0, 7).map((l, n) => (
                  <span key={n}>
                    {n ? <br /> : null}
                    {l}
                  </span>
                ))}
              </p>
            </div>
          ) : null}
          {c.spec.footer.blurb ? (
            <div>
              <h3>{c.name}</h3>
              <p className="l-foot-note">{c.spec.footer.blurb}</p>
            </div>
          ) : null}
        </div>
        <p className="l-foot-mark" aria-hidden="true" style={css({ "--n": Math.max(10, c.name.length) })}>
          <Logo name={c.name} />
        </p>
        <Legal c={c} className="l-legal" />
      </div>
    </footer>
  );
}

export const lune: Family = {
  key: "lune",
  root: "d-lune",
  fonts: ["Bodoni Moda", "Hanken Grotesk"],
  themeColor: "#e6e1d8",
  accent: "#7a2e22",
  onAccent: "#f4f1ea",
  css: CSS,
  extra: EXTRA,
  js: JS,
  cls: { wrap: "l-wrap", eyebrow: "l-label", btn: "l-btn", btnAlt: "l-btn l-btn-light", btnText: "l-link" },
  Header,
  Hero,
  Footer,
  Head: (p) => Head(p),
  sections: {
    about: (s, c) => {
      const a = c.photo(s.image);
      const hl = s.highlights;
      const b = a && hl.length ? c.spare() : null;
      const [first, ...rest] = s.paragraphs;
      const city = c.spec.business.city;
      return (
        <section className={`l-sec l-atelier${a ? "" : " no-pic"}`} id={s.id}>
          <div className="l-wrap l-atelier-grid">
            <div className="l-atelier-title">
              <p className="l-label" data-rv>
                {c.t.kick.about}
              </p>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
            </div>
            {a ? (
              <figure className="l-atelier-a" data-rv="img" data-px>
                <Pic p={a} sizes="(min-width: 900px) 56vw, 100vw" />
                <figcaption>{city ? `${c.name}, ${city}` : c.name}</figcaption>
              </figure>
            ) : null}
            <div className="l-atelier-copy">
              <p className="l-lead" data-rv>
                {first}
              </p>
              {rest.map((x, n) => (
                <p key={n} data-rv>
                  {x}
                </p>
              ))}
            </div>
            {b ? (
              <figure className="l-atelier-b" data-rv="img" data-px>
                <Pic p={b} sizes="(min-width: 900px) 30vw, 70vw" />
              </figure>
            ) : null}
            {hl.length > 0 ? (
              <ul className={`l-facts${b ? " is-side" : ""}`} data-n={hl.length}>
                {hl.map((h, n) => (
                  <li key={n} data-rv style={i(n)}>
                    <b>{pad(n + 1)}</b>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      );
    },
    services: (s, c) => {
      const all = s.items.map((_, n) => c.photo(`art:svc${n}`));
      const pics = all.every(Boolean) ? (all as Photo[]) : [];
      const href = target(c);
      return (
        <section className="l-sec l-colls" id={s.id}>
          <div className="l-wrap">
            <Head kicker={c.t.kick.services} title={s.title} intro={s.intro} />
            <div className={`l-coll${pics.length ? "" : " no-pic"}`}>
              <ol className="l-coll-list">
                {s.items.map((it, n) => {
                  const meta = [it.price, it.duration].filter(Boolean).join(" · ");
                  return (
                    <li key={n} data-rv style={i(n % 6)}>
                      <a href={href} className={n === 0 ? "is-on" : undefined} {...ext(href)}>
                        <small>{pad(n + 1)}</small>
                        {pics[n] ? (
                          <span className="l-coll-thumb">
                            <Pic p={pics[n]} sizes="96px" />
                          </span>
                        ) : null}
                        <span className={`l-coll-name${it.title.length > 32 ? " is-long" : ""}`}>{it.title}</span>
                        <span className="l-coll-note">{it.description}</span>
                        <span className="l-coll-n">
                          {meta ? <b>{meta}</b> : null}
                          <Arrow />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
              {pics.length ? (
                <div className="l-coll-frame" aria-hidden="true">
                  <div>
                    {pics.map((p, n) => (
                      <Pic key={n} p={p} sizes="(min-width: 1000px) 32vw, 1px" className={n === 0 ? "is-on" : undefined} />
                    ))}
                  </div>
                  {s.items.map((it, n) => (
                    <p key={n} className={n === 0 ? "is-on" : undefined}>
                      <span>
                        {pad(n + 1)} / {pad(s.items.length)}
                      </span>
                      <span>{it.title}</span>
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="l-sec l-feat" id={s.id}>
        <div className="l-wrap">
          <Head kicker={c.t.kick.features} title={s.title} intro={s.intro} />
        </div>
        <ul className="l-strip" data-n={s.items.length}>
          {s.items.map((it, n) => (
            <li key={n} data-rv style={i(n % 4)}>
              <h3>
                <b>{it.title}</b>
              </h3>
              <span>{it.description}</span>
            </li>
          ))}
        </ul>
      </section>
    ),
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const sid = `${s.id}-strip`;
      const cta = c.spec.hero.primaryCta;
      return (
        <section className="l-sec l-look" id={s.id}>
          <div className="l-wrap l-look-head">
            <p className="l-label" data-rv>
              {c.t.kick.gallery}
            </p>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
          </div>
          {pics.length > 2 ? (
            <div className="l-look-nav" data-rv>
              <button type="button" data-scroll="prev" aria-controls={sid} aria-label="←">
                <Arrow back />
              </button>
              <button type="button" data-scroll="next" aria-controls={sid} aria-label="→">
                <Arrow />
              </button>
            </div>
          ) : null}
          <ol className="l-look-strip" id={sid} data-n={pics.length} data-rv>
            {pics.map((p, n) => (
              <li key={n}>
                <figure className="l-look-img">
                  <Pic p={p} sizes="(min-width: 900px) 30vw, 74vw" />
                </figure>
                <div className="l-look-cap">
                  <small>N° {pad(n + 1)}</small>
                </div>
              </li>
            ))}
            <li className="l-look-end">
              <p className="l-logo">
                <Logo name={c.name} />
              </p>
              <Btn c={c} href={cta.href} variant="alt">
                <span>{cta.label}</span>
              </Btn>
            </li>
          </ol>
        </section>
      );
    },
    showcase: (s, c) => {
      const p = c.photo(s.image);
      return (
        <section className={`l-sec l-showc${p ? "" : " no-pic"}`} id={s.id}>
          <div className="l-wrap l-showc-grid">
            {p ? (
              <figure className="l-showc-pic" data-rv="img" data-px>
                <Pic p={p} sizes="(min-width: 900px) 56vw, 100vw" />
              </figure>
            ) : null}
            <div className="l-showc-copy">
              <p className="l-label" data-rv>
                {c.t.kick.showcase}
              </p>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
              {s.body ? <p data-rv>{s.body}</p> : null}
              {s.cta ? (
                <p data-rv>
                  <Btn c={c} href={s.cta.href}>
                    <span>{s.cta.label}</span>
                  </Btn>
                </p>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    statement: (s) => (
      <section className="l-sec l-state" id={s.id}>
        <div className="l-wrap">
          <h2 className={plain(s.title).length > 110 ? "is-long" : undefined} data-rv>
            {em(s.title)}
          </h2>
          {s.note ? (
            <p className="l-label" data-rv>
              {s.note}
            </p>
          ) : null}
        </div>
      </section>
    ),
    testimonials: (s, c) => (
      <section className="l-sec l-says" id={s.id}>
        <div className="l-wrap">
          <Head kicker={c.t.kick.testimonials} title={s.title} />
          <div className="l-says-grid">
            {s.items.map((q, n) => (
              <blockquote key={n} className="l-quote" data-rv style={i(n % 3)}>
                <p>{q.quote}</p>
                <footer>
                  <span>{q.author}</span>
                  <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {c.t.source}: {q.source}
                  </a>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    ),
    cta: (s, c) => (
      <section className="l-news l-cta" id={s.id}>
        <div className="l-wrap l-news-grid">
          <div>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
          </div>
          <div data-rv>
            {s.body ? <p>{s.body}</p> : null}
            <Btn c={c} href={s.cta.href} variant="alt">
              <span>{s.cta.label}</span>
            </Btn>
          </div>
        </div>
      </section>
    ),
    faq: (s, c) => (
      <section className="l-sec l-service" id={s.id}>
        <div className="l-wrap l-service-grid l-grid2">
          <div>
            <p className="l-label" data-rv>
              {c.t.kick.faq}
            </p>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
          </div>
          <div className="l-acc l-acc-big" data-acc data-rv>
            {s.items.map((it, n) => (
              <details key={n} open={n === 0}>
                <summary>{it.q}</summary>
                <div>
                  <p>{it.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    ),
    hours: (s, c) => (
      <section className="l-sec l-service l-paper" id={s.id}>
        <div className="l-wrap l-service-grid l-grid2">
          <div className="l-copy">
            <p className="l-label" data-rv>
              {c.t.kick.hours}
            </p>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {s.note ? <p data-rv>{s.note}</p> : null}
            <Visit c={c} hours={false} />
          </div>
          <HoursCard c={c} />
        </div>
      </section>
    ),
    contact: (s, c) => {
      const card = !has(c, "hours") && !has(c, "booking") && Boolean(c.spec.business.openingHours?.length);
      const right = s.showForm ? (
        <div className="l-maten" data-rv>
          <p className="l-label">{c.t.contact}</p>
          <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
        </div>
      ) : card ? (
        <HoursCard c={c} />
      ) : null;
      return (
        <section className="l-sec l-service" id={s.id}>
          <div className={`l-wrap l-service-grid l-grid2${right ? "" : " is-solo"}`}>
            <div className="l-copy">
              <p className="l-label" data-rv>
                {c.t.kick.contact}
              </p>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
              {s.body ? <p data-rv>{s.body}</p> : null}
              <Visit c={c} hours={s.showForm && card} />
            </div>
            {right}
          </div>
        </section>
      );
    },
    booking: (s, c) => (
      <section className="l-sec l-service" id={s.id}>
        <div className="l-wrap l-service-grid l-grid2">
          <div className="l-copy">
            <p className="l-label" data-rv>
              {c.t.kick.booking}
            </p>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {s.body ? <p data-rv>{s.body}</p> : null}
            <Visit c={c} hours={!has(c, "hours")} />
          </div>
          <div className="l-maten" data-rv>
            <p className="l-label">{c.t.kick.booking}</p>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </div>
        </div>
      </section>
    ),
  },
};
