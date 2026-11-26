"use client";

import { ArrowRight, CheckCircle2, Menu, X } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { submitInquiryAction, type InquiryState } from "@/server/actions/site";

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

const LINKS = [
  { href: "/#werk", label: "Werk" },
  { href: "/#diensten", label: "Diensten" },
  { href: "/#werkwijze", label: "Werkwijze" },
  { href: "/#prijzen", label: "Prijzen" },
  { href: "/#vragen", label: "Vragen" },
];

export function SiteHeader() {
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
  return (
    <header className={`hdr${scrolled || open ? " scrolled" : ""}`}>
      <div className="wrap hdr-in">
        <Link href="/" className="brand" aria-label="HOPI, naar de homepage" onClick={() => setOpen(false)}>
          <HopiMark />
          HOPI
        </Link>
        <nav className="nav" aria-label="Hoofdmenu">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/#contact" className="btn btn-dark hdr-cta">
          Gratis ontwerp
        </Link>
        <button type="button" className="menu-btn" aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Menu sluiten" : "Menu openen"} onClick={() => setOpen((o) => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="site-menu" className="menu" aria-label="Menu">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="m-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn btn-dark" onClick={() => setOpen(false)}>
            Vraag een gratis ontwerp aan <ArrowRight />
          </Link>
        </nav>
      )}
    </header>
  );
}

/**
 * Fades sections in as they scroll into view. Only elements that start below the first
 * screen are hidden, and only once this script runs, so nothing is lost without JavaScript.
 */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>(".hopi [data-reveal]")].filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    els.forEach((el) => el.classList.add("pre", "rev"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.remove("pre");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export function ContactForm({ packages }: { packages: { key: string; name: string }[] }) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiryAction, null);
  const [pkg, setPkg] = useState("");
  // "Kies Business" buttons link to /?pakket=business#contact.
  useEffect(() => {
    const read = () => {
      const m = /pakket=([a-z0-9_-]+)/i.exec(window.location.search);
      if (m && packages.some((p) => p.key === m[1])) setPkg(m[1]);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [packages]);

  if (state?.ok) {
    return (
      <div className="form-done" role="status">
        <CheckCircle2 />
        <h3>Bedankt, we hebben uw aanvraag.</h3>
        <p>We nemen zo snel mogelijk contact met u op om uw gratis ontwerp te bespreken.</p>
      </div>
    );
  }
  return (
    <form action={action} className="form" noValidate={false}>
      <div className="row">
        <label className="field">
          <span>Uw naam</span>
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
          <input name="website" maxLength={200} placeholder="www.uwbedrijf.nl" inputMode="url" autoComplete="url" />
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
          Vertel kort over uw bedrijf <small>(optioneel)</small>
        </span>
        <textarea name="message" maxLength={2000} placeholder="Wat doet u, en wat moet uw website vooral opleveren?" />
      </label>
      <label className="hp" aria-hidden="true">
        Laat dit veld leeg
        <input name="bedrijfsfax" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="check">
        <input type="checkbox" name="consent" required />
        <span>
          HOPI mag contact met mij opnemen over deze aanvraag. Lees hoe we met uw gegevens omgaan in de <Link href="/privacy">privacyverklaring</Link>.
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
    </form>
  );
}
