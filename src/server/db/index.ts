import "../guard";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { __agencyosSql?: postgres.Sql; __agencyosDb?: Database };

function create(): Database {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. See .env.example.");
  // Supabase's transaction pooler (Supavisor, port 6543) needs `prepare: false` and must not
  // receive pipelined queries: when more queries are in flight than there are connections,
  // postgres.js pipelines them on one socket and the pooler can hand the extended-protocol
  // messages to different backends, leaving a query half-sent until statement_timeout.
  const transactionPooler = /:6543\b/.test(url) || /[?&]pgbouncer=true/.test(url);
  const client = postgres(url, {
    max: Number(process.env.DATABASE_POOL_SIZE ?? 10),
    max_pipeline: transactionPooler ? 1 : 100,
    prepare: false,
    idle_timeout: 30,
    onnotice: () => {},
  });
  globalForDb.__agencyosSql = client;
  return drizzle(client, { schema });
}

/** Lazily-initialised shared connection pool (one per process, survives HMR). */
export function db(): Database {
  if (!globalForDb.__agencyosDb) globalForDb.__agencyosDb = create();
  return globalForDb.__agencyosDb;
}

export async function closeDb() {
  await globalForDb.__agencyosSql?.end({ timeout: 5 });
  globalForDb.__agencyosSql = undefined;
  globalForDb.__agencyosDb = undefined;
}

export { schema };
