"use client";

import { useState, type ReactNode } from "react";
import styles from "./projects.module.css";

export default function ProjectCard({ id, children }: { id: string; children: ReactNode }) {
  const [upright, setUpright] = useState(false);
  return (
    <article
      id={id}
      className={styles.note}
      data-upright={upright}
      onPointerEnter={() => setUpright(true)}
      onFocus={() => setUpright(true)}
    >
      {children}
    </article>
  );
}
