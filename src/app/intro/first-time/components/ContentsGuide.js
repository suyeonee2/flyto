"use client";
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./ContentsGuide.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import GuideCard from "@/components/GuideCard/GuideCard";

gsap.registerPlugin(ScrollTrigger);

export default function ContentsGuide() {
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef(null);

  const guideData = [
    {
      type: "basic",
      title: "베이직",
      summary: "가볍게 시도해볼 수 있는 2D 기반 콘텐츠",
      budget: "100만 원 미만",
      items: [
        "간단한 미니 테스트",
        "2D 일러스트 OR 제품컷 활용",
        "질문 5개 이하 / 결과 단일 추천",
        "총 제품 최대 12개",
        "심플한 비주얼 스타일",
      ],
      duration: "1~2주",
      exampleLink: "/examples/comingsoon",
      image: "/basic.png",
    },
    {
      type: "standard",
      title: "스탠다드",
      summary: "브랜드 무드를 살린 3D 그래픽 콘텐츠",
      budget: "150~200만 원",
      items: [
        "중간 규모 테스트",
        "3D 렌더링 기반",
        "질문 12개 이하 / 결과 혼합 추천",
        "총 제품 최대 20개",
        "브랜드 톤 & 무드 반영",
      ],
      duration: "2~3주",
      exampleLink: "/examples/fwee_voluming",
      image: "/standard.png",
    },
    {
      type: "premium",
      title: "프리미엄",
      summary: "인터랙티브 3D로 완성하는 고급형 콘텐츠",
      budget: "250만 원 이상",
      items: [
        "풀스케일 테스트",
        "인터랙티브 3D 기반",
        "브랜드 톤 & 무드 반영",
        "사용자 인터랙션 포함",
        "질문/결과/제품 수 협의필요",
      ],
      duration: "4주 이상",
      exampleLink: "/examples/comingsoon",
      image: "/premium.png",
    },
  ];

  useEffect(() => {
    const animations = [
      { ref: eyebrowRef, delay: 0.5 },
      { ref: titleRef, delay: 0.6 },
      { ref: descRef, delay: 0.7 },
      { ref: cardsRef, delay: 1 },
    ];

    animations.forEach(({ ref, delay }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: delay,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 90%",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section className={styles.guridSection} id="guide">
      <p className={styles.Eyebrow} ref={eyebrowRef}>
        <span style={{ fontSize: "23px", color: "#bdbdbd" }}>✱</span>
        <br />
        <br />
        큐레이션 콘텐츠 유형 가이드
      </p>
      <h2 className={styles.HeroTitle} ref={titleRef}>
        Content Type Guide
      </h2>
      <p className={styles.HeroDescription} ref={descRef}>
        원하는 예산과 스타일에 맞는 큐레이션 콘텐츠를 선택해보세요
      </p>

      <div className={styles.cardsWrapper} ref={cardsRef}>
        {guideData.map((card, i) => (
          <div className={styles.cardColumn} key={i}>
            <GuideCard
              type={card.type}
              title={card.title}
              image={card.image}
              items={card.items}
              budget={card.budget}
              duration={card.duration}
              summary={card.summary}
              exampleLink={card.exampleLink}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
