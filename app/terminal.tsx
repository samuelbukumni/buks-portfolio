"use client";
import { useEffect, useRef, useState } from "react";
import ScrambleHeading from "./scramble-heading";
import { complete, createShell, execute, HOME, type Shell } from "./terminal-engine";
import styles from "./workbench.module.css";
type Entry = { command: string; output: string; path: string };
export default function Terminal() {
  const shell = useRef<Shell | null>(null);
  if (!shell.current) shell.current = createShell();
  const [entries, setEntries] = useState<Entry[]>([{ command: "whoami", output: "Samuel Oluwabukunmi Oguntona / Buks Samuel\nI build software and investigate the systems underneath it.\nInformation Systems · OAU · Nigeria", path: HOME }]);
  const [input, setInput] = useState("");
  const [index, setIndex] = useState(0);
  const output = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  useEffect(() => { if (output.current) output.current.scrollTop = output.current.scrollHeight; }, [entries]);
  const location = () => shell.current!.cwd === HOME ? "~" : shell.current!.cwd.startsWith(HOME + "/") ? "~" + shell.current!.cwd.slice(HOME.length) : shell.current!.cwd;
  function run(value: string) {
    const command = value.trim(); if (!command) return;
    const path = location(); const result = execute(shell.current!, command);
    setIndex(shell.current!.history.length); setInput("");
    if (command === "clear") { setEntries([]); return; }
    setEntries(old => [...old, { command, output: result, path }].slice(-80));
  }
  function key(action: "tab" | "up" | "down" | "cancel" | "clear") {
    const current = shell.current!;
    if (action === "clear") { setEntries([]); field.current?.focus(); return; }
    if (action === "cancel") { if (input) setEntries(old => [...old,{ command: input + " ^C", output: "", path: location() }]); setInput(""); setIndex(current.history.length); field.current?.focus(); return; }
    if (action === "tab") { const match=complete(current,input); setInput(match.value); if (match.matches.length > 1) setEntries(old => [...old,{command:input+" ⇥",output:match.matches.join("    "),path:location()}]); field.current?.focus(); return; }
    const next=Math.max(0,Math.min(current.history.length,index+(action === "up" ? -1 : 1))); setIndex(next); setInput(current.history[next] ?? ""); field.current?.focus();
  }
  return <section className={styles.workbench} aria-labelledby="terminal-title">
    <div className={styles.intro}><p className="section-index">03 / The terminal</p><ScrambleHeading /><p>A little shell into my work. It runs in your browser; these are simulated commands.</p></div>
    <div className={styles.terminal}><div className={styles.bar}><span className={styles.lights} aria-hidden="true"><i /><i /><i /></span><span>buks@portfolio: {location()}</span><span>local session</span></div>
      <div className={styles.output} ref={output} role="log" aria-live="polite" aria-relevant="additions" aria-label="Terminal output">{entries.map((entry,i) => <div key={i}><p className={styles.prompt}>buks {entry.path} $ {entry.command}</p>{entry.output && <pre>{entry.output}</pre>}</div>)}</div>
      <form onSubmit={e => {e.preventDefault();run(input);}} className={styles.command}><label htmlFor="terminal-input">buks {location()} $</label><input ref={field} id="terminal-input" value={input} onChange={e => setInput(e.target.value)} autoCapitalize="off" autoComplete="off" spellCheck={false} placeholder="Type help…" onKeyDown={e => {if (e.key === "Tab") { e.preventDefault(); key("tab"); } else if(e.key === "ArrowUp" || e.key === "ArrowDown") {e.preventDefault();key(e.key === "ArrowUp" ? "up" : "down");} else if (e.ctrlKey && e.key.toLowerCase() === "c") { e.preventDefault(); key("cancel"); } else if (e.ctrlKey && e.key.toLowerCase() === "l") { e.preventDefault(); key("clear"); }}}/><button type="submit">Run</button></form>
      <div className={styles.suggestions} aria-label="Terminal shortcuts">{["help", "projects", "cat now.txt", "clear"].map(command => <button type="button" key={command} onClick={() => run(command)}>{command}</button>)}<span className={styles.shortcutDivider} aria-hidden="true" />{([ ["Tab","tab"], ["↑","up"], ["↓","down"], ["Ctrl+C","cancel"], ["Ctrl+L","clear"]] as const).map(([label,action]) => <button type="button" key={label} onClick={() => key(action)} aria-label={label === "↑" ? "Previous command" : label === "↓" ? "Next command" : label === "Tab" ? "Autocomplete" : label === "Ctrl+C" ? "Cancel input" : "Clear output"}>{label}</button>)}</div>
    </div>
  </section>;
}
