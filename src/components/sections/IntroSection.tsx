import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text";
import { helloTitleGifClassName } from "@/lib/section-title-gif";
import type { IntroContent } from "@/lib/types";

type IntroSectionProps = {
  intro: IntroContent;
};

export function IntroSection({ intro }: IntroSectionProps) {
  return (
    <Section id="about" ariaLabelledby="intro-headline">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="relative">
            <div className="relative">
              {/* <p
                className="pointer-events-none absolute -left-1 -top-2 select-none text-7xl font-bold leading-none text-transparent sm:text-8xl lg:text-9xl"
                style={{
                  WebkitTextStroke: "1px rgba(0,0,0,0.12)",
                }}
                aria-hidden
              >
                {intro.greeting}
              </p> */}
              <div className="relative z-10 flex items-end">
                <Image
                  src="/videos/hello.gif"
                  alt={intro.greeting}
                  width={640}
                  height={128}
                  unoptimized
                  className={helloTitleGifClassName}
                />
              </div>
            </div>

            <h2
              id="intro-headline"
              className="mt-8 text-balance text-3xl font-bold text-foreground sm:text-4xl"
            >
              {intro.headline}
            </h2>
            <p className="mt-4 text-lg font-medium italic text-muted sm:text-xl">
              {intro.title}
            </p>
            <div className="mt-8 flex max-w-xl flex-col gap-5">
              {intro.paragraphs.map((paragraph, index) => (
                <Text key={index}>{paragraph}</Text>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[340px] justify-center lg:min-h-[720px] lg:justify-end">
            <div className="relative h-[min(78vh,620px)] w-full max-w-xl lg:h-[min(82vh,720px)] lg:max-w-2xl">
              <Image
                src={intro.portraitSrc}
                alt={intro.portraitAlt}
                fill
                className="object-contain object-bottom"
                sizes="(min-width: 1024px) 48vw, 92vw"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
