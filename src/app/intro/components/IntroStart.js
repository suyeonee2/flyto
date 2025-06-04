"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./IntroStart.module.css";
import Spline from "@splinetool/react-spline";

gsap.registerPlugin(ScrollTrigger);

export default function IntroStart() {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const bgRef = useRef(null);
  const circleRefs = useRef([]);
  const splineRef = useRef(null);

  const [showSpline, setShowSpline] = useState(false);

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
            } else {
              setShowSpline(false);
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

        <div>
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
        </div>
        <div className={styles.overlay_text}>
          <h2>
            <span style={{ fontFamily: "Aclonica" }}>Fylto</span>에 어서오세요.
          </h2>
          <p>저희 스튜디오에 처음 오셨나요?</p>
        </div>
      </div>
    </section>
  );
}
