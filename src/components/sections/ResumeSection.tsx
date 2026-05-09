import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { resumeTitleGifClassName } from "@/lib/section-title-gif";
import type { ResumeContent } from "@/lib/types";

type ResumeSectionProps = {
  resume: ResumeContent;
};

export function ResumeSection({ resume }: ResumeSectionProps) {
  return (
    <Section id="resume" ariaLabelledby="resume-title">
      <Container>
        <div className="relative mb-16 md:mb-10">
          {/* <p
            className="pointer-events-none absolute -left-2 -top-8 select-none text-[clamp(4rem,18vw,11rem)] font-bold leading-none text-transparent md:-left-4 md:-top-12"
            style={{ WebkitTextStroke: "1px rgba(0,0,0,0.08)" }}
            aria-hidden
          >
            {resume.titleOutline}
          </p> */}
          <h2
            id="resume-title"
            className="relative m-0 p-0 font-[inherit] font-normal leading-none"
          >
            <Image
              src="/videos/resume.gif"
              alt={resume.sectionTitle}
              width={640}
              height={128}
              unoptimized
              className={`block ${resumeTitleGifClassName}`}
            />
          </h2>
        </div>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-14">
            <div>
              <h3 className="mb-8 text-xl font-bold text-foreground">
                {resume.educationTitle}
              </h3>
              <ul className="flex flex-col gap-10">
                {resume.education.map((item) => (
                  <li
                    key={`${item.title}-${item.dateRange}`}
                    className="flex gap-3"
                  >
                    {/* <ChainIcon className="mt-1" /> */}
                    <Image src="/icons/hyperlink-icon.svg" alt="Chain" width={14} height={14} className="size-4! mt-2 fill-muted-light" />
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-muted">{item.dateRange}</p>
                      <p className="mt-1 text-sm text-muted">
                        {item.institution}
                        {item.location ? `, ${item.location}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-8 text-xl font-bold text-foreground">
                {resume.skillsTitle}
              </h3>
              <ul className="flex flex-col gap-4">
                {resume.skills.map((skill) => (
                  <li key={skill.id} className="flex items-center gap-4">
                    <SkillBadge toolId={skill.id} />
                    <span className="text-base text-muted">{skill.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-8 text-xl font-bold text-foreground">
              {resume.experienceTitle}
            </h3>
            <ul className="flex flex-col gap-12">
              {resume.experience.map((job) => (
                <li key={`${job.title}-${job.subtitle}`}>
                  <p className="text-lg font-bold text-foreground">
                    {job.title}
                  </p>
                  <p className="mt-2 text-base italic text-muted">
                    {job.subtitle}
                  </p>
                  <div className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-muted">
                    {job.description.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
