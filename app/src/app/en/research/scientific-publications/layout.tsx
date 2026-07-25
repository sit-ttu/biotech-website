import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "en",
  title: "Scientific Publications in Biotechnology | Biotech TTU",
  description:
    "Browse journal articles, conference papers and research publications from the School of Biotechnology at Tan Tao University.",
  path: "/en/research/scientific-publications",
  alternatePath: "/vi/nghien-cuu/bai-bao-khoa-hoc",
  image: "/assets/biotech/research-biotechnology.png",
});

export default function ScientificPublicationsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
