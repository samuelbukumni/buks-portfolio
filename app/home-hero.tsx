"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import styles from "./home-hero.module.css";

const question = "So, what does he actually do?";

const focuses = [
  { id: "software", number: "01", label: "Software" },
  { id: "infrastructure", number: "02", label: "Infrastructure" },
  { id: "linux", number: "03", label: "Linux" },
  { id: "security", number: "04", label: "Security" },
  { id: "ai", number: "05", label: "AI" },
] as const;

type FocusId = (typeof focuses)[number]["id"];

const focusVisuals: Record<FocusId, { src: string; alt: string; kind?: "tux" }> = {
  software: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Laptop_coding_programs_(Unsplash).jpg",
    alt: "A real laptop coding workspace",
  },
  infrastructure: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/UPS_Power_Management_Module,_racks_with_network_cabling_in_NERSC_data_center.jpg",
    alt: "Real data-center infrastructure and server racks",
  },
  linux: {
    src: "/hero/tux.svg",
    alt: "Tux, the Linux mascot",
    kind: "tux",
  },
  security: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Locked_computer_laptop.jpg",
    alt: "A real laptop secured with a physical lock",
  },
  ai: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/GPU_workstation_lid_off.webp",
    alt: "A real GPU workstation used for compute workloads",
  },
};

function FocusVisual({ focus }: { focus: FocusId }) {
  const visual = focusVisuals[focus];
  return (
    <img
      src={visual.src}
      alt={visual.alt}
      className={visual.kind === "tux" ? styles.tuxVisual : styles.facePhoto}
      loading={focus === "linux" ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
    />
  );
}

export default function HomeHero() {
  const [intro, setIntro] = useState<"pending" | "play" | "typing" | "reveal" | "complete">("pending");
  const [typed, setTyped] = useState("");
  const [activeFocus, setActiveFocus] = useState(2);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [loopPaused, setLoopPaused] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const resetRequested = useRef(false);
  const resumeTimer = useRef<number | undefined>(undefined);
  const pointerFrame = useRef<number | undefined>(undefined);

  const finishIntro = useCallback(() => {
    setTyped(question);
    setIntro("complete");
    try {
      sessionStorage.setItem("samuel-home-intro-complete", "1");
    } catch {
      // Storage can be unavailable.
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("resetIntro") === "1") {
      resetRequested.current = true;
      try {
        sessionStorage.removeItem("samuel-home-intro-complete");
      } catch {
        // Storage can be unavailable.
      }
      url.searchParams.delete("resetIntro");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motion.matches);

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setSaveData(Boolean(connection?.saveData));

    let remembered = false;
    try {
      remembered = sessionStorage.getItem("samuel-home-intro-complete") === "1";
    } catch {
      // Storage can be unavailable.
    }

    let timer: number | undefined;
    let index = 0;

    const typeNext = () => {
      index += 1;
      setTyped(question.slice(0, index));
      if (index < question.length) {
        const character = question[index - 1];
        timer = window.setTimeout(typeNext, /[,.?]/.test(character) ? 150 : 39 + (index % 4) * 10);
      } else {
        timer = window.setTimeout(() => setIntro("reveal"), 520);
      }
    };

    if (!motion.matches && !remembered && (resetRequested.current || window.scrollY < 40)) {
      setTyped("");
      setIntro("play");
      timer = window.setTimeout(() => {
        setIntro("typing");
        typeNext();
      }, 650);
    } else {
      finishIntro();
    }

    const onMotionChange = () => {
      setReducedMotion(motion.matches);
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

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      intro !== "complete" ||
      reducedMotion ||
      saveData ||
      loopPaused ||
      !heroVisible
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveFocus((current) => (current + 1) % focuses.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [heroVisible, intro, loopPaused, reducedMotion, saveData]);

  useEffect(() => {
    return () => {
      window.clearTimeout(resumeTimer.current);
      if (pointerFrame.current) window.cancelAnimationFrame(pointerFrame.current);
    };
  }, []);

  const selectFocus = useCallback((index: number) => {
    window.clearTimeout(resumeTimer.current);
    setLoopPaused(true);
    setActiveFocus(index);
  }, []);

  const scheduleResume = useCallback(() => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setLoopPaused(false), 1300);
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const hero = heroRef.current;
      const portrait = portraitRef.current;
      if (!hero || !portrait) return;

      const bounds = hero.getBoundingClientRect();
      const horizontal = Math.max(-1, Math.min(1, (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2)));
      const vertical = Math.max(-1, Math.min(1, (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2)));

      if (pointerFrame.current) window.cancelAnimationFrame(pointerFrame.current);
      pointerFrame.current = window.requestAnimationFrame(() => {
        portrait.style.setProperty("--portrait-x", `${(horizontal * 4).toFixed(2)}px`);
        portrait.style.setProperty("--portrait-y", `${(vertical * 3).toFixed(2)}px`);
        portrait.style.setProperty("--portrait-r", `${(horizontal * 0.45).toFixed(2)}deg`);
      });
    },
    [reducedMotion],
  );

  const resetPortrait = useCallback(() => {
    const portrait = portraitRef.current;
    if (!portrait) return;
    portrait.style.setProperty("--portrait-x", "0px");
    portrait.style.setProperty("--portrait-y", "0px");
    portrait.style.setProperty("--portrait-r", "0deg");
  }, []);

  const progress = `${(activeFocus / (focuses.length - 1)) * 100}%`;

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      data-intro={intro}
      data-static={saveData ? "true" : undefined}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPortrait}
    >
      <div className={styles.scenePlate} aria-hidden="true" />
      <div className={styles.sceneWash} aria-hidden="true" />

      <div className={styles.main}>
        <div className={styles.copy}>
          <div className={styles.opening}>
            <p className={styles.found}>You found Samuel.</p>
            <p className={styles.question}>
              <span className={styles.fullQuestion}>{question}</span>
              <span className={styles.typedQuestion} aria-hidden="true">
                {typed}
                <span className={styles.cursor} />
              </span>
            </p>
          </div>

          <h1 id="hero-title">I build and investigate digital systems.</h1>
          <p className={styles.support}>
            Software, Infrastructure, Linux, security and AI — different parts of the same curiosity.
          </p>
          <a className={styles.cta} href="#work">
            <span>View my work</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className={styles.visual}>
          <div className={styles.cube} aria-label={`Current focus: ${focuses[activeFocus].label}`}>
            <div key={activeFocus} className={styles.cubeTurn}>
              <Image
                src="/hero/hero-cube.png"
                alt=""
                fill
                sizes="(max-width: 700px) 42vw, (max-width: 1280px) 21vw, 300px"
                className={styles.cubeImage}
                priority
              />
              <div className={styles.faceWindow}>
                <FocusVisual focus={focuses[activeFocus].id} />
              </div>
              <div className={styles.glassSheen} aria-hidden="true" />
            </div>
          </div>

          <div ref={portraitRef} className={styles.portrait}>
            <Image
              src="/images/samuel-portrait-cutout.png"
              alt="Samuel smiling in a light shirt"
              width={1024}
              height={1536}
              sizes="(max-width: 700px) 165px, (max-width: 1280px) 22vw, 300px"
              priority
            />
          </div>
        </div>
      </div>

      <div
        className={styles.index}
        style={{ "--progress": progress } as CSSProperties}
        onAnimationEnd={(event) => {
          if (event.currentTarget === event.target && intro === "reveal") finishIntro();
        }}
      >
        <div className={styles.indexList} role="group" aria-label="Technical focus preview">
          {focuses.map((focus, index) => (
            <button
              key={focus.id}
              type="button"
              className={styles.indexButton}
              data-active={activeFocus === index ? "true" : "false"}
              aria-pressed={activeFocus === index}
              onPointerEnter={() => selectFocus(index)}
              onPointerLeave={scheduleResume}
              onFocus={() => selectFocus(index)}
              onBlur={scheduleResume}
              onClick={() => selectFocus(index)}
            >
              <span>{focus.number}</span>
              <strong>{focus.label}</strong>
            </button>
          ))}
        </div>
        <div className={styles.track} aria-hidden="true">
          <span className={styles.trackFill} />
          <span className={styles.marker} />
        </div>
      </div>
    </section>
  );
}