import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const sql = postgres(url, { max: 1, onnotice: () => {} });
  const database = drizzle(sql);
  await migrate(database, { migrationsFolder: "./drizzle" });
  // Seed/refresh the design-system registry (website_templates) from code.
  const { TEMPLATE_INFO } = await import("../src/lib/site-spec");
  for (const [key, t] of Object.entries(TEMPLATE_INFO)) {
    await sql`
      INSERT INTO website_templates (key, category, name, description, design_tokens, sections)
      VALUES (${key}, ${key}, ${t.name}, ${t.description},
        ${JSON.stringify({ primary: t.primary, accent: t.accent, mode: t.mode, radius: t.radius, heroLayout: t.heroLayout })}::jsonb,
        ${JSON.stringify(["hero", "about", "services", "features", "gallery", "hours", "faq", "cta", "contact"])}::jsonb)
      ON CONFLICT (key) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, design_tokens = EXCLUDED.design_tokens`;
  }
  await sql.end();
  console.log("Migrations applied.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
