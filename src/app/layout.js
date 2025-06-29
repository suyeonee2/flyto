// app/layout.js

import "./globals.css";
import Script from "next/script";
import { META } from "@/components/utils/metadata";
import KakaoInitializer from "@/components/utils/KakaoInitializer";

export const metadata = {
  title: META.title,
  description: META.description,
  keywords: META.keyword,
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: META.openGraph.title,
    description: META.openGraph.description,
    url: META.url,
    siteName: META.siteName,
    images: [
      {
        url: META.ogImage,
        width: 800,
        height: 400,
        alt: META.openGraph.title,
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: META.openGraph.title,
    description: META.openGraph.description,
    images: [META.ogImage],
  },
  verification: {
    google: META.googleVerification,
    other: {
      "naver-site-verification": META.naverVerification,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        {children}
        <KakaoInitializer />

        {/* Kakao SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
          integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
          crossOrigin="anonymous"
        />

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
      </body>
    </html>
  );
}
