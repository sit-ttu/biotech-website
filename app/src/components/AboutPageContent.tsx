"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { api, type Faculty } from "@/lib/api";
import { mockFaculty } from "@/lib/mock-content";

const AboutPageContent = () => {
  const t = useTranslations("about");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [faculty, setFaculty] = useState<Faculty[]>(mockFaculty);

  const programsHref =
    locale === "vi" ? `/${locale}/chuong-trinh-dao-tao` : `/${locale}/programs`;
  const facultyHref =
    locale === "vi" ? `/${locale}/giang-vien` : `/${locale}/faculty`;
  const programQualities = t.raw("programQualitiesList") as string[];

  useEffect(() => {
    let active = true;

    api.faculty
      .findAll()
      .then((data) => {
        const published = data.filter((member) => member.isActive !== false);
        if (active && published.length > 0) setFaculty(published);
      })
      .catch(() => {
        // Keep the local faculty preview when the API is unavailable on Vercel.
      });

    return () => {
      active = false;
    };
  }, []);

  const operatingItems = [
    {
      title: t("outcomeBasedEducationTitle"),
      description: t("outcomeBasedEducationDescription"),
    },
    {
      title: t("researchApplicationTitle"),
      description: t("researchApplicationDescription"),
    },
    {
      title: t("internationalIntegrationTitle"),
      description: t("internationalIntegrationDescription"),
    },
  ];

  const educationItems = [
    {
      title: t("scientificThinkingTitle"),
      description: t("scientificThinkingDescription"),
    },
    {
      title: t("professionalCompetenceTitle"),
      description: t("professionalCompetenceDescription"),
    },
    {
      title: t("professionalQualitiesTitle"),
      description: t("professionalQualitiesDescription"),
    },
  ];

  const historyItems = [
    {
      year: "01",
      title: t("agricultureAquacultureTitle"),
      description: t("agricultureAquacultureDescription"),
      image: "/assets/ttu/about-tan-tao-campus.jpg",
    },
    {
      year: "02",
      title: t("biomedicalTitle"),
      description: t("biomedicalDescription"),
      image: "/assets/biotech/biotech-hackathon-2026.jpg",
    },
    {
      year: "03",
      title: t("environmentFoodDataTitle"),
      description: t("environmentFoodDataDescription"),
      image: "/assets/biotech/program-biotechnology-lab.webp",
    },
  ];

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="overflow-hidden bg-white text-[#111311]">
      <section className="px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20">
        <motion.div
          className="mx-auto max-w-7xl"
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#737873]">
            {locale === "vi" ? "Giới thiệu Khoa" : "About the School"}
          </p>
          <h1 className="mt-6 max-w-[12ch] text-[clamp(3rem,7vw,7.2rem)] font-semibold leading-[1.1] tracking-[-0.06em] text-balance">
            {locale === "vi"
              ? "Về Khoa Công nghệ Sinh học"
              : "About the School of Biotechnology"}
          </h1>

          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
            <div className="md:col-span-3 md:pb-2">
              <p className="max-w-[19rem] text-[0.82rem] leading-7 text-[#626862]">
                {t("description")}
              </p>
              <Link
                href={programsHref}
                className="group mt-8 inline-flex min-h-11 items-center gap-3 rounded-full border border-[#bfc7bf] px-5 text-[0.72rem] font-semibold text-[#4c534c] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#139C48] hover:text-[#139C48]"
              >
                {t("explorePrograms")}
                <ArrowIcon direction="right" size={12} />
              </Link>
            </div>

            <figure className="md:col-start-5 md:col-span-8">
              <div className="relative aspect-[1.58/1] overflow-hidden rounded-[1rem] bg-[#e8eae7]">
                <Image
                  src="/assets/ttu/about-tan-tao-campus.jpg"
                  alt={t("heroImageAlt")}
                  fill
                  priority
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl border-t border-[#d8dad7] pt-14 md:pt-20">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 className="max-w-[9ch] text-[clamp(2.65rem,4.5vw,4.6rem)] font-semibold leading-[1.1] tracking-[-0.055em] text-balance md:col-span-4">
              {t("howWeEducate")}
            </h2>
            <p className="max-w-[34rem] text-[0.82rem] leading-7 text-[#626862] md:col-start-7 md:col-span-6">
              {t("learningOutcomesDescription")}
            </p>
          </div>

          <div className="mt-12 grid border-t border-[#d8dad7] lg:grid-cols-3">
            {educationItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="border-b border-[#d8dad7] py-8 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="font-mono text-[0.68rem] text-[#139C48]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-[1.3rem] font-semibold leading-[1.3] tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-[25rem] text-[0.78rem] leading-7 text-[#656b65]">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl border-t border-[#d8dad7] pt-14 md:pt-20">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 className="max-w-[10ch] text-[clamp(2.65rem,4.5vw,4.6rem)] font-semibold leading-[1.1] tracking-[-0.055em] text-balance md:col-span-4">
              {t("programOrientationTitle")}
            </h2>
            <p className="max-w-[34rem] text-[0.82rem] leading-7 text-[#626862] md:col-start-7 md:col-span-6">
              {t("programOrientationDescription")}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <motion.figure
              className="lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              variants={reveal}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[1.4/1] overflow-hidden rounded-[1rem] bg-[#e8eae7]">
                <Image
                  src="/assets/biotech/program-applied-biology-tissue-culture.webp"
                  alt={t("organizationalStructureTitle")}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.figure>

            <div className="grid border-t border-[#d8dad7] lg:col-span-5 lg:grid-rows-3">
              {operatingItems.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  variants={reveal}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="grid gap-5 border-b border-[#d8dad7] py-7 sm:grid-cols-[2.5rem_0.8fr_1.25fr] sm:items-start lg:grid-cols-[2.5rem_1fr] lg:content-center lg:gap-x-5 lg:gap-y-3"
                >
                  <span className="font-mono text-[0.68rem] text-[#139C48]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.12rem] font-semibold leading-[1.3] tracking-[-0.025em]">
                    {item.title}
                  </h3>
                  <p className="max-w-[28rem] text-[0.78rem] leading-6 text-[#656b65] sm:col-start-3 lg:col-start-2">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl border-t border-[#d8dad7] pt-14 md:pt-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <h2 className="max-w-[8ch] text-[clamp(2.65rem,4.5vw,4.6rem)] font-semibold leading-[1.1] tracking-[-0.055em] text-balance md:col-span-4">
              {locale === "vi" ? "Đội ngũ học thuật" : "Academic faculty"}
            </h2>
            <p className="max-w-[33rem] text-[0.82rem] leading-7 text-[#626862] md:col-start-6 md:col-span-5">
              {t("facultyText")}
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
            <motion.figure
              className="md:col-span-4"
              initial="hidden"
              whileInView="visible"
              variants={reveal}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-[#e8eae7]">
                <Image
                  src="/assets/biotech/program-biotechnology-lab.webp"
                  alt={t("facultyExcellenceTitle")}
                  fill
                  sizes="(min-width: 768px) 34vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.figure>

            <div className="md:col-start-6 md:col-span-7">
              <div className="border-t border-[#d8dad7]">
                {faculty.slice(0, 4).map((member, index) => {
                  const memberHref =
                    locale === "vi"
                      ? `/${locale}/giang-vien/${member.slug}`
                      : facultyHref;

                  return (
                    <motion.article
                      key={member.id}
                      initial="hidden"
                      whileInView="visible"
                      variants={reveal}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.05 }}
                      className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#d8dad7] py-6 sm:items-center"
                    >
                      <div>
                        <p className="text-[0.65rem] font-semibold text-[#139C48]">
                          {member.position || t("facultyExcellenceTitle")}
                        </p>
                        <h3 className="mt-1.5 text-[1.12rem] font-semibold tracking-[-0.025em]">
                          {member.fullName}
                        </h3>
                        <p className="mt-2 max-w-[34rem] text-[0.76rem] leading-6 text-[#666c66]">
                          {member.bioShort || t("facultyText")}
                        </p>
                      </div>
                      <Link
                        href={memberHref}
                        aria-label={`${member.fullName} — ${t("faculty")}`}
                        className="grid size-10 place-items-center rounded-full border border-[#cbd0ca] text-[#545a54] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#139C48] hover:text-[#139C48]"
                      >
                        <ArrowIcon direction="right" size={12} />
                      </Link>
                    </motion.article>
                  );
                })}
              </div>

              <Link
                href={facultyHref}
                className="group mt-8 inline-flex min-h-11 items-center gap-3 rounded-full border border-[#bfc7bf] px-5 text-[0.72rem] font-semibold text-[#4c534c] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#139C48] hover:text-[#139C48]"
              >
                {locale === "vi" ? "Xem tất cả giảng viên" : "View all faculty"}
                <ArrowIcon direction="right" size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl border-t border-[#d8dad7] pt-14 md:pt-20">
          <div className="grid gap-10 md:grid-cols-12">
            <h2 className="max-w-[9ch] text-[clamp(2.65rem,4.5vw,4.6rem)] font-semibold leading-[1.1] tracking-[-0.055em] text-balance md:col-span-4">
              {t("mission")} &amp; {t("vision").toLocaleLowerCase(locale)}
            </h2>

            <article className="md:col-start-6 md:col-span-3">
              <h3 className="text-lg font-semibold text-[#139C48]">{t("mission")}</h3>
              <p className="mt-4 text-[0.8rem] leading-7 text-[#626862]">{t("missionText")}</p>
            </article>

            <article className="border-t border-[#d8dad7] pt-9 md:col-span-4 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <h3 className="text-lg font-semibold text-[#139C48]">{t("vision")}</h3>
              <p className="mt-4 text-[0.8rem] leading-7 text-[#626862]">{t("visionText")}</p>
            </article>
          </div>

          <motion.figure
            className="mt-12"
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
          >
            <div className="relative aspect-[2.25/1] overflow-hidden rounded-[1rem] bg-[#e8eae7]">
              <Image
                src="/assets/biotech/program-applied-biology-tissue-culture.webp"
                alt={t("whatWeDo")}
                fill
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          </motion.figure>

          <div className="mt-10 grid gap-6 border-y border-[#d8dad7] py-7 md:grid-cols-[12rem_1fr] md:items-center">
            <p className="text-[0.78rem] font-semibold">{t("programQualitiesTitle")}</p>
            <div className="grid grid-cols-2 gap-x-7 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
              {programQualities.map((quality, index) => (
                <span
                  key={quality}
                  className="inline-flex items-baseline gap-2 text-[0.7rem] font-medium text-[#5f655f]"
                >
                  <span className="font-mono text-[0.56rem] text-[#139C48]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {quality}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="history" className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl border-t border-[#d8dad7] pt-14 md:pt-20">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <h2 className="max-w-[8ch] text-[clamp(2.65rem,4.5vw,4.6rem)] font-semibold leading-[1.1] tracking-[-0.055em] text-balance">
                {t("applicationAreasTitle")}
              </h2>
              <div className="relative mt-12 aspect-square max-w-[22rem] rounded-full border border-[#bfc4bf]">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[clamp(3.8rem,7vw,6.5rem)] font-semibold leading-none tracking-[-0.075em] text-[#139C48]">
                    OBE
                  </span>
                  <span className="mt-3 max-w-[9rem] text-[0.65rem] font-medium leading-5 text-[#555b55]">
                    {t("trainingModelLabel")}
                  </span>
                </div>
                <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#139C48] bg-white" />
                <span className="absolute bottom-0 left-1/2 size-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#139C48]" />
                <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-mono text-[0.68rem] text-[#139C48]">
                  {t("researchLedLabel")}
                </span>
              </div>
            </div>

            <div className="md:col-start-6 md:col-span-7">
              <div className="border-t border-[#d8dad7]">
                {historyItems.map((item, index) => (
                  <motion.article
                    key={item.year}
                    initial="hidden"
                    whileInView="visible"
                    variants={reveal}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="grid gap-6 border-b border-[#d8dad7] py-7 sm:grid-cols-[11rem_1fr] sm:items-center"
                  >
                    <div className="relative aspect-[1.5/1] overflow-hidden rounded-[0.875rem] bg-[#e8eae7]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 640px) 176px, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[0.68rem] text-[#139C48]">{item.year}</span>
                      <h3 className="mt-2 text-[1.1rem] font-semibold tracking-[-0.025em]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[0.75rem] leading-6 text-[#666c66]">
                        {item.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-24 pt-8 sm:px-8 md:pb-32 md:pt-12">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.25rem] border border-[#cfe0ce] bg-[#f4f8f3] px-7 py-9 sm:px-10 md:grid-cols-12 md:items-center md:px-12 md:py-12">
          <h2 className="max-w-[13ch] text-[clamp(2rem,3.4vw,3.3rem)] font-semibold leading-[1.12] tracking-[-0.05em] md:col-span-4">
            {t("readyToStart")}
          </h2>
          <p className="max-w-[28rem] text-[0.82rem] leading-7 text-[#606760] md:col-start-6 md:col-span-3">
            {t("joinEcosystem")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-4 md:flex-col">
            <a
              href="https://www.facebook.com/biotech.ttu.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center justify-between gap-5 rounded-full bg-[#139C48] px-5 text-[0.72rem] font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#0f7e3a]"
            >
              {t("contactUs")}
              <ArrowIcon direction="right" size={12} />
            </a>
            <Link
              href={programsHref}
              className="group inline-flex min-h-11 items-center justify-between gap-5 rounded-full border border-[#9ab59a] px-5 text-[0.72rem] font-semibold text-[#39713f] transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#139C48] hover:bg-white"
            >
              {t("explorePrograms")}
              <ArrowIcon direction="right" size={12} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPageContent;
