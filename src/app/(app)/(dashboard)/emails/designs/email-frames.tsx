"use client";

import { Monitor, Send, Smartphone } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { sendDesignTestAction } from "@/server/actions/emails";
import { Card } from "@/components/ui";

/** Grows the frame to the height of the email, so the whole message shows without inner scrolling. */
const fit = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
  const f = e.currentTarget;
  const h = f.contentDocument?.documentElement.scrollHeight;
  if (h) f.style.height = `${h + 8}px`;
};

/** One email in a sandboxed frame, at a computer or a phone width, with its subject line. */
export function EmailFrames({ subject, html, test }: { subject: string; html: string; test?: { key: string; lang: "nl" | "en"; recipients: string[] } }) {
  const [width, setWidth] = useState<"desktop" | "phone">("desktop");
  const [sending, start] = useTransition();
  const [to, setTo] = useState(test?.recipients[0] ?? "");
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2.5 text-[13px]">
        <p className="min-w-0 truncate">
          <span className="text-muted">Subject: </span>
          <b className="font-medium">{subject}</b>
        </p>
        <div className="flex flex-wrap gap-1">
          {test && test.recipients.length > 1 && (
            <select aria-label="Send the test to" value={to} onChange={(e) => setTo(e.target.value)} className="max-w-[220px] rounded-md border border-border bg-transparent px-2 py-1 text-muted">
              {test.recipients.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          )}
          {test && (
            <button
              type="button"
              disabled={sending}
              title={`Sends this email with sample data to ${to}`}
              onClick={() =>
                start(async () => {
                  const r = await sendDesignTestAction(test.key, test.lang, to);
                  if (!r.ok) return void toast.error(r.error);
                  toast.success(`Test email sent to ${r.data.to}.`);
                })
              }
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-muted hover:text-fg disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" /> {sending ? "Sending…" : test.recipients.length > 1 ? "Send test" : `Send test to ${to}`}
            </button>
          )}
          {(["desktop", "phone"] as const).map((w) => (
            <button key={w} type="button" onClick={() => setWidth(w)} aria-pressed={width === w} className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 ${width === w ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:text-fg"}`}>
              {w === "desktop" ? <Monitor className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}
              {w === "desktop" ? "Computer" : "Phone"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center bg-[#e9e4d9] p-3 sm:p-5">
        {/* No scripts run inside (emails have none); same-origin only so the frame can be sized to the email. */}
        <iframe key={width} title={subject} srcDoc={html} onLoad={fit} sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox" className="block rounded-md bg-white shadow-sm" style={{ width: width === "desktop" ? "100%" : 390, maxWidth: width === "desktop" ? 720 : 390, height: 1500, border: 0 }} />
      </div>
    </Card>
  );
}
