import { LandingIntroDivider } from "@/components/layout/LandingIntroDivider";
import { IntroSection } from "@/components/sections/IntroSection";
import { LandingSection } from "@/components/sections/LandingSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import {
  introContent,
  portfolioSectionContent,
  resumeContent,
  siteMeta,
} from "@/lib/portfolio-content";

export default function Home() {
  return (
    <main>
      <LandingSection site={siteMeta} />
      <LandingIntroDivider />
      <IntroSection intro={introContent} />
      <ResumeSection resume={resumeContent} />
      <PortfolioSection content={portfolioSectionContent} site={siteMeta} />
      <ContactSection site={siteMeta} />
      {/* <GallerySection items={galleryContent} video={showcaseVideo} /> */}
    </main>
  );
}
