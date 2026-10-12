import Image from "next/image";
import styles from "./projects.module.css";
const notes = [
 {id:"project-skillprint",name:"SkillPrint",status:"Concept",topic:"Learning",question:"Why start at lesson one if you already know it?",description:"I’m exploring a short, adaptive check before a course. The idea is to understand what a learner knows and suggest a useful starting point, rather than rely on a self-rating.",detail:"Adaptive assessment · Skill maps · Learner profiles"},
 {id:"project-samuel",name:"S.A.M.U.E.L.",status:"Experiment",topic:"Personal assistant",question:"Which actions should an assistant be allowed to take?",description:"A Python assistant I’m building with local tools and cloud models. I’m working out how to handle permissions before it takes an action.",detail:"Python · Local tools · Cloud models"},
 {id:"project-synapse",name:"SYNAPSE",status:"Experiment",topic:"Model discussions",question:"What happens when the models disagree?",description:"Different AI models answer independently, discuss their ideas, and revise them. I’m interested in what changes between the first answer and the discussion, without forcing agreement.",detail:"OpenRouter · Model orchestration · Transcript logging"},
];
export default function SelectedProjects() {return <section id="work" className={styles.work} aria-labelledby="work-title">
 <header className={styles.heading}><div><p className="section-index">Projects</p><h2 id="work-title">What I’m building.</h2></div><p>One main product, two experiments,<br />and an idea I’m exploring.</p></header>
 <article id="project-middleman" className={styles.middleman}>
  <figure className={styles.capture}><Image src="/images/middleman-waitlist.jpg" alt="The Middleman public waitlist page, captured in October 2026" width={1348} height={926} sizes="(max-width:800px) 90vw, 55vw"/><figcaption>The public waitlist · October 2026</figcaption></figure>
  <div className={styles.productCopy}><p className={styles.status}>The main project · In development</p><h3>The Middleman</h3><p className={styles.lead}>Buy a digital product. Keep the transaction protected.</p><p>I’m building a marketplace for Nigerian buyers and creators, with escrow around ready-made digital products.</p><p>My work covers the interface, accounts, database, payments, and deployment. This is where I put what I’m learning into practice.</p><p className={styles.stack}>Next.js · TypeScript · Supabase · Vercel</p><a className="text-link" href="https://www.themiddleman.com.ng" target="_blank" rel="noreferrer">Visit The Middleman</a></div>
 </article>
 <div className={styles.notes}>{notes.map(project => <article key={project.id} id={project.id} className={styles.note}><div className={styles.noteHeader}><span>{project.topic}</span><span>{project.status}</span></div><h3>{project.name}</h3><p className={styles.question}>{project.question}</p><p>{project.description}</p><p className={styles.stack}>{project.detail}</p></article>)}</div>
 </section>;}
