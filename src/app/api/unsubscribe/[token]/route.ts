import { processUnsubscribe } from "@/server/unsubscribe";

export const dynamic = "force-dynamic";

/** RFC 8058 one-click unsubscribe (List-Unsubscribe-Post). */
export async function POST(_req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const res = await processUnsubscribe(token);
  return new Response(res.ok ? "Unsubscribed" : "Unknown token", { status: res.ok ? 200 : 404 });
}
