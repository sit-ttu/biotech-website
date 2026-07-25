import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "en",
  title: "Biotechnology Research Projects | Biotech TTU",
  description:
    "Explore ongoing and completed scientific research projects from the School of Biotechnology at Tan Tao University.",
  path: "/en/research/scientific-projects",
  alternatePath: "/vi/nghien-cuu/de-tai-khoa-hoc",
  image: "/assets/biotech/research-biotechnology.png",
});

export default function ScientificProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
