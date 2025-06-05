"use client";

import styles from "./Header.module.css";
import Link from "next/link";

export default function Header({ className = "" }) {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.header_inner}>
        <div className={styles.logo}>
          <Link href="/">Fylto.</Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/project">Project</Link>
          <Link href="/csoncepts">Concepts</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
