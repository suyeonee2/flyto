"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./IntroStart.module.css";
import Spline from "@splinetool/react-spline";
import Header from "@/Components/Header/Header";
import Link from "next/link";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

export default function IntroStart() {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const bgRef = useRef(null);
  const splineRef = useRef(null);
  const buttonRef = useRef(null);
  const headerRef = useRef(null);
  const scrollIconRef = useRef(null);

  const [showSpline, setShowSpline] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            if (self.progress > 0.99) {
              setShowSpline(true);

              // 헤더 등장
              setShowHeader(true);
              gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: -40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1.8,
                  ease: "expo.out",
                }
              );

              // 버튼 등장
              gsap.delayedCall(1.5, () => {
                setShowButtons(true);
                gsap.fromTo(
                  buttonRef.current,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
                );
              });
            } else {
              setShowSpline(false);
              setShowButtons(false);
              setShowHeader(false);
            }
          },
        },
      });

      // 초기 상태
      gsap.set(logoRef.current, {
        filter: "blur(0px)",
        letterSpacing: "0px",
        opacity: 1,
        scale: 1,
      });

      gsap.set(bgRef.current, {
        scale: 1.05,
      });

      gsap.set(scrollIconRef.current, {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
      });

      // 스크롤 시 효과
      tl.to(
        logoRef.current,
        {
          filter: "blur(10px)",
          letterSpacing: "10px",
          opacity: 0.3,
          scale: 1.3,
          ease: "power2.out",
          duration: 1.2,
        },
        0
      );

      tl.to(
        bgRef.current,
        {
          scale: 1,
          ease: "power2.out",
          duration: 1.2,
        },
        0
      );

      tl.to(
        scrollIconRef.current,
        {
          filter: "blur(10px)",
          opacity: 0,
          scale: 1.3,
          ease: "power2.out",
          duration: 1.2,
        },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.scene_wrapper}>
      {/* 헤더 */}
      {showHeader && (
        <div ref={headerRef} className={styles.header_wrapper}>
          <Header />
        </div>
      )}

      {/* Intro 화면 */}
      <div
        className={`${styles.intro_wrapper} ${showSpline ? styles.hidden : ""}`}
      >
        <div ref={bgRef} className={styles.grid_bg} />
        <h1 ref={logoRef} className={styles.intro_logo}>
          Fylto.
        </h1>

        {/* 스크롤 유도 아이콘 */}
        {!showSpline && (
          <div className={styles.scroll_icon} ref={scrollIconRef}>
            <MdKeyboardDoubleArrowDown size={27} />
          </div>
        )}
      </div>

      {/* Spline 씬 */}
      <div
        className={`${styles.spline_scene} ${
          showSpline ? styles.reveal : styles.hidden
        }`}
      >
        <div className={styles.grid_bg} />

        <div className={styles.scene2_container}>
          <Spline
            ref={splineRef}
            scene="https://prod.spline.design/3SOFYmZPFxWU5zPY/scene.splinecode"
            style={{
              position: "absolute",
              top: "-50px",
              left: 0,
              scale: 0.8,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          />

          <div className={styles.text_wrapper}>
            <h2 className={styles.introText}>
              안녕하세요, <br />
              <span style={{ color: "#5783a2" }}>큐레이션 콘텐츠 스튜디오</span>
              <br />
              <span style={{ fontFamily: "Aclonica" }}>Fylto</span>입니다.
            </h2>
            <p className={styles.subText}>저희 스튜디오에 처음 오셨나요?</p>
          </div>

          {showButtons && (
            <div className={styles.choice_buttons} ref={buttonRef}>
              <Link href="/intro/first-time" className={styles.choice_link}>
                네, 첫 방문이에요
              </Link>
              <Link href="/intro/returning" className={styles.choice_link}>
                아뇨, 재방문이에요
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
