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
  const { DESIGNS } = await import("../src/sites/designs");
  for (const t of DESIGNS) {
    await sql`
      INSERT INTO website_templates (key, category, name, description, design_tokens, sections)
      VALUES (${t.key}, ${t.industry}, ${t.name}, ${t.description},
        ${JSON.stringify({ palette: t.palette, fonts: t.fonts, mode: t.mode, radius: t.radius, variants: t.v })}::jsonb,
        ${JSON.stringify(t.features)}::jsonb)
      ON CONFLICT (key) DO UPDATE SET category = EXCLUDED.category, name = EXCLUDED.name, description = EXCLUDED.description, design_tokens = EXCLUDED.design_tokens, sections = EXCLUDED.sections`;
  }
  await sql.end();
  console.log("Migrations applied.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
