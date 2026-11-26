import "../guard";
import { and, desc, eq } from "drizzle-orm";
import { siteSpecSchema } from "@/lib/site-spec";
import { stageEvent, stageLabel } from "@/lib/website-stages";
import { reviewVisually, visualOutcome, VISUAL_BAR } from "../qc/visual-review";
import { db, schema } from "../db";
import { AgentError } from "../integrations/anthropic";
import { continuePipeline } from "../orchestrator/pipeline";
import { notify } from "../orchestrator/tasks";
import type { AgentHandler } from "../orchestrator/types";
import { runQc } from "../qc/run-qc";
import { contentIntegrityIssues } from "../website/service";

export const qualityControl: AgentHandler = async (ctx) => {
  const input = ctx.task.input as { versionId: string; next?: string[]; iteration?: number; visualRound?: number };
  const stage = (n: number, detail: string, status: "running" | "completed" | "warning" = "running") => ctx.log(status === "warning" ? "warn" : "info", `${stageLabel(n)}: ${detail}`, stageEvent(n, status));
  const [version] = await db()
    .select()
    .from(schema.websiteVersions)
    .where(and(eq(schema.websiteVersions.id, input.versionId), eq(schema.websiteVersions.organizationId, ctx.organizationId)));
  if (!version) throw new Error("Version not found");
  const [project] = await db().select().from(schema.websiteProjects).where(eq(schema.websiteProjects.id, version.projectId));
  const files = await db().select().from(schema.websiteFiles).where(eq(schema.websiteFiles.versionId, version.id));
  const spec = siteSpecSchema.parse(version.spec);

  // Claims are allowed only if they appear in verified research facts.
  const [research] = await db()
    .select({ profile: schema.businessResearch.profile })
    .from(schema.businessResearch)
    .where(eq(schema.businessResearch.businessId, project.businessId))
    .orderBy(desc(schema.businessResearch.createdAt))
    .limit(1);
  const verifiedFacts = ((research?.profile as { verifiedFacts?: { fact: string }[] } | undefined)?.verifiedFacts ?? []).map((f) => f.fact).join("\n");
  const integrity = contentIntegrityIssues(spec, verifiedFacts);

  await stage(9, `version ${version.versionNo} in a real browser at seven screen widths: layout, links, forms, SEO and accessibility`);
  await ctx.heartbeat();
  const report = await runQc({ files, integrityIssues: integrity, expectDemoBanner: true });
  await ctx.heartbeat();
  const screenshots = report.screenshots;
  const reportForDb = { ...report, screenshots: undefined };

  await db()
    .update(schema.websiteVersions)
    .set({ qcScore: report.score, qcReport: reportForDb as unknown as Record<string, unknown> })
    .where(eq(schema.websiteVersions.id, version.id));
  // Screenshots stored as files of the version (not deployed).
  for (const [name, dataUri] of Object.entries(screenshots)) {
    await db()
      .insert(schema.websiteFiles)
      .values({ organizationId: ctx.organizationId, versionId: version.id, path: `_qc/${name}.jpg`, content: dataUri, contentType: "image/jpeg;base64", sha1: "", size: dataUri.length })
      .onConflictDoUpdate({ target: [schema.websiteFiles.versionId, schema.websiteFiles.path], set: { content: dataUri, size: dataUri.length } });
  }
  await ctx.log(report.passed ? "info" : "warn", `${stageLabel(9)}: technical score ${report.score}/100, ${report.issues.length} issue(s)${report.passed ? ", passed" : ""}`, {
    ...stageEvent(9, report.passed ? "completed" : "warning"),
    issues: report.issues.slice(0, 10).map((i) => `${i.severity}: ${i.message}`),
  });

  // Only the project's current version decides the project status.
  const isCurrent = project.currentVersionId === version.id;
  const maxRetries = ctx.settings.qcMaxRetries;
  if (report.passed) {
    // Visual review: a design critic looks at the rendered page. One controlled improvement
    // round at most; the second review only records the result.
    const visualRound = input.visualRound ?? 0;
    const identity = spec.theme.identity;
    const parts = (prefix: string) => [1, 2, 3].map((k) => screenshots[`${prefix}_part${k}`]).filter(Boolean);
    if (identity && !version.isMock && parts("desktop").length && parts("mobile").length && (await ctx.mode("anthropic")) === "live") {
      try {
        await stage(10, visualRound ? "reviewing the improved version" : "a design review of the desktop and phone screenshots");
        await ctx.heartbeat();
        const [biz] = await db().select({ name: schema.businesses.name, category: schema.businesses.category }).from(schema.businesses).where(eq(schema.businesses.id, project.businessId));
        const hasPhotos = spec.images.some((i) => i.license !== "generated");
        const { review } = await reviewVisually({ ...ctx.usage, businessId: project.businessId, projectId: project.id }, { business: biz ?? { name: spec.business.name, category: "local_service" }, direction: identity.direction, personality: identity.personality, hasPhotos, desktop: parts("desktop"), mobile: parts("mobile") });
        const outcome = visualOutcome(review, report.score);
        await db()
          .update(schema.websiteVersions)
          .set({ qcReport: { ...reportForDb, visual: { ...outcome, weaknesses: review.weaknesses, genericPatterns: review.genericPatterns, verdict: review.verdict, round: visualRound } } as unknown as Record<string, unknown> })
          .where(eq(schema.websiteVersions.id, version.id));
        const s = outcome.scores;
        const line = `visual quality ${outcome.overall}/100 (design ${s.visualDesign}, industry fit ${s.industryRelevance}, typography ${s.typography}, layout ${s.layout}, mobile ${s.mobile}, brand ${s.brandIdentity}, function ${s.functionality}). ${review.verdict}`;
        if (!outcome.passed && visualRound < 1 && review.weaknesses.length) {
          await stage(10, `${line} Below the bar of ${VISUAL_BAR.overall}: improving ${review.weaknesses.length} point(s), starting with "${review.weaknesses[0].problem}"`, "warning");
          await db().update(schema.websiteProjects).set({ status: "needs_fixes", qualityScore: outcome.overall, updatedAt: new Date() }).where(eq(schema.websiteProjects.id, project.id));
          const runKey = ctx.task.runId ?? `adhoc-${ctx.task.id}`;
          await ctx.spawn({
            agentKey: "website_builder",
            type: "refine_design",
            businessId: project.businessId,
            projectId: project.id,
            input: { weaknesses: review.weaknesses, next: input.next ?? [], iteration: (input.iteration ?? 0) + 1, visualRound: 1 },
            idempotencyKey: `${runKey}:refine:${project.id}:${version.id}`,
          });
          return { status: "completed", output: { score: report.score, visual: outcome.overall, passed: false, refining: true } };
        }
        await stage(10, line, outcome.passed ? "completed" : "warning");
        // An improvement round can make things worse. The version that scored higher is the one shown.
        if (visualRound >= 1 && isCurrent) {
          const [prev] = await db()
            .select({ id: schema.websiteVersions.id, versionNo: schema.websiteVersions.versionNo, qcReport: schema.websiteVersions.qcReport })
            .from(schema.websiteVersions)
            .where(and(eq(schema.websiteVersions.projectId, project.id), eq(schema.websiteVersions.versionNo, version.versionNo - 1)));
          const prevReport = prev?.qcReport as { passed?: boolean; score?: number; visual?: { overall?: number } } | null;
          const prevOverall = prevReport?.visual?.overall;
          if (prev && prevReport?.passed && typeof prevOverall === "number" && prevOverall > outcome.overall) {
            await db()
              .update(schema.websiteProjects)
              .set({ currentVersionId: prev.id, status: "ready", qualityScore: prevReport.score ?? report.score, previewUrl: `/p/${project.slug}`, updatedAt: new Date() })
              .where(eq(schema.websiteProjects.id, project.id));
            await stage(10, `the improvement round scored lower (${outcome.overall} against ${prevOverall}): keeping version ${prev.versionNo}`, "warning");
            await continuePipeline(ctx, { businessId: project.businessId, projectId: project.id, next: input.next ?? [] });
            return { status: "completed", output: { score: prevReport.score ?? report.score, visual: prevOverall, passed: true, keptVersion: prev.versionNo } };
          }
        }
      } catch (err) {
        // The review is an extra pair of eyes; if it cannot run, the tested site still goes ahead.
        await stage(10, `the design review could not run (${(err as Error).message.slice(0, 140)}); continuing with the tested version`, "warning");
      }
    }
    if (!(input.next ?? []).includes("deploy")) await stage(11, `version ${version.versionNo} is ready as a preview`, "completed");
    if (isCurrent) {
      await db()
        .update(schema.websiteProjects)
        .set({ status: "ready", qualityScore: report.score, previewUrl: `/p/${project.slug}`, updatedAt: new Date() })
        .where(eq(schema.websiteProjects.id, project.id));
    }
    await continuePipeline(ctx, { businessId: project.businessId, projectId: project.id, next: input.next ?? [] });
    return { status: "completed", output: { score: report.score, passed: true, issues: report.issues.length } };
  }

  if (version.qcAttempts < maxRetries) {
    // Send issues back to the builder; the fixed version gets re-tested automatically.
    await db().update(schema.websiteProjects).set({ status: "needs_fixes", qualityScore: report.score, updatedAt: new Date() }).where(eq(schema.websiteProjects.id, project.id));
    // The fix version inherits the attempt counter (+1) — set before the builder can run.
    await db().update(schema.websiteVersions).set({ qcAttempts: version.qcAttempts + 1 }).where(eq(schema.websiteVersions.id, version.id));
    const runKey = ctx.task.runId ?? `adhoc-${ctx.task.id}`;
    await ctx.spawn({
      agentKey: "website_builder",
      type: "fix_issues",
      businessId: project.businessId,
      projectId: project.id,
      input: {
        issues: report.issues.map((i) => ({ code: i.code, message: i.message, detail: i.detail })),
        next: input.next ?? [],
        iteration: (input.iteration ?? 0) + 1,
      },
      idempotencyKey: `${runKey}:fix:${project.id}:${version.id}`,
    });
    await ctx.log("info", `Score below threshold — requested corrections (attempt ${version.qcAttempts + 1}/${maxRetries}).`);
    return { status: "completed", output: { score: report.score, passed: false, retry: version.qcAttempts + 1 } };
  }

  // Out of retries: never mark a failed website as ready.
  await db().update(schema.websiteProjects).set({ status: "failed", qualityScore: report.score, updatedAt: new Date() }).where(eq(schema.websiteProjects.id, project.id));
  await notify(ctx.organizationId, "A website failed quality control", `Score ${report.score}/100 after ${maxRetries} correction attempts.`, `/websites/${project.id}`);
  throw new AgentError(`Website failed QC with score ${report.score} after ${maxRetries} correction attempts.`, "QC_FAILED", false);
};
