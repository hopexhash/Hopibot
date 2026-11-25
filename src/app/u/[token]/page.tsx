import { eq } from "drizzle-orm";
import { CheckCircle2, MailX } from "lucide-react";
import { redirect } from "next/navigation";
import { db, schema } from "@/server/db";
import { parseOrgSettings } from "@/lib/settings";
import { processUnsubscribe } from "@/server/unsubscribe";

export const metadata = { title: "Unsubscribe", robots: { index: false } };
export const dynamic = "force-dynamic";

async function unsubscribe(formData: FormData) {
  "use server";
  const token = String(formData.get("token") ?? "");
  await processUnsubscribe(token);
  redirect(`/u/${encodeURIComponent(token)}?done=1`);
}

export default async function UnsubscribePage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ done?: string }> }) {
  const { token } = await params;
  const { done } = await searchParams;
  const valid = /^[A-Za-z0-9_-]{16,64}$/.test(token);
  const [email] = valid ? await db().select().from(schema.salesEmails).where(eq(schema.salesEmails.unsubscribeToken, token)) : [];
  const [org] = email ? await db().select().from(schema.organizations).where(eq(schema.organizations.id, email.organizationId)) : [];
  const agency = org ? parseOrgSettings(org.settings).agencyName || org.name : "the sender";

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-md)]">
        {!email ? (
          <>
            <MailX className="mx-auto mb-3 h-8 w-8 text-muted" />
            <h1 className="text-lg font-semibold">Link not recognised</h1>
            <p className="mt-2 text-sm text-muted">This unsubscribe link is invalid or has expired. Reply to the email and ask to be removed — we will honour it.</p>
          </>
        ) : done ? (
          <>
            <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-success" />
            <h1 className="text-lg font-semibold">You have been unsubscribed</h1>
            <p className="mt-2 text-sm text-muted">{agency} will not send you any further messages. U bent afgemeld en ontvangt geen berichten meer.</p>
          </>
        ) : (
          <>
            <MailX className="mx-auto mb-3 h-8 w-8 text-muted" />
            <h1 className="text-lg font-semibold">Unsubscribe from {agency}</h1>
            <p className="mt-2 text-sm text-muted">Confirm to stop all messages to {email.toEmail ?? "this address"}. / Bevestig om geen berichten meer te ontvangen.</p>
            <form action={unsubscribe} className="mt-6">
              <input type="hidden" name="token" value={token} />
              <button type="submit" className="h-10 w-full rounded-lg bg-accent text-sm font-medium text-white hover:bg-accent-hover">
                Unsubscribe / Afmelden
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
