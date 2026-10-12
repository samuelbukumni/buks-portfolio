"use client";
import { useEffect, useState } from "react";
import styles from "./opening.module.css";
const question = "Curious who’s behind all this?";
const storageKey = "samuel-mystery-opening-v1";
export default function Opening() {
 const [phase, setPhase] = useState<"boot" | "playing" | "exit" | "complete">("boot");
 const [text, setText] = useState("");
 const [ready, setReady] = useState(false);
 useEffect(() => {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let timer: ReturnType<typeof setTimeout> | undefined;
  let index=0;
  const remember=()=>{try {sessionStorage.setItem(storageKey,"1");} catch {}};
  const finish=()=>{clearTimeout(timer);document.documentElement.dataset.opening="complete";remember();setPhase("complete");};
  const reveal=()=>{document.documentElement.dataset.opening="complete";remember();setPhase("exit");timer=setTimeout(()=>setPhase("complete"),700);};
  const type=()=>{index++;setText(question.slice(0,index));if(index<question.length) timer=setTimeout(type,35);else {setReady(true);timer=setTimeout(reveal,950);}};
  let seen=false;try {seen=sessionStorage.getItem(storageKey)==="1";} catch {}
  if(motion.matches || seen || window.location.hash || window.scrollY>40) finish();
  else {document.documentElement.dataset.opening="pending";setPhase("playing");timer=setTimeout(type,350);}
  const keyboard=(event:KeyboardEvent)=>{if(event.key==="Escape" || event.key==="Tab") finish();};
  const motionChange=()=>{if(motion.matches) finish();};
  const visibility=()=>{if(document.hidden) finish();};
  window.addEventListener("portfolio:skip-opening",finish);window.addEventListener("keydown",keyboard);window.addEventListener("scroll",finish,{passive:true,once:true});motion.addEventListener("change",motionChange);document.addEventListener("visibilitychange",visibility);
  return()=>{clearTimeout(timer);window.removeEventListener("portfolio:skip-opening",finish);window.removeEventListener("keydown",keyboard);window.removeEventListener("scroll",finish);motion.removeEventListener("change",motionChange);document.removeEventListener("visibilitychange",visibility);};
 },[]);
 if(phase==="complete") return null;
 return <div className={styles.opening} data-phase={phase} aria-label="Portfolio introduction"><div className={styles.scene} aria-hidden="true"><div className={styles.greeting}><span>{text}</span>{text ? <span className={styles.cursor}>▍</span> : null}</div><p className={styles.hint} data-ready={ready}>Look a little closer.</p></div><button type="button" onClick={()=>window.dispatchEvent(new Event("portfolio:skip-opening"))}>Skip introduction</button></div>;
}
