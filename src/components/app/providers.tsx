"use client";

import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        offset="calc(env(safe-area-inset-top, 0px) + 12px)"
        toastOptions={{
          className: "!rounded-xl !border !border-[rgba(0,255,102,0.2)] !bg-[#0b1410] !text-[#e8f5ec] !shadow-[0_0_24px_-6px_rgba(0,255,102,0.3)] !font-sans !text-[13px]",
        }}
      />
    </>
  );
}
