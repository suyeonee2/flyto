import React from "react";
import styles from "./Examples.module.css";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Examples() {
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

  return (
    <section className={styles.examplesSection}>
      <p className={styles.Eyebrow}>
        <span style={{ fontSize: "23px", color: "#bdbdbd" }}>✱</span>
        <br />
        <br />
        큐레이션 콘텐츠 예시
      </p>
      <h2 className={styles.HeroTitle}>Examples</h2>
      <p className={styles.HeroDescription}>
        상업 목적이 아닌 포트폴리오 용도로 제작되었습니다.
      </p>

      <div className={styles.sliderWrapper}>
        <button
          onClick={prev}
          className={`${styles.arrow} ${styles.arrowLeft}`}
        >
          &#8249;
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
          onClick={next}
          className={`${styles.arrow} ${styles.arrowRight}`}
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}
