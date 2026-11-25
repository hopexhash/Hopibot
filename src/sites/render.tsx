import { renderToStaticMarkup } from "react-dom/server";
import { siteSpecSchema, type SiteSpec } from "@/lib/site-spec";
import { SiteDocument, type RenderOptions } from "./site";
import { designFonts, designForSpec } from "./designs";
import { fontFaces } from "./fonts";
import { siteCss } from "./styles";

const SITE_JS = `(function(){var d=document.documentElement;d.classList.add('js');
var els=[].slice.call(document.querySelectorAll('.reveal'));
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{rootMargin:'0px 0px -8% 0px',threshold:0.08});els.forEach(function(el){io.observe(el)});}else{els.forEach(function(el){el.classList.add('in')})}
var t=document.getElementById('menu-toggle');
document.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){if(t)t.checked=false})});
var mb=document.querySelector('.menu-btn');if(mb&&t){mb.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t.checked=!t.checked}})}
function fit(){document.querySelectorAll('[data-fit]').forEach(function(el){el.style.fontSize='100px';var rg=document.createRange();rg.selectNodeContents(el);var w=rg.getBoundingClientRect().width,p=el.parentNode.clientWidth-(window.innerWidth<640?32:64);if(w>0)el.style.fontSize=Math.max(40,Math.min(360,Math.floor(100*p/w)))+'px';el.classList.add('fitted')})}
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
  const design = designForSpec(valid.theme);
  const css = fontFaces(opts.assetBase, designFonts(design)) + siteCss(design.skin ?? design.key);
  const markup = renderToStaticMarkup(<SiteDocument spec={valid} opts={opts} css={css} script={SITE_JS} />);
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
