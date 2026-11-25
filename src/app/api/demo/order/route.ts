import { NextResponse } from "next/server";
import { placeOrder } from "@/server/sales/demo";

export const dynamic = "force-dynamic";

/** Public endpoint used by the demo page's order form. Prices are never taken from the client. */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const res = await placeOrder(body);
  return NextResponse.json(res, { status: res.ok ? 200 : 400 });
}
