"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logTestPageView } from "@/components/utils/gtag";
import styles from "./page.module.css";
import ContentLayout from "@/components/ContentLayout";
import Header from "@/components/Header/Header";

export default function FweeVolumingMain() {
  const router = useRouter();
  useEffect(() => {
    logTestPageView("Fwee_Voluming Gloss");
  }, []);

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgFwee}>
        <div className={styles.startSection}>
          <video
            src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/fwee_voluming/fwee.mp4"
            autoPlay
            muted
            loop
            playsInline
            className={styles.thumbnail}
          />

          <button
            className={styles.startButton}
            onClick={() => router.push("/examples/fwee_voluming/question")}
          >
            테스트 시작하기
          </button>
        </div>

        <p>* 예시 콘텐츠로 제작되었으며, 실제 브랜드와 무관합니다.</p>
      </ContentLayout>
    </>
  );
}
