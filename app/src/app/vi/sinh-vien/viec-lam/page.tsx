import StudentCareersPageContent from "@/components/StudentCareersPageContent";
import { api } from "@/lib/api";
import { getMockCareerOpportunities } from "@/lib/mock-content";
import { buildPageMetadata } from "@/lib/seo";

const title = "Việc làm và thực tập cho sinh viên Biotech TTU | Đại học Tân Tạo";
const description =
  "Chuẩn bị hồ sơ nghề nghiệp, tìm cơ hội thực tập và kết nối tuyển dụng dành cho sinh viên Khoa Công nghệ Sinh học, Đại học Tân Tạo.";

export const metadata = buildPageMetadata({
  locale: "vi",
  title,
  description,
  path: "/vi/sinh-vien/viec-lam",
  alternatePath: "/en/students/jobs",
  image: "/assets/ttu/programs-academic-partnership.jpg",
});

export default async function StudentJobsPage() {
  const apiOpportunities = await api.careerOpportunities
    .findAll()
    .catch(() => []);
  const opportunities =
    apiOpportunities.length > 0
      ? apiOpportunities
      : getMockCareerOpportunities("vi");
  return (
    <StudentCareersPageContent locale="vi" opportunities={opportunities} />
  );
}
