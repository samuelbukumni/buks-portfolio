import Image from "next/image";
import EntryLine from "./entry-line";
import WorkStrip from "./work-strip";
import styles from "./home-hero.module.css";
export default function HomeHero() {
 return <section className={styles.hero} aria-labelledby="hero-title">
  <div className={styles.introduction}><span>Samuel Oguntona</span><span>Software · Systems · Curiosity</span></div>
  <div className={styles.copy}><EntryLine /><h1 id="hero-title">I build software<br />for real problems.<br /><span>And follow what’s<br />going on underneath.</span></h1><p className={styles.support}>I’m building The Middleman, experimenting with AI, and learning cloud engineering. I like making something useful—and knowing how it holds together.</p><a className="button" href="#work">See what I’m working on</a></div>
  <figure className={styles.portrait}>
   <div className={styles.artboard} aria-hidden="true"><svg viewBox="0 0 440 550" fill="none"><path d="M0 0h220v220H0z" fill="#b26749"/><path d="M220 0h220v220H220z" fill="#cbb879"/><path d="M0 220h220v220H0z" fill="#aab398"/><path d="M220 220h220v220H220z" fill="#d8c7ad"/><path d="M0 440h440v110H0z" fill="#9caa8d"/><path d="M0 220A220 220 0 0 1 220 0M0 180A180 180 0 0 1 180 0M0 140A140 140 0 0 1 140 0M220 220a220 220 0 0 0 220 220M220 260a180 180 0 0 0 180 180M220 300a140 140 0 0 0 140 140M220 0v550M0 220h440M0 440h440" stroke="#383b2f" strokeWidth="1" opacity=".5"/><path d="M260 42h140v136H260zM285 68h90v85h-90z" stroke="#383b2f" strokeWidth="1" opacity=".4"/></svg></div>
   <div className={styles.photo}><Image src="/images/samuel-portrait-cutout.png" alt="Samuel Oguntona smiling in a collared shirt" width={1024} height={1536} sizes="(max-width:740px) 280px, 360px" priority /></div>
   <figcaption>Samuel Oguntona <span>Building &amp; learning in Nigeria</span></figcaption>
  </figure>
  <div className={styles.bench}><WorkStrip /></div>
  <div className={styles.interests}><span>Things I keep coming back to</span><ul><li>Software</li><li>Cloud</li><li>Linux</li><li>Security</li><li>AI safety</li></ul></div>
 </section>;
}
