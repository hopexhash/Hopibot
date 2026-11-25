ALTER TABLE "businesses" ADD COLUMN "contact_permission" text DEFAULT 'unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "permission_source" text;--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "permission_proof" text;--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "permission_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "businesses" ALTER COLUMN "pipeline_stage" SET DEFAULT 'DISCOVERED';--> statement-breakpoint
UPDATE "businesses" SET "pipeline_stage" = CASE "pipeline_stage"
  WHEN 'NEW_LEAD' THEN 'DISCOVERED' WHEN 'RESEARCHED' THEN 'ANALYSED' WHEN 'WEBSITE_GENERATED' THEN 'DEMO_GENERATED'
  WHEN 'PREVIEW_READY' THEN 'QUALITY_APPROVED' WHEN 'AWAITING_APPROVAL' THEN 'CONTACT_READY' WHEN 'REPLIED' THEN 'INTERESTED'
  WHEN 'NEGOTIATION' THEN 'CHECKOUT_STARTED' WHEN 'WON' THEN 'PURCHASED' ELSE "pipeline_stage" END;--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE cascade,
	"business_id" uuid NOT NULL REFERENCES "businesses"("id") ON DELETE cascade,
	"project_id" uuid REFERENCES "website_projects"("id") ON DELETE set null,
	"status" text DEFAULT 'requested' NOT NULL,
	"package_key" text NOT NULL,
	"plan_key" text,
	"items" jsonb NOT NULL,
	"one_time_cents" integer DEFAULT 0 NOT NULL,
	"monthly_cents" integer DEFAULT 0 NOT NULL,
	"currency" text DEFAULT 'eur' NOT NULL,
	"customer_name" text NOT NULL,
	"customer_email" text NOT NULL,
	"customer_phone" text,
	"note" text,
	"stripe_session_id" text,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "demo_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE cascade,
	"project_id" uuid NOT NULL REFERENCES "website_projects"("id") ON DELETE cascade,
	"business_id" uuid NOT NULL REFERENCES "businesses"("id") ON DELETE cascade,
	"type" text NOT NULL,
	"visitor" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX "orders_org_created" ON "orders" USING btree ("organization_id","created_at");--> statement-breakpoint
CREATE INDEX "orders_business" ON "orders" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX "orders_stripe" ON "orders" USING btree ("stripe_session_id");--> statement-breakpoint
CREATE INDEX "demo_events_org_created" ON "demo_events" USING btree ("organization_id","created_at");--> statement-breakpoint
CREATE INDEX "demo_events_project" ON "demo_events" USING btree ("project_id","type");--> statement-breakpoint
ALTER TABLE "orders" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "demo_events" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "orders_member_all" ON "orders" FOR ALL TO authenticated USING (private.is_org_member(organization_id)) WITH CHECK (private.is_org_member(organization_id));--> statement-breakpoint
CREATE POLICY "demo_events_member_all" ON "demo_events" FOR ALL TO authenticated USING (private.is_org_member(organization_id)) WITH CHECK (private.is_org_member(organization_id));
