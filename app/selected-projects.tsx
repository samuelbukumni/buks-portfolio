import Image from "next/image";
import styles from "./projects.module.css";

const experiments = [
  {
    id: "project-samuel",
    number: "02",
    name: "S.A.M.U.E.L.",
    type: "Personal assistant · Experiment",
    description:
      "A personal assistant I’m building with Python. I’m working out how to combine local tools and cloud models, and when the assistant should ask permission before acting.",
    stack: "Python · Local tools · Cloud models",
  },
  {
    id: "project-synapse",
    number: "03",
    name: "SYNAPSE",
    type: "Multi-model discussion · Experiment",
    description:
      "A room where different AI models answer independently, discuss their ideas, and revise them. I want to see when disagreement is useful, without forcing everyone to agree.",
    stack: "OpenRouter · Model orchestration · Transcript logging",
  },
];

export default function SelectedProjects() {
  return (
    <section id="work" className={styles.work} aria-labelledby="work-title">
      <header className={styles.heading}>
        <div>
          <p className="section-index">Selected work</p>
          <h2 id="work-title">Built. Building. Figuring it out.</h2>
        </div>
        <p>
          A product I’m taking to launch,
          <br />
          and two ongoing experiments.
        </p>
      </header>
      <article className={styles.flagship} id="project-middleman">
        <div className={styles.flagshipCopy}>
          <span className={styles.number}>01 / Digital marketplace</span>
          <div className={styles.brand}><span className={styles.marketMark} aria-hidden="true">M</span><h3>The Middleman</h3></div>
          <p className={styles.lead}>
            A place to buy digital products
            <br />
            with a little more trust.
          </p>
          <p>
            I’m building a marketplace for Nigerian buyers and creators. People
            can buy ready-made digital products, with escrow protection around
            the transaction.
          </p>
          <p>
            I work across the interface, accounts, database, payments, and
            deployment. It’s the project teaching me how many details sit behind
            a simple “Buy” button.
          </p>
          <dl className={styles.details}>
            <div>
              <dt>My role</dt>
              <dd>Founder &amp; developer</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Preparing for launch</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>Next.js · TypeScript · Supabase · Vercel</dd>
            </div>
          </dl>
          <a
            className="text-link"
            href="https://www.themiddleman.com.ng"
            target="_blank"
            rel="noreferrer"
          >
            Visit The Middleman
          </a>
        </div>
        <figure className={styles.preview}>
          <div className={styles.browserBar} aria-hidden="true">
            <span />
            <span />
            <span />
            <small>themiddleman.com.ng</small>
          </div>
          <div className={styles.screenshot}>
            <Image
              src="/images/middleman-waitlist.jpg"
              alt="The current public Middleman waitlist page"
              width={1348}
              height={926}
              sizes="(max-width: 850px) 90vw, 55vw"
            />
          </div>
          <figcaption>The public waitlist · Product in development</figcaption>
        </figure>
      </article>
      <div className={styles.experiments}>
        {experiments.map((project) => (
          <article
            className={styles.experiment}
            id={project.id}
            key={project.id}
          >
            <div className={`${styles.labVisual} ${project.number === "02" ? styles.assistantVisual : styles.synapseVisual}`} aria-hidden="true">
              {project.number === "02" ? <><span className={styles.labLogo}>S_</span><div className={styles.shellLines}><span>$ samuel plan</span><span>local tools · cloud models</span><span className={styles.permission}>Permission required before acting</span><span className={styles.cursor}>▍</span></div></> : <><span className={styles.labLogo}>◌</span><div className={styles.modelOrbit}><span>Answer independently</span><span>Compare &amp; critique</span><span>Revise the idea</span></div></>}
              <small>Concept sketch · In development</small>
            </div>
            <span className={styles.number}>
              {project.number} / {project.type}
            </span>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p className={styles.stack}>{project.stack}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
