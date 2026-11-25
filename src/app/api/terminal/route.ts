import { NextResponse } from "next/server";
import { z } from "zod";
import { AuthError, requireApiAuth } from "@/server/auth";
import { rateLimit, RateLimitError } from "@/server/ratelimit";
import { runCommand, translateRequest, type CommandResult } from "@/server/terminal/commands";

export const dynamic = "force-dynamic";

const body = z.object({ input: z.string().trim().min(1).max(500), mode: z.enum(["command", "ai"]).default("command"), confirmed: z.boolean().default(false) });

/** Executes one terminal command (or, in AI mode, translates a request into one first). */
export async function POST(req: Request) {
  try {
    // Commands change state: only accept same-origin requests (defence in depth on top of SameSite cookies).
    const origin = req.headers.get("origin");
    if (origin && new URL(origin).host !== (req.headers.get("x-forwarded-host") ?? req.headers.get("host"))) return NextResponse.json({ error: "Cross-site request refused." }, { status: 403 });
    const auth = await requireApiAuth();
    const parsed = body.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "Type a command first." }, { status: 400 });
    const { input, mode, confirmed } = parsed.data;
    await rateLimit(`terminal:${auth.user.id}`, mode === "ai" ? 20 : 120, 60);

    if (mode === "ai" && !confirmed) {
      const t = await translateRequest(auth, input);
      if (!t.ok) return NextResponse.json({ lines: [{ text: t.reason, tone: "warn" }] } satisfies CommandResult);
      if (!t.command) return NextResponse.json({ lines: [{ text: t.explanation, tone: "muted" }] } satisfies CommandResult);
      const result = await runCommand(auth, t.command, false);
      return NextResponse.json({ ...result, lines: [{ text: `→ ${t.command}`, tone: "head" }, ...result.lines], interpreted: t.command });
    }
    return NextResponse.json(await runCommand(auth, input, confirmed));
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    if (err instanceof RateLimitError) return NextResponse.json({ lines: [{ text: err.message, tone: "warn" }] });
    console.error("[api/terminal]", (err as Error).message);
    return NextResponse.json({ lines: [{ text: `Command failed: ${(err as Error).message.split("\n")[0].slice(0, 200)}`, tone: "error" }] });
  }
}
