import { and, desc, eq, isNull } from "drizzle-orm";
import { ExternalLink, Monitor } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Badge, Button, Card, EmptyState, MockBadge } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";

export const metadata = { title: "Preview Websites" };

export default async function PreviewsPage() {
  const auth = await requireAuth();
  const rows = await db()
    .select({
      project: schema.websiteProjects,
      business: { name: schema.businesses.name, city: schema.businesses.city, isMock: schema.businesses.isMock },
      version: { id: schema.websiteVersions.id, versionNo: schema.websiteVersions.versionNo, createdAt: schema.websiteVersions.createdAt },
    })
    .from(schema.websiteProjects)
    .innerJoin(schema.businesses, eq(schema.businesses.id, schema.websiteProjects.businessId))
    .leftJoin(schema.websiteVersions, eq(schema.websiteVersions.id, schema.websiteProjects.currentVersionId))
    .where(and(eq(schema.websiteProjects.organizationId, auth.org.id), isNull(schema.websiteProjects.deletedAt), eq(schema.websiteProjects.status, "ready")))
    .orderBy(desc(schema.websiteProjects.updatedAt))
    .limit(120);
  const deployments = await db()
    .select({ projectId: schema.deployments.projectId, status: schema.deployments.status, url: schema.deployments.url, provider: schema.deployments.provider })
    .from(schema.deployments)
    .where(eq(schema.deployments.organizationId, auth.org.id))
    .orderBy(desc(schema.deployments.createdAt));
  const latestDeploy = new Map<string, (typeof deployments)[number]>();
  for (const d of deployments) if (!latestDeploy.has(d.projectId)) latestDeploy.set(d.projectId, d);

  return (
    <>
      <PageHeader title="Preview Websites" description="Websites that passed quality control. Every preview carries a visible demonstration notice and is excluded from search engines." />
      {rows.length === 0 ? (
        <Card>
          <EmptyState icon={<Monitor />} title="No ready previews yet" description="Websites appear here once they pass quality control (score ≥ 85)." />
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map(({ project, business, version }) => {
            const dep = latestDeploy.get(project.id);
            const url = dep?.status === "ready" && dep.url ? dep.url : `/p/${project.slug}`;
            return (
              <Card key={project.id} className="group overflow-hidden transition-shadow hover:shadow-[var(--shadow-md)]">
                <Link href={`/websites/${project.id}`} className="block aspect-[16/10] overflow-hidden border-b border-border bg-surface-2">
                  {version ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/api/websites/${version.id}/screenshot/desktop`} alt={`Preview of ${business.name}`} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  ) : null}
                </Link>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 truncate text-[13px] font-semibold">
                        {business.name} {business.isMock && <MockBadge />}
                      </p>
                      <p className="text-xs text-muted">
                        {business.city} · v{version?.versionNo} · {formatDate(version?.createdAt)}
                      </p>
                    </div>
                    <Badge tone="success">QC {project.qualityScore}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={project.approvalStatus} />
                    {dep ? <StatusBadge status={dep.status} label={`${dep.provider} ${dep.status}`} /> : <Badge tone="outline">not deployed</Badge>}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/websites/${project.id}`}>Manage</Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink /> Open
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
