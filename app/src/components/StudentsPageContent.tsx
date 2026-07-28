"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import EditorialCta from "@/components/EditorialCta";
import { api, type Achievement, type News } from "@/lib/api";
import type { SiteLocale } from "@/lib/program-pages";

type SupportService = {
  title: string;
  description: string;
};

type AchievementFallback = {
  number: string;
  label: string;
};

type StoryFallback = {
  name: string;
  program: string;
  quote: string;
};

export default function StudentsPageContent({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("students");
  const reduceMotion = useReducedMotion();
  const [news, setNews] = useState<News[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    let active = true;

    Promise.allSettled([
      api.news.findAll(),
      api.achievements.findAll({ visibility: "PUBLIC", isHighlight: true }),
    ]).then(([newsResult, achievementResult]) => {
      if (!active) return;
      if (newsResult.status === "fulfilled") {
        setNews(
          newsResult.value
            .filter((item) => item.status === "published")
            .slice(0, 4),
        );
      }
      if (achievementResult.status === "fulfilled") {
        setAchievements(achievementResult.value.slice(0, 4));
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const supportServices = t.raw("supportServices") as SupportService[];
  const translatedAchievements = t.raw("achievementStats") as AchievementFallback[];
  const translatedStories = t.raw("testimonialsList") as StoryFallback[];
  const fallbackAchievements =
    translatedAchievements.length > 0
      ? translatedAchievements
      : locale === "vi"
        ? [
            { number: "02", label: "Chương trình đào tạo" },
            { number: "04", label: "Hướng nghiên cứu trọng điểm" },
            { number: "01", label: "Cộng đồng Biotech TTU" },
          ]
        : [
            { number: "02", label: "Academic programs" },
            { number: "04", label: "Priority research directions" },
            { number: "01", label: "Biotech TTU community" },
          ];
  const fallbackStories =
    translatedStories.length > 0
      ? translatedStories
      : locale === "vi"
        ? [
            {
              name: "Học tập tại Biotech TTU",
              program: "Thực hành gắn với kiến thức chuyên ngành",
              quote:
                "Sinh viên tiếp cận phòng thí nghiệm, hoạt động học thuật và những bài toán thực tế của khoa học sự sống.",
            },
            {
              name: "Cộng đồng sinh viên",
              program: "Kết nối qua dự án và trải nghiệm",
              quote:
                "Các hoạt động ngoại khóa tạo không gian để sinh viên hợp tác, chia sẻ và phát triển kỹ năng.",
            },
            {
              name: "Nghiên cứu & đổi mới",
              program: "Từ ý tưởng đến dự án ứng dụng",
              quote:
                "Sinh viên có cơ hội đồng hành cùng giảng viên trong các hướng nghiên cứu và đổi mới sáng tạo.",
            },
          ]
        : [
            {
              name: "Learning at Biotech TTU",
              program: "Hands-on learning grounded in science",
              quote:
                "Students connect laboratory practice, academic activities and real questions in the life sciences.",
            },
            {
              name: "Student community",
              program: "Connected through projects and experiences",
              quote:
                "Activities beyond the classroom create space to collaborate, share and develop practical skills.",
            },
            {
              name: "Research & innovation",
              program: "From ideas to applied projects",
              quote:
                "Students can work alongside faculty across research and innovation initiatives.",
            },
          ];
  const basePath = locale === "vi" ? "/vi/sinh-vien" : "/en/students";
  const newsBasePath = locale === "vi" ? "/vi/tin-tuc" : "/en/news";
  const copy =
    locale === "vi"
      ? {
          quickLinks: "Dành cho sinh viên",
          handbook: "Sổ tay sinh viên",
          activities: "Hoạt động",
          careers: "Việc làm & thực tập",
          alumni: "Cựu sinh viên",
          portfolio: "Portfolio sinh viên",
          supportBadge: "Đồng hành cùng bạn",
          supportTitle: "Nguồn lực cho từng chặng đường",
          supportDescription:
            "Từ ngày đầu nhập học đến khi bước vào nghề nghiệp, sinh viên luôn có một điểm tựa rõ ràng.",
          highlightsBadge: "Dấu ấn sinh viên",
          highlightsTitle: "Những cột mốc được tạo nên cùng nhau",
          storiesBadge: "Nhịp sống Biotech TTU",
          storiesTitle: "Câu chuyện mới từ cộng đồng",
          storiesDescription:
            "Hoạt động học thuật, trải nghiệm doanh nghiệp và những khoảnh khắc đáng nhớ tại Biotech TTU.",
          viewActivities: "Xem mọi hoạt động",
          viewNews: "Đọc câu chuyện",
          apply: "Nộp hồ sơ ngay",
          photoLabel: "Học tập · Kết nối · Trưởng thành",
        }
      : {
          quickLinks: "Student essentials",
          handbook: "Student handbook",
          activities: "Activities",
          careers: "Jobs & internships",
          alumni: "Alumni",
          portfolio: "Student Portfolios",
          supportBadge: "Here for your journey",
          supportTitle: "Resources for every stage",
          supportDescription:
            "From arrival to graduation and professional life, students have a clear place to turn.",
          highlightsBadge: "Student milestones",
          highlightsTitle: "Achievements built together",
          storiesBadge: "Life at Biotech TTU",
          storiesTitle: "New stories from our community",
          storiesDescription:
            "Academic activities, industry experiences and memorable moments across Biotech TTU.",
          viewActivities: "Explore all activities",
          viewNews: "Read the story",
          apply: "Apply now",
          photoLabel: "Learn · Connect · Grow",
        };

  const quickLinks = [
    {
      label: copy.handbook,
      href: `${basePath}/${locale === "vi" ? "so-tay" : "handbook"}`,
    },
    { label: copy.activities, href: `${basePath}/${locale === "vi" ? "hoat-dong" : "activities"}` },
    { label: copy.careers, href: `${basePath}/${locale === "vi" ? "viec-lam" : "jobs"}` },
    { label: copy.alumni, href: `${basePath}/${locale === "vi" ? "cuu-sinh-vien" : "alumni"}` },
    { label: copy.portfolio, href: `${basePath}/portfolio` },
  ];

  const achievementItems = useMemo(
    () =>
      achievements.length > 0
        ? achievements.map((achievement) => ({
            id: achievement.id,
            year: achievement.achievedYear?.toString() || "—",
            title: achievement.title,
            description: achievement.description,
            image: achievement.coverImage,
            meta: [achievement.rank, achievement.level].filter(Boolean).join(" · "),
          }))
        : fallbackAchievements.map((achievement, index) => ({
            id: `fallback-${index}`,
            year: achievement.number,
            title: achievement.label,
            description: undefined,
            image: undefined,
            meta: "",
          })),
    [achievements, fallbackAchievements],
  );

  const storyItems = useMemo(
    () =>
      news.length > 0
        ? news.map((item) => ({
            id: item.id,
            title: item.title,
            summary: item.summary || item.contentText || "",
            image: item.coverImage,
            href: `${newsBasePath}/${item.slug}`,
            meta: item.publishedAt
              ? new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
                  month: "short",
                  year: "numeric",
                }).format(new Date(item.publishedAt))
              : "Biotech TTU",
          }))
        : fallbackStories.map((story, index) => ({
            id: `fallback-${index}`,
            title: story.program,
            summary: story.quote,
            image:
              [
                "/assets/ttu/students-library-reading.jpg",
                "/assets/ttu/students-campus-learning.jpg",
                "/assets/biotech/biotech-hackathon-2026.jpg",
              ][index] || "/assets/ttu/students-campus-learning.jpg",
            href: `${basePath}/${locale === "vi" ? "hoat-dong" : "activities"}`,
            meta: story.name,
          })),
    [basePath, fallbackStories, locale, news, newsBasePath],
  );

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="overflow-hidden bg-white text-[#171b25]">
      <section className="border-b border-[#171b25]/15 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_32rem] lg:items-end lg:gap-16 lg:pb-20 lg:pt-14">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#777b77]">
              {t("badge")}
            </div>
            <h1 className="mt-7 max-w-[13ch] text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.06em] text-balance sm:text-[3.75rem] lg:text-[4.5rem]">
              {t("subtitle")}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#626661] sm:text-lg">{t("description")}</p>
            <a
              href="https://tuyensinh.ttu.edu.vn/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-12 items-center gap-4 rounded-full bg-[#139C48] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0F7E3A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
            >
              {copy.apply}
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} />
            </a>
          </motion.div>

          <motion.figure
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="relative min-h-[22rem] overflow-hidden rounded-[0.8rem] lg:min-h-[31rem]"
          >
            <img src="/assets/ttu/students-campus-learning.jpg" alt={t("title")} className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#171b25]/70 to-transparent" />
            <figcaption className="absolute inset-x-6 bottom-6 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white">
              {copy.photoLabel}
            </figcaption>
          </motion.figure>
        </div>

        <nav aria-label={copy.quickLinks} className="mx-auto grid max-w-7xl border-t border-[#d8d3ce] px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-5">
          {quickLinks.map((item, index) => {
            const classes = `group relative isolate flex min-h-28 cursor-pointer items-center justify-between gap-5 overflow-hidden border-b border-[#d8d3ce] px-3 py-6 transition-colors duration-300 hover:bg-[#fbf6f2] focus-visible:bg-[#fbf6f2] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#139C48] sm:px-5 lg:border-b-0 lg:border-r ${index === 0 ? "sm:pl-5" : ""} ${index === quickLinks.length - 1 ? "lg:border-r-0" : ""}`;
            const content = (
              <>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#139C48] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                <span className="relative">
                  <span className="font-mono text-[0.56rem] font-semibold tracking-[0.08em] text-[#139C48]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="mt-2.5 block text-base font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-[#139C48] group-focus-visible:text-[#139C48]">{item.label}</span>
                </span>
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#139C48]/35 bg-white text-[#139C48] transition-[background-color,color,border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-[#139C48] group-hover:bg-[#139C48] group-hover:text-white group-focus-visible:border-[#139C48] group-focus-visible:bg-[#139C48] group-focus-visible:text-white">
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </>
            );

            return (
              <Link key={item.label} href={item.href} className={classes}>{content}</Link>
            );
          })}
        </nav>
      </section>

      <section className="relative bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#139C48]">{copy.supportBadge}</p>
            <h2 className="mt-5 max-w-md text-[2.25rem] font-bold leading-[1.05] tracking-[-0.045em] sm:text-[3rem]">{copy.supportTitle}</h2>
            <p className="mt-6 max-w-md border-l-2 border-[#139C48] pl-5 text-sm leading-7 text-[#686c67]">{copy.supportDescription}</p>
          </div>

          <div className="border-t-2 border-[#171b25]">
            {supportServices.map((service, index) => (
              <motion.article
                key={service.title}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true, margin: "-40px" }}
                className="grid gap-4 border-b border-[#d8d3ce] py-7 sm:grid-cols-[3rem_minmax(0,1fr)]"
              >
                <span className="font-mono text-[0.64rem] font-semibold text-[#139C48]">{String(index + 1).padStart(2, "0")}</span>
                <div className="grid gap-3 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
                  <h3 className="text-lg font-bold leading-snug tracking-[-0.025em] sm:text-xl">{service.title}</h3>
                  <p className="text-sm leading-7 text-[#686c67]">{service.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#f5f7f4] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 border-b-2 border-[#171b25] pb-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#139C48]">{copy.highlightsBadge}</p>
              <h2 className="mt-4 max-w-xl text-[2.25rem] font-bold leading-tight tracking-[-0.045em] sm:text-[3rem]">{copy.highlightsTitle}</h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#686c67] lg:justify-self-end">{t("ctaDescription")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {achievementItems.slice(0, 4).map((achievement, index) => (
              <motion.article
                key={achievement.id}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true, margin: "-40px" }}
                className={`flex min-h-72 flex-col border-b border-[#d2ccc6] py-8 md:px-7 lg:border-b-0 lg:border-r ${index === 0 ? "md:pl-0" : ""} ${index === 3 ? "lg:border-r-0 lg:pr-0" : ""}`}
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="text-[2.8rem] font-bold leading-none tracking-[-0.06em] text-[#139C48]">{achievement.year}</span>
                  <span className="font-mono text-[0.56rem] text-[#98948f]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-auto pt-12 text-lg font-bold leading-snug tracking-[-0.025em]">{achievement.title}</h3>
                {achievement.description && <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#686c67]">{achievement.description}</p>}
                {achievement.meta && <p className="mt-5 font-mono text-[0.56rem] uppercase tracking-[0.1em] text-[#858984]">{achievement.meta}</p>}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 border-b-2 border-[#171b25] pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#139C48]">{copy.storiesBadge}</p>
              <h2 className="mt-4 text-[2.25rem] font-bold leading-tight tracking-[-0.045em] sm:text-[3rem]">{copy.storiesTitle}</h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#686c67]">{copy.storiesDescription}</p>
          </div>

          {storyItems.length > 0 && (
            <div className="grid gap-10 pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
              <Link href={storyItems[0].href} className="group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#eee9e4]">
                  <img src={storyItems[0].image || "/assets/biotech/research-biotechnology.png"} alt={storyItems[0].title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                  <span className="absolute left-5 top-5 bg-white px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#139C48]">{storyItems[0].meta}</span>
                </div>
                <h3 className="mt-6 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.035em] transition-colors group-hover:text-[#139C48] sm:text-3xl">{storyItems[0].title}</h3>
                {storyItems[0].summary && <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-7 text-[#686c67]">{storyItems[0].summary}</p>}
                <span className="mt-6 inline-flex items-center gap-3 border-b border-[#139C48] pb-1 text-sm font-semibold text-[#139C48]">{copy.viewNews}<HugeiconsIcon icon={ArrowUpRight01Icon} size={17} /></span>
              </Link>

              <div className="border-t-2 border-[#171b25]">
                {storyItems.slice(1, 4).map((story, index) => (
                  <Link key={story.id} href={story.href} className="group grid gap-4 border-b border-[#d8d3ce] py-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#139C48] sm:grid-cols-[3rem_1fr_2rem]">
                    <span className="font-mono text-[0.62rem] font-semibold text-[#139C48]">{String(index + 2).padStart(2, "0")}</span>
                    <div>
                      <p className="font-mono text-[0.56rem] uppercase tracking-[0.1em] text-[#858984]">{story.meta}</p>
                      <h3 className="mt-3 text-lg font-bold leading-snug tracking-[-0.025em] transition-colors group-hover:text-[#139C48]">{story.title}</h3>
                      {story.summary && <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#686c67]">{story.summary}</p>}
                    </div>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} className="justify-self-end text-[#139C48]" />
                  </Link>
                ))}
                <Link href={`${basePath}/${locale === "vi" ? "hoat-dong" : "activities"}`} className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-[#139C48] text-sm font-semibold text-[#139C48] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]">
                  {copy.viewActivities}
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <EditorialCta
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        primaryLabel={t("ctaPrimary")}
        primaryHref="https://tuyensinh.ttu.edu.vn/"
        secondaryLabel={t("ctaSecondary")}
        secondaryHref={`${basePath}/${locale === "vi" ? "so-tay" : "handbook"}`}
      />
    </main>
  );
}
