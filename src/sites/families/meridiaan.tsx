import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { CSS } from "./css/real-estate";
import { Btn, css, DemoForm, em, hoursRows, i, Icon, Legal, long, Pic, splitLines, tel, type Ctx, type Family, type HeadProps, type Photo } from "./kit";

/**
 * Meridiaan (demo: /demos/real-estate). Parchment and deep green, a Playfair serif with italic
 * brass accents, hairline rules and photographs that run off the page. Made for estate agencies,
 * interior designers and garden designers: the services take the look of the demo's listings,
 * the facts of the business take the place of its search bar and specification card.
 */

const CARET = (stroke: string) => `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%23${stroke}' stroke-width='1.3'/%3E%3C/svg%3E")`;

const EXTRA = `
.d-meridiaan{--m-display:"Playfair Display";--m-text:"Manrope";--z-bg2:var(--ivory);--z-ink:var(--fg);--z-dim:var(--dim);--z-line:var(--rule);--z-accent:var(--accent);--z-on-accent:var(--ivory);--z-display:var(--m-display),Georgia,serif;--z-radius:0;--z-ico-radius:0;--z-field-radius:0;--z-sec:clamp(72px,8.8vw,148px);--z-h3:clamp(24px,2.1vw,34px);--z-statement:clamp(28px,3.5vw,60px)}
.d-meridiaan .m-dark,.d-meridiaan .m-sheetcard{--z-ink:var(--fg);--z-dim:var(--dim);--z-line:var(--rule);--z-accent:var(--accent)}
.d-meridiaan .m-dark{--z-bg2:var(--moss);--z-on-accent:var(--green)}
.d-meridiaan h2.is-long{font-size:clamp(30px,3.7vw,62px);line-height:1.08}
.d-meridiaan .m-statement.is-long{font-size:clamp(26px,3vw,50px)}
.d-meridiaan .z-copy .m-head,.d-meridiaan .z-narrow .m-head{grid-template-columns:minmax(0,1fr)}
.d-meridiaan .z-copy h2{font-size:clamp(32px,3.8vw,64px)}
.d-meridiaan .m-ti{background:var(--ivory)}
.d-meridiaan .m-tp+.m-tp,.d-meridiaan .m-ti+.m-ti,.d-meridiaan .m-tp+.z-sec,.d-meridiaan .z-sec+.m-tp,.d-meridiaan .z-sec+.z-sec,.d-meridiaan .m-feature+.m-hoods{padding-top:0}
.d-meridiaan .m-nav{gap:clamp(12px,2vw,30px)}
.d-meridiaan .m-logo{min-width:0;max-width:min(64vw,360px)}
.d-meridiaan .m-logo>span{min-width:0}
.d-meridiaan .m-logo b{overflow:hidden;font-weight:400;text-overflow:ellipsis;white-space:nowrap}
.d-meridiaan .m-logo.is-long>span{font-size:18px}
.d-meridiaan .m-logo.is-xl>span{font-size:15.5px;line-height:1.14}
.d-meridiaan .m-logo.is-xl b{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;white-space:normal}
.d-meridiaan .m-logo.is-xl small{display:none}
.d-meridiaan .m-mono{flex:none;display:grid;place-items:center;width:32px;height:32px;border:1px solid var(--brass);border-radius:50%;font-family:var(--m-display),Georgia,serif;font-size:17px;font-style:italic;line-height:1}
.d-meridiaan .m-links{flex:0 1 auto;flex-wrap:wrap;justify-content:flex-end;max-height:44px;overflow:hidden;white-space:nowrap}
.d-meridiaan .m-nav-cta{flex:none;white-space:nowrap}
.d-meridiaan .m-menu nav a{font-size:clamp(26px,7.6vw,44px)}
.d-meridiaan .m-menu-end{display:grid;gap:22px;justify-items:start}
.d-meridiaan .m-menu-foot a{display:inline-flex;align-items:center;min-height:40px}
.d-meridiaan .m-hero h1{font-size:min(clamp(44px,14.2vw,72px),calc((100vw - 2 * var(--pad)) / (var(--w,8) * .6)))}
.d-meridiaan .m-hero h1.is-m{font-size:min(clamp(36px,10.4vw,58px),calc((100vw - 2 * var(--pad)) / (var(--w,8) * .6)));line-height:1.02}
.d-meridiaan .m-hero h1.is-s{font-size:min(clamp(31px,8.4vw,46px),calc((100vw - 2 * var(--pad)) / (var(--w,8) * .6)));line-height:1.06}
.d-meridiaan .m-bar .m-search-field b{font-size:16.5px;font-weight:600;line-height:1.35;overflow-wrap:anywhere}
.d-meridiaan .m-bar .m-search-field b a{display:inline-flex;align-items:center;min-height:44px;margin:-10px 0}
.d-meridiaan .m-search.m-bar{grid-template-columns:minmax(0,1fr)}
.d-meridiaan .m-bar .m-search-go{padding-block:12px;line-height:1.45;text-align:center;white-space:normal}
.d-meridiaan .m-hero-cta{display:flex;flex-wrap:wrap;align-items:center;gap:14px 28px}
.d-meridiaan .m-hero.no-foot .m-hero-search{margin-bottom:clamp(34px,5vw,60px)}
.d-meridiaan .m-hero.no-pic{background:radial-gradient(110% 80% at 100% 0%,var(--moss),transparent 64%),var(--green)}
.d-meridiaan .m-hero.no-pic .m-hero-in{margin-top:0;padding-top:clamp(140px,26vh,210px)}
.d-meridiaan .m-hero-mark{position:absolute;right:-5vw;top:56px;font-family:var(--m-display),Georgia,serif;font-size:min(100vw,560px);font-style:italic;line-height:.8;color:transparent;-webkit-text-stroke:1px rgba(185,150,88,.46);pointer-events:none;user-select:none;animation:m-fade 1.8s var(--ease) both}
.d-meridiaan .m-bar .m-search-go svg{flex:none}
@media (min-width:760px){.d-meridiaan .m-search.m-bar{grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}.d-meridiaan .m-bar .m-search-field:first-child{border-left:0}.d-meridiaan .m-bar .m-search-go{grid-column:1 / -1;min-height:60px}}
@media (min-width:1000px){.d-meridiaan .m-search.m-bar{grid-template-columns:repeat(var(--n,3),minmax(0,1fr)) auto}.d-meridiaan .m-bar .m-search-go{grid-column:auto;max-width:280px;min-height:82px}}
@media (min-width:1000px){.d-meridiaan .m-hero h1{font-size:clamp(64px,7.1vw,136px)}.d-meridiaan .m-hero h1.is-m{font-size:clamp(52px,5.3vw,104px);line-height:1}.d-meridiaan .m-hero h1.is-s{font-size:clamp(42px,4vw,78px);line-height:1.04}.d-meridiaan .m-hero.no-pic{min-height:min(100svh,920px)}.d-meridiaan .m-hero.no-pic .m-hero-in{padding-top:132px}.d-meridiaan .m-hero-mark{right:4vw;top:50%;font-size:min(50vw,780px);translate:0 -52%}.d-meridiaan .m-hero.no-pic::before{content:"";position:absolute;left:42%;top:0;bottom:0;width:1px;background:linear-gradient(180deg,var(--brass),rgba(185,150,88,0));opacity:.6;transform-origin:top;animation:m-draw 1.8s var(--ease) .5s both}}
.d-meridiaan .m-about,.d-meridiaan .m-say{padding-bottom:clamp(72px,8.8vw,148px)}
.d-meridiaan .m-about-body{display:grid;gap:30px;margin-top:clamp(8px,1.4vw,22px)}
.d-meridiaan .m-about-pic{aspect-ratio:5 / 4;margin-inline:calc(var(--pad) * -1);overflow:hidden;background:var(--moss)}
.d-meridiaan .m-about-pic img{width:100%;height:116%;object-fit:cover;transform:translateY(calc(-7% + var(--p,0) * -6%))}
.d-meridiaan .m-about-copy{display:grid;gap:18px;align-content:start;max-width:64ch}
.d-meridiaan .m-about-copy p{color:var(--mute)}
.d-meridiaan .m-about-copy .m-big{max-width:none;color:var(--ink)}
.d-meridiaan .m-figures b{font-size:clamp(40px,4vw,68px)}
.d-meridiaan .m-figures span{max-width:28ch;font-size:16px;font-weight:600;color:var(--ink)}
@media (min-width:900px){.d-meridiaan .m-about-body{grid-column:2}.d-meridiaan .m-about-body.has-pic{grid-template-columns:minmax(0,5fr) minmax(0,6fr);column-gap:clamp(30px,4.4vw,80px);align-items:end}.d-meridiaan .m-about-pic{aspect-ratio:4 / 5;margin-inline:0}.d-meridiaan .m-figures{grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}}
.d-meridiaan .m-home{animation:none}
.d-meridiaan .m-home-open{cursor:default}
.demo-js .d-meridiaan .m-home-media[data-rv] img{transition:clip-path 1.4s var(--ease),scale 2s var(--ease),transform 1.6s var(--ease)}
.d-meridiaan .m-home h3{overflow-wrap:break-word}
.d-meridiaan .m-home-kind{margin-bottom:2px}
.d-meridiaan .m-homes.no-pic{row-gap:clamp(34px,4vw,60px)}
.d-meridiaan .m-homes.no-pic .m-home{border-top:1px solid var(--ink)}
.d-meridiaan .m-points{display:grid;gap:clamp(34px,4vw,60px) clamp(24px,3.4vw,60px)}
.d-meridiaan .m-points li{display:grid;gap:12px;align-content:start;padding-top:24px;border-top:1px solid var(--ink)}
.d-meridiaan .m-points-ico{color:var(--brass-ink)}
.d-meridiaan .m-points-ico svg{display:block;width:30px;height:30px;stroke-width:1.2}
.d-meridiaan .m-points h3{font-size:clamp(25px,2.2vw,36px);line-height:1.1}
.d-meridiaan .m-points p{max-width:46ch;font-size:15.5px;color:var(--mute)}
@media (min-width:620px){.d-meridiaan .m-points{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){.d-meridiaan .m-points{grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}}
.d-meridiaan .m-path{display:grid;gap:34px}
.d-meridiaan .m-path-list{border-top:1px solid var(--line-d)}
.d-meridiaan .m-path-list li{display:grid;grid-template-columns:38px minmax(0,1fr);align-items:baseline;padding:18px 0 22px;border-bottom:1px solid var(--line-d)}
.d-meridiaan .m-path-list small{font-size:10.5px;font-weight:600;letter-spacing:.12em;color:var(--brass)}
.d-meridiaan .m-path-list h3{font-size:clamp(26px,2.7vw,44px);line-height:1.12}
.d-meridiaan .m-path-list p{max-width:48ch;margin-top:8px;font-size:15.5px;color:var(--soft)}
.d-meridiaan .m-path-pic{order:-1;aspect-ratio:4 / 3;margin-inline:calc(var(--pad) * -1);overflow:hidden;background:var(--moss)}
.d-meridiaan .m-path-pic img{width:100%;height:114%;object-fit:cover;transform:translateY(calc(-6% + var(--p,0) * -5%))}
@media (min-width:1000px){.d-meridiaan .m-path.has-pic{grid-template-columns:minmax(0,4.6fr) minmax(0,7.4fr);column-gap:clamp(40px,6vw,120px);align-items:start}.d-meridiaan .m-path-pic{position:sticky;top:96px;order:0;aspect-ratio:3 / 2;margin-inline:0 calc(var(--pad) * -1)}.d-meridiaan .m-path:not(.has-pic) .m-path-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:clamp(40px,6vw,120px)}}
.d-meridiaan .m-shots{padding:clamp(72px,8.8vw,148px) 0}
.d-meridiaan .m-shots-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(8px,1.2vw,20px)}
.d-meridiaan .m-shots-grid figure{aspect-ratio:4 / 5;overflow:hidden;background:var(--moss)}
.d-meridiaan .m-shots-grid .is-m1{grid-column:1 / -1;aspect-ratio:3 / 2}
.d-meridiaan .m-shots-grid img{width:100%;height:100%;object-fit:cover}
@media (min-width:900px){.d-meridiaan .m-shots-grid{grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-rows:clamp(300px,35vw,540px)}.d-meridiaan .m-shots-grid figure,.d-meridiaan .m-shots-grid .is-m1{grid-column:span 5;aspect-ratio:auto}.d-meridiaan .m-shots-grid .is-w{grid-column:span 7}.d-meridiaan .m-shots-grid .is-full{grid-column:1 / -1}}
.d-meridiaan .m-feature.no-pic .m-feature-grid{padding-top:clamp(72px,8.8vw,148px)}
.d-meridiaan .m-feature h2{margin-top:0}
.d-meridiaan .m-feature-head .btn{margin-top:30px}
.d-meridiaan .m-spec dd{overflow-wrap:anywhere}
.d-meridiaan .m-feature .m-spec div{grid-template-columns:minmax(0,8.4em) minmax(0,1fr)}
.d-meridiaan .m-spec a{display:inline-block;margin:-8px 0;padding:11px 0;text-decoration:underline;text-decoration-color:var(--rule);text-underline-offset:5px}
@media (min-width:1000px){.d-meridiaan .m-feature .m-sheetcard{grid-row:1}.d-meridiaan .m-feature.no-pic .m-sheetcard{margin-top:0}.d-meridiaan .m-feature-grid.is-solo .m-feature-head{grid-column:1 / 11}}
@media (min-width:1000px) and (max-width:1279px){.d-meridiaan .m-feature .m-sheetcard{grid-column:8 / 13}.d-meridiaan .m-feature-grid:not(.is-solo) .m-feature-head{grid-column:1 / 7}}
.d-meridiaan .m-voices{padding:clamp(72px,8.8vw,148px) 0}
.d-meridiaan .m-voices-grid{display:grid;gap:clamp(34px,4vw,64px) clamp(30px,4vw,70px);grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))}
.d-meridiaan .m-voices blockquote{max-width:none;border-color:var(--brass-ink)}
.d-meridiaan .m-voices blockquote footer{display:grid;gap:2px;justify-items:start;margin-top:16px;font-size:13.5px;color:var(--mute)}
.d-meridiaan .m-voices blockquote footer b{color:var(--ink)}
.d-meridiaan .m-voices blockquote footer a{display:inline-flex;align-items:center;min-height:44px;text-decoration:underline;text-underline-offset:3px}
.d-meridiaan .m-value-steps li{align-items:baseline}
.d-meridiaan .m-value-copy>.m-value-steps{margin-top:30px}
.d-meridiaan .m-office dd{overflow-wrap:anywhere}
.d-meridiaan .m-office a{padding:9px 0}
.d-meridiaan .m-value-grid.is-solo{grid-template-columns:minmax(0,1fr)}
.d-meridiaan .m-value-grid.is-solo .m-value-copy{max-width:900px}
.d-meridiaan .m-hrs-list .m-value-steps{margin-top:0}
.d-meridiaan .m-hrs-list>p{color:var(--mute)}
.d-meridiaan .m-faq .z-acc{border-color:var(--ink)}
.d-meridiaan .z-acc summary{padding:20px 0;font-family:var(--m-display),Georgia,serif;font-size:clamp(20px,1.7vw,27px);line-height:1.25}
.d-meridiaan .z-acc summary i{color:var(--accent)}
.d-meridiaan .z-acc details>p{font-size:15.5px}
@media (min-width:1000px){.d-meridiaan .m-faq .m-value-copy{position:sticky;top:110px}}
.d-meridiaan .m-cta{padding:clamp(64px,8vw,130px) 0;background:var(--moss)}
.d-meridiaan .m-cta-grid{display:grid;gap:30px}
.d-meridiaan .m-cta h2{font-size:clamp(36px,5.4vw,92px);letter-spacing:-.02em}
.d-meridiaan .m-cta h2.is-long{font-size:clamp(30px,4vw,66px)}
.d-meridiaan .m-cta-side{display:grid;gap:24px;justify-items:start;padding-top:24px;border-top:1px solid var(--brass)}
.d-meridiaan .m-cta-side>p:first-child:not(:last-child){max-width:44ch;color:var(--soft)}
@media (min-width:1000px){.d-meridiaan .m-cta-grid{grid-template-columns:minmax(0,8fr) minmax(0,4fr);column-gap:clamp(40px,6vw,110px);align-items:end}}
.d-meridiaan .m-people h3{overflow-wrap:break-word}
.d-meridiaan .m-people.no-pic li{grid-template-columns:minmax(0,1fr)}
@media (min-width:620px){.d-meridiaan .m-people.no-pic li{padding-top:22px;border-top:1px solid var(--ink)}}
@media (min-width:1000px){.d-meridiaan .m-people{grid-template-columns:repeat(var(--n,4),minmax(0,1fr))}.d-meridiaan .m-people[data-n="1"]{max-width:440px}.d-meridiaan .m-people[data-n="2"]{max-width:900px}.d-meridiaan .m-people.no-pic li:nth-child(even){margin-top:0}}
.d-meridiaan .m-packs{padding:clamp(72px,8.8vw,148px) 0}
.d-meridiaan .m-packs-grid{display:grid;gap:clamp(16px,2vw,28px);grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}
.d-meridiaan .m-packs .m-sheetcard{grid-column:auto;grid-row:auto;align-content:start;margin-top:0}
.d-meridiaan .m-packs .m-sheetcard-price{font-size:clamp(28px,2.3vw,38px)}
@media (min-width:620px){.d-meridiaan .m-packs-grid[data-n="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1400px){.d-meridiaan .m-packs-grid[data-n="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}}
.d-meridiaan .m-sheetcard.is-featured{--fg:var(--parch);--dim:var(--soft);--rule:var(--line-d);--accent:var(--brass);background:var(--green);color:var(--parch)}
.d-meridiaan .m-sheetcard h3{font-size:clamp(27px,2.3vw,38px)}
.d-meridiaan .m-sheetcard-price small{margin-left:4px}
.d-meridiaan .m-pack-text{font-size:15px;color:var(--dim)}
.d-meridiaan .m-pack-list{border-top:1px solid var(--fg)}
.d-meridiaan .m-pack-list li{position:relative;padding:11px 0 10px 26px;border-bottom:1px solid var(--rule);font-size:15px}
.d-meridiaan .m-pack-list li::before{content:"";position:absolute;left:0;top:1.45em;width:14px;height:1px;background:var(--accent)}
.d-meridiaan .m-pack-note{margin-top:28px;font-size:14px;color:var(--mute)}
.d-meridiaan .z-form{gap:26px}
.d-meridiaan .z-fields{gap:22px 26px}
.d-meridiaan .z-field{gap:0}
.d-meridiaan .z-field label,.d-meridiaan .z-chipset legend{font-size:10.5px;font-weight:700;letter-spacing:.18em;color:var(--dim)}
.d-meridiaan .z-field input,.d-meridiaan .z-field select,.d-meridiaan .z-field textarea{min-height:46px;padding:8px 0;border:0;border-bottom:1px solid var(--dim);font-size:17px;color:var(--fg)}
.d-meridiaan .z-field textarea{min-height:92px}
.d-meridiaan .z-field select{padding-right:24px;background:transparent ${CARET("1d2a24")} right 2px center no-repeat;cursor:pointer;text-overflow:ellipsis}
.d-meridiaan .m-dark .z-field select{background-image:${CARET("ece7dc")}}
.d-meridiaan .m-dark .z-field input,.d-meridiaan .m-dark .z-field select,.d-meridiaan .m-dark .z-field textarea{color-scheme:dark}
.d-meridiaan .z-field :focus-visible{outline:none;border-color:var(--accent);box-shadow:0 1px 0 var(--accent)}
.d-meridiaan .form-note{color:var(--dim)}
.d-meridiaan .form-status{border-color:var(--accent);color:var(--fg)}
.d-meridiaan .z-chips button{font-size:14.5px;font-weight:500}
.d-meridiaan .z-chips button[aria-pressed="true"]{border-color:var(--btn-bg);background:var(--btn-bg);color:var(--btn-fg)}
.d-meridiaan .z-rows small,.d-meridiaan .z-steps small{font-family:var(--m-display),Georgia,serif;font-size:24px;font-style:italic;letter-spacing:0}
.d-meridiaan .z-price{font-family:var(--m-display),Georgia,serif;font-size:1.15em;color:var(--fg)}
.d-meridiaan .z-channel{background:var(--ivory)}
.d-meridiaan .z-ba-sec .z-cards{grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))}
@media (min-width:900px){.d-meridiaan .z-ba:only-child{aspect-ratio:16 / 9}}
.d-meridiaan .z-ba figcaption{background:var(--green);font-size:10.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.d-meridiaan .m-foot-top .m-logo{max-width:100%}
.d-meridiaan .m-foot-top p.is-long{font-size:clamp(24px,3vw,46px);line-height:1.16}
.d-meridiaan .m-foot-grid a{padding:10px 0}
@media (min-width:900px){.d-meridiaan .m-foot-grid{grid-template-columns:repeat(var(--n,4),minmax(0,1fr))}}
`
  .replace(/\n/g, "")
  .trim();

const two = (n: number) => String(n).padStart(2, "0");
const ext = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});
const CLOSED = /gesloten|closed|ferm[ée]|geschlossen/i;

function Head(p: HeadProps) {
  return (
    <header className="m-head">
      {p.kicker ? (
        <p className="m-eyebrow" data-rv>
          {p.kicker}
        </p>
      ) : null}
      <h2 id={p.id} className={long(p.title)} data-rv>
        {em(p.title)}
      </h2>
      {p.intro ? (
        <p className="m-head-note" data-rv>
          {p.intro}
        </p>
      ) : null}
    </header>
  );
}

/** The name as the demo sets its logo: a round mark, the name in serif and the city in small capitals. */
function Logo({ c }: { c: Ctx }) {
  const city = c.spec.business.city;
  const n = c.name.length;
  return (
    <a href="#top" className={`m-logo${n > 28 ? " is-xl" : n > 17 ? " is-long" : ""}`} aria-label={c.name}>
      <i className="m-mono" aria-hidden="true">
        {c.name.charAt(0).toUpperCase()}
      </i>
      <span>
        <b>{c.name}</b>
        {city && !c.name.toLowerCase().includes(city.toLowerCase()) ? <small>{city}</small> : null}
      </span>
    </a>
  );
}

function Header(c: Ctx) {
  const b = c.spec.business;
  const cta = c.spec.hero.primaryCta;
  // A long name or a long button label leaves less room for links.
  const room = 5 - (c.name.length > 22 ? 1 : 0) - (cta.label.length > 22 ? 1 : 0);
  return (
    <>
      <header className="m-nav hdr">
        <Logo c={c} />
        <nav aria-label={c.t.menu} className="m-links" data-nav>
          {c.nav.slice(0, room).map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href={cta.href} className="btn m-btn m-btn-line m-nav-cta" {...ext(cta.href)}>
          {cta.label}
        </a>
        <button type="button" className="m-burger menu-btn" aria-expanded="false" aria-controls="site-menu">
          <span data-label data-open={c.t.menu} data-close={c.t.close}>
            {c.t.menu}
          </span>
          <i aria-hidden="true" />
        </button>
      </header>
      <div id="site-menu" className="m-menu m-dark" data-nav inert>
        <nav aria-label={c.t.menu}>
          {c.nav.map((n, k) => (
            <a key={n.id} href={`#${n.id}`} style={i(k)}>
              <small>{two(k + 1)}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="m-menu-end">
          <a href={cta.href} className="btn m-btn m-btn-fill" {...ext(cta.href)}>
            {cta.label}
          </a>
          <div className="m-menu-foot">
            {b.address || b.city ? <p>{b.address ?? b.city}</p> : null}
            {b.phone || b.email ? (
              <p>
                {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
                {b.phone && b.email ? <br /> : null}
                {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

/** Where, when and how to call, for the bar under the opening (the place of the demo's search bar). */
function barFacts(c: Ctx): { label: string; value: ReactNode }[] {
  const b = c.spec.business;
  const out: { label: string; value: ReactNode }[] = [];
  if (b.address || b.city) out.push({ label: c.t.address, value: b.address ?? b.city });
  const open = b.openingHours?.find((l) => !CLOSED.test(l)) ?? b.openingHours?.[0];
  if (open) out.push({ label: c.t.hours, value: open });
  if (b.phone) out.push({ label: c.t.phone, value: <a href={tel(b.phone)}>{b.phone}</a> });
  return out;
}

function Hero(c: Ctx) {
  const { hero, business: b } = c.spec;
  const p = c.photo(hero.image);
  const plain = hero.headline.replace(/\*/g, "");
  const size = plain.length > 54 ? "is-s" : plain.length > 28 ? "is-m" : undefined;
  const { lines, marked } = splitLines(hero.headline, plain.length > 54 ? 3 : plain.length > 12 ? 2 : 1);
  const word = Math.max(6, ...plain.split(/\s+/).map((w) => w.length));
  const facts = barFacts(c);
  const second = hero.secondaryCta;
  const foot = Boolean(b.city || (second && facts.length));
  return (
    <section className={`m-hero m-dark${p ? "" : " no-pic"}${foot ? "" : " no-foot"}`}>
      {p ? (
        <figure className="m-hero-media">
          <Pic p={p} eager sizes="(min-width: 1000px) 60vw, 100vw" />
        </figure>
      ) : (
        <span className="m-hero-mark" aria-hidden="true">
          {c.name.charAt(0).toUpperCase()}
        </span>
      )}
      <div className="m-hero-in">
        {hero.eyebrow ? (
          <p className="m-eyebrow m-rise" style={i(0)}>
            {hero.eyebrow}
          </p>
        ) : null}
        <h1 className={size} style={css({ "--w": word })}>
          {lines.map((line, n) => (
            <span className="m-row" key={n}>
              <span className="m-line" style={i(n)}>
                {/* Without a marked phrase the last line carries the italic brass accent of the design. */}
                <span>{!marked && lines.length > 1 && n === lines.length - 1 ? <em>{line}</em> : line}</span>
              </span>
            </span>
          ))}
        </h1>
        <p className="m-lede m-rise" style={i(4)}>
          {hero.subheadline}
        </p>
      </div>
      <div className="m-hero-search m-rise" style={i(6)}>
        {facts.length > 0 ? (
          <div className="m-search m-bar" style={css({ "--n": facts.length })}>
            {facts.map((f) => (
              <div className="m-search-field" key={f.label}>
                <span>{f.label}</span>
                <b>{f.value}</b>
              </div>
            ))}
            <a className="btn m-search-go" href={hero.primaryCta.href} {...ext(hero.primaryCta.href)}>
              <span>{hero.primaryCta.label}</span>
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        ) : (
          <div className="m-hero-cta">
            <Btn c={c} href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Btn>
            {second ? (
              <Btn c={c} href={second.href} variant="alt">
                {second.label}
              </Btn>
            ) : null}
          </div>
        )}
      </div>
      {foot ? (
        <p className="m-hero-foot m-rise" style={i(8)}>
          {b.city ? <span>{b.city}</span> : null}
          {second && facts.length ? (
            <a href={second.href} {...ext(second.href)}>
              {second.label}
              {second.href.startsWith("#") ? <ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" /> : <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />}
            </a>
          ) : null}
        </p>
      ) : null}
    </section>
  );
}

/** Opening hours in the demo's label-and-value rows. */
function HoursRows({ c }: { c: Ctx }) {
  const lines = c.spec.business.openingHours;
  if (!lines?.length) return null;
  return (
    <ul className="m-value-steps">
      {hoursRows(lines).map(([day, time], n) => (
        <li key={n} data-rv style={i(n % 4)}>
          <span>{day}</span>
          {time}
        </li>
      ))}
    </ul>
  );
}

/** Address and contact details as the demo's office block. Only what is on record. */
function Office({ c }: { c: Ctx }) {
  const b = c.spec.business;
  if (!b.address && !b.phone && !b.email) return null;
  return (
    <dl className="m-office" data-rv>
      {b.address ? (
        <div>
          <dt>{c.t.address}</dt>
          <dd>
            {b.address}
            {b.mapsUrl ? (
              <>
                <br />
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {c.t.route}
                </a>
              </>
            ) : null}
          </dd>
        </div>
      ) : null}
      {b.phone || b.email ? (
        <div>
          <dt>{c.t.contact}</dt>
          <dd>
            {b.phone ? <a href={tel(b.phone)}>{b.phone}</a> : null}
            {b.phone && b.email ? <br /> : null}
            {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

function CardTop({ c }: { c: Ctx }) {
  const city = c.spec.business.city;
  return (
    <p className="m-value-card-top">
      <span>{c.name}</span>
      {city && !c.name.toLowerCase().includes(city.toLowerCase()) ? <span>{city}</span> : null}
    </p>
  );
}

function Footer(c: Ctx) {
  const b = c.spec.business;
  const hours = b.openingHours?.length ? b.openingHours.slice(0, 7) : null;
  const reach = Boolean(b.address || b.phone || b.email);
  const blurb = c.spec.footer.blurb;
  const cols = 1 + (reach ? 1 : 0) + (hours ? 1 : 0) + (blurb ? 1 : 0);
  return (
    <footer className="m-foot m-dark">
      <div className="m-wrap">
        <div className="m-foot-top">
          <Logo c={c} />
          {b.tagline ? <p className={b.tagline.length > 56 ? "is-long" : undefined}>{em(b.tagline)}</p> : null}
        </div>
        <div className="m-ruler" aria-hidden="true" />
        <div className="m-foot-grid" style={css({ "--n": cols })}>
          <div>
            <h3>{c.t.explore}</h3>
            {c.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </div>
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
            <div>
              <h3>{c.t.hours}</h3>
              {hours.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          ) : null}
          {blurb ? (
            <div>
              <h3>{c.name}</h3>
              <p>{blurb}</p>
            </div>
          ) : null}
        </div>
        <Legal c={c} className="m-legal" />
      </div>
    </footer>
  );
}

export const meridiaan: Family = {
  key: "meridiaan",
  root: "d-meridiaan",
  fonts: ["Playfair Display", "Manrope"],
  themeColor: "#ece7dc",
  accent: "#1d2a24",
  onAccent: "#f7f4ed",
  css: CSS,
  extra: EXTRA,
  cls: { wrap: "m-wrap", eyebrow: "m-eyebrow", btn: "m-btn m-btn-fill", btnAlt: "m-btn m-btn-line", btnText: "m-textlink" },
  Header,
  Hero,
  Footer,
  Head,
  sections: {
    // The demo's "Het kantoor": a statement, the story, and the highlights where its three figures stand.
    about: (s, c) => {
      const p = c.photo(s.image);
      const [first, ...rest] = s.paragraphs;
      return (
        <section className="m-intro m-about m-tp" id={s.id}>
          <div className="m-wrap m-intro-grid">
            <p className="m-eyebrow" data-rv>
              {c.t.kick.about}
            </p>
            <h2 className={`m-statement${long(s.title) ? " is-long" : ""}`} data-rv>
              {em(s.title)}
            </h2>
            <div className={`m-about-body${p ? " has-pic" : ""}`}>
              {p ? (
                <figure className="m-about-pic" data-rv="img" data-px>
                  <Pic p={p} sizes="(min-width: 900px) 32vw, 100vw" />
                </figure>
              ) : null}
              <div className="m-about-copy">
                <p className="m-big" data-rv>
                  {first}
                </p>
                {rest.map((x, n) => (
                  <p key={n} data-rv>
                    {x}
                  </p>
                ))}
              </div>
            </div>
            {s.highlights.length > 0 && (
              <ul className="m-figures" style={css({ "--n": s.highlights.length })}>
                {s.highlights.map((h, n) => (
                  <li key={h} data-rv style={i(n)}>
                    <b aria-hidden="true">{two(n + 1)}</b>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      );
    },
    statement: (s, c) => (
      <section className="m-intro m-say m-ti" id={s.id}>
        <div className="m-wrap m-intro-grid">
          <p className="m-eyebrow" data-rv>
            {s.note || c.name}
          </p>
          <h2 className="m-statement" data-rv>
            {em(s.title)}
          </h2>
        </div>
      </section>
    ),
    // Services in the look of the demo's listings: a photograph per service when every one has its own.
    services: (s, c) => {
      const pics = s.items.map((_, n) => c.photo(`art:svc${n}`));
      const shown = pics.every(Boolean);
      const last = s.items.length - 1;
      return (
        <section className="m-listings m-tp" id={s.id}>
          <div className="m-wrap">
            {c.head({ kicker: c.t.kick.services, title: s.title, intro: s.intro })}
            <ol className={`m-homes${shown ? "" : " no-pic"}`}>
              {s.items.map((it, n) => {
                const wide = shown && (n % 3 === 0 || (n % 3 === 1 && n === last));
                const flip = wide && Math.floor(n / 3) % 2 === 1;
                return (
                  <li key={n} className={`m-home${wide ? " is-wide" : ""}${flip ? " is-flip" : ""}`}>
                    {shown ? (
                      <div className="m-home-media" data-rv="img">
                        <div className="m-home-open">
                          <Pic p={pics[n]!} sizes={wide ? "(min-width: 900px) 62vw, 100vw" : "(min-width: 900px) 46vw, 100vw"} />
                        </div>
                        {it.duration ? <span className="m-tag">{it.duration}</span> : null}
                      </div>
                    ) : null}
                    <div className="m-home-body" data-rv>
                      <span className="m-home-no" aria-hidden="true">
                        {two(n + 1)}
                      </span>
                      <div className="m-home-title">
                        {!shown && it.duration ? <p className="m-home-kind">{it.duration}</p> : null}
                        <h3>{it.title}</h3>
                      </div>
                      {it.price ? <p className="m-home-price">{it.price}</p> : null}
                      <p className="m-home-line">{it.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      );
    },
    features: (s, c) => (
      <section className="m-team m-ti" id={s.id}>
        <div className="m-wrap">
          {c.head({ kicker: c.t.kick.features, title: s.title, intro: s.intro })}
          <ul className="m-points" style={css({ "--n": s.items.length <= 4 ? s.items.length : 3 })}>
            {s.items.map((it, n) => (
              <li key={n} data-rv style={i(n % 3)}>
                <span className="m-points-ico">
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
    // The dark band of the demo's neighbourhoods: large serif rows with small brass numerals.
    process: (s, c) => {
      const p = c.spare();
      return (
        <section className="m-hoods m-dark" id={s.id}>
          <div className="m-wrap">
            {c.head({ kicker: c.t.kick.process, title: s.title, intro: s.intro })}
            <div className={`m-path${p ? " has-pic" : ""}`}>
              <ol className="m-path-list">
                {s.steps.map((st, n) => (
                  <li key={n} data-rv style={i(n % 4)}>
                    <small>{two(n + 1)}</small>
                    <div>
                      <h3>{st.title}</h3>
                      <p>{st.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {p ? (
                <figure className="m-path-pic" data-rv="img" data-px>
                  <Pic p={p} sizes="(min-width: 1000px) 58vw, 100vw" />
                </figure>
              ) : null}
            </div>
          </div>
        </section>
      );
    },
    gallery: (s, c) => {
      const pics = s.images.map((r) => c.photo(r)).filter((p): p is Photo => Boolean(p));
      if (!pics.length) return null;
      const n = pics.length;
      // Rows of a wide and a narrow frame that swap sides; an odd last photograph takes the full width.
      const kinds = pics.map((_, k) => (k === n - 1 && n % 2 === 1 ? "is-full" : Math.floor(k / 2) % 2 === k % 2 ? "is-w" : "is-n"));
      const cls = (k: number) => (kinds[k] !== "is-n" || (kinds[k - 1] !== "is-n" && kinds[k + 1] !== "is-n") ? `${kinds[k]} is-m1` : kinds[k]);
      return (
        <section className="m-shots m-ti" id={s.id}>
          <div className="m-wrap">
            {c.head({ kicker: c.t.kick.gallery, title: s.title })}
            <div className="m-shots-grid">
              {pics.map((p, k) => (
                <figure key={k} className={cls(k)} data-rv="img">
                  <Pic p={p} sizes={kinds[k] === "is-n" ? "(min-width: 900px) 40vw, 50vw" : "(min-width: 900px) 58vw, 100vw"} />
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    },
    // The demo's spread of one house: the photograph across the page, the facts on an ivory card over it.
    showcase: (s, c) => {
      const b = c.spec.business;
      const p = c.photo(s.image);
      const a = p ? c.spare() : null;
      const second = a ? c.spare() : null;
      const card = Boolean(b.address || b.phone || b.email);
      return (
        <section className={`m-feature m-dark${p ? "" : " no-pic"}`} id={s.id}>
          {p ? (
            <div className="m-feature-media" data-px>
              <Pic p={p} sizes="100vw" />
            </div>
          ) : null}
          <div className={`m-wrap m-feature-grid${card ? "" : " is-solo"}`}>
            <div className="m-feature-head">
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
              {s.body ? (
                <p className="m-big" data-rv>
                  {s.body}
                </p>
              ) : null}
              {s.cta && !card ? (
                <p data-rv>
                  <Btn c={c} href={s.cta.href}>
                    {s.cta.label}
                  </Btn>
                </p>
              ) : null}
            </div>
            {card ? (
              <div className="m-sheetcard" data-rv>
                <p className="m-sheetcard-top">
                  <span>{c.name}</span>
                  {b.city ? <span>{b.city}</span> : null}
                </p>
                <dl className="m-spec">
                  {b.address ? (
                    <div>
                      <dt>{c.t.address}</dt>
                      <dd>{b.address}</dd>
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
                  {b.email ? (
                    <div>
                      <dt>{c.t.email}</dt>
                      <dd>
                        <a href={`mailto:${b.email}`}>{b.email}</a>
                      </dd>
                    </div>
                  ) : null}
                  {b.openingHours?.length
                    ? hoursRows(b.openingHours.slice(0, 7)).map(([day, time], n) => (
                        <div key={n}>
                          <dt>{day}</dt>
                          <dd>{time}</dd>
                        </div>
                      ))
                    : null}
                </dl>
                {s.cta ? (
                  <Btn c={c} href={s.cta.href}>
                    {s.cta.label}
                  </Btn>
                ) : null}
              </div>
            ) : null}
            {a ? (
              <figure className="m-feature-a" data-rv="img">
                <Pic p={a} sizes="(min-width: 1000px) 56vw, 100vw" />
              </figure>
            ) : null}
            {second ? (
              <figure className="m-feature-b" data-rv="img">
                <Pic p={second} sizes="(min-width: 1000px) 30vw, 64vw" />
              </figure>
            ) : null}
          </div>
        </section>
      );
    },
    testimonials: (s, c) => (
      <section className="m-voices m-tp" id={s.id}>
        <div className="m-wrap">
          {c.head({ kicker: c.t.kick.testimonials, title: s.title })}
          <div className="m-voices-grid">
            {s.items.map((q, n) => (
              <blockquote key={n} data-rv style={i(n % 3)}>
                <p>{q.quote}</p>
                <footer>
                  <b>{q.author}</b>
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
    // The demo's valuation request: the copy and the office on parchment, the form on a dark green card.
    booking: (s, c) => (
      <section className="m-value m-tp" id={s.id}>
        <div className="m-wrap m-value-grid">
          <div className="m-value-copy">
            <p className="m-eyebrow" data-rv>
              {c.t.kick.booking}
            </p>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {s.body ? (
              <p className="m-value-lede" data-rv>
                {s.body}
              </p>
            ) : null}
            <HoursRows c={c} />
            <Office c={c} />
          </div>
          <div className="m-value-card m-dark" data-rv>
            <CardTop c={c} />
            <DemoForm c={c} kind={s.kind} options={s.options} uid={`f-${s.id}`} />
          </div>
        </div>
      </section>
    ),
    contact: (s, c) => {
      const hours = !c.spec.sections.some((x) => x.type === "hours" || x.type === "booking");
      return (
        <section className="m-value m-tp" id={s.id}>
          <div className={`m-wrap m-value-grid${s.showForm ? "" : " is-solo"}`}>
            <div className="m-value-copy">
              <p className="m-eyebrow" data-rv>
                {c.t.kick.contact}
              </p>
              <h2 className={long(s.title)} data-rv>
                {em(s.title)}
              </h2>
              {s.body ? (
                <p className="m-value-lede" data-rv>
                  {s.body}
                </p>
              ) : null}
              {hours ? <HoursRows c={c} /> : null}
              <Office c={c} />
            </div>
            {s.showForm ? (
              <div className="m-value-card m-dark" data-rv>
                <CardTop c={c} />
                <DemoForm c={c} kind="message" uid={`f-${s.id}`} />
              </div>
            ) : null}
          </div>
        </section>
      );
    },
    hours: (s, c) => (
      <section className="m-value m-ti" id={s.id}>
        <div className="m-wrap m-value-grid">
          <div className="m-value-copy">
            <p className="m-eyebrow" data-rv>
              {c.t.kick.hours}
            </p>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
            {s.note ? (
              <p className="m-value-lede" data-rv>
                {s.note}
              </p>
            ) : null}
            <Office c={c} />
          </div>
          <div className="m-hrs-list">
            {c.spec.business.openingHours?.length ? (
              <HoursRows c={c} />
            ) : (
              <p data-rv>{c.t.hoursTbc}</p>
            )}
          </div>
        </div>
      </section>
    ),
    faq: (s, c) => (
      <section className="m-value m-faq m-ti" id={s.id}>
        <div className="m-wrap m-value-grid">
          <div className="m-value-copy">
            <p className="m-eyebrow" data-rv>
              {c.t.kick.faq}
            </p>
            <h2 className={long(s.title)} data-rv>
              {em(s.title)}
            </h2>
          </div>
          <div className="z-acc" data-acc>
            {s.items.map((it, n) => (
              <details key={n} data-rv style={i(n % 4)}>
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
    cta: (s, c) => (
      <section className="m-cta m-dark" id={s.id}>
        <div className="m-wrap m-cta-grid">
          <h2 className={long(s.title)} data-rv>
            {em(s.title)}
          </h2>
          <div className="m-cta-side" data-rv>
            {s.body ? <p>{s.body}</p> : null}
            <p>
              <Btn c={c} href={s.cta.href}>
                {s.cta.label}
              </Btn>
            </p>
          </div>
        </div>
      </section>
    ),
    team: (s, c) => {
      const pics = s.members.map((m) => c.photo(m.image));
      const shown = pics.every(Boolean);
      const cols = s.members.length <= 4 ? s.members.length : 3;
      return (
        <section className="m-team m-ti" id={s.id}>
          <div className="m-wrap">
            {c.head({ kicker: c.t.kick.team, title: s.title, intro: s.intro })}
            <ul className={`m-people${shown ? "" : " no-pic"}`} data-n={cols} style={css({ "--n": cols })}>
              {s.members.map((m, n) => (
                <li key={n} data-rv style={i(n % 4)}>
                  {shown ? (
                    <figure>
                      <Pic p={pics[n]!} sizes="(min-width: 1000px) 24vw, (min-width: 620px) 44vw, 40vw" />
                    </figure>
                  ) : null}
                  <div>
                    <p className="m-person-role">{m.role}</p>
                    <h3>{m.name}</h3>
                    {m.bio ? <p className="m-person-text">{m.bio}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    },
    // Packages on the demo's specification card; the featured one in dark green.
    packages: (s, c) => (
      <section className="m-packs m-tp" id={s.id}>
        <div className="m-wrap">
          {c.head({ kicker: c.t.kick.packages, title: s.title, intro: s.intro })}
          <div className="m-packs-grid" data-n={s.items.length}>
            {s.items.map((it, n) => (
              <article key={n} className={`m-sheetcard${it.featured ? " is-featured" : ""}`} data-rv style={i(n % 3)}>
                <p className="m-sheetcard-top">
                  <span>N° {n + 1}</span>
                  {it.featured ? <span>{c.t.popular}</span> : null}
                </p>
                <h3>{it.name}</h3>
                <p className="m-sheetcard-price">
                  {it.price ? (
                    <>
                      {it.price}
                      {it.unit ? <small>{it.unit}</small> : null}
                    </>
                  ) : (
                    c.t.onRequest
                  )}
                </p>
                {it.description ? <p className="m-pack-text">{it.description}</p> : null}
                {it.features.length > 0 && (
                  <ul className="m-pack-list">
                    {it.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
          {s.note ? (
            <p className="m-pack-note" data-rv>
              {s.note}
            </p>
          ) : null}
        </div>
      </section>
    ),
  },
};
