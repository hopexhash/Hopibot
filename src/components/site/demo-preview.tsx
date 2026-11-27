"use client";

import { Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { shot } from "@/lib/site/work";

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
  return (
    <div className={`pv pv-${mode}`} data-device={device}>
      <div className="pv-switch mono" role="group" aria-label={`Weergave van ${name}`}>
        <button type="button" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}>
          <Monitor aria-hidden="true" /> Desktop
        </button>
        <button type="button" aria-pressed={device === "phone"} onClick={() => setDevice("phone")}>
          <Smartphone aria-hidden="true" /> Mobiel
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
                <img src={shot(slug, "scroll-720")} alt={`De website van ${name} op een groot scherm (demo-ontwerp)`} width={720} height={2250} loading={load} fetchPriority={eager ? "high" : undefined} decoding="async" />
              </div>
            ) : (
              <div className="pv-screen pv-scroll" tabIndex={0} data-lenis-prevent aria-label={`De hele website van ${name}, scroll om verder te kijken`}>
                <img src={shot(slug, "tall-960")} alt={`De hele website van ${name} op een groot scherm, van boven naar beneden (demo-ontwerp)`} width={960} height={6400} loading={load} fetchPriority={eager ? "high" : undefined} decoding="async" />
              </div>
            )}
          </div>
        ) : (
          <div className="pv-phone">
            {mode === "card" ? (
              <div className="pv-screen">
                <img src={shot(slug, "m-780")} srcSet={`${shot(slug, "m-390")} 390w, ${shot(slug, "m-780")} 780w`} sizes="280px" alt={`De website van ${name} op een telefoon (demo-ontwerp)`} width={780} height={1688} decoding="async" />
              </div>
            ) : (
              <div className="pv-screen pv-scroll" tabIndex={0} data-lenis-prevent aria-label={`De hele website van ${name} op een telefoon, scroll om verder te kijken`}>
                <img src={shot(slug, "mtall-390")} alt={`De hele website van ${name} op een telefoon, van boven naar beneden (demo-ontwerp)`} width={390} height={7600} decoding="async" />
              </div>
            )}
          </div>
        )}
      </div>
      {mode === "viewer" && <p className="pv-hint mono">Scroll in het venster om de hele website te zien</p>}
    </div>
  );
}
