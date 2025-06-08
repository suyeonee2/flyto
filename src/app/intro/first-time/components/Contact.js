"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./Contact.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const processRef = useRef(null);
  const descRef = useRef(null);
  const formRef = useRef(null);

  const [formVisible, setFormVisible] = useState(false);

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
  }, []);

  useEffect(() => {
    if (formVisible && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [formVisible]);

  return (
    <div>
      <section className={styles.contactSection} id="contact">
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
          <br />
          <br />
          편하신 방법으로 문의해주세요😉
        </p>

        <div className={styles.buttonGroup}>
          <button
            className={styles.contactButton}
            onClick={() => setFormVisible(true)}
          >
            폼으로 문의하기
          </button>

          <a className={styles.contactButton} href="mailto:suyeonee2@gmail.com">
            메일로 문의하기
          </a>
        </div>

        {formVisible && (
          <div ref={formRef} className={styles.formWrapper}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSe_NPIUV6_fIsTfcy-Uan5fTcF-PzcL-iiJPBIaEF81DCxr9g/viewform?embedded=true"
              width="100%"
              height="1300"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Google Form"
            >
              로드 중…
            </iframe>
          </div>
        )}
      </section>
    </div>
  );
};

export default Contact;
