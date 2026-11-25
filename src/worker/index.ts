import "dotenv/config";
import { Worker } from "bullmq";
import { AGENT_KEYS, type AgentKey } from "@/lib/constants";
import { closeDb } from "@/server/db";
import { executeTask } from "@/server/orchestrator/executor";
import { queueName, type TaskJob } from "@/server/orchestrator/queue";
import { recoverTasks, runScheduler } from "@/server/orchestrator/recovery";
import { closeQcBrowser } from "@/server/qc/run-qc";
import { createRedis } from "@/server/redis";
import { publishHeartbeat, WORKER_ID } from "@/server/health";

/**
 * Agent worker process. Run one or many (`npm run worker`); each consumes all agent
 * queues. Safe to scale horizontally: task execution is guarded by a compare-and-set in
 * Postgres, so a task never runs twice concurrently.
 */

const CONCURRENCY: Record<AgentKey, number> = {
  lead_finder: 2,
  research: 6,
  contact_research: 6,
  website_builder: 4,
  quality_control: Number(process.env.QC_CONCURRENCY ?? 2),
  deployment: 3,
  sales: 6,
};

function log(msg: string, extra?: unknown) {
  console.log(`[worker ${new Date().toISOString()}] ${msg}`, extra ?? "");
}

async function main() {
  const only = (process.env.WORKER_AGENTS ?? "").split(",").filter(Boolean) as AgentKey[];
  const agents = only.length ? AGENT_KEYS.filter((a) => only.includes(a)) : [...AGENT_KEYS];
  const connection = createRedis({ forWorker: true });
  const workers = agents.map(
    (agent) =>
      new Worker<TaskJob>(
        queueName(agent),
        async (job) => {
          const result = await executeTask(job.data.taskId);
          return { result };
        },
        { connection, concurrency: CONCURRENCY[agent], lockDuration: 120_000, stalledInterval: 60_000 },
      ),
  );
  for (const w of workers) {
    w.on("failed", (job, err) => log(`job ${job?.id} failed in ${w.name}: ${err.message}`));
    w.on("error", (err) => log(`worker error in ${w.name}: ${err.message}`));
  }
  log(`started for agents: ${agents.join(", ")} (id ${WORKER_ID})`);

  // Heartbeat: lets the dashboard show which agents have a live worker (never guessed).
  const startedAt = new Date().toISOString();
  const beat = () => publishHeartbeat(connection, { agents, startedAt }).catch((err) => log("heartbeat failed", (err as Error).message));
  await beat();
  const heartbeat = setInterval(beat, 15_000);

  // Resume everything that was in flight before this process started.
  const r = await recoverTasks();
  log(`recovery: ${r.recovered} stale task(s) recovered, ${r.enqueued} pending task(s) enqueued`);

  let ticking = false;
  const tick = setInterval(async () => {
    if (ticking) return;
    ticking = true;
    try {
      await recoverTasks();
      await runScheduler();
    } catch (err) {
      log("maintenance tick failed", (err as Error).message);
    } finally {
      ticking = false;
    }
  }, 30_000);

  const shutdown = async (sig: string) => {
    log(`${sig} received, draining…`);
    clearInterval(tick);
    clearInterval(heartbeat);
    await connection.del(`agencyos:worker:${WORKER_ID}`).catch(() => {});
    await Promise.allSettled(workers.map((w) => w.close()));
    await closeQcBrowser();
    await connection.quit().catch(() => {});
    await closeDb();
    process.exit(0);
  };
  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
