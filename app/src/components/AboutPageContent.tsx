"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import EditorialCta from "@/components/EditorialCta";
import { ArrowIcon } from "@/components/icons/ArrowIcon";

const AboutPageContent = () => {
  const t = useTranslations("about");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const programsHref =
    locale === "vi" ? `/${locale}/chuong-trinh-dao-tao` : `/${locale}/programs`;
  const facultyHref =
    locale === "vi" ? `/${locale}/giang-vien` : `/${locale}/faculty`;
  const values = t.raw("valuesList") as string[];

  const operatingItems = [
    {
      title: t("organizationalStructureTitle"),
      description: t("organizationText"),
    },
    {
      title: t("facultyExcellenceTitle"),
      description: t("facultyText"),
    },
    {
      title: t("technologyIntegrationTitle"),
      description: t("technologyIntegrationDescription"),
    },
    {
      title: t("transparentEnvironmentTitle"),
      description: t("transparentEnvironmentDescription"),
    },
  ];

  const educationItems = [
    {
      title: t("liberalArtsTitle"),
      description: t("liberalArtsDescription"),
    },
    {
      title: t("lifelongLearningTitle"),
      description: t("lifelongLearningDescription"),
    },
    {
      title: t("qualityAssuranceTitle"),
      description: t("qualityAssuranceDescription"),
    },
  ];

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="overflow-hidden bg-white text-[#101210]">
      <section className="px-5 pb-20 pt-10 sm:px-8 md:pb-28 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 md:grid-cols-12 md:items-end"
          >
            <div className="md:col-span-5 md:pb-8">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#6f746f]">
                {locale === "vi" ? "Giới thiệu Khoa" : "About the School"}
              </p>
              <h1 className="mt-7 max-w-[9ch] text-[clamp(3.3rem,6.5vw,6.3rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
                {t("title")}
              </h1>
            </div>

            <figure className="md:col-span-7">
              <div className="relative aspect-[1.38/1] overflow-hidden rounded-[0.8rem] bg-[#e9ebe8]">
                <Image
                  src="/assets/ttu/about-tan-tao-campus.jpg"
                  alt={t("heroImageAlt")}
                  fill
                  priority
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </motion.div>

          <div className="mt-8 grid gap-8 border-b border-t border-[#d9ddd8] py-8 md:grid-cols-12 md:py-10">
            <p className="max-w-[17rem] text-[0.68rem] leading-[1.65] text-[#747974] md:col-span-3">
              {t("heroMediaDescription")}
            </p>
            <p className="max-w-[34rem] text-[1.35rem] font-medium leading-[1.42] tracking-[-0.03em] text-[#3e433e] md:col-start-5 md:col-span-5">
              {t("description")}
            </p>
            <div className="flex items-start md:col-span-4 md:justify-end">
              <Link
                href={programsHref}
                className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-[#cbd0ca] px-5 text-[0.72rem] font-semibold text-[#4e544e] transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-[#139C48] hover:text-[#139C48]"
              >
                {t("explorePrograms")}
                <ArrowIcon direction="right" size={12} />
              </Link>
            </div>
          </div>

          <div className="grid border-b border-[#d9ddd8] sm:grid-cols-3">
            {[
              ["2011", t("founded")],
              ["02", t("programs")],
              ["2030", t("visionYear")],
            ].map(([value, label], index) => (
              <div
                key={label}
                className="flex items-end justify-between border-b border-[#d9ddd8] py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <span className="text-[2.5rem] font-semibold leading-none tracking-[-0.065em]">
                  {value}
                </span>
                <span className="max-w-[8rem] pb-1 text-right text-[0.62rem] leading-5 text-[#747974]">
                  {label}
                </span>
                <span className="sr-only">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#d9ddd8] bg-[#f5f6f3] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#6f746f]">
                {locale === "vi" ? "Cấu trúc học thuật" : "Academic structure"}
              </p>
              <h2 className="mt-7 max-w-[10ch] text-[clamp(2.7rem,4.5vw,4.6rem)] font-semibold leading-[0.93] tracking-[-0.065em]">
                {t("howWeOperate")}
              </h2>
              <p className="mt-7 max-w-[18rem] text-sm leading-7 text-[#707570]">
                {t("valuesText")}
              </p>
            </div>

            <div className="md:col-start-6 md:col-span-7">
              {operatingItems.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  variants={reveal}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group grid gap-4 border-t border-[#cfd3ce] py-7 sm:grid-cols-[3.5rem_0.8fr_1.2fr]"
                >
                  <span className="font-mono text-[0.62rem] text-[#139C48]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold leading-[1.15] tracking-[-0.035em]">
                    {item.title}
                  </h3>
                  <p className="max-w-[27rem] text-[0.74rem] leading-[1.7] text-[#6d726d]">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-12 md:items-end">
            <figure className="md:col-span-7">
              <div className="relative aspect-[1.7/1] overflow-hidden rounded-[0.8rem] bg-[#e3e6e2]">
                <Image
                  src="/assets/biotech/biotech-hackathon-2026.jpg"
                  alt={t("heroMediaTitle")}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <figure className="md:col-start-9 md:col-span-4">
              <div className="relative aspect-[1.18/1] overflow-hidden rounded-[0.8rem] bg-[#e3e6e2]">
                <Image
                  src="/assets/biotech/program-biotechnology-lab.webp"
                  alt={t("faculty")}
                  fill
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-[0.68rem] leading-6 text-[#707570]">
                {t("facultyText")}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-[#d9ddd8] pb-8 md:grid-cols-12 md:items-end">
            <h2 className="max-w-[10ch] text-[clamp(2.8rem,4.8vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.065em] md:col-span-5">
              {t("howWeEducate")}
            </h2>
            <p className="max-w-[34rem] text-base leading-8 text-[#646a64] md:col-start-7 md:col-span-6">
              {t("philosophyDetails.liberalArts.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3">
            {educationItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="border-b border-[#d9ddd8] py-9 md:min-h-[19rem] md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <span className="font-mono text-[0.62rem] text-[#139C48]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-12 max-w-[15rem] text-[1.6rem] font-semibold leading-[1.08] tracking-[-0.045em]">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-[23rem] text-sm leading-7 text-[#6d726d]">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 md:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[0.9rem] border border-[#d5ddd4] bg-[#eef3ed]">
          <div className="grid md:grid-cols-12">
            <div className="border-b border-[#d5ddd4] p-7 sm:p-10 md:col-span-4 md:border-b-0 md:border-r md:p-12">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#687068]">
                {t("mission")} &amp; {t("vision")}
              </p>
              <h2 className="mt-8 max-w-[9ch] text-[clamp(2.7rem,4.5vw,4.5rem)] font-semibold leading-[0.93] tracking-[-0.065em]">
                {t("whatWeDo")}
              </h2>
            </div>
            <article className="border-b border-[#d5ddd4] p-7 sm:p-10 md:col-span-4 md:border-b-0 md:border-r md:p-12">
              <span className="font-mono text-[0.62rem] text-[#139C48]">01</span>
              <h3 className="mt-10 text-2xl font-semibold tracking-[-0.04em]">
                {t("mission")}
              </h3>
              <p className="mt-5 text-sm leading-7 text-[#5f665f]">{t("missionText")}</p>
            </article>
            <article className="p-7 sm:p-10 md:col-span-4 md:p-12">
              <span className="font-mono text-[0.62rem] text-[#139C48]">02</span>
              <h3 className="mt-10 text-2xl font-semibold tracking-[-0.04em]">
                {t("vision")}
              </h3>
              <p className="mt-5 text-sm leading-7 text-[#5f665f]">{t("visionText")}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="history" className="border-t border-[#d9ddd8] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#6f746f]">
                {locale === "vi" ? "Một dấu mốc" : "A defining milestone"}
              </p>
              <h2 className="mt-6 text-[clamp(3rem,5vw,5rem)] font-semibold leading-none tracking-[-0.07em]">
                {t("history")}
              </h2>
            </div>
            <div className="md:col-start-6 md:col-span-7">
              <div className="border-t border-[#d9ddd8] pt-6">
                <span className="text-[clamp(5rem,11vw,10rem)] font-semibold leading-[0.8] tracking-[-0.085em] text-[#139C48]">
                  2011
                </span>
                <p className="mt-10 max-w-[38rem] text-lg leading-8 text-[#565c56]">
                  {t("historyText")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-12 md:items-start">
            <figure className="md:col-span-8">
              <div className="relative aspect-[1.65/1] overflow-hidden rounded-[0.8rem] bg-[#e3e6e2]">
                <Image
                  src="/assets/ttu/about-tan-tao-campus.jpg"
                  alt={t("heroImageAlt")}
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <div className="md:col-start-10 md:col-span-3 md:pt-24">
              <p className="text-sm leading-7 text-[#6c716c]">{t("qualityPolicyText")}</p>
              <Link
                href={facultyHref}
                className="group mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#139C48] px-5 text-[0.72rem] font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#0f7e3a]"
              >
                {t("faculty")}
                <ArrowIcon direction="right" size={12} />
              </Link>
            </div>
          </div>

          <div className="mt-16 border-y border-[#d9ddd8]">
            <div className="grid gap-4 py-6 md:grid-cols-12 md:items-center">
              <p className="text-sm font-semibold md:col-span-3">{t("values")}</p>
              <div className="flex flex-wrap gap-x-7 gap-y-3 md:col-span-9">
                {values.map((value, index) => (
                  <span
                    key={value}
                    className="inline-flex items-center gap-2 text-[0.7rem] font-medium text-[#626862]"
                  >
                    <span className="font-mono text-[0.55rem] text-[#139C48]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorialCta
        title={t("readyToStart")}
        description={t("joinEcosystem")}
        primaryLabel={t("contactUs")}
        primaryHref="https://www.facebook.com/biotech.ttu.edu.vn"
        secondaryLabel={t("explorePrograms")}
        secondaryHref={programsHref}
      />
    </main>
  );
};

export default AboutPageContent;
