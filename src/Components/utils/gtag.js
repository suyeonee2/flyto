// utils/gtag.js

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// 기본 page view
export const pageView = (url) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_ID, {
      page_path: url,
    });
  }
};

// 테스트 페이지 진입 (커스텀 이벤트)
export const logTestPageView = (label) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      event_category: "Test",
      event_label: label,
    });
  }
};

// (예시) 버튼 클릭 이벤트
export const logTestEvent = ({ action, category, label }) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
};
