import Link from "next/link";
import SelectedProjects from "./selected-projects";
import PlaygroundPreview from "./playground-preview";
import Contact from "./contact";
import CredentialsCommunity from "./credentials-community";
import { buildLog } from "../data/build-log";
import styles from "./home.module.css";
import HomeHero from "./home-hero";
import EvidenceStrip from "./evidence-strip";

export default function HomepageNarrative() {
  return (
    <main id="main" className={styles.homepage}>
      <HomeHero />
      <EvidenceStrip />
      <SelectedProjects />
      <CredentialsCommunity />
      <section className={styles.log} aria-labelledby="log-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className="section-index">Working notes</p>
            <h2 id="log-title">Build log</h2>
          </div>
          <p>
            A record of things made,
            <br />
            revisited and understood.
          </p>
        </div>
        <ol className={styles.logEntries}>
          {buildLog.map((entry) => (
            <li key={entry.date + entry.description}>
              <time dateTime={entry.date}>
                {new Date(entry.date + "T12:00:00Z").toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  },
                )}
              </time>
              <span className={styles.logType}>{entry.type}</span>
              <div>
                <h3>{entry.project}</h3>
                <p>{entry.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section
        className={styles.research}
        id="research"
        aria-labelledby="research-title"
      >
        <div className={styles.researchIntro}>
          <p className="section-index">Research direction · 2026</p>
          <h2 id="research-title">
            When an AI gives an answer,
            <br />
            <em>what should we trust?</em>
          </h2>
          <p>
            Building with AI has made me increasingly interested in how we know
            these systems behave as expected.
          </p>
          <p>
            SYNAPSE gives me a place to think about disagreement, critique and
            revision. I’m beginning to carry those questions into AI evaluation,
            reliability and safety.
          </p>
          <Link className="text-link" href="/about#research">
            More on this direction →
          </Link>
        </div>
        <div
          className={styles.questions}
          role="group"
          aria-label="Questions guiding my research direction"
        >
          <p className={styles.notebookLabel}>
            Open questions / research notebook
          </p>
          <div>
            <span>01</span>
            <h3>Does agreement mean reliability?</h3>
            <p>
              Several models can arrive at the same wrong answer. What would an
              evaluation need to catch?
            </p>
          </div>
          <div>
            <span>02</span>
            <h3>When does critique help?</h3>
            <p>
              How can we distinguish useful revision from one model simply
              following another?
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Where should an agent stop?</h3>
            <p>
              Permissions and human oversight matter before an action reaches a
              real system.
            </p>
          </div>
          <p className={styles.researchNote}>
            Questions I’m starting to investigate, not claims of completed
            research.
          </p>
        </div>
      </section>
      <PlaygroundPreview />
      <Contact />
    </main>
  );
}
