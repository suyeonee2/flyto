// components/KakaoInitializer.js
"use client";

import { useEffect } from "react";

export default function KakaoInitializer() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  return null;
}
