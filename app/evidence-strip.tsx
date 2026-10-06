import Link from "next/link";
import styles from "./evidence-strip.module.css";

const paths = [
  {
    number: "01",
    direction: "Software & Systems",
    description: "Real products, architecture and the systems behind them.",
    featured: "The Middleman",
    href: "#work",
    link: "See the builds →",
  },
  {
    number: "02",
    direction: "Cloud & Linux",
    description: "Deployments, infrastructure, Linux and the environments I work in.",
    featured: "Deployment & Linux practice",
    href: "/playground#cloud",
    link: "Explore the environment →",
  },
  {
    number: "03",
    direction: "AI & Research",
    description: "Experiments with agents, model reasoning and AI systems.",
    featured: "Project SYNAPSE · S.A.M.U.E.L.",
    href: "#project-synapse",
    link: "Explore the experiments →",
  },
];

// TODO: provide current Now statement and date before restoring a Now line.
export default function EvidenceStrip() {
  return (
    <section id="evidence" className={styles.section} aria-labelledby="evidence-title">
      <div className={styles.intro}>
        <h2 id="evidence-title">Three ways into my work.</h2>
        <p>Different parts of technology keep pulling me in. Pick a direction.</p>
      </div>
      <ol className={styles.paths}>
        {paths.map((path) => (
          <li key={path.number} className={styles.path}>
            <span className={styles.number} aria-hidden="true">{path.number}</span>
            <h3>{path.direction}</h3>
            <p className={styles.description}>{path.description}</p>
            <p className={styles.featured}>{path.featured}</p>
            <Link className={styles.link} href={path.href}>{path.link}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
