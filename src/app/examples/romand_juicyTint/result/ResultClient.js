"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { premium } from "@/logic/premium";
import tintData from "../data/TintData.json";
import styles from "./ResultClient.module.css";
import ContentLayout from "@/components/ContentLayout";
import Header from "@/components/Header/Header";
import ShareButton from "@/components/utils/ShareButtons";
import exampleData from "@/app/examples/TestList.json";
import Image from "next/image";

export default function PremiumTintResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [recommended, setRecommended] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const testInfo = exampleData.find((t) => t.id === "romand_juicyTint");
  const [showAll, setShowAll] = useState(false);
  const [clickedTint, setClickedTint] = useState(null);

  useEffect(() => {
    const answers = {
      q1: searchParams.get("a0"),
      q2: searchParams.get("a1"),
      q3: searchParams.get("a2"),
      q4: searchParams.get("a3"),
      q5: searchParams.get("a4"),
    };

    const resultIds = premium(answers);
    const resultArray = [resultIds.mainId, resultIds.subId].filter(Boolean);
    setRecommended(resultArray);
    setSelected(resultIds.mainId);

    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const currentSelected = tintData.find((t) => t.id === selected);
  if (isLoading) {
    return (
      <div className={styles.loadingPage}>
        <p className={styles.loadingText}>당신의 취향을 분석 중...</p>
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
      <ContentLayout className={styles.bgRomand}>
        <div className={styles.R_section}>
          <h3 className={styles.R_title}>나만의 쥬시 래스팅 틴트는...</h3>
          {/* 추천 컬러스와치 */}
          <ul className={styles.colorSwatches}>
            {recommended.map((id) => {
              const item = tintData.find((t) => t.id === id);
              if (!item) return null;
              return (
                <li
                  key={item.id}
                  className={`${styles.swatchCircle} ${
                    selected === item.id ? styles.active : ""
                  }`}
                  style={{ backgroundColor: item.hex }}
                  onClick={() => {
                    setSelected(item.id);
                    setClickedTint(null);
                  }}
                  title={item.name}
                />
              );
            })}
          </ul>
          {currentSelected && (
            <>
              <div className={styles.tintImageWrapper}>
                <Image
                  src={currentSelected.img}
                  alt={currentSelected.name}
                  width={891}
                  height={1170}
                  className={styles.tintImage}
                  unoptimized
                  priority
                />
              </div>
            </>
          )}

          {/* 전체 컬러 보기 토글 버튼 */}
          <div className={styles.AllColorBtnContainer}>
            <button
              className={styles.AllColorBtn}
              onClick={() => {
                setShowAll((prev) => {
                  const next = !prev;
                  if (!next) setClickedTint(null); // 닫을 때만 클릭된 틴트도 초기화
                  return next;
                });
              }}
            >
              전체 컬러 보기
            </button>
          </div>

          {/* 전체 스와치 리스트 */}
          {showAll && (
            <ul className={styles.colorSwatchesAll}>
              {tintData.map((item) => (
                <li
                  key={item.id}
                  className={styles.swatchCircle}
                  style={{ backgroundColor: item.hex }}
                  onClick={() => setClickedTint(item)}
                  title={item.name}
                />
              ))}
            </ul>
          )}

          {/* 클릭한 틴트 미리보기 */}
          {clickedTint && (
            <div className={styles.selectedPreview}>
              <Image
                src={clickedTint.img}
                alt={clickedTint.name}
                width={300}
                height={504}
                className={styles.miniImage}
                unoptimized
                priority
              />
            </div>
          )}
          <div className={styles.bannerConatiner}>
            <a
              href="https://romand.co.kr/product/%EB%A1%AC%EC%95%A4/958/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/romand_juicyTint/romand_banner.avif"
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
          <p className={styles.notice}>
            * 본 콘텐츠는 포트폴리오 예시로, 브랜드와 직접적인 관련은 없습니다.
          </p>
        </div>
      </ContentLayout>
    </>
  );
}
