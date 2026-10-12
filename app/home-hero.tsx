import Image from "next/image";
import WorkStrip from "./work-strip";
import styles from "./home-hero.module.css";
export default function HomeHero() {
 return <>
  <section className={styles.hero} aria-labelledby="hero-title"><div className={styles.inner}>
   <div className={styles.copy}><p className={styles.hello}>Hello, I’m</p><h1 id="hero-title">Samuel<br /><span>Oguntona.</span></h1><p className={styles.role}>Software, systems, and cloud engineering.</p><p className={styles.support}>I build software for real problems and investigate the systems behind it. Currently building The Middleman, experimenting with AI, and working towards cloud engineering.</p><a className={styles.cta} href="#work">Explore my work</a></div>
   <figure className={styles.portrait}><Image src="/images/samuel-portrait-cutout.png" alt="Samuel Oguntona smiling in a collared shirt" width={1024} height={1536} sizes="(max-width:740px) 95vw, 58vw" priority /><figcaption>Samuel Oguntona · Nigeria</figcaption></figure>
   <p className={styles.note}>Software, systems, and a continuing curiosity.</p>
  </div></section>
  <div className={styles.bench}><WorkStrip /></div>
 </>;
}
