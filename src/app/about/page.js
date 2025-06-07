// app/about/page.js
"use client";

import React, { useEffect, useRef } from "react";
import styles from "./page.module.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
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

        <div className={styles.aboutContent} ref={contentRef}>
          <h3>우리가 하는 일</h3>
          <p>
            Fylto는 고객의 취향과 상황을 읽어내는
            <br />
            큐레이션 기반 콘텐츠를 제작합니다.
          </p>

          <h3>중심 철학</h3>
          <p>
            우리는 ‘선택의 확신’을 줄 수 있는 경험을 만듭니다.
            <br />
            복잡한 선택지 속에서 ‘이거다!’ 싶은 콘텐츠를 제공하는 게 목표예요.
          </p>

          <h3>핵심 키워드</h3>
          <p>필터링, 선별, 취향, 연결, 감성, 추천</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
