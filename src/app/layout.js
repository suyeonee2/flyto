import "./globals.css";

export const metadata = {
  title: "Choosely",
  description: "감성 인터랙티브 콘텐츠",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
