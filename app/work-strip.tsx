"use client";
import { useState } from "react";
import styles from "./work-strip.module.css";
const projects = [
  { mark: "M", name: "The Middleman", detail: "Digital products, with trust.", tone: "market" },
  { mark: "S_", name: "S.A.M.U.E.L.", detail: "A personal assistant in progress.", tone: "assistant" },
  { mark: "◌", name: "SYNAPSE", detail: "Different models. Different minds.", tone: "models" },
];
export default function WorkStrip() {
  const [paused, setPaused] = useState(false);
  return <div className={styles.strip} data-paused={paused}>
    <div className={styles.label}><span>On my workbench</span><button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Resume motion" : "Pause motion"}</button></div>
    <div className={styles.window}><div className={styles.track}>
      {[0, 1].map(copy => <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>{projects.map(project => <div className={styles.tile} key={project.name}><span className={`${styles.mark} ${styles[project.tone]}`}>{project.mark}</span><div><strong>{project.name}</strong><small>{project.detail}</small></div></div>)}</div>)}
    </div></div>
  </div>;
}
