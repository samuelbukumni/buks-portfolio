import Image from "next/image";
import WorkStrip from "./work-strip";
import styles from "./home-hero.module.css";
export default function HomeHero() {
 return <>
  <section className={styles.hero} aria-labelledby="hero-title"><div className={styles.inner}>
   <div className={styles.copy}><p className={styles.hello}>Hello, I’m</p><h1 id="hero-title">Samuel<br /><span>Oguntona.</span></h1><p className={styles.role}>I build software and investigate how it works.</p><p className={styles.support}>I’m building The Middleman, a digital-product marketplace for Nigerian buyers and creators. Along the way, I’m learning to deploy, debug, and keep software running.</p><a className={styles.cta} href="#work">See my projects</a></div>
   <figure className={styles.portrait}><Image src="/images/samuel-oguntona.jpg" alt="Samuel Oguntona smiling in a collared shirt" width={1030} height={1536} sizes="(max-width:740px) 85vw, 40vw" priority /></figure>
  </div></section>
  <div className={styles.bench}><WorkStrip /></div>
 </>;
}
