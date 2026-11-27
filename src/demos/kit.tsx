"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

/**
 * What every demo website shares, and nothing about how it looks:
 *  - DemoShell: the scroll behaviour (elements with data-rv get the class "in" when they come
 *    into view, elements with data-px get --p from -1 to 1 while they cross the screen, the
 *    root gets "is-scrolled" after the first 40px) and the floating HOPI bar.
 *  - DemoForm: a form that never sends anything and says so.
 *  - useMenu: open/close state for a mobile menu or drawer, with Escape and scroll lock.
 * Each demo brings its own markup, type, colours and motion.
 */
export function DemoShell({ slug, name, className, children }: { slug: string; name: string; className: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rv = [...el.querySelectorAll<HTMLElement>("[data-rv]")];
    if (reduce || !("IntersectionObserver" in window)) rv.forEach((n) => n.classList.add("in"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    if (!reduce) rv.forEach((n) => io.observe(n));

    // Parallax: only elements near the screen are tracked.
    const near = new Set<HTMLElement>();
    const px = reduce ? [] : [...el.querySelectorAll<HTMLElement>("[data-px]")];
    const pio = new IntersectionObserver((entries) => entries.forEach((e) => (e.isIntersecting ? near.add(e.target as HTMLElement) : near.delete(e.target as HTMLElement))), { rootMargin: "20% 0px" });
    px.forEach((n) => pio.observe(n));
    let raf = 0;
    let scrolled = false;
    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      const s = window.scrollY > 40;
      if (s !== scrolled) {
        scrolled = s;
        el.classList.toggle("is-scrolled", s);
      }
      near.forEach((n) => {
        const r = n.getBoundingClientRect();
        const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        n.style.setProperty("--p", Math.max(-1, Math.min(1, p)).toFixed(3));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      pio.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div ref={root} className={`demo ${className}`}>
      {children}
      <DemoBar slug={slug} name={name} />
    </div>
  );
}

/**
 * The way back to HOPI. It also says what this page is: a design for a business that does not
 * exist. It can be folded away so it never stands between a visitor and the design.
 */
function DemoBar({ slug, name }: { slug: string; name: string }) {
  const [small, setSmall] = useState(false);
  if (small) {
    return (
      <button type="button" className="demo-bar demo-bar-min" onClick={() => setSmall(false)} aria-label="Toon de HOPI-balk">
        <b>HOPI</b>
        <i aria-hidden="true" />
      </button>
    );
  }
  return (
    <aside className="demo-bar" aria-label="Over deze demo">
      <a href={`/werk/${slug}`} className="demo-bar-back">
        <span aria-hidden="true">←</span> <b>HOPI</b>
        <i aria-hidden="true" />
        <em>portfolio</em>
      </a>
      <p>
        <strong>Demo-ontwerp</strong>
        <span> · {name} is een fictief bedrijf</span>
      </p>
      <a href={`/werk/${slug}#contact`} className="demo-bar-get">
        Dit wil ik ook <span aria-hidden="true">→</span>
      </a>
      <button type="button" className="demo-bar-x" onClick={() => setSmall(true)} aria-label="Verberg deze balk">
        ×
      </button>
    </aside>
  );
}

/**
 * A form inside a demo. Nothing is sent or stored; after "sending", the visitor is told so.
 * `done` replaces the default confirmation text.
 */
export function DemoForm({ className, children, done }: { className?: string; children: ReactNode; done?: string }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <form className={className} onSubmit={submit} noValidate={false}>
      {children}
      <p className="demo-form-note" role="status" aria-live="polite" data-sent={sent || undefined}>
        {sent ? (done ?? "Zo zou het werken. Dit is een demo-ontwerp van HOPI: er is niets verzonden.") : "Demo: dit formulier verstuurt niets."}
      </p>
    </form>
  );
}

/** Open/close state for a menu, drawer or dialog: Escape closes it and the page behind it stays put. */
export function useMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = before;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return { open, setOpen, toggle: () => setOpen((o) => !o), close: () => setOpen(false) };
}
