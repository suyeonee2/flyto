"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import ContentLayout from "@/Components/ContentLayout";
import Header from "@/Components/Header/Header";

export default function FweeVolumingStart() {
  const router = useRouter();

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgFwee}>
        <div className={styles.startSection}>
          <video
            src="/fwee.mp4"
            autoPlay
            muted
            loop
            playsInline
            className={styles.videoBackground}
          />

          <button
            className={styles.startButton}
            onClick={() => router.push("/examples/fwee_voluming/question")}
          >
            테스트 시작하기
          </button>
        </div>

        <p>
          * 포트폴리오 목적으로 제작된 콘텐츠이며, 실제 브랜드와 무관합니다.
        </p>
      </ContentLayout>
    </>
  );
}
