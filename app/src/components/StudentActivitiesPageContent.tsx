import Link from "next/link";
import type { Event, News } from "@/lib/api";
import type { SiteLocale } from "@/lib/program-pages";

import { ArrowIcon } from "@/components/icons/ArrowIcon";

const copyByLocale = {
  vi: {
    eyebrow: "Hoạt động sinh viên",
    title: "Hoạt động làm nên trải nghiệm Biotech TTU.",
    description:
      "Workshop, cuộc thi, dự án cộng đồng và những dịp kết nối giúp sinh viên học từ trải nghiệm thật bên ngoài lớp học.",
    upcomingLink: "Xem lịch sắp tới",
    storiesLink: "Khám phá câu chuyện",
    featured: "Câu chuyện nổi bật",
    readStory: "Đọc bài viết",
    upcomingEyebrow: "Lịch hoạt động",
    upcomingTitle: "Sự kiện sắp tới",
    upcomingDescription:
      "Ngày, giờ và địa điểm được trình bày ngắn gọn để bạn quyết định và chuẩn bị tham gia.",
    eventCount: "sự kiện đang mở",
    noEventsTitle: "Lịch hoạt động đang được cập nhật",
    noEventsDescription:
      "Các workshop, seminar và hoạt động mới sẽ xuất hiện tại đây ngay khi được công bố.",
    register: "Thông tin tham gia",
    storyEyebrow: "Nhịp sống Biotech TTU",
    storyTitle: "Câu chuyện từ các hoạt động",
    storyDescription:
      "Nhìn lại những workshop, cuộc thi và trải nghiệm kết nối đã diễn ra trong cộng đồng Biotech TTU.",
    noStories: "Chưa có bài viết hoạt động được công bố.",
    readMore: "Xem chi tiết",
    joinTitle: "Chọn cách bạn muốn tham gia.",
    joinDescription:
      "Bắt đầu từ một workshop, một dự án hoặc một cơ hội thực tập phù hợp với mục tiêu của bạn.",
    handbook: "Mở sổ tay sinh viên",
    careers: "Xem việc làm & thực tập",
    contact: "Liên hệ Khoa",
    fallbackCaption: "Học tập · Kết nối · Trưởng thành",
  },
  en: {
    eyebrow: "Student activities",
    title: "Activities that shape the Biotech TTU experience.",
    description:
      "Workshops, competitions, community projects and shared experiences help students learn beyond the classroom.",
    upcomingLink: "View upcoming events",
    storiesLink: "Explore stories",
    featured: "Featured story",
    readStory: "Read the story",
    upcomingEyebrow: "Activity calendar",
    upcomingTitle: "Upcoming events",
    upcomingDescription:
      "Dates, times and locations are kept concise so you can decide and prepare quickly.",
    eventCount: "open events",
    noEventsTitle: "The activity calendar is being updated",
    noEventsDescription:
      "New workshops, seminars and student activities will appear here as soon as they are published.",
    register: "Participation details",
    storyEyebrow: "Life at Biotech TTU",
    storyTitle: "Stories from student activities",
    storyDescription:
      "Revisit workshops, competitions and shared experiences from across the Biotech TTU community.",
    noStories: "No activity stories have been published yet.",
    readMore: "View details",
    joinTitle: "Choose how you want to take part.",
    joinDescription:
      "Start with a workshop, project or internship opportunity that matches your direction.",
    handbook: "Open the student handbook",
    careers: "View jobs & internships",
    contact: "Contact the School",
    fallbackCaption: "Learn · Connect · Grow",
  },
} as const;

const formatDate = (value: string, locale: SiteLocale) =>
  new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const formatTime = (event: Event, locale: SiteLocale) => {
  const formatter = new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const start = formatter.format(new Date(event.startAt));
  return event.endAt
    ? `${start} – ${formatter.format(new Date(event.endAt))}`
    : start;
};

export default function StudentActivitiesPageContent({
  locale,
  events,
  stories,
}: {
  locale: SiteLocale;
  events: Event[];
  stories: News[];
}) {
  const copy = copyByLocale[locale];
  const newsPath = locale === "vi" ? "/vi/tin-tuc" : "/en/news";
  const studentPath = locale === "vi" ? "/vi/sinh-vien" : "/en/students";
  const sortedStories = [...stories].sort(
    (a, b) =>
      new Date(b.publishedAt || b.createdAt).getTime() -
      new Date(a.publishedAt || a.createdAt).getTime(),
  );
  const featuredStory = sortedStories.find((item) => item.coverImage) ?? sortedStories[0];
  const remainingStories = sortedStories.filter((item) => item.id !== featuredStory?.id);
  const featuredImage = featuredStory?.coverImage || "/assets/biotech/hero-biotechnology.png";
  const eventTitle = (event: Event) =>
    locale === "en" ? event.titleEn || event.titleVi : event.titleVi;
  const eventDescription = (event: Event) =>
    locale === "en"
      ? event.descriptionEn || event.descriptionVi
      : event.descriptionVi;
  const eventLocation = (event: Event) =>
    locale === "en" ? event.locationEn || event.locationVi : event.locationVi;

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#171b25]">
      <section className="border-b border-[#171b25]/15 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16 lg:pb-20 lg:pt-16">
          <div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#777b77]">
              {copy.eyebrow}
            </div>
            <h1 className="mt-7 max-w-[12ch] text-[3rem] font-semibold leading-[0.96] tracking-[-0.065em] text-balance sm:text-[4rem] lg:text-[4.8rem]">
              {copy.title}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#626661] sm:text-lg">
              {copy.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#lich-su-kien"
                className="inline-flex min-h-12 items-center rounded-full bg-[#139C48] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0F7E3A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
              >
                {copy.upcomingLink}
              </a>
              <a
                href="#cau-chuyen"
                className="text-sm font-semibold text-[#12312B] underline decoration-[#139C48]/35 underline-offset-8 transition-colors hover:text-[#139C48] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
              >
                {copy.storiesLink}
              </a>
            </div>
          </div>

          <figure className="group relative aspect-[16/10] overflow-hidden rounded-[0.75rem] bg-[#eee5de]">
            <img
              src={featuredImage}
              alt={featuredStory?.title || copy.fallbackCaption}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171b25]/85 via-[#171b25]/10 to-transparent" />
            <figcaption className="absolute inset-x-6 bottom-6 text-white sm:inset-x-8 sm:bottom-8">
              <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-white/75">
                {featuredStory ? copy.featured : copy.fallbackCaption}
              </p>
              {featuredStory && (
                <>
                  <h2 className="mt-3 line-clamp-3 max-w-[34rem] text-xl font-bold leading-[1.25] tracking-[-0.025em] text-balance sm:text-2xl">
                    {featuredStory.title}
                  </h2>
                  <Link
                    href={`${newsPath}/${featuredStory.slug}`}
                    className="mt-4 inline-flex text-xs font-semibold text-white underline decoration-white/45 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {copy.readStory}
                  </Link>
                </>
              )}
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="lich-su-kien" className="scroll-mt-24 bg-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-[#139C48]">
                {copy.upcomingEyebrow}
              </p>
              <h2 className="mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-[-0.045em] sm:text-[3rem]">
                {copy.upcomingTitle}
              </h2>
            </div>
            <div className="flex items-end justify-between gap-6 border-l-2 border-[#139C48] pl-5">
              <p className="max-w-lg text-sm leading-7 text-[#686c67]">
                {copy.upcomingDescription}
              </p>
              <span className="shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#8a8d88]">
                {String(events.length).padStart(2, "0")} {copy.eventCount}
              </span>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="mt-10 grid gap-4 border-y border-[#d8d3ce] py-8 sm:grid-cols-[0.85fr_1.15fr] sm:items-center sm:gap-12">
              <h3 className="text-xl font-bold tracking-[-0.025em]">
                {copy.noEventsTitle}
              </h3>
              <p className="text-sm leading-7 text-[#686c67]">
                {copy.noEventsDescription}
              </p>
            </div>
          ) : (
            <div className="mt-10 border-t-2 border-[#171b25]">
              {events.map((event, index) => {
                const date = new Date(event.startAt);
                return (
                  <article
                    key={event.id}
                    className="grid gap-5 border-b border-[#d8d3ce] py-7 sm:grid-cols-[6rem_1fr] lg:grid-cols-[7rem_minmax(0,1fr)_17rem] lg:items-center lg:gap-10"
                  >
                    <time dateTime={event.startAt} className="flex items-baseline gap-2 sm:block">
                      <span className="font-mono text-[2.4rem] font-medium leading-none tracking-[-0.07em] text-[#139C48]">
                        {String(date.getDate()).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-[#8a8d88] sm:mt-2 sm:block">
                        {new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
                          month: "short",
                          year: "numeric",
                        }).format(date)}
                      </span>
                    </time>

                    <div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[#858985]">
                        <span>{formatTime(event, locale)}</span>
                        <span aria-hidden>·</span>
                        <span>{eventLocation(event)}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold leading-snug tracking-[-0.025em] sm:text-2xl">
                        {eventTitle(event)}
                      </h3>
                      {eventDescription(event) && (
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#626661]">
                          {eventDescription(event)}
                        </p>
                      )}
                    </div>

                    <div className="lg:text-right">
                      <span className="font-mono text-[0.52rem] uppercase tracking-[0.1em] text-[#9a9d98]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {event.registrationUrl && (
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-5 inline-flex text-sm font-semibold text-[#139C48] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48] lg:ml-0 lg:mt-3"
                        >
                          {copy.register} <ArrowIcon direction="up-right" size={16} />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section id="cau-chuyen" className="scroll-mt-24 border-y border-[#171b25]/15 bg-[#f5f7f4] py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-[#139C48]">
                {copy.storyEyebrow}
              </p>
              <h2 className="mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-[-0.045em] sm:text-[3rem]">
                {copy.storyTitle}
              </h2>
            </div>
            <p className="max-w-xl border-l-2 border-[#139C48] pl-5 text-sm leading-7 text-[#686c67]">
              {copy.storyDescription}
            </p>
          </div>

          {remainingStories.length === 0 ? (
            <p className="border-t-2 border-[#171b25] py-8 text-sm text-[#686c67]">
              {copy.noStories}
            </p>
          ) : (
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {remainingStories.map((story, index) => (
                <article key={story.id} className="group border-t-2 border-[#171b25] pt-4">
                  <Link
                    href={`${newsPath}/${story.slug}`}
                    className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#eee5de]">
                      {story.coverImage ? (
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                      ) : (
                        <div className="relative flex h-full flex-col justify-between overflow-hidden p-5">
                          <span className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-[#139C48]">
                            Biotech TTU Activity
                          </span>
                          <span className="font-mono text-[3.25rem] font-medium tracking-[-0.08em] text-[#139C48]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="absolute -bottom-12 -right-8 h-44 w-44 rounded-full border border-[#139C48]/20" />
                        </div>
                      )}
                    </div>
                    <div className="py-5">
                      <time
                        dateTime={story.publishedAt || story.createdAt}
                        className="font-mono text-[0.55rem] uppercase tracking-[0.11em] text-[#8a8d88]"
                      >
                        {formatDate(story.publishedAt || story.createdAt, locale)}
                      </time>
                      <h3 className="mt-3 text-lg font-bold leading-[1.35] tracking-[-0.025em] text-balance transition-colors group-hover:text-[#139C48]">
                        {story.title}
                      </h3>
                      {story.summary && (
                        <p className="mt-3 line-clamp-3 text-[0.8rem] leading-6 text-[#666a65]">
                          {story.summary}
                        </p>
                      )}
                      <span className="mt-5 inline-flex text-xs font-semibold text-[#139C48] underline underline-offset-4">
                        {copy.readMore}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <div>
            <h2 className="max-w-lg text-[2rem] font-bold leading-[1.08] tracking-[-0.04em] sm:text-[2.6rem]">
              {copy.joinTitle}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#626661]">
              {copy.joinDescription}
            </p>
          </div>
          <nav className="grid border-t-2 border-[#171b25] sm:grid-cols-3">
            {[
              [copy.handbook, `${studentPath}/${locale === "vi" ? "so-tay" : "handbook"}`],
              [copy.careers, `${studentPath}/${locale === "vi" ? "viec-lam" : "jobs"}`],
              [copy.contact, "https://www.facebook.com/biotech.ttu.edu.vn"],
            ].map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group flex min-h-28 items-center justify-between gap-4 border-b border-[#d8d3ce] px-4 py-5 transition-colors hover:bg-[#fbf6f2] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#139C48] sm:border-r ${index === 2 ? "sm:border-r-0" : ""}`}
              >
                <span className="text-sm font-semibold transition-colors group-hover:text-[#139C48]">
                  {label}
                </span>
                <span aria-hidden className="text-[#139C48] transition-transform group-hover:translate-x-1">
                  <ArrowIcon direction="right" size={16} />
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
