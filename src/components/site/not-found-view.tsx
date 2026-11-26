/**
 * "Page not found" for everyone, inline-styled so it works inside any layout and on its own.
 * Visitors who hit a control-room address without being signed in see exactly this page.
 */
export function NotFoundView() {
  // Plain links on purpose: this page also renders outside every layout, and the two root
  // layouts (website and control room) are separate documents.
  /* eslint-disable @next/next/no-html-link-for-pages */
  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center", background: "#f7f8f6", color: "#111512", fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, letterSpacing: "0.2em", opacity: 0.5 }}>404</p>
      <h1 style={{ margin: "12px 0 0", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}>Deze pagina bestaat niet</h1>
      <p style={{ margin: "12px 0 0", maxWidth: 380, fontSize: 16, lineHeight: 1.6, opacity: 0.68 }}>De pagina die je zoekt is verplaatst of bestaat niet meer.</p>
      <p style={{ margin: "28px 0 0", display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <a href="/" style={{ borderRadius: 999, background: "#111512", color: "#f7f8f6", padding: "13px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
          Naar de homepage
        </a>
        <a href="/website-laten-maken" style={{ borderRadius: 999, border: "1.5px solid rgba(17,21,18,.25)", color: "#111512", padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
          Website laten maken
        </a>
      </p>
    </main>
  );
  /* eslint-enable @next/next/no-html-link-for-pages */
}
