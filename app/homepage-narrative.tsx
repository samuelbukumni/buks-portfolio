import Terminal from "./terminal";
import BuildLog from "./build-log";
import SelectedProjects from "./selected-projects";
import Contact from "./contact";
import HomeHero from "./home-hero";
import CredentialsCommunity from "./credentials-community";
import styles from "./home.module.css";
export default function HomepageNarrative() { return <main id="main">
 <HomeHero /><SelectedProjects />
 <section className={styles.story} id="story" aria-labelledby="story-title">
  <div><p className="section-index">A little background</p><h2 id="story-title">Learning by<br /><span>working on it.</span></h2><a className="text-link" href="/resume/Samuel-Oguntona-Resume-Public.docx" download>Download my résumé (.docx)</a></div>
  <div className={styles.storyCopy}><p className={styles.storyLead}>I’m Samuel Oguntona, an Information Systems student at Obafemi Awolowo University in Ile-Ife, Nigeria.</p><p>Building a product has pulled me into databases, authentication, payments, deployment, and Linux. That’s what draws me towards cloud engineering: knowing how the pieces fit, and being able to follow a problem when they don’t.</p><p>I’m also beginning to explore AI evaluation and safety. Working on assistants and model discussions has made me curious about reliability, disagreement, and where people should stay involved.</p><p>Outside the projects, I enjoy music, space and science, and trying things that are new to me.</p><ul className={styles.tools} aria-label="Tools I work with">{["Next.js","TypeScript","Supabase","Python","Git","Linux Mint"].map(tool => <li key={tool}>{tool}</li>)}</ul></div>
 </section>
 <div className={styles.learning}><CredentialsCommunity /></div>
 <Terminal /><BuildLog /><Contact />
 </main>; }
