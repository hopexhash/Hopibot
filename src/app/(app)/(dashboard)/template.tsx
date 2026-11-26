/**
 * Page transition of the control room. A template is created anew for every page, so the
 * incoming page settles in (a short fade and a 6 px rise) while the sidebar and top bar
 * stay put. It is plain CSS on a wrapper: routing, server rendering and state are untouched,
 * and nothing waits for the animation.
 */
export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
