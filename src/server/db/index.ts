import "../guard";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { __agencyosSql?: postgres.Sql; __agencyosDb?: Database };

function create(): Database {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. See .env.example.");
  // `prepare: false` keeps us compatible with Supabase's transaction pooler (port 6543).
  const client = postgres(url, {
    max: Number(process.env.DATABASE_POOL_SIZE ?? 10),
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
