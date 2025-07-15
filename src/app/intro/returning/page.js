"use client";

import React, { useEffect, useRef } from "react";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function Returning() {
  const router = useRouter();

  const bubble1Ref = useRef(null);
  const bubble2Ref = useRef(null);
  const optionsBubbleRef = useRef(null);
  const recommendBubbleRef = useRef(null);

  useEffect(() => {
    gsap.to(bubble1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
    });

    gsap.to(bubble2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1.2,
      ease: "power2.out",
    });

    gsap.to(optionsBubbleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 2.2,
      ease: "power2.out",
    });

    gsap.to(recommendBubbleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 3.2,
      ease: "power2.out",
    });
  }, []);

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <Header />
      <div className={styles.scene_wrapper}>
        <div className={styles.grid_bg} />

        <div className={styles.content}>
          {/* 왼쪽 말풍선 1 */}
          <div
            ref={bubble1Ref}
            className={`${styles.bubble} ${styles.leftBubble}`}
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <p>다시 오셨군요! 👀</p>
          </div>

          {/* 왼쪽 말풍선 2 */}
          <div
            ref={bubble2Ref}
            className={`${styles.bubble} ${styles.leftBubble}`}
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <p>무엇을 하시겠어요?</p>
          </div>

          {/* 오른쪽 - 선택지 리스트 */}
          <div
            ref={optionsBubbleRef}
            className={`${styles.bubble} ${styles.rightBubble}`}
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <p> [ 궁금한 점을 선택하세요 ] </p>
            <ul className={styles.linkList}>
              {[
                { text: "🤔 Fylto가 궁금해!", path: "/about" },
                {
                  text: "🍀 큐레이션 방법이 궁금해",
                  path: "/intro/first-time#process",
                },
                {
                  text: "👀 콘텐츠 가이드 보고싶어",
                  path: "/intro/first-time#guide",
                },
                { text: "🖥️ 콘텐츠 예시 보고싶어", path: "/examples" },
                {
                  text: "💌 연락하고 싶어!",
                  path: "/intro/first-time#contact",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className={styles.linkItem}
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* 오른쪽 - 추천받기 */}
          <div
            ref={recommendBubbleRef}
            className={`${styles.bubble} ${styles.rightBubble}`}
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <p>
              [ 브랜드에 맞는 콘텐츠가 궁금하다면? ]
              <br />
              👉{" "}
              <span
                onClick={() => handleNavigate("/recommend")}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  lineHeight: 2,
                }}
              >
                지금 바로 추천받기!
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
