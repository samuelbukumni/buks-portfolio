"use client";

import Link from "next/link";
import Image from "next/image";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import DirectionSection from "./direction-section";
import PlaygroundPreview from "./playground-preview";
import SelectedProjects from "./selected-projects";

const CONTACT_FORM_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() ?? "";

type ContactSubmissionState = "idle" | "sending" | "success" | "error";

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
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [contactSubmissionState, setContactSubmissionState] = useState<ContactSubmissionState>("idle");
  const [hasCompletedJourney, setHasCompletedJourney] = useState(false);
  const [isReturnView, setIsReturnView] = useState(false);
  const endingRef = useRef<HTMLElement>(null);
  const contactNameRef = useRef<HTMLInputElement>(null);
  const contactSendingRef = useRef(false);
  const introStartedRef = useRef(false);

  useEffect(() => {
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
      { threshold: 0.7 },
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

  const openContactForm = () => {
    setIsContactFormOpen(true);
    window.requestAnimationFrame(() => contactNameRef.current?.focus());
  };

  const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!CONTACT_FORM_ENDPOINT || contactSendingRef.current || contactSubmissionState === "sending") return;

    const form = event.currentTarget;
    const emptyField = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(".contact-field input, .contact-field textarea"))
      .find((field) => !field.value.trim());
    if (emptyField) {
      emptyField.setCustomValidity(`Please enter your ${emptyField.name}.`);
      emptyField.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name")).trim(),
      email: String(formData.get("email")).trim(),
      message: String(formData.get("message")).trim(),
      _gotcha: String(formData.get("_gotcha") ?? ""),
    };
    contactSendingRef.current = true;
    setContactSubmissionState("sending");

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);
      setContactSubmissionState("success");
      form.reset();
    } catch {
      setContactSubmissionState("error");
    } finally {
      contactSendingRef.current = false;
    }
  };

  return (
    <main className="site-shell">
      <noscript><style>{`.hero-identity-block,.hero-location,.hero-title,.hero-statement,.hero-portrait,.hero-footer{opacity:1!important;visibility:visible!important;transform:none!important}.hero-question>span[aria-hidden=true]:first-child{display:none}.hero-question-complete{display:block!important;visibility:visible!important}`}</style></noscript>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Samuel Oluwabukunmi Oguntona home">
          Buks Samuel
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className={`hero ${isReturnView ? "hero-return" : ""}`} aria-labelledby="hero-title">
        <div className="hero-main">
          <div className="hero-opening" aria-label="Introduction">
            <p className="hero-discovery">{isReturnView ? "You know Samuel now." : "You found Samuel."}</p>
            <p className="hero-question">
              <span aria-hidden="true">{isReturnView ? "Or at least, the version that exists today." : displayedQuestion}</span>
              <span className="hero-question-complete" aria-hidden="true">{isReturnView ? "Or at least, the version that exists today." : question}</span>
              <span className="sr-only">{isReturnView ? "Or at least, the version that exists today." : question}</span>
              {!isReturnView && introPhase === "caret" && <span className="text-caret" aria-hidden="true">▍</span>}
            </p>
          </div>
          <div className={`hero-identity-block ${hasReached("identity") ? "is-visible" : ""}`}>
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

          <div className={`hero-footer ${hasReached("direction") ? "is-visible" : ""}`}>
            <div className="hero-focus">
              <span className="hero-label">Technical direction</span>
              <div className="hero-interests" aria-label="Interests">
                {["Software", "Systems", "Linux", "Cloud", "Security", "AI Research"].map((interest, index) => (
                  <span
                    key={interest}
                    className="hero-interest-item"
                    style={{ "--interest-index": index } as React.CSSProperties}
                  >
                    {interest}
                    {index < 5 && <span className="hero-interest-sep" aria-hidden="true"> · </span>}
                  </span>
                ))}
              </div>
            </div>
            <div className={`hero-actions ${isResolved ? "is-visible" : ""}`}>
              <a href="#work">View Projects <span aria-hidden="true">↓</span></a>
              <Link href="/playground">Enter Explorer <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>

        <div className={`hero-portrait ${hasReached("identity") ? "is-visible" : ""}`}>
          <Image src="/images/samuel-portraity.png" width={1024} height={1536} alt="Samuel Oluwabukunmi Oguntona" priority />
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
              <li><a href="mailto:samuelbukumni@gmail.com">Email ↗</a></li>
              <li><a href="https://www.linkedin.com/in/oguntona-samuel/" target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
              <li><a href="https://github.com/samuelbukumni" target="_blank" rel="noreferrer">GitHub ↗</a></li>
              <li><a href="https://x.com/bukssamuel25" target="_blank" rel="noreferrer">X</a></li>
              <li><a href="https://www.tiktok.com/@bukssamuel" target="_blank" rel="noreferrer">TikTok</a></li>
            </ul>
          </div>
          <div>
            <h3>Leave a signal</h3>
            <p>For collaborations, ideas, or project conversations, send a note and I&apos;ll respond from the mailbox that is already in use.</p>
            <button className="signal-link" type="button" aria-expanded={isContactFormOpen} aria-controls="contact-form" onClick={openContactForm}>
              {isContactFormOpen ? "Signal form open ↓" : "Leave a signal →"}
            </button>
            {isContactFormOpen && (
              <form className="contact-form" id="contact-form" onSubmit={submitContactForm}>
                <label className="contact-field" htmlFor="contact-name">
                  <span>Name</span>
                  <input ref={contactNameRef} id="contact-name" name="name" type="text" autoComplete="name" required onChange={(event) => event.currentTarget.setCustomValidity("")} disabled={contactSubmissionState === "sending" || contactSubmissionState === "success"} />
                </label>
                <label className="contact-field" htmlFor="contact-email">
                  <span>Email</span>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required onChange={(event) => event.currentTarget.setCustomValidity("")} disabled={contactSubmissionState === "sending" || contactSubmissionState === "success"} />
                </label>
                <label className="contact-field" htmlFor="contact-message">
                  <span>Message</span>
                  <textarea id="contact-message" name="message" rows={3} required onChange={(event) => event.currentTarget.setCustomValidity("")} disabled={contactSubmissionState === "sending" || contactSubmissionState === "success"} />
                </label>
                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Leave this field empty</label>
                  <input id="contact-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <button className="contact-submit" type="submit" disabled={!CONTACT_FORM_ENDPOINT || contactSubmissionState === "sending" || contactSubmissionState === "success"}>
                  {contactSubmissionState === "sending" ? "Sending…" : "Send signal →"}
                </button>
                <p className={`contact-status contact-status-${contactSubmissionState}`} role="status" aria-live="polite">
                  {contactSubmissionState === "sending" && "Sending…"}
                  {contactSubmissionState === "success" && "Signal received. I'll get back to you."}
                  {contactSubmissionState === "error" && "That didn't go through. You can email me directly instead."}
                  {!CONTACT_FORM_ENDPOINT && contactSubmissionState === "idle" && "Contact form setup is pending. Please use the email option below."}
                </p>
              </form>
            )}
            <a className="email-app-link" href="mailto:samuelbukumni@gmail.com">Open email app ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}
