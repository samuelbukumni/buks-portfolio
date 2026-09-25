export default function DirectionSection() {
  return (
    <section className="direction-section" id="about" aria-labelledby="direction-title">
      <div className="direction-intro">
        <p className="section-kicker">Current direction</p>
        <h2 id="direction-title">Where is Samuel heading?</h2>
      </div>

      <div className="direction-body">
        <p className="direction-lead">
          Toward the layers that make software actually operate: operating
          systems, servers, networks, deployment, infrastructure, security
          boundaries, automation and the resources underneath applications.
        </p>
        <p className="direction-support">
          This is a developing direction shaped by practical building,
          deployment and experiments with AI systems and orchestration.
        </p>
      </div>

      <div className="direction-map" aria-label="Areas Samuel is developing">
        <article>
          <h3>Cloud</h3>
          <p>Infrastructure, deployment, compute, storage, IAM, monitoring and reliability.</p>
        </article>
        <article>
          <h3>Linux</h3>
          <p>Operating-system fundamentals, processes, permissions, services and system inspection.</p>
        </article>
        <article>
          <h3>Infrastructure</h3>
          <p>How code becomes running services across environments, networks, databases and dependencies.</p>
        </article>
        <article>
          <h3>Systems</h3>
          <p>Resources, processes, servers and distributed components, and how those pieces interact.</p>
        </article>
        <article>
          <h3>AI</h3>
          <p>Orchestration, agents, model interaction, automation and local/cloud trade-offs.</p>
        </article>
      </div>
    </section>
  );
}
