import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text";
import { sectionTitleImageClassName } from "@/lib/section-title-image";
import type { IntroContent } from "@/lib/types";

type IntroSectionProps = {
  intro: IntroContent;
};

export function IntroSection({ intro }: IntroSectionProps) {
  return (
    <Section id="about" ariaLabelledby="intro-headline" tone="light">
      <Container>
        <div className="grid grid-cols-1 items-center gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="relative z-10 flex justify-center lg:col-start-1 lg:row-start-1 lg:justify-start">
            <Image
              src="/images/Hello.png"
              alt={intro.greeting}
              width={640}
              height={128}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`${sectionTitleImageClassName} max-lg:object-center`}
            />
          </div>

          <h2
            id="intro-headline"
            className="max-lg:text-center text-balance text-3xl font-bold text-foreground sm:text-4xl lg:col-start-1 lg:row-start-2"
          >
            {intro.headline}
          </h2>

          <p className="max-lg:text-center text-lg font-medium italic text-muted sm:text-xl lg:col-start-1 lg:row-start-3 lg:-mt-44">
            {intro.title}
          </p>

          <div
            className={[
              "relative mx-auto flex justify-center overflow-hidden rounded-full",
              "aspect-square w-[min(76vw,200px)] shrink-0",
              "lg:col-start-2 lg:row-start-1 lg:row-span-4 lg:mx-0 lg:mt-0 lg:aspect-auto lg:max-h-none lg:w-full lg:max-w-none lg:justify-end lg:overflow-visible lg:rounded-none",
              "lg:min-h-[420px] lg:self-stretch",
            ].join(" ")}
          >
            <div className="relative h-full min-h-[220px] w-full max-w-xl lg:h-[min(82vh,720px)] lg:min-h-[340px] lg:max-w-2xl">
              <Image
                src={intro.portraitSrc}
                alt={intro.portraitAlt}
                fill
                className="object-cover object-center lg:object-contain lg:object-bottom"
                sizes="(min-width: 1024px) 48vw, 90vw"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex w-full max-w-xl flex-col gap-3 sm:gap-4 max-lg:mx-auto max-lg:text-center lg:col-start-1 lg:row-start-4 lg:-mt-32">
            {intro.paragraphs.map((paragraph, index) => (
              <Text key={index} className="max-lg:text-center">
                {paragraph}
              </Text>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
