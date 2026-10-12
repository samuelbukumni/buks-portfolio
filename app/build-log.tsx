import styles from "./workbench.module.css";
const entries = [
  { date: "2026-10-12", label: "One page, more work", text: "Reworked the portfolio around a portrait-led reference, added a dark-screen introduction, and kept the projects and green terminal together on one page." },
  { date: "2026-10-11", label: "Portfolio", text: "Brought back the terminal and build log. Reworked the hero and gave the projects room to show what they do." },
  { date: "2026-09-27", label: "Systems", text: "Connected the cloud, Linux, security and AI experiments in the portfolio’s earlier Explorer map." },
  { date: "2026-09-26", label: "First build", text: "Built the interactive terminal, request-flow walkthrough and agent architecture demonstrations." },
];
export default function BuildLog() { return <section className={styles.log} aria-labelledby="build-log-title"><div><p className="section-index">Build log</p><h2 id="build-log-title">What changed, and when.</h2><p>A few dated notes from working on this portfolio.</p></div><ol>{entries.map(entry => <li key={entry.date}><time dateTime={entry.date}>{new Date(`${entry.date}T12:00:00Z`).toLocaleDateString("en-GB", {day:"numeric",month:"short",year:"numeric",timeZone:"UTC"})}</time><div><strong>{entry.label}</strong><p>{entry.text}</p></div></li>)}</ol></section>; }
