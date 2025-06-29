"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { matchColorType } from "@/logic/color-pick";
import resultMap from "../assets/fwee_resultMap.json";
import fweeColors from "../assets/fwee_colors.json";
import styles from "./ResultClient.module.css";
import ContentLayout from "@/components/ContentLayout";
import Image from "next/image";
import Header from "@/components/Header/Header";
import ShareButton from "@/components/utils/ShareButtons";
import exampleData from "@/app/examples/TestList.json";

export default function FweeVolumingResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [recommended, setRecommended] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const testInfo = exampleData.find((t) => t.id === "fwee_voluming");

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
    setCurrentSlide(0);

    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? recommended.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % recommended.length);
  };

  const handleRetry = () => {
    if (testInfo?.path) {
      router.push(testInfo.path);
    } else {
      alert("테스트 경로를 찾을 수 없습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingPage}>
        <p className={styles.loadingText}>어울리는 컬러를 분석 중...</p>
        <div className={styles.spinner}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgFwee}>
        <div className={styles.R_section}>
          <div className={styles.imageWrapper}>
            <Image
              src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/fwee_voluming/r_Img.avif"
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

        <div className={styles.buttonRow}>
          <a
            href="https://fwee.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.glassButton}
          >
            퓌 공식몰 보기
          </a>

          <button
            className={styles.glassButton}
            onClick={() => router.push(testInfo.path)}
          >
            테스트 다시하기
          </button>
        </div>

        <div className={styles.Btn_container}>
          <ShareButton
            title={testInfo.title}
            description={testInfo.desc}
            imageUrl={testInfo.image}
            shareUrl={`https://www.fylto.kr${testInfo.path}`}
          />
        </div>
      </ContentLayout>
    </>
  );
}
