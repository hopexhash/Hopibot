import "../guard";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import type { Role } from "@/lib/constants";
import { audit } from "../audit";
import { AuthError, clientIp, requireApiAuth, type AuthContext } from "../auth";
import { rateLimit, RateLimitError } from "../ratelimit";

export type ActionResult<T = undefined> = { ok: true; data: T; message?: string } | { ok: false; error: string };

/**
 * Standard wrapper for mutations: authenticates, enforces the minimum role, rate limits
 * per user, converts known errors into user-facing messages (never swallowing them), and
 * writes an audit log entry.
 */
export async function action<T>(
  opts: {
    name: string;
    role?: Role;
    revalidate?: string[];
    limit?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- audit metadata only; keeps T inferred from `fn`
    auditTarget?: (data: any) => { type?: string; id?: string; metadata?: Record<string, unknown> };
  },
  fn: (auth: AuthContext) => Promise<T>,
): Promise<ActionResult<T>> {
  let auth: AuthContext;
  try {
    auth = await requireApiAuth(opts.role ?? "member");
    await rateLimit(`action:${auth.user.id}:${opts.name}`, opts.limit ?? 60, 60);
  } catch (err) {
    if (err instanceof AuthError || err instanceof RateLimitError) return { ok: false, error: err.message };
    throw err;
  }
  try {
    const data = await fn(auth);
    const target = opts.auditTarget?.(data);
    await audit({
      organizationId: auth.org.id,
      userId: auth.user.id,
      action: opts.name,
      targetType: target?.type,
      targetId: target?.id,
      metadata: target?.metadata,
      ip: await clientIp(),
    });
    for (const p of opts.revalidate ?? []) revalidatePath(p, "layout");
    return { ok: true, data };
  } catch (err) {
    if (err instanceof ZodError) return { ok: false, error: err.issues.map((i) => `${i.path.join(".") || "input"}: ${i.message}`).join("; ") };
    if (err instanceof UserError) return { ok: false, error: err.message };
    console.error(`[action ${opts.name}]`, err);
    return { ok: false, error: `Something went wrong: ${(err as Error).message}` };
  }
}

/** An expected, user-facing failure (shown verbatim). */
export class UserError extends Error {}
