// app/about/page.js
"use client";

import React, { useEffect, useRef } from "react";
import styles from "./page.module.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (eyebrowRef.current) {
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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
          duration: 0.7,
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
          duration: 0.8,
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 90%",
          },
        }
      );
    }
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <Header />
      <section className={styles.aboutSection}>
        <div className={styles.grid_bg} />
        <div className={styles.content}>
          <p className={styles.aboutEyebrow} ref={eyebrowRef}>
            <span style={{ fontSize: "23px", color: "#bdbdbd" }}>✱</span>
            <br />
            <br />
            Fylto 소개
          </p>
          <h2 className={styles.aboutTitle} ref={titleRef}>
            About Fylto
          </h2>
          <p className={styles.aboutDescription} ref={descRef}>
            큐레이션을 통해 브랜드와 고객 사이를 이어주는
            <br />
            콘텐츠 스튜디오, Fylto를 소개합니다.
          </p>
        </div>

        <div className={styles.content2_Container} ref={contentRef}>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <Image
                src="/our.png"
                alt="our"
                className={styles.cardImage}
                width={150}
                height={150}
              />
              <div className={styles.cardText}>
                <h3>우리가 하는 일</h3>
                <div className={styles.cardDivider} />
                <p>
                  고객이 직접 찾고 비교하지 않아도,
                  <br />
                  가장 잘 맞는 제품만 선별해드립니다.
                  <br />
                  <span style={{ color: "#5783a2" }}>
                    취향과 상황을 분석한 큐레이션
                  </span>
                  이니까요.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <Image
                src="/trust.png"
                alt="trust"
                className={styles.cardImage}
                width={150}
                height={150}
              />
              <div className={styles.cardText}>
                <h3>기반과 신뢰</h3>
                <div className={styles.cardDivider} />
                <p>
                  테스트 사이트 운영을 통해
                  <br />
                  약 500만 회의 사용자 반응을 직접 살펴봤습니다.
                  <br />
                  <span style={{ color: "#5783a2" }}>
                    그 실질적인 경험을 바탕
                  </span>
                  으로
                  <br />
                  취향 기반 큐레이션 서비스 Fylto가 시작되었습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
