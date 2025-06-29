export const META = {
  title: "필토 | Fylto.",
  siteName: "필토 | Fylto.",
  description:
    "좋은 제품이 더 많은 사랑을 받을 수 있도록. 브랜드를 위한 큐레이션 콘텐츠 스튜디오",
  keyword: [
    "Fylto",
    "필토",
    "브랜드 큐레이션",
    "큐레이션 콘텐츠",
    "취향테스트",
    "성향테스트",
    "심리테스트",
    "브랜드 마케팅",
    "마케팅",
  ],
  url: "https://fylto.com",
  googleVerification: "TkGbjNrfliw2r9qAZ08bQ8VO-Spvmsb2hSRIEfSAAFY",
  naverVerification: "5ede445a30b1c882a9fc56f1857c28b6da6a64ed",
  ogImage: "/og_fylto.jpg",
  icon: "/favicon.png",
  appleIcon: "/favicon.png",
  googleAnalyticsId: "G-433RVH46M5",
  openGraph: {
    title: "필토 | Fylto.",
    description:
      "좋은 제품이 더 많은 사랑을 받을 수 있도록. 브랜드를 위한 큐레이션 콘텐츠 스튜디오",
    url: "https://fylto.com",
    siteName: "필토 | Fylto.",
    images: {
      url: "/og_fylto.jpg",
    },
  },
};

export const getMetadata = (metadataProps) => {
  const { title, description, asPath, ogImage } = metadataProps || {};
  const TITLE = title ? `${title} | Fylto` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath ? `${META.url}${asPath}` : META.url;
  const OG_IMAGE = ogImage || META.ogImage;

  const metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    icon: META.icon,
    appleIcon: META.appleIcon,
    keywords: [...META.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: META.siteName,
      locale: "ko_KR",
      type: "website",
      url: PAGE_URL,
      images: {
        url: OG_IMAGE,
      },
    },
    verification: {
      google: META.googleVerification,
      naver: META.naverVerification,
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
  };

  return metadata;
};
