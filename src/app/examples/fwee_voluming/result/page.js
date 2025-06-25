"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { matchColorType } from "@/logic/color-pick";
import resultMap from "../assets/fwee_resultMap.json";
import { fweeColors } from "../assets/fwee_colors";
import styles from "./page.module.css";
import ContentLayout from "@/Components/ContentLayout";
import Image from "next/image";
import Header from "@/Components/Header/Header";
import resultBg from "../assets/r_Img.png";

export default function FweeVolumingResult() {
  const searchParams = useSearchParams();
  const [recommended, setRecommended] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const answers = {
      q1: searchParams.get("a0"),
      q3: searchParams.get("a2"),
      q4: searchParams.get("a3"),
      q5: searchParams.get("a4"),
    };

    const key = matchColorType(answers);
    const ids = resultMap[key] || [];

    const selected =
      ids.length > 2
        ? [...ids].sort(() => 0.5 - Math.random()).slice(0, 2)
        : ids;

    setRecommended(selected);
    setCurrentSlide(0); // 초기화
  }, [searchParams]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? recommended.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % recommended.length);
  };

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgFwee}>
        <div className={styles.R_section}>
          <div className={styles.imageWrapper}>
            <Image
              src={resultBg}
              alt="결과 배경"
              className={styles.thumbnail}
              width={891}
              height={1260}
              unoptimized
            />

            <div className={styles.contentOverlay}>
              {recommended.length > 0 && (
                <div className={styles.slideWrapper}>
                  <Image
                    src={
                      fweeColors.find((c) => c.id === recommended[currentSlide])
                        ?.image
                    }
                    alt={recommended[currentSlide]}
                    width={280}
                    height={280}
                    className={styles.resultImage}
                    unoptimized
                  />

                  {recommended.length > 1 && (
                    <div className={styles.slideControls}>
                      <button onClick={handlePrev}>‹</button>
                      <span>
                        {currentSlide + 1} / {recommended.length}
                      </span>
                      <button onClick={handleNext}>›</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className={styles.notice}>
          * 포트폴리오 목적으로 제작된 콘텐츠이며, 실제 브랜드와 무관합니다.
        </p>
      </ContentLayout>
    </>
  );
}
