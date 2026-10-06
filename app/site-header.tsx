"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./site-header.module.css";

type Theme = "light" | "dark";

export default function SiteHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("buks-theme", next);
    } catch {
      // Storage can be unavailable.
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.signature} href="/" aria-label="bukssamuel, home">
          bukssamuel
        </Link>

        <div className={styles.actions}>
          <nav aria-label="Primary navigation">
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
              Home
            </Link>
            <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>
              About
            </Link>
          </nav>

          <button
            type="button"
            className={styles.themeToggle}
            data-theme={theme}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className={styles.themeOption} data-active={theme === "light"} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3.2" />
                <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
              </svg>
            </span>
            <span className={styles.themeOption} data-active={theme === "dark"} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M19 15.3A7.7 7.7 0 0 1 8.7 5a7.8 7.8 0 1 0 10.3 10.3Z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
