import Image from "next/image";
import styles from "./home-hero.module.css";

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={styles.hello}>Hi, I’m Samuel.</p>
        <h1 id="hero-title">
          I build things
          <br />
          <span>that run.</span>
        </h1>
        <p className={styles.support}>
          Web products, a little Python, and a lot of curiosity about the
          systems underneath. Right now, I’m building The Middleman and working
          towards cloud engineering.
        </p>
        <a className="button" href="#work">
          Take a look at my work <span aria-hidden="true">↘</span>
        </a>
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
          <span className={styles.handwritten}>Buks, for short.</span>
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
