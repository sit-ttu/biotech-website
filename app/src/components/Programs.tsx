"use client";

import { FlaskConical, GraduationCap, Microscope } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { api } from "@/lib/api";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import SectionTab from "@/components/SectionTab";

type ProgramItem = {
  title: string;
  code: string;
  description: string;
  slug?: string;
  level?: string;
  banner?: string;
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const Programs = () => {
  const t = useTranslations("programs");
  const tNav = useTranslations("header.navigation");
  const locale = useLocale();
  const [programs, setPrograms] = useState<ProgramItem[]>([]);

  const fallbackPrograms = (): ProgramItem[] => {
    const result: ProgramItem[] = [];
    const source = t.raw("programs") as Record<
      string,
      Record<string, { programs?: ProgramItem[] }>
    >;
    Object.entries(source).forEach(([level, categories]) => {
      Object.values(categories).forEach((category) => {
        category.programs?.forEach((program) =>
          result.push({ ...program, level }),
        );
      });
    });
    return result;
  };

  useEffect(() => {
    api.programs
      .findAll({ status: "active" })
      .then((data) => {
        const formatted = data.map((item) => ({
          title: locale === "vi" ? item.nameVi : item.nameEn || item.nameVi,
          code: item.code,
          description:
            locale === "vi"
              ? item.descriptionVi || ""
              : item.descriptionEn || item.descriptionVi || "",
          slug: locale === "vi" ? item.slugVi : item.slugEn || item.slugVi,
          level: item.level,
          banner: item.banner,
        }));
        setPrograms(formatted.length ? formatted.slice(0, 4) : fallbackPrograms());
      })
      .catch(() => setPrograms(fallbackPrograms()));
    // i18n fallback is intentionally recalculated when locale changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const indexHref =
    locale === "vi" ? `/${locale}/chuong-trinh-dao-tao` : `/${locale}/programs`;
  const programHref = (program: ProgramItem) => {
    if (!program.slug || !program.level) return indexHref;
    if (locale === "vi") {
      const level =
        program.level === "undergraduate" ? "dai-hoc" : "sau-dai-hoc";
      return `/${locale}/chuong-trinh-dao-tao/${level}/${program.slug}`;
    }
    return `/${locale}/programs/${program.level}/${program.slug}`;
  };
  const featureIcons = [FlaskConical, Microscope, GraduationCap];

  return (
    <section className="relative bg-[#F8FAF7] py-16 sm:py-20">
      <SectionTab label={tNav("programs")} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#12312B] sm:text-5xl"
          >
            {t("title")}
            <span className="mt-1 block text-[#16856F]">
              {t("titleHighlight")}
            </span>
          </motion.h2>
          <p className="max-w-xl text-sm leading-7 text-[#60756F] lg:justify-self-end">
            {t("programsSubtitle")}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {programs.map((program, index) => (
            <Link
              key={`${program.title}-${index}`}
              href={programHref(program)}
              className="group relative min-h-[24rem] overflow-hidden rounded-[1.75rem] bg-[#12312B]"
            >
              <img
                src={
                  program.banner ||
                  (index === 0
                    ? "/assets/biotech/hero-biotechnology.png"
                    : "/assets/biotech/research-biotechnology.png")
                }
                alt={program.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071E1A] via-[#071E1A]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#75D2BC]">
                      {program.code || t("undergraduate")}
                    </span>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                      {program.title}
                    </h3>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#16856F]">
                    <ArrowIcon direction="up-right" size={17} />
                  </span>
                </div>
                <p className="mt-4 line-clamp-2 max-w-lg text-xs leading-6 text-white/70">
                  {stripHtml(program.description)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {featureIcons.map((Icon, index) => (
            <div
              key={index}
              className="rounded-[1.35rem] border border-[#D6E5E0] bg-white p-6"
            >
              <Icon className="h-8 w-8 text-[#16856F]" strokeWidth={1.5} />
              <h3 className="mt-6 text-base font-semibold text-[#12312B]">
                {t(`features.${index}.title`)}
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#60756F]">
                {t(`features.${index}.description`)}
              </p>
            </div>
          ))}
        </div>

        <Link
          href={indexHref}
          className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#16856F] px-6 text-sm font-semibold text-white hover:bg-[#0D5E50]"
        >
          {t("viewAll")}
          <ArrowIcon direction="right" size={16} />
        </Link>
      </div>
    </section>
  );
};

export default Programs;
