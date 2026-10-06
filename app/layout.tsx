import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Caveat, Source_Serif_4, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import SiteHeader from "./site-header";
import RouteMemory from "./route-memory";
import "./globals.css";

const display = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: "400",
  subsets: ["latin"],
});

const signature = Caveat({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

const themeBoot = `(() => {
  try {
    const stored = localStorage.getItem("buks-theme");
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();`;

export const metadata: Metadata = {
  title: {
    default: "Buks Samuel — Tech Explorer",
    template: "%s — Buks Samuel",
  },
  description:
    "Tech Explorer building and investigating digital systems across software, infrastructure, Linux, security and AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${ibmPlexMono.variable} ${signature.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <RouteMemory />
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <span>Buks Samuel</span>
          <span>Built with intent. Still in progress.</span>
          <Link href="/#contact">Get in touch →</Link>
        </footer>
      </body>
    </html>
  );
}
