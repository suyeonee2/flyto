"use client";
import React, { useRef, useEffect } from "react";
import styles from "./Examples.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { BsPlusLg } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "SUN di Gioia",
    subtitle: "Eau de Parfum",
    image: "/test.png",
  },
  {
    title: "Becca",
    subtitle: "Highlighter",
    image: "/test.png",
  },
  {
    title: "Eau de Raisin",
    subtitle: "Moisturizer",
    image: "/test.png",
  },
];

export default function Examples() {
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const animations = [
      { ref: eyebrowRef, delay: 0.5 },
      { ref: titleRef, delay: 0.6 },
      { ref: descRef, delay: 0.7 },
      { ref: cardsRef, delay: 1 },
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

      <div className={styles.cardsWrapper} ref={cardsRef}>
        {cards.map((card, i) => (
          <div className={styles.cardColumn} key={i}>
            <div className={styles.card}>
              <img
                src={card.image}
                alt={card.title}
                className={styles.thumbnail}
              />

              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>어뮤즈 베베틴트</p>
                <p className={styles.subTitle}>
                  나에게 찰떡같이 어울리는 베베틴트는?
                </p>
                <button className={styles.moreButton}>
                  <BsPlusLg />
                </button>
              </div>
            </div>
            {i < cards.length - 1 && <div className={styles.verticalLine} />}
          </div>
        ))}
      </div>
      <div className={styles.allButtonWrapper}>
        <button className={styles.allButton}>
          All Examples
          <MdOutlineKeyboardArrowRight className={styles.arrowIcon} />
        </button>
      </div>
    </section>
  );
}
