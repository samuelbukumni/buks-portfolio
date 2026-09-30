import Link from "next/link";
import MiddlemanArchitecture from "./middleman-architecture";
import styles from "./projects.module.css";
export default function SelectedProjects() {
  return (
    <div id="work" className={styles.work}>
      <section
        className={styles.flagship}
        id="project-middleman"
        aria-labelledby="middleman-title"
      >
        <div className={styles.projectTop}>
          <p className="section-index">02 / Flagship build</p>
          <span className="technical">In development · Nigeria</span>
        </div>
        <div className={styles.flagshipIntro}>
          <div>
            <h2 id="middleman-title">
              The Middleman<span aria-hidden="true">.</span>
            </h2>
            <p className={styles.lead}>
              Trust is the problem.
              <br />
              The transaction is the system.
            </p>
          </div>
          <div className={styles.problem}>
            <p>
              A buyer fears paying and receiving nothing. A seller fears
              delivering and never getting paid.
            </p>
            <p>
              I’m building a Nigeria-focused escrow-backed marketplace to give
              digital products and services a structured path from payment to
              settlement.
            </p>
          </div>
        </div>
        <MiddlemanArchitecture />
        <div className={styles.scope}>
          <p>
            <strong>My work across the system</strong>Buyer and seller
            workflows, authentication, database design, transaction lifecycle,
            payments, review flows and deployment.
          </p>
          <p>
            <strong>Built with</strong>
            <span className="technical">
              Next.js · TypeScript · Supabase
              <br />
              PostgreSQL · Vercel
            </span>
          </p>
        </div>
      </section>
      <section
        className={styles.experiments}
        aria-labelledby="experiments-title"
      >
        <div className={styles.experimentHeader}>
          <p className="section-index">03 / System experiments</p>
          <h2 id="experiments-title">
            Who decides?
            <br />
            Who checks?
          </h2>
          <p>
            Two experiments in how intelligent systems
            <br />
            coordinate, act and disagree.
          </p>
        </div>
        <article className={styles.samuel} id="project-samuel">
          <div className={styles.experimentCopy}>
            <span className="technical">
              01 / Agent architecture · Experimental
            </span>
            <h3>SAMUEL</h3>
            <p className={styles.expansion}>
              Smart Autonomous Multifunctional Utility Engine for Learning
            </p>
            <p>
              A personal assistant experiment with a Governor at the centre.
              Tasks are routed through permissions and specialised agents, with
              local tools and cloud models doing different jobs.
            </p>
            <Link className="text-link" href="/playground#samuel">
              Try the Governor demonstration →
            </Link>
            <p className={styles.stack}>
              Python / permissions / hybrid local + cloud
            </p>
          </div>
          <div
            className={styles.governor}
            role="img"
            aria-label="User to Governor, permission check, sub-agents, then local tools, cloud models and context"
          >
            <span>User</span>
            <i aria-hidden="true">↓</i>
            <strong>Governor</strong>
            <small>Permission check</small>
            <i aria-hidden="true">↓</i>
            <span>Sub-agents</span>
            <div className={styles.branches}>
              <span>Local tools</span>
              <span>Cloud models</span>
              <span>Context</span>
            </div>
            <p>One place to decide what may happen.</p>
          </div>
        </article>
        <article className={styles.synapse} id="project-synapse">
          <div className={styles.experimentCopy}>
            <span className="technical">
              02 / Multi-agent behaviour · Experimental
            </span>
            <h3>SYNAPSE</h3>
            <p>
              Multiple models reason independently, critique one another and
              revise their responses. The orchestrator owns conversation state.
              Disagreement is allowed to remain.
            </p>
            <p className={styles.expansion}>
              A place to ask whether a second perspective actually makes an
              answer better.
            </p>
            <Link className="text-link" href="/playground#synapse">
              Step through the critique flow →
            </Link>
            <p className={styles.stack}>
              Independent reasoning / critique / state
            </p>
          </div>
          <div
            className={styles.critique}
            role="img"
            aria-label="Prompt branches to three blind perspectives, then critique and revision. No forced consensus."
          >
            <span>Shared prompt</span>
            <div className={styles.perspectives}>
              <span>Model A</span>
              <span>Model B</span>
              <span>Model C</span>
            </div>
            <small>Blind brainstorm / independent reasoning</small>
            <i aria-hidden="true">↓</i>
            <strong>Critique → Revision</strong>
            <p>
              Orchestrator holds state.
              <br />
              No forced consensus.
            </p>
          </div>
        </article>
      </section>
      <section className={styles.lab} aria-labelledby="lab-title">
        <div>
          <p className="section-index">04 / More from the lab</p>
          <h2 id="lab-title">Working surfaces</h2>
          <p>Small, inspectable demonstrations from this portfolio.</p>
        </div>
        <div className={styles.labRows}>
          <Link href="/playground#terminal">
            <span>01</span>
            <div>
              <h3>Portfolio terminal</h3>
              <p>A simulated shell into my work and current focus.</p>
              <small>Interactive · React / TypeScript</small>
            </div>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/playground#systems">
            <span>02</span>
            <div>
              <h3>Request lifecycle</h3>
              <p>Step through identity, services and data boundaries.</p>
              <small>Interactive · React / CSS</small>
            </div>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
