import Image from "next/image";
import type { SiteMeta } from "@/lib/types";
import { Container } from "../layout/Container";

type LandingSectionProps = {
  site: SiteMeta;
};

export function LandingSection({ site }: LandingSectionProps) {
  const contactLine = `${site.email} | ${site.phoneDisplay} | ${site.location}`;

  return (
    <section
      id="top"
      aria-labelledby="landing-portfolio-title"
      className="section-tone-dark flex min-h-dvh flex-col bg-background text-foreground"
    >
      <Container className="flex h-screen flex-col justify-center">
        <div className="pt-8 md:pt-12">
          <div className="flex flex-col gap-1.5 text-foreground">
            <Image
              src="/images/logo.png"
              alt={`${site.name} logo`}
              width={120}
              height={144}
              priority
              sizes="(min-width: 768px) 7rem, 6rem"
              className="h-14 w-auto max-w-[min(100%,5.5rem)] object-contain object-left brightness-0 invert md:h-18 md:max-w-[min(100%,6.5rem)]"
            />
            <p className="text-lg font-extrabold tracking-tight md:text-xl">
              {site.name}
            </p>
            {/* <p className="text-base font-normal md:text-lg">{site.name}</p> */}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-end pb-14 pt-10 md:pb-20">
          <div className="w-full">
            <div className="flex flex-col gap-3 text-sm font-medium text-foreground md:flex-row md:items-start md:justify-between md:gap-6 md:text-base">
              <p className="md:max-w-[50%]">{site.roleLine}</p>
              <p className="text-balance md:max-w-[50%] md:text-right">
                {contactLine}
              </p>
            </div>
            <div className="mt-6 md:mt-10">
              <p className="mb-3 text-left text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/45 md:text-center">
                Test — GIF replaced with PNG + type
              </p>
              <Image
                id="landing-portfolio-title"
                src="/images/project.png"
                alt="Portfolio"
                width={1600}
                height={320}
                priority
                sizes="100vw"
                className="h-auto w-full object-contain object-left brightness-0 invert md:object-center"
              />
              <p
                className="mt-4 text-left font-bold uppercase tracking-[0.08em] text-foreground md:text-center md:text-lg"
                aria-hidden
              >
                Portfolio
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
