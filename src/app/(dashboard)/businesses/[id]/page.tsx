import { and, desc, eq } from "drizzle-orm";
import { CheckCircle2, CircleHelp, ExternalLink, FileQuestion, Globe, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, EmptyState, MockBadge, ScoreRing } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { categoryLabel, PIPELINE_STAGES, WEBSITE_STATUS_LABEL } from "@/lib/constants";
import { formatDate, formatDateTime, timeAgo } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import type { WebsiteAudit } from "@/server/audit/website-audit";
import type { ResearchOutput } from "@/server/agents/research";
import { QuickActions, StageControls } from "./business-actions";

export const metadata = { title: "Business" };

export default async function BusinessPage({ params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const [b] = await db().select().from(schema.businesses).where(and(eq(schema.businesses.id, id), eq(schema.businesses.organizationId, auth.org.id)));
  if (!b) notFound();
  const [score, research, contacts, projects, emails, activities] = await Promise.all([
    db().select().from(schema.leadScores).where(eq(schema.leadScores.businessId, b.id)).orderBy(desc(schema.leadScores.createdAt)).limit(1),
    db().select().from(schema.businessResearch).where(eq(schema.businessResearch.businessId, b.id)).orderBy(desc(schema.businessResearch.createdAt)).limit(1),
    db().select().from(schema.businessContacts).where(eq(schema.businessContacts.businessId, b.id)),
    db().select().from(schema.websiteProjects).where(eq(schema.websiteProjects.businessId, b.id)).orderBy(desc(schema.websiteProjects.createdAt)),
    db().select().from(schema.salesEmails).where(eq(schema.salesEmails.businessId, b.id)).orderBy(desc(schema.salesEmails.createdAt)),
    db().select().from(schema.crmActivities).where(eq(schema.crmActivities.businessId, b.id)).orderBy(desc(schema.crmActivities.createdAt)).limit(50),
  ]);
  const audit = b.websiteAudit as (WebsiteAudit & { error?: string }) | null;
  const r = research[0] as (typeof research)[number] | undefined;
  const profile = r?.profile as ResearchOutput["profile"] | undefined;
  const brief = r?.brief as ResearchOutput["brief"] | undefined;
  const canAdmin = hasRole(auth.role, "admin");

  if (b.erasedAt) {
    return (
      <>
        <PageHeader title={b.name} eyebrow={<Link href="/businesses">← Businesses</Link>} />
        <Card>
          <EmptyState icon={<FileQuestion />} title="Data erased" description={`Personal data for this business was erased on ${formatDate(b.erasedAt)} following a GDPR request. It is on the suppression list and will not be contacted.`} />
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={<Link href="/businesses" className="hover:text-foreground">← Businesses</Link>}
        title={
          <span className="flex items-center gap-2">
            {b.name} {b.isMock && <MockBadge />}
          </span>
        }
        description={`${categoryLabel(b.category)} · ${b.city ?? "Unknown city"} · added ${timeAgo(b.createdAt)}`}
        actions={<QuickActions id={b.id} name={b.name} hasResearch={b.researchStatus === "done"} canAdmin={canAdmin} isMock={b.isMock} />}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Lead score</CardTitle>
                <CardDescription>Configurable weights in Settings · website status: {WEBSITE_STATUS_LABEL[b.websiteStatus] ?? b.websiteStatus}</CardDescription>
              </div>
              <ScoreRing score={b.leadScore} size={48} />
            </CardHeader>
            <CardContent>
              {score[0]?.breakdown.length ? (
                <ul className="space-y-2">
                  {score[0].breakdown.map((x) => (
                    <li key={x.factor} className="flex items-center justify-between gap-3 text-[13px]">
                      <span className="text-muted">{x.reason}</span>
                      <span className="tabular font-medium text-success">+{x.points}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted">No scoring factors applied.</p>
              )}
              {b.websiteStatus === "none_found" && (
                <p className="mt-3 rounded-lg bg-warning-soft px-3 py-2 text-xs text-warning">
                  No website was found, but this is not verified — the business may have a site we couldn&apos;t discover. Check before outreach.
                </p>
              )}
            </CardContent>
          </Card>

          {audit && !audit.error && (
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Existing website audit</CardTitle>
                  <CardDescription>
                    <a href={audit.finalUrl} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-accent">
                      {audit.finalUrl}
                    </a>{" "}
                    · {audit.responseMs} ms · audited {timeAgo(audit.auditedAt)}
                  </CardDescription>
                </div>
                <ScoreRing score={audit.qualityScore} size={48} />
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Mobile viewport", audit.hasViewport],
                  ["HTTPS", audit.https],
                  ["Contact form", audit.hasContactForm],
                  ["Structured data", audit.hasStructuredData],
                  ["Meta description", Boolean(audit.metaDescription)],
                  ["Single H1", audit.h1Count === 1],
                ].map(([label, ok]) => (
                  <div key={String(label)} className="flex items-center gap-2 text-[13px]">
                    {ok ? <CheckCircle2 className="h-4 w-4 text-success" /> : <CircleHelp className="h-4 w-4 text-danger" />}
                    {label}
                  </div>
                ))}
                {audit.outdatedSignals.length > 0 && (
                  <div className="sm:col-span-2">
                    <p className="mb-1 text-xs font-medium">Outdated signals</p>
                    <div className="flex flex-wrap gap-1">
                      {audit.outdatedSignals.map((s) => (
                        <Badge key={s} tone="warning">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Research profile</CardTitle>
                <CardDescription>{r ? `${r.isMock ? "MOCK · " : ""}${r.model ?? "template"} · ${formatDateTime(r.createdAt)}` : "Not researched yet"}</CardDescription>
              </div>
              <StatusBadge status={b.researchStatus} />
            </CardHeader>
            <CardContent>
              {!profile ? (
                <p className="text-xs text-muted">Run the Research agent (Generate website does this automatically).</p>
              ) : (
                <div className="space-y-5 text-[13px]">
                  <p className="leading-relaxed">{profile.description}</p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="mb-1.5 text-xs font-semibold text-success">Verified facts</p>
                      <ul className="space-y-1.5">
                        {profile.verifiedFacts.map((f, i) => (
                          <li key={i} className="text-xs">
                            {f.fact}
                            <span className="block text-[11px] text-subtle">{f.source}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-1.5 text-xs font-semibold text-warning">Assumptions</p>
                      <ul className="space-y-1.5">
                        {profile.assumptions.map((a, i) => (
                          <li key={i} className="text-xs">
                            {a.assumption}
                            <span className="block text-[11px] text-subtle">{a.rationale}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-1.5 text-xs font-semibold text-danger">Missing information</p>
                      <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                        {profile.missingInformation.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {brief && (
                    <div className="rounded-lg bg-surface-2 p-4">
                      <p className="mb-2 text-xs font-semibold">Website brief</p>
                      <dl className="grid gap-2 text-xs sm:grid-cols-2">
                        <div>
                          <dt className="text-muted">Primary CTA</dt>
                          <dd>{brief.primaryCta}</dd>
                        </div>
                        <div>
                          <dt className="text-muted">Tone</dt>
                          <dd>{brief.tone}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-muted">Design direction</dt>
                          <dd>{brief.designDirection}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-muted">Improvements</dt>
                          <dd>{profile.improvements.join(" · ")}</dd>
                        </div>
                      </dl>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Websites</CardTitle>
            </CardHeader>
            <CardContent>
              {projects.filter((p) => !p.deletedAt).length === 0 ? (
                <p className="text-xs text-muted">No website generated yet.</p>
              ) : (
                <ul className="space-y-1">
                  {projects
                    .filter((p) => !p.deletedAt)
                    .map((p) => (
                      <li key={p.id}>
                        <Link href={`/websites/${p.id}`} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-surface-2">
                          <span className="flex items-center gap-2 text-[13px] font-medium">
                            <Globe className="h-4 w-4 text-subtle" /> {p.slug}
                          </span>
                          <span className="flex items-center gap-2">
                            {p.qualityScore != null && <Badge tone="outline">QC {p.qualityScore}</Badge>}
                            <StatusBadge status={p.status} />
                            <StatusBadge status={p.approvalStatus} />
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emails</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-1">
              {emails.length === 0 ? (
                <p className="px-5 pb-4 text-xs text-muted">No emails drafted yet.</p>
              ) : (
                <Table className="rounded-none border-0 shadow-none">
                  <THead>
                    <tr>
                      <TH>Subject</TH>
                      <TH>Kind</TH>
                      <TH>Status</TH>
                      <TH>Created</TH>
                    </tr>
                  </THead>
                  <tbody>
                    {emails.map((e) => (
                      <TR key={e.id}>
                        <TD>
                          <Link href={`/emails/${e.id}`} className="font-medium hover:text-accent">
                            {e.subject}
                          </Link>
                        </TD>
                        <TD className="text-muted">{e.kind.replace("_", " ")}</TD>
                        <TD>
                          <StatusBadge status={e.status} />
                        </TD>
                        <TD className="text-muted">{timeAgo(e.createdAt)}</TD>
                      </TR>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <StageControls id={b.id} stage={b.pipelineStage} valueEur={b.salesValueCents != null ? b.salesValueCents / 100 : null} followUpAt={b.followUpAt?.toISOString() ?? null} />
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Business information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-[13px]">
              {b.address && (
                <p className="flex gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-subtle" /> {b.address}
                </p>
              )}
              {b.phone && (
                <p className="flex gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-subtle" /> {b.phone}
                </p>
              )}
              {b.websiteUrl && (
                <a href={b.websiteUrl} target="_blank" rel="noopener noreferrer nofollow" className="flex gap-2 hover:text-accent">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-subtle" /> <span className="truncate">{b.websiteUrl}</span>
                </a>
              )}
              {b.googleMapsUrl && (
                <a href={b.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2 text-accent hover:underline">
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" /> Google Maps listing
                </a>
              )}
              {b.rating != null && (
                <p className="text-xs text-muted">
                  Google rating {b.rating} ({b.reviewCount} reviews) — shown for context only, never used on generated sites.
                </p>
              )}
              {b.openingHours?.length ? (
                <div className="pt-1">
                  <p className="mb-1 text-xs font-medium">Opening hours</p>
                  <ul className="space-y-0.5 text-xs text-muted">
                    {b.openingHours.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Contact channels</CardTitle>
                <CardDescription>Publicly listed only, with source and verification.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {contacts.length === 0 && <p className="text-xs text-muted">No contacts recorded. Contact research never guesses addresses.</p>}
              {contacts.map((c) => (
                <div key={c.id} className="text-[13px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium">{c.value}</span>
                    <StatusBadge status={c.verificationStatus === "valid" ? "COMPLETED" : c.verificationStatus === "invalid" ? "FAILED" : "PENDING"} label={c.verificationStatus} />
                  </div>
                  <p className="text-[11px] text-subtle">
                    {c.type} · {c.source}
                    {c.isGeneric ? " · generic" : ""}
                    {c.verifiedAt ? ` · verified ${formatDate(c.verifiedAt)}` : ""}
                    {c.sourceUrl && (
                      <>
                        {" · "}
                        <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-accent">
                          source
                        </a>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <p className="text-xs text-muted">No activity yet.</p>
              ) : (
                <ol className="relative space-y-3 border-l border-border pl-4">
                  {activities.map((a) => (
                    <li key={a.id} className="text-xs">
                      <span className="absolute -left-[3.5px] mt-1.5 h-1.5 w-1.5 rounded-full bg-border-strong" />
                      <p className="whitespace-pre-wrap">{a.type === "stage_change" ? `Moved to ${PIPELINE_STAGES.find((s) => s.key === (a.metadata as { to?: string }).to)?.label ?? a.content}` : a.content}</p>
                      <p className="text-[11px] text-subtle">
                        {a.type.replace("_", " ")} · {timeAgo(a.createdAt)}
                      </p>
                    </li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
