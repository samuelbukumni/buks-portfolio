import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "I explore and build digital systems, study Information Systems at OAU, and follow the connections between people, infrastructure, security, and AI.",
};

export default function AboutPage() {
  return (
    <main id="main" className={styles.about}>
      <section className={styles.intro}>
        <div>
          <p className="section-index">About / Samuel Oluwabukunmi Oguntona</p>
          <h1>
            The interface is
            <br />
            only the beginning.
          </h1>
          <p>
            I’m Samuel — also Buks Samuel. I study Information Systems at
            Obafemi Awolowo University in Nigeria, and I explore digital systems to understand how their layers fit together.
          </p>
          <p>
            Software makes more sense to me when I can follow a request from the user interface down to data schema, permissions, operating system, and cloud infrastructure underneath.
          </p>
        </div>
        <figure>
          <Image
            src="/images/samuel-portraitx.png"
            width={1024}
            height={1536}
            alt="Samuel Oluwabukunmi Oguntona"
            sizes="(max-width: 700px) 80vw, 30vw"
            priority
          />
          <figcaption>Nigeria · Information Systems · OAU</figcaption>
        </figure>
      </section>

      <section className={styles.thinking} aria-labelledby="thinking-title">
        <p className="section-index">How I think</p>
        <h2 id="thinking-title">People, processes, and technical systems.</h2>
        <p>
          Studying Information Systems connects software development to the social and organizational realities around it. In an escrow marketplace like The Middleman, a order record is a database mutation, but it is also an agreement built on trust between two human participants.
        </p>
        <ol aria-label="Connected system concerns">
          {[
            "People",
            "Software",
            "Data",
            "Infrastructure",
            "Security",
            "AI Systems",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className={styles.curiosity} aria-labelledby="curiosity-title">
        <p className="section-index">Curiosity &amp; Broader Interests</p>
        <h2 id="curiosity-title">Driven by how complex things work.</h2>
        <div className={styles.curiosityGrid}>
          <article>
            <h3>Systems &amp; Security</h3>
            <p>
              Linux Mint, CLI workflows, process boundaries, networking protocols, and defensive security labs (TryHackMe).
            </p>
          </article>
          <article>
            <h3>Space &amp; Science</h3>
            <p>
              Fascinated by orbital mechanics, space systems, and physical sciences — large-scale engineering where failures offer clear diagnostic signals.
            </p>
          </article>
          <article>
            <h3>Music &amp; Sound</h3>
            <p>
              An appreciation for rhythm, signals, and composition — finding structural parallels between sound design and systematic engineering.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.evidence} aria-labelledby="evidence-title">
        <div>
          <p className="section-index">What I’m building</p>
          <h2 id="evidence-title">
            Three ways into
            <br />
            the same question.
          </h2>
        </div>
        <div>
          <article>
            <h3>The Middleman</h3>
            <p>
              A Nigeria-focused escrow-backed marketplace. Working across
              account workflows, authentication, databases, payments and
              deployment keeps the product and the system connected.
            </p>
            <Link className="text-link" href="/#project-middleman">
              Inspect the transaction →
            </Link>
          </article>
          <article>
            <h3>SAMUEL &amp; SYNAPSE</h3>
            <p>
              Experimental agent architectures: one asks how a Governor can
              coordinate permission-aware actions; the other asks what happens
              when independent models critique and revise.
            </p>
            <Link className="text-link" href="/#project-samuel">
              See the experiments →
            </Link>
          </article>
        </div>
      </section>

      <section className={styles.learning}>
        <p className="section-index">What I’m learning</p>
        <h2>
          From deployed code
          <br />
          to operating systems.
        </h2>
        <p>
          Cloud and infrastructure are a major engineering direction for me. I
          use Linux Mint, practise through AWS and Google hands-on labs, and
          study networking, services, permissions and defensive security,
          including TryHackMe labs.
        </p>
        <Link className="text-link" href="/playground">
          Open my working map →
        </Link>
      </section>

      <section id="research" className={styles.research}>
        <p className="section-index">Research direction</p>
        <h2>
          Build systems.
          <br />
          Understand systems.
          <br />
          <em>Evaluate systems.</em>
        </h2>
        <div>
          <p>
            I’m beginning to investigate AI evaluation, reliability and safety.
            Building with agents has made me ask how we test their behaviour,
            notice failure and decide when human oversight is needed.
          </p>
          <p>
            SYNAPSE is a starting point for thinking about model disagreement
            and critique. This is a new research direction, and I’m still
            building the knowledge and methods to pursue it seriously.
          </p>
          <a className="text-link" href="mailto:samuelbukumni@gmail.com">
            Start a research conversation ↗
          </a>
        </div>
      </section>

      <section className={styles.trajectory}>
        <p className="section-index">Trajectory</p>
        <h2>A working record.</h2>
        <ol>
          <li>
            <time dateTime="2026-09-26">26 Sep 2026</time>
            <p>
              Built this portfolio’s interactive Explorer, including terminal
              and system demonstrations.
            </p>
          </li>
          <li>
            <time dateTime="2026-09-27">27 Sep 2026</time>
            <p>
              Refined the connected map of cloud, Linux, security and AI
              experiments.
            </p>
          </li>
          <li>
            <span>Now</span>
            <p>
              Building The Middleman, deepening my infrastructure practice, and
              beginning a direction in AI evaluation and safety.
            </p>
          </li>
        </ol>
      </section>

      <div className={styles.ending}>
        <p>
          There’s more to understand.
          <br />
          I’d like to build some of it together.
        </p>
        <Link className="button" href="/#contact">
          Get in touch →
        </Link>
      </div>
    </main>
  );
}
