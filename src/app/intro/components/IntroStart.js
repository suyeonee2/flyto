"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./IntroStart.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function IntroStart() {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const circleRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 로고 자간 + 블러 제거
      gsap.to(logoRef.current, {
        filter: "blur(0px)",
        letterSpacing: "0px",
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=30%",
          scrub: true,
        },
      });

      // 모든 원 애니메이션을 한 timeline으로 묶고, pin도 한 번만!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });

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
          0
        ); // 동시에 실행되게 타이밍 0으로 맞춤
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.intro_wrapper}>
      {/* 배경 그리드 */}
      <div className={styles.grid_bg} />

      {/* 로고 */}
      <h1 ref={logoRef} className={styles.intro_logo}>
        Fylto.
      </h1>

      {/* 원형 초점 SVG */}
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
    </section>
  );
}
