import Link from "next/link";

export default function PlaygroundPreview() {
  return (
    <section className="playground-section" id="explorer" aria-labelledby="playground-title">
      <div className="playground-intro">
        <p className="section-kicker">Explorer</p>
        <h2 id="playground-title">How does Samuel explore?</h2>
        <p>
          This is where systems get inspected, questioned and mapped. Small
          experiments make the layers beneath software easier to understand.
        </p>
      </div>

      <div className="playground-preview" aria-label="Connected Explorer regions">
        <svg className="preview-routes" viewBox="0 0 600 340" preserveAspectRatio="none" aria-hidden="true">
          <path d="M8 20H300V180H8H300" />
        </svg>
        <article>
          <span className="preview-index">01</span>
          <span className="preview-node" aria-hidden="true" />
          <h3>Linux / Terminal</h3>
          <span className="preview-status">Live</span>
        </article>
        <article>
          <span className="preview-index">02</span>
          <span className="preview-node" aria-hidden="true" />
          <h3>Cloud / Systems</h3>
          <span className="preview-status">Interactive</span>
        </article>
        <article>
          <span className="preview-index">03</span>
          <span className="preview-node" aria-hidden="true" />
          <h3>Security</h3>
          <span className="preview-status">Labs</span>
        </article>
        <article>
          <span className="preview-index">04</span>
          <span className="preview-node preview-node-active" aria-hidden="true" />
          <h3>AI / SYNAPSE</h3>
          <span className="preview-status">Experiment</span>
        </article>
      </div>

      <div className="playground-cta-wrap">
        <Link href="/playground" className="playground-cta">
          Enter Explorer <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
