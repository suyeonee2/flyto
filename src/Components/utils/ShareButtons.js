"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { copyURL } from "@/Components/utils/copyURL";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import styles from "./ShareButtons.module.css";

const ShareButtons = ({ title, description, imageUrl, shareUrl }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      const { Kakao } = window;
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleKakaoShare = () => {
    if (window?.Kakao) {
      const { Kakao } = window;
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title,
          description,
          imageUrl,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: "테스트 하기",
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    }
  };

  const handleLinkCopy = () => {
    copyURL(shareUrl);
  };

  return (
    <div className={styles.shareWrapper}>
      <div className={styles.iconRow}>
        <div className={styles.iconButton} onClick={handleKakaoShare}>
          <Image
            src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/fylto_assets/kakao.avif"
            alt="카카오톡 공유"
            width={25}
            height={25}
            priority
          />
        </div>

        <div className={styles.iconButton} onClick={handleLinkCopy}>
          <Image
            src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/fylto_assets/link.avif"
            alt="링크 복사"
            width={25}
            height={25}
            priority
          />
        </div>

        <div className={styles.iconButton}>
          <TwitterShareButton url={shareUrl} title={title}>
            <Image
              src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/fylto_assets/X.avif"
              alt="X 공유"
              style={{ marginTop: "3px" }}
              width={20}
              height={20}
              priority
            />
          </TwitterShareButton>
        </div>

        <div className={styles.iconButton}>
          <FacebookShareButton url={shareUrl}>
            <Image
              src="https://fylto-assets.s3.ap-northeast-2.amazonaws.com/fylto_assets/facebook.avif"
              alt="Facebook 공유"
              style={{ marginTop: "3px" }}
              width={25}
              height={25}
              priority
            />
          </FacebookShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;
