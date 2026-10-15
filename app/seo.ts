// Public identity only. Keep these URLs in sync with the visible contact links.
const personId = "https://bukssamuel.dev/#person";

export const identityStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: "Samuel Oguntona",
      alternateName: ["Oguntona Samuel", "Oguntona Samuel Oluwabukunmi", "Samuel Oluwabukunmi Oguntona", "Buks Samuel", "bukssamuel"],
      url: "https://bukssamuel.dev/",
      image: "https://bukssamuel.dev/images/samuel-oguntona.jpg",
      description: "Information Systems student at Obafemi Awolowo University building software and learning cloud engineering.",
      affiliation: { "@type": "CollegeOrUniversity", name: "Obafemi Awolowo University" },
      sameAs: [
        "https://github.com/samuelbukumni",
        "https://www.linkedin.com/in/oguntona-samuel/",
        "https://x.com/bukssamuel25",
        "https://www.tiktok.com/@bukssamuel",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://bukssamuel.dev/#website",
      name: "Samuel Oguntona | Buks Samuel",
      url: "https://bukssamuel.dev/",
      description: "Portfolio of Samuel Oguntona (Buks Samuel): software projects, Linux, and cloud engineering learning.",
      author: { "@id": personId },
      inLanguage: "en",
    },
  ],
};
