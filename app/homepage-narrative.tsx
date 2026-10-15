import RevealMotion from "./reveal-motion";
import Image from "next/image";
import Terminal from "./terminal";
import BuildLog from "./build-log";
import SelectedProjects from "./selected-projects";
import Contact from "./contact";
import HomeHero from "./home-hero";
import CredentialsCommunity from "./credentials-community";
import styles from "./home.module.css";
const technologies = [
 {name:"Next.js",icon:"nextjs.ico"}, {name:"TypeScript",icon:"typescript.png"},
 {name:"Supabase",icon:"supabase.ico"}, {name:"Python",icon:"python.ico"},
 {name:"Git",icon:"git.ico"}, {name:"Linux Mint",icon:"linux-mint.ico"},
];
const aiTools = [
 {name:"Claude",icon:"claude.svg"}, {name:"Gemini",icon:"gemini.png"},
 {name:"Grok",icon:"grok.svg"}, {name:"ChatGPT",icon:"chatgpt.svg"},
];
function ToolList({items,label}:{items:typeof technologies;label:string}) {
 return <ul className={styles.tools} aria-label={label}>{items.map(tool => <li key={tool.name}><span className={styles.toolIcon}><Image src={`/icons/${tool.icon}`} alt="" width={20} height={20} unoptimized /></span><span>{tool.name}</span></li>)}</ul>;
}
export default function HomepageNarrative() { return <main id="main">
 <RevealMotion /><HomeHero /><SelectedProjects />
 <section className={styles.story} id="story" aria-labelledby="story-title">
  <div><p className="section-index">A little background</p><h2 id="story-title">Behind<br /><span>the work.</span></h2><a className="text-link" href="/resume/Samuel-Oguntona-Resume-Public.pdf" download>Download my résumé (PDF)</a></div>
  <div className={styles.storyCopy}><p className={styles.storyLead}>I’m Samuel Oguntona — Oguntona Samuel Oluwabukunmi in full. I also go by Buks Samuel (bukssamuel). I study Information Systems at Obafemi Awolowo University in Ile-Ife, Nigeria.</p><p>Building a product has pulled me into databases, authentication, payments, deployment, and Linux. That’s what draws me towards cloud engineering: knowing how the pieces fit, and being able to follow a problem when they don’t.</p><p>I’m also beginning to explore AI evaluation and safety. Working on assistants and model discussions has made me curious about reliability, disagreement, and where people should stay involved.</p><p>Outside the projects, I enjoy music, space and science, and trying things that are new to me.</p><div className={styles.toolGroup}><h3>Technologies I work with</h3><ToolList items={technologies} label="Technologies I work with" /></div><div className={styles.toolGroup}><h3>AI tools in my workflow</h3><ToolList items={aiTools} label="AI tools I use" /><p className={styles.aiNote}>For ideas, explanations, and a second pass on code. The decisions and responsibility stay with me.</p></div></div>
 </section>
 <div className={styles.learning}><CredentialsCommunity /></div>
 <Terminal /><BuildLog /><Contact />
 </main>; }
