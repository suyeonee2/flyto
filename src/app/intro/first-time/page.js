"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./page.module.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Image from "next/image";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Examples from "./components/Examples";

gsap.registerPlugin(ScrollTrigger);

export default function FirstTime() {
  const [visibleBubbles, setVisibleBubbles] = useState([false, false, false]);
  const [showArrow, setShowArrow] = useState(false);
  const [showCue, setShowCue] = useState(false);

  const processRef = useRef(null);
  const introEyebrowRef = useRef(null);
  const introTitleRef = useRef(null);
  const introDescRef = useRef(null);
  const stepRefs = useRef([]);

  stepRefs.current = [];
  const addToStepRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleBubbles([true, false, false]), 300),
      setTimeout(() => setVisibleBubbles([true, true, false]), 2200),
      setTimeout(() => setVisibleBubbles([true, true, true]), 4000),
      setTimeout(() => {
        setShowArrow(true);
        setShowCue(true);
      }, 6000),
    ];
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (document.querySelector(`.${styles.scrollCue}`)) {
      gsap.to(`.${styles.scrollCue}`, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: `.${styles.scrollCue}`,
          start: "top 95%",
        },
      });
    }

    // Scroll animations for intro title section
    if (introEyebrowRef.current) {
      gsap.fromTo(
        introEyebrowRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: introEyebrowRef.current,
            start: "top 90%",
          },
        }
      );
    }
    if (introTitleRef.current) {
      gsap.fromTo(
        introTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: introTitleRef.current,
            start: "top 90%",
          },
        }
      );
    }
    if (introDescRef.current) {
      gsap.fromTo(
        introDescRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: introDescRef.current,
            start: "top 90%",
          },
        }
      );
    }

    stepRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
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
                각자의 취향∙상황∙감정을 읽고
                <br />
                “이거다!” 하는 확신이 들도록 돕는 거죠.
              </p>
            </div>
          )}

          {showArrow && (
            <div
              className={`${styles.scrollCue} ${showCue ? styles.visible : ""}`}
            >
              <p className={styles.scrollQuestion}>"어떻게 만드는데?🤔"</p>
              <MdKeyboardDoubleArrowDown
                size={25}
                className={styles.bouncingArrow}
              />
            </div>
          )}
        </div>
      </div>

      <section className={styles.processIntroSection} id="process">
        <p className={styles.processEyebrow}>
          <span style={{ fontSize: "23px", color: "#bdbdbd" }}>✱</span>
          <br />
          <br />
          큐레이션 콘텐츠 제작과정
        </p>
        <h2 className={styles.processHeroTitle}>How We Curate</h2>
      </section>

      <section className={styles.processGridSection} ref={processRef}>
        <div className={styles.processGrid} ref={addToStepRefs}>
          <div className={styles.gridImage}>
            <Image src="/test.png" alt="Step 1" width={500} height={500} />
          </div>
          <div className={styles.gridText}>
            <span className={styles.stepBadge}>STEP 1</span>
            <h3 className={styles.stepTitle}>큐레이션 로직 설정</h3>
            <p className={styles.stepDescription}>
              우선 브랜드와 협의해 큐레이션 로직을 정해요.
              <br />
              어떤 기준으로 제품을 묶고, 어떤 방식으로 추천할지
              <br />
              구조를 먼저 설계합니다.
            </p>
            <div className={styles.stepDivider} />
            <p className={styles.stepExample}>
              ex) 큐레이션 로직 타입
              <br />
              🎨 색상 큐레이션: 립 전 색상 중 톤별 추천
              <br />
              💭 무드 큐레이션: 제품이 주는 분위기별 추천
              <br />
              📦 상황 큐레이션: 출근용, 선물용 등 상황별 기준
            </p>
          </div>
        </div>

        <div
          className={`${styles.processGrid} ${styles.reverse}`}
          ref={addToStepRefs}
        >
          <div className={styles.gridImage}>
            <Image src="/test.png" alt="Step 2" width={500} height={500} />
          </div>
          <div className={styles.gridText}>
            <span className={styles.stepBadge}>STEP 2</span>
            <h3 className={styles.stepTitle}>미니 테스트 기획</h3>
            <p className={styles.stepDescription}>
              로직에 맞는 질문과 선택지를 기획해요.
              <br />
              고객의 취향∙상황∙감정을 파악할 수 있도록
              <br />
              타깃에 맞는 테스트를 만듭니다.
            </p>
            <div className={styles.stepDivider} />
            <p className={styles.stepExample}>
              ex) 질문 예시
              <br />
              💄 메이크업: “나랑 제일 잘 어울린다고 생각하는 컬러는?”
              <br />
              🧴 스킨케어: “요즘 피부에서 가장 신경 쓰이는 부분은?”
              <br />
              🌸 향수: “내가 어떤 이미지로 보였으면 하나요?”
            </p>
          </div>
        </div>

        <div className={styles.processGrid} ref={addToStepRefs}>
          <div className={styles.gridImage}>
            <Image src="/test.png" alt="Step 3" width={500} height={500} />
          </div>
          <div className={styles.gridText}>
            <span className={styles.stepBadge}>STEP 3</span>
            <h3 className={styles.stepTitle}>큐레이션 실행</h3>
            <p className={styles.stepDescription}>
              미니테스트의 응답 결과에 로직을 적용해 추천 구조를 도출해요.
              <br />
              결과값을 분석해 고객에게 가장 적합한 제품 구성을 만듭니다.
            </p>
            <div className={styles.stepDivider} />
            <p className={styles.stepExample}>
              ex) 분석 흐름
              <br />
              📝 테스트 결과값 → 🎯 색상 큐레이션 로직 적용 → 💡 제품 3종 추천
            </p>
          </div>
        </div>

        <div
          className={`${styles.processGrid} ${styles.reverse}`}
          ref={addToStepRefs}
        >
          <div className={styles.gridImage}>
            <Image src="/test.png" alt="Step 4" width={500} height={500} />
          </div>
          <div className={styles.gridText}>
            <span className={styles.stepBadge}>STEP 4</span>
            <h3 className={styles.stepTitle}>콘텐츠 스타일링</h3>
            <p className={styles.stepDescription}>
              테스트와 결과 페이지를 브랜드 무드에 맞춰 스타일링해요.
              <br />
              제품군과 목적에 따라 다양한 시각적 스타일로 구현됩니다.
            </p>
            <div className={styles.stepDivider} />
            <p className={styles.stepExample}>
              ex) 스타일 타입
              <br />
              🎨 미니멀한 2D 그래픽
              <br />
              🧊 직관적인 3D 비주얼
              <br />✨ 애니메이션 or 인터랙티브 연출
            </p>
          </div>
        </div>
      </section>
      <Examples />
      <Footer />
    </div>
  );
}
