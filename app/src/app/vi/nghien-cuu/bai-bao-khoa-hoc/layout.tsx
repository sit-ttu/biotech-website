import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "vi",
  title: "Công bố và bài báo khoa học Công nghệ Sinh học | Biotech TTU",
  description:
    "Tra cứu bài báo, công bố quốc tế và kết quả nghiên cứu của giảng viên Khoa Công nghệ Sinh học, Đại học Tân Tạo.",
  path: "/vi/nghien-cuu/bai-bao-khoa-hoc",
  alternatePath: "/en/research/scientific-publications",
  image: "/assets/biotech/research-biotechnology.png",
});

export default function ScientificPublicationsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
