import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import type { GalleryItem } from "@/lib/types";

type ShowcaseVideo = {
  src: string;
  title: string;
};

type GallerySectionProps = {
  items: GalleryItem[];
  video: ShowcaseVideo;
};

export function GallerySection({ items, video }: GallerySectionProps) {
  return (
    <Section
      id="gallery"
      className="bg-background"
      ariaLabelledby="gallery-title"
    >
      <Container>
        <Heading level={2} id="gallery-title" className="mb-10">
          Gallery
        </Heading>

        <div className="grid gap-12 lg:grid-cols-2">
          {items.map((item) => (
            <figure
              key={item.src}
              className="overflow-hidden border border-border bg-surface"
            >
              <div className="relative aspect-4/3 w-full bg-background">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
              </div>
              {item.caption ? (
                <figcaption className="px-4 py-3 text-sm text-muted">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted">
              {video.title}
            </p>
            <div className="overflow-hidden border border-border bg-foreground">
              <video
                className="aspect-video w-full object-cover"
                controls
                playsInline
                loop
                preload="metadata"
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
