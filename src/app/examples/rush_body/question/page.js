"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import content from "../data/question.json";
import ContentLayout from "@/components/ContentLayout";
import Image from "next/image";
import Header from "@/components/Header/Header";

export default function RushBodyQ() {
  const router = useRouter();
  const questions = content;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSelect = (value) => {
    const updated = [...answers, value];
    console.log(`Q${step + 1} 응답값:`, value);

    if (step === questions.length - 1) {
      const query = updated.map((v, i) => `a${i}=${v}`).join("&");
      console.log("최종 query string:", query);
      router.push(`/examples/rush_body/result?${query}`);
    } else {
      setAnswers(updated);
      setStep((prev) => prev + 1);
    }
  };

  const currentQ = questions[step];

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgRush}>
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
              src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/rush_Body+Spray/rush_q.avif"
              alt="question"
              className={styles.thumbnail}
              width={891}
              height={1260}
              unoptimized
            />

            <div className={styles.contentOverlay}>
              <h2 className={styles.question}>{currentQ.question}</h2>

              <div className={styles.optionScrollBox}>
                <ul className={styles.options}>
                  {currentQ.options.map((opt, idx) => (
                    <li
                      key={idx}
                      className={styles.option}
                      onClick={() => handleSelect(opt.value)}
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p className={styles.rush_p}>
          * 본 콘텐츠는 포트폴리오 예시로, 브랜드와 직접적인 관련은 없습니다.
        </p>
      </ContentLayout>
    </>
  );
}
