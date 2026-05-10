import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-10 lg:px-40 ${className}`}
    >
      {children}
    </div>
  );
}
