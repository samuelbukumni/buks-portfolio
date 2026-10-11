import Image from "next/image";
import EntryLine from "./entry-line";
import WorkStrip from "./work-strip";
import styles from "./home-hero.module.css";

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={styles.hello}>You found Samuel.</p>
        <EntryLine />
        <h1 id="hero-title">
          I build and
          <br />
          <span>investigate systems.</span>
        </h1>
        <p className={styles.support}>
          From the interface to the Linux terminal, I like figuring out how
          things work. I’m building The Middleman, experimenting with AI,
          and finding my way into cloud engineering.
        </p>
        <a className="button" href="#work">
          Take a look at my work
        </a>
        <WorkStrip />
        <p className={styles.note}>
          Usually building. Sometimes figuring out why it broke.
        </p>
      </div>
      <figure className={styles.portrait}>
        <div className={styles.photo}>
          <Image
            src="/images/samuel-portrait-cutout.png"
            alt="Samuel Oguntona smiling in a collared shirt"
            width={1024}
            height={1536}
            sizes="(max-width: 700px) 280px, (max-width: 1100px) 35vw, 380px"
            priority
          />
        </div>
        <figcaption>
          <span>Samuel Oguntona</span>
          <span className={styles.handwritten}>Still figuring things out.</span>
        </figcaption>
      </figure>
      <div className={styles.interests} aria-label="Current interests">
        <span>Things that keep me curious</span>
        <ul>
          <li>Software</li>
          <li>Cloud</li>
          <li>Linux</li>
          <li>Security</li>
          <li>AI safety</li>
        </ul>
      </div>
    </section>
  );
}
