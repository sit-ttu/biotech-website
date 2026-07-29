import type { Alumni, AlumniSection } from "@/lib/api";
import type { SiteLocale } from "@/lib/program-pages";

import EditorialCta from "@/components/EditorialCta";
import { ArrowIcon } from "@/components/icons/ArrowIcon";

const copyByLocale = {
  vi: {
    eyebrow: "Cựu sinh viên Biotech TTU",
    title: "Những hành trình tiếp nối từ Biotech TTU.",
    description:
      "Gặp gỡ các thế hệ cựu sinh viên, khám phá hướng đi nghề nghiệp và những dấu ấn được hình thành từ nền tảng học tập tại Khoa Công nghệ Sinh học.",
    countLabel: "hồ sơ công khai",
    explore: "Khám phá hồ sơ",
    connect: "Kết nối với Khoa",
    featuredEyebrow: "Gương mặt nổi bật",
    featuredTitle: "Một hành trình được kể bằng trải nghiệm thật.",
    directoryEyebrow: "Mạng lưới Biotech TTU",
    directoryTitle: "Cựu sinh viên theo từng dấu mốc.",
    directoryDescription:
      "Hồ sơ được tổ chức theo các nhóm nội dung do Khoa quản lý, giúp người đọc tìm đúng câu chuyện và hướng nghề nghiệp quan tâm.",
    otherTitle: "Các hồ sơ khác",
    emptyTitle: "Hồ sơ cựu sinh viên đang được cập nhật",
    emptyDescription:
      "Dữ liệu đã được kết nối với hệ thống quản trị. Những hồ sơ được xác minh và đặt ở chế độ công khai sẽ xuất hiện tại đây.",
    alumniCta: "Bạn là cựu sinh viên Biotech TTU?",
    alumniCtaDescription:
      "Chia sẻ dấu mốc học tập, công việc hoặc câu chuyện nghề nghiệp để cùng xây dựng mạng lưới Biotech TTU.",
    alumniCtaAction: "Gửi thông tin cho Khoa",
    career: "Hành trình nghề nghiệp",
    achievements: "Dấu ấn nổi bật",
    graduation: "Tốt nghiệp",
    current: "Hiện tại",
    profileFallback: "Câu chuyện nghề nghiệp đang được cập nhật.",
  },
  en: {
    eyebrow: "Biotech TTU alumni",
    title: "Journeys that continue beyond Biotech TTU.",
    description:
      "Meet generations of Biotech TTU alumni, explore their career directions and discover the paths shaped by their studies at the School of Biotechnology.",
    countLabel: "public profiles",
    explore: "Explore profiles",
    connect: "Connect with the School",
    featuredEyebrow: "Featured alumni",
    featuredTitle: "A journey told through real experience.",
    directoryEyebrow: "Biotech TTU network",
    directoryTitle: "Alumni across different milestones.",
    directoryDescription:
      "Profiles are organised into School-managed groups, helping visitors find the stories and career directions most relevant to them.",
    otherTitle: "More profiles",
    emptyTitle: "Alumni profiles are being updated",
    emptyDescription:
      "The page is connected to the management system. Verified profiles marked as public will appear here.",
    alumniCta: "Are you an Biotech TTU alumnus?",
    alumniCtaDescription:
      "Share a learning milestone, career update or professional story and help strengthen the Biotech TTU network.",
    alumniCtaAction: "Share your update",
    career: "Career journey",
    achievements: "Selected milestones",
    graduation: "Graduated",
    current: "Present",
    profileFallback: "This career story is being updated.",
  },
} as const;

const getSectionMember = (alumnus: Alumni, sectionId?: string) =>
  sectionId
    ? alumnus.sectionMembers?.find((member) => member.sectionId === sectionId)
    : undefined;

const getCurrentCareer = (alumnus: Alumni) =>
  [...(alumnus.careers ?? [])].sort((a, b) => {
    if (a.endYear == null && b.endYear != null) return -1;
    if (a.endYear != null && b.endYear == null) return 1;
    return (b.startYear ?? 0) - (a.startYear ?? 0);
  })[0];

function AlumniCard({
  alumnus,
  locale,
  sectionId,
  featured = false,
}: {
  alumnus: Alumni;
  locale: SiteLocale;
  sectionId?: string;
  featured?: boolean;
}) {
  const copy = copyByLocale[locale];
  const member = getSectionMember(alumnus, sectionId);
  const career = getCurrentCareer(alumnus);
  const profileTitle =
    member?.customTitle ||
    (career ? `${career.role} · ${career.organization}` : alumnus.program || alumnus.degree);
  const story =
    member?.customQuote || alumnus.shortBio || alumnus.personalStory || copy.profileFallback;
  const publicContacts = (alumnus.contacts ?? []).filter(
    (contact) => contact.url && (!contact.visibility || contact.visibility === "public"),
  );

  return (
    <article
      className={`group grid overflow-hidden border border-[#d8d3ce] bg-white ${
        featured ? "lg:grid-cols-[0.82fr_1.18fr]" : "grid-rows-[auto_1fr]"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[#eee5de] ${
          featured ? "min-h-[22rem]" : "aspect-[4/3]"
        }`}
      >
        {alumnus.avatarUrl ? (
          <img
            src={alumnus.avatarUrl}
            alt={alumnus.fullName}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="relative flex h-full min-h-[16rem] items-end overflow-hidden p-6">
            <span className="font-mono text-[4rem] font-medium leading-none tracking-[-0.08em] text-[#139C48]">
              {alumnus.fullName
                .split(" ")
                .slice(-2)
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </span>
            <span className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-[#139C48]/25" />
            <span className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-[#139C48]/25" />
          </div>
        )}
      </div>

      <div className={`flex flex-col ${featured ? "p-7 sm:p-10 lg:p-12" : "p-6"}`}>
        <div className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-[#8a8d88]">
          {alumnus.graduationYear ? `${copy.graduation} ${alumnus.graduationYear}` : copy.eyebrow}
        </div>
        <h3
          className={`mt-4 font-bold leading-tight tracking-[-0.035em] ${
            featured ? "text-[2rem] sm:text-[2.5rem]" : "text-2xl"
          }`}
        >
          {alumnus.fullName}
        </h3>
        {profileTitle && (
          <p className="mt-3 text-sm font-semibold leading-6 text-[#139C48]">
            {profileTitle}
          </p>
        )}
        <p className={`mt-5 text-[#626661] ${featured ? "text-base leading-8" : "text-sm leading-7"}`}>
          {story}
        </p>

        {(alumnus.careers?.length || alumnus.achievements?.length) && (
          <div className="mt-7 grid gap-6 border-t border-[#d8d3ce] pt-6 sm:grid-cols-2">
            {alumnus.careers && alumnus.careers.length > 0 && (
              <div>
                <p className="font-mono text-[0.54rem] uppercase tracking-[0.12em] text-[#8a8d88]">
                  {copy.career}
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4f534f]">
                  {alumnus.careers.slice(0, featured ? 3 : 2).map((item) => (
                    <li key={item.id}>
                      <strong className="font-semibold text-[#171b25]">{item.role}</strong>
                      <span> · {item.organization}</span>
                      {(item.startYear || item.endYear) && (
                        <span className="block text-xs text-[#858985]">
                          {item.startYear || ""}
                          {item.startYear && " – "}
                          {item.endYear || copy.current}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {alumnus.achievements && alumnus.achievements.length > 0 && (
              <div>
                <p className="font-mono text-[0.54rem] uppercase tracking-[0.12em] text-[#8a8d88]">
                  {copy.achievements}
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4f534f]">
                  {alumnus.achievements.slice(0, featured ? 3 : 2).map((item) => (
                    <li key={item.id}>
                      {item.title}
                      {item.year ? ` · ${item.year}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {publicContacts.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-7">
            {publicContacts.map((contact) => (
              <a
                key={contact.id}
                href={contact.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold capitalize text-[#139C48] underline decoration-[#139C48]/35 underline-offset-4 hover:decoration-[#139C48] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
              >
                {contact.type} <ArrowIcon direction="up-right" size={16} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function AlumniPageContent({
  locale,
  alumni,
  sections,
}: {
  locale: SiteLocale;
  alumni: Alumni[];
  sections: AlumniSection[];
}) {
  const copy = copyByLocale[locale];
  const featured =
    alumni.find((item) => item.sectionMembers?.some((member) => member.isFeatured)) ??
    alumni[0];
  const visibleSections = sections
    .map((section) => ({
      section,
      members: alumni
        .filter((item) => item.sectionMembers?.some((member) => member.sectionId === section.id))
        .sort((a, b) => {
          const aOrder = getSectionMember(a, section.id)?.displayOrder ?? 0;
          const bOrder = getSectionMember(b, section.id)?.displayOrder ?? 0;
          return aOrder - bOrder;
        }),
    }))
    .filter((group) => group.members.length > 0);
  const sectionMemberIds = new Set(visibleSections.flatMap((group) => group.members.map((item) => item.id)));
  const otherAlumni = alumni.filter((item) => !sectionMemberIds.has(item.id));

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#171b25]">
      <section className="border-b border-[#d9e3d8] bg-[#f1f5f0]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-20 lg:pb-20 lg:pt-16">
          <div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#777b77]">
              {copy.eyebrow}
            </div>
            <h1 className="mt-7 max-w-[12ch] text-[3rem] font-semibold leading-[1.15] tracking-[-0.035em] text-balance sm:text-[4rem] lg:text-[4.8rem]">
              {copy.title}
            </h1>
          </div>

          <div className="border-t border-[#bfc9be] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="max-w-xl text-base leading-8 text-[#626661] sm:text-lg">
              {copy.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#mang-luoi"
                className="inline-flex min-h-12 items-center rounded-full bg-[#139C48] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0F7E3A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
              >
                {copy.explore}
              </a>
              <a
                href="https://www.facebook.com/biotech.ttu.edu.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#12312B] underline decoration-[#139C48]/35 underline-offset-8 transition-colors hover:text-[#139C48] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]"
              >
                {copy.connect} <ArrowIcon direction="up-right" size={16} />
              </a>
            </div>
            <div className="mt-8 border-t border-[#d8d3ce] pt-5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#8a8d88]">
              <strong className="mr-2 text-xl font-medium tracking-[-0.04em] text-[#171b25]">
                {String(alumni.length).padStart(2, "0")}
              </strong>
              {copy.countLabel}
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section className="bg-[#f5f7f4] py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-9 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
              <div>
                <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-[#139C48]">
                  {copy.featuredEyebrow}
                </p>
                <h2 className="mt-4 max-w-[14ch] text-[2.25rem] font-bold leading-[1.05] tracking-[-0.045em] sm:text-[3rem]">
                  {copy.featuredTitle}
                </h2>
              </div>
            </div>
            <AlumniCard alumnus={featured} locale={locale} featured />
          </div>
        </section>
      )}

      <section id="mang-luoi" className="scroll-mt-24 bg-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-[#139C48]">
                {copy.directoryEyebrow}
              </p>
              <h2 className="mt-4 max-w-[14ch] text-[2.25rem] font-bold leading-[1.05] tracking-[-0.045em] sm:text-[3rem]">
                {copy.directoryTitle}
              </h2>
            </div>
            <p className="max-w-xl border-l-2 border-[#139C48] pl-5 text-sm leading-7 text-[#686c67]">
              {copy.directoryDescription}
            </p>
          </div>

          {alumni.length === 0 ? (
            <div className="mt-12 grid gap-5 border-y-2 border-[#171b25] py-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
              <h3 className="max-w-lg text-[1.75rem] font-bold leading-tight tracking-[-0.035em] sm:text-[2.15rem]">
                {copy.emptyTitle}
              </h3>
              <p className="max-w-2xl text-sm leading-7 text-[#666a65] sm:text-base">
                {copy.emptyDescription}
              </p>
            </div>
          ) : (
            <div className="mt-12 space-y-16">
              {visibleSections.map(({ section, members }) => (
                <section key={section.id}>
                  <div className="grid gap-4 border-t-2 border-[#171b25] py-6 sm:grid-cols-[0.75fr_1.25fr]">
                    <h3 className="text-2xl font-bold tracking-[-0.03em]">
                      {locale === "vi" ? section.titleVi || section.titleEn : section.titleEn || section.titleVi}
                    </h3>
                    {(section.descriptionVi || section.descriptionEn) && (
                      <p className="max-w-2xl text-sm leading-7 text-[#686c67]">
                        {locale === "vi"
                          ? section.descriptionVi || section.descriptionEn
                          : section.descriptionEn || section.descriptionVi}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    {members.map((alumnus) => (
                      <AlumniCard
                        key={`${section.id}-${alumnus.id}`}
                        alumnus={alumnus}
                        locale={locale}
                        sectionId={section.id}
                      />
                    ))}
                  </div>
                </section>
              ))}

              {otherAlumni.length > 0 && (
                <section>
                  <h3 className="border-t-2 border-[#171b25] py-6 text-2xl font-bold tracking-[-0.03em]">
                    {copy.otherTitle}
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {otherAlumni.map((alumnus) => (
                      <AlumniCard key={alumnus.id} alumnus={alumnus} locale={locale} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </section>

      <EditorialCta
        title={copy.alumniCta}
        description={copy.alumniCtaDescription}
        primaryLabel={copy.alumniCtaAction}
        primaryHref="mailto:secretary.sbio@ttu.edu.vn?subject=Biotech TTU%20Alumni"
      />
    </main>
  );
}
