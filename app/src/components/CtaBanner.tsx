"use client";

import { useTranslations } from "next-intl";
import EditorialCta from "@/components/EditorialCta";

const CtaBanner = () => {
  const t = useTranslations("programs.programSlugPage.shared.ctaBanner");

  return (
    <EditorialCta
      title={t("title")}
      description={t("description")}
      primaryLabel={t("primary")}
      primaryHref="https://www.facebook.com/biotech.ttu.edu.vn"
    />
  );
};

export default CtaBanner;
