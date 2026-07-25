import StudentActivitiesPageServer from "@/components/StudentActivitiesPageServer";
import { buildPageMetadata } from "@/lib/seo";

const title = "Hoạt động sinh viên Biotech TTU | Đại học Tân Tạo";
const description =
  "Khám phá workshop, cuộc thi, hoạt động cộng đồng và lịch sự kiện dành cho sinh viên Khoa Công nghệ Sinh học, Đại học Tân Tạo.";

export const metadata = buildPageMetadata({
  locale: "vi",
  title,
  description,
  path: "/vi/sinh-vien/hoat-dong",
  alternatePath: "/en/students/activities",
  image: "/assets/biotech/research-biotechnology.png",
});

export default function StudentActivitiesPage() {
  return <StudentActivitiesPageServer locale="vi" />;
}
