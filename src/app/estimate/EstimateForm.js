"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import questions from "./data/estimateQuestions";
import Header from "@/components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EstimateForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const searchParams = useSearchParams();
  const selectedType = searchParams.get("type"); // basic, standard, premium 중 하나

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
      type: selectedType || "미지정", // 쿼리 없을 경우 fallback
      ...answers,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyT1JRvyqy7OI7QbOoq8ui-NqsPpqYAGgOlUhWOv6cxialNs2z1kAqLa6bk5zTM4PDK/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("확인 후 연락 드리겠습니다. 감사합니다 :)");
      setStep(0);
      setAnswers({});
    } catch (error) {
      toast.error("오류가 발생했어요. 나중에 다시 시도해주세요.");
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
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        closeOnClick
        autoClose={5000}
        draggable={false}
        toastStyle={{
          zIndex: 9999,
          borderRadius: "10px",
          fontSize: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      />
      <div className={styles.grid_bg} />
      <div className={styles.container}>
        <div className={styles.questionContainer}>
          <p className={styles.question_Text}>{currentQuestion.question}</p>

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
            {step === questions.length - 1 ? "💌 제출하기" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
}
