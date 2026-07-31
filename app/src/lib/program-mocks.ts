import type { Curriculum, Program, Section } from "@/lib/api";

const now = "2026-01-01T00:00:00.000Z";

const sections = (
  curriculumId: string,
  items: Array<[Section["sectionKey"], string, string]>,
): Section[] =>
  items.map(([sectionKey, title, content], index) => ({
    sectionId: `${curriculumId}-section-${index + 1}`,
    curriculumId,
    sectionKey,
    title,
    content,
    displayOrder: index + 1,
    isVisible: true,
    createdAt: now,
    updatedAt: now,
  }));

export const mockPrograms: Program[] = [
  {
    programId: "mock-program-biotechnology",
    contentId: "mock-content-biotechnology",
    code: "7420201",
    majorCode: "7420201",
    nameVi: "Công nghệ Sinh học",
    nameEn: "Biotechnology",
    level: "undergraduate",
    banner: "/assets/biotech/program-biotechnology-lab.webp",
    status: "active",
    slugVi: "cong-nghe-sinh-hoc",
    slugEn: "biotechnology",
    descriptionVi:
      "Chương trình kết hợp nền tảng khoa học sự sống, thực hành phòng thí nghiệm và nghiên cứu ứng dụng trong y sinh, nông nghiệp, thực phẩm và môi trường.",
    descriptionEn:
      "A research-led program combining life science foundations, laboratory practice, and applied biotechnology.",
    content: {},
    createdAt: now,
    updatedAt: now,
  },
  {
    programId: "mock-program-applied-biology",
    contentId: "mock-content-applied-biology",
    code: "7420203",
    majorCode: "7420203",
    nameVi: "Sinh học ứng dụng",
    nameEn: "Applied Biology",
    level: "undergraduate",
    banner: "/assets/biotech/program-applied-biology-tissue-culture.webp",
    status: "active",
    slugVi: "sinh-hoc-ung-dung",
    slugEn: "applied-biology",
    descriptionVi:
      "Chương trình chú trọng dược liệu, vi sinh, công nghệ thực phẩm, kiểm nghiệm và ứng dụng sinh học trong đời sống.",
    descriptionEn:
      "A practice-based program focused on medicinal plants, microbiology, food technology, and biological testing.",
    content: {},
    createdAt: now,
    updatedAt: now,
  },
  {
    programId: "mock-program-master-biotechnology",
    contentId: "mock-content-master-biotechnology",
    code: "8420201",
    majorCode: "8420201",
    nameVi: "Thạc sĩ Công nghệ Sinh học",
    nameEn: "Master of Biotechnology",
    level: "postgraduate",
    banner: "/assets/biotech/research-biotechnology.png",
    status: "active",
    slugVi: "thac-si-cong-nghe-sinh-hoc",
    slugEn: "master-of-biotechnology",
    descriptionVi:
      "Lộ trình sau đại học phát triển năng lực nghiên cứu, phân tích dữ liệu sinh học và chuyển giao kết quả vào thực tiễn.",
    descriptionEn:
      "A postgraduate pathway in advanced research, biological data analysis, and applied technology transfer.",
    content: {},
    createdAt: now,
    updatedAt: now,
  },
];

export const mockCurriculums: Curriculum[] = [
  {
    curriculumId: "mock-curriculum-biotechnology-2026",
    programId: "mock-program-biotechnology",
    year: 2026,
    nameVi: "Chương trình đào tạo Công nghệ Sinh học 2026",
    nameEn: "Biotechnology Curriculum 2026",
    slugVi: "chuong-trinh-2026",
    slugEn: "curriculum-2026",
    descriptionVi:
      "Chương trình 4 năm, 130 tín chỉ với các học phần nền tảng, thực hành phòng thí nghiệm, thực tập và khóa luận tốt nghiệp.",
    descriptionEn:
      "A four-year, 130-credit curriculum spanning foundations, laboratory practice, internship, and a capstone thesis.",
    isCurrent: true,
    durationYears: 4,
    totalSemesters: 8,
    totalCredits: 130,
    educationType: "Chính quy",
    language: "Tiếng Việt",
    degreeAwarded: "Cử nhân Công nghệ Sinh học",
    sections: sections("mock-curriculum-biotechnology-2026", [
      [
        "overview",
        "Tổng quan chương trình",
        "<p>Chương trình đào tạo cung cấp nền tảng vững chắc về sinh học phân tử, hóa sinh, vi sinh và công nghệ tế bào.</p>",
      ],
      [
        "objectives",
        "Mục tiêu đào tạo",
        "<p>Sinh viên phát triển năng lực thiết kế thí nghiệm, phân tích dữ liệu và vận dụng công nghệ sinh học để giải quyết vấn đề thực tiễn.</p>",
      ],
      [
        "learning_outcomes",
        "Chuẩn đầu ra",
        "<ul><li>Thực hiện quy trình phòng thí nghiệm an toàn và chính xác.</li><li>Phân tích, trình bày và bảo vệ kết quả nghiên cứu.</li><li>Làm việc hiệu quả trong nhóm đa ngành.</li></ul>",
      ],
      [
        "career_opportunities",
        "Cơ hội nghề nghiệp",
        "<p>Sinh viên tốt nghiệp có thể làm việc tại phòng R&amp;D, trung tâm kiểm nghiệm, doanh nghiệp dược, thực phẩm, nông nghiệp và môi trường.</p>",
      ],
    ]),
    createdAt: now,
    updatedAt: now,
  },
  {
    curriculumId: "mock-curriculum-applied-biology-2026",
    programId: "mock-program-applied-biology",
    year: 2026,
    nameVi: "Chương trình đào tạo Sinh học ứng dụng 2026",
    nameEn: "Applied Biology Curriculum 2026",
    slugVi: "chuong-trinh-2026",
    slugEn: "curriculum-2026",
    descriptionVi:
      "Lộ trình 4 năm kết hợp sinh học nền tảng với dược liệu, vi sinh ứng dụng, kiểm nghiệm và công nghệ thực phẩm.",
    descriptionEn:
      "A four-year pathway combining core biology with medicinal plants, applied microbiology, testing, and food technology.",
    isCurrent: true,
    durationYears: 4,
    totalSemesters: 8,
    totalCredits: 128,
    educationType: "Chính quy",
    language: "Tiếng Việt",
    degreeAwarded: "Cử nhân Sinh học",
    sections: sections("mock-curriculum-applied-biology-2026", [
      [
        "overview",
        "Tổng quan chương trình",
        "<p>Chương trình hướng đến khả năng ứng dụng kiến thức sinh học trong y sinh, nông nghiệp, thực phẩm và môi trường.</p>",
      ],
      [
        "curriculum_structure",
        "Cấu trúc học phần",
        "<p>Khối kiến thức được tổ chức từ nền tảng khoa học tự nhiên đến học phần chuyên sâu, thực tập và khóa luận.</p>",
      ],
      [
        "career_opportunities",
        "Cơ hội nghề nghiệp",
        "<p>Cử nhân có thể làm việc trong phòng kiểm nghiệm, doanh nghiệp thực phẩm, dược liệu, nông nghiệp công nghệ cao và phòng nghiên cứu.</p>",
      ],
    ]),
    createdAt: now,
    updatedAt: now,
  },
  {
    curriculumId: "mock-curriculum-master-biotechnology-2026",
    programId: "mock-program-master-biotechnology",
    year: 2026,
    nameVi: "Chương trình Thạc sĩ Công nghệ Sinh học 2026",
    nameEn: "Master of Biotechnology Curriculum 2026",
    slugVi: "chuong-trinh-2026",
    slugEn: "curriculum-2026",
    descriptionVi:
      "Chương trình sau đại học tập trung vào phương pháp nghiên cứu, chuyên đề nâng cao và luận văn dưới sự hướng dẫn của giảng viên.",
    descriptionEn:
      "A postgraduate curriculum focused on research methods, advanced seminars, and a supervised thesis.",
    isCurrent: true,
    durationYears: 2,
    totalSemesters: 4,
    totalCredits: 60,
    educationType: "Sau đại học",
    language: "Tiếng Việt",
    degreeAwarded: "Thạc sĩ Công nghệ Sinh học",
    sections: sections("mock-curriculum-master-biotechnology-2026", [
      [
        "overview",
        "Tổng quan chương trình",
        "<p>Học viên xây dựng nền tảng nghiên cứu chuyên sâu và phát triển đề tài có giá trị khoa học hoặc ứng dụng.</p>",
      ],
      [
        "learning_outcomes",
        "Chuẩn đầu ra",
        "<p>Người học có khả năng thiết kế nghiên cứu, sử dụng phương pháp phân tích hiện đại và công bố kết quả học thuật.</p>",
      ],
      [
        "graduation_requirements",
        "Yêu cầu tốt nghiệp",
        "<p>Hoàn thành học phần bắt buộc, bảo vệ đề cương và luận văn theo quy định của chương trình.</p>",
      ],
    ]),
    createdAt: now,
    updatedAt: now,
  },
];

export const getMockPrograms = (params?: {
  status?: string;
  level?: string;
}) =>
  mockPrograms.filter(
    (program) =>
      (!params?.status || program.status === params.status) &&
      (!params?.level || program.level === params.level),
  );

export const getMockProgramBySlug = (
  slug: string,
  locale: "vi" | "en",
) =>
  mockPrograms.find((program) =>
    locale === "vi" ? program.slugVi === slug : program.slugEn === slug,
  );

export const getMockCurriculums = (programId?: string) =>
  mockCurriculums.filter(
    (curriculum) => !programId || curriculum.programId === programId,
  );

export const getMockCurriculumBySlug = (
  programSlug: string,
  curriculumSlug: string,
  locale: "vi" | "en",
) => {
  const program = getMockProgramBySlug(programSlug, locale);
  if (!program) return undefined;

  const curriculum = mockCurriculums.find(
    (item) =>
      item.programId === program.programId &&
      (locale === "vi"
        ? item.slugVi === curriculumSlug
        : item.slugEn === curriculumSlug),
  );

  return curriculum ? { ...curriculum, program } : undefined;
};
