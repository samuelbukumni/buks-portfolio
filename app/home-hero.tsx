import Image from "next/image";
import EntryLine from "./entry-line";
import WorkStrip from "./work-strip";
import styles from "./home-hero.module.css";
export default function HomeHero() {
  return <section className={styles.hero} aria-labelledby="hero-title">
    <div className={styles.copy}>
      <p className={styles.hello}>Hi, I’m Samuel Oguntona.</p>
      <EntryLine />
      <h1 id="hero-title">I build software.<br /><span>Then I dig into</span><br />what makes it work.</h1>
      <p className={styles.support}>A useful interface is just the beginning. I’m curious about the data, the infrastructure, and what happens when something breaks. Right now, I’m building The Middleman and learning my way into cloud engineering.</p>
      <a className="button" href="#work">Explore my projects</a>
    </div>
    <figure className={styles.portrait}>
      <div className={styles.scene}>
        <svg className={styles.wires} viewBox="0 0 440 550" fill="none" aria-hidden="true"><path d="M0 80h85v100h140v120h170M440 390h-90V210h-120M0 450h130v-65h140" stroke="currentColor" strokeWidth="1.2"/><circle cx="85" cy="80" r="5" fill="currentColor"/><circle cx="350" cy="390" r="5" fill="currentColor"/><path d="M300 25h115v110M25 515h100" stroke="currentColor" strokeWidth="1.2"/></svg>
        <div className={styles.photo}><Image src="/images/samuel-portrait-cutout.png" alt="Samuel Oguntona smiling in a collared shirt" width={1024} height={1536} sizes="(max-width: 740px) 280px, 380px" priority /></div>
      </div>
      <figcaption><span>Samuel Oguntona</span><span>Nigeria · Learning by building</span></figcaption>
    </figure>
    <div className={styles.bench}><WorkStrip /></div>
    <div className={styles.interests}><span>Following the curiosity</span><ul><li>Software</li><li>Cloud</li><li>Linux</li><li>Security</li><li>AI safety</li></ul></div>
  </section>;
}
