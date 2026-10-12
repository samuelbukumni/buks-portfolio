import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Caveat, Public_Sans } from "next/font/google";
import Opening from "./opening";
import SiteHeader from "./site-header";
import "./globals.css";

const body = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

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
      sessionStorage.getItem("samuel-portrait-opening-v1") === "1" ||
      window.location.hash ? "complete" : "pending";
  } catch {}
})();`;

export const metadata: Metadata = {
  title: {
    default: "Samuel Oguntona — Web products & cloud engineering",
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
      className={`${body.variable} ${signature.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: openingBoot }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
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
