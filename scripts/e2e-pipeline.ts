// End-to-end check of the agent pipeline against real Postgres + Redis + worker (mock integrations).
// Usage: start `npm run worker` in another shell, then `npx tsx scripts/e2e-pipeline.ts`.
import "dotenv/config";
import { count, eq } from "drizzle-orm";
import { closeDb, db, schema } from "../src/server/db";
import { createOrganization } from "../src/server/org";
import { startRun } from "../src/server/orchestrator/runs";
import { hashPassword } from "../src/server/crypto";

async function main() {
  const email = `e2e-${Date.now()}@example.test`;
  const [user] = await db().insert(schema.users).values({ email, name: "E2E", passwordHash: await hashPassword("password123x") }).returning();
  const org = await createOrganization("E2E Agency", user.id);
  await db()
    .update(schema.organizations)
    .set({ settings: { ...(org.settings as object), agencyName: "E2E Agency", senderEmail: "hello@e2e.test", senderName: "E2E" } })
    .where(eq(schema.organizations.id, org.id));
  const run = await startRun({
    organizationId: org.id,
    objective: "Find 6 restaurants in Rotterdam, build previews for the best 2 and draft emails",
    plan: {
      summary: "E2E run",
      discovery: { country: "Netherlands", city: "Rotterdam", category: "restaurant", radiusKm: 10, limit: 6, minScore: 30, keywords: "", businessName: "", websiteStatus: "any" },
      topN: 2,
      actions: ["research", "contacts", "generate_website", "qc", "deploy", "sales_email"],
    },
  });
  console.log(`org ${org.id} run ${run.id}`);
  const started = Date.now();
  while (Date.now() - started < 240_000) {
    const [r] = await db().select().from(schema.workflowRuns).where(eq(schema.workflowRuns.id, run.id));
    const tasks = await db()
      .select({ agent: schema.agentTasks.agentKey, status: schema.agentTasks.status, n: count() })
      .from(schema.agentTasks)
      .where(eq(schema.agentTasks.runId, run.id))
      .groupBy(schema.agentTasks.agentKey, schema.agentTasks.status);
    process.stdout.write(`\r${((Date.now() - started) / 1000).toFixed(0)}s run=${r.status} ${tasks.map((t) => `${t.agent}:${t.status}=${t.n}`).join(" ")}        `);
    if (["COMPLETED", "FAILED", "WAITING_FOR_APPROVAL"].includes(r.status)) {
      console.log("\nreport:", JSON.stringify(r.report, null, 2));
      break;
    }
    await new Promise((res) => setTimeout(res, 2000));
  }
  const projects = await db().select().from(schema.websiteProjects).where(eq(schema.websiteProjects.organizationId, org.id));
  for (const p of projects) {
    const versions = await db().select().from(schema.websiteVersions).where(eq(schema.websiteVersions.projectId, p.id));
    console.log(`project ${p.slug}: status=${p.status} score=${p.qualityScore} versions=${versions.map((v) => `v${v.versionNo}:${v.qcScore}`).join(",")} preview=${p.previewUrl}`);
    const rep = versions.at(-1)?.qcReport as { issues?: { severity: string; message: string }[] } | null;
    for (const i of rep?.issues ?? []) console.log(`   - ${i.severity}: ${i.message}`);
  }
  const emails = await db().select().from(schema.salesEmails).where(eq(schema.salesEmails.organizationId, org.id));
  for (const e of emails) console.log(`email ${e.kind} status=${e.status} to=${e.toEmail} blocked=${e.blockedReason ?? "-"}`);
  const errs = await db().select().from(schema.agentLogs).where(eq(schema.agentLogs.organizationId, org.id));
  for (const l of errs.filter((x) => x.level === "error")) console.log(`ERROR LOG [${l.agentKey}] ${l.message}`);
  await closeDb();
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
