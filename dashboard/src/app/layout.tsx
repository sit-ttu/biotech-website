import type { Metadata } from "next";
import { Be_Vietnam_Pro, Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const dashboardFont = Be_Vietnam_Pro({
  variable: "--font-dashboard",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
  description:
    "Hệ thống quản trị nội dung của Khoa Công nghệ Sinh học, Đại học Tân Tạo.",
  keywords:
    "Khoa Công nghệ Sinh học, Đại học Tân Tạo, Tan Tao University, School of Biotechnology, Công nghệ Sinh học, Nông nghiệp công nghệ cao, Đào tạo, Giáo dục",
  authors: [{ name: "Khoa Công nghệ Sinh học - Đại học Tân Tạo" }],
  creator: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
  publisher: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://biotech.ttu.edu.vn",
    siteName: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
    title: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
    description:
      "Hệ thống quản trị nội dung của Khoa Công nghệ Sinh học, Đại học Tân Tạo.",
    images: ["/assets/logo-biotech.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
    description:
      "Hệ thống quản trị nội dung của Khoa Công nghệ Sinh học, Đại học Tân Tạo.",
    images: ["/assets/logo-biotech.png"],
  },
  alternates: {
    canonical: "https://biotech.ttu.edu.vn",
    languages: {
      "vi-VN": "https://biotech.ttu.edu.vn",
      "en-US": "https://biotech.ttu.edu.vn/?lang=en",
    },
  },
  icons: {
    icon: [
      {
        url: "/assets/logo-biotech.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/logo-biotech.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/logo-biotech.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/assets/logo-biotech.png",
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${dashboardFont.className} ${dashboardFont.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
