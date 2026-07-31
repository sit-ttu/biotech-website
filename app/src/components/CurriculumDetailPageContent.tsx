"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import EditorialCta from "@/components/EditorialCta";
import { api, type Curriculum, type Program } from "@/lib/api";
import {
  localizedProgramText,
  programDetailHref,
  programImage,
  programsBasePath,
  stripProgramHtml,
  type SiteLocale,
} from "@/lib/program-pages";
import { getLevelDisplay } from "@/utils/common";

import { ArrowIcon } from "@/components/icons/ArrowIcon";

const CurriculumDetailLoading = () => (
  <main className="min-h-screen animate-pulse bg-white">
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:pb-20">
      <div className="h-3 w-56 bg-[#ebe6e1]" />
      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <div>
          <div className="h-3 w-40 bg-[#ebe6e1]" />
          <div className="mt-8 h-32 max-w-3xl bg-[#ebe6e1]" />
          <div className="mt-8 h-20 max-w-2xl bg-[#f2eeea]" />
        </div>
        <div className="h-80 bg-[#e8e2dc]" />
      </div>
    </section>
  </main>
);

const summarizeText = (text: string, maxLength = 210) => {
  if (text.length <= maxLength) return text;

  const shortened = text.slice(0, maxLength);
  return `${shortened
    .slice(0, shortened.lastIndexOf(" "))
    .trim()
    .replace(/[\s,;:()]+$/g, "")}…`;
};

export default function CurriculumDetailPageContent({
  locale,
}: {
  locale: SiteLocale;
}) {
  const params = useParams<{ program: string; slug: string }>();
  const reduceMotion = useReducedMotion();
  const [program, setProgram] = useState<Program | null>(null);
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchCurriculum() {
      if (!params?.program || !params?.slug) return;

      try {
        const curriculumWithProgram =
          await api.curriculums.findByProgramAndCurriculumSlug(
            params.program,
            params.slug,
            locale,
          );
        const fullCurriculum = await api.curriculums.findOne(
          curriculumWithProgram.curriculumId,
          true,
        );

        if (!active) return;

        const visibleSections = (fullCurriculum.sections || [])
          .filter((section) => section.isVisible)
          .sort(
            (first, second) =>
              (first.displayOrder || 0) - (second.displayOrder || 0),
          );

        setProgram(curriculumWithProgram.program);
        setCurriculum(fullCurriculum);
        setExpandedSections(
          visibleSections[0]
            ? { [visibleSections[0].sectionId]: true }
            : {},
        );
      } catch (error) {
        console.error("Failed to fetch curriculum detail:", error);
        if (active) setFailed(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchCurriculum();
    return () => {
      active = false;
    };
  }, [locale, params?.program, params?.slug]);

  const sections = useMemo(
    () =>
      (curriculum?.sections || [])
        .filter((section) => section.isVisible)
        .sort(
          (first, second) =>
            (first.displayOrder || 0) - (second.displayOrder || 0),
        ),
    [curriculum?.sections],
  );

  const copy =
    locale === "vi"
      ? {
          breadcrumb: "Chương trình đào tạo",
          dossier: "Hồ sơ chương trình đào tạo",
          version: "Phiên bản áp dụng",
          overview: "Tổng quan chương trình đào tạo",
          contents: "Trong hồ sơ này",
          curriculumContent: "Nội dung chương trình",
          curriculumDescription:
            "Mở từng mục để xem chi tiết chuẩn đầu ra, cấu trúc học phần và yêu cầu của chương trình.",
          noSections: "Nội dung chi tiết đang được cập nhật.",
          level: "Bậc đào tạo",
          duration: "Thời lượng",
          credits: "Tín chỉ",
          semesters: "Học kỳ",
          language: "Ngôn ngữ",
          degree: "Văn bằng",
          years: "năm",
          current: "Đang áp dụng",
          document: "Tài liệu chương trình",
          documentDescription:
            "Xem bản chương trình đào tạo đầy đủ để tra cứu các học phần và yêu cầu tốt nghiệp.",
          viewPdf: "Xem chương trình đào tạo (PDF)",
          backToProgram: "Quay lại chương trình",
          ctaTitle: "Bạn muốn tìm hiểu sâu hơn về chương trình?",
          ctaDescription:
            "Trao đổi với đội ngũ tuyển sinh để được tư vấn về lộ trình học, điều kiện đầu vào và cơ hội nghề nghiệp.",
          ctaPrimary: "Đăng ký tư vấn",
          allPrograms: "Xem tất cả chương trình",
        }
      : {
          breadcrumb: "Academic programs",
          dossier: "Curriculum dossier",
          version: "Effective version",
          overview: "Curriculum overview",
          contents: "In this dossier",
          curriculumContent: "Program content",
          curriculumDescription:
            "Open each section to review learning outcomes, course structure, and program requirements.",
          noSections: "Detailed curriculum content is being updated.",
          level: "Study level",
          duration: "Duration",
          credits: "Credits",
          semesters: "Semesters",
          language: "Language",
          degree: "Award",
          years: "years",
          current: "Current",
          document: "Program document",
          documentDescription:
            "View the full curriculum document for course and graduation requirements.",
          viewPdf: "View curriculum PDF",
          backToProgram: "Back to program",
          ctaTitle: "Would you like to explore the program further?",
          ctaDescription:
            "Speak with admissions about the study pathway, entry requirements and career opportunities.",
          ctaPrimary: "Request consultation",
          allPrograms: "View all programs",
        };

  if (loading) return <CurriculumDetailLoading />;
  if (failed || !curriculum || !program) return notFound();

  const curriculumName = localizedProgramText(
    locale,
    curriculum.nameVi,
    curriculum.nameEn,
  );
  const programTitle = localizedProgramText(
    locale,
    program.nameVi,
    program.nameEn,
  );
  const description = stripProgramHtml(
    localizedProgramText(
      locale,
      curriculum.descriptionVi,
      curriculum.descriptionEn,
    ),
  );
  const heroDescription = summarizeText(description);
  const programHref = programDetailHref(locale, program);
  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };
  const facts = [
    {
      label: copy.level,
      value: getLevelDisplay(program.level, locale),
    },
    {
      label: copy.duration,
      value: curriculum.durationYears
        ? `${curriculum.durationYears} ${copy.years}`
        : "—",
    },
    { label: copy.credits, value: curriculum.totalCredits || "—" },
    { label: copy.semesters, value: curriculum.totalSemesters || "—" },
    { label: copy.language, value: curriculum.language || "—" },
    { label: copy.degree, value: curriculum.degreeAwarded || "—" },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  };

  return (
    <main className="overflow-hidden bg-white text-[#111311]">
      <section className="px-5 pb-16 pt-10 sm:px-8 md:pb-20 md:pt-14">
        <div className="mx-auto max-w-7xl">
          <Link
            href={programHref}
            className="inline-flex items-center gap-3 text-[0.68rem] font-semibold text-[#5f665f] transition-colors hover:text-[#139C48] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
          >
            <ArrowIcon direction="left" size={14} />
            {copy.backToProgram}
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid gap-9 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-8">
              <h1 className="max-w-[16ch] text-[clamp(3rem,6.5vw,6.7rem)] font-semibold leading-[1.03] tracking-[-0.07em] text-balance">
                {curriculumName}
              </h1>
            </div>
            <div className="border-l border-[#d8ddd8] pl-6 lg:col-span-4 lg:pl-8">
              <Link
                href={programHref}
                className="text-[0.88rem] font-semibold leading-6 text-[#139C48] transition-colors hover:text-[#0f7e3a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
              >
                {programTitle}
              </Link>
              <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#747b75]">
                {copy.version} {curriculum.year}
                {curriculum.isCurrent ? ` · ${copy.current}` : ""}
              </p>
              {heroDescription && (
                <p className="mt-6 max-w-sm text-[0.82rem] leading-7 text-[#626862]">
                  {heroDescription}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="relative mt-10 aspect-[4/3] min-h-80 overflow-hidden rounded-[1rem] bg-[#e8eae7] sm:aspect-[16/7]"
          >
            <img
              src={programImage(program)}
              alt={programTitle}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>

          <div className="mt-10 grid border-y border-[#d8ddd8] sm:grid-cols-2 lg:grid-cols-6">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-[#d8ddd8] py-6 sm:px-5 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:min-h-32 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#7d847e]">
                  {fact.label}
                </p>
                <p className="mt-5 text-[1.05rem] font-semibold leading-6">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f5f1] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.header
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true }}
            className="grid gap-8 border-b border-[#cfd4cf] pb-10 lg:grid-cols-12 lg:items-end"
          >
            <h2 className="max-w-[11ch] text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-balance lg:col-span-7">
              {copy.curriculumContent}
            </h2>
            <p className="max-w-md text-[0.84rem] leading-7 text-[#626862] lg:col-start-9 lg:col-span-4">
              {copy.curriculumDescription}
            </p>
          </motion.header>

          {sections.length > 0 ? (
            <div>
              {sections.map((section, index) => {
                const expanded = Boolean(expandedSections[section.sectionId]);

                return (
                  <article
                    id={`curriculum-section-${section.sectionId}`}
                    key={section.sectionId}
                    className="scroll-mt-28 border-b border-[#cfd4cf]"
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`curriculum-panel-${section.sectionId}`}
                        onClick={() => toggleSection(section.sectionId)}
                        className="group grid w-full grid-cols-[3rem_minmax(0,1fr)_2.75rem] items-center gap-4 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48] sm:grid-cols-[6rem_minmax(0,1fr)_3rem] sm:py-9"
                      >
                        <span className="font-mono text-[0.68rem] text-[#139C48]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[1.15rem] font-semibold leading-7 tracking-[-0.02em] transition-colors group-hover:text-[#139C48] sm:text-[1.35rem]">
                          {section.title}
                        </span>
                        <span
                          aria-hidden
                          className="flex h-9 w-9 items-center justify-center justify-self-end rounded-full border border-[#bfc8c0] text-xl font-light leading-none text-[#139C48] transition-colors group-hover:border-[#139C48] group-hover:bg-[#139C48] group-hover:text-white"
                        >
                          {expanded ? "−" : "+"}
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`curriculum-panel-${section.sectionId}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        expanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="prose prose-slate max-w-none pb-12 pl-[4rem] text-[0.9rem] leading-8 text-[#555b55] sm:pl-[7rem] sm:pr-14 sm:text-base [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.025em] [&_h2]:text-[#111311] [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#111311] [&_li]:my-2 [&_p]:leading-8 [&_table]:my-8 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_td]:min-w-32 [&_td]:border-[#cfd4cf] [&_td]:px-4 [&_td]:py-3 [&_th]:min-w-32 [&_th]:border-[#cfd4cf] [&_th]:bg-white [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-sm"
                          dangerouslySetInnerHTML={{
                            __html: (section.content || "").replace(
                              /&nbsp;/g,
                              " ",
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="border-b border-[#cfd4cf] py-14 text-[0.86rem] text-[#626862]">
              {copy.noSections}
            </p>
          )}
        </div>
      </section>

      {curriculum.pdfUrl && (
        <section className="bg-white px-5 py-12 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 border-y border-[#d8ddd8] py-8 lg:grid-cols-[11rem_minmax(0,1fr)_auto] lg:items-center lg:gap-10">
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#139C48]">
              {copy.document}
            </p>
            <p className="max-w-3xl text-[1.05rem] font-semibold leading-7 tracking-[-0.02em]">
              {copy.documentDescription}
            </p>
            <a
              href={curriculum.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-11 items-center justify-between gap-8 rounded-full bg-[#139C48] px-5 text-[0.7rem] font-semibold text-white transition-colors hover:bg-[#0f7e3a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
            >
              {copy.viewPdf}
              <ArrowIcon direction="up-right" size={14} />
            </a>
          </div>
        </section>
      )}

      <section className="bg-white px-5 pt-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href={programHref}
            className="inline-flex items-center gap-3 text-[0.7rem] font-semibold text-[#139C48] transition-colors hover:text-[#0f7e3a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
          >
            <ArrowIcon direction="left" size={14} />
            {copy.backToProgram}
          </Link>
        </div>
      </section>

      <EditorialCta
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        primaryLabel={copy.ctaPrimary}
        primaryHref="https://tuyensinh.ttu.edu.vn"
        secondaryLabel={copy.allPrograms}
        secondaryHref={programsBasePath(locale)}
      />
    </main>
  );
}
