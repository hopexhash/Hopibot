import { renderToStaticMarkup } from "react-dom/server";
import { siteSpecSchema, type SiteSpec } from "@/lib/site-spec";
import { SiteDocument, type RenderOptions } from "./site";
import { fontFaces, SITE_CSS } from "./styles";

const SITE_JS = `(function(){var d=document.documentElement;d.classList.add('js');
var els=[].slice.call(document.querySelectorAll('.reveal'));
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{rootMargin:'0px 0px -8% 0px',threshold:0.08});els.forEach(function(el){io.observe(el)});}else{els.forEach(function(el){el.classList.add('in')})}
var t=document.getElementById('menu-toggle');
document.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){if(t)t.checked=false})});
var mb=document.querySelector('.menu-btn');if(mb&&t){mb.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t.checked=!t.checked}})}
document.querySelectorAll('[data-demo-form]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var s=f.querySelector('.form-status');if(s){s.textContent=s.getAttribute('data-done');s.classList.add('show')}f.reset();})});
})();`;

export type RenderedFile = { path: string; content: string; contentType: string };

export const FONT_FILES = ["poppins", "inter"].flatMap((f) => [400, 500, 600, 700].map((w) => `${f}-latin-${w}-normal.woff2`));

/**
 * Renders a SiteSpec to a self-contained static site.
 * `assetBase` is where the self-hosted fonts are served from: "/site-assets/" for the
 * in-app preview, "assets/" in the exported project.
 */
export function renderSite(spec: SiteSpec, opts: RenderOptions & { assetBase: string }): RenderedFile[] {
  const valid = siteSpecSchema.parse(spec);
  const css = fontFaces(opts.assetBase) + SITE_CSS;
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
