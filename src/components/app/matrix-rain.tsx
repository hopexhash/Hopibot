"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const STORAGE_KEY = "agencyos:matrix-rain";
const EVENT = "agencyos:matrix-rain-change";

/** Per-device preference (localStorage, guarded). Default: on. */
export function getRainEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}
export function setRainEnabled(on: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* storage unavailable — preference just won't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}
export function useRainEnabled() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(EVENT, cb);
      window.addEventListener("storage", cb);
      return () => {
        window.removeEventListener(EVENT, cb);
        window.removeEventListener("storage", cb);
      };
    },
    getRainEnabled,
    () => false,
  );
}

const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789ABCDEFZ:.=*+<>";

/**
 * Subtle Matrix digital rain. Deliberately low-key: sparse columns, low opacity, ~24 fps,
 * capped device-pixel ratio, paused when the tab is hidden, disabled for reduced motion.
 */
export function MatrixRain({
  className = "pointer-events-none fixed inset-0 z-0 opacity-[0.16]",
  density = 0.34,
  fontSize = 15,
}: {
  /** Glyph size in CSS pixels (larger for screens watched from a distance). */
  fontSize?: number;
  /** Positioning and strength of the layer. */
  className?: string;
  /** Share of columns raining at once. */
  density?: number;
} = {}) {
  const enabled = useRainEnabled();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isSmall = document.documentElement.clientWidth < 640;
    // On phones the content fills the whole screen, so stray glyphs show through the page
    // and read as a rendering glitch rather than as a backdrop.
    if (isSmall) return;
    const font = isSmall ? 13 : fontSize;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    type Drop = { x: number; y: number; speed: number; len: number; chars: string[]; active: boolean };
    let drops: Drop[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const glyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    const makeDrop = (x: number, initial: boolean): Drop => {
      const len = Math.floor(rand(8, 26));
      return {
        x,
        y: initial ? rand(-h, h) : rand(-h * 0.6, -len * font),
        speed: rand(0.6, 2.2) * (font / 15),
        len,
        chars: Array.from({ length: len }, glyph),
        // Only some columns rain at a time: keeps it sparse and readable.
        active: Math.random() < (isSmall ? 0.28 : density),
      };
    };
    const resize = () => {
      w = document.documentElement.clientWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / (font * 1.15));
      drops = Array.from({ length: cols }, (_, i) => makeDrop(i * font * 1.15, true));
    };
    resize();

    let raf = 0;
    let last = 0;
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (t - last < 1000 / 24) return;
      last = t;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${font}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";
      for (const d of drops) {
        if (!d.active) {
          if (Math.random() < 0.002) Object.assign(d, makeDrop(d.x, false), { active: true });
          continue;
        }
        d.y += d.speed;
        if (Math.random() < 0.04) d.chars[Math.floor(Math.random() * d.len)] = glyph();
        for (let i = 0; i < d.len; i++) {
          const cy = d.y - i * font;
          if (cy < -font || cy > h) continue;
          const fade = 1 - i / d.len;
          if (i === 0) {
            ctx.fillStyle = "rgba(200,255,220,0.9)";
            ctx.shadowColor = "rgba(0,255,120,0.8)";
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = `rgba(0,255,120,${(0.55 * fade).toFixed(3)})`;
            ctx.shadowBlur = 0;
          }
          ctx.fillText(d.chars[i], d.x, cy);
        }
        ctx.shadowBlur = 0;
        if (d.y - d.len * font > h) Object.assign(d, makeDrop(d.x, false));
      }
    };
    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    const onVis = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      ctx.clearRect(0, 0, w, h);
    };
  }, [enabled, density, fontSize]);

  if (!enabled) return null;
  return <canvas ref={ref} aria-hidden className={className} />;
}
