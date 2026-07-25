import StudentsPageContent from "@/components/StudentsPageContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "vi",
  title: "Đời sống sinh viên Công nghệ Sinh học | Biotech TTU",
  description:
    "Thông tin học tập, hoạt động, sổ tay, thực tập, việc làm và mạng lưới cựu sinh viên Khoa Công nghệ Sinh học, Đại học Tân Tạo.",
  path: "/vi/sinh-vien",
  alternatePath: "/en/students",
  image: "/assets/ttu/students-campus-learning.jpg",
});

export default function StudentsPage() {
  return <StudentsPageContent locale="vi" />;
}
