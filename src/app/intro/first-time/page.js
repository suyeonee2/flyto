import React from "react";
import styles from "./page.module.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

export default function FirstTime() {
  return (
    <div>
      <Header />
      <div className={styles.scene_wrapper}>
        <div className={styles.grid_bg} />
        <div className={styles.content}>
          <h1>첫방문자용 섹션</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
