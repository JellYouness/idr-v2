import type {
  GalleryItem,
  HeroContent,
  IntroContent,
  PortfolioSectionContent,
  ResumeContent,
  SiteMeta,
  SkillToolId,
} from "./types";
import { emailConfig } from "@/config/email";

export const toolLabels: Record<SkillToolId, string> = {
  "after-effects": "After Effect",
  premiere: "Premiere Pro",
  photoshop: "Photoshop",
  illustrator: "Illustrator",
  blender: "Blender",
};

export const siteMeta: SiteMeta = {
  name: "Idrissi Oussama",
  roleLine: "Video editor  /  Motion designer  /  3D Artiste",
  eyebrow: "Creative Presentation",
  description:
    "Portfolio of Idrissi Oussama — video editing, motion design, and 3D for luxury brands and high-profile clients.",
  email: emailConfig.contactEmail,
  phoneDisplay: "+212 6 1540 2961",
  phoneHref: "+212615402961",
  location: "Casablanca, Morroco",
  portfolioCta: {
    label: "View complete Porfolio",
    href: "#gallery",
  },
};

export const heroContent: HeroContent = {
  greeting: "Hello!",
  headline: "I'm Idrissi Oussama",
  title: "Experienced Video Editor and Motion Designer",
  paragraphs: [
    "With 5+ years of experience in video editing and motion design, I blend technical precision with creative storytelling to bring compelling visual narratives to life. My work resonates with luxury brands and high-profile clients, transforming ideas into visual masterpieces.",
    "Driven by passion and curiosity, I specialize in cinematic editing, dynamic motion graphics, and polished visual effects. Through this portfolio, I showcase my ability to elevate content and deliver standout visuals in today's competitive media landscape.",
  ],
};

export const introContent: IntroContent = {
  ...heroContent,
  portraitSrc: "/images/hero.png",
  portraitAlt: "Portrait of Idrissi Oussama",
};

export const resumeContent: ResumeContent = {
  sectionTitle: "Resume!",
  titleOutline: "Resume.",
  skillsTitle: "Skills",
  educationTitle: "Education",
  experienceTitle: "Experiences",
  skills: [
    { id: "after-effects", label: "Adobe After Effects" },
    { id: "premiere", label: "Adobe Premiere Pro" },
    { id: "photoshop", label: "Adobe Photoshop" },
    { id: "illustrator", label: "Adobe Illustrator" },
    { id: "blender", label: "Blender" },
  ],
  education: [
    {
      title: "Baccalaureate",
      institution: "Mouatamid Ibn Abbad High School",
      dateRange: "2017 - 2018",
    },
    {
      title: "Master in Chemistry",
      institution: "Faculty of Sciences Ben M'sik",
      location: "Casablanca",
      dateRange: "2021 - 2026",
    },
  ],
  experience: [
    {
      title: "Freelance Video Editor & Motion Designer",
      subtitle: "Self-employed | 2020–Present",
      description: [
        "Completed over 100 high-quality video projects for brands, agencies, and influencers.",
        "Collaborated with marketing teams to develop visual strategies that increased engagement by 40%.",
      ],
    },
    {
      title: "Prince Fragrance",
      subtitle: "Video Editor & Motion Designer | August 2025 - Present",
      description: [
        "Creation of user-generated content (UGC) videos, 3D animations, and animated graphics to enhance brand storytelling.",
        "Development of content that has increased customer engagement and interaction across platforms.",
      ],
    },
    {
      title: "CineSahara",
      subtitle: "Video Editor & Motion Designer | November 2025 - February 2026",
      description: [
        "Production of 10-minute videos transforming audio into animated graphics and podcast videos to capture audience attention.",
        "Design of 1-minute animated graphics videos for social media, strengthening brand presence and building viewer loyalty.",
      ],
    },
  ],
};

export const portfolioSectionContent: PortfolioSectionContent = {
  cards: [
    {
      title: "3D Video",
      toolId: "blender",
      videoSrc: "/videos/3d.mp4",
    },
    {
      title: "Motion graphic",
      toolId: "after-effects",
      videoSrc: "/videos/Motion%20graphic.mp4",
    },
    {
      title: "UGC Video",
      toolId: "after-effects",
      videoSrc: "/videos/ugc_1.mp4",
    },
  ],
};

export const galleryContent: GalleryItem[] = [
  {
    src: "/images/hero.png",
    alt: "Portfolio visual — creative presentation artwork",
    caption: "Selected work",
  },
];

export const showcaseVideo = {
  src: "/videos/comp-1.mp4",
  title: "Showreel excerpt",
};
