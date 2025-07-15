"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import questions from "./data/estimateQuestions";
import Header from "@/components/Header/Header";

export default function EstimatePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[step];
  const currentAnswer = answers[currentQuestion.id];

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleInputChange = (e) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }));
  };

  const submitAnswers = async () => {
    const payload = {
      timestamp: new Date().toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
      }),
      ...answers,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxxuJCHjDqxqpt4TpNCO3uEvTM2ri3hmq3osEKtqVttDrQ5QvhLEqWLyFA3NslpFbF6/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 응답을 못 읽으니까 그냥 성공으로 간주
      alert("성공적으로 제출되었어요! 감사합니다 :)");
      setStep(0);
      setAnswers({});
    } catch (error) {
      console.error("제출 에러:", error);
      alert("오류가 발생했어요. 나중에 다시 시도해주세요.");
    }
  };
  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      console.log("제출된 답변:", answers);
      submitAnswers();
    }
  };

  return (
    <div className={styles.scene_wrapper}>
      <Header />
      <div className={styles.grid_bg} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>큐레이션 콘텐츠 견적 요청</h1>
          <p className={styles.subtitle}>
            간단한 질문에 답하고, 적합한 견적을 확인해보세요.
          </p>
        </div>

        <div className={styles.questionContainer}>
          <p className={styles.questionText}>{currentQuestion.question}</p>

          {currentQuestion.type === "input" ? (
            <input
              type="text"
              placeholder="이메일 또는 전화번호를 적어주세요"
              className={styles.textInput}
              value={currentAnswer || ""}
              onChange={handleInputChange}
            />
          ) : (
            <div className={styles.optionsWrapper}>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`${styles.optionButton} ${
                    currentAnswer === option ? styles.selected : ""
                  }`}
                  onClick={() => handleSelect(currentQuestion.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <button
            className={styles.nextButton}
            onClick={handleNext}
            disabled={
              currentQuestion.type === "input"
                ? !currentAnswer
                : !answers[currentQuestion.id]
            }
          >
            {step === questions.length - 1 ? "견적 요청하기" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
}
