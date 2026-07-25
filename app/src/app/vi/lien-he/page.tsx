import ContactPageContent from "@/components/ContactPageContent";
import { buildPageMetadata } from "@/lib/seo";

const title = "Liên hệ Khoa Công nghệ Sinh học - Đại học Tân Tạo";
const description =
  "Thông tin liên hệ, giờ làm việc và các kênh hỗ trợ của Khoa Công nghệ Sinh học, Đại học Tân Tạo dành cho sinh viên và thí sinh.";

export const metadata = buildPageMetadata({
  locale: "vi",
  title,
  description,
  path: "/vi/lien-he",
  alternatePath: "/en/contact",
  image: "/assets/biotech/hero-biotechnology.png",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
