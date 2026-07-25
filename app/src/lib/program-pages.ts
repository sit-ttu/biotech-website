import type { Curriculum, Program } from "@/lib/api";

export type SiteLocale = "vi" | "en";
export type ProgramLevelKey = "undergraduate" | "graduate";

export const normalizeProgramLevel = (
  value?: string,
): ProgramLevelKey =>
  value === "graduate" ||
  value === "postgraduate" ||
  value === "sau-dai-hoc"
    ? "graduate"
    : "undergraduate";

export const apiProgramLevel = (level: ProgramLevelKey) =>
  level === "graduate" ? "postgraduate" : "undergraduate";

export const programsBasePath = (locale: SiteLocale) =>
  locale === "vi" ? "/vi/chuong-trinh-dao-tao" : "/en/programs";

export const programLevelPath = (
  locale: SiteLocale,
  level: ProgramLevelKey,
) => {
  if (locale === "vi") {
    return level === "graduate" ? "sau-dai-hoc" : "dai-hoc";
  }

  return level === "graduate" ? "postgraduate" : "undergraduate";
};

export const programDetailHref = (
  locale: SiteLocale,
  program: Pick<Program, "level" | "slugVi" | "slugEn">,
) => {
  const level = normalizeProgramLevel(program.level);
  const slug = locale === "vi" ? program.slugVi : program.slugEn || program.slugVi;

  return `${programsBasePath(locale)}/${programLevelPath(locale, level)}/${slug}`;
};

export const curriculumDetailHref = (
  locale: SiteLocale,
  program: Pick<Program, "level" | "slugVi" | "slugEn">,
  curriculum: Pick<Curriculum, "slugVi" | "slugEn">,
) => {
  const slug =
    locale === "vi"
      ? curriculum.slugVi
      : curriculum.slugEn || curriculum.slugVi;

  return `${programDetailHref(locale, program)}/${slug}`;
};

export const localizedProgramText = (
  locale: SiteLocale,
  vi?: string,
  en?: string,
) => (locale === "vi" ? vi : en || vi) || "";

export const stripProgramHtml = (html?: string) =>
  (html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();

export const programImage = (
  program: Pick<Program, "banner" | "nameVi" | "nameEn" | "code">,
) => {
  if (program.banner) return program.banner;

  return "/assets/biotech/research-biotechnology.png";
};
