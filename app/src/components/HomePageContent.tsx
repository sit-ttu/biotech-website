"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import EditorialCta from "@/components/EditorialCta";
import FacultyHighlight from "@/components/FacultyHighlight";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { api, type Event, type News } from "@/lib/api";
import { getNewsImage } from "@/lib/news-content";

type SiteLocale = "vi" | "en";

const landingCopy = {
  vi: {
    hero: ["Xuất sắc trong giáo dục,", "tiên phong trong nghiên cứu."],
    apply: "Khám phá chương trình",
    studyTitle: "Học tập tại Khoa Công nghệ Sinh học",
    studyIntro:
      "Khám phá môi trường học thuật nơi kiến thức nền tảng, kỹ năng phòng thí nghiệm và nghiên cứu ứng dụng cùng tạo nên một hành trình học tập giàu trải nghiệm.",
    cards: [
      "Cử nhân Công nghệ Sinh học",
      "Cử nhân Sinh học ứng dụng",
      "Đời sống sinh viên",
      "Nghiên cứu ứng dụng",
    ],
    discover: "Khám phá",
    discoverIntro:
      "Ba điểm chạm để hiểu rõ hành trình học tập, nghiên cứu và trải nghiệm sinh viên tại Khoa.",
    rows: [
      {
        title: "Chương trình đào tạo",
        description:
          "Tìm hiểu hai chương trình Công nghệ Sinh học và Sinh học ứng dụng, cùng lộ trình học, chuẩn đầu ra và các học phần chuyên ngành.",
      },
      {
        title: "Hoạt động nghiên cứu",
        description:
          "Theo dõi các hướng nghiên cứu, công bố khoa học và dự án đang được triển khai tại Khoa Công nghệ Sinh học.",
      },
      {
        title: "Cộng đồng sinh viên",
        description:
          "Gặp gỡ cộng đồng Biotech TTU qua hoạt động học thuật, trải nghiệm campus, thực tập và các dự án đổi mới.",
      },
    ],
    readMore: "Xem thêm",
    loadMore: "Khám phá thêm",
    heroAlt: "Sinh viên Biotech TTU tại cuộc thi đổi mới sáng tạo",
    news: "Tin tức mới nhất",
    events: "Sự kiện",
    allNews: "Xem tất cả tin tức",
    newsEmpty: "Tin tức mới đang được cập nhật.",
    eventsEmpty: "Chưa có sự kiện sắp diễn ra.",
    aboutTitle: ["Về Khoa", "Công nghệ Sinh học"],
    aboutStatement: "Khoa học phục vụ chất lượng cuộc sống.",
    aboutIntro:
      "Khoa đào tạo cử nhân và kỹ sư có khả năng hiểu, phát triển và ứng dụng tri thức cùng sản phẩm công nghệ sinh học nhằm nâng cao chất lượng cuộc sống.",
    aboutVision:
      "Định hướng của Khoa là phát triển nghiên cứu, chẩn đoán ung thư và chuyển giao sản phẩm công nghệ sinh học phục vụ nông nghiệp Việt Nam, đặc biệt khu vực Đồng bằng sông Cửu Long.",
    aboutLink: "Tìm hiểu về Khoa",
    aboutCampusCaption:
      "Khuôn viên kết nối giảng đường, phòng thực hành và không gian nghiên cứu của Đại học Tân Tạo.",
    aboutCollaborationCaption:
      "Hợp tác học thuật mở rộng cơ hội nghiên cứu và tiếp cận các vấn đề liên ngành.",
    aboutStudentCaption:
      "Sinh viên phát triển năng lực qua dự án, cuộc thi và hoạt động đổi mới sáng tạo.",
    ctaTitle: ["Chưa tìm thấy điều", "bạn đang tìm kiếm?"],
    ctaDescription:
      "Kết nối với Khoa để được giải đáp về chương trình học, tuyển sinh, hoạt động nghiên cứu và cơ hội dành cho sinh viên.",
    ctaPrimary: "Liên hệ với Khoa",
    ctaSecondary: "Xem chương trình",
    latestLabel: "Mới nhất",
  },
  en: {
    hero: ["Excellence in education,", "leadership and research."],
    apply: "Explore programs",
    studyTitle: "Studying at Biotech TTU",
    studyIntro:
      "Discover an academic environment where scientific foundations, laboratory practice and applied research shape a rich learning experience.",
    cards: [
      "Undergraduate admissions",
      "Applied Biology",
      "Student life",
      "Applied research",
    ],
    discover: "Discover",
    discoverIntro:
      "Three perspectives on study, research and student experience at the School.",
    rows: [
      {
        title: "Academic programs",
        description:
          "Explore the Biotechnology and Applied Biology programs, their study pathways, learning outcomes and specialist courses.",
      },
      {
        title: "Research activity",
        description:
          "Follow current research directions, scientific publications and projects at the School of Biotechnology.",
      },
      {
        title: "Student community",
        description:
          "Meet the Biotech TTU community through academic activities, campus life, internships and innovation projects.",
      },
    ],
    readMore: "Read more",
    loadMore: "Explore more",
    heroAlt: "Biotech TTU students at an innovation competition",
    news: "Latest news",
    events: "Events",
    allNews: "View all news",
    newsEmpty: "New stories are being prepared.",
    eventsEmpty: "There are no upcoming events yet.",
    aboutTitle: ["About the School", "of Biotechnology"],
    aboutStatement: "Science in service of a better quality of life.",
    aboutIntro:
      "The School prepares bachelors and engineers to understand, develop and apply biotechnology knowledge and products that improve quality of life.",
    aboutVision:
      "Its direction combines cancer research and diagnosis with applied biotechnology research and product transfer for Vietnamese agriculture, particularly the Mekong Delta.",
    aboutLink: "About the School",
    aboutCampusCaption:
      "The campus connects lecture spaces, practical laboratories and Tan Tao University’s research environment.",
    aboutCollaborationCaption:
      "Academic partnerships expand research opportunities and interdisciplinary learning.",
    aboutStudentCaption:
      "Students build capability through projects, competitions and innovation activities.",
    ctaTitle: ["Still looking for", "the right information?"],
    ctaDescription:
      "Connect with the School for guidance on academic programs, admissions, research activities and student opportunities.",
    ctaPrimary: "Contact the School",
    ctaSecondary: "Explore programs",
    latestLabel: "Latest",
  },
} as const;

const cardImages = [
  "/assets/biotech/program-biotechnology-lab.webp",
  "/assets/biotech/program-applied-biology-tissue-culture.webp",
  "/assets/ttu/programs-academic-partnership.jpg",
  "/assets/biotech/biotech-hackathon-2026.jpg",
];

const newsFallbackImages = [
  "/assets/ttu/menu/students-at-ttu.jpg",
  "/assets/ttu/menu/international-cooperation-2026.jpg",
];

const mockNewsByLocale: Record<SiteLocale, News[]> = {
  vi: [
    {
      id: "mock-news-research",
      title:
        "Sinh viên Công nghệ Sinh học với hành trình nghiên cứu ứng dụng",
      slug: "hanh-trinh-nghien-cuu-ung-dung",
      summary:
        "Từ phòng thực hành đến các dự án liên ngành, sinh viên từng bước chuyển hóa kiến thức thành giải pháp cho đời sống.",
      content: {},
      coverImage: "/assets/ttu/menu/international-cooperation-2026.jpg",
      category: "academic",
      status: "published",
      publishedAt: "2026-07-20T08:00:00+07:00",
      createdAt: "2026-07-20T08:00:00+07:00",
      updatedAt: "2026-07-20T08:00:00+07:00",
    },
    {
      id: "mock-news-campus",
      title: "Môi trường học tập gắn với thực hành và đổi mới sáng tạo",
      slug: "moi-truong-hoc-tap-doi-moi-sang-tao",
      summary:
        "Không gian học thuật tại TTU kết nối kiến thức nền tảng, trải nghiệm phòng thí nghiệm và hoạt động cộng đồng.",
      content: {},
      coverImage: "/assets/ttu/students-campus-learning.jpg",
      category: "general",
      status: "published",
      publishedAt: "2026-07-12T08:00:00+07:00",
      createdAt: "2026-07-12T08:00:00+07:00",
      updatedAt: "2026-07-12T08:00:00+07:00",
    },
  ],
  en: [
    {
      id: "mock-news-research",
      title: "Biotechnology students on a journey into applied research",
      slug: "applied-research-journey",
      summary:
        "From laboratory practice to interdisciplinary projects, students turn scientific knowledge into ideas for real-world challenges.",
      content: {},
      coverImage: "/assets/ttu/menu/international-cooperation-2026.jpg",
      category: "academic",
      status: "published",
      publishedAt: "2026-07-20T08:00:00+07:00",
      createdAt: "2026-07-20T08:00:00+07:00",
      updatedAt: "2026-07-20T08:00:00+07:00",
    },
    {
      id: "mock-news-campus",
      title: "A learning environment shaped by practice and innovation",
      slug: "learning-through-practice-and-innovation",
      summary:
        "Academic life at TTU connects scientific foundations, laboratory experience and an active student community.",
      content: {},
      coverImage: "/assets/ttu/students-campus-learning.jpg",
      category: "general",
      status: "published",
      publishedAt: "2026-07-12T08:00:00+07:00",
      createdAt: "2026-07-12T08:00:00+07:00",
      updatedAt: "2026-07-12T08:00:00+07:00",
    },
  ],
};

const mockEvents: Event[] = [
  {
    id: "mock-event-open-lab",
    titleVi: "Trải nghiệm phòng thực hành Công nghệ Sinh học",
    titleEn: "Biotechnology open laboratory experience",
    startAt: "2026-08-15T08:00:00+07:00",
    locationVi: "Khoa Công nghệ Sinh học, Đại học Tân Tạo",
    locationEn: "School of Biotechnology, Tan Tao University",
    status: "published",
    isFeatured: true,
    createdAt: "2026-07-20T08:00:00+07:00",
    updatedAt: "2026-07-20T08:00:00+07:00",
  },
  {
    id: "mock-event-seminar",
    titleVi: "Seminar học thuật về Sinh học ứng dụng",
    titleEn: "Academic seminar on Applied Biology",
    startAt: "2026-08-22T09:00:00+07:00",
    locationVi: "Đại học Tân Tạo",
    locationEn: "Tan Tao University",
    status: "published",
    isFeatured: false,
    createdAt: "2026-07-20T08:00:00+07:00",
    updatedAt: "2026-07-20T08:00:00+07:00",
  },
  {
    id: "mock-event-research",
    titleVi: "Kết nối sinh viên với nghiên cứu và đổi mới sáng tạo",
    titleEn: "Connecting students with research and innovation",
    startAt: "2026-09-05T08:30:00+07:00",
    locationVi: "Đại học Tân Tạo",
    locationEn: "Tan Tao University",
    status: "published",
    isFeatured: false,
    createdAt: "2026-07-20T08:00:00+07:00",
    updatedAt: "2026-07-20T08:00:00+07:00",
  },
  {
    id: "mock-event-community",
    titleVi: "Sinh hoạt học thuật cộng đồng Biotech TTU",
    titleEn: "Biotech TTU academic community gathering",
    startAt: "2026-09-12T09:00:00+07:00",
    locationVi: "Khoa Công nghệ Sinh học, Đại học Tân Tạo",
    locationEn: "School of Biotechnology, Tan Tao University",
    status: "published",
    isFeatured: false,
    createdAt: "2026-07-20T08:00:00+07:00",
    updatedAt: "2026-07-20T08:00:00+07:00",
  },
];

function formatEditorialDate(value: string, locale: SiteLocale) {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function EditorialCard({
  title,
  image,
  href,
  readMore,
  className = "",
  imageClassName = "aspect-[16/9]",
}: {
  title: string;
  image: string;
  href: string;
  readMore: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex min-w-0 flex-col border-[#d8dad7] px-0 py-5 md:border-l md:px-3 md:py-3 ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-[0.9rem] bg-[#e7e7e4] ${imageClassName}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
        />
      </div>
      <div className="flex min-h-14 items-end justify-between gap-4 pt-4">
        <h3 className="max-w-[14rem] text-[1rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#111311] md:text-[1.05rem]">
          {title}
        </h3>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#cfd2ce] px-3 py-1.5 text-[0.62rem] font-medium text-[#5f635f] transition-[background-color,border-color,color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[#139C48] group-hover:bg-[#139C48] group-hover:text-white group-active:scale-[0.98]">
          {readMore}
          <ArrowIcon direction="right" size={11} />
        </span>
      </div>
    </Link>
  );
}

export default function HomePageContent({
  revealOffset,
}: {
  revealOffset: number;
}) {
  const locale = useLocale() as SiteLocale;
  const tAbout = useTranslations("about");
  const reduceMotion = useReducedMotion();
  const copy = landingCopy[locale];
  const basePath = `/${locale}`;
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const links = {
    about:
      locale === "vi"
        ? `${basePath}/gioi-thieu-chung`
        : `${basePath}/about-us`,
    programs:
      locale === "vi"
        ? `${basePath}/chuong-trinh-dao-tao`
        : `${basePath}/programs`,
    research:
      locale === "vi" ? `${basePath}/nghien-cuu` : `${basePath}/research`,
    students:
      locale === "vi"
        ? `${basePath}/sinh-vien`
        : `${basePath}/students`,
    news: locale === "vi" ? `${basePath}/tin-tuc` : `${basePath}/news`,
    contact: locale === "vi" ? `${basePath}/lien-he` : `${basePath}/contact`,
  };
  const cardLinks = [
    links.programs,
    links.programs,
    links.students,
    links.research,
  ];
  const discoverLinks = [links.programs, links.research, links.students];
  const discoverLabels =
    locale === "vi"
      ? ["Đào tạo", "Nghiên cứu", "Sinh viên"]
      : ["Academics", "Research", "Student life"];

  useEffect(() => {
    let active = true;

    api.news
      .findAll()
      .then((items) => {
        if (!active) return;
        const publishedItems = items
          .filter((item) => item.status === "published")
          .sort(
            (a, b) =>
              new Date(b.publishedAt || b.createdAt).getTime() -
              new Date(a.publishedAt || a.createdAt).getTime(),
          )
          .slice(0, 2);

        setNewsItems(
          publishedItems.length > 0
            ? publishedItems
            : mockNewsByLocale[locale],
        );
      })
      .catch(() => {
        if (active) setNewsItems(mockNewsByLocale[locale]);
      })
      .finally(() => {
        if (active) setNewsLoading(false);
      });

    api.events
      .findUpcoming(4)
      .then((items) => {
        if (active) setEvents(items.length > 0 ? items : mockEvents);
      })
      .catch(() => {
        if (active) setEvents(mockEvents);
      })
      .finally(() => {
        if (active) setEventsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [locale]);

  const reveal = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, transition: { duration: 0.85 } };

  return (
    <main className="text-[#111311]">
      <div className="mx-auto max-w-7xl">
        <section className="px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: revealOffset }}
            animate={reveal}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 md:grid-cols-12 md:items-start lg:gap-10 xl:gap-12"
          >
            <h1 className="text-[clamp(2.65rem,4vw,4rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-[#101210] md:col-span-8">
              <span className="block text-balance">{copy.hero[0]}</span>
              <span className="block text-balance">{copy.hero[1]}</span>
            </h1>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reveal}
              transition={{
                duration: 0.75,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="md:col-span-4 md:pt-1 lg:pl-4 xl:pl-8"
            >
              <p className="max-w-[29rem] text-[0.78rem] leading-[1.55] text-[#737873]">
                {tAbout("description")}
              </p>
              <Link
                href={links.programs}
                className="group mt-5 inline-flex min-h-11 items-center gap-4 rounded-full bg-[#139C48] py-1.5 pl-5 pr-1.5 text-[0.72rem] font-semibold text-white transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#0F7E3A] active:scale-[0.98]"
              >
                {copy.apply}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#139C48] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
                  <ArrowIcon direction="right" size={13} />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reveal}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1rem] bg-[#e8e8e5] sm:aspect-[16/7.6]"
          >
            <Image
              src="/assets/biotech/biotech-hackathon-2026.jpg"
              alt={copy.heroAlt}
              fill
              priority
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover object-[center_56%]"
            />
          </motion.div>
        </section>

        <section className="px-5 pb-24 sm:px-8 md:pb-32">
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            whileInView={reveal}
            viewport={{ once: true, amount: 0.5 }}
            className="text-[2.15rem] font-semibold leading-none tracking-[-0.055em] text-[#111311] sm:text-[2.6rem]"
          >
            {copy.studyTitle}
          </motion.h2>

          <div className="mt-4 border-t border-[#d8dad7] pt-0">
            <div className="grid md:grid-cols-4">
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reveal}
                viewport={{ once: true, amount: 0.4 }}
                className="max-w-[18rem] py-6 pr-5 text-[0.72rem] leading-[1.35] text-[#868a86] md:row-span-2"
              >
                {copy.studyIntro}
              </motion.p>

              <EditorialCard
                title={copy.cards[0]}
                image={cardImages[0]}
                href={cardLinks[0]}
                readMore={copy.readMore}
                className="md:col-span-2"
                imageClassName="aspect-[16/8.7]"
              />
              <EditorialCard
                title={copy.cards[1]}
                image={cardImages[1]}
                href={cardLinks[1]}
                readMore={copy.readMore}
              />
              <EditorialCard
                title={copy.cards[2]}
                image={cardImages[2]}
                href={cardLinks[2]}
                readMore={copy.readMore}
              />
              <EditorialCard
                title={copy.cards[3]}
                image={cardImages[3]}
                href={cardLinks[3]}
                readMore={copy.readMore}
                className="md:col-span-2"
                imageClassName="aspect-[16/8.7]"
              />
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-8 md:pb-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            whileInView={reveal}
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col gap-6 border-b border-[#d8dad7] pb-7 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="grid gap-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(16rem,1.2fr)] sm:items-end sm:gap-12">
              <h2 className="text-[2.15rem] font-semibold leading-none tracking-[-0.055em] text-[#111311] sm:text-[2.6rem]">
                {copy.discover}
              </h2>
              <p className="max-w-[30rem] text-[0.76rem] leading-[1.6] text-[#747974]">
                {copy.discoverIntro}
              </p>
            </div>
            <Link
              href={links.about}
              className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#cfd2ce] px-4 py-2 text-[0.67rem] font-medium text-[#5f635f] transition-[background-color,border-color,color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#139C48] hover:bg-[#139C48] hover:text-white active:scale-[0.98]"
            >
              {copy.loadMore}
              <ArrowIcon direction="right" size={12} />
            </Link>
          </motion.div>

          <div className="mt-6 grid border-y border-[#d8dad7] lg:grid-cols-12">
            {copy.rows.map((row, index) => (
              <motion.div
                key={row.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reveal}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={
                  index === 0
                    ? "lg:col-span-7 lg:pr-8"
                    : index === 1
                      ? "border-t border-[#d8dad7] lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8"
                      : "border-t border-[#d8dad7] lg:col-span-12"
                }
              >
                <Link
                  href={discoverLinks[index]}
                  className="group block h-full"
                >
                  <div
                    className={`grid w-full gap-8 py-9 sm:py-11 ${
                      index === 2
                        ? "min-h-[12rem] sm:grid-cols-[minmax(12rem,0.72fr)_minmax(16rem,1.28fr)_auto] sm:items-center"
                        : "min-h-[19rem] content-between"
                    }`}
                  >
                    <div>
                      <span className="inline-flex rounded-full border border-[#cfd2ce] px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.12em] text-[#656a65] transition-colors group-hover:border-[#139C48] group-hover:text-[#139C48]">
                        {discoverLabels[index]}
                      </span>
                      <h3 className="mt-7 max-w-[22rem] text-[1.7rem] font-semibold leading-[1.06] tracking-[-0.045em] text-[#111311] sm:text-[2rem]">
                        {row.title}
                      </h3>
                    </div>
                    <p className="max-w-[31rem] text-[0.78rem] leading-[1.65] text-[#707570]">
                      {row.description}
                    </p>
                    <span className="inline-flex items-center gap-3 self-end justify-self-end text-[0.66rem] font-medium text-[#646964] transition-colors group-hover:text-[#139C48]">
                      {copy.readMore}
                      <span className="flex size-9 items-center justify-center rounded-full border border-[#cfd2ce] transition-[background-color,border-color,color,transform] duration-500 group-hover:translate-x-0.5 group-hover:border-[#139C48] group-hover:bg-[#139C48] group-hover:text-white">
                        <ArrowIcon direction="right" size={12} />
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <FacultyHighlight />

        <section className="px-5 pb-24 sm:px-8 md:pb-32">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,2.2fr)_minmax(16rem,0.8fr)] lg:gap-7">
            <div>
              <div className="flex items-end justify-between gap-6 border-b border-[#d8dad7] pb-4">
                <motion.h2
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reveal}
                  viewport={{ once: true, amount: 0.5 }}
                  className="text-[2.15rem] font-semibold leading-none tracking-[-0.055em] sm:text-[2.6rem]"
                >
                  {copy.news}
                </motion.h2>
                <Link
                  href={links.news}
                  className="group hidden items-center gap-2 border-b border-[#aeb2ae] pb-1 text-[0.67rem] font-medium text-[#606460] transition-colors hover:border-[#139C48] hover:text-[#139C48] sm:inline-flex"
                >
                  {copy.allNews}
                  <ArrowIcon direction="right" size={11} />
                </Link>
              </div>

              {newsLoading ? (
                <div className="divide-y divide-[#d8dad7]">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="grid animate-pulse gap-6 py-6 sm:grid-cols-[0.82fr_1.18fr]"
                    >
                      <div>
                        <div className="h-3 w-20 bg-[#eceeeb]" />
                        <div className="mt-5 h-6 w-full bg-[#e4e7e3]" />
                        <div className="mt-2 h-6 w-4/5 bg-[#e4e7e3]" />
                      </div>
                      <div className="aspect-[16/8.2] bg-[#e7e9e6]" />
                    </div>
                  ))}
                </div>
              ) : newsItems.length === 0 ? (
                <div className="border-b border-[#d8dad7] py-12">
                  <p className="max-w-sm text-sm leading-6 text-[#747974]">
                    {copy.newsEmpty}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#d8dad7]">
                  {newsItems.map((item, index) => {
                    const publishedDate = item.publishedAt || item.createdAt;
                    const image =
                      getNewsImage(item) ||
                      newsFallbackImages[index % newsFallbackImages.length];
                    const newsHref = item.id.startsWith("mock-")
                      ? links.news
                      : `${links.news}/${item.slug}`;

                    return (
                      <motion.article
                        key={item.id}
                        initial={
                          reduceMotion ? false : { opacity: 0, y: 20 }
                        }
                        whileInView={reveal}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="grid gap-6 py-6 sm:grid-cols-[0.82fr_1.18fr] sm:items-stretch"
                      >
                        <div className="flex min-w-0 flex-col">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-roboto-mono text-[0.58rem] uppercase tracking-[0.13em] text-[#139C48]">
                              {copy.latestLabel}
                            </span>
                            <time className="text-[0.58rem] text-[#929692]">
                              {formatEditorialDate(publishedDate, locale)}
                            </time>
                          </div>
                          <h3 className="mt-4 text-[1rem] font-semibold leading-[1.18] tracking-[-0.025em] sm:text-[1.08rem]">
                            {item.title}
                          </h3>
                          {item.summary && (
                            <p className="mt-4 line-clamp-3 text-[0.68rem] leading-[1.5] text-[#858985]">
                              {item.summary}
                            </p>
                          )}
                          <Link
                            href={newsHref}
                            className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#cfd2ce] px-3 py-1.5 text-[0.61rem] font-medium text-[#5f635f] transition-[background-color,border-color,color,transform] hover:border-[#139C48] hover:bg-[#139C48] hover:text-white active:scale-[0.98] sm:mt-auto"
                          >
                            {copy.readMore}
                            <ArrowIcon direction="right" size={10} />
                          </Link>
                        </div>
                        <Link
                          href={newsHref}
                          className="group/image relative min-h-44 overflow-hidden rounded-[0.75rem] bg-[#e7e9e6]"
                        >
                          <img
                            src={image}
                            alt={item.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:scale-[1.025]"
                          />
                        </Link>
                      </motion.article>
                    );
                  })}
                </div>
              )}
            </div>

            <aside>
              <h2 className="border-b border-[#d8dad7] pb-4 text-[2.15rem] font-semibold leading-none tracking-[-0.055em] sm:text-[2.6rem]">
                {copy.events}
              </h2>
              {eventsLoading ? (
                <div className="divide-y divide-[#d8dad7]">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="animate-pulse py-5">
                      <div className="h-5 w-4/5 bg-[#e4e7e3]" />
                      <div className="mt-6 h-3 w-24 bg-[#eceeeb]" />
                    </div>
                  ))}
                </div>
              ) : events.length === 0 ? (
                <p className="border-b border-[#d8dad7] py-10 text-sm leading-6 text-[#747974]">
                  {copy.eventsEmpty}
                </p>
              ) : (
                <div className="divide-y divide-[#d8dad7] border-b border-[#d8dad7]">
                  {events.map((event) => {
                    const title =
                      locale === "vi"
                        ? event.titleVi
                        : event.titleEn || event.titleVi;
                    const eventHref =
                      event.registrationUrl ||
                      (locale === "vi"
                        ? `${links.students}/hoat-dong`
                        : `${links.students}/activities`);

                    return (
                      <article key={event.id} className="py-5">
                        <h3 className="text-[0.9rem] font-semibold leading-[1.16] tracking-[-0.02em]">
                          {title}
                        </h3>
                        <div className="mt-6 flex items-center justify-between gap-3">
                          <time className="text-[0.58rem] text-[#929692]">
                            {formatEditorialDate(event.startAt, locale)}
                          </time>
                          <a
                            href={eventHref}
                            target={
                              event.registrationUrl ? "_blank" : undefined
                            }
                            rel={
                              event.registrationUrl
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="group inline-flex items-center gap-2 rounded-full border border-[#cfd2ce] px-3 py-1.5 text-[0.58rem] font-medium text-[#5f635f] transition-[background-color,border-color,color,transform] hover:border-[#139C48] hover:bg-[#139C48] hover:text-white active:scale-[0.98]"
                          >
                            {copy.readMore}
                            <ArrowIcon direction="right" size={9} />
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </aside>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 md:pb-32">
          <div className="grid border-b border-[#d8dad7] pb-4 md:grid-cols-12">
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reveal}
              viewport={{ once: true, amount: 0.5 }}
              className="text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[2.6rem] md:col-span-4"
            >
              <span className="block">{copy.aboutTitle[0]}</span>
              <span className="block">{copy.aboutTitle[1]}</span>
            </motion.h2>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-12 md:items-start md:gap-4">
            <p className="max-w-[15rem] border-l border-[#bfc3bf] pl-4 text-[0.88rem] font-medium leading-[1.5] tracking-[-0.025em] text-[#4f544f] md:col-start-4 md:col-span-3 md:pr-5">
              {copy.aboutStatement}
            </p>
            <p className="max-w-[32rem] text-[0.68rem] leading-[1.48] text-[#666b66] md:col-span-3 md:pr-5">
              {copy.aboutIntro}
            </p>
            <p className="max-w-[32rem] text-[0.68rem] leading-[1.48] text-[#666b66] md:col-span-3 md:pr-5">
              {copy.aboutVision}
            </p>
          </div>

          <div className="mt-7 grid gap-8 md:grid-cols-12 md:items-start md:gap-4">
            <motion.figure
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reveal}
              viewport={{ once: true, amount: 0.2 }}
              className="md:col-span-6"
            >
              <div className="relative aspect-[1.5/1] overflow-hidden rounded-[0.65rem] bg-[#e7e9e6]">
                <Image
                  src="/assets/ttu/about-tan-tao-campus.jpg"
                  alt={
                    locale === "vi"
                      ? "Khuôn viên Đại học Tân Tạo"
                      : "Tan Tao University campus"
                  }
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 max-w-[18rem] text-[0.59rem] leading-[1.45] text-[#757a75] md:ml-auto md:w-1/2">
                {copy.aboutCampusCaption}
              </figcaption>
            </motion.figure>

            <motion.figure
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reveal}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.08 }}
              className="md:col-span-3 md:pt-40"
            >
              <div className="relative aspect-[1.35/1] overflow-hidden rounded-[0.65rem] bg-[#e7e9e6]">
                <Image
                  src="/assets/ttu/menu/international-cooperation-2026.jpg"
                  alt={
                    locale === "vi"
                      ? "Hoạt động hợp tác học thuật tại Đại học Tân Tạo"
                      : "Academic collaboration at Tan Tao University"
                  }
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[0.59rem] leading-[1.45] text-[#757a75]">
                {copy.aboutCollaborationCaption}
              </figcaption>
            </motion.figure>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reveal}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.14 }}
              className="md:col-span-3"
            >
              <figure>
                <div className="relative aspect-[1.35/1] overflow-hidden rounded-[0.65rem] bg-[#e7e9e6]">
                  <Image
                    src="/assets/biotech/biotech-hackathon-2026.jpg"
                    alt={
                      locale === "vi"
                        ? "Sinh viên Biotech TTU trong hoạt động đổi mới"
                        : "Biotech TTU students in an innovation activity"
                    }
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[0.59rem] leading-[1.45] text-[#757a75]">
                  {copy.aboutStudentCaption}
                </figcaption>
              </figure>
              <Link
                href={links.about}
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-[#cfd2ce] px-4 py-2 text-[0.67rem] font-medium text-[#5f635f] transition-[background-color,border-color,color,transform] hover:border-[#139C48] hover:bg-[#139C48] hover:text-white active:scale-[0.98] md:float-right md:mt-28"
              >
                {copy.aboutLink}
                <ArrowIcon direction="right" size={11} />
              </Link>
            </motion.div>
          </div>
        </section>

        <EditorialCta
          title={copy.ctaTitle.join(" ")}
          description={copy.ctaDescription}
          primaryLabel={copy.ctaPrimary}
          primaryHref={links.contact}
          secondaryLabel={copy.ctaSecondary}
          secondaryHref={links.programs}
        />
      </div>
    </main>
  );
}
