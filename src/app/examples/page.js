"use client";
import React, { useEffect, useRef } from "react";
import styles from "./page.module.css";
import exampleData from "./TestList.json";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Header from "@/components/Header/Header";
import Link from "next/link";
import ExampleCard from "./components/ExampleCard";

gsap.registerPlugin(ScrollTrigger);

export default function ExamplesPage() {
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const animations = [
      { ref: eyebrowRef, delay: 0.5 },
      { ref: titleRef, delay: 0.6 },
      { ref: descRef, delay: 0.7 },
      { ref: cardsRef, delay: 0.9 },
    ];

    animations.forEach(({ ref, delay }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
      <Header />

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
          본 콘텐츠들은 포트폴리오 용도로 제작되었으며 브랜드와 직접적인 관련은
          없습니다.
        </p>

        <div className={styles.cardsWrapper} ref={cardsRef}>
          {exampleData.map((card) => (
            <Link
              href={`/examples/${card.id}`}
              key={card.id}
              className={styles.cardLink}
            >
              <ExampleCard
                id={card.id}
                image={card.image}
                title={card.title}
                desc={card.desc}
                tag={card.tag}
                type={card.type}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
