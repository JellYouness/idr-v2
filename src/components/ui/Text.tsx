import type { ReactNode } from "react";

type TextProps = {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
};

export function Text({
  children,
  className = "",
  as: Tag = "p",
}: TextProps) {
  return (
    <Tag
      className={`text-base leading-relaxed text-muted sm:text-lg ${className}`}
    >
      {children}
    </Tag>
  );
}
