import { renderToStaticMarkup } from "react-dom/server";
import { siteSpecSchema, type SiteSpec } from "@/lib/site-spec";
import { SiteDocument, type RenderOptions } from "./site";
import { designFonts, designForSpec } from "./designs";
import { fontFaces } from "./fonts";
import { siteCss } from "./styles";
import { colorwayOf, recolor, shiftHex } from "./colorways";
import { familyOf } from "./families";
import { BASE_CSS, BASE_JS } from "./families/base";
import { KIT_CSS } from "./families/css/kit";
import { FamilyDocument } from "./families/kit";

const SITE_JS = `(function(){var d=document.documentElement;d.classList.add('js');
var els=[].slice.call(document.querySelectorAll('.reveal'));
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{rootMargin:'0px 0px -8% 0px',threshold:0.08});els.forEach(function(el){io.observe(el)});}else{els.forEach(function(el){el.classList.add('in')})}
var t=document.getElementById('menu-toggle');
document.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){if(t)t.checked=false})});
var mb=document.querySelector('.menu-btn');if(mb&&t){mb.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t.checked=!t.checked}})}
function fit(){var long=document.body.classList.contains('long-name');document.querySelectorAll('[data-fit]').forEach(function(el){var p=el.parentNode.clientWidth-(window.innerWidth<640?32:64),w=0;if(long){var probe=document.createElement('span');probe.style.cssText='position:absolute;visibility:hidden;white-space:nowrap;font-size:100px';el.appendChild(probe);el.textContent.replace(/\\u200b/g,' ').split(/\\s+/).forEach(function(word){if(!word)return;probe.textContent=word;w=Math.max(w,probe.getBoundingClientRect().width)});el.removeChild(probe)}else{el.style.fontSize='100px';var rg=document.createRange();rg.selectNodeContents(el);w=rg.getBoundingClientRect().width}if(w>0)el.style.fontSize=Math.max(long?22:40,Math.min(long?220:360,Math.floor(100*p/w)))+'px';el.classList.add('fitted')})}
fit();window.addEventListener('resize',fit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
document.querySelectorAll('[data-ba] input').forEach(function(i){var b=i.parentNode;i.addEventListener('input',function(){b.style.setProperty('--pos',i.value+'%')})});
var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;document.querySelectorAll('.svc,.gallery,.team,.features,.highlights').forEach(function(g){[].slice.call(g.children).forEach(function(el,i){el.style.setProperty('--i',String(Math.min(i,6)))})});var px=[].slice.call(document.querySelectorAll('[data-parallax] img')),tick=false;function onScroll(){document.body.classList.toggle('scrolled',window.scrollY>24);if(rm||!px.length||tick)return;tick=true;requestAnimationFrame(function(){px.forEach(function(im){var r=im.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>window.innerHeight)return;var t=(r.top+r.height/2-window.innerHeight/2)/window.innerHeight;im.style.transform='translate3d(0,'+(t*-34).toFixed(1)+'px,0) scale(1.08)'});tick=false})}window.addEventListener('scroll',onScroll,{passive:true});onScroll();
document.querySelectorAll('[data-demo-form]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var s=f.querySelector('.form-status');if(s){s.textContent=s.getAttribute('data-done');s.classList.add('show')}f.reset();})});
})();`;

export type RenderedFile = { path: string; content: string; contentType: string };

/**
 * Renders a SiteSpec to a self-contained static site.
 * `assetBase` is where the self-hosted fonts are served from: "/site-assets/" for the
 * in-app preview, "assets/" in the exported project.
 */
export function renderSite(spec: SiteSpec, opts: RenderOptions & { assetBase: string }): RenderedFile[] {
  const valid = siteSpecSchema.parse(spec);
  // A demo design (template family) brings its own document; the others share the classic one.
  const base = familyOf(valid.theme.design);
  const cw = base ? colorwayOf(base.key, valid.theme.variation) : null;
  // The icon carries the accent URL-encoded, out of reach of the recolouring below: shift it here.
  const fam = base && cw ? { ...base, accent: shiftHex(base.accent, cw), onAccent: shiftHex(base.onAccent, cw) } : base;
  let markup: string;
  if (fam) {
    const css = fontFaces(opts.assetBase, fam.fonts) + KIT_CSS + fam.css + BASE_CSS + fam.extra;
    markup = renderToStaticMarkup(<FamilyDocument spec={valid} opts={opts} fam={fam} css={css} script={BASE_JS + (fam.js ?? "")} />);
    // A colourway recolours the family's own palette once, in the finished document: its
    // stylesheet, its inline colours, the browser colour and the icon.
    if (cw) markup = recolor(markup, cw);
  } else {
    const design = designForSpec(valid.theme);
    const css = fontFaces(opts.assetBase, designFonts(design)) + siteCss(design.skin ?? design.key);
    markup = renderToStaticMarkup(<SiteDocument spec={valid} opts={opts} css={css} script={SITE_JS} />);
  }
  const html = `<!DOCTYPE html>${markup}`;
  return [
    { path: "index.html", content: html, contentType: "text/html; charset=utf-8" },
    { path: "robots.txt", content: "User-agent: *\nDisallow: /\n", contentType: "text/plain; charset=utf-8" },
    {
      path: "vercel.json",
      content: JSON.stringify(
        {
          cleanUrls: true,
          headers: [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Robots-Tag", value: "noindex, nofollow" },
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
              ],
            },
          ],
        },
        null,
        2,
      ),
      contentType: "application/json",
    },
  ];
}
