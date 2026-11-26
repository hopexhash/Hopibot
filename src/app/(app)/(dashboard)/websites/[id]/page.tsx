import { and, desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { siteSpecSchema } from "@/lib/site-spec";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { WebsiteProgress } from "@/components/app/website-progress";
import { INQUIRY_SOURCE } from "@/lib/inquiry-email";
import { WebsiteManager } from "./website-manager";

export const metadata = { title: "Website" };

export default async function WebsitePage({ params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const [project] = await db()
    .select()
    .from(schema.websiteProjects)
    .where(and(eq(schema.websiteProjects.id, id), eq(schema.websiteProjects.organizationId, auth.org.id)));
  if (!project || project.deletedAt) notFound();
  const [business] = await db().select().from(schema.businesses).where(eq(schema.businesses.id, project.businessId));
  const versions = await db()
    .select({
      id: schema.websiteVersions.id,
      versionNo: schema.websiteVersions.versionNo,
      changeSummary: schema.websiteVersions.changeSummary,
      instruction: schema.websiteVersions.instruction,
      qcScore: schema.websiteVersions.qcScore,
      qcReport: schema.websiteVersions.qcReport,
      createdBy: schema.websiteVersions.createdBy,
      isMock: schema.websiteVersions.isMock,
      createdAt: schema.websiteVersions.createdAt,
      spec: schema.websiteVersions.spec,
    })
    .from(schema.websiteVersions)
    .where(eq(schema.websiteVersions.projectId, project.id))
    .orderBy(desc(schema.websiteVersions.versionNo));
  const deployments = await db().select().from(schema.deployments).where(eq(schema.deployments.projectId, project.id)).orderBy(desc(schema.deployments.createdAt)).limit(20);
  const [pendingPublish] = await db()
    .select({ id: schema.approvals.id, status: schema.approvals.status })
    .from(schema.approvals)
    .where(and(eq(schema.approvals.subjectId, project.id), eq(schema.approvals.kind, "publish_website")))
    .orderBy(desc(schema.approvals.createdAt))
    .limit(1);
  const current = versions.find((v) => v.id === project.currentVersionId) ?? versions[0];
  const spec = current ? siteSpecSchema.safeParse(current.spec) : null;
  // Asked for through the website form: approving the design emails it to this address.
  const [inquiry] =
    business.source === INQUIRY_SOURCE
      ? await db()
          .select({ email: schema.businessContacts.value })
          .from(schema.businessContacts)
          .where(and(eq(schema.businessContacts.businessId, business.id), eq(schema.businessContacts.type, "email"), eq(schema.businessContacts.source, "inquiry")))
          .orderBy(desc(schema.businessContacts.createdAt))
          .limit(1)
      : [];

  const visual = ((versions.find((v) => v.id === project.currentVersionId) ?? versions[0])?.qcReport as { visual?: Parameters<typeof WebsiteProgress>[0]["visual"] } | null)?.visual ?? null;
  return (
    <>
    <WebsiteProgress businessId={business.id} organizationId={auth.org.id} status={project.status} visual={visual} />
    <WebsiteManager
      project={{ id: project.id, slug: project.slug, status: project.status, approvalStatus: project.approvalStatus, qualityScore: project.qualityScore, templateKey: project.templateKey, currentVersionId: project.currentVersionId, previewUrl: project.previewUrl, updatedAt: project.updatedAt.toISOString() }}
      business={{ id: business.id, name: business.name, city: business.city, stage: business.pipelineStage, isMock: business.isMock, inquiryEmail: inquiry?.email ?? null }}
      versions={versions.map((v) => ({ ...v, spec: undefined, createdAt: v.createdAt.toISOString(), qcReport: v.qcReport as never }))}
      spec={spec?.success ? spec.data : null}
      deployments={deployments.map((d) => ({ id: d.id, status: d.status, url: d.url, provider: d.provider, environment: d.environment, error: d.error, createdAt: d.createdAt.toISOString(), versionId: d.versionId, githubRepo: d.githubRepo }))}
      publishApproval={pendingPublish ?? null}
      canAdmin={hasRole(auth.role, "admin")}
    />
    </>
  );
}
