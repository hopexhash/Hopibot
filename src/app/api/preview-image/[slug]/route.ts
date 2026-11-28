import { and, eq, isNull } from "drizzle-orm";
import { db, schema } from "@/server/db";

export const dynamic = "force-dynamic";

/**
 * The screenshot of a website concept, for the preview in the email that announces it.
 * Only for designs that are ready (the same page is public at /d/<slug>); the image is
 * reduced to email size. Anything else is a plain 404.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const none = new Response(null, { status: 404 });
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return none;
  const [project] = await db()
    .select({ versionId: schema.websiteProjects.currentVersionId, status: schema.websiteProjects.status })
    .from(schema.websiteProjects)
    .where(and(eq(schema.websiteProjects.slug, slug), isNull(schema.websiteProjects.deletedAt)));
  if (!project?.versionId || project.status !== "ready") return none;
  const [v] = await db().select({ qc: schema.websiteVersions.qcReport }).from(schema.websiteVersions).where(eq(schema.websiteVersions.id, project.versionId));
  const shot = (v?.qc as { screenshots?: Record<string, string> } | null)?.screenshots?.desktop;
  const m = shot?.match(/^data:image\/(jpeg|png);base64,(.+)$/);
  if (!m) return none;
  let body: Uint8Array = Buffer.from(m[2]!, "base64");
  let type = `image/${m[1]}`;
  try {
    // 1040px wide covers a 520px email column on sharp screens; much lighter than the 1440px capture.
    const sharp = (await import("sharp")).default;
    body = await sharp(body).resize({ width: 1040, withoutEnlargement: true }).jpeg({ quality: 72, mozjpeg: true }).toBuffer();
    type = "image/jpeg";
  } catch {
    // Without image processing the original capture is served as it is.
  }
  return new Response(body as BodyInit, { headers: { "content-type": type, "cache-control": "public, max-age=86400, stale-while-revalidate=604800" } });
}
