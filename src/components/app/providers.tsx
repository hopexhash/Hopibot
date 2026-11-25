"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "!rounded-xl !border !border-border !bg-surface !text-foreground !shadow-[var(--shadow-lg)] !font-sans !text-[13px]",
        }}
      />
    </ThemeProvider>
  );
}
