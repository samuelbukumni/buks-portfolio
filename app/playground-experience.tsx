"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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
  | "coffee";

type TerminalEntry = {
  type: "command" | "output" | "error";
  text: string;
};

type ExplorerNode = {
  id: string;
  label: string;
  description: string;
};

const terminalHistory: Record<TerminalCommand, string> = {
  help: `Available commands:\nhelp\nwhoami\nabout\nls\nprojects\ncloud\nlinux\nsystems\nai\nnetwork\nsecurity\ncontact\nclear\nhistory\ndate\npwd\necho\nexplore\ncoffee`,
  whoami: "Samuel Oluwabukunmi Oguntona\nTech Explorer\nCloud · Linux · Infrastructure · Systems · AI",
  about:
    "Samuel is interested in the layers beneath applications: infrastructure, operating systems, networking, services, deployment, and the systems that keep ideas operational.",
  ls: "projects/\nsystems/\ncloud/\nexperiments/\nabout/",
  projects: "the-middleman\nsamuel\nsynapse",
  cloud: "Current focus: compute, identity, deployment, resilience, observability and infrastructure design.",
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
  pwd: "/playground",
  echo: "Use echo to print a message. Try: echo cloud",
  explore: "Explore the systems map, the terminal and the model critique flow to understand how Samuel thinks.",
  coffee: "command not found. Try malt.",
};

const explorerNodes: ExplorerNode[] = [
  {
    id: "request",
    label: "User",
    description: "A request starts at the edge and moves through the stack.",
  },
  {
    id: "dns",
    label: "DNS / Network",
    description: "Name resolution, routing and connectivity guide traffic to the right service.",
  },
  {
    id: "auth",
    label: "Auth",
    description: "Identity and permissions define what the request is allowed to do.",
  },
  {
    id: "app",
    label: "Application",
    description: "The product layer translates intent into behavior and flow.",
  },
  {
    id: "api",
    label: "API / Service",
    description: "Requests fan out to services, business rules and underlying infrastructure.",
  },
  {
    id: "data",
    label: "Database / Storage",
    description: "Persistent state, retrieval and resource boundaries define the system runtime.",
  },
  {
    id: "observe",
    label: "Monitoring",
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

export default function PlaygroundExperience() {
  const [command, setCommand] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([
    { type: "output", text: "Welcome to the playground. Type 'help' to begin." },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState("request");
  const [synapseStep, setSynapseStep] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const selectedNode = useMemo(
    () => explorerNodes.find((node) => node.id === selectedNodeId) ?? explorerNodes[0],
    [selectedNodeId],
  );

  const processCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      return;
    }

    const normalized = trimmed.toLowerCase();
    const [baseCommand, ...rest] = normalized.split(/\s+/);
    const outputText = terminalHistory[baseCommand as TerminalCommand];
    const nextHistory = [...history, trimmed];
    let nextEntries: TerminalEntry[] = [
      ...entries,
      { type: "command", text: `$ ${trimmed}` },
      ...(outputText === undefined
        ? [{ type: "error", text: `command not found: ${baseCommand}` } as TerminalEntry]
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
          text: history.length > 0 ? history.join("\n") : "No previous commands.",
        } as TerminalEntry,
      ];
    }

    if (baseCommand === "echo" && rest.length > 0) {
      const echoValue = rest.join(" ");
      nextEntries = [...nextEntries, { type: "output", text: echoValue } as TerminalEntry];
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

  return (
    <main className="playground-shell">
      <header className="playground-header">
        <Link href="/" className="wordmark">Buks Samuel</Link>
        <nav aria-label="Playground navigation">
          <Link href="/">Back to portfolio</Link>
        </nav>
      </header>

      <section className="playground-hero">
        <div>
          <p className="section-kicker">Playground</p>
          <h1>Systems, cloud and experiments in context.</h1>
        </div>
        <p>
          This space is for curious inspection: the layers below the app, the systems behind the interface, and the thinking models behind AI workflows.
        </p>
      </section>

      <section className="playground-grid">
        <div className="terminal-panel" aria-label="Simulated terminal panel">
          <div className="terminal-header">
            <span />
            <span />
            <span />
          </div>
          <div className="terminal-output" aria-live="polite">
            {entries.map((entry, index) => (
              <div key={`${entry.type}-${index}`} className={`terminal-line ${entry.type}`}>
                {entry.text.split("\n").map((line, lineIndex) => (
                  <span key={`${entry.type}-${index}-${lineIndex}`}>{line}</span>
                ))}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="terminal-form">
            <label className="sr-only" htmlFor="playground-command">Terminal command</label>
            <span className="prompt-symbol">$</span>
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
          </form>
          <div className="terminal-help">
            <span>Try a command</span>
            <button type="button" onClick={() => processCommand("help")}>help</button>
            <button type="button" onClick={() => processCommand("whoami")}>whoami</button>
            <button type="button" onClick={() => processCommand("cloud")}>cloud</button>
            <button type="button" onClick={() => processCommand("coffee")}>coffee</button>
          </div>
        </div>

        <div className="systems-panel">
          <div className="panel-heading">
            <p className="section-kicker">Systems exploration</p>
            <h2>How a request travels</h2>
          </div>

          <div className="flow-map" aria-label="Request flow map">
            {explorerNodes.map((node) => (
              <button
                key={node.id}
                type="button"
                className={`flow-node ${selectedNodeId === node.id ? "active" : ""}`}
                onClick={() => setSelectedNodeId(node.id)}
              >
                {node.label}
              </button>
            ))}
          </div>

          <div className="flow-detail" aria-live="polite">
            <h3>{selectedNode.label}</h3>
            <p>{selectedNode.description}</p>
          </div>
        </div>
      </section>

      <section className="synapse-panel" aria-labelledby="synapse-title">
        <div className="panel-heading">
          <p className="section-kicker">AI / SYNAPSE</p>
          <h2 id="synapse-title">Independent perspectives with revision.</h2>
        </div>

        <div className="synapse-flow" aria-label="Multi-model flow">
          {synapseStages.map((stage, index) => (
            <div
              key={stage}
              className={`synapse-stage ${index === synapseStep ? "active" : ""}`}
            >
              {stage}
            </div>
          ))}
        </div>

        <div className="synapse-controls">
          <p>
            Prompt → independent perspectives → critique → revision → result. No forced consensus.
          </p>
          <button type="button" onClick={() => setSynapseStep((current) => (current + 1) % synapseStages.length)}>
            Advance
          </button>
        </div>
      </section>
    </main>
  );
}
