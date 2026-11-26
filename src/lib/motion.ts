/**
 * Motion system, shared by the dashboard (Framer Motion) and mirrored as CSS variables in
 * globals.css and site.css. One set of durations and curves for the whole product:
 *
 *   micro    150–250 ms  hover, press, focus, tooltips
 *   base     200–350 ms  buttons, cards, menus, dialogs, page changes
 *   reveal   500–800 ms  sections entering the screen, charts drawing
 *
 * Rules: animate transform and opacity only; movement is small (2–16 px); nothing bounces
 * or spins for decoration; every animation reflects a real state or event; everything is
 * switched off under prefers-reduced-motion.
 */
export const EASE = {
  /** Decelerating: things arriving on screen. */
  out: [0.16, 1, 0.3, 1],
  /** Gentle start and stop: things changing place. */
  inOut: [0.65, 0, 0.35, 1],
  /** Accelerating: things leaving. */
  in: [0.4, 0, 1, 1],
} as const;

export const DURATION = { micro: 0.18, base: 0.26, page: 0.28, reveal: 0.6 } as const;

/** A list item or status label arriving (used with AnimatePresence). */
export const enter = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 }, transition: { duration: DURATION.micro, ease: EASE.out } } as const;
