import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { sectionTitleImageClassName } from "@/lib/section-title-image";
import { toolLabels } from "@/lib/portfolio-content";
import type { PortfolioSectionContent } from "@/lib/types";
import type { SiteMeta } from "@/lib/types";

type PortfolioSectionProps = {
  content: PortfolioSectionContent;
  site: SiteMeta;
};

export function PortfolioSection({ content, site }: PortfolioSectionProps) {
  return (
    <Section id="work" ariaLabelledby="work-title" tone="light">
      <Container>
        <h2
          id="work-title"
          className="relative m-0 mb-10 p-0 font-[inherit] font-normal leading-none"
        >
          <Image
            src="/images/project.png"
            alt="Projects"
            width={1600}
            height={320}
            sizes="100vw"
            className={`block ${sectionTitleImageClassName}`}
          />
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col bg-surface p-6 shadow-none"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-bold text-foreground">
                  {card.title}
                </h3>
                <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-light">
                  <SkillIcon toolId={card.toolId} size={16} />
                  {toolLabels[card.toolId]}
                </span>
              </div>
              <div className="mt-5 aspect-3/4 w-full overflow-hidden bg-card-placeholder">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="auto"
                  aria-label={`${card.title} preview`}
                >
                  <source src={card.videoSrc} type="video/mp4" />
                </video>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href={site.portfolioCta.href}
            className="inline-flex min-w-[min(100%,20rem)] uppercase items-center justify-center border border-foreground/35 px-10 py-4 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {site.portfolioCta.label}
          </a>
        </div>
      </Container>
    </Section>
  );
}
