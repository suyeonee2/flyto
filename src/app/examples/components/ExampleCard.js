import React from "react";
import Image from "next/image";
import styles from "./ExampleCard.module.css";

const ExampleCard = ({ image, title, desc, tag }) => {
  return (
    <div className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        <Image
          src={image}
          alt={title}
          className={styles.thumbnail}
          width={300}
          height={300}
          unoptimized
        />
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardDesc}>{desc}</p>
        {tag && Array.isArray(tag) && (
          <div className={styles.cardTagWrapper}>
            {tag.map((t, idx) => (
              <span key={idx} className={styles.cardTag}>
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExampleCard;
