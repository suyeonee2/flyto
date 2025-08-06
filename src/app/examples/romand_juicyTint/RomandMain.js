"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logTestPageView } from "@/components/utils/gtag";
import styles from "./page.module.css";
import ContentLayout from "@/components/ContentLayout";
import Header from "@/components/Header/Header";

export default function LelaboCandleMain() {
  const router = useRouter();

  useEffect(() => {
    logTestPageView("Lelabo_Candle");
  }, []);

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgRomand}>
        <div className={styles.startSection}>
          <video
            src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/romand_juicyTint/romand_main2.mp4"
            autoPlay
            muted
            playsInline
            className={styles.thumbnail}
          />

          <button
            className={styles.startButton}
            onClick={() => router.push("/examples/romand_juicyTint/question")}
          >
            테스트 시작하기
          </button>
        </div>

        <p className={styles.notice}>
          * 예시 콘텐츠로 제작되었으며, 실제 브랜드와 무관합니다.
        </p>
      </ContentLayout>
    </>
  );
}
