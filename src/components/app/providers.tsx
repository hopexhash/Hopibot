"use client";

import { Toaster } from "sonner";
import { CheckDraw } from "@/components/ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        offset="calc(env(safe-area-inset-top, 0px) + 12px)"
        gap={10}
        icons={{ success: <CheckDraw className="h-[18px] w-[18px] text-accent" /> }}
        toastOptions={{
          className: "!rounded-xl !border !border-[rgba(0,255,120,0.2)] !bg-[#0b1410] !text-[#e8f5ec] !shadow-[0_0_24px_-6px_rgba(0,255,120,0.3)] !font-sans !text-[13px]",
        }}
      />
    </>
  );
}
