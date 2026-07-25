"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const Mission = () => {
  const t = useTranslations("about");
  const locale = useLocale();
  const aboutHref =
    locale === "vi" ? `/${locale}/gioi-thieu-chung` : `/${locale}/about-us`;

  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto grid max-w-7xl gap-8 rounded-[1.75rem] bg-[#E8F3EF] p-7 sm:p-10 lg:grid-cols-[0.65fr_1.35fr] lg:p-14"
      >
        <div>
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#16856F]">
            {t("title")}
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-[#12312B] sm:text-4xl">
            {t("mission")}
          </h2>
        </div>
        <div>
          <p className="max-w-3xl text-lg leading-8 text-[#36564E] sm:text-2xl sm:leading-10">
            {t("missionText").replace(/\u00a0/g, " ")}
          </p>
          <Link
            href={aboutHref}
            className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#16856F] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0D5E50]"
          >
            {t("explorePrograms")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Mission;
