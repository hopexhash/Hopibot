"use client";

import { Check, Expand, Loader2, Monitor, Smartphone } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { eur, priceOrder, type Catalog, type CatalogAddon } from "@/lib/catalog";

type S = Record<string, unknown> & {
  desktop: string; mobile: string; fullscreen: string; popular: string; oneTime: string; perMonth: string; planTitle: string; planSub: string; noPlan: string; noPlanSub: string;
  addonsTitle: string; recommended: string; more: string; onRequest: string; per: string; summary: string; totalOnce: string; totalMonthly: string; yourDetails: string; name: string;
  email: string; phone: string; note: string; payNow: string; request: string; payHelp: string; requestHelp: string; sending: string; thanksTitle: string; thanksBody: string; quoteNote: string;
  pricingTitle: string; pricingSub: string;
};

/** Live preview of the generated website with a desktop / phone toggle. */
export function PreviewFrame({ slug, title, s }: { slug: string; title: string; s: S }) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let first = true;
    const ro = new ResizeObserver(() => {
      setScale(Math.min(1, el.clientWidth / 1280));
      // Phones start on the phone view: that is how most of their customers will see it.
      if (first && window.innerWidth < 640) setDevice("mobile");
      first = false;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const tab = (d: "desktop" | "mobile", label: string, Icon: typeof Monitor) => (
    <button type="button" onClick={() => setDevice(d)} aria-pressed={device === d} className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition ${device === d ? "bg-[var(--ink)] text-white" : "text-[var(--ink)] hover:bg-black/5"}`}>
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-full border border-black/10 bg-white p-1">
          {tab("desktop", s.desktop, Monitor)}
          {tab("mobile", s.mobile, Smartphone)}
        </div>
        <a href={`/p/${slug}`} target="_blank" rel="noopener" className="flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-[var(--ink)] hover:border-black/30">
          <Expand className="h-4 w-4" /> {s.fullscreen}
        </a>
      </div>
      <div ref={box} className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_40px_80px_-40px_rgba(0,0,0,.35)]">
        <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#f1f1ef] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
        </div>
        {device === "desktop" ? (
          <div style={{ height: Math.round(760 * scale) }} className="relative">
            <iframe src={`/p/${slug}`} title={title} className="absolute left-0 top-0 origin-top-left border-0" style={{ width: 1280, height: 760, transform: `scale(${scale})` }} />
          </div>
        ) : (
          <div className="flex justify-center bg-[#e9e9e6] py-6">
            <div className="overflow-hidden rounded-[34px] border-[9px] border-[#111] bg-white shadow-xl" style={{ width: "min(320px, 86%)" }}>
              <iframe src={`/p/${slug}`} title={title} className="block w-full border-0" style={{ height: 600 }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Radio({ checked, onChange, children, name, flag }: { checked: boolean; onChange: () => void; children: React.ReactNode; name: string; flag?: string }) {
  return (
    <label className={`relative flex cursor-pointer flex-col rounded-2xl border-2 bg-white p-5 transition ${checked ? "border-[var(--accent)] shadow-[0_18px_40px_-24px_var(--accent)]" : "border-black/10 hover:border-black/25"}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      {flag && <span className="absolute -top-3 left-5 rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--on-accent)]">{flag}</span>}
      {children}
      <span className={`absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full border-2 ${checked ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]" : "border-black/20"}`}>{checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}</span>
    </label>
  );
}

/** Package / care plan / add-on selection with a live total. The server recalculates every price. */
export function Configurator({ slug, catalog, recommended, paymentsLive, s, vatLine }: { slug: string; catalog: Catalog; recommended: string[]; paymentsLive: boolean; s: S; vatLine: string }) {
  const packages = catalog.packages.filter((p) => p.enabled && p.priceCents !== null);
  const plans = catalog.plans.filter((p) => p.enabled && p.priceCents !== null);
  const addons = catalog.addons.filter((a) => a.enabled);
  const [pkg, setPkg] = useState((packages.find((p) => p.featured) ?? packages[0])?.key ?? "");
  const [plan, setPlan] = useState<string | null>(plans[0]?.key ?? null);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const priced = useMemo(() => priceOrder(catalog, { packageKey: pkg, planKey: plan, addons: picked }), [catalog, pkg, plan, picked]);
  const rec = addons.filter((a) => recommended.includes(a.key));
  const rest = addons.filter((a) => !recommended.includes(a.key));

  const toggle = (a: CatalogAddon) => setPicked((p) => (p[a.key] ? Object.fromEntries(Object.entries(p).filter(([k]) => k !== a.key)) : { ...p, [a.key]: 1 }));
  const addonRow = (a: CatalogAddon) => {
    const on = Boolean(picked[a.key]);
    return (
      <div key={a.key} className={`flex items-center gap-3 rounded-xl border bg-white p-4 transition ${on ? "border-[var(--accent)]" : "border-black/10"}`}>
        <button type="button" role="switch" aria-checked={on} aria-label={a.name} onClick={() => toggle(a)} className={`relative h-7 w-12 flex-none rounded-full transition ${on ? "bg-[var(--accent)]" : "bg-black/15"}`}>
          <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-[var(--ink)]">{a.name}</p>
          <p className="text-[13px] leading-snug text-black/60">{a.description}</p>
        </div>
        {on && a.perUnit && (
          <input type="number" min={1} max={20} value={picked[a.key]} aria-label={`${a.name} — ${a.unit}`} onChange={(e) => setPicked((p) => ({ ...p, [a.key]: Math.max(1, Math.min(20, Number(e.target.value) || 1)) }))} className="h-10 w-14 rounded-lg border border-black/15 text-center text-sm" />
        )}
        <p className="flex-none text-right text-sm font-semibold text-[var(--ink)]">
          {a.priceCents === null ? <span className="font-medium text-black/55">{s.onRequest}</span> : eur(a.priceCents)}
          {a.priceCents !== null && a.perUnit && <span className="block text-[11px] font-normal text-black/55">{s.per} {a.unit}</span>}
          {a.priceCents !== null && a.kind === "monthly" && <span className="block text-[11px] font-normal text-black/55">{s.perMonth}</span>}
        </p>
      </div>
    );
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/demo/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, packageKey: pkg, planKey: plan, addons: picked, ...form }) });
      const data = (await res.json()) as { ok: boolean; mode?: string; url?: string; error?: string };
      if (!data.ok) throw new Error(data.error || "Something went wrong.");
      if (data.mode === "checkout" && data.url) {
        window.location.href = data.url;
        return;
      }
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  if (state === "done")
    return (
      <div className="rounded-3xl border border-black/10 bg-white p-8 text-center sm:p-12">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)]">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-[var(--ink)]">{s.thanksTitle}</h3>
        <p className="mx-auto mt-2 max-w-md text-black/65">{s.thanksBody}</p>
      </div>
    );

  const input = "mt-1.5 h-12 w-full rounded-xl border border-black/15 bg-white px-3.5 text-base text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/15";
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
      <div className="min-w-0 space-y-10">
        <fieldset>
          <legend className="sr-only">{s.pricingTitle}</legend>
          <div className="grid gap-4 md:grid-cols-3">
            {packages.map((p) => (
              <Radio key={p.key} name="package" checked={pkg === p.key} onChange={() => setPkg(p.key)} flag={p.featured ? s.popular : undefined}>
                <span className="text-lg font-semibold text-[var(--ink)]">{p.name}</span>
                <span className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-3xl font-semibold tracking-tight text-[var(--ink)]">{eur(p.priceCents!)}</span>
                  <span className="text-sm text-black/55">{s.oneTime}</span>
                </span>
                <span className="mt-2 text-[13.5px] leading-snug text-black/60">{p.description}</span>
                <ul className="mt-4 space-y-2 border-t border-black/10 pt-4">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 text-[14px] text-black/75">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-[var(--accent-text)]" /> {f}
                    </li>
                  ))}
                </ul>
              </Radio>
            ))}
          </div>
        </fieldset>

        {plans.length > 0 && (
          <fieldset>
            <legend className="text-xl font-semibold text-[var(--ink)]">{s.planTitle}</legend>
            <p className="mb-4 mt-1 text-sm text-black/60">{s.planSub}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {plans.map((p) => (
                <Radio key={p.key} name="plan" checked={plan === p.key} onChange={() => setPlan(p.key)}>
                  <span className="pr-8 font-semibold text-[var(--ink)]">{p.name}</span>
                  <span className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-semibold text-[var(--ink)]">{eur(p.priceCents!)}</span>
                    <span className="text-sm text-black/55">{s.perMonth}</span>
                  </span>
                  <span className="mt-2 text-[13px] leading-snug text-black/60">{p.features.join(" · ")}</span>
                </Radio>
              ))}
              <Radio name="plan" checked={plan === null} onChange={() => setPlan(null)}>
                <span className="pr-8 font-semibold text-[var(--ink)]">{s.noPlan}</span>
                <span className="mt-2 text-[13px] text-black/60">{s.noPlanSub}</span>
              </Radio>
            </div>
          </fieldset>
        )}

        {addons.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-[var(--ink)]">{s.addonsTitle}</h3>
            {rec.length > 0 && (
              <>
                <p className="mb-3 mt-4 text-[12px] font-semibold uppercase tracking-[.14em] text-[var(--accent-text)]">{s.recommended}</p>
                <div className="grid gap-2.5">{rec.map(addonRow)}</div>
              </>
            )}
            {rest.length > 0 && (
              <details className="mt-5">
                <summary className="cursor-pointer text-sm font-semibold text-[var(--ink)] underline underline-offset-4">{s.more}</summary>
                <div className="mt-3 grid gap-2.5">{rest.map(addonRow)}</div>
              </details>
            )}
          </div>
        )}
      </div>

      <form onSubmit={submit} className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,.4)] lg:sticky lg:top-6">
        <h3 className="text-lg font-semibold text-[var(--ink)]">{s.summary}</h3>
        {"error" in priced ? (
          <p className="mt-3 text-sm text-red-700">{priced.error}</p>
        ) : (
          <>
            <ul className="mt-4 space-y-2.5 text-sm">
              {priced.lines.map((l) => (
                <li key={l.key} className="flex justify-between gap-3">
                  <span className="text-black/75">
                    {l.name}
                    {l.quantity > 1 ? ` × ${l.quantity}` : ""}
                  </span>
                  <span className="flex-none font-medium text-[var(--ink)]">
                    {eur(l.unitCents * l.quantity)}
                    {l.kind === "monthly" ? ` / ${s.perMonth.replace(/^per /, "")}` : ""}
                  </span>
                </li>
              ))}
              {priced.onRequest.map((n) => (
                <li key={n} className="flex justify-between gap-3">
                  <span className="text-black/75">{n}</span>
                  <span className="flex-none text-black/55">{s.onRequest}</span>
                </li>
              ))}
            </ul>
            {/* One-time and monthly costs are always shown separately. */}
            <dl className="mt-5 space-y-2 border-t border-black/10 pt-4">
              <div className="flex items-baseline justify-between">
                <dt className="text-sm text-black/65">{s.totalOnce}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-[var(--ink)]">{eur(priced.oneTimeCents)}</dd>
              </div>
              {priced.monthlyCents > 0 && (
                <div className="flex items-baseline justify-between">
                  <dt className="text-sm text-black/65">{s.totalMonthly}</dt>
                  <dd className="text-lg font-semibold text-[var(--ink)]">{eur(priced.monthlyCents)}</dd>
                </div>
              )}
            </dl>
            <p className="mt-2 text-xs text-black/55">
              {vatLine}
              {priced.onRequest.length > 0 ? ` ${s.quoteNote}` : ""}
            </p>
          </>
        )}
        <h3 className="mt-7 text-sm font-semibold uppercase tracking-[.12em] text-black/55">{s.yourDetails}</h3>
        <div className="mt-3 space-y-3">
          <label className="block text-sm font-medium text-[var(--ink)]">
            {s.name}
            <input className={input} required minLength={2} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="block text-sm font-medium text-[var(--ink)]">
            {s.email}
            <input className={input} required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="block text-sm font-medium text-[var(--ink)]">
            {s.phone}
            <input className={input} type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <label className="block text-sm font-medium text-[var(--ink)]">
            {s.note}
            <textarea className={`${input} h-24 py-2.5`} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </label>
        </div>
        {error && (
          <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-800">
            {error}
          </p>
        )}
        <button type="submit" disabled={state === "sending" || "error" in priced} className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 text-base font-semibold text-[var(--on-accent)] transition hover:brightness-95 disabled:opacity-60">
          {state === "sending" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> {s.sending}
            </>
          ) : paymentsLive ? (
            s.payNow
          ) : (
            s.request
          )}
        </button>
        <p className="mt-3 text-center text-xs text-black/55">{paymentsLive ? s.payHelp : s.requestHelp}</p>
      </form>
    </div>
  );
}
