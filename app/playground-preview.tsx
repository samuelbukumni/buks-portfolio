import Link from "next/link";
import styles from "./home.module.css";
export default function PlaygroundPreview() {
  return (
    <section className={styles.explorer} aria-labelledby="explorer-title">
      <div className={styles.explorerCopy}>
        <p className="section-index">Another way in</p>
        <h2 id="explorer-title">
          Less reading.
          <br />
          More inspecting.
        </h2>
        <p>
          Enter Explorer: an interactive map of my working environment, system
          experiments and the questions underneath them.
        </p>
        <Link href="/playground" className={styles.explorerLink}>
          Enter Explorer <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div
        className={styles.previewMap}
        role="group"
        aria-label="Explorer destinations"
      >
        <div className={styles.mapPrompt}>
          <span>buks@explorer</span>:~$ ls systems/
        </div>
        <Link href="/playground#terminal">
          <span>01</span>
          <strong>Linux / terminal</strong>
          <small>Open a simulated session →</small>
        </Link>
        <Link href="/playground#systems">
          <span>02</span>
          <strong>Cloud / systems</strong>
          <small>Trace a request →</small>
        </Link>
        <Link href="/playground#security">
          <span>03</span>
          <strong>Security</strong>
          <small>Inspect the boundaries →</small>
        </Link>
        <Link href="/playground#synapse">
          <span>04</span>
          <strong>AI / SYNAPSE</strong>
          <small>Follow a critique →</small>
        </Link>
      </div>
    </section>
  );
}
