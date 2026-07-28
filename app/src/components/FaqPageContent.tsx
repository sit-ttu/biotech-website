"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import EditorialCta from "@/components/EditorialCta";

type FaqItem = { q: string; a: string };

const FaqPageContent = () => {
  const t = useTranslations("faq");
  const tHeader = useTranslations("header");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const items = t.raw("items") as FaqItem[];
  const contactHref = locale === "vi" ? `/${locale}/lien-he` : `/${locale}/contact`;

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="overflow-hidden bg-white text-[#171b25]">
      <section className="relative bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-12 sm:px-8 md:grid-cols-12 md:gap-5 md:pb-28 md:pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#777b77]">
              {t("eyebrow")}
            </div>
            <h1 className="mt-6 max-w-[10ch] text-[clamp(3rem,6vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-balance">
              {t("title")}
            </h1>
            <p className="mt-7 max-w-[20rem] text-sm leading-7 text-[#60645f]">
              {t("lede")}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-start-6 md:col-span-7 md:pt-2"
          >
            <Accordion.Root type="single" collapsible className="border-t border-[#cfd2ce]">
              {items.map((item, index) => (
                <Accordion.Item
                  key={item.q}
                  value={`item-${index}`}
                  className="border-b border-[#cfd2ce]"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold text-[#171b25] transition-colors hover:text-[#139C48] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#139C48]">
                      {item.q}
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-[#8d8f8a] transition-transform duration-300 group-hover:text-[#139C48] group-data-[state=open]:rotate-180"
                        strokeWidth={2}
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden text-sm leading-relaxed text-[#60645f] data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <p className="max-w-[38rem] pb-7 pr-8">{item.a}</p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </motion.div>
        </div>
      </section>

      <EditorialCta
        title={t("contactCta")}
        description={t("lede")}
        primaryLabel={tHeader("contactLink")}
        primaryHref={contactHref}
      />
    </main>
  );
};

export default FaqPageContent;
