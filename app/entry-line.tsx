"use client";
import { useEffect, useState } from "react";
import styles from "./home-hero.module.css";
const question = "So, what does he actually do?";
export default function EntryLine() {
  const [text, setText] = useState(question);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let remembered = false;
    try { remembered = sessionStorage.getItem("samuel-home-intro-complete") === "1"; } catch {}
    if (motion.matches || remembered) return;
    setText(""); setTyping(true);
    let index = 0;
    const timer = window.setInterval(() => {
      index++; setText(question.slice(0, index));
      if (index >= question.length) { window.clearInterval(timer); setTyping(false); try { sessionStorage.setItem("samuel-home-intro-complete", "1"); } catch {} }
    }, 45);
    const stop = () => { if (motion.matches) { window.clearInterval(timer);setText(question);setTyping(false); } };
    motion.addEventListener("change", stop);
    return () => { window.clearInterval(timer); motion.removeEventListener("change", stop); };
  }, []);
  return <p className={styles.entry}><span className="sr-only">{question}</span><span aria-hidden="true">{text}{typing && <span className={styles.typingCursor}>▍</span>}</span></p>;
}
