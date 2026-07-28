import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
    short_name: "Biotech TTU",
    description:
      "Website chính thức của Khoa Công nghệ Sinh học, Đại học Tân Tạo.",
    start_url: "/vi",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#139C48",
    lang: "vi",
    icons: [
      {
        src: "/assets/biotech/favicon-ttu.png",
        sizes: "298x300",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
