import { and, desc, eq, ilike, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import { AuthError, requireApiAuth } from "@/server/auth";
import { db, schema } from "@/server/db";

export const dynamic = "force-dynamic";

export type SearchHit = { type: "lead" | "website" | "run" | "email"; id: string; title: string; subtitle: string; href: string };

/** Global search for the command palette. Organisation-scoped; LIKE wildcards in the query are escaped. */
export async function GET(req: Request) {
  try {
    const auth = await requireApiAuth();
    const q = (new URL(req.url).searchParams.get("q") ?? "").trim().slice(0, 80);
    if (q.length < 2) return NextResponse.json({ hits: [] });
    const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
    const orgId = auth.org.id;
    const b = schema.businesses;
    const [leads, sites, runs, emails] = await Promise.all([
      db()
        .select({ id: b.id, name: b.name, city: b.city, stage: b.pipelineStage, category: b.category })
        .from(b)
        .where(and(eq(b.organizationId, orgId), isNull(b.erasedAt), or(ilike(b.name, like), ilike(b.city, like), ilike(b.websiteUrl, like))))
        .orderBy(desc(b.updatedAt))
        .limit(6),
      db()
        .select({ id: schema.websiteProjects.id, name: b.name, status: schema.websiteProjects.status, slug: schema.websiteProjects.slug })
        .from(schema.websiteProjects)
        .innerJoin(b, eq(b.id, schema.websiteProjects.businessId))
        .where(and(eq(schema.websiteProjects.organizationId, orgId), isNull(schema.websiteProjects.deletedAt), or(ilike(b.name, like), ilike(schema.websiteProjects.slug, like))))
        .orderBy(desc(schema.websiteProjects.updatedAt))
        .limit(4),
      db()
        .select({ id: schema.workflowRuns.id, objective: schema.workflowRuns.objective, status: schema.workflowRuns.status })
        .from(schema.workflowRuns)
        .where(and(eq(schema.workflowRuns.organizationId, orgId), ilike(schema.workflowRuns.objective, like)))
        .orderBy(desc(schema.workflowRuns.createdAt))
        .limit(4),
      db()
        .select({ id: schema.salesEmails.id, subject: schema.salesEmails.subject, status: schema.salesEmails.status })
        .from(schema.salesEmails)
        .where(and(eq(schema.salesEmails.organizationId, orgId), ilike(schema.salesEmails.subject, like)))
        .orderBy(desc(schema.salesEmails.createdAt))
        .limit(4),
    ]);
    const nice = (s: string) => s.replace(/_/g, " ").toLowerCase();
    const hits: SearchHit[] = [
      ...leads.map((l) => ({ type: "lead" as const, id: l.id, title: l.name, subtitle: [l.city, nice(l.stage)].filter(Boolean).join(" · "), href: `/businesses/${l.id}` })),
      ...sites.map((s) => ({ type: "website" as const, id: s.id, title: `${s.name} — website`, subtitle: nice(s.status), href: `/websites/${s.id}` })),
      ...runs.map((r) => ({ type: "run" as const, id: r.id, title: r.objective ?? "Run", subtitle: nice(r.status), href: `/automations/runs/${r.id}` })),
      ...emails.map((e) => ({ type: "email" as const, id: e.id, title: e.subject, subtitle: nice(e.status), href: `/emails/${e.id}` })),
    ];
    return NextResponse.json({ hits }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/search]", (err as Error).message);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
