"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Section_Hero.module.css";

export default function SectionHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <section ref={heroRef} className={styles.hero_section}>
      <h2>어서오세요, 여기는 Fylto입니다.</h2>
      <p>필요한 것만 쏙 골라주는, 감각적인 큐레이션 스튜디오예요.</p>
    </section>
  );
}
