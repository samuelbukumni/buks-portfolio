"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DirectionSection from "./direction-section";
import PlaygroundPreview from "./playground-preview";
import SelectedProjects from "./selected-projects";

type IntroPhase =
  | "arrival"
  | "typing"
  | "caret"
  | "identity"
  | "context"
  | "title"
  | "direction"
  | "resolved";

const question = "Who exactly did you find?";

export default function HomepageNarrative() {
  const [introPhase, setIntroPhase] = useState<IntroPhase>("arrival");
  const [typedQuestion, setTypedQuestion] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [hasCompletedJourney, setHasCompletedJourney] = useState(false);
  const [isReturnView, setIsReturnView] = useState(false);
  const endingRef = useRef<HTMLElement>(null);
  const introStartedRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers: number[] = [];
    const resolveIntro = () => {
      setTypedQuestion(question);
      setIntroPhase("resolved");
    };

    if (reduceMotion.matches) {
      resolveIntro();
      return undefined;
    }

    let typeTimer: number | undefined;
    const arrivalTimer = window.setTimeout(() => {
      setIntroPhase("typing");
      let characterIndex = 0;
      typeTimer = window.setInterval(() => {
        characterIndex += 1;
        setTypedQuestion(question.slice(0, characterIndex));
        if (characterIndex >= question.length) {
          window.clearInterval(typeTimer);
          setIntroPhase("caret");
          timers.push(window.setTimeout(() => setIntroPhase("identity"), 850));
          timers.push(window.setTimeout(() => setIntroPhase("context"), 1130));
          timers.push(window.setTimeout(() => setIntroPhase("title"), 1480));
          timers.push(window.setTimeout(() => setIntroPhase("direction"), 1760));
          timers.push(window.setTimeout(() => setIntroPhase("resolved"), 2060));
        }
      }, 44);
    }, 1050);

    const escapeIntro = () => {
      if (!introStartedRef.current) {
        return;
      }
      window.clearTimeout(arrivalTimer);
      if (typeTimer) {
        window.clearInterval(typeTimer);
      }
      timers.forEach((timer) => window.clearTimeout(timer));
      resolveIntro();
    };

    window.addEventListener("scroll", escapeIntro, { passive: true, once: true });

    return () => {
      window.clearTimeout(arrivalTimer);
      if (typeTimer) {
        window.clearInterval(typeTimer);
      }
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", escapeIntro);
    };
  }, []);

  useEffect(() => {
    introStartedRef.current = true;
  }, []);

  useEffect(() => {
    const ending = endingRef.current;
    if (!ending) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasCompletedJourney(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(ending);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateReturnView = () => {
      setIsReturnView(hasCompletedJourney && window.scrollY < window.innerHeight * 0.45);
    };

    updateReturnView();
    window.addEventListener("scroll", updateReturnView, { passive: true });
    return () => window.removeEventListener("scroll", updateReturnView);
  }, [hasCompletedJourney]);

  const phaseOrder: IntroPhase[] = [
    "arrival",
    "typing",
    "caret",
    "identity",
    "context",
    "title",
    "direction",
    "resolved",
  ];
  const hasReached = (phase: IntroPhase) =>
    isReturnView || phaseOrder.indexOf(introPhase) >= phaseOrder.indexOf(phase);
  const isResolved = introPhase === "resolved" || isReturnView;
  const displayedQuestion = isReturnView ? "Who exactly did you find?" : typedQuestion;

  return (
    <main className="site-shell">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Samuel Oluwabukunmi Oguntona home">
          Buks Samuel
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            <li><Link href="/" aria-current="page">Index</Link></li>
            <li><a href="#work">Projects</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#playground">Playground</a></li>
          </ul>
        </nav>
      </header>

      <section className={`hero ${isMounted ? "hero-intro-live" : ""} ${isReturnView ? "hero-return" : ""}`} aria-labelledby="hero-title">
        <div className="hero-main">
          <div className="hero-opening" aria-label="Introduction">
            <p className="hero-discovery">{isReturnView ? "You know Samuel now." : "You found Samuel."}</p>
            <p className="hero-question">
              <span aria-hidden="true">{isReturnView ? "Or at least, the version that exists today." : displayedQuestion}</span>
              <span className="sr-only">{isReturnView ? "Or at least, the version that exists today." : question}</span>
              {!isReturnView && introPhase === "caret" && <span className="text-caret" aria-hidden="true">▍</span>}
            </p>
          </div>
          <div className={`hero-identity-block ${hasReached("identity") ? "is-visible" : ""}`}>
            <p className="professional-name">Samuel Oluwabukunmi Oguntona</p>
            <p className={`hero-location ${hasReached("context") ? "is-visible" : ""}`}>
              Information Systems · Obafemi Awolowo University · Nigeria
            </p>
          </div>

          <h1 id="hero-title" className={`hero-title ${hasReached("title") ? "is-visible" : ""}`}>
            Tech
            <span>Explorer</span>
          </h1>

          <div className={`hero-statement ${hasReached("resolved") ? "is-visible" : ""}`}>
            <p>I follow technology underneath the surface: from products and software to databases, networks, infrastructure, deployment, and the systems that keep things operating.</p>
          </div>
        </div>

        <div className={`hero-footer ${hasReached("direction") ? "is-visible" : ""}`}>
          <div className="hero-focus">
            <span className="hero-label">Technical direction</span>
            <strong>Cloud · Linux · Infrastructure · Systems · AI</strong>
          </div>
          <div className={`hero-actions ${isResolved ? "is-visible" : ""}`}>
            <a href="#work">View selected work <span aria-hidden="true">↘</span></a>
            <a href="#playground">Enter explorer <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <SelectedProjects />

      <DirectionSection />

      <PlaygroundPreview />

      <section className="journey-ending" id="contact" ref={endingRef} aria-labelledby="ending-title">
        <div className="ending-copy">
          <p className="ending-kicker">You've seen what I'm exploring.</p>
          <h2 id="ending-title">What happens from here?</h2>
        </div>
        <div className="ending-paths">
          <div>
            <h3>Find Samuel</h3>
            <ul className="social-links" aria-label="Professional links for Samuel">
              <li><a href="mailto:samuelbukumni@gmail.com">Email</a></li>
              <li><a href="https://www.linkedin.com/in/oguntona-samuel/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com/samuelbukumni" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://x.com/bukssamuel25" target="_blank" rel="noreferrer">X</a></li>
              <li><a href="https://www.tiktok.com/@bukssamuel" target="_blank" rel="noreferrer">TikTok</a></li>
            </ul>
          </div>
          <div>
            <h3>Leave a signal</h3>
            <p>For collaborations, ideas, or project conversations, send a note and I&apos;ll respond from the mailbox that is already in use.</p>
            <a className="signal-link" href="mailto:samuelbukumni@gmail.com?subject=Hello%20Samuel">Leave a signal <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
