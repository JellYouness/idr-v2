import type { ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3;

const sizeMap: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
  2: "text-2xl font-semibold tracking-tight sm:text-3xl",
  3: "text-lg font-medium text-muted sm:text-xl",
};

type HeadingProps = {
  level: HeadingLevel;
  id?: string;
  children: ReactNode;
  className?: string;
};

export function Heading({ level, id, children, className = "" }: HeadingProps) {
  const Tag = `h${level}` as const;
  const sizes = sizeMap[level];
  return (
    <Tag id={id} className={`${sizes} ${className}`}>
      {children}
    </Tag>
  );
}
