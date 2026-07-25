import FaqPageContent from "@/components/FaqPageContent";
import { buildPageMetadata } from "@/lib/seo";

const title = "FAQ - School of Biotechnology - Tan Tao University";
const description =
  "Frequently asked questions about admissions, tuition, programs, and student life at the School of Biotechnology, Tan Tao University.";

export const metadata = buildPageMetadata({
  locale: "en",
  title,
  description,
  path: "/en/faq",
  alternatePath: "/vi/hoi-dap",
  image: "/assets/biotech/research-biotechnology.png",
});

export default function FaqPage() {
  return <FaqPageContent />;
}
