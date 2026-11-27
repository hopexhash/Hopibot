"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Field, Input, Switch, Textarea } from "@/components/ui";
import { runSeoAuditAction, saveSeoPageAction, saveSeoVerificationAction } from "@/server/actions/seo";

/** Runs the site audit now (it reads every page of the live website; takes about half a minute). */
export function RunAuditButton({ canAdmin, label = "Run audit now" }: { canAdmin: boolean; label?: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button
      variant="primary"
      loading={pending}
      disabled={!canAdmin}
      onClick={() =>
        start(async () => {
          const r = await runSeoAuditAction();
          if (!r.ok) return void toast.error(r.error);
          toast.success(`Audit done: ${r.data.counts.error} errors, ${r.data.counts.warning} warnings.`);
          router.refresh();
        })
      }
    >
      <RefreshCw className="h-4 w-4" /> {label}
    </Button>
  );
}

export function BingForm({ value, canAdmin }: { value: string; canAdmin: boolean }) {
  const router = useRouter();
  const [v, setV] = useState(value);
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
      <Field label="Bing Webmaster Tools verification code" hint="In Bing Webmaster Tools choose “HTML Meta Tag” and paste only the content value of the msvalidate.01 tag.">
        <Input value={v} onChange={(e) => setV(e.target.value)} disabled={!canAdmin} placeholder="e.g. 1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D" />
      </Field>
      <Button
        loading={pending}
        disabled={!canAdmin || v === value}
        onClick={() =>
          start(async () => {
            const r = await saveSeoVerificationAction(v);
            if (!r.ok) return void toast.error(r.error);
            toast.success("Saved. The tag is on the website within a few minutes.");
            router.refresh();
          })
        }
      >
        Save
      </Button>
    </div>
  );
}

type Override = { title: string; description: string; canonical: string; noindex: boolean };

/** Editor for one page: fields left empty keep the page's own title, description and canonical. */
export function PageEditor({ path, current, override, canAdmin }: { path: string; current: { title: string; description: string }; override?: Override; canAdmin: boolean }) {
  const router = useRouter();
  const [o, setO] = useState<Override>(override ?? { title: "", description: "", canonical: "", noindex: false });
  const [pending, start] = useTransition();
  const t = o.title || current.title;
  const d = o.description || current.description;
  return (
    <div className="grid gap-3">
      <Field label={`SEO title (${t.length}/60)`} hint={current.title ? `Page's own: ${current.title}` : "Run the audit to see the page's own title."}>
        <Input value={o.title} maxLength={60} placeholder={current.title} onChange={(e) => setO({ ...o, title: e.target.value })} disabled={!canAdmin} />
      </Field>
      <Field label={`Meta description (${d.length}/155)`} hint={current.description ? `Page's own: ${current.description}` : undefined}>
        <Textarea rows={3} value={o.description} maxLength={320} placeholder={current.description} onChange={(e) => setO({ ...o, description: e.target.value })} disabled={!canAdmin} />
      </Field>
      <Field label="Canonical URL" hint={`Empty = this page itself (${path}). Only set this when another page should rank instead.`}>
        <Input value={o.canonical} placeholder={path} onChange={(e) => setO({ ...o, canonical: e.target.value })} disabled={!canAdmin} />
      </Field>
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2.5">
        <div>
          <p className="text-[13px] font-medium">Hide from search engines (noindex)</p>
          <p className="text-xs text-muted">The page stays online but leaves the sitemap and asks search engines not to index it.</p>
        </div>
        <Switch label="Hide from search engines" checked={o.noindex} onCheckedChange={(v) => setO({ ...o, noindex: v })} disabled={!canAdmin} />
      </div>
      {/* Preview of how the result could look in Google (an approximation, not Google's own rendering). */}
      <div className="rounded-xl border border-border bg-surface-2 p-3">
        <p className="truncate text-xs text-muted">wearehopi.nl{path === "/" ? "" : path.replace(/\//g, " › ").replace(/^ › /, " › ")}</p>
        <p className="truncate text-[15px] text-[#8ab4f8]">{t.length > 60 ? `${t.slice(0, 58)}…` : t}</p>
        <p className="line-clamp-2 text-[13px] text-muted">{d.length > 158 ? `${d.slice(0, 155)}…` : d}</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="primary"
          loading={pending}
          disabled={!canAdmin}
          onClick={() =>
            start(async () => {
              const r = await saveSeoPageAction(path, o);
              if (!r.ok) return void toast.error(r.error);
              toast.success("Saved. The live page is updated within a few minutes.");
              router.refresh();
            })
          }
        >
          Save
        </Button>
        {override && (
          <Button
            disabled={!canAdmin || pending}
            onClick={() => {
              const empty = { title: "", description: "", canonical: "", noindex: false };
              setO(empty);
              start(async () => {
                const r = await saveSeoPageAction(path, empty);
                if (!r.ok) return void toast.error(r.error);
                toast.success("Back to the page's own values.");
                router.refresh();
              });
            }}
          >
            Reset to page defaults
          </Button>
        )}
      </div>
    </div>
  );
}
