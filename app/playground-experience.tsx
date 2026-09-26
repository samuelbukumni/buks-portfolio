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

type RegionId = Exclude<ExplorerView, "map" | "terminal" | "samuel" | "synapse">;

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

type MapRoute = { from: RegionId; to: RegionId; path: string };

const regions: Region[] = [
  {
    id: "cloud",
    number: "01",
    label: "Cloud / Infrastructure",
    status: "EXPLORING",
    route: "INFRA",
    description: "Combining project deployment work with AWS and Google hands-on labs to build practical infrastructure understanding across domains, configuration and services.",
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
    description: "Linux is my working environment for CLI workflows, system inspection, networking and infrastructure practice.",
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
    description: "Following how requests move through applications and where identity, services, data and infrastructure meet.",
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
    description: "Practicing defensive security through application architecture and hands-on lab environments.",
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
    description: "Personal architecture experiments in orchestration, permissions, local/cloud decisions and multi-agent critique.",
    metadata: "SYSTEM EXPERIMENT / S.A.M.U.E.L. + SYNAPSE",
    destination: "S.A.M.U.E.L. ↘ SYNAPSE",
    x: "85%",
    y: "86%",
  },
];

const mapRoutes: MapRoute[] = [
  { from: "cloud", to: "linux", path: "M18 14 C18 28 17 40 17 53" },
  { from: "cloud", to: "systems", path: "M18 14 C32 21 48 30 64 37" },
  { from: "linux", to: "systems", path: "M17 53 C31 49 47 42 64 37" },
  { from: "linux", to: "security", path: "M17 53 C24 59 31 65 38 68" },
  { from: "systems", to: "security", path: "M64 37 C56 49 47 61 38 68" },
  { from: "security", to: "ai", path: "M38 68 C51 76 69 84 85 86" },
];

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
    layer: "ORIGIN",
    description: "A request starts at the edge and moves through the stack.",
  },
  {
    id: "dns",
    label: "DNS / Network",
    layer: "NETWORK",
    description: "Name resolution, routing and connectivity guide traffic to the right service.",
  },
  {
    id: "auth",
    label: "Auth",
    layer: "IDENTITY",
    description: "Identity and permissions define what the request is allowed to do.",
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
    description: "Requests fan out to services, business rules and underlying infrastructure.",
  },
  {
    id: "data",
    label: "Database / Storage",
    layer: "DATA",
    description: "Persistent state, retrieval and resource boundaries define the system runtime.",
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
  const value = (regionShell ? rawValue.slice("region/".length) : rawValue) as ExplorerView;
  const view = ["map", "cloud", "linux", "terminal", "systems", "security", "ai", "samuel", "synapse"].includes(value)
    ? value
    : "map";
  return { view, regionShell: regionShell && ["cloud", "linux", "systems", "security", "ai"].includes(view) };
};

function ExplorerMap({ visitedRegions, onOpen }: { visitedRegions: RegionId[]; onOpen: (view: ExplorerView) => void }) {
  const [focusedRegion, setFocusedRegion] = useState<RegionId | null>(null);
  const isRelatedRegion = (regionId: RegionId) => focusedRegion !== null && mapRoutes.some((route) =>
    (route.from === focusedRegion && route.to === regionId)
    || (route.to === focusedRegion && route.from === regionId),
  );
  return (
    <section className="explorer-map-view" aria-labelledby="explorer-map-title">
      <div className="explorer-intro">
        <p className="section-kicker">BUKS TECHNICAL MAP / REV. 01</p>
        <h1 id="explorer-map-title" tabIndex={-1}>Explorer</h1>
        <p>A map of the systems, tools and ideas I&apos;m actively working through.</p>
      </div>

      <p className="map-stage-label">THE MAP / PRIMARY ROUTES</p>
      <div className="map-stage">
        <svg className="map-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {mapRoutes.map((route) => <path key={`${route.from}-${route.to}`} className={focusedRegion && (route.from === focusedRegion || route.to === focusedRegion) ? "is-active" : ""} d={route.path} />)}
        </svg>
        {regions.map((region) => (
          <button
            key={region.id}
            type="button"
            className={`map-region map-region-${region.id} ${visitedRegions.includes(region.id) ? "is-visited" : ""} ${isRelatedRegion(region.id) ? "is-related" : ""} ${focusedRegion && focusedRegion !== region.id && !isRelatedRegion(region.id) ? "is-dimmed" : ""}`}
            style={{ left: region.x, top: region.y }}
            onClick={() => onOpen(region.id)}
            onMouseEnter={() => setFocusedRegion(region.id)}
            onMouseLeave={() => setFocusedRegion(null)}
            onFocus={() => setFocusedRegion(region.id)}
            onBlur={() => setFocusedRegion(null)}
            aria-label={`Enter region ${region.number}, ${region.label}, status ${region.status}, ${region.metadata}${region.destination ? `, destination ${region.destination}` : ""}`}
          >
            <span className="map-marker" aria-hidden="true" />
            <span className="map-region-copy">
              <span className="map-region-number">REGION {region.number}</span>
              <strong>{region.label}</strong>
              <span className="map-region-status">STATUS / {region.status}</span>
              <small className="map-region-meta">{region.metadata}</small>
              {region.destination && <small className="map-region-destination">{region.destination}</small>}
            </span>
          </button>
        ))}
      </div>
      <p className="map-context" aria-live="polite">
        {focusedRegion ? regions.find((region) => region.id === focusedRegion)?.description : "Select a connected region to enter."}
      </p>

      <div className="map-meta">
        <div className="map-legend" aria-label="Map legend">
          <span><i className="legend-dot legend-dot-explored" /> EXPLORED</span>
          <span><i className="legend-dot legend-dot-exploring" /> EXPLORING</span>
          <span><i className="legend-dot legend-dot-uncharted" /> UNCHARTED</span>
          <span><i className="legend-dot legend-dot-visited" /> VISITED THIS SESSION</span>
        </div>
        <p>MAP STILL IN PROGRESS / MORE TERRITORY TO MAP</p>
      </div>
    </section>
  );
}

function RegionShell({ region, onMap, children }: { region: Region; onMap: () => void; children?: React.ReactNode }) {
  return (
    <section className={`explorer-region explorer-region-${region.id}`} aria-labelledby={`${region.id}-region-title`}>
      <button type="button" className="return-map" onClick={onMap}>← MAP</button>
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
  const nodes = ["User", "DNS / domain", "HTTPS", "Deployment / edge", "Application", "API / service", "Database / storage"];
  return (
    <div className="region-artifact cloud-artifact">
      <section className="cloud-project-path" aria-labelledby="cloud-project-heading">
        <div className="artifact-label"><h2 id="cloud-project-heading">Project path / application infrastructure</h2><span>PROJECT WORK / DEPLOYMENT</span></div>
        <ol className="cloud-flow" aria-label="Project application request path">
          {nodes.map((node) => <li key={node}>{node}</li>)}
        </ol>
        <div className="artifact-notes"><span>THE MIDDLEMAN</span><span>FRONTEND ↔ BACKEND</span><span>ENV / AUTH</span><span>DOMAIN / DNS / HTTPS</span><span>VERCEL / SUPABASE</span><span>DEPLOYMENT / SERVICE CONFIG / TROUBLESHOOTING</span></div>
        <aside className="field-note" aria-label="Cloud field note"><span>FIELD NOTE / CLOUD 01</span><p>Project deployments connect domains, HTTPS, environment configuration and application services.</p></aside>
      </section>
      <section className="cloud-lab-track" aria-labelledby="cloud-lab-heading">
        <div className="artifact-label"><h2 id="cloud-lab-heading">Practice environments</h2><span>LAB PRACTICE</span></div>
        <ul><li>AWS Skill Builder</li><li>Google Skills / hands-on labs</li></ul>
      </section>
    </div>
  );
}

function SecurityRegion() {
  const streams = ["01", "0A", "10", "AUTH", "11", "01", "RLS", "0F", "10", "KEY", "01", "00"];
  return (
    <div className="security-environment">
      <div className="matrix-streams" aria-hidden="true">{streams.map((stream, index) => <span key={`${stream}-${index}`} style={{ animationDelay: `${index * -0.43}s` }}>{stream}</span>)}</div>
      <div className="security-content">
        <div className="security-evidence"><p className="security-access">APPLICATION SECURITY / PROJECT WORK</p><p className="security-access">HANDS-ON LAB PRACTICE / TRYHACKME</p></div>
        <div className="security-flow"><span>User</span><b>↓</b><span>Authentication</span><b>↓</b><span>Authorization</span><b>↓</b><span>Application</span><b>↓</b><span>Data</span></div>
        <div className="security-boundary">TRUST BOUNDARY</div>
        <div className="security-notes"><span>SECRETS / ENV</span><span>HTTPS</span><span>INPUT VALIDATION</span><span>PERMISSIONS</span><span>DATABASE / RLS</span><span>LEAST PRIVILEGE</span><span>ATTACK SURFACE</span></div>
      </div>
    </div>
  );
}

function SamuelRegion() {
  const [task, setTask] = useState("summarize a local log");
  const routes: Record<string, { decision: "ALLOW" | "ASK" | "DENY"; route: "LOCAL" | "CLOUD" | "NO EXECUTION" }> = {
    "summarize a local log": { decision: "ALLOW", route: "LOCAL" },
    "compare public model notes": { decision: "ALLOW", route: "CLOUD" },
    "draft a cloud action": { decision: "ASK", route: "NO EXECUTION" },
    "share private context": { decision: "DENY", route: "NO EXECUTION" },
  };
  return (
    <div className="region-artifact samuel-artifact">
      <div className="artifact-label">Architecture demonstration / deterministic</div>
      <div className="samuel-topology"><span>User</span><b>↓</b><strong>Governor</strong><b>↓</b><div className="samuel-branches"><span>Permissions</span><span>Local tools</span><span>Cloud models</span><span>Context</span><span>Sub-agents</span></div></div>
      <div className="samuel-task">
        <label htmlFor="samuel-task">Task</label>
        <select id="samuel-task" value={task} onChange={(event) => setTask(event.target.value)}>
          {Object.keys(routes).map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>
      <div className="samuel-routing" role="status" aria-label="Deterministic Governor decision and route">
        <span>GOVERNOR EVALUATION</span>
        <p><small>DECISION</small><strong>{routes[task].decision}</strong><small>ROUTE</small><strong>{routes[task].route}</strong></p>
      </div>
      <p className="artifact-label samuel-data-handling">DATA HANDLING / REDACT · SUMMARIZE · GENERALIZE · DEFER</p>
      <p className="artifact-disclaimer">A modular personal assistant architecture exploring orchestration, permissions and hybrid local/cloud operation. Not a production assistant.</p>
    </div>
  );
}

export default function PlaygroundExperience() {
  const [view, setView] = useState<ExplorerView>("map");
  const [regionShell, setRegionShell] = useState(false);
  const [visitedRegions, setVisitedRegions] = useState<RegionId[]>([]);
  const [command, setCommand] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([
    { type: "output", text: "Explorer terminal // simulated local session. Type 'help' to begin." },
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
      setRegionShell(typeof window.history.state?.explorerRegionShell === "boolean"
        ? window.history.state.explorerRegionShell
        : location.regionShell);
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
      inputRef.current?.focus();
    } else if (previousViewRef.current && previousViewRef.current !== view) {
      if (view === "map") {
        document.getElementById("explorer-map-title")?.focus();
      } else {
        document.querySelector<HTMLButtonElement>(".return-map")?.focus();
      }
    }
    previousViewRef.current = view;
    if (["cloud", "linux", "systems", "security", "ai"].includes(view)) {
      setVisitedRegions((current) => current.includes(view as RegionId) ? current : [...current, view as RegionId]);
    }
  }, [view]);

  const openView = (nextView: ExplorerView, openRegionShell = false) => {
    const isRegionShell = openRegionShell && ["cloud", "linux", "systems", "security", "ai"].includes(nextView);
    const destination = nextView === "map"
      ? "/playground"
      : isRegionShell
        ? `/playground#region/${nextView}`
        : `/playground#${nextView}`;
    window.history.pushState({ explorerRegionShell: isRegionShell }, "", destination);
    setView(nextView);
    setRegionShell(isRegionShell);
  };

  const returnToMap = () => openView("map");

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

  const advanceRequest = () => {
    const nextStage = requestStage >= explorerNodes.length - 1 ? -1 : requestStage + 1;
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
    <div className="terminal-panel" aria-label="Simulated terminal panel">
      <div className="terminal-header"><span /><span /><span /></div>
      <div ref={terminalOutputRef} className="terminal-output" role="log" aria-label="Terminal output" aria-live="polite">
        {entries.map((entry, index) => (
          <div key={`${entry.type}-${index}`} className={`terminal-line ${entry.type}`}>
            {entry.text.split("\n").map((line, lineIndex) => <span key={`${entry.type}-${index}-${lineIndex}`}>{line}</span>)}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-form">
        <label className="sr-only" htmlFor="playground-command">Terminal command</label>
        <span className="prompt-symbol">$</span>
        <input id="playground-command" ref={inputRef} value={command} onChange={(event) => setCommand(event.target.value)} onKeyDown={handleKeyDown} autoComplete="off" spellCheck={false} placeholder="Try: help" />
      </form>
      <div className="terminal-help">
        <span>Try a command</span>
        <button type="button" onClick={() => processCommand("help")}>help</button>
        <button type="button" onClick={() => processCommand("whoami")}>whoami</button>
        <button type="button" onClick={() => processCommand("cloud")}>cloud</button>
        <button type="button" onClick={() => processCommand("coffee")}>coffee</button>
      </div>
    </div>
  );

  const systemsPanel = (
    <div className="systems-panel explorer-panel">
      <div className="panel-heading"><p className="section-kicker">APPLICATION + INFRASTRUCTURE INTERACTION</p><h2>Request lifecycle</h2></div>
      <div className="flow-map" role="group" aria-label="Request flow stages">
        {explorerNodes.map((node, index) => (
          <button key={node.id} type="button" className={`flow-node ${selectedNodeId === node.id ? "active" : ""} ${requestStage >= index ? "is-complete" : ""}`} onClick={() => setSelectedNodeId(node.id)}><span className="flow-node-layer">{node.layer}</span><span>{node.label}</span></button>
        ))}
      </div>
      <div className="flow-detail" aria-live="polite"><h3>{selectedNode.label}</h3><p>{selectedNode.description}</p></div>
      <p className="systems-evidence"><span>FIELD NOTE / SYSTEMS 01 · PROJECT WORK</span>AUTHENTICATION · ENV CONFIGURATION · DATABASE ACCESS · DEPLOYMENT · SERVICE BOUNDARIES</p>
      <button type="button" className="explorer-action" onClick={advanceRequest}>{requestStage < 0 ? "Start request →" : requestStage >= explorerNodes.length - 1 ? "Reset request →" : `Continue to ${explorerNodes[requestStage + 1]?.label ?? "next stage"} →`}</button>
    </div>
  );

  const synapsePanel = (
    <section className="synapse-panel explorer-panel" aria-labelledby="synapse-title">
      <div className="panel-heading"><p className="section-kicker">AI / SYNAPSE</p><h2 id="synapse-title">Independent perspectives with revision.</h2></div>
      <div className="synapse-flow" aria-label="Multi-model flow">
        <div className={`synapse-stage ${synapseStep === 0 ? "active" : ""}`}>{synapseStages[0]}</div>
        <div className="synapse-branch" aria-label="Three independent perspectives">
          {synapseStages.slice(1, 4).map((stage, offset) => <div key={stage} className={`synapse-stage ${synapseStep === offset + 1 ? "active" : ""}`}>{stage}</div>)}
        </div>
        {synapseStages.slice(4).map((stage, offset) => <div key={stage} className={`synapse-stage ${synapseStep === offset + 4 ? "active" : ""}`}>{stage}</div>)}
      </div>
      <div className="synapse-controls"><p>Prompt → independent perspectives → critique → revision → result. No forced consensus.</p><button type="button" onClick={() => setSynapseStep((current) => (current + 1) % synapseStages.length)}>Advance</button></div>
    </section>
  );

  const region = regions.find((candidate) => candidate.id === view);

  return (
    <main className={`playground-shell explorer-shell ${view === "security" && !regionShell ? "is-security" : ""}`}>
      <header className="playground-header explorer-header">
        <Link href="/" className="wordmark">BUKS / EXPLORER</Link>
        <nav aria-label="Explorer navigation"><Link href="/">HOME</Link><button type="button" onClick={returnToMap}>MAP</button></nav>
      </header>

      {view === "map" && <ExplorerMap visitedRegions={visitedRegions} onOpen={(nextView) => openView(nextView)} />}
      {regionShell && region && <RegionShell region={region} onMap={returnToMap} />}
      {!regionShell && view === "cloud" && region && <RegionShell region={region} onMap={returnToMap}><CloudRegion /></RegionShell>}
      {!regionShell && view === "linux" && region && <RegionShell region={region} onMap={returnToMap}><div className="region-artifact linux-artifact"><div className="linux-meta"><span>HOST / LATITUDE-E5410</span><span>OS / LINUX MINT</span><span>STATE / ACTIVE</span></div><p>My working environment for CLI workflows, system inspection, networking and infrastructure practice.</p><div className="linux-domains"><span>FILESYSTEM</span><span>PROCESSES</span><span>STORAGE</span><span>PERMISSIONS</span><span>NETWORK</span><span>SERVICES</span><span>PACKAGES</span><span>CLI</span></div><button type="button" className="explorer-action" onClick={() => openView("terminal")}>LINUX → TERMINAL</button></div></RegionShell>}
      {!regionShell && view === "terminal" && <section className="terminal-destination"><button type="button" className="return-map" onClick={() => openView("linux")}>← LINUX</button><div className="region-heading"><p className="section-kicker">EXPLORER / LINUX / TERMINAL</p><h1>Simulated local terminal</h1><p className="region-description">A safe, whitelisted command surface for exploring the ideas behind this map.</p></div>{terminalPanel}</section>}
      {!regionShell && view === "systems" && region && <RegionShell region={region} onMap={returnToMap}><div className="region-artifact systems-artifact">{systemsPanel}</div></RegionShell>}
      {!regionShell && view === "security" && region && <RegionShell region={region} onMap={returnToMap}><SecurityRegion /></RegionShell>}
      {!regionShell && view === "ai" && region && <RegionShell region={region} onMap={returnToMap}><div className="ai-destinations"><button type="button" onClick={() => openView("samuel")}><span>SYSTEM EXPERIMENT / S.A.M.U.E.L.</span><strong>S.A.M.U.E.L.</strong><small>Orchestration through a Governor, permissions and local/cloud routes.</small></button><button type="button" onClick={() => openView("synapse")}><span>SYSTEM EXPERIMENT / SYNAPSE</span><strong>SYNAPSE</strong><small>Independent perspectives remain distinct through critique and revision.</small></button></div></RegionShell>}
      {!regionShell && view === "samuel" && <section className="destination-section"><button type="button" className="return-map" onClick={() => openView("ai")}>← AI</button><div className="region-heading"><p className="section-kicker">EXPLORER / AI / S.A.M.U.E.L.</p><h1>Smart Autonomous Multifunctional Utility Engine for Learning</h1><p className="region-description">A modular personal assistant architecture built around orchestration, permissions and hybrid local/cloud operation.</p></div><SamuelRegion /></section>}
      {!regionShell && view === "synapse" && <section className="destination-section"><button type="button" className="return-map" onClick={() => openView("ai")}>← AI</button><div className="region-heading"><p className="section-kicker">EXPLORER / AI / SYNAPSE</p><h1>Independent perspectives with revision.</h1><p className="region-description">A deterministic model for discussion where disagreement remains visible instead of being forced into consensus.</p></div>{synapsePanel}</section>}
    </main>
  );
}
