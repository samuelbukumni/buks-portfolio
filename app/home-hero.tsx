"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./home-hero.module.css";

const question = "So, what does he actually do?";

export default function HomeHero() {
  // The server and first client render both start pending. Browser preferences
  // and session memory are read only after hydration.
  const [intro, setIntro] = useState<"pending" | "play" | "typing" | "reveal" | "complete">("pending");
  const [typed, setTyped] = useState("");
  const resetRequested = useRef(false);
  const finishIntro = useCallback(() => {
    setTyped(question);
    setIntro("complete");
    try { sessionStorage.setItem("samuel-home-intro-complete", "1"); } catch { /* storage can be unavailable */ }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("resetIntro") === "1") {
      // Keep the request through development Strict Mode's effect replay.
      resetRequested.current = true;
      try { sessionStorage.removeItem("samuel-home-intro-complete"); } catch { /* storage can be unavailable */ }
      url.searchParams.delete("resetIntro");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let remembered = false;
    try { remembered = sessionStorage.getItem("samuel-home-intro-complete") === "1"; } catch { /* storage can be unavailable */ }
    let timer: number | undefined;
    let index = 0;
    const typeNext = () => {
      index += 1;
      setTyped(question.slice(0, index));
      if (index < question.length) {
        const character = question[index - 1];
        timer = window.setTimeout(typeNext, /[,.?]/.test(character) ? 150 : 39 + (index % 4) * 10);
      } else {
        timer = window.setTimeout(() => setIntro("reveal"), 580);
      }
    };
    if (!motion.matches && !remembered && (resetRequested.current || window.scrollY < 40)) {
      setTyped("");
      setIntro("play");
      timer = window.setTimeout(() => {
        setIntro("typing");
        typeNext();
      }, 720);
    } else {
      finishIntro();
    }
    const onMotionChange = () => {
      if (motion.matches) {
        window.clearTimeout(timer);
        finishIntro();
      }
    };
    motion.addEventListener("change", onMotionChange);
    return () => {
      window.clearTimeout(timer);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [finishIntro]);

  return (
    <section className={styles.hero} data-intro={intro} aria-labelledby="hero-title">
      <div className={styles.main}>
        <div className={styles.copy}>
          <div className={styles.opening}>
            <p className={styles.found}>You found Samuel.</p>
            <p className={styles.question}>
              <span className={styles.fullQuestion}>{question}</span>
              <span className={styles.typedQuestion} aria-hidden="true">{typed}<span className={styles.cursor} /></span>
            </p>
          </div>
          <h1 id="hero-title">I build and investigate digital systems.</h1>
          <p>Software, Infrastructure, Linux, security and AI — different parts of the same curiosity.</p>
        </div>
        <div className={styles.portrait} onAnimationEnd={() => {
          if (intro === "reveal") finishIntro();
        }}>
          <Image
            src="/images/samuel-portrait-cutout.png"
            alt="Samuel smiling in a light shirt"
            width={1024}
            height={1536}
            sizes="(max-width: 700px) 250px, (max-width: 1280px) 25vw, 320px"
            priority
          />
        </div>
      </div>

    </section>
  );
}
