"use client";
import { useEffect, useRef, useState } from "react";
import ScrambleHeading from "./scramble-heading";
import styles from "./workbench.module.css";
const files: Record<string, string> = {
  "now.txt": "Building The Middleman. Learning cloud engineering and Linux. Beginning to explore AI evaluation and safety.",
  "projects/middleman.md": "The Middleman: a digital-products marketplace for Nigerian buyers and creators. Next.js / TypeScript / Supabase. Preparing for launch.",
  "projects/skillprint.md": "SkillPrint: a concept for adaptive learner assessment and a suggested course starting point. Not a released product.",
  "projects/samuel.md": "S.A.M.U.E.L.: a Python personal-assistant experiment. Local tools, cloud models and permission before actions.",
  "projects/synapse.md": "SYNAPSE: independent model answers, critique and revision. Useful disagreement without forced consensus.",
};
const commands: Record<string, string> = {
  help: "help · whoami · projects · ls · cat now.txt · cloud · linux · contact · history · date · pwd · echo <text> · clear",
  whoami: "Samuel Oluwabukunmi Oguntona / Buks Samuel\nI build software and investigate the systems underneath it.\nInformation Systems · OAU · Nigeria",
  projects: "The Middleman — digital marketplace\nSkillPrint — adaptive learning concept\nS.A.M.U.E.L. — personal assistant experiment\nSYNAPSE — multi-model discussion experiment",
  ls: "projects/    now.txt", "ls projects": "middleman.md    skillprint.md    samuel.md    synapse.md",
  cloud: "Currently learning compute, identity, deployment, observability and the infrastructure connecting them.",
  linux: "Processes, services, permissions and networking. The terminal is where I like to follow the clues.",
  contact: "samuelbukumni@gmail.com\nGitHub: samuelbukumni", pwd: "/home/buks/portfolio (simulated)",
};
export default function Terminal() {
  const [entries, setEntries] = useState([{ command: "whoami", output: commands.whoami }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const output = useRef<HTMLDivElement>(null);
  useEffect(() => { if (output.current) output.current.scrollTop = output.current.scrollHeight; }, [entries]);
  function run(value: string) {
    const command = value.trim(); if (!command) return;
    const nextHistory = [...history, command].slice(-50); setHistory(nextHistory); setIndex(nextHistory.length); setInput("");
    if (command === "clear") { setEntries([]); return; }
    let result = Object.hasOwn(commands, command) ? commands[command] : "Command not found. Type help to see what’s here.";
    if (command.startsWith("cat ")) result = files[command.slice(4)] ?? "File not found. Try cat now.txt.";
    if (command.startsWith("echo ")) result = command.slice(5);
    if (command === "date") result = new Date().toLocaleString();
    if (command === "history") result = nextHistory.join("\n");
    setEntries(old => [...old, { command, output: result }].slice(-40));
  }
  return <section className={styles.workbench} aria-labelledby="terminal-title">
    <div className={styles.intro}><p className="section-index">03 / The terminal</p><ScrambleHeading /><p>A little shell into my work. It runs in your browser; these are simulated commands.</p></div>
    <div className={styles.terminal}><div className={styles.bar}><span className={styles.lights} aria-hidden="true"><i /><i /><i /></span><span>buks@portfolio: ~</span><span>local session</span></div>
      <div className={styles.output} ref={output} role="log" aria-live="polite" aria-relevant="additions">{entries.map((entry,i) => <div key={i}><p className={styles.prompt}>buks ~ $ {entry.command}</p><pre>{entry.output}</pre></div>)}</div>
      <form onSubmit={e => {e.preventDefault();run(input);}} className={styles.command}><label htmlFor="terminal-input">buks ~ $</label><input id="terminal-input" value={input} onChange={e => setInput(e.target.value)} autoComplete="off" spellCheck={false} placeholder="Type help…" onKeyDown={e => {if(e.key === "ArrowUp" || e.key === "ArrowDown") {e.preventDefault();const next = Math.max(0,Math.min(history.length,index + (e.key === "ArrowUp" ? -1 : 1)));setIndex(next);setInput(history[next] ?? "");}}}/><button type="submit">Run</button></form>
      <div className={styles.suggestions}>{["help", "projects", "cat now.txt", "clear"].map(command => <button type="button" key={command} onClick={() => run(command)}>{command}</button>)}</div>
    </div>
  </section>;
}
