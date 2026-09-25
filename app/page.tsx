import Link from "next/link";

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Buks Samuel home">
          Buks Samuel
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#explore">Explore</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-kicker">Tech Explorer / Information Systems</div>
        <h1 id="hero-title" className="hero-title">
          <span>Buks</span>
          <span>Samuel.</span>
        </h1>

        <div className="hero-footer">
          <p className="hero-intro">
            I explore technology by building things — across software, cloud,
            AI and systems.
          </p>

          <dl className="hero-meta">
            <div>
              <dt>Based in</dt>
              <dd>→ Nigeria</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>→ Exploring</dd>
            </div>
          </dl>

          <div className="hero-actions">
            <a href="#work">View my work ↘</a>
            <a href="#explore">Enter explorer →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
