"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./IntroStart.module.css";
import Header from "@/components/Header/Header";
import Link from "next/link";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function IntroStart() {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const bgRef = useRef(null);
  const buttonRef = useRef(null);
  const headerRef = useRef(null);
  const scrollIconRef = useRef(null);
  const subtitleRef = useRef(null);

  const [showSecondScreen, setShowSecondScreen] = useState(false);
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
              setShowSecondScreen(true);
              setShowHeader(true);
              setShowButtons(true);

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
            } else {
              setShowSecondScreen(false);
              setShowHeader(false);
              setShowButtons(false);
            }
          },
        },
      });

      gsap.set(logoRef.current, {
        filter: "blur(0px)",
        letterSpacing: "0px",
        opacity: 1,
        scale: 1,
      });

      gsap.set(subtitleRef.current, {
        filter: "blur(0px)",
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
        subtitleRef.current,
        {
          filter: "blur(10px)",
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

  useEffect(() => {
    if (showButtons && buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [showButtons]);

  return (
    <section ref={sectionRef} className={styles.scene_wrapper}>
      {showHeader && (
        <div ref={headerRef} className={styles.header_wrapper}>
          <Header />
        </div>
      )}

      {/* 첫 화면 */}
      <div
        className={`${styles.intro_wrapper} ${
          showSecondScreen ? styles.hidden : ""
        }`}
      >
        <div ref={bgRef} className={styles.grid_bg} />

        <h1 ref={logoRef} className={styles.intro_logo}>
          Fylto.
        </h1>
        <p ref={subtitleRef} className={styles.intro_subtitle}>
          큐레이션 콘텐츠 스튜디오
        </p>
        {!showSecondScreen && (
          <div className={styles.scroll_icon} ref={scrollIconRef}>
            <MdKeyboardDoubleArrowDown size={27} />
          </div>
        )}
      </div>

      {/* 두 번째 화면 */}
      <div
        className={`${styles.second_screen} ${
          showSecondScreen ? styles.reveal : styles.hidden
        }`}
      >
        <div className={styles.grid_bg} />
        <div className={styles.fylto_icon}>
          <Image
            src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/fylto_assets/fylto_icon.avif"
            alt="fylto"
            width={50}
            height={50}
          />
        </div>

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
    </section>
  );
}
