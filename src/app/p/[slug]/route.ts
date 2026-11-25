import { and, eq, isNull } from "drizzle-orm";
import { getAuth } from "@/server/auth";
import { db, schema } from "@/server/db";

export const dynamic = "force-dynamic";

const HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  // Generated sites are static: no network access beyond our fonts and authorised HTTPS images.
  "Content-Security-Policy":
    "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: https:; font-src 'self'; form-action 'none'; base-uri 'none'; frame-ancestors 'self'",
  "Cache-Control": "no-store",
};

/**
 * Hosted preview of a generated website (always marked as a demonstration).
 * The current version is shareable with the prospect; older versions (?v=N) require login.
 */
export async function GET(req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return new Response("Not found", { status: 404 });
  const [project] = await db()
    .select()
    .from(schema.websiteProjects)
    .where(and(eq(schema.websiteProjects.slug, slug), isNull(schema.websiteProjects.deletedAt)));
  if (!project?.currentVersionId) return new Response("Preview not found", { status: 404 });

  let versionId = project.currentVersionId;
  const v = new URL(req.url).searchParams.get("v");
  if (v) {
    const auth = await getAuth();
    if (!auth || auth.org.id !== project.organizationId) return new Response("Sign in to view earlier versions", { status: 401 });
    const [ver] = await db()
      .select({ id: schema.websiteVersions.id })
      .from(schema.websiteVersions)
      .where(and(eq(schema.websiteVersions.projectId, project.id), eq(schema.websiteVersions.versionNo, Number(v) || 0)));
    if (!ver) return new Response("Version not found", { status: 404 });
    versionId = ver.id;
  } else if (project.status !== "ready") {
    // Unfinished or failed versions are only visible to the agency.
    const auth = await getAuth();
    if (!auth || auth.org.id !== project.organizationId) return new Response("This preview is not available yet.", { status: 404 });
  }
  const [file] = await db()
    .select({ content: schema.websiteFiles.content })
    .from(schema.websiteFiles)
    .where(and(eq(schema.websiteFiles.versionId, versionId), eq(schema.websiteFiles.path, "index.html")));
  if (!file) return new Response("Preview not found", { status: 404 });
  // Exported sites ship fonts under ./assets; the hosted preview serves them from /site-assets.
  const html = file.content.replaceAll('url("assets/fonts/', 'url("/site-assets/fonts/');
  return new Response(html, { headers: HEADERS });
}
