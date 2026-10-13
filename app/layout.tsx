import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Caveat, Manrope, Public_Sans } from "next/font/google";
import SiteCursor from "./site-cursor";
import Opening from "./opening";
import SiteHeader from "./site-header";
import "./globals.css";

const body = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const display = Manrope({ variable: "--font-display", subsets: ["latin"], display: "swap" });

const signature = Caveat({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

const openingBoot = `(() => {
  try {
    document.documentElement.dataset.opening =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      sessionStorage.getItem("samuel-trail-opening-v1") === "1" ||
      window.location.hash ? "complete" : "pending";
  } catch {}
})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://bukssamuel.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://bukssamuel.dev",
    siteName: "Samuel Oguntona",
    title: "Samuel Oguntona — Software & Systems",
    description: "Building software, investigating systems, and learning cloud engineering. Explore my projects and build log.",
    images: [{ url: "/images/samuel-oguntona.jpg", width: 1030, height: 1536, alt: "Samuel Oguntona" }],
  },
  twitter: {
    card: "summary",
    title: "Samuel Oguntona — Software & Systems",
    description: "Building software, investigating systems, and learning cloud engineering.",
    images: ["/images/samuel-oguntona.jpg"],
  },
  title: {
    default: "Samuel Oguntona — Software & Systems",
    template: "%s — Buks Samuel",
  },
  description:
    "Samuel Oguntona, founder of The Middleman and Information Systems student at OAU. Web products, Linux, and a growing focus on cloud engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${body.variable} ${display.variable} ${signature.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: openingBoot }} />
        <noscript><style>{'[data-phase="boot"] { display: none !important; }'}</style></noscript>
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteCursor />
        <Opening />
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <span>© 2026 Samuel Oguntona</span>
          <span>Thanks for stopping by.</span>
        </footer>
      </body>
    </html>
  );
}
