"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight01Icon,
  Calendar03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import EditorialCta from "@/components/EditorialCta";
import { NewsVisual } from "@/components/NewsVisual";
import {
  api,
  type Achievement,
  type Event,
  type News,
  type Research,
  ResearchType,
} from "@/lib/api";
import { getMockAchievements, getMockResearch } from "@/lib/mock-content";
import { getCategoryDisplay } from "@/lib/news-categories";

import { ArrowIcon } from "@/components/icons/ArrowIcon";

type NewsItem = {
  title: string;
  date: string;
  category: string;
  summary: string;
  image?: string;
  slug?: string;
};

type EventItem = {
  id: string;
  title: string;
  date: string;
  description: string;
};

const formatDate = (date: string, locale: string) => {
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "";

  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
};

const prepareNewsData = (data: News[], locale: "vi" | "en") => {
  const sortedData = [...data].sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() -
      new Date(a.publishedAt || 0).getTime(),
  );
  const published = sortedData.filter((item) => item.status === "published");
  return published.map((item) => ({
    title: item.title,
    date: item.publishedAt ? formatDate(item.publishedAt, locale) : "",
    category: getCategoryDisplay(item.category || "general", locale),
    summary: item.summary || "",
    image: item.coverImage,
    slug: item.slug,
  }));
};

const prepareEventData = (data: Event[], locale: "vi" | "en") =>
  data.map((event) => ({
    id: event.id,
    title: locale === "en" ? event.titleEn || event.titleVi : event.titleVi,
    date: formatDate(event.startAt, locale),
    description:
      locale === "en"
        ? event.descriptionEn || event.descriptionVi || ""
        : event.descriptionVi || "",
  }));

export default function NewsPageContent({
  locale,
  initialItems,
  initialEvents,
  initialResearch,
  initialAchievements,
}: {
  locale: "vi" | "en";
  initialItems?: News[];
  initialEvents?: Event[];
  initialResearch?: Research[];
  initialAchievements?: Achievement[];
}) {
  const t = useTranslations("news");
  const reduceMotion = useReducedMotion();
  const fallbackNews = useMemo(
    () => {
      const translated = (t.raw("newsList") as NewsItem[]) ?? [];
      if (translated.length > 0) return translated;

      return locale === "vi"
        ? [
            {
              title: "Không gian học tập thực hành tại Khoa Công nghệ Sinh học",
              date: "Tháng 7, 2026",
              category: "Đào tạo",
              summary:
                "Khám phá cách sinh viên kết nối kiến thức chuyên ngành với phòng thí nghiệm và các hoạt động học thuật.",
              image: "/assets/biotech/program-biotechnology-lab.webp",
            },
            {
              title:
                "Sinh viên Khoa Công nghệ Sinh học trong hoạt động hợp tác quốc tế",
              date: "Tháng 7, 2026",
              category: "Sinh viên",
              summary:
                "Những trải nghiệm dự án, giao lưu và đổi mới sáng tạo mở rộng góc nhìn của cộng đồng sinh viên.",
              image: "/assets/biotech/biotech-hackathon-2026.jpg",
            },
            {
              title: "Từ nghiên cứu sinh học đến những bài toán ứng dụng",
              date: "Tháng 6, 2026",
              category: "Nghiên cứu",
              summary:
                "Các hướng nghiên cứu tại Khoa tập trung vào khoa học sự sống, nông nghiệp và chất lượng cuộc sống.",
              image: "/assets/biotech/biotech-research-visual-2026.png",
            },
          ]
        : [
            {
              title: "Hands-on learning at the School of Biotechnology",
              date: "July 2026",
              category: "Education",
              summary:
                "Discover how students connect disciplinary knowledge with laboratory practice and academic activities.",
              image: "/assets/biotech/program-biotechnology-lab.webp",
            },
            {
              title:
                "School of Biotechnology students in international collaboration",
              date: "July 2026",
              category: "Students",
              summary:
                "Projects, exchange and innovation experiences broaden perspectives across the student community.",
              image: "/assets/biotech/biotech-hackathon-2026.jpg",
            },
            {
              title: "From biological research to applied challenges",
              date: "June 2026",
              category: "Research",
              summary:
                "Research directions connect life science with agriculture and quality-of-life questions.",
              image: "/assets/biotech/biotech-research-visual-2026.png",
            },
          ];
    },
    [locale, t],
  );
  const fallbackEvents = useMemo<EventItem[]>(
    () =>
      locale === "vi"
        ? [
            {
              id: "fallback-seminar",
              title: "Seminar khoa học sự sống",
              date: "Cập nhật lịch",
              description:
                "Trao đổi chuyên môn giữa giảng viên, sinh viên và khách mời trong lĩnh vực công nghệ sinh học.",
            },
            {
              id: "fallback-student-lab",
              title: "Ngày trải nghiệm phòng thí nghiệm",
              date: "Cập nhật lịch",
              description:
                "Hoạt động giới thiệu môi trường học tập và thực hành dành cho người học quan tâm đến khoa học sự sống.",
            },
          ]
        : [
            {
              id: "fallback-seminar",
              title: "Life sciences seminar",
              date: "Schedule pending",
              description:
                "Academic exchange among faculty, students and invited guests in biotechnology.",
            },
            {
              id: "fallback-student-lab",
              title: "Laboratory experience day",
              date: "Schedule pending",
              description:
                "An introduction to the learning and laboratory environment for prospective life-science students.",
            },
          ],
    [locale],
  );
  const fallbackResearch = useMemo(
    () => [
      ...getMockResearch(locale, ResearchType.PROJECT),
      ...getMockResearch(locale, ResearchType.PUBLICATION),
    ],
    [locale],
  );
  const fallbackAchievements = useMemo(
    () => getMockAchievements(locale),
    [locale],
  );
  const preparedInitial = useMemo(
    () =>
      initialItems === undefined
        ? undefined
        : prepareNewsData(initialItems, locale),
    [initialItems, locale],
  );
  const preparedInitialEvents = useMemo(
    () =>
      initialEvents === undefined
        ? undefined
        : prepareEventData(initialEvents, locale),
    [initialEvents, locale],
  );
  const [news, setNews] = useState<NewsItem[]>(() =>
    preparedInitial
      ? preparedInitial.length > 0
        ? preparedInitial
        : fallbackNews
      : fallbackNews,
  );
  const [events, setEvents] = useState<EventItem[]>(
    () =>
      preparedInitialEvents && preparedInitialEvents.length > 0
        ? preparedInitialEvents
        : fallbackEvents,
  );
  const [researchItems, setResearchItems] = useState<Research[]>(
    () =>
      initialResearch && initialResearch.length > 0
        ? initialResearch
        : fallbackResearch,
  );
  const [achievementItems, setAchievementItems] = useState<Achievement[]>(
    () =>
      initialAchievements && initialAchievements.length > 0
        ? initialAchievements
        : fallbackAchievements,
  );
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (preparedInitial) {
      setNews(preparedInitial.length > 0 ? preparedInitial : fallbackNews);
      return;
    }

    let active = true;

    async function fetchNews() {
      try {
        const data = await api.news.findAll();
        if (!active) return;

        const prepared = prepareNewsData(data, locale);

        setNews(prepared.length > 0 ? prepared : fallbackNews);
      } catch (error) {
        console.error("Failed to fetch news", error);
        if (active) setNews(fallbackNews);
      }
    }

    fetchNews();
    return () => {
      active = false;
    };
  }, [fallbackNews, locale, preparedInitial]);

  useEffect(() => {
    if (preparedInitialEvents) {
      setEvents(
        preparedInitialEvents.length > 0
          ? preparedInitialEvents
          : fallbackEvents,
      );
      return;
    }

    let active = true;

    api.events
      .findUpcoming(12)
      .then((data) => {
        if (!active) return;
        const prepared = prepareEventData(data, locale);
        setEvents(prepared.length > 0 ? prepared : fallbackEvents);
      })
      .catch((error) => {
        console.error("Failed to fetch upcoming events", error);
        if (active) setEvents(fallbackEvents);
      });

    return () => {
      active = false;
    };
  }, [fallbackEvents, locale, preparedInitialEvents]);

  useEffect(() => {
    let active = true;

    if (initialResearch === undefined) {
      api.research
        .findAll()
        .then((data) => {
          if (active) {
            setResearchItems(
              data.length > 0 ? data : fallbackResearch,
            );
          }
        })
        .catch((error) => {
          console.error("Failed to fetch research highlights", error);
          if (active) setResearchItems(fallbackResearch);
        });
    }

    if (initialAchievements === undefined) {
      api.achievements
        .findAll({ visibility: "PUBLIC" })
        .then((data) => {
          if (active) {
            setAchievementItems(
              data.length > 0 ? data : fallbackAchievements,
            );
          }
        })
        .catch((error) => {
          console.error("Failed to fetch achievement highlights", error);
          if (active) setAchievementItems(fallbackAchievements);
        });
    }

    return () => {
      active = false;
    };
  }, [
    fallbackAchievements,
    fallbackResearch,
    initialAchievements,
    initialResearch,
  ]);

  const leadStories = news.slice(0, 2);
  const categories = useMemo(
    () => Array.from(new Set(news.map((item) => item.category))),
    [news],
  );
  const archiveNews = useMemo(() => {
    if (activeCategory === "all") return news.slice(2);
    return news.filter((item) => item.category === activeCategory);
  }, [activeCategory, news]);
  const featuredResearch = useMemo(
    () =>
      [...researchItems].sort((a, b) => {
        const yearA =
          a.publicationYear ?? a.endYear ?? a.startYear ??
          new Date(a.createdAt).getFullYear();
        const yearB =
          b.publicationYear ?? b.endYear ?? b.startYear ??
          new Date(b.createdAt).getFullYear();
        return yearB - yearA;
      })[0],
    [researchItems],
  );
  const spotlightAchievements = useMemo(
    () =>
      [...achievementItems]
        .sort((a, b) => {
          if (Boolean(b.isHighlight) !== Boolean(a.isHighlight)) {
            return b.isHighlight ? 1 : -1;
          }
          const yearA = a.achievedYear ?? new Date(a.createdAt).getFullYear();
          const yearB = b.achievedYear ?? new Date(b.createdAt).getFullYear();
          return yearB - yearA;
        })
        .slice(0, 2),
    [achievementItems],
  );
  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };
  const newsHref = (item: NewsItem) =>
    item.slug
      ? locale === "vi"
        ? `/${locale}/tin-tuc/${item.slug}`
        : `/${locale}/news/${item.slug}`
      : "#";
  const researchHref = locale === "vi" ? "/vi/nghien-cuu" : "/en/research";
  const achievementsHref =
    locale === "vi" ? "/vi/sinh-vien" : "/en/students";
  const programsHref =
    locale === "vi" ? "/vi/chuong-trinh-dao-tao" : "/en/programs";
  const featuredResearchYear = featuredResearch
    ? featuredResearch.publicationYear ??
      featuredResearch.endYear ??
      featuredResearch.startYear
    : undefined;

  return (
    <main className="overflow-hidden bg-white text-[#111311]">
      <section className="px-5 pb-14 pt-14 sm:px-8 md:pb-20 md:pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto grid max-w-7xl gap-8 border-b border-[#d8dad7] pb-12 md:grid-cols-12 md:items-end md:pb-16"
        >
          <div className="md:col-span-7">
            <h1 className="max-w-[10ch] text-[clamp(3rem,6.2vw,6.4rem)] font-semibold leading-[1.04] tracking-[-0.06em] text-balance">
              {t("title")}
            </h1>
          </div>
          <p className="max-w-[34rem] text-[0.82rem] leading-7 text-[#626862] md:col-start-9 md:col-span-4">
            {t("description")}
          </p>
        </motion.div>
      </section>

      <section className="px-5 pb-24 sm:px-8 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-9 lg:pr-10">
            <h2 className="border-b border-[#d8dad7] pb-4 text-[2.15rem] font-semibold leading-none tracking-[-0.055em] sm:text-[2.6rem]">
              {t("latestNews")}
            </h2>

            {leadStories.length > 0 ? (
              <div>
                {leadStories.map((story, index) => (
                  <motion.article
                    key={`${story.title}-${story.date}`}
                    initial="hidden"
                    whileInView="visible"
                    variants={reveal}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: index * 0.07 }}
                    className="border-b border-[#d8dad7] py-7"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <Link
                        href={newsHref(story)}
                        className="max-w-[38rem] text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.03em] transition-colors hover:text-[#139C48] sm:text-[1.45rem]"
                      >
                        {story.title}
                      </Link>
                      <time className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.06em] text-[#929692]">
                        {story.date}
                      </time>
                    </div>

                    <div className="mt-6 grid gap-6 sm:grid-cols-[0.72fr_1.28fr] sm:items-stretch">
                      <div className="flex min-w-0 flex-col">
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#139C48]">
                          {story.category}
                        </span>
                        {story.summary && (
                          <p className="mt-4 line-clamp-4 text-[0.76rem] leading-6 text-[#686d68]">
                            {story.summary}
                          </p>
                        )}
                        <Link
                          href={newsHref(story)}
                          className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#cfd2ce] px-3.5 py-2 text-[0.62rem] font-medium text-[#5f635f] transition-[background-color,border-color,color,transform] hover:border-[#139C48] hover:bg-[#139C48] hover:text-white active:scale-[0.98] sm:mt-auto"
                        >
                          {t("viewDetails")}
                          <ArrowIcon direction="right" size={10} />
                        </Link>
                      </div>
                      <Link
                        href={newsHref(story)}
                        className="group relative min-h-48 overflow-hidden rounded-[0.9rem] bg-[#e7e9e6]"
                      >
                        <NewsVisual item={story} index={index} />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <p className="border-b border-[#d8dad7] py-14 text-sm text-[#747974]">
                {t("noNews")}
              </p>
            )}
          </div>

          <aside className="lg:col-span-3 lg:border-l lg:border-[#d8dad7] lg:pl-8">
            <h2 className="border-b border-[#d8dad7] pb-4 text-[2.15rem] font-semibold leading-none tracking-[-0.055em] sm:text-[2.6rem]">
              {t("eventsTitle")}
            </h2>
            <div className="divide-y divide-[#d8dad7] border-b border-[#d8dad7]">
              {events.map((event, index) => (
                <motion.article
                  key={event.id}
                  initial="hidden"
                  whileInView="visible"
                  variants={reveal}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="py-6"
                >
                  <h3 className="text-[0.96rem] font-semibold leading-[1.25] tracking-[-0.02em]">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="mt-4 line-clamp-3 text-[0.7rem] leading-5 text-[#717671]">
                      {event.description}
                    </p>
                  )}
                  <div className="mt-6 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.06em] text-[#929692]">
                    <HugeiconsIcon icon={Calendar03Icon} size={13} strokeWidth={1.5} />
                    {event.date}
                  </div>
                </motion.article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#f5f7f4] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-5">
              <h2 className="text-[clamp(2.35rem,4.2vw,4.4rem)] font-semibold leading-[1.05] tracking-[-0.055em]">
                {t("topicsTitle")}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 md:col-start-7 md:col-span-6 md:justify-end" aria-label={t("browseByTopic")}>
              {["all", ...categories].map((category) => {
                const selected = category === activeCategory;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveCategory(category)}
                    className={`min-h-10 rounded-full border px-4 text-[0.66rem] font-semibold transition-[background-color,border-color,color,transform] active:scale-[0.98] ${
                      selected
                        ? "border-[#139C48] bg-[#139C48] text-white"
                        : "border-[#cfd2ce] bg-white text-[#616661] hover:border-[#139C48] hover:text-[#139C48]"
                    }`}
                  >
                    {category === "all" ? t("allCategories") : category}
                  </button>
                );
              })}
            </div>
          </div>

          {archiveNews.length > 0 ? (
            <div className="mt-12 border-t border-[#d8dad7]">
              {archiveNews.map((story, index) => (
                <motion.article
                  key={`archive-${story.title}-${story.date}`}
                  initial="hidden"
                  whileInView="visible"
                  variants={reveal}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
                  className="grid gap-6 border-b border-[#d8dad7] py-7 md:grid-cols-[1fr_17rem] md:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.62rem]">
                      <span className="font-semibold uppercase tracking-[0.1em] text-[#139C48]">
                        {story.category}
                      </span>
                      <time className="font-mono text-[#929692]">{story.date}</time>
                    </div>
                    <Link
                      href={newsHref(story)}
                      className="mt-3 block max-w-2xl text-[1.16rem] font-semibold leading-[1.25] tracking-[-0.025em] transition-colors hover:text-[#139C48]"
                    >
                      {story.title}
                    </Link>
                    {story.summary && (
                      <p className="mt-3 line-clamp-2 max-w-2xl text-[0.74rem] leading-6 text-[#717671]">
                        {story.summary}
                      </p>
                    )}
                  </div>
                  <Link
                    href={newsHref(story)}
                    className="group relative order-first aspect-[16/9] overflow-hidden rounded-[0.75rem] bg-[#e7e9e6] md:order-none"
                  >
                    <NewsVisual item={story} index={index + 2} />
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <p className="mt-12 border-y border-[#d8dad7] py-12 text-sm text-[#747974]">
              {t("noNews")}
            </p>
          )}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl border-t border-[#d8dad7] pt-14 md:pt-20">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-5">
              <h2 className="max-w-[12ch] text-[clamp(2.35rem,4.2vw,4.4rem)] font-semibold leading-[1.05] tracking-[-0.055em]">
                {t("insightsTitle")}
              </h2>
            </div>
            <p className="max-w-[34rem] text-[0.82rem] leading-7 text-[#626862] md:col-start-7 md:col-span-6">
              {t("insightsDescription")}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <motion.article
              initial="hidden"
              whileInView="visible"
              variants={reveal}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[1rem] bg-[#f3f6f2] lg:col-span-7"
            >
              <div className="relative aspect-[1.85/1] overflow-hidden bg-[#e7e9e6]">
                <img
                  src="/assets/biotech/program-biotechnology-lab.webp"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#139C48]">
                    {t("researchLabel")}
                  </span>
                  <span className="font-mono text-[0.6rem] text-[#929692]">
                    {featuredResearchYear ?? t("researchArchiveLabel")}
                  </span>
                </div>
                <h3 className="mt-5 max-w-2xl text-[1.4rem] font-semibold leading-[1.25] tracking-[-0.03em] sm:text-[1.7rem]">
                  {featuredResearch?.title ?? t("researchFallbackTitle")}
                </h3>
                <p className="mt-4 line-clamp-3 max-w-2xl text-[0.78rem] leading-6 text-[#686d68]">
                  {featuredResearch?.abstract || t("researchFallbackDescription")}
                </p>
                <Link
                  href={researchHref}
                  className="group mt-7 inline-flex items-center gap-2 rounded-full border border-[#bfc9be] bg-white px-4 py-2 text-[0.66rem] font-semibold text-[#565d56] transition-[background-color,border-color,color,transform] hover:border-[#139C48] hover:bg-[#139C48] hover:text-white active:scale-[0.98]"
                >
                  {t("viewResearch")}
                  <ArrowIcon direction="right" size={10} />
                </Link>
              </div>
            </motion.article>

            <div className="border-t border-[#d8dad7] lg:col-span-5">
              {spotlightAchievements.map((achievement, index) => (
                <motion.article
                  key={achievement.id}
                  initial="hidden"
                  whileInView="visible"
                  variants={reveal}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="grid gap-5 border-b border-[#d8dad7] py-7 sm:grid-cols-[8rem_1fr]"
                >
                  <div className="relative aspect-[1.15/1] overflow-hidden rounded-[0.75rem] bg-[#e7e9e6]">
                    {achievement.coverImage ? (
                      <img
                        src={achievement.coverImage}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center font-mono text-[0.7rem] text-[#139C48]">
                        0{index + 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-[#139C48]">
                      {[achievement.rank, achievement.achievedYear]
                        .filter(Boolean)
                        .join(" / ")}
                    </span>
                    <h3 className="mt-3 text-[1.02rem] font-semibold leading-[1.28] tracking-[-0.02em]">
                      {achievement.title}
                    </h3>
                    {(achievement.description || achievement.projectName) && (
                      <p className="mt-3 line-clamp-2 text-[0.72rem] leading-5 text-[#717671]">
                        {achievement.description ?? achievement.projectName}
                      </p>
                    )}
                  </div>
                </motion.article>
              ))}
              <Link
                href={achievementsHref}
                className="group mt-7 inline-flex items-center gap-2 rounded-full border border-[#bfc9be] px-4 py-2 text-[0.66rem] font-semibold text-[#565d56] transition-[background-color,border-color,color,transform] hover:border-[#139C48] hover:bg-[#139C48] hover:text-white active:scale-[0.98]"
              >
                {t("viewAchievements")}
                <ArrowIcon direction="right" size={10} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EditorialCta
        title={t("exploreBiotech")}
        description={t("exploreBiotechDescription")}
        primaryLabel={t("exploreProgramsTitle")}
        primaryHref={programsHref}
      />
    </main>
  );
}
