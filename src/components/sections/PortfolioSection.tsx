import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { toolLabels } from "@/lib/portfolio-content";
import type { PortfolioSectionContent } from "@/lib/types";
import type { SiteMeta } from "@/lib/types";

type PortfolioSectionProps = {
  content: PortfolioSectionContent;
  site: SiteMeta;
};

export function PortfolioSection({ content, site }: PortfolioSectionProps) {
  return (
    <Section id="work" ariaLabelledby="work-title">
      <Container>
        <h2 id="work-title" className="sr-only">
          Portfolio projects
        </h2>
        {content.sectionLabel ? (
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">
            {content.sectionLabel}
          </p>
        ) : null}

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
                <p className="shrink-0 text-xs text-muted-light">
                  {toolLabels[card.toolId]}
                </p>
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
            className="inline-flex min-w-[min(100%,20rem)] items-center justify-center border border-foreground/35 bg-button-fill px-10 py-4 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {site.portfolioCta.label}
          </a>
        </div>
      </Container>
    </Section>
  );
}
