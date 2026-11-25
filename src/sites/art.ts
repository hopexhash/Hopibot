import type { ArtScene } from "./designs";

/**
 * Generated, licence-free illustrations. Every design has its own flat-lay scene built from
 * drawn objects (plates, tools, plants…), so previews look art-directed without using any
 * photography we have no rights to. Deterministic per seed + variant.
 */

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 10000) / 10000;
  };
}

export function hashString(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mix(hex: string, other: string, t: number) {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = p(hex);
  const b = p(other);
  return `#${a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, "0")).join("")}`;
}

export type ArtPalette = { bg: string; ink: string; primary: string; accent: string; surface: string; dark: boolean };
type R = () => number;
/** Draws an object around (0,0) with a nominal radius of 100. */
type Item = (r: R, c: ArtPalette) => string;

const n = (v: number) => Math.round(v * 10) / 10;
const CREAM = "#f6efe2";
const circle = (x: number, y: number, rad: number, fill: string, extra = "") => `<circle cx="${n(x)}" cy="${n(y)}" r="${n(rad)}" fill="${fill}" ${extra}/>`;
const ell = (x: number, y: number, rx: number, ry: number, fill: string, rot = 0, extra = "") =>
  `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}" ${rot ? `transform="rotate(${n(rot)} ${n(x)} ${n(y)})"` : ""} ${extra}/>`;
const rect = (x: number, y: number, w: number, h: number, rx: number, fill: string, extra = "") =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(rx)}" fill="${fill}" ${extra}/>`;
const path = (d: string, fill: string, extra = "") => `<path d="${d}" fill="${fill}" ${extra}/>`;
const line = (d: string, stroke: string, w: number, extra = "") => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;

const plate = (rim = CREAM) => circle(0, 0, 100, rim) + circle(0, 0, 70, "none", `stroke="#000" stroke-opacity=".07" stroke-width="2"`);
const leaf = (x: number, y: number, s: number, rot: number, fill = "#3f7d3a") =>
  `<g transform="translate(${n(x)} ${n(y)}) rotate(${n(rot)}) scale(${n(s)})">${path("M0 0 C 12 -22 40 -22 52 0 C 40 22 12 22 0 0Z", fill)}${line("M4 0 H46", "#ffffff", 1.6, 'opacity=".35"')}</g>`;
const scatter = (r: R, count: number, rad: number, draw: (x: number, y: number, i: number) => string) => {
  let s = "";
  for (let i = 0; i < count; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * rad;
    s += draw(Math.cos(a) * d, Math.sin(a) * d, i);
  }
  return s;
};

const ITEMS: Record<string, Item> = {
  dish: (r, c) =>
    plate() +
    scatter(r, 5, 34, (x, y, i) => ell(x, y, 16 + r() * 16, 12 + r() * 10, ["#b9512e", "#d9a441", "#7a2e2a", "#e9d8b0", c.accent][i % 5], r() * 180)) +
    leaf(-12, -8, 0.55, 30 + r() * 90) +
    leaf(14, 10, 0.45, 200 + r() * 60) +
    scatter(r, 7, 52, (x, y) => circle(x, y, 2.4, c.accent, 'opacity=".8"')),
  fineplate: (r, c) =>
    circle(0, 0, 100, c.dark ? "#1d1a17" : CREAM) +
    circle(0, 0, 96, "none", `stroke="${c.accent}" stroke-opacity=".55" stroke-width="1.5"`) +
    ell(8, 4, 26, 14, "#7a2e2a", 20) +
    ell(-10, -6, 12, 12, "#e9d8b0") +
    line("M-52 26 C -20 48 30 44 56 12", c.accent, 3, 'opacity=".9"') +
    scatter(r, 5, 40, (x, y) => circle(x, y, 3 + r() * 3, ["#d9a441", "#6f9a45", c.accent][Math.floor(r() * 3)])) +
    leaf(4, -20, 0.36, -40, "#6f9a45"),
  pasta: (r) => {
    let s = plate() + circle(0, 0, 58, "#e8c56d");
    for (let i = 0; i < 9; i++) s += ell(r() * 20 - 10, r() * 20 - 10, 30 + r() * 22, 12 + r() * 14, "none", r() * 180, `stroke="#c99a36" stroke-width="5"`);
    return s + ell(4, 0, 24, 18, "#b3261e", 15) + leaf(-6, -6, 0.5, 40) + leaf(10, 8, 0.4, 160) + scatter(r, 8, 40, (x, y) => circle(x, y, 2, "#fff8e6"));
  },
  pizza: (r) => {
    let s = circle(0, 0, 100, "#d9a35a") + circle(0, 0, 86, "#c0392b") + circle(0, 0, 82, "#f1d08a", 'opacity=".9"');
    s += scatter(r, 9, 66, (x, y) => circle(x, y, 11, "#b3261e") + circle(x - 3, y - 3, 3, "#d9574c"));
    s += scatter(r, 6, 62, (x, y) => leaf(x, y, 0.4, r() * 360, "#2f7d46"));
    s += scatter(r, 6, 64, (x, y) => circle(x, y, 7, "#fbf3df") + circle(x, y, 7, "none", 'stroke="#000" stroke-opacity=".06"'));
    for (let i = 0; i < 4; i++) s += line(`M${n(-86 * Math.cos((i * Math.PI) / 4))} ${n(-86 * Math.sin((i * Math.PI) / 4))} L${n(86 * Math.cos((i * Math.PI) / 4))} ${n(86 * Math.sin((i * Math.PI) / 4))}`, "#8a5a22", 1.5, 'opacity=".35"');
    return s;
  },
  board: () => rect(-110, -74, 220, 148, 26, "#b98552") + rect(-110, -74, 220, 148, 26, "none", 'stroke="#8a5a2c" stroke-width="3" opacity=".5"') + circle(86, 0, 9, "#8a5a2c", 'opacity=".5"'),
  sushi: (r, c) => {
    let s = rect(-112, -58, 224, 116, 6, "#22262b") + rect(-112, -58, 224, 116, 6, "none", 'stroke="#fff" stroke-opacity=".08" stroke-width="2"');
    for (let i = 0; i < 4; i++) {
      const x = -78 + i * 38;
      s += circle(x, -18, 17, "#12301f") + circle(x, -18, 13.5, "#fbfaf5") + circle(x, -18, 6, ["#f08a5d", "#7cb46b", "#f08a5d", c.accent][i]);
    }
    for (let i = 0; i < 3; i++) {
      const x = -62 + i * 48;
      s += rect(x - 20, 14, 40, 22, 11, "#fbfaf5") + rect(x - 21, 9, 42, 18, 9, ["#f4845f", "#f7b267", "#e85d4a"][i]) + line(`M${x - 12} 13 l8 8 M${x} 12 l8 8`, "#fff", 1.6, 'opacity=".5"');
    }
    return s + circle(88, 30, 14, "#3b2a20") + circle(88, 30, 10, "#1c1410") + ell(84, -22, 14, 10, "#f4b6c2", 20) + ell(92, -30, 9, 7, "#a8c66c");
  },
  chopsticks: () => rect(-110, -9, 220, 6, 3, "#3a2a22") + rect(-108, 5, 220, 6, 3, "#3a2a22", 'transform="rotate(2.5)"'),
  soy: () => circle(0, 0, 100, "#f1ece2") + circle(0, 0, 72, "#2a1d16") + circle(-18, -18, 14, "#fff", 'opacity=".08"'),
  burger: (r) =>
    ell(0, 62, 96, 22, "#c8853a") +
    rect(-98, 28, 196, 30, 12, "#5a2d1c") +
    path("M-104 30 q12 -16 26 0 t26 0 t26 0 t26 0 t26 0 t26 0 t26 0 t26 0 v8 h-208z", "#6fae3e") +
    path("M-98 20 h196 l-22 26 l-28 -20 l-30 22 l-34 -24 l-36 20 l-30 -22z", "#f6b93b") +
    rect(-92, 6, 184, 16, 8, "#c0392b") +
    path("M-100 6 C -100 -74 100 -74 100 6 Z", "#d99a45") +
    path("M-100 6 C -100 -74 100 -74 100 6 Z", "none", 'stroke="#fff" stroke-opacity=".18" stroke-width="3"') +
    scatter(r, 12, 60, (x, y) => (y < -4 ? ell(x, y - 26 > -64 ? y - 26 : -50, 5, 2.6, "#fff3d6", r() * 180) : "")),
  fries: (r) => {
    let s = "";
    for (let i = 0; i < 9; i++) s += rect(-46 + i * 11, -92 + r() * 30, 9, 110, 3, i % 2 ? "#f2c14e" : "#e6a93a", `transform="rotate(${n(-10 + i * 2.5)} 0 40)"`);
    return s + path("M-62 0 H62 L44 100 H-44Z", "#c0392b") + path("M-62 0 H62 L58 22 H-58Z", "#fff", 'opacity=".9"');
  },
  cup: (r, c) =>
    circle(0, 0, 100, c.dark ? "#2a2522" : "#fbf6ee") +
    circle(0, 0, 96, "none", 'stroke="#000" stroke-opacity=".06" stroke-width="2"') +
    rect(54, -12, 46, 24, 12, c.dark ? "#3a3430" : "#f1e8da") +
    circle(0, 0, 64, c.dark ? "#3a3430" : "#fffaf2") +
    circle(0, 0, 54, "#5a3620") +
    circle(0, 0, 54, "#8a5a36", 'opacity=".55"') +
    path("M0 26 C -34 2 -22 -26 0 -8 C 22 -26 34 2 0 26Z", "#f3dfc4", 'opacity=".92"') +
    path("M0 10 C -16 -2 -10 -14 0 -6 C 10 -14 16 -2 0 10Z", "#8a5a36", 'opacity=".5"'),
  beans: (r) => scatter(r, 9, 80, (x, y) => ell(x, y, 13, 9, "#3b2416", r() * 180) + line(`M${n(x - 8)} ${n(y)} q8 -5 16 0`, "#7a4d30", 1.6)),
  croissant: () =>
    path("M-96 28 C -70 -70 70 -70 96 28 C 60 -4 -60 -4 -96 28Z", "#d99a45") +
    line("M-52 -24 l10 34 M-22 -40 l4 40 M12 -40 l-4 40 M44 -26 l-12 34", "#a86a22", 4, 'opacity=".6"') +
    path("M-96 28 C -70 -70 70 -70 96 28", "none", 'stroke="#f3cf8e" stroke-width="5" opacity=".7" stroke-linecap="round"'),
  loaf: () => ell(0, 0, 104, 62, "#c98a45") + ell(0, -6, 92, 48, "#dba45e") + line("M-58 -14 l22 24 M-22 -22 l22 30 M14 -22 l22 30 M48 -12 l18 20", "#f6e3bd", 6) + scatter(rng(7), 14, 70, (x, y) => circle(x, y * 0.5, 1.6, "#fff3d6", 'opacity=".8"')),
  cake: (r, c) =>
    circle(0, 0, 100, "#fff6ee") +
    circle(0, 0, 80, c.accent) +
    circle(0, 0, 80, "#fff", 'opacity=".2"') +
    scatter(r, 8, 62, (x, y) => circle(x, y, 9, "#fff7f0")) +
    scatter(r, 6, 40, (x, y) => circle(x, y, 8, "#a3213b") + circle(x - 2, y - 2, 2.4, "#fff", 'opacity=".5"')) +
    leaf(6, -4, 0.4, 20, "#5c9a52"),
  macarons: (r, c) => {
    const cols = ["#f4b6c2", "#f6d58a", "#b9dcc0", c.accent, "#d7c1e8"];
    let s = "";
    for (let i = 0; i < 5; i++) {
      const x = -72 + (i % 3) * 72 + (i > 2 ? 36 : 0);
      const y = i > 2 ? 40 : -34;
      s += circle(x, y, 32, cols[i]) + circle(x, y, 32, "none", 'stroke="#fff" stroke-opacity=".5" stroke-width="5"') + circle(x - 8, y - 8, 7, "#fff", 'opacity=".35"');
    }
    return s;
  },
  mezze: (r) => {
    const dips = ["#e3c58f", "#b4476a", "#f7f3e8", "#7c9a4a", "#c9552f"];
    let s = circle(0, 0, 104, "#c8a15a") + circle(0, 0, 98, "#17494a");
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const x = Math.cos(a) * 56;
      const y = Math.sin(a) * 56;
      s += circle(x, y, 30, "#f3e9d8") + circle(x, y, 23, dips[i]) + circle(x + 4, y - 4, 5, "#fff", 'opacity=".25"') + leaf(x - 8, y + 2, 0.22, r() * 360, "#35672c");
    }
    return s + circle(0, 0, 20, "#f3e9d8") + circle(0, 0, 14, "#4b3b1f") + scatter(r, 5, 9, (x, y) => circle(x, y, 3.4, "#2f3d1c"));
  },
  flatbread: (r) => circle(0, 0, 100, "#e7c891") + scatter(r, 12, 78, (x, y) => ell(x, y, 10 + r() * 8, 7 + r() * 6, "#b98548", r() * 180, 'opacity=".55"')) + scatter(r, 14, 80, (x, y) => circle(x, y, 2, "#2c2a22")),
  skewers: () => {
    let s = "";
    for (let j = 0; j < 3; j++) {
      const y = -44 + j * 44;
      s += rect(-112, y - 2, 224, 4, 2, "#8c8a84");
      for (let i = 0; i < 5; i++) s += rect(-80 + i * 34, y - 15, 28, 30, 9, ["#8a3b22", "#c9552f", "#5f8f3a", "#8a3b22", "#e0a23c"][(i + j) % 5]);
    }
    return s;
  },
  tea: (r, c) => circle(0, 0, 100, "#f3e9d8") + circle(0, 0, 92, "none", `stroke="${c.accent}" stroke-width="3" stroke-dasharray="4 9"`) + circle(0, 0, 50, "#fbf6ea") + circle(0, 0, 40, "#a8431e") + circle(-10, -10, 8, "#fff", 'opacity=".25"'),
  bowl: (r, c) => {
    let s = circle(0, 0, 100, c.dark ? "#2b2136" : "#263238") + circle(0, 0, 84, "#e2a84b");
    for (let i = 0; i < 8; i++) s += line(`M${n(-70 + r() * 20)} ${n(-40 + i * 11)} q 35 ${n(-14 + r() * 28)} 70 0 t 70 0`, "#f6dc9b", 5, 'opacity=".9"');
    return s + circle(-30, -26, 22, "#fbf6ea") + circle(-30, -26, 11, "#f2a23a") + ell(34, 22, 30, 15, "#8a3b22", 20) + leaf(22, -36, 0.5, 20, "#57a05a") + leaf(-34, 36, 0.45, 150, "#57a05a") + scatter(r, 8, 60, (x, y) => circle(x, y, 2.4, c.accent));
  },
  dumplings: (r) => {
    let s = circle(0, 0, 100, "#c9a26b") + circle(0, 0, 92, "#e9d2a6");
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const x = Math.cos(a) * 52;
      const y = Math.sin(a) * 52;
      s += `<g transform="translate(${n(x)} ${n(y)}) rotate(${n((a * 180) / Math.PI + 90)})">${path("M-24 8 C -24 -22 24 -22 24 8Z", "#fbf6ea")}${line("M-16 -6 l4 8 M-6 -12 l2 10 M6 -12 l-2 10 M16 -6 l-4 8", "#d9c9a8", 2)}</g>`;
    }
    return s + circle(0, 0, 18, "#2a1d16");
  },
  taco: (r) =>
    path("M-100 30 C -100 -80 100 -80 100 30Z", "#e8b84f") +
    path("M-88 26 q14 -22 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 v6 h-168z", "#6fae3e") +
    scatter(r, 9, 50, (x, y) => circle(x, Math.abs(y) * -0.6 + 12, 9, ["#c0392b", "#8a3b22", "#f7f3e8"][Math.floor(r() * 3)])) +
    path("M-100 30 C -100 -80 100 -80 100 30", "none", 'stroke="#fff" stroke-opacity=".25" stroke-width="4"') +
    scatter(r, 10, 70, (x, y) => (y < 0 ? circle(x, y * 0.6 - 8, 2, "#b9801f") : "")),
  drink: (r, c) => circle(0, 0, 70, "#ffffff", 'opacity=".9"') + circle(0, 0, 58, c.accent) + circle(0, 0, 58, "#fff", 'opacity=".25"') + circle(14, -10, 22, "#f6d24a") + line("M14 -32 v44 M-8 -10 h44 M-2 -26 l32 32 M30 -26 l-32 32", "#fff", 1.6, 'opacity=".7"') + rect(-6, -110, 8, 90, 4, "#fff", 'transform="rotate(24)" opacity=".9"'),
  lemon: () => circle(0, 0, 60, "#f6d24a") + circle(0, 0, 50, "#fbe98e") + line("M0 -50 v100 M-50 0 h100 M-35 -35 l70 70 M35 -35 l-70 70", "#f6d24a", 3),
  cutlery: (r, c) => rect(-34, -110, 8, 220, 4, c.dark ? "#b9b3a6" : "#8d8a84") + rect(-44, -110, 28, 60, 12, c.dark ? "#b9b3a6" : "#8d8a84") + rect(20, -30, 8, 140, 4, c.dark ? "#b9b3a6" : "#8d8a84") + path("M16 -110 q20 40 8 86 h-8z", c.dark ? "#b9b3a6" : "#8d8a84"),
  glass: (r, c) => circle(0, 0, 58, "#ffffff", 'opacity=".16"') + circle(0, 0, 58, "none", 'stroke="#fff" stroke-opacity=".5" stroke-width="3"') + circle(0, 0, 44, "#7a1f2b", 'opacity=".85"') + circle(-12, -12, 10, "#fff", 'opacity=".2"') + circle(0, 0, 44, "none", `stroke="${c.accent}" stroke-opacity=".3"`),
  candle: (r, c) => circle(0, 0, 46, c.accent, 'opacity=".16" filter="url(#blur)"') + circle(0, 0, 30, "#2a2622") + circle(0, 0, 22, "#f4ead6") + circle(0, 0, 7, "#ffcf6b") + circle(0, 0, 3, "#fff"),
  herbs: (r) => scatter(r, 6, 60, (x, y) => leaf(x, y, 0.7 + r() * 0.5, r() * 360, ["#3f7d3a", "#57a05a", "#2f6b3a"][Math.floor(r() * 3)])),
  tomatoes: (r) => scatter(r, 4, 60, (x, y) => circle(x, y, 26, "#c0392b") + circle(x - 8, y - 8, 7, "#fff", 'opacity=".25"') + leaf(x - 10, y - 4, 0.3, r() * 360, "#2f7d46")),
  // ── Non-food ──
  scissors: (r, c) =>
    `<g transform="rotate(18)">${path("M-6 -110 L8 -110 L10 20 L-2 20Z", "#c9ccd1")}</g><g transform="rotate(-18)">${path("M-8 -110 L6 -110 L2 20 L-10 20Z", "#e2e5e9")}</g>` +
    circle(-30, 62, 26, "none", `stroke="${c.accent}" stroke-width="10"`) +
    circle(30, 62, 26, "none", `stroke="${c.accent}" stroke-width="10"`) +
    circle(0, 6, 6, "#55595f"),
  comb: (r, c) => {
    let s = rect(-110, -30, 220, 22, 6, c.accent);
    for (let i = 0; i < 26; i++) s += rect(-106 + i * 8.2, -10, 4.2, i < 13 ? 44 : 34, 2, c.accent);
    return s;
  },
  razor: (r, c) => `<g transform="rotate(-24)">${rect(-100, -12, 120, 30, 4, "#d9dce0")}${rect(-100, 12, 120, 6, 2, "#aab0b7")}</g>` + `<g transform="rotate(14)">${rect(-4, -10, 112, 24, 10, c.accent)}</g>` + circle(4, 4, 7, "#55595f"),
  pole: (r, c) => {
    let s = rect(-26, -100, 52, 200, 8, "#f4efe4");
    for (let i = 0; i < 7; i++) s += path(`M-26 ${-90 + i * 32} l52 -22 v14 l-52 22z`, i % 2 ? "#b3261e" : "#24427a");
    return `<g>${s}${rect(-34, -112, 68, 18, 8, c.accent)}${rect(-34, 94, 68, 18, 8, c.accent)}${rect(-26, -100, 14, 200, 0, "#fff", 'opacity=".16"')}</g>`;
  },
  brush: (r, c) => circle(0, 0, 60, "#3a2a22") + circle(0, 0, 50, "#5a4636") + scatter(r, 40, 46, (x, y) => circle(x, y, 2.2, "#e9dccb")) + rect(-12, 50, 24, 62, 10, c.accent),
  bottle: (r, c) => rect(-30, -60, 60, 150, 18, c.dark ? "#2a2f36" : "#fbf7f2") + rect(-16, -96, 32, 40, 6, c.accent) + rect(-30, -4, 60, 46, 0, c.accent, 'opacity=".22"') + rect(-22, -52, 8, 130, 4, "#fff", 'opacity=".18"'),
  jar: (r, c) => circle(0, 0, 70, c.dark ? "#2a2f36" : "#fffaf6") + circle(0, 0, 58, c.accent, 'opacity=".9"') + circle(0, 0, 58, "#fff", 'opacity=".35"') + line("M-30 6 q14 -30 44 -22", "#fff", 5, 'opacity=".6"'),
  flower: (r, c) => {
    let s = "";
    for (let i = 0; i < 8; i++) s += ell(0, -56, 26, 50, i % 2 ? c.accent : mix(c.accent, "#ffffff", 0.55), 0, `transform="rotate(${i * 45})"`);
    return s + circle(0, 0, 22, "#f6d58a") + scatter(r, 10, 16, (x, y) => circle(x, y, 2, "#c98a2b"));
  },
  towel: (r, c) => circle(0, 0, 70, mix(c.accent, "#ffffff", 0.75)) + line("M0 0 m-52 0 a52 52 0 1 0 104 0 a40 40 0 1 0 -80 0 a28 28 0 1 0 56 0 a16 16 0 1 0 -32 0", mix(c.accent, "#ffffff", 0.3), 4),
  dryer: (r, c) => rect(-100, -44, 150, 88, 44, c.dark ? "#2a2f36" : "#3a2f2a") + rect(40, -34, 62, 68, 8, c.accent) + rect(-70, 30, 50, 90, 16, c.dark ? "#2a2f36" : "#3a2f2a", 'transform="rotate(14 -45 30)"') + circle(-56, 0, 26, "#fff", 'opacity=".08"'),
  car: (r, c) =>
    ell(0, 62, 120, 12, "#000", 0, 'opacity=".35" filter="url(#blur2)"') +
    path("M-118 34 C -120 4 -96 -6 -70 -10 C -48 -44 -10 -52 22 -50 C 56 -48 76 -30 92 -8 C 112 -4 122 6 120 34 Z", c.dark ? "#0f141b" : "#1b2430") +
    path("M-60 -12 C -44 -36 -12 -42 14 -41 L 14 -12 Z", "#8fd3e8", 'opacity=".75"') +
    path("M22 -41 C 46 -40 64 -28 76 -12 L 22 -12 Z", "#8fd3e8", 'opacity=".75"') +
    line("M-112 6 C -60 -2 60 -2 114 8", c.accent, 2.5, 'opacity=".9"') +
    line("M-52 -30 l22 16 M30 -34 l22 18", "#fff", 3, 'opacity=".5"') +
    [-66, 70].map((x) => circle(x, 36, 26, "#0a0c10") + circle(x, 36, 15, "#aeb6c0") + circle(x, 36, 5, "#0a0c10")).join("") +
    rect(104, 4, 14, 8, 3, "#ffe9a6") +
    rect(-118, 6, 10, 8, 3, "#e23d28"),
  sparkles: (r, c) => scatter(r, 6, 80, (x, y) => `<g transform="translate(${n(x)} ${n(y)}) scale(${n(0.5 + r() * 0.9)})">${path("M0 -22 C 3 -6 6 -3 22 0 C 6 3 3 6 0 22 C -3 6 -6 3 -22 0 C -6 -3 -3 -6 0 -22Z", c.dark ? "#ffffff" : c.accent, 'opacity=".9"')}</g>`),
  polisher: (r, c) => circle(0, 0, 80, "#1b2430") + circle(0, 0, 66, c.accent, 'opacity=".9"') + circle(0, 0, 66, "#fff", 'opacity=".25"') + line("M0 0 m-44 0 a44 44 0 1 0 88 0 a30 30 0 1 0 -60 0 a16 16 0 1 0 32 0", "#fff", 3, 'opacity=".6"') + rect(-16, 60, 32, 56, 12, "#1b2430"),
  wheel: (r, c) => {
    let s = circle(0, 0, 100, "#14171c") + circle(0, 0, 86, "none", 'stroke="#2a2f37" stroke-width="6" stroke-dasharray="6 10"') + circle(0, 0, 64, "#c5cbd3") + circle(0, 0, 58, "#8b939e");
    for (let i = 0; i < 5; i++) s += rect(-9, -58, 18, 58, 6, "#dfe3e8", `transform="rotate(${i * 72})"`);
    return s + circle(0, 0, 18, "#14171c") + circle(0, 0, 8, c.accent);
  },
  wrench: (r, c) => `<g transform="rotate(${n(-30 + r() * 20)})">${rect(-11, -70, 22, 150, 8, "#b8bec7")}${path("M-30 -104 a30 30 0 1 0 60 0 l-18 0 l0 22 l-24 0 l0 -22z", "#b8bec7")}${circle(0, 86, 22, "#b8bec7")}${circle(0, 86, 9, c.dark ? "#14171c" : "#55595f")}${rect(-5, -60, 5, 130, 2, "#fff", 'opacity=".35"')}</g>`,
  gear: (r, c) => {
    let s = "";
    for (let i = 0; i < 10; i++) s += rect(-12, -98, 24, 36, 4, c.accent, `transform="rotate(${i * 36})"`);
    return s + circle(0, 0, 76, c.accent) + circle(0, 0, 40, c.dark ? "#14171c" : "#2a2f37") + circle(0, 0, 76, "none", 'stroke="#000" stroke-opacity=".15" stroke-width="3"');
  },
  cone: () => path("M-22 -90 h44 l44 160 h-132z", "#f26b21") + path("M-34 -44 h68 l10 36 h-88z", "#fff") + path("M-52 24 h104 l8 30 h-120z", "#fff") + rect(-86, 66, 172, 22, 6, "#1f2329"),
  building: (r, c) => {
    let s = rect(-70, -100, 140, 200, 2, c.dark ? "#1d2228" : "#2a2c2f") + rect(-70, -100, 30, 200, 0, "#fff", 'opacity=".05"');
    for (let y = 0; y < 7; y++) for (let x = 0; x < 4; x++) s += rect(-54 + x * 30, -84 + y * 26, 18, 14, 1, r() > 0.45 ? c.accent : "#ffffff", `opacity="${r() > 0.45 ? 0.9 : 0.12}"`);
    return s + rect(-110, 96, 220, 8, 0, c.accent);
  },
  crane: (r, c) => rect(-8, -100, 16, 200, 0, c.accent) + line("M-8 -70 l16 20 l-16 20 l16 20 l-16 20 l16 20 l-16 20 l16 20", "#000", 2, 'opacity=".35"') + rect(-70, -108, 190, 12, 0, c.accent) + line("M0 -128 L-70 -102 M0 -128 L118 -102", c.accent, 3) + line("M92 -96 v70", "#55595f", 2) + rect(80, -28, 24, 20, 2, "#55595f") + rect(-34, 96, 68, 12, 0, "#2a2c2f"),
  plan: (r, c) => rect(-110, -84, 220, 168, 3, "#f7f5ef") + line("M-90 -64 h180 v128 h-180z M-90 -6 h80 v70 M10 -64 v58 h80 M-30 -64 v58", "#1f2329", 3) + line("M-10 -6 a20 20 0 0 1 20 20 M10 20 h80", "#1f2329", 1.6, 'opacity=".6"') + rect(22, -54, 56, 36, 0, c.accent, 'opacity=".55"') + line("M-110 96 h220 M-110 90 v12 M0 90 v12 M110 90 v12", c.accent, 2),
  helmet: (r, c) => path("M-90 30 C -90 -80 90 -80 90 30Z", c.accent) + rect(-110, 26, 220, 22, 10, mix(c.accent, "#000000", 0.18)) + rect(-12, -66, 24, 96, 8, mix(c.accent, "#ffffff", 0.35)) + line("M-64 6 C -58 -30 -40 -44 -30 -48", "#fff", 5, 'opacity=".45"'),
  bricks: (r, c) => {
    let s = "";
    for (let y = 0; y < 5; y++) for (let x = 0; x < 4; x++) s += rect(-108 + x * 56 + (y % 2 ? -28 : 0), -70 + y * 28, 52, 24, 2, r() > 0.7 ? c.accent : "#a8563a", `opacity="${n(0.75 + r() * 0.25)}"`);
    return s;
  },
  spray: (r, c) => rect(-34, -20, 68, 130, 16, c.dark ? "#22303a" : "#ffffff") + rect(-34, 30, 68, 44, 0, c.accent, 'opacity=".85"') + rect(-18, -58, 36, 42, 6, c.accent) + path("M-18 -58 h50 v14 h-22 l-10 22 h-18z", mix(c.accent, "#000000", 0.2)) + scatter(r, 9, 34, (x, y) => circle(70 + Math.abs(x), -60 + y, 3 + r() * 4, "#fff", 'opacity=".7"')),
  bubbles: (r, c) => scatter(r, 9, 86, (x, y) => { const s = 12 + r() * 26; return circle(x, y, s, "#ffffff", 'opacity=".28"') + circle(x, y, s, "none", `stroke="${c.dark ? "#fff" : c.accent}" stroke-opacity=".55" stroke-width="2"`) + circle(x - s * 0.35, y - s * 0.35, s * 0.2, "#fff", 'opacity=".8"'); }),
  sponge: (r, c) => rect(-90, -50, 180, 100, 22, "#f6d24a") + rect(-90, 14, 180, 36, 16, "#3aa76d") + scatter(r, 14, 60, (x, y) => circle(x, y * 0.4 - 16, 4 + r() * 4, "#d9a92a", 'opacity=".6"')),
  bucket: (r, c) => circle(0, 0, 96, c.accent) + circle(0, 0, 80, mix(c.accent, "#000000", 0.25)) + circle(0, 0, 70, "#bfe6f7") + scatter(r, 8, 56, (x, y) => circle(x, y, 8 + r() * 10, "#fff", 'opacity=".7"')) + line("M-96 0 C -96 -130 96 -130 96 0", "#c5cbd3", 6),
  lawn: (r, c) => {
    let s = rect(-112, -84, 224, 168, 28, "#5f9a47");
    for (let i = 0; i < 7; i++) s += rect(-112 + i * 32, -84, 16, 168, 0, "#6fae52", 'opacity=".55"');
    return `<g>${s}${scatter(r, 5, 60, (x, y) => circle(x, y, 13, "#e9e2d0") + circle(x, y, 13, "none", 'stroke="#000" stroke-opacity=".1"'))}${rect(-112, -84, 224, 168, 28, "none", `stroke="${c.accent}" stroke-opacity=".4" stroke-width="3"`)}</g>`;
  },
  shrub: (r) => {
    const col = ["#2f6b3a", "#3f8a48", "#57a05a"][Math.floor(r() * 3)];
    let s = "";
    for (let i = 0; i < 9; i++) s += circle(Math.cos((i / 9) * 6.283) * 62, Math.sin((i / 9) * 6.283) * 62, 36, col);
    return s + circle(0, 0, 70, col) + scatter(r, 16, 70, (x, y) => circle(x, y, 5, "#8fd08a", 'opacity=".5"')) + scatter(r, 5, 60, (x, y) => circle(x, y, 6, "#f4b6c2"));
  },
  pond: () => path("M-90 -10 C -90 -70 20 -90 70 -50 C 120 -10 80 70 10 70 C -50 70 -90 40 -90 -10Z", "#d9d2c0") + path("M-76 -8 C -76 -58 16 -74 60 -42 C 100 -10 70 56 10 56 C -42 56 -76 32 -76 -8Z", "#6fb7c9") + circle(-14, 4, 18, "#4f9a52") + circle(30, -14, 12, "#4f9a52") + circle(-10, 0, 5, "#f4b6c2"),
  path: () => { let s = ""; for (let i = 0; i < 7; i++) s += ell(-96 + i * 32, Math.sin(i * 0.9) * 26, 18, 13, "#d9d2c0", i * 20) + ell(-96 + i * 32, Math.sin(i * 0.9) * 26, 18, 13, "none", i * 20, 'stroke="#000" stroke-opacity=".12"'); return s; },
  pot: (r, c) => circle(0, 0, 80, c.accent) + circle(0, 0, 64, "#4b3424") + scatter(r, 9, 50, (x, y) => leaf(x, y, 0.9, r() * 360, ["#3f8a48", "#57a05a", "#2f6b3a"][Math.floor(r() * 3)])),
  tooth: (r, c) => path("M0 -90 c-30 0 -48 14 -70 14 c-25 0 -40 24 -40 60 c0 52 22 82 34 128 c9 36 16 54 32 54 c22 0 18 -70 44 -70 s22 70 44 70 c16 0 23 -18 32 -54 c12 -46 34 -76 34 -128 c0 -36 -15 -60 -40 -60 c-22 0 -40 -14 -70 -14z", "#ffffff", `transform="scale(.62)" stroke="${c.accent}" stroke-opacity=".5" stroke-width="5"`),
  house: (r, c) => path("M-100 0 L0 -90 L100 0 V96 H-100Z", c.dark ? "#1d2228" : "#ffffff") + path("M-116 6 L0 -100 L116 6", "none", `stroke="${c.accent}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"`) + rect(-22, 30, 44, 66, 4, c.accent) + rect(-78, 16, 36, 36, 3, "#8fd3e8", 'opacity=".8"') + rect(42, 16, 36, 36, 3, "#8fd3e8", 'opacity=".8"'),
  chart: (r, c) => { let s = ""; for (let i = 0; i < 6; i++) { const h = 40 + i * 24 + r() * 14; s += rect(-100 + i * 35, 90 - h, 24, h, 6, i === 5 ? c.accent : "#ffffff", `opacity="${i === 5 ? 1 : n(0.25 + i * 0.1)}"`); } return s + line("M-96 20 C -40 10 10 -40 100 -84", c.accent, 6); },
  check: (r, c) => circle(0, 0, 80, c.accent) + line("M-34 2 l24 24 l46 -52", "#fff", 14),
};

const SCENES: Record<ArtScene, string[]> = {
  finedining: ["fineplate", "glass", "candle", "cutlery", "herbs", "fineplate"],
  italian: ["pasta", "pizza", "tomatoes", "herbs", "glass", "cutlery"],
  mezze: ["mezze", "flatbread", "skewers", "tea", "herbs", "lemon"],
  sushi: ["sushi", "soy", "chopsticks", "sushi", "herbs", "soy"],
  burger: ["burger", "fries", "drink", "burger", "tomatoes", "fries"],
  pizza: ["pizza", "tomatoes", "herbs", "board", "drink", "pizza"],
  coffee: ["cup", "croissant", "beans", "cup", "macarons", "beans"],
  bakery: ["cake", "croissant", "macarons", "loaf", "cup", "macarons"],
  street: ["taco", "fries", "drink", "bowl", "lemon", "skewers"],
  fusion: ["bowl", "dumplings", "chopsticks", "sushi", "drink", "herbs"],
  truck: ["taco", "burger", "fries", "drink", "lemon", "taco"],
  barber: ["scissors", "comb", "pole", "razor", "brush", "bottle"],
  hair: ["scissors", "dryer", "comb", "bottle", "brush", "flower"],
  beauty: ["flower", "jar", "bottle", "towel", "flower", "jar"],
  detailing: ["car", "sparkles", "polisher", "wheel", "spray", "sparkles"],
  garage: ["wheel", "wrench", "gear", "car", "cone", "wrench"],
  construction: ["building", "crane", "plan", "helmet", "bricks", "cone"],
  cleaning: ["spray", "bubbles", "sponge", "bucket", "sparkles", "bubbles"],
  garden: ["lawn", "shrub", "pond", "path", "pot", "shrub"],
  dental: ["tooth", "bubbles", "sparkles", "check", "flower", "bubbles"],
  estate: ["house", "building", "plan", "check", "shrub", "house"],
  corporate: ["chart", "check", "gear", "sparkles", "chart", "building"],
  service: ["house", "wrench", "check", "gear", "spray", "house"],
};

/** Objects that read as side views: they are kept upright instead of being rotated like flat-lay props. */
const UPRIGHT = new Set(["burger", "fries", "car", "building", "crane", "cone", "pole", "house", "chart", "helmet", "taco", "bottle", "spray", "tooth", "check", "plan", "lawn"]);

export function generateArt(scene: ArtScene, pal: ArtPalette, seedKey: string, variant = 0, w = 1200, h = 1000) {
  const r = rng(hashString(`${seedKey}:${scene}:${variant}`));
  const pool = SCENES[scene] ?? SCENES.service;
  // Table/backdrop tone alternates between three tints of the brand palette.
  const tones = pal.dark
    ? [mix(pal.bg, "#ffffff", 0.06), mix(pal.bg, pal.accent, 0.14), mix(pal.bg, "#000000", 0.25)]
    : [mix(pal.surface, pal.accent, 0.16), mix(pal.bg, pal.ink, 0.08), mix(pal.surface, pal.primary, 0.14)];
  const table = tones[variant % 3];
  const unit = Math.min(w, h);
  // Variant 1 is the hero image: it leads with the scene's signature object.
  const fi = (variant + pool.length - 1) % pool.length;
  const focus = pool[fi];
  const others = pool.filter((_, i) => i !== fi);
  const place = (key: string, x: number, y: number, size: number) => {
    const item = ITEMS[key];
    if (!item) return "";
    const rot = UPRIGHT.has(key) ? -4 + r() * 8 : r() * 360;
    return `<g transform="translate(${n(x)} ${n(y)}) rotate(${n(rot)}) scale(${n(size / 100)})" filter="url(#sh)">${item(r, pal)}</g>`;
  };
  let body = "";
  // Soft light pools on the surface.
  for (let i = 0; i < 3; i++) body += circle(r() * w, r() * h, unit * (0.25 + r() * 0.25), i % 2 ? pal.accent : "#ffffff", `opacity="${pal.dark ? 0.07 : 0.16}" filter="url(#blur)"`);
  // Satellites sit around the edges (partly cropped, like a styled flat-lay); the focus object anchors the frame.
  const spots = [
    [0.1, 0.16], [0.9, 0.14], [0.08, 0.86], [0.92, 0.84], [0.5, 0.04],
  ];
  const start = Math.floor(r() * spots.length);
  for (let i = 0; i < Math.min(4, others.length); i++) {
    const [sx, sy] = spots[(start + i) % spots.length];
    body += place(others[(i + variant) % others.length], (sx + (r() - 0.5) * 0.08) * w, (sy + (r() - 0.5) * 0.08) * h, unit * (0.13 + r() * 0.06));
  }
  body += place(focus, (0.5 + (r() - 0.5) * 0.16) * w, (0.54 + (r() - 0.5) * 0.1) * h, unit * 0.3);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><defs><filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${n(unit * 0.05)}"/></filter><filter id="blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter><filter id="sh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#000" flood-opacity="${pal.dark ? 0.55 : 0.24}"/></filter><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="1" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0"/></filter></defs><rect width="${w}" height="${h}" fill="${table}"/>${body}<rect width="${w}" height="${h}" filter="url(#grain)" opacity=".1"/></svg>`;
}

export function artDataUri(svg: string) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
