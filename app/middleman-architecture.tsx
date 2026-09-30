"use client";
import { useState } from "react";
import styles from "./projects.module.css";
const boundaries = [
  {
    name: "Identity",
    question: "Who is making this request?",
    description:
      "Authentication establishes identity. Buyer and seller workflows then need to distinguish what each account can do.",
    stack: "Supabase / authentication",
  },
  {
    name: "Application",
    question: "Who is allowed to change an order?",
    description:
      "The application connects account workflows, payments and review steps. A transaction needs a lifecycle, not just a checkout screen.",
    stack: "Next.js / TypeScript",
  },
  {
    name: "Data",
    question: "What state needs to survive?",
    description:
      "Accounts, orders and their lifecycle need a coherent database design. Access boundaries matter as much as the data itself.",
    stack: "PostgreSQL / Supabase",
  },
  {
    name: "Payments",
    question: "What makes a payment trustworthy?",
    description:
      "A payment result needs to connect back to the right transaction. Verification and safe retries are critical questions at this boundary.",
    stack: "Payments / transaction lifecycle",
  },
  {
    name: "Deployment",
    question: "How does the product become a service?",
    description:
      "Deployment connects application code, environment configuration and hosted services. This is where my interest in infrastructure becomes practical.",
    stack: "Vercel / service configuration",
  },
];
export default function MiddlemanArchitecture() {
  const [selected, setSelected] = useState(0);
  const current = boundaries[selected];
  return (
    <div className={styles.architecture}>
      <div className={styles.diagramHeader}>
        <span>Transaction lifecycle</span>
        <span>Conceptual product flow / 01</span>
      </div>
      <ol className={styles.transaction}>
        {[
          "Buyer",
          "Payment",
          "Escrow",
          "Seller delivery",
          "Buyer approval",
          "Settlement",
        ].map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
      <div className={styles.boundaries}>
        <div>
          <p className={styles.boundaryLabel}>Inspect a system boundary</p>
          <div
            className={styles.boundaryButtons}
            role="group"
            aria-label="Application hosted on Vercel, connected to identity, data and payment responsibilities"
          >
            {[4, 1, 0, 2, 3].map((index) => (
              <button
                key={boundaries[index].name}
                type="button"
                data-node={boundaries[index].name.toLowerCase()}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <span>
                  {
                    [
                      "Supabase Auth",
                      "Next.js",
                      "PostgreSQL",
                      "Payments",
                      "Vercel",
                    ][index]
                  }
                </span>
                <small>{boundaries[index].name}</small>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.boundaryDetail} aria-live="polite">
          <span className="technical">{current.stack}</span>
          <h3>{current.question}</h3>
          <p>{current.description}</p>
        </div>
      </div>
      <p className={styles.diagramNote}>
        These are connected responsibilities, not a single linear network
        request. The flow describes the product being built.
      </p>
    </div>
  );
}
