import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { PageHeader, Section } from "@/components/app/page";
import { Badge } from "@/components/ui";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { requireAuth } from "@/server/auth";
import { DESIGNS, type Design } from "@/sites/designs";

export const metadata = { title: "Template library" };

const GROUPS: { key: Design["group"]; title: string; description: string }[] = [
  { key: "food", title: "Restaurants & food", description: "Menus, reservations, ordering and opening hours built in." },
  { key: "services", title: "Salons, automotive & trades", description: "Price lists, booking, packages, portfolios and quote forms." },
  { key: "general", title: "Other local businesses", description: "Used when a business does not match a specialised design." },
];

function DesignCard({ d }: { d: Design }) {
  const categories = BUSINESS_CATEGORIES.filter((c) => c.design === d.key).map((c) => c.label);
  return (
    <article id={d.key} className="panel scroll-mt-24 overflow-hidden">
      {/* Live render of the real template at desktop width, scaled down. */}
      <div className="relative h-[230px] overflow-hidden border-b border-border sm:h-[260px]" style={{ background: d.palette.bg }}>
        <iframe
          src={`/site-assets/templates/${d.key}.html`}
          title={`${d.name} preview`}
          loading="lazy"
          tabIndex={-1}
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
          style={{ width: 1280, height: 900, transform: "scale(var(--s))" }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold">{d.name}</h3>
            <p className="text-xs text-muted">{d.industry}</p>
          </div>
          <Link href={`/site-assets/templates/${d.key}.html`} target="_blank" className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-accent hover:border-border-strong">
            Open <ExternalLink className="h-3.5 w-3.5" />
          </Link>
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
        description={`${DESIGNS.length} designs. Each one has its own typography, colour palette, page layout and industry features — the previews below are live renders, not screenshots.`}
        actions={
          <Link href="/websites" className="rounded-lg border border-border px-3 py-2 text-[13px] font-medium hover:border-border-strong">
            ← Back to websites
          </Link>
        }
      />
      {GROUPS.map((g) => (
        <Section key={g.key} title={g.title} description={g.description}>
          <div className="grid gap-4 [--s:0.3] sm:grid-cols-2 sm:[--s:0.26] lg:[--s:0.3] xl:grid-cols-3 xl:[--s:0.29] 2xl:[--s:0.36]">
            {DESIGNS.filter((d) => d.group === g.key).map((d) => (
              <DesignCard key={d.key} d={d} />
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
