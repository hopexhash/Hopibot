"use client";

import { Check, ChevronDown, Rocket } from "lucide-react";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Progress } from "@/components/ui";
import { cn } from "@/lib/utils";

export type OnboardingStep = { key: string; title: string; text: string; done: boolean; href: string; cta: string };

const KEY = "hopibot:onboarding-collapsed";
const EVENT = "hopibot:onboarding";
function useCollapsed() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(EVENT, cb);
      return () => window.removeEventListener(EVENT, cb);
    },
    () => {
      try {
        return localStorage.getItem(KEY) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );
}

/** Getting-started checklist. Each step is ticked from real system state, never by clicking. */
export function Onboarding({ steps }: { steps: OnboardingStep[] }) {
  const collapsed = useCollapsed();
  const [, force] = useState(0);
  const done = steps.filter((s) => s.done).length;
  if (done === steps.length) return null;
  const next = steps.find((s) => !s.done);
  const toggle = () => {
    try {
      localStorage.setItem(KEY, collapsed ? "0" : "1");
    } catch {
      /* preference only */
    }
    window.dispatchEvent(new Event(EVENT));
    force((n) => n + 1);
  };
  return (
    <section className="panel mb-5 overflow-hidden" aria-label="Getting started">
      <button onClick={toggle} className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5" aria-expanded={!collapsed}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Rocket className="h-[18px] w-[18px]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] font-semibold">Get your agency running</span>
          <span className="block truncate text-[12.5px] text-muted">
            {done} of {steps.length} done{next ? ` · next: ${next.title}` : ""}
          </span>
        </span>
        <Progress value={(done / steps.length) * 100} className="hidden w-28 sm:block" />
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted transition-transform", !collapsed && "rotate-180")} />
      </button>
      {!collapsed && (
        <ol className="grid gap-px border-t border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.key} className="flex items-start gap-3 bg-surface px-4 py-3.5 sm:px-5">
              <span
                className={cn(
                  "tabular mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11.5px] font-semibold",
                  s.done ? "border-accent bg-accent text-accent-foreground" : "border-border-strong text-muted",
                )}
              >
                {s.done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className={cn("text-[13.5px] font-medium", s.done && "text-muted line-through decoration-[rgba(12,12,13,0.3)]")}>{s.title}</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{s.text}</p>
                {!s.done && (
                  <Link href={s.href} className="mt-2 inline-flex h-9 items-center rounded-lg border border-border-strong px-3 text-[12.5px] font-medium text-accent hover:bg-accent-soft">
                    {s.cta} →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
