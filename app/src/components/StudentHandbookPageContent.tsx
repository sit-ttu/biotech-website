import Link from "next/link";
import type { SiteLocale } from "@/lib/program-pages";
import type { Handbook } from "@/lib/api";

import StudentHandbookView from "@/components/StudentHandbookView";
import { ArrowIcon } from "@/components/icons/ArrowIcon";

const uiByLocale = {
  vi: {
    eyebrow: "Sổ tay sinh viên Biotech TTU",
    updatedLabel: "Dành riêng cho sinh viên Khoa Công nghệ Sinh học",
    schoolYearLabel: "Năm học",
    downloadPdf: "Tải bản PDF gốc",
    documentLabel: "Tài liệu",
    documentText: "Xem hoặc tải bản PDF đầy đủ của sổ tay sinh viên.",
    archiveTitle: "Các năm trước",
    emptyContent: "Nội dung đang được cập nhật.",
    linksTitle: "Đi tiếp từ đây",
    links: [
      ["Chương trình đào tạo", "/vi/chuong-trinh-dao-tao"],
      ["Nghiên cứu tại Biotech TTU", "/vi/nghien-cuu"],
      ["Hoạt động sinh viên", "/vi/sinh-vien/hoat-dong"],
      ["Việc làm & thực tập", "/vi/sinh-vien/viec-lam"],
    ] as const,
    contactLabel: "Cần hỗ trợ trực tiếp?",
    contactText:
      "Liên hệ Văn phòng Khoa Công nghệ Sinh học để được hướng dẫn đúng đầu mối.",
    handbookPath: "/vi/sinh-vien/so-tay",
  },
  en: {
    eyebrow: "Biotech TTU student handbook",
    updatedLabel: "Created for students of the School of Biotechnology",
    schoolYearLabel: "Academic year",
    downloadPdf: "Download original PDF",
    documentLabel: "Document",
    documentText: "View or download the full PDF of the student handbook.",
    archiveTitle: "Previous years",
    emptyContent: "Content is being updated.",
    linksTitle: "Continue from here",
    links: [
      ["Academic programmes", "/en/programs"],
      ["Research at Biotech TTU", "/en/research"],
      ["Student activities", "/en/students/activities"],
      ["Jobs & internships", "/en/students/jobs"],
    ] as const,
    contactLabel: "Need direct support?",
    contactText:
      "Contact the School of Biotechnology office for guidance to the right person or service.",
    handbookPath: "/en/students/handbook",
  },
} as const;

const EMAIL = "secretary.sbio@ttu.edu.vn";
const PHONE = "+84 272 376 9216";

export default function StudentHandbookPageContent({
  locale,
  edition,
  archive,
}: {
  locale: SiteLocale;
  edition: Handbook;
  archive: Handbook[];
}) {
  const copy = uiByLocale[locale];

  // Fall back to Vietnamese content/PDF when the localized version is missing.
  const content =
    locale === "en" ? edition.contentEn ?? edition.contentVi : edition.contentVi;
  const pdfUrl =
    locale === "en"
      ? edition.pdfUrlEn ?? edition.pdfUrlVi
      : edition.pdfUrlVi;

  const otherYears = archive.filter((h) => h.schoolYear !== edition.schoolYear);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#171b25]">
      <section className="bg-[#111311] text-white">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 lg:pb-20 lg:pt-16">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/50">
            {copy.eyebrow}
          </div>
          <h1 className="mt-7 max-w-[15ch] text-[3rem] font-semibold leading-[1.15] tracking-[-0.035em] text-balance sm:text-[4rem] lg:text-[4.8rem]">
            {copy.eyebrow}
          </h1>
          <p className="mt-6 font-mono text-sm font-semibold uppercase tracking-[0.15em] text-white/55">
            {copy.schoolYearLabel}: {edition.schoolYear}
          </p>
        </div>
      </section>

      <section className="relative bg-[#f5f7f4] py-16 sm:py-20 lg:py-24">
        <StudentHandbookView locale={locale} content={content} />
      </section>

      {pdfUrl && (
        <section className="border-b border-[#171b25]/15 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[11rem_minmax(0,1fr)_auto] lg:items-center lg:gap-10">
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#139C48]">
              {copy.documentLabel}
            </p>
            <p className="max-w-3xl text-lg font-bold leading-8 tracking-[-0.02em] sm:text-xl">
              {copy.documentText}
            </p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-12 items-center justify-between gap-8 rounded-full bg-[#139C48] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0F7E3A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
            >
              {copy.downloadPdf}
              <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowIcon direction="up-right" size={16} />
              </span>
            </a>
          </div>
        </section>
      )}

      {otherYears.length > 0 && (
        <section className="border-y border-[#171b25]/15 bg-[#f5f7f4] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
              {copy.archiveTitle}
            </h2>
            <nav className="mt-7 grid border-t-2 border-[#171b25] sm:grid-cols-2">
              {otherYears.map((h, index) => (
                <Link
                  key={h.schoolYear}
                  href={`${copy.handbookPath}/${h.schoolYear}`}
                  className={`group flex min-h-20 items-center justify-between gap-5 border-b border-[#d8d3ce] px-4 py-5 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#139C48] ${index % 2 === 0 ? "sm:border-r" : ""}`}
                >
                  <span className="text-sm font-semibold transition-colors group-hover:text-[#139C48]">
                    {copy.schoolYearLabel} {h.schoolYear}
                  </span>
                  <span
                    aria-hidden
                    className="text-[#139C48] transition-transform group-hover:translate-x-1"
                  >
                    <ArrowIcon direction="right" size={16} />
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </section>
      )}

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
              {copy.linksTitle}
            </h2>
            <nav className="mt-7 grid border-t-2 border-[#171b25] sm:grid-cols-2">
              {copy.links.map(([label, href], index) => (
                <Link
                  key={href}
                  href={href}
                  className={`group flex min-h-24 items-center justify-between gap-5 border-b border-[#d8d3ce] px-4 py-5 transition-colors hover:bg-[#f5f7f4] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#139C48] ${index % 2 === 0 ? "sm:border-r" : ""}`}
                >
                  <span className="text-sm font-semibold transition-colors group-hover:text-[#139C48]">
                    {label}
                  </span>
                  <span
                    aria-hidden
                    className="text-[#139C48] transition-transform group-hover:translate-x-1"
                  >
                    <ArrowIcon direction="right" size={16} />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
              {copy.contactLabel}
            </h2>
            <div className="mt-7 border-l-2 border-[#139C48] pl-6">
              <p className="max-w-xl text-sm leading-7 text-[#626661]">
                {copy.contactText}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
                <a
                  className="text-[#139C48] underline underline-offset-4"
                  href={`mailto:${EMAIL}`}
                >
                  {EMAIL}
                </a>
                <a
                  className="text-[#414541] underline decoration-[#171b25]/25 underline-offset-4"
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                >
                  {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
