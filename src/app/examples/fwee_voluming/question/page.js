"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import content from "../assets/fwee_questions.json";
import ContentLayout from "@/Components/ContentLayout";

export default function FweeVolumingQuestion() {
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
    <ContentLayout className={styles.bgFwee}>
      <div className={styles.questionSection}>
        <div className={styles.step}>
          Q{step + 1}/{questions.length}
        </div>
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
    </ContentLayout>
  );
}
