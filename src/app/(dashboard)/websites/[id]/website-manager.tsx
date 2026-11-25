"use client";

import {
  Check,
  CircleAlert,
  ExternalLink,
  History,
  Laptop,
  Loader2,
  Rocket,
  RotateCcw,
  Smartphone,
  Sparkles,
  Tablet,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Dialog, Field, Input, MockBadge, ScoreRing, Tabs, TabsContent, TabsList, TabsTrigger, Textarea } from "@/components/ui";
import { QC_PASS_SCORE } from "@/lib/constants";
import { TEMPLATE_INFO, type SiteSpec, type TemplateKey } from "@/lib/site-spec";
import { cn, timeAgo } from "@/lib/utils";
import {
  deleteWebsiteAction,
  deployPreviewAction,
  editWebsiteAction,
  improveWebsiteAction,
  regenerateWebsiteAction,
  requestPublishAction,
  restoreVersionAction,
  setWebsiteApprovalAction,
} from "@/server/actions/websites";

type QcReport = {
  score: number;
  passed: boolean;
  issues: { code: string; severity: string; message: string; viewport?: string; detail?: string }[];
  checks: { name: string; passed: boolean; detail?: string }[];
  metrics: Record<string, number>;
  durationMs: number;
};
type Version = { id: string; versionNo: number; changeSummary: string | null; instruction: string | null; qcScore: number | null; qcReport: QcReport | null; createdBy: string; isMock: boolean; createdAt: string };
type Deployment = { id: string; status: string; url: string | null; provider: string; environment: string; error: string | null; createdAt: string; versionId: string | null; githubRepo: string | null };

const PRESETS = [
  "Make this website look more premium.",
  "Use a more modern hero section.",
  "Improve mobile navigation.",
  "Make the design more suitable for luxury restaurants.",
  "Make the copy shorter and more direct.",
];
const DEVICES = [
  { key: "desktop", icon: Laptop, width: "100%" },
  { key: "tablet", icon: Tablet, width: "820px" },
  { key: "mobile", icon: Smartphone, width: "390px" },
] as const;

type Res = { ok: true } | { ok: false; error: string };

export function WebsiteManager({
  project,
  business,
  versions,
  spec,
  deployments,
  publishApproval,
  canAdmin,
}: {
  project: { id: string; slug: string; status: string; approvalStatus: string; qualityScore: number | null; templateKey: string; currentVersionId: string | null; previewUrl: string | null; updatedAt: string };
  business: { id: string; name: string; city: string | null; stage: string; isMock: boolean };
  versions: Version[];
  spec: SiteSpec | null;
  deployments: Deployment[];
  publishApproval: { id: string; status: string } | null;
  canAdmin: boolean;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [device, setDevice] = useState<(typeof DEVICES)[number]["key"]>("desktop");
  const current = versions.find((v) => v.id === project.currentVersionId) ?? versions[0];
  const [viewing, setViewing] = useState<number | null>(null);
  const [instruction, setInstruction] = useState("");
  const [publishOpen, setPublishOpen] = useState(false);
  const [domain, setDomain] = useState("");
  const [authorised, setAuthorised] = useState(false);
  const busy = ["generating", "testing", "needs_fixes"].includes(project.status);
  const shownVersion = viewing ?? current?.versionNo;
  const report = versions.find((v) => v.versionNo === shownVersion)?.qcReport ?? null;
  const shown = versions.find((v) => v.versionNo === shownVersion);
  const liveDeploy = deployments.find((d) => d.status === "ready" && d.environment === "preview");

  // While agents work on the project, refresh to show progress.
  useEffect(() => {
    if (!busy) return;
    const iv = setInterval(() => router.refresh(), 3000);
    return () => clearInterval(iv);
  }, [busy, router]);

  const run = (fn: () => Promise<Res>, msg: string, after?: () => void) =>
    start(async () => {
      const r = await fn();
      if (!r.ok) return void toast.error(r.error);
      toast.success(msg);
      after?.();
      router.refresh();
    });

  const previewSrc = `/p/${project.slug}${viewing && viewing !== current?.versionNo ? `?v=${viewing}` : ""}`;
  const frameKey = `${previewSrc}-${current?.id}-${project.updatedAt}`;

  return (
    <>
      <PageHeader
        eyebrow={<Link href="/websites" className="hover:text-foreground">← Website Builder</Link>}
        title={
          <span className="flex items-center gap-2">
            {business.name} {business.isMock && <MockBadge />}
          </span>
        }
        description={
          <span className="flex flex-wrap items-center gap-2">
            <Link href={`/businesses/${business.id}`} className="hover:text-accent">
              Business profile
            </Link>
            · {TEMPLATE_INFO[project.templateKey as TemplateKey]?.name} design system · v{current?.versionNo ?? 0} · updated {timeAgo(project.updatedAt)}
          </span>
        }
        actions={
          <>
            <StatusBadge status={project.status} />
            <StatusBadge status={project.approvalStatus} />
            <Button asChild size="sm">
              <a href={liveDeploy?.url ?? `/p/${project.slug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink /> Open in new tab
              </a>
            </Button>
          </>
        }
      />

      {busy && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-info/20 bg-info-soft px-4 py-3 text-[13px] text-info">
          <Loader2 className="h-4 w-4 animate-spin" />
          {project.status === "generating" ? "The Website Builder is working on a new version…" : project.status === "testing" ? "Quality Control is testing the latest version on desktop, tablet and mobile…" : "QC found issues — the builder is applying corrections and will re-test automatically."}
        </div>
      )}
      {project.status === "failed" && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-danger/20 bg-danger-soft px-4 py-3 text-[13px] text-danger">
          <CircleAlert className="h-4 w-4" /> This website did not pass quality control after the maximum number of corrections. It is not marked ready. Review the report, improve it or regenerate.
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-4">
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
              <div className="flex gap-1 rounded-lg bg-surface-2 p-0.5">
                {DEVICES.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => setDevice(d.key)}
                    aria-label={d.key}
                    className={cn("flex h-7 w-8 items-center justify-center rounded-md text-muted", device === d.key && "bg-surface text-foreground shadow-sm")}
                  >
                    <d.icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
              <span className="truncate text-xs text-muted">
                {previewSrc}
                {viewing && viewing !== current?.versionNo ? ` (viewing v${viewing})` : ""}
              </span>
            </div>
            <div className="flex justify-center bg-surface-3 p-3">
              {current ? (
                <iframe
                  key={frameKey}
                  src={previewSrc}
                  title={`Preview of ${business.name}`}
                  className="h-[72vh] rounded-lg border border-border bg-white shadow-[var(--shadow-md)] transition-all duration-300"
                  style={{ width: DEVICES.find((d) => d.key === device)!.width, maxWidth: "100%" }}
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div className="flex h-[50vh] items-center justify-center text-sm text-muted">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating the first version…
                </div>
              )}
            </div>
          </Card>

          <Tabs defaultValue="qc">
            <TabsList>
              <TabsTrigger value="qc">Quality report</TabsTrigger>
              <TabsTrigger value="edit">Edit content</TabsTrigger>
              <TabsTrigger value="deployments">Deployments</TabsTrigger>
            </TabsList>
            <TabsContent value="qc">
              {!report ? (
                <p className="text-xs text-muted">No quality report yet for this version.</p>
              ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <div>
                        <CardTitle>Score {report.score}/100</CardTitle>
                        <p className="text-xs text-muted">
                          {report.passed ? "Passed" : `Below the ${QC_PASS_SCORE} threshold or has critical issues`} · tested in {(report.durationMs / 1000).toFixed(1)}s
                        </p>
                      </div>
                      <ScoreRing score={report.score} size={48} />
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {report.issues.length === 0 && <p className="text-xs text-success">No issues found.</p>}
                      {report.issues.map((i, idx) => (
                        <div key={idx} className="flex gap-2 text-xs">
                          <Badge tone={i.severity === "critical" ? "danger" : i.severity === "major" ? "warning" : "neutral"}>{i.severity}</Badge>
                          <span>
                            {i.message}
                            {i.viewport ? <span className="text-subtle"> · {i.viewport}</span> : null}
                            {i.detail ? <span className="block truncate text-subtle">{i.detail}</span> : null}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Checks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1.5">
                      {report.checks.map((c, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          {c.passed ? <Check className="h-3.5 w-3.5 text-success" /> : <X className="h-3.5 w-3.5 text-danger" />}
                          <span className="flex-1">{c.name}</span>
                          {c.detail && <span className="text-subtle">{c.detail}</span>}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  {shown && (
                    <div className="grid grid-cols-3 gap-3 lg:col-span-2">
                      {(["desktop", "tablet", "mobile"] as const).map((d) => (
                        <figure key={d} className="overflow-hidden rounded-lg border border-border bg-surface">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`/api/websites/${shown.id}/screenshot/${d}`} alt={`${d} screenshot`} className="aspect-[4/3] w-full object-cover object-top" loading="lazy" />
                          <figcaption className="px-2 py-1 text-[12px] capitalize text-muted">{d}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            <TabsContent value="edit">
              {spec ? <ContentEditor key={current?.id} spec={spec} disabled={busy || pending} onSave={(s) => run(() => editWebsiteAction(project.id, s) as Promise<Res>, "Saved — a new version is being rendered and tested.")} /> : <p className="text-xs text-muted">No content yet.</p>}
            </TabsContent>
            <TabsContent value="deployments">
              {deployments.length === 0 ? (
                <p className="text-xs text-muted">Not deployed yet.</p>
              ) : (
                <ul className="space-y-2">
                  {deployments.map((d) => (
                    <li key={d.id} className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 text-xs">
                      <div className="min-w-0">
                        <p className="font-medium">
                          {d.environment} · {d.provider} · v{versions.find((v) => v.id === d.versionId)?.versionNo ?? "?"}
                        </p>
                        {d.url && (
                          <a href={d.url} target="_blank" rel="noopener noreferrer" className="block truncate text-accent hover:underline">
                            {d.url}
                          </a>
                        )}
                        {d.githubRepo && <p className="text-subtle">GitHub: {d.githubRepo}</p>}
                        {d.error && <p className="text-danger">{d.error}</p>}
                      </div>
                      <div className="text-right">
                        <StatusBadge status={d.status} />
                        <p className="mt-1 text-subtle">{timeAgo(d.createdAt)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button variant="success" disabled={project.status !== "ready" || pending || project.approvalStatus === "approved"} onClick={() => run(() => setWebsiteApprovalAction(project.id, true) as Promise<Res>, "Website approved")}>
                <Check /> Approve
              </Button>
              <Button variant="danger-ghost" disabled={pending || project.approvalStatus === "rejected"} onClick={() => run(() => setWebsiteApprovalAction(project.id, false) as Promise<Res>, "Website rejected")}>
                <X /> Reject
              </Button>
              <Button disabled={project.status !== "ready" || pending} onClick={() => run(() => deployPreviewAction(project.id) as Promise<Res>, "Deployment queued")}>
                <Rocket /> Deploy preview
              </Button>
              <Button disabled={busy || pending} onClick={() => confirm("Regenerate from scratch? (Use AI improvement to keep the current design.)") && run(() => regenerateWebsiteAction(project.id) as Promise<Res>, "Regeneration queued")}>
                <RotateCcw /> Regenerate
              </Button>
              <Button className="col-span-2" variant="secondary" disabled={project.approvalStatus !== "approved" || business.stage !== "WON" || publishApproval?.status === "pending"} onClick={() => setPublishOpen(true)}>
                <Rocket /> {publishApproval?.status === "pending" ? "Publication awaiting approval" : "Publish as official website…"}
              </Button>
              {business.stage !== "WON" && <p className="col-span-2 text-[12px] text-muted">Publishing as the official website is only possible after the business becomes a customer (stage Won) and authorises it.</p>}
              {canAdmin && (
                <Button className="col-span-2" variant="danger-ghost" size="sm" onClick={() => confirm("Delete this preview? The public link stops working.") && run(() => deleteWebsiteAction(project.id) as Promise<Res>, "Preview deleted", () => router.push("/websites"))}>
                  <Trash2 /> Delete preview
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle className="flex items-center gap-1.5">
                  <Wand2 className="h-4 w-4 text-accent" /> AI improvement
                </CardTitle>
                <p className="mt-0.5 text-xs text-muted">Edits the current version instead of regenerating it.</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea rows={3} value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder="Describe the change…" />
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button key={p} onClick={() => setInstruction(p)} className="rounded-md border border-border px-2 py-1 text-[12px] text-muted hover:border-accent hover:text-foreground">
                    {p}
                  </button>
                ))}
              </div>
              <Button variant="primary" className="w-full" disabled={busy || instruction.trim().length < 4} loading={pending} onClick={() => run(() => improveWebsiteAction(project.id, instruction) as Promise<Res>, "Improvement queued", () => setInstruction(""))}>
                <Sparkles /> Apply improvement
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5">
                <History className="h-4 w-4 text-muted" /> Version history
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {versions.map((v) => {
                const isCurrent = v.id === project.currentVersionId;
                return (
                  <div key={v.id} className={cn("rounded-lg border px-3 py-2", shownVersion === v.versionNo ? "border-accent bg-accent-soft/40" : "border-transparent hover:bg-surface-2")}>
                    <div className="flex items-center justify-between gap-2">
                      <button onClick={() => setViewing(v.versionNo)} className="text-left text-[13px] font-medium">
                        v{v.versionNo} {isCurrent && <Badge tone="accent">current</Badge>} {v.isMock && <MockBadge />}
                      </button>
                      <div className="flex items-center gap-1">
                        {v.qcScore != null && <Badge tone={v.qcScore >= QC_PASS_SCORE ? "success" : "danger"}>QC {v.qcScore}</Badge>}
                        {!isCurrent && (
                          <Button size="icon-sm" variant="ghost" aria-label={`Restore v${v.versionNo}`} title="Restore as new version" disabled={busy || pending} onClick={() => run(() => restoreVersionAction(v.id) as Promise<Res>, `Restoring v${v.versionNo}`)}>
                            <RotateCcw />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted">{v.instruction ? `“${v.instruction}” — ` : ""}{v.changeSummary}</p>
                    <p className="text-[12px] text-subtle">
                      {v.createdBy.replace("_", " ")} · {timeAgo(v.createdAt)}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog
        open={publishOpen}
        onOpenChange={setPublishOpen}
        title="Request publication as the official website"
        description="This creates an approval request. Only after an administrator approves it does the Deployment agent publish to production and connect the domain."
        footer={
          <Button variant="primary" loading={pending} disabled={!authorised} onClick={() => run(() => requestPublishAction(project.id, domain, authorised) as Promise<Res>, "Publication requested — awaiting approval", () => setPublishOpen(false))}>
            Request approval
          </Button>
        }
      >
        <div className="space-y-3">
          <Field label="Customer domain (optional)" hint="The business must own this domain and point its DNS to Vercel.">
            <Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="www.example.nl" />
          </Field>
          <label className="flex items-start gap-2 text-xs">
            <input type="checkbox" className="mt-0.5 accent-[var(--accent)]" checked={authorised} onChange={(e) => setAuthorised(e.target.checked)} />
            The business has authorised us in writing to publish this website as their official website{domain ? " and to connect this domain" : ""}.
          </label>
        </div>
      </Dialog>
    </>
  );
}

function ContentEditor({ spec, onSave, disabled }: { spec: SiteSpec; onSave: (s: SiteSpec) => void; disabled: boolean }) {
  const [s, setS] = useState<SiteSpec>(structuredClone(spec));
  const [imgUrl, setImgUrl] = useState("");
  const [imgAlt, setImgAlt] = useState("");
  const [imgOk, setImgOk] = useState(false);
  const [json, setJson] = useState<string | null>(null);
  const upd = (fn: (d: SiteSpec) => void) =>
    setS((prev) => {
      const d = structuredClone(prev);
      fn(d);
      return d;
    });
  const save = () => {
    if (json != null) {
      try {
        onSave(JSON.parse(json));
      } catch {
        toast.error("The JSON is not valid.");
      }
      return;
    }
    onSave(s);
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Page title (SEO)">
          <Input value={s.meta.title} maxLength={70} onChange={(e) => upd((d) => void (d.meta.title = e.target.value))} />
        </Field>
        <Field label="Meta description">
          <Input value={s.meta.description} maxLength={170} onChange={(e) => upd((d) => void (d.meta.description = e.target.value))} />
        </Field>
        <Field label="Hero headline">
          <Input value={s.hero.headline} maxLength={90} onChange={(e) => upd((d) => void (d.hero.headline = e.target.value))} />
        </Field>
        <Field label="Hero eyebrow">
          <Input value={s.hero.eyebrow} maxLength={60} onChange={(e) => upd((d) => void (d.hero.eyebrow = e.target.value))} />
        </Field>
        <Field label="Hero subheadline" className="md:col-span-2">
          <Textarea rows={2} value={s.hero.subheadline} maxLength={240} onChange={(e) => upd((d) => void (d.hero.subheadline = e.target.value))} />
        </Field>
        <Field label="Primary colour">
          <div className="flex gap-2">
            <input type="color" value={s.theme.primary} onChange={(e) => upd((d) => void (d.theme.primary = e.target.value))} className="h-9 w-12 rounded border border-border" aria-label="Primary colour" />
            <Input value={s.theme.primary} onChange={(e) => upd((d) => void (d.theme.primary = e.target.value))} />
          </div>
        </Field>
        <Field label="Accent colour">
          <div className="flex gap-2">
            <input type="color" value={s.theme.accent} onChange={(e) => upd((d) => void (d.theme.accent = e.target.value))} className="h-9 w-12 rounded border border-border" aria-label="Accent colour" />
            <Input value={s.theme.accent} onChange={(e) => upd((d) => void (d.theme.accent = e.target.value))} />
          </div>
        </Field>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium">Sections</p>
        {s.sections.map((sec, i) => (
          <div key={sec.id} className="grid gap-2 rounded-lg border border-border p-3 md:grid-cols-[120px_1fr]">
            <span className="text-xs text-muted">{sec.type}</span>
            <Input value={sec.title} onChange={(e) => upd((d) => void (d.sections[i].title = e.target.value))} aria-label={`${sec.type} title`} />
            {sec.type === "about" && (
              <Textarea className="md:col-start-2" rows={3} value={sec.paragraphs.join("\n\n")} onChange={(e) => upd((d) => void ((d.sections[i] as typeof sec).paragraphs = e.target.value.split(/\n{2,}/).filter(Boolean).slice(0, 4)))} />
            )}
            {"intro" in sec && <Input className="md:col-start-2" value={sec.intro} placeholder="Intro" onChange={(e) => upd((d) => void ((d.sections[i] as typeof sec).intro = e.target.value))} />}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border p-3">
        <p className="mb-2 text-xs font-medium">Use an authorised photo as hero image</p>
        <div className="grid gap-2 md:grid-cols-2">
          <Input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder="https://… (image the business owns or licensed)" />
          <Input value={imgAlt} onChange={(e) => setImgAlt(e.target.value)} placeholder="Describe the image (alt text)" />
        </div>
        <label className="mt-2 flex items-start gap-2 text-xs">
          <input type="checkbox" checked={imgOk} onChange={(e) => setImgOk(e.target.checked)} className="mt-0.5 accent-[var(--accent)]" />I confirm we have permission to use this image (owned by the business or properly licensed).
        </label>
        <Button
          size="sm"
          className="mt-2"
          disabled={!imgOk || !/^https:\/\//.test(imgUrl) || imgAlt.length < 3}
          onClick={() =>
            upd((d) => {
              d.images = [...d.images.filter((x) => x.key !== "hero-photo"), { key: "hero-photo", src: imgUrl, alt: imgAlt, license: "authorised", credit: null }];
              d.hero.image = "hero-photo";
            })
          }
        >
          Use as hero image
        </Button>
      </div>
      <details className="text-xs">
        <summary className="cursor-pointer text-muted">Advanced: edit full spec as JSON</summary>
        <Textarea className="mt-2 font-mono text-[12px]" rows={14} value={json ?? JSON.stringify(s, null, 2)} onChange={(e) => setJson(e.target.value)} />
      </details>
      <div className="flex justify-end">
        <Button variant="primary" disabled={disabled} onClick={save}>
          Save as new version
        </Button>
      </div>
    </div>
  );
}
