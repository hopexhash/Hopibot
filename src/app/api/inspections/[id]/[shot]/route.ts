import { and, eq } from "drizzle-orm";
import { AuthError, requireApiAuth } from "@/server/auth";
import { db, schema } from "@/server/db";

export const dynamic = "force-dynamic";

/** Serves a stored inspection screenshot to members of the organisation that owns it. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string; shot: string }> }) {
  try {
    const auth = await requireApiAuth("member");
    const { id, shot } = await params;
    if (!/^[0-9a-f-]{36}$/i.test(id) || (shot !== "desktop" && shot !== "mobile")) return new Response("Not found", { status: 404 });
    const col = shot === "desktop" ? schema.websiteInspections.desktopShot : schema.websiteInspections.mobileShot;
    const [row] = await db().select({ data: col }).from(schema.websiteInspections).where(and(eq(schema.websiteInspections.id, id), eq(schema.websiteInspections.organizationId, auth.org.id)));
    if (!row?.data) return new Response("Not found", { status: 404 });
    return new Response(Buffer.from(row.data, "base64"), { headers: { "Content-Type": "image/jpeg", "Cache-Control": "private, max-age=86400", "X-Content-Type-Options": "nosniff" } });
  } catch (err) {
    if (err instanceof AuthError) return new Response("Unauthorized", { status: 401 });
    throw err;
  }
}
