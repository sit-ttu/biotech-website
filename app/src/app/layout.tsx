import type { Metadata } from "next";
import { Roboto_Mono, Be_Vietnam_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, absoluteUrl, truncateText } from "@/lib/seo";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Biotech TTU",
  title: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
  description:
    "Khoa Công nghệ Sinh học Đại học Tân Tạo đào tạo Công nghệ Sinh học và Nông nghiệp công nghệ cao gắn với thực hành, nghiên cứu và ứng dụng.",
  keywords:
    "Khoa Công nghệ Sinh học Đại học Tân Tạo, Công nghệ Sinh học, Nông nghiệp công nghệ cao, nghiên cứu sinh học, Biotech TTU",
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
    siteName: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
    title: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
    description: truncateText(
      "Khoa Công nghệ Sinh học Đại học Tân Tạo đào tạo Công nghệ Sinh học và Nông nghiệp công nghệ cao gắn với thực hành, nghiên cứu và ứng dụng.",
      125,
    ),
    images: [
      {
        url: absoluteUrl("/assets/biotech/hero-biotechnology.png"),
        width: 1920,
        height: 1080,
        alt: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
    description:
      "Đào tạo Công nghệ Sinh học và Nông nghiệp công nghệ cao tại Đại học Tân Tạo.",
    images: [absoluteUrl("/assets/biotech/hero-biotechnology.png")],
  },
  icons: {
    icon: [
      {
        url: "/assets/biotech/logo-biotech.png",
        sizes: "737x111",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/biotech/logo-biotech.png",
        sizes: "737x111",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  category: "education",
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        suppressHydrationWarning
        className={`${beVietnamPro.className} ${robotoMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
