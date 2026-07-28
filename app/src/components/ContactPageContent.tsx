"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, GraduationCap, BookOpen, MessageCircle } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon, Call02Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { useLocale, useTranslations } from "next-intl";
import EditorialCta from "@/components/EditorialCta";
import { ArrowIcon } from "@/components/icons/ArrowIcon";

const ContactPageContent = () => {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  const address = tFooter("address");
  const phone = "(+84) 076 436 2098";
  const email = tFooter("email");
  const faqHref = locale === "vi" ? `/${locale}/hoi-dap` : `/${locale}/faq`;
  const mapQuery = encodeURIComponent(address);

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  const channels = [
    {
      icon: GraduationCap,
      title: t("channelAdmissions.title"),
      desc: t("channelAdmissions.desc"),
      cta: t("channelAdmissions.cta"),
      href: "https://tuyensinh.ttu.edu.vn/",
      external: true,
    },
    {
      icon: BookOpen,
      title: t("channelAcademic.title"),
      desc: t("channelAcademic.desc"),
      cta: t("channelAcademic.cta"),
      href: `mailto:${email}`,
      external: false,
    },
    {
      icon: MessageCircle,
      title: t("channelFast.title"),
      desc: t("channelFast.desc"),
      cta: t("channelFast.cta"),
      href: "https://www.facebook.com/biotech.ttu.edu.vn",
      external: true,
    },
  ];

  return (
    <main className="overflow-hidden bg-white text-[#171b25]">
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 border-b border-[#d8dad7] pb-9 md:grid-cols-12"
          >
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#777b77] md:col-span-3 md:pt-2">
              {t("eyebrow")}
            </div>
            <h1 className="max-w-[12ch] text-[clamp(3rem,6vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-balance md:col-span-6">
              {t("title")}
            </h1>
            <p className="max-w-[22rem] text-sm leading-7 text-[#60645f] md:col-span-3 md:pt-2">
              {t("lede")}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-14 grid border-y border-[#d8dad7] sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="border-b border-[#d8dad7] py-6 sm:pr-6 lg:border-b-0">
              <Clock className="mb-3 h-5 w-5 text-[#139C48]" strokeWidth={1.75} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8d8f8a]">
                {t("officeHoursLabel")}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#171b25]">
                {t("officeHours")}
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-b border-[#d8dad7] py-6 transition-colors hover:text-[#139C48] sm:border-l sm:pl-6 lg:border-b-0"
            >
              <HugeiconsIcon icon={Location01Icon} size={20} className="mb-3 text-[#139C48]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8d8f8a]">
                {t("addressLabel")}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#171b25]">{address}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-[#139C48]">
                {t("mapCta")}
                <ArrowIcon direction="up-right" size={13} />
              </span>
            </a>
            <a
              href={`tel:${phone}`}
              className="group border-b border-[#d8dad7] py-6 transition-colors hover:text-[#139C48] lg:border-b-0 lg:border-l lg:pl-6"
            >
              <HugeiconsIcon icon={Call02Icon} size={20} className="mb-3 text-[#139C48]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8d8f8a]">
                {t("phoneLabel")}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#171b25]">{phone}</p>
            </a>
            <a
              href={`mailto:${email}`}
              className="group py-6 transition-colors hover:text-[#139C48] sm:border-l sm:pl-6"
            >
              <HugeiconsIcon icon={Mail01Icon} size={20} className="mb-3 text-[#139C48]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8d8f8a]">
                {t("emailLabel")}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#171b25]">{email}</p>
            </a>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#d8dad7] bg-[#f5f7f4] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-12">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={reveal}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-[10ch] text-[2.6rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-[3.3rem] md:col-span-4"
            >
              {t("channelsTitle")}
            </motion.h2>
            <div className="border-t border-[#cfd2ce] md:col-start-6 md:col-span-7">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.article
                  key={channel.title}
                  initial="hidden"
                  whileInView="visible"
                  variants={reveal}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="grid gap-5 border-b border-[#cfd2ce] py-7 sm:grid-cols-[3rem_0.8fr_1.2fr_auto] sm:items-start"
                >
                  <Icon className="h-5 w-5 text-[#139C48]" strokeWidth={1.75} />
                  <h3 className="text-base font-semibold text-[#171b25]">
                    {channel.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#60645f]">
                    {channel.desc}
                  </p>
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#139C48] hover:text-[#0F7E3A]"
                  >
                    {channel.cta}
                    <ArrowIcon direction="up-right" size={14} />
                  </a>
                </motion.article>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      <EditorialCta
        title={t("faqCta")}
        description={t("faqTeaser")}
        primaryLabel={t("faqCta")}
        primaryHref={faqHref}
      />
    </main>
  );
};

export default ContactPageContent;
