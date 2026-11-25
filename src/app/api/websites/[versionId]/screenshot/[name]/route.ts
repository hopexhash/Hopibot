import { and, eq } from "drizzle-orm";
import { AuthError, requireApiAuth } from "@/server/auth";
import { db, schema } from "@/server/db";

export const dynamic = "force-dynamic";

/** QC screenshots (stored as data URIs) served as images to signed-in members. */
export async function GET(_req: Request, ctx: { params: Promise<{ versionId: string; name: string }> }) {
  try {
    const auth = await requireApiAuth();
    const { versionId, name } = await ctx.params;
    if (!/^[0-9a-f-]{36}$/.test(versionId) || !["desktop", "tablet", "mobile"].includes(name)) return new Response("Not found", { status: 404 });
    const [f] = await db()
      .select({ content: schema.websiteFiles.content })
      .from(schema.websiteFiles)
      .where(and(eq(schema.websiteFiles.versionId, versionId), eq(schema.websiteFiles.path, `_qc/${name}.jpg`), eq(schema.websiteFiles.organizationId, auth.org.id)));
    if (!f) return new Response("Not found", { status: 404 });
    const b64 = f.content.replace(/^data:image\/jpeg;base64,/, "");
    return new Response(Buffer.from(b64, "base64"), { headers: { "Content-Type": "image/jpeg", "Cache-Control": "private, max-age=86400, immutable" } });
  } catch (err) {
    if (err instanceof AuthError) return new Response(err.message, { status: err.status });
    return new Response("Error", { status: 500 });
  }
}
