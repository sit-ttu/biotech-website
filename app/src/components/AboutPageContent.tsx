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
  const programQualities = t.raw("programQualitiesList") as string[];

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
      title: t("agricultureAquacultureTitle"),
      description: t("agricultureAquacultureDescription"),
      image: "/assets/biotech/program-applied-biology-tissue-culture.webp",
    },
    {
      title: t("biomedicalTitle"),
      description: t("biomedicalDescription"),
      image: "/assets/biotech/biotechnology-microscope.jpg",
    },
    {
      title: t("environmentFoodDataTitle"),
      description: t("environmentFoodDataDescription"),
      image: "/assets/biotech/environment-food-data-lab.jpg",
    },
  ];

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="overflow-hidden bg-white text-[#111311]">
      <section className="px-5 pb-12 pt-14 sm:px-8 md:pb-16 md:pt-20">
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

      <section className="px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 className="max-w-[9ch] text-[clamp(2.65rem,4.5vw,4.6rem)] font-semibold leading-[1.1] tracking-[-0.055em] text-balance md:col-span-4">
              {t("howWeEducate")}
            </h2>
            <p className="max-w-[34rem] text-[0.82rem] leading-7 text-[#626862] md:col-start-7 md:col-span-6">
              {t("learningOutcomesDescription")}
            </p>
          </div>

          <div className="mt-12 grid border-y border-[#d8dad7] lg:grid-cols-3">
            {educationItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`py-8 lg:px-8 ${
                  index > 0
                    ? "border-t border-[#d8dad7] lg:border-l lg:border-t-0"
                    : ""
                }`}
              >
                <h3 className="text-[1.3rem] font-semibold leading-[1.3] tracking-[-0.03em]">
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

      <section className="px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 className="max-w-[10ch] text-[clamp(2.65rem,4.5vw,4.6rem)] font-semibold leading-[1.1] tracking-[-0.055em] text-balance md:col-span-4">
              {t("programOrientationTitle")}
            </h2>
            <p className="max-w-[34rem] text-[0.82rem] leading-7 text-[#626862] md:col-start-7 md:col-span-6">
              {t("programOrientationDescription")}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
            <motion.figure
              className="lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              variants={reveal}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-full min-h-[26rem] overflow-hidden rounded-[1rem] bg-[#e8eae7]">
                <Image
                  src="/assets/biotech/students-biotech-lab-ttu.jpg"
                  alt={t("organizationalStructureTitle")}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.figure>

            <div className="divide-y divide-[#d8dad7] border-y border-[#d8dad7] lg:col-span-5">
              <motion.article
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55 }}
                className="flex flex-col justify-center py-8 lg:min-h-[15rem] lg:px-8"
              >
                <span className="mb-6 block h-0.5 w-10 bg-[#139C48]" />
                <h3 className="max-w-[18ch] text-[1.65rem] font-semibold leading-[1.2] tracking-[-0.04em]">
                  {operatingItems[0].title}
                </h3>
                <p className="mt-5 max-w-[30rem] text-[0.8rem] leading-7 text-[#656b65]">
                  {operatingItems[0].description}
                </p>
              </motion.article>

              <div className="grid sm:grid-cols-2">
                {operatingItems.slice(1).map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    variants={reveal}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`py-8 sm:px-7 ${
                      index > 0
                        ? "border-t border-[#d8dad7] sm:border-l sm:border-t-0"
                        : ""
                    }`}
                  >
                    <h3 className="text-[1.05rem] font-semibold leading-[1.3] tracking-[-0.025em]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[0.75rem] leading-6 text-[#656b65]">
                      {item.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-12">
            <h2 className="max-w-[9ch] text-[clamp(2.65rem,4.5vw,4.6rem)] font-semibold leading-[1.1] tracking-[-0.055em] text-balance md:col-span-4">
              {t("mission")} &amp; {t("vision").toLocaleLowerCase(locale)}
            </h2>

            <div className="grid border-y border-[#d8dad7] md:col-start-6 md:col-span-7 md:grid-cols-2">
              <article className="py-8 md:pr-8">
                <h3 className="text-lg font-semibold text-[#139C48]">{t("mission")}</h3>
                <p className="mt-4 text-[0.8rem] leading-7 text-[#626862]">{t("missionText")}</p>
              </article>

              <article className="border-t border-[#d8dad7] py-8 md:border-l md:border-t-0 md:pl-8">
                <h3 className="text-lg font-semibold text-[#139C48]">{t("vision")}</h3>
                <p className="mt-4 text-[0.8rem] leading-7 text-[#626862]">{t("visionText")}</p>
              </article>
            </div>
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
                src="/assets/biotech/biology-conference-ttu.jpg"
                alt={t("whatWeDo")}
                fill
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          </motion.figure>

          <div className="mt-6 grid gap-6 border-y border-[#d8dad7] py-6 sm:py-8 md:grid-cols-[12rem_1fr] md:items-center">
            <p className="text-[0.78rem] font-semibold">{t("programQualitiesTitle")}</p>
            <div className="grid grid-cols-2 gap-x-7 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
              {programQualities.map((quality) => (
                <span
                  key={quality}
                  className="text-[0.7rem] font-medium leading-5 text-[#5f655f]"
                >
                  {quality}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="history" className="px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-[#d8dad7] pb-8 md:grid-cols-12 md:items-end">
            <h2 className="max-w-[9ch] text-[clamp(2.65rem,4.5vw,4.6rem)] font-semibold leading-[1.1] tracking-[-0.055em] text-balance md:col-span-4">
              {t("applicationAreasTitle")}
            </h2>

            <div className="md:col-start-7 md:col-span-6">
              <p className="max-w-[38rem] text-[0.9rem] leading-7 text-[#626862]">
                {t("applicationAreasDescription")}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-12 lg:grid-cols-12">
            {historyItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className={
                  index === 0
                    ? "lg:col-span-7 lg:row-span-2"
                    : "lg:col-start-8 lg:col-span-5"
                }
              >
                <div
                  className={`relative overflow-hidden rounded-[1rem] bg-[#e8eae7] ${
                    index === 0 ? "aspect-[1.45/1]" : "aspect-[1.9/1]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={
                      index === 0
                        ? "(min-width: 1024px) 58vw, 100vw"
                        : "(min-width: 1024px) 42vw, 100vw"
                    }
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
                  />
                </div>
                <div
                  className={`mt-5 grid gap-4 px-1 ${
                    index === 0 ? "sm:grid-cols-[0.8fr_1.2fr]" : ""
                  }`}
                >
                  <h3 className="text-[1.12rem] font-semibold leading-[1.3] tracking-[-0.025em]">
                    {item.title}
                  </h3>
                  <p className="text-[0.76rem] leading-6 text-[#666c66]">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
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
