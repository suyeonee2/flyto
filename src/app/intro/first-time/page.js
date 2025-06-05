"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./page.module.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Image from "next/image";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FirstTime() {
  const [visibleBubbles, setVisibleBubbles] = useState([false, false, false]);
  const [showArrow, setShowArrow] = useState(false);
  const processRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timers = [
      setTimeout(() => setVisibleBubbles([true, false, false]), 300),
      setTimeout(() => setVisibleBubbles([true, true, false]), 2200),
      setTimeout(() => setVisibleBubbles([true, true, true]), 4000),
      setTimeout(() => {
        setShowArrow(true);
        document.body.style.overflow = "auto";
      }, 6000),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (processRef.current) {
      gsap.fromTo(
        processRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.scene_wrapper}>
        <div className={styles.grid_bg} />

        <div className={styles.fylto_icon}>
          <Image src="/fylto_icon.png" alt="필토" width={50} height={50} />
        </div>

        <div className={styles.content}>
          {visibleBubbles[0] && (
            <div className={styles.bubble}>
              <p>처음이시군요! 반가워요 👋</p>
            </div>
          )}
          {visibleBubbles[1] && (
            <div className={styles.bubble}>
              <p>
                필토는{" "}
                <span style={{ color: "#5783a2" }}>
                  브랜드와 고객을 연결하는
                </span>
                <br />
                콘텐츠를 만들어요.
              </p>
            </div>
          )}
          {visibleBubbles[2] && (
            <div className={styles.bubble}>
              <p>
                고객이 많은 선택지 앞에서 고민할 때,
                <br />
                각자의 취향과 상황, 감정을 읽고
                <br />
                “이거다!” 하는 확신이 들도록 돕는 거죠.
              </p>
            </div>
          )}

          {showArrow && (
            <div
              className={styles.scroll_arrow}
              onClick={() => {
                processRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <MdKeyboardDoubleArrowDown size={36} color="#888" />
            </div>
          )}
        </div>
      </div>

      <div className={styles.flow_wrapper}>
        <div className={styles.step}>
          <div className={styles.node1}>1</div>
          <h4>미니 테스트</h4>
          <p>
            간단한 테스트로 고객의 <br />
            취향, 상황, 감정 등을 파악해요
          </p>
        </div>

        <div className={styles.line} />

        <div className={styles.step}>
          <div className={styles.node2}>2</div>
          <h4>큐레이션 로직 적용</h4>
          <p>
            테스트 결과를 기반으로 큐레이션 로직을 적용해요.
            <br /> 가장 적합한 제품 or 서비스 데이터를 준비하는 과정이에요.
          </p>
        </div>

        <div className={styles.line} />

        <div className={styles.step}>
          <div className={styles.node3}>3</div>
          <h4>브랜드 스타일링</h4>
          <p>추천 결과를 브랜드의 무드와 방향성에 맞춰 콘텐츠로 제작해요</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
