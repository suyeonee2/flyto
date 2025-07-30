"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { standard } from "@/logic/standard";
import candleData from "../data/candleData.json";
import styles from "./ResultClient.module.css";
import ContentLayout from "@/components/ContentLayout";
import Header from "@/components/Header/Header";
import ShareButton from "@/components/utils/ShareButtons";
import exampleData from "@/app/examples/TestList.json";
import Image from "next/image";

export default function LeLaboResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [recommended, setRecommended] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const testInfo = exampleData.find((t) => t.id === "lelabo_candle");

  useEffect(() => {
    const answers = {
      q1: searchParams.get("a0"),
      q2: searchParams.get("a1"),
      q3: searchParams.get("a2"),
      q4: searchParams.get("a3"),
    };

    const selectedId = standard(answers);
    setRecommended(selectedId);

    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const currentCandle = candleData.find((c) => c.id === recommended);

  if (isLoading) {
    return (
      <div className={styles.loadingPage}>
        <p className={styles.loadingText}>당신의 취향을 분석중...</p>
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
      <ContentLayout className={styles.bgLelabo}>
        <div className={styles.R_section}>
          <h3 className={styles.R_title}>나만의 르 라보 클래식 캔들은...</h3>
          <div className={styles.textResultWrapper}>
            {currentCandle && (
              <>
                {currentCandle.video && (
                  <video
                    className={styles.resultVideo}
                    src={currentCandle.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.bannerConatiner}>
          <a
            href="https://www.lelabofragrances.co.kr/classic-candle.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/lelabo_candle/lelabo_banner.avif"
              alt="banner"
              width={400}
              height={100}
              className={styles.mallBanner}
              unoptimized
            />
          </a>
        </div>
        <div className={styles.buttonRow}>
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
