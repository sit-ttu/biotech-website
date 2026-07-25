import HomePageContent from "@/components/HomePageContent";
import { buildPageMetadata } from "@/lib/seo";

const title = "School of Biotechnology - Tan Tao University";
const description =
  "The School of Biotechnology at Tan Tao University offers Biotechnology and High-Tech Agriculture programs with research-led, practice-based learning.";

export const metadata = buildPageMetadata({
  locale: "en",
  title,
  description,
  path: "/en",
  alternatePath: "/vi",
  image: "/assets/biotech/hero-biotechnology.png",
});

export default function HomePage() {
  return <HomePageContent revealOffset={50} />;
}
