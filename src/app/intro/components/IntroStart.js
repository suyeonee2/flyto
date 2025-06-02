"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./IntroStart.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function IntroStart() {
  const sectionRef = useRef(null);
  const bgContainerRef = useRef(null);
  const bgRef = useRef(null); // ✅ 배경 이미지용 ref 추가
  const logoRef = useRef(null);
  const arrowRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        },
      });

      // 줌인 효과
      tl.to(bgContainerRef.current, {
        scale: 1.5,
        ease: "power2.inOut",
      });

      // 로고/화살표 사라짐
      tl.to(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        "<"
      );

      tl.to(
        arrowRef.current,
        {
          opacity: 0,
        },
        "<"
      );

      // ✅ 배경 이미지 페이드아웃
      tl.to(
        bgRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "<+0.2"
      );

      // ✅ 배경색 전환
      tl.to(
        bgContainerRef.current,
        {
          backgroundColor: "#fff3e6",
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      );

      // 텍스트 등장
      tl.to(heroRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.intro_wrapper}>
      {/* Scene 1 */}
      <div ref={bgContainerRef} className={styles.scene_bg}>
        <img
          ref={bgRef}
          src="/background.jpg"
          alt="background"
          className={styles.bg_image}
        />
        <h1 ref={logoRef} className={styles.intro_logo}>
          Fylto.
        </h1>
        <div ref={arrowRef} className={styles.scroll_arrow}>
          ↓
        </div>
      </div>

      {/* Scene 2 */}
      <div ref={heroRef} className={styles.scene_hero}>
        <video
          src="/robo.webm"
          autoPlay
          loop
          muted
          playsInline
          className={styles.robo_video}
        />
        <h2>어서오세요, 여기는 Fylto입니다.</h2>
        <p>필요한 것만 쏙 골라주는, 감각적인 큐레이션 스튜디오예요.</p>
      </div>
    </section>
  );
}
