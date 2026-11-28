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
        icons={{ success: <CheckDraw className="h-[18px] w-[18px] text-brand" /> }}
        toastOptions={{
          // Charcoal notes with paper text, like the dark sections of the website.
          className: "!rounded-lg !border !border-[rgba(242,238,230,0.12)] !bg-[#0c0c0d] !text-[#f2eee6] !shadow-[0_18px_40px_-18px_rgba(12,12,13,0.5)] !font-sans !text-[13px]",
        }}
      />
    </>
  );
}
