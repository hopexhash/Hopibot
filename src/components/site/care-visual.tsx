import { Check, Gauge, Lock } from "lucide-react";
import type { Locale } from "@/lib/site/i18n";
import "./care-visual.css";

const T = {
  nl: {
    label: "Illustratie van HOPI Website Care: de website is online, SSL-beveiliging en dagelijkse back-ups zijn actief, de website is beveiligd en bijgewerkt.",
    status: [["Website", "Online"], ["SSL-beveiliging", "Actief"], ["Dagelijkse back-ups", "Actief"], ["Beveiliging", "Beschermd"], ["Updates", "Bijgewerkt"]],
    domain: "jouwbedrijf.nl",
    company: "Jouw Bedrijf",
    links: ["Diensten", "Projecten", "Over ons", "Contact"],
    quote: "Offerte aanvragen",
    kicker: "Vakmanschap uit de regio",
    h: ["Vakwerk waar je op kunt ", "bouwen."],
    p: "Van eerste advies tot oplevering. Persoonlijk, helder en met oog voor detail.",
    cta: ["Plan een afspraak", "Bekijk projecten"],
    cards: ["Advies", "Uitvoering", "Onderhoud"],
    done: "Website bijgewerkt",
    ok: "Alle systemen werken optimaal.",
  },
  en: {
    label: "Illustration of HOPI Website Care: the website is online, SSL security and daily backups are active, the website is protected and up to date.",
    status: [["Website", "Online"], ["SSL security", "Active"], ["Daily backups", "Active"], ["Security", "Protected"], ["Updates", "Up to date"]],
    domain: "yourcompany.com",
    company: "Your Company",
    links: ["Services", "Projects", "About", "Contact"],
    quote: "Request a quote",
    kicker: "Local craftsmanship",
    h: ["Quality work you can ", "build on."],
    p: "From first advice to completion. Personal, clear and with an eye for detail.",
    cta: ["Book an appointment", "View projects"],
    cards: ["Advice", "Execution", "Maintenance"],
    done: "Website updated",
    ok: "All systems running smoothly.",
  },
};

/**
 * Hero visual of the maintenance page: a website in a browser window with the things HOPI
 * looks after around it. It is an illustration drawn in HTML and CSS (no image, no device
 * mock-up); screen readers get one sentence that says so instead of the loose labels.
 */
export function CareVisual({ lang = "nl" }: { lang?: Locale }) {
  const t = T[lang];
  return (
    <div className="hero-visual care" role="img" aria-label={t.label}>
      <div className="care-browser" aria-hidden="true">
        <div className="care-bar">
          <i />
          <i />
          <i />
          <span>
            <Lock strokeWidth={2.4} /> {t.domain}
          </span>
        </div>
        <div className="care-site">
          <div className="cs-nav">
            <span className="cs-logo">
              <i /> {t.company}
            </span>
            <span className="cs-links">
              {t.links.map((l) => (
                <b key={l}>{l}</b>
              ))}
            </span>
            <span className="cs-btn">{t.quote}</span>
          </div>
          <div className="cs-hero">
            <div>
              <span className="cs-kicker">{t.kicker}</span>
              <p className="cs-h">
                {t.h[0]}
                <em>{t.h[1]}</em>
              </p>
              <p className="cs-p">{t.p}</p>
              <span className="cs-cta">
                <b>{t.cta[0]}</b>
                <i>{t.cta[1]}</i>
              </span>
            </div>
            <div className="cs-art">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="cs-cards">
            {t.cards.map((c) => (
              <span key={c}>
                <i />
                <b>{c}</b>
                <small />
                <small />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="care-card care-score" aria-hidden="true">
        <div className="care-ring">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="27" />
            <circle cx="32" cy="32" r="27" pathLength="100" />
          </svg>
          <Gauge strokeWidth={2.2} />
        </div>
        <p>
          Website performance
          <b>
            <span className="care-num" />
            <small>/100</small>
          </b>
        </p>
      </div>

      <div className="care-card care-status" aria-hidden="true">
        <p className="care-title">Website status</p>
        <ul>
          {t.status.map(([label, value]) => (
            <li key={label}>
              <span>{label}</span>
              <b>
                <i /> {value}
              </b>
            </li>
          ))}
        </ul>
      </div>

      <div className="care-card care-note" aria-hidden="true">
        <span>
          <Check strokeWidth={3} />
        </span>
        <p>
          <b>{t.done}</b>
          {t.ok}
        </p>
      </div>
    </div>
  );
}
