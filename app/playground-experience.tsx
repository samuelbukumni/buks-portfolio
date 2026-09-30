"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./explorer.css";

type TerminalCommand =
  | "help"
  | "whoami"
  | "about"
  | "ls"
  | "projects"
  | "cloud"
  | "linux"
  | "systems"
  | "ai"
  | "network"
  | "security"
  | "contact"
  | "clear"
  | "history"
  | "date"
  | "pwd"
  | "echo"
  | "explore"
  | "coffee"
  | "curious";

type TerminalEntry = {
  type: "command" | "output" | "error";
  text: string;
};

type ExplorerNode = {
  id: string;
  label: string;
  layer: string;
  description: string;
};

type ExplorerView =
  | "map"
  | "cloud"
  | "linux"
  | "terminal"
  | "systems"
  | "security"
  | "ai"
  | "samuel"
  | "synapse";

type RegionId = Exclude<
  ExplorerView,
  "map" | "terminal" | "samuel" | "synapse"
>;

type Region = {
  id: RegionId;
  number: string;
  label: string;
  status: "EXPLORED" | "EXPLORING";
  route: string;
  description: string;
  metadata: string;
  destination?: string;
  x: string;
  y: string;
};

const regions: Region[] = [
  {
    id: "cloud",
    number: "01",
    label: "Cloud / Infrastructure",
    status: "EXPLORING",
    route: "INFRA",
    description:
      "Combining project deployment work with AWS and Google hands-on labs to build practical infrastructure understanding across domains, configuration and services.",
    metadata: "PROJECT WORK / DEPLOYMENT · LAB PRACTICE / AWS + GOOGLE SKILLS",
    x: "18%",
    y: "14%",
  },
  {
    id: "linux",
    number: "02",
    label: "Linux",
    status: "EXPLORED",
    route: "CLI",
    description:
      "Linux is my working environment for CLI workflows, system inspection, networking and infrastructure practice.",
    metadata: "SYSTEM ENVIRONMENT / LINUX MINT",
    destination: "TERMINAL →",
    x: "17%",
    y: "53%",
  },
  {
    id: "systems",
    number: "03",
    label: "Systems",
    status: "EXPLORED",
    route: "FLOW",
    description:
      "Following how requests move through applications and where identity, services, data and infrastructure meet.",
    metadata: "PROJECT WORK / THE MIDDLEMAN",
    destination: "REQUEST FLOW →",
    x: "64%",
    y: "37%",
  },
  {
    id: "security",
    number: "04",
    label: "Security",
    status: "EXPLORING",
    route: "BOUNDARY",
    description:
      "Practicing defensive security through application architecture and hands-on lab environments.",
    metadata: "APPLICATION SECURITY · HANDS-ON LAB / TRYHACKME",
    x: "38%",
    y: "68%",
  },
  {
    id: "ai",
    number: "05",
    label: "AI",
    status: "EXPLORED",
    route: "MODELS",
    description:
      "Personal architecture experiments in orchestration, permissions, local/cloud decisions and multi-agent critique.",
    metadata: "SYSTEM EXPERIMENT / S.A.M.U.E.L. + SYNAPSE",
    destination: "S.A.M.U.E.L. ↘ SYNAPSE",
    x: "85%",
    y: "86%",
  },
];

const terminalHistory: Record<TerminalCommand, string> = {
  help: `Available commands:\nhelp\nwhoami\nabout\nls\nprojects\ncloud\nlinux\nsystems\nai\nnetwork\nsecurity\ncontact\nclear\nhistory\ndate\npwd\necho\nexplore\ncoffee`,
  whoami:
    "Samuel Oluwabukunmi Oguntona / Buks Samuel\nI build software and follow the systems underneath it.\nInformation Systems · Obafemi Awolowo University · Nigeria",
  about:
    "I build software, study the systems underneath it, and am beginning to investigate AI evaluation, reliability and safety.",
  ls: "projects/\nresearch/\nnow.txt",
  projects: "the-middleman\nsamuel\nsynapse",
  cloud:
    "Current focus: compute, identity, deployment, resilience, observability and infrastructure design.",
  linux:
    "Interests include processes, services, permissions, networking tools, shell workflows, monitoring and system inspection.",
  systems:
    "Systems thinking is the lens: CPU, memory, storage, networking, services, databases and how they connect in practice.",
  ai: "Exploration includes orchestration, agents, model critique, local/cloud trade-offs and automation patterns.",
  network:
    "The network path matters: request flow, DNS, trust boundaries, latency, routing and service communication.",
  security:
    "Security is part of the architecture: permissions, trust boundaries, least privilege and understanding risk early.",
  contact:
    "Email: samuelbukumni@gmail.com\nLinkedIn: https://www.linkedin.com/in/oguntona-samuel/\nGitHub: https://github.com/samuelbukumni",
  clear: "",
  history: "",
  date: new Date().toString(),
  pwd: "/home/buks/portfolio (simulated)",
  echo: "Use echo to print a message. Try: echo cloud",
  explore:
    "Open the systems map, terminal or model critique flow to inspect my work.",
  coffee: "command not found. Try malt.",
  curious:
    "samuel@portfolio:~$ still curious?\n\nKeep pulling on the threads. The best way to learn a system is to build it, break it, and see what breaks with it.\nEmail: samuelbukumni@gmail.com",
};

const portfolioFiles: Record<string, string> = {
  "projects/middleman.md":
    "THE MIDDLEMAN / In development\nNigeria-focused escrow-backed marketplace.\nBuyer → payment → escrow → seller delivery → approval → settlement.\nMy work: account workflows, authentication, database design, payments, reviews and deployment.\nNext.js / TypeScript / Supabase / PostgreSQL / Vercel",
  "projects/samuel.md":
    "SAMUEL / Experimental\nSmart Autonomous Multifunctional Utility Engine for Learning.\nUser → Governor → permission check → sub-agents.\nLocal tools, cloud models and context. Python / hybrid local + cloud.",
  "projects/synapse.md":
    "SYNAPSE / Experimental\nIndependent models → blind brainstorm → critique → revision.\nThe orchestrator owns state. No forced consensus.",
  "research/ai-safety.md":
    "AI EVALUATION & SAFETY / New research direction, 2026\nI am beginning to study evaluation, reliability and agent behaviour.\nQuestions: When does critique improve an answer? How do we detect failure? Where should human oversight enter?\nThis is a learning and research direction, not a claim of established research credentials.",
  "now.txt":
    "September 2026\nBUILDING: The Middleman\nLEARNING: Cloud infrastructure, Linux, networking and security\nRESEARCH DIRECTION: AI evaluation, reliability and safety\nSTUDYING: Information Systems at Obafemi Awolowo University, Nigeria",
};

const explorerNodes: ExplorerNode[] = [
  {
    id: "request",
    label: "User",
    layer: "ORIGIN",
    description: "A request starts at the edge and moves through the stack.",
  },
  {
    id: "dns",
    label: "DNS / Network",
    layer: "NETWORK",
    description:
      "Name resolution, routing and connectivity guide traffic to the right service.",
  },
  {
    id: "auth",
    label: "Auth",
    layer: "IDENTITY",
    description:
      "Identity and permissions define what the request is allowed to do.",
  },
  {
    id: "app",
    label: "Application",
    layer: "APPLICATION",
    description: "The product layer translates intent into behavior and flow.",
  },
  {
    id: "api",
    label: "API / Service",
    layer: "SERVICE",
    description:
      "Requests fan out to services, business rules and underlying infrastructure.",
  },
  {
    id: "data",
    label: "Database / Storage",
    layer: "DATA",
    description:
      "Persistent state, retrieval and resource boundaries define the system runtime.",
  },
  {
    id: "observe",
    label: "Monitoring",
    layer: "OBSERVABILITY",
    description: "Logs and signals make performance and reliability visible.",
  },
];

const synapseStages = [
  "Prompt",
  "Perspective A",
  "Perspective B",
  "Perspective C",
  "Critique",
  "Revision",
  "Result",
];

type ExplorerLocation = { view: ExplorerView; regionShell: boolean };

const viewFromHash = (hash: string): ExplorerLocation => {
  const rawValue = hash.replace(/^#/, "");
  const regionShell = rawValue.startsWith("region/");
  const value = (
    regionShell ? rawValue.slice("region/".length) : rawValue
  ) as ExplorerView;
  const view = [
    "map",
    "cloud",
    "linux",
    "terminal",
    "systems",
    "security",
    "ai",
    "samuel",
    "synapse",
  ].includes(value)
    ? value
    : "map";
  return {
    view,
    regionShell:
      regionShell &&
      ["cloud", "linux", "systems", "security", "ai"].includes(view),
  };
};

function ExplorerMap({ onOpen }: { onOpen: (view: ExplorerView) => void }) {
  return (
    <section
      className="explorer-map-view atlas-view"
      aria-labelledby="explorer-map-title"
    >
      <div className="explorer-intro atlas-intro">
        <h1 id="explorer-map-title" tabIndex={-1}>
          Explorer
        </h1>
        <p>
          A working index of the systems, tools and ideas I&apos;m learning,
          testing and building.
        </p>
      </div>

      <ol className="atlas-route" aria-label="Technical territories">
        <li className="atlas-stop atlas-stop-cloud">
          <span className="atlas-marker" aria-hidden="true">
            <span>01</span>
          </span>
          <div className="atlas-content">
            <button
              type="button"
              className="atlas-territory"
              onClick={() => onOpen("cloud")}
            >
              <h2>
                Cloud &amp; Infrastructure <span aria-hidden="true">↗</span>
              </h2>
              <p>Deployment, DNS, services and hands-on cloud labs.</p>
              <small>
                AWS Skill Builder · Google Skills · Vercel · Supabase
              </small>
            </button>
          </div>
        </li>
        <li className="atlas-stop atlas-stop-linux">
          <span className="atlas-marker" aria-hidden="true">
            <span>02</span>
          </span>
          <div className="atlas-content">
            <button
              type="button"
              className="atlas-territory"
              onClick={() => onOpen("linux")}
            >
              <h2>
                Linux <span aria-hidden="true">↗</span>
              </h2>
              <p>
                Linux Mint, processes, networking, filesystem and terminal work.
              </p>
              <small>Linux Mint · CLI · services · packages · networking</small>
            </button>
            <button
              type="button"
              className="atlas-action"
              onClick={() => onOpen("terminal")}
            >
              Enter Terminal <span aria-hidden="true">→</span>
            </button>
          </div>
        </li>
        <li className="atlas-stop atlas-stop-systems">
          <span className="atlas-marker" aria-hidden="true">
            <span>03</span>
          </span>
          <div className="atlas-content">
            <button
              type="button"
              className="atlas-territory"
              onClick={() => onOpen("systems")}
            >
              <h2>
                Systems <span aria-hidden="true">↗</span>
              </h2>
              <p>
                Request lifecycles, service boundaries, transaction flows and
                architecture.
              </p>
              <small>The Middleman · request flow · transactions</small>
            </button>
            <button
              type="button"
              className="atlas-action"
              onClick={() => onOpen("systems")}
            >
              Open Request Flow <span aria-hidden="true">→</span>
            </button>
          </div>
        </li>
        <li className="atlas-stop atlas-stop-security">
          <span className="atlas-marker" aria-hidden="true">
            <span>04</span>
          </span>
          <div className="atlas-content">
            <button
              type="button"
              className="atlas-territory"
              onClick={() => onOpen("security")}
            >
              <h2>
                Security <span aria-hidden="true">↗</span>
              </h2>
              <p>
                Application security, trust boundaries and defensive hands-on
                labs.
              </p>
              <small>
                TryHackMe · application security · validation · permissions
              </small>
            </button>
          </div>
        </li>
        <li className="atlas-stop atlas-stop-ai">
          <span className="atlas-marker" aria-hidden="true">
            <span>05</span>
          </span>
          <div className="atlas-content">
            <button
              type="button"
              className="atlas-territory"
              onClick={() => onOpen("ai")}
            >
              <h2>
                AI Systems <span aria-hidden="true">↗</span>
              </h2>
              <p>
                Orchestration, permissions, multi-agent reasoning and autonomous
                systems.
              </p>
            </button>
            <div
              className="atlas-actions"
              role="group"
              aria-label="AI Systems destinations"
            >
              <button
                type="button"
                className="atlas-action"
                onClick={() => onOpen("samuel")}
              >
                S.A.M.U.E.L. <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                className="atlas-action"
                onClick={() => onOpen("synapse")}
              >
                SYNAPSE <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </li>
      </ol>
    </section>
  );
}

function RegionShell({
  region,
  onMap,
  children,
}: {
  region: Region;
  onMap: () => void;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`explorer-region explorer-region-${region.id}`}
      aria-labelledby={`${region.id}-region-title`}
    >
      <button type="button" className="return-map" onClick={onMap}>
        ← MAP
      </button>
      <div className="region-heading">
        <p className="section-kicker">EXPLORER / MAP / {region.label}</p>
        <h1 id={`${region.id}-region-title`}>{region.label}</h1>
        <p className="region-status">Status / {region.status}</p>
        <p className="region-description">{region.description}</p>
        <p className="region-evidence">{region.metadata}</p>
      </div>
      {children}
    </section>
  );
}

function CloudRegion() {
  const nodes = [
    "User",
    "DNS / domain",
    "HTTPS",
    "Deployment / edge",
    "Application",
    "API / service",
    "Database / storage",
  ];
  return (
    <div className="region-artifact cloud-artifact">
      <section
        className="cloud-project-path"
        aria-labelledby="cloud-project-heading"
      >
        <div className="artifact-label">
          <h2 id="cloud-project-heading">
            Project path / application infrastructure
          </h2>
          <span>PROJECT WORK / DEPLOYMENT</span>
        </div>
        <ol
          className="cloud-flow"
          aria-label="Project application request path"
        >
          {nodes.map((node) => (
            <li key={node}>{node}</li>
          ))}
        </ol>
        <div className="artifact-notes">
          <span>THE MIDDLEMAN</span>
          <span>FRONTEND ↔ BACKEND</span>
          <span>ENV / AUTH</span>
          <span>DOMAIN / DNS / HTTPS</span>
          <span>VERCEL / SUPABASE</span>
          <span>DEPLOYMENT / SERVICE CONFIG / TROUBLESHOOTING</span>
        </div>
        <aside className="field-note" aria-label="Cloud field note">
          <span>FIELD NOTE / CLOUD 01</span>
          <p>
            Project deployments connect domains, HTTPS, environment
            configuration and application services.
          </p>
        </aside>
      </section>
      <section className="cloud-lab-track" aria-labelledby="cloud-lab-heading">
        <div className="artifact-label">
          <h2 id="cloud-lab-heading">Practice environments</h2>
          <span>LAB PRACTICE</span>
        </div>
        <ul>
          <li>AWS Skill Builder</li>
          <li>Google Skills / hands-on labs</li>
        </ul>
      </section>
    </div>
  );
}

function SecurityRegion() {
  const streams = [
    "01",
    "0A",
    "10",
    "AUTH",
    "11",
    "01",
    "RLS",
    "0F",
    "10",
    "KEY",
    "01",
    "00",
  ];
  return (
    <div className="security-environment">
      <div className="matrix-streams" aria-hidden="true">
        {streams.map((stream, index) => (
          <span
            key={`${stream}-${index}`}
            style={{ animationDelay: `${index * -0.43}s` }}
          >
            {stream}
          </span>
        ))}
      </div>
      <div className="security-content">
        <div className="security-evidence">
          <p className="security-access">APPLICATION SECURITY / PROJECT WORK</p>
          <p className="security-access">HANDS-ON LAB PRACTICE / TRYHACKME</p>
        </div>
        <div className="security-flow">
          <span>User</span>
          <b>↓</b>
          <span>Authentication</span>
          <b>↓</b>
          <span>Authorization</span>
          <b>↓</b>
          <span>Application</span>
          <b>↓</b>
          <span>Data</span>
        </div>
        <div className="security-boundary">TRUST BOUNDARY</div>
        <div className="security-notes">
          <span>SECRETS / ENV</span>
          <span>HTTPS</span>
          <span>INPUT VALIDATION</span>
          <span>PERMISSIONS</span>
          <span>DATABASE / RLS</span>
          <span>LEAST PRIVILEGE</span>
          <span>ATTACK SURFACE</span>
        </div>
      </div>
    </div>
  );
}

function SamuelRegion() {
  const [task, setTask] = useState("summarize a local log");
  const routes: Record<
    string,
    {
      decision: "ALLOW" | "ASK" | "DENY";
      route: "LOCAL" | "CLOUD" | "NO EXECUTION";
    }
  > = {
    "summarize a local log": { decision: "ALLOW", route: "LOCAL" },
    "compare public model notes": { decision: "ALLOW", route: "CLOUD" },
    "draft a cloud action": { decision: "ASK", route: "NO EXECUTION" },
    "share private context": { decision: "DENY", route: "NO EXECUTION" },
  };
  return (
    <div className="region-artifact samuel-artifact">
      <div className="artifact-label">
        Architecture demonstration / deterministic
      </div>
      <div className="samuel-topology">
        <span>User</span>
        <b>↓</b>
        <strong>Governor</strong>
        <b>↓</b>
        <div className="samuel-branches">
          <span>Permissions</span>
          <span>Local tools</span>
          <span>Cloud models</span>
          <span>Context</span>
          <span>Sub-agents</span>
        </div>
      </div>
      <div className="samuel-task">
        <label htmlFor="samuel-task">Task</label>
        <select
          id="samuel-task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        >
          {Object.keys(routes).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div
        className="samuel-routing"
        role="status"
        aria-label="Deterministic Governor decision and route"
      >
        <span>GOVERNOR EVALUATION</span>
        <p>
          <small>DECISION</small>
          <strong>{routes[task].decision}</strong>
          <small>ROUTE</small>
          <strong>{routes[task].route}</strong>
        </p>
      </div>
      <p className="artifact-label samuel-data-handling">
        DATA HANDLING / REDACT · SUMMARIZE · GENERALIZE · DEFER
      </p>
      <p className="artifact-disclaimer">
        A modular personal assistant architecture exploring orchestration,
        permissions and hybrid local/cloud operation. Not a production
        assistant.
      </p>
    </div>
  );
}

export default function PlaygroundExperience() {
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<ExplorerView>("map");
  const [regionShell, setRegionShell] = useState(false);
  const [command, setCommand] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      type: "output",
      text: "Explorer terminal // simulated local session. Type 'help' to begin.",
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState("request");
  const [requestStage, setRequestStage] = useState(-1);
  const [synapseStep, setSynapseStep] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalOutputRef = useRef<HTMLDivElement>(null);
  const previousViewRef = useRef<ExplorerView | null>(null);

  useEffect(() => {
    const syncLocation = () => {
      const location = viewFromHash(window.location.hash);
      setView(location.view);
      setReady(true);
      setRegionShell(
        typeof window.history.state?.explorerRegionShell === "boolean"
          ? window.history.state.explorerRegionShell
          : location.regionShell,
      );
    };
    syncLocation();
    window.addEventListener("hashchange", syncLocation);
    window.addEventListener("popstate", syncLocation);
    return () => {
      window.removeEventListener("hashchange", syncLocation);
      window.removeEventListener("popstate", syncLocation);
    };
  }, []);

  useEffect(() => {
    if (view === "terminal") {
      inputRef.current?.focus({ preventScroll: true });
    } else if (previousViewRef.current && previousViewRef.current !== view) {
      if (view === "map") {
        document.getElementById("explorer-map-title")?.focus();
      } else {
        document.querySelector<HTMLButtonElement>(".return-map")?.focus();
      }
    }
    previousViewRef.current = view;
  }, [view]);

  const openView = (nextView: ExplorerView, openRegionShell = false) => {
    const isRegionShell =
      openRegionShell &&
      ["cloud", "linux", "systems", "security", "ai"].includes(nextView);
    const destination =
      nextView === "map"
        ? "/playground"
        : isRegionShell
          ? `/playground#region/${nextView}`
          : `/playground#${nextView}`;
    window.history.pushState(
      { ...window.history.state, explorerRegionShell: isRegionShell },
      "",
      destination,
    );
    setView(nextView);
    setRegionShell(isRegionShell);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const returnToMap = () => openView("map");

  const selectedNode = useMemo(
    () =>
      explorerNodes.find((node) => node.id === selectedNodeId) ??
      explorerNodes[0],
    [selectedNodeId],
  );

  const processCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      return;
    }

    const normalized = trimmed.toLowerCase();
    const [baseCommand, ...rest] = normalized.split(/\s+/);
    let outputText: string | undefined = Object.hasOwn(
      terminalHistory,
      baseCommand,
    )
      ? terminalHistory[baseCommand as TerminalCommand]
      : undefined;
    if (normalized === "still curious?" || normalized === "curious") {
      outputText = "samuel@portfolio:~$ still curious?\n\nKeep pulling on the threads. The best way to learn a system is to build it, break it, and see what breaks with it.\nEmail: samuelbukumni@gmail.com";
    }
    if (baseCommand === "help")
      outputText +=
        "\n\nPortfolio files:\nls projects/\nls research/\ncat projects/middleman.md\ncat projects/samuel.md\ncat projects/synapse.md\ncat research/ai-safety.md\ncat now.txt\nsystemctl status samuel\ncurious\n\nThis is a simulation. No shell commands are executed.";
    if (baseCommand === "ls" && rest.length) {
      const directory = rest.join(" ").replace(/\/$/, "");
      outputText =
        directory === "projects"
          ? "middleman.md\nsamuel.md\nsynapse.md"
          : directory === "research"
            ? "ai-safety.md"
            : "Directory not found. Try ls projects/ or ls research/.";
    }
    if (baseCommand === "cat")
      outputText = Object.hasOwn(portfolioFiles, rest.join(" "))
        ? portfolioFiles[rest.join(" ")]
        : "File not found. Type ls to inspect available files.";
    if (normalized === "systemctl status samuel")
      outputText =
        "samuel.portfolio — simulated status\nActive: building and learning\nCurrent build: The Middleman\nEngineering direction: cloud / Linux / infrastructure\nResearch direction: AI evaluation & safety\nNo system service is being inspected.";
    if (baseCommand === "date") outputText = new Date().toString();
    const nextHistory = [...history, trimmed];
    let nextEntries: TerminalEntry[] = [
      ...entries,
      { type: "command", text: `$ ${trimmed}` },
      ...(outputText === undefined
        ? [
            {
              type: "error",
              text: `command not found: ${baseCommand}`,
            } as TerminalEntry,
          ]
        : [{ type: "output", text: outputText } as TerminalEntry]),
    ];

    if (baseCommand === "clear") {
      nextEntries = [{ type: "output", text: "Terminal cleared." }];
    }

    if (baseCommand === "history") {
      nextEntries = [
        ...nextEntries,
        {
          type: "output",
          text:
            history.length > 0 ? history.join("\n") : "No previous commands.",
        } as TerminalEntry,
      ];
    }

    if (baseCommand === "echo" && rest.length > 0) {
      const echoValue = rest.join(" ");
      nextEntries = [
        ...nextEntries,
        { type: "output", text: echoValue } as TerminalEntry,
      ];
    }

    setEntries(nextEntries);
    setHistory(nextHistory);
    setHistoryIndex(null);
    setCommand("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    processCommand(command);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHistoryIndex((current) => {
        if (current === null) {
          return history.length > 0 ? history.length - 1 : 0;
        }
        return current > 0 ? current - 1 : 0;
      });
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHistoryIndex((current) => {
        if (current === null) {
          return null;
        }
        return current < history.length - 1 ? current + 1 : null;
      });
    }
  };

  const advanceRequest = () => {
    const nextStage =
      requestStage >= explorerNodes.length - 1 ? -1 : requestStage + 1;
    setRequestStage(nextStage);
    setSelectedNodeId(explorerNodes[nextStage < 0 ? 0 : nextStage].id);
  };

  useEffect(() => {
    if (historyIndex === null) {
      setCommand("");
      return;
    }

    const value = history[historyIndex];
    if (value !== undefined) {
      setCommand(value);
    }
  }, [history, historyIndex]);

  useEffect(() => {
    const output = terminalOutputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [entries]);

  const terminalPanel = (
    <div
      className="terminal-panel"
      role="group"
      aria-label="Simulated terminal panel"
    >
      <div className="terminal-header">
        <span />
        <span />
        <span />
      </div>
      <div
        ref={terminalOutputRef}
        className="terminal-output"
        role="log"
        aria-label="Terminal output"
        aria-live="polite"
      >
        {entries.map((entry, index) => (
          <div
            key={`${entry.type}-${index}`}
            className={`terminal-line ${entry.type}`}
          >
            {entry.text.split("\n").map((line, lineIndex) => (
              <span key={`${entry.type}-${index}-${lineIndex}`}>{line}</span>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-form">
        <label className="sr-only" htmlFor="playground-command">
          Terminal command
        </label>
        <span className="prompt-symbol">samuel@portfolio:~$</span>
        <input
          id="playground-command"
          ref={inputRef}
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          placeholder="Try: help"
        />
        <button type="submit">Run ↵</button>
      </form>
      <div className="terminal-help">
        <span>Try a command</span>
        <button type="button" onClick={() => processCommand("help")}>
          help
        </button>
        <button type="button" onClick={() => processCommand("whoami")}>
          whoami
        </button>
        <button type="button" onClick={() => processCommand("ls projects/")}>
          ls projects/
        </button>
        <button type="button" onClick={() => processCommand("cat now.txt")}>
          cat now.txt
        </button>
        <button
          type="button"
          onClick={() => processCommand("cat research/ai-safety.md")}
        >
          research
        </button>
      </div>
    </div>
  );

  const systemsPanel = (
    <div className="systems-panel explorer-panel">
      <div className="panel-heading">
        <p className="section-kicker">
          APPLICATION + INFRASTRUCTURE INTERACTION
        </p>
        <h2>Request lifecycle</h2>
      </div>
      <div className="flow-map" role="group" aria-label="Request flow stages">
        {explorerNodes.map((node, index) => (
          <button
            key={node.id}
            type="button"
            className={`flow-node ${selectedNodeId === node.id ? "active" : ""} ${requestStage >= index ? "is-complete" : ""}`}
            onClick={() => setSelectedNodeId(node.id)}
          >
            <span className="flow-node-layer">{node.layer}</span>
            <span>{node.label}</span>
          </button>
        ))}
      </div>
      <div className="flow-detail" aria-live="polite">
        <h3>{selectedNode.label}</h3>
        <p>{selectedNode.description}</p>
      </div>
      <p className="systems-evidence">
        <span>FIELD NOTE / SYSTEMS 01 · PROJECT WORK</span>AUTHENTICATION · ENV
        CONFIGURATION · DATABASE ACCESS · DEPLOYMENT · SERVICE BOUNDARIES
      </p>
      <button
        type="button"
        className="explorer-action"
        onClick={advanceRequest}
      >
        {requestStage < 0
          ? "Start request →"
          : requestStage >= explorerNodes.length - 1
            ? "Reset request →"
            : `Continue to ${explorerNodes[requestStage + 1]?.label ?? "next stage"} →`}
      </button>
    </div>
  );

  const synapsePanel = (
    <section
      className="synapse-panel explorer-panel"
      aria-labelledby="synapse-title"
    >
      <div className="panel-heading">
        <p className="section-kicker">AI / SYNAPSE</p>
        <h2 id="synapse-title">Independent perspectives with revision.</h2>
      </div>
      <div className="synapse-flow" role="group" aria-label="Multi-model flow">
        <div className={`synapse-stage ${synapseStep === 0 ? "active" : ""}`}>
          {synapseStages[0]}
        </div>
        <div
          className="synapse-branch"
          role="group"
          aria-label="Three independent perspectives"
        >
          {synapseStages.slice(1, 4).map((stage, offset) => (
            <div
              key={stage}
              className={`synapse-stage ${synapseStep === offset + 1 ? "active" : ""}`}
            >
              {stage}
            </div>
          ))}
        </div>
        {synapseStages.slice(4).map((stage, offset) => (
          <div
            key={stage}
            className={`synapse-stage ${synapseStep === offset + 4 ? "active" : ""}`}
          >
            {stage}
          </div>
        ))}
      </div>
      <div className="synapse-controls">
        <p>
          Prompt → independent perspectives → critique → revision → result. No
          forced consensus.
        </p>
        <button
          type="button"
          onClick={() =>
            setSynapseStep((current) => (current + 1) % synapseStages.length)
          }
        >
          Advance
        </button>
      </div>
    </section>
  );

  const region = regions.find((candidate) => candidate.id === view);

  return (
    <main
      id="main"
      data-scroll-ready={ready}
      className={`playground-shell explorer-shell ${view === "map" ? "explorer-root" : ""} ${view === "security" && !regionShell ? "is-security" : ""}`}
    >
      {view === "map" && (
        <ExplorerMap onOpen={(nextView) => openView(nextView)} />
      )}
      {regionShell && region && (
        <RegionShell region={region} onMap={returnToMap} />
      )}
      {!regionShell && view === "cloud" && region && (
        <RegionShell region={region} onMap={returnToMap}>
          <CloudRegion />
        </RegionShell>
      )}
      {!regionShell && view === "linux" && region && (
        <RegionShell region={region} onMap={returnToMap}>
          <div className="region-artifact linux-artifact">
            <div className="linux-meta">
              <span>HOST / LATITUDE-E5410</span>
              <span>OS / LINUX MINT</span>
              <span>STATE / ACTIVE</span>
            </div>
            <p>
              My working environment for CLI workflows, system inspection,
              networking and infrastructure practice.
            </p>
            <div className="linux-domains">
              <span>FILESYSTEM</span>
              <span>PROCESSES</span>
              <span>STORAGE</span>
              <span>PERMISSIONS</span>
              <span>NETWORK</span>
              <span>SERVICES</span>
              <span>PACKAGES</span>
              <span>CLI</span>
            </div>
            <button
              type="button"
              className="explorer-action"
              onClick={() => openView("terminal")}
            >
              LINUX → TERMINAL
            </button>
          </div>
        </RegionShell>
      )}
      {!regionShell && view === "terminal" && (
        <section className="terminal-destination">
          <button
            type="button"
            className="return-map"
            onClick={() => openView("linux")}
          >
            ← LINUX
          </button>
          <div className="region-heading">
            <p className="section-kicker">EXPLORER / LINUX / TERMINAL</p>
            <h1>Simulated local terminal</h1>
            <p className="region-description">
              A safe, whitelisted command surface for exploring the ideas behind
              this map.
            </p>
          </div>
          {terminalPanel}
        </section>
      )}
      {!regionShell && view === "systems" && region && (
        <RegionShell region={region} onMap={returnToMap}>
          <div className="region-artifact systems-artifact">{systemsPanel}</div>
        </RegionShell>
      )}
      {!regionShell && view === "security" && region && (
        <RegionShell region={region} onMap={returnToMap}>
          <SecurityRegion />
        </RegionShell>
      )}
      {!regionShell && view === "ai" && region && (
        <RegionShell region={region} onMap={returnToMap}>
          <div className="ai-destinations">
            <button type="button" onClick={() => openView("samuel")}>
              <span>SYSTEM EXPERIMENT / S.A.M.U.E.L.</span>
              <strong>S.A.M.U.E.L.</strong>
              <small>
                Orchestration through a Governor, permissions and local/cloud
                routes.
              </small>
            </button>
            <button type="button" onClick={() => openView("synapse")}>
              <span>SYSTEM EXPERIMENT / SYNAPSE</span>
              <strong>SYNAPSE</strong>
              <small>
                Independent perspectives remain distinct through critique and
                revision.
              </small>
            </button>
          </div>
        </RegionShell>
      )}
      {!regionShell && view === "samuel" && (
        <section className="destination-section">
          <button
            type="button"
            className="return-map"
            onClick={() => openView("ai")}
          >
            ← AI
          </button>
          <div className="region-heading">
            <p className="section-kicker">EXPLORER / AI / S.A.M.U.E.L.</p>
            <h1>
              Smart Autonomous Multifunctional Utility Engine for Learning
            </h1>
            <p className="region-description">
              A modular personal assistant architecture built around
              orchestration, permissions and hybrid local/cloud operation.
            </p>
          </div>
          <SamuelRegion />
        </section>
      )}
      {!regionShell && view === "synapse" && (
        <section className="destination-section">
          <button
            type="button"
            className="return-map"
            onClick={() => openView("ai")}
          >
            ← AI
          </button>
          <div className="region-heading">
            <p className="section-kicker">EXPLORER / AI / SYNAPSE</p>
            <h1>Independent perspectives with revision.</h1>
            <p className="region-description">
              A deterministic model for discussion where disagreement remains
              visible instead of being forced into consensus.
            </p>
          </div>
          {synapsePanel}
        </section>
      )}
    </main>
  );
}
