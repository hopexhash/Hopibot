import type { ReactNode } from "react";
import type { SiteSection } from "@/lib/site-spec";
import { CSS } from "./css/law-firm";
import { Btn, css, DemoForm, em, heroFacts, Hours, hoursRows, i, Legal, long, Pic, splitLines, tel, type Ctx, type Family, type HeadProps, type Photo } from "./kit";

/**
 * Aerden (demo: /demos/law-firm). Set like a well typeset deed: a ruled margin with paragraph
 * signs, newspaper serif headings with italic second halves, oxblood numerals on parchment and
 * brass on navy, photographs printed in two inks. Made for lawyers, notaries, accountants,
 * consultants and financial advisers: the practice areas become the demo's numbered articles,
 * the facts of the office its letterhead and margin.
 */

const CARET = "linear-gradient(45deg,transparent 50%,var(--ink) 50%),linear-gradient(135deg,var(--ink) 50%,transparent 50%)";

const EXTRA = `
.d-aerden{--a-serif:"Newsreader";--a-sans:"IBM Plex Sans"}
.d-aerden,.d-aerden .a-paper,.d-aerden .a-dark,.d-aerden .a-form-card,.d-aerden .a-band{--z-bg2:var(--paper);--z-ink:var(--ink);--z-dim:var(--soft);--z-line:var(--line);--z-accent:var(--acc);--z-on-accent:var(--parch);--z-display:var(--a-serif),Georgia,serif;--z-radius:0;--z-ico-radius:0;--z-field-radius:0;--z-sec:var(--sp);--z-h3:clamp(24px,2.2vw,32px);--z-statement:clamp(30px,4vw,62px)}
.d-aerden .a-paper{--z-bg2:var(--parch)}
.d-aerden .a-dark{--z-bg2:var(--navy-2)}
.d-aerden h2,.d-aerden h3{overflow-wrap:break-word;hyphens:auto}
.d-aerden h2.is-long{font-size:clamp(28px,3.5vw,54px);line-height:1.06}
.d-aerden .a-logo{flex:0 1 auto;min-width:0;max-width:100%}
.d-aerden .a-logo span{min-width:0;overflow:hidden;text-overflow:ellipsis}
.d-aerden .a-logo.is-long{font-size:19px}
.d-aerden .a-head-cta{flex:none;white-space:nowrap}
.d-aerden .a-burger{flex:none}
.d-aerden .a-links{min-width:0;flex-wrap:wrap;justify-content:flex-end;max-height:46px;overflow:hidden;white-space:nowrap}
@media (min-width:1100px){.d-aerden .a-logo.is-long{font-size:22px}}
@media (max-width:1279px){.d-aerden .a-links a:nth-child(n+5){display:none}}
@media (min-width:1280px) and (max-width:1499px){.d-aerden .a-head-tel{display:none}}
@media (max-width:599px){.d-aerden .a-logo{margin-right:auto}}
.d-aerden .a-toc-foot p{margin-top:6px}
.d-aerden .a-hero h1{font-size:min(11.6vw,124px,calc((100vw - 2 * var(--pad)) / (var(--w,8) * .54)))}
.d-aerden .a-hero h1.is-m{font-size:min(9.6vw,calc((100vw - 2 * var(--pad)) / (var(--w,8) * .54)));line-height:1}
.d-aerden .a-hero h1.is-s{font-size:min(8.2vw,calc((100vw - 2 * var(--pad)) / (var(--w,8) * .54)));line-height:1.02}
@media (min-width:1000px){.d-aerden .a-hero h1{font-size:min(8.5vw,132px)}.d-aerden .a-hero h1.is-m{font-size:min(6.4vw,96px)}.d-aerden .a-hero h1.is-s{font-size:min(5vw,74px)}}
.d-aerden .a-hero-row.is-solo{grid-template-columns:minmax(0,1fr)}
.d-aerden .a-hero-row.is-solo .a-lede{max-width:44ch}
.d-aerden .a-hero-facts.is-empty{padding:0}
@media (max-width:999px){.d-aerden .a-hero.no-facts .a-body{padding-bottom:clamp(56px,8vw,90px)}}
.d-aerden .a-hero-facts dd a{display:inline-flex;align-items:center;min-height:32px}
.d-aerden .a-index{align-self:start}
.d-aerden .a-index .a-cap{padding-bottom:12px;border-bottom:1px solid var(--ink);color:var(--ox)}
.d-aerden .a-index a{display:flex;align-items:baseline;gap:10px;min-height:54px;padding:13px 0 9px;border-bottom:1px solid var(--line);font-size:clamp(21px,1.9vw,27px);line-height:1.15;letter-spacing:-.012em;transition:color .3s var(--ease)}
.d-aerden .a-index a:hover{color:var(--ox)}
.d-aerden .a-index i{flex:1;min-width:16px;border-bottom:1px dotted var(--soft);transform:translateY(-4px)}
.d-aerden .a-index small{flex:none;font-size:17px;font-style:italic;color:var(--ox)}
.d-aerden .a-note.is-on{display:block;margin-top:14px}
.d-aerden .a-sec-head.is-solo{grid-template-columns:minmax(0,1fr)}
.d-aerden .a-sec-head.is-solo h2{max-width:22ch}
.d-aerden .a-dark .a-btn{background:var(--parch);border-color:var(--parch);color:var(--navy)}
.d-aerden .a-dark .a-btn:hover,.d-aerden .a-band .a-btn:hover{background:var(--ox);border-color:var(--ox);color:var(--parch)}
.d-aerden .a-dark .a-btn-line,.d-aerden .a-band .a-btn-line{background:none;border-color:var(--parch);color:var(--parch)}
.d-aerden .a-dark .a-form-card .a-btn{background:var(--navy);border-color:var(--navy);color:var(--parch)}
.d-aerden .a-paper .a-form-card{background:var(--parch)}
.d-aerden .a-after b{color:var(--acc)}
.d-aerden .a-lead.is-solo{grid-template-columns:minmax(0,1fr);padding-bottom:0}
.d-aerden .a-lead-copy .a-lede{max-width:40ch}
.d-aerden .a-lead-copy .a-cols{margin-top:22px}
.d-aerden .a-lead-copy .a-after{max-width:60ch}
.d-aerden .a-lead-copy .btn{margin-top:30px}
.d-aerden .a-lead-copy h2{margin-bottom:22px}
.d-aerden .a-lead.is-solo .a-lede{max-width:46ch}
.d-aerden figcaption{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}
.d-aerden .a-art summary{display:grid;grid-template-columns:minmax(0,1fr) 44px;align-items:center;gap:2px 16px;padding:18px 0;cursor:pointer;list-style:none}
.d-aerden .a-art summary::-webkit-details-marker,.d-aerden .a-pubs summary::-webkit-details-marker{display:none}
.d-aerden .a-art summary .a-art-t{font-size:clamp(27px,3.5vw,48px);overflow-wrap:break-word;hyphens:auto}
.d-aerden .a-art summary .a-art-t.is-long{font-size:clamp(23px,2.6vw,36px)}
.d-aerden .a-art summary:hover .a-art-t{transform:translateX(8px)}
.d-aerden .a-art[open]{border-bottom-color:var(--ink)}
.d-aerden .a-art[open] .a-art-t{font-style:italic}
.d-aerden details[open]>summary .a-plus{background:var(--navy);border-color:var(--navy);color:var(--parch)}
.d-aerden details[open]>summary .a-plus::after{transform:rotate(0deg)}
.d-aerden .a-dark details[open]>summary .a-plus{background:var(--parch);border-color:var(--parch);color:var(--navy)}
.d-aerden .a-art-s{white-space:nowrap}
.d-aerden .a-art-p{grid-template-columns:minmax(0,1fr)}
.d-aerden .a-art-p .a-art-text{grid-column:auto;max-width:62ch}
.d-aerden .a-art-p .a-art-work{margin-top:14px}
.d-aerden .a-art-p .a-link{margin-top:10px}
.d-aerden .a-art-fig .a-duo{aspect-ratio:4/3}
@media (min-width:760px){.d-aerden .a-art summary{grid-template-columns:84px minmax(0,1fr) auto 44px;gap:20px;padding:22px 0}.d-aerden .a-art-p,.d-aerden .a-art-p.has-pic{grid-template-columns:minmax(0,1fr) minmax(180px,.5fr);padding:10px 64px 44px 104px}.d-aerden .a-art-p:not(.has-pic){grid-template-columns:minmax(0,1fr)}}
@media (max-width:759px){.d-aerden .a-art-fig{max-width:420px}}
.d-aerden .a-notes li{animation:none}
.d-aerden .a-notes .a-txt{font-size:16.5px;line-height:1.5;color:var(--soft)}
@media (min-width:900px){.d-aerden .a-notes li:last-child:nth-child(odd){grid-column:1/-1;padding-right:0;border-right:0}}
.d-aerden .a-notes blockquote>p{font-size:clamp(21px,1.9vw,27px);font-style:italic;line-height:1.32;letter-spacing:-.01em}
.d-aerden .a-notes blockquote footer{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline;margin-top:18px}
.d-aerden .a-notes blockquote footer b{font-weight:500;color:var(--acc)}
.d-aerden .a-notes blockquote footer a{display:inline-flex;align-items:center;min-height:44px;text-decoration:underline;text-underline-offset:3px;color:var(--soft)}
@media (min-width:1100px){.d-aerden .a-steps[data-n="2"]{grid-template-columns:repeat(2,1fr)}.d-aerden .a-steps[data-n="3"],.d-aerden .a-steps[data-n="5"],.d-aerden .a-steps[data-n="6"]{grid-template-columns:repeat(3,1fr)}}
.d-aerden .a-fees.is-first{margin-top:0}
.d-aerden .a-fees.is-solo{grid-template-columns:minmax(0,1fr)}
.d-aerden .a-fees dt{color:var(--acc)}
.d-aerden .a-fees dd>*+*{margin-top:6px}
.d-aerden .a-fees dd b{font-size:clamp(24px,2.2vw,32px);font-weight:400;letter-spacing:-.015em}
.d-aerden .a-fees dd .a-unit{margin-left:8px;font-family:var(--a-sans),system-ui,sans-serif;font-size:13px;color:var(--soft)}
.d-aerden .a-fees dd .a-art-work{margin-top:10px}
.d-aerden .a-fees .a-tag{display:block;margin-top:6px;color:var(--soft)}
.d-aerden .a-fees-copy .a-small{margin-top:22px}
@media (min-width:640px){.d-aerden .a-fees dl div{grid-template-columns:180px minmax(0,1fr)}}
.d-aerden .a-small{font-size:15px;font-style:italic;line-height:1.45;color:var(--soft)}
.d-aerden .a-pubs summary{display:grid;grid-template-columns:minmax(0,1fr) 44px;align-items:center;gap:6px 16px;padding:20px 0;cursor:pointer;list-style:none}
.d-aerden .a-pubs summary:hover .a-pub-title{transform:translateX(6px)}
.d-aerden .a-pubs details[open] .a-pub-title{font-style:italic}
.d-aerden .a-pubs .a-pub-p p{color:var(--soft)}
.d-aerden .a-pubs summary .a-pub-date{font-family:var(--a-serif),Georgia,serif;font-size:20px;font-style:italic;color:var(--acc)}
@media (min-width:900px){.d-aerden .a-pubs summary{grid-template-columns:150px minmax(0,1fr) 44px;gap:24px;align-items:baseline;padding:24px 0}}
.d-aerden .a-sec.is-team .a-body{padding-bottom:0}
.d-aerden .a-sec.is-team .a-sec-head{margin-bottom:clamp(28px,4vw,56px)}
.d-aerden .a-sec.is-team{padding-bottom:var(--sp)}
.d-aerden .a-person{cursor:default}
.d-aerden .a-person.no-pic{grid-template-columns:minmax(0,1fr)}
.d-aerden .a-person-spec{margin-top:6px}
@media (min-width:1100px){.d-aerden .a-team[data-n="6"]{grid-template-columns:repeat(6,1fr)}}
.d-aerden .a-intro-copy h2.is-long{font-size:clamp(28px,3.2vw,46px)}
.d-aerden .a-intro-grid.is-solo{grid-template-columns:minmax(0,1fr)}
.d-aerden .a-contact dd span{display:block}
.d-aerden .a-contact dt{color:var(--acc)}
@media (min-width:1000px){.d-aerden .a-intro-grid.is-solo .a-contact{grid-template-columns:repeat(3,minmax(0,1fr));gap:18px 40px}}
.d-aerden .a-form-head span:last-child{text-align:right}
.d-aerden .a-hours{border-top:1px solid var(--ink)}
.d-aerden .a-hours div{display:flex;flex-wrap:wrap;justify-content:space-between;gap:2px 16px;padding:12px 0;border-bottom:1px solid var(--line)}
.d-aerden .a-hours dt{font-size:18px}
.d-aerden .a-hours dd{font-family:var(--a-sans),system-ui,sans-serif;font-size:14.5px;font-variant-numeric:tabular-nums;color:var(--soft)}
.d-aerden .a-hours-grid{display:grid;gap:40px}
@media (min-width:900px){.d-aerden .a-hours-grid{grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:clamp(36px,5vw,84px);align-items:start}.d-aerden .a-hours-grid .a-contact{margin-top:0;grid-template-columns:1fr}}
.d-aerden .a-gal{display:grid;gap:clamp(12px,1.6vw,22px);grid-template-columns:repeat(2,minmax(0,1fr))}
.d-aerden .a-gal .a-duo{aspect-ratio:4/3}
.d-aerden .a-gal[data-n="1"]{grid-template-columns:minmax(0,1fr)}
.d-aerden .a-gal[data-n="1"] .a-duo{aspect-ratio:16/9}
.d-aerden .a-gal.is-odd figure:first-child{grid-column:1/-1}
.d-aerden .a-gal.is-odd figure:first-child .a-duo{aspect-ratio:16/9}
@media (min-width:900px){.d-aerden .a-gal{grid-template-columns:repeat(3,minmax(0,1fr))}.d-aerden .a-gal[data-n="2"],.d-aerden .a-gal[data-n="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}.d-aerden .a-gal.is-odd figure:first-child{grid-column:auto}.d-aerden .a-gal.is-odd figure:first-child .a-duo{aspect-ratio:4/3}.d-aerden .a-gal[data-n="5"] figure:first-child,.d-aerden .a-gal[data-n="7"] figure:first-child,.d-aerden .a-gal[data-n="7"] figure:last-child,.d-aerden .a-gal[data-n="8"] figure:first-child{grid-column:span 2}.d-aerden .a-gal[data-n="5"] figure:first-child .a-duo,.d-aerden .a-gal[data-n="7"] figure:first-child .a-duo,.d-aerden .a-gal[data-n="7"] figure:last-child .a-duo,.d-aerden .a-gal[data-n="8"] figure:first-child .a-duo{aspect-ratio:2.72}}
.d-aerden .a-band h2{max-width:19ch;font-size:clamp(33px,5vw,76px);font-style:italic;line-height:1.06;letter-spacing:-.025em;text-wrap:balance}
.d-aerden .a-band h2 em{color:var(--brass)}
.d-aerden .a-band h2.is-m{max-width:24ch;font-size:clamp(29px,3.8vw,58px)}
.d-aerden .a-band h2.is-s{max-width:30ch;font-size:clamp(25px,3vw,44px);line-height:1.14}
.d-aerden .a-band.no-pic{min-height:0}
.d-aerden .a-band.no-pic .a-band-in{padding-top:clamp(80px,9vw,140px)}
.d-aerden .a-band-mark{position:absolute;right:max(-2vw,calc(50vw - 760px));top:50%;z-index:1;font-size:min(70vw,620px);font-style:italic;line-height:.8;color:transparent;-webkit-text-stroke:1px rgba(199,168,115,.3);transform:translateY(-50%);pointer-events:none;user-select:none}
.d-aerden .a-cta-sec{padding-block:var(--sp)}
.d-aerden .a-cta h2{font-size:clamp(30px,3.6vw,54px);font-style:italic;line-height:1.06;text-wrap:balance}
.d-aerden .a-cta h2 em{color:var(--ox)}
.d-aerden .a-cta h2+p{margin-top:16px}
.d-aerden .a-cta .a-cta-act{max-width:none}
@media (min-width:900px){.d-aerden .a-cta .a-cta-act{justify-self:end}}
.d-aerden .a-zhead{max-width:none;gap:0}
.d-aerden .a-zhead .a-sec-head{margin:26px 0 0}
.d-aerden .z-sec h3{font-weight:400}
.d-aerden .z-card{border-color:var(--line)}
.d-aerden .z-tag,.d-aerden .z-field label,.d-aerden .form-note{font-family:var(--a-sans),system-ui,sans-serif}
.d-aerden .z-form{gap:30px}
.d-aerden .z-fields{gap:20px 26px}
.d-aerden .z-field{display:flex;flex-direction:column-reverse;justify-content:flex-end;gap:8px}
.d-aerden .z-field label{font-size:12.5px;letter-spacing:0;text-transform:none;color:var(--soft)}
.d-aerden .z-field input,.d-aerden .z-field select,.d-aerden .z-field textarea{min-height:48px;padding:10px 0;border-width:0 0 1px;border-color:var(--ink);background-color:transparent;color:var(--ink);font-family:var(--a-serif),Georgia,serif;font-size:18px;color-scheme:light}
.d-aerden .z-field select{padding-right:22px;background-image:${CARET};background-position:calc(100% - 11px) 55%,calc(100% - 5px) 55%;background-size:6px 6px;background-repeat:no-repeat}
.d-aerden .z-field textarea{min-height:96px}
.d-aerden .z-field :focus-visible{outline:none;border-color:var(--ox);box-shadow:0 1px 0 var(--ox)}
.d-aerden .z-form .btn{min-height:54px}
.d-aerden .form-note{font-size:13px;line-height:1.5;color:var(--soft)}
.d-aerden .form-status{border:0;border-left:2px solid var(--ox);background:rgba(124,34,40,.07);font-weight:500}
.d-aerden .z-acc summary{font-family:var(--a-serif),Georgia,serif;font-size:clamp(21px,2vw,28px);line-height:1.2}
.d-aerden .z-quotes blockquote>p{font-style:italic}
.d-aerden .z-cta h2,.d-aerden .z-statement h2{font-style:italic}
.d-aerden .z-rows small,.d-aerden .z-steps small{font-family:var(--a-serif),Georgia,serif;font-size:20px;font-style:italic;letter-spacing:0}
.d-aerden .z-ico{border-color:var(--line)}
.d-aerden .a-foot-mark{font-size:min(clamp(46px,9.4vw,150px),calc((min(100vw,1400px) - 2 * var(--pad)) / (var(--w,8) * .6)),calc((min(100vw,1400px) - 2 * var(--pad)) * 1.7 / (var(--n,12) * .52)))}
@media (min-width:1000px){.d-aerden .a-foot-top.is-long{grid-template-columns:minmax(0,1fr)}.d-aerden .a-foot-top:not(.is-long) .a-foot-mark{font-size:min(9.4vw,150px,calc((min(100vw,1400px) - 2 * var(--pad) - 420px) / (var(--w,8) * .6)))}}
.d-aerden .a-foot-grid nav a,.d-aerden .a-foot-grid div>a{min-height:40px}
.d-aerden .a-foot-grid dt{padding-right:8px}
.d-aerden .a-colofon a{text-decoration:underline}
@media (min-width:1000px){.d-aerden .a-colofon{grid-template-columns:auto minmax(0,1fr)}.d-aerden .a-colofon span:nth-child(2){text-align:right}}
`
  .replace(/\n/g, "")
  .trim();

/* ── Bookkeeping shared by the parts of one page: chapter numbers, tones, figure numbers ── */

const BANDS: SiteSection["type"][] = ["statement", "cta"];
const DARK: SiteSection["type"][] = ["process", "booking", "contact"];
/** Types left to the kit: they sit on the page colour. */
const KIT: SiteSection["type"][] = ["menu", "order", "beforeafter"];

type State = { num: number[]; tone: string[]; fig: number };
const STATE = new WeakMap<Ctx, State>();

const realKeys = (c: Ctx) => new Set(c.spec.images.filter((im) => im.license !== "generated" && /^https:\/\//.test(im.src)).map((im) => im.key));

/** Whether a section renders at all (galleries and before/after need real photographs). */
function shows(s: SiteSection, keys: Set<string>) {
  if (s.type === "gallery") return s.images.some((r) => keys.has(r));
  if (s.type === "beforeafter") return s.pairs.some((p) => keys.has(p.before) && keys.has(p.after));
  return true;
}

function state(c: Ctx): State {
  let st = STATE.get(c);
  if (st) return st;
  const keys = realKeys(c);
  const num: number[] = [];
  const tone: string[] = [];
  let n = 0;
  let prev = "";
  c.spec.sections.forEach((s, k) => {
    const on = shows(s, keys);
    num[k] = on && !BANDS.includes(s.type) ? ++n : 0;
    if (!on) {
      tone[k] = "";
      return;
    }
    let t: string;
    if (s.type === "statement") t = "band";
    else if (KIT.includes(s.type)) t = "";
    else if (DARK.includes(s.type)) t = prev === "a-dark" || prev === "band" ? "a-paper" : "a-dark";
    else t = prev === "" ? "a-paper" : "";
    tone[k] = t;
    prev = t;
  });
  st = { num, tone, fig: 0 };
  STATE.set(c, st);
  return st;
}

const indexOf = (c: Ctx, id: string) => c.spec.sections.findIndex((s) => s.id === id);
const numOf = (c: Ctx, id: string) => state(c).num[indexOf(c, id)] ?? 0;
const nextFig = (c: Ctx) => ++state(c).fig;
const pad = (n: number) => String(n).padStart(2, "0");
const plain = (t: string) => t.replace(/\*/g, "");

/** Navigation without sections that will not render (a gallery without photographs). */
function navOf(c: Ctx) {
  const keys = realKeys(c);
  return c.nav.filter((n) => {
    const s = c.spec.sections.find((x) => x.id === n.id);
    return s ? shows(s, keys) : false;
  });
}

/** Headings of the design end in italics: a marked phrase, or else what follows the first comma or colon. */
function accent(t: string): ReactNode {
  if (t.includes("*")) return em(t);
  const m = t.match(/^(.{8,}?[,:;–—])\s+(.{5,})$/);
  return m ? (
    <>
      {m[1]} <em>{m[2]}</em>
    </>
  ) : (
    t
  );
}

/** The name as a letterhead: the profession under the name when the name carries one. */
function logoParts(c: Ctx): [string, string | null] {
  const words = c.name.split(/\s+/).filter(Boolean);
  if (words.length >= 3) return [words.slice(0, -1).join(" "), words[words.length - 1]];
  const city = c.spec.business.city;
  return [c.name, city && c.name.length <= 26 ? city : null];
}

const longest = (t: string) => Math.max(4, ...plain(t).split(/\s+/).map((w) => w.length));

function Margin({ n, label, note }: { n: number; label: string; note?: string }) {
  return (
    <div className="a-margin">
      <p className="a-par" data-rv>
        <b>§ {n}</b>
        <span>{label}</span>
      </p>
      {note ? <p className="a-note is-on">{note}</p> : null}
    </div>
  );
}

type ChapterProps = {
  s: SiteSection;
  c: Ctx;
  n: number;
  title?: string;
  intro?: string;
  note?: string;
  head?: boolean;
  className?: string;
  bodyClass?: string;
  after?: ReactNode;
  children?: ReactNode;
};

/** A chapter of the document: paragraph sign and label in the margin, the text beside a ruled line. */
function Chapter({ s, c, n, title, intro, note, head = true, className = "", bodyClass = "", after, children }: ChapterProps) {
  const st = state(c);
  const tone = st.tone[n] && st.tone[n] !== "band" ? ` ${st.tone[n]}` : "";
  const t = title ?? s.title;
  return (
    <section className={`a-sec${tone}${className ? ` ${className}` : ""}`} id={s.id}>
      <div className="a-grid">
        <Margin n={st.num[n] || n + 1} label={c.t.kick[s.type] || plain(s.title)} note={note} />
        <div className={`a-body${bodyClass ? ` ${bodyClass}` : ""}`}>
          {head ? (
            <header className={`a-sec-head${intro ? "" : " is-solo"}`}>
              <h2 className={long(t)} data-rv>
                {accent(t)}
              </h2>
              {intro ? (
                <p className="a-intro" data-rv>
                  {intro}
                </p>
              ) : null}
            </header>
          ) : null}
          {children}
        </div>
      </div>
      {after}
    </section>
  );
}

/** A photograph in two inks with its figure number and the photograph's own description. */
function Fig({ c, p, className, sizes, caption = true }: { c: Ctx; p: Photo; className: string; sizes: string; caption?: boolean }) {
  return (
    <figure className={className} data-rv="img">
      <div className="a-duo">
        <Pic p={p} sizes={sizes} />
      </div>
      {caption ? (
        <figcaption>
          <b>Afb. {nextFig(c)}</b>
          {p.alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ContactList({ c, hours }: { c: Ctx; hours: boolean }) {
  const b = c.spec.business;
  const lines = hours ? (b.openingHours ?? []) : [];
  if (!b.phone && !b.email && !b.address && !lines.length) return null;
  return (
    <dl className="a-contact" data-rv>
      {b.phone ? (
        <div>
          <dt>{c.t.phone}</dt>
          <dd>
            <a href={tel(b.phone)}>{b.phone}</a>
          </dd>
        </div>
      ) : null}
      {b.email ? (
        <div>
          <dt>{c.t.email}</dt>
          <dd>
            <a href={`mailto:${b.email}`}>{b.email}</a>
          </dd>
        </div>
      ) : null}
      {b.address ? (
        <div>
          <dt>{c.t.address}</dt>
          <dd>
            <span>{b.address}</span>
            {b.mapsUrl ? (
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                {c.t.route} →
              </a>
            ) : null}
          </dd>
        </div>
      ) : null}
      {lines.length ? (
        <div>
          <dt>{c.t.hours}</dt>
          <dd>
            {lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  const nav = navOf(c);
  const [main, sub] = logoParts(c);
  const open = b.openingHours?.find((l) => !/gesloten|closed|ferm[ée]|geschlossen/i.test(l));
  return (
    <>
      <header className="a-head hdr">
        <div className="a-head-in">
          <a href="#top" className={`a-logo${main.length > 18 ? " is-long" : ""}`} aria-label={c.name}>
            <span>{main}</span>
            {sub ? <small>{sub}</small> : null}
          </a>
          <nav aria-label={c.t.menu} className="a-links" data-nav>
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          {b.phone ? (
            <a href={tel(b.phone)} className="a-head-tel">
              {b.phone}
            </a>
          ) : null}
          <a href={cta.href} className="btn a-btn a-btn-s a-head-cta">
            {cta.label}
          </a>
          <button type="button" className="a-burger menu-btn" aria-expanded="false" aria-controls="a-toc">
            <span data-label data-open={c.t.menu} data-close={c.t.close}>
              {c.t.menu}
            </span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="a-toc" className="a-toc" data-nav inert>
        <p className="a-cap a-toc-h">{c.t.menu}</p>
        <nav aria-label={c.t.menu}>
          {nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <span>{n.label}</span>
              <i aria-hidden="true" />
              <small>§ {numOf(c, n.id)}</small>
            </a>
          ))}
          <a href={cta.href} style={i(nav.length)}>
            <span>{cta.label}</span>
            <i aria-hidden="true" />
            <small>→</small>
          </a>
        </nav>
        <div className="a-toc-foot">
          {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
          {open || b.address || b.city ? (
            <p>
              {open}
              {open && (b.address || b.city) ? <br /> : null}
              {b.address ?? b.city}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Hero(c: Ctx) {
  const { hero } = c.spec;
  const b = c.spec.business;
  const p = c.photo(hero.image);
  const text = plain(hero.headline);
  const { lines, marked } = splitLines(hero.headline, text.length > 56 ? 3 : text.length > 14 ? 2 : 1);
  const size = text.length > 56 ? "is-s" : text.length > 34 ? "is-m" : undefined;
  const facts = heroFacts(c);
  const nav = navOf(c);
  return (
    <section className={`a-hero${facts.length ? "" : " no-facts"}${p ? "" : " no-pic"}`}>
      <div className="a-grid">
        <div className={`a-margin a-hero-facts${facts.length ? "" : " is-empty"}`}>
          {facts.length ? (
            <dl>
              {facts.map((f, k) => (
                <div key={f.label} className="a-fade" style={i(5 + k)}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        <div className="a-body">
          <p className="a-kicker">
            <span className="a-fade" style={i(0)}>
              {hero.eyebrow || c.name}
            </span>
            <i aria-hidden="true" />
            {b.city ? (
              <span className="a-fade" style={i(2)}>
                {b.city}
              </span>
            ) : null}
          </p>
          <h1 className={size} style={css({ "--w": longest(hero.headline) })}>
            {lines.map((line, n) => (
              <span key={n} className="a-fade" style={i(1 + n * 1.4)}>
                {/* Without a marked phrase the last line carries the italic of the design. */}
                {!marked && lines.length > 1 && n === lines.length - 1 ? <em>{line}</em> : line}
              </span>
            ))}
          </h1>
          <div className={`a-hero-row${p || nav.length ? "" : " is-solo"}`}>
            <div className="a-hero-copy">
              <p className="a-lede a-drop a-fade" style={i(4)}>
                {hero.subheadline}
              </p>
              <div className="a-cta a-fade" style={i(5)}>
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
              <figure className="a-hero-fig">
                <div className="a-duo a-unveil">
                  <Pic p={p} eager sizes="(min-width: 1000px) 34vw, 100vw" />
                </div>
                <figcaption className="a-fade" style={i(7)}>
                  <b>Afb. {nextFig(c)}</b>
                  {p.alt}
                </figcaption>
              </figure>
            ) : nav.length ? (
              /* Without a photograph the opening shows what a deed shows first: its contents. */
              <nav className="a-index a-fade" style={i(6)} aria-label={c.t.explore} data-nav>
                <p className="a-cap">{c.t.explore}</p>
                {nav.map((n) => (
                  <a key={n.id} href={`#${n.id}`}>
                    <span>{n.label}</span>
                    <i aria-hidden="true" />
                    <small>§ {numOf(c, n.id)}</small>
                  </a>
                ))}
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const nav = navOf(c);
  const words = c.name.split(/\s+/).filter(Boolean);
  const svc = c.spec.sections.find((s) => s.type === "services");
  return (
    <footer className="a-foot">
      <div className="a-foot-in">
        <div className={`a-foot-top${longest(c.name) > 13 || c.name.length > 26 ? " is-long" : ""}`}>
          <p className="a-foot-mark" style={css({ "--w": longest(c.name), "--n": Math.max(8, c.name.length) })}>
            {words.length > 1 ? (
              <>
                {words.slice(0, -1).join(" ")} <em>{words[words.length - 1]}</em>
              </>
            ) : (
              c.name
            )}
          </p>
          {c.spec.footer.blurb ? <p className="a-foot-line">{c.spec.footer.blurb}</p> : null}
        </div>
        <div className="a-foot-grid">
          {nav.length ? (
            <nav aria-label={c.t.explore} data-nav>
              <h3>{c.t.explore}</h3>
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`}>
                  {n.label}
                </a>
              ))}
            </nav>
          ) : null}
          {svc && svc.type === "services" ? (
            <nav aria-label={c.t.kick.services} data-nav>
              <h3>{c.t.kick.services}</h3>
              {svc.items.slice(0, 6).map((it) => (
                <a key={it.title} href={`#${svc.id}`}>
                  {it.title}
                </a>
              ))}
            </nav>
          ) : null}
          <div>
            <h3>{c.t.contact}</h3>
            {b.address ? <p>{b.address}</p> : null}
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
              <dl>
                {hoursRows(b.openingHours).map(([day, time], n) => (
                  <div key={n}>
                    <dt>{day}</dt>
                    <dd>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>
        <Legal c={c} className="a-colofon" />
      </div>
    </footer>
  );
}

/** Heading of the sections the kit draws: the same paragraph sign and chapter head. */
function Head(p: HeadProps, c: Ctx) {
  const k = c.spec.sections.findIndex((s) => s.title === p.title);
  const n = k >= 0 ? state(c).num[k] : 0;
  return (
    <header className="z-head a-zhead">
      {n ? (
        <p className="a-par" data-rv>
          <b>§ {n}</b>
          <span>{p.kicker}</span>
        </p>
      ) : null}
      <div className={`a-sec-head${p.intro ? "" : " is-solo"}`}>
        <h2 id={p.id} className={long(p.title)} data-rv>
          {accent(p.title)}
        </h2>
        {p.intro ? (
          <p className="a-intro" data-rv>
            {p.intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}

export const aerden: Family = {
  key: "aerden",
  root: "d-aerden",
  fonts: ["Newsreader", "IBM Plex Sans"],
  themeColor: "#ece6da",
  accent: "#7c2228",
  onAccent: "#f6f2e9",
  css: CSS,
  extra: EXTRA,
  cls: { wrap: "a-wide", eyebrow: "a-cap a-acc-c", btn: "a-btn", btnAlt: "a-btn a-btn-line", btnText: "a-link" },
  Header,
  Hero,
  Footer,
  Head,
  sections: {
    about: (s, c, n) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <Chapter s={s} c={c} n={n}>
          <article className={`a-lead${p ? "" : " is-solo"}`}>
            {p ? <Fig c={c} p={p} className="a-lead-fig" sizes="(min-width: 1000px) 28vw, 100vw" /> : null}
            <div className="a-lead-copy">
              <p className="a-lede a-drop" data-rv>
                {first}
              </p>
              {rest.length ? (
                <div className="a-cols" data-rv>
                  {rest.map((x, k) => (
                    <p key={k}>{x}</p>
                  ))}
                </div>
              ) : null}
              {s.highlights.length ? (
                <ol className="a-after" data-rv>
                  {s.highlights.map((h, k) => (
                    <li key={h}>
                      <b>{k + 1}</b>
                      <span>{h}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          </article>
        </Chapter>
      );
    },
    services: (s, c, n) => {
      const cta = c.spec.hero.primaryCta;
      return (
        <Chapter s={s} c={c} n={n} intro={s.intro}>
          <div className="a-acc" data-acc>
            {s.items.map((it, k) => {
              const p = c.photo(`art:svc${k}`);
              const meta = [it.duration, it.price].filter((x): x is string => Boolean(x));
              return (
                <details key={k} className="a-art" open={k === 0} data-rv style={i(k % 6)}>
                  <summary>
                    <span className="a-art-n">Art. {pad(k + 1)}</span>
                    <span className={`a-art-t${long(it.title) ? " is-long" : ""}`}>{it.title}</span>
                    <span className="a-art-s">{meta.join(" · ")}</span>
                    <i className="a-plus" aria-hidden="true" />
                  </summary>
                  <div className={`a-art-p${p ? " has-pic" : ""}`}>
                    <div className="a-art-text" style={i(0)}>
                      <p>{it.description}</p>
                      {meta.length ? (
                        <ul className="a-art-work">
                          {meta.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      ) : null}
                      <a href={cta.href} className="a-link">
                        {cta.label}
                      </a>
                    </div>
                    {p ? (
                      <div className="a-art-fig" style={i(1)}>
                        <span className="a-duo">
                          <Pic p={p} sizes="(min-width: 760px) 24vw, 90vw" />
                        </span>
                      </div>
                    ) : null}
                  </div>
                </details>
              );
            })}
          </div>
        </Chapter>
      );
    },
    features: (s, c, n) => {
      const no = state(c).num[n];
      return (
        <Chapter s={s} c={c} n={n} intro={s.intro}>
          <ol className="a-notes">
            {s.items.map((it, k) => (
              <li key={k} data-rv style={i(k % 2)}>
                <article>
                  <header>
                    <p className="a-cap">
                      <b>
                        {no}.{k + 1}
                      </b>
                    </p>
                    <h3>{it.title}</h3>
                  </header>
                  <p className="a-txt">{it.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </Chapter>
      );
    },
    process: (s, c, n) => {
      const no = state(c).num[n];
      return (
        <Chapter s={s} c={c} n={n} intro={s.intro}>
          <ol className="a-steps" data-n={s.steps.length}>
            {s.steps.map((st, k) => (
              <li key={k} data-rv style={i(k % 4)}>
                <span className="a-rule" aria-hidden="true">
                  <i />
                </span>
                <span className="a-cap a-acc-c">
                  {no}.{k + 1}
                </span>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </li>
            ))}
          </ol>
        </Chapter>
      );
    },
    testimonials: (s, c, n) => (
      <Chapter s={s} c={c} n={n}>
        <ol className="a-notes">
          {s.items.map((q, k) => (
            <li key={k} data-rv style={i(k % 2)}>
              <blockquote>
                <p>“{q.quote}”</p>
                <footer className="a-cap">
                  <b>{q.author}</b>
                  <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {c.t.source}: {q.source}
                  </a>
                </footer>
              </blockquote>
            </li>
          ))}
        </ol>
      </Chapter>
    ),
    team: (s, c, n) => (
      <Chapter
        s={s}
        c={c}
        n={n}
        intro={s.intro}
        className="is-team"
        after={
          <div className="a-wide">
            <ol className="a-team" data-n={s.members.length}>
              {s.members.map((m, k) => {
                const p = c.photo(m.image);
                return (
                  <li key={k} data-rv style={i(k % 5)}>
                    <div className={`a-person${p ? "" : " no-pic"}`}>
                      <span className="a-person-n" aria-hidden="true">
                        {pad(k + 1)}
                      </span>
                      {p ? (
                        <span className="a-duo a-person-img">
                          <Pic p={p} sizes="(min-width: 1100px) 18vw, (min-width: 700px) 30vw, 104px" />
                        </span>
                      ) : null}
                      <span className="a-person-txt">
                        <span className="a-cap a-acc-c">{m.role}</span>
                        <b>{m.name}</b>
                        {m.bio ? <span className="a-person-spec">{m.bio}</span> : null}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        }
      />
    ),
    packages: (s, c, n) => {
      const p = c.spare();
      return (
        <Chapter s={s} c={c} n={n} intro={s.intro}>
          <div className={`a-fees is-first${p ? "" : " is-solo"}`}>
            {p ? <Fig c={c} p={p} className="a-fees-fig" sizes="(min-width: 1100px) 30vw, 100vw" /> : null}
            <div className="a-fees-copy">
              <dl data-rv>
                {s.items.map((it, k) => (
                  <div key={k}>
                    <dt>
                      {it.name}
                      {it.featured ? <span className="a-tag">{c.t.popular}</span> : null}
                    </dt>
                    <dd>
                      <p>
                        {it.price ? <b>{it.price}</b> : <i>{c.t.onRequest}</i>}
                        {it.price && it.unit ? <span className="a-unit">{it.unit}</span> : null}
                      </p>
                      {it.description ? <p>{it.description}</p> : null}
                      {it.features.length ? (
                        <ul className="a-art-work">
                          {it.features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
              {s.note ? (
                <p className="a-small" data-rv>
                  {s.note}
                </p>
              ) : null}
            </div>
          </div>
        </Chapter>
      );
    },
    gallery: (s, c, n) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      return (
        <Chapter s={s} c={c} n={n}>
          <div className={`a-gal${pics.length % 2 && pics.length > 1 ? " is-odd" : ""}`} data-n={pics.length}>
            {pics.map((p, k) => (
              <Fig key={k} c={c} p={p} className="a-gal-fig" sizes="(min-width: 900px) 30vw, 50vw" caption={false} />
            ))}
          </div>
        </Chapter>
      );
    },
    showcase: (s, c, n) => {
      const p = c.photo(s.image);
      return (
        <Chapter s={s} c={c} n={n} head={false}>
          <article className={`a-lead${p ? "" : " is-solo"}`}>
            {p ? <Fig c={c} p={p} className="a-lead-fig" sizes="(min-width: 1000px) 28vw, 100vw" /> : null}
            <div className="a-lead-copy">
              <h2 className={long(s.title)} data-rv>
                {accent(s.title)}
              </h2>
              {s.body ? (
                <p className="a-lede a-drop" data-rv>
                  {s.body}
                </p>
              ) : null}
              {s.cta ? (
                <p data-rv>
                  <Btn c={c} href={s.cta.href} variant="alt">
                    {s.cta.label}
                  </Btn>
                </p>
              ) : null}
            </div>
          </article>
        </Chapter>
      );
    },
    statement: (s, c) => {
      const p = c.spare();
      const len = plain(s.title).length;
      const size = len > 130 ? "is-s" : len > 70 ? "is-m" : undefined;
      return (
        <section className={`a-band${p ? "" : " no-pic"}`} id={s.id}>
          {p ? (
            <div className="a-band-img a-duo" data-px>
              <Pic p={p} sizes="100vw" />
            </div>
          ) : (
            <span className="a-band-mark" aria-hidden="true">
              §
            </span>
          )}
          <div className="a-band-in">
            <h2 className={size} data-rv>
              {accent(s.title)}
            </h2>
            {s.note ? (
              <footer data-rv style={i(2)}>
                <span className="a-rule" aria-hidden="true">
                  <i />
                </span>
                {s.note}
              </footer>
            ) : null}
          </div>
        </section>
      );
    },
    cta: (s, c, n) => {
      const tone = state(c).tone[n];
      return (
        <section className={`a-cta-sec${tone ? ` ${tone}` : ""}`} id={s.id}>
          <div className="a-wide">
            <div className="a-letter a-cta" data-rv>
              <div>
                <h2>{accent(s.title)}</h2>
                {s.body ? <p>{s.body}</p> : null}
              </div>
              <p className="a-cta-act">
                <Btn c={c} href={s.cta.href}>
                  {s.cta.label}
                </Btn>
              </p>
            </div>
          </div>
        </section>
      );
    },
    faq: (s, c, n) => {
      const no = state(c).num[n];
      return (
        <Chapter s={s} c={c} n={n}>
          <ol className="a-pubs" data-acc>
            {s.items.map((it, k) => (
              <li key={k} data-rv style={i(k % 4)}>
                <details>
                  <summary>
                    <span className="a-pub-date">
                      {no}.{k + 1}
                    </span>
                    <span className="a-pub-main">
                      <span className="a-pub-title">{it.q}</span>
                    </span>
                    <i className="a-plus" aria-hidden="true" />
                  </summary>
                  <div className="a-pub-p">
                    <p>{it.a}</p>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </Chapter>
      );
    },
    hours: (s, c, n) => {
      const has = Boolean(c.spec.business.openingHours?.length);
      return (
        <Chapter s={s} c={c} n={n} intro={s.note || undefined}>
          <div className="a-hours-grid">
            {has ? (
              <Hours c={c} className="a-hours" />
            ) : (
              <p className="a-small" data-rv>
                {c.t.hoursTbc}
              </p>
            )}
            <ContactList c={c} hours={false} />
          </div>
        </Chapter>
      );
    },
    booking: (s, c, n) => {
      const p = c.spare();
      const hasHours = c.spec.sections.some((x) => x.type === "hours");
      return (
        <Chapter s={s} c={c} n={n} head={false} bodyClass="a-intro-grid">
          <div className="a-intro-copy">
            <h2 className={long(s.title)} data-rv>
              {accent(s.title)}
            </h2>
            {s.body ? (
              <p className="a-intro" data-rv>
                {s.body}
              </p>
            ) : null}
            {p ? (
              <figure className="a-intro-fig">
                <div className="a-duo">
                  <Pic p={p} sizes="(min-width: 1000px) 30vw, 100vw" />
                </div>
              </figure>
            ) : null}
            <ContactList c={c} hours={!hasHours} />
          </div>
          <div className="a-form-card" data-rv>
            <p className="a-form-head">
              <span className="a-cap">{c.t.kick.booking}</span>
              <span className="a-cap">{c.name}</span>
            </p>
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </div>
        </Chapter>
      );
    },
    contact: (s, c, n) => {
      const hasHours = c.spec.sections.some((x) => x.type === "hours" || x.type === "booking");
      const lines = c.spec.business.openingHours ?? [];
      const side = s.showForm ? (
        <div className="a-form-card" data-rv>
          <p className="a-form-head">
            <span className="a-cap">{c.t.contact}</span>
            <span className="a-cap">{c.name}</span>
          </p>
          <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
        </div>
      ) : !hasHours && lines.length ? (
        <div>
          <Hours c={c} className="a-hours" />
        </div>
      ) : null;
      return (
        <Chapter s={s} c={c} n={n} head={false} bodyClass={`a-intro-grid${side ? "" : " is-solo"}`}>
          <div className="a-intro-copy">
            <h2 className={long(s.title)} data-rv>
              {accent(s.title)}
            </h2>
            {s.body ? (
              <p className="a-intro" data-rv>
                {s.body}
              </p>
            ) : null}
            <ContactList c={c} hours={!hasHours && Boolean(s.showForm)} />
          </div>
          {side}
        </Chapter>
      );
    },
  },
};
