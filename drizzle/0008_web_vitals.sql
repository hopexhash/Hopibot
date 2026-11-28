CREATE TABLE IF NOT EXISTS "web_vitals" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"organization_id" uuid NOT NULL,
	"path" text NOT NULL,
	"metric" text NOT NULL,
	"value" double precision NOT NULL,
	"rating" text NOT NULL,
	"device" text NOT NULL,
	"navigation" text,
	"connection" text,
	"detail" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "web_vitals" ADD CONSTRAINT "web_vitals_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null;
END $$;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "web_vitals_org_created" ON "web_vitals" USING btree ("organization_id","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "web_vitals_org_metric" ON "web_vitals" USING btree ("organization_id","metric","created_at");--> statement-breakpoint
ALTER TABLE "web_vitals" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP POLICY IF EXISTS "web_vitals_member_read" ON "web_vitals";--> statement-breakpoint
CREATE POLICY "web_vitals_member_read" ON "web_vitals" FOR SELECT TO authenticated USING (private.is_org_member(organization_id));
