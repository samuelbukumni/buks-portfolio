import Link from "next/link";
import styles from "./site-header.module.css";
export default function SiteHeader() { return <header className={styles.header}><div className={styles.inner}><Link className={styles.signature} href="/" aria-label="bukssamuel, home">bukssamuel</Link><nav aria-label="Primary navigation"><Link href="/#work">Work</Link><Link href="/#story">Story</Link><Link href="/#contact">Contact</Link></nav></div></header>; }
