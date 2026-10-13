"use client";

import { useEffect } from "react";

export default function RevealMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll<HTMLElement>("#work > header, #work article, #story > div, #main > section > ol, #contact > div");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-reveal", "visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    targets.forEach(target => {
      target.dataset.reveal = "waiting";
      observer.observe(target);
    });
    return () => {
      observer.disconnect();
      targets.forEach(target => target.removeAttribute("data-reveal"));
    };
  }, []);
  return null;
}
