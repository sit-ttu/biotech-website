import HomePageContent from "@/components/HomePageContent";
import SiteIdentityJsonLd from "@/components/SiteIdentityJsonLd";
import { buildPageMetadata } from "@/lib/seo";

const title = "Khoa Công nghệ Sinh học - Đại học Tân Tạo";
const description =
  "Khoa Công nghệ Sinh học Đại học Tân Tạo đào tạo Công nghệ Sinh học và Sinh học ứng dụng theo định hướng nghiên cứu, thực hành và hội nhập quốc tế.";

export const metadata = buildPageMetadata({
  locale: "vi",
  title,
  description,
  path: "/vi",
  alternatePath: "/en",
  image: "/assets/biotech/hero-biotechnology.png",
});

export default function HomePage() {
  return (
    <>
      <SiteIdentityJsonLd />
      <HomePageContent revealOffset={40} />
    </>
  );
}
