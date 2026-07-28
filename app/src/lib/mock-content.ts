import {
  ResearchLanguage,
  ResearchStatus,
  ResearchType,
  type Achievement,
  type Alumni,
  type AlumniSection,
  type CareerOpportunity,
  type Event,
  type Faculty,
  type News,
  type Research,
  type StudentPortfolio,
} from "@/lib/api";
import type { SiteLocale } from "@/lib/program-pages";

const now = "2026-07-28T00:00:00.000Z";

export const mockFaculty: Faculty[] = [
  {
    id: "mock-faculty-01",
    slug: "nguyen-thi-minh-an",
    fullName: "TS. Nguyễn Thị Minh An",
    academicTitle: "Tiến sĩ",
    position: "Giảng viên Công nghệ Sinh học",
    department: "Khoa Công nghệ Sinh học",
    bioShort:
      "Giảng dạy và nghiên cứu về sinh học phân tử, công nghệ tế bào và các ứng dụng y sinh.",
    isActive: true,
    researchAreas: [
      {
        id: "mock-area-01",
        facultyId: "mock-faculty-01",
        title: "Sinh học phân tử",
      },
      {
        id: "mock-area-02",
        facultyId: "mock-faculty-01",
        title: "Công nghệ tế bào",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-faculty-02",
    slug: "tran-quoc-bao",
    fullName: "ThS. Trần Quốc Bảo",
    academicTitle: "Thạc sĩ",
    position: "Giảng viên Sinh học ứng dụng",
    department: "Khoa Công nghệ Sinh học",
    bioShort:
      "Quan tâm đến vi sinh ứng dụng, công nghệ thực phẩm và giải pháp sinh học phục vụ nông nghiệp.",
    isActive: true,
    researchAreas: [
      {
        id: "mock-area-03",
        facultyId: "mock-faculty-02",
        title: "Vi sinh ứng dụng",
      },
      {
        id: "mock-area-04",
        facultyId: "mock-faculty-02",
        title: "Công nghệ thực phẩm",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-faculty-03",
    slug: "le-hoang-yen",
    fullName: "ThS. Lê Hoàng Yến",
    academicTitle: "Thạc sĩ",
    position: "Giảng viên – Cố vấn học tập",
    department: "Khoa Công nghệ Sinh học",
    bioShort:
      "Đồng hành cùng sinh viên trong học tập, thực hành phòng thí nghiệm và phát triển dự án đổi mới.",
    isActive: true,
    researchAreas: [
      {
        id: "mock-area-05",
        facultyId: "mock-faculty-03",
        title: "Nuôi cấy mô thực vật",
      },
      {
        id: "mock-area-06",
        facultyId: "mock-faculty-03",
        title: "Giáo dục STEM",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
];

export function getMockResearch(
  locale: SiteLocale,
  type: ResearchType,
): Research[] {
  const isVi = locale === "vi";

  if (type === ResearchType.PROJECT) {
    return [
      {
        id: "mock-project-01",
        type,
        title: isVi
          ? "Ứng dụng vi sinh vật bản địa trong cải thiện chất lượng đất nông nghiệp"
          : "Native microorganisms for improving agricultural soil quality",
        abstract: isVi
          ? "Khảo sát, tuyển chọn và đánh giá các chủng vi sinh có tiềm năng hỗ trợ canh tác bền vững tại khu vực Đồng bằng sông Cửu Long."
          : "Screening and evaluating native microorganisms that can support sustainable cultivation in the Mekong Delta.",
        principalInvestigator: isVi
          ? "Nhóm nghiên cứu Vi sinh ứng dụng"
          : "Applied Microbiology Research Group",
        researchField: isVi
          ? "Vi sinh nông nghiệp"
          : "Agricultural microbiology",
        startYear: 2025,
        endYear: 2027,
        status: ResearchStatus.ONGOING,
        keywords: isVi
          ? "vi sinh vật, đất, nông nghiệp bền vững"
          : "microorganisms, soil, sustainable agriculture",
        language: isVi ? ResearchLanguage.VI : ResearchLanguage.EN,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "mock-project-02",
        type,
        title: isVi
          ? "Xây dựng quy trình nuôi cấy mô cho một số giống cây dược liệu"
          : "Tissue-culture protocols for selected medicinal plants",
        abstract: isVi
          ? "Tối ưu điều kiện nhân giống in vitro nhằm tạo nguồn cây giống đồng đều, sạch bệnh và phù hợp chuyển giao."
          : "Optimising in-vitro propagation for consistent, disease-free plants suitable for transfer.",
        principalInvestigator: isVi
          ? "Phòng thí nghiệm Công nghệ tế bào"
          : "Cell Technology Laboratory",
        researchField: isVi ? "Công nghệ tế bào thực vật" : "Plant cell technology",
        startYear: 2024,
        endYear: 2026,
        status: ResearchStatus.ONGOING,
        keywords: isVi
          ? "nuôi cấy mô, cây dược liệu, nhân giống"
          : "tissue culture, medicinal plants, propagation",
        language: isVi ? ResearchLanguage.VI : ResearchLanguage.EN,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "mock-project-03",
        type,
        title: isVi
          ? "Đánh giá hoạt tính sinh học của nguồn nguyên liệu tự nhiên địa phương"
          : "Bioactivity assessment of local natural materials",
        abstract: isVi
          ? "Phân tích một số đặc tính kháng oxy hóa và kháng khuẩn để định hướng phát triển sản phẩm sinh học ứng dụng."
          : "Analysing antioxidant and antimicrobial properties to guide applied bio-product development.",
        principalInvestigator: isVi
          ? "Nhóm nghiên cứu Sinh học ứng dụng"
          : "Applied Biology Research Group",
        researchField: isVi ? "Sinh học ứng dụng" : "Applied biology",
        startYear: 2023,
        endYear: 2025,
        status: ResearchStatus.COMPLETED,
        keywords: isVi
          ? "hoạt tính sinh học, kháng oxy hóa, kháng khuẩn"
          : "bioactivity, antioxidant, antimicrobial",
        language: isVi ? ResearchLanguage.VI : ResearchLanguage.EN,
        createdAt: now,
        updatedAt: now,
      },
    ];
  }

  return [
    {
      id: "mock-publication-01",
      type,
      title: isVi
        ? "Tiềm năng ứng dụng của vi sinh vật có ích trong canh tác bền vững"
        : "Potential applications of beneficial microorganisms in sustainable cultivation",
      authors: "Biotech TTU Research Group",
      journalName: isVi ? "Tạp chí Khoa học ứng dụng" : "Journal of Applied Science",
      publisher: "Tan Tao University",
      publicationYear: 2026,
      keywords: isVi
        ? "vi sinh ứng dụng, nông nghiệp"
        : "applied microbiology, agriculture",
      language: isVi ? ResearchLanguage.VI : ResearchLanguage.EN,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "mock-publication-02",
      type,
      title: isVi
        ? "Ảnh hưởng của điều kiện nuôi cấy đến khả năng tái sinh chồi in vitro"
        : "Effects of culture conditions on in-vitro shoot regeneration",
      authors: "Biotech TTU Cell Technology Laboratory",
      journalName: isVi
        ? "Tạp chí Công nghệ Sinh học"
        : "Journal of Biotechnology",
      publisher: "Tan Tao University",
      publicationYear: 2025,
      keywords: isVi
        ? "nuôi cấy mô, tái sinh chồi"
        : "tissue culture, shoot regeneration",
      language: isVi ? ResearchLanguage.VI : ResearchLanguage.EN,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "mock-publication-03",
      type,
      title: isVi
        ? "Khảo sát hoạt tính kháng khuẩn của một số dịch chiết thực vật"
        : "Antibacterial activity of selected plant extracts",
      authors: "Biotech TTU Applied Biology Group",
      journalName: isVi
        ? "Kỷ yếu nghiên cứu khoa học sinh viên"
        : "Student Research Proceedings",
      publisher: "Tan Tao University",
      publicationYear: 2024,
      keywords: isVi
        ? "dịch chiết thực vật, kháng khuẩn"
        : "plant extracts, antibacterial activity",
      language: isVi ? ResearchLanguage.VI : ResearchLanguage.EN,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export function getMockAchievements(locale: SiteLocale): Achievement[] {
  const isVi = locale === "vi";

  return [
    {
      id: "mock-achievement-01",
      title: isVi
        ? "Dấu ấn tại hoạt động hợp tác đại học quốc tế 2026"
        : "A milestone at the 2026 international university collaboration programme",
      type: "HACKATHON",
      description: isVi
        ? "Sinh viên phát triển năng lực nghiên cứu, thuyết trình và làm việc nhóm trong môi trường liên ngành."
        : "Students developed research, presentation and teamwork skills in an interdisciplinary setting.",
      studentNames: isVi ? "Sinh viên Khoa Công nghệ Sinh học" : "School of Biotechnology students",
      organization: "Tan Tao University",
      level: "INTERNATIONAL",
      achievedYear: 2026,
      isHighlight: true,
      visibility: "PUBLIC",
      coverImage: "/assets/biotech/biotech-hackathon-2026.jpg",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "mock-achievement-02",
      title: isVi
        ? "Dự án ứng dụng công nghệ sinh học trong nông nghiệp"
        : "Applied biotechnology project for agriculture",
      type: "RESEARCH",
      description: isVi
        ? "Dự án sinh viên kết nối kiến thức phòng thí nghiệm với một vấn đề sản xuất thực tế."
        : "A student project connecting laboratory knowledge with a real production challenge.",
      projectName: isVi
        ? "Giải pháp sinh học cho canh tác bền vững"
        : "Biological solutions for sustainable cultivation",
      level: "UNIVERSITY",
      achievedYear: 2025,
      visibility: "PUBLIC",
      coverImage: "/assets/biotech/program-biotechnology-lab.webp",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "mock-achievement-03",
      title: isVi
        ? "Sáng kiến nuôi cấy mô thực vật của sinh viên"
        : "Student initiative in plant tissue culture",
      type: "COMPETITION",
      description: isVi
        ? "Nhóm sinh viên xây dựng quy trình thử nghiệm, ghi nhận dữ liệu và trình bày kết quả theo chuẩn khoa học."
        : "The student team developed an experimental protocol, recorded data and presented the results scientifically.",
      level: "UNIVERSITY",
      achievedYear: 2025,
      visibility: "PUBLIC",
      coverImage: "/assets/biotech/program-applied-biology-tissue-culture.webp",
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export function getMockAlumni(locale: SiteLocale): {
  alumni: Alumni[];
  sections: AlumniSection[];
} {
  const isVi = locale === "vi";
  const sectionId = "mock-alumni-section";
  const sections: AlumniSection[] = [
    {
      id: sectionId,
      slug: "career-paths",
      titleVi: "Hành trình nghề nghiệp",
      titleEn: "Career pathways",
      descriptionVi:
        "Những hướng đi tiêu biểu từ nền tảng Công nghệ Sinh học và Sinh học ứng dụng.",
      descriptionEn:
        "Selected pathways built on biotechnology and applied biology foundations.",
      displayOrder: 1,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
  ];

  const alumni: Alumni[] = [
    {
      id: "mock-alumni-01",
      slug: "nguyen-khanh-linh",
      fullName: "Nguyễn Khánh Linh",
      graduationYear: 2022,
      program: isVi ? "Công nghệ Sinh học" : "Biotechnology",
      shortBio: isVi
        ? "Theo đuổi công việc kiểm soát chất lượng và phát triển quy trình trong môi trường sản xuất."
        : "Pursuing quality control and process development in a production environment.",
      careers: [
        {
          id: "mock-career-01",
          organization: "Life Science Laboratory",
          role: isVi ? "Chuyên viên kiểm soát chất lượng" : "Quality Control Specialist",
          startYear: 2023,
        },
      ],
      sectionMembers: [
        {
          id: "mock-member-01",
          sectionId,
          isFeatured: true,
          displayOrder: 1,
        },
      ],
      meta: { alumniId: "mock-alumni-01", visibility: "public" },
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "mock-alumni-02",
      slug: "tran-minh-quan",
      fullName: "Trần Minh Quân",
      graduationYear: 2021,
      program: isVi ? "Sinh học ứng dụng" : "Applied Biology",
      shortBio: isVi
        ? "Phát triển kinh nghiệm tại doanh nghiệp nông nghiệp công nghệ cao và các dự án thử nghiệm thực địa."
        : "Building experience in high-tech agriculture and field-based pilot projects.",
      careers: [
        {
          id: "mock-career-02",
          organization: "AgriTech Solutions",
          role: isVi ? "Chuyên viên nghiên cứu ứng dụng" : "Applied Research Specialist",
          startYear: 2022,
        },
      ],
      sectionMembers: [
        {
          id: "mock-member-02",
          sectionId,
          displayOrder: 2,
        },
      ],
      meta: { alumniId: "mock-alumni-02", visibility: "public" },
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "mock-alumni-03",
      slug: "le-thao-vy",
      fullName: "Lê Thảo Vy",
      graduationYear: 2023,
      program: isVi ? "Công nghệ Sinh học" : "Biotechnology",
      shortBio: isVi
        ? "Tiếp tục học tập và tham gia các dự án liên quan đến sinh học phân tử và công nghệ tế bào."
        : "Continuing postgraduate study and projects in molecular biology and cell technology.",
      careers: [
        {
          id: "mock-career-03",
          organization: "Graduate Research Programme",
          role: isVi ? "Học viên nghiên cứu" : "Graduate Researcher",
          startYear: 2024,
        },
      ],
      sectionMembers: [
        {
          id: "mock-member-03",
          sectionId,
          displayOrder: 3,
        },
      ],
      meta: { alumniId: "mock-alumni-03", visibility: "public" },
      createdAt: now,
      updatedAt: now,
    },
  ];

  return { alumni, sections };
}

export function getMockStudentActivities(locale: SiteLocale): {
  events: Event[];
  stories: News[];
} {
  const isVi = locale === "vi";
  const events: Event[] = [
    {
      id: "mock-event-01",
      titleVi: "Workshop kỹ năng phòng thí nghiệm",
      titleEn: "Laboratory skills workshop",
      descriptionVi:
        "Thực hành quy trình an toàn, ghi chép và xử lý dữ liệu trong phòng thí nghiệm.",
      descriptionEn:
        "Hands-on practice in laboratory safety, documentation and data handling.",
      startAt: "2026-08-15T08:00:00.000Z",
      locationVi: "Phòng thí nghiệm Khoa Công nghệ Sinh học",
      locationEn: "School of Biotechnology Laboratory",
      status: "published",
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "mock-event-02",
      titleVi: "Ngày hội dự án sinh viên",
      titleEn: "Student project showcase",
      descriptionVi:
        "Trưng bày ý tưởng, poster nghiên cứu và các sản phẩm thử nghiệm của sinh viên.",
      descriptionEn:
        "A showcase of student ideas, research posters and experimental products.",
      startAt: "2026-09-12T08:00:00.000Z",
      locationVi: "Đại học Tân Tạo",
      locationEn: "Tan Tao University",
      status: "published",
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    },
  ];
  const stories: News[] = [
    {
      id: "mock-story-01",
      title: isVi
        ? "Sinh viên học qua dự án và trải nghiệm thực tế"
        : "Students learn through projects and practical experience",
      slug: "student-project-learning",
      summary: isVi
        ? "Từ lớp học đến phòng thí nghiệm, sinh viên được khuyến khích đặt câu hỏi, thử nghiệm và trình bày kết quả."
        : "From class to laboratory, students are encouraged to question, experiment and present results.",
      content: {},
      coverImage: "/assets/ttu/students-campus-learning.jpg",
      category: "events",
      status: "published",
      publishedAt: "2026-07-18T00:00:00.000Z",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "mock-story-02",
      title: isVi
        ? "Kết nối trong hoạt động hợp tác quốc tế"
        : "Connections through international collaboration",
      slug: "international-student-collaboration",
      summary: isVi
        ? "Một môi trường để sinh viên rèn khả năng giao tiếp, làm việc nhóm và tư duy liên ngành."
        : "An environment for communication, teamwork and interdisciplinary thinking.",
      content: {},
      coverImage: "/assets/biotech/biotech-hackathon-2026.jpg",
      category: "events",
      status: "published",
      publishedAt: "2026-07-10T00:00:00.000Z",
      createdAt: now,
      updatedAt: now,
    },
  ];

  return { events, stories };
}

export function getMockCareerOpportunities(
  locale: SiteLocale,
): CareerOpportunity[] {
  const isVi = locale === "vi";

  return [
    {
      id: "mock-job-01",
      titleVi: "Thực tập sinh phòng thí nghiệm",
      titleEn: "Laboratory Intern",
      companyName: "Life Science Partner",
      summaryVi:
        "Hỗ trợ chuẩn bị mẫu, ghi nhận dữ liệu và thực hiện các quy trình cơ bản dưới sự hướng dẫn.",
      summaryEn:
        "Support sample preparation, data recording and basic procedures under supervision.",
      type: "internship",
      workMode: "onsite",
      locationVi: "Long An",
      locationEn: "Long An",
      skills: isVi
        ? "Thực hành phòng thí nghiệm, ghi chép dữ liệu"
        : "Laboratory practice, data documentation",
      contactEmail: "secretary.sbio@ttu.edu.vn",
      applicationDeadline: "2026-09-30T00:00:00.000Z",
      publishedAt: "2026-07-20T00:00:00.000Z",
      status: "published",
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "mock-job-02",
      titleVi: "Cộng tác viên nghiên cứu ứng dụng",
      titleEn: "Applied Research Assistant",
      companyName: "AgriTech Partner",
      summaryVi:
        "Tham gia thu thập mẫu, theo dõi thử nghiệm và tổng hợp số liệu cho dự án nông nghiệp."
          ,
      summaryEn:
        "Join sample collection, trial monitoring and data synthesis for an agricultural project.",
      type: "part_time",
      workMode: "hybrid",
      locationVi: "Tây Ninh",
      locationEn: "Tay Ninh",
      skills: isVi
        ? "Sinh học ứng dụng, Excel, làm việc nhóm"
        : "Applied biology, Excel, teamwork",
      contactEmail: "secretary.sbio@ttu.edu.vn",
      applicationDeadline: "2026-10-15T00:00:00.000Z",
      publishedAt: "2026-07-18T00:00:00.000Z",
      status: "published",
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export function getMockStudentPortfolios(
  locale: SiteLocale,
): StudentPortfolio[] {
  const isVi = locale === "vi";

  return [
    {
      id: "mock-portfolio-01",
      slug: "nguyen-gia-han",
      fullName: "Nguyễn Gia Hân",
      title: isVi ? "Sinh viên Công nghệ Sinh học" : "Biotechnology Student",
      shortBio: isVi
        ? "Quan tâm đến sinh học phân tử, thực hành phòng thí nghiệm và truyền thông khoa học."
        : "Interested in molecular biology, laboratory practice and science communication.",
      program: isVi ? "Công nghệ Sinh học" : "Biotechnology",
      studentYear: 3,
      location: "Long An",
      isPublished: true,
      skills: [
        { id: "mock-skill-01", name: isVi ? "Sinh học phân tử" : "Molecular biology" },
        { id: "mock-skill-02", name: isVi ? "Phân tích dữ liệu" : "Data analysis" },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "mock-portfolio-02",
      slug: "tran-minh-nhat",
      fullName: "Trần Minh Nhật",
      title: isVi ? "Sinh viên Sinh học ứng dụng" : "Applied Biology Student",
      shortBio: isVi
        ? "Phát triển dự án nhỏ về vi sinh ứng dụng và các giải pháp sinh học cho nông nghiệp."
        : "Developing small projects in applied microbiology and biological solutions for agriculture.",
      program: isVi ? "Sinh học ứng dụng" : "Applied Biology",
      studentYear: 4,
      location: "Tây Ninh",
      isPublished: true,
      skills: [
        { id: "mock-skill-03", name: isVi ? "Vi sinh ứng dụng" : "Applied microbiology" },
        { id: "mock-skill-04", name: isVi ? "Thiết kế thí nghiệm" : "Experimental design" },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "mock-portfolio-03",
      slug: "le-phuong-anh",
      fullName: "Lê Phương Anh",
      title: isVi ? "Sinh viên nghiên cứu" : "Student Researcher",
      shortBio: isVi
        ? "Tập trung vào nuôi cấy mô thực vật, kỹ năng trình bày và hoạt động học thuật."
        : "Focused on plant tissue culture, presentation skills and academic activities.",
      program: isVi ? "Công nghệ Sinh học" : "Biotechnology",
      studentYear: 3,
      location: "Long An",
      isPublished: true,
      skills: [
        { id: "mock-skill-05", name: isVi ? "Nuôi cấy mô" : "Tissue culture" },
        { id: "mock-skill-06", name: isVi ? "Trình bày khoa học" : "Scientific presentation" },
      ],
      createdAt: now,
      updatedAt: now,
    },
  ];
}
