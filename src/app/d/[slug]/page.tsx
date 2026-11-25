import { ArrowRight, Check, CircleAlert, CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { getAuth } from "@/server/auth";
import { loadDemo, recordDemoView } from "@/server/sales/demo";
import { contrast, ensureContrast } from "@/sites/theme";
import { Configurator, PreviewFrame } from "./demo-client";
import { demoStrings } from "./strings";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const demo = await loadDemo(slug);
  return { title: demo ? `${demo.business.name} — demo` : "Demo", robots: { index: false, follow: false } };
}

/**
 * Public sales page for one generated website: live preview, what is included, the measured
 * opportunity report, transparent pricing and the order form.
 */
export default async function DemoPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | undefined>> }) {
  const { slug } = await params;
  const sp = await searchParams;
  const demo = await loadDemo(slug);
  if (!demo) notFound();
  const { business, design, settings, opportunity } = demo;
  const s = demoStrings(demo.lang);
  const name = business.name.replace(/\[MOCK\]\s*/g, "").trim();
  const agency = settings.agencyName || "HOPI Bot";

  // Visits by the agency itself are not sales signals.
  const auth = await getAuth();
  if (!auth || auth.org.id !== demo.project.organizationId) {
    const h = await headers();
    await recordDemoView(demo, { ip: (h.get("x-forwarded-for") ?? "").split(",")[0].trim(), userAgent: h.get("user-agent") ?? "" }).catch(() => {});
  }

  // The page borrows the accent colour of the prospect's own design, kept readable on white.
  const accent = ensureContrast(design.palette.accent, "#ffffff", 3.2);
  const vars = {
    "--accent": accent,
    "--on-accent": contrast("#ffffff", accent) >= contrast("#111111", accent) ? "#ffffff" : "#111111",
    "--accent-text": ensureContrast(accent, "#ffffff", 4.5),
    "--ink": "#141413",
  } as CSSProperties;
  // Client components receive plain data only (no functions).
  const cs = Object.fromEntries(Object.entries(s).filter(([, v]) => typeof v !== "function")) as never;
  const findings = opportunity.areas.filter((a) => a.findings.length > 0);
  const contact = [settings.replyToEmail || settings.senderEmail, settings.agencyWebsite].filter(Boolean);

  return (
    <div style={vars} className="min-h-screen bg-[#f6f5f1] text-[15.5px] leading-relaxed text-[#3b3a37] [color-scheme:light]">
      <header className="border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <p className="truncate text-sm font-semibold text-[var(--ink)]">{agency}</p>
          <a href="#order" className="flex min-h-11 flex-none items-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--on-accent)]">
            {s.ctaGet} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24">
        {sp.paid && (
          <div className="mt-6 flex gap-3 rounded-2xl border border-emerald-600/25 bg-emerald-50 p-5 text-emerald-900">
            <CircleCheck className="mt-0.5 h-5 w-5 flex-none" />
            <div>
              <p className="font-semibold">{s.paidTitle}</p>
              <p className="text-sm">{s.paidBody}</p>
            </div>
          </div>
        )}
        {sp.cancelled && <p className="mt-6 rounded-2xl border border-amber-600/25 bg-amber-50 p-4 text-sm text-amber-900">{s.cancelled}</p>}

        <section className="py-12 text-center sm:py-16">
          <p className="text-[12px] font-semibold uppercase tracking-[.2em] text-[var(--accent-text)]">
            {s.heroKicker} {name}
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(32px,5.4vw,58px)] font-semibold leading-[1.06] tracking-tight text-[var(--ink)]">{s.heroTitle(name)}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] text-black/65">{s.heroSub}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#order" className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-8 text-base font-semibold text-[var(--on-accent)] sm:w-auto">
              {s.ctaGet} <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#pricing" className="flex min-h-14 w-full items-center justify-center rounded-full border border-black/15 bg-white px-8 text-base font-semibold text-[var(--ink)] sm:w-auto">
              {s.ctaCustomize}
            </a>
          </div>
        </section>

        <section aria-label="Preview">
          <PreviewFrame slug={slug} title={`${name} — demo`} s={cs} />
          <p className="mx-auto mt-4 max-w-2xl text-center text-[13px] text-black/55">{s.notOfficial(name)}</p>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-black/10 bg-white p-7 sm:p-9">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--ink)]">{s.included}</h2>
            <p className="mt-1 text-sm text-black/55">
              {design.name} · {design.industry}
            </p>
            <ul className="mt-6 space-y-3.5">
              {demo.included.map((f) => (
                <li key={f} className="flex gap-3 text-[16px] text-[var(--ink)]">
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-black/10 pt-5 text-[12px] font-semibold uppercase tracking-[.14em] text-black/50">{s.newSite}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.improvements.map((x) => (
                <li key={x} className="rounded-full bg-black/5 px-3 py-1.5 text-[13px] font-medium text-[var(--ink)]">
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-7 sm:p-9">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--ink)]">{s.reportTitle}</h2>
            {opportunity.basis === "no_website" || opportunity.basis === "unreachable" ? (
              <p className="mt-4 flex gap-3 rounded-2xl bg-black/[.04] p-4 text-[15px] text-[var(--ink)]">
                <CircleAlert className="mt-0.5 h-5 w-5 flex-none text-[var(--accent-text)]" />
                {opportunity.basis === "no_website" ? s.reportNone : s.reportUnreachable}
              </p>
            ) : opportunity.basis === "audit" ? (
              <>
                <p className="mt-1 text-sm text-black/55">{s.reportIntro}</p>
                <div className="mt-5 flex items-center gap-4 rounded-2xl bg-black/[.04] p-4">
                  <span className="grid h-16 w-16 flex-none place-items-center rounded-full border-4 border-[var(--accent)] text-xl font-semibold text-[var(--ink)]">{opportunity.score}</span>
                  <div>
                    <p className="font-semibold text-[var(--ink)]">{s.score}</p>
                    <p className="text-[13px] text-black/60">{s.scoreHelp}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-4">
                  {(findings.length ? findings : opportunity.areas.slice(0, 3)).map((a) => (
                    <li key={a.key}>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[14px] font-semibold text-[var(--ink)]">{s.areas[a.key] ?? a.label}</p>
                        <div className="h-1.5 w-24 flex-none overflow-hidden rounded-full bg-black/10" role="img" aria-label={`${a.score}/100`}>
                          <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${a.score}%` }} />
                        </div>
                      </div>
                      {a.findings.length ? (
                        <ul className="mt-1.5 space-y-1">
                          {a.findings.map((f) => (
                            <li key={f} className="flex gap-2 text-[13.5px] text-black/65">
                              <span className="mt-[3px] flex-none rounded bg-black/[.06] px-1.5 text-[10px] font-semibold uppercase tracking-wide text-black/55">{s.measured}</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-1 text-[13.5px] text-black/55">{s.reportGood}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-4 text-[15px] text-black/60">{s.reportIntro}</p>
            )}
          </div>
        </section>

        <section id="pricing" className="mt-20 scroll-mt-6">
          <div className="mb-8 text-center">
            <h2 className="text-[clamp(26px,3.6vw,38px)] font-semibold tracking-tight text-[var(--ink)]">{s.pricingTitle}</h2>
            <p className="mt-2 text-black/60">{s.pricingSub}</p>
          </div>
          <div id="order" className="scroll-mt-6">
            <Configurator slug={slug} catalog={demo.catalog} recommended={demo.recommended.map((a) => a.key)} paymentsLive={demo.paymentsLive} s={cs} vatLine={s.exVat(demo.catalog.vatPct)} />
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-[13px] text-black/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {s.concept} · {s.by} {agency}
            {settings.kvkNumber ? ` · KvK ${settings.kvkNumber}` : ""}
          </p>
          {contact.length > 0 && (
            <p>
              {s.questions} {contact.join(" · ")}
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}
