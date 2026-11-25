/** Colour maths shared by the design registry and the theme. */
const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgbToHex = (r: number[]) => `#${r.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`;

export function mix(a: string, b: string, t: number) {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  return rgbToHex(x.map((v, i) => v + (y[i] - v) * t));
}

function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Darkens/lightens `fg` until it reaches the WCAG AA ratio against `bg`. */
export function ensureContrast(fg: string, bg: string, ratio = 4.5) {
  let c = fg;
  const towards = luminance(bg) > 0.4 ? "#000000" : "#ffffff";
  for (let i = 0; i < 20 && contrast(c, bg) < ratio; i++) c = mix(c, towards, 0.1);
  return c;
}
