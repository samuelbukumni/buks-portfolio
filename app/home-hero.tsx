"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import styles from "./home-hero.module.css";

const question = "So, what does he actually do?";
const interests = ["Software", "Systems", "Linux", "Cloud", "Security", "AI Research"];

export default function HomeHero() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const root = document.documentElement;

    let timer: number | undefined;
    let index = 0;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      setTyped(question);
      root.dataset.homeIntro = "complete";
      try { sessionStorage.setItem("samuel-home-intro-complete", "1"); } catch { /* storage can be unavailable */ }
    };
    const typeNext = () => {
      index += 1;
      setTyped(question.slice(0, index));
      if (index < question.length) {
        const character = question[index - 1];
        timer = window.setTimeout(typeNext, /[,.?]/.test(character) ? 150 : 39 + (index % 4) * 10);
      } else {
        timer = window.setTimeout(() => {
          root.dataset.homeIntro = "reveal";
          timer = window.setTimeout(finish, 6900);
        }, 580);
      }
    };
    if (root.dataset.homeIntro === "play") {
      timer = window.setTimeout(() => {
        root.dataset.homeIntro = "typing";
        typeNext();
      }, 720);
    }

    const footer = document.querySelector(".site-footer");
    const observer = footer && new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) finish();
    }, { threshold: 0.15 });
    if (footer && observer) observer.observe(footer);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.1) finish();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.opening}>
        <p className={styles.found}>You found Samuel.</p>
        <p className={styles.question}>
          <span className={styles.fullQuestion}>{question}</span>
          <span className={styles.typedQuestion} aria-hidden="true">{typed}<span className={styles.cursor} /></span>
        </p>
      </div>
      <div className={styles.main}>
        <div className={styles.copy}>
          <h1 id="hero-title">I explore, build and study digital systems.</h1>
          <p>From software and infrastructure to security, research and AI.</p>
        </div>
        <div className={styles.portrait}>
          <Image
            src="/images/samuel-portrait-cutout.png"
            alt="Samuel smiling in a light shirt"
            width={1024}
            height={1536}
            sizes="(max-width: 700px) 82vw, 38vw"
            priority
          />
        </div>
      </div>
      <div className={styles.interestSection}>
        <p className={styles.interestLabel}>A few things I keep coming back to</p>
        <div className={styles.interestLane}>
          <span className={styles.laneRule} aria-hidden="true" />
          <ol aria-label="Current technical interests">
            {interests.map((interest, index) => (
              <li key={interest} style={{ "--step": index } as CSSProperties}>
                <span>{interest}</span>
              </li>
            ))}
          </ol>
          <span className={styles.laneEnd} aria-hidden="true" />
        </div>
      </div>
      <a className={styles.continue} href="#work">See what I’ve been building</a>
    </section>
  );
}
