"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { submitInquiryAction, type InquiryState } from "@/server/actions/site";
import { fxState } from "./fx-state";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** The HOPI hexagon, drawn for light backgrounds. */
export function HopiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 2 29 9.5v13L16 30 3 22.5v-13Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 7.6 23.4 11.8v8.4L16 24.4l-7.4-4.2v-8.4Z" fill="#a8f36d" />
      <path d="M12.8 11.8v8.4M19.2 11.8v8.4M12.8 16h6.4" fill="none" stroke="#111512" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/** WhatsApp glyph (the app's own mark, so visitors recognise the button at a glance). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ───────────────────────── Measurement ─────────────────────────

type DataLayerWindow = Window & { dataLayer?: unknown[] };

/**
 * Records a conversion event in the dataLayer. Without a connected Google tag nothing is
 * sent anywhere; with one (after the visitor's consent) GA4 or Tag Manager picks it up.
 * Never pass personal data here.
 */
export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, page_path: window.location.pathname, ...params });
}

const CONSENT_KEY = "hopi-consent";
const CONSENT_EVENT = "hopi:consent-open";
/** Stored when the visitor closes the notice while nothing is measured. It is not a consent. */
const CONSENT_SEEN = "seen";
const readConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/**
 * Click tracking for the whole site (elements with data-track, phone and email links), and the
 * cookie notice. What the notice says is what the site does: with a Google ID configured in
 * Settings it asks for consent (Google scripts load only after "Accepteren"; a refusal is
 * remembered and nothing is loaded). Without one there is nothing to consent to, so it only
 * tells the visitor that no tracking cookies are placed. Having read that notice is never
 * treated as consent: once measurement is connected, those visitors are asked.
 */
export function SiteAnalytics({ gaId, gtmId }: { gaId: string; gtmId: string }) {
  const enabled = Boolean(gaId || gtmId);
  const [ask, setAsk] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track], a[href^='tel:'], a[href^='mailto:'], a[href^='https://wa.me/']");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      if (el.dataset.track) track(el.dataset.track, { label: el.dataset.trackLabel, location: el.dataset.trackLocation });
      else if (href.startsWith("https://wa.me/")) track("whatsapp_click");
      else if (href.startsWith("tel:")) track("phone_click");
      else if (href.startsWith("mailto:")) track("email_click");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const start = () => {
      if (!enabled || loaded.current) return;
      loaded.current = true;
      const w = window as DataLayerWindow;
      w.dataLayer = w.dataLayer ?? [];
      if (gtmId) {
        w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
      } else {
        // gtag() must push the `arguments` object itself, not an array.
        const gtag = function () {
          // eslint-disable-next-line prefer-rest-params
          w.dataLayer!.push(arguments);
        } as (...args: unknown[]) => void;
        gtag("js", new Date());
        gtag("config", gaId, { anonymize_ip: true });
        loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`);
      }
    };
    const choice = readConsent();
    if (enabled && choice === "yes") start();
    // Opening the banner is a response to something outside React (stored choice, footer link).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (choice === null || (enabled && choice === CONSENT_SEEN)) setAsk(true);
    const reopen = () => setAsk(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    (window as Window & { __hopiStartAnalytics?: () => void }).__hopiStartAnalytics = start;
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, [enabled, gaId, gtmId]);

  if (!ask) return null;
  const store = (value: string) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* storage unavailable: the choice applies to this visit only */
    }
    setAsk(false);
  };
  const decide = (yes: boolean) => {
    store(yes ? "yes" : "no");
    if (yes) (window as Window & { __hopiStartAnalytics?: () => void }).__hopiStartAnalytics?.();
  };
  return (
    <div className="consent" role="dialog" aria-label="Cookies" aria-live="polite">
      <span className="mono" aria-hidden="true">
        Cookies
      </span>
      {enabled ? (
        <p>
          We gebruiken alleen met jouw toestemming cookies om te meten hoe de website wordt gebruikt. <Link href="/cookies">Meer over cookies</Link>
        </p>
      ) : (
        <p>
          Deze website plaatst geen tracking- of advertentiecookies. Gaan we later bezoeken meten, dan vragen we je eerst om toestemming. <Link href="/cookies">Meer over cookies</Link>
        </p>
      )}
      {enabled ? (
        <div>
          <button type="button" className="btn btn-line" onClick={() => decide(false)}>
            Weigeren
          </button>
          <button type="button" className="btn btn-accent" onClick={() => decide(true)}>
            Accepteren
          </button>
        </div>
      ) : (
        <div>
          <button type="button" className="btn btn-accent" onClick={() => store(CONSENT_SEEN)}>
            Begrepen
          </button>
        </div>
      )}
    </div>
  );
}

/** Footer link to change the cookie choice (only rendered when measurement is configured). */
export function ConsentLink() {
  return (
    <button type="button" className="linklike" onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}>
      Cookie-instellingen
    </button>
  );
}

// ───────────────────────── Navigation ─────────────────────────

const MENU = [
  { href: "/werk", label: "Werk" },
  { href: "/#diensten", label: "Diensten" },
  { href: "/#werkwijze", label: "Werkwijze" },
  { href: "/prijzen", label: "Prijzen" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];
const QUICK = [
  { href: "/website-laten-maken", label: "Website laten maken" },
  { href: "/website-redesign", label: "Website redesign" },
  { href: "/website-onderhoud", label: "Website onderhoud" },
];

/**
 * Navigation: a wordmark, one call to action and a menu button, drawn in "difference" so
 * they stay legible over any section. The bar steps away while you scroll down and returns
 * when you scroll up. The menu is a full-screen panel that opens from the button; it is in
 * the page from the start (its links are ordinary links) and inert until opened.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      if (document.documentElement.classList.contains("menu-open")) return;
      const y = window.scrollY;
      if (y < 140 || y < last - 4) setHidden(false);
      else if (y > last + 4) setHidden(true);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    root.classList.add("menu-open");
    // Hold the page still behind the menu. With smooth scrolling (mouse) that is one call; on
    // touch screens the page is pinned in place and put back exactly where it was on closing,
    // which is the only lock phones respect.
    const scroller = fxState.scroller;
    const y = window.scrollY;
    const body = document.body;
    if (scroller) scroller.stop();
    else {
      body.style.position = "fixed";
      body.style.top = `-${y}px`;
      body.style.left = "0";
      body.style.right = "0";
    }
    window.addEventListener("keydown", onKey);
    return () => {
      root.classList.remove("menu-open");
      if (scroller) scroller.start();
      else {
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        window.scrollTo({ top: y, behavior: "instant" });
      }
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const current = (href: string) => (!href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`)) ? ("page" as const) : undefined);
  // Another page: the menu stays until the page curtain has closed over it.
  // ...also when the link stays on this page (a section of it, or the request form most pages
  // have themselves): the curtain covers that jump too. Only with reduced motion, where there
  // is no curtain, the menu closes at once.
  const leave = (href: string) => () => {
    const here = href.split("#")[0] === pathname || href.startsWith("#") || (href === "/#contact" && document.getElementById("contact") !== null);
    const still = here && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => setOpen(false), still ? 0 : 520);
  };
  return (
    <>
      <header className={`nv${hidden && !open ? " is-hidden" : ""}${open ? " is-open" : ""}`}>
        <a className="skip" href="#inhoud">
          Naar de inhoud
        </a>
        <Link href="/" className="nv-logo" aria-label="HOPI, naar de homepage" data-home="" onClick={leave("/")}>
          HOPI
          <i aria-hidden="true" />
        </Link>
        <span className="nv-tag mono" aria-hidden="true">
          Digital agency
        </span>
        <Link href="/#contact" className="nv-cta mono" data-track="cta_click" data-track-label="header" onClick={leave("/#contact")}>
          Start een project
        </Link>
        <button ref={button} type="button" className="nv-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}>
          <span className="mono">{open ? "Sluit" : "Menu"}</span>
          <i aria-hidden="true">
            <b />
            <b />
          </i>
        </button>
      </header>
      <div id="site-menu" className={`mn${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
        <nav aria-label="Hoofdmenu" className="mn-main">
          <ol>
            {MENU.map((l, i) => (
              <li key={l.href} style={{ "--i": i } as CSSProperties}>
                <Link href={l.href} className="mn-link" aria-current={current(l.href)} data-pt={l.label} onClick={leave(l.href)}>
                  <span className="mono" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mn-t">
                    <span>{l.label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mn-side">
          <div>
            <p className="mono">Diensten</p>
            <ul>
              {QUICK.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={leave(l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono">Nieuw project</p>
            <Link href="/#contact" className="btn btn-accent" data-track="cta_click" data-track-label="menu" onClick={leave("/#contact")}>
              Start een project <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Phone only: a slim bar with the main action once the visitor has scrolled past the first
 * screen. It steps aside while the contact form itself is in view.
 */
export function StickyCta({ from, whatsapp }: { from: string | null; whatsapp: string | null }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let atForm = false;
    const update = () => setShow(window.scrollY > 700 && !atForm);
    const form = document.getElementById("contact");
    const io = form
      ? new IntersectionObserver(([e]) => {
          atForm = e.isIntersecting;
          update();
        })
      : null;
    if (form && io) io.observe(form);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      io?.disconnect();
    };
  }, []);
  return (
    <>
      <div className={`sticky-cta${show ? " show" : ""}`} aria-hidden={!show}>
        <span>
          <b>Eerst zien, dan betalen</b>
          {from && <small>Website vanaf {from}</small>}
        </span>
        {whatsapp && (
          <a href={whatsapp} target="_blank" rel="noopener" className="wa-mini" tabIndex={show ? 0 : -1} aria-label="Stuur ons een WhatsApp" data-track="whatsapp_click" data-track-label="sticky">
            <WhatsAppIcon />
          </a>
        )}
        <Link href="/#contact" className="btn btn-green" tabIndex={show ? 0 : -1} data-track="cta_click" data-track-label="sticky">
          Start een project
        </Link>
      </div>
      {/* Desktop: a floating button in the corner. On phones the bar above carries it once the visitor scrolls. */}
      {whatsapp && (
        <a href={whatsapp} target="_blank" rel="noopener" className={`wa-fab${show ? " lifted" : ""}`} aria-label="WhatsApp ons: stuur ons een bericht" data-track="whatsapp_click" data-track-label="floating">
          <WhatsAppIcon />
          <span>WhatsApp ons</span>
        </a>
      )}
    </>
  );
}

/**
 * Site motion that needs the browser (everything else is CSS):
 *  - sections fade up as they scroll into view, once; siblings arriving together are
 *    staggered. Only elements that start below the first screen are hidden, and only once
 *    this script runs, so nothing is lost without JavaScript;
 *  - opening another page fades the new page in (not on the first load);
 *  - with a mouse on a large screen, the hero preview follows the pointer by a few pixels.
 */
export function Reveal() {
  const pathname = usePathname();
  const first = useRef(true);
  // Before the browser paints the new page, so it never shows fully and then fades.
  useIsoLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.querySelector<HTMLElement>(".hopi main");
    main?.classList.add("nav-enter");
    return () => main?.classList.remove("nav-enter");
  }, [pathname]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = [...document.querySelectorAll<HTMLElement>(".hopi [data-reveal]")].filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    els.forEach((el) => el.classList.add("pre", "rev"));
    const io = new IntersectionObserver(
      (entries) => {
        let i = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          // Cards that enter in the same moment arrive one after another.
          const delay = Math.min(i++, 4) * 70;
          if (delay && !el.classList.contains("stagger")) {
            el.style.transitionDelay = `${delay}ms`;
            window.setTimeout(() => (el.style.transitionDelay = ""), delay + 900);
          }
          el.classList.remove("pre");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));

    // Hero depth: pointer devices and wide screens only.
    const visual = document.querySelector<HTMLElement>(".hopi .hero-visual");
    const hero = visual?.closest<HTMLElement>(".hero");
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (!visual || !hero || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = hero.getBoundingClientRect();
        visual.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        visual.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    };
    const onLeave = () => {
      visual?.style.setProperty("--px", "0");
      visual?.style.setProperty("--py", "0");
    };
    const depth = Boolean(hero) && window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1020px)").matches;
    if (depth) {
      hero!.addEventListener("pointermove", onMove, { passive: true });
      hero!.addEventListener("pointerleave", onLeave);
    }
    return () => {
      io.disconnect();
      els.forEach((el) => el.classList.remove("pre"));
      cancelAnimationFrame(frame);
      if (depth) {
        hero!.removeEventListener("pointermove", onMove);
        hero!.removeEventListener("pointerleave", onLeave);
      }
    };
  }, [pathname]);
  return null;
}

// ───────────────────────── Contact form ─────────────────────────

export function ContactForm({ packages, source, whatsapp }: { packages: { key: string; name: string }[]; source: string; whatsapp?: string | null }) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiryAction, null);
  const [pkg, setPkg] = useState("");
  // "Kies Business" buttons link to ?pakket=business#contact.
  useEffect(() => {
    const m = /pakket=([a-z0-9_-]+)/i.exec(window.location.search);
    // Reading the address bar is only possible after mounting.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (m && packages.some((p) => p.key === m[1])) setPkg(m[1]);
  }, [packages]);
  const sent = useRef(false);
  useEffect(() => {
    if (state?.ok && !sent.current) {
      sent.current = true;
      track("generate_lead", { form: "ontwerp_aanvraag", package: pkg || "onbekend", source });
    }
  }, [state, pkg, source]);

  if (state?.ok) {
    return (
      <div className="form-done" role="status">
        <CheckCircle2 />
        <h3>Bedankt, we hebben je aanvraag.</h3>
        <p>We gaan aan de slag met een ontwerp van je website. Zodra het klaar is, hoor je van ons.</p>
      </div>
    );
  }
  return (
    <form action={action} className="form">
      <input type="hidden" name="source" value={source} />
      <div className="row row-pair">
        <label className="field">
          <span>Je naam</span>
          <input name="name" required minLength={2} maxLength={80} autoComplete="name" />
        </label>
        <label className="field">
          <span>Bedrijfsnaam</span>
          <input name="company" required minLength={2} maxLength={120} autoComplete="organization" />
        </label>
      </div>
      <div className="row">
        <label className="field">
          <span>E-mailadres</span>
          <input name="email" type="email" required maxLength={160} autoComplete="email" inputMode="email" />
        </label>
        <label className="field">
          <span>
            Telefoon <small>(optioneel)</small>
          </span>
          <input name="phone" type="tel" maxLength={30} autoComplete="tel" inputMode="tel" />
        </label>
      </div>
      <div className="row row-pair">
        <label className="field">
          <span>
            Plaats <small>(optioneel)</small>
          </span>
          <input name="city" maxLength={80} autoComplete="address-level2" />
        </label>
        <label className="field">
          <span>Land</span>
          <select name="country" defaultValue="Netherlands">
            <option value="Netherlands">Nederland</option>
            <option value="Belgium">België</option>
          </select>
        </label>
      </div>
      <div className="row">
        <label className="field">
          <span>
            Huidige website <small>(optioneel)</small>
          </span>
          <input name="website" maxLength={200} placeholder="www.jouwbedrijf.nl" inputMode="url" autoComplete="url" />
        </label>
        <label className="field">
          <span>
            Pakket <small>(optioneel)</small>
          </span>
          <select name="package" value={pkg} onChange={(e) => setPkg(e.target.value)}>
            <option value="">Weet ik nog niet</option>
            {packages.map((p) => (
              <option key={p.key} value={p.key}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="field">
        <span>
          Vertel kort over je bedrijf <small>(optioneel)</small>
        </span>
        <textarea name="message" maxLength={2000} placeholder="Wat doe je, en wat moet je website vooral opleveren?" />
      </label>
      <label className="hp" aria-hidden="true">
        Laat dit veld leeg
        <input name="bedrijfsfax" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="check">
        <input type="checkbox" name="consent" required />
        <span>
          HOPI mag contact met mij opnemen over deze aanvraag. Lees hoe we met je gegevens omgaan in de <Link href="/privacy">privacyverklaring</Link>.
        </span>
      </label>
      {state && !state.ok && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" className="btn btn-dark" disabled={pending}>
        {pending ? "Bezig met versturen…" : "Vraag mijn gratis ontwerp aan"} {!pending && <ArrowRight />}
      </button>
      {whatsapp && (
        <>
          <p className="form-or mono" aria-hidden="true">
            <span>of</span>
          </p>
          <a href={whatsapp} target="_blank" rel="noopener" className="btn btn-wa form-wa" data-track="whatsapp_click" data-track-label="form" data-track-location={source}>
            <WhatsAppIcon /> Stuur een WhatsApp
          </a>
        </>
      )}
      <p className="form-note">Gratis en vrijblijvend. Je betaalt pas als het ontwerp bevalt.</p>
    </form>
  );
}
