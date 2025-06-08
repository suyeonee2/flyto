import React from "react";
import styles from "./ExampleCard.module.css";

const ExampleCard = ({ image, title, desc }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
};

export default ExampleCard;
