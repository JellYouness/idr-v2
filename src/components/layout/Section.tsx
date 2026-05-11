import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabelledby?: string;
  /** Light = off-white page; dark = black section with inverted tokens. */
  tone?: "light" | "dark";
};

export function Section({
  id,
  children,
  className = "",
  ariaLabelledby,
  tone = "light",
}: SectionProps) {
  const toneClass = tone === "dark" ? "section-tone-dark" : "section-tone-light";

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`flex min-h-dvh flex-col justify-center bg-background py-section text-foreground ${toneClass} ${className}`}
    >
      {children}
    </section>
  );
}
