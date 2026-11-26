"use client";

import { Copy, ExternalLink, KeyRound, PlugZap, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Badge, Button, Card, Dialog, Field, Input } from "@/components/ui";
import { AGENT_META, type AgentKey } from "@/lib/constants";
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
  /** One truthful state: only "connected" after a real request succeeded. */
  state: "connected" | "failed" | "untested" | "mock" | "none";
};

const STATE: Record<CardData["state"], { label: string; tone: "success" | "danger" | "warning" | "neutral"; explain: string }> = {
  connected: { label: "Connected", tone: "success", explain: "Verified with a real request." },
  failed: { label: "Connection failed", tone: "danger", explain: "The last test request was rejected. Check the key and test again." },
  untested: { label: "Key saved, not verified", tone: "warning", explain: "A key is stored, but it has not been tested yet. Press “Test connection”." },
  mock: { label: "Not connected", tone: "warning", explain: "Development mock mode: agents get clearly labelled MOCK data instead of calling this service." },
  none: { label: "Not connected", tone: "neutral", explain: "Agents that need this service will pause and tell you." },
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
    <Card className={`flex flex-col p-4 sm:p-5 ${card.state === "failed" ? "border-[rgba(255,77,97,0.25)]" : card.state === "connected" ? "border-[rgba(0,255,120,0.2)]" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-[16px] font-semibold ${card.state === "connected" ? "border-[rgba(0,255,120,0.35)] bg-accent-soft text-accent" : "border-border bg-surface-2 text-muted"}`}>{card.name.charAt(0)}</div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold tracking-tight">{card.name}</p>
            <p className="truncate text-[12px] text-muted">{card.usedBy.length ? `Used by ${card.usedBy.map((k) => AGENT_META[k as AgentKey]?.name ?? k).join(", ")}` : "Infrastructure"}</p>
          </div>
        </div>
        <Badge tone={STATE[card.state].tone} className="shrink-0">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
          {STATE[card.state].label}
        </Badge>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-muted">{card.description}</p>
      <p className="mt-2 text-[12.5px] leading-relaxed text-subtle">{STATE[card.state].explain}</p>
      <dl className="mt-4 space-y-2 text-[12.5px]">
        <div className="flex justify-between gap-2">
          <dt className="text-muted">Configuration</dt>
          <dd>{card.configured ? <Badge tone="success">{card.source === "database" ? "Saved key" : "Environment"}</Badge> : <Badge tone="neutral">Not configured</Badge>}</dd>
        </div>
        {card.hint && (
          <div className="flex justify-between gap-2">
            <dt className="text-muted">Key</dt>
            <dd className="term">{card.hint}</dd>
          </div>
        )}
        <div className="flex justify-between gap-2">
          <dt className="text-muted">Last tested</dt>
          <dd suppressHydrationWarning>{card.lastTestedAt ? timeAgo(card.lastTestedAt) : "Never"}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted">Last successful request</dt>
          <dd suppressHydrationWarning>{card.lastSuccessAt ? timeAgo(card.lastSuccessAt) : "—"}</dd>
        </div>
        {card.lastError && card.state === "failed" && <dd className="rounded-lg bg-danger-soft px-2.5 py-1.5 leading-relaxed text-danger">{card.lastError}</dd>}
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
          <Button size="sm" variant={card.configured ? "primary" : "secondary"} disabled={pending || !card.configured} title={card.configured ? undefined : "Add a key first"} onClick={test}>
            <PlugZap /> Test connection
          </Button>
        )}
        {canAdmin && card.secretLabel && (
          <Button size="sm" onClick={() => setOpen(true)}>
            <KeyRound /> {card.source === "database" ? "Update key" : "Add key"}
          </Button>
        )}
        <Button size="sm" variant="ghost" asChild>
          <a href={card.docs} target="_blank" rel="noopener noreferrer">
            <ExternalLink /> Get a key
          </a>
        </Button>
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={`Connect ${card.name}`}
        description="Paste the key from the service's website. It is encrypted before it is stored and never shown again. Leave the field empty to keep the current key."
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
