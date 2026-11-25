import { AuthError, requireApiAuth } from "@/server/auth";
import { audit } from "@/server/audit";
import { listBusinesses, parseBusinessFilters } from "@/server/queries/businesses";
import { rateLimit, RateLimitError } from "@/server/ratelimit";

export const dynamic = "force-dynamic";

function csvCell(v: unknown) {
  const s = v == null ? "" : v instanceof Date ? v.toISOString() : String(v);
  // Prevent CSV/formula injection in spreadsheet apps.
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return /[",\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export async function GET(req: Request) {
  try {
    const auth = await requireApiAuth("member");
    await rateLimit(`export:${auth.user.id}`, 10, 60);
    const sp = Object.fromEntries(new URL(req.url).searchParams);
    const filters = parseBusinessFilters({ ...sp, page: "1", pageSize: "200" });
    const header = ["id", "name", "category", "city", "address", "phone", "email", "website", "website_status", "website_quality", "lead_score", "research_status", "pipeline_stage", "mock", "created_at"];
    const lines = [header.join(",")];
    const ids = sp.ids?.split(",").filter(Boolean);
    let page = 1;
    let exported = 0;
    // Stream through pages so exports of large lists stay bounded in memory.
    while (page <= 100) {
      const { rows } = await listBusinesses(auth.org.id, { ...filters, page, pageSize: 200 });
      for (const r of rows) {
        if (ids?.length && !ids.includes(r.id)) continue;
        lines.push(
          [r.id, r.name, r.category, r.city, r.address, r.phone, r.email, r.websiteUrl, r.websiteStatus, r.websiteQuality, r.leadScore, r.researchStatus, r.pipelineStage, r.isMock, r.createdAt].map(csvCell).join(","),
        );
        exported++;
      }
      if (rows.length < 200) break;
      page++;
    }
    await audit({ organizationId: auth.org.id, userId: auth.user.id, action: "businesses.export", metadata: { rows: exported } });
    return new Response(lines.join("\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="businesses-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    if (err instanceof AuthError) return Response.json({ error: err.message }, { status: err.status });
    if (err instanceof RateLimitError) return Response.json({ error: err.message }, { status: 429 });
    console.error("[export]", err);
    return Response.json({ error: "Export failed" }, { status: 500 });
  }
}
