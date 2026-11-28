"use client";

import { ArrowUpRight, Check, Monitor, Search, Smartphone, Sparkles, X } from "lucide-react";
import { Dialog as RDialog } from "radix-ui";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Dialog, Select } from "@/components/ui";
import { cn } from "@/lib/utils";
import { applyTemplateAction, createFromTemplateAction } from "@/server/actions/websites";

export type GalleryLook = { name: string; swatch: string; href: string };
export type GalleryTemplate = {
  key: string;
  name: string;
  industry: string;
  description: string;
  preview: string;
  original: boolean;
  fonts: string;
  palette: string[];
  features: string[];
  sectors: string[];
  firstFor: string[];
  alsoFor: string[];
  looks: GalleryLook[];
  /** Business categories this template suits, best first (the create form pre-selects the first). */
  categoryKeys: string[];
  /** Extra words to match a search on (category keys and Google place types). */
  terms: string;
};
export type GalleryProject = { id: string; name: string; template: string; status: string };
export type GalleryCategory = { key: string; label: string };

/**
 * The template library as a marketplace: search, filter by sector, open a live preview on a
 * computer or phone width in every colourway, and apply a template to an existing website.
 */
export function TemplateGallery({ templates, sectors, projects, categories, canEdit }: { templates: GalleryTemplate[]; sectors: string[]; projects: GalleryProject[]; categories: GalleryCategory[]; canEdit: boolean }) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("");
  const [onlyNew, setOnlyNew] = useState(false);
  const [preview, setPreview] = useState<{ t: GalleryTemplate; look: number } | null>(null);
  const [apply, setApply] = useState<{ t: GalleryTemplate; look: number; mode?: "create" | "apply" } | null>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter(
      (t) =>
        (!sector || t.sectors.includes(sector)) &&
        (!onlyNew || t.original) &&
        (!q || [t.name, t.industry, t.description, t.terms, ...t.firstFor, ...t.alsoFor, ...t.features].join(" ").toLowerCase().includes(q)),
    );
  }, [templates, query, sector, onlyNew]);

  return (
    <>
      <div className="sticky top-[60px] z-20 -mx-4 mb-6 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-xl sm:border sm:px-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
          <label className="relative w-full flex-none lg:w-72">
            <span className="sr-only">Search templates</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, industry or feature…"
              className="field-m h-11 w-full rounded-md border border-border-strong bg-surface pl-9 pr-3 text-[16px] outline-none focus:border-foreground/40 focus:shadow-[0_0_0_3px_var(--ring)] sm:text-[14px]"
            />
          </label>
          <div className="-mx-4 flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-label="Sector">
            {["", ...sectors].map((s) => (
              <button
                key={s || "all"}
                type="button"
                aria-pressed={sector === s}
                onClick={() => setSector(s)}
                className={cn("h-9 flex-none rounded-md border px-3 text-[13px] font-medium transition-colors", sector === s ? "border-foreground bg-foreground text-background" : "border-border bg-surface text-muted hover:text-foreground")}
              >
                {s || "All"}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={onlyNew}
              onClick={() => setOnlyNew((v) => !v)}
              className={cn("flex h-9 flex-none items-center gap-1.5 rounded-md border px-3 text-[13px] font-medium transition-colors", onlyNew ? "border-brand bg-brand text-[#0c0c0d]" : "border-border bg-surface text-muted hover:text-foreground")}
            >
              <Sparkles className="h-3.5 w-3.5" /> New
            </button>
          </div>
        </div>
        <p className="mt-2 text-[12.5px] text-subtle">
          {shown.length} of {templates.length} templates · {templates.reduce((n, t) => n + t.looks.length, 0)} looks in total
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border-strong px-6 py-16 text-center text-[14px] text-muted">No template matches. Try another word or sector.</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((t, n) => (
            <li key={t.key} className="animate-fade-in" style={{ animationDelay: `${Math.min(n, 8) * 40}ms` }}>
              <Card t={t} onPreview={(look) => setPreview({ t, look })} onApply={(look) => setApply({ t, look })} canEdit={canEdit} />
            </li>
          ))}
        </ul>
      )}

      {preview && <PreviewModal state={preview} onChange={setPreview} onApply={canEdit ? (look) => (setPreview(null), setApply({ t: preview.t, look })) : undefined} />}
      {apply && apply.mode === "apply" && <ApplyDialog state={apply} projects={projects} onClose={() => setApply(null)} />}
      {apply && apply.mode !== "apply" && <CreateDialog state={apply} categories={categories} onClose={() => setApply(null)} onApplyInstead={projects.length ? () => setApply({ ...apply, mode: "apply" }) : undefined} />}
    </>
  );
}

function Card({ t, onPreview, onApply, canEdit }: { t: GalleryTemplate; onPreview: (look: number) => void; onApply: (look: number) => void; canEdit: boolean }) {
  const [look, setLook] = useState(0);
  return (
    <article className="group panel flex h-full flex-col overflow-hidden transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
      <button type="button" onClick={() => onPreview(look)} className="relative block aspect-[16/10] overflow-hidden border-b border-border text-left" style={{ background: t.palette[0] }} aria-label={`Preview ${t.name}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={t.preview} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]" />
        <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/55 via-black/0 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-md bg-white px-2.5 py-1.5 text-[12.5px] font-semibold text-[#0c0c0d]">Live preview</span>
        </span>
        {t.original && <span className="absolute left-3 top-3 rounded-md bg-[#0c0c0d] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">New</span>}
      </button>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-[19px] font-semibold tracking-[-0.01em]">{t.name}</h3>
            <p className="label-mono mt-1 !text-[10.5px]">{t.industry}</p>
          </div>
          <div className="flex flex-none gap-1" role="group" aria-label="Colourway">
            {t.looks.map((l, k) => (
              <button
                key={l.name}
                type="button"
                title={l.name}
                aria-label={`${l.name} colours`}
                aria-pressed={look === k}
                onClick={() => setLook(k)}
                className={cn("h-6 w-6 rounded-full border-2 transition-transform", look === k ? "scale-110 border-foreground" : "border-transparent hover:scale-110")}
                style={{ background: l.swatch, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.12)" }}
              />
            ))}
          </div>
        </div>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{t.description}</p>
        <p className="mt-2 text-[12px] text-subtle">{t.fonts}</p>
        {t.firstFor.length + t.alsoFor.length > 0 && (
          <p className="mt-3 line-clamp-2 text-[12px] text-subtle">
            <span className="text-muted">For:</span> {[...t.firstFor, ...t.alsoFor].join(", ")}
          </p>
        )}
        <div className="mt-auto flex gap-2 pt-4">
          <Button variant="secondary" className="flex-1" onClick={() => onPreview(look)}>
            <Monitor className="h-4 w-4" /> Preview
          </Button>
          {canEdit && (
            <Button variant="primary" className="flex-1" onClick={() => onApply(look)}>
              Create with this template
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

/** A full-screen live preview of the sample build, at a computer or phone width, in every colourway. */
function PreviewModal({ state, onChange, onApply }: { state: { t: GalleryTemplate; look: number }; onChange: (s: { t: GalleryTemplate; look: number } | null) => void; onApply?: (look: number) => void }) {
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");
  const { t, look } = state;
  const href = t.looks[look]?.href ?? t.looks[0].href;
  return (
    <RDialog.Root open onOpenChange={(o) => !o && onChange(null)}>
      <RDialog.Portal>
        <RDialog.Overlay className="fixed inset-0 z-50 bg-[#0c0c0d]/70 backdrop-blur-sm data-[state=open]:animate-overlay-in" />
        <RDialog.Content aria-describedby={undefined} className="fixed inset-0 z-50 flex flex-col bg-[#0c0c0d] text-white data-[state=open]:animate-fade-in sm:inset-3 sm:rounded-xl sm:border sm:border-white/10">
          <header className="flex flex-wrap items-center gap-2 border-b border-white/10 px-3 py-2.5 sm:px-4">
            <RDialog.Title className="mr-auto min-w-0 truncate font-display text-[16px] font-semibold">
              {t.name} <span className="font-normal text-white/55">· {t.looks[look]?.name}</span>
            </RDialog.Title>
            <div className="flex gap-1" role="group" aria-label="Colourway">
              {t.looks.map((l, k) => (
                <button key={l.name} type="button" title={l.name} aria-label={`${l.name} colours`} aria-pressed={look === k} onClick={() => onChange({ t, look: k })} className={cn("h-7 w-7 rounded-full border-2", look === k ? "border-white" : "border-transparent")} style={{ background: l.swatch }} />
              ))}
            </div>
            <div className="hidden rounded-md border border-white/15 p-0.5 sm:flex" role="group" aria-label="Device">
              {(["desktop", "phone"] as const).map((d) => (
                <button key={d} type="button" aria-pressed={device === d} onClick={() => setDevice(d)} className={cn("flex h-8 items-center gap-1.5 rounded px-2.5 text-[12.5px]", device === d ? "bg-white text-[#0c0c0d]" : "text-white/70 hover:text-white")}>
                  {d === "desktop" ? <Monitor className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}
                  {d === "desktop" ? "Computer" : "Phone"}
                </button>
              ))}
            </div>
            <a href={href} target="_blank" rel="noopener noreferrer" className="flex h-9 items-center gap-1.5 rounded-md border border-white/15 px-3 text-[12.5px] text-white/80 hover:text-white">
              Open <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            {onApply && (
              <button type="button" onClick={() => onApply(look)} className="flex h-9 items-center rounded-md bg-brand px-3 text-[12.5px] font-semibold text-[#0c0c0d] hover:bg-brand-hover">
                Create with this template
              </button>
            )}
            <RDialog.Close className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-white/80 hover:text-white" aria-label="Close preview">
              <X className="h-4 w-4" />
            </RDialog.Close>
          </header>
          <div className="flex min-h-0 flex-1 justify-center overflow-hidden bg-[#1a1a1c] p-0 sm:p-4">
            <iframe key={href + device} src={href} title={`${t.name} preview`} className={cn("h-full border-0 bg-white transition-[width] duration-300", device === "phone" ? "w-[390px] max-w-full rounded-[22px] shadow-[0_0_0_10px_#000]" : "w-full sm:rounded-md")} />
          </div>
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}

/** Choose the website to rebuild in this template; its content stays, a new version is made. */
function ApplyDialog({ state, projects, onClose }: { state: { t: GalleryTemplate; look: number }; projects: GalleryProject[]; onClose: () => void }) {
  const router = useRouter();
  const [project, setProject] = useState(projects[0]?.id ?? "");
  const [look, setLook] = useState(state.look);
  const [pending, start] = useTransition();
  const { t } = state;
  const go = () =>
    start(async () => {
      const r = await applyTemplateAction(project, t.key, look);
      if (!r.ok) return void toast.error(r.error);
      toast.success(`${t.name} is being applied. A new version appears in a minute; the old one stays restorable.`);
      onClose();
      router.push(`/websites/${r.data.projectId}`);
    });
  return (
    <Dialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={`Use ${t.name}`}
      description="The website keeps its content and photos and is rebuilt in this design. Quality control runs again and the current version stays available under Versions."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={go} loading={pending} disabled={!project}>
            <Check className="h-4 w-4" /> Apply template
          </Button>
        </>
      }
    >
      {projects.length === 0 ? (
        <p className="text-[13.5px] text-muted">There is no website yet. New websites pick the best template automatically; once a website exists you can switch it here.</p>
      ) : (
        <div className="grid gap-4">
          <label className="grid gap-1.5 text-[13px] font-medium">
            Website
            <Select value={project} onChange={(e) => setProject(e.target.value)}>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — now {p.template}
                </option>
              ))}
            </Select>
          </label>
          <div className="grid gap-1.5 text-[13px] font-medium">
            Colours
            <div className="flex flex-wrap gap-2">
              {t.looks.map((l, k) => (
                <button key={l.name} type="button" aria-pressed={look === k} onClick={() => setLook(k)} className={cn("flex items-center gap-2 rounded-md border px-3 py-2 text-[13px]", look === k ? "border-foreground bg-surface-2" : "border-border")}>
                  <span className="h-4 w-4 rounded-full" style={{ background: l.swatch, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.12)" }} />
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}

/**
 * "Create with this template": the customer's current website is researched and a new website is
 * built from its content in this template and colourway. The result waits for approval as usual.
 */
function CreateDialog({ state, categories, onClose, onApplyInstead }: { state: { t: GalleryTemplate; look: number }; categories: GalleryCategory[]; onClose: () => void; onApplyInstead?: () => void }) {
  const router = useRouter();
  const { t } = state;
  const [look, setLook] = useState(state.look);
  const [f, setF] = useState({ websiteUrl: "", name: "", city: "", country: "Netherlands", category: t.categoryKeys[0] ?? categories[0]?.key ?? "local_service" });
  const [pending, start] = useTransition();
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((x) => ({ ...x, [k]: e.target.value }));
  const suited = new Set(t.categoryKeys);
  const go = () =>
    start(async () => {
      const r = await createFromTemplateAction({ designKey: t.key, variation: look, ...f });
      if (!r.ok) return void toast.error(r.error);
      toast.success(`${f.name} is being researched and built in ${t.name}. You will find it under Websites when it is ready for approval.`);
      onClose();
      router.push(`/websites/${r.data.projectId}`);
    });
  const input = "field-m h-10 w-full rounded-md border border-border-strong bg-surface px-3 text-[16px] outline-none focus:border-foreground/40 focus:shadow-[0_0_0_3px_var(--ring)] sm:text-[14px]";
  return (
    <Dialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={`Create with ${t.name}`}
      description="Enter the customer's current website. HOPI reads it, keeps the real content (services, hours, contact details, photos where allowed) and builds a new website in this template. Nothing is sent; the result waits for your approval."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={go} loading={pending} disabled={!f.websiteUrl.trim() || !f.name.trim() || !f.city.trim()}>
            <Check className="h-4 w-4" /> Create website
          </Button>
        </>
      }
    >
      <form className="grid gap-4" onSubmit={(e) => (e.preventDefault(), go())}>
        <label className="grid gap-1.5 text-[13px] font-medium">
          Current website of the customer
          <input className={input} type="text" inputMode="url" autoComplete="url" placeholder="bakkerijdevries.nl" value={f.websiteUrl} onChange={set("websiteUrl")} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-[13px] font-medium">
            Business name
            <input className={input} type="text" autoComplete="organization" value={f.name} onChange={set("name")} />
          </label>
          <label className="grid gap-1.5 text-[13px] font-medium">
            City
            <input className={input} type="text" autoComplete="address-level2" value={f.city} onChange={set("city")} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-[13px] font-medium">
            Sector
            <Select value={f.category} onChange={set("category")}>
              {[...categories].sort((a, b) => Number(suited.has(b.key)) - Number(suited.has(a.key))).map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                  {suited.has(c.key) ? " ✓" : ""}
                </option>
              ))}
            </Select>
          </label>
          <label className="grid gap-1.5 text-[13px] font-medium">
            Country
            <Select value={f.country} onChange={set("country")}>
              <option value="Netherlands">Netherlands</option>
              <option value="Belgium">Belgium</option>
            </Select>
          </label>
        </div>
        <div className="grid gap-1.5 text-[13px] font-medium">
          Colours
          <div className="flex flex-wrap gap-2">
            {t.looks.map((l, k) => (
              <button key={l.name} type="button" aria-pressed={look === k} onClick={() => setLook(k)} className={cn("flex items-center gap-2 rounded-md border px-3 py-2 text-[13px]", look === k ? "border-foreground bg-surface-2" : "border-border")}>
                <span className="h-4 w-4 rounded-full" style={{ background: l.swatch, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.12)" }} />
                {l.name}
              </button>
            ))}
          </div>
        </div>
        {onApplyInstead && (
          <button type="button" onClick={onApplyInstead} className="justify-self-start text-[12.5px] text-muted underline underline-offset-2 hover:text-foreground">
            Or switch a website you already made to this template
          </button>
        )}
      </form>
    </Dialog>
  );
}
