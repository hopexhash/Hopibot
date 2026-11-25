import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * With Supabase Auth, refreshes the session cookie on navigation (Server Components
 * cannot write cookies). With the local provider this is a pass-through.
 */
export async function proxy(request: NextRequest) {
  if (process.env.AUTH_PROVIDER !== "supabase") return NextResponse.next();
  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        for (const { name, value } of toSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of toSet) response.cookies.set(name, value, options);
      },
    },
  });
  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|site-assets|favicon.ico|p/|d/|api/demo|api/webhooks|api/unsubscribe|api/health).*)"],
};
