import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

export default async function setup() {
  const url = process.env.TEST_DATABASE_URL ?? "postgres://postgres@localhost:5432/agencyos_test";
  const sql = postgres(url, { max: 1, onnotice: () => {} });
  try {
    await migrate(drizzle(sql), { migrationsFolder: "./drizzle" });
    process.env.__DB_AVAILABLE = "1";
  } catch (err) {
    console.warn(`[tests] Test database unavailable (${(err as Error).message}); integration tests will be skipped.`);
    process.env.__DB_AVAILABLE = "0";
  } finally {
    await sql.end();
  }
}
