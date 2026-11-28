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
  "/over-ons": "Over ons",
  "/contact": "Contact",
  "/en": "HOPI",
  "/en/work": "Work",
  "/en/pricing": "Pricing",
  "/en/blog": "Blog",
  "/en/website-design": "Websites",
  "/en/website-redesign": "Redesign",
  "/en/website-maintenance": "Maintenance",
  "/en/about": "About",
  "/en/contact": "Contact",
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
  /** The word on the curtain. Its size follows the longest word, so one long word ("Schoonheidssalon") still fits the screen. */
  const setPtLabel = (text: string) => {
    const el = ptLabel.current;
    if (!el) return;
    el.textContent = text;
    const longest = Math.max(4, ...text.split(/\s+/).map((w) => w.length));
    el.parentElement?.style.setProperty("--pt-len", String(longest));
  };
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
    const scrollToEl = (el: HTMLElement, offset = 0) => {
      if (scroller) scroller.scrollTo(el, { offset, duration: 1.25 });
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduce ? "auto" : "smooth" });
    };
    // The open menu holds the page still (on phones it is pinned in place). A jump to a section
    // must wait until the menu has let go, however long closing takes on this device.
    const afterMenu = (fn: () => void) => {
      if (!root.classList.contains("menu-open")) return fn();
      const t0 = performance.now();
      const wait = () => {
        if (root.classList.contains("menu-open") && performance.now() - t0 < 2500) return void requestAnimationFrame(wait);
        requestAnimationFrame(() => requestAnimationFrame(fn));
      };
      wait();
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
    // A page that was opened through the wordmark arrives with the curtain already closed
    // (set before first paint). Open it once the page is there: the second half of the same
    // animation, so the wordmark gets the whole transition like every other link.
    if (root.classList.contains("pt-boot")) {
      s.busy = true;
      const open = () =>
        window.setTimeout(() => {
          if (!root.classList.contains("pt-boot")) return; // already opened
          root.classList.remove("pt-boot");
          s.finish();
        }, 200);
      if (document.readyState === "complete") open();
      else window.addEventListener("load", open, { once: true });
    }
    const go = (href: string, label: string) => {
      if (s.busy) return;
      s.busy = true;
      setPtLabel(label);
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
    // From the menu, a section of the page you are on opens the way another page does: the
    // curtain closes, the page moves behind it, the curtain opens on the section.
    const behindCurtain = (label: string, target: HTMLElement | null) => {
      if (s.busy) return;
      s.busy = true;
      setPtLabel(label);
      root.classList.add("pt-cover");
      window.setTimeout(
        () =>
          afterMenu(() => {
            if (scroller) scroller.scrollTo(target ?? 0, { immediate: true, force: true });
            else if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
            else window.scrollTo({ top: 0, behavior: "instant" });
            requestAnimationFrame(() => requestAnimationFrame(() => s.finish()));
          }),
        600,
      );
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
        const fresh = (curtain = false) => {
          try {
            // The new page starts behind the closed curtain and opens it (see BOOT in the layout).
            if (curtain) window.sessionStorage.setItem("hopi-pt", "1");
          } catch {}
          try {
            window.history.scrollRestoration = "manual"; // a reload would otherwise return to the old position
          } catch {}
          window.scrollTo({ top: 0, behavior: "instant" });
          // The homepage of the language you are in (/ or /en).
          const home = url.pathname;
          if (window.location.pathname === home) {
            window.history.replaceState(null, "", home);
            window.location.reload();
          } else window.location.assign(home);
        };
        if (reduce) return fresh();
        setPtLabel("HOPI");
        root.classList.add("pt-cover");
        window.setTimeout(() => fresh(true), 620);
        return;
      }
      // The language switch: the other language is a separate document, so it loads anew,
      // behind the same curtain as the wordmark.
      if (a.dataset.lang !== undefined) {
        // While a curtain is still moving (just after arriving) or with reduced motion, the
        // link simply works as a link.
        if (s.busy || reduce) return;
        e.preventDefault();
        s.busy = true;
        setPtLabel(url.pathname === "/en" || url.pathname.startsWith("/en/") ? "English" : "Nederlands");
        root.classList.add("pt-cover");
        window.setTimeout(() => {
          try {
            window.sessionStorage.setItem("hopi-pt", "1");
          } catch {}
          window.location.assign(url.href);
        }, 620);
        return;
      }
      // "Start a project" goes to the request form of the page you are on, when it has one.
      const here = (url.pathname === "/" || url.pathname === "/en") && url.hash === "#contact" && document.getElementById("contact");
      if (here || url.pathname === window.location.pathname) {
        const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
        // Choosing a package ("Kies Starter" → ?pakket=starter#contact): no page load. The form is
        // told which package was chosen and the page moves straight to it.
        const pakket = url.searchParams.get("pakket");
        if (!here && url.search !== window.location.search) {
          if (!pakket || !target) return;
          e.preventDefault();
          window.history.pushState(null, "", url.search + url.hash);
          window.dispatchEvent(new CustomEvent("hopi:pakket", { detail: pakket }));
          // Straight to the form itself (on a phone it sits below the text of the section), clear of the header.
          const form = target.querySelector<HTMLElement>("form");
          afterMenu(() => (form ? scrollToEl(form, -104) : scrollToEl(target)));
          return;
        }
        e.preventDefault();
        if (!reduce && a.closest("#site-menu")) {
          if (url.hash && target) window.history.pushState(null, "", url.hash);
          const name = (a.dataset.pt ?? a.textContent ?? "").replace(/\s+/g, " ").trim();
          behindCurtain(name.length > 0 && name.length <= 22 ? name : "HOPI", target);
        } else if (url.hash && target) {
          window.history.pushState(null, "", url.hash);
          afterMenu(() => scrollToEl(target));
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
      // A curtain that is waiting to open on a fresh page stays closed until it has been opened.
      root.classList.remove("fx-fine", "cur-on", "pt-reveal", "is-pull");
      if (!root.classList.contains("pt-boot")) root.classList.remove("pt-cover");
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
