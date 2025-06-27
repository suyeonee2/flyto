// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fylto-assets.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
