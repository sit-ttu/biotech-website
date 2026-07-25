"use client";

import { Dna, Microscope, Sprout, Waves } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import SectionTab from "@/components/SectionTab";
import { ArrowIcon } from "@/components/icons/ArrowIcon";

type Area = { title: string; description: string };

const ResearchAreas = () => {
  const t = useTranslations("research");
  const tNav = useTranslations("header.navigation");
  const locale = useLocale();
  const areas = t.raw("areas") as Area[];
  const researchHref =
    locale === "vi" ? `/${locale}/nghien-cuu` : `/${locale}/research`;
  const icons = [Dna, Sprout, Waves, Microscope];

  return (
    <section className="relative bg-white py-16 sm:py-20">
      <SectionTab label={tNav("research")} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold tracking-[-0.045em] text-[#12312B] sm:text-5xl"
          >
            {t("subtitle")}
          </motion.h2>
          <p className="max-w-xl text-sm leading-7 text-[#60756F] lg:justify-self-end">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <Link
                  href={researchHref}
                  className={`group flex h-full min-h-[18rem] flex-col rounded-[1.5rem] p-6 transition-transform hover:-translate-y-1 sm:p-7 ${
                    index === 0
                      ? "relative overflow-hidden bg-[#12312B] text-white"
                      : "border border-[#D6E5E0] bg-[#F8FAF7] text-[#12312B]"
                  }`}
                >
                  {index === 0 && (
                    <>
                      <img
                        src="/assets/biotech/research-biotechnology.png"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-35"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#071E1A] via-[#071E1A]/70 to-transparent" />
                    </>
                  )}
                  <div className="relative flex items-start justify-between">
                    <Icon className="h-9 w-9 text-[#75D2BC]" strokeWidth={1.5} />
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20">
                      <ArrowIcon direction="up-right" size={16} />
                    </span>
                  </div>
                  <div className="relative mt-auto pt-12">
                    <h3 className="text-lg font-semibold tracking-[-0.025em]">
                      {area.title}
                    </h3>
                    <p
                      className={`mt-3 text-xs leading-6 ${
                        index === 0 ? "max-w-md text-white/70" : "text-[#60756F]"
                      }`}
                    >
                      {area.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResearchAreas;
