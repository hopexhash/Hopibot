import { redirect } from "next/navigation";

/** Old URL — the live log view now lives in the Terminal. */
export default async function ActivityRedirect({ searchParams }: { searchParams: Promise<{ agent?: string }> }) {
  const { agent } = await searchParams;
  redirect(agent ? `/terminal?agent=${encodeURIComponent(agent)}` : "/terminal");
}
