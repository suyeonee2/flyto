"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import content from "../data/question.json";
import ContentLayout from "@/components/ContentLayout";
import Image from "next/image";
import Header from "@/components/Header/Header";

export default function PremiumTintQPage() {
  const router = useRouter();
  const questionMap = Object.fromEntries(content.map((q) => [q.id, q]));

  const [currentId, setCurrentId] = useState("q1");
  const [answers, setAnswers] = useState([]);

  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const handleSelect = (option) => {
    const updatedAnswers = [...answers, option.id];
    setAnswers(updatedAnswers);

    if (!option.next) {
      const query = updatedAnswers.map((v, i) => `a${i}=${v}`).join("&");
      router.push(`/examples/romand_juicyTint/result?${query}`);
    } else {
      setCurrentId(option.next);
    }
  };

  const currentQ = questionMap[currentId];
  if (!currentQ) return null;

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgRomand}>
        <div className={styles.questionSection}>
          <div className={styles.imageWrapper}>
            <Image
              src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/romand_juicyTint/romand_q.avif"
              alt="질문 배경"
              className={styles.thumbnail}
              width={891}
              height={1260}
              unoptimized
            />
            <div className={styles.contentOverlay}>
              <div className={styles.questionBox}>
                <h3 className={styles.q_title}>{currentQ.title}</h3>
                <h2 className={styles.question}>{currentQ.question}</h2>
                <ul className={styles.swatchList}>
                  {shuffleArray(currentQ.options)
                    .filter((opt) => !!opt.hex)
                    .map((opt, idx) => (
                      <li
                        key={idx}
                        className={styles.pantoneChip}
                        onClick={() => handleSelect(opt)}
                      >
                        <div
                          className={styles.colorBox}
                          style={{ backgroundColor: opt.hex }}
                        />
                        <div className={styles.labelBox}>
                          <span>{opt.label}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.notice}>
            * 본 콘텐츠는 포트폴리오 예시로, 브랜드와 직접적인 관련은 없습니다.
          </p>
        </div>
      </ContentLayout>
    </>
  );
}
