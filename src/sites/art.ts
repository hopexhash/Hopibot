import type { TemplateKey } from "@/lib/site-spec";

/**
 * Generated, licence-free artwork. Each design system has its own motif so previews look
 * finished without using any photography we have no rights to. Deterministic per seed.
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

const MOTIFS: Record<TemplateKey, (r: () => number, c: Colors, w: number, h: number) => string> = {
  restaurant: (r, c, w, h) => {
    // Overhead table: plates, glasses and warm bokeh.
    let s = "";
    for (let i = 0; i < 14; i++) s += `<circle cx="${r() * w}" cy="${r() * h}" r="${20 + r() * 70}" fill="${c.accent}" opacity="${0.05 + r() * 0.12}" filter="url(#blur)"/>`;
    const plates = [
      [0.32, 0.42, 0.2],
      [0.7, 0.62, 0.17],
      [0.66, 0.24, 0.1],
    ];
    for (const [x, y, rr] of plates) {
      const R = rr * w;
      s += `<circle cx="${x * w}" cy="${y * h}" r="${R}" fill="${mix(c.bg, "#ffffff", 0.08)}" stroke="${c.accent}" stroke-opacity=".35" stroke-width="2"/>`;
      s += `<circle cx="${x * w}" cy="${y * h}" r="${R * 0.72}" fill="none" stroke="${c.accent}" stroke-opacity=".25"/>`;
      s += `<circle cx="${x * w}" cy="${y * h}" r="${R * 0.45}" fill="${c.accent}" opacity=".18"/>`;
    }
    s += `<path d="M${0.12 * w} ${0.8 * h} q ${0.05 * w} -${0.1 * h} 0 -${0.2 * h} t 0 -${0.2 * h}" stroke="${c.accent}" stroke-opacity=".4" stroke-width="2" fill="none"/>`;
    return s;
  },
  dental: (r, c, w, h) => {
    let s = "";
    for (let i = 0; i < 6; i++) s += `<circle cx="${r() * w}" cy="${r() * h}" r="${60 + r() * 140}" fill="${i % 2 ? c.accent : c.primary}" opacity="${0.12 + r() * 0.12}" filter="url(#blur)"/>`;
    const cx = w / 2;
    const cy = h / 2;
    const k = Math.min(w, h) / 950;
    s += `<g transform="translate(${cx - 110 * k} ${cy - 130 * k}) scale(${k})" fill="#ffffff" fill-opacity=".92" stroke="${c.primary}" stroke-opacity=".25" stroke-width="3">
      <path d="M110 10c-30 0-48 14-70 14C15 24 0 48 0 84c0 52 22 82 34 128 9 36 16 54 32 54 22 0 18-70 44-70s22 70 44 70c16 0 23-18 32-54 12-46 34-76 34-128 0-36-15-60-40-60-22 0-40-14-70-14z"/></g>`;
    s += `<circle cx="${cx + 120 * k}" cy="${cy - 110 * k}" r="${14 * k}" fill="#fff" opacity=".9"/><circle cx="${cx + 150 * k}" cy="${cy - 70 * k}" r="${7 * k}" fill="#fff" opacity=".8"/>`;
    return s;
  },
  construction: (r, c, w, h) => {
    let s = `<g stroke="#ffffff" stroke-opacity=".08">`;
    for (let x = 0; x < w; x += 40) s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
    for (let y = 0; y < h; y += 40) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
    s += `</g>`;
    // Isometric blocks
    const block = (x: number, y: number, sz: number, op: number) =>
      `<g opacity="${op}"><path d="M${x} ${y} l${sz} ${-sz / 2} l${sz} ${sz / 2} l${-sz} ${sz / 2}z" fill="${mix(c.accent, "#ffffff", 0.2)}"/><path d="M${x} ${y} l${sz} ${sz / 2} v${sz} l${-sz} ${-sz / 2}z" fill="${c.accent}"/><path d="M${x + sz} ${y + sz / 2} l${sz} ${-sz / 2} v${sz} l${-sz} ${sz / 2}z" fill="${mix(c.accent, "#000000", 0.35)}"/></g>`;
    const base = Math.min(w, h) / 10;
    for (let i = 0; i < 9; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      s += block(w * 0.28 + col * base - row * base, h * 0.32 + row * base * 0.5 + col * base * 0.5 - (i === 4 ? base : 0), base, 0.55 + r() * 0.45);
    }
    s += `<path d="M${w * 0.1} ${h * 0.9} L${w * 0.9} ${h * 0.9}" stroke="${c.accent}" stroke-width="6" stroke-dasharray="26 14"/>`;
    return s;
  },
  automotive: (r, c, w, h) => {
    let s = "";
    for (let i = 0; i < 26; i++) {
      const y = r() * h;
      const len = 80 + r() * 380;
      const x = r() * w;
      s += `<line x1="${x}" y1="${y}" x2="${x + len}" y2="${y - len * 0.18}" stroke="${i % 4 ? "#ffffff" : c.accent}" stroke-opacity="${0.06 + r() * 0.3}" stroke-width="${1 + r() * 3}" stroke-linecap="round"/>`;
    }
    const cx = w * 0.62;
    const cy = h * 0.56;
    const R = Math.min(w, h) * 0.26;
    s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#ffffff" stroke-opacity=".18" stroke-width="${R * 0.18}"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R * 0.62}" fill="none" stroke="${c.accent}" stroke-opacity=".8" stroke-width="3"/>`;
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      s += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a) * R * 0.6}" y2="${cy + Math.sin(a) * R * 0.6}" stroke="#ffffff" stroke-opacity=".35" stroke-width="6" stroke-linecap="round"/>`;
    }
    s += `<circle cx="${cx}" cy="${cy}" r="${R * 0.14}" fill="${c.accent}"/>`;
    return s;
  },
  beauty: (r, c, w, h) => {
    let s = "";
    for (let i = 0; i < 7; i++) s += `<circle cx="${r() * w}" cy="${r() * h}" r="${70 + r() * 150}" fill="${i % 2 ? c.accent : "#ffffff"}" opacity="${0.2 + r() * 0.2}" filter="url(#blur)"/>`;
    const cx = w / 2;
    const cy = h / 2;
    const k = Math.min(w, h) / 820;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * 360;
      s += `<ellipse cx="${cx}" cy="${cy - 80 * k}" rx="${42 * k}" ry="${92 * k}" transform="rotate(${a} ${cx} ${cy})" fill="${i % 2 ? c.accent : "#ffffff"}" fill-opacity=".55" stroke="${c.primary}" stroke-opacity=".15"/>`;
    }
    s += `<circle cx="${cx}" cy="${cy}" r="${30 * k}" fill="${c.primary}" opacity=".55"/>`;
    s += `<path d="M${w * 0.08} ${h * 0.95} Q ${w * 0.08} ${h * 0.55} ${w * 0.3} ${h * 0.55} T ${w * 0.52} ${h * 0.95}" fill="none" stroke="#ffffff" stroke-opacity=".6" stroke-width="2"/>`;
    return s;
  },
  realestate: (r, c, w, h) => {
    let s = "";
    for (let i = 0; i < 4; i++) s += `<circle cx="${r() * w}" cy="${r() * h * 0.6}" r="${80 + r() * 160}" fill="${c.accent}" opacity=".12" filter="url(#blur)"/>`;
    // Skyline
    let x = 0;
    let path = `M0 ${h}`;
    while (x < w) {
      const bw = 40 + r() * 90;
      const bh = h * (0.25 + r() * 0.5);
      path += ` L${x} ${h - bh} L${x + bw} ${h - bh}`;
      if (r() > 0.6) path += ` L${x + bw / 2} ${h - bh - 40}`;
      x += bw;
    }
    path += ` L${w} ${h} Z`;
    s += `<path d="${path}" fill="#ffffff" fill-opacity=".07" stroke="${c.accent}" stroke-opacity=".55" stroke-width="1.5"/>`;
    for (let i = 0; i < 60; i++) s += `<rect x="${r() * w}" y="${h * 0.45 + r() * h * 0.5}" width="6" height="9" fill="${c.accent}" opacity="${0.15 + r() * 0.5}"/>`;
    const k = Math.min(w, h) / 900;
    s += `<g transform="translate(${w * 0.5 - 90 * k} ${h * 0.22}) scale(${k})" fill="none" stroke="${c.accent}" stroke-width="5"><path d="M0 90 L90 10 L180 90"/><path d="M25 70 V180 H155 V70"/><rect x="72" y="115" width="36" height="65"/></g>`;
    return s;
  },
  corporate: (r, c, w, h) => {
    let s = "";
    for (let i = 0; i < 6; i++) s += `<circle cx="${r() * w}" cy="${r() * h}" r="${90 + r() * 180}" fill="${i % 2 ? c.accent : "#ffffff"}" opacity="${0.12 + r() * 0.18}" filter="url(#blur)"/>`;
    s += `<g stroke="#ffffff" stroke-opacity=".12">`;
    for (let x = 0; x < w; x += 48) s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
    for (let y = 0; y < h; y += 48) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
    s += `</g>`;
    const bars = 7;
    const bw = w / (bars * 2.2);
    for (let i = 0; i < bars; i++) {
      const bh = h * (0.18 + (i / bars) * 0.5 + r() * 0.08);
      s += `<rect x="${w * 0.18 + i * bw * 1.6}" y="${h * 0.86 - bh}" width="${bw}" height="${bh}" rx="${bw / 4}" fill="#ffffff" fill-opacity="${0.18 + i * 0.08}"/>`;
    }
    s += `<path d="M${w * 0.16} ${h * 0.62} C ${w * 0.4} ${h * 0.6}, ${w * 0.55} ${h * 0.35}, ${w * 0.86} ${h * 0.2}" stroke="${c.accent}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    return s;
  },
  service: (r, c, w, h) => {
    let s = "";
    for (let i = 0; i < 6; i++) s += `<circle cx="${r() * w}" cy="${r() * h}" r="${80 + r() * 150}" fill="${i % 2 ? c.accent : "#ffffff"}" opacity="${0.12 + r() * 0.16}" filter="url(#blur)"/>`;
    const k = Math.min(w, h) / 820;
    s += `<g transform="translate(${w / 2 - 150 * k} ${h / 2 - 140 * k}) scale(${k})">
      <path d="M20 140 L150 30 L280 140 V280 H20 Z" fill="#ffffff" fill-opacity=".14" stroke="#ffffff" stroke-opacity=".7" stroke-width="5" stroke-linejoin="round"/>
      <rect x="115" y="180" width="70" height="100" rx="6" fill="${c.accent}" fill-opacity=".85"/>
      <rect x="55" y="160" width="40" height="40" rx="4" fill="#ffffff" fill-opacity=".5"/><rect x="205" y="160" width="40" height="40" rx="4" fill="#ffffff" fill-opacity=".5"/>
      <circle cx="270" cy="60" r="34" fill="${c.accent}" fill-opacity=".9"/><path d="M256 60 l10 10 l18 -20" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    return s;
  },
};

type Colors = { primary: string; accent: string; bg: string };

export function generateArt(template: TemplateKey, colors: { primary: string; accent: string }, seedKey: string, variant = 0, w = 1200, h = 1000) {
  const r = rng(hashString(`${seedKey}:${variant}`));
  const dark = mix(colors.primary, "#000000", 0.35);
  const c: Colors = { ...colors, bg: dark };
  const angle = Math.round(r() * 360);
  const body = MOTIFS[template](r, c, w, h);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" gradientTransform="rotate(${angle} .5 .5)"><stop offset="0" stop-color="${mix(colors.primary, "#000000", 0.15)}"/><stop offset=".6" stop-color="${dark}"/><stop offset="1" stop-color="${mix(colors.accent, colors.primary, 0.55)}"/></linearGradient><filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter></defs><rect width="${w}" height="${h}" fill="url(#g)"/>${body}</svg>`;
}

export function artDataUri(svg: string) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
