"use client";

import { Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/components/site/site-client";
import { shot } from "@/lib/site/work";

const T = {
  nl: {
    group: (n: string) => `Weergave van ${n}`,
    phone: "Mobiel",
    cardDesktop: (n: string) => `De website van ${n} op een groot scherm (demo-ontwerp)`,
    viewDesktop: (n: string) => `De hele website van ${n}, scroll om verder te kijken`,
    fullDesktop: (n: string) => `De hele website van ${n} op een groot scherm, van boven naar beneden (demo-ontwerp)`,
    cardPhone: (n: string) => `De website van ${n} op een telefoon (demo-ontwerp)`,
    viewPhone: (n: string) => `De hele website van ${n} op een telefoon, scroll om verder te kijken`,
    fullPhone: (n: string) => `De hele website van ${n} op een telefoon, van boven naar beneden (demo-ontwerp)`,
    hint: "Scroll in het venster om de hele website te zien",
  },
  en: {
    group: (n: string) => `View of ${n}`,
    phone: "Mobile",
    cardDesktop: (n: string) => `The website of ${n} on a large screen (demo design)`,
    viewDesktop: (n: string) => `The whole website of ${n}, scroll to see more`,
    fullDesktop: (n: string) => `The whole website of ${n} on a large screen, from top to bottom (demo design)`,
    cardPhone: (n: string) => `The website of ${n} on a phone (demo design)`,
    viewPhone: (n: string) => `The whole website of ${n} on a phone, scroll to see more`,
    fullPhone: (n: string) => `The whole website of ${n} on a phone, from top to bottom (demo design)`,
    hint: "Scroll inside the window to see the whole website",
  },
};

/**
 * Preview of one demo website in the portfolio, with a desktop/mobile switch.
 *  - "card": for the portfolio list. The browser window shows the first screens of the site and
 *    scrolls through them while the pointer is over it (or the card has focus).
 *  - "viewer": for the project page. The whole site is in the window and can be scrolled by
 *    hand, on desktop and in the phone frame.
 * The pictures are real screenshots of the live demo (scripts/shoot-demos.mjs).
 */
export function DemoPreview({ slug, name, mode, eager = false }: { slug: string; name: string; mode: "card" | "viewer"; eager?: boolean }) {
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");
  const load = eager ? "eager" : "lazy";
  const t = T[useLang()];
  return (
    <div className={`pv pv-${mode}`} data-device={device}>
      <div className="pv-switch mono" role="group" aria-label={t.group(name)}>
        <button type="button" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}>
          <Monitor aria-hidden="true" /> Desktop
        </button>
        <button type="button" aria-pressed={device === "phone"} onClick={() => setDevice("phone")}>
          <Smartphone aria-hidden="true" /> {t.phone}
        </button>
      </div>
      <div className="pv-stage">
        {device === "desktop" ? (
          <div className="pv-browser">
            <div className="pv-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.nl</span>
            </div>
            {mode === "card" ? (
              <div className="pv-screen">
                <img src={shot(slug, "scroll-720")} alt={t.cardDesktop(name)} width={720} height={2250} loading={load} fetchPriority={eager ? "high" : undefined} decoding="async" />
              </div>
            ) : (
              <div className="pv-screen pv-scroll" tabIndex={0} data-lenis-prevent aria-label={t.viewDesktop(name)}>
                <img src={shot(slug, "tall-960")} srcSet={`${shot(slug, "tall-480")} 480w, ${shot(slug, "tall-768")} 768w, ${shot(slug, "tall-960")} 960w`} sizes="(max-width: 1540px) calc(100vw - 40px), 1500px" alt={t.fullDesktop(name)} width={960} height={6400} loading={load} fetchPriority={eager ? "high" : undefined} decoding="async" />
              </div>
            )}
          </div>
        ) : (
          <div className="pv-phone">
            {mode === "card" ? (
              <div className="pv-screen">
                <img src={shot(slug, "m-780")} srcSet={`${shot(slug, "m-390")} 390w, ${shot(slug, "m-780")} 780w`} sizes="280px" alt={t.cardPhone(name)} width={780} height={1688} decoding="async" />
              </div>
            ) : (
              <div className="pv-screen pv-scroll" tabIndex={0} data-lenis-prevent aria-label={t.viewPhone(name)}>
                <img src={shot(slug, "mtall-390")} alt={t.fullPhone(name)} width={390} height={7600} decoding="async" />
              </div>
            )}
          </div>
        )}
      </div>
      {mode === "viewer" && <p className="pv-hint mono">{t.hint}</p>}
    </div>
  );
}
