"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { api, type Program } from "@/lib/api";
import {
  localizedProgramText,
  normalizeProgramLevel,
  programDetailHref,
  programImage,
  programLevelPath,
  programsBasePath,
  type SiteLocale,
} from "@/lib/program-pages";

import { ArrowIcon } from "@/components/icons/ArrowIcon";

const fallbackPrograms: Program[] = [
  {
    programId: "fallback-biotechnology",
    contentId: "fallback-biotechnology-content",
    code: "CNSH",
    nameVi: "Cử nhân Công nghệ Sinh học",
    nameEn: "Bachelor of Biotechnology",
    level: "undergraduate",
    majorCode: "7420201",
    banner: "/assets/biotech/program-biotechnology-lab.webp",
    status: "active",
    slugVi: "cong-nghe-sinh-hoc",
    slugEn: "biotechnology",
    content: {},
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    programId: "fallback-applied-biology",
    contentId: "fallback-applied-biology-content",
    code: "SHUD",
    nameVi: "Cử nhân Sinh học ứng dụng",
    nameEn: "Bachelor of Applied Biology",
    level: "undergraduate",
    majorCode: "7420203",
    banner: "/assets/biotech/program-applied-biology-tissue-culture.webp",
    status: "active",
    slugVi: "sinh-hoc-ung-dung",
    slugEn: "applied-biology",
    content: {},
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

const ProgramsPageLoading = () => (
  <main className="min-h-screen animate-pulse bg-white px-5 py-12 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="h-28 max-w-2xl bg-[#f1f1ef]" />
      <div className="mt-12 aspect-[16/7] rounded-[1.5rem] bg-[#f1f1ef]" />
      <div className="mt-28 h-10 w-52 bg-[#f1f1ef]" />
      <div className="mt-6 h-64 border-y border-[#deded9] bg-[#f7f7f5]" />
    </div>
  </main>
);

export default function ProgramsPageContent({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("programs");
  const reduceMotion = useReducedMotion();
  const featureItems = t.raw("features") as Array<{
    title: string;
    description: string;
  }>;
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api.programs
      .findAll({ status: "active" })
      .then((data) => {
        if (active) setPrograms(data.length > 0 ? data : fallbackPrograms);
      })
      .catch((fetchError) => {
        console.error("Failed to fetch programs:", fetchError);
        if (active) setPrograms(fallbackPrograms);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const selectedProgram =
    programs.find(({ programId }) => programId === selectedProgramId) ??
    programs[0];
  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const copy =
    locale === "vi"
      ? {
          pageTitleLead: "Chương trình",
          pageTitleAccent: "đào tạo",
          heroIntro:
            "Khám phá các chương trình đào tạo gắn với khoa học sự sống, thực hành phòng thí nghiệm và nghiên cứu ứng dụng.",
          heroPrimaryAction: "Xem các chương trình",
          heroSecondaryAction: "Thông tin tuyển sinh",
          directoryTitle: "Các chương trình",
          directoryIntro:
            "Chọn một ngành học để xem định hướng đào tạo, nền tảng chuyên môn và lộ trình phù hợp với mục tiêu của bạn.",
          programIndex: "Danh mục ngành học",
          pathways: "Bậc đào tạo",
          undergraduateDescription:
            "Nền tảng khoa học sự sống, kỹ năng phòng thí nghiệm và tư duy ứng dụng.",
          graduateDescription:
            "Nghiên cứu chuyên sâu, phương pháp khoa học và chuyển giao tri thức.",
          learningEnvironment: "Môi trường học tập",
          learningEnvironmentDescription:
            "Học tập trong không gian thực hành, nghiên cứu và hợp tác đa ngành.",
          laboratory: "Phòng thí nghiệm",
          laboratoryDescription:
            "Tiếp cận thiết bị, quy trình và các bài toán thực tế của công nghệ sinh học.",
          viewProgram: "Xem chương trình",
          explore: "Khám phá ngành học",
        }
      : {
          pageTitleLead: "Academic",
          pageTitleAccent: "programs",
          heroIntro:
            "Explore academic pathways grounded in life sciences, laboratory practice and applied research.",
          heroPrimaryAction: "View programs",
          heroSecondaryAction: "Admissions information",
          directoryTitle: "Programs",
          directoryIntro:
            "Choose a field of study to review its academic direction, subject foundations and the pathway that fits your goals.",
          programIndex: "Program directory",
          pathways: "Study levels",
          undergraduateDescription:
            "Life-science foundations, laboratory skills and an applied mindset.",
          graduateDescription:
            "Advanced research, scientific methods and knowledge transfer.",
          learningEnvironment: "Learning environment",
          learningEnvironmentDescription:
            "Learn through practical work, research and interdisciplinary collaboration.",
          laboratory: "Laboratory learning",
          laboratoryDescription:
            "Work with biotechnology equipment, processes and real-world challenges.",
          viewProgram: "View program",
          explore: "Explore programs",
        };

  if (loading) return <ProgramsPageLoading />;

  return (
    <main className="bg-white text-[#101110]">
      <section className="px-5 pb-16 pt-16 sm:px-8 md:pb-24 md:pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h1 className="max-w-[11ch] text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.065em] lg:col-span-7">
              <span className="block">{copy.pageTitleLead}</span>
              <span className="block">{copy.pageTitleAccent}</span>
            </h1>

            <div className="max-w-md lg:col-span-4 lg:col-start-9 lg:pb-2">
              <p className="text-[0.82rem] leading-7 text-[#58635b]">
                {copy.heroIntro}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#program-directory"
                  className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-[#1f5d3d] py-1.5 pl-5 pr-1.5 text-[0.68rem] font-semibold text-white transition-colors hover:bg-[#14733a]"
                >
                  {copy.heroPrimaryAction}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1f5d3d]">
                    <ArrowIcon direction="down" size={13} />
                  </span>
                </a>
                <a
                  href="https://tuyensinh.ttu.edu.vn"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-[#c9d8cd] py-1.5 pl-5 pr-1.5 text-[0.68rem] font-semibold text-[#285c3c] transition-colors hover:border-[#14733a] hover:bg-[#edf5ef]"
                >
                  {copy.heroSecondaryAction}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf5ef] text-[#1f5d3d]">
                    <ArrowIcon direction="up-right" size={13} />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#edf2ed] sm:aspect-[16/8] lg:aspect-[16/7]">
            <Image
              src="/assets/biotech/students-biotech-lab-ttu.jpg"
              alt={t("badge")}
              fill
              priority
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </section>

      <section
        id="program-directory"
        className="scroll-mt-24 px-5 py-16 sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-[clamp(2rem,3.2vw,3.4rem)] font-semibold leading-none tracking-[-0.05em]">
            {copy.directoryTitle}
          </h2>

          <div className="mt-5 grid gap-8 border-t border-[#dbe4dc] pt-4 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
            <p className="max-w-[13rem] text-[0.72rem] leading-[1.45] text-[#58635b]">
              {copy.directoryIntro}
            </p>

            <div>
              {selectedProgram && (
                <div className="grid gap-7 bg-[#1f5d3d] px-5 py-5 text-white sm:grid-cols-[minmax(12rem,0.75fr)_minmax(16rem,1.25fr)] sm:px-7">
                  <div>
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/55">
                      {selectedProgram.majorCode || selectedProgram.code}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.035em]">
                      {localizedProgramText(
                        locale,
                        selectedProgram.nameVi,
                        selectedProgram.nameEn,
                      )}
                    </h3>
                  </div>
                  <div>
                    <p className="max-w-[42rem] text-[0.72rem] leading-6 text-white/70">
                      {localizedProgramText(
                        locale,
                        selectedProgram.descriptionVi,
                        selectedProgram.descriptionEn,
                      ) || t("programsSubtitle")}
                    </p>
                    <Link
                      href={
                        selectedProgram.programId.startsWith("fallback-")
                          ? `${programsBasePath(locale)}/${programLevelPath(
                              locale,
                              normalizeProgramLevel(selectedProgram.level),
                            )}`
                          : programDetailHref(locale, selectedProgram)
                      }
                      className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                    >
                      {copy.viewProgram}
                      <ArrowIcon direction="up-right" size={13} />
                    </Link>
                  </div>
                </div>
              )}

              <div className="border-b border-[#dbe4dc]">
                {programs.map((program) => {
                  const selected = program.programId === selectedProgram?.programId;
                  return (
                    <button
                      key={program.programId}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSelectedProgramId(program.programId)}
                      className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-5 border-t border-[#dbe4dc] py-2 text-left transition-colors hover:text-[#14733a]"
                    >
                      <span className="text-[0.83rem] font-semibold">
                        {localizedProgramText(
                          locale,
                          program.nameVi,
                          program.nameEn,
                        )}
                      </span>
                      <span className="flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-[#6b786e]">
                        {program.majorCode || program.code}
                        <ArrowIcon
                          direction={selected ? "up" : "right"}
                          size={12}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-16 sm:px-8 md:pb-32 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-[clamp(2rem,3.2vw,3.4rem)] font-semibold leading-none tracking-[-0.05em]">
            {copy.programIndex}
          </h2>

          <div className="mt-5 border-t border-[#dbe4dc]">
            <div className="grid md:grid-cols-12">
              {programs.slice(0, 2).map((program, index) => {
                const title = localizedProgramText(
                  locale,
                  program.nameVi,
                  program.nameEn,
                );
                const href = program.programId.startsWith("fallback-")
                  ? `${programsBasePath(locale)}/${programLevelPath(
                      locale,
                      normalizeProgramLevel(program.level),
                    )}`
                  : programDetailHref(locale, program);

                return (
                  <article
                    key={program.programId}
                    className={`${
                      index === 0
                        ? "md:col-span-4 md:pr-3"
                        : "md:col-span-5 md:border-l md:px-3"
                    } border-[#dbe4dc] py-3`}
                  >
                    <Link href={href} className="group block">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-[1rem] bg-[#edf2ed]">
                        <Image
                          src={programImage(program)}
                          alt={title}
                          fill
                          sizes="(min-width: 768px) 42vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-semibold leading-tight tracking-[-0.03em] group-hover:text-[#14733a]">
                        {title}
                      </h3>
                      <p className="mt-2 max-w-[37rem] text-[0.67rem] leading-[1.5] text-[#667168]">
                        {localizedProgramText(
                          locale,
                          program.descriptionVi,
                          program.descriptionEn,
                        ) || t("programsSubtitle")}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#c9d8cd] px-4 py-2 text-[0.62rem] font-medium text-[#285c3c] transition-colors group-hover:border-[#14733a] group-hover:bg-[#edf5ef] group-hover:text-[#14733a]">
                        {copy.viewProgram}
                        <ArrowIcon direction="right" size={12} />
                      </span>
                    </Link>
                  </article>
                );
              })}

              <aside className="border-[#dbe4dc] py-3 md:col-span-3 md:border-l md:pl-3">
                <p className="text-lg font-semibold tracking-[-0.03em]">
                  {copy.pathways}
                </p>
                <p className="mt-2 text-[0.67rem] leading-[1.5] text-[#667168]">
                  {t("subtitle")}
                </p>
                {(["undergraduate", "graduate"] as const).map((level) => (
                  <Link
                    key={level}
                    href={`${programsBasePath(locale)}/${programLevelPath(
                      locale,
                      level,
                    )}`}
                    className="group mt-5 flex items-center justify-between border-t border-[#dbe4dc] pt-3 text-sm font-semibold hover:text-[#14733a]"
                  >
                    {level === "undergraduate"
                      ? t("undergraduate")
                      : t("graduate")}
                    <ArrowIcon direction="right" size={12} />
                  </Link>
                ))}
              </aside>
            </div>

            <div className="grid border-t border-[#dbe4dc] md:grid-cols-12">
              <article className="py-3 md:col-span-6 md:pr-3">
                <div className="relative aspect-[16/7] overflow-hidden rounded-[1rem] bg-[#edf2ed]">
                  <Image
                    src="/assets/biotech/students-biotech-lab-ttu.jpg"
                    alt={copy.learningEnvironment}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em]">
                  {copy.learningEnvironment}
                </h3>
                <p className="mt-2 max-w-[37rem] text-[0.67rem] leading-[1.5] text-[#667168]">
                  {copy.learningEnvironmentDescription}
                </p>
              </article>

              <article className="border-[#dbe4dc] py-3 md:col-span-3 md:border-l md:px-3">
                <h3 className="text-lg font-semibold tracking-[-0.03em]">
                  {featureItems[0]?.title}
                </h3>
                <p className="mt-2 text-[0.67rem] leading-[1.5] text-[#667168]">
                  {featureItems[0]?.description}
                </p>
                <a
                  href="https://tuyensinh.ttu.edu.vn"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#c9d8cd] px-4 py-2 text-[0.62rem] font-medium text-[#285c3c] hover:border-[#14733a] hover:bg-[#edf5ef] hover:text-[#14733a]"
                >
                  {copy.explore}
                  <ArrowIcon direction="right" size={12} />
                </a>
              </article>

              <article className="border-[#dbe4dc] py-3 md:col-span-3 md:border-l md:pl-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1rem] bg-[#edf2ed]">
                  <Image
                    src="/assets/biotech/environment-food-data-lab.jpg"
                    alt={copy.laboratory}
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em]">
                  {copy.laboratory}
                </h3>
                <p className="mt-2 text-[0.67rem] leading-[1.5] text-[#667168]">
                  {copy.laboratoryDescription}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
