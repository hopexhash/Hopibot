import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { PageHeader, Section } from "@/components/app/page";
import { Badge } from "@/components/ui";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { requireAuth } from "@/server/auth";
import { FAMILY_DESIGNS, type Design } from "@/sites/designs";
import { FAMILIES } from "@/sites/families";
import { COLORWAYS } from "@/sites/colorways";
import { LOOKS_OF_CATEGORY } from "@/lib/design-select";

export const metadata = { title: "Template library" };

/** The designs that are in use as templates (a demo design counts once its family exists). */
const LIVE = FAMILY_DESIGNS.filter((d) => FAMILIES[d.key]);

function DesignCard({ d }: { d: Design }) {
  const categories = BUSINESS_CATEGORIES.filter((c) => c.family === d.key).map((c) => c.label);
  // Categories that get this design for their second, third... business, so neighbours differ.
  const alsoFor = BUSINESS_CATEGORIES.filter((c) => c.family !== d.key && (LOOKS_OF_CATEGORY[c.key] ?? []).includes(d.key)).map((c) => c.label);
  const looks = [{ name: "Original", swatch: d.palette.accent, href: `/site-assets/templates/${d.key}.html` }, ...(COLORWAYS[d.key] ?? []).map((cw, i) => ({ name: cw.name, swatch: cw.swatch, href: `/site-assets/templates/${d.key}-${i + 1}.html` }))];
  return (
    <article id={d.key} className="panel scroll-mt-24 overflow-hidden">
      {/* The demo website this template is taken from; an original template shows its sample build. */}
      <a href={d.original ? `/site-assets/templates/${d.key}.html` : `/demos/${d.demo}`} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/10] overflow-hidden border-b border-border" style={{ background: d.palette.bg }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/site/work/${d.demo}-d-720.webp`} alt={`${d.name}: ${d.original ? "a sample build" : "the demo website"} of this design`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
        {d.original && <span className="absolute left-3 top-3 rounded-md bg-foreground px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-background">New · original</span>}
      </a>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold">{d.name}</h3>
            <p className="text-xs text-muted">{d.industry}</p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            {!d.original && (
              <Link href={`/demos/${d.demo}`} target="_blank" className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-accent hover:border-border-strong">
                Demo <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
            <Link href={`/site-assets/templates/${d.key}.html`} target="_blank" className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:border-border-strong" title="A sample build for an example business, without photographs">
              Sample build <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{d.description}</p>
        <div className="mt-3 flex items-center gap-1.5">
          {[d.palette.bg, d.palette.ink, d.palette.primary, d.palette.accent].map((c, i) => (
            <span key={i} className="h-5 w-5 rounded-full border border-white/15" style={{ background: c }} title={c} />
          ))}
          <span className="ml-2 truncate text-xs text-muted">
            {d.fonts.display}
            {d.fonts.body !== d.fonts.display ? ` + ${d.fonts.body}` : ""}
          </span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {d.features.map((f) => (
            <li key={f}>
              <Badge tone="neutral">{f}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-border pt-3">
          <p className="label-mono !text-[10px]">Colourways · sample build</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {looks.map((l) => (
              <li key={l.name}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs font-medium hover:border-border-strong">
                  <span className="h-3 w-3 rounded-full border border-black/10" style={{ background: l.swatch }} />
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {categories.length > 0 && <p className="mt-3 text-xs text-subtle">First choice for: {categories.join(", ")}</p>}
        {alsoFor.length > 0 && <p className="mt-1 text-xs text-subtle">Also used for: {alsoFor.join(", ")}</p>}
      </div>
    </article>
  );
}

export default async function TemplateLibraryPage() {
  await requireAuth();
  return (
    <>
      <PageHeader
        title="Template library"
        description={`${LIVE.length} designs in ${LIVE.reduce((n, d) => n + 1 + (COLORWAYS[d.key]?.length ?? 0), 0)} looks: the demo websites of the portfolio, each in its original colours and two colourways. Every new website is built in one of them, filled with the business's own verified content. "Demo" opens the demo website; the colourways open a sample build for an example business without photographs.`}
        actions={
          <Link href="/websites" className="rounded-lg border border-border px-3 py-2 text-[13px] font-medium hover:border-border-strong">
            ← Back to websites
          </Link>
        }
      />
      <Section title="Designs" description="The look is chosen from the kind of business and from the websites you already have: the first business of a kind gets the best-fitting design, the next ones get another design or colourway, so two businesses in the same branch, and certainly in the same city, never get the same website. A website keeps its look when it is improved or regenerated.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {LIVE.map((d) => (
            <DesignCard key={d.key} d={d} />
          ))}
        </div>
      </Section>
    </>
  );
}
