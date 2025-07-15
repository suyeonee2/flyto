"use client";
import React, { useRef, useEffect } from "react";
import styles from "./Contact.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const processRef = useRef(null);
  const descRef = useRef(null);
  const buttonGroupRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const animations = [
      { ref: eyebrowRef, delay: 0 },
      { ref: titleRef, delay: 0.1 },
      { ref: processRef, delay: 0.2 },
      { ref: descRef, delay: 0.3 },
    ];

    animations.forEach(({ ref, delay }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 90%",
            },
          }
        );
      }
    });

    if (buttonGroupRef.current) {
      gsap.fromTo(
        buttonGroupRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buttonGroupRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <section className={styles.contactSection} id="contact">
      <p className={styles.contactEyebrow} ref={eyebrowRef}>
        <span style={{ fontSize: "23px", color: "#bdbdbd" }}>✱</span>
        <br />
        <br />
        큐레이션 콘텐츠 제작문의
      </p>
      <h2 className={styles.contactTitle} ref={titleRef}>
        {`Let's Work Together!`}
      </h2>

      <div className={styles.processWrapper} ref={processRef}>
        <div className={styles.processStep}>문의</div>
        <div className={styles.line} />
        <div className={styles.processStep}>기획</div>
        <div className={styles.line} />
        <div className={styles.processStep}>제작</div>
        <div className={styles.line} />
        <div className={styles.processStep}>피드백</div>
        <div className={styles.line} />
        <div className={styles.processStep}>릴리즈</div>
      </div>

      <p className={styles.contactDescription} ref={descRef}>
        브랜드에 딱 맞는 큐레이션 콘텐츠를 <br />
        가장 편한 방법으로 문의해보세요!
      </p>

      <div className={styles.buttonGroup} ref={buttonGroupRef}>
        <button
          className={styles.contactButton}
          onClick={() => router.push("/estimate")}
        >
          견적 요청하기
        </button>
      </div>

      <p className={styles.subText}>
        <a href="mailto:fylto.studio@gmail.com">fylto.studio@gmail.com</a>
      </p>
    </section>
  );
};

export default Contact;
