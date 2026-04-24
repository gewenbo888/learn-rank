import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://learn.psyverse.fun"),
  title: "Learn · Ranked | 在线学习平台排行榜",
  description:
    "Coursera, edX, Udemy, Khan Academy, freeCodeCamp, MasterClass, Duolingo, GeekTime — 35+ online learning platforms scored on 6 weighted criteria including content quality, career impact, pricing, and certification value.",
  keywords: ["online learning", "MOOC comparison", "best learning platform", "Coursera", "edX", "Udemy", "Khan Academy", "freeCodeCamp", "MasterClass", "Duolingo", "在线学习", "学习平台对比", "极客时间"],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/", "x-default": "/" },
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Learn · Ranked" }],
    title: "Learn · Ranked",
    description: "35+ online learning platforms scored on 6 weighted criteria across 7 platform types. 中英双语。",
    url: "https://learn.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    images: ["/twitter-image.png"],
    card: "summary_large_image",
    title: "Learn · Ranked",
    description: "35+ online learning platforms scored on 6 criteria across 7 types.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#0a0908" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script src="https://analytics-dashboard-two-blue.vercel.app/tracker.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
