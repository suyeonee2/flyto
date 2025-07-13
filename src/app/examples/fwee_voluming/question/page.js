"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import content from "../assets/fwee_questions.json";
import ContentLayout from "@/components/ContentLayout";
import Image from "next/image";
import Header from "@/components/Header/Header";

export default function FweeVolumingQ() {
  const router = useRouter();
  const questions = content;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSelect = (value) => {
    const updated = [...answers, value];

    console.log(`Q${step + 1} 응답값:`, value); // ✅ 클릭할 때마다 콘솔에 출력

    if (step === questions.length - 1) {
      const query = updated.map((v, i) => `a${i}=${v}`).join("&");
      console.log("최종 query string:", query); // ✅ 쿼리 확인용
      router.push(`/examples/fwee_voluming/result?${query}`);
    } else {
      setAnswers(updated);
      setStep((prev) => prev + 1);
    }
  };

  const currentQ = questions[step];

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgFwee}>
        <div className={styles.questionSection}>
          <div className={styles.imageWrapper}>
            {/* ✅ 배경 이미지 */}
            <Image
              src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/fwee_voluming/q_Img.avif"
              alt="질문 배경"
              className={styles.thumbnail}
              width={891}
              height={1260}
              unoptimized
            />

            {/* ✅ 오버레이 콘텐츠 */}
            <div className={styles.contentOverlay}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{
                    width: `${((step + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>

              <div className={styles.questionBox}>
                <h2 className={styles.question}>{currentQ.question}</h2>

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

        {/* ✅ 하단 출처 고정 */}
        <p>* 예시 콘텐츠로 제작되었으며, 실제 브랜드와 무관합니다.</p>
      </ContentLayout>
    </>
  );
}
