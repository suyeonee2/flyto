import styles from "./page.module.css";
import Link from "next/link";
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <div className={styles.home_Wrapper}>
      <div className={styles.home_header}>
        <h1 className={styles.home_logo}>choosely</h1>
        <hr className={styles.divider} />
      </div>

      {/* 여기 hero 들어감 */}
      <div className="hero">
        <Spline scene="https://prod.spline.design/TRfTj83xgjIdHPmT/scene.spline" />
      </div>

      <div className={styles["button-group"]}>
        <Link href="/project" className={styles["choosely-button"]}>
          Project
        </Link>
        <Link href="/portfolio" className={styles["choosely-button"]}>
          portfolio
        </Link>
        <Link href="/about" className={styles["choosely-button"]}>
          About
        </Link>
        <Link href="/contact" className={styles["choosely-button"]}>
          Contact
        </Link>
      </div>
    </div>
  );
}
