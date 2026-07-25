import ResearchPageContent from "@/components/ResearchPageContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "en",
  title: "Biotechnology Research | Biotech TTU - Tan Tao University",
  description:
    "Explore research areas, scientific projects and international publications from the School of Biotechnology at Tan Tao University.",
  path: "/en/research",
  alternatePath: "/vi/nghien-cuu",
  image: "/assets/biotech/research-biotechnology.png",
});

export default function ResearchPage() {
  return <ResearchPageContent locale="en" />;
}
