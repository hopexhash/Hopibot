/** The smooth-scroll instance, shared between the motion engine and the menu (which pauses it). */
export type Scroller = {
  raf(time: number): void;
  scrollTo(target: number | string | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean; force?: boolean }): void;
  stop(): void;
  start(): void;
  resize(): void;
  destroy(): void;
};
export const fxState: { scroller: Scroller | null } = { scroller: null };
