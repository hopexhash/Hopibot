import { ArrowRight, Check, CircleAlert, CircleCheck, Gauge, LayoutTemplate, MousePointerClick, Navigation, Puzzle, Search, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getAuth } from "@/server/auth";
import { loadDemo, recordDemoView } from "@/server/sales/demo";
import { Configurator, PreviewShowcase } from "./demo-client";
import { clientStrings, demoStrings } from "./strings";
import "./demo.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const demo = await loadDemo(slug);
  return { title: demo ? `${demo.business.name.replace(/\[MOCK\]\s*/g, "")} — website` : "Website", robots: { index: false, follow: false } };
}

const AREA_ICON: Record<string, LucideIcon> = { design: LayoutTemplate, mobile: Smartphone, performance: Gauge, navigation: Navigation, seo: Search, conversion: MousePointerClick, functionality: Puzzle };

/**
 * The purchase experience for one generated website: the customer's own site as the
 * centrepiece, the measured opportunity report, then package, maintenance, add-ons and order.
 */
export default async function DemoPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | undefined>> }) {
  const { slug } = await params;
  const sp = await searchParams;
  const demo = await loadDemo(slug);
  if (!demo) notFound();
  const { business, settings, opportunity } = demo;
  const s = demoStrings(demo.lang);
  const cs = clientStrings(s, demo.catalog.vatPct);
  const name = business.name.replace(/\[MOCK\]\s*/g, "").trim();
  const agency = settings.agencyName || "HOPI";

  // Visits by the agency itself are not sales signals.
  const auth = await getAuth();
  if (!auth || auth.org.id !== demo.project.organizationId) {
    const h = await headers();
    await recordDemoView(demo, { ip: (h.get("x-forwarded-for") ?? "").split(",")[0].trim(), userAgent: h.get("user-agent") ?? "" }).catch(() => {});
  }

  const contact = [settings.replyToEmail || settings.senderEmail, settings.agencyWebsite].filter(Boolean);
  const audited = opportunity.basis === "audit";
  const ring = 2 * Math.PI * 52;
  const status = (score: number, findings: number) => (findings === 0 ? { label: s.statusOk, cls: "bg-[var(--ok)] text-[var(--ok-ink)]" } : score >= 55 ? { label: s.statusBad, cls: "bg-[var(--bad)] text-[var(--bad-ink)]" } : { label: s.statusMid, cls: "bg-[var(--warn)] text-[var(--warn-ink)]" });

  return (
    <div className="hopi">
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(247,248,250,.82)] backdrop-blur-xl">
        <div className="wrap flex h-[68px] items-center justify-between gap-4">
          <p className="flex min-w-0 items-center gap-2.5 text-[17px] font-extrabold tracking-[-0.03em]">
            <span className="grid h-8 w-8 flex-none place-items-center rounded-[10px] bg-[var(--dark)] text-[15px] text-[var(--lime)]">{agency.charAt(0).toUpperCase()}</span>
            <span className="truncate">{agency}</span>
          </p>
          <a href="#order" className="btn btn-dark !min-h-11 !px-5 !text-[14.5px]">
            {s.ctaGet} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main>
        <div className="wrap">
          {sp.paid && (
            <div className="rise mt-6 flex gap-3.5 rounded-3xl border border-[#cfe9c4] bg-[var(--ok)] p-5 text-[var(--ok-ink)]">
              <CircleCheck className="mt-0.5 h-6 w-6 flex-none" />
              <div>
                <p className="text-[17px] font-bold">{s.paidTitle}</p>
                <p className="text-[15.5px]">{s.paidBody}</p>
              </div>
            </div>
          )}
          {sp.cancelled && <p className="mt-6 rounded-3xl bg-[var(--warn)] p-5 text-[15.5px] font-medium text-[var(--warn-ink)]">{s.cancelled}</p>}

          {/* Presentation */}
          <section className="rise pb-10 pt-12 sm:pb-14 sm:pt-20">
            <p className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-[var(--line)] bg-white py-2 pl-2.5 pr-4 text-[14px] font-semibold shadow-[var(--shadow-sm)]">
              <span className="h-2.5 w-2.5 flex-none rounded-full bg-[var(--lime)] shadow-[0_0_0_4px_rgba(182,255,59,.3)]" />
              <span className="truncate">
                <span className="muted font-medium">{s.madeFor}</span> {name}
              </span>
            </p>
            <h1 className="h1 mt-6 max-w-4xl">{s.heroTitle}</h1>
            <p className="lead mt-5 max-w-2xl">{s.heroSub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#order" className="btn btn-lime">
                {s.ctaGet} <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#preview" className="btn btn-ghost">
                {s.ctaPreview}
              </a>
            </div>
          </section>

          <section id="preview" aria-label={s.ctaPreview} className="rise scroll-mt-24" style={{ animationDelay: ".12s" }}>
            <PreviewShowcase slug={slug} title={`${name} — website`} label={name} s={cs} />
            <p className="muted mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-[14px] leading-relaxed">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-none" /> {s.notOfficial}
            </p>
          </section>

          {/* Opportunity report */}
          <section className="section">
            <p className="eyebrow">{s.reportEyebrow}</p>
            <h2 className="h2 mt-3">{s.reportTitle}</h2>
            <div className="mt-9 grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
              <div className="relative overflow-hidden rounded-[28px] bg-[var(--dark)] p-8 text-white">
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl" style={{ background: "var(--lime)" }} />
                {audited ? (
                  <>
                    <div className="relative mx-auto h-[168px] w-[168px]">
                      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" role="img" aria-label={`${s.score}: ${opportunity.score} ${s.scoreOf}`}>
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="9" />
                        <circle cx="60" cy="60" r="52" fill="none" stroke="var(--lime)" strokeWidth="9" strokeLinecap="round" strokeDasharray={ring} strokeDashoffset={ring * (1 - opportunity.score / 100)} />
                      </svg>
                      <div className="absolute inset-0 grid place-items-center text-center">
                        <div>
                          <p className="text-[52px] font-extrabold leading-none tracking-[-0.05em]">{opportunity.score}</p>
                          <p className="mt-1 text-[13px] font-medium text-white/60">{s.scoreOf}</p>
                        </div>
                      </div>
                    </div>
                    <p className="relative mt-6 text-center text-[19px] font-bold tracking-[-0.02em]">{s.score}</p>
                    <p className="relative mt-2 text-center text-[15px] leading-relaxed text-white/70">{s.scoreHelp}</p>
                  </>
                ) : (
                  <div className="relative">
                    <CircleAlert className="h-9 w-9 text-[var(--lime)]" />
                    <p className="mt-5 text-[20px] font-bold leading-snug tracking-[-0.02em]">
                      {opportunity.basis === "no_website" ? s.reportNone : opportunity.basis === "unreachable" ? s.reportUnreachable : s.reportPending}
                    </p>
                  </div>
                )}
              </div>

              <div className="card p-6 sm:p-8">
                {audited ? (
                  <>
                    <p className="muted text-[15.5px]">{s.reportIntro}</p>
                    <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                      {opportunity.areas.map((a) => {
                        const Icon = AREA_ICON[a.key] ?? Puzzle;
                        const st = status(a.score, a.findings.length);
                        return (
                          <li key={a.key} className="min-w-0">
                            <div className="flex items-center gap-3">
                              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-[var(--bg)]">
                                <Icon className="h-5 w-5" strokeWidth={1.9} />
                              </span>
                              <p className="min-w-0 flex-1 truncate text-[16px] font-bold">{s.areas[a.key] ?? a.label}</p>
                              <span className={`flex-none rounded-full px-2.5 py-1 text-[12.5px] font-semibold ${st.cls}`}>{st.label}</span>
                            </div>
                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--bg)]" role="img" aria-label={`${a.score}/100`}>
                              <div className="h-full rounded-full bg-[var(--dark)]" style={{ width: `${Math.max(4, a.score)}%` }} />
                            </div>
                            {a.findings.length ? (
                              <ul className="mt-3 space-y-1.5">
                                {a.findings.map((f) => (
                                  <li key={f} className="muted flex gap-2 text-[14.5px] leading-snug">
                                    <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-[var(--ink-2)]" /> {f}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="muted mt-3 text-[14.5px]">{s.noFindings}</p>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : null}
                <div className={audited ? "mt-8 border-t border-[var(--line)] pt-7" : ""}>
                  <p className="text-[19px] font-bold tracking-[-0.02em]">{s.includedTitle}</p>
                  <p className="muted mt-1 text-[15px]">{s.includedSub}</p>
                  <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {[...demo.included, ...s.improvements].map((f) => (
                      <li key={f} className="flex gap-3 text-[15.5px] font-medium">
                        <span className="mt-0.5 grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-[var(--lime)]">
                          <Check className="h-3.5 w-3.5 text-[var(--dark)]" strokeWidth={3.2} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Configure & order */}
          <section id="order" className="section scroll-mt-20 pb-24">
            <Configurator slug={slug} catalog={demo.catalog} recommended={demo.recommended.map((a) => a.key)} paymentsLive={demo.paymentsLive} businessName={name} s={cs} />
          </section>
        </div>
      </main>

      <footer className="border-t border-[var(--line)] bg-white pb-28 lg:pb-0">
        <div className="wrap flex flex-col gap-2 py-9 text-[14.5px] text-[var(--ink-2)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-semibold text-[var(--ink)]">{agency}</span> · {s.concept}
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
