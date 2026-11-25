ALTER TABLE "agent_logs" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "agent_logs" ADD COLUMN "kind" text;--> statement-breakpoint
ALTER TABLE "agent_logs" ADD COLUMN "status" text;--> statement-breakpoint
ALTER TABLE "agent_logs" ADD COLUMN "business_id" uuid;--> statement-breakpoint
ALTER TABLE "agent_logs" ADD COLUMN "url" text;--> statement-breakpoint
CREATE INDEX "logs_org_id" ON "agent_logs" USING btree ("organization_id","id");--> statement-breakpoint
CREATE INDEX "logs_run_kind" ON "agent_logs" USING btree ("run_id","kind");--> statement-breakpoint
UPDATE "agent_logs" SET
  "category" = CASE "agent_key" WHEN 'lead_finder' THEN 'discovery' WHEN 'contact_research' THEN 'contacts' WHEN 'research' THEN 'research' WHEN 'website_builder' THEN 'building' WHEN 'quality_control' THEN 'quality' WHEN 'deployment' THEN 'deployment' WHEN 'sales' THEN 'outreach' ELSE 'system' END,
  "status" = CASE "level" WHEN 'error' THEN 'failed' WHEN 'warn' THEN 'warning' ELSE 'info' END
WHERE "category" IS NULL;
