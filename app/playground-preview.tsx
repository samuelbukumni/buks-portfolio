import Link from "next/link";

export default function PlaygroundPreview() {
  return (
    <section className="playground-section" id="playground" aria-labelledby="playground-title">
      <div className="playground-intro">
        <p className="section-kicker">Playground</p>
        <h2 id="playground-title">How does Samuel explore?</h2>
        <p>
          This is where systems get inspected, questioned and mapped. Small
          experiments make the layers beneath software easier to understand.
        </p>
      </div>

      <div className="playground-preview" aria-label="Playground experiences">
        <article>
          <span className="preview-index">01</span>
          <h3>System / Terminal</h3>
          <p>A safe terminal for Linux, systems and command-line thinking.</p>
          <span className="preview-status">Live</span>
        </article>
        <article>
          <span className="preview-index">02</span>
          <h3>Network / Cloud</h3>
          <p>Conceptual systems flow showing how requests travel through layers.</p>
          <span className="preview-status">Interactive</span>
        </article>
        <article>
          <span className="preview-index">03</span>
          <h3>Experiment / AI</h3>
          <p>A model critique loop built around perspective, revision and orchestration.</p>
          <span className="preview-status">Experiment</span>
        </article>
      </div>

      <div className="playground-cta-wrap">
        <Link href="/playground" className="playground-cta">
          Enter the Playground <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
