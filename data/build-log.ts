export type BuildLogEntry = {
  date: string;
  project: string;
  type: "BUILD" | "FIX" | "LEARN" | "RESEARCH" | "SHIP";
  description: string;
  evidence: string;
};

// Dates below come from this repository's history, not inferred project milestones.
// Add newest entries first. Keep evidence alongside the published text.
export const buildLog: BuildLogEntry[] = [
  {
    date: "2026-09-27",
    project: "Portfolio / Explorer",
    type: "BUILD",
    description:
      "Refined the Explorer map into a connected index of cloud, Linux, systems, security and AI experiments.",
    evidence:
      "Repository commit: Refine portfolio homepage and Explorer (2026-09-27).",
  },
  {
    date: "2026-09-26",
    project: "Portfolio / Explorer",
    type: "BUILD",
    description:
      "Built the interactive terminal, request-flow walkthrough and agent architecture demonstrations.",
    evidence:
      "Repository commits: Complete portfolio homepage and Explorer; Complete portfolio narrative and playground (2026-09-26).",
  },
];
