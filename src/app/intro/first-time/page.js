"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Image from "next/image";
import { RxDoubleArrowDown } from "react-icons/rx";

export default function FirstTime() {
  const [visibleBubbles, setVisibleBubbles] = useState([false, false, false]);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleBubbles([true, false, false]), 200),
      setTimeout(() => setVisibleBubbles([true, true, false]), 1700),
      setTimeout(() => setVisibleBubbles([true, true, true]), 3400),
      setTimeout(() => setShowArrow(true), 5900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.scene_wrapper}>
        <div className={styles.grid_bg} />

        {/* 🔹 필토 아이콘 */}
        <div className={styles.fylto_icon}>
          <Image src="/fylto_icon.png" alt="필토" width={50} height={50} />
        </div>

        {/* 🔹 말풍선 콘텐츠 */}
        <div className={styles.content}>
          {visibleBubbles[0] && (
            <div className={styles.bubble}>
              <p>처음이시군요! 반가워요 👋</p>
            </div>
          )}
          {visibleBubbles[1] && (
            <div className={styles.bubble}>
              <p>
                필토는{" "}
                <span style={{ color: "#5783a2" }}>고객의 고민을 줄이는</span>
                <br />
                콘텐츠를 만들고 있어요.
              </p>
            </div>
          )}
          {visibleBubbles[2] && (
            <div className={styles.bubble}>
              <p>
                많은 선택지 앞에서 고민할 때,
                <br />
                고객의 취향과 상황, 감정을 읽고
                <br />
                “이거다!”하는 확신이 들게 돕는 거죠.
              </p>
            </div>
          )}

          {showArrow && (
            <div className={styles.down_arrow}>
              <RxDoubleArrowDown size={20} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
