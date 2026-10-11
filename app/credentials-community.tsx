import styles from "./credentials.module.css";

const entries = [
  {
    label: "University",
    title: "Information Systems at OAU",
    detail:
      "Obafemi Awolowo University, Ile-Ife. Studying how technology fits into the way people and organisations work.",
  },
  {
    label: "Completed",
    title: "HP LIFE courses",
    detail:
      "AI for Beginners, Customer Experience (CX), Effective Presentations, and Business Email.",
  },
  {
    label: "Community",
    title: "Learning with other people",
    detail:
      "Global Hack Week: Agents (MLH), Build with AI, TESSA, and the Association of Campus Journalists at OAU.",
  },
  {
    label: "Now",
    title: "Cloud, Linux, and AI evaluation",
    detail:
      "Working through cloud fundamentals and Linux practice alongside my projects. Beginning to learn how AI behaviour can be evaluated.",
  },
];

export default function CredentialsCommunity() {
  return (
    <section
      className={styles.section}
      id="learning"
      aria-labelledby="learning-title"
    >
      <div className={styles.intro}>
        <p className="section-index">Learning &amp; community</p>
        <h2 id="learning-title">
          Still a student.
          <br />
          Always learning.
        </h2>
        <p>A few parts of my learning so far, in and outside the classroom.</p>
      </div>
      <ol className={styles.timeline}>
        {entries.map((entry) => (
          <li key={entry.title}>
            <span className={styles.label}>{entry.label}</span>
            <div>
              <h3>{entry.title}</h3>
              <p>{entry.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
