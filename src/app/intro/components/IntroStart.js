"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./IntroStart.module.css";
import Spline from "@splinetool/react-spline";
import Header from "@/Components/Header/Header";

gsap.registerPlugin(ScrollTrigger);

export default function IntroStart() {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const bgRef = useRef(null);
  const circleRefs = useRef([]);
  const splineRef = useRef(null);
  const buttonRef = useRef(null);
  const headerRef = useRef(null); // 🔹 헤더용 ref

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

              // 헤더 먼저 보여주기
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

              // 버튼은 나중에 등장
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

      // 로고 & 배경 진입 애니메이션
      tl.to(
        logoRef.current,
        {
          filter: "blur(0px)",
          letterSpacing: "0px",
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          duration: 1.2,
        },
        0
      );

      tl.to(
        bgRef.current,
        {
          scale: 1.05,
          ease: "power2.out",
          duration: 1.2,
        },
        0
      );

      // 원형 포커스 애니메이션
      circleRefs.current.forEach((circle, i) => {
        const length = circle.getTotalLength();
        circle.style.strokeDasharray = length;
        circle.style.strokeDashoffset = length;
        circle.style.opacity = 0;

        tl.to(
          circle,
          {
            strokeDashoffset: -1,
            opacity: 0.15,
            duration: 0.4,
            ease: "power2.out",
          },
          0.2 + i * 0.15
        );
      });
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
        <svg width="360" height="360" className={styles.focus_svg}>
          {[...Array(4)].map((_, i) => (
            <circle
              key={i}
              ref={(el) => (circleRefs.current[i] = el)}
              cx={180 + i * 2}
              cy={180 - i * 2.5}
              r={100 + i * 1.5}
              stroke="black"
              strokeWidth={i === 0 ? 2 : 1}
              fill="none"
              className={styles.focus_circle}
            />
          ))}
        </svg>
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
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          />

          <div className={styles.overlay_text}>
            <h2>
              <span style={{ fontFamily: "Aclonica" }}>Fylto</span>에
              어서오세요.
            </h2>
            <p>저희 스튜디오에 처음 오셨나요?</p>
          </div>

          {showButtons && (
            <div className={styles.choice_buttons} ref={buttonRef}>
              <button>네, 첫 방문이에요</button>
              <button>아뇨, 재방문이에요</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
