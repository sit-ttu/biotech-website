"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { api, type Curriculum, type Program } from "@/lib/api";
import { ModalSearchGlobal } from "./ModalSearchGlobal";

type HeaderLink = {
  label: string;
  href: string;
  external?: boolean;
};

type MegaMenuCardItem = HeaderLink & {
  id: string;
  image: string;
};

function MenuLink({
  link,
  onClick,
  className = "",
}: {
  link: HeaderLink;
  onClick?: () => void;
  className?: string;
}) {
  const styles = `group/link flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm font-medium text-[#363a36] transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-0.5 hover:bg-[#139C48]/8 hover:text-[#139C48] ${className}`;

  return link.external ? (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={styles}
    >
      {link.label}
      <span className="text-xs text-[#a3a6a3] transition-colors group-hover/link:text-[#139C48]">
        ↗
      </span>
    </a>
  ) : (
    <Link href={link.href} onClick={onClick} className={styles}>
      {link.label}
      <span className="text-xs text-[#a3a6a3] transition-colors group-hover/link:text-[#139C48]">
        →
      </span>
    </Link>
  );
}

function MegaMenuCards({ items }: { items: MegaMenuCardItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const content = (
          <>
            <div className="aspect-[4/2.7] overflow-hidden bg-[#edf0ed]">
              <img
                src={item.image}
                alt={item.label}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.035]"
              />
            </div>
            <h3 className="mt-3 text-sm font-semibold leading-snug text-[#139C48] transition-colors group-hover/card:text-[#0F7E3A]">
              {item.label}
            </h3>
          </>
        );

        return item.external ? (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/card block"
          >
            {content}
          </a>
        ) : (
          <Link key={item.id} href={item.href} className="group/card block">
            {content}
          </Link>
        );
      })}
    </div>
  );
}

function DesktopDropdown({
  label,
  href,
  active,
  description,
  children,
  sideItems = [],
}: {
  label: string;
  href: string;
  active: boolean;
  description: string;
  children: React.ReactNode;
  sideItems?: HeaderLink[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsOpen(true);
  };
  const closeMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, 120);
  };

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  return (
    <div
      ref={rootRef}
      className="group"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocusCapture={openMenu}
      onBlurCapture={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <Link
        href={href}
        aria-expanded={isOpen}
        className={`relative flex items-center gap-1.5 py-3 text-sm font-semibold tracking-[-0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48] ${
          active ? "text-[#139C48]" : "text-[#4b4d4b] hover:text-[#139C48]"
        }`}
      >
        {label}
        <ChevronDown
          size={14}
          strokeWidth={1.7}
          className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        {active && (
          <span className="absolute bottom-1 left-0 h-0.5 w-full rounded-full bg-[#139C48]" />
        )}
      </Link>

      <div
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        className={`fixed left-1/2 top-[4rem] w-[min(80rem,100vw)] -translate-x-1/2 pt-5 transition-[opacity,transform,visibility] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="max-h-[72dvh] overflow-y-auto border-x border-b border-[#dfe4df] bg-white shadow-[0_18px_45px_-28px_rgba(25,45,31,0.32)]">
          <div className="grid min-h-[20rem] md:grid-cols-[16rem_1fr]">
            <div className="border-[#e1e5e1] bg-[#fafbfa] p-7 md:border-r">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#139C48]">
                {label}
              </p>
              <p className="mt-5 text-xs leading-5 text-[#747974]">
                {description}
              </p>
              {sideItems.length > 0 && (
                <div className="mt-6 space-y-1 border-t border-[#e1e5e1] pt-4">
                  {sideItems.map((item) => (
                    <MenuLink key={item.href} link={item} />
                  ))}
                </div>
              )}
              <Link
                href={href}
                className="mt-7 inline-flex items-center gap-3 border-b border-[#139C48] pb-1 text-xs font-semibold text-[#139C48]"
              >
                {label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="p-7 lg:p-9">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  const t = useTranslations("header");
  const tPrograms = useTranslations("programs");
  const pathname = usePathname();
  const localeSegment = pathname.split("/").filter(Boolean)[0];
  const locale = localeSegment === "en" ? "en" : "vi";
  const basePath = `/${locale}`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let active = true;

    Promise.all([
      api.programs.findAll({ status: "active" }),
      api.curriculums.findAll(),
    ])
      .then(([programData, curriculumData]) => {
        if (!active) return;
        setPrograms(programData);
        setCurriculums(curriculumData);
      })
      .catch((error) => console.error("Failed to fetch menu data", error));

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const paths = useMemo(
    () => ({
      about:
        locale === "vi"
          ? `${basePath}/gioi-thieu-chung`
          : `${basePath}/about-us`,
      news: locale === "vi" ? `${basePath}/tin-tuc` : `${basePath}/news`,
      programs:
        locale === "vi"
          ? `${basePath}/chuong-trinh-dao-tao`
          : `${basePath}/programs`,
      research:
        locale === "vi" ? `${basePath}/nghien-cuu` : `${basePath}/research`,
      students:
        locale === "vi" ? `${basePath}/sinh-vien` : `${basePath}/students`,
      faculty:
        locale === "vi" ? `${basePath}/giang-vien` : `${basePath}/faculty`,
      contact:
        locale === "vi" ? `${basePath}/lien-he` : `${basePath}/contact`,
    }),
    [basePath, locale],
  );

  const researchLinks = useMemo<HeaderLink[]>(
    () => [
      {
        label: t("navigation.researchOverview"),
        href: paths.research,
      },
      {
        label: t("navigation.scientificProjects"),
        href:
          locale === "vi"
            ? `${basePath}/nghien-cuu/de-tai-khoa-hoc`
            : `${basePath}/research/scientific-projects`,
      },
      {
        label: t("navigation.scientificPublications"),
        href:
          locale === "vi"
            ? `${basePath}/nghien-cuu/bai-bao-khoa-hoc`
            : `${basePath}/research/scientific-publications`,
      },
    ],
    [basePath, locale, paths.research, t],
  );

  const studentLinks = useMemo<HeaderLink[]>(
    () => [
      {
        label: t("navigation.studentsOverview"),
        href: paths.students,
      },
      {
        label: t("navigation.studentsAdmissions"),
        href: "https://tuyensinh.ttu.edu.vn/",
        external: true,
      },
      {
        label: t("navigation.studentsHandbook"),
        href:
          locale === "vi"
            ? `${basePath}/sinh-vien/so-tay`
            : `${basePath}/students/handbook`,
      },
      {
        label: t("navigation.studentsActivities"),
        href:
          locale === "vi"
            ? `${basePath}/sinh-vien/hoat-dong`
            : `${basePath}/students/activities`,
      },
      {
        label: t("navigation.studentsInternships"),
        href:
          locale === "vi"
            ? `${basePath}/sinh-vien/viec-lam`
            : `${basePath}/students/jobs`,
      },
      {
        label: t("navigation.studentsAlumni"),
        href:
          locale === "vi"
            ? `${basePath}/sinh-vien/cuu-sinh-vien`
            : `${basePath}/students/alumni`,
      },
    ],
    [basePath, locale, paths.students, t],
  );

  const aboutLinks = useMemo<HeaderLink[]>(
    () => [
      {
        label: locale === "vi" ? "Tổng quan về Khoa" : "School overview",
        href: paths.about,
      },
      {
        label: t("navigation.faculty"),
        href: paths.faculty,
      },
      {
        label: locale === "vi" ? "Thành tích nổi bật" : "Achievements",
        href:
          locale === "vi"
            ? `${basePath}/thanh-tich`
            : `${basePath}/achievements`,
      },
      {
        label: t("contactLink"),
        href: paths.contact,
      },
    ],
    [basePath, locale, paths.about, paths.contact, paths.faculty, t],
  );

  const aboutCards = useMemo<MegaMenuCardItem[]>(
    () => [
      {
        id: "about-overview",
        label: aboutLinks[0].label,
        href: aboutLinks[0].href,
        image: "/assets/ttu/menu/research-banner.jpg",
      },
      {
        id: "about-faculty",
        label: aboutLinks[1].label,
        href: aboutLinks[1].href,
        image: "/assets/ttu/menu/ttu-academic-campus.jpg",
      },
      {
        id: "about-achievements",
        label: aboutLinks[2].label,
        href: aboutLinks[2].href,
        image: "/assets/ttu/menu/international-cooperation-2026.jpg",
      },
      {
        id: "about-contact",
        label: aboutLinks[3].label,
        href: aboutLinks[3].href,
        image: "/assets/ttu/menu/campus-discovery.jpg",
      },
    ],
    [aboutLinks],
  );

  const newsCards = useMemo<MegaMenuCardItem[]>(
    () => [
      {
        id: "news-latest",
        label: locale === "vi" ? "Tin tức mới nhất" : "Latest news",
        href: paths.news,
        image: "/assets/ttu/menu/news-events.jpg",
      },
      {
        id: "news-academic",
        label: locale === "vi" ? "Hoạt động học thuật" : "Academic activities",
        href: paths.news,
        image: "/assets/ttu/menu/ttu-academic-campus.jpg",
      },
      {
        id: "news-cooperation",
        label: locale === "vi" ? "Hợp tác quốc tế" : "International cooperation",
        href: paths.news,
        image: "/assets/ttu/menu/international-cooperation-2026.jpg",
      },
      {
        id: "news-community",
        label: locale === "vi" ? "Đời sống TTU" : "Life at TTU",
        href: paths.news,
        image: "/assets/ttu/menu/students-at-ttu.jpg",
      },
    ],
    [locale, paths.news],
  );

  const researchCards = useMemo<MegaMenuCardItem[]>(
    () => [
      {
        id: "research-overview",
        ...researchLinks[0],
        image: "/assets/ttu/menu/research-banner.jpg",
      },
      {
        id: "research-projects",
        ...researchLinks[1],
        image: "/assets/biotech/biotech-hackathon-2026.jpg",
      },
      {
        id: "research-publications",
        ...researchLinks[2],
        image: "/assets/ttu/menu/graduate-learning.jpg",
      },
      {
        id: "research-cooperation",
        label: locale === "vi" ? "Hợp tác nghiên cứu" : "Research partnerships",
        href: paths.research,
        image: "/assets/ttu/menu/international-cooperation-2026.jpg",
      },
    ],
    [locale, paths.research, researchLinks],
  );

  const studentCards = useMemo<MegaMenuCardItem[]>(
    () => [
      {
        id: "students-overview",
        ...studentLinks[0],
        image: "/assets/ttu/menu/students-at-ttu.jpg",
      },
      {
        id: "students-admissions",
        ...studentLinks[1],
        image: "/assets/ttu/menu/academic-programs.jpg",
      },
      {
        id: "students-activities",
        ...studentLinks[3],
        image: "/assets/biotech/biotech-hackathon-2026.jpg",
      },
      {
        id: "students-alumni",
        ...studentLinks[5],
        image: "/assets/ttu/menu/undergraduate-academic-life.jpg",
      },
    ],
    [studentLinks],
  );

  const programSections = useMemo(() => {
    const levels = [
      { id: "undergraduate", label: tPrograms("undergraduate") },
      { id: "postgraduate", label: tPrograms("graduate") },
    ];

    return levels
      .map((level) => {
        const levelPrograms = programs
          .filter((program) => program.level === level.id)
          .map((program) => {
            const slug =
              locale === "vi"
                ? program.slugVi
                : program.slugEn || program.slugVi;
            const levelSlug =
              locale === "vi"
                ? program.level === "undergraduate"
                  ? "dai-hoc"
                  : "sau-dai-hoc"
                : program.level;
            const href =
              locale === "vi"
                ? `${basePath}/chuong-trinh-dao-tao/${levelSlug}/${slug}`
                : `${basePath}/programs/${levelSlug}/${slug}`;

            return {
              id: program.programId,
              label:
                locale === "vi"
                  ? program.nameVi
                  : program.nameEn || program.nameVi,
              href,
              image: program.banner,
              curriculums: curriculums
                .filter(
                  (curriculum) => curriculum.programId === program.programId,
                )
                .map((curriculum) => ({
                  id: curriculum.curriculumId,
                  label:
                    locale === "vi"
                      ? curriculum.nameVi
                      : curriculum.nameEn || curriculum.nameVi,
                  href: `${href}/${
                    locale === "vi"
                      ? curriculum.slugVi
                      : curriculum.slugEn || curriculum.slugVi
                  }`,
                })),
            };
          });

        return levelPrograms.length
          ? { id: level.id, label: level.label, programs: levelPrograms }
          : null;
      })
      .filter(
        (section): section is NonNullable<typeof section> => section !== null,
      );
  }, [basePath, curriculums, locale, programs, tPrograms]);

  const programCards = useMemo(() => {
    const fallbackImages = [
      "/assets/ttu/menu/students-at-ttu.jpg",
      "/assets/ttu/menu/academic-programs.jpg",
      "/assets/ttu/menu/graduate-learning.jpg",
      "/assets/biotech/biotech-hackathon-2026.jpg",
    ];
    const dynamicCards = programSections.flatMap((section) =>
      section.programs.map((program, index) => ({
        id: program.id,
        label: program.label,
        href: program.href,
        image: program.image || fallbackImages[index % fallbackImages.length],
      })),
    );

    if (dynamicCards.length > 0) return dynamicCards.slice(0, 4);

    return [
      {
        id: "undergraduate",
        label:
          locale === "vi"
            ? "Cử nhân Công nghệ Sinh học"
            : "Bachelor of Biotechnology",
        href:
          locale === "vi"
            ? `${basePath}/chuong-trinh-dao-tao/dai-hoc`
            : `${basePath}/programs/undergraduate`,
        image: fallbackImages[0],
      },
      {
        id: "applied-biology",
        label:
          locale === "vi" ? "Cử nhân Sinh học ứng dụng" : "Applied Biology",
        href: paths.programs,
        image: fallbackImages[1],
      },
      {
        id: "learning-outcomes",
        label:
          locale === "vi"
            ? "Chuẩn đầu ra chương trình"
            : "Program learning outcomes",
        href: paths.programs,
        image: fallbackImages[2],
      },
      {
        id: "research-led-learning",
        label:
          locale === "vi"
            ? "Học tập gắn với nghiên cứu"
            : "Research-led Learning",
        href: paths.programs,
        image: fallbackImages[3],
      },
    ];
  }, [basePath, locale, paths.programs, programSections]);

  const programMenuCategories = useMemo<HeaderLink[]>(
    () => [
      {
        label: locale === "vi" ? "Tất cả chương trình" : "All programs",
        href: paths.programs,
      },
      {
        label: tPrograms("undergraduate"),
        href:
          locale === "vi"
            ? `${basePath}/chuong-trinh-dao-tao/dai-hoc`
            : `${basePath}/programs/undergraduate`,
      },
    ],
    [basePath, locale, paths.programs, tPrograms],
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 border-b border-[#139C48]/15 bg-white/95 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-3 px-4 sm:h-[5.25rem] sm:px-8">
          <Link
            href={basePath}
            className="group min-w-0 shrink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
          >
            <img
              src="/assets/biotech/logo-biotech.png"
              alt={t("faculty")}
              className="h-8 w-auto max-w-[12.5rem] object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:h-10 sm:max-w-[15rem]"
            />
          </Link>

          <nav
            aria-label={t("menu")}
            className="mx-auto hidden items-center gap-5 xl:flex xl:gap-7"
          >
            <DesktopDropdown
              label={t("navigation.about")}
              href={paths.about}
              active={isActive(paths.about)}
              description={
                locale === "vi"
                  ? "Khám phá định hướng phát triển, đội ngũ và những dấu ấn của Khoa Công nghệ Sinh học."
                  : "Discover the School of Biotechnology, its faculty, direction and achievements."
              }
              sideItems={aboutLinks}
            >
              <MegaMenuCards items={aboutCards} />
            </DesktopDropdown>

            <DesktopDropdown
              label={t("navigation.news")}
              href={paths.news}
              active={isActive(paths.news)}
              description={
                locale === "vi"
                  ? "Theo dõi tin tức, sự kiện học thuật và các hoạt động nổi bật trong cộng đồng TTU."
                  : "Follow the latest news, academic events and highlights from the TTU community."
              }
              sideItems={[
                {
                  label:
                    locale === "vi" ? "Tất cả tin tức" : "Browse all news",
                  href: paths.news,
                },
              ]}
            >
              <MegaMenuCards items={newsCards} />
            </DesktopDropdown>

            <DesktopDropdown
              label={t("navigation.programs")}
              href={paths.programs}
              active={isActive(paths.programs)}
              description={t("programsDescription")}
              sideItems={programMenuCategories}
            >
              <MegaMenuCards items={programCards} />
            </DesktopDropdown>

            <DesktopDropdown
              label={t("navigation.research")}
              href={paths.research}
              active={isActive(paths.research)}
              description={t("researchDescription")}
              sideItems={researchLinks}
            >
              <MegaMenuCards items={researchCards} />
            </DesktopDropdown>

            <DesktopDropdown
              label={t("navigation.students")}
              href={paths.students}
              active={isActive(paths.students)}
              description={t("studentsDescription")}
              sideItems={studentLinks}
            >
              <MegaMenuCards items={studentCards} />
            </DesktopDropdown>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <a
              href="https://tuyensinh.ttu.edu.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-10 items-center rounded-full bg-[#139C48] px-4 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#0F7E3A] md:inline-flex"
            >
              {t("navigation.studentsAdmissions")}
            </a>
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#171b25]/15 text-[#424640] transition-colors hover:border-[#139C48] hover:bg-[#139C48] hover:text-white sm:h-10 sm:w-10"
              aria-label={t("search")}
            >
              <Search size={17} strokeWidth={1.7} />
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? t("close") : t("menu")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#139C48]/25 text-[#139C48] transition-colors hover:bg-[#139C48] hover:text-white xl:hidden"
            >
              {isMobileMenuOpen ? (
                <X size={17} strokeWidth={1.7} />
              ) : (
                <Menu size={17} strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-[#e5e9e5] bg-white xl:hidden"
            >
              <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-8">
                <MenuLink
                  link={{ label: t("navigation.about"), href: paths.about }}
                />
                <MenuLink
                  link={{ label: t("navigation.news"), href: paths.news }}
                />

                <details className="group/details border-t border-[#edf0ed] py-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold">
                    {t("navigation.programs")}
                    <ChevronDown
                      size={16}
                      className="transition-transform group-open/details:rotate-180"
                    />
                  </summary>
                  <div className="space-y-3 px-2 pb-3">
                    <MenuLink
                      link={{
                        label: t("navigation.programs"),
                        href: paths.programs,
                      }}
                    />
                    {programSections.map((section) => (
                      <div key={section.id} className="pl-3">
                        <p className="px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#8a8f8a]">
                          {section.label}
                        </p>
                        {section.programs.map((program) => (
                          <MenuLink
                            key={program.id}
                            link={{
                              label: program.label,
                              href: program.href,
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </details>

                <details className="group/details border-t border-[#edf0ed] py-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold">
                    {t("navigation.research")}
                    <ChevronDown
                      size={16}
                      className="transition-transform group-open/details:rotate-180"
                    />
                  </summary>
                  <div className="px-2 pb-3">
                    {researchLinks.map((link) => (
                      <MenuLink key={link.href} link={link} />
                    ))}
                  </div>
                </details>

                <details className="group/details border-t border-[#edf0ed] py-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold">
                    {t("navigation.students")}
                    <ChevronDown
                      size={16}
                      className="transition-transform group-open/details:rotate-180"
                    />
                  </summary>
                  <div className="px-2 pb-3">
                    {studentLinks.map((link) => (
                      <MenuLink key={link.href} link={link} />
                    ))}
                  </div>
                </details>

                <div className="grid grid-cols-2 gap-2 border-t border-[#edf0ed] pt-3">
                  <MenuLink
                    link={{ label: t("navigation.faculty"), href: paths.faculty }}
                  />
                  <MenuLink
                    link={{ label: t("contactLink"), href: paths.contact }}
                  />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 h-px bg-[#171b25]/5">
          <motion.div
            className="h-full origin-left bg-[#139C48]"
            style={{ scaleX }}
          />
        </div>
      </motion.header>

      <ModalSearchGlobal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default Header;
