"use client";
import React from "react";
import styles from "./Examples.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);

export default function Examples() {
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const sliderRefContainer = useRef(null);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 40,
    },
    breakpoints: {
      "(max-width: 900px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  const prev = () => instanceRef.current?.prev();
  const next = () => instanceRef.current?.next();

  useEffect(() => {
    if (eyebrowRef.current) {
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: eyebrowRef.current,
            start: "top 90%",
          },
        }
      );
    }

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          },
        }
      );
    }

    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 90%",
          },
        }
      );
    }

    if (sliderRefContainer.current) {
      gsap.fromTo(
        sliderRefContainer.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sliderRefContainer.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <section className={styles.examplesSection}>
      <p className={styles.Eyebrow} ref={eyebrowRef}>
        <span style={{ fontSize: "23px", color: "#bdbdbd" }}>✱</span>
        <br />
        <br />
        큐레이션 콘텐츠 예시
      </p>
      <h2 className={styles.HeroTitle} ref={titleRef}>
        Examples
      </h2>
      <p className={styles.HeroDescription} ref={descRef}>
        상업 목적이 아닌 포트폴리오 용도로 제작되었습니다.
      </p>

      <div className={styles.sliderWrapper} ref={sliderRefContainer}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={prev}
        >
          <FaChevronLeft />
        </button>
        <div
          ref={sliderRef}
          className={`keen-slider ${styles.sliderContainer}`}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              className={`keen-slider__slide ${styles.previewCard}`}
              key={num}
            >
              <img
                src={`/test.png`}
                alt={`예시 카드 ${num}`}
                className={styles.thumbnail}
              />
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>카드 {num}</p>
                <button className={styles.moreButton}>more</button>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={next}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}
