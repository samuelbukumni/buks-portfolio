"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
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

const mapItems: Array<{
  id: FocusId;
  title: string;
  lines: [string, string, string];
  icon: "server" | "linux" | "code" | "lock" | "nodes";
  className: string;
}> = [
  {
    id: "infrastructure",
    title: "Cloud",
    lines: ["deploy", "scale", "monitor"],
    icon: "server",
    className: styles.nodeCloud,
  },
  {
    id: "linux",
    title: "Linux",
    lines: ["configure", "automate", "optimize"],
    icon: "linux",
    className: styles.nodeLinux,
  },
  {
    id: "software",
    title: "Software",
    lines: ["design", "build", "ship"],
    icon: "code",
    className: styles.nodeSoftware,
  },
  {
    id: "security",
    title: "Security",
    lines: ["analyze", "harden", "protect"],
    icon: "lock",
    className: styles.nodeSecurity,
  },
  {
    id: "ai",
    title: "AI",
    lines: ["research", "experiment", "apply"],
    icon: "nodes",
    className: styles.nodeAi,
  },
];

function NodeIcon({ type }: { type: "server" | "linux" | "code" | "lock" | "nodes" }) {
  if (type === "linux") {
    return (
      <span className={styles.nodeIcon} aria-hidden="true">
        <Image src="/images/linux-tux.svg" alt="" width={42} height={42} />
      </span>
    );
  }

  return (
    <span className={styles.nodeIcon} aria-hidden="true">
      <svg viewBox="0 0 48 48">
        {type === "server" && <>
          <rect x="9" y="9" width="30" height="8" rx="1" /><rect x="9" y="20" width="30" height="8" rx="1" /><rect x="9" y="31" width="30" height="8" rx="1" />
          <circle cx="34" cy="13" r="1.3" /><circle cx="34" cy="24" r="1.3" /><circle cx="34" cy="35" r="1.3" />
        </>}
        {type === "code" && <><path d="M18 15 9 24l9 9" /><path d="m30 15 9 9-9 9" /><path d="m27 10-6 28" /></>}
        {type === "lock" && <><rect x="11" y="21" width="26" height="20" rx="2" /><path d="M17 21v-6a7 7 0 0 1 14 0v6" /><circle cx="24" cy="30" r="2" /><path d="M24 32v4" /></>}
        {type === "nodes" && <><circle cx="24" cy="24" r="4" /><circle cx="11" cy="13" r="3" /><circle cx="37" cy="12" r="3" /><circle cx="10" cy="36" r="3" /><circle cx="38" cy="36" r="3" /><path d="m14 15 7 6M34 14l-7 7M13 34l8-7M35 34l-8-7" /></>}
      </svg>
    </span>
  );
}

function SystemMap({ activeFocus }: { activeFocus: number }) {
  const activeId = focuses[activeFocus].id;

  return (
    <div className={styles.systemMap} aria-hidden="true">
      <svg className={styles.systemLines} viewBox="0 0 760 560" preserveAspectRatio="none">
        <path d="M94 103 H230 V129 H272" />
        <path d="M66 276 H210 V290 H256" />
        <path d="M105 439 H234 V410 H270" />
        <path d="M493 202 H631 V179 H696" />
        <path d="M505 440 H624 V421 H690" />
        <circle cx="94" cy="103" r="3" />
        <circle cx="210" cy="290" r="3" />
        <circle cx="105" cy="439" r="3" />
        <circle cx="631" cy="179" r="3" />
        <circle cx="624" cy="421" r="3" />
      </svg>

      {mapItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.systemNode} ${item.className}`}
          data-active={activeId === item.id ? "true" : "false"}
        >
          <span className={styles.nodeMarker} />
          <div className={styles.nodeCopy}>
            <strong>{item.title}</strong>
            <span>{item.lines[0]}</span>
            <span>{item.lines[1]}</span>
            <span>{item.lines[2]}</span>
          </div>
          <NodeIcon type={item.icon} />
        </div>
      ))}
    </div>
  );
}

export default function HomeHero() {
  const [intro, setIntro] = useState<
    "pending" | "play" | "typing" | "reveal" | "complete"
  >("pending");
  const [typed, setTyped] = useState("");
  const [activeFocus, setActiveFocus] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [loopPaused, setLoopPaused] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
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
      window.history.replaceState(
        window.history.state,
        "",
        url.pathname + url.search + url.hash,
      );
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motion.matches);

    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    setSaveData(Boolean(connection?.saveData));

    let remembered = false;
    try {
      remembered =
        sessionStorage.getItem("samuel-home-intro-complete") === "1";
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
        timer = window.setTimeout(
          typeNext,
          /[,.?]/.test(character) ? 150 : 39 + (index % 4) * 10,
        );
      } else {
        timer = window.setTimeout(() => setIntro("reveal"), 520);
      }
    };

    if (
      !motion.matches &&
      !remembered &&
      (resetRequested.current || window.scrollY < 40)
    ) {
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
    }, 5200);

    return () => window.clearInterval(timer);
  }, [heroVisible, intro, loopPaused, reducedMotion, saveData]);

  useEffect(() => {
    return () => {
      window.clearTimeout(resumeTimer.current);
      if (pointerFrame.current) {
        window.cancelAnimationFrame(pointerFrame.current);
      }
    };
  }, []);

  const selectFocus = useCallback((index: number) => {
    window.clearTimeout(resumeTimer.current);
    setLoopPaused(true);
    setActiveFocus(index);
  }, []);

  const scheduleResume = useCallback(() => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(
      () => setLoopPaused(false),
      1700,
    );
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (
        reducedMotion ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        return;
      }

      const hero = heroRef.current;
      const portrait = portraitRef.current;
      const systemMap = mapRef.current;
      if (!hero || !portrait || !systemMap) return;

      const bounds = hero.getBoundingClientRect();
      const horizontal = Math.max(
        -1,
        Math.min(
          1,
          (event.clientX - (bounds.left + bounds.width / 2)) /
            (bounds.width / 2),
        ),
      );
      const vertical = Math.max(
        -1,
        Math.min(
          1,
          (event.clientY - (bounds.top + bounds.height / 2)) /
            (bounds.height / 2),
        ),
      );

      if (pointerFrame.current) {
        window.cancelAnimationFrame(pointerFrame.current);
      }

      pointerFrame.current = window.requestAnimationFrame(() => {
        portrait.style.setProperty(
          "--portrait-x",
          `${(horizontal * 4).toFixed(2)}px`,
        );
        portrait.style.setProperty(
          "--portrait-y",
          `${(vertical * 3).toFixed(2)}px`,
        );
        portrait.style.setProperty(
          "--portrait-r",
          `${(horizontal * 0.35).toFixed(2)}deg`,
        );

        systemMap.style.setProperty(
          "--map-x",
          `${(horizontal * -2.5).toFixed(2)}px`,
        );
        systemMap.style.setProperty(
          "--map-y",
          `${(vertical * -2).toFixed(2)}px`,
        );
      });
    },
    [reducedMotion],
  );

  const resetPointerScene = useCallback(() => {
    const portrait = portraitRef.current;
    const systemMap = mapRef.current;

    if (portrait) {
      portrait.style.setProperty("--portrait-x", "0px");
      portrait.style.setProperty("--portrait-y", "0px");
      portrait.style.setProperty("--portrait-r", "0deg");
    }

    if (systemMap) {
      systemMap.style.setProperty("--map-x", "0px");
      systemMap.style.setProperty("--map-y", "0px");
    }
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
      onPointerLeave={resetPointerScene}
    >
      <div className={styles.gridBackground} aria-hidden="true" />
      <div className={styles.heroGlow} aria-hidden="true" />

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

          <h1 id="hero-title">
            <span className={styles.headlineLine}>I build and</span>{" "}
            <span className={styles.headlineLine}>
              <span className={styles.investigate}>investigate</span>
            </span>{" "}
            <span className={styles.headlineLine}>digital systems.</span>
          </h1>

          <p className={styles.support}>
            Software, Infrastructure, Linux, Security and AI — different parts
            of the same curiosity.
          </p>

          <a className={styles.cta} href="#work">
            <span>View my work</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className={styles.visual}>
          <div className={styles.scene}>
            <div ref={mapRef} className={styles.mapMotion}>
              <SystemMap activeFocus={activeFocus} />
            </div>

            <div ref={portraitRef} className={styles.portrait}>
              <Image
                src="/images/samuel-portrait-cutout.png"
                alt="Samuel Oguntona smiling in a light collared shirt"
                width={1024}
                height={1536}
                sizes="(max-width: 700px) 230px, (max-width: 1050px) 300px, (max-width: 1450px) 300px, 390px"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.index}
        style={{ "--progress": progress } as CSSProperties}
        onAnimationEnd={(event) => {
          if (
            event.currentTarget === event.target &&
            intro === "reveal"
          ) {
            finishIntro();
          }
        }}
      >
        <div
          className={styles.indexList}
          role="group"
          aria-label="Technical focus preview"
        >
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
          {focuses.map((focus, index) => (
            <span
              key={focus.id}
              className={styles.trackNode}
              data-active={activeFocus === index ? "true" : "false"}
              style={{ left: `${(index / (focuses.length - 1)) * 100}%` }}
            />
          ))}
          <span className={styles.marker} />
        </div>
      </div>
    </section>
  );
}
