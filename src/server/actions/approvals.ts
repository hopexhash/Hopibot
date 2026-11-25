"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "../db";
import { resumeTask } from "../orchestrator/control";
import { refreshRunStatus } from "../orchestrator/runs";
import { transitionTask } from "../orchestrator/state-machine";
import { createTask } from "../orchestrator/tasks";
import { action, UserError } from "./_util";

export async function decideApprovalAction(approvalId: string, approve: boolean, reason?: string) {
  return action(
    { name: approve ? "approval.approve" : "approval.reject", role: "admin", revalidate: ["/"], auditTarget: () => ({ type: "approval", id: approvalId, metadata: { reason } }) },
    async (auth) => {
      const id = z.string().uuid().parse(approvalId);
      const [a] = await db().select().from(schema.approvals).where(and(eq(schema.approvals.id, id), eq(schema.approvals.organizationId, auth.org.id)));
      if (!a) throw new UserError("Approval not found.");
      if (a.status !== "pending") throw new UserError(`This request was already ${a.status}.`);
      if (a.kind === "send_email") throw new UserError("Review and approve emails on the email page, where recipient and compliance are confirmed.");
      if (a.kind === "launch_campaign") throw new UserError("Review and approve campaigns on the campaign page, where the preview and compliance are confirmed.");
      const [updated] = await db()
        .update(schema.approvals)
        .set({ status: approve ? "approved" : "rejected", decidedBy: auth.user.id, decidedAt: new Date(), reason: reason?.slice(0, 500) ?? null })
        .where(and(eq(schema.approvals.id, id), eq(schema.approvals.status, "pending")))
        .returning();
      if (!updated) throw new UserError("This request was decided by someone else just now.");

      if (a.kind === "budget_override") {
        if (approve) {
          // Approving lets the paused task run once now; limits stay in force for later tasks.
          await resumeTask(auth.org.id, a.subjectId);
        } else {
          const t = await transitionTask(a.subjectId, ["WAITING_FOR_APPROVAL"], "CANCELLED", { completedAt: new Date() });
          if (t?.runId) await refreshRunStatus(t.runId);
        }
      }
      if ((a.kind === "publish_website" || a.kind === "connect_domain") && approve) {
        const [project] = await db()
          .select()
          .from(schema.websiteProjects)
          .where(and(eq(schema.websiteProjects.id, a.subjectId), eq(schema.websiteProjects.organizationId, auth.org.id)));
        if (!project) throw new UserError("Project not found.");
        await createTask(auth.org.id, null, {
          agentKey: "deployment",
          type: "publish_production",
          businessId: project.businessId,
          projectId: project.id,
          input: { approvalId: a.id },
          idempotencyKey: `publish:${a.id}`,
          maxAttempts: 3,
        });
      }
      return null;
    },
  );
}
