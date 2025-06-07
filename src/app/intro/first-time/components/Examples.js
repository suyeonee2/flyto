"use client";
import React, { useRef, useEffect } from "react";
import styles from "./Examples.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

const cards = [1, 2, 3, 4, 5, 6];

export default function Examples() {
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const sliderRefContainer = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const animations = [
      { ref: eyebrowRef, delay: 0.5 },
      { ref: titleRef, delay: 0.6 },
      { ref: descRef, delay: 0.7 },
      { ref: sliderRefContainer, delay: 1 },
    ];

    animations.forEach(({ ref, delay }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: delay,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 90%",
            },
          }
        );
      }
    });
  }, []);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

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
        상업 목적이 아닌 포트폴리오 용도로 제작되었습니다
      </p>

      <div className={styles.sliderOuterWrapper} ref={sliderRefContainer}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={handlePrev}
        >
          <FiChevronLeft />
        </button>

        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={40}
            slidesPerView={3}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              900: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
            }}
          >
            {cards.map((num) => (
              <SwiperSlide key={num}>
                <div className={styles.previewCard}>
                  <img
                    src={`/test.png`}
                    alt={`예시 카드 ${num}`}
                    className={styles.thumbnail}
                  />
                  <div className={styles.cardContent}>
                    <p className={styles.cardTitle}>카드 {num}</p>
                    <p className={styles.subTitle}>디스크립션</p>
                    <button className={styles.moreButton}>more</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={handleNext}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}
