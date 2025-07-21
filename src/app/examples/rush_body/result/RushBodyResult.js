"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getMatchedResult } from "../../../../logic/basic";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import ContentLayout from "@/components/ContentLayout";
import styles from "./page.module.css";
import Image from "next/image";
import ShareButtons from "@/components/utils/ShareButtons";
import exampleData from "@/app/examples/TestList.json";

export default function RushBodyResult() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const a0 = searchParams.get("a0");
  const a1 = searchParams.get("a1");
  const a2 = searchParams.get("a2");

  const testInfo = exampleData.find((t) => t.id === "rush_body");

  useEffect(() => {
    if (a0 && a1 && a2) {
      const matched = getMatchedResult([a0, a1, a2]);
      setResult(matched);
    }

    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, [a0, a1, a2]);

  if (isLoading) {
    return (
      <div className={styles.loadingPage}>
        <p className={styles.loadingText}>향 고르는 중...</p>
        <div className={styles.spinner}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgRush}>
        <div className={styles.resultSection}>
          <div className={styles.imageWrapper}>
            <Image
              src={result.image}
              alt={result.name}
              width={300}
              height={300}
              className={styles.resultImage}
              unoptimized
            />
          </div>
        </div>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <a
            href="https://brand.naver.com/lush/category/90b2346ef38341e48a194dda9aa464f7?cp=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/rush_Body+Spray/rush_banner.avif"
              alt="러쉬 공식몰 배너"
              width={420}
              height={150}
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
          <ShareButtons
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
