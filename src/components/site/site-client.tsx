"use client";

import { ArrowRight, CheckCircle2, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { submitInquiryAction, type InquiryState } from "@/server/actions/site";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** The HOPI hexagon, drawn for light backgrounds. */
export function HopiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 2 29 9.5v13L16 30 3 22.5v-13Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 7.6 23.4 11.8v8.4L16 24.4l-7.4-4.2v-8.4Z" fill="#00c46a" />
      <path d="M12.8 11.8v8.4M19.2 11.8v8.4M12.8 16h6.4" fill="none" stroke="#04140c" strokeWidth="1.8" strokeLinecap="round" />
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
 * Click tracking for the whole site (elements with data-track, phone and email links), and,
 * only when a Google ID is configured in Settings, a consent banner. Google scripts load
 * after the visitor accepts; a refusal is remembered and nothing is loaded.
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
    if (!enabled) return;
    const start = () => {
      if (loaded.current) return;
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
    if (choice === "yes") start();
    // Opening the banner is a response to something outside React (stored choice, footer link).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (choice === null) setAsk(true);
    const reopen = () => setAsk(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    (window as Window & { __hopiStartAnalytics?: () => void }).__hopiStartAnalytics = start;
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, [enabled, gaId, gtmId]);

  if (!enabled || !ask) return null;
  const decide = (yes: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, yes ? "yes" : "no");
    } catch {
      /* storage unavailable: the choice applies to this visit only */
    }
    setAsk(false);
    if (yes) (window as Window & { __hopiStartAnalytics?: () => void }).__hopiStartAnalytics?.();
  };
  return (
    <div className="consent" role="dialog" aria-label="Cookies" aria-live="polite">
      <p>
        We gebruiken alleen met jouw toestemming cookies om te meten hoe de website wordt gebruikt. <Link href="/cookies">Meer over cookies</Link>
      </p>
      <div>
        <button type="button" className="btn btn-line" onClick={() => decide(false)}>
          Weigeren
        </button>
        <button type="button" className="btn btn-dark" onClick={() => decide(true)}>
          Accepteren
        </button>
      </div>
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

/** "#contact" on pages that have the form; the homepage form everywhere else. */
function toForm(e: ReactMouseEvent<HTMLAnchorElement>) {
  if (document.getElementById("contact")) return;
  e.preventDefault();
  // A full navigation, so the browser lands on the form after the homepage has loaded.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.href = "/#contact";
}

const LINKS = [
  { href: "/website-laten-maken", label: "Website laten maken" },
  { href: "/#werk", label: "Voorbeelden" },
  { href: "/#werkwijze", label: "Werkwijze" },
  { href: "/prijzen", label: "Prijzen" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);
  const current = (href: string) => (!href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`)) ? ("page" as const) : undefined);
  return (
    <>
    <header className={`hdr${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <a className="skip" href="#inhoud">
        Naar de inhoud
      </a>
      <div className="wrap hdr-in">
        <Link href="/" className="brand" aria-label="HOPI, naar de homepage" onClick={() => setOpen(false)}>
          <HopiMark />
          HOPI
        </Link>
        <nav className="nav" aria-label="Hoofdmenu">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <a href="#contact" className="btn btn-dark hdr-cta" data-track="cta_click" data-track-label="header" onClick={toForm}>
          Gratis ontwerp
        </a>
        <button type="button" className="menu-btn" aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Menu sluiten" : "Menu openen"} onClick={() => setOpen((o) => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
      {/* A sibling of the header, not a child: the header's blurred background would otherwise
          become the box this full-screen panel is positioned in, squeezing it to nothing. */}
      {open && (
        <nav id="site-menu" className="menu" aria-label="Menu">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="m-link" aria-current={current(l.href)} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a href="#contact" className="btn btn-dark" data-track="cta_click" data-track-label="menu" onClick={(e) => {
              setOpen(false);
              toForm(e);
            }}>
            Vraag een gratis ontwerp aan <ArrowRight />
          </a>
        </nav>
      )}
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
        <a href="#contact" className="btn btn-green" tabIndex={show ? 0 : -1} data-track="cta_click" data-track-label="sticky" onClick={toForm}>
          Gratis ontwerp
        </a>
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

export function ContactForm({ packages, source }: { packages: { key: string; name: string }[]; source: string }) {
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
        <p>We nemen zo snel mogelijk contact met je op om je gratis ontwerp te bespreken.</p>
      </div>
    );
  }
  return (
    <form action={action} className="form">
      <input type="hidden" name="source" value={source} />
      <div className="row">
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
      <div className="row">
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
      <p className="form-note">Gratis en vrijblijvend. Je betaalt pas als het ontwerp bevalt.</p>
    </form>
  );
}
