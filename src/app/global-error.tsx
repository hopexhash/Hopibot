"use client";

import { useEffect } from "react";

/**
 * Last-resort error screen (replaces the framework's default white page). It cannot rely
 * on the app's layout or stylesheet, so the styling is inline.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "#030806", color: "#e8f5ec", fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif", padding: 24 }}>
        <div style={{ maxWidth: 420, width: "100%", border: "1px solid rgba(0,255,120,0.18)", borderRadius: 18, padding: 28, background: "#091710", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", color: "#00ff78", fontWeight: 600 }}>HOPI BOT</div>
          <h1 style={{ fontSize: 20, margin: "14px 0 8px", fontWeight: 600 }}>Something went wrong on our side</h1>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "#84998d", margin: 0 }}>
            The page could not be loaded. Nothing you did caused this, and your data is safe. Try again in a moment.
          </p>
          {error.digest && <p style={{ fontSize: 12, color: "#6b8074", marginTop: 10, fontFamily: "ui-monospace, monospace" }}>Reference: {error.digest}</p>}
          <button
            onClick={reset}
            style={{ marginTop: 20, height: 46, width: "100%", borderRadius: 12, border: 0, background: "#00ff78", color: "#021008", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
