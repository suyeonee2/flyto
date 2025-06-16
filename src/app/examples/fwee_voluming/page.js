"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import ContentLayout from "@/Components/ContentLayout";
import Image from "next/image";
import startImg from "./assets/startImg.png";
import startBtn from "./assets/startBtn.png";
import Header from "@/Components/Header/Header";

export default function FweeVolumingStart() {
  const router = useRouter();

  return (
    <>
      <Header />
      <ContentLayout className={styles.bgFwee}>
        <div className={styles.startSection}>
          <Image
            src={startImg}
            alt="fwee 시작 썸네일"
            width={891}
            height={1260}
            className={styles.thumbnail}
          />

          <button
            className={styles.imageButton}
            onClick={() => router.push("/examples/fwee_voluming/question")}
          >
            <Image src={startBtn} alt="시작 버튼" width={135} height={120} />
          </button>
        </div>
      </ContentLayout>
    </>
  );
}
