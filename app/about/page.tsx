import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialsCommunity from "../credentials-community";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Samuel Oguntona, an Information Systems student at OAU, founder of The Middleman, and an aspiring cloud engineer.",
};

export default function AboutPage() {
  return (
    <main id="main" className={styles.about}>
      <section className={styles.intro} aria-labelledby="about-title">
        <div>
          <p className="section-index">A bit more than the projects</p>
          <h1 id="about-title">
            Samuel Oguntona.
            <br />
            <span>You can call me Buks.</span>
          </h1>
          <p>
            I study Information Systems at Obafemi Awolowo University in
            Ile-Ife, Nigeria. I build web products and spend a fair amount of
            time in a Linux terminal.
          </p>
          <p>
            I like following a problem until I understand it: what the user
            sees, what the database stores, and what happens when something goes
            wrong.
          </p>
          <a
            className="text-link"
            href="/resume/Samuel-Oguntona-Resume-Public.docx"
            download
          >
            Download my résumé <span className={styles.fileType}>(.docx)</span>{" "}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <figure>
          <div className={styles.photo}>
            <Image
              src="/images/samuel-portrait-cutout.png"
              width={1024}
              height={1536}
              alt="Samuel Oguntona smiling"
              sizes="(max-width: 700px) 280px, 340px"
              priority
            />
          </div>
          <figcaption>
            Samuel Oluwabukunmi Oguntona <span>OAU · Nigeria</span>
          </figcaption>
        </figure>
      </section>
      <section className={styles.story} aria-labelledby="story-title">
        <div>
          <p className="section-index">What I’m working towards</p>
          <h2 id="story-title">
            Building the product.
            <br />
            Learning the infrastructure.
          </h2>
        </div>
        <div>
          <p>
            The Middleman is my main project: a digital-product marketplace for
            Nigerian buyers and creators. Building it has meant thinking about
            more than the page design — accounts, data, payments, and keeping
            the application running.
          </p>
          <p>
            That’s part of what draws me towards cloud engineering. I’m learning
            networking, deployment, permissions, and Linux, and using my
            projects to put those ideas into practice.
          </p>
          <p>
            My everyday tools include Next.js, TypeScript, Supabase, Python,
            Git, and Linux Mint. I’m still building depth, especially in Python
            and infrastructure.
          </p>
        </div>
      </section>
      <section className={styles.interests} aria-labelledby="interests-title">
        <p className="section-index">Away from the build</p>
        <h2 id="interests-title">There’s a person behind the terminal.</h2>
        <div className={styles.interestRows}>
          <article>
            <span aria-hidden="true">01</span>
            <div>
              <h3>Space &amp; science</h3>
              <p>
                Space systems and the questions behind how they work keep me
                curious.
              </p>
            </div>
          </article>
          <article>
            <span aria-hidden="true">02</span>
            <div>
              <h3>Music</h3>
              <p>
                I enjoy music, and I like having interests outside the things I
                build.
              </p>
            </div>
          </article>
          <article>
            <span aria-hidden="true">03</span>
            <div>
              <h3>Trying things</h3>
              <p>
                Small experiments, new tools, and the occasional idea that grows
                into a whole project.
              </p>
            </div>
          </article>
        </div>
      </section>
      <CredentialsCommunity />
      <section
        className={styles.research}
        id="research"
        aria-labelledby="research-title"
      >
        <div>
          <p className="section-index">A new interest</p>
          <h2 id="research-title">
            How do we know
            <br />
            an AI is reliable?
          </h2>
        </div>
        <div>
          <p>
            Working on S.A.M.U.E.L. and SYNAPSE has made me curious about how we
            evaluate AI, handle model disagreement, and decide when a person
            should stay involved.
          </p>
          <p>
            I’m at the beginning of this. I’d like to learn from people working
            on evaluation and safety, and contribute as my skills develop.
          </p>
        </div>
      </section>
      <div className={styles.ending}>
        <p>
          That’s me so far.
          <br />
          <span>There’s more I’d like to build.</span>
        </p>
        <Link className="button" href="/#contact">
          Let’s talk <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
