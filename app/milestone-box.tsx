"use client";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./milestone-box.module.css";
const words=["What", "I’ve", "learned", "so", "far."];
export default function MilestoneBox() {
 const box=useRef<HTMLDivElement>(null);
 const [state,setState]=useState<"static" | "closed" | "open">("static");
 useEffect(()=>{
  const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
  let opened=false;
  if(!motion.matches) setState("closed");
  const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting && !opened){opened=true;setState(motion.matches ? "static" : "open");observer.disconnect();}},{threshold:.35});
  if(box.current) observer.observe(box.current);
  const change=()=>{if(motion.matches) {setState("static");observer.disconnect();}};
  motion.addEventListener("change",change);
  return()=>{observer.disconnect();motion.removeEventListener("change",change);};
 },[]);
 return <div className={styles.box} ref={box} data-state={state}><div className={styles.lid} aria-hidden="true"/><div className={styles.inside}><h2 id="learning-title" className={styles.title}><span className="sr-only">What I’ve learned so far.</span><span aria-hidden="true">{words.map((word,i)=><span className={styles.word} key={word} style={{"--word-index":i} as CSSProperties}>{word}</span>)}</span></h2><p>University, courses, and learning with other people.</p></div><div className={styles.edge} aria-hidden="true"/></div>;
}
