import AboutPageContent from "@/components/AboutPageContent";
import { buildPageMetadata } from "@/lib/seo";

const title = "Giới thiệu Khoa Công nghệ Sinh học - Đại học Tân Tạo";
const description =
  "Tìm hiểu Khoa Công nghệ Sinh học Đại học Tân Tạo: lịch sử từ năm 2011, sứ mệnh, tầm nhìn 2030, đội ngũ giảng viên và chương trình đào tạo.";

export const metadata = buildPageMetadata({
  locale: "vi",
  title,
  description,
  path: "/vi/gioi-thieu-chung",
  alternatePath: "/en/about-us",
  image: "/assets/ttu/about-tan-tao-campus.jpg",
});

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: title,
  description,
  url: "https://biotech.ttu.edu.vn/vi/gioi-thieu-chung",
  inLanguage: "vi-VN",
  mainEntity: {
    "@type": "CollegeOrUniversity",
    name: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
    alternateName: "Biotech TTU",
    foundingDate: "2011-01-04",
    url: "https://biotech.ttu.edu.vn/",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Trường Đại học Tân Tạo",
      url: "https://ttu.edu.vn/",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-272-376-9216",
      email: "secretary.sbio@ttu.edu.vn",
      contactType: "admissions and academic information",
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <AboutPageContent />
    </>
  );
}
