"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import EditorialCta from "@/components/EditorialCta";
import YooptaRenderer from "@/components/YooptaRenderer";
import { api, type Curriculum, type Program } from "@/lib/api";
import {
  curriculumDetailHref,
  localizedProgramText,
  normalizeProgramLevel,
  programDetailHref,
  programImage,
  programsBasePath,
  stripProgramHtml,
  type ProgramLevelKey,
  type SiteLocale,
} from "@/lib/program-pages";

type ProgramPageTranslations = {
  shared: {
    applyLabel: string;
    overview: {
      badge: string;
      title: string;
      description: string;
      points: string[];
    };
    curriculum: {
      title: string;
      description: string;
      placeholder: string;
    };
    career: {
      title: string;
      points: string[];
    };
  };
  undergraduate: {
    heroTagline: string;
    heroImage: string;
    keyFacts: { label: string; value: string }[];
  };
  graduate: {
    heroTagline: string;
    heroImage: string;
    keyFacts: { label: string; value: string }[];
  };
};

type ProgramSlugTranslations = {
  shared: {
    hero: { inquireLabel: string; applyLabel: string };
    overview: {
      title: string;
      description: string;
      sections: { title: string; points: string[] }[];
    };
    curriculum: { title: string; description: string; placeholder: string };
  };
  undergraduate: {
    hero: { badge: string; fallbackImage: string };
    meta: { school: string; division: string; level: string };
  };
  graduate: {
    hero: { badge: string; fallbackImage: string };
    meta: { school: string; division: string; level: string };
  };
};

const ProgramDetailLoading = () => (
  <main className="min-h-screen animate-pulse bg-[#fcfcfa]">
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="h-3 w-44 bg-[#e5e8e2]" />
      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.5fr)]">
        <div className="h-48 bg-[#e5e8e2]" />
        <div className="h-28 bg-[#eef0ec]" />
      </div>
      <div className="mt-9 aspect-[16/7] min-h-72 rounded-2xl bg-[#e1e5de]" />
      <div className="mt-12 h-24 border-y border-[#e1e4df]" />
    </section>
  </main>
);

export default function ProgramDetailPageContent({ locale }: { locale: SiteLocale }) {
  const params = useParams<{ "education-level": string; program: string }>();
  const t = useTranslations("programs");
  const reduceMotion = useReducedMotion();
  const [program, setProgram] = useState<Program | null>(null);
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [relatedPrograms, setRelatedPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const programPage = t.raw("programPage") as ProgramPageTranslations;
  const slugPage = t.raw("programSlugPage") as ProgramSlugTranslations;

  useEffect(() => {
    let active = true;

    async function fetchProgram() {
      if (!params?.program) return;

      try {
        const programData = await api.programs.findBySlug(params.program, locale);
        if (!active) return;
        setProgram(programData);

        const [curriculumData, relatedData] = await Promise.all([
          programData.programId
            ? api.curriculums.findAll(programData.programId)
            : Promise.resolve([]),
          api.programs.findAll({ level: programData.level, status: "active" }),
        ]);
        if (!active) return;
        setCurriculums(curriculumData);
        setRelatedPrograms(
          relatedData.filter(({ programId }) => programId !== programData.programId),
        );
      } catch (fetchError) {
        console.error("Failed to fetch program detail:", fetchError);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProgram();
    return () => {
      active = false;
    };
  }, [locale, params?.program]);

  const levelKey: ProgramLevelKey = normalizeProgramLevel(
    program?.level || params?.["education-level"],
  );
  const levelLabel = levelKey === "graduate" ? t("graduate") : t("undergraduate");
  const levelContent = programPage[levelKey];
  const slugLevelContent = slugPage[levelKey];
  const keyFacts = useMemo(
    () =>
      levelContent.keyFacts.map((fact) => ({
        ...fact,
        value: fact.value.replace(
          "{{code}}",
          program?.majorCode || program?.code || "—",
        ),
      })),
    [levelContent.keyFacts, program?.code, program?.majorCode],
  );
  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };
  const copy =
    locale === "vi"
      ? {
          advice: "Trao đổi với đội ngũ tuyển sinh để được tư vấn lộ trình phù hợp.",
          apply: "Đăng ký tư vấn",
          curriculumIndex: "Danh mục chương trình đào tạo",
          year: "Năm áp dụng",
          duration: "Thời lượng",
          credits: "Tín chỉ",
          semesters: "Học kỳ",
          viewCurriculum: "Xem chi tiết chương trình",
          outcome: "Hướng phát triển",
        }
      : {
          advice: "Talk with our admissions team to map a pathway that fits your goals.",
          apply: "Request guidance",
          curriculumIndex: "Curriculum index",
          year: "Effective year",
          duration: "Duration",
          credits: "Credits",
          semesters: "Semesters",
          viewCurriculum: "View curriculum details",
          outcome: "Pathway",
        };

  if (loading) return <ProgramDetailLoading />;

  if (error || !program) {
    return (
      <main className="flex min-h-[55vh] items-center justify-center bg-[#f5f7f4] px-5">
        <div className="max-w-lg rounded-[1rem] border-l-4 border-[#139C48] bg-white p-8">
          <p className="text-xl font-bold tracking-tight text-[#171b25]">
            {locale === "vi" ? "Không tìm thấy chương trình này" : "This program could not be found"}
          </p>
          <Link
            href={programsBasePath(locale)}
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#139C48] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0F7E3A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
          >
            {t("viewAll")}
          </Link>
        </div>
      </main>
    );
  }

  const title = localizedProgramText(locale, program.nameVi, program.nameEn);
  const descriptionHtml = localizedProgramText(
    locale,
    program.descriptionVi,
    program.descriptionEn,
  );
  const description = stripProgramHtml(descriptionHtml);
  const hasContent =
    program.content &&
    Object.keys(program.content as Record<string, unknown>).length > 0;
  const banner =
    program.banner ||
    programImage(program) ||
    slugLevelContent.hero.fallbackImage;
  const experienceImages = [
    levelContent.heroImage,
    "/assets/biotech/biotechnology-microscope.jpg",
    "/assets/biotech/students-alumni-graduation-pinterest.jpg",
    "/assets/biotech/environment-food-data-lab.jpg",
  ];

  return (
    <main className="overflow-hidden bg-[#fcfcfa] text-[#101411]">
      <section className="pb-10 pt-8 lg:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(17rem,0.5fr)] lg:items-end lg:gap-14"
          >
            <div>
              <h1 className="max-w-[12ch] text-[clamp(3.5rem,8vw,7.6rem)] font-semibold leading-[1.02] tracking-[-0.075em] text-balance">
                {title}
              </h1>
            </div>

            <aside className="border-l border-[#d7dbd5] pl-6 lg:mb-2 lg:pl-8">
              <p className="max-w-sm text-sm font-medium leading-6 text-[#303833]">
                {description || levelContent.heroTagline}
              </p>
              <a
                href="https://tuyensinh.ttu.edu.vn"
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex min-h-10 items-center gap-3 rounded-full border border-[#bfc6bf] px-4 text-xs font-semibold transition-colors hover:border-[#0a7b3e] hover:bg-[#0a7b3e] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0a7b3e]"
              >
                {slugPage.shared.hero.applyLabel ||
                  programPage.shared.applyLabel}
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </aside>
          </motion.div>

          <motion.figure
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 overflow-hidden rounded-[1.15rem] bg-[#e6e9e3]"
          >
            <img
              src={banner}
              alt={title}
              className="aspect-[16/8.2] min-h-[20rem] w-full object-cover sm:aspect-[16/7]"
            />
          </motion.figure>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {keyFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={`flex min-h-36 flex-col justify-between rounded-[1.35rem] p-5 sm:p-6 ${
                  index === 0
                    ? "bg-[#139C48] text-white"
                    : "border border-[#D6E5E0] bg-white text-[#12312B]"
                }`}
              >
                <p
                  className={`text-[0.58rem] font-semibold uppercase tracking-[0.15em] ${
                    index === 0 ? "text-white/70" : "text-[#60756F]"
                  }`}
                >
                  {fact.label}
                </p>
                <p className="mt-8 max-w-[18rem] text-lg font-semibold leading-6 tracking-[-0.03em]">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section
        id="program-overview"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.header
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true }}
            className="border-b border-[#d9ddd7] pb-5"
          >
            <h2 className="text-[clamp(2.25rem,4vw,4rem)] font-semibold leading-none tracking-[-0.055em]">
              {programPage.shared.overview.title}
            </h2>
          </motion.header>

          <div className="mt-7 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
            <div>
              <p className="text-sm leading-6 text-[#69716b]">
                {programPage.shared.overview.description}
              </p>
            </div>

            <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-12">
              {programPage.shared.overview.points.slice(0, 4).map((point, index) => {
                const spans = [
                  "lg:col-span-8",
                  "lg:col-span-4",
                  "lg:col-span-4",
                  "lg:col-span-8",
                ];
                const ratios = [
                  "aspect-[16/8.5]",
                  "aspect-[4/3]",
                  "aspect-[4/3]",
                  "aspect-[16/7]",
                ];

                return (
                  <motion.figure
                    key={point}
                    initial="hidden"
                    whileInView="visible"
                    variants={reveal}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.04 }}
                    className={`${spans[index]} border-l border-[#d9ddd7] pl-3`}
                  >
                    <img
                      src={experienceImages[index]}
                      alt={point}
                      className={`${ratios[index]} w-full rounded-[0.8rem] object-cover`}
                    />
                    <figcaption className="mt-3">
                      <span className="max-w-[28rem] text-sm font-semibold leading-5">
                        {point}
                      </span>
                    </figcaption>
                  </motion.figure>
                );
              })}
            </div>
          </div>

          {hasContent && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={reveal}
              viewport={{ once: true }}
              className="mt-24 grid gap-8 border-t border-[#d9ddd7] pt-7 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14"
            >
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#0a7b3e]">
                  {slugPage.shared.overview.title}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#69716b]">
                  {slugPage.shared.overview.description}
                </p>
              </div>
              <YooptaRenderer
                value={program.content}
                className="max-w-4xl [&_h1]:tracking-[-0.04em] [&_h1]:text-[#101411] [&_h2]:tracking-[-0.035em] [&_h2]:text-[#101411] [&_h3]:text-[#101411] [&_p]:text-base [&_p]:leading-8 [&_p]:text-[#535c55]"
              />
            </motion.div>
          )}

          <div className="mt-20 border-b border-[#C9CEC8]">
            {slugPage.shared.overview.sections.map((section, sectionIndex) => (
              <motion.article
                key={section.title}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.05 }}
                className="grid gap-10 border-t border-[#C9CEC8] py-10 sm:py-12 lg:grid-cols-12 lg:gap-8"
              >
                <header className="lg:col-span-4">
                  <span className="font-mono text-[2.75rem] font-medium leading-none tracking-[-0.08em] text-[#B8CDC0]">
                    0{sectionIndex + 1}
                  </span>
                  <h3 className="mt-7 max-w-[14ch] text-[clamp(1.75rem,2.8vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-[#12312B]">
                    {section.title}
                  </h3>
                </header>
                <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-start-6 lg:col-span-7">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-4 border-t border-[#D9DDD7] py-5 text-sm leading-6 text-[#58615A]"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.6rem] size-1.5 shrink-0 bg-[#139C48]"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="curriculum"
        className="scroll-mt-24 bg-[#F4F6F2] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.header
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true }}
            className="grid gap-8 border-b border-[#AEB6AD] pb-8 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-8">
              <h2 className="max-w-[12ch] text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.065em] text-[#101411]">
                {slugPage.shared.curriculum.title}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#616A63] lg:col-start-9 lg:col-span-4">
              {slugPage.shared.curriculum.description}
            </p>
          </motion.header>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#60756F] lg:col-span-3">
              {copy.curriculumIndex}
            </p>
            {curriculums.length > 0 ? (
              <div className="border-t border-[#AEB6AD] lg:col-start-4 lg:col-span-9">
                {curriculums.map((curriculum, index) => {
                  const curriculumName = localizedProgramText(
                    locale,
                    curriculum.nameVi,
                    curriculum.nameEn,
                  );
                  return (
                    <motion.div
                      key={curriculum.curriculumId}
                      initial="hidden"
                      whileInView="visible"
                      variants={reveal}
                      viewport={{ once: true, margin: "-40px" }}
                    >
                      <Link
                        href={curriculumDetailHref(
                          locale,
                          program,
                          curriculum,
                        )}
                        aria-label={`${copy.viewCurriculum}: ${curriculumName}`}
                        className="group grid gap-7 border-b border-[#C9CEC8] py-8 transition-colors hover:text-[#0A7B3E] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A7B3E] lg:grid-cols-[3rem_minmax(15rem,1fr)_minmax(22rem,1.15fr)_1.5rem] lg:items-center"
                      >
                        <span className="font-mono text-2xl font-medium tracking-[-0.08em] text-[#9BB6A7]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-lg font-semibold leading-6 tracking-[-0.025em] text-[#12312B] transition-colors group-hover:text-[#0A7B3E]">
                          {curriculumName}
                        </h3>
                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                          {[
                            [copy.year, curriculum.year],
                            [
                              copy.duration,
                              curriculum.durationYears
                              ? `${curriculum.durationYears} ${
                                  locale === "vi" ? "năm" : "years"
                                }`
                              : "—",
                            ],
                            [copy.credits, curriculum.totalCredits || "—"],
                            [copy.semesters, curriculum.totalSemesters || "—"],
                          ].map(([label, value]) => (
                            <div key={label}>
                              <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-[#789087]">
                                {label}
                              </span>
                              <span className="mt-2 block text-xs font-semibold text-[#12312B]">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                        <HugeiconsIcon
                          icon={ArrowUpRight01Icon}
                          size={18}
                          className="text-[#0A7B3E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <p className="border-y border-[#C9CEC8] py-8 text-sm text-[#697169] lg:col-start-4 lg:col-span-9">
                {slugPage.shared.curriculum.placeholder}
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        id="career"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <header className="grid gap-8 border-b border-[#bfc5be] pb-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <h2 className="max-w-[13ch] text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[1.08] tracking-[-0.065em] text-balance">
                {programPage.shared.career.title}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#616a63]">
              {levelContent.heroTagline}
            </p>
          </header>

          <div>
            {programPage.shared.career.points.map((point, index) => (
              <motion.article
                key={point}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="grid gap-5 border-b border-[#d9ddd7] py-7 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(12rem,0.45fr)] sm:items-start"
              >
                <span className="text-[0.65rem] font-semibold text-[#0a7b3e]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="max-w-2xl text-lg font-semibold leading-7 tracking-[-0.025em]">
                  {point}
                </p>
                <p className="text-xs leading-5 text-[#747c76]">
                  {copy.outcome} · {levelLabel}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {relatedPrograms.length > 0 && (
        <section className="bg-[#f1f3ee] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="max-w-[14ch] text-[clamp(2.3rem,4vw,4rem)] font-semibold leading-[1] tracking-[-0.055em]">
              {t("exploreOtherPrograms")}
            </h2>
            <div className="mt-8 border-t border-[#aeb6ad]">
              {relatedPrograms.slice(0, 4).map((relatedProgram, index) => (
                <Link
                  key={relatedProgram.programId}
                  href={programDetailHref(locale, relatedProgram)}
                  className="group grid gap-4 border-b border-[#cbd0ca] py-6 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0a7b3e] sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center"
                >
                  <span className="text-[0.62rem] font-semibold text-[#0a7b3e]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-semibold tracking-[-0.02em] transition-colors group-hover:text-[#0a7b3e]">
                    {localizedProgramText(
                      locale,
                      relatedProgram.nameVi,
                      relatedProgram.nameEn,
                    )}
                  </span>
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={18}
                    className="text-[#0a7b3e] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <EditorialCta
        title={copy.apply}
        description={copy.advice}
        primaryLabel={copy.apply}
        primaryHref="https://www.facebook.com/biotech.ttu.edu.vn"
        secondaryLabel={t("viewAll")}
        secondaryHref={programsBasePath(locale)}
      />
    </main>
  );
}
