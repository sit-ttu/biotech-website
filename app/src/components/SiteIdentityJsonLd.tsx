import { jsonLd, SITE_URL } from "@/lib/seo";

const siteIdentitySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
      alternateName: [
        "Biotech TTU",
        "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
        "biotech.ttu.edu.vn",
      ],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "CollegeOrUniversity",
      "@id": `${SITE_URL}/#organization`,
      name: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
      alternateName: "School of Biotechnology - Tan Tao University",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/biotech/logo-biotech.png`,
        contentUrl: `${SITE_URL}/assets/biotech/logo-biotech.png`,
        width: 737,
        height: 111,
      },
      email: "secretary.sbio@ttu.edu.vn",
      telephone: "+84-272-376-9216",
      parentOrganization: {
        "@type": "CollegeOrUniversity",
        name: "Đại học Tân Tạo",
        alternateName: "Tan Tao University",
        url: "https://ttu.edu.vn/",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Đại lộ Đại học Tân Tạo, Tân Đức E.City",
        addressLocality: "Đức Hòa",
        addressRegion: "Tây Ninh",
        addressCountry: "VN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+84-272-376-9216",
        email: "secretary.sbio@ttu.edu.vn",
        contactType: "admissions",
        availableLanguage: ["Vietnamese", "English"],
      },
      sameAs: [
        "https://www.facebook.com/biotechnology.biotechnology.357",
        "https://ttu.edu.vn/",
      ],
    },
  ],
};

export default function SiteIdentityJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLd(siteIdentitySchema)}
    />
  );
}
