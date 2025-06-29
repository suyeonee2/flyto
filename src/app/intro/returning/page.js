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
  const optionRefs = useRef([]);

  useEffect(() => {
    // 왼쪽 말풍선 순차 등장
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
      delay: 1.5,
      ease: "power2.out",
    });

    // 오른쪽 옵션 말풍선들 순차 등장
    optionRefs.current.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 2.6 + i * 0.4,
        ease: "power2.out",
      });
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

        {/* 💬 왼쪽 말풍선 */}
        <div className={styles.content}>
          <div
            ref={bubble1Ref}
            className={`${styles.bubble} ${styles.leftBubble}`}
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <p>다시 오셨군요! 👀</p>
          </div>
          <div
            ref={bubble2Ref}
            className={`${styles.bubble} ${styles.leftBubble}`}
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <p>무엇을 하시겠어요?</p>
          </div>

          {/* 👉 오른쪽 선택지 버튼 */}
          <div className={styles.optionsGroup}>
            {[
              { text: "🤔 Fylto가 궁금해!", path: "/about" },
              {
                text: "⭐️ 큐레이션 방법이 궁금해",
                path: "/intro/first-time#process",
              },
              { text: "👀 콘텐츠 예시 보고싶어", path: "/examples" },
              {
                text: "💌 연락하고 싶어!",
                path: "/intro/first-time#contact",
              },
            ].map((item, idx) => (
              <button
                key={idx}
                ref={(el) => (optionRefs.current[idx] = el)}
                className={`${styles.bubble} ${styles.rightBubble}`}
                onClick={() => handleNavigate(item.path)}
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
