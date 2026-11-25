"use client";

import { Copy, ExternalLink, KeyRound, PlugZap, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { StatusBadge } from "@/components/app/status";
import { Badge, Button, Card, Dialog, Field, Input } from "@/components/ui";
import { timeAgo } from "@/lib/utils";
import { removeIntegrationAction, saveIntegrationAction, testIntegrationAction } from "@/server/actions/integrations";

type CardData = {
  key: string;
  name: string;
  description: string;
  secretLabel: string | null;
  configFields: { key: string; label: string }[];
  envVar: string;
  docs: string;
  usedBy: string[];
  configured: boolean;
  source: string;
  mode: string;
  hint: string | null;
  config: Record<string, string>;
  hasConfigSecret: boolean;
  status: string;
  lastSuccessAt: string | null;
  lastTestedAt: string | null;
  lastError: string | null;
  webhookUrl: string | null;
};

export function IntegrationCard({ card, canAdmin }: { card: CardData; canAdmin: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [open, setOpen] = useState(false);
  const [secret, setSecret] = useState("");
  const [config, setConfig] = useState<Record<string, string>>(card.config);

  const test = () =>
    start(async () => {
      const r = await testIntegrationAction(card.key);
      if (!r.ok) toast.error(r.error);
      else toast.success(r.data.message);
      router.refresh();
    });

  return (
    <Card className="flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-sm font-semibold">{card.name.charAt(0)}</div>
          <div>
            <p className="text-[14px] font-semibold tracking-tight">{card.name}</p>
            <p className="text-[11px] text-muted">{card.usedBy.length ? `Used by ${card.usedBy.join(", ").replace(/_/g, " ")}` : card.envVar}</p>
          </div>
        </div>
        <StatusBadge status={card.mode} />
      </div>
      <p className="mt-3 text-xs text-muted">{card.description}</p>
      <dl className="mt-4 space-y-1.5 text-xs">
        <div className="flex justify-between gap-2">
          <dt className="text-muted">Configuration</dt>
          <dd>{card.configured ? <Badge tone="success">{card.source === "database" ? "Saved key" : "Environment"}</Badge> : <Badge tone="neutral">Not configured</Badge>}</dd>
        </div>
        {card.hint && (
          <div className="flex justify-between gap-2">
            <dt className="text-muted">Key</dt>
            <dd className="font-mono">{card.hint}</dd>
          </div>
        )}
        <div className="flex justify-between gap-2">
          <dt className="text-muted">Connection</dt>
          <dd>
            <StatusBadge status={card.status} />
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted">Last successful request</dt>
          <dd>{card.lastSuccessAt ? timeAgo(card.lastSuccessAt) : "—"}</dd>
        </div>
        {card.lastError && <dd className="rounded-md bg-danger-soft px-2 py-1 text-danger">{card.lastError}</dd>}
        {card.webhookUrl && (
          <div className="pt-1">
            <dt className="mb-1 text-muted">Webhook endpoint</dt>
            <dd className="flex items-center gap-1">
              <code className="min-w-0 flex-1 truncate rounded bg-surface-2 px-1.5 py-1 text-[11.5px]">{card.webhookUrl}</code>
              <Button size="icon-sm" variant="ghost" aria-label="Copy webhook URL" onClick={() => navigator.clipboard.writeText(card.webhookUrl!).then(() => toast.success("Copied"))}>
                <Copy />
              </Button>
            </dd>
          </div>
        )}
      </dl>
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {canAdmin && (
          <Button size="sm" variant="primary" disabled={pending} onClick={test}>
            <PlugZap /> Test connection
          </Button>
        )}
        {canAdmin && card.secretLabel && (
          <Button size="sm" onClick={() => setOpen(true)}>
            <KeyRound /> {card.source === "database" ? "Update" : "Configure"}
          </Button>
        )}
        <Button size="sm" variant="ghost" asChild>
          <a href={card.docs} target="_blank" rel="noopener noreferrer">
            <ExternalLink /> Docs
          </a>
        </Button>
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={`Configure ${card.name}`}
        description="The key is encrypted before storage. Leave the key empty to keep the current one."
        footer={
          <>
            {card.source === "database" && (
              <Button
                variant="danger-ghost"
                onClick={() =>
                  start(async () => {
                    const r = await removeIntegrationAction(card.key);
                    if (!r.ok) return void toast.error(r.error);
                    toast.success("Credentials removed");
                    setOpen(false);
                    router.refresh();
                  })
                }
              >
                <Trash2 /> Remove
              </Button>
            )}
            <Button
              variant="primary"
              loading={pending}
              onClick={() =>
                start(async () => {
                  const r = await saveIntegrationAction(card.key, secret || null, config);
                  if (!r.ok) return void toast.error(r.error);
                  setSecret("");
                  setOpen(false);
                  toast.success("Saved — testing connection…");
                  const t = await testIntegrationAction(card.key);
                  if (!t.ok) toast.error(t.error);
                  else toast.success(t.data.message);
                  router.refresh();
                })
              }
            >
              Save & test
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <Field label={card.secretLabel ?? "Secret"} hint={card.hint ? `Current: ${card.hint}` : undefined}>
            <Input type="password" autoComplete="off" value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Paste key" />
          </Field>
          {card.configFields.map((f) => (
            <Field key={f.key} label={f.label} hint={/secret/i.test(f.key) && card.hasConfigSecret ? "A value is saved (hidden)." : undefined}>
              <Input type={/secret/i.test(f.key) ? "password" : "text"} value={config[f.key] ?? ""} onChange={(e) => setConfig((c) => ({ ...c, [f.key]: e.target.value }))} />
            </Field>
          ))}
        </div>
      </Dialog>
    </Card>
  );
}
