"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type MouseEvent as ReactMouseEvent } from "react";

/**
 * The "page not found" experience. Everything here is self-contained (no site engine, no
 * library): this view also renders outside every layout.
 *
 *  - The 404 is cut into horizontal slices that fly in and assemble on load, floats, tilts
 *    towards the pointer (or sways by itself on touch screens) and now and then slips a few
 *    slices for a moment.
 *  - Behind it: a faint grid, drifting particles on a small canvas, soft light and a few
 *    geometric shapes at different depths.
 *  - Pressing the 404 five times turns it into the HOPI wordmark for a few seconds.
 *  - "Take me home" and "Go back" close a curtain before they leave.
 * With reduced motion nothing moves and nothing is hidden.
 */
const DIGITS = ["4", "0", "4"];
const SLICES = 8;
const TAPS = 5;
const css = (vars: Record<string, string | number>) => vars as CSSProperties;

const subscribe = () => () => {};
/** The address that was asked for, known in the browser only. */
const usePath = () =>
  useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => "",
  );

export function NotFoundStage() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [taps, setTaps] = useState(0);
  const [logo, setLogo] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const eggTimer = useRef(0);
  const path = usePath();

  // Pointer: the stage leans towards it. The values ease towards the target and the loop
  // stops as soon as it has arrived, so an idle page costs nothing.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0,
      raf = 0;
    const frame = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      el.style.setProperty("--mx", x.toFixed(4));
      el.style.setProperty("--my", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.002 ? requestAnimationFrame(frame) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      el.classList.add("has-pointer");
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Particles: a few dozen slow points of light. Paused while the tab is hidden.
  useEffect(() => {
    const c = canvas.current;
    const el = root.current;
    const g = c?.getContext("2d");
    if (!c || !el || !g) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0,
      h = 0,
      raf = 0,
      last = 0;
    type P = { x: number; y: number; z: number; r: number; v: number; hot: boolean };
    let ps: P[] = [];
    const size = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      const n = Math.round(Math.min(70, Math.max(26, (w * h) / 26000)));
      ps = Array.from({ length: n }, (_, i) => {
        const z = 0.25 + Math.random() * 0.75;
        return { x: Math.random() * w, y: Math.random() * h, z, r: 0.6 + z * 1.5, v: 4 + z * 12, hot: i % 9 === 0 };
      });
    };
    const draw = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0);
      last = t;
      const mx = parseFloat(el.style.getPropertyValue("--mx")) || 0;
      const my = parseFloat(el.style.getPropertyValue("--my")) || 0;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y -= p.v * dt;
        p.x += Math.sin((t / 1000) * 0.3 + p.z * 9) * 4 * dt;
        if (p.y < -6) {
          p.y = h + 6;
          p.x = Math.random() * w;
        }
        g.globalAlpha = (p.hot ? 0.85 : 0.5) * p.z;
        g.fillStyle = p.hot ? "#ff4d23" : "#f2eee6";
        g.beginPath();
        g.arc(p.x - mx * 26 * p.z, p.y - my * 18 * p.z, p.r, 0, Math.PI * 2);
        g.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };
    const onVisible = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    const ro = new ResizeObserver(() => {
      size();
      if (reduce) start();
    });
    size();
    start();
    ro.observe(el);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  // A page restored from the browser's back/forward cache must not come back behind the curtain.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => e.persisted && setLeaving(false);
    window.addEventListener("pageshow", onShow);
    return () => {
      window.removeEventListener("pageshow", onShow);
      window.clearTimeout(eggTimer.current);
    };
  }, []);

  // Buttons lean towards the pointer.
  const magnet = (e: ReactMouseEvent<HTMLElement>) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    b.style.setProperty("--bx", `${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px`);
    b.style.setProperty("--by", `${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px`);
  };
  const release = (e: ReactMouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--bx", "0px");
    e.currentTarget.style.setProperty("--by", "0px");
  };

  // Leaving: the curtain closes first. The homepage then opens the same curtain (see the
  // boot script of the site layout), so it reads as one movement.
  const leave = (go: () => void) => (e: ReactMouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (leaving) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return go();
    setLeaving(true);
    window.setTimeout(go, 620);
  };
  const home = () => {
    try {
      window.sessionStorage.setItem("hopi-pt", "1");
    } catch {}
    window.location.assign("/");
  };
  const back = () => {
    // Opened directly (nothing of this website to go back to): home is the best "back" there is.
    // Browsers that can say whether an earlier page of this site exists are asked; the others
    // fall back to the length of the history.
    const nav = (window as Window & { navigation?: { canGoBack?: boolean } }).navigation;
    const can = typeof nav?.canGoBack === "boolean" ? nav.canGoBack : window.history.length > 1;
    if (can) window.history.back();
    else home();
  };

  const tap = () => {
    if (logo) return;
    const n = taps + 1;
    if (n < TAPS) return setTaps(n);
    setTaps(0);
    setLogo(true);
    window.clearTimeout(eggTimer.current);
    eggTimer.current = window.setTimeout(() => setLogo(false), 5200);
  };

  /* eslint-disable @next/next/no-html-link-for-pages -- plain links: this page also renders outside every layout */
  return (
    <div ref={root} className={`nf-stage${logo ? " is-logo" : ""}${leaving ? " is-leaving" : ""}`} data-taps={taps}>
      <div className="nf-bg" aria-hidden="true">
        <i className="nf-light nf-light-a" />
        <i className="nf-light nf-light-b" />
        <i className="nf-grid" />
        <canvas ref={canvas} className="nf-dots" />
        <i className="nf-shape nf-ring" />
        <i className="nf-shape nf-plus" />
        <i className="nf-shape nf-square" />
        <i className="nf-shape nf-dot" />
        <i className="nf-shape nf-line" />
        <i className="nf-noise" />
      </div>

      <header className="nf-top">
        <a href="/" className="nf-logo" aria-label="HOPI, naar de homepage" onClick={leave(home)}>
          HOPI<span>.</span>
        </a>
        <p className="nf-mono">
          <span>Error 404</span> Page not found
        </p>
      </header>

      <main className="nf-main" lang="en">
        <div className="nf-center">
          <div className="nf-sway">
            <div className="nf-tilt">
              <button type="button" className="nf-404" onClick={tap} aria-label="404. Press a few times for a surprise.">
                <span className="nf-glow" aria-hidden="true">
                  404
                </span>
                {DIGITS.map((d, i) => (
                  <span key={i} className="nf-d" style={css({ "--i": i })} aria-hidden="true">
                    <span className="nf-float">
                      <span className="nf-depth">{d}</span>
                      {Array.from({ length: SLICES }, (_, s) => (
                        <span key={s} className="nf-s" style={css({ "--s": s, "--n": SLICES })}>
                          {d}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </button>
              <p className="nf-word" aria-hidden="true">
                HOPI<span>.</span>
              </p>
            </div>
          </div>
          <p className="nf-egg" role="status" aria-live="polite">
            {logo ? "Okay, you found something. Unfortunately, not the page you wanted." : ""}
          </p>
        </div>

        <div className="nf-copy">
          <p className="nf-mono nf-label">
            <span>(404)</span> Lost, but in good company
          </p>
          <h1>
            Oops. Even <em>we</em> couldn’t find this one.
          </h1>
          <p className="nf-text">We searched everywhere, checked twice and even looked behind the sofa. No luck. Looks like this page went on vacation.</p>
          <div className="nf-actions">
            <a href="/" className="nf-btn nf-btn-fill" onClick={leave(home)} onMouseMove={magnet} onMouseLeave={release}>
              <span>Take me home</span>
              <i aria-hidden="true">
                <ArrowRight />
                <ArrowRight />
              </i>
            </a>
            <a href="/" className="nf-btn nf-btn-line" onClick={leave(back)} onMouseMove={magnet} onMouseLeave={release}>
              <i aria-hidden="true">
                <ArrowLeft />
                <ArrowLeft />
              </i>
              <span>Go back</span>
            </a>
          </div>
        </div>
      </main>

      <footer className="nf-foot nf-mono">
        <p>
          <span>Requested</span> <b>{path || "/…"}</b>
        </p>
        <nav aria-label="Verder kijken">
          <a href="/werk">Werk</a>
          <a href="/prijzen">Prijzen</a>
          <a href="/#contact">Contact</a>
        </nav>
      </footer>

      <div className="nf-curtain" aria-hidden="true">
        <i />
        <i />
      </div>
    </div>
  );
  /* eslint-enable @next/next/no-html-link-for-pages */
}
