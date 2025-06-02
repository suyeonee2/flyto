"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const objRefs = useRef([]);
  const group1Ref = useRef([]);
  const group2Ref = useRef(null);
  const logoRef = useRef(null);

  const objectPositions = [
    { top: "10%", left: "10%", scale: 1.7 },
    { top: "7%", left: "90%", scale: 2 },
    { top: "2.5%", left: "53.4%", scale: 1.6 },
    { top: "30.9%", left: "18.3%", scale: 0.5 },
    { top: "70.6%", left: "39.3%", scale: 2.3 },
    { top: "35.9%", left: "70.4%", scale: 1.4 },
    { top: "68.6%", left: "73.1%", scale: 1.3 },
    { top: "82.3%", left: "7.4%", scale: 1 },
    { top: "30.7%", left: "29.7%", scale: 1 },
    { top: "59.6%", left: "10.5%", scale: 2 },
    { top: "56.2%", left: "90.0%", scale: 2 },
    { top: "56.7%", left: "57.4%", scale: 1.3 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      objRefs.current.forEach((el, i) => {
        gsap.set(el, {
          xPercent: -50,
          yPercent: -20,
          top: objectPositions[i].top,
          left: objectPositions[i].left,
          scale: objectPositions[i].scale,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=800",
          scrub: true,
          pin: true,
        },
      });

      // 오브제 회전하며 상단 이동
      tl.to(
        objRefs.current,
        {
          y: -780,
          rotation: () => (Math.random() - 0.5) * 120,
          filter: "blur(15px)",
          duration: 2,
          ease: "power2.out",
          stagger: 0.05,
        },
        0
      );

      // 그룹1 텍스트 순차 등장 ('좋은 제품은' 제외)
      group1Ref.current.forEach((el, i) => {
        if (i === 0) return;
        tl.fromTo(
          el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          i * 0.1 + 0.2
        );
      });

      // 그룹1 전체 상단 이동
      tl.to(
        group1Ref.current,
        {
          y: -600,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.3,
        },
        "+=0.0"
      );

      // 배경색 변경
      tl.to(
        sectionRef.current,
        {
          backgroundColor: "#fef5e7", // 부드러운 베이지색
          duration: 0.8,
          ease: "power2.out",
        },
        "<+0.6"
      );

      // 그룹2 등장
      tl.fromTo(
        group2Ref.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        "<"
      );

      // 로고 등장
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "<+0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "800px",
        overflow: "hidden",
        background: "#bdd6f3",
      }}
    >
      {/* 그룹1 */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "48px",
          fontWeight: 700,
          color: "#111",
          fontFamily: "NEXON Lv1 Gothic OTF",
          textAlign: "center",
          zIndex: 0,
          lineHeight: 1.2,
        }}
      >
        <div
          ref={(el) => (group1Ref.current[0] = el)}
          style={{ marginBottom: "0.2em", opacity: 1 }}
        >
          좋은 제품은
        </div>
        <div
          ref={(el) => (group1Ref.current[1] = el)}
          style={{ marginBottom: "0.2em", opacity: 0 }}
        >
          <span style={{ fontWeight: 900, color: "#ab35ff" }}>
            더 많은 사랑
          </span>
          을
        </div>
        <div
          ref={(el) => (group1Ref.current[2] = el)}
          style={{ marginBottom: "0.2em", opacity: 0 }}
        >
          받아야 하니까.
        </div>
      </div>

      {/* 그룹2 */}
      <div
        ref={group2Ref}
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "35px",
          color: "#111",
          fontFamily: "NEXON Lv1 Gothic OTF",
          lineHeight: "1.5",
          textAlign: "center",
          opacity: 0,
          zIndex: 2,
        }}
      >
        브랜드를 위한 <br />
        <span style={{ fontWeight: 900 }}>큐레이션 콘텐츠</span> 스튜디오
      </div>

      {/* 로고 */}
      <h1
        ref={logoRef}
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "55px",
          fontWeight: "bold",
          fontFamily: "Aclonica, sans-serif",
          color: "#111",
          opacity: 0,
          zIndex: 2,
        }}
      >
        Fylto.
      </h1>

      {/* 오브제 */}
      {objectPositions.map((pos, i) => (
        <img
          key={i}
          ref={(el) => (objRefs.current[i] = el)}
          src={`./Obj${i + 1}.png`}
          style={{
            position: "absolute",
            width: 160,
            height: 160,
            objectFit: "contain",
            top: pos.top,
            left: pos.left,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </section>
  );
}
