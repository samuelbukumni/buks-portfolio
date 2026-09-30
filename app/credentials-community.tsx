import styles from "./credentials.module.css";

type CredentialItem = {
  title: string;
  issuer: string;
  type: "Course Completion" | "Training in Progress";
  direction: "AI & Research" | "Software & Systems" | "Cloud & Infrastructure" | "Supporting";
  actionLabel: "View Certificate" | "Verify Credential" | "View Course";
  url?: string;
};

type CommunityItem = {
  title: string;
  organization: string;
  category: "Event & Hackathon" | "Summit & Conference" | "Community & Editorial" | "Training Program";
  description: string;
};

const credentials: CredentialItem[] = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training",
    type: "Training in Progress",
    direction: "Cloud & Infrastructure",
    actionLabel: "View Course",
    url: "https://aws.amazon.com/training/",
  },
  {
    title: "AI for Beginners",
    issuer: "HP LIFE",
    type: "Course Completion",
    direction: "AI & Research",
    actionLabel: "View Certificate",
  },
  {
    title: "Agile Project Management",
    issuer: "HP LIFE",
    type: "Course Completion",
    direction: "Software & Systems",
    actionLabel: "View Certificate",
  },
  {
    title: "Customer Experience (CX) for Business Success",
    issuer: "HP LIFE",
    type: "Course Completion",
    direction: "Software & Systems",
    actionLabel: "View Certificate",
  },
  {
    title: "Effective Presentations",
    issuer: "HP LIFE",
    type: "Course Completion",
    direction: "Supporting",
    actionLabel: "View Course",
  },
  {
    title: "Business Email",
    issuer: "HP LIFE",
    type: "Course Completion",
    direction: "Supporting",
    actionLabel: "View Course",
  },
];

const communityEvents: CommunityItem[] = [
  {
    title: "Global Hack Week: Agents",
    organization: "Major League Hacking (MLH)",
    category: "Event & Hackathon",
    description: "Hands-on participation building agentic workflows and exploring multi-agent architectures.",
  },
  {
    title: "2026 ACAI Summit",
    organization: "African Climate & AI Community",
    category: "Summit & Conference",
    description: "Attended sessions on AI applications, systems reliability, and regional technology infrastructure.",
  },
  {
    title: "Build with AI",
    organization: "Developer Community",
    category: "Event & Hackathon",
    description: "Participated in technical sessions on practical AI integration and model workflows.",
  },
  {
    title: "AWS / ThinkCloudly Training",
    organization: "ThinkCloudly & AWS Community",
    category: "Training Program",
    description: "Cloud fundamentals, IAM, compute, storage, and networking hands-on training.",
  },
  {
    title: "TESSA",
    organization: "Technology & Engineering Student Association",
    category: "Community & Editorial",
    description: "Active participation in student technology discussions and peer learning initiatives.",
  },
  {
    title: "Association of Campus Journalists (ACJ)",
    organization: "ACJ OAU",
    category: "Community & Editorial",
    description: "Editorial engagement, technical writing, and structured communication practice.",
  },
];

export default function CredentialsCommunity() {
  return (
    <section className={styles.section} id="credentials" aria-labelledby="credentials-title">
      <div className={styles.inner}>
        <div className={styles.column}>
          <div className={styles.header}>
            <p className="section-index">Credentials &amp; Learning Evidence</p>
            <h2 id="credentials-title">Structured learning.</h2>
            <p className={styles.sub}>
              Course completions and ongoing technical training supporting my engineering directions.
            </p>
          </div>

          <div className={styles.grid}>
            {credentials.map((item) => (
              <article key={item.title} className={styles.card}>
                <div className={styles.cardMeta}>
                  <span className={styles.typeBadge} data-type={item.type === "Training in Progress" ? "progress" : "complete"}>
                    {item.type}
                  </span>
                  <span className={styles.directionTag}>{item.direction}</span>
                </div>
                <h3>{item.title}</h3>
                <p className={styles.issuer}>{item.issuer}</p>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noreferrer" className={styles.actionLink}>
                    {item.actionLabel} ↗
                  </a>
                ) : (
                  <span className={styles.actionStatic}>{item.actionLabel}</span>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.header}>
            <p className="section-index">Community &amp; Participation</p>
            <h2>Active engagement.</h2>
            <p className={styles.sub}>
              Hackathons, technical summits, student societies, and community learning.
            </p>
          </div>

          <div className={styles.communityList}>
            {communityEvents.map((event) => (
              <article key={event.title} className={styles.communityCard}>
                <div className={styles.communityTop}>
                  <h3>{event.title}</h3>
                  <span className={styles.categoryBadge}>{event.category}</span>
                </div>
                <p className={styles.org}>{event.organization}</p>
                <p className={styles.desc}>{event.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
