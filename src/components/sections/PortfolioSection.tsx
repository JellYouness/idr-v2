import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PortfolioPreviewVideo } from "@/components/ui/PortfolioPreviewVideo";
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
              <div className="relative mt-5 aspect-3/4 w-full overflow-hidden bg-card-placeholder">
                {/*
                  No <video> in the DOM below md — iOS Safari often OOMs with multiple MP4 decoders
                  even with preload tricks. Desktop keeps animated previews.
                */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center md:hidden">
                  <span className="text-sm font-semibold text-foreground">
                    {card.title}
                  </span>
                  <span className="max-w-56 text-[10px] font-medium uppercase leading-snug tracking-[0.18em] text-muted">
                    Video preview disabled on small screens
                  </span>
                </div>
                <div className="absolute inset-0 hidden min-h-0 md:block">
                  <PortfolioPreviewVideo src={card.videoSrc} title={card.title} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href={site.portfolioCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[min(100%,20rem)] uppercase items-center justify-center border border-foreground/35 px-10 py-4 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {site.portfolioCta.label}
          </a>
        </div>
      </Container>
    </Section>
  );
}
