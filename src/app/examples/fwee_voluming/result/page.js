"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { matchColorType } from "@/logic/color-pick";
import resultMap from "../assets/fwee_resultMap.json";
import styles from "./page.module.css";
import ContentLayout from "@/components/ContentLayout"; // ← 경로 소문자로 수정

export default function FweeVolumingResult() {
  const searchParams = useSearchParams();
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const answers = [];
    for (let i = 0; i < 12; i++) {
      const val = searchParams.get(`a${i}`);
      if (val) answers.push(val);
    }
    const key = matchColorType(answers);
    setRecommended(resultMap[key] || []);
  }, [searchParams]);

  if (!recommended.length) {
    return (
      <ContentLayout className={styles.bgFwee}>
        <div className={styles.loading}>결과를 불러오는 중...</div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout className={styles.bgFwee}>
      <section className={styles.resultSection}>
        <h1 className={styles.title}>당신에게 어울리는 퓌 볼류밍 틴트</h1>
        <p className={styles.subtitle}>컬러 큐레이션 결과예요 🎨</p>

        <ul className={styles.resultList}>
          {recommended.map((item, idx) => (
            <li key={idx} className={styles.resultItem}>
              <div className={styles.colorName}>{item}</div>
            </li>
          ))}
        </ul>

        <p className={styles.note}>
          더 많은 컬러는{" "}
          <a href="https://fwee.kr/" target="_blank" rel="noreferrer">
            퓌 공식몰
          </a>
          에서 확인해보세요!
        </p>
      </section>
    </ContentLayout>
  );
}
