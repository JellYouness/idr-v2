export type SkillToolId =
  | "after-effects"
  | "premiere"
  | "photoshop"
  | "illustrator"
  | "blender";

export interface SkillItem {
  id: SkillToolId;
  label: string;
}

export interface EducationItem {
  institution: string;
  location?: string;
  dateRange: string;
  title: string;
}

export interface ExperienceItem {
  /** Bold primary line (role or company, per design) */
  title: string;
  /** Italic gray line, e.g. “Self-employed | 2020–Present” */
  subtitle: string;
  /** One or more body paragraphs */
  description: string[];
}

export interface PortfolioCard {
  title: string;
  toolId: SkillToolId;
  /** Public path to preview video (e.g. /videos/clip.mp4) */
  videoSrc: string;
  subtitle?: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface SiteMeta {
  name: string;
  roleLine: string;
  eyebrow: string;
  description: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  location: string;
  portfolioCta: {
    label: string;
    href: string;
  };
  resumeCta: {
    label: string;
    href: string;
  };
}

export interface HeroContent {
  greeting: string;
  headline: string;
  title: string;
  paragraphs: string[];
}

export interface IntroContent extends HeroContent {
  portraitSrc: string;
  portraitAlt: string;
}

export interface ResumeContent {
  sectionTitle: string;
  /** Large faint outlined word behind the title (e.g. “Resume.”) */
  titleOutline: string;
  skillsTitle: string;
  educationTitle: string;
  experienceTitle: string;
  skills: SkillItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
}

export interface PortfolioSectionContent {
  sectionLabel?: string;
  cards: PortfolioCard[];
}
