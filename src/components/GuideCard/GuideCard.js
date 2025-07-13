import React from "react";
import styles from "./GuideCard.module.css";
import { useRouter } from "next/navigation";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsCalendar2Check } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";
import Image from "next/image";

export default function GuideCard({
  type,
  title,
  image,
  summary,
  items,
  budget,
  duration,
  exampleLink,
}) {
  const router = useRouter();

  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <h3 className={styles.title}>
        {title}
        {type === "premium" && <span className={styles.badge}>상담필수</span>}
      </h3>
      <p className={styles.summary}>{summary}</p>

      {image && (
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={`${type} 그래픽`}
            className={styles.image}
            width={80}
            height={80}
          />
        </div>
      )}

      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={i}>
            <IoIosCheckmarkCircleOutline className={styles.icon} />
            {item}
          </li>
        ))}
      </ul>

      <div className={styles.metaBox}>
        <div className={styles.metaItem}>
          <BsCalendar2Check className={styles.metaIcon} />
          <span>
            <strong>제작기간&nbsp;&nbsp;</strong>
            {duration}
          </span>
        </div>
        <div className={styles.metaItem}>
          <TbPigMoney className={styles.metaIcon} />
          <span>
            <strong>제작단가&nbsp;&nbsp;</strong>
            {budget}
          </span>
        </div>
      </div>

      {exampleLink && (
        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            onClick={() => router.push(exampleLink)}
          >
            예시 보기
          </button>
        </div>
      )}
    </div>
  );
}
