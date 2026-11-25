/**
 * The stages a website passes through. Each is reported by the code that performs it
 * (research agent, website builder, quality control, deployment), never simulated.
 */
export const WEBSITE_STAGES = [
  { n: 1, label: "Researching business" },
  { n: 2, label: "Identifying industry and audience" },
  { n: 3, label: "Developing brand identity" },
  { n: 4, label: "Selecting creative direction" },
  { n: 5, label: "Planning website architecture" },
  { n: 6, label: "Selecting visual assets" },
  { n: 7, label: "Building website components" },
  { n: 8, label: "Implementing responsive layouts" },
  { n: 9, label: "Testing website" },
  { n: 10, label: "Improving visual quality" },
  { n: 11, label: "Finalizing website" },
] as const;

export const stageLabel = (n: number) => WEBSITE_STAGES.find((s) => s.n === n)?.label ?? `Stage ${n}`;

/** Event payload for a stage: `status` is "running" when it starts and "completed" when it is done. */
export const stageEvent = (n: number, status: "running" | "completed" | "warning" = "running") => ({ kind: "website.stage", stage: n, status });
