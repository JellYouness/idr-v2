import Image from "next/image";
import { BrandLogo } from "@/components/brand/BrandLogo";
import type { SiteMeta } from "@/lib/types";
import { Container } from "../layout/Container";

type LandingSectionProps = {
  site: SiteMeta;
};

export function LandingSection({ site }: LandingSectionProps) {
  const contactLine = `${site.email}  ${site.phoneDisplay}  ${site.location}`;

  return (
    <section
      id="top"
      aria-labelledby="landing-portfolio-title"
      className="flex min-h-dvh flex-col bg-background text-foreground"
    >
      <Container>
        <div className="pt-8 md:pt-12">
          <div className="flex flex-col gap-3 text-foreground">
            <BrandLogo className="text-foreground" />
            <p className="text-lg font-bold tracking-tight md:text-xl">
              {site.eyebrow}
            </p>
            <p className="text-base font-normal md:text-lg">{site.name}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-end pb-14 pt-10 md:pb-20">
          <div className="w-full">
            <div className="flex flex-col gap-3 text-sm font-medium text-foreground md:flex-row md:items-start md:justify-between md:gap-6 md:text-base">
              <p className="md:max-w-[50%]">{site.roleLine}</p>
              <p className="text-balance md:max-w-[50%] md:text-right">{contactLine}</p>
            </div>
            <div className="mt-6 md:mt-10">
              <Image
                id="landing-portfolio-title"
                src="/videos/porfolio.gif"
                alt="Portfolio"
                width={1600}
                height={320}
                unoptimized
                priority
                className="h-auto w-full object-contain object-left md:object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
