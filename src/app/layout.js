"use client";

import "./globals.css";
import Script from "next/script";
import { META } from "@/components/utils/metadata";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <title>{META.title}</title>

        {/* 필수 메타태그 */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* 아이콘 */}
        <link rel="icon" href={META.icon} />
        <link rel="apple-touch-icon" href={META.appleIcon} />

        {/* SEO */}
        <meta name="description" content={META.description} />
        <meta name="keywords" content={META.keyword.join(", ")} />

        {/* Open Graph */}
        <meta property="og:title" content={META.openGraph.title} />
        <meta property="og:description" content={META.openGraph.description} />
        <meta property="og:image" content={META.ogImage} />
        <meta property="og:url" content={META.url} />
        <meta property="og:site_name" content={META.siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />

        {/* Twitter */}
        <meta name="twitter:title" content={META.openGraph.title} />
        <meta name="twitter:description" content={META.openGraph.description} />
        <meta name="twitter:image" content={META.ogImage} />

        {/* 사이트 소유자 인증 */}
        <meta
          name="google-site-verification"
          content={META.googleVerification}
        />
        <meta name="naver-site-verification" content={META.naverVerification} />

        {/* GA 스크립트 */}
        {META.googleAnalyticsId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${META.googleAnalyticsId}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${META.googleAnalyticsId}', {
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
