"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./home.module.css";

type Direction = "cloud" | "software" | "ai";

const directions: Record<
  Direction,
  {
    title: string;
    tagline: string;
    focus: string[];
    evidence: { label: string; link: string; description: string }[];
  }
> = {
  cloud: {
    title: "Cloud & Infrastructure",
    tagline: "How applications run, connect, and stay reliable.",
    focus: [
      "Linux Mint",
      "Cloud & AWS training",
      "Networking & DNS",
      "Infrastructure & deployment",
      "Security fundamentals",
    ],
    evidence: [
      {
        label: "Under the application",
        link: "#systems",
        description: "Runtime, processes, networking and cloud layers.",
      },
      {
        label: "Middleman deployment",
        link: "#project-middleman",
        description: "Supabase, Vercel, auth boundaries and HTTPS.",
      },
      {
        label: "Simulated Terminal & Request Lifecycle",
        link: "/playground#cloud",
        description: "Interactive system surfaces in Explorer.",
      },
    ],
  },
  software: {
    title: "Software & Systems",
    tagline: "End-to-end product architecture, databases, and trust boundaries.",
    focus: [
      "The Middleman flagship build",
      "Information Systems at OAU",
      "Application architecture",
      "Databases & PostgreSQL",
      "Auth & payment flows",
    ],
    evidence: [
      {
        label: "The Middleman Case Study",
        link: "#project-middleman",
        description: "Escrow-backed transaction lifecycle and DB design.",
      },
      {
        label: "System Boundaries",
        link: "#project-middleman",
        description: "Identity, application, payments, data and hosting.",
      },
      {
        label: "Request Flow Walkthrough",
        link: "/playground#systems",
        description: "Step through user to database lifecycle.",
      },
    ],
  },
  ai: {
    title: "AI & Research",
    tagline: "Agent coordination, multi-model critique, and AI evaluation.",
    focus: [
      "Project SYNAPSE",
      "S.A.M.U.E.L. Governor",
      "Agent permissions",
      "AI evaluation & safety direction",
      "Global Hack Week: Agents",
    ],
    evidence: [
      {
        label: "S.A.M.U.E.L. Governor",
        link: "#project-samuel",
        description: "Permission-aware personal assistant architecture.",
      },
      {
        label: "SYNAPSE Multi-Agent Critique",
        link: "#project-synapse",
        description: "Independent reasoning, critique and state revision.",
      },
      {
        label: "AI Evaluation Research Direction",
        link: "#research",
        description: "Investigating model disagreement, critique and safety.",
      },
    ],
  },
};

const layers = [
  ["Application", "The product someone uses", "Next.js / product workflows"],
  [
    "Runtime + Linux",
    "The environment that runs it",
    "Processes / services / permissions",
  ],
  ["Networking", "The paths between services", "DNS / HTTPS / connectivity"],
  [
    "Cloud + infrastructure",
    "The resources it depends on",
    "Deployment / compute / configuration",
  ],
  [
    "Security + reliability",
    "The boundaries that keep it working",
    "Access / failures / observability",
  ],
];

export default function DirectionSection() {
  const [activeDirection, setActiveDirection] = useState<Direction>("software");
  const current = directions[activeDirection];

  return (
    <section
      className={styles.systemsSection}
      id="systems"
      aria-labelledby="direction-title"
    >
      <div className={styles.directionHeader}>
        <p className="section-index">Engineering direction</p>
        <h2 id="direction-title">What are you here for?</h2>
        <p className={styles.directionSubtitle}>
          Select a technical focus to highlight relevant architecture, builds, and research evidence.
        </p>

        <div
          className={styles.directionSelector}
          role="tablist"
          aria-label="Visitor technical directions"
        >
          {(Object.keys(directions) as Direction[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeDirection === key}
              className={`${styles.directionTab} ${activeDirection === key ? styles.activeTab : ""}`}
              onClick={() => setActiveDirection(key)}
            >
              <span>{directions[key].title}</span>
            </button>
          ))}
        </div>

        <div className={styles.directionPanel} role="tabpanel">
          <h3>{current.tagline}</h3>
          <div className={styles.directionFocusList}>
            <strong>Key focus areas:</strong>
            <ul>
              {current.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.directionEvidenceGrid}>
            {current.evidence.map((item) => (
              <a key={item.label} href={item.link} className={styles.evidenceCard}>
                <strong>{item.label}</strong>
                <p>{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.systemsGrid}>
        <div className={styles.systemsIntro}>
          <h2>
            Under the
            <br />
            application.
          </h2>
          <p>
            Shipping software keeps pulling me deeper into the stack. I’m learning
            how the services underneath it run, connect and fail.
          </p>
          <p className={styles.systemNote}>
            Project deployments · Linux Mint
            <br />
            AWS &amp; Google hands-on labs
            <br />
            Security fundamentals
          </p>
        </div>
        <ol className={styles.layers}>
          {layers.map(([title, description, detail], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <small>{detail}</small>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
