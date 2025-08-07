"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logTestPageView } from "@/components/utils/gtag";
import styles from "./page.module.css";
import ContentLayout from "@/components/ContentLayout";
import Header from "@/components/Header/Header";
import Image from "next/image";

export default function RushBodyMain() {
  const router = useRouter();

  useEffect(() => {
    logTestPageView("Rush_Body_Spray");
  }, []);

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgRush}>
        <div className={styles.startSection}>
          <div className={styles.imageWrapper}>
            <Image
              src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/rush_Body+Spray/rush_main.avif"
              alt="main"
              className={styles.thumbnail}
              width={891}
              height={1260}
              unoptimized
            />
            <button
              className={styles.startButton}
              onClick={() => router.push("/examples/rush_body/question")}
            >
              테스트 시작하기
            </button>
          </div>
          <p className={styles.rush_p}>
            * 본 콘텐츠는 포트폴리오 예시로, 브랜드와 직접적인 관련은 없습니다.
          </p>
        </div>
      </ContentLayout>
    </>
  );
}
