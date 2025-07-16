// examples/temp/ComingSoon.js
"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function ComingSoon() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>⏳ 콘텐츠 준비 중입니다</h1>
      <p className={styles.description}>
        해당 큐레이션 콘텐츠는 아직 준비 중이에요.
      </p>
      <Link href="/examples" className={styles.button}>
        돌아가기
      </Link>
    </div>
  );
}
