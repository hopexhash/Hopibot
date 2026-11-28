"use client";

import { ArrowUp, ArrowUpRight, Check, CircleAlert, LayoutGrid, Loader2, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { consoleMessageAction, consoleStartObjectiveAction, consoleStartWebsiteAction, consoleStatusAction, type ConsoleProposal } from "@/server/actions/console";

type Option = { key: string; label: string };
type Template = { key: string; name: string; industry: string };
type Status = { step: string; status: string; projectId: string | null; projectStatus: string | null; score: number | null; error: string | null };
type Msg = {
  id: string;
  role: "user" | "agent";
  text: string;
  proposal?: ConsoleProposal | null;
  started?: { businessId?: string; projectId?: string | null; runId?: string; existing?: boolean };
  status?: Status;
  error?: boolean;
};

const STORE = "hopi-console-v1";
const EXAMPLES = ["Make a website for restaurantolijfje.nl", "Maak een website voor bakkerijdevries.nl in Zondag", "Find 20 hairdressers in Utrecht with an outdated website"];
const uid = () => Math.random().toString(36).slice(2, 10);

/** What the agents are doing for one business, in plain words, from the real task status. */
function describe(s: Status | undefined): { text: string; done: boolean; tone: "busy" | "ok" | "bad" } {
  if (!s) return { text: "Queued for the agents…", done: false, tone: "busy" };
  if (s.status === "FAILED") return { text: `Stopped: ${s.error ?? "a step failed"}. Open the website page to retry.`, done: true, tone: "bad" };
  if (s.projectStatus === "ready" && !["RUNNING", "PENDING"].includes(s.status)) return { text: `Ready for your approval${s.score != null ? ` · quality score ${s.score}` : ""}.`, done: true, tone: "ok" };
  if (s.projectStatus === "failed") return { text: "The website could not be built. Open the website page to see why.", done: true, tone: "bad" };
  if (s.status === "WAITING_FOR_APPROVAL") return { text: "Waiting for your approval (budget or limit). See Approvals.", done: false, tone: "busy" };
  if (s.status === "PENDING") return { text: s.step.includes("research") ? "Queued: the research agent starts shortly…" : "Queued for the next agent…", done: false, tone: "busy" };
  if (s.step.includes("research")) return { text: "Research agent is reading the current website…", done: false, tone: "busy" };
  if (s.step.includes("test")) return { text: "Quality control is testing on phone, tablet and computer…", done: false, tone: "busy" };
  return { text: "Website builder is building the new website…", done: false, tone: "busy" };
}

export function ConsoleChat({ userName, categories, templates }: { userName: string | null; categories: Option[]; templates: Template[] }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [pending, start] = useTransition();
  const end = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLTextAreaElement>(null);

  // The conversation is kept in this browser only, as a convenience.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) ?? "[]") as Msg[];
      if (Array.isArray(saved)) setMsgs(saved.slice(-60));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(msgs.slice(-60)));
    } catch {}
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs]);

  // Live progress of started websites, from the task table (every 5 seconds while something runs).
  const watching = msgs.filter((m) => m.started?.businessId && !describe(m.status).done).map((m) => m.started!.businessId!);
  const key = [...new Set(watching)].join(",");
  useEffect(() => {
    if (!key) return;
    let stop = false;
    const tick = async () => {
      const r = await consoleStatusAction(key.split(","));
      if (stop || !r.ok) return;
      setMsgs((all) => all.map((m) => (m.started?.businessId && r.data[m.started.businessId] ? { ...m, status: r.data[m.started.businessId] } : m)));
    };
    void tick();
    const t = setInterval(tick, 5000);
    return () => {
      stop = true;
      clearInterval(t);
    };
  }, [key]);

  const send = (value = text) => {
    const v = value.trim();
    if (!v || pending) return;
    setText("");
    setMsgs((m) => [...m, { id: uid(), role: "user", text: v }]);
    start(async () => {
      const r = await consoleMessageAction(v);
      setMsgs((m) => [...m, r.ok ? { id: uid(), role: "agent", text: r.data.reply, proposal: r.data.proposal } : { id: uid(), role: "agent", text: r.error, error: true }]);
      box.current?.focus();
    });
  };
  const update = (id: string, patch: Partial<Msg>) => setMsgs((all) => all.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const empty = msgs.length === 0;
  return (
    <div className="flex h-[100dvh] flex-col bg-[#f2eee6] text-[#0c0c0d]">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/console" className="font-display text-[22px] font-bold tracking-[-0.04em]">
          HOPI<span className="text-brand">.</span>
        </Link>
        <div className="flex items-center gap-2">
          {msgs.length > 0 && (
            <button type="button" onClick={() => setMsgs([])} className="flex h-10 items-center gap-1.5 rounded-full px-3 text-[13px] text-[#55534d] hover:bg-black/5">
              <RotateCcw className="h-4 w-4" /> Clear
            </button>
          )}
          <Link href="/command" className="flex h-10 items-center gap-1.5 rounded-full border border-black/15 px-4 text-[13px] font-medium hover:bg-black/5">
            <LayoutGrid className="h-4 w-4" /> Dashboard
          </Link>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-8">
        <div className={cn("mx-auto flex max-w-3xl flex-col gap-5 pb-6", empty ? "h-full justify-center" : "pt-4")}>
          {empty ? (
            <div className="text-center">
              <h1 className="font-display text-[clamp(34px,6vw,64px)] font-semibold leading-[1.02] tracking-[-0.035em]">
                {userName ? `Hi ${userName}.` : "Hi."} What should the agents do?
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-[16px] text-[#55534d]">Type a lead you found yourself, with its website. The agents research it and build a new website. You check everything before it starts and before anything goes out.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {EXAMPLES.map((e) => (
                  <button key={e} type="button" onClick={() => send(e)} className="rounded-full border border-black/15 bg-white/60 px-4 py-2.5 text-[14px] hover:bg-white">
                    {e}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            msgs.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="ml-auto max-w-[85%] rounded-[22px] rounded-br-md bg-[#0c0c0d] px-5 py-3.5 text-[16px] text-[#f2eee6]">
                  {m.text}
                </div>
              ) : (
                <div key={m.id} className="max-w-[94%]">
                  <div className={cn("rounded-[22px] rounded-bl-md border px-5 py-4 text-[15.5px] leading-relaxed", m.error ? "border-[#d93025]/30 bg-[#fdecea]" : "border-black/10 bg-white")}>
                    {m.text}
                    {m.proposal && !m.started && <Proposal p={m.proposal} categories={categories} templates={templates} onStarted={(s) => update(m.id, { started: s })} />}
                    {m.started && <Started m={m} />}
                  </div>
                </div>
              ),
            )
          )}
          {pending && (
            <div className="flex items-center gap-2 text-[14px] text-[#55534d]">
              <Loader2 className="h-4 w-4 animate-spin" /> Reading your message…
            </div>
          )}
          <div ref={end} />
        </div>
      </main>

      <form
        className="px-3 pb-[max(14px,env(safe-area-inset-bottom))] pt-2 sm:px-8"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-[28px] border border-black/15 bg-white p-2 shadow-[0_10px_40px_-18px_rgba(0,0,0,.35)] focus-within:border-black/40">
          <label htmlFor="console-input" className="sr-only">
            Message to the agents
          </label>
          <textarea
            id="console-input"
            ref={box}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Type a website or a request…"
            className="max-h-48 min-h-[52px] flex-1 resize-none bg-transparent px-4 py-3.5 text-[17px] outline-none placeholder:text-[#8a877f]"
          />
          <button type="submit" disabled={!text.trim() || pending} aria-label="Send" className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-brand text-[#0c0c0d] transition-opacity disabled:opacity-35">
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

function Proposal({ p, categories, templates, onStarted }: { p: ConsoleProposal; categories: Option[]; templates: Template[]; onStarted: (s: Msg["started"]) => void }) {
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const [f, setF] = useState(p.kind === "website" ? { name: p.name, city: p.city, category: p.category, country: p.country, designKey: p.designKey ?? "" } : null);
  const field = "h-11 w-full rounded-xl border border-black/15 bg-[#faf8f3] px-3 text-[16px] outline-none focus:border-black/50";
  if (p.kind === "objective")
    return (
      <div className="mt-4 rounded-2xl bg-[#f6f3ec] p-4">
        <p className="font-medium">{p.summary}</p>
        <p className="mt-1 text-[13.5px] text-[#55534d]">Steps: {p.plan.actions.join(" → ") || "discovery only"}{p.costEstimate ? ` · ${p.costEstimate}` : ""}. Emails are only drafted, never sent without your approval.</p>
        {err && <p className="mt-2 text-[13.5px] text-[#b3261e]">{err}</p>}
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            start(async () => {
              const r = await consoleStartObjectiveAction(p.objective, p.plan);
              if (!r.ok) return setErr(r.error);
              onStarted({ runId: r.data.runId });
            })
          }
          className="mt-3 flex h-12 items-center gap-2 rounded-full bg-[#0c0c0d] px-6 text-[15px] font-medium text-white disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Start
        </button>
      </div>
    );
  if (!f) return null;
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="mt-4 grid gap-3 rounded-2xl bg-[#f6f3ec] p-4">
      <p className="text-[13px] text-[#55534d]">
        {p.url.replace(/^https?:\/\//, "")} · details {p.source === "address only" ? "guessed from the address" : `read from the ${p.source}`}, please check
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-[13px] font-medium">
          Business name
          <input className={field} value={f.name} onChange={set("name")} />
        </label>
        <label className="grid gap-1 text-[13px] font-medium">
          City
          <input className={field} value={f.city} onChange={set("city")} placeholder="Required" />
        </label>
        <label className="grid gap-1 text-[13px] font-medium">
          Sector
          <select className={field} value={f.category} onChange={set("category")}>
            <option value="">Choose…</option>
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-[13px] font-medium">
          Country
          <select className={field} value={f.country} onChange={set("country")}>
            <option value="Netherlands">Netherlands</option>
            <option value="Belgium">Belgium</option>
          </select>
        </label>
        <label className="grid gap-1 text-[13px] font-medium sm:col-span-2">
          Template
          <select className={field} value={f.designKey} onChange={set("designKey")}>
            <option value="">Best fit for the sector (automatic)</option>
            {templates.map((t) => (
              <option key={t.key} value={t.key}>
                {t.name} · {t.industry}
              </option>
            ))}
          </select>
        </label>
      </div>
      {err && <p className="text-[13.5px] text-[#b3261e]">{err}</p>}
      <button
        type="button"
        disabled={pending || !f.name.trim() || !f.city.trim() || !f.category}
        onClick={() =>
          start(async () => {
            setErr(null);
            const r = await consoleStartWebsiteAction({ websiteUrl: p.url, name: f.name, city: f.city, category: f.category, country: f.country, designKey: f.designKey || null });
            if (!r.ok) return setErr(r.error);
            onStarted({ businessId: r.data.businessId, projectId: r.data.projectId, existing: r.data.existing });
          })
        }
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0c0c0d] px-6 text-[15px] font-medium text-white disabled:opacity-40 sm:w-auto sm:justify-self-start"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Start
      </button>
    </div>
  );
}

function Started({ m }: { m: Msg }) {
  const s = m.started!;
  if (s.runId)
    return (
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-[#eef6ee] p-4 text-[14.5px]">
        <Check className="h-4 w-4 text-[#1e7a3c]" /> Started. The agents work through the plan in the background.
        <Link href="/command" className="flex items-center gap-1 font-medium underline underline-offset-2">
          Follow it in the dashboard <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  const d = describe(m.status);
  const projectId = m.status?.projectId ?? s.projectId;
  return (
    <div className={cn("mt-4 grid gap-2 rounded-2xl p-4 text-[14.5px]", d.tone === "bad" ? "bg-[#fdecea]" : d.tone === "ok" ? "bg-[#eef6ee]" : "bg-[#f6f3ec]")}>
      {s.existing && <p className="text-[13px] text-[#55534d]">This business was already in your CRM; its record is used.</p>}
      <p className="flex items-center gap-2 font-medium">
        {d.tone === "busy" ? <Loader2 className="h-4 w-4 animate-spin" /> : d.tone === "ok" ? <Check className="h-4 w-4 text-[#1e7a3c]" /> : <CircleAlert className="h-4 w-4 text-[#b3261e]" />}
        {d.text}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13.5px]">
        {projectId && (
          <Link href={`/websites/${projectId}`} className="flex items-center gap-1 font-medium underline underline-offset-2">
            Open the website <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        )}
        {s.businessId && (
          <Link href={`/businesses/${s.businessId}`} className="flex items-center gap-1 underline underline-offset-2">
            Business in CRM <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
