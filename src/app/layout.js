import Footer from "@/Components/Footer/Footer";
import "./globals.css";

export const metadata = {
  title: "필토 | Fylto.",
  description:
    "좋은 제품이 더 많은 사랑을 받을 수 있도록, 브랜드를 위한 맞춤 큐레이션 콘텐츠 스튜디오",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
