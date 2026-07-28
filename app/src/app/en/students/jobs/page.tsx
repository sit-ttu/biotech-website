import StudentCareersPageContent from "@/components/StudentCareersPageContent";
import { api } from "@/lib/api";
import { getMockCareerOpportunities } from "@/lib/mock-content";
import { buildPageMetadata } from "@/lib/seo";

const title = "Jobs and Internships for Biotech TTU Students | Tan Tao University";
const description =
  "Career preparation, internship opportunities and employer connections for students of the School of Biotechnology at Tan Tao University.";

export const metadata = buildPageMetadata({
  locale: "en",
  title,
  description,
  path: "/en/students/jobs",
  alternatePath: "/vi/sinh-vien/viec-lam",
  image: "/assets/ttu/programs-academic-partnership.jpg",
});

export default async function StudentJobsPage() {
  const apiOpportunities = await api.careerOpportunities
    .findAll()
    .catch(() => []);
  const opportunities =
    apiOpportunities.length > 0
      ? apiOpportunities
      : getMockCareerOpportunities("en");
  return (
    <StudentCareersPageContent locale="en" opportunities={opportunities} />
  );
}
