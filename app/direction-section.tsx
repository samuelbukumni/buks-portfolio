import styles from "./home.module.css";
const layers = [
  ["Application", "The product someone uses", "Next.js / product workflows"],
  [
    "Runtime + Linux",
    "The environment that runs it",
    "Processes / services / permissions",
  ],
  ["Networking", "The paths between services", "DNS / HTTPS / connectivity"],
  [
    "Cloud + infrastructure",
    "The resources it depends on",
    "Deployment / compute / configuration",
  ],
  [
    "Security + reliability",
    "The boundaries that keep it working",
    "Access / failures / observability",
  ],
];
export default function DirectionSection() {
  return (
    <section
      className={styles.systems}
      id="systems"
      aria-labelledby="systems-title"
    >
      <div>
        <p className="section-index">07 / Engineering direction</p>
        <h2 id="systems-title">
          Under the
          <br />
          application.
        </h2>
        <p>
          Shipping software keeps pulling me deeper into the stack. I’m learning
          how the services underneath it run, connect and fail.
        </p>
        <p className={styles.systemNote}>
          Project deployments · Linux Mint
          <br />
          AWS &amp; Google hands-on labs
          <br />
          Security fundamentals
        </p>
      </div>
      <ol className={styles.layers}>
        {layers.map(([title, description, detail], index) => (
          <li key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <small>{detail}</small>
          </li>
        ))}
      </ol>
    </section>
  );
}
