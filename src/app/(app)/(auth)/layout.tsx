import { Wordmark } from "@/components/app/sidebar";

export const metadata = { title: { default: "HOPI Command", template: "%s · HOPI Command" } };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="page-enter mx-auto w-full max-w-sm">
          <div className="mb-12 flex items-baseline gap-2.5">
            <Wordmark />
            <span className="label-mono">Command</span>
          </div>
          {children}
        </div>
      </div>
      <div className="theme-ink relative hidden overflow-hidden lg:block">
        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <p className="label-mono flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-brand" aria-hidden />
            HOPI Command Center
          </p>
          <div>
            <p className="max-w-lg font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] xl:text-[52px]">
              Your agency, at work. You decide what goes out.
            </p>
            <ul className="mt-10 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border text-[13px] text-muted">
              {["Seven specialised agents", "Your approval before any email", "Every preview tested on phone and desktop", "Spending limits per day and month"].map((f) => (
                <li key={f} className="bg-background px-4 py-3.5">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
