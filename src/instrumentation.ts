import type { Instrumentation } from "next";

/**
 * Records unexpected server errors in audit_logs (action "system.error", no organization)
 * so production failures can be diagnosed from the database. Request headers are not stored
 * (they contain session cookies), the query string is stripped from the path, and SQL
 * parameter values are removed from the message.
 */
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const cause = err instanceof Error && err.cause instanceof Error ? err.cause : undefined;
  // Drizzle appends "params: …" to failed-query messages; those values can be sensitive
  // (token hashes, emails), so they are dropped before anything is logged or stored.
  const strip = (m: string) => m.replace(/\nparams:[\s\S]*$/, "");
  const message = [strip(err instanceof Error ? err.message : String(err)), cause && `cause: ${(cause as { code?: string }).code ?? ""} ${strip(cause.message)}`]
    .filter(Boolean)
    .join("\n");
  const digest = typeof err === "object" && err !== null && "digest" in err ? String((err as { digest: unknown }).digest) : undefined;
  console.error("[server error]", request.method, request.path, digest ?? "", message);
  try {
    const { audit } = await import("./server/audit");
    await Promise.race([
      audit({
        organizationId: null,
        action: "system.error",
        metadata: {
          message: message.slice(0, 900),
          name: err instanceof Error ? err.name : undefined,
          digest,
          method: request.method,
          path: request.path.split("?")[0],
          routePath: context.routePath,
          routeType: context.routeType,
        },
      }),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
  } catch {
    // Never let error reporting throw.
  }
};
