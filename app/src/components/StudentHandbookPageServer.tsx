import { api, type Handbook } from "@/lib/api";
import Link from "next/link";
import type { SiteLocale } from "@/lib/program-pages";
import StudentHandbookPageContent from "@/components/StudentHandbookPageContent";
import { ArrowIcon } from "@/components/icons/ArrowIcon";

const emptyByLocale = {
  vi: {
    eyebrow: "Sổ tay sinh viên Biotech TTU",
    title: "Những thông tin cần thiết cho hành trình học tập.",
    message:
      "Phiên bản chính thức đang được cập nhật trên hệ thống. Trong thời gian này, sinh viên có thể sử dụng các nhóm thông tin nền tảng dưới đây.",
    items: [
      ["Học vụ", "Kế hoạch học tập, đăng ký học phần và các mốc quan trọng trong năm học."],
      ["Phòng thí nghiệm", "Nguyên tắc an toàn, chuẩn bị trước buổi thực hành và cách ghi chép dữ liệu."],
      ["Hỗ trợ sinh viên", "Kênh trao đổi với cố vấn học tập, Khoa và các đơn vị hỗ trợ của Trường."],
    ],
    action: "Liên hệ Khoa",
  },
  en: {
    eyebrow: "Biotech TTU student handbook",
    title: "Essential information for your learning journey.",
    message:
      "The official edition is being updated in the system. Students can use the core guidance below in the meantime.",
    items: [
      ["Academic affairs", "Study plans, course registration and key milestones throughout the academic year."],
      ["Laboratory", "Safety principles, preparation before practical sessions and scientific documentation."],
      ["Student support", "Ways to connect with academic advisers, the School and University support teams."],
    ],
    action: "Contact the School",
  },
} as const;

export default async function StudentHandbookPageServer({
  locale,
  schoolYear,
}: {
  locale: SiteLocale;
  schoolYear?: string;
}) {
  let edition: Handbook | null = null;
  let archive: Handbook[] = [];

  try {
    [edition, archive] = await Promise.all([
      schoolYear
        ? api.handbook.findByYear(schoolYear)
        : api.handbook.getCurrent(),
      api.handbook.findAll().catch(() => []),
    ]);
  } catch {
    edition = null;
  }

  if (!edition) {
    const copy = emptyByLocale[locale];
    const contactPath = locale === "vi" ? "/vi/lien-he" : "/en/contact";
    return (
      <main className="bg-white text-[#171b25]">
        <section className="border-b border-[#d8d3ce]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20 lg:pb-20 lg:pt-16">
            <div>
              <div className="flex items-center gap-4 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#6f746f]">
                <span className="h-px w-12 bg-[#139C48]" />
                {copy.eyebrow}
              </div>
              <h1 className="mt-7 max-w-[14ch] text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[1.15] tracking-[-0.035em] text-balance">
                {copy.title}
              </h1>
            </div>
            <p className="border-t-2 border-[#171b25] pt-5 text-base leading-8 text-[#626661] sm:text-lg">
              {copy.message}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#eef3ed]">
              <img
                src="/assets/ttu/students-library-reading.jpg"
                alt=""
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
            <div className="border-t-2 border-[#171b25]">
              {copy.items.map(([title, description], index) => (
                <article
                  key={title}
                  className="grid gap-4 border-b border-[#d8d3ce] py-7 sm:grid-cols-[3rem_0.65fr_1.35fr]"
                >
                  <span className="font-mono text-[0.62rem] text-[#139C48]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-lg font-bold tracking-[-0.025em]">
                    {title}
                  </h2>
                  <p className="text-sm leading-7 text-[#686c67]">
                    {description}
                  </p>
                </article>
              ))}
              <Link
                href={contactPath}
                className="mt-8 inline-flex min-h-12 items-center rounded-full border border-[#cfc9c3] px-6 text-sm font-semibold transition-colors hover:border-[#139C48] hover:text-[#139C48]"
              >
                {copy.action}
                <ArrowIcon direction="right" size={16} className="ml-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <StudentHandbookPageContent
      locale={locale}
      edition={edition}
      archive={archive}
    />
  );
}
