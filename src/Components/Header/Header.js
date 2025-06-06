"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setMenuOpen(true);
    setTimeout(() => setAnimateIn(true), 20); // DOM 붙인 다음에 slideIn 실행
  };

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => setMenuOpen(false), 400); // 애니메이션 끝나고 DOM 제거
  };

  const handleInternalScroll = () => {
    const target = document.querySelector(".processGridSection");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      handleClose();
    } else {
      router.push("/intro/first-time#process");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.innerContainer}>
        <div className={styles.logo}>
          <Link href="/">Fylto.</Link>
        </div>

        <div
          className={styles.hamburger}
          onClick={() => (menuOpen ? handleClose() : handleOpen())}
        >
          {menuOpen ? <MdClose size={23} /> : <RxHamburgerMenu size={23} />}
        </div>

        {menuOpen && (
          <nav
            className={`${styles.menuOverlay} ${
              animateIn ? styles.slideIn : styles.slideOut
            }`}
          >
            <ul>
              <li onClick={handleInternalScroll}>How We Curate</li>
              <li>
                <Link href="/studio" onClick={handleClose}>
                  Studio Styles
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={handleClose}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={handleClose}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
