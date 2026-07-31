"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import EditorialCta from "@/components/EditorialCta";
import { api, type Program } from "@/lib/api";
import {
  apiProgramLevel,
  localizedProgramText,
  normalizeProgramLevel,
  programDetailHref,
  programImage,
  programsBasePath,
  stripProgramHtml,
  type ProgramLevelKey,
  type SiteLocale,
} from "@/lib/program-pages";

import { ArrowIcon } from "@/components/icons/ArrowIcon";

type TranslationProgram = {
  title: string;
  code: string;
  description?: string;
  features?: string;
};

type ProgramCategory = {
  title: string;
  programs: TranslationProgram[];
};

type LevelDetails = {
  hero: {
    breadcrumbs: string[];
    title: string;
    highlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
    alt?: string;
  };
  keyDetails: { label: string; value: string; description?: string }[];
  overview: {
    badge: string;
    title: string;
    description: string;
    points: string[];
  };
};

type ProgramsData = Record<ProgramLevelKey, Record<string, ProgramCategory>>;

type DetailsTranslations = {
  shared: {
    keyDetailsTitle: string;
    programCard: {
      codeLabel: string;
      featuresLabel: string;
      ctaLabel: string;
    };
  };
  undergraduate: LevelDetails;
  graduate: LevelDetails;
};

export default function EducationLevelPageContent({ locale }: { locale: SiteLocale }) {
  const params = useParams<{ "education-level": string }>();
  const levelKey = normalizeProgramLevel(params?.["education-level"]);
  const t = useTranslations("programs");
  const reduceMotion = useReducedMotion();
  const [apiPrograms, setApiPrograms] = useState<Program[]>([]);

  const programsData = t.raw("programs") as ProgramsData;
  const details = t.raw("details") as DetailsTranslations;
  const levelDetails = details[levelKey];
  const fallbackCategories = useMemo(
    () => Object.values(programsData?.[levelKey] || {}),
    [levelKey, programsData],
  );

  useEffect(() => {
    let active = true;

    api.programs
      .findAll({ level: apiProgramLevel(levelKey), status: "active" })
      .then((data) => {
        if (active) setApiPrograms(data);
      })
      .catch((error) => {
        console.error("Failed to fetch education-level programs:", error);
      });

    return () => {
      active = false;
    };
  }, [levelKey]);

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0 },
  };
  const levelLabel = levelKey === "graduate" ? t("graduate") : t("undergraduate");
  const heroImage =
    levelKey === "graduate"
      ? "/assets/biotech/biotech-research-visual-2026.png"
      : "/assets/biotech/program-biotechnology-lab.webp";
  const copy =
    locale === "vi"
      ? {
          chapter: "Hành trình học tập",
          pathway: "Một lộ trình được thiết kế để chuyển hóa kiến thức thành năng lực thực hành.",
          programs: "Các ngành thuộc bậc học",
          programIntro: "Mỗi ngành là một hướng tiếp cận khác nhau, cùng chia sẻ nền tảng công nghệ và tư duy giải quyết vấn đề.",
          discover: "Khám phá chương trình",
          admissionCycle: "Tuyển sinh 2026",
          overviewNote:
            "Một nền tảng học thuật vững chắc, được mở rộng bằng thực hành, nghiên cứu và kết nối doanh nghiệp.",
          ctaTitle: "Bắt đầu hành trình tại Khoa Công nghệ Sinh học",
          ctaDescription:
            "Tìm hiểu chương trình phù hợp và trao đổi trực tiếp với đội ngũ tuyển sinh của TTU.",
          ctaPrimary: "Đăng ký tư vấn",
          ctaSecondary: "Xem tất cả chương trình",
        }
      : {
          chapter: "Learning journey",
          pathway: "A pathway designed to turn academic knowledge into practical capability.",
          programs: "Programs at this level",
          programIntro: "Each program offers a distinct direction while sharing a foundation in technology and problem solving.",
          discover: "Discover the program",
          admissionCycle: "Admissions 2026",
          overviewNote:
            "A strong academic foundation extended through laboratory practice, research and industry connection.",
          ctaTitle: "Begin your journey with the Faculty of Biotechnology",
          ctaDescription:
            "Find the right program and speak directly with TTU's admissions team.",
          ctaPrimary: "Request consultation",
          ctaSecondary: "View all programs",
        };

  return (
    <main className="overflow-hidden bg-white text-[#111311]">
      <section className="px-5 pb-14 pt-10 sm:px-8 md:pb-20 md:pt-14">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-8">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#139C48]">
                {copy.admissionCycle} · {levelLabel}
              </p>
              <h1 className="mt-6 max-w-[12ch] text-[clamp(3.4rem,7.5vw,7.4rem)] font-semibold leading-[1.02] tracking-[-0.07em] text-balance">
                {levelDetails.hero.title}{" "}
                <span className="text-[#139C48]">
                  {levelDetails.hero.highlight}
                </span>
              </h1>
            </div>
            <div className="border-l border-[#d8ddd8] pl-6 lg:col-span-4 lg:pl-8">
              <p className="max-w-sm text-[0.85rem] leading-7 text-[#626862]">
                {levelDetails.hero.subtitle}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://tuyensinh.ttu.edu.vn"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-[#139C48] px-5 text-[0.72rem] font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#0f7e3a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
                >
                  {levelDetails.hero.ctaPrimary}
                  <ArrowIcon direction="up-right" size={14} />
                </a>
                <a
                  href="#level-programs"
                  className="inline-flex min-h-11 items-center rounded-full border border-[#cfd2ce] px-5 text-[0.72rem] font-semibold text-[#4f554f] transition-colors hover:border-[#139C48] hover:text-[#139C48] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
                >
                  {levelDetails.hero.ctaSecondary}
                </a>
              </div>
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
              src={heroImage}
              alt={levelDetails.hero.alt || levelDetails.hero.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>

          <div className="mt-10 grid border-y border-[#d8ddd8] sm:grid-cols-2 lg:grid-cols-4">
            {levelDetails.keyDetails.map((detail, index) => (
              <motion.article
                key={detail.label}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="border-b border-[#d8ddd8] py-6 sm:px-6 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:min-h-40 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#747b75]">
                  {detail.label}
                </p>
                <p className="mt-8 text-[1.55rem] font-semibold leading-tight tracking-[-0.04em]">
                  {detail.value}
                </p>
                {detail.description && (
                  <p className="mt-3 text-[0.72rem] leading-5 text-[#6b756e]">
                    {detail.description}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f5f1] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <header className="grid gap-8 border-b border-[#cfd4cf] pb-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="max-w-[10ch] text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-balance">
                {levelDetails.overview.title}
              </h2>
            </div>
            <div className="lg:col-start-9 lg:col-span-4">
              <p className="max-w-md text-[0.84rem] leading-7 text-[#626862]">
                {copy.overviewNote}
              </p>
            </div>
          </header>

          <div className="mt-2">
            {levelDetails.overview.points.map((point, index) => (
              <motion.article
                key={point}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="grid gap-5 border-b border-[#cfd4cf] py-7 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center lg:grid-cols-[7rem_minmax(0,1fr)_18rem]"
              >
                <span className="font-mono text-[0.68rem] text-[#139C48]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="max-w-3xl text-[1.15rem] font-semibold leading-7 tracking-[-0.02em]">
                  {point}
                </p>
                <span className="hidden h-px bg-[#139C48]/35 lg:block" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="level-programs"
        className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="max-w-[10ch] text-[clamp(3rem,6vw,6rem)] font-semibold leading-[1.05] tracking-[-0.065em] text-balance">
                {copy.programs}
              </h2>
            </div>
            <p className="max-w-md text-[0.82rem] leading-7 text-[#667069] lg:col-start-9 lg:col-span-4">
              {copy.programIntro}
            </p>
          </header>

          {apiPrograms.length > 0 ? (
            <div className="mt-12 border-t border-[#d8ddd8]">
              {apiPrograms.map((program, index) => {
                const title = localizedProgramText(
                  locale,
                  program.nameVi,
                  program.nameEn,
                );
                const description = stripProgramHtml(
                  localizedProgramText(
                    locale,
                    program.descriptionVi,
                    program.descriptionEn,
                  ),
                );

                return (
                  <motion.article
                    key={program.programId}
                    initial="hidden"
                    whileInView="visible"
                    variants={reveal}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55 }}
                    className="group grid gap-7 border-b border-[#d8ddd8] py-8 lg:grid-cols-12 lg:items-center lg:py-10"
                  >
                    <div className="lg:col-span-1">
                      <span className="font-mono text-[0.7rem] text-[#139C48]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="lg:col-span-6">
                      <span className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#727973]">
                        {program.majorCode || program.code}
                      </span>
                      <div className="mt-3 max-w-2xl">
                        <h3 className="text-[clamp(1.8rem,3.2vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.05em] transition-colors group-hover:text-[#139C48]">
                          {title}
                        </h3>
                        {description && (
                          <p className="mt-5 max-w-xl text-sm leading-7 text-[#667069]">
                            {description}
                          </p>
                        )}
                        <Link
                          href={programDetailHref(locale, program)}
                          className="mt-7 inline-flex min-h-10 items-center gap-3 rounded-full border border-[#cfd2ce] px-4 text-[0.68rem] font-semibold text-[#4f554f] transition-colors hover:border-[#139C48] hover:text-[#139C48] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
                        >
                          {copy.discover}
                          <ArrowIcon direction="up-right" size={14} />
                        </Link>
                      </div>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[0.85rem] bg-[#e8eae7] lg:col-span-5">
                      <img
                        src={programImage(program)}
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 border-t border-[#d8ddd8]">
              {fallbackCategories.map((category, categoryIndex) => (
                <motion.article
                  key={category.title}
                  initial="hidden"
                  whileInView="visible"
                  variants={reveal}
                  viewport={{ once: true }}
                  className="grid gap-6 border-b border-[#d8ddd8] py-8 lg:grid-cols-[7rem_18rem_minmax(0,1fr)] lg:py-10"
                >
                  <span className="font-mono text-[0.7rem] text-[#139C48]">
                    {String(categoryIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.7rem] font-semibold leading-tight tracking-[-0.04em]">
                    {category.title}
                  </h3>
                  <div>
                    {category.programs.map((program) => (
                      <div
                        key={program.code}
                        className="grid gap-3 border-t border-[#d8ddd8] py-5 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,1fr)_7rem]"
                      >
                        <div>
                          <h4 className="text-lg font-semibold leading-snug">
                            {program.title}
                          </h4>
                          {program.description && (
                            <p className="mt-3 text-[0.76rem] leading-6 text-[#667069]">
                              {program.description}
                            </p>
                          )}
                          {program.features && (
                            <p className="mt-3 text-[0.7rem] leading-5 text-[#7a837c]">
                              {program.features}
                            </p>
                          )}
                        </div>
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#139C48] sm:text-right">
                          {program.code}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <EditorialCta
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        primaryLabel={copy.ctaPrimary}
        primaryHref="https://tuyensinh.ttu.edu.vn"
        secondaryLabel={copy.ctaSecondary}
        secondaryHref={programsBasePath(locale)}
      />
    </main>
  );
}
