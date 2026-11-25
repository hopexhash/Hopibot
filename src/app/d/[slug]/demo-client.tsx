"use client";

import {
  ArrowRight, BarChart3, BookOpen, CalendarCheck, Camera, Check, ChevronUp, Files, Globe, Languages, Loader2, Lock, Mail, MapPin, Maximize2,
  MessageCircle, Minus, Monitor, PenTool, Plus, Search, ShoppingBag, Smartphone, Sparkles, Type, X, type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { eur, priceOrder, type Catalog, type CatalogAddon } from "@/lib/catalog";
import type { ClientStrings } from "./strings";

type S = ClientStrings;

const ADDON_ICON: Record<string, LucideIcon> = {
  logo: PenTool, pages: Files, booking: CalendarCheck, menu: BookOpen, ordering: ShoppingBag, multilingual: Languages, copywriting: Type,
  seo: Search, gbp: MapPin, photography: Camera, email: Mail, domain: Globe, whatsapp: MessageCircle, analytics: BarChart3,
};

/** Counts smoothly to a new amount whenever the selection changes. */
function Amount({ cents, className }: { cents: number; className?: string }) {
  const [shown, setShown] = useState(cents);
  const from = useRef(cents);
  useEffect(() => {
    const start = from.current;
    if (start === cents) return;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 380);
      const eased = 1 - Math.pow(1 - k, 3);
      const v = Math.round(start + (cents - start) * eased);
      from.current = v;
      setShown(v);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [cents]);
  return <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>{eur(shown, shown % 100 === 0 ? 0 : 2)}</span>;
}

/* ─────────────────────────── Preview ─────────────────────────── */

/** The customer's own website as the centrepiece: browser frame, device toggle and in-page full screen. */
export function PreviewShowcase({ slug, title, label, s }: { slug: string; title: string; label: string; s: S }) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [loaded, setLoaded] = useState(false);
  const [full, setFull] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let first = true;
    const ro = new ResizeObserver(() => {
      setScale(Math.min(1, el.clientWidth / 1360));
      // Phones open on the phone view: that is how most of their customers will see the site.
      if (first && window.innerWidth < 640) setDevice("mobile");
      first = false;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [full]);
  // The frame can finish loading before React attaches onLoad (server-rendered iframe), so the
  // loading state also clears when the document is already complete, and after a short grace period.
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const done = () => setLoaded(true);
    if (frame.current?.contentDocument?.readyState === "complete" && frame.current.contentDocument.body?.childElementCount) done();
    const t = setTimeout(done, 3500);
    return () => clearTimeout(t);
  }, [device]);
  const src = `/p/${slug}`;
  const tab = (d: "desktop" | "mobile", text: string, Icon: LucideIcon) => (
    <button type="button" onClick={() => setDevice(d)} aria-pressed={device === d} className="relative z-10 flex min-h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors" style={{ color: device === d ? "#fff" : "var(--ink)" }}>
      <Icon className="h-[18px] w-[18px]" /> {text}
    </button>
  );
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="relative flex rounded-full border border-[var(--line)] bg-white p-1 shadow-[var(--shadow-sm)]">
          <span aria-hidden className="absolute bottom-1 top-1 rounded-full bg-[var(--dark)] transition-all duration-500 ease-[cubic-bezier(.2,.7,.3,1)]" style={{ left: device === "desktop" ? 4 : "50%", width: "calc(50% - 4px)" }} />
          {tab("desktop", s.desktop, Monitor)}
          {tab("mobile", s.mobile, Smartphone)}
        </div>
        <button type="button" onClick={() => setFull(true)} className="flex min-h-11 items-center gap-2 rounded-full border border-[var(--line)] bg-white px-5 text-[15px] font-semibold shadow-[var(--shadow-sm)] transition hover:border-[var(--ink)]">
          <Maximize2 className="h-[17px] w-[17px]" /> <span className="hidden sm:inline">{s.fullscreen}</span>
        </button>
      </div>

      <div ref={box} className="relative">
        {/* soft lime light behind the product */}
        <div aria-hidden className="pointer-events-none absolute -inset-x-6 -bottom-10 top-1/3 -z-10 rounded-[60px] opacity-70 blur-3xl" style={{ background: "radial-gradient(60% 60% at 50% 60%, rgba(182,255,59,.5), transparent 70%)" }} />
        <div className="mx-auto overflow-hidden border border-[var(--line-strong)] bg-white shadow-[var(--shadow-lg)] transition-all duration-700 ease-[cubic-bezier(.2,.7,.3,1)]" style={{ width: device === "desktop" ? "100%" : "min(340px, 100%)", borderRadius: device === "desktop" ? 22 : 44, borderWidth: device === "desktop" ? 1 : 10, borderColor: device === "desktop" ? "var(--line-strong)" : "var(--dark)" }}>
          {device === "desktop" && (
            <div className="flex items-center gap-3 border-b border-[var(--line)] bg-[#fbfbfc] px-4 py-3">
              <span className="flex gap-1.5">
                <i className="h-3 w-3 rounded-full bg-[#e6e8ec]" />
                <i className="h-3 w-3 rounded-full bg-[#e6e8ec]" />
                <i className="h-3 w-3 rounded-full bg-[#e6e8ec]" />
              </span>
              <span className="mx-auto flex min-w-0 max-w-[60%] items-center gap-2 rounded-full bg-[var(--bg)] px-4 py-1.5 text-[13px] font-medium text-[var(--ink-2)]">
                <Lock className="h-3.5 w-3.5 flex-none" /> <span className="truncate">{label}</span>
              </span>
              <span className="w-12" />
            </div>
          )}
          <div className="relative" style={{ height: device === "desktop" ? Math.round(780 * scale) : 640 }}>
            {!loaded && (
              <div className="skeleton absolute inset-0 grid place-items-center">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-2)] shadow-[var(--shadow-sm)]">{s.loadingPreview}</span>
              </div>
            )}
            {device === "desktop" ? (
              <iframe key="d" ref={frame} src={src} title={title} onLoad={() => setLoaded(true)} className="absolute left-0 top-0 origin-top-left border-0" style={{ width: 1360, height: 780, transform: `scale(${scale})`, opacity: loaded ? 1 : 0, transition: "opacity .5s" }} />
            ) : (
              <iframe key="m" ref={frame} src={src} title={title} onLoad={() => setLoaded(true)} className="block h-full w-full border-0" style={{ opacity: loaded ? 1 : 0, transition: "opacity .5s" }} />
            )}
          </div>
        </div>
      </div>

      {full && (
        <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[100] flex flex-col bg-[var(--dark)]">
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
            <span className="truncate text-sm font-semibold">{label}</span>
            <button type="button" onClick={() => setFull(false)} className="flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold hover:bg-white/20">
              <X className="h-4 w-4" /> {s.close}
            </button>
          </div>
          <iframe src={src} title={title} className="w-full flex-1 border-0 bg-white" />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── Configurator ─────────────────────────── */

function StepHead({ n, eyebrow, title, sub }: { n: number; eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mb-7">
      <p className="eyebrow flex items-center gap-2.5">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--dark)] text-[12px] font-bold text-[var(--lime)]">{n}</span>
        {eyebrow}
      </p>
      <h3 className="mt-3 text-[26px] font-bold leading-tight tracking-[-0.03em] sm:text-[30px]">{title}</h3>
      <p className="muted mt-2 text-[16.5px]">{sub}</p>
    </div>
  );
}

const Tick = () => (
  <span className="tick" aria-hidden>
    <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
  </span>
);

export function Configurator({ slug, catalog, recommended, paymentsLive, businessName, s }: { slug: string; catalog: Catalog; recommended: string[]; paymentsLive: boolean; businessName: string; s: S }) {
  const packages = catalog.packages.filter((p) => p.enabled && p.priceCents !== null);
  const plans = catalog.plans.filter((p) => p.enabled && p.priceCents !== null);
  const addons = catalog.addons.filter((a) => a.enabled);
  const [pkg, setPkg] = useState((packages.find((p) => p.featured) ?? packages[0])?.key ?? "");
  const [plan, setPlan] = useState<string | null>(plans[0]?.key ?? null);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [showAll, setShowAll] = useState(false);
  const [form, setForm] = useState({ name: "", company: businessName, email: "", phone: "", note: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [sheet, setSheet] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const priced = useMemo(() => priceOrder(catalog, { packageKey: pkg, planKey: plan, addons: picked }), [catalog, pkg, plan, picked]);
  const ok = !("error" in priced);
  const once = ok ? priced.oneTimeCents : 0;
  const monthly = ok ? priced.monthlyCents : 0;
  const vat = (c: number) => Math.round((c * catalog.vatPct) / 100);
  const rec = addons.filter((a) => recommended.includes(a.key));
  const rest = addons.filter((a) => !recommended.includes(a.key));
  const visible = showAll || rec.length === 0 ? [...rec, ...rest] : rec;

  const errors = {
    name: form.name.trim().length < 2 ? s.errName : "",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) ? "" : s.errEmail,
    phone: form.phone.trim() && form.phone.replace(/\D/g, "").length < 8 ? s.errPhone : "",
  };
  const invalid = Boolean(errors.name || errors.email || errors.phone);

  const toggle = (a: CatalogAddon) => setPicked((p) => (p[a.key] ? Object.fromEntries(Object.entries(p).filter(([k]) => k !== a.key)) : { ...p, [a.key]: 1 }));
  const qty = (a: CatalogAddon, d: number) => setPicked((p) => ({ ...p, [a.key]: Math.max(1, Math.min(20, (p[a.key] ?? 1) + d)) }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSheet(false);
    if (invalid) {
      setTouched({ name: true, email: true, phone: true });
      const first = formRef.current?.querySelector<HTMLElement>('[data-invalid="true"] input');
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => first?.focus({ preventScroll: true }), 450);
      return;
    }
    setState("sending");
    try {
      const note = [form.company.trim() && form.company.trim() !== businessName ? `${s.company}: ${form.company.trim()}` : "", form.note.trim()].filter(Boolean).join("\n");
      const res = await fetch("/api/demo/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, packageKey: pkg, planKey: plan, addons: picked, name: form.name, email: form.email, phone: form.phone, note }) });
      const data = (await res.json()) as { ok: boolean; mode?: string; url?: string; error?: string };
      if (!data.ok) throw new Error(data.error || s.errGeneric);
      if (data.mode === "checkout" && data.url) {
        window.location.href = data.url;
        return;
      }
      setState("done");
      window.scrollTo({ top: document.getElementById("order")?.offsetTop ?? 0, behavior: "smooth" });
    } catch (err) {
      setError((err as Error).message || s.errGeneric);
      setState("idle");
    }
  }

  if (state === "done")
    return (
      <div className="card rise mx-auto max-w-2xl px-6 py-14 text-center sm:px-12 sm:py-20">
        <span className="pop mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--lime)] text-[var(--dark)]">
          <Check className="h-10 w-10" strokeWidth={3} />
        </span>
        <h3 className="mt-7 text-[30px] font-extrabold tracking-[-0.035em]">{s.thanksTitle}</h3>
        <p className="muted mx-auto mt-3 max-w-md text-[17px]">{s.thanksBody}</p>
        <ol className="mx-auto mt-9 max-w-md space-y-3 text-left">
          {s.nextRequest.map((x, i) => (
            <li key={x} className="flex gap-3 text-[15.5px]">
              <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[var(--bg)] text-[13px] font-bold">{i + 1}</span>
              {x}
            </li>
          ))}
        </ol>
      </div>
    );

  const field = (key: "name" | "company" | "email" | "phone", label: string, props: React.InputHTMLAttributes<HTMLInputElement>, optional = false) => {
    const err = key !== "company" && touched[key] ? errors[key] : "";
    return (
      <div className="field" data-invalid={err ? "true" : "false"}>
        <label htmlFor={`f-${key}`}>
          {label} {optional && <span className="muted font-normal">· {s.optional}</span>}
        </label>
        <input id={`f-${key}`} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, [key]: true }))} aria-invalid={Boolean(err)} aria-describedby={err ? `e-${key}` : undefined} {...props} />
        {err && (
          <p id={`e-${key}`} className="err" role="alert">
            {err}
          </p>
        )}
      </div>
    );
  };

  const lines = ok ? priced.lines : [];
  const onceLines = lines.filter((l) => l.kind === "one_time");
  const monthLines = lines.filter((l) => l.kind === "monthly");
  const Breakdown = (
    <>
      <p className="eyebrow">{s.oneTimeGroup}</p>
      <ul className="mt-3 space-y-2.5">
        {onceLines.map((l) => (
          <li key={l.key} className="flex items-baseline justify-between gap-4 text-[15.5px]">
            <span>
              {l.name}
              {l.quantity > 1 && <span className="muted"> × {l.quantity}</span>}
            </span>
            <span className="flex-none font-semibold">{eur(l.unitCents * l.quantity)}</span>
          </li>
        ))}
        {ok &&
          priced.onRequest.map((n) => (
            <li key={n} className="flex items-baseline justify-between gap-4 text-[15.5px]">
              <span>{n}</span>
              <span className="muted flex-none">{s.onRequest}</span>
            </li>
          ))}
      </ul>
      <dl className="mt-4 space-y-1.5 border-t border-[var(--line)] pt-4 text-[14.5px]">
        <div className="muted flex justify-between">
          <dt>{s.subtotalOnce}</dt>
          <dd>{eur(once)}</dd>
        </div>
        <div className="muted flex justify-between">
          <dt>{s.vatLabel}</dt>
          <dd>{eur(vat(once), 2)}</dd>
        </div>
        <div className="flex items-baseline justify-between pt-1.5">
          <dt className="text-[15.5px] font-semibold">
            {s.totalOnce} <span className="muted text-[13px] font-medium">{s.inclVat}</span>
          </dt>
          <dd>
            <Amount cents={once + vat(once)} className="text-[28px] font-extrabold tracking-[-0.03em]" />
          </dd>
        </div>
      </dl>

      {monthLines.length > 0 && (
        <div className="mt-5 rounded-2xl bg-[var(--bg)] p-4">
          <p className="eyebrow">{s.monthlyGroup}</p>
          <ul className="mt-2.5 space-y-2">
            {monthLines.map((l) => (
              <li key={l.key} className="flex items-baseline justify-between gap-4 text-[15.5px]">
                <span>{l.name}</span>
                <span className="flex-none font-semibold">{eur(l.unitCents)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-baseline justify-between border-t border-[var(--line-strong)] pt-3">
            <span className="text-[15px] font-semibold">
              {s.totalMonthly} <span className="muted text-[13px] font-medium">{s.inclVat}</span>
            </span>
            <span>
              <Amount cents={monthly + vat(monthly)} className="text-[20px] font-extrabold tracking-[-0.02em]" />
            </span>
          </div>
        </div>
      )}
      {ok && priced.onRequest.length > 0 && <p className="muted mt-3 text-[13.5px]">{s.quoteNote}</p>}
    </>
  );

  const Cta = (
    <button type="submit" form="order-form" disabled={state === "sending" || !ok} className="btn btn-lime w-full">
      {state === "sending" ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" /> {s.sending}
        </>
      ) : (
        <>
          {s.submit} <ArrowRight className="h-5 w-5" />
        </>
      )}
    </button>
  );

  return (
    <div className="grid gap-10 pb-28 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 lg:pb-0">
      <div className="min-w-0 space-y-16 sm:space-y-20">
        {/* 1 — Package */}
        <section aria-labelledby="st-1">
          <StepHead n={1} eyebrow={s.step1} title={s.pricingTitle} sub={s.pricingSub} />
          <div role="radiogroup" aria-label={s.pricingTitle} className="grid gap-4 xl:grid-cols-3">
            {packages.map((p) => {
              const on = pkg === p.key;
              return (
                <button key={p.key} type="button" role="radio" aria-checked={on} data-on={on} onClick={() => setPkg(p.key)} className="opt text-left">
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5">
                      <span className="text-[19px] font-bold tracking-[-0.02em]">{p.name}</span>
                      {p.featured && <span className="rounded-full bg-[var(--dark)] px-2.5 py-1 text-[11.5px] font-semibold tracking-wide text-[var(--lime)]">{s.recommendedPkg}</span>}
                    </span>
                    <Tick />
                  </span>
                  <span className="mt-5 flex items-baseline gap-2">
                    <span className="text-[44px] font-extrabold leading-none tracking-[-0.045em]">{eur(p.priceCents!)}</span>
                    <span className="muted text-[15px] font-medium">{s.oneTime}</span>
                  </span>
                  <span className="muted mt-3 block text-[15.5px] leading-snug">{p.description}</span>
                  <span className="mt-6 block space-y-3 border-t border-[var(--line)] pt-6">
                    {p.features.map((f) => (
                      <span key={f} className="flex gap-3 text-[15.5px] leading-snug">
                        <Check className="mt-0.5 h-[18px] w-[18px] flex-none text-[var(--ok-ink)]" strokeWidth={2.6} /> {f}
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2 — Hosting & maintenance */}
        {plans.length > 0 && (
          <section>
            <StepHead n={2} eyebrow={s.step2} title={s.planTitle} sub={s.planSub} />
            <div role="radiogroup" aria-label={s.planTitle} className="grid gap-3.5 sm:grid-cols-2">
              {plans.map((p) => {
                const on = plan === p.key;
                return (
                  <button key={p.key} type="button" role="radio" aria-checked={on} data-on={on} onClick={() => setPlan(p.key)} className="opt text-left">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-[18px] font-bold tracking-[-0.02em]">{p.name}</span>
                      <Tick />
                    </span>
                    <span className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-[34px] font-extrabold leading-none tracking-[-0.04em]">{eur(p.priceCents!)}</span>
                      <span className="muted text-[15px] font-medium">{s.perMonth}</span>
                    </span>
                    <span className="muted mt-2.5 block text-[15px] leading-snug">{p.description}</span>
                    <span className="mt-4 flex flex-wrap gap-1.5">
                      {p.features.map((f) => (
                        <span key={f} className="rounded-full bg-[var(--bg)] px-3 py-1.5 text-[13.5px] font-medium">
                          {f}
                        </span>
                      ))}
                    </span>
                  </button>
                );
              })}
              <button type="button" role="radio" aria-checked={plan === null} data-on={plan === null} onClick={() => setPlan(null)} className="opt justify-center text-left">
                <span className="flex items-start justify-between gap-3">
                  <span className="text-[18px] font-bold tracking-[-0.02em]">{s.noPlan}</span>
                  <Tick />
                </span>
                <span className="muted mt-2.5 block text-[15px] leading-snug">{s.noPlanSub}</span>
              </button>
            </div>
          </section>
        )}

        {/* 3 — Add-ons */}
        {addons.length > 0 && (
          <section>
            <StepHead n={3} eyebrow={s.step3} title={s.addonsTitle} sub={s.addonsSub} />
            {rec.length > 0 && <p className="eyebrow mb-3 !text-[var(--ok-ink)]">{s.recommended}</p>}
            <div className="grid gap-2.5">
              {visible.map((a) => {
                const on = Boolean(picked[a.key]);
                const Icon = ADDON_ICON[a.key] ?? Sparkles;
                return (
                  <div key={a.key} data-on={on} className="row-opt" role="group">
                    <button type="button" role="switch" aria-checked={on} aria-label={a.name} onClick={() => toggle(a)} className="flex min-w-0 flex-1 items-center gap-4 text-left">
                      <span className="ico">
                        <Icon className="h-[21px] w-[21px]" strokeWidth={1.9} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[16px] font-semibold leading-snug">{a.name}</span>
                        <span className="muted block text-[14.5px] leading-snug">{a.description}</span>
                      </span>
                    </button>
                    {on && a.perUnit && (
                      <span className="flex flex-none items-center rounded-full border border-[var(--line-strong)] bg-white" aria-label={s.quantity}>
                        <button type="button" onClick={() => qty(a, -1)} aria-label="−" className="grid h-10 w-9 place-items-center">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-5 text-center text-[15px] font-semibold" aria-live="polite">{picked[a.key]}</span>
                        <button type="button" onClick={() => qty(a, 1)} aria-label="+" className="grid h-10 w-9 place-items-center">
                          <Plus className="h-4 w-4" />
                        </button>
                      </span>
                    )}
                    <button type="button" tabIndex={-1} aria-hidden onClick={() => toggle(a)} className="flex flex-none items-center gap-3.5">
                      <span className="text-right">
                        {a.priceCents === null ? (
                          <span className="muted text-[14.5px] font-medium">{s.onRequest}</span>
                        ) : (
                          <span className="block text-[16.5px] font-bold">{eur(a.priceCents)}</span>
                        )}
                        {a.priceCents !== null && a.perUnit && <span className="muted block text-[12.5px] leading-none">{s.per} {a.unit}</span>}
                      </span>
                      <Tick />
                    </button>
                  </div>
                );
              })}
            </div>
            {rec.length > 0 && rest.length > 0 && (
              <button type="button" onClick={() => setShowAll((v) => !v)} className="mt-4 inline-flex min-h-11 items-center gap-2 text-[15.5px] font-semibold underline decoration-[var(--lime)] decoration-2 underline-offset-[6px]">
                {showAll ? s.showLess : `${s.showAll} (${rest.length})`}
              </button>
            )}
          </section>
        )}

        {/* 4 — Details */}
        <section>
          <StepHead n={plans.length ? 4 : 3} eyebrow={s.step4} title={s.detailsTitle} sub={s.detailsSub} />
          <form id="order-form" ref={formRef} onSubmit={submit} noValidate className="card scroll-mt-6 space-y-5 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {field("name", s.name, { autoComplete: "name", required: true })}
              {field("company", s.company, { autoComplete: "organization" })}
              {field("email", s.email, { type: "email", autoComplete: "email", inputMode: "email", required: true })}
              {field("phone", s.phone, { type: "tel", autoComplete: "tel", inputMode: "tel" }, true)}
            </div>
            <div className="field">
              <label htmlFor="f-note">
                {s.note} <span className="muted font-normal">· {s.optional}</span>
              </label>
              <textarea id="f-note" value={form.note} maxLength={900} onChange={(e) => setForm({ ...form, note: e.target.value })} />
            </div>
            {error && (
              <p role="alert" className="rounded-2xl bg-[var(--bad)] p-4 text-[15px] font-medium text-[var(--bad-ink)]">
                {error}
              </p>
            )}
            <div className="rounded-2xl bg-[var(--bg)] p-5">
              <p className="text-[15px] font-bold">{s.nextTitle}</p>
              <ol className="mt-3 space-y-2.5">
                {(paymentsLive ? s.nextPay : s.nextRequest).map((x, i) => (
                  <li key={x} className="flex gap-3 text-[15px]">
                    <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-white text-[12.5px] font-bold shadow-[var(--shadow-sm)]">{i + 1}</span>
                    <span className="muted">{x}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:hidden">{Cta}</div>
            <p className="muted flex items-center justify-center gap-2 text-center text-[14px] lg:hidden">
              <Lock className="h-4 w-4 flex-none" /> {paymentsLive ? s.payHelp : s.requestHelp}
            </p>
          </form>
        </section>
      </div>

      {/* Desktop: sticky live order summary */}
      <aside className="hidden lg:block">
        <div className="card sticky top-6 p-7 shadow-[var(--shadow-md)]">
          <h3 className="text-[21px] font-bold tracking-[-0.025em]">{s.summary}</h3>
          <div className="mt-5">{ok ? Breakdown : <p className="text-[15px] text-[var(--bad-ink)]">{"error" in priced ? priced.error : ""}</p>}</div>
          <div className="mt-6">{Cta}</div>
          <p className="muted mt-3.5 flex items-start justify-center gap-2 text-center text-[13.5px] leading-snug">
            <Lock className="mt-0.5 h-3.5 w-3.5 flex-none" /> {paymentsLive ? s.payHelp : s.requestHelp}
          </p>
        </div>
      </aside>

      {/* Mobile: compact sticky summary with expandable breakdown */}
      <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
        {sheet && <button type="button" aria-label={s.hideBreakdown} onClick={() => setSheet(false)} className="fixed inset-0 -z-10 bg-black/35" />}
        <div className="rounded-t-[26px] border-t border-[var(--line-strong)] bg-white shadow-[0_-18px_50px_-20px_rgba(23,25,28,.35)]" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
          {sheet && <div className="max-h-[58vh] overflow-y-auto px-5 pb-2 pt-5">{Breakdown}</div>}
          <div className="flex items-center gap-3 px-4 pt-3">
            <button type="button" onClick={() => setSheet((v) => !v)} aria-expanded={sheet} className="flex min-h-12 min-w-0 flex-1 items-center gap-2.5 text-left">
              <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-[var(--bg)]">
                <ChevronUp className={`h-5 w-5 transition-transform duration-300 ${sheet ? "rotate-180" : ""}`} />
              </span>
              <span className="min-w-0">
                <span className="block text-[19px] font-extrabold leading-tight tracking-[-0.03em]">
                  <Amount cents={once + vat(once)} />
                </span>
                <span className="muted block truncate text-[12.5px] font-medium leading-tight">
                  {monthly > 0 ? `+ ${eur(monthly + vat(monthly), 2)} ${s.perMonthShort} · ` : ""}
                  {s.inclVat}
                </span>
              </span>
            </button>
            <button type="submit" form="order-form" disabled={state === "sending" || !ok} className="btn btn-lime !min-h-[52px] flex-none !px-5 !text-[15px]">
              {state === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : s.submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
