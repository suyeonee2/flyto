"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import content from "../data/question.json";
import ContentLayout from "@/components/ContentLayout";
import Image from "next/image";
import Header from "@/components/Header/Header";

export default function LeLaboCandleQ() {
  const router = useRouter();
  const questions = content;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSelect = (value) => {
    const updated = [...answers, value];

    if (step === questions.length - 1) {
      const query = updated.map((v, i) => `a${i}=${v}`).join("&");
      router.push(`/examples/lelabo_candle/result?${query}`);
    } else {
      setAnswers(updated);
      setStep((prev) => prev + 1);
    }
  };

  const currentQ = questions[step];
  if (step >= questions.length) return null;

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgLelabo}>
        <div className={styles.questionSection}>
          <div className={styles.imageWrapper}>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{
                  width: `${((step + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
            <Image
              src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/lelabo_candle/q_img.avif"
              alt="질문 배경"
              className={styles.thumbnail}
              width={891}
              height={1260}
              unoptimized
            />

            <div className={styles.contentOverlay}>
              <div className={styles.questionBox}>
                <h2 className={styles.question}>{currentQ.question}</h2>

                <ul className={styles.options}>
                  {currentQ.options.map((opt, idx) => (
                    <li
                      key={idx}
                      className={styles.option}
                      onClick={() => handleSelect(opt)}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p>* 예시 콘텐츠로 제작되었으며, 실제 브랜드와 무관합니다.</p>
      </ContentLayout>
    </>
  );
}
