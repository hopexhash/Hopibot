/**
 * "Page not found" for everyone, inline-styled so it works inside any layout and on its own.
 * Visitors who hit a control-room address without being signed in see exactly this page.
 */
export function NotFoundView() {
  // Plain links on purpose: this page also renders outside every layout, and the two root
  // layouts (website and control room) are separate documents.
  /* eslint-disable @next/next/no-html-link-for-pages */
  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(20px, 4vw, 48px)", background: "#0c0c0d", color: "#f2eee6", fontFamily: "var(--font-geist), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <a href="/" style={{ color: "#f2eee6", fontSize: 25, fontWeight: 700, letterSpacing: "-0.06em", textDecoration: "none" }}>
        HOPI<span style={{ color: "#ff4d23" }}>.</span>
      </a>
      <div>
        <p style={{ margin: 0, fontSize: "min(38vw, 420px)", fontWeight: 600, letterSpacing: "-0.07em", lineHeight: 0.8, color: "#ff4d23" }}>404</p>
        <h1 style={{ margin: "28px 0 0", fontSize: "clamp(28px, 4.4vw, 64px)", fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1, textTransform: "uppercase" }}>Deze pagina bestaat niet</h1>
        <p style={{ margin: "14px 0 0", maxWidth: 420, fontSize: 17, lineHeight: 1.5, color: "rgba(242,238,230,.7)" }}>De pagina die je zoekt is verplaatst of bestaat niet meer.</p>
        <p style={{ margin: "30px 0 0", display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="/" style={{ borderRadius: 2, background: "#ff4d23", color: "#0c0c0d", padding: "19px 26px", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>
            Naar de homepage
          </a>
          <a href="/werk" style={{ borderRadius: 2, border: "1px solid rgba(242,238,230,.34)", color: "#f2eee6", padding: "18px 26px", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>
            Bekijk ons werk
          </a>
        </p>
      </div>
    </main>
  );
  /* eslint-enable @next/next/no-html-link-for-pages */
}
