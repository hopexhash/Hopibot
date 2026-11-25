import "../guard";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Supabase server client bound to the request cookies (AUTH_PROVIDER=supabase). */
export async function supabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error("Supabase Auth is selected but NEXT_PUBLIC_SUPABASE_URL / ANON_KEY are missing.");
  const jar = await cookies();
  return createServerClient(url, anon, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (toSet) => {
        try {
          for (const { name, value, options } of toSet) jar.set(name, value, options);
        } catch {
          // Called from a Server Component where cookies are read-only; the proxy refreshes them.
        }
      },
    },
  });
}
