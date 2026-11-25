import { desc, eq } from "drizzle-orm";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from "@/components/ui";
import { AREA_LABEL, REDESIGN_AREAS, REDESIGN_WEIGHTS, type FeedbackKey } from "@/lib/qualification";
import { formatDateTime } from "@/lib/utils";
import { db, schema } from "@/server/db";
import { domainOf } from "@/server/scoring/lead-score";
import { InspectWebsiteButton, QualificationBadge, WebsiteFeedback } from "./qualification";

/**
 * Everything the qualification engine found for one business: screenshots, the redesign
 * score per area, the concrete problems, why it was accepted or rejected, and your own verdict.
 */
export async function WebsiteInspectionCard({ business }: { business: { id: string; organizationId: string; websiteUrl: string | null; websiteStatus: string; qualification: string | null } }) {
  if (!business.websiteUrl || (business.websiteStatus !== "has_website" && business.websiteStatus !== "unreachable")) return null;
  const i = schema.websiteInspections;
  const [[insp], feedback] = await Promise.all([
    db()
      .select({ id: i.id, url: i.url, qualification: i.qualification, redesignScore: i.redesignScore, areaScores: i.areaScores, problems: i.problems, opportunities: i.opportunities, explanation: i.explanation, summary: i.summary, verification: i.verification, costUsd: i.costUsd, isMock: i.isMock, createdAt: i.createdAt, hasShots: i.mobileShot })
      .from(i)
      .where(eq(i.businessId, business.id))
      .orderBy(desc(i.createdAt))
      .limit(1),
    db().select({ classification: schema.websiteFeedback.classification, domain: schema.websiteFeedback.domain }).from(schema.websiteFeedback).where(eq(schema.websiteFeedback.organizationId, business.organizationId)),
  ]);
  const domain = domainOf(business.websiteUrl);
  const mine = (feedback.find((f) => f.domain === domain)?.classification ?? null) as FeedbackKey | null;
  const areas = (insp?.areaScores ?? {}) as Record<string, number>;
  const hasAreas = Object.keys(areas).length > 0;
  const problems = insp?.verification?.approach && insp.verification.problems.length ? insp.verification.problems : (insp?.problems ?? []).map((p) => `${p.problem}${p.evidence ? ` (${p.evidence})` : ""}`);

  return (
    <Card>
      <CardHeader>
        <div className="min-w-0">
          <CardTitle>Website qualification</CardTitle>
          <CardDescription>
            <a href={business.websiteUrl} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex max-w-full items-center gap-1 hover:text-accent">
              <span className="truncate">{business.websiteUrl.replace(/^https?:\/\/(www\.)?/, "")}</span>
              <ExternalLink className="h-3 w-3 flex-none" />
            </a>
            {insp ? ` · inspected ${formatDateTime(insp.createdAt)}` : " · not inspected yet"}
            {insp?.isMock ? " · MOCK" : ""}
          </CardDescription>
        </div>
        <InspectWebsiteButton businessIds={[business.id]} label={insp ? "Inspect again" : "Inspect website"} />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <QualificationBadge value={business.qualification ?? insp?.qualification} />
          {insp && hasAreas && (
            <p className="text-[13px] text-muted">
              Redesign score <span className="tabular font-semibold text-foreground">{insp.redesignScore}</span> / 100 <span className="text-subtle">(higher = needs a redesign more)</span>
            </p>
          )}
        </div>

        {insp && <p className="text-[13.5px] leading-relaxed">{insp.explanation}</p>}
        {!insp && <p className="text-[13.5px] text-muted">This website has not been opened in a real browser yet. Start an inspection to get screenshots, a redesign score and a decision.</p>}

        {insp?.hasShots && (
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.3fr)] items-start gap-3">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element -- authenticated, dynamically stored screenshot */}
              <img src={`/api/inspections/${insp.id}/desktop`} alt="Screenshot of the website on a desktop screen" loading="lazy" className="w-full rounded-lg border border-border" />
              <figcaption className="mt-1.5 text-xs text-muted">Desktop</figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element -- authenticated, dynamically stored screenshot */}
              <img src={`/api/inspections/${insp.id}/mobile`} alt="Screenshot of the website on a phone" loading="lazy" className="w-full rounded-lg border border-border" />
              <figcaption className="mt-1.5 text-xs text-muted">Phone (390px)</figcaption>
            </figure>
          </div>
        )}

        {insp && hasAreas && (
          <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {REDESIGN_AREAS.map((a) => (
              <div key={a}>
                <div className="flex items-baseline justify-between gap-2 text-[13px]">
                  <span>{AREA_LABEL[a]}</span>
                  <span className="tabular text-muted">
                    {areas[a] ?? 0} / {REDESIGN_WEIGHTS[a]}
                  </span>
                </div>
                <Progress className="mt-1.5" value={((areas[a] ?? 0) / REDESIGN_WEIGHTS[a]) * 100} tone={(areas[a] ?? 0) / REDESIGN_WEIGHTS[a] >= 0.6 ? "danger" : (areas[a] ?? 0) / REDESIGN_WEIGHTS[a] >= 0.3 ? "warning" : "success"} />
              </div>
            ))}
          </div>
        )}

        {problems.length > 0 && (
          <div>
            <p className="text-[13px] font-medium">Identified problems</p>
            <ul className="mt-2 space-y-1.5">
              {problems.map((p) => (
                <li key={p} className="flex gap-2 text-[13.5px] leading-snug text-muted">
                  <span className="mt-[8px] h-1 w-1 flex-none rounded-full bg-danger" /> {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {insp?.verification && (
          <div className="rounded-lg border border-border p-3">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Independent verification: {insp.verification.approach ? "worth approaching" : "not worth approaching"}</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed">{insp.verification.reasoning}</p>
          </div>
        )}

        {insp && insp.opportunities.length > 0 && (
          <div>
            <p className="text-[13px] font-medium">Recommended redesign opportunities</p>
            <ul className="mt-2 space-y-1.5">
              {insp.opportunities.map((o) => (
                <li key={o} className="flex gap-2 text-[13.5px] leading-snug text-muted">
                  <span className="mt-[8px] h-1 w-1 flex-none rounded-full bg-accent" /> {o}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-border pt-4">
          <WebsiteFeedback businessId={business.id} current={mine} />
        </div>
      </CardContent>
    </Card>
  );
}
