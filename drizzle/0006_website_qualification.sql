ALTER TABLE "businesses" ADD COLUMN "qualification" text;--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "redesign_score" integer;--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "inspected_at" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "businesses_org_qualification" ON "businesses" USING btree ("organization_id","qualification");--> statement-breakpoint
CREATE TABLE "website_inspections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE cascade,
	"business_id" uuid NOT NULL REFERENCES "businesses"("id") ON DELETE cascade,
	"url" text NOT NULL,
	"qualification" text NOT NULL,
	"redesign_score" integer NOT NULL,
	"area_scores" jsonb NOT NULL,
	"measured" jsonb NOT NULL,
	"problems" jsonb NOT NULL,
	"opportunities" jsonb NOT NULL,
	"explanation" text NOT NULL,
	"summary" text,
	"verdict" text,
	"verification" jsonb,
	"desktop_shot" text,
	"mobile_shot" text,
	"cost_usd" numeric(14, 6),
	"is_mock" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "website_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE cascade,
	"business_id" uuid REFERENCES "businesses"("id") ON DELETE set null,
	"domain" text NOT NULL,
	"business_name" text,
	"classification" text NOT NULL,
	"ai_qualification" text,
	"ai_score" integer,
	"ai_summary" text,
	"note" text,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX "website_inspections_business" ON "website_inspections" USING btree ("business_id","created_at");--> statement-breakpoint
CREATE INDEX "website_inspections_org" ON "website_inspections" USING btree ("organization_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "website_feedback_org_domain" ON "website_feedback" USING btree ("organization_id","domain");--> statement-breakpoint
CREATE INDEX "website_feedback_org_created" ON "website_feedback" USING btree ("organization_id","created_at");--> statement-breakpoint
ALTER TABLE "website_inspections" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "website_feedback" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "website_inspections_member_all" ON "website_inspections" FOR ALL TO authenticated USING (private.is_org_member(organization_id)) WITH CHECK (private.is_org_member(organization_id));--> statement-breakpoint
CREATE POLICY "website_feedback_member_all" ON "website_feedback" FOR ALL TO authenticated USING (private.is_org_member(organization_id)) WITH CHECK (private.is_org_member(organization_id));
