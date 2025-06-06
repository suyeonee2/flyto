"use client";

import React, { useRef, useEffect } from "react";
import styles from "./Concepts.module.css";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Concepts() {
  const conceptRef = useRef(null);

  useEffect(() => {
    if (conceptRef.current) {
      gsap.fromTo(
        conceptRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: conceptRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <section className={styles.conceptSection} ref={conceptRef}>
      <h2 className={styles.title}>포트폴리오</h2>
      <p className={styles.subtitle}>
        다양한 브랜드와 함께한 큐레이션 프로젝트
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <Image src="/mock1.png" alt="콘셉트1" width={400} height={250} />
          <h3>브랜드 A</h3>
          <p>‘00’를 위한 퍼스널 큐레이션 콘텐츠</p>
        </div>
        <div className={styles.card}>
          <Image src="/mock2.png" alt="콘셉트2" width={400} height={250} />
          <h3>브랜드 B</h3>
          <p>테스트 기반 결과 콘텐츠 + 스타일링</p>
        </div>
        {/* 필요 시 더 추가 */}
      </div>
    </section>
  );
}
