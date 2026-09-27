"use client";

import { useEffect, useRef } from "react";

type ProjectMotion = {
  textX: number;
  visualX: number;
  labelOpacity: number;
  titleOpacity: number;
  descriptionOpacity: number;
  detailOpacity: number;
  stackOpacity: number;
  visualOpacity: number;
};

type Project = {
  id: string;
  number: string;
  status: string;
  title: string;
  description: string;
  detail: string;
  stack: string;
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
    textDirection: -1,
    layout: "standard",
  },
];

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(Math.max(value, minimum), maximum);

const getMotion = (stage: HTMLElement, viewportHeight: number): ProjectMotion => {
  const stageTop = stage.getBoundingClientRect().top;
  const stageRange = Math.max(stage.offsetHeight - viewportHeight * 0.24, viewportHeight);
  const progress = clamp((viewportHeight * 0.76 - stageTop) / stageRange);
  const exitProgress = clamp((progress - 0.65) / 0.2);
  const sceneOpacity = 1 - exitProgress * 0.82;
  const labelProgress = clamp(progress / 0.05) * sceneOpacity;
  const titleProgress = clamp((progress - 0.05) / 0.05) * sceneOpacity;
  const descriptionProgress = clamp((progress - 0.1) / 0.04) * sceneOpacity;
  const detailProgress = clamp((progress - 0.14) / 0.03) * sceneOpacity;
  const stackProgress = clamp((progress - 0.17) / 0.03) * sceneOpacity;
  const visualProgress = clamp((progress - 0.2) / 0.2) * sceneOpacity;
  return {
    textX: 0,
    visualX: 0,
    labelOpacity: labelProgress,
    titleOpacity: titleProgress,
    descriptionOpacity: descriptionProgress,
    detailOpacity: detailProgress,
    stackOpacity: stackProgress,
    visualOpacity: visualProgress,
  };
};

function ProjectDiagram({ projectIndex }: { projectIndex: number }) {
  if (projectIndex === 0) {
    return (
      <div className="project-diagram project-diagram-middleman" aria-hidden="true">
        <span>Buyer</span><i>01</i><span>Payment</span><i>02</i><span>Escrow</span><i>03</i><span>Delivery</span><i>04</i><span>Approval</span>
      </div>
    );
  }

  if (projectIndex === 1) {
    return (
      <div className="project-diagram project-diagram-samuel" aria-hidden="true">
        <span className="diagram-root">User</span>
        <span className="diagram-governor">Governor</span>
        <div className="diagram-branches"><span>Local tools</span><span>Cloud models</span><span>Permissions</span><span>Memory / context</span><span>Sub-agents</span></div>
      </div>
    );
  }

  return (
    <div className="project-diagram project-diagram-synapse" aria-hidden="true">
      <span>Prompt</span><b>↓</b><div className="diagram-perspectives"><span>Perspective A</span><span>Perspective B</span><span>Perspective C</span></div><b>↓</b><span>Critique</span><b>↓</b><span>Revision</span><b>↓</b><strong>Result</strong>
    </div>
  );
}

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
        stage.style.setProperty("--project-label-opacity", motion.labelOpacity.toString());
        stage.style.setProperty("--project-label-y", `${(1 - motion.labelOpacity) * 10}px`);
        stage.style.setProperty("--project-title-opacity", motion.titleOpacity.toString());
        stage.style.setProperty("--project-title-y", `${(1 - motion.titleOpacity) * 10}px`);
        stage.style.setProperty("--project-description-opacity", motion.descriptionOpacity.toString());
        stage.style.setProperty("--project-description-y", `${(1 - motion.descriptionOpacity) * 8}px`);
        stage.style.setProperty("--project-detail-opacity", motion.detailOpacity.toString());
        stage.style.setProperty("--project-detail-y", `${(1 - motion.detailOpacity) * 8}px`);
        stage.style.setProperty("--project-stack-opacity", motion.stackOpacity.toString());
        stage.style.setProperty("--project-stack-y", `${(1 - motion.stackOpacity) * 8}px`);
        stage.style.setProperty("--project-visual-opacity", motion.visualOpacity.toString());
        stage.style.setProperty("--project-panel-opacity", (1 - nextProgress * 0.14).toString());
        stage.style.setProperty("--project-panel-y", `${nextProgress * -6}px`);
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
              <div className="project-visual" role="img" aria-label={`Conceptual system diagram for ${project.title}`}>
                <ProjectDiagram projectIndex={index} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
