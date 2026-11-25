// Dev utility: renders every agent character in every mood to .samples/mascots.html
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { AgentMascot, mascotName } from "../src/components/app/agent-mascot";

const css = readFileSync("src/app/globals.css", "utf8");
const msc = css.slice(css.indexOf("/* ── Agent mascots"), css.indexOf("@media (prefers-reduced-motion: reduce)"));
const agents = ["lead_finder", "research", "contact_research", "website_builder", "quality_control", "deployment", "sales", "custom"];
const moods = ["idle", "running", "queued", "failed", "offline"];
const html = renderToStaticMarkup(
  <div style={{ display: "grid", gridTemplateColumns: `90px repeat(${agents.length}, 1fr)`, gap: 10, padding: 20, alignItems: "center" }}>
    <span />
    {agents.map((a) => <b key={a} style={{ textAlign: "center" }}>{mascotName(a)}</b>)}
    {moods.map((m) => [<span key={m}>{m}</span>, ...agents.map((a) => <div key={a + m} style={{ display: "grid", placeItems: "center", background: "#091710", borderRadius: 14, padding: 10 }}><AgentMascot agent={a} status={m} size={96} /></div>)])}
  </div>,
);
mkdirSync(".samples", { recursive: true });
writeFileSync(".samples/mascots.html", `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#030806;color:#e8f5ec;font:13px sans-serif}${msc}</style>${html}`);
console.log("written");
