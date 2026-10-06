import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import styles from "./projects.module.css";

export default function SelectedProjects() {
  const hasProductImage = existsSync(join(process.cwd(), "public", "images", "middleman-product.png"));

  return (
    <div id="work" className={styles.work}>
      <section
        className={styles.flagship}
        id="project-middleman"
        aria-labelledby="middleman-title"
      >
        <div className={styles.projectTop}>
          <p className="section-index">Flagship build</p>
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
              I’m building a Nigeria-focused marketplace for digital products
              and services.
            </p>
          </div>
        </div>
        <div className={styles.productPreview}>
          {hasProductImage ? (
            <Image
              src="/images/middleman-product.png"
              alt="The Middleman product interface"
              fill
              sizes="(max-width: 1380px) 90vw, 1236px"
              className={styles.productImage}
            />
          ) : (
            <div className={styles.productPlaceholder}>
              <p>Middleman product preview</p>
              <span>Screenshot coming soon</span>
            </div>
          )}
        </div>
        <dl className={styles.productDetails}>
          <div>
            <dt>Built with</dt>
            <dd>Next.js · TypeScript · Supabase · PostgreSQL</dd>
          </div>
          <div>
            <dt>Deployment</dt>
            <dd>Vercel</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>In development</dd>
          </div>
        </dl>
        <a className={`text-link ${styles.productLink}`} href="https://themiddleman.com.ng" target="_blank" rel="noreferrer">
          Visit The Middleman ↗
        </a>
      </section>

      <section
        className={styles.experiments}
        aria-labelledby="experiments-title"
      >
        <div className={styles.experimentHeader}>
          <p className="section-index">System experiments</p>
          <h2 id="experiments-title">
            Who decides?
            <br />
            Who checks?
          </h2>
          <p>
            Two experiments in how intelligent systems coordinate, act and
            disagree.
          </p>
        </div>

        {/* SAMUEL: Visual on left, Text on right (visual / text) */}
        <article className={styles.samuel} id="project-samuel">
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
          <div className={styles.experimentCopy}>
            <span className="technical">
              Agent architecture · Experimental
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
        </article>

        {/* SYNAPSE: Text on left, Visual on right (text / visual) */}
        <article className={styles.synapse} id="project-synapse">
          <div className={styles.experimentCopy}>
            <span className="technical">
              Multi-agent behaviour · Experimental
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
          <p className="section-index">More from the lab</p>
          <h2 id="lab-title">Working surfaces</h2>
          <p>Small, inspectable demonstrations from this portfolio.</p>
        </div>
        <div className={styles.labRows}>
          <Link href="/playground#terminal">
            <div>
              <h3>Portfolio terminal</h3>
              <p>A simulated shell into my work and current focus.</p>
              <small>Interactive · React / TypeScript</small>
            </div>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/playground#systems">
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
