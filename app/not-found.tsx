import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="section-index">404 / A wrong turn</p>
      <h1>This page isn’t here.</h1>
      <p>You can find my projects and contact details back on the homepage.</p>
      <Link className="button" href="/">
        Back to Home →
      </Link>
    </main>
  );
}
