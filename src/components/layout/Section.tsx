import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabelledby?: string;
};

export function Section({
  id,
  children,
  className = "",
  ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`flex min-h-dvh flex-col justify-center py-section ${className}`}
    >
      {children}
    </section>
  );
}
