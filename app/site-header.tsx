"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./site-header.module.css";

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.signature} href="/" aria-label="bukssamuel, home">bukssamuel</Link>
        <nav aria-label="Primary navigation">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
        </nav>
      </div>
    </header>
  );
}
