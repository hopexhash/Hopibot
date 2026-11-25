CREATE TABLE "website_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"version_id" uuid NOT NULL,
	"path" text NOT NULL,
	"content" text NOT NULL,
	"content_type" text NOT NULL,
	"sha1" text NOT NULL,
	"size" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "website_files" ADD CONSTRAINT "website_files_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_files" ADD CONSTRAINT "website_files_version_id_website_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."website_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "website_files_version_path" ON "website_files" USING btree ("version_id","path");
--> statement-breakpoint
ALTER TABLE "website_files" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE POLICY org_isolation ON "website_files" FOR ALL TO authenticated USING (public.is_org_member(organization_id)) WITH CHECK (public.is_org_member(organization_id));
