import Terminal from "./terminal";
import BuildLog from "./build-log";
import Link from "next/link";
import SelectedProjects from "./selected-projects";
import Contact from "./contact";
import HomeHero from "./home-hero";
import styles from "./home.module.css";

export default function HomepageNarrative() {
  return (
    <main id="main">
      <HomeHero />
      <SelectedProjects />
      <section className={styles.about} aria-labelledby="about-preview-title">
        <div>
          <p className="section-index">A little about me</p>
          <h2 id="about-preview-title">
            I like knowing how
            <br />
            the whole thing works.
          </h2>
        </div>
        <div>
          <p>
            I’m an Information Systems student at Obafemi Awolowo University,
            Nigeria. Building a product has pulled me into databases,
            authentication, deployment, and the Linux terminal.
          </p>
          <p>
            I’m learning cloud engineering, and I’m starting to explore AI
            evaluation and safety. I learn best by working on real problems and
            understanding what happened when something breaks.
          </p>
          <Link className="text-link" href="/about">
            More about me
          </Link>
        </div>
      </section>
      <Terminal />
      <BuildLog />
      <Contact />
    </main>
  );
}
