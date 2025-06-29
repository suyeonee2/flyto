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
    setTimeout(() => setAnimateIn(true), 20);
  };

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => setMenuOpen(false), 400);
  };

  const handleInternalScroll = (e) => {
    e.preventDefault(); // 기본 a태그 동작 방지
    const target = document.querySelector(".processGridSection");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      handleClose();
    } else {
      router.push("/intro/first-time#process");
    }
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const target = document.querySelector("#contact");

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      handleClose();
    } else {
      router.push("/intro/first-time#contact");
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
              <li>
                <a href="#process" onClick={handleInternalScroll}>
                  How We Curate
                </a>
              </li>
              <li>
                <Link href="/examples" onClick={handleClose}>
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={handleClose}>
                  About Fylto
                </Link>
              </li>
              <li>
                <a href="#contact" onClick={handleScrollToContact}>
                  {`Let's Work Together!`}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
