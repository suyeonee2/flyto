"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const objRefs = useRef([]);
  const logoRef = useRef(null);
  const subtitleRef = useRef(null);

  // 고정 위치와 크기 (12개)
  const objects = [
    { top: "20%", left: "15%", scale: 1.8 },
    { top: "25%", left: "60%", scale: 1.2 },
    { top: "35%", left: "80%", scale: 1.4 },
    { top: "40%", left: "30%", scale: 1.6 },
    { top: "50%", left: "70%", scale: 1.3 },
    { top: "60%", left: "20%", scale: 1.7 },
    { top: "65%", left: "50%", scale: 1.1 },
    { top: "75%", left: "75%", scale: 1.5 },
    { top: "80%", left: "40%", scale: 1.3 },
    { top: "85%", left: "10%", scale: 1.6 },
    { top: "15%", left: "35%", scale: 1.4 },
    { top: "30%", left: "90%", scale: 1.2 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 초기 배치
      objRefs.current.forEach((el, i) => {
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          top: objects[i].top,
          left: objects[i].left,
          scale: objects[i].scale,
        });
      });

      // 애니메이션
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true,
          },
        })
        .to(
          objRefs.current,
          {
            y: 300,
            opacity: 0,
            filter: "blur(20px)",
            duration: 1,
            stagger: 0.05,
            ease: "power2.out",
          },
          0
        )
        .to(
          logoRef.current,
          {
            filter: "blur(10px)",
            letterSpacing: "0.1em",
            duration: 1,
            ease: "power2.out",
          },
          0
        )
        .fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            filter: "blur(20px)",
            letterSpacing: "1em",
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            letterSpacing: "0.05em",
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "#bdd6f3",
      }}
    >
      {/* 로고 - 뒤에 깔림 */}
      <h1
        ref={logoRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "250px",
          fontWeight: "bold",
          fontFamily: "'Aclonica', sans-serif",
          color: "#ffff",
          opacity: 1,
          letterSpacing: "0em",
          filter: "blur(0px)",
          zIndex: 0,
          whiteSpace: "nowrap",
        }}
      >
        Fylto.
      </h1>

      {/* 서브 텍스트 */}
      <p
        ref={subtitleRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "24px",
          fontFamily: "'Pretendard', sans-serif",
          color: "#333",
          opacity: 0,
          zIndex: 1,
          whiteSpace: "pre-line",
          textAlign: "center",
        }}
      >
        좋은 제품이 더 많은 사랑을 받을 수 있도록,
        <br />
        브랜드를 위한 맞춤 큐레이션 콘텐츠 스튜디오
      </p>

      {/* 오브제들 */}
      {objects.map((obj, i) => (
        <img
          key={i}
          ref={(el) => (objRefs.current[i] = el)}
          src={`./Obj${i + 1}.png`}
          style={{
            position: "absolute",
            width: 120,
            height: 120,
            objectFit: "contain",
            transition: "all 0.3s ease",
            zIndex: 2,
          }}
        />
      ))}
    </section>
  );
}
