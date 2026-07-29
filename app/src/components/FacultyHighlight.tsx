"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { mockFaculty } from "@/lib/mock-content";

type SiteLocale = "vi" | "en";

const copy = {
  vi: {
    title: "Đội ngũ giảng viên",
    intro:
      "Những người kết nối giảng dạy, nghiên cứu và ứng dụng công nghệ sinh học tại Khoa.",
    link: "Xem toàn bộ giảng viên",
    role: "Giảng viên cơ hữu",
  },
  en: {
    title: "Meet our faculty",
    intro:
      "Meet the people connecting teaching, research and applied biotechnology at the School.",
    link: "View all faculty",
    role: "Full-time lecturer",
  },
} as const;

export default function FacultyHighlight() {
  const locale = useLocale() as SiteLocale;
  const reduceMotion = useReducedMotion();
  const content = copy[locale];
  const faculty = mockFaculty.filter((item) => item.isActive !== false);
  const facultyHref =
    locale === "vi" ? `/${locale}/giang-vien` : `/${locale}/faculty`;

  return (
    <section className="px-5 pb-24 sm:px-8 md:pb-32">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-5 border-b border-[#d8dad7] pb-6 md:grid-cols-12 md:items-end"
      >
        <h2 className="text-[2.15rem] font-semibold leading-none tracking-[-0.055em] text-[#111311] sm:text-[2.6rem] md:col-span-5">
          {content.title}
        </h2>
        <p className="max-w-[31rem] text-[0.76rem] leading-[1.6] text-[#747974] md:col-span-4">
          {content.intro}
        </p>
        <Link
          href={facultyHref}
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#cfd2ce] px-4 py-2 text-[0.67rem] font-medium text-[#5f635f] transition-[background-color,border-color,color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#139C48] hover:bg-[#139C48] hover:text-white active:scale-[0.98] md:col-span-3 md:justify-self-end"
        >
          {content.link}
          <ArrowIcon direction="right" size={11} />
        </Link>
      </motion.div>

      <div className="grid gap-x-5 gap-y-12 pt-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-6">
        {faculty.map((person, index) => {
          const portrait = person.avatarUrl;

          return (
            <motion.article
              key={person.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="min-w-0"
            >
              <Link href={facultyHref} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-[0.8rem] bg-[#eef0ec]">
                  {portrait ? (
                    <img
                      src={portrait}
                      alt={person.fullName}
                      loading="lazy"
                      className="h-full w-full object-cover object-top saturate-[0.92] transition-[transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-hover:saturate-100"
                    />
                  ) : (
                    <div className="flex h-full items-end bg-[#eef0ec] p-5">
                      <span className="text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-none tracking-[-0.08em] text-[#c6cbc5]">
                        {person.fullName
                          .replace(/^(TS\.|ThS\.|NCS\.|PGS\.|GS\.)\s*/u, "")
                          .split(/\s+/)
                          .slice(-2)
                          .map((part) => part.charAt(0))
                          .join("")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-start justify-between gap-3 border-t border-[#d8dad7] pt-3">
                  <div className="min-w-0">
                    <h3 className="text-[0.94rem] font-semibold leading-[1.25] tracking-[-0.025em] text-[#111311] transition-colors group-hover:text-[#139C48] sm:text-[1rem]">
                      {person.fullName}
                    </h3>
                    <p className="mt-1.5 text-[0.63rem] leading-[1.45] text-[#777c77]">
                      {person.position || content.role}
                    </p>
                  </div>
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#cfd2ce] text-[#686d68] transition-[background-color,border-color,color,transform] duration-500 group-hover:translate-x-0.5 group-hover:border-[#139C48] group-hover:bg-[#139C48] group-hover:text-white">
                    <ArrowIcon direction="up-right" size={11} />
                  </span>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
