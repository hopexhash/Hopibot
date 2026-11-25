-- Row Level Security for organisation isolation.
-- On Supabase, `auth.uid()` and the `anon`/`authenticated`/`service_role` roles exist already.
-- On plain Postgres (local development, CI) we create compatible shims so the same
-- migration applies everywhere.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN CREATE ROLE anon NOLOGIN; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN CREATE ROLE authenticated NOLOGIN; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN CREATE ROLE service_role NOLOGIN BYPASSRLS; END IF;
END $$;
--> statement-breakpoint
CREATE SCHEMA IF NOT EXISTS auth;
--> statement-breakpoint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'auth' AND p.proname = 'uid'
  ) THEN
    EXECUTE $f$
      CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS
      'SELECT nullif(current_setting(''request.jwt.claim.sub'', true), '''')::uuid'
    $f$;
  END IF;
END $$;
--> statement-breakpoint
CREATE OR REPLACE FUNCTION public.is_org_member(org uuid) RETURNS boolean
  LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT EXISTS (
      SELECT 1 FROM public.organization_members m
      WHERE m.organization_id = org AND m.user_id = auth.uid()
    );
$$;
--> statement-breakpoint
CREATE OR REPLACE FUNCTION public.is_org_admin(org uuid) RETURNS boolean
  LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT EXISTS (
      SELECT 1 FROM public.organization_members m
      WHERE m.organization_id = org AND m.user_id = auth.uid() AND m.role IN ('owner', 'admin')
    );
$$;
--> statement-breakpoint
DO $$
DECLARE
  t text;
  member_tables text[] := ARRAY[
    'agents','agent_configurations','discovery_campaigns','businesses','leads','lead_scores',
    'business_contacts','business_research','website_projects','website_versions','deployments',
    'sales_emails','email_events','crm_activities','suppression_list','workflows','workflow_steps',
    'workflow_runs','agent_tasks','agent_logs','approvals','api_usage','subscriptions','payments',
    'notifications'
  ];
BEGIN
  FOREACH t IN ARRAY member_tables LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS org_isolation ON public.%I', t);
    EXECUTE format(
      'CREATE POLICY org_isolation ON public.%I FOR ALL TO authenticated
         USING (public.is_org_member(organization_id))
         WITH CHECK (public.is_org_member(organization_id))', t);
  END LOOP;
END $$;
--> statement-breakpoint
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE POLICY org_read ON public.organizations FOR SELECT TO authenticated USING (public.is_org_member(id));
--> statement-breakpoint
CREATE POLICY org_update ON public.organizations FOR UPDATE TO authenticated USING (public.is_org_admin(id));
--> statement-breakpoint
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE POLICY members_read ON public.organization_members FOR SELECT TO authenticated USING (public.is_org_member(organization_id));
--> statement-breakpoint
CREATE POLICY members_admin ON public.organization_members FOR ALL TO authenticated
  USING (public.is_org_admin(organization_id)) WITH CHECK (public.is_org_admin(organization_id));
--> statement-breakpoint
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE POLICY users_self ON public.users FOR SELECT TO authenticated USING (id = auth.uid());
--> statement-breakpoint
-- Secrets and sessions are never readable through the client API, only by the server.
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.integration_credentials ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
-- Audit log: members may read, nobody may modify through the client API.
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE POLICY audit_read ON public.audit_logs FOR SELECT TO authenticated USING (public.is_org_admin(organization_id));
--> statement-breakpoint
ALTER TABLE public.website_templates ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE POLICY templates_read ON public.website_templates FOR SELECT TO authenticated USING (true);
--> statement-breakpoint
REVOKE ALL ON public.sessions, public.integration_credentials FROM anon, authenticated;
--> statement-breakpoint
REVOKE UPDATE, DELETE ON public.audit_logs FROM anon, authenticated;
