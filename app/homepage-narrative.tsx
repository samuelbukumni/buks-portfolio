import Link from "next/link";
import SelectedProjects from "./selected-projects";
import DirectionSection from "./direction-section";
import PlaygroundPreview from "./playground-preview";
import Contact from "./contact";
import { buildLog } from "../data/build-log";
import styles from "./home.module.css";
import HomeHero from "./home-hero";

export default function HomepageNarrative() {
  return (
    <main id="main">
      <script dangerouslySetInnerHTML={{ __html: `try{if(!sessionStorage.getItem('samuel-home-intro-complete')&&scrollY<40&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.homeIntro='play';setTimeout(function(){if(['play','typing','reveal'].includes(document.documentElement.dataset.homeIntro)){document.documentElement.dataset.homeIntro='complete'}},12000)}}catch(e){}` }} />
      <HomeHero />
      <section
        className={styles.now}
        aria-label="Current focus, September 2026"
      >
        <div className={styles.nowDate}>
          <span className={styles.dot} /> Now{" "}
          <time dateTime="2026-09">September 2026</time>
        </div>
        <div>
          <span>Building</span>
          <a href="#project-middleman">The Middleman ↓</a>
        </div>
        <div>
          <span>Learning</span>
          <a href="#systems">Cloud, Linux &amp; security ↓</a>
        </div>
        <div>
          <span>Research direction</span>
          <a href="#research">AI evaluation &amp; safety ↓</a>
        </div>
      </section>
      <SelectedProjects />
      <section className={styles.log} aria-labelledby="log-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className="section-index">05 / Working notes</p>
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
          <p className="section-index">06 / New research direction · 2026</p>
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
      <DirectionSection />
      <PlaygroundPreview />
      <Contact />
    </main>
  );
}
