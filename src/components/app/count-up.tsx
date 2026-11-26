"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Splits "€ 1.234,50" / "$12.40" / "87%" / "1,204" into what surrounds the number and the number itself. */
function parse(text: string) {
  const m = /^(\D*?)(-?\d[\d.,\s]*\d|-?\d)(\D*)$/.exec(text.trim());
  if (!m) return null;
  const raw = m[2];
  const lastDot = raw.lastIndexOf(".");
  const lastComma = raw.lastIndexOf(",");
  const sepIdx = Math.max(lastDot, lastComma);
  let decimals = 0;
  let decimalSep = "";
  // A final group of 1–2 digits after a separator is a fraction; three digits is a thousands group.
  if (sepIdx >= 0) {
    const tail = raw.length - sepIdx - 1;
    const onlyOne = (raw.match(/[.,]/g) ?? []).length === 1;
    if (tail <= 2 || (!onlyOne && lastDot >= 0 && lastComma >= 0 && tail !== 3)) {
      decimals = tail;
      decimalSep = raw[sepIdx];
    }
  }
  const groupSep = decimalSep === "," ? "." : decimalSep === "." ? "," : raw.includes(",") ? "," : raw.includes(".") ? "." : raw.includes(" ") ? " " : "";
  const digits = decimals ? raw.slice(0, sepIdx).replace(/\D/g, "") + "." + raw.slice(sepIdx + 1) : raw.replace(/[^\d-]/g, "");
  const value = Number(digits);
  if (!Number.isFinite(value)) return null;
  const format = (n: number) => {
    const fixed = Math.abs(n).toFixed(decimals);
    const [int, frac] = fixed.split(".");
    const grouped = groupSep ? int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSep) : int;
    return `${n < 0 ? "-" : ""}${grouped}${decimals ? decimalSep + frac : ""}`;
  };
  return { prefix: m[1], suffix: m[3], value, format };
}

/**
 * Counts a real figure up to its value the first time it is seen. The server renders the
 * final figure, so it is correct without JavaScript and for screen readers; only the
 * visible digits animate, in the figure's own notation. Values that are not a plain
 * number are shown as they are.
 */
export function CountUp({ value, duration = 700 }: { value: string | number; duration?: number }) {
  const text = String(value);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    const p = parse(text);
    if (!el || !p || p.value === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // A figure that changes after the first count (live data) just updates: counting again would be noise.
    if (done.current) {
      el.textContent = text;
      return;
    }
    const show = (n: number) => {
      el.textContent = `${p.prefix}${p.format(n)}${p.suffix}`;
    };
    show(0);
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // Decelerating curve, the same family as the rest of the interface.
        const eased = 1 - Math.pow(1 - t, 4);
        show(p.value * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
        else {
          el.textContent = text;
          done.current = true;
        }
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text, duration]);

  return (
    <span ref={ref}>
      {text}
    </span>
  );
}
