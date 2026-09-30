"use client";
import { useRef, useState, type FormEvent } from "react";
import styles from "./contact.module.css";

const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() ?? "";
export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const sending = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint || sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = ["name", "email", "message"] as const;
    for (const field of fields) {
      if (!String(data.get(field) ?? "").trim()) {
        const input = form.elements.namedItem(field) as HTMLInputElement;
        input.setCustomValidity(`Please enter your ${field}.`);
        input.reportValidity();
        return;
      }
    }
    sending.current = true;
    setState("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(data.get("name")).trim(),
          email: String(data.get("email")).trim(),
          message: String(data.get("message")).trim(),
          _gotcha: String(data.get("_gotcha") ?? ""),
        }),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error("Submission failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    } finally {
      sending.current = false;
    }
  }
  return (
    <section
      id="contact"
      className={styles.contact}
      aria-labelledby="contact-title"
    >
      <div>
        <p className="section-index">Get in touch</p>
        <h2 id="contact-title">Have something worth working on?</h2>
        <p>
          Products, technical work, research conversations, or a question we
          could figure out together.
        </p>
        <a className={styles.email} href="mailto:samuelbukumni@gmail.com">
          samuelbukumni@gmail.com ↗
        </a>
        <div className={styles.socials}>
          <a
            href="https://github.com/samuelbukumni"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/oguntona-samuel/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a href="https://x.com/bukssamuel25" target="_blank" rel="noreferrer">
            X ↗
          </a>
          <a
            href="https://www.tiktok.com/@bukssamuel"
            target="_blank"
            rel="noreferrer"
          >
            TikTok ↗
          </a>
        </div>
      </div>
      <form
        onSubmit={submit}
        className={styles.form}
        aria-label="Contact Samuel"
      >
        <div className={styles.fields}>
          <label>
            Name
            <input
              name="name"
              autoComplete="name"
              required
              onChange={(e) => e.currentTarget.setCustomValidity("")}
              disabled={state === "sending"}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              onChange={(e) => e.currentTarget.setCustomValidity("")}
              disabled={state === "sending"}
            />
          </label>
        </div>
        <label>
          What do you have in mind?
          <textarea
            name="message"
            rows={4}
            required
            onChange={(e) => e.currentTarget.setCustomValidity("")}
            disabled={state === "sending"}
          />
        </label>
        <div className="sr-only" aria-hidden="true">
          <label>
            Leave empty
            <input name="_gotcha" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <button
          className="button"
          type="submit"
          disabled={!endpoint || state === "sending"}
        >
          {state === "sending" ? "Sending…" : "Send message →"}
        </button>
        <p role="status" className={styles.status}>
          {state === "success"
            ? "Message sent. Thanks for getting in touch."
            : state === "error"
              ? "Your message did not go through. Please retry or email me directly."
              : !endpoint
                ? "The form is not connected yet. Email me directly to get in touch."
                : ""}
        </p>
      </form>
    </section>
  );
}
