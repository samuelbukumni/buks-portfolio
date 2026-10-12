"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./workbench.module.css";
const original = "Go on. Poke around.";
const reverse = "oG no. ekoP dnuora.";
const frames = ["Go no. Poke around.", reverse, "Go on. okeP around.", "Go on. Poke rounda.", original];
export default function ScrambleHeading() {
 const [text, setText] = useState(original);
 const heading = useRef<HTMLHeadingElement>(null);
 useEffect(() => {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false;
  let frame = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const reset = () => { clearTimeout(timer); frame=0; setText(original); };
  const tick = () => {
   if (!visible || motion.matches || document.hidden) { reset(); return; }
   setText(frames[frame]); frame++;
   if (frame < frames.length) timer=setTimeout(tick,140);
   else { frame=0; timer=setTimeout(tick,7000); }
  };
  const schedule = () => { reset(); if(visible && !motion.matches && !document.hidden) timer=setTimeout(tick,2300); };
  const observer = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; schedule(); }, {threshold:.5});
  if (heading.current) observer.observe(heading.current);
  motion.addEventListener("change", schedule); document.addEventListener("visibilitychange",schedule);
  return () => { clearTimeout(timer); observer.disconnect(); motion.removeEventListener("change",schedule); document.removeEventListener("visibilitychange",schedule); };
 }, []);
 return <h2 id="terminal-title" ref={heading} className={styles.scramble}><span className="sr-only">{original}</span><span aria-hidden="true" className={styles.scrambleSizer}>{original}</span><span aria-hidden="true" className={styles.scrambleText}>{text}</span></h2>;
}
