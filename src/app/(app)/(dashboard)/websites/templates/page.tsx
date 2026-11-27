import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { PageHeader, Section } from "@/components/app/page";
import { Badge } from "@/components/ui";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { requireAuth } from "@/server/auth";
import { FAMILY_DESIGNS, type Design } from "@/sites/designs";
import { FAMILIES } from "@/sites/families";

export const metadata = { title: "Template library" };

/** The designs that are in use as templates (a demo design counts once its family exists). */
const LIVE = FAMILY_DESIGNS.filter((d) => FAMILIES[d.key]);

function DesignCard({ d }: { d: Design }) {
  const categories = BUSINESS_CATEGORIES.filter((c) => c.family === d.key).map((c) => c.label);
  return (
    <article id={d.key} className="panel scroll-mt-24 overflow-hidden">
      {/* The demo website this template is taken from, as shown in the portfolio. */}
      <a href={`/demos/${d.demo}`} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/10] overflow-hidden border-b border-border" style={{ background: d.palette.bg }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/site/work/${d.demo}-d-720.webp`} alt={`${d.name}: the demo website of this design`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
      </a>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold">{d.name}</h3>
            <p className="text-xs text-muted">{d.industry}</p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <Link href={`/demos/${d.demo}`} target="_blank" className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-accent hover:border-border-strong">
              Demo <ExternalLink className="h-3.5 w-3.5" />
            </Link>
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
        {categories.length > 0 && <p className="mt-3 text-xs text-subtle">Used for: {categories.join(", ")}</p>}
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
        description={`${LIVE.length} designs: the demo websites of the portfolio. Every new website is built in one of them, filled with the business's own verified content. "Demo" opens the demo website of a design; "Sample build" shows what the builder makes of it for an example business without photographs.`}
        actions={
          <Link href="/websites" className="rounded-lg border border-border px-3 py-2 text-[13px] font-medium hover:border-border-strong">
            ← Back to websites
          </Link>
        }
      />
      <Section title="Designs" description="The design is chosen from the kind of business. Earlier designs are no longer used for new websites; a website that was built with one keeps it until it is generated again.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {LIVE.map((d) => (
            <DesignCard key={d.key} d={d} />
          ))}
        </div>
      </Section>
    </>
  );
}
