-- Move the RLS helper functions out of the API-exposed `public` schema so they cannot be
-- called via PostgREST RPC. Policies reference functions by OID, so they keep working.
CREATE SCHEMA IF NOT EXISTS private;
--> statement-breakpoint
ALTER FUNCTION public.is_org_member(uuid) SET SCHEMA private;
--> statement-breakpoint
ALTER FUNCTION public.is_org_admin(uuid) SET SCHEMA private;
--> statement-breakpoint
REVOKE ALL ON FUNCTION private.is_org_member(uuid), private.is_org_admin(uuid) FROM PUBLIC, anon;
--> statement-breakpoint
GRANT USAGE ON SCHEMA private TO authenticated;
--> statement-breakpoint
GRANT EXECUTE ON FUNCTION private.is_org_member(uuid), private.is_org_admin(uuid) TO authenticated;
