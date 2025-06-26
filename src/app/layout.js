"use client";

import "./globals.css";
import Script from "next/script";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 카카오 SDK 초기화
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  return (
    <html lang="ko">
      <head>
        <title>필토 | Fylto.</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="좋은 제품이 더 많은 사랑을 받을 수 있도록, 브랜드를 위한 맞춤 큐레이션 콘텐츠 스튜디오"
        />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="필토 | Fylto." />
        <meta
          property="og:description"
          content="좋은 제품이 더 많은 사랑을 받을 수 있도록, 브랜드를 위한 맞춤 큐레이션 콘텐츠 스튜디오"
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.fylto.kr" />
        <meta property="og:site_name" content="Fylto" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Kakao SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
          integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
          crossOrigin="anonymous"
        />

        {/* Google Analytics (원할 경우 ID 입력) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
