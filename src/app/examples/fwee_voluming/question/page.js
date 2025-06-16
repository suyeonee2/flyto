"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import content from "../assets/fwee_questions.json";
import ContentLayout from "@/Components/ContentLayout";
import Image from "next/image";
import questionBg from "../assets/q_Img.png";
import Header from "@/Components/Header/Header";

export default function FweeVolumingQ() {
  const router = useRouter();
  const questions = content;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSelect = (value) => {
    const updated = [...answers, value];
    if (step === questions.length - 1) {
      const query = updated.map((v, i) => `a${i}=${v}`).join("&");
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
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className={styles.questionBox}>
            <p className={styles.step}>Q{step + 1}</p>
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
      </ContentLayout>
    </>
  );
}
