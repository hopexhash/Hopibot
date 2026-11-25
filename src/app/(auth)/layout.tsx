import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">AgencyOS AI</span>
          </div>
          {children}
        </div>
      </div>
      <div className="relative hidden overflow-hidden border-l border-border bg-surface-2 lg:block">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 70% 30%, var(--accent-soft), transparent), radial-gradient(40% 40% at 20% 80%, color-mix(in srgb, var(--chart-2) 14%, transparent), transparent)",
          }}
        />
        <div className="relative flex h-full flex-col justify-end p-12">
          <p className="max-w-md text-2xl font-semibold leading-snug tracking-tight">
            Discover prospects, research them, build and test their next website — then review every outreach before it is sent.
          </p>
          <div className="mt-8 grid max-w-md grid-cols-2 gap-3 text-xs text-muted">
            {["7 specialised agents", "Human approval for outreach", "Playwright-tested previews", "Cost limits per agent"].map((f) => (
              <div key={f} className="rounded-lg border border-border bg-surface/70 px-3 py-2 backdrop-blur">
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
