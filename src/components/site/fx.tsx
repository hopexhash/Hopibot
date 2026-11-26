"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { fxState, type Scroller } from "./fx-state";

/** What the transition curtain shows while the next page loads. */
const LABELS: Record<string, string> = {
  "/": "HOPI",
  "/werk": "Werk",
  "/prijzen": "Prijzen",
  "/blog": "Blog",
  "/website-laten-maken": "Websites",
  "/website-redesign": "Redesign",
  "/website-onderhoud": "Onderhoud",
};

/**
 * The site's motion engine. One animation frame loop drives everything that needs the
 * browser; the look of each effect lives in CSS and reads the values set here:
 *
 *  - smooth scrolling (mouse and trackpad only; touch keeps the phone's own scrolling);
 *  - `[data-in]` gets `.is-in` when it scrolls into view (text masks, clipped images);
 *  - `[data-p]` gets `--p`, its progress through the screen from 0 to 1 (`data-p="pin"`:
 *    progress through a pinned section), used for parallax, scrubbed type and the
 *    sideways-scrolling work section (`[data-hscroll]`);
 *  - `[data-steps]` gets `data-step`, the item currently being read;
 *  - a cursor follower that grows over links and shows a word over `[data-cursor]`,
 *    a floating picture for `[data-peek]`, and buttons that lean towards the pointer
 *    (`[data-magnetic]`). The real cursor stays, clicks are never intercepted for these;
 *  - a curtain between pages: it closes, the next page loads behind it, it opens.
 *
 * With "reduce motion" none of this runs: pages are plain, complete and navigate normally.
 */
export function Fx() {
  const pathname = usePathname();
  const router = useRouter();
  const cur = useRef<HTMLDivElement>(null);
  const curLabel = useRef<HTMLSpanElement>(null);
  const peek = useRef<HTMLDivElement>(null);
  const peekImg = useRef<HTMLDivElement>(null);
  const ptLabel = useRef<HTMLSpanElement>(null);
  const state = useRef({ pending: false, busy: false, timer: 0, rescan: () => {}, finish: () => {} });

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const s = state.current;
    let alive = true;
    let scroller: Scroller | null = null;
    root.classList.add("fx");
    if (fine && !reduce) {
      root.classList.add("fx-fine");
      import("lenis").then(({ default: Lenis }) => {
        if (!alive) return;
        scroller = new Lenis({ lerp: 0.115, wheelMultiplier: 1, autoRaf: false }) as unknown as Scroller;
        fxState.scroller = scroller;
      });
    }

    // ── Elements entering the screen
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );

    // ── Scroll progress
    type P = { el: HTMLElement; pin: boolean; last: number };
    type S = { el: HTMLElement; items: HTMLElement[]; last: number };
    let ps: P[] = [];
    let steps: S[] = [];
    let dirty = true;
    let lastY = -1;

    let vw0 = window.innerWidth;
    const setVh = (force: boolean) => {
      // On phones the height changes whenever the browser bar slides in or out; following it
      // would resize the hero mid-scroll. Rotating the phone changes the width, so that counts.
      if (!force && !fine && window.innerWidth === vw0) return;
      vw0 = window.innerWidth;
      root.style.setProperty("--vh0", `${window.innerHeight}px`);
    };
    const measure = () => {
      setVh(false);
      const wide = fine && !reduce && window.innerWidth >= 1000;
      document.querySelectorAll<HTMLElement>("[data-hscroll]").forEach((sec) => {
        const track = sec.querySelector<HTMLElement>("[data-hscroll-track]");
        if (!track) return;
        if (wide) {
          sec.dataset.hs = "on";
          sec.style.setProperty("--travel", `${Math.max(0, track.scrollWidth - window.innerWidth)}px`);
        } else {
          delete sec.dataset.hs;
          sec.style.removeProperty("--travel");
        }
      });
      scroller?.resize();
      dirty = true;
    };

    s.rescan = () => {
      document.querySelectorAll("[data-in]:not(.is-in)").forEach((el) => (reduce ? el.classList.add("is-in") : io.observe(el)));
      ps = reduce ? [] : [...document.querySelectorAll<HTMLElement>("[data-p]")].map((el) => ({ el, pin: el.dataset.p === "pin", last: -1 }));
      steps = [...document.querySelectorAll<HTMLElement>("[data-steps]")].map((el) => ({ el, items: [...el.querySelectorAll<HTMLElement>("[data-step-item]")], last: -1 }));
      measure();
    };

    let pulled = false;
    const update = () => {
      const y = window.scrollY;
      // Pulled past the top (rubber-band): wake the character behind the page.
      if (y < -1 !== pulled) {
        pulled = y < -1;
        root.classList.toggle("is-pull", pulled);
      }
      if (!dirty && y === lastY) return;
      lastY = y;
      dirty = false;
      const vh = window.innerHeight;
      for (const it of ps) {
        const r = it.el.getBoundingClientRect();
        let p = it.pin ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / (vh + r.height);
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        if (Math.abs(p - it.last) > 0.0004) {
          it.last = p;
          it.el.style.setProperty("--p", p.toFixed(4));
        }
      }
      for (const st of steps) {
        let idx = 0;
        st.items.forEach((item, i) => {
          if (item.getBoundingClientRect().top < vh * 0.58) idx = i;
        });
        if (idx !== st.last) {
          st.last = idx;
          st.el.dataset.step = String(idx);
          st.items.forEach((item, i) => item.classList.toggle("is-on", i === idx));
        }
      }
    };

    // ── Pointer: follower, floating picture, magnetic buttons
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let px = 0;
    let py = 0;
    let seen = false;
    let mag: HTMLElement | null = null;
    let magX = 0;
    let magY = 0;
    const releaseMag = () => {
      if (!mag) return;
      mag.style.setProperty("--mx", "0px");
      mag.style.setProperty("--my", "0px");
      mag = null;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      mx = e.clientX;
      my = e.clientY;
      if (!seen) {
        seen = true;
        cx = px = mx;
        cy = py = my;
        root.classList.add("cur-on");
      }
      if (mag) {
        const k = Number(mag.dataset.magnetic) || 0.32;
        mag.style.setProperty("--mx", `${((mx - magX) * k).toFixed(1)}px`);
        mag.style.setProperty("--my", `${((my - magY) * k).toFixed(1)}px`);
      }
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target;
      if (!(t instanceof Element) || e.pointerType === "touch") return;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a,button,summary,label,select,[role='tab']");
      cur.current?.classList.toggle("is-label", Boolean(labelled));
      cur.current?.classList.toggle("is-link", !labelled && Boolean(link));
      if (labelled && curLabel.current) curLabel.current.textContent = labelled.dataset.cursor ?? "";
      const pk = t.closest<HTMLElement>("[data-peek]");
      if (pk && peekImg.current && peek.current) {
        if (peekImg.current.dataset.src !== pk.dataset.peek) {
          peekImg.current.dataset.src = pk.dataset.peek;
          peekImg.current.style.backgroundImage = `url("${pk.dataset.peek}")`;
        }
        peek.current.classList.add("is-on");
      } else peek.current?.classList.remove("is-on");
      const m = t.closest<HTMLElement>("[data-magnetic]");
      if (m !== mag) {
        releaseMag();
        if (m) {
          const r = m.getBoundingClientRect();
          magX = r.left + r.width / 2;
          magY = r.top + r.height / 2;
          mag = m;
        }
      }
    };
    const onLeaveWindow = () => {
      root.classList.remove("cur-on");
      seen = false;
      releaseMag();
      peek.current?.classList.remove("is-on");
    };
    const onDown = () => cur.current?.classList.add("is-down");
    const onUp = () => cur.current?.classList.remove("is-down");

    let raf = 0;
    const tick = (time: number) => {
      if (!alive) return;
      scroller?.raf(time);
      update();
      if (seen && cur.current) {
        cx += (mx - cx) * 0.24;
        cy += (my - cy) * 0.24;
        px += (mx - px) * 0.11;
        py += (my - py) * 0.11;
        cur.current.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
        if (peek.current) {
          const lean = Math.max(-9, Math.min(9, (mx - px) * 0.07));
          peek.current.style.transform = `translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,0) rotate(${lean.toFixed(2)}deg)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    // ── Links: smooth jumps inside a page, a curtain between pages
    const scrollToEl = (el: HTMLElement) => {
      if (scroller) scroller.scrollTo(el, { offset: 0, duration: 1.25 });
      else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };
    s.finish = () => {
      window.clearTimeout(s.timer);
      root.classList.add("pt-reveal");
      root.classList.remove("pt-cover");
      window.setTimeout(() => {
        root.classList.remove("pt-reveal");
        s.busy = false;
      }, 820);
    };
    const go = (href: string, label: string) => {
      if (s.busy) return;
      s.busy = true;
      if (ptLabel.current) ptLabel.current.textContent = label;
      root.classList.add("pt-cover");
      router.prefetch(href);
      window.setTimeout(() => {
        s.pending = true;
        router.push(href);
        // Never leave the curtain closed if a page fails to arrive.
        s.timer = window.setTimeout(() => {
          s.pending = false;
          s.finish();
        }, 6000);
      }, 600);
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target instanceof Element ? e.target.closest("a") : null;
      const href = a?.getAttribute("href");
      if (!a || !href || a.target === "_blank" || a.hasAttribute("download")) return;
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || /^\/(site|api|p|d|u)\//.test(url.pathname)) return;
      // The wordmark starts the website over: a real page load of the homepage, at the top,
      // with its opening animation, from wherever you are (also from the homepage itself).
      if (a.dataset.home !== undefined) {
        e.preventDefault();
        if (s.busy) return;
        s.busy = true;
        const fresh = () => {
          try {
            window.history.scrollRestoration = "manual"; // a reload would otherwise return to the old position
          } catch {}
          window.scrollTo({ top: 0, behavior: "instant" });
          if (window.location.pathname === "/") {
            window.history.replaceState(null, "", "/");
            window.location.reload();
          } else window.location.assign("/");
        };
        if (reduce) return fresh();
        if (ptLabel.current) ptLabel.current.textContent = "HOPI";
        root.classList.add("pt-cover");
        window.setTimeout(fresh, 620);
        return;
      }
      // "Start a project" goes to the request form of the page you are on, when it has one.
      const here = url.pathname === "/" && url.hash === "#contact" && document.getElementById("contact");
      if (here || url.pathname === window.location.pathname) {
        if (!here && url.search !== window.location.search) return; // e.g. choosing a package: the router handles it
        e.preventDefault();
        const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
        if (url.hash && target) {
          window.history.pushState(null, "", url.hash);
          // From the open menu: wait until it has released the page before scrolling.
          if (root.classList.contains("menu-open")) window.setTimeout(() => scrollToEl(target), 160);
          else scrollToEl(target);
        } else if (scroller) scroller.scrollTo(0, { duration: 1.2 });
        else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        return;
      }
      if (reduce) return;
      e.preventDefault();
      const text = (a.dataset.pt ?? LABELS[url.pathname] ?? a.textContent ?? "").replace(/\s+/g, " ").trim();
      go(url.pathname + url.search + url.hash, text.length > 0 && text.length <= 22 ? text : "HOPI");
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 120);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    window.addEventListener("resize", onResize);
    document.addEventListener("click", onClick, true);
    if (fine && !reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.addEventListener("pointerdown", onDown, { passive: true });
      document.addEventListener("pointerup", onUp, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    }
    s.rescan();
    // Opened through a link to a section (/#contact): the sideways work section has just been
    // given its full height, which moved everything below it. Go to the section again.
    if (window.location.hash) {
      const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "instant", block: "start" }));
    }
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      window.clearTimeout(s.timer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      scroller?.destroy();
      fxState.scroller = null;
      root.classList.remove("fx-fine", "cur-on", "pt-cover", "pt-reveal", "is-pull");
    };
  }, [router]);

  // A new page has arrived: wire up its elements and open the curtain.
  useEffect(() => {
    const s = state.current;
    s.rescan();
    requestAnimationFrame(() => fxState.scroller?.scrollTo(window.scrollY, { immediate: true, force: true }));
    if (!s.pending) return;
    s.pending = false;
    requestAnimationFrame(() => requestAnimationFrame(() => s.finish()));
  }, [pathname]);

  return (
    <>
      <div className="cur" ref={cur} aria-hidden="true">
        <span ref={curLabel} />
      </div>
      <div className="peek" ref={peek} aria-hidden="true">
        <div ref={peekImg} />
      </div>
      <div className="pt" aria-hidden="true">
        <i />
        <i />
        <b>
          <span ref={ptLabel}>HOPI</span>
        </b>
      </div>
    </>
  );
}
