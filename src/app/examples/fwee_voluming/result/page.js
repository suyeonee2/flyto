"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { matchColorType } from "@/logic/color-pick";
import resultMap from "../assets/fwee_resultMap.json";
import colors from "../assets/fwee_colors.json";
import styles from "./page.module.css";
import ContentLayout from "@/Components/ContentLayout";

export default function FweeVolumingResult() {
  const searchParams = useSearchParams();
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    // q1, q3, q4, q5만 사용 (a0, a2, a3, a4)
    const answers = {
      q1: searchParams.get("a0"),
      q3: searchParams.get("a2"),
      q4: searchParams.get("a3"),
      q5: searchParams.get("a4"),
    };

    const key = matchColorType(answers);
    console.log("answers in result:", answers);
    console.log("matched key:", key);

    const ids = resultMap[key] || [];
    setRecommended(ids);
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
          {recommended.map((id, idx) => {
            const item = colors.find((c) => c.id === id);
            return (
              <li key={idx} className={styles.resultItem}>
                <div className={styles.colorName}>
                  <span className={styles.code}>{item?.code}</span> –{" "}
                  {item?.name}
                </div>
              </li>
            );
          })}
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
