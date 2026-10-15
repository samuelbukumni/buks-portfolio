import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Caveat, Manrope, Public_Sans } from "next/font/google";
import SiteCursor from "./site-cursor";
import Opening from "./opening";
import SiteHeader from "./site-header";
import { identityStructuredData } from "./seo";
import "./globals.css";

const body = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
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
  authors: [{ name: "Samuel Oguntona", url: "https://bukssamuel.dev" }],
  creator: "Samuel Oguntona",
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    url: "https://bukssamuel.dev",
    siteName: "Samuel Oguntona | Buks Samuel",
    title: "Samuel Oguntona (Buks Samuel) | Software & Systems",
    description: "Samuel Oguntona, also known as Buks Samuel, builds software and explores Linux, cloud engineering, and systems. See his projects and background.",
    images: [{ url: "/images/samuel-oguntona.jpg", width: 1030, height: 1536, alt: "Samuel Oguntona" }],
  },
  twitter: {
    card: "summary",
    title: "Samuel Oguntona (Buks Samuel) | Software & Systems",
    description: "Samuel Oguntona (Buks Samuel) builds software and explores Linux, cloud engineering, and systems.",
    images: ["/images/samuel-oguntona.jpg"],
  },
  title: {
    default: "Samuel Oguntona (Buks Samuel) | Software & Systems",
    template: "%s | Samuel Oguntona",
  },
  description:
    "Samuel Oguntona (Buks Samuel) is an Information Systems student at OAU building The Middleman and exploring Linux, software systems, and cloud engineering.",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(identityStructuredData).replace(/</g, "\\u003c") }} />
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
