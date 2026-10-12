"use client";

import { useEffect, useState } from "react";
import styles from "./opening.module.css";

const message = "This is where the trail leads.";
const storageKey = "samuel-trail-opening-v1";
type Phase = "boot" | "typing" | "waiting" | "glitch" | "exit" | "complete";

export default function Opening() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [text, setText] = useState("");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let index = 0;
    let finished = false;
    const remember = () => {
      try { sessionStorage.setItem(storageKey, "1"); } catch {}
    };
    const finish = () => {
      finished = true;
      clearTimeout(timer);
      document.documentElement.dataset.opening = "complete";
      remember();
      setPhase("complete");
    };
    const reveal = () => {
      document.documentElement.dataset.opening = "complete";
      remember();
      setPhase("exit");
      timer = setTimeout(finish, 550);
    };
    const glitch = () => {
      setPhase("glitch");
      timer = setTimeout(reveal, 260);
    };
    const type = () => {
      if (finished) return;
      index++;
      setText(message.slice(0, index));
      if (index < message.length) timer = setTimeout(type, 38);
      else {
        setPhase("waiting");
        // Three complete extra caret blinks, then a single short text glitch.
        timer = setTimeout(glitch, 1320);
      }
    };
    let seen = false;
    try { seen = sessionStorage.getItem(storageKey) === "1"; } catch {}
    if (motion.matches || seen || window.location.hash || window.scrollY > 40) finish();
    else {
      document.documentElement.dataset.opening = "pending";
      setPhase("typing");
      timer = setTimeout(type, 350);
    }
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") finish();
    };
    const motionChange = () => { if (motion.matches) finish(); };
    const visibility = () => { if (document.hidden) finish(); };
    window.addEventListener("portfolio:skip-opening", finish);
    window.addEventListener("keydown", keyboard);
    window.addEventListener("scroll", finish, { passive: true, once: true });
    motion.addEventListener("change", motionChange);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      finished = true;
      clearTimeout(timer);
      window.removeEventListener("portfolio:skip-opening", finish);
      window.removeEventListener("keydown", keyboard);
      window.removeEventListener("scroll", finish);
      motion.removeEventListener("change", motionChange);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  if (phase === "complete") return null;
  return (
    <div className={styles.opening} data-phase={phase} aria-label="Portfolio introduction">
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.greeting}>
          <span className={styles.message} data-text={text}>{text}</span>
          {text ? <span className={styles.caret}>▍</span> : null}
        </div>
      </div>
      <button type="button" onClick={() => window.dispatchEvent(new Event("portfolio:skip-opening"))}>Skip introduction</button>
    </div>
  );
}
