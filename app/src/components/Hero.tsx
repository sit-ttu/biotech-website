"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowIcon } from "@/components/icons/ArrowIcon";

const Hero = () => {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const dynamicTexts = t.raw("dynamicTexts") as string[];
  const stats = tStats.raw("items") as { number: string; label: string }[];
  const programsHref =
    locale === "vi" ? `/${locale}/chuong-trinh-dao-tao` : `/${locale}/programs`;
  const aboutHref =
    locale === "vi" ? `/${locale}/gioi-thieu-chung` : `/${locale}/about-us`;

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-[#F8FAF7] px-3 py-3 text-[#12312B] sm:px-5 sm:py-5">
      <div className="mx-auto grid max-w-[90rem] gap-3 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex min-h-[31rem] flex-col justify-between rounded-[1.75rem] bg-[#12312B] p-7 text-white sm:p-10 lg:col-span-5 lg:min-h-[39rem]"
        >
          <div>
            <span className="inline-flex rounded-full border border-white/20 px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/80">
              {t("welcome")}
            </span>
            <h1 className="mt-8 max-w-[12ch] text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.055em] text-balance sm:text-[3.4rem] lg:text-[4rem]">
              {t("title")}
              <span className="mt-2 block text-[#75D2BC]">
                {dynamicTexts[0]}
              </span>
            </h1>
            <p className="mt-6 max-w-[35rem] text-sm leading-7 text-white/70">
              {t("subtitle")}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={programsHref}
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#75D2BC] px-6 text-sm font-semibold text-[#12312B] transition-transform hover:-translate-y-0.5"
            >
              {t("explore")}
              <ArrowIcon direction="up-right" size={16} />
            </Link>
            <Link
              href={aboutHref}
              className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#12312B]"
            >
              {t("watchVideo")}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="relative min-h-[31rem] overflow-hidden rounded-[1.75rem] bg-[#16856F] lg:col-span-7 lg:min-h-[39rem]"
        >
          <Image
            src="/assets/biotech/hero-biotechnology.png"
            alt={t("imageTitle")}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071E1A]/85 via-transparent to-transparent" />
          <div className="absolute inset-x-5 bottom-5 rounded-[1.35rem] border border-white/15 bg-[#071E1A]/75 p-5 text-white backdrop-blur-md sm:inset-x-auto sm:left-7 sm:max-w-md sm:p-6">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#75D2BC]">
              {t("imageEyebrow")}
            </p>
            <p className="mt-2 text-xl font-semibold leading-tight tracking-[-0.03em]">
              {t("imageTitle")}
            </p>
            <p className="mt-2 text-xs leading-5 text-white/70">
              {t("imageDescription")}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-12 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`rounded-[1.35rem] p-5 sm:p-6 ${
                index === 0
                  ? "bg-[#16856F] text-white"
                  : "border border-[#D6E5E0] bg-white text-[#12312B]"
              }`}
            >
              <div className="text-3xl font-semibold tracking-[-0.05em]">
                {stat.number}
              </div>
              <p
                className={`mt-2 text-xs leading-5 ${
                  index === 0 ? "text-white/70" : "text-[#60756F]"
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
