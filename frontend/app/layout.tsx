import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "よりそい つながる",
  description:
    "ここまで、来てくださって、ありがとうございます。何もしなくて、大丈夫です。ただ、いてください。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="app-frame">{children}</div>
      </body>
    </html>
  );
}
