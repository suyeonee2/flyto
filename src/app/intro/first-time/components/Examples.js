import React from "react";
import styles from "./Examples.module.css";

export default function Examples() {
  return (
    <section className={styles.examplesSection}>
      <p className={styles.Eyebrow}>
        <span style={{ fontSize: "23px", color: "#bdbdbd" }}>✱</span>
        <br />
        <br />
        큐레이션 콘텐츠 예시
      </p>
      <h2 className={styles.HeroTitle}>Examples</h2>
      <p className={styles.HeroDescription}>
        상업 목적이 아닌 포트폴리오 용도로 제작되었습니다.
      </p>

      {/* 🔽 스타일 예시 카드들 들어가는 영역 (예시) */}
      <div className={styles.stylesGrid}>
        {/* 예시 1 */}
        <div className={styles.styleCard}>
          <img src="/example1.png" alt="브랜드 예시" />
          <p className={styles.cardTitle}>따뜻한 무드 큐레이션</p>
        </div>

        {/* 예시 2 */}
        <div className={styles.styleCard}>
          <img src="/example2.png" alt="브랜드 예시" />
          <p className={styles.cardTitle}>미니멀 & 모던 감성</p>
        </div>

        {/* 추가 스타일 카드들 필요 시 계속 추가 */}
      </div>
    </section>
  );
}
