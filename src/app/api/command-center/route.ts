import { NextResponse } from "next/server";
import { AuthError, requireApiAuth } from "@/server/auth";
import { getCommandCenterState } from "@/server/queries/command-center";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const auth = await requireApiAuth();
    return NextResponse.json(await getCommandCenterState(auth.org.id), { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/command-center]", err);
    return NextResponse.json({ error: "Failed to load command center state" }, { status: 500 });
  }
}
