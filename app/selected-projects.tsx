"use client";

import { useEffect, useRef } from "react";

type ProjectMotion = {
  textX: number;
  visualX: number;
  textOpacity: number;
  visualOpacity: number;
  visualScale: number;
};

type Project = {
  id: string;
  number: string;
  status: string;
  title: string;
  description: string;
  detail: string;
  stack: string;
  visualLabel: string;
  textDirection: number;
  layout: "standard" | "alternate";
};

const projects: Project[] = [
  {
    id: "project-middleman",
    number: "01",
    status: "Active build / Marketplace systems",
    title: "The Middleman",
    description: "A Nigeria-focused escrow-backed marketplace designed to make transactions involving digital products and services safer.",
    detail: "My work spans the product experience and underlying system: buyer and seller workflows, authentication, database design, transaction lifecycle, payments, review flows and deployment.",
    stack: "Next.js / TypeScript / Supabase / PostgreSQL / Vercel",
    visualLabel: "Visual pending / The Middleman",
    textDirection: -1,
    layout: "standard",
  },
  {
    id: "project-samuel",
    number: "02",
    status: "Personal experiment / Agent architecture",
    title: "S.A.M.U.E.L.",
    description: "Smart Autonomous Multifunctional Utility Engine for Learning. A modular personal-assistant experiment built around a Governor and sub-agent architecture.",
    detail: "It explores permission-aware actions, automation and a hybrid local/cloud approach, with orchestration between tools and specialized agents rather than one monolithic system.",
    stack: "Python / Governor + sub-agents / Local + cloud",
    visualLabel: "Visual pending / S.A.M.U.E.L.",
    textDirection: 1,
    layout: "alternate",
  },
  {
    id: "project-synapse",
    number: "03",
    status: "Experiment / Multi-agent environment",
    title: "Project SYNAPSE",
    description: "An experimental multi-agent environment where different AI models can independently reason, critique one another and revise responses.",
    detail: "The orchestrator owns conversation state, and disagreement is allowed rather than forcing consensus. This is an experiment, not a finished commercial product.",
    stack: "Multi-agent orchestration / Model critique / State",
    visualLabel: "Visual pending / Project SYNAPSE",
    textDirection: -1,
    layout: "standard",
  },
];

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(Math.max(value, minimum), maximum);

const getMotion = (stage: HTMLElement, viewportHeight: number): ProjectMotion => {
  const stageTop = stage.getBoundingClientRect().top;
  const progress = clamp((viewportHeight * 0.76 - stageTop) / (viewportHeight * 0.9));
  const textProgress = clamp(progress / 0.5);
  const visualProgress = clamp((progress - 0.16) / 0.58);
  const project = Number(stage.dataset.projectIndex ?? 0);
  const direction = projects[project]?.textDirection ?? -1;

  return {
    textX: (1 - textProgress) * 72 * direction,
    visualX: (1 - visualProgress) * -72 * direction,
    textOpacity: 0.2 + textProgress * 0.8,
    visualOpacity: 0.18 + visualProgress * 0.82,
    visualScale: 0.96 + visualProgress * 0.04,
  };
};

export default function SelectedProjects() {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return undefined;
    }

    const update = () => {
      frameRef.current = null;
      const sequence = sequenceRef.current;

      if (!sequence) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const stages = Array.from(sequence.querySelectorAll<HTMLElement>(".project-stage"));

      stages.forEach((stage, index) => {
        const motion = getMotion(stage, viewportHeight);
        const nextStage = stages[index + 1];
        const nextStageTop = nextStage?.getBoundingClientRect().top ?? viewportHeight * 2;
        const nextProgress = clamp((viewportHeight * 0.9 - nextStageTop) / viewportHeight);

        stage.style.setProperty("--project-text-x", `${motion.textX}px`);
        stage.style.setProperty("--project-visual-x", `${motion.visualX}px`);
        stage.style.setProperty("--project-text-opacity", motion.textOpacity.toString());
        stage.style.setProperty("--project-visual-opacity", motion.visualOpacity.toString());
        stage.style.setProperty("--project-visual-scale", motion.visualScale.toString());
        stage.style.setProperty("--project-panel-opacity", (1 - nextProgress * 0.28).toString());
        stage.style.setProperty("--project-panel-y", `${nextProgress * -12}px`);
        stage.style.setProperty("--project-panel-scale", (1 - nextProgress * 0.025).toString());
      });
    };

    const requestUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(update);
      }
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section className="selected-projects" id="work" aria-labelledby="projects-title">
      <p className="projects-bridge">What does that curiosity turn into?</p>
      <div className="projects-intro">
        <h2 id="projects-title">Selected Projects</h2>
      </div>

      <div className="project-sequence" ref={sequenceRef}>
        {projects.map((project, index) => (
          <article
            className={`project-stage project-stage-${project.layout} ${index === 0 ? "project-stage-primary" : ""} ${index === projects.length - 1 ? "project-stage-final" : ""}`}
            data-project-index={index}
            id={project.id}
            key={project.id}
          >
            <div className="project-panel">
              <div className="project-copy">
                <p className="project-number">{project.number}</p>
                <div className="project-heading">
                  <p className="project-status">{project.status}</p>
                  <h3>
                    <a href={`#${project.id}`}>
                      {project.title} <span aria-hidden="true">↗</span>
                    </a>
                  </h3>
                </div>
                <p className="project-description">{project.description}</p>
                <p className="project-detail">{project.detail}</p>
                <p className="project-stack">{project.stack}</p>
              </div>
              <div className="project-visual" role="img" aria-label={`Visual slot for ${project.title} project assets`}>
                <span>{project.visualLabel}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
