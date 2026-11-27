import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** A path that matches no route: rewriting to it renders the normal "page not found". */
const NOT_FOUND = "/__not-found";

/** First path segments that belong to the control room (pages and private APIs). */
const PRIVATE = new Set(["command", "activity", "agents", "analytics", "approvals", "automations", "builder", "businesses", "campaigns", "costs", "deployments", "discovery", "emails", "health", "integrations", "network", "notifications", "pipeline", "previews", "revenue", "settings", "tasks", "terminal", "websites", "api"]);

/**
 * 1. The sign-in page only answers at a secret address (CONTROL_PATH, e.g. "/hq-…"). The
 *    usual /login and /signup addresses return "page not found". Without CONTROL_PATH
 *    (local development) /login works as before.
 * 2. Control-room addresses requested without any session cookie get the same "page not
 *    found" as an address that does not exist, before any page code runs, so the public
 *    website gives no hint that a control room exists. (A cookie is only a hint here: every
 *    page, action and API still verifies the session itself.)
 * 3. With Supabase Auth, refreshes the session cookie on navigation (Server Components
 *    cannot write cookies). With the local provider this is a pass-through.
 */
/** Earlier addresses of the website. Pages asked for there move to the main address (APP_URL). */
const OLD_HOSTS = new Set(["hopibot.vercel.app"]);

export async function proxy(request: NextRequest) {
  // The website moved to its own domain. A visitor (or search engine) who still uses the old
  // address is sent to the same page on the new one. Only page requests: webhooks and other
  // API calls keep working where they were set up.
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const main = process.env.APP_URL;
  if (main && OLD_HOSTS.has(host) && (request.method === "GET" || request.method === "HEAD") && !request.nextUrl.pathname.startsWith("/api/")) {
    const to = new URL(request.nextUrl.pathname + request.nextUrl.search, main);
    if (to.host !== host) return NextResponse.redirect(to, 308);
  }
  // Demo websites and client previews need nothing else from this function.
  if (/^\/(demos|p|d)\//.test(request.nextUrl.pathname)) return NextResponse.next();
  const control = (process.env.CONTROL_PATH ?? "").replace(/^\/+|\/+$/g, "");
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
  if (control) {
    if (path === `/${control}`) return NextResponse.rewrite(new URL("/login", request.url), { request });
    if (path === "/login" || path === "/signup") return NextResponse.rewrite(new URL(NOT_FOUND, request.url));
    const first = path.split("/")[1] ?? "";
    if (PRIVATE.has(first) && !request.cookies.getAll().some((c) => c.name === "aos_session" || c.name.startsWith("sb-"))) {
      return NextResponse.rewrite(new URL(NOT_FOUND, request.url));
    }
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
  matcher: ["/((?!_next/static|_next/image|site-assets|site/|favicon.ico|robots.txt|sitemap.xml|api/demo|api/webhooks|api/unsubscribe|api/health).*)"],
};
