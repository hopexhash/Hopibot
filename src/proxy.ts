import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** A path that does not exist: rewriting to it renders the normal "page not found". */
const NOT_FOUND = "/__not-found";

/**
 * 1. The sign-in page only answers at a secret address (CONTROL_PATH, e.g. "/hq-…"). The
 *    usual /login and /signup addresses return "page not found", so the public website
 *    gives no hint that a control room exists. Without CONTROL_PATH (local development)
 *    /login works as before.
 * 2. With Supabase Auth, refreshes the session cookie on navigation (Server Components
 *    cannot write cookies). With the local provider this is a pass-through.
 */
export async function proxy(request: NextRequest) {
  const control = (process.env.CONTROL_PATH ?? "").replace(/^\/+|\/+$/g, "");
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
  if (control) {
    if (path === `/${control}`) return NextResponse.rewrite(new URL("/login", request.url), { request });
    if (path === "/login" || path === "/signup") return NextResponse.rewrite(new URL(NOT_FOUND, request.url));
  }

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
  matcher: ["/((?!_next/static|_next/image|site-assets|site/|favicon.ico|p/|d/|api/demo|api/webhooks|api/unsubscribe|api/health).*)"],
};
