import fs from "fs";
import path from "path";

// ✅ 수정된 경로
const testListPath = path.join(
  process.cwd(),
  "src",
  "app",
  "examples",
  "TestList.json"
);
const outputPath = path.join(process.cwd(), "public", "sitemap.xml");

// 사이트 기본 주소
const BASE_URL = "https://fylto.kr";

// 정적 라우트
const staticRoutes = ["/", "/intro", "/intro/first-time", "/about"];

// 동적 라우트
const testList = JSON.parse(fs.readFileSync(testListPath, "utf-8"));
const dynamicRoutes = testList.map((test) => `/examples/${test.id}`);

// 전체 라우트 합치기
const allRoutes = [...staticRoutes, ...dynamicRoutes];

// 오늘 날짜 (ISO 8601 형식)
const today = new Date().toISOString();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    return `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

fs.writeFileSync(outputPath, sitemap);
console.log("✅ sitemap.xml 생성 완료:", outputPath);
