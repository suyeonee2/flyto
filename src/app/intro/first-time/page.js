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
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const dividerRef = useRef(null);
  const stepRefs = useRef([]);

  stepRefs.current = [];
  const addToStepRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

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
    if (subTitleRef.current) {
      gsap.fromTo(
        subTitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: subTitleRef.current,
            start: "top 85%",
          },
        }
      );
    }

    if (dividerRef.current) {
      gsap.fromTo(
        dividerRef.current,
        { opacity: 0, scaleX: 0.5 },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 85%",
          },
        }
      );
    }

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
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
      <section className={styles.processGridSection} ref={processRef}>
        <h2 className={styles.processTitle}>
          <span className={styles.subtitle} ref={subTitleRef}>
            "어떻게 만드는데?🤔"
          </span>
          <div className={styles.divider} ref={dividerRef} />
          <span className={styles.maintitle} ref={titleRef}>
            큐레이션 콘텐츠 제작과정
          </span>
        </h2>
        <div className={styles.processGrid} ref={addToStepRefs}>
          <div className={styles.gridImage}>
            <Image src="/test.png" alt="Step 1" width={500} height={500} />
          </div>
          <div className={styles.gridText}>
            <span className={styles.stepBadge}>STEP 1</span>
            <h3 className={styles.stepTitle}>미니 테스트</h3>
            <p className={styles.stepDescription}>
              브랜드와 충분한 소통을 통해 질문지부터 함께 기획해요. <br />
              어떤 제품을 어떻게 셀링하고 싶은지 방향을 먼저 듣고, <br />
              고객의 상황과 취향을 읽을 수 있는 질문을 만듭니다.
            </p>
            <div className={styles.stepDivider} />
            <p className={styles.stepExample}>
              ex) 립틴트 콘텐츠의 질문지
              <br />
              “나와 가장 잘 어울릴 것 같은 컬러는?”
              <br />
              “지금 내 파우치에 가장 많은 립 컬러 톤은?”
              <br />
              “시도해보고 싶은 색상은?”
              <br />
              “퍼스널컬러 테스트를 받았다면 어떤 결과였나요?”
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
            <h3 className={styles.stepTitle}>큐레이션 로직 적용</h3>
            <p className={styles.stepDescription}>
              브랜드와 사전에 협의한 큐레이션 로직에 따라 추천 구조를 설계해요.
              <br />
              색상, 무드, 사용상황, 소비자 성향 등 어떤 기준으로 제품을 엮을지
              미리 정한 뒤, 미니테스트에서 나온 응답 결과에 이 로직을 적용해
              가장 적합한 조합을 도출합니다.
            </p>
            <div className={styles.stepDivider} />
            <p className={styles.stepExample}>
              ex) 큐레이션 로직 타입 <br /> 🎨 색상 큐레이션: 립 전 색상 중 톤별
              추천
              <br />
              💭 무드 큐레이션: 제품이 주는 분위기별 추천
              <br />
              📦 상황 큐레이션: 출근용, 선물용 등 사용 타이밍 기준
            </p>
          </div>
        </div>

        <div className={styles.processGrid} ref={addToStepRefs}>
          <div className={styles.gridImage}>
            <Image src="/test.png" alt="Step 3" width={500} height={500} />
          </div>

          <div className={styles.gridText}>
            <span className={styles.stepBadge}>STEP 3</span>
            <h3 className={styles.stepTitle}>브랜드 스타일링</h3>
            <p className={styles.stepDescription}>
              추천된 결과를 브랜드의 무드와 톤앤매너에 맞춰 스타일링해요.
              <br />
              단순한 결과 도출이 아닌, 브랜드와 어울리게끔 콘텐츠를 제작합니다.
            </p>
            <div className={styles.stepDivider} />
            <p className={styles.stepExample}>ex)</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
