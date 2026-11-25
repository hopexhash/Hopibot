import type { ReactNode } from "react";

/**
 * A small living character for every agent. Pure SVG + CSS (see globals.css, ".msc"), so it
 * works in server and client components. The mood follows the agent's real status:
 * working, idle, waiting, asleep (offline or paused) or dizzy (last task failed).
 */

export type MascotMood = "work" | "idle" | "wait" | "sleep" | "dizzy";

export function moodFor(status: string): MascotMood {
  if (status === "running") return "work";
  if (status === "queued" || status === "waiting") return "wait";
  if (status === "failed") return "dizzy";
  if (status === "offline" || status === "disabled") return "sleep";
  return "idle";
}

type Look = {
  nick: string;
  color: string;
  dark: string;
  /** Body silhouette. */
  body: "round" | "tall" | "square" | "egg";
  /** Drawn behind the body (ears, antennae, hats' back). */
  back?: ReactNode;
  /** Drawn in front of the body (hats, glasses, things in hand). */
  front?: ReactNode;
  /** Seconds offset so the characters do not blink in unison. */
  delay: number;
};

const INK = "#0b1f16";

const LOOKS: Record<string, Look> = {
  // Scout — antenna with a pinging radar ball
  lead_finder: {
    nick: "Scout", color: "#35f58f", dark: "#12b866", body: "round", delay: 0,
    back: (
      <g className="msc-tool">
        <path d="M50 26 V11" stroke="#12b866" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="9" r="4.5" fill="#fff36b" />
        <circle className="msc-ping" cx="50" cy="9" r="6" fill="none" stroke="#fff36b" strokeWidth="1.5" />
      </g>
    ),
    front: <path d="M22 60 q-9 2 -8 11" stroke="#12b866" strokeWidth="5" strokeLinecap="round" fill="none" />,
  },
  // Sage — owl tufts, round glasses and a little book
  research: {
    nick: "Sage", color: "#58c8ff", dark: "#1f8fd0", body: "egg", delay: 0.7,
    back: <path d="M30 30 l-5 -13 l13 7z M70 30 l5 -13 l-13 7z" fill="#1f8fd0" />,
    front: (
      <>
        <g fill="none" stroke={INK} strokeWidth="2.2">
          <circle cx="39" cy="48" r="11.5" />
          <circle cx="61" cy="48" r="11.5" />
          <path d="M50.5 48 h-1" />
        </g>
        <g className="msc-tool">
          <rect x="66" y="66" width="19" height="14" rx="2" fill="#fff" stroke={INK} strokeWidth="1.6" />
          <path d="M75.5 66 v14 M69 70 h4 M69 74 h4 M78 70 h4 M78 74 h4" stroke={INK} strokeWidth="1.1" />
        </g>
      </>
    ),
  },
  // Sherlock — detective cap and a magnifying glass
  contact_research: {
    nick: "Sherlock", color: "#ffc857", dark: "#d99a1c", body: "round", delay: 1.3,
    front: (
      <>
        <path d="M27 33 q23 -22 46 0 q-23 -7 -46 0z" fill="#8a5a2c" />
        <path d="M24 34 q26 -9 52 0" stroke="#6b431d" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="50" cy="20" r="2.6" fill="#6b431d" />
        <g className="msc-tool">
          <circle cx="80" cy="64" r="8" fill="rgba(255,255,255,.35)" stroke={INK} strokeWidth="2.4" />
          <path d="M74.5 70 l-7 8" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
        </g>
      </>
    ),
  },
  // Pixel — screen-shaped painter with a beret and a brush
  website_builder: {
    nick: "Pixel", color: "#ff7bd9", dark: "#d94bb0", body: "square", delay: 0.35,
    front: (
      <>
        <path d="M30 30 q20 -17 42 -1 q-22 5 -42 1z" fill="#7b2cbf" />
        <circle cx="52" cy="19" r="2.6" fill="#7b2cbf" />
        <g className="msc-tool">
          <path d="M78 76 L88 52" stroke="#c98a3a" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M86 54 q5 -9 4 -13 q-6 3 -8 11z" fill="#43e7ff" />
        </g>
      </>
    ),
  },
  // Checky — inspector with a monocle and a clipboard
  quality_control: {
    nick: "Checky", color: "#b79bff", dark: "#8463e6", body: "tall", delay: 1.0,
    front: (
      <>
        <circle cx="61" cy="48" r="12" fill="none" stroke="#ffd166" strokeWidth="2.4" />
        <path d="M71 56 q6 10 3 20" stroke="#ffd166" strokeWidth="1.4" fill="none" />
        <g className="msc-tool">
          <rect x="8" y="60" width="19" height="23" rx="2.5" fill="#fff" stroke={INK} strokeWidth="1.6" />
          <rect x="13" y="57.5" width="9" height="5" rx="1.5" fill={INK} />
          <path d="M12 73 l4 4 l7 -9" stroke="#12b866" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </>
    ),
  },
  // Blast — astronaut helmet, with a flame when working
  deployment: {
    nick: "Blast", color: "#ff9a5c", dark: "#e06a26", body: "egg", delay: 1.7,
    back: (
      <g className="msc-flame">
        <path d="M40 88 q10 22 20 0 q-10 6 -20 0z" fill="#ffd166" />
        <path d="M44 88 q6 12 12 0 q-6 3 -12 0z" fill="#ff5d5d" />
      </g>
    ),
    front: (
      <>
        <circle cx="50" cy="47" r="27" fill="rgba(180,235,255,.14)" stroke="#e8f6ff" strokeWidth="2.6" />
        <path d="M31 31 q8 -9 18 -9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity=".7" />
      </>
    ),
  },
  // Charm — bow tie, and a letter with a heart
  sales: {
    nick: "Charm", color: "#ff6f91", dark: "#e0446a", body: "round", delay: 0.5,
    front: (
      <>
        <path d="M50 68 l-10 -6 v12z M50 68 l10 -6 v12z" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
        <circle cx="50" cy="68" r="2.6" fill="#ffd166" />
        <g className="msc-tool">
          <rect x="68" y="62" width="20" height="14" rx="2" fill="#fff" stroke={INK} strokeWidth="1.6" />
          <path d="M68 63 l10 8 l10 -8" stroke={INK} strokeWidth="1.4" fill="none" />
          <path d="M78 60 c-3 -5 -9 0 0 5 c9 -5 3 -10 0 -5z" fill="#ff3d6e" />
        </g>
      </>
    ),
  },
  // Spark — a wizard hat for agents you build yourself
  custom: {
    nick: "Spark", color: "#6ff0ff", dark: "#27b7cc", body: "round", delay: 0.9,
    front: (
      <>
        <path d="M30 32 L52 4 L70 32z" fill="#5b3fd6" />
        <path d="M24 33 q26 -7 52 0" stroke="#3d2aa3" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path className="msc-twinkle" d="M52 14 l1.8 4.2 l4.2 1.8 l-4.2 1.8 l-1.8 4.2 l-1.8 -4.2 l-4.2 -1.8 l4.2 -1.8z" fill="#fff36b" />
      </>
    ),
  },
};

const BODY: Record<Look["body"], string> = {
  round: "M50 24 C72 24 82 40 82 58 C82 78 68 88 50 88 C32 88 18 78 18 58 C18 40 28 24 50 24Z",
  egg: "M50 20 C70 20 80 40 80 60 C80 79 66 88 50 88 C34 88 20 79 20 60 C20 40 30 20 50 20Z",
  tall: "M32 26 H68 Q80 26 80 38 V74 Q80 88 66 88 H34 Q20 88 20 74 V38 Q20 26 32 26Z",
  square: "M30 26 H70 Q82 26 82 38 V72 Q82 86 68 86 H32 Q18 86 18 72 V38 Q18 26 30 26Z",
};

export function AgentMascot({ agent, status = "idle", size = 56, className }: { agent: string; status?: string; size?: number; className?: string }) {
  const look = LOOKS[agent] ?? LOOKS.custom;
  const mood = moodFor(status);
  const asleep = mood === "sleep";
  const dizzy = mood === "dizzy";
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`msc msc-${mood}${className ? ` ${className}` : ""}`}
      style={{ ["--msc-delay" as string]: `${look.delay}s` }}
      role="img"
      aria-label={`${look.nick}: ${mood === "work" ? "working" : mood === "sleep" ? "asleep" : mood === "dizzy" ? "needs help" : mood === "wait" ? "waiting" : "ready"}`}
    >
      <ellipse className="msc-shadow" cx="50" cy="93" rx="24" ry="4" fill="#000" opacity=".35" />
      <g className="msc-bob">
        {look.back}
        {/* feet */}
        <ellipse cx="39" cy="88" rx="8" ry="4.5" fill={look.dark} />
        <ellipse cx="61" cy="88" rx="8" ry="4.5" fill={look.dark} />
        <path d={BODY[look.body]} fill={look.color} />
        <path d={BODY[look.body]} fill="url(#msc-shine)" opacity=".5" />
        <ellipse cx="50" cy="70" rx="17" ry="12" fill="#fff" opacity=".2" />

        {/* face */}
        {asleep ? (
          <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round">
            <path d="M31 49 q8 6 16 0" />
            <path d="M53 49 q8 6 16 0" />
          </g>
        ) : dizzy ? (
          <g stroke={INK} strokeWidth="2.8" strokeLinecap="round">
            <path d="M33 43 l12 10 M45 43 l-12 10" />
            <path d="M55 43 l12 10 M67 43 l-12 10" />
          </g>
        ) : (
          <g className="msc-eyes">
            <ellipse cx="39" cy="48" rx="8.5" ry="9.5" fill="#fff" />
            <ellipse cx="61" cy="48" rx="8.5" ry="9.5" fill="#fff" />
            <g className="msc-pupils">
              <circle cx="40" cy="49" r="4.6" fill={INK} />
              <circle cx="62" cy="49" r="4.6" fill={INK} />
              <circle cx="41.8" cy="47" r="1.6" fill="#fff" />
              <circle cx="63.8" cy="47" r="1.6" fill="#fff" />
            </g>
          </g>
        )}
        <ellipse cx="29" cy="60" rx="5" ry="3" fill="#ff8fa3" opacity=".65" />
        <ellipse cx="71" cy="60" rx="5" ry="3" fill="#ff8fa3" opacity=".65" />
        {mood === "work" ? (
          <path d="M43 61 q7 9 14 0z" fill={INK} />
        ) : dizzy ? (
          <path d="M42 65 q4 -5 8 0 t8 0" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        ) : asleep ? (
          <ellipse cx="50" cy="63" rx="3" ry="3.6" fill={INK} opacity=".8" />
        ) : (
          <path d="M43 61 q7 6 14 0" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
        )}
        {look.front}
      </g>
      {asleep && (
        <g className="msc-zzz" fill="#cfe8dc" fontFamily="var(--font-sans)" fontWeight="700">
          <text x="74" y="30" fontSize="13">z</text>
          <text x="83" y="19" fontSize="10">z</text>
          <text x="90" y="11" fontSize="7">z</text>
        </g>
      )}
      {mood === "wait" && (
        <g className="msc-dots" fill="#ffbf47">
          <circle cx="76" cy="20" r="3" />
          <circle cx="85" cy="20" r="3" />
          <circle cx="94" cy="20" r="3" />
        </g>
      )}
      <defs>
        <linearGradient id="msc-shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export const mascotName = (agent: string) => (LOOKS[agent] ?? LOOKS.custom).nick;
