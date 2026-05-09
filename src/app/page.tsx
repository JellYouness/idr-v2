import { IntroSection } from "@/components/sections/IntroSection";
import { LandingSection } from "@/components/sections/LandingSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
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
      <IntroSection intro={introContent} />
      <ResumeSection resume={resumeContent} />
      <PortfolioSection content={portfolioSectionContent} site={siteMeta} />
      {/* <GallerySection items={galleryContent} video={showcaseVideo} /> */}
    </main>
  );
}
