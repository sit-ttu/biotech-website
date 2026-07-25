import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "vi",
  title: "Đề tài nghiên cứu khoa học Công nghệ Sinh học | Biotech TTU",
  description:
    "Danh mục đề tài nghiên cứu đang triển khai và đã hoàn thành của Khoa Công nghệ Sinh học, Đại học Tân Tạo.",
  path: "/vi/nghien-cuu/de-tai-khoa-hoc",
  alternatePath: "/en/research/scientific-projects",
  image: "/assets/biotech/research-biotechnology.png",
});

export default function ScientificProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
