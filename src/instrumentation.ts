import type { Instrumentation } from "next";

/**
 * Records unexpected server errors in audit_logs (action "system.error", no organization)
 * so production failures can be diagnosed from the database. Request headers are not stored
 * (they contain session cookies), and the query string is stripped from the path.
 */
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const message = err instanceof Error ? err.message : String(err);
  const digest = typeof err === "object" && err !== null && "digest" in err ? String((err as { digest: unknown }).digest) : undefined;
  console.error("[server error]", request.method, request.path, digest ?? "", message);
  try {
    const { audit } = await import("./server/audit");
    await Promise.race([
      audit({
        organizationId: null,
        action: "system.error",
        metadata: {
          message: message.slice(0, 600),
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
