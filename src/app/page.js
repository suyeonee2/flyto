import Hero from "@/Components/Hero/Hero";
import styles from "./page.module.css";
import Dummy from "@/Components/Dummy/dummy";
// import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.home_Wrapper}>
      <div className={styles.home_header}>
        <h1 className={styles.home_logo}>Fylto.</h1>
        <hr className={styles.divider} />
      </div>
      <Hero />
      <Dummy />
    </div>
  );
}
