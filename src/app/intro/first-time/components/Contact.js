"use client";
import React, { useRef, useEffect } from "react";
import styles from "./Contact.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const processRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const animations = [
      { ref: eyebrowRef, delay: 0 },
      { ref: titleRef, delay: 0.1 },
      { ref: processRef, delay: 0.2 },
      { ref: descRef, delay: 0.3 },
      { ref: buttonRef, delay: 0.4 },
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
  }, []);

  return (
    <div>
      <section className={styles.contactSection}>
        <p className={styles.contactEyebrow} ref={eyebrowRef}>
          <span style={{ fontSize: "23px", color: "#bdbdbd" }}>✱</span>
          <br />
          <br />
          큐레이션 콘텐츠 제작문의
        </p>
        <h2 className={styles.contactTitle} ref={titleRef}>
          Let's Work Together!
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
          브랜드의 감성을 온전히 <br /> 큐레이션 콘텐츠에 담아드릴게요.
        </p>

        <button className={styles.contactButton} ref={buttonRef}>
          Get in Touch
        </button>
      </section>
    </div>
  );
};

export default Contact;
